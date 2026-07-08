import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financieel adviesgesprek, eenmalig €125, vrijblijvend",
  description:
    "Een eenmalig financieel adviesgesprek van 45 minuten: eerlijk naar je cijfers kijken en 2 à 3 concrete doelen stellen. €125, geen traject, geen verplichting.",
  alternates: { canonical: "https://www.waarblijfthet.nl/adviesgesprek" },
  openGraph: {
    title: "Financieel adviesgesprek, eenmalig €125, vrijblijvend",
    description:
      "45 minuten, eerlijk en gericht. Samen naar je cijfers kijken en 2 à 3 concrete doelen stellen. Geen traject, geen verplichting.",
    url: "https://www.waarblijfthet.nl/adviesgesprek",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Wat kost het adviesgesprek?",
    antwoord:
      "Eenmalig €125 voor een videogesprek van 45 minuten, inclusief de voorbereiding en een schriftelijke samenvatting achteraf. Geen abonnement, geen traject. Je betaalt één keer en zit nergens aan vast.",
  },
  {
    vraag: "Moet ik daarna een traject afnemen?",
    antwoord:
      "Nee. Het gesprek is eenmalig en op zichzelf compleet. Je gaat naar huis met concrete doelen waar je zelf mee verder kunt. Wil je later meer begeleiding, dan kan dat, maar het hoeft niet.",
  },
  {
    vraag: "Krijgen jullie toegang tot mijn bankrekening?",
    antwoord:
      "Nee. Je deelt alleen wat je zelf wilt. De gratis analyse en eventueel een paar bankafschriften die je zelf aanlevert zijn genoeg. Wij koppelen niets aan je bank.",
  },
  {
    vraag: "Is dit financieel advies of schuldhulp?",
    antwoord:
      "Nee. We geven geen financieel advies in de zin van de Wft, doen niet aan beleggen en zijn geen schuldhulp. Het is een eerlijke, praktische blik op je maandbudget en concrete doelen om meer over te houden.",
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

const stappen = [
  {
    n: "1",
    titel: "Vooraf: je vertrekpunt",
    items: [
      "Je doet de gratis analyse (5 min), dat is de basis van ons gesprek.",
      "Optioneel: leg een paar recente bankafschriften klaar.",
      "Bedenk in één zin: wat is jullie grootste vraag of zorg?",
    ],
  },
  {
    n: "2",
    titel: "Het gesprek: 45 minuten, eerlijk en gericht",
    items: [
      "We kijken samen naar jullie cijfers en de twee grootste afwijkingen.",
      "Geen verkooppraat, geen oordeel. Gewoon een eerlijke blik van buitenaf.",
      "We bepalen samen 2 à 3 concrete doelen waar je meteen mee verder kunt.",
    ],
  },
  {
    n: "3",
    titel: "Erna: iets tastbaars",
    items: [
      "Je krijgt een korte schriftelijke samenvatting met je doelen, om terug te lezen.",
      "Daarmee ga je zelf verder, in je eigen tempo.",
      "Wil je meer begeleiding? Dan kijken we naar een traject. Maar dat hoeft niet.",
    ],
  },
];

export default function AdviesgesprekPage() {
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
            <p className="section-eyebrow mb-4">Eenmalig adviesgesprek · €125</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl">
              Zo werkt het adviesgesprek
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed">
              Eén gesprek van 45 minuten waarin we eerlijk naar jullie cijfers
              kijken en 2 à 3 concrete doelen stellen. Geen traject, geen
              verplichting. Gewoon de por die je nodig hebt om van krap naar
              ruim te gaan.
            </p>
          </div>
        </section>

        {/* Stappen */}
        <section className="bg-background pb-8">
          <div className="max-w-3xl mx-auto px-6 space-y-5">
            {stappen.map((s) => (
              <div key={s.n} className="card-base border border-[#E8E0D0]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-light flex items-center justify-center shrink-0">
                    <span className="font-display font-medium text-primary text-xl">
                      {s.n}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display font-light text-primary text-xl mb-3">
                      {s.titel}
                    </h2>
                    <ul className="space-y-2">
                      {s.items.map((it) => (
                        <li key={it} className="flex items-start gap-2">
                          <span style={{ color: "#2D6A4F", fontWeight: 600 }}>✓</span>
                          <span className="font-body font-light text-sm text-text-soft leading-relaxed">
                            {it}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Geruststelling */}
        <section className="bg-card py-12">
          <div className="max-w-3xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                ["Geen verplichting", "Eén gesprek. Daarna bepaal jij wat je doet."],
                ["Geen toegang tot je bank", "Je deelt alleen wat je zelf wilt."],
                ["Geen schuldhulp of beleggen", "Gewoon grip op je maandbudget."],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="font-body font-medium text-primary text-sm mb-1">{t}</p>
                  <p className="font-body font-light text-text-soft text-xs leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Veelgestelde vragen
            </h2>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.vraag} className="card-base border border-[#E8E0D0]">
                  <p className="font-body font-medium text-primary text-sm mb-2">
                    {f.vraag}
                  </p>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                    {f.antwoord}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark-block py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">
              Klaar voor een eerlijk gesprek?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Eenmalig €125. Daarna bepaal jij wat je doet.
            </p>
            <Link
              href="/aanbod/intake?pakket=gesprek"
              className="btn-primary"
              style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
            >
              Plan je adviesgesprek →
            </Link>
            <p className="mt-5">
              <Link
                href="/analyse"
                className="font-body text-sm"
                style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}
              >
                Liever eerst de gratis analyse? →
              </Link>
            </p>
            <p className="mt-2">
              <Link
                href="/geldscan"
                className="font-body text-sm"
                style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}
              >
                Liever geen gesprek? Bekijk de geldscan (€49) →
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
