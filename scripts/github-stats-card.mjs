// ----------------------------------------------------------------------
// Génère une carte SVG « activité GitHub » aux couleurs du portfolio, avec
// les chiffres RÉELS incluant les contributions privées (org + repos privés).
//
// Pourquoi maison : l'API GitHub n'expose le travail privé que partiellement,
// et les outils clés en main (metrics…) n'utilisent que des champs « public
// only » (contributionsCollection) → ils sous-estiment massivement un profil
// majoritairement privé.
//
// Sources choisies pour leur fiabilité vis-à-vis du privé :
//   - commits / PR / reviews : search API (voit les repos privés accessibles)
//   - par organisation        : search filtré par org
//   - repos & langages        : énumération REST (/user/repos + /orgs/*/repos
//                               puis /repos/*/languages) — plus fiable que le
//                               champ GraphQL viewer.repositories avec un PAT
//
// La visualisation du calendrier de contributions est laissée au « snake »
// (Platane/snk) affiché à côté dans le README — pas de doublon ici.
//
// Usage : GH_TOKEN=xxx node scripts/github-stats-card.mjs [chemin_sortie.svg]
// ----------------------------------------------------------------------

const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const LOGIN = process.env.GH_LOGIN || "DCAlexandre";
const OUT = process.argv[2] || "dist/github-stats.svg";

// Orgs à détailler, avec leur nom d'affichage (marque publique).
const ORGS = [
  { login: "aexae", label: "Comète" },
  { login: "Kared-Games", label: "Kared Dev" },
];

// Badges d'identité (positionnement portfolio, non dérivables des chiffres).
const BADGES = ["Tech Lead", "Full-stack", "10 ans d'expérience"];

if (!TOKEN) {
  console.error("GH_TOKEN manquant.");
  process.exit(1);
}

// ----------------------------------------------------------------------
// Thème (émeraude du portfolio, sur fond sombre)

const T = {
  bg: "#0d1117",
  border: "#30363d",
  text: "#e6edf3",
  muted: "#8b949e",
  accent: "#3ECF8E",
  chipBg: "#132a20",
  chipBorder: "#2ea36a",
  orgColors: ["#3ECF8E", "#56d4dd", "#7d8590"],
};

// ----------------------------------------------------------------------
// Accès API

async function gql(query, variables = {}) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${TOKEN}`, "Content-Type": "application/json", "User-Agent": "adc-stats-card" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) console.warn("GraphQL warnings:", JSON.stringify(json.errors));
  return json.data;
}

async function rest(path, accept = "application/vnd.github+json") {
  const res = await fetch(`https://api.github.com/${path}`, {
    headers: { Authorization: `bearer ${TOKEN}`, Accept: accept, "User-Agent": "adc-stats-card" },
  });
  return res.json();
}

async function restPaged(pathBase) {
  const out = [];
  for (let page = 1; page <= 10; page++) {
    const sep = pathBase.includes("?") ? "&" : "?";
    const chunk = await rest(`${pathBase}${sep}per_page=100&page=${page}`);
    if (!Array.isArray(chunk) || chunk.length === 0) break;
    out.push(...chunk);
    if (chunk.length < 100) break;
  }
  return out;
}

async function searchCommits(q) {
  const json = await rest(`search/commits?q=${encodeURIComponent(q)}&per_page=1`, "application/vnd.github.cloak-preview+json");
  return json.total_count ?? 0;
}

async function searchPr(extra) {
  const data = await gql(`{ search(query: "type:pr author:${LOGIN} ${extra}", type: ISSUE) { issueCount } }`);
  return data?.search?.issueCount ?? 0;
}

// ----------------------------------------------------------------------
// Données

async function fetchTotals() {
  const created = await gql(`{ viewer { createdAt } }`);
  const startYear = new Date(created.viewer.createdAt).getUTCFullYear();

  const [commits, pullRequests, reviews] = await Promise.all([
    searchCommits(`author:${LOGIN}`),
    gql(`{ search(query: "type:pr author:${LOGIN}", type: ISSUE) { issueCount } }`).then((d) => d?.search?.issueCount ?? 0),
    gql(`{ search(query: "type:pr reviewed-by:${LOGIN}", type: ISSUE) { issueCount } }`).then((d) => d?.search?.issueCount ?? 0),
  ]);

  return { commits, pullRequests, reviews, startYear };
}

