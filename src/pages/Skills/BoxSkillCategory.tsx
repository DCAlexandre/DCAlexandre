import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Skill } from "@/stores/types/skills.types";

// ----------------------------------------------------------------------

type BoxSkillCategoryProps = {
  title: string;
  summary: string;
  skills: Skill[];
  inTraining?: boolean;
  defaultExpanded?: boolean;
};

/**
 * Traduit un niveau (0-100) en libellé qualitatif.
 */
const levelLabel = (skill: Skill): string => {
  if (skill.inTraining) return "En apprentissage";
  if (skill.level >= 90) return "Expert";
  if (skill.level >= 75) return "Avancé";
  if (skill.level >= 50) return "Confirmé";
  return "Intermédiaire";
};

/**
 * Catégorie de compétences sous forme d'accordéon : titre + synthèse toujours
 * visibles, détail (barres) dépliable à la demande.
 * @param title - Le titre de la catégorie
 * @param summary - Phrase de synthèse affichée sous le titre
 * @param skills - Les compétences à afficher
 * @param inTraining - Si la catégorie contient une compétence en cours de formation
 * @param defaultExpanded - Ouvre l'accordéon par défaut
 */
const BoxSkillCategory = ({
  title,
  summary,
  skills,
  inTraining = false,
  defaultExpanded = false,
}: BoxSkillCategoryProps) => {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      disableGutters
      sx={{ mb: 2, borderRadius: 2, "&:before": { display: "none" } }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label={`Voir le détail — ${title}`}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {title}
            </Typography>

            {inTraining && <Chip label="En cours de formation" color="secondary" variant="outlined" size="small" />}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {summary}
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={2}>
          {[...skills]
            .sort((a, b) => b.level - a.level)
            .map((item, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                <Paper elevation={0} sx={{ p: 2, height: "100%" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, mb: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                      {/* Pastille = couleur de la techno (seul rappel de couleur) */}
                      <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: item.color, flexShrink: 0 }} />

                      <Typography variant="subtitle1" fontWeight="bold" noWrap>
                        {item.name}
                      </Typography>
                    </Box>

                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0, fontWeight: 600 }}>
                      {levelLabel(item)}
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={item.level}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: "rgba(255,255,255,0.08)",
                      "& .MuiLinearProgress-bar": { bgcolor: "primary.main", borderRadius: 3 },
                    }}
                  />
                </Paper>
              </Grid>
            ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

// ----------------------------------------------------------------------

export default BoxSkillCategory;
