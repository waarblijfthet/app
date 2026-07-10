import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AanbodAccordion } from "./components/AanbodAccordion";
import { PAKKET_INFO, type Pakket } from "@/lib/aanbod-content";

export const metadata: Metadata = {
  title: "Financiële coaching en adviesgesprek, tarieven",
  description:
    "Van eerste inzicht tot persoonlijk traject: kies wat bij jouw situatie past. Geen abonnementen, geen verrassingen. Je betaalt voor wat je nodig hebt.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.waarblijfthet.nl/aanbod" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Financiële begeleiding voor gezinnen",
  provider: {
    "@type": "Person",
    name: "Jarno Koopman",
    url: "https://www.waarblijfthet.nl",
  },
  serviceType: "Financiële coaching",
  areaServed: "NL",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is dit hetzelfde als een budgetcoach of schuldhulp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Budgetcoaches en schuldhulp zijn er voor mensen met betalingsproblemen of schulden. Ik richt me op gezinnen en individuen die goed verdienen maar te weinig overhouden. Die willen begrijpen waarom, en hoe dat anders kan.",
      },
    },
    {
      "@type": "Question",
      name: "Ik heb geen schulden maar ook geen spaargeld. Is dit dan iets voor mij?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ja, dat is precies de situatie waar ik voor ben. Geen crisis, maar ook geen rust. Dat is het meest voorkomende financiële patroon bij mensen met een goed inkomen, en het is volledig op te lossen met de juiste structuur.",
      },
    },
    {
      "@type": "Question",
      name: "Geef je advies over beleggen, hypotheken of pensioen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Ik begeleid je bij het dagelijks beheer van je inkomen: waar het naartoe gaat, hoe je structuur aanbrengt en hoe je structureel meer overhoudt. Voor specifieke financiële producten verwijs ik je door naar een gecertificeerd adviseur.",
      },
    },
    {
      "@type": "Question",
      name: "Ben je gecertificeerd financieel adviseur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Nee. Ik ben geen gecertificeerd financieel adviseur en val niet onder de AFM-vergunningplicht. Ik adviseer niet over financiële producten. Wat ik doe is gedragscoaching en structuurbegeleiding rondom dagelijks geldbeheer.",
      },
    },
  ],
};

const routes = [
  {
    href: "#geldscan",
    situatie:
      "Ik wil snappen waar mijn situatie afwijkt, zonder er met iemand over te praten",
    naam: "Geldscan",
    prijs: "€49",
    regel: "Persoonlijk geschreven geldrapport met je drie grootste lekken",
    aanbevolen: false,
  },
  {
    href: "#adviesgesprek",
    situatie:
      "Ik weet dat er iets moet veranderen en wil daar één goed gesprek over",
    naam: "Adviesgesprek",
    prijs: "€125",
    regel: "2 à 3 concrete doelen waar je meteen mee verder kunt",
    aanbevolen: true,
  },
  {
    href: "#traject",
    situatie: "Ik wil het echt anders gaan doen, met begeleiding tot het staat",
    naam: "Traject",
    prijs: "€497",
    regel: "Een systeem dat vanzelf blijft lopen, na 3 maanden begeleiding",
    aanbevolen: false,
  },
];

