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
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat een alleenstaande in 2026 minimaal nodig heeft om rond te komen, en dat is meer dan de modellen zeggen",
            "Waarom huur de grootste variabele is en hoe groot het verschil tussen Randstad en de rest van Nederland is",
            "Dat krap zitten als alleenstaande bijna nooit aan 'slecht met geld omgaan' ligt maar aan het lastengewicht",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Hoeveel heb je nodig om als alleenstaande rond te komen in 2026? Het
        eerlijke antwoord is: meer dan de meeste modellen suggereren, en sterk
        afhankelijk van waar je woont.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Gemiddeld liggen de vaste lasten voor een alleenstaande in 2026 tussen
        de €2.000 en €2.400 per maand, afhankelijk van woonsituatie en
        levensstijl, becijferde FinBuddy op basis van actuele kostendata. Dat is
        exclusief vrije tijd, kleding en vakantie. Alleen de basis.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dit artikel geeft een volledig overzicht van alle kostenposten voor een
        alleenstaande in 2026, inclusief de regionale verschillen die een groot
        verschil maken.
      </p>

      <AlleenstaandeUitgaven />

      <h2 className="font-display" style={h2}>
        Wat zijn de grootste kostenposten voor een alleenstaande?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Huur of hypotheek vormt verreweg de grootste post. Volgens het CBS
        betaalt een alleenstaande huurder in 2026 gemiddeld €1.050 per maand
        kale huur, maar in de Randstad loopt dit structureel op tot
        €1.200-€1.400. Wie koopt, heeft een andere berekening, maar de netto
        maandlasten zijn vergelijkbaar of hoger in de grote steden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Boodschappen zijn de tweede grote post. Voor een alleenstaande rekent het
        Nibud met een minimum van circa €200 per maand voor voeding. In de
        praktijk geven alleenstaanden gemiddeld €300-400 per maand uit inclusief
        drogisterijproducten, koffie en kleine aankopen, berekende
        HetGeldCollege op basis van{" "}
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
        Energie is de post met de meeste variatie. Het hangt sterk af van het
        type woning. Een slecht geïsoleerd appartement kost structureel twee tot
        drie keer zoveel als een nieuwbouwwoning.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel netto inkomen heb je nodig als alleenstaande?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een alleenstaande die alle kosten dekt en ook nog iets spaart, inclusief het Nibud-advies van 10% spaarbuffer, heeft op basis van de
        gemiddelden minimaal €2.400-€2.600 netto per maand nodig. In de Randstad
        ligt die grens bij €2.800-€3.000.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het CBS-mediaan netto inkomen voor alleenstaanden in 2024 lag rond de
        €2.200 per maand. Dat betekent dat een groot deel van de alleenstaanden
        in Nederland structureel aan de grens van hun budget zit, niet door
        overdaad, maar door de hoogte van de vaste lasten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De Nibud-minimumgrens voor een alleenstaande zonder kinderen lag in
        januari 2026 op €91 per week aan leefgeld, dat is het absolute minimum
        voor iemand in schuldhulpverlening, niet een realistische begroting voor
        een werkende alleenstaande.
      </p>

      <h2 className="font-display" style={h2}>
        Waar zit de meeste bespaarruimte?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Voor alleenstaanden zit de grootste ruimte in drie categorieën.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Huur is moeilijk maar niet onmogelijk. Een kamer huren in plaats van een
        appartement, een andere regio, of een woningcorporatiewoning afwachten. De opties zijn beperkt, maar de impact is enorm. Elke €100 minder huur
        per maand is €1.200 per jaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Vervoer is de tweede grote variabele. Een auto kost een alleenstaande
        gemiddeld €400-500 per maand inclusief verzekering, wegenbelasting,
        brandstof en onderhoud. Wie de auto kan inruilen voor een OV-abonnement
        bespaart structureel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Abonnementen zijn de makkelijkste categorie. Een gemiddelde alleenstaande
        heeft meer dan €120 per maand aan abonnementen. Eén keer kritisch
        doorlopen levert gemiddeld €30-60 per maand op zonder dat je iets mist.
      </p>

      <h2 className="font-display" style={h2}>
        Verschilt dit sterk per stad?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Ja, aanzienlijk. CBS-data laat zien dat woonkosten in de Randstad
        structureel 20-30% hoger liggen dan in de rest van Nederland. Voor
        iemand die in Amsterdam woont versus iemand in Tilburg is het verschil in
        totale kosten van levensonderhoud gemakkelijk €300-400 per maand, alleen
        al door de huur.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat verklaart ook waarom mensen met hetzelfde inkomen zich heel anders
        kunnen voelen over hun financiële situatie. Het gaat niet alleen om wat
        je verdient, maar om de verhouding tussen je inkomen en de kosten in jouw
        omgeving. Meer over{" "}
        <Link
          href="/inzichten/wat-zijn-normale-vaste-lasten-gezin"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          wat normale vaste lasten zijn
        </Link>{" "}
        lees je in mijn uitgebreide overzicht.
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
          Benieuwd hoe jouw kosten zich verhouden tot andere alleenstaanden of
          gezinnen in jouw situatie? De gratis analyse laat het direct zien.
        </p>
        <Link href="/analyse" className="btn-primary">
          Start de gratis analyse →
        </Link>
      </div>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F5F0E8", borderColor: "#E8E0D4" }}
      >
        <p className="font-body text-sm font-medium mb-2" style={{ color: "#1C3A2A" }}>
          Uit de praktijk: Sophie, 32, IT-consultant, Amsterdam
        </p>
        <p className="font-body text-sm" style={{ color: "#2D4A35" }}>
          €3.400 netto per maand, goed salaris. En toch kon ze aan het einde van de maand niet uitleggen waar het gebleven was. Huur €1.350, parkeervergunning €60, zorgverzekering €155 na toeslag, energie €190. Dat is al €1.755 aan vaste lasten, zonder eten en zonder iets leuks. Voeg daar boodschappen en een OV-abonnement bij op, en er is structureel te weinig over voor een spaarbuffer. Geen onverstandige keuzes. Gewoon: Amsterdam, alleen, en alles draag je zelf.
        </p>
      </div>
    </>
  );
}
