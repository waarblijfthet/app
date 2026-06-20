import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WaaromLuktSparenNiet() {
  return (
    <>
      {/* Herken je dit? */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ backgroundColor: "#FDFAF4", border: "1px solid #E8E0D4" }}
      >
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#1C3A2A" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5E4E", fontWeight: 300 }}>
          Je neemt je elke maand voor om te sparen. En elke maand is het geld op voordat je eraan
          toekomt. Niet door gekke aankopen, het verdampt gewoon.
        </p>
      </div>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Waarom sparen niet lukt, en dat het zelden aan je discipline ligt",
            "Hoe je het patroon doorbreekt door de volgorde om te draaien",
            "Hoeveel sparen normaal is, zodat je een reëel doel hebt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#1C3A2A" }}>
        Sparen lukt meestal niet omdat je het als restpost behandelt: je spaart wat er aan het einde
        van de maand overblijft, en dat is bijna niks. Draai de volgorde om en zet een vast bedrag
        opzij op de dag dat je salaris binnenkomt, dan lukt het wel. Het ligt zelden aan je
        discipline en bijna altijd aan de volgorde en de structuur.
      </p>

      <h2 className="font-display" style={h2}>
        Het ligt niet aan jou, en niet alleen aan luxe
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De meeste artikelen over dit onderwerp wijzen naar luxe uitgaven: te veel uit eten, te veel
        online besteld. Soms speelt dat mee, maar voor wie goed verdient en toch niks overhoudt zit
        het probleem meestal ergens anders: in vaste lasten die gegroeid zijn en in incidentele
        kosten die je niet meerekent. De verzekeringspremie, de auto-onderhoudsbeurt, de tandarts,
        cadeaus. Geen luxe, wel geld dat je spaarplan stilletjes leegtrekt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Je bent ook niet de enige. Ongeveer een op de vijf Nederlandse huishoudens heeft minder dan
        €1.000 aan spaargeld, en ruim 40 procent spaart minder dan 10 procent van het inkomen
        (Nibud, 2024). Het ligt dus echt niet alleen aan jou.
      </p>

      <h2 className="font-display" style={h2}>
        De fout zit in de volgorde
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Bijna iedereen spaart op dezelfde manier: eerst leven, en aan het einde van de maand kijken
        wat er over is. Dat is precies waarom het misgaat. Wat overblijft, voelt de hele maand als
        beschikbaar, dus het gaat op. Sparen wordt zo een sluitpost die er nooit komt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De oplossing heet jezelf eerst betalen: zet op de dag dat je salaris binnenkomt automatisch
        een vast bedrag op een aparte spaarrekening, en verdeel daarna de rest. Sparen wordt dan de
        eerste betaling die je doet, niet de laatste. Hoe je dat praktisch inricht, lees je bij{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Vang ook de onregelmatige kosten af
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Automatisch sparen alleen is niet genoeg als de jaarlijkse premie of de autoreparatie je
        spaarrekening daarna weer leegtrekt. Zet daarom naast je spaarpot een apart potje voor
        onregelmatige uitgaven, waar je elke maand een klein bedrag op zet. Dan blijft je echte
        spaargeld staan en overvalt geen enkele rekening je nog.
      </p>

      <h2 className="font-display" style={h2}>
        Wat is een reëel spaardoel?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud adviseert om waar mogelijk ongeveer 10 procent van je netto-inkomen te sparen. Lukt
        dat nog niet, begin dan klein en laat het bedrag automatisch oplopen. Wat normaal is en
        hoeveel je per maand opzij zou kunnen zetten, lees je in{" "}
        <Link
          href="/inzichten/hoeveel-sparen-per-maand-normaal-nederland"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          hoeveel sparen per maand normaal is
        </Link>{" "}
        en{" "}
        <Link
          href="/inzichten/spaardoelen-maandelijkse-inleg"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          spaardoelen en maandelijkse inleg
        </Link>
        . Speelt levensstijlinflatie mee, dan helpt ook mijn artikel over{" "}
        <Link
          href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          meer verdienen en meer uitgeven
        </Link>
        .
      </p>

      {/* Intern CTA */}
      <div
        style={{
          backgroundColor: "#E8F2EC",
          borderRadius: "16px",
          padding: "1.5rem",
          marginTop: "2rem",
          marginBottom: "2.5rem",
        }}
      >
        <p className="font-body font-light text-text-soft" style={{ marginBottom: "1rem" }}>
          Voordat je een spaarbedrag kiest, wil je weten wat er na je vaste lasten echt overblijft.
          De gratis analyse laat dat zien, zodat je een spaardoel kiest dat je ook volhoudt.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
    </>
  );
}
