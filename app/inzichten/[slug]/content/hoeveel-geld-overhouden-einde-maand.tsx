import Link from "next/link";
import { rapportVoorSlug, RAPPORTEN } from "@/lib/rapporten-data";
import { berekenVuistregel, euro, afgerondOpHonderd, type AutoKeuze } from "@/lib/salaris-vuistregel";

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
 * Antwoordronde 24-sep-2026 (docs/serp-gemiste-onderwerpen-23-sep-2026.md #7):
 * de zoekvraag is "hoeveel geld moet je overhouden per maand", en het antwoord
 * hangt van het huishouden af. Elk bedrag hieronder komt uit
 * berekenVuistregel(), dezelfde bron als de rekenaar op de salarisartikelen.
 */
const KOLOMMEN = [3500, 4500, 5500, 6500];
const HUISHOUDENS: { label: string; volwassenen: 1 | 2; kinderen: number; auto: AutoKeuze }[] = [
  { label: "Alleenstaand, één auto", volwassenen: 1, kinderen: 0, auto: "eigen" },
  { label: "Stel zonder kinderen, één auto", volwassenen: 2, kinderen: 0, auto: "eigen" },
  { label: "Stel met één kind, één auto", volwassenen: 2, kinderen: 1, auto: "eigen" },
  { label: "Stel met twee kinderen, één auto", volwassenen: 2, kinderen: 2, auto: "eigen" },
];

/** Verwacht over, expliciet uitgeschreven velden (minifier Next 14.2). */
function overVoor(inkomen: number, volwassenen: 1 | 2, kinderen: number, auto: AutoKeuze): number {
  return berekenVuistregel({
    inkomen: inkomen,
    volwassenen: volwassenen,
    kinderen: kinderen,
    auto: auto,
  }).verwachtOver;
}

function bedrag(n: number): string {
  return n < 0 ? "-" + euro(Math.abs(n)) : euro(n);
}

export default function HoeveelGeldOverhoudenEindeMaand() {
  const alleen = overVoor(3500, 1, 0, "eigen");
  const stel = overVoor(5000, 2, 0, "eigen");
  const gezin = overVoor(5000, 2, 2, "eigen");
  const rapport = rapportVoorSlug("stel-zonder-kinderen")!;
  const spaarPost = rapport.dagelijks.find((post) => post.label === "Spaardoel");

  return (
    <>
      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Hoeveel geld je per maand moet overhouden, hangt af van wie er van het inkomen leeft. Bij een
        alleenstaande met {euro(3500)} netto en een auto blijft er ongeveer{" "}
        {euro(afgerondOpHonderd(alleen))} over, bij een stel zonder kinderen met {euro(5000)} ongeveer{" "}
        {euro(afgerondOpHonderd(stel))} en bij een gezin met twee kinderen en {euro(5000)} ongeveer{" "}
        {euro(afgerondOpHonderd(gezin))}. Dat is na vaste lasten, boodschappen en vrije tijd.
      </p>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 24 september 2026. De bedragen komen uit mijn vuistregel op de{" "}
        {RAPPORTEN.length} huishoudens die ik zelf heb doorgerekend, niet uit een landelijke steekproef.
      </p>

      {/* Herken je dit? */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}
      >
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Aan het einde van de maand blijft er bijna niks over, en je vraagt je af: is dat normaal,
          of doe ik iets verkeerd?
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
            "Hoeveel je volgens de richtlijnen zou moeten overhouden in 2026",
            "Waarom dat getal weinig zegt over jouw persoonlijke situatie",
            "Wat je kunt doen als er aan het einde van de maand niks overblijft",
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
        Als richtlijn zou je aan het einde van de maand zeker 10 procent van je netto-inkomen moeten
        kunnen sparen, het bedrag dat het Nibud adviseert. In de praktijk wordt vaak de 50/30/20 verdeling gebruikt: ongeveer de helft naar vaste lasten, dertig procent vrij besteedbaar en twintig procent sparen. De regel mikt dus op 20 procent, terwijl het Nibud 10 procent als ondergrens noemt waar je naartoe werkt. Maar dat getal zegt weinig over jou, want je vaste lasten bepalen alles. En blijft er weinig over, dan betekent dat meestal niet dat je iets fout doet.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel geld moet je overhouden per maand, per huishouden?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Wat er volgens mijn vuistregel overblijft na wonen, boodschappen, vervoer, verzekeringen,
        abonnementen, kinderen en vrije tijd. Sparen en jaarlijkse uitgaven zoals vakanties moeten
        hieruit komen.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Netto per maand
              </th>
              {KOLOMMEN.map((k) => (
                <th key={k} className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {euro(k)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HUISHOUDENS.map((h) => (
              <tr key={h.label} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3" style={{ color: "#16211F" }}>
                  {h.label}
                </td>
                {KOLOMMEN.map((k) => {
                  const over = overVoor(k, h.volwassenen, h.kinderen, h.auto);
                  return (
                    <td
                      key={k}
                      className="text-right py-2 px-3 tabular-nums"
                      style={{ color: over < 0 ? "#B03A2E" : "#4A5A56", whiteSpace: "nowrap" }}
                    >
                      {bedrag(over)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Wat er echt overblijft, ligt bij veel huishoudens lager dan dit, en meestal niet door een lek.
        Het stel zonder kinderen dat ik doorrekende had als spaardoel{" "}
        {spaarPost ? spaarPost.waarde.charAt(0).toLowerCase() + spaarPost.waarde.slice(1) : "meer dan er overbleef"}.
        Mijn conclusie: {rapport.uitkomstKop.toLowerCase()}. Het verschil zat in reizen, horeca en
        jaarlijkse uitgaven die in geen maandbegroting staan. Het hele verhaal staat op{" "}
        <Link href={`/rapporten/${rapport.slug}`} style={link} className="hover:underline">
          hun rapportpagina
        </Link>
        , en wat twee personen per post uitgeven op{" "}
        <Link href="/inzichten/gemiddelde-uitgaven-per-maand-2-personen" style={link} className="hover:underline">
          de uitgaven per maand voor 2 personen
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wat zou er over moeten blijven?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De meest gebruikte richtlijn is de 50/30/20 verdeling. Ongeveer 50 procent van je
        netto-inkomen gaat naar vaste lasten, 30 procent naar dagelijkse en vrije uitgaven, en 20
        procent zet je opzij. Die laatste 20 procent is wat er aan het einde van de maand zou moeten
        overblijven om te sparen. Het Nibud houdt 10 procent aan als minimum waar je naartoe werkt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Hoe die verhouding precies werkt bij een hoger inkomen, lees je in mijn uitleg van de{" "}
        <Link
          href="/inzichten/50-30-20-regel-hoger-inkomen"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          50/30/20-regel
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Waarom dat getal weinig over jou zegt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hier zit de nuance die de meeste rekenmachines weglaten. De 50 procent voor vaste lasten is
        een gemiddelde, en in de praktijk haalt lang niet iedereen dat. Een gemiddeld huishouden is
        eerder ruim 55 procent van het inkomen kwijt aan vaste lasten, en wie een hoge huur of
        hypotheek heeft, zit daar nog boven. Dan blijft er voor de andere twee delen simpelweg minder
        over, zonder dat je iets verkeerd doet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Met andere woorden: dat je weinig overhoudt, zegt niet dat je slordig bent. Het zegt vaak
        dat je vaste basis hoog is. En dat is belangrijk om te weten, want het bepaalt waar de
        oplossing zit. Wat normale vaste lasten zijn, lees je in{" "}
        <Link
          href="/inzichten/wat-zijn-normale-vaste-lasten-gezin"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          wat zijn normale vaste lasten voor een gezin
        </Link>
        , en wat modaal in 2026 betekent staat in{" "}
        <Link
          href="/inzichten/is-4000-euro-netto-goed-salaris-nederland"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          modaal inkomen 2026
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Even ter vergelijking: het spaargeld van Nederland
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De doorsnee Nederlander heeft ongeveer €21.500 op de spaarrekening (CBS, 2024). Het
        gemiddelde ligt veel hoger, rond €54.700, maar dat komt doordat een kleine groep met veel
        spaargeld het gemiddelde omhoog trekt. De mediaan, die €21.500, geeft een beter beeld
        van de doorsnee. De spreiding is enorm, en daarom is vergelijken met een gemiddelde
        weinig waard.
      </p>

      <h2 className="font-display" style={h2}>
        En als er niks overblijft?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Blijft er structureel te weinig over, dan is de eerste stap niet bezuinigen maar kijken. Zet
        je inkomen, je vaste lasten en je dagelijkse uitgaven naast elkaar, zodat je ziet welke van
        de drie delen uit verhouding is. Negen van de tien keer zit de winst in de vaste lasten of
        in uitgaven die je niet bijhield. Daarna verdeel je je inkomen meteen, zodat sparen geen
        sluitpost meer is. Hoe je dat doet, lees je bij{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
        </Link>{" "}
        en{" "}
        <Link
          href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          hoeveel sparen per maand normaal is
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Deze richtlijn gaat over wat er als vast percentage zou moeten overblijven. Wil je weten
        wat er bij jouw huishouden werkelijk structureel beschikbaar is, inclusief jaarlijkse
        kosten zoals vakantie en onderhoud, lees dan{" "}
        <Link
          href="/inzichten/hoeveel-financiele-ruimte-heb-ik"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          hoeveel financiële ruimte je eigenlijk hebt
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
