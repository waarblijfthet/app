"use client";
import { useState } from "react";

const steden = [
  { label: "Randstad (AMS/RTD/DH)", factor: 1.25 },
  { label: "Grote stad (Utrecht, Eindhoven)", factor: 1.1 },
  { label: "Middelgrote stad (Tilburg, Breda)", factor: 1.0 },
  { label: "Kleine stad / dorp", factor: 0.88 },
];

const basisPosten = [
  { naam: "Huur (inclusief servicekosten)", min: 850, gem: 1050, max: 1400, kleur: "#16211F" },
  { naam: "Energie (gas + stroom + water)", min: 130, gem: 180, max: 280, kleur: "#0B7A6E" },
  { naam: "Zorgverzekering (na zorgtoeslag)", min: 80, gem: 130, max: 185, kleur: "#86BCAF" },
  { naam: "Internet + telefoon", min: 50, gem: 85, max: 130, kleur: "#0B7A6E" },
  { naam: "Boodschappen (incl. drogisterij)", min: 250, gem: 340, max: 450, kleur: "#A6D8CD" },
  { naam: "Vervoer (OV of auto)", min: 80, gem: 220, max: 480, kleur: "#4A5A56" },
  { naam: "Overige verzekeringen", min: 40, gem: 80, max: 140, kleur: "#8B958F" },
  { naam: "Abonnementen", min: 50, gem: 120, max: 220, kleur: "#BEB5A8" },
];

export function AlleenstaandeUitgaven() {
  const [stad, setStad] = useState(2);
  const factor = steden[stad].factor;
  const maxBar = Math.max(...basisPosten.map((p) => Math.round(p.max * factor)));

  const totaalMin = Math.round(basisPosten.reduce((s, p) => s + p.min, 0) * factor);
  const totaalGem = Math.round(basisPosten.reduce((s, p) => s + p.gem, 0) * factor);
  const totaalMax = Math.round(basisPosten.reduce((s, p) => s + p.max, 0) * factor);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E6E9E7]">
      <div className="bg-[#16211F] px-5 py-4 flex items-start justify-between">
        <div>
          <p className="text-[#86BCAF] text-xs font-medium uppercase tracking-wider mb-0.5">
            Nibud / FinBuddy / CBS 2026
          </p>
          <p className="text-[#F7F8F7] text-sm font-medium">
            Kosten levensonderhoud alleenstaande
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#86BCAF] text-xs">Gemiddeld totaal</p>
          <p className="text-[#F7F8F7] text-xl font-semibold">
            €{totaalGem.toLocaleString("nl-NL")}/mnd
          </p>
        </div>
      </div>

      <div className="bg-[#F7F8F7] px-5 py-3 flex flex-wrap gap-2">
        {steden.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setStad(i)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              stad === i
                ? "bg-[#16211F] text-[#F7F8F7] border-[#16211F]"
                : "bg-white text-[#4A5A56] border-[#E6E9E7] hover:border-[#16211F]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="p-5 bg-[#FFFFFF]">
        <div className="space-y-3 mb-5">
          {basisPosten.map((post) => {
            const min = Math.round(post.min * factor);
            const gem = Math.round(post.gem * factor);
            const max = Math.round(post.max * factor);
            return (
              <div key={post.naam}>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#4A5A56] font-medium">{post.naam}</span>
                  <div className="flex gap-3 text-right">
                    <span className="text-[#8B958F]">min €{min}</span>
                    <span className="font-semibold text-[#16211F]">gem €{gem}</span>
                    <span className="text-[#8B958F]">max €{max}</span>
                  </div>
                </div>
                <div className="relative h-3 bg-[#F0F3F1] rounded-full overflow-hidden">
                  <div
                    className="absolute h-full rounded-full opacity-30"
                    style={{
                      width: `${(max / maxBar) * 100}%`,
                      backgroundColor: post.kleur,
                    }}
                  />
                  <div
                    className="absolute h-full rounded-full"
                    style={{
                      width: `${(gem / maxBar) * 100}%`,
                      backgroundColor: post.kleur,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E6E9E7]">
          <div className="text-center">
            <p className="text-xs text-[#8B958F] mb-1">Minimum</p>
            <p className="text-lg font-semibold text-[#4A5A56]">
              €{totaalMin.toLocaleString("nl-NL")}
            </p>
          </div>
          <div className="bg-[#E7F1EE] rounded-xl py-2 text-center">
            <p className="text-xs text-[#0B7A6E] mb-1">Gemiddeld</p>
            <p className="text-lg font-semibold text-[#16211F]">
              €{totaalGem.toLocaleString("nl-NL")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[#8B958F] mb-1">Maximum</p>
            <p className="text-lg font-semibold text-[#0B7A6E]">
              €{totaalMax.toLocaleString("nl-NL")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-[#F7F8F7] border-t border-[#E6E9E7]">
        <p className="text-xs text-[#8B958F]">
          Regionale factor gebaseerd op CBS huurprijsontwikkeling 2026 en
          FinBuddy regionale kostendata. Exclusief vrije tijd, kleding en
          vakantie.
        </p>
      </div>
    </div>
  );
}
