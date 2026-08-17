import Link from "next/link";
import { RAPPORTEN } from "@/lib/rapporten-data";
import {
  berekenVuistregel,
  euroSigned,
  euro,
  geldscanSituatie,
} from "@/lib/salaris-vuistregel";

/**
 * Statische bedragentabel onder de rekenaar op het salarisartikel.
 *
 * Reden (17-aug-2026, `docs/serp-inkomensbedragen-17-aug-2026.md`): dit artikel
 * staat organisch op plek 1 voor "is 4000 netto goed salaris" en rankt ook op
 * "is 4500", "is 4200" en "is 4100", telkens met de melding van Google zelf dat
 * de pagina dat getal niet bevat. Acht losse artikelen per honderdtal zouden de
 * plek-1-pagina kannibaliseren, dus de bedragen komen hierbinnen te staan.
 *
 * Bewust een server component zonder "use client": de rekenaar erboven rendert
 * alleen zijn startstand in de HTML, dus de andere bedragen zouden voor een
 * crawler onzichtbaar blijven. Deze tabel staat volledig in de broncode.
 *
 * Alle bedragen komen uit `lib/salaris-vuistregel.ts`, dezelfde functie die de
 * rekenaar gebruikt, ook de bedragen in de lopende tekst. Nooit met de hand een
 * bedrag hier neerzetten: de eerste versie van 17-aug had drie beweringen die de
 * tabel op hetzelfde scherm tegensprak, en de tweede versie had vijftien
 * handgetypte bedragen die allemaal net iets te laag afgerond waren. Beide
 * gevonden door een toetsronde, geen van beide door mijzelf.
 */

const BEDRAGEN = [3500, 3750, 4000, 4100, 4200, 4300, 4500, 4600];

const HUISHOUDENS = [
  { kop: "Alleen", volwassenen: 1 as const, kinderen: 0, kort: "alleen" },
  { kop: "Samen, geen kinderen", volwassenen: 2 as const, kinderen: 0, kort: "samen" },
  { kop: "Eén ouder, 2 kinderen", volwassenen: 1 as const, kinderen: 2, kort: "één ouder" },
  { kop: "Gezin, 2 kinderen", volwassenen: 2 as const, kinderen: 2, kort: "gezin" },
];

/** Referentiebedrag voor de openklapbare uitsplitsing onder de tabel. */
const REFERENTIE = 4200;

/**
 * De variantbedragen die een eigen H3 krijgen. €4.000 staat er bewust niet bij,
 * want dat bedrag heeft de H1 en de titel al. Deze zeven zijn de bedragen die
 * Google zelf aandroeg in "Mensen zoeken ook naar" en in het PAA-blok, plus
 * €4.300 omdat dat wel in de tabel staat.
 *
 * De zinnen krijgen hun bedragen uit dezelfde functie als de tabel. Zo kan een
 * wijziging in de vuistregel de tekst nooit laten liegen over de tabel die er
 * tien centimeter boven staat.
 */
const VARIANTEN = [3500, 3750, 4100, 4200, 4300, 4500, 4600];

/**
 * Bewust een losse functie met drie expliciete parameters, en bewust geen
 * binnenste arrow die `inkomen` uit een buitenste scope leent via de verkorte
 * objectnotatie.
 *
 * Reden (17-aug-2026, productiebuild op Vercel gefaald met "ReferenceError:
 * inkomen is not defined"): de minifier van Next 14.2 vouwde de oude
 * hulpfunctie in en hernoemde daarbij alleen de eerste van de vier
 * verwijzingen naar de parameter. De andere drie bleven als kale `inkomen`
 * staan, en die bestond daar niet meer. `tsc` ziet dit niet en de dev-server
 * ook niet, want die minificeert niet. Alleen een productiebuild vangt het.
 * Houd deze vorm dus zo.
 */
function overVoor(inkomen: number, volwassenen: 1 | 2, kinderen: number): number {
  return berekenVuistregel({
    inkomen: inkomen,
    volwassenen: volwassenen,
    kinderen: kinderen,
    auto: "eigen",
  }).verwachtOver;
}

function voorBedrag(inkomen: number) {
  return {
    alleen: overVoor(inkomen, 1, 0),
    samen: overVoor(inkomen, 2, 0),
    ouder: overVoor(inkomen, 1, 2),
    gezin: overVoor(inkomen, 2, 2),
  };
}

