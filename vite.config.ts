import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import istanbul from "vite-plugin-istanbul";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import { PATH_PAGE } from "./src/routes/paths";

// ----------------------------------------------------------------------

/**
 * Génère automatiquement `sitemap.xml` à partir de PATH_PAGE au build.
 * @description Source unique de vérité : ajouter une route dans src/routes/paths.ts
 *   met à jour le sitemap. La route `root` est ignorée et `home` est mappée
 *   sur la racine (`/alexandre/`) pour coller au canonical de l'accueil.
 */
function sitemapPlugin(): Plugin {
  // Valeur de secours ; surchargée par VITE_SITE_URL (.env) via configResolved
  let siteUrl = "https://kared-dev.fr/alexandre";
  const PRIORITIES: Record<string, string> = {
    home: "1.0",
    projects: "0.9",
    career: "0.7",
    skills: "0.7",
    cv: "0.8",
    contact: "0.6",
  };

  return {
    name: "generate-sitemap",
    configResolved(config) {
      if (config.env.VITE_SITE_URL) {
        siteUrl = config.env.VITE_SITE_URL;
      }
    },
    generateBundle() {
      const urls = Object.entries(PATH_PAGE)
        .filter(([key]) => key !== "root" && key !== "legal")
        .map(([key, pagePath]) => {
          const loc = key === "home" ? `${siteUrl}/` : `${siteUrl}${pagePath}`;
          const priority = PRIORITIES[key] ?? "0.7";
          return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
        })
        .join("\n");

      const source = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

      this.emitFile({ type: "asset", fileName: "sitemap.xml", source });
    },
  };
}

/**
 * Configuration de Vite
 * @see https://vitejs.dev/config
 */
export default defineConfig({
  // Configuration des chemins
  base: "/alexandre/",
  publicDir: "public",

  // Configuration du serveur
  server: {
    port: 3095,
    watch: {
      usePolling: true,
      ignored: [
        "**/node_modules/**",
        "**/dist/**",
        "**/resources/**",
        // Coverage
        "**/.nyc_output/**",
        "**/coverage/**",
      ],
    },
  },

  // Configuration des plugins
  plugins: [
    react(),
    istanbul({
      include: "src/*", // Fichiers à instrumenter
      exclude: ["node_modules", "test", "cypress"], // Exclusions
      extension: [".js", ".ts", ".jsx", ".tsx"], // Extensions concernées
      requireEnv: false, // Instrumente le code en local et en CI
    }),
    sitemapPlugin(),
  ],

  // Configuration des alias
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),

      // Importation déclarée uniquement en dev du module @kared/kui
      "@emotion/react": path.resolve(__dirname, "./node_modules/@emotion/react"),
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
    },
  },

  // Configuration de la génération du build
  build: {
    target: "modules",
    sourcemap: "hidden",
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      plugins: [visualizer({ open: false })],
      output: {
        manualChunks(id) {
          // Code applicatif
          if (!id.includes("node_modules")) {
            return undefined;
          }

          // Dépendances
          const match = id.match(/node_modules\/(?:\.pnpm\/)?((?:@[^/]+\/)?[^/]+)/);
          const pkgName = match ? match[1] : null;

          if (pkgName) {
            // Sanitize : @mui/material → mui-material
            return pkgName
              .replace(/^@/, "") // Supprime le @ initial
              .replace(/\//g, "-"); // Remplace / par -
          }

          return "vendor";
        },
      },
    },
  },
});
