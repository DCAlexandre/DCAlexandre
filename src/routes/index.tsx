import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "@/pages/Home";
import Skills from "@/pages/Skills";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import { PATH_PAGE } from "./paths";

/**
 * Gestion des routes animées
 * @returns {JSX.Element}
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={PATH_PAGE.root} element={<Navigate to={PATH_PAGE.home} />} />
        <Route path={PATH_PAGE.home} element={<Home />} />
        <Route path={PATH_PAGE.skills} element={<Skills />} />
        <Route path={PATH_PAGE.projects} element={<Projects />} />
        <Route path={PATH_PAGE.contact} element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

// ----------------------------------------------------------------------

export default AnimatedRoutes;
