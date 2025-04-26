import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2024-08-18",
  title: "Kared Fit",
  subtitle:
    "Application de planification de routines sportives. Planifie tes séances, défie tes amis, évoluez ensemble en temps réel et gagnez des récompenses. Transforme chaque entraînement en un défi motivant et ludique !",
  description:
    "Kared Fit est une application mobile innovante qui révolutionne l'expérience d'entraînement. Elle permet aux utilisateurs de planifier leurs séances, de défier leurs amis et d'évoluer ensemble en temps réel. Chaque entraînement devient un défi motivant et ludique, avec un système de récompenses et d'expérience qui encourage la progression. L'application est disponible sur iOS et Android, offrant une expérience utilisateur fluide et engageante.",
  image: "/assets/projects/logo_kared_fit.png",
  links: {
    website: "https://www.linkedin.com/company/kared-dev",
    ios: "https://apps.apple.com/fr/app/kared-fit/id6739947899?platform=iphone",
    android: "https://play.google.com/store/apps/details?id=com.kared.karedfit",
  },
  features: [
    "Planification de routines sportives personnalisées",
    "Défis entre amis et suivi en temps réel",
    "Système de récompenses et de progression",
    "Gestion des groupes de sportifs",
  ],
  technologies: [
    technology.react,
    technology.capacitor,
    technology.cypress,
    technology.firebase,
    technology.firebaseTestLab,
    technology.aws,
    technology.linux,
    technology.ios,
    technology.android,
  ],
};

// ----------------------------------------------------------------------

export default project;
