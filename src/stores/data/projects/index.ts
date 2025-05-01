import { Project } from "@/stores/types/projects.types";
import cityWheels from "./city-wheels";
import cometeLink from "./comete-link";
import cometeOntime from "./comete-ontime";
import comete from "./comete";
import devTools from "./dev-tools";
import karedFit from "./kared-fit";
import karedUi from "./kared-ui";
import orca from "./orca";
import solutionsTerrains from "./solutions-terrains";

// ----------------------------------------------------------------------

const data: Project[] = [
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
