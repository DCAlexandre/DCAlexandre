import { motion } from "framer-motion";
import { Typography, Box, Button, Container } from "@mui/material";

// ----------------------------------------------------------------------

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

function Home() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Container sx={{ width: "100%" }}>
        <Box sx={{ textAlign: "center", my: 8 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Bonjour, je suis Alexandre 👋
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            Lead Developer avec plus de 10 ans d'expérience
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            href="#/projects"
          >
            Voir mes projets
          </Button>
        </Box>
      </Container>
    </motion.div>
  );
}

// ----------------------------------------------------------------------

export default Home;
