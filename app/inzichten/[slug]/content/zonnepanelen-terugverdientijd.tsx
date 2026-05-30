import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function ZonnepanelenTerugverdientijd() {
  return (
    <>
      <p className="font-body text-text-soft" style={p}>
        Zonnepanelen klinken als een verstandige uitgave: je betaalt nu en
        bespaart daarna jaren op je energierekening. Maar met het einde van de
        salderingsregeling in zicht is de vraag &ldquo;loont het nog?&rdquo;
        actueler dan ooit.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Kort gezegd: een set van 8 zonnepanelen kost volgens Milieu Centraal
        gemiddeld zo&apos;n €3.200 inclusief installatie, en de terugverdientijd
        ligt nu rond de 6 tot 8 jaar. De panelen gaan ongeveer 25 jaar mee, dus
        daarna heb je nog jaren voordeel — maar de rekensom verandert wel door de
        salderingsregeling.
      </p>

      <h2 className="font-display" style={h2}>Wat ze kosten en opleveren</h2>
      <p className="font-body text-text-soft" style={p}>
        Met 8 panelen bespaar je gemiddeld zo&apos;n €550 per jaar zolang je kunt
        salderen. Daarna — als de salderingsregeling per 2027 stopt — daalt de
        besparing naar ongeveer €170 per jaar, gerekend over de levensduur. Op
        een investering van €3.200 blijft het rendement daarmee netjes, maar de
        terugverdientijd hangt sterk af van wanneer en hoeveel je zelf verbruikt.
      </p>

      <h2 className="font-display" style={h2}>Het saldering-kantelpunt</h2>
      <p className="font-body text-text-soft" style={p}>
        Salderen — je teruggeleverde stroom wegstrepen tegen je verbruik — kan
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
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe eerst de gratis analyse</Link>{" "}en zie hoe jullie ervoor staan.
      </p>
    </>
  );
}
