import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaLink from "@/components/CtaLink";
import { gesprekHref, GESPREK_CTA_LABEL } from "@/lib/cta";

/**
 * /adviesgesprek, herbouwd op 30-aug-2026.
 *
 * De pagina heeft één actie: het gesprek aanvragen. De oude versie sloot af
 * met "Begin eerst met de gratis analyse" plus een Geldscan-link plus een
 * mailto, drie routes weg van de enige actie die deze bezoeker zocht. Die zijn
 * er allemaal uit.
 *
 * Twee dingen die je hier nooit mag schrijven, hoe verleidelijk ook:
 * - dat iemand zelf een tijdstip in een agenda prikt. Er is geen agendatool,
 *   de aanvraag gaat via het formulier en ik plan daarna met de hand in.
 * - dat er geen voorbereiding nodig is. Je legt je cijfers klaar en bedenkt je
 *   grootste vraag, dat is precies wat het gesprek bruikbaar maakt.
 *
 * Feiten komen uit lib/aanbod-content.ts (PAKKET_INFO.gesprek): €125, 45
 * minuten, video, schriftelijke samenvatting achteraf, gegevens daarna weg.
 */

export const metadata: Metadata = {
  title: "Financieel adviesgesprek, eenmalig €125, 45 minuten",
  description:
    "Een eenmalig adviesgesprek van 45 minuten via Google Meet. Ik kijk met je naar je cijfers, wat je tegenhoudt en wat je als volgende stap kunt doen. €125, geen traject.",
  alternates: { canonical: "https://www.waarblijfthet.nl/adviesgesprek" },
  openGraph: {
    title: "Financieel adviesgesprek, eenmalig €125, 45 minuten",
    description:
      "Ik kijk met je naar je cijfers en je krijgt concrete aandachtspunten mee. Eenmalig €125, geen traject.",
    url: "https://www.waarblijfthet.nl/adviesgesprek",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const PRIJS = "€125";
const DUUR = "45 minuten";

const WAARDEN = [
  {
    icoon: "persoon" as const,
    titel: "Persoonlijk",
    regel: "Advies afgestemd op jouw situatie.",
  },
  {
    icoon: "vinkje" as const,
    titel: "Praktisch",
    regel: "Concrete keuzes en vervolgstappen.",
  },
  {
    icoon: "schild" as const,
    titel: "Onafhankelijk",
    regel: "Geen producten of provisies.",
  },
];

const STAPPEN = [
  {
    icoon: "verstuur" as const,
    titel: "Aanmelden",
    regel: "Je vraagt een gesprek aan.",
  },
  {
    icoon: "mail" as const,
    titel: "Voorbereiden",
    regel: "Ik neem binnen 1 werkdag contact op en laat weten wat je klaarlegt.",
  },
  {
    icoon: "gesprek" as const,
    titel: "45 minuten samen",
    regel: "Ik loop je cijfers, je vragen en je keuzes met je door.",
  },
  {
    icoon: "doel" as const,
    titel: "Richting bepalen",
    regel: "Je krijgt concrete aandachtspunten en vervolgstappen.",
  },
  {
    icoon: "document" as const,
    titel: "Daarna beslis jij",
    regel: "Je bepaalt zelf wat je met het advies doet.",
  },
];

const OPBRENGST = [
  {
    icoon: "vergrootglas" as const,
    titel: "Inzicht",
    regel: "Je begrijpt beter waar je financiële ruimte zit.",
  },
  {
    icoon: "sorteren" as const,
    titel: "Prioriteiten",
    regel: "Je weet welke zaken het meeste aandacht verdienen.",
  },
  {
    icoon: "kompas" as const,
    titel: "Richting",
    regel: "Je hebt een concreet beeld van je volgende stap.",
  },
  {
    icoon: "rust" as const,
    titel: "Rust",
    regel: "Je hoeft het niet meer alleen uit te zoeken.",
  },
];

const FAQ = [
  {
    vraag: "Wat kost het adviesgesprek?",
    antwoord:
      "€125 eenmalig voor 45 minuten. Na je aanvraag neem ik contact op en stuur ik je een betaalverzoek. Geen abonnement, geen traject.",
  },
  {
    vraag: "Wat moet ik voorbereiden?",
    antwoord:
      "Leg je cijfers klaar en bedenk in één zin wat je grootste vraag is. Een paar recente bankafschriften mogen, dat hoeft niet. Ik laat vooraf weten wat voor jouw situatie handig is.",
  },
  {
    vraag: "Kan ik mijn Geldscan meenemen in het gesprek?",
    antwoord:
      "Ja. Heb je al een Geldscan, dan is dat rapport het vertrekpunt en hoef je niets opnieuw aan te leveren. De €49 verreken ik met de prijs van het gesprek.",
  },
  {
    vraag: "Is het gesprek een verplicht onderdeel van een traject?",
    antwoord:
      "Nee. Het gesprek is eenmalig en op zichzelf compleet. Je gaat weg met concrete aandachtspunten waar je zelf mee verder kunt.",
  },
  {
    vraag: "Hoe vindt het gesprek plaats?",
    antwoord:
      "Online via Google Meet. Achteraf krijg je een korte schriftelijke samenvatting, en daarna verwijder ik alles wat je hebt aangeleverd.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.vraag,
    acceptedAnswer: { "@type": "Answer", text: f.antwoord },
  })),
};

