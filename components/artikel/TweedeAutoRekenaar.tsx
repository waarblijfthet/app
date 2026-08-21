"use client";

import { useState } from "react";
import Link from "next/link";
import { rapportVoorSlug, AANTAL_ZONDER_LEK, RAPPORTEN } from "@/lib/rapporten-data";
import {
  AUTO_LABELS,
  VERVOER,
  berekenVuistregel,
  euro,
  euroSigned,
  type AutoKeuze,
} from "@/lib/salaris-vuistregel";
import { analyseHref as analyseLink, type SituatieSleutel } from "@/lib/cta";

/**
 * Rekenlaag voor "twee-autos-wat-kost-de-tweede-echt" (klus B,
 * docs/artikel-bouwprompts-batch1-18-aug-2026.md, 18-aug-2026).
 *
 * Laat de lezer schuiven tussen de vier vervoersopties uit VERVOER bij zijn
 * eigen inkomen en huishouden. Het verschil tussen "twee" en "eigen" en
 * tussen "eigen" en "geen" komt rechtstreeks uit VERVOER, niet uit de hand
 * getypt.
 */

const CASE_TWEE_AUTOS = rapportVoorSlug("tweeverdieners-drie-kinderen");
const CASE_GEEN_AUTO = rapportVoorSlug("stel-zonder-kinderen");

interface Props {
  startInkomen?: number;
  startVolwassenen?: 1 | 2;
  startKinderen?: number;
  kop?: string;
  intro?: string;
}

