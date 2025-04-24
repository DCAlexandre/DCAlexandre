import { useState } from "react";
import { motion } from "framer-motion";
import { Typography, Box, Grid, Button } from "@mui/material";
// import GitHubIcon from '@mui/icons-material/GitHub';
import CardProject from "@/components/CardProject";
import DialogProject from "@/components/DialogProject";
import PageContainer from "@/components/PageContainer";
import { Project } from "@/stores/types/projects.types";
import projectsData from "@/stores/data/projects";

// ----------------------------------------------------------------------

/**
 * Projects page
 * @description List all projects
 * @returns {JSX.Element}
 */
function Projects() {
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

        <Typography variant="h6" color="textSecondary" paragraph align="center" sx={{ mb: 6 }}>
          Découvrez les projets sur lesquels j'ai travaillé en tant que Lead Developer
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {projectsData.map((project, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
            <CardProject project={project} index={index} onOpenDetails={handleOpenDetails} />
          </Grid>
        ))}
      </Grid>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Box
          sx={{
            mt: 8,
            p: 3,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 2,
            textAlign: "center"
          }}
        >
          <Typography variant="h5" gutterBottom>
            Vous avez un projet en tête ?
          </Typography>

          <Typography variant="body1" paragraph>
            Je suis disponible pour réaliser des projets en collaboration. N'hésitez pas à me contacter !
          </Typography>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="contained" color="primary" size="large" href="#/contact">
              Me contacter
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default Projects;
