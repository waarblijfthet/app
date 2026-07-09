"use client";

import { useState } from "react";

type Maand = { maand: string; piek: string; kosten: string; tip: string };

const MAANDEN: Maand[] = [
  { maand: "Januari", piek: "Laag", kosten: "Nieuwjaarsdip & restje december", tip: "Reken de decembermaand na en evalueer." },
  { maand: "Februari", piek: "Laag", kosten: "Voorjaarsvakantie, wintersport", tip: "Wintersport? Reserveer er een apart potje voor." },
  { maand: "Maart", piek: "Midden", kosten: "Belastingaangifte, lentekleding kinderen", tip: "Controleer of je toeslagen nog kloppen." },
  { maand: "April", piek: "Midden", kosten: "Pasen, eventueel bijbetalen belasting", tip: "Houd ruimte voor een mogelijke naheffing." },
  { maand: "Mei", piek: "Midden", kosten: "Meivakantie, Moederdag, tuin/terras", tip: "Vakantiegeld komt eraan — geef het vooraf een doel." },
  { maand: "Juni", piek: "Hoog", kosten: "Vakantiegeld + zomervakantie boeken", tip: "Vakantiegeld is geen bonus; deels sparen loont." },
  { maand: "Juli", piek: "Hoog", kosten: "Zomervakantie (~€600 p.p.)", tip: "Reken de hele reis door, niet alleen de boeking." },
  { maand: "Augustus", piek: "Hoog", kosten: "Schoolspullen, sportcontributies, terug van vakantie", tip: "De 'schoolstart' is een verborgen piek — plan vooruit." },
  { maand: "September", piek: "Midden", kosten: "Nieuwe seizoensabonnementen, herfstkleding", tip: "Goed moment om abonnementen op te schonen." },
  { maand: "Oktober", piek: "Laag", kosten: "Herfstvakantie, energie loopt op", tip: "Check je energiecontract en het overstapseizoen." },
  { maand: "November", piek: "Midden", kosten: "Black Friday, Sinterklaas-inkopen starten", tip: "Black Friday: alleen kopen wat je tóch al wilde." },
  { maand: "December", piek: "Hoog", kosten: "Sinterklaas + kerst (~€500 samen)", tip: "Met een feestpotje voel je deze maand niet als klap." },
];

const KLEUR: Record<string, { bg: string; tekst: string }> = {
  Laag: { bg: "#E7F1EE", tekst: "#2D6A4F" },
  Midden: { bg: "#FDF3E3", tekst: "#92600A" },
  Hoog: { bg: "#FAE5DE", tekst: "#B03A2E" },
};

export default function SeizoensKalender() {
  const huidige = new Date().getMonth();
  const [open, setOpen] = useState<number>(huidige);

  return (
    <div className="rounded-2xl border border-[#E6E9E7] p-6 my-8" style={{ backgroundColor: "#FFFFFF" }}>
      <p className="font-body font-medium uppercase tracking-widest text-xs mb-2" style={{ color: "#0B7A6E" }}>
        Het hele jaar
      </p>
      <p className="font-display font-light text-[#16211F] text-xl mb-1">
        De seizoens-kostenkalender
      </p>
      <p className="font-body text-sm mb-5" style={{ color: "#4A5A56" }}>
        Klik op een maand om te zien welke stille kosten eraan komen.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {MAANDEN.map((m, i) => {
          const k = KLEUR[m.piek];
          const actief = open === i;
          return (
            <button
              key={m.maand}
              type="button"
              onClick={() => setOpen(i)}
              aria-pressed={actief}
              className="rounded-lg px-2 py-3 text-center transition-all"
              style={{
                backgroundColor: actief ? "#16211F" : k.bg,
                border: `1px solid ${actief ? "#16211F" : "transparent"}`,
              }}
            >
              <span className="font-body text-sm font-medium block" style={{ color: actief ? "white" : "#16211F" }}>
                {m.maand.slice(0, 3)}
              </span>
              <span className="font-body text-[10px]" style={{ color: actief ? "rgba(245,240,232,0.7)" : k.tekst }}>
                {m.piek}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl p-5" style={{ backgroundColor: "white", border: "1px solid #E6E9E7" }}>
        <p className="font-display font-light text-[#16211F] text-lg mb-1">{MAANDEN[open].maand}</p>
        <p className="font-body text-sm mb-3" style={{ color: "#4A5A56" }}>
          <strong>Komt eraan:</strong> {MAANDEN[open].kosten}
        </p>
        <p className="font-body text-sm" style={{ color: "#2D6A4F" }}>
          💡 {MAANDEN[open].tip}
        </p>
      </div>

      <p className="font-body text-xs mt-3" style={{ color: "#8B958F" }}>
        Wil je deze pieken op tijd in beeld?{" "}
        <a href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</a>.
      </p>
    </div>
  );
}
