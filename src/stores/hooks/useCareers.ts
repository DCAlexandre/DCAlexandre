import { useEffect, useMemo } from "react";
import useCareersStore from "@/stores/slices/careersStore";
export type { Career } from "@/stores/types/careers.types";

/**
 * Hook pour gérer les carrières.
 */
const useCareers = () => {
  const loading = useCareersStore((state) => state.loading);
  const error = useCareersStore((state) => state.error);
  const careers = useCareersStore((state) => state.careers);
  const getCareers = useCareersStore((state) => state.getCareers);
  const sortedCareers = useMemo(
    () => [...careers].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [careers]
  );

  // ----------------------------------------------------------------------

  useEffect(() => {
    // Récupération des projets
    getCareers();
  }, [getCareers]);

  // ----------------------------------------------------------------------

  return {
    loading,
    error,
    careers: sortedCareers,
  };
};

// ----------------------------------------------------------------------

export default useCareers;
