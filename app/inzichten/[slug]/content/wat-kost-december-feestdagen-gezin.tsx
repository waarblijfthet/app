import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import DecemberTeller from "@/components/artikel/DecemberTeller";
import { RAPPORTEN } from "@/lib/rapporten-data";
import { euro } from "@/lib/salaris-vuistregel";
import { decemberPerRapport, bereikFeestdagen } from "@/lib/decembersalaris";
import { JAARWISSELING_BRONNEN, JAARWISSELING_BRON_DATUM } from "@/lib/jaarwisseling-bronnen";

/**
 * Herschreven op 20-nov-2026 (zelfde URL). De oude versie noemde "een
 * gemiddeld huishouden geeft in december zo'n €500 extra uit" en "€113 per
 * persoon aan Sinterklaas" met twee blogs van de Vastelastenbond als bron.
 * Bij openen op 20-nov bleek de Sinterklaasblog van december 2020, de
 * €400 tot €500 ging over kerst alleen, en een commerciële blog telt niet als
 * onderzoek (CLAUDE.md 8.C.12). Die bedragen staan er niet meer in; de eigen
 * cijfers komen uit lib/rapporten-data.ts via decemberPerRapport().
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function Bron({ sleutel, tekst }: { sleutel: keyof typeof JAARWISSELING_BRONNEN; tekst: string }) {
  return (
    <a href={JAARWISSELING_BRONNEN[sleutel].url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
      {tekst}
    </a>
  );
}

export default function WatKostDecemberFeestdagenGezin() {
  const rapporten = decemberPerRapport();
  const feest = bereikFeestdagen();
  const gezin = rapporten.find((r) => r.slug === "tweeverdieners-drie-kinderen");
  const ouder = rapporten.find((r) => r.slug === "alleenstaande-ouder-twee-kinderen");

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {JAARWISSELING_BRON_DATUM}.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Bij de {RAPPORTEN.length} huishoudens van wie ik een geldrapport schreef, kostten de feestdagen {euro(feest.laagste)}{" "}
        tot {euro(feest.hoogste)} per jaar.
        {gezin ? ` Het tweeverdienersgezin met drie kinderen kwam op ${euro(gezin.feestdagenPerJaar)}.` : ""} December voelt
        zwaar omdat cadeaus, boodschappen en uitjes in dezelfde weken vallen, bovenop je gewone lasten.
      </p>

      <h2 className="font-display" style={h2}>Wat kost december voor een gezin?</h2>
      <p className="font-body text-text-soft" style={p}>
        Zoveel als jullie Sinterklaas, kerst en oud en nieuw maken. Zo stond de post feestdagen in de rapporten, per jaar,
        naast de boodschappen per maand om het in verhouding te zien:
      </p>
      <EenvoudigeTabel
        koppen={["Huishouden", "Feestdagen per jaar", "Boodschappen per maand"]}
        rijen={rapporten.map((r) => [
          <Link key={r.slug} href={`/rapporten/${r.slug}`} style={link} className="hover:underline">
            {r.naam}, {r.netto}
          </Link>,
          r.metVerjaardagen ? `${euro(r.feestdagenPerJaar)} (met verjaardagen)` : euro(r.feestdagenPerJaar),
          euro(r.boodschappenPerMaand),
        ])}
        bijschrift={`Mijn eigen rapporten, n = ${RAPPORTEN.length}, bedragen zoals de huishoudens ze aanleverden. Geen steekproef van Nederland.`}
      />
      {gezin && ouder ? (
        <p className="font-body text-text-soft" style={p}>
          Voor het gezin met drie kinderen was {euro(gezin.feestdagenPerJaar)} aan feestdagen meer dan een volle maand
          boodschappen ({euro(gezin.boodschappenPerMaand)}). Bij de alleenstaande moeder met twee kinderen was het{" "}
          {euro(ouder.feestdagenPerJaar)}, tegenover {euro(ouder.boodschappenPerMaand)} boodschappen per maand.
        </p>
      ) : null}

      <h2 className="font-display" style={h2}>Wat kostte jouw december?</h2>
      <DecemberTeller />

      <h2 className="font-display" style={h2}>Waarom voelt december als een klap?</h2>
      <p className="font-body text-text-soft" style={p}>
        Omdat het een uitgave is die maar één keer per jaar komt, en daardoor niet in je maandbudget staat. Wijzer in
        geldzaken wijst erop dat rekeningen die niet elke maand komen ervoor kunnen zorgen dat je te weinig op je rekening
        hebt, ook als je genoeg verdient (
        <Bron sleutel="wijzerVijfStappen" tekst={`Wijzer in geldzaken, geopend ${JAARWISSELING_BRON_DATUM}`} />
        ). Het Nibud noemt het daarom handig om vooraf te weten welke maanden duur en welke goedkoop zijn, met een
        jaarbegroting (
        <Bron sleutel="nibudPlannen" tekst={`Nibud, geopend ${JAARWISSELING_BRON_DATUM}`} />
        ).
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daar komt de sociale kant bij. Doet de klas mee met surprises, dan wil niemand zijn kind als enige zonder cadeau
        sturen. Dat voelt niet als een vrije keuze, en dat maakt bezuinigen in december lastig. Makkelijker is
        het om het bedrag eerder in het jaar al klaar te hebben. Waar de rest van het geld in zo&apos;n huishouden blijft,
        lees je in{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld" style={link} className="hover:underline">
          waar blijft mijn geld
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Hoe voorkom je de decemberklap?</h2>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.6rem" }}>
          Kijk wat december vorig jaar kostte, in je afschrift of met de teller hierboven.
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          Deel dat door twaalf en zet het elke maand automatisch apart, op een eigen rekening. Zo werkt de{" "}
          <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={link} className="hover:underline">
            potjesmethode
          </Link>
          , en hoe je alle jaarkosten zo regelt, staat in{" "}
          <Link href="/inzichten/jaarlijkse-kosten-reserveren" style={link} className="hover:underline">
            jaarlijkse kosten reserveren
          </Link>
          .
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          Krijg je een dertiende maand of eindejaarsuitkering, zet die dan apart voordat je hem uitgeeft, zoals het Nibud
          adviseert voor extra inkomsten (
          <Bron sleutel="nibudSparen" tekst={`Nibud, geopend ${JAARWISSELING_BRON_DATUM}`} />
          ).
        </li>
        <li>
          Komt je salaris in december eerder, dan moet datzelfde salaris ook nog januari door. Hoe lang precies, reken je uit
          in{" "}
          <Link href="/inzichten/salaris-december-eerder-lange-januari" style={link} className="hover:underline">
            salaris eerder in december en de lange januari
          </Link>
          .
        </li>
      </ol>
    </>
  );
}
