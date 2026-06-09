// ----------------------------------------------------------------------
// Métadonnées SEO par page — source unique de vérité.
//
// Le JSON `seo.pages.json` est partagé entre :
//   - le composant <Seo /> (rendu runtime, hissage natif React 19) ;
//   - le script `scripts/prerender.mjs` (injection statique au build).
// Modifier une métadonnée ici met à jour les deux à la fois.
// ----------------------------------------------------------------------

import pages from "@/config/seo.pages.json";

// ----------------------------------------------------------------------

export type SeoEntry = {
  /** Chemin de la page, ex. "/projects" ("" pour l'accueil) */
  path: string;
  /** Titre de l'onglet et des partages (sans le suffixe nom) */
  title: string;
  /** Meta description, < 160 caractères idéalement */
  description: string;
  /** Image de partage social absolue (optionnel) */
  image?: string;
  /** Empêche l'indexation de la page (ex. 404) */
  noIndex?: boolean;
};

export type SeoPageKey = keyof typeof pages;

/** Métadonnées SEO indexées par clé de page. */
export const SEO_PAGES = pages as Record<SeoPageKey, SeoEntry>;

// ----------------------------------------------------------------------

export default SEO_PAGES;
