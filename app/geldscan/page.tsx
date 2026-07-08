import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Geldscan: persoonlijk videoadvies zonder gesprek, €49",
  description:
    "Persoonlijke geldscan: je doet de gratis analyse, ik neem een video van 10 minuten voor je op met je drie grootste lekken en wat je eraan doet. Geen gesprek nodig. €49.",
  alternates: { canonical: "https://www.waarblijfthet.nl/geldscan" },
  openGraph: {
    title: "Geldscan: persoonlijk videoadvies zonder gesprek, €49",
    description:
      "Je doet de gratis analyse, ik neem een persoonlijke video van 10 minuten op met je drie grootste lekken. Geen gesprek, geen agenda. €49.",
    url: "https://www.waarblijfthet.nl/geldscan",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Wat is de geldscan precies?",
    antwoord:
      "Je doet de gratis analyse en stuurt die naar mij, optioneel met een paar recente bankafschriften. Binnen twee werkdagen krijg je een persoonlijke video van ongeveer 10 minuten waarin ik jouw drie grootste lekken laat zien en per lek vertel wat ik zou doen. Plus een korte samenvatting op schrift.",
  },
  {
    vraag: "Moet ik hiervoor met iemand praten of bellen?",
    antwoord:
      "Nee, en dat is precies het punt. Geen videogesprek, geen telefoontje, geen agenda-afstemming. Jij levert je cijfers aan wanneer het jou uitkomt, ik neem de video op, jij kijkt hem wanneer je wilt. Vragen achteraf kunnen gewoon per e-mail.",
  },
  {
    vraag: "Wat kost de geldscan?",
    antwoord:
      "€49, eenmalig. Je ontvangt na je aanmelding een betaalverzoek per e-mail. Geen abonnement, geen verplicht vervolg. Wil je daarna alsnog een gesprek of traject, dan trek ik de €49 af van de prijs daarvan.",
  },
  {
    vraag: "Is dit hetzelfde als het adviesgesprek?",
    antwoord:
      "Nee. Het adviesgesprek (€125) is een gesprek van 45 minuten waarin we samen doelen stellen en jij vragen kunt stellen. De geldscan is eenrichtingsverkeer: ik kijk naar jouw cijfers en vertel je wat ik zie. Minder diepgang, wel een persoonlijke en eerlijke blik, voor een lagere prijs en zonder gesprek.",
  },
  {
    vraag: "Moet ik bankafschriften delen?",
    antwoord:
      "Nee, dat is optioneel. De gratis analyse alleen is genoeg voor een goede scan. Stuur je wel een paar recente afschriften mee, dan kan ik preciezer zijn over waar het weglekt. Alles blijft vertrouwelijk en wordt na de scan verwijderd als je daarom vraagt.",
  },
  {
    vraag: "Is dit financieel advies in de zin van de Wft?",
    antwoord:
      "Nee. Ik geef geen advies over hypotheken, beleggingen of pensioenproducten en ben geen schuldhulp. De geldscan is een praktische, persoonlijke blik op je maandbudget: waar gaat het naartoe en waar kun je bijsturen.",
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

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Persoonlijke geldscan",
  name: "Geldscan, Waar blijft het",
  description:
    "Persoonlijk videoadvies over je maandbudget zonder gesprek: drie grootste lekken plus concrete stappen, binnen twee werkdagen. €49 eenmalig.",
  url: "https://www.waarblijfthet.nl/geldscan",
  areaServed: { "@type": "Country", name: "Nederland" },
  provider: {
    "@type": "Person",
    name: "Jarno Koopman",
    jobTitle: "Financieel coach",
    url: "https://www.waarblijfthet.nl/over",
  },
  offers: {
    "@type": "Offer",
    name: "Geldscan met persoonlijke video",
    price: "49",
    priceCurrency: "EUR",
    url: "https://www.waarblijfthet.nl/geldscan",
  },
};

