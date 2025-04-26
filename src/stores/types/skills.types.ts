/**
 * Type pour les catégories de compétences.
 */
export type SkillCategory = "frontend" | "backend" | "database" | "devops" | "testing";

/**
 * Type pour une compétence.
 */
export type Skill = {
  /**
   * Nom de la compétence.
   */
  name: string;
  /**
   * Couleur de la compétence.
   */
  color: string;
  /**
   * Niveau de la compétence.
   */
  level: number;
  /**
   * Indique si la compétence est en cours de formation.
   */
  inTraining?: boolean;
};

/**
 * Type pour les compétences.
 */
export type Skills = {
  [key in SkillCategory]: Skill[];
};
