import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samenwerken · voor budgetcoaches | Waar blijft het",
  description:
    "Cliënten die genoeg verdienen maar toch krap zitten passen niet in schuldhulp. Waar blijft het richt zich precies op dit middensegment, een logische aanvulling op jouw praktijk.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken/budgetcoaches" },
  openGraph: {
    title: "Samenwerken met Waar blijft het · voor budgetcoaches",
    description:
      "Het middensegment: genoeg inkomen, geen schulden, maar structureel krap. Ik pak dat aan.",
    url: "https://www.waarblijfthet.nl/samenwerken/budgetcoaches",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Wat is het verschil tussen jouw aanpak en reguliere budgetcoaching?",
    antwoord:
      "Schuldhulp en budgetcoaching richten zich vaak op mensen met schulden of een laag inkomen. Ik richt me op het middensegment: modaal tot bovenmodaal inkomen, geen schulden, maar structureel krap door onduidelijkheid over waar het geld naartoe gaat. Andere doelgroep, andere aanpak.",
  },
  {
    vraag: "Hoe verwijs ik iemand door?",
    antwoord:
      "Je noemt Waar blijft het als de cliënt buiten jouw scope valt: te weinig schulden voor schuldhulp, maar wel grip nodig op het maandbudget. Ze starten zelf via de gratis analyse op de site.",
  },
  {
    vraag: "Kunnen we samen optrekken in een traject?",
    antwoord:
      "Dat kan. Als je een cliënt hebt die zowel jouw begeleiding als financieel inzicht nodig heeft, kijk ik met jou hoe we dat complementair kunnen oppakken. Mail me dan even.",
  },
  {
    vraag: "Is er een vergoeding voor doorverwijzingen?",
    antwoord:
      "Nee. Ik werk onafhankelijk, geen affiliate-constructies of commerciële verwijzingsrelaties.",
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
    titel: "Ze verdienen te veel voor schuldhulp, en te weinig om niets te doen",
    tekst:
      "Een gezin met €4.500 netto per maand heeft geen recht op schuldhulpverlening. Ze hebben ook geen schulden. Maar ze leven maand tot maand, kunnen niets sparen en begrijpen niet waar het geld blijft. Ze vallen overal buiten. En als budgetcoach zie je ze soms langskomen, maar ze passen niet goed in jouw reguliere traject.",
  },
  {
    titel: "Het probleem zit in structuur, niet in gedrag",
    tekst:
      "Veel mensen in dit segment maken geen grove fouten. Ze geven niet te veel uit aan onzin. Maar ze hebben nooit goed nagedacht over vaste lasten, seizoenskosten, of wat het tweede inkomen na belasting en BSO eigenlijk netto oplevert. De kennis ontbreekt, niet de wil.",
  },
  {
    titel: "Ze zoeken hulp, maar weten niet waar",
    tekst:
      "Schuldhulp is voor mensen met schulden. Een financieel planner is voor vermogensbeheer. Een budgetcoach klinkt als 'arm'. Ze zoeken ergens tussenin: iemand die begrijpt dat je gewoon wil weten waar het geld naartoe gaat, zonder dat je een probleemgeval hoeft te zijn.",
  },
];

