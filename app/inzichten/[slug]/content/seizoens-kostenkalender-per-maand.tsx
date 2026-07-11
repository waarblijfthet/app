import Link from "next/link";
import SeizoensKalender from "@/components/artikel/SeizoensKalender";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function SeizoensKostenkalenderPerMaand() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Dat de 'gemiddelde maand' niet bestaat, het jaar heeft drie grote kostenpieken die je telkens verrassen",
            "Welke drie momenten een gezin structureel het meeste geld kosten",
            "Dat dezelfde €1.200 verdeeld over 12 maanden €100 per maand is, nauwelijks voelbaar",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        De meeste budgetten gaan uit van een &ldquo;gemiddelde maand&rdquo;. Maar
        zo&apos;n maand bestaat niet. Het jaar zit vol verborgen pieken, en juist
        die pieken halen je begroting onderuit, omdat je ze niet ziet aankomen.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: naast je vaste lasten heeft elk seizoen zijn eigen
        kostenpiek, van de zomervakantie en schoolspullen tot december. Wie die
        pieken kent en er maandelijks een beetje voor opzijzet, wordt nooit meer
        verrast.
      </p>

      <SeizoensKalender />

      <h2 className="font-display" style={h2}>De drie grote pieken</h2>
      <p className="font-body text-text-soft" style={p}>
        Drie momenten kosten elk gezin structureel het meest. De zomer (vakantie,
        al gauw €2.000+ voor een gezin), de schoolstart in augustus
        (schoolspullen, sportcontributies, nieuwe kleding), en december
        (Sinterklaas en kerst, samen zo&apos;n €500). Drie keer per jaar een gat
        van honderden euro&apos;s bovenop je gewone uitgaven.
      </p>

      <h2 className="font-display" style={h2}>Waarom uitsmeren werkt</h2>
      <p className="font-body text-text-soft" style={p}>
        Een piek van €1.200 in één maand is een probleem. Diezelfde €1.200
        verdeeld over twaalf maanden is €100 per maand, nauwelijks voelbaar. Het
        enige wat je nodig hebt, is een apart potje waar je niet aankomt. Zo werkt
        de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>{" "}ook voor onregelmatige kosten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je zien of er in jullie maandbudget ruimte is voor zulke potjes?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de analyse</Link>.
      </p>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}
      >
        <p className="font-body text-sm" style={{ color: "#16211F" }}>
          <strong>Uit de praktijk.</strong> Een van de eerste gezinnen die ik hielp, rekende verjaardagen, de vakantie en december om naar vaste maandpotjes. Sindsdien voelen de piekmaanden niet meer als een klap, de kerstpot staat er gewoon.
        </p>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Uit de praktijk: lees <a href="/inzichten/kerstpot-en-verjaardagspot-zo-bouwden-we-die" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe een gezin een kerst- en verjaardagspot bouwde</a>.
      </p>
    </>
  );
}
