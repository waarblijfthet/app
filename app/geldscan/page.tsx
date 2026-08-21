import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  RAPPORTEN,
  AANTAL_ZONDER_LEK,
  AANTAL_ZONDER_VERVOLG,
} from "@/lib/rapporten-data";

export const metadata: Metadata = {
  title: "Geldscan: waarom houd jij zo weinig over? €49",
  description:
    "Je bankapp laat zien wat je hebt uitgegeven. De geldscan legt uit waarom dat bij jouw huishouden zo uitpakt en wat ik concreet zou veranderen. Persoonlijk geschreven, €49 eenmalig, geen gesprek nodig.",
  alternates: { canonical: "https://www.waarblijfthet.nl/geldscan" },
  openGraph: {
    title: "Geldscan: waarom houd jij zo weinig over? €49",
    description:
      "Je bankapp vertelt wat je hebt uitgegeven. Ik kijk naar het hele huishouden en zoek uit wat die cijfers voor jou betekenen. €49 eenmalig.",
    url: "https://www.waarblijfthet.nl/geldscan",
    type: "website",
  },
  robots: { index: true, follow: true },
};

/* ────────────────────────────────────────────────────────────────
   Situatiecontext uit de URL (17 in de bouwprompt van 15-aug-2026).

   Komt iemand binnen vanuit een artikel of een persona-CTA, dan houd ik
   die context vast: de passende kaart staat bovenaan en gemarkeerd, de
   hero krijgt een regel die zijn situatie benoemt, en alles wat al
   bekend is reist mee naar de gratis analyse, zodat hij het daar niet
   opnieuw hoeft in te vullen.

   Bewust terughoudend met voorinvullen: alleen wat zeker is uit de
   situatiekeuze zelf. Het aantal kinderen raad ik niet, want dat
   verandert de vergelijking zonder dat de bezoeker het ziet.
   ──────────────────────────────────────────────────────────────── */
type SituatieSleutel =
  | "gezin"
  | "alleenstaand"
  | "stel"
  | "alleenstaande-ouder"
  | "zzp";

interface Situatie {
  sleutel: SituatieSleutel;
  kaartTitel: string;
  kaartTekst: string;
  /** Slug van het echte rapport dat het dichtst bij deze situatie ligt. */
  rapport: string;
  /** Regel in de hero als iemand met deze context binnenkomt. */
  heroRegel: string;
  /** Wat we zeker weten en dus meegeven aan de analyse. */
  analyseParams: Record<string, string>;
}

const SITUATIES: Situatie[] = [
  {
    sleutel: "gezin",
    kaartTitel: "Gezin",
    kaartTekst: "Goed inkomen, kinderen, toch weinig over.",
    rapport: "tweeverdieners-drie-kinderen",
    heroRegel:
      "Je komt binnen als gezin met twee inkomens. Het rapport dat hieronder is uitgewerkt gaat over precies zo'n huishouden, en daar lag het antwoord niet bij de boodschappen.",
    analyseParams: { volwassenen: "2" },
  },
  {
    sleutel: "alleenstaand",
    kaartTitel: "Alleenstaand",
    kaartTekst: "Goed salaris, maar alles komt op één inkomen neer.",
    rapport: "alleenstaand-huurwoning",
    heroRegel:
      "Je komt binnen als alleenstaande. Eén inkomen draagt een vaste basis die voor twee mensen is geprijsd, en dat verschuift wat er normaal is.",
    analyseParams: { volwassenen: "1", kinderen: "0" },
  },
  {
    sleutel: "stel",
    kaartTitel: "Stel zonder kinderen",
    kaartTekst: "Goed verdienen, maar sparen lukt minder dan verwacht.",
    rapport: "stel-zonder-kinderen",
    heroRegel:
      "Je komt binnen als stel zonder kinderen. Bij het stel dat je hieronder terugvindt was de uitkomst dat er geen lek was. Dat kan dus ook.",
    analyseParams: { volwassenen: "2", kinderen: "0" },
  },
  {
    sleutel: "alleenstaande-ouder",
    kaartTitel: "Alleenstaande ouder",
    kaartTekst: "Goed inkomen, maar één persoon draagt vrijwel alle risico's.",
    rapport: "alleenstaande-ouder-twee-kinderen",
    heroRegel:
      "Je komt binnen als alleenstaande ouder. Je draagt in je eentje wat elders twee mensen dragen, en de vergelijking moet dat weten voordat er iets van te vinden valt.",
    analyseParams: { volwassenen: "1" },
  },
  {
    sleutel: "zzp",
    kaartTitel: "Zzp of wisselend inkomen",
    kaartTekst: "Goed gemiddeld inkomen, maar veel verschil tussen maanden.",
    rapport: "zzp-wisselend-inkomen",
    heroRegel:
      "Je komt binnen met een wisselend inkomen. Juist dan is de vraag niet wat je gemiddeld verdient, maar welke vaste structuur eronder ligt.",
    analyseParams: {},
  },
];

function isSituatie(v: string | undefined): v is SituatieSleutel {
  return !!v && SITUATIES.some((s) => s.sleutel === v);
}

/** Getal uit de URL, alleen als het binnen een geloofwaardige marge valt. */
function bedragUitUrl(v: string | undefined, min: number, max: number): string | null {
  if (!v) return null;
  const n = Number(v.replace(/[^\d]/g, ""));
  if (!Number.isFinite(n) || n < min || n > max) return null;
  return String(n);
}

