import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { geldscanHref, analyseHref } from "@/lib/cta";
import {
  kostenVanDeMaatregel,
  nulpunt,
  KGB_2027,
  VERHOGING_PROCENTPUNT,
  VERHOGING_PROCENTPUNT_2028,
} from "@/lib/kindgebonden-budget";
import {
  ZORG_2027,
  KOOPKRACHT_2027,
  KOOPKRACHTPAKKET_2027,
  CPB_2027,
} from "@/lib/prinsjesdag-2027";
import {
  MAX_UURPRIJS_2026,
  MAX_UURPRIJS_2027,
  OMSLAGPUNT_96_PROCENT_2027,
  EXTRA_MIDDENBAND_2027,
} from "@/lib/kinderopvangtoeslag-2027";

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

export default function WatVerandertEr2027GezinnenGoedInkomen() {
  const pp = (VERHOGING_PROCENTPUNT * 100).toFixed(2).replace(".", ",");
  const pp2028 = (VERHOGING_PROCENTPUNT_2028 * 100).toFixed(2).replace(".", ",");
  const nulMet = nulpunt("paar", 2);
  const nulZonder = nulpunt("paar", 2, true);

  const voorbeeld70 = kostenVanDeMaatregel("paar", 2, 70000);
  const voorbeeld100 = kostenVanDeMaatregel("paar", 2, 100000);

  const samenvattingRijen = [
    {
      onderwerp: "Inkomstenbelasting",
      wat: "Bedragen worden per 2027 met 1,01248 vermenigvuldigd in plaats van met de volle tabelcorrectiefactor. Tarief eerste en tweede schijf 0,06 procentpunt omlaag, arbeidskorting €173 omhoog",
      effect: "Per saldo licht negatief, sterker naarmate je meer verdient",
    },
    {
      onderwerp: "Kindgebonden budget",
      wat: `Nieuwe afbouwschijf boven ${eur(KGB_2027.tweedeAfbouwpunt)} gezamenlijk inkomen: 9,95 procent in plaats van 8,05, en vanaf 2028 12,8 procent`,
      effect: "Negatief als je kinderen hebt en boven de grens zit, anders geen effect",
    },
    {
      onderwerp: "Kinderopvangtoeslag",
      wat: `Vergoeding eerste kind naar 96 procent tot ${eur(OMSLAGPUNT_96_PROCENT_2027)}, daarboven 5,1 procentpunt erbij. Kleinere stap dan het coalitieakkoord voorzag`,
      effect: "Positief als je kinderen op de opvang hebt",
    },
    {
      onderwerp: "Zorgpremie",
      wat: "VWS verwacht €12,50 per maand meer, naar gemiddeld €169. Verzekeraars maken hun eigen premie uiterlijk 12 november bekend (raming)",
      effect: "Negatief, ongeveer €25 per maand voor twee volwassenen",
    },
    {
      onderwerp: "Eigen risico",
      wat: "Van €385 naar €400, mee met de inflatie (vastgesteld in de VWS-begroting)",
      effect: "Negatief, maar alleen als je het eigen risico ook opmaakt",
    },
    {
      onderwerp: "Koopkracht landelijk",
      wat: "Mediaan min 0,1 procent, min 0,2 procent voor de hoogste twee inkomensgroepen (Macro Economische Verkenning 2027)",
      effect: "Zegt weinig over je eigen huishouden, zie hieronder waarom",
    },
  ];

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
          Jullie verdienen samen goed. Toch vraag je je bij elke Prinsjesdag opnieuw af wat het nu
          eigenlijk concreet betekent voor jullie eigen maandbudget, in plaats van voor Nederland
          gemiddeld.
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
            "Welke 2027-maatregelen jullie huishouden als tweeverdieners met een goed inkomen echt raken",
            "Waarom een landelijk koopkrachtpercentage weinig zegt over jullie eigen situatie",
            "Wat er tegenover de tegenvallers staat, want niet alles gaat achteruit",
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

      {/* Antwoord bovenaan */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: voor een tweeverdienersgezin met een gezamenlijk inkomen tussen ongeveer{" "}
        <strong style={{ fontWeight: 600 }}>&euro;70.000</strong> en{" "}
        <strong style={{ fontWeight: 600 }}>&euro;140.000</strong> verandert er in 2027 geen enkel
        groot bedrag, maar wel een stapeling van kleinere. Het kindgebonden budget bouwt sneller af
        boven zo&apos;n {eur(KGB_2027.tweedeAfbouwpunt)} gezamenlijk inkomen, de
        kinderopvangtoeslag gaat voor het eerste kind juist omhoog naar 96 procent, en de
        inkomstenbelasting corrigeert minder volledig voor inflatie. Geen van die posten is op
        zichzelf dramatisch. Bij elkaar bepalen ze wel of januari 2027 voelt als een gewone maand
        of niet.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 18 september 2026, met de stukken van Prinsjesdag. De vorige versie van
        dit artikel rekende met gelekte cijfers en ramingen; die zijn allemaal vervangen door de
        Miljoenennota, de SZW-begroting 2027, de VWS-begroting, de Fiscale sleuteltabel 2027 en de
        Macro Economische Verkenning. E&eacute;n cijfer blijft een raming: de zorgpremie. Ik werk
        dat bij zodra de verzekeraars hun premies bekendmaken, uiterlijk 12 november.
      </p>

      <h2 className="font-display" style={h2}>
        In één minuut: dit verandert er voor gezinnen in 2027
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Alles hieronder komt uit de Prinsjesdagstukken van 15 september 2026, behalve de zorgpremie:
        die staat er als raming bij, want de verzekeraars stellen hem zelf vast.
      </p>

      {/* Desktop: tabel. Mobiel: dezelfde rijen als stapelbare kaarten, zelfde tekst. */}
      <div className="hidden md:block overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Onderwerp
              </th>
              <th className="text-left py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Wat verandert er?
              </th>
              <th className="text-left py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Verwacht effect op je gezin
              </th>
            </tr>
          </thead>
          <tbody>
            {samenvattingRijen.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3 align-top" style={{ color: "#16211F", fontWeight: 500 }}>
                  {r.onderwerp}
                </td>
                <td className="py-2 px-3 align-top" style={{ color: "#4A5A56" }}>
                  {r.wat}
                </td>
                <td className="py-2 pl-3 align-top" style={{ color: "#16211F" }}>
                  {r.effect}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3 my-6">
        {samenvattingRijen.map((r, i) => (
          <div
            key={i}
            className="rounded-xl p-4"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
          >
            <p className="font-body text-sm mb-2" style={{ color: "#16211F", fontWeight: 600 }}>
              {r.onderwerp}
            </p>
            <p className="font-body text-sm mb-2" style={{ color: "#4A5A56" }}>
              {r.wat}
            </p>
            <p className="font-body text-sm" style={{ color: "#16211F" }}>
              <span style={{ fontWeight: 500 }}>Effect: </span>
              {r.effect}
            </p>
          </div>
        ))}
      </div>

      <h2 className="font-display" style={h2}>
        Waarom zegt &quot;koopkracht min 0,1 procent&quot; zo weinig over jouw gezin?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Koopkracht is het gemiddelde effect van alle maatregelen samen op wat een huishouden kan
        kopen, uitgedrukt in één percentage. Het is geen voorspelling van je nettoloon: het telt ook
        toeslagen, prijsstijgingen en de samenstelling van je huishouden mee, en het wordt berekend
        over een fictief gemiddeld huishouden per inkomensgroep, niet over jouw huishouden specifiek.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En het gemiddelde verbergt spreiding: van plus {KOOPKRACHT_2027.laagsteInkomensgroepPct}{" "}
        procent voor de laagste inkomensgroep tot min{" "}
        {Math.abs(KOOPKRACHT_2027.hoogsteTweeInkomensgroepenPct)} procent voor de hoogste twee
        inkomensgroepen, volgens de SZW-begroting 2027. Bij een kwart van alle huishoudens komt het
        onder min {Math.abs(KOOPKRACHT_2027.percentiel25Pct)} procent uit. Een gezin met een goed
        inkomen zit dus per definitie aan de kant die op papier het minst goed uitkomt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Precies daarom is de vraag niet &quot;wat doet de koopkracht&quot;, maar &quot;wat doen
        belasting, toeslagen, kinderopvang en zorgkosten samen met ons eigen inkomen en onze eigen
        vaste lasten&quot;. Wil je dat vertaald naar euro&apos;s per maand voor jullie eigen
        inkomensverdeling, met een rekenaar erbij, dan staat dat uitgewerkt in{" "}
        <Link
          href="/inzichten/tweeverdieners-2027-erop-achteruit"
          style={link}
          className="hover:underline"
        >
          tweeverdieners gaan er in 2027 op achteruit
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Belastingen in 2027: wat betekent dit voor een goed inkomen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het Belastingplan 2027 verlaagt de tarieven in de eerste en tweede schijf met{" "}
        {KOOPKRACHTPAKKET_2027.tariefVerlagingProcentpunt.toString().replace(".", ",")} procentpunt
        en verhoogt het maximum van de arbeidskorting met{" "}
        {eur(KOOPKRACHTPAKKET_2027.arbeidskortingVerhoging)}. Daar staat tegenover dat de
        tabelcorrectiefactor in 2027 en 2028 maar gedeeltelijk wordt toegepast: de bedragen in de
        inkomstenbelasting worden per 1 januari 2027 met 1,01248 vermenigvuldigd in plaats van met
        de volle correctie. De SZW-begroting noemt dat de vrijheidsbijdrage voor burgers. Ook de
        grens waarboven het hoogste tarief begint blijft staan. Dat laatste tweetal is het
        belangrijkste voor een goed inkomen: schijfgrenzen en heffingskortingen stijgen minder
        volledig mee met de inflatie dan gebruikelijk, waardoor een groter deel van elke
        loonsverhoging in een hoger tarief valt of een kleinere heffingskorting oplevert.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Hoe zwaar dat meetelt hangt af van hoeveel van je inkomen al in de hoogste schijf valt: hoe
        hoger het gezamenlijke inkomen, hoe groter het deel dat de beperktere indexatie raakt. Dit
        is een aanname over de richting, geen persoonlijk belastingadvies en geen exacte
        netto-uitkomst.
      </p>

      <h2 className="font-display" style={h2}>
        Kindgebonden budget: vooral relevant als je kinderen hebt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vanaf 2027 komt er een tweede afbouwschijf in het kindgebonden budget. Boven een gezamenlijk
        toetsingsinkomen van {eur(KGB_2027.tweedeAfbouwpunt)} gaat het afbouwpercentage van 8,05
        naar 9,95 procent, {pp} procentpunt meer. Het kabinet heeft die stap op Prinsjesdag
        gehalveerd: hij zou in 2027 al naar 12,35 procent gaan, maar dat gebeurt nu pas in 2028, en
        dan met 12,8 procent, oftewel {pp2028} procentpunt boven het basispercentage. Voor een stel
        met twee kinderen onder de 12 komt het budget daardoor al rond {eur(nulMet)} gezamenlijk
        inkomen op nul uit, in plaats van rond {eur(nulZonder)} zonder deze maatregel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Ik heb dit voor alle inkomens tussen &euro;60.000 en &euro;95.000 doorgerekend, met een
        rekenaar waarin je je eigen situatie kunt invullen, in{" "}
        <Link
          href="/inzichten/kindgebonden-budget-2027-inkomensgrens"
          style={link}
          className="hover:underline"
        >
          kindgebonden budget 2027: vanaf welk inkomen verlies je het sneller
        </Link>
        . Dat artikel gaat niet over de rest van het 2027-pakket, dit artikel wel. Wat hier van
        belang is: bij een gezamenlijk inkomen van {eur(70000)} kost deze ene maatregel dit
        huishouden ongeveer {eur(voorbeeld70.perMaand)} per maand, boven op wat er toch al minder
        wordt. Bij {eur(100000)} is het kindgebonden budget met de maatregel al vrijwel nul; zonder
        de maatregel zou het nog zo&apos;n {eur(voorbeeld100.perMaand)}{" "}
        per maand geweest zijn, dus dat is het feitelijke gemis. Bij {eur(140000)} verandert er
        vanuit deze maatregel niets, want het kindgebonden budget is op dat inkomen met of zonder de
        wijziging al nul.
      </p>

      <h2 className="font-display" style={h2}>
        Kinderopvangtoeslag: hier zit juist een positieve verandering
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Niet alles in 2027 gaat achteruit. Het vergoedingspercentage van de kinderopvangtoeslag voor
        het eerste kind gaat naar 96 procent voor iedereen met een gezamenlijk toetsingsinkomen tot{" "}
        {eur(OMSLAGPUNT_96_PROCENT_2027)}, en daarboven komt er{" "}
        {(EXTRA_MIDDENBAND_2027 * 100).toFixed(1).replace(".", ",")} procentpunt bij. Voor
        tweeverdieners met kinderen op de opvang kan dit een van de grotere posten in het
        huishoudbudget zijn, en een hogere vergoeding scheelt dan direct in wat er maandelijks
        overblijft.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wel is die stap kleiner dan het coalitieakkoord voorzag: van de &euro;715 miljoen die
        ervoor klaarstond is &euro;350 miljoen weggehaald. De maximum uurprijzen zijn nu wel bekend
        en gaan van {eur(MAX_UURPRIJS_2026.dagopvang)} naar {eur(MAX_UURPRIJS_2027.dagopvang)} voor
        dagopvang, van {eur(MAX_UURPRIJS_2026.bso)} naar {eur(MAX_UURPRIJS_2027.bso)} voor
        buitenschoolse opvang en van {eur(MAX_UURPRIJS_2026.gastouder)} naar{" "}
        {eur(MAX_UURPRIJS_2027.gastouder)} voor gastouderopvang. Met die tarieven erbij is een
        rekenvoorbeeld wel te maken, en dat staat in{" "}
        <Link
          href="/inzichten/kinderopvangtoeslag-2027-tweeverdieners"
          style={link}
          className="hover:underline"
        >
          kinderopvangtoeslag 2027: hoeveel krijg je als tweeverdieners
        </Link>
        , per inkomen doorgerekend.
      </p>

      <h2 className="font-display" style={h2}>
        Zorgkosten en andere vaste lasten
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De zorgpremie blijft het minst harde cijfer in dit artikel, maar er staat nu wel een
        officiële verwachting onder. VWS gaat uit van een stijging van &euro;12,50 per maand, naar
        gemiddeld {eur(ZORG_2027.premiePerMaand2027)} per maand: van{" "}
        {eur(ZORG_2027.nominalePremiePerJaar2026)} naar{" "}
        {eur(ZORG_2027.nominalePremiePerJaar2027)} per jaar. Verzekeraars stellen hun eigen premie
        vast en maken die uiterlijk 12 november bekend, dus dit blijft een raming. Het verplicht
        eigen risico staat wel vast: dat gaat van {eur(ZORG_2027.eigenRisico2026)} naar{" "}
        {eur(ZORG_2027.eigenRisico2027)}, mee met de inflatie.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voor een gezin met twee volwassenen komt dat samen neer op ongeveer &euro;25 per maand aan
        premie, plus {eur(30)} per jaar als jullie allebei het eigen risico volmaken. Dat is een van
        de posten die in januari op de rekening verschijnt zonder dat er ergens een brief over is
        gestuurd die het in één keer optelt bij de rest.
      </p>

      <h2 className="font-display" style={h2}>
        Drie voorbeelden: wat betekent 2027 voor verschillende gezinnen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Drie illustratieve huishoudens, met dezelfde aannames: twee inkomens, twee kinderen onder de
        12, een koopwoning. Voor het volledige bedrag per maand, inclusief de combinatiekorting en
        opgeteld met de zorgkosten, staat een rekenvoorbeeld per huishouden al uitgewerkt in{" "}
        <Link
          href="/inzichten/tweeverdieners-2027-erop-achteruit"
          style={link}
          className="hover:underline"
        >
          tweeverdieners gaan er in 2027 op achteruit
        </Link>
        . Hier gaat het om het bredere plaatje, inclusief de kant die geld oplevert.
      </p>

      {/* Drie voorbeeldhuishoudens als kaarten: zelfde cijfers en tekst als voorheen, alleen
          gestructureerd voor scanbaarheid. Geen nieuwe berekeningen. */}
      <div className="grid gap-4 my-6 sm:grid-cols-1 md:grid-cols-3">
        {[
          {
            profiel: "Gezin met twee kinderen",
            inkomen: eur(70000),
            effecten: [
              `Kindgebonden budget: ongeveer −${eur(voorbeeld70.perMaand)} per maand door de nieuwe afbouwschijf`,
            ],
            conclusieLabel: "Wat dit vooral laat zien",
            conclusie:
              "Krijgt dit gezin nu nog niet het maximum voor het eerste kind op de opvang, dan compenseert de stap naar 96 procent daar een deel van.",
          },
          {
            profiel: "Gezin met twee kinderen",
            inkomen: eur(100000),
            effecten: [
              `Kindgebonden budget: al vrijwel nul; feitelijk gemis door de maatregel zelf ongeveer ${eur(voorbeeld100.perMaand)} per maand`,
            ],
            conclusieLabel: "Wat dit vooral laat zien",
            conclusie:
              "De beperktere indexatie van belastingschijven telt hier zwaarder mee dan bij het gezin hierboven.",
          },
          {
            profiel: "Gezin met twee kinderen",
            inkomen: eur(140000),
            effecten: [
              "Kindgebonden budget: al nul, met of zonder de maatregel, dus geen extra kosten door deze wijziging",
              "Kinderopvangtoeslag: kan nog relevant zijn als er kinderen op de opvang zitten",
            ],
            conclusieLabel: "Wat dit vooral laat zien",
            conclusie:
              "De beperktere indexatie telt hier het zwaarst mee, en in verhouding tot het totale inkomen het minst.",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="rounded-xl p-4 flex flex-col"
            style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
          >
            <p className="font-body text-xs mb-1" style={{ color: "#4A5A56" }}>
              {c.profiel}
            </p>
            <p className="font-display mb-3" style={{ fontSize: "1.4rem", color: "#16211F" }}>
              {c.inkomen} <span style={{ fontSize: "0.85rem", fontWeight: 300, color: "#4A5A56" }}>samen</span>
            </p>
            <ul className="space-y-1.5 mb-3">
              {c.effecten.map((e, j) => (
                <li key={j} className="font-body text-sm" style={{ color: "#4A5A56" }}>
                  {e}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-3" style={{ borderTop: "1px solid #E6E9E7" }}>
              <p className="font-body text-xs mb-1" style={{ color: "#4A5A56", fontWeight: 500 }}>
                {c.conclusieLabel}
              </p>
              <p className="font-body text-sm" style={{ color: "#16211F", fontWeight: 600 }}>
                {c.conclusie}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA-card direct na de drie voorbeeldcards */}
      <div
        className="rounded-xl p-5 my-6"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
      >
        <p className="font-body font-semibold" style={{ color: "#16211F", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
          En hoe zit dat bij jullie?
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
          Vergelijk jullie eigen huishoudsituatie met vergelijkbare huishoudens.
        </p>
        <CtaLink
          doel="analyse"
          href={analyseHref({ situatie: "gezin" })}
          locatie="na-voorbeelden"
          className="inline-block rounded-lg px-5 py-3 font-body text-sm"
          style={{ backgroundColor: "#0B7A6E", color: "#FFFFFF" }}
        >
          Bekijk jullie situatie &rarr;
        </CtaLink>
        <p className="font-body text-xs" style={{ color: "#4A5A56", marginTop: "0.5rem" }}>
          Gratis &middot; anoniem &middot; geen verplicht gesprek
        </p>
      </div>

      {/* Bedrag verbatim uit lib/rapporten-data.ts, rapport "tweeverdieners-drie-kinderen"
          (kenmerken: "samen €7.880 netto"). Niet herberekend, niet uit het hoofd getypt. */}
      <p className="font-body text-text-soft" style={p}>
        Een van de vijf huishoudens die ik zelf heb doorgerekend, met samen {eur(7880)} netto per
        maand en drie kinderen, laat zien hoe dat in de praktijk uitpakt: niet één grote misser,
        maar een stapeling van kleinere posten die niemand vooraf bij elkaar had opgeteld. Het hele
        rapport staat, geanonimiseerd, op{" "}
        <Link href="/rapporten/tweeverdieners-drie-kinderen" style={link} className="hover:underline">
          waar blijft het bij dit gezin met drie kinderen
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Waarom een goed inkomen niet automatisch betekent dat je financieel ruim zit
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een hoger inkomen brengt vaak ook hogere vaste lasten met zich mee. Een grotere hypotheek,
        een duurdere buurt, kinderopvang die meegroeit met twee volle banen. Toeslagen bouwen af
        precies op het inkomen waar veel gezinnen op uitkomen als ze allebei goed verdienen, en de
        belastingdruk stijgt geleidelijk mee. Geen van die posten is op zichzelf een probleem. Bij
        elkaar verklaren ze waarom &euro;100.000 of &euro;140.000 samen niet automatisch aanvoelt
        als financiële ruimte.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is geen kwestie van te veel uitgeven. Het is een optelsom die niemand voor je maakt,
        want de koopkrachttabel doet het niet en je loonstrook doet het al helemaal niet. 2027 voegt
        aan die optelsom een paar regels toe: een iets hogere belastingdruk, een lager kindgebonden
        budget boven een bepaalde grens, een hogere zorgpremie, en een hogere kinderopvangtoeslag
        die dat voor een deel compenseert.
      </p>

      <h2 className="font-display" style={h2}>
        Wat kun je nu al doen voor 2027?
      </h2>
      <ol className="space-y-2 mb-6" style={{ listStyle: "decimal", paddingLeft: "1.25rem" }}>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          Controleer welke toeslagen er bij jullie in 2027 veranderen, met name het kindgebonden
          budget als jullie gezamenlijk inkomen boven de {eur(KGB_2027.tweedeAfbouwpunt)} uitkomt.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          Kijk naar jullie kinderopvangkosten en de huidige vergoeding, zodat je ziet of de stap
          naar 96 procent voor jullie iets oplevert.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          Kijk naar het verwachte netto huishoudinkomen voor 2027, niet naar het landelijke
          koopkrachtpercentage.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          Vergelijk daarna jullie volledige huishoudbudget met vergelijkbare huishoudens, in plaats
          van alleen naar de veranderingen van dit ene jaar te kijken.
        </li>
      </ol>

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
        De landelijke cijfers zeggen wat er gemiddeld gebeurt. Jullie huishoudboekje is niet
        gemiddeld. Wil je weten waar het bij jullie precies zit, ook los van wat Prinsjesdag
        verandert, dan kan dat met de{" "}
        <CtaLink doel="geldscan" href={geldscanHref()} locatie="slot" style={link} className="hover:underline">
          Geldscan van &euro;49
        </CtaLink>
        , die ik met de hand voor je uitwerk.
      </p>
    </>
  );
}