const stappen = [
  {
    n: "1",
    titel: "Jij levert aan, wanneer het jou uitkomt",
    tekst:
      "Je doet de gratis analyse (5 minuten) en meldt je aan voor de scan. Optioneel stuur je een paar recente bankafschriften mee. Geen afspraak, geen agenda.",
  },
  {
    n: "2",
    titel: "Ik kijk persoonlijk naar jouw cijfers",
    tekst:
      "Geen automatisch rapport. Ik zet jouw cijfers naast huishoudens in jouw situatie en zoek de drie plekken waar het bij jou structureel weglekt.",
  },
  {
    n: "3",
    titel: "Binnen 2 werkdagen: jouw video",
    tekst:
      "Je krijgt een persoonlijke video van ongeveer 10 minuten plus een korte samenvatting op schrift. Terugkijken kan zo vaak je wilt. Vragen? Gewoon per e-mail.",
  },
];

export default function GeldscanPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-background pt-16 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Geldscan · persoonlijke video · €49</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl">
              Persoonlijk advies over jouw geld, zonder dat je met iemand hoeft te praten
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed mb-4">
              Wel een eerlijke, persoonlijke blik op waar jouw geld blijft.
              Geen gesprek, geen camera aan jouw kant, geen agenda. Jij stuurt
              je cijfers, ik stuur binnen twee werkdagen een video van 10
              minuten met je drie grootste lekken en wat ik eraan zou doen.
            </p>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed mb-8">
              Voor iedereen die wil weten wat er speelt, maar (nog) geen
              gesprek wil. Dat begrijp ik beter dan je denkt.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/aanbod/intake?pakket=geldscan" className="btn-primary">
                Vraag de geldscan aan (€49) →
              </Link>
              <Link
                href="/analyse"
                className="font-body text-sm hover:underline"
                style={{ color: "#C4603A", textDecoration: "none" }}
              >
                Eerst de gratis analyse doen →
              </Link>
            </div>
            <p className="font-body font-light text-text-muted text-xs mt-4">
              Binnen 2 werkdagen · Geen abonnement · €49 wordt verrekend als je later een gesprek of traject wilt
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
                    <span className="font-display font-medium text-primary text-xl">{s.n}</span>
                  </div>
                  <div>
                    <h2 className="font-display font-light text-primary text-xl mb-2">{s.titel}</h2>
                    <p className="font-body font-light text-sm text-text-soft leading-relaxed">{s.tekst}</p>
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
                ["Geen gesprek", "Jij hoeft niets uit te leggen of te verdedigen. Ik kijk, jij luistert wanneer je wilt."],
                ["Geen oordeel", "Ik benoem wat ik zie en wat werkt. Schaamte is nergens voor nodig, dit patroon zie ik overal."],
                ["Geen verplichting", "Eén scan, klaar. Wil je daarna meer, dan verreken ik de €49."],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="font-body font-medium text-primary text-sm mb-1">{t}</p>
                  <p className="font-body font-light text-text-soft text-xs leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Voor wie */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Voor wie is de geldscan?
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              Voor mensen die goed verdienen maar structureel te weinig
              overhouden, en die wel een eerlijk antwoord willen maar geen
              gesprek. Omdat het ongemakkelijk voelt om over geld te praten,
              omdat je agenda vol zit, of omdat je eerst wilt weten of dit
              iets voor je is voordat je €125 uitgeeft aan een{" "}
              <Link href="/adviesgesprek" className="hover:underline" style={{ color: "#C4603A" }}>
                adviesgesprek
              </Link>
              .
            </p>
            <p className="font-body font-light text-text-soft leading-relaxed">
              Heb je schulden of betalingsachterstanden? Dan is gratis hulp
              via je gemeente of Geldfit passender, en dat zeg ik liever
              eerlijk vooraf. Meer over hoe ik werk lees je op de pagina{" "}
              <Link href="/financieel-coach" className="hover:underline" style={{ color: "#C4603A" }}>
                financieel coach
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
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
              Weten waar het bij jou weglekt?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              €49, binnen twee werkdagen een persoonlijke video. Zonder
              gesprek, zonder oordeel.
            </p>
            <Link
              href="/aanbod/intake?pakket=geldscan"
              className="btn-primary"
              style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
            >
              Vraag de geldscan aan →
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
