import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PageContainer from "@/components/PageContainer";
import Seo from "@/components/Seo";
import { SEO_PAGES } from "@/config/seo.config";
import BoxSkillCategory from "@/pages/Skills/BoxSkillCategory";
import BoxSkillLeadership from "@/pages/Skills/BoxSkillLeadership";
import SkillsSkeleton from "@/pages/Skills/SkillsSkeleton";
import useSkills from "@/stores/hooks/useSkills";
import leadership from "@/stores/data/skills/leadership";

/**
 * Page des compétences
 * @description Catégories en accordéon (synthèse + détail à la demande)
 */
function PageSkills() {
  const { skills, loading } = useSkills();
  const isEmpty = !skills.frontend.length;

  // ----------------------------------------------------------------------

  return (
    <PageContainer motionVariant="bottom-in">
      <Seo {...SEO_PAGES.skills} />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography gutterBottom variant="h3" component="h1" align="center">
          Mes Compétences
        </Typography>

        <Typography variant="h6" component="h2" color="textSecondary" align="center" sx={{ mb: 6 }}>
          Un profil full-stack, du frontend au DevOps — et le leadership pour livrer en équipe.
        </Typography>
      </motion.div>

      <Divider sx={{ mb: 4 }} />

      {loading && isEmpty ? (
        <SkillsSkeleton />
      ) : (
        <>
          <BoxSkillLeadership
            title="Leadership & collaboration"
            summary="Au-delà du code : encadrer, prioriser et livrer en équipe."
            items={leadership}
            defaultExpanded
          />

          <BoxSkillCategory
            title="Frontend"
            summary="Interfaces web et mobiles modernes, réactives et accessibles."
            skills={skills.frontend}
          />

          <BoxSkillCategory
            title="Backend"
            summary="APIs robustes et temps réel, architecture serveur et logique métier."
            skills={skills.backend}
          />

          <BoxSkillCategory
            title="Gestion des données"
            summary="Modélisation et performance des données, du relationnel au temps réel."
            skills={skills.database}
          />

          <BoxSkillCategory
            title="DevOps"
            summary="Industrialisation : CI/CD, conteneurs, supervision et déploiements automatisés."
            skills={skills.devops}
          />

          <BoxSkillCategory
            title="Tests & Qualité"
            summary="Qualité et fiabilité : tests unitaires, e2e et intégration continue."
            skills={skills.testing}
          />
        </>
      )}
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageSkills;
