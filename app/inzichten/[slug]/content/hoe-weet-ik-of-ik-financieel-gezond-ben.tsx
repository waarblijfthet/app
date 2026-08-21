import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";
import { rapportVoorSlug } from "@/lib/rapporten-data";

const WINE = "#7B2D3E";
const GOLD = "#C9952A";
const OFFWHITE = "#F8F6F2";
const DARK = "#202020";
const SOFT = "#666666";

const h2 = {
  fontSize: "clamp(1.9rem, 4vw, 2.5rem)",
  color: WINE,
  marginTop: "3rem",
  marginBottom: "1.25rem",
  fontWeight: 300,
  lineHeight: 1.15,
} as const;

const h3 = {
  fontSize: "1.4rem",
  color: DARK,
  marginBottom: "0.6rem",
  fontWeight: 500,
  lineHeight: 1.3,
} as const;

const p = {
  color: SOFT,
  fontSize: "1.0625rem",
  lineHeight: 1.75,
  marginBottom: "1.25rem",
  fontWeight: 300,
} as const;

const pStrong = { ...p, color: DARK, fontWeight: 400 } as const;

const linkStyle = { color: WINE, textDecoration: "underline", fontWeight: 500 } as const;

const TEGELS = [
  { titel: "Inkomen", tekst: "Wat komt er structureel binnen?" },
  { titel: "Uitgaven", tekst: "Wat kost je huishouden werkelijk?" },
  { titel: "Ruimte", tekst: "Wat blijft er structureel over?" },
  { titel: "Buffer en vermogen", tekst: "Kun je tegenvallers opvangen en iets opbouwen?" },
];

const HOOG_INKOMEN_RISICOS = [
  "hoge vaste lasten",
  "weinig spaargeld",
  "nauwelijks structurele vrije ruimte",
  "hoge schulden",
  "geen financiële planning",
];

const SIGNALEN = [
  {
    titel: "Je weet wat er werkelijk binnenkomt",
    tekst:
      "Niet alleen je bruto salaris. Je weet wat er gemiddeld netto beschikbaar is voor je huishouden en houdt rekening met inkomsten die kunnen variëren. Bij twee inkomens kijk je naar het gezamenlijke plaatje. Bij wisselende inkomsten kijk je niet alleen naar je beste maanden.",
  },
  {
    titel: "Je weet wat je huishouden structureel kost",
    tekst:
      "Je kent niet alleen je hypotheek of huur. Je hebt ook zicht op energie, verzekeringen, vervoer, boodschappen, kinderopvang, abonnementen, sport, vakanties, jaarlijkse uitgaven en andere structurele verplichtingen. Dat betekent niet dat iedere uitgave apart in een spreadsheet moet staan. Wel dat je niet iedere maand verbaasd bent over waar je geld gebleven is.",
  },
  {
    titel: "Er blijft structureel ruimte over",
    tekst:
      "Dit is misschien wel het belangrijkste signaal. Niet: “er stond op de laatste dag van de maand toevallig €900 op mijn rekening.” Maar: “na alles wat we normaal gesproken uitgeven, creëren we structureel ruimte.” Die ruimte kan vervolgens naar sparen, extra aflossen, beleggen, vakantie, vrije besteding of andere doelen. Wat je ermee doet is een tweede vraag. Eerst moet je weten of die ruimte er werkelijk is.",
  },
  {
    titel: "Een onverwachte rekening maakt je maand niet kapot",
    tekst:
      "Een financiële buffer is bedoeld om onverwachte uitgaven op te vangen, zoals een kapotte auto, wasmachine of andere noodzakelijke kosten. Hoe groot die buffer moet zijn, verschilt per huishouden. Nibud heeft daar een eigen BufferBerekenaar voor, waarbij onder andere huishouden, inkomen, woning en autobezit worden meegenomen. Het belangrijkste punt is niet een universeel bedrag. Het is dat een tegenvaller niet automatisch betekent: “hoe gaan we dit deze maand oplossen?”",
  },
  {
    titel: "Je hoeft niet iedere maand je spaargeld terug te pakken",
    tekst:
      "Sparen heeft weinig betekenis als je het iedere paar weken weer moet gebruiken voor gewone uitgaven. Een goede financiële situatie betekent niet dat je nooit spaargeld gebruikt. Wel dat het onderscheid duidelijk is tussen sparen voor doelen, en sparen omdat je maandbudget eigenlijk niet klopt.",
  },
  {
    titel: "Je financiële plannen passen bij je huidige situatie",
    tekst:
      "Misschien wil je eerder stoppen met werken, minder werken, een groter huis, kinderen ondersteunen, meer reizen of vermogen opbouwen. Dan moet je huidige financiële situatie daar uiteindelijk bij aansluiten. Financiële gezondheid gaat daarom niet alleen over vandaag. Ook plannen voor de toekomst zijn onderdeel van het geheel.",
  },
  {
    titel: "Je begrijpt waar je geld naartoe gaat",
    tekst:
      "Dit is iets anders dan alles bijhouden. Je kunt exact weten dat je in augustus €6.742,18 hebt uitgegeven en toch geen idee hebben of dat financieel logisch is. Je hebt dan overzicht, maar nog niet noodzakelijk inzicht. Een bankapp kan je vertellen dat je €1.150 aan boodschappen hebt uitgegeven. Maar hij vertelt je meestal niet of dat veel is voor een huishouden als het jouwe.",
  },
];

