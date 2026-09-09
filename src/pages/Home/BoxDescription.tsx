import { NavLink } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DescriptionIcon from "@mui/icons-material/Description";
import EmailIcon from "@mui/icons-material/Email";
import { useTheme } from "@kared/kui/ThemeProvider";
import { PATH_PAGE } from "@/routes/paths";
import { trackEvent } from "@/utils/analytics";

/**
 * Hero de la page d'accueil
 * @description Présentation principale avec titre accentué et appels à l'action
 */
const BoxDescription = () => {
  const { theme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  // Dégradé green → cyan appliqué au prénom
  const gradientText = {
    background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div variants={itemVariants}>
      <Box
        sx={{
          textAlign: "center",
          userSelect: "none",
          position: "relative",
          overflow: "hidden",
          background: `radial-gradient(120% 120% at 50% 0%, ${theme.palette.primary.dark}2e 0%, ${theme.palette.primary.main}0f 50%, transparent 72%)`,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          borderRadius: 4,
          px: { xs: 3, md: 6 },
          py: { xs: 5, md: 7 },
        }}
      >
        <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
          Bonjour, moi c'est{" "}
          <Box component="span" sx={gradientText}>
            Alexandre
          </Box>{" "}
          👋
        </Typography>

        <Typography variant="h5" component="p" sx={{ mb: 1.5, fontWeight: 400, color: "text.secondary" }}>
          Tech Lead. 10 ans à concevoir, structurer et livrer des produits — de l'idée jusqu'à la production.
        </Typography>

        <Typography variant="h6" component="p" sx={{ mb: 4, fontWeight: 300, fontStyle: "italic" }}>
          J'avance par cycles courts : des livrables concrets rapidement, et un produit qu'on fait évoluer ensemble.
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={NavLink}
            to={PATH_PAGE.projects}
            endIcon={<ArrowForwardIcon />}
            sx={{ px: 4, py: 1.25 }}
            onClick={() => trackEvent("cta_click", { cta: "voir_projets", location: "hero" })}
          >
            Voir mes projets
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={NavLink}
            to={PATH_PAGE.cv}
            startIcon={<DescriptionIcon />}
            sx={{ px: 4, py: 1.25 }}
            onClick={() => trackEvent("cta_click", { cta: "mon_cv", location: "hero" })}
          >
            Mon CV
          </Button>

          <Button
            variant="outlined"
            color="primary"
            size="large"
            component={NavLink}
            to={PATH_PAGE.contact}
            startIcon={<EmailIcon />}
            sx={{ px: 4, py: 1.25 }}
            onClick={() => trackEvent("cta_click", { cta: "me_contacter", location: "hero" })}
          >
            Me contacter
          </Button>
        </Stack>
      </Box>
    </motion.div>
  );
};

// ----------------------------------------------------------------------

export default BoxDescription;
