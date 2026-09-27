// ----------------------------------------------------------------------
// Génère une carte SVG « activité GitHub » aux couleurs du portfolio, avec
// les chiffres RÉELS incluant les contributions privées (org + repos privés).
//
// Pourquoi maison : l'API GitHub n'expose le travail privé que de façon
// agrégée. Les outils clés en main (metrics, etc.) utilisent des champs
// « public only » (contributionsCollection) et sous-estiment massivement un
// profil majoritairement privé. Ici on interroge les champs privé-inclus :
//   - commits        : totalCommitContributions + restrictedContributionsCount
//   - pull requests  : viewer.pullRequests.totalCount
//   - code reviews   : search(type:pr reviewed-by:LOGIN)
//   - repos, orgs    : champs directs du viewer
//   - langages       : agrégation repositories.languages (org/privé inclus)
//   - calendrier     : contributionCalendar (cellules privé-incluses)
//
// Usage : GH_TOKEN=xxx node scripts/github-stats-card.mjs [chemin_sortie.svg]
// ----------------------------------------------------------------------

const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const LOGIN = process.env.GH_LOGIN || "DCAlexandre";
const OUT = process.argv[2] || "dist/github-stats.svg";

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
  if (json.errors) {
    // Non fatal : on log et on renvoie ce qu'on a (data éventuel).
    console.warn("GraphQL warnings:", JSON.stringify(json.errors));
  }
  return json.data;
}

// ----------------------------------------------------------------------
// Récupération des données

async function fetchTotals() {
  const created = await gql(`{ viewer { createdAt } }`);
  const startYear = new Date(created.viewer.createdAt).getUTCFullYear();
  const endYear = new Date().getUTCFullYear();

  // Contributions par année (agrégat privé inclus) via alias en une requête.
  const years = [];
  for (let y = startYear; y <= endYear; y++) years.push(y);
  const aliases = years
    .map(
      (y) =>
        `y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y}-12-31T23:59:59Z") { totalCommitContributions restrictedContributionsCount }`
    )
    .join("\n");

  const data = await gql(`
    query {
      viewer {
        ${aliases}
        pullRequests { totalCount }
        issues { totalCount }
        repositoriesContributedTo(includeUserRepositories: true, contributionTypes: [COMMIT, PULL_REQUEST, ISSUE, REPOSITORY]) { totalCount }
        organizations { totalCount }
        followers { totalCount }
      }
    }
  `);

  let commits = 0;
  for (const y of years) {
    const c = data.viewer[`y${y}`];
    if (c) commits += (c.totalCommitContributions || 0) + (c.restrictedContributionsCount || 0);
  }

  // Reviews : search inclut les repos privés accessibles au token.
  const reviews = await gql(
    `{ search(query: "type:pr reviewed-by:${LOGIN}", type: ISSUE) { issueCount } }`
  );

  return {
    commits,
    pullRequests: data.viewer.pullRequests.totalCount,
    reviews: reviews?.search?.issueCount ?? 0,
    reposContributed: data.viewer.repositoriesContributedTo.totalCount,
    organizations: data.viewer.organizations.totalCount,
    issues: data.viewer.issues.totalCount,
    followers: data.viewer.followers.totalCount,
    startYear,
  };
}

