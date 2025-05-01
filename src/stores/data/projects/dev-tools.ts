import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import assetLogoDevTools from "/assets/projects/logo_dev_tools.png";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2019-11-02",
  title: "DevTools",
  subtitle: "Outil de développement pour les développeurs de Comète Link.",
  description:
    "Application spécialement conçu pour les développeurs, elle leur permet de gérer les projets liés à Comète, maintenance des packages, publication des modules, lancement de commandes personnalisées, etc.",
  image: assetLogoDevTools,
  features: [
    "Gestion des projets de Comète Link",
    "Maintenance des packages",
    "Publication des modules",
    "Lancement de commandes personnalisées",
  ],
  technologies: [technology.electron, technology.nodeJs, technology.react],
};

// ----------------------------------------------------------------------

export default project;
