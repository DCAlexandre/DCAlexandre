import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import image from "/assets/projects/kared_ui.png";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2025-04-19",
  title: "Kared UI",
  subtitle: "Design system pour les applications de Kared Dev.",
  description:
    "Kared UI (kui) est une librairie de composants React pour les applications de Kared Dev.\n\nElle permet de créer des applications plus rapidement et esthétiques.",
  image,
  features: ["Composants React", "Design system", "Tests unitaires complets"],
  technologies: [
    technology.react,
    technology.jest,
    technology.typescript,
    technology.html,
    technology.css,
    technology.javascript,
  ],
  role: "Conception et développement du design system (librairie de composants React) de Kared Dev.",
  impact: "Des applications Kared Dev livrées plus vite et visuellement cohérentes.",
};

// ----------------------------------------------------------------------

export default project;
