import { useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Link,
  Divider,
  Card,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
  AlertColor,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import SendIcon from "@mui/icons-material/Send";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PageContainer from "@/components/PageContainer";

// Animation pour les éléments qui apparaissent en séquence
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const { VITE_MY_EMAIL, VITE_MY_PHONE, VITE_MY_LOCATION, VITE_MY_LINKEDIN, VITE_MY_GITHUB, VITE_MY_FACEBOOK } =
  import.meta.env;

// Données de contact basées sur votre README
const contactInfo = {
  email: VITE_MY_EMAIL,
  phone: VITE_MY_PHONE,
  location: VITE_MY_LOCATION,
  linkedin: VITE_MY_LINKEDIN,
  facebook: VITE_MY_FACEBOOK,
  github: VITE_MY_GITHUB,
};

function PageContact() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    name: boolean;
    email: boolean;
    subject: boolean;
    message: boolean;
  }>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Réinitialiser l'erreur lorsque l'utilisateur commence à taper
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      subject: formData.subject.trim() === "",
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (validateForm()) {
      // Ici, vous pourriez ajouter la logique pour envoyer le formulaire
      // Par exemple, avec fetch ou axios pour appeler une API

      console.log("Formulaire soumis:", formData);

      // Afficher un message de succès
      setSnackbar({
        open: true,
        message: "Votre message a été envoyé avec succès !",
        severity: "success",
      });

      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } else {
      setSnackbar({
        open: true,
        message: "Veuillez corriger les erreurs dans le formulaire.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const contactMethods = [
    {
      icon: <EmailIcon fontSize="large" />,
      title: "Email",
      value: contactInfo.email,
      link: `mailto:${contactInfo.email}`,
      color: "#e8614f",
    },
    // {
    //   icon: <LinkedInIcon fontSize="large" />,
    //   title: "LinkedIn",
    //   value: "Alexandre Da Costa",
    //   link: contactInfo.linkedin,
    //   color: "#078ad1",
    // },
    // {
    //   icon: <GitHubIcon fontSize="large" />,
    //   title: "GitHub",
    //   value: "DCAlexandre",
    //   link: contactInfo.github,
    //   color: "#a2a2a2",
    // },
    {
      icon: <LocationOnIcon fontSize="large" />,
      title: "Localisation",
      value: contactInfo.location,
      link: null,
      color: "#4285F4",
    },
    {
      icon: <PhoneIcon fontSize="large" />,
      title: "Téléphone",
      value: contactInfo.phone,
      link: `tel:${contactInfo.phone.replace(/\s/g, "")}`,
      color: "#0F9D58",
    },
  ];

  return (
    <PageContainer motionVariant="bottom-in">
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Me Contacter
        </Typography>
        <Typography variant="h6" color="textSecondary" paragraph align="center" sx={{ mb: 6 }}>
          N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Informations de contact */}
        <Grid size={{ xs: 12, md: 5 }}>
          <motion.div initial="hidden" animate="visible" variants={containerVariants}>
            <Paper elevation={3} sx={{ p: 3, height: "100%", minHeight: 500 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
                Mes coordonnées
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {contactMethods.map((method, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <IconButton
                        sx={{
                          bgcolor: `${method.color}20`,
                          color: method.color,
                          "&:hover": { bgcolor: `${method.color}30` },
                        }}
                      >
                        {method.icon}
                      </IconButton>

                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {method.title}
                        </Typography>

                        {method.link ? (
                          <Link
                            href={method.link}
                            target={
                              method.link.startsWith("mailto:") || method.link.startsWith("tel:") ? "_self" : "_blank"
                            }
                            underline="hover"
                            color="primary"
                          >
                            {method.value}
                          </Link>
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            {method.value}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                Retrouvez-moi sur
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    href={contactInfo.linkedin}
                    target="_blank"
                    sx={{
                      bgcolor: "#078ad120",
                      color: "#078ad1",
                      "&:hover": { bgcolor: "#078ad130" },
                    }}
                  >
                    <LinkedInIcon fontSize="large" />
                  </IconButton>
                </motion.div>

                {/* Facebook */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    href={contactInfo.facebook}
                    target="_blank"
                    sx={{
                      bgcolor: "#0077B520",
                      color: "#0077B5",
                      "&:hover": { bgcolor: "#0077B530" },
                    }}
                  >
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                </motion.div>

                {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    href={`mailto:${contactInfo.email}`}
                    sx={{
                      bgcolor: "#e8614f20",
                      color: "#e8614f",
                      "&:hover": { bgcolor: "#e8614f30" },
                    }}
                  >
                    <EmailIcon fontSize="large" />
                  </IconButton>
                </motion.div> */}

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <IconButton
                    href={contactInfo.github}
                    target="_blank"
                    sx={{
                      bgcolor: "#a2a2a220",
                      color: "#a2a2a2",
                      "&:hover": { bgcolor: "#a2a2a230" },
                    }}
                  >
                    <GitHubIcon fontSize="large" />
                  </IconButton>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </Grid>

        {/* Formulaire de contact */}
        <Grid size={{ xs: 12, md: 7 }}>
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
        </Grid>
      </Grid>

      {/* Carte de disponibilité */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card
          elevation={2}
          sx={{
            mt: 4,
            p: 2,
            elevation: 3,
            bgcolor: "background.paper",
            borderColor: "primary.main",
          }}
        >
          <CardContent sx={{ p: 1, paddingBottom: "8px !important" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography variant="h6" component="div">
                👯 Je suis disponible pour réaliser des projets en collaboration
              </Typography>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  startIcon={<EmailIcon />}
                  variant="contained"
                  color="primary"
                  href={`mailto:${contactInfo.email}?subject=Proposition%20de%20collaboration`}
                  sx={{ fontWeight: "bold" }}
                >
                  Contacter
                </Button>
              </motion.div>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageContact;
