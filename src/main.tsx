import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";

/**
 * Render the application
 * @description Main entry point for the application
 * @see https://react.dev/reference/react-dom/client/createRoot
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
