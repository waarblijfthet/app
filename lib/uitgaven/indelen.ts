/**
 * Eén boeking indelen: intern, inkomen, overige ontvangst, of een uitgave met categorie.
 */
import type { Transactie } from "../bankbestand";
import { CATEGORIEEN, type CategorieId, isBetaalprovider, normaliseer, zoekMerk, zoekTrefwoord } from "./categorieen";

export type Indeling = {
  categorie: CategorieId;
  /** Merknaam uit MERKEN, of null als de tegenpartij geen bekend bedrijf is. */
  merk: string | null;
  /** Sleutel om dezelfde tegenpartij over maanden heen te herkennen (lokaal, gaat nooit mee). */
  groep: string;
};

const CONTANT_CODES = new Set(["ga", "gm", "geldautomaat", "gea"]);
const OVERBOEKING_CODES = new Set(["tb", "ov", "overschrijving", "ovb"]);

/** Tegenpartij zonder winkelnummers en plaatsnamen-achtige staart, voor het groeperen. */
export function groepsnaam(t: Transactie): string {
  if (t.tegenIban) return t.tegenIban;
  return normaliseer(t.tegenpartij).replace(/[0-9]+/g, "").replace(/\s+/g, " ").trim().slice(0, 40) || "onbekend";
}

export function deelIn(t: Transactie): Indeling {
  const code = (t.code || "").toLowerCase();
  const naamMerk = isBetaalprovider(t.tegenpartij) ? null : zoekMerk(t.tegenpartij);
  const merk = naamMerk || (code === "id" || code === "ei" || code === "ic" || isBetaalprovider(t.tegenpartij) ? zoekMerk(t.omschrijving) : null);
  const groep = merk ? "merk:" + merk.merk : groepsnaam(t);
  if (merk) return { categorie: merk.categorie, merk: merk.merk, groep: groep };
  if (CONTANT_CODES.has(code)) return { categorie: "contant", merk: null, groep: groep };
  const trefwoord = zoekTrefwoord(t.tegenpartij + " " + t.omschrijving);
  if (trefwoord) return { categorie: trefwoord, merk: null, groep: groep };
  if (code === "db") return { categorie: "bankkosten", merk: null, groep: groep };
  if (OVERBOEKING_CODES.has(code)) return { categorie: "overboeking", merk: null, groep: groep };
  return { categorie: "overig", merk: null, groep: groep };
}

export function standaardBak(c: CategorieId) {
  return CATEGORIEEN[c].bak;
}
