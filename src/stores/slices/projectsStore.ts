import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "@/stores/data/api";
import { Project } from "@/stores/types/projects.types";

/**
 * Statut des projets.
 * @interface
 */
interface ProjectsState {
  /**
   * Statut de chargement.
   */
  loading: boolean;

  /**
   * Erreur survenue lors du chargement des données.
   */
  error: Error | null;

  /**
   * Liste des projets.
   */
  projects: Project[];

  /**
   * Récupérer les projets.
   */
  getProjects: () => Promise<void>;

  /**
   * Fonction pour définir les projets.
   */
  setProjects: (projects: Project[]) => void;
}

/**
 * Store des projets.
 */
const useProjectsStore = create<ProjectsState>()(
  persist(
    /**
     * Définition de l'état initial et les actions du store.
     */
    (set): ProjectsState => ({
      loading: false,

      error: null,

      projects: [],

      getProjects: async () => {
        try {
          set({ loading: true, error: null });
          const projects = await api.get<Project[]>("projects");
          set({ projects, loading: false });
        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },

      setProjects: (projects) => set({ projects }),
    }),

    /**
     * Options de persistance.
     */
    {
      name: "adc-projects",
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

export default useProjectsStore;
