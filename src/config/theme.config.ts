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
      main: "#66BB6A",
      light: "#98EE99",
      dark: "#338A3E",
      contrastText: "#000000",
    },
    secondary: {
      main: "#90CAF9",
      light: "#C3FDFF",
      dark: "#5D99C6",
      contrastText: "#000000",
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
