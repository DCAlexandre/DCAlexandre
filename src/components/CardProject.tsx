import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AppleIcon from "@mui/icons-material/Apple";
import AndroidIcon from "@mui/icons-material/Android";
import { useTheme } from "@kared/kui/ThemeProvider";
import { Project } from "@/stores/types/projects.types";

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

// ----------------------------------------------------------------------

type CardProjectProps = {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
};

function CardProject({ project, index, onOpenDetails }: CardProjectProps) {
  const { theme } = useTheme();

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

// ----------------------------------------------------------------------

export default CardProject;
