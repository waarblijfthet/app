"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import {
  berekenKgb,
  kostenVanDeMaatregel,
  type Huishouden,
} from "@/lib/kindgebonden-budget";

/**
 * Reken uit wat de tweede afbouwschijf van 2027 dit huishouden kost.
 *
 * Bewust geen vrij invoerveld voor het inkomen: het toetsingsinkomen is het
 * gezamenlijke verzamelinkomen en bijna niemand kent dat op de euro. Een
 * bereik van vijfduizend euro is precies genoeg om het bedrag te laten zien
 * en duidelijk te blijven over de onzekerheid.
 */

const INKOMENS = [60000, 70000, 80000, 90000, 100000] as const;

const HUISHOUDENS: { sleutel: Huishouden; label: string }[] = [
  { sleutel: "paar", label: "Met partner" },
  { sleutel: "alleenstaande_ouder", label: "Alleenstaande ouder" },
];

function eur(n: number): string {
  return "\u20ac" + n.toLocaleString("nl-NL");
}

export default function KindgebondenBudgetRekenaar() {
  const [huishouden, setHuishouden] = useState<Huishouden>("paar");
  const [kinderen, setKinderen] = useState(2);
  const [inkomen, setInkomen] = useState<number>(80000);

  const nu = berekenKgb(2026, huishouden, kinderen, inkomen);
  const straks = berekenKgb(2027, huishouden, kinderen, inkomen);
  const maatregel = kostenVanDeMaatregel(huishouden, kinderen, inkomen);

  const knop =
    "px-3 py-2 rounded-lg font-body text-sm transition-colors border";
  const aan = { backgroundColor: "#0B7A6E", color: "#FFFFFF", borderColor: "#0B7A6E" };
  const uit = { backgroundColor: "#FFFFFF", color: "#16211F", borderColor: "#E6E9E7" };

  return (
    <div
      className="rounded-xl p-5 my-8"
      style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #9CCFC4" }}
    >
      <p className="font-body font-semibold text-sm mb-4" style={{ color: "#16211F" }}>
        Wat doet dit bij jouw huishouden?
      </p>

      <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
        Jouw huishouden
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {HUISHOUDENS.map((h) => (
          <button
            key={h.sleutel}
            type="button"
            onClick={() => setHuishouden(h.sleutel)}
            className={knop}
            style={huishouden === h.sleutel ? aan : uit}
          >
            {h.label}
          </button>
        ))}
      </div>

      <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
        Aantal kinderen onder de 12
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKinderen(k)}
            className={knop}
            style={kinderen === k ? aan : uit}
          >
            {k}
          </button>
        ))}
      </div>

      <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
        Gezamenlijk toetsingsinkomen per jaar, ongeveer
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {INKOMENS.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setInkomen(i)}
            className={knop}
            style={inkomen === i ? aan : uit}
          >
            {eur(i)}
          </button>
        ))}
      </div>

      <div
        className="rounded-lg p-4 mb-4"
        style={{ backgroundColor: "#E7F1EE", border: "1px solid #9CCFC4" }}
      >
        <div className="flex justify-between font-body text-sm mb-1" style={{ color: "#4A5A56" }}>
          <span>Kindgebonden budget nu (2026)</span>
          <span>{eur(nu.perMaand)} per maand</span>
        </div>
        <div className="flex justify-between font-body text-sm mb-3" style={{ color: "#4A5A56" }}>
          <span>Kindgebonden budget in 2027</span>
          <span>{eur(straks.perMaand)} per maand</span>
        </div>
        <div
          className="flex justify-between font-body font-semibold pt-3"
          style={{ color: "#16211F", borderTop: "1px solid #9CCFC4" }}
        >
          <span>Wat de nieuwe afbouw je kost</span>
          <span>
            {maatregel.perMaand === 0
              ? "niets"
              : eur(maatregel.perMaand) + " per maand"}
          </span>
        </div>
        {maatregel.perJaar > 0 && (
          <p className="font-body text-xs mt-2" style={{ color: "#4A5A56" }}>
            Dat is {eur(maatregel.perJaar)} per jaar, bovenop de gewone afbouw die er al was.
          </p>
        )}
      </div>

      <p className="font-body text-xs mb-4" style={{ color: "#4A5A56" }}>
        Voor kinderen van 12 en ouder komen er vaste bedragen bij. Die veranderen het verschil
        tussen 2026 en 2027 niet, want de afbouw werkt hetzelfde. De bedragen voor 2027 zijn een
        raming, zie de bronnen onder dit artikel.
      </p>

      <CtaLink
        doel="analyse"
        href={analyseHref({ situatie: "gezin" })}
        locatie="rekenaar"
        className="inline-block rounded-lg px-5 py-3 font-body text-sm"
        style={{ backgroundColor: "#0B7A6E", color: "#FFFFFF" }}
      >
        Reken uit wat er in jouw huishouden overblijft &rarr;
      </CtaLink>
    </div>
  );
}
