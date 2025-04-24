import { Project } from "../types/projects.types";

// ----------------------------------------------------------------------

const data: Project[] = [
  {
    id: 1,
    title: "Kared Fit",
    description:
      "Application de planification de routines sportives. Planifie tes séances, défie tes amis, évoluez ensemble en temps réel et gagnez des récompenses. Transforme chaque entraînement en un défi motivant et ludique !",
    longDescription:
      "Kared Fit est une application mobile innovante qui révolutionne l'expérience d'entraînement. Elle permet aux utilisateurs de planifier leurs séances, de défier leurs amis et d'évoluer ensemble en temps réel. Chaque entraînement devient un défi motivant et ludique, avec un système de récompenses et d'expérience qui encourage la progression. L'application est disponible sur iOS et Android, offrant une expérience utilisateur fluide et engageante.",
    image: "/path-to-kared-fit-image.jpg", // Remplacer par le chemin de votre image
    links: {
      website: "https://www.linkedin.com/company/kared-dev",
      ios: "https://apps.apple.com/fr/app/kared-fit/id6739947899?platform=iphone",
      android: "https://play.google.com/store/apps/details?id=com.kared.karedfit"
    },
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Capacitor", color: "#119EFF" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "AWS", color: "#FF9900" },
      { name: "Linux", color: "#FCC624" },
      { name: "iOS", color: "#000000" },
      { name: "Android", color: "#3DDC84" }
    ]
  },

  // ----------------------------------------------------------------------

  {
    id: 2,
    title: "Solutions Terrains",
    description: "Plateforme dédiée à la valorisation des terrains auprès de particuliers, aménageurs et promoteurs.",
    longDescription:
      "Solutions Terrains est une plateforme innovante dédiée à la valorisation des assiettes foncières. Elle met en relation les propriétaires de terrains avec des particuliers, aménageurs et promoteurs intéressés par l'acquisition de terrains. La plateforme offre une interface intuitive et des outils puissants pour faciliter la recherche et la valorisation des terrains. Disponible sur iOS, Android et Web, elle s'adapte à tous les utilisateurs et leurs besoins spécifiques.",
    image: "/path-to-solutions-terrains-image.jpg", // Remplacer par le chemin de votre image
    links: {
      website: "https://www.solutions-terrains.com",
      ios: "https://apps.apple.com/fr/app/solutions-terrains/id6742559497?platform=iphone",
      android: "https://play.google.com/store/apps/details?id=com.solutionsterrains.app"
    },
    technologies: [
      { name: "React", color: "#61DAFB" },
      { name: "Capacitor", color: "#119EFF" },
      { name: "Firebase", color: "#FFCA28" },
      { name: "iOS", color: "#000000" },
      { name: "Android", color: "#3DDC84" },
      { name: "Web", color: "#FF7139" }
    ]
  },

  // ----------------------------------------------------------------------

  {
    id: 3,
    title: "Comète",
    description:
      "Solution complète pour simplifier et optimiser tous les processus administratifs pour les sociétés de sécurité.",
    longDescription:
      "Comète est une solution complète conçue pour simplifier et optimiser tous les processus administratifs des sociétés de sécurité. Elle offre une gestion intégrée des plannings, des ressources humaines, de la facturation et du reporting. Grâce à son interface intuitive et ses fonctionnalités avancées, Comète permet aux entreprises de sécurité de gagner en efficacité et en productivité. La solution est proposée en mode SaaS, garantissant une disponibilité et une sécurité optimales.",
    image: "/path-to-comete-image.jpg", // Remplacer par le chemin de votre image
    links: {
      website: "https://logiciel-comete.fr"
    },
    technologies: [
      { name: "SaaS", color: "#0080FF" },
      { name: "MySQL", color: "#4479A1" },
      { name: "Omnis", color: "#0080FF" }
    ]
  },

  // ----------------------------------------------------------------------

  {
    id: 4,
    title: "Comète Link",
    description:
      "Extension modulaire pour Comète. Plateforme composée de plusieurs espaces dédiés et de modules complémentaires à composer selon les besoins des clients.",
    longDescription:
      "Comète Link est une extension modulaire pour la solution Comète, offrant une plateforme composée de plusieurs espaces dédiés et de modules complémentaires. Les clients peuvent composer leur solution selon leurs besoins spécifiques, bénéficiant ainsi d'une flexibilité maximale. Disponible sur iOS, Android et en version desktop via Electron, Comète Link s'adapte à tous les environnements de travail. La solution utilise des technologies modernes comme React, Node.js, Laravel et diverses bases de données pour offrir une expérience utilisateur optimale.",
    image: "/path-to-comete-link-image.jpg", // Remplacer par le chemin de votre image
    links: {
      website: "https://logiciel-comete.fr/comete-link",
      ios: "https://apps.apple.com/fr/app/com%C3%A8te-link/id1608699303",
      android: "https://play.google.com/store/apps/details?id=fr.aexae.comete"
    },
    technologies: [
      { name: "WebApp", color: "#4285F4" },
      { name: "NodeJS", color: "#339933" },
      { name: "React", color: "#61DAFB" },
      { name: "Capacitor", color: "#119EFF" },
      { name: "Laravel", color: "#FF2D20" },
      { name: "MySQL", color: "#4479A1" },
      { name: "PostgreSQL", color: "#4169E1" },
      { name: "Electron", color: "#47848F" },
      { name: "iOS", color: "#000000" },
      { name: "Android", color: "#3DDC84" }
    ]
  },

  // ----------------------------------------------------------------------

  {
    id: 5,
    title: "Comète On Time",
    description:
      "Les pointages géolocalisés disponibles dans Comète. Module permettant aux agents de sécurité de réaliser leurs pointages sur site.",
    longDescription:
      "Comète On Time est un module de pointage géolocalisé intégré à la solution Comète. Il permet aux agents de sécurité de réaliser leurs pointages directement sur site, garantissant ainsi la précision et la fiabilité des données de présence. Grâce à la géolocalisation, les entreprises peuvent vérifier que les agents sont bien présents sur les sites assignés. Disponible sur iOS et Android, l'application offre une interface intuitive et des fonctionnalités adaptées aux besoins spécifiques des agents de sécurité et de leurs superviseurs.",
    image: "/path-to-comete-ontime-image.jpg", // Remplacer par le chemin de votre image
    links: {
      website:
        "https://logiciel-comete.fr/2023/12/20/comete-on-time-les-pointages-geolocalises-disponibles-dans-comete",
      ios: "https://apps.apple.com/fr/app/com%C3%A8te-on-time/id6445984894",
      android: "https://play.google.com/store/apps/details?id=fr.aexae.comete_pointages"
    },
    technologies: [
      { name: "WebApp", color: "#4285F4" },
      { name: "NodeJS", color: "#339933" },
      { name: "React", color: "#61DAFB" },
      { name: "Capacitor", color: "#119EFF" },
      { name: "Laravel", color: "#FF2D20" },
      { name: "MySQL", color: "#4479A1" },
      { name: "PostgreSQL", color: "#4169E1" },
      { name: "Electron", color: "#47848F" },
      { name: "iOS", color: "#000000" },
      { name: "Android", color: "#3DDC84" }
    ]
  }
];

// ----------------------------------------------------------------------

export default data;
