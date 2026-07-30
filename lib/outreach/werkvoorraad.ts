// Gedeelde werkvoorraad-berekening voor de outreach-CRM: dezelfde telling die
// OutreachWerklijst.tsx (fase 2b) al deed, hier verplaatst zodat de nieuwe
// route /api/admin/vandaag exact dezelfde getallen laat zien als de
// outreach-werklijst zelf. Zie docs/admin-redesign-30-jul-2026.md sectie 6:
// "Trek de bestaande logica uit die werklijst in een gedeelde functie en
// gebruik die op beide plekken."

import { OutreachContact } from "@/lib/outreach/types";
import { WerklijstStapels, rijpeDatum, verdeelInStapels } from "@/lib/outreach/labels";

export interface Werkvoorraad {
  stapels: WerklijstStapels;
  wachtMail2: number;
  wachtMail3: number;
  zonderPsZin: number;
  vroegsteWachtDagen: number | null;
}

/**
 * Verdeelt contacten in de vier werklijst-stapels en berekent de afgeleide
 * getallen die de werklijst-UI ernaast toont (wie wacht op mail 2 versus 3,
 * hoeveel nieuwe contacten missen een ps-zin, wanneer de eerstvolgende
 * "wachten"-follow-up rijp wordt). Precies de berekening die eerder inline
 * in OutreachWerklijst.tsx stond.
 */
export function berekenWerkvoorraad(contacten: OutreachContact[]): Werkvoorraad {
  const stapels = verdeelInStapels(contacten);

  const wachtMail2 = stapels.followupRijp.filter((c) => (c.followups ?? 0) === 0).length;
  const wachtMail3 = stapels.followupRijp.filter((c) => (c.followups ?? 0) === 1).length;
  const zonderPsZin = stapels.klaarOmTeVersturen.filter((c) => !c.ps_zin || !c.ps_zin.trim()).length;

  const vroegsteWachtDagen = stapels.wachten.reduce<number | null>((min, c) => {
    const rijp = rijpeDatum(c);
    if (!rijp) return min;
    const dagen = Math.ceil((rijp.getTime() - Date.now()) / 86400000);
    if (dagen <= 0) return min;
    return min === null ? dagen : Math.min(min, dagen);
  }, null);

  return { stapels, wachtMail2, wachtMail3, zonderPsZin, vroegsteWachtDagen };
}
