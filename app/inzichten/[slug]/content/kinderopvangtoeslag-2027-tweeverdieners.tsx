import Link from "next/link";
import KinderopvangtoeslagRekenaar from "@/components/artikel/KinderopvangtoeslagRekenaar";
import CtaLink from "@/components/CtaLink";
import { geldscanHref } from "@/lib/cta";
import {
  toeslag2026,
  toeslag2027Geraamd,
  MAX_UURPRIJS_2026,
  MAX_UURPRIJS_2027_GERAAMD,
  OMSLAGPUNT_96_PROCENT_2027,
  BOVENGRENS_MIDDENBAND_2027,
  EXTRA_MIDDENBAND_2027,
  EXTRA_TWEEDE_KIND_2027,
  VASTE_VOET_2026,
  VASTE_VOET_2027,
  TABEL_INKOMENS,
} from "@/lib/kinderopvangtoeslag-2027";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function eur(n: number): string {
  return "€" + n.toLocaleString("nl-NL");
}

function pct(n: number): string {
  return (n * 100).toFixed(1).replace(".", ",").replace(",0", "") + "%";
}

// Illustratief rekenvoorbeeld: 1 kind, dagopvang, 150 uur per maand (ongeveer
// 3,5 dag per week), een werkelijk uurtarief van €10. Nooit met de hand
// getypt: elke rij komt uit dezelfde functie die ook de rekenaar hieronder
// gebruikt, zie CLAUDE.md werkregel 2.
function situatie(inkomen: number) {
  return {
    inkomen: inkomen,
    opvangType: "dagopvang" as const,
    urenPerMaand: 150,
    werkelijkUurtarief: 10,
    kindnummer: 1 as const,
  };
}

