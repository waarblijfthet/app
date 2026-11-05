"use client";

import { useState } from "react";
import Link from "next/link";
import type { MaandGevoel } from "@/lib/quiz-types";
import { NAKIJKEN_ROUTE } from "@/lib/cta";
import { logGebeurtenis } from "@/lib/track";

/**
 * Het scherm vóór de analyse: sinds 30-okt-2026 is dat vraag 1 zelf.
 *
 * Ontwerp gekozen door Jarno op het design-canvas "Introscherm analyse
 * mobiel", richting B ("Vraag 1 als begin van de analyse"), met zijn
 * aanvulling: geen voorbeeld eronder, het moet rustig zijn. Kop "Waar blijft
 * je geld?" in plaats van "jullie", want een deel van de bezoekers woont
 * alleen (Jarno, 30-okt-2026). Zie
 * docs/introscherm-analyse-30-okt-2026.md en bouwvolgorde sectie 43.
 *
 * Waarom zo:
 * - Bijna iedereen komt hier uit een artikel en tikte daar al op "Bekijk mijn
 *   financiële situatie". Een tweede startknop was een dubbele klik.
 * - De eerste versie van 30 okt (drie knoppen onder de kop, en onderaan nog
 *   eens) maakte niet duidelijk dat je daarmee start, en stond er twee keer.
 *   Nu staat de vraag in een kaart met "Vraag 1 van ongeveer 25" en een
 *   voortgangsbalk, met keuzerondjes, zodat zichtbaar is dat je al in de
 *   analyse zit. Eén keer, verder niets.
 * - "± 3 minuten": wie afrondt doet er mediaan 3,4 minuten over (sinds
 *   7-sep-2026). "Een schatting is genoeg" staat in de kaart, want 8 van de 17
 *   afhakers stopten in het inkomensblok.
 * - Hulpteksten in #5F6B66 in plaats van text-muted (#8B958F): dat grijs haalt
 *   op deze achtergrond geen 4,5:1.
 *
 * De drie labels zijn dezelfde als op het scherm maand-gevoel in
 * schermen/index.tsx (CRLF, bewust niet aangeraakt). Verander je ze, verander
 * ze dan op beide plekken. Een tik slaat dat scherm over (QuizClient,
 * startMetGevoel); met "vorige" kan de bezoeker er nog naar terug.
 */

const GEVOEL_OPTIES: { value: MaandGevoel; label: string }[] = [
  { value: "ruim", label: "Er blijft ruim wat over" },
  { value: "net", label: "Het is net genoeg" },
  { value: "tekort", label: "Te weinig, ik vul aan uit spaargeld of sta rood" },
];

const HULP = "#5F6B66";

export default function IntroScherm({
  onStartMetGevoel,
}: {
  onStartMetGevoel: (g: MaandGevoel, plek: "boven" | "onder") => void;
}) {
  const [gekozen, setGekozen] = useState<MaandGevoel | null>(null);

  function kies(g: MaandGevoel) {
    if (gekozen) return;
    setGekozen(g);
    // Kort het gekozen rondje laten zien, zoals de andere keuzeschermen doen.
    window.setTimeout(() => onStartMetGevoel(g, "boven"), 300);
  }

  return (
    <div className="max-w-[560px] mx-auto pt-1 md:pt-8">
      <div className="mb-6">
        <p className="font-body font-medium text-xs uppercase tracking-widest mb-2.5" style={{ color: HULP }}>
          Gratis analyse
        </p>
        <h1 className="font-display font-light text-primary text-[30px] sm:text-4xl leading-[1.12] mb-2.5">
          Waar blijft je geld?
        </h1>
        <p className="font-body text-[15px] sm:text-base leading-relaxed text-text-soft">
          In 3 minuten zie je wat je niet kunt aanwijzen, en waar je afwijkt van huishoudens zoals het jouwe.
        </p>
      </div>

      <section className="bg-white border border-[#E6E9E7] rounded-[18px] shadow-card p-5 sm:p-7">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-body text-[13px] font-semibold text-accent">Vraag 1 van ongeveer 25</p>
            <p className="font-body text-[13px]" style={{ color: HULP }}>
              ± 3 minuten
            </p>
          </div>
          <div className="h-1.5 rounded-full bg-[#EEF1EF] overflow-hidden">
            <div className="h-1.5 rounded-full bg-accent" style={{ width: "4%" }} />
          </div>
        </div>

        <h2
          id="vraag-1"
          className="font-display font-normal text-primary text-[22px] sm:text-2xl leading-[1.25] mb-4"
        >
          Hoe is het meestal aan het eind van de maand?
        </h2>

        <div className="space-y-2.5" role="radiogroup" aria-labelledby="vraag-1">
          {GEVOEL_OPTIES.map((o) => {
            const aan = gekozen === o.value;
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={aan}
                onClick={() => kies(o.value)}
                className={`w-full min-h-[56px] rounded-[14px] border-[1.5px] px-4 py-3 flex items-center gap-3.5 text-left font-body text-base text-primary transition-colors ${
                  aan ? "border-accent bg-green-light" : "border-[#D9DEDC] bg-white hover:border-accent"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`shrink-0 w-[22px] h-[22px] rounded-full border-2 box-border flex items-center justify-center ${
                    aan ? "border-accent" : "border-[#9AA5A0]"
                  }`}
                >
                  {aan && <span className="w-2.5 h-2.5 rounded-full bg-accent" />}
                </span>
                {o.label}
              </button>
            );
          })}
        </div>

        <p className="font-body text-[13px] leading-relaxed text-text-soft mt-4">
          Tik een antwoord aan, dan ga je door naar vraag 2. Een schatting is genoeg, je hoeft niets op te zoeken.
        </p>
      </section>

      <p className="font-body text-[13px] leading-relaxed text-center mt-6" style={{ color: HULP }}>
        Anoniem · geen bankgegevens · je hoeft niets te kopen
      </p>

      {/* 5-nov-2026: de tweede ingang, voor wie al een overzicht heeft. Klein,
          zodat de vraag hierboven de start blijft. */}
      <p className="font-body text-[13px] leading-relaxed text-center mt-3" style={{ color: HULP }}>
        Heb je al een overzicht van je uitgaven?{" "}
        <Link
          href={NAKIJKEN_ROUTE}
          onClick={() =>
            logGebeurtenis("cta_splitsing", {
              pakket: "geldscan",
              meta: { plek: "analyse-intro", keuze: "ja", pagina: "/analyse", vervolgpagina: NAKIJKEN_ROUTE },
            })
          }
          className="underline underline-offset-2 hover:opacity-80"
          style={{ color: "#0B7A6E" }}
        >
          Laat het nakijken
        </Link>
      </p>
    </div>
  );
}
