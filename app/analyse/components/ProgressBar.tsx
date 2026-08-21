interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  onStepClick?: (step: number) => void;
}

/**
 * Voortgang (21-aug-2026).
 *
 * Mobiel bewust geen zes labels naast elkaar. Alleen "Stap 2 van 6", de naam
 * van de stap en een doorlopende balk. Op desktop wel de volledige stepper,
 * met een duidelijk zichtbare actieve stap.
 */
export default function ProgressBar({
  currentStep,
  totalSteps,
  labels = [],
  onStepClick,
}: ProgressBarProps) {
  const huidigLabel = labels[currentStep - 1] ?? "";
  const pct = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-8">
      {/* Mobiel: compacte voortgang */}
      <div className="sm:hidden">
        <p className="font-body text-xs font-medium text-text-muted mb-0.5">
          Stap {currentStep} van {totalSteps}
        </p>
        <p className="font-body text-base font-medium text-primary mb-2">
          {huidigLabel}
        </p>
        <div className="h-2 bg-[#E6E9E7] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Desktop: stepper met categorienamen */}
      <div className="hidden sm:block">
        <p className="font-body text-xs font-medium text-text-muted mb-3">
          Stap {currentStep} van {totalSteps}
          {huidigLabel ? `: ${huidigLabel}` : ""}
        </p>
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, i) => {
            const stap = i + 1;
            const label = labels[i] ?? `Stap ${stap}`;
            const voltooid = stap < currentStep;
            const huidig = stap === currentStep;
            const klikbaar = voltooid && !!onStepClick;
            return (
              <div
                key={label}
                className="flex items-center"
                style={{ flex: i < totalSteps - 1 ? 1 : "0 0 auto" }}
              >
                <button
                  type="button"
                  disabled={!klikbaar}
                  onClick={() => klikbaar && onStepClick!(stap)}
                  aria-current={huidig ? "step" : undefined}
                  aria-label={`Stap ${stap}: ${label}${
                    voltooid ? " (voltooid, klik om te bewerken)" : ""
                  }`}
                  className={`flex items-center gap-2 rounded-full transition-all ${
                    huidig ? "bg-[#E7F1EE] pl-1 pr-3 py-1" : ""
                  } ${klikbaar ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
                >
                  <span
                    className="flex items-center justify-center rounded-full font-body font-semibold flex-shrink-0 transition-all"
                    style={{
                      width: huidig ? "2rem" : "1.65rem",
                      height: huidig ? "2rem" : "1.65rem",
                      fontSize: huidig ? "0.8rem" : "0.7rem",
                      backgroundColor: voltooid
                        ? "#16211F"
                        : huidig
                        ? "#0B7A6E"
                        : "#EDF0EE",
                      color: voltooid || huidig ? "#FFFFFF" : "#A3ADA8",
                    }}
                  >
                    {voltooid ? "\u2713" : stap}
                  </span>
                  <span
                    className="font-body whitespace-nowrap transition-colors"
                    style={{
                      color: huidig ? "#0B7A6E" : voltooid ? "#4A5A56" : "#A3ADA8",
                      fontWeight: huidig ? 600 : 400,
                      fontSize: huidig ? "0.85rem" : "0.75rem",
                    }}
                  >
                    {label}
                  </span>
                </button>
                {i < totalSteps - 1 && (
                  <div
                    className="h-px flex-1 mx-2 transition-colors duration-300"
                    style={{
                      backgroundColor: stap < currentStep ? "#16211F" : "#E6E9E7",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
