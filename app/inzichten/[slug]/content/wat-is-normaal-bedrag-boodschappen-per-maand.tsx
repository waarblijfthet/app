import Link from "next/link";
import { BoodschappenKloof } from "@/components/artikel/BoodschappenKloof";
import BoodschappenSlider from "@/components/artikel/BoodschappenSlider";
import BenchmarkMail from "@/components/artikel/BenchmarkMail";

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
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat een normaal boodschappenbedrag is per persoon, per stel en per gezin",
            "Waarom de Nibud-norm een ondergrens is en geen gemiddelde, en wat echte huishoudens uitgeven",
            "Wat drie echte huishoudens uitgeven, waar het misgaat en wat ik ze zou aanraden",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Een gezin van vijf, kinderen van 12, 10 en 8 jaar. Elke week naar de
        supermarkt, af en toe naar de bakker en de slager. Geen avontuurlijke
        keukens, geen biologisch vlees, geen dure kaasjes. Gewoon normaal eten.
        En toch €1.400 per maand aan boodschappen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Klinkt als veel. Maar is het dat? De Nibud-norm zegt voor dit gezin
        ongeveer €700. De praktijk ligt op het dubbele. Niet door verspilling of
        luxe, maar doordat drie opgroeiende kinderen eten, en eten kost geld.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit speelt niet alleen bij grote gezinnen. Of je nu alleen woont, samen
        bent, of een vol huis hebt: het bedrag dat je echt uitgeeft ligt bijna
        altijd boven de norm. Hieronder zie je wat normaal is per huishouden,
        waar dat verschil vandaan komt, en wat drie echte huishoudens doen om het
        bedrag omlaag te krijgen.
      </p>

      {/* Tabel norm vs realiteit */}
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
      <p className="font-body text-text-soft text-sm" style={{ ...p, color: "#8A7B63" }}>
        Norm: Nibud-minimumbegroting voor voeding, juli 2025. Realistisch: een
        breder mandje inclusief drogist, bakker en tussendoor, gebaseerd op
        transactiedata van ABN AMRO en op wat ik in de praktijk zie. Indicatief,
        je eigen bedrag hangt af van winkelkeuze, leeftijd van de kinderen en
        regio.
      </p>

      <BoodschappenKloof />

      <BoodschappenSlider />

      <BenchmarkMail />

      <h2 className="font-display" style={h2}>
        Waarom klopt de Nibud-norm niet met je kassabon?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud-bedrag is een minimum voor voeding, letterlijk berekend op
        basis van calorieën en voedingsstoffen. Het is niet wat een gemiddeld
        huishouden uitgeeft. Het is wat je minimaal nodig hebt om gezond te eten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is een wezenlijk verschil, en het verklaart meteen waarom bijna
        iedereen boven de norm uitkomt. Wat er niet in zit: brood van de bakker,
        vlees van de slager, drogisterijproducten, schoollunches, tussendoortjes
        voor sport, koekjes voor een verjaardag. Die kosten zijn reëel en
        onvermijdelijk, maar ze staan niet in de basistabel.
      </p>

      <h2 className="font-display" style={h2}>
        Wat geven mensen écht uit?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hier heb ik harde cijfers voor. ABN AMRO analyseerde de betalingen van
        150.000 huishoudens. Het doorsnee huishouden gaf €585 per maand uit aan
        boodschappen, met een spreiding van €300 tot €785. Dat is geen enquête
        waarin mensen hun bedrag te laag inschatten, maar echte transacties. En
        het ligt ruim boven de Nibud-minimumnorm. Het CBS komt, omgerekend naar
        het prijspeil van 2025, zelfs op ongeveer €640.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De conclusie is simpel. De norm vertelt je wat een zuinig, gezond
        minimumpakket kost. De realiteit is een breder, duurder mandje. Boven de
        norm zitten is dus geen teken dat je iets fout doet, het is wat boodschappen
        in de praktijk kosten.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom zijn pubers zo duur?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is het punt dat bijna niemand je vertelt. Een kind van 12 eet in de
        praktijk bijna evenveel als een volwassene. Een gezin met drie kinderen
        van 8, 10 en 12 jaar heeft geen kinderkosten meer in de oude zin, het zijn
        drie bijna-volwassenen qua eetgedrag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Tel daarbij op: eigen schoollunch meenemen, eten na het sporten, grotere
        verpakkingen omdat ze meer eten. Dat verklaart waarom een gezin met
        oudere kinderen makkelijk op €1.200 tot €1.400 per maand uitkomt, zonder
        dat er iets geks aan de hand is.
      </p>

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
          Geen gezin, wel een hoge rekening. Ze kopen veel vers gemaakte
          gemaksmaaltijden, van die gezonde bakjes uit de supermarkt. Voelt niet
          als luxe, maar tikt hard aan. Neem een kant-en-klare pokebowl. In de
          supermarkt kost die al snel €7 tot €8. Zelf maken, met rijst, een stuk
          zalm, edamame en wat groente, kost ongeveer €3 tot €4 per portie.
        </p>
        <p className="font-body text-text-soft text-sm" style={{ marginBottom: "0.75rem", fontWeight: 300 }}>
          Eten ze met zijn tweeën drie keer per week zo&apos;n maaltijd, dan is
          dat kant-en-klaar ongeveer €190 per maand, en zelfgemaakt ongeveer €100.
          Dat is €90 verschil op één gerecht. Reken dat door over alle
          gemaksmaaltijden en je zit zo €150 tot €200 per maand hoger dan nodig.
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
      <p className="font-body text-text-soft" style={p}>
        Wil je weten hoe je boodschappenuitgaven zich verhouden tot vergelijkbare
        huishoudens, met dezelfde samenstelling en hetzelfde inkomensniveau? Doe
        de{" "}
        <Link
          href="/analyse"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          gratis analyse
        </Link>{" "}
        en zie het direct op je scherm. Wil je het daarna samen doorlopen, dan
        kan dat in een eenmalig adviesgesprek.
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
        Uit de praktijk: lees{" "}
        <a href="/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe een gezin van €950 naar €720 per maand ging</a>.
      </p>
    </>
  );
}
