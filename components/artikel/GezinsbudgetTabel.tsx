import Link from "next/link";
import { rapportVoorSlug, type Post } from "@/lib/rapporten-data";

/**
 * De begrotingstabel per post voor twee huishoudens met samen €6.000 tot
 * €7.500 netto, naast elkaar.
 *
 * Reden (6-sep-2026): dit artikel is de pijler van cluster P geworden en
 * tegelijk de brug naar de hub voor tweeverdieners. Het gezinsbudget-format
 * uit `docs/serp-inkomensbedragen-17-aug-2026.md` (kans 7) wint in deze SERP:
 * de doorgerekende tabel, niet het betoog.
 *
 * Twee kolommen en geen derde kolom met een gemiddelde. Middelen over
 * huishoudens is verboden (waarheidsregel 2) en zou hier ook onzin opleveren:
 * het ene huishouden heeft drie kinderen en twee auto's, het andere geen
 * kinderen en alleen ov. Juist dat verschil is wat de lezer moet zien.
 *
 * Alle bedragen komen uit `lib/rapporten-data.ts` via `rapportVoorSlug()`,
 * letterlijk zoals de huishoudens ze zelf aanleverden. Nooit met de hand
 * overtypen.
 */

const GEZIN = "tweeverdieners-drie-kinderen";
const STEL = "stel-zonder-kinderen";

const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function zoek(posten: Post[], label: string): string | null {
  const gevonden = posten.find((post) => post.label === label);
  return gevonden ? gevonden.waarde : null;
}

/** Labels van het eerste huishouden, aangevuld met wat alleen het tweede heeft. */
function labelsVan(a: Post[], b: Post[]): string[] {
  const uit = a.map((post) => post.label);
  b.forEach((post) => {
    if (!uit.includes(post.label)) uit.push(post.label);
  });
  return uit;
}

function Sectie({
  titel,
  a,
  b,
  kopA,
  kopB,
}: {
  titel: string;
  a: Post[];
  b: Post[];
  kopA: string;
  kopB: string;
}) {
  const labels = labelsVan(a, b);
  return (
    <div className="overflow-x-auto mb-6">
      <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
            <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
              {titel}
            </th>
            <th className="text-left py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
              {kopA}
            </th>
            <th className="text-left py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>
              {kopB}
            </th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label) => (
            <tr key={label} style={{ borderBottom: "1px solid #E6E9E7" }}>
              <td className="py-2 pr-3 align-top" style={{ color: "#16211F" }}>
                {label}
              </td>
              <td className="py-2 px-3 align-top" style={{ color: "#4A5A56" }}>
                {zoek(a, label) ?? "niet van toepassing"}
              </td>
              <td className="py-2 pl-3 align-top" style={{ color: "#4A5A56" }}>
                {zoek(b, label) ?? "niet van toepassing"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function GezinsbudgetTabel() {
  const gezin = rapportVoorSlug(GEZIN);
  const stel = rapportVoorSlug(STEL);
  if (!gezin || !stel) return null;

  const kopA = "Gezin, drie kinderen";
  const kopB = "Stel, geen kinderen";

  return (
    <div className="my-8">
      <p className="font-body text-text-soft" style={{ marginBottom: "1rem", fontWeight: 300 }}>
        Hieronder staan hun twee begrotingen post voor post, zoals zij ze zelf aanleverden. Ik zet er
        bewust geen gemiddelde onder: het ene huishouden heeft drie kinderen en twee auto&apos;s, het
        andere geen kinderen en alleen ov. Dat verschil is juist wat je moet zien.
      </p>

      <Sectie titel="Wat er binnenkomt" a={gezin.inkomsten} b={stel.inkomsten} kopA={kopA} kopB={kopB} />
      <Sectie titel="Vaste lasten per maand" a={gezin.lasten} b={stel.lasten} kopA={kopA} kopB={kopB} />
      <Sectie titel="Dagelijks en jaarlijks" a={gezin.dagelijks} b={stel.dagelijks} kopA={kopA} kopB={kopB} />

      <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
        Bij allebei was mijn conclusie dat er geen lek zat. Bij het gezin was het &ldquo;
        {gezin.uitkomstKop.toLowerCase()}&rdquo;, bij het stel &ldquo;{stel.uitkomstKop.toLowerCase()}
        &rdquo;. De volledige rapporten staan bij{" "}
        <Link href={`/rapporten/${GEZIN}`} style={link} className="hover:underline">
          het gezin met drie kinderen
        </Link>{" "}
        en{" "}
        <Link href={`/rapporten/${STEL}`} style={link} className="hover:underline">
          het stel zonder kinderen
        </Link>
        .
      </p>
    </div>
  );
}
