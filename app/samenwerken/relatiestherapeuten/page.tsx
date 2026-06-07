import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samenwerken · voor relatiestherapeuten | Waar blijft het",
  description:
    "Veel koppels in therapie vechten over geld, maar de financiën lost een relatietherapie niet op. Waar blijft het pakt het gelddeel aan, zodat jij je kunt focussen op de relatie.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken/relatiestherapeuten" },
  openGraph: {
    title: "Samenwerken met Waar blijft het · voor relatiestherapeuten",
    description:
      "Koppels die bij jou komen vechtend over geld. Wij pakken de financiën aan, jij pakt de relatie aan.",
    url: "https://www.waarblijfthet.nl/samenwerken/relatiestherapeuten",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Wat doet Waar blijft het precies voor het koppel?",
    antwoord:
      "We brengen het maandbudget in kaart, benoemen de twee of drie plekken waar geld wegvloeit zonder dat ze het doorhebben, en geven concrete stappen. Geen beleggingsadvies, geen schuldhulp, gewoon grip op de maandelijkse cashflow.",
  },
  {
    vraag: "Hoe werkt het verwijzen concreet?",
    antwoord:
      "Je stuurt het koppel door met een korte toelichting. Ze starten zelf met de gratis analyse op de site. Wij nemen het financiële deel over, jullie therapiegesprekken kunnen zich daarna richten op de relatie zelf.",
  },
  {
    vraag: "Is er een financiële vergoeding voor de verwijzing?",
    antwoord:
      "Nee. We geloven in een eerlijk, onafhankelijk model. Geen affiliate-constructies, wel een betrouwbare schakel in jouw netwerk.",
  },
  {
    vraag: "Wil ik meer weten voordat ik doorverwijs?",
    antwoord:
      "Stuur een mail naar hallo@waarblijfthet.nl. Dan plannen we een kort kennismakingsgesprek, gewoon om te kijken of we passen.",
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
    titel: "Geld is de aanleiding, maar niet het echte probleem",
    tekst:
      "Je ziet het keer op keer: een koppel zit bij je vanwege communicatieproblemen of verwijdering, maar onder het oppervlak zit een financiële spanning die al maanden sluimert. Wie betaalt wat? Waarom holt het geld altijd op? Wie heeft de controle? De emoties zijn echt, maar de trigger is een onopgelost praktisch probleem.",
  },
  {
    titel: "Ze verdienen samen genoeg, maar voelen zich toch krap",
    tekst:
      "Veel koppels in jouw praktijk zijn tweeverdieners met een modaal of bovenmodaal gezinsinkomen. Geen schulden, geen armoede, en tóch chronisch krap. Dat onbegrip ('hoe kan dit?') voegt frustratie toe aan de relatiestress. Zolang niemand dat gelddeel aanpakt, circuleer je als therapeut in een lus.",
  },
  {
    titel: "Jij bent er niet voor de financiën, en dat is precies het probleem",
    tekst:
      "Als relatietherapeut of koppelcoach help je met communicatie, patronen en emoties. Maar je bent geen financieel coach. Als het geld de trigger is en niemand dat oplost, staat de relatietherapie altijd onder druk van iets wat buiten jouw expertise valt.",
  },
];

export default function RelatietherapeutenPage() {
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
            <p className="section-eyebrow mb-4">Voor relatiestherapeuten &amp; koppelcoaches</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl leading-tight">
              Je koppel vecht over geld.<br />
              Wij lossen het gelddeel op.
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-2xl">
              Veel koppels die bij jou komen hebben een onopgelost financieel probleem als
              onderliggende trigger. Jij werkt aan de relatie, wij pakken de maandbudgetten
              aan, zodat jullie therapiegesprekken over de relatie kunnen gaan in plaats van
              over wie de rekeningen betaalt.
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
              Wat wij doen, en wat dat voor jou oplevert
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Waar blijft het is een financiële coaching voor gezinnen en stellen die goed
              verdienen maar toch krap zitten. We brengen het maandbudget helder in kaart —
              zonder oordeel, zonder jargon, en geven concrete stappen. Het zijn geen grote
              besparingen op boodschappen, maar inzicht in waar het geld structureel naartoe
              gaat.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-5">
              Als jouw cliënten dit stuk oplossen, verandert de sfeer in de therapiesessie.
              Ze komen niet meer met een concrete financiële griep, ze komen voor de relatie.
              Dat is waar jij goed in bent.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {[
                ["Gratis analyse", "Zij starten laagdrempelig. Geen verplichting voor hen of jou."],
                ["Eenmalig gesprek", "€125 voor 45 minuten, concreet en behapbaar."],
                ["Geen schuldhulp", "Voor stellen die genoeg verdienen maar grip missen."],
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
                ["1", "Vertel je cliënten over ons", "Je noemt Waar blijft het als het financiële stuk ter sprake komt. Meer hoeft het niet te zijn."],
                ["2", "Ze doen de gratis analyse", "Op waarblijfthet.nl. Vijf minuten. Ze zien direct wat er speelt, dat is vaak al een eye-opener."],
                ["3", "Wij nemen het over", "Eventueel volgt een adviesgesprek of traject. Jij blijft gewoon hun therapeut, wij zijn complementair, niet concurrerend."],
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
              Wil je weten of we passen als schakel in jouw praktijk? Stuur een korte mail —
              dan plannen we een kennismakingsgesprek van 20 minuten.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking%20als%20relatietherapeut"
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
