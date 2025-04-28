import { useState } from "react";
import { AlertColor } from "@mui/material/Alert";

/**
 * Hook pour gérer le formulaire de contact
 */
function useFormContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{
    name: boolean;
    email: boolean;
    subject: boolean;
    message: boolean;
  }>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const { VITE_API_EMAIL } = import.meta.env;

  /**
   * Gestion du changement des champs du formulaire
   * @param ev - Événement de changement de champ
   */
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Réinitialiser l'erreur lorsque l'utilisateur commence à taper
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  /**
   * Validation du formulaire
   * @returns - True si le formulaire est valide, false sinon
   */
  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      subject: formData.subject.trim() === "",
      message: formData.message.trim() === "",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  /**
   * Gestion de la soumission du formulaire
   * @param ev - Événement de soumission du formulaire
   */
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsSubmitting(true);

    console.debug({ formData });

    // Validation du formulaire
    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Veuillez corriger les erreurs dans le formulaire.",
        severity: "warning",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Envoi de la requête
      const response = await fetch(VITE_API_EMAIL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, source: "portfolio-adc" }),
      });

      const data = await response.json();

      // Gestion des erreurs
      if (!response.ok) {
        console.debug({ data });

        // Traiter les erreurs de validation
        if (response.status === 400 && data.errors) {
          // Formater les erreurs pour l'affichage
          type ValidationError = { msg: string; path: string; location: string; type: string };
          const errorMessages = data.errors.map((err: ValidationError) => err.msg).join(", ");

          setSnackbar({ open: true, message: errorMessages, severity: "error" });
        } else {
          // Autres types d'erreurs
          setSnackbar({
            open: true,
            message: data.message || "Une erreur est survenue lors de l'envoi du message.",
            severity: "error",
          });
        }
        setIsSubmitting(false);
        return;
      }

      // Gestion du succès
      if (data.success) {
        // Afficher un message de succès
        setSnackbar({
          open: true,
          message: "Votre message a été envoyé avec succès !",
          severity: "success",
        });

        // Réinitialiser le formulaire
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.error("useFormContactError", err);

      setSnackbar({
        open: true,
        message: "Une erreur est survenue lors de l'envoi du message.",
        severity: "error",
      });
    }
  };

  /**
   * Gestion de la fermeture de la snackbar
   */
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // ----------------------------------------------------------------------

  return {
    isSubmitting,
    formData,
    errors,
    snackbar,
    handleChange,
    validateForm,
    handleSubmit,
    handleCloseSnackbar,
  };
}

// ----------------------------------------------------------------------

export default useFormContact;
