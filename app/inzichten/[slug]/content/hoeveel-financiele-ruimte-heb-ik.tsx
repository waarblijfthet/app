import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";

const WINE = "#7B2D3E";
const GOLD = "#C9952A";
const OFFWHITE = "#F8F6F2";
const DARK = "#202020";
const SOFT = "#666666";

const h2 = {
  fontSize: "clamp(1.9rem, 4vw, 2.5rem)",
  color: WINE,
  marginTop: "3rem",
  marginBottom: "1.25rem",
  fontWeight: 300,
  lineHeight: 1.15,
} as const;

const p = {
  color: SOFT,
  fontSize: "1.0625rem",
  lineHeight: 1.75,
  marginBottom: "1.25rem",
  fontWeight: 300,
} as const;

const pStrong = { ...p, color: DARK, fontWeight: 400 } as const;

const linkStyle = { color: WINE, textDecoration: "underline", fontWeight: 500 } as const;

const REKENBLOK = [
  { label: "Netto huishoudinkomen", bedrag: 6500, teken: "" },
  { label: "Woonlasten", bedrag: 1900, teken: "-" },
  { label: "Vervoer", bedrag: 650, teken: "-" },
  { label: "Boodschappen", bedrag: 850, teken: "-" },
  { label: "Verzekeringen en vaste lasten", bedrag: 700, teken: "-" },
  { label: "Overige structurele uitgaven", bedrag: 900, teken: "-" },
];
const REKENBLOK_RESULTAAT = 1500;