export default function BudgetcoachesPage() {
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
            <p className="section-eyebrow mb-4">Voor budgetcoaches &amp; schuldhulpverleners</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl leading-tight">
              Ze verdienen genoeg.<br />
              En toch komen ze bij jou.
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-2xl">
              Als budgetcoach of schuldhulpverlener ken je dit type: een gezin met een modaal
              of bovenmodaal inkomen, geen echte schulden, maar wel structureel krap. Ze passen
              niet in schuldhulp, maar ze hebben wel iemand nodig. Dat is waar ik in spring.
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

        {/* Onderscheid */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Wat ik doe: precies het gat dat jij niet vult
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Waar blijft het richt zich op het middensegment: gezinnen en individuen met een
              modaal tot bovenmodaal inkomen die nooit goed hebben nagedacht over hun
              maandstructuur. Ik breng het budget in kaart, benoem de twee of drie plekken
              waar geld structureel weglekt, en geef concrete stappen zonder oordeel en
              zonder jargon.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Geen schuldhulp. Geen beleggingsadvies. Gewoon grip op de maandelijkse cashflow
              voor mensen die dat tot nu toe misten.
            </p>
            <div className="rounded-xl border p-6 mt-6" style={{ borderColor: "#E6E9E7", backgroundColor: "#F7F8F7" }}>
              <p className="font-body font-medium text-primary text-sm mb-2">Het middensegment, concreet</p>
              <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                Netto gezinsinkomen €3.000 tot €7.000 per maand. Geen schulden of betalingsachterstand.
                Wel: structureel weinig over, geen buffer, onbegrip over waar het geld heen gaat.
                Vaak tweeverdieners met jonge kinderen, of alleenstaanden met een goed salaris.
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
                ["1", "Verwijs door of vertel erover", "Als iemand buiten jouw scope valt (te weinig schulden, maar wel budgetvraag), noem dan Waar blijft het."],
                ["2", "Ze starten zelf", "Via de gratis analyse op de site. Vrijblijvend, vijf minuten. Dat geeft al inzicht."],
                ["3", "Optioneel: samen optrekken", "Heeft iemand zowel jouw begeleiding nodig als financieel inzicht? Dan overleg ik met jou hoe we dat complementair oppakken."],
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
                Van &apos;past niet bij ons&apos; naar een concrete doorverwijzing.
              </h2>
              <p className="font-body font-light text-text-soft text-sm mt-3">
                Illustratief voorbeeld op basis van een doorverwijzing via een budgetcoach. Namen fictief.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div style={{ backgroundColor: "white", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#0B7A6E", opacity: 0.5 }}>01</span>
                  <p className="font-body font-semibold text-primary text-sm">De doorverwijzing</p>
                </div>
                <p className="font-body text-sm leading-relaxed" style={{ color: "#4A5A56" }}>
                  Sylvia (42) is HR-manager in Utrecht en alleenstaande moeder van twee kinderen. Netto €3.600 per maand. Ze klopt aan bij budgetcoach Roos, maar heeft geen schulden. Roos kan haar niet in een regulier traject plaatsen en verwijst door.
                </p>
                <blockquote className="font-body text-sm leading-relaxed mt-3" style={{ color: "#16211F", fontStyle: "italic", borderLeft: "3px solid #0B7A6E", paddingLeft: "0.75rem", marginLeft: 0 }}>
                  &ldquo;Je past niet in ons schuldhulptraject, maar je hebt wel grip nodig. Er is iemand die precies dit doet voor jouw type situatie. Start eerst de gratis analyse, dan weet je in vijf minuten waar het knelt.&rdquo;
                </blockquote>
              </div>

              <div style={{ backgroundColor: "white", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#0B7A6E", opacity: 0.5 }}>02</span>
                  <p className="font-body font-semibold text-primary text-sm">Wat ze invult (5 minuten)</p>
                </div>
                <div className="space-y-2">
                  {[
                    ["Situatie", "Alleenstaand, 2 kinderen"],
                    ["Netto inkomen", "€ 3.600 / mnd"],
                    ["Huur", "€ 1.250 / mnd"],
                    ["BSO (2 kinderen)", "€ 490 / mnd"],
                    ["Auto (private lease)", "€ 385 / mnd"],
                    ["Boodschappen", "€ 520 / mnd"],
                    ["Overig", "€ 680 / mnd"],
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
                    <p className="font-body text-xs font-medium mb-1" style={{ color: "#86BCAF" }}>Afwijking 1: Auto</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                      Private lease van <strong style={{ color: "white" }}>€ 385 per maand</strong> voor een auto die 4 dagen per week rijdt. Vergeleken met vergelijkbare eenpersoonshuishoudens is dit de grootste kostenpost buiten de norm.
                    </p>
                  </div>
                  <div style={{ backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "10px", padding: "0.875rem" }}>
                    <p className="font-body text-xs font-medium mb-1" style={{ color: "#86BCAF" }}>Afwijking 2: Ongespecificeerd overig</p>
                    <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                      <strong style={{ color: "white" }}>€ 680 per maand</strong> &apos;overig&apos; zonder specificatie. Op basis van vergelijkbare profielen zit hier doorgaans €150 tot €200 aan vergeten automatische incasso&apos;s in.
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
                      actie: "Auto omgezet naar deelauto + trein",
                      resultaat: "Van €385 private lease naar deelauto-abonnement + NS-abo: €195 per maand. Besparing: €190 per maand.",
                    },
                    {
                      actie: "1 BSO-dag minder door thuiswerken",
                      resultaat: "Sylvia werkt nu 1 extra dag thuis. BSO van €490 naar €370 per maand. Besparing: €120 per maand.",
                    },
                    {
                      actie: "Vergeten incasso's gevonden",
                      resultaat: "Drie automatische incasso's opgezegd die ze niet meer gebruikte: samen €85 per maand terug.",
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
                Wat Roos als budgetcoach eraan had
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { kop: "Niemand meer wegsturen", tekst: "Roos hoefde Sylvia niet teleur te stellen. Ze kon haar doorsturen naar een passende plek, met een concreet en eerlijk verhaal." },
                  { kop: "Aanvulling op haar praktijk", tekst: "Het middensegment past niet in schuldhulp, maar heeft wel hulp nodig. Roos heeft nu een doorverwijzing voor precies die groep." },
                  { kop: "Sylvia goed geholpen", tekst: "€395 per maand vrijgemaakt, buffer opgebouwd. Sylvia heeft nu voor het eerst in jaren een positief saldo aan het einde van de maand." },
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
              Past dit als aanvulling op jouw praktijk? Stuur een mail en ik plan een kort kennismakingsgesprek.
            </p>
            <a href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20budgetcoach" className="btn-primary" style={{ backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" }}>
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
