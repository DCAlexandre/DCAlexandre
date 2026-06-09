// ----------------------------------------------------------------------

type GtagParams = Record<string, string | number | boolean | undefined>;

type WindowWithGtag = Window & {
  gtag?: (command: "event", action: string, params?: GtagParams) => void;
};

/**
 * Envoie un évènement à Google Analytics (gtag) si disponible.
 * @description Sans échec si gtag n'est pas chargé (bloqueurs, dev sans GA).
 * @param action - Nom de l'évènement (ex. "cta_click")
 * @param params - Paramètres optionnels de l'évènement
 */
export function trackEvent(action: string, params: GtagParams = {}): void {
  const { gtag } = window as WindowWithGtag;
  gtag?.("event", action, params);
}
