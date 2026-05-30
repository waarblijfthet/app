import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function VijftigDertigTwintigRegelHogerInkomen() {
  return (
    <>
      <p className="font-body text-text-soft" style={p}>
        De 50/30/20-regel is misschien wel het bekendste budgetadvies dat er is:
        50 procent van je netto-inkomen naar vaste lasten, 30 procent naar vrij
        besteedbaar, 20 procent naar sparen. Simpel en overzichtelijk. Maar werkt
        die verhouding nog wel als je goed verdient?
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Kort gezegd: de 50/30/20-regel is een prima startpunt, maar bij een hoger
        inkomen klopt de verdeling niet meer. Je vaste lasten hoeven niet mee te
        groeien tot de helft van je inkomen, en 20 procent sparen is dan eerder
        een ondergrens dan een doel. Wie goed verdient en de regel letterlijk
        volgt, legitimeert vooral zijn eigen lifestyle-inflatie.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe de 50/30/20-regel werkt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Je verdeelt je netto-inkomen in drie delen. 50 procent gaat naar
        behoeften: huur of hypotheek, energie, verzekeringen, boodschappen,
        vervoer. 30 procent naar wensen: uit eten, hobby&apos;s, vakanties,
        abonnementen. En 20 procent naar sparen en aflossen. De kracht zit in de
        eenvoud — je hoeft geen spreadsheet bij te houden.
      </p>

      <h2 className="font-display" style={h2}>
        Waar het schuurt bij een hoger inkomen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De regel gaat ervan uit dat je behoeften meegroeien met je inkomen. Maar
        dat is precies de valkuil. Boodschappen, energie en een fatsoenlijk dak
        boven je hoofd kosten niet automatisch meer als jij meer verdient. Wie
        €4.500 netto binnenkrijgt heeft geen €2.250 aan échte behoeften — tenzij
        hij bewust groter is gaan wonen en rijden omdat het kon.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Tegelijk is 20 procent sparen bij een hoger inkomen aan de lage kant. Als
        je vaste lasten relatief laag blijven, kun je makkelijk meer opzijzetten —
        en dat is precies wat het verschil maakt tussen krap en ruim. Dit is de
        kern van{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie</Link>: de uitgaven groeien mee, het sparen niet.
      </p>

      <h2 className="font-display" style={h2}>
        Een betere verdeling als je goed verdient
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Draai de logica om. In plaats van &ldquo;wat overblijft, spaar ik&rdquo;,
        bepaal je eerst hoeveel je opzij wilt zetten en leeft de rest daarvan.
        Houd je behoeften bewust onder de 50 procent en laat het verschil naar
        sparen vloeien — denk eerder aan 50/20/30 met sparen naar 30 procent, of
        meer, naarmate je inkomen stijgt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat een realistisch spaarpercentage is en hoeveel Nederlanders werkelijk
        sparen, lees je in ons artikel over{" "}
        <Link href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">hoeveel sparen normaal is</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Maak het concreet met aparte potjes
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een percentage op papier verandert niks zolang alles op één rekening
        staat. Zet je verdeling om in aparte potjes: één voor vaste lasten, één
        voor dagelijkse uitgaven, één voor sparen. Zo werkt de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>, en dat is een stuk concreter dan een regel onthouden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd hoe jouw huidige verdeling eruitziet ten opzichte van
        vergelijkbare gezinnen?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>. Kom je er niet uit, dan kijken we via onze{" "}
        <Link href="/aanbod" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">begeleiding</Link>{" "}met je mee.
      </p>
    </>
  );
}
