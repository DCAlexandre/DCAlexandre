import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";

/**
 * Affichage de l'application
 * @description Point d'entrée de l'application
 * @see https://react.dev/reference/react-dom/client/createRoot
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
