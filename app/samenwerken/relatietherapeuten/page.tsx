import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { rapportVoorSlug } from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: "Samenwerken · voor relatietherapeuten | Waar blijft het",
  description:
    "Geld komt steeds terug in de sessie, maar het financiële deel hoort niet bij relatietherapie. Waar blijft het brengt het feitelijk en onafhankelijk in kaart, zodat jij je weer op de relatie kunt richten.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken/relatietherapeuten" },
  openGraph: {
    title: "Voor relatietherapeuten: het financiële deel hoort niet bij jouw vak",
    description:
      "Geld komt steeds terug in de sessie. Ik breng het financiële vraagstuk feitelijk en onafhankelijk in kaart, jij focust op de relatie.",
    url: "https://www.waarblijfthet.nl/samenwerken/relatietherapeuten",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// Het echte Geldscan-rapport dat als bewijs dient. Titel, cijfers en citaten
// komen rechtstreeks uit lib/rapporten-data.ts (werkregel 4): nooit een bedrag
// of uitspraak van een echte klant uit het hoofd overtypen. Dit specifieke
// koppel kwam niet per se binnen via een therapeutverwijzing, maar de uitkomst
// (geen lek gevonden) is precies waarom dit rapport hier staat.
const BEWIJS_SLUG = "stel-zonder-kinderen";

const signalen = [
  "Steeds ruzie over wie wat betaalt",
  "Discussie over uitgaven en sparen, zonder dat iemand een gedeeld beeld heeft van wat genoeg is",
  "Eén partner voelt zich financieel gecontroleerd",
  "Eén partner vindt dat de ander “te veel uitgeeft”, zonder dat iemand het heeft nagerekend",
  "Onduidelijkheid over hoeveel er aan het eind van de maand daadwerkelijk overblijft",
  "Geldgesprekken die iedere sessie terugkomen, ongeacht het onderwerp waarmee je begint",
  "Een stel dat goed verdient, maar toch voortdurend financiële spanning ervaart",
];

const watHetOplevert = [
  "Je hoeft tijdens je sessie niet te bepalen wie financieel gelijk heeft.",
  "Je hoeft geen financieel expert te worden om financiële spanning serieus te nemen.",
  "Je blijft verantwoordelijk voor de relatie, de communicatie, de emoties en de patronen. Ik neem alleen het feitelijke geldvraagstuk onder handen.",
];

const onafhankelijk = [
  "Geen financiële producten",
  "Geen provisie",
  "Geen belang bij de uitkomst",
  "Geen oordeel over hoe een stel moet leven",
  "Geen verplicht vervolgtraject",
  "Geen concurrentie met relatietherapie",
];

const stappen = [
  {
    n: "1",
    titel: "Je herkent het signaal",
    tekst:
      "Geld komt sessie na sessie terug. Je noemt Waar blijft het bij je cliënten. Meer hoeft de eerste stap niet te zijn.",
  },
  {
    n: "2",
    titel: "Het stel doet de gratis analyse",
    tekst:
      "Vijf minuten, op de site. Ze zien direct waar hun situatie afwijkt van vergelijkbare huishoudens, of juist dat die niet afwijkt.",
  },
  {
    n: "3",
    titel: "Optioneel: Geldscan of adviesgesprek",
    tekst:
      "Willen ze meer duiding, dan is er de Geldscan (€49, schriftelijk, geen gesprek nodig) of een adviesgesprek (€125, 45 minuten). Nooit verplicht.",
  },
  {
    n: "4",
    titel: "Jij krijgt de ruimte terug",
    tekst:
      "Het financiële stuk is uitgezocht, feitelijk en zonder oordeel. De sessie kan weer over de relatie gaan.",
  },
];

const faq = [
  {
    vraag: "Wat doet Waar blijft het precies?",
    antwoord:
      "Ik breng het financiële vraagstuk van een stel feitelijk en onafhankelijk in kaart: wat komt er binnen, wat gaat eruit, en waar wijkt hun situatie af van vergelijkbare huishoudens. Geen beleggingsadvies, geen schuldhulp, en geen oordeel over hun levensstijl.",
  },
  {
    vraag: "Is geld altijd de echte oorzaak van hun relatieproblemen?",
    antwoord:
      "Nee. Geld kan een oorzaak zijn, een trigger, een gevolg van iets anders, of een factor die bestaande spanning versterkt. Daar doe ik vooraf geen uitspraak over, dat is jouw vak. Ik kijk alleen naar wat er feitelijk met het geld gebeurt.",
  },
  {
    vraag: "Wat gebeurt er met mijn cliënt nadat ik doorverwijs?",
    antwoord:
      "Ze doen zelf de gratis analyse op de site, vijf minuten, en zien meteen waar hun situatie afwijkt. Willen ze meer uitleg, dan geeft de Geldscan (€49) een geschreven rapport met context, verklaring en prioriteiten. Een adviesgesprek (€125) is er voor wie liever doorpraat. Niets daarvan loopt via jouw sessie.",
  },
  {
    vraag: "Is er een financiële vergoeding voor de verwijzing?",
    antwoord:
      "Nee. Ik geloof in een eerlijk, onafhankelijk model. Geen affiliate-constructies, wel een betrouwbare schakel in jouw netwerk.",
  },
  {
    vraag: "Concurreert dit met mijn werk als relatietherapeut?",
    antwoord:
      "Nee. Ik neem alleen het feitelijke financiële vraagstuk onder handen. Jij blijft verantwoordelijk voor de relatie, de communicatie en de patronen daarachter. Waar blijft het is aanvullend, geen vervanging.",
  },
  {
    vraag: "Hoe leg ik dit eenvoudig uit aan mijn cliënt?",
    antwoord:
      "Bijvoorbeeld zo: “Er is iemand die het financiële deel feitelijk en onafhankelijk in kaart kan brengen, los van onze gesprekken. Geen advies over beleggen of schulden, gewoon een heldere blik op waar het geld naartoe gaat. Ik stel voor dat jullie de gratis analyse invullen, dat kost vijf minuten.”",
  },
  {
    vraag: "Ik wil je eerst beter kennen voordat ik doorverwijs. Kan dat?",
    antwoord:
      "Absoluut. Stuur een mail naar hallo@waarblijfthet.nl. Dan plan ik een kennismakingsgesprek van 20 minuten, gewoon om te kijken of het past en hoe de samenwerking er in de praktijk uitziet.",
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

export default function RelatietherapeutenPage() {
  const bewijs = rapportVoorSlug(BEWIJS_SLUG);

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
            <p className="section-eyebrow mb-4">Voor relatietherapeuten &amp; koppelcoaches</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl leading-tight">
              Geld komt steeds terug in de sessie.<br />
              Het financiële deel ligt buiten jouw expertise.
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-2xl mb-5">
              Waar blijft het brengt dat financiële vraagstuk feitelijk en onafhankelijk in
              kaart, zodat jij je weer volledig op de relatie kunt richten.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed max-w-2xl">
              Geld hoeft niet de kern van het probleem te zijn om toch telkens op tafel te
              komen. Het kan een aanleiding zijn, een trigger, een gevolg van iets anders, of
              een factor die bestaande spanning versterkt. Ik doe daar vooraf geen uitspraak
              over. Ik kijk naar wat er feitelijk met het geld gebeurt, niet naar wat dat over
              de relatie zegt.
            </p>
          </div>
        </section>

        {/* Herkenning */}
        <section className="bg-background pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
              Herken je dit bij je cliënten?
            </h2>
            <p className="text-text-soft font-body font-light text-sm leading-relaxed mb-6">
              Niet elk gesprek over geld vraagt om een aparte partij. Dit zijn de signalen
              waarbij het financiële stuk waarschijnlijk buiten jouw bereik ligt.
            </p>
            <div className="card-base border border-[#E6E9E7]">
              <ul className="space-y-3 font-body font-light text-text-soft text-sm leading-relaxed">
                {signalen.map((s) => (
                  <li key={s} className="flex gap-3 items-start">
                    <span style={{ color: "#0B7A6E", flexShrink: 0 }}>&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Wat dit voor jou betekent + onafhankelijkheid */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-base border border-[#A6D8CD] bg-green-light">
              <p className="font-display font-light text-primary text-xl mb-4">
                Wat dit voor jou betekent
              </p>
              <ul className="space-y-3 font-body font-light text-sm text-text-soft leading-relaxed">
                {watHetOplevert.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="card-base border border-[#E6E9E7]">
              <p className="font-display font-light text-primary text-xl mb-4">
                Onafhankelijk, met opzet
              </p>
              <ul className="space-y-2 font-body font-light text-sm text-text-soft">
                {onafhankelijk.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Zo werkt de samenwerking */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Zo werkt de samenwerking
            </h2>
            <div className="space-y-4">
              {stappen.map((s) => (
                <div key={s.n} className="card-base border border-[#E6E9E7] flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center shrink-0">
                    <span className="font-display font-medium text-primary">{s.n}</span>
                  </div>
                  <div>
                    <p className="font-body font-medium text-primary text-sm mb-1">{s.titel}</p>
                    <p className="font-body font-light text-text-soft text-sm leading-relaxed">{s.tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bewijs: een echt rapport, geen verzonnen besparingscase */}
        {bewijs && (
          <section className="py-12 md:py-16 border-t border-[#E6E9E7]" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="max-w-3xl mx-auto px-6">
              <div className="mb-8">
                <p className="section-eyebrow mb-3">Een echt voorbeeld, geen verzonnen besparingsverhaal</p>
                <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-tight mb-3">
                  Niet elke analyse vindt een lek. Dat is precies het punt.
                </h2>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  Dit rapport kwam niet per se binnen via een therapeutverwijzing, maar laat
                  zien wat een koppel dat jij doorstuurt kan verwachten: soms een duidelijke
                  afwijking, soms de geruststelling dat er niets stuk is. Namen zijn weggelaten,
                  de bedragen staan er precies zoals aangeleverd.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div style={{ backgroundColor: "white", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#0B7A6E", opacity: 0.5 }}>01</span>
                    <p className="font-body font-semibold text-primary text-sm">De situatie</p>
                  </div>
                  <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "#4A5A56" }}>
                    {bewijs.profiel}
                  </p>
                  <blockquote className="font-body text-xs leading-relaxed" style={{ color: "#16211F", fontStyle: "italic", borderLeft: "3px solid #0B7A6E", paddingLeft: "0.75rem", marginLeft: 0 }}>
                    &ldquo;{bewijs.vermoeden}&rdquo;
                  </blockquote>
                  <p className="font-body text-xs mt-2" style={{ color: "#8B958F" }}>{bewijs.vermoedenBedrag}</p>
                </div>

                <div style={{ backgroundColor: "#16211F", border: "1px solid #0B7A6E", borderRadius: "16px", padding: "1.5rem" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#86BCAF", opacity: 0.7 }}>02</span>
                    <p className="font-body font-semibold text-sm" style={{ color: "white" }}>Wat de analyse toont</p>
                  </div>
                  <p className="font-body text-xs font-medium mb-2" style={{ color: "#86BCAF" }}>{bewijs.uitkomstKop}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(245,240,232,0.85)" }}>
                    {bewijs.uitkomst}
                  </p>
                </div>

                <div style={{ backgroundColor: "white", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-display font-light" style={{ fontSize: "1.25rem", color: "#0B7A6E", opacity: 0.5 }}>03</span>
                    <p className="font-body font-semibold text-primary text-sm">Wat de Geldscan toevoegt</p>
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "#4A5A56" }}>
                    {bewijs.adviesInleiding}
                  </p>
                </div>
              </div>

              <div style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7", borderRadius: "16px", padding: "1.5rem" }}>
                <p className="font-body font-medium text-xs uppercase tracking-widest mb-3" style={{ color: "#0B7A6E" }}>
                  Drie maanden later, in hun eigen woorden
                </p>
                <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "#16211F" }}>
                  &ldquo;{bewijs.evaluatie}&rdquo;
                </p>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  Context, verklaring en prioriteiten, niet koste wat kost een besparing. Voor de
                  therapeut betekent dat: het financiële stuk is uitgezocht, zonder oordeel over
                  hun levensstijl. De volgende sessie kan weer over de relatie gaan.
                </p>
                <Link
                  href={`/rapporten/${bewijs.slug}`}
                  className="inline-block mt-4 font-body text-sm font-medium hover:underline"
                  style={{ color: "#0B7A6E" }}
                >
                  Lees het volledige rapport &rarr;
                </Link>
              </div>
            </div>
          </section>
        )}

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
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">
              Heb je een stel waarbij geld steeds onderdeel van het conflict wordt?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Laten we kort kennismaken. Geen verkooppraat, gewoon even kijken of dit past bij
              jouw praktijk.
            </p>
            <a href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20als%20relatietherapeut" className="btn-primary" style={{ backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" }}>
              Laten we kennismaken &rarr;
            </a>
            <p className="mt-6">
              <Link href="/samenwerken" className="font-body text-sm" style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}>
                &larr; Terug naar samenwerken overzicht
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
