import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const oranje = { color: "#0B7A6E", textDecoration: "none" } as const;

const verschillen = [
  { kenmerk: "Voor wie", budget: "Geldproblemen, achterstanden, schulden", coach: "Genoeg inkomen, toch weinig over" },
  { kenmerk: "Focus", budget: "Administratie op orde, rondkomen, aflossen", coach: "Inzicht, structuur, meer overhouden" },
  { kenmerk: "Kosten", budget: "€60 tot €100 per uur, vaak gratis via gemeente of werkgever", coach: "€60 tot €150 per uur, of een vast bedrag per gesprek" },
  { kenmerk: "Duur", budget: "Vaak maandenlang traject", coach: "Van eenmalig gesprek tot enkele maanden" },
  { kenmerk: "Toon", budget: "Praktische hulp en begeleiding bij problemen", coach: "Klankbord en eerlijke blik van buitenaf" },
];

const situaties = [
  { situatie: "Betalingsachterstanden of schulden", hulp: "Budgetcoach of gratis schuldhulp via je gemeente" },
  { situatie: "Rondkomen lukt niet van een laag inkomen", hulp: "Budgetcoach, vaak gratis via gemeente of werkgever" },
  { situatie: "Goed inkomen, toch elke maand bijna niets over", hulp: "Financieel coach" },
  { situatie: "Hypotheek, pensioen of beleggen", hulp: "Financieel adviseur met Wft-vergunning" },
  { situatie: "Eerst zelf inzicht willen", hulp: "Analyse of huishoudboekje" },
];

export default function VerschilBudgetcoachFinancieelCoach() {
  return (
    <>
      <p style={p}>
        Het korte antwoord: een budgetcoach helpt mensen met geldproblemen,
        een financieel coach helpt mensen die genoeg verdienen maar toch
        weinig overhouden. De termen worden door elkaar gebruikt, geen van
        beide is een beschermde titel, en er zijn coaches die beide doen. Toch
        is het verschil belangrijk, want de aanpak, de kosten en zelfs of het
        gratis kan, hangen ervan af. Hieronder zie je precies wanneer je welke
        hulp nodig hebt.
      </p>

      <h2 style={h2}>Het verschil in één tabel</h2>
      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table className="font-body" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E6E9E7", textAlign: "left" }}>
              <th style={{ padding: "0.6rem 0.75rem 0.6rem 0", color: "#16211F", fontWeight: 500 }}> </th>
              <th style={{ padding: "0.6rem 0.75rem 0.6rem 0", color: "#16211F", fontWeight: 500 }}>Budgetcoach</th>
              <th style={{ padding: "0.6rem 0", color: "#16211F", fontWeight: 500 }}>Financieel coach</th>
            </tr>
          </thead>
          <tbody>
            {verschillen.map((v) => (
              <tr key={v.kenmerk} style={{ borderBottom: "1px solid #E6E9E7", verticalAlign: "top" }}>
                <td style={{ padding: "0.6rem 0.75rem 0.6rem 0", fontWeight: 400, whiteSpace: "nowrap" }}>{v.kenmerk}</td>
                <td style={{ padding: "0.6rem 0.75rem 0.6rem 0", color: "#4A5A56" }}>{v.budget}</td>
                <td style={{ padding: "0.6rem 0", color: "#4A5A56" }}>{v.coach}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={h2}>Wat doet een budgetcoach?</h2>
      <p style={p}>
        Een budgetcoach helpt je financiën weer op de rails te krijgen als het
        echt knelt: administratie ordenen, betalingsachterstanden aanpakken,
        een budget maken waar je van kunt rondkomen en waar nodig doorverwijzen
        naar schuldhulpverlening. Belangrijk om te weten: bij geldproblemen is
        deze hulp vaak gratis. Gemeenten bieden kosteloze budgetcoaching en
        schuldhulp, en steeds meer werkgevers vergoeden een budgetcoach. Begin
        in dat geval bij je gemeente of bij Geldfit, niet bij een betaalde
        coach.
      </p>

      <h2 style={h2}>Wat doet een financieel coach?</h2>
      <p style={p}>
        Een financieel coach (ook wel geldcoach genoemd) is er voor een andere
        situatie: er komt genoeg binnen, er zijn geen achterstanden, en toch
        blijft er elke maand te weinig over. Geen crisis, wel een knagend
        gevoel. Een financieel coach zoekt uit waar het structureel weglekt,
        vergelijkt je uitgaven met vergelijkbare huishoudens en helpt je een
        structuur op te zetten die blijft werken. Waarom dat patroon zo vaak
        voorkomt bij goede inkomens lees je in{" "}
        <Link href="/inzichten/waarom-hou-ik-nooit-geld-over" style={oranje} className="hover:underline">
          waarom hou ik nooit geld over
        </Link>
        .
      </p>
      <p style={p}>
        Let bij het kiezen van een coach op het verdienmodel. Financieel coach
        is geen beschermde titel, dus iedereen mag zich zo noemen. Een goede
        coach is vooraf transparant over de prijs en verkoopt geen financiële
        producten. De actuele tarieven staan in{" "}
        <Link href="/inzichten/wat-kost-een-financieel-coach" style={oranje} className="hover:underline">
          wat kost een financieel coach
        </Link>
        .
      </p>

      <h2 style={h2}>En de financieel adviseur dan?</h2>
      <p style={p}>
        Derde smaak, vaak verward met de vorige twee: de financieel adviseur.
        Die heeft een Wft-vergunning en adviseert over producten zoals
        hypotheken, pensioenen en beleggingen. Voor die vragen is zo'n
        adviseur verplicht en waardevol. Voor de vraag "waar blijft ons geld"
        is hij niet nodig en met €150 tot €300 per uur ook onnodig duur. Het
        volledige onderscheid staat in{" "}
        <Link href="/inzichten/wat-doet-een-financieel-adviseur" style={oranje} className="hover:underline">
          wat doet een financieel adviseur
        </Link>
        .
      </p>

      <h2 style={h2}>Welke hulp past bij jouw situatie?</h2>
      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table className="font-body" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E6E9E7", textAlign: "left" }}>
              <th style={{ padding: "0.6rem 0.75rem 0.6rem 0", color: "#16211F", fontWeight: 500 }}>Jouw situatie</th>
              <th style={{ padding: "0.6rem 0", color: "#16211F", fontWeight: 500 }}>Passende hulp</th>
            </tr>
          </thead>
          <tbody>
            {situaties.map((s) => (
              <tr key={s.situatie} style={{ borderBottom: "1px solid #E6E9E7", verticalAlign: "top" }}>
                <td style={{ padding: "0.6rem 0.75rem 0.6rem 0", color: "#4A5A56" }}>{s.situatie}</td>
                <td style={{ padding: "0.6rem 0", fontWeight: 400 }}>{s.hulp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={p}>
        Twijfel je in welke groep je valt? Eén signaal is doorslaggevend: heb
        je betalingsachterstanden, dan hoor je bij de kosteloze hulp van je
        gemeente, punt. Betaal je alles netjes op tijd maar snap je niet
        waarom er niets overblijft, dan zit je in de groep waarvoor ik werk.
        Op de pagina{" "}
        <Link href="/financieel-coach" style={oranje} className="hover:underline">
          financieel coach
        </Link>{" "}
        lees je hoe dat eruitziet: analyse eerst, daarna eventueel een{" "}
        <Link href="/adviesgesprek" style={oranje} className="hover:underline">
          eenmalig gesprek van €125
        </Link>
        . Geen traject verplicht, geen verkooppraat.
      </p>
    </>
  );
}
