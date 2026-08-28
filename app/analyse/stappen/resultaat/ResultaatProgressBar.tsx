interface Props {
  stap: 1 | 2 | 3 | 4;
  titel: string;
  onVorige: () => void;
}

/**
 * Zelfde opbouw als de voortgangsbalk in de vragenflow (eyebrow met stap-
 * aanduiding, duidelijke "Vorige"-knop rechtsboven, balk eronder), zodat de
 * resultatenflow er als familie van uitziet in plaats van een ander scherm
 * (28-aug-2026, resultatenherbouw). De knop staat hier altijd, ook op stap 1:
 * die gaat dan terug naar de laatste vraag in plaats van naar stap 0.
 */
export default function ResultaatProgressBar({ stap, titel, onVorige }: Props) {
  const pct = stap * 25;

  return (
    <div className="mb-7">
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <p className="section-eyebrow">
          Uitkomst {stap} van 4
          <span className="text-text-muted normal-case tracking-normal font-normal">
            {" "}
            &middot; {titel}
          </span>
        </p>
        <button
          type="button"
          onClick={onVorige}
          aria-label="Vorige uitkomst"
          className="shrink-0 inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-[#C7CFCB] bg-card px-4 py-2.5 font-body text-sm font-medium text-primary shadow-sm transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          &larr; Vorige
        </button>
      </div>
      <div className="h-1.5 bg-[#E6E9E7] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
