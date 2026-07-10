import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WatKostEenZomervakantieGezin() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat Nederlanders gemiddeld per persoon per vakantie uitgeven, en wat dat voor een gezin van vier is",
            "Dat het vakantiegeld geen bonus is maar uitgesteld loon, en wat dat betekent voor je planning",
            "Hoe je de naschok voorkomt: €200 per maand opzijzetten is €2.400 in de zomer",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        De zomervakantie is voor veel gezinnen het hoogtepunt van het jaar, en
        meteen de grootste losse uitgave. Toch boeken de meesten op gevoel, en
        pas in september blijkt wat het echt heeft gekost.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En dan is er dat gevoel. In de meivakantie gaat iedereen weg, zo voelt
        het althans. Instagram staat vol met strandvakanties, collega&apos;s
        bespreken hun vluchten, kinderen komen maandag terug met verhalen. Dat
        maakt thuis blijven of een weekje camping voelen als minder dan het is.
        Dat sociale aspect kost geld, ook als je het niet bewust beslist.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: Nederlanders gaven in 2024 gemiddeld zo&apos;n €600 tot €700
        per persoon uit aan de zomervakantie. Voor een gezin van vier kom je
        daarmee al snel op €2.400 of meer, vaak betaald uit één of twee maanden
        inkomen plus het vakantiegeld.
      </p>

      <h2 className="font-display" style={h2}>Waar de kosten echt zitten</h2>
      <p className="font-body text-text-soft" style={p}>
        De boeking is maar het begin. Daar bovenop komen brandstof of vluchten,
        eten en drinken ter plekke, uitjes, en de &ldquo;kleine&rdquo; uitgaven
        die op vakantie nooit klein blijven. Het is precies daarom dat de
        eindrekening bijna altijd hoger uitvalt dan het bedrag waarop je
        gerekend had.
      </p>

      <h2 className="font-display" style={h2}>Het vakantiegeld-misverstand</h2>
      <p className="font-body text-text-soft" style={p}>
        Veel gezinnen zien het vakantiegeld in mei als een bonus en geven het in
        de zomer volledig uit. Maar reken je het mee als deel van je jaarinkomen,
        dan is het geen extraatje, het is gewoon uitgesteld loon. Wie een deel
        ervan apart houdt, voorkomt dat de zomer een gat in het najaar slaat.
      </p>

      <h2 className="font-display" style={h2}>Zo voorkom je de naschok</h2>
      <p className="font-body text-text-soft" style={p}>
        Bepaal vooraf een totaalbudget voor de hele reis, inclusief eten,
        uitjes en brandstof, en zet dat bedrag het hele jaar door maandelijks
        opzij. €200 per maand is €2.400 in de zomer. Zo betaal je de vakantie met
        geld dat er al is, in plaats van met de maanden erna. Dit is dezelfde
        gedachte als de{" "}
        <Link href="/inzichten/seizoens-kostenkalender-per-maand" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">seizoens-kostenkalender</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd of er ruimte is voor een vakantiepotje?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>.
      </p>
    </>
  );
}
