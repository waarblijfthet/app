import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WatKostEenKindPerMaand() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat het Nibud berekent voor de kosten van één kind en dat die kosten nooit meer weggaan",
            "Hoe de kosten verschuiven van opvang naar sport, school en telefoon naarmate kinderen ouder worden",
            "Of alle regelingen binnenkomen: kinderbijslag, kindgebonden budget en kinderopvangtoeslag",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Een kind krijgen verandert alles, ook je financiën, en vaak meer dan je
        vooraf inschat. Niet door de luiers of de wieg, maar door wat er daarna
        elke maand bijkomt en nooit meer weggaat.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: het Nibud rekent dat één kind gemiddeld zo&apos;n 15% van het
        besteedbaar inkomen kost, twee kinderen 25% en drie kinderen 29%. Voor een
        gezin met twee modale inkomens komt dat voor één kind al snel neer op
        €887 tot €1.000 per maand.
      </p>

      <h2 className="font-display" style={h2}>Niet de babyspullen, maar de jaren erna</h2>
      <p className="font-body text-text-soft" style={p}>
        De eenmalige babyuitrusting valt vaak mee. Het zijn de structurele kosten
        die tellen: meer boodschappen, een grotere woning of auto, en, de
        grootste post voor jonge gezinnen, kinderopvang. Naarmate kinderen ouder
        worden verschuiven de kosten naar kleding, sport, telefoon en uiteindelijk
        school.
      </p>

      <h2 className="font-display" style={h2}>Voor alleenstaande ouders ligt het hoger</h2>
      <p className="font-body text-text-soft" style={p}>
        Als alleenstaande ouder draagt één inkomen alle kosten. Het Nibud rekent
        daar hogere percentages: ongeveer 23% van het besteedbaar inkomen voor
        één kind en 37% voor twee. Dat verklaart waarom een prima salaris voor
        één persoon toch krap kan voelen, zie de casestudy van{" "}
        <Link href="/inzichten/waar-blijft-het-bij-fatima" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Fatima</Link>.
      </p>

      <h2 className="font-display" style={h2}>Wat helpt</h2>
      <p className="font-body text-text-soft" style={p}>
        Controleer eerst of álle regelingen binnenkomen: kinderbijslag,
        kindgebonden budget en kinderopvangtoeslag. Daarna helpt het om de
        kindkosten een eigen plek te geven in je budget in plaats van ze te laten
        oplossen in het geheel. Een vaste verdeling met aparte potjes, zoals de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>, maakt dat concreet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd hoe jullie ervoor staan met de kinderen erbij?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de analyse</Link>.
      </p>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}
      >
        <p className="font-body text-sm" style={{ color: "#16211F" }}>
          <strong>Uit de praktijk.</strong> Een gezin met hoge opvangkosten dacht met ons mee over flexibeler werken in plaats van alleen bezuinigen. Twee dagen minder BSO gaf een flinke besparing én meer rust thuis.
        </p>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Uit de praktijk: lees <a href="/inzichten/bso-kosten-tweede-inkomen-zo-draaiden-we-het-om" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe een gezin de BSO-kosten omdraaide</a>.
      </p>
      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/is-3000-netto-genoeg-gezin" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">of €3.000 netto genoeg is voor een gezin</Link>.</p>
    </>
  );
}
