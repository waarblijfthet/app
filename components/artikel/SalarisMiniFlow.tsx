"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref, type SituatieSleutel } from "@/lib/cta";
import { berekenVuistregel, euro, geldscanSituatie, type AutoKeuze } from "@/lib/salaris-vuistregel";

/**
 * Persoonlijke trigger onder de vergelijking op het 4.000-euro-artikel.
 *
 * Reden (28-aug-2026): de oude SalarisRekenaar op deze pagina vroeg meteen om
 * inkomen, huishouden en vervoer tegelijk en beantwoordde de volledige
 * begroting gratis. Dat maakte de rekenaar een eindpunt in plaats van een
 * opstap. Deze versie is bewust beperkt tot drie tikken en één optioneel
 * getal, op het vaste bedrag van dit artikel (4.000 euro), en laat de vraag
 * "waarom wijk ik af" onbeantwoord. Dat antwoord staat in de gratis analyse.
 *
 * Dit component is uitsluitend voor dit artikel. SalarisRekenaar blijft
 * ongewijzigd, want die staat nog op acht andere artikelen.
 */

const INKOMEN = 4000;

type Volwassenen = 1 | 2;
type KindAntwoord = 0 | 1 | 2 | 3;
type Stap = 1 | 2 | 3 | 4;

/**
 * Hoeveel euro verschil nog telt als "ongeveer gelijk". Ruimer dan de 50 euro
 * in de volledige rekenaar verderop in dit artikel, want deze vergelijking
 * vraagt maar drie dingen en mag daardoor grover zijn.
 */
const SCENARIO_DREMPEL = 150;

