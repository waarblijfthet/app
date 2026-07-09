import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function AutoKopenOfLeasenKostenPerMaand() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat een auto écht kost per maand, inclusief afschrijving, de kostenpost zonder maandelijkse rekening",
            "Wanneer private lease voordeliger is dan kopen, en wanneer niet",
            "Waarom de tweede auto voor tweeverdieners vaak de grootste verborgen last is",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        De auto is voor veel gezinnen de op één na grootste vaste last, na het
        huis. En tegelijk de last die het slechtst wordt ingeschat, omdat de
        kosten verspreid zitten over de tank, de verzekering, de wegenbelasting,
        het onderhoud en, vooral, de afschrijving die je niet ziet.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: een eigen auto kost volgens de ANWB al gauw €413 per maand
        voor een compacte auto, rond €550 voor een kleine middenklasser en zo&apos;n
        €647 voor het middensegment, álle kosten meegerekend. Private lease is
        niet per se duurder of goedkoper; het verschil zit vooral in
        voorspelbaarheid versus flexibiliteit.
      </p>

      <h2 className="font-display" style={h2}>
        Wat een eigen auto écht kost per maand
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De maandlast van een eigen auto bestaat uit vaste kosten (afschrijving,
        verzekering, motorrijtuigenbelasting, onderhoud) en variabele kosten
        (brandstof, banden, reparaties). De afschrijving, het waardeverlies van
        de auto, is meestal de grootste én de meest onderschatte post, omdat er
        geen maandelijkse rekening voor binnenkomt. De ANWB rekent voor een
        gemiddelde middenklasser zo&apos;n €550–650 per maand all-in.
      </p>

      <h2 className="font-display" style={h2}>
        Private lease of kopen: wat is voordeliger?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De vraag &ldquo;private lease of kopen?&rdquo; heeft geen vast antwoord. Bij private lease betaal je één vast bedrag per maand voor (bijna) alles
        behalve brandstof. Leasemaatschappijen kopen auto&apos;s met korting in
        en spreiden risico, waardoor lease soms verrassend concurrerend is met
        zelf rijden. Het voordeel is voorspelbaarheid: geen onverwachte
        reparatierekening. Het nadeel is dat je vastzit aan een contract, een
        kilometerlimiet en geen eigen vermogen opbouwt in de auto.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Zelf kopen is vaak goedkoper over de hele rit, zeker bij een
        betrouwbare occasion die je lang rijdt, maar dan draag je zelf het
        risico van pech en waardeverlies. De vuistregel: rijd je weinig en wil je
        rust, dan kan lease lonen; rijd je veel of houd je een auto lang, dan is
        kopen meestal voordeliger.
      </p>

      <h2 className="font-display" style={h2}>
        De verborgen valkuil: de tweede auto
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Voor tweeverdieners is de echte vraag vaak niet "kopen of leasen", maar
        "hebben we twee auto&apos;s nodig?". Een tweede auto verdubbelt bijna de
        autolast, al snel €1.000+ per maand samen. Dat is precies zo&apos;n post
        die meegroeit met het inkomen zonder dat iemand het tegenhoudt; zie{" "}
        <Link href="/inzichten/tweeverdieners-toch-krap" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">tweeverdieners en toch krap</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe je de juiste keuze maakt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Reken eerst je huidige auto eerlijk door, inclusief afschrijving, en
        zet dat naast een leaseofferte voor dezelfde kilometers. Vergelijk de
        totale maandlast, niet alleen de leaseprijs versus de tank. Pas dan zie
        je wat een keuze echt kost.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je zien hoe jullie autokosten zich verhouden tot vergelijkbare
        gezinnen?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}— vervoer is één van de categorieën die we vergelijken.
      </p>
    </>
  );
}
