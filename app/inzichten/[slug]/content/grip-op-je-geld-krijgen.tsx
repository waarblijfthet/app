import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function GripOpJeGeldKrijgen() {
  return (
    <>
      {/* Herken je dit? */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#FDFAF4", border: "1px solid #E8E0D4" }}
      >
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#1C3A2A" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5E4E", fontWeight: 300 }}>
          Je hebt geen schuldenprobleem. Je hebt een overzichtsprobleem. Je verdient goed, maar je
          weet niet precies waar het heen gaat, en daardoor stuur je nergens op.
        </p>
      </div>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Hoe je in vijf stappen grip op je geld krijgt, ook zonder bankkoppeling of huishoudboekje",
            "Waarom grip vooral over overzicht gaat, niet over zuiniger leven",
            "Hoe je dat overzicht houdt zonder elke dag iets bij te hoeven werken",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Grip op je geld krijg je in vijf stappen: breng je inkomsten in beeld, zet al je vaste
        lasten op een rij, meet je dagelijkse uitgaven, verdeel je inkomen meteen na binnenkomst, en
        controleer maandelijks kort of het nog klopt. Je hebt er geen app of bankkoppeling voor
        nodig, alleen een eerlijk beginbeeld.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Veel mensen denken bij grip op geld aan zuiniger leven. Maar als je goed verdient, is dat
        zelden het punt. Het punt is overzicht. Zo&apos;n 40 procent van de Nederlanders worstelt met de
        eigen financiële administratie, en zonder overzicht stuur je nergens op. Dit gaat niet over schuldhulp. Dit is voor wie genoeg verdient en alleen het stuur kwijt is.
      </p>

      <h2 className="font-display" style={h2}>
        Stap 1: breng je inkomsten in beeld
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Begin bij wat er binnenkomt. Je vaste netto-inkomen, en als je een wisselend inkomen hebt,
        een voorzichtig gemiddelde over de afgelopen zes tot twaalf maanden. Dit is je startpunt,
        alles daarna meet je hiertegen af.
      </p>

      <h2 className="font-display" style={h2}>
        Stap 2: zet al je vaste lasten op een rij
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Pak de afschriften van een heel jaar, zodat je ook de premies en aanslagen meeneemt die maar
        een of twee keer afschrijven. Reken alles om naar een bedrag per maand. Het volledige
        stappenplan staat in mijn artikel over een{" "}
        <Link
          href="/inzichten/vaste-lasten-overzicht-maken"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          overzicht van je vaste lasten maken
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Stap 3: meet je dagelijkse uitgaven
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Boodschappen, tanken, lunches, bezorgen. Dit is de categorie waar bijna iedereen zich op
        verkijkt, omdat je het niet bijhoudt. Je hoeft het niet maanden te turven. Twee maanden
        terugkijken op je afschriften geeft al een eerlijk beeld.
      </p>

      <h2 className="font-display" style={h2}>
        Stap 4: verdeel je inkomen meteen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hier ontstaat de echte grip. Laat je inkomen niet op één hoop staan, maar verdeel het op de
        dag dat het binnenkomt: vaste lasten, dagelijks geld en sparen op aparte rekeningen of
        potjes. Wat overblijft, mag je vrij besteden. Hoe je dat opzet, lees je bij{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
        </Link>{" "}
        en in de uitleg van de{" "}
        <Link
          href="/inzichten/50-30-20-regel-hoger-inkomen"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          50/30/20-regel
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Stap 5: doe een korte maandcheck
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Grip houden kost geen dagelijkse boekhouding. Eén keer per maand vijf minuten kijken of het
        nog klopt is genoeg. Klopt iets structureel niet, dan stuur je bij. Dat is het hele
        verschil met een huishoudboekje dat je na twee weken laat vallen: je hoeft niet alles te
        registreren, je stuurt op de grote lijn.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom een app niet de oplossing is
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een app die aan je bank gekoppeld is, registreert wat er gebeurd is. Maar registreren is
        geen sturen, en veel mensen willen hun rekening niet aan een app koppelen. Het draait niet
        om meer data, het draait om een paar duidelijke afspraken die je volhoudt. Zie ook waarom je{" "}
        <Link
          href="/inzichten/waarom-hou-ik-nooit-geld-over"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          nooit geld overhoudt
        </Link>{" "}
        ondanks een goed inkomen.
      </p>

      {/* Intern CTA */}
      <div
        style={{
          backgroundColor: "#E8F2EC",
          borderRadius: "16px",
          padding: "1.5rem",
          marginTop: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <p className="font-body font-light text-text-soft" style={{ marginBottom: "1rem" }}>
          Sneller dan zelf alle afschriften doorspitten: de gratis analyse loodst je in een paar minuten door stap 1 tot en met 3 en laat zien waar je geld naartoe gaat. Schattingen zijn goed genoeg, geen bankkoppeling nodig.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
