import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function GoedSalarisTochGeldstress() {
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
          Je verdient goed, je doet niks geks, en toch krijg je een knoop in je maag als je naar je
          rekening kijkt. En je durft er met bijna niemand over te praten, want hoe leg je dat uit
          als je genoeg verdient?
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
            "Waarom geldstress ook bij een goed inkomen voorkomt, en dat je niet de enige bent",
            "Waar de stress vandaan komt: het is een structuurprobleem, geen karakterfout",
            "De vier stappen waarmee er bij ons thuis weer rust kwam",
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
        Geldstress hoort bij weinig geld, denken de meeste mensen. Maar dat klopt niet. Je kunt een
        prima inkomen hebben en toch elke maand datzelfde knagende gevoel houden: er klopt iets
        niet, en ik weet niet waar het zit. Ik ken dat gevoel uit eigen ervaring, en ik zie het bij
        veel mensen die ik help.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: geldstress met een goed inkomen is bijna nooit een karakterfout en bijna altijd
        een structuurprobleem. Je geld heeft geen duidelijke bestemming, dus het verdwijnt, en de
        stress komt voort uit het niet weten waar het naartoe gaat. Met een paar vaste afspraken los
        je dat op, zonder dat je meer hoeft te verdienen.
      </p>

      <h2 className="font-display" style={h2}>
        Je bent niet de enige (ook niet met een goed inkomen)
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Uit het onderzoek van Deloitte en het Nibud (2025) blijkt dat bijna de helft van de
        Nederlandse huishoudens financieel kwetsbaar is. En, belangrijker voor dit verhaal: zelfs
        een kwart van de mensen met een hoog inkomen heeft moeite om rond te komen. Het is dus geen
        rand-verschijnsel. Het raakt juist ook mensen die op papier ruim zitten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat het zo zwaar maakt, is dat je er niet over praat. Uit datzelfde onderzoek blijkt dat
        maar 3 procent van de Nederlanders vaak over de eigen geldsituatie praat. Je zwijgt, want
        klagen terwijl je goed verdient voelt ongepast. En zo draag je de stress in je eentje.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom een goed inkomen toch stress geeft
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De stress komt zelden door één grote uitgave. Het is een optelsom. Je vaste lasten zijn
        gegroeid: een gemiddeld huishouden is inmiddels ruim de helft van het inkomen kwijt aan vaste lasten, eerder richting 55 procent, terwijl het Nibud rond de 50 procent gezond vindt. Daar bovenop komen
        uitgaven die je niet bijhoudt, want pinnen en tikken voelt niet als geld uitgeven. En als er
        geen buffer is, betaal je elke tegenvaller uit je lopende maand, waardoor die maand niet
        meer klopt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De diepere oorzaken werk ik uit in mijn artikelen over{" "}
        <Link
          href="/inzichten/goed-salaris-toch-krap"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          goed salaris en toch krap
        </Link>{" "}
        en{" "}
        <Link
          href="/inzichten/waarom-hou-ik-nooit-geld-over"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          waarom je nooit geld overhoudt
        </Link>
        . Hier gaat het me om de stress zelf, en hoe je die kleiner maakt.
      </p>

      <h2 className="font-display" style={h2}>
        Zo kwam er bij ons thuis weer rust
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Wij verdienden thuis prima, en toch liepen de spaarpotten leeg zonder dat ik begreep
        waarom. Wat hielp, was niet zuiniger leven maar vier dingen op een rij zetten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Eerst inzicht. Ik pakte de afschriften van twee maanden en telde drie dingen op: vaste
        lasten, dagelijkse uitgaven en wat er echt overbleef. Pas toen ik het zwart op wit zag,
        zakte de vaagheid die de stress voedde. Het stappenplan daarvoor staat in mijn artikel over
        een{" "}
        <Link
          href="/inzichten/vaste-lasten-overzicht-maken"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          overzicht van je vaste lasten maken
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daarna structuur. Ik ben mijn inkomen meteen gaan verdelen op de dag dat het binnenkomt:
        vaste lasten, dagelijks geld en sparen op aparte rekeningen, zodat geld een bestemming had
        voordat het op kon. Hoe dat werkt, lees je bij{" "}
        <Link
          href="/inzichten/geld-indelen-salaris-potjes-systeem"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          je salaris slim indelen
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Vervolgens een buffer. Een kleine reserve voor de kapotte wasmachine en de jaarlijkse
        premies haalde de scherpste randjes van de stress af, want tegenvallers gooiden de maand
        niet meer om.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En tot slot: erover praten. Met mijn partner, en daarna met de mensen die ik help. Het
        onderwerp uit de taboesfeer halen lucht meer op dan je denkt. Hoe je dat gesprek voert,
        lees je in mijn stuk over{" "}
        <Link
          href="/inzichten/geld-stress-relatie-nederland"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          geldstress in de relatie
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het ligt dus niet aan jou, en het is om te buigen. Niet door meer te verdienen, maar door je
        geld een richting te geven.
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
          Wil je weten waar het bij jou weglekt? Bij de geldscan kijk ik persoonlijk naar jouw cijfers en schrijf ik je een rapport met je drie grootste lekken. In gewone taal, geen gesprek nodig.
        </p>
        <Link href="/geldscan" className="btn-primary">
          Laat mij je cijfers nakijken (€49) &rarr;
        </Link>
      </div>
    </>
  );
}
