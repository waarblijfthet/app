import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WaarBlijftHetBijMarkEnLisa() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Hoe een gezin van €4.000 netto met twee kinderen er werkelijk voor staat na alle posten",
            "Welke twee afwijkingen het verschil bij hen verklaren en hoe groot die samen zijn",
            "Dat €300-400 per maand extra overhouden mogelijk is zonder wezenlijk soberder te leven",
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
          <strong>Fictief gezin.</strong> De cijfers zijn samengesteld uit
          openbare gemiddelden (Nibud, CBS, Belastingdienst) en praktijkindicaties
         , geen echte klant en geen echt huishouden. Bedoeld ter herkenning.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Mark en Lisa hebben samen €4.000 netto per maand: Mark fulltime, Lisa
        drie dagen. Twee jonge kinderen, een koopwoning net buiten de Randstad,
        één auto. Daarmee zitten ze in de bovenste 25% van Nederland qua inkomen.
        En toch is het elke maand passen en meten.
      </p>

      <h2 className="font-display" style={h2}>Het profiel</h2>
      <p className="font-body text-text-soft" style={p}>
        Netto inkomen: €4.000 per maand (1,5 inkomen). Gezin: twee volwassenen,
        twee kinderen (4 en 7 jaar). Wonen: koopwoning, hypotheek €1.450.
        Vervoer: één eigen auto. Geen schulden, geen gekke uitgaven.
      </p>

      <h2 className="font-display" style={h2}>Waar het geld heen gaat</h2>
      <p className="font-body text-text-soft" style={p}>
        Na hypotheek, energie, verzekeringen en de auto blijft er op papier
        ongeveer €505 over, precies het bedrag dat een gemiddeld gezin met dit
        profiel overhoudt. Maar dat getal klopt alleen als alle andere posten
        binnen de norm blijven. En dat doen ze niet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De boodschappen lopen op tot zo&apos;n €875 per maand, ruim boven de
        Nibud-norm van €627. En de abonnementen tikken samen richting €210,
        terwijl Mark en Lisa de helft daarvan zouden schatten.
      </p>

      <h2 className="font-display" style={h2}>Waar blijft het?</h2>
      <p className="font-body text-text-soft" style={p}>
        De twee afwijkingen: boodschappen die €250 boven de norm liggen, en een
        abonnementenstapel die niemand meer overziet. Geen ramp, maar samen
        eten ze de €505 op die er &ldquo;zou moeten zijn&rdquo;. Dit is hetzelfde
        patroon als bij{" "}
        <Link href="/inzichten/is-4000-euro-netto-goed-salaris-nederland" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">€4.000 netto: een goed salaris?</Link>
      </p>

      <h2 className="font-display" style={h2}>Wat een vergelijkbaar gezin wél overhoudt</h2>
      <p className="font-body text-text-soft" style={p}>
        Een gezin met hetzelfde inkomen dat de boodschappen terugbrengt naar €700
        met weekmenu&apos;s en de abonnementen opschoont, houdt zonder offers al
        snel €300–400 per maand meer over. Het verschil is structuur, niet
        inkomen, zie{" "}
        <Link href="/inzichten/goed-salaris-toch-krap" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">goed salaris, toch krap</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Herken je Mark en Lisa?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}en zie jullie eigen verdeling.
      </p>
    </>
  );
}