/**
 * Het eerste bedrag waarop dit huishouden niet meer in de min staat, afgerond op
 * tientallen. Afgerond omdat "rond €4.081" een precisie suggereert die een
 * vuistregel op vijf huishoudens niet heeft, en berekend omdat een handgetypte
 * €4.080 gaat liegen zodra iemand een constante wijzigt.
 */
function omslagpunt(volwassenen: 1 | 2, kinderen: number): number {
  for (let i = 2000; i <= 12000; i += 1) {
    if (overVoor(i, volwassenen, kinderen) >= 0) {
      return Math.round(i / 10) * 10;
    }
  }
  return 0;
}

/** Eén keer berekenen op moduleniveau in plaats van per zin. */
const OMSLAG_GEZIN = omslagpunt(2, 2);

function regelVoor(bedrag: number): string {
  const v = voorBedrag(bedrag);
  const omslagGezin = OMSLAG_GEZIN;
  const stapEen = 57;
  const stapTwee = 65;

  switch (bedrag) {
    case 3500:
      return `Ja, het ligt boven modaal. Iemand alleen houdt er volgens mijn vuistregel ${euro(
        v.alleen
      )} per maand van over. Voor een gezin met twee kinderen komt de rekensom op dit bedrag ${euro(
        -v.gezin
      )} per maand tekort, want dat huishouden staat pas vanaf ongeveer ${euro(
        omslagGezin
      )} niet meer in de min.`;
    case 3750:
      return `Ja. Alleen blijft er ${euro(v.alleen)} per maand over, samen zonder kinderen ${euro(
        v.samen
      )}. Met twee kinderen erbij staat de som nog steeds in de min, ${euro(-v.gezin)} per maand.`;
    case 4100:
      return `Ja, en hier kantelt het voor een gezin met twee kinderen: rond ${euro(
        omslagGezin
      )} gaat de som van een tekort naar een klein overschot. Alleen houd je op dit bedrag ${euro(
        v.alleen
      )} over, als gezin met twee kinderen ${euro(v.gezin)}.`;
    case 4200:
      return `Ja. Alleen blijft er ${euro(v.alleen)} per maand over, als gezin met twee kinderen ${euro(
        v.gezin
      )}. Dat verschil van ${euro(
        v.alleen - v.gezin
      )} komt volledig uit het huishouden en niet uit het salaris.`;
    case 4300:
      return `Ja. Alleen ${euro(v.alleen)} per maand over, één ouder met twee kinderen ${euro(
        v.ouder
      )} en een gezin met twee kinderen ${euro(
        v.gezin
      )}. Hetzelfde bedrag, drie antwoorden die niets met elkaar te maken hebben.`;
    case 4500:
      return `Ja. Alleen houd je ${euro(v.alleen)} per maand over, als gezin met twee kinderen ${euro(
        v.gezin
      )}. Hier verschuift de vraag van of je rondkomt naar waarom je er zo weinig van merkt.`;
    default:
      return `Ja. Alleen ${euro(v.alleen)} per maand over, als gezin met twee kinderen ${euro(
        v.gezin
      )}. Elke honderd euro extra netto levert vanaf hier €${stapEen} tot €${stapTwee} extra ruimte op, want een deel groeit automatisch mee in wonen en vrije tijd.`;
  }
}

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const h3 = {
  fontSize: "1.1rem",
  color: "#16211F",
  marginTop: "1.75rem",
  marginBottom: "0.5rem",
  fontWeight: 500,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function SalarisBedragenTabel() {
  // Zelfde valkuil als bij overVoor hierboven: geen verkorte objectnotatie in
  // een geneste map die de parameter van de buitenste map leent.
  const rijen = BEDRAGEN.map((inkomen) => ({
    inkomen: inkomen,
    cellen: HUISHOUDENS.map((h) => overVoor(inkomen, h.volwassenen, h.kinderen)),
  }));

  const uitsplitsing = HUISHOUDENS.map((h) => ({
    kop: h.kop,
    v: berekenVuistregel({
      inkomen: REFERENTIE,
      volwassenen: h.volwassenen,
      kinderen: h.kinderen,
      auto: "eigen",
    }),
  }));

  return (
    <>
      <h2 className="font-display" style={h2} id="per-bedrag">
        Is €3.500 tot €4.600 netto een goed salaris? Het antwoord per bedrag
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Deze vraag komt binnen met tientallen verschillende bedragen erin. Hieronder staat per bedrag wat
        er volgens mijn vuistregel overblijft, uitgesplitst naar het huishouden dat het moet dragen.
        <strong style={{ fontWeight: 500 }}>
          {" "}
          Pak het netto bedrag dat maandelijks bij het hele huishouden binnenkomt
        </strong>
        , dus bij twee inkomens die twee salarissen bij elkaar opgeteld, en niet alleen dat van jou.
      </p>

      <div className="overflow-x-auto -mx-2 px-2 mb-3">
        <table
          className="w-full text-left"
          style={{ minWidth: "560px", borderCollapse: "collapse" }}
        >
          <caption className="sr-only">
            Wat er per maand overblijft bij netto huishoudinkomens van €3.500 tot €4.600, per
            huishouden, volgens de vuistregel van Waar blijft het
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="font-body text-xs py-2 pr-3"
                style={{ color: "#8B958F", fontWeight: 500, borderBottom: "1px solid #E6E9E7" }}
              >
                Netto huishoudinkomen
              </th>
              {HUISHOUDENS.map((h) => (
                <th
                  key={h.kop}
                  scope="col"
                  className="font-body text-xs py-2 px-3 text-right"
                  style={{ color: "#8B958F", fontWeight: 500, borderBottom: "1px solid #E6E9E7" }}
                >
                  {h.kop}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rijen.map(({ inkomen, cellen }) => {
              const eigenBedrag = inkomen === 4000;
              return (
                <tr
                  key={inkomen}
                  style={{ backgroundColor: eigenBedrag ? "#F2F7F5" : "transparent" }}
                >
                  <th
                    scope="row"
                    className="font-body text-sm py-2.5 pr-3 tabular-nums"
                    style={{
                      color: "#16211F",
                      fontWeight: eigenBedrag ? 500 : 400,
                      borderBottom: "1px solid #F0F3F1",
                    }}
                  >
                    {euro(inkomen)}
                  </th>
                  {cellen.map((over, i) => (
                    <td
                      key={HUISHOUDENS[i].kop}
                      className="font-body text-sm py-2.5 px-3 text-right tabular-nums"
                      style={{
                        color: over < 0 ? "#B03A2E" : "#4A5A56",
                        borderBottom: "1px solid #F0F3F1",
                      }}
                    >
                      {euroSigned(over)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Zowel Sandra als Niels vroegen in de ICP-toets van 17-aug om hetzelfde:
          laat zien wat eraf gaat, niet alleen wat er overblijft. Zonder de
          lastenkant kan een lezer die er 700 euro naast zit niet beoordelen of
          dat aan hem ligt of aan de aanname, en trekt hij de eerste conclusie. */}
      <details className="rounded-xl border mb-3" style={{ borderColor: "#E6E9E7" }}>
        <summary
          className="font-body text-sm px-4 py-3 cursor-pointer"
          style={{ color: "#0B7A6E" }}
        >
          Wat er in deze bedragen is afgetrokken, en wat niet
        </summary>
        <div className="px-4 pb-4">
          <p className="font-body text-sm mb-3" style={{ color: "#4A5A56", fontWeight: 300 }}>
            De posten waarmee gerekend is, bij {euro(REFERENTIE)} netto per maand:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left" style={{ minWidth: "480px", borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["Wonen, energie, internet en lokale lasten", (u: (typeof uitsplitsing)[0]) => u.v.wonen],
                  ["Boodschappen", (u: (typeof uitsplitsing)[0]) => u.v.boodschappen],
                  ["Vervoer, één eigen auto", (u: (typeof uitsplitsing)[0]) => u.v.vervoer],
                  ["Verzekeringen", (u: (typeof uitsplitsing)[0]) => u.v.verzekeringen],
                  ["Abonnementen", (u: (typeof uitsplitsing)[0]) => u.v.abonnementen],
                  ["Opvang, school en sport", (u: (typeof uitsplitsing)[0]) => u.v.kinderkosten],
                  ["Vrije tijd", (u: (typeof uitsplitsing)[0]) => u.v.vrijetijd],
                ].map(([label, kies]) => (
                  <tr key={label as string}>
                    <td
                      className="font-body text-xs py-1.5 pr-3"
                      style={{ color: "#8B958F", borderBottom: "1px solid #F0F3F1" }}
                    >
                      {label as string}
                    </td>
                    {uitsplitsing.map((u) => (
                      <td
                        key={u.kop}
                        className="font-body text-xs py-1.5 px-2 text-right tabular-nums"
                        style={{ color: "#4A5A56", borderBottom: "1px solid #F0F3F1" }}
                      >
                        {euro((kies as (u: (typeof uitsplitsing)[0]) => number)(u))}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="font-body text-xs py-1.5 pr-3" style={{ color: "#16211F", fontWeight: 500 }}>
                    Samen
                  </td>
                  {uitsplitsing.map((u) => (
                    <td
                      key={u.kop}
                      className="font-body text-xs py-1.5 px-2 text-right tabular-nums"
                      style={{ color: "#16211F", fontWeight: 500 }}
                    >
                      {euro(REFERENTIE - u.v.verwachtOver)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-body text-xs mt-3 mb-0" style={{ color: "#8B958F", fontWeight: 300 }}>
            Kolommen in dezelfde volgorde als de tabel hierboven. Wat er <em>niet</em> in zit: sparen,
            een buffer, kleding, vakantie, onderhoud, eigen risico, aflossing, studieschuld en
            alimentatie. Een uitkomst van nul betekent dus niet dat je rondkomt, het betekent dat er
            voor die dingen niets klaarligt. De woonlast is een percentage van het inkomen (33 procent
            bij één volwassene, 25 procent bij twee), dus wie een lage huur heeft komt hoger uit dan
            deze tabel en wie duur woont lager.
          </p>
        </div>
      </details>

      <p className="font-body text-xs mb-8" style={{ color: "#8B958F", fontWeight: 300 }}>
        Dit is mijn eigen vuistregel, geen landelijk gemiddelde en geen Nibud-norm. Hij is afgeleid uit
        de {RAPPORTEN.length} huishoudens die ik in juni en juli 2026 heb doorgerekend, en die staan
        alle {RAPPORTEN.length} openbaar op deze site. Sommige posten leunen op één of twee van die{" "}
        {RAPPORTEN.length}. Woonlast en vrije tijd zijn aannames en geen metingen. Gerekend met één
        auto. Dit is algemene informatie over huishoudkosten, geen advies over hypotheek, beleggen of
        verzekeringen. Wil je twee auto&rsquo;s, drie kinderen of een ander bedrag, gebruik dan de
        rekenaar bovenaan.
      </p>

      {VARIANTEN.map((bedrag) => (
        <div key={bedrag}>
          <h3 className="font-display" style={h3}>
            Is {euro(bedrag)} netto een goed salaris?
          </h3>
          <p className="font-body text-text-soft" style={{ marginBottom: "0.75rem", fontWeight: 300 }}>
            {regelVoor(bedrag)}
          </p>
        </div>
      ))}

      <p className="font-body text-text-soft" style={{ ...p, marginTop: "1.75rem" }}>
        Ligt jullie huishoudinkomen boven €4.600, dan houdt deze tabel op. Zet je eigen bedrag in de
        rekenaar bovenaan, of lees{" "}
        <Link
          href="/inzichten/is-5000-euro-netto-goed-salaris"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          is €5.000 netto een goed salaris
        </Link>{" "}
        en{" "}
        <Link
          href="/inzichten/samen-6000-euro-netto-toch-niets-over"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          samen €6.000 netto en toch niets over
        </Link>
        .
      </p>

      <div
        className="rounded-xl border p-5 my-8"
        style={{ backgroundColor: "#E7F1EE", borderColor: "#9CCFC4" }}
      >
        <p className="font-body font-medium mb-2" style={{ color: "#16211F" }}>
          Staat er bij jou minder dan in deze tabel?
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Dan zegt dat nog niets over jou, want deze tabel weet niets van jouw huur, je aflossing of je
          alimentatie. Bij de Geldscan lees ik je eigen cijfers na en schrijf ik op wat er het meest
          opvalt, en wat er juist niet uit de toon valt. Valt er niets te repareren, dan staat dat er
          ook.
        </p>
        <Link
          href="/geldscan"
          className="inline-block rounded-lg px-5 py-2.5 font-body text-sm"
          style={{ backgroundColor: "#0B7A6E", color: "#FFFFFF", textDecoration: "none" }}
        >
          Zie wat je krijgt voor €49
        </Link>
        <p className="font-body text-xs mt-3 mb-0" style={{ color: "#4A5A56" }}>
          Direct naar jouw situatie:{" "}
          {HUISHOUDENS.map((h, i) => (
            <span key={h.kop}>
              {i > 0 ? " · " : ""}
              <Link
                href={`/geldscan?situatie=${geldscanSituatie(h.volwassenen, h.kinderen)}`}
                className="hover:underline"
                style={{ color: "#0B7A6E", textDecoration: "none" }}
              >
                {h.kort}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </>
  );
}
