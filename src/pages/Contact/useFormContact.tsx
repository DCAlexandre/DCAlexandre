import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema, { UseFormContact, Snackbar, ApiResponse, ApiValidationError, FormData } from "./useFormContact.types";

// URL de l'API de contact
const { VITE_API_EMAIL } = import.meta.env;

/**
 * Hook pour gérer le formulaire de contact
 * @returns {UseFormContact} Les propriétés et méthodes pour gérer le formulaire
 */
function useFormContact(): UseFormContact {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<Snackbar>({
    open: false,
    message: "",
    severity: "success",
  });

  // ----------------------------------------------------------------------

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  /**
   * Affiche une snackbar
   * @param type - Le type de la snackbar ("success" | "error")
   * @param message - Le message de la snackbar
   * @returns {void}
   */
  const showSnackbar = (type: "success" | "error", message: string) => {
    setSnackbar({ open: true, message, severity: type });
  };

  /**
   * Gestion de la fermeture de la snackbar
   * @returns {void}
   */
  const onCloseSnackbar = useCallback((): void => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  /**
   * Gestion de la soumission du formulaire
   * @param {FormData} formData - Les données du formulaire validées
   * @returns {Promise<void>}
   */
  const onSubmit = useCallback(
    async (formData: FormData): Promise<void> => {
      setIsSubmitting(true);

      console.debug({ formData });

      try {
        // Envoi de la requête
        const response = await fetch(VITE_API_EMAIL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, source: "portfolio-adc" }),
        });

        const data: ApiResponse = await response.json();

        // Gestion des erreurs
        if (!response.ok) {
          console.debug({ data });

          // Traiter les erreurs de validation
          if (response.status === 400 && data.errors) {
            // Formater les erreurs pour l'affichage
            const errorMessages = data.errors.map((err: ApiValidationError) => err.msg).join(", ");

            showSnackbar("error", errorMessages);
          } else {
            // Autres types d'erreurs
            showSnackbar("error", data.message || "Une erreur est survenue lors de l'envoi du message.");
          }
          setIsSubmitting(false);
          return;
        }

        // Gestion du succès
        if (data.success) {
          // Afficher un message de succès
          showSnackbar("success", "Votre message a été envoyé avec succès !");

          // Réinitialiser le formulaire
          reset();
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.error("useFormContactError", err);

        showSnackbar("error", "Une erreur est survenue lors de l'envoi du message.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset]
  );

  // ----------------------------------------------------------------------

  return {
    isSubmitting,
    errors,
    snackbar,
    register,
    submit: handleSubmit(onSubmit),
    closeSnackbar: onCloseSnackbar,
  };
}

// ----------------------------------------------------------------------

export default useFormContact;
