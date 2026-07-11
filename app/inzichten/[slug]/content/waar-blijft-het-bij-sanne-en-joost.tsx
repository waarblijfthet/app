import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WaarBlijftHetBijSanneEnJoost() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Hoe €6.200 netto voor een gezin van vijf toch amper €150 per maand sparen oplevert",
            "Welke twee kostenposten het verschil verklaren en hoe groot de werkelijke marge is",
            "Dat structuur, niet meer verdienen, het verschil maakt tussen €150 en €600 per maand overhouden",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="rounded-xl border p-4 mb-8"
        style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}
      >
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          <strong>Fictief gezin.</strong> De cijfers zijn samengesteld uit
          openbare gemiddelden (Nibud, CBS, Belastingdienst) en praktijkindicaties
         , geen echte klant en geen echt huishouden. Bedoeld ter herkenning.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Sanne en Joost verdienen samen €6.200 netto per maand. Twee goede banen,
        drie kinderen, van wie twee pubers, een koopwoning in de Randstad en
        twee auto&apos;s, waarvan één private lease. Op papier zijn ze
        welvarend. En toch staat er aan het einde van de maand bijna niks op de
        spaarrekening.
      </p>

      <h2 className="font-display" style={h2}>
        Het profiel
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Netto inkomen: €6.200 per maand. Gezin: twee volwassenen, drie kinderen
        (8, 13 en 15 jaar). Wonen: koopwoning, hypotheek €1.850 per maand.
        Vervoer: één eigen auto plus één private lease (€650 samen). Het soort
        gezin dat tot de bovenste inkomensgroep van Nederland behoort.
      </p>

      <h2 className="font-display" style={h2}>
        Waar het geld heen gaat
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De grote posten zijn herkenbaar: €1.850 hypotheek, €650 aan twee
        auto&apos;s, energie en verzekeringen. Maar de echte verrassing zit
        eronder. De boodschappen lopen met twee pubers op tot ruim €1.100 per
        maand, fors boven de Nibud-norm van €627 voor een gezin van vier. Daar
        bovenop komt naschoolse opvang, sport en bijlessen, en een abonnementen-
        stapel die richting €250 per maand kruipt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Tel het op en er blijft amper €150 per maand over om te sparen, bij een
        inkomen waarvan veel mensen denken dat je er moeiteloos van rondkomt.
      </p>

      <h2 className="font-display" style={h2}>
        Waar blijft het?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Twee afwijkingen springen eruit. De boodschappen liggen structureel
        €400 tot €500 boven wat je zou verwachten, deels onvermijdelijk (pubers eten
        nu eenmaal veel), deels door dagelijks los winkelen zonder weekmenu. En
        de tweede auto via private lease is een vaste last die er ooit
        &ldquo;even bij&rdquo; kwam en nooit meer ter discussie stond.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Geen van beide is een schandaal. Maar samen verklaren ze waarom een
        inkomen van €6.200 toch krap voelt. Dit is precies{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie</Link>{" "}in actie: de uitgaven zijn meegegroeid met het inkomen, het sparen niet.
      </p>

      <h2 className="font-display" style={h2}>
        Wat een vergelijkbaar gezin wél overhoudt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een gezin met hetzelfde inkomen dat de boodschappen terugbrengt naar
        €850 en de tweede auto inruilt voor af en toe huren of een goedkopere
        occasion, houdt al snel €600 tot €700 per maand over in plaats van €150.
        Zonder dat het leven wezenlijk soberder voelt. Het verschil is niet meer
        verdienen, het is structuur, precies zoals bij{" "}
        <Link href="/inzichten/goed-salaris-toch-krap" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">goed salaris, toch krap</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Herken je iets van Sanne en Joost?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de analyse</Link>{" "}en zie jullie eigen verdeling, en de twee grootste afwijkingen in jullie situatie.
      </p>
    </>
  );
}
