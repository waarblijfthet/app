import type { Brug } from "./types";

interface Props {
  brug: Brug;
  heeftAfwijking: boolean;
  onVerder: () => void;
}

const MISSCHIEN = [
  "Misschien vinden jullie gemak belangrijk.",
  "Misschien is een hoger bedrag een bewuste keuze.",
  "Misschien is er een tijdelijke situatie.",
];

/**
 * Uitkomst 3 van 4: de brug tussen "wat valt op" en "de Geldscan", zonder al
 * te verkopen. brug.kop/tegen/uitleg komen uit bouwBrug() in Stap6Resultaat en
 * zijn al afgestemd op de uitkomst: met een afwijking gaat het over waar vs
 * waarom, zonder afwijking (of met een tekort dat niet in de bedragen zit)
 * past de waar/waarom-framing niet en laten we die weg.
 */
export default function Resultaat3Betekenis({ brug, heeftAfwijking, onVerder }: Props) {
  return (
    <div className="max-w-xl">
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2 leading-snug">
        {brug.kop}
      </h2>
      <p className="font-display font-light text-[#A15A32] text-xl sm:text-2xl mb-6 leading-snug">
        {brug.tegen}
      </p>

      {heeftAfwijking && (
        <>
          <ul className="space-y-2 mb-6">
            {MISSCHIEN.map((zin) => (
              <li key={zin} className="font-body font-light text-text-soft text-sm leading-relaxed">
                {zin}
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-[#E6E9E7] bg-[#F0F3F1] p-5 mb-6">
            <p className="font-body text-sm text-primary leading-relaxed">
              De vergelijking laat zien <strong className="font-medium">waar</strong> het
              verschil zit. Maar nog niet <strong className="font-medium">waarom</strong>.
            </p>
          </div>
        </>
      )}

      <p className="text-text-soft font-body font-light text-base leading-relaxed mb-8">
        {brug.uitleg}
      </p>

      <button type="button" onClick={onVerder} className="btn-primary">
        Bekijk wat ik verder zou onderzoeken →
      </button>
    </div>
  );
}
