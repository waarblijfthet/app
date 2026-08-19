import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

const linkStyle = { color: "#0B7A6E", textDecoration: "none" } as const;

const REKENBLOK = [
  { label: "Netto huishoudinkomen", bedrag: 6500, teken: "" },
  { label: "Woonlasten", bedrag: 1900, teken: "-" },
  { label: "Vervoer", bedrag: 650, teken: "-" },
  { label: "Boodschappen", bedrag: 850, teken: "-" },
  { label: "Verzekeringen en vaste lasten", bedrag: 700, teken: "-" },
  { label: "Overige structurele uitgaven", bedrag: 900, teken: "-" },
];
const REKENBLOK_RESULTAAT = 1500;

const SCENARIOS = [
  {
    titel: "Goed inkomen, hoge woonlasten",
    tekst:
      "Een groot deel van het inkomen gaat naar hypotheek of huur, energie en de vaste woonkosten. Er is niets vreemd aan het inkomen, de woonlasten laten simpelweg weinig ruimte over voor de rest.",
  },
  {
    titel: "Goed inkomen, kinderen en kinderopvang",
    tekst:
      "Opvang, school en sport lopen op tot een vast bedrag per maand, naast de gewone boodschappen en kleding. Dat verandert de rekensom structureel, niet incidenteel.",
  },
  {
    titel: "Goed inkomen, hogere levensstijl",
    tekst:
      "Meer verdienen ging vanzelf samen met een grotere woning, een nieuwere auto of meer abonnementen. Niemand besloot dat bewust in één keer, het schoof geleidelijk mee.",
  },
  {
    titel: "Goed inkomen, veel jaarlijkse verplichtingen",
    tekst:
      "Vakantie, onderhoud, verzekeringen en schoolkosten vallen in pieken. Wie daar niet maandelijks voor reserveert, ziet de ruimte in de zomer of in december ineens verdwijnen.",
  },
  {
    titel: "Goed inkomen, wisselend als zzp'er",
    tekst:
      "De ene maand is het inkomen ruim, de andere maand karig. Een gemiddelde zegt dan weinig, want een belastingreservering en een rustige maand vragen om een andere aanpak dan een vast salaris.",
  },
];

