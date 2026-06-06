import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samenwerken · voor burnout coaches & psychologen — Waar blijft het",
  description:
    "Financiële stress is een van de grootste obstakels bij burnoutherstel. Waar blijft het pakt de geldzorgen aan — zodat jij kunt werken aan de energie en het herstel.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken/burnout-coaches" },
  openGraph: {
    title: "Samenwerken met Waar blijft het · voor burnout coaches",
    description:
      "Financiële chaos verlengt een burnout. Wij brengen de rust in het geld — jij brengt de rust in de mens.",
    url: "https://www.waarblijfthet.nl/samenwerken/burnout-coaches",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Hoe helpt financieel inzicht bij burnoutherstel?",
    antwoord:
      "Financiële onduidelijkheid is een chronische stressor. Als iemand niet weet waar het geld naartoe gaat, staat die stressbron altijd aan — ook tijdens herstel. Inzicht en structuur maken een van de grootste drukpunten hanteerbaar, zodat energie vrijkomt voor herstel.",
  },
  {
    vraag: "Op welk moment in het hersteltraject past dit?",
    antwoord:
      "Dat verschilt per persoon. Soms is het slim om eerst de acute fase door te komen. Zodra er ruimte is voor praktische stappen, is een analyse van het maandbudget een logische volgende stap — concreet, overzichtelijk en niet overweldigend.",
  },
  {
    vraag: "Hoe verwijs ik iemand door?",
    antwoord:
      "Je noemt Waar blijft het als financiële stress een rol speelt. Ze starten zelf met de gratis analyse — geen verplichtingen, geen intensieve onboarding. Dat past bij de behoefte van mensen in herstel.",
  },
  {
    vraag: "Is er een vergoeding voor doorverwijzingen?",
    antwoord:
      "Nee. We werken onafhankelijk — geen commerciële verwijzingsconstructies.",
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

const pijnpunten = [
  {
    titel: "Ze zijn al uitgeput — en dan is er ook nog het geld",
    tekst:
      "Mensen in burnoutherstel dragen vaak een extra last mee: financiële onduidelijkheid. Ze werken minder of niet, de inkomsten dalen, maar de vaste lasten lopen door. Of ze werken nog wel, maar zijn zo moe dat de financiële administratie al maanden onaangeroerd ligt. Die financiële chaos verlengt de stress en daarmee het herstel.",
  },
  {
    titel: "Geldstress is een concrete stressbron — en die staat altijd aan",
    tekst:
      "Als burnout coach of psycholoog werk je aan energieherstel, grenzen en gedragspatronen. Maar als iemand thuis zit met een onduidelijk maandbudget, rekeningen die stapelen of het gevoel dat het geld niet klopt, is er een chronische stressor actief die jij niet oplost in de sessie. Financiële duidelijkheid is een stressor minder.",
  },
  {
    titel: "Ze verdienen eigenlijk genoeg — maar het voelt niet zo",
    tekst:
      "Veel mensen met een burnout komen uit sectoren met een goed inkomen: onderwijs, zorg, commercie, management. Ze hebben geen structurele geldzorgen in de klassieke zin — maar ze hebben ook nooit goed nagedacht over de financiën. Het gevoel van controleverlies over geld versterkt het gevoel van controleverlies in het algemeen.",
  },
];

export default function BurnoutCoachesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-background pt-16 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Voor burnout coaches &amp; psychologen</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl leading-tight">
              Financiële chaos verlengt een burnout.<br />
              Wij brengen de rust in het geld.
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-2xl">
              Als burnout coach of psycholoog werk je aan energie, grenzen en herstel. Maar
              geldstress is een stressor die altijd aanstaat — ook als de rest beter gaat.
              Wij nemen het financiële stuk over, zodat jij kunt focussen op de mens.
            </p>
          </div>
        </section>

        {/* Pijnpunten */}
        <section className="bg-background pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Herken je dit bij jouw cliënten?
            </h2>
            <div className="space-y-5">
              {pijnpunten.map((p) => (
                <div key={p.titel} className="card-base border border-[#E8E0D0]">
                  <h3 className="font-body font-medium text-primary text-base mb-2">{p.titel}</h3>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">{p.tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Oplossing */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Wat wij doen — één stressbron minder
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Waar blijft het helpt gezinnen en stellen die goed verdienen maar toch krap
              zitten — of het gevoel hebben dat het geld hen overkomt. We brengen de
              maandelijkse cashflow helder in kaart en geven concrete stappen om structuur
              te krijgen. Geen overweldigende analyse, geen schuldhulp — gewoon een helder
              overzicht dat rust geeft.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Voor iemand in herstel is een laagdrempelige eerste stap belangrijk. Daarom
              begint alles met een gratis analyse van vijf minuten — geen verplichtingen,
              geen intensieve onboarding. Rustig tempo, duidelijk inzicht.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {[
                ["Laagdrempelig", "Gratis analyse van 5 minuten. Geen verplichtingen."],
                ["Concreet", "Twee of drie duidelijke stappen — niet overweldigend."],
                ["Complementair", "Wij doen het geld. Jij doet de mens. Geen overlap."],
              ].map(([t, d]) => (
                <div key={t} className="text-center p-4 rounded-xl" style={{ backgroundColor: "#F5F0E8" }}>
                  <p className="font-body font-medium text-primary text-sm mb-1">{t}</p>
                  <p className="font-body font-light text-text-soft text-xs leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hoe werkt het */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Zo werkt de samenwerking
            </h2>
            <div className="space-y-4">
              {[
                ["1", "Noem ons als het geld een rol speelt", "Zodra financiële stress ter sprake komt, kun je Waar blijft het noemen. Geen grote introductie nodig."],
                ["2", "Ze starten op hun eigen tempo", "De gratis analyse op de site duurt vijf minuten en is volledig op hun eigen moment te doen. Geen drempel."],
                ["3", "Wij pakken het financiële deel op", "Een adviesgesprek of traject, volledig gericht op het maandbudget. Jij blijft hun coach — wij zijn de financiële schakel."],
              ].map(([n, t, d]) => (
                <div key={n} className="card-base border border-[#E8E0D0] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center shrink-0">
                    <span className="font-display font-medium text-primary">{n}</span>
                  </div>
                  <div>
                    <p className="font-body font-medium text-primary text-sm mb-1">{t}</p>
                    <p className="font-body font-light text-text-soft text-sm leading-relaxed">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-card py-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl mb-5">
              Veelgestelde vragen
            </h2>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.vraag} className="card-base border border-[#E8E0D0]">
                  <p className="font-body font-medium text-primary text-sm mb-2">{f.vraag}</p>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">{f.antwoord}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark-block py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">
              Laten we kennismaken
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Wil je zien of we passen als aanvulling op jouw praktijk? Een mail is genoeg —
              dan plannen we een gesprek van 20 minuten.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20burnout%20coach"
              className="btn-primary"
              style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
            >
              Mail Jarno →
            </a>
            <p className="mt-6">
              <Link
                href="/samenwerken"
                className="font-body text-sm"
                style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}
              >
                ← Terug naar samenwerken overzicht
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
