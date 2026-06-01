import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Over Waar blijft het",
  description:
    "Wie zit er achter Waar blijft het, waarom het bestaat en wat we wél en niet doen. Geen schuldhulp, geen beleggingsadvies — eerlijk inzicht voor gezinnen die goed verdienen maar weinig overhouden.",
  alternates: { canonical: "https://www.waarblijfthet.nl/over" },
  openGraph: {
    title: "Over Waar blijft het",
    description: "Wie zit er achter Waar blijft het en waarom het bestaat.",
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
      sameAs: [
        "https://www.linkedin.com/in/jarnokoopman/",
        "https://www.instagram.com/koopmanjarno/",
      ],
    },
  },
};

export default function OverPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Intro */}
        <section className="bg-background pt-16 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Over ons</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl">
              Waarom Waar blijft het bestaat
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed">
              Wij verdienden samen goed. Geen schulden, geen rare uitgaven — en
              tóch elke maand hetzelfde gevoel: waar is het gebleven? We zochten
              hulp en vonden alleen schuldhulp (niet voor ons) of
              beleggingsadvies (te vroeg). Niemand keek gewoon eerlijk naar wat
              er in- en uitging. Daarom maakten we het zelf.
            </p>
          </div>
        </section>

        {/* Wie */}
        <section className="bg-background pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <div className="card-base border border-[#E8E0D0]">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-full bg-[#1C3A2A] flex items-center justify-center shrink-0">
                  <span
                    className="text-[#F5F0E8] text-base font-medium"
                    style={{ fontFamily: "Fraunces, serif" }}
                  >
                    JK
                  </span>
                </div>
                <div>
                  <p className="font-display font-light text-primary text-xl">
                    Jarno Koopman
                  </p>
                  <p className="font-body text-text-muted text-sm">
                    Oprichter, schrijft de artikelen en kijkt met je mee
                  </p>
                </div>
              </div>
              <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                Ik ben geen bank en geen schuldhulpverlener. Ik ben iemand die
                hetzelfde meemaakte, zich in de cijfers vastbeet en ontdekte dat
                het zelden aan het inkomen ligt — bijna altijd aan hoe het
                verdeeld wordt. Wat ik geleerd heb, deel ik hier: in gewone
                taal, zonder jargon en zonder oordeel.
              </p>
            </div>
          </div>
        </section>

        {/* Wat we wel en niet doen */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-base border border-[#A8D5B5] bg-green-light">
              <p className="font-display font-light text-primary text-xl mb-4">
                Wat we wél doen
              </p>
              <ul className="space-y-2 font-body font-light text-sm text-text-soft">
                <li>Eerlijk laten zien waar jullie geld naartoe gaat</li>
                <li>Vergelijken met gezinnen in dezelfde situatie</li>
                <li>Eén concrete afwijking benoemen, in gewone taal</li>
                <li>Meekijken en scherp houden als je dat wilt</li>
              </ul>
            </div>
            <div className="card-base border border-[#E8E0D0]">
              <p className="font-display font-light text-primary text-xl mb-4">
                Wat we niet doen
              </p>
              <ul className="space-y-2 font-body font-light text-sm text-text-soft">
                <li>Geen schuldhulpverlening</li>
                <li>Geen advies over beleggen, hypotheken of pensioen</li>
                <li>Geen producten verkopen of doorverwijzen voor commissie</li>
                <li>Geen spreadsheets of cursussen waar je toch niet aan begint</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Eerlijk over */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Eerlijk is eerlijk</p>
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Zijn we gecertificeerde adviseurs?
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-4">
              Nee. We zijn geen AFM-geregistreerde financieel adviseurs en geven
              geen financieel advies in de juridische zin. Wat we bieden is
              inzicht, herkenning en een eerlijke blik van buitenaf — gebaseerd
              op openbare cijfers van bronnen als het Nibud, CBS en de
              Belastingdienst. Bij elk artikel vermelden we waar onze cijfers
              vandaan komen, en we maken onderscheid tussen harde data en
              indicaties uit de praktijk.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed">
              Heb je schulden of een complexe situatie? Dan ben je bij een
              gecertificeerde budgetcoach of bij{" "}
              <a
                href="https://geldfit.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Geldfit
              </a>{" "}
              beter op je plek — en dat zeggen we dan ook gewoon.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark-block py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">
              Benieuwd waar het bij jullie naartoe gaat?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Doe de gratis analyse en zie in vijf minuten hoe jullie het doen
              ten opzichte van vergelijkbare gezinnen.
            </p>
            <Link
              href="/analyse"
              className="btn-primary"
              style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
            >
              Start de gratis analyse →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
