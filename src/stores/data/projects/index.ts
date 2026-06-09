import { Project } from "@/stores/types/projects.types";
import arcturia from "./arcturia";
import askalexAi from "./askalex-ai";
import cityWheels from "./city-wheels";
import cometeCloud from "./comete-cloud";
import cometeLink from "./comete-link";
import cometeOntime from "./comete-ontime";
import comete from "./comete";
import devTools from "./dev-tools";
import dokart from "./dokart";
import karedFit from "./kared-fit";
import karedFlip from "./kared-flip";
import karedUi from "./kared-ui";
import miapilot from "./miapilot";
import orca from "./orca";
import solutionsTerrains from "./solutions-terrains";

// ----------------------------------------------------------------------

const data: Project[] = [
  /**
   * Dokart
   * @description SaaS de gestion pour studios de tatouage
   */
  dokart,

  /**
   * Kared Flip
   * @description Jeu de cartes multijoueur en temps réel
   */
  karedFlip,

  /**
   * AskAlex AI
   * @description Backend RAG du chatbot du portfolio
   */
  askalexAi,

  /**
   * MiaPilot
   * @description POC d'identification d'objets par IA visuelle
   */
  miapilot,

  /**
   * Arcturia
   * @description Site vitrine d'une entreprise de services informatiques
   */
  arcturia,

  /**
   * Kared Fit
   * @description Application de planification de routines sportives
   */
  karedFit,

  /**
   * Kared UI
   * @description Design system pour les applications de Kared Dev
   */
  karedUi,

  /**
   * Solutions Terrains
   * @description Application de vente de terrains
   */
  solutionsTerrains,

  /**
   * Comète
   * @description Solution complète pour simplifier et optimiser tous les processus administratifs pour les sociétés de sécurité
   */
  comete,

  /**
   * Comète Link
   * @description Extension modulaire pour Comète
   */
  cometeLink,

  /**
   * Comète On Time
   * @description Application de pointage géolocalisé interfacé avec Comète
   */
  cometeOntime,

  /**
   * Comète Cloud
   * @description Application desktop pour le service technique de l'entreprise
   */
  cometeCloud,

  /**
   * Orca
   * @description Application de synchronisation de base de données et de fichiers
   */
  orca,

  /**
   * DevTools
   * @description Outil de développement pour les développeurs de Comète Link
   */
  devTools,

  /**
   * City Wheels
   * @description Site e-commerce d'excursion touristique à Paris en voiture de collection
   */
  cityWheels,
];

// ----------------------------------------------------------------------

export default data;
