import Link from "next/link";
import { PAKKET_INFO } from "@/lib/aanbod-content";
import { BRON_GEMEENTE_OSS, BRON_REGELHULP, TARIEVEN_OPGEHAALD_TEKST } from "@/lib/budgetcoach-tarieven";

/**
 * Herschreven op 25-sep-2026 (plan: docs/plan-coach-termen-ranken-25-sep-2026.md,
 * item 3). Doeltermen: wat doet een budgetcoach, geldcoach, wat is een
 * geldcoach, budgetcoaching, verschil budgetcoach en financieel coach.
 *
 * De vorige versie zei "budgetcoach = geldproblemen". Dat sprak N4 tegen en
 * klopt niet: de gemeente Oss biedt budgetcoaching aan voor iedere inwoner,
 * ongeacht het inkomen. Het verschil zit in traject, focus en wie betaalt,
 * niet in wel of geen schulden.
 *
 * Intentiescheiding: geen bedragen van anderen op deze pagina (die staan op
 * wat-kost-een-financieel-coach), en "zonder schulden" krijgt één zin met een
 * link naar kan-iemand-naar-mijn-financien-kijken. De oude bandbreedtes zonder
 * bron (€60 tot €100, €60 tot €150, €150 tot €300 per uur) zijn weg.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const oranje = { color: "#0B7A6E", textDecoration: "none" } as const;

const GESPREK_PRIJS = PAKKET_INFO.gesprek.prijs;

function Bron({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={oranje} className="hover:underline">
      {children}
    </a>
  );
}

const verschillen = [
  {
    kenmerk: "Focus",
    budget: "Overzicht in inkomsten, uitgaven en administratie; rekeningen op tijd betalen",
    coach: "Wat je met je geld wilt: sparen, doelen, keuzes voor de komende jaren",
  },
  {
    kenmerk: "Voor wie",
    budget: "Iedereen die grip wil, met of zonder schulden",
    coach: "Meestal wie rondkomt en verder wil kijken dan de maand",
  },
  {
    kenmerk: "Vorm",
    budget: "Losse check of traject van een paar maanden, soms aan huis",
    coach: "Wisselt sterk per aanbieder, van een gesprek tot een traject",
  },
  {
    kenmerk: "Wie betaalt",
    budget: "Jijzelf, of kosteloos via sommige gemeenten, vrijwilligers of je werkgever",
    coach: "Meestal jijzelf",
  },
  {
    kenmerk: "Neemt het over?",
    budget: "Nee, de coach kijkt mee; overnemen heet budgetbeheer",
    coach: "Nee",
  },
];

const situaties = [
  { situatie: "Betalingsachterstanden of schulden", hulp: "Schuldhulp via je gemeente, kosteloos" },
  { situatie: "Geen schulden, wel het overzicht kwijt", hulp: "Budgetcoach, soms gratis via je gemeente" },
  { situatie: "Goed inkomen, toch elke maand bijna niets over", hulp: "Budgetcoach, financieel coach, of eerst een vergelijking" },
  { situatie: "Hypotheek, pensioen, verzekering of beleggen", hulp: "Financieel adviseur met Wft-vergunning" },
];

export default function VerschilBudgetcoachFinancieelCoach() {
  return (
    <>
      <p style={p}>
        Het korte antwoord: een budgetcoach helpt je overzicht te krijgen in je inkomsten, uitgaven en
        administratie, met of zonder schulden. Een geldcoach en een financieel coach zijn twee namen voor
        ongeveer dezelfde rol, en die kijkt meestal verder vooruit: wat je met je geld wilt. Een financieel
        adviseur is iets anders; die adviseert over producten en heeft daarvoor een vergunning nodig. De
        termen lopen in de praktijk door elkaar, en er zijn coaches die alles doen.
      </p>

      <h2 style={h2}>Het verschil in één tabel</h2>
      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table className="font-body" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E6E9E7", textAlign: "left" }}>
              <th style={{ padding: "0.6rem 0.75rem 0.6rem 0", color: "#16211F", fontWeight: 500 }}> </th>
              <th style={{ padding: "0.6rem 0.75rem 0.6rem 0", color: "#16211F", fontWeight: 500 }}>Budgetcoach</th>
              <th style={{ padding: "0.6rem 0", color: "#16211F", fontWeight: 500 }}>Geldcoach of financieel coach</th>
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
        Een budgetcoach helpt je om je inkomsten en uitgaven op een rij te zetten, je administratie en post
        bij te houden en te zien waar ruimte zit. De coach neemt niets over maar ondersteunt je om het zelf te
        doen (<Bron href={BRON_REGELHULP}>Regelhulp, ministerie van VWS</Bron>, geraadpleegd{" "}
        {TARIEVEN_OPGEHAALD_TEKST}). De gemeente Oss beschrijft het als samenwerken met de coach, waarbij je
        zelf de regie houdt, en noemt ook &quot;aan het einde van de maand wat meer geld overhouden&quot; als
        reden om te komen (<Bron href={BRON_GEMEENTE_OSS}>gemeente Oss</Bron>, geraadpleegd{" "}
        {TARIEVEN_OPGEHAALD_TEKST}).
      </p>
      <p style={p}>
        Een budgetcoach is dus niet alleen voor schulden. Heb je wel achterstanden, dan is schuldhulp via de
        gemeente de eerste stap; die heeft middelen die een coach niet heeft, zoals een schuldregeling. Wil je
        dat een ander je geld beheert, dan heet dat budgetbeheer, en dat is iets anders dan coaching. Of een
        budgetcoach iets voor je is als er niets misgaat, staat op{" "}
        <Link href="/inzichten/kan-iemand-naar-mijn-financien-kijken" style={oranje} className="hover:underline">
          budgetcoach zonder schulden
        </Link>
        .
      </p>

      <h2 style={h2}>Wat is een geldcoach?</h2>
      <p style={p}>
        Een geldcoach is een andere naam voor een financieel coach: iemand die je helpt met inzicht en grip op
        je geldzaken. Het woord zegt niets over de werkwijze. De ene geldcoach werkt als een budgetcoach, de
        andere richt zich op doelen en gedrag. Vraag daarom altijd wat je krijgt, hoe lang het duurt en wat
        het kost, in plaats van op de naam af te gaan.
      </p>

      <h2 style={h2}>Wat doet een financieel coach?</h2>
      <p style={p}>
        Een financieel coach kijkt meestal verder dan de maand: wat je wilt bereiken, hoe je spaart, welke
        keuzes eraan komen. Wat er precies onder valt, verschilt per aanbieder. Budgetcoach, geldcoach en
        financieel coach zijn geen beschermde titels; iedereen mag zich zo noemen. Let daarom op het
        verdienmodel: een coach die ook financi&euml;le producten verkoopt, heeft een ander belang dan een
        coach die alleen voor zijn tijd betaald wordt.
      </p>
      <p style={p}>
        Wat een budgetcoach of financieel coach kost, per aanbieder en met de bron erbij, staat in{" "}
        <Link href="/inzichten/wat-kost-een-financieel-coach" style={oranje} className="hover:underline">
          wat kost een budgetcoach
        </Link>
        . Waarom er bij een goed inkomen toch weinig kan overblijven, lees je in{" "}
        <Link href="/inzichten/waarom-hou-ik-nooit-geld-over" style={oranje} className="hover:underline">
          waarom hou ik nooit geld over
        </Link>
        .
      </p>

      <h2 style={h2}>Wanneer heb je een financieel adviseur nodig?</h2>
      <p style={p}>
        Als je een financieel product afsluit of wijzigt: een hypotheek, een pensioen, een verzekering,
        beleggen. Wie daarover adviseert, heeft een vergunning nodig onder de Wet op het financieel toezicht
        (Wft), en de advieskosten betaal je rechtstreeks. Voor de vraag waar je maandgeld blijft, heb je geen
        Wft-adviseur nodig. Het volledige onderscheid staat in{" "}
        <Link href="/inzichten/wat-doet-een-financieel-adviseur" style={oranje} className="hover:underline">
          wat doet een financieel adviseur
        </Link>
        .
      </p>

      <h2 style={h2}>Welke past bij jou?</h2>
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
        Eén signaal is doorslaggevend: heb je betalingsachterstanden, begin dan bij je gemeente. Betaal je
        alles op tijd maar snap je niet waarom er niets overblijft, dan zit je in de groep waarvoor ik werk.
        Op de pagina{" "}
        <Link href="/financieel-coach" style={oranje} className="hover:underline">
          financieel coach
        </Link>{" "}
        lees je hoe dat eruitziet: eerst de vergelijking, daarna eventueel een{" "}
        <Link href="/adviesgesprek" style={oranje} className="hover:underline">
          eenmalig gesprek van {GESPREK_PRIJS}
        </Link>
        . Geen traject verplicht.
      </p>
    </>
  );
}
