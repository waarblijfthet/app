import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Woordenlijst: geldbegrippen in gewone taal",
  description:
    "De belangrijkste geldbegrippen uitgelegd zonder jargon, van lifestyle-inflatie en de potjesmethode tot heffingskorting en salderen. Met voorbeelden.",
  alternates: { canonical: "https://www.waarblijfthet.nl/woordenlijst" },
  openGraph: {
    title: "Woordenlijst: geldbegrippen in gewone taal",
    description: "De belangrijkste geldbegrippen uitgelegd zonder jargon.",
    url: "https://www.waarblijfthet.nl/woordenlijst",
    type: "website",
  },
  robots: { index: true, follow: true },
};

type Term = { term: string; uitleg: string; href?: string; linkLabel?: string };

const TERMEN: Term[] = [
  {
    term: "Lifestyle-inflatie",
    uitleg:
      "Het verschijnsel dat je uitgaven meegroeien met je inkomen. Ga je meer verdienen, dan ga je bijna ongemerkt duurder leven, waardoor je niet meer overhoudt.",
    href: "/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven",
    linkLabel: "Lees het artikel",
  },
  {
    term: "Vaste lasten",
    uitleg:
      "Kosten die elke maand ongeveer hetzelfde zijn en moeilijk te vermijden: huur of hypotheek, energie, verzekeringen, abonnementen. Tegenover variabele lasten, die je per maand kunt sturen (zoals boodschappen en uitjes).",
    href: "/inzichten/wat-zijn-normale-vaste-lasten-gezin",
    linkLabel: "Wat zijn normale vaste lasten?",
  },
  {
    term: "Boodschappenkloof",
    uitleg:
      "Het verschil tussen wat het Nibud als norm hanteert voor boodschappen (€627 voor een gezin van vier) en wat gezinnen in de praktijk uitgeven (vaak €875 of meer).",
    href: "/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand",
    linkLabel: "Norm vs. werkelijkheid",
  },
  {
    term: "Noodbuffer",
    uitleg:
      "Een potje spaargeld voor onverwachte uitgaven, een kapotte wasmachine, een hoge naheffing. Zonder buffer betaal je die uit je lopende inkomen, wat elke maand krap maakt. Een veelgenoemd doel is drie tot zes maanden vaste lasten.",
  },
  {
    term: "Potjesmethode",
    uitleg:
      "Je inkomen direct verdelen over aparte potjes (vaste lasten, dagelijks, sparen, vrij) zodat je per categorie ziet wat er is. Werkt omdat de grens zichtbaar is, geen dagelijks bijhouden nodig.",
    href: "/inzichten/potjesmethode-gezin-hoe-werkt-het",
    linkLabel: "Zo werkt het",
  },
  {
    term: "Modaal en boven-modaal",
    uitleg:
      "Het modaal inkomen is het meest voorkomende inkomen in Nederland, in 2026 rond de €48.000 bruto per jaar. Verdien je daarboven, dan ben je boven-modaal. Het zegt niets over hoeveel je overhoudt.",
    href: "/inzichten/is-4000-euro-netto-goed-salaris-nederland",
    linkLabel: "Is €4.000 netto een goed salaris?",
  },
  {
    term: "Netto en bruto",
    uitleg:
      "Bruto is je salaris vóór belasting; netto is wat er daadwerkelijk op je rekening komt. Voor je budget telt alleen netto. Een hoog brutobedrag zegt weinig over wat je maandelijks te besteden hebt.",
  },
  {
    term: "50/30/20-regel",
    uitleg:
      "Een budgetvuistregel: 50% van je netto-inkomen naar behoeften, 30% naar wensen, 20% naar sparen. Een prima startpunt, maar bij een hoger inkomen klopt de verdeling vaak niet meer.",
    href: "/inzichten/50-30-20-regel-hoger-inkomen",
    linkLabel: "Werkt het bij een hoger inkomen?",
  },
  {
    term: "Heffingskorting",
    uitleg:
      "Een korting op de belasting die je betaalt. Bij hogere inkomens worden deze kortingen afgebouwd, waardoor je van een salarisverhoging netto verrassend weinig overhoudt.",
    href: "/inzichten/salarisverhoging-boven-76000-weinig-netto",
    linkLabel: "Waarom opslag weinig oplevert",
  },
  {
    term: "Afschrijving",
    uitleg:
      "Het waardeverlies van iets duurzaams, zoals een auto. Het is een echte kostenpost, vaak de grootste van autobezit, maar je krijgt er nooit een maandelijkse rekening voor, dus hij wordt zwaar onderschat.",
    href: "/inzichten/auto-kopen-of-leasen-kosten-per-maand",
    linkLabel: "Wat kost een auto echt?",
  },
  {
    term: "Salderen",
    uitleg:
      "De stroom die je zonnepanelen terugleveren wegstrepen tegen je verbruik, zodat je er niet voor betaalt. Salderen kan nog tot eind 2026 en stopt daarna, wat de terugverdientijd van zonnepanelen verandert.",
    href: "/inzichten/zonnepanelen-terugverdientijd",
    linkLabel: "Zonnepanelen terugverdientijd",
  },
  {
    term: "Vakantiegeld",
    uitleg:
      "Geen bonus, maar uitgesteld loon: ongeveer 8% van je jaarsalaris dat je meestal in mei in één keer krijgt. Wie het volledig in de zomer uitgeeft, slaat vaak een gat in het najaar.",
    href: "/inzichten/wat-kost-een-zomervakantie-gezin",
    linkLabel: "Wat kost een zomervakantie?",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Woordenlijst | Waar blijft het",
  url: "https://www.waarblijfthet.nl/woordenlijst",
  hasDefinedTerm: TERMEN.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.uitleg,
  })),
};

export default function WoordenlijstPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />

      <main className="pt-16">
        <section className="bg-background pt-16 pb-8">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Woordenlijst</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl">
              Geldbegrippen in gewone taal
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed">
              Geen jargon, geen kleine lettertjes. De begrippen die je op deze
              site tegenkomt, kort en helder uitgelegd, met een link naar het
              artikel waar je verder leest.
            </p>
          </div>
        </section>

        <section className="bg-background pb-20">
          <div className="max-w-3xl mx-auto px-6 space-y-4">
            {TERMEN.map((t) => (
              <div
                key={t.term}
                id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="card-base border border-[#E8E0D0]"
              >
                <h2 className="font-display font-light text-primary text-xl mb-2">
                  {t.term}
                </h2>
                <p className="text-text-soft font-body font-light text-sm leading-relaxed">
                  {t.uitleg}
                </p>
                {t.href && (
                  <Link
                    href={t.href}
                    className="inline-block mt-3 font-body text-sm"
                    style={{ color: "#C4603A", textDecoration: "none" }}
                  >
                    {t.linkLabel} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="bg-dark-block py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">
              Begrippen helder? Tijd voor jouw cijfers.
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Doe de gratis analyse en zie waar jullie geld naartoe gaat,
              vergeleken met vergelijkbare gezinnen.
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
