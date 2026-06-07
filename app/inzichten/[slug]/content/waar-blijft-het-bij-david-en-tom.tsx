import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WaarBlijftHetBijDavidEnTom() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Hoe een stel zonder kinderen en auto toch elke maand weinig overhoudt van €5.500 netto",
            "Dat lifestyle-inflatie ook zonder klassieke grote kostenposten alle ruimte opeist",
            "Wat een vergelijkbaar stel doet om €800-1.000 per maand te sparen zonder soberder te leven",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border p-4 mb-8" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          <strong>Fictief stel.</strong> De cijfers zijn samengesteld uit
          openbare gemiddelden (Nibud, CBS) en praktijkindicaties, geen echte
          klant. Bedoeld ter herkenning.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        David en Tom verdienen samen €5.500 netto, hebben geen kinderen en geen
        auto. Geen van de klassieke grote kostenposten dus. En toch vragen ze
        zich aan het einde van de maand af waar het geld is gebleven. Hoe kan
        dat?
      </p>

      <h2 className="font-display" style={h2}>Het profiel</h2>
      <p className="font-body text-text-soft" style={p}>
        Netto inkomen: €5.500 per maand. Huishouden: twee volwassenen, geen
        kinderen, wel een hond. Wonen: koopappartement, hypotheek €1.300.
        Vervoer: geen auto, wel OV en af en toe een deelauto.
      </p>

      <h2 className="font-display" style={h2}>Waar het geld heen gaat</h2>
      <p className="font-body text-text-soft" style={p}>
        De vaste lasten zijn relatief laag. Maar juist daardoor voelt alles
        &ldquo;kan wel&rdquo;. Vaak uit eten en bezorgen (samen makkelijk €600
        per maand), veertien abonnementen, korte stedentrips, en losse aankopen
        die los nooit groot lijken. Het zijn allemaal &ldquo;wensen&rdquo;, en
        die hebben hier ruim baan.
      </p>

      <h2 className="font-display" style={h2}>Waar blijft het?</h2>
      <p className="font-body text-text-soft" style={p}>
        Zonder kinderen of auto verwacht je een grote buffer. Maar omdat de
        ruimte er is, groeit de levensstijl precies tot die ruimte op, een
        schoolvoorbeeld van{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie</Link>. Het geld verdwijnt niet in één post, maar in tientallen comfortabele keuzes.
      </p>

      <h2 className="font-display" style={h2}>Wat een vergelijkbaar stel wél overhoudt</h2>
      <p className="font-body text-text-soft" style={p}>
        Een stel met hetzelfde inkomen dat bewust een spaardoel vooraf afroomt en
        het &ldquo;uit eten&rdquo;-budget begrenst, zet moeiteloos €800–1.000 per
        maand opzij, zonder soberder te leven, alleen bewuster. De truc is geld
        eerst bestemming geven, dan pas uitgeven. Zie de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Herken je iets van David en Tom?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}en zie waar jullie ruimte naartoe gaat.
      </p>
    </>
  );
}
