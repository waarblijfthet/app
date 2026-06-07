import Link from "next/link";
import { GeldRelatieStats } from "@/components/artikel/GeldRelatieStats";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function GeldStressRelatieNederland() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom geld het meest vermeden gespreksonderwerp in relaties is, en wat er gebeurt als je het uitstelt",
            "Hoe je het gesprek start zonder dat het een ruzie wordt: begin met feiten, niet met verwijten",
            "Dat een persoonlijk budget per persoon meer rust geeft dan alles samen beheren zonder grens",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Je hoeft het niet hardop te zeggen. Het gevoel is er al. De lichte
        irritatie als de ander iets koopt zonder te overleggen. De stilte als
        de bankapp open gaat. Het gesprek dat je al weken voor je uitschuift
        omdat je niet weet hoe je het moet beginnen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Geld is het meest vermeden gespreksonderwerp in Nederlandse relaties. De
        helft van de stellen heeft er ooit ruzie over gemaakt. Maar slechts drie
        procent praat er openlijk over. Dat gat, tussen de spanning die er is
        en het gesprek dat niet wordt gevoerd, is waar de meeste schade wordt
        gedaan.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit artikel gaat niet over wie gelijk heeft. Het gaat over waarom het zo
        moeilijk is, wat het met je relatie doet als je er niet over praat, en
        hoe je het gesprek wel aanpakt.
      </p>

      <GeldRelatieStats />

      <h2 className="font-display" style={h2}>
        Waarom praten stellen zo moeilijk over geld?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Geld is niet alleen een praktisch onderwerp. Het is verbonden met wie je
        bent, hoe je bent opgegroeid, wat je belangrijk vindt en hoe veilig je
        je voelt. Als iemand kritiek geeft op hoe je met geld omgaat, voelt dat
        als kritiek op jezelf.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Uit onderzoek van het LISS panel, een grote steekproef uit de
        Nederlandse bevolking, blijkt dat aanhoudende financiële zorgen direct
        bijdragen aan angst- en depressieklachten. Niet als gevolg van armoede,
        maar als gevolg van de chronische stress van niet weten of het goed
        gaat.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En dan is er nog de schaamte. Als je goed verdient en toch krap zit,
        wil je dat niet toegeven, niet aan buitenstaanders, maar ook niet aan
        je partner. Dat maakt het gesprek extra zwaar. Want dan moet je niet
        alleen toegeven dat het niet klopt, maar ook dat je niet weet waarom.
        Herkenbaar?{" "}
        <Link
          href="/inzichten/goed-salaris-toch-krap"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          Lees ook waarom een goed salaris toch krap kan voelen
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wat er gebeurt als je het gesprek blijft uitstellen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De spanning verdwijnt niet als je er niet over praat. Ze verplaatst
        zich. Irritatie over geld uit zich in ruzies over andere dingen, de
        was, de planning, wie wat doet. De onderliggende oorzaak blijft.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Uit onderzoek van Nibud blijkt dat stellen die wel afspraken maken over
        geld, significant minder financiële conflicten hebben. Niet omdat ze
        meer verdienen, maar omdat de regels duidelijk zijn. Wie betaalt wat?
        Hoeveel heeft ieder van ons vrij te besteden? Wat zijn onze gezamenlijke
        doelen?
      </p>
      <p className="font-body text-text-soft" style={p}>
        Zonder die afspraken nemen mensen aannames. En aannames leiden altijd
        tot teleurstellingen.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe begin je het gesprek, zonder dat het een ruzie wordt?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het geheim is de insteek. Als het gesprek begint met &ldquo;jij geeft
        altijd te veel uit&rdquo; of &ldquo;jij weet nooit wat we
        hebben&rdquo;, is de uitkomst voorspelbaar. Als het gesprek begint met
        &ldquo;ik wil begrijpen hoe wij het doen&rdquo;, is de kans op een
        constructieve uitkomst veel groter.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Begin met feiten, niet met gevoelens. Kijk samen naar de bankafschriften
        van de afgelopen maand. Niet om elkaar te beoordelen, maar om samen te
        begrijpen waar het geld naartoe gaat. Feiten zijn neutraal, meningen
        niet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bespreek doelen voor je uitgaven bespreekt. Wat willen jullie samen? Een
        vakantie? Een noodbuffer? Eerder stoppen met werken? Als je het eens
        bent over het doel, is de discussie over de weg ernaar toe een stuk
        makkelijker.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Geef ieder een persoonlijk budget. Een vaste maandelijkse toelage per
        persoon, vrij te besteden zonder verantwoording. Dat klinkt misschien
        raar in een gezamenlijke financiële situatie, maar het voorkomt precies
        de irritatie die ontstaat als iemand het gevoel heeft dat elke aankoop
        een discussie is. De{" "}
        <Link
          href="/inzichten/potjesmethode-gezin-hoe-werkt-het"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          potjesmethode
        </Link>{" "}
        helpt hier concreet bij.
      </p>

      <h2 className="font-display" style={h2}>
        Wanneer is professionele hulp zinvol?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als geldstress al jaren een terugkerend thema is in je relatie, als het
        gesprek steeds escaleert of als er financiële geheimen zijn, dan is het
        zinvol om iemand van buiten te betrekken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat hoeft geen relatietherapeut te zijn. Soms helpt het al om samen
        inzicht te krijgen in jullie financiële situatie, objectief, zonder
        oordeel. Weten waar het geld naartoe gaat maakt het gesprek concreter en
        minder emotioneel geladen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je dat niet alleen doen? Een eenmalig{" "}
        <Link
          href="/adviesgesprek"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          adviesgesprek van 45 minuten
        </Link>{" "}
        helpt al om samen naar de cijfers te kijken, objectief en zonder oordeel.
      </p>
    </>
  );
}
