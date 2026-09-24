import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import {
  berekenVuistregel,
  euro,
  afgerondOpHonderd,
  VUISTREGEL,
  VERVOER,
  VUISTREGEL_HERKOMST,
  type AutoKeuze,
} from "@/lib/salaris-vuistregel";
import { ZORG_2027 } from "@/lib/prinsjesdag-2027";

/**
 * Herbouw 24-sep-2026 (docs/serp-gemiste-onderwerpen-23-sep-2026.md #4): de
 * pagina had nul vertoningen, rustte op cijfers van FinBuddy, de Vaste Lasten
 * Bond en ConsumentWijzer (affiliate- en blogbronnen, CLAUDE.md 8.12) en bestond
 * voor een groot deel uit bespaartips (copyregel 5). Zelfde URL, nieuwe zoekterm:
 * "gemiddelde vaste lasten gezin 4 personen", plus 2 personen en 1 persoon.
 *
 * Intentiescheiding: de hubs H1 en H2 tonen de hele begroting inclusief
 * boodschappen en vrije tijd; deze pagina alleen de vaste lasten, en zet drie
 * huishoudtypes naast elkaar. Elk bedrag komt uit berekenVuistregel() of
 * rapportVoorSlug().
 */

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;
const th = { color: "#16211F", fontWeight: 600, whiteSpace: "nowrap" } as const;

interface Type {
  label: string;
  kort: string;
  volwassenen: 1 | 2;
  kinderen: number;
  auto: AutoKeuze;
  /** Representatief netto inkomen voor dit huishouden, binnen 3.500 tot 6.500 (CLAUDE.md 8.7). */
  inkomen: number;
}

/** Gezin eerst: dat is de hoofdterm, en op 390px moet die kolom zonder scrollen zichtbaar zijn. */
const TYPES: Type[] = [
  { label: "Gezin van 4", kort: "gezin van 4", volwassenen: 2, kinderen: 2, auto: "eigen", inkomen: 5500 },
  { label: "2 personen", kort: "2 personen", volwassenen: 2, kinderen: 0, auto: "eigen", inkomen: 5000 },
  { label: "1 persoon", kort: "1 persoon", volwassenen: 1, kinderen: 0, auto: "eigen", inkomen: 3500 },
];
const KOLOMMEN = [3500, 4500, 5500, 6500];

interface VasteLasten {
  woonlast: number;
  energie: number;
  internet: number;
  lokaal: number;
  verzekeringen: number;
  abonnementen: number;
  vervoer: number;
  totaal: number;
  kinderen: number;
}

/** Alleen de vaste lasten uit de vuistregel, velden voluit (minifier Next 14.2). */
function vasteLastenVoor(inkomen: number, volwassenen: 1 | 2, kinderen: number, auto: AutoKeuze): VasteLasten {
  const v = berekenVuistregel({
    inkomen: inkomen,
    volwassenen: volwassenen,
    kinderen: kinderen,
    auto: auto,
  });
  const woonlast = v.wonen - VUISTREGEL.energie - VUISTREGEL.internet - VUISTREGEL.lokaleLasten;
  return {
    woonlast: woonlast,
    energie: VUISTREGEL.energie,
    internet: VUISTREGEL.internet,
    lokaal: VUISTREGEL.lokaleLasten,
    verzekeringen: v.verzekeringen,
    abonnementen: v.abonnementen,
    vervoer: v.vervoer,
    totaal: v.wonen + v.verzekeringen + v.abonnementen + v.vervoer,
    kinderen: v.kinderkosten,
  };
}

