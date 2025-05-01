import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { useTheme } from "@kared/kui/ThemeProvider";
import BoxNew from "@/components/BoxNew";
import { Skill } from "@/stores/types/skills.types";

// ----------------------------------------------------------------------

type BoxSkillCategoryProps = {
  title: string;
  skills: Skill[];
  inTraining?: boolean;
  delay?: number;
};

/**
 * Affiche une catégorie de compétences avec une animation fluide
 * @param title - Le titre de la catégorie
 * @param skills - Les compétences à afficher
 * @param inTraining - Si la compétence est en cours de formation
 * @param delay - Le délai d'animation
 */
const BoxSkillCategory = ({ title, skills, inTraining = false, delay = 0 }: BoxSkillCategoryProps) => {
  const { theme } = useTheme();

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

  // ----------------------------------------------------------------------

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} transition={{ delayChildren: delay }}>
      <Box display="flex" alignItems="center" sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>

        {inTraining && <Chip label="En cours de formation" color="info" size="small" sx={{ ml: 2 }} />}
      </Box>

      <Grid container spacing={2}>
        {skills
          .sort((a, b) => b.level - a.level)
          .map((item, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <motion.div variants={itemVariants}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 2,
                    height: "100%",
                    position: "relative",
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
                    {item.inTraining && <BoxNew size="small" />}

                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.name}
                    </Typography>

                    <Chip
                      label={`${item.level}%`}
                      size="small"
                      sx={{
                        bgcolor: item.color,
                        color: theme.palette.getContrastText(item.color),
                        fontWeight: "bold",
                      }}
                    />
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={item.level}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(0,0,0,0.1)",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: item.color,
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

// ----------------------------------------------------------------------

export default BoxSkillCategory;
