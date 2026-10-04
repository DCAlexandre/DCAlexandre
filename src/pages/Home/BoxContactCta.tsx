import { NavLink } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import { PATH_PAGE } from "@/routes/paths";
import { trackEvent } from "@/utils/analytics";

// ----------------------------------------------------------------------

/**
 * Appel à l'action de fin de page d'accueil : un point de contact unique pour les
 * deux usages (mission freelance ou projet à créer, et recrutement en CDI).
 */
const BoxContactCta = () => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div variants={itemVariants}>
      <Box
        sx={{
          mt: 6,
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          border: "1px solid rgba(62,207,142,0.28)",
          bgcolor: "rgba(62,207,142,0.06)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: "bold" }}>
          Mon profil vous intéresse ? Discutons-en
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: "auto", mb: 3 }}>
          Une mission freelance, un projet complet à faire naître, ou un poste en CDI : dites-moi ce dont vous avez
          besoin, je vous réponds rapidement.
        </Typography>

        <Stack direction="row" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={NavLink}
            to={PATH_PAGE.contact}
            startIcon={<EmailIcon />}
            sx={{ px: 4, py: 1.25 }}
            onClick={() => trackEvent("cta_click", { cta: "home_contact", location: "home_bottom" })}
          >
            Me contacter
          </Button>
        </Stack>
      </Box>
    </motion.div>
  );
};

// ----------------------------------------------------------------------

export default BoxContactCta;
