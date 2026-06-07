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
      "Het middensegment: genoeg inkomen, geen schulden, maar structureel krap. Wij pakken dat aan.",
    url: "https://www.waarblijfthet.nl/samenwerken/budgetcoaches",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Wat is precies het verschil tussen jullie aanpak en reguliere budgetcoaching?",
    antwoord:
      "Schuldhulp en budgetcoaching richten zich vaak op mensen met schulden of een laag inkomen. Wij richten ons op het middensegment: modaal tot bovenmodaal inkomen, geen schulden, maar structureel krap door onduidelijkheid over waar het geld naartoe gaat. Andere doelgroep, andere aanpak.",
  },
  {
    vraag: "Hoe verwijs ik iemand door?",
    antwoord:
      "Je noemt Waar blijft het als de cliënt buiten jouw scope valt, te weinig schulden voor schuldhulp, maar wel grip nodig op het maandbudget. Ze starten zelf via de gratis analyse op de site.",
  },
  {
    vraag: "Werken jullie samen met budgetcoaches in een traject?",
    antwoord:
      "Dat kan. Als je een cliënt hebt die zowel jouw begeleiding als financieel inzicht nodig heeft, kijken we hoe we dat complementair kunnen oppakken. Mail ons dan even.",
  },
  {
    vraag: "Is er een vergoeding voor doorverwijzingen?",
    antwoord:
      "Nee. We werken onafhankelijk, geen affiliate-constructies of commerciële verwijzingsrelaties.",
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
      "Schuldhulp is voor mensen met schulden. Een financieel planner is voor vermogensbeheer. Een budgetcoach klinkt als 'arm'. Ze zoeken ergens tussenin, iemand die begrijpt dat je gewoon goed wil weten waar het geld naartoe gaat, zonder dat je een probleemsituatie hoeft te zijn.",
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
              niet in schuldhulp, maar ze hebben wel iemand nodig. Dat is waar wij in springen.
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

        {/* Onderscheid */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Wat wij doen, precies het gat dat jij niet vult
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Waar blijft het richt zich op het middensegment: gezinnen en stellen met een
              modaal tot bovenmodaal inkomen die nooit goed hebben nagedacht over hun
              maandstructuur. We brengen het budget in kaart, benoemen de twee of drie plekken
              waar geld structureel weglekt, en geven concrete stappen, zonder oordeel,
              zonder jargon.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Geen schuldhulp. Geen beleggingsadvies. Gewoon grip op de maandelijkse cashflow —
              voor mensen die dat tot nu toe misten.
            </p>
            <div className="rounded-xl border p-6 mt-6" style={{ borderColor: "#E8E0D0", backgroundColor: "#F5F0E8" }}>
              <p className="font-body font-medium text-primary text-sm mb-2">Het middensegment, concreet</p>
              <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                Netto gezinsinkomen €3.000–€7.000 per maand. Geen schulden of betalingsachterstand.
                Wel: structureel weinig over, geen buffer, onbegrip over waar het geld heen gaat.
                Vaak tweeverdieners met jonge kinderen.
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
                ["3", "Optioneel: samen optrekken", "Heeft iemand zowel jouw begeleiding nodig als financieel inzicht? Dan overleggen we hoe we dat complementair oppakken."],
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
              Wil je kijken hoe we elkaar kunnen aanvullen? Stuur een mail en we plannen
              een kort kennismakingsgesprek.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20budgetcoach"
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
