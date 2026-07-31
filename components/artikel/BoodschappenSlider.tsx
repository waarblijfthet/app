"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * Reken-mee-schuifje. Herzien 30-jul-2026 na de persona-toets.
 *
 * Drie dingen waren mis. (1) Het begon met het aantal kinderen, dus wie alleen
 * woont zat meteen in een tool voor gezinnen. Nu kies je eerst het huishouden.
 * (2) De regel "schattingen liggen meestal te laag" maakte elke uitkomst fout:
 * zit je erboven dan ben je het probleem, zit je eronder dan lieg je tegen
 * jezelf. Er bestond geen uitkomst waarin de lezer het goed doet, en dat leest
 * als een verkoopmachine. Weg. (3) De uitkomst wees alleen naar de gratis
 * analyse, terwijl dit het punt is waarop de lezer merkt dat boodschappen niet
 * zijn probleem zijn. Daar staat nu ook het rapport, met de twee regels die de
 * ICP's zelf noemden: geen gesprek nodig, en als er niets te repareren valt
 * staat dat er ook.
 *
 * Bedragen gelijk aan lib/benchmarks.ts, herijkt op de vijf huishoudens op
 * /rapporten: 700 basis bij twee volwassenen, 475 bij één, plus 150 per kind.
 */

const BASIS_TWEE = 700;
const BASIS_EEN = 475;
const PER_KIND = 150;

const euro = (n: number) => "€" + Math.round(n).toLocaleString("nl-NL");

const HUISHOUDENS = [
  { label: "Alleen", volw: 1, kind: 0 },
  { label: "Alleen met 1 kind", volw: 1, kind: 1 },
  { label: "Alleen met 2 kinderen", volw: 1, kind: 2 },
  { label: "Samen", volw: 2, kind: 0 },
  { label: "Samen met 1 kind", volw: 2, kind: 1 },
  { label: "Samen met 2 kinderen", volw: 2, kind: 2 },
  { label: "Samen met 3 kinderen", volw: 2, kind: 3 },
];

export default function BoodschappenSlider() {
  const [keuze, setKeuze] = useState(5);
  const [schatting, setSchatting] = useState(800);

  const h = HUISHOUDENS[keuze];
  const bench = (h.volw === 1 ? BASIS_EEN : BASIS_TWEE) + h.kind * PER_KIND;
  const verschil = schatting - bench;
  const max = Math.max(schatting, bench, 1);

  let oordeel: { kleur: string; bg: string; kop: string; tekst: string };
  if (verschil > 100) {
    oordeel = {
      kleur: "#92600A",
      bg: "#FDF3E3",
      kop: `Dat is ${euro(verschil)} meer dan bij een huishouden als het jouwe.`,
      tekst:
        "Dat is iets om naar te kijken, maar reken het eerst even door: dit verschil per jaar is " +
        euro(verschil * 12) +
        ". Verklaart dat waarom er aan het eind van de maand niets overblijft, of blijft er dan nog een gat?",
    };
  } else if (verschil < -100) {
    oordeel = {
      kleur: "#0B7A6E",
      bg: "#E7F1EE",
      kop: `Dat is ${euro(-verschil)} minder dan bij een huishouden als het jouwe.`,
      tekst:
        "Hier zit je probleem dus niet. Als er toch niets overblijft, ligt het aan een andere post, en op boodschappen bezuinigen gaat je niet helpen.",
    };
  } else {
    oordeel = {
      kleur: "#0B7A6E",
      bg: "#E7F1EE",
      kop: "Dat is normaal voor een huishouden als het jouwe.",
      tekst:
        "Hier zit je probleem dus niet. Als er toch niets overblijft, ligt het aan een andere post, en op boodschappen bezuinigen gaat je niet helpen.",
    };
  }

  return (
    <div className="rounded-2xl border border-[#E6E9E7] p-6 my-8" style={{ backgroundColor: "#FFFFFF" }}>
      <p className="font-body font-medium uppercase tracking-widest text-xs mb-2" style={{ color: "#0B7A6E" }}>
        Reken even mee
      </p>
      <p className="font-display font-light text-[#16211F] text-xl mb-4">
        Hoeveel ben jij per maand aan boodschappen kwijt?
      </p>

      {/* Mobiel horizontaal scrollend, desktop op meerdere regels binnen de tekstkolom. */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
        {HUISHOUDENS.map((opt, i) => (
          <button
            key={opt.label}
            type="button"
            onClick={() => setKeuze(i)}
            aria-pressed={keuze === i}
            className="shrink-0 whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-body transition-colors"
            style={{
              backgroundColor: keuze === i ? "#16211F" : "white",
              color: keuze === i ? "white" : "#4A5A56",
              border: `1px solid ${keuze === i ? "#16211F" : "#E6E9E7"}`,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <input
        type="range"
        min={200}
        max={1600}
        step={10}
        value={schatting}
        onChange={(e) => setSchatting(Number(e.target.value))}
        className="w-full accent-[#0B7A6E]"
        aria-label="Jouw boodschappen per maand"
      />

      <div className="mt-5 space-y-3">
        <Balk label="Bij jou" bedrag={schatting} max={max} kleur="#0B7A6E" />
        <Balk label="Huishouden als het jouwe" bedrag={bench} max={max} kleur="#8B958F" />
      </div>

      <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: oordeel.bg }}>
        <p className="font-body font-medium text-sm mb-1" style={{ color: oordeel.kleur }}>
          {oordeel.kop}
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
          {oordeel.tekst}
        </p>
      </div>

      <p className="font-body text-xs mt-3" style={{ color: "#8B958F" }}>
        Vergelijkingsbedrag op basis van de vijf huishoudens die ik zelf heb doorgerekend, zie{" "}
        <Link href="/rapporten" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">
          Rapporten
        </Link>
        . Het weet niets van de leeftijd van je kinderen of van bezorgmaaltijden.
      </p>

      {/* Dit is het punt waar de lezer merkt dat boodschappen zijn vraag niet
          beantwoorden. Vandaar hier het aanbod en niet zeven schermen lager. */}
      <div className="mt-5 pt-5" style={{ borderTop: "1px solid #E6E9E7" }}>
        <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
          Wil je weten waar het bij jou dan wel zit?
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
          Ik leg je hele maand naast huishoudens als het jouwe en schrijf op wat er opvalt en wat juist
          niet. Geen gesprek nodig, je leest het rustig terug. Valt er niets te repareren, dan staat dat
          er ook. €49 eenmalig.
        </p>
        <Link href="/geldscan" className="btn-primary">
          Bekijk wat je krijgt voor €49 &rarr;
        </Link>
        <p className="font-body text-sm mt-3 mb-0">
          <Link href="/analyse" className="hover:underline" style={{ color: "#8B958F", textDecoration: "none" }}>
            Liever eerst zelf je hele maand vergelijken? Dat is gratis &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}

function Balk({ label, bedrag, max, kleur }: { label: string; bedrag: number; max: number; kleur: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-body mb-1">
        <span style={{ color: "#4A5A56" }}>{label}</span>
        <span className="tabular-nums" style={{ color: kleur, fontWeight: 600 }}>{euro(bedrag)}</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#F0F3F1" }}>
        <div className="h-full rounded-full" style={{ width: `${(bedrag / max) * 100}%`, backgroundColor: kleur }} />
      </div>
    </div>
  );
}
