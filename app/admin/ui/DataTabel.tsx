"use client";

import { useMemo, useState } from "react";
import LegeStaat from "./LegeStaat";

export interface DataTabelKolom<T> {
  key: string;
  header: string;
  render: (rij: T) => React.ReactNode;
  sorteerWaarde?: (rij: T) => string | number;
  className?: string;
}

interface Props<T> {
  data: T[];
  kolommen: DataTabelKolom<T>[];
  rijSleutel: (rij: T) => string;
  selecteerbaar?: boolean;
  geselecteerd?: Set<string>;
  onSelectieChange?: (geselecteerd: Set<string>) => void;
  laden?: boolean;
  legeStaatTitel?: string;
  legeStaatUitleg?: string;
  mobieleKaart?: (rij: T) => React.ReactNode;
  onRijKlik?: (rij: T) => void;
}

/**
 * Generieke tabel voor de admin: sticky kop, sticky eerste kolom, selectie,
 * sortering, lege staat, laadskelet en een mobiele kaart-fallback via
 * render-prop. Vervangt de tien eigen tabelimplementaties (sectie 3).
 */
export default function DataTabel<T>({
  data,
  kolommen,
  rijSleutel,
  selecteerbaar = false,
  geselecteerd,
  onSelectieChange,
  laden = false,
  legeStaatTitel = "Niets gevonden",
  legeStaatUitleg,
  mobieleKaart,
  onRijKlik,
}: Props<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortRichting, setSortRichting] = useState<"asc" | "desc">("asc");

  const gesorteerd = useMemo(() => {
    if (!sortKey) return data;
    const kolom = kolommen.find((k) => k.key === sortKey);
    if (!kolom?.sorteerWaarde) return data;
    const kopie = [...data];
    kopie.sort((a, b) => {
      const av = kolom.sorteerWaarde!(a);
      const bv = kolom.sorteerWaarde!(b);
      if (av < bv) return sortRichting === "asc" ? -1 : 1;
      if (av > bv) return sortRichting === "asc" ? 1 : -1;
      return 0;
    });
    return kopie;
  }, [data, sortKey, sortRichting, kolommen]);

  function toggleSort(kolom: DataTabelKolom<T>) {
    if (!kolom.sorteerWaarde) return;
    if (sortKey === kolom.key) {
      setSortRichting((r) => (r === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(kolom.key);
      setSortRichting("asc");
    }
  }

  function toggleRij(id: string) {
    if (!geselecteerd || !onSelectieChange) return;
    const nieuw = new Set(geselecteerd);
    if (nieuw.has(id)) nieuw.delete(id);
    else nieuw.add(id);
    onSelectieChange(nieuw);
  }

  function toggleAlles() {
    if (!geselecteerd || !onSelectieChange) return;
    if (geselecteerd.size === gesorteerd.length) {
      onSelectieChange(new Set());
    } else {
      onSelectieChange(new Set(gesorteerd.map(rijSleutel)));
    }
  }

  if (laden) {
    return (
      <div className="rounded-xl overflow-hidden shadow-card border border-[#E6E9E7]">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="h-11 border-b border-[#E6E9E7] last:border-0 bg-card animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (gesorteerd.length === 0) {
    return <LegeStaat titel={legeStaatTitel} uitleg={legeStaatUitleg} />;
  }

  return (
    <>
      {/* Mobiel: kaartlijst */}
      {mobieleKaart && (
        <div className="flex flex-col gap-3 sm:hidden">
          {gesorteerd.map((rij) => (
            <div key={rijSleutel(rij)}>{mobieleKaart(rij)}</div>
          ))}
        </div>
      )}

      {/* Desktop: tabel */}
      <div
        className={`rounded-xl shadow-card border border-[#E6E9E7] overflow-x-auto ${
          mobieleKaart ? "hidden sm:block" : ""
        }`}
      >
        <table className="w-full text-sm font-body border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              {selecteerbaar && (
                <th className="sticky left-0 bg-primary px-4 py-3 w-10 z-10">
                  <input
                    type="checkbox"
                    checked={geselecteerd?.size === gesorteerd.length && gesorteerd.length > 0}
                    onChange={toggleAlles}
                    aria-label="Alles selecteren"
                  />
                </th>
              )}
              {kolommen.map((k, i) => (
                <th
                  key={k.key}
                  onClick={() => toggleSort(k)}
                  className={`text-left px-4 py-3 font-medium text-xs uppercase tracking-wide whitespace-nowrap ${
                    i === 0 && !selecteerbaar ? "sticky left-0 bg-primary z-10 pl-5" : ""
                  } ${k.sorteerWaarde ? "cursor-pointer select-none" : ""} ${k.className ?? ""}`}
                >
                  {k.header}
                  {sortKey === k.key && (sortRichting === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gesorteerd.map((rij, i) => {
              const id = rijSleutel(rij);
              return (
                <tr
                  key={id}
                  onClick={() => onRijKlik?.(rij)}
                  className={`border-b border-[#E6E9E7] last:border-0 ${
                    i % 2 === 0 ? "bg-card" : "bg-background"
                  } ${onRijKlik ? "cursor-pointer hover:bg-accent-bg/40" : ""}`}
                >
                  {selecteerbaar && (
                    <td
                      className={`sticky left-0 px-4 py-3 w-10 ${i % 2 === 0 ? "bg-card" : "bg-background"}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={geselecteerd?.has(id) ?? false}
                        onChange={() => toggleRij(id)}
                        aria-label="Selecteer rij"
                      />
                    </td>
                  )}
                  {kolommen.map((k, ki) => (
                    <td
                      key={k.key}
                      className={`px-4 py-3 ${
                        ki === 0 && !selecteerbaar
                          ? `sticky left-0 pl-5 ${i % 2 === 0 ? "bg-card" : "bg-background"}`
                          : ""
                      } ${k.className ?? ""}`}
                    >
                      {k.render(rij)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
