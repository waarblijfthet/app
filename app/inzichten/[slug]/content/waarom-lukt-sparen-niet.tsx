import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import JaarkostenTeller from "@/components/artikel/JaarkostenTeller";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import {
  ICP_BRONNEN,
  BRON_DATUM,
  jaarkostenPerRapport,
  NIBUD_SPAARADVIES_PCT,
  NIBUD_SPAART_NIET_ELKE_MAAND_PCT,
  NIBUD_SPAART_MINDER_DAN_10_PCT,
  NIBUD_GELDZAKEN_N,
} from "@/lib/icp-bronnen";
import { euro } from "@/lib/salaris-vuistregel";

/**
 * Herschreven 12-okt-2026 op de hoofdterm "waarom kan ik niet sparen".
 *
 * Deze URL stond op "Crawled, currently not indexed" en had 0 vertoningen in
 * 90 dagen. SERP (docs/serp-icp-zoekgedrag-12-okt-2026.md): Nibud, Reddit,
 * Budgetbuddy ("Waarom verdien ik zoveel geld, maar kan ik niet sparen?",
 * ook in Meer om te vragen), Rabobank. De goedverdiener-hoek staat daarom als
 * H2 onder de hoofdterm, niet als titel (CLAUDE.md 8.H.26).
 *
 * Eigen cijfer: per rapport het spaardoel en wat er echt gebeurde, letterlijk
 * uit lib/rapporten-data.ts, plus de jaaruitgaven per maand.
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

export default function WaaromLuktSparenNiet() {
  const jaar = jaarkostenPerRapport();
  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const stel = rapportVoorSlug("stel-zonder-kinderen")!;
  const ouder = rapportVoorSlug("alleenstaande-ouder-twee-kinderen")!;

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Sparen lukt meestal niet omdat je spaart wat er overblijft, en omdat dezelfde spaarrekening ook vakantie,
        onderhoud en december moet betalen. Het Nibud adviseert minimaal {NIBUD_SPAARADVIES_PCT} procent van je inkomen
        opzij te zetten; zo&apos;n {NIBUD_SPAART_MINDER_DAN_10_PCT} procent van de Nederlanders spaart minder. Het ligt
        zelden aan discipline en vaak aan de volgorde.
      </p>

      <h2 className="font-display" style={h2}>Waarom kan ik niet sparen?</h2>
      <p className="font-body text-text-soft" style={p}>
        Drie redenen komen steeds terug, en geen ervan gaat over te veel koffie.
      </p>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Je spaart wat er overblijft.</strong> Aan het eind van de maand is dat
          bijna nooit veel, omdat uitgaven zich aanpassen aan wat er op je rekening staat.
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Je spaarrekening betaalt ook je jaaruitgaven.</strong> Vakantie, de
          autorekening en december komen van dezelfde rekening als je buffer, dus het saldo zakt steeds terug. Het Nibud
          bedoelt een buffer voor onverwachte kosten, niet voor wat je elk jaar kunt zien aankomen (
          <Bron sleutel="nibudBuffer" tekst={`Nibud, geopend ${BRON_DATUM}`} />
          ).
        </li>
        <li>
          <strong style={{ fontWeight: 500 }}>Je spaardoel past niet bij hoe je leeft.</strong> Dat is geen lek maar een
          keuze die nog niet gemaakt is. Bij het stel zonder kinderen dat ik doorrekende was mijn conclusie: &ldquo;
          {stel.uitkomstKop}.&rdquo;
        </li>
      </ol>

      <h2 className="font-display" style={h2}>Waarom verdien ik genoeg maar kan ik niet sparen?</h2>
      <p className="font-body text-text-soft" style={p}>
        Bij een hoger inkomen speelt reden 2 harder. Wie meer verdient, gaat vaker en verder op vakantie, heeft een
        duurder huis om te onderhouden en meer verjaardagen en feestdagen om te betalen. Die posten komen niet elke
        maand, dus ze voelen niet als vaste lasten. Bij de huishoudens van wie ik een rapport schreef, zag dat er zo uit.
      </p>
      <EenvoudigeTabel
        koppen={["Huishouden", "Spaardoel en wat er gebeurde", "Jaaruitgaven per maand"]}
        rijen={jaar.map((j) => [
          <Link key={j.slug} href={`/rapporten/${j.slug}`} style={link} className="hover:underline">
            {j.korteNaam}, {j.netto}
          </Link>,
          j.spaardoel,
          euro(j.perMaand),
        ])}
        bijschrift={`Mijn eigen rapporten, n = ${RAPPORTEN.length}, de bedragen zoals de huishoudens ze aanleverden. Geen steekproef van Nederland.`}
      />
      <p className="font-body text-text-soft" style={p}>
        Bij het gezin met drie kinderen ging er regelmatig geld terug van de spaarrekening. Mijn conclusie: &ldquo;
        {gezin.uitkomstKop}.&rdquo; Het probleem zat in jaaruitgaven waar niet apart voor werd gespaard. Bij {AANTAL_ZONDER_LEK}{" "}
        van de {RAPPORTEN.length} huishoudens viel er niets te repareren; daar paste het spaardoel niet bij keuzes die ze
        zelf wilden houden.
      </p>

      <h2 className="font-display" style={h2}>Hoeveel moet je sparen per maand?</h2>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud adviseert elk huishouden minimaal {NIBUD_SPAARADVIES_PCT} procent van het maandinkomen opzij te zetten,
        eerst voor een buffer en daarna voor andere doelen (
        <Bron sleutel="nibudSparenAanpak" tekst={`Nibud, geopend ${BRON_DATUM}`} />
        ). In het Nibud-onderzoek onder {NIBUD_GELDZAKEN_N} Nederlanders spaarde {NIBUD_SPAART_NIET_ELKE_MAAND_PCT}{" "}
        procent niet consequent elke maand en zo&apos;n {NIBUD_SPAART_MINDER_DAN_10_PCT} procent minder dan{" "}
        {NIBUD_SPAARADVIES_PCT} procent van het inkomen (
        <Bron sleutel="nibudGeldzaken2024" tekst={`Nibud, Geldzaken in de praktijk 2024, geopend ${BRON_DATUM}`} />
        ). Wat normaal is per huishouden, staat in{" "}
        <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={link} className="hover:underline">
          hoeveel sparen per maand is normaal
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Hoe zorg je dat sparen wel lukt?</h2>
      <p className="font-body text-text-soft" style={p}>Draai de volgorde om, in drie stappen.</p>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Eerst de jaaruitgaven.</strong> Tel op wat vakantie, feestdagen, huis en
          auto per jaar kosten, deel door twaalf en zet dat elke maand op een eigen rekening. Hoe, staat in{" "}
          <Link href="/inzichten/jaarlijkse-kosten-reserveren" style={link} className="hover:underline">
            jaarlijkse kosten reserveren
          </Link>
          .
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Dan de buffer, direct na je salaris.</strong> Een automatische
          overboeking op salarisdag. De landelijke spaarcampagne van Wijzer in geldzaken heet niet voor niets
          &ldquo;Betaal jezelf eerst&rdquo; (
          <Bron sleutel="wijzerBetaalJezelfEerst" tekst={`Wijzer in geldzaken, geopend ${BRON_DATUM}`} />
          ).
        </li>
        <li>
          <strong style={{ fontWeight: 500 }}>Pas dan je spaardoel, en maak het haalbaar.</strong> Bij de
          alleenstaande moeder die ik doorrekende, was het eerste punt van het plan: &ldquo;{ouder.plan[0]}&rdquo; Haar
          evaluatie {ouder.doorlooptijd}: &ldquo;{ouder.evaluatie.split(". ").slice(2, 4).join(". ")}.&rdquo;
        </li>
      </ol>
      <p className="font-body text-text-soft" style={p}>
        Reken hieronder uit wat jouw jaaruitgaven per maand vragen. Dat is het bedrag dat nu waarschijnlijk van je
        spaarrekening komt.
      </p>
      <JaarkostenTeller />

      <h2 className="font-display" style={h2}>Waarom haal ik steeds geld van mijn spaarrekening?</h2>
      <p className="font-body text-text-soft" style={p}>
        Omdat er geen andere plek is voor uitgaven die je wel ziet aankomen maar niet maandelijks betaalt. Dan voelt
        elke vakantie of autorekening als een tegenvaller, terwijl het een vaste uitgave is die eens per jaar komt.
        Waar de rest van je geld blijft, zoek je uit met{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld" style={link} className="hover:underline">
          waar blijft mijn geld
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Hoe je uitgaven meestijgen met je inkomen:{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={link} className="hover:underline">
          lifestyle inflatie
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
