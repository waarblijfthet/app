import { fmtEur, QuizData } from "@/lib/quiz-types";
import Link from "next/link";
import BewaarUitkomst from "./BewaarUitkomst";
import { rapportVoorSlug } from "@/lib/rapporten-data";

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
function OudeUitkomst({
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

interface NieuweProps extends Props {
  soortUitkomst: "gat" | "tekort" | "klopt" | "meer" | "oud";
  werkelijkOver: number | null;
  gat: number | null;
  meerdere: boolean;
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
  resultaat: Record<string, unknown>;
}

/**
 * Uitkomst 1 van 4, sinds 12-okt-2026 rond het gat: wat er op papier
 * overblijft tegenover wat er volgens de bezoeker echt overblijft. De
 * vergelijking met een vergelijkbaar huishouden staat nu op stap 2, want "meer
 * over dan je zelf zou verwachten" was een uitspraak over iets wat nooit
 * gevraagd was (41 van de 54 afgeronde analyses van 12 sep tot 12 okt kregen
 * die kop). Oude sessies in de admin tonen de oude uitkomst.
 */
export default function Resultaat1Uitkomst(props: NieuweProps) {
  const { soortUitkomst, werkelijkOver, gat, over, conclusieKop, contextZin, onVerder } = props;
  if (soortUitkomst === "oud" || werkelijkOver === null) {
    return <OudeUitkomst {...props} />;
  }
  const voorbeeld = rapportVoorSlug("alleenstaand-huurwoning");
  const isGat = soortUitkomst === "gat" && gat !== null;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-4xl mb-8 leading-snug">
        {conclusieKop}
      </h2>

      <div className="card-base border border-[#E6E9E7]">
        <div className="grid grid-cols-2 gap-4 pb-5 border-b border-[#E6E9E7]">
          <div>
            <p className="section-eyebrow mb-1">Op papier over</p>
            <p className={`font-body font-medium text-xl ${over < 0 ? "text-[#C4603A]" : "text-primary"}`}>
              {over < 0 ? `-${fmtEur(Math.abs(over))}` : fmtEur(over)}
            </p>
            <p className="font-body text-xs text-text-muted mt-1">inkomen min wat je invulde</p>
          </div>
          <div>
            <p className="section-eyebrow mb-1">Echt over</p>
            <p className="font-body font-medium text-xl text-primary">{fmtEur(werkelijkOver)}</p>
            <p className="font-body text-xs text-text-muted mt-1">wat je zelf opgaf</p>
          </div>
        </div>

        {isGat && gat !== null && (
          <div className="pt-6 text-center">
            <p className="section-eyebrow mb-2">Niet aan te wijzen</p>
            <p className="font-display font-light text-[#C4603A] text-5xl sm:text-6xl leading-none mb-2">
              {fmtEur(gat)}
            </p>
            <p className="text-text-muted font-body text-sm">per maand</p>
          </div>
        )}

        <p className="text-primary font-body text-sm text-center mt-5 leading-relaxed">{contextZin}</p>

        {isGat && voorbeeld && (
          <p className="font-body font-light text-text-soft text-xs mt-5 pt-4 border-t border-[#E6E9E7] leading-relaxed">
            Bij een van de rapporten die ik schreef zat het grootste verschil precies tussen wat iemand dacht uit te
            geven en wat er werkelijk naar losse uitgaven en jaaruitgaven ging.{" "}
            <Link href={`/rapporten/${voorbeeld.slug}`} className="text-[#0B7A6E] hover:underline">
              Lees dat rapport
            </Link>
            .
          </p>
        )}
        {isGat && (
          <p className="font-body font-light text-text-muted text-xs mt-4 leading-relaxed">
            Het gat is een schatting: het verschil tussen twee getallen die je allebei uit je hoofd invulde. Hoe groter
            het is, hoe minder toeval het wordt.
          </p>
        )}
      </div>

      {isGat && (
        <BewaarUitkomst
          data={props.data}
          onChange={props.onChange}
          resultaat={props.resultaat}
          linkTekst="Stuur me deze uitkomst, met het gat erin"
        />
      )}

      <div className="mt-8 text-center">
        <button type="button" onClick={onVerder} className="btn-primary">
          {isGat ? "Laat zien waar het zou kunnen zitten →" : "Laat zien hoe je je verhoudt →"}
        </button>
      </div>
    </div>
  );
}