async function fetchByOrg(totals) {
  const orgs = [];
  for (const o of ORGS) {
    const [commits, prs] = await Promise.all([searchCommits(`author:${LOGIN} org:${o.login}`), searchPr(`org:${o.login}`)]);
    orgs.push({ label: o.label, commits, prs });
  }
  const restCommits = Math.max(0, totals.commits - orgs.reduce((s, o) => s + o.commits, 0));
  const restPrs = Math.max(0, totals.pullRequests - orgs.reduce((s, o) => s + o.prs, 0));
  orgs.push({ label: "Perso & autres", commits: restCommits, prs: restPrs });
  return orgs;
}

// Énumération REST des repos (perso + orgs), puis agrégation des langages.
async function fetchReposAndLanguages() {
  const seen = new Set();
  const repos = [];
  const add = (list) => {
    for (const r of list) {
      if (r?.full_name && !seen.has(r.full_name)) {
        seen.add(r.full_name);
        repos.push(r.full_name);
      }
    }
  };
  add(await restPaged("user/repos?affiliation=owner&visibility=all"));
  for (const o of ORGS) add(await restPaged(`orgs/${o.login}/repos?type=all`));

  const totals = new Map();
  await Promise.all(
    repos.map(async (full) => {
      const langs = await rest(`repos/${full}/languages`);
      if (langs && !langs.message) {
        for (const [name, size] of Object.entries(langs)) totals.set(name, (totals.get(name) || 0) + size);
      }
    })
  );

  const grand = [...totals.values()].reduce((s, v) => s + v, 0) || 1;
  const languages = [...totals.entries()]
    .map(([name, size]) => ({ name, size, pct: (size / grand) * 100 }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 8);

  return { repoCount: repos.length, languages };
}

// Couleurs des langages courants (REST /languages ne renvoie pas la couleur).
const LANG_COLORS = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Python: "#3572A5",
  Blade: "#f7523f",
  Shell: "#89e051",
  Batchfile: "#C1F12E",
  Vue: "#41b883",
  Dockerfile: "#384d54",
  SCSS: "#c6538c",
  Java: "#b07219",
  "C#": "#178600",
  TSQL: "#e38c00",
  PLpgSQL: "#336790",
};
const langColor = (name) => LANG_COLORS[name] || "#8b949e";

// ----------------------------------------------------------------------
// Rendu SVG

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const nf = (n) => n.toLocaleString("fr-FR").replace(/ | /g, " ");

