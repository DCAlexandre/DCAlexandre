import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

type CardRecommendationProps = {
  children: string;
  author: string;
  role: string;
  maxLength?: number;
};

/**
 * Affiche une recommandation stylisée façon blockquote centrée
 * @param children - Les textes à afficher
 * @param author - L'auteur de la recommandation
 * @param role - Le rôle de l'auteur
 * @param maxLength - La longueur maximale du texte
 */
const CardRecommendation = ({ children, author, role, maxLength = 250 }: CardRecommendationProps) => {
  const displayText = children.length > maxLength ? children.slice(0, maxLength) + "…" : children;

  // ----------------------------------------------------------------------

  return (
    <Box
      sx={{
        scrollSnapAlign: "start",
        borderRadius: 3,
        px: { xs: 2, sm: 4 },
        py: 4,
        textAlign: "center",
        position: "relative",
        mx: "auto",
        minWidth: 300,
        maxWidth: 300,
      }}
    >
      <Typography
        variant="h2"
        aria-hidden
        sx={{
          color: "primary.light",
          fontSize: { xs: "3rem", sm: "4rem" },
          lineHeight: 1,
          fontWeight: "bold",
          position: "absolute",
          left: 0,
          top: 8,
          opacity: 0.15,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        “
      </Typography>

      <Typography
        variant="body1"
        component="blockquote"
        sx={{
          fontStyle: "italic",
          color: "text.secondary",
          zIndex: 1,
          position: "relative",
          fontSize: { xs: "0.8rem", sm: "1rem" },
        }}
      >
        {displayText}
      </Typography>

      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Typography variant="subtitle1" component="cite" color="primary" fontWeight="bold">
          {author}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </Box>
    </Box>
  );
};

// ----------------------------------------------------------------------

export default CardRecommendation;
