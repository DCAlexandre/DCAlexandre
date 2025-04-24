import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import PageContainer from "@/components/PageContainer";
import BoxDescription from "@/components/BoxDescription";
import BoxAbout from "@/components/BoxAbout";
// import BoxContact from "@/components/BoxContact";
import { PATH_PAGE } from "@/routes/paths";

/**
 * Page d'accueil
 * @description Affiche une présentation générale
 */
function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5
      }
    }
  };

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
    <PageContainer>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        <BoxDescription />

        <BoxAbout />

        {/* <BoxContact /> */}

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
                transform: "scale(1.05)"
              }
            }}
          >
            Voir mes projets
          </Button>
        </motion.div>
      </motion.div>
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default Home;
