"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import {
  AUTO_LABELS,
  VERVOER,
  VUISTREGEL,
  berekenVuistregel,
  euro,
  type AutoKeuze,
} from "@/lib/salaris-vuistregel";

/**
 * Engelstalige rekenaar voor N5.
 *
 * Waarom een eigen component en niet SalarisRekenaar met een taalvlag: die
 * rekenaar staat op is-4000 (3.199 vertoningen per week, positie 1) en op nog
 * een handvol andere pagina's. Er een i18n-laag doorheen trekken raakt de
 * best presterende pagina van de site voor een pagina die nog nul verkeer
 * heeft. Dit component hergebruikt wel de rekenlaag zelf, berekenVuistregel()
 * uit lib/salaris-vuistregel.ts, dus er is maar een plek waar de bedragen
 * vandaan komen en de twee kunnen niet uit elkaar lopen.
 *
 * De rekenaar is Engels, de gratis analyse waar hij naartoe wijst is
 * Nederlands. Dat staat er letterlijk bij; zie de notitie in
 * docs/serp-invalshoeken-06-sep-2026.md en het logboek in bouwvolgorde.
 */

const AUTO_LABELS_EN: Record<AutoKeuze, string> = {
  geen: "No car",
  eigen: "One car",
  twee: "Two cars",
  zakelijk: "Company car",
};

interface Props {
  startNet?: number;
}

export default function HouseholdCalculatorEn({ startNet = 5000 }: Props) {
  const [net, setNet] = useState(startNet);
  const [adults, setAdults] = useState<1 | 2>(2);
  const [children, setChildren] = useState(0);
  const [car, setCar] = useState<AutoKeuze>("eigen");

  const v = berekenVuistregel({
    inkomen: net,
    volwassenen: adults,
    kinderen: children,
    auto: car,
  });

  const rows: [string, number][] = [
    ["Housing, energy and local taxes", v.wonen],
    ["Groceries", v.boodschappen],
    ["Transport", v.vervoer],
    ["Insurance", v.verzekeringen],
    ["Subscriptions", VUISTREGEL.abonnementen],
    ["Leisure", v.vrijetijd],
    ...(children > 0 ? ([["Childcare, school and sports", v.kinderkosten]] as [string, number][]) : []),
  ];

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 mb-8"
      style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
    >
      <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
        Put your own household in, and see what is left
      </p>
      <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
        The amounts come from the five Dutch households I worked through myself, not from a national
        average. Small sample, so read it as a direction rather than a norm.
      </p>

      <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <label className="block font-body text-sm mb-1" style={{ color: "#16211F", fontWeight: 500 }}>
          Net income per month, household total
        </label>
        <p className="font-display mb-2" style={{ fontSize: "1.9rem", fontWeight: 300, color: "#16211F" }}>
          {euro(net)}
        </p>
        <input
          type="range"
          min={2000}
          max={10000}
          step={50}
          value={net}
          onChange={(e) => setNet(Number(e.target.value))}
          className="w-full accent-[#0B7A6E]"
          aria-label="Net household income per month"
        />

        <div className="mt-4 space-y-3">
          <Row label="Adults">
            {([1, 2] as const).map((a) => (
              <Chip key={a} active={adults === a} onClick={() => setAdults(a)}>
                {a === 1 ? "One" : "Two"}
              </Chip>
            ))}
          </Row>
          <Row label="Children at home">
            {[0, 1, 2, 3].map((k) => (
              <Chip key={k} active={children === k} onClick={() => setChildren(k)}>
                {k === 3 ? "3 or more" : String(k)}
              </Chip>
            ))}
          </Row>
          <Row label="Transport">
            {(Object.keys(VERVOER) as AutoKeuze[]).map((a) => (
              <Chip key={a} active={car === a} onClick={() => setCar(a)}>
                {AUTO_LABELS_EN[a] ?? AUTO_LABELS[a]}
              </Chip>
            ))}
          </Row>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: "#0B7A6E" }}>
          What I would expect to be left
        </p>
        <p
          className="font-display mb-3"
          style={{
            fontSize: "2.2rem",
            fontWeight: 300,
            color: v.verwachtOver < 0 ? "#B03A2E" : "#16211F",
            lineHeight: 1.1,
          }}
        >
          {v.verwachtOver < 0 ? "-" + euro(Math.abs(v.verwachtOver)) : euro(v.verwachtOver)}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
          {rows.map(([label, amount]) => (
            <div
              key={label}
              className="flex justify-between gap-2 py-1"
              style={{ borderBottom: "1px solid #F0F3F1" }}
            >
              <span className="font-body text-xs" style={{ color: "#8B958F" }}>
                {label}
              </span>
              <span className="font-body text-xs tabular-nums" style={{ color: "#4A5A56" }}>
                {euro(amount)}
              </span>
            </div>
          ))}
        </div>

        <CtaLink
          doel="analyse"
          href={analyseHref({ inkomen: net })}
          locatie="rekenaar-en"
          className="inline-block rounded-full px-5 py-2.5 font-body text-sm font-semibold"
          style={{ backgroundColor: "#0B7A6E", color: "#FFFFFF", textDecoration: "none" }}
        >
          Compare your household
        </CtaLink>
        <p className="font-body text-xs mt-3" style={{ color: "#8B958F" }}>
          The comparison itself is in Dutch. If that does not work for you, mail me in English and I
          will walk you through it; the written report is available in English.
        </p>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full font-body text-sm transition-colors"
      style={{
        padding: "0.35rem 0.9rem",
        backgroundColor: active ? "#16211F" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#4A5A56",
        border: `1px solid ${active ? "#16211F" : "#E6E9E7"}`,
      }}
    >
      {children}
    </button>
  );
}
