/**
 * Fonction helper pour construire des chemins
 * @param {string} root - Le chemin racine
 * @param {string} pathname - Le chemin à ajouter à la racine
 * @returns {string} - Le chemin combiné
 */
const path = (root: string, pathname: string): string => {
  return `${root}${pathname}`.replace(/\/\//g, "/");
};

const ROOT = "/";

/**
 * Définition des chemins de l'application
 */
export const PATH_PAGE: Record<string, string> = {
  root: ROOT,
  home: path(ROOT, "home"),
  skills: path(ROOT, "skills"),
  projects: path(ROOT, "projects"),
  contact: path(ROOT, "contact")
};
