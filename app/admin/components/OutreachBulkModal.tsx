"use client";

import { useEffect, useState } from "react";
import { DOELGROEPEN } from "@/lib/outreach/labels";

export type BulkModalType = "doelgroep" | "plaats" | "verwijderen";

interface Props {
  type: BulkModalType | null;
  aantal: number;
  bezig: boolean;
  onSluiten: () => void;
  onDoelgroep: (doelgroep: string) => void;
  onPlaats: (plaats: string) => void;
  onVerwijderen: (blocklist: boolean) => void;
}

/**
 * Eén klein modal voor de drie bulkacties die meer dan een klik nodig hebben:
 * doelgroep wijzigen, plaats wijzigen en verwijderen (met bevestiging).
 * De andere bulkacties (mail 1, follow-up, stop mails, archiveren) hebben
 * geen invoer nodig en gaan direct via de SelectieBalk.
 * Zie docs/admin-redesign-30-jul-2026.md sectie 5b.
 */
export default function OutreachBulkModal({
  type,
  aantal,
  bezig,
  onSluiten,
  onDoelgroep,
  onPlaats,
  onVerwijderen,
}: Props) {
  const [doelgroepWaarde, setDoelgroepWaarde] = useState(DOELGROEPEN[0].value);
  const [plaatsWaarde, setPlaatsWaarde] = useState("");
  const [blocklist, setBlocklist] = useState(true);
  const [typBevestiging, setTypBevestiging] = useState("");

  const vereistTypen = type === "verwijderen" && aantal > 3;
  const typenKlopt = !vereistTypen || typBevestiging.trim() === String(aantal);

  useEffect(() => {
    if (!type) return;
    setDoelgroepWaarde(DOELGROEPEN[0].value);
    setPlaatsWaarde("");
    setBlocklist(true);
    setTypBevestiging("");
  }, [type]);

  if (!type) return null;

  const titels: Record<BulkModalType, string> = {
    doelgroep: "Doelgroep wijzigen",
    plaats: "Plaats wijzigen",
    verwijderen: "Contacten verwijderen",
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"
      onClick={() => { if (!bezig) onSluiten(); }}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="font-display text-lg font-semibold text-primary">{titels[type]}</h3>
          <p className="text-xs text-text-muted mt-0.5">
            {aantal} contact{aantal === 1 ? "" : "en"} geselecteerd
          </p>
        </div>

        {type === "doelgroep" && (
          <select
            value={doelgroepWaarde}
            onChange={(e) => setDoelgroepWaarde(e.target.value)}
            className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm bg-white"
          >
            {DOELGROEPEN.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        )}

        {type === "plaats" && (
          <input
            type="text"
            value={plaatsWaarde}
            onChange={(e) => setPlaatsWaarde(e.target.value)}
            placeholder="Zwolle"
            className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm"
          />
        )}

        {type === "verwijderen" && (
          <div className="space-y-3">
            <p className="text-sm text-text-soft">
              Dit verwijdert {aantal} contact{aantal === 1 ? "" : "en"} definitief uit outreach.
              Deze actie kan niet ongedaan gemaakt worden.
            </p>
            <label className="flex items-center gap-2 text-sm text-text-soft">
              <input
                type="checkbox"
                checked={blocklist}
                onChange={(e) => setBlocklist(e.target.checked)}
              />
              Ook op de e-mail blocklist zetten, zodat de prospect-zoeker deze contacten niet opnieuw aandraagt
            </label>
            {vereistTypen && (
              <div>
                <label className="block text-xs text-text-muted mb-1">
                  Typ {aantal} om te bevestigen
                </label>
                <input
                  type="text"
                  value={typBevestiging}
                  onChange={(e) => setTypBevestiging(e.target.value)}
                  className="w-full border border-[#E6E9E7] rounded-md px-3 py-2 text-sm"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={onSluiten}
            disabled={bezig}
            className="text-sm px-4 py-2 rounded-md border border-[#E6E9E7] text-text-soft hover:border-primary disabled:opacity-50"
          >
            Annuleren
          </button>
          {type === "doelgroep" && (
            <button
              onClick={() => onDoelgroep(doelgroepWaarde)}
              disabled={bezig}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              {bezig ? "Bezig..." : "Toepassen"}
            </button>
          )}
          {type === "plaats" && (
            <button
              onClick={() => onPlaats(plaatsWaarde.trim())}
              disabled={bezig || !plaatsWaarde.trim()}
              className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
            >
              {bezig ? "Bezig..." : "Toepassen"}
            </button>
          )}
          {type === "verwijderen" && (
            <button
              onClick={() => onVerwijderen(blocklist)}
              disabled={bezig || !typenKlopt}
              className="text-sm px-4 py-2 rounded-md bg-danger text-white hover:opacity-90 disabled:opacity-50"
            >
              {bezig ? "Verwijderen..." : `Verwijder ${aantal}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
