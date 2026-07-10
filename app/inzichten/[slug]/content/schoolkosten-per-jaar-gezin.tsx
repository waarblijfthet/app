import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function SchoolkostenPerJaarGezin() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Dat onderwijs gratis heet maar augustus een rij rekeningen oplevert, en hoeveel dat per kind is",
            "Wat de werkelijke schoolkosten zijn inclusief laptop, fiets, sportkleding en excursies",
            "Dat de vrijwillige ouderbijdrage echt vrijwillig is en je kind nergens van mag worden uitgesloten",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Onderwijs is in Nederland gratis, hoor je vaak. En klopt: lesgeld betaal
        je niet op de middelbare school. Toch krijgen ouders elk jaar een rij
        rekeningen, en augustus is daardoor een van de duurste maanden van het
        jaar.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: de vrijwillige ouderbijdrage op de middelbare school is
        gemiddeld zo&apos;n €188 tot €200 per jaar, maar met schoolspullen,
        sportkleding en een fiets erbij lopen de werkelijke schoolkosten al snel
        op tot €400 à €600 per kind per jaar, en bij sommige scholen meer.
      </p>

      <h2 className="font-display" style={h2}>Waar de kosten zitten</h2>
      <p className="font-body text-text-soft" style={p}>
        De grootste posten zijn niet de schoolbijdrage zelf, maar de
        randzaken: een tablet of laptop, schoolspullen (ouders geven daar
        gemiddeld zo&apos;n €349 aan uit), een goede fiets voor de langere reis,
        sportkleding en de bijdragen voor excursies en werkweken. Die vallen bijna
        allemaal in augustus en september.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daar komt de sociale druk bij. Je kind moet mee op de werkweek want iedereen
        gaat. Het gymtasje moet van het goede merk, want dat hebben de anderen ook.
        En de fiets moet er een beetje netjes uitzien voor de middelbare school.
        Die keuzes zijn menselijk, maar ze staan niet in de officiële lijstjes.
      </p>

      <h2 className="font-display" style={h2}>De vrijwillige bijdrage is écht vrijwillig</h2>
      <p className="font-body text-text-soft" style={p}>
        Belangrijk om te weten: de ouderbijdrage is wettelijk vrijwillig. Je kind
        mag nergens van worden uitgesloten als je niet of deels betaalt. Scholen
        moeten dat ook zo communiceren. Het is dus volkomen normaal om kritisch te
        kijken naar welk deel je wel en niet betaalt.
      </p>

      <h2 className="font-display" style={h2}>Hoe je de schoolpiek opvangt</h2>
      <p className="font-body text-text-soft" style={p}>
        Net als de zomervakantie en december is de schoolstart een voorspelbare
        piek, dus kun je ervoor sparen. Reken op €400 à €600 per schoolgaand kind
        en zet daar maandelijks iets voor opzij. Het hoort thuis in je{" "}
        <Link href="/inzichten/seizoens-kostenkalender-per-maand" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">seizoens-kostenkalender</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd of er ruimte is voor zo&apos;n schoolpotje?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>.
      </p>
    </>
  );
}
