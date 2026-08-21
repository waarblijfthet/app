"use client";

import { useState } from "react";
import Link from "next/link";
import { rapportVoorSlug, AANTAL_ZONDER_LEK, RAPPORTEN } from "@/lib/rapporten-data";
import {
  VUISTREGEL,
  berekenVuistregel,
  euro,
  euroSigned,
} from "@/lib/salaris-vuistregel";

/**
 * Rekenlaag voor "scheiden-goed-inkomen-toch-niks-over" (klus A,
 * docs/artikel-bouwprompts-batch1-18-aug-2026.md, 18-aug-2026).
 *
 * Splitst één gezamenlijk inkomen in twee losse huishoudens via
 * berekenVuistregel() en telt daarna zelf op. Geen enkel bedrag hieronder is
 * met de hand getypt: de rekenaar leest lib/salaris-vuistregel.ts uit.
 *
 * De kernclaim van het artikel (het bedrag dat verdwijnt verandert niet als
 * je de verdeling verschuift) is een eigenschap van de formule, niet iets dat
 * hier apart is uitgerekend: wonen, energie, internet, lokale lasten,
 * abonnementen, verzekeringOverig en vervoer worden per huishouden bepaald,
 * niet per hoofd, dus de som over beide huishoudens hangt alleen af van het
 * totale inkomen en het aantal kinderen, niet van de verdeling.
 */

const RAPPORT = rapportVoorSlug("alleenstaande-ouder-twee-kinderen");

interface Props {
  startInkomen?: number;
  startKinderen?: number;
  kop?: string;
  intro?: string;
}

