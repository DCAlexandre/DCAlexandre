import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PageContainer from "@/components/PageContainer";
import BoxSkillCategory from "@/pages/Skills/BoxSkillCategory";
import useSkills from "@/stores/hooks/useSkills";

/**
 * Page des compétences
 * @description Liste des compétences acquises et en cours de formation
 */
function PageSkills() {
  const { skills } = useSkills();

  // ----------------------------------------------------------------------

  return (
    <PageContainer motionVariant="bottom-in">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography gutterBottom variant="h3" component="h1" align="center">
          Mes Compétences
        </Typography>

        <Typography variant="h6" color="textSecondary" align="center" sx={{ mb: 6 }}>
          Plus de 10 ans d'expérience dans le développement d'applications web et mobile
        </Typography>
      </motion.div>

      <Divider sx={{ mb: 4 }} />

      <BoxSkillCategory title="Frontend" skills={skills.frontend} delay={0.2} />

      <BoxSkillCategory title="Backend" skills={skills.backend} delay={0.4} />

      <BoxSkillCategory title="Gestion des données" skills={skills.database} delay={0.6} />

      <BoxSkillCategory title="DevOps" skills={skills.devops} delay={0.8} />

      <BoxSkillCategory title="Tests" skills={skills.testing} delay={1.0} />
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageSkills;
