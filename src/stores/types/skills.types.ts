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
};

/**
 * Type pour les compétences.
 */
export type Skills = {
  [key in SkillCategory]: Skill[];
};
