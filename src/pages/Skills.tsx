import { motion } from "framer-motion";
import {
  Typography,
  Box,
  Container,
  Grid,
  Paper,
  Chip,
  Divider,
  LinearProgress,
  useTheme,
} from "@mui/material";

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

// Animation pour les éléments qui apparaissent en séquence
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// Données des compétences basées sur votre README
const skillsData = {
  frontend: [
    { name: "HTML", color: "#E34F26", level: 95 },
    { name: "CSS", color: "#1572B6", level: 90 },
    { name: "JavaScript", color: "#F7DF1E", level: 95 },
    { name: "TypeScript", color: "#3178C6", level: 90 },
    { name: "React", color: "#61DAFB", level: 95 },
    { name: "Capacitor", color: "#119EFF", level: 85 },
    { name: "Electron", color: "#47848F", level: 80 },
  ],
  backend: [
    { name: "NodeJS", color: "#339933", level: 90 },
    { name: "PHP", color: "#777BB4", level: 85 },
    { name: "Laravel", color: "#FF2D20", level: 85 },
    { name: "Express", color: "#000000", level: 90 },
    { name: "Python", color: "#3776AB", level: 75 },
  ],
  database: [
    { name: "SQL", color: "#4479A1", level: 90 },
    { name: "MySQL", color: "#4479A1", level: 90 },
    { name: "PostgreSQL", color: "#4169E1", level: 85 },
    { name: "Firebase", color: "#FFCA28", level: 85 },
  ],
  devops: [
    { name: "AWS", color: "#FF9900", level: 80 },
    { name: "Linux", color: "#FCC624", level: 85 },
    { name: "Docker", color: "#2496ED", level: 85 },
    { name: "Kubernetes", color: "#326CE5", level: 75 },
    { name: "Ansible", color: "#000000", level: 70 },
    { name: "Sentry", color: "#362D59", level: 80 },
    { name: "Grafana", color: "#F46800", level: 75 },
  ],
  testing: [
    { name: "Cypress", color: "#17202C", level: 85 },
    { name: "Jest", color: "#C21325", level: 85 },
    { name: "PHPUnit", color: "#8892BE", level: 80 },
    { name: "Firebase Test Lab", color: "#FFCA28", level: 75 },
  ],
};

// Composant pour afficher une catégorie de compétences
type SkillCategoryProps = {
  title: string;
  skills: { name: string; color: string; level: number }[];
  delay?: number;
};

const SkillCategory = ({ title, skills, delay = 0 }: SkillCategoryProps) => {
  const theme = useTheme();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ delayChildren: delay }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 4, mb: 2, fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Grid container spacing={2}>
        {skills.map((skill, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <motion.div variants={itemVariants}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  height: "100%",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {skill.name}
                  </Typography>
                  <Chip
                    label={`${skill.level}%`}
                    size="small"
                    sx={{
                      bgcolor: skill.color,
                      color: theme.palette.getContrastText(skill.color),
                      fontWeight: "bold",
                    }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={skill.level}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "rgba(0,0,0,0.1)",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: skill.color,
                    },
                  }}
                />
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

function Skills() {
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
              Mes Compétences
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              paragraph
              align="center"
              sx={{ mb: 6 }}
            >
              Plus de 10 ans d'expérience dans le développement d'applications
              web et mobile
            </Typography>
          </motion.div>

          <Divider sx={{ mb: 4 }} />

          <SkillCategory
            title="Frontend"
            skills={skillsData.frontend}
            delay={0.2}
          />
          <SkillCategory
            title="Backend"
            skills={skillsData.backend}
            delay={0.4}
          />
          <SkillCategory
            title="Gestion des données"
            skills={skillsData.database}
            delay={0.6}
          />
          <SkillCategory
            title="Serveur et DevOps"
            skills={skillsData.devops}
            delay={0.8}
          />
          <SkillCategory
            title="Tests"
            skills={skillsData.testing}
            delay={1.0}
          />
        </Box>
      </Container>
    </motion.div>
  );
}

export default Skills;
