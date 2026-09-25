/**
 * Meting van de tweede ingang (25-sep-2026): welke keuzes leiden tot een
 * Geldscan-aanvraag. Leest alleen intake_aanvragen, telt op het voorvoegsel
 * "[Keuze: <label>]" in grootste_knelpunt (lib/geldmomenten.ts). Geen nieuwe
 * kolom, geen nieuw scherm: het resultaat staat als blok op Vandaag.
 *
 * "Betaald" volgt dezelfde definitie als de trechter op Vandaag: status
 * betaald of gestart. Die status zet Jarno met de hand, dus de conversie per
 * keuze is zo betrouwbaar als die administratie.
 */

import { KEUZES, keuzeUitKnelpunt } from "./geldmomenten";

/** Vanaf deze dag bestaat het keuzeveld. Oudere aanvragen tellen niet mee. */
export const KEUZE_START = "2026-09-25";

export const GEEN_KEUZE = "Geen keuze";

export interface KeuzeRij {
  created_at: string;
  status: string | null;
  grootste_knelpunt: string | null;
}

export interface KeuzeTelling {
  label: string;
  aantal: number;
  /** Aandeel van alle Geldscan-aanvragen sinds KEUZE_START, in hele procenten. */
  aandeel: number;
  betaald: number;
}

export interface KeuzeWeek {
  /** Maandag van de week, JJJJ-MM-DD. */
  week: string;
  totaal: number;
  metKeuze: number;
}

export interface KeuzeMeting {
  sinds: string;
  totaal: number;
  metKeuze: number;
  perKeuze: KeuzeTelling[];
  perWeek: KeuzeWeek[];
}

const BETAALD = new Set(["betaald", "gestart"]);

/** Maandag (UTC) van de week waarin een tijdstip valt, als JJJJ-MM-DD. */
function maandagVan(iso: string): string {
  const d = new Date(iso);
  const dag = (d.getUTCDay() + 6) % 7;
  const m = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - dag));
  return m.toISOString().slice(0, 10);
}

export function meetKeuzes(rijen: KeuzeRij[], nu: Date): KeuzeMeting {
  const binnen = rijen.filter((r) => r.created_at >= KEUZE_START);
  const totaal = binnen.length;

  // Vaste volgorde: de keuzes uit lib/geldmomenten.ts, daarna eventuele oude
  // labels die hernoemd zijn, daarna "Geen keuze".
  const tellers = new Map<string, { aantal: number; betaald: number }>();
  KEUZES.forEach((k) => tellers.set(k.label, { aantal: 0, betaald: 0 }));
  let metKeuze = 0;
  let geen = { aantal: 0, betaald: 0 };

  for (const r of binnen) {
    const label = keuzeUitKnelpunt(r.grootste_knelpunt);
    const betaald = BETAALD.has(r.status ?? "") ? 1 : 0;
    if (label) {
      metKeuze += 1;
      const t = tellers.get(label) ?? { aantal: 0, betaald: 0 };
      tellers.set(label, { aantal: t.aantal + 1, betaald: t.betaald + betaald });
    } else {
      geen = { aantal: geen.aantal + 1, betaald: geen.betaald + betaald };
    }
  }

  const aandeel = (n: number) => (totaal === 0 ? 0 : Math.round((n / totaal) * 100));
  const perKeuze: KeuzeTelling[] = Array.from(tellers.entries()).map(([label, t]) => ({
    label: label,
    aantal: t.aantal,
    aandeel: aandeel(t.aantal),
    betaald: t.betaald,
  }));
  perKeuze.push({ label: GEEN_KEUZE, aantal: geen.aantal, aandeel: aandeel(geen.aantal), betaald: geen.betaald });

  // Weken van de start tot nu, nieuwste bovenaan, hooguit twaalf.
  const weken: string[] = [];
  let w = new Date(maandagVan(KEUZE_START + "T12:00:00Z") + "T00:00:00Z");
  const laatste = maandagVan(nu.toISOString());
  while (w.toISOString().slice(0, 10) <= laatste) {
    weken.push(w.toISOString().slice(0, 10));
    w = new Date(w.getTime() + 7 * 86400000);
  }
  const perWeek: KeuzeWeek[] = weken
    .slice(-12)
    .reverse()
    .map((week) => {
      const inWeek = binnen.filter((r) => maandagVan(r.created_at) === week);
      return {
        week: week,
        totaal: inWeek.length,
        metKeuze: inWeek.filter((r) => keuzeUitKnelpunt(r.grootste_knelpunt) !== null).length,
      };
    });

  return { sinds: KEUZE_START, totaal: totaal, metKeuze: metKeuze, perKeuze: perKeuze, perWeek: perWeek };
}
