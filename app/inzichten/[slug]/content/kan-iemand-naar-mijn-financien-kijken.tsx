import Link from "next/link";
import HulpKeuzehulp from "@/components/artikel/HulpKeuzehulp";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import { RAPPORTEN, AANTAL_ZONDER_LEK, AANTAL_ZONDER_VERVOLG } from "@/lib/rapporten-data";
import { PAKKET_INFO } from "@/lib/aanbod-content";
import {
  AANTAL_AANBIEDERS,
  BAND_EENMALIG,
  BAND_TRAJECT,
  BAND_UUR,
  TARIEVEN_OPGEHAALD_TEKST,
  euroTarief,
  euroOngeveer,
  BRON_GEMEENTE_OSS,
  BRON_REGELHULP,
} from "@/lib/budgetcoach-tarieven";

/**
 * N4, herschreven op 25-sep-2026 op de term "budgetcoach zonder schulden"
 * (plan: docs/plan-coach-termen-ranken-25-sep-2026.md, item 3). De eerste
 * versie (6-sep-2026) stuurde op "iemand die naar mijn financien kijkt"; die
 * term blijft in de tekst, maar titel, H1 en de eerste H2's volgen nu de
 * PAA-vragen uit docs/serp-coach-woordveld-25-sep-2026.md.
 *
 * Intentiescheiding met de twee andere coachpagina's:
 *   wat-kost-een-financieel-coach  = wat het kost (de tarieventabellen)
 *   verschil-budgetcoach-financieel-coach = wie wat doet
 *   deze pagina = of een budgetcoach iets voor je is als je geen schulden hebt
 *
 * Elk bedrag van anderen komt uit lib/budgetcoach-tarieven.ts. De oude
 * bandbreedtes zonder bron (€60 tot €100 per uur, pakketten vanaf €250) zijn
 * weg. De Geldscan staat in het antwoordblok met prijs maar zonder link
 * (variant A); de enige Geldscan-link is het slotblok van page.tsx.
 *
 * Bronnen die ik op 25-sep-2026 opende: gemeente Oss (budgetcoaching voor
 * iedere inwoner, "weinig of veel verdient", "altijd gratis", "u houdt zelf de
 * regie") en Regelhulp van VWS (budgetcoach neemt niets over; budgetbeheer
 * betekent dat een instantie je geld beheert; vrijwilligers helpen gratis of
 * voor een klein bedrag).
 */

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

/** De eigen prijs komt uit lib/aanbod-content.ts, nooit met de hand getypt. */
const GELDSCAN_PRIJS = PAKKET_INFO.geldscan.prijs;
const GESPREK_PRIJS = PAKKET_INFO.gesprek.prijs;
const AANTAL_MET_LEK = RAPPORTEN.length - AANTAL_ZONDER_LEK;

function Bron({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={link} className="hover:underline">
      {children}
    </a>
  );
}

interface Optie {
  naam: string;
  voorWie: string;
  watJeKrijgt: string;
  watHetKost: string;
  watHetNiet: string;
  eigen?: boolean;
}

const OPTIES: Optie[] = [
  {
    naam: "Gemeente: budgetcoaching of schuldhulp",
    voorWie:
      "Schuldhulp is voor wie achterstanden heeft. Budgetcoaching staat bij sommige gemeenten open voor iedereen, ook zonder schulden.",
    watJeKrijgt:
      "Een intake, gesprekken en een overzicht van inkomsten en uitgaven; bij schulden zo nodig schuldbemiddeling. Elke gemeente richt dit zelf in.",
    watHetKost: "Meestal kosteloos. Vraag het bij je eigen gemeente.",
    watHetNiet:
      "Geen vergelijking met andere huishoudens, en het aanbod zonder schulden bestaat niet in elke gemeente.",
  },
  {
    naam: "Budgetcoach",
    voorWie:
      "Je wilt begeleiding over een langere periode, met iemand die meekijkt en je erop houdt.",
    watJeKrijgt:
      "Een losse check of een reeks gesprekken, een begroting en huiswerk tussendoor. Bij een deel van de aanbieders een gratis kennismaking.",
    watHetKost: `Een losse check ${euroTarief(BAND_EENMALIG.min)} tot ongeveer ${euroOngeveer(BAND_EENMALIG.max)}, een traject ${euroTarief(BAND_TRAJECT.min)} tot ongeveer ${euroOngeveer(BAND_TRAJECT.max)}, per uur ${euroTarief(BAND_UUR.min)} tot ${euroTarief(BAND_UUR.max)}.`,
    watHetNiet:
      "Geen doorrekening van producten, en zelden een vergelijking met vergelijkbare huishoudens.",
  },
  {
    naam: "Financieel planner of adviseur",
    voorWie:
      "Je staat voor een keuze over een product of over de langere termijn: hypotheek, pensioen, verzekering, vermogen.",
    watJeKrijgt:
      "Een doorrekening van scenario's en advies over producten, van iemand met een AFM-vergunning.",
    watHetKost:
      "Advieskosten die je rechtstreeks betaalt; ze mogen wettelijk niet in het product verwerkt zitten. Het bedrag staat in de dienstenwijzer van het kantoor.",
    watHetNiet:
      "Niet de plek voor de vraag waar je maandgeld blijft. Dit gaat over keuzes, niet over de maand.",
  },
  {
    naam: "De Geldscan",
    voorWie:
      "Je komt rond, er gaat niets mis, en er blijft toch minder over dan je zou verwachten.",
    watJeKrijgt:
      "Eerst de gratis vergelijking. Daarna een met de hand geschreven rapport: de drie dingen die het meest opvallen, plus wat juist niet uit de toon valt.",
    watHetKost: `${GELDSCAN_PRIJS}, binnen 2 werkdagen geleverd.`,
    watHetNiet:
      "Geen begeleiding over meerdere maanden, geen advies over producten, geen hulp bij schulden.",
    eigen: true,
  },
];