const details: {
  id: string;
  pakket: Pakket;
  bg: string;
  cardBg: string;
  eyebrow: string;
  titel: string;
  intro: string;
  primaireHref: string;
  primaireLabel: string;
  secundaireHref: string;
  secundaireLabel: string;
}[] = [
  {
    id: "geldscan",
    pakket: "geldscan",
    bg: "#F7F8F7",
    cardBg: "#FFFFFF",
    eyebrow: "Zonder gesprek · €49 eenmalig",
    titel: "Geldscan: jouw persoonlijke geldrapport",
    intro: "Jij levert je cijfers aan wanneer het uitkomt, ik schrijf op wat ik zie en wat ik zou doen. Zonder gesprek of agenda.",
    primaireHref: "/aanbod/intake?pakket=geldscan",
    primaireLabel: "Vraag de geldscan aan",
    secundaireHref: "/geldscan",
    secundaireLabel: "Alles over de geldscan",
  },
  {
    id: "adviesgesprek",
    pakket: "gesprek",
    bg: "#FFFFFF",
    cardBg: "#FFFFFF",
    eyebrow: "Meest gevraagd · €125 eenmalig",
    titel: "Eenmalig adviesgesprek",
    intro: "Eén gesprek, geen verkooppraat, geen traject. Vaak verdient één concrete beslissing de €125 al terug.",
    primaireHref: "/aanbod/intake?pakket=gesprek",
    primaireLabel: "Ja, dit wil ik",
    secundaireHref: "/adviesgesprek",
    secundaireLabel: "Wat kun je verwachten?",
  },
  {
    id: "traject",
    pakket: "intensief",
    bg: "#F7F8F7",
    cardBg: "#FFFFFF",
    eyebrow: "Beperkte beschikbaarheid · €497 eenmalig",
    titel: "Persoonlijk traject, 3 maanden",
    intro: "Niet alleen een plan, maar een gewoonte die blijft. Plek voor maximaal 3 trajecten tegelijk.",
    primaireHref: "/aanbod/intake?pakket=intensief",
    primaireLabel: "Ja, dit wil ik",
    secundaireHref: "/aanbod/intake?pakket=intensief",
    secundaireLabel: "Vraag beschikbaarheid op",
  },
];

