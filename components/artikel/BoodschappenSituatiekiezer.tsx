"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Situatiekiezer direct onder het korte antwoord.
 *
 * Reden (30-jul-2026): vijf echte ICP's en vier persona-toetsen zeggen hetzelfde.
 * Het artikel beantwoordt de vraag waarmee ze binnenkomen, en juist daardoor komt
 * hun eigenlijke vraag boven: als dit normaal is, waar blijft het dan? Dat moment
 * is tien seconden na het antwoord en daar stond alleen een kleine grijze regel.
 *
 * Elke ICP formuleerde zijn eigen vervolgvraag en die verschillen wezenlijk, dus
 * één algemene zin werkt niet. Vandaar een keuze in plaats van een regel. De
 * route verschilt ook: bij wisselend inkomen kan de gratis analyse de vraag niet
 * beantwoorden (die rekent met een gemiddelde en kent geen belastingpot), dus die
 * ingang wijst naar het rapport en niet naar de analyse.
 * Zie docs/persona-toets-boodschappenartikel-30-jul-2026.md.
 */

interface Situatie {
  chip: string;
  bedrag: string;
  /** De vervolgvraag, in de woorden van de ICP zelf. */
  vraag: string;
  toelichting: string;
  actieTekst: string;
  actieHref: string;
  /** Zachte tweede route, mag leeg blijven. */
  tweedeTekst?: string;
  tweedeHref?: string;
}

const SITUATIES: Situatie[] = [
  {
    chip: "Ik woon alleen",
    bedrag: "€300 tot €400",
    vraag: "En als 100 euro besparen je vraag niet oplost?",
    toelichting:
      "Zit je op 450 of 500, dan is dat iets hoger dan gebruikelijk. Maar 100 euro per maand verklaart niet waarom je spaargeld nauwelijks groeit, en daar kwam je eigenlijk voor. Bij iemand alleen zit het bijna altijd in de vaste basis: je draagt huur, energie en verzekeringen met één inkomen, terwijl die niet de helft kosten omdat je alleen woont.",
    actieTekst: "Zie wat er bij een alleenstaande uitkwam",
    actieHref: "/rapporten/alleenstaand-huurwoning",
    tweedeTekst: "Of vergelijk je hele maand, gratis",
    tweedeHref: "/analyse",
  },
  {
    chip: "Samen, geen kinderen",
    bedrag: "€550 tot €700",
    vraag: "Dan ligt het dus niet aan de boodschappen. Waarom lukt sparen dan niet?",
    toelichting:
      "Twee inkomens en geen kinderen, dus op papier zou er veel over moeten blijven. Als dat niet gebeurt, is de uitkomst vaak dat er niets misgaat en dat de levensstijl gewoon niet past bij wat je tegelijk wilt sparen. Dat is een andere conclusie dan een lek, en het vraagt een andere oplossing.",
    actieTekst: "Zie wat er bij een stel zonder kinderen uitkwam",
    actieHref: "/rapporten/stel-zonder-kinderen",
    tweedeTekst: "Of vergelijk je hele maand, gratis",
    tweedeHref: "/analyse",
  },
  {
    chip: "Gezin met kinderen",
    bedrag: "€700 tot €1.400",
    vraag: "Je boodschappen zijn normaal. Hoeveel zou er dan eigenlijk moeten overblijven?",
    toelichting:
      "Dat is de vraag die overblijft, en die kun je niet uit een boodschappenbedrag halen. Bij een gezin met opgroeiende kinderen zit het meestal niet in één post, maar in de voorspelbare jaaruitgaven waar niemand voor reserveert: vakantie, onderhoud, december. Die staan in geen enkele maandbegroting en komen wel elk jaar.",
    actieTekst: "Zie wat er bij een gezin met drie kinderen uitkwam",
    actieHref: "/rapporten/tweeverdieners-drie-kinderen",
    tweedeTekst: "Of vergelijk je hele maand, gratis",
    tweedeHref: "/analyse",
  },
  {
    chip: "Alleenstaande ouder",
    bedrag: "€650 tot €850",
    vraag: "Waarom voelt een goed salaris dan alsnog krap?",
    toelichting:
      "Omdat je met één inkomen draagt wat op twee is gebouwd, en omdat er niemand is die een kapotte cv-ketel opvangt. Dat is meestal geen uitgavenprobleem. Twee dingen ga ik daarbij niet zeggen: dat je goedkoper moet wonen, en dat er minder naar je kinderen moet. Die twee had je zelf al honderd keer afgewogen.",
    actieTekst: "Zie wat er bij een alleenstaande ouder uitkwam",
    actieHref: "/rapporten/alleenstaande-ouder-twee-kinderen",
    tweedeTekst: "Of vergelijk je hele maand, gratis",
    tweedeHref: "/analyse",
  },
  {
    chip: "Wisselend inkomen of zzp",
    bedrag: "hangt van je maand af",
    vraag: "Klopt je totale maand wel met wat er daadwerkelijk binnenkomt?",
    toelichting:
      "Bij een wisselend inkomen is het bedrag zelden het probleem, maar het ritme. Een maand van 8.000 en een maand van 2.400 middelen elkaar op papier uit, maar niet in je gedrag. Let op: de gratis analyse rekent met een gemiddelde en weet niets van je belastingpot, dus die kan deze vraag niet beantwoorden. Een rapport wel, omdat je daar je laagste en hoogste maand opschrijft.",
    actieTekst: "Zie wat er bij een zzp'er met wisselend inkomen uitkwam",
    actieHref: "/rapporten/zzp-wisselend-inkomen",
  },
];

