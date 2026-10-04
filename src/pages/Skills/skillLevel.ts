import type { Skill } from "@/stores/types/skills.types";

// ----------------------------------------------------------------------

/**
 * Paliers qualitatifs de maîtrise (pas de note chiffrée affichée).
 */
export type SkillTier = "Expert" | "Avancé" | "Confirmé" | "Intermédiaire" | "En apprentissage";

/**
 * Traduit un niveau interne (0-100) en palier qualitatif.
 */
export const levelLabel = (skill: Skill): SkillTier => {
  if (skill.inTraining) return "En apprentissage";
  if (skill.level >= 90) return "Expert";
  if (skill.level >= 75) return "Avancé";
  if (skill.level >= 50) return "Confirmé";
  return "Intermédiaire";
};

/**
 * Couleur (clé de palette MUI, utilisable en `sx`) associée à chaque palier.
 * Sert au libellé texte, en complément de la jauge qui porte le niveau.
 */
export const TIER_COLOR: Record<SkillTier, string> = {
  Expert: "success.main",
  Avancé: "info.main",
  Confirmé: "warning.main",
  Intermédiaire: "text.secondary",
  "En apprentissage": "secondary.main",
};
