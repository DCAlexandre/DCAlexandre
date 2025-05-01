import { useEffect } from "react";
import useSkillsStore from "@/stores/slices/skillsStore";
export type { Skills } from "@/stores/types/skills.types";

/**
 * Hook pour gérer les compétences.
 */
const useSkills = () => {
  const loading = useSkillsStore((state) => state.loading);
  const error = useSkillsStore((state) => state.error);
  const skills = useSkillsStore((state) => state.skills);
  const getSkills = useSkillsStore((state) => state.getSkills);

  // ----------------------------------------------------------------------

  useEffect(() => {
    // Récupération des compétences
    getSkills();
  }, [getSkills]);

  // ----------------------------------------------------------------------

  return {
    loading,
    error,
    skills,
  };
};

// ----------------------------------------------------------------------

export default useSkills;
