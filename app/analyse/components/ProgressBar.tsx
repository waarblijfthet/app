import { CATEGORIE_LABEL } from "../schermen";

interface ProgressBarProps {
  categorie: 1 | 2 | 3 | 4 | 5;
  /** Positie in de lijst van schermen die voor DEZE bezoeker gelden. */
  positie: number;
  totaal: number;
  onVorige?: () => void;
  toonVorige: boolean;
}

/**
 * Eén doorlopende balk over de hele flow, niet een balk die per categorie
 * reset (28-aug-2026, pass 5). De breuk is altijd tegen de schermen die na
 * conditionele logica daadwerkelijk voor deze bezoeker gelden, dus de balk
 * liegt niet als een vraag wordt overgeslagen.
 */
export default function ProgressBar({
  categorie,
  positie,
  totaal,
  onVorige,
  toonVorige,
}: ProgressBarProps) {
  const pct = totaal > 0 ? Math.round((positie / totaal) * 100) : 0;

  return (
    <div className="mb-7">
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <p className="section-eyebrow">
          Stap {categorie} van 5
          <span className="text-text-muted normal-case tracking-normal font-normal">
            {" "}
            &middot; {CATEGORIE_LABEL[categorie]}
          </span>
        </p>
        {toonVorige && onVorige && (
          <button
            type="button"
            onClick={onVorige}
            className="shrink-0 font-body text-xs text-text-muted hover:text-primary transition-colors"
          >
            &larr; Vorige
          </button>
        )}
      </div>
      <div className="h-1.5 bg-[#E6E9E7] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${Math.max(pct, 4)}%` }}
        />
      </div>
    </div>
  );
}
