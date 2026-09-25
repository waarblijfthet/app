import Link from "next/link";
import KeuzeDoorrekening from "@/components/artikel/KeuzeDoorrekening";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import { rapportVoorSlug, RAPPORTEN } from "@/lib/rapporten-data";
import {
  BRONNEN,
  BRON_DATUM,
  NIBUD_KINDKOSTEN_PCT,
  KINDERBIJSLAG_KWARTAAL_2026,
  kinderbijslagPerMaand,
} from "@/lib/geldmomenten-bronnen";
import { percentageEersteKind2026, percentageTweedeKind2026 } from "@/lib/kinderopvangtoeslag-2027";
import { euro } from "@/lib/salaris-vuistregel";

/**
 * Upgrade geldmoment 4, een (tweede) kind (25-sep-2026). Zelfde URL, hoofdterm
 * blijft "wat kost een kind per maand", nieuwe invalshoek: wat doet een tweede
 * kind met jullie maand. Oude titel en metaTitel: "Wat kost een kind per maand?".
 * GSC 23 juni tot 22 september 2026: 0 vertoningen op deze URL.
 *
 * Gecorrigeerd op 25-sep-2026, na het openen van de Nibud-pagina:
 * - "€887 tot €1.000 per maand voor een modaal gezin" staat niet bij het Nibud
 *   en is weg (Google's AI-overzicht noemt het wel, met Nibud als bron);
 * - alleenstaande ouder met twee kinderen is 31 procent, niet 37 (dat is drie);
 * - het praktijkblok over "twee dagen minder BSO" kwam niet uit
 *   lib/rapporten-data.ts en is weg, net als de links naar de casestudy Fatima
 *   (illustratie) en het artikel over Karim en Noor (niet in rapporten-data).
 *
 * Percentages: Nibud (op basis van CBS), geopend 25-sep-2026. Kinderbijslag:
 * SVB. Toeslagpercentages: KOT_2026_TABEL (Belastingdienst, 13-sep-2026).
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

/** Rekenvoorbeeld: wat het Nibud-percentage is bij twee besteedbare inkomens. */
const VOORBEELD_INKOMENS = [4000, 6000];
/** Toetsingsinkomen voor het toeslagvoorbeeld. */
const TOETS_VOORBEELD = 100000;

