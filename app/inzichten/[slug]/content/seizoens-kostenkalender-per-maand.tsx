import Link from "next/link";
import SeizoensKalender from "@/components/artikel/SeizoensKalender";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function SeizoensKostenkalenderPerMaand() {
  return (
    <>
      <p className="font-body text-text-soft" style={p}>
        De meeste budgetten gaan uit van een &ldquo;gemiddelde maand&rdquo;. Maar
        zo&apos;n maand bestaat niet. Het jaar zit vol verborgen pieken — en juist
        die pieken halen je begroting onderuit, omdat je ze niet ziet aankomen.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Kort gezegd: naast je vaste lasten heeft elk seizoen zijn eigen
        kostenpiek — van de zomervakantie en schoolspullen tot december. Wie die
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
        verdeeld over twaalf maanden is €100 per maand — nauwelijks voelbaar. Het
        enige wat je nodig hebt, is een apart potje waar je niet aankomt. Zo werkt
        de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>{" "}ook voor onregelmatige kosten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je zien of er in jullie maandbudget ruimte is voor zulke potjes?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>.
      </p>
    </>
  );
}
