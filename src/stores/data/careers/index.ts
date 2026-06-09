import { Career } from "@/stores/types/careers.types";
import assetLogoKaredDev from "/assets/career/logo_kared_dev.jpg";
import assetLogoComete from "/assets/career/logo_comete.jpg";
import assetLogoAexae from "/assets/career/logo_aexae.jpg";
import assetLogoInsta from "/assets/career/logo_insta.jpg";
import assetLogoUniversiteEvry from "/assets/career/logo_universite_evry.jpg";
import assetLogoGuestWhat from "/assets/career/logo_guestwhat.jpg";

// ----------------------------------------------------------------------

const data: Career[] = [
  {
    title: "Entrepreneur indépendant",
    subtitle: "Kared Dev",
    date: "2024-12-01",
    description:
      "Création d'applications sur mesure pour start-ups, PME et indépendants, de l'idéation à la mise en production. Accompagnement de bout en bout, avec un regard sur la scalabilité, l'UX et la fiabilité technique.",
    color: "primary",
    variant: "filled",
    img: assetLogoKaredDev,
  },
  {
    title: "Tech Lead",
    subtitle: "Logiciel Comète",
    date: "2020-01-01",
    description:
      "Pilotage et modernisation des développements web de l'écosystème Comète : architecture, CI/CD, gestion des environnements Dev/Pré-prod/Prod et support aux équipes.",
    color: "primary",
    variant: "filled",
    img: assetLogoComete,
  },
  {
    title: "Software Engineer",
    subtitle: "Aexae",
    date: "2017-07-01",
    description:
      "Développement évolutif et maintenance de l'ERP Comète (sécurité privée) et d'outils internes. Support technique avancé sur les serveurs clients et contribution aux guidelines UI/UX des produits.",
    color: "primary",
    variant: "outlined",
    img: assetLogoAexae,
  },
  {
    title: "Développeur en alternance",
    subtitle: "Aexae",
    date: "2016-10-09",
    description:
      "Prise en main de l'ERP Comète (langage Omnis) : agents, plannings, facturation, exports paie. Initiative personnelle : refonte complète d'un outil web interne de gestion des licences.",
    color: "secondary",
    variant: "filled",
    img: assetLogoAexae,
  },
  {
    title: "Développeur en alternance",
    subtitle: "GuestWhat",
    date: "2016-05-01",
    description:
      "Développement de deux plateformes web (réseau social événementiel et mise en relation professionnelle) : intégration front, back sur mesure (CMS), déploiement et référencement SEO de base.",
    color: "secondary",
    variant: "filled",
    img: assetLogoGuestWhat,
  },
  {
    title: "Formation - BTS SIO",
    subtitle: "INSTA",
    date: "2015-09-01",
    description: "BTS Services Informatiques aux Organisations (développement d'applications).",
    color: "secondary",
    variant: "outlined",
    img: assetLogoInsta,
  },
  {
    title: "Licence informatique",
    subtitle: "Université Évry Paris-Saclay",
    date: "2013-09-01",
    description: "Fondamentaux de l'informatique et du développement logiciel.",
    color: "secondary",
    variant: "outlined",
    img: assetLogoUniversiteEvry,
  },
];

// ----------------------------------------------------------------------

export default data;
