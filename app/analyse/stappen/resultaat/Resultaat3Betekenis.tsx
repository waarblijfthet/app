interface Props {
  onVerder: () => void;
}

/**
 * Uitkomst 3 van 4: de brug tussen "waar het verschil zit" en de Geldscan.
 * Kort en scherp, niet vier keer op andere toon herhalen dat we het nog niet
 * weten: één opbouw, dan door naar de volgende stap.
 */
export default function Resultaat3Betekenis({ onVerder }: Props) {
  return (
    <div className="max-w-xl">
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2 leading-snug">
        Je weet nu waar het verschil zit.
      </h2>
      <p className="font-display font-light text-[#A15A32] text-xl sm:text-2xl mb-6 leading-snug">
        Maar cijfers vertellen nog niet of dit een probleem is.
      </p>

      <div className="space-y-1 mb-6">
        <p className="font-body font-light text-text-soft text-base leading-relaxed">
          Een hoger bedrag kan een bewuste keuze zijn.
        </p>
        <p className="font-body font-light text-text-soft text-base leading-relaxed">
          Het kan tijdelijk zijn.
        </p>
        <p className="font-body font-light text-text-soft text-base leading-relaxed">
          Of er kan een patroon onder zitten dat jullie zelf nog niet zien.
        </p>
      </div>

      <div className="rounded-xl border border-[#E6E9E7] bg-[#F0F3F1] p-5 mb-6">
        <p className="font-body text-sm text-primary leading-relaxed">
          De vergelijking laat zien waar het verschil zit. Maar nog niet wat erachter zit.
        </p>
      </div>

      <p className="text-text-soft font-body font-light text-base leading-relaxed mb-8">
        Hoge uitgaven kunnen prima passen bij jullie situatie. Maar ze kunnen ook
        wijzen op uitgaven, keuzes of patronen die aandacht verdienen. Met alleen
        deze vergelijking is dat nog niet te beoordelen.
      </p>

      <button type="button" onClick={onVerder} className="btn-primary">
        Laat zien wat jij verder zou onderzoeken →
      </button>
    </div>
  );
}
