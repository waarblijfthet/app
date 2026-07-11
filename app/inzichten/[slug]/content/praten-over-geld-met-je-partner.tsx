import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function PratenOverGeldMetJePartner() {
  return (
    <>
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom een gesprek over geld zo vaak in een ruzie eindigt",
            "Hoe je het gesprek opent zonder verwijt, en op het juiste moment",
            "Wat je doet als jullie er samen niet uitkomen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Jullie verdienen samen goed, en toch blijft er weinig over. Jullie voelen
        het allebei, maar niemand begint erover. En als het er dan toch van komt,
        wordt het binnen twee minuten een verwijt over en weer.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Praten over geld is voor veel stellen het lastigste gesprek dat er is.
        Onderzoek laat al jaren zien dat geld een van de grootste bronnen van
        relatiestress is. Niet omdat een van de twee iets fout doet, maar omdat
        het gesprek meestal verkeerd begint.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: een geldgesprek loopt uit op ruzie als het over verwijten
        gaat in plaats van over een gezamenlijk doel, en als het op het verkeerde
        moment gebeurt. Kies een rustig moment, begin bij wat jullie samen willen,
        en maak het concreet met cijfers in plaats van met gevoel.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom geld zo vaak ruzie wordt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een gesprek over geld gaat zelden echt over geld. Het gaat over
        zekerheid, controle, vrijheid en over hoe je allebei bent opgegroeid met
        geld. De een wil sparen om rustig te slapen, de ander wil nu genieten.
        Allebei is het legitiem. Zodra het gesprek voelt als een oordeel over wie
        de verkeerde keuzes maakt, slaat het dicht. Waarom geld zo op een relatie
        drukt, lees je in{" "}
        <Link href="/inzichten/geld-stress-relatie-nederland" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">geld en relatiestress</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Kies het juiste moment
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Begin het gesprek nooit op het moment dat er net een grote rekening
        binnenkomt of als een van jullie moe of gestrest is. Dat is het slechtste
        moment, want dan staat het meteen op scherp. Plan er in plaats daarvan een
        rustig half uur voor, bijvoorbeeld in het weekend, en zeg vooraf waar het
        over gaat. Zo overval je elkaar niet en komt niemand in de verdediging.
      </p>

      <h2 className="font-display" style={h2}>
        Begin bij het doel, niet bij het verwijt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Open niet met wat er misgaat, maar met waar jullie samen naartoe willen:
        een buffer, een verbouwing, meer rust, een keer echt op vakantie. Een
        gedeeld doel maakt van geld iets waar je samen aan werkt, in plaats van
        iets waar je elkaar op afrekent. Vanuit dat doel wordt de vraag waar het
        geld nu heen gaat opeens een gezamenlijke zoektocht.
      </p>

      <h2 className="font-display" style={h2}>
        Maak het concreet met cijfers, niet met gevoel
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Gevoel leidt tot welles-nietes, cijfers niet. Ga samen naar de afschriften
        van de laatste twee maanden en zet de vaste lasten, de dagelijkse uitgaven
        en wat overblijft op een rij. Vaak blijkt het lek ergens te zitten waar
        geen van beiden op had gerekend, en dat haalt de angel eruit. Hoe je de
        kosten eerlijk verdeelt als jullie niet evenveel verdienen, staat in{" "}
        <Link href="/inzichten/kosten-verdelen-samenwonen-ongelijk-inkomen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">kosten verdelen bij ongelijk inkomen</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Als jullie er samen niet uitkomen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Soms lukt het niet om er met zijn tweeen uit te komen, en dan helpt een
        neutrale derde die zonder oordeel meekijkt naar de cijfers. Dat kan ik
        zijn met de{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">gratis analyse</Link>{" "}als vertrekpunt, iets wat jullie allebei kunnen bekijken. Zit de spanning
        dieper dan het geld zelf, dan is een relatietherapeut de juiste plek.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Lees ook over de{" "}
        <Link href="/inzichten/gezamenlijke-rekening-voor-en-nadelen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">gezamenlijke rekening, voor- en nadelen</Link>.
      </p>
    </>
  );
}
