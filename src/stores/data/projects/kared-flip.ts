import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import image from "/assets/projects/kared_flip.webp";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2026-02-25",
  title: "Kared Flip",
  subtitle: "Jeu de cartes multijoueur en temps réel, jouable sur iOS, Android et navigateur.",
  description:
    "Kared Flip est un jeu de cartes multijoueur où les parties se déroulent en temps réel entre les joueurs.\n\nLe client mobile (React + Capacitor) communique avec un backend Node.js / Express via Socket.io pour synchroniser instantanément l'état de jeu.\n\nAuthentification et notifications gérées avec Firebase, déploiement automatisé (CI/CD, Docker) et publication sur les stores iOS et Android.",
  image,
  features: [
    "Parties multijoueur synchronisées en temps réel (Socket.io)",
    "Cross-platform : iOS, Android et web",
    "Authentification et notifications push (Firebase)",
    "Déploiement automatisé via CI/CD et Docker",
  ],
  links: {
    android: "https://play.google.com/store/apps/details?id=com.kared.karedflip",
  },
  technologies: [
    technology.react,
    technology.capacitor,
    technology.typescript,
    technology.nodeJs,
    technology.express,
    technology.socketIo,
    technology.firebase,
    technology.docker,
    technology.githubActions,
    technology.ios,
    technology.android,
  ],
  role: "Développement complet du jeu et de son backend temps réel, du gameplay jusqu'à la publication sur les stores.",
  impact: "Un jeu multijoueur fluide, déployé sur iOS, Android et web, avec un déploiement entièrement automatisé.",
};

// ----------------------------------------------------------------------

export default project;
