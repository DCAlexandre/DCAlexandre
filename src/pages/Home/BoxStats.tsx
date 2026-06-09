import { motion, useReducedMotion } from "framer-motion";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import projects from "@/stores/data/projects";

// ----------------------------------------------------------------------

// Chiffres clés — `projects.length` est dérivé des données pour rester exact
const STATS: { value: string; label: string }[] = [
  { value: "10+", label: "Années d'expérience" },
  { value: `${projects.length}`, label: "Projets réalisés" },
  { value: "iOS · Android · Web", label: "Multi-plateforme" },
];

/**
 * Bandeau de chiffres clés
 */
const BoxStats = () => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div variants={itemVariants}>
      <Paper elevation={0} sx={{ mt: 3, p: { xs: 2, md: 3 }, borderRadius: 4 }}>
        <Grid container spacing={2} sx={{ textAlign: "center" }}>
          {STATS.map((stat) => (
            <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
              <Typography variant="h4" component="p" sx={{ fontWeight: 800, color: "primary.main" }}>
                {stat.value}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </motion.div>
  );
};

// ----------------------------------------------------------------------

export default BoxStats;
