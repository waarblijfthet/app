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
  /** Antwoorden op "wat is dit?": groep (uit vragenOverOnbekend) naar categorie. Optioneel. */
  categorieKeuzes?: Record<string, CategorieId>;
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
  /** Geld naar en van eigen rekeningen en potjes BUITEN de geüploade bestanden, per maand. */
  sparen: { maand: string; heenCent: number; terugCent: number }[];
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
  const gekozen = keuzes.categorieKeuzes || {};
  const voorlopig = tx.map((t) => {
    const indeling = deelIn(t);
    const keuze = gekozen[indeling.groep];
    return { t: t, indeling: keuze ? { categorie: keuze, merk: indeling.merk, groep: indeling.groep } : indeling };
  });
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

  const inBestanden = eigenIbansUitBestanden(transacties);
  const sparen = maanden.map((maand) => {
    const p = posten.filter((x) => x.soort === "intern" && maandVan(x.t.datum) === maand && !(x.t.tegenIban && inBestanden.has(x.t.tegenIban)));
    return {
      maand: maand,
      heenCent: p.filter((x) => x.t.bedragCent < 0).reduce((a, x) => a - x.t.bedragCent, 0),
      terugCent: p.filter((x) => x.t.bedragCent > 0).reduce((a, x) => a + x.t.bedragCent, 0),
    };
  });

  return {
    maanden: maanden,
    perMaand: perMaand,
    sparen: sparen,
    posten: posten,
    vasteLasten: vasteLasten,
    nietMaandelijks: nietMaandelijks,
    categorieTotalen: categorieTotalen,
    aantalRekeningen: eigenIbansUitBestanden(transacties).size,
  };
}

export type OnbekendePost = {
  /** Sleutel voor categorieKeuzes. Lokaal, gaat nooit mee naar de server. */
  groep: string;
  /** Naam zoals in het afschrift, alleen voor op het scherm van de bezoeker. */
  label: string;
  aantal: number;
  totaalCent: number;
  /** Pin, iDEAL of incasso: zeker een bedrijf. Een overboeking kan ook een persoon zijn. */
  isBedrijf: boolean;
};

const BEDRIJF_CODES = new Set(["bc", "ba", "id", "ei", "ic", "bea", "ide", "eic"]);

/**
 * De grootste uitgaven die niet in een categorie vallen, om aan de bezoeker te vragen.
 * Stopt bij maxVragen of zodra `dekking` (deel van het onbekende bedrag) gevraagd is.
 */
export function vragenOverOnbekend(o: Overzicht, maxVragen = 8, dekking = 0.8): OnbekendePost[] {
  const perGroep = new Map<string, OnbekendePost>();
  o.posten.forEach((p) => {
    if (p.soort === "intern" || p.soort === "inkomen" || p.soort === "ontvangst") return;
    if (p.categorie !== "overig" && p.categorie !== "overboeking") return;
    const g = perGroep.get(p.groep) || { groep: p.groep, label: p.t.tegenpartij || "Onbekend", aantal: 0, totaalCent: 0, isBedrijf: false };
    g.aantal++;
    g.totaalCent += -p.t.bedragCent;
    if (BEDRIJF_CODES.has((p.t.code || "").toLowerCase())) g.isBedrijf = true;
    perGroep.set(p.groep, g);
  });
  const lijst = Array.from(perGroep.values()).sort((a, b) => b.totaalCent - a.totaalCent);
  const totaal = lijst.reduce((s, g) => s + g.totaalCent, 0);
  const uit: OnbekendePost[] = [];
  let gedekt = 0;
  for (const g of lijst) {
    if (uit.length >= maxVragen || (totaal > 0 && gedekt / totaal >= dekking)) break;
    uit.push(g);
    gedekt += g.totaalCent;
  }
  return uit;
}

