import Link from "next/link";
import { SpaarRealiteit } from "@/components/artikel/SpaarRealiteit";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function HoeveeSpaarenPerMaandNormaal() {
  return (
    <>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud adviseert 10 procent van je netto inkomen te sparen. Dat weet
        bijna iedereen. Maar wat de meeste mensen niet weten: meer dan een kwart
        van de Nederlandse huishoudens spaart helemaal niets. En van de mensen die
        wél sparen, haalt de meerderheid die 10 procent niet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is geen moreel oordeel. Het is gewoon hoe de getallen eruitzien. En
        het betekent dat als jij nu minder spaart dan &ldquo;zou moeten&rdquo;,
        je in zeer goed gezelschap verkeert.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit artikel legt eerlijk uit wat normaal is, wat haalbaar is, en wat er
        werkelijk nodig is om financiële rust te krijgen.
      </p>

      <SpaarRealiteit />

      <h2 className="font-display" style={h2}>
        Wat de cijfers werkelijk zeggen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud-advies van 10 procent is een norm, geen beschrijving van de
        werkelijkheid. De werkelijkheid is dit: de gemiddelde Nederlander spaart
        6,5 procent van het netto inkomen. Structurele spaarders sparen gemiddeld
        €240 per maand.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar het gemiddelde vertekent. CBS-data laat zien dat een groot deel van
        de huishoudens nauwelijks vermogen opbouwt. Het mediane spaarsaldo van een
        Nederlands huishouden is €23.000 — dat is het bedrag waarbij de helft meer
        heeft en de helft minder. Het gemiddelde van €58.000 wordt omhoog
        getrokken door een kleine groep met veel vermogen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Vertaald naar spaargedrag: de meeste mensen sparen minder dan ze denken,
        minder dan ze zouden willen en minder dan de norm zegt dat zou moeten.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom haalt de meeste mensen die 10 procent niet?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Niet door gebrek aan discipline. Maar door een systeem dat niet klopt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het probleem is de volgorde. De meeste mensen betalen eerst hun vaste
        lasten, doen daarna de dagelijkse uitgaven, en sparen wat er overblijft.
        Maar er blijft bijna nooit iets over. Geld op een betaalrekening
        verdwijnt — in kleine aankopen, in vergeten abonnementen, in een
        onverwachte rekening.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De mensen die structureel wél sparen doen het andersom. Op de dag dat het
        salaris binnenkomt, gaat er direct een vast bedrag naar een spaarrekening.
        Daarna leven ze van wat er overblijft. Die volgorde verandert alles.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat klinkt simpel. En dat is het ook. Maar het vraagt dat je het één keer
        instelt — een automatische overschrijving op de eerste van de maand — en
        daarna niet meer aan denkt.
      </p>

      <h2 className="font-display" style={h2}>
        Wat is een realistisch beginpunt als je nu niks spaart?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Niet €310 per maand (de Nibud-10% bij modaal inkomen). Dat is het
        einddoel, niet het beginpunt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een realistisch beginpunt is €50 per maand. Dat is €600 per jaar. Na twee
        jaar heb je €1.200 — genoeg om de meeste kapotte huishoudelijke apparaten
        te vervangen zonder dat het de maand kapot maakt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daarna verhoog je elk kwartaal met €25. Na een jaar zit je op €125 per
        maand. Dat is nog steeds onder de norm, maar het is een systeem dat werkt.
        En een systeem dat werkt is meer waard dan een norm die je niet haalt.
      </p>

      <h2 className="font-display" style={h2}>
        Het verschil tussen sparen en een buffer hebben
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Veel mensen verwarren sparen met investeren of vermogen opbouwen. Maar de
        eerste stap is simpeler: een noodbuffer.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Nibud adviseert drie tot zes maanden netto inkomen als buffer. Bij een
        modaal inkomen van €3.100 is dat €9.300 tot €18.600. Dat klinkt als een
        doel voor over tien jaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar de eerste €1.000 is het meest waardevol. Die ene duizend euro is het
        verschil tussen een kapotte wasmachine die een crisis is en een kapotte
        wasmachine die een vervelende aankoop is. Die €1.000 haal je met €50 per
        maand in twintig maanden — minder dan twee jaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Begin daar. De rest volgt vanzelf als het systeem staat. Meer over het
        opzetten van{" "}
        <Link
          href="/inzichten/spaardoelen-maandelijkse-inleg"
          className="hover:underline"
          style={{ color: "#C4603A", textDecoration: "none" }}
        >
          spaardoelen stellen
        </Link>{" "}
        lees je in dat artikel — inclusief hoe je aparte rekeningen per doel
        opzet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je weten hoeveel ruimte er in jullie situatie zit om te beginnen met
        sparen — of meer te sparen dan nu? Doe de{" "}
        <Link
          href="/analyse"
          className="hover:underline"
          style={{ color: "#C4603A", textDecoration: "none" }}
        >
          gratis analyse
        </Link>{" "}
        en zie direct waar jullie geld naartoe gaat en waar de ruimte zit.
      </p>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F5F0E8", borderColor: "#E8E0D4" }}
      >
        <p className="font-body text-sm" style={{ color: "#1C3A2A" }}>
          <strong>Uit de praktijk.</strong> Bijna iedereen die ik spreek denkt dat ánderen veel meer sparen. Dat valt enorm mee. Wat het verschil maakt is niet het percentage, maar dat je het bedrag automatisch laat afromen op de dag dat je salaris binnenkomt — vóór je het ziet en kunt uitgeven.
        </p>
      </div>
    </>
  );
}
