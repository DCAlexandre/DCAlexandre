import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import contactConfig from "@/config/contact.config";

/**
 * Carte contenant les informations de contact
 */
function CardContact() {
  const contactMethods = [
    {
      icon: <EmailIcon fontSize="large" />,
      title: "Email",
      value: contactConfig.email,
      link: `mailto:${contactConfig.email}`,
      color: "#e8614f",
    },
    {
      icon: <PhoneIcon fontSize="large" />,
      title: "Téléphone",
      value: contactConfig.phone,
      link: `tel:${contactConfig.phone.replace(/\s/g, "")}`,
      color: "#0F9D58",
    },
    {
      icon: <LocationOnIcon fontSize="large" />,
      title: "Localisation",
      value: contactConfig.location,
      color: "#4285F4",
    },
  ];

  // ----------------------------------------------------------------------

  const handleClickContactMethod = (link?: string) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  // ----------------------------------------------------------------------

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

  // ----------------------------------------------------------------------

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Paper elevation={3} sx={{ p: 2.5, height: "100%", minHeight: 500 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
          Mes coordonnées
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {contactMethods.map((method, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                  aria-label={`Ouvrir le lien ${method.title}`}
                  onClick={() => handleClickContactMethod(method.link)}
                  sx={{
                    cursor: method.link ? "pointer" : "default",
                    p: { xs: 1, md: 0.5 },
                    bgcolor: `${method.color}20`,
                    color: method.color,
                    "&:hover": { bgcolor: `${method.color}30` },
                  }}
                >
                  {method.icon}
                </IconButton>

                <Box>
                  <Typography variant="subtitle1" component="h4" fontWeight="bold">
                    {method.title}
                  </Typography>

                  {method.link ? (
                    <Link
                      href={method.link}
                      target={method.link.startsWith("mailto:") || method.link.startsWith("tel:") ? "_self" : "_blank"}
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

        <Typography variant="h6" component="h5" gutterBottom>
          Retrouvez-moi sur
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              href={contactConfig.linkedIn}
              aria-label="Ouvrir le lien LinkedIn"
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
              href={contactConfig.facebook}
              aria-label="Ouvrir le lien Facebook"
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

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <IconButton
              href={contactConfig.github}
              aria-label="Ouvrir le lien GitHub"
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
  );
}

// ----------------------------------------------------------------------

export default CardContact;
