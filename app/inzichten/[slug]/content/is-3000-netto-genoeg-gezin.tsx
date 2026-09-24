import Link from "next/link";
import { RAPPORTEN } from "@/lib/rapporten-data";
import { berekenVuistregel, euro, afgerondOpHonderd, type AutoKeuze } from "@/lib/salaris-vuistregel";
import { aandeelMetMeerNl, procent, INKOMEN_PEILJAAR } from "@/lib/inkomensverdeling-cbs";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

/**
 * Antwoordronde 24-sep-2026: "Kun je rondkomen van 3000 euro per maand?" stond
 * op 5 van de 15 geverifieerde SERP's in "Meer om te vragen"
 * (docs/serp-gemiste-onderwerpen-23-sep-2026.md). Letterlijk beantwoord,
 * per huishouden, uit berekenVuistregel() en de CBS-verdeling.
 */
function overBij3000(volwassenen: 1 | 2, kinderen: number, auto: AutoKeuze): number {
  return berekenVuistregel({
    inkomen: 3000,
    volwassenen: volwassenen,
    kinderen: kinderen,
    auto: auto,
  }).verwachtOver;
}

export default function Is3000NettoGenoegGezin() {
  const alleen = overBij3000(1, 0, "geen");
  const stel = overBij3000(2, 0, "geen");
  const gezin = overBij3000(2, 2, "eigen");

  return (
    <>
      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kun je rondkomen van {euro(3000)} per maand? Alleen wel: zonder auto houd je op mijn vuistregel
        ongeveer {euro(afgerondOpHonderd(alleen))} over. Met z&apos;n tweeën zonder kinderen net, en alleen
        zonder auto. Een gezin met twee kinderen en een auto komt ongeveer{" "}
        {euro(afgerondOpHonderd(Math.abs(gezin)))} per maand tekort. Dan is het inkomen te laag voor de
        opdracht, niet het huishouden slordig.
      </p>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 24 september 2026. Bedragen uit mijn vuistregel op de {RAPPORTEN.length}{" "}
        huishoudens die ik heb doorgerekend. Ter vergelijking met heel Nederland (CBS, {INKOMEN_PEILJAAR}):
        als alleenstaande heeft {procent(aandeelMetMeerNl(3000, 1, 0))} van de huishoudens meer te
        besteden dan {euro(3000)}, als gezin met twee kinderen {procent(aandeelMetMeerNl(3000, 2, 2))}.
        Meer daarover op{" "}
        <Link href="/inzichten/top-10-procent-inkomen-nederland" style={link} className="hover:underline">
          waar sta je met je inkomen
        </Link>
        .
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Van {euro(3000)} netto per maand
              </th>
              <th className="text-right py-2 pl-3" style={{ color: "#16211F", fontWeight: 600, whiteSpace: "nowrap" }}>
                Blijft over
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Alleenstaand, geen auto", over: alleen },
              { label: "Alleenstaand, één auto", over: overBij3000(1, 0, "eigen") },
              { label: "Stel zonder kinderen, geen auto", over: stel },
              { label: "Stel zonder kinderen, één auto", over: overBij3000(2, 0, "eigen") },
              { label: "Stel met één kind, één auto", over: overBij3000(2, 1, "eigen") },
              { label: "Stel met twee kinderen, één auto", over: gezin },
            ].map((r) => (
              <tr key={r.label} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3" style={{ color: "#16211F" }}>
                  {r.label}
                </td>
                <td
                  className="text-right py-2 pl-3 tabular-nums"
                  style={{ color: r.over < 0 ? "#B03A2E" : "#4A5A56", whiteSpace: "nowrap" }}
                >
                  {r.over < 0 ? "-" + euro(Math.abs(r.over)) : euro(r.over)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Herken je dit? */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
      >
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          €3.000 netto klinkt als genoeg voor een gezin. En toch komen jullie elke maand net niet
          uit. Ligt dat aan jullie, of is het gewoon krap?
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
            "Of €3.000 netto genoeg is voor een gezin, en waar het op aankomt",
            "Wat kinderen en vaste lasten gemiddeld van je inkomen opslokken",
            "Waarom je woonlasten bepalen of het krap is of niet",
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
        Voor een gezin is €3.000 netto dus krap, en of het lukt hangt vooral af van je woonlasten. Met een betaalbare hypotheek uit het verleden
        red je het prima. Met een huidige huur of hypotheek in een dure regio wordt het elke maand
        passen en meten, zonder dat je iets verkeerd doet.
      </p>

      <h2 className="font-display" style={h2}>
        Wat slokt het inkomen op?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Twee grote brokken bepalen het beeld. Je vaste lasten zijn als gemiddeld huishouden al ruim
        de helft van je inkomen, vaak richting 55 procent. En kinderen kosten geld: het Nibud rekent
        gemiddeld zo&apos;n 15 procent van het besteedbaar inkomen voor één kind, en ongeveer 25
        procent voor twee kinderen samen. Een tweede kind kost dus niet nog eens 15 procent, maar
        tilt het totaal naar een kwart van je inkomen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Tel je dat bij elkaar op, dan zie je hoe snel €3.000 opgaat. Wat een kind precies kost per
        maand lees je in{" "}
        <Link
          href="/inzichten/wat-kost-een-kind-per-maand"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          wat kost een kind per maand
        </Link>
        , en wat normale vaste lasten zijn in{" "}
        <Link
          href="/inzichten/wat-zijn-normale-vaste-lasten-gezin"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          wat zijn normale vaste lasten voor een gezin
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Je woonlasten zijn de doorslag
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De grootste variabele is wonen. Een gezin met €3.000 netto en €900 woonlasten houdt een
        heel ander leven over dan hetzelfde gezin met €1.500 woonlasten. Dat verschil van €600 is
        precies het verschil tussen ademruimte en elke maand net niet uitkomen. Daarom zegt het
        kale inkomen zo weinig: het gaat om wat er na je woonlasten en vaste lasten overblijft.
      </p>

      <h2 className="font-display" style={h2}>
        Het ligt zelden aan jullie
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als het krap is met €3.000 netto en kinderen, dan is dat meestal geen kwestie van slecht
        omgaan met geld. Het is de optelsom van gestegen vaste lasten en de kosten van een gezin op een inkomen dat voor een gezin niet royaal is. Dat erkennen helpt, want het verplaatst de
        vraag van wat doe ik fout naar waar kan ik bijsturen. Reken uit wat er bij jullie overblijft
        in{" "}
        <Link
          href="/inzichten/hoeveel-geld-overhouden-einde-maand"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          hoeveel je hoort over te houden
        </Link>
        .
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
          Wil je weten hoe jouw situatie ervoor staat? In een paar minuten zie je waar jouw huishouden afwijkt van vergelijkbare huishoudens. Je hoeft nog niets te kopen.
        </p>
        <Link href="/analyse" className="btn-primary">
          Doe de gratis analyse &rarr;
        </Link>
      </div>
    </>
  );
}
