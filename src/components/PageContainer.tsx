import { motion, Transition, Variants } from "framer-motion";
import Container from "@mui/material/Container";

// ----------------------------------------------------------------------

type PageContainerProps = {
  motionVariant?: "left-in" | "right-in" | "top-in" | "bottom-in" | "stagger-children";
  children: React.ReactNode;
};

/**
 * Conteneur de page
 * @param children - Les enfants à afficher
 * @param motionVariant - La variante d'animation
 */
function PageContainer({ children, motionVariant = "left-in" }: PageContainerProps) {
  const pageVariants: Record<string, Variants> = {
    "left-in": {
      initial: { opacity: 0, x: "-100vw" },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: "100vw" },
    },
    "right-in": {
      initial: { opacity: 0, x: "100vw" },
      in: { opacity: 1, x: 0 },
      out: { opacity: 0, x: "-100vw" },
    },
    "top-in": {
      initial: { opacity: 0, y: -50 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: 50 },
    },
    "bottom-in": {
      initial: { opacity: 0, y: 50 },
      in: { opacity: 1, y: 0 },
      out: { opacity: 0, y: -50 },
    },
    "stagger-children": {
      out: { opacity: 0, transition: { staggerChildren: 0.5 } },
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.5,
        },
      },
    },
  };

  const motionPageVariant: Variants = pageVariants[motionVariant];

  const motionInitial = "hidden" in motionPageVariant ? "hidden" : "initial";
  const motionAnimate = "visible" in motionPageVariant ? "visible" : "in";

  const motionPageTransition: Transition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  // ----------------------------------------------------------------------

  return (
    <Container maxWidth="xl">
      <motion.div
        initial={motionInitial}
        animate={motionAnimate}
        exit="out"
        variants={motionPageVariant}
        transition={motionPageTransition}
      >
        {children}
      </motion.div>
    </Container>
  );
}

// ----------------------------------------------------------------------

export default PageContainer;
