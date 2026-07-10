import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function VasteLastenOverzichtMaken() {
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
          Je weet ongeveer wat er binnenkomt, maar wat er automatisch afgaat heb je niet scherp. En elk jaar zijn er weer afschrijvingen die je niet zag aankomen.
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
            "Welke posten allemaal onder je vaste lasten vallen, inclusief de posten die mensen vaak vergeten",
            "Hoe je in vier stappen een compleet overzicht maakt zonder dat je een boekhouder hoeft te zijn",
            "Wat een gezond aandeel vaste lasten is, en wanneer je te veel vastligt",
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
        Je kunt pas sturen op je geld als je weet wat er elke maand al vastligt. Toch heeft bijna
        niemand een compleet overzicht van zijn vaste lasten. Niet omdat het moeilijk is, maar
        omdat het versnipperd is: incasso&apos;s, jaarpremies, abonnementen en kleine
        automatismen die zich verspreid over het jaar afschrijven. In dit stappenplan zet je ze
        allemaal op een rij.
      </p>

      <h2 className="font-display" style={h2}>
        Wat valt er allemaal onder vaste lasten?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vaste lasten zijn de uitgaven die elke maand of elk jaar terugkomen en waar je niet zomaar
        onderuit komt. Het Nibud rekent daartoe in elk geval: woonlasten (huur of hypotheek),
        energie en water, gemeentelijke belastingen en waterschap, verzekeringen, telefoon,
        internet en televisie, vervoer, en kosten voor onderwijs of kinderopvang.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een paar bedragen om je aan te spiegelen voor 2026. De gemiddelde premie voor de
        basiszorgverzekering is €159,30 per maand. De gemeentelijke woonlasten voor een gezin met
        koopwoning liggen rond de €1.095 per jaar, ongeveer €91 per maand. En een gemiddeld gezin
        is meer dan €200 per maand kwijt aan abonnementen alleen al. Meer benchmarks vind je in
        mijn overzicht van{" "}
        <Link
          href="/inzichten/wat-zijn-normale-vaste-lasten-gezin"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          normale vaste lasten voor een gezin
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        De posten die bijna iedereen vergeet
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het overzicht klopt zelden bij de eerste poging, en altijd dezelfde posten ontbreken. Het
        zijn de uitgaven die niet maandelijks afschrijven, waardoor ze niet in je hoofd zitten als
        vaste last.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Denk aan jaarlijkse premies die in één keer afgaan, de wegenbelasting per kwartaal, de
        gemeentelijke aanslag, onderhoudscontracten voor cv of auto, een jaarlijkse software of
        opslagdienst, contributies van clubs, en cadeaus voor verjaardagen en feestdagen. Dat
        laatste is geen luxe maar een vaste, voorspelbare uitgave. Vergeten abonnementen zijn een categorie op zich: abonnementen die je al lang niet meer gebruikt kosten al snel tientallen euro&apos;s per maand. Hoe je die opspoort, lees je in mijn artikel over{" "}
        <Link
          href="/inzichten/vergeten-abonnementen-opzeggen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          vergeten abonnementen opzeggen
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        In vier stappen naar een compleet overzicht
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Stap één: pak je bankafschriften van de afgelopen twaalf maanden, niet één of twee. Alleen
        over een heel jaar zie je ook de premies en aanslagen die maar één of twee keer afschrijven.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Stap twee: zet elke terugkerende afschrijving in een lijst en reken alles om naar een bedrag
        per maand. Een jaarpremie van €600 is dus €50 per maand. Zo wordt alles vergelijkbaar en
        verdwijnt de schijnrust van posten die ver weg lijken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Stap drie: groepeer in categorieën, zoals wonen, verzekeringen, vervoer en abonnementen. In
        de groepering zie je meteen waar je verhoudingsgewijs veel kwijt bent.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Stap vier: tel het totaal op en zet het af tegen je netto-inkomen. Nu heb je geen gevoel
        meer, maar een getal.
      </p>

      <h2 className="font-display" style={h2}>
        Wanneer lig je te veel vast?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als vuistregel is rond de 50 procent van je netto-inkomen aan vaste lasten gezond. In de
        praktijk zit een gemiddeld huishouden eerder rond de 55 procent of hoger. Kom je daar ruim
        boven, dan is het niet je dagelijkse uitgavenpatroon dat knelt, maar je vaste basis. Dat is
        belangrijk om te weten, want aan vaste lasten kun je vaak eenmalig sleutelen met blijvend
        effect, terwijl bezuinigen op dagelijkse uitgaven elke maand opnieuw discipline vraagt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Heb je het overzicht eenmaal, dan is de volgende stap je inkomen er slim overheen leggen.
        Hoe je dat doet, lees je in mijn stuk over{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
        </Link>{" "}
        en in de uitleg van de{" "}
        <Link
          href="/inzichten/50-30-20-regel-hoger-inkomen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          50/30/20-regel
        </Link>
        .
      </p>

      <p className="font-body text-text-soft" style={p}>Met dat overzicht in de hand lees je verder over <Link href="/inzichten/grip-op-je-geld-krijgen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe je grip op je geld krijgt</Link>.</p>

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
          Geen zin om zelf alle afschriften door te spitten? In de gratis analyse vul je je vaste
          lasten stap voor stap in en zie je direct hoe je ervoor staat ten opzichte van wat
          normaal is.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
