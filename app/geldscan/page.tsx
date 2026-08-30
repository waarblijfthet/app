import type { Metadata } from "next";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { analyseHref, type SituatieSleutel } from "@/lib/cta";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: "Geldscan: waarom houd jij zo weinig over? €49",
  description:
    "Je bankapp laat zien wat je hebt uitgegeven. De Geldscan legt uit waarom dat bij jouw huishouden zo uitpakt en wat ik concreet zou veranderen. Persoonlijk geschreven, €49 eenmalig, binnen 2 werkdagen.",
  alternates: { canonical: "https://www.waarblijfthet.nl/geldscan" },
  openGraph: {
    title: "Geldscan: waarom houd jij zo weinig over? €49",
    description:
      "Ik analyseer je inkomsten en uitgaven en geef je duidelijkheid over wat opvalt, waarom en wat je ermee kunt. €49 eenmalig.",
    url: "https://www.waarblijfthet.nl/geldscan",
    type: "website",
  },
  robots: { index: true, follow: true },
};

/* ────────────────────────────────────────────────────────────────
   Deze pagina is de productpagina van de Geldscan en heeft precies
   één koopproces: hero, prijs, zo werkt het, wat je krijgt, faq,
   slot. Alles wat hier eerder dubbel stond (twee processecties, een
   tweede uitleg over afschriften, drie koopblokken) is weg. Wie een
   sectie toevoegt haalt er dus eerst een weg.

   De enige actie op deze pagina is Start de Geldscan, naar de
   bestaande intakeroute. De gratis analyse staat er alleen als
   tekstlink in stap 1, voor wie hem al gedaan heeft.
   ──────────────────────────────────────────────────────────────── */

const SITUATIE_SLEUTELS: SituatieSleutel[] = [
  "gezin",
  "alleenstaand",
  "stel",
  "alleenstaande-ouder",
  "zzp",
];

function isSituatie(v: string | undefined): v is SituatieSleutel {
  return !!v && SITUATIE_SLEUTELS.includes(v as SituatieSleutel);
}

/** Getal uit de URL, alleen als het binnen een geloofwaardige marge valt. */
function bedragUitUrl(v: string | undefined, min: number, max: number): string | null {
  if (!v) return null;
  const n = Number(v.replace(/[^\d]/g, ""));
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return String(n);
}

/* --- Iconen ------------------------------------------------------------
   Eén set lijniconen, dezelfde stijl als op /aanbod: 1,4 stroke, geen
   vlakken, altijd in het accentgroen. */

type IcoonNaam =
  | "persoon"
  | "document"
  | "loep"
  | "rapport"
  | "staaf"
  | "lamp"
  | "checklist"
  | "doel"
  | "slot"
  | "pen"
  | "envelop"
  | "prijs";

const ICOON_PADEN: Record<IcoonNaam, React.ReactNode> = {
  persoon: (
    <>
      <circle cx="12" cy="8.5" r="3.4" />
      <path d="M5.5 20c0-3.3 2.9-5.4 6.5-5.4s6.5 2.1 6.5 5.4" />
    </>
  ),
  document: (
    <>
      <path d="M6 3.5h7.5L18 8v12.5H6z" />
      <path d="M13.5 3.5V8H18" />
      <path d="M9 12.5h6" />
      <path d="M9 16h4" />
    </>
  ),
  loep: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M19.5 19.5l-3.6-3.6" />
    </>
  ),
  rapport: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8.5 8.5h7" />
      <path d="M8.5 12h7" />
      <path d="M8.5 15.5h4" />
    </>
  ),
  staaf: (
    <>
      <path d="M6 19.5V12" />
      <path d="M12 19.5V6.5" />
      <path d="M18 19.5V9.5" />
    </>
  ),
  lamp: (
    <>
      <path d="M9.2 16.5a5.5 5.5 0 1 1 5.6 0v1.6H9.2z" />
      <path d="M10 21h4" />
    </>
  ),
  checklist: (
    <>
      <path d="M4 7l1.6 1.6L8.5 5.5" />
      <path d="M4 13l1.6 1.6L8.5 11.5" />
      <path d="M4 19l1.6 1.6L8.5 17.5" />
      <path d="M11.5 7h8.5" />
      <path d="M11.5 13h8.5" />
      <path d="M11.5 19h6" />
    </>
  ),
  doel: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  slot: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" />
    </>
  ),
  pen: (
    <>
      <path d="M4 20l.9-3.6L15.5 5.8a2 2 0 0 1 2.8 2.8L7.7 19.1z" />
      <path d="M13.8 7.5l2.8 2.8" />
    </>
  ),
  envelop: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M3.5 7.5l8.5 6 8.5-6" />
    </>
  ),
  prijs: (
    <>
      <path d="M12.5 3.5H20v7.5l-9 9L3.5 12.5z" />
      <circle cx="16.2" cy="7.5" r="1.3" />
    </>
  ),
};

