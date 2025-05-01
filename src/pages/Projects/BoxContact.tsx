import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { PATH_PAGE } from "@/routes/paths";

/**
 * Affiche une boite de contact avec un bouton qui redirige vers la page de contact
 */
const BoxContact = () => {
  const styleBox = {
    mb: 8,
    p: 3,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 2,
    textAlign: "center",
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Box sx={styleBox}>
        <Typography variant="h5" gutterBottom>
          Vous avez un projet en tête ?
        </Typography>

        <Typography variant="body1">
          Je suis disponible pour réaliser des projets en collaboration. N'hésitez pas à me contacter !
        </Typography>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            component={NavLink}
            to={PATH_PAGE.contact}
          >
            Me contacter
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

// ----------------------------------------------------------------------

export default BoxContact;
