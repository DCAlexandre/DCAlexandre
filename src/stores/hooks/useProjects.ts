import { useEffect, useMemo } from "react";
import useProjectsStore from "@/stores/slices/projectsStore";
export type { Project } from "@/stores/types/projects.types";

/**
 * Hook pour gérer les projets.
 */
const useProjects = () => {
  const loading = useProjectsStore((state) => state.loading);
  const error = useProjectsStore((state) => state.error);
  const projects = useProjectsStore((state) => state.projects);
  const getProjects = useProjectsStore((state) => state.getProjects);
  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => new Date(b.dateStart).getTime() - new Date(a.dateStart).getTime()),
    [projects]
  );

  // ----------------------------------------------------------------------

  useEffect(() => {
    // Récupération des projets
    getProjects();
  }, [getProjects]);

  // ----------------------------------------------------------------------

  return {
    loading,
    error,
    projects: sortedProjects,
  };
};

// ----------------------------------------------------------------------

export default useProjects;
