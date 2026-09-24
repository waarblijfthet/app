import Link from "next/link";
import InkomenspositieKiezer from "@/components/artikel/InkomenspositieKiezer";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import { euro } from "@/lib/salaris-vuistregel";
import { ZORG_2027 } from "@/lib/prinsjesdag-2027";
import {
  NETTO_INCL_VAKANTIEGELD_VOOR_BRUTO,
  NETTO_INCL_VAKANTIEGELD_VOOR_BRUTO_SAMEN,
} from "@/lib/bruto-netto-referentie";
import {
  GRENZEN,
  SAMENSTELLINGEN,
  HUISHOUDTYPE_LABEL,
  INKOMEN_PEILJAAR,
  INKOMEN_GEPUBLICEERD,
  EQUIVALENTIEFACTOR,
  factorTekst,
  grensPerMaandNlRond,
  grensPerMaandBinnenTypeRond,
  aandeelMetMeerNl,
  aandeelMetMeerBinnenType,
  aantalHuishoudensNl,
  aantalHuishoudensBinnenType,
  procent,
  type HuishoudType,
} from "@/lib/inkomensverdeling-cbs";

/**
 * Pijler "waar sta ik met mijn inkomen" (24-sep-2026), docs/serp-gemiste-
 * onderwerpen-23-sep-2026.md #1 en #2.
 *
 * Intentiescheiding: is-4000, is-5000 en samen-6000 beantwoorden "is dit
 * bedrag goed en wat blijft er over"; deze pagina beantwoordt "waar sta ik
 * tegenover de rest van Nederland", per huishouden, in besteedbaar inkomen per
 * maand. Geen bedragpagina en geen uitgavenpagina.
 *
 * Elk bedrag komt uit lib/inkomensverdeling-cbs.ts. Niets is met de hand
 * getypt, behalve de toelichtende tekst.
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
const td = { color: "#4A5A56", whiteSpace: "nowrap" } as const;

const STELLEN: HuishoudType[] = ["paarZonderKinderenOnderAow", "paarZonderKinderen", "paarMetKinderen"];
const TYPE_GRENZEN = [0.5, 0.75, 0.9];

/** Zorgpremie per volwassene per maand in 2026 (SZW-begroting 2027, p. 175). */
const ZORGPREMIE_MAAND_2026 = Math.round(ZORG_2027.nominalePremiePerJaar2026 / 12);

function rond(n: number | null): string {
  return n === null ? "boven de tabel" : euro(n);
}

