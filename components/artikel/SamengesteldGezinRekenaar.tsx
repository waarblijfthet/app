"use client";

import { useState } from "react";
import Link from "next/link";
import { rapportVoorSlug, AANTAL_ZONDER_LEK, RAPPORTEN } from "@/lib/rapporten-data";
import { berekenVuistregel, euro, euroSigned } from "@/lib/salaris-vuistregel";
import { analyseHref as analyseLink, type SituatieSleutel } from "@/lib/cta";

/**
 * Rekenlaag voor "samengesteld-gezin-twee-huishoudens-een-budget" (klus C,
 * docs/artikel-bouwprompts-batch1-18-aug-2026.md, 18-aug-2026).
 *
 * berekenVuistregel() kent geen deeltijdkinderen, alleen kinderen: number.
 * Deze rekenaar zet daarom twee gehele-getal-uitkomsten naast elkaar (met en
 * zonder de deeltijdkinderen meegerekend) in plaats van zelf een fractie te
 * verzinnen. Het verschil daartussen is precies het blinde punt dat het
 * artikel benoemt.
 */

const RAPPORT = rapportVoorSlug("alleenstaande-ouder-twee-kinderen");

interface Props {
  startInkomen?: number;
  kop?: string;
  intro?: string;
}

export default function SamengesteldGezinRekenaar({
  startInkomen = 6000,
  kop = "Wat doen deeltijdkinderen met jullie budget?",
  intro = "Zet hieronder je eigen kinderen en de kinderen die er een deel van de tijd bijkomen. De vuistregel kan geen halve kinderen tellen, dus zie je hier de twee uitkomsten waartussen de werkelijkheid in zit.",
}: Props) {
  const [inkomen, setInkomen] = useState(startInkomen);
  const [eigenKinderen, setEigenKinderen] = useState(1);
  const [deeltijdKinderen, setDeeltijdKinderen] = useState(2);

  const basis = berekenVuistregel({ inkomen: inkomen, volwassenen: 2, kinderen: eigenKinderen, auto: "eigen" });
  const vol = berekenVuistregel({ inkomen: inkomen, volwassenen: 2, kinderen: eigenKinderen + deeltijdKinderen, auto: "eigen" });

  const gat = basis.verwachtOver - vol.verwachtOver;
  const boodschappenDelta = vol.boodschappen - basis.boodschappen;
  const kinderkostenDelta = vol.kinderkosten - basis.kinderkosten;

  const geldscanHref = `/geldscan?situatie=gezin&inkomen=${inkomen}&boodschappen=${Math.round(vol.boodschappen)}`;
  const analyseHref = analyseLink({ situatie: "gezin", inkomen: inkomen, boodschappen: Math.round(vol.boodschappen) });

  return (
    <div className="rounded-2xl p-5 sm:p-6 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
      <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>{kop}</p>
      <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>{intro}</p>

      <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <label className="block font-body text-sm mb-1" style={{ color: "#16211F", fontWeight: 500 }}>
          Netto per maand, samen
        </label>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-display" style={{ fontSize: "1.9rem", fontWeight: 300, color: "#16211F" }}>{euro(inkomen)}</span>
        </div>
        <input
          type="range"
          min={3000}
          max={9000}
          step={50}
          value={inkomen}
          onChange={(e) => setInkomen(Number(e.target.value))}
          className="w-full accent-[#0B7A6E]"
          aria-label="Netto huishoudinkomen per maand"
        />

        <div className="mt-4 space-y-3">
          <div>
            <p className="font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>Eigen kinderen, altijd thuis</p>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3].map((k) => (
                <button key={k} type="button" onClick={() => setEigenKinderen(k)} aria-pressed={eigenKinderen === k}
                  className="rounded-full font-body text-sm transition-colors"
                  style={{ padding: "0.4rem 0.85rem", backgroundColor: eigenKinderen === k ? "#16211F" : "#FFFFFF", color: eigenKinderen === k ? "#FFFFFF" : "#4A5A56", border: `1px solid ${eigenKinderen === k ? "#16211F" : "#E6E9E7"}` }}>
                  {k}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>Kinderen die er een deel van de tijd bij zijn</p>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3].map((k) => (
                <button key={k} type="button" onClick={() => setDeeltijdKinderen(k)} aria-pressed={deeltijdKinderen === k}
                  className="rounded-full font-body text-sm transition-colors"
                  style={{ padding: "0.4rem 0.85rem", backgroundColor: deeltijdKinderen === k ? "#16211F" : "#FFFFFF", color: deeltijdKinderen === k ? "#FFFFFF" : "#4A5A56", border: `1px solid ${deeltijdKinderen === k ? "#16211F" : "#E6E9E7"}` }}>
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <div className="grid grid-cols-2 gap-2 text-center mb-3">
          <div>
            <p className="font-body text-[10px] uppercase tracking-wide" style={{ color: "#8B958F" }}>
              Als je alleen de {eigenKinderen} eigen kinderen telt
            </p>
            <p className="font-display tabular-nums" style={{ fontSize: "1.15rem", color: basis.verwachtOver < 0 ? "#B03A2E" : "#16211F" }}>
              {euroSigned(basis.verwachtOver)}
            </p>
          </div>
          <div>
            <p className="font-body text-[10px] uppercase tracking-wide" style={{ color: "#8B958F" }}>
              Als je alle {eigenKinderen + deeltijdKinderen} kinderen telt
            </p>
            <p className="font-display tabular-nums" style={{ fontSize: "1.15rem", color: vol.verwachtOver < 0 ? "#B03A2E" : "#16211F" }}>
              {euroSigned(vol.verwachtOver)}
            </p>
          </div>
        </div>

        {deeltijdKinderen > 0 ? (
          <div className="rounded-lg p-3" style={{ backgroundColor: "#FDF3E3" }}>
            <p className="font-body text-sm mb-1" style={{ color: "#92600A" }}>
              Het verschil is {euro(gat)} per maand: {euro(boodschappenDelta)} boodschappen en{" "}
              {euro(kinderkostenDelta)} eigen bijdrage aan opvang, school en sport, allebei berekend als
              een vast bedrag per kind.
            </p>
            <p className="font-body text-xs" style={{ color: "#5A6B66" }}>
              De vuistregel telt hierboven alleen hele kinderen, niet een aanwezigheidspercentage. Ze kan
              dus niet zeggen of jouw werkelijke kosten dichter bij het basisbedrag of bij het volledige
              bedrag liggen, alleen dat je ergens tussen die twee in valt.
            </p>
          </div>
        ) : (
          <p className="font-body text-sm" style={{ color: "#5A6B66" }}>
            Zet hierboven een deeltijdkind erbij om het verschil te zien.
          </p>
        )}

        {RAPPORT && (
          <div className="rounded-lg p-3 mt-3" style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7" }}>
            <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.6 }}>
              Bij een alleenstaande ouder die ik doorrekende wonen de kinderen{" "}
              {RAPPORT.kenmerken.find((k) => k.includes("procent"))}, het enige echte co-ouderschapsgegeven
              dat ik in een rapport heb. Mijn conclusie daar: &ldquo;{RAPPORT.uitkomstKop}.&rdquo;{" "}
              <Link href={`/rapporten/${RAPPORT.slug}`} className="hover:underline" style={{ color: "#0B7A6E" }}>Lees haar rapport</Link>.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link href={analyseHref} className="btn-primary text-center">Doe de gratis analyse &rarr;</Link>
        </div>
        <p className="font-body text-sm mt-3 mb-0">
          <Link href={geldscanHref} className="hover:underline" style={{ color: "#0B7A6E", textDecoration: "none" }}>
            Wil je na de analyse weten waarom jouw situatie zo uitpakt? Bekijk de Geldscan &rarr;
          </Link>
        </p>
      </div>

      <p className="font-body text-xs mt-3 mb-0" style={{ color: "#5A6B66" }}>
        Vergelijkingsbedragen op basis van de vijf huishoudens die ik zelf heb doorgerekend, zie{" "}
        <Link href="/rapporten" className="hover:underline" style={{ color: "#0B7A6E" }}>Rapporten</Link>
        . Niet elke Geldscan vindt een lek: bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} was er niets te
        repareren.
      </p>
    </div>
  );
}
