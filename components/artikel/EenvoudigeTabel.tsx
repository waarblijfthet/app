import type { ReactNode } from "react";

/**
 * Een eenvoudige teksttabel voor artikelen (25-sep-2026, geldmomenten).
 * Scrollt binnen zijn eigen container op een smal scherm (CLAUDE.md 8.16), dus
 * de pagina zelf schuift nooit horizontaal. Geen berekeningen hierin: wie een
 * bedrag in een cel zet, rekent het uit in de content en geeft het door.
 */
export default function EenvoudigeTabel({
  koppen,
  rijen,
  bijschrift,
}: {
  koppen: string[];
  rijen: ReactNode[][];
  bijschrift?: string;
}) {
  return (
    <div className="overflow-x-auto my-6" style={{ WebkitOverflowScrolling: "touch" }}>
      <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse", minWidth: "520px" }}>
        {bijschrift && (
          <caption className="text-left text-xs pb-2" style={{ color: "#5A6B66", captionSide: "top" }}>
            {bijschrift}
          </caption>
        )}
        <thead>
          <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
            {koppen.map((k, i) => (
              <th
                key={k}
                className={i === 0 ? "text-left py-2 pr-3" : "text-left py-2 px-3"}
                style={{ color: "#16211F", fontWeight: 600, verticalAlign: "bottom" }}
              >
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rijen.map((rij, r) => (
            <tr key={r} style={{ borderBottom: "1px solid #E6E9E7" }}>
              {rij.map((cel, c) => (
                <td
                  key={c}
                  className={c === 0 ? "py-2 pr-3 align-top" : "py-2 px-3 align-top"}
                  style={{ color: c === 0 ? "#16211F" : "#4A5A56", fontWeight: c === 0 ? 500 : 300, lineHeight: 1.55 }}
                >
                  {cel}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
