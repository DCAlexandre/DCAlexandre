import { motion } from "framer-motion";
import { useTheme } from "@kared/kui/ThemeProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import SendIcon from "@mui/icons-material/Send";
import useFormContact from "./useFormContact";

/**
 * Formulaires de contact
 */
function FormContact() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { formData, errors, snackbar, handleChange, handleSubmit, handleCloseSnackbar } = useFormContact();

  // ----------------------------------------------------------------------

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper elevation={3} sx={{ p: 3, minHeight: 500 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
            Envoyez-moi un message
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Nom"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  helperText={errors.name ? "Veuillez entrer votre nom" : ""}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  helperText={errors.email ? "Veuillez entrer un email valide" : ""}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Sujet"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  helperText={errors.subject ? "Veuillez entrer un sujet" : ""}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  multiline
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  error={errors.message}
                  helperText={errors.message ? "Veuillez entrer votre message" : ""}
                  required
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ display: "flex", justifyContent: "flex-end", alignSelf: "flex-end" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth={isMobile}
                    startIcon={<SendIcon />}
                    sx={{ py: 1, px: 3 }}
                  >
                    Envoyer le message
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </motion.div>
    </>
  );
}

// ----------------------------------------------------------------------

export default FormContact;