const stappen = [
  {
    n: "01",
    titel: "Ik kijk naar jouw cijfers",
    tekst:
      "Je levert je inkomsten en je belangrijkste uitgaven aan. Schattingen zijn prima. Dat kost je een minuut of twee.",
  },
  {
    n: "02",
    titel: "Ik kijk naar jouw situatie",
    tekst:
      "Inkomen, wonen, kinderen, auto, huishouden en wat jij zelf belangrijk vindt. Er is een veld waarin je opschrijft wat de cijfers niet laten zien, en dat weegt zwaarder dan het gemiddelde.",
  },
  {
    n: "03",
    titel: "Ik zoek uit wat er werkelijk opvalt",
    tekst:
      "Niet alleen wat hoog is, ook wat juist normaal is. Een dure hypotheek is niet automatisch een probleem. Hoge boodschappen zijn niet automatisch een probleem.",
  },
  {
    n: "04",
    titel: "Je krijgt een persoonlijk plan",
    tekst:
      "Een rapport met mijn conclusies, de posten die afwijken, de posten die dat niet doen, en wat ik concreet zou veranderen in de komende maanden.",
  },
];

const inhoudsopgave = [
  { n: "1", titel: "Mijn eerste indruk", tekst: "Wat valt direct op?" },
  { n: "2", titel: "Waar zit het verschil?", tekst: "Welke uitgaven wijken af en welke juist niet?" },
  { n: "3", titel: "Wat is géén probleem?", tekst: "Welke dure uitgaven hoef je niet aan te pakken?" },
  { n: "4", titel: "Waar zit de echte ruimte?", tekst: "Wat kun je structureel veranderen?" },
  { n: "5", titel: "Mijn advies", tekst: "Wat zou ik als eerste veranderen?" },
  { n: "6", titel: "Plan voor de komende maanden", tekst: "Wat kun je concreet gaan doen?" },
];

const bankapp = [
  "Je gaf €1.150 uit aan boodschappen",
  "Je gaf €720 uit aan vrije tijd",
  "Je hypotheek is €1.860",
  "Je zette €1.000 opzij, en haalde er weer geld vanaf",
];

const geldscanVragen = [
  "Is €1.150 aan boodschappen veel voor jouw huishouden?",
  "Zijn je vaste lasten eigenlijk het probleem?",
  "Welke jaarlijkse kosten trekken je spaargeld telkens weer leeg?",
  "Hoeveel zou er structureel over moeten blijven?",
  "Wat zou ik als eerste veranderen?",
];

const faq = [
  {
    vraag: "Is de geldscan automatisch?",
    antwoord:
      "Nee. Ik schrijf elk rapport zelf, met de hand. Er kijkt geen team en geen algoritme mee, en er is geen sjabloon waarin ik jouw bedragen giet. Dat is precies waarom er vijf verschillende antwoorden uit vijf rapporten kwamen.",
  },
  {
    vraag: "Moet ik mijn bank koppelen?",
    antwoord: "Nee. Er is geen koppeling, geen app en geen inlog. Je vult zelf in wat je weet.",
  },
  {
    vraag: "Moet ik bankafschriften opsturen?",
    antwoord:
      "Nee, dat is optioneel. De ingevulde analyse is meestal genoeg. Wil je dat ik preciezer kijk, stuur dan een paar recente afschriften mee. Je mag daarin wegstrepen wat er voor mij niet toe doet: rekeningnummers, namen van anderen en betalingen die over iemand anders gaan. Ik heb de bedragen en de soort uitgave nodig, niet bij wie je hebt gepind. Ik ben de enige die ze inziet, en direct na het versturen van je rapport verwijder ik ze.",
  },
  {
    vraag: "Hoe lang duurt het?",
    antwoord:
      "Je krijgt het rapport binnen twee werkdagen nadat je informatie compleet is. De aanvraag zelf kost je twee minuten.",
  },
  {
    vraag: "Krijg ik alleen tips om te bezuinigen?",
    antwoord:
      "Nee. Soms is een dure uitgave helemaal geen probleem, en dan schrijf ik dat op. Het rapport kijkt naar het geheel: wat wijkt af, wat wijkt juist niet af, en waar zit de ruimte werkelijk.",
  },
  {
    vraag: "Wat als er niets bijzonders uitkomt?",
    antwoord:
      `Dan schrijf ik dat ook. Van de vijf rapporten die openbaar op deze site staan, was dat bij ${AANTAL_ZONDER_LEK} van de vijf de uitkomst. Het doel is niet om koste wat kost iets te vinden, het doel is een antwoord dat klopt.`,
  },
  {
    vraag: "Kan ik daarna nog hulp krijgen?",
    antwoord:
      `Ja, maar het hoeft niet. Je kunt een adviesgesprek of een traject kiezen, en dan trek ik de €49 van de prijs daarvan af. Bij ${AANTAL_ZONDER_VERVOLG} van de vijf gepubliceerde rapporten was een vervolggesprek niet nodig.`,
  },
  {
    vraag: "Kan ik je eerst even spreken?",
    antwoord:
      "Dat kan, een kwartier, kosteloos, via video of telefoon. Ik doe die gesprekken buiten kantoortijden, zodat ik er de tijd voor kan nemen. In dat kwartier kijk ik niet naar jouw cijfers: ik leg uit wat ik doe, wat er in een rapport staat en wat er met je gegevens gebeurt. Mail naar hallo@waarblijfthet.nl met als onderwerp Kennismaken. Voor de scan zelf is het niet nodig.",
  },
  {
    vraag: "Is dit financieel advies?",
    antwoord:
      "Nee. De geldscan is een persoonlijke analyse van je huishoudfinanciën. Voor belasting, hypotheek, beleggen en vergelijkbaar gespecialiseerd advies verwijs ik waar nodig door. Ik ben ook geen schuldhulp: heb je betalingsachterstanden, dan is kosteloze hulp via je gemeente of Geldfit passender.",
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
    "Persoonlijk geschreven geldrapport over je huishoudfinanciën, zonder gesprek. Wat wijkt af, wat wijkt juist niet af, en wat er concreet moet veranderen. Als PDF binnen twee werkdagen na aanlevering van je cijfers. €49 eenmalig.",
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
    name: "Geldscan met persoonlijk geldrapport",
    price: "49",
    priceCurrency: "EUR",
    url: "https://www.waarblijfthet.nl/geldscan",
  },
};

