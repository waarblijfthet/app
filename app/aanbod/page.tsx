import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AanbodAccordion } from "./components/AanbodAccordion";
import { PAKKET_INFO } from "@/lib/aanbod-content";
import { TrackClick } from "@/components/TrackClick";
import CtaLink from "@/components/CtaLink";
import { ANALYSE_ROUTE, PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import { RAPPORTEN, rapportVoorSlug } from "@/lib/rapporten-data";

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

const faq = [
  {
    vraag: "Is dit hetzelfde als een budgetcoach of schuldhulp?",
    antwoord:
      "Nee. Schuldhulp en de meeste budgetcoaches werken met mensen die betalingsproblemen of schulden hebben. Ik werk met huishoudens die alles op tijd betalen, niets geks doen en toch structureel niets overhouden. Betaal je alles netjes op tijd maar snap je niet waarom er niets overblijft, dan zit je in de groep waarvoor ik werk.",
  },
  {
    vraag: "Ik heb geen schulden maar ook geen spaargeld. Is dit dan iets voor mij?",
    antwoord:
      "Ja, dat is de situatie waar ik voor ben. Geen crisis en ook geen rust. Wat ik doe is uitzoeken waar het naartoe gaat en dat opschrijven met de reden erbij. Of het daarna verandert, hangt af van wat je met dat rapport doet, en dat kan ik niet voor je beloven.",
  },
  {
    vraag: "Wat kost het, en waarom kost een kwartier bellen dan niets?",
    antwoord:
      "Het geldrapport kost 49 euro, eenmalig. Een kwartier kennismaken kost niets. Dat verschil zit niet in mijn goedheid maar in wat er gebeurt: in dat kwartier leg ik uit hoe ik werk en kijk ik niet naar jouw cijfers. Zodra het over jouw eigen bedragen gaat, is het werk, en werk breng ik in rekening. Dat is ook precies de grens die de wet trekt.",
  },
  {
    vraag: "Mag ik zien wat ik koop voordat ik betaal?",
    antwoord:
      "Ja, en dat vind ik ook niet meer dan normaal. Op de pagina Rapporten staan vijf complete rapporten van echte klanten, gepubliceerd met hun toestemming. Je leest hun cijfers, wat ze vooraf zelf dachten, wat ik erop schreef en wat er drie tot vier maanden later was veranderd. Namen zijn weggelaten, de bedragen zijn onveranderd.",
  },
  {
    vraag: "Geef je advies over beleggen, hypotheken of pensioen?",
    antwoord:
      "Nee. Ik kijk naar wat er maandelijks binnenkomt en waar het heen gaat. Over financiële producten geef ik geen advies en ik noem ook geen aanbieders. Wil je dat wel, dan heb je iemand met een vergunning nodig.",
  },
  {
    vraag: "Ben je gecertificeerd financieel adviseur?",
    antwoord:
      "Nee. Ik ben geen gecertificeerd financieel adviseur en ik val niet onder de AFM-vergunningplicht, omdat ik niet over financiële producten adviseer. Wat ik doe is rekenen en opschrijven: waar gaat het heen, wat valt er uit de toon en wat zou ik eraan doen. Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte. Dat is de reden dat ik dit doe.",
  },
  {
    vraag: "Wat gebeurt er met mijn gegevens?",
    antwoord:
      "Je vult de analyse in en stuurt optioneel een paar recente bankafschriften mee. Daarin mag je alles wegstrepen wat er voor mij niet toe doet: rekeningnummers, namen van andere mensen en betalingen die over iemand anders gaan. Ik heb de bedragen en de soort uitgave nodig, niet bij wie je hebt gepind. Ik ben de enige die ze inziet. Het rapport komt als PDF per e-mail, alleen naar jou. Direct na het versturen verwijder ik je afschriften en je analysegegevens. Je hoeft daar niet om te vragen en er blijft niets bewaard.",
  },
  {
    vraag: "Wat als er bij mij niets uit komt?",
    antwoord:
      "Dat kan gebeuren en dan zeg ik dat. Ik beloof niet dat er geld te vinden is. Vaker is de uitkomst dat je zwart op wit ziet dat het klopt, of dat het bedrag dat ontbreekt veel kleiner is dan het voelde. Bij twee van de vijf echte rapporten op deze site was de conclusie dat er niets te repareren viel, en bij de andere drie was het ontbrekende bedrag kleiner dan de klant vooraf dacht.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.vraag,
    acceptedAnswer: { "@type": "Answer", text: f.antwoord },
  })),
};

