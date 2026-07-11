import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WaaromLijktIedereenRijker() {
  return (
    <>
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom het lijkt alsof iedereen om je heen meer geld heeft dan jij",
            "Hoe sociale media je gevoel over je eigen geld vertekent",
            "Waarom dit juist goedverdieners hard raakt, en wat helpt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Verre reizen, verbouwde keukens, nieuwe autos, en jij vraagt je af hoe ze
        dat allemaal betalen. Je verdient zelf prima, en toch voelt het alsof je
        achterloopt op iedereen om je heen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat gevoel is zo gewoon geworden dat er een naam voor is. Het klopt bijna
        nooit met de werkelijkheid, en het kost je meer dan je denkt, want het
        zet je aan tot uitgaven die je eigenlijk niet wilde doen.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: het lijkt alsof iedereen rijker is omdat je jouw complete
        financiele plaatje vergelijkt met de zorgvuldig gekozen hoogtepunten van
        anderen. Wat je online ziet is vaak op afbetaling of boven hun stand. De
        oplossing is niet meer verdienen, maar je eigen cijfers als ijkpunt nemen.
      </p>

      <h2 className="font-display" style={h2}>
        Je vergelijkt je binnenkant met de buitenkant van een ander
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Jij kent je eigen situatie volledig: de vaste lasten, de tegenvallers, het
        saldo dat te vroeg op is. Van een ander zie je alleen het eindresultaat,
        de vakantiefoto en de nieuwe auto, nooit de rekening eronder. Je zet dus
        je eigen ruwe werkelijkheid naast andermans etalage. Die vergelijking kun
        je per definitie niet winnen, hoe goed je het ook doet.
      </p>

      <h2 className="font-display" style={h2}>
        Sociale media laat alleen de hoogtepunten zien
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Niemand plaatst een foto van de aflossing op zijn creditcard of het
        gesprek over de rood staande rekening. Wat overblijft is een stroom van
        hoogtepunten die samen een beeld schetsen dat voor niemand echt bestaat.
        Een deel van wat je ziet is bovendien geleend of ver boven de eigen stand,
        precies de leefstijlinflatie die iedereen treft. Meer daarover in{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie: meer verdienen, niks over</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom dit juist goedverdieners raakt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hoe meer je verdient, hoe hoger de groep is waarmee je jezelf onbewust
        vergelijkt. Je collega met dezelfde functie, de vrienden in dezelfde wijk,
        de mensen op je tijdlijn. De lat schuift mee omhoog met je inkomen,
        waardoor meer verdienen het gevoel van achterlopen niet wegneemt maar
        soms zelfs versterkt. Dat is de reden dat geldstress vaak toeneemt met het
        inkomen in plaats van af.
      </p>

      <h2 className="font-display" style={h2}>
        Als het gevoel niet klopt met de cijfers
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Wanneer je je arm voelt terwijl je situatie objectief prima is, heeft dat
        een naam: money dysmorphia, een vertekend beeld van je eigen financien.
        Het is geen karakterfout en je bent er niet de enige in. Wat het is en
        hoe het ontstaat, lees je in{" "}
        <Link href="/inzichten/money-dysmorphia-uitleg" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">money dysmorphia uitgelegd</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Wat helpt: je eigen cijfers als anker
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het enige eerlijke ijkpunt is je eigen situatie, niet de tijdlijn van een
        ander. Zodra je zwart op wit ziet waar jouw geld heen gaat en wat je echt
        overhoudt, verliest de vergelijking zijn greep. Reken uit{" "}
        <Link href="/inzichten/vrij-besteedbaar-inkomen-berekenen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">wat je vrij besteedbaar overhoudt</Link>{" "}of doe de{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">gratis analyse</Link>{" "}en vergelijk je uitgaven met vergelijkbare huishoudens in plaats van met een etalage.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Lees ook{" "}
        <Link href="/inzichten/geldmythes-die-je-arm-houden" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">vijf geldmythes die je arm houden</Link>{" "}en{" "}
        <Link href="/inzichten/goed-salaris-toch-geldstress" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">goed salaris, toch geldstress</Link>.
      </p>
    </>
  );
}
