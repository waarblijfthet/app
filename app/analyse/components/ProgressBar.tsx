interface ProgressBarProps {
  currentStep: number;
  /** Aantal invulstappen (het resultaat telt niet mee). */
  totalSteps: number;
  /** Naam van de huidige stap, het ene heldere systeem. */
  stapNaam?: string;
  onStepClick?: (step: number) => void;
}

/**
 * Eén helder voortgangssysteem (28-aug-2026): "Stap X van 5", de naam van de
 * stap, en een dunne balk. Geen losse bolletjes naast een lijn naast wisselende
 * teksten. De voortgang motiveert door te benoemen wat je nú doet.
 */
export default function ProgressBar({
  currentStep,
  totalSteps,
  stapNaam,
  onStepClick,
}: ProgressBarProps) {
  const pct = Math.round((currentStep / totalSteps) * 100);
  const terug = currentStep > 1 && !!onStepClick;

  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-1.5">
        <p className="section-eyebrow">
          Stap {currentStep} van {totalSteps}
        </p>
        {terug && (
          <button
            type="button"
            onClick={() => onStepClick!(currentStep - 1)}
            className="font-body text-xs text-text-muted hover:text-primary transition-colors"
          >
            ← Vorige
          </button>
        )}
      </div>
      {stapNaam && (
        <p className="font-display font-light text-primary text-lg mb-2">
          {stapNaam}
        </p>
      )}
      <div className="h-1.5 bg-[#E6E9E7] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${Math.max(pct, 8)}%` }}
        />
      </div>
    </div>
  );
}
