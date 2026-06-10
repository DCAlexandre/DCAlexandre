import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
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
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {items.map((item) => (
            <Chip key={item} label={item} color="primary" variant="outlined" />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

// ----------------------------------------------------------------------

export default BoxSkillLeadership;
