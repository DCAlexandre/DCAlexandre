import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2021-02-15",
  title: "Orca",
  subtitle: "Application de synchronisation de base de données et de fichiers.",
  description:
    "Application permettant de synchroniser des bases de données et des fichiers entre différentes plateformes. Elle a été conçu sur mesure pour les applications de Comète.",
  image: "/assets/projects/logo_orca.png",
  features: [
    "Synchronisation de bases de données",
    "Synchronisation de fichiers",
    "Analyse des données transférées",
    "Déclenchement d'alertes",
  ],
  technologies: [technology.electron, technology.nodeJs, technology.react, technology.laravel, technology.phpUnit],
};

// ----------------------------------------------------------------------

export default project;
