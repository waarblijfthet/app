import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import { bereikJaarkostenPerMaand } from "@/lib/icp-bronnen";
import { berekenVuistregel, euro, afgerondOpHonderd } from "@/lib/salaris-vuistregel";

/**
 * Nieuw 6-nov-2026. Google-autocomplete toont "leef ik boven mijn stand";
 * de site had er geen pagina voor. Op r/geldzaken had de thread "Leven zoveel
 * mensen nou boven hun stand?" (aug 2026) 597 reacties
 * (docs/bouwvolgorde.md sectie 51).
 *
 * Geen nieuwe cijfers: de vuistregel komt uit lib/salaris-vuistregel.ts
 * (zelfde bedragen als hoeveel-geld-overhouden-einde-maand), de jaaruitgaven
 * uit de vijf rapporten via bereikJaarkostenPerMaand.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

const SIGNALEN: { kop: string; tekst: string }[] = [
  {
    kop: "Je haalt elke maand geld van je spaarrekening",
    tekst: "Niet voor iets groots, maar om de maand rond te krijgen. Dan geef je structureel meer uit dan er binnenkomt.",
  },
  {
    kop: "Je staat aan het eind van de maand rood",
    tekst: "Of je betaalt de laatste week met een creditcard of achteraf betalen. Dat is lenen van de volgende maand.",
  },
  {
    kop: "Veel dingen betaal je per maand in plaats van één keer",
    tekst: "Een leaseauto, gehuurd witgoed, een telefoon met toestel, termijnen. Elk bedrag lijkt klein, samen leggen ze je maand vast.",
  },
  {
    kop: "Een onverwachte rekening van een paar honderd euro is een probleem",
    tekst: "Een kapotte wasmachine of een hoge eindafrekening, en je weet niet waar je het van moet betalen. Dan ontbreekt een buffer.",
  },
  {
    kop: "De vakantie of de verzekering per jaar overvalt je elke keer",
    tekst: "Uitgaven die één keer per jaar komen, betaal je uit de lopende maand. Dan ziet je maand er beter uit dan hij is.",
  },
  {
    kop: "Elke loonsverhoging is binnen een paar maanden op",
    tekst: "Er komt meer binnen, maar er blijft niet meer over. Je uitgaven groeien vanzelf mee.",
  },
];

export default function LeefIkBovenMijnStand() {
  const bereik = bereikJaarkostenPerMaand();
  const stel = afgerondOpHonderd(berekenVuistregel({ inkomen: 5000, volwassenen: 2, kinderen: 0, auto: "eigen" }).verwachtOver);
  const gezin = afgerondOpHonderd(berekenVuistregel({ inkomen: 5000, volwassenen: 2, kinderen: 2, auto: "eigen" }).verwachtOver);
  return (
    <>
      <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Je verdient goed, je doet niets geks, en toch groeit je spaarrekening niet. Je vraagt je af of je gewoon te veel
          uitgeeft.
        </p>
      </div>

      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Wat boven je stand leven eigenlijk betekent",
            "Zes signalen dat het bij jou zo is",
            "Een rekensom waarmee je het zeker weet, ook als je nooit rood staat",
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
        Kort gezegd: je leeft boven je stand als je elke maand meer uitgeeft dan er binnenkomt. Dat zie je niet altijd
        aan je rekening. Wie geen geld opzij zet voor uitgaven die één keer per jaar komen, kan elke maand netjes
        rondkomen en toch te veel uitgeven.
      </p>

      <h2 className="font-display" style={h2}>Wat betekent boven je stand leven?</h2>
      <p className="font-body text-text-soft" style={p}>
        Het gaat niet over hoe duur je huis of je auto is. Het gaat over de vraag of wat je uitgeeft past bij wat er
        binnenkomt, over een heel jaar. Iemand met een groot huis en een goed inkomen kan prima binnen zijn stand leven.
        Iemand met een klein huis kan er ver boven zitten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bij anderen kun je het niet zien. Je ziet de nieuwe auto en de vakanties, maar niet de lening, de leasebon of
        het lege spaarpotje. Waarom anderen rijker lijken dan ze zijn, lees je in{" "}
        <Link href="/inzichten/waarom-lijkt-iedereen-rijker" style={link} className="hover:underline">
          waarom lijkt iedereen rijker
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Zes signalen dat je boven je stand leeft</h2>
      <ol className="font-body" style={{ marginBottom: "1.5rem", paddingLeft: "1.25rem", listStyle: "decimal" }}>
        {SIGNALEN.map((s) => (
          <li key={s.kop} style={{ marginBottom: "0.9rem", color: "#4A5A56", fontWeight: 300 }}>
            <span style={{ color: "#16211F", fontWeight: 500 }}>{s.kop}.</span> {s.tekst}
          </li>
        ))}
      </ol>
      <p className="font-body text-text-soft" style={p}>
        Herken je er één of twee, dan hoeft er nog niets mis te zijn. Herken je er drie of meer, dan is het de moeite
        waard om het na te rekenen. Over termijnen en achteraf betalen lees je meer in{" "}
        <Link href="/inzichten/wat-kost-achteraf-betalen" style={link} className="hover:underline">
          wat achteraf betalen echt kost
        </Link>
        , en over meegroeiende uitgaven in{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={link} className="hover:underline">
          lifestyle-inflatie
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>De rekensom: zo weet je het zeker</h2>
      <p className="font-body text-text-soft" style={p}>
        Je hebt drie getallen nodig. Wat er elke maand binnenkomt. Wat er elke maand uitgaat aan vaste lasten,
        boodschappen, vervoer en de rest. En wat je per jaar uitgeeft aan dingen die niet elke maand komen, gedeeld door
        twaalf.
      </p>
      <div className="rounded-xl p-5 my-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body text-sm" style={{ color: "#16211F", fontWeight: 400, marginBottom: "0.5rem" }}>
          Inkomen per maand
        </p>
        <p className="font-body text-sm" style={{ color: "#16211F", fontWeight: 400, marginBottom: "0.5rem" }}>
          min uitgaven per maand
        </p>
        <p className="font-body text-sm" style={{ color: "#16211F", fontWeight: 400, marginBottom: "0.75rem" }}>
          min jaaruitgaven gedeeld door twaalf
        </p>
        <p className="font-body text-sm" style={{ color: "#0B7A6E", fontWeight: 600, marginBottom: 0 }}>
          = wat je echt overhoudt. Is dat minder dan nul, dan leef je boven je stand.
        </p>
      </div>
      <p className="font-body text-text-soft" style={p}>
        Die laatste regel vergeet je makkelijk, en hij is groot. Bij de {RAPPORTEN.length} huishoudens van wie ik
        een rapport schreef ging er {euro(bereik.laagste)} tot {euro(bereik.hoogste)} per maand naar jaaruitgaven, zoals
        vakantie, verjaardagen, de auto en verzekeringen die je per jaar betaalt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Ter vergelijking: volgens mijn vuistregel blijft er bij een stel zonder kinderen met {euro(5000)} netto
        ongeveer {euro(stel)} per maand over na vaste lasten, boodschappen, vervoer en vrije tijd. Bij een gezin met
        twee kinderen en hetzelfde inkomen ongeveer {euro(gezin)}. Daar moeten de jaaruitgaven en het sparen nog uit.
        De bedragen per huishouden staan in{" "}
        <Link href="/inzichten/hoeveel-geld-overhouden-einde-maand" style={link} className="hover:underline">
          hoeveel geld moet je overhouden per maand
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>En als het zo is?</h2>
      <p className="font-body text-text-soft" style={p}>
        Begin niet met bezuinigen op alles. Kijk eerst waar het verschil zit. Vaak zijn het een paar posten, niet je hele
        leven. Zet daarna één potje op voor je jaaruitgaven, met elke maand een vast bedrag erin. Hoe je dat bedrag
        uitrekent, lees je in{" "}
        <Link href="/inzichten/jaarlijkse-kosten-reserveren" style={link} className="hover:underline">
          jaarlijkse kosten reserveren
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het kan ook meevallen. Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} huishoudens van wie ik een rapport
        schreef, viel er niets te repareren. Ook dat is een uitkomst: dan weet je dat je het goed doet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je weten hoe het bij jou zit? De{" "}
        <CtaLink doel="analyse" href={analyseHref()} locatie="midden" style={link} className="hover:underline">
          gratis analyse
        </CtaLink>{" "}
        legt je uitgaven naast die van huishoudens zoals het jouwe, in ongeveer 3 minuten. Heb je betalingsachterstanden,
        dan is gratis hulp via je gemeente of Geldfit beter op zijn plek.
      </p>
    </>
  );
}
