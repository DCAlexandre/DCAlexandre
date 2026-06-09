import { Project } from "@/stores/types/projects.types";
import technology from "@/stores/data/technology";
import image from "/assets/projects/dokart.png";

// ----------------------------------------------------------------------

const project: Project = {
  dateStart: "2026-03-09",
  title: "Dokart",
  subtitle:
    "SaaS de gestion pour studios de tatouage : clients, rendez-vous, devis, factures, documents de consentement et abonnements Stripe.",
  description:
    "Dokart est une plateforme SaaS complète pensée pour les tatoueurs et les studios.\n\nElle centralise toute la gestion d'activité : fiches clients, prise de rendez-vous, devis et factures, documents de consentement, et facturation par abonnement via Stripe.\n\nArchitecturée en monorepo (front React + API NestJS), avec une base PostgreSQL pilotée par Prisma, le tout conteneurisé avec Docker et couvert par des tests.",
  image,
  features: [
    "Gestion des clients et des rendez-vous",
    "Devis, factures et documents de consentement",
    "Abonnements et paiements via Stripe",
    "Architecture monorepo full-stack (React + NestJS + Prisma)",
    "Multi-studio et accès par rôle",
  ],
  links: {
    website: "https://dokart.fr/",
  },
  technologies: [
    technology.react,
    technology.typescript,
    technology.nestjs,
    technology.prisma,
    technology.postgresql,
    technology.stripe,
    technology.tailwind,
    technology.firebase,
    technology.docker,
  ],
  role: "Conception et développement full-stack : architecture monorepo, API NestJS/Prisma, intégration Stripe et interface React.",
  impact:
    "Un produit SaaS complet qui digitalise toute la gestion d'un studio, du premier rendez-vous jusqu'à la facturation.",
  featured: true,
};

// ----------------------------------------------------------------------

export default project;
