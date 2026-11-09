/**
 * Voorstellen voor de twee vragen in de wizard: welke rekeningen van jullie zelf zijn, en wat inkomen is.
 * Draait alleen in de browser; labels mogen hier namen bevatten, want ze verlaten het apparaat niet.
 */
import type { Transactie } from "../bankbestand";
import { normaliseer, zoekMerk } from "./categorieen";

export type RekeningKandidaat = {
  iban: string;
  label: string;
  /** Laatste vier tekens, voor weergave als "•••• 1234". */
  eindigtOp: string;
  aantal: number;
  heenCent: number;
  terugCent: number;
  /** Lijkt op een eigen rekening: dezelfde achternaam als de rekeninghouder, of een spaarwoord in de omschrijving. */
  waarschijnlijkEigen: boolean;
  reden: "naam" | "omschrijving" | null;
};

export type InkomenKandidaat = {
  sleutel: string;
  label: string;
  soort: "salaris" | "uitkering" | "toeslag" | "overig";
  aantal: number;
  maanden: number;
  gemiddeldPerMaandCent: number;
  voorgesteld: boolean;
};

const GEEN_NAAMDEEL = new Set(["eo", "en", "of", "van", "de", "der", "den", "het", "ter", "ten", "dhr", "mevr", "mw", "fam", "familie", "bv", "nv", "vof"]);
const SPAARWOORD = /(^| )(spaar\w*|sparen|potje\w*|buffer|reserve\w*)( |$)/;

/** Delen van een naam die iets zeggen: achternamen, zonder voorletters en tussenwoorden. */
export function naamDelen(naam: string): string[] {
  return normaliseer(naam)
    .replace(/[^a-z ]/g, " ")
    .split(" ")
    .filter((w) => w.length >= 3 && !GEEN_NAAMDEEL.has(w));
}

/**
 * Namen van de rekeninghouders, afgeleid uit overboekingen tussen rekeningen die allebei in de
 * geüploade bestanden zitten (daar staat de eigen naam als tegenpartij). Blijft op het apparaat.
 */
export function eigenNamen(t: Transactie[], extra: string[] = []): Set<string> {
  const eigen = eigenIbansUitBestanden(t);
  const delen = new Set<string>();
  t.forEach((x) => {
    if (x.tegenIban && eigen.has(x.tegenIban)) naamDelen(x.tegenpartij).forEach((d) => delen.add(d));
  });
  extra.forEach((n) => naamDelen(n).forEach((d) => delen.add(d)));
  return delen;
}

export function eigenIbansUitBestanden(t: Transactie[]): Set<string> {
  return new Set(t.map((x) => x.eigenIban).filter((x): x is string => !!x));
}

/** Sleutel waarmee een inkomstenbron in de wizard en in het overzicht hetzelfde heet. */
export function inkomenSleutel(t: Transactie): string {
  return t.tegenIban || "naam:" + normaliseer(t.tegenpartij);
}

function maandVan(datum: string): string {
  return datum.slice(0, 7);
}

