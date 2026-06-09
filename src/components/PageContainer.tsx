import { motion, Transition, Variants, useReducedMotion, cubicBezier } from "framer-motion";
import Container from "@mui/material/Container";

// ----------------------------------------------------------------------

// Easing easeOutExpo : démarrage vif, fin douce
const EASE_OUT_EXPO = cubicBezier(0.22, 1, 0.36, 1);

// Décalage d'entrée léger (px) — fini les slides 100vw qui débordent
const OFFSET = 24;

/**
 * Variantes de transition de page (constantes nommées).
 * @description Fondus + léger déplacement, rapides et sans débordement horizontal.
 */
const PAGE_VARIANTS: Record<string, Variants> = {
  "left-in": {
    initial: { opacity: 0, x: -OFFSET },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: OFFSET },
  },
  "right-in": {
    initial: { opacity: 0, x: OFFSET },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -OFFSET },
  },
  "top-in": {
    initial: { opacity: 0, y: -OFFSET },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: OFFSET },
  },
  "bottom-in": {
    initial: { opacity: 0, y: OFFSET },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -OFFSET },
  },
  "stagger-children": {
    out: { opacity: 0, transition: { staggerChildren: 0.08 } },
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  },
};

// Variante neutre (aucun déplacement) pour prefers-reduced-motion
const REDUCED_VARIANT: Variants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0 } },
};

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
  const shouldReduceMotion = useReducedMotion();

  const motionPageVariant: Variants = shouldReduceMotion ? REDUCED_VARIANT : PAGE_VARIANTS[motionVariant];

  const motionInitial = "hidden" in motionPageVariant ? "hidden" : "initial";
  const motionAnimate = "visible" in motionPageVariant ? "visible" : "in";

  const motionPageTransition: Transition = {
    duration: shouldReduceMotion ? 0.15 : 0.35,
    ease: EASE_OUT_EXPO,
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