export default function TweeHuishoudensVergelijker({
  startInkomen = 6000,
  startKinderen = 2,
  kop = "Wat verdwijnt er echt als één huishouden twee wordt?",
  intro = "Zet hieronder het gezamenlijke inkomen van vóór de scheiding en het aantal kinderen. Schuif daarna de verdeling: je ziet dat het bedrag dat verdwijnt niet verandert, alleen wie het voelt.",
}: Props) {
  const [inkomen, setInkomen] = useState(startInkomen);
  const [kinderen, setKinderen] = useState(startKinderen);
  const [verdeling, setVerdeling] = useState(50);

  const voor = berekenVuistregel({ inkomen: inkomen, volwassenen: 2, kinderen: kinderen, auto: "eigen" });

  const inkomen1 = Math.round((inkomen * verdeling) / 100 / 10) * 10;
  const inkomen2 = inkomen - inkomen1;

  const huis1 = berekenVuistregel({ inkomen: inkomen1, volwassenen: 1, kinderen: kinderen, auto: "eigen" });
  const huis2 = berekenVuistregel({ inkomen: inkomen2, volwassenen: 1, kinderen: 0, auto: "eigen" });

  const naTotaal = huis1.verwachtOver + huis2.verwachtOver;
  const verdwenen = voor.verwachtOver - naTotaal;

  const vervoerDelta = huis1.vervoer + huis2.vervoer - voor.vervoer;
  const vasteLastenDelta =
    huis1.wonen + huis2.wonen - voor.wonen + (huis1.verzekeringen + huis2.verzekeringen - voor.verzekeringen);

  const geldscanHref1 = `/geldscan?situatie=alleenstaande-ouder&inkomen=${inkomen1}&boodschappen=${Math.round(huis1.boodschappen)}`;
  const analyseHref1 = `/analyse?inkomen=${inkomen1}&volwassenen=1&kinderen=${kinderen}&auto=eigen`;

  return (
    <div className="rounded-2xl p-5 sm:p-6 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
      <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>{kop}</p>
      <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>{intro}</p>

      <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <label className="block font-body text-sm mb-1" style={{ color: "#16211F", fontWeight: 500 }}>
          Netto huishoudinkomen vóór de scheiding, samen
        </label>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-display" style={{ fontSize: "1.9rem", fontWeight: 300, color: "#16211F" }}>{euro(inkomen)}</span>
        </div>
        <input
          type="range"
          min={3000}
          max={9000}
          step={50}
          value={inkomen}
          onChange={(e) => setInkomen(Number(e.target.value))}
          className="w-full accent-[#0B7A6E]"
          aria-label="Netto gezamenlijk inkomen vóór de scheiding"
        />

        <div className="mt-4">
          <p className="font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>Kinderen</p>
          <div className="flex flex-wrap gap-2">
            {[0, 1, 2, 3].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKinderen(k)}
                aria-pressed={kinderen === k}
                className="rounded-full font-body text-sm transition-colors"
                style={{
                  padding: "0.4rem 0.85rem",
                  backgroundColor: kinderen === k ? "#16211F" : "#FFFFFF",
                  color: kinderen === k ? "#FFFFFF" : "#4A5A56",
                  border: `1px solid ${kinderen === k ? "#16211F" : "#E6E9E7"}`,
                }}
              >
                {k === 3 ? "3 of meer" : k}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="block font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>
            Verdeling van het inkomen: {verdeling}% naar de ouder met de kinderen
          </label>
          <input
            type="range"
            min={30}
            max={70}
            step={5}
            value={verdeling}
            onChange={(e) => setVerdeling(Number(e.target.value))}
            className="w-full accent-[#0B7A6E]"
            aria-label="Verdeling van het inkomen tussen de twee huishoudens"
          />
        </div>
      </div>

      <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <div className="grid grid-cols-3 gap-2 text-center mb-3">
          <div>
            <p className="font-body text-[10px] uppercase tracking-wide" style={{ color: "#8B958F" }}>Vóór, samen</p>
            <p className="font-display tabular-nums" style={{ fontSize: "1.15rem", color: voor.verwachtOver < 0 ? "#B03A2E" : "#16211F" }}>
              {euroSigned(voor.verwachtOver)}
            </p>
          </div>
          <div>
            <p className="font-body text-[10px] uppercase tracking-wide" style={{ color: "#8B958F" }}>Met de kinderen</p>
            <p className="font-display tabular-nums" style={{ fontSize: "1.15rem", color: huis1.verwachtOver < 0 ? "#B03A2E" : "#16211F" }}>
              {euroSigned(huis1.verwachtOver)}
            </p>
          </div>
          <div>
            <p className="font-body text-[10px] uppercase tracking-wide" style={{ color: "#8B958F" }}>Zonder de kinderen</p>
            <p className="font-display tabular-nums" style={{ fontSize: "1.15rem", color: huis2.verwachtOver < 0 ? "#B03A2E" : "#16211F" }}>
              {euroSigned(huis2.verwachtOver)}
            </p>
          </div>
        </div>

        <div className="rounded-lg p-3" style={{ backgroundColor: verdwenen > 0 ? "#FDF3E3" : "#E7F1EE" }}>
          <p className="font-body font-medium text-sm mb-1" style={{ color: verdwenen > 0 ? "#92600A" : "#0B7A6E" }}>
            {verdwenen > 0
              ? `Er verdwijnt ${euro(verdwenen)} per maand, ${euro(verdwenen * 12)} per jaar.`
              : "Bij dit inkomen en dit aantal kinderen verdwijnt er per saldo niets, de twee huishoudens samen komen niet slechter uit dan het ene huishouden ervoor."}
          </p>
          <p className="font-body text-xs" style={{ color: "#5A6B66" }}>
            Verschuif de verdeling hierboven: dit bedrag blijft gelijk. Wat verandert, is wie van de twee het
            tekort voelt.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-4">
          {[
            ["Wonen en vaste lasten, twee keer een basis", vasteLastenDelta],
            ["Vervoer, als beiden zelf blijven rijden", vervoerDelta],
            ["Boodschappen, twee keer een basisbedrag", huis1.boodschappen + huis2.boodschappen - voor.boodschappen],
            ["Abonnementen, twee keer " + euro(VUISTREGEL.abonnementen), VUISTREGEL.abonnementen],
          ].map(([label, bedrag]) => (
            <div key={label as string} className="flex justify-between gap-2 py-1" style={{ borderBottom: "1px solid #F0F3F1" }}>
              <span className="font-body text-xs" style={{ color: "#8B958F" }}>{label}</span>
              <span className="font-body text-xs tabular-nums" style={{ color: "#4A5A56" }}>{euro(bedrag as number)} erbij</span>
            </div>
          ))}
        </div>

        {RAPPORT && (
          <div className="rounded-lg p-3 mt-4" style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7" }}>
            <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.6 }}>
              &ldquo;{RAPPORT.vermoedenBedrag}&rdquo; dacht een alleenstaande ouder met twee kinderen die ik
              doorrekende, vooraf. Mijn conclusie: &ldquo;{RAPPORT.uitkomstKop}.&rdquo;{" "}
              <Link href={`/rapporten/${RAPPORT.slug}`} className="hover:underline" style={{ color: "#0B7A6E" }}>
                Lees haar rapport
              </Link>
              .
            </p>
          </div>
        )}

        <p className="font-body text-xs mt-4" style={{ color: "#5A6B66" }}>
          Deze rekensom kent geen kinderalimentatie en geen kinderopvangtoeslag. Bij jou kunnen die het beeld
          flink veranderen, precies iets waar een rapport wel naar kijkt en een vuistregel niet.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Link href={analyseHref1} className="btn-primary text-center">
            Doe de gratis analyse &rarr;
          </Link>
        </div>
        <p className="font-body text-sm mt-3 mb-0">
          <Link href={geldscanHref1} className="hover:underline" style={{ color: "#0B7A6E", textDecoration: "none" }}>
            Wil je na de analyse weten waarom jouw situatie zo uitpakt? Bekijk de Geldscan &rarr;
          </Link>
        </p>
      </div>

      <p className="font-body text-xs mt-3 mb-0" style={{ color: "#5A6B66" }}>
        Vergelijkingsbedragen op basis van de vijf huishoudens die ik zelf heb doorgerekend, zie{" "}
        <Link href="/rapporten" className="hover:underline" style={{ color: "#0B7A6E" }}>Rapporten</Link>
        . Niet elke Geldscan vindt een lek: bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} was er niets te
        repareren.
      </p>
    </div>
  );
}
