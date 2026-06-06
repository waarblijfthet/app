import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

function VoorNa({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="rounded-xl border my-6 overflow-hidden" style={{ borderColor: "#E8E0D4" }}>
      <div className="grid grid-cols-3" style={{ backgroundColor: "#1C3A2A" }}>
        {["", "Voor", "Na"].map((h, i) => (
          <div key={i} className="px-4 py-2 font-body text-xs font-medium" style={{ color: "#F5F0E8" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-3" style={{ backgroundColor: i % 2 ? "#FDFAF4" : "white" }}>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#1C3A2A", fontWeight: 500 }}>{r[0]}</div>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#B03A2E" }}>{r[1]}</div>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#2D6A4F", fontWeight: 600 }}>{r[2]}</div>
        </div>
      ))}
    </div>
  );
}

export default function FinancieelOnafhankelijkWordenRealistisch() {
  return (
    <>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A", fontSize: "1.05rem" }}>
        Financieel onafhankelijk worden betekent niet dat je op je 40e stopt met werken. Voor de meeste mensen die goed verdienen betekent het iets simpelers en haalbaarders: <strong>niet meer elke maand afhankelijk zijn van dat ene salaris om de eindjes aan elkaar te knopen.</strong>
      </p>

      <h2 className="font-display" style={h2}>De FIRE-mythe: waarom het voor gezinnen niet werkt</h2>
      <p className="font-body text-text-soft" style={p}>
        FIRE (Financial Independence, Retire Early) is populair. De kern: spaar 25 keer je jaaruitgaven op en leef van 4% per jaar. Wie €60.000 per jaar uitgeeft, heeft €1.500.000 nodig.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het probleem voor gezinnen in Nederland: box 3 belast je vermogen boven circa €57.000 (2026) effectief met ruim 2% per jaar, ongeacht het werkelijke rendement. Bij €500.000 belegd vermogen betaal je €4.000 tot €6.000 per jaar aan vermogensbelasting. Daarnaast passen kinderen, hypotheek en carrière simpelweg niet in het FIRE-model dat draait op minimale vaste lasten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar er is een bruikbaarder doel: <strong>niveau 3-vrijheid</strong>. Niet alles stoppen, maar genoeg opbouwen dat werk een keuze is in plaats van een verplichting.
      </p>

      <h2 className="font-display" style={h2}>De vier niveaus van financiële vrijheid</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>Niveau 1 — Stabiliteit:</strong> een buffer van drie tot zes maanden netto inkomen. Verrassend veel mensen met een goed inkomen hebben dit niet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Niveau 2 — Veiligheid:</strong> je vaste lasten worden gedekt door opgebouwd vermogen, ook zonder werk. Geen paniek bij ontslag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Niveau 3 — Vrijheid:</strong> je kunt kiezen hoeveel en wat je werkt. Minder uren, ander werk, iets opbouwen naast je baan. Dit is het zinvolste doel voor de meeste gezinnen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Niveau 4 — Volledige onafhankelijkheid:</strong> het klassieke FIRE-eindpunt. Haalbaar voor weinigen, noodzakelijk voor vrijwel niemand.
      </p>

      <h2 className="font-display" style={h2}>Cas: Thomas &amp; Inge — FIRE-droom omgezet naar haalbaar plan</h2>
      <p className="font-body text-text-soft" style={p}>
        Thomas (43) en Inge (41) verdienen samen €7.500 netto per maand. Twee kinderen, koopwoning met €180.000 resterende hypotheek, overwaarde circa €280.000. Thomas wilde &ldquo;over tien jaar stoppen.&rdquo; Dat hadden ze nooit echt doorgerekend.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De berekening: ze gaven €5.800 per maand uit. FIRE-doel: 25 × €69.600 = <strong>€1.740.000</strong>. Ze hadden €148.000 spaargeld. In tien jaar haalbaar? Nee. Maar dat hoefde ook niet.
      </p>
      <VoorNa rows={[
        ["Doel", "Stoppen op 53", "Meer vrijheid op 53"],
        ["Benodigde som", "€1.740.000", "€500.000 vrij vermogen"],
        ["Maandelijkse inleg", "€600", "€1.200"],
        ["Verwacht vrij vermogen op 55", "€88.000", "€210.000+"],
      ]} />
      <p className="font-body text-text-soft" style={p}>
        Ze herdefinieerden het doel: niet stoppen, maar <em>meer keuze</em>. Als ze op hun 55e €500.000 vrij vermogen hebben — bovenop pensioen en overwaarde — kan Thomas terugschroeven naar drie dagen. De maandelijkse inleg ging van €600 naar €1.200, wat bleek te kunnen na een analyse van hun uitgavenpatroon. Meer over dat patroon in{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie: meer verdienen en toch krap</Link>.
      </p>

      <h2 className="font-display" style={h2}>Het enige getal dat ertoe doet</h2>
      <p className="font-body text-text-soft" style={p}>
        Het getal dat alles bepaalt is niet je inkomen, en niet je spaarsaldo. Het is je <strong>maandelijkse vrije cashflow</strong> — wat er overblijft na vaste lasten, levensonderhoud en pensioenopbouw. Als dat getal nul of negatief is, begin dan met begrijpen waar het geld naartoe gaat. Lees:{" "}
        <Link href="/inzichten/tweeverdieners-toch-krap" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">tweeverdieners en toch krap — hoe kan dat?</Link>
      </p>
      <p className="font-body text-text-soft" style={p}>
        Als er wél vrije cashflow is — zelfs €200 per maand — heb je een startpunt. Drie stappen: bereken je werkelijke cashflow via drie maanden bankafschriften, bepaal je doelniveau (vrijheid of volledige onafhankelijkheid), en maak de inleg automatisch op salarisdag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Lees ook:{" "}
        <Link href="/inzichten/spaardoelen-maandelijkse-inleg" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">spaardoelen en maandelijkse inleg: hoe pak je dat aan?</Link>{" "}
        en{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">de potjesmethode voor gezinnen</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je weten hoeveel ruimte je nu hebt?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}
        — in 15 minuten zie je je vrije cashflow en of er meer mogelijk is dan je denkt. Als je dit wil uitwerken met iemand die concreet meekijkt, biedt Jarno een{" "}
        <Link href="/adviesgesprek" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">eenmalig adviesgesprek van €125</Link>{" "}
        aan.
      </p>
    </>
  );
}
