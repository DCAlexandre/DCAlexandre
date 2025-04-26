/**
 * Couche d'abstraction API pour la récupération des données
 *
 * @description Ce fichier simule une API RESTful pour démontrer une architecture orientée services.
 *
 * Dans un environnement de production, ces fonctions seraient remplacées par de véritables
 * appels HTTP vers un backend, tout en conservant la même interface.
 *
 * Points forts de cette approche :
 * - Séparation claire des préoccupations (données/logique métier)
 * - Facilité de migration vers une API réelle sans modifier les composants consommateurs
 * - Structure évolutive et maintenable
 */

/**
 * Récupération des données d'un fichier
 * @returns Promise contenant les données du fichier
 */
async function get<T>(path: string): Promise<T> {
  return new Promise((resolve) => {
    /* @vite-ignore */
    import(`./${path}`)
      .then((module) => {
        resolve(module.default);
      })
      .catch((err) => {
        console.error("API_GET_ERROR", err);
        const error = err instanceof Error ? err : new Error("Une erreur inconnue est survenue");
        throw error;
      });
  });
}

// ----------------------------------------------------------------------

export default { get };
