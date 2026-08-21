import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import { FinancieelCoachAccordion } from "./components/FinancieelCoachAccordion";

export const metadata: Metadata = {
  title: "Financieel coach nodig? Online, vanaf gratis, geen traject verplicht",
  description:
    "Financieel coach voor wie goed verdient en toch weinig overhoudt. Doe eerst de gratis analyse, kies daarna zelf voor een geldrapport van €49 of een adviesgesprek. Online, heel Nederland.",
  alternates: { canonical: "https://www.waarblijfthet.nl/financieel-coach" },
  openGraph: {
    title: "Financieel coach nodig? Online, vanaf gratis, geen traject verplicht",
    description:
      "Financieel coach voor wie goed verdient en toch weinig overhoudt. Doe eerst de gratis analyse, kies daarna zelf een vervolgstap.",
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
      "In Nederland kost een financieel coach gemiddeld €60 tot €150 per uur, en een compleet traject al snel €250 tot €800. Bij mij werkt het anders: de analyse kost je niets, een geldrapport over jouw cijfers €49 eenmalig, een adviesgesprek van 45 minuten €125 eenmalig en een persoonlijk traject van 3 maanden €497. Geen uurtje-factuurtje en geen abonnement.",
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
    vraag: "Kan mijn boekhouder dit ook, of heb ik daarvoor een financieel coach nodig?",
    antwoord:
      "Een boekhouder verwerkt je cijfers achteraf: aangiftes, jaarstukken, administratie. Ik kijk vooruit naar je maandelijkse geldstroom, waar het naartoe gaat en wat je kunt bijsturen. Ik doe geen administratie en geen belastingaangifte, en ik ben ook geen therapeut: speelt geld bij jullie vooral als relatie-onderwerp, dan verwijs ik liever door. Wat ik wel doe: meekijken naar de cijfers die verder niemand voor je bekijkt.",
  },
  {
    vraag: "Is een financieel coach hetzelfde als een financieel adviseur?",
    antwoord:
      "Nee. Een financieel adviseur met Wft-vergunning adviseert over producten zoals hypotheken, beleggingen en pensioenverzekeringen. Een financieel coach doet dat niet en hoeft die vergunning ook niet te hebben. Voor de vraag waarom je niets overhoudt heb je geen Wft-adviseur nodig, voor een hypotheek wel.",
  },
  {
    vraag: "Werkt financiële coaching ook online?",
    antwoord:
      "Ja. Ik werk volledig online via videogesprekken, voor heel Nederland. Je hoeft dus niet in de buurt te wonen. De analyse doe je zelf op je scherm, een adviesgesprek plannen we op een moment dat jou uitkomt.",
  },
  {
    vraag: "Ik heb schulden of betalingsachterstanden. Ben ik hier aan het juiste adres?",
    antwoord:
      "Nee, en dat zeg ik liever eerlijk vooraf. Bij schulden of achterstanden kun je gratis terecht bij je gemeente of via Geldfit. Mijn coaching is voor huishoudens die rond kunnen komen maar structureel minder overhouden dan zou moeten.",
  },
  {
    vraag: "Wat levert een financieel coach op?",
    antwoord:
      `Dat verschilt per huishouden. Op deze site staan vijf echte geldrapporten met de evaluatie van de klant erbij: bij één huishouden bleef na drie maanden ongeveer €850 per maand structureel staan, bij een ander groeide de buffer met €500 per maand, en bij ${AANTAL_ZONDER_LEK} van de vijf was de conclusie dat er niets te repareren viel. Ik publiceer geen gemiddelde over vijf huishoudens, want dat is geen cijfer maar een indruk.`,
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
    "Financiële coaching voor huishoudens die goed verdienen maar structureel weinig overhouden. Gratis analyse, geldrapport van €49, eenmalig adviesgesprek van €125 en optioneel een traject van 3 maanden. Online, heel Nederland.",
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
      name: "Geldrapport",
      price: "49",
      priceCurrency: "EUR",
      url: "https://www.waarblijfthet.nl/geldscan",
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

// De drie vragen die het duidelijkst maken bij wie je moet zijn, niet als
// aanval op andere vakgebieden maar als positionering: waar begint mijn werk.
const vergelijking = [
  { vraag: "Waar blijft mijn geld?", wie: "Waar blijft het" },
  { vraag: "Hoe krijg ik mijn administratie op orde?", wie: "Boekhouder of budgetcoach" },
  { vraag: "Hoeveel kan ik lenen?", wie: "Hypotheekadviseur" },
  { vraag: "Wat moet ik met mijn vermogen doen?", wie: "Financieel adviseur" },
];

// Drie van de vijf echte rapporten, als bewijs in plaats van uitleg.
const bewijsSlugs = ["tweeverdieners-drie-kinderen", "stel-zonder-kinderen", "alleenstaand-huurwoning"];
const bewijsRapporten = RAPPORTEN.filter((r) => bewijsSlugs.includes(r.slug));

const tarieven = [
  { naam: "Analyse", prijs: "€0", wat: "Direct zien waar je afwijkt, op je scherm, geen gesprek nodig" },
  { naam: "Geldrapport", prijs: "€49 eenmalig", wat: "Ik schrijf op waarom je afwijkt en wat ik zou doen" },
  { naam: "Adviesgesprek", prijs: "€125 eenmalig", wat: "45 minuten video, samen bepalen wat je ermee doet" },
  { naam: "Persoonlijk traject", prijs: "€497 eenmalig", wat: "3 maanden begeleiding tot de nieuwe structuur staat" },
];

export default function FinancieelCoachPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Header />

      <main>
        {/* Hero: positionering meteen duidelijk, gratis analyse als primaire CTA */}
        <section className="bg-background pt-14 pb-10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
              <div>
                <p className="section-eyebrow mb-4">Financieel coach · online · heel Nederland</p>
                <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-5 leading-tight">
                  Goed verdienen. Toch weinig over?
                </h1>
                <p className="text-text-soft font-body font-light text-lg leading-relaxed mb-3">
                  Je hebt geen schulden en je komt rond. Toch houd je structureel minder over
                  dan je verwacht, en je weet niet precies waarom.
                </p>
                <p className="text-text-soft font-body font-light text-lg leading-relaxed mb-8">
                  Ik kijk naar je volledige huishoudfinanciën en zoek uit wat er werkelijk
                  gebeurt. Geen financiële producten, geen provisie, geen oordeel en geen
                  standaard bespaartips.
                </p>
                <Link href="/analyse" className="btn-primary">
                  Doe de gratis analyse →
                </Link>
                <p className="mt-3 mb-0">
                  <Link
                    href="/geldscan"
                    className="font-body text-sm hover:underline"
                    style={{ color: "#0B7A6E", textDecoration: "none" }}
                  >
                    Wil je na de analyse weten waarom jouw situatie zo uitpakt? Bekijk de Geldscan →
                  </Link>
                </p>
                <p className="font-body font-light text-text-muted text-xs mt-4">
                  5 minuten · geen account · geen bankkoppeling · direct resultaat
                </p>
              </div>

              {/* Bestaand bewijs als rustig visueel element, geen decoratie */}
              {bewijsRapporten[0] && (
                <div className="card-base border border-[#E6E9E7] hidden lg:block" style={{ borderLeft: "3px solid #0B7A6E" }}>
                  <p className="section-eyebrow mb-2">Uit een echt geldrapport</p>
                  <p className="font-body font-light text-text-muted text-xs mb-3">
                    {bewijsRapporten[0].kenmerken.join(" · ")}
                  </p>
                  <p className="font-display font-light text-primary text-lg mb-2 leading-snug">
                    {bewijsRapporten[0].verhaalTitel}
                  </p>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed mb-4">
                    {bewijsRapporten[0].uitkomst}
                  </p>
                  <Link href="/rapporten" className="font-body text-sm font-medium hover:underline" style={{ color: "#0B7A6E" }}>
                    Lees dit rapport en vier anderen →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Voor wie dit is / niet is: direct scanbaar */}
        <section className="bg-card py-12">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Dit is voor jou als...
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="card-base border border-[#E6E9E7]">
                <ul className="space-y-2.5">
                  {[
                    "Je goed verdient, maar structureel weinig overhoudt",
                    "Je je financiën zelf al probeert te volgen, maar geen duidelijk antwoord krijgt",
                    "Je wilt weten wat normaal is voor een huishouden zoals het jouwe",
                    "Je een eerlijke blik van buitenaf wilt, zonder oordeel",
                    "Je gezin, stel, alleenstaand of zzp'er bent",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span style={{ color: "#0B7A6E", fontWeight: 600 }}>✓</span>
                      <span className="font-body font-light text-sm text-text-soft leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-base border border-[#E6E9E7]">
                <p className="font-body font-medium text-primary text-sm mb-3">Niet voor jou als je zoekt naar</p>
                <ul className="space-y-2.5">
                  {[
                    "Schulden of betalingsachterstanden: je gemeente of Geldfit helpt gratis",
                    "Hypotheek-, pensioen- of beleggingsadvies: daarvoor heb je een Wft-adviseur nodig",
                    "Een manier om zo zuinig mogelijk te leven: ik reken uit waar het geld heen gaat, niet hoe je minder uitgeeft",
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

        {/* Eerst zelf zien wat er aan de hand is: gratis analyse als startpunt */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Eerst zelf zien wat er aan de hand is
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-3">
              Je hoeft niet meteen een coach in te schakelen. De gratis analyse kost ongeveer
              vijf minuten en laat direct zien waar jouw huishouden afwijkt van vergelijkbare
              huishoudens.
            </p>
            <p className="font-body font-light text-text-muted text-sm leading-relaxed mb-6">
              Geen account, geen bankkoppeling, geen verplicht gesprek.
            </p>
            <Link href="/analyse" className="btn-primary">
              Doe de gratis analyse →
            </Link>
          </div>
        </section>

        {/* Positionering: waar mijn werk begint tov andere professionals */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-3">
              Wat doet een financieel coach?
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-6">
              Mijn werk begint bij de vraag waar anderen vaak stoppen met kijken: wat gebeurt
              er iedere maand daadwerkelijk met het geld van dit huishouden?
            </p>
            <div className="space-y-2 mb-6">
              {vergelijking.map((v) => (
                <div
                  key={v.vraag}
                  className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 px-4 rounded-xl"
                  style={{ backgroundColor: v.wie === "Waar blijft het" ? "#E7F1EE" : "#F7F8F7" }}
                >
                  <span className="font-body font-light text-sm text-text-soft flex-1">{v.vraag}</span>
                  <span
                    className="font-body text-sm"
                    style={{
                      color: v.wie === "Waar blijft het" ? "#0B7A6E" : "#4A5A56",
                      fontWeight: v.wie === "Waar blijft het" ? 600 : 400,
                    }}
                  >
                    {v.wie}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-body font-light text-text-soft leading-relaxed mb-4">
              Een financieel coach helpt je grip te krijgen op je maandelijkse geldzaken: waar
              je inkomen naartoe gaat, welke uitgaven structureel te hoog zijn en hoe je meer
              overhoudt zonder meer te verdienen. Geen hypotheekadvies, geen beleggingen, geen
              schuldhulp.
            </p>
            <p className="font-body font-light text-text-soft leading-relaxed">
              Ik benoem wat mij opvalt en maak onderscheid tussen echte financiële afwijkingen
              en uitgaven die misschien hoog lijken, maar voor jouw situatie logisch zijn. Valt
              er niets te repareren, dan staat dat er ook. Lees ook{" "}
              <Link href="/inzichten/wat-doet-een-financieel-adviseur" className="hover:underline" style={{ color: "#0B7A6E" }}>
                wanneer je een financieel adviseur nodig hebt
              </Link>{" "}
              en{" "}
              <Link href="/inzichten/verschil-budgetcoach-financieel-coach" className="hover:underline" style={{ color: "#0B7A6E" }}>
                het verschil met een budgetcoach
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Gratis analyse versus geldrapport */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
              Van gratis inzicht naar een verklaring
            </h2>
            <p className="font-body font-light text-text-soft text-sm leading-relaxed mb-8">
              De gratis analyse vertelt je dát er een verschil is. Het geldrapport zoekt uit
              waarom.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="card-base border border-[#E6E9E7]">
                <p className="section-eyebrow mb-3">Gratis analyse</p>
                <p className="font-body font-medium text-primary text-sm mb-3">Je ontdekt</p>
                <ul className="space-y-2 mb-2">
                  {[
                    "wat je ongeveer zou moeten overhouden",
                    "waar je afwijkt",
                    "welke categorieën eruit springen",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span style={{ color: "#0B7A6E", fontWeight: 600 }}>✓</span>
                      <span className="font-body font-light text-sm text-text-soft leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 p-6 bg-white" style={{ borderColor: "#0B7A6E" }}>
                <p className="section-eyebrow mb-3">Geldrapport · €49</p>
                <p className="font-body font-medium text-primary text-sm mb-3">Ik kijk zelf naar</p>
                <ul className="space-y-2 mb-5">
                  {[
                    "waarom je afwijkt",
                    "wat werkelijk een probleem is, en wat niet",
                    "waar structurele ruimte zit",
                    "wat ik als eerste zou veranderen",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2">
                      <span style={{ color: "#0B7A6E", fontWeight: 600 }}>✓</span>
                      <span className="font-body font-light text-sm text-text-soft leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/geldscan"
                  className="font-body text-sm font-medium hover:underline"
                  style={{ color: "#0B7A6E", textDecoration: "none" }}
                >
                  Bekijk de Geldscan →
                </Link>
              </div>
            </div>
            <p className="font-body font-light text-text-muted text-xs leading-relaxed mt-6 text-center">
              Je hoeft niet meteen te weten wat je nodig hebt. Gratis → Geldscan €49 → Adviesgesprek €125 → optioneel traject €497.
            </p>
          </div>
        </section>

        {/* Bewijs: echte rapporten */}
        <section className="bg-card py-14">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
              Wat levert zo'n analyse op?
            </h2>
            <p className="font-body font-light text-text-soft text-sm leading-relaxed mb-8">
              Geen voorbeeld, maar echte rapporten. Namen zijn weggelaten, de bedragen zijn
              onveranderd.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {bewijsRapporten.map((r) => (
                <Link
                  key={r.slug}
                  href={`/rapporten/${r.slug}`}
                  className="card-base border border-[#E6E9E7] block hover:border-[#0B7A6E] transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  <p className="section-eyebrow mb-2">{r.chip}</p>
                  <p className="font-display font-light text-primary text-base mb-2 leading-snug">
                    {r.verhaalTitel}
                  </p>
                  <p className="font-body font-light text-text-soft text-xs leading-relaxed">
                    {r.uitkomstKop}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/rapporten"
                className="font-body inline-flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-medium"
                style={{ borderColor: "#0B7A6E", color: "#0B7A6E", textDecoration: "none" }}
              >
                Bekijk alle rapporten →
              </Link>
            </div>
          </div>
        </section>

        {/* Adviesgesprek, als vervolgstap na het rapport */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Wil je niet alleen lezen, maar samen bepalen wat je ermee doet?
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-2">
              Dan is er het adviesgesprek: 45 minuten via video, 2 tot 3 concrete doelen en een
              schriftelijke samenvatting om ook met je partner te lezen.
            </p>
            <p className="font-body font-light text-text-muted text-sm leading-relaxed mb-6">
              €125 eenmalig · 45 minuten · geen verplicht vervolg
            </p>
            <Link
              href="/adviesgesprek"
              className="font-body inline-flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-medium"
              style={{ borderColor: "#0B7A6E", color: "#0B7A6E", textDecoration: "none" }}
            >
              Plan een adviesgesprek →
            </Link>
          </div>
        </section>

        {/* SEO verdieping */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Wat kost een financieel coach?
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-6">
              De meeste financieel coaches en budgetcoaches in Nederland rekenen €60 tot €150
              per uur, en trajecten kosten al snel €250 tot €800. Ik houd het simpel en vooraf
              duidelijk:
            </p>
            <div className="space-y-2 mb-6">
              {tarieven.map((t) => (
                <div key={t.naam} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3 px-4 rounded-xl bg-background">
                  <span className="font-body font-medium text-primary text-sm w-full sm:w-40 shrink-0">{t.naam}</span>
                  <span className="font-body font-medium text-sm shrink-0 w-24" style={{ color: "#0B7A6E" }}>{t.prijs}</span>
                  <span className="font-body font-light text-sm text-text-soft leading-relaxed">{t.wat}</span>
                </div>
              ))}
            </div>
            <p className="font-body font-light text-text-soft leading-relaxed mb-10">
              Geen uurtarief, geen abonnement, geen verborgen vervolgstappen. Meer weten over
              tarieven in de markt? Lees{" "}
              <Link href="/inzichten/wat-kost-een-financieel-coach" className="hover:underline" style={{ color: "#0B7A6E" }}>
                wat een financieel coach kost in 2026
              </Link>
              .
            </p>

            <h3 className="font-display font-light text-primary text-xl mb-3">
              Werkt financiële coaching ook online?
            </h3>
            <p className="font-body font-light text-text-soft leading-relaxed mb-8">
              Ja. Ik werk volledig online via videogesprekken, voor heel Nederland. Je hoeft
              dus niet in de buurt te wonen. De analyse doe je zelf op je scherm, een gesprek
              plannen we op een moment dat jou uitkomt.
            </p>

            <h3 className="font-display font-light text-primary text-xl mb-3">
              Heb je schulden of betalingsachterstanden?
            </h3>
            <p className="font-body font-light text-text-soft leading-relaxed mb-8">
              Dan ben je hier niet aan het juiste adres, en dat zeg ik liever eerlijk vooraf.
              Bij schulden of achterstanden kun je gratis terecht bij je gemeente of via
              Geldfit. Mijn coaching is voor huishoudens die rond kunnen komen maar structureel
              minder overhouden dan zou moeten.
            </p>

            <h3 className="font-display font-light text-primary text-xl mb-3">
              En als een rapport niet genoeg is
            </h3>
            <p className="font-body font-light text-text-soft leading-relaxed">
              Soms past een traject beter dan een los rapport of gesprek: drie maanden
              begeleiding, een volledig plan en meekijken tot het systeem staat. Dat kost €497
              eenmalig en is een bewuste, optionele laatste stap, geen verplicht vervolg. Mail
              gerust naar{" "}
              <a href="mailto:hallo@waarblijfthet.nl" className="hover:underline" style={{ color: "#0B7A6E" }}>
                hallo@waarblijfthet.nl
              </a>{" "}
              als je denkt dat dit bij jou past.
            </p>
          </div>
        </section>

        {/* FAQ als accordion */}
        <section className="bg-background py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Veelgestelde vragen over een financieel coach
            </h2>
            <div className="card-base border border-[#E6E9E7]">
              <FinancieelCoachAccordion vragen={faq} defaultOpenIndex={0} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark-block py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">
              Benieuwd waar jouw geld blijft?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Eerst ontdekken wat er bij jou gebeurt. Daarna beslis je of je wilt weten waarom. Vijf minuten, geen account, geen bankkoppeling.
            </p>
            <Link
              href="/analyse"
              className="btn-primary"
              style={{ backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" }}
            >
              Doe de gratis analyse →
            </Link>
            <p className="mt-5">
              <Link
                href="/geldscan"
                className="font-body text-sm"
                style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}
              >
                Wil je na de analyse weten waarom jouw situatie zo uitpakt? Bekijk de Geldscan van €49 →
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
