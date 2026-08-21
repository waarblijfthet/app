import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";
import { rapportVoorSlug } from "@/lib/rapporten-data";

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

/**
 * Case voor de brug naar Waar blijft het (werkregel 2): een stel zonder
 * kinderen dat verwachtte dat hun vermogen sneller zou groeien en dacht dat
 * lichtzinnig uitgeven de oorzaak was. Dat bleek niet zo, hun levensstijl
 * botste met hun eigen spaardoel. Precies de doelgroep van dit artikel (stel
 * zonder kinderen, twee goede inkomens, geen schuldenproblematiek).
 */
const CASE_STEL = rapportVoorSlug("stel-zonder-kinderen")!;

const OORZAKEN = [
  {
    titel: "Je levensstijl groeit mee met je inkomen",
    tekst:
      "Meer inkomen leidt soms tot een grotere woning, een duurdere auto, vaker op vakantie, vaker uit eten of een duurdere hobby. Meer uitgeven omdat je meer verdient is niet automatisch verkeerd. De vraag is wat het doet met je financiële ruimte.",
  },
  {
    titel: "Je vaste lasten zijn structureel hoog",
    tekst:
      "Een hoog inkomen kan een hoge woonlast, twee auto's, kinderopvang en andere vaste verplichtingen dragen. Maar wat betaalbaar is, is niet hetzelfde als wat financieel ruim voelt.",
  },
  {
    titel: "Je kijkt naar maanduitgaven maar niet naar jaaruitgaven",
    tekst:
      "Vakantie, onderhoud, verzekeringen, belasting, schoolkosten en cadeaus vallen buiten een gewone maandbegroting. Daardoor lijkt de maandruimte groter dan hij werkelijk is.",
  },
  {
    titel: "Je spaart wat overblijft",
    tekst:
      "Sparen als sluitpost werkt zelden, want er blijft bijna nooit iets over als je eerst alles uitgeeft en pas daarna kijkt wat rest.",
  },
  {
    titel: "Je hebt eigenlijk minder financiële ruimte dan je denkt",
    tekst:
      "Dit is niet hetzelfde als slecht met geld omgaan. De verwachte ruimte en de werkelijke ruimte kunnen simpelweg verschillen, en dat zie je pas als je ze naast elkaar zet.",
  },
];

const HERKENNING = [
  "Je salaris is de afgelopen jaren gestegen, maar je vermogen nauwelijks.",
  "Je verdient goed maar hebt weinig spaargeld.",
  "Je weet ongeveer wat je uitgeeft, maar niet waarom er zo weinig overblijft.",
  "Je hebt geen schulden maar voelt je financieel niet vrij.",
  "Je vraagt je af of andere huishoudens met hetzelfde inkomen veel meer overhouden.",
  "Je weet niet of je financiële situatie normaal is.",
];

