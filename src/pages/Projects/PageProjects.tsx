import { useState } from "react";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardProject from "@/pages/Projects/CardProject";
import DialogProject from "@/components/DialogProject";
import PageContainer from "@/components/PageContainer";
import BoxContact from "@/pages/Projects/BoxContact";
import useProjects, { Project } from "@/stores/hooks/useProjects";

/**
 * Page des projets
 * @description Liste tous les projets
 */
function PageProjects() {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // ----------------------------------------------------------------------

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleCloseDetails = () => {
    setDialogOpen(false);
  };

  // ----------------------------------------------------------------------

  return (
    <PageContainer motionVariant="bottom-in">
      <DialogProject project={selectedProject} open={dialogOpen} onClose={handleCloseDetails} />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Mes Projets
        </Typography>

        <Typography variant="h6" color="textSecondary" align="center" sx={{ mb: 6 }}>
          Découvrez les projets sur lesquels j'ai travaillé en tant que Lead Developer et Entrepreneur indépendant
        </Typography>
      </motion.div>

      <BoxContact />

      <Grid container spacing={3}>
        {projects.map((project, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={idx}>
            <CardProject project={project} index={idx} onOpenDetails={handleOpenDetails} />
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageProjects;
