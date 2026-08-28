interface ProgressBarProps {
  currentStep: number;
  /** Aantal invulstappen (het resultaat telt niet mee). */
  totalSteps: number;
  /** Naam van de huidige stap, het ene heldere systeem. */
  stapNaam?: string;
}

/**
 * Hoeveel werk er nog ligt, in de taal van de bezoeker (28-aug-2026, pass 4).
 * Bewust een marge en bewust "ongeveer": dit is een schatting op basis van het
 * aantal velden dat nog komt, geen gemeten doorlooptijd.
 */
const RESTTIJD: Record<number, string> = {
  1: "nog ongeveer 2 minuten",
  2: "nog ongeveer 2 minuten",
  3: "nog ongeveer 1 minuut",
  4: "nog ongeveer 1 minuut",
  5: "laatste stap",
};

/**
 * Een helder voortgangssysteem: "Stap X van 5", hoeveel er nog komt, de naam van
 * de stap en een dunne balk. Geen losse bolletjes naast een lijn naast
 * wisselende teksten. De voortgang motiveert door te benoemen wat je nu doet.
 */
export default function ProgressBar({
  currentStep,
  totalSteps,
  stapNaam,
}: ProgressBarProps) {
  const pct = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-6 sm:mb-8">
      <div className="mb-1">
        <p className="section-eyebrow">
          Stap {currentStep} van {totalSteps}
          {RESTTIJD[currentStep] && (
            <span className="text-text-muted normal-case tracking-normal font-normal">
              {" "}
              &middot; {RESTTIJD[currentStep]}
            </span>
          )}
        </p>
      </div>
      {stapNaam && (
        <p className="font-display font-light text-primary text-base sm:text-lg mb-2">
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
