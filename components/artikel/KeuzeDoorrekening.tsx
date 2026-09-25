"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref, PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import { euro, euroSigned } from "@/lib/salaris-vuistregel";
import {
  SCENARIOS,
  startWaarden,
  berekenDoorrekening,
  type DoorrekenRij,
  type DoorrekenScenario,
  type DoorrekenWaarden,
  type Invoer,
} from "@/lib/keuze-doorrekening";

/**
 * De kleine doorrekening vóór een keuze (25-sep-2026). Eén component voor vier
 * geldmomenten; wat per moment verschilt staat als configuratie in
 * lib/keuze-doorrekening.ts. Scheiding gebruikt dit niet, die heeft
 * TweeHuishoudensVergelijker.
 *
 * Productgrens: dit is een voorproefje. Een paar veranderende posten, de vrije
 * ruimte nu als eigen schatting, en het verschil. Geen begroting, geen oordeel
 * of iemand het kan betalen, geen Geldscan-link. De enige vervolgstap is de
 * gratis analyse (CLAUDE.md sectie 5). Niets wordt opgeslagen: de invoer leeft
 * alleen in deze pagina.
 */

interface Props {
  keuze: DoorrekenScenario["keuze"];
}

const GROEN = "#0B7A6E";
const DONKER = "#16211F";
const ZACHT = "#4A5A56";
const GRIJS = "#8B958F";
const ROOD = "#B03A2E";

const VELD: React.CSSProperties = {
  width: "100%",
  minHeight: "48px",
  padding: "0.6rem 0.75rem 0.6rem 1.6rem",
  borderRadius: "10px",
  border: "1px solid #D6E5E0",
  backgroundColor: "#FFFFFF",
  fontSize: "1rem",
  color: DONKER,
  fontFamily: "inherit",
  boxSizing: "border-box",
};

/** Alleen cijfers; leeg blijft leeg. */
function leesBedrag(tekst: string): Invoer {
  const schoon = tekst.replace(/[^0-9]/g, "").slice(0, 6);
  return schoon === "" ? null : Number(schoon);
}

function Bedragveld({
  id,
  label,
  waarde,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  waarde: Invoer;
  placeholder?: string;
  onChange: (w: Invoer) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-body text-xs mb-1" style={{ color: GRIJS }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <span
          aria-hidden="true"
          className="font-body"
          style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)", color: GRIJS }}
        >
          €
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={waarde === null ? "" : String(waarde)}
          placeholder={placeholder}
          onChange={(e) => onChange(leesBedrag(e.target.value))}
          className="font-body tabular-nums"
          style={VELD}
        />
      </div>
    </div>
  );
}

function VastBedrag({ label, bedrag, toelichting }: { label: string; bedrag: number; toelichting: string }) {
  return (
    <div>
      <p className="font-body text-xs mb-1" style={{ color: GRIJS }}>
        {label}
      </p>
      <p
        className="font-body tabular-nums"
        style={{
          minHeight: "48px",
          display: "flex",
          alignItems: "center",
          padding: "0 0.75rem",
          borderRadius: "10px",
          backgroundColor: "#F2F7F5",
          color: ZACHT,
          margin: 0,
        }}
      >
        {euro(bedrag)}
        <span className="text-xs" style={{ marginLeft: "0.4rem", color: GRIJS }}>
          {toelichting}
        </span>
      </p>
    </div>
  );
}

function Rij({
  rij,
  keuze,
  waarden,
  zetNu,
  zetNa,
}: {
  rij: DoorrekenRij;
  keuze: string;
  waarden: DoorrekenWaarden;
  zetNu: (w: Invoer) => void;
  zetNa: (w: Invoer) => void;
}) {
  const basisId = `kd-${keuze}-${rij.id}`;
  return (
    <div className="py-3" style={{ borderTop: "1px solid #EEF3F1" }}>
      <p className="font-body text-sm mb-0.5" style={{ color: DONKER, fontWeight: 500 }}>
        {rij.label}
      </p>
      {rij.hint && (
        <p className="font-body text-xs mb-2" style={{ color: ZACHT, lineHeight: 1.55 }}>
          {rij.hint}
        </p>
      )}
      <div className="grid grid-cols-2 gap-2">
        {rij.nuVast !== undefined ? (
          <VastBedrag label="Nu" bedrag={rij.nuVast} toelichting="nieuw" />
        ) : (
          <Bedragveld id={`${basisId}-nu`} label="Nu" waarde={waarden.nu[rij.id] ?? null} onChange={zetNu} />
        )}
        {rij.naVast !== undefined ? (
          <VastBedrag label="Na de keuze" bedrag={rij.naVast} toelichting="stopt" />
        ) : (
          <Bedragveld
            id={`${basisId}-na`}
            label="Na de keuze"
            waarde={waarden.na[rij.id] ?? null}
            placeholder="gelijk"
            onChange={zetNa}
          />
        )}
      </div>
    </div>
  );
}

