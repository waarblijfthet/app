import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaLink from "@/components/CtaLink";
import { ANALYSE_ROUTE, PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import { RAPPORTEN, AANTAL_ZONDER_VERVOLG, rapportVoorSlug } from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: "Tarieven: geldrapport, gesprek en traject",
  description:
    "Ik schrijf een persoonlijk geldrapport over jouw cijfers, met de drie dingen die het meest opvallen en wat juist niet. 49 euro, eenmalig. Vijf echte rapporten staan op de site, met de cijfers, mijn advies en de evaluatie van de klant, dus je weet wat je koopt voordat je betaalt.",
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

/* --- Hero -------------------------------------------------------------
   De hero is een keuze-overzicht, geen productpagina. Links de belofte en
   drie stappen naast elkaar (op mobiel onder elkaar), rechts hoe het
   eindproduct eruitziet. Stap 2 is de enige met een eigen vlak, want de
   Geldscan is het hoofdproduct. Stap 1 en 3 blijven bewust vlak.

   De stappen zijn een visueel overzicht en dus geen knoppen. De enige
   primaire actie in de hero is de gratis analyse, conform lib/cta.ts. */

const heroStappen: {
  nummer: string;
  kicker: string;
  titel: string;
  prijs?: string;
  tekst: string;
  nadruk: boolean;
}[] = [
  {
    nummer: "01",
    kicker: "Eerst ontdekken",
    titel: "Gratis analyse",
    tekst: "Ontdek waar je afwijkt van vergelijkbare huishoudens.",
    nadruk: false,
  },
  {
    nummer: "02",
    kicker: "Daarna begrijpen",
    titel: "Geldscan",
    prijs: "€49",
    tekst: "Ik kijk zelf naar jouw cijfers en leg uit wat opvalt en waarom.",
    nadruk: true,
  },
  {
    nummer: "03",
    kicker: "Daarna bespreken",
    titel: "Persoonlijke vervolgsessie",
    prijs: "€125",
    tekst: "We bespreken je uitkomst en bepalen samen wat de beste volgende stap is.",
    nadruk: false,
  },
];

/* Het pijltje tussen twee stappen. Alleen zichtbaar zodra de stappen naast
   elkaar staan, op mobiel valt het weg omdat de volgorde dan al verticaal is. */
function StapPijl() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#C6CECB"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="M13 6.5l5.5 5.5-5.5 5.5" />
    </svg>
  );
}

/* De rapportpreview toont de opbouw van een geldrapport, niet de inhoud van
   een klant. Er staan daarom geen bedragen in: de regels zijn balkjes. De
   kopjes zijn wel de echte kopjes uit een rapport. Twee keer staat erbij dat
   dit een voorbeeldweergave is, op het vel zelf en in de regel eronder. */

function Balk({ breedte, sterk = false }: { breedte: string; sterk?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="block h-[7px] rounded-full"
      style={{ width: breedte, backgroundColor: sterk ? "#DDE3E1" : "#EDF0EF" }}
    />
  );
}

function PreviewKopje({ tekst }: { tekst: string }) {
  return (
    <p
      className="font-body mb-2.5 text-[9px] font-semibold uppercase tracking-[0.16em]"
      style={{ color: "#8B958F" }}
    >
      {tekst}
    </p>
  );
}

/* --- Sectie 2: Geldscan ------------------------------------------------
   Het hoofdaanbod krijgt een eigen sectie: links vier korte voordelen,
   rechts een preview van een rapport dat werkelijk geleverd en met
   toestemming gepubliceerd is. Alle regels in die preview komen uit
   lib/rapporten-data.ts via rapportVoorSlug, dus er staat geen bedrag in
   dat niet echt is. Nooit met de hand een bedrag overtypen. */

type VoordeelIcoon = "loep" | "uitleg" | "doel" | "vink";

function VoordeelIcoontje({ naam }: { naam: VoordeelIcoon }) {
  const paden: Record<VoordeelIcoon, React.ReactNode> = {
    loep: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M19.5 19.5l-3.6-3.6" />
      </>
    ),
    uitleg: <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-.9 0-1.7-.1-2.5-.3L5 20.5l1.2-3.3C4.8 16 4 14.4 4 12.5 4 8.9 7.6 6 12 6s8 2.9 8 6.5z" />,
    doel: (
      <>
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    vink: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M8.5 12.2l2.4 2.4 4.6-4.8" />
      </>
    ),
  };
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0B7A6E"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paden[naam]}
    </svg>
  );
}

