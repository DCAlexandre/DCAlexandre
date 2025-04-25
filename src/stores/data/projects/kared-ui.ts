import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2025-04-19",
  title: "Kared UI",
  subtitle: "Design system pour les applications de Kared Dev.",
  description:
    "Kared UI (kui) est une librairie de composants React pour les applications de Kared Dev.\nElle permet de créer des applications plus rapidement et esthétiques.",
  image: "/assets/projects/kared_ui.png",
  features: ["Composants React", "Design system", "Tests unitaires complets"],
  technologies: [
    technology.react,
    technology.jest,
    technology.typescript,
    technology.html,
    technology.css,
    technology.javascript,
  ],
};

// ----------------------------------------------------------------------

export default project;