export default function GeldscanPage({
  searchParams,
}: {
  searchParams?: { token?: string; situatie?: string; inkomen?: string; boodschappen?: string };
}) {
  const token = searchParams?.token;
  const situatieSleutel = isSituatie(searchParams?.situatie) ? searchParams.situatie : null;
  const situatie = situatieSleutel
    ? SITUATIES.find((s) => s.sleutel === situatieSleutel) ?? null
    : null;
  const inkomen = bedragUitUrl(searchParams?.inkomen, 500, 20000);
  const boodschappen = bedragUitUrl(searchParams?.boodschappen, 50, 3000);

  // Aanmelden voor de scan.
  const intakeParams = new URLSearchParams({ pakket: "geldscan" });
  if (token) intakeParams.set("token", token);
  if (situatieSleutel) intakeParams.set("situatie", situatieSleutel);
  const intakeHref = `/aanbod/intake?${intakeParams.toString()}`;

  // Gratis analyse, met alles wat we al van deze bezoeker weten.
  const analyseParams = new URLSearchParams(situatie?.analyseParams ?? {});
  if (inkomen) analyseParams.set("inkomen", inkomen);
  if (boodschappen) analyseParams.set("boodschappen", boodschappen);
  const analyseQuery = analyseParams.toString();
  const analyseHref = analyseQuery ? `/analyse?${analyseQuery}` : "/analyse";

  // De situatie waarmee iemand binnenkwam gaat bovenaan de kaartenrij staan.
  const situatieKaarten = situatie
    ? [situatie, ...SITUATIES.filter((s) => s.sleutel !== situatie.sleutel)]
    : SITUATIES;

  /* De gratis analyse is de enige primaire actie op deze pagina. Wie hier
     binnenkomt heeft nog geen eigen vergelijking gezien, en hoeft dus nog
     niets te kopen. */
  const PrimaireCta = ({ dark = false, locatie }: { dark?: boolean; locatie: string }) => (
    <CtaLink
      doel="analyse"
      href={analyseHref}
      locatie={locatie}
      className="btn-primary"
      style={dark ? { backgroundColor: "#0B7A6E", borderColor: "#0B7A6E" } : undefined}
    >
      {PRIMAIRE_CTA_LABEL}
    </CtaLink>
  );

  /* De enige secundaire knop van deze pagina, punt 8. Outline, nooit gevuld,
     zodat hij visueel ondergeschikt blijft aan de gratis analyse. */
  const GeldscanKnop = () => (
    <CtaLink
      doel="geldscan"
      href="#prijs"
      locatie="geldscan-hero"
      className="font-body inline-flex items-center gap-1.5 rounded-xl border px-5 py-2.5 text-sm font-medium"
      style={{ borderColor: "#0B7A6E", color: "#0B7A6E", textDecoration: "none" }}
    >
      Bekijk de Geldscan &rarr;
    </CtaLink>
  );

  /* De aanvraag zelf. Alleen bij de prijs, waar iemand er expliciet naar zoekt. */
  const GeldscanAanvraag = () => (
    <CtaLink
      doel="geldscan"
      href={intakeHref}
      locatie="geldscan-prijs"
      className="font-body font-medium text-sm hover:underline"
      style={{ color: "#0B7A6E", textDecoration: "none" }}
    >
      Al uit je analyse en benieuwd naar het waarom? Bekijk de Geldscan, €49 &rarr;
    </CtaLink>
  );

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

      <main>
        {/* ── 1. Hero ─────────────────────────────────────────── */}
        <section className="bg-background pt-14 pb-12">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-5">Geldscan</p>
            <h1 className="font-display font-light text-primary text-3xl sm:text-5xl mb-6 leading-tight">
              Je verdient goed.
              <br />
              Toch houd je minder over dan je zou verwachten?
            </h1>
            <p className="font-body font-light text-text-soft text-lg leading-relaxed mb-4">
              Ik kijk persoonlijk naar je volledige financiële situatie en zoek uit waar het
              verschil vandaan komt.
            </p>
            <div className="mb-8">
              <p className="font-display font-light text-primary text-xl sm:text-2xl leading-snug">
                Geen automatisch rapport.
              </p>
              <p className="font-body font-light text-text-soft text-base leading-relaxed mt-1">
                Ik kijk zelf naar je cijfers en schrijf jouw conclusie.
              </p>
            </div>

            {situatie && (
              <div
                className="card-base border border-[#E6E9E7] mb-8"
                style={{ borderLeft: "3px solid #0B7A6E" }}
              >
                <p className="section-eyebrow mb-2">{situatie.kaartTitel}</p>
                <p className="font-body font-light text-sm text-primary leading-relaxed mb-2">
                  Je weet nu ongeveer wat een huishouden zoals het jouwe zou moeten overhouden.
                  Maar weet je ook waarom jij daar misschien vanaf wijkt? Daarvoor is de Geldscan.
                </p>
                <p className="font-body font-light text-sm text-text-soft leading-relaxed">
                  {situatie.heroRegel}
                </p>
              </div>
            )}

            {/* Het eerste actiepunt van de pagina: de gratis analyse. */}
            <div
              className="card-base border border-[#E6E9E7] mb-6"
              style={{ borderLeft: "3px solid #0B7A6E" }}
            >
              <p className="section-eyebrow mb-3">Nog niet begonnen?</p>
              <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-5">
                Doe eerst de gratis analyse. Dan zie je waar jouw situatie afwijkt en kun je daarna
                bepalen of je wilt weten waarom.
              </p>
              <PrimaireCta locatie="geldscan-boven" />
              <p className="font-body font-light text-text-muted text-xs mt-4">
                Gratis, anoniem, een paar minuten. Je hoeft nog niets te kopen.
              </p>
            </div>

            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mt-10 mb-3">
              De Geldscan
            </h2>
            <p className="font-body font-light text-text-soft text-base leading-relaxed">
              De gratis analyse laat zien waar. De Geldscan onderzoekt waarom.
            </p>
            <p className="font-body font-medium text-primary text-base mt-2 mb-4">
              €49 eenmalig
            </p>
            <GeldscanKnop />
            <p className="font-body font-light text-text-muted text-xs mt-3">
              Persoonlijk geschreven, geen abonnement. Je antwoorden in de analyse blijven anoniem
              totdat je zelf je e-mailadres achterlaat.
            </p>

            <div
              className="card-base border border-[#E6E9E7] mt-6 mb-0"
              style={{ borderLeft: "3px solid #0B7A6E" }}
            >
              <p className="section-eyebrow mb-3">Zo werkt de Geldscan, na de analyse</p>
              <ol className="space-y-3">
                <li>
                  <p className="font-body font-medium text-primary text-sm">
                    1. Je vraagt de Geldscan aan
                  </p>
                  <p className="font-body font-light text-sm text-text-soft leading-relaxed">
                    Vier korte vragen, daarna ontvang je een betaalverzoek.
                  </p>
                </li>
                <li>
                  <p className="font-body font-medium text-primary text-sm">2. Je betaalt €49</p>
                  <p className="font-body font-light text-sm text-text-soft leading-relaxed">
                    Na betaling ontvang je de link om je financiële gegevens aan te leveren.
                  </p>
                </li>
                <li>
                  <p className="font-body font-medium text-primary text-sm">
                    3. Ik maak je Geldscan
                  </p>
                  <p className="font-body font-light text-sm text-text-soft leading-relaxed">
                    Ik analyseer je situatie persoonlijk en schrijf zelf je rapport.
                  </p>
                </li>
              </ol>
            </div>

          </div>
        </section>

        {/* ── 1b. Gratis vs betaald: het centrale onderscheid ─── */}
        <section className="bg-card py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-8 leading-snug">
              Wat gratis is, en wat je voor €49 krijgt
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="card-base border border-[#E6E9E7]">
                <p className="section-eyebrow mb-4">Gratis analyse</p>
                <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-4">
                  Je ontdekt:
                </p>
                <ul className="space-y-3">
                  {[
                    "wat volgens de vergelijking normaal is voor een huishouden zoals het jouwe",
                    "wat jij ongeveer zou moeten overhouden",
                    "of jouw situatie daarvan afwijkt",
                  ].map((r) => (
                    <li
                      key={r}
                      className="font-body font-light text-sm text-text-soft leading-relaxed flex gap-3"
                    >
                      <span aria-hidden="true" style={{ color: "#C6CCC9" }}>
                        &bull;
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="card-base border border-[#E6E9E7]"
                style={{ borderLeft: "3px solid #0B7A6E" }}
              >
                <p className="section-eyebrow mb-4">Geldscan &middot; €49</p>
                <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-4">
                  Ik kijk vervolgens zelf naar:
                </p>
                <ul className="space-y-3">
                  {[
                    "waar het verschil vandaan komt",
                    "welke uitgaven werkelijk opvallen",
                    "welke uitgaven juist géén probleem zijn",
                    "welke structurele ruimte er werkelijk is",
                    "wat ik als eerste zou veranderen",
                  ].map((r) => (
                    <li
                      key={r}
                      className="font-body text-sm text-primary leading-relaxed flex gap-3"
                    >
                      <span aria-hidden="true" style={{ color: "#0B7A6E" }}>
                        &bull;
                      </span>
                      <span className="font-light">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="font-body font-medium text-primary text-base leading-relaxed mt-8 max-w-2xl">
              De gratis analyse vertelt je dát er een verschil is. De Geldscan zoekt uit waarom.
            </p>
            <p className="font-body font-light text-text-soft text-sm leading-relaxed mt-3 max-w-2xl">
              Je betaalt €49 niet voor meer cijfers. Je betaalt voor mijn oordeel over jouw
              cijfers.
            </p>

            <div className="mt-7">
              <PrimaireCta locatie="geldscan-vergelijking" />
            </div>
          </div>
        </section>

        {/* ── 2. Wat krijg ik? ────────────────────────────────── */}
        <section className="bg-background py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-8">
              Wat je voor €49 krijgt
            </h2>
            <div className="space-y-4">
              {stappen.map((s) => (
                <div key={s.n} className="card-base border border-[#E6E9E7]">
                  <div className="flex items-start gap-5">
                    <span
                      className="font-display font-light shrink-0"
                      style={{ color: "#0B7A6E", fontSize: "1.75rem", lineHeight: 1.1 }}
                      aria-hidden="true"
                    >
                      {s.n}
                    </span>
                    <div>
                      <h3 className="font-display font-light text-primary text-xl mb-2">
                        {s.titel}
                      </h3>
                      <p className="font-body font-light text-sm text-text-soft leading-relaxed">
                        {s.tekst}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="font-body font-medium text-primary text-sm mt-6">
              Geen automatisch AI-rapport. Ik schrijf het zelf.
            </p>
          </div>
        </section>

        {/* ── 3. Het onderscheid met de bankapp ───────────────── */}
        <section className="bg-card py-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-3">
              Wat je al weet, en wat je nog niet weet
            </h2>
            <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-8 max-w-2xl">
              De bedragen links zijn wat een bankapp of gratis analyse je al vertelt, bij een echt
              rapport op deze site, van een huishouden met twee inkomens en drie kinderen. Er staan
              net zulke rapporten voor een alleenstaande, een alleenstaande ouder, een stel en een
              zzp&apos;er. Twee van deze vier bedragen waren overigens hun eigen schatting, en bij
              het invullen bleek die te onzeker. Daarom heb ik drie maanden afschriften opgevraagd.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="card-base border border-[#E6E9E7]">
                <p className="section-eyebrow mb-4">Je bankapp</p>
                <ul className="space-y-3">
                  {bankapp.map((r) => (
                    <li
                      key={r}
                      className="font-body font-light text-sm text-text-soft leading-relaxed flex gap-3"
                    >
                      <span aria-hidden="true" style={{ color: "#C6CCC9" }}>
                        &bull;
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body font-light text-text-muted text-xs mt-5 leading-relaxed">
                  Vier bedragen. Allemaal juist, en geen van alle een antwoord.
                </p>
              </div>

              <div
                className="card-base border border-[#E6E9E7]"
                style={{ borderLeft: "3px solid #0B7A6E" }}
              >
                <p className="section-eyebrow mb-4">De geldscan</p>
                <ul className="space-y-3">
                  {geldscanVragen.map((r) => (
                    <li
                      key={r}
                      className="font-body text-sm text-primary leading-relaxed flex gap-3"
                    >
                      <span aria-hidden="true" style={{ color: "#0B7A6E" }}>
                        &bull;
                      </span>
                      <span className="font-light">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="card-base border border-[#E6E9E7] mt-5"
              style={{ borderLeft: "3px solid #0B7A6E" }}
            >
              <p className="section-eyebrow mb-2">Het antwoord op de eerste vraag</p>
              <p className="font-body font-light text-sm text-text-soft leading-relaxed">
                Nee. Bij dit huishouden viel geen enkele vaste last uit de toon, en de boodschappen
                hoefden niet omlaag. Wat er wel uit de toon viel, lees je hieronder.
              </p>
            </div>

            <p className="font-body font-light text-sm text-text-soft leading-relaxed mt-8 max-w-2xl">
              Dit is precies het rapport hieronder. Zo ziet het eruit als de gratis analyse dát had
              laten zien, en de Geldscan waarom.
            </p>
          </div>
        </section>

        {/* ── 4. Het echte resultaat ──────────────────────────── */}
        <section className="bg-background py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Zo ziet het er in de praktijk uit
            </h2>

            <div
              className="card-base border border-[#E6E9E7]"
              style={{ borderLeft: "3px solid #0B7A6E" }}
            >
              <p className="section-eyebrow mb-3">
                Tweeverdieners · 3 kinderen
              </p>

              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1 mb-6">
                <p
                  className="font-display font-light text-primary"
                  style={{ fontSize: "2.75rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  €7.880 <span className="text-lg font-body font-light text-text-muted">netto</span>
                </p>
                <p
                  className="font-display font-light"
                  style={{ fontSize: "2.75rem", lineHeight: 1.1, letterSpacing: "-0.02em", color: "#0B7A6E" }}
                >
                  €850 <span className="text-lg font-body font-light text-text-muted">structureel over</span>
                </p>
              </div>

              <p className="font-body font-medium text-primary text-lg leading-snug mb-1">
                Ze dachten dat boodschappen het probleem waren.
              </p>
              <p className="font-body font-medium text-lg leading-snug mb-5" style={{ color: "#0B7A6E" }}>
                Dat waren ze niet.
              </p>

              <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-4">
                De een dacht: de boodschappen en de kinderen. De ander dacht: alle losse uitgaven.
                Samen misten ze naar eigen schatting 500 tot 750 euro per maand.
              </p>

              <p
                className="font-display font-light text-primary text-2xl sm:text-3xl leading-snug mb-5"
                style={{ letterSpacing: "-0.02em" }}
              >
                Geen enkele buitensporige vaste last.
              </p>

              <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-4">
                Bijna €1.000 per maand aan voorspelbare jaaruitgaven kwam steeds terug uit het
                spaargeld, boven op veel vrij besteedbare uitgaven zonder plafond.
              </p>

              <p className="font-body font-medium text-primary text-sm leading-relaxed mb-8">
                Zonder de volledige analyse hadden ze waarschijnlijk geprobeerd te besparen op het
                verkeerde: de boodschappen en de kinderen.
              </p>

              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6"
                style={{ borderTop: "1px solid #E6E9E7" }}
              >
                <div>
                  <p className="section-eyebrow mb-3">Voor</p>
                  <ul className="space-y-2">
                    {[
                      "€1.000 per maand sparen",
                      "later dat geld weer terughalen",
                      "het gevoel dat sparen niet lukt",
                    ].map((r) => (
                      <li
                        key={r}
                        className="font-body font-light text-sm text-text-soft leading-relaxed"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="section-eyebrow mb-3" style={{ color: "#0B7A6E" }}>
                    Wat ik voorstelde
                  </p>
                  <ul className="space-y-2">
                    {[
                      "€975 per maand reserveren voor de jaaruitgaven",
                      "€750 per maand als echte vermogensopbouw",
                      "vrije uitgaven een maandplafond geven",
                      "boodschappen en kinderen ongemoeid laten",
                    ].map((r) => (
                      <li
                        key={r}
                        className="font-body font-light text-sm text-primary leading-relaxed"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-6" style={{ borderTop: "1px solid #E6E9E7" }}>
                <p className="section-eyebrow mb-2">Hun evaluatie, na drie maanden</p>
                <p className="font-body font-light text-sm text-text-soft leading-relaxed">
                  &ldquo;Gemiddeld bleef ongeveer €850 per maand echt staan, naast de reserveringen
                  voor jaaruitgaven. Vooral mijn partner bleek gelijk te hebben: er was niet één
                  groot lek, maar veel losse bedragen.&rdquo;
                </p>
              </div>
            </div>

            <p className="font-body font-light text-text-muted text-xs mt-4 leading-relaxed">
              Dit is één huishouden, met toestemming gepubliceerd. Geen belofte over jouw uitkomst.
            </p>

            <p className="mt-5">
              <Link
                href="/rapporten/tweeverdieners-drie-kinderen"
                className="font-body font-medium text-sm hover:underline"
                style={{ color: "#0B7A6E" }}
              >
                Bekijk het volledige rapport &rarr;
              </Link>
            </p>

            <div className="mt-7">
              <PrimaireCta locatie="geldscan-voorbeeldrapport" />
            </div>

            <div className="flex items-center gap-3 mt-8">
              <div
                className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                style={{ backgroundColor: "#16211F" }}
              >
                <Image
                  src="/jarno.jpg"
                  alt="Jarno Koopman"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-body font-light text-sm text-text-soft">
                Elk rapport schrijf ik zelf, er kijkt geen algoritme of team mee.{" "}
                <Link href="/over" className="hover:underline" style={{ color: "#0B7A6E" }}>
                  Wie ik ben &rarr;
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. Ook: er is niets mis ─────────────────────────── */}
        <section className="bg-card py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6 leading-snug">
              Ik zoek niet koste wat kost naar iets om te besparen.
            </h2>
            <div className="space-y-4 max-w-2xl">
              <p className="font-body font-light text-text-soft leading-relaxed">
                Misschien blijkt dat je boodschappen helemaal niet extreem zijn. Misschien is je
                hypotheek prima te dragen. Misschien zijn je vrije uitgaven bewuste keuzes. Misschien
                blijkt zelfs dat er financieel weinig mis is. Dan krijg je dat ook te horen.
              </p>
              <p className="font-body font-medium text-primary leading-relaxed">
                Ik word niet betaald om problemen te vinden.
              </p>
              <p className="font-body font-light text-text-soft leading-relaxed">
                Misschien verdien je €7.000 per maand, geef je €6.500 bewust uit, en is je vraag
                niet je uitgavenpatroon maar je spaardoel. Of misschien blijkt je hypotheek logisch,
                maar verdwijnen er honderden euro&apos;s per maand in allerlei kleine uitgaven. Dat
                weet ik pas nadat ik naar jouw hele situatie heb gekeken.
              </p>
              <p className="font-body font-light text-text-soft leading-relaxed">
                En als je dit met z&apos;n tweeën leest: het rapport wijst niemand aan. Ik kijk naar
                het huishouden, niet naar wie van jullie meer uitgeeft. Bij het gezin hierboven
                bleek achteraf dat allebei de vermoedens een kern van waarheid hadden.
              </p>
            </div>

            <div
              className="card-base border border-[#E6E9E7] mt-8"
              style={{ borderLeft: "3px solid #0B7A6E" }}
            >
              <p className="font-body font-light text-primary text-base leading-relaxed mb-3">
                Bij {AANTAL_ZONDER_LEK} van de vijf rapporten die openbaar op deze site staan, was
                mijn conclusie dat er niets te repareren viel. Bij {AANTAL_ZONDER_VERVOLG} van de
                vijf was een vervolggesprek niet nodig.
              </p>
              <p className="font-body font-light text-sm text-text-soft leading-relaxed">
                Je hoeft me daarin niet op mijn woord te geloven. Die vijf rapporten staan er van
                begin tot eind, inclusief de bedragen en de evaluatie na drie tot vier maanden.{" "}
                <Link href="/rapporten" className="hover:underline" style={{ color: "#0B7A6E" }}>
                  Lees ze na &rarr;
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. Wat staat er in het rapport ──────────────────── */}
        <section className="bg-background py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2">
              Wat er in het rapport staat
            </h2>
            <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-8">
              Jouw persoonlijke geldrapport, als PDF, in gewone taal. Op je eigen moment terug te
              lezen, en te delen met wie je wilt.
            </p>

            <div className="card-base border border-[#E6E9E7]">
              <ol className="space-y-0">
                {inhoudsopgave.map((h, i) => (
                  <li
                    key={h.n}
                    className="flex items-baseline gap-4 py-4"
                    style={i === 0 ? undefined : { borderTop: "1px solid #E6E9E7" }}
                  >
                    <span
                      className="font-display font-light shrink-0"
                      style={{ color: "#0B7A6E", fontSize: "1.05rem", width: "1.25rem" }}
                      aria-hidden="true"
                    >
                      {h.n}
                    </span>
                    <span>
                      <span className="font-body font-medium text-primary text-sm">{h.titel}</span>
                      <span className="font-body font-light text-text-soft text-sm">
                        {" "}
                        {h.tekst}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="font-body font-light text-text-soft text-sm leading-relaxed mt-5">
              Geen spreadsheet vol grafieken. Wel een helder antwoord op de vraag: wat moet ik nu
              doen?
            </p>
          </div>
        </section>

        {/* ── 7. Waarmee ik vergelijk ─────────────────────────── */}
        <section className="bg-card py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-3">
              Waarmee ik jouw cijfers vergelijk, en waarmee niet
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed max-w-2xl mb-2">
              Op inkomen, huishouden en autosituatie. Niet op naam van je bank, en niet op
              Nibud-minimumbudgetten.
            </p>
            <details className="max-w-2xl">
              <summary
                className="font-body font-medium text-sm cursor-pointer select-none"
                style={{ color: "#0B7A6E" }}
              >
                Lees de volledige methode &rarr;
              </summary>
              <div className="space-y-4 mt-4">
                <p className="font-body font-light text-text-soft leading-relaxed">
                  De vergelijking kijkt naar je netto huishoudinkomen, het aantal volwassenen, het
                  aantal kinderen en je autosituatie. Dat is genoeg om te zien of een post uit de
                  toon valt. Het is niet genoeg om te weten waarom.
                </p>
                <p className="font-body font-light text-text-soft leading-relaxed">
                  Wisselt je inkomen per maand, dan vul je een gemiddelde over de laatste maanden
                  in. Voor de vergelijking is dat genoeg, en het verschil tussen je maanden is
                  juist iets waar ik naar vraag: bij een wisselend inkomen is de vraag zelden wat
                  je gemiddeld verdient, maar welke vaste structuur eronder ligt.
                </p>
                <p className="font-body font-light text-text-soft leading-relaxed">
                  De bedragen waarmee ik vergelijk komen niet uit openbare gemiddelden, maar uit de
                  huishoudens die ik zelf heb doorgerekend. Nibud-referentiebudgetten gebruik ik
                  bewust niet: dat zijn grotendeels minimumbudgetten, en die meten iets anders dan
                  wat een huishouden met een goed inkomen werkelijk uitgeeft.
                </p>
                <p className="font-body font-light text-text-soft leading-relaxed">
                  Waar de vergelijking niets van weet: de leeftijd van je kinderen, je regio,
                  hoeveel dagen de kinderen bij je zijn, alimentatie, hoeveel je hebt afgelost en of
                  je auto zakelijk is. Dat komt uit wat jij erbij schrijft, en daar vraag ik naar.
                  Wat jij daar opschrijft weegt zwaarder dan wat het gemiddelde zegt.
                </p>
              </div>
            </details>
          </div>
        </section>

        {/* ── 8. Voor wie ────────────────────────────────────── */}
        <section className="bg-background py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-3">
              Voor wie is de geldscan?
            </h2>
            <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-8">
              Achter elke kaart staat een echt rapport van een huishouden in die situatie. Kies de
              situatie die op jou lijkt en lees eerst wat eruit kwam.
            </p>

            <div className="space-y-3">
              {situatieKaarten.map((s) => {
                const rapport = RAPPORTEN.find((r) => r.slug === s.rapport);
                const uitgelicht = situatie?.sleutel === s.sleutel;
                return (
                  <Link
                    key={s.sleutel}
                    href={`/rapporten/${s.rapport}`}
                    className="card-base border border-[#E6E9E7] flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 transition-shadow hover:shadow-card-hover"
                    style={{
                      textDecoration: "none",
                      borderLeft: uitgelicht ? "3px solid #0B7A6E" : "1px solid #E6E9E7",
                    }}
                  >
                    <span className="sm:w-52 shrink-0">
                      <span className="font-body font-medium text-primary text-sm block">
                        {s.kaartTitel}
                      </span>
                    </span>
                    <span className="font-body font-light text-sm text-text-soft leading-relaxed flex-1">
                      {s.kaartTekst}
                      {rapport && (
                        <span className="block font-body text-text-muted text-xs mt-1">
                          Uitkomst: {rapport.uitkomstKop.toLowerCase()}
                        </span>
                      )}
                    </span>
                    <span
                      className="font-body font-medium text-sm shrink-0"
                      style={{ color: "#0B7A6E" }}
                    >
                      Bekijk rapport &rarr;
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 9. Je hoeft niet alles te weten ─────────────────── */}
        <section className="bg-card py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-5">
              Je hoeft je financiën niet perfect te kennen
            </h2>
            <div className="space-y-4 max-w-2xl mb-8">
              <p className="font-body font-light text-text-soft leading-relaxed">
                Je hoeft geen spreadsheet te hebben. Je hoeft niet precies te weten wat je vorige
                maand aan boodschappen hebt uitgegeven. Schattingen zijn prima, en waar een
                schatting te onzeker is, zeg ik dat.
              </p>
              <p className="font-body font-light text-text-soft leading-relaxed">
                Wil je dat ik preciezer kijk? Dan kun je een paar recente bankafschriften
                meesturen. Dat is optioneel.
              </p>
            </div>

            <div className="card-base border border-[#E6E9E7]">
              <div className="flex items-start gap-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0B7A6E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-0.5"
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <div>
                  <p className="font-body font-medium text-primary text-sm mb-3">
                    Als je afschriften meestuurt
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Alleen jij en ik zien ze, er kijkt geen team of algoritme mee",
                      "Rekeningnummers mag je wegstrepen",
                      "Namen van anderen mag je wegstrepen",
                      "Ik heb alleen de bedragen en de soort uitgave nodig",
                      "Direct na het versturen van je rapport verwijder ik ze, je hoeft daar niet om te vragen",
                    ].map((r) => (
                      <li
                        key={r}
                        className="font-body font-light text-sm text-text-soft leading-relaxed flex gap-3"
                      >
                        <span aria-hidden="true" style={{ color: "#0B7A6E" }}>
                          &bull;
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. Wat er daarna gebeurt ───────────────────────── */}
        <section className="bg-background py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-8">
              Wat er daarna gebeurt
            </h2>

            <ol className="space-y-0">
              {[
                {
                  wanneer: "Vandaag",
                  wat: "Je vraagt de geldscan aan met je naam en e-mailadres. Verder nog niets.",
                },
                {
                  wanneer: "Binnen 1 werkdag",
                  wat: "Ik stuur je een betaalverzoek van €49, altijd vanaf hallo@waarblijfthet.nl. Er is geen abonnement en geen automatische incasso.",
                },
                {
                  wanneer: "Daarna",
                  wat: "Je levert je cijfers en je context aan, dat kost twee minuten. Optioneel stuur je afschriften mee.",
                },
                {
                  wanneer: "Binnen 2 werkdagen",
                  wat: "Ik stuur je je persoonlijke rapport als PDF. Een vraag erover beantwoord ik gewoon per mail.",
                },
                {
                  wanneer: "Direct daarna",
                  wat: "Ik verwijder je afschriften en je aangeleverde gegevens. Er blijft niets bewaard.",
                },
                {
                  wanneer: "Vanaf dan",
                  wat: "Je kunt zelf aan de slag. Wil je dat ik je help met de volgende stap, dan kun je een gesprek of een traject kiezen en trek ik de €49 daarvan af. Dat hoeft niet, en ik kom er niet op terug.",
                },
              ].map((t, i, arr) => (
                <li key={t.wanneer} className="flex gap-5">
                  <div className="flex flex-col items-center shrink-0" aria-hidden="true">
                    <span
                      className="rounded-full"
                      style={{
                        width: "10px",
                        height: "10px",
                        backgroundColor: "#0B7A6E",
                        marginTop: "0.4rem",
                      }}
                    />
                    {i < arr.length - 1 && (
                      <span style={{ width: "1px", flex: 1, backgroundColor: "#E6E9E7" }} />
                    )}
                  </div>
                  <div className={i < arr.length - 1 ? "pb-7" : ""}>
                    <p className="font-body font-medium text-primary text-sm mb-1">{t.wanneer}</p>
                    <p className="font-body font-light text-sm text-text-soft leading-relaxed">
                      {t.wat}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 11. Prijs ──────────────────────────────────────── */}
        <section id="prijs" className="bg-card py-16" style={{ scrollMarginTop: "90px" }}>
          <div className="max-w-3xl mx-auto px-6">
            <div className="card-base border border-[#E6E9E7]">
              <p
                className="font-display font-light text-primary mb-2"
                style={{ fontSize: "2.75rem", lineHeight: 1.1, letterSpacing: "-0.02em" }}
              >
                €49 eenmalig
              </p>
              <p className="font-body font-light text-text-soft leading-relaxed mb-8">
                Voor een persoonlijk geldrapport dat ik zelf schrijf.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="section-eyebrow mb-4">Inbegrepen</p>
                  <ul className="space-y-2.5">
                    {[
                      "Persoonlijke analyse van jouw cijfers",
                      "Vergelijking met jouw eigen situatie",
                      "Mijn conclusies, in gewone taal",
                      "Wat níét het probleem is",
                      "Een concreet plan van aanpak",
                      "Binnen 2 werkdagen na je cijfers",
                    ].map((r) => (
                      <li
                        key={r}
                        className="font-body font-light text-sm text-text-soft leading-relaxed flex gap-3"
                      >
                        <span aria-hidden="true" style={{ color: "#0B7A6E" }}>
                          &#10003;
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="section-eyebrow mb-4">Niet inbegrepen</p>
                  <ul className="space-y-2.5">
                    {[
                      "Een abonnement",
                      "Een verplicht gesprek",
                      "Financiële producten",
                      "Beleggingsadvies",
                      "Hypotheekadvies",
                    ].map((r) => (
                      <li
                        key={r}
                        className="font-body font-light text-sm text-text-muted leading-relaxed flex gap-3"
                      >
                        <span aria-hidden="true" style={{ color: "#C6CCC9" }}>
                          &#10007;
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-7" style={{ borderTop: "1px solid #E6E9E7" }}>
                <PrimaireCta locatie="geldscan-watjekrijgt" />
                <p className="font-body font-light text-text-soft text-sm mt-4 leading-relaxed">
                  Al uit je analyse en wil je dat ik persoonlijk naar het waarom kijk? Dan is de
                  Geldscan €49.
                </p>
                <p className="mt-2 mb-0">
                  <GeldscanAanvraag />
                </p>
                <p className="font-body font-light text-text-muted text-xs mt-4 leading-relaxed">
                  Je hoeft geen gesprek te boeken en geen vervolgtraject te nemen. Je krijgt het
                  rapport en bepaalt daarna zelf wat je ermee doet.
                </p>
                <p className="font-body font-light text-text-muted text-xs mt-2 leading-relaxed">
                  Wil je daarna verder met mij? Dan verreken ik deze €49 met een adviesgesprek of
                  traject.
                </p>
              </div>
            </div>

            {/* ── 12. Prijsobstakel ─────────────────────────── */}
            <div
              className="card-base border border-[#E6E9E7] mt-5"
              style={{ borderLeft: "3px solid #0B7A6E" }}
            >
              <p className="font-body font-medium text-primary text-base mb-3">
                Twijfel je of €49 het waard is?
              </p>
              <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-3">
                Daar is de gratis analyse voor. Die laat zien waar jouw bedragen afwijken van
                huishoudens in dezelfde situatie. Dat kost je een paar minuten en verder niets.
              </p>
              <p className="font-body font-light text-sm text-text-soft leading-relaxed mb-5">
                Denk je daarna: ik wil weten wáárom mijn cijfers zo uitpakken, dan is de geldscan de
                volgende stap. Denk je dat niet, dan heb je alsnog je antwoord.
              </p>
              <PrimaireCta locatie="geldscan-prijsobstakel" />
            </div>
          </div>
        </section>

        {/* ── 13. FAQ ────────────────────────────────────────── */}
        <section className="bg-background py-16">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-8">
              Veelgestelde vragen
            </h2>
            <div className="space-y-3">
              {faq.map((f) => (
                <details key={f.vraag} className="card-base border border-[#E6E9E7]">
                  <summary className="font-body font-medium text-primary text-sm cursor-pointer select-none">
                    {f.vraag}
                  </summary>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed mt-3">
                    {f.antwoord}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── 14. Laatste CTA ────────────────────────────────── */}
        <section className="bg-dark-block py-20">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-2xl sm:text-4xl mb-6 leading-snug">
              Je hoeft niet nog een jaar te denken: waar blijft het?
            </h2>
            <p className="text-white/70 font-body font-light text-base leading-relaxed mb-8">
              Je hoeft ook niet meteen alles om te gooien, en je hoeft het niet in je eentje uit te
              zoeken. Ik kijk er van buitenaf naar en schrijf op wat er werkelijk aan de hand is.
            </p>
            <PrimaireCta dark locatie="geldscan-slot" />
            <p className="text-white/50 font-body font-light text-xs mt-4">
              Je kunt daarna altijd nog besluiten of je de Geldscan wilt.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
