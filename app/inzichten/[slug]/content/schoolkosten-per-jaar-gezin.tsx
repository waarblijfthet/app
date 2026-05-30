import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function SchoolkostenPerJaarGezin() {
  return (
    <>
      <p className="font-body text-text-soft" style={p}>
        Onderwijs is in Nederland gratis, hoor je vaak. En klopt: lesgeld betaal
        je niet op de middelbare school. Toch krijgen ouders elk jaar een rij
        rekeningen — en augustus is daardoor een van de duurste maanden van het
        jaar.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Kort gezegd: de vrijwillige ouderbijdrage op de middelbare school is
        gemiddeld zo&apos;n €188 tot €200 per jaar, maar met schoolspullen,
        sportkleding en een fiets erbij lopen de werkelijke schoolkosten al snel
        op tot €400 à €600 per kind per jaar — en bij sommige scholen meer.
      </p>

      <h2 className="font-display" style={h2}>Waar de kosten zitten</h2>
      <p className="font-body text-text-soft" style={p}>
        De grootste posten zijn niet de schoolbijdrage zelf, maar de
        randzaken: een tablet of laptop, schoolspullen (ouders geven daar
        gemiddeld zo&apos;n €349 aan uit), een goede fiets voor de langere reis,
        sportkleding en de bijdragen voor excursies en werkweken. Die vallen bijna
        allemaal in augustus en september.
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
        piek — dus kun je ervoor sparen. Reken op €400 à €600 per schoolgaand kind
        en zet daar maandelijks iets voor opzij. Het hoort thuis in je{" "}
        <Link href="/inzichten/seizoens-kostenkalender-per-maand" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">seizoens-kostenkalender</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd of er ruimte is voor zo&apos;n schoolpotje?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>.
      </p>
    </>
  );
}