async function fetchLanguages() {
  const totals = new Map(); // name -> { size, color }
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

function render({ totals, languages, calendar }) {
  const W = 880;
  const pad = 28;

  // -- Tuiles de stats
  const tiles = [
    { value: totals.commits, label: "Contributions" },
    { value: totals.pullRequests, label: "Pull requests" },
    { value: totals.reviews, label: "Code reviews" },
    { value: totals.reposContributed, label: "Repos contribués" },
    { value: totals.organizations, label: "Organisations" },
  ];
  const tileY = 92;
  const tileW = (W - pad * 2) / tiles.length;
  const tilesSvg = tiles
    .map((t, i) => {
      const cx = pad + tileW * i + tileW / 2;
      return `
        <text x="${cx}" y="${tileY + 8}" text-anchor="middle" fill="${T.accent}" font-size="30" font-weight="700">${nf(t.value)}</text>
        <text x="${cx}" y="${tileY + 30}" text-anchor="middle" fill="${T.muted}" font-size="13">${esc(t.label)}</text>`;
    })
    .join("");

  // -- Barre de langages
  const langY = 172;
  const barX = pad;
  const barW = W - pad * 2;
  const barH = 14;
  let acc = 0;
  const langBar = languages
    .map((l) => {
      const w = (l.pct / 100) * barW;
      const x = barX + acc;
      acc += w;
      return `<rect x="${x.toFixed(1)}" y="${langY + 26}" width="${Math.max(0, w).toFixed(1)}" height="${barH}" fill="${l.color}" />`;
    })
    .join("");
  // Légende (2 lignes de 4)
  const legend = languages
    .map((l, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = barX + col * ((barW) / 4);
      const y = langY + 60 + row * 22;
      return `
        <circle cx="${x + 6}" cy="${y - 4}" r="6" fill="${l.color}" />
        <text x="${x + 18}" y="${y}" fill="${T.text}" font-size="13">${esc(l.name)}</text>
        <text x="${x + 18 + l.name.length * 7.4 + 8}" y="${y}" fill="${T.muted}" font-size="12">${l.pct.toFixed(1)}% · ${mb(l.size)}</text>`;
    })
    .join("");

  // -- Heatmap (12 derniers mois)
  const weeks = calendar.weeks;
  const maxDay = Math.max(1, ...weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)));
  const cell = 11;
  const gap = 3;
  const heatY = langY + 118;
  const heatX = pad;
  const heat = weeks
    .map((w, wi) =>
      w.contributionDays
        .map((d, di) => {
          const lvl = heatLevel(d.contributionCount, maxDay);
          const x = heatX + wi * (cell + gap);
          const y = heatY + 24 + di * (cell + gap);
          return `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2" fill="${T.heat[lvl]}" />`;
        })
        .join("")
    )
    .join("");

  const H = heatY + 24 + 7 * (cell + gap) + 34;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="'Segoe UI', Ubuntu, 'Helvetica Neue', Arial, sans-serif" role="img" aria-label="Statistiques GitHub d'Alexandre Da Costa">
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="14" fill="${T.bg}" stroke="${T.border}" />

  <!-- En-tête -->
  <text x="${pad}" y="40" fill="${T.text}" font-size="22" font-weight="700">Alexandre Da Costa</text>
  <text x="${pad}" y="62" fill="${T.muted}" font-size="13">Activité GitHub — contributions privées incluses</text>
  <circle cx="${W - pad - 6}" cy="34" r="5" fill="${T.accent}" />
  <text x="${W - pad - 18}" y="39" text-anchor="end" fill="${T.muted}" font-size="12">depuis ${totals.startYear}</text>

  <!-- Tuiles -->
  ${tilesSvg}

  <!-- Langages -->
  <text x="${pad}" y="${langY + 16}" fill="${T.text}" font-size="15" font-weight="600">Langages les plus utilisés</text>
  <clipPath id="barclip"><rect x="${barX}" y="${langY + 26}" width="${barW}" height="${barH}" rx="7" /></clipPath>
  <g clip-path="url(#barclip)">${langBar}</g>
  ${legend}

  <!-- Heatmap -->
  <text x="${pad}" y="${heatY + 12}" fill="${T.text}" font-size="15" font-weight="600">Contributions des 12 derniers mois</text>
  <text x="${W - pad}" y="${heatY + 12}" text-anchor="end" fill="${T.accent}" font-size="15" font-weight="700">${nf(calendar.totalContributions)}</text>
  ${heat}

  <!-- Pied -->
  <text x="${pad}" y="${H - 14}" fill="${T.muted}" font-size="11">Généré automatiquement · les chiffres incluent le travail dans les repos privés &amp; organisations</text>
</svg>`;
}

// ----------------------------------------------------------------------

async function main() {
  const [totals, languages, calendar] = await Promise.all([fetchTotals(), fetchLanguages(), fetchCalendar()]);
  const svg = render({ totals, languages, calendar });

  const fs = await import("node:fs");
  const path = await import("node:path");
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, svg, "utf8");

  console.log(`OK → ${OUT}`);
  console.log(
    `commits=${totals.commits} PR=${totals.pullRequests} reviews=${totals.reviews} repos=${totals.reposContributed} orgs=${totals.organizations} langs=${languages.length} calendar=${calendar.totalContributions}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
