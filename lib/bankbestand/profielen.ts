/**
 * Herkenning van CSV-exports per bank op de kopregel.
 *
 * Rabobank: bevestigd op 9 nov 2026 met een echte particuliere export (26 kolommen, komma, alles tussen
 *   aanhalingstekens, Windows-1252, bedrag als "+1.234,56"). 1.303 regels op twee rekeningen gelezen,
 *   saldo na de laatste boeking klopt per rekening op de cent. Eén download besloeg 1 jul t/m 8 nov.
 *   Codes in die export: tb, bc, id, ei, cb, db, ba, bg, we, ga, cc, kh, ec.
 * ING: kolommen volgens Yuki (support.yuki.nl, artikel 80000787467, geraadpleegd 9 nov 2026).
 * Andere banken: vangnet met kolomkeuze, tot er een echte kopregel is.
 */
import type { BankId, KolomKeuze } from "./types";
import { naarCenten, naarIsoDatum, normaliseerIban, schoon } from "./waarden";

export type RuweTransactie = {
  datum: string;
  bedragCent: number;
  eigenIban: string | null;
  tegenIban: string | null;
  tegenpartij: string;
  omschrijving: string;
  code: string | null;
};

type Rij = (kop: string) => string;

type Profiel = {
  bank: BankId;
  herken: (koppen: string[]) => boolean;
  lees: (v: Rij) => RuweTransactie | null;
};

export function normaliseerKop(k: string): string {
  return k.replace(/^﻿/, "").replace(/"/g, "").trim().toLowerCase();
}

function heeft(koppen: string[], ...namen: string[]): boolean {
  return namen.every((n) => koppen.includes(n));
}

const RABOBANK: Profiel = {
  bank: "rabobank",
  herken: (k) => heeft(k, "iban/bban", "datum", "bedrag", "naam tegenpartij"),
  lees: (v) => {
    const datum = naarIsoDatum(v("datum"));
    const bedragCent = naarCenten(v("bedrag"));
    if (!datum || bedragCent === null) return null;
    return {
      datum: datum,
      bedragCent: bedragCent,
      eigenIban: normaliseerIban(v("iban/bban")),
      tegenIban: normaliseerIban(v("tegenrekening iban/bban")),
      tegenpartij: schoon(v("naam tegenpartij") || v("naam uiteindelijke partij")),
      omschrijving: schoon([v("omschrijving-1"), v("omschrijving-2"), v("omschrijving-3")].join(" ")),
      code: schoon(v("code")) || null,
    };
  },
};

const ING: Profiel = {
  bank: "ing",
  herken: (k) => heeft(k, "datum", "naam / omschrijving", "af bij"),
  lees: (v) => {
    const datum = naarIsoDatum(v("datum"));
    const kaal = naarCenten(v("bedrag (eur)"));
    if (!datum || kaal === null) return null;
    const af = v("af bij").trim().toLowerCase().startsWith("af");
    return {
      datum: datum,
      bedragCent: af ? -Math.abs(kaal) : Math.abs(kaal),
      eigenIban: normaliseerIban(v("rekening")),
      tegenIban: normaliseerIban(v("tegenrekening")),
      tegenpartij: schoon(v("naam / omschrijving")),
      omschrijving: schoon(v("mededelingen")),
      code: schoon(v("code")) || null,
    };
  },
};

export const PROFIELEN: Profiel[] = [RABOBANK, ING];

const ALIASSEN: Record<keyof KolomKeuze, string[]> = {
  datum: ["datum", "boekdatum", "transactiedatum", "date", "boekingsdatum"],
  bedrag: ["bedrag", "bedrag (eur)", "amount", "bedrag bij/af", "transactiebedrag"],
  omschrijving: ["omschrijving", "mededelingen", "description", "omschrijving-1", "betalingskenmerk"],
  tegenpartij: ["naam tegenpartij", "naam", "tegenpartij", "naam / omschrijving", "counterparty"],
  afBij: ["af bij", "af/bij", "credit/debit", "debet/credit"],
};

/** Raadt welke kolom wat is, als voorstel voor de bezoeker. */
export function stelKolommenVoor(koppen: string[]): Partial<KolomKeuze> {
  const voorstel: Partial<KolomKeuze> = {};
  (Object.keys(ALIASSEN) as (keyof KolomKeuze)[]).forEach((veld) => {
    const index = koppen.findIndex((k) => ALIASSEN[veld].includes(k));
    if (index !== -1) voorstel[veld] = index;
  });
  return voorstel;
}

/** Leest één rij met een kolomkeuze van de bezoeker. */
export function leesMetKeuze(rij: string[], keuze: KolomKeuze): RuweTransactie | null {
  const datum = naarIsoDatum(rij[keuze.datum] || "");
  const kaal = naarCenten(rij[keuze.bedrag] || "");
  if (!datum || kaal === null) return null;
  let bedragCent = kaal;
  if (keuze.afBij !== undefined) {
    const ab = (rij[keuze.afBij] || "").trim().toLowerCase();
    const af = ab.startsWith("af") || ab === "d" || ab.startsWith("debet") || ab.startsWith("debit");
    bedragCent = af ? -Math.abs(kaal) : Math.abs(kaal);
  }
  return {
    datum: datum,
    bedragCent: bedragCent,
    eigenIban: null,
    tegenIban: null,
    tegenpartij: schoon(keuze.tegenpartij !== undefined ? rij[keuze.tegenpartij] : ""),
    omschrijving: schoon(rij[keuze.omschrijving]),
    code: null,
  };
}
