import { useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Link,
} from "@mui/material";
// import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";

// Animations pour la page
const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -50,
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

// Animation pour les cartes de projets
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  }),
};

// Données des projets basées sur votre README
type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  links: {
    website?: string;
    ios?: string;
    android?: string;
  };
  technologies: { name: string; color: string }[];
};

const projectsData: Project[] = [
  {
    id: 1,
    title: "Kared Fit",
    description:
      "Application de planification de routines sportives. Planifie tes séances, défie tes amis, évoluez ensemble en temps réel et gagnez des récompenses. Transforme chaque entraînement en un défi motivant et ludique !",
    longDescription:
      "Kared Fit est une application mobile innovante qui révolutionne l'expérience d'entraînement. Elle permet aux utilisateurs de planifier leurs séances, de défier leurs amis et d'évoluer ensemble en temps réel. Chaque entraînement devient un défi motivant et ludique, avec un système de récompenses et d'expérience qui encourage la progression. L'application est disponible sur iOS et Android, offrant une expérience utilisateur fluide et engageante.",
    image: "/path-to-kared-fit-image.jpg", // Remplacer par le chemin de votre image
    links: {
      website: "https://www.linkedin.com/company/kared-dev",
      ios: "https://apps.apple.com/fr/app/kared-fit/id6739947899?platform=iphone",
      android:
        "https://play.google.com/store/apps/details?id=com.kared.karedfit",
    },
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Capacitor", color: "#119EFF" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "AWS", color: "#FF9900" },
      { name: "Linux", color: "#FCC624" },
      { name: "iOS", color: "#000000" },
      { name: "Android", color: "#3DDC84" },
    ],
  },
  {
    id: 2,
    title: "Solutions Terrains",
    description:
      "Plateforme dédiée à la valorisation des terrains auprès de particuliers, aménageurs et promoteurs.",
    longDescription:
      "Solutions Terrains est une plateforme innovante dédiée à la valorisation des assiettes foncières. Elle met en relation les propriétaires de terrains avec des particuliers, aménageurs et promoteurs intéressés par l'acquisition de terrains. La plateforme offre une interface intuitive et des outils puissants pour faciliter la recherche et la valorisation des terrains. Disponible sur iOS, Android et Web, elle s'adapte à tous les utilisateurs et leurs besoins spécifiques.",
    image: "/path-to-solutions-terrains-image.jpg", // Remplacer par le chemin de votre image
    links: {
      website: "https://www.solutions-terrains.com",
      ios: "https://apps.apple.com/fr/app/solutions-terrains/id6742559497?platform=iphone",
      android:
        "https://play.google.com/store/apps/details?id=com.solutionsterrains.app",
    },
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Capacitor", color: "#119EFF" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "iOS", color: "#000000" },
      { name: "Android", color: "#3DDC84" },
      { name: "Web", color: "#FF7139" },
    ],
  },
  {
    id: 3,
    title: "Comète",
    description:
      "Solution complète pour simplifier et optimiser tous les processus administratifs pour les sociétés de sécurité.",
    longDescription:
      "Comète est une solution complète conçue pour simplifier et optimiser tous les processus administratifs des sociétés de sécurité. Elle offre une gestion intégrée des plannings, des ressources humaines, de la facturation et du reporting. Grâce à son interface intuitive et ses fonctionnalités avancées, Comète permet aux entreprises de sécurité de gagner en efficacité et en productivité. La solution est proposée en mode SaaS, garantissant une disponibilité et une sécurité optimales.",
    image: "/path-to-comete-image.jpg", // Remplacer par le chemin de votre image
    links: {
      website: "https://logiciel-comete.fr",
    },
    technologies: [
      { name: "SaaS", color: "#0080FF" },
      { name: "MySQL", color: "#4479A1" },
      { name: "Omnis", color: "#0080FF" },
    ],
  },
  {
    id: 4,
    title: "Comète Link",
    description:
      "Extension modulaire pour Comète. Plateforme composée de plusieurs espaces dédiés et de modules complémentaires à composer selon les besoins des clients.",
    longDescription:
      "Comète Link est une extension modulaire pour la solution Comète, offrant une plateforme composée de plusieurs espaces dédiés et de modules complémentaires. Les clients peuvent composer leur solution selon leurs besoins spécifiques, bénéficiant ainsi d'une flexibilité maximale. Disponible sur iOS, Android et en version desktop via Electron, Comète Link s'adapte à tous les environnements de travail. La solution utilise des technologies modernes comme React, Node.js, Laravel et diverses bases de données pour offrir une expérience utilisateur optimale.",
    image: "/path-to-comete-link-image.jpg", // Remplacer par le chemin de votre image
    links: {
      website: "https://logiciel-comete.fr/comete-link",
      ios: "https://apps.apple.com/fr/app/com%C3%A8te-link/id1608699303",
      android: "https://play.google.com/store/apps/details?id=fr.aexae.comete",
    },
    technologies: [
      { name: "WebApp", color: "#4285F4" },
      { name: "NodeJS", color: "#339933" },
      { name: "React", color: "#61DAFB" },
      { name: "Capacitor", color: "#119EFF" },
      { name: "Laravel", color: "#FF2D20" },
      { name: "MySQL", color: "#4479A1" },
      { name: "PostgreSQL", color: "#4169E1" },
      { name: "Electron", color: "#47848F" },
      { name: "iOS", color: "#000000" },
      { name: "Android", color: "#3DDC84" },
    ],
  },
  {
    id: 5,
    title: "Comète On Time",
    description:
      "Les pointages géolocalisés disponibles dans Comète. Module permettant aux agents de sécurité de réaliser leurs pointages sur site.",
    longDescription:
      "Comète On Time est un module de pointage géolocalisé intégré à la solution Comète. Il permet aux agents de sécurité de réaliser leurs pointages directement sur site, garantissant ainsi la précision et la fiabilité des données de présence. Grâce à la géolocalisation, les entreprises peuvent vérifier que les agents sont bien présents sur les sites assignés. Disponible sur iOS et Android, l'application offre une interface intuitive et des fonctionnalités adaptées aux besoins spécifiques des agents de sécurité et de leurs superviseurs.",
    image: "/path-to-comete-ontime-image.jpg", // Remplacer par le chemin de votre image
    links: {
      website:
        "https://logiciel-comete.fr/2023/12/20/comete-on-time-les-pointages-geolocalises-disponibles-dans-comete",
      ios: "https://apps.apple.com/fr/app/com%C3%A8te-on-time/id6445984894",
      android:
        "https://play.google.com/store/apps/details?id=fr.aexae.comete_pointages",
    },
    technologies: [
      { name: "WebApp", color: "#4285F4" },
      { name: "NodeJS", color: "#339933" },
      { name: "React", color: "#61DAFB" },
      { name: "Capacitor", color: "#119EFF" },
      { name: "Laravel", color: "#FF2D20" },
      { name: "MySQL", color: "#4479A1" },
      { name: "PostgreSQL", color: "#4169E1" },
      { name: "Electron", color: "#47848F" },
      { name: "iOS", color: "#000000" },
      { name: "Android", color: "#3DDC84" },
    ],
  },
];

