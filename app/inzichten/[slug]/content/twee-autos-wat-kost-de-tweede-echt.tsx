import Link from "next/link";
import TweedeAutoRekenaar from "@/components/artikel/TweedeAutoRekenaar";
import { VERVOER, euro } from "@/lib/salaris-vuistregel";

/**
 * Content voor "twee-autos-wat-kost-de-tweede-echt" (klus B, 18-aug-2026,
 * docs/artikel-bouwprompts-batch1-18-aug-2026.md). SERP op google.nl voor
 * "tweede auto kosten per maand" bestaat uit ANWB, Nibud, autobladen,
 * leasesites en Reddit: allemaal over wat een auto op zichzelf kost, niemand
 * legt het naast wat er van je huishoudinkomen overblijft. Dat is het gat dat
 * dit artikel vult. Alle bedragen komen uit TweedeAutoRekenaar en dus uit
 * lib/salaris-vuistregel.ts.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const linkStyle = { color: "#0B7A6E", textDecoration: "none" } as const;

export default function TweeAutosWatKostDeTweedeEcht() {
  return (
    <>
      <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>Herken je dit?</p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Twee banen, dus twee auto&apos;s. Niemand heeft dat ooit apart besloten, het is er gewoon zo
          ingerold. En je vraagt je af hoeveel van je maandelijkse ruimte daar precies in zit.
        </p>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: de tweede auto is geen post van een paar tientjes, maar een vaste last in de orde van
        een flink deel van wat je dacht over te houden. Hieronder reken je het voor je eigen huishouden
        door.
      </p>

      <TweedeAutoRekenaar />

      <h2 className="font-display" style={h2}>Waarom een tweede auto zwaarder telt dan hij lijkt</h2>
      <p className="font-body text-text-soft" style={p}>
        Een auto op zichzelf kost brandstof, verzekering, wegenbelasting en onderhoud. Dat is de rekensom
        die de meeste autositen je voorleggen. Wat daar meestal ontbreekt, is de stap erna: hoeveel van je
        eigen inkomen die tweede auto opeet, naast alles wat er al vastligt. Schuif hierboven van &ldquo;
        {"Eén auto"}&rdquo; naar &ldquo;{"Twee auto's"}&rdquo; en je ziet dat verschil direct in wat er
        overblijft, niet alleen in wat de auto zelf kost.
      </p>

      <h2 className="font-display" style={h2}>Wanneer een tweede auto niet buitensporig is, en toch groot</h2>
      <p className="font-body text-text-soft" style={p}>
        Twee auto&apos;s zijn niet automatisch een probleem. Bij een gezin dat ik doorrekende met twee
        eigen auto&apos;s bleek er geen enkele buitensporige vaste last te zijn, de auto&apos;s inbegrepen.
        Ze waren een bewuste keuze die bij het gezin paste. Het punt van dit artikel is niet dat je van je
        tweede auto af moet, maar dat je weet hoeveel ruimte hij precies inneemt, zodat het een bewuste
        keuze blijft en geen post die je nooit hebt uitgerekend.
      </p>

      <h2 className="font-display" style={h2}>Wat dit artikel niet is</h2>
      <p className="font-body text-text-soft" style={p}>
        Dit is geen advies om de auto weg te doen, en geen vergelijking van merken, leasevormen of
        verzekeraars. Wil je weten of kopen of leasen voordeliger is voor jouw situatie, dat zet ik op een
        rij in{" "}
        <Link href="/inzichten/auto-kopen-of-leasen-kosten-per-maand" style={linkStyle} className="hover:underline">
          auto kopen of leasen, wat kost het per maand
        </Link>
        . Hier gaat het alleen over wat de tweede auto doet met wat er van je inkomen overblijft.
      </p>

      <h2 className="font-display" style={h2}>Wat wél helpt</h2>
      <p className="font-body text-text-soft" style={p}>
        Zet de tweede auto naast je andere vaste lasten in plaats van hem los te bekijken. Een overzicht
        van al je vaste lasten samen laat zien of de auto de uitschieter is of gewoon één van de posten die
        meegroeide met twee inkomens, zie{" "}
        <Link href="/inzichten/vaste-lasten-overzicht-maken" style={linkStyle} className="hover:underline">
          een overzicht van je vaste lasten maken
        </Link>
        .
      </p>

      <div style={{ backgroundColor: "#E7F1EE", borderRadius: "16px", padding: "1.5rem", marginTop: "2rem", marginBottom: "2.5rem" }}>
        <p className="font-body font-light text-text-soft" style={{ marginBottom: "1rem" }}>
          Wil je niet alleen de auto, maar je hele budget laten narekenen? Bij de geldscan kijk ik
          persoonlijk naar je cijfers en schrijf ik je een rapport met de drie dingen die het meest opvallen.
        </p>
        <Link href="/geldscan?situatie=gezin" className="btn-primary">Zie wat je krijgt voor €49 &rarr;</Link>
      </div>
    </>
  );
}