export default function KanIemandNaarMijnFinancienKijken() {
  return (
    <>
      {/* Antwoord bovenaan, CLAUDE.md 8.8. Variant A: Geldscan met prijs, zonder link. */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Ja, een budgetcoach is niet alleen voor mensen met schulden. Sommige gemeenten bieden budgetcoaching
        gratis aan voor iedere inwoner, of je nu weinig of veel verdient. Bij een betaalde budgetcoach kost een
        losse check {euroTarief(BAND_EENMALIG.min)} tot ongeveer {euroOngeveer(BAND_EENMALIG.max)} en een
        traject {euroTarief(BAND_TRAJECT.min)} tot ongeveer {euroOngeveer(BAND_TRAJECT.max)}. Wil je geen
        begeleiding maar alleen weten waar je geld blijft, dan kan dat ook met een vergelijking van je
        uitgaven met vergelijkbare huishoudens, gratis, en daarna een met de hand geschreven rapport voor{" "}
        {GELDSCAN_PRIJS}.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {TARIEVEN_OPGEHAALD_TEKST}. De tarieven komen van de eigen sites van{" "}
        {AANTAL_AANBIEDERS} aanbieders, op die dag door mij geopend; mijn eigen prijs staat er exact.
      </p>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Of je een budgetcoach mag inschakelen als je geen schulden hebt",
            "Wat een budgetcoach dan kost, en waar het gratis kan",
            "Of iemand eenmalig naar je uitgaven kan kijken, zonder traject",
            "Welke van vier soorten hulp bij jou past, met een keuzehulp van drie vragen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                &#10003;
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="font-display" style={h2}>
        Kun je budgetbegeleiding krijgen zonder schulden?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Ja. Een budgetcoach helpt je overzicht te krijgen in je inkomsten en uitgaven, en neemt daarbij niets
        van je over. Regelhulp van het ministerie van VWS omschrijft het zo: de budgetcoach ondersteunt je om
        het zelf te doen (<Bron href={BRON_REGELHULP}>Regelhulp</Bron>, geraadpleegd{" "}
        {TARIEVEN_OPGEHAALD_TEKST}). De gemeente Oss schrijft dat je bij budgetcoaching zelf de regie over je
        financi&euml;n houdt en dat de coach alleen meekijkt, en dat het voor iedere inwoner is, &quot;of u nu
        weinig of veel verdient&quot; (<Bron href={BRON_GEMEENTE_OSS}>gemeente Oss</Bron>, geraadpleegd{" "}
        {TARIEVEN_OPGEHAALD_TEKST}).
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is iets anders dan budgetbeheer. Bij budgetbeheer beheert een instantie je geld: je inkomen gaat
        naar een aparte rekening, de beheerder betaalt de vaste lasten en jij krijgt een afgesproken bedrag
        voor de dagelijkse uitgaven. Dat hoort meestal bij schulden, soms verplicht via de gemeente. Wie
        rondkomt en alleen wil weten waar het geld blijft, zoekt een budgetcoach en geen budgetbeheer.
      </p>

      <h2 className="font-display" style={h2}>
        Wat kost een budgetcoach als je geen schulden hebt?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De prijs hangt af van wat je afneemt: een losse check of een traject. In mijn steekproef van {AANTAL_AANBIEDERS} aanbieders kost een losse check {euroTarief(BAND_EENMALIG.min)} tot
        ongeveer {euroOngeveer(BAND_EENMALIG.max)}, een traject van een paar maanden{" "}
        {euroTarief(BAND_TRAJECT.min)} tot ongeveer {euroOngeveer(BAND_TRAJECT.max)}, en wie per uur werkt
        rekent {euroTarief(BAND_UUR.min)} tot {euroTarief(BAND_UUR.max)}. Alle prijzen per aanbieder, met de
        link naar hun eigen tarievenpagina, staan op{" "}
        <Link href="/inzichten/wat-kost-een-financieel-coach" style={link} className="hover:underline">
          wat kost een budgetcoach
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Waar kun je gratis een budgetcoach krijgen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Op drie plekken, en bij alle drie hangt het af van waar je woont of werkt.
      </p>
      <ul className="mb-6 space-y-2 pl-5" style={{ listStyleType: "disc" }}>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>Bij de gemeente.</strong> Sommige gemeenten
          bieden budgetcoaching gratis aan, ook zonder schulden; Oss is een voorbeeld. Niet elke gemeente
          doet dit, dus vraag het bij die van jou.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>Via een vrijwilliger.</strong> Regelhulp
          noemt vrijwilligers die helpen met je administratie en met inkomsten en uitgaven op een rij zetten.
          Zij helpen gratis of voor een klein bedrag.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>Via je werkgever.</strong> Een deel van de
          betaalde budgetcoaches noemt de werkgever als mogelijke betaler. Of dat bij jou kan, hangt af van
          je werkgever.
        </li>
      </ul>
      <p className="font-body text-text-soft" style={p}>
        Daarnaast is het eerste gesprek bij een deel van de betaalde aanbieders gratis.
      </p>

      <h2 className="font-display" style={h2}>
        Kan iemand eenmalig naar je uitgaven kijken, zonder traject?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Ja. {BAND_EENMALIG.aantalAanbieders} van de {AANTAL_AANBIEDERS} budgetcoaches in mijn steekproef hebben
        een losse check, onder namen als quick scan, financi&euml;le check of kickstartsessie. Dat is meestal
        &eacute;&eacute;n gesprek, soms met een budgetplan erbij. Wat daar zelden in zit, is een vergelijking
        met huishoudens die op jou lijken: de coach kijkt naar jouw cijfers, niet naar wat anderen in
        dezelfde situatie uitgeven.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat laatste is wat de gratis{" "}
        <CtaLink doel="analyse" href={analyseHref()} locatie="midden" style={link} className="hover:underline">
          analyse
        </CtaLink>{" "}
        op deze site doet: je uitgaven post voor post naast vergelijkbare huishoudens, in een paar minuten,
        zonder account en zonder afschriften.
      </p>

      <h2 className="font-display" style={h2}>
        Wie kan je helpen met je financi&euml;n als je goed verdient?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vier opties naast elkaar. Mijn eigen rij is niet in elke kolom de beste, en waar iemand anders beter
        past staat dat er.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse", minWidth: "44rem" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              {["", "Voor wie", "Wat je krijgt", "Wat het kost", "Wat het niet is"].map((kop) => (
                <th
                  key={kop}
                  className="text-left py-2 px-3 align-bottom"
                  style={{ color: "#16211F", fontWeight: 600 }}
                >
                  {kop}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OPTIES.map((optie) => (
              <tr
                key={optie.naam}
                style={{
                  borderBottom: "1px solid #E6E9E7",
                  backgroundColor: optie.eigen ? "#FDF3E3" : "transparent",
                }}
              >
                <td
                  className="py-3 px-3 align-top"
                  style={{ color: optie.eigen ? "#C4603A" : "#16211F", fontWeight: 600, minWidth: "9rem" }}
                >
                  {optie.naam}
                </td>
                <td className="py-3 px-3 align-top" style={{ color: "#4A5A56" }}>
                  {optie.voorWie}
                </td>
                <td className="py-3 px-3 align-top" style={{ color: "#4A5A56" }}>
                  {optie.watJeKrijgt}
                </td>
                <td className="py-3 px-3 align-top" style={{ color: "#16211F" }}>
                  {optie.watHetKost}
                </td>
                <td className="py-3 px-3 align-top" style={{ color: "#4A5A56" }}>
                  {optie.watHetNiet}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Waarop wel en niet vergeleken wordt: op voor wie het is, wat je krijgt en wat je betaalt. Niet op
        kwaliteit, want die verschilt per persoon en niet per categorie. De bedragen voor de budgetcoach komen
        uit de tabellen op{" "}
        <Link href="/inzichten/wat-kost-een-financieel-coach" style={link} className="hover:underline">
          wat een budgetcoach kost
        </Link>
        . De regel dat advieskosten niet in het product mogen zitten komt van de AFM en heet het
        provisieverbod.
      </p>

      {/* Interactief element, CLAUDE.md 8.9 */}
      <HulpKeuzehulp />

      <h2 className="font-display" style={h2}>
        Wat gebeurt er bij een Geldscan?
      </h2>
      <ol className="mb-6 space-y-3 pl-5" style={{ listStyleType: "decimal" }}>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>Je doet eerst de gratis analyse.</strong>{" "}
          Een paar minuten, geen account, geen afschriften. Daarin zie je op welke posten je afwijkt
          van vergelijkbare huishoudens en op welke niet. Dit is het deel dat vertelt d&aacute;t je
          afwijkt.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>
            Je vraagt de Geldscan aan met alleen je voornaam en je e-mailadres.
          </strong>{" "}
          Ik stuur binnen 1 werkdag een betaalverzoek van {GELDSCAN_PRIJS}. Pas
          n&aacute; de betaling vraag ik je cijfers. Ik vraag nooit inkomen, woonlasten of
          afschriften v&oacute;&oacute;r de koop.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>
            Je vult een vragenlijst in en levert wat je hebt.
          </strong>{" "}
          Bedragen per post, plus context die de cijfers niet weten: wat er in de afgelopen jaren
          veranderde, waar je van af wilt blijven, wat er dit jaar nog aankomt. Bankafschriften mogen
          erbij, weggestreept, maar het hoeft niet.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>
            Ik schrijf het rapport met de hand, binnen 2 werkdagen.
          </strong>{" "}
          Geen app, geen gegenereerde tekst. De drie dingen die het meest opvallen, plus wat juist
          niet uit de toon valt, plus een plan met concrete bedragen. Je afschriften verwijder ik
          na levering met de hand; wat ik verder bewaar en hoe lang staat in de{" "}
          <Link href="/privacy" style={link} className="hover:underline">
            privacyverklaring
          </Link>
          .
        </li>
      </ol>
      <p className="font-body text-text-soft" style={p}>
        Wil je erna doorpraten, dan kan dat in een adviesgesprek van{" "}
        {GESPREK_PRIJS}, waarbij de {GELDSCAN_PRIJS} wordt verrekend.
        Van de {RAPPORTEN.length} huishoudens die ik doorrekende hadden er {AANTAL_ZONDER_VERVOLG}{" "}
        geen vervolg nodig. Zo liep het, meer zit er niet achter.
      </p>

      <h2 className="font-display" style={h2}>
        Wat je niet krijgt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is de lijst die ik zelf zou willen zien voordat ik iemand in mijn cijfers laat kijken.
      </p>
      <ul className="mb-6 space-y-2 pl-5" style={{ listStyleType: "disc" }}>
        {[
          "Geen bespaartips. Ik schrijf niet dat je minder moet uit eten of je abonnementen moet opzeggen; dat weet je zelf.",
          "Geen advies over producten. Geen hypotheek, geen verzekering, geen pensioen, geen beleggen. Daar heb ik geen vergunning voor en die wil ik niet.",
          "Geen diagnose vooraf. Ik weet niet wat er bij jou aan de hand is voordat ik je cijfers heb gezien, en ik doe niet alsof.",
          "Geen oordeel over waar je je geld aan uitgeeft. Wat jij belangrijk vindt is geen post die ik ga aanvechten.",
          "Geen garantie en geen beloofd bedrag. Ik beschrijf wat ik doe, niet wat het oplevert.",
          "Geen abonnement, geen cursus, geen traject als instap.",
        ].map((item) => (
          <li key={item} className="font-body text-text-soft" style={{ fontWeight: 300 }}>
            {item}
          </li>
        ))}
      </ul>

      <h2 className="font-display" style={h2}>
        Wat bleek bij echte huishoudens zonder schulden?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Alle {RAPPORTEN.length} rapporten die ik leverde staan compleet op{" "}
        <Link href="/rapporten" style={link} className="hover:underline">
          /rapporten
        </Link>
        : de bedragen die het huishouden aanleverde, wat zij vooraf dachten, wat ik concludeerde en wat er na
        een paar maanden van terechtkwam. Geanonimiseerd, met hun toestemming, en niets eromheen verzonnen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bij {AANTAL_MET_LEK} van de {RAPPORTEN.length} kwam er iets uit dat de moeite waard was. Bij de andere{" "}
        {AANTAL_ZONDER_LEK} was de conclusie dat er niets te repareren viel, en die staan er met dezelfde
        uitwerking. Dat is de beste maat die ik je kan geven: soms klopt het gewoon zoals het is, en dan hoor
        je dat.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wie wat doet, een budgetcoach of een financieel coach, staat op{" "}
        <Link href="/inzichten/verschil-budgetcoach-financieel-coach" style={link} className="hover:underline">
          budgetcoach of financieel coach
        </Link>
        .
      </p>
    </>
  );
}
