import Link from "next/link";
import KeuzeDoorrekening from "@/components/artikel/KeuzeDoorrekening";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import { BRONNEN, BRON_DATUM, MAX_OPVANGUREN_PER_MAAND } from "@/lib/geldmomenten-bronnen";
import { KGB_2026 } from "@/lib/kindgebonden-budget";
import { euro } from "@/lib/salaris-vuistregel";

/**
 * Nieuw artikel, geldmoment 1: een dag minder werken (25-sep-2026).
 *
 * Hoofdterm "wat kost een dag minder werken". GSC (23 juni tot 22 september
 * 2026): geen enkele eigen URL vertoont op "minder werken", dus een nieuwe
 * slug zonder kannibalisatie. SERP: docs/serp-geldmomenten-25-sep-2026.md.
 * Iedereen in de top 9 rekent het netto inkomensverlies uit; deze pagina doet
 * dat bewust niet (geen bruto-netto, CLAUDE.md sectie 8) en begint waar de
 * WerkUrenBerekenaar van het Nibud ophoudt: wat doet het verschil met de maand.
 *
 * Hub: tweeverdieners met kinderen (wat-geeft-een-gezin-uit-per-maand).
 * Rapport: tweeverdieners-drie-kinderen, alle bedragen via rapportVoorSlug().
 * Het ene berekende getal is het nulpunt van het kindgebonden budget, uit
 * KGB_2026 in lib/kindgebonden-budget.ts.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

/** Toetsingsinkomen waarboven een stel met één kind onder de 12 in 2026 geen kindgebonden budget meer krijgt. */
const KGB_NUL_EEN_KIND = Math.round(
  (KGB_2026.afbouwpuntPaar + KGB_2026.maxPerKindTot12 / KGB_2026.afbouwpercentage) / 100
) * 100;

