import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";
import CtaLink from "@/components/CtaLink";
import { geldscanHref } from "@/lib/cta";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import {
  berekenVuistregel,
  omslagpunt,
  euro,
  afgerondOpHonderd,
  VUISTREGEL_HERKOMST,
} from "@/lib/salaris-vuistregel";

/**
 * H1, de hub voor tweeverdieners met kinderen.
 *
 * Zoekterm en onderbouwing: docs/serp-hubs-06-sep-2026.md. De hub gaat op
 * "wat geeft een gezin uit per maand" en NIET op "gezinsbudget 6000 netto",
 * want die term is van de pijler `samen-6000-euro-netto-toch-niets-over`
 * (positie 4,43, CTR 7,34 procent). De intentiescheiding is: boodschappen-
 * artikel = één post, pijler = één bedrag en één verhaal, hub = het hele
 * huishouden per post op elk inkomen.
 *
 * Wat op geen van de vijf geverifieerde SERP's stond: een begroting per post
 * die je op je eigen inkomen kunt zetten, met per bedrag de herkomst en n
 * erbij. Dat is de hoek. Elk bedrag hieronder komt uit berekenVuistregel() of
 * uit rapportVoorSlug(), geen enkel getal is met de hand getypt.
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

/** Het representatieve huishouden van deze hub: twee inkomens, twee kinderen, één auto. */
const VOLW = 2 as const;
const KIND = 2;
const AUTO = "eigen" as const;

/** De bandbreedte uit CLAUDE.md 8.7: alleen 3.500 tot 6.500 netto. */
const ONDER = 3500;
const BOVEN = 6500;
const KOLOMMEN = [4000, 5000, 6000, 6500];

const spaken: { slug: string; tekst: string }[] = [
  { slug: "samen-6000-euro-netto-toch-niets-over", tekst: "Samen €6.000 netto en toch niets over" },
  { slug: "tweeverdieners-toch-krap", tekst: "Twee inkomens en toch krap" },
  { slug: "wat-is-normaal-bedrag-boodschappen-per-maand", tekst: "Wat is een normaal bedrag aan boodschappen per maand?" },
  { slug: "wat-kost-een-kind-per-maand", tekst: "Wat kost een kind per maand?" },
  { slug: "wat-zijn-normale-vaste-lasten-gezin", tekst: "Wat zijn normale vaste lasten voor een gezin?" },
  { slug: "schoolkosten-per-jaar-gezin", tekst: "Schoolkosten per jaar" },
  { slug: "bso-kosten-tweede-inkomen-zo-draaiden-we-het-om", tekst: "Wat de bso met het tweede inkomen doet" },
  { slug: "tweede-inkomen-loont-niet-tweeverdieners", tekst: "Waarom het tweede inkomen minder oplevert dan het lijkt" },
  { slug: "twee-autos-wat-kost-de-tweede-echt", tekst: "Wat kost de tweede auto echt?" },
  { slug: "rentevaste-periode-loopt-af-wat-nu", tekst: "Je rentevaste periode loopt af: wat het per maand doet" },
  { slug: "wat-kost-een-zomervakantie-gezin", tekst: "Wat kost een zomervakantie met een gezin?" },
  { slug: "wat-kost-december-feestdagen-gezin", tekst: "Wat kost december?" },
  { slug: "seizoens-kostenkalender-per-maand", tekst: "De kostenkalender: welke maand welke rekening brengt" },
  { slug: "potjesmethode-gezin-hoe-werkt-het", tekst: "De potjesmethode voor een gezin" },
  { slug: "kindgebonden-budget-2027-inkomensgrens", tekst: "Kindgebonden budget 2027: vanaf welk inkomen daalt het?" },
  { slug: "is-4000-euro-netto-goed-salaris-nederland", tekst: "Is €4.000 netto een goed salaris?" },
  { slug: "is-3000-netto-genoeg-gezin", tekst: "Is €3.000 netto genoeg voor een gezin?" },
];

interface Kolom {
  inkomen: number;
  v: ReturnType<typeof berekenVuistregel>;
}

