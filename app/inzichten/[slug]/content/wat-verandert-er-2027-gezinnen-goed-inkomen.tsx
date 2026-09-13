import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { geldscanHref } from "@/lib/cta";
import {
  kostenVanDeMaatregel,
  nulpunt,
  KGB_2027,
  VERHOGING_PROCENTPUNT,
} from "@/lib/kindgebonden-budget";

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
  const nulMet = nulpunt("paar", 2);
  const nulZonder = nulpunt("paar", 2, true);

  const voorbeeld70 = kostenVanDeMaatregel("paar", 2, 70000);
  const voorbeeld100 = kostenVanDeMaatregel("paar", 2, 100000);

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
        Kort gezegd: voor een tweeverdienersgezin met een gezamenlijk inkomen tussen ongeveer
        &euro;70.000 en &euro;140.000 verandert er in 2027 geen enkel groot bedrag, maar wel een
        stapeling van kleinere. Het kindgebonden budget bouwt sneller af boven zo&apos;n{" "}
        {eur(KGB_2027.tweedeAfbouwpunt)} gezamenlijk inkomen, de kinderopvangtoeslag gaat voor het
        eerste kind juist omhoog naar 96 procent, en de inkomstenbelasting corrigeert minder
        volledig voor inflatie. Geen van die posten is op zichzelf dramatisch. Bij elkaar bepalen ze
        wel of januari 2027 voelt als een gewone maand of niet.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 13 september 2026. Prinsjesdag is op 15 september; tot die datum zijn
        de meeste 2027-bedragen in dit artikel een raming op basis van gelekte Miljoenennotacijfers
        en de laatste CPB-raming, met bron en ophaaldatum bij elk cijfer. Ik werk dit artikel bij
        zodra de definitieve stukken er zijn, en opnieuw zodra de zorgpremies op 12 november bekend
        worden.
      </p>

      <h2 className="font-display" style={h2}>
        In één minuut: dit verandert er voor gezinnen in 2027
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Alleen bedragen die vaststaan of expliciet als raming zijn gemarkeerd. Geen bedrag hieronder
        is definitief tot Prinsjesdag, behalve waar dat apart staat vermeld.
      </p>
      <div className="overflow-x-auto my-6">
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
            {[
              {
                onderwerp: "Inkomstenbelasting",
                wat: "Belastingschijven en heffingskortingen worden in 2027 en 2028 minder volledig gecorrigeerd voor inflatie (raming, gelekt)",
                effect: "Vermoedelijk licht negatief, sterker naarmate je meer verdient",
              },
              {
                onderwerp: "Kindgebonden budget",
                wat: `Nieuwe afbouwschijf boven circa ${eur(KGB_2027.tweedeAfbouwpunt)} gezamenlijk inkomen (grens en percentage vast, bedrag raming)`,
                effect: "Negatief als je kinderen hebt en boven de grens zit, anders geen effect",
              },
              {
                onderwerp: "Kinderopvangtoeslag",
                wat: "Vergoeding eerste kind naar 96 procent voor ouders die nu nog niet het maximum krijgen (aangekondigd beleid)",
                effect: "Positief als je kinderen op de opvang hebt",
              },
              {
                onderwerp: "Zorgpremie",
                wat: "Ramingen lopen uiteen van circa €170 tot €200 per maand, definitief pas 12 november (raming, tegenstrijdige bronnen)",
                effect: "Negatief, exacte omvang nog niet vast te stellen",
              },
              {
                onderwerp: "Eigen risico",
                wat: "De ene raming houdt €385 aan, de andere noemt €400 (raming, tegenstrijdige bronnen)",
                effect: "Onzeker, hooguit een paar euro per maand verschil",
              },
              {
                onderwerp: "Koopkracht landelijk",
                wat: "Gemiddeld circa min 0,1 procent, circa min 0,2 procent voor hogere inkomens (gelekt, nog niet officieel)",
                effect: "Zegt weinig over je eigen huishouden, zie hieronder waarom",
              },
            ].map((r, i) => (
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
        En het gemiddelde verbergt spreiding: van plus 0,2 procent voor lage inkomens tot min 0,2
        procent voor hogere inkomens, volgens de gelekte Prinsjesdagcijfers. Een gezin met een goed
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
        Volgens de gelekte Miljoenennotacijfers dalen de tarieven in de eerste en tweede schijf met
        maar 0,06 procentpunt, gaat de arbeidskorting omhoog met een bedrag dat bij het schrijven van
        dit artikel nog niet bekend is, en wordt de zogeheten tabelcorrectiefactor in 2027 en 2028
        maar gedeeltelijk toegepast. Dat laatste is de belangrijkste voor een goed inkomen: het
        betekent dat schijfgrenzen en heffingskortingen minder volledig meestijgen met de inflatie
        dan gebruikelijk, waardoor een steeds groter deel van elke loonsverhoging in een hoger
        tarief valt of een kleinere heffingskorting oplevert.
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
        toetsingsinkomen van naar verwachting circa {eur(KGB_2027.tweedeAfbouwpunt)} gaat het
        afbouwpercentage van 8,05 naar 12,35 procent, {pp} procentpunt meer. Voor een stel met twee
        kinderen onder de 12 komt het budget daardoor al rond {eur(nulMet)} gezamenlijk inkomen op
        nul uit, in plaats van rond {eur(nulZonder)} zonder deze maatregel.
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
        het eerste kind stijgt naar 96 procent, ook voor ouders die daar nu nog geen recht op hebben.
        Voor tweeverdieners met kinderen op de opvang kan dit een van de grotere posten in het
        huishoudbudget zijn, en een hogere vergoeding scheelt dan direct in wat er maandelijks
        overblijft.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat ik hier bewust niet doe, is een bedrag per maand voorrekenen. De maximale uurtarieven
        voor 2027 stonden bij het schrijven van dit artikel nog niet vast, en zonder die tarieven is
        een rekenvoorbeeld gokwerk. Ter referentie de tarieven van 2026: &euro;11,23 voor
        dagopvang, &euro;9,98 voor buitenschoolse opvang en &euro;8,49 voor gastouderopvang. Zodra de
        tarieven voor 2027 vaststaan, volgt daar een apart artikel over, met een eigen rekenvoorbeeld
        in plaats van een schatting hier.
      </p>

      <h2 className="font-display" style={h2}>
        Zorgkosten en andere vaste lasten
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De zorgpremie voor 2027 is het minst harde cijfer in dit artikel. Verzekeraars maken de
        premies pas op 12 november bekend. Ramingen die nu circuleren lopen uiteen van ongeveer
        &euro;170 tot &euro;200 per maand per volwassene, tegenover gemiddeld &euro;159 in 2026. Voor
        het verplicht eigen risico spreken de bronnen elkaar tegen: de ene raming houdt het op
        &euro;385, ongewijzigd, de andere noemt &euro;400. Ik reken hier bewust geen tussenbedrag,
        want geen van beide is nu al hard te noemen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voor een gezin met twee volwassenen betekent alleen al de zorgpremie een stijging van
        ergens tussen de &euro;20 en &euro;80 per maand samen, afhankelijk van welke raming het
        bij het rechte eind heeft. Dat is een van de posten die in januari op de rekening
        verschijnt zonder dat er ergens een brief over is gestuurd die het in één keer optelt bij
        de rest.
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
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ color: "#16211F", fontWeight: 500 }}>
          Circa &euro;70.000 samen.
        </strong>{" "}
        Kindgebonden budget daalt met ongeveer {eur(voorbeeld70.perMaand)} per maand door de nieuwe
        afbouwschijf. Krijgt dit gezin nu nog niet het maximum voor het eerste kind op de opvang,
        dan compenseert de stap naar 96 procent daar een deel van.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ color: "#16211F", fontWeight: 500 }}>
          Circa &euro;100.000 samen.
        </strong>{" "}
        Kindgebonden budget is met de maatregel al vrijwel nul; het feitelijke gemis door de
        maatregel zelf is ongeveer {eur(voorbeeld100.perMaand)} per maand. De beperktere indexatie
        van belastingschijven telt hier zwaarder mee dan bij het gezin hierboven.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ color: "#16211F", fontWeight: 500 }}>
          Circa &euro;140.000 samen.
        </strong>{" "}
        Kindgebonden budget is op dit inkomen met of zonder de maatregel al nul, dus die specifieke
        wijziging kost dit gezin niets extra. Kinderopvangtoeslag kan nog relevant zijn als er
        kinderen op de opvang zitten. De beperktere indexatie telt hier het zwaarst mee, en in
        verhouding tot het totale inkomen het minst.
      </p>
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

      {/* Slotblok: Geldscan als tekstlink */}
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
