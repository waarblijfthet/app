import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function TweeverdienersTochKrap() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom twee salarissen niet automatisch ruimer voelen: de kosten groeien even hard mee",
            "De kinderopvangval: hoeveel een extra werkdag netto oplevert ná opvang en belasting valt soms mee",
            "Dat het tweede inkomen een bestemming nodig heeft vóórdat het binnenkomt, anders verdwijnt het",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Twee salarissen die binnenkomen. Allebei een baan, allebei een inkomen.
        Op papier zou het ruim moeten zitten. En toch is het aan het einde van de
        maand net zo krap als bij één inkomen, soms krapper.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: twee inkomens betekenen vaak ook dubbele vaste lasten. Een
        tweede auto, kinderopvang, een groter huis, meer uit eten omdat de tijd
        ontbreekt. Het tweede inkomen wordt zelden gespaard, het wordt
        meebesteed. Daardoor voelt rondkomen met twee salarissen niet
        automatisch ruimer.
      </p>

      <h2 className="font-display" style={h2}>
        Twee inkomens, twee keer de kosten
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een tweede baan brengt eigen kosten met zich mee. Vaak een tweede auto of
        meer reiskosten. Vaker iets afhalen of bestellen omdat er &apos;s avonds
        niemand tijd heeft om te koken. En omdat er meer binnenkomt, kiest een
        gezin sneller voor een duurder huis, de grootste vaste last van
        allemaal.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Bij twee ongeveer modale inkomens (modaal is in 2026 rond de €48.000 bruto
        per jaar) lijkt het bedrag dat binnenkomt fors. Maar het bedrag dat
        automatisch weer vastligt, groeit even hard mee.
      </p>

      <h2 className="font-display" style={h2}>
        De kinderopvang-val
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Voor gezinnen met jonge kinderen is er een extra factor: kinderopvang.
        Een groot deel van het tweede inkomen kan opgaan aan opvangkosten, ook na
        toeslag. Veel ouders houden netto verrassend weinig over van die tweede
        baan, terwijl de drukte en de kosten er wel volop zijn.
      </p>

      <h2 className="font-display" style={h2}>
        Het ligt niet aan jullie
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Als dit herkenbaar is: jullie doen niks fout. Dit is hetzelfde patroon
        dat speelt bij gezinnen die{" "}
        <Link href="/inzichten/goed-salaris-toch-krap" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">goed verdienen en toch krap zitten</Link>.
        Het probleem is zelden het inkomen, het is dat de uitgaven ongemerkt
        meegroeien, iets wat ook wel{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie</Link>{" "}
        heet.
      </p>

      <h2 className="font-display" style={h2}>
        Wat wél helpt bij twee inkomens
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het keerpunt is meestal niet meer verdienen, maar overzicht. Behandel het
        tweede inkomen niet als &ldquo;extra ruimte&rdquo; die vanzelf opgaat,
        maar geef het een bestemming voordat het binnenkomt. Een vaste verdeling
        helpt daarbij, zie de{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">potjesmethode</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je zien waar jullie twee inkomens nu naartoe gaan?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}
        en vergelijk jezelf met vergelijkbare gezinnen. Kom je er samen niet uit,
        dan kijken we via onze{" "}
        <Link href="/aanbod" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">begeleiding</Link>{" "}mee.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Uit de praktijk: lees <a href="/inzichten/bso-kosten-tweede-inkomen-zo-draaiden-we-het-om" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">hoe een gezin de BSO-kosten omdraaide</a>.
      </p>
    </>
  );
}
