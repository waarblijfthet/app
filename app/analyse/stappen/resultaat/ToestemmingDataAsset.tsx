"use client";

import { useState } from "react";
import { getSessieId } from "@/lib/sessie";

/**
 * Eén opt-in-zin voor de data-asset (CLAUDE.md 8.25, plan sectie 6 punt 3).
 *
 * Dit is de enige plek waar toestemming gevraagd wordt om de ingevulde
 * bedragen anoniem mee te laten tellen in de pagina "Waar blijft het bij [n]
 * huishoudens". Bewust één zin en bewust een lege checkbox: opt-in, geen
 * vooraf aangevinkt vakje.
 *
 * Opslaan gaat via /api/analyse-voortgang, dezelfde server-route die de
 * voortgang wegschrijft. De browser heeft geen schrijfrecht op de tabel.
 * Het schrijven mag nooit de pagina breken, dus alles faalt stil en de
 * bezoeker ziet alleen dat het vinkje aan staat.
 */
export default function ToestemmingDataAsset() {
  const [aan, setAan] = useState(false);

  function wissel(nieuw: boolean) {
    setAan(nieuw);
    const sessieId = getSessieId();
    if (!sessieId) return;
    try {
      void fetch("/api/analyse-voortgang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessie_id: sessieId,
          toestemming_data_asset: nieuw,
        }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // stil falen
    }
  }

  return (
    <div className="mt-6 pt-5 border-t border-[#E6E9E7]">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={aan}
          onChange={(e) => wissel(e.target.checked)}
          className="mt-0.5 w-4 h-4 accent-[#0B7A6E] flex-shrink-0"
        />
        <span className="font-body text-sm text-text-soft">
          Mijn bedragen mogen anoniem meetellen, zodat ik straks kan laten zien wat huishoudens
          zoals dat van jou werkelijk uitgeven.
        </span>
      </label>
      <p className="font-body text-xs text-text-muted mt-2">
        Zonder naam, zonder e-mailadres, en alleen als een groep groot genoeg is om niemand
        herkenbaar te maken.
      </p>
    </div>
  );
}
