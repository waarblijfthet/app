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

export default function OnsBoodschappenbudgetMislukte() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Hoe Bram en Eva van €950 naar €720 per maand gingen — zonder honger en zonder soberheid",
            "Welke vier aanpassingen ze maakten en welke twee momenten het meeste verschil maakten",
            "Dat het niet om zuiniger zijn gaat maar om een systeem: weekbudget, weekmenu, korte check-in",
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
          <strong>Echte case.</strong> Een van de eerste gezinnen die ik hielp. Naam en details aangepast voor hun privacy; de aanpak en de uitkomst zijn echt. Bedragen hangen af van je eigen situatie.
        </p>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A", fontSize: "1.05rem" }}>
        Bram en Eva gaven ruim <strong>€950 per maand</strong> uit aan boodschappen zonder te weten waar het heen ging. Drie maanden later zaten ze op <strong>€720</strong> — zonder honger en zonder soberheid. Dit is precies wat we veranderden, en wat het opleverde.
      </p>

      <h2 className="font-display" style={h2}>Wat er eerst misging</h2>
      <p className="font-body text-text-soft" style={p}>
        Ze hadden geen budget — niet omdat ze het niet wilden, maar omdat ze er nooit aan toekwamen. Drie tot vier keer per week even langs de supermarkt, geen weekmenu, en op vrijdagmiddag met een lege maag door de winkel. De online boodschappen werden tot het laatste moment aangevuld met "even dit ook nog". Het Nibud rekent voor een gezin als dat van hen een norm van €627; zij zaten daar ruim €300 boven, zonder dat het luxe voelde.
      </p>

      <h2 className="font-display" style={h2}>Wat we veranderden (in drie weken)</h2>
      <p className="font-body text-text-soft" style={p}>
        We hebben niet bezuinigd op kwaliteit. We hebben de manier van winkelen veranderd:
      </p>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "20px" }}>
        <li style={{ marginBottom: "8px" }}><strong>Eén weekbudget van €175</strong>, op een aparte rekening. Op is op tot maandag — geen bijvullen vanuit de hoofdrekening.</li>
        <li style={{ marginBottom: "8px" }}><strong>Weekmenu vóór het winkelen.</strong> Vijf avonden plannen, één keer grote boodschappen doen. Dat haalde de losse ritjes (en de impuls) eruit.</li>
        <li style={{ marginBottom: "8px" }}><strong>Een korte check-in ná elke keer boodschappen.</strong> Eén appje: wat was het, en zat je binnen budget? Niet als controle, maar als spiegel.</li>
        <li><strong>Sturen op de pijnmomenten.</strong> Voor hen waren dat de vrijdagmiddag en het online bijbestellen. Daar zetten we een simpele regel op: nooit hongerig winkelen, en de online mand 's avonds laten staan tot de volgende ochtend.</li>
      </ol>

      <h2 className="font-display" style={h2}>De uitkomst</h2>
      <VoorNa rows={[
        ["Boodschappen/maand", "± €950", "± €720"],
        ["Losse winkelritten", "3-4 per week", "1 per week"],
        ["Eten dat bedierf", "Wekelijks", "Bijna nooit"],
        ["Ruimte per maand", "€0 extra", "+€230"],
      ]} />
      <p className="font-body text-text-soft" style={p}>
        Zo'n €230 per maand, oftewel bijna <strong>€2.760 per jaar</strong> — zonder dat er minder of slechter werd gegeten. Het verschil zat niet in zuiniger zijn, maar in een plan en een zichtbare grens.
      </p>

      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F5F0E8", borderColor: "#E8E0D4" }}
      >
        <p className="font-body text-sm" style={{ color: "#1C3A2A" }}>
          <strong>Wat het níet was:</strong> geen merkloos-alles, geen maaltijden overslaan, geen ingewikkelde spreadsheet. Eén weekbudget, een weekmenu en een appje na de boodschappen — dat was genoeg.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Wil je weten wat een realistisch boodschappenbedrag is voor jóuw gezin? Lees{" "}
        <Link href="/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">wat normaal is volgens Nibud vs. de werkelijkheid</Link>, of bekijk de vijf{" "}
        <Link href="/inzichten/hoe-bespaar-je-op-boodschappen" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">lekken waar het geld weglekt</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd waar het bij jullie zit?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}— boodschappen is een van de categorieën die we vergelijken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Meer praktijkverhalen:</strong> <a href="/inzichten/kerstpot-en-verjaardagspot-zo-bouwden-we-die" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">December: zo bouwden we een kerst- en verjaardagspot</a> &middot; <a href="/inzichten/bso-kosten-tweede-inkomen-zo-draaiden-we-het-om" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">De BSO slokte ons tweede inkomen op</a>.
      </p>
    </>
  );
}