const geldscanVoordelen: { icoon: VoordeelIcoon; titel: string; tekst: string }[] = [
  {
    icoon: "loep",
    titel: "Ik kijk zelf naar jouw cijfers",
    tekst: "Geen automatische tool, maar een persoonlijke analyse door mij.",
  },
  {
    icoon: "uitleg",
    titel: "Je krijgt mijn uitleg",
    tekst: "Je ontvangt heldere uitleg bij wat opvalt en waarom jij afwijkt.",
  },
  {
    icoon: "doel",
    titel: "Concrete aandachtspunten",
    tekst: "Praktische inzichten waar je direct iets mee kunt.",
  },
  {
    icoon: "vink",
    titel: "Daarna kun jij kiezen",
    tekst: "Gebruik het inzicht zelf, of bespreek het in een vervolgsessie.",
  },
];

type TrustIcoon = "eenmalig" | "slot" | "persoon";

function TrustIcoontje({ naam }: { naam: TrustIcoon }) {
  const paden: Record<TrustIcoon, React.ReactNode> = {
    eenmalig: <path d="M12 3.2l7 2.8v4.9c0 4.2-2.9 7.9-7 9.9-4.1-2-7-5.7-7-9.9V6l7-2.8z" />,
    slot: (
      <>
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
        <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
      </>
    ),
    persoon: (
      <>
        <circle cx="12" cy="8.5" r="3.4" />
        <path d="M5.5 20c0-3.3 2.9-5.4 6.5-5.4s6.5 2.1 6.5 5.4" />
      </>
    ),
  };
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0B7A6E"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paden[naam]}
    </svg>
  );
}

const geldscanTrust: { icoon: TrustIcoon; titel: string; tekst: string }[] = [
  { icoon: "eenmalig", titel: "Eenmalige betaling", tekst: "Geen abonnement." },
  { icoon: "slot", titel: "100% vertrouwelijk", tekst: "Je gegevens zijn veilig." },
  {
    icoon: "persoon",
    titel: "Persoonlijk en onafhankelijk",
    tekst: "Geen provisies. Geen producten.",
  },
];

/* Het rapport in de preview is een echt geleverd rapport, met toestemming
   gepubliceerd. De posten worden op label uit het rapport gehaald, zodat de
   bedragen letterlijk uit de data komen. */
const previewRapport = rapportVoorSlug("tweeverdieners-drie-kinderen");

const PREVIEW_POSTEN = [
  "Hypotheek",
  "Energie",
  "Internet en tv",
  "Zorgverzekering",
  "Overige verzekeringen",
];

const previewLasten = previewRapport
  ? PREVIEW_POSTEN.map((label) => previewRapport.lasten.find((p) => p.label === label)).filter(
      (p): p is { label: string; waarde: string } => Boolean(p)
    )
  : [];

/* --- Sectie 3: de persoonlijke vervolgsessie ---------------------------
   Rustiger en menselijker dan de Geldscan-sectie: geen preview, geen
   prijskaart, geen tweede aanbod. De sessie staat er nadrukkelijk als
   vervolg op de Geldscan, niet als losse ingang, en de knop is bewust de
   secundaire variant zodat hij naast de analyse en de Geldscan geen
   primaire actie wordt. */

type SessieIcoon = "gesprek" | "doel" | "lamp" | "personen";

