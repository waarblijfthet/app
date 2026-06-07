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

export default function KerstpotVerjaardagspotZoBouwdenWeDie() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Hoe de drie jaarlijkse pieken van Daan en Roos samen €1.800 waren, en €150 per maand worden als je ze uitsmeert",
            "Waarom een apart potje werkt: december voelt niet als een klap als het geld er al staat",
            "De vier concrete stappen die ze zetten, inclusief de automatische overboeking op salarisdag",
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
          <strong>Echte case.</strong> Naam en details aangepast voor privacy; de aanpak en uitkomst zijn echt. Bedragen hangen af van je eigen situatie.
        </p>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A", fontSize: "1.05rem" }}>
        Daan en Roos werden elk jaar overvallen door december, een klap van <strong>€500 en meer</strong> die ineens van de rekening ging. Tel daar de verjaardagen en de zomervakantie bij op, en je zit op <strong>€1.800 per jaar</strong> aan voorspelbare pieken. Omgerekend: <strong>€150 per maand</strong> in drie aparte potjes, en sindsdien staat de kerstpot gewoon klaar. Dit is precies hoe we dat deden.
      </p>

      <h2 className="font-display" style={h2}>Wat er eerst misging</h2>
      <p className="font-body text-text-soft" style={p}>
        Hun maandbudget klopte, op de feestmaanden na. Sinterklaas en kerst, de verjaardagen, de zomervakantie: die kwamen allemaal rechtstreeks uit de lopende rekening, op het moment zelf. In december stond de rekening dus rood of de spaarpot werd geplunderd. Het gekke was: ze hadden nooit uitgerekend hoeveel die &ldquo;onregelmatige&rdquo; kosten samen per jaar waren.
      </p>

      <h2 className="font-display" style={h2}>Wat we veranderden</h2>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "20px" }}>
        <li style={{ marginBottom: "8px" }}><strong>We telden vorig jaar op.</strong> December (Sinterklaas + kerst) zo&apos;n €500, verjaardagen samen ±€500, en de zomervakantie ±€800. Totaal ongeveer <strong>€1.800 per jaar</strong> aan voorspelbare pieken.</li>
        <li style={{ marginBottom: "8px" }}><strong>Gedeeld door twaalf:</strong> €150 per maand. Ineens was de &ldquo;klap&rdquo; een vast, klein maandbedrag.</li>
        <li style={{ marginBottom: "8px" }}><strong>Drie aparte potjes:</strong> een feestpotje, een verjaardagspot en een vakantiepot, met een automatische overboeking op de dag dat het salaris binnenkomt.</li>
        <li><strong>Niet aankomen tot het moment.</strong> Het geld staat apart, dus de hoofdrekening voelt niet meer &ldquo;ruimer dan het is&rdquo;.</li>
      </ol>

      <h2 className="font-display" style={h2}>De uitkomst</h2>
      <VoorNa rows={[
        ["December", "-€500 ineens", "Betaald uit potje"],
        ["Stress in piekmaanden", "Hoog", "Weg"],
        ["Spaargeld aangesproken", "Elk jaar", "Niet meer"],
        ["Vast opzij per maand", "€0", "€150 (3 potjes)"],
      ]} />
      <p className="font-body text-text-soft" style={p}>
        Hetzelfde geld, alleen anders verdeeld over het jaar. December voelt nu niet meer als een klap, maar als iets waar al voor gespaard is. En omdat het potje zichtbaar vol loopt, is er ook minder neiging om &ldquo;alvast&rdquo; iets te kopen.
      </p>

      <p className="font-body text-text-soft" style={p}>
        Welke pieken er in jouw jaar zitten, zie je in de{" "}
        <Link href="/inzichten/seizoens-kostenkalender-per-maand" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">seizoens-kostenkalender</Link>. Hoe je met aparte potjes werkt, lees je in de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd of er bij jullie ruimte is voor zulke potjes?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Meer praktijkverhalen:</strong>{" "}
        <a href="/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Ons boodschappenbudget mislukte, tot we dit deden</a>{" "}&middot;{" "}
        <a href="/inzichten/bso-kosten-tweede-inkomen-zo-draaiden-we-het-om" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">De BSO slokte ons tweede inkomen op</a>.
      </p>
    </>
  );
}
