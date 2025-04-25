import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

/**
 * Affiche une description avec une animation fluide
 */
const BoxDescription = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div variants={itemVariants}>
      <Box
        sx={{
          textAlign: "center",
          userSelect: "none",
          background: "linear-gradient(45deg, #1e2a1e 30%, #184123 90%)",
          boxShadow: "0 4px 8px rgba(102, 187, 106, 0.2)",
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h2" component="h1" fontWeight="bold" sx={{ mb: 2 }}>
          Bonjour, je suis Alexandre 👋
        </Typography>

        <Typography variant="h5" sx={{ mb: 3, fontWeight: "light" }}>
          Passionné par l'informatique, je suis toujours à la recherche de nouveaux défis.
        </Typography>

        <Typography variant="h6" sx={{ fontStyle: "italic" }}>
          Lead Developer avec plus de 10 ans d'expérience
        </Typography>
      </Box>
    </motion.div>
  );
};

// ----------------------------------------------------------------------

export default BoxDescription;
