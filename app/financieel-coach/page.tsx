import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financieel coach nodig? Online, eenmalig €125, geen traject",
  description:
    "Financieel coach voor wie goed verdient en toch weinig overhoudt. Online in heel Nederland. Analyse vooraf, eenmalig adviesgesprek van €125, geen abonnement.",
  alternates: { canonical: "https://www.waarblijfthet.nl/financieel-coach" },
  openGraph: {
    title: "Financieel coach nodig? Online, eenmalig €125, geen traject",
    description:
      "Financieel coach voor wie goed verdient en toch weinig overhoudt. Online in heel Nederland. Analyse vooraf, eenmalig gesprek van €125.",
    url: "https://www.waarblijfthet.nl/financieel-coach",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faq = [
  {
    vraag: "Wat doet een financieel coach?",
    antwoord:
      "Een financieel coach helpt je grip te krijgen op je maandelijkse geldzaken: waar je inkomen naartoe gaat, welke uitgaven structureel te hoog zijn en hoe je meer overhoudt. Anders dan een financieel adviseur verkoopt een coach geen producten en geeft geen advies over hypotheken of beleggingen. Het gaat om inzicht, structuur en concrete doelen voor je maandbudget.",
  },
  {
    vraag: "Wat kost een financieel coach?",
    antwoord:
      "In Nederland kost een financieel coach gemiddeld €60 tot €150 per uur, en een compleet traject al snel €250 tot €800. Bij mij werkt het anders: de analyse kost je niets, een eenmalig adviesgesprek van 45 minuten kost €125 en een persoonlijk traject van 3 maanden €497. Geen uurtje-factuurtje en geen abonnement.",
  },
  {
    vraag: "Wat is het verschil tussen een budgetcoach en een financieel coach?",
    antwoord:
      "Een budgetcoach helpt vooral mensen met geldproblemen of schulden: administratie op orde, betalingsachterstanden, rondkomen van een krap budget. Een financieel coach richt zich op mensen die genoeg verdienen maar toch weinig overhouden en meer grip willen. Heb je schulden, dan is een budgetcoach of kosteloze hulp via je gemeente passender.",
  },
  {
    vraag: "Wat is het verschil tussen een geldcoach en een financieel coach?",
    antwoord:
      "In de praktijk zijn dat twee namen voor hetzelfde: iemand die je helpt met inzicht en grip op je dagelijkse geldzaken. Beide termen zijn niet beschermd. Let daarom vooral op werkwijze en verdienmodel: een goede coach is transparant over tarieven en verkoopt geen financiële producten.",
  },
  {
    vraag: "Is een financieel coach hetzelfde als een financieel adviseur?",
    antwoord:
      "Nee. Een financieel adviseur met Wft-vergunning adviseert over producten zoals hypotheken, beleggingen en pensioenverzekeringen. Een financieel coach doet dat niet en hoeft die vergunning ook niet te hebben. Voor de vraag 'waarom houd ik niets over' heb je geen Wft-adviseur nodig, voor een hypotheek wel.",
  },
  {
    vraag: "Werkt financiële coaching ook online?",
    antwoord:
      "Ja. Ik werk volledig online via videogesprekken, voor heel Nederland. Je hoeft dus niet in de buurt te wonen. De analyse doe je zelf op je scherm, het adviesgesprek plannen we op een moment dat jou uitkomt.",
  },
  {
    vraag: "Ik heb schulden of betalingsachterstanden. Ben ik hier aan het juiste adres?",
    antwoord:
      "Nee, en dat zeg ik liever eerlijk vooraf. Bij schulden of achterstanden kun je gratis terecht bij je gemeente of via Geldfit. Mijn coaching is voor huishoudens die rond kunnen komen maar structureel minder overhouden dan zou moeten.",
  },
  {
    vraag: "Wat levert een financieel coach op?",
    antwoord:
      "Bij de huishoudens die ik tot nu toe begeleid heb, was het gemiddelde resultaat €460 per maand meer overhouden, zonder meer te verdienen. Dat is geen belofte, jouw uitkomst hangt af van je situatie. Eén gevonden structurele weglek verdient de €125 van een gesprek meestal al in de eerste maand terug.",
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
  serviceType: "Financiële coaching",
  name: "Financieel coach, Waar blijft het",
  description:
    "Financiële coaching voor huishoudens die goed verdienen maar structureel weinig overhouden. Analyse, eenmalig adviesgesprek van €125 en optioneel een traject van 3 maanden. Online, heel Nederland.",
  url: "https://www.waarblijfthet.nl/financieel-coach",
  areaServed: { "@type": "Country", name: "Nederland" },
  availableChannel: {
    "@type": "ServiceChannel",
    serviceUrl: "https://www.waarblijfthet.nl/adviesgesprek",
    name: "Online videogesprek",
  },
  provider: {
    "@type": "Person",
    name: "Jarno Koopman",
    jobTitle: "Financieel coach",
    url: "https://www.waarblijfthet.nl/over",
    image: "https://www.waarblijfthet.nl/jarno.jpg",
    sameAs: [
      "https://www.linkedin.com/in/jarnokoopman/",
      "https://www.instagram.com/koopmanjarno/",
    ],
  },
  offers: [
    {
      "@type": "Offer",
      name: "Analyse",
      price: "0",
      priceCurrency: "EUR",
      url: "https://www.waarblijfthet.nl/analyse",
    },
    {
      "@type": "Offer",
      name: "Eenmalig adviesgesprek (45 minuten)",
      price: "125",
      priceCurrency: "EUR",
      url: "https://www.waarblijfthet.nl/adviesgesprek",
    },
    {
      "@type": "Offer",
      name: "Persoonlijk traject (3 maanden)",
      price: "497",
      priceCurrency: "EUR",
      url: "https://www.waarblijfthet.nl/aanbod",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.waarblijfthet.nl" },
    { "@type": "ListItem", position: 2, name: "Financieel coach", item: "https://www.waarblijfthet.nl/financieel-coach" },
  ],
};

const stappen = [
  {
    n: "1",
    titel: "Analyse, 5 minuten",
    tekst:
      "Je vult vijf korte stappen in: woonsituatie, inkomen, woonlasten, vervoer en dagelijkse uitgaven. Schattingen zijn goed genoeg, geen bankkoppeling. Je ziet direct waar jouw uitgaven afwijken van vergelijkbare huishoudens.",
  },
  {
    n: "2",
    titel: "Eenmalig adviesgesprek, €125",
    tekst:
      "Wil je verder, dan kijken we in 45 minuten samen naar jouw cijfers en de twee grootste afwijkingen. Je krijgt 2 à 3 concrete doelen en een korte schriftelijke samenvatting. Geen traject, geen verplichting.",
  },
  {
    n: "3",
    titel: "Optioneel: traject van 3 maanden, €497",
    tekst:
      "Wil je begeleiding tot het systeem staat, dan is er een traject met een volledig plan, drie videocalls en tussentijds contact. Alleen als jij dat wilt, en ik doe maximaal 3 trajecten tegelijk.",
  },
];

export default function FinancieelCoachPage() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-background pt-16 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Financieel coach · online · heel Nederland</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl">
              Financieel coach voor wie goed verdient en toch krap zit
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed mb-4">
              Je hebt geen schulden en geen geldproblemen op papier. Toch is er
              aan het einde van de maand weinig over, en je weet niet precies
              waarom. Daar help ik bij: eerlijk inzicht in waar je geld naartoe
              gaat en concrete stappen om meer over te houden.
            </p>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed mb-8">
              Ik ben Jarno Koopman. Ik verkoop geen financiële producten en
              krijg geen provisie. Je betaalt alleen voor wat je nodig hebt.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/geldscan" className="btn-primary">
                Laat mij je cijfers nakijken (€49) →
              </Link>
              <Link
                href="/adviesgesprek"
                className="font-body text-sm hover:underline"
                style={{ color: "#0B7A6E", textDecoration: "none" }}
              >
                Direct naar het adviesgesprek (€125) →
              </Link>
            </div>
            <p className="font-body font-light text-text-muted text-xs mt-4">
              Geen account of bankkoppeling · Geen abonnement · Geen verkooppraat
            </p>
          </div>
        </section>

        {/* Wat doet een financieel coach */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Wat doet een financieel coach?
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              Een financieel coach helpt je grip te krijgen op je maandelijkse
              geldzaken: waar je inkomen naartoe gaat, welke uitgaven
              structureel te hoog zijn en hoe je meer overhoudt zonder meer te
              verdienen. Geen hypotheekadvies, geen beleggingen, geen
              schuldhulp. Wel: inzicht, structuur en doelen waar je meteen mee
              verder kunt.
            </p>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              Mijn aanpak is nuchter. Ik kijk met je mee naar je echte cijfers,
              vergelijk ze met huishoudens in jouw situatie en benoem de twee of
              drie plekken waar het bij jou structureel weglekt. Dat ligt
              zelden aan gek gedrag, bijna altijd aan structuur. Lees ook{" "}
              <Link href="/inzichten/wat-doet-een-financieel-adviseur" className="hover:underline" style={{ color: "#0B7A6E" }}>
                wanneer je een financieel adviseur nodig hebt
              </Link>{" "}
              en{" "}
              <Link href="/inzichten/verschil-budgetcoach-financieel-coach" className="hover:underline" style={{ color: "#0B7A6E" }}>
                het verschil met een budgetcoach
              </Link>
              .
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="card-base border border-[#E6E9E7]">
                <p className="font-body font-medium text-primary text-sm mb-2">Voor wie dit is</p>
                <ul className="space-y-2">
                  {[
                    "Je verdient modaal of meer, maar houdt structureel weinig over",
                    "Apps en spreadsheets geprobeerd, het beklijft niet",
                    "Gezin, stel of alleenstaand, ook met wisselend zzp-inkomen",
                    "Je wilt een eerlijke blik van buitenaf, geen oordeel",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span style={{ color: "#0B7A6E", fontWeight: 600 }}>✓</span>
                      <span className="font-body font-light text-sm text-text-soft leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-base border border-[#E6E9E7]">
                <p className="font-body font-medium text-primary text-sm mb-2">Voor wie dit niet is</p>
                <ul className="space-y-2">
                  {[
                    "Schulden of betalingsachterstanden: je gemeente of Geldfit helpt gratis",
                    "Hypotheek-, pensioen- of beleggingsadvies: daarvoor heb je een Wft-adviseur nodig",
                    "Op zoek naar snel rijk worden: dat verkoop ik niet",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span style={{ color: "#B03A2E", fontWeight: 600 }}>✗</span>
                      <span className="font-body font-light text-sm text-text-soft leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Zo werkt het */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Zo werkt financiële coaching bij mij
            </h2>
            <div className="space-y-5">
              {stappen.map((s) => (
                <div key={s.n} className="card-base border border-[#E6E9E7]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-light flex items-center justify-center shrink-0">
                      <span className="font-display font-medium text-primary text-xl">{s.n}</span>
                    </div>
                    <div>
                      <h3 className="font-display font-light text-primary text-xl mb-2">{s.titel}</h3>
                      <p className="font-body font-light text-sm text-text-soft leading-relaxed">{s.tekst}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tarieven */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Wat kost een financieel coach?
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-6">
              De meeste financieel coaches en budgetcoaches in Nederland rekenen
              €60 tot €150 per uur, en trajecten kosten al snel €250 tot €800.
              Ik houd het simpel en vooraf duidelijk:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #E6E9E7" }}>
                    <th className="text-left py-3 pr-4 font-medium text-primary">Vorm</th>
                    <th className="text-left py-3 pr-4 font-medium text-primary">Prijs</th>
                    <th className="text-left py-3 font-medium text-primary">Wat je krijgt</th>
                  </tr>
                </thead>
                <tbody className="font-light text-text-soft">
                  <tr style={{ borderBottom: "1px solid #E6E9E7" }}>
                    <td className="py-3 pr-4">Analyse</td>
                    <td className="py-3 pr-4">€0</td>
                    <td className="py-3">Direct inzicht in je grootste afwijkingen, op je scherm</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #E6E9E7" }}>
                    <td className="py-3 pr-4">Eenmalig adviesgesprek</td>
                    <td className="py-3 pr-4">€125 eenmalig</td>
                    <td className="py-3">45 minuten video, 2 à 3 concrete doelen, schriftelijke samenvatting</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">Persoonlijk traject</td>
                    <td className="py-3 pr-4">€497 eenmalig</td>
                    <td className="py-3">3 maanden begeleiding, volledig plan, 3 videocalls</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="font-body font-light text-text-soft leading-relaxed mt-6">
              Geen uurtarief, geen abonnement, geen verborgen vervolgstappen.
              Meer weten over tarieven in de markt? Lees{" "}
              <Link href="/inzichten/wat-kost-een-financieel-coach" className="hover:underline" style={{ color: "#0B7A6E" }}>
                wat een financieel coach kost in 2026
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Veelgestelde vragen over een financieel coach
            </h2>
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
              Eerst zien waar jouw geld blijft?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Begin met de analyse. Vijf minuten, resultaat direct op je
              scherm. Daarna bepaal jij of je een gesprek wilt.
            </p>
            <Link
              href="/analyse"
              className="btn-primary"
              style={{ backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" }}
            >
              Start de analyse →
            </Link>
            <p className="mt-5">
              <Link
                href="/adviesgesprek"
                className="font-body text-sm"
                style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}
              >
                Of plan direct een adviesgesprek van €125 →
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
