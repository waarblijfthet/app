"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import { berekenVuistregel, euro } from "@/lib/salaris-vuistregel";
import {
  berekenRenteVerschil,
  LOOPTIJD_JAREN,
  RENTEVASTE_PERIODE_JAREN,
  RENTE_2016,
  RENTE_2026,
} from "@/lib/rente-verschil";

/**
 * Situatiekiezer voor N1. Drie velden: hypotheekbedrag, huidige rente,
 * verwachte rente. Meer niet.
 *
 * Wat hier bewust niet in zit (brief N1 en CLAUDE.md sectie 8): geen
 * rentevergelijking, geen aanbieders, geen advies over de rentevaste periode,
 * geen netto-effect van de hypotheekrenteaftrek. Dat laatste hangt af van je
 * schijf en je eigenwoningforfait, en een gemiddelde daarvan zou een precisie
 * suggereren die er niet is.
 *
 * De uitkomst is het maandverschil, en direct daaronder de vraag of het
 * huishouden dat opvangt, met de analyse-CTA. Dat is de volgorde uit CLAUDE.md
 * sectie 5: de CTA staat na het eigen getal van de lezer, nooit ervoor.
 */

const HUISHOUDEN_INKOMEN = 6000;

interface Props {
  startHoofdsom?: number;
  startHuidigeRente?: number;
  startNieuweRente?: number;
}

export default function RenteVerschilRekenaar({
  startHoofdsom = 350000,
  startHuidigeRente = RENTE_2016,
  startNieuweRente = RENTE_2026,
}: Props) {
  const [hoofdsom, setHoofdsom] = useState(startHoofdsom);
  const [huidigeRente, setHuidigeRente] = useState(startHuidigeRente);
  const [nieuweRente, setNieuweRente] = useState(startNieuweRente);

  const uitkomst = berekenRenteVerschil({
    hoofdsom: hoofdsom,
    huidigeRente: huidigeRente,
    nieuweRente: nieuweRente,
    looptijdJaren: LOOPTIJD_JAREN,
    verstrekenJaren: RENTEVASTE_PERIODE_JAREN,
  });

  /** Wat een gezin met twee inkomens en twee kinderen bij dit inkomen overhoudt. */
  const referentie = berekenVuistregel({
    inkomen: HUISHOUDEN_INKOMEN,
    volwassenen: 2,
    kinderen: 2,
    auto: "eigen",
  }).verwachtOver;
  const aandeel =
    referentie > 0 ? Math.round((Math.abs(uitkomst.verschil) / referentie) * 100) : 0;

  const duurder = uitkomst.verschil > 0;

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 mb-8"
      style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
    >
      <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
        Zet je eigen bedrag en je eigen twee rentes erin.
      </p>
      <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
        De rente die je nu betaalt staat op je jaaroverzicht, de rente die je gaat betalen staat in
        de brief van je geldverstrekker. Ik reken alleen het verschil in bruto maandlast uit, over
        wat er na {RENTEVASTE_PERIODE_JAREN} jaar nog openstaat.
      </p>

      <div
        className="rounded-xl p-4 mb-4"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}
      >
        <label className="block font-body text-sm mb-1" style={{ color: "#16211F", fontWeight: 500 }}>
          Hypotheek bij het afsluiten
        </label>
        <p className="font-display mb-2" style={{ fontSize: "1.9rem", fontWeight: 300, color: "#16211F" }}>
          {euro(hoofdsom)}
        </p>
        <input
          type="range"
          min={100000}
          max={600000}
          step={10000}
          value={hoofdsom}
          onChange={(e) => setHoofdsom(Number(e.target.value))}
          className="w-full accent-[#0B7A6E]"
          aria-label="Hypotheekbedrag bij het afsluiten"
        />

        <div className="grid sm:grid-cols-2 gap-4 mt-5">
          <div>
            <label
              className="block font-body text-sm mb-1"
              style={{ color: "#16211F", fontWeight: 500 }}
            >
              Rente die je nu betaalt
            </label>
            <p
              className="font-display mb-2"
              style={{ fontSize: "1.5rem", fontWeight: 300, color: "#16211F" }}
            >
              {huidigeRente.toLocaleString("nl-NL", { minimumFractionDigits: 1 })}&thinsp;%
            </p>
            <input
              type="range"
              min={0.5}
              max={6}
              step={0.1}
              value={huidigeRente}
              onChange={(e) => setHuidigeRente(Number(e.target.value))}
              className="w-full accent-[#0B7A6E]"
              aria-label="Huidige hypotheekrente in procenten"
            />
          </div>
          <div>
            <label
              className="block font-body text-sm mb-1"
              style={{ color: "#16211F", fontWeight: 500 }}
            >
              Rente in het voorstel
            </label>
            <p
              className="font-display mb-2"
              style={{ fontSize: "1.5rem", fontWeight: 300, color: "#16211F" }}
            >
              {nieuweRente.toLocaleString("nl-NL", { minimumFractionDigits: 1 })}&thinsp;%
            </p>
            <input
              type="range"
              min={0.5}
              max={8}
              step={0.1}
              value={nieuweRente}
              onChange={(e) => setNieuweRente(Number(e.target.value))}
              className="w-full accent-[#C4603A]"
              aria-label="Nieuwe hypotheekrente in procenten"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: "#0B7A6E" }}>
          Verschil in bruto maandlast
        </p>
        <p
          className="font-display mb-1"
          style={{
            fontSize: "2.2rem",
            fontWeight: 300,
            color: duurder ? "#C4603A" : "#16211F",
            lineHeight: 1.1,
          }}
        >
          {duurder ? "+" : ""}
          {uitkomst.verschil < 0 ? "-" : ""}
          {euro(Math.abs(uitkomst.verschil))}
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
          per maand, {uitkomst.resterendeJaren} jaar lang. Je betaalde{" "}
          {euro(uitkomst.huidigeMaandlast)} en gaat {euro(uitkomst.nieuweMaandlast)} betalen, over de{" "}
          {euro(uitkomst.restschuld)} die er na {RENTEVASTE_PERIODE_JAREN} jaar aflossen nog
          openstaat. Bruto, dus zonder het effect van de hypotheekrenteaftrek, dat per huishouden
          verschilt.
        </p>

        <div className="rounded-lg p-3 mb-4" style={{ backgroundColor: "#FDF3E3" }}>
          <p className="font-body text-sm" style={{ color: "#16211F" }}>
            Ter maat: een gezin met twee inkomens, twee kinderen en een auto houdt bij{" "}
            {euro(HUISHOUDEN_INKOMEN)} netto ongeveer {euro(referentie)} per maand over. Dit
            verschil is daar {aandeel} procent van.
          </p>
        </div>

        <p className="font-body text-sm mb-3" style={{ color: "#4A5A56" }}>
          Wil je weten of jullie huishouden dit opvangt, of dat het ergens anders vandaan moet
          komen: leg jullie maand naast vergelijkbare huishoudens.
        </p>
        <CtaLink
          doel="analyse"
          href={analyseHref({ situatie: "gezin", inkomen: HUISHOUDEN_INKOMEN })}
          locatie="rekenaar"
          className="inline-block rounded-full px-5 py-2.5 font-body text-sm font-semibold"
          style={{ backgroundColor: "#0B7A6E", color: "#FFFFFF", textDecoration: "none" }}
        >
          Doe de gratis analyse
        </CtaLink>
      </div>
    </div>
  );
}
