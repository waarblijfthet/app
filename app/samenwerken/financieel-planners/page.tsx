import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samenwerken · voor financieel planners — Waar blijft het",
  description:
    "Cliënten die vermogen willen opbouwen maar geen grip hebben op hun maandbudget. Waar blijft het zorgt voor de cashflow-basis — zodat jij aan het echte werk kunt.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken/financieel-planners" },
  openGraph: {
    title: "Samenwerken met Waar blijft het · voor financieel planners",
    description:
      "Cliënten zonder grip op hun maandbudget kunnen niet goed investeren. Wij leggen die basis.",
    url: "https://www.waarblijfthet.nl/samenwerken/financieel-planners",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Wat doen jullie precies anders dan een financieel planner?",
    antwoord:
      "Een financieel planner werkt aan vermogensopbouw, pensioen en langetermijndoelen. Wij kijken alleen naar het maandbudget: wat komt er binnen, wat gaat eruit, waar lekt het. Dat zijn complementaire stukken — geen overlap.",
  },
  {
    vraag: "Hoe verwijs ik iemand door?",
    antwoord:
      "Je noemt Waar blijft het als een cliënt wil beginnen met investeren of sparen, maar zijn maandelijkse cashflow niet op orde heeft. Ze starten met de gratis analyse — dat geeft direct inzicht in wat er maandelijks beschikbaar is.",
  },
  {
    vraag: "Kunnen we samen optrekken in een traject?",
    antwoord:
      "Dat is zeker bespreekbaar. Als jij de langetermijnstrategie bepaalt en wij de maandelijkse structuur leggen, versterken we elkaar. Stuur een mail als je dit wil bespreken.",
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
    titel: "Ze willen beleggen — maar hun maandbudget klopt niet",
    tekst:
      "Je zit met een cliënt die wil beginnen met vermogensopbouw. Goede intentie. Maar als je doorvraagt, blijkt er geen buffer, geen inzicht in de maandelijkse vrije ruimte en vaak ook onzekerheid over vaste lasten. Je kunt een langetermijnplan maken, maar de basis ontbreekt. Investeren met een lek maandbudget is bouwen op drijfzand.",
  },
  {
    titel: "Ze verdienen goed maar hebben niets gespaard",
    tekst:
      "Een van de meest verrassende patronen: gezinnen met €5.000 tot €7.000 netto per maand die geen spaarbuffer hebben. Niet door grote uitgaven, maar door een diffuse lekstroom — abonnementen, seizoenskosten, BSO, onverwachte kosten die altijd 'onverwacht' blijven. Dat los je niet op met een beleggingsplan.",
  },
  {
    titel: "Het gesprek gaat over geld, maar niet over de kern",
    tekst:
      "Als financieel planner of vermogensadviseur werk je aan de strategie. Maar als iemand niet weet hoeveel hij maandelijks vrij heeft om te investeren, stagneert elk plan. Het maandbudget is de motor — als die niet loopt, rijdt de auto nergens naartoe.",
  },
];

export default function FinancieelPlannersPage() {
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
            <p className="section-eyebrow mb-4">Voor financieel planners &amp; vermogensadviseurs</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl leading-tight">
              Ze willen vermogen opbouwen.<br />
              Maar hun maandbudget klopt niet.
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-2xl">
              Cliënten die naar jou komen voor een financieel plan hebben soms een probleem
              dat vóór jou opgelost moet worden: ze hebben geen grip op hun maandelijkse
              cashflow. Wij leggen die basis — zodat jij kunt bouwen op een stevige grond.
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
              Wat wij doen — de basis die jij nodig hebt
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Waar blijft het analyseert het maandbudget van gezinnen en stellen die goed
              verdienen maar structureel krap zitten. We brengen de cashflow helder in kaart:
              wat komt er binnen, wat gaat er vanzelf uit, en hoeveel resteert er vrij. Dat
              zijn de getallen die jij als planner nodig hebt om een realistisch plan te maken.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Geen concurrentie — aanvulling. Jij werkt aan de lange termijn. Wij zorgen dat
              de maand klopt. Samen is dat een stuk krachtiger dan apart.
            </p>
            <div className="rounded-xl border p-6 mt-6" style={{ borderColor: "#E8E0D0", backgroundColor: "#F5F0E8" }}>
              <p className="font-body font-medium text-primary text-sm mb-2">Wat een cliënt meeneemt naar jou</p>
              <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                Na onze analyse weet een cliënt: wat zijn vaste lasten zijn, hoeveel vrije
                maandruimte er reëel is, en welke structurele uitgaven eerst aangepakt moeten
                worden. Een veel stevigere basis voor een financieel plan.
              </p>
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
                ["1", "Stuur ze eerst naar ons", "Als een cliënt geen helder beeld heeft van zijn maandelijkse vrije ruimte, laat ze eerst de gratis analyse doen."],
                ["2", "Wij leggen de basis", "Een concreet beeld van de cashflow, de lekken, en de realistische maandruimte om te investeren."],
                ["3", "Jij bouwt het plan", "Met een cliënt die weet waar hij staat, werkt jouw financieel plan een stuk beter. Optioneel: we stemmen af over het traject."],
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
              Wil je zien hoe we elkaar versterken? Stuur een korte mail en we plannen
              een gesprek van 20 minuten.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20financieel%20planner"
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
