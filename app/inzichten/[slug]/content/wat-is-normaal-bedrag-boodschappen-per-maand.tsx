import Link from "next/link";
import BoodschappenSituatiekiezer from "@/components/artikel/BoodschappenSituatiekiezer";
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
            ["Eén ouder met twee kinderen", "€650 tot €850"],
            ["Gezin met jonge kinderen", "€700 tot €900"],
            ["Gezin met pubers", "€1.000 tot €1.400"],
          ].map(([wie, bedrag], i) => (
            <li key={i} className="flex justify-between gap-3 font-body text-sm" style={{ color: "#16211F" }}>
              <span>{wie}</span>
              <span className="font-medium text-right">{bedrag}</span>
            </li>
          ))}
        </ul>
        <p className="font-body text-sm" style={{ color: "#4A5A56", marginBottom: "0.6rem" }}>
          De Nibud-norm ligt daar flink onder, want dat is een minimum en geen gemiddelde.
          Boven de norm zitten is dus normaal, geen teken dat je iets fout doet.
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", margin: 0 }}>
          <strong style={{ fontWeight: 500 }}>Hierbij gerekend:</strong> eten, drinken, drogist en
          schoonmaakspullen. <strong style={{ fontWeight: 500 }}>Niet meegerekend:</strong> bezorgmaaltijden
          en uit eten. Bestel je regelmatig, reken daar dan 100 tot 250 euro per maand apart bij op. Je
          bankapp zet supermarktbezorging bij Supermarkt, dus daar kun je het niet uit halen.
        </p>
      </div>

      <BoodschappenSituatiekiezer />

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
              ["Eén ouder met twee kinderen", "€590", "€650 tot €850"],
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
        transactiedata van ABN AMRO en op de huishoudens die ik zelf heb
        doorgerekend. Indicatief, je eigen bedrag hangt af van winkelkeuze,
        leeftijd van de kinderen en regio. Zijn je kinderen een deel van de week
        bij de andere ouder, reken dan ongeveer 10 procent lager.
      </p>

      {/* Vijf echte huishoudens in plaats van forumcijfers. De persona-toets van
          30-jul wees uit dat de oude visual op forum-polls met 51 deelnemers het
          vertrouwen in alle getallen op deze pagina kostte, juist omdat er op
          dezelfde pagina een meting van 150.000 huishoudens staat. */}
      <div className="rounded-xl border p-5 my-8" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
        <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
          Wat vijf echte huishoudens werkelijk uitgaven
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Geen forumpolls of gemiddelden, maar vijf huishoudens die hun cijfers bij mij aanleverden.
          Hun complete rapport staat op deze site, met toestemming.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            ["Alleenstaand, huurwoning", "€475", "/rapporten/alleenstaand-huurwoning"],
            ["Stel zonder kinderen", "€690", "/rapporten/stel-zonder-kinderen"],
            ["Zzp met partner, geen kinderen", "€720", "/rapporten/zzp-wisselend-inkomen"],
            ["Eén ouder, kinderen van 7 en 11", "€790", "/rapporten/alleenstaande-ouder-twee-kinderen"],
            ["Gezin, kinderen van 9, 12 en 14", "€1.150", "/rapporten/tweeverdieners-drie-kinderen"],
          ].map(([wie, bedrag, href]) => (
            <Link
              key={href}
              href={href}
              className="flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:border-[#0B7A6E]"
              style={{ border: "1px solid #E6E9E7", textDecoration: "none" }}
            >
              <span className="font-body text-sm" style={{ color: "#4A5A56" }}>{wie}</span>
              <span className="font-body text-sm tabular-nums" style={{ color: "#16211F", fontWeight: 600 }}>{bedrag}</span>
            </Link>
          ))}
        </div>
        <p className="font-body text-xs mt-4 mb-0" style={{ color: "#8B958F" }}>
          Bij twee van deze vijf was mijn conclusie dat er niets te repareren viel.{" "}
          <Link href="/rapporten" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">
            Bekijk alle vijf de rapporten
          </Link>
          .
        </p>
      </div>

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

      {/* Ingekort 30-jul: hier haakten twee persona's af omdat het tips zijn die
          ze al doen. Van drie uitgeschreven cases naar één blok. Scheelt ongeveer
          2.500 pixels op mobiel en haalt het aanbod dichter naar voren. */}
      <h2 className="font-display" style={h2}>
        Waar het bij hoge boodschappen meestal in zit
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Bij de huishoudens die ik doorreken kom ik steeds dezelfde drie dingen tegen, en geen ervan is
        onzuinig inkopen.
      </p>
      <ul className="space-y-2 font-body text-text-soft" style={{ marginBottom: "1.25rem", paddingLeft: "1.1rem", listStyle: "disc", fontWeight: 300 }}>
        <li>
          <strong style={{ color: "#16211F", fontWeight: 500 }}>Losse tussenritjes.</strong> Elke extra
          rit naar de winkel kost 10 tot 20 euro aan dingen die niet op het lijstje stonden. Eén
          hoofdmoment per week plus hooguit één verse aanvulling scheelt het meest.
        </li>
        <li>
          <strong style={{ color: "#16211F", fontWeight: 500 }}>Gemaksmaaltijden.</strong> Een
          kant-en-klare bowl kost 7 tot 8 euro, zelf gemaakt 3 tot 4. Bij een stel dat dit vaak doet
          loopt dat op naar 150 tot 200 euro per maand.
        </li>
        <li>
          <strong style={{ color: "#16211F", fontWeight: 500 }}>Porties en weggooien.</strong> Reken
          een puber als een volwassene, meet vlees af op 100 tot 125 gram per persoon en plan één vaste
          restjesdag. Dat werkt beter dan goedkoper inkopen.
        </li>
      </ul>
      <p className="font-body text-text-soft" style={p}>
        Doe je dit alles al en blijf je hoog zitten, dan zijn je boodschappen waarschijnlijk niet je
        probleem. Dat is goed nieuws, want dan hoef je daar niets meer aan te doen.
      </p>

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
        Een realistisch doel is 10 tot 15 procent van je huidige bedrag, dus 100 tot 150 euro bij een
        huishouden dat 1.000 euro uitgeeft. Reken dat wel even door voordat je eraan begint: als er aan
        het eind van de maand honderden euro&apos;s ontbreken, gaat die 100 euro je vraag niet
        oplossen.
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
