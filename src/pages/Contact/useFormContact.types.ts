import { FormEvent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { AlertColor } from "@mui/material/Alert";
import * as yup from "yup";

/**
 * Types de demande proposés dans le formulaire (valeur envoyée + libellé lisible).
 */
export const REQUEST_TYPES = [
  { value: "freelance", label: "Mission freelance" },
  { value: "projet-tpe", label: "Projet complet à créer (TPE)" },
  { value: "cdi", label: "Offre d'emploi (CDI)" },
] as const;

/**
 * Libellé lisible d'un type de demande (pour l'email et l'affichage).
 */
export const requestTypeLabel = (value: string): string =>
  REQUEST_TYPES.find((type) => type.value === value)?.label ?? value;

/**
 * Schéma de validation du formulaire
 */
const schema = yup.object({
  name: yup
    .string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(50, "Le nom ne doit pas dépasser 50 caractères")
    .required("Le nom est requis"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  requestType: yup
    .string()
    .oneOf(
      REQUEST_TYPES.map((type) => type.value),
      "Choisissez le type de demande"
    )
    .required("Indiquez le type de demande"),
  subject: yup
    .string()
    .min(3, "Le sujet doit contenir au moins 3 caractères")
    .max(50, "Le sujet ne doit pas dépasser 50 caractères")
    .required("Le sujet est requis"),
  message: yup
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne doit pas dépasser 1000 caractères")
    .required("Le message est requis"),
});

export default schema;

/**
 * Type pour les données du formulaire basé sur le schéma Yup
 */
export type FormData = yup.InferType<typeof schema>;

/**
 * Type pour la snackbar
 */
export type Snackbar = {
  open: boolean;
  message: string;
  severity: AlertColor;
};

/**
 * Type pour le hook exposant les contrôles et états du formulaire
 */
export type UseFormContact = {
  isSubmitting: boolean;
  errors: FieldErrors<FormData>;
  snackbar: Snackbar;
  register: UseFormRegister<FormData>;
  submit: (ev: FormEvent<HTMLFormElement>) => void;
  closeSnackbar: () => void;
};

/**
 * Type pour la réponse de l'API
 */
export type ApiResponse = {
  /**
   * Indique si la requête a réussi
   * @example true
   */
  success?: boolean;
  /**
   * Message de l'API
   * @example "Message envoyé avec succès"
   */
  message?: string;
  /**
   * Erreurs de validation
   * @example [{ msg: "Name must be between 3 and 50 characters", path: "name", location: "body", type: "field", value: "John" }]
   */
  errors?: ApiValidationError[];
};

/**
 * Type pour les erreurs de validation de l'API
 */
export type ApiValidationError = {
  /**
   * Message d'erreur
   * @example "Name must be between 3 and 50 characters"
   */
  msg: string;
  /**
   * Chemin de l'erreur
   * @example "name"
   */
  path: string;
  /**
   * Emplacement de l'erreur
   * @example "body"
   */
  location: string;
  /**
   * Type d'erreur
   * @example "field"
   */
  type: string;
  /**
   * Valeur de l'erreur
   * @example "J"
   */
  value: string;
};
