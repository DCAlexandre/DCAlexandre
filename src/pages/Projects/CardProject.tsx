import { motion } from "framer-motion";
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
import InfoIcon from "@mui/icons-material/InfoOutline";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import ChipList from "@/components/ChipList";
import BoxNew from "@/components/BoxNew";
import { Project } from "@/stores/types/projects.types";

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

  // ----------------------------------------------------------------------

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
        {index < 2 && <BoxNew />}

        {/* Image du projet */}
        <CardMedia component="img" height="216" image={project.image} alt={project.title} sx={{ mb: 1 }} />

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
            onClick={() => onOpenDetails(project)}
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
