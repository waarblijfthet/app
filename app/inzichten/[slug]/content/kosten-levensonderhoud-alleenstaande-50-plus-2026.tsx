import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function KostenLevensonderhoudAlleenstaande50Plus2026() {
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
          Je hebt je leven opgebouwd. Alleen. En nu vraag je je af of wat je hebt opgebouwd
          genoeg is voor wat er nog komt.
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
            "Hoeveel AOW een alleenstaande in 2026 ontvangt en wat dat in de praktijk betekent",
            "Waarom de pensioensituatie van alleenstaanden structureel anders is dan die van samenwonenden",
            "Wat je nu nog kunt doen als je het gevoel hebt dat je pensioenplaatje niet klopt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Voor veel vijftigplussers die alleen zijn, begint er een andere soort financiële vraag te
        spelen. Niet meer alleen &ldquo;kom ik rond?&rdquo;, maar ook: &ldquo;kom ik rond als ik
        straks stop met werken?&rdquo;
      </p>
      <p className="font-body text-text-soft" style={p}>
        Die vraag is voor alleenstaanden anders dan voor mensen met een partner. Er is geen tweede
        pensioen, geen tweede AOW, en geen iemand die het inkomen aanvult als het terugvalt. Het
        plaatje staat of valt met wat jij zelf hebt opgebouwd.
      </p>

      <h2 className="font-display" style={h2}>
        Wat verandert er aan kosten boven de 50?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De vaste lasten blijven grotendeels hetzelfde als voor jongere alleenstaanden. Maar er
        zijn een paar kostenposten die boven de 50 vaker en zwaarder worden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Zorgkosten nemen toe. Het eigen risico van €385 per jaar (2026) wordt vaker volledig
        aangesproken. Brillen, gebitsproblemen, fysiotherapie: de eigen bijdragen lopen structureel
        op tot gemiddeld €600-1.000 per jaar boven het eigen risico.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Woningsituatie: wie nog huurt, heeft te maken met huurverhogingen. Wie een hypotheek heeft
        die bijna is afgelost, ervaart lagere maandlasten maar heeft ook een woning die misschien
        aangepast moet worden naarmate je ouder wordt. Kosten voor onderhoud, aanpassingen of een
        verhuizing naar een kleinere of gelijkvloerse woning zijn voor alleenstaanden volledig
        voor eigen rekening.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel AOW ontvang je als alleenstaande?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De AOW voor alleenstaanden is in 2026 gebaseerd op 70% van het minimumloon. Dat komt neer
        op ca. €1.400 netto per maand, afhankelijk van de exacte indexering en je persoonlijke
        situatie. Dat is structureel minder dan het bedrag dat twee partners samen ontvangen,
        maar ook minder dan de som van twee aparte AOW-uitkeringen voor samenwonenden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bovenop de AOW is er de alleenstaandeouderenkorting: €540 per jaar in 2026 voor
        AOW-gerechtigden zonder partner. Dit is een heffingskorting, geen extra uitkering.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Nibud rekent dat een gepensioneerde alleenstaande in een gemiddelde situatie minimaal
        €1.650-€1.900 per maand nodig heeft om alle basiskosten te dekken. De AOW alleen dekt dat
        niet. Het gat wordt gevuld door pensioen dat je via werk hebt opgebouwd.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom is het pensioengat als alleenstaande groter?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als je altijd alleen bent geweest, is je pensioen opgebouwd op basis van één inkomen.
        Dat is in de meeste gevallen lager dan wat twee mensen samen opbouwen. Er is bovendien
        nooit een partnerpensioen geweest dat als vangnet zou dienen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Als je ooit een relatie hebt gehad en daarna gescheiden bent, kan er bij de scheiding
        pensioenverevening zijn afgesproken, waarbij een deel van je opgebouwde pensioen naar de
        ex-partner gaat. Dat verlaagt wat je zelf ontvangt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voor mensen die veel als ZZP&apos;er hebben gewerkt, is het opgebouwde pensioen soms
        laag of onzeker. Vrijwillig pensioensparen, lijfrente of een eigen beleggingspot zijn dan
        de alternatieven.
      </p>

      <h2 className="font-display" style={h2}>
        Wat kun je nu nog doen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Mijn eerste advies is altijd: kijk op{" "}
        <a
          href="https://www.mijnpensioenoverzicht.nl"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          mijnpensioenoverzicht.nl
        </a>
        . Daar zie je wat je tot nu toe hebt opgebouwd en wat je bij pensioen kunt verwachten.
        Veel mensen weten het niet, ook niet de orde van grootte.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Als het gat groot is: iedere maand dat je extra inlegt in een lijfrente of
        bankspaarproduct telt. De belastingaftrek op lijfrentestortingen maakt het fiscaal
        interessanter dan een gewone spaarrekening. Hoe eerder, hoe meer het rente-op-rente effect
        werkt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Als het gat beperkt is: controleer of je vaste lasten bij pensionering echt lager worden.
        Hypotheek afgelost, kinderen het huis uit, minder vervoerskosten: de benodigde maandsom
        daalt vaak mee. Maar zorgkosten gaan de andere kant op.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Tot slot: boven de 50 is het de moeite om een keer op papier te zetten wat je inkomen bij
        pensioen daadwerkelijk is. Niet vaag, maar concreet. AOW + pensioen = X. Vaste lasten = Y.
        Is X groter dan Y? Zo ja, met hoeveel?
      </p>

      {/* Uit de praktijk */}
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}
      >
        <p className="font-body text-sm font-medium mb-2" style={{ color: "#16211F" }}>
          Uit de praktijk: Ellen, 54, teamleider, Arnhem
        </p>
        <p className="font-body text-sm" style={{ color: "#16211F" }}>
          Ze verdient €2.900 netto en rondkomt prima. Maar ze heeft ook tien jaar parttime gewerkt
          toen haar kinderen jong waren, en drie jaar als ZZP&apos;er voordat ze in loondienst
          ging. Haar pensioenplanner liet zien dat ze bij 67 uitkomt op ca. €1.850 per maand: AOW
          €1.400 plus opgebouwd pensioen €450. Haar vaste lasten zijn dan ca. €1.600 door de bijna
          afgeloste hypotheek, maar de marge is kleiner dan ze had verwacht. Ze is nu begonnen met
          maandelijks €250 extra in een lijfrente te storten. Dat schuift haar maandbedrag bij
          pensioen met ca. €150 omhoog en geeft haar iets meer ruimte voor de stijgende zorgkosten
          die ze al ziet aankomen.
        </p>
      </div>

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

      {/* Terug naar overzicht */}
      <p className="font-body text-sm" style={{ color: "#8B958F", marginTop: "1rem" }}>
        Onderdeel van het overzicht{" "}
        <Link
          href="/inzichten/kosten-levensonderhoud-alleenstaande-2026"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          kosten levensonderhoud alleenstaande 2026
        </Link>
        .
      </p>
    </>
  );
}
