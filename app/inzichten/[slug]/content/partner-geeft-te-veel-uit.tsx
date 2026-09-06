import Link from "next/link";
import BoodschappenSituatiekiezer from "@/components/artikel/BoodschappenSituatiekiezer";
import CtaLink from "@/components/CtaLink";
import { analyseHref, geldscanHref } from "@/lib/cta";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import { euro, VUISTREGEL } from "@/lib/salaris-vuistregel";

/**
 * N2 uit docs/plan-nieuwe-invalshoeken-06-sep-2026.md.
 *
 * Zoekterm en onderbouwing: docs/serp-invalshoeken-06-sep-2026.md. Primaire
 * term "partner geeft te veel uit", secundair "mijn man geeft al ons geld uit"
 * en "ruzie over uitgaven partner". De vierde term uit de brief, "vrouw koopt
 * te veel", is geschrapt: die SERP is volledig koopverslaving
 * (Afkickkliniekwijzer op 1, psychologie.nl, verslavingskliniek). Dat is
 * gezondheidsterrein en copyregel 5 verbiedt een diagnose vooraf.
 *
 * De hoek: zeven van de negen resultaten op de hoofdterm zijn forum, blog of
 * persoonlijk verhaal, en geen enkel resultaat zet er een bedrag naast. De
 * zoeker is de naaste en niet de "dader", dus deze pagina wijst nooit iemand
 * aan. De tabel bevat daarom geen enkel oordeel, alleen twee beelden en wat de
 * cijfers wel en niet weten.
 *
 * Belangrijk: waar ik geen cijfer heb staat dat er, en dat is geen tekortkoming
 * maar de kern van het stuk. Twee posten waar stellen het meest over botsen,
 * uit eten en kleding, kan ik met vijf huishoudens niet los meten. Dat is
 * waarheidsregel 3 en 6, en het is meteen het eerlijkste argument voor de
 * vergelijking: als de cijfers het niet los weten, is het gesprek erover
 * helemaal geen feitendiscussie.
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

interface Rij {
  post: string;
  jij: string;
  partner: string;
  cijfers: string;
  n: string;
}

const RIJEN: Rij[] = [
  {
    post: "Boodschappen",
    jij: "Het bonnetje van gisteren, en dat je zelf de aanbiedingen wel meeneemt.",
    partner: "Dat er eten in huis moet zijn en dat jij ook meeeet van wat hij haalt.",
    cijfers: `Voor twee volwassenen kom ik uit op ${euro(VUISTREGEL.boodschappenBasisTwee)} per maand, plus ${euro(VUISTREGEL.boodschappenPerKind)} per kind. Bezorgen en losse supermarktbezoeken zitten daar bij de vijf huishoudens gewoon in.`,
    n: "2 van de 5 (€690 en €720)",
  },
  {
    post: "Uit eten en bezorgen",
    jij: "De keren dat het jouw idee niet was.",
    partner: "Dat het een avond is en geen uitgave.",
    cijfers:
      "Geen apart cijfer. Bij alle vijf zit dit in vrije tijd of in boodschappen en is het niet los te meten. Vrije tijd als geheel liep van 7,5 tot 15 procent van het netto inkomen.",
    n: "5 van de 5 voor vrije tijd als geheel, 0 voor deze post apart",
  },
  {
    post: "Kleding",
    jij: "De pakketjes die binnenkomen.",
    partner: "Wat er twee keer per jaar echt nodig is, en dat het meeste retour gaat.",
    cijfers:
      "Geen cijfer bekend. Kleding is bij deze vijf huishoudens niet apart bijgehouden; bij het gezin met drie kinderen staat er expliciet bij dat kleding niet volledig in de kinderpost zit.",
    n: "0 van de 5",
  },
  {
    post: "Abonnementen",
    jij: "Dat er dingen doorlopen die niemand meer gebruikt.",
    partner: "Dat het bedragen van een paar euro zijn.",
    cijfers: `${euro(VUISTREGEL.abonnementen)} per maand voor streaming, mobiel en de rest samen. Dit is de post waar het beeld van beiden het vaakst te laag is.`,
    n: "5 van de 5 (€119 tot €175)",
  },
];

export default function PartnerGeeftTeVeelUit() {
  const stel = rapportVoorSlug("stel-zonder-kinderen")!;
  const vrijeTijd = stel.dagelijks.find((post) => post.label === "Vrije tijd");
  const boodschappen = stel.dagelijks.find((post) => post.label === "Boodschappen");

  return (
    <>
      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Het is bijna nooit &eacute;&eacute;n post, en bijna altijd twee verschillende beelden van
        wat normaal is. De eerste stap is daarom niet het gesprek maar dezelfde cijfers op tafel:
        zolang jullie ieder een ander plaatje in je hoofd hebben, gaat het gesprek over wie gelijk
        heeft in plaats van over wat er gebeurt. Voor twee volwassenen kom ik op{" "}
        {euro(VUISTREGEL.boodschappenBasisTwee)} boodschappen en{" "}
        {euro(VUISTREGEL.abonnementen)} abonnementen per maand.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 6 september 2026. Ze komen uit de {RAPPORTEN.length} huishoudens die
        ik zelf heb doorgerekend, dus een kleine n, en die staat per bedrag erbij. Op twee van de
        vier posten hieronder heb ik geen cijfer, en dat staat er ook.
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
            "Op welke vier posten twee mensen het vaakst een ander beeld hebben",
            "Wat de cijfers erover zeggen, en waar ze niets zeggen",
            "Drie zinnen die het gesprek openen en drie die het dichtgooien",
            "Wat je doet als de cijfers jou ongelijk geven",
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
        Wat jij ziet, wat je partner ziet, en wat de cijfers zeggen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        In de derde kolom staat geen oordeel, alleen wat ik bij deze huishoudens terugzie. Waar ik
        geen cijfer heb, staat dat er. Dat is geen slordigheid: bij de twee posten waar stellen het
        vaakst over botsen kan ik het met vijf huishoudens niet los meten, en dat is op zichzelf
        nuttig om te weten voordat jullie erover praten.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse", minWidth: "44rem" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              {["Post", "Wat jij ziet", "Wat je partner waarschijnlijk ziet", "Wat de cijfers zeggen", "n"].map(
                (kop) => (
                  <th
                    key={kop}
                    className="text-left py-2 px-3 align-bottom"
                    style={{ color: "#16211F", fontWeight: 600 }}
                  >
                    {kop}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {RIJEN.map((rij) => (
              <tr key={rij.post} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td
                  className="py-3 px-3 align-top"
                  style={{ color: "#16211F", fontWeight: 600, minWidth: "8rem" }}
                >
                  {rij.post}
                </td>
                <td className="py-3 px-3 align-top" style={{ color: "#4A5A56" }}>
                  {rij.jij}
                </td>
                <td className="py-3 px-3 align-top" style={{ color: "#4A5A56" }}>
                  {rij.partner}
                </td>
                <td className="py-3 px-3 align-top" style={{ color: "#16211F" }}>
                  {rij.cijfers}
                </td>
                <td
                  className="py-3 px-3 align-top"
                  style={{ color: rij.n.startsWith("0") ? "#92600A" : "#4A5A56", minWidth: "7rem" }}
                >
                  {rij.n}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Vergeleken wordt op post en op huishoudsamenstelling, niet op leeftijd, regio of inkomen.
        De maatstaf zijn mijn eigen {RAPPORTEN.length} huishoudens, allemaal met een bovenmodaal
        inkomen. Bij een n van 0 of 2 is dat een richting en geen norm, en op de twee posten met een
        n van 0 zeg ik dus niets over wie er gelijk heeft.
      </p>

      {/* Interactief element, CLAUDE.md 8.9 */}
      <BoodschappenSituatiekiezer
        kop="Vul dit samen in, en kijk allebei naar hetzelfde scherm"
        intro="Kies jullie situatie, dan zie je wat ik bij een huishouden als het jullie verwacht. Het punt is niet wie er dichterbij zit, het punt is dat jullie daarna over hetzelfde getal praten."
      />

      <h2 className="font-display" style={h2}>
        Waarom voelt het als te veel?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Omdat jullie een ander referentiekader hebben, niet omdat een van de twee anders in elkaar
        zit. Wat iemand normaal vindt komt uit het huishouden waarin hij opgroeide, uit wat zijn
        vrienden doen, en uit wat hij vroeger zelf kon missen. Twee mensen die allebei redelijk zijn
        kunnen dus tegengestelde conclusies trekken uit precies dezelfde bankrekening.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daar komt bij dat je de uitgaven van een ander scherper ziet dan je eigen. Jij weet van
        jouw uitgaven waarom ze nodig waren; van die van je partner zie je alleen het bedrag. Dat is
        geen kwade wil van jouw kant, het is hoe het van buitenaf werkt. Precies daarom werkt een
        lijst met bedragen zo goed: die kent het verhaal van geen van beiden.
      </p>

      <h2 className="font-display" style={h2}>
        Wat zeg je wel en wat zeg je niet?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Ik ben geen relatietherapeut en ik ga hier geen gesprekstechniek uitleggen. Wat ik wel zie,
        van de kant van de cijfers, is dat drie soorten zinnen het gesprek over cijfers laten gaan
        en drie het over de persoon.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div className="rounded-xl p-4" style={{ backgroundColor: "#E7F1EE", border: "1px solid #9CCFC4" }}>
          <p className="font-body font-semibold text-sm mb-2" style={{ color: "#16211F" }}>
            Houdt het bij de cijfers
          </p>
          <ul className="space-y-2">
            {[
              "“Zullen we een keer samen kijken wat er eigenlijk uitgaat? Ik weet het zelf ook niet precies.”",
              "“Ik heb geen idee of wij veel of weinig uitgeven vergeleken met anderen. Jij?”",
              "“Ik schrik van dit bedrag. Klopt het, of zie ik iets over het hoofd?”",
            ].map((z) => (
              <li key={z} className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
                {z}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "#FDF3E3", border: "1px solid #E8D3B0" }}>
          <p className="font-body font-semibold text-sm mb-2" style={{ color: "#16211F" }}>
            Maakt er een oordeel van
          </p>
          <ul className="space-y-2">
            {[
              "“Jij geeft altijd te veel uit.”",
              "“Weet je wel hoeveel jij vorige maand hebt uitgegeven?”",
              "“Ik let tenminste wel op.”",
            ].map((z) => (
              <li key={z} className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
                {z}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Het verschil tussen de twee kolommen is niet beleefdheid. Links staat steeds een vraag
        waarop het antwoord onbekend is, ook voor jou. Rechts staat een conclusie die je al getrokken
        hebt, en daar valt alleen nog tegen te verdedigen.
      </p>

      <h2 className="font-display" style={h2}>
        Wat als de cijfers jou ongelijk geven?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dat gebeurt, en vaker dan je zou denken. Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length}{" "}
        huishoudens die ik doorrekende was de conclusie dat er niets te repareren viel. Een van die
        twee is een stel: {stel.kenmerken.join(", ")}. Zij dachten dit: &ldquo;{stel.vermoeden}
        &rdquo; {stel.vermoedenBedrag}
      </p>
      <p className="font-body text-text-soft" style={p}>
        Mijn conclusie was: {stel.uitkomstKop.toLowerCase()}. {stel.uitkomst}
        {boodschappen ? " Hun boodschappen: " + boodschappen.waarde + "." : ""}
        {vrijeTijd ? " Hun vrije tijd: " + vrijeTijd.waarde + "." : ""} Dat is een andere uitkomst
        dan een lek, en het vraagt een ander gesprek: niet wie er te veel uitgeeft, maar of het doel
        en de manier van leven wel bij elkaar passen. Het hele rapport staat op{" "}
        <Link href={`/rapporten/${stel.slug}`} style={link} className="hover:underline">
          hun rapport
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wanneer gaat het over meer dan geld?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als het gesprek al een paar keer op dezelfde manier is misgelopen, als er dingen worden
        verzwegen, of als het over vertrouwen gaat en niet meer over bedragen, dan is een tabel niet
        wat jullie nodig hebben. Dan zou ik met een relatietherapeut praten en niet met mij. Een
        paar daarvan werken samen met deze site en staan op{" "}
        <Link href="/samenwerken/relatietherapeuten" style={link} className="hover:underline">
          relatietherapeuten
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Gaat het over uitgaven of leningen die voor jou verborgen worden gehouden, dan is dat een
        eigen onderwerp met eigen cijfers. Dat staat in{" "}
        <Link href="/inzichten/financiele-ontrouw-partner-verzwijgt-geld" style={link} className="hover:underline">
          financi&euml;le ontrouw: als je partner uitgaven of een lening verzwijgt
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Verder lezen over geld in de relatie
      </h2>
      <ul className="mb-6 space-y-2">
        {[
          { slug: "praten-over-geld-met-je-partner", tekst: "Praten over geld met je partner" },
          { slug: "geld-stress-relatie-nederland", tekst: "Geldstress in de relatie" },
          {
            slug: "financiele-ontrouw-partner-verzwijgt-geld",
            tekst: "Financiële ontrouw: als je partner uitgaven of een lening verzwijgt",
          },
          {
            slug: "gezamenlijke-rekening-voor-en-nadelen",
            tekst: "Gezamenlijke rekening: voor- en nadelen",
          },
          {
            slug: "wat-geeft-een-gezin-uit-per-maand",
            tekst: "Wat geeft een gezin uit per maand? De begroting per post",
          },
        ].map((s) => (
          <li key={s.slug} className="font-body text-sm">
            <Link href={`/inzichten/${s.slug}`} style={link} className="hover:underline">
              {s.tekst}
            </Link>
          </li>
        ))}
      </ul>

      <p className="font-body text-text-soft" style={p}>
        De praktische eerste stap blijft dezelfde: doe de vergelijking samen, aan dezelfde tafel, en
        praat pas daarna.{" "}
        <CtaLink
          doel="analyse"
          href={analyseHref({ situatie: "stel" })}
          locatie="midden"
          style={link}
          className="hover:underline"
        >
          Doe de gratis analyse samen
        </CtaLink>
        .
      </p>

      {/* Slotblok: Geldscan als tekstlink, CLAUDE.md 8.13 */}
      <p className="font-body text-text-soft" style={p}>
        Blijkt uit de vergelijking dat jullie op meerdere posten afwijken en weten jullie niet welke
        afwijking de oorzaak is en welke het gevolg, dan houdt een tabel op. Daarvoor moet iemand
        naar jullie hele maand kijken. Dat is wat ik doe in de{" "}
        <CtaLink doel="geldscan" href={geldscanHref()} locatie="slot" style={link} className="hover:underline">
          Geldscan van &euro;49
        </CtaLink>
        , met de hand, binnen twee werkdagen. Wat daarin staat is wat er is, ook als dat betekent dat
        er niets te repareren valt.
      </p>
    </>
  );
}
