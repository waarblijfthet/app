"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref, PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import { Bedragveld, Tegel, RekenKader, DONKER, ZACHT, type Bedrag } from "./Rekenveld";

/**
 * Jaaruitgaven per maand (12-okt-2026). De bezoeker vult per jaar in wat
 * vakantie, feestdagen, huis, auto en de rest kosten, en ziet wat dat per
 * maand is. Elk van de vijf rapporten op /rapporten heeft zo'n post, van
 * 500 tot 967 euro per maand (lib/icp-bronnen.ts, jaarkostenPerRapport).
 *
 * Opstap, geen begroting: geen oordeel, geen Geldscan-link, alleen de
 * analyse als vervolgstap (CLAUDE.md sectie 5). Geen startwaarden, want elk
 * bedrag dat hier zou staan zou een verzonnen gemiddelde zijn.
 */

const POSTEN = [
  { id: "vakantie", label: "Vakanties en weekendjes weg", placeholder: "bijv. 3000" },
  { id: "feest", label: "Feestdagen en verjaardagen", placeholder: "bijv. 1000" },
  { id: "huis", label: "Huis, tuin en vervanging", placeholder: "bijv. 1500" },
  { id: "auto", label: "Auto: onderhoud, banden, APK", placeholder: "bijv. 900" },
  { id: "overig", label: "Overig: tandarts, eigen risico, kleding", placeholder: "bijv. 800" },
] as const;

type PostId = (typeof POSTEN)[number]["id"];

export default function JaarkostenTeller({ situatie }: { situatie?: "gezin" | "alleenstaand" | "stel" }) {
  const [waarden, setWaarden] = useState<Record<PostId, Bedrag>>({
    vakantie: null,
    feest: null,
    huis: null,
    auto: null,
    overig: null,
  });
  const totaal = POSTEN.reduce((som, p) => som + (waarden[p.id] ?? 0), 0);
  const ingevuld = POSTEN.some((p) => waarden[p.id] !== null);
  const perMaand = Math.round(totaal / 12);
  const href = analyseHref({ situatie: situatie });

  return (
    <RekenKader
      titel="Wat kosten jouw jaaruitgaven per maand?"
      uitleg="Vul per post in wat het je per jaar kost. Een schatting is goed genoeg; kijk bij twijfel in je bankapp naar dezelfde maand vorig jaar."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {POSTEN.map((p) => (
          <Bedragveld
            key={p.id}
            id={`jaarkosten-${p.id}`}
            label={`${p.label}, per jaar`}
            waarde={waarden[p.id]}
            placeholder={p.placeholder}
            onChange={(w) => setWaarden((oud) => ({ ...oud, [p.id]: w }))}
          />
        ))}
      </div>
      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }} aria-live="polite">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Tegel label="Per jaar" bedrag={ingevuld ? totaal : null} />
          <Tegel label="Per maand opzij" bedrag={ingevuld ? perMaand : null} nadruk />
        </div>
        <p className="font-body text-sm mb-2" style={{ color: DONKER, lineHeight: 1.6 }}>
          {ingevuld
            ? `Zet je dit niet elke maand apart, dan valt dit bedrag een paar keer per jaar in één keer weg. Dat voelt als een tegenvaller, maar het is een vaste uitgave die alleen niet maandelijks binnenkomt.`
            : "Vul een of meer posten in om te zien wat ze per maand vragen."}
        </p>
        <p className="font-body text-xs mb-3" style={{ color: ZACHT, lineHeight: 1.6 }}>
          Dit is een indicatie op basis van jouw invoer. Of dit bedrag in je maand past, hangt af van waar je geld nu al
          naartoe gaat.
        </p>
        <CtaLink doel="analyse" href={href} locatie="rekenaar" className="btn-primary text-center">
          {PRIMAIRE_CTA_LABEL} &rarr;
        </CtaLink>
      </div>
    </RekenKader>
  );
}
