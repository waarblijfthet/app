"use client";
import { useState } from "react";

const profielen = [
  {
    label: "Alleenstaand",
    nibud: 200,
    werkelijk: 310,
    nibudUitleg:
      "Nibud rekent €200 minimaal voor voeding. Exclusief drogisterij, bakker en tussendoor.",
    werkelijkUitleg:
      "Werkelijk gemiddelde inclusief drogisterij, koffie en kleine aankopen.",
    bron: "Nibud Prijzengids 2025/2026, HetGeldCollege.nl",
  },
  {
    label: "Stel, geen kinderen",
    nibud: 370,
    werkelijk: 580,
    nibudUitleg:
      "Nibud rekent €370 voor twee volwassenen. Alleen voeding, geen drogisterij.",
    werkelijkUitleg:
      "Uit forum-polls en bloggers: gemiddeld €500-650 inclusief alle huishoudelijke inkopen.",
    bron: "Nibud 2026, Zeg maar Yes forum-poll (n=51)",
  },
  {
    label: "Gezin + 1 kind",
    nibud: 490,
    werkelijk: 700,
    nibudUitleg:
      "Nibud rekent per leeftijdsgroep. Kind van 8 jaar: +€4,39 per dag aan voeding.",
    werkelijkUitleg:
      "Schoollunch, tussendoortjes en kinderopvang-snacks komen er praktisch bovenop.",
    bron: "Nibud Prijzengids 2025/2026, Mamablogger.nl 2025",
  },
  {
    label: "Gezin + 2 kinderen",
    nibud: 627,
    werkelijk: 875,
    nibudUitleg:
      "Officiële Nibud-norm voor twee ouders + twee kinderen (8 en 13 jaar).",
    werkelijkUitleg:
      "Mamablogger gezin van 4: €737/mnd bij AH alleen al. \"Niet eens zo gek.\"",
    bron: "Nibud 2026, Mamablogger.nl, Zeg maar Yes forum",
  },
  {
    label: "Gezin + 3 kinderen (pubers)",
    nibud: 700,
    werkelijk: 1200,
    nibudUitleg:
      "Nibud onderschat structureel hoeveel tieners eten. Rekent minder dan werkelijk.",
    werkelijkUitleg:
      "Drie kinderen van 8-14 jaar eten bijna net zoveel als volwassenen. €1.000-1.400 is realistisch.",
    bron: "Nibud 2026, ervaringsdata waarblijfthet.nl",
  },
];

export function NibudVergelijker() {
  const [actief, setActief] = useState(3);
  const d = profielen[actief];
  const kloof = d.werkelijk - d.nibud;
  const kloofPct = Math.round((kloof / d.nibud) * 100);
  const maxBar = 1400;

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E8E0D4]">
      <div className="bg-[#1C3A2A] px-5 py-4 flex items-start justify-between">
        <div>
          <p className="text-[#8AB89A] text-xs font-medium uppercase tracking-wider mb-0.5">
            Nibud Prijzengids 2025/2026 vs. werkelijkheid
          </p>
          <p className="text-[#F5F0E8] text-sm font-medium">
            Hoe groot is de kloof bij jouw gezin?
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#8AB89A] text-xs">Kloof</p>
          <p className="text-[#C4603A] text-xl font-semibold">+{kloofPct}%</p>
        </div>
      </div>

      <div className="bg-[#F5F0E8] px-5 py-3 flex flex-wrap gap-2">
        {profielen.map((p, i) => (
          <button
            key={p.label}
            onClick={() => setActief(i)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
              actief === i
                ? "bg-[#1C3A2A] text-[#F5F0E8] border-[#1C3A2A]"
                : "bg-white text-[#4A5E4E] border-[#E8E0D4] hover:border-[#1C3A2A]"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="p-5 bg-[#FDFAF4]">
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-[#EDE6D8] rounded-xl p-4">
            <p className="text-xs text-[#8A9E8E] mb-1">Nibud minimum 2026</p>
            <p className="text-2xl font-semibold text-[#4A5E4E]">€{d.nibud}</p>
            <p className="text-xs text-[#8A9E8E] mt-2 leading-relaxed">
              {d.nibudUitleg}
            </p>
          </div>
          <div className="bg-[#FAF0EB] rounded-xl p-4 border border-[#F0D8C8]">
            <p className="text-xs text-[#C4603A] mb-1">Werkelijk gemiddelde</p>
            <p className="text-2xl font-semibold text-[#1C3A2A]">
              €{d.werkelijk}
            </p>
            <p className="text-xs text-[#8A9E8E] mt-2 leading-relaxed">
              {d.werkelijkUitleg}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#4A5E4E]">Nibud norm</span>
              <span className="font-medium text-[#4A5E4E]">€{d.nibud}</span>
            </div>
            <div className="h-5 bg-[#EDE6D8] rounded-lg overflow-hidden">
              <div
                className="h-full bg-[#2D6A4F] rounded-lg flex items-center px-2 transition-all duration-500"
                style={{ width: `${(d.nibud / maxBar) * 100}%` }}
              >
                <span className="text-white text-xs font-medium">Nibud</span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#4A5E4E]">Werkelijk gemiddelde</span>
              <span className="font-medium text-[#C4603A]">€{d.werkelijk}</span>
            </div>
            <div className="h-5 bg-[#EDE6D8] rounded-lg overflow-hidden">
              <div
                className="h-full bg-[#C4603A] rounded-lg flex items-center px-2 transition-all duration-500"
                style={{ width: `${(d.werkelijk / maxBar) * 100}%` }}
              >
                <span className="text-white text-xs font-medium">
                  +€{kloof}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#F5F0E8] rounded-xl p-3 text-xs text-[#8A9E8E]">
          Bron: {d.bron}
        </div>
      </div>
    </div>
  );
}
