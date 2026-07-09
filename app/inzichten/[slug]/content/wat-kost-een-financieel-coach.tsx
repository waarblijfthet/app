import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const oranje = { color: "#0B7A6E", textDecoration: "none" } as const;

const tarieven = [
  { vorm: "Los uurtarief financieel coach", prijs: "€60 tot €150 per uur", noot: "Grote steden en specialisten zitten aan de bovenkant" },
  { vorm: "Budgetcoach per uur", prijs: "€60 tot €100 per uur", noot: "Vaak inclusief btw, kennismaking meestal gratis" },
  { vorm: "Compleet coachingtraject", prijs: "€250 tot €800", noot: "Meerdere gesprekken plus plan, soms tot €1.000" },
  { vorm: "Via de werkgever", prijs: "€0 voor jou", noot: "Steeds meer werkgevers vergoeden een geldcoach" },
  { vorm: "Eenmalig adviesgesprek bij mij", prijs: "€125 eenmalig", noot: "45 minuten, doelen plus schriftelijke samenvatting" },
];

export default function WatKostEenFinancieelCoach() {
  return (
    <>
      <p style={p}>
        Een financieel coach kost in Nederland gemiddeld €60 tot €150 per uur.
        Een compleet traject, met meerdere gesprekken en een plan, kost al snel
        €250 tot €800. Dat zijn serieuze bedragen, zeker als je juist bij een
        coach aanklopt omdat er elke maand te weinig overblijft. Daarom in dit
        artikel: wat je precies betaalt, waar het verschil in zit, wanneer het
        zich terugverdient en wanneer een gratis alternatief slimmer is.
      </p>

      <h2 style={h2}>De tarieven op een rij</h2>
      <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
        <table className="font-body" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #E6E9E7", textAlign: "left" }}>
              <th style={{ padding: "0.6rem 0.75rem 0.6rem 0", color: "#16211F", fontWeight: 500 }}>Vorm</th>
              <th style={{ padding: "0.6rem 0.75rem 0.6rem 0", color: "#16211F", fontWeight: 500 }}>Prijs</th>
              <th style={{ padding: "0.6rem 0", color: "#16211F", fontWeight: 500 }}>Goed om te weten</th>
            </tr>
          </thead>
          <tbody>
            {tarieven.map((t) => (
              <tr key={t.vorm} style={{ borderBottom: "1px solid #E6E9E7", verticalAlign: "top" }}>
                <td style={{ padding: "0.6rem 0.75rem 0.6rem 0", fontWeight: 400 }}>{t.vorm}</td>
                <td style={{ padding: "0.6rem 0.75rem 0.6rem 0", whiteSpace: "nowrap" }}>{t.prijs}</td>
                <td style={{ padding: "0.6rem 0", color: "#4A5A56" }}>{t.noot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={p}>
        De termen lopen in de praktijk door elkaar: financieel coach, geldcoach
        en budgetcoach zijn geen beschermde titels. Wat iemand rekent zegt dus
        weinig over wat je krijgt. Kijk daarom altijd naar de werkwijze en naar
        het verdienmodel. In{" "}
        <Link href="/inzichten/verschil-budgetcoach-financieel-coach" style={oranje} className="hover:underline">
          budgetcoach of financieel coach: het verschil
        </Link>{" "}
        leg ik uit welke vorm bij welke situatie past.
      </p>

      <h2 style={h2}>Waar het prijsverschil in zit</h2>
      <p style={p}>
        Drie dingen bepalen het tarief. Ten eerste de vorm: losse uren zijn per
        uur duurder dan een pakket, maar bij een pakket zit je vast aan een
        traject dat je misschien niet nodig hebt. Ten tweede de regio en
        specialisatie: een coach in Amsterdam die zich richt op ondernemers
        rekent meer dan een algemene coach in de regio. Ten derde het
        verdienmodel, en dit is de belangrijkste: sommige "gratis" of goedkope
        adviseurs verdienen aan provisie op producten die ze je aanraden. Dan
        betaal je alsnog, alleen zie je het niet.
      </p>
      <p style={p}>
        Vuistregel: een coach die transparant een vast bedrag vraagt en niets
        verkoopt, is bijna altijd goedkoper dan een "gratis" adviseur met
        provisiebelang. Hoe dat zit bij gecertificeerde adviseurs lees je in{" "}
        <Link href="/inzichten/wat-kost-een-financieel-adviseur" style={oranje} className="hover:underline">
          wat kost een financieel adviseur
        </Link>
        .
      </p>

      <h2 style={h2}>Wanneer verdient een financieel coach zich terug?</h2>
      <p style={p}>
        De rekensom is simpeler dan hij lijkt. Bij de huishoudens die ik
        begeleid heb, was het gemiddelde resultaat €460 per maand meer
        overhouden, zonder meer te verdienen. Geen belofte, jouw situatie
        bepaalt de uitkomst. Maar zelfs de kleinste structurele vondst, een
        dubbele verzekering van €40 per maand of €150 te veel aan
        boodschappen, verdient een gesprek van €125 binnen een paar maanden
        terug. Het omslagpunt ligt laag: één gevonden weglek is genoeg.
      </p>
      <p style={p}>
        Waar het zich niet terugverdient: als je al precies weet waar je geld
        naartoe gaat en het probleem puur discipline is. Dan heb je geen
        inzicht nodig maar een systeem, en dat kun je grotendeels zelf bouwen.
        Begin dan bij{" "}
        <Link href="/inzichten/geld-indelen-salaris-potjes-systeem" style={oranje} className="hover:underline">
          het potjessysteem
        </Link>{" "}
        of{" "}
        <Link href="/inzichten/budget-maken-dat-je-volhoudt" style={oranje} className="hover:underline">
          een budget dat je volhoudt
        </Link>
        .
      </p>

      <h2 style={h2}>Gratis alternatieven, en voor wie die bedoeld zijn</h2>
      <p style={p}>
        Eerlijk is eerlijk: er bestaat goede gratis hulp. Heb je schulden of
        betalingsachterstanden, dan kun je kosteloos terecht bij de
        schuldhulpverlening van je gemeente of via Geldfit. Sommige werkgevers
        vergoeden een budgetcoach of bieden er zelf één aan, vraag ernaar bij
        HR. En het Nibud heeft gratis rekentools om je uitgaven te vergelijken.
      </p>
      <p style={p}>
        Die gratis routes zijn gebouwd voor geldproblemen. Zit je daar niet,
        verdien je prima maar houd je structureel te weinig over, dan val je
        tussen wal en schip: te "rijk" voor schuldhulp, te praktisch probleem
        voor een dure vermogensadviseur. Precies voor die groep doe ik dit.
      </p>

      <h2 style={h2}>Wat het bij mij kost</h2>
      <p style={p}>
        Ik werk niet met uurtarieven. De{" "}
        <Link href="/analyse" style={oranje} className="hover:underline">
          analyse is gratis
        </Link>{" "}
        en laat direct zien waar jouw uitgaven afwijken van vergelijkbare
        huishoudens. Wil je daarna samen naar je cijfers kijken, dan kost een{" "}
        <Link href="/adviesgesprek" style={oranje} className="hover:underline">
          eenmalig adviesgesprek €125
        </Link>
        : 45 minuten, 2 à 3 concrete doelen en een schriftelijke samenvatting.
        Geen abonnement, geen verplicht vervolg, geen producten. Alles over
        mijn werkwijze staat op de pagina{" "}
        <Link href="/financieel-coach" style={oranje} className="hover:underline">
          financieel coach
        </Link>
        .
      </p>
    </>
  );
}
