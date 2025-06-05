import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import PageContainer from "@/components/PageContainer";
import BoxAbout from "@/pages/Home/BoxAbout";
import BoxDescription from "@/pages/Home/BoxDescription";
import BoxRecommendations from "@/pages/Home/BoxRecommendations";
import { PATH_PAGE } from "@/routes/paths";

/**
 * Page d'accueil
 * @description Affiche une présentation générale
 */
function PageHome() {
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
    <PageContainer motionVariant="stagger-children">
      <BoxDescription />

      <BoxAbout />

      <motion.div variants={itemVariants} style={{ textAlign: "center", marginTop: "2rem" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={NavLink}
          to={PATH_PAGE.projects}
          sx={{
            borderRadius: 8,
            px: 4,
            py: 1.5,
            fontSize: "0.9rem",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          Voir mes projets
        </Button>
      </motion.div>

      <BoxRecommendations />
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageHome;
