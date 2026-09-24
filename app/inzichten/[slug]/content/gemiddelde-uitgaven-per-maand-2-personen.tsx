import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import {
  berekenVuistregel,
  omslagpunt,
  euro,
  afgerondOpHonderd,
  VUISTREGEL,
  VERVOER,
  VUISTREGEL_HERKOMST,
} from "@/lib/salaris-vuistregel";
import {
  EQUIVALENTIEFACTOR,
  factorTekst,
  INKOMEN_PEILJAAR,
  grensPerMaandBinnenTypeRond,
} from "@/lib/inkomensverdeling-cbs";

/**
 * H2, de hub voor het stel zonder kinderen (24-sep-2026).
 *
 * Hoofdterm "gemiddelde uitgaven per maand 2 personen", geverifieerd op
 * google.nl op 23-sep-2026 (docs/serp-gemiste-onderwerpen-23-sep-2026.md #3):
 * hoog in de autocomplete, AI-overzicht aanwezig, geen eigen cijfer in de top 7.
 *
 * Intentiescheiding in één zin: H1 (`wat-geeft-een-gezin-uit-per-maand`) is
 * het huishouden met kinderen, de alleenstaande-pagina's zijn één persoon,
 * samen-6000 is één bedrag met één verhaal, de pijler top-10-procent gaat over
 * inkomen en niet over uitgaven; deze hub is de hele begroting van twee
 * volwassenen zonder kinderen, per post, op elk inkomen.
 *
 * Elk bedrag komt uit berekenVuistregel(), rapportVoorSlug() of
 * lib/inkomensverdeling-cbs.ts. Geen getal is met de hand getypt, behalve de
 * CBS-inflatiecijfers in de tekst, die met bron en datum in de zin staan.
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

/** Het representatieve huishouden van deze hub: twee volwassenen, geen kinderen, één auto. */
const VOLW = 2 as const;
const KIND = 0;
const AUTO = "eigen" as const;

/** De bandbreedte uit CLAUDE.md 8.7: alleen 3.500 tot 6.500 netto. */
const ONDER = 3500;
const BOVEN = 6500;
const KOLOMMEN = [3500, 4500, 5500, 6500];

const spaken: { slug: string; tekst: string }[] = [
  { slug: "top-10-procent-inkomen-nederland", tekst: "Waar sta je met je inkomen? De grenzen per huishouden" },
  { slug: "is-4000-euro-netto-goed-salaris-nederland", tekst: "Is €4.000 netto een goed salaris?" },
  { slug: "is-5000-euro-netto-goed-salaris", tekst: "Is €5.000 netto een goed salaris?" },
  { slug: "wat-zijn-normale-vaste-lasten-gezin", tekst: "Gemiddelde vaste lasten per huishouden" },
  { slug: "hoeveel-geld-overhouden-einde-maand", tekst: "Hoeveel geld moet je overhouden per maand?" },
  { slug: "lifestyle-inflatie-meer-verdienen-meer-uitgeven", tekst: "Meer verdienen, meer uitgeven: lifestyle-inflatie" },
  { slug: "goed-inkomen-weinig-vermogen", tekst: "Goed inkomen, weinig vermogen" },
  { slug: "hoeveel-sparen-per-maand-normaal-nederland", tekst: "Hoeveel sparen per maand is normaal?" },
  { slug: "kosten-verdelen-samenwonen-ongelijk-inkomen", tekst: "Kosten verdelen bij samenwonen met een ongelijk inkomen" },
  { slug: "gezamenlijke-rekening-voor-en-nadelen", tekst: "Een gezamenlijke rekening: voor- en nadelen" },
  { slug: "praten-over-geld-met-je-partner", tekst: "Praten over geld met je partner" },
  { slug: "partner-geeft-te-veel-uit", tekst: "Je partner geeft te veel uit" },
  { slug: "financiele-ontrouw-partner-verzwijgt-geld", tekst: "Financiële ontrouw: als je partner geld verzwijgt" },
  { slug: "twee-autos-wat-kost-de-tweede-echt", tekst: "Wat kost de tweede auto echt?" },
];

