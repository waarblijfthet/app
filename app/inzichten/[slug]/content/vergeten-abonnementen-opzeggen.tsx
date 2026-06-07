import Link from "next/link";
import AbonnementenTeller from "@/components/artikel/AbonnementenTeller";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function VergetenAbonnementenOpzeggen() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom je abonnementen je niet opvallen — en dat een gemiddeld gezin ruim €200 per maand betaalt",
            "Hoe je in 20 minuten een abonnementencheck doet die €30 tot €80 per maand oplevert",
            "Dat dubbele diensten (twee muziek-, twee streamingdiensten) in bijna elk huishouden voorkomen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

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
