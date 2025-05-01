import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import assetLogoCometeLink from "/assets/projects/logo_comete_link.png";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2020-01-20",
  title: "Comète Link",
  subtitle:
    "Extension modulaire pour Comète. Plateforme composée de plusieurs espaces dédiés et de modules complémentaires à composer selon les besoins des clients.",
  description:
    "Comète Link est une extension modulaire pour la solution Comète, offrant une plateforme composée de plusieurs espaces dédiés.\n\nLes clients peuvent composer leur solution selon leurs besoins spécifiques, bénéficiant ainsi d'une flexibilité maximale.",
  image: assetLogoCometeLink,
  links: {
    website: "https://logiciel-comete.fr/comete-link",
    ios: "https://apps.apple.com/fr/app/com%C3%A8te-link/id1608699303",
    android: "https://play.google.com/store/apps/details?id=fr.aexae.comete",
  },
  features: [
    "Extension modulaire pour Comète",
    "Plusieurs espaces dédiés et modules complémentaires",
    "Flexibilité selon les besoins des clients",
    "Disponible sur iOS, Android et sur le web",
  ],
  technologies: [
    technology.webApp,
    technology.nodeJs,
    technology.react,
    technology.capacitor,
    technology.cypress,
    technology.laravel,
    technology.phpUnit,
    technology.mysql,
    technology.postgresql,
    technology.ios,
    technology.android,
  ],
};

// ----------------------------------------------------------------------

export default project;
