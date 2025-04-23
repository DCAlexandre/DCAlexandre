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
  // Configuration du dossier public
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
      "@emotion/react": path.resolve(
        __dirname,
        "./node_modules/@emotion/react"
      ),
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
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("@mui/icons-material")) {
              return "@mui/icons-material";
            } else if (id.includes("@mui/lab")) {
              return "@mui/lab";
            } else if (id.includes("@mui/material")) {
              return "@mui/material";
            } else if (id.includes("@mui/x-data-grid")) {
              return "@mui/x-data-grid";
            } else if (id.includes("@mui/x-date-pickers")) {
              return "@mui/x-date-pickers";
            }

            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          } else {
            return "index";
          }
        },
      },
    },
  },
});