const GOED_INKOMEN_RISICOS = [
  "hogere woonlasten",
  "duurdere auto's",
  "meer vakanties",
  "hogere vaste lasten",
  "meer vrij besteedbare uitgaven",
  "grotere financiële verplichtingen",
];

const PATRONEN = [
  {
    titel: "Je inkomen stijgt, maar je spaargeld nauwelijks",
    tekst: "Je verdient steeds meer, maar creëert niet meer ruimte.",
  },
  {
    titel: "Je moet regelmatig spaargeld aanspreken",
    tekst: "Niet voor uitzonderlijke gebeurtenissen, maar voor gewone uitgaven.",
  },
  {
    titel: "Je weet hoeveel je uitgeeft, maar niet of het normaal is",
    tekst: "Je hebt veel cijfers, maar geen context.",
  },
  {
    titel: "Je hebt geen schulden, maar voelt voortdurend financiële druk",
    tekst: "Dat is geen klassieke schuldensituatie. Maar financiële rust ontbreekt wel.",
  },
];

const RAPPORT = rapportVoorSlug("stel-zonder-kinderen");

export default function HoeWeetIkOfIkFinancieelGezondBen() {
  return (
    <>
      <p className="font-body" style={{ ...pStrong, fontSize: "1.2rem" }}>
        Een goed inkomen, geen schulden en toch twijfelen of je financieel goed bezig bent? Dan kijk
        je waarschijnlijk naar de verkeerde cijfers.
      </p>

      <p className="font-body" style={p}>
        Je kunt goed verdienen en toch financieel ongezond bezig zijn. Maar het omgekeerde kan ook:
        je kunt minder verdienen dan iemand uit je omgeving, maar financieel veel meer ruimte hebben.
        Daarom zegt alleen je inkomen weinig over je financiële gezondheid.
      </p>
      <p className="font-body" style={pStrong}>
        Een financieel gezond huishouden heeft niet per se een hoog salaris, een groot vermogen of
        een enorme spaarrekening. Het gaat om het geheel: wat komt er binnen, wat gaat eruit, hoeveel
        ruimte blijft er over, wat kun je opvangen als er iets gebeurt, en lukt het om plannen voor
        later te maken?
      </p>
      <p className="font-body" style={p}>
        Dat klinkt logisch. Toch kijken veel mensen maar naar één onderdeel: hun salaris, hun
        spaargeld, of hun maandelijkse uitgaven. En daar ontstaat precies het probleem.
      </p>
      <p className="font-body" style={pStrong}>
        Je kunt financieel gezond zijn en toch weinig vermogen hebben. Je kunt goed verdienen en toch
        weinig financiële ruimte hebben. Daarom is &ldquo;financieel gezond&rdquo; niet één getal.
      </p>

      <h2 className="font-display" style={h2}>
        Wat betekent financieel gezond eigenlijk?
      </h2>
      <p className="font-body" style={p}>
        Financiële gezondheid is geen enkel getal. Onderzoek naar financiële gezondheid kijkt daarom
        naar meerdere onderdelen van een huishouden. Deloitte, Nibud en academische onderzoekers van
        Tilburg University en Universiteit Leiden gebruiken in hun onderzoek naar de financiële
        gezondheid van Nederlandse huishoudens vijf samenhangende domeinen: inkomen, uitgaven, sparen,
        lenen en plannen.
      </p>
      <p className="font-body" style={p}>
        Dat is belangrijk, want één sterk onderdeel kan een zwak onderdeel niet altijd compenseren.
        Een hoog inkomen kan bijvoorbeeld samengaan met:
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {HOOG_INKOMEN_RISICOS.map((item) => (
          <span
            key={item}
            className="font-body text-sm rounded-full px-3 py-1.5"
            style={{ backgroundColor: OFFWHITE, color: DARK, border: `1px solid ${GOLD}` }}
          >
            {item}
          </span>
        ))}
      </div>
      <p className="font-body" style={p}>
        Dan ziet het inkomen er gezond uit, maar het totale plaatje hoeft dat niet te zijn. Andersom
        kan iemand met een lager inkomen relatief veel financiële rust hebben als de uitgaven laag
        zijn, er een goede buffer is en er structureel ruimte ontstaat. Het CBS beschrijft de
        materiële welvaartspositie van een huishouden daarom ook als het samenspel tussen inkomen,
        bestedingen en vermogen. Financiële gezondheid is dus geen salariswedstrijd.
      </p>

      {/* Vier tegels */}
      <p className="font-body font-medium text-xs uppercase tracking-wide mb-3" style={{ color: WINE, letterSpacing: "0.08em" }}>
        Kijk niet naar één getal
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
        {TEGELS.map((t) => (
          <div key={t.titel} className="rounded-xl p-4" style={{ backgroundColor: OFFWHITE, borderTop: `3px solid ${GOLD}` }}>
            <p className="font-display" style={{ color: WINE, fontSize: "1.05rem", fontWeight: 500, marginBottom: "0.4rem" }}>
              {t.titel}
            </p>
            <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>{t.tekst}</p>
          </div>
        ))}
      </div>
      <p className="font-body text-sm" style={{ color: SOFT, marginBottom: "1rem" }}>
        Pas samen vertellen deze cijfers iets over je financiële situatie.
      </p>
      <p className="font-body" style={{ ...pStrong, marginBottom: "2rem" }}>
        De vraag is uiteindelijk niet alleen of je financieel gezond bent. De vraag is of jouw
        financiële situatie logisch is voor jouw inkomen, huishouden en doelen.
      </p>

      <h2 className="font-display" style={h2}>
        Zeven signalen dat je financieel gezond bezig bent
      </h2>
      <p className="font-body" style={p}>
        Je hoeft niet op ieder onderdeel perfect te scoren. Maar als je onderstaande signalen
        grotendeels herkent, staat je financiële basis waarschijnlijk redelijk sterk.
      </p>
      {SIGNALEN.map((s, i) => (
        <div key={s.titel} className="mb-6">
          <div className="flex items-start gap-3">
            <span
              className="flex-shrink-0 rounded-full flex items-center justify-center font-display"
              style={{ width: "2rem", height: "2rem", backgroundColor: WINE, color: "#FFFFFF", fontSize: "0.95rem" }}
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-display" style={h3}>{s.titel}</h3>
              <p className="font-body" style={{ ...p, marginBottom: 0 }}>{s.tekst}</p>
            </div>
          </div>
        </div>
      ))}
      <p className="font-body" style={pStrong}>
        Zelfs als je op veel van deze punten goed scoort, weet je daarmee nog niet of je financiële
        situatie relatief ruim, gemiddeld of krap is voor een huishouden zoals het jouwe.
      </p>
      <p className="font-body" style={p}>
        Dat is precies de context die een algemene checklist mist.
      </p>

      <SalarisRekenaar
        startInkomen={5500}
        startVolwassenen={2}
        startKinderen={1}
        startAuto="eigen"
        kop="Reken uit hoeveel structurele ruimte er bij jouw huishouden zou overblijven"
        intro="Vul je eigen inkomen en huishouden in. Je ziet wat ik bij een huishouden zoals dat van jou als structurele ruimte zou verwachten, precies het derde signaal hierboven."
      />

      <h2 className="font-display" style={h2}>
        Kun je financieel gezond zijn zonder veel te sparen?
      </h2>
      <p className="font-body" style={p}>
        Ja. En ook hier is context belangrijk.
      </p>
      <p className="font-body text-xs uppercase tracking-wide" style={{ color: WINE, marginBottom: "0.75rem", letterSpacing: "0.06em" }}>
        Twee fictieve huishoudens, ter illustratie, geen landelijk gemiddelde
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
        <div className="rounded-xl p-5" style={{ backgroundColor: "#FFFFFF", border: `1.5px solid ${WINE}` }}>
          <p className="font-display" style={{ color: WINE, fontSize: "1.15rem", fontWeight: 500, marginBottom: "0.75rem" }}>
            Huishouden A
          </p>
          {[
            ["Netto inkomen", "€8.000"],
            ["Structurele uitgaven", "€7.000"],
          ].map(([label, bedrag]) => (
            <div key={label} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${OFFWHITE}` }}>
              <span className="font-body text-sm" style={{ color: SOFT }}>{label}</span>
              <span className="font-body text-sm" style={{ color: DARK, fontWeight: 500 }}>{bedrag}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3">
            <span className="font-body text-sm font-medium" style={{ color: DARK }}>Ruimte</span>
            <span className="font-display" style={{ color: GOLD, fontSize: "1.3rem" }}>€1.000</span>
          </div>
        </div>
        <div className="rounded-xl p-5" style={{ backgroundColor: "#FFFFFF", border: `1.5px solid ${WINE}` }}>
          <p className="font-display" style={{ color: WINE, fontSize: "1.15rem", fontWeight: 500, marginBottom: "0.75rem" }}>
            Huishouden B
          </p>
          {[
            ["Netto inkomen", "€6.000"],
            ["Structurele uitgaven", "€4.500"],
          ].map(([label, bedrag]) => (
            <div key={label} className="flex justify-between py-1.5" style={{ borderBottom: `1px solid ${OFFWHITE}` }}>
              <span className="font-body text-sm" style={{ color: SOFT }}>{label}</span>
              <span className="font-body text-sm" style={{ color: DARK, fontWeight: 500 }}>{bedrag}</span>
            </div>
          ))}
          <div className="flex justify-between pt-3">
            <span className="font-body text-sm font-medium" style={{ color: DARK }}>Ruimte</span>
            <span className="font-display" style={{ color: GOLD, fontSize: "1.3rem" }}>€1.500</span>
          </div>
        </div>
      </div>
      <p className="font-body" style={{ ...p, marginTop: "1rem" }}>
        Huishouden A verdient aanzienlijk meer. Huishouden B creëert iedere maand echter meer
        structurele ruimte. Dat betekent niet automatisch dat B financieel &ldquo;beter&rdquo; bezig
        is. Misschien wil A veel meer uitgeven aan wonen, reizen of kinderen. De relevante vraag is:
        past de financiële situatie bij wat dit huishouden wil bereiken? Wil je dit met je eigen
        bedragen doorrekenen in plaats van met een schuif, gebruik dan mijn{" "}
        <Link href="/inzichten/hoeveel-financiele-ruimte-heb-ik" style={linkStyle}>
          rekenhulp voor financiële ruimte
        </Link>
        , of lees wat er volgens de richtlijnen{" "}
        <Link href="/inzichten/hoeveel-geld-overhouden-einde-maand" style={linkStyle}>
          aan het einde van de maand zou moeten overblijven
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Kun je een goed inkomen hebben en toch financieel ongezond zijn?
      </h2>
      <p className="font-body" style={pStrong}>
        Absoluut. Dit is waarschijnlijk de belangrijkste misvatting voor mensen die goed verdienen.
      </p>
      <p className="font-body" style={p}>
        Een goed inkomen kan veel financiële ruimte creëren. Maar een hoger inkomen kan ook
        samengaan met:
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {GOED_INKOMEN_RISICOS.map((item) => (
          <span
            key={item}
            className="font-body text-sm rounded-full px-3 py-1.5"
            style={{ backgroundColor: OFFWHITE, color: DARK, border: `1px solid ${GOLD}` }}
          >
            {item}
          </span>
        ))}
      </div>
      <p className="font-body" style={p}>
        Het inkomen stijgt dan sneller dan het vermogen, of sneller dan de financiële ruimte. Je
        verdient dus goed, maar je financiële situatie wordt niet automatisch evenredig sterker. Hoe
        dat kan terwijl er niets geks aan de hand is, staat in{" "}
        <Link href="/inzichten/goed-inkomen-weinig-vermogen" style={linkStyle}>
          waarom een goed inkomen niet automatisch vermogen oplevert
        </Link>
        . Woon je alleen, dan telt dit effect vaak nog directer door, zonder een tweede inkomen om het
        op te vangen, zie ook{" "}
        <Link href="/inzichten/alleen-wonen-goed-salaris-toch-krap" style={linkStyle}>
          een goed salaris als alleenstaande en toch krap zitten
        </Link>
        . Werk je als zzp&apos;er met een wisselend inkomen, dan rekent dat bovendien anders dan een
        vast salaris, zie{" "}
        <Link href="/inzichten/kosten-levensonderhoud-zzp-alleenstaande-2026" style={linkStyle}>
          kosten levensonderhoud voor zzp&apos;ers
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wanneer lijkt je financiële situatie gezond, maar is er toch iets aan de hand?
      </h2>
      <p className="font-body" style={p}>Let vooral op deze patronen.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {PATRONEN.map((pat) => (
          <div key={pat.titel} className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", borderLeft: `3px solid ${WINE}` }}>
            <p className="font-body text-sm font-medium mb-1" style={{ color: DARK }}>{pat.titel}</p>
            <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>{pat.tekst}</p>
          </div>
        ))}
      </div>
      <p className="font-body" style={p}>
        Denk je regelmatig: &ldquo;we verdienen toch goed, waar blijft het geld?&rdquo; Dan kan er een
        mismatch zitten tussen je inkomen, je verwachtingen en je werkelijke financiële ruimte.
      </p>

      {/* Merkstatement */}
      <div className="rounded-2xl p-6 sm:p-10 my-8" style={{ backgroundColor: WINE }}>
        <h2 className="font-display" style={{ color: "#FFFFFF", fontSize: "clamp(1.9rem, 4vw, 2.5rem)", fontWeight: 300, marginBottom: "1.25rem" }}>
          Misschien is er helemaal niets mis.
        </h2>
        <p className="font-body" style={{ color: "#FFFFFF", opacity: 0.92, marginBottom: "1rem", fontWeight: 300, fontSize: "1.0625rem", lineHeight: 1.75 }}>
          Een huishouden kan veel uitgeven en toch financieel gezond zijn. Een ander huishouden kan
          weinig uitgeven en toch nauwelijks ruimte hebben. Daarom zoekt Waar blijft het? niet
          automatisch naar drie dingen waarop je zou moeten bezuinigen. De eerste vraag is: wat
          gebeurt er hier eigenlijk?
        </p>
        <p className="font-body" style={{ color: "#FFFFFF", fontWeight: 400, fontSize: "1.0625rem", marginBottom: 0 }}>
          Als de cijfers logisch zijn, mag de conclusie ook zijn dat er financieel niets geks aan de
          hand is. Dat is geen mislukte analyse, dat is een antwoord.
        </p>
      </div>

      {RAPPORT && (
        <p className="font-body" style={p}>
          Bij de vijf huishoudens die ik zelf heb doorgerekend, was dit precies wat er gebeurde bij
          een stel zonder kinderen, {RAPPORT.kenmerken[RAPPORT.kenmerken.length - 1]}. Vooraf dachten
          zij zelf iets te missen: &ldquo;{RAPPORT.vermoeden}&rdquo; {RAPPORT.vermoedenBedrag} Mijn
          conclusie: &ldquo;{RAPPORT.uitkomstKop}.&rdquo; {RAPPORT.uitkomst}{" "}
          <Link href={`/rapporten/${RAPPORT.slug}`} style={linkStyle}>
            Lees hun volledige rapport
          </Link>
          .
        </p>
      )}

      <h2 className="font-display" style={h2}>
        Waarom je jezelf niet aan één gemiddelde moet meten
      </h2>
      <p className="font-body" style={p}>
        Gemiddelden zijn nuttig voor context. Maar ze zijn slecht in het beantwoorden van persoonlijke
        vragen. Het CBS benadrukt dat verschillen tussen huishoudens groot zijn en dat materiële
        welvaart wordt bepaald door het samenspel van inkomen, bestedingen en vermogen.
      </p>
      <p className="font-body" style={p}>
        Een huishouden met twee inkomens, drie kinderen, een koopwoning en twee auto&apos;s is niet
        zonder meer vergelijkbaar met een huishouden met één inkomen, geen kinderen, een huurwoning en
        geen auto, zelfs wanneer beide huishoudens exact hetzelfde netto inkomen hebben. Een
        gemiddelde kan dus zeggen wat gebruikelijk is. Het kan niet automatisch zeggen wat voor jou
        passend is.
      </p>

      <h2 className="font-display" style={h2}>
        De vraag die je eigenlijk moet stellen
      </h2>
      <p className="font-body" style={p}>
        Misschien is de verkeerde vraag dus: &ldquo;ben ik financieel gezond?&rdquo; De betere vraag
        is: &ldquo;past mijn financiële situatie bij mijn inkomen, mijn huishouden en wat ik ermee wil
        bereiken?&rdquo;
      </p>
      <p className="font-body" style={p}>
        Daarvoor heb je meer nodig dan een salarisstrook. Je moet weten wat er werkelijk binnenkomt,
        wat je huishouden structureel kost, hoeveel ruimte er overblijft, hoe vaak je spaargeld nodig
        hebt, welke doelen je hebt, en hoe je situatie zich verhoudt tot vergelijkbare huishoudens.
        Dat is precies waar een algemene financiële checklist ophoudt.
      </p>

      <div className="rounded-2xl p-6 sm:p-8 my-8" style={{ backgroundColor: WINE }}>
        <p className="font-display font-light" style={{ color: "#FFFFFF", fontSize: "1.5rem", marginBottom: "0.75rem" }}>
          Hoe ziet dit er bij jouw huishouden uit?
        </p>
        <p className="font-body" style={{ color: "#FFFFFF", opacity: 0.92, fontWeight: 300, marginBottom: "1.25rem" }}>
          De gratis analyse laat zien waar jouw financiële situatie afwijkt en welke categorieën
          relatief opvallen.
        </p>
        <Link
          href="/analyse"
          className="inline-flex items-center justify-center font-body text-sm font-medium"
          style={{ color: WINE, backgroundColor: "#FFFFFF", borderRadius: "10px", padding: "0.85rem 1.5rem", textDecoration: "none" }}
        >
          Doe de gratis analyse &rarr;
        </Link>
        <p className="font-body text-xs mt-3 mb-0" style={{ color: "#FFFFFF", opacity: 0.8 }}>
          Gratis · vertrouwelijk · geen verkoopgesprek
        </p>
      </div>

      <h2 className="font-display" style={h2}>
        Wat krijg je niet uit een simpele financiële check?
      </h2>
      <p className="font-body" style={p}>
        Een checklist kan je vertellen dat je een buffer nodig hebt. Een budgetregel kan zeggen: spaar
        10 procent. Een bankapp kan tonen dat je €1.200 uitgaf aan boodschappen. Maar geen van die
        dingen vertelt automatisch of dit voor jouw huishouden eigenlijk normaal is. Daar ligt het
        verschil tussen cijfers bekijken en cijfers begrijpen. Wat een normale vuistregel voor een
        hoger inkomen is, lees je in mijn uitleg van de{" "}
        <Link href="/inzichten/50-30-20-regel-hoger-inkomen" style={linkStyle}>
          50/30/20-regel bij een hoger inkomen
        </Link>
        , en hoeveel sparen normaal is staat in{" "}
        <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={linkStyle}>
          hoeveel sparen per maand normaal is
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wanneer is de Geldscan interessant?
      </h2>
      <p className="font-body" style={pStrong}>
        Eerst ontdekken wat er bij jou gebeurt. Daarna beslis je of je wilt weten waarom.
      </p>
      <p className="font-body" style={p}>
        De gratis analyse laat zien waar jouw situatie afwijkt van vergelijkbare huishoudens. Geen
        account, geen bankkoppeling, een paar minuten. Je hoeft nog niets te kopen.
      </p>
      <Link
        href="/analyse"
        className="inline-flex items-center justify-center font-body text-sm font-medium"
        style={{ color: "#FFFFFF", backgroundColor: WINE, borderRadius: "10px", padding: "0.85rem 1.5rem", textDecoration: "none" }}
      >
        Doe de gratis analyse &rarr;
      </Link>
      <p className="font-body" style={{ ...p, marginTop: "0.85rem", marginBottom: "2rem" }}>
        <Link href="/geldscan" className="hover:underline" style={{ color: WINE, textDecoration: "none" }}>
          Wil je na de analyse weten waarom jouw situatie zo uitpakt? Bekijk de Geldscan &rarr;
        </Link>
      </p>

      <p className="font-body" style={pStrong}>
        Financieel gezond betekent niet dat je alles perfect doet. Het betekent dat je begrijpt hoe je
        financiële situatie in elkaar zit. Je weet wat er binnenkomt. Je weet wat er structureel
        uitgaat. Je creëert voldoende ruimte voor je situatie. Je kunt tegenvallers opvangen. En je
        financiële keuzes passen bij wat je belangrijk vindt.
      </p>
      <p className="font-body" style={p}>
        Misschien betekent dat dat er iets moet veranderen. Maar misschien ook niet. Dat is precies
        wat je eerst moet uitzoeken.
      </p>

      <div className="rounded-2xl p-6 sm:p-10 my-8" style={{ backgroundColor: WINE }}>
        <p className="font-body" style={{ color: "#FFFFFF", fontWeight: 400, fontSize: "1.15rem", lineHeight: 1.6, marginBottom: 0 }}>
          Financiële gezondheid is geen score die je ergens kunt opzoeken. Je moet weten hoe jouw
          cijfers zich verhouden tot jouw werkelijkheid.
        </p>
      </div>
      <div className="rounded-2xl p-6 sm:p-8 my-6" style={{ backgroundColor: OFFWHITE, border: `1.5px solid ${GOLD}` }}>
        <Link
          href="/analyse"
          className="inline-flex items-center justify-center font-body text-sm font-medium"
          style={{ color: "#FFFFFF", backgroundColor: WINE, borderRadius: "10px", padding: "0.85rem 1.5rem", textDecoration: "none" }}
        >
          Doe de gratis analyse &rarr;
        </Link>
        <p className="font-body text-xs mt-3 mb-0" style={{ color: SOFT }}>
          Gratis · vertrouwelijk · geen verkoopgesprek
        </p>
      </div>
    </>
  );
}
