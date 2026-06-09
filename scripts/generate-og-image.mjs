// ----------------------------------------------------------------------
// Génère l'image de partage social (Open Graph / Twitter) — 1200×630.
//
// Rend une carte HTML brandée (palette émeraude, photo, police Nunito
// embarquée) via un navigateur headless (puppeteer, déjà utilisé pour le
// pré-rendu), puis l'exporte en PNG dans public/assets/og-image.png.
//
// Usage : node scripts/generate-og-image.mjs  (ou `pnpm og`)
// ----------------------------------------------------------------------

import puppeteer from "puppeteer";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");
const fontsDir = path.join(publicDir, "fonts", "Nunito");

// Palette (alignée sur src/config/theme.config.ts)
const COLORS = {
  bg: "#0B0F0E",
  primary: "#3ECF8E",
  primaryLight: "#6EE7B7",
  text: "#F2F5F4",
  textMuted: "#9BA8A4",
};

// ----------------------------------------------------------------------

/** Lit un fichier et renvoie une data-URI base64. */
async function toDataUri(filePath, mime) {
  const buffer = await fs.readFile(filePath);
  return `data:${mime};base64,${buffer.toString("base64")}`;
}

async function run() {
  const [regular, bold, extraBold, avatar] = await Promise.all([
    toDataUri(path.join(fontsDir, "Nunito-Regular.woff2"), "font/woff2"),
    toDataUri(path.join(fontsDir, "Nunito-Bold.woff2"), "font/woff2"),
    toDataUri(path.join(fontsDir, "Nunito-ExtraBold.woff2"), "font/woff2"),
    toDataUri(path.join(publicDir, "assets", "me.webp"), "image/webp"),
  ]);

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face { font-family: "Nunito"; font-weight: 400; src: url(${regular}) format("woff2"); }
      @font-face { font-family: "Nunito"; font-weight: 700; src: url(${bold}) format("woff2"); }
      @font-face { font-family: "Nunito"; font-weight: 800; src: url(${extraBold}) format("woff2"); }

      * { margin: 0; padding: 0; box-sizing: border-box; }

      .card {
        width: 1200px;
        height: 630px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 56px;
        padding: 80px;
        background:
          radial-gradient(120% 120% at 0% 0%, ${COLORS.primary}26 0%, transparent 55%),
          radial-gradient(100% 100% at 100% 100%, ${COLORS.primary}14 0%, transparent 50%),
          ${COLORS.bg};
        font-family: "Nunito", sans-serif;
        color: ${COLORS.text};
        position: relative;
      }
      .accentbar {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 14px;
        background: linear-gradient(180deg, ${COLORS.primaryLight}, ${COLORS.primary});
      }
      .left { display: flex; flex-direction: column; gap: 18px; max-width: 760px; }
      .eyebrow { font-weight: 700; font-size: 26px; letter-spacing: 0.5px; color: ${COLORS.primary}; }
      .name { font-weight: 800; font-size: 84px; line-height: 1.02; letter-spacing: -2px; }
      .role { font-weight: 700; font-size: 38px; color: ${COLORS.text}; }
      .stack { font-weight: 400; font-size: 26px; color: ${COLORS.textMuted}; }
      .avatarWrap {
        flex-shrink: 0;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        padding: 6px;
        background: linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.primary});
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
      }
      .avatar { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; display: block; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="accentbar"></div>
      <div class="left">
        <div class="eyebrow">kared-dev.fr/alexandre</div>
        <div class="name">Alexandre<br />Da Costa</div>
        <div class="role">Tech Lead &amp; Développeur Fullstack</div>
        <div class="stack">React · Node.js · NestJS · PostgreSQL · Docker · CI/CD</div>
      </div>
      <div class="avatarWrap"><img class="avatar" src="${avatar}" alt="" /></div>
    </div>
  </body>
</html>`;

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");

  const outPath = path.join(publicDir, "assets", "og-image.png");
  await page.screenshot({ path: outPath, type: "png" });

  await browser.close();
  console.log(`[og-image] Généré : ${path.relative(publicDir, outPath)}`);
}

run().catch((error) => {
  console.error("[og-image] Échec :", error);
  process.exit(1);
});
