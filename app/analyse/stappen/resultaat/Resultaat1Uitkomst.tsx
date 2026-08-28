import { fmtEur } from "@/lib/quiz-types";

interface Props {
  conclusieKop: string;
  over: number;
  benchmarkOver: number;
  contextZin: string;
  inkomenWisselend: boolean;
  spaardoelWaarde: number;
  onVerder: () => void;
}

/**
 * Uitkomst 1 van 4: alleen het hoofdresultaat en de vergelijking. Geen
 * afwijkingen, geen aanbod. Dat komt pas op de volgende stappen, want deze
 * stap beantwoordt precies één vraag: hoe ziet de financiële ruimte eruit.
 */
export default function Resultaat1Uitkomst({
  conclusieKop,
  over,
  benchmarkOver,
  contextZin,
  inkomenWisselend,
  spaardoelWaarde,
  onVerder,
}: Props) {
  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl mb-8 leading-snug">
        {conclusieKop}
      </h2>

      <div className="card-base border border-[#E6E9E7]">
        <p className="section-eyebrow mb-2 text-center">Geschatte financiële ruimte</p>
        <p
          className={`font-display font-light text-5xl sm:text-6xl md:text-7xl mb-2 text-center ${
            over < 0 ? "text-[#C4603A]" : "text-primary"
          }`}
        >
          {over < 0 ? `-${fmtEur(Math.abs(over))}` : fmtEur(over)}
        </p>
        <p className="text-text-muted font-body text-sm text-center mb-6">
          per maand
        </p>
        <div className="border-t border-[#E6E9E7] pt-5">
          <p className="text-text-soft font-body font-light text-sm text-center leading-relaxed">
            Voor een vergelijkbaar huishouden verwachten we ongeveer{" "}
            <strong className="text-primary font-medium">{fmtEur(benchmarkOver)}</strong>{" "}
            per maand.
          </p>
          <p className="text-primary font-body text-sm text-center mt-3 leading-relaxed">
            {contextZin}
          </p>
        </div>
        <p className="font-body font-light text-text-muted text-xs mt-5 leading-relaxed">
          Die verwachting is mijn eigen vuistregel op basis van vier dingen: je
          inkomen, het aantal volwassenen, het aantal kinderen en je
          autosituatie. Geen norm en geen oordeel. De vergelijking weet niets
          over de leeftijd van je kinderen, je regio, alimentatie of hoeveel je
          op je huis hebt afgelost, en die kunnen flink meewegen.
        </p>
        {inkomenWisselend && (
          <p className="font-body font-light text-text-muted text-xs mt-3 leading-relaxed">
            Je gaf aan dat je inkomen wisselt. Deze uitkomst rekent met het
            gemiddelde dat je invulde, dus in een magere maand is de ruimte
            kleiner en in een goede maand groter.
          </p>
        )}
        {spaardoelWaarde > 0 && (
          <p className="font-body font-light text-text-soft text-xs mt-3 leading-relaxed border-t border-[#E6E9E7] pt-3">
            {over >= spaardoelWaarde
              ? `Je wilde ${fmtEur(
                  spaardoelWaarde
                )} per maand opzij zetten. Dat past binnen deze ruimte, er blijft dan nog ${fmtEur(
                  over - spaardoelWaarde
                )} over.`
              : `Je wilde ${fmtEur(
                  spaardoelWaarde
                )} per maand opzij zetten. Dat is ${fmtEur(
                  spaardoelWaarde - over
                )} meer dan de ruimte die we nu zien. Dat hoeft geen lek te zijn: het kan ook betekenen dat het doel en de uitgaven nu niet naast elkaar passen.`}
          </p>
        )}
      </div>

      <div className="mt-8 text-center">
        <button type="button" onClick={onVerder} className="btn-primary">
          Laat zien waar het verschil zit →
        </button>
      </div>
    </div>
  );
}
