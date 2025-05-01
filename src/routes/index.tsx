import { Routes as RouterRoutes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Career from "@/pages/Career/PageCareer";
import Contact from "@/pages/Contact/PageContact";
import Home from "@/pages/Home/PageHome";
import Projects from "@/pages/Projects/PageProjects";
import Skills from "@/pages/Skills/PageSkills";
import { PATH_PAGE } from "./paths";

/**
 * Gestion des routes
 */
function Routes() {
  const location = useLocation();

  // ----------------------------------------------------------------------

  return (
    <AnimatePresence mode="wait">
      <RouterRoutes location={location} key={location.pathname}>
        <Route path={PATH_PAGE.root} element={<Navigate to={PATH_PAGE.home} />} />
        <Route path={PATH_PAGE.home} element={<Home />} />
        <Route path={PATH_PAGE.projects} element={<Projects />} />
        <Route path={PATH_PAGE.career} element={<Career />} />
        <Route path={PATH_PAGE.skills} element={<Skills />} />
        <Route path={PATH_PAGE.contact} element={<Contact />} />
      </RouterRoutes>
    </AnimatePresence>
  );
}

// ----------------------------------------------------------------------

export default Routes;
