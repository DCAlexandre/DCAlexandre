/**
 * Type pour les liens des projets.
 */
export type ProjectLink = {
  /**
   * Lien vers le site web du projet.
   */
  website?: string;
  /**
   * Lien vers l'application iOS du projet.
   */
  ios?: string;
  /**
   * Lien vers l'application Android du projet.
   */
  android?: string;
};

/**
 * Type pour les technologies utilisées dans les projets.
 */
export type ProjectTechnology = {
  /**
   * Nom de la technologie.
   */
  name: string;
  /**
   * Couleur de la technologie.
   */
  color: string;
};

/**
 * Type pour les projets.
 */
export type Project = {
  /**
   * Titre du projet.
   */
  title: string;
  /**
   * Sous-titre du projet.
   */
  subtitle: string;
  /**
   * Description du projet.
   */
  description: string;
  /**
   * Date de début du projet.
   */
  dateStart: string;
  /**
   * Date de fin du projet.
   */
  dateEnd?: string;
  /**
   * Image du projet.
   */
  image: string;
  /**
   * Liens du projet.
   */
  links?: ProjectLink;
  /**
   * Fonctionnalités clés du projet.
   */
  features: string[];
  /**
   * Technologies utilisées dans le projet.
   */
  technologies: ProjectTechnology[];
};
