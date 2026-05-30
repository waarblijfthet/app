import Link from "next/link";
import AbonnementenTeller from "@/components/artikel/AbonnementenTeller";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function VergetenAbonnementenOpzeggen() {
  return (
    <>
      <p className="font-body text-text-soft" style={p}>
        Abonnementen zijn het sluipende lek bij uitstek. Ze zijn klein per stuk,
        ze worden automatisch afgeschreven, en juist daarom merk je ze niet op.
        Tot je ze bij elkaar optelt.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Kort gezegd: een gemiddeld Nederlands gezin betaalt al gauw meer dan €200
        per maand aan abonnementen — en de meesten schatten dat op ongeveer de
        helft. Het verschil is geen luxe, maar vergeten kosten die elke maand
        gewoon doorlopen.
      </p>

      <AbonnementenTeller />

      <h2 className="font-display" style={h2}>
        Waarom je ze niet ziet
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Automatische incasso is gemaakt om geen aandacht te vragen. Een proef die
        stilzwijgend doorloopt, een tweede streamingdienst &ldquo;voor even&rdquo;,
        een sportschool waar je niet meer komt — ze blijven afschrijven tot je
        ingrijpt. En dat ingrijpen vergt net even moeite, dus het blijft liggen.
      </p>

      <h2 className="font-display" style={h2}>
        Zo schoon je ze op in 20 minuten
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Pak één bankafschrift van de afgelopen maand en zet álle terugkerende
        afschrijvingen op een rij. Stel jezelf per abonnement één vraag: heb ik
        dit de afgelopen maand écht gebruikt? Alles waar je over twijfelt, zeg je
        op — terugkomen kan altijd. Dubbele diensten (twee muziekdiensten, drie
        streamingdiensten) breng je terug naar één.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Abonnementen zijn precies zo&apos;n stille kostenpost als de sluipende
        vaste lasten die we beschrijven in{" "}
        <Link href="/inzichten/goed-salaris-toch-krap" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">goed salaris, toch krap</Link>. Los lijkt elk bedrag klein; samen slaan ze een gat.
      </p>

      <h2 className="font-display" style={h2}>
        Wat het oplevert
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Wie eerlijk opschoont, vindt vaak €30 tot €80 per maand aan abonnementen
        die niets meer toevoegen. Dat is €360 tot bijna €1.000 per jaar — zonder
        dat je iets inlevert wat je echt mist.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd hoeveel jij stilletjes kwijt bent en waar nog meer geld
        weglekt?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}en vergelijk jezelf met vergelijkbare gezinnen.
      </p>
    </>
  );
}
