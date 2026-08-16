import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { rapportVoorSlug } from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: "Samenwerken · voor boekhouders die particulieren helpen | Waar blijft het",
  description:
    "Jouw klant verdient goed maar houdt weinig over. Jij kent de cijfers, ik breng het volledige huishoudbudget in kaart. Samenwerken boekhouder: vrijblijvend doorverwijzen, geen verkoopgesprek.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken/boekhouders" },
  openGraph: {
    title: "Voor boekhouders: je kent de cijfers, maar weet je ook waar het geld blijft?",
    description:
      "Financiële hulp voor klanten die goed verdienen maar structureel krap zitten. Boekhouder doorverwijzen zonder een financieel adviesgesprek te hoeven voeren.",
    url: "https://www.waarblijfthet.nl/samenwerken/boekhouders",
    type: "website",
  },
  robots: { index: true, follow: true },
};

// Echt geldrapport als bewijs (werkregel 4: nooit een bedrag of citaat van een
// echte klant overtypen, altijd uit lib/rapporten-data.ts). Dit gezin dacht dat
// boodschappen en de kinderen de oorzaak waren; de analyse liet zien dat geen
// enkele vaste last uit de toon viel. Precies het soort geruststellende noch
// spectaculaire uitkomst dat de briefing vroeg.
const BEWIJS_SLUG = "tweeverdieners-drie-kinderen";

const situaties = [
  "“Ik verdien goed, maar aan het eind van de maand is mijn geld weg.”",
  "“Ik snap mijn cijfers, maar niet waar mijn geld blijft.”",
  "“Is €1.000 boodschappen eigenlijk veel voor ons gezin?”",
  "“Waarom sparen we ondanks ons goede inkomen zo weinig?”",
  "“Ik krijg elk jaar netjes mijn aangifte terug, maar ik snap niet waar het bij ons naartoe gaat.”",
];

const watHetOplevert = [
  "Je hoeft het financiële gedrag van je klant niet zelf te analyseren. Dat is een andere vraag dan de vraag die jij al beantwoordt.",
  "Je kunt doorverwijzen zodra een vraag breder wordt dan jouw dienstverlening: niet fiscaal, niet administratief, maar huishoudelijk.",
  "Je blijft volledig in je eigen rol. Geen verkoopgesprek, geen vervolgtraject dat jij moet bewaken.",
];

const vertrouwen = [
  "Onafhankelijk",
  "Geen financiële producten",
  "Geen provisies",
  "Geen abonnement",
  "Geen verplichte afspraak",
  "Persoonlijke analyse, geen sjabloon",
  "Mag concluderen dat er financieel niets geks aan de hand is",
];

const stappen = [
  {
    n: "1",
    titel: "Jij herkent de vraag",
    tekst:
      "Een klant vraagt niet naar de aangifte of de aftrekposten, maar naar wat er van zijn inkomen overblijft en waarom dat zo weinig is. Dat is het signaal.",
  },
  {
    n: "2",
    titel: "Je verwijst vrijblijvend door",
    tekst:
      "De klant start zelf met de gratis analyse op waarblijfthet.nl. Vijf minuten, geen account, geen verplichting.",
  },
  {
    n: "3",
    titel: "De klant beslist zelf over een vervolg",
    tekst:
      "Na de gratis analyse kan de klant zelf kiezen voor de Geldscan van €49, een persoonlijk geldrapport. Jij hoeft daar geen rol in te spelen.",
  },
];

