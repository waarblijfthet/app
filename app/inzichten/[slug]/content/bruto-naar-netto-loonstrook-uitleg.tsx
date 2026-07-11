import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function BrutoNaarNettoLoonstrookUitleg() {
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
          Je ziet een mooi brutoloon staan, en op je rekening komt een flink stuk minder binnen.
          Waar gaat dat verschil naartoe, en klopt het wel?
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
            "Welke posten je brutoloon omzetten in nettoloon, en wat de begrippen op je loonstrook betekenen",
            "Wat je ongeveer netto overhoudt bij €3.500 en €5.000 bruto in 2026",
            "Waarom netto pas het halve verhaal is, en wat er daarna met je geld gebeurt",
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
        Bijna iedereen kent zijn brutoloon en zijn nettoloon, maar weinig mensen begrijpen wat er
        tussen die twee gebeurt. Toch is dat precies het stuk waar het gevoel ontstaat dat je
        minder overhoudt dan je verdient. Ik loop met je door je loonstrook, met de cijfers van
        2026.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: van je brutoloon gaat een flink deel naar belasting en premies. In 2026 gelden drie schijven in box 1, en wat je netto overhoudt hangt af van je inkomen en heffingskortingen. Hieronder leg ik de begrippen op je loonstrook stap voor stap uit.
      </p>

      <h2 className="font-display" style={h2}>
        De begrippen op je loonstrook
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Je brutoloon is je salaris vóór belasting en premies. Je nettoloon is wat er op je rekening
        binnenkomt. Het verschil heet de loonheffing: dat is loonbelasting en premies
        volksverzekeringen samen, die je werkgever inhoudt en namens jou afdraagt aan de
        Belastingdienst.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Op je strook zie je ook de loonheffingskorting. Dat is een korting op de loonheffing
        waardoor je netto meer overhoudt. Je mag die maar bij één werkgever tegelijk laten
        toepassen. Heb je twee banen en pas je hem per ongeluk dubbel toe, dan moet je later
        bijbetalen. Tot slot kom je het bijzonder tarief tegen: een apart percentage voor
        eenmalige beloningen zoals vakantiegeld, een bonus of een dertiende maand.
      </p>

      <h2 className="font-display" style={h2}>
        De belastingschijven van 2026
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Nederland heeft een progressief stelsel: hoe meer je verdient, hoe hoger het tarief over
        dat extra deel. Voor wie de AOW-leeftijd nog niet heeft bereikt, gelden in 2026 drie
        schijven in box 1.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Over je inkomen tot €38.883 betaal je 35,75 procent. Over het deel tussen €38.883 en
        €78.426 betaal je 37,56 procent. Over alles daarboven geldt het toptarief van 49,50
        procent. In het tarief van de eerste schijf zitten de premies volksverzekeringen verwerkt,
        waaronder de AOW.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daar komen twee heffingskortingen overheen die je netto omhoog duwen. De algemene
        heffingskorting is in 2026 maximaal €3.115 en de arbeidskorting maximaal €5.685. Allebei
        bouwen ze af naarmate je meer verdient. Dat is precies waarom een hoger inkomen netto soms
        tegenvalt, want je verliest een deel van die kortingen weer.
      </p>

      <h2 className="font-display" style={h2}>
        Wat houd je netto over in 2026?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een paar voorbeelden, als globale indicatie voor een voltijdbaan met loonheffingskorting.
        De exacte uitkomst hangt af van je pensioenpremie en eventuele toeslagen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bij €3.500 bruto per maand, ongeveer €42.000 per jaar, kom je netto rond de €2.700 tot
        €2.800 uit. Bij €5.000 bruto per maand, zo&apos;n €60.000 per jaar, blijft er netto
        ongeveer €3.550 tot €3.700 over. Een deel van dat hogere inkomen valt al in de tweede
        schijf en in de afbouwzone van beide heffingskortingen, waardoor je van elke extra euro
        minder voelt. Wil je het tot op de euro weten, vul dan je eigen cijfers in bij een nettoloon-calculator.
      </p>

      <h2 className="font-display" style={h2}>
        Netto is pas het halve verhaal
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hier zit de echte ontnuchtering. Veel mensen denken dat het krappe gevoel komt door de
        belasting. Maar de belasting is bekend en vaststaand. Het gat ontstaat ná je netto: in
        wat er met die €3.700 gebeurt zodra hij binnen is. Vaste lasten, boodschappen,
        abonnementen en onvoorziene uitgaven slokken het op voordat je iets bewust kiest. En werk je als zzp&apos;er zonder loonstrook, dan geldt hetzelfde: pas ná je vaste lasten en je reserveringen zie je wat er echt overblijft.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daarom is je netto weten niet genoeg. Je wilt weten wat er ná je vaste lasten overblijft,
        en waar dat naartoe gaat. Lees ook of{" "}
        <Link
          href="/inzichten/is-4000-euro-netto-goed-salaris-nederland"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          €4.000 netto een goed salaris is
        </Link>
        , wat{" "}
        <Link
          href="/inzichten/modaal-inkomen-2026"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          modaal inkomen in 2026
        </Link>{" "}
        precies is, en waarom{" "}
        <Link
          href="/inzichten/salarisverhoging-boven-76000-weinig-netto"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          een opslag zo weinig netto oplevert
        </Link>
        .
      </p>

      <p className="font-body text-text-soft" style={p}>Bij je aangifte laat je vaak geld liggen, zie <Link href="/inzichten/vergeten-aftrekposten-belastingaangifte" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">vergeten aftrekposten bij je belastingaangifte</Link>.</p>

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
    </>
  );
}