const pct = (n: number) => `${Math.round(n * 1000) / 10}`.replace(".", ",") + "%";
const euroCent = (n: number) =>
  "€" + n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function WatKostEenKindPerMaand() {
  const tw = NIBUD_KINDKOSTEN_PCT.tweeouder;
  const een = NIBUD_KINDKOSTEN_PCT.eenouder;
  const kb6 = kinderbijslagPerMaand("tot6");
  const eerste = percentageEersteKind2026(TOETS_VOORBEELD);
  const tweede = percentageTweedeKind2026(TOETS_VOORBEELD);

  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const ouder = rapportVoorSlug("alleenstaande-ouder-twee-kinderen")!;
  const kinderenGezin = gezin.dagelijks.find((post) => post.label === "Kinderen");
  const kinderenOuder = ouder.dagelijks.find((post) => post.label === "Kinderen");
  const metKinderen = RAPPORTEN.filter((r) => r.kenmerken.some((k) => /kinderen/.test(k) && !/geen/.test(k))).length;

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}.
      </p>

      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Een kind kost een gezin met twee ouders gemiddeld {tw[1]} procent van het besteedbaar inkomen, twee kinderen{" "}
        {tw[2]} procent (Nibud, op basis van CBS). Het tweede kind kost dus minder dan het eerste. De maand verandert wel:
        opvang voor twee, soms een dag minder werken, en {euro(kb6)} kinderbijslag per maand erbij tot het kind 6 is.
      </p>

      <h2 className="font-display" style={h2}>Wat kost een kind per maand, per gezinstype?</h2>
      <EenvoudigeTabel
        koppen={["Kinderen", "Twee ouders", "Een ouder", ...VOORBEELD_INKOMENS.map((i) => `Twee ouders, ${euro(i)} besteedbaar`)]}
        rijen={([1, 2, 3, 4] as const).map((n) => [
          String(n),
          `${tw[n]}%`,
          `${een[n]}%`,
          ...VOORBEELD_INKOMENS.map((i) => euro((i * tw[n]) / 100)),
        ])}
        bijschrift={`Aandeel van het besteedbaar inkomen: Nibud, op basis van CBS, geopend ${BRON_DATUM}. De eurobedragen zijn dat percentage maal het inkomen, een indicatie.`}
      />
      <p className="font-body text-text-soft" style={p}>
        Besteedbaar inkomen is alles wat binnenkomt, dus ook kinderbijslag, kindgebonden budget en vakantiegeld. Het Nibud
        zegt er zelf bij dat het een indicatie is (
        <a href={BRONNEN.nibudKind.url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
          Nibud
        </a>
        ).
      </p>

      <h2 className="font-display" style={h2}>Wat kost een tweede kind?</h2>
      <p className="font-body text-text-soft" style={p}>
        Minder dan het eerste, in procenten: van {tw[1]} naar {tw[2]} procent is {tw[2] - tw[1]} procentpunt erbij. Een
        wieg, kinderwagen en kleding gaan vaak mee naar het tweede. Wat niet meegaat, is de opvang: twee kinderen op de
        dagopvang is twee keer een contract. En de kosten schuiven met de leeftijd op, van opvang naar school, sport en
        telefoon, en op 18 naar{" "}
        <Link href="/inzichten/kind-wordt-18-wat-verandert-er-financieel" style={link} className="hover:underline">
          zorgpremie en studie
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Is kinderopvang goedkoper als je een tweede kind hebt?</h2>
      <p className="font-body text-text-soft" style={p}>
        Per uur wel, want voor het tweede kind krijg je een hoger percentage toeslag. Bij een gezamenlijk
        toetsingsinkomen van {euro(TOETS_VOORBEELD)} was dat in 2026 {pct(eerste)} voor het eerste kind en {pct(tweede)}{" "}
        voor het tweede, volgens de tabel van de Belastingdienst. Onder de streep betaal je toch twee eigen bijdragen. De
        tabel per inkomen staat in{" "}
        <Link href="/inzichten/kinderopvangtoeslag-2027-tweeverdieners" style={link} className="hover:underline">
          kinderopvangtoeslag 2027 voor tweeverdieners
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Hoeveel kinderbijslag krijg je voor een tweede kind?</h2>
      <p className="font-body text-text-soft" style={p}>
        Hetzelfde als voor het eerste, per kind en per leeftijd. In het derde kwartaal van 2026 was dat{" "}
        {euroCent(KINDERBIJSLAG_KWARTAAL_2026.tot6)} per kwartaal tot 6 jaar, {euroCent(KINDERBIJSLAG_KWARTAAL_2026.tot12)} van
        6 tot en met 11 en {euroCent(KINDERBIJSLAG_KWARTAAL_2026.tot18)} van 12 tot en met 17 (
        <a href={BRONNEN.svbBedragen.url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
          SVB, geopend {BRON_DATUM}
        </a>
        ). Per maand is dat {euro(kinderbijslagPerMaand("tot6"))}, {euro(kinderbijslagPerMaand("tot12"))} en{" "}
        {euro(kinderbijslagPerMaand("tot18"))}. Het kindgebonden budget is er bij een goed inkomen vaak niet, zie{" "}
        <Link href="/inzichten/kindgebonden-budget-2027-inkomensgrens" style={link} className="hover:underline">
          de inkomensgrens van het kindgebonden budget
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Kinderopvang of een dag minder werken?</h2>
      <p className="font-body text-text-soft" style={p}>
        Met twee kinderen op de opvang kan een dag minder werken ineens een stuk minder kosten dan het lijkt, omdat er
        twee opvangdagen tegenover staan. Maar het inkomen valt ook voor jaren weg, en bij een werkgeverspensioen de opbouw over dat deel ook.
        Hoe je die twee tegen elkaar zet, staat in{" "}
        <Link href="/inzichten/wat-kost-een-dag-minder-werken" style={link} className="hover:underline">
          wat een dag minder werken voor je hele huishouden kost
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Reken uit wat een (tweede) kind met jullie maand doet</h2>
      <p className="font-body text-text-soft" style={p}>
        De kinderbijslag staat al ingevuld. Vul de opvang in die jullie verwachten, en het netto inkomen na als een van
        jullie minder gaat werken.
      </p>

      <KeuzeDoorrekening keuze="kind" />

      <h2 className="font-display" style={h2}>Waar blijft het geld in een gezin met kinderen?</h2>
      <p className="font-body text-text-soft" style={p}>
        Van de {RAPPORTEN.length} huishoudens die ik volledig doorrekende, hadden er {metKinderen} kinderen. Aan school,
        sport, hobby&apos;s en zakgeld ging bij het gezin met drie kinderen {kinderenGezin?.waarde.split(" voor")[0]} per
        maand op, bij de alleenstaande ouder met twee {kinderenOuder?.waarde}. Eten, kleding en woonruimte zitten daar
        niet in. Het gezin met drie kinderen dacht vooraf dat vooral de boodschappen en de kinderen het probleem waren.
        Mijn conclusie: &ldquo;{gezin.uitkomstKop}.&rdquo;{" "}
        <Link href={`/rapporten/${gezin.slug}`} style={link} className="hover:underline">
          Lees hun rapport
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een kind erbij is een keuze die je maanden vooruit ziet aankomen. Dat is de tijd om te weten waar jullie ruimte
        nu zit, voordat de opvang en het verlof hem invullen.
      </p>

      <h2 className="font-display" style={h2}>Kost een kind voor een alleenstaande ouder meer?</h2>
      <p className="font-body text-text-soft" style={p}>
        In procenten van het inkomen wel: {een[1]} procent voor één kind, {een[2]} voor twee en {een[3]} voor drie, omdat
        één inkomen alle kosten draagt (Nibud). Hoe dat uitpakt, staat in{" "}
        <Link href="/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026" style={link} className="hover:underline">
          kosten levensonderhoud als alleenstaande ouder
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        De hele begroting van een gezin per post:{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={link} className="hover:underline">
          wat geeft een gezin uit per maand
        </Link>
        . Wat de middelbare school kost:{" "}
        <Link href="/inzichten/schoolkosten-per-jaar-gezin" style={link} className="hover:underline">
          schoolkosten per jaar
        </Link>
        . Kinderen die er een deel van de tijd zijn:{" "}
        <Link href="/inzichten/samengesteld-gezin-twee-huishoudens-een-budget" style={link} className="hover:underline">
          samengesteld gezin: twee huishoudens in één budget
        </Link>
        .
      </p>
    </>
  );
}
