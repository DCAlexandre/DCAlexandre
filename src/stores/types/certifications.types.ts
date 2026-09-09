// ----------------------------------------------------------------------

/**
 * Type pour une certification / formation certifiante.
 */
export type Certification = {
  /** Intitulé de la certification. */
  name: string;
  /** Organisme émetteur. */
  issuer: string;
  /** Année (ou date) d'obtention. */
  date: string;
  /** Domaine de compétence associé (pour relier aux compétences). */
  domain?: "IA" | "DevOps";
};
