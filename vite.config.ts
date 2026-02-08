import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import istanbul from "vite-plugin-istanbul";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

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
