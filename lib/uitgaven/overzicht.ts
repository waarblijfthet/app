/**
 * Het overzicht: alle boekingen ingedeeld in vier bakken per maand. Draait in de browser.
 * Volledig detail voor de schermen; wat naar de server gaat maakt samenvatting.ts hieruit.
 */
import type { Transactie } from "../bankbestand";
import { CATEGORIEEN, type Bak, type CategorieId } from "./categorieen";
import { deelIn } from "./indelen";
import { eigenIbansUitBestanden, inkomenSleutel } from "./kandidaten";

export type Keuzes = {
  /** Tegenrekeningen die de bezoeker als eigen rekening (of van de partner) aanwees. */
  eigenIbans: string[];
  /** Sleutels uit inkomenKandidaten die de bezoeker als inkomen aanvinkte. */
  inkomenSleutels: string[];
};

export type Soort = "intern" | "inkomen" | "ontvangst" | Bak;

export type Post = {
  t: Transactie;
  soort: Soort;
  categorie: CategorieId | null;
  merk: string | null;
  groep: string;
};

export type MaandTotaal = {
  maand: string;
  inkomenCent: number;
  ontvangstCent: number;
  vastCent: number;
  nietMaandelijksCent: number;
  dagelijksCent: number;
  overCent: number;
};

export type VastePost = { groep: string; merk: string | null; categorie: CategorieId; perMaandCent: number; label: string };
export type LosseGroteUitgave = { merk: string | null; categorie: CategorieId; maand: string; bedragCent: number; label: string };

export type Overzicht = {
  maanden: string[];
  perMaand: MaandTotaal[];
  posten: Post[];
  vasteLasten: VastePost[];
  nietMaandelijks: LosseGroteUitgave[];
  categorieTotalen: { categorie: CategorieId; bak: Bak; totaalCent: number; aantal: number }[];
  aantalRekeningen: number;
};

/** Grens voor een losse uitgave die niet elke maand komt, in centen. */
export const GROTE_UITGAVE_CENT = 25000;

function maandVan(d: string): string {
  return d.slice(0, 7);
}

function dagenInMaand(maand: string): number {
  const [j, m] = maand.split("-").map(Number);
  return new Date(Date.UTC(j, m, 0)).getUTCDate();
}

/**
 * Alleen volledige maanden tellen mee voor gemiddelden: een download van 1 jul t/m 8 nov
 * zou anders november als een zuinige maand laten zien.
 */
export function volledigeMaanden(t: Transactie[]): string[] {
  if (t.length === 0) return [];
  const datums = t.map((x) => x.datum).sort();
  const eerste = datums[0];
  const laatste = datums[datums.length - 1];
  const uit: string[] = [];
  let [j, m] = eerste.slice(0, 7).split("-").map(Number);
  const eind = laatste.slice(0, 7);
  for (;;) {
    const maand = j + "-" + (m < 10 ? "0" + m : String(m));
    const begintOp = maand === eerste.slice(0, 7) ? Number(eerste.slice(8, 10)) : 1;
    const eindigtOp = maand === eind ? Number(laatste.slice(8, 10)) : dagenInMaand(maand);
    if (begintOp <= 3 && eindigtOp >= dagenInMaand(maand) - 3) uit.push(maand);
    if (maand === eind) break;
    m++;
    if (m > 12) {
      m = 1;
      j++;
    }
  }
  return uit;
}