// Composant pour afficher un projet
type ProjectCardProps = {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
};

function ProjectCard({ project, index, onOpenDetails }: ProjectCardProps) {
  const theme = useTheme();

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <Card
        elevation={4}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "visible",
        }}
      >
        {/* Badge flottant pour les projets récents */}
        {index < 2 && (
          <Box
            sx={{
              position: "absolute",
              top: -15,
              right: -15,
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.getContrastText(
                theme.palette.secondary.main
              ),
              borderRadius: "50%",
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "0.8rem",
              boxShadow: theme.shadows[3],
              zIndex: 1,
            }}
          >
            NEW
          </Box>
        )}

        <CardMedia
          component="img"
          height="160"
          image={
            project.image ||
            `https://source.unsplash.com/random/300x200?app&sig=${project.id}`
          }
          alt={project.title}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            fontWeight="bold"
          >
            {project.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" paragraph>
            {project.description.length > 120
              ? `${project.description.substring(0, 120)}...`
              : project.description}
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 2 }}>
            {project.technologies.slice(0, 4).map((tech, i) => (
              <Chip
                key={i}
                label={tech.name}
                size="small"
                sx={{
                  bgcolor: `${tech.color}20`,
                  color: tech.color,
                  fontWeight: "bold",
                  fontSize: "0.7rem",
                }}
              />
            ))}
            {project.technologies.length > 4 && (
              <Chip
                label={`+${project.technologies.length - 4}`}
                size="small"
                sx={{
                  bgcolor: "grey.200",
                  fontSize: "0.7rem",
                }}
              />
            )}
          </Box>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={() => onOpenDetails(project)}
            startIcon={<InfoIcon />}
          >
            Détails
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {project.links.website && (
            <IconButton
              size="small"
              color="primary"
              component={Link}
              href={project.links.website}
              target="_blank"
              sx={{
                "&:hover": {
                  transform: "translateY(-3px)",
                  transition: "transform 0.2s",
                },
              }}
            >
              <OpenInNewIcon />
            </IconButton>
          )}

          {project.links.ios && (
            <IconButton
              size="small"
              color="primary"
              component={Link}
              href={project.links.ios}
              target="_blank"
              sx={{
                "&:hover": {
                  transform: "translateY(-3px)",
                  transition: "transform 0.2s",
                },
              }}
            >
              <AppleIcon />
            </IconButton>
          )}

          {project.links.android && (
            <IconButton
              size="small"
              color="primary"
              component={Link}
              href={project.links.android}
              target="_blank"
              sx={{
                "&:hover": {
                  transform: "translateY(-3px)",
                  transition: "transform 0.2s",
                },
              }}
            >
              <AndroidIcon />
            </IconButton>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
}

// Composant pour afficher les détails d'un projet
type ProjectDetailsDialogProps = {
  project: Project | null;
  open: boolean;
  onClose: () => void;
};

function ProjectDetailsDialog({
  project,
  open,
  onClose,
}: ProjectDetailsDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!project) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: theme.palette.primary.main,
          color: "white",
          py: 2,
        }}
      >
        <Typography variant="h5" component="div" fontWeight="bold">
          {project.title}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              sx={{
                width: "100%",
                borderRadius: 1,
                boxShadow: theme.shadows[2],
                mb: 2,
              }}
              src={
                project.image ||
                `https://source.unsplash.com/random/600x400?app&sig=${project.id}`
              }
              alt={project.title}
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Technologies utilisées
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8, mb: 3 }}>
              {project.technologies.map((tech, i) => (
                <Chip
                  key={i}
                  label={tech.name}
                  sx={{
                    bgcolor: `${tech.color}20`,
                    color: tech.color,
                    fontWeight: "bold",
                  }}
                />
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Liens
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {project.links.website && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<OpenInNewIcon />}
                  href={project.links.website}
                  target="_blank"
                  sx={{ mr: 1, mb: 1 }}
                >
                  Site Web
                </Button>
              )}

              {project.links.ios && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AppleIcon />}
                  href={project.links.ios}
                  target="_blank"
                  sx={{ mr: 1, mb: 1 }}
                >
                  App Store
                </Button>
              )}

              {project.links.android && (
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AndroidIcon />}
                  href={project.links.android}
                  target="_blank"
                  sx={{ mb: 1 }}
                >
                  Google Play
                </Button>
              )}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>

            <Typography variant="body1" paragraph>
              {project.longDescription}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Fonctionnalités clés
            </Typography>

            <Box component="ul" sx={{ pl: 2 }}>
              {project.id === 1 && (
                <>
                  <Typography component="li" variant="body1" paragraph>
                    Planification de routines sportives personnalisées
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Défis entre amis et suivi en temps réel
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Système de récompenses et de progression
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Applications iOS et Android natives via Capacitor
                  </Typography>
                </>
              )}

              {project.id === 2 && (
                <>
                  <Typography component="li" variant="body1" paragraph>
                    Valorisation d'assiettes foncières
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Mise en relation entre propriétaires et acheteurs
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Interface intuitive et outils de recherche avancés
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Disponible sur web, iOS et Android
                  </Typography>
                </>
              )}

              {project.id === 3 && (
                <>
                  <Typography component="li" variant="body1" paragraph>
                    Gestion administrative complète pour sociétés de sécurité
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Optimisation des processus administratifs
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Solution SaaS sécurisée et performante
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Interface utilisateur intuitive
                  </Typography>
                </>
              )}

              {project.id === 4 && (
                <>
                  <Typography component="li" variant="body1" paragraph>
                    Extension modulaire pour la solution Comète
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Espaces dédiés et modules complémentaires
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Personnalisation selon les besoins des clients
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Disponible sur web, iOS, Android et desktop
                  </Typography>
                </>
              )}

              {project.id === 5 && (
                <>
                  <Typography component="li" variant="body1" paragraph>
                    Pointages géolocalisés pour agents de sécurité
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Vérification de présence sur site en temps réel
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Interface adaptée aux besoins des agents
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Intégration complète avec la solution Comète
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="primary">
          Fermer
        </Button>
        {project.links.website && (
          <Button
            variant="contained"
            color="primary"
            href={project.links.website}
            target="_blank"
            endIcon={<OpenInNewIcon />}
          >
            Visiter le site
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleCloseDetails = () => {
    setDialogOpen(false);
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" component="h1" gutterBottom align="center">
              Mes Projets
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              paragraph
              align="center"
              sx={{ mb: 6 }}
            >
              Découvrez les projets sur lesquels j'ai travaillé en tant que Lead
              Developer
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {projectsData.map((project, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.id}>
                <ProjectCard
                  project={project}
                  index={index}
                  onOpenDetails={handleOpenDetails}
                />
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
                textAlign: "center",
              }}
            >
              <Typography variant="h5" gutterBottom>
                Vous avez un projet en tête ?
              </Typography>
              <Typography variant="body1" paragraph>
                Je suis disponible pour réaliser des projets en collaboration.
                N'hésitez pas à me contacter !
              </Typography>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="#/contact"
                >
                  Me contacter
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Container>

      <ProjectDetailsDialog
        project={selectedProject}
        open={dialogOpen}
        onClose={handleCloseDetails}
      />
    </motion.div>
  );
}

export default Projects;