const VERGELIJKINGSCRITERIA = ["inkomen", "kinderen", "woonlasten", "vervoer", "levensfase"];

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
      <p className="font-body" style={pStrong}>
        Je verdient misschien goed. Toch kan een groot deel van je inkomen al verdwijnen voordat je
        nadenkt over sparen, beleggen, vakantie of minder werken. Daarom zegt je salaris op zichzelf
        weinig over je financiële ruimte.
      </p>
      <p className="font-body" style={p}>
        Stel: je verdient €6.000 netto. Iemand anders verdient €4.500. Toch kan die tweede persoon
        maandelijks meer financiële ruimte hebben, omdat wonen, vervoer, kinderen en andere
        structurele uitgaven bij dat huishouden veel lager liggen.
      </p>
      <p className="font-body" style={p}>
        Financiële ruimte is niet hetzelfde als inkomen. Het is het bedrag dat structureel
        beschikbaar blijft nadat je rekening hebt gehouden met de werkelijke kosten van je
        huishouden. Hieronder laat ik zien hoe je dat voor jezelf berekent, en waarom de uitkomst
        nooit los van je huishouden te beoordelen is.
      </p>

      {/* Kort antwoord */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${GOLD}` }}>
        <p className="font-body font-semibold text-sm mb-2" style={{ color: DARK }}>
          Kort antwoord
        </p>
        <p className="font-body text-sm mb-3" style={{ color: SOFT, fontWeight: 300 }}>
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
              style={{ backgroundColor: OFFWHITE, color: SOFT, border: `1px solid ${GOLD}` }}
            >
              {item}
            </span>
          ))}
        </div>
        <p className="font-body text-sm mb-2" style={{ color: SOFT, fontWeight: 300 }}>
          Daarom kan €1.000 per maand vrij besteedbaar geld voor het ene huishouden ruim zijn en
          voor het andere huishouden nauwelijks voldoende.
        </p>
        <p className="font-body text-sm mb-0" style={{ color: DARK, fontWeight: 500 }}>
          De vraag is dus niet alleen hoeveel je verdient, maar hoeveel er structureel overblijft
          nadat je volledige huishouden is meegenomen.
        </p>
      </div>

      <h2 className="font-display" style={h2}>
        Wat is financiële ruimte eigenlijk?
      </h2>
      <p className="font-body" style={p}>
        Drie begrippen worden vaak door elkaar gebruikt, terwijl ze iets anders betekenen.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
        <div className="rounded-xl p-4" style={{ backgroundColor: OFFWHITE, borderTop: `3px solid ${GOLD}` }}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: DARK }}>Inkomen</p>
          <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>Wat er binnenkomt.</p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: OFFWHITE, borderTop: `3px solid ${GOLD}` }}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: DARK }}>Overhouden</p>
          <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>Wat er na uitgaven op je rekening staat.</p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: `1.5px solid ${WINE}` }}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: WINE }}>Financiële ruimte</p>
          <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>
            Wat structureel beschikbaar is na vaste lasten, variabele uitgaven, reserveringen en doelen.
          </p>
        </div>
      </div>
      <p className="font-body" style={p}>
        Geld over op je betaalrekening is dus niet automatisch financiële ruimte. Stel dat je €1.000
        overhoudt, maar je moet nog €4.000 per jaar reserveren voor vakanties, onderhoud, belastingen
        en verzekeringen. Dan is die €1.000 niet volledig vrije ruimte, een deel ervan heeft al een
        bestemming.
      </p>

      {/* Visueel rekenblok */}
      <p className="font-body font-medium text-xs uppercase tracking-wide mb-2" style={{ color: SOFT, letterSpacing: "0.06em" }}>
        Voorbeeld, geen landelijk gemiddelde
      </p>
      <div className="rounded-2xl p-5 sm:p-6 mb-3" style={{ backgroundColor: WINE }}>
        {REKENBLOK.map((r) => (
          <div key={r.label} className="flex justify-between items-baseline py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
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
          <span className="font-display tabular-nums" style={{ color: GOLD, fontSize: "1.9rem", fontWeight: 400 }}>
            €{REKENBLOK_RESULTAAT.toLocaleString("nl-NL")}
          </span>
        </div>
      </div>
      <p className="font-body" style={pStrong}>
        Dit bedrag is een uitkomst van een rekensom. Het is nog geen oordeel.
      </p>

      {/* Visueel anker: veel of weinig? */}
      <div className="rounded-2xl p-6 sm:p-10 my-8 text-center" style={{ backgroundColor: OFFWHITE, border: `1.5px solid ${GOLD}` }}>
        <p
          className="font-display tabular-nums"
          style={{ color: WINE, fontSize: "clamp(2.4rem, 7vw, 4rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "0.5rem" }}
        >
          €{REKENBLOK_RESULTAAT.toLocaleString("nl-NL")} ruimte per maand
        </p>
        <p className="font-display" style={{ color: DARK, fontSize: "1.6rem", fontWeight: 500, marginBottom: "0.75rem" }}>
          Veel? Weinig?
        </p>
        <p className="font-body" style={{ color: SOFT, fontSize: "1.0625rem", fontWeight: 300, marginBottom: 0 }}>
          Dat kun je niet bepalen zonder de context van jouw huishouden.
        </p>
      </div>

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
              style={{ width: "2rem", height: "2rem", backgroundColor: WINE, color: "#FFFFFF", fontSize: "0.95rem" }}
            >
              {i + 1}
            </span>
            <div>
              <p className="font-body font-medium text-sm mb-1" style={{ color: DARK }}>{stap.titel}</p>
              <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>{stap.tekst}</p>
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
      <p className="font-body" style={p}>
        Daar bestaat geen universeel antwoord op. Richtlijnen zoals sparen als percentage van je
        inkomen kunnen een startpunt zijn, bijvoorbeeld de{" "}
        <Link href="/inzichten/50-30-20-regel-hoger-inkomen" style={linkStyle}>
          50/30/20-regel
        </Link>{" "}
        of{" "}
        <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={linkStyle}>
          hoeveel sparen per maand normaal is
        </Link>
        . Maar een percentage vertelt niet of jouw huishouden financieel ruim zit, het is een vuistregel,
        geen norm.
      </p>
      <p className="font-body" style={p}>
        Voorbeeld, twee fictieve huishoudens naast elkaar. Huishouden A verdient €8.000 netto, heeft
        €6.900 structurele uitgaven en houdt €1.100 ruimte over. Huishouden B verdient €5.500 netto,
        heeft €4.100 structurele uitgaven en houdt €1.400 ruimte over. Huishouden B verdient minder,
        maar heeft meer vrije financiële ruimte.
      </p>
      <p className="font-body" style={pStrong}>
        Je financiële ruimte kun je berekenen. Maar of die ruimte veel of weinig is, kun je alleen
        bepalen in de context van jouw huishouden.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe weet ik of mijn financiële ruimte normaal is?
      </h2>
      <p className="font-body" style={p}>
        Vergelijk niet met &ldquo;de gemiddelde Nederlander&rdquo;. Een vergelijking is alleen
        waardevol met huishoudens die op deze punten op jou lijken:
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {VERGELIJKINGSCRITERIA.map((item) => (
          <span
            key={item}
            className="font-body text-sm rounded-full px-3 py-1.5"
            style={{ backgroundColor: OFFWHITE, color: DARK, border: `1px solid ${GOLD}` }}
          >
            {item}
          </span>
        ))}
      </div>
      <p className="font-body" style={p}>
        €800 boodschappen kan veel zijn voor het ene huishouden en heel normaal voor het andere.
        €2.000 woonlasten kan zwaar zijn bij €4.500 inkomen en prima passen bij €8.000 inkomen. Een
        gemiddelde over alle Nederlandse huishoudens zegt daar niets over, want het mengt al deze
        situaties bij elkaar.
      </p>
      <p className="font-body" style={p}>
        Bij de {RAPPORTEN.length} huishoudens die ik zelf heb doorgerekend, was mijn conclusie bij{" "}
        {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} dat er niets te repareren viel. Hun cijfers waren
        voor dat huishouden gewoon normaal, ook al voelde het krap.{" "}
        <Link href="/rapporten" style={linkStyle}>
          Bekijk hun rapporten
        </Link>
        .
      </p>

      {/* CTA gratis analyse */}
      <p className="font-body" style={pStrong}>
        Je kunt je financiële ruimte berekenen. Maar weet je ook of het veel of weinig is voor een
        huishouden zoals het jouwe?
      </p>
      <div className="rounded-2xl p-6 sm:p-8 my-8" style={{ backgroundColor: WINE }}>
        <p className="font-display font-light" style={{ color: "#FFFFFF", fontSize: "1.5rem", marginBottom: "0.75rem" }}>
          Doe de gratis analyse
        </p>
        <p className="font-body" style={{ color: "#FFFFFF", opacity: 0.92, fontWeight: 300, marginBottom: "1.25rem" }}>
          Ontdek waar jouw huishouden afwijkt.
        </p>
        <Link
          href="/analyse"
          className="inline-flex items-center justify-center font-body text-sm font-medium"
          style={{ color: WINE, backgroundColor: "#FFFFFF", borderRadius: "10px", padding: "0.85rem 1.5rem", textDecoration: "none" }}
        >
          Doe de gratis analyse &rarr;
        </Link>
        <p className="font-body text-xs mt-3 mb-0" style={{ color: "#FFFFFF", opacity: 0.8 }}>
          Gratis · geen account · geen bankkoppeling · geen verkoopgesprek
        </p>
      </div>

      <h2 className="font-display" style={h2}>
        Je verdient goed, maar hebt toch weinig financiële ruimte
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
        {SCENARIOS.map((s, i) => (
          <div key={s.titel} className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${GOLD}` }}>
            <p className="font-body font-medium text-sm mb-1" style={{ color: DARK }}>
              Scenario {i + 1}. {s.titel}
            </p>
            <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>{s.tekst}</p>
          </div>
        ))}
      </div>
      <p className="font-body" style={p}>
        Geen van deze situaties betekent automatisch dat iemand financieel onverstandig bezig is. Wie
        wisselende inkomsten heeft als zzp&apos;er, rekent bovendien anders dan wie een vast salaris
        heeft. Meer over die kosten staat in{" "}
        <Link href="/inzichten/kosten-levensonderhoud-zzp-alleenstaande-2026" style={linkStyle}>
          kosten levensonderhoud voor zzp&apos;ers
        </Link>
        .
      </p>

      {/* Herkenning */}
      <div className="rounded-xl p-5 my-8" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${GOLD}` }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: DARK }}>
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
            <li key={item} className="flex gap-2 font-body text-sm" style={{ color: DARK }}>
              <span className="mt-0.5 shrink-0" style={{ color: WINE }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="font-body text-sm mt-3 mb-0" style={{ color: SOFT, fontWeight: 300 }}>
          Dan is je probleem misschien niet dat je te weinig weet van geld, maar dat je geen context
          hebt voor je eigen cijfers.
        </p>
      </div>

      <h2 className="font-display" style={h2}>
        Waarom een simpele rekensom niet genoeg is
      </h2>
      <p className="font-body" style={p}>
        Een rekenaar kan inkomen min uitgaven optellen. Wat hij niet vanzelf bepaalt, is of jouw
        uitgaven normaal zijn, of een categorie daadwerkelijk problematisch is, of je levensstijl past
        bij je doelen, of je financiële ruimte groot genoeg is voor je plannen, en of je eigenlijk
        niets hoeft te veranderen.
      </p>
      <p className="font-body" style={p}>
        Een bankapp vertelt je wat je uitgeeft. Een analyse helpt je begrijpen wat dat betekent.
      </p>

      <p className="font-body" style={p}>
        Wil je liever eerst zelf rekenen met vaste bedragen in plaats van een huishouden-schuif, gebruik
        dan mijn{" "}
        <Link href="/inzichten/vrij-besteedbaar-inkomen-berekenen" style={linkStyle}>
          rekenhulp voor vrij besteedbaar inkomen
        </Link>
        . En lees ook wat er volgens de richtlijnen{" "}
        <Link href="/inzichten/hoeveel-geld-overhouden-einde-maand" style={linkStyle}>
          aan het einde van de maand zou moeten overblijven
        </Link>
        , en hoe €4.000 netto zich verhoudt tot{" "}
        <Link href="/inzichten/is-4000-euro-netto-goed-salaris-nederland" style={linkStyle}>
          een goed salaris in Nederland
        </Link>
        .
      </p>

      <p className="font-body" style={p}>
        Heb je die ruimte wel, maar merk je dat je vermogen er toch niet snel genoeg mee groeit? Lees
        dan{" "}
        <Link href="/inzichten/goed-inkomen-weinig-vermogen" style={linkStyle}>
          waarom een goed inkomen niet automatisch vermogen oplevert
        </Link>
        .
      </p>

      {/* Slot */}
      <div className="rounded-2xl p-6 sm:p-10 my-8" style={{ backgroundColor: WINE }}>
        <p className="font-body" style={{ color: "#FFFFFF", fontWeight: 400, fontSize: "1.15rem", lineHeight: 1.6, marginBottom: 0 }}>
          Je hoeft niet eerst minder uit te geven. Je moet eerst weten of je financiële ruimte
          inderdaad kleiner is dan je denkt.
        </p>
      </div>
      <p className="font-body" style={p}>
        Financiële ruimte is één onderdeel van een breder beeld. Wil je weten hoe je dat bredere
        beeld beoordeelt, inclusief buffer, sparen en plannen, lees dan{" "}
        <Link href="/inzichten/hoe-weet-ik-of-ik-financieel-gezond-ben" style={linkStyle}>
          hoe je weet of je financieel gezond bent
        </Link>
        .
      </p>
    </>
  );
}
