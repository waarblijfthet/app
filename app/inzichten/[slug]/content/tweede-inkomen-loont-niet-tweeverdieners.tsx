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

export default function TweedeInkomenLoonNietTweeverdieners() {
  return (
    <>
      <div className="rounded-xl border p-4 mb-8" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          <strong>Echte rekensom.</strong> Naam en details aangepast voor privacy. BSO-kosten en toeslag zijn sterk inkomensafhankelijk — check je eigen situatie via toeslagen.nl.
        </p>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A", fontSize: "1.05rem" }}>
        Je werkt vier dagen, verdient een fatsoenlijk salaris, en toch loopt het geld aan het einde van de maand gewoon op. Hoe? Omdat een groot deel van je tweede inkomen vrijwel direct opgaat aan de kosten die dat inkomen met zich meebrengt — <strong>zonder dat je het in de gaten hebt.</strong>
      </p>

      <h2 className="font-display" style={h2}>De vier kostenvreters van het tweede inkomen</h2>
      <p className="font-body text-text-soft" style={p}>
        <strong>1. Belasting.</strong> Nederland heeft een progressief belastingstelsel. Als het gezinsinkomen al boven circa €75.518 bruto ligt, wordt elk extra euro van het tweede inkomen belast tegen 49,5%. Van €2.500 bruto per maand blijft dan netto circa €1.270 over — vóór kosten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>2. BSO.</strong> Buitenschoolse opvang voor één kind kost in 2026 gemiddeld €900 tot €1.400 per maand voor vijf dagen. Bij een gezinsinkomen boven €90.000 bruto is de kinderopvangtoeslag minimaal — nog geen 33%. Bij twee kinderen op BSO lopen de netto kosten al gauw op tot €1.200 tot €1.800 per maand.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>3. Reiskosten.</strong> OV-abonnement, brandstof, parkeren, slijtage. Gemiddeld €200 tot €400 per maand voor een forens.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>4. Tijdgebrek dat geld kost.</strong> Meer kant-en-klaarmaaltijden, meer eten bestellen, meer mensen inhuren voor klussen. Makkelijk €150 tot €300 per maand extra.
      </p>

      <h2 className="font-display" style={h2}>Cas: Marieke &amp; Rick — €2.100 bruto, €280 netto over</h2>
      <p className="font-body text-text-soft" style={p}>
        Marieke (36) en Rick (38), twee kinderen (4 en 7 jaar). Rick verdient €4.800 bruto, Marieke €2.100 bruto (4 dagen). Ze dachten dat Marieke&apos;s inkomen circa €1.400 netto per maand opleverde. Ze hadden het nooit exact nageteld.
      </p>

      <div className="rounded-xl border my-6 overflow-hidden" style={{ borderColor: "#E8E0D4" }}>
        <div className="grid grid-cols-2" style={{ backgroundColor: "#1C3A2A" }}>
          <div className="px-4 py-2 font-body text-xs font-medium" style={{ color: "#F5F0E8" }}>Post</div>
          <div className="px-4 py-2 font-body text-xs font-medium" style={{ color: "#F5F0E8" }}>Per maand</div>
        </div>
        {[
          ["Marieke bruto inkomen", "€2.100"],
          ["Netto na belasting (49,5% schijf)", "€1.260"],
          ["BSO twee kinderen, 4 dagen (na toeslag)", "- €1.140"],
          ["Reiskosten OV", "- €185"],
          ["Extra eten/bezorging door tijdgebrek", "- €210"],
          ["Werkkleding, kapper, etc.", "- €75"],
          ["Netto wat overblijft", "- €350"],
        ].map(([label, bedrag], i) => (
          <div key={i} className="grid grid-cols-2" style={{ backgroundColor: i % 2 ? "#FDFAF4" : "white" }}>
            <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#1C3A2A", fontWeight: i === 6 ? 600 : 400 }}>{label}</div>
            <div className="px-4 py-2.5 font-body text-sm" style={{ color: i === 6 ? "#B03A2E" : "#1C3A2A", fontWeight: i === 6 ? 600 : 400 }}>{bedrag}</div>
          </div>
        ))}
      </div>

      <p className="font-body text-text-soft" style={p}>
        Marieke&apos;s inkomen leverde per saldo geld op dat ze toe moesten leggen — zonder dat ze het doorhadden. Tel je de pensioenopbouw via haar werkgever mee (circa €300 per maand annualized), dan is het vrijwel break-even. Maar de stress, het haasten en het gevoel van krapte: dat was reëel.
      </p>

      <VoorNa rows={[
        ["Werkdagen Marieke", "4 dagen", "3 dagen"],
        ["BSO-kosten/mnd", "€1.140 netto", "€855 netto"],
        ["Netto effect per maand", "- €350", "+ €180"],
        ["Gevoel thuis", "Gejaagd", "Merkbaar rustiger"],
      ]} />

      <p className="font-body text-text-soft" style={p}>
        Ze gingen terug van 4 naar 3 dagen. De BSO-kosten daalden met één dag (€285 netto minder). Haar inkomen daalde, maar de kosten daalden méér. Netto effect: <strong>€180 per maand meer over</strong> — plus aanzienlijk minder stress.
      </p>

      <h2 className="font-display" style={h2}>Betekent dit dat je beter kunt stoppen?</h2>
      <p className="font-body text-text-soft" style={p}>
        Niet per se. Elke dag dat je werkt bouw je pensioen op. Een gat in je cv heeft effect op je carrière. En werk is voor veel mensen meer dan inkomen. Bovendien: de BSO-kosten zijn tijdelijk. Als de kinderen naar groep 5 gaan, vervalt de BSO — en kantelt de rekensom volledig.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De vraag is niet &ldquo;stop ik of niet&rdquo; maar: <strong>klopt mijn werkpatroon bij mijn leven en mijn financiën?</strong> Vier dagen werken terwijl de netto opbrengst nihil is en de stress hoog, is geen vanzelfsprekende keuze.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Lees ook:{" "}
        <Link href="/inzichten/tweeverdieners-toch-krap" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">tweeverdieners en toch krap — hoe kan dat?</Link>{" "}
        en{" "}
        <Link href="/inzichten/bso-kosten-tweede-inkomen-zo-draaiden-we-het-om" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">de BSO slokte ons tweede inkomen op — zo draaiden we het om</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je jouw eigen rekensom zien?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}
        — dan zie je in 15 minuten hoeveel het tweede inkomen jou netto oplevert. Of bespreek het concreet in een{" "}
        <Link href="/adviesgesprek" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">eenmalig adviesgesprek van €125</Link>.
      </p>
    </>
  );
}
