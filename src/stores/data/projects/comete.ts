import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import image from "/assets/projects/comete.png";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2017-01-09",
  title: "Comète",
  subtitle:
    "Solution complète pour simplifier et optimiser tous les processus administratifs pour les sociétés de sécurité.",
  description:
    "Comète est une solution complète conçue pour simplifier et optimiser tous les processus administratifs des sociétés de sécurité.\n\nElle offre une gestion intégrée des plannings, des ressources humaines, de la facturation et du reporting. Comète permet aux entreprises de sécurité de gagner en efficacité et en productivité.\n\nLa solution est proposée en mode SaaS, garantissant une disponibilité et une sécurité optimales.",
  image,
  links: {
    website: "https://logiciel-comete.fr",
  },
  features: [
    "Gestion intégrée des plannings, des ressources humaines, de la facturation et du reporting",
    "Interface intuitive et fonctionnalités avancées",
    "Disponible en mode SaaS et On-Premise",
  ],
  technologies: [technology.omnis, technology.saas, technology.mysql],
};

// ----------------------------------------------------------------------

export default project;
