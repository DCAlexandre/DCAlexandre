import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2019-11-02",
  title: "DevTools",
  subtitle: "Outil de développement pour les développeurs de Comète Link.",
  description:
    "Application permettant de gérer les projets de Comète Link, maintenance des packages, publication des modules, lancement de commandes personnalisées, etc.",
  image: "/assets/projects/logo_dev_tools.png",
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