type IcoonNaam =
  | "persoon"
  | "vinkje"
  | "schild"
  | "verstuur"
  | "mail"
  | "gesprek"
  | "doel"
  | "document"
  | "vergrootglas"
  | "sorteren"
  | "kompas"
  | "rust";

/* Eén set lijniconen, dezelfde stijl als op /geldscan en het
   aanvraagformulier: 1,6 stroke, geen vlakken, kleur van de ouder. */
function Icoon({ naam, grootte = 20 }: { naam: IcoonNaam; grootte?: number }) {
  const paden: Record<IcoonNaam, React.ReactNode> = {
    persoon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    vinkje: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="8.5 12 11 14.5 15.5 9.5" />
      </>
    ),
    schild: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 11 11 13 15 9" />
      </>
    ),
    verstuur: (
      <>
        <path d="M21 3L10.5 13.5" />
        <path d="M21 3l-6.5 18-4-8-8-4L21 3z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3.5 6.5 12 13 20.5 6.5" />
      </>
    ),
    gesprek: (
      <>
        <path d="M20 14a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
        <path d="M8.5 10h7" />
        <path d="M8.5 13h4" />
      </>
    ),
    doel: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    document: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <polyline points="14 3 14 8 19 8" />
        <path d="M8.5 13h7" />
        <path d="M8.5 16.5h4.5" />
      </>
    ),
    vergrootglas: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4.5 4.5" />
      </>
    ),
    sorteren: (
      <>
        <path d="M4 7h13" />
        <path d="M4 12h9" />
        <path d="M4 17h5" />
        <polyline points="17 14 20 17 17 20" />
      </>
    ),
    kompas: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polygon points="15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5" />
      </>
    ),
    rust: (
      <>
        <path d="M12 21s-7-4.5-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 3.5c0 5-7 9.5-7 9.5z" />
      </>
    ),
  };

  return (
    <svg
      width={grootte}
      height={grootte}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paden[naam]}
    </svg>
  );
}

function IcoonBol({ naam, grootte = 44 }: { naam: IcoonNaam; grootte?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-green-light text-accent"
      style={{ width: grootte, height: grootte }}
    >
      <Icoon naam={naam} grootte={Math.round(grootte * 0.45)} />
    </span>
  );
}

function Chevron() {
  return (
    <span
      aria-hidden="true"
      className="flex flex-shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9.5l6 6 6-6" />
      </svg>
    </span>
  );
}

