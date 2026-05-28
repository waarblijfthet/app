"use client";
import { useState } from "react";

const lekpunten = [
  {
    naam: "Dagelijks boodschappen doen",
    gemiddeldExtra: 180,
    hoeVeel: "3-4x per week even snel wat halen",
    uitleg:
      "Wie dagelijks boodschappen doet, koopt zonder lijst en betaalt impulsen. Eén vaste boodschappendag scheelt gemiddeld €180 per maand bij een gezin van vier.",
    kleur: "#C4603A",
    lichtKleur: "#FAF0EB",
  },
  {
    naam: "Voedselverspilling",
    gemiddeldExtra: 65,
    hoeVeel: "14% van alle boodschappen belandt in de prullenbak",
    uitleg:
      "Een gemiddeld Nederlands huishouden gooit €65 per maand aan eten weg. Niet door luxe maar door slechte planning. Weekmenu's reduceren dit met 60%.",
    kleur: "#92600A",
    lichtKleur: "#FDF3E3",
  },
  {
    naam: "A-merken vs. huismerk",
    gemiddeldExtra: 90,
    hoeVeel: "A-merken zijn gemiddeld 57% duurder (Consumentenbond)",
    uitleg:
      "Niet alles is hetzelfde als huismerk. Maar pasta, rijst, melk, eieren, bloem — daar merk je het verschil niet. Gemiddelde besparing bij 50% overstap: €90 per maand.",
    kleur: "#2D6A4F",
    lichtKleur: "#E8F2EC",
  },
  {
    naam: "Drogisterij in de supermarkt",
    gemiddeldExtra: 85,
    hoeVeel: "Tandpasta, shampoo, wasmiddel 30-50% duurder dan DM",
    uitleg:
      "Drogisterijproducten in de supermarkt kosten structureel meer dan bij discounters of over de grens. Wie deze categorie scheidt, bespaart gemiddeld €85 per maand.",
    kleur: "#1B5E8A",
    lichtKleur: "#E8F2FA",
  },
  {
    naam: "Kant-en-klaar en gemak",
    gemiddeldExtra: 120,
    hoeVeel: "Maaltijdboxen, pizza's, kant-en-klare sauzen",
    uitleg:
      "Gemaksvoeding kost twee tot drie keer zoveel als zelf koken. Voor een gezin van vier dat twee keer per week kant-en-klaar eet: €120 per maand extra.",
    kleur: "#8A9E8E",
    lichtKleur: "#EDE6D8",
  },
];

export function BoodschappenLekkage() {
  const [actief, setActief] = useState<number | null>(null);
  const totaal = lekpunten.reduce((s, l) => s + l.gemiddeldExtra, 0);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E8E0D4]">
      <div className="bg-[#1C3A2A] px-5 py-4 flex items-start justify-between">
        <div>
          <p className="text-[#8AB89A] text-xs font-medium uppercase tracking-wider mb-0.5">
            Consumentenbond / Nibud / Wageningen 2026
          </p>
          <p className="text-[#F5F0E8] text-sm font-medium">
            Waar lekt het meeste geld weg bij boodschappen?
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#8AB89A] text-xs">Totaal per maand</p>
          <p className="text-[#C4603A] text-xl font-semibold">+€{totaal}</p>
        </div>
      </div>

      <div className="p-5 bg-[#FDFAF4] space-y-3">
        {lekpunten.map((lek, i) => (
          <button
            key={lek.naam}
            onClick={() => setActief(actief === i ? null : i)}
            className="w-full text-left"
          >
            <div
              className={`rounded-xl p-4 transition-all ${
                actief === i ? "border-2" : "border border-[#E8E0D4]"
              }`}
              style={{
                backgroundColor: lek.lichtKleur,
                borderColor: actief === i ? lek.kleur : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-[#1C3A2A]">{lek.naam}</p>
                <span
                  className="text-sm font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: lek.kleur }}
                >
                  +€{lek.gemiddeldExtra}/mnd
                </span>
              </div>
              <p className="text-xs text-[#8A9E8E]">{lek.hoeVeel}</p>

              {actief === i && (
                <p className="text-sm text-[#4A5E4E] mt-3 pt-3 border-t border-[#E8E0D4] leading-relaxed">
                  {lek.uitleg}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="px-5 py-3 bg-[#F5F0E8] border-t border-[#E8E0D4] flex items-center justify-between">
        <p className="text-xs text-[#8A9E8E]">
          Klik op een punt voor uitleg. Niet alle lekken zijn even makkelijk te
          dichten.
        </p>
        <p className="text-xs font-medium text-[#C4603A]">
          Totaal lek: €{totaal}/mnd
        </p>
      </div>
    </div>
  );
}