export default function SalarisMiniFlow() {
  const [stap, setStap] = useState<Stap>(1);
  const [volwassenen, setVolwassenen] = useState<Volwassenen | null>(null);
  const [kinderen, setKinderen] = useState<KindAntwoord | null>(null);
  const [auto, setAuto] = useState<AutoKeuze | null>(null);
  const [werkelijkOver, setWerkelijkOver] = useState("");

  const werkelijk = werkelijkOver.replace(/[^0-9]/g, "");
  const heeftWerkelijk = werkelijk.length > 0;

  const klaar = volwassenen !== null && kinderen !== null && auto !== null;
  const resultaat = klaar
    ? berekenVuistregel({ inkomen: INKOMEN, volwassenen, kinderen, auto })
    : null;

  const gat = resultaat && heeftWerkelijk ? resultaat.verwachtOver - Number(werkelijk) : 0;
  const scenario: "A" | "B" | "C" | null =
    resultaat && heeftWerkelijk
      ? gat > SCENARIO_DREMPEL
        ? "B"
        : gat < -SCENARIO_DREMPEL
        ? "C"
        : "A"
      : null;

  const situatieHref =
    klaar &&
    analyseHref({
      situatie: geldscanSituatie(volwassenen as Volwassenen, kinderen as number) as SituatieSleutel,
      inkomen: INKOMEN,
    });

  function vorige() {
    setStap((s) => (s > 1 ? ((s - 1) as Stap) : s));
  }

  return (
    <div
      id="mijn-situatie"
      className="rounded-2xl p-5 sm:p-6 my-8"
      style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4", scrollMarginTop: "96px" }}
    >
      {stap !== 4 && <Voortgang stap={stap} onVorige={stap !== 1 ? vorige : undefined} />}

      {stap === 1 && (
        <StapVraag titel="Met hoeveel volwassenen leef je?">
          <Knoppen kolommen={2}>
            <StapKnop onClick={() => { setVolwassenen(1); setStap(2); }}>Alleen</StapKnop>
            <StapKnop onClick={() => { setVolwassenen(2); setStap(2); }}>Samen</StapKnop>
          </Knoppen>
        </StapVraag>
      )}

      {stap === 2 && (
        <StapVraag titel="Hoeveel kinderen wonen thuis?">
          <Knoppen kolommen={4}>
            {([0, 1, 2, 3] as const).map((k) => (
              <StapKnop key={k} onClick={() => { setKinderen(k); setStap(3); }}>
                {k === 3 ? "3 of meer" : k}
              </StapKnop>
            ))}
          </Knoppen>
        </StapVraag>
      )}

      {stap === 3 && (
        <StapVraag titel={"Hoeveel auto’s betalen jullie zelf?"}>
          <Knoppen kolommen={3}>
            <StapKnop onClick={() => { setAuto("geen"); setStap(4); }}>Geen auto</StapKnop>
            <StapKnop onClick={() => { setAuto("eigen"); setStap(4); }}>1 auto</StapKnop>
            <StapKnop onClick={() => { setAuto("twee"); setStap(4); }}>2 of meer</StapKnop>
          </Knoppen>
        </StapVraag>
      )}

      {stap === 4 && resultaat && (
        <div>
          <button
            type="button"
            onClick={vorige}
            className="font-body text-sm mb-4"
            style={{ color: "#0B7A6E", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            &larr; Wijzig je situatie
          </button>

          <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
            <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: "#0B7A6E" }}>
              Bij een huishouden zoals dat van jou verwacht ik ongeveer
            </p>
            <p
              className="font-display mb-1"
              style={{
                fontSize: "2.2rem",
                fontWeight: 300,
                color: resultaat.verwachtOver < 0 ? "#B03A2E" : "#16211F",
                lineHeight: 1.1,
              }}
            >
              {resultaat.verwachtOver < 0 ? "-" + euro(Math.abs(resultaat.verwachtOver)) : euro(resultaat.verwachtOver)}
            </p>
            <p className="font-body text-sm mb-3" style={{ color: "#4A5A56" }}>
              {resultaat.verwachtOver < 0
                ? "per maand tekort volgens deze vergelijking."
                : "financiële ruimte per maand."}
            </p>
            <p className="font-body text-xs mb-0" style={{ color: "#8B958F" }}>
              Dit is een vergelijking op basis van mijn eigen vuistregel en de huishoudens die ik heb
              doorgerekend. Het is geen norm en jouw werkelijke situatie kan afwijken.
            </p>
          </div>

          <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
            <label
              htmlFor="mini-flow-werkelijk"
              className="block font-body text-sm mb-1"
              style={{ color: "#16211F", fontWeight: 500 }}
            >
              En hoeveel blijft er bij jullie werkelijk over?
            </label>
            <p className="font-body text-xs mb-2" style={{ color: "#8B958F" }}>
              Denk aan wat er gemiddeld per maand echt overblijft nadat jullie gewone uitgaven zijn
              betaald.
            </p>
            <input
              id="mini-flow-werkelijk"
              type="text"
              inputMode="numeric"
              value={werkelijkOver}
              onChange={(e) => setWerkelijkOver(e.target.value)}
              placeholder="Bijvoorbeeld €250"
              className="w-full rounded-lg px-3 py-2 font-body text-sm"
              style={{ border: "1px solid #E6E9E7", color: "#16211F", outline: "none" }}
            />

            {scenario === "A" && (
              <div className="mt-4">
                <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
                  Jullie lijken redelijk in de buurt te zitten van wat ik bij een vergelijkbaar
                  huishouden zou verwachten.
                </p>
                <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
                  Dat betekent niet dat alle keuzes hetzelfde zijn. De vergelijking laat alleen zien dat
                  er op hoofdlijnen geen groot verschil zichtbaar is.
                </p>
                {situatieHref && (
                  <CtaLink doel="analyse" href={situatieHref} locatie="mini-flow-resultaat" className="btn-primary text-center">
                    Bekijk waar jullie nog van afwijken &rarr;
                  </CtaLink>
                )}
              </div>
            )}

            {scenario === "B" && (
              <div className="mt-4 rounded-lg p-3" style={{ backgroundColor: "#FDF3E3" }}>
                <p className="font-body font-medium text-sm mb-2" style={{ color: "#92600A" }}>
                  Hier zit mogelijk iets interessants.
                </p>
                <p className="font-body text-sm mb-1" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
                  Bij een huishouden zoals dat van jullie verwacht ik ongeveer {euro(resultaat.verwachtOver)}{" "}
                  financiële ruimte. Jij geeft aan dat er ongeveer {euro(Number(werkelijk))} overblijft.
                </p>
                <p className="font-body font-medium text-sm mb-3" style={{ color: "#92600A" }}>
                  Dat is ongeveer {euro(gat)} minder dan ik zou verwachten.
                </p>
                <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
                  Dat betekent niet automatisch dat er iets misgaat. Maar het verschil is groot genoeg om
                  uit te zoeken waar het vandaan komt.
                </p>
                {situatieHref && (
                  <CtaLink doel="analyse" href={situatieHref} locatie="mini-flow-resultaat" className="btn-primary text-center">
                    Ontdek waar het verschil vandaan komt &rarr;
                  </CtaLink>
                )}
              </div>
            )}

            {scenario === "C" && (
              <div className="mt-4">
                <p className="font-body font-medium text-sm mb-1" style={{ color: "#0B7A6E" }}>
                  Jullie houden meer over dan ik op basis van deze vergelijking zou verwachten.
                </p>
                <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
                  Dat kan komen door lagere woonlasten, andere keuzes of posten die in jouw situatie
                  gunstiger uitvallen.
                </p>
                {situatieHref && (
                  <CtaLink doel="analyse" href={situatieHref} locatie="mini-flow-resultaat" className="btn-primary text-center">
                    Bekijk welke posten bij jullie het verschil maken &rarr;
                  </CtaLink>
                )}
              </div>
            )}

            {!heeftWerkelijk && situatieHref && (
              <p className="font-body text-sm mt-4" style={{ color: "#5A6B66" }}>
                Wil je liever meteen je hele situatie bekijken?{" "}
                <CtaLink doel="analyse" href={situatieHref} locatie="mini-flow-resultaat" style={{ color: "#0B7A6E" }}>
                  Doe de gratis analyse &rarr;
                </CtaLink>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Voortgang({ stap, onVorige }: { stap: 1 | 2 | 3; onVorige?: () => void }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-3 mb-1.5">
        <p className="font-body text-xs uppercase tracking-widest" style={{ color: "#0B7A6E" }}>
          Stap {stap} van 3
        </p>
        {onVorige && (
          <button
            type="button"
            onClick={onVorige}
            className="font-body text-sm"
            style={{ color: "#4A5A56", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            &larr; Vorige
          </button>
        )}
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#D6E5E0" }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${(stap / 3) * 100}%`, backgroundColor: "#0B7A6E" }}
        />
      </div>
    </div>
  );
}

function StapVraag({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 sm:p-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
      <p className="font-body font-medium mb-4" style={{ color: "#16211F", fontSize: "1.05rem" }}>
        {titel}
      </p>
      {children}
    </div>
  );
}

function Knoppen({ kolommen, children }: { kolommen: 2 | 3 | 4; children: React.ReactNode }) {
  const kolomKlasse = kolommen === 4 ? "grid-cols-2 sm:grid-cols-4" : kolommen === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2";
  return <div className={`grid gap-3 ${kolomKlasse}`}>{children}</div>;
}

function StapKnop({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl font-body font-medium text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        padding: "1rem 1.1rem",
        minHeight: "56px",
        backgroundColor: "#FFFFFF",
        color: "#16211F",
        border: "1.5px solid #D6E5E0",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0B7A6E")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#D6E5E0")}
    >
      {children}
    </button>
  );
}
