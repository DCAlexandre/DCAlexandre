// ----------------------------------------------------------------------
// Génère une carte SVG « activité GitHub » aux couleurs du portfolio, avec
// les chiffres RÉELS incluant les contributions privées (org + repos privés).
//
// Pourquoi maison : l'API GitHub n'expose le travail privé que de façon
// agrégée, et les outils clés en main (metrics, etc.) n'utilisent que des
// champs « public only » (contributionsCollection) → ils sous-estiment
// massivement un profil majoritairement privé. Ici on interroge des sources
// privé-incluses (le token voit les repos privés/org via repo + read:org) :
//   - commits        : search/commits (author:LOGIN) — total réel
//   - pull requests  : viewer.pullRequests.totalCount
//   - code reviews   : search(type:pr reviewed-by:LOGIN)
//   - repos, orgs    : champs directs du viewer
//   - par org        : search/commits + search PR filtrés par org
//   - langages       : agrégation repositories.languages (org/privé inclus)
//   - calendrier     : contributionCalendar (cellules privé-incluses)
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
  accent: "#3ECF8E", // primary.light du portfolio
  accent2: "#56d4dd",
  orgColors: ["#3ECF8E", "#56d4dd", "#7d8590"],
  heat: ["#161b22", "#0f3d2e", "#1c6b4a", "#2ea36a", "#3ECF8E"],
};

// ----------------------------------------------------------------------
// Accès API

async function gql(query, variables = {}) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${TOKEN}`,
      "Content-Type": "application/json",
      "User-Agent": "adc-stats-card",
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) console.warn("GraphQL warnings:", JSON.stringify(json.errors));
  return json.data;
}

async function searchCount(q) {
  // search/commits : compte les commits (privé inclus si le token y a accès).
  const res = await fetch(`https://api.github.com/search/commits?q=${encodeURIComponent(q)}&per_page=1`, {
    headers: {
      Authorization: `bearer ${TOKEN}`,
      Accept: "application/vnd.github.cloak-preview+json",
      "User-Agent": "adc-stats-card",
    },
  });
  const json = await res.json();
  return json.total_count ?? 0;
}

async function prCount(extra) {
  const data = await gql(`{ search(query: "type:pr author:${LOGIN} ${extra}", type: ISSUE) { issueCount } }`);
  return data?.search?.issueCount ?? 0;
}

// ----------------------------------------------------------------------
// Récupération des données

async function fetchTotals() {
  const created = await gql(`{ viewer { createdAt } }`);
  const startYear = new Date(created.viewer.createdAt).getUTCFullYear();

  const data = await gql(`
    query {
      viewer {
        pullRequests { totalCount }
        repositoriesContributedTo(includeUserRepositories: true, contributionTypes: [COMMIT, PULL_REQUEST, ISSUE, REPOSITORY]) { totalCount }
        organizations { totalCount }
      }
    }
  `);

  const [commits, reviews] = await Promise.all([
    searchCount(`author:${LOGIN}`),
    gql(`{ search(query: "type:pr reviewed-by:${LOGIN}", type: ISSUE) { issueCount } }`).then(
      (d) => d?.search?.issueCount ?? 0
    ),
  ]);

  return {
    commits,
    pullRequests: data.viewer.pullRequests.totalCount,
    reviews,
    reposContributed: data.viewer.repositoriesContributedTo.totalCount,
    organizations: data.viewer.organizations.totalCount,
    startYear,
  };
}

async function fetchByOrg(totals) {
  const orgs = [];
  for (const o of ORGS) {
    const [commits, prs] = await Promise.all([
      searchCount(`author:${LOGIN} org:${o.login}`),
      prCount(`org:${o.login}`),
    ]);
    orgs.push({ label: o.label, commits, prs });
  }
  // Reste = total - somme des orgs détaillées (repos perso + collaborations diverses).
  const restCommits = Math.max(0, totals.commits - orgs.reduce((s, o) => s + o.commits, 0));
  const restPrs = Math.max(0, totals.pullRequests - orgs.reduce((s, o) => s + o.prs, 0));
  orgs.push({ label: "Perso & autres", commits: restCommits, prs: restPrs });
  return orgs;
}

