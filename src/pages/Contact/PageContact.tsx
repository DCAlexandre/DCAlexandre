import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PageContainer from "@/components/PageContainer";
import CardContact from "@/pages/Contact/CardContact";
import FormContact from "@/pages/Contact/FormContact";

/**
 * Page de contact
 */
function PageContact() {
  return (
    <PageContainer motionVariant="bottom-in">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Me contacter
        </Typography>

        <Typography variant="h6" color="textSecondary" align="center" sx={{ mb: 6 }}>
          N'hésitez pas à me contacter pour discuter de vos projets ou opportunités de collaboration
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
        {/* Informations de contact */}
        <Grid size={{ xs: 12, md: 5 }}>
          <CardContact />
        </Grid>

        {/* Formulaire de contact */}
        <Grid size={{ xs: 12, md: 7 }}>
          <FormContact />
        </Grid>
      </Grid>
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageContact;
