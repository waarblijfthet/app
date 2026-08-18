import Link from "next/link";
import SamengesteldGezinRekenaar from "@/components/artikel/SamengesteldGezinRekenaar";

/**
 * Content voor "samengesteld-gezin-twee-huishoudens-een-budget" (klus C,
 * 18-aug-2026, docs/artikel-bouwprompts-batch1-18-aug-2026.md). SERP op
 * google.nl voor "samengesteld gezin budget" bestaat uit NN, Belastingdienst
 * (kindgebonden budget), Stiefgoed en relatiecoaches: allemaal over hoe je
 * het regelt en verdeelt, niemand rekent door wat deeltijdkinderen met een
 * doorgerekend maandbudget doen. Dat is het gat dat dit artikel vult. Alle
 * bedragen komen uit SamengesteldGezinRekenaar en dus uit
 * lib/salaris-vuistregel.ts.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const linkStyle = { color: "#0B7A6E", textDecoration: "none" } as const;

export default function SamengesteldGezinTweeHuishoudensEenBudget() {
  return (
    <>
      <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>Herken je dit?</p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          De helft van de week is het gezin compleet, de andere helft niet. Boodschappen, ruimte, geld: alles
          schuift mee met het schema, behalve de vaste lasten die daar niets van weten.
        </p>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: kinderen die de helft van de tijd bij je zijn, kosten geen halve kinderen. Zet
        hieronder je eigen situatie in en zie waar de rekensom je in de steek laat.
      </p>

      <SamengesteldGezinRekenaar />

      <h2 className="font-display" style={h2}>Waarom de vuistregel dit onderschat</h2>
      <p className="font-body text-text-soft" style={p}>
        De rekenaar hierboven kan alleen hele kinderen tellen, niet een kind dat er de helft van de tijd is.
        Dat is precies het probleem waar dit artikel over gaat: sommige kosten bewegen wél mee met de
        kalender, de boodschappen bijvoorbeeld, en andere niet. Een eigen kamer, een sportclub, een stapel
        kleding, die kosten blijven grotendeels overeind ook als een kind er maar de helft van de tijd is.
        De vuistregel telt die posten per kind, niet per dag dat een kind aanwezig is, en onderschat een
        deeltijdkind daardoor eerder dan dat hij hem overschat.
      </p>

      <h2 className="font-display" style={h2}>Wat dit niet is</h2>
      <p className="font-body text-text-soft" style={p}>
        Dit artikel gaat niet over de omgangsregeling zelf, over kinderalimentatie of over wie welk deel
        hoort te betalen. Dat is precies het terrein waar de bestaande SERP al staat: Nationale-Nederlanden,
        de Belastingdienst over het kindgebonden budget en coaches die gespecialiseerd zijn in het
        samengestelde gezin. Hier gaat het alleen over wat er, ongeacht die afspraken, van je maandbudget
        overblijft als je de deeltijdkinderen er niet in meerekent.
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Ben je zelf net gescheiden en reken je voor het eerst met twee huishoudens in plaats van één, lees
        dan{" "}
        <Link href="/inzichten/scheiden-goed-inkomen-toch-niks-over" style={linkStyle} className="hover:underline">
          scheiden met een goed inkomen en toch niks over
        </Link>
        , dat artikel rekent de andere kant van dezelfde vraag door.
      </p>

      <div style={{ backgroundColor: "#E7F1EE", borderRadius: "16px", padding: "1.5rem", marginTop: "2rem", marginBottom: "2.5rem" }}>
        <p className="font-body font-light text-text-soft" style={{ marginBottom: "1rem" }}>
          Wil je jullie eigen samengestelde gezin laten narekenen? Bij de geldscan kijk ik persoonlijk naar
          je cijfers en schrijf ik je een rapport met de drie dingen die het meest opvallen.
        </p>
        <Link href="/geldscan?situatie=gezin" className="btn-primary">Zie wat je krijgt voor €49 &rarr;</Link>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Vergelijkingsbedragen op basis van de vijf huishoudens die ik zelf heb doorgerekend, zie{" "}
        <Link href="/rapporten" style={linkStyle} className="hover:underline">Rapporten</Link>.
      </p>
    </>
  );
}