export default function WatKostEenDagMinderWerken() {
  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const netto = gezin.kenmerken.find((k) => k.includes("netto")) ?? "";
  const jaarPost = gezin.dagelijks.find((post) => post.label === "Jaarlijkse kosten");

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}.
      </p>

      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Een dag minder werken kost bruto een vijfde van dat salaris: bij vijf werkdagen is één dag 20 procent.
        Netto is het verlies kleiner, en wat je aan opvang en reizen bespaart gaat er nog vanaf. Wat het jullie
        huishouden kost, is dat netto verschil. Of jullie het kunnen missen, hangt af van waar de rest van de
        maand nu naartoe gaat.
      </p>

      <h2 className="font-display" style={h2}>Wat verandert er als een van jullie een dag minder gaat werken?</h2>
      <p className="font-body text-text-soft" style={p}>
        Niet alles verandert even hard, en het hangt af van waar jullie kinderen overdag zijn. Dit zijn de posten die
        bewegen, per soort huishouden.
      </p>
      <EenvoudigeTabel
        koppen={["Post", "Kinderen op de dagopvang", "Kinderen op de BSO", "Geen opvang"]}
        rijen={[
          ["Netto inkomen", "Omlaag, minder dan bruto", "Omlaag, minder dan bruto", "Omlaag, minder dan bruto"],
          ["Kinderopvang", "Vaak een dag minder opvang", "Vaak een middag minder BSO", "Verandert niet"],
          ["Kinderopvangtoeslag", "Percentage kan iets omhoog door lager inkomen", "Percentage kan iets omhoog door lager inkomen", "Niet van toepassing"],
          ["Pensioen", "Minder opbouw bij een werkgeverspensioen", "Minder opbouw bij een werkgeverspensioen", "Minder opbouw bij een werkgeverspensioen"],
          ["Reizen en werk", "Een dag minder reiskosten", "Een dag minder reiskosten", "Een dag minder reiskosten"],
        ]}
        bijschrift="Wat er beweegt, niet hoeveel. De bedragen verschillen per salaris en per toeslag."
      />

      <h2 className="font-display" style={h2}>Hoeveel hou ik netto over als ik minder ga werken?</h2>
      <p className="font-body text-text-soft" style={p}>
        Dat reken ik bewust niet voor je uit, want het hangt af van je salaris, je toeslagen en je pensioenregeling. De
        WerkUrenBerekenaar van het Nibud doet het wel: &ldquo;In ongeveer 15 minuten zie je precies wat meer of minder
        uren werken betekent voor het netto-inkomen&rdquo; (
        <a href={BRONNEN.werkuren.url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
          Nibud, geopend {BRON_DATUM}
        </a>
        ). Een proefloonstrook van je werkgever is het andere goede vertrekpunt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Waarom netto minder wegvalt dan bruto: de uren die je laat vallen zijn de uren waarover je het hoogste
        tarief betaalt. Hoe groot dat scheelt, verschilt per inkomen. Neem dus nooit het bruto verschil als
        uitgangspunt voor je maand.
      </p>

      <h2 className="font-display" style={h2}>Wat doet een dag minder werken met de kinderopvang?</h2>
      <p className="font-body text-text-soft" style={p}>
        Vaak het meeste van alles. Wie een dag thuis is, heeft meestal een dag minder opvang nodig, en die dag betaal
        je voor het deel boven de toeslag zelf. De toeslag zelf hangt niet aan je gewerkte uren: je krijgt hem voor
        maximaal {MAX_OPVANGUREN_PER_MAAND} opvanguren per kind per maand, &ldquo;het maakt niet uit hoeveel uur u per
        maand werkt&rdquo; (
        <a href={BRONNEN.opvanguren.url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
          Dienst Toeslagen, geopend {BRON_DATUM}
        </a>
        ). Wel krijg je alleen toeslag voor de uren in je opvangcontract, dus minder dagen is ook minder toeslag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het percentage dat je vergoed krijgt, hangt aan je gezamenlijke inkomen: hoe lager, hoe hoger het percentage.
        Voor het tweede kind ligt het hoger dan voor het eerste. De tabel per inkomen staat in{" "}
        <Link href="/inzichten/kinderopvangtoeslag-2027-tweeverdieners" style={link} className="hover:underline">
          kinderopvangtoeslag 2027 voor tweeverdieners
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Krijg je meer toeslag als je minder gaat werken?</h2>
      <p className="font-body text-text-soft" style={p}>
        Soms iets. Het percentage kinderopvangtoeslag loopt per inkomensschijf af, dus een lager inkomen kan het iets verhogen. Het kindgebonden
        budget helpt bij een goed inkomen meestal niet: voor een stel met één kind onder de 12 was het in 2026 al nul
        vanaf een gezamenlijk toetsingsinkomen van ongeveer {euro(KGB_NUL_EEN_KIND)} per jaar, berekend met de
        bedragen in{" "}
        <Link href="/inzichten/kindgebonden-budget-2027-inkomensgrens" style={link} className="hover:underline">
          het artikel over het kindgebonden budget
        </Link>
        . Geef een lager inkomen wel op tijd door aan Dienst Toeslagen, anders reken je met een voorschot dat niet meer
        klopt.
      </p>

      <h2 className="font-display" style={h2}>Wat doet een dag minder werken met je pensioen?</h2>
      <p className="font-body text-text-soft" style={p}>
        Bij een pensioen via je werkgever bouw je op over je salaris. Minder salaris is dus minder opbouw, zolang je
        minder werkt. Hoeveel precies, weet alleen je pensioenfonds. Op{" "}
        <a href={BRONNEN.pensioenoverzicht.url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
          mijnpensioenoverzicht.nl
        </a>{" "}
        zie je wat je nu opbouwt; vraag je fonds wat een dag minder daaraan verandert. Ik reken geen pensioen uit en
        adviseer er niet over.
      </p>

      <h2 className="font-display" style={h2}>Reken het uit met jullie eigen bedragen</h2>
      <p className="font-body text-text-soft" style={p}>
        Vul hieronder het netto inkomen nu en na in, en de opvang als die verandert. Je ziet wat er ongeveer met jullie
        vrije ruimte gebeurt. Meer vraagt de doorrekening niet, en meer zegt hij ook niet.
      </p>

      <KeuzeDoorrekening keuze="minder-werken" />

      <h2 className="font-display" style={h2}>Kunnen jullie een dag minder werken?</h2>
      <p className="font-body text-text-soft" style={p}>
        Het netto verschil is de helft van het antwoord. De andere helft is waar jullie geld nu naartoe gaat, en
        daar zit vaak meer ruimte, of juist minder, dan jullie denken. Een gezin met drie kinderen dat ik doorrekende,{" "}
        {netto}, schatte vooraf zelf in wat er misging. &ldquo;{gezin.vermoedenBedrag}&rdquo; Mijn conclusie: &ldquo;{gezin.uitkomstKop}.&rdquo;
        {jaarPost && <> Er ging {jaarPost.waarde.split(":")[0]} op aan voorspelbare jaarkosten waar niet voor werd gereserveerd.</>}{" "}
        <Link href={`/rapporten/${gezin.slug}`} style={link} className="hover:underline">
          Lees hun rapport
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is precies de vraag voor wie minder wil werken. Gaat het inkomen omlaag terwijl er nu al geld in losse
        uitgaven en jaarkosten verdwijnt, dan voelt het gat groter dan de doorrekening zegt. Staat die ruimte er wel,
        dan is het soms minder spannend dan het lijkt. Niet elke maand heeft een lek: bij {AANTAL_ZONDER_LEK} van de{" "}
        {RAPPORTEN.length} huishoudens die ik volledig doorrekende, viel er niets te repareren.
      </p>

      <h2 className="font-display" style={h2}>Wat als een van jullie wil stoppen en de ander twijfelt?</h2>
      <p className="font-body text-text-soft" style={p}>
        Dan helpt het om over dezelfde bedragen te praten in plaats van over een gevoel. Zet eerst de huidige maand op
        tafel, daarna de maand met minder uren, en kijk samen welke posten het verschil moeten dragen. Wie wil
        stoppen, ziet dan wat het vraagt. Wie twijfelt, ziet of die zorg klopt. Hoe je dat gesprek voert, staat in{" "}
        <Link href="/inzichten/praten-over-geld-met-je-partner" style={link} className="hover:underline">
          praten over geld met je partner
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Wat reken ik hier niet uit?</h2>
      <p className="font-body text-text-soft" style={p}>
        Het bruto naar netto, je toeslagen tot op de euro en je pensioen. Die komen van de WerkUrenBerekenaar, Dienst
        Toeslagen en je pensioenfonds. Welke keuze jullie maken, laat ik ook bij jullie. Wat ik wel doe: uitrekenen wat
        jullie maandbudget overlaat bij de keuze die jullie overwegen.
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Wat een gezin per post uitgeeft, op elk inkomen:{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={link} className="hover:underline">
          wat geeft een gezin uit per maand
        </Link>
        . Komt er een kind bij, lees dan{" "}
        <Link href="/inzichten/wat-kost-een-kind-per-maand" style={link} className="hover:underline">
          wat een (tweede) kind met jullie maand doet
        </Link>
        . En waar een inkomen staat ten opzichte van de rest van Nederland:{" "}
        <Link href="/inzichten/is-4000-euro-netto-goed-salaris-nederland" style={link} className="hover:underline">
          is €4.000 netto een goed salaris
        </Link>
        .
      </p>
    </>
  );
}
