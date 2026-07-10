import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function VerbouwenFinancieleValkuilen() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "De drie financiële valkuilen die bijna iedereen bij een verbouwing overkomt",
            "Waarom 10-20% marge bovenop de offerte geen luxe is maar een noodzaak",
            "Dat een verbouwing meefinancieren in de hypotheek niet gratis aanvoelt maar je maandlast voor 30 jaar verhoogt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Een verbouwing is zelden alleen een verbouwing. Het is een uitgave die
        bijna altijd hoger uitvalt dan begroot, en die daarna je maandlasten
        stilletjes optrekt. Niet omdat mensen onverstandig zijn, maar omdat een
        paar voorspelbare valkuilen vrijwel iedereen overkomen.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: de drie grootste financiële valkuilen bij verbouwen zijn de
        uitloop van het budget, het meefinancieren in de hypotheek waardoor de
        maandlast jaren stijgt, en de lifestyle-sprong erna, een mooiere keuken
        nodigt uit tot mooiere spullen eromheen.
      </p>

      <h2 className="font-display" style={h2}>Valkuil 1: het budget loopt altijd uit</h2>
      <p className="font-body text-text-soft" style={p}>
        Meerwerk, tegenvallers achter de muur, en &ldquo;nu we toch bezig
        zijn&rdquo;-keuzes: een verbouwing eindigt zelden op het beginbedrag. Een
        realistische marge van 10 tot 20% bovenop de offerte is geen luxe maar een
        noodzaak. Wie zonder marge begint, financiert de uitloop uit de buffer —
        of erger, uit een lening.
      </p>

      <h2 className="font-display" style={h2}>Valkuil 2: meefinancieren voelt gratis</h2>
      <p className="font-body text-text-soft" style={p}>
        Een verbouwing meenemen in de hypotheek maakt het maandelijks behapbaar,
        maar het is geen gratis geld: het verhoogt je woonlast voor jaren. Reken
        het door zoals bij elke{" "}
        <Link href="/inzichten/hogere-hypotheek-wat-kost-het-per-maand" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hogere hypotheek</Link>{" "}— elke €100.000 extra is grofweg €475 per maand.
      </p>

      <h2 className="font-display" style={h2}>Valkuil 3: de lifestyle-sprong erna</h2>
      <p className="font-body text-text-soft" style={p}>
        Een nieuwe keuken vraagt om nieuw servies; een mooiere woonkamer om een
        nieuwe bank. De verbouwing zelf is eenmalig, maar de hogere
        verwachtingen blijven, een vorm van{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie</Link>{" "}die je pas maanden later op je rekening terugziet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Overweeg je een verbouwing?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe eerst de gratis analyse</Link>{" "}en kijk hoeveel ruimte er nu echt is.
      </p>
    </>
  );
}
