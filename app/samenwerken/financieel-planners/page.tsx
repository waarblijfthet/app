import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samenwerken · voor financieel planners | Waar blijft het",
  description:
    "Cliënten die vermogen willen opbouwen maar geen grip hebben op hun maandbudget. Waar blijft het zorgt voor de cashflow-basis, zodat jij aan het echte werk kunt.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken/financieel-planners" },
  openGraph: {
    title: "Samenwerken met Waar blijft het · voor financieel planners",
    description:
      "Cliënten zonder grip op hun maandbudget kunnen niet goed investeren. Ik leg die basis.",
    url: "https://www.waarblijfthet.nl/samenwerken/financieel-planners",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Wat doe jij anders dan een financieel planner?",
    antwoord:
      "Een financieel planner werkt aan vermogensopbouw, pensioen en langetermijndoelen. Ik kijk alleen naar het maandbudget: wat komt er binnen, wat gaat eruit, waar lekt het. Dat zijn complementaire stukken, geen overlap.",
  },
  {
    vraag: "Hoe verwijs ik iemand door?",
    antwoord:
      "Je noemt Waar blijft het als een cliënt wil beginnen met investeren of sparen, maar zijn maandelijkse cashflow niet op orde heeft. Ze starten met de analyse, dat geeft direct inzicht in wat er maandelijks beschikbaar is.",
  },
  {
    vraag: "Kunnen we samen optrekken in een traject?",
    antwoord:
      "Dat is zeker bespreekbaar. Als jij de langetermijnstrategie bepaalt en ik de maandelijkse structuur leg, versterken we elkaar. Stuur een mail als je dit wil bespreken.",
  },
  {
    vraag: "Is er een vergoeding voor doorverwijzingen?",
    antwoord:
      "Nee. Ik werk onafhankelijk, geen commerciële verwijzingsconstructies.",
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
    titel: "Ze willen beleggen, maar hun maandbudget klopt niet",
    tekst:
      "Je zit met een cliënt die wil beginnen met vermogensopbouw. Goede intentie. Maar als je doorvraagt, blijkt er geen buffer, geen inzicht in de maandelijkse vrije ruimte en vaak ook onzekerheid over vaste lasten. Je kunt een langetermijnplan maken, maar de basis ontbreekt. Investeren met een lek maandbudget is bouwen op drijfzand.",
  },
  {
    titel: "Ze verdienen goed maar hebben niets gespaard",
    tekst:
      "Een van de meest verrassende patronen: gezinnen met 5.000 tot 8.000 euro netto per maand die geen spaarbuffer hebben. Niet door grote uitgaven, maar door een diffuse lekstroom van abonnementen, seizoenskosten en onverwachte kosten die altijd onverwacht blijven. Dat los je niet op met een beleggingsplan.",
  },
  {
    titel: "Ze weten niet hoeveel ze maandelijks vrij hebben",
    tekst:
      "Als financieel planner of vermogensadviseur werk je aan de strategie. Maar als iemand niet weet hoeveel hij maandelijks vrij heeft om te investeren, stagneert elk plan. Het maandbudget is de motor, als die niet loopt, rijdt de auto nergens naartoe.",
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
              cashflow. Ik leg die basis, zodat jij kunt bouwen op een stevige grond.
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
                <div key={p.titel} className="card-base border border-[#E6E9E7]">
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
              Wat ik doe: de basis die jij nodig hebt
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Waar blijft het analyseert het maandbudget van gezinnen en individuen die goed
              verdienen maar structureel krap zitten. Ik breng de cashflow helder in kaart:
              wat komt er binnen, wat gaat er vanzelf uit, en hoeveel resteert er vrij. Dat
              zijn de getallen die jij als planner nodig hebt om een realistisch plan te maken.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Geen concurrentie, aanvulling. Jij werkt aan de lange termijn. Ik zorg dat
              de maand klopt. Samen is dat een stuk krachtiger dan apart.
            </p>
            <div className="rounded-xl border p-6 mt-6" style={{ borderColor: "#E6E9E7", backgroundColor: "#F7F8F7" }}>
              <p className="font-body font-medium text-primary text-sm mb-2">Wat een cliënt meeneemt naar jou</p>
              <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                Na mijn analyse weet een cliënt: wat zijn vaste lasten zijn, hoeveel vrije
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
                ["1", "Stuur ze eerst naar mij", "Als een cliënt geen helder beeld heeft van zijn maandelijkse vrije ruimte, laat ze eerst de analyse doen."],
                ["2", "Ik leg de basis", "Een concreet beeld van de cashflow, de lekken, en de realistische maandruimte om te investeren."],
                ["3", "Jij bouwt het plan", "Met een cliënt die weet waar hij staat, werkt jouw financieel plan een stuk beter. Optioneel: ik stem met jou af over het traject."],
              ].map(([n, t, d]) => (
                <div key={n} className="card-base border border-[#E6E9E7] flex items-start gap-4">
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

        {/* Zo werkt het in de praktijk */}
        <section className="py-12 md:py-16 border-t border-[#E6E9E7]" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="max-w-3xl mx-auto px-6">
            <div className="mb-8">
              <p className="section-eyebrow mb-3">Zo werkt het in de praktijk</p>
              <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-tight">
                Van &lsquo;we willen €800 investeren&rsquo; naar wat echt haalbaar is.
              </h2>
              <p className="font-body font-light text-text-soft text-sm mt-3">
                Illustratief voorbeeld op basis van een doorverwijzing via een financieel planner. Namen fictief.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div style={{ backgroundColor: "white", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#0B7A6E", opacity: 0.5 }}>01</span>
                  <p className="font-body font-semibold text-primary text-sm">De doorverwijzing</p>
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#4A5A56" }}>
                  David (44) en Anne (41) wonen in Eindhoven. Hij is IT-directeur, zij consultant. Gecombineerd netto €7.800 per maand. Ze komen bij financieel planner Marc met een duidelijk doel: €800 per maand investeren voor hun pensioen. Maar als Marc vraagt naar hun vrije maandruimte, weten ze het niet.
                </p>
                <blockquote className="font-body text-sm leading-relaxed mt-3" style={{ color: "#16211F", fontStyle: "italic", borderLeft: "3px solid #0B7A6E", paddingLeft: "0.75rem", marginLeft: 0 }}>
                  &ldquo;Voordat we een plan maken, moeten we eerst weten wat er echt vrij is. Ik ken iemand die dat in kaart brengt. Doe jullie eerst de analyse, dan bouwen we van daaruit verder.&rdquo;
                </blockquote>
              </div>

              <div style={{ backgroundColor: "white", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#0B7A6E", opacity: 0.5 }}>02</span>
                  <p className="font-body font-semibold text-primary text-sm">Wat ze invullen (5 minuten)</p>
                </div>
                <div className="space-y-2">
                  {[
                    ["Situatie", "Stel, 2 kinderen"],
                    ["Netto inkomen", "€ 7.800 / mnd"],
                    ["Hypotheek", "€ 1.780 / mnd"],
                    ["Leaseauto’s (2x)", "€ 860 / mnd"],
                    ["BSO (2 kinderen)", "€ 720 / mnd"],
                    ["Boodschappen", "€ 700 / mnd"],
                    ["Abonnementen + overig", "€ 890 / mnd"],
                  ].map(([label, waarde]) => (
                    <div key={label} className="flex justify-between items-center py-1" style={{ borderBottom: "1px solid #F0F3F1" }}>
                      <span className="font-body text-xs" style={{ color: "#8B958F" }}>{label}</span>
                      <span className="font-body text-sm font-medium" style={{ color: "#16211F" }}>{waarde}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div style={{ backgroundColor: "#16211F", border: "1px solid #0B7A6E", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#86BCAF", opacity: 0.7 }}>03</span>
                  <p className="font-body font-semibold text-sm" style={{ color: "white" }}>Wat de analyse toont</p>
                </div>
                <div className="space-y-3">
                  <div style={{ backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "10px", padding: "0.875rem" }}>
                    <p className="font-body text-xs font-medium mb-1" style={{ color: "#86BCAF" }}>Afwijking 1: Periodieke kosten ontbreken</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                      Schooluitjes, tandarts, vakantie, auto-onderhoud, kleding kinderen. Gemiddeld <strong style={{ color: "white" }}>€ 490 per maand</strong> voor dit profiel, maar David en Anne begroten het als nul. Dat geld gaat elke maand ergens naartoe, maar nooit als bewuste keuze.
                    </p>
                  </div>
                  <div style={{ backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "10px", padding: "0.875rem" }}>
                    <p className="font-body text-xs font-medium mb-1" style={{ color: "#86BCAF" }}>Afwijking 2: Vrije ruimte lager dan verwacht</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                      Na aftrek van alle vaste lasten én de periodieke kosten is de reële vrije ruimte <strong style={{ color: "white" }}>€ 360 per maand</strong>. Niet de €800 waar ze van uitgingen.
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ backgroundColor: "white", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#0B7A6E", opacity: 0.5 }}>04</span>
                  <p className="font-body font-semibold text-primary text-sm">Wat het gesprek (45 min) oplevert</p>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      actie: "Periodieke kosten gepot",
                      resultaat: "€490 per maand apart gezet als maandelijkse reservering. Geen verrassingen meer die het investeerbudget opslokken.",
                    },
                    {
                      actie: "Vrije ruimte verhoogd naar €580",
                      resultaat: "Twee abonnementen gecanceld (€85/mnd), één leaseauto eerder afgebouwd naar privé (€135/mnd goedkoper per saldo).",
                    },
                    {
                      actie: "Realistisch startbedrag voor Marc",
                      resultaat: "David en Anne gaan naar Marc met een onderbouwd antwoord: €580 vrij per maand, waarvan ze €500 willen investeren.",
                    },
                  ].map((item) => (
                    <div key={item.actie} className="flex gap-3 items-start">
                      <span style={{ color: "#0B7A6E", fontWeight: 700, flexShrink: 0, fontSize: "0.9rem" }}>✓</span>
                      <div>
                        <p className="font-body text-xs font-semibold" style={{ color: "#16211F" }}>{item.actie}</p>
                        <p className="font-body text-xs leading-relaxed" style={{ color: "#4A5A56" }}>{item.resultaat}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
              <p className="font-body font-medium text-xs uppercase tracking-widest mb-4" style={{ color: "#0B7A6E" }}>
                Wat Marc als financieel planner eraan had
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { kop: "Realistisch plan mogelijk", tekst: "Marc kon een plan bouwen op echte cijfers. €500 investeren per maand is haalbaar en onderbouwd, geen wensdenken." },
                  { kop: "Cliënt begrijpt zijn eigen situatie", tekst: "David en Anne kwamen voorbereid terug. Geen vragen meer over hoe het kan dat ze zo weinig overhouden, dat was al opgelost." },
                  { kop: "Efficiëntere gesprekken", tekst: "Marc hoefde geen tijd te besteden aan het uitleggen van cashflow-basisprincipes. Hij kon meteen aan de slag met de strategie." },
                ].map((item) => (
                  <div key={item.kop}>
                    <p className="font-body font-semibold text-primary text-sm mb-1">{item.kop}</p>
                    <p className="font-body font-light text-text-soft text-sm leading-relaxed">{item.tekst}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-card py-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl mb-5">Veelgestelde vragen</h2>
            <div className="space-y-4">
              {faq.map((f) => (
                <div key={f.vraag} className="card-base border border-[#E6E9E7]">
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
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">Laten we kennismaken</h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Past dit als aanvulling op jouw praktijk? Stuur een korte mail en ik plan een gesprek van 20 minuten.
            </p>
            <a href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20financieel%20planner" className="btn-primary" style={{ backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" }}>
              Mail Jarno →
            </a>
            <p className="mt-6">
              <Link href="/samenwerken" className="font-body text-sm" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
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