function Icoon({ naam, maat = 19 }: { naam: IcoonNaam; maat?: number }) {
  return (
    <svg
      width={maat}
      height={maat}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0B7A6E"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICOON_PADEN[naam]}
    </svg>
  );
}

/* --- Rapportpreview ----------------------------------------------------
   De preview toont de opbouw van een Geldscan, niet de inhoud van een
   klant. Er staan daarom geen bedragen in: de regels zijn balkjes en de
   ring is een vorm zonder waardes. Twee keer staat erbij dat dit een
   voorbeeldweergave is, op het vel zelf en in de regel eronder. Wie hier
   ooit een bedrag in zet maakt er een verzonnen klantcase van. */

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

/* --- Hero: twee korte waarden ----------------------------------------- */

const heroWaarden: { icoon: IcoonNaam; titel: string; tekst: string }[] = [
  {
    icoon: "persoon",
    titel: "Persoonlijk geschreven",
    tekst: "Geen standaardrapport.",
  },
  {
    icoon: "document",
    titel: "Je ziet de onderbouwing",
    tekst: "De cijfers en mijn conclusie staan er allebei in.",
  },
];

/* --- Het enige proces op deze pagina ---------------------------------- */

const stappen: {
  icoon: IcoonNaam;
  titel: string;
  tekst: React.ReactNode;
  optioneel?: string;
}[] = [
  {
    icoon: "persoon",
    titel: "Start met je situatie",
    tekst: (
      <>
        Je vult je gegevens en financiële situatie in. Heb je de{" "}
        <CtaLink
          doel="analyse"
          href={analyseHref()}
          locatie="geldscan-stap1"
          className="font-medium hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          gratis analyse
        </CtaLink>{" "}
        al gedaan? Dan kun je daarop voortbouwen.
      </>
    ),
  },
  {
    icoon: "document",
    titel: "Deel wat je hebt",
    tekst: (
      <>
        Je kunt bankafschriften toevoegen als je die hebt. Handig voor extra detail, maar niet
        nodig om de Geldscan te maken.
      </>
    ),
    optioneel: "Optioneel, maar handig voor extra detail.",
  },
  {
    icoon: "loep",
    titel: "Ik analyseer jouw situatie",
    tekst: (
      <>
        Ik kijk naar je inkomsten, uitgaven en opvallende verschillen en leg verbanden tussen de
        cijfers.
      </>
    ),
  },
  {
    icoon: "rapport",
    titel: "Je ontvangt je Geldscan",
    tekst: (
      <>
        Binnen 2 werkdagen ontvang je je persoonlijke rapport met wat opvalt, waarom het opvalt en
        waar ik als eerste naar zou kijken.
      </>
    ),
  },
];

const procesTrust: { icoon: IcoonNaam; titel: string; tekst: string }[] = [
  {
    icoon: "slot",
    titel: "Jouw gegevens zijn veilig",
    tekst:
      "Alleen ik zie ze. Direct na het versturen van je rapport verwijder ik wat je hebt aangeleverd.",
  },
  {
    icoon: "pen",
    titel: "Ik schrijf het zelf",
    tekst: "Geen algoritme, geen sjabloon en geen team dat meekijkt.",
  },
];

/* --- Wat je krijgt ----------------------------------------------------- */

