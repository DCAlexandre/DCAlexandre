import Box from "@mui/material/Box";
import { useTheme } from "@kared/kui/ThemeProvider";

// ----------------------------------------------------------------------

type BoxNewProps = {
  size?: "small" | "medium";
};

/**
 * Affiche un badge "NEW"
 * @param size - La taille du BoxNew
 */
function BoxNew({ size = "medium" }: BoxNewProps) {
  const { theme } = useTheme();
  const sizePx = size === "small" ? 30 : 40;
  const fontSize = size === "small" ? "0.6rem" : "0.8rem";

  // ----------------------------------------------------------------------

  return (
    <Box
      sx={{
        width: sizePx,
        height: sizePx,
        fontSize,
        position: "absolute",
        userSelect: "none",
        top: -15,
        right: -15,
        bgcolor: theme.palette.secondary.main,
        color: theme.palette.getContrastText(theme.palette.secondary.main),
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        boxShadow: theme.shadows[3],
        zIndex: 100,
      }}
    >
      NEW
    </Box>
  );
}

// ----------------------------------------------------------------------

export default BoxNew;