function render({ totals, byOrg, repoCount, languages }) {
  const W = 880;
  const pad = 28;
  const barX = pad;
  const barW = W - pad * 2;
  const parts = [];

  // En-tête
  parts.push(`
    <text x="${pad}" y="40" fill="${T.text}" font-size="22" font-weight="700">Alexandre Da Costa</text>
    <text x="${pad}" y="62" fill="${T.muted}" font-size="13">Activité GitHub — contributions privées incluses</text>
    <circle cx="${W - pad - 6}" cy="34" r="5" fill="${T.accent}" />
    <text x="${W - pad - 18}" y="39" text-anchor="end" fill="${T.muted}" font-size="12">depuis ${totals.startYear}</text>`);

  // Badges d'identité
  let bx = pad;
  const chipY = 82;
  BADGES.forEach((label) => {
    const w = 20 + label.length * 7.1;
    if (bx + w > W - pad) return;
    parts.push(`
      <rect x="${bx}" y="${chipY}" width="${w.toFixed(0)}" height="26" rx="13" fill="${T.chipBg}" stroke="${T.chipBorder}" />
      <text x="${bx + w / 2}" y="${chipY + 17}" text-anchor="middle" fill="${T.accent}" font-size="12.5" font-weight="600">${esc(label)}</text>`);
    bx += w + 8;
  });

  // Tuiles (toutes fiables : commits/PR/reviews via search, repos via REST)
  const tiles = [
    { value: nf(totals.commits), label: "Commits" },
    { value: nf(totals.pullRequests), label: "Pull requests" },
    { value: nf(totals.reviews), label: "Code reviews" },
    { value: nf(repoCount), label: "Repos" },
  ];
  const tileY = 140;
  const tileW = (W - pad * 2) / tiles.length;
  parts.push(
    tiles
      .map((t, i) => {
        const cx = pad + tileW * i + tileW / 2;
        return `
        <text x="${cx}" y="${tileY + 8}" text-anchor="middle" fill="${T.accent}" font-size="30" font-weight="700">${esc(t.value)}</text>
        <text x="${cx}" y="${tileY + 31}" text-anchor="middle" fill="${T.muted}" font-size="13">${esc(t.label)}</text>`;
      })
      .join("")
  );

  // Répartition par organisation
  let y = tileY + 68;
  parts.push(`<text x="${pad}" y="${y}" fill="${T.text}" font-size="15" font-weight="600">Répartition par organisation</text>`);
  const maxCommits = Math.max(1, ...byOrg.map((o) => o.commits));
  byOrg.forEach((o, i) => {
    const rowY = y + 24 + i * 34;
    const w = (o.commits / maxCommits) * barW;
    parts.push(`
      <text x="${pad}" y="${rowY}" fill="${T.text}" font-size="13" font-weight="600">${esc(o.label)}</text>
      <text x="${W - pad}" y="${rowY}" text-anchor="end" fill="${T.muted}" font-size="12">${nf(o.commits)} commits · ${nf(o.prs)} PR</text>
      <rect x="${barX}" y="${rowY + 7}" width="${barW}" height="7" rx="3.5" fill="#1b2230" />
      <rect x="${barX}" y="${rowY + 7}" width="${Math.max(2, w).toFixed(1)}" height="7" rx="3.5" fill="${T.orgColors[i % T.orgColors.length]}" />`);
  });

  // Langages
  y = y + 24 + byOrg.length * 34 + 16;
  parts.push(`<text x="${pad}" y="${y}" fill="${T.text}" font-size="15" font-weight="600">Langages les plus utilisés</text>`);
  const lbY = y + 12;
  let acc = 0;
  const langBar = languages
    .map((l) => {
      const w = (l.pct / 100) * barW;
      const x = barX + acc;
      acc += w;
      return `<rect x="${x.toFixed(1)}" y="${lbY}" width="${Math.max(0, w).toFixed(1)}" height="14" fill="${langColor(l.name)}" />`;
    })
    .join("");
  parts.push(`<clipPath id="barclip"><rect x="${barX}" y="${lbY}" width="${barW}" height="14" rx="7" /></clipPath>
    <g clip-path="url(#barclip)">${langBar}</g>`);
  parts.push(
    languages
      .map((l, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const x = barX + col * (barW / 4);
        const ly = lbY + 36 + row * 22;
        return `
        <circle cx="${x + 6}" cy="${ly - 4}" r="6" fill="${langColor(l.name)}" />
        <text x="${x + 18}" y="${ly}" fill="${T.text}" font-size="13">${esc(l.name)}</text>
        <text x="${x + 18 + l.name.length * 7.4 + 8}" y="${ly}" fill="${T.muted}" font-size="12">${l.pct.toFixed(1)}%</text>`;
      })
      .join("")
  );

  y = lbY + 36 + Math.ceil(languages.length / 4) * 22;
  const H = y + 28;
  parts.push(`<text x="${pad}" y="${H - 12}" fill="${T.muted}" font-size="11">Généré automatiquement · les chiffres incluent le travail dans les repos privés &amp; organisations</text>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', Arial, sans-serif" role="img" aria-label="Statistiques GitHub d'Alexandre Da Costa">
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="${T.bg}" stroke="${T.border}" />
  ${parts.join("\n")}
</svg>`;
}

// ----------------------------------------------------------------------

async function main() {
  const totals = await fetchTotals();
  const [byOrg, rl] = await Promise.all([fetchByOrg(totals), fetchReposAndLanguages()]);
  const svg = render({ totals, byOrg, repoCount: rl.repoCount, languages: rl.languages });

  const fs = await import("node:fs");
  const path = await import("node:path");
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, svg, "utf8");

  console.log(`OK → ${OUT}`);
  console.log(`commits=${totals.commits} PR=${totals.pullRequests} reviews=${totals.reviews} repos=${rl.repoCount} langs=${rl.languages.length}`);
  byOrg.forEach((o) => console.log(`  ${o.label}: ${o.commits} commits, ${o.prs} PR`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
