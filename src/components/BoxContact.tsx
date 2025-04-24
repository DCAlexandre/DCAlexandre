import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

/**
 * Affiche les liens de contact permettant de me joindre
 */
const BoxContact = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div variants={itemVariants}>
      <Typography variant="h4" gutterBottom sx={{ mt: 6, mb: 3, fontWeight: "bold", textAlign: "center" }}>
        Comment me joindre
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ display: "flex", gap: 2, mb: 6 }}>
        <Button
          variant="contained"
          startIcon={<LinkedInIcon />}
          sx={{
            borderRadius: 8,
            px: 3,
            background: "linear-gradient(45deg, #5D99C6 30%, #90CAF9 90%)",
            boxShadow: "0 3px 5px 2px rgba(144, 202, 249, .3)"
          }}
        >
          LinkedIn
        </Button>

        <Button
          variant="contained"
          startIcon={<EmailIcon />}
          sx={{
            borderRadius: 8,
            px: 3,
            background: "linear-gradient(45deg, #338A3E 30%, #66BB6A 90%)",
            boxShadow: "0 3px 5px 2px rgba(102, 187, 106, .3)"
          }}
        >
          Email
        </Button>
      </Box>
    </motion.div>
  );
};

// ----------------------------------------------------------------------

export default BoxContact;
