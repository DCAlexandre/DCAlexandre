import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import image from "/assets/projects/miapilot.webp";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2025-06-01",
  title: "MiaPilot (POC)",
  subtitle:
    "Prototype (POC / R&D) d'assistant visuel : identifier, classer et relier des objets physiques à une base de données, par photo et IA.",
  description:
    "MiaPilot est un proof of concept explorant la reconnaissance d'objets par IA visuelle.\n\nL'idée : photographier un objet, le faire reconnaître et classer automatiquement (modèle de vision type CLIP / TensorFlow), puis le relier à des références en base, avec une interface simple et un système d'annotation intelligent.\n\nApplication hybride (React + Capacitor / Ionic) adossée à un service Python pour la partie machine learning. Projet d'expérimentation, non destiné à la production en l'état.",
  image,
  features: [
    "Reconnaissance d'objets par photo (vision IA)",
    "Classification et annotation assistée",
    "Mise en relation avec une base de références",
    "Application mobile hybride + service ML Python",
  ],
  technologies: [
    technology.react,
    technology.typescript,
    technology.capacitor,
    technology.ionic,
    technology.firebase,
    technology.tensorflow,
    technology.ai,
    technology.python,
    technology.ios,
    technology.android,
  ],
  role: "Prototypage rapide de l'idée : application mobile hybride + service de vision par IA pour valider la faisabilité.",
  impact: "Un POC fonctionnel démontrant la reconnaissance et le rattachement d'objets à une base de données.",
};

// ----------------------------------------------------------------------

export default project;
