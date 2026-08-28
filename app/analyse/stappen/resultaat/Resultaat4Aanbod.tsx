import CtaLink from "@/components/CtaLink";
import { QuizData } from "@/lib/quiz-types";
import BewaarUitkomst from "./BewaarUitkomst";
import type { Brug } from "./types";

export type BrugVariant = "afwijking" | "tekort" | "niets";

const KOP: Record<BrugVariant, { kop: string; sub: string }> = {
  afwijking: {
    kop: "Je weet nu waar het verschil zit.",
    sub: "De volgende vraag is waarom.",
  },
  tekort: {
    kop: "Je weet nu dat de bedragen kloppen.",
    sub: "De volgende vraag is waar de krapte dan vandaan komt.",
  },
  niets: {
    kop: "Op deze cijfers viel er niets uit de toon.",
    sub: "Zeker weten dat je niets mist? Dat bekijk ik graag met je mee.",
  },
};

const PUNTEN = [
  "Persoonlijke analyse van jullie situatie",
  "Inzicht in wat echt opvalt en waarom",
  "Welke verschillen bewust zijn en welke aandacht verdienen",
  "Concrete punten die ik als eerste zou onderzoeken",
];

interface Props {
  variant: BrugVariant;
  brug: Brug;
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
  resultaat: Record<string, unknown>;
}

/**
 * Uitkomst 4 van 4: het aanbod. De Geldscan-CTA is de enige visueel dominante
 * actie. De letterlijke knoptekst "Laat mij uitzoeken waar het verschil zit"
 * (spec) klopt alleen als er ook echt een post boven de benchmark zit; in de
 * twee andere gevallen (tekort zonder aanwijsbare post, of niets bijzonders)
 * gebruiken we brug.cta, dat al op die uitkomst is afgestemd en niet iets
 * claimt dat er niet is (harde waarheidsregel 5).
 */
export default function Resultaat4Aanbod({
  variant,
  brug,
  data,
  onChange,
  resultaat,
}: Props) {
  const { kop, sub } = KOP[variant];
  const ctaTekst =
    variant === "afwijking" ? "Laat mij uitzoeken waar het verschil zit →" : brug.cta;

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-1 leading-snug">
        {kop}
      </h2>
      <p className="font-display font-light text-primary/70 text-xl sm:text-2xl mb-6 leading-snug">
        {sub}
      </p>

      <div className="rounded-xl border-[1.5px] border-accent/25 bg-green-light p-6 sm:p-8">
        <p className="text-text-soft font-body font-light text-sm mb-5 leading-relaxed">
          {brug.slot}
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
          href="/aanbod/intake?pakket=geldscan"
          locatie="analyse-resultaat"
          className="btn-primary w-full sm:w-auto text-base"
        >
          {ctaTekst}
        </CtaLink>
        <p className="font-body text-text-muted text-xs mt-3">
          Binnen 2 werkdagen persoonlijk geschreven.
        </p>
      </div>

      <BewaarUitkomst data={data} onChange={onChange} resultaat={resultaat} />
    </div>
  );
}