export default function Kinderopvangtoeslag2027Tweeverdieners() {
  const hoofdRijen = TABEL_INKOMENS.map((inkomen) => ({
    inkomen: inkomen,
    t26: toeslag2026(situatie(inkomen)),
    t27: toeslag2027Geraamd(situatie(inkomen)),
  }));

  const drieGezinnen = [70000, 100000, 140000].map((inkomen) => ({
    inkomen: inkomen,
    t26: toeslag2026(situatie(inkomen)),
    t27: toeslag2027Geraamd(situatie(inkomen)),
  }));

  const voorbeeld100k = hoofdRijen.find((r) => r.inkomen === 100000)!;
  const verschil100k = voorbeeld100k.t26.eigenBijdragePerMaand - voorbeeld100k.t27.eigenBijdragePerMaand;

  // Voorbeeld met een werkelijk tarief boven de maximum uurprijs, om te laten
  // zien dat het percentage niet het hele verhaal is.
  const bovenMax = {
    inkomen: 60000,
    opvangType: "dagopvang" as const,
    urenPerMaand: 150,
    werkelijkUurtarief: 13,
    kindnummer: 1 as const,
  };
  const bovenMax27 = toeslag2027Geraamd(bovenMax);

  return (
    <>
      {/* Herken je dit? */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
      >
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Jullie verdienen samen goed, en toch is de opvangrekening een van de grootste posten op
          de maand. Nu hoor je dat de kinderopvangtoeslag omhoog gaat in 2027, maar niemand zegt
          erbij wat dat voor jullie eigen inkomen betekent.
        </p>
      </div>

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
            "Wat er in het ontwerp voor 2027 verandert aan percentages, inkomensgrenzen en maximum uurprijzen",
            "Waarom 96 procent niet hetzelfde is als 96 procent van je hele rekening",
            "Wat dat ongeveer scheelt bij €60.000, €80.000, €100.000, €120.000 en €150.000 gezamenlijk inkomen",
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

      {/* Antwoord bovenaan, binnen 40 tot 60 woorden */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: in het ontwerp voor 2027 krijgen alle werkende ouders met een gezamenlijk
        toetsingsinkomen tot en met {eur(OMSLAGPUNT_96_PROCENT_2027)} het maximale percentage van 96
        voor het eerste kind, tegen {eur(56412)} nu. Verdien je samen meer, dan gaat je percentage
        met {(EXTRA_MIDDENBAND_2027 * 100).toFixed(1).replace(".", ",")} procentpunt omhoog ten
        opzichte van 2026. Bij €100.000 gezamenlijk inkomen scheelt dat in dit rekenvoorbeeld
        ongeveer {eur(verschil100k)} per maand eigen bijdrage.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 13 september 2026. Dit is nog een ontwerpbesluit: de internetconsultatie
        is gesloten, maar het kabinet neemt het definitieve besluit bij de voorjaarsbesluitvorming
        2026 en de maximum uurprijzen voor 2027 staan pas vast na het Centraal Economisch Plan. Ik
        werk dit artikel bij zodra dat er is.
      </p>

      <h2 className="font-display" style={h2}>
        Wat verandert er in de kinderopvangtoeslag in 2027?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is niet de algemene uitleg die je ook bij de Rijksoverheid vindt. Hieronder staat
        alleen wat er verandert en wat dat voor een tweeverdienersgezin met een goed inkomen
        betekent. 2027 is de derde stap in het ingroeipad naar een nieuw stelsel: in 2025 en 2026
        zijn de eerste twee stappen al gezet.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Onderwerp
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                2026
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                2027 (ontwerp)
              </th>
              <th className="text-left py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Gevolg
              </th>
            </tr>
          </thead>
          <tbody className="align-top">
            <tr style={{ borderBottom: "1px solid #E6E9E7" }}>
              <td className="py-2 pr-3" style={{ color: "#16211F" }}>Vaste voet eerste kind</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{pct(VASTE_VOET_2026)}</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{pct(VASTE_VOET_2027)}</td>
              <td className="py-2 pl-3" style={{ color: "#4A5A56" }}>
                Ook de allerhoogste inkomens krijgen straks minstens {pct(VASTE_VOET_2027)} vergoed
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E6E9E7" }}>
              <td className="py-2 pr-3" style={{ color: "#16211F" }}>Omslagpunt naar 96% (1e kind)</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>tot {eur(56412)}</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>tot {eur(OMSLAGPUNT_96_PROCENT_2027)}</td>
              <td className="py-2 pl-3" style={{ color: "#4A5A56" }}>
                Meer tweeverdieners krijgen het maximale percentage
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E6E9E7" }}>
              <td className="py-2 pr-3" style={{ color: "#16211F" }}>Middenband ({eur(56000)} tot {eur(BOVENGRENS_MIDDENBAND_2027)})</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>basispercentage</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>+{(EXTRA_MIDDENBAND_2027 * 100).toFixed(1).replace(".", ",")} procentpunt</td>
              <td className="py-2 pl-3" style={{ color: "#4A5A56" }}>
                Middeninkomens krijgen relatief de grootste verhoging
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E6E9E7" }}>
              <td className="py-2 pr-3" style={{ color: "#16211F" }}>Tweede kind</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>basispercentage</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>+{(EXTRA_TWEEDE_KIND_2027 * 100).toFixed(1).replace(".", ",")} procentpunt</td>
              <td className="py-2 pl-3" style={{ color: "#4A5A56" }}>
                Verschil met het eerste kind wordt iets kleiner
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-3" style={{ color: "#16211F" }}>Max. uurprijs dagopvang</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{eur(MAX_UURPRIJS_2026.dagopvang)}</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>nog niet vastgesteld</td>
              <td className="py-2 pl-3" style={{ color: "#4A5A56" }}>
                Indexatie volgt pas na het Centraal Economisch Plan
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Percentages en grenzen komen uit het ontwerpbesluit dat bij de voorjaarsbesluitvorming 2026
        definitief wordt. De grenzen zelf schuiven nog iets op met de jaarlijkse indexatie.
      </p>

      <h2 className="font-display" style={h2}>
        Krijgt iedereen in 2027 96% kinderopvangtoeslag?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Nee, en dat is de belangrijkste nuance in dit hele dossier. 96 procent is het maximale
        vergoedingspercentage voor het eerste kind, en in het ontwerp voor 2027 geldt dat voor
        huishoudens met een gezamenlijk toetsingsinkomen tot en met {eur(OMSLAGPUNT_96_PROCENT_2027)}.
        Verdien je samen meer, dan daalt je percentage geleidelijk, tot een vaste voet van
        {" "}{pct(VASTE_VOET_2027)} voor de allerhoogste inkomens.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En zelfs binnen dat maximum geldt: 96 procent is 96 procent van de opvangkosten tot de
        maximum uurprijs, niet van je hele factuur. Rekent je opvangorganisatie meer dan die
        maximum uurprijs, dan betaal je het verschil altijd zelf, ongeacht je percentage. Verderop
        in dit artikel staat precies wat dat scheelt.
      </p>

      <h2 className="font-display" style={h2}>
        Wat betekent je inkomen voor de kinderopvangtoeslag?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Niet je bruto jaarsalaris, maar jullie gezamenlijke toetsingsinkomen bepaalt het
        percentage. Dat toetsingsinkomen is het verzamelinkomen: kort gezegd je inkomen uit werk en
        uitkeringen samen met een eventueel inkomen uit sparen en beleggen, na aftrek van bepaalde
        posten zoals hypotheekrenteaftrek. Bij een koopwoning ligt het toetsingsinkomen daardoor
        vaak wat lager dan de som van twee brutosalarissen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Zolang het huidige stelsel geldt, blijft de kinderopvangtoeslag inkomensafhankelijk: hoe
        hoger jullie gezamenlijke toetsingsinkomen, hoe lager het percentage, tot de vaste voet.
        Dat verandert pas met de aangekondigde stelselwijziging, die op zijn vroegst in 2029 ingaat
        en nog niet is vastgesteld.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel kinderopvangtoeslag krijg je bij €60.000 tot €150.000 inkomen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een rekenvoorbeeld, geen persoonlijke berekening. Voor alle rijen: 1 kind op dagopvang, 150
        uur per maand (ongeveer 3,5 dag per week), een tarief van €10 per uur dat de
        opvangorganisatie rekent, en beide ouders werken. Bij twee kinderen, minder uren of een
        ander tarief valt de uitkomst anders uit, zie de rekenaar hieronder.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Gezamenlijk inkomen
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                % nu (2026)
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                % ontwerp 2027
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Eigen bijdrage nu
              </th>
              <th className="text-right py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Eigen bijdrage 2027
              </th>
            </tr>
          </thead>
          <tbody>
            {hoofdRijen.map((r) => (
              <tr key={r.inkomen} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3" style={{ color: "#16211F" }}>{eur(r.inkomen)}</td>
                <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{pct(r.t26.percentage)}</td>
                <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{pct(r.t27.percentage)}</td>
                <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{eur(r.t26.eigenBijdragePerMaand)}</td>
                <td className="text-right py-2 pl-3" style={{ color: "#16211F" }}>{eur(r.t27.eigenBijdragePerMaand)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Alle bedragen per maand, bij het rekenvoorbeeld hierboven. De percentages voor 2027 komen
        uit het ontwerpbesluit; de maximum uurprijs voor 2027 is een raming van 5 procent
        indexatie, dus de eigen bijdrage voor 2027 kan nog iets verschuiven.
      </p>

      <KinderopvangtoeslagRekenaar />

      <h2 className="font-display" style={h2}>
        Een hoger inkomen betekent niet automatisch een kleine of grote toeslag
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Drie gezinnen, zelfde rekenvoorbeeld als hierboven, alleen het inkomen verschilt.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>Gezin</th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>Inkomen</th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>Eigen bijdrage nu</th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>Eigen bijdrage 2027</th>
              <th className="text-right py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>Scheelt</th>
            </tr>
          </thead>
          <tbody>
            {["Gezin A", "Gezin B", "Gezin C"].map((naam, i) => {
              const g = drieGezinnen[i];
              const scheelt = g.t26.eigenBijdragePerMaand - g.t27.eigenBijdragePerMaand;
              return (
                <tr key={naam} style={{ borderBottom: "1px solid #E6E9E7" }}>
                  <td className="py-2 pr-3" style={{ color: "#16211F" }}>{naam}</td>
                  <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{eur(g.inkomen)}</td>
                  <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{eur(g.t26.eigenBijdragePerMaand)}</td>
                  <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{eur(g.t27.eigenBijdragePerMaand)}</td>
                  <td className="text-right py-2 pl-3" style={{ color: "#16211F" }}>{eur(scheelt)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Gezin A verdient het minst van de drie en profiteert het minst in euro&apos;s, want het zit
        met {eur(70000)} al ruim onder het nieuwe omslagpunt van {eur(OMSLAGPUNT_96_PROCENT_2027)} en
        krijgt dus al in 2026 een hoog percentage. Gezin B en Gezin C zitten allebei in de
        middenband die in het ontwerp 12,5 procentpunt extra krijgt, en dat levert in dit
        rekenvoorbeeld een vergelijkbaar maandbedrag op, ook al verdient Gezin C veel meer dan
        Gezin B. Het is dus niet zo dat een hoger inkomen automatisch een kleinere sprong
        betekent: waar je in de tabel zit, telt meer dan hoeveel je verdient.
      </p>

      <h2 className="font-display" style={h2}>
        De maximum uurprijs is minstens zo belangrijk als het percentage
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een kinderopvangorganisatie mag een hoger uurtarief rekenen dan de maximum uurprijs
        waarover de overheid toeslag geeft. Het verschil daarboven betaal je altijd zelf, wat je
        percentage ook is. Bij €13 per uur op dagopvang, boven de maximum uurprijs van
        {" "}{eur(MAX_UURPRIJS_2026.dagopvang)} in 2026, wordt de toeslag alleen berekend over die
        {" "}{eur(MAX_UURPRIJS_2026.dagopvang)}. In het rekenvoorbeeld hierboven, bij een inkomen van
        {" "}{eur(60000)}, is de eigen bijdrage dan {eur(bovenMax27.eigenBijdragePerMaand)} per maand
        in plaats van {eur(hoofdRijen[0].t27.eigenBijdragePerMaand)}: bijna het dubbele, terwijl het
        percentage (96) het hoogst mogelijke is.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>Soort opvang</th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>Max. uurprijs 2026</th>
              <th className="text-right py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>Max. uurprijs 2027</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #E6E9E7" }}>
              <td className="py-2 pr-3" style={{ color: "#16211F" }}>Dagopvang</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{eur(MAX_UURPRIJS_2026.dagopvang)}</td>
              <td className="text-right py-2 pl-3" style={{ color: "#4A5A56" }}>nog niet vastgesteld</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #E6E9E7" }}>
              <td className="py-2 pr-3" style={{ color: "#16211F" }}>Buitenschoolse opvang</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{eur(MAX_UURPRIJS_2026.bso)}</td>
              <td className="text-right py-2 pl-3" style={{ color: "#4A5A56" }}>nog niet vastgesteld</td>
            </tr>
            <tr>
              <td className="py-2 pr-3" style={{ color: "#16211F" }}>Gastouderopvang</td>
              <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>{eur(MAX_UURPRIJS_2026.gastouder)}</td>
              <td className="text-right py-2 pl-3" style={{ color: "#4A5A56" }}>nog niet vastgesteld</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        De maximum uurprijzen voor 2027 worden pas vastgesteld nadat het Centraal Economisch Plan
        van het CPB bekend is. Een raming van ongeveer 5 procent indexatie komt uit op {eur(MAX_UURPRIJS_2027_GERAAMD.dagopvang)}
        {" "}voor dagopvang, {eur(MAX_UURPRIJS_2027_GERAAMD.bso)} voor buitenschoolse opvang en{" "}
        {eur(MAX_UURPRIJS_2027_GERAAMD.gastouder)} voor gastouderopvang. Dat is geen vastgesteld
        bedrag.
      </p>

      <h2 className="font-display" style={h2}>
        Wat levert 2027 een tweeverdienersgezin daadwerkelijk op?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Stel dat jullie opvangrekening, bij het rekenvoorbeeld van 1 kind en 150 uur per maand,
        rond de {eur(voorbeeld100k.t26.totaleKostenPerMaand)} per maand ligt en jullie gezamenlijk
        toetsingsinkomen rond de {eur(100000)} zit. Nu betaal je daarvan zelf ongeveer{" "}
        {eur(voorbeeld100k.t26.eigenBijdragePerMaand)}. In het ontwerp voor 2027 daalt dat naar
        ongeveer {eur(voorbeeld100k.t27.eigenBijdragePerMaand)}, zo&apos;n {eur(verschil100k)} per
        maand minder. Dat is het percentage-effect. Verandert je werkelijke uurtarief niet en blijft
        het onder de maximum uurprijs, dan is dat ook wat je in januari op je rekening terugziet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het euro-bedrag is de vraag die ertoe doet, niet het percentage op zich. 96 procent klinkt
        hoger dan 84,6 procent, maar wat je maandelijks overhoudt hangt net zo hard af van je
        werkelijke opvangrekening als van het percentage waarmee die wordt vergoed.
      </p>

      <h2 className="font-display" style={h2}>
        Kinderopvangtoeslag omhoog, maar wat gebeurt er met het kindgebonden budget?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Voor gezinnen met kinderen verandert er in 2027 meer dan alleen de kinderopvangtoeslag.
        Boven een gezamenlijk toetsingsinkomen van ongeveer €65.560 bouwt het{" "}
        <Link href="/inzichten/kindgebonden-budget-2027-inkomensgrens" style={link} className="hover:underline">
          kindgebonden budget in 2027
        </Link>{" "}
        juist sneller af. Het is dus mogelijk dat jullie kinderopvangtoeslag stijgt terwijl het
        kindgebonden budget in dezelfde maand daalt. Kijk niet naar één regeling op zich, maar naar
        het totaal van jullie huishouden.
      </p>

      <h2 className="font-display" style={h2}>
        Wanneer wordt kinderopvang in 2027 echt goedkoper?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De kop "96 procent vergoeding" betekent niet dat je 96 procent van je hele opvangrekening
        terugkrijgt. Kinderopvang wordt in 2027 vooral goedkoper als je aan alle drie deze
        voorwaarden voldoet: jullie gezamenlijke toetsingsinkomen zit onder of net boven het nieuwe
        omslagpunt, jullie werkelijke uurtarief zit onder de maximum uurprijs, en je gebruikt genoeg
        uren om het verschil in percentage te voelen. Zit je ruim boven de maximum uurprijs of ver
        boven de middenband, dan is het effect kleiner dan de 96 procent in de krant doet vermoeden.
      </p>

      <h2 className="font-display" style={h2}>
        Wat betekent dit voor jullie totale huishoudbudget?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De vraag is niet "stijgt de kinderopvangtoeslag". De vraag is wat jullie onder de streep
        overhouden nadat alle veranderingen van 2027 zijn meegenomen: inkomstenbelasting, kindgebonden
        budget, kinderopvangtoeslag, zorgpremie en de gewone vaste lasten samen. Voor een breder
        overzicht van wat er in 2027 verandert voor gezinnen met een goed inkomen, zie{" "}
        <Link href="/inzichten/wat-verandert-er-2027-gezinnen-goed-inkomen" style={link} className="hover:underline">
          wat verandert er in 2027 voor gezinnen met een goed inkomen
        </Link>{" "}
        en, specifiek voor de optelsom bij tweeverdieners,{" "}
        <Link href="/inzichten/tweeverdieners-2027-erop-achteruit" style={link} className="hover:underline">
          wat tweeverdieners in 2027 kwijtraken
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wil je weten wat er bij jullie huishouden verandert?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Landelijke percentages geven een gemiddelde. Jullie huishoudbudget is niet gemiddeld. De
        gratis analyse legt jullie hele maand naast vergelijkbare huishoudens, inclusief de posten
        die in 2027 veranderen.
      </p>

      {/* Slotblok: Geldscan als tekstlink */}
      <p className="font-body text-text-soft" style={p}>
        Blijft er bij jullie ook zonder deze maatregel al weinig over, dan zit dat zelden in één
        post. Wil je weten waar het bij jouw huishouden precies weglekt, dan kan dat met de{" "}
        <CtaLink doel="geldscan" href={geldscanHref()} locatie="slot" style={link} className="hover:underline">
          Geldscan van &euro;49
        </CtaLink>
        , die ik met de hand voor je uitwerk.
      </p>
    </>
  );
}