async function fetchLanguages() {
  const totals = new Map();
  let cursor = null;
  do {
    const data = await gql(
      `query($cursor: String) {
        viewer {
          repositories(first: 100, after: $cursor, affiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], isFork: false) {
            pageInfo { hasNextPage endCursor }
            nodes { languages(first: 20) { edges { size node { name color } } } }
          }
        }
      }`,
      { cursor }
    );
    const repos = data.viewer.repositories;
    for (const repo of repos.nodes) {
      for (const e of repo.languages.edges) {
        const cur = totals.get(e.node.name) || { size: 0, color: e.node.color || "#888" };
        cur.size += e.size;
        totals.set(e.node.name, cur);
      }
    }
    cursor = repos.pageInfo.hasNextPage ? repos.pageInfo.endCursor : null;
  } while (cursor);

  const arr = [...totals.entries()].map(([name, v]) => ({ name, ...v })).sort((a, b) => b.size - a.size);
  const grand = arr.reduce((s, l) => s + l.size, 0) || 1;
  return arr.slice(0, 8).map((l) => ({ ...l, pct: (l.size / grand) * 100 }));
}

async function fetchCalendar() {
  const data = await gql(`{
    viewer {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { contributionCount } }
        }
      }
    }
  }`);
  return data.viewer.contributionsCollection.contributionCalendar;
}

// ----------------------------------------------------------------------
// Rendu SVG

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const nf = (n) => n.toLocaleString("fr-FR").replace(/ | /g, " ");
const mb = (bytes) => `${Math.round((bytes / 1048576) * 10) / 10} Mo`;

function heatLevel(count, max) {
  if (count <= 0) return 0;
  const r = count / max;
  if (r > 0.6) return 4;
  if (r > 0.35) return 3;
  if (r > 0.15) return 2;
  return 1;
}

