"use client";

import { useState } from "react";
import PrimaireCta, { PrimaireCtaSub, AnalyseUitwijk } from "@/components/PrimaireCta";
import { Bedragveld, RekenKader, DONKER, ZACHT, GRIJS, euroKort, type Bedrag } from "./Rekenveld";
import {
  DECEMBER_JAAR,
  JANUARI_JAAR,
  GEWONE_DECEMBERMAAND_DAGEN,
  datum,
  datumTekst,
  dagenTussen,
  extraDagen,
  wekenTekst,
  dagenTekst,
  dagelijksTotVolgende,
} from "@/lib/decembersalaris";

/**
 * Situatiekiezer voor de lange januari (20-nov-2026). De bezoeker kiest op
 * welke dag zijn decembersalaris en zijn januarisalaris binnenkomen, en ziet
 * hoeveel dagen hij met het decembersalaris moet doen. Vult hij in wat er per
 * week aan dagelijkse uitgaven opgaat, dan ziet hij welk bedrag hij bij
 * binnenkomst van het decembersalaris apart moet houden.
 *
 * Opstap, geen begroting: geen oordeel, geen Geldscan-link. Daaronder de
 * primaire knop (uitgavenscan) en de analyse als uitwijk (CLAUDE.md sectie 5).
 * Het weekbedrag heeft geen startwaarde: elk bedrag dat hier zou staan, zou
 * een verzonnen gemiddelde zijn.
 */

const DAGEN = Array.from({ length: 17 }, (_, i) => i + 15); // 15 tot en met 31

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

function Dagkeuze({
  id,
  label,
  jaar,
  maand,
  waarde,
  onChange,
}: {
  id: string;
  label: string;
  jaar: number;
  maand: number;
  waarde: number;
  onChange: (dag: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-body text-xs mb-1" style={{ color: GRIJS }}>
        {label}
      </label>
      <select
        id={id}
        value={waarde}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="font-body"
        style={SELECT}
      >
        {DAGEN.map((dag) => (
          <option key={dag} value={dag}>
            {datumTekst(datum(jaar, maand, dag))}
          </option>
        ))}
      </select>
    </div>
  );
}

function Uitkomst({ label, waarde, nadruk }: { label: string; waarde: string; nadruk?: boolean }) {
  return (
    <div className="rounded-lg p-3" style={{ backgroundColor: nadruk ? "#FDF1EC" : "#F2F7F5" }}>
      <p className="font-body text-xs mb-1" style={{ color: GRIJS }}>
        {label}
      </p>
      <p
        className="font-body tabular-nums"
        style={{ color: nadruk ? "#C4603A" : DONKER, fontWeight: 500, fontSize: "1.15rem", margin: 0 }}
      >
        {waarde}
      </p>
    </div>
  );
}

export default function DecembersalarisKiezer() {
  const [decemberDag, setDecemberDag] = useState<number>(21);
  const [januariDag, setJanuariDag] = useState<number>(25);
  const [weekbedrag, setWeekbedrag] = useState<Bedrag>(null);

  const dagen = dagenTussen(datum(DECEMBER_JAAR, 12, decemberDag), datum(JANUARI_JAAR, 1, januariDag));
  const extra = extraDagen(dagen);
  const nodig = weekbedrag !== null && weekbedrag > 0 ? dagelijksTotVolgende(weekbedrag, dagen) : null;

  return (
    <RekenKader
      titel="Hoe lang moet jouw decembersalaris mee?"
      uitleg="Kies de dag waarop je decembersalaris binnenkomt en de dag van je januarisalaris. Staat de datum nog niet vast, kies dan je gewone betaaldag."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <Dagkeuze
          id="decembersalaris-dag"
          label={`Decembersalaris op (${DECEMBER_JAAR})`}
          jaar={DECEMBER_JAAR}
          maand={12}
          waarde={decemberDag}
          onChange={setDecemberDag}
        />
        <Dagkeuze
          id="januarisalaris-dag"
          label={`Januarisalaris op (${JANUARI_JAAR})`}
          jaar={JANUARI_JAAR}
          maand={1}
          waarde={januariDag}
          onChange={setJanuariDag}
        />
      </div>
      <div className="mb-4">
        <Bedragveld
          id="decembersalaris-weekbedrag"
          label="Wat gaat er per week op aan boodschappen en dagelijkse uitgaven? (mag leeg)"
          waarde={weekbedrag}
          placeholder="bijv. 250"
          onChange={setWeekbedrag}
        />
      </div>
      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }} aria-live="polite">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Uitkomst label="Dagen tot je januarisalaris" waarde={`${dagen} dagen`} />
          <Uitkomst label="Langer dan een gewone maand" waarde={extra > 0 ? dagenTekst(extra) : "niet langer"} nadruk={extra > 0} />
        </div>
        {nodig !== null && (
          <div className="mb-3">
            <Uitkomst label="Houd apart voor dagelijkse uitgaven tot januari" waarde={euroKort(nodig)} nadruk />
          </div>
        )}
        <p className="font-body text-sm mb-2" style={{ color: DONKER, lineHeight: 1.6 }}>
          {extra > 0
            ? `Je doet ${wekenTekst(dagen)} weken met één salaris. Van de ${decemberDag}e december tot de ${decemberDag}e januari is ${GEWONE_DECEMBERMAAND_DAGEN} dagen; jij hebt er ${extra === 1 ? "1 dag" : `${extra} dagen`} meer.`
            : `Je doet ${wekenTekst(dagen)} weken met één salaris, niet langer dan een gewone maand. Krap wordt januari dan alleen als december van dit salaris betaald wordt.`}
          {nodig !== null
            ? ` Zet ${euroKort(nodig)} apart zodra het decembersalaris binnen is, en betaal december van wat er overblijft.`
            : ""}
        </p>
        <p className="font-body text-xs mb-4" style={{ color: ZACHT, lineHeight: 1.6 }}>
          Dit is een indicatie op basis van jouw invoer. Of het past, hangt af van wat er in december en januari verder van
          je rekening gaat. Dat zie je in je eigen afschrift van vorig jaar.
        </p>
        <div className="flex flex-col gap-2">
          <PrimaireCta locatie="decembersalaris-kiezer" className="btn-primary text-center" />
          <PrimaireCtaSub />
          <AnalyseUitwijk locatie="decembersalaris-kiezer" />
        </div>
      </div>
    </RekenKader>
  );
}
