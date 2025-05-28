import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import image from "/assets/projects/comete_cloud.png";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2021-03-07",
  title: "Comète Cloud",
  subtitle:
    "Application destinée au service technique de l'entreprise pour faciliter les installations des applications Comète.",
  description:
    "Comète Cloud est une application desktop développée pour le service technique de l'entreprise, visant à simplifier et automatiser l'installation, la configuration et la gestion des différentes applications de l'écosystème Comète.\n\nCette solution a été conçue pour accélérer les déploiements, réduire les erreurs humaines et offrir un gain de temps considérable pour les équipes techniques.",
  image,
  features: [
    "Installation rapide des applications évitant les interventions manuelles fastidieuses",
    "Configuration centralisée des paramètres techniques, avec accès direct aux options de chaque module depuis l'interface",
    "Gestion des mises à jour automatiques, assurant que toutes les applications restent à jour sans intervention supplémentaire",
  ],
  technologies: [technology.electron, technology.nodeJs, technology.react],
};

// ----------------------------------------------------------------------

export default project;
