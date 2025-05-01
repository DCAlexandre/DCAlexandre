import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import api from "@/stores/data/api";
import { Career } from "@/stores/types/careers.types";

/**
 * Statut des carrières.
 * @interface
 */
interface CareersState {
  /**
   * Statut de chargement.
   */
  loading: boolean;

  /**
   * Erreur survenue lors du chargement des données.
   */
  error: Error | null;

  /**
   * Liste des carrières.
   */
  careers: Career[];

  /**
   * Récupérer les carrières.
   */
  getCareers: () => Promise<void>;

  /**
   * Fonction pour définir les carrières.
   */
  setCareers: (careers: Career[]) => void;
}

/**
 * Store des carrières.
 */
const useCareersStore = create<CareersState>()(
  persist(
    /**
     * Définition de l'état initial et les actions du store.
     */
    (set): CareersState => ({
      loading: false,

      error: null,

      careers: [],

      getCareers: async () => {
        try {
          set({ loading: true, error: null });
          const careers = await api.get<Career[]>("careers");
          set({ careers, loading: false });
        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },

      setCareers: (careers) => set({ careers }),
    }),

    /**
     * Options de persistance.
     */
    {
      name: "adc-careers",
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

export default useCareersStore;