export default function AdviesgesprekPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main>
        {/* ── 1. Hero: belofte links, beeld en prijs rechts ──────────────── */}
        <section className="bg-background px-6 pb-16 pt-14 sm:pt-20">
          <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-x-14 gap-y-10 lg:grid-cols-2">
            {/* Intro */}
            <div className="order-1 lg:col-start-1 lg:row-start-1">
              <p className="font-body mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Adviesgesprek
              </p>
              <h1
                className="font-display mb-5 font-light text-primary"
                style={{ fontSize: "clamp(2rem, 5vw, 3.1rem)", lineHeight: 1.12 }}
              >
                Persoonlijk advies voor jouw financiële situatie.
              </h1>
              <p className="font-body max-w-[32rem] text-base font-light leading-relaxed text-text-soft">
                In {DUUR} kijk ik samen met jou naar je cijfers, naar wat je tegenhoudt en naar wat
                je als volgende stap kunt doen.
              </p>
            </div>

            {/* Beeld */}
            <div className="order-2 lg:col-start-2 lg:row-start-1">
              <div className="overflow-hidden rounded-2xl border border-[#E6E9E7] bg-card">
                <Image
                  src="/jarno.jpg"
                  alt="Jarno Koopman, die het adviesgesprek voert"
                  width={720}
                  height={520}
                  className="h-[260px] w-full object-cover sm:h-[320px]"
                  priority
                />
                <p className="font-body px-5 py-4 text-sm font-light leading-relaxed text-text-soft">
                  Je spreekt mij, Jarno. Geen intaker, geen team achter een formulier.
                </p>
              </div>
            </div>

            {/* Prijs en de enige actie van deze pagina */}
            <div className="order-3 lg:col-start-2 lg:row-start-2">
              <div className="rounded-2xl border border-[#D5E5E0] bg-card p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-display text-3xl font-light leading-none text-primary">
                      {PRIJS}
                    </p>
                    <p className="font-body mt-1.5 text-sm text-text-muted">
                      eenmalig &middot; {DUUR}
                    </p>
                  </div>
                  <CtaLink
                    doel="gesprek"
                    href={gesprekHref()}
                    locatie="adviesgesprek-hero"
                    className="btn-primary sm:flex-shrink-0"
                  >
                    {GESPREK_CTA_LABEL} →
                  </CtaLink>
                </div>
                <p className="font-body mt-4 text-sm font-light leading-relaxed text-text-soft">
                  Online via Google Meet. Ik neem binnen 1 werkdag contact op om het gesprek in te
                  plannen.
                </p>
              </div>
            </div>

            {/* Drie waarden */}
            <ul className="order-4 flex list-none flex-col gap-6 p-0 lg:col-start-1 lg:row-start-2">
              {WAARDEN.map((w) => (
                <li key={w.titel} className="flex items-start gap-4">
                  <IcoonBol naam={w.icoon} />
                  <div className="pt-1">
                    <p className="font-body mb-0.5 text-[15px] font-semibold text-primary">
                      {w.titel}
                    </p>
                    <p className="font-body text-sm font-light leading-relaxed text-text-soft">
                      {w.regel}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 2. Zo verloopt het gesprek ────────────────────────────────── */}
        <section className="bg-card px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-[1120px]">
            <h2
              className="font-display mb-12 text-center font-light text-primary"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.15 }}
            >
              Zo verloopt het gesprek.
            </h2>

            {/* Desktop: horizontaal */}
            <ol className="hidden list-none grid-cols-5 gap-4 p-0 sm:grid">
              {STAPPEN.map((s, i) => (
                <li key={s.titel}>
                  <div className="mb-4 flex items-center">
                    <IcoonBol naam={s.icoon} />
                    {i < STAPPEN.length - 1 && (
                      <span className="h-px flex-1 bg-[#E6E9E7]" />
                    )}
                  </div>
                  <p className="font-body mb-1.5 pr-3 text-sm font-semibold text-primary">
                    {i + 1}. {s.titel}
                  </p>
                  <p className="font-body pr-3 text-[13px] font-light leading-relaxed text-text-soft">
                    {s.regel}
                  </p>
                </li>
              ))}
            </ol>

            {/* Mobiel: verticaal */}
            <ol className="flex list-none flex-col gap-5 p-0 sm:hidden">
              {STAPPEN.map((s, i) => (
                <li key={s.titel} className="flex items-start gap-4">
                  <IcoonBol naam={s.icoon} grootte={40} />
                  <div className="pt-0.5">
                    <p className="font-body mb-1 text-[15px] font-semibold text-primary">
                      {i + 1}. {s.titel}
                    </p>
                    <p className="font-body text-sm font-light leading-relaxed text-text-soft">
                      {s.regel}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 3. Wat het oplevert ───────────────────────────────────────── */}
        <section className="bg-background px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-[1120px]">
            <h2
              className="font-display mb-12 text-center font-light text-primary"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.15 }}
            >
              Na het gesprek weet je beter wat je moet doen.
            </h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
              {OPBRENGST.map((o) => (
                <div
                  key={o.titel}
                  className="flex items-start gap-4 lg:block lg:border-l lg:border-[#E6E9E7] lg:pl-5"
                >
                  <span className="flex shrink-0 text-accent lg:mb-4 lg:block">
                    <Icoon naam={o.icoon} grootte={26} />
                  </span>
                  <div>
                    <p className="font-body mb-1.5 text-[15px] font-semibold text-primary">
                      {o.titel}
                    </p>
                    <p className="font-body text-sm font-light leading-relaxed text-text-soft">
                      {o.regel}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Vragen die een boeking in de weg staan ─────────────────── */}
        <section className="bg-card px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-[760px]">
            <h2
              className="font-display mb-9 text-center font-light text-primary"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.15 }}
            >
              Veelgestelde vragen
            </h2>
            <div className="flex flex-col gap-3">
              {FAQ.map((f) => (
                <details
                  key={f.vraag}
                  className="group rounded-xl border border-[#E6E9E7] bg-background px-5 py-4 sm:px-6"
                >
                  <summary className="font-body flex cursor-pointer select-none items-center justify-between gap-4 text-[15px] font-medium leading-snug text-primary">
                    <span>{f.vraag}</span>
                    <Chevron />
                  </summary>
                  <p className="font-body mt-3 text-sm font-light leading-relaxed text-text-soft">
                    {f.antwoord}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. Slot: dezelfde actie, nu als afsluiting ────────────────── */}
        <section className="bg-dark-block px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-[760px] text-center">
            <h2
              className="font-display mb-4 font-light text-white"
              style={{ fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)", lineHeight: 1.15 }}
            >
              Klaar om samen naar jouw situatie te kijken?
            </h2>
            <p className="font-body mx-auto mb-8 max-w-[30rem] text-base font-light leading-relaxed text-white/70">
              Plan een persoonlijk gesprek en bepaal daarna zelf wat je met het advies doet.
            </p>
            <CtaLink
              doel="gesprek"
              href={gesprekHref()}
              locatie="adviesgesprek-slot"
              className="btn-primary"
            >
              {GESPREK_CTA_LABEL} →
            </CtaLink>
            <p className="font-body mb-0 mt-5 text-sm text-white/45">
              {PRIJS} &middot; {DUUR} &middot; Online via Google Meet
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
