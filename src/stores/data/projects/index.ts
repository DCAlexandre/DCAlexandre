import { Project } from "@/stores/types/projects.types";
import cometeLink from "./comete-link";
import cometeOntime from "./comete-ontime";
import comete from "./comete";
import devTools from "./dev-tools";
import orca from "./orca";
import karedFit from "./kared-fit";
import karedUi from "./kared-ui";
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
];

// ----------------------------------------------------------------------

export default data;
