"use client";
import { useState } from "react";

const lekpunten = [
  {
    naam: "Dagelijks boodschappen doen",
    gemiddeldExtra: 180,
    hoeVeel: "3-4x per week even snel wat halen",
    uitleg:
      "Wie dagelijks boodschappen doet, koopt zonder lijst en betaalt impulsen. Eén vaste boodschappendag scheelt gemiddeld €180 per maand bij een gezin van vier.",
    kleur: "#0B7A6E",
    lichtKleur: "#E4F1EE",
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
    kleur: "#0B7A6E",
    lichtKleur: "#E7F1EE",
  },
  {
    naam: "Drogisterij in de supermarkt",
    gemiddeldExtra: 85,
    hoeVeel: "Tandpasta, shampoo, wasmiddel 30-50% duurder dan DM",
    uitleg:
      "Drogisterijproducten in de supermarkt kosten structureel meer dan bij discounters of over de grens. Wie deze categorie scheidt, bespaart gemiddeld €85 per maand.",
    kleur: "#0A6A5F",
    lichtKleur: "#E7F1EE",
  },
  {
    naam: "Kant-en-klaar en gemak",
    gemiddeldExtra: 120,
    hoeVeel: "Maaltijdboxen, pizza's, kant-en-klare sauzen",
    uitleg:
      "Gemaksvoeding kost twee tot drie keer zoveel als zelf koken. Voor een gezin van vier dat twee keer per week kant-en-klaar eet: €120 per maand extra.",
    kleur: "#8B958F",
    lichtKleur: "#F0F3F1",
  },
];

export function BoodschappenLekkage() {
  const [actief, setActief] = useState<number | null>(null);
  const totaal = lekpunten.reduce((s, l) => s + l.gemiddeldExtra, 0);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E6E9E7]">
      <div className="bg-[#16211F] px-5 py-4 flex items-start justify-between">
        <div>
          <p className="text-[#86BCAF] text-xs font-medium uppercase tracking-wider mb-0.5">
            Consumentenbond / Nibud / Wageningen 2026
          </p>
          <p className="text-[#F7F8F7] text-sm font-medium">
            Waar lekt het meeste geld weg bij boodschappen?
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#86BCAF] text-xs">Totaal per maand</p>
          <p className="text-[#0B7A6E] text-xl font-semibold">+€{totaal}</p>
        </div>
      </div>

      <div className="p-5 bg-[#FFFFFF] space-y-3">
        {lekpunten.map((lek, i) => (
          <button
            key={lek.naam}
            onClick={() => setActief(actief === i ? null : i)}
            className="w-full text-left"
          >
            <div
              className={`rounded-xl p-4 transition-all ${
                actief === i ? "border-2" : "border border-[#E6E9E7]"
              }`}
              style={{
                backgroundColor: lek.lichtKleur,
                borderColor: actief === i ? lek.kleur : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-[#16211F]">{lek.naam}</p>
                <span
                  className="text-sm font-semibold px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: lek.kleur }}
                >
                  +€{lek.gemiddeldExtra}/mnd
                </span>
              </div>
              <p className="text-xs text-[#8B958F]">{lek.hoeVeel}</p>

              {actief === i && (
                <p className="text-sm text-[#4A5A56] mt-3 pt-3 border-t border-[#E6E9E7] leading-relaxed">
                  {lek.uitleg}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="px-5 py-3 bg-[#F7F8F7] border-t border-[#E6E9E7] flex items-center justify-between">
        <p className="text-xs text-[#8B958F]">
          Klik op een punt voor uitleg. Niet alle lekken zijn even makkelijk te
          dichten.
        </p>
        <p className="text-xs font-medium text-[#0B7A6E]">
          Totaal lek: €{totaal}/mnd
        </p>
      </div>
    </div>
  );
}
