import Link from "next/link";
import { PotjesVisualisatie } from "@/components/artikel/PotjesVisualisatie";
import PotjesCalculator from "@/components/artikel/PotjesCalculator";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function PotjesmethodeGezinHoeWerktHet() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom de potjesmethode werkt waar budgetteren mislukt: de grens is zichtbaar, je hoeft niet bij te houden",
            "Vier potjes die een gezin nodig heeft, en hoe je ze inricht zonder app of spreadsheet",
            "Welke Nederlandse banken potjes ondersteunen en hoe je een werkbare startverdeling bepaalt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Je hebt er vast van gehoord. Aparte rekeningen voor aparte doelen.
        Potje voor boodschappen, potje voor de vakantie, potje voor onverwachte
        kosten. Het klinkt logisch, en dat is het ook. Maar de meeste uitleggen
        van de potjesmethode zijn te ingewikkeld, te rigide, of te abstract voor
        een gezin dat gewoon wil dat het geld niet verdwijnt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit is de praktische versie. Geen spreadsheet, geen app van twintig euro
        per maand, geen zeven rekeningen. Gewoon een systeem dat werkt voor een
        normaal gezin met een normaal inkomen.
      </p>

      <PotjesVisualisatie />

      <h2 className="font-display" style={h2}>
        Waarom werkt de potjesmethode terwijl budgetteren dat niet doet?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Budgetteren mislukt bij de meeste mensen omdat het continu aandacht
        vraagt. Je moet bijhouden wat je uitgeeft, controleren of je nog binnen
        het budget zit, en jezelf corrigeren als het fout gaat. Dat is
        vermoeiend, en als je moe bent, doe je het niet meer.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De potjesmethode werkt anders. Je maakt één keer de beslissing: dit
        geld is voor dit doel. Daarna hoef je niet meer te denken. Geld op de
        boodschappenrekening? Je mag het uitgeven. Geld op de spaarrekening?
        Dat is niet beschikbaar. Geen discipline nodig, geen dagelijks bijhouden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is ook wat onderzoek bevestigt. Mensen die fysiek of digitaal geld
        scheiden per doel, geven structureel minder uit dan mensen die alles op
        één rekening hebben staan. Niet omdat ze zuiniger zijn, maar omdat de
        grens zichtbaar is.
      </p>

      <PotjesCalculator />

      <h2 className="font-display" style={h2}>
        Hoe richt je het in, praktisch, voor een gezin?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het begint bij het inkomen. Op de dag dat het salaris binnenkomt,
        verdeel je het direct. Niet aan het einde van de maand kijken wat er
        over is, maar meteen bij binnenkomst sturen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De meest werkbare verdeling voor een gezin is vier potjes.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het eerste potje is voor vaste lasten, alle kosten die maandelijks
        automatisch worden afgeschreven. Huur of hypotheek, energie,
        verzekeringen, abonnementen. Dit bedrag ken je van tevoren. Zet het op
        een aparte rekening en stel automatische afschrijvingen in. Je hoeft er
        nooit meer naar te kijken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het tweede potje is voor dagelijks leven, boodschappen, benzine,
        kleine dagelijkse uitgaven. Dit is het enige geld dat je actief beheert.
        Veel mensen vinden het handig om hiervoor een betaalpas te gebruiken met
        een duidelijk limiet, of cash te gebruiken voor boodschappen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het derde potje is voor sparen, direct op salarisdag, voordat je iets
        anders betaalt. Noodbuffer, vakantie, grote aankopen. Ook dit gaat
        automatisch, naar een spaarrekening die je niet dagelijks ziet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het vierde potje is voor jezelf, geld dat je zonder schuldgevoel kunt
        besteden. Een vaste persoonlijke toelage per persoon. Geen
        verantwoording aan elkaar, geen discussie. Dit klinkt als luxe, maar het
        voorkomt juist impulsaankopen die buiten het systeem vallen.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel gaat er in elk potje?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Er is geen universeel antwoord, het hangt af van je inkomen en vaste
        lasten. Maar een werkbaar startpunt voor een gezin is: 65 procent vaste
        lasten, 20 procent dagelijks leven, 10 procent{" "}
        <Link
          href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          sparen
        </Link>
        , 5 procent vrij.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bij een netto inkomen van €4.000 is dat: €2.600 vaste lasten, €800
        dagelijks leven, €400 sparen, €200 vrij per persoon.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Als 65 procent naar vaste lasten gaat en er dan €800 overblijft voor
        boodschappen en benzine, en boodschappen alleen al kosten €875 voor een
        gezin van vier, dan klopt het systeem niet. Dat is dan geen probleem
        met het systeem, maar een signaal dat de vaste lasten te hoog zijn of
        het inkomen te laag voor de huidige levensstijl.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat inzicht is waardevol. Niet om je slecht te laten voelen, maar om te
        weten waar het werkelijke probleem zit.
      </p>

      <h2 className="font-display" style={h2}>
        Welke banken en apps helpen hierbij?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Bijna alle Nederlandse banken bieden subrekeningen of potjes aan.
        Rabobank heeft &ldquo;Doelsparen&rdquo;, ING heeft
        &ldquo;Spaarpotjes&rdquo;, ABN AMRO heeft &ldquo;Doelbedragen&rdquo;.
        Bunq is specifiek gebouwd rondom het potjesconcept en laat je onbeperkt
        gratis rekeningen aanmaken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Je hebt geen speciale app nodig. Twee of drie rekeningen bij je eigen
        bank zijn genoeg voor het basismodel. Meer rekeningen maken het niet
        beter, ze maken het alleen complexer.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Lukt het niet om het vol te houden? Dan helpt het als ik meekijk. Doe de{" "}<Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">gratis analyse</Link>, of laat mij je cijfers nakijken met de{" "}<Link href="/geldscan" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">geldscan (€49)</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Uit de praktijk: lees <a href="/inzichten/kerstpot-en-verjaardagspot-zo-bouwden-we-die" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">de potjesmethode in de praktijk bij een echt gezin</a>.
      </p>
      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/geld-indelen-salaris-potjes-systeem" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">je salaris slim indelen</Link> en <Link href="/inzichten/cash-stuffing-beginnen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">cash stuffing</Link>.</p>
    </>
  );
}
