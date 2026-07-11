import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function AlleenWonenGoedSalarisTochKrap() {
  return (
    <>
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom alleen wonen met een goed salaris toch krap voelt, ook zonder gezin dat op de begroting drukt",
            "De stille posten die er bij een leven alleen ongemerkt bijkomen",
            "Dat het zelden aan jou ligt, en wat wel helpt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Je woont alleen. Je verdient goed. Geen scheiding achter de rug, geen
        kinderen die geld kosten, geen grote schulden. En toch is het aan het
        einde van de maand gewoon weg. Precies dat maakt het zo verwarrend: er is
        geen aanleiding om op te wijzen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Veel alleenstaanden met een prima inkomen schamen zich er stiller voor dan
        stellen. Want als je alleen bent en genoeg verdient, dan zal het wel aan
        jou liggen. Dat gevoel klopt bijna nooit, en ik leg hieronder uit waarom.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: alleen wonen is per persoon duurder dan samenwonen, omdat je
        alle vaste lasten in je eentje draagt en niets deelt. Bij een goed salaris
        valt dat niet op als tekort, het lekt stil weg. Het is een
        structuurprobleem, geen kwestie van discipline.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom alleen wonen per persoon duurder is
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een stel deelt de huur of hypotheek, de energierekening, het internet en
        de boodschappen die je toch al in huis hebt. Jij betaalt dat allemaal in
        je eentje, terwijl die lasten nauwelijks lager zijn dan voor twee. Dit
        heet het single-nadeel, en het is de belangrijkste reden dat een
        alleenstaande met een goed salaris netto vaak minder ruimte heeft dan een
        tweeverdiener met eenzelfde bedrag per persoon.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bekijk voor de concrete bedragen ook{" "}
        <Link href="/inzichten/kosten-levensonderhoud-alleenstaande-2026" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">de kosten van levensonderhoud voor een alleenstaande</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        De stille posten van een leven alleen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Zonder huisgenoot om mee te koken of thuis te blijven, verschuift er
        ongemerkt geld naar gemak en naar buiten de deur: vaker uit eten,
        bezorgen, een lidmaatschap hier, een borrel daar. Geen van die uitgaven
        voelt als een misstap, en juist daarom tellen ze ongezien op tot een fors
        bedrag per maand. Een gemiddeld huishouden geeft inmiddels ruim 200 euro
        per maand aan abonnementen uit, en alleen betaal je die volledig zelf.
      </p>

      <h2 className="font-display" style={h2}>
        Je hebt niemand om het aan te toetsen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Wie samenwoont, botst af en toe over geld en krijgt daardoor vanzelf een
        spiegel. Alleen mis je die. Je enige referentie wordt dan wat je online
        ziet, en dat beeld is vertekend. Daardoor voelt het al snel alsof iedereen
        het beter voor elkaar heeft dan jij. Hoe dat werkt, lees je in{" "}
        <Link href="/inzichten/waarom-lijkt-iedereen-rijker" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">waarom iedereen rijker lijkt dan jij</Link>{" "}en{" "}
        <Link href="/inzichten/money-dysmorphia-uitleg" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">de uitleg over money dysmorphia</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Het ligt niet aan jou, het ligt aan de structuur
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Meer verdienen lost dit niet op, want je uitgaven schuiven gewoon mee
        omhoog. Wat wel werkt, is je inkomen meteen verdelen zodra het binnenkomt,
        in plaats van alles op een rekening te laten staan en te kijken wat er
        overblijft. Hoe die verdeling praktisch werkt, staat in{" "}
        <Link href="/inzichten/geld-indelen-salaris-potjes-systeem" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">je salaris slim indelen met potjes</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        De eerste stap is inzicht, niet bezuinigen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Pak de afschriften van de laatste twee maanden en tel drie dingen op: je
        vaste lasten, je dagelijkse uitgaven en wat er overblijft. Vaak zie je dan
        meteen waar de ruimte zit, zonder dat je zuiniger hoeft te gaan leven.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je dat ik meekijk in jouw eigen cijfers? Doe de{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">gratis analyse</Link>{" "}en vergelijk je uitgaven met vergelijkbare huishoudens.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Lees ook{" "}
        <Link href="/inzichten/waar-blijft-het-bij-fatima" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">waar het bij Fatima bleef (alleenstaand)</Link>{" "}en{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld-einde-maand" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">waar je geld aan het einde van de maand blijft</Link>.
      </p>
    </>
  );
}