export default function GoedInkomenWeinigVermogen() {
  return (
    <>
      <p className="font-body" style={{ ...pStrong, fontSize: "1.2rem" }}>
        Een hoog inkomen betekent niet automatisch dat je vermogen snel groeit. Het verschil zit vaak in
        hoeveel financiële ruimte er structureel overblijft.
      </p>
      <p className="font-body" style={p}>
        Je verdient €6.000 netto. Je partner verdient €3.000. Samen komt er €9.000 per maand binnen.
        Toch staat er na een paar jaar geen vermogen waar je bij dit inkomen zou verwachten. Geen
        schulden, geen grote financiële problemen, maar ook niet het gevoel dat je echt vooruitgaat.
      </p>
      <p className="font-body" style={pStrong}>
        De interessante vraag is daarom niet alleen waarom je vermogen niet groeit, maar waar jouw
        financiële ruimte onderweg verdwijnt.
      </p>

      {/* Kort antwoord */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${GOLD}` }}>
        <p className="font-body font-semibold text-sm mb-2" style={{ color: DARK }}>
          Kort antwoord
        </p>
        <p className="font-body text-sm mb-3" style={{ color: SOFT, fontWeight: 300 }}>
          Een hoog inkomen bouwt niet vanzelf vermogen op. Verdien je structureel €9.000 netto maar geef
          je €8.500 uit, dan blijft er veel minder over om vermogen mee op te bouwen dan wanneer je
          €6.000 verdient en €4.800 uitgeeft. Daar komt eventueel rendement bovenop.
        </p>
        <p className="font-body text-sm mb-0" style={{ color: DARK, fontWeight: 500 }}>
          De eerste vraag is dus niet &ldquo;hoe moet ik beleggen&rdquo;, maar &ldquo;hoeveel financiële
          ruimte creëert mijn huishouden eigenlijk&rdquo;.
        </p>
      </div>

      <SalarisRekenaar
        startInkomen={9000}
        startVolwassenen={2}
        startKinderen={0}
        startAuto="eigen"
        kop="Reken uit welke financiële ruimte ik bij jouw huishouden zou verwachten"
        intro="Een hoog inkomen zegt niets over hoeveel er structureel overblijft om mee te sparen of te beleggen. Zet je eigen inkomen en huishouden hieronder, dan zie je wat ik bij een huishouden zoals dat van jou zou verwachten."
      />

      <p className="font-body" style={pStrong}>
        De berekening laat zien wat mogelijk is. De gratis analyse laat zien wat er bij jouw
        huishouden werkelijk gebeurt.
      </p>

      <h2 className="font-display" style={h2}>
        Hoog inkomen is niet hetzelfde als rijk zijn
      </h2>
      <p className="font-body" style={p}>
        Drie begrippen worden vaak door elkaar gebruikt, terwijl ze iets anders betekenen.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
        <div className="rounded-xl p-4" style={{ backgroundColor: OFFWHITE, borderTop: `3px solid ${GOLD}` }}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: DARK }}>Inkomen</p>
          <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>Wat je per maand verdient.</p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: OFFWHITE, borderTop: `3px solid ${GOLD}` }}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: DARK }}>Financiële ruimte</p>
          <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>
            Wat er structureel overblijft na alle relevante uitgaven en reserveringen.
          </p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: `1.5px solid ${WINE}` }}>
          <p className="font-body font-semibold text-sm mb-1" style={{ color: WINE }}>Vermogen</p>
          <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>
            Wat je in de loop van de tijd opbouwt.
          </p>
        </div>
      </div>
      <p className="font-body" style={p}>
        Iemand kan een hoog inkomen hebben en toch weinig vermogen. Neem twee huishoudens naast elkaar.
        Huishouden A heeft €9.000 netto inkomen en €8.200 structurele uitgaven, dus €800 ruimte.
        Huishouden B heeft €6.000 netto inkomen en €4.500 structurele uitgaven, dus €1.500 ruimte.
        Huishouden B verdient minder, maar creëert meer ruimte om vermogen op te bouwen.
      </p>

      <h2 className="font-display" style={h2}>
        Waar blijft het verschil?
      </h2>
      <ol className="space-y-4 my-5" style={{ listStyle: "none", paddingLeft: 0 }}>
        {OORZAKEN.map((oorzaak, i) => (
          <li key={oorzaak.titel} className="flex gap-4">
            <span
              className="flex-shrink-0 rounded-full flex items-center justify-center font-display"
              style={{ width: "2rem", height: "2rem", backgroundColor: WINE, color: "#FFFFFF", fontSize: "0.95rem" }}
            >
              {i + 1}
            </span>
            <div>
              <p className="font-body font-medium text-sm mb-1" style={{ color: DARK }}>{oorzaak.titel}</p>
              <p className="font-body text-sm" style={{ color: SOFT, fontWeight: 300 }}>{oorzaak.tekst}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="font-body" style={p}>
        Sparen als sluitpost is precies waarom volgorde zo veel uitmaakt. Hoe je dat omdraait, staat in{" "}
        <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={linkStyle}>
          hoeveel sparen per maand normaal is
        </Link>
        , en wat er volgens de richtlijnen aan het einde van de maand over zou moeten blijven lees je in{" "}
        <Link href="/inzichten/hoeveel-geld-overhouden-einde-maand" style={linkStyle}>
          hoeveel je hoort over te houden
        </Link>
        .
      </p>
      <p className="font-body" style={p}>
        Het laatste punt is de brug naar waar dit artikel eigenlijk over gaat. Het probleem is misschien
        niet dat iemand slecht met geld omgaat. De verwachte ruimte en de werkelijke ruimte kunnen
        simpelweg verschillen, en hoe je die zelf berekent staat in{" "}
        <Link href="/inzichten/hoeveel-financiele-ruimte-heb-ik" style={linkStyle}>
          hoeveel financiële ruimte heb ik eigenlijk
        </Link>
        .
      </p>

      {/* Groot financieel voorbeeld */}
      <p className="font-body font-medium text-xs uppercase tracking-wide mb-2" style={{ color: SOFT, letterSpacing: "0.06em" }}>
        Voorbeeld, geen echt huishouden
      </p>
      <div className="rounded-2xl p-5 sm:p-6 mb-3" style={{ backgroundColor: WINE }}>
        <div className="flex justify-between items-baseline py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
          <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>Netto per maand</span>
          <span className="font-display tabular-nums" style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 300 }}>€9.000</span>
        </div>
        <div className="flex justify-between items-baseline py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.18)" }}>
          <span className="font-body text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>min structurele uitgaven</span>
          <span className="font-display tabular-nums" style={{ color: "#FFFFFF", fontSize: "1.1rem", fontWeight: 300 }}>-€7.900</span>
        </div>
        <div className="flex justify-between items-baseline pt-4">
          <span className="font-body text-sm font-medium" style={{ color: "#FFFFFF" }}>Potentiële vermogensgroei per maand</span>
          <span className="font-display tabular-nums" style={{ color: GOLD, fontSize: "1.9rem", fontWeight: 400 }}>€1.100</span>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.18)" }}>
          <div>
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>Per jaar</p>
            <p className="font-display tabular-nums" style={{ color: "#FFFFFF", fontSize: "1.3rem", fontWeight: 300 }}>€13.200</p>
          </div>
          <div>
            <p className="font-body text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>In vijf jaar, exclusief rendement</p>
            <p className="font-display tabular-nums" style={{ color: "#FFFFFF", fontSize: "1.3rem", fontWeight: 300 }}>€66.000</p>
          </div>
        </div>
      </div>
      <p className="font-body" style={p}>
        Dit werkt alleen als die ruimte daadwerkelijk structureel beschikbaar blijft, en ook echt wordt
        gespaard of belegd in plaats van ergens anders aan opgaat.
      </p>
      <p className="font-body" style={pStrong}>
        Dit voorbeeld laat zien hoe het kan werken. Maar het zegt nog niets over jouw huishouden.
      </p>
      <p className="font-body" style={p}>
        Daarvoor moet je weten hoe jouw inkomen, woonlasten, gezin, vervoer, uitgaven en financiële
        doelen zich tot elkaar verhouden.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom meer verdienen niet altijd helpt
      </h2>
      <p className="font-body" style={p}>
        Stel, je verdient €5.000 en geeft €4.200 uit, dan houd je €800 ruimte over. Na een
        salarisverhoging verdien je €6.000, maar je uitgaven groeien mee naar €5.200. Ook dan houd je
        €800 ruimte over. Je verdient €1.000 meer, maar hebt geen extra structurele financiële ruimte.
      </p>
      <p className="font-body" style={p}>
        De salarisverhoging heeft dan vooral je levensstijl verhoogd, niet je financiële ruimte. Hoe dit
        mechanisme precies werkt en waar het vandaan komt, lees je in{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={linkStyle}>
          lifestyle-inflatie: meer verdienen, meer uitgeven
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel vermogen zou ik eigenlijk moeten hebben?
      </h2>
      <p className="font-body" style={p}>
        Daar bestaat geen enkel juist bedrag voor. Hoeveel vermogen bij jou past hangt onder meer af van
        je leeftijd, je inkomen, je woning en hypotheek, je gezin, je pensioen, je doelen, je gewenste
        levensstijl en hoe je verwacht dat je inkomen zich ontwikkelt.
      </p>
      <p className="font-body" style={p}>
        Als benchmark: het mediane vermogen van een Nederlands huishouden lag begin 2022 op ruim
        €135.000 (CBS, Materiële welvaart in Nederland 2024). Dat cijfer gaat over alle huishoudens
        samen, ongeacht inkomen, leeftijd, hypotheek of gezinssituatie. Het zegt dus weinig over wat
        normaal is bij jouw inkomen en jouw levensfase.
      </p>
      <p className="font-body" style={p}>
        Een richtlijn zoals de{" "}
        <Link href="/inzichten/50-30-20-regel-hoger-inkomen" style={linkStyle}>
          50/30/20-regel
        </Link>{" "}
        kan een startpunt zijn voor hoeveel je opzij zet. Maar een percentage van je inkomen vertelt niet
        of jouw huishouden op koers ligt, dat hangt af van je eigen situatie.
      </p>

      <h2 className="font-display" style={h2}>
        Is er eigenlijk wel iets mis?
      </h2>
      <p className="font-body" style={pStrong}>
        Misschien wel niet.
      </p>
      <p className="font-body" style={p}>
        Een huishouden kan goed verdienen, hoge woonlasten hebben, meerdere kinderen hebben, veel
        uitgeven aan reizen en weinig sparen, en toch een financieel passende levensstijl hebben.
      </p>
      <p className="font-body" style={pStrong}>
        De relevante vraag is: past wat je uitgeeft bij wat je belangrijk vindt en bij wat je financieel
        wilt bereiken? Niet: geef je te veel uit?
      </p>
      <p className="font-body" style={p}>
        Dat is een andere vraag dan of je financieel gezond bent in bredere zin, met een buffer,
        spaargedrag en plannen die bij je situatie passen. Hoe je dat breder beoordeelt, staat in{" "}
        <Link href="/inzichten/hoe-weet-ik-of-ik-financieel-gezond-ben" style={linkStyle}>
          hoe je weet of je financieel gezond bent
        </Link>
        .
      </p>

      {/* Herken je dit? */}
      <div className="rounded-xl p-5 my-8" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${GOLD}` }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: DARK }}>
          Herken je dit?
        </p>
        <ul className="space-y-1.5">
          {HERKENNING.map((item) => (
            <li key={item} className="flex gap-2 font-body text-sm" style={{ color: DARK }}>
              <span className="mt-0.5 shrink-0" style={{ color: WINE }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="font-body text-sm mt-3 mb-0" style={{ color: SOFT, fontWeight: 300 }}>
          Dan is meer verdienen waarschijnlijk niet het eerste antwoord. Eerst moet duidelijk worden wat
          er werkelijk gebeurt.
        </p>
      </div>

      <p className="font-body" style={pStrong}>
        Misschien herken je dit. Maar herkenning vertelt je nog niet waar het bij jou zit.
      </p>

      {/* CTA gratis analyse */}
      <div className="rounded-2xl p-6 sm:p-8 my-8" style={{ backgroundColor: WINE }}>
        <p className="font-display font-light" style={{ color: "#FFFFFF", fontSize: "1.5rem", marginBottom: "0.75rem" }}>
          Wil je weten waarom jouw vermogen niet sneller groeit?
        </p>
        <p className="font-body" style={{ color: "#FFFFFF", opacity: 0.92, fontWeight: 300, marginBottom: "1.25rem" }}>
          Zie waar jouw huishouden afwijkt van vergelijkbare huishoudens.
        </p>
        <Link
          href="/analyse"
          className="inline-flex items-center justify-center font-body text-sm font-medium"
          style={{ color: WINE, backgroundColor: "#FFFFFF", borderRadius: "10px", padding: "0.85rem 1.5rem", textDecoration: "none" }}
        >
          Doe de gratis analyse &rarr;
        </Link>
        <p className="font-body text-xs mt-3 mb-0" style={{ color: "#FFFFFF", opacity: 0.8 }}>
          Gratis · vertrouwelijk · geen verkoopgesprek
        </p>
      </div>

      <h2 className="font-display" style={h2}>
        Waarom een vermogensdoel begint bij je huishouden
      </h2>
      <p className="font-body" style={p}>
        Beleggen, extra aflossen, pensioen of eerder stoppen met werken zijn allemaal keuzes die prima te
        bespreken zijn. Maar als niemand weet hoeveel er structureel beschikbaar is, plan je op
        aannames. Een vermogensdoel dat niet begint bij je eigen structurele ruimte, is een doel op los
        zand.
      </p>
      <p className="font-body" style={p}>
        Denk je al verder dan dit artikel, richting eerder stoppen met werken of financiële
        onafhankelijkheid? Dan gaat{" "}
        <Link href="/inzichten/financieel-onafhankelijk-worden-realistisch" style={linkStyle}>
          financieel onafhankelijk worden, wat het echt betekent
        </Link>{" "}
        dieper in op wat daarvoor nodig is.
      </p>

      {/* Case */}
      {CASE_STEL && (
        <div className="rounded-xl p-5 my-8" style={{ backgroundColor: "#FFFFFF", border: `1px solid ${GOLD}` }}>
          <p className="font-body font-medium text-sm mb-1" style={{ color: DARK }}>
            {CASE_STEL.verhaalTitel}
          </p>
          <p className="font-body text-sm mb-3" style={{ color: SOFT, fontWeight: 300 }}>
            Een stel zonder kinderen verdiende samen €6.990 netto. Ze hadden een spaardoel van €40.000
            eigen geld binnen drie jaar, en het spaargeld groeide daar niet naartoe. Zelf dachten ze:
            &ldquo;{CASE_STEL.vermoeden}&rdquo; {CASE_STEL.vermoedenBedrag}
          </p>
          <p className="font-body text-sm mb-3" style={{ color: SOFT, fontWeight: 300 }}>
            Dat bleek niet zo te zijn. Mijn conclusie: &ldquo;{CASE_STEL.uitkomstKop}.&rdquo; {CASE_STEL.uitkomst}
          </p>
          <p className="font-body text-sm mb-4" style={{ color: SOFT, fontWeight: 300 }}>
            Hun evaluatie na drie maanden: &ldquo;{CASE_STEL.evaluatie}&rdquo;
          </p>
          <Link href={`/rapporten/${CASE_STEL.slug}`} style={linkStyle}>
            Lees hun volledige rapport &rarr;
          </Link>
        </div>
      )}

      {/* Slot */}
      <div className="rounded-2xl p-6 sm:p-10 my-8" style={{ backgroundColor: WINE }}>
        <p className="font-body" style={{ color: "#FFFFFF", fontWeight: 400, fontSize: "1.15rem", lineHeight: 1.6, marginBottom: 0 }}>
          Een hoog inkomen vertelt je hoeveel potentieel je hebt. Je financiële patroon vertelt je wat er
          daadwerkelijk gebeurt.
        </p>
      </div>
      <p className="font-body" style={p}>
        Lees ook of{" "}
        <Link href="/inzichten/is-4000-euro-netto-goed-salaris-nederland" style={linkStyle}>
          €4.000 netto een goed salaris is
        </Link>{" "}
        en hoe dat zich verhoudt tot wat er daadwerkelijk overblijft.
      </p>
    </>
  );
}
