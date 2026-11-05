"use client";

import { useEffect, useRef } from "react";
import CtaLink from "@/components/CtaLink";
import { logGebeurtenis } from "@/lib/track";
import EenTikVraag from "./EenTikVraag";
import { BEZWAAR_OPTIES } from "./inzichtVragen";
import { QuizData } from "@/lib/quiz-types";
import { geldscanHref } from "@/lib/cta";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import BewaarUitkomst from "./BewaarUitkomst";
import ToestemmingDataAsset from "./ToestemmingDataAsset";

// 5-nov-2026: de belofte is wat de vijf klanten kregen, een nagekeken maand
// met een structuur en bedragen (docs/plan-positionering-aanbod-05-nov-2026.md).
const PUNTEN = [
  "Nagekeken: wat opvalt, wat ontbreekt en wat juist niet uit de toon valt",
  "Je potjes uitgerekend: welke rekening waarvoor, met jouw bedragen",
  "Hoeveel er per maand naar jaarkosten, buffer en sparen gaat",
  "Eén keer. Daarna doe je het zelf, geen traject",
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
  // Aanbod in beeld (30-okt-2026), zelfde gebeurtenis als op stap 1 en de
  // vraagstap, zodat de admin per plek telt.
  const gelogd = useRef(false);
  useEffect(() => {
    if (gelogd.current) return;
    gelogd.current = true;
    logGebeurtenis("analyse_aanbod_gezien", { pakket: "geldscan", meta: { plek: "stap4" } });
  }, []);

  return (
    <div>
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-1 leading-snug">
        Je weet nu ongeveer waar het verschil zit.
      </h2>
      <p className="font-display font-light text-primary/70 text-xl sm:text-2xl mb-6 leading-snug">
        De volgende stap is je geld zo over je potjes verdelen dat het niet meer schuift.
      </p>

      <div className="rounded-xl border-[1.5px] border-accent/25 bg-green-light p-6 sm:p-8">
        <p className="text-text-soft font-body font-light text-sm mb-1 leading-relaxed">
          Bij de Geldscan kijk ik je cijfers zelf na en reken ik uit hoeveel er
          waarheen moet. Heb je een eigen overzicht, Excel of bankapp, dan stuur je dat in.
        </p>
        <p className="text-text-soft font-body font-light text-sm mb-5 leading-relaxed">
          Je krijgt een rapport dat ik zelf schrijf, binnen 2 werkdagen.
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
          Laat mij het nakijken en uitrekenen, €49 →
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

      <div className="mt-6">
        <EenTikVraag
          vraag="Nog niet? Wat houdt je tegen?"
          opties={BEZWAAR_OPTIES}
          gebeurtenis="analyse_aanbod_bezwaar"
          meta={{ gevoel: data.maandGevoel }}
          dankTekst="Dank je. Dat neem ik mee."
        />
      </div>

      <ToestemmingDataAsset />

      <BewaarUitkomst data={data} onChange={onChange} resultaat={resultaat} />
    </div>
  );
}
