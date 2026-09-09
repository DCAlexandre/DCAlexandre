import { ThemeOptions } from "@mui/material/styles";
// import { ThemeOptions } from "@kared/kui/ThemeProvider";

// ----------------------------------------------------------------------

// Palette de marque — Émeraude raffiné (réf. Supabase / Tailwind) sur fond neutre.
// L'accent vert est volontairement frais et légèrement désaturé, utilisé avec parcimonie.
const PRIMARY = { light: "#6EE7B7", main: "#3ECF8E", dark: "#2BB673" };
const SECONDARY = { light: "#5EEAD4", main: "#2DD4BF", dark: "#14B8A6" };

// Texte contrasté sombre posé sur les accents clairs (vert/teal)
const ON_ACCENT = "#04140D";

/**
 * Theme configuration
 * @description Dark mode neutre, accent émeraude unique, boutons plats.
 *   Échelle typographique, hiérarchie de surfaces et defaults MUI modernisés.
 * @type {ThemeOptions}
 */
const config: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      ...PRIMARY,
      contrastText: ON_ACCENT,
    },
    secondary: {
      ...SECONDARY,
      contrastText: ON_ACCENT,
    },
    action: {
      selected: "rgba(255,255,255,0.08)",
      hover: "rgba(255,255,255,0.05)",
    },
    background: {
      // Fond quasi-neutre (slate near-black) pour laisser l'accent ressortir
      default: "#0B0F0E",
      paper: "#141A18",
    },
    divider: "rgba(255,255,255,0.08)",
    text: {
      primary: "#F2F5F4",
      secondary: "#9BA8A4",
    },
  },

  shape: {
    borderRadius: 14,
  },

  // Échelle typographique (remplace celle de @kared/kui → fontFamily redéclaré)
  typography: {
    fontFamily: '"Quicksand", "Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightBold: 700,
    h1: { fontSize: "clamp(2.4rem, 5vw, 3.4rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" },
    h2: { fontSize: "clamp(2rem, 4vw, 2.6rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em" },
    h3: { fontSize: "clamp(1.7rem, 3.2vw, 2.15rem)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.01em" },
    h4: { fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.25, letterSpacing: "-0.01em" },
    h5: { fontSize: "1.25rem", fontWeight: 700, lineHeight: 1.3 },
    h6: { fontSize: "1.1rem", fontWeight: 600, lineHeight: 1.4 },
    subtitle1: { fontSize: "1rem" },
    subtitle2: { fontSize: "0.938rem", fontWeight: 600 },
    body1: { fontSize: "1rem", lineHeight: 1.65, fontWeight: 500 },
    body2: { fontSize: "0.938rem", lineHeight: 1.6, fontWeight: 500 },
    caption: { fontSize: "0.875rem" },
    button: { fontSize: "0.95rem", fontWeight: 700, textTransform: "none" },
  },

  components: {
    // Respect global de "réduire les animations" + anneau de focus accessible
    MuiCssBaseline: {
      styleOverrides: {
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration: "0.01ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.01ms !important",
            scrollBehavior: "auto !important",
          },
        },
        "*:focus-visible": {
          outline: `2px solid ${PRIMARY.main}`,
          outlineOffset: "2px",
          borderRadius: "4px",
        },
      },
    },

    // Bordure subtile sur toutes les surfaces
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.06)",
        },
      },
    },

    // Cards modernisées : léger glassmorphism + ombre douce
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(255,255,255,0.07)",
          backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0))",
          backdropFilter: "blur(8px)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
        },
      },
    },

    // Boutons plats : aplat franc, pas de dégradé ni de halo, hover subtil
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: "none",
          fontWeight: 700,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
        containedPrimary: {
          "&:hover": { backgroundColor: PRIMARY.dark },
        },
        containedSecondary: {
          "&:hover": { backgroundColor: SECONDARY.dark },
        },
        outlinedPrimary: {
          borderColor: `${PRIMARY.main}66`,
          "&:hover": { borderColor: PRIMARY.main, backgroundColor: `${PRIMARY.main}14` },
        },
      },
    },
  },
};

// ----------------------------------------------------------------------

export default config;
