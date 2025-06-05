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
      light: "#98EE99",
      main: "#66BB6A",
      dark: "#338A3E",
      contrastText: "#000000",
    },
    secondary: {
      light: "#C3FDFF",
      main: "#90CAF9",
      dark: "#5D99C6",
      contrastText: "#000000",
    },
    action: {
      selected: "rgba(255,255,255,0.1)",
    },
    background: {
      default: "rgba(5, 20, 24, 1)",
      paper: "rgba(12, 30, 36, 1)",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
};

// ----------------------------------------------------------------------

export default config;
