import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import image from "/assets/projects/arcturia.png";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2026-01-22",
  title: "Arcturia",
  subtitle: "Site vitrine d'une entreprise de services informatiques pour TPE et PME.",
  description:
    "Arcturia est le site vitrine d'une société de services informatiques destinée aux TPE et PME.\n\nDéveloppé sur demande client, il présente l'entreprise, ses services et ses offres, avec un formulaire de contact et une prise de rendez-vous.\n\nRéalisation rapide et soignée (React + TypeScript), pensée pour être facilement maintenue et faire évoluer le contenu.",
  image,
  features: [
    "Présentation de l'entreprise, des services et des offres",
    "Formulaire de contact",
    "Prise de rendez-vous intégrée",
    "Interface responsive et soignée",
  ],
  links: {
    website: "https://arcturia-it.fr/",
  },
  technologies: [technology.react, technology.typescript, technology.web],
  role: "Conception et réalisation du site vitrine de A à Z, en lien direct avec le client.",
  impact: "Une présence en ligne livrée rapidement, que le client peut faire évoluer facilement.",
  featured: true,
};

// ----------------------------------------------------------------------

export default project;
