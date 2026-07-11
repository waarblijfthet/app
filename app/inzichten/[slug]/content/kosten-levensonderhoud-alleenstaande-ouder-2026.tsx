import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function KostenLevensonderhoudAlleenstaandeOuder2026() {
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
          Je doet het in je eentje. De kinderen zijn bij jou, de kosten ook. En het voelt alsof er
          nooit genoeg is, ook niet als je best goed verdient.
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
            "Wat de extra kosten zijn die bij kinderen horen en hoe die optellen voor een alleenstaande",
            "Welke regelingen er zijn en hoeveel die in de praktijk opleveren (ALO-kop, kindgebonden budget, kinderopvangtoeslag)",
            "Hoeveel netto inkomen je als alleenstaande ouder realistisch nodig hebt om er niet voortdurend tegenaan te lopen",
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

      <p className="font-body text-text-soft" style={p}>
        Als alleenstaande ouder combineer je twee financiële uitdagingen die elk op zich al zwaar
        zijn. De kosten van kinderen. En het feit dat je die draagt op één inkomen, zonder iemand
        die bijspringt als de maand uitloopt of de auto naar de garage moet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        In Nederland zijn er ruim 600.000 eenoudergezinnen. Dat is bijna een kwart van alle
        gezinnen. Toch is de financiële situatie van alleenstaande ouders zelden het startpunt van
        budgetadvies. Dit overzicht is specifiek voor jou.
      </p>

      <h2 className="font-display" style={h2}>
        Wat kosten kinderen extra als je alleen bent?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De basiskosten voor een alleenstaande zonder kinderen liggen al op €2.000-€2.400 per
        maand. Kinderen voegen daar een structurele kostenlaag bovenop. Reken voor één kind
        gemiddeld €500-700 per maand extra, afhankelijk van leeftijd en situatie. Voor twee
        kinderen loopt dat op naar €800-1.200.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De grootste post is kinderopvang of buitenschoolse opvang (BSO). Zonder toeslag kost BSO
        gemiddeld €800-1.000 per maand voor één kind. Na kinderopvangtoeslag, die voor werkende
        alleenstaande ouders met een modaal inkomen tot 96% van de kosten vergoedt, blijft er
        gemiddeld €80-200 per maand over als eigen bijdrage.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daarna: extra boodschappen (ca. €150-200 per kind per maand), kleding en schoenen (ca.
        €60-80 per kind per maand), school en activiteiten zoals sport, schoolreisjes en
        muziekles (ca. €80-150 per kind per maand). Kleine bedragen afzonderlijk. Samen tellen ze
        hard op.
      </p>

      <h2 className="font-display" style={h2}>
        Welke regelingen heb je als alleenstaande ouder?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Er zijn specifieke regelingen voor alleenstaande ouders die de druk verlichten. Het is
        belangrijk om te weten dat je er daadwerkelijk recht op hebt, want niet iedereen vraagt
        ze automatisch aan.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De ALO-kop (alleenstaande ouderkop) is een extra bedrag bovenop het kindgebonden budget.
        In 2026 is dat €3.407 per jaar, ofwel bijna €284 per maand. Dit is bedoeld voor
        alleenstaande ouders die alle zorg en kosten zelf dragen. Wie er recht op heeft, krijgt
        het automatisch via de Belastingdienst als het kindgebonden budget al is aangevraagd.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het kindgebonden budget zelf loopt voor een alleenstaande ouder met een inkomen tot
        €29.736 op tot maximaal €5.996 per jaar voor één kind. Boven dat inkomens-drempel bouwt
        het bedrag af, maar bij een modaal tot bovenmodaal inkomen ontvang je vaak nog steeds een
        substantieel bedrag.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Kinderbijslag is voor elk kind tot 18 jaar en staat los van inkomen. Bedragen verschillen
        per leeftijdscategorie. Kinderopvangtoeslag is afhankelijk van inkomen en uren, maar
        voor werkende alleenstaande ouders in de middeninkomensgroep is de vergoeding relatief
        gunstig.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Verdien je meer dan €29.736 per jaar? Dan bouwt het kindgebonden budget geleidelijk af,
        maar de ALO-kop blijft ook bij hogere inkomens grotendeels intact tot ca. €70.000
        jaarinkomen. Controleer je persoonlijke situatie via de toeslagcalculator van de
        Belastingdienst.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel netto inkomen heb je nodig?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Na toeslagen en kinderbijslag is het beeld gunstiger dan het bruto getal doet vermoeden.
        Maar het klinische antwoord is: een alleenstaande ouder met één kind heeft in een
        middelgrote stad realistisch gezien minimaal €2.600-€3.000 netto per maand nodig om
        rondom te komen en een kleine buffer op te bouwen. Met twee kinderen loopt dat op naar
        €3.000-€3.500.
      </p>
      <p className="font-body text-text-soft" style={p}>
        In de Randstad zijn die grenzen €300-500 hoger door de hogere huurprijzen. En in de
        praktijk betekent dat: veel alleenstaande ouders met een modaal inkomen zitten structureel
        krap, ook als de regelingen worden meegeteld. Niet door slechte keuzes, maar door de
        optelsom van kosten die niet halveren als je geen partner hebt.
      </p>

      <h2 className="font-display" style={h2}>
        Waar zit nog bespaarruimte?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De bespaarruimte als alleenstaande ouder is smaller dan voor mensen zonder kinderen. Een
        aantal dingen kan wel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Check je toeslagen elk jaar opnieuw. Inkomenswisselingen, een nieuwe baan of veranderde
        uren kunnen je recht op toeslagen aanpassen. Wie het niet controleert, loopt geld mis of
        krijgt later een terugvordering.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Abonnementen en verzekeringen zijn ook hier de makkelijkste categorie om op te snijden.
        Een familiekorting, collectiviteitskorting via werk, of simpelweg opzeggen van wat je niet
        meer gebruikt levert al snel €30-60 per maand op.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Schoolkosten en sport: kijk naar regelingen in jouw gemeente. Veel gemeenten hebben een
        kindpakket of bijzondere bijstand voor kinderkosten voor ouders met een lager inkomen. Ook
        als je denkt dat je te veel verdient, is het de moeite om te checken.
      </p>

      {/* Uit de praktijk */}
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}
      >
        <p className="font-body text-sm font-medium mb-2" style={{ color: "#16211F" }}>
          Uit de praktijk: Marieke, 38, verpleegkundige, Rotterdam
        </p>
        <p className="font-body text-sm" style={{ color: "#16211F" }}>
          Twee kinderen van 7 en 10. Huur €1.100, BSO na toeslag €120, boodschappen voor drie
          €550, energie €170, zorgverzekering €155. Dat is al €2.095 aan vaste lasten. Met
          kinderactiviteiten, telefoon en internet erbij: €2.450 totaal. Ze verdient €2.800 netto.
          De ALO-kop en het kindgebonden budget geven lucht, maar de marge is structureel dun.
          Niet vanwege slechte keuzes. Vanwege rekenen.
        </p>
      </div>

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
          Benieuwd hoe jouw uitgaven zich verhouden tot vergelijkbare huishoudens? Doe de gratis analyse en zie het meteen. Wil je daarna dat ik persoonlijk naar je cijfers kijk en je drie grootste lekken op een rij zet, dan kan dat met de geldscan (€49).
        </p>
        <Link href="/analyse" className="btn-primary">
          Doe de gratis analyse &rarr;
        </Link>
        <p className="font-body text-sm" style={{ marginTop: "0.75rem", marginBottom: 0 }}>
          <Link href="/geldscan" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Of laat mij je cijfers persoonlijk nakijken (€49)</Link>
        </p>
      </div>

      {/* Terug naar overzicht */}
      <p className="font-body text-sm" style={{ color: "#8B958F", marginTop: "1rem" }}>
        Onderdeel van het overzicht{" "}
        <Link
          href="/inzichten/kosten-levensonderhoud-alleenstaande-2026"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          kosten levensonderhoud alleenstaande 2026
        </Link>
        .
      </p>
    </>
  );
}
