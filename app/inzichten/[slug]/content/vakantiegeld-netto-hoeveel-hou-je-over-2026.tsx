import Link from "next/link";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function VakantiegeldNettoHoeveelHouJeOver2026() {
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
          Je vakantiegeld komt binnen, je verheugt je erop, en dan valt het bedrag tegen. En een
          maand later is het alweer weg zonder dat je weet waaraan.
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
            "Hoe vakantiegeld wordt opgebouwd en waarom het netto zoveel lager uitvalt dan bruto",
            "Wat je ongeveer overhoudt bij verschillende inkomens in 2026",
            "Waarom vakantiegeld zo vaak ongemerkt verdwijnt, en hoe je dat voorkomt",
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
        Vakantiegeld voelt als een meevaller, maar als het op je rekening staat valt het bedrag
        bijna altijd tegen. Dat komt door de manier waarop het wordt belast. En het tweede deel van
        het verhaal is misschien nog belangrijker: waar blijft het daarna? Ik leg allebei uit, met
        de cijfers van 2026.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: je vakantiegeld valt netto tegen door het bijzonder tarief, waardoor er meer belasting af lijkt te gaan dan je gewend bent. Over het hele jaar klopt het meestal wel, maar het voelt als minder. Hieronder de nettobedragen voor 2026 en hoe je voorkomt dat het ongemerkt verdwijnt.
      </p>

      <h2 className="font-display" style={h2}>
        Hoe wordt vakantiegeld opgebouwd?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vakantiegeld is wettelijk minimaal 8 procent van je brutoloon. Je bouwt het meestal op van
        juni tot en met mei, en het wordt in mei of juni in één keer uitbetaald. Over een
        brutojaarsalaris van €60.000 gaat het dus om ongeveer €4.800 bruto.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Tot zover de meevaller. Het bedrag dat je netto overhoudt, ligt fors lager. En dat heeft
        een reden die veel mensen niet kennen.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom blijft er netto zo weinig over?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Vakantiegeld komt bovenop je gewone loon en wordt belast tegen het zogenoemde bijzonder
        tarief. Dat tarief voelt hoog, en dat klopt ook. Over je maandloon krijg je
        heffingskortingen die je belasting drukken, maar die zijn al verrekend in je gewone salaris.
        Over je vakantiegeld komt dat voordeel er niet nog een keer overheen. Bovendien valt dat
        extra inkomen vaak in een hogere tariefzone.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het bijzonder tarief hangt af van je jaarinkomen. Rond een jaarinkomen van €38.000 ligt het
        op ongeveer 40 procent, en rond €46.000 loopt het op tot ruim 50 procent. Hoe meer je
        verdient, hoe groter het deel dat van je vakantiegeld af gaat. Dit is precies hetzelfde
        mechanisme dat speelt bij een{" "}
        <Link
          href="/inzichten/salarisverhoging-boven-76000-weinig-netto"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          salarisverhoging die netto weinig oplevert
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wat houd je netto over in 2026?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een paar indicaties, gebaseerd op de systematiek van het bijzonder tarief in 2026. Bij €2.000 bruto per maand
        bouw je ongeveer €1.920 bruto vakantiegeld op en houd je daar netto zo&apos;n €1.250 van
        over. Bij €3.000 bruto per maand is het bruto vakantiegeld ongeveer €2.880 en blijft er
        netto rond de €1.650 tot €1.800 over.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Verdien je €5.000 bruto per maand, dan bouw je ongeveer €4.800 bruto op, maar blijft er
        netto ruwweg €2.400 tot €2.500 van over. Bij dit inkomen ligt het bijzonder tarief rond de
        50 procent, dus ongeveer de helft gaat naar de Belastingdienst. Wil je het precies weten,
        vul dan je eigen cijfers in bij een vakantiegeld-calculator.
      </p>

      <h2 className="font-display" style={h2}>
        En dan: waar blijft het?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hier zit voor de meeste mensen de echte les. Het bedrag dat overblijft is nog steeds fors,
        maar binnen een paar weken is het vaak verdampt. Niet aan één grote uitgave, maar aan een
        optelsom: de zomervakantie, een paar etentjes, wat klussen in huis, en de gewone maand die
        gewoon doorloopt. Omdat het geld los binnenkomt en geen bestemming heeft, voelt het als vrij besteedbaar, en dus gaat het op. Werk je als zzp&apos;er en bouw je geen vakantiegeld op? Dan geldt hetzelfde voor elke meevaller die los binnenkomt, zoals een goed kwartaal of een nabetaling.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wie het wél bewust inzet, geeft het vooraf een bestemming: een deel naar de buffer, een deel
        naar een concreet doel, en een afgesproken deel om echt leuk uit te geven. Een goede plek om
        te beginnen is je{" "}
        <Link
          href="/inzichten/wat-kost-een-zomervakantie-gezin"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          zomervakantie reëel begroten
        </Link>{" "}
        en de{" "}
        <Link
          href="/inzichten/seizoens-kostenkalender-per-maand"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          seizoens-kostenkalender
        </Link>{" "}
        erbij pakken, zodat je weet welke uitgaven er deze zomer toch al aankomen.
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
          Benieuwd hoe jouw uitgaven zich verhouden tot vergelijkbare huishoudens? Doe de gratis analyse en zie het meteen. Wil je daarna dat ik persoonlijk naar je cijfers kijk en je drie grootste lekken op een rij zet, dan kan dat met de geldscan (€49).
        </p>
        <Link href="/analyse" className="btn-primary">
          Doe de gratis analyse &rarr;
        </Link>
        <p className="font-body text-sm" style={{ marginTop: "0.75rem", marginBottom: 0 }}>
          <Link href="/geldscan" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Of laat mij je cijfers persoonlijk nakijken (€49)</Link>
        </p>
      </div>
    </>
  );
}
