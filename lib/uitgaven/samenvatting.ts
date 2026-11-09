/**
 * De samenvatting: het ENIGE wat naar de server (en de AI) gaat.
 * Geen IBANs, geen omschrijvingen, geen datums (alleen maanden), geen namen behalve merknamen
 * uit MERKEN; bedragen in hele euro's, maandtotalen afgerond op tientjes.
 */
import { CATEGORIEEN, type Bak, type CategorieId } from "./categorieen";
import { isLosGroot, type Overzicht } from "./overzicht";

export const SAMENVATTING_VERSIE = 2;

export type Samenvatting = {
  versie: 2;
  bron: "afschrift" | "schatting";
  maanden: string[];
  perMaand: { maand: string; inkomen: number; overigeOntvangsten: number; vast: number; nietMaandelijks: number; dagelijks: number; extraAflossing: number; over: number }[];
  /** overGewoneMaand: over, zonder losse bedragen vanaf € 1.000 die niet jaarlijks terugkomen. */
  gemiddeldPerMaand: { inkomen: number; overigeOntvangsten: number; vast: number; nietMaandelijks: number; dagelijks: number; extraAflossing: number; over: number; overGewoneMaand: number };
  /** perMaand zonder losse bedragen vanaf € 1.000 die niet jaarlijks terugkomen; die staan in nietMaandelijks. */
  categorieen: { naam: string; bak: Bak; perMaand: number; aantalPerMaand: number }[];
  vasteLasten: { naam: string; categorie: string; perMaand: number }[];
  /** aard: "eenmalig" of "jaarlijks" als de bezoeker dat zei, anders "onbekend". */
  nietMaandelijks: { naam: string; categorie: string; maand: string; bedrag: number; aard: "eenmalig" | "jaarlijks" | "onbekend" }[];
  /** Geld naar en van eigen rekeningen en potjes buiten de geüploade bestanden, gemiddeld per maand. Geen uitgave. */
  sparen: { naarPotjesPerMaand: number; terugUitPotjesPerMaand: number; nettoPerMaand: number };
  /** Hoeveel procent van het uitgegeven bedrag nog niet in een categorie valt. Stuurt de kwaliteitscontrole. */
  kwaliteit: { aandeelOnbekend: number; aandeelOverboekingen: number };
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
    extraAflossing: tientje(m.aflossingCent),
    over: tientje(m.overCent),
  }));
  const gem = (k: "inkomenCent" | "ontvangstCent" | "vastCent" | "nietMaandelijksCent" | "dagelijksCent" | "aflossingCent" | "overCent") =>
    tientje(o.perMaand.reduce((s, m) => s + m[k], 0) / n);

  const uitgaven = o.posten.filter((p) => p.soort === "vast" || p.soort === "nietMaandelijks" || p.soort === "dagelijks");
  const totaalUit = uitgaven.reduce((s, p) => s - p.t.bedragCent, 0);
  const aandeel = (f: (c: string | null) => boolean) =>
    totaalUit > 0 ? Math.round((100 * uitgaven.filter((p) => f(p.categorie)).reduce((s, p) => s - p.t.bedragCent, 0)) / totaalUit) : 0;

  const boodschappen = o.posten.filter((p) => p.categorie === "boodschappen" && p.soort !== "intern" && p.t.bedragCent < 0);
  const abonnementen = o.vasteLasten.filter((v) => v.categorie === "abonnementen");

  return {
    versie: 2,
    bron: "afschrift",
    maanden: o.maanden.slice(),
    perMaand: perMaand,
    gemiddeldPerMaand: {
      inkomen: gem("inkomenCent"),
      overigeOntvangsten: gem("ontvangstCent"),
      vast: gem("vastCent"),
      nietMaandelijks: gem("nietMaandelijksCent"),
      dagelijks: gem("dagelijksCent"),
      extraAflossing: gem("aflossingCent"),
      over: gem("overCent"),
      overGewoneMaand: tientje((o.perMaand.reduce((s, m) => s + m.overCent, 0) + o.posten.filter(isLosGroot).reduce((s, p) => s - p.t.bedragCent, 0)) / n),
    },
    categorieen: o.categorieTotalen.map((c) => ({
      naam: CATEGORIEEN[c.categorie as CategorieId].label,
      bak: c.bak,
      perMaand: euro((c.totaalCent - c.losseGroteCent) / n),
      aantalPerMaand: Math.round((c.aantal / n) * 10) / 10,
    })).sort((a, b) => b.perMaand - a.perMaand),
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
      aard: x.aard === "eenmalig" || x.aard === "jaarlijks" ? x.aard : ("onbekend" as const),
    })),
    sparen: {
      naarPotjesPerMaand: tientje(o.sparen.reduce((a, m) => a + m.heenCent, 0) / n),
      terugUitPotjesPerMaand: tientje(o.sparen.reduce((a, m) => a + m.terugCent, 0) / n),
      nettoPerMaand: tientje(o.sparen.reduce((a, m) => a + m.heenCent - m.terugCent, 0) / n),
    },
    kwaliteit: {
      aandeelOnbekend: aandeel((c) => c === "overig" || c === "overboeking"),
      aandeelOverboekingen: aandeel((c) => c === "overboeking"),
    },
    kenmerken: {
      aantalRekeningen: o.aantalRekeningen,
      boodschappenKeerPerMaand: Math.round(boodschappen.length / n),
      boodschappenGemiddeldBedrag: boodschappen.length ? euro(boodschappen.reduce((s, p) => s - p.t.bedragCent, 0) / boodschappen.length) : 0,
      abonnementenAantal: abonnementen.length,
      abonnementenPerMaand: euro(abonnementen.reduce((s, v) => s + v.perMaandCent, 0)),
    },
  };
}
