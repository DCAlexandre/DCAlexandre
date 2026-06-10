import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CardRecommendation from "@/components/CardRecommendation";
import HorizontalScrollArrows from "@/components/HorizontalScrollArrows";

/**
 * Affiche les recommandations reçues
 */
const BoxRecommendations = () => {
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
        component="h2"
        gutterBottom
        sx={{ mt: 6, mb: 3, fontWeight: "bold", textAlign: "center", userSelect: "none" }}
      >
        Ils me font confiance
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <HorizontalScrollArrows>
        {/* Recommendations */}
        <CardRecommendation author="Yann LECOCQ" role="Directeur chez Docteur Jekyll Office">
          Je recommande vivement ce développeur avec qui j'ai eu la chance de collaborer sur plusieurs projets. Son
          travail est toujours d'une grande précision, avec un réel souci du détail et de la qualité. Au-delà de ses
          compétences techniques, il se distingue par sa capacité à expliquer clairement chaque tâche et chaque
          fonction, ce qui rend la collaboration à la fois efficace et très enrichissante. Il est également force de
          proposition, apportant régulièrement des idées d'optimisation pertinentes et un véritable accompagnement tout
          au long des projets. La qualité de son travail et son expertise m'ont d'ailleurs conduit à m'associer avec lui
          sur plusieurs réalisations. En parallèle, il propose des cours de codage très pédagogiques, adaptés et
          accessibles. C'est une personne honnête, disponible et pleinement investie. Je le recommande sans hésitation à
          toute personne souhaitant développer ses projets ou monter en compétences en programmation.
        </CardRecommendation>

        <CardRecommendation author="Steeve KORN" role="Directeur chez SOLUTIONS TERRAINS">
          Nous avons le plaisir de travailler avec Alexandre depuis la création de notre application jusqu'à aujourd'hui
          pour la maintenance. Alexandre est très réactif, à l'écoute de nos besoins et proactif face aux problématiques
          que nous pouvons rencontrer. C'est un réel plaisir d'avoir élaborer ensemble la maquette de notre appli et de
          découvrir que le résultat final ressemble en tout point à ce que nous avons pensé ensemble. Je ne peux que
          recommander Alexandre pour son sérieux et la qualité de son travaille.
        </CardRecommendation>

        <CardRecommendation author="Aurore LEBLOIS" role="Développeuse chez Logiciel Comète">
          J'ai eu l'occasion de travailler avec Alexandre sur plusieurs projets et je ne peux que saluer son autonomie,
          sa rapidité d'exécution et sa capacité d'analyse. Il comprend vite et propose toujours des solutions
          pertinentes et efficaces. Passionné, enthousiaste et force de proposition, Alexandre a été un atout majeur
          pour le projet. Je le recommande sans réserve.
        </CardRecommendation>

        <CardRecommendation author="Kamardine CHANFI" role="Développeur web">
          Sérieux, autonome et ayant un bon esprit d'analyse, sont là quelques qualités que j'ai pu constater en ayant
          travaillé avec Alexandre.
        </CardRecommendation>
      </HorizontalScrollArrows>

      <Box sx={{ display: "flex", justifySelf: "right", mt: 2, gap: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          aria-label="Voir toutes les recommandations"
          href="https://www.linkedin.com/in/alexandre-dacosta/details/recommendations"
          target="_blank"
        >
          Voir toutes les recommandations
        </Button>

        <Button
          variant="contained"
          color="primary"
          size="small"
          aria-label="Faire appel à mes services"
          href="https://www.linkedin.com/services/page/940355333a15151a92"
          target="_blank"
        >
          Faire appel à mes services
        </Button>
      </Box>
    </motion.div>
  );
};

// ----------------------------------------------------------------------

export default BoxRecommendations;
