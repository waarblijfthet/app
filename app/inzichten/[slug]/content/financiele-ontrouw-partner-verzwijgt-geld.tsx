import Link from "next/link";
import OpenheidChecklist from "@/components/artikel/OpenheidChecklist";
import CtaLink from "@/components/CtaLink";
import { geldscanHref } from "@/lib/cta";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";

/**
 * N3 uit docs/plan-nieuwe-invalshoeken-06-sep-2026.md. Zusterpagina van N2,
 * samen het mini-cluster "geld in de relatie".
 *
 * Zoekterm en onderbouwing: docs/serp-invalshoeken-06-sep-2026.md. Primaire
 * term "financiele ontrouw", secundair "geheime lening partner" en "partner
 * liegt over geld". De vierde term uit de brief, "partner verzwijgt schulden",
 * is geschrapt als doel: die SERP is juridisch (Judex op 1, Juridisch Loket,
 * aansprakelijkheid bij scheiding). De zoeker wil daar weten of hij
 * aansprakelijk is, en dat beantwoordt deze site niet. Die vraag komt hier
 * terug als FAQ, met de doorverwijzing naar het Juridisch Loket.
 *
 * Het sterkste signaal van alle 24 geverifieerde SERP's: op "geheime lening
 * partner" staat het ANP-persbericht zelf op plek 1. Google heeft niets beters
 * om te tonen dan het persbericht.
 *
 * CIJFERS. Twee verschillende onderzoeken van hetzelfde commerciele platform,
 * met verschillende n. Nooit door elkaar halen:
 *   - april 2026, n=400:   11,75 procent verzweeg ooit een lening
 *   - augustus 2026, n=1.127: 42,4 procent noemt schaamte als reden,
 *     21 procent sloot een nieuwe lening af om een oude te verbergen,
 *     bijna 12 procent ernstig relatieconflict, ruim 9 procent relatiebreuk
 * De brief van het plan noemde 38 procent en maart 2026; beide zijn hier
 * gecorrigeerd na verificatie. Lening.nl is een vergelijkingsplatform en geen
 * instituut, en beide onderzoeken zijn zelfgerapporteerd. Dat staat er op de
 * pagina bij, elke keer.
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

interface Vorm {
  vorm: string;
  hoeVaak: string;
  bron: string;
  signaal: string;
}

const VORMEN: Vorm[] = [
  {
    vorm: "Een lening verzwijgen",
    hoeVaak: "11,75 procent van de mensen met een partner, ooit",
    bron: "Lening.nl, april 2026, n=400, zelfgerapporteerd",
    signaal:
      "Een vaste afschrijving die niet bij een bekende post hoort, of een maandbedrag dat elke maand terugkomt zonder dat iemand weet waarvoor.",
  },
  {
    vorm: "Een nieuwe lening om een oude te verbergen",
    hoeVaak: "21 procent van de ondervraagden, ooit",
    bron: "Lening.nl, augustus 2026, n=1.127, zelfgerapporteerd",
    signaal:
      "Twee kleinere afschrijvingen waar er eerst een was, of een aflossing die stopt zonder dat er iets is afbetaald.",
  },
  {
    vorm: "Uitgaven verzwijgen",
    hoeVaak: "Geen cijfer bekend",
    bron: "Geen bron die ik heb kunnen controleren",
    signaal:
      "Het huishoudbudget klopt op papier, maar wat er werkelijk overblijft is structureel lager dan de optelsom.",
  },
  {
    vorm: "Een aparte spaarpot",
    hoeVaak: "Geen cijfer bekend",
    bron: "Geen bron die ik heb kunnen controleren",
    signaal:
      "Een vast bedrag dat elke maand naar een rekening gaat die niet in het overzicht staat. Op zichzelf geen ontrouw; het gaat om of de ander het weet.",
  },
  {
    vorm: "Inkomen verzwijgen",
    hoeVaak: "Geen cijfer bekend",
    bron: "Geen bron die ik heb kunnen controleren",
    signaal:
      "Een bonus, dertiende maand of vakantiegeld dat in het overzicht ontbreekt terwijl de werkgever hem wel uitkeert.",
  },
];

export default function FinancieleOntrouwPartnerVerzwijgtGeld() {
  return (
    <>
      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Financi&euml;le ontrouw is uitgaven, schulden of spaargeld verzwijgen voor je partner. Van
        de Nederlanders met een partner zegt 11,75 procent ooit een lening te hebben afgesloten
        zonder dat te vertellen (Lening.nl, april 2026, onderzoek onder 400 volwassenen). Van wie
        ooit een lening verborgen hield noemt 42,4 procent schaamte als belangrijkste reden
        (Lening.nl, augustus 2026, n=1.127). Beide cijfers zijn zelfgerapporteerd, dus het
        werkelijke aandeel ligt vermoedelijk hoger.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 6 september 2026. Lening.nl is een commercieel vergelijkingsplatform
        en geen onderzoeksinstituut; bij elk cijfer op deze pagina staat daarom de opdrachtgever, de
        steekproefomvang en de datum. Waar ik geen bron heb, staat dat er.
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
            "Wat financiële ontrouw precies is, en wat het niet is",
            "Hoe vaak het voorkomt, met de steekproef en de datum erbij",
            "Waaraan je het in een huishoudboekje zou merken, per vorm",
            "Wat je doet als het speelt, en waar je dan moet zijn",
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
        Welke vormen zijn er, en hoe vaak komen ze voor?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vijf vormen. Op twee ervan bestaat een cijfer dat ik heb kunnen controleren, op drie niet.
        Die drie rijen laat ik leeg in plaats van er een schatting in te zetten, want een percentage
        zonder bron is precies hoe dit onderwerp normaal gesproken wordt opgeschreven.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse", minWidth: "44rem" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              {["Vorm", "Hoe vaak", "Bron", "Eerste signaal in de cijfers"].map((kop) => (
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
            {VORMEN.map((v) => {
              const zonderCijfer = v.hoeVaak === "Geen cijfer bekend";
              return (
                <tr key={v.vorm} style={{ borderBottom: "1px solid #E6E9E7" }}>
                  <td
                    className="py-3 px-3 align-top"
                    style={{ color: "#16211F", fontWeight: 600, minWidth: "10rem" }}
                  >
                    {v.vorm}
                  </td>
                  <td
                    className="py-3 px-3 align-top"
                    style={{ color: zonderCijfer ? "#92600A" : "#16211F", minWidth: "10rem" }}
                  >
                    {v.hoeVaak}
                  </td>
                  <td className="py-3 px-3 align-top" style={{ color: "#8B958F" }}>
                    {v.bron}
                  </td>
                  <td className="py-3 px-3 align-top" style={{ color: "#4A5A56" }}>
                    {v.signaal}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        De kolom met signalen is geen bewijs en geen checklist voor bedrog. Alle vijf de signalen
        hebben onschuldige verklaringen die veel vaker voorkomen dan de schuldige, en een
        afschrijving die je niet herkent is meestal een abonnement dat je vergeten bent.
      </p>

      {/* Interactief element, CLAUDE.md 8.9 */}
      <OpenheidChecklist />

      <h2 className="font-display" style={h2}>
        Wat is financi&euml;le ontrouw precies?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het verzwijgen van geld voor je partner, waar dat geld ook heen gaat. Dat is de hele
        definitie, en hij zegt niets over het bedrag: een verzwegen lening van 500 euro valt eronder
        en een openlijk dure hobby van 500 euro niet. Het gaat over wat de ander niet weet, niet
        over wat er wordt uitgegeven.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daarmee valt er ook een hoop buiten. Een eigen rekening is geen financi&euml;le ontrouw als
        jullie allebei weten dat hij bestaat, hoe groot hij ongeveer is en waarom hij er is. Een
        cadeau dat je stil houdt tot december ook niet. En verschillend denken over wat normaal is,
        het onderwerp van{" "}
        <Link href="/inzichten/partner-geeft-te-veel-uit" style={link} className="hover:underline">
          mijn partner geeft te veel uit
        </Link>
        , is iets heel anders: daar weten jullie allebei wat er gebeurt en zijn jullie het oneens
        over of het te veel is.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom verzwijgen mensen geld?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Schaamte, ver boven de rest. Van de ondervraagden die ooit een lening verborgen hielden
        noemt 42,4 procent schaamte als belangrijkste reden; andere motieven, zoals ruzie willen
        voorkomen, financieel onafhankelijk willen blijven of verwachten dat de omgeving het niet
        zou begrijpen, worden aanzienlijk minder vaak genoemd (Lening.nl, augustus 2026, n=1.127).
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat verklaart ook waarom het meestal groter wordt in plaats van kleiner. Ruim een op de vijf
        ondervraagden (21 procent) sloot ooit een nieuwe lening af om een bestaande schuld voor een
        partner of familielid verborgen te houden. Daarmee stijgen zowel de totale schuld als de
        maandlasten, en de drempel om het te vertellen stijgt mee. In hetzelfde onderzoek zegt bijna
        12 procent een ernstig relatieconflict te hebben meegemaakt door een verzwegen schuld, en
        ruim 9 procent dat het tot een relatiebreuk leidde.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Er zit een scheve verhouding in die cijfers die het waard is om te noemen: 53,2 procent
        vindt dat schulden onder bepaalde omstandigheden normaal zijn, terwijl 45,3 procent zich
        schaamt voor de eigen schulden. Mensen zijn dus milder over anderen dan over zichzelf, en
        dat is precies het mechanisme dat maakt dat iemand het niet vertelt terwijl hij zelf zou
        zeggen dat het geen ramp is.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe merk je het in een huishoudboekje?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Niet aan een enkele transactie, maar aan een optelsom die structureel niet uitkomt. Wat je
        in de cijfers zou zien, in volgorde van hoe vaak het iets betekent:
      </p>
      <ul className="mb-6 space-y-2 pl-5" style={{ listStyleType: "disc" }}>
        {[
          "De posten kloppen, maar wat er aan het eind van de maand staat is elke maand een paar honderd euro lager dan de optelsom zegt.",
          "Er staat een vaste afschrijving die bij geen enkele bekende post hoort en die niemand kan plaatsen.",
          "Er wordt structureel contant opgenomen zonder dat de contante uitgaven ergens terugkomen.",
          "Er is een rekening waarvan jullie het saldo niet allebei kennen, terwijl er wel geld naartoe gaat.",
          "Post van een kredietverstrekker of incassobureau die bij de een terechtkomt en niet bij de ander.",
        ].map((item) => (
          <li key={item} className="font-body text-text-soft" style={{ fontWeight: 300 }}>
            {item}
          </li>
        ))}
      </ul>
      <p className="font-body text-text-soft" style={p}>
        De eerste is de enige die je met een vergelijking kunt vaststellen, en zelfs die zegt in
        zijn eentje niets. Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} huishoudens die ik
        doorrekende was de uitkomst dat er niets te repareren viel, terwijl de mensen zelf zeker
        wisten dat er een lek was. Een verschil tussen wat je verwacht en wat er staat is dus veel
        vaker een verkeerde verwachting dan een verzwegen bedrag. Alle vijf de rapporten staan
        compleet op{" "}
        <Link href="/rapporten" style={link} className="hover:underline">
          /rapporten
        </Link>
        ; er zit er geen tussen die over financi&euml;le ontrouw gaat, en ik ga er ook geen
        verzinnen.
      </p>

      <h2 className="font-display" style={h2}>
        Wat doe je als het speelt?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        In deze volgorde. Eerst de cijfers, dan het gesprek, dan pas eventueel hulp, en die hulp
        hangt af van waar het over gaat.
      </p>
      <ol className="mb-6 space-y-3 pl-5" style={{ listStyleType: "decimal" }}>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>Zet de maand op een rij.</strong>{" "}
          Niet om bewijs te verzamelen, maar omdat je anders een gesprek voert over een vermoeden.
          Een vermoeden is niet te weerleggen en dat maakt het gesprek onmogelijk voor allebei.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>
            Begin met wat je ziet, niet met wat je denkt.
          </strong>{" "}
          &ldquo;Er gaat elke maand 240 euro ergens heen dat ik niet kan plaatsen&rdquo; is iets
          anders dan &ldquo;jij verzwijgt iets&rdquo;. Bij de eerste kan er een antwoord komen, bij
          de tweede alleen een verdediging.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>
            Blijkt er een schuld te zijn die niet te betalen is, ga dan naar de gemeente.
          </strong>{" "}
          Schuldhulpverlening is kosteloos en zij kunnen dingen die niemand anders kan: met
          schuldeisers onderhandelen, een regeling opzetten, zo nodig wettelijke schuldsanering
          aanvragen. Wacht daar niet mee, want schaamte is precies de reden dat mensen te laat
          komen.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>
            Gaat het over vertrouwen en niet meer over bedragen, dan hoort het bij een therapeut.
          </strong>{" "}
          Een tabel repareert geen relatie. Een paar relatietherapeuten werken samen met deze site
          en staan op{" "}
          <Link href="/samenwerken/relatietherapeuten" style={link} className="hover:underline">
            relatietherapeuten
          </Link>
          .
        </li>
      </ol>

      <h2 className="font-display" style={h2}>
        Verder lezen over geld in de relatie
      </h2>
      <ul className="mb-6 space-y-2">
        {[
          { slug: "partner-geeft-te-veel-uit", tekst: "Mijn partner geeft te veel uit: wat je kunt doen zonder ruzie" },
          { slug: "praten-over-geld-met-je-partner", tekst: "Praten over geld met je partner" },
          { slug: "geld-stress-relatie-nederland", tekst: "Geldstress in de relatie" },
          { slug: "gezamenlijke-rekening-voor-en-nadelen", tekst: "Gezamenlijke rekening: voor- en nadelen" },
          {
            slug: "kan-iemand-naar-mijn-financien-kijken",
            tekst: "Kan iemand naar mijn financiën kijken zonder dat ik schulden heb?",
          },
        ].map((s) => (
          <li key={s.slug} className="font-body text-sm">
            <Link href={`/inzichten/${s.slug}`} style={link} className="hover:underline">
              {s.tekst}
            </Link>
          </li>
        ))}
      </ul>

      {/* Slotblok: Geldscan als tekstlink, CLAUDE.md 8.13 */}
      <p className="font-body text-text-soft" style={p}>
        Klopt de optelsom van jullie maand niet en komen jullie er samen niet uit waar het verschil
        vandaan komt, dan is dat het moment waarop iemand naar de hele maand moet kijken. Dat is wat
        ik doe in de{" "}
        <CtaLink doel="geldscan" href={geldscanHref()} locatie="slot" style={link} className="hover:underline">
          Geldscan van &euro;49
        </CtaLink>
        , met de hand, binnen twee werkdagen. Ik zoek geen verzwegen bedragen op, want dat kan ik
        niet en dat wil ik niet; ik laat zien waar het geld dat jullie w&eacute;l kennen naartoe
        gaat.
      </p>
    </>
  );
}
