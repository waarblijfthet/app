"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import { euro } from "@/lib/salaris-vuistregel";
import {
  aandeelMetMeerNl,
  aandeelMetMeerBinnenType,
  bovenTabelNl,
  grensPerMaandNlRond,
  HUISHOUDTYPE_LABEL,
  INKOMEN_PEILJAAR,
  type HuishoudType,
} from "@/lib/inkomensverdeling-cbs";

/**
 * Situatiekiezer voor de pijler "waar sta ik met mijn inkomen" (24-sep-2026).
 *
 * Geen bruto-netto-rekenaar (CLAUDE.md, niet-bouwen-lijst): de lezer zet zelf
 * in wat er per maand te besteden is, en krijgt terug waar dat staat in de
 * verdeling van het CBS. Alle getallen komen uit lib/inkomensverdeling-cbs.ts,
 * dezelfde functies als de tabellen op de pagina.
 *
 * Onder de uitkomst: een indicatie-zin en daarna de analyse-CTA, nooit een
 * Geldscan-link (CLAUDE.md sectie 5, rekenaars zijn een opstap).
 */

/** Het huishoudtype uit bron 2 dat het dichtst bij deze samenstelling ligt. */
function typeVoor(volwassenen: 1 | 2, kinderen: number): HuishoudType {
  if (volwassenen === 1) return kinderen > 0 ? "eenoudergezin" : "alleenOnderAow";
  return kinderen > 0 ? "paarMetKinderen" : "paarZonderKinderenOnderAow";
}

function situatieVoor(volwassenen: 1 | 2, kinderen: number) {
  if (volwassenen === 1) return kinderen > 0 ? ("alleenstaande-ouder" as const) : ("alleenstaand" as const);
  return kinderen > 0 ? ("gezin" as const) : ("stel" as const);
}

/** "12%", of "minder dan 1%" als het afgerond op nul zou uitkomen. */
function pct(aandeel: number, bovengrens: boolean): string {
  const p = Math.round(aandeel * 100);
  if (p < 1) return "minder dan 1%";
  return (bovengrens ? "minder dan " : "") + p + "%";
}

export default function InkomenspositieKiezer({
  startBedrag = 5000,
  startVolwassenen = 2,
  startKinderen = 0,
}: {
  startBedrag?: number;
  startVolwassenen?: 1 | 2;
  startKinderen?: number;
}) {
  const [bedrag, setBedrag] = useState(startBedrag);
  const [volwassenen, setVolwassenen] = useState<1 | 2>(startVolwassenen);
  const [kinderen, setKinderen] = useState(startKinderen);

  const meerNl = aandeelMetMeerNl(bedrag, volwassenen, kinderen);
  const boven = bovenTabelNl(bedrag, volwassenen, kinderen);
  const type = typeVoor(volwassenen, kinderen);
  const meerType = aandeelMetMeerBinnenType(type, bedrag);
  const top10 = grensPerMaandNlRond(0.9, volwassenen, kinderen);
  const midden = grensPerMaandNlRond(0.5, volwassenen, kinderen);
  const href = analyseHref({ situatie: situatieVoor(volwassenen, kinderen), inkomen: bedrag });

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 mb-8"
      style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
    >
      <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
        Waar sta jij? Zet je eigen huishouden erin.
      </p>
      <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
        Vul in wat er per maand binnenkomt, alles bij elkaar: nettoloon, een twaalfde van je
        vakantiegeld, toeslagen en kinderbijslag, min je zorgpremie.
      </p>

      <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <label className="block font-body text-sm mb-1" style={{ color: "#16211F", fontWeight: 500 }}>
          Te besteden per maand, samen
        </label>
        <p className="font-display mb-2" style={{ fontSize: "1.9rem", fontWeight: 300, color: "#16211F" }}>
          {euro(bedrag)}
        </p>
        <input
          type="range"
          min={1500}
          max={15000}
          step={50}
          value={bedrag}
          onChange={(e) => setBedrag(Number(e.target.value))}
          className="w-full accent-[#0B7A6E]"
          aria-label="Besteedbaar inkomen per maand"
        />
        <div className="mt-4 space-y-3">
          <Rij label="Volwassenen">
            {([1, 2] as const).map((v) => (
              <Chip key={v} actief={volwassenen === v} onClick={() => setVolwassenen(v)}>
                {v === 1 ? "Alleen" : "Samen"}
              </Chip>
            ))}
          </Rij>
          <Rij label="Kinderen thuis, jonger dan 18">
            {[0, 1, 2, 3].map((k) => (
              <Chip key={k} actief={kinderen === k} onClick={() => setKinderen(k)}>
                {k === 3 ? "3 of meer" : String(k)}
              </Chip>
            ))}
          </Rij>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: "#0B7A6E" }}>
          Huishoudens in Nederland met meer te besteden
        </p>
        <p className="font-display mb-1" style={{ fontSize: "2.2rem", fontWeight: 300, color: "#16211F", lineHeight: 1.1 }}>
          {pct(meerNl, boven)}
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
          gecorrigeerd voor de grootte van je huishouden. Voor jouw samenstelling ligt het midden op{" "}
          {midden === null ? "onbekend" : euro(midden)} en begint de hoogste 10 procent bij{" "}
          {top10 === null ? "onbekend" : euro(top10)} per maand.
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
          Alleen vergeleken met {HUISHOUDTYPE_LABEL[type].charAt(0).toLowerCase() + HUISHOUDTYPE_LABEL[type].slice(1)}: {pct(meerType, false)} heeft
          meer te besteden, zonder correctie voor het aantal kinderen.
        </p>

        <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
          Dit is een indicatie op cijfers van het CBS over {INKOMEN_PEILJAAR}.
        </p>
        <p className="font-body text-sm mb-3" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
          Waar je staat zegt niets over wat er overblijft. Wil je zien hoe jouw uitgaven zich
          verhouden tot vergelijkbare huishoudens?
        </p>
        <CtaLink doel="analyse" href={href} locatie="rekenaar" className="btn-primary text-center">
          Doe de gratis analyse &rarr;
        </CtaLink>
      </div>

      <p className="font-body text-xs mt-3 mb-0" style={{ color: "#5A6B66" }}>
        Afgeleid uit de verdeling van het besteedbaar en het gestandaardiseerd inkomen van het CBS
        ({INKOMEN_PEILJAAR}), in klassen van &euro;2.000 per jaar. Inkomens zijn sindsdien gestegen, dus in
        euro&apos;s van nu liggen de grenzen iets hoger.
      </p>
    </div>
  );
}

function Rij({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ actief, onClick, children }: { actief: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actief}
      className="rounded-full font-body text-sm transition-colors"
      style={{
        padding: "0.4rem 0.85rem",
        backgroundColor: actief ? "#16211F" : "#FFFFFF",
        color: actief ? "#FFFFFF" : "#4A5A56",
        border: `1px solid ${actief ? "#16211F" : "#E6E9E7"}`,
      }}
    >
      {children}
    </button>
  );
}
