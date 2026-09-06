import Link from "next/link";
import KindgebondenBudgetRekenaar from "@/components/artikel/KindgebondenBudgetRekenaar";
import CtaLink from "@/components/CtaLink";
import { geldscanHref } from "@/lib/cta";
import {
  berekenKgb,
  kostenVanDeMaatregel,
  nulpunt,
  KGB_2026,
  KGB_2027,
  VERHOGING_PROCENTPUNT,
  TABEL_INKOMENS,
} from "@/lib/kindgebonden-budget";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function eur(n: number): string {
  return "\u20ac" + n.toLocaleString("nl-NL");
}

export default function KindgebondenBudget2027Inkomensgrens() {
  const rijen = TABEL_INKOMENS.map((inkomen) => ({
    inkomen,
    nu: berekenKgb(2026, "paar", 2, inkomen),
    straks: berekenKgb(2027, "paar", 2, inkomen),
    maatregel: kostenVanDeMaatregel("paar", 2, inkomen),
  }));
  const piek = rijen.reduce((a, b) => (b.maatregel.perMaand > a.maatregel.perMaand ? b : a));
  const nulMet = nulpunt("paar", 2);
  const nulZonder = nulpunt("paar", 2, true);
  const verschuiving = Math.round((nulZonder - nulMet) / 100) * 100;
  const pp = (VERHOGING_PROCENTPUNT * 100).toFixed(2).replace(".", ",");

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
          Jullie verdienen samen goed, en juist daarom valt er steeds iets weg. Eerst de
          zorgtoeslag, straks een stuk van het kindgebonden budget. Terwijl de opvang, de
          boodschappen en de hypotheek gewoon doorlopen.
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
            "Vanaf welk gezamenlijk inkomen je in 2027 sneller kindgebonden budget verliest",
            "Wat de maatregel jouw huishouden per maand kost, doorgerekend",
            "Waarom het kindgebonden budget nu veel eerder op nul uitkomt dan voorheen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                &#10003;
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Antwoord bovenaan */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: vanaf 1 januari 2027 bouwt het kindgebonden budget veel sneller af zodra jullie
        gezamenlijke toetsingsinkomen boven ongeveer {eur(KGB_2027.tweedeAfbouwpunt)} uitkomt. Boven
        die grens gaat er {pp} procentpunt extra af, wat voor een stel met twee jonge kinderen
        oploopt tot ongeveer {eur(piek.maatregel.perMaand)} per maand. Het kindgebonden budget komt
        daardoor rond {eur(nulMet)} op nul uit in plaats van rond {eur(nulZonder)}, zo&apos;n{" "}
        {eur(verschuiving)} eerder.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 6 september 2026. Het afbouwpercentage en de grens staan vast in het
        wetsvoorstel; de bedragen voor 2027 zijn een raming tot Prinsjesdag op 15 september. Ik werk
        dit artikel daarna bij.
      </p>

      <h2 className="font-display" style={h2}>
        Wat er precies verandert
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het kindgebonden budget kent nu één afbouwpunt. Verdien je meer dan dat bedrag, dan gaat er
        een vast percentage van je budget af over elke euro daarboven. In 2026 is dat 7,6 procent,
        vanaf {eur(KGB_2026.afbouwpuntPaar)} gezamenlijk inkomen voor stellen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Vanaf 2027 komt daar een tweede afbouwpunt bij. Vanaf een toetsingsinkomen van {eur(60000)},
        prijspeil 2024, stijgt het afbouwpercentage naar 12,35 procent, en in 2028 naar 12,8
        procent. Dat is een verhoging van {pp} procentpunt bovenop het basispercentage. De
        redenering van het kabinet is dat het kindgebonden budget bij hogere inkomens niet
        doelmatig is.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat dat betekent voor een huishouden staat nergens uitgerekend. De Rijksoverheid legt de
        maatregel uit, de Belastingdienst legt de rekenregel uit, en het wetsvoorstel legt de
        wetstekst uit. Daarom hieronder de tabel.
      </p>

      <h2 className="font-display" style={h2}>
        Wat kost het per maand?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Doorgerekend voor een stel met twee kinderen onder de 12. De laatste kolom is wat de nieuwe
        afbouwschijf kost, los van de gewone jaarlijkse indexatie. Dat is dus de prijs van de
        maatregel zelf.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Gezamenlijk inkomen
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Nu (2026)
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                In 2027
              </th>
              <th className="text-right py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Wat de maatregel kost
              </th>
            </tr>
          </thead>
          <tbody>
            {rijen.map((r) => (
              <tr key={r.inkomen} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3" style={{ color: "#16211F" }}>
                  {eur(r.inkomen)}
                </td>
                <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>
                  {eur(r.nu.perMaand)}
                </td>
                <td className="text-right py-2 px-3" style={{ color: "#4A5A56" }}>
                  {eur(r.straks.perMaand)}
                </td>
                <td
                  className="text-right py-2 pl-3"
                  style={{ color: r.maatregel.perMaand > 0 ? "#16211F" : "#4A5A56" }}
                >
                  {r.maatregel.perMaand === 0 ? "niets" : eur(r.maatregel.perMaand)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Alle bedragen per maand. De bedragen voor 2027 zijn een raming, want de definitieve
        bedragen komen op Prinsjesdag. Het afbouwpercentage van 12,35 procent en de grens van{" "}
        {eur(60000)} staan wel vast in het wetsvoorstel.
      </p>

      <KindgebondenBudgetRekenaar />

      <h2 className="font-display" style={h2}>
        Waarom dit juist tweeverdieners raakt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        {eur(KGB_2027.tweedeAfbouwpunt)} gezamenlijk klinkt als veel, maar het is een
        toetsingsinkomen: het bruto verzamelinkomen van jullie samen. Twee partners die allebei
        rond de {eur(35000)} bruto verdienen zitten daar al boven. Dat is geen uitzonderlijk
        huishouden, dat is een gewoon tweeverdienersgezin met twee banen en kinderen op de opvang.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En het staat niet op zichzelf. Het CPB raamt in de concept-Macro Economische Verkenning
        2027 dat de koopkracht in 2027 met 0,3 procent daalt, na een plus van 0,6 procent in 2026,
        bij een inflatie van ongeveer 3 procent. De zorgpremie stijgt volgens de eerste ramingen
        naar boven de {eur(2000)} per jaar per volwassene. Elk van die posten is op zichzelf te
        overzien. Bij elkaar opgeteld verklaren ze waarom januari anders voelt dan december.
      </p>

      <h2 className="font-display" style={h2}>
        Wat je er nu aan kunt doen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Aan de regeling zelf weinig. Aan de verrassing wel. Het
        kindgebonden budget wordt maandelijks uitbetaald, dus een verschil van{" "}
        {eur(piek.maatregel.perMaand)} per maand is een verschil dat je in januari op je rekening
        ziet en niet in je hoofd hebt zitten. Wie dat bedrag nu al uit de maandbegroting haalt,
        merkt in januari niets.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Praktisch: kijk niet alleen naar deze post. Reken je hele huishouden door en zet er de
        andere 2027-veranderingen naast. Zie ook{" "}
        <Link href="/inzichten/samen-te-veel-verdiend-toeslag-kwijt" style={link} className="hover:underline">
          samenwonen en toeslag kwijt
        </Link>{" "}
        en{" "}
        <Link href="/inzichten/samen-6000-euro-netto-toch-niets-over" style={link} className="hover:underline">
          samen &euro;6.000 netto en toch niets over
        </Link>
        .
      </p>

      {/* Slotblok: Geldscan als tekstlink */}
      <p className="font-body text-text-soft" style={p}>
        Blijft er bij jullie ook zonder deze maatregel al te weinig over, dan zit het zelden in één
        post. Wil je weten waar het bij jouw huishouden precies weglekt, dan kan dat met de{" "}
        <CtaLink doel="geldscan" href={geldscanHref()} locatie="slot" style={link} className="hover:underline">
          Geldscan van &euro;49
        </CtaLink>
        , die ik met de hand voor je uitwerk.
      </p>
    </>
  );
}
