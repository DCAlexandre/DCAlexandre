import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import CardProject from "@/pages/Projects/CardProject";
import CardProjectSkeleton from "@/pages/Projects/CardProjectSkeleton";
import DialogProject from "@/components/DialogProject";
import PageContainer from "@/components/PageContainer";
import Seo from "@/components/Seo";
import { SEO_PAGES } from "@/config/seo.config";
import BoxContact from "@/pages/Projects/BoxContact";
import useProjects, { Project } from "@/stores/hooks/useProjects";
import { trackEvent } from "@/utils/analytics";

// ----------------------------------------------------------------------

// Filtres de la page projets (par mise en avant / type / techno)
const FILTERS: { key: string; label: string; techs?: string[] }[] = [
  { key: "all", label: "Tout" },
  { key: "featured", label: "À la une" },
  { key: "mobile", label: "Mobile", techs: ["iOS", "Android", "Capacitor", "Ionic"] },
  { key: "ia", label: "IA", techs: ["IA", "TensorFlow"] },
  { key: "react", label: "React", techs: ["React"] },
  { key: "node", label: "Node.js", techs: ["NodeJS"] },
];

const matchesFilter = (project: Project, key: string): boolean => {
  if (key === "all") return true;
  if (key === "featured") return Boolean(project.featured);
  const filter = FILTERS.find((f) => f.key === key);
  return Boolean(filter?.techs?.some((tech) => project.technologies.some((t) => t.name === tech)));
};

/**
 * Page des projets
 * @description Liste tous les projets
 */
function PageProjects() {
  const { projects, loading } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const filteredProjects = useMemo(() => projects.filter((p) => matchesFilter(p, filter)), [projects, filter]);

  // ----------------------------------------------------------------------

  const handleFilter = (key: string) => {
    setFilter(key);
    trackEvent("projects_filter", { filter: key });
  };

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
      <Seo {...SEO_PAGES.projects} />

      <DialogProject project={selectedProject} open={dialogOpen} onClose={handleCloseDetails} />

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Mes Projets
        </Typography>

        <Typography variant="h6" component="h2" color="textSecondary" align="center" sx={{ mb: 6 }}>
          Une sélection de produits conçus et livrés en tant que Tech Lead et développeur freelance
        </Typography>
      </motion.div>

      <BoxContact />

      {/* Barre de filtres */}
      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" justifyContent="center" sx={{ mb: 4 }}>
        {FILTERS.map((f) => (
          <Chip
            key={f.key}
            label={f.label}
            color="primary"
            variant={filter === f.key ? "filled" : "outlined"}
            onClick={() => handleFilter(f.key)}
            aria-pressed={filter === f.key}
          />
        ))}
      </Stack>

      <Grid container spacing={3}>
        {loading && projects.length === 0
          ? Array.from({ length: 6 }).map((_, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={idx}>
                <CardProjectSkeleton />
              </Grid>
            ))
          : filteredProjects.map((project, idx) => (
              <Grid size={{ xs: 12, sm: 6, md: 6, lg: 4 }} key={project.title}>
                <CardProject project={project} index={idx} onOpenDetails={handleOpenDetails} />
              </Grid>
            ))}
      </Grid>

      {!loading && filteredProjects.length === 0 && (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
          Aucun projet pour ce filtre.
        </Typography>
      )}
    </PageContainer>
  );
}

// ----------------------------------------------------------------------

export default PageProjects;
