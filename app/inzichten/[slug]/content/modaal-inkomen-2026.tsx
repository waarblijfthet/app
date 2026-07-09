import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function ModaalInkomen2026() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat 'modaal' precies betekent en wat je netto overhoudt van een modaal inkomen in 2026",
            "Dat twee keer modaal verdienen als stel niet garandeert dat je ruim zit",
            "Waarom een goed salaris toch krap kan voelen, en dat het zelden aan het inkomen ligt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        &ldquo;Modaal&rdquo; is een van die woorden die iedereen gebruikt maar
        bijna niemand precies kent. Het is geen gemiddelde en geen minimum, het
        is het meest voorkomende inkomen in Nederland, en het Centraal Planbureau
        stelt het elk jaar vast.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: het modaal inkomen is in 2026 vastgesteld op ongeveer
        €48.000 bruto per jaar inclusief vakantiegeld, zo&apos;n €3.700 bruto per
        maand. Netto houdt Jan Modaal daar, afhankelijk van zijn situatie,
        ongeveer €2.700 tot €3.100 per maand aan over.
      </p>

      <h2 className="font-display" style={h2}>Wat is modaal precies?</h2>
      <p className="font-body text-text-soft" style={p}>
        Het modaal inkomen is het inkomen dat het vaakst voorkomt onder werkenden
       , de &ldquo;piek&rdquo; in de verdeling. Het CPB gebruikt het als
        ijkpunt om koopkrachtplaatjes mee te rekenen. Het ligt lager dan het
        gemiddelde inkomen, omdat een kleine groep hoge inkomens het gemiddelde
        omhoog trekt terwijl modaal naar de meest voorkomende situatie kijkt.
      </p>

      <h2 className="font-display" style={h2}>Bruto versus netto</h2>
      <p className="font-body text-text-soft" style={p}>
        De €48.000 is een brutobedrag inclusief vakantiegeld. Wat er netto
        overblijft hangt af van je persoonlijke situatie: heffingskortingen,
        pensioenpremie, of je alleenverdiener bent of niet, en eventuele
        toeslagen. Voor je huishoudboekje telt alleen het nettobedrag, en dat
        ligt voor een modaal inkomen ergens rond de €2.700 à €3.100 per maand.
        Meer over dit verschil in onze{" "}
        <Link href="/woordenlijst" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">woordenlijst</Link>.
      </p>

      <h2 className="font-display" style={h2}>Boven-modaal: 1,5x en 2x modaal</h2>
      <p className="font-body text-text-soft" style={p}>
        Je hoort vaak &ldquo;twee keer modaal&rdquo; (rond €96.000 bruto samen)
        of &ldquo;anderhalf keer modaal&rdquo;. Veel tweeverdieners zitten daar
        samen ruim boven, en tóch voelt het krap. Dat is geen toeval, het is
        precies het patroon dat we beschrijven bij{" "}
        <Link href="/inzichten/tweeverdieners-toch-krap" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">tweeverdieners en toch krap</Link>.
      </p>

      <h2 className="font-display" style={h2}>Waarom modaal toch krap voelt</h2>
      <p className="font-body text-text-soft" style={p}>
        Een modaal of zelfs boven-modaal inkomen is geen garantie dat je
        overhoudt. Hoge vaste lasten, boodschappen die meer kosten dan je denkt,
        en uitgaven die meegroeien met je inkomen zorgen ervoor dat het bedrag op
        je loonstrook weinig zegt over wat je echt overhoudt. Lees waarom een{" "}
        <Link href="/inzichten/is-4000-euro-netto-goed-salaris-nederland" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">goed salaris toch krap kan voelen</Link>{" "}
        en wat{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie</Link>{" "}daarmee te maken heeft.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd hoeveel jullie met jullie inkomen zouden moeten overhouden?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}en vergelijk jezelf met vergelijkbare gezinnen.
      </p>
      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/hoeveel-geld-overhouden-einde-maand" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoeveel je hoort over te houden</Link> en <Link href="/inzichten/bruto-naar-netto-loonstrook-uitleg" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">van bruto naar netto</Link>.</p>
    </>
  );
}
