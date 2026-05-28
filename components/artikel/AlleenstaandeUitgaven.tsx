"use client";
import { useState } from "react";

const steden = [
  { label: "Randstad (AMS/RTD/DH)", factor: 1.25 },
  { label: "Grote stad (Utrecht, Eindhoven)", factor: 1.1 },
  { label: "Middelgrote stad (Tilburg, Breda)", factor: 1.0 },
  { label: "Kleine stad / dorp", factor: 0.88 },
];

const basisPosten = [
  { naam: "Huur (inclusief servicekosten)", min: 850, gem: 1050, max: 1400, kleur: "#1C3A2A" },
  { naam: "Energie (gas + stroom + water)", min: 130, gem: 180, max: 280, kleur: "#2D6A4F" },
  { naam: "Zorgverzekering (na zorgtoeslag)", min: 80, gem: 130, max: 185, kleur: "#8AB89A" },
  { naam: "Internet + telefoon", min: 50, gem: 85, max: 130, kleur: "#C4603A" },
  { naam: "Boodschappen (incl. drogisterij)", min: 250, gem: 340, max: 450, kleur: "#E8A882" },
  { naam: "Vervoer (OV of auto)", min: 80, gem: 220, max: 480, kleur: "#4A5E4E" },
  { naam: "Overige verzekeringen", min: 40, gem: 80, max: 140, kleur: "#8A9E8E" },
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
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E8E0D4]">
      <div className="bg-[#1C3A2A] px-5 py-4 flex items-start justify-between">
        <div>
          <p className="text-[#8AB89A] text-xs font-medium uppercase tracking-wider mb-0.5">
            Nibud / FinBuddy / CBS 2026
          </p>
          <p className="text-[#F5F0E8] text-sm font-medium">
            Kosten levensonderhoud alleenstaande
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#8AB89A] text-xs">Gemiddeld totaal</p>
          <p className="text-[#F5F0E8] text-xl font-semibold">
            €{totaalGem.toLocaleString("nl-NL")}/mnd
          </p>
        </div>
      </div>

      <div className="bg-[#F5F0E8] px-5 py-3 flex flex-wrap gap-2">
        {steden.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setStad(i)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              stad === i
                ? "bg-[#1C3A2A] text-[#F5F0E8] border-[#1C3A2A]"
                : "bg-white text-[#4A5E4E] border-[#E8E0D4] hover:border-[#1C3A2A]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="p-5 bg-[#FDFAF4]">
        <div className="space-y-3 mb-5">
          {basisPosten.map((post) => {
            const min = Math.round(post.min * factor);
            const gem = Math.round(post.gem * factor);
            const max = Math.round(post.max * factor);
            return (
              <div key={post.naam}>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[#4A5E4E] font-medium">{post.naam}</span>
                  <div className="flex gap-3 text-right">
                    <span className="text-[#8A9E8E]">min €{min}</span>
                    <span className="font-semibold text-[#1C3A2A]">gem €{gem}</span>
                    <span className="text-[#8A9E8E]">max €{max}</span>
                  </div>
                </div>
                <div className="relative h-3 bg-[#EDE6D8] rounded-full overflow-hidden">
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

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E8E0D4]">
          <div className="text-center">
            <p className="text-xs text-[#8A9E8E] mb-1">Minimum</p>
            <p className="text-lg font-semibold text-[#4A5E4E]">
              €{totaalMin.toLocaleString("nl-NL")}
            </p>
          </div>
          <div className="bg-[#E8F2EC] rounded-xl py-2 text-center">
            <p className="text-xs text-[#2D6A4F] mb-1">Gemiddeld</p>
            <p className="text-lg font-semibold text-[#1C3A2A]">
              €{totaalGem.toLocaleString("nl-NL")}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-[#8A9E8E] mb-1">Maximum</p>
            <p className="text-lg font-semibold text-[#C4603A]">
              €{totaalMax.toLocaleString("nl-NL")}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 bg-[#F5F0E8] border-t border-[#E8E0D4]">
        <p className="text-xs text-[#8A9E8E]">
          Regionale factor gebaseerd op CBS huurprijsontwikkeling 2026 en
          FinBuddy regionale kostendata. Exclusief vrije tijd, kleding en
          vakantie.
        </p>
      </div>
    </div>
  );
}
