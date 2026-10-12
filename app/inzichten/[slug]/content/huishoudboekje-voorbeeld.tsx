import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import JaarkostenTeller from "@/components/artikel/JaarkostenTeller";
import DownloadLink from "@/components/artikel/DownloadLink";
import { rapportVoorSlug, RAPPORTEN } from "@/lib/rapporten-data";
import {
  ICP_BRONNEN,
  BRON_DATUM,
  bereikJaarkostenPerMaand,
  NIBUD_BUDGETADVIES_PER_JAAR,
} from "@/lib/icp-bronnen";
import { euro } from "@/lib/salaris-vuistregel";

/**
 * Herschreven 12-okt-2026: van "bijhouden is niet het probleem" naar een echt
 * gratis huishoudboekje in Excel, op de hoofdtermen "huishoudboekje excel",
 * "uitgaven bijhouden excel", "financieel overzicht maken" en "budget maken
 * huishouden". Die vier hebben op google.nl dezelfde top (Rabobank, Nibud,
 * Wijzer in geldzaken, Microsoft, Peaks), dus één pagina
 * (docs/serp-icp-zoekgedrag-12-okt-2026.md). De zoeker wil een sjabloon; de
 * oude pagina gaf een mening en had 152 vertoningen in 90 dagen.
 *
 * Neemt de 301's op van moet-je-een-huishoudboekje-bijhouden en
 * budget-maken-dat-je-volhoudt; hun vraag staat hier nu als sectie.
 *
 * Download: public/downloads/huishoudboekje-waar-blijft-het.xlsx, zonder
 * e-mailmuur (CLAUDE.md 8.H.27). Gebouwd met openpyxl, 85 formules, met
 * LibreOffice herberekend zonder fouten.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

const HUISHOUDBOEKJE_DOWNLOAD = "/downloads/huishoudboekje-waar-blijft-het.xlsx";

function Bron({ sleutel, tekst }: { sleutel: keyof typeof ICP_BRONNEN; tekst: string }) {
  return (
    <a href={ICP_BRONNEN[sleutel].url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
      {tekst}
    </a>
  );
}

function DownloadKnop() {
  return (
    <div className="rounded-2xl p-5 sm:p-6 my-6" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
      <p className="font-display font-light text-xl mb-1" style={{ color: "#16211F" }}>
        Huishoudboekje in Excel, gratis
      </p>
      <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", lineHeight: 1.6 }}>
        Vier tabbladen: uitleg, je maand (schatting tegenover werkelijkheid), je jaaruitgaven en de uitkomst. Werkt in
        Excel, Numbers en Google Sheets. Geen e-mailadres nodig.
      </p>
      <DownloadLink href={HUISHOUDBOEKJE_DOWNLOAD} bestand="huishoudboekje" className="btn-primary inline-block text-center">
        Download het huishoudboekje (.xlsx) &darr;
      </DownloadLink>
    </div>
  );
}

export default function HuishoudboekjeVoorbeeld() {
  const bereik = bereikJaarkostenPerMaand();
  const alleen = rapportVoorSlug("alleenstaand-huurwoning")!;
  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const plafondRegel = gezin.plan.find((r) => r.toLowerCase().includes("plafond"));

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Hieronder download je gratis een huishoudboekje in Excel met je maand, je jaaruitgaven en de uitkomst. Het
        verschil met een gewoon sjabloon: je vult eerst in wat je denkt uit te geven, daarna wat het was. Bij mijn{" "}
        {RAPPORTEN.length} rapporten ging er {euro(bereik.laagste)} tot {euro(bereik.hoogste)} per maand naar
        jaaruitgaven, en die mist een maandsjabloon.
      </p>

      <DownloadKnop />

      <h2 className="font-display" style={h2}>Wat staat er in dit huishoudboekje?</h2>
      <EenvoudigeTabel
        koppen={["Tabblad", "Wat je invult", "Wat het laat zien"]}
        rijen={[
          ["Mijn maand", "Per post je schatting, daarna drie maanden echte bedragen", "Per post het verschil tussen schatting en werkelijkheid"],
          ["Jaaruitgaven", "Vakantie, feestdagen, onderhoud, auto en de rest, per jaar", "Wat je elke maand opzij moet zetten"],
          ["Uitkomst", "Wat er echt overbleef per maand", "Wat er op papier over zou moeten zijn, en het verschil"],
        ]}
        bijschrift="Lichte vakken zijn invulvakken, de rest rekent zelf."
      />

      <h2 className="font-display" style={h2}>Hoe maak je een huishoudboekje in Excel?</h2>
      <p className="font-body text-text-soft" style={p}>
        Wil je het zelf opzetten in plaats van te downloaden, houd dan deze volgorde aan. Wijzer in geldzaken, het
        platform van het ministerie van Financiën, beschrijft dezelfde opbouw: inkomsten optellen, uitgaven optellen,
        het een van het ander aftrekken (
        <Bron sleutel="wijzerVijfStappen" tekst={`Wijzer in geldzaken, geopend ${BRON_DATUM}`} />
        ).
      </p>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.6rem" }}>Een kolom voor de post, een voor je schatting en drie voor drie maanden.</li>
        <li style={{ marginBottom: "0.6rem" }}>Drie blokken: inkomsten, vaste lasten en dagelijkse uitgaven, elk met een totaal.</li>
        <li style={{ marginBottom: "0.6rem" }}>Een apart tabblad voor jaaruitgaven, met het jaarbedrag gedeeld door twaalf.</li>
        <li>
          Een uitkomst: inkomsten min vaste lasten min dagelijkse uitgaven min jaarreservering. Zet daar naast wat er
          echt overbleef.
        </li>
      </ol>

      <h2 className="font-display" style={h2}>Wat is het beste huishoudboekje: Excel, een app of papier?</h2>
      <p className="font-body text-text-soft" style={p}>
        Dat hangt af van wat je wilt weten. Een app van je bank deelt je uitgaven automatisch in, en Wijzer in geldzaken
        noemt dat het voordeel van digitaal: je laadt je rekeninginformatie in en ordent alles in categorieën. Wie elke
        uitgave precies wil bijhouden, kan volgens dezelfde pagina ook een papieren boekje gebruiken. Wat geen van beide
        doet, is je schatting naast de werkelijkheid zetten, en daar zit het antwoord op de vraag waar je geld blijft.
        Daarvoor is dit sjabloon gemaakt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Liever niets bijhouden? Het Persoonlijk Budgetadvies van het Nibud is gratis en wordt volgens het Nibud{" "}
        {NIBUD_BUDGETADVIES_PER_JAAR} keer per jaar ingevuld (
        <Bron sleutel="nibudBudgetadvies" tekst={`Nibud, geopend ${BRON_DATUM}`} />
        ).
      </p>

      <h2 className="font-display" style={h2}>Hoe lang moet je een huishoudboekje bijhouden?</h2>
      <p className="font-body text-text-soft" style={p}>
        Drie maanden is genoeg om te zien waar je geld blijft. Daarom heeft het sjabloon drie kolommen. Eén maand is
        te toevallig, en na een half jaar houdt bijna niemand het nog vol. Bij mijn rapporten werk ik met dezelfde
        termijn: drie maanden afschriften, en {gezin.doorlooptijd} een evaluatie. Uit het rapport van de alleenstaande
        in een huurwoning: &ldquo;{alleen.afschriften.split(". ")[1]}.&rdquo;
      </p>

      <h2 className="font-display" style={h2}>Hoe maak je een budget dat je volhoudt?</h2>
      <p className="font-body text-text-soft" style={p}>
        Niet door elke post apart te begrenzen. Geef de jaaruitgaven een eigen rekening, en geef alle vrije uitgaven
        samen één plafond.{" "}
        {plafondRegel && <>Uit het plan voor het gezin met drie kinderen: &ldquo;{plafondRegel}&rdquo;</>} Wie boodschappen,
        uitgaan en online aankopen los moet bijhouden, stopt na een paar weken. Eén getal voor alles samen houd je wel bij.
        Hoe dat met potjes werkt, staat in{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={link} className="hover:underline">
          de potjesmethode voor een gezin
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Wat kosten je jaaruitgaven per maand?</h2>
      <p className="font-body text-text-soft" style={p}>
        Het tabblad jaaruitgaven kun je hier ook meteen invullen.
      </p>
      <JaarkostenTeller />

      <h2 className="font-display" style={h2}>Huishoudboekje in Google Sheets</h2>
      <p className="font-body text-text-soft" style={p}>
        Download het bestand, ga in Google Sheets naar Bestand, Importeren, Uploaden en kies het bestand. De formules
        blijven werken. In Numbers op een Mac open je het direct.
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Wat je met de uitkomst doet:{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld" style={link} className="hover:underline">
          waar blijft mijn geld
        </Link>
        . Hoe je je jaaruitgaven regelt:{" "}
        <Link href="/inzichten/jaarlijkse-kosten-reserveren" style={link} className="hover:underline">
          jaarlijkse kosten reserveren
        </Link>
        . En een overzicht van alleen je vaste lasten:{" "}
        <Link href="/inzichten/vaste-lasten-overzicht-maken" style={link} className="hover:underline">
          vaste lasten overzicht maken
        </Link>
        .
      </p>
    </>
  );
}
