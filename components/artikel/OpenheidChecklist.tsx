"use client";

import { useState } from "react";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";

/**
 * Checklist voor N3, "financiele ontrouw".
 *
 * Bewust geen rekenaar en bewust geen diagnose (brief N3, copyregel 5). Vijf
 * ja-of-nee-vragen over of jullie beeld klopt met de cijfers. De uitkomst is
 * geen score en geen oordeel over een persoon, maar een zin over de eerste
 * stap. Bij twee of meer keer nee is die zin: samen de vergelijking doen is de
 * neutraalste eerste stap.
 *
 * De vragen gaan expres over het huishouden en niet over de partner: "weten we
 * allebei ongeveer wat er per maand uitgaat" en niet "verzwijgt hij iets". Een
 * checklist die aanwijzingen voor bedrog verzamelt is precies het soort ding
 * dat deze site niet moet maken.
 */

const VRAGEN = [
  "Weten jullie allebei ongeveer wat er per maand aan vaste lasten uitgaat?",
  "Weten jullie van elkaar welke rekeningen en spaarrekeningen er zijn?",
  "Klopt wat er aan het eind van de maand overblijft ongeveer met wat jullie verwachtten?",
  "Zijn er dit jaar leningen, aankopen op afbetaling of achteraf-betaalregelingen bijgekomen die jullie allebei kennen?",
  "Kun je dit rijtje samen doornemen zonder dat het een ruzie wordt?",
];

type Antwoord = "ja" | "nee" | null;

export default function OpenheidChecklist() {
  const [antwoorden, setAntwoorden] = useState<Antwoord[]>([null, null, null, null, null]);

  function zet(i: number, waarde: Antwoord) {
    setAntwoorden((huidig) => {
      const kopie = huidig.slice();
      kopie[i] = kopie[i] === waarde ? null : waarde;
      return kopie;
    });
  }

  const beantwoord = antwoorden.filter((a) => a !== null).length;
  const aantalNee = antwoorden.filter((a) => a === "nee").length;
  const klaar = beantwoord === VRAGEN.length;

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 mb-8"
      style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
    >
      <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
        Klopt jullie beeld met de cijfers?
      </p>
      <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
        Vijf vragen over het huishouden, niet over je partner. Er komt geen score uit en geen
        conclusie over een persoon; alleen een zin over wat een verstandige eerste stap is.
      </p>

      <div className="space-y-2 mb-4">
        {VRAGEN.map((vraag, i) => (
          <div
            key={vraag}
            className="rounded-xl p-3 flex flex-col sm:flex-row sm:items-center gap-3"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}
          >
            <span className="font-body text-sm flex-1" style={{ color: "#16211F" }}>
              {vraag}
            </span>
            <span className="flex gap-2 shrink-0">
              {(["ja", "nee"] as const).map((waarde) => {
                const actief = antwoorden[i] === waarde;
                return (
                  <button
                    key={waarde}
                    type="button"
                    onClick={() => zet(i, waarde)}
                    aria-pressed={actief}
                    className="rounded-full font-body text-sm transition-colors"
                    style={{
                      padding: "0.35rem 1.1rem",
                      backgroundColor: actief ? "#16211F" : "#FFFFFF",
                      color: actief ? "#FFFFFF" : "#4A5A56",
                      border: `1px solid ${actief ? "#16211F" : "#E6E9E7"}`,
                    }}
                  >
                    {waarde === "ja" ? "Ja" : "Nee"}
                  </button>
                );
              })}
            </span>
          </div>
        ))}
      </div>

      {klaar && (
        <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
          {aantalNee >= 2 ? (
            <>
              <p className="font-body text-sm mb-3" style={{ color: "#16211F" }}>
                Je hebt {aantalNee} keer nee geantwoord. Dat zegt niets over wat er aan de hand is,
                en het is geen aanwijzing voor iets. Wat het wel zegt is dat jullie op meerdere
                punten een verschillend beeld hebben van dezelfde maand. Samen de vergelijking doen
                is dan de neutraalste eerste stap: die kent het verhaal van geen van beiden.
              </p>
              <CtaLink
                doel="analyse"
                href={analyseHref({ situatie: "stel" })}
                locatie="checklist"
                className="inline-block rounded-full px-5 py-2.5 font-body text-sm font-semibold"
                style={{ backgroundColor: "#0B7A6E", color: "#FFFFFF", textDecoration: "none" }}
              >
                Doe de gratis analyse samen
              </CtaLink>
            </>
          ) : (
            <p className="font-body text-sm" style={{ color: "#16211F" }}>
              Je hebt {aantalNee === 0 ? "alles" : "bijna alles"} met ja beantwoord. Dan is het
              beeld dat jullie van de maand hebben in grote lijnen hetzelfde, en is er geen reden om
              hier iets achter te zoeken. Blijft het gevoel dat er geld verdwijnt, dan gaat dat
              waarschijnlijk niet over openheid maar over de vraag waar het heen gaat, en dat is een
              andere vraag met een ander antwoord.
            </p>
          )}
          <p className="font-body text-xs mt-3" style={{ color: "#8B958F" }}>
            Gaat het bij jullie over schulden die niet meer te betalen zijn, dan is schuldhulp via
            de gemeente de juiste plek en is die kosteloos. Gaat het over vertrouwen en niet meer
            over bedragen, dan hoort dat bij een{" "}
            <Link href="/samenwerken/relatietherapeuten" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">
              relatietherapeut
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