export default function Top10ProcentInkomenNederland() {
  const alleenTop10 = grensPerMaandNlRond(0.9, 1, 0);
  const stelTop10 = grensPerMaandNlRond(0.9, 2, 0);
  const gezinTop10 = grensPerMaandNlRond(0.9, 2, 2);
  const alleenMidden = grensPerMaandNlRond(0.5, 1, 0);
  const stelMidden = grensPerMaandNlRond(0.5, 2, 0);
  const alleenTop25 = grensPerMaandNlRond(0.75, 1, 0);

  const stelBinnenMidden = grensPerMaandBinnenTypeRond("paarZonderKinderenOnderAow", 0.5);
  const gezinBinnenMidden = grensPerMaandBinnenTypeRond("paarMetKinderen", 0.5);

  /** 100.000 bruto, min de zorgpremie, als benadering van besteedbaar inkomen. */
  const honderdAlleen = NETTO_INCL_VAKANTIEGELD_VOOR_BRUTO[100000] - ZORGPREMIE_MAAND_2026;
  const honderdSamen = NETTO_INCL_VAKANTIEGELD_VOOR_BRUTO_SAMEN[100000] - 2 * ZORGPREMIE_MAAND_2026;

  const stel = rapportVoorSlug("stel-zonder-kinderen")!;
  const kenmerken = stel.kenmerken.join(", ");

  return (
    <>
      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Als alleenstaande hoor je bij de hoogste 10 procent van Nederland vanaf ongeveer{" "}
        {rond(alleenTop10)} per maand te besteden. Voor een stel zonder kinderen ligt die grens op{" "}
        {rond(stelTop10)} en voor een gezin met twee kinderen op {rond(gezinTop10)}. De helft van de
        huishoudens heeft minder dan {rond(alleenMidden)} (alleen) of {rond(stelMidden)} (samen). Dit
        zijn cijfers van het CBS over {INKOMEN_PEILJAAR}.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 24 september 2026. Afgeleid uit twee tabellen van het CBS, gepubliceerd op{" "}
        {INKOMEN_GEPUBLICEERD}, samen goed voor {(aantalHuishoudensNl() / 1000).toLocaleString("nl-NL", { maximumFractionDigits: 1 })}{" "}
        miljoen huishoudens. Hoe ik van die tabellen naar deze bedragen kom, staat verderop.
      </p>

      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Vanaf welk bedrag per maand je bij de hoogste 10 of 25 procent hoort, per huishouden",
            "Wat een goed gezamenlijk inkomen is, vergeleken met andere stellen",
            "Waarom hoog in de verdeling staan niets zegt over wat er overblijft",
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
        Vanaf welk inkomen hoor je bij de top 10 procent?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Per huishouden het bedrag per maand waarboven je zit. Twee mensen hebben meer nodig dan één
        om even ruim te leven, maar geen twee keer zoveel. Daarom verschilt de grens per samenstelling.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={th}>
                Huishouden
              </th>
              {GRENZEN.map((g) => (
                <th key={g.p} className="text-right py-2 px-2" style={th}>
                  {g.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SAMENSTELLINGEN.map((s) => (
              <tr key={s.label} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-2" style={{ color: "#16211F" }}>
                  {s.label}
                </td>
                {GRENZEN.map((g) => (
                  <td key={g.p} className="text-right py-2 px-2 tabular-nums" style={td}>
                    {rond(grensPerMaandNlRond(g.p, s.volwassenen, s.kinderen))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Besteedbaar inkomen per maand, afgerond op honderden. Midden is de mediaan: de helft zit eronder.
        Top 10% is de ondergrens van de hoogste 10 procent. Gemeten tegen alle huishoudens in
        Nederland, gecorrigeerd voor de grootte van het huishouden. Kinderen jonger dan 18. Bron: CBS,
        verdeling gestandaardiseerd inkomen {INKOMEN_PEILJAAR}, en de equivalentiefactoren van het CBS.
      </p>

      <InkomenspositieKiezer startBedrag={5000} startVolwassenen={2} startKinderen={0} />

      <h2 className="font-display" style={h2}>
        Wat telt als inkomen in deze tabel?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het CBS rekent met het besteedbaar inkomen: alles wat binnenkomt, min belasting, premies en de
        zorgpremie. Voor iemand in loondienst is dat het nettoloon inclusief vakantiegeld, plus
        toeslagen en kinderbijslag, min de zorgpremie. Het vakantiegeld komt er dus bij en de
        zorgpremie gaat eraf. Die premie was in 2026 gemiddeld {euro(ZORGPREMIE_MAAND_2026)} per
        volwassene per maand (SZW-begroting 2027). Voor de meeste mensen heffen die twee elkaar
        grotendeels op, waardoor het nettobedrag op je loonstrook een redelijke benadering is.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Om huishoudens van verschillende grootte te vergelijken deelt het CBS het besteedbaar inkomen
        door een equivalentiefactor. Een alleenstaande telt als 1, een stel als{" "}
        {factorTekst(EQUIVALENTIEFACTOR[2][0])}, een stel met twee kinderen als{" "}
        {factorTekst(EQUIVALENTIEFACTOR[2][2])}. Een stel met{" "}
        {euro(14000)} per jaar leeft dus even ruim als een alleenstaande met {euro(10000)}. De tabel
        hierboven rekent die correctie weer terug naar wat er bij jouw huishouden binnenkomt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Twee kanttekeningen. Het CBS publiceert deze verdeling in klassen van {euro(2000)} per jaar;
        een grens binnen zo&apos;n klasse heb ik lineair geschat, en daarom rond ik af op honderden. En
        de cijfers gaan over {INKOMEN_PEILJAAR}. Inkomens zijn sindsdien gestegen, dus in euro&apos;s van
        nu liggen de grenzen hoger. Ik indexeer ze niet zelf, want daar bestaat geen officiële reeks
        voor.
      </p>

      <h2 className="font-display" style={h2}>
        Behoor ik tot de hogere middenklasse?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Er bestaat geen officiële grens voor de middenklasse of de hogere middenklasse. Het CBS
        gebruikt die woorden niet als indeling. Wat wel vaststaat: met meer dan het midden uit de tabel
        verdien je meer dan de helft van Nederland, en boven de grens van de hoogste 25 procent meer
        dan drie op de vier huishoudens. Als alleenstaande is dat vanaf {rond(alleenTop25)} per maand.
        Wie tussen die grens en de hoogste 10 procent zit, zou je de hogere middenklasse kunnen
        noemen, maar dat is een woordkeus en geen statistiek.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bedragen die je elders leest, zoals een vaste bandbreedte voor &ldquo;een gezin&rdquo;, houden
        meestal geen rekening met het aantal mensen dat ervan moet leven. Een gezin met drie kinderen en
        een stel zonder kinderen met hetzelfde inkomen staan in deze tabel ver uit elkaar.
      </p>

      <h2 className="font-display" style={h2}>
        Wat is een goed gezamenlijk inkomen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vergelijk je als stel liever met andere stellen dan met heel Nederland, dan is dit de tabel. Hier
        zonder correctie voor grootte: gewoon wat stellen samen per maand te besteden hebben.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={th}>
                Stellen
              </th>
              <th className="text-right py-2 px-3" style={th}>
                Midden
              </th>
              <th className="text-right py-2 px-3" style={th}>
                Top 25%
              </th>
              <th className="text-right py-2 px-3" style={th}>
                Top 10%
              </th>
            </tr>
          </thead>
          <tbody>
            {STELLEN.map((t) => (
              <tr key={t} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3" style={{ color: "#16211F" }}>
                  {HUISHOUDTYPE_LABEL[t]}
                  <span className="block text-xs" style={{ color: "#8B958F" }}>
                    {Math.round(aantalHuishoudensBinnenType(t)).toLocaleString("nl-NL")} duizend huishoudens
                  </span>
                </td>
                {TYPE_GRENZEN.map((g) => (
                  <td key={g} className="text-right py-2 px-3 tabular-nums align-top" style={td}>
                    {rond(grensPerMaandBinnenTypeRond(t, g))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Besteedbaar inkomen per maand, afgerond op honderden. Midden betekent: de helft zit
        eronder. Bron: CBS, verdeling besteedbaar inkomen {INKOMEN_PEILJAAR}.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat hieraan opvalt: een stel onder de AOW-leeftijd zonder kinderen zit met{" "}
        {rond(stelBinnenMidden)} per maand precies in het midden van de stellen zoals zij. Stellen met
        kinderen hebben samen meer te besteden, met {rond(gezinBinnenMidden)} in het midden; kinderbijslag
        en kindgebonden budget tellen daarin mee. Samen {euro(6000)} met twee kinderen zit tegenover
        heel Nederland ongeveer in het midden ({procent(aandeelMetMeerNl(6000, 2, 2))} heeft meer te
        besteden) en tegenover andere gezinnen eronder ({procent(aandeelMetMeerBinnenType("paarMetKinderen", 6000))}{" "}
        van de stellen met kinderen heeft meer).
      </p>
      <p className="font-body text-text-soft" style={p}>
        En {euro(100000)} bruto samen? Verdeeld over twee gelijke banen komt dat op ongeveer{" "}
        {euro(NETTO_INCL_VAKANTIEGELD_VOOR_BRUTO_SAMEN[100000])} netto per maand inclusief vakantiegeld,
        in de berekening met de belastingtarieven van 2026. Min twee keer de zorgpremie heeft ongeveer{" "}
        {procent(aandeelMetMeerNl(honderdSamen, 2, 0))} van de huishoudens in Nederland meer te
        besteden dan een stel zonder kinderen met dat inkomen. Verdient één van beiden die{" "}
        {euro(100000)} alleen, dan komt er ongeveer{" "}
        {euro(NETTO_INCL_VAKANTIEGELD_VOOR_BRUTO_SAMEN[100000] - NETTO_INCL_VAKANTIEGELD_VOOR_BRUTO[100000])}{" "}
        per maand minder binnen, omdat een groot deel dan in de hoogste schijf valt.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom de hoogste 10 procent zich zelden rijk voelt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hoog in deze tabel staan zegt niets over wat er aan het eind van de maand over is. De{" "}
        {RAPPORTEN.length} huishoudens die ik zelf heb doorgerekend hadden allemaal een bovenmodaal
        inkomen, en ze vroegen me allemaal uit te zoeken waar hun geld bleef. Eén voorbeeld: {kenmerken}.
        Met dat inkomen zit een stel in de buurt van de grens van de hoogste 10 procent ({rond(stelTop10)}).
      </p>
      <p className="font-body text-text-soft" style={p}>
        Zij dachten vooraf dit: &ldquo;{stel.vermoeden}&rdquo; Mijn conclusie was:{" "}
        {stel.uitkomstKop.toLowerCase()}. {stel.uitkomst} Het hele rapport staat op{" "}
        <Link href={`/rapporten/${stel.slug}`} style={link} className="hover:underline">
          hun rapportpagina
        </Link>
        . Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} huishoudens was de uitkomst dat er niets te
        repareren viel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat er dan wel speelt, verschilt per huishouden. Wat een huishouden als het jouwe per post
        uitgeeft, staat in{" "}
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
        Hoort {euro(100000)} bruto bij de top 10 procent?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Voor een alleenstaande met {euro(100000)} bruto in loondienst komt er ongeveer{" "}
        {euro(NETTO_INCL_VAKANTIEGELD_VOOR_BRUTO[100000])} netto per maand binnen, inclusief
        vakantiegeld. Min de zorgpremie heeft dan {procent(aandeelMetMeerNl(honderdAlleen, 1, 0))} van de
        huishoudens meer te besteden. Dat is net onder of rond de grens van de hoogste 10 procent, en
        omdat de grenzen van {INKOMEN_PEILJAAR} zijn, eerder net eronder dan erboven. Wat je voor een
        bepaald nettobedrag bruto moet verdienen, staat uitgerekend in{" "}
        <Link href="/inzichten/is-4000-euro-netto-goed-salaris-nederland" style={link} className="hover:underline">
          is €4.000 netto een goed salaris
        </Link>{" "}
        en{" "}
        <Link href="/inzichten/is-5000-euro-netto-goed-salaris" style={link} className="hover:underline">
          is €5.000 netto een goed salaris
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Verder lezen over inkomen en uitgaven
      </h2>
      <ul className="mb-6 space-y-2">
        {[
          { slug: "is-4000-euro-netto-goed-salaris-nederland", tekst: "Is €4.000 netto een goed salaris?" },
          { slug: "is-5000-euro-netto-goed-salaris", tekst: "Is €5.000 netto een goed salaris?" },
          { slug: "samen-6000-euro-netto-toch-niets-over", tekst: "Samen €6.000 netto en toch niets over" },
          { slug: "gemiddelde-uitgaven-per-maand-2-personen", tekst: "Gemiddelde uitgaven per maand voor 2 personen" },
          { slug: "wat-geeft-een-gezin-uit-per-maand", tekst: "Wat geeft een gezin uit per maand?" },
          { slug: "waarom-lijkt-iedereen-rijker", tekst: "Waarom lijkt iedereen rijker dan jij?" },
        ].map((s) => (
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
