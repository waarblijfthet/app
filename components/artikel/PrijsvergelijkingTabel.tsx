"use client";

const producten = [
  { naam: "Oral-B opzetborstels (4 stuks)", nl: 27.99, de: 13.45, winkel: "DM" },
  { naam: "Dove douchegel (250ml)", nl: 3.49, de: 1.75, winkel: "DM" },
  { naam: "Ariel wasmiddel (40 wassen)", nl: 14.99, de: 8.99, winkel: "Kaufland" },
  { naam: "Coca-Cola 1,25L", nl: 2.19, de: 0.75, winkel: "Lidl" },
  { naam: "Nescafé Gold (200g)", nl: 7.99, de: 4.49, winkel: "Kaufland" },
  { naam: "Pampers maat 4 (44 stuks)", nl: 16.99, de: 10.99, winkel: "DM" },
  { naam: "Head & Shoulders shampoo (400ml)", nl: 6.49, de: 3.29, winkel: "Rossmann" },
  { naam: "Sensodyne tandpasta (75ml)", nl: 5.49, de: 2.79, winkel: "DM" },
  { naam: "Red Bull (4-pack)", nl: 6.49, de: 4.19, winkel: "Aldi" },
  { naam: "Milka chocolade (300g)", nl: 3.29, de: 1.99, winkel: "Lidl" },
];

export function PrijsvergelijkingTabel() {
  const totaalNL = producten.reduce((s, p) => s + p.nl, 0);
  const totaalDE = producten.reduce((s, p) => s + p.de, 0);
  const besparing = totaalNL - totaalDE;
  const pct = Math.round((besparing / totaalNL) * 100);

  return (
    <div className="my-8 rounded-2xl overflow-hidden border border-[#E6E9E7]">
      {/* Header */}
      <div className="bg-[#16211F] px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-[#8AB89A] text-xs font-medium uppercase tracking-wider mb-0.5">
            Prijsvergelijking 2025
          </p>
          <p className="text-[#F7F8F7] text-sm font-medium">
            Exact dezelfde producten, twee landen
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#8AB89A] text-xs">Gemiddelde besparing</p>
          <p className="text-[#0B7A6E] text-2xl font-semibold">{pct}%</p>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F0F3F1]">
              <th className="text-left px-4 py-3 text-[#4A5A56] font-medium">
                Product
              </th>
              <th className="text-right px-4 py-3 text-[#4A5A56] font-medium">
                Nederland
              </th>
              <th className="text-right px-4 py-3 text-[#4A5A56] font-medium">
                Duitsland
              </th>
              <th className="text-right px-4 py-3 text-[#4A5A56] font-medium">
                Besparing
              </th>
              <th className="text-right px-4 py-3 text-[#4A5A56] font-medium hidden sm:table-cell">
                Winkel
              </th>
            </tr>
          </thead>
          <tbody>
            {producten.map((p, i) => {
              const bespaar = p.nl - p.de;
              const bespaarPct = Math.round((bespaar / p.nl) * 100);
              return (
                <tr
                  key={p.naam}
                  className={i % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#F7F8F7]"}
                >
                  <td className="px-4 py-3 text-[#16211F]">{p.naam}</td>
                  <td className="px-4 py-3 text-right text-[#4A5A56]">
                    €{p.nl.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right text-[#2D6A4F] font-medium">
                    €{p.de.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-block bg-[#E7F1EE] text-[#2D6A4F] text-xs font-medium px-2 py-0.5 rounded-full">
                      -{bespaarPct}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-[#8B958F] text-xs hidden sm:table-cell">
                    {p.winkel}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-[#16211F]">
              <td className="px-4 py-3 text-[#F7F8F7] font-medium">
                Totaal mandje
              </td>
              <td className="px-4 py-3 text-right text-[#F7F8F7] font-medium">
                €{totaalNL.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right text-[#8AB89A] font-medium">
                €{totaalDE.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right">
                <span className="text-[#0B7A6E] font-semibold">
                  -€{besparing.toFixed(2)}
                </span>
              </td>
              <td className="hidden sm:table-cell"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="px-5 py-3 bg-[#F7F8F7] border-t border-[#E6E9E7]">
        <p className="text-xs text-[#8B958F]">
          Prijzen verzameld op basis van Consumentenbond onderzoek 2025, Kassa
          prijsvergelijking en actuele aanbiedingen. Prijzen kunnen wekelijks
          variëren.
        </p>
      </div>
    </div>
  );
}