function render({ totals, byOrg, languages, calendar }) {
  const W = 880;
  const pad = 28;
  let y = 0;
  const parts = [];

  // -- En-tête
  parts.push(`
    <text x="${pad}" y="40" fill="${T.text}" font-size="22" font-weight="700">Alexandre Da Costa</text>
    <text x="${pad}" y="62" fill="${T.muted}" font-size="13">Activité GitHub — contributions privées incluses</text>
    <circle cx="${W - pad - 6}" cy="34" r="5" fill="${T.accent}" />
    <text x="${W - pad - 18}" y="39" text-anchor="end" fill="${T.muted}" font-size="12">depuis ${totals.startYear}</text>`);

  // -- Tuiles de stats globales
  const tiles = [
    { value: totals.commits, label: "Commits" },
    { value: totals.pullRequests, label: "Pull requests" },
    { value: totals.reviews, label: "Code reviews" },
    { value: totals.reposContributed, label: "Repos contribués" },
    { value: totals.organizations, label: "Organisations" },
  ];
  const tileY = 96;
  const tileW = (W - pad * 2) / tiles.length;
  parts.push(
    tiles
      .map((t, i) => {
        const cx = pad + tileW * i + tileW / 2;
        return `
        <text x="${cx}" y="${tileY + 8}" text-anchor="middle" fill="${T.accent}" font-size="30" font-weight="700">${nf(t.value)}</text>
        <text x="${cx}" y="${tileY + 30}" text-anchor="middle" fill="${T.muted}" font-size="13">${esc(t.label)}</text>`;
      })
      .join("")
  );

  // -- Répartition par organisation
  y = tileY + 66;
  parts.push(`<text x="${pad}" y="${y}" fill="${T.text}" font-size="15" font-weight="600">Répartition par organisation</text>`);
  const maxCommits = Math.max(1, ...byOrg.map((o) => o.commits));
  const barX = pad;
  const barW = W - pad * 2;
  byOrg.forEach((o, i) => {
    const rowY = y + 22 + i * 34;
    const w = (o.commits / maxCommits) * barW;
    parts.push(`
      <text x="${pad}" y="${rowY}" fill="${T.text}" font-size="13" font-weight="600">${esc(o.label)}</text>
      <text x="${W - pad}" y="${rowY}" text-anchor="end" fill="${T.muted}" font-size="12">${nf(o.commits)} commits · ${nf(o.prs)} PR</text>
      <rect x="${barX}" y="${rowY + 7}" width="${barW}" height="7" rx="3.5" fill="#1b2230" />
      <rect x="${barX}" y="${rowY + 7}" width="${Math.max(2, w).toFixed(1)}" height="7" rx="3.5" fill="${T.orgColors[i % T.orgColors.length]}" />`);
  });

  // -- Langages
  y = y + 22 + byOrg.length * 34 + 14;
  parts.push(`<text x="${pad}" y="${y}" fill="${T.text}" font-size="15" font-weight="600">Langages les plus utilisés</text>`);
  const lbY = y + 10;
  let acc = 0;
  const langBar = languages
    .map((l) => {
      const w = (l.pct / 100) * barW;
      const x = barX + acc;
      acc += w;
      return `<rect x="${x.toFixed(1)}" y="${lbY}" width="${Math.max(0, w).toFixed(1)}" height="14" fill="${l.color}" />`;
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
        const ly = lbY + 34 + row * 22;
        return `
        <circle cx="${x + 6}" cy="${ly - 4}" r="6" fill="${l.color}" />
        <text x="${x + 18}" y="${ly}" fill="${T.text}" font-size="13">${esc(l.name)}</text>
        <text x="${x + 18 + l.name.length * 7.4 + 8}" y="${ly}" fill="${T.muted}" font-size="12">${l.pct.toFixed(1)}%</text>`;
      })
      .join("")
  );

  // -- Heatmap (12 derniers mois)
  y = lbY + 34 + Math.ceil(languages.length / 4) * 22 + 18;
  parts.push(`<text x="${pad}" y="${y}" fill="${T.text}" font-size="15" font-weight="600">Contributions des 12 derniers mois</text>
    <text x="${W - pad}" y="${y}" text-anchor="end" fill="${T.accent}" font-size="15" font-weight="700">${nf(calendar.totalContributions)}</text>`);
  const weeks = calendar.weeks;
  const maxDay = Math.max(1, ...weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)));
  const cell = 11;
  const gap = 3;
  const heatTop = y + 14;
  parts.push(
    weeks
      .map((w, wi) =>
        w.contributionDays
          .map((d, di) => {
            const lvl = heatLevel(d.contributionCount, maxDay);
            const x = pad + wi * (cell + gap);
            const yy = heatTop + di * (cell + gap);
            return `<rect x="${x}" y="${yy}" width="${cell}" height="${cell}" rx="2" fill="${T.heat[lvl]}" />`;
          })
          .join("")
      )
      .join("")
  );

  const H = heatTop + 7 * (cell + gap) + 30;
  parts.push(`<text x="${pad}" y="${H - 12}" fill="${T.muted}" font-size="11">Généré automatiquement · les chiffres incluent le travail dans les repos privés &amp; organisations</text>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', Arial, sans-serif" role="img" aria-label="Statistiques GitHub d'Alexandre Da Costa">
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="${T.bg}" stroke="${T.border}" />
  ${parts.join("\n")}
</svg>`;
}

// ----------------------------------------------------------------------

async function main() {
  const totals = await fetchTotals();
  const [byOrg, languages, calendar] = await Promise.all([fetchByOrg(totals), fetchLanguages(), fetchCalendar()]);
  const svg = render({ totals, byOrg, languages, calendar });

  const fs = await import("node:fs");
  const path = await import("node:path");
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, svg, "utf8");

  console.log(`OK → ${OUT}`);
  console.log(
    `commits=${totals.commits} PR=${totals.pullRequests} reviews=${totals.reviews} repos=${totals.reposContributed} orgs=${totals.organizations}`
  );
  byOrg.forEach((o) => console.log(`  ${o.label}: ${o.commits} commits, ${o.prs} PR`));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