/** Tegenrekeningen waar veel geld heen of vandaan gaat en die geen bekend bedrijf zijn. */
export function rekeningKandidaten(t: Transactie[], max = 6, extraNamen: string[] = []): RekeningKandidaat[] {
  const eigen = eigenIbansUitBestanden(t);
  const namen = eigenNamen(t, extraNamen);
  const omschrijvingen = new Map<string, string>();
  const perIban = new Map<string, RekeningKandidaat>();
  t.forEach((x) => {
    if (!x.tegenIban || eigen.has(x.tegenIban)) return;
    if (zoekMerk(x.tegenpartij)) return;
    const k = perIban.get(x.tegenIban) || {
      iban: x.tegenIban,
      label: x.tegenpartij || "Onbekend",
      eindigtOp: x.tegenIban.slice(-4),
      aantal: 0,
      heenCent: 0,
      terugCent: 0,
      waarschijnlijkEigen: false,
      reden: null,
    };
    omschrijvingen.set(x.tegenIban, (omschrijvingen.get(x.tegenIban) || "") + " " + normaliseer(x.omschrijving + " " + x.tegenpartij));
    k.aantal++;
    if (x.bedragCent < 0) k.heenCent += -x.bedragCent;
    else k.terugCent += x.bedragCent;
    perIban.set(x.tegenIban, k);
  });
  // Wie alleen geld stuurt als salaris, uitkering of toeslag is geen eigen rekening; dat is de inkomensvraag.
  const isInkomstenbron = (iban: string) => {
    const lijst = t.filter((x) => x.tegenIban === iban);
    return lijst.every((x) => x.bedragCent > 0) &&
      lijst.some((x) => (x.code || "").toLowerCase() === "cb" || soortVan(x.tegenpartij, x.omschrijving) !== "overig");
  };
  return Array.from(perIban.values())
    .filter((k) => k.aantal >= 3 || k.heenCent + k.terugCent >= 50000)
    .filter((k) => !isInkomstenbron(k.iban))
    .map((k) => {
      if (naamDelen(k.label).some((d) => namen.has(d))) return Object.assign(k, { waarschijnlijkEigen: true, reden: "naam" as const });
      if (SPAARWOORD.test(omschrijvingen.get(k.iban) || "")) return Object.assign(k, { waarschijnlijkEigen: true, reden: "omschrijving" as const });
      return k;
    })
    .sort((a, b) => b.heenCent + b.terugCent - (a.heenCent + a.terugCent))
    .slice(0, max);
}

function soortVan(naam: string, omschrijving: string): InkomenKandidaat["soort"] {
  const n = normaliseer(naam + " " + omschrijving);
  if (/(^| )(svb|uwv|sociale verzekeringsbank)( |$)/.test(n)) return "uitkering";
  if (/(^| )belastingdienst( |$)/.test(n) || /toeslag/.test(n)) return "toeslag";
  if (/salaris|loon|salary/.test(n)) return "salaris";
  return "overig";
}

/** Bijschrijvingen die op inkomen lijken, met een voorstel om ze aan te vinken. */
export function inkomenKandidaten(t: Transactie[], eigenIbans: Set<string>, maandenInPeriode: number): InkomenKandidaat[] {
  const groepen = new Map<string, Transactie[]>();
  t.forEach((x) => {
    if (x.bedragCent <= 0) return;
    if (x.tegenIban && eigenIbans.has(x.tegenIban)) return;
    const sleutel = inkomenSleutel(x);
    const lijst = groepen.get(sleutel) || [];
    lijst.push(x);
    groepen.set(sleutel, lijst);
  });
  const uit: InkomenKandidaat[] = [];
  groepen.forEach((lijst, sleutel) => {
    const totaal = lijst.reduce((s, x) => s + x.bedragCent, 0);
    const maanden = new Set(lijst.map((x) => maandVan(x.datum))).size;
    const soort = soortVan(lijst[0].tegenpartij, lijst.map((x) => x.omschrijving).join(" "));
    const grootste = Math.max(...lijst.map((x) => x.bedragCent));
    const relevant = soort !== "overig" || grootste >= 30000 || lijst.some((x) => (x.code || "").toLowerCase() === "cb");
    if (!relevant) return;
    const perMaand = Math.round(totaal / Math.max(1, maandenInPeriode));
    const regelmatig = maanden >= Math.max(1, Math.ceil(maandenInPeriode * 0.6));
    uit.push({
      sleutel: sleutel,
      label: lijst[0].tegenpartij || "Onbekend",
      soort: soort,
      aantal: lijst.length,
      maanden: maanden,
      gemiddeldPerMaandCent: perMaand,
      voorgesteld: soort === "uitkering" || soort === "toeslag" || (regelmatig && perMaand >= 50000),
    });
  });
  return uit.sort((a, b) => b.gemiddeldPerMaandCent - a.gemiddeldPerMaandCent);
}
