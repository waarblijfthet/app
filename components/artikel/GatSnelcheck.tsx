"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref, PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import { Bedragveld, Tegel, RekenKader, DONKER, ZACHT, type Bedrag } from "./Rekenveld";

/**
 * Snelcheck op het gat (12-okt-2026): wat er op papier overblijft tegenover
 * wat er echt overblijft. Vier velden, dezelfde rekensom als de uitkomst van
 * de analyse maar zonder uitsplitsing per post. Precies daarom is de analyse
 * de vervolgstap: die laat zien in welke posten het verschil kan zitten.
 *
 * Opstap, geen begroting en geen oordeel. Geen Geldscan-link (CLAUDE.md 5).
 */

const DREMPEL = 200;

export default function GatSnelcheck({ situatie }: { situatie?: "gezin" | "alleenstaand" | "stel" }) {
  const [inkomen, setInkomen] = useState<Bedrag>(null);
  const [vast, setVast] = useState<Bedrag>(null);
  const [overig, setOverig] = useState<Bedrag>(null);
  const [echt, setEcht] = useState<Bedrag>(null);

  const compleet = inkomen !== null && vast !== null && overig !== null && echt !== null;
  const papier = compleet ? (inkomen ?? 0) - (vast ?? 0) - (overig ?? 0) : null;
  const gat = compleet && papier !== null ? papier - (echt ?? 0) : null;
  const href = analyseHref({ situatie: situatie });

  let zin = "Vul de vier bedragen in. Ronde getallen zijn prima.";
  if (gat !== null && papier !== null) {
    if (gat >= DREMPEL) {
      zin = `Op papier blijft er ${new Intl.NumberFormat("nl-NL").format(papier)} euro over, maar je merkt er ${new Intl.NumberFormat("nl-NL").format(echt ?? 0)}. Ongeveer ${new Intl.NumberFormat("nl-NL").format(gat)} euro per maand kun je niet aanwijzen.`;
    } else if (gat > -DREMPEL) {
      zin = "Wat je schat en wat er overblijft liggen dicht bij elkaar. Dan heb je je uitgaven goed in beeld.";
    } else {
      zin = "Er blijft meer over dan je schatting doet vermoeden. Waarschijnlijk schatte je een paar uitgaven wat te hoog.";
    }
  }

  return (
    <RekenKader
      titel="Hoeveel kun je niet aanwijzen?"
      uitleg="Vier getallen per maand. Het verschil tussen wat er op papier overblijft en wat er echt overblijft is het geld waarvan je niet weet waar het heen gaat."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <Bedragveld id="gat-inkomen" label="Netto inkomen per maand, samen" waarde={inkomen} placeholder="bijv. 6000" onChange={setInkomen} />
        <Bedragveld id="gat-vast" label="Vaste lasten per maand (wonen, energie, verzekeringen, abonnementen)" waarde={vast} placeholder="bijv. 2800" onChange={setVast} />
        <Bedragveld id="gat-overig" label="Wat je denkt dat je verder uitgeeft (boodschappen, auto, vrije tijd)" waarde={overig} placeholder="bijv. 1800" onChange={setOverig} />
        <Bedragveld id="gat-echt" label="Wat er echt overblijft of opzij gaat per maand" waarde={echt} placeholder="bijv. 300" onChange={setEcht} />
      </div>
      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }} aria-live="polite">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <Tegel label="Op papier" bedrag={papier} />
          <Tegel label="Echt over" bedrag={compleet ? echt : null} />
          <Tegel label="Niet aan te wijzen" bedrag={gat !== null && gat > 0 ? gat : compleet ? 0 : null} nadruk />
        </div>
        <p className="font-body text-sm mb-2" style={{ color: DONKER, lineHeight: 1.6 }}>
          {zin}
        </p>
        <p className="font-body text-xs mb-3" style={{ color: ZACHT, lineHeight: 1.6 }}>
          Dit is een indicatie op basis van jouw invoer. De gratis analyse doet hetzelfde per post en zet elke post naast
          vergelijkbare huishoudens, zodat je ziet waar het verschil kan zitten.
        </p>
        <CtaLink doel="analyse" href={href} locatie="rekenaar" className="btn-primary text-center">
          {PRIMAIRE_CTA_LABEL} &rarr;
        </CtaLink>
      </div>
    </RekenKader>
  );
}
