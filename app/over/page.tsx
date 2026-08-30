import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaLink from "@/components/CtaLink";
import { analyseHref, PRIMAIRE_CTA_LABEL, geldscanHref } from "@/lib/cta";
import {
  rapportVoorSlug,
  AANTAL_ZONDER_LEK,
  RAPPORTEN,
} from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: "Over Jarno Koopman | Waar blijft het",
  description:
    "Ik ben Jarno Koopman. Ik verdiende zelf goed en wist toch niet waar ons geld bleef. Daarom kijk ik nu naar de cijfers van andere huishoudens en schrijf ik met de hand op wat opvalt.",
  alternates: { canonical: "https://www.waarblijfthet.nl/over" },
  openGraph: {
    title: "Over Jarno Koopman | Waar blijft het",
    description:
      "Ik verdiende goed en wist toch niet waar ons geld bleef. Dat is waarom Waar blijft het bestaat.",
    url: "https://www.waarblijfthet.nl/over",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Over Waar blijft het",
  url: "https://www.waarblijfthet.nl/over",
  mainEntity: {
    "@type": "Person",
    name: "Jarno Koopman",
    jobTitle: "Oprichter",
    url: "https://www.waarblijfthet.nl/over",
    image: "https://www.waarblijfthet.nl/jarno.jpg",
    sameAs: [
      "https://www.linkedin.com/in/jarnokoopman/",
      "https://www.instagram.com/koopmanjarno/",
    ],
    knowsAbout: [
      "Persoonlijke financiën",
      "Huishoudbudget",
      "Grip op geld",
      "Besparen",
      "Sparen",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Waar blijft het",
      url: "https://www.waarblijfthet.nl",
    },
  },
};

/* --- Iconen -----------------------------------------------------------
   Dunne lijniconen in de accentkleur, geen vlakken en geen schaduw. Ze dragen
   geen betekenis die niet ook in de tekst staat, dus ze zijn aria-hidden. */

function Icoon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0B7A6E"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const IcoonPersoon = (
  <Icoon>
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
    <path d="M5 20a7 7 0 0114 0" />
  </Icoon>
);

const IcoonSchild = (
  <Icoon>
    <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 8.5-4.1-.9-7-4.3-7-8.5V6l7-3z" />
    <path d="M9.2 11.8l2 2 3.6-3.8" />
  </Icoon>
);

const IcoonDoel = (
  <Icoon>
    <path d="M20.5 12a8.5 8.5 0 11-4.7-7.6" />
    <path d="M16.5 12a4.5 4.5 0 11-2.6-4.1" />
    <path d="M12 12l5.5-5.5" />
  </Icoon>
);

const IcoonVerbanden = (
  <Icoon>
    <path d="M6 8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path d="M18 8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path d="M12 20.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
    <path d="M7.5 7.5l3.2 8" />
    <path d="M16.5 7.5l-3.2 8" />
  </Icoon>
);

const IcoonTaal = (
  <Icoon>
    <path d="M20 15.5a2.5 2.5 0 01-2.5 2.5H9l-4 3v-3H5.5A2.5 2.5 0 013 15.5v-8A2.5 2.5 0 015.5 5h12A2.5 2.5 0 0120 7.5v8z" />
    <path d="M8 10h8" />
    <path d="M8 13.5h5" />
  </Icoon>
);

const IcoonKeuzes = (
  <Icoon>
    <path d="M5 20V9.5a3 3 0 013-3h8" />
    <path d="M13 3.5l3 3-3 3" />
    <path d="M5 14.5h5a3 3 0 003-3v-1" />
  </Icoon>
);

function Vinkje() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0B7A6E"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-1 shrink-0"
    >
      <path d="M4.5 12.5l5 5 10-11" />
    </svg>
  );
}

/* --- Vaste inhoud ------------------------------------------------------ */

const WAARDEN: { icoon: React.ReactNode; titel: string; tekst: string }[] = [
  {
    icoon: IcoonPersoon,
    titel: "Persoonlijk",
    tekst: "Ik schrijf de Geldscan zelf.",
  },
  {
    icoon: IcoonSchild,
    titel: "Onafhankelijk",
    tekst: "Geen financiële producten of provisies.",
  },
  {
    icoon: IcoonDoel,
    titel: "Praktisch",
    tekst: "Geen standaardadvies, maar kijken naar jouw situatie.",
  },
];