/**
 * Eén tabelkolom. Bewust een losse functie op moduleniveau met een expliciete
 * parameter, en met `inkomen: inkomen` voluit geschreven.
 *
 * Reden (17-aug-2026): de minifier van Next 14.2 vouwt hulpfuncties in en
 * hernoemt daarbij niet alle verwijzingen naar een parameter die met verkorte
 * objectnotatie is doorgegeven. Dat brak de productiebuild van het
 * 4.000-euro-artikel met `ReferenceError: inkomen is not defined`, terwijl tsc
 * en de dev-server niets zagen. Zie ook `overVoor()` in SalarisBedragenTabel.
 */
function kolomVoor(inkomen: number): Kolom {
  return {
    inkomen: inkomen,
    v: berekenVuistregel({
      inkomen: inkomen,
      volwassenen: VOLW,
      kinderen: KIND,
      auto: AUTO,
    }),
  };
}

export default function WatGeeftEenGezinUitPerMaand() {
  const laag = berekenVuistregel({ inkomen: ONDER, volwassenen: VOLW, kinderen: KIND, auto: AUTO });
  const hoog = berekenVuistregel({ inkomen: BOVEN, volwassenen: VOLW, kinderen: KIND, auto: AUTO });
  const rijen = KOLOMMEN.map(kolomVoor);
  const omslag = omslagpunt(VOLW, KIND, AUTO);

  /** Het verschil tussen de onderkant en de bovenkant, uitgesplitst. */
  const deltaWonen = hoog.wonen - laag.wonen;
  const deltaVrijetijd = hoog.vrijetijd - laag.vrijetijd;
  const somLaag = ONDER - laag.verwachtOver;
  const somHoog = BOVEN - hoog.verwachtOver;
  const deltaSom = somHoog - somLaag;
  const deltaRest = deltaSom - deltaWonen - deltaVrijetijd;

  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const boodschappenPost = gezin.dagelijks.find((post) => post.label === "Boodschappen");
  const jaarPost = gezin.dagelijks.find((post) => post.label === "Jaarlijkse kosten");
  /** Hun eigen kenmerkenregel, inclusief het bedrag dat zij zelf opgaven. */
  const kenmerken = gezin.kenmerken.join(", ");

  const posten: { label: string; waarde: (r: Kolom) => number }[] = [
    { label: "Wonen, energie en lokale lasten", waarde: (r) => r.v.wonen },
    { label: "Boodschappen", waarde: (r) => r.v.boodschappen },
    { label: "Vervoer, één auto", waarde: (r) => r.v.vervoer },
    { label: "Verzekeringen", waarde: (r) => r.v.verzekeringen },
    { label: "Abonnementen", waarde: (r) => r.v.abonnementen },
    { label: "Opvang, school en sport", waarde: (r) => r.v.kinderkosten },
    { label: "Vrije tijd", waarde: (r) => r.v.vrijetijd },
  ];

  return (
    <>
      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Een gezin met twee inkomens, twee kinderen en één auto geeft per maand ongeveer{" "}
        {euro(afgerondOpHonderd(somLaag))} uit bij {euro(ONDER)} netto en{" "}
        {euro(afgerondOpHonderd(somHoog))} bij {euro(BOVEN)} netto. Dat verschil van{" "}
        {euro(deltaSom)} zit vrijwel helemaal in wonen en vrije tijd, want de rest van de begroting
        beweegt niet met je inkomen mee. Onder ongeveer {euro(omslag)} netto komt deze begroting
        niet rond.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 6 september 2026. De bedragen komen uit de {RAPPORTEN.length}{" "}
        huishoudens die ik zelf heb doorgerekend en die compleet op{" "}
        <Link href="/rapporten" style={link} className="hover:underline">
          /rapporten
        </Link>{" "}
        staan, niet uit een landelijke steekproef. Bij elk bedrag staat verderop hoeveel van die
        vijf eronder liggen.
      </p>

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
            "Wat een gezin met twee inkomens per post uitgeeft, van €3.500 tot €6.500 netto",
            "Welke posten met je inkomen meebewegen en welke niet",
            "Waar elk bedrag vandaan komt, met het aantal huishoudens erbij",
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
        Wat geeft een gezin uit per maand, per post?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hieronder de hele begroting van hetzelfde huishouden op vier inkomens: twee volwassenen,
        twee kinderen thuis en één eigen auto. Niet wat het zou moeten zijn, maar wat ik bij zo&apos;n
        huishouden verwacht op grond van de vijf die ik heb doorgerekend.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Post
              </th>
              {rijen.map((r) => (
                <th
                  key={r.inkomen}
                  className="text-right py-2 px-3"
                  style={{ color: "#16211F", fontWeight: 600, whiteSpace: "nowrap" }}
                >
                  {euro(r.inkomen)}
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
                  <td
                    key={r.inkomen}
                    className="text-right py-2 px-3 tabular-nums"
                    style={{ color: "#4A5A56", whiteSpace: "nowrap" }}
                  >
                    {euro(post.waarde(r))}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <td className="py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Totaal uitgaven
              </td>
              {rijen.map((r) => (
                <td
                  key={r.inkomen}
                  className="text-right py-2 px-3 tabular-nums"
                  style={{ color: "#16211F", fontWeight: 600, whiteSpace: "nowrap" }}
                >
                  {euro(r.inkomen - r.v.verwachtOver)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Wat er dan overblijft
              </td>
              {rijen.map((r) => (
                <td
                  key={r.inkomen}
                  className="text-right py-2 px-3 tabular-nums"
                  style={{
                    color: r.v.verwachtOver < 0 ? "#B03A2E" : "#16211F",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.v.verwachtOver < 0
                    ? "-" + euro(Math.abs(r.v.verwachtOver))
                    : euro(r.v.verwachtOver)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Wat hieraan opvalt: van de {euro(deltaSom)} verschil tussen {euro(ONDER)} en {euro(BOVEN)}{" "}
        gaat {euro(deltaWonen)} naar wonen en {euro(deltaVrijetijd)} naar vrije tijd. De andere{" "}
        {deltaRest === 0 ? "posten bewegen niet" : "posten bewegen samen " + euro(Math.abs(deltaRest))}.
        Boodschappen, verzekeringen, abonnementen, de auto en de kosten van de kinderen zijn bij{" "}
        {euro(BOVEN)} netto precies even hoog als bij {euro(ONDER)}. Dat is de reden dat meer
        verdienen zo weinig verschil maakt in wat er overblijft: de winst gaat naar de woning, en
        die keuze is meestal al gemaakt.
      </p>

      {/* Interactief element, CLAUDE.md 8.9. Eigen startwaarden voor deze hub. */}
      <SalarisRekenaar
        startInkomen={5500}
        startVolwassenen={2}
        startKinderen={2}
        startAuto="eigen"
        kop={
          "Zet je eigen huishouden erin: aantal kinderen, auto en wat er netto binnenkomt."
        }
        intro={
          "De tabel hierboven staat op één huishouden. Hieronder verandert de hele begroting mee met jouw situatie, en zie je per post wat ik zou verwachten."
        }
      />

      <h2 className="font-display" style={h2}>
        Waar deze bedragen vandaan komen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is het deel dat je bij een gemiddelde nooit te zien krijgt. Per post staat hieronder het
        bedrag, hoeveel van de vijf huishoudens eronder liggen, en wat die vijf aanleverden. Bij een
        n van 1 of 2 is het een richting en geen norm, en dat schrijf ik er liever bij dan dat ik het
        weglaat.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Post
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Bedrag
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                n
              </th>
              <th className="text-left py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Wat de vijf aanleverden
              </th>
            </tr>
          </thead>
          <tbody>
            {VUISTREGEL_HERKOMST.map((regel) => (
              <tr key={regel.post} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3 align-top" style={{ color: "#16211F" }}>
                  {regel.post}
                </td>
                <td
                  className="text-right py-2 px-3 align-top tabular-nums"
                  style={{ color: "#4A5A56", whiteSpace: "nowrap" }}
                >
                  {regel.bedrag}
                </td>
                <td
                  className="text-right py-2 px-3 align-top tabular-nums"
                  style={{ color: regel.n <= 2 ? "#92600A" : "#4A5A56" }}
                >
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
        Vergeleken wordt op post en op huishoudsamenstelling, niet op leeftijd, regio of woningtype.
        De maatstaf zijn mijn eigen {RAPPORTEN.length} huishoudens, allemaal met een bovenmodaal
        inkomen. Voor een landelijk gemiddelde ben je bij het CBS beter af; wat je daar niet vindt is
        wat er dan bij zo&apos;n huishouden werkelijk op de rekening staat.
      </p>

      <h2 className="font-display" style={h2}>
        E&eacute;n gezin dat ik helemaal heb doorgerekend
      </h2>
      <p className="font-body text-text-soft" style={p}>
        {kenmerken}. Dat is een huishouden dat ruim boven de tabel hierboven zit, en toch groeide de
        spaarrekening niet. Vooraf dachten zij dit: &ldquo;{gezin.vermoeden}&rdquo;{" "}
        {gezin.vermoedenBedrag}
      </p>
      <p className="font-body text-text-soft" style={p}>
        Mijn conclusie was: {gezin.uitkomstKop.toLowerCase()}. {gezin.uitkomst}
        {boodschappenPost ? " Hun boodschappen: " + boodschappenPost.waarde + "." : ""}
        {jaarPost ? " Hun jaarlijkse kosten: " + jaarPost.waarde + "." : ""}
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat dit huishouden laat zien is precies wat de tabel hierboven suggereert: de post waar
        iedereen als eerste naar wijst is zelden de post die het verschil maakt. Het hele rapport,
        met alle bedragen en het advies dat ik erop schreef, staat op{" "}
        <Link href={`/rapporten/${gezin.slug}`} style={link} className="hover:underline">
          hun rapport
        </Link>
        , onder {gezin.situatie.toLowerCase()}. Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length}{" "}
        huishoudens was de conclusie trouwens dat er niets te repareren viel.
      </p>

      <h2 className="font-display" style={h2}>
        Wat er dit jaar duurder werd, en wat niet
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Bijna iedereen die ik spreek wijst als eerste naar de boodschappen. De cijfers wijzen ergens
        anders heen. In augustus 2026 lagen de prijzen van voedingsmiddelen, dranken en tabak 0,5
        procent l&aacute;ger dan een jaar eerder, terwijl energie inclusief motorbrandstoffen 11,7 procent
        duurder was en diensten 3,7 procent (CBS, snelle raming, 1 september 2026). De inflatie als
        geheel stond op 3,3 procent.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daar komt bij dat het inkomen die stijging maar net bijhoudt. Het CPB raamt de mediane
        koopkracht op plus 0,6 procent in 2026 en min 0,3 procent in 2027, bij een inflatie van rond
        de 3 procent (CPB, concept-Macro Economische Verkenning 2027, augustus 2026). Bruto modaal
        staat in diezelfde raming op {euro(48000)} voor 2026 en {euro(50000)} voor 2027.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voor een gezin met twee inkomens betekent dat: de post waarop je het meest let staat stil, de
        post waar je het minst aan kunt doen loopt hard op, en het inkomen blijft er ongeveer gelijk
        aan. Wie in januari denkt dat het aan de supermarkt ligt, kijkt naar de verkeerde regel.
      </p>

      <h2 className="font-display" style={h2}>
        Alles over het gezinsbudget bij twee inkomens
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Per post en per moment, allemaal doorgerekend op dezelfde vuistregel als de tabel hierboven.
      </p>
      <ul className="mb-6 space-y-2">
        {spaken.map((s) => (
          <li key={s.slug} className="font-body text-sm">
            <Link href={`/inzichten/${s.slug}`} style={link} className="hover:underline">
              {s.tekst}
            </Link>
          </li>
        ))}
      </ul>

      {/* Slotblok: Geldscan als tekstlink, CLAUDE.md 8.13 */}
      <p className="font-body text-text-soft" style={p}>
        Wijkt jullie eigen begroting op meerdere posten af en weet je niet welke afwijking de
        oorzaak is en welke het gevolg, dan houdt een vuistregel op. Daarvoor moet iemand naar jullie
        hele maand kijken. Dat is wat ik doe in de{" "}
        <CtaLink doel="geldscan" href={geldscanHref()} locatie="slot" style={link} className="hover:underline">
          Geldscan van &euro;49
        </CtaLink>
        , met de hand, binnen twee werkdagen.
      </p>
    </>
  );
}
