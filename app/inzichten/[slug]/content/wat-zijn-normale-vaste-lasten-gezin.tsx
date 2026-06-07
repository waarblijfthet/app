import Link from "next/link";
import { VasteLastenRadar } from "@/components/artikel/VasteLastenRadar";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WatZijnNormaleVasteLastenGezin() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat de werkelijke vaste lasten zijn voor een gezin van vier in 2026 — inclusief de posten die mensen vergeten",
            "Dat jaarlijkse kosten teruggerekend naar een maandbedrag je totale vaste lasten hoger maken dan je dacht",
            "Drie categorieën waar vrijwel elk gezin bespaarruimte heeft: abonnementen, zorgverzekering, vervoer",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Je weet wat je verdient. Je weet ook ruwweg wat er elke maand uitgaat.
        Maar weet je of jouw vaste lasten normaal zijn? Of zit je er structureel
        boven zonder het te weten?
      </p>
      <p className="font-body text-text-soft" style={p}>
        Uit onderzoek van FinBuddy blijkt dat de vaste lasten voor een gezin in
        2026 gemiddeld tussen de €2.600 en €3.200 per maand liggen. Dat is
        exclusief{" "}
        <Link
          href="/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          boodschappen
        </Link>
        , kleding en vrije tijd. Alleen de vaste, terugkerende kosten. En voor
        veel gezinnen is dat al meer dan twee derde van het netto inkomen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar wat is dan normaal voor jouw gezinssituatie? En waar zit de meeste
        ruimte om iets aan te doen?
      </p>

      <VasteLastenRadar />

      <h2 className="font-display" style={h2}>
        Wat telt mee als vaste last — en wat niet?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vaste lasten zijn alle kosten die maandelijks of jaarlijks terugkomen,
        ongeacht of je ze gebruikt. Huur of hypotheek, energie, water,
        zorgverzekering, telefoon, internet, autoverzekering, wegenbelasting,
        gemeentelijke belastingen — dat zijn de echte vaste lasten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat er vaak bij wordt vergeten: jaarlijkse kosten die mensen niet
        maandelijks tellen. De autoverzekering die eens per jaar wordt
        afgeschreven. De gemeentelijke belastingen die in één keer komen. De
        schoolkosten die ieder schooljaar opduiken. Als je die terugrekent naar
        een maandbedrag, zijn vaste lasten voor de meeste gezinnen hoger dan ze
        denken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En dan zijn er de abonnementen. Een gemiddeld Nederlands gezin heeft
        inmiddels meer dan €180 per maand aan abonnementen — streamingdiensten,
        sportschool, apps, kranten, telefoonabonnementen voor alle
        gezinsleden. Dat is een categorie die in tien jaar sterk is gegroeid en
        die de meeste mensen onderschatten.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe hoog zijn de vaste lasten voor een gezin van vier in 2026?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Voor een gezin met twee volwassenen en twee
        kinderen, met een koopwoning.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Hypotheek plus energie plus water: gemiddeld €1.500 per maand.
        Zorgverzekering voor twee volwassenen: €316. Internet, televisie en
        telefoon: €110. Overige verzekeringen (inboedel, opstal, auto, leven):
        €200. Auto inclusief wegenbelasting en brandstof: €400. Abonnementen:
        €180.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Totaal: €2.706 per maand — en dat is zonder boodschappen, zonder
        kleding, zonder een enkel uitje.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Blijkt er van een netto inkomen van €4.000 maar €1.294 over voor alles
        wat niet vast is. Boodschappen alleen al kosten een gezin van vier
        gemiddeld €875 per maand. Dan blijft er structureel niks over.
      </p>

      <h2 className="font-display" style={h2}>
        Waar zit de bespaarruimte — en waar niet?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De eerlijke boodschap: op sommige vaste lasten heb je nauwelijks
        invloed. Je huur of hypotheek verander je niet zomaar. Energiekosten
        zijn deels afhankelijk van je woning.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar er zijn drie categorieën waar vrijwel elk gezin bespaarruimte
        heeft.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De eerste is abonnementen. Niet één groot abonnement, maar de optelsom
        van tien kleine. Een streamingdienst die je nauwelijks gebruikt, een
        telefoonabonnement dat verlengd kan worden voor minder, een
        sportschool-app die je niet meer opent. Eén keer uitzoeken — eén keer
        opzeggen — structureel minder.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De tweede is de zorgverzekering. Het eigen risico kiezen en goed
        afstemmen op je daadwerkelijke zorggebruik scheelt gemiddeld €200 tot
        €500 per jaar. Veel gezinnen betalen voor aanvullende vergoedingen die
        ze nooit gebruiken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De derde is vervoer. Private lease of een te dure auto is voor veel
        gezinnen de grootste verborgen vaste last. Een auto van €450 per maand
        versus €280 scheelt €2.040 per jaar — structureel, elke maand.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel procent van je inkomen mag naar vaste lasten?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een vuistregel die financieel adviseurs hanteren: vaste lasten mogen
        maximaal 50 procent van het netto inkomen bedragen. Bij een netto
        inkomen van €4.000 is dat €2.000.
      </p>
      <p className="font-body text-text-soft" style={p}>
        In de praktijk zit een groot deel van de gezinnen hoger. Uit onderzoek
        van de Vaste Lasten Bond blijkt dat een huishouden met anderhalve keer
        modaal inkomen al meer dan 45 procent besteedt aan vaste lasten. Wie
        lager verdient, zit al snel op 55 procent of meer.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat laat weinig over voor de variabele kosten — en dat is precies waar
        het bij de meeste gezinnen misgaat. Niet door verkeerde keuzes, maar
        door vaste lasten die langzaam zijn opgelopen zonder dat je het doorhad.
        Een goed systeem om je inkomen te verdelen helpt daartegen:{" "}
        <Link
          href="/inzichten/spaardoelen-maandelijkse-inleg"
          style={{ color: "#C4603A", textDecoration: "none" }}
          className="hover:underline"
        >
          lees ook ons artikel over spaardoelen en maandelijkse inleg
        </Link>
        .
      </p>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F5F0E8", borderColor: "#E8E0D4" }}
      >
        <p className="font-body text-sm" style={{ color: "#1C3A2A" }}>
          <strong>Uit de praktijk.</strong> Wat me opvalt bij de gezinnen die ik help: de grote vaste lasten kennen ze prima, maar de kleine onderschatten ze structureel — abonnementen, verzekerings-extra's, een doorlopende app hier en daar. Bij één gezin telde dat op tot €250 per maand dat niemand miste toen we het opschoonden.
        </p>
      </div>
    </>
  );
}
