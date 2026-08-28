import CtaLink from "@/components/CtaLink";
import { QuizData } from "@/lib/quiz-types";
import BewaarUitkomst from "./BewaarUitkomst";

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
 * Zelfde situatiesleutel als lib/cta.ts (SituatieSleutel) en app/geldscan/page.tsx.
 * Alleen de ondubbelzinnige gevallen: bij kinderen weet de analyse niet of ze
 * jong of ouder zijn, dus "gezin" blijft hier bewust ongebruikt op de
 * intake-pagina (die vraagt dat apart).
 */
function situatieSleutelVoorIntake(data: QuizData): string | null {
  if (data.volwassenen === 1 && data.kinderen === 0) return "alleenstaand";
  if (data.volwassenen === 1 && (data.kinderen ?? 0) > 0) return "alleenstaande-ouder";
  if (data.volwassenen === 2 && data.kinderen === 0) return "stel";
  return null;
}

/**
 * De intake vraagt hetzelfde als de analyse al beantwoord heeft: huishouden,
 * inkomen en of dat wisselt. Deze link geeft dat door, zodat niemand het op
 * het intakeformulier moet overtypen. Zie app/aanbod/intake/page.tsx voor de
 * kant die deze parameters weer inleest.
 */
function intakeHrefMetPrefill(data: QuizData, resultaat: Record<string, unknown>): string {
  const params = new URLSearchParams({ pakket: "geldscan" });
  const situatieSleutel = situatieSleutelVoorIntake(data);
  if (situatieSleutel) params.set("situatie", situatieSleutel);
  const inkomen = resultaat.totaal_inkomen_berekend;
  if (typeof inkomen === "number" && inkomen > 0) {
    params.set("inkomen", String(Math.round(inkomen)));
  }
  if (data.inkomenWisselend) params.set("inkomenWisselt", "1");
  return `/aanbod/intake?${params.toString()}`;
}

/**
 * Uitkomst 4 van 4: het aanbod. De gratis vergelijking liet al zien WAAR het
 * verschil zit, dus de CTA belooft geen herhaling daarvan. De Geldscan
 * onderzoekt WAAROM, en dat is precies wat hier staat.
 */
export default function Resultaat4Aanbod({ data, onChange, resultaat }: Props) {
  const intakeHref = intakeHrefMetPrefill(data, resultaat);
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

        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-display font-light text-primary text-2xl">€49</span>
          <span className="font-body text-sm text-text-muted">eenmalig</span>
        </div>
        <p className="font-body text-text-muted text-xs mb-6">
          Persoonlijk bekeken &middot; geen abonnement &middot; geen verkoopgesprek
        </p>

        <CtaLink
          doel="geldscan"
          href={intakeHref}
          locatie="analyse-resultaat"
          className="btn-primary w-full sm:w-auto text-base"
        >
          Laat mij onderzoeken wat hierachter zit →
        </CtaLink>
        <p className="font-body text-text-muted text-xs mt-3">
          Binnen 2 werkdagen persoonlijk geschreven.
        </p>
      </div>

      <BewaarUitkomst data={data} onChange={onChange} resultaat={resultaat} />
    </div>
  );
}
