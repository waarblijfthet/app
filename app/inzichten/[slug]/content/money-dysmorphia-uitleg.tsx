import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function MoneyDysmorphiaUitleg() {
  return (
    <>
      {/* Herken je dit? */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
      >
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Op papier zit je prima, en toch voel je je voortdurend onzeker over geld. Je durft niks
          uit te geven, of je controleert je saldo telkens opnieuw zonder dat het rust geeft.
        </p>
      </div>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Wat money dysmorphia is en waarom het juist bij goede verdieners voorkomt",
            "Waarom je gevoel over geld kan afwijken van de werkelijkheid",
            "Hoe je je gevoel naast de cijfers legt, zodat er rust kan komen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Money dysmorphia is een vertekend beeld van je eigen financiële situatie: je gevoel klopt
        niet met de cijfers. Vaak voel je je armer of onveiliger dan je feitelijk bent, soms juist
        rijker. Ik zie het juist vaak bij mensen die goed verdienen, en de eerste stap eruit is je gevoel naast de feiten leggen.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom het juist goede verdieners raakt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Je zou denken dat een goed inkomen rust geeft. Maar de onzekerheid zit niet in het bedrag,
        die zit in het niet weten. Als je geen helder beeld hebt van wat er binnenkomt, vastligt en
        overblijft, vult je hoofd dat gat met een gevoel. En een gevoel is bijna altijd somberder
        dan de cijfers, zeker als je veel om je heen ziet wat anderen lijken te kunnen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Sociale media versterken dat. Je ziet de vakanties en verbouwingen van anderen, niet hun
        schulden of hun stress. Daardoor voelt jouw situatie krapper dan ze is, of zet je jezelf
        onder druk om mee te doen. Dat mechanisme beschrijf ik ook in mijn artikel over{" "}
        <Link
          href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          levensstijlinflatie
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Het gevoel is echt, maar niet altijd waar
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Money dysmorphia is geen officiële diagnose, maar het beschrijft iets dat veel mensen
        herkennen. De stress is echt, ook als je situatie objectief prima is. Tegelijk werkt het
        twee kanten op: sommige mensen voelen zich juist veiliger dan verstandig is en geven daardoor
        te makkelijk uit. In beide gevallen is het probleem hetzelfde: het gevoel stuurt, niet de
        cijfers.
      </p>

      <h2 className="font-display" style={h2}>
        Leg je gevoel naast de feiten
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De manier om er rust in te krijgen is het gat tussen gevoel en cijfers dichten. Zodra je
        zwart op wit ziet wat er binnenkomt, wat vastligt en wat overblijft, heeft het sombere
        gevoel minder ruimte om te groeien. Niet omdat het probleem dan weg is, maar omdat je weet
        waar je aan toe bent en waar je op kunt sturen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Begin met de cijfers: reken uit{" "}
        <Link
          href="/inzichten/vrij-besteedbaar-inkomen-berekenen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          wat je vrij besteedbaar overhoudt
        </Link>
        , en lees hoe je van het knagende gevoel afkomt in{" "}
        <Link
          href="/inzichten/goed-salaris-toch-geldstress"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          goed salaris en toch geldstress
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Blijft de onrust over geld groot en heeft die veel invloed op je leven, dan is het verstandig
        om er met iemand over te praten, bijvoorbeeld je huisarts. Geldzorgen en mentale gezondheid
        hangen vaker samen dan mensen denken.
      </p>

      {/* Intern CTA */}
      <div
        style={{
          backgroundColor: "#E7F1EE",
          borderRadius: "16px",
          padding: "1.5rem",
          marginTop: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <p className="font-body font-light text-text-soft" style={{ marginBottom: "1rem" }}>
          Wil je weten waar het bij jou weglekt? Bij de geldscan kijk ik persoonlijk naar jouw cijfers en schrijf ik je een rapport met je drie grootste lekken. In gewone taal, geen gesprek nodig.
        </p>
        <Link href="/geldscan" className="btn-primary">
          Laat mij je cijfers nakijken (€49) &rarr;
        </Link>
      </div>
    </>
  );
}
