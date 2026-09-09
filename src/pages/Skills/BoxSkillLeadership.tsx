import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// ----------------------------------------------------------------------

type BoxSkillLeadershipProps = {
  title: string;
  summary: string;
  items: string[];
  defaultExpanded?: boolean;
};

/**
 * Catégorie « soft skills » sous forme d'accordéon : titre + synthèse visibles,
 * détail = liste de chips (sans niveau, ces compétences ne se notent pas en %).
 */
const BoxSkillLeadership = ({ title, summary, items, defaultExpanded = false }: BoxSkillLeadershipProps) => {
  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      disableGutters
      sx={{ mb: 2, borderRadius: 2, "&:before": { display: "none" } }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-label={`Voir le détail — ${title}`}>
        <Box>
          <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {summary}
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={1.5} component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
          {items.map((item) => {
            // Sépare le libellé principal de sa précision entre parenthèses.
            const match = item.match(/^(.*?)\s*\((.*)\)\s*$/);
            const main = match ? match[1] : item;
            const detail = match ? match[2] : null;

            return (
              <Grid size={{ xs: 12, sm: 6 }} component="li" key={item}>
                <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start" }}>
                  {/* Puce accent discrète */}
                  <Box
                    sx={{ mt: "8px", width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main", flexShrink: 0 }}
                  />

                  <Typography variant="body2">
                    {main}
                    {detail && (
                      <Box component="span" sx={{ color: "text.secondary" }}>
                        {" "}
                        ({detail})
                      </Box>
                    )}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

// ----------------------------------------------------------------------

export default BoxSkillLeadership;