export default function BoodschappenSituatiekiezer() {
  const [actief, setActief] = useState<number | null>(null);
  const s = actief === null ? null : SITUATIES[actief];

  return (
    <div className="my-6">
      <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
        Zit je binnen die bedragen en houd je toch niets over?
      </p>
      <p className="font-body text-sm mb-3" style={{ color: "#4A5A56", fontWeight: 300 }}>
        Dan zit het niet in je boodschappen. Kies je situatie, dan zeg ik waar het bij jouw
        huishouden meestal wel zit.
      </p>

      {/* Mobiel: horizontaal scrollend en randloos aflopend, zodat zichtbaar is dat er meer staat.
          Desktop: alles op één rij binnen de tekstkolom van 720px. */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
        {SITUATIES.map((sit, i) => (
          <button
            key={sit.chip}
            type="button"
            onClick={() => setActief(actief === i ? null : i)}
            aria-pressed={actief === i}
            className="shrink-0 whitespace-nowrap rounded-full font-body text-sm transition-colors"
            style={{
              padding: "0.45rem 0.9rem",
              backgroundColor: actief === i ? "#16211F" : "#FFFFFF",
              color: actief === i ? "#FFFFFF" : "#4A5A56",
              border: `1px solid ${actief === i ? "#16211F" : "#E6E9E7"}`,
            }}
          >
            {sit.chip}
          </button>
        ))}
      </div>

      {s && (
        <div
          className="rounded-xl p-5 mt-3"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7", borderLeft: "3px solid #0B7A6E" }}
        >
          <p className="font-body text-xs mb-2" style={{ color: "#8B958F" }}>
            Normaal voor jouw situatie: {s.bedrag}
          </p>
          <p className="font-body font-medium mb-2" style={{ color: "#16211F", fontSize: "1.02rem", lineHeight: 1.5 }}>
            {s.vraag}
          </p>
          <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
            {s.toelichting}
          </p>
          <Link
            href={s.actieHref}
            className="font-body font-medium text-sm hover:underline"
            style={{ color: "#0B7A6E", textDecoration: "none" }}
          >
            {s.actieTekst} &rarr;
          </Link>
          {s.tweedeTekst && s.tweedeHref && (
            <p className="mt-2 mb-0">
              <Link
                href={s.tweedeHref}
                className="font-body text-sm hover:underline"
                style={{ color: "#8B958F", textDecoration: "none" }}
              >
                {s.tweedeTekst} &rarr;
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
