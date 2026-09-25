import Link from "next/link";
import KeuzeDoorrekening from "@/components/artikel/KeuzeDoorrekening";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import { rapportVoorSlug, RAPPORTEN } from "@/lib/rapporten-data";
import {
  BRONNEN,
  BRON_DATUM,
  KINDERBIJSLAG_KWARTAAL_2026,
  kinderbijslagPerMaand,
  EIGEN_RISICO_2026,
  DUO_2026,
  NIBUD_OUDERBIJDRAGE,
  NIBUD_KOSTGELD_AANDEEL,
} from "@/lib/geldmomenten-bronnen";
import { KGB_2026 } from "@/lib/kindgebonden-budget";
import { euro } from "@/lib/salaris-vuistregel";

/**
 * Nieuw artikel, geldmoment 5: je kind wordt 18 (25-sep-2026).
 *
 * Hoofdterm "kind wordt 18 wat verandert er financieel". GSC: geen enkele
 * eigen URL vertoont op "18" in deze betekenis. SERP (docs/serp-geldmomenten-
 * 25-sep-2026.md): Nibud, Rijksoverheid, budgetcoach.nl, Geldfit en
 * gemeentelijke geldwijzers met een regellijst. Niemand laat het gezinsbudget
 * ervoor en erna zien, en de ouder met een goed inkomen komt niet voor.
 *
 * De vraag is niet "wat kost een kind van 18" maar "wat verandert er in jullie
 * huishoudbudget". Elk bedrag komt uit lib/geldmomenten-bronnen.ts (SVB, DUO,
 * Rijksoverheid, Nibud, geopend 25-sep-2026) of uit KGB_2026.
 *
 * HERZIEN: zorgpremie 2027 zodra die bekend is (half november), en de
 * kinderbijslag, studiefinanciering en het eigen risico per 1 januari 2027.
 * Staat als taak in docs/bouwvolgorde.md.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

/** Euro met centen, voor de bronbedragen van SVB en DUO. */
const euroCent = (n: number) =>
  "€" + n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const KGB_NUL_EEN_KIND = Math.round(
  (KGB_2026.afbouwpuntPaar + KGB_2026.maxPerKindTot12 / KGB_2026.afbouwpercentage) / 100
) * 100;