function SessieIcoontje({ naam }: { naam: SessieIcoon }) {
  const paden: Record<SessieIcoon, React.ReactNode> = {
    gesprek: <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-.9 0-1.7-.1-2.5-.3L5 20.5l1.2-3.3C4.8 16 4 14.4 4 12.5 4 8.9 7.6 6 12 6s8 2.9 8 6.5z" />,
    doel: (
      <>
        <circle cx="12" cy="12" r="7.5" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    lamp: (
      <>
        <path d="M9.2 16.5a5.5 5.5 0 1 1 5.6 0v1.6H9.2z" />
        <path d="M10 21h4" />
      </>
    ),
    personen: (
      <>
        <circle cx="10" cy="9" r="3.2" />
        <path d="M4 19.5c0-3.1 2.7-5 6-5s6 1.9 6 5" />
        <path d="M16.5 7.2a2.8 2.8 0 0 1 0 5.4" />
        <path d="M18 14.8c1.5.6 2.5 1.9 2.5 3.7" />
      </>
    ),
  };
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0B7A6E"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paden[naam]}
    </svg>
  );
}

const sessieVoordelen: { icoon: SessieIcoon; titel: string; tekst: string }[] = [
  {
    icoon: "gesprek",
    titel: "45 minuten persoonlijk",
    tekst: "We bespreken je Geldscan en wat daarin opvalt.",
  },
  {
    icoon: "doel",
    titel: "Gericht op jouw situatie",
    tekst: "Jouw vragen, jouw keuzes. Geen standaardlijstje.",
  },
  {
    icoon: "lamp",
    titel: "Duidelijkheid over vervolgstappen",
    tekst: "Je weet wat verstandig is om nu te doen.",
  },
  {
    icoon: "personen",
    titel: "Praktisch en onafhankelijk",
    tekst: "Eerlijk advies, zonder provisies of producten.",
  },
];

