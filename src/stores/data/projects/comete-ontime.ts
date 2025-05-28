import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import image from "/assets/projects/comete_ontime.png";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2023-03-01",
  title: "Comète On Time",
  subtitle:
    "Les pointages géolocalisés disponibles dans Comète. Module permettant aux agents de sécurité de réaliser leurs pointages sur site.",
  description:
    "Comète On Time est un module de pointage géolocalisé intégré à la solution Comète. Il permet aux agents de sécurité de réaliser leurs pointages directement sur site, garantissant ainsi la précision et la fiabilité des données de présence.\n\nGrâce à la géolocalisation, les entreprises peuvent vérifier que les agents sont bien présents sur les sites assignés.\n\nDisponible sur iOS et Android, l'application offre une interface intuitive et des fonctionnalités adaptées aux besoins spécifiques des agents de sécurité et de leurs superviseurs.",
  image,
  links: {
    website: "https://logiciel-comete.fr/2023/12/20/comete-on-time-les-pointages-geolocalises-disponibles-dans-comete",
    ios: "https://apps.apple.com/fr/app/com%C3%A8te-on-time/id6445984894",
    android: "https://play.google.com/store/apps/details?id=fr.aexae.comete_pointages",
  },
  features: [
    "Pointages géolocalisés sur site",
    "Interface intuitive et adaptée aux besoins des agents de sécurité",
    "Disponible sur iOS et Android",
  ],
  technologies: [
    technology.nodeJs,
    technology.react,
    technology.capacitor,
    technology.webApp,
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
