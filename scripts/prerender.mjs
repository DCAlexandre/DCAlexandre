// ----------------------------------------------------------------------
// Pré-rendu statique des métadonnées SEO
//
// Clone le `dist/index.html` produit par le build et injecte, pour chaque
// route, les balises <title> / <meta description> / canonical / Open Graph
// / Twitter dans le <head>, puis écrit `dist/<route>/index.html`.
//
// Les scrapers sociaux (LinkedIn, X, Facebook, Slack…) n'exécutent pas le
// JS : ils lisent ainsi des métadonnées correctes au lieu du <head> vide
// du shell SPA. (Google, lui, rend le JS et lit les balises injectées par
// <Seo /> via le hissage natif React 19.)
//
// Aucune dépendance navigateur : simple lecture/écriture de fichiers.
// Source unique des métadonnées : src/config/seo.pages.json (partagé avec
// le composant <Seo />). La route 404 (noIndex) n'est pas pré-rendue.
//
// Usage : node scripts/prerender.mjs  (après `vite build`)
// ----------------------------------------------------------------------

import { loadEnv } from "vite";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const seoPagesFile = path.join(rootDir, "src/config/seo.pages.json");

// URL de production (sans slash final), lue depuis .env(.production) comme le
// fait le plugin sitemap ; valeur de secours alignée sur src/components/Seo.tsx.
const { VITE_SITE_URL } = loadEnv("production", rootDir, "VITE_");
const SITE_URL = VITE_SITE_URL || "https://kared-dev.fr/alexandre";

// ----------------------------------------------------------------------

/** Échappe les caractères sensibles pour une valeur d'attribut HTML. */
function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// Dimensions et texte alternatif de l'image de partage par défaut (miroir de src/components/Seo.tsx).
const IMAGE_ALT = "Alexandre Da Costa, Tech Lead & Développeur Fullstack Freelance";

/** Construit le bloc de balises SEO d'une page (miroir de src/components/Seo.tsx). */
function buildSeoBlock({ path: pagePath, title, description, image, noIndex }) {
  const url = `${SITE_URL}${pagePath}`;
  const fullTitle = `${title} | Alexandre Da Costa`;
  const ogImage = image || `${SITE_URL}/assets/og-image.png`;

  const tags = [
    `<title>${escapeAttr(fullTitle)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
    noIndex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<link rel="canonical" href="${escapeAttr(url)}" />`,
    // Open Graph / Facebook / LinkedIn
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${escapeAttr(url)}" />`,
    `<meta property="og:title" content="${escapeAttr(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:image" content="${escapeAttr(ogImage)}" />`,
    `<meta property="og:image:width" content="2400" />`,
    `<meta property="og:image:height" content="1260" />`,
    `<meta property="og:image:alt" content="${escapeAttr(IMAGE_ALT)}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:site_name" content="Alexandre Da Costa | Tech Lead & Développeur Fullstack Freelance" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    // X (anciennement Twitter)
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:site" content="@Alexandre__DC" />`,
    `<meta name="twitter:creator" content="@Alexandre__DC" />`,
    `<meta name="twitter:title" content="${escapeAttr(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`,
    `<meta name="twitter:image:alt" content="${escapeAttr(IMAGE_ALT)}" />`,
  ];

  return `    <!-- SEO pré-rendu (scripts/prerender.mjs) -->\n    ${tags.join("\n    ")}\n  `;
}

// ----------------------------------------------------------------------

async function run() {
  // Shell SPA produit par `vite build` : sert de gabarit pour toutes les routes.
  const template = await fs.readFile(path.join(distDir, "index.html"), "utf-8").catch(() => {
    throw new Error("dist/index.html introuvable, lance `vite build` avant le pré-rendu.");
  });

  if (!template.includes("</head>")) {
    throw new Error("Balise </head> absente du gabarit dist/index.html.");
  }

  const seoPages = JSON.parse(await fs.readFile(seoPagesFile, "utf-8"));

  // On ne pré-rend que les pages indexables (la 404 noIndex est servie via le fallback).
  const pages = Object.values(seoPages).filter((page) => !page.noIndex);

  for (const page of pages) {
    const html = template.replace("</head>", `${buildSeoBlock(page)}</head>`);
    const outDir = page.path === "" ? distDir : path.join(distDir, page.path);

    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
    console.log(`[prerender] ✓ ${page.path || "/"} → ${path.relative(distDir, path.join(outDir, "index.html"))}`);
  }

  console.log(`[prerender] Terminé (${pages.length} routes, base ${SITE_URL}).`);
}

run().catch((error) => {
  console.error("[prerender] Échec :", error.message ?? error);
  process.exit(1);
});