export default function HoeveelFinancieleRuimteHebIk() {
  return (
    <>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Je verdient misschien goed. Toch kan een groot deel van je inkomen al verdwijnen voordat je
        nadenkt over sparen, beleggen, vakantie of minder werken. Daarom zegt je salaris op zichzelf
        weinig over je financiële ruimte.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Stel: je verdient €6.000 netto. Iemand anders verdient €4.500. Toch kan die tweede persoon
        maandelijks meer financiële ruimte hebben, omdat wonen, vervoer, kinderen en andere
        structurele uitgaven bij dat huishouden veel lager liggen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Financiële ruimte is niet hetzelfde als inkomen. Het is het bedrag dat structureel
        beschikbaar blijft nadat je rekening hebt gehouden met de werkelijke kosten van je
        huishouden. Hieronder laat ik zien hoe je dat voor jezelf berekent, en waarom de uitkomst
        nooit los van je huishouden te beoordelen is.
      </p>

      {/* Kort antwoord */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-2" style={{ color: "#16211F" }}>
          Kort antwoord
        </p>
        <p className="font-body text-sm mb-3" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Er is geen universeel bedrag dat bepaalt of je voldoende financiële ruimte hebt. Je
          financiële ruimte hangt onder meer af van:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
          {[
            "netto huishoudinkomen",
            "woonlasten",
            "gezinssamenstelling",
            "vervoer",
            "verzekeringen",
            "boodschappen",
            "kinderopvang",
            "schulden en verplichtingen",
            "sparen",
            "structurele vrije uitgaven",
          ].map((item) => (
            <span
              key={item}
              className="font-body text-xs rounded-full px-3 py-1.5"
              style={{ backgroundColor: "#F7F8F7", color: "#4A5A56", border: "1px solid #E6E9E7" }}
            >
              {item}
            </span>
          ))}
        </div>
        <p className="font-body text-sm mb-2" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Daarom kan €1.000 per maand vrij besteedbaar geld voor het ene huishouden ruim zijn en
          voor het andere huishouden nauwelijks voldoende.
        </p>
        <p className="font-body text-sm mb-0" style={{ color: "#16211F", fontWeight: 500 }}>
          De vraag is dus niet alleen hoeveel je verdient, maar hoeveel er structureel overblijft
          nadat je volledige huishouden is meegenomen.
        </p>
      </div>

      <h2 className="font-display" style={h2}>
        Wat is financiële ruimte eigenlijk?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Drie begrippen worden vaak door elkaar gebruikt, terwijl ze iets anders betekenen.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
        <div className="rounded-xl p-4" style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7" }}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>Inkomen</p>
          <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>Wat er binnenkomt.</p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "#F7F8F7", border: "1px solid #E6E9E7" }}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>Overhouden</p>
          <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>Wat er na uitgaven op je rekening staat.</p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>Financiële ruimte</p>
          <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
            Wat structureel beschikbaar is na vaste lasten, variabele uitgaven, reserveringen en doelen.
          </p>
        </div>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Geld over op je betaalrekening is dus niet automatisch financiële ruimte. Stel dat je €1.000
        overhoudt, maar je moet nog €4.000 per jaar reserveren voor vakanties, onderhoud, belastingen
        en verzekeringen. Dan is die €1.000 niet volledig vrije ruimte, een deel ervan heeft al een
        bestemming.
      </p>

      {/* Visueel rekenblok */}
      <p className="font-body font-medium text-xs uppercase tracking-wide mb-2" style={{ color: "#8B958F" }}>
        Voorbeeld, geen landelijk gemiddelde
      </p>
      <div className="rounded-2xl p-5 sm:p-6 mb-3" style={{ backgroundColor: "#16211F" }}>
        {REKENBLOK.map((r) => (
          <div key={r.label} className="flex justify-between items-baseline py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              {r.teken === "-" ? "min " : ""}{r.label}
            </span>
            <span className="font-display tabular-nums" style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 300 }}>
              {r.teken === "-" ? "-" : ""}€{r.bedrag.toLocaleString("nl-NL")}
            </span>
          </div>
        ))}
        <div className="flex justify-between items-baseline pt-4">
          <span className="font-body text-sm font-medium" style={{ color: "#FFFFFF" }}>
            Resterende ruimte
          </span>
          <span className="font-display tabular-nums" style={{ color: "#9CCFC4", fontSize: "1.9rem", fontWeight: 400 }}>
            €{REKENBLOK_RESULTAAT.toLocaleString("nl-NL")}
          </span>
        </div>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Maar is €1.500 veel? Dat kun je pas beoordelen als je weet wat dit huishouden daarnaast nodig
        heeft, en welk doel er met die ruimte is. Zonder die context is het maar een getal.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe bereken je je financiële ruimte?
      </h2>
      <ol className="space-y-4 my-5" style={{ listStyle: "none", paddingLeft: 0 }}>
        {[
          {
            titel: "Tel alle netto inkomsten op",
            tekst:
              "Neem alle structurele inkomsten mee. Werk je als zzp'er, gebruik dan een realistisch gemiddeld netto maandbedrag. Let op: een gemiddelde maand is niet hetzelfde als daadwerkelijk beschikbare cash. Reserveringen voor belasting en voor rustige maanden beoordeel je apart.",
          },
          {
            titel: "Breng je vaste lasten in kaart",
            tekst: "Hypotheek of huur, energie, verzekeringen, abonnementen, kinderopvang en leningen.",
          },
          {
            titel: "Voeg je structurele variabele uitgaven toe",
            tekst: "Boodschappen, vervoer, kleding, horeca, sport, vrije tijd en kosten voor kinderen.",
          },
          {
            titel: "Reserveer voor jaarlijkse uitgaven",
            tekst:
              "Vakantie, onderhoud, belastingen, verzekeringen, reparaties, schoolkosten en cadeaus. Reken je die niet mee, dan lijkt je maandelijkse ruimte kunstmatig hoog.",
          },
          {
            titel: "Bepaal wat er structureel overblijft",
            tekst:
              "Netto inkomen min structurele uitgaven min noodzakelijke reserveringen is je resterende financiële ruimte. Dit is een rekensom, geen oordeel.",
          },
        ].map((stap, i) => (
          <li key={stap.titel} className="flex gap-4">
            <span
              className="flex-shrink-0 rounded-full flex items-center justify-center font-display"
              style={{ width: "2rem", height: "2rem", backgroundColor: "#E7F1EE", color: "#0B7A6E", fontSize: "0.95rem" }}
            >
              {i + 1}
            </span>
            <div>
              <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>{stap.titel}</p>
              <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>{stap.tekst}</p>
            </div>
          </li>
        ))}
      </ol>

      <SalarisRekenaar
        startInkomen={5500}
        startVolwassenen={2}
        startKinderen={1}
        startAuto="eigen"
        kop="Reken uit wat er bij jouw huishouden overblijft"
        intro="Vul je eigen inkomen en huishouden in, dan zie je wat ik bij een huishouden zoals dat van jou zou verwachten als structurele ruimte."
      />

      <h2 className="font-display" style={h2}>
        Hoeveel financiële ruimte zou je eigenlijk moeten hebben?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Daar bestaat geen universeel antwoord op. Richtlijnen zoals sparen als percentage van je
        inkomen kunnen een startpunt zijn, bijvoorbeeld de{" "}
        <Link href="/inzichten/50-30-20-regel-hoger-inkomen" style={linkStyle} className="hover:underline">
          50/30/20-regel
        </Link>{" "}
        of{" "}
        <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={linkStyle} className="hover:underline">
          hoeveel sparen per maand normaal is
        </Link>
        . Maar een percentage vertelt niet of jouw huishouden financieel ruim zit, het is een vuistregel,
        geen norm.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voorbeeld, twee fictieve huishoudens naast elkaar. Huishouden A verdient €8.000 netto, heeft
        €6.900 structurele uitgaven en houdt €1.100 ruimte over. Huishouden B verdient €5.500 netto,
        heeft €4.100 structurele uitgaven en houdt €1.400 ruimte over. Huishouden B verdient minder,
        maar heeft meer vrije financiële ruimte.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Je financiële ruimte kun je berekenen. Maar of die ruimte veel of weinig is, kun je alleen
        bepalen in de context van jouw huishouden.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe weet ik of mijn financiële ruimte normaal is?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vergelijk niet met &ldquo;de gemiddelde Nederlander&rdquo;. Kijk in plaats daarvan naar
        huishoudens met een vergelijkbaar inkomen, gezinssamenstelling, woonvorm, vervoerssituatie en
        levensfase. €800 boodschappen kan veel zijn voor het ene huishouden en heel normaal voor het
        andere. €2.000 woonlasten kan zwaar zijn bij €4.500 inkomen en prima passen bij €8.000 inkomen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bij de {RAPPORTEN.length} huishoudens die ik zelf heb doorgerekend, was mijn conclusie bij{" "}
        {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} dat er niets te repareren viel. Hun cijfers waren
        voor dat huishouden gewoon normaal, ook al voelde het krap.{" "}
        <Link href="/rapporten" style={linkStyle} className="hover:underline">
          Bekijk hun rapporten
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Je verdient goed, maar hebt toch weinig financiële ruimte
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
        {SCENARIOS.map((s, i) => (
          <div key={s.titel} className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
            <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
              Scenario {i + 1}. {s.titel}
            </p>
            <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>{s.tekst}</p>
          </div>
        ))}
      </div>
      <p className="font-body text-text-soft" style={p}>
        Geen van deze situaties betekent automatisch dat iemand financieel onverstandig bezig is. Wie
        wisselende inkomsten heeft als zzp&apos;er, rekent bovendien anders dan wie een vast salaris
        heeft. Meer over die kosten staat in{" "}
        <Link href="/inzichten/kosten-levensonderhoud-zzp-alleenstaande-2026" style={linkStyle} className="hover:underline">
          kosten levensonderhoud voor zzp&apos;ers
        </Link>
        .
      </p>

      {/* Herkenning */}
      <div className="rounded-xl p-5 my-8" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <ul className="space-y-1.5">
          {[
            "Je verdient goed maar houdt weinig over.",
            "Je weet hoeveel je uitgeeft maar niet of het veel is.",
            "Je spaart minder dan je zou willen.",
            "Je hebt geen schulden maar voelt weinig financiële ruimte.",
            "Je bankapp geeft je overzicht maar geen oordeel.",
            "Je vraagt je af of je financiële situatie normaal is.",
          ].map((item) => (
            <li key={item} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="font-body text-sm mt-3 mb-0" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Dan is je probleem misschien niet dat je te weinig weet van geld, maar dat je geen context
          hebt voor je eigen cijfers.
        </p>
      </div>

      {/* CTA gratis analyse */}
      <div className="rounded-2xl p-6 sm:p-8 my-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-display font-light" style={{ color: "#16211F", fontSize: "1.5rem", marginBottom: "0.75rem" }}>
          Wil je weten hoeveel financiële ruimte jij werkelijk hebt?
        </p>
        <p className="font-body" style={{ color: "#4A5A56", fontWeight: 300, marginBottom: "1.25rem" }}>
          Met de gratis analyse krijg je een eerste beeld van jouw financiële situatie en zie je waar
          jouw huishouden afwijkt.
        </p>
        <Link
          href="/analyse"
          className="inline-flex items-center justify-center font-body text-sm font-medium"
          style={{ color: "#16211F", border: "1.5px solid #16211F", borderRadius: "10px", padding: "0.85rem 1.5rem", textDecoration: "none" }}
        >
          Doe de gratis analyse &rarr;
        </Link>
        <p className="font-body text-xs mt-3 mb-0" style={{ color: "#5A6B66" }}>
          Gratis · geen account · geen bankkoppeling · geen verkoopgesprek
        </p>
      </div>

      <h2 className="font-display" style={h2}>
        Waarom een simpele rekensom niet genoeg is
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een rekenaar kan inkomen min uitgaven optellen. Wat hij niet vanzelf bepaalt, is of jouw
        uitgaven normaal zijn, of een categorie daadwerkelijk problematisch is, of je levensstijl past
        bij je doelen, of je financiële ruimte groot genoeg is voor je plannen, en of je eigenlijk
        niets hoeft te veranderen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een bankapp vertelt je wat je uitgeeft. Een analyse helpt je begrijpen wat dat betekent.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je weten waarom je financiële ruimte is zoals die is? De gratis analyse laat zien waar je
        afwijkt. Bij de{" "}
        <Link href="/geldscan" style={linkStyle} className="hover:underline">
          Geldscan
        </Link>{" "}
        ga ik een stap verder: ik kijk persoonlijk naar jouw cijfers, leg uit wat opvalt, wat niet
        relevant is en wat ik zou veranderen. Geen abonnement, geen verplicht gesprek.
      </p>

      <p className="font-body text-text-soft" style={p}>
        Wil je liever eerst zelf rekenen met vaste bedragen in plaats van een huishouden-schuif, gebruik
        dan mijn{" "}
        <Link href="/inzichten/vrij-besteedbaar-inkomen-berekenen" style={linkStyle} className="hover:underline">
          rekenhulp voor vrij besteedbaar inkomen
        </Link>
        . En lees ook wat er volgens de richtlijnen{" "}
        <Link href="/inzichten/hoeveel-geld-overhouden-einde-maand" style={linkStyle} className="hover:underline">
          aan het einde van de maand zou moeten overblijven
        </Link>
        , en hoe €4.000 netto zich verhoudt tot{" "}
        <Link href="/inzichten/is-4000-euro-netto-goed-salaris-nederland" style={linkStyle} className="hover:underline">
          een goed salaris in Nederland
        </Link>
        .
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Je financiële ruimte is geen universeel bedrag. Het is wat er voor jouw huishouden werkelijk
        overblijft, gegeven je inkomen, verplichtingen, levensstijl en doelen.
      </p>
    </>
  );
}