export default function AanbodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />

      <main>
        {/* Hero: links de keuze, rechts het eindproduct.
            Links staat de belofte met drie stappen naast elkaar. Rechts ligt
            een voorbeeldweergave van een geldrapport, zodat direct zichtbaar
            is wat je uiteindelijk krijgt. */}
        <section
          className="overflow-hidden px-6 pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-24"
          style={{ backgroundColor: "#F7F8F7" }}
        >
          <div className="mx-auto max-w-[1180px]">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14">
              {/* Links: belofte, stappenflow, actie */}
              <div>
                <p
                  className="font-body mb-6 text-xs font-medium uppercase tracking-[0.18em]"
                  style={{ color: "#8B958F" }}
                >
                  Jouw geld. Jouw inzicht.
                </p>

                <h1
                  className="font-display font-light text-[#16211F]"
                  style={{
                    fontSize: "clamp(2.1rem, 4vw, 3.05rem)",
                    lineHeight: 1.12,
                    marginBottom: "1.5rem",
                  }}
                >
                  Duidelijkheid begint
                  <span className="block" style={{ color: "#C4603A" }}>
                    met de juiste keuze.
                  </span>
                </h1>

                <p
                  className="font-body max-w-[460px] font-light leading-relaxed"
                  style={{ fontSize: "1.05rem", color: "#4A5A56" }}
                >
                  Van gratis inzicht tot persoonlijke begeleiding.
                  <span className="block">Kies de stap die nu past bij jouw situatie.</span>
                </p>

                {/* De drie stappen. Naast elkaar zodra er ruimte is, met een
                    pijltje ertussen. Op mobiel onder elkaar, waarbij stap 2
                    het enige witte vlak houdt. */}
                <div className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
                  {heroStappen.map((stap, i) => (
                    <div key={stap.nummer} className="contents">
                      {i > 0 && (
                        <span className="hidden flex-shrink-0 items-center px-2.5 sm:flex">
                          <StapPijl />
                        </span>
                      )}
                      <div
                        className={
                          stap.nadruk
                            ? "flex-1 rounded-xl border border-[#E6E9E7] bg-white p-4 shadow-card sm:p-[18px]"
                            : "flex-1 rounded-xl border border-transparent p-4 sm:p-[18px]"
                        }
                      >
                        <span
                          className="font-body mb-3 flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold"
                          style={
                            stap.nadruk
                              ? { backgroundColor: "#16211F", color: "#FFFFFF" }
                              : { backgroundColor: "#EDF0EF", color: "#8B958F" }
                          }
                        >
                          {stap.nummer}
                        </span>
                        <p
                          className="font-body mb-1.5 text-[10px] font-medium uppercase tracking-[0.14em]"
                          style={{ color: "#8B958F" }}
                        >
                          {stap.kicker}
                        </p>
                        <p
                          className={
                            stap.nadruk
                              ? "font-display mb-2 text-[19px] font-light leading-tight text-[#16211F]"
                              : "font-display mb-2 text-[16px] font-light leading-tight text-[#16211F]"
                          }
                        >
                          {stap.titel}
                          {stap.prijs ? (
                            <span
                              className="font-body text-[13px] font-medium"
                              style={{ color: stap.nadruk ? "#0B7A6E" : "#8B958F" }}
                            >
                              {" · "}
                              {stap.prijs}
                            </span>
                          ) : null}
                        </p>
                        <p
                          className="font-body text-[13px] font-light leading-relaxed"
                          style={{ color: stap.nadruk ? "#4A5A56" : "#8B958F" }}
                        >
                          {stap.tekst}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <CtaLink
                    doel="analyse"
                    href={ANALYSE_ROUTE}
                    locatie="aanbod-hero"
                    className="btn-primary"
                  >
                    {PRIMAIRE_CTA_LABEL} →
                  </CtaLink>
                </div>
              </div>

              {/* Rechts: hoe het eindproduct eruitziet */}
              <div className="relative">
                {/* Zachte vorm achter de vellen, alleen decoratief. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 hidden h-[440px] w-[440px] rounded-full lg:block"
                  style={{ backgroundColor: "rgba(196, 96, 58, 0.07)" }}
                />

                <div className="relative mx-auto max-w-[400px] lg:max-w-none">
                  {/* Achterste vel: de detailpagina met de posten. */}
                  <div
                    aria-hidden="true"
                    className="absolute -right-7 -top-7 hidden w-[72%] rounded-xl border border-[#E6E9E7] bg-white p-5 sm:block"
                    style={{
                      transform: "rotate(3deg)",
                      boxShadow: "0 2px 20px rgba(22, 33, 31, 0.06)",
                    }}
                  >
                    <PreviewKopje tekst="Per post" />
                    <div className="space-y-[13px]">
                      {["58%", "44%", "66%", "38%", "52%", "61%", "41%", "56%", "47%"].map(
                        (b, i) => (
                          <div key={i} className="flex items-center justify-between gap-4">
                            <Balk breedte={b} />
                            <Balk breedte="18%" sterk />
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Voorste vel: de eerste pagina van het rapport. */}
                  <div className="relative rounded-xl border border-[#E6E9E7] bg-white p-6 shadow-card sm:p-8">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <span
                        className="font-body rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em]"
                        style={{ backgroundColor: "#F0F3F1", color: "#8B958F" }}
                      >
                        Voorbeeldweergave
                      </span>
                      <span
                        className="font-body text-[9px] font-medium uppercase tracking-[0.16em]"
                        style={{ color: "#C6CECB" }}
                      >
                        Waar blijft het?
                      </span>
                    </div>

                    <p className="font-display mb-6 text-2xl font-light leading-tight text-[#16211F] sm:text-[28px]">
                      Jouw geldrapport
                    </p>

                    <div className="mb-6 border-t border-[#EDF0EF] pt-6">
                      <PreviewKopje tekst="Wat ik zie" />
                      <div className="space-y-[11px]">
                        <Balk breedte="100%" />
                        <Balk breedte="93%" />
                        <Balk breedte="71%" />
                      </div>
                    </div>

                    <div className="mb-6">
                      <PreviewKopje tekst="Wat het meest opvalt" />
                      <div className="space-y-3.5">
                        {["86%", "78%", "82%"].map((b, i) => (
                          <div key={b} className="flex items-center gap-3">
                            <span
                              className="font-body flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-semibold"
                              style={{ backgroundColor: "#E4F1EE", color: "#0B7A6E" }}
                            >
                              {i + 1}
                            </span>
                            <span className="flex-1">
                              <Balk breedte={b} sterk />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <PreviewKopje tekst="Wat juist niet uit de toon valt" />
                      <div className="space-y-[11px]">
                        <Balk breedte="88%" />
                        <Balk breedte="59%" />
                      </div>
                    </div>
                  </div>
                </div>

                <p className="font-body relative mt-6 text-xs font-light leading-relaxed text-[#8B958F]">
                  Dit is een voorbeeldweergave van de opbouw, geen echt huishouden.{" "}
                  <Link
                    href="/rapporten"
                    className="hover:underline"
                    style={{ color: "#0B7A6E", textDecoration: "none" }}
                  >
                    Lees {RAPPORTEN.length} complete rapporten van echte klanten →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sectie 2: de Geldscan, het hoofdaanbod.
            Links vier voordelen, rechts een preview van een echt rapport.
            In deze sectie staat bewust geen tweede aanbod en geen tweede
            knop, zodat de Geldscan hier het enige onderwerp is. */}
        <section className="px-6 py-16 sm:py-20" style={{ backgroundColor: "#E7F1EE" }}>
          <div className="mx-auto max-w-[1180px]">
            {/* Kop, gecentreerd boven beide kolommen */}
            <div className="mx-auto max-w-[680px] text-center">
              <p
                className="font-body mb-5 text-xs font-medium uppercase tracking-[0.18em]"
                style={{ color: "#4A5A56" }}
              >
                Het hoofdaanbod
              </p>
              <h2
                className="font-display font-light text-[#16211F]"
                style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)", lineHeight: 1.15 }}
              >
                Geldscan · €49
              </h2>
              <p
                className="font-body mt-3 text-lg font-medium"
                style={{ color: "#0B7A6E" }}
              >
                Het complete inzicht in jouw geld.
              </p>
              <p
                className="font-body mx-auto mt-4 max-w-[560px] font-light leading-relaxed"
                style={{ color: "#4A5A56" }}
              >
                Ik analyseer je inkomsten en uitgaven en geef je duidelijkheid over wat opvalt,
                waarom en wat je ermee kunt.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
              {/* Links: vier voordelen, zonder kaartjes, met hairlines ertussen */}
              <div>
                {geldscanVoordelen.map((v, i) => (
                  <div
                    key={v.titel}
                    className={
                      i > 0
                        ? "flex items-start gap-4 border-t border-[#CFE2DC] pt-6 sm:pt-7"
                        : "flex items-start gap-4"
                    }
                    style={i > 0 ? undefined : { paddingTop: 0 }}
                  >
                    <span
                      className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "#FFFFFF" }}
                    >
                      <VoordeelIcoontje naam={v.icoon} />
                    </span>
                    <div className={i < geldscanVoordelen.length - 1 ? "pb-6 sm:pb-7" : undefined}>
                      <p className="font-body mb-1.5 text-[15px] font-semibold leading-snug text-[#16211F]">
                        {v.titel}
                      </p>
                      <p className="font-body text-sm font-light leading-relaxed text-[#4A5A56]">
                        {v.tekst}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rechts: een preview van een echt geleverd rapport */}
              <div className="relative">
                <p className="relative mb-3 flex items-end justify-center gap-2 sm:justify-end">
                  <span className="font-display text-[15px] font-light italic leading-snug text-[#4A5A56]">
                    Voorbeeld uit een échte Geldscan
                  </span>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 28 28"
                    fill="none"
                    stroke="#8B958F"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="hidden flex-shrink-0 sm:block"
                  >
                    <path d="M4 4c9 1 14 7 15 17" />
                    <path d="M13 20.5l6.2 1.2.9-6.2" />
                  </svg>
                </p>

                {previewRapport ? (
                  <>
                    <div
                      className="flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-start sm:gap-0 sm:p-6"
                      style={{ backgroundColor: "#F7F8F7" }}
                    >
                      {/* Vel 1: de cover en de samenvatting */}
                      <div className="relative z-10 rounded-2xl border border-[#D5E5E0] bg-white p-6 shadow-card sm:w-[58%]">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <span
                            className="font-body text-[9px] font-semibold uppercase tracking-[0.16em]"
                            style={{ color: "#8B958F" }}
                          >
                            Geldrapport
                          </span>
                          <span
                            className="font-body rounded-full px-2.5 py-1 text-[10px] font-medium"
                            style={{ backgroundColor: "#F0F3F1", color: "#4A5A56" }}
                          >
                            {previewRapport.chip}
                          </span>
                        </div>

                        <p className="font-display mb-3 text-[19px] font-light leading-snug text-[#16211F]">
                          {previewRapport.verhaalTitel}
                        </p>
                        <p className="font-body mb-5 text-xs font-light leading-relaxed text-[#8B958F]">
                          {previewRapport.kenmerken.join(" · ")}
                        </p>

                        <div className="border-t border-[#EDF0EF] pt-5">
                          <p
                            className="font-body mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em]"
                            style={{ color: "#8B958F" }}
                          >
                            Wat ze vooraf dachten
                          </p>
                          <p className="font-body mb-5 text-sm font-light leading-relaxed text-[#4A5A56]">
                            {previewRapport.vermoedenBedrag}
                          </p>
                          <p
                            className="font-body mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em]"
                            style={{ color: "#8B958F" }}
                          >
                            Wat eruit kwam
                          </p>
                          <p className="font-body text-sm font-medium leading-snug text-[#16211F]">
                            {previewRapport.uitkomstKop}
                          </p>
                        </div>

                        <p
                          className="font-body mt-6 text-[10px] font-medium"
                          style={{ color: "#0B7A6E" }}
                        >
                          waar blijft het?
                        </p>
                      </div>

                      {/* Vel 2: de posten zoals ze in het rapport staan */}
                      <div className="rounded-2xl border border-[#D5E5E0] bg-white p-5 shadow-card sm:-ml-6 sm:mt-12 sm:w-[48%] sm:pl-9">
                        <p
                          className="font-body mb-4 text-[9px] font-semibold uppercase tracking-[0.16em]"
                          style={{ color: "#8B958F" }}
                        >
                          Vaste lasten in dit rapport
                        </p>
                        <ul>
                          {previewLasten.map((post) => (
                            <li
                              key={post.label}
                              className="border-b border-[#EDF0EF] py-2.5 last:border-0"
                            >
                              <p className="font-body text-[13px] font-medium leading-snug text-[#16211F]">
                                {post.label}
                              </p>
                              <p className="font-body text-[12px] font-light leading-snug text-[#4A5A56]">
                                {post.waarde}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <p
                          className="font-body mt-5 text-[10px] font-medium"
                          style={{ color: "#0B7A6E" }}
                        >
                          waar blijft het?
                        </p>
                      </div>
                    </div>

                    <p className="font-body mt-5 text-xs font-light leading-relaxed text-[#4A5A56]">
                      Dit is een echt rapport, gepubliceerd met toestemming van de klant.{" "}
                      <Link
                        href={`/rapporten/${previewRapport.slug}`}
                        className="hover:underline"
                        style={{ color: "#0B7A6E", textDecoration: "none" }}
                      >
                        Lees het helemaal →
                      </Link>
                    </p>
                  </>
                ) : null}
              </div>
            </div>

            {/* Trust-strip onder de preview */}
            <div className="mt-14 rounded-2xl border border-[#D5E5E0] bg-white px-6 py-7 sm:px-8">
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-3 sm:gap-8">
                {geldscanTrust.map((t) => (
                  <div key={t.titel} className="flex items-start gap-3.5">
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "#E7F1EE" }}
                    >
                      <TrustIcoontje naam={t.icoon} />
                    </span>
                    <div>
                      <p className="font-body mb-1 text-[14px] font-semibold leading-snug text-[#16211F]">
                        {t.titel}
                      </p>
                      <p className="font-body text-[13px] font-light leading-relaxed text-[#4A5A56]">
                        {t.tekst}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Afsluiting van de sectie: de enige knop hier gaat rechtstreeks
                naar het aanvraagformulier. De sectie hierboven vertelt al wat
                de Geldscan is, dus eerst doorsturen naar /geldscan zou dat
                verhaal een tweede keer laten lezen. */}
            <div className="mt-5 flex flex-col gap-6 rounded-2xl border border-[#D5E5E0] bg-white px-6 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-display mb-1.5 text-xl font-light text-[#16211F]">
                  Klaar om echt inzicht te krijgen?
                </p>
                <p className="font-body text-sm font-light leading-relaxed text-[#4A5A56]">
                  Ontdek wat er in jouw Geldscan staat.
                </p>
              </div>
              <CtaLink
                doel="geldscan"
                href="/aanbod/intake?pakket=geldscan"
                locatie="aanbod-geldscan-sectie"
                className="btn-primary lg:flex-shrink-0"
              >
                Geldscan aanvragen →
              </CtaLink>
            </div>
          </div>
        </section>

        {/* Sectie 3: de persoonlijke vervolgsessie, als vervolg op de Geldscan */}
        <section className="px-6 py-16 sm:py-20" style={{ backgroundColor: "#FDFAF4" }}>
          <div className="mx-auto max-w-[1180px]">
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              {/* Links: kop, intro en vier punten */}
              <div>
                <p
                  className="font-body mb-5 text-xs font-medium uppercase tracking-[0.18em]"
                  style={{ color: "#8B958F" }}
                >
                  Vervolgstap
                </p>
                <h2
                  className="font-display font-light text-[#16211F]"
                  style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.4rem)", lineHeight: 1.15 }}
                >
                  Persoonlijke vervolgsessie · €125
                </h2>
                <p className="font-body mt-3 text-lg font-medium" style={{ color: "#0B7A6E" }}>
                  Verdiep je inzicht. Bespreek wat je nu weet.
                </p>
                <p
                  className="font-body mt-4 max-w-[520px] font-light leading-relaxed"
                  style={{ color: "#4A5A56" }}
                >
                  Na je Geldscan kun je in een persoonlijke sessie je uitkomst bespreken. We kijken
                  samen naar de keuzes die bij jouw situatie passen.
                </p>

                <div className="mt-10">
                  {sessieVoordelen.map((v, i) => (
                    <div
                      key={v.titel}
                      className={
                        i > 0
                          ? "flex items-start gap-4 border-t border-[#EAE3D8] pt-6"
                          : "flex items-start gap-4"
                      }
                    >
                      <span
                        className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: "#FFFFFF" }}
                      >
                        <SessieIcoontje naam={v.icoon} />
                      </span>
                      <div className={i < sessieVoordelen.length - 1 ? "pb-6" : undefined}>
                        <p className="font-body mb-1.5 text-[15px] font-semibold leading-snug text-[#16211F]">
                          {v.titel}
                        </p>
                        <p className="font-body text-sm font-light leading-relaxed text-[#4A5A56]">
                          {v.tekst}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rechts: met wie je het gesprek hebt. Geen dashboard en geen
                  rapportpreview, alleen de persoon die de sessie doet. */}
              <div className="rounded-2xl p-6 sm:p-8" style={{ backgroundColor: "#F5F0E8" }}>
                <div className="mx-auto max-w-[380px] overflow-hidden rounded-2xl">
                  <Image
                    src="/jarno.jpg"
                    alt="Jarno Koopman"
                    width={400}
                    height={400}
                    sizes="(min-width: 1024px) 420px, 90vw"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="font-body mt-6 text-[15px] font-semibold text-[#16211F]">
                  Je spreekt mij, Jarno
                </p>
                <p className="font-body mt-1.5 text-sm font-light leading-relaxed text-[#4A5A56]">
                  Ik doe de sessies zelf, via video of telefoon, buiten kantoortijden.
                </p>
              </div>
            </div>

            {/* Onder beide kolommen: wanneer dit een logische stap is, met de
                knop naar de bestaande route voor het gesprek. */}
            <div className="mt-12 flex flex-col gap-6 rounded-2xl border border-[#EAE3D8] px-6 py-7 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div>
                <p className="font-body mb-1.5 text-[15px] font-semibold text-[#16211F]">
                  Wanneer kies je voor een vervolgsessie?
                </p>
                <p className="font-body max-w-[620px] text-sm font-light leading-relaxed text-[#4A5A56]">
                  Voor als je na je Geldscan wilt doorvragen, keuzes wilt bespreken of samen wilt
                  bepalen wat een logische volgende stap is. Bij {AANTAL_ZONDER_VERVOLG} van de{" "}
                  {RAPPORTEN.length} rapporten op deze site was een vervolg niet nodig.
                </p>
              </div>
              <Link href="/adviesgesprek" className="btn-outline lg:flex-shrink-0">
                Plan een sessie →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
