import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
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
import ia from "@/stores/data/skills/ia";
import certifications from "@/stores/data/certifications";
import { TIER_ORDER, TIER_STYLE } from "@/pages/Skills/skillLevel";

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

      {/* Légende des paliers de maîtrise */}
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
        <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
          Niveau de maîtrise :
        </Typography>

        {TIER_ORDER.map((tier) => (
          <Chip
            key={tier}
            label={tier}
            size="small"
            variant={TIER_STYLE[tier].variant}
            color={TIER_STYLE[tier].color}
            sx={{ fontWeight: 600 }}
          />
        ))}
      </Box>

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

          <BoxSkillLeadership
            title="IA appliquée"
            summary="De l'intégration produit à l'outillage : RAG, agents & MCP, règles d'agents, et formation des équipes."
            items={ia}
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

          <BoxSkillLeadership
            title="Certifications"
            summary="Formations certifiantes suivies."
            items={certifications.map((cert) => `${cert.name} (${cert.issuer} · ${cert.date})`)}
          />
        </>
      )}
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageSkills;
