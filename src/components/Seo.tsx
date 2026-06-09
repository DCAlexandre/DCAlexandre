// ----------------------------------------------------------------------

// URL de production du portfolio (sans slash final), définie dans .env
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://kared-dev.fr/alexandre";

// Image de partage social par défaut (générée par scripts/generate-og-image.mjs)
const DEFAULT_IMAGE = `${SITE_URL}/assets/og-image.png`;

type SeoProps = {
  /** Titre de l'onglet et des partages (sans le suffixe nom) */
  title: string;
  /** Meta description, < 160 caractères idéalement */
  description: string;
  /** Chemin de la page, ex. "/projects" ("" pour l'accueil) */
  path: string;
  /** Image de partage social absolue (optionnel) */
  image?: string;
  /** Empêche l'indexation de la page (ex. 404) */
  noIndex?: boolean;
};

/**
 * Gestion des métadonnées SEO par page.
 * @description S'appuie sur le hissage natif des balises `<title>`/`<meta>`/`<link>`
 *   vers le `<head>` introduit par React 19 — aucune dépendance type react-helmet.
 */
function Seo({ title, description, path, image = DEFAULT_IMAGE, noIndex = false }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | Alexandre Da Costa`;

  // ----------------------------------------------------------------------

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noIndex ? <meta name="robots" content="noindex, follow" /> : <link rel="canonical" href={url} />}

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Alexandre Da Costa | Tech Lead & Développeur Fullstack Freelance" />
      <meta property="og:locale" content="fr_FR" />

      {/* X (anciennement Twitter) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Alexandre__DC" />
      <meta name="twitter:creator" content="@Alexandre__DC" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}

// ----------------------------------------------------------------------

export default Seo;