export function maakOverzicht(transacties: Transactie[], keuzes: Keuzes): Overzicht {
  const maanden = volledigeMaanden(transacties);
  const binnen = new Set(maanden);
  const tx = transacties.filter((x) => binnen.has(maandVan(x.datum)));
  const eigen = eigenIbansUitBestanden(transacties);
  keuzes.eigenIbans.forEach((i) => eigen.add(i));
  const inkomen = new Set(keuzes.inkomenSleutels);

  // Eerst indelen, dan per groep kijken of het elke maand terugkomt.
  const voorlopig = tx.map((t) => ({ t: t, indeling: deelIn(t) }));
  const uitgavenPerGroep = new Map<string, { maanden: Set<string>; bedragen: number[] }>();
  voorlopig.forEach(({ t, indeling }) => {
    if (t.bedragCent >= 0 || (t.tegenIban && eigen.has(t.tegenIban))) return;
    const g = uitgavenPerGroep.get(indeling.groep) || { maanden: new Set<string>(), bedragen: [] };
    g.maanden.add(maandVan(t.datum));
    g.bedragen.push(-t.bedragCent);
    uitgavenPerGroep.set(indeling.groep, g);
  });
  const nodigVoorMaandelijks = Math.max(2, Math.ceil(maanden.length * 0.66));
  const maandelijks = new Set<string>();
  uitgavenPerGroep.forEach((g, groep) => {
    if (maanden.length < 2) return;
    const perMaand = g.bedragen.length / g.maanden.size;
    const min = Math.min(...g.bedragen);
    const max = Math.max(...g.bedragen);
    if (g.maanden.size >= nodigVoorMaandelijks && perMaand <= 1.5 && max <= min * 1.6 + 500) maandelijks.add(groep);
  });

  const posten: Post[] = voorlopig.map(({ t, indeling }) => {
    if (t.tegenIban && eigen.has(t.tegenIban)) {
      return { t: t, soort: "intern", categorie: null, merk: indeling.merk, groep: indeling.groep };
    }
    if (t.bedragCent > 0) {
      const isInkomen = inkomen.has(inkomenSleutel(t));
      return { t: t, soort: isInkomen ? "inkomen" : "ontvangst", categorie: null, merk: indeling.merk, groep: indeling.groep };
    }
    let soort: Bak;
    if (maandelijks.has(indeling.groep)) soort = "vast";
    else if (CATEGORIEEN[indeling.categorie].bak === "nietMaandelijks") soort = "nietMaandelijks";
    else if (-t.bedragCent >= GROTE_UITGAVE_CENT && indeling.categorie !== "boodschappen" && indeling.categorie !== "contant") soort = "nietMaandelijks";
    else soort = "dagelijks";
    return { t: t, soort: soort, categorie: indeling.categorie, merk: indeling.merk, groep: indeling.groep };
  });

  const perMaand: MaandTotaal[] = maanden.map((maand) => {
    const p = posten.filter((x) => maandVan(x.t.datum) === maand);
    const som = (s: Soort) => p.filter((x) => x.soort === s).reduce((a, x) => a + Math.abs(x.t.bedragCent), 0);
    const inkomenCent = som("inkomen");
    const ontvangstCent = som("ontvangst");
    const vastCent = som("vast");
    const nietMaandelijksCent = som("nietMaandelijks");
    const dagelijksCent = som("dagelijks");
    return {
      maand: maand,
      inkomenCent: inkomenCent,
      ontvangstCent: ontvangstCent,
      vastCent: vastCent,
      nietMaandelijksCent: nietMaandelijksCent,
      dagelijksCent: dagelijksCent,
      overCent: inkomenCent + ontvangstCent - vastCent - nietMaandelijksCent - dagelijksCent,
    };
  });

  const vasteLasten: VastePost[] = [];
  maandelijks.forEach((groep) => {
    const p = posten.filter((x) => x.groep === groep && x.soort === "vast");
    if (p.length === 0) return;
    const totaal = p.reduce((a, x) => a - x.t.bedragCent, 0);
    const categorie = p[0].categorie as CategorieId;
    vasteLasten.push({
      groep: groep,
      merk: p[0].merk,
      categorie: categorie,
      perMaandCent: Math.round(totaal / maanden.length),
      label: p[0].merk || CATEGORIEEN[categorie].label,
    });
  });
  vasteLasten.sort((a, b) => b.perMaandCent - a.perMaandCent);

  const nietMaandelijks: LosseGroteUitgave[] = posten
    .filter((x) => x.soort === "nietMaandelijks")
    .map((x) => ({
      merk: x.merk,
      categorie: x.categorie as CategorieId,
      maand: maandVan(x.t.datum),
      bedragCent: -x.t.bedragCent,
      label: x.merk || CATEGORIEEN[x.categorie as CategorieId].label,
    }))
    .sort((a, b) => b.bedragCent - a.bedragCent);

  const perCategorie = new Map<CategorieId, { bak: Bak; totaalCent: number; aantal: number }>();
  posten.forEach((x) => {
    if (!x.categorie || x.soort === "intern" || x.soort === "inkomen" || x.soort === "ontvangst") return;
    const c = perCategorie.get(x.categorie) || { bak: x.soort as Bak, totaalCent: 0, aantal: 0 };
    c.totaalCent += -x.t.bedragCent;
    c.aantal++;
    perCategorie.set(x.categorie, c);
  });
  const categorieTotalen = Array.from(perCategorie.entries())
    .map(([categorie, c]) => ({ categorie: categorie, bak: c.bak, totaalCent: c.totaalCent, aantal: c.aantal }))
    .sort((a, b) => b.totaalCent - a.totaalCent);

  return {
    maanden: maanden,
    perMaand: perMaand,
    posten: posten,
    vasteLasten: vasteLasten,
    nietMaandelijks: nietMaandelijks,
    categorieTotalen: categorieTotalen,
    aantalRekeningen: eigenIbansUitBestanden(transacties).size,
  };
}
