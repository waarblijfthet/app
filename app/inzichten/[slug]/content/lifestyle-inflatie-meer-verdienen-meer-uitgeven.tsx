import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#1C3A2A", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function LifestyleInflatieMeerVerdienenMeerUitgeven() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat lifestyle-inflatie is: waarom je uitgaven meegroeien met je inkomen zonder dat je het doorhebt",
            "Dat cao-loonstijging na inflatie veel kleiner is dan het brutobedrag op je loonstrook doet vermoeden",
            "Hoe je lifestyle-inflatie stopt: bij elke loonsverhoging direct een deel apart vóórdat het 'normaal' voelt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Je kreeg er de afgelopen jaren salaris bij. Misschien een promotie, een
        nieuwe baan, of gewoon de cao-verhoging. En toch voelt het niet alsof je
        meer overhoudt. Sterker nog: het lijkt elke maand weer net zo krap.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Kort gezegd: dat heet lifestyle-inflatie. Naarmate je meer verdient, gaan
        je uitgaven bijna ongemerkt mee omhoog — een duurdere auto, vaker uit
        eten, een groter huis. Het resultaat is dat een hoger inkomen niet leidt
        tot meer overhouden, maar tot duurder leven met hetzelfde gevoel.
      </p>

      <h2 className="font-display" style={h2}>
        Je loon stijgt — maar minder dan je denkt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        In het eerste kwartaal van 2026 stegen de cao-lonen met 4,5 procent ten
        opzichte van een jaar eerder. Klinkt mooi. Maar gecorrigeerd voor
        inflatie bleef daar reëel zo&apos;n 2 procent van over. Een deel van je
        &ldquo;loonsverhoging&rdquo; is dus alleen het bijbenen van duurdere
        boodschappen, energie en huur — geen echte vooruitgang.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bij een modaal inkomen van rond de €48.000 bruto per jaar betekent dat
        verschil al snel dat de gevoelde ruimte veel kleiner is dan het
        brutobedrag op je loonstrook suggereert.
      </p>

      <h2 className="font-display" style={h2}>
        De rest verdwijnt in keuzes die je nauwelijks bewust maakt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Wat er na inflatie overblijft, lekt vaak weg via beslissingen die los van
        elkaar redelijk lijken. De boodschappen worden net iets luxer. De
        weekendjes weg net iets vaker. Een abonnement erbij, want dat kan nu wel.
        Niet één daarvan voelt als verspilling — samen eten ze je hele
        loonsverhoging op.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit is precies waarom{" "}
        <Link href="/inzichten/goed-salaris-toch-krap" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">goed verdienen en toch krap zitten</Link>{" "}
        hand in hand kunnen gaan. Het probleem is zelden het inkomen — het is dat
        de uitgaven meegroeien zonder dat iemand het tegenhoudt.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom een salarisverhoging soms amper voelbaar is
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Naast lifestyle-inflatie speelt er nog iets. Bij hogere inkomens loopt
        een groter deel van elke euro extra weg via belasting en de afbouw van
        heffingskortingen. Hoe dat precies werkt, lees je in ons artikel over{" "}
        <Link href="/inzichten/salarisverhoging-boven-76000-weinig-netto" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">waarom een salarisverhoging boven €76.000 weinig oplevert</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe je lifestyle-inflatie tegenhoudt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De truc is niet om zuiniger te leven, maar om je uitgaven niet
        automatisch te laten meegroeien met je inkomen. De eenvoudigste manier:
        zet bij elke loonsverhoging een vast deel ervan meteen apart — vóórdat
        het op je rekening &ldquo;normaal&rdquo; gaat voelen. Wat je niet ziet,
        geef je niet uit.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een vaste verdeling helpt daarbij. Hoe je dat praktisch inricht, staat in
        ons artikel over de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je eerst zien waar jouw extra inkomen nu naartoe gaat?{" "}
        <Link href="/analyse" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}
        en vergelijk jezelf met gezinnen in dezelfde situatie. Kom je er niet
        uit, dan kijken we via onze{" "}
        <Link href="/aanbod" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">begeleiding</Link>{" "}met je mee.
      </p>
    </>
  );
}
