import Link from "next/link";
import { BoodschappenKloof } from "@/components/artikel/BoodschappenKloof";
import BoodschappenSlider from "@/components/artikel/BoodschappenSlider";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const h3 = {
  fontSize: "1.15rem",
  color: "#16211F",
  marginTop: "0",
  marginBottom: "0.5rem",
  fontWeight: 500,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WatIsNormaalBedragBoodschappen() {
  return (
    <>
      {/* Kort antwoord: het getal meteen, boven de vouw */}
      <div className="rounded-xl p-5 mb-4" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Kort antwoord: een normaal boodschappenbedrag ligt hoger dan de meeste mensen denken.
        </p>
        <ul className="space-y-1.5 mb-3">
          {[
            ["Alleen", "€300 tot €400 per maand"],
            ["Samen, geen kinderen", "€550 tot €700"],
            ["Gezin met jonge kinderen", "€700 tot €900"],
            ["Gezin met pubers", "€1.000 tot €1.400"],
          ].map(([wie, bedrag], i) => (
            <li key={i} className="flex justify-between gap-3 font-body text-sm" style={{ color: "#16211F" }}>
              <span>{wie}</span>
              <span className="font-medium text-right">{bedrag}</span>
            </li>
          ))}
        </ul>
        <p className="font-body text-sm" style={{ color: "#4A5A56", margin: 0 }}>
          De Nibud-norm ligt daar flink onder, want dat is een minimum en geen gemiddelde.
          Boven de norm zitten is dus normaal, geen teken dat je iets fout doet.
        </p>
      </div>

      <p className="font-body text-sm mb-8" style={{ color: "#4A5A56" }}>
        Wil je weten waar het bij jóú weglekt, niet alleen bij boodschappen?{" "}
        <Link href="/geldscan" className="hover:underline" style={{ color: "#0B7A6E", fontWeight: 500, textDecoration: "none" }}>
          Laat mij je cijfers nakijken met de geldscan (€49) &rarr;
        </Link>
      </p>

      <p className="font-body text-text-soft" style={p}>
        Neem een gezin van vijf met drie opgroeiende kinderen: gewoon eten, niks
        bijzonders, en toch €1.400 per maand. De Nibud-norm zegt voor dit gezin
        ongeveer €700, de praktijk ligt op het dubbele. Niet door verspilling,
        maar doordat opgroeiende kinderen nu eenmaal veel eten. Hieronder per
        huishouden wat normaal is, waarom het hoger ligt dan de norm, en wat drie
        echte huishoudens doen om het omlaag te krijgen.
      </p>

      {/* Antwoord in detail: tabel */}
      <h2 className="font-display" style={h2}>
        Wat is een normaal boodschappenbedrag per huishouden?
      </h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#F7F8F7", borderBottom: "1.5px solid #E6E9E7" }}>
              <th className="text-left px-3 py-2 font-body font-semibold" style={{ color: "#16211F" }}>Huishouden</th>
              <th className="text-right px-3 py-2 font-body font-semibold" style={{ color: "#16211F" }}>Norm (Nibud-minimum)</th>
              <th className="text-right px-3 py-2 font-body font-semibold" style={{ color: "#16211F" }}>Realistisch per maand</th>
            </tr>
          </thead>
          <tbody className="font-body text-text-soft">
            {[
              ["Alleenstaande", "€272", "€300 tot €400"],
              ["Twee personen", "€495", "€550 tot €700"],
              ["Gezin, twee jonge kinderen", "€634", "€700 tot €900"],
              ["Gezin met pubers", "€822", "€1.000 tot €1.400"],
              ["Groot of samengesteld gezin", "hoger", "€1.500 tot €2.000"],
            ].map((rij, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #F0F3F1" }}>
                <td className="px-3 py-2">{rij[0]}</td>
                <td className="px-3 py-2 text-right">{rij[1]}</td>
                <td className="px-3 py-2 text-right" style={{ color: "#16211F", fontWeight: 500 }}>{rij[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#8B958F" }}>
        Norm: Nibud-minimumbegroting voor voeding, juli 2025. Realistisch: een
        breder mandje inclusief drogist, bakker en tussendoor, gebaseerd op
        transactiedata van ABN AMRO en op wat ik in de praktijk zie. Indicatief,
        je eigen bedrag hangt af van winkelkeuze, leeftijd van de kinderen en
        regio.
      </p>

      {/* Visual: de kloof tussen norm en realiteit */}
      <BoodschappenKloof />

      {/* Waarom: norm-uitleg en echte cijfers samengevoegd */}
      <h2 className="font-display" style={h2}>
        Waarom ligt het bijna altijd boven de norm?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud-bedrag is een minimum voor voeding, letterlijk berekend op
        calorieën en voedingsstoffen. Het is niet wat een gemiddeld huishouden
        uitgeeft, maar wat je minimaal nodig hebt om gezond te eten. Wat er niet
        in zit: brood van de bakker, vlees van de slager, drogisterijproducten,
        schoollunches, tussendoortjes voor sport, koekjes voor een verjaardag.
        Die kosten zijn reëel en onvermijdelijk, maar staan niet in de basistabel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Echte cijfers bevestigen dat. ABN AMRO analyseerde de betalingen van
        150.000 huishoudens: het doorsnee huishouden gaf €585 per maand uit aan
        boodschappen, met een spreiding van €300 tot €785. Dat zijn geen
        inschattingen uit een enquête, maar echte transacties. Het CBS komt,
        omgerekend naar het prijspeil van 2025, zelfs op ongeveer €640. Allebei
        ruim boven de Nibud-minimumnorm.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De conclusie is simpel: de norm vertelt je wat een zuinig, gezond
        minimumpakket kost, de realiteit is een breder en duurder mandje. Boven
        de norm zitten is dus geen teken dat je iets fout doet, het is wat
        boodschappen in de praktijk kosten.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom zijn pubers zo duur?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is het punt dat bijna niemand je vertelt. Een kind van 12 eet in de
        praktijk bijna evenveel als een volwassene. Een gezin met drie kinderen
        van 8, 10 en 12 jaar heeft geen kinderkosten meer in de oude zin, het
        zijn drie bijna-volwassenen qua eetgedrag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Tel daarbij op: eigen schoollunch meenemen, eten na het sporten, grotere
        verpakkingen omdat ze meer eten. Dat verklaart waarom een gezin met
        oudere kinderen makkelijk op €1.200 tot €1.400 per maand uitkomt, zonder
        dat er iets geks aan de hand is.
      </p>

      {/* Interactief: waar zit jij? */}
      <BoodschappenSlider />

      {/* Drie echte huishoudens */}
      <h2 className="font-display" style={h2}>
        Drie echte huishoudens, en wat ik ze zou aanraden
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Cijfers zeggen weinig zonder context. Daarom drie huishoudens die ik
        ken, met hun echte bedrag, waar het misgaat en wat de eerste concrete
        stap zou zijn.
      </p>

      {/* Case 1 */}
      <div className="rounded-xl border p-5 my-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
        <h3 className="font-display" style={h3}>Samengesteld gezin van zes, rond de €2.000 per maand</h3>
        <p className="font-body text-text-soft text-sm" style={{ marginBottom: "0.75rem", fontWeight: 300 }}>
          Twee ouders, drie pubers en een kleuter. Het grootste deel gaat naar
          brood, beleg, snacks en vlees. Ze werken met een weekmenu en kopen uit
          de aanbiedingen, maar het loopt vaak mis: niet iedereen lust alles, en
          er wordt te veel gemaakt. Wat overblijft, gaat de prullenbak in.
        </p>
        <p className="font-body text-sm" style={{ marginBottom: "0.4rem", color: "#16211F", fontWeight: 500 }}>Wat ik zou doen</p>
        <ul className="space-y-1.5 font-body text-sm text-text-soft" style={{ marginBottom: 0, paddingLeft: "1.1rem", listStyle: "disc" }}>
          <li>Bouw het weekmenu rond vier hoofdgerechten die iederéén eet, en varieer alleen de groente of saus eromheen. Dan hoef je nooit dubbel te koken.</li>
          <li>Kook op afgemeten porties, en reken een puber als een volwassene. Plan één vaste restjesdag per week, zo wordt teveel opgegeten in plaats van weggegooid.</li>
          <li>Draai de volgorde om: maak eerst het menu, kies dán de aanbiedingen die erbij passen. Een aanbieding die niet in je menu past is geen besparing, maar een extra uitgave.</li>
          <li>Laat de kleuter een mini-versie van hetzelfde eten meekrijgen, nooit apart koken.</li>
        </ul>
      </div>

      {/* Case 2 */}
      <div className="rounded-xl border p-5 my-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
        <h3 className="font-display" style={h3}>Mats en Elsa, tweeverdieners, bijna €1.000 per maand</h3>
        <p className="font-body text-text-soft text-sm" style={{ marginBottom: "0.75rem", fontWeight: 300 }}>
          Geen gezin, wel een hoge rekening. Ze kopen veel verse
          gemaksmaaltijden, van die gezonde bakjes uit de supermarkt. Voelt niet
          als luxe, maar tikt hard aan: een kant-en-klare pokebowl kost al snel
          €7 tot €8, terwijl je &apos;m zelf maakt voor €3 tot €4. Over alle
          gemaksmaaltijden samen zit je zo €150 tot €200 per maand hoger dan
          nodig.
        </p>
        <p className="font-body text-sm" style={{ marginBottom: "0.4rem", color: "#16211F", fontWeight: 500 }}>Wat ik zou doen</p>
        <ul className="space-y-1.5 font-body text-sm text-text-soft" style={{ marginBottom: 0, paddingLeft: "1.1rem", listStyle: "disc" }}>
          <li>Zweer niet alles af, dat houd je toch niet vol. Vervang de twee duurste gemaksgewoontes per week door een zelfgemaakte versie, juist de simpele zoals een bowl of een pasta.</li>
          <li>Maak die in het weekend in één keer voor twee of drie dagen. Je houdt het gemak waar het je echt tijd bespaart, en betaalt alleen voor wat je niet zelf wilt doen.</li>
        </ul>
      </div>

      {/* Case 3 */}
      <div className="rounded-xl border p-5 my-5" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
        <h3 className="font-display" style={h3}>Jurgen en Rachel, drie kinderen van 12 en ouder, €1.300 en willen naar €1.000</h3>
        <p className="font-body text-text-soft text-sm" style={{ marginBottom: "0.75rem", fontWeight: 300 }}>
          Ze hebben het niet breed en doen al veel goed: Too Good To Go, de
          afgeprijsde bakken bij de Jumbo, en ze bedenken creatief gerechten.
          Plannen vooruit, dat zit prima. En toch blijven ze op €1.300 hangen. De
          twee lekken zitten ergens anders: er wordt nog te vaak even snel naar de
          winkel gegaan, en de porties zijn te groot, met veel vlees en weinig
          groente.
        </p>
        <p className="font-body text-sm" style={{ marginBottom: "0.4rem", color: "#16211F", fontWeight: 500 }}>Wat ik zou doen</p>
        <ul className="space-y-1.5 font-body text-sm text-text-soft" style={{ marginBottom: 0, paddingLeft: "1.1rem", listStyle: "disc" }}>
          <li>Snijd de losse tussenritjes weg: één hoofdmoment per week, hooguit één korte verse aanvulling. Elke losse rit kost €10 tot €20 aan dingen die niet op het lijstje stonden.</li>
          <li>Meet vlees af op 100 tot 125 gram per persoon en vul aan met groente, peulvruchten of aardappel. Minder vlees en meer groente is goedkoper en gezonder tegelijk.</li>
          <li>Twee vleesloze dagen per week met bonen, linzen of ei scheelt direct tientallen euro&apos;s per maand.</li>
        </ul>
        <p className="font-body text-text-soft text-sm" style={{ marginTop: "0.75rem", marginBottom: 0, fontWeight: 300 }}>
          Het laatste stuk van €1.300 naar €1.000 zit bij hen niet in nog slimmer
          shoppen, dat doen ze al. Het zit in routine en porties. Dat is goed
          nieuws, want daar heb je zelf de hand in.
        </p>
      </div>

      <h2 className="font-display" style={h2}>
        Wat kun je er realistisch aan doen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De eerste stap is stoppen met schamen dat je boven de Nibud-norm zit.
        Bijna iedereen doet dat, en zelden door verspilling.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De tweede stap is uitzoeken waar jouw bedrag vandaan komt. Niet om
        drastisch te bezuinigen, maar om bewuste keuzes te maken. Is het de
        slager drie keer per week, de bakker naast de supermarkt, of de losse
        ritjes die optellen?
      </p>
      <p className="font-body text-text-soft" style={p}>
        De derde stap is één structurele aanpassing kiezen. Bij de meeste
        huishoudens werkt een weekmenu het snelst, niet omdat je goedkoper
        inkoopt, maar omdat je minder weggooit en minder impulsaankopen doet. Wil
        je ook kijken of producten elders goedkoper zijn?{" "}
        <Link
          href="/inzichten/vergelijken-boodschappen-nederland-duitsland"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          Boodschappen goedkoper in Duitsland
        </Link>{" "}
        legt uit wat waar loont.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een realistisch doel: 10 tot 15 procent besparen op je huidige bedrag.
        Voor een huishouden dat €1.000 uitgeeft is dat €100 tot €150 per maand,
        oftewel €1.200 tot €1.800 per jaar, zonder dat je kwaliteit inlevert.
      </p>

      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}
      >
        <p className="font-body text-sm" style={{ color: "#16211F" }}>
          <strong>Uit de praktijk.</strong> In de gesprekken die ik voer schatten
          huishoudens hun boodschappen bijna altijd €100 tot €200 te laag in, niet
          omdat ze liegen, maar omdat de tussendoor-momenten, de drogist en de
          bakker er niet in zitten. Pas als ze een maand écht alles bij elkaar
          optellen, zien ze het echte bedrag.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Benieuwd hoe anderen het aanpakten? Lees{" "}
        <a href="/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe een gezin van €950 naar €720 per maand ging</a>.
      </p>
    </>
  );
}
