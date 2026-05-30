interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
  onStepClick?: (step: number) => void;
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  labels = [],
  onStepClick,
}: ProgressBarProps) {
  const huidigLabel = labels[currentStep - 1] ?? "";

  return (
    <div className="mb-8">
      {/* Mobiel: compacte indicator + segmentbalk */}
      <div className="sm:hidden mb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="font-body text-xs font-medium text-primary">
            Stap {currentStep} van {totalSteps}
            {huidigLabel ? ` · ${huidigLabel}` : ""}
          </span>
          {currentStep < totalSteps && (
            <span className="font-body text-xs text-text-muted">
              nog {totalSteps - currentStep}
            </span>
          )}
        </div>
        <div className="flex gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-full transition-colors duration-300"
              style={{ backgroundColor: i < currentStep ? "#1C3A2A" : "#E8E0D0" }}
            />
          ))}
        </div>
      </div>

      {/* Desktop: stepper met categorienamen */}
      <div className="hidden sm:flex items-center">
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
                aria-label={`Stap ${stap}: ${label}${voltooid ? " (voltooid, klik om te bewerken)" : ""}`}
                className={`flex items-center gap-2 ${klikbaar ? "cursor-pointer hover:opacity-80" : "cursor-default"}`}
              >
                <span
                  className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-body font-medium flex-shrink-0 transition-colors"
                  style={{
                    backgroundColor: voltooid ? "#1C3A2A" : huidig ? "#C4603A" : "#E8E0D0",
                    color: voltooid || huidig ? "#FFFFFF" : "#8A9E8E",
                  }}
                >
                  {voltooid ? "✓" : stap}
                </span>
                <span
                  className="font-body text-xs whitespace-nowrap transition-colors"
                  style={{
                    color: huidig ? "#1C3A2A" : voltooid ? "#4A5E4E" : "#8A9E8E",
                    fontWeight: huidig ? 600 : 400,
                  }}
                >
                  {label}
                </span>
              </button>
              {i < totalSteps - 1 && (
                <div
                  className="h-px flex-1 mx-2 transition-colors duration-300"
                  style={{ backgroundColor: stap < currentStep ? "#1C3A2A" : "#E8E0D0" }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
