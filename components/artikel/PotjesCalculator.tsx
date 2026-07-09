"use client";

import { useState } from "react";

const euro = (n: number) => "€" + Math.round(n).toLocaleString("nl-NL");

const POTJES = [
  { key: "vast", naam: "Vaste lasten", kleur: "#16211F" },
  { key: "dagelijks", naam: "Dagelijkse uitgaven", kleur: "#0B7A6E" },
  { key: "sparen", naam: "Sparen", kleur: "#2D6A4F" },
  { key: "vrij", naam: "Vrij besteedbaar", kleur: "#8B958F" },
] as const;

export default function PotjesCalculator() {
  const [inkomen, setInkomen] = useState(3500);
  const [pct, setPct] = useState({ vast: 65, dagelijks: 20, sparen: 10, vrij: 5 });

  const totaal = pct.vast + pct.dagelijks + pct.sparen + pct.vrij;
  const vasteWaarschuwing = pct.vast > 70;

  const setOne = (key: keyof typeof pct, val: number) =>
    setPct((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="rounded-2xl border border-[#E6E9E7] p-6 my-8" style={{ backgroundColor: "#FFFFFF" }}>
      <p className="font-body font-medium uppercase tracking-widest text-xs mb-2" style={{ color: "#0B7A6E" }}>
        Reken even mee
      </p>
      <p className="font-display font-light text-[#16211F] text-xl mb-4">
        Jouw potjes in euro&apos;s
      </p>

      <label className="block mb-5">
        <span className="font-body text-sm" style={{ color: "#4A5A56" }}>Netto inkomen per maand</span>
        <div className="flex items-center gap-3 mt-1">
          <input
            type="range" min={1500} max={8000} step={100}
            value={inkomen}
            onChange={(e) => setInkomen(Number(e.target.value))}
            className="flex-1 accent-[#16211F]"
            aria-label="Netto inkomen per maand"
          />
          <span className="font-display font-light text-[#16211F] text-lg tabular-nums w-24 text-right">{euro(inkomen)}</span>
        </div>
      </label>

      <div className="space-y-4">
        {POTJES.map((pot) => (
          <div key={pot.key}>
            <div className="flex justify-between items-center mb-1">
              <span className="font-body text-sm" style={{ color: "#16211F" }}>{pot.naam}</span>
              <span className="font-body text-sm tabular-nums" style={{ color: pot.kleur, fontWeight: 600 }}>
                {pct[pot.key]}% · {euro((inkomen * pct[pot.key]) / 100)}
              </span>
            </div>
            <input
              type="range" min={0} max={100} step={1}
              value={pct[pot.key]}
              onChange={(e) => setOne(pot.key, Number(e.target.value))}
              className="w-full"
              style={{ accentColor: pot.kleur }}
              aria-label={pot.naam}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: totaal === 100 ? "#E7F1EE" : "#FAE5DE" }}>
        <p className="font-body text-sm" style={{ color: totaal === 100 ? "#2D6A4F" : "#B03A2E" }}>
          {totaal === 100
            ? "✓ Je verdeling telt op tot 100%."
            : `Je verdeling telt nu op tot ${totaal}% — pas de potjes aan tot je op 100% zit.`}
        </p>
      </div>

      {vasteWaarschuwing && (
        <p className="font-body text-sm mt-3" style={{ color: "#B03A2E" }}>
          Let op: meer dan 70% naar vaste lasten is een signaal dat het systeem
          knelt — dan is er weinig ruimte om te sparen of op te vangen.
        </p>
      )}

      <p className="font-body text-xs mt-4" style={{ color: "#8B958F" }}>
        Benieuwd hoe jouw échte verdeling eruitziet?{" "}
        <a href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</a>.
      </p>
    </div>
  );
}