interface Kolom {
  inkomen: number;
  v: ReturnType<typeof berekenVuistregel>;
}

/**
 * Eén tabelkolom, met `inkomen: inkomen` voluit. Zie kolomVoor() in de H1-hub
 * voor de reden: de minifier van Next 14.2 breekt verkorte objectnotatie.
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

export default function GemiddeldeUitgavenPerMaand2Personen() {
  const laag = berekenVuistregel({ inkomen: ONDER, volwassenen: VOLW, kinderen: KIND, auto: AUTO });
  const hoog = berekenVuistregel({ inkomen: BOVEN, volwassenen: VOLW, kinderen: KIND, auto: AUTO });
  const rijen = KOLOMMEN.map(kolomVoor);
  const omslag = omslagpunt(VOLW, KIND, AUTO);
  const omslagZonderAuto = omslagpunt(VOLW, KIND, "geen");

  const somLaag = ONDER - laag.verwachtOver;
  const somHoog = BOVEN - hoog.verwachtOver;
  const deltaSom = somHoog - somLaag;
  const deltaWonen = hoog.wonen - laag.wonen;
  const deltaVrijetijd = hoog.vrijetijd - laag.vrijetijd;
  const autoVerschil = VERVOER.eigen - VERVOER.geen;

  const middenCbs = grensPerMaandBinnenTypeRond("paarZonderKinderenOnderAow", 0.5);

  const stel = rapportVoorSlug("stel-zonder-kinderen")!;
  const kenmerken = stel.kenmerken.join(", ");
  const vrijetijdPost = stel.dagelijks.find((post) => post.label === "Vrije tijd");
  const jaarPost = stel.dagelijks.find((post) => post.label === "Jaarlijkse kosten");
  const spaarPost = stel.dagelijks.find((post) => post.label === "Spaardoel");

  const posten: { label: string; waarde: (r: Kolom) => number }[] = [
    { label: "Wonen, energie en lokale lasten", waarde: (r) => r.v.wonen },
    { label: "Boodschappen", waarde: (r) => r.v.boodschappen },
    { label: "Vervoer, één auto", waarde: (r) => r.v.vervoer },
    { label: "Verzekeringen", waarde: (r) => r.v.verzekeringen },
    { label: "Abonnementen", waarde: (r) => r.v.abonnementen },
    { label: "Vrije tijd", waarde: (r) => r.v.vrijetijd },
  ];

  /** De herkomstregels zonder de posten voor kinderen: die horen niet bij deze hub. */
  const herkomst = VUISTREGEL_HERKOMST.filter((regel) => !regel.post.toLowerCase().includes("kind"));

  return (
    <>
      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Twee volwassenen zonder kinderen, met één auto, geven per maand ongeveer{" "}
        {euro(afgerondOpHonderd(somLaag))} uit bij {euro(ONDER)} netto en{" "}
        {euro(afgerondOpHonderd(somHoog))} bij {euro(BOVEN)} netto. Het verschil van {euro(deltaSom)}{" "}
        zit bijna helemaal in wonen en vrije tijd; de rest van de begroting beweegt niet mee met het
        inkomen. Onder ongeveer {euro(omslag)} netto komt deze begroting niet rond.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 24 september 2026. Dit is geen landelijk gemiddelde: de bedragen komen
        uit de {RAPPORTEN.length} huishoudens die ik zelf heb doorgerekend en die compleet op{" "}
        <Link href="/rapporten" style={link} className="hover:underline">
          /rapporten
        </Link>{" "}
        staan. Ter vergelijking met heel Nederland: de helft van de stellen zonder kinderen onder de
        AOW-leeftijd had in {INKOMEN_PEILJAAR} meer dan {middenCbs === null ? "onbekend" : euro(middenCbs)}{" "}
        per maand te besteden (CBS). Waar jullie inkomen staat, zie je op{" "}
        <Link href="/inzichten/top-10-procent-inkomen-nederland" style={link} className="hover:underline">
          waar sta je met je inkomen
        </Link>
        .
      </p>

      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Wat twee personen per post uitgeven, van €3.500 tot €6.500 netto",
            "Welke posten met z'n tweeën duurder worden dan alleen, en welke niet",
            "Waarom een stel zonder lek toch niets kan overhouden",
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
        Wat geven 2 personen uit per maand, per post?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hieronder de hele begroting van hetzelfde huishouden op vier inkomens: twee volwassenen, geen
        kinderen en één eigen auto. Niet wat het zou moeten zijn, maar wat ik bij zo&apos;n huishouden
        verwacht op grond van de huishoudens die ik heb doorgerekend.
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
                  {r.v.verwachtOver < 0 ? "-" + euro(Math.abs(r.v.verwachtOver)) : euro(r.v.verwachtOver)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Wat hieraan opvalt: van de {euro(deltaSom)} verschil tussen {euro(ONDER)} en {euro(BOVEN)} gaat{" "}
        {euro(deltaWonen)} naar wonen en {euro(deltaVrijetijd)} naar vrije tijd. Boodschappen,
        verzekeringen, abonnementen en de auto zijn bij {euro(BOVEN)} netto even hoog als bij{" "}
        {euro(ONDER)}. Zonder auto scheelt het ongeveer {euro(autoVerschil)} per maand, en komt de
        begroting al vanaf ongeveer {euro(omslagZonderAuto)} netto rond.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat er niet in staat: reizen en andere jaarlijkse uitgaven. Die verschillen per stel zo sterk
        dat een vuistregel er niets zinnigs over zegt, en ze staan in geen enkele maandbegroting.
        Verderop een stel bij wie dat precies het verhaal was.
      </p>

      {/* Interactief element, CLAUDE.md 8.9. Eigen startwaarden voor deze hub. */}
      <SalarisRekenaar
        startInkomen={5000}
        startVolwassenen={2}
        startKinderen={0}
        startAuto="eigen"
        kop={"Zet jullie eigen situatie erin: auto, eventuele kinderen en wat er netto binnenkomt."}
        intro={
          "De tabel hierboven staat op één huishouden. Hieronder verandert de hele begroting mee met jullie situatie, en zie je per post wat ik zou verwachten."
        }
      />

      <h2 className="font-display" style={h2}>
        Wat kost samenwonen per maand, vergeleken met alleen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Twee mensen geven meer uit dan één, maar geen twee keer zoveel. Het CBS rekent daarom met een
        factor: een stel heeft {factorTekst(EQUIVALENTIEFACTOR[2][0])} keer het inkomen van een
        alleenstaande nodig om even ruim te leven. In de vuistregel zie je waar dat schaalvoordeel
        zit.
      </p>
      <ul className="mb-6 space-y-2 font-body text-text-soft" style={{ fontWeight: 300 }}>
        <li>
          Boodschappen: {euro(VUISTREGEL.boodschappenBasisEen)} alleen, {euro(VUISTREGEL.boodschappenBasisTwee)}{" "}
          samen.
        </li>
        <li>
          Zorgverzekering: {euro(VUISTREGEL.zorgPerVolwassene)} per volwassene, dus die verdubbelt wel.
        </li>
        <li>
          Energie ({euro(VUISTREGEL.energie)}), internet ({euro(VUISTREGEL.internet)}), gemeentelijke
          lasten ({euro(VUISTREGEL.lokaleLasten)}) en abonnementen ({euro(VUISTREGEL.abonnementen)}): even
          hoog voor één als voor twee.
        </li>
        <li>
          De woonlast: {Math.round(VUISTREGEL.woonlastPctEen * 100)} procent van het netto inkomen bij
          één volwassene, {Math.round(VUISTREGEL.woonlastPctTwee * 100)} procent bij twee. Het huis wordt
          niet twee keer zo duur als er iemand bij komt wonen.
        </li>
      </ul>
      <p className="font-body text-text-soft" style={p}>
        Wat één persoon per post uitgeeft, staat op{" "}
        <Link href="/inzichten/kosten-levensonderhoud-alleenstaande-2026" style={link} className="hover:underline">
          de kosten van levensonderhoud voor een alleenstaande
        </Link>
        . Met kinderen erbij is{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={link} className="hover:underline">
          wat een gezin uitgeeft per maand
        </Link>{" "}
        de pagina voor jullie.
      </p>

      <h2 className="font-display" style={h2}>
        Waar deze bedragen vandaan komen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Per post het bedrag, hoeveel van de {RAPPORTEN.length} huishoudens eronder liggen, en wat zij
        aanleverden. Bij een n van 1 of 2 is het een richting en geen norm.
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
        Vergeleken wordt op post en op huishoudsamenstelling, niet op leeftijd, regio of woningtype. De
        maatstaf zijn mijn eigen {RAPPORTEN.length} huishoudens, allemaal met een bovenmodaal inkomen.
      </p>

      <h2 className="font-display" style={h2}>
        Een stel zonder kinderen dat ik helemaal heb doorgerekend
      </h2>
      <p className="font-body text-text-soft" style={p}>
        {kenmerken}. Ruim boven de tabel hierboven, en toch groeide de spaarrekening niet zoals ze
        wilden. Vooraf dachten zij dit: &ldquo;{stel.vermoeden}&rdquo; {stel.vermoedenBedrag}
      </p>
      <p className="font-body text-text-soft" style={p}>
        Mijn conclusie was: {stel.uitkomstKop.toLowerCase()}. {stel.uitkomst}
        {vrijetijdPost ? " Hun vrije tijd: " + vrijetijdPost.waarde + "." : ""}
        {jaarPost ? " Hun jaarlijkse kosten: " + jaarPost.waarde + "." : ""}
        {spaarPost ? " Hun spaardoel: " + spaarPost.waarde + "." : ""}
      </p>
      <p className="font-body text-text-soft" style={p}>
        {stel.doorlooptijd.charAt(0).toUpperCase() + stel.doorlooptijd.slice(1)} schreven ze: &ldquo;{stel.evaluatie}&rdquo; Het hele rapport, met alle
        bedragen en het plan dat ik erop schreef, staat op{" "}
        <Link href={`/rapporten/${stel.slug}`} style={link} className="hover:underline">
          hun rapportpagina
        </Link>
        . Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} huishoudens die ik doorrekende was de
        conclusie dat er niets te repareren viel, en dit stel was er één van.
      </p>

      <h2 className="font-display" style={h2}>
        Wat werd er dit jaar duurder?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        In augustus 2026 was het leven 3,3 procent duurder dan een jaar eerder (CBS, 8 september
        2026). Wonen, water en energie droegen daar het meest aan bij. Voor stellen die veel reizen telt
        vooral een andere regel: wat Nederlanders in het buitenland betalen, voor overnachtingen,
        restaurants en boodschappen over de grens, was 7,4 procent duurder dan een jaar eerder.
        Voedingsmiddelen waren in Nederland juist iets goedkoper: min 0,5 procent volgens de Europese
        meting.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wie denkt dat het aan de supermarkt ligt, kijkt dus naar de post die stilstaat. In de tabel
        hierboven bewegen bij een hoger inkomen alleen de woning en de vrije tijd mee; wat buiten de
        vaste maand valt, zoals reizen, komt daar nog bovenop.
      </p>

      <h2 className="font-display" style={h2}>
        Alles over het budget van een stel zonder kinderen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Per onderwerp, doorgerekend op dezelfde vuistregel of op dezelfde bronnen als deze pagina.
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
    </>
  );
}
