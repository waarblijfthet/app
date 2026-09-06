import CtaLink from "@/components/CtaLink";
import { QuizData } from "@/lib/quiz-types";
import { geldscanHref } from "@/lib/cta";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import BewaarUitkomst from "./BewaarUitkomst";
import ToestemmingDataAsset from "./ToestemmingDataAsset";

const PUNTEN = [
  "Persoonlijke analyse van jullie situatie",
  "Inzicht in wat echt opvalt en waarom",
  "Welke verschillen logisch of bewust zijn en welke aandacht verdienen",
  "Concrete punten die ik als eerste zou onderzoeken",
];

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
  resultaat: Record<string, unknown>;
}

/**
 * Uitkomst 4 van 4: het aanbod. De gratis vergelijking liet al zien WAAR het
 * verschil zit, dus de CTA belooft geen herhaling daarvan. De Geldscan
 * onderzoekt WAAROM, en dat is precies wat hier staat.
 */
export default function Resultaat4Aanbod({ data, onChange, resultaat }: Props) {
  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-1 leading-snug">
        Je weet nu waar het verschil zit.
      </h2>
      <p className="font-display font-light text-primary/70 text-xl sm:text-2xl mb-6 leading-snug">
        De volgende vraag is waarom.
      </p>

      <div className="rounded-xl border-[1.5px] border-accent/25 bg-green-light p-6 sm:p-8">
        <p className="text-text-soft font-body font-light text-sm mb-1 leading-relaxed">
          Bij de Geldscan bekijk ik jullie situatie persoonlijk en onderzoek ik
          wat er achter de opvallendste verschillen zit.
        </p>
        <p className="text-text-soft font-body font-light text-sm mb-5 leading-relaxed">
          Je ontvangt een persoonlijk geschreven analyse van jullie situatie.
        </p>
        <ul className="space-y-2 mb-6">
          {PUNTEN.map((punt) => (
            <li
              key={punt}
              className="flex items-start gap-2.5 font-body text-sm text-primary"
            >
              <span className="text-accent shrink-0">✓</span>
              {punt}
            </li>
          ))}
        </ul>

        <p className="font-body text-text-muted text-xs mb-5">
          Eenmalig &middot; geen abonnement &middot; geen verkoopgesprek
        </p>

        {/* Eén primaire knop met de prijs erin (plan sectie 6 punt 3). De prijs
            stond eerder als los bedrag boven de knop; wie alleen de knop las,
            klikte zonder te weten wat het kost. */}
        <CtaLink
          doel="geldscan"
          href={geldscanHref()}
          locatie="analyse-resultaat"
          className="btn-primary w-full sm:w-auto text-base"
        >
          Laat mij uitzoeken wat hierachter zit, €49 →
        </CtaLink>
        <p className="font-body text-text-muted text-xs mt-3">
          Binnen 2 werkdagen persoonlijk geschreven.
        </p>

        {/* Bewijsregel uit lib/rapporten-data.ts. Nooit met de hand een aantal
            neerzetten: dit telt de echte rapporten. */}
        <p className="font-body text-text-soft text-sm mt-5 pt-5 border-t border-accent/25">
          Ik schreef er inmiddels {RAPPORTEN.length} uit. Bij {AANTAL_ZONDER_LEK} daarvan bleek er
          geen lek te zitten, en dat schreef ik er ook zo in.
        </p>
      </div>

      <ToestemmingDataAsset />

      <BewaarUitkomst data={data} onChange={onChange} resultaat={resultaat} />
    </div>
  );
}
