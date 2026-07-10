import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function ZonnepanelenTerugverdientijd() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat 8 zonnepanelen kosten en opleveren, en wat er verandert als de salderingsregeling in 2027 stopt",
            "Dat de terugverdientijd nu 6-8 jaar is en waarom zelf verbruiken steeds belangrijker wordt",
            "Wanneer zonnepanelen slim zijn: alleen als de investering de buffer niet leegtrekt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Zonnepanelen klinken als een verstandige uitgave: je betaalt nu en
        bespaart daarna jaren op je energierekening. Maar met het einde van de
        salderingsregeling in zicht is de vraag &ldquo;loont het nog?&rdquo;
        actueler dan ooit.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: een set van 8 zonnepanelen kost volgens Milieu Centraal
        gemiddeld zo&apos;n €3.200 inclusief installatie, en de terugverdientijd
        ligt nu rond de 6 tot 8 jaar. De panelen gaan ongeveer 25 jaar mee, dus
        daarna heb je nog jaren voordeel, maar de rekensom verandert wel door de
        salderingsregeling.
      </p>

      <h2 className="font-display" style={h2}>Wat ze kosten en opleveren</h2>
      <p className="font-body text-text-soft" style={p}>
        Met 8 panelen bespaar je gemiddeld zo&apos;n €550 per jaar zolang je kunt
        salderen. Daarna, als de salderingsregeling per 2027 stopt, daalt de
        besparing naar ongeveer €170 per jaar, gerekend over de levensduur. Op
        een investering van €3.200 blijft het rendement daarmee netjes, maar de
        terugverdientijd hangt sterk af van wanneer en hoeveel je zelf verbruikt.
      </p>

      <h2 className="font-display" style={h2}>Het saldering-kantelpunt</h2>
      <p className="font-body text-text-soft" style={p}>
        Salderen, je teruggeleverde stroom wegstrepen tegen je verbruik, kan
        nog tot eind 2026 en stopt daarna in één keer. Vanaf dan loont het vooral
        om je opgewekte stroom zo veel mogelijk zelf direct te gebruiken
        (overdag wassen, laden, koken). Hoe meer je zelf verbruikt, hoe sneller
        de panelen zich terugverdienen.
      </p>

      <h2 className="font-display" style={h2}>Een uitgave, geen maandlast</h2>
      <p className="font-body text-text-soft" style={p}>
        Anders dan een auto of abonnement zijn zonnepanelen een eenmalige uitgave
        die je vaste lasten juist verlaagt. Voor gezinnen die structureel krap
        zitten is het wel een afweging: €3.200 ineens is veel geld, en dat heeft
        alleen zin als het je buffer niet leegtrekt. Een lening om te besparen is
        zelden verstandig.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Twijfel je of je de ruimte hebt voor zo&apos;n investering?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe eerst de analyse</Link>{" "}en zie hoe jullie ervoor staan.
      </p>
    </>
  );
}
