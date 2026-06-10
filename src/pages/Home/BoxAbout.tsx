import { motion, useReducedMotion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import CardAbout from "@/components/CardAbout";

/**
 * Affiche une description à propos de moi
 */
const BoxAbout = () => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div variants={itemVariants}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 6, mb: 3, fontWeight: "bold", textAlign: "center", userSelect: "none" }}
      >
        À propos de moi
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Stack spacing={3}>
        <CardAbout color="primary.main" Icon={WorkIcon}>
          <Typography variant="body1">
            <strong>Tech Lead chez Comète</strong>, je pilote la modernisation d'une suite d'outils métiers
            interconnectés : architecture, CI/CD, automatisation des déploiements et support aux équipes technique et
            produit.
          </Typography>
        </CardAbout>

        <CardAbout color="secondary.main" Icon={CodeIcon}>
          <Typography variant="body1">
            En <strong>freelance via Kared Dev</strong>, je construis des produits sur mesure de bout en bout — de
            l'idéation jusqu'à la mise en production — pour start-ups, PME et indépendants.
          </Typography>
        </CardAbout>

        <CardAbout color="primary.light" Icon={GroupsIcon}>
          <Typography variant="body1">
            J'interviens souvent <strong>là où un projet commence à ralentir</strong> : dette technique, architecture
            qui ne passe plus à l'échelle, déploiements risqués. J'aime la technique au service d'un vrai besoin.
          </Typography>
        </CardAbout>

        <CardAbout color="primary.dark" Icon={SchoolIcon}>
          <Typography variant="body1">
            En <strong>veille et formation continue</strong> (IA, cloud, DevOps) pour garder des solutions fiables,
            évolutives et à jour.
          </Typography>
        </CardAbout>
      </Stack>
    </motion.div>
  );
};

// ----------------------------------------------------------------------

export default BoxAbout;
