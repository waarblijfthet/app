import Link from "next/link";
import { NibudVergelijker } from "@/components/artikel/NibudVergelijker";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function NibudBoodschappenVersusWerkelijkheid() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat de Nibud-norm voor boodschappen werkelijk meet, een minimum voor voeding, geen gemiddelde",
            "Wat échte gezinnen in Nederland uitgeven en waarom bijna niemand de Nibud-norm haalt",
            "Dat boven de norm zitten in de meeste gevallen niet betekent dat je te veel uitgeeft",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Het Nibud hanteert voor een gezin van twee ouders en twee kinderen een
        minimum boodschappenbudget van €627 per maand. Dat getal is gebaseerd op
        berekeningen van het Voedingscentrum en de Nederlandse Vereniging van
        Diëtisten, wetenschappelijk onderbouwd, regelmatig bijgewerkt, en voor
        de meeste gezinnen volledig onhaalbaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Niet omdat gezinnen gek doen. Maar omdat de Nibud-norm iets anders meet
        dan wat mensen in de supermarkt uitgeven. Het verschil begrijpen is het
        begin van grip krijgen op je boodschappenbudget.
      </p>

      <NibudVergelijker />

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: het Nibud houdt 627 euro aan voor een gezin van vier, maar dat is een minimum dat bijna niemand haalt. In de praktijk ligt het vaak flink hoger, en dat komt niet door verspilling. Hieronder het eerlijke verhaal achter de norm.
      </p>

      <h2 className="font-display" style={h2}>
        Wat meet het Nibud eigenlijk?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud berekent de minimale kosten voor voeding op basis van
        referentievoedingen van het Voedingscentrum en calorische normen van de
        Nederlandse Vereniging van Diëtisten, bijgewerkt in 2026. Het gaat om
        een minimum voor gezonde voeding, thuis bereid, gekocht bij een
        gemiddelde supermarkt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat er niet in zit: brood van de bakker, vlees van de slager,
        drogisterijproducten, schoonmaakmiddelen, koffie, frisdrank, snoep,
        chips, en alles wat "tussendoor" wordt gekocht. Geen maaltijdboxen, geen
        kant-en-klaar, geen thuisbezorgd.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud-budget is een minimumgrens voor gezonde voeding. Het is geen
        beschrijving van hoe een normaal Nederlands gezin boodschappen doet.
      </p>

      <h2 className="font-display" style={h2}>
        Wat geven gezinnen werkelijk uit?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De data is consistent, en schrikbarend consistent in één richting.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een mamablogger met een gezin van vier schreef in december 2024 dat ze
        dat jaar €8.830 bij Albert Heijn alleen al had uitgegeven, €737 per
        maand, en dan had ze drogisterijproducten en de bakker nog niet
        meegerekend. Haar conclusie: "Niet eens zo heel gek voor een gezin van
        vier."
      </p>
      <p className="font-body text-text-soft" style={p}>
        Op het forum Zeg maar Yes kozen van 51 respondenten slechts zeven voor
        een bedrag onder de €500 per maand. De grootste groep zat tussen €700 en
        €900.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Nibud's eigen Prijzengids 2025/2026 laat zien dat een gezin met twee
        puberkinderen minimaal €854 per maand uitgeeft aan voeding alleen, bijna
        €230 meer dan het basisbudget voor een gezin van vier. Pubers eten bijna
        net zoveel als volwassenen, en dat zit onvoldoende in de
        standaardtabellen.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom hanteert het Nibud dan die lagere norm?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De Nibud-norm is een minimum, geen gemiddelde. Het is ontworpen als
        referentiepunt: dit is wat een huishouden minimaal nodig heeft om gezond
        te eten. Het is niet bedoeld als budgetadvies voor een doorsnee gezin.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het probleem ontstaat als mensen die norm gebruiken als benchmark voor
        hun eigen situatie. Als je €850 uitgeeft en de norm is €627, dan lijkt
        het alsof je €223 te veel uitgeeft. Maar als je gezin pubers heeft, bij
        AH winkelt, en ook drogisterijproducten meeneemt, dan is €850 volkomen
        normaal.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud weet dit ook. Op hun site staat expliciet dat de bedragen
        minimumrichtlijnen zijn en dat de werkelijke kosten afhangen van het type
        huishouden, de regio en de levensstijl.
      </p>

      <h2 className="font-display" style={h2}>
        Wat betekent dit voor jouw budget?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het betekent ten eerste dat je jezelf niet hoeft te vergelijken met de
        Nibud-norm als absolute maatstaf. Het relevante getal is: hoeveel geef
        jij uit, en hoe verhoudt dat zich tot vergelijkbare gezinnen in
        vergelijkbare omstandigheden?
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het betekent ten tweede dat er vrijwel altijd ruimte zit, niet door
        drastisch te bezuinigen, maar door te begrijpen waar het geld naartoe
        gaat. Voedselverspilling, tussendoor-aankopen, drogisterij in de
        supermarkt: dat zijn de drie categorieën met de meeste winst per
        geïnvesteerde minuut. Meer over die aanpak lees je in het artikel over{" "}
        <Link
          href="/inzichten/hoe-bespaar-je-op-boodschappen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          hoe je op boodschappen bespaart
        </Link>
        .
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
          Benieuwd hoe jouw uitgaven zich verhouden tot vergelijkbare huishoudens? Doe de gratis analyse en zie het meteen. Wil je daarna dat ik persoonlijk naar je cijfers kijk en je drie grootste lekken op een rij zet, dan kan dat met de geldscan (€49).
        </p>
        <Link href="/analyse" className="btn-primary">
          Doe de gratis analyse &rarr;
        </Link>
        <p className="font-body text-sm" style={{ marginTop: "0.75rem", marginBottom: 0 }}>
          <Link href="/geldscan" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Of laat mij je cijfers persoonlijk nakijken (€49)</Link>
        </p>
      </div>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}
      >
        <p className="font-body text-sm" style={{ color: "#16211F" }}>
          <strong>Uit de praktijk.</strong> De Nibud-norm is een ondergrens, geen gemiddelde, dat zie ik telkens terug. Bijna geen enkel gezin dat ik spreek haalt 'm, en dat hoeft ook niet. Het gaat er niet om dat je 'de norm' redt, maar dat je weet waar je zelf zit en of dat een bewuste keuze is.
        </p>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Uit de praktijk: lees <a href="/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe een gezin zijn boodschappenbudget wél liet werken</a>.
      </p>
    </>
  );
}
