"use client";

import { useState } from "react";
import PrimaireCta, { PrimaireCtaSub, AnalyseUitwijk } from "@/components/PrimaireCta";
import { Bedragveld, Tegel, RekenKader, DONKER, ZACHT, type Bedrag } from "./Rekenveld";

/**
 * Wat kost jouw december? (20-nov-2026, herschrijving wat-kost-december-feestdagen-gezin)
 * De bezoeker vult per post in wat december vorig jaar kostte en ziet het
 * totaal en wat dat per maand vraagt als je het over het jaar uitsmeert.
 * Geen startwaarden: de oude pagina rekende met een landelijk bedrag zonder
 * controleerbare bron, en dat komt hier niet terug. Opstap: geen Geldscan-link.
 */

const POSTEN = [
  { id: "sint", label: "Sinterklaas en surprises" },
  { id: "kerst", label: "Kerstcadeaus" },
  { id: "eten", label: "Extra boodschappen en diners" },
  { id: "overig", label: "Uitjes, oud en nieuw, versiering" },
] as const;

type PostId = (typeof POSTEN)[number]["id"];

export default function DecemberTeller() {
  const [w, setW] = useState<Record<PostId, Bedrag>>({ sint: null, kerst: null, eten: null, overig: null });
  const ingevuld = POSTEN.some((p) => w[p.id] !== null);
  const totaal = POSTEN.reduce((som, p) => som + (w[p.id] ?? 0), 0);
  const perMaand = Math.ceil(totaal / 12);

  return (
    <RekenKader
      titel="Wat kostte jouw december?"
      uitleg="Vul per post in wat het vorig jaar kostte. Weet je het niet, kijk dan in je bankapp of afschrift naar december vorig jaar."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {POSTEN.map((p) => (
          <Bedragveld
            key={p.id}
            id={`december-${p.id}`}
            label={p.label}
            waarde={w[p.id]}
            placeholder="bijv. 200"
            onChange={(waarde) => setW((oud) => ({ ...oud, [p.id]: waarde }))}
          />
        ))}
      </div>
      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }} aria-live="polite">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Tegel label="December samen" bedrag={ingevuld ? totaal : null} />
          <Tegel label="Per maand opzij" bedrag={ingevuld ? perMaand : null} nadruk />
        </div>
        <p className="font-body text-sm mb-2" style={{ color: DONKER, lineHeight: 1.6 }}>
          {ingevuld
            ? "Zet dit bedrag elke maand automatisch apart op een eigen rekening, en betaal december alleen daarvan. Dan komt december niet uit het salaris dat ook januari moet dragen."
            : "Vul een of meer posten in om te zien wat december per maand vraagt."}
        </p>
        <p className="font-body text-xs mb-4" style={{ color: ZACHT, lineHeight: 1.6 }}>
          Dit is een indicatie op basis van jouw invoer. Wat december echt kostte, staat in je afschrift van vorig jaar.
        </p>
        <div className="flex flex-col gap-2">
          <PrimaireCta locatie="december-teller" className="btn-primary text-center" />
          <PrimaireCtaSub />
          <AnalyseUitwijk locatie="december-teller" />
        </div>
      </div>
    </RekenKader>
  );
}
