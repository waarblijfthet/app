import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import JaarkostenTeller from "@/components/artikel/JaarkostenTeller";
import { rapportVoorSlug, RAPPORTEN } from "@/lib/rapporten-data";
import {
  ICP_BRONNEN,
  BRON_DATUM,
  jaarkostenPerRapport,
  bereikJaarkostenPerMaand,
  VAKANTIEGELD_MIN_PCT,
} from "@/lib/icp-bronnen";
import { euro } from "@/lib/salaris-vuistregel";

/**
 * Nieuw artikel, 12-okt-2026: "jaarlijkse kosten reserveren".
 *
 * SERP google.nl 12-okt: Reddit r/geldzaken op 1, verder VvE-, zzp- en
 * boekhoudpagina's. Geen enkele pagina voor een huishouden
 * (docs/serp-icp-zoekgedrag-12-okt-2026.md). Jaaruitgaven zijn de post die
 * in elk van de vijf rapporten terugkomt, met bedragen per huishouden.
 *
 * Neemt de 301's op van kerstpot-en-verjaardagspot-zo-bouwden-we-die en
 * seizoens-kostenkalender-per-maand. De kalender had bedragen zonder bron
 * ("~€600 p.p."); die komen hier niet terug.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function Bron({ sleutel, tekst }: { sleutel: keyof typeof ICP_BRONNEN; tekst: string }) {
  return (
    <a href={ICP_BRONNEN[sleutel].url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
      {tekst}
    </a>
  );
}

export default function JaarlijkseKostenReserveren() {
  const jaar = jaarkostenPerRapport();
  const bereik = bereikJaarkostenPerMaand();
  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const ouder = rapportVoorSlug("alleenstaande-ouder-twee-kinderen")!;

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Tel op wat vakantie, feestdagen, onderhoud, auto en de rest je per jaar kosten, deel dat door twaalf en zet dat
        bedrag elke maand apart op een eigen rekening. Bij de {RAPPORTEN.length} huishoudens die ik doorrekende was dat{" "}
        {euro(bereik.laagste)} tot {euro(bereik.hoogste)} per maand. Zonder die reservering betaal je het uit je buffer.
      </p>

      <h2 className="font-display" style={h2}>Hoeveel moet je reserveren voor jaarlijkse kosten?</h2>
      <p className="font-body text-text-soft" style={p}>
        Zoveel als ze bij jou per jaar kosten, gedeeld door twaalf. Een norm is er niet, want vakantie en onderhoud
        verschillen sterk per huishouden. Zo zag het eruit bij de huishoudens van wie ik een rapport
        schreef.
      </p>
      <EenvoudigeTabel
        koppen={["Huishouden", "Per jaar", "Per maand"]}
        rijen={jaar.map((j) => [
          <Link key={j.slug} href={`/rapporten/${j.slug}`} style={link} className="hover:underline">
            {j.korteNaam}, {j.netto}
          </Link>,
          euro(j.perJaar),
          euro(j.perMaand),
        ])}
        bijschrift={`Mijn eigen rapporten, n = ${RAPPORTEN.length}, bedragen zoals de huishoudens ze aanleverden. Geen steekproef van Nederland.`}
      />
      <ul className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "disc" }}>
        {jaar.map((j) => (
          <li key={j.slug} style={{ marginBottom: "0.4rem" }}>
            {j.korteNaam}: {j.uitsplitsing}
          </li>
        ))}
      </ul>

      <h2 className="font-display" style={h2}>Welke kosten komen maar een paar keer per jaar?</h2>
      <p className="font-body text-text-soft" style={p}>
        In de rapporten steeds dezelfde groepen: vakanties, feestdagen en verjaardagen, onderhoud aan huis en tuin, de
        auto, en een restpost met tandarts, kleding en schoolkosten. Daarnaast komen sommige vaste lasten per jaar in
        plaats van per maand, zoals gemeentelijke belastingen. Wijzer in geldzaken waarschuwt dat je daardoor te weinig
        op je rekening kunt hebben, ook als je genoeg verdient (
        <Bron sleutel="wijzerVijfStappen" tekst={`Wijzer in geldzaken, geopend ${BRON_DATUM}`} />
        ).
      </p>

      <h2 className="font-display" style={h2}>Wat kosten jouw jaaruitgaven per maand?</h2>
      <JaarkostenTeller />

      <h2 className="font-display" style={h2}>Is reserveren hetzelfde als een buffer?</h2>
      <p className="font-body text-text-soft" style={p}>
        Nee. Een buffer is volgens het Nibud voor onverwachte, grotere en noodzakelijke
        kosten, zoals een kapotte wasmachine (
        <Bron sleutel="nibudBuffer" tekst={`Nibud, geopend ${BRON_DATUM}`} />
        ). Vakantie en december zijn niet onverwacht. Komen ze van dezelfde rekening, dan zakt je buffer elk jaar terug
        en lijkt sparen niet te lukken. Het gezin met drie kinderen van wie ik een rapport schreef, haalde regelmatig
        geld terug van de spaarrekening. Het eerste punt van hun plan: &ldquo;{gezin.plan[0]}&rdquo;
      </p>

      <h2 className="font-display" style={h2}>Mag je vakantiegeld gebruiken voor jaarlijkse kosten?</h2>
      <p className="font-body text-text-soft" style={p}>
        Ja, dat kan. Je hebt recht op minimaal {VAKANTIEGELD_MIN_PCT} procent van je brutojaarsalaris
        aan vakantiegeld, en de meeste werknemers krijgen het in mei of juni (
        <Bron sleutel="rijksoverheidVakantiegeld" tekst={`Rijksoverheid, geopend ${BRON_DATUM}`} />
        ). Of dat genoeg is voor vakantie, december, onderhoud en auto samen, zie je door het naast je jaaruitgaven te
        leggen. Wat er dan nog ontbreekt, zet je maandelijks apart. Hoeveel er netto van je vakantiegeld
        over is, staat in{" "}
        <Link href="/inzichten/vakantiegeld-netto-hoeveel-hou-je-over-2026" style={link} className="hover:underline">
          vakantiegeld netto
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Hoe regel je het in de praktijk?</h2>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.6rem" }}>Open een aparte spaarrekening of een potje voor jaaruitgaven, los van je buffer.</li>
        <li style={{ marginBottom: "0.6rem" }}>Stel een automatische overboeking in op de dag van je salaris.</li>
        <li style={{ marginBottom: "0.6rem" }}>Betaal elke jaaruitgave van die rekening, en alleen van die rekening.</li>
        <li>
          Kijk na een jaar of het bedrag klopte. De alleenstaande moeder die ik doorrekende, zei daarover: &ldquo;
          {ouder.evaluatie.split(". ").slice(0, 2).join(". ")}.&rdquo;
        </li>
      </ol>
      <p className="font-body text-text-soft" style={p}>
        Hoe je de rest van je salaris verdeelt over potjes, lees je in{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={link} className="hover:underline">
          de potjesmethode voor een gezin
        </Link>
        . Wat december een gezin kost, staat in{" "}
        <Link href="/inzichten/wat-kost-december-feestdagen-gezin" style={link} className="hover:underline">
          wat kost december
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Waarom sparen niet lukt zonder deze stap:{" "}
        <Link href="/inzichten/waarom-lukt-sparen-niet" style={link} className="hover:underline">
          waarom kan ik niet sparen
        </Link>
        . Waar de rest van je geld blijft:{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld" style={link} className="hover:underline">
          waar blijft mijn geld
        </Link>
        . Wat een gezin per post uitgeeft:{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={link} className="hover:underline">
          wat geeft een gezin uit per maand
        </Link>
        .
      </p>
    </>
  );
}
