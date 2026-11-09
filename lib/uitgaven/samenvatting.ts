/**
 * De samenvatting: het ENIGE wat naar de server (en de AI) gaat.
 * Geen IBANs, geen omschrijvingen, geen datums (alleen maanden), geen namen behalve merknamen
 * uit MERKEN; bedragen in hele euro's, maandtotalen afgerond op tientjes.
 */
import { CATEGORIEEN, type Bak, type CategorieId } from "./categorieen";
import type { Overzicht } from "./overzicht";

export const SAMENVATTING_VERSIE = 1;

export type Samenvatting = {
  versie: 1;
  bron: "afschrift" | "schatting";
  maanden: string[];
  perMaand: { maand: string; inkomen: number; overigeOntvangsten: number; vast: number; nietMaandelijks: number; dagelijks: number; over: number }[];
  gemiddeldPerMaand: { inkomen: number; overigeOntvangsten: number; vast: number; nietMaandelijks: number; dagelijks: number; over: number };
  categorieen: { naam: string; bak: Bak; perMaand: number; aantalPerMaand: number }[];
  vasteLasten: { naam: string; categorie: string; perMaand: number }[];
  nietMaandelijks: { naam: string; categorie: string; maand: string; bedrag: number }[];
  kenmerken: {
    aantalRekeningen: number;
    boodschappenKeerPerMaand: number;
    boodschappenGemiddeldBedrag: number;
    abonnementenAantal: number;
    abonnementenPerMaand: number;
  };
};

function euro(cent: number): number {
  return Math.round(cent / 100);
}

function tientje(cent: number): number {
  return Math.round(cent / 1000) * 10;
}

export function maakSamenvatting(o: Overzicht): Samenvatting {
  const n = Math.max(1, o.maanden.length);
  const perMaand = o.perMaand.map((m) => ({
    maand: m.maand,
    inkomen: tientje(m.inkomenCent),
    overigeOntvangsten: tientje(m.ontvangstCent),
    vast: tientje(m.vastCent),
    nietMaandelijks: tientje(m.nietMaandelijksCent),
    dagelijks: tientje(m.dagelijksCent),
    over: tientje(m.overCent),
  }));
  const gem = (k: "inkomenCent" | "ontvangstCent" | "vastCent" | "nietMaandelijksCent" | "dagelijksCent" | "overCent") =>
    tientje(o.perMaand.reduce((s, m) => s + m[k], 0) / n);

  const boodschappen = o.posten.filter((p) => p.categorie === "boodschappen" && p.soort !== "intern" && p.t.bedragCent < 0);
  const abonnementen = o.vasteLasten.filter((v) => v.categorie === "abonnementen");

  return {
    versie: 1,
    bron: "afschrift",
    maanden: o.maanden.slice(),
    perMaand: perMaand,
    gemiddeldPerMaand: {
      inkomen: gem("inkomenCent"),
      overigeOntvangsten: gem("ontvangstCent"),
      vast: gem("vastCent"),
      nietMaandelijks: gem("nietMaandelijksCent"),
      dagelijks: gem("dagelijksCent"),
      over: gem("overCent"),
    },
    categorieen: o.categorieTotalen.map((c) => ({
      naam: CATEGORIEEN[c.categorie as CategorieId].label,
      bak: c.bak,
      perMaand: euro(c.totaalCent / n),
      aantalPerMaand: Math.round((c.aantal / n) * 10) / 10,
    })),
    vasteLasten: o.vasteLasten.slice(0, 25).map((v) => ({
      naam: v.merk || CATEGORIEEN[v.categorie].label,
      categorie: CATEGORIEEN[v.categorie].label,
      perMaand: euro(v.perMaandCent),
    })),
    nietMaandelijks: o.nietMaandelijks.slice(0, 25).map((x) => ({
      naam: x.merk || CATEGORIEEN[x.categorie].label,
      categorie: CATEGORIEEN[x.categorie].label,
      maand: x.maand,
      bedrag: euro(x.bedragCent),
    })),
    kenmerken: {
      aantalRekeningen: o.aantalRekeningen,
      boodschappenKeerPerMaand: Math.round(boodschappen.length / n),
      boodschappenGemiddeldBedrag: boodschappen.length ? euro(boodschappen.reduce((s, p) => s - p.t.bedragCent, 0) / boodschappen.length) : 0,
      abonnementenAantal: abonnementen.length,
      abonnementenPerMaand: euro(abonnementen.reduce((s, v) => s + v.perMaandCent, 0)),
    },
  };
}
