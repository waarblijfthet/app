import Link from "next/link";
import { AlleenstaandeUitgaven } from "@/components/artikel/AlleenstaandeUitgaven";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function KostenLevensonderhoudAlleenstaande2026() {
  return (
    <>
      {/* Herken je dit? — persona-selector */}
      <div style={{ marginBottom: "2rem" }}>
        <p
          className="font-display"
          style={{ fontSize: "1.3rem", color: "#1C3A2A", fontWeight: 300, marginBottom: "1rem" }}
        >
          Welke situatie past bij jou?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ marginBottom: "0.5rem" }}>
          {/* Card 1 — Goed salaris, toch krap (actief = dit artikel) */}
          <div
            className="rounded-xl p-4"
            style={{ border: "2px solid #1C3A2A", backgroundColor: "#F5F0E8" }}
          >
            <p
              className="font-body font-semibold text-sm"
              style={{ color: "#1C3A2A", marginBottom: "0.4rem" }}
            >
              Goed salaris, toch krap
            </p>
            <p
              className="font-body text-sm"
              style={{ color: "#4A5E4E", fontWeight: 300, marginBottom: "0.75rem" }}
            >
              Je verdient goed, geen kinderen, geen gekke uitgaven. En toch begrijp je niet waar
              het geld blijft.
            </p>
            <p className="font-body text-xs" style={{ color: "#8A9E8E" }}>
              Je bent hier op de juiste plek. Lees verder.
            </p>
          </div>

          {/* Card 2 — Alleenstaande ouder */}
          <Link
            href="/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026"
            className="rounded-xl p-4 block"
            style={{ border: "1px solid #E8E0D4", backgroundColor: "#FDFAF4", textDecoration: "none" }}
          >
            <p
              className="font-body font-semibold text-sm"
              style={{ color: "#1C3A2A", marginBottom: "0.4rem" }}
            >
              Alleenstaande ouder
            </p>
            <p
              className="font-body text-sm"
              style={{ color: "#4A5E4E", fontWeight: 300, marginBottom: "0.75rem" }}
            >
              De kinderen zijn bij jou, de kosten ook. En je doet het op één inkomen, zonder
              achtervang.
            </p>
            <span className="font-body text-xs font-medium" style={{ color: "#C4603A" }}>
              Lees het specifieke overzicht →
            </span>
          </Link>

          {/* Card 3 — ZZP */}
          <Link
            href="/inzichten/kosten-levensonderhoud-zzp-alleenstaande-2026"
            className="rounded-xl p-4 block"
            style={{ border: "1px solid #E8E0D4", backgroundColor: "#FDFAF4", textDecoration: "none" }}
          >
            <p
              className="font-body font-semibold text-sm"
              style={{ color: "#1C3A2A", marginBottom: "0.4rem" }}
            >
              ZZP&apos;er en alleen
            </p>
            <p
              className="font-body text-sm"
              style={{ color: "#4A5E4E", fontWeight: 300, marginBottom: "0.75rem" }}
            >
              Je inkomen wisselt per maand. En er is geen partner die de buffer aanvult als het
              tegenzit.
            </p>
            <span className="font-body text-xs font-medium" style={{ color: "#C4603A" }}>
              Lees het specifieke overzicht →
            </span>
          </Link>

          {/* Card 4 — 50+ */}
          <Link
            href="/inzichten/kosten-levensonderhoud-alleenstaande-50-plus-2026"
            className="rounded-xl p-4 block"
            style={{ border: "1px solid #E8E0D4", backgroundColor: "#FDFAF4", textDecoration: "none" }}
          >
            <p
              className="font-body font-semibold text-sm"
              style={{ color: "#1C3A2A", marginBottom: "0.4rem" }}
            >
              50-plusser, alleen
            </p>
            <p
              className="font-body text-sm"
              style={{ color: "#4A5E4E", fontWeight: 300, marginBottom: "0.75rem" }}
            >
              Pensioen nadert. Op één inkomen, zonder iemand om mee te rekenen. Hoe zit dat
              plaatje?
            </p>
            <span className="font-body text-xs font-medium" style={{ color: "#C4603A" }}>
              Lees het specifieke overzicht →
            </span>
          </Link>
        </div>
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
            "Wat een alleenstaande in 2026 minimaal nodig heeft om rond te komen, en dat is meer dan de modellen zeggen",
            "Waarom huur de grootste variabele is en hoe groot het verschil tussen Randstad en de rest van Nederland is",
            "Waarom je als alleenstaande met een goed salaris toch krap kunt zitten, en waarom dat geen gedragsprobleem is",
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

      <p className="font-body text-text-soft" style={p}>
        Hoeveel heb je nodig om als alleenstaande rond te komen in 2026? Het eerlijke antwoord is:
        meer dan de meeste modellen suggereren, en sterk afhankelijk van waar je woont.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Gemiddeld liggen de vaste lasten voor een alleenstaande in 2026 tussen de €2.000 en €2.400
        per maand. Dat is exclusief vrije tijd, kleding en vakantie. Alleen de basis.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit artikel geeft een volledig overzicht per kostenpost en per regio. En ook: waarom een
        goed salaris als alleenstaande alsnog krap kan voelen.
      </p>

      <AlleenstaandeUitgaven />

      <h2 className="font-display" style={h2}>
        Wat zijn de grootste kostenposten voor een alleenstaande?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Huur of hypotheek vormt verreweg de grootste post. Volgens het CBS betaalt een
        alleenstaande huurder in 2026 gemiddeld €1.050 per maand kale huur, maar in de Randstad
        loopt dit structureel op tot €1.200-€1.400. Wie koopt, heeft een andere berekening, maar
        de netto maandlasten zijn vergelijkbaar of hoger in de grote steden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Boodschappen zijn de tweede grote post. Voor een alleenstaande rekent het Nibud met een
        minimum van circa €200 per maand voor voeding. In de praktijk geven alleenstaanden
        gemiddeld €300-400 per maand uit inclusief drogisterijproducten, koffie en kleine
        aankopen, berekende HetGeldCollege op basis van{" "}
        <Link
          href="/inzichten/nibud-boodschappen-versus-werkelijkheid"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          Nibud-data
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Energie is de post met de meeste variatie. Het hangt sterk af van het type woning. Een
        slecht geïsoleerd appartement kost structureel twee tot drie keer zoveel als een
        nieuwbouwwoning.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel netto inkomen heb je nodig als alleenstaande?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een alleenstaande die alle kosten dekt en ook nog iets spaart, inclusief het Nibud-advies
        van 10% spaarbuffer, heeft op basis van de gemiddelden minimaal €2.400-€2.600 netto per
        maand nodig. In de Randstad ligt die grens bij €2.800-€3.000.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het CBS-mediaan netto inkomen voor alleenstaanden in 2024 lag rond de €2.200 per maand.
        Dat betekent dat een groot deel van de alleenstaanden in Nederland structureel aan de grens
        van hun budget zit, niet door overdaad, maar door de hoogte van de vaste lasten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De Nibud-minimumgrens voor een alleenstaande zonder kinderen lag in januari 2026 op €91
        per week aan leefgeld. Dat is het absolute minimum voor iemand in schuldhulpverlening,
        niet een realistische begroting voor een werkende alleenstaande.
      </p>

      <h2 className="font-display" style={h2}>
        Waar zit de meeste bespaarruimte?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Voor alleenstaanden zit de grootste ruimte in drie categorieën.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Huur is moeilijk maar niet onmogelijk. Een kamer huren in plaats van een appartement, een
        andere regio, of een woningcorporatiewoning afwachten. De opties zijn beperkt, maar de
        impact is enorm. Elke €100 minder huur per maand is €1.200 per jaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Vervoer is de tweede grote variabele. Een auto kost een alleenstaande gemiddeld €400-500
        per maand inclusief verzekering, wegenbelasting, brandstof en onderhoud. Wie de auto kan
        inruilen voor een OV-abonnement bespaart structureel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Abonnementen zijn de makkelijkste categorie. Een gemiddelde alleenstaande heeft meer dan
        €120 per maand aan abonnementen. Eén keer kritisch doorlopen levert gemiddeld €30-60 per
        maand op zonder dat je iets mist.
      </p>

      <h2 className="font-display" style={h2}>
        Verschilt dit sterk per stad?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Ja, aanzienlijk. CBS-data laat zien dat woonkosten in de Randstad structureel 20-30%
        hoger liggen dan in de rest van Nederland. Voor iemand die in Amsterdam woont versus
        iemand in Tilburg is het verschil in totale kosten van levensonderhoud gemakkelijk
        €300-400 per maand, alleen al door de huur.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat verklaart ook waarom mensen met hetzelfde inkomen zich heel anders kunnen voelen over
        hun financiële situatie. Het gaat niet alleen om wat je verdient, maar om de verhouding
        tussen je inkomen en de kosten in jouw omgeving. Meer over{" "}
        <Link
          href="/inzichten/wat-zijn-normale-vaste-lasten-gezin"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          wat normale vaste lasten zijn
        </Link>{" "}
        lees je in mijn uitgebreide overzicht.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom voelt een goed salaris als alleenstaande alsnog krap?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is de vraag die de meeste overzichten niet beantwoorden. Je verdient boven het
        mediaan, hebt geen schulden, geeft niet wild uit. En toch is er aan het einde van de
        maand weinig over. Hoe kan dat?
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het antwoord is structureel, niet persoonlijk. Als alleenstaande draag je in je eentje
        alle vaste lasten die bij een stel over twee inkomens verdeeld worden. Dezelfde huur,
        dezelfde energie, dezelfde zorgverzekering, dezelfde gemeentelijke belastingen. Maar jij
        betaalt het alleen. Economen noemen dit de &ldquo;single premium&rdquo;: alleenstaanden
        betalen per hoofd gemiddeld 30-50% meer dan samenwonenden voor dezelfde woonkwaliteit.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daar bovenop: er is geen financiële buffer van een partner. Als jij ziek wordt, een
        slechte maand hebt of een onverwachte rekening krijgt, is er niemand die tijdelijk de
        lasten draagt. Een hogere eigen buffer is daardoor geen luxe maar noodzaak, wat
        structureel meer geld vastzet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En de schaalnadelen: boodschappen voor één persoon zijn per portie duurder dan voor twee.
        Abonnementen deel je niet. Energie verbruik je relatief meer per hoofd in een kleinere
        woning. Krap zitten als goed verdienende alleenstaande is geen gedragsprobleem. Het is
        rekenwerk.
      </p>

      {/* Uit de praktijk */}
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F5F0E8", borderColor: "#E8E0D4" }}
      >
        <p className="font-body text-sm font-medium mb-2" style={{ color: "#1C3A2A" }}>
          Uit de praktijk: Sophie, 32, IT-consultant, Amsterdam
        </p>
        <p className="font-body text-sm" style={{ color: "#2D4A35" }}>
          €3.400 netto per maand, goed salaris. En toch kon ze aan het einde van de maand niet
          uitleggen waar het gebleven was. Huur €1.350, parkeervergunning €60, zorgverzekering
          €155 na toeslag, energie €190. Dat is al €1.755 aan vaste lasten, zonder eten en zonder
          iets leuks. Voeg daar boodschappen en een OV-abonnement bij op, en er is structureel te
          weinig over voor een spaarbuffer. Geen onverstandige keuzes. Gewoon: Amsterdam, alleen,
          en alles draag je zelf.
        </p>
      </div>

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
          Benieuwd hoe jouw kosten zich verhouden tot andere alleenstaanden in jouw situatie? De
          gratis analyse laat het direct zien.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>

      {/* Meer over jouw situatie */}
      <h2 className="font-display" style={{ ...h2, marginTop: "1rem" }}>
        Meer over jouw specifieke situatie
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Afhankelijk van je situatie is de financiële druk heel anders. Lees het overzicht dat het
        dichtst bij jou past.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" style={{ marginTop: "1rem" }}>
        <Link
          href="/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026"
          className="rounded-xl p-4 block"
          style={{ border: "1px solid #E8E0D4", backgroundColor: "#FDFAF4", textDecoration: "none" }}
        >
          <p className="font-body font-semibold text-sm mb-2" style={{ color: "#1C3A2A" }}>
            Alleenstaande ouder
          </p>
          <p
            className="font-body text-sm"
            style={{ color: "#4A5E4E", fontWeight: 300, marginBottom: "0.75rem" }}
          >
            Kinderkosten, regelingen en wat je er netto van overhoudt.
          </p>
          <span style={{ color: "#C4603A", fontSize: "0.8rem" }}>Lees verder →</span>
        </Link>
        <Link
          href="/inzichten/kosten-levensonderhoud-zzp-alleenstaande-2026"
          className="rounded-xl p-4 block"
          style={{ border: "1px solid #E8E0D4", backgroundColor: "#FDFAF4", textDecoration: "none" }}
        >
          <p className="font-body font-semibold text-sm mb-2" style={{ color: "#1C3A2A" }}>
            ZZP&apos;er en alleen
          </p>
          <p
            className="font-body text-sm"
            style={{ color: "#4A5E4E", fontWeight: 300, marginBottom: "0.75rem" }}
          >
            Variabel inkomen, buffer en pensioen op eigen kracht.
          </p>
          <span style={{ color: "#C4603A", fontSize: "0.8rem" }}>Lees verder →</span>
        </Link>
        <Link
          href="/inzichten/kosten-levensonderhoud-alleenstaande-50-plus-2026"
          className="rounded-xl p-4 block"
          style={{ border: "1px solid #E8E0D4", backgroundColor: "#FDFAF4", textDecoration: "none" }}
        >
          <p className="font-body font-semibold text-sm mb-2" style={{ color: "#1C3A2A" }}>
            50-plusser, alleen
          </p>
          <p
            className="font-body text-sm"
            style={{ color: "#4A5E4E", fontWeight: 300, marginBottom: "0.75rem" }}
          >
            Pensioen nadert en de vraag: heb je genoeg?
          </p>
          <span style={{ color: "#C4603A", fontSize: "0.8rem" }}>Lees verder →</span>
        </Link>
      </div>
    </>
  );
}