const details = [
  {
    id: "geldscan",
    pakket: "geldscan" as const,
    bg: "#F7F8F7",
    cardBg: "#FFFFFF",
    eyebrow: "Zonder gesprek · €49 eenmalig",
    titel: "Geldscan: jouw persoonlijke geldrapport",
    intro:
      "Jij levert je cijfers aan wanneer het uitkomt, ik schrijf op wat ik zie en wat ik zou doen. Zonder gesprek of agenda.",
    primaireHref: "/analyse",
    primaireLabel: "Doe eerst de gratis analyse",
    secundaireHref: "/geldscan",
    secundaireLabel: "Al uit je analyse en benieuwd naar het waarom? Bekijk de Geldscan",
  },
];

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

        {/* Ik doe één ding */}
        <section className="px-6 py-14" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display mb-5 text-2xl font-light text-[#16211F] sm:text-3xl">
              Ik doe één ding
            </h2>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Ik kijk naar de cijfers van huishoudens in loondienst die goed verdienen en toch elke maand krap zitten, en ik schrijf op wat ik zie. Je krijgt een rapport dat ik met de hand schrijf, over jouw bedragen, met de drie dingen die het meest opvallen en per stuk wat ik zou doen. Geen sjabloon, geen algoritme, geen traject dat je vooraf moet kopen.
            </p>
            <p className="font-body max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Vijf van die rapporten staan compleet op deze site, met toestemming van de klanten. Je leest hun ingevulde cijfers, wat ze vooraf zelf dachten, wat ik erop schreef en wat er drie tot vier maanden later werkelijk was veranderd. Namen zijn weggelaten, de bedragen staan er onveranderd. Bij twee van de vijf was mijn conclusie dat er niets te repareren viel.
            </p>
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

            {/* Afsluiting van de sectie: de enige knop hier gaat naar de Geldscan */}
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
                href="/geldscan"
                locatie="aanbod-geldscan-sectie"
                className="btn-primary lg:flex-shrink-0"
              >
                Bekijk de Geldscan →
              </CtaLink>
            </div>
          </div>
        </section>

        {/* Het gratis kwartier */}
        <section className="px-6 py-14" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-[860px]">
            <p className="section-eyebrow mb-3">Vrijblijvend · 15 minuten · geen kosten</p>
            <h2 className="font-display mb-4 text-2xl font-light text-[#16211F] sm:text-3xl">
              Liever eerst weten met wie je te maken hebt
            </h2>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Je koopt hier iets van iemand die je niet kent, en dat is een rare transactie. Daarom kun je me eerst een kwartier spreken. Video of telefoon, wat jij wilt, en ik doe ze buiten kantoortijden omdat ik dit naast mijn baan doe.
            </p>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              In dat kwartier kijk ik niet naar jouw cijfers. Ik leg uit wat ik doe, wat er in een geldrapport staat, wat er met je gegevens gebeurt en voor wie dit niet werkt. Jij stelt de vragen die je op de site niet beantwoord krijgt. Zodra het over jouw bedragen gaat, is het werk, en dat is de geldscan.
            </p>
            <p className="font-body mb-6 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Ik verkoop je in dat kwartier niets. Aan het eind zeg ik wat volgens mij de logische volgende stap is, en verder hoor ik het wel. Ik doe er maximaal drie per week, dus het kan zijn dat het een week later is.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl?subject=Kennismaken%20(15%20minuten)"
              className="font-body inline-flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-medium"
              style={{ borderColor: "#0B7A6E", color: "#0B7A6E", textDecoration: "none" }}
            >
              Vraag een kwartier aan →
            </a>
            <p className="font-body mt-3 text-xs font-light text-[#8B958F]">
              Mail met als onderwerp Kennismaken. Zet erin wanneer het je schikt, dan stel ik een moment voor.
            </p>
          </div>
        </section>

        {/* Voor wie het geldrapport werkt */}
        <section className="px-6 py-14" style={{ backgroundColor: "#F7F8F7" }}>
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display mb-4 text-2xl font-light text-[#16211F] sm:text-3xl">
              Voor wie het geldrapport werkt
            </h2>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Het geldrapport werkt het best voor huishoudens in loondienst met een bovenmodaal inkomen, die alle rekeningen op tijd betalen en toch weinig overhouden. Ik vraag je om je cijfers volledig in te vullen, dat is nodig om precies te zien waar het weglekt.
            </p>
            <p className="font-body mb-6 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Heb je betalingsachterstanden of schulden, dan hoor je bij de kosteloze hulp van je gemeente en dan is dit niet de juiste plek. Dat is geen formaliteit, dat is een ander vak.
            </p>
            <CtaLink doel="analyse" href={ANALYSE_ROUTE} locatie="aanbod-voor-wie" className="btn-primary">
              {PRIMAIRE_CTA_LABEL} →
            </CtaLink>
            <p className="font-body mt-3 text-sm font-light text-[#4A5A56]">
              <CtaLink doel="geldscan" href="/geldscan" locatie="aanbod-voor-wie" className="hover:underline" style={{ color: "#0B7A6E", textDecoration: "none" }}>
                Al uit je analyse en benieuwd naar het waarom? Bekijk de Geldscan →
              </CtaLink>
            </p>
          </div>
        </section>

        {/* Adviesgesprek en traject, op aanvraag */}
        <section className="px-6 py-14" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display mb-4 text-2xl font-light text-[#16211F] sm:text-3xl">
              En als een rapport niet genoeg is
            </h2>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Soms is een rapport niet waar iemand naar zoekt. Dan is er een eenmalig gesprek van 45 minuten via video, 125 euro, waarin ik met je meedenk en jij kunt doorvragen. Je krijgt daarna een schriftelijke samenvatting, ook om met je partner te lezen. En er is een traject van drie maanden, 497 euro, waarin ik een plan met je opstel en blijf meekijken tot het staat. Daar neem ik maximaal drie mensen tegelijk voor aan, omdat ik dit naast mijn baan doe.
            </p>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Beide zet ik niet als knop op deze pagina, omdat ik ze bijna nooit als eerste stap zou aanraden.{" "}
              <CtaLink doel="analyse" href={ANALYSE_ROUTE} locatie="aanbod-advies-traject" className="hover:underline" style={{ color: "#0B7A6E", textDecoration: "none" }}>
                Begin eerst met de gratis analyse
              </CtaLink>
              , en als een gesprek of een traject beter past, dan zeg ik dat.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl"
              className="font-body inline-flex items-center gap-1.5 text-sm font-medium"
              style={{ color: "#0B7A6E", textDecoration: "none" }}
            >
              Mail me waar je aan denkt →
            </a>
          </div>
        </section>

        {/* Wanneer je hier niets aan hebt */}
        <section className="px-6 py-14" style={{ backgroundColor: "#F7F8F7" }}>
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display mb-4 text-2xl font-light text-[#16211F] sm:text-3xl">
              Wanneer je hier niets aan hebt
            </h2>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Als je betalingsachterstanden of schulden hebt, dan hoor je bij de schuldhulp van je gemeente en die is kosteloos. Dat is beter werk dan wat ik doe en het is een ander vak.
            </p>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Als je een advies wil over een hypotheek, een verzekering, je pensioen of beleggen, dan moet je bij iemand met een vergunning zijn. Die heb ik niet en die wil ik ook niet, want dan word ik iemand die producten verkoopt.
            </p>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Als je op zoek bent naar een manier om zo zuinig mogelijk te leven, dan heb ik niets voor je. Ik reken uit waar het geld heen gaat en ik zet erbij welke posten ik géén lek vind. Vaak is dat de helft van het overzicht.
            </p>
            <p className="font-body max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              En als je hoopt dat er altijd geld te vinden is: dat beloof ik niet. Soms is de uitkomst dat het klopt, en dat je alleen niet wist waarom.
            </p>
          </div>
        </section>

        {/* Detail-sectie: geldrapport, proces (links) strikt gescheiden van inhoud (rechts) */}
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
                  <CtaLink doel="analyse" href={d.primaireHref} locatie={`aanbod-detail-${d.id}`} className="btn-primary">
                    {d.primaireLabel} →
                  </CtaLink>
                  <CtaLink
                    doel="geldscan"
                    href={d.secundaireHref}
                    locatie={`aanbod-detail-${d.id}`}
                    className="font-body text-sm hover:underline"
                    style={{ color: "#0B7A6E", textDecoration: "none" }}
                  >
                    {d.secundaireLabel} →
                  </CtaLink>
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
              Je hoeft nog niets te kopen
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
              Doe eerst de gratis analyse. Daarna bepaal je zelf of je verder wilt. Wil je vooraf zien wat een geldrapport is, dan staan op de pagina Rapporten vijf complete rapporten van echte klanten, met de bedragen erbij en met de posten die ik géén probleem vind. Bij twee van de vijf was de uitkomst dat er niets te repareren viel.
            </p>
            <CtaLink
              doel="analyse"
              href={ANALYSE_ROUTE}
              locatie="aanbod-slot"
              className="font-body inline-block px-8 py-3 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#0B7A6E",
                color: "#FFFFFF",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              {PRIMAIRE_CTA_LABEL} →
            </CtaLink>
            <p style={{ marginTop: "1rem" }}>
              <Link href="/rapporten" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem" }}>
                Of bekijk eerst vijf echte rapporten →
              </Link>
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              <CtaLink doel="geldscan" href="/geldscan" locatie="aanbod-slot" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem" }}>
                Al uit je analyse en benieuwd naar het waarom? Bekijk de Geldscan →
              </CtaLink>
            </p>
            <p style={{ marginTop: "0.75rem", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
              Eenmalig · voor huishoudens in heel Nederland · je gegevens worden nooit gedeeld of verkocht
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