const MANIER_VAN_KIJKEN: {
  icoon: React.ReactNode;
  titel: string;
  tekst: string;
}[] = [
  {
    icoon: IcoonVerbanden,
    titel: "Ik kijk naar verbanden",
    tekst:
      "Niet alleen naar wat je uitgeeft, maar naar wat samen het beeld vormt.",
  },
  {
    icoon: IcoonTaal,
    titel: "Ik maak het begrijpelijk",
    tekst: "Geen financieel jargon, maar uitleg in gewone taal.",
  },
  {
    icoon: IcoonKeuzes,
    titel: "Ik help je keuzes zien",
    tekst: "Wat is een probleem, wat is een bewuste keuze en waar zit ruimte?",
  },
];

const VOOR_WIE: { kop: string; tekst: string }[] = [
  {
    kop: "Je verdient goed.",
    tekst: "Toch blijft er minder over dan je verwacht.",
  },
  {
    kop: "Je doet het op zich goed.",
    tekst: "Maar je mist overzicht.",
  },
  {
    kop: "Je wilt weten waar het verschil zit.",
    tekst: "Niet alleen horen dat je minder moet uitgeven.",
  },
  {
    kop: "Je wilt keuzes maken die bij jouw leven passen.",
    tekst: "En niet bij het gemiddelde huishouden.",
  },
];

// Drie echte rapporten als bewijs. Labels en koppen komen letterlijk uit
// lib/rapporten-data.ts (werkregel 4). stel-zonder-kinderen staat er bewust
// bij, dat is de scan waar niets te repareren viel.
const BEWIJS_SLUGS = [
  "tweeverdieners-drie-kinderen",
  "stel-zonder-kinderen",
  "alleenstaand-huurwoning",
];

