import type { ChipProps } from "@mui/material/Chip";
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
 * Style de chip par palier — une couleur distincte par niveau pour la lisibilité.
 */
export const TIER_STYLE: Record<SkillTier, { color: ChipProps["color"]; variant: "filled" | "outlined" }> = {
  Expert: { color: "success", variant: "filled" },
  Avancé: { color: "info", variant: "filled" },
  Confirmé: { color: "warning", variant: "outlined" },
  Intermédiaire: { color: "default", variant: "outlined" },
  "En apprentissage": { color: "secondary", variant: "outlined" },
};

/**
 * Ordre d'affichage de la légende (du plus élevé au plus bas).
 */
export const TIER_ORDER: SkillTier[] = ["Expert", "Avancé", "Confirmé", "Intermédiaire", "En apprentissage"];