export default function WatZijnNormaleVasteLastenGezin() {
  const rijen = TYPES.map((t) => ({ t: t, vl: vasteLastenVoor(t.inkomen, t.volwassenen, t.kinderen, t.auto) }));
  const vier = rijen[0];
  const twee = rijen[1];
  const een = rijen[2];

  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const stel = rapportVoorSlug("stel-zonder-kinderen")!;

  const posten: { label: string; waarde: (vl: VasteLasten) => number }[] = [
    { label: "Huur of hypotheek", waarde: (vl) => vl.woonlast },
    { label: "Energie", waarde: (vl) => vl.energie },
    { label: "Internet en tv", waarde: (vl) => vl.internet },
    { label: "Gemeentelijke lasten en waterschap", waarde: (vl) => vl.lokaal },
    { label: "Verzekeringen, inclusief zorg", waarde: (vl) => vl.verzekeringen },
    { label: "Abonnementen", waarde: (vl) => vl.abonnementen },
    { label: "Vervoer, één auto", waarde: (vl) => vl.vervoer },
  ];

  const herkomst = VUISTREGEL_HERKOMST.filter(
    (r) => !r.post.toLowerCase().includes("boodschappen") && !r.post.toLowerCase().includes("kind")
  );

  return (
    <>
      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        De vaste lasten van een gezin van 4 met {euro(vier.t.inkomen)} netto en één auto liggen rond{" "}
        {euro(afgerondOpHonderd(vier.vl.totaal))} per maand, plus {euro(vier.vl.kinderen)} voor opvang,
        school en sport. Voor 2 personen met {euro(twee.t.inkomen)} is het ongeveer{" "}
        {euro(afgerondOpHonderd(twee.vl.totaal))}, voor 1 persoon met {euro(een.t.inkomen)} ongeveer{" "}
        {euro(afgerondOpHonderd(een.vl.totaal))}. Boodschappen en vrije tijd komen daar nog bij.
      </p>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 24 september 2026. Geen landelijk gemiddelde: de bedragen komen uit mijn
        vuistregel op de {RAPPORTEN.length} huishoudens die ik zelf heb doorgerekend en die compleet op{" "}
        <Link href="/rapporten" style={link} className="hover:underline">
          /rapporten
        </Link>{" "}
        staan. Bij elk bedrag staat verderop op hoeveel huishoudens het rust.
      </p>

      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Wat de vaste lasten per post zijn voor 1 persoon, 2 personen en een gezin van 4",
            "Hoeveel procent van het inkomen dat is, van €3.500 tot €6.500 netto",
            "Wat de vaste lasten van twee echte huishoudens waren",
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

      <h2 className="font-display" style={h2}>
        Wat zijn de gemiddelde vaste lasten per huishouden?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Per post, voor drie huishoudens met elk een eigen auto. Het inkomen staat erbij, want de woonlast
        beweegt mee met wat er binnenkomt.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={th}>
                Post
              </th>
              {rijen.map((r) => (
                <th key={r.t.label} className="text-right py-2 px-2" style={th}>
                  {r.t.label}
                  <span className="block text-xs" style={{ color: "#8B958F", fontWeight: 400 }}>
                    {euro(r.t.inkomen)} netto
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posten.map((post) => (
              <tr key={post.label} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3" style={{ color: "#16211F" }}>
                  {post.label}
                </td>
                {rijen.map((r) => (
                  <td key={r.t.label} className="text-right py-2 px-2 tabular-nums" style={{ color: "#4A5A56", whiteSpace: "nowrap" }}>
                    {euro(post.waarde(r.vl))}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <td className="py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Vaste lasten totaal
              </td>
              {rijen.map((r) => (
                <td key={r.t.label} className="text-right py-2 px-2 tabular-nums" style={{ color: "#16211F", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {euro(r.vl.totaal)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-3" style={{ color: "#16211F" }}>
                Plus opvang, school en sport
              </td>
              {rijen.map((r) => (
                <td key={r.t.label} className="text-right py-2 px-2 tabular-nums" style={{ color: "#4A5A56", whiteSpace: "nowrap" }}>
                  {r.vl.kinderen > 0 ? euro(r.vl.kinderen) : "geen"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Wat hieraan opvalt: energie, internet, gemeentelijke lasten, abonnementen en de auto zijn voor één
        persoon even hoog als voor vier. Alleen de zorgverzekering telt per volwassene, en de woonlast is
        bij één volwassene een groter deel van het inkomen ({Math.round(VUISTREGEL.woonlastPctEen * 100)}{" "}
        tegen {Math.round(VUISTREGEL.woonlastPctTwee * 100)} procent). Daarom zijn de vaste lasten van een
        alleenstaande zo zwaar: bijna dezelfde rekeningen, van één inkomen.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel procent van je inkomen gaat naar vaste lasten?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dezelfde vuistregel, nu op vier inkomens. Het percentage daalt naarmate je meer verdient, omdat
        de meeste vaste lasten niet meestijgen.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-2" style={th}>
                Netto
              </th>
              {TYPES.map((t) => (
                <th key={t.label} className="text-right py-2 px-2" style={th}>
                  {t.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {KOLOMMEN.map((k) => (
              <tr key={k} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-2 tabular-nums" style={{ color: "#16211F", whiteSpace: "nowrap" }}>
                  {euro(k)}
                </td>
                {TYPES.map((t) => {
                  const vl = vasteLastenVoor(k, t.volwassenen, t.kinderen, t.auto);
                  const totaal = vl.totaal + vl.kinderen;
                  return (
                    <td key={t.label} className="text-right py-2 px-2 tabular-nums" style={{ color: "#4A5A56", whiteSpace: "nowrap" }}>
                      {euro(totaal)}
                      <span className="block text-xs" style={{ color: "#8B958F" }}>
                        {Math.round((totaal / k) * 100)}%
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Vaste lasten inclusief opvang, school en sport, met één auto. Zonder auto scheelt het in deze
        vuistregel {euro(VERVOER.eigen - VERVOER.geen)} per maand.
      </p>

      {/* Interactief element, CLAUDE.md 8.9 */}
      <SalarisRekenaar
        startInkomen={5500}
        startVolwassenen={2}
        startKinderen={2}
        startAuto="eigen"
        kop={"Zet je eigen huishouden erin, en zie wat er na de vaste lasten overblijft."}
        intro={
          "De rekenaar zet naast de vaste lasten ook boodschappen en vrije tijd, zodat je ziet wat er aan het eind van de maand over zou moeten zijn."
        }
      />

      <h2 className="font-display" style={h2}>
        De vaste lasten van twee echte huishoudens
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een vuistregel is een richting. Dit waren de vaste lasten van twee huishoudens die ik helemaal
        heb doorgerekend, zoals ze die zelf aanleverden.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 my-6">
        {[
          { r: gezin, kop: gezin.kenmerken.join(", ") },
          { r: stel, kop: stel.kenmerken.join(", ") },
        ].map(({ r, kop }) => (
          <div key={r.slug} className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
            <p className="font-body text-sm mb-2" style={{ color: "#16211F", fontWeight: 600 }}>
              {kop}
            </p>
            <ul className="space-y-1">
              {r.lasten.map((l) => (
                <li key={l.label} className="flex justify-between gap-3 font-body text-sm" style={{ borderBottom: "1px solid #F0F3F1" }}>
                  <span style={{ color: "#8B958F" }}>{l.label}</span>
                  <span className="text-right" style={{ color: "#4A5A56" }}>
                    {l.waarde}
                  </span>
                </li>
              ))}
            </ul>
            <p className="font-body text-sm mt-3" style={{ color: "#4A5A56" }}>
              Conclusie: {r.uitkomstKop.toLowerCase()}.{" "}
              <Link href={`/rapporten/${r.slug}`} style={link} className="hover:underline">
                Lees het rapport
              </Link>
            </p>
          </div>
        ))}
      </div>
      <p className="font-body text-text-soft" style={p}>
        Bij geen van beide zat het probleem in de vaste lasten. Bij {AANTAL_ZONDER_LEK} van de{" "}
        {RAPPORTEN.length} huishoudens die ik doorrekende was de conclusie dat er niets te repareren viel.
        Wat er dan wel speelde, staat in{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={link} className="hover:underline">
          wat een gezin uitgeeft per maand
        </Link>{" "}
        en in{" "}
        <Link href="/inzichten/gemiddelde-uitgaven-per-maand-2-personen" style={link} className="hover:underline">
          de uitgaven per maand voor 2 personen
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Waar deze bedragen vandaan komen
      </h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={th}>
                Post
              </th>
              <th className="text-right py-2 px-3" style={th}>
                Bedrag
              </th>
              <th className="text-right py-2 px-3" style={th}>
                n
              </th>
              <th className="text-left py-2 pl-3" style={th}>
                Wat de huishoudens aanleverden
              </th>
            </tr>
          </thead>
          <tbody>
            {herkomst.map((regel) => (
              <tr key={regel.post} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3 align-top" style={{ color: "#16211F" }}>
                  {regel.post}
                </td>
                <td className="text-right py-2 px-3 align-top tabular-nums" style={{ color: "#4A5A56", whiteSpace: "nowrap" }}>
                  {regel.bedrag}
                </td>
                <td className="text-right py-2 px-3 align-top tabular-nums" style={{ color: regel.n <= 2 ? "#92600A" : "#4A5A56" }}>
                  {regel.n}
                </td>
                <td className="py-2 pl-3 align-top" style={{ color: "#4A5A56" }}>
                  {regel.herkomst}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Vergeleken wordt op post en op huishoudsamenstelling, niet op regio of woningtype. De maatstaf zijn
        mijn eigen {RAPPORTEN.length} huishoudens, allemaal met een bovenmodaal inkomen.
      </p>

      <h2 className="font-display" style={h2}>
        Worden de vaste lasten in 2027 hoger?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Wonen, water en energie droegen in augustus 2026 het meest bij aan de inflatie van 3,3 procent
        (CBS, 8 september 2026). Voor 2027 verwacht het ministerie van VWS dat de zorgpremie met{" "}
        {"€" + ZORG_2027.premieStijgingPerMaand.toLocaleString("nl-NL", { minimumFractionDigits: 2 })} per
        maand stijgt, naar gemiddeld{" "}
        {euro(ZORG_2027.premiePerMaand2027)} per volwassene, en gaat het eigen risico van{" "}
        {euro(ZORG_2027.eigenRisico2026)} naar {euro(ZORG_2027.eigenRisico2027)} (Rijksoverheid, 15
        september 2026). Dat is een raming: de verzekeraars maken hun premies uiterlijk 12 november
        bekend.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat de rest van 2027 met je netto inkomen doet, staat per huishouden uitgerekend in{" "}
        <Link href="/inzichten/wat-verandert-er-2027-gezinnen-goed-inkomen" style={link} className="hover:underline">
          wat er in 2027 verandert voor gezinnen met een goed inkomen
        </Link>
        .
      </p>
    </>
  );
}