export default function AanbodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero met ingetogen Jarno-kaartje */}
        <section className="px-6 pb-14 pt-20" style={{ backgroundColor: "#F7F8F7" }}>
          <div className="mx-auto max-w-[860px]">
            <p
              className="font-body mb-4 text-xs font-medium uppercase tracking-widest"
              style={{ color: "#0B7A6E" }}
            >
              Aanbod
            </p>
            <h1
              className="font-display font-light text-[#16211F]"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.2, marginBottom: "1.25rem" }}
            >
              Goed verdienen en toch te weinig overhouden. Dat lost zich niet vanzelf op.
            </h1>
            <p
              className="font-body max-w-[600px] font-light leading-relaxed"
              style={{ fontSize: "1.05rem", color: "#4A5A56" }}
            >
              Ik help je begrijpen waar het naartoe gaat en hoe je dat structureel verandert. Geen abonnementen, geen verrassingen. Je betaalt voor wat je nodig hebt.
            </p>
            <p className="font-body mt-4 text-sm" style={{ color: "#8B958F" }}>
              Al meer dan 50 gezinnen en individuen deden de analyse.
            </p>

            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-[#E6E9E7] bg-white p-5 sm:items-center">
              <div
                className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full"
                style={{ backgroundColor: "#16211F" }}
              >
                <Image
                  src="/jarno.jpg"
                  alt="Jarno Koopman"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="font-body text-sm font-light leading-relaxed text-[#4A5A56]">
                <span className="font-medium text-[#16211F]">Ik ben Jarno.</span>{" "}
                Ik herken dit patroon van binnenuit: goed verdienen en toch elke maand niet weten waar het naartoe gaat. Dit doe ik ernaast, voor iedereen die dat herkent. Geen gecertificeerd adviseur, geen productverkoop.{" "}
                <Link
                  href="/over"
                  className="whitespace-nowrap hover:underline"
                  style={{ color: "#0B7A6E", textDecoration: "none" }}
                >
                  Meer over mij →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Keuzehulp: drie situaties */}
        <section className="px-6 py-14" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display mb-2 text-2xl font-light text-[#16211F] sm:text-3xl">
              Wat past bij jouw situatie?
            </h2>
            <p className="font-body mb-10 max-w-[600px] text-sm font-light leading-relaxed text-[#4A5A56]">
              Begin altijd met de{" "}
              <Link
                href="/analyse"
                className="hover:underline"
                style={{ color: "#0B7A6E", textDecoration: "none" }}
              >
                de analyse
              </Link>{" "}
              (5 minuten, anoniem). Daarna zijn er drie routes, kies wat jij herkent:
            </p>

            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
              {routes.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  className={`group relative flex flex-col rounded-2xl bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B7A6E] focus-visible:ring-offset-2 ${
                    s.aanbevolen
                      ? "border-2 border-[#0B7A6E]"
                      : "border border-[#E6E9E7] hover:border-[#0B7A6E]"
                  }`}
                  style={{ textDecoration: "none" }}
                >
                  {s.aanbevolen && (
                    <span className="font-body absolute -top-3 left-5 rounded-full px-3 py-0.5 text-xs font-medium text-white" style={{ backgroundColor: "#0B7A6E" }}>
                      Meest gevraagd
                    </span>
                  )}
                  <p className="font-display mb-6 text-base font-light italic leading-relaxed text-[#16211F]">
                    &ldquo;{s.situatie}&rdquo;
                  </p>
                  <div className="mt-auto border-t border-[#E6E9E7] pt-4">
                    <p className="section-eyebrow mb-1">{s.naam}</p>
                    <p className="font-display mb-1 text-3xl font-light text-[#16211F]">
                      {s.prijs}
                      <span className="font-body ml-2 text-xs font-light text-[#8B958F]">
                        eenmalig
                      </span>
                    </p>
                    <p className="font-body mb-4 text-xs font-light leading-relaxed text-[#8B958F]">
                      {s.regel}
                    </p>
                    <span className="font-body inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: "#0B7A6E" }}>
                      Bekijk wat je krijgt
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-y-0.5"
                      >
                        ↓
                      </span>
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <p className="font-body text-xs font-light text-[#8B958F]">
              Alle prijzen eenmalig. De €49 van de geldscan wordt verrekend als je daarna een gesprek of traject wilt.
            </p>
          </div>
        </section>

        {/* Detail-secties: proces (links) strikt gescheiden van inhoud (rechts) */}
        {details.map((d) => {
          const info = PAKKET_INFO[d.pakket];
          return (
            <section
              key={d.id}
              id={d.id}
              className="px-6 py-16"
              style={{ backgroundColor: d.bg, scrollMarginTop: "90px" }}
            >
              <div className="mx-auto max-w-[900px]">
                <p className="section-eyebrow mb-2">{d.eyebrow}</p>
                <h2 className="font-display mb-3 text-2xl font-light text-[#16211F] sm:text-3xl">
                  {d.titel}
                </h2>
                <p className="font-body mb-8 max-w-[560px] font-light leading-relaxed text-[#4A5A56]">
                  {d.intro}
                </p>

                <div className="grid items-start gap-6 md:grid-cols-2 md:gap-6">
                  {/* Hoe het werkt: de volgorde der dingen */}
                  <div
                    className="rounded-2xl border border-[#E6E9E7] p-6"
                    style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                  >
                    <p className="section-eyebrow mb-4">Hoe het werkt</p>
                    <ol className="space-y-3">
                      {info.hoeHetWerkt.map((t, i) => (
                        <li key={t} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="font-body flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium"
                            style={{ backgroundColor: "#E6E9E7", color: "#4A5A56", marginTop: "1px" }}
                          >
                            {i + 1}
                          </span>
                          <span className="font-body text-sm font-light leading-relaxed text-[#4A5A56]">
                            {t}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Wat je krijgt: de inhoud van het pakket */}
                  <div
                    className="rounded-2xl border border-[#E6E9E7] p-6"
                    style={{ backgroundColor: d.cardBg }}
                  >
                    <p className="section-eyebrow mb-4">Wat je krijgt</p>
                    <ul className="space-y-3">
                      {info.watJeKrijgt.map((t) => (
                        <li key={t} className="flex items-start gap-2.5">
                          <span aria-hidden="true" style={{ color: "#0B7A6E", fontWeight: 600 }}>
                            ✓
                          </span>
                          <span className="font-body text-sm font-light leading-relaxed text-[#4A5A56]">
                            {t}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href={d.primaireHref} className="btn-primary">
                    {d.primaireLabel} →
                  </Link>
                  <Link
                    href={d.secundaireHref}
                    className="font-body text-sm hover:underline"
                    style={{ color: "#0B7A6E", textDecoration: "none" }}
                  >
                    {d.secundaireLabel} →
                  </Link>
                </div>
              </div>
            </section>
          );
        })}

        {/* Sociale proof */}
        <section style={{ backgroundColor: "#FFFFFF", padding: "3.5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p
              className="font-body mb-6 text-center text-xs font-medium uppercase tracking-widest"
              style={{ color: "#0B7A6E" }}
            >
              Wat het andere gezinnen opleverde
            </p>
            <div className="mx-auto mb-8 max-w-[720px] rounded-2xl border border-[#E6E9E7] p-6" style={{ borderLeft: "3px solid #0B7A6E" }}>
              <p className="section-eyebrow mb-2">Over de geldscan</p>
              <p className="font-body mb-2 text-sm font-light leading-relaxed text-[#16211F]">
                &ldquo;We vonden het best spannend dat een vreemde naar onze
                financiën keek. Maar het was verhelderend: we zagen
                afwijkingen die we zelf niet doorhadden.&rdquo;
              </p>
              <p className="font-body text-xs text-[#8B958F]">Sanne &amp; Joris, gezin met twee kinderen</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  resultaat: "Geen verrassingen meer in de piekmaanden",
                  quote:
                    "Periodieke kosten uitgerekend en opgesplitst in maandpotjes. De kerstpot staat er nu gewoon.",
                  naam: "Daan & Roos",
                },
                {
                  resultaat: "Boodschappen eindelijk onder controle",
                  quote:
                    "Samen een weekbudget en een korte check-in na elke keer boodschappen. Dat hield ons scherp.",
                  naam: "Bram & Eva",
                },
                {
                  resultaat: "Twee dagen minder BSO, rust én geld over",
                  quote:
                    "Meegedacht over flexibeler werken in plaats van alleen bezuinigen. Thuis is het rustiger.",
                  naam: "Karim & Noor",
                },
              ].map((t) => (
                <div
                  key={t.naam}
                  className="rounded-2xl border border-[#E6E9E7] p-6"
                  style={{ backgroundColor: "white" }}
                >
                  <p className="font-body mb-2 text-sm font-medium text-[#0B7A6E]">
                    {t.resultaat}
                  </p>
                  <p className="font-body mb-3 text-sm font-light leading-relaxed text-[#16211F]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="font-body text-xs text-[#8B958F]">{t.naam}</p>
                </div>
              ))}
            </div>
            <p className="font-body mt-6 text-center text-xs" style={{ color: "#8B958F" }}>
              Echte ervaringen van de eerste gezinnen die ik hielp. Namen aangepast voor hun privacy.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section style={{ backgroundColor: "white", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <h2
              className="font-display font-light text-[#16211F]"
              style={{ fontSize: "2rem", marginBottom: "2rem" }}
            >
              Veelgestelde vragen
            </h2>
            <AanbodAccordion />
          </div>
        </section>

        {/* Finale CTA */}
        <section
          style={{ backgroundColor: "#16211F", padding: "4rem 1.5rem", textAlign: "center" }}
        >
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2
              className="font-display font-light"
              style={{ fontSize: "2rem", color: "white", marginBottom: "1rem" }}
            >
              Niet zeker welke past bij jou?
            </h2>
            <p
              className="font-body"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "1rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Begin dan met de geldscan (€49). Ik kijk persoonlijk naar je cijfers en zet op papier waar het bij jou weglekt, met je drie grootste lekken. Liever eerst zelf een indruk? Doe de analyse.
            </p>
            <Link
              href="/aanbod/intake?pakket=geldscan"
              className="font-body inline-block px-8 py-3 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#0B7A6E",
                color: "#FFFFFF",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              Laat mij je cijfers nakijken (€49) →
            </Link>
            <p style={{ marginTop: "1rem" }}>
              <Link href="/analyse" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem" }}>
                Liever eerst zelf kijken? →
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
