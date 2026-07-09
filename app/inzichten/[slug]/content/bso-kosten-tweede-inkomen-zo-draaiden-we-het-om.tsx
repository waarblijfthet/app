import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

function VoorNa({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="rounded-xl border my-6 overflow-hidden" style={{ borderColor: "#E6E9E7" }}>
      <div className="grid grid-cols-3" style={{ backgroundColor: "#16211F" }}>
        {["", "Voor", "Na"].map((h, i) => (
          <div key={i} className="px-4 py-2 font-body text-xs font-medium" style={{ color: "#F7F8F7" }}>{h}</div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-3" style={{ backgroundColor: i % 2 ? "#FFFFFF" : "white" }}>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#16211F", fontWeight: 500 }}>{r[0]}</div>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#B03A2E" }}>{r[1]}</div>
          <div className="px-4 py-2.5 font-body text-sm" style={{ color: "#2D6A4F", fontWeight: 600 }}>{r[2]}</div>
        </div>
      ))}
    </div>
  );
}

export default function BsoKostenTweedeInkomen() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Hoe je uitrekent wat een extra werkdag netto werkelijk oplevert na opvang, belasting en reiskosten",
            "Waarom bovenmodale tweeverdieners weinig kinderopvangtoeslag krijgen en hoe groot dat verschil is",
            "Dat minder BSO-dagen niet per se minder inkomen betekent, als de berekening klopt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border p-4 mb-8" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          <strong>Echte case.</strong> Naam en details aangepast voor privacy; de aanpak en uitkomst zijn echt. Opvangkosten en toeslag verschillen per inkomen, reken je eigen situatie door op toeslagen.nl.
        </p>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F", fontSize: "1.05rem" }}>
        Karim en Noor hielden van het tweede inkomen netto bijna niets over, de BSO slokte het op. Door uit te rekenen wat die extra werkdag écht opleverde en flexibeler te gaan werken, gingen ze van <strong>3 naar 1 dag BSO</strong>: zo'n <strong>€345 per maand minder</strong>, én meer rust thuis.
      </p>

      <h2 className="font-display" style={h2}>Wat er eerst speelde</h2>
      <p className="font-body text-text-soft" style={p}>
        Twee goede inkomens, twee jonge kinderen, drie dagen buitenschoolse opvang. Omdat ze samen bovenmodaal verdienen, kregen ze relatief weinig kinderopvangtoeslag, hun eigen bijdrage lag rond de €520 per maand. Tel daar de reistijd, het haasten en de stress bij op, en de derde werkdag leverde netto verrassend weinig op. Maar niemand had dat ooit hardop doorgerekend.
      </p>

      <h2 className="font-display" style={h2}>Wat we veranderden</h2>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "20px" }}>
        <li style={{ marginBottom: "8px" }}><strong>We rekenden de derde werkdag echt door.</strong> Wat bleef er ná opvang, reiskosten en een hogere belastingschijf netto over? Bij hen: bijna niets.</li>
        <li style={{ marginBottom: "8px" }}><strong>Flexibeler werken besproken.</strong> Niet minder verdienen om het verdienen, maar één dag thuis/anders ingedeeld, en hoe je dat bij je werkgever brengt.</li>
        <li><strong>BSO terug van 3 naar 1 dag.</strong> De besparing op de opvang was groter dan het beetje netto-inkomen dat wegviel, en er kwam rust voor terug.</li>
      </ol>

      <h2 className="font-display" style={h2}>De uitkomst</h2>
      <VoorNa rows={[
        ["Dagen BSO", "3", "1"],
        ["Eigen bijdrage opvang", "± €520/mnd", "± €175/mnd"],
        ["Rust thuis", "Gejaagd", "Merkbaar meer"],
        ["Netto effect per maand", "—", "+ ± €345"],
      ]} />
      <p className="font-body text-text-soft" style={p}>
        Belangrijk: dit is geen pleidooi om minder te werken, voor sommige gezinnen zijn die dagen onmisbaar. Het punt is dat ze het nooit hadden <em>doorgerekend</em>. Toen ze dat deden, bleek de "vanzelfsprekende" derde dag hen meer te kosten dan op te leveren. De maximale vergoede opvanguurprijs is in 2026 €9,98; hoeveel je zelf betaalt hangt sterk af van je inkomen.
      </p>

      <p className="font-body text-text-soft" style={p}>
        Meer over de kosten van kinderen lees je in{" "}
        <Link href="/inzichten/wat-kost-een-kind-per-maand" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">wat kost een kind per maand</Link>, en waarom twee inkomens tóch krap kunnen voelen in{" "}
        <Link href="/inzichten/tweeverdieners-toch-krap" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">tweeverdieners en toch krap</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd waar jullie geld naartoe gaat?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong>Meer praktijkverhalen:</strong> <a href="/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Ons boodschappenbudget mislukte, tot we dit deden</a> &middot; <a href="/inzichten/kerstpot-en-verjaardagspot-zo-bouwden-we-die" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">December: zo bouwden we een kerst- en verjaardagspot</a>.
      </p>
    </>
  );
}
