import Link from "next/link";
import Tweeverdieners2027Rekenaar from "@/components/artikel/Tweeverdieners2027Rekenaar";
import CtaLink from "@/components/CtaLink";
import { geldscanHref, analyseHref } from "@/lib/cta";
import { RAPPORTEN, rapportVoorSlug } from "@/lib/rapporten-data";
import {
  alleProfielen,
  berekenIack,
  iackVerlies,
  koopkrachtInEuro,
  CPB_2027,
  KOOPKRACHT_2027,
  KOOPKRACHT_TWEEVERDIENERS_2027,
  CBS_TWEEVERDIENERS,
  ZORG_2027,
  KOOPKRACHTPAKKET_2027,
  IACK_2026,
  IACK_2027,
  IACK_AFBOUWSTAPPEN,
  IACK_KANTELPUNT,
} from "@/lib/prinsjesdag-2027";
import { KGB_2027, VERHOGING_PROCENTPUNT, VERHOGING_PROCENTPUNT_2028 } from "@/lib/kindgebonden-budget";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function eur(n: number): string {
  return "€" + n.toLocaleString("nl-NL");
}

export default function Tweeverdieners2027EropAchteruit() {
  const profielen = alleProfielen();
  const laagste = profielen.reduce((a, b) => (b.totaalPerMaand < a.totaalPerMaand ? b : a));
  const hoogste = profielen.reduce((a, b) => (b.totaalPerMaand > a.totaalPerMaand ? b : a));
  const stelC = profielen[2];

  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen");
  const iackStap = berekenIack(2026, 50000) - berekenIack(2027, 50000);
  // Wat de afbouwstap zelf kost, los van de indexatie. Zelfde methode als bij het
  // kindgebonden budget, en hetzelfde getal als in de tabel hieronder.
  const iackVolleStap = iackVerlies(50000);

  const koopkrachtEuro = Math.abs(
    koopkrachtInEuro(5000, KOOPKRACHT_2027.alleHuishoudensPct),
  );
  const zorgPremiePerJaar = ZORG_2027.nominalePremiePerJaar2027 - ZORG_2027.nominalePremiePerJaar2026;

  return (
    <>
      {/* Herken je dit? */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
      >
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Jullie werken allebei. Het inkomen is prima. En toch lees je overal dat tweeverdieners er
          in 2027 op achteruitgaan, zonder dat iemand uitrekent wat dat bij jullie doet.
        </p>
      </div>

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
            "Welke drie regelingen in 2027 voor tweeverdieners veranderen",
            "Wat dat per maand kost bij drie verschillende inkomens, doorgerekend",
            "Waarom het huishouden in het midden er harder in zit dan het hoogste inkomen",
            "Waarom een koopkrachtcijfer van min 0,1 procent iets anders meet dan je bankrekening",
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

      {/* Antwoord bovenaan, met getal, 40 tot 60 woorden */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: een tweeverdienersgezin met twee kinderen raakt in 2027 ongeveer{" "}
        <strong style={{ fontWeight: 600 }}>{eur(laagste.totaalPerMaand)}</strong> tot{" "}
        <strong style={{ fontWeight: 600 }}>{eur(hoogste.totaalPerMaand)}</strong> per maand kwijt
        aan drie regelingen tegelijk. Het kindgebonden budget bouwt sneller af, de
        combinatiekorting gaat in negen stappen omlaag, en de zorgkosten stijgen. Het hardst
        geraakt is niet het hoogste inkomen, maar het gezin dat samen rond {eur(hoogste.samen)}{" "}
        verdient.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 18 september 2026, met de stukken van Prinsjesdag 2026. Alles op deze
        pagina komt nu uit de Miljoenennota, de SZW-begroting 2027, de Fiscale sleuteltabel 2027 en
        de Macro Economische Verkenning. E&eacute;n getal staat nog niet vast: de zorgpremie is een
        raming van VWS, want de verzekeraars stellen hun premie zelf vast en maken die uiterlijk
        12 november bekend.
      </p>

      <h2 className="font-display" style={h2}>
        Gaan tweeverdieners er in 2027 echt op achteruit?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Gemiddeld genomen wel, maar minder dramatisch dan de koppen suggereren, en lang niet
        allemaal evenveel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het CPB raamde in augustus nog een koopkrachtdaling van 0,3 procent voor 2027. Op
        Prinsjesdag kwam daar 0,2 procentpunt bij, deels door de maatregelen in de Miljoenennota en
        deels doordat de inflatieraming iets omlaag ging. In de Macro Economische Verkenning van
        15 september staat de daling op{" "}
        {Math.abs(CPB_2027.koopkrachtMediaanPct)} procent, mediaan over alle huishoudens, na een
        plus van {CPB_2027.koopkrachtMediaan2026Pct} procent in 2026.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Onder die mediaan zit spreiding, en die kant op is het verhaal preciezer. De SZW-begroting
        2027 zet de laagste inkomensgroep op plus{" "}
        {KOOPKRACHT_2027.laagsteInkomensgroepPct} procent en gepensioneerden op plus{" "}
        {KOOPKRACHT_2027.gepensioneerdenPct} procent. De hoogste twee inkomensgroepen komen uit op{" "}
        min {Math.abs(KOOPKRACHT_2027.hoogsteTweeInkomensgroepenPct)} procent, en daar zitten de
        meeste tweeverdieners met een goed inkomen in. Bij een kwart van alle huishoudens valt het
        onder min {Math.abs(KOOPKRACHT_2027.percentiel25Pct)} procent.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De begroting rekent ook vijf voorbeeldhuishoudens met twee inkomens door. Die staan het
        dichtst bij de vraag waarmee je hier kwam:
      </p>
      <ul className="font-body text-text-soft mb-6 space-y-1.5" style={{ fontWeight: 300 }}>
        {KOOPKRACHT_TWEEVERDIENERS_2027.map((r) => (
          <li key={r.omschrijving}>
            {r.omschrijving.charAt(0).toUpperCase() + r.omschrijving.slice(1)}:{" "}
            {r.pct > 0 ? "plus " : "min "}
            {Math.abs(r.pct).toString().replace(".", ",")} procent
          </li>
        ))}
      </ul>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Dat zijn versimpelde voorbeelden uit tabel 134 van de SZW-begroting. Waar kinderen in het
        huishouden zitten, rekent de begroting met twee kinderen van 6 tot 11 jaar. De
        kinderopvangtoeslag en de hypotheekrenteaftrek zitten er in geen van de vijf in, omdat niet
        elk huishouden daar gebruik van maakt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Belangrijker is wat zo&apos;n percentage niet is. Het is geen bedrag dat van je salaris af
        gaat. Het is een saldo van loonstijging, prijzen, belasting en regelingen, en het is een
        mediaan: de helft van de huishoudens zit erboven, de helft eronder. Voor jullie huishouden
        zegt het weinig. Wat er wel iets over zegt, staat hieronder.
      </p>

      {/* Rekenaar eerder in het artikel: direct na de belangrijkste conclusie, voor de
          diepgaande secties over CBS-cijfers en de drie regelingen beginnen. */}
      <p className="font-body text-text-soft" style={p}>
        Benieuwd wat dit ongeveer betekent voor jullie situatie? Vul hieronder jullie eigen
        inkomens en gezinssamenstelling in.
      </p>
      <Tweeverdieners2027Rekenaar />

      <h2 className="font-display" style={h2}>
        Waarom worden juist tweeverdieners genoemd?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Omdat vrijwel elke regeling die in 2027 versobert aan een inkomensgrens hangt, en
        tweeverdieners daar door hun twee inkomens sneller overheen zitten. Het CBS publiceerde op
        9 september nieuwe cijfers: in de hoogste twintig procent van de inkomens is{" "}
        {CBS_TWEEVERDIENERS.aandeelHoogste20Pct} procent van de werkzame huishoudens een
        tweeverdiener. Die groep begint bij {eur(CBS_TWEEVERDIENERS.grensHoogste20Pct)} bruto per
        huishouden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat getal is belangrijker dan het lijkt. De mediane tweeverdiener zat in 2024 op{" "}
        {eur(CBS_TWEEVERDIENERS.medianeBrutoInkomen2024)} bruto per huishouden: een hoofdkostwinner
        met {eur(CBS_TWEEVERDIENERS.medianeHoofdkostwinner2024)} en een partner met{" "}
        {eur(CBS_TWEEVERDIENERS.medianePartner2024)}. Een gezin dat samen boven een ton verdient is
        in Nederland dus geen uitzondering, maar het gemiddelde geval. En precies dat gezin komt
        boven de grenzen uit waar de regelingen op afbouwen.
      </p>

      <h2 className="font-display" style={h2}>
        Welke maatregelen raken tweeverdieners in 2027?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Drie die geld kosten, en één die geld oplevert. Die laatste hoort er ook bij, anders klopt
        het verhaal niet.
      </p>

      <p className="font-body text-text-soft" style={p}>
        <strong style={{ fontWeight: 600, color: "#16211F" }}>
          1. Het kindgebonden budget bouwt sneller af.
        </strong>{" "}
        Boven een gezamenlijk toetsingsinkomen van {eur(KGB_2027.tweedeAfbouwpunt)} komt er een
        tweede afbouwschijf. Het percentage gaat daar in 2027 van 8,05 naar 9,95 procent, een
        verhoging van {(VERHOGING_PROCENTPUNT * 100).toFixed(2).replace(".", ",")} procentpunt.
        Dat is minder dan het tot Prinsjesdag leek: het kabinet voert de stap in twee delen in en
        pas in 2028 wordt het percentage 12,8, oftewel{" "}
        {(VERHOGING_PROCENTPUNT_2028 * 100).toFixed(2).replace(".", ",")} procentpunt boven het
        basispercentage. Wat dat precies doet staat uitgerekend in{" "}
        <Link
          href="/inzichten/kindgebonden-budget-2027-inkomensgrens"
          style={link}
          className="hover:underline"
        >
          het artikel over de inkomensgrens van het kindgebonden budget
        </Link>
        , inclusief een rekenaar per huishouden.
      </p>

      <p className="font-body text-text-soft" style={p}>
        <strong style={{ fontWeight: 600, color: "#16211F" }}>
          2. De combinatiekorting gaat omlaag.
        </strong>{" "}
        De inkomensafhankelijke combinatiekorting is de heffingskorting voor de minstverdienende
        werkende partner met een kind onder de twaalf. In 2026 is die maximaal{" "}
        {eur(IACK_2026.maximum)} per jaar. Vanaf 2027 wordt dat maximum in{" "}
        {IACK_AFBOUWSTAPPEN} jaarlijkse stappen afgebouwd naar nul, voor alle ouders die er recht
        op hebben. De Fiscale sleuteltabel 2027 zet het maximum voor 2027 op{" "}
        {eur(IACK_2027.maximum)}. De SZW-begroting noemt de maatregel zelf een verlaging van{" "}
        {eur(iackVolleStap)} per jaar voor wie het maximum haalt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Op je aanslag zie je een kleiner verschil, {eur(iackStap)}: het maximum gaat van{" "}
        {eur(berekenIack(2026, 50000))} naar {eur(berekenIack(2027, 50000))}, want de jaarlijkse
        indexatie geeft een deel van de afbouw weer terug. In de tabel hieronder staat het eerste
        bedrag, want dat is wat de maatregel zelf doet. Zo staat het kindgebonden budget er ook in.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Hier zit meteen de belangrijkste nuance van dit artikel. De korting hangt aan het
        arbeidsinkomen van de minstverdienende partner, niet aan jullie gezamenlijke inkomen. En
        de afbouw haalt van het maximum af. Wie minder dan ongeveer {eur(IACK_KANTELPUNT)} verdient,
        zit onder dat maximum en merkt van deze eerste stap dus nog niets. Twee gezinnen met
        hetzelfde gezamenlijke inkomen kunnen daardoor een verschillend bedrag kwijtraken,
        afhankelijk van hoe dat inkomen over de twee partners verdeeld is.
      </p>

      <p className="font-body text-text-soft" style={p}>
        <strong style={{ fontWeight: 600, color: "#16211F" }}>3. De zorgkosten stijgen.</strong>{" "}
        Het eigen risico gaat van {eur(ZORG_2027.eigenRisico2026)} naar{" "}
        {eur(ZORG_2027.eigenRisico2027)}, mee met de inflatie. VWS verwacht daarnaast dat de
        zorgpremie met &euro;12,50 per maand stijgt, naar gemiddeld{" "}
        {eur(ZORG_2027.premiePerMaand2027)} per maand: van{" "}
        {eur(ZORG_2027.nominalePremiePerJaar2026)} naar{" "}
        {eur(ZORG_2027.nominalePremiePerJaar2027)} per jaar. Bij twee volwassenen telt dat dubbel.
        Let op twee dingen: die premie is een verwachting en geen vaststaand bedrag, want de
        verzekeraars bepalen hun eigen premie en maken die uiterlijk 12 november bekend, en het
        eigen risico kost je alleen geld als je het ook opmaakt.
      </p>

      <p className="font-body text-text-soft" style={p}>
        <strong style={{ fontWeight: 600, color: "#16211F" }}>
          En dan de kant die geld oplevert.
        </strong>{" "}
        Het kabinet trekt {KOOPKRACHTPAKKET_2027.omvangMiljard.toString().replace(".", ",")}{" "}
        miljard euro uit voor koopkracht. Het maximum van de arbeidskorting gaat met{" "}
        {eur(KOOPKRACHTPAKKET_2027.arbeidskortingVerhoging)} omhoog, en de tarieven in de eerste en
        tweede schijf gaan allebei met{" "}
        {KOOPKRACHTPAKKET_2027.tariefVerlagingProcentpunt.toString().replace(".", ",")}{" "}
        procentpunt omlaag. Die arbeidskorting landt bij werkenden, en bij twee inkomens dus twee
        keer. Hoeveel er per huishouden netto van overblijft hangt af van beide salarissen, en dat
        reken ik hier niet uit. Het staat hieronder daarom niet in de tabel, en dat betekent dat de
        bedragen in die tabel aan de voorzichtige kant hoog zijn.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat er tegenover staat en wel in de min werkt: de bedragen in de inkomstenbelasting worden
        per 1 januari 2027 niet volledig voor inflatie gecorrigeerd. Het Belastingplan vermenigvuldigt
        ze met 1,01248 in plaats van met de gewone tabelcorrectiefactor. De SZW-begroting noemt dat
        de vrijheidsbijdrage voor burgers en rekent hem tot de maatregelen die de koopkracht in 2027
        drukken. Ook de grens waarboven het hoogste belastingtarief begint blijft staan, waardoor je
        er eerder overheen gaat.
      </p>

      <h2 className="font-display" style={h2}>
        Wat betekent dit voor een tweeverdienersgezin?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Drie indicatieve voorbeelden, elk met twee kinderen. Geen persoonlijke
        belastingberekeningen: het gezamenlijke bruto-inkomen staat hier voor het toetsingsinkomen,
        en er is geen rekening gehouden met hypotheekrenteaftrek, aftrekposten of loonstijging.
        Modaal is in 2027 {eur(CPB_2027.brutoModaal)} bruto volgens het CPB, dus Stel B is precies
        twee keer modaal.
      </p>

      {/* Desktop: tabel. Mobiel: dezelfde gegevens als stapelbare kaarten, één huishouden per blok. */}
      <div className="hidden md:block overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Huishouden
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Kindgebonden budget
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Combinatiekorting
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Zorg
              </th>
              <th className="text-right py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Samen per maand
              </th>
            </tr>
          </thead>
          <tbody>
            {profielen.map((r) => (
              <tr key={r.profiel.sleutel} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3" style={{ color: "#16211F" }}>
                  <strong style={{ fontWeight: 600 }}>{r.profiel.naam}</strong>
                  <br />
                  <span style={{ color: "#4A5A56" }}>{r.profiel.omschrijving}</span>
                </td>
                <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>
                  {r.kgbPerJaar === 0 ? "niets" : eur(r.kgbPerJaar)}
                </td>
                <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>
                  {r.iackPerJaar === 0 ? "niets" : eur(r.iackPerJaar)}
                </td>
                <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>
                  {eur(r.zorgpremiePerJaar + r.eigenRisicoPerJaar)}
                </td>
                <td className="text-right py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>
                  {eur(r.totaalPerMaand)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3 my-6">
        {profielen.map((r) => (
          <div
            key={r.profiel.sleutel}
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
          >
            <p className="font-body text-sm mb-0.5" style={{ color: "#16211F", fontWeight: 600 }}>
              {r.profiel.naam}
            </p>
            <p className="font-body text-xs mb-3" style={{ color: "#4A5A56" }}>
              {r.profiel.omschrijving}
            </p>
            <div className="flex justify-between font-body text-sm mb-1" style={{ color: "#4A5A56" }}>
              <span>Kindgebonden budget</span>
              <span>{r.kgbPerJaar === 0 ? "niets" : eur(r.kgbPerJaar)}</span>
            </div>
            <div className="flex justify-between font-body text-sm mb-1" style={{ color: "#4A5A56" }}>
              <span>Combinatiekorting</span>
              <span>{r.iackPerJaar === 0 ? "niets" : eur(r.iackPerJaar)}</span>
            </div>
            <div className="flex justify-between font-body text-sm mb-3" style={{ color: "#4A5A56" }}>
              <span>Zorg</span>
              <span>{eur(r.zorgpremiePerJaar + r.eigenRisicoPerJaar)}</span>
            </div>
            <div
              className="flex justify-between font-body font-semibold pt-3"
              style={{ color: "#16211F", borderTop: "1px solid #E6E9E7" }}
            >
              <span>Samen per maand</span>
              <span>{eur(r.totaalPerMaand)}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        De eerste drie kolommen zijn bedragen per jaar, de laatste is per maand. De zorgkolom is{" "}
        {eur(zorgPremiePerJaar * 2)} premie plus {eur(30)} eigen risico voor twee volwassenen die
        het eigen risico volledig opmaken. De premie is de verwachting van VWS, geen vastgesteld
        bedrag.
      </p>

      <p className="font-body text-text-soft" style={p}>
        Het opvallendste staat in de laatste kolom. Stel B, met twee keer modaal, raakt met{" "}
        {eur(hoogste.totaalPerMaand)} per maand het meeste kwijt, en Stel C met{" "}
        {eur(stelC.samen)} raakt minder kwijt. Dat is geen fout. Stel C is het kindgebonden budget
        al helemaal kwijt en kan het dus niet nog een keer verliezen. Stel A houdt de
        combinatiekorting volledig, omdat de minstverdienende partner onder het maximum zit. De
        zin &quot;tweeverdieners gaan er honderden euro&apos;s op achteruit&quot; klopt voor geen
        van deze drie.
      </p>

      <h2 className="font-display" style={h2}>
        Wat is het verschil tussen koopkracht en wat je op je rekening merkt?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Bij {eur(5000)} netto per maand komt {Math.abs(KOOPKRACHT_2027.alleHuishoudensPct)}{" "}
        procent koopkracht neer op ongeveer {eur(koopkrachtEuro)} per maand. Dat is een bedrag dat
        niemand voelt. Tegelijk staat er in de tabel hierboven{" "}
        {eur(hoogste.totaalPerMaand)} per maand voor het middelste huishouden. Die twee getallen
        spreken elkaar niet tegen; ze meten iets anders.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het koopkrachtcijfer is een saldo. De loonstijging zit erin, de inflatie zit erin, en de
        maatregelen uit de tabel zitten er ook in. Het CPB rekent voor 2027 met een cao-loonstijging
        van {CPB_2027.caoLoonPct} procent en een inflatie van {CPB_2027.inflatieCpiPct} procent.
        De lonen stijgen dus harder dan de prijzen, en toch daalt de koopkracht. Dat komt doordat
        het beleid per saldo negatief uitpakt: de versoberingen en de beperkte inflatiecorrectie
        eten de ruimte op die de loonsverhoging geeft.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voor een huishouden werkt dat anders. De loonsverhoging komt in januari in kleine stapjes
        in het nettoloon en valt niet op. De toeslagen veranderen op één dag en in één keer. Het
        eigen risico merk je pas in maart, als er iets is. Daarom voelt een jaar waarin je op
        papier gelijk blijft alsof er iets weg is: het bedrag dat erbij komt is onzichtbaar en het
        bedrag dat eraf gaat is dat niet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat zie ik ook terug in de {RAPPORTEN.length} huishoudens waarvan ik de cijfers zelf heb
        doorgerekend. {gezin ? gezin.profiel : ""} De uitkomst daar was:{" "}
        {gezin ? gezin.uitkomstKop.toLowerCase() : ""}. Wat er wel speelde, waren voorspelbare
        jaaruitgaven waarvoor niets apart stond.{" "}
        {gezin ? (
          <Link href={`/rapporten/${gezin.slug}`} style={link} className="hover:underline">
            Dat hele rapport staat online
          </Link>
        ) : (
          <Link href="/rapporten" style={link} className="hover:underline">
            De rapporten staan online
          </Link>
        )}
        , met alle bedragen erbij. Bij {RAPPORTEN.length} huishoudens is dat een richting en geen
        norm, maar het patroon is steeds hetzelfde: het zit zelden in de post waar de krant over
        schrijft.
      </p>

      <h2 className="font-display" style={h2}>
        Wat kun je zelf doen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Aan de regelingen niets. Aan de verrassing in januari wel.
      </p>
      <ul className="font-body text-text-soft mb-6 space-y-2" style={{ fontWeight: 300 }}>
        <li>
          Kijk hoe jullie inkomen over de twee partners verdeeld is. De combinatiekorting hangt
          daaraan, het kindgebonden budget aan de som. Dat zijn twee verschillende knoppen.
        </li>
        <li>
          Controleer in december je voorschot kindgebonden budget bij de Belastingdienst. Een te
          hoog voorschot betaal je later terug, en dat is een tweede tegenvaller boven op de
          eerste.
        </li>
        <li>
          Reken de kinderopvang apart door. Het vergoedingspercentage verandert in 2027, en dat
          werkt anders uit dan de regelingen hierboven: bij het eerste kind gaat het juist omhoog.
          Met een rekenvoorbeeld per inkomen staat dat in{" "}
          <Link
            href="/inzichten/kinderopvangtoeslag-2027-tweeverdieners"
            style={link}
            className="hover:underline"
          >
            kinderopvangtoeslag 2027: hoeveel krijg je als tweeverdieners
          </Link>
          . Het hele pakket, inclusief die kant die geld oplevert, staat in{" "}
          <Link
            href="/inzichten/wat-verandert-er-2027-gezinnen-goed-inkomen"
            style={link}
            className="hover:underline"
          >
            wat verandert er in 2027 voor gezinnen met een goed inkomen
          </Link>
          .
        </li>
        <li>
          Haal het bedrag uit de tabel nu al uit je maandbegroting in plaats van in januari. Dan
          verandert er op 1 januari niets aan wat je gewend bent.
        </li>
        <li>
          Zet de voorspelbare jaaruitgaven apart: vakantie, onderhoud, december, verjaardagen. Dat
          is bij de huishoudens die ik doorrekende vaker het verschil dan welke maatregel ook.
        </li>
      </ul>
      <p className="font-body text-text-soft" style={p}>
        Wat je niet hoeft te doen: je abonnementen opzeggen omdat er een koopkrachtcijfer in de
        krant staat. Zie ook{" "}
        <Link href="/inzichten/tweeverdieners-toch-krap" style={link} className="hover:underline">
          waarom twee inkomens toch krap kunnen voelen
        </Link>{" "}
        en{" "}
        <Link
          href="/inzichten/samen-te-veel-verdiend-toeslag-kwijt"
          style={link}
          className="hover:underline"
        >
          samen te veel verdiend en toeslag kwijt
        </Link>
        .
      </p>

      {/* Slotblok: analyse als primaire CTA, Geldscan blijft als tekstlink erna (sectie 5 CLAUDE.md) */}
      <div
        className="rounded-xl p-5 my-6"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
      >
        <p className="font-body font-semibold" style={{ color: "#16211F", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          Wil je weten wat dit bij jullie thuis betekent?
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
          De landelijke cijfers zijn gemiddelden. In jullie eigen huishoudbudget kan het effect heel
          anders uitpakken.
        </p>
        <CtaLink
          doel="analyse"
          href={analyseHref({ situatie: "gezin" })}
          locatie="slot"
          className="inline-block rounded-lg px-5 py-3 font-body text-sm"
          style={{ backgroundColor: "#0B7A6E", color: "#FFFFFF" }}
        >
          Vergelijk jullie huishouden &rarr;
        </CtaLink>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Blijft er bij jullie ook zonder deze maatregelen al te weinig over, dan zit het zelden in
        één post. Wil je weten waar het bij jullie huishouden precies weglekt, dan kan dat met de{" "}
        <CtaLink
          doel="geldscan"
          href={geldscanHref()}
          locatie="slot"
          style={link}
          className="hover:underline"
        >
          Geldscan van &euro;49
        </CtaLink>
        , die ik met de hand voor je uitwerk.
      </p>
    </>
  );
}