function Tegel({ label, bedrag, nadruk }: { label: string; bedrag: number; nadruk?: boolean }) {
  return (
    <div className="text-center">
      <p className="font-body text-[10px] uppercase tracking-wide" style={{ color: GRIJS }}>
        {label}
      </p>
      <p
        className="font-display tabular-nums"
        style={{
          fontSize: nadruk ? "1.2rem" : "1.05rem",
          color: bedrag < 0 ? ROOD : DONKER,
          margin: 0,
        }}
      >
        {euroSigned(bedrag)}
      </p>
    </div>
  );
}

export default function KeuzeDoorrekening({ keuze }: Props) {
  const scenario = SCENARIOS[keuze];
  const [waarden, setWaarden] = useState<DoorrekenWaarden>(() => startWaarden(scenario));
  const uitkomst = berekenDoorrekening(scenario, waarden);

  function zet(kant: "nu" | "na", id: string, w: Invoer) {
    setWaarden((oud) => ({
      overNu: oud.overNu,
      nu: kant === "nu" ? { ...oud.nu, [id]: w } : oud.nu,
      na: kant === "na" ? { ...oud.na, [id]: w } : oud.na,
    }));
  }

  const wie = scenario.aanspreek === "jullie" ? "jullie" : "je";
  const href = analyseHref({
    situatie: scenario.situatie,
    inkomen: uitkomst.inkomenNu ?? undefined,
  });

  return (
    <div className="rounded-2xl p-5 sm:p-6 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
      <p className="font-body font-semibold text-sm mb-1" style={{ color: DONKER }}>
        {scenario.kop}
      </p>
      <p className="font-body text-sm mb-4" style={{ color: ZACHT, lineHeight: 1.65 }}>
        {scenario.intro} Laat je een vak bij &ldquo;na de keuze&rdquo; leeg, dan reken ik met hetzelfde
        bedrag als nu.
      </p>

      <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <div className="pb-3">
          <Bedragveld
            id={`kd-${keuze}-over`}
            label={`Wat ${scenario.aanspreek === "jullie" ? "houden jullie" : "houd je"} nu ongeveer over aan het eind van de maand?`}
            waarde={waarden.overNu}
            placeholder="schatting"
            onChange={(w) => setWaarden((oud) => ({ overNu: w, nu: oud.nu, na: oud.na }))}
          />
          <p className="font-body text-xs mt-1.5" style={{ color: ZACHT, lineHeight: 1.55 }}>
            Weet je het niet precies? Vul een schatting in of laat het leeg. Hoe dit bedrag bij{" "}
            {wie} tot stand komt, is precies wat de gratis analyse laat zien.
          </p>
        </div>

        {scenario.rijen.map((rij) => (
          <Rij
            key={rij.id}
            rij={rij}
            keuze={keuze}
            waarden={waarden}
            zetNu={(w) => zet("nu", rij.id, w)}
            zetNa={(w) => zet("na", rij.id, w)}
          />
        ))}
      </div>

      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }} aria-live="polite">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <Tegel label="Vrije ruimte nu" bedrag={uitkomst.vrijNu} />
          <Tegel label="Na de keuze" bedrag={uitkomst.vrijNa} />
          <Tegel label="Verschil" bedrag={uitkomst.verschilMaand} nadruk />
        </div>

        <p className="font-body text-sm mb-2" style={{ color: DONKER, fontWeight: 500, lineHeight: 1.6 }}>
          {uitkomst.verschilMaand === 0
            ? "Met deze invoer verandert er nog niets. Vul bij “na de keuze” in wat er anders wordt."
            : `Op basis van deze invoer verandert ${wie === "je" ? "je" : "jullie"} vrije ruimte met ongeveer ${euroSigned(uitkomst.verschilMaand)} per maand, ${euroSigned(uitkomst.verschilJaar)} per jaar.`}
        </p>

        {uitkomst.veranderd.length > 0 && (
          <ul className="mb-3" style={{ listStyle: "none", padding: 0, margin: "0 0 0.75rem" }}>
            {uitkomst.veranderd.map((r) => (
              <li
                key={r.id}
                className="flex justify-between gap-3 py-1 font-body text-xs"
                style={{ borderBottom: "1px solid #F0F3F1", color: ZACHT }}
              >
                <span>{r.label}</span>
                <span className="tabular-nums" style={{ color: r.effect < 0 ? ROOD : GROEN, whiteSpace: "nowrap" }}>
                  {r.effect > 0 ? "+" : ""}
                  {euroSigned(r.effect)}
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="font-body text-xs mb-2" style={{ color: ZACHT, lineHeight: 1.6 }}>
          Dit is een indicatie op basis van jouw invoer. Het laat alleen zien wat deze verandering doet met de
          bedragen die je hier hebt ingevuld.
        </p>
        <p className="font-body text-sm mb-3" style={{ color: DONKER, fontWeight: 400, lineHeight: 1.65 }}>
          Of deze verandering binnen {wie === "je" ? "je" : "jullie"} financiële ruimte past, hangt ook af van
          waar {wie === "je" ? "je" : "jullie"} geld nu al naartoe gaat.
        </p>
        <CtaLink doel="analyse" href={href} locatie="rekenaar" className="btn-primary text-center">
          {PRIMAIRE_CTA_LABEL} &rarr;
        </CtaLink>
      </div>
    </div>
  );
}
