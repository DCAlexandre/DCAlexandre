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
 * Formulaire de contact
 */
function FormContact() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { errors, isSubmitting, snackbar, register, submit, closeSnackbar } = useFormContact();

  // ----------------------------------------------------------------------

  return (
    <>
      <Snackbar open={snackbar.open} onClose={closeSnackbar} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
        <Alert onClose={closeSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Paper elevation={3} sx={{ p: 2.5, minHeight: 500 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
            Envoyez-moi un message
          </Typography>

          <form onSubmit={submit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Nom"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message || ""}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message || ""}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  label="Sujet"
                  {...register("subject")}
                  error={!!errors.subject}
                  helperText={errors.subject?.message || ""}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={6}
                  label="Message"
                  {...register("message")}
                  error={!!errors.message}
                  helperText={errors.message?.message || ""}
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
                    aria-label="Envoyer le message"
                    variant="contained"
                    color="primary"
                    startIcon={<SendIcon />}
                    sx={{ py: 1, px: 3 }}
                    fullWidth={isMobile}
                    loading={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
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
