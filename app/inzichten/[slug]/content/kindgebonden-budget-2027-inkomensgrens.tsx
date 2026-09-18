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
  VERHOGING_PROCENTPUNT_2028,
  KGB_2028_AFBOUWPERCENTAGE_BOVEN_TWEEDE_PUNT,
  EERDER_VOORGENOMEN_AFBOUWPERCENTAGE_2027,
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
  const pp2028 = (VERHOGING_PROCENTPUNT_2028 * 100).toFixed(2).replace(".", ",");
  const pct = (n: number) => (n * 100).toFixed(2).replace(".", ",").replace(",00", "");

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
        Cijfers bijgewerkt op 18 september 2026. De bedragen voor 2027 waren tot Prinsjesdag een
        raming; ze komen nu allemaal uit de SZW-begroting 2027 van 15 september. Er is meer
        veranderd dan alleen de nauwkeurigheid, zie de volgende alinea.
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
        Vanaf 2027 komt daar een tweede afbouwpunt bij, op {eur(KGB_2027.tweedeAfbouwpunt)}{" "}
        gezamenlijk toetsingsinkomen. Boven dat punt gaat het afbouwpercentage naar{" "}
        {pct(KGB_2027.afbouwpercentageBovenTweedePunt)} procent, {pp} procentpunt bovenop het
        basispercentage van {pct(KGB_2027.afbouwpercentage)} procent. De redenering van het kabinet
        is dat het kindgebonden budget bij hogere inkomens niet doelmatig is.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Op Prinsjesdag is die maatregel op twee punten bijgesteld, en allebei de keren viel het de
        andere kant op dan je zou verwachten. De grens ging omlaag: hij stond op {eur(60000)} in
        prijspeil 2024 en is bij nota van wijziging verlaagd naar {eur(57950)}, wat in bedragen van
        2027 neerkomt op {eur(KGB_2027.tweedeAfbouwpunt)}. Meer huishoudens komen daar dus boven.
        Tegelijk is de stap zelf verzacht: het hogere percentage zou in 2027 al{" "}
        {pct(EERDER_VOORGENOMEN_AFBOUWPERCENTAGE_2027)} procent worden, maar het kabinet voert hem
        in twee delen in. Voor 2027 wordt het{" "}
        {pct(KGB_2027.afbouwpercentageBovenTweedePunt)} procent en pas vanaf 2028{" "}
        {pct(KGB_2028_AFBOUWPERCENTAGE_BOVEN_TWEEDE_PUNT)} procent, oftewel {pp2028} procentpunt
        boven het basispercentage. De rekening van dit jaar is dus lager dan hij leek, en die van
        volgend jaar hoger.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Er verandert nog iets. De kindbedragen zijn beleidsmatig met {eur(63)} per kind verlaagd en
        daarna ge&iuml;ndexeerd, als eerste stap naar een nieuwe kindregeling. Netto komt het
        maximum per kind onder de 12 daardoor uit op {eur(KGB_2027.maxPerKindTot12)} per jaar,
        tegen {eur(KGB_2026.maxPerKindTot12)} in 2026. Ook de vermogensgrens gaat omlaag: boven{" "}
        {eur(KGB_2027.vermogensgrensPaar)} vermogen op 1 januari 2027 vervalt het recht voor een
        aanvrager met toeslagpartner, en boven {eur(KGB_2027.vermogensgrensAlleenstaande)} voor een
        alleenstaande.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat dat alles betekent voor een huishouden staat nergens uitgerekend. De Rijksoverheid legt
        de maatregel uit, de Belastingdienst legt de rekenregel uit, en de begroting geeft de
        parameters. Daarom hieronder de tabel.
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
        Alle bedragen per maand. Alle 2027-cijfers komen uit de SZW-begroting 2027. Let op de
        onderste rijen: onder het tweede afbouwpunt gaat het kindgebonden budget er in 2027 juist
        iets op vooruit, omdat het afbouwpunt en de kindbedragen mee omhoog zijn gegaan. De
        maatregel begint pas te bijten boven {eur(KGB_2027.tweedeAfbouwpunt)}.
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
        En het staat niet op zichzelf. Het CPB raamt in de Macro Economische Verkenning 2027 dat de
        koopkracht in 2027 met 0,1 procent daalt, na een plus van 0,6 procent in 2026, bij een
        inflatie van 2,7 procent. De hoogste twee inkomensgroepen komen volgens de SZW-begroting op
        min 0,2 procent uit. VWS verwacht dat de gemiddelde zorgpremie stijgt van{" "}
        {eur(1879)} naar {eur(2029)} per jaar per volwassene, al stellen de verzekeraars die zelf
        vast en maken ze hem uiterlijk 12 november bekend. Elk van die posten is op zichzelf te
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
        andere 2027-veranderingen naast. Voor een tweeverdienersgezin staan die bij elkaar in{" "}
        <Link href="/inzichten/tweeverdieners-2027-erop-achteruit" style={link} className="hover:underline">
          wat tweeverdieners in 2027 kwijtraken
        </Link>
        , met de combinatiekorting en de zorgkosten erbij. Zie ook{" "}
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
