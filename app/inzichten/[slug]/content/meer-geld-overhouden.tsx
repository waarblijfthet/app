import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import GatSnelcheck from "@/components/artikel/GatSnelcheck";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import {
  ICP_BRONNEN,
  BRON_DATUM,
  jaarkostenPerRapport,
  bereikJaarkostenPerMaand,
  postPerRapport,
  VAKANTIEGELD_MIN_PCT,
  NIBUD_SPAARADVIES_PCT,
} from "@/lib/icp-bronnen";
import { euro } from "@/lib/salaris-vuistregel";

/**
 * Nieuw artikel, 12-okt-2026: "meer geld overhouden".
 *
 * SERP google.nl 12-okt: NN, Nibud, Geldfit, Florius, Rabobank: tiplijsten
 * (docs/serp-icp-zoekgedrag-12-okt-2026.md). Autocomplete: "meer geld
 * overhouden 2026", "hoe meer geld overhouden", "tips". Tot nu toe vertoonde
 * hoeveel-geld-overhouden-einde-maand hierop als bijvangst (positie 21 tot 42);
 * die pagina beantwoordt "hoeveel", deze "hoe". Geen koffietips (CLAUDE.md 4):
 * de vijf plekken komen uit de plannen in lib/rapporten-data.ts.
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

export default function MeerGeldOverhouden() {
  const jaar = jaarkostenPerRapport();
  const bereik = bereikJaarkostenPerMaand();
  const abo = postPerRapport("Abonnementen");
  const vrij = postPerRapport("Vrije tijd");
  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const alleen = rapportVoorSlug("alleenstaand-huurwoning")!;
  const plafond = alleen.plan.find((r) => r.toLowerCase().includes("maandbudget"));
  const boodschappenRegel = alleen.plan.find((r) => r.toLowerCase().includes("boodschappen"));

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Meer geld overhouden begint met weten waar het nu blijft, niet met bezuinigen. Bij de {RAPPORTEN.length}{" "}
        huishoudens die ik volledig doorrekende ging er {euro(bereik.laagste)} tot {euro(bereik.hoogste)} per maand naar
        jaaruitgaven. Bij het gezin met drie kinderen was mijn conclusie: &ldquo;{gezin.uitkomstKop}.&rdquo; De ruimte zat
        in de optelsom.
      </p>

      <h2 className="font-display" style={h2}>Hoe houd ik meer geld over?</h2>
      <p className="font-body text-text-soft" style={p}>
        Vijf plekken, in deze volgorde. Ze komen uit de plannen die ik voor echte huishoudens schreef, aangevuld met wat het Nibud en Wijzer in geldzaken adviseren.
      </p>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.8rem" }}>
          <strong style={{ fontWeight: 500 }}>Geef je jaaruitgaven een eigen rekening.</strong> Vakantie, feestdagen,
          onderhoud en auto komen een paar keer per jaar en vreten anders je spaargeld op. Het rekenvoorbeeld staat in{" "}
          <Link href="/inzichten/jaarlijkse-kosten-reserveren" style={link} className="hover:underline">
            jaarlijkse kosten reserveren
          </Link>
          .
        </li>
        <li style={{ marginBottom: "0.8rem" }}>
          <strong style={{ fontWeight: 500 }}>Geef alle vrije uitgaven samen één plafond.</strong>{" "}
          {plafond ? <>Uit een van mijn plannen: &ldquo;{plafond}&rdquo;</> : null} Niet per categorie, want dat houdt
          niemand vol.
        </li>
        <li style={{ marginBottom: "0.8rem" }}>
          <strong style={{ fontWeight: 500 }}>Zet je spaarbedrag apart op de dag dat je salaris binnenkomt.</strong> Wat
          aan het eind van de maand over is, is bijna nooit genoeg. Wijzer in geldzaken voert er een landelijke campagne
          voor: &ldquo;Betaal jezelf eerst&rdquo; (
          <Bron sleutel="wijzerBetaalJezelfEerst" tekst={`Wijzer in geldzaken, geopend ${BRON_DATUM}`} />
          ).
        </li>
        <li style={{ marginBottom: "0.8rem" }}>
          <strong style={{ fontWeight: 500 }}>Zet extra inkomsten apart voordat je ze uitgeeft.</strong> Vakantiegeld is
          minimaal {VAKANTIEGELD_MIN_PCT} procent van je brutojaarsalaris (
          <Bron sleutel="rijksoverheidVakantiegeld" tekst={`Rijksoverheid, geopend ${BRON_DATUM}`} />
          ), en het Nibud adviseert om zulke bedragen meteen opzij te zetten (
          <Bron sleutel="nibudSparenAanpak" tekst={`Nibud, geopend ${BRON_DATUM}`} />
          ).
        </li>
        <li>
          <strong style={{ fontWeight: 500 }}>Kijk pas daarna naar losse posten.</strong>{" "}
          {boodschappenRegel ? <>Ook uit een plan: &ldquo;{boodschappenRegel}&rdquo;</> : null}
        </li>
      </ol>

      <h2 className="font-display" style={h2}>Waar zat het geld bij echte huishoudens?</h2>
      <EenvoudigeTabel
        koppen={["Huishouden", "Jaaruitgaven per maand", "Vrije tijd per maand"]}
        rijen={jaar.map((j) => {
          const v = vrij.find((x) => x.slug === j.slug);
          return [
            <Link key={j.slug} href={`/rapporten/${j.slug}`} style={link} className="hover:underline">
              {j.korteNaam}, {j.netto}
            </Link>,
            euro(j.perMaand),
            v && v.bedrag !== null ? euro(v.bedrag) : "niet opgegeven",
          ];
        })}
        bijschrift={`Mijn eigen rapporten, n = ${RAPPORTEN.length}, bedragen zoals de huishoudens ze aanleverden. Abonnementen lagen bij deze huishoudens tussen ${euro(
          Math.min(...abo.map((a) => a.bedrag ?? Infinity))
        )} en ${euro(Math.max(...abo.map((a) => a.bedrag ?? 0)))} per maand.`}
      />
      <p className="font-body text-text-soft" style={p}>
        Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} huishoudens viel er niets te repareren. Meer overhouden betekende
        daar kiezen: de levensstijl of het spaardoel. Dat is ook een uitkomst.
      </p>

      <h2 className="font-display" style={h2}>Hoeveel kun je niet aanwijzen?</h2>
      <p className="font-body text-text-soft" style={p}>
        Voordat je ergens op bespaart: kijk hoeveel geld er nu verdwijnt zonder dat je weet waarheen. Dat is de
        makkelijkste ruimte, want je mist hem niet.
      </p>
      <GatSnelcheck />

      <h2 className="font-display" style={h2}>Wat is een normaal bedrag om over te houden per maand?</h2>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud adviseert minimaal {NIBUD_SPAARADVIES_PCT} procent van je inkomen opzij te zetten. Wat dat per
        huishouden betekent, met bedragen, staat in{" "}
        <Link href="/inzichten/hoeveel-geld-overhouden-einde-maand" style={link} className="hover:underline">
          hoeveel geld moet je overhouden per maand
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Hoe je uitzoekt waar je geld nu naartoe gaat:{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld" style={link} className="hover:underline">
          waar blijft mijn geld
        </Link>
        . Hoe je uitgaven meegroeien met je salaris:{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={link} className="hover:underline">
          lifestyle inflatie
        </Link>
        . Wat normaal is voor boodschappen:{" "}
        <Link href="/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand" style={link} className="hover:underline">
          wat is een normaal bedrag voor boodschappen
        </Link>
        .
      </p>
    </>
  );
}