const watJeKrijgt: { icoon: IcoonNaam; titel: string; tekst: string }[] = [
  {
    icoon: "staaf",
    titel: "Duidelijke uitleg",
    tekst: "Je ziet precies wat opvalt in jouw cijfers.",
  },
  {
    icoon: "lamp",
    titel: "Inzicht in oorzaken",
    tekst: "Ik leg uit waarom het verschil ontstaat.",
  },
  {
    icoon: "checklist",
    titel: "Concrete aandachtspunten",
    tekst: "Praktische punten waar je direct mee kunt.",
  },
  {
    icoon: "doel",
    titel: "Persoonlijk advies",
    tekst: "Onafhankelijk, zonder provisies of producten, geschreven voor jouw situatie.",
  },
];

/* --- FAQ ---------------------------------------------------------------
   Alleen vragen die een aankoop kunnen blokkeren. De uitleg over
   afschriften en over privacy staat hier, en nergens anders meer op de
   pagina. */

const faq = [
  {
    vraag: "Moet ik bankafschriften aanleveren?",
    antwoord:
      "Nee, dat is optioneel. De ingevulde analyse is meestal voldoende. Met afschriften kan ik preciezer naar je uitgaven kijken. Je mag daarin wegstrepen wat er voor mij niet toe doet, zoals rekeningnummers en namen van anderen. Ik heb de bedragen en de soort uitgave nodig, niet bij wie je hebt gepind.",
  },
  {
    vraag: "Is mijn informatie veilig?",
    antwoord:
      "Alleen ik zie wat je aanlevert. Er kijkt geen team en geen algoritme mee, en je gegevens gaan niet naar derden. Direct na het versturen van je rapport verwijder ik je afschriften en de gegevens die je hebt ingevuld.",
  },
  {
    vraag: "Hoe lang duurt het?",
    antwoord:
      "Je krijgt je rapport binnen 2 werkdagen nadat je informatie compleet is. Het aanleveren zelf kost je een paar minuten.",
  },
  {
    vraag: "Is de Geldscan automatisch?",
    antwoord:
      "Nee. Ik schrijf elk rapport zelf, met de hand. Er is geen sjabloon waarin ik jouw bedragen giet, en er kijkt geen algoritme mee.",
  },
  {
    vraag: "Krijg ik alleen advies om te bezuinigen?",
    antwoord: `Nee. Soms is een dure uitgave helemaal geen probleem, en dan schrijf ik dat op. Ik kijk naar het geheel: wat wijkt af, wat wijkt juist niet af, en waar zit de ruimte werkelijk. Bij ${AANTAL_ZONDER_LEK} van de ${RAPPORTEN.length} gepubliceerde rapporten was mijn conclusie dat er niets te repareren viel.`,
  },
  {
    vraag: "Is dit financieel advies?",
    antwoord:
      "Nee. De Geldscan is een persoonlijke analyse van je huishoudfinanciën. Voor belasting, hypotheek, beleggen en vergelijkbaar gespecialiseerd advies verwijs ik waar nodig door. Ik ben ook geen schuldhulp: heb je betalingsachterstanden, dan is kosteloze hulp via je gemeente of Geldfit passender.",
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Persoonlijke geldscan",
  name: "Geldscan, Waar blijft het",
  description:
    "Persoonlijk geschreven geldrapport over je huishoudfinanciën. Wat opvalt, waarom het opvalt en waar ik als eerste naar zou kijken. Binnen 2 werkdagen na aanlevering van je cijfers. €49 eenmalig.",
  url: "https://www.waarblijfthet.nl/geldscan",
  areaServed: { "@type": "Country", name: "Nederland" },
  provider: {
    "@type": "Person",
    name: "Jarno Koopman",
    jobTitle: "Financieel coach",
    url: "https://www.waarblijfthet.nl/over",
  },
  offers: {
    "@type": "Offer",
    name: "Geldscan met persoonlijk geldrapport",
    price: "49",
    priceCurrency: "EUR",
    url: "https://www.waarblijfthet.nl/geldscan",
  },
};

/* Het pijltje van een open vraag. De rotatie zit op de omhullende span,
   zodat de svg zelf alleen vorm is en geen transform draagt. */
function Chevron() {
  return (
    <span
      aria-hidden="true"
      className="flex flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#8B958F"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9.5l6 6 6-6" />
      </svg>
    </span>
  );
}

export default function GeldscanPage({
  searchParams,
}: {
  searchParams?: {
    token?: string;
    situatie?: string;
    inkomen?: string;
    boodschappen?: string;
  };
}) {
  const token = searchParams?.token;
  const situatieSleutel = isSituatie(searchParams?.situatie) ? searchParams.situatie : undefined;
  const inkomen = bedragUitUrl(searchParams?.inkomen, 500, 20000);
  const boodschappen = bedragUitUrl(searchParams?.boodschappen, 50, 3000);

  /* De bestaande aanmeldroute. Alles wat we al van deze bezoeker weten
     reist mee, zodat hij het in de intake niet opnieuw invult. */
  const intakeParams = new URLSearchParams({ pakket: "geldscan" });
  if (token) intakeParams.set("token", token);
  if (situatieSleutel) intakeParams.set("situatie", situatieSleutel);
  if (inkomen) intakeParams.set("inkomen", inkomen);
  if (boodschappen) intakeParams.set("boodschappen", boodschappen);
  const intakeHref = `/aanbod/intake?${intakeParams.toString()}`;

  const StartKnop = ({ locatie }: { locatie: string }) => (
    <CtaLink doel="geldscan" href={intakeHref} locatie={locatie} className="btn-primary">
      Start de Geldscan →
    </CtaLink>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />

      <main>
        {/* ── 1. Hero, met de koopbalk als afsluiting ─────────────────────
            Links de belofte en twee korte waarden, rechts hoe het
            eindproduct eruitziet. De koopbalk staat direct onder de hero
            in dezelfde zone, zodat de prijs meteen in beeld is en er maar
            één knop boven de vouw staat. */}
        <section
          className="overflow-hidden px-6 pb-14 pt-14 sm:pt-20 lg:pb-20 lg:pt-24"
          style={{ backgroundColor: "#F7F8F7" }}
        >
          <div className="mx-auto max-w-[1180px]">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
              {/* Links: belofte en waarden */}
              <div>
                <p
                  className="font-body mb-6 text-xs font-medium uppercase tracking-[0.18em]"
                  style={{ color: "#8B958F" }}
                >
                  De Geldscan
                </p>

                <h1
                  className="font-display font-light text-[#16211F]"
                  style={{
                    fontSize: "clamp(2.1rem, 4vw, 3.05rem)",
                    lineHeight: 1.12,
                    marginBottom: "1rem",
                  }}
                >
                  Geldscan · €49
                </h1>

                <p
                  className="font-body text-lg font-medium leading-snug"
                  style={{ color: "#0B7A6E" }}
                >
                  Het complete inzicht in jouw geld.
                </p>

                <p
                  className="font-body mt-5 max-w-[470px] font-light leading-relaxed"
                  style={{ fontSize: "1.05rem", color: "#4A5A56" }}
                >
                  Ik analyseer je inkomsten en uitgaven en geef je duidelijkheid over wat opvalt,
                  waarom en wat je ermee kunt.
                </p>

                <div className="mt-9 grid max-w-[500px] grid-cols-1 gap-6 sm:grid-cols-2">
                  {heroWaarden.map((w) => (
                    <div key={w.titel} className="flex items-start gap-3.5">
                      <span
                        className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: "#FFFFFF" }}
                      >
                        <Icoon naam={w.icoon} />
                      </span>
                      <div>
                        <p className="font-body mb-1 text-[14px] font-semibold leading-snug text-[#16211F]">
                          {w.titel}
                        </p>
                        <p className="font-body text-[13px] font-light leading-relaxed text-[#4A5A56]">
                          {w.tekst}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rechts: hoe het eindproduct eruitziet */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 hidden h-[440px] w-[440px] rounded-full lg:block"
                  style={{ backgroundColor: "rgba(196, 96, 58, 0.07)" }}
                />

                <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                  {/* Achterste vel: het uitgavenoverzicht. */}
                  <div
                    aria-hidden="true"
                    className="absolute -right-4 -top-8 hidden w-[68%] rounded-xl border border-[#E6E9E7] bg-white p-5 sm:block"
                    style={{
                      transform: "rotate(3deg)",
                      boxShadow: "0 2px 20px rgba(22, 33, 31, 0.06)",
                    }}
                  >
                    <PreviewKopje tekst="Uitgavenoverzicht" />
                    <div className="flex flex-row-reverse items-center gap-4">
                      <svg width="72" height="72" viewBox="0 0 42 42" className="flex-shrink-0">
                        <circle cx="21" cy="21" r="15.9" fill="none" stroke="#EDF0EF" strokeWidth="7" />
                        <circle
                          cx="21"
                          cy="21"
                          r="15.9"
                          fill="none"
                          stroke="#0B7A6E"
                          strokeWidth="7"
                          strokeDasharray="34 66"
                          strokeDashoffset="25"
                        />
                        <circle
                          cx="21"
                          cy="21"
                          r="15.9"
                          fill="none"
                          stroke="#9FCFC5"
                          strokeWidth="7"
                          strokeDasharray="22 78"
                          strokeDashoffset="-9"
                        />
                      </svg>
                      <div className="flex-1 space-y-[9px]">
                        {["78%", "62%", "88%", "54%", "70%"].map((b) => (
                          <Balk key={b} breedte={b} />
                        ))}
                      </div>
                    </div>
                    <div className="mt-5 border-t border-[#EDF0EF] pt-4">
                      <PreviewKopje tekst="Waar gaat je geld naartoe?" />
                      <div className="space-y-[9px]">
                        <Balk breedte="92%" />
                        <Balk breedte="64%" />
                      </div>
                    </div>
                  </div>

                  {/* Voorste vel: de eerste pagina van het rapport. */}
                  <div className="relative rounded-xl border border-[#E6E9E7] bg-white p-6 shadow-card sm:w-[86%] sm:p-8">
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

                    <p className="font-display mb-1 text-2xl font-light leading-tight text-[#16211F] sm:text-[28px]">
                      Geldscan
                    </p>
                    <p className="font-body mb-6 text-xs font-light text-[#8B958F]">
                      Jouw persoonlijke rapport
                    </p>

                    <div className="mb-6 border-t border-[#EDF0EF] pt-6">
                      <PreviewKopje tekst="Samenvatting" />
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

            {/* ── 2. Prijs en actie ─────────────────────────────────────
                Eén koopbalk, direct onder de hero. De prijs staat op deze
                pagina verder alleen nog in het slot. */}
            <div
              id="prijs"
              className="mt-14 flex flex-col gap-6 rounded-2xl border border-[#E6E9E7] bg-white px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
              style={{ scrollMarginTop: "90px" }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "#E7F1EE" }}
                >
                  <Icoon naam="prijs" maat={21} />
                </span>
                <div>
                  <p className="font-display mb-1 text-xl font-light leading-snug text-[#16211F]">
                    €49 eenmalig
                  </p>
                  <p className="font-body max-w-[440px] text-sm font-light leading-relaxed text-[#4A5A56]">
                    Je betaalt één keer en ontvangt je persoonlijke rapport binnen 2 werkdagen
                    nadat je informatie compleet is.
                  </p>
                </div>
              </div>

              <div className="lg:flex-shrink-0 lg:text-center">
                <StartKnop locatie="geldscan-koopbalk" />
                <p className="font-body mt-3 text-xs font-light text-[#8B958F]">Geen abonnement.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Zo werkt de Geldscan ─────────────────────────────────────
            Het enige proces op deze pagina. Op desktop een horizontale
            reis, op mobiel een verticale lijn met een eigen opbouw. Stap 2
            is expliciet als optioneel gemarkeerd, want daar haken mensen
            af die denken dat ze eerst hun afschriften moeten uitzoeken. */}
        <section className="px-6 py-16 sm:py-20" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-[1080px]">
            <div className="mx-auto max-w-[620px] text-center">
              <h2
                className="font-display font-light text-[#16211F]"
                style={{ fontSize: "clamp(1.75rem, 3.1vw, 2.35rem)", lineHeight: 1.15 }}
              >
                Zo werkt de Geldscan
              </h2>
              <p className="font-body mt-3 font-light leading-relaxed text-[#4A5A56]">
                In vier heldere stappen naar persoonlijk inzicht.
              </p>
            </div>

            {/* Desktop: horizontale reis */}
            <ol className="mt-14 hidden md:grid md:grid-cols-4 md:gap-x-8">
              {stappen.map((s, i) => (
                <li key={s.titel} className="relative">
                  {i < stappen.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute h-px"
                      style={{
                        left: "4.5rem",
                        top: "2rem",
                        width: "calc(100% + 2rem - 5rem)",
                        backgroundColor: "#E6E9E7",
                      }}
                    />
                  )}
                  <span
                    className="relative flex h-16 w-16 items-center justify-center rounded-full border"
                    style={{ backgroundColor: "#F7F8F7", borderColor: "#D5E5E0" }}
                  >
                    <Icoon naam={s.icoon} maat={24} />
                    <span
                      className="font-body absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold"
                      style={{ backgroundColor: "#16211F", color: "#FFFFFF" }}
                    >
                      {i + 1}
                    </span>
                  </span>

                  <p className="font-body mb-2 mt-6 text-[15px] font-semibold leading-snug text-[#16211F]">
                    {s.titel}
                  </p>
                  <p className="font-body pr-4 text-sm font-light leading-relaxed text-[#4A5A56]">
                    {s.tekst}
                  </p>
                  {s.optioneel && (
                    <p
                      className="font-body mt-3 inline-block rounded-lg px-3 py-2 text-xs font-medium leading-snug"
                      style={{ backgroundColor: "#F0F3F1", color: "#4A5A56" }}
                    >
                      {s.optioneel}
                    </p>
                  )}
                </li>
              ))}
            </ol>

            {/* Mobiel: verticale reis, bewust een eigen opbouw */}
            <ol className="mt-10 md:hidden">
              {stappen.map((s, i) => (
                <li key={s.titel} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className="font-body flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-semibold"
                      style={{ backgroundColor: "#16211F", color: "#FFFFFF" }}
                    >
                      {i + 1}
                    </span>
                    {i < stappen.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="w-px flex-1"
                        style={{ backgroundColor: "#E6E9E7" }}
                      />
                    )}
                  </div>

                  <div className={i < stappen.length - 1 ? "pb-8" : undefined}>
                    <div className="mb-2 flex items-center gap-3">
                      <span
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ backgroundColor: "#E7F1EE" }}
                      >
                        <Icoon naam={s.icoon} maat={18} />
                      </span>
                      <p className="font-body text-[15px] font-semibold leading-snug text-[#16211F]">
                        {s.titel}
                      </p>
                    </div>
                    <p className="font-body text-sm font-light leading-relaxed text-[#4A5A56]">
                      {s.tekst}
                    </p>
                    {s.optioneel && (
                      <p
                        className="font-body mt-3 inline-block rounded-lg px-3 py-2 text-xs font-medium leading-snug"
                        style={{ backgroundColor: "#F0F3F1", color: "#4A5A56" }}
                      >
                        {s.optioneel}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            {/* Wat er met je gegevens gebeurt, en wie het rapport schrijft */}
            <div
              className="mt-14 rounded-2xl px-6 py-7 sm:px-8"
              style={{ backgroundColor: "#F7F8F7" }}
            >
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-10">
                {procesTrust.map((t) => (
                  <div key={t.titel} className="flex items-start gap-3.5">
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "#FFFFFF" }}
                    >
                      <Icoon naam={t.icoon} />
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

            <p className="font-body mt-8 flex flex-wrap items-center justify-center gap-2 text-sm font-light text-[#4A5A56]">
              <Icoon naam="envelop" maat={17} />
              <span>Vragen of hulp nodig?</span>
              <a
                href="mailto:hallo@waarblijfthet.nl?subject=Geldscan"
                className="font-medium hover:underline"
                style={{ color: "#0B7A6E" }}
              >
                Neem contact op →
              </a>
            </p>
          </div>
        </section>

        {/* ── 4. Wat je krijgt ────────────────────────────────────────
            Vier korte items, geen kaarten. Daaronder staat het enige
            bewijsblok van de pagina: de echte rapporten. Aantallen komen
            altijd uit lib/rapporten-data.ts, nooit met de hand getypt. */}
        <section className="px-6 py-16 sm:py-20" style={{ backgroundColor: "#E7F1EE" }}>
          <div className="mx-auto max-w-[1080px]">
            <h2
              className="font-display text-center font-light text-[#16211F]"
              style={{ fontSize: "clamp(1.75rem, 3.1vw, 2.35rem)", lineHeight: 1.15 }}
            >
              Wat je krijgt
            </h2>

            <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
              {watJeKrijgt.map((w) => (
                <div key={w.titel} className="flex flex-col items-center text-center">
                  <span
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <Icoon naam={w.icoon} maat={22} />
                  </span>
                  <p className="font-body mb-2 text-[15px] font-semibold leading-snug text-[#16211F]">
                    {w.titel}
                  </p>
                  <p className="font-body max-w-[240px] text-sm font-light leading-relaxed text-[#4A5A56]">
                    {w.tekst}
                  </p>
                </div>
              ))}
            </div>

            <p className="font-body mx-auto mt-12 max-w-[660px] text-center text-sm font-light leading-relaxed text-[#4A5A56]">
              Er staan {RAPPORTEN.length} complete rapporten op deze site, met de cijfers, mijn
              advies en de evaluatie van de klant. Bij {AANTAL_ZONDER_LEK} van de{" "}
              {RAPPORTEN.length} was mijn conclusie dat er niets te repareren viel.{" "}
              <Link
                href="/rapporten"
                className="font-medium hover:underline"
                style={{ color: "#0B7A6E", textDecoration: "none" }}
              >
                Lees ze na →
              </Link>
            </p>
          </div>
        </section>

        {/* ── 5. Veelgestelde vragen ──────────────────────────────────
            Alleen bezwaren die een aankoop tegenhouden. De uitleg over
            afschriften en privacy staat hier, en nergens anders. */}
        <section className="px-6 py-16 sm:py-20" style={{ backgroundColor: "#FDFAF4" }}>
          <div className="mx-auto max-w-[760px]">
            <h2
              className="font-display text-center font-light text-[#16211F]"
              style={{ fontSize: "clamp(1.75rem, 3.1vw, 2.35rem)", lineHeight: 1.15 }}
            >
              Veelgestelde vragen
            </h2>

            <div className="mt-10 space-y-3">
              {faq.map((f) => (
                <details
                  key={f.vraag}
                  className="group rounded-xl border border-[#EAE3D8] bg-white px-5 py-4 sm:px-6"
                >
                  <summary className="font-body flex cursor-pointer select-none items-center justify-between gap-4 text-[15px] font-medium leading-snug text-[#16211F]">
                    <span>{f.vraag}</span>
                    <Chevron />
                  </summary>
                  <p className="font-body mt-3 text-sm font-light leading-relaxed text-[#4A5A56]">
                    {f.antwoord}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. Slot ─────────────────────────────────────────────────── */}
        <section className="px-6 py-16 sm:py-20" style={{ backgroundColor: "#16211F" }}>
          <div className="mx-auto flex max-w-[900px] flex-col items-center gap-8 text-center lg:flex-row lg:gap-12 lg:text-left">
            <span
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              aria-hidden="true"
            >
              <Icoon naam="rapport" maat={26} />
            </span>

            <div className="flex-1">
              <h2
                className="font-display font-light text-white"
                style={{ fontSize: "clamp(1.7rem, 3vw, 2.2rem)", lineHeight: 1.18 }}
              >
                Klaar voor inzicht?
              </h2>
              <p className="font-body mt-3 font-light leading-relaxed text-white/70">
                Ontdek wat er in jouw financiële situatie speelt en waar je als eerste naar zou
                kijken.
              </p>
            </div>

            <div className="w-full lg:w-auto lg:flex-shrink-0 lg:text-center">
              <StartKnop locatie="geldscan-slot" />
              <p className="font-body mt-3 text-xs font-light text-white/50">
                €49 eenmalig · Binnen 2 werkdagen
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
