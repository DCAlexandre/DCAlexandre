import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import image from "/assets/projects/solutions_terrains.png";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2025-02-04",
  title: "Solutions Terrains",
  subtitle: "Plateforme dédiée à la valorisation des terrains auprès de particuliers, aménageurs et promoteurs.",
  description:
    "Solutions Terrains est une application mobile dédiée à la valorisation des assiettes foncières.\nElle met en relation les propriétaires de terrains avec des particuliers, aménageurs et promoteurs intéressés par l'acquisition de terrains.\n\nLa plateforme offre une interface intuitive et des outils puissants pour faciliter la recherche et la valorisation des terrains.\nDisponible sur iOS, Android et Web.",
  image,
  links: {
    website: "https://www.solutions-terrains.com",
    ios: "https://apps.apple.com/fr/app/solutions-terrains/id6742559497?platform=iphone",
    android: "https://play.google.com/store/apps/details?id=com.solutionsterrains.app",
  },
  features: [
    "Valorisation des terrains auprès de particuliers, aménageurs et promoteurs",
    "Mise en relation entre propriétaires et acheteurs",
    "Interface intuitive et outils de recherche avancés",
  ],
  technologies: [
    technology.react,
    technology.capacitor,
    technology.firebase,
    technology.ios,
    technology.android,
    technology.web,
  ],
};

// ----------------------------------------------------------------------

export default project;
