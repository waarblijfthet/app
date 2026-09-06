"use client";

import { useState } from "react";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";

/**
 * Keuzehulp voor N4, "kan iemand naar mijn financien kijken zonder dat ik
 * schulden heb".
 *
 * Drie vragen, in deze volgorde, want de eerste twee sluiten uit en de derde
 * sluit in. Alleen de derde uitkomst krijgt de analyse-CTA. Bij de eerste twee
 * is het antwoord expliciet dat je hier niet moet zijn, met de plek waar je wel
 * moet zijn erbij. Dat is de reden dat dit een keuzehulp is en geen rekenaar:
 * de winst voor de bezoeker zit erin dat hij ook te horen krijgt wanneer dit
 * niets voor hem is.
 *
 * Brief N4 in docs/plan-nieuwe-invalshoeken-06-sep-2026.md, SERP-verificatie in
 * docs/serp-invalshoeken-06-sep-2026.md.
 */

type Vraag = "schulden" | "product" | "overzicht";

interface Uitkomst {
  kop: string;
  tekst: string;
  /** Alleen de derde uitkomst krijgt de analyse-CTA. */
  cta: boolean;
  /** Waar de bezoeker dan wel moet zijn, als dat niet hier is. */
  elders?: { label: string; href: string; extern: boolean };
}

const VRAGEN: { sleutel: Vraag; vraag: string; toelichting: string }[] = [
  {
    sleutel: "schulden",
    vraag: "Heb je schulden of achterstanden die je niet kunt betalen?",
    toelichting: "Rekeningen die blijven liggen, een deurwaarder, een betalingsregeling die niet lukt.",
  },
  {
    sleutel: "product",
    vraag: "Wil je een financieel product afsluiten of wijzigen?",
    toelichting: "Een hypotheek, een verzekering, een pensioenkeuze, een lening.",
  },
  {
    sleutel: "overzicht",
    vraag: "Wil je weten waar je geld blijft, zonder dat er iets misgaat?",
    toelichting: "Je komt rond, maar er blijft minder over dan je zou verwachten en je weet niet waarom.",
  },
];

const UITKOMSTEN: Record<Vraag, Uitkomst> = {
  schulden: {
    kop: "Begin bij je gemeente, en niet bij mij",
    tekst:
      "Bij schulden of achterstanden die je niet kunt betalen is schuldhulpverlening via de gemeente de juiste plek, en die is kosteloos. Zij kunnen dingen die ik niet kan: met schuldeisers onderhandelen, een regeling opzetten en zo nodig wettelijke schuldsanering aanvragen. Een vergelijking van je uitgaven helpt daar niet, en zou alleen tijd kosten die je niet hebt.",
    cta: false,
    elders: {
      label: "Rijksoverheid: hulp bij schulden",
      href: "https://www.rijksoverheid.nl/themas/recht-veiligheid-en-defensie/schulden",
      extern: true,
    },
  },
  product: {
    kop: "Dan heb je een adviseur met vergunning nodig",
    tekst:
      "Adviseren over een hypotheek, verzekering, pensioen of lening mag alleen met een vergunning van de AFM, en die heb ik niet en wil ik niet. Ik verkoop geen producten en verdien niets aan een product dat jij afsluit. Zoek hiervoor een onafhankelijk adviseur; de advieskosten betaal je rechtstreeks, want ze mogen wettelijk niet in het product verwerkt zitten.",
    cta: false,
    elders: {
      label: "AFM: financieel advies en advieskosten",
      href: "https://www.afm.nl/nl-nl/consumenten/themas/financieel-advies",
      extern: true,
    },
  },
  overzicht: {
    kop: "Ja, dat is precies wat ik doe",
    tekst:
      "Je hoeft geen schulden te hebben en er hoeft niets mis te zijn. De gratis analyse zet je uitgaven post voor post naast vergelijkbare huishoudens, zodat je ziet waar je afwijkt en waar juist niet. Wil je daarna weten waarom je op die posten afwijkt, dan schrijf ik met de hand een rapport. Het kan zijn dat er niets te repareren valt; dan staat dat erin.",
    cta: true,
  },
};

export default function HulpKeuzehulp() {
  const [gekozen, setGekozen] = useState<Vraag | null>(null);
  const uitkomst = gekozen ? UITKOMSTEN[gekozen] : null;

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 mb-8"
      style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
    >
      <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
        Welke van de drie is bij jou het geval?
      </p>
      <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
        Er zijn drie verschillende vragen en drie verschillende soorten hulp. Kies er een, dan zeg ik
        welke rij uit de tabel hierboven bij je past. Bij twee van de drie is dat niet mijn rij.
      </p>

      <div className="space-y-2 mb-4">
        {VRAGEN.map((v) => {
          const actief = gekozen === v.sleutel;
          return (
            <button
              key={v.sleutel}
              type="button"
              onClick={() => setGekozen(actief ? null : v.sleutel)}
              className="w-full text-left rounded-xl p-4 transition-colors"
              style={{
                backgroundColor: actief ? "#0B7A6E" : "#FFFFFF",
                border: actief ? "1px solid #0B7A6E" : "1px solid #D6E5E0",
              }}
              aria-pressed={actief}
            >
              <span
                className="block font-body text-sm"
                style={{ color: actief ? "#FFFFFF" : "#16211F", fontWeight: 500 }}
              >
                {v.vraag}
              </span>
              <span
                className="block font-body text-xs mt-0.5"
                style={{ color: actief ? "#CFE8E3" : "#8B958F" }}
              >
                {v.toelichting}
              </span>
            </button>
          );
        })}
      </div>

      {uitkomst && (
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}
        >
          <p
            className="font-body text-xs uppercase tracking-widest mb-1"
            style={{ color: uitkomst.cta ? "#0B7A6E" : "#C4603A" }}
          >
            {uitkomst.cta ? "Dit is mijn rij" : "Hier moet je niet bij mij zijn"}
          </p>
          <p className="font-display mb-2" style={{ fontSize: "1.4rem", fontWeight: 300, color: "#16211F" }}>
            {uitkomst.kop}
          </p>
          <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
            {uitkomst.tekst}
          </p>

          {uitkomst.elders && (
            <p className="font-body text-sm" style={{ color: "#4A5A56" }}>
              Waar je het wel vindt:{" "}
              <a
                href={uitkomst.elders.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0B7A6E", textDecoration: "none" }}
                className="hover:underline"
              >
                {uitkomst.elders.label}
              </a>
              .
            </p>
          )}

          {uitkomst.cta && (
            <>
              <CtaLink
                doel="analyse"
                href={analyseHref()}
                locatie="keuzehulp"
                className="inline-block rounded-full px-5 py-2.5 font-body text-sm font-semibold"
                style={{ backgroundColor: "#0B7A6E", color: "#FFFFFF", textDecoration: "none" }}
              >
                Doe de gratis analyse
              </CtaLink>
              <p className="font-body text-xs mt-3" style={{ color: "#8B958F" }}>
                Geen account, geen afschriften, geen betaling. Wil je liever eerst zien wat ik
                oplever, dan staan alle geleverde rapporten op{" "}
                <Link href="/rapporten" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">
                  /rapporten
                </Link>
                .
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
