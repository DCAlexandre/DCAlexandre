import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import assetLogoCityWheels from "/assets/projects/logo_city_wheels.jpg";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2016-07-08",
  title: "City Wheels",
  subtitle: "Site e-commerce d'excursion touristique à Paris en voiture de collection.",
  description:
    "Visitez Paris en Citroën Traction à ciel ouvert !\n\nDécouvrez la capitale à travers ses monuments, ses grandes avenues et petites ruelles escarpées.",
  image: assetLogoCityWheels,
  links: {
    website: "https://www.citywheels-paristours.com",
  },
  features: [
    "Permet aux utilisateurs de réserver une visite guidée à Paris en voiture de collection",
    "Présentation visuelle des visites guidées disponibles",
    "Le site peut être administré via la page WordPress",
  ],
  technologies: [technology.wordpress, technology.web],
};

// ----------------------------------------------------------------------

export default project;