function Bron({ bron }: { bron: { label: string; url: string } }) {
  return (
    <a href={bron.url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
      {bron.label.split(":")[0]}
    </a>
  );
}

export default function KindWordt18WatVerandertErFinancieel() {
  const kbKwartaal = KINDERBIJSLAG_KWARTAAL_2026.tot18;
  const kbMaand = kinderbijslagPerMaand("tot18");
  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const kbGezin = gezin.inkomsten.find((post) => post.label === "Kinderbijslag");
  const kinderenGezin = gezin.kenmerken.find((k) => k.includes("kinderen")) ?? "";
  const kinderContext = gezin.context.find((post) => post.label === "Kinderen");

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}. Het zijn de bedragen van 2026; die van 2027 volgen na de publicatie
        door SVB, DUO en Rijksoverheid.
      </p>

      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Wordt je kind 18, dan stopt de kinderbijslag: voor een kind van 12 tot en met 17 is dat {euroCent(kbKwartaal)}{" "}
        per kwartaal, ongeveer {euro(kbMaand)} per maand (SVB, 2026). Het kindgebonden budget stopt ook. Er komt bij:
        een eigen zorgpremie vanaf de maand na de verjaardag, {euro(EIGEN_RISICO_2026)} eigen risico, en vaak een
        bijdrage aan de studie.
      </p>

      <h2 className="font-display" style={h2}>Wat stopt en wat begint als je kind 18 wordt?</h2>
      <EenvoudigeTabel
        koppen={["Post", "Wat er verandert", "Bedrag in 2026"]}
        rijen={[
          ["Kinderbijslag", "Stopt vanaf het kwartaal waarop je kind op de eerste dag 18 is", `${euroCent(kbKwartaal)} per kwartaal minder`],
          ["Kindgebonden budget", "Stopt: alleen voor kinderen jonger dan 18", "Wat op je beschikking staat; bij een goed inkomen vaak nul"],
          ["Zorgverzekering", "Eigen premie vanaf de 1e maand na de 18e verjaardag", "De premie van de polis; je kind kan zorgtoeslag aanvragen"],
          ["Eigen risico", "Geldt vanaf 18 jaar", `${euro(EIGEN_RISICO_2026)} per jaar`],
          ["Basisbeurs hbo of universiteit", "Gaat naar je kind, niet naar jullie", `${euroCent(DUO_2026.hboWo.basisThuis)} thuis, ${euroCent(DUO_2026.hboWo.basisUit)} uitwonend per maand`],
          ["Aanvullende beurs", "Hangt af van jullie inkomen", `Maximaal ${euroCent(DUO_2026.hboWo.aanvullendMax)} per maand`],
          ["Bijdrage van ouders", `Het Nibud: ${NIBUD_OUDERBIJDRAGE.hboWoAandeelOuders} procent van de ouders draagt bij`, `Gemiddeld ${euro(NIBUD_OUDERBIJDRAGE.hboWoThuis)} thuis, ${euro(NIBUD_OUDERBIJDRAGE.hboWoUit)} uitwonend per maand`],
          ["Kostgeld", "Geen standaardbedrag", `${NIBUD_KOSTGELD_AANDEEL} procent van de thuiswonende 18- tot en met 30-jarigen betaalt het`],
        ]}
        bijschrift={`Bronnen: SVB, Dienst Toeslagen, Rijksoverheid, DUO (hbo en wo, september tot en met december 2026) en Nibud, geopend ${BRON_DATUM}.`}
      />

      <h2 className="font-display" style={h2}>Wanneer stopt de kinderbijslag als je kind 18 wordt?</h2>
      <p className="font-body text-text-soft" style={p}>
        Per kwartaal. De SVB kijkt of je kind op de eerste dag van een kwartaal 18 is: &ldquo;Dan krijgt u dat kwartaal
        geen kinderbijslag meer.&rdquo; Is je kind op die dag nog 17, dan krijg je dat hele kwartaal nog (<Bron bron={BRONNEN.svb18} />,
        geopend {BRON_DATUM}). Wie in mei 18 wordt, krijgt het tweede kwartaal dus nog helemaal, en vanaf juli niets meer.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Omdat de SVB na afloop van elk kwartaal betaalt, merk je het pas een kwartaal later op je rekening. Per maand
        scheelt het ongeveer {euro(kbMaand)} per kind, het bedrag voor 12 tot en met 17 jaar in het derde kwartaal van
        2026 (<Bron bron={BRONNEN.svbBedragen} />).
      </p>

      <h2 className="font-display" style={h2}>Stopt het kindgebonden budget ook bij 18 jaar?</h2>
      <p className="font-body text-text-soft" style={p}>
        Ja. De eerste voorwaarde van Dienst Toeslagen is &ldquo;1 of meer kinderen die jonger zijn dan 18 jaar&rdquo; (
        <Bron bron={BRONNEN.kgbVoorwaarden} />). Bij een goed inkomen merk je daar vaak niets van: voor een stel met één
        kind onder de 12 was het kindgebonden budget in 2026 al nul vanaf een gezamenlijk toetsingsinkomen van ongeveer{" "}
        {euro(KGB_NUL_EEN_KIND)}. Voor kinderen van 12 en ouder krijg je iets meer (<Bron bron={BRONNEN.kgbHoeveel} />),
        dus daar ligt die grens hoger. Kijk op je beschikking wat er voor dit kind binnenkomt; dat is het bedrag dat
        wegvalt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voor huishoudens die het kindgebonden budget wel krijgen, dalen de inkomsten fors als een thuiswonend kind 18
        wordt, schrijft het Nibud in &ldquo;De financiële knip op 18 jaar&rdquo;; de grootste daling zag het bij
        alleenstaande ouders in de bijstand (<Bron bron={BRONNEN.nibudKnip18} />). Bij een goed inkomen is de
        kinderbijslag meestal de post die echt wegvalt.
      </p>

      <h2 className="font-display" style={h2}>Wat kost de zorgverzekering als je kind 18 wordt?</h2>
      <p className="font-body text-text-soft" style={p}>
        Tot 18 is je kind gratis verzekerd. Daarna: &ldquo;U betaalt premie vanaf de 1e maand nadat uw kind 18 jaar is
        geworden. Ook geldt vanaf dat moment het eigen risico en kan uw kind zorgtoeslag aanvragen&rdquo; (
        <Bron bron={BRONNEN.zorgverzekering18} />). Het verplichte eigen risico is in 2026 {euro(EIGEN_RISICO_2026)} per
        jaar (<Bron bron={BRONNEN.eigenRisico} />). Blijft je kind op jullie polis en betalen jullie de premie, dan kan je
        kind toch zorgtoeslag krijgen, zegt Dienst Toeslagen (<Bron bron={BRONNEN.toeslagen18} />).
      </p>

      <h2 className="font-display" style={h2}>Wat krijgt een studerend kind van DUO?</h2>
      <p className="font-body text-text-soft" style={p}>
        In het hoger onderwijs een basisbeurs van {euroCent(DUO_2026.hboWo.basisThuis)} per maand thuiswonend en{" "}
        {euroCent(DUO_2026.hboWo.basisUit)} uitwonend, van september tot en met december 2026. In het mbo is dat{" "}
        {euroCent(DUO_2026.mbo.basisThuis)} en {euroCent(DUO_2026.mbo.basisUit)} (<Bron bron={BRONNEN.duoBedragen} />).
        De aanvullende beurs is in het hoger onderwijs maximaal {euroCent(DUO_2026.hboWo.aanvullendMax)} en &ldquo;afhankelijk
        van het inkomen van uw ouders&rdquo;. DUO vraagt dat inkomen zelf op bij de Belastingdienst.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat geld is van je kind. Voor jullie maand telt wat jullie bijdragen. Het Nibud: {NIBUD_OUDERBIJDRAGE.hboWoAandeelOuders}{" "}
        procent van de ouders draagt bij aan hbo of universiteit, gemiddeld {euro(NIBUD_OUDERBIJDRAGE.hboWoThuis)} per maand
        aan een thuiswonende en {euro(NIBUD_OUDERBIJDRAGE.hboWoUit)} aan een uitwonende student. In het mbo (bol) is dat{" "}
        {euro(NIBUD_OUDERBIJDRAGE.bolThuis)} en {euro(NIBUD_OUDERBIJDRAGE.bolUit)} (<Bron bron={BRONNEN.nibudStuderen} />). En
        je blijft onderhoudsplichtig tot je kind 21 is (<Bron bron={BRONNEN.nibud18} />).
      </p>

      <h2 className="font-display" style={h2}>Moet een kind van 18 kostgeld betalen?</h2>
      <p className="font-body text-text-soft" style={p}>
        Dat mag, het hoeft niet. &ldquo;Er is geen standaard kostgeldbedrag&rdquo;, schrijft het Nibud, en{" "}
        {NIBUD_KOSTGELD_AANDEEL} procent van de thuiswonende 18- tot en met 30-jarigen betaalt het (
        <Bron bron={BRONNEN.nibudKostgeld} />). Het Nibud raadt aan het samen vast te stellen door de posten langs te lopen
        waar je kind gebruik van maakt: woonlasten, energie, boodschappen, internet. Een richtbedrag van het Nibud heb ik
        niet, dus ik noem er geen.
      </p>

      <h2 className="font-display" style={h2}>Reken uit wat het jaar van 18 met jullie maand doet</h2>
      <p className="font-body text-text-soft" style={p}>
        De kinderbijslag staat al ingevuld. Vul de rest in zoals jullie het verwachten: wat er nu aan kindgebonden budget
        binnenkomt, wat de zorgverzekering gaat kosten en wat jullie gaan bijdragen.
      </p>

      <KeuzeDoorrekening keuze="kind-18" />

      <h2 className="font-display" style={h2}>Wat betekent dit voor jullie huishoudbudget?</h2>
      <p className="font-body text-text-soft" style={p}>
        De losse posten zijn niet groot. Wat het lastig maakt, is dat ze tegelijk komen en dat de kosten voor een oudere
        tiener daarvoor al waren opgelopen. Een gezin dat ik doorrekende, {kinderenGezin}, kreeg{" "}
        {kbGezin ? kbGezin.waarde : "kinderbijslag"} voor drie kinderen.
        {kinderContext && <> Hun eigen woorden: &ldquo;{kinderContext.waarde.split(". ").slice(-1)[0]}&rdquo;</>} Over een paar
        jaar valt voor de oudste de kinderbijslag weg, precies als die het duurst is.{" "}
        <Link href={`/rapporten/${gezin.slug}`} style={link} className="hover:underline">
          Lees hun rapport
        </Link>
        . Het is een van de {RAPPORTEN.length} huishoudens die ik volledig heb doorgerekend en gepubliceerd.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Of jullie dat opvangen, hangt niet af van de {euro(kbMaand)} zelf, maar van waar de rest van de maand nu naartoe
        gaat. Dat kun je een paar jaar vooruit zien aankomen, en dat is het voordeel van dit moment: de datum staat vast.
      </p>

      <h2 className="font-display" style={h2}>Wat reken ik hier niet uit?</h2>
      <p className="font-body text-text-soft" style={p}>
        De zorgtoeslag van je kind, de aanvullende beurs en je kinderalimentatie, als die er is. Die komen van Dienst
        Toeslagen, DUO en je afspraken. Ik reken alleen uit wat jullie maandbudget overlaat.
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Wat een gezin per post uitgeeft:{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={link} className="hover:underline">
          wat geeft een gezin uit per maand
        </Link>
        . Wat kinderen per leeftijd kosten, van de opvang tot de middelbare school:{" "}
        <Link href="/inzichten/wat-kost-een-kind-per-maand" style={link} className="hover:underline">
          wat kost een kind per maand
        </Link>{" "}
        en{" "}
        <Link href="/inzichten/schoolkosten-per-jaar-gezin" style={link} className="hover:underline">
          schoolkosten per jaar
        </Link>
        .
      </p>
    </>
  );
}
