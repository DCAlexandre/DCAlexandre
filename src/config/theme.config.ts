import { ThemeOptions } from "@mui/material/styles";
// import { ThemeOptions } from "@kared/kui/ThemeProvider";

/**
 * Theme configuration
 * @type {ThemeOptions}
 */
const config: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#66BB6A", // Vert qui respecte les normes d'accessibilité sur fond sombre
      light: "#98EE99",
      dark: "#338A3E",
      contrastText: "#000000"
    },
    secondary: {
      main: "#90CAF9", // Bleu clair pour un bon contraste sur fond sombre
      light: "#C3FDFF",
      dark: "#5D99C6",
      contrastText: "#000000"
    },
    background: {
      default: "#121212", // Fond standard pour thème sombre Material Design
      paper: "#1E1E1E" // Un peu plus clair pour les surfaces
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0"
    }
  }
};

// ----------------------------------------------------------------------

export default config;
