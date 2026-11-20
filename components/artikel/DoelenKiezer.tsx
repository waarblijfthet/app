"use client";

import { useState } from "react";
import PrimaireCta, { PrimaireCtaSub, AnalyseUitwijk } from "@/components/PrimaireCta";
import { Bedragveld, RekenKader, DONKER, ZACHT, GRIJS, euroKort, type Bedrag } from "./Rekenveld";
import { perMaandVoorDoel } from "@/lib/jaarwisseling-bronnen";

/**
 * Passen je doelen samen in je maand? (20-nov-2026, financiele-doelen-stellen-2027)
 *
 * De bezoeker vult tot drie doelen in met een bedrag en een termijn, en ziet
 * wat ze samen per maand vragen. Vult hij in wat er de afgelopen maanden echt
 * overbleef, dan ziet hij of het past en hoeveel er ontbreekt. Geen
 * startbedragen: elk bedrag hier zou verzonnen zijn. Opstap, geen plan: geen
 * Geldscan-link, daaronder de uitgavenscan met de analyse als uitwijk.
 */

const TERMIJNEN = [3, 6, 9, 12, 18, 24, 36];

const SELECT: React.CSSProperties = {
  width: "100%",
  minHeight: "48px",
  padding: "0.6rem 0.75rem",
  borderRadius: "10px",
  border: "1px solid #D6E5E0",
  backgroundColor: "#FFFFFF",
  fontSize: "1rem",
  color: DONKER,
  fontFamily: "inherit",
};

interface Doel {
  bedrag: Bedrag;
  maanden: number;
}

const VOORBEELDEN = ["bijv. buffer", "bijv. vakantie", "bijv. aflossen"];

export default function DoelenKiezer() {
  const [doelen, setDoelen] = useState<Doel[]>([
    { bedrag: null, maanden: 12 },
    { bedrag: null, maanden: 12 },
    { bedrag: null, maanden: 12 },
  ]);
  const [over, setOver] = useState<Bedrag>(null);

  const perDoel = doelen.map((d) => (d.bedrag !== null && d.bedrag > 0 ? perMaandVoorDoel(d.bedrag, d.maanden) : null));
  const ingevuld = perDoel.some((x) => x !== null);
  const totaal = perDoel.reduce<number>((som, x) => som + (x ?? 0), 0);
  const verschil = over !== null && ingevuld ? over - totaal : null;

  function zet(i: number, nieuw: Partial<Doel>) {
    setDoelen((oud) => oud.map((d, j) => (j === i ? { bedrag: nieuw.bedrag !== undefined ? nieuw.bedrag : d.bedrag, maanden: nieuw.maanden !== undefined ? nieuw.maanden : d.maanden } : d)));
  }

  return (
    <RekenKader
      titel="Passen je doelen samen in je maand?"
      uitleg="Vul tot drie doelen in: het bedrag dat je wilt hebben en binnen hoeveel maanden. Daarna wat er de afgelopen maanden echt overbleef."
    >
      <div className="flex flex-col gap-3 mb-4">
        {doelen.map((d, i) => (
          <div key={i} className="grid grid-cols-2 gap-3">
            <Bedragveld
              id={`doel-bedrag-${i}`}
              label={`Doel ${i + 1}, bedrag (${VOORBEELDEN[i]})`}
              waarde={d.bedrag}
              placeholder="bijv. 3000"
              onChange={(w) => zet(i, { bedrag: w })}
            />
            <div>
              <label htmlFor={`doel-maanden-${i}`} className="block font-body text-xs mb-1" style={{ color: GRIJS }}>
                Binnen
              </label>
              <select
                id={`doel-maanden-${i}`}
                value={d.maanden}
                onChange={(e) => zet(i, { maanden: parseInt(e.target.value, 10) })}
                className="font-body"
                style={SELECT}
              >
                {TERMIJNEN.map((m) => (
                  <option key={m} value={m}>
                    {m} maanden
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <Bedragveld
          id="doel-over"
          label="Wat bleef er de afgelopen maanden echt over, per maand? (mag leeg)"
          waarde={over}
          placeholder="bijv. 400"
          onChange={setOver}
        />
      </div>
      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }} aria-live="polite">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-lg p-3" style={{ backgroundColor: "#F2F7F5" }}>
            <p className="font-body text-xs mb-1" style={{ color: GRIJS }}>
              Je doelen vragen samen
            </p>
            <p className="font-body tabular-nums" style={{ color: DONKER, fontWeight: 500, fontSize: "1.15rem", margin: 0 }}>
              {ingevuld ? `${euroKort(totaal)} per maand` : "nog niet"}
            </p>
          </div>
          <div className="rounded-lg p-3" style={{ backgroundColor: verschil !== null && verschil < 0 ? "#FDF1EC" : "#F2F7F5" }}>
            <p className="font-body text-xs mb-1" style={{ color: GRIJS }}>
              {verschil !== null && verschil < 0 ? "Tekort per maand" : "Ruimte per maand"}
            </p>
            <p
              className="font-body tabular-nums"
              style={{ color: verschil !== null && verschil < 0 ? "#C4603A" : DONKER, fontWeight: 500, fontSize: "1.15rem", margin: 0 }}
            >
              {verschil === null ? "nog niet" : euroKort(Math.abs(verschil))}
            </p>
          </div>
        </div>
        <p className="font-body text-sm mb-2" style={{ color: DONKER, lineHeight: 1.6 }}>
          {!ingevuld
            ? "Vul een of meer doelen in om te zien wat ze per maand vragen."
            : verschil === null
            ? "Vul in wat er echt overbleef. Weet je dat niet precies, dan is dat de eerste stap, nog voor het eerste doel."
            : verschil < 0
            ? `Je doelen vragen ${euroKort(-verschil)} per maand meer dan er nu overblijft. Kies dan een langere termijn of een doel minder, of zoek eerst waar die ${euroKort(-verschil)} nu heen gaat.`
            : `Je doelen passen in wat er overbleef. Zet de bedragen op je salarisdag automatisch apart, dan blijft dat zo.`}
        </p>
        <p className="font-body text-xs mb-4" style={{ color: ZACHT, lineHeight: 1.6 }}>
          Dit is een indicatie op basis van jouw invoer. Wat er echt overblijft, zie je in je afschrift, niet in je
          begroting.
        </p>
        <div className="flex flex-col gap-2">
          <PrimaireCta locatie="doelen-kiezer" className="btn-primary text-center" />
          <PrimaireCtaSub />
          <AnalyseUitwijk locatie="doelen-kiezer" />
        </div>
      </div>
    </RekenKader>
  );
}