export default function TweedeAutoRekenaar({
  startInkomen = 6000,
  startVolwassenen = 2,
  startKinderen = 2,
  kop = "Wat kost de tweede auto jou echt?",
  intro = "Zet je eigen inkomen en huishouden hieronder, en schuif dan tussen de vier vervoersopties. Het verschil zie je meteen terug in wat er maandelijks overblijft.",
}: Props) {
  const [inkomen, setInkomen] = useState(startInkomen);
  const [volwassenen, setVolwassenen] = useState<1 | 2>(startVolwassenen);
  const [kinderen, setKinderen] = useState(startKinderen);
  const [auto, setAuto] = useState<AutoKeuze>("eigen");

  const uitkomsten = (Object.keys(VERVOER) as AutoKeuze[]).reduce(
    (acc, a) => {
      acc[a] = berekenVuistregel({ inkomen: inkomen, volwassenen: volwassenen, kinderen: kinderen, auto: a }).verwachtOver;
      return acc;
    },
    {} as Record<AutoKeuze, number>
  );

  const huidige = berekenVuistregel({ inkomen: inkomen, volwassenen: volwassenen, kinderen: kinderen, auto: auto });
  const verschilTweeVsEen = VERVOER.twee - VERVOER.eigen;
  const verschilEenVsGeen = VERVOER.eigen - VERVOER.geen;

  const geldscanSituatie = volwassenen === 1 ? (kinderen > 0 ? "alleenstaande-ouder" : "alleenstaand") : kinderen > 0 ? "gezin" : "stel";
  const geldscanHref = `/geldscan?situatie=${geldscanSituatie}&inkomen=${inkomen}&boodschappen=${Math.round(huidige.boodschappen)}`;
  const analyseHref = analyseLink({
    situatie: geldscanSituatie as SituatieSleutel,
    inkomen: inkomen,
    boodschappen: Math.round(huidige.boodschappen),
  });

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
          min={2500}
          max={9000}
          step={50}
          value={inkomen}
          onChange={(e) => setInkomen(Number(e.target.value))}
          className="w-full accent-[#0B7A6E]"
          aria-label="Netto huishoudinkomen per maand"
        />

        <div className="mt-4 space-y-3">
          <div>
            <p className="font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>Volwassenen</p>
            <div className="flex flex-wrap gap-2">
              {([1, 2] as const).map((v) => (
                <button key={v} type="button" onClick={() => setVolwassenen(v)} aria-pressed={volwassenen === v}
                  className="rounded-full font-body text-sm transition-colors"
                  style={{ padding: "0.4rem 0.85rem", backgroundColor: volwassenen === v ? "#16211F" : "#FFFFFF", color: volwassenen === v ? "#FFFFFF" : "#4A5A56", border: `1px solid ${volwassenen === v ? "#16211F" : "#E6E9E7"}` }}>
                  {v === 1 ? "Alleen" : "Samen"}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>Kinderen thuis</p>
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3].map((k) => (
                <button key={k} type="button" onClick={() => setKinderen(k)} aria-pressed={kinderen === k}
                  className="rounded-full font-body text-sm transition-colors"
                  style={{ padding: "0.4rem 0.85rem", backgroundColor: kinderen === k ? "#16211F" : "#FFFFFF", color: kinderen === k ? "#FFFFFF" : "#4A5A56", border: `1px solid ${kinderen === k ? "#16211F" : "#E6E9E7"}` }}>
                  {k === 3 ? "3 of meer" : k}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>Vervoer</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(VERVOER) as AutoKeuze[]).map((a) => (
                <button key={a} type="button" onClick={() => setAuto(a)} aria-pressed={auto === a}
                  className="rounded-full font-body text-sm transition-colors"
                  style={{ padding: "0.4rem 0.85rem", backgroundColor: auto === a ? "#16211F" : "#FFFFFF", color: auto === a ? "#FFFFFF" : "#4A5A56", border: `1px solid ${auto === a ? "#16211F" : "#E6E9E7"}` }}>
                  {AUTO_LABELS[a]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: "#0B7A6E" }}>
          Bij {AUTO_LABELS[auto].toLowerCase()} verwacht ik
        </p>
        <p className="font-display mb-4" style={{ fontSize: "2.2rem", fontWeight: 300, color: huidige.verwachtOver < 0 ? "#B03A2E" : "#16211F", lineHeight: 1.1 }}>
          {euroSigned(huidige.verwachtOver)}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
          {(Object.keys(VERVOER) as AutoKeuze[]).map((a) => (
            <div key={a} className="flex justify-between gap-2 py-1" style={{ borderBottom: "1px solid #F0F3F1" }}>
              <span className="font-body text-xs" style={{ color: a === auto ? "#16211F" : "#8B958F", fontWeight: a === auto ? 600 : 400 }}>{AUTO_LABELS[a]}</span>
              <span className="font-body text-xs tabular-nums" style={{ color: a === auto ? "#16211F" : "#4A5A56" }}>{euroSigned(uitkomsten[a])}</span>
            </div>
          ))}
        </div>

        <div className="rounded-lg p-3" style={{ backgroundColor: "#FDF3E3" }}>
          <p className="font-body text-sm mb-1" style={{ color: "#92600A" }}>
            Twee auto&apos;s kosten {euro(verschilTweeVsEen)} per maand meer dan één, {euro(verschilTweeVsEen * 12)} per jaar.
          </p>
          <p className="font-body text-sm" style={{ color: "#92600A" }}>
            Van geen auto naar één auto is het verschil {euro(verschilEenVsGeen)} per maand.
          </p>
        </div>

        {kinderen >= 2 && CASE_TWEE_AUTOS && (
          <div className="rounded-lg p-3 mt-3" style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7" }}>
            <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.6 }}>
              Een gezin met drie kinderen en twee auto&apos;s dat ik doorrekende: &ldquo;{CASE_TWEE_AUTOS.uitkomstKop}.&rdquo;
              Twee auto&apos;s waren daar niet buitensporig, ze waren wel groot.{" "}
              <Link href={`/rapporten/${CASE_TWEE_AUTOS.slug}`} className="hover:underline" style={{ color: "#0B7A6E" }}>Lees hun rapport</Link>.
            </p>
          </div>
        )}
        {kinderen === 0 && auto === "geen" && CASE_GEEN_AUTO && (
          <div className="rounded-lg p-3 mt-3" style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7" }}>
            <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.6 }}>
              Een stel zonder kinderen en zonder auto dat ik doorrekende: &ldquo;{CASE_GEEN_AUTO.uitkomstKop}.&rdquo;{" "}
              <Link href={`/rapporten/${CASE_GEEN_AUTO.slug}`} className="hover:underline" style={{ color: "#0B7A6E" }}>Lees hun rapport</Link>.
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
