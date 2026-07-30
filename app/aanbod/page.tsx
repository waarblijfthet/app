import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AanbodAccordion } from "./components/AanbodAccordion";
import { PAKKET_INFO } from "@/lib/aanbod-content";
import { TrackClick } from "@/components/TrackClick";

export const metadata: Metadata = {
  title: "Tarieven: geldrapport, gesprek en traject",
  description:
    "Ik schrijf een persoonlijk geldrapport over jouw cijfers, met de drie dingen die het meest opvallen en wat juist niet. 49 euro, eenmalig. Twee complete voorbeeldrapporten staan op de site, dus je weet wat je koopt voordat je betaalt.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.waarblijfthet.nl/aanbod" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Financiële begeleiding voor gezinnen",
  provider: {
    "@type": "Person",
    name: "Jarno Koopman",
    url: "https://www.waarblijfthet.nl",
  },
  serviceType: "Financiële coaching",
  areaServed: "NL",
};

const faq = [
  {
    vraag: "Is dit hetzelfde als een budgetcoach of schuldhulp?",
    antwoord:
      "Nee. Schuldhulp en de meeste budgetcoaches werken met mensen die betalingsproblemen of schulden hebben. Ik werk met huishoudens die alles op tijd betalen, niets geks doen en toch structureel niets overhouden. Betaal je alles netjes op tijd maar snap je niet waarom er niets overblijft, dan zit je in de groep waarvoor ik werk.",
  },
  {
    vraag: "Ik heb geen schulden maar ook geen spaargeld. Is dit dan iets voor mij?",
    antwoord:
      "Ja, dat is de situatie waar ik voor ben. Geen crisis en ook geen rust. Wat ik doe is uitzoeken waar het naartoe gaat en dat opschrijven met de reden erbij. Of het daarna verandert, hangt af van wat je met dat rapport doet, en dat kan ik niet voor je beloven.",
  },
  {
    vraag: "Wat kost het, en waarom kost een kwartier bellen dan niets?",
    antwoord:
      "Het geldrapport kost 49 euro, eenmalig. Een kwartier kennismaken kost niets. Dat verschil zit niet in mijn goedheid maar in wat er gebeurt: in dat kwartier leg ik uit hoe ik werk en kijk ik niet naar jouw cijfers. Zodra het over jouw eigen bedragen gaat, is het werk, en werk breng ik in rekening. Dat is ook precies de grens die de wet trekt.",
  },
  {
    vraag: "Mag ik zien wat ik koop voordat ik betaal?",
    antwoord:
      "Ja, en dat vind ik ook niet meer dan normaal. Op de voorbeeldpagina staan twee complete rapporten in de vorm waarin ik ze schrijf. Die twee huishoudens heb ik zelf bedacht, inclusief de bedragen, omdat ik geen klantcijfers publiceer zonder toestemming. Dat staat er ook boven en onder.",
  },
  {
    vraag: "Geef je advies over beleggen, hypotheken of pensioen?",
    antwoord:
      "Nee. Ik kijk naar wat er maandelijks binnenkomt en waar het heen gaat. Over financiële producten geef ik geen advies en ik noem ook geen aanbieders. Wil je dat wel, dan heb je iemand met een vergunning nodig.",
  },
  {
    vraag: "Ben je gecertificeerd financieel adviseur?",
    antwoord:
      "Nee. Ik ben geen gecertificeerd financieel adviseur en ik val niet onder de AFM-vergunningplicht, omdat ik niet over financiële producten adviseer. Wat ik doe is rekenen en opschrijven: waar gaat het heen, wat valt er uit de toon en wat zou ik eraan doen. Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte. Dat is de reden dat ik dit doe.",
  },
  {
    vraag: "Wat gebeurt er met mijn gegevens?",
    antwoord:
      "Je vult de analyse in en stuurt optioneel een paar recente bankafschriften mee. Daarin mag je alles wegstrepen wat er voor mij niet toe doet: rekeningnummers, namen van andere mensen en betalingen die over iemand anders gaan. Ik heb de bedragen en de soort uitgave nodig, niet bij wie je hebt gepind. Ik ben de enige die ze inziet. Het rapport komt als PDF per e-mail, alleen naar jou. Direct na het versturen verwijder ik je afschriften en je analysegegevens. Je hoeft daar niet om te vragen en er blijft niets bewaard.",
  },
  {
    vraag: "Wat als er bij mij niets uit komt?",
    antwoord:
      "Dat kan gebeuren en dan zeg ik dat. Ik beloof niet dat er geld te vinden is. Vaker is de uitkomst dat je zwart op wit ziet dat het klopt, of dat het bedrag dat ontbreekt veel kleiner is dan het voelde. In de twee voorbeeldrapporten op deze site is dat 64 euro per maand bij het ene huishouden en 118 bij het andere.",
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

const details = [
  {
    id: "geldscan",
    pakket: "geldscan" as const,
    bg: "#F7F8F7",
    cardBg: "#FFFFFF",
    eyebrow: "Zonder gesprek · €49 eenmalig",
    titel: "Geldscan: jouw persoonlijke geldrapport",
    intro:
      "Jij levert je cijfers aan wanneer het uitkomt, ik schrijf op wat ik zie en wat ik zou doen. Zonder gesprek of agenda.",
    primaireHref: "/aanbod/intake?pakket=geldscan",
    primaireLabel: "Vraag de geldscan aan",
    secundaireHref: "/geldscan",
    secundaireLabel: "Alles over de geldscan",
  },
];

export default function AanbodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero met ingetogen Jarno-kaartje */}
        <section className="px-6 pb-14 pt-20" style={{ backgroundColor: "#F7F8F7" }}>
          <div className="mx-auto max-w-[860px]">
            <p
              className="font-body mb-4 text-xs font-medium uppercase tracking-widest"
              style={{ color: "#0B7A6E" }}
            >
              Tarieven
            </p>
            <h1
              className="font-display font-light text-[#16211F]"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.2, marginBottom: "1.25rem" }}
            >
              Goed verdienen en toch te weinig overhouden. Dat lost zich niet vanzelf op.
            </h1>
            <p
              className="font-body max-w-[600px] font-light leading-relaxed"
              style={{ fontSize: "1.05rem", color: "#4A5A56" }}
            >
              Ik kijk naar de cijfers van huishoudens die goed verdienen en toch elke maand krap zitten, en ik schrijf op wat ik zie. Geen cursus, geen abonnement, geen beleggingsverhaal. Mijn tarieven staan hieronder en twee complete voorbeeldrapporten staan op deze site, dus je weet wat je koopt voordat je betaalt.
            </p>
            <p className="font-body mt-4 text-sm" style={{ color: "#8B958F" }}>
              <Link href="/voorbeeldrapport" className="hover:underline" style={{ color: "#0B7A6E", textDecoration: "none" }}>
                Bekijk een compleet voorbeeldrapport →
              </Link>
            </p>

            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-[#E6E9E7] bg-white p-5 sm:items-center">
              <div
                className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full"
                style={{ backgroundColor: "#16211F" }}
              >
                <Image
                  src="/jarno.jpg"
                  alt="Jarno Koopman"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="font-body text-sm font-light leading-relaxed text-[#4A5A56]">
                <span className="font-medium text-[#16211F]">Ik ben Jarno.</span>{" "}
                Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte. Dit doe ik naast mijn baan, voor mensen die dat patroon herkennen. Ik ben geen gecertificeerd adviseur en ik verkoop geen financiële producten.{" "}
                <Link
                  href="/over"
                  className="whitespace-nowrap hover:underline"
                  style={{ color: "#0B7A6E", textDecoration: "none" }}
                >
                  Meer over mij →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Ik doe één ding */}
        <section className="px-6 py-14" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display mb-5 text-2xl font-light text-[#16211F] sm:text-3xl">
              Ik doe één ding
            </h2>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Ik kijk naar de cijfers van huishoudens in loondienst die goed verdienen en toch elke maand krap zitten, en ik schrijf op wat ik zie. Je krijgt een rapport dat ik met de hand schrijf, over jouw bedragen, met de drie dingen die het meest opvallen en per stuk wat ik zou doen. Geen sjabloon, geen algoritme, geen traject dat je vooraf moet kopen.
            </p>
            <p className="font-body max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Twee complete voorbeelden van zo&apos;n rapport staan op deze site. Die twee huishoudens heb ik zelf bedacht, inclusief de bedragen, omdat ik geen cijfers van een klant publiceer zonder toestemming. Dat is minder sterk dan een echt rapport en daarom zeg ik het er zelf bij. Zodra een klant toestemming geeft, komt er een geanonimiseerd rapport van een echt huishouden bij te staan.
            </p>
          </div>
        </section>

        {/* Vergelijken of verklaren: twee routes */}
        <section className="px-6 py-14" style={{ backgroundColor: "#F7F8F7" }}>
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display mb-2 text-2xl font-light text-[#16211F] sm:text-3xl">
              Vergelijken of verklaren
            </h2>
            <p className="font-body mb-10 max-w-[600px] text-sm font-light leading-relaxed text-[#4A5A56]">
              Er zijn twee dingen die je hier kunt doen en ze beantwoorden een andere vraag. Het eerste is gratis en doet een machine. Het tweede kost geld omdat ik het zelf schrijf.
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Analyse */}
              <div className="flex flex-col rounded-2xl border border-[#E6E9E7] bg-white p-6">
                <p className="section-eyebrow mb-3">Gratis · anoniem · 5 minuten</p>
                <h3 className="font-display mb-3 text-xl font-light text-[#16211F]">
                  De analyse: waar wijk je af?
                </h3>
                <p className="font-body mb-4 flex-1 text-sm font-light leading-relaxed text-[#4A5A56]">
                  Je vult je inkomen, je woonlasten, je vervoer en je dagelijkse uitgaven in en je ziet direct hoe je verdeling zich verhoudt tot huishoudens met een vergelijkbaar inkomen en een vergelijkbare samenstelling. Geen account, geen e-mailadres nodig, en je resultaat blijft ook zonder e-mailadres zichtbaar.
                </p>
                <p className="font-body mb-5 text-sm font-light leading-relaxed text-[#4A5A56]">
                  Wat het je geeft: een getal en de grootste afwijking. Wat het je niet geeft: de reden.
                </p>
                <Link
                  href="/analyse"
                  className="font-body inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: "#0B7A6E", textDecoration: "none" }}
                >
                  Doe de analyse →
                </Link>
              </div>

              {/* Geldrapport */}
              <div className="flex flex-col rounded-2xl border-2 p-6 bg-white" style={{ borderColor: "#0B7A6E" }}>
                <p className="section-eyebrow mb-3">49 euro eenmalig · geen gesprek nodig</p>
                <h3 className="font-display mb-3 text-xl font-light text-[#16211F]">
                  Het geldrapport: waarom is het bij jou zo?
                </h3>
                <p className="font-body mb-4 flex-1 text-sm font-light leading-relaxed text-[#4A5A56]">
                  Ik kijk met de hand naar jouw cijfers en schrijf je een rapport: de drie dingen die het meest opvallen, per stuk wat het je per jaar kost, wat ik zou doen en wat het niet oplost. Plus de posten die ik géén probleem vind, want die zijn er ook. Valt er niets te repareren, dan is dat de uitkomst en schrijf ik dat op. In gewone taal, herleesbaar, en te delen met je partner.
                </p>
                <p className="font-body mb-5 text-sm font-light leading-relaxed text-[#4A5A56]">
                  Dat is wat de machine niet kan: een reden opschrijven.
                </p>
                <TrackClick gebeurtenis="aanbod_kaart_klik" pakket="geldscan">
                  <Link href="/aanbod/intake?pakket=geldscan" className="btn-primary justify-center">
                    Vraag het geldrapport aan →
                  </Link>
                </TrackClick>
                <p className="font-body mt-3 text-xs font-light text-[#8B958F]">
                  49 euro, eenmalig. Kies je daarna een gesprek of traject, dan gaat de 49 euro daarvan af.{" "}
                  <Link href="/voorbeeldrapport" className="hover:underline" style={{ color: "#0B7A6E" }}>
                    Zie eerst een compleet voorbeeld →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Het gratis kwartier */}
        <section className="px-6 py-14" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-[860px]">
            <p className="section-eyebrow mb-3">Vrijblijvend · 15 minuten · geen kosten</p>
            <h2 className="font-display mb-4 text-2xl font-light text-[#16211F] sm:text-3xl">
              Liever eerst weten met wie je te maken hebt
            </h2>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Je koopt hier iets van iemand die je niet kent, en dat is een rare transactie. Daarom kun je me eerst een kwartier spreken. Video of telefoon, wat jij wilt, en ik doe ze buiten kantoortijden omdat ik dit naast mijn baan doe.
            </p>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              In dat kwartier kijk ik niet naar jouw cijfers. Ik leg uit wat ik doe, wat er in een geldrapport staat, wat er met je gegevens gebeurt en voor wie dit niet werkt. Jij stelt de vragen die je op de site niet beantwoord krijgt. Zodra het over jouw bedragen gaat, is het werk, en dat is de geldscan.
            </p>
            <p className="font-body mb-6 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Ik verkoop je in dat kwartier niets. Aan het eind zeg ik wat volgens mij de logische volgende stap is, en verder hoor ik het wel. Ik doe er maximaal drie per week, dus het kan zijn dat het een week later is.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl?subject=Kennismaken%20(15%20minuten)"
              className="font-body inline-flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-medium"
              style={{ borderColor: "#0B7A6E", color: "#0B7A6E", textDecoration: "none" }}
            >
              Vraag een kwartier aan →
            </a>
            <p className="font-body mt-3 text-xs font-light text-[#8B958F]">
              Mail met als onderwerp Kennismaken. Zet erin wanneer het je schikt, dan stel ik een moment voor.
            </p>
          </div>
        </section>

        {/* Voor wie het geldrapport werkt */}
        <section className="px-6 py-14" style={{ backgroundColor: "#F7F8F7" }}>
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display mb-4 text-2xl font-light text-[#16211F] sm:text-3xl">
              Voor wie het geldrapport werkt
            </h2>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Het geldrapport werkt het best voor huishoudens in loondienst met een bovenmodaal inkomen, die alle rekeningen op tijd betalen en toch weinig overhouden. Ik vraag je om je cijfers volledig in te vullen, dat is nodig om precies te zien waar het weglekt.
            </p>
            <p className="font-body mb-6 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Heb je betalingsachterstanden of schulden, dan hoor je bij de kosteloze hulp van je gemeente en dan is dit niet de juiste plek. Dat is geen formaliteit, dat is een ander vak.
            </p>
            <Link
              href="/aanbod/intake?pakket=geldscan"
              className="font-body inline-flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-medium"
              style={{ borderColor: "#0B7A6E", color: "#0B7A6E", textDecoration: "none" }}
            >
              Vraag het geldrapport aan →
            </Link>
          </div>
        </section>

        {/* Adviesgesprek en traject, op aanvraag */}
        <section className="px-6 py-14" style={{ backgroundColor: "#FFFFFF" }}>
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display mb-4 text-2xl font-light text-[#16211F] sm:text-3xl">
              En als een rapport niet genoeg is
            </h2>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Soms is een rapport niet waar iemand naar zoekt. Dan is er een eenmalig gesprek van 45 minuten via video, 125 euro, waarin ik met je meedenk en jij kunt doorvragen. Je krijgt daarna een schriftelijke samenvatting, ook om met je partner te lezen. En er is een traject van drie maanden, 497 euro, waarin ik een plan met je opstel en blijf meekijken tot het staat. Daar neem ik maximaal drie mensen tegelijk voor aan, omdat ik dit naast mijn baan doe.
            </p>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Beide zet ik niet als knop op deze pagina, omdat ik ze bijna nooit als eerste stap zou aanraden. Begin met het rapport of met een kwartier, en als een gesprek of een traject beter past, dan zeg ik dat.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl"
              className="font-body inline-flex items-center gap-1.5 text-sm font-medium"
              style={{ color: "#0B7A6E", textDecoration: "none" }}
            >
              Mail me waar je aan denkt →
            </a>
          </div>
        </section>

        {/* Wanneer je hier niets aan hebt */}
        <section className="px-6 py-14" style={{ backgroundColor: "#F7F8F7" }}>
          <div className="mx-auto max-w-[860px]">
            <h2 className="font-display mb-4 text-2xl font-light text-[#16211F] sm:text-3xl">
              Wanneer je hier niets aan hebt
            </h2>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Als je betalingsachterstanden of schulden hebt, dan hoor je bij de schuldhulp van je gemeente en die is kosteloos. Dat is beter werk dan wat ik doe en het is een ander vak.
            </p>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Als je een advies wil over een hypotheek, een verzekering, je pensioen of beleggen, dan moet je bij iemand met een vergunning zijn. Die heb ik niet en die wil ik ook niet, want dan word ik iemand die producten verkoopt.
            </p>
            <p className="font-body mb-4 max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              Als je op zoek bent naar een manier om zo zuinig mogelijk te leven, dan heb ik niets voor je. Ik reken uit waar het geld heen gaat en ik zet erbij welke posten ik géén lek vind. Vaak is dat de helft van het overzicht.
            </p>
            <p className="font-body max-w-[640px] font-light leading-relaxed" style={{ color: "#4A5A56" }}>
              En als je hoopt dat er altijd geld te vinden is: dat beloof ik niet. Soms is de uitkomst dat het klopt, en dat je alleen niet wist waarom.
            </p>
          </div>
        </section>

        {/* Detail-sectie: geldrapport, proces (links) strikt gescheiden van inhoud (rechts) */}
        {details.map((d) => {
          const info = PAKKET_INFO[d.pakket];
          return (
            <section
              key={d.id}
              id={d.id}
              className="px-6 py-16"
              style={{ backgroundColor: d.bg, scrollMarginTop: "90px" }}
            >
              <div className="mx-auto max-w-[900px]">
                <p className="section-eyebrow mb-2">{d.eyebrow}</p>
                <h2 className="font-display mb-3 text-2xl font-light text-[#16211F] sm:text-3xl">
                  {d.titel}
                </h2>
                <p className="font-body mb-8 max-w-[560px] font-light leading-relaxed text-[#4A5A56]">
                  {d.intro}
                </p>

                <div className="grid items-start gap-6 md:grid-cols-2 md:gap-6">
                  {/* Hoe het werkt: de volgorde der dingen */}
                  <div
                    className="rounded-2xl border border-[#E6E9E7] p-6"
                    style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                  >
                    <p className="section-eyebrow mb-4">Hoe het werkt</p>
                    <ol className="space-y-3">
                      {info.hoeHetWerkt.map((t, i) => (
                        <li key={t} className="flex items-start gap-2.5">
                          <span
                            aria-hidden="true"
                            className="font-body flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium"
                            style={{ backgroundColor: "#E6E9E7", color: "#4A5A56", marginTop: "1px" }}
                          >
                            {i + 1}
                          </span>
                          <span className="font-body text-sm font-light leading-relaxed text-[#4A5A56]">
                            {t}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Wat je krijgt: de inhoud van het pakket */}
                  <div
                    className="rounded-2xl border border-[#E6E9E7] p-6"
                    style={{ backgroundColor: d.cardBg }}
                  >
                    <p className="section-eyebrow mb-4">Wat je krijgt</p>
                    <ul className="space-y-3">
                      {info.watJeKrijgt.map((t) => (
                        <li key={t} className="flex items-start gap-2.5">
                          <span aria-hidden="true" style={{ color: "#0B7A6E", fontWeight: 600 }}>
                            ✓
                          </span>
                          <span className="font-body text-sm font-light leading-relaxed text-[#4A5A56]">
                            {t}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <TrackClick gebeurtenis="aanbod_cta_klik" pakket={d.pakket}>
                    <Link href={d.primaireHref} className="btn-primary">
                      {d.primaireLabel} →
                    </Link>
                  </TrackClick>
                  <Link
                    href={d.secundaireHref}
                    className="font-body text-sm hover:underline"
                    style={{ color: "#0B7A6E", textDecoration: "none" }}
                  >
                    {d.secundaireLabel} →
                  </Link>
                </div>
              </div>
            </section>
          );
        })}

        {/* Sociale proof */}
        <section style={{ backgroundColor: "#FFFFFF", padding: "3.5rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <p
              className="font-body mb-6 text-center text-xs font-medium uppercase tracking-widest"
              style={{ color: "#0B7A6E" }}
            >
              Wat het andere gezinnen opleverde
            </p>
            <div className="mx-auto mb-8 max-w-[720px] rounded-2xl border border-[#E6E9E7] p-6" style={{ borderLeft: "3px solid #0B7A6E" }}>
              <p className="section-eyebrow mb-2">Over de geldscan</p>
              <p className="font-body mb-2 text-sm font-light leading-relaxed text-[#16211F]">
                &ldquo;We vonden het best spannend dat een vreemde naar onze
                financiën keek. Maar het was verhelderend: we zagen
                afwijkingen die we zelf niet doorhadden.&rdquo;
              </p>
              <p className="font-body text-xs text-[#8B958F]">Sanne &amp; Joris, gezin met twee kinderen</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                {
                  resultaat: "Geen verrassingen meer in de piekmaanden",
                  quote:
                    "Periodieke kosten uitgerekend en opgesplitst in maandpotjes. De kerstpot staat er nu gewoon.",
                  naam: "Daan & Roos",
                },
                {
                  resultaat: "Boodschappen eindelijk onder controle",
                  quote:
                    "Samen een weekbudget en een korte check-in na elke keer boodschappen. Dat hield ons scherp.",
                  naam: "Bram & Eva",
                },
                {
                  resultaat: "Twee dagen minder BSO, rust én geld over",
                  quote:
                    "Meegedacht over flexibeler werken in plaats van alleen bezuinigen. Thuis is het rustiger.",
                  naam: "Karim & Noor",
                },
              ].map((t) => (
                <div
                  key={t.naam}
                  className="rounded-2xl border border-[#E6E9E7] p-6"
                  style={{ backgroundColor: "white" }}
                >
                  <p className="font-body mb-2 text-sm font-medium text-[#0B7A6E]">
                    {t.resultaat}
                  </p>
                  <p className="font-body mb-3 text-sm font-light leading-relaxed text-[#16211F]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="font-body text-xs text-[#8B958F]">{t.naam}</p>
                </div>
              ))}
            </div>
            <p className="font-body mt-6 text-center text-xs" style={{ color: "#8B958F" }}>
              Echte ervaringen van de eerste gezinnen die ik hielp. Namen aangepast voor hun privacy.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section style={{ backgroundColor: "white", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <h2
              className="font-display font-light text-[#16211F]"
              style={{ fontSize: "2rem", marginBottom: "2rem" }}
            >
              Veelgestelde vragen
            </h2>
            <AanbodAccordion />
          </div>
        </section>

        {/* Finale CTA */}
        <section
          style={{ backgroundColor: "#16211F", padding: "4rem 1.5rem", textAlign: "center" }}
        >
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2
              className="font-display font-light"
              style={{ fontSize: "2rem", color: "white", marginBottom: "1rem" }}
            >
              Zie eerst wat je koopt
            </h2>
            <p
              className="font-body"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "1rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Op de voorbeeldpagina staan twee complete rapporten, met de bedragen erbij en met de posten die ik géén lek vind. Verzonnen huishoudens, echte werkwijze. Als je daarna wil dat ik naar jouw cijfers kijk, dan weet je precies wat er terugkomt.
            </p>
            <Link
              href="/voorbeeldrapport"
              className="font-body inline-block px-8 py-3 text-sm font-medium transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#0B7A6E",
                color: "#FFFFFF",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              Bekijk een voorbeeldrapport →
            </Link>
            <p style={{ marginTop: "1rem" }}>
              <TrackClick gebeurtenis="aanbod_cta_klik" pakket="geldscan">
                <Link href="/aanbod/intake?pakket=geldscan" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem" }}>
                  Of vraag het geldrapport meteen aan, 49 euro →
                </Link>
              </TrackClick>
            </p>
            <p style={{ marginTop: "0.75rem", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
              Eenmalig · voor huishoudens in heel Nederland · je gegevens worden nooit gedeeld of verkocht
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
