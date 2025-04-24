import { motion } from "framer-motion";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

type PageContainerProps = {
  motionVariant?: "left-in" | "right-in" | "top-in" | "bottom-in";
  children: React.ReactNode;
};

/**
 * Conteneur de page
 * @param children - Les enfants à afficher
 * @param motionVariant - La variante d'animation
 */
function PageContainer({ children, motionVariant = "left-in" }: PageContainerProps) {
  const pageVariants = {
    "left-in": {
      initial: { opacity: 0, x: "-100vw" },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: "100vw" }
    },
    "right-in": {
      initial: { opacity: 0, x: "100vw" },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: "-100vw" }
    },
    "top-in": {
      initial: { opacity: 0, y: -50 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: 50 }
    },
    "bottom-in": {
      initial: { opacity: 0, y: 50 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -50 }
    }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants[motionVariant]}
      transition={pageTransition}
    >
      <Container maxWidth="xl">
        <Box sx={{ my: 4 }}>{children}</Box>
      </Container>
    </motion.div>
  );
}

// ----------------------------------------------------------------------

export default PageContainer;
