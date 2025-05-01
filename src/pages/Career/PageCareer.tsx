import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/PageContainer";
import CardLinkedIn from "@/pages/Career/CardLinkedIn";
import TimelineCareer from "@/pages/Career/TimelineCareer";

/**
 * Page des carrières
 * @description Affiche les carrières
 */
function PageCareer() {
  return (
    <PageContainer motionVariant="bottom-in">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Mon parcours
        </Typography>

        <Typography variant="h6" color="textSecondary" align="center" sx={{ mb: 6 }}>
          Visualisez mon parcours professionnel et mes expériences
        </Typography>
      </motion.div>

      <TimelineCareer />

      {/* Carte de LinkedIn */}
      <CardLinkedIn />
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageCareer;
