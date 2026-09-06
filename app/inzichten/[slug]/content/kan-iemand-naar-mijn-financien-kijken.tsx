import Link from "next/link";
import HulpKeuzehulp from "@/components/artikel/HulpKeuzehulp";
import CtaLink from "@/components/CtaLink";
import { geldscanHref } from "@/lib/cta";
import { RAPPORTEN, AANTAL_ZONDER_LEK, AANTAL_ZONDER_VERVOLG } from "@/lib/rapporten-data";
import { PAKKET_INFO } from "@/lib/aanbod-content";

/**
 * N4 uit docs/plan-nieuwe-invalshoeken-06-sep-2026.md. Dit is D1 uit het plan
 * van 5 september, naar voren gehaald en op andere zoektermen gezet.
 *
 * Zoekterm en onderbouwing: docs/serp-invalshoeken-06-sep-2026.md. Primaire
 * term "iemand die naar mijn financien kijkt", secundair "financieel overzicht
 * laten maken" en "budgetcoach zonder schulden". Twee termen uit de brief zijn
 * geschrapt: "second opinion huishoudbudget" heeft geen corpus (Google laat het
 * woord vallen) en "financiele check laten doen" is in Nederland volledig bezet
 * door de nieuwbouwhypotheek. Die laatste schrapping is meteen het antwoord op
 * D1: die naam is dood.
 *
 * De hoek staat letterlijk op de SERP: vijf van de negen resultaten gaan over
 * schulden of geldzorgen, drie over hypotheek- en vermogensadvies, en er staat
 * niets tussen. Google zet zelf "hoe noem je iemand die je geldzaken regelt" in
 * het PAA-blok.
 *
 * SCHEIDING MET DE TWEE BESTAANDE COACH-PAGINA'S (GSC: 1.190 vertoningen op
 * coach-termen, positie 52,6, nul klikken). Deze ene zin staat ook op die twee
 * pagina's, met een link over en weer:
 *
 *   wat-kost-een-financieel-coach beantwoordt wat het kost, deze pagina
 *   beantwoordt of het iets voor jou is als je geen schulden hebt.
 *
 * Houdt deze pagina na 90 dagen minder dan 20 vertoningen, dan gaat hij met die
 * twee mee in de contentkill van CLAUDE.md sectie 9.
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
    naam: "Schuldhulp via de gemeente",
    voorWie: "Je hebt schulden of achterstanden die je niet kunt betalen.",
    watJeKrijgt:
      "Een gesprek, budgetadvies, en zo nodig schuldbemiddeling of wettelijke schuldsanering. Gemeenten bepalen zelf hoe ze dat inrichten.",
    watHetKost: "Kosteloos.",
    watHetNiet:
      "Geen vergelijking met andere huishoudens, en niet bedoeld voor wie gewoon rondkomt.",
  },
  {
    naam: "Budgetcoach",
    voorWie:
      "Je wilt begeleiding over een langere periode, met iemand die meekijkt en je erop houdt.",
    watJeKrijgt:
      "Meestal een reeks gesprekken, een sluitende begroting en huiswerk tussendoor. Vaak een gratis kennismaking.",
    watHetKost:
      "Ongeveer €60 tot €100 per uur, pakketten vanaf circa €250. Via de gemeente of een werkgever soms kosteloos.",
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
      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Ja, dat kan, en de vraag is terecht dat je hem niet kunt vinden: het aanbod in Nederland is
        of schuldhulp of advies over producten. Wat er tussenin bestaat is een budgetcoach, een
        financieel planner, en dit: een vergelijking van je uitgaven met vergelijkbare huishoudens,
        gratis, en daarna een met de hand geschreven rapport voor{" "}
        {GELDSCAN_PRIJS}.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers en tarieven bijgewerkt op 6 september 2026. De prijzen van anderen zijn
        bandbreedtes met een bron eronder; mijn eigen prijs staat er exact.
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
            "Welke vier soorten hulp er zijn, en wat elk kost",
            "Bij welke van de vier je moet zijn, met een keuzehulp van drie vragen",
            "Wat er precies gebeurt bij een Geldscan, stap voor stap",
            "Wat je juist niet krijgt",
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
        Wie kan er naar mijn financi&euml;n kijken, en wat kost dat?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vier opties naast elkaar. Mijn eigen rij is niet in elke kolom de beste, en waar iemand
        anders beter past staat dat er.
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
        Waarop wel en niet vergeleken wordt: op voor wie het is, wat je krijgt en wat je betaalt.
        Niet op kwaliteit, want die verschilt per persoon en niet per categorie. De bandbreedtes voor
        de budgetcoach staan met hun bron op mijn eigen pagina over{" "}
        <Link href="/inzichten/wat-kost-een-financieel-coach" style={link} className="hover:underline">
          wat een financieel coach kost
        </Link>{" "}
        (gepubliceerd 2 juli 2026). De regel dat advieskosten niet in het product mogen zitten komt
        van de AFM en heet het provisieverbod.
      </p>

      {/* Interactief element, CLAUDE.md 8.9 */}
      <HulpKeuzehulp />

      <h2 className="font-display" style={h2}>
        Waarom is dit zo moeilijk te vinden?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Omdat er geen categorie voor is. Zoek je op &ldquo;iemand die naar mijn financi&euml;n
        kijkt&rdquo;, dan krijg je vijf resultaten over schulden en drie over hypotheek- en
        vermogensadvies. Google zet er zelf de vraag &ldquo;hoe noem je iemand die je geldzaken
        regelt&rdquo; bij, en dat is precies het probleem: er is geen woord voor. Wie het aan iemand
        anders vraagt, hoort meestal &ldquo;ga naar de boekhouder&rdquo;, en een boekhouder doet
        bedrijven en aangiftes, niet huishoudens.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daar komt bij dat het aanbod is opgebouwd rond een probleem dat jij niet hebt. Schuldhulp
        begint bij een achterstand. Advies begint bij een product. Wie rondkomt en toch weinig
        overhoudt, valt in beide gevallen buiten de instap. Dat is geen gat in de markt waar ik
        blij van word, het is een reden dat mensen jaren met dezelfde vraag blijven zitten.
      </p>

      <h2 className="font-display" style={h2}>
        Wat gebeurt er precies bij een Geldscan?
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
          niet uit de toon valt, plus een plan met concrete bedragen. Daarna verwijder ik je
          aangeleverde gegevens.
        </li>
      </ol>
      <p className="font-body text-text-soft" style={p}>
        Wil je erna doorpraten, dan kan dat in een adviesgesprek van{" "}
        {GESPREK_PRIJS}, waarbij de {GELDSCAN_PRIJS} wordt verrekend.
        Van de {RAPPORTEN.length} huishoudens die ik doorrekende hadden er {AANTAL_ZONDER_VERVOLG}{" "}
        geen vervolg nodig, en dat is geen verkooptechniek maar simpelweg hoe het liep.
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
        Hoe weet je of het iets oplevert?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Door de rapporten te lezen die ik al geleverd heb, voordat je iets betaalt. Alle{" "}
        {RAPPORTEN.length} staan compleet op{" "}
        <Link href="/rapporten" style={link} className="hover:underline">
          /rapporten
        </Link>
        : de bedragen die het huishouden aanleverde, wat zij vooraf dachten, wat ik concludeerde en
        wat er na een paar maanden van terechtkwam. Geanonimiseerd, met hun toestemming, en niets
        eromheen verzonnen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Belangrijker dan de vier waar wel iets uitkwam zijn de {AANTAL_ZONDER_LEK} waar de conclusie
        was dat er niets te repareren viel. Die staan er ook, met dezelfde uitwerking. Dat is de
        eerlijkste maat die ik je kan geven: bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} was
        het antwoord dat het klopte zoals het was, en dan hoor je dat gewoon.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe deze pagina zich verhoudt tot de andere twee
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Er staan drie pagina&apos;s op deze site over dit onderwerp, en ze beantwoorden verschillende
        vragen.{" "}
        <Link href="/inzichten/wat-kost-een-financieel-coach" style={link} className="hover:underline">
          Wat kost een financieel coach
        </Link>{" "}
        beantwoordt wat het kost.{" "}
        <Link href="/inzichten/verschil-budgetcoach-financieel-coach" style={link} className="hover:underline">
          Budgetcoach of financieel coach
        </Link>{" "}
        beantwoordt wie wat doet. Deze pagina beantwoordt of het iets voor jou is als je geen
        schulden hebt. Kom je voor de prijs, ga dan naar de eerste; kom je voor de termen, naar de
        tweede.
      </p>

      {/* Slotblok: Geldscan als tekstlink, CLAUDE.md 8.13 */}
      <p className="font-body text-text-soft" style={p}>
        Weet je na de gratis analyse dat je afwijkt maar niet waarom, dan is dat het moment waarop
        iemand naar je hele maand moet kijken. Dat is wat ik doe in de{" "}
        <CtaLink doel="geldscan" href={geldscanHref()} locatie="slot" style={link} className="hover:underline">
          Geldscan van {GELDSCAN_PRIJS}
        </CtaLink>
        , met de hand, binnen twee werkdagen, en daarna verwijder ik je gegevens.
      </p>
    </>
  );
}
