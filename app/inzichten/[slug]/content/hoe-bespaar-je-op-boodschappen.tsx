import Link from "next/link";
import { BoodschappenLekkage } from "@/components/artikel/BoodschappenLekkage";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function HoeBespaarJeOpBoodschappen() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waar het geld bij boodschappen ongemerkt weglekt, en het is zelden in het groot",
            "Welke twee gedragsveranderingen het meeste opleveren voor de minste moeite",
            "Dat dagelijks even snel iets halen een gezin gemiddeld €180 per maand extra kost",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Er is geen tekort aan bespaartips voor boodschappen. Koop huismerk. Ga
        naar Lidl. Schrijf een lijst. Iedereen weet het. En toch geeft een
        gemiddeld gezin van vier in 2026 structureel €200-400 meer uit dan ze
        zelf denken, zonder luxe, zonder verspilling in het groot.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het probleem zit niet in gebrek aan kennis. Het zit in gedrag dat zich
        onzichtbaar heeft ingesleten. Dagelijks even snel iets halen. Een
        kant-en-klare maaltijd omdat het een drukke dag was. Drogisterijproducten
        in het boodschappenkarretje gooien. Stuk voor stuk kleine beslissingen
        die optellen tot honderden euro's per maand.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit artikel gaat niet over wat je moet kopen. Het gaat over waar het
        geld ongemerkt weglekt, en welke aanpassingen het meeste opleveren voor
        de minste moeite.
      </p>

      <BoodschappenLekkage />

      <h2 className="font-display" style={h2}>
        Waarom weten mensen niet wat ze uitgeven aan boodschappen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Onderzoek laat consistent zien dat mensen hun boodschappenkosten met
        20-30% onderschatten. Dat is geen onoplettendheid, het is hoe het brein
        werkt. Je onthoudt de grote weekboodschap, niet de drie
        tussendoor-aankopen van €8.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voordly, een Nederlandse prijsvergelijker die dagelijks 14.000 producten
        bijhoudt, berekende dat dezelfde boodschappenlijst bij AH €74 kost en
        bij Aldi €63, maar dat het echte verschil voor de meeste gezinnen niet
        zit in de winkelkeuze maar in wat er ongepland wordt toegevoegd aan het
        karretje.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De snelste manier om de werkelijkheid te zien: pak je bankafschrift van
        de afgelopen maand en tel alle supermarkt- en drogisterijuitgaven op.
        Inclusief de kleine aankopen bij de AH To Go, de bakker, de slager. Het
        getal dat je dan ziet is bijna altijd hoger dan je verwacht.
      </p>

      <h2 className="font-display" style={h2}>
        De vijf plekken waar het meeste geld weglekt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Zie de interactieve grafiek hierboven voor de volledige breakdown. De
        samenvatting:
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Dagelijks boodschappen doen</strong> is de duurste gewoonte die
        de meeste mensen hebben. Niet omdat producten duurder zijn, maar omdat je
        zonder plan koopt. Een gezin dat drie keer per week even snel wat haalt
        versus één keer per week met een lijst: gemiddeld €180 per maand
        verschil, blijkt uit berekeningen van het Nibud.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Voedselverspilling</strong> kost een gemiddeld Nederlands
        huishouden €65 per maand. Wageningen University berekende dat 14% van
        alle boodschappen ongebruikt wordt weggegooid, niet door overdaad maar
        door gebrekkige planning. Wie een weekmenu maakt, koopt alleen wat nodig
        is.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>A-merken versus huismerk</strong> is het bekendste bespaarpunt,
        maar ook het meest genuanceerd. De Consumentenbond stelde vast dat
        A-merken gemiddeld 57% duurder zijn dan huismerken, maar dat het
        verschil het grootst is bij drogisterij, koffie en frisdrank, en het
        kleinst bij verse producten. Niet alles overschakelen, maar bewust kiezen
        per categorie.
      </p>

      <h2 className="font-display" style={h2}>
        Welke aanpassing levert het meeste op?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Niet de winkel wisselen. Niet stoppen met vlees. De meeste impact hebben
        twee gedragsveranderingen die samen minder dan een uur per week kosten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De eerste is een vaste boodschappendag met een weekmenu. Eén keer per
        week boodschappen doen op basis van wat je die week eet. De rest van de
        week niet meer naar de supermarkt, tenzij er echt iets ontbreekt. Dit
        pakt drie lekken tegelijk aan: tussendoor-aankopen, verspilling en
        impulsaankopen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De tweede is drogisterijproducten scheiden van je boodschappen.
        Tandpasta, shampoo, wasmiddel, babyverzorging, die haal je niet meer in
        de supermarkt maar bij een drogisterij of{" "}
        <Link
          href="/inzichten/vergelijken-boodschappen-nederland-duitsland"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          over de grens in Duitsland
        </Link>
        . Kassa vergeleek in 2025 dezelfde producten bij Kruidvat en DM, DM was
        54% goedkoper voor een mandje van 13 producten.
      </p>

      <h2 className="font-display" style={h2}>
        Wat als je nu al weinig uitgeeft?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dan is er waarschijnlijk iets anders aan de hand. Als je
        boodschappenkosten redelijk zijn maar er toch weinig overblijft aan het
        einde van de maand, zit het lek ergens anders, in vaste lasten,
        abonnementen of vervoer.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is het moment om het grotere plaatje te bekijken. Niet boodschappen
        alleen, maar{" "}
        <Link
          href="/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          wat normaal is voor jouw gezin
        </Link>{" "}
       , en wat er structureel misgaat.
      </p>

      {/* Intern CTA */}
      <div
        style={{
          backgroundColor: "#E7F1EE",
          borderRadius: "16px",
          padding: "1.5rem",
          marginTop: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <p className="font-body font-light text-text-soft" style={{ marginBottom: "1rem" }}>
          Benieuwd hoe jouw boodschappenkosten zich verhouden tot vergelijkbare
          gezinnen, en waar het lek bij jou zit?
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}
      >
        <p className="font-body text-sm" style={{ color: "#16211F" }}>
          <strong>Uit de praktijk.</strong> Bij een gezin dat we begeleidden waren de boodschappen het grootste lek: veel impulsaankopen, geen plan. Een weekbudget plus een korte check-in ná elke keer boodschappen hield ze scherp, juist op de momenten dat het misging.
        </p>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Uit de praktijk: lees <a href="/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe een gezin van €950 naar €720 per maand ging</a>.
      </p>
    </>
  );
}
