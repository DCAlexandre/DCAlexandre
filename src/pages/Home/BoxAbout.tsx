import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import CardAbout from "@/components/CardAbout";

/**
 * Affiche une description à propos de moi
 */
const BoxAbout = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  // ----------------------------------------------------------------------

  return (
    <motion.div variants={itemVariants}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ mt: 6, mb: 3, fontWeight: "bold", textAlign: "center", userSelect: "none" }}
      >
        À propos de moi
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Stack spacing={3}>
        <CardAbout color="primary.main" Icon={WorkIcon}>
          <Typography variant="body1">
            Je suis actuellement <strong>Lead Developer</strong> chez Comète dans le développement d'applications web et
            mobile
          </Typography>

          <Typography variant="body1">
            Je suis également <strong>développeur freelance</strong> et j'ai travaillé sur plusieurs projets en tant que
            développeur fullstack
          </Typography>
        </CardAbout>

        <CardAbout color="secondary.main" Icon={CodeIcon}>
          <Typography variant="body1">Je travaille actuellement sur plusieurs projets passionnants ! </Typography>
        </CardAbout>

        <CardAbout color="primary.light" Icon={GroupsIcon}>
          <Typography variant="body1">
            Je suis disponible pour réaliser des projets en collaboration en tant qu'entrepreneur
          </Typography>
        </CardAbout>

        <CardAbout color="primary.dark" Icon={SchoolIcon}>
          <Typography variant="body1">
            Je suis en constante formation pour apprendre de nouvelles technologies
          </Typography>
        </CardAbout>
      </Stack>
    </motion.div>
  );
};

// ----------------------------------------------------------------------

export default BoxAbout;
