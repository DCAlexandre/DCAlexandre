import { motion, useReducedMotion } from "framer-motion";
import { format } from "date-fns";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/InfoOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import ChipList from "@/components/ChipList";
import BoxNew from "@/components/BoxNew";
import { Project } from "@/stores/types/projects.types";
import { trackEvent } from "@/utils/analytics";

// ----------------------------------------------------------------------

type CardProjectProps = {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
};

/**
 * Affiche un projet avec une animation fluide
 * @param project - Le projet à afficher
 * @param index - L'index du projet
 * @param onOpenDetails - La fonction pour ouvrir les détails du projet
 */
function CardProject({ project, index, onOpenDetails }: CardProjectProps) {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        // Délai plafonné : les cartes du bas n'attendent jamais longtemps
        delay: shouldReduceMotion ? 0 : Math.min(i, 3) * 0.06,
        type: "spring" as const,
        stiffness: 200,
        damping: 22,
      },
    }),
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      // marge basse positive → la carte se révèle avant d'entrer entièrement dans l'écran
      viewport={{ once: true, amount: 0.05, margin: "0px 0px 140px 0px" }}
      variants={cardVariants}
      whileHover={shouldReduceMotion ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
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
        {index < 2 && <BoxNew />}

        {/* Badge « À la une » pour les projets mis en avant */}
        {project.featured && (
          <Chip
            icon={<StarIcon sx={{ fontSize: 16 }} />}
            label="À la une"
            size="small"
            color="primary"
            sx={{ position: "absolute", top: -12, left: 12, zIndex: 2, fontWeight: 700, boxShadow: 3 }}
          />
        )}

        {/* Image du projet */}
        <CardMedia
          component="img"
          height="216"
          image={project.image}
          alt={`Aperçu du projet ${project.title}`}
          loading="lazy"
          sx={{ mb: 1 }}
        />

        {/* Contenu du projet */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
            {project.title}
          </Typography>

          <Typography
            gutterBottom
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
            }}
          >
            {project.description}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {format(new Date(project.dateStart), "dd/MM/yyyy")}
          </Typography>

          <ChipList data={project.technologies} size="small" maxItems={3} slotProps={{ box: { mt: 2 } }} />
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<InfoIcon />}
            sx={{ py: 0.5, px: 1 }}
            onClick={() => {
              trackEvent("project_details_open", { project: project.title });
              onOpenDetails(project);
            }}
          >
            Détails
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {Object.entries(project.links || {}).map(([key, value]) => {
            let icon = <OpenInNewIcon />;
            switch (key) {
              case "website":
                icon = <OpenInNewIcon />;
                break;
              case "ios":
                icon = <AppleIcon />;
                break;
              case "android":
                icon = <AndroidIcon />;
                break;
            }

            return (
              <IconButton
                key={key}
                size="small"
                color="primary"
                component={Link}
                href={value}
                target="_blank"
                aria-label={`Ouvrir le lien ${key}`}
                onClick={() => trackEvent("project_link_click", { project: project.title, platform: key })}
                sx={{
                  p: 0.5,
                  "&:hover": {
                    transform: "translateY(-3px)",
                    transition: "transform 0.2s",
                    "& .MuiSvgIcon-root": {
                      color: "primary.light",
                    },
                  },
                }}
              >
                {icon}
              </IconButton>
            );
          })}
        </CardActions>
      </Card>
    </motion.div>
  );
}

// ----------------------------------------------------------------------

export default CardProject;
