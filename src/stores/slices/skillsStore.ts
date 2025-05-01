import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "@/stores/data/api";
import { Skills } from "@/stores/types/skills.types";

/**
 * Statut des compétences.
 * @interface
 */
interface SkillsState {
  /**
   * Statut de chargement.
   */
  loading: boolean;

  /**
   * Erreur survenue lors du chargement des données.
   */
  error: Error | null;

  /**
   * Liste des compétences.
   */
  skills: Skills;

  /**
   * Récupérer les compétences.
   */
  getSkills: () => Promise<void>;

  /**
   * Fonction pour définir les compétences.
   */
  setSkills: (skills: Skills) => void;
}

/**
 * Store des compétences.
 */
const useSkillsStore = create<SkillsState>()(
  persist(
    /**
     * Définition de l'état initial et les actions du store.
     */
    (set): SkillsState => ({
      loading: false,

      error: null,

      skills: {
        frontend: [],
        backend: [],
        database: [],
        devops: [],
        testing: [],
      },

      getSkills: async () => {
        try {
          set({ loading: true, error: null });
          const skills = await api.get<Skills>("skills");
          set({ skills, loading: false });
        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },

      setSkills: (skills) => set({ skills }),
    }),

    /**
     * Options de persistance.
     */
    {
      name: "adc-skills",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(typeof persistedState === "object" ? persistedState : {}),
      }),
      migrate: (persistedState) => {
        return persistedState;
      },
    }
  )
);

// ----------------------------------------------------------------------

export default useSkillsStore;
