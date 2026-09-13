import Link from "next/link";
import Tweeverdieners2027Rekenaar from "@/components/artikel/Tweeverdieners2027Rekenaar";
import CtaLink from "@/components/CtaLink";
import { geldscanHref } from "@/lib/cta";
import { RAPPORTEN, rapportVoorSlug } from "@/lib/rapporten-data";
import {
  alleProfielen,
  berekenIack,
  iackVerlies,
  koopkrachtInEuro,
  CPB_2027,
  CBS_TWEEVERDIENERS,
  UITGELEKT,
  IACK_2026,
  IACK_AFBOUWSTAPPEN,
  IACK_KANTELPUNT,
} from "@/lib/prinsjesdag-2027";

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
    koopkrachtInEuro(5000, UITGELEKT.koopkrachtAlleHuishoudensPct),
  );

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
        {eur(laagste.totaalPerMaand)} tot {eur(hoogste.totaalPerMaand)} per maand kwijt aan drie
        regelingen tegelijk. Het kindgebonden budget bouwt sneller af, de combinatiekorting gaat in
        negen stappen omlaag, en de zorgkosten stijgen. Het hardst geraakt is niet het hoogste
        inkomen, maar het gezin dat samen rond {eur(hoogste.samen)} verdient.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 13 september 2026. Prinsjesdag is 15 september. De cijfers over de
        zorgpremie en het eigen risico komen uit stukken die de NOS op 11 september heeft ingezien
        en zijn dus nog niet definitief. Ik werk dit artikel op 16 september bij.
      </p>

      <h2 className="font-display" style={h2}>
        Gaan tweeverdieners er in 2027 echt op achteruit?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Gemiddeld genomen wel, maar minder dramatisch dan de koppen suggereren. Er liggen op dit
        moment twee cijfers naast elkaar, en ze meten hetzelfde op twee momenten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het CPB raamde in augustus een koopkrachtdaling van {Math.abs(CPB_2027.koopkrachtMediaanPct)}{" "}
        procent voor 2027, mediaan over alle huishoudens, na een plus van{" "}
        {CPB_2027.koopkrachtMediaan2026Pct} procent in 2026. Dat staat in de kerngegevens van de
        concept-Macro Economische Verkenning 2027. Daarna besloot het kabinet geld vrij te maken
        voor koopkrachtreparatie, en in de uitgelekte Prinsjesdagstukken staat de daling op{" "}
        {Math.abs(UITGELEKT.koopkrachtAlleHuishoudensPct)} procent voor alle huishoudens, met{" "}
        {Math.abs(UITGELEKT.koopkrachtWerkendenPct)} procent voor werkenden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat tweede cijfer is op dit moment nog geen vastgesteld cijfer. Het komt uit stukken die de
        NOS heeft ingezien, drie dagen voor Prinsjesdag. Pas op 15 september staan de definitieve
        koopkrachtplaatjes in de Macro Economische Verkenning.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Belangrijker is wat zo&apos;n percentage niet is. Het is geen bedrag dat van je salaris af
        gaat. Het is een saldo van loonstijging, prijzen, belasting en regelingen, en het is een
        mediaan: de helft van de huishoudens zit erboven, de helft eronder. Voor jullie huishouden
        zegt het weinig. Wat er wel iets over zegt, staat hieronder.
      </p>

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
        Boven een gezamenlijk toetsingsinkomen van {eur(60000)} in prijspeil 2024 stijgt het
        afbouwpercentage met 4,30 procentpunt. Wat dat precies doet staat uitgerekend in{" "}
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
        op hebben. Die eerste stap kost een partner die het maximum haalt ongeveer{" "}
        {eur(iackVolleStap)} per jaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Op je aanslag zie je een kleiner verschil, ongeveer {eur(iackStap)}: het maximum gaat van{" "}
        {eur(berekenIack(2026, 50000))} naar ongeveer {eur(berekenIack(2027, 50000))}, want de
        jaarlijkse indexatie geeft een deel van de afbouw weer terug. In de tabel hieronder staat
        het eerste bedrag, want dat is wat de maatregel zelf doet. Zo staat het kindgebonden budget
        er ook in.
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
        Volgens de uitgelekte stukken gaat het eigen risico van {eur(UITGELEKT.eigenRisico2026)}{" "}
        naar {eur(UITGELEKT.eigenRisico2027)} en stijgt de premie met ongeveer{" "}
        {eur(UITGELEKT.zorgpremieStijgingPerMaand)} per maand, naar circa{" "}
        {eur(UITGELEKT.zorgpremiePerMaand2027)}. Bij twee volwassenen telt dat dubbel. Let op twee
        dingen: de verzekeraars stellen hun premies zelf vast en maken die pas half november
        bekend, en het eigen risico kost je alleen geld als je het ook opmaakt.
      </p>

      <p className="font-body text-text-soft" style={p}>
        <strong style={{ fontWeight: 600, color: "#16211F" }}>
          En dan de kant die geld oplevert.
        </strong>{" "}
        Het kabinet schrapt volgens diezelfde stukken de geplande vrijheidsbijdrage en gebruikt
        ongeveer 1,5 miljard euro voor een hogere arbeidskorting. Die landt bij werkenden, en bij
        twee inkomens dus twee keer. Hoeveel dat per huishouden is, staat er niet bij, en ik ga
        het niet schatten. Het staat hieronder daarom niet in de tabel, en dat betekent dat de
        bedragen in die tabel aan de voorzichtige kant hoog zijn.
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

      <div className="overflow-x-auto my-6">
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
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        De eerste drie kolommen zijn bedragen per jaar, de laatste is per maand. Het eigen risico
        zit erin voor twee volwassenen die het volledig opmaken.
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

      <Tweeverdieners2027Rekenaar />

      <h2 className="font-display" style={h2}>
        Wat is het verschil tussen koopkracht en wat je op je rekening merkt?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Bij {eur(5000)} netto per maand komt {Math.abs(UITGELEKT.koopkrachtAlleHuishoudensPct)}{" "}
        procent koopkracht neer op ongeveer {eur(koopkrachtEuro)} per maand. Dat is een bedrag dat
        niemand voelt. Tegelijk staat er in de tabel hierboven{" "}
        {eur(hoogste.totaalPerMaand)} per maand voor het middelste huishouden. Die twee getallen
        spreken elkaar niet tegen; ze meten iets anders.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het koopkrachtcijfer is een saldo. De loonstijging zit erin, de inflatie zit erin, en de
        maatregelen uit de tabel zitten er ook in. Het CPB rekent voor 2027 met een cao-loonstijging
        van {CPB_2027.caoLoonPct} procent en een inflatie van {CPB_2027.inflatieCpiPct} procent.
        Onder die ene komma verschil zit dus een loonsverhoging die tegen een prijsstijging en een
        aantal versoberingen wegvalt.
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
          Het hele pakket, inclusief die kant die geld oplevert, staat in{" "}
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

      {/* Slotblok: Geldscan als tekstlink */}
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
