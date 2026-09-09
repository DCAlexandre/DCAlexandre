import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import certifications from "@/stores/data/certifications";

// ----------------------------------------------------------------------

/**
 * Section « Certifications » de la page Parcours (sous la timeline).
 */
const BoxCertifications = () => {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
        Certifications
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={2}>
        {certifications.map((cert, idx) => (
          <Grid size={{ xs: 12, sm: 6 }} key={cert.name}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: "easeOut" }}
            >
              <Paper elevation={0} sx={{ p: 2, height: "100%", display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <WorkspacePremiumIcon sx={{ color: "primary.light", flexShrink: 0 }} />

                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    {cert.name}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {cert.issuer} · {cert.date}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// ----------------------------------------------------------------------

export default BoxCertifications;
