import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Skill } from "@/stores/types/skills.types";
import { levelLabel, TIER_STYLE } from "./skillLevel";

// ----------------------------------------------------------------------

type BoxSkillCategoryProps = {
  title: string;
  summary: string;
  skills: Skill[];
  inTraining?: boolean;
  defaultExpanded?: boolean;
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
            <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
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
            .map((item, idx) => {
              const tier = levelLabel(item);
              const style = TIER_STYLE[tier];

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
                  <Paper elevation={0} sx={{ p: 2, height: "100%" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                        {/* Pastille = couleur de la techno */}
                        <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: item.color, flexShrink: 0 }} />

                        <Typography variant="subtitle1" fontWeight="bold" noWrap>
                          {item.name}
                        </Typography>
                      </Box>

                      {/* Palier qualitatif — couleur distincte par niveau */}
                      <Chip
                        label={tier}
                        size="small"
                        variant={style.variant}
                        color={style.color}
                        sx={{ flexShrink: 0, fontWeight: 600 }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

// ----------------------------------------------------------------------

export default BoxSkillCategory;
