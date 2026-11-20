import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import NoBuyLijst from "@/components/artikel/NoBuyLijst";
import { RAPPORTEN } from "@/lib/rapporten-data";
import { euro } from "@/lib/salaris-vuistregel";
import {
  JAARWISSELING_BRONNEN,
  JAARWISSELING_BRON_DATUM,
  MC_KLEDINGSTUKKEN_PER_JAAR,
  MC_CO2_SPULLEN_PCT,
  vrijeUitgavenPerRapport,
} from "@/lib/jaarwisseling-bronnen";

/**
 * Nieuw artikel, 20-nov-2026: "no buy year".
 *
 * SERP google.nl 20-nov (docs/serp-jaarwisseling-20-nov-2026.md): AI-overzicht
 * in het Engels, When Sara Smiles (2025), Quest (feb 2025), Reddit r/nobuy,
 * Becoming Minimalist, Substack. Geen recente Nederlandse pagina met regels,
 * een lijst en het geldverhaal. GSC: nul vertoningen op "buy". Slug zonder
 * jaartal, zodat de sweep van december volgend jaar alleen de titel hoeft te
 * wijzigen (CLAUDE.md 8.F.23).
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

export default function NoBuyYear() {
  const vrij = vrijeUitgavenPerRapport();

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {JAARWISSELING_BRON_DATUM}.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Een no buy year is een jaar waarin je alleen koopt wat nodig is of kapot gaat, en vooraf vastlegt wat je niet koopt.
        Nederlanders kopen volgens Milieu Centraal gemiddeld {MC_KLEDINGSTUKKEN_PER_JAAR} kledingstukken per jaar. Wat het
        jou oplevert, hangt af van wat je vorig jaar aan die categorieën uitgaf, en dat staat in je afschrift.
      </p>

      <h2 className="font-display" style={h2}>Wat is een no buy year?</h2>
      <p className="font-body text-text-soft" style={p}>
        Een afspraak met jezelf voor twaalf maanden. Je kiest een paar categorieën waarin je niets nieuws koopt, en houdt
        daarnaast gewoon boodschappen, vaste lasten en wat echt vervangen moet. Er zijn drie vormen:
      </p>
      <ul className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "disc" }}>
        <li style={{ marginBottom: "0.4rem" }}>
          <strong style={{ fontWeight: 500 }}>Streng:</strong> alleen het noodzakelijke, en vervanging als iets kapot is.
        </li>
        <li style={{ marginBottom: "0.4rem" }}>
          <strong style={{ fontWeight: 500 }}>Low buy:</strong> alles mag, maar met een vast aantal of een vast bedrag per
          categorie.
        </li>
        <li>
          <strong style={{ fontWeight: 500 }}>Per categorie:</strong> alleen de categorie waar je geld het makkelijkst
          weglekt, zoals kleding of eten bestellen.
        </li>
      </ul>
      <p className="font-body text-text-soft" style={p}>
        Een jaar is lang. Wie wil proberen, begint met een no buy maand of een no spend challenge van een paar weken. Dezelfde
        lijst werkt daarvoor.
      </p>

      <h2 className="font-display" style={h2}>Welke regels stel je op voor een no buy year?</h2>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Schrijf op wat wel mag.</strong> Boodschappen, verzorging die op is, cadeaus
          met een vast bedrag, vervanging van wat kapot gaat.
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Schrijf op wat niet mag</strong>, per categorie, zo concreet mogelijk. &ldquo;Geen
          kleding&rdquo; is duidelijker dan &ldquo;minder kleding&rdquo;.
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Een wachtregel voor twijfel.</strong> Het Nibud adviseert om er een nachtje
          over te slapen, en bij online winkelen het product in je mandje te laten staan tot de volgende dag (
          <Bron sleutel="nibudBesparen" tekst={`Nibud, geopend ${JAARWISSELING_BRON_DATUM}`} />
          ). Voor een no buy year mag die termijn langer.
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Tweedehands, lenen en ruilen</strong>: kies vooraf of dat mag. Milieu
          Centraal noemt ze als alternatief voor nieuw kopen (
          <Bron sleutel="milieuCentraalConsuminderen" tekst={`Milieu Centraal, geopend ${JAARWISSELING_BRON_DATUM}`} />
          ).
        </li>
        <li>
          <strong style={{ fontWeight: 500 }}>Wat je niet uitgeeft, zet je apart</strong>, elke maand, op een eigen
          rekening. Anders verdwijnt het in andere uitgaven en zie je aan het eind van het jaar niets terug.
        </li>
      </ol>

      <h2 className="font-display" style={h2}>Maak je no buy lijst</h2>
      <p className="font-body text-text-soft" style={p}>
        Zet per categorie je regel, en vul bij wat je schrapt in wat het vorig jaar ongeveer per maand kostte. Je kunt de
        pagina daarna afdrukken.
      </p>
      <NoBuyLijst />

      <h2 className="font-display" style={h2}>Wat levert een no buy year op?</h2>
      <p className="font-body text-text-soft" style={p}>
        Precies wat je vorig jaar aan de geschrapte categorieën uitgaf, en niet meer. Het Nibud schrijft dat mensen vaak
        ongemerkt meer uitgeven dan ze denken (
        <Bron sleutel="nibudBesparen" tekst={`Nibud, geopend ${JAARWISSELING_BRON_DATUM}`} />
        ). Begin daarom met tellen, niet met schatten. En tel ook wat niet onder spullen valt: bij de {RAPPORTEN.length}{" "}
        huishoudens van wie ik een geldrapport schreef, zag het er per maand zo uit.
      </p>
      <EenvoudigeTabel
        koppen={["Huishouden", "Vrije tijd per maand", "Abonnementen per maand"]}
        rijen={vrij.map((r) => [
          <Link key={r.slug} href={`/rapporten/${r.slug}`} style={link} className="hover:underline">
            {r.naam}, {r.netto}
          </Link>,
          euro(r.vrijeTijd),
          euro(r.abonnementen),
        ])}
        bijschrift={`Mijn eigen rapporten, n = ${RAPPORTEN.length}, bedragen zoals de huishoudens ze aanleverden. Geen steekproef van Nederland.`}
      />
      <p className="font-body text-text-soft" style={p}>
        Uitjes, horeca en abonnementen vallen niet vanzelf onder een no buy year. Wil je daar ook iets aan doen, zet ze dan
        op je lijst, of loop eerst je abonnementen na met{" "}
        <Link href="/inzichten/vergeten-abonnementen-opzeggen" style={link} className="hover:underline">
          vergeten abonnementen opzeggen
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Er is ook een tweede opbrengst. Volgens Milieu Centraal komt zo&apos;n {MC_CO2_SPULLEN_PCT} procent van de CO2 die
        een huishouden uitstoot door nieuwe spullen en kleding (
        <Bron sleutel="milieuCentraalConsuminderen" tekst={`Milieu Centraal, geopend ${JAARWISSELING_BRON_DATUM}`} />
        ).
      </p>

      <h2 className="font-display" style={h2}>Werkt een no buy year ook als je goed verdient?</h2>
      <p className="font-body text-text-soft" style={p}>
        Ja, maar het lost iets anders op dan je denkt. Groeien je uitgaven mee met je inkomen zonder dat je één grote
        aankoop kunt aanwijzen, dan heet dat lifestyle inflatie. Een no buy year maakt zichtbaar welk deel daarvan spullen
        zijn. Zit het grootste deel in vaste lasten, de auto of vrije tijd, dan verandert er aan het eind van de maand
        weinig. Hoe je dat uitzoekt, lees je in{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={link} className="hover:underline">
          lifestyle inflatie
        </Link>{" "}
        en{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld" style={link} className="hover:underline">
          waar blijft mijn geld
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Je no buy year als een van je doelen voor het jaar:{" "}
        <Link href="/inzichten/financiele-doelen-stellen-2027" style={link} className="hover:underline">
          financiële doelen stellen
        </Link>
        . Waar je verder ruimte vindt:{" "}
        <Link href="/inzichten/meer-geld-overhouden" style={link} className="hover:underline">
          meer geld overhouden
        </Link>
        . Met contant geld en enveloppen werken:{" "}
        <Link href="/inzichten/cash-stuffing-beginnen" style={link} className="hover:underline">
          cash stuffing
        </Link>
        .
      </p>
    </>
  );
}
