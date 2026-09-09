import { motion, useReducedMotion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BuildIcon from "@mui/icons-material/Build";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ScheduleIcon from "@mui/icons-material/Schedule";

// ----------------------------------------------------------------------

const MODES = [
  {
    Icon: RocketLaunchIcon,
    title: "Mission au forfait",
    text: "Cadrage, devis et délai, puis développement complet — ou renfort ponctuel.",
  },
  {
    Icon: BuildIcon,
    title: "Forfait de maintenance",
    text: "Votre site ou application reste à jour, sauvegardé et publiable, sans y penser.",
  },
  {
    Icon: HandshakeIcon,
    title: "Partenariat",
    text: "Quand je crois au projet et à la personne, je m'implique dans la durée.",
  },
];

/**
 * Section « Comment je travaille » : 3 modes d'engagement (cartes) + un encart
 * disponibilité distinct. Présentation volontairement différente de « À propos ».
 * @description Sans grille tarifaire ni TJM (volontaire).
 */
const BoxHowIWork = () => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div variants={itemVariants}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mt: 6, mb: 2, fontWeight: "bold", textAlign: "center", userSelect: "none" }}
      >
        Comment je travaille
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: "center", maxWidth: 760, mx: "auto" }}>
        Je pars du besoin réel : beaucoup de questions au cadrage, c'est là que ça coûte le moins cher. Ensuite, je
        prends en charge le développement de bout en bout — seul ou en binôme — avec des points d'étape réguliers.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* 3 modes d'engagement — cartes en colonnes (icône centrée) */}
      <Grid container spacing={3}>
        {MODES.map(({ Icon, title, text }) => (
          <Grid size={{ xs: 12, md: 4 }} key={title}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  mb: 2,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "rgba(62,207,142,0.12)",
                  color: "primary.light",
                }}
              >
                <Icon />
              </Box>

              <Typography variant="h6" component="h3" gutterBottom>
                {title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {text}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Disponibilité — encart distinct (accentué, pas une carte) */}
      <Box
        sx={{
          mt: 3,
          p: { xs: 2.5, md: 3 },
          borderRadius: 3,
          border: "1px solid rgba(62,207,142,0.28)",
          bgcolor: "rgba(62,207,142,0.06)",
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        <ScheduleIcon sx={{ color: "primary.light", mt: 0.3, flexShrink: 0 }} />

        <Typography variant="body2" color="text.secondary">
          <Box component="strong" sx={{ color: "text.primary" }}>
            Disponibilité
          </Box>{" "}
          — déjà Tech Lead sur une équipe, j'interviens en renfort, audit ou développement complet, principalement à
          distance. Je n'endosse pas la responsabilité d'une seconde équipe à temps plein. J'évalue chaque mission avant
          de m'engager ; sinon je vous oriente vers des confrères de confiance.
        </Typography>
      </Box>
    </motion.div>
  );
};

// ----------------------------------------------------------------------

export default BoxHowIWork;
