"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import {
  toeslag2026,
  toeslag2027Geraamd,
  MAX_UURPRIJS_2026,
  MAX_UURPRIJS_2027_GERAAMD,
  type OpvangType,
} from "@/lib/kinderopvangtoeslag-2027";

/**
 * Situatiekiezer, geen uurtarief-rekenaar (CLAUDE.md 8.9 verbiedt die expliciet
 * voor kinderopvang). De lezer kiest alleen het gezamenlijke toetsingsinkomen,
 * het type opvang en het aantal kinderen op de opvang; het uurtarief en het
 * aantal uren liggen vast en staan er met zoveel woorden bij, zodat de
 * uitkomst een illustratie blijft en geen persoonlijke berekening claimt.
 */

const INKOMENS = [60000, 80000, 100000, 120000, 150000] as const;
const UREN_PER_MAAND = 150;
const UURTARIEF = 10;

const OPVANGTYPE_LABEL: Record<OpvangType, string> = {
  dagopvang: "Dagopvang",
  bso: "Buitenschoolse opvang",
  gastouder: "Gastouderopvang",
};

function eur(n: number): string {
  return "€" + n.toLocaleString("nl-NL");
}

export default function KinderopvangtoeslagRekenaar() {
  const [inkomen, setInkomen] = useState<number>(100000);
  const [opvangType, setOpvangType] = useState<OpvangType>("dagopvang");
  const [kinderen, setKinderen] = useState<1 | 2>(1);

  const situatieEersteKind = {
    inkomen: inkomen,
    opvangType: opvangType,
    urenPerMaand: UREN_PER_MAAND,
    werkelijkUurtarief: UURTARIEF,
    kindnummer: 1 as const,
  };
  const t26Eerste = toeslag2026(situatieEersteKind);
  const t27Eerste = toeslag2027Geraamd(situatieEersteKind);

  const situatieTweedeKind = { ...situatieEersteKind, kindnummer: 2 as const };
  const t26Tweede = toeslag2026(situatieTweedeKind);
  const t27Tweede = toeslag2027Geraamd(situatieTweedeKind);

  const totaal26 =
    kinderen === 1 ? t26Eerste : { ...t26Eerste, eigenBijdragePerMaand: t26Eerste.eigenBijdragePerMaand + t26Tweede.eigenBijdragePerMaand, toeslagPerMaand: t26Eerste.toeslagPerMaand + t26Tweede.toeslagPerMaand, totaleKostenPerMaand: t26Eerste.totaleKostenPerMaand + t26Tweede.totaleKostenPerMaand };
  const totaal27 =
    kinderen === 1 ? t27Eerste : { ...t27Eerste, eigenBijdragePerMaand: t27Eerste.eigenBijdragePerMaand + t27Tweede.eigenBijdragePerMaand, toeslagPerMaand: t27Eerste.toeslagPerMaand + t27Tweede.toeslagPerMaand, totaleKostenPerMaand: t27Eerste.totaleKostenPerMaand + t27Tweede.totaleKostenPerMaand };

  const verschilEigenBijdrage = totaal26.eigenBijdragePerMaand - totaal27.eigenBijdragePerMaand;

  const knop = "px-3 py-2 rounded-lg font-body text-sm transition-colors border";
  const aan = { backgroundColor: "#0B7A6E", color: "#FFFFFF", borderColor: "#0B7A6E" };
  const uit = { backgroundColor: "#FFFFFF", color: "#16211F", borderColor: "#E6E9E7" };
  const regel = "flex justify-between font-body text-sm mb-1";

  return (
    <div
      className="rounded-xl p-5 my-8"
      style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #9CCFC4" }}
    >
      <p className="font-body font-semibold text-sm mb-4" style={{ color: "#16211F" }}>
        Wat verandert er bij jullie inkomen?
      </p>

      <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
        Jullie gezamenlijke toetsingsinkomen, ongeveer
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
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

      <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
        Type opvang
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(OPVANGTYPE_LABEL) as OpvangType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setOpvangType(t)}
            className={knop}
            style={opvangType === t ? aan : uit}
          >
            {OPVANGTYPE_LABEL[t]}
          </button>
        ))}
      </div>

      <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
        Aantal kinderen op de opvang
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {[1, 2].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKinderen(k as 1 | 2)}
            className={knop}
            style={kinderen === k ? aan : uit}
          >
            {k}
          </button>
        ))}
      </div>

      <div
        className="rounded-lg p-4 mb-4"
        style={{ backgroundColor: "#E7F1EE", border: "1px solid #9CCFC4" }}
      >
        <div className={regel} style={{ color: "#4A5A56" }}>
          <span>Vergoedingspercentage nu (2026)</span>
          <span>{(t26Eerste.percentage * 100).toFixed(1).replace(".", ",")}%</span>
        </div>
        <div className={regel} style={{ color: "#4A5A56" }}>
          <span>Vergoedingspercentage in het ontwerp voor 2027</span>
          <span>{(t27Eerste.percentage * 100).toFixed(1).replace(".", ",")}%</span>
        </div>
        <div className="flex justify-between font-body text-sm mb-3" style={{ color: "#4A5A56" }}>
          <span>Eigen bijdrage nu (2026), per maand</span>
          <span>{eur(totaal26.eigenBijdragePerMaand)}</span>
        </div>
        <div
          className="flex justify-between font-body font-semibold pt-3"
          style={{ color: "#16211F", borderTop: "1px solid #9CCFC4" }}
        >
          <span>Eigen bijdrage in het ontwerp voor 2027</span>
          <span>{eur(totaal27.eigenBijdragePerMaand)}</span>
        </div>
        <p className="font-body text-xs mt-2" style={{ color: "#4A5A56" }}>
          {verschilEigenBijdrage <= 0
            ? "Bij dit inkomen en deze aannames verandert de eigen bijdrage niet of nauwelijks."
            : `Dat scheelt ongeveer ${eur(verschilEigenBijdrage)} per maand, bij deze aannames.`}
        </p>
      </div>

      <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
        Aannames: {kinderen} kind{kinderen === 2 ? "eren" : ""} op de opvang, {UREN_PER_MAAND} uur
        per maand per kind (ongeveer 3,5 dag per week), een tarief van {eur(UURTARIEF)} per uur dat
        de opvangorganisatie rekent. Boven de maximum uurprijs ({eur(MAX_UURPRIJS_2026[opvangType])}{" "}
        in 2026, geraamd {eur(MAX_UURPRIJS_2027_GERAAMD[opvangType])} in 2027) betaal je altijd zelf
        bij, ongeacht je vergoedingspercentage.
      </p>
      <p className="font-body text-xs" style={{ color: "#4A5A56" }}>
        De 2027-cijfers komen uit het ontwerpbesluit dat bij de voorjaarsbesluitvorming 2026 wordt
        vastgesteld; de maximum uurprijs voor 2027 is een raming op basis van 5 procent indexatie
        en nog niet definitief. Dit is een indicatie, geen persoonlijke berekening. De{" "}
        <CtaLink
          doel="analyse"
          href={analyseHref({ situatie: "gezin" })}
          locatie="rekenaar"
          style={{ color: "#0B7A6E", textDecoration: "underline" }}
        >
          gratis analyse
        </CtaLink>{" "}
        rekent met jullie eigen cijfers.
      </p>
    </div>
  );
}
