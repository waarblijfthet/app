interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  /** Korte, positieve omschrijving van de huidige fase. */
  faseTekst?: string;
  onStepClick?: (step: number) => void;
}

/**
 * Rustige voortgang (28-aug-2026).
 *
 * Bij de start tonen we geen "Stap 1 van 6": dat communiceert vooral hoeveel
 * werk er nog komt. In plaats daarvan een rij stippen plus de tijdsindicatie.
 * Zodra iemand bezig is, verschijnt een dunne balk met een korte, positieve
 * omschrijving van de fase. De hoeveelheid stappen dringt zich nergens op.
 */
export default function ProgressBar({
  currentStep,
  totalSteps,
  faseTekst,
  onStepClick,
}: ProgressBarProps) {
  const pct = Math.round((currentStep / totalSteps) * 100);
  const startModus = currentStep === 1;

  return (
    <div className="mb-8">
      {/* Stippen: gevuld tot en met de huidige stap. Voltooide stappen zijn
          klikbaar om terug te gaan. */}
      <div className="flex items-center gap-1.5 mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => {
          const stap = i + 1;
          const gedaan = stap <= currentStep;
          const klikbaar = stap < currentStep && !!onStepClick;
          return (
            <button
              key={stap}
              type="button"
              disabled={!klikbaar}
              onClick={() => klikbaar && onStepClick!(stap)}
              aria-label={`Onderdeel ${stap} van ${totalSteps}${
                klikbaar ? ", klik om terug te gaan" : ""
              }`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                klikbaar ? "cursor-pointer" : "cursor-default"
              }`}
              style={{
                width: stap === currentStep ? "1.75rem" : "0.5rem",
                backgroundColor: gedaan ? "#0B7A6E" : "#DCE3E0",
              }}
            />
          );
        })}
      </div>

      {startModus ? (
        <p className="font-body text-xs text-text-muted">
          &#8987; &plusmn; 2 minuten &middot; begin met een paar tikjes
        </p>
      ) : (
        <div>
          <div className="h-1 bg-[#E6E9E7] rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          {faseTekst && (
            <p className="font-body text-sm font-medium text-primary">{faseTekst}</p>
          )}
        </div>
      )}
    </div>
  );
}
