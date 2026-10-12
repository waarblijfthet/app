import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import GatSnelcheck from "@/components/artikel/GatSnelcheck";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import {
  ICP_BRONNEN,
  BRON_DATUM,
  jaarkostenPerRapport,
  bereikJaarkostenPerMaand,
  NIBUD_BUDGETADVIES_PER_JAAR,
} from "@/lib/icp-bronnen";
import { euro } from "@/lib/salaris-vuistregel";

/**
 * Nieuw artikel, 12-okt-2026: "waar blijft mijn geld".
 *
 * De merknaam is de zoekterm, en die stond op google.nl niet in de top 9
 * (docs/serp-icp-zoekgedrag-12-okt-2026.md): Wijzer in geldzaken, Nibud
 * Persoonlijk Budgetadvies, Goede Geldgewoonten en ING wel. Autocomplete:
 * "waar blijft mijn geld ing/rabobank", "waar gaat mijn geld naartoe".
 *
 * Neemt de 301's op van waarom-hou-ik-nooit-geld-over,
 * waar-blijft-mijn-geld-einde-maand, goed-salaris-toch-krap,
 * goed-salaris-toch-geldstress en alleen-wonen-goed-salaris-toch-krap: de
 * probleemtaal zonder zoekvolume staat hier nu als sectie, niet als titel
 * (CLAUDE.md 8.H.26 en 28).
 *
 * Eigen cijfers: per rapport de jaaruitgaven, uit lib/icp-bronnen.ts, n is
 * RAPPORTEN.length en er wordt niet gemiddeld.
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

export default function WaarBlijftMijnGeld() {
  const jaar = jaarkostenPerRapport();
  const bereik = bereikJaarkostenPerMaand();
  const alleen = rapportVoorSlug("alleenstaand-huurwoning")!;
  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Waar je geld blijft, zie je pas als je een paar maanden afschriften naast elkaar legt en elke uitgave een plek
        geeft. Bij de {RAPPORTEN.length} huishoudens die ik volledig doorrekende ging er {euro(bereik.laagste)} tot{" "}
        {euro(bereik.hoogste)} per maand naar uitgaven die maar een paar keer per jaar langskomen. Daar zoek je als
        eerste.
      </p>

      <h2 className="font-display" style={h2}>Waar blijft mijn geld meestal?</h2>
      <p className="font-body text-text-soft" style={p}>
        Niet in je vaste lasten: huur, hypotheek en verzekeringen zie je elke maand terug, dus die ken je. Het geld
        waar je niet bij kunt, zit in twee soorten uitgaven: wat maar een paar keer per jaar langskomt, en wat
        elke maand anders is. Zo zag dat eruit bij de huishoudens van wie ik een rapport schreef.
      </p>
      <EenvoudigeTabel
        koppen={["Huishouden", "Jaaruitgaven per jaar", "Per maand"]}
        rijen={jaar.map((j) => [
          <Link key={j.slug} href={`/rapporten/${j.slug}`} style={link} className="hover:underline">
            {j.korteNaam}, {j.netto}
          </Link>,
          euro(j.perJaar),
          euro(j.perMaand),
        ])}
        bijschrift={`Mijn eigen rapporten, n = ${RAPPORTEN.length}. Geen steekproef van Nederland, wel echte huishoudens met echte bedragen. Vakantie, feestdagen, onderhoud, auto en overig.`}
      />
      <p className="font-body text-text-soft" style={p}>
        De alleenstaande in een huurwoning dacht vooraf aan bestellen, uitgaan en online aankopen. Mijn conclusie: &ldquo;{alleen.uitkomstKop}.&rdquo;{" "}
        Bij het gezin met drie kinderen luidde die &ldquo;{gezin.uitkomstKop}.&rdquo; Bij dat gezin zat het geld in de
        optelsom, niet in een uitschieter.
      </p>

      <h2 className="font-display" style={h2}>Hoe zoek ik uit waar mijn geld blijft?</h2>
      <p className="font-body text-text-soft" style={p}>
        Je hebt er een avond en je bankapp voor nodig. Zo pak ik het zelf aan bij een rapport.
      </p>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Pak drie maanden afschriften.</strong> Eén maand is te toevallig. Het
          Nibud geeft voor zijn eigen budgetadvies dezelfde tip: houd je bankafschriften bij de hand (
          <Bron sleutel="nibudBudgetadvies" tekst={`Nibud, geopend ${BRON_DATUM}`} />
          ).
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Geef elke uitgave een van drie plekken:</strong> vast (elke maand
          hetzelfde), dagelijks (elke maand anders) of jaarlijks (een paar keer per jaar).
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Tel de jaarlijkse uitgaven op en deel door twaalf.</strong> Dat is het
          bedrag dat je elke maand opzij zou moeten zetten. Wijzer in geldzaken wijst op hetzelfde: rekeningen die maar
          een of een paar keer per jaar komen, kunnen je rekening leeg laten lopen, ook als je genoeg verdient (
          <Bron sleutel="wijzerVijfStappen" tekst={`Wijzer in geldzaken, geopend ${BRON_DATUM}`} />
          ).
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Zet wat er op papier overblijft naast wat er echt overblijft.</strong> Het
          verschil is het geld dat je niet kunt aanwijzen.
        </li>
        <li>
          <strong style={{ fontWeight: 500 }}>Kijk naar de categorie zonder plafond.</strong> Bestellen, uitgaan,
          online aankopen en kleine dingen voor de kinderen. Geen enkele uitgave is het probleem; de optelsom wel.
        </li>
      </ol>

      <h2 className="font-display" style={h2}>Hoeveel geld kun je niet aanwijzen?</h2>
      <p className="font-body text-text-soft" style={p}>
        Stap 4 kun je hier meteen doen. Vier bedragen per maand, ronde getallen zijn genoeg.
      </p>
      <GatSnelcheck />

      <h2 className="font-display" style={h2}>Waarom zie ik het niet in mijn bankapp?</h2>
      <p className="font-body text-text-soft" style={p}>
        Je bankapp telt per maand, en jaaruitgaven vallen in een paar maanden. In juli lijkt vakantie je grootste post,
        in december de feestdagen, en in de maanden ertussen lijkt er ruimte over te blijven. Die ruimte is er niet: hij
        is al uitgegeven aan de volgende piek. Het Nibud ziet hetzelfde in zijn onderzoek: huishoudens betalen eerst de
        vaste lasten en hebben daarna vaker moeite met huishoudelijke uitgaven en reserveringsuitgaven (
        <Bron sleutel="nibudGeldzaken2024" tekst={`Nibud, Geldzaken in de praktijk 2024, geopend ${BRON_DATUM}`} />
        ).
      </p>

      <h2 className="font-display" style={h2}>Waarom heb ik nooit geld over terwijl ik goed verdien?</h2>
      <p className="font-body text-text-soft" style={p}>
        Omdat een hoger inkomen meer uitgaven toelaat die je niet hoeft te plannen. Wie krap zit, kijkt bij elke
        aankoop. Wie goed verdient, merkt een paar honderd euro per maand niet, tot het spaardoel elk jaar niet gehaald
        wordt. Hoe dat werkt als je inkomen stijgt, staat in{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={link} className="hover:underline">
          lifestyle inflatie
        </Link>
        . Waar je met je inkomen staat ten opzichte van de rest van Nederland, lees je in{" "}
        <Link href="/inzichten/is-4000-euro-netto-goed-salaris-nederland" style={link} className="hover:underline">
          is €4.000 netto een goed salaris
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Niet elke krappe maand heeft een lek. Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} huishoudens die ik
        doorrekende viel er niets te repareren: het geld ging naar dingen die ze zelf belangrijk vonden, alleen paste
        het spaardoel daar niet naast. Ook dat is een antwoord op de vraag waar je geld blijft.
      </p>

      <h2 className="font-display" style={h2}>Wat doe je als je weet waar het blijft?</h2>
      <p className="font-body text-text-soft" style={p}>
        Eerst de jaaruitgaven een eigen rekening geven, dan pas sparen. Hoe je dat bedrag bepaalt, staat in{" "}
        <Link href="/inzichten/jaarlijkse-kosten-reserveren" style={link} className="hover:underline">
          jaarlijkse kosten reserveren
        </Link>
        . Waarom sparen zonder die stap steeds mislukt, lees je in{" "}
        <Link href="/inzichten/waarom-lukt-sparen-niet" style={link} className="hover:underline">
          waarom kan ik niet sparen
        </Link>
        . En wil je het zelf blijven bijhouden, gebruik dan mijn{" "}
        <Link href="/inzichten/huishoudboekje-voorbeeld" style={link} className="hover:underline">
          gratis huishoudboekje in Excel
        </Link>
        , met een tabblad voor jaaruitgaven en een voor wat er echt overblijft.
      </p>

      <h2 className="font-display" style={h2}>Kan iemand anders uitzoeken waar mijn geld blijft?</h2>
      <p className="font-body text-text-soft" style={p}>
        Ja. Het Persoonlijk Budgetadvies van het Nibud is gratis en wordt volgens het Nibud {NIBUD_BUDGETADVIES_PER_JAAR}{" "}
        keer per jaar ingevuld (
        <Bron sleutel="nibudBudgetadvies" tekst={`Nibud, geopend ${BRON_DATUM}`} />
        ). Het vergelijkt je uitgaven met wat het Nibud als minimum rekent. Mijn gratis analyse vergelijkt met de
        huishoudens die ik doorrekende, en zet wat er op papier overblijft naast wat je zelf merkt. Hoeveel je per
        maand zou moeten overhouden, staat in{" "}
        <Link href="/inzichten/hoeveel-geld-overhouden-einde-maand" style={link} className="hover:underline">
          hoeveel geld moet je overhouden
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Wat een gezin per post uitgeeft:{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={link} className="hover:underline">
          wat geeft een gezin uit per maand
        </Link>
        . Voor een stel zonder kinderen:{" "}
        <Link href="/inzichten/gemiddelde-uitgaven-per-maand-2-personen" style={link} className="hover:underline">
          gemiddelde uitgaven per maand voor 2 personen
        </Link>
        . En wat je kunt doen om meer over te houden:{" "}
        <Link href="/inzichten/meer-geld-overhouden" style={link} className="hover:underline">
          meer geld overhouden
        </Link>
        .
      </p>
    </>
  );
}
