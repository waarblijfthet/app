"use client";

import { useState } from "react";

// Gemiddelde boodschappen vergelijkbaar gezin, per aantal kinderen
// (gelijk aan de benchmark in de analyse)
const BENCH: Record<number, number> = { 0: 485, 1: 620, 2: 755, 3: 890 };
const LABELS: Record<number, string> = {
  0: "Geen kinderen",
  1: "1 kind",
  2: "2 kinderen",
  3: "3+ kinderen",
};

const euro = (n: number) => "€" + Math.round(n).toLocaleString("nl-NL");

export default function BoodschappenSlider() {
  const [schatting, setSchatting] = useState(600);
  const [kinderen, setKinderen] = useState(2);

  const bench = BENCH[kinderen];
  const verschil = schatting - bench;
  const max = Math.max(schatting, bench, 1);

  let oordeel: { kleur: string; bg: string; tekst: string };
  if (verschil > 100) oordeel = { kleur: "#B03A2E", bg: "#E7F1EE", tekst: `Dat is ${euro(verschil)} méér dan vergelijkbare gezinnen.` };
  else if (verschil < -100) oordeel = { kleur: "#0B7A6E", bg: "#E7F1EE", tekst: `Dat is ${euro(-verschil)} mínder dan vergelijkbare gezinnen.` };
  else oordeel = { kleur: "#92600A", bg: "#FDF3E3", tekst: "Dat zit rond het gemiddelde van vergelijkbare gezinnen." };

  return (
    <div className="rounded-2xl border border-[#E6E9E7] p-6 my-8" style={{ backgroundColor: "#FFFFFF" }}>
      <p className="font-body font-medium uppercase tracking-widest text-xs mb-2" style={{ color: "#0B7A6E" }}>
        Reken even mee
      </p>
      <p className="font-display font-light text-[#16211F] text-xl mb-4">
        Hoeveel denk je dat je per maand aan boodschappen uitgeeft?
      </p>

      <div className="flex flex-wrap gap-2 mb-5">
        {[0, 1, 2, 3].map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKinderen(k)}
            aria-pressed={kinderen === k}
            className="px-3 py-1.5 rounded-full text-sm font-body transition-colors"
            style={{
              backgroundColor: kinderen === k ? "#16211F" : "white",
              color: kinderen === k ? "white" : "#4A5A56",
              border: `1px solid ${kinderen === k ? "#16211F" : "#E6E9E7"}`,
            }}
          >
            {LABELS[k]}
          </button>
        ))}
      </div>

      <input
        type="range" min={200} max={1500} step={10}
        value={schatting}
        onChange={(e) => setSchatting(Number(e.target.value))}
        className="w-full accent-[#0B7A6E]"
        aria-label="Jouw boodschappen per maand"
      />

      <div className="mt-5 space-y-3">
        <Balk label="Jouw schatting" bedrag={schatting} max={max} kleur="#0B7A6E" />
        <Balk label="Gemiddeld vergelijkbaar gezin" bedrag={bench} max={max} kleur="#8B958F" />
      </div>

      <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: oordeel.bg }}>
        <p className="font-body text-sm" style={{ color: oordeel.kleur }}>{oordeel.tekst}</p>
      </div>

      <p className="font-body text-xs mt-3" style={{ color: "#8B958F" }}>
        Schattingen liggen meestal te laag. Wil je je échte bedrag weten en
        vergelijken op álle posten?{" "}
        <a href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de analyse</a>.
      </p>
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