export default function OverPage() {
  const bewijsRapporten = BEWIJS_SLUGS.map((slug) => rapportVoorSlug(slug)).filter(
    (r): r is NonNullable<typeof r> => Boolean(r)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />

      <main>
        {/* 1. Hero: tekst, foto, waarden.
            Op mobiel volgt de DOM-volgorde het ontwerp: tekst, foto, waarden.
            Op desktop zet het raster de waarden onder de tekst en laat de foto
            over beide rijen lopen. */}
        <section className="bg-background pt-14 pb-14 sm:pt-16 sm:pb-16">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:grid-rows-[auto_auto] lg:items-start lg:gap-x-14 lg:gap-y-12">
              <div className="lg:col-start-1 lg:row-start-1 lg:self-center">
                <p className="section-eyebrow mb-4">Over mij</p>
                <h1 className="font-display font-light text-primary text-4xl sm:text-5xl leading-[1.1] mb-6">
                  Ik help mensen die goed verdienen, maar toch geen grip voelen
                  op hun geld.
                </h1>
                <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-[52ch]">
                  Ik ben Jarno Koopman. Ik kijk naar cijfers en verbanden en
                  vertaal ze naar een begrijpelijk verhaal over jouw financiële
                  situatie.
                </p>
              </div>

              <div className="w-full max-w-[420px] mx-auto lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:justify-self-end lg:self-center">
                <div className="rounded-xl overflow-hidden bg-card shadow-card">
                  <Image
                    src="/jarno.jpg"
                    alt="Jarno Koopman"
                    width={420}
                    height={420}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
                <p className="font-body text-text-muted text-sm mt-3">
                  Jarno Koopman, ik lees je cijfers en schrijf je rapport zelf.
                </p>
              </div>

              <div className="lg:col-start-1 lg:row-start-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 sm:gap-6">
                  {WAARDEN.map((w) => (
                    <div key={w.titel} className="flex gap-3.5 sm:block">
                      <span className="shrink-0 sm:mb-3 sm:block">{w.icoon}</span>
                      <div>
                        <p className="font-body font-semibold text-primary text-sm mb-1">
                          {w.titel}
                        </p>
                        <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                          {w.tekst}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Mijn verhaal: editorial twee kolommen, tekst links, citaat rechts.
            Het citaat is een letterlijke zin uit de bestaande pagina. */}
        <section className="bg-card py-16 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-16">
              <div>
                <p className="section-eyebrow mb-4">Mijn verhaal</p>
                <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-7">
                  Het begon bij onszelf.
                </h2>
                <div className="space-y-4 text-text-soft font-body font-light text-base sm:text-lg leading-relaxed max-w-[60ch]">
                  <p>
                    Ik verdien goed. Geen schulden, geen buitensporige uitgaven,
                    geen dure hobby&apos;s. Twee inkomens, drie kinderen, een
                    heel normaal leven.
                  </p>
                  <p>
                    Toch bleef er elke maand minder over dan ik verwachtte. Na
                    een verhuizing met een hogere hypotheek liepen de spaarpotjes
                    langzaam leeg, en ik kon niet uitleggen waardoor. Voor de
                    buitenwereld hadden we het prima voor elkaar. Zelf vroeg ik
                    me af of ik iets over het hoofd zag.
                  </p>
                  <p>
                    Pas toen ik onze cijfers eindelijk naast elkaar legde, werd
                    duidelijk wat er gebeurde. Het probleem was niet een enkele
                    uitgavencategorie. Het ontbrak vooral aan context.
                  </p>
                  <p className="font-body font-normal text-primary">
                    Daaruit is Waar blijft het? ontstaan.
                  </p>
                </div>
              </div>

              <div className="lg:pt-16">
                <figure className="bg-green-light rounded-xl p-7 sm:p-8">
                  <svg
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="#0B7A6E"
                    aria-hidden="true"
                    className="mb-4 opacity-60"
                  >
                    <path d="M0 20V11.4C0 5.3 3.4 1.1 9.6 0l1 2.6C6.8 3.9 4.9 6 4.9 8.7h4.4V20H0zm15.6 0v-8.6C15.6 5.3 19 1.1 25.2 0l1 2.6c-3.8 1.3-5.7 3.4-5.7 6.1h4.4V20h-9.3z" />
                  </svg>
                  <blockquote className="font-display font-light text-primary text-xl sm:text-2xl leading-snug">
                    Ik zag wat we uitgaven, maar niet of dat voor een huishouden
                    als het onze veel of weinig was.
                  </blockquote>
                  <figcaption className="font-body font-light text-text-soft text-sm mt-5">
                    Jarno
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Mijn manier van kijken: drie losse items, veel witruimte, geen cards. */}
        <section className="bg-background py-16 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="max-w-[46ch] mb-11 sm:mb-14">
              <p className="section-eyebrow mb-4">Mijn manier van kijken</p>
              <h2 className="font-display font-light text-primary text-3xl sm:text-4xl">
                Ik kijk verder dan de losse cijfers.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
              {MANIER_VAN_KIJKEN.map((item, i) => (
                <div
                  key={item.titel}
                  className={
                    i === 0
                      ? "md:pr-10"
                      : "md:border-l md:border-[#E1E6E4] md:px-10 last:md:pr-0"
                  }
                >
                  <span className="mb-4 block">{item.icoon}</span>
                  <h3 className="font-display font-light text-primary text-xl sm:text-2xl mb-3 leading-snug">
                    {item.titel}
                  </h3>
                  <p className="font-body font-light text-text-soft text-base leading-relaxed max-w-[34ch]">
                    {item.tekst}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Voor wie ik er ben, met het bewijs ernaast. Op mobiel eerst de
            tekst, daarna de rapporten. */}
        <section className="bg-card py-16 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div>
                <p className="section-eyebrow mb-4">Voor wie</p>
                <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-5">
                  Voor wie ik er ben
                </h2>
                <p className="text-text-soft font-body font-light text-base sm:text-lg leading-relaxed max-w-[50ch] mb-8">
                  Voor mensen die goed verdienen, maar merken dat geld toch te
                  weinig overzicht, ruimte of rust geeft.
                </p>

                <ul className="space-y-5 max-w-[52ch]">
                  {VOOR_WIE.map((p) => (
                    <li key={p.kop} className="flex gap-3">
                      <Vinkje />
                      <p className="font-body text-base leading-relaxed">
                        <span className="font-medium text-primary">{p.kop}</span>{" "}
                        <span className="font-light text-text-soft">
                          {p.tekst}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="section-eyebrow mb-4">Bewijs, geen belofte</p>
                <h2 className="font-display font-light text-primary text-3xl sm:text-4xl mb-5">
                  Je kunt eerst zien hoe ik werk.
                </h2>
                <p className="text-text-soft font-body font-light text-base leading-relaxed max-w-[50ch] mb-7">
                  Alle {RAPPORTEN.length} geldrapporten die ik heb geleverd staan
                  openbaar op de site, met de cijfers, mijn advies en de reactie
                  van de klant. Bij {AANTAL_ZONDER_LEK} ervan viel er niets te
                  repareren, en ook dat lees je gewoon terug.
                </p>

                <div className="space-y-3">
                  {bewijsRapporten.map((r) => (
                    <Link
                      key={r.slug}
                      href={"/rapporten/" + r.slug}
                      className="block rounded-xl border border-[#E6E9E7] px-5 py-4 transition-colors hover:border-[#0B7A6E]"
                      style={{ textDecoration: "none" }}
                    >
                      <p className="section-eyebrow mb-1.5">{r.chip}</p>
                      <p className="font-display font-light text-primary text-lg leading-snug">
                        {r.uitkomstKop}
                      </p>
                    </Link>
                  ))}
                </div>

                <div className="mt-6">
                  <Link
                    href="/rapporten"
                    className="font-body text-sm font-medium hover:underline"
                    style={{ color: "#0B7A6E" }}
                  >
                    Bekijk de rapporten &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Afbakening, compact en laag op de pagina. */}
        <section className="bg-background py-12">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
            <p className="font-body font-light text-text-muted text-sm leading-relaxed max-w-[76ch] border-t border-[#E1E6E4] pt-7">
              Ik geef geen financieel advies in de juridische zin, verkoop geen
              producten en ontvang geen provisie. Ik vergelijk met openbare
              cijfers van bronnen als het Nibud, het CBS en de Belastingdienst,
              en met de huishoudens die ik zelf heb doorgerekend. Heb je schulden
              of een complexe situatie, dan ben je beter op je plek bij een
              gecertificeerde budgetcoach of bij{" "}
              <a
                href="https://geldfit.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Geldfit
              </a>
              . Een vraag over je eigen situatie mag altijd naar{" "}
              <a
                href="mailto:hallo@waarblijfthet.nl"
                className="text-accent hover:underline"
              >
                hallo@waarblijfthet.nl
              </a>
              , ik lees alles zelf.
            </p>
          </div>
        </section>

        {/* 6. Slot: een primaire actie, de gratis analyse. De Geldscan staat
            eronder als tekstlink, nooit als tweede knop. */}
        <section className="bg-dark-block py-20">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5 max-w-2xl mx-auto">
              Benieuwd wat er bij jou opvalt?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-[46ch] mx-auto">
              Begin met de gratis analyse. Dan zie je eerst zelf hoe jouw
              situatie zich verhoudt tot vergelijkbare huishoudens.
            </p>
            <CtaLink
              doel="analyse"
              href={analyseHref()}
              locatie="over-slot"
              className="btn-primary"
              style={{ backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" }}
            >
              {PRIMAIRE_CTA_LABEL} &rarr;
            </CtaLink>
            <p className="font-body font-light text-white/50 text-sm mt-6">
              Gratis &bull; vertrouwelijk &bull; geen verkoopgesprek
            </p>
            <p className="font-body font-light text-white/60 text-sm mt-6">
              Liever meteen een geldrapport?
            </p>
            <p className="font-body font-light text-sm mt-1">
              <CtaLink
                doel="geldscan"
                href={geldscanHref()}
                locatie="over-slot-secundair"
                className="text-white underline underline-offset-4 hover:text-white/80"
              >
                Vraag de Geldscan aan, 49 euro &rarr;
              </CtaLink>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
