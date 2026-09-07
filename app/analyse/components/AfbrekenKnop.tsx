interface Props {
  onAfbreken: () => void;
}

/**
 * Kleine, ingehouden knop om de analyse te stoppen en terug te gaan naar de
 * landingpagina (7-sep-2026). Staat op elke stap van de vragenflow en de
 * resultatenflow, want zonder deze knop was er geen weg terug: sessionStorage
 * onthoudt de voortgang bewust over een herlaadbeurt heen (28-aug-2026, pass
 * 5), dus ook een refresh bracht een bezoeker niet meer bij de introductie.
 * Bewust een tekstlink, geen tweede prominente knop naast "Vorige": dit is
 * een uitgang, geen actie die de flow vooruit helpt.
 */
export default function AfbrekenKnop({ onAfbreken }: Props) {
  return (
    <button
      type="button"
      onClick={onAfbreken}
      className="shrink-0 font-body text-xs text-text-muted underline decoration-[#C7CFCB] underline-offset-2 transition-colors hover:text-primary"
    >
      Analyse afbreken
    </button>
  );
}