const faq = [
  {
    vraag: "Waarom zou ik iets doorverwijzen wat ik zelf ook zou kunnen uitleggen?",
    antwoord:
      "Dat kan vaak ook, voor het fiscale en administratieve stuk. Waar blijft het beantwoordt een andere vraag: niet wat er in de aangifte moet, maar wat een klant feitelijk overhoudt in het volledige huishouden en waar dat afwijkt van vergelijkbare huishoudens. Dat is geen tijd die je erbij hoeft te nemen naast je eigen dienstverlening.",
  },
  {
    vraag: "Is dit een vervanging voor mijn werk als boekhouder?",
    antwoord:
      "Nee. Ik kom niet aan de administratie, de aangifte, de toeslagen of de fiscale kant. Ik kijk alleen naar het huishoudbudget als geheel: inkomen, vaste lasten, patronen en afwijkingen. Dat is een ander vraagstuk dan het jouwe.",
  },
  {
    vraag: "Hoe leg ik dit eenvoudig uit aan een klant?",
    antwoord:
      "Bijvoorbeeld zo: “Ik zie in je cijfers dat je goed verdient. Waarom er dan toch weinig overblijft is een andere vraag dan de aangifte, daar is een onafhankelijke analyse voor. Kost je vijf minuten, en is gratis.”",
  },
  {
    vraag: "Wat als de analyse concludeert dat er niets aan de hand is?",
    antwoord:
      "Dat gebeurt geregeld, en is precies zo waardevol als een analyse die wel iets vindt. Een klant die hoort dat zijn uitgaven niet uit de toon vallen, en dat de krapte simpelweg bij zijn inkomen en levensfase hoort, heeft ook iets aan die geruststelling.",
  },
  {
    vraag: "Krijg ik een vergoeding voor doorverwijzingen?",
    antwoord:
      "Nee. Er is geen affiliate-constructie en geen provisie. Dat is bewust: het houdt de analyse onafhankelijk, en dat is precies wat een klant nodig heeft als hij twijfelt of hij wel goed bezig is.",
  },
  {
    vraag: "Moet ik zelf iets aanleveren of overdragen?",
    antwoord:
      "Nee. De klant start zelf, vult zelf zijn eigen situatie in, en regelt zelf een eventueel vervolg. Jij hoeft niets over te dragen en niets te volgen.",
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

export default function BoekhoudersPage() {
  const bewijs = rapportVoorSlug(BEWIJS_SLUG);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-background pt-16 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Voor boekhouders &amp; administratiekantoren</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl leading-tight">
              Je kent de cijfers van je klant.<br />
              Maar weet je ook waarom er zo weinig overblijft?
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-2xl mb-8">
              Waar blijft het analyseert het volledige huishouden en maakt inzichtelijk
              waar iemand afwijkt van vergelijkbare huishoudens. Geen fiscale vraag, geen
              administratieve vraag: de vraag wat al die juiste cijfers voor iemands
              financiële leven betekenen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#hoe-werkt-het" className="btn-primary" style={{ backgroundColor: "#0B7A6E" }}>
                Bekijk hoe het werkt
              </a>
              <a
                href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20als%20boekhouder"
                className="btn-outline"
              >
                Kennismaken
              </a>
            </div>
          </div>
        </section>

        {/* Probleemherkenning */}
        <section className="bg-background pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
              Herken je deze vraag bij je klanten?
            </h2>
            <p className="text-text-soft font-body font-light text-sm leading-relaxed mb-6">
              Andere vragen dan de belastingvraag, maar wel vragen die bij jou terechtkomen
              omdat jij de cijfers al kent.
            </p>
            <div className="card-base border border-[#E6E9E7]">
              <ul className="space-y-3 font-body font-light text-text-soft text-sm leading-relaxed">
                {situaties.map((s) => (
                  <li key={s} className="flex gap-3 items-start">
                    <span style={{ color: "#0B7A6E", flexShrink: 0 }}>&bull;</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Waarom dit interessant is + vertrouwen */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-base border border-[#A6D8CD] bg-green-light">
              <p className="font-display font-light text-primary text-xl mb-4">
                Waarom dit voor jou interessant is
              </p>
              <ul className="space-y-3 font-body font-light text-sm text-text-soft leading-relaxed">
                {watHetOplevert.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="card-base border border-[#E6E9E7]">
              <p className="font-display font-light text-primary text-xl mb-4">
                Vertrouwen, in het kort
              </p>
              <ul className="space-y-2 font-body font-light text-sm text-text-soft">
                {vertrouwen.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Hoe werkt de samenwerking */}
        <section id="hoe-werkt-het" className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
              Zo werkt de samenwerking
            </h2>
            <p className="text-text-soft font-body font-light text-sm leading-relaxed mb-6">
              Drie stappen. Jij zet er één van, en je hoeft geen verkoopgesprek te voeren.
            </p>
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

        {/* Case: een echt rapport, geen verzonnen besparingsverhaal */}
        {bewijs && (
          <section className="py-12 md:py-16 border-t border-[#E6E9E7]" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="max-w-3xl mx-auto px-6">
              <div className="mb-8">
                <p className="section-eyebrow mb-3">Een echt voorbeeld, geen verzonnen besparingsverhaal</p>
                <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-tight mb-3">
                  Ze dachten aan boodschappen en de kinderen. Dat was het niet.
                </h2>
                <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                  Dit gezin verdiende goed, en had precies de vraag die vaak bij een
                  boekhouder terechtkomt: waarom blijft er zo weinig over. Namen zijn
                  weggelaten, de bedragen staan er precies zoals aangeleverd.
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
                  Niet zoeken naar een antwoord dat vooraf al vaststond, maar eerst
                  onderzoeken wat er werkelijk gebeurt. Dat is precies de waarde: voor deze
                  klant betekende het geen bezuinigingslijst, maar een structuur die bij
                  hun situatie past.
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
              Heb je een klant die goed verdient maar niet begrijpt waar het geld blijft?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Bespreek vrijblijvend of Waar blijft het kan helpen. Geen verkooppraat,
              gewoon even kijken of dit bij je klant past.
            </p>
            <a href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20als%20boekhouder" className="btn-primary" style={{ backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" }}>
              Mail Jarno &rarr;
            </a>
            <div className="mt-10 pt-8 border-t border-white/10 max-w-md mx-auto">
              <p className="font-body text-xs uppercase tracking-widest mb-3" style={{ color: "rgba(245,240,232,0.5)" }}>
                Andere doelgroep?
              </p>
              <p className="font-body text-sm mb-1">
                <Link href="/samenwerken/accountants-ondernemers" style={{ color: "#86BCAF", textDecoration: "underline" }}>
                  Werk je met ondernemers? &rarr; Accountants &amp; ondernemers
                </Link>
              </p>
            </div>
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
