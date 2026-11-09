/**
 * Het overzicht: alle boekingen ingedeeld in vier bakken per maand. Draait in de browser.
 * Volledig detail voor de schermen; wat naar de server gaat maakt samenvatting.ts hieruit.
 */
import type { Transactie } from "../bankbestand";
import { CATEGORIEEN, schoonBedrijfsnaam, type Bak, type CategorieId } from "./categorieen";
import { deelIn } from "./indelen";
import { eigenIbansUitBestanden, inkomenSleutel } from "./kandidaten";

export type Keuzes = {
  /** Tegenrekeningen die de bezoeker als eigen rekening (of van de partner) aanwees. */
  eigenIbans: string[];
  /** Sleutels uit inkomenKandidaten die de bezoeker als inkomen aanvinkte. */
  inkomenSleutels: string[];
  /** Antwoorden op "wat is dit?": groep (uit vragenOverOnbekend) naar categorie. Optioneel. */
  categorieKeuzes?: Record<string, CategorieId>;
  /** Antwoorden op "wat was dit?" bij grote losse bedragen: transactie-sleutel naar aard. Lokaal, optioneel. */
  afwijkingen?: Record<string, Aard>;
};

/**
 * Wat een groot los bedrag was. Een extra aflossing (een schuld in één keer aflossen) is geen uitgave
 * maar een verschuiving van vermogen, net als sparen: hij telt niet mee in "over" en staat apart.
 * Eenmalig en jaarlijks blijven uitgaven die niet elke maand komen, maar het advies en het plan
 * moeten het verschil weten: een eenmalige aankoop komt niet terug, een jaarlijkse wel.
 */
export type Aard = "aflossing" | "eenmalig" | "jaarlijks";

/** Vanaf dit bedrag (per boeking) vraagt de wizard wat het was. */
export const AFWIJKING_CENT = 100000;

/** Een groot los bedrag in deze categorieën is bijna altijd een extra aflossing (lening, studieschuld, hypotheek). */
const AFLOSSING_CATEGORIEEN = new Set<string>(["leningen", "wonen"]);

export type Soort = "intern" | "inkomen" | "ontvangst" | "aflossing" | Bak;

/** Waar de categorie vandaan komt: merkenlijst, regel (trefwoord of code), keuze (bezoeker of AI), of nog onbekend. */
export type Bron = "merk" | "regel" | "keuze" | "onbekend";

export type Post = {
  t: Transactie;
  soort: Soort;
  categorie: CategorieId | null;
  merk: string | null;
  groep: string;
  bron: Bron;
  /** Alleen bij grote losse bedragen: wat het was (gekozen of voorgesteld), anders null. */
  aard: Aard | null;
};

export type MaandTotaal = {
  maand: string;
  inkomenCent: number;
  ontvangstCent: number;
  vastCent: number;
  nietMaandelijksCent: number;
  dagelijksCent: number;
  /** Extra aflossingen: geen uitgave, telt niet mee in over. */
  aflossingCent: number;
  overCent: number;
};

export type VastePost = { groep: string; merk: string | null; categorie: CategorieId; perMaandCent: number; label: string };
export type LosseGroteUitgave = { merk: string | null; categorie: CategorieId; maand: string; bedragCent: number; label: string; aard: Aard | null };

export type Overzicht = {
  maanden: string[];
  perMaand: MaandTotaal[];
  posten: Post[];
  vasteLasten: VastePost[];
  nietMaandelijks: LosseGroteUitgave[];
  /** losseGroteCent: het deel uit losse bedragen vanaf AFWIJKING_CENT die niet jaarlijks terugkomen. */
  categorieTotalen: { categorie: CategorieId; bak: Bak; totaalCent: number; aantal: number; losseGroteCent: number }[];
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
    const onbekend = indeling.categorie === "overig" || indeling.categorie === "overboeking";
    const bron: Bron = keuze ? "keuze" : indeling.merk ? "merk" : onbekend ? "onbekend" : "regel";
    return { t: t, bron: bron, indeling: keuze ? { categorie: keuze, merk: indeling.merk, groep: indeling.groep } : indeling };
  });
  const uitgavenPerGroep = new Map<string, { categorie: CategorieId; maanden: Set<string>; perBoeking: string[]; bedragen: number[] }>();
  voorlopig.forEach(({ t, indeling }) => {
    if (t.bedragCent >= 0 || (t.tegenIban && eigen.has(t.tegenIban))) return;
    const g = uitgavenPerGroep.get(indeling.groep) || { categorie: indeling.categorie, maanden: new Set<string>(), perBoeking: [], bedragen: [] };
    g.maanden.add(maandVan(t.datum));
    g.perBoeking.push(maandVan(t.datum));
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
  // Komt er bij een partij naast het vaste bedrag soms iets kleins bij (eigen risico naast de premie, een
  // naheffing naast de termijn), dan telt alleen het terugkerende bedrag als vaste last.
  // Soms lopen er twee termijnen bij één partij (gemeentebelasting en waterschap via één loket): tot drie banden.
  const vasteBand = new Map<string, { min: number; max: number }[]>();
  uitgavenPerGroep.forEach((g, groep) => {
    // Alleen voor vaste soorten kosten (en nog onbekende): één grote boodschap per maand is geen vaste last.
    const soortKost = CATEGORIEEN[g.categorie].bak !== "dagelijks" || g.categorie === "overig" || g.categorie === "overboeking";
    if (maanden.length < 2 || maandelijks.has(groep) || !soortKost) return;
    let over = g.bedragen.map((b, i) => ({ b: b, m: g.perBoeking[i] }));
    const banden: { min: number; max: number }[] = [];
    while (banden.length < 3 && over.length > 0) {
      let beste = { min: 0, max: 0, maanden: 0, aantal: 0 };
      for (const kandidaat of over) {
        const a = kandidaat.b;
        const marge = Math.max(500, Math.round(a * 0.15));
        const ms = new Set<string>();
        let aantal = 0;
        over.forEach((x) => {
          if (x.b >= a - marge && x.b <= a + marge) {
            ms.add(x.m);
            aantal++;
          }
        });
        if (ms.size > beste.maanden || (ms.size === beste.maanden && aantal < beste.aantal)) beste = { min: a - marge, max: a + marge, maanden: ms.size, aantal: aantal };
      }
      if (beste.maanden < nodigVoorMaandelijks || beste.aantal / beste.maanden > 1.5) break;
      banden.push({ min: beste.min, max: beste.max });
      over = over.filter((x) => x.b < beste.min || x.b > beste.max);
    }
    if (banden.length) vasteBand.set(groep, banden);
  });
  const isVast = (groep: string, cent: number) => {
    if (maandelijks.has(groep)) return true;
    return (vasteBand.get(groep) || []).some((b) => cent >= b.min && cent <= b.max);
  };

  const posten: Post[] = voorlopig.map(({ t, indeling, bron }) => {
    if (t.tegenIban && eigen.has(t.tegenIban)) {
      return { t: t, soort: "intern", categorie: null, merk: indeling.merk, groep: indeling.groep, bron: bron, aard: null };
    }
    if (t.bedragCent > 0) {
      const isInkomen = inkomen.has(inkomenSleutel(t));
      return { t: t, soort: isInkomen ? "inkomen" : "ontvangst", categorie: null, merk: indeling.merk, groep: indeling.groep, bron: bron, aard: null };
    }
    let soort: Soort;
    if (isVast(indeling.groep, -t.bedragCent)) soort = "vast";
    else if (CATEGORIEEN[indeling.categorie].bak === "nietMaandelijks") soort = "nietMaandelijks";
    else if (-t.bedragCent >= GROTE_UITGAVE_CENT && indeling.categorie !== "boodschappen" && indeling.categorie !== "contant") soort = "nietMaandelijks";
    else soort = "dagelijks";
    let aard: Aard | null = null;
    if (soort !== "vast" && -t.bedragCent >= AFWIJKING_CENT) {
      aard = (keuzes.afwijkingen && keuzes.afwijkingen[t.sleutel]) || (AFLOSSING_CATEGORIEEN.has(indeling.categorie) ? "aflossing" : null);
      if (aard === "aflossing") soort = "aflossing";
      else if (aard) soort = "nietMaandelijks";
    }
    return { t: t, soort: soort, categorie: indeling.categorie, merk: indeling.merk, groep: indeling.groep, bron: bron, aard: aard };
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
      aflossingCent: som("aflossing"),
      overCent: inkomenCent + ontvangstCent - vastCent - nietMaandelijksCent - dagelijksCent,
    };
  });

  const vasteLasten: VastePost[] = [];
  new Set([...Array.from(maandelijks), ...Array.from(vasteBand.keys())]).forEach((groep) => {
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
      aard: x.aard,
    }))
    .sort((a, b) => b.bedragCent - a.bedragCent);

  const perCategorie = new Map<CategorieId, { bak: Bak; totaalCent: number; aantal: number; losseGroteCent: number }>();
  posten.forEach((x) => {
    if (!x.categorie || x.soort === "intern" || x.soort === "inkomen" || x.soort === "ontvangst" || x.soort === "aflossing") return;
    const c = perCategorie.get(x.categorie) || { bak: x.soort as Bak, totaalCent: 0, aantal: 0, losseGroteCent: 0 };
    c.totaalCent += -x.t.bedragCent;
    if (isLosGroot(x)) c.losseGroteCent += -x.t.bedragCent;
    c.aantal++;
    perCategorie.set(x.categorie, c);
  });
  const categorieTotalen = Array.from(perCategorie.entries())
    .map(([categorie, c]) => ({ categorie: categorie, bak: c.bak, totaalCent: c.totaalCent, aantal: c.aantal, losseGroteCent: c.losseGroteCent }))
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

/**
 * Een groot los bedrag dat niet jaarlijks terugkomt (eenmalig, of nog niet beantwoord). Zulke bedragen
 * vertekenen het beeld van een gewone maand: het gemiddelde per categorie en "over in een gewone maand"
 * laten ze weg. Ze blijven wel zichtbaar als kosten die niet elke maand komen.
 */
export function isLosGroot(p: Post): boolean {
  return p.soort === "nietMaandelijks" && p.t.bedragCent <= -AFWIJKING_CENT && p.aard !== "jaarlijks";
}

export type GroteAfwijking = {
  /** Sleutel voor keuzes.afwijkingen. Lokaal, gaat nooit mee naar de server. */
  sleutel: string;
  /** Naam zoals in het afschrift, alleen voor op het scherm van de bezoeker. */
  label: string;
  categorie: CategorieId | null;
  maand: string;
  bedragCent: number;
  /** Wat er nu mee gebeurt (gekozen of automatisch), en wat de wizard voorstelt. */
  aard: Aard | null;
  voorstel: Aard;
};

const JAARLIJKS_VOORSTEL = new Set<string>(["belastingen", "verzekeringen", "zorgverzekering", "autovast", "vakantie", "energie"]);

/** Grote losse bedragen, de grootste eerst, om te vragen wat het was. */
export function groteAfwijkingen(o: Overzicht, max = 6): GroteAfwijking[] {
  return o.posten
    .filter((p) => p.t.bedragCent <= -AFWIJKING_CENT && (p.soort === "nietMaandelijks" || p.soort === "dagelijks" || p.soort === "aflossing"))
    .sort((a, b) => a.t.bedragCent - b.t.bedragCent)
    .slice(0, max)
    .map((p) => ({
      sleutel: p.t.sleutel,
      label: p.t.tegenpartij || (p.categorie ? CATEGORIEEN[p.categorie].label : "Onbekend"),
      categorie: p.categorie,
      maand: maandVan(p.t.datum),
      bedragCent: -p.t.bedragCent,
      aard: p.aard,
      voorstel: p.categorie && AFLOSSING_CATEGORIEEN.has(p.categorie) ? "aflossing" : p.categorie && JAARLIJKS_VOORSTEL.has(p.categorie) ? "jaarlijks" : "eenmalig",
    }));
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
    if (p.soort === "intern" || p.soort === "inkomen" || p.soort === "ontvangst" || p.soort === "aflossing") return;
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

/**
 * Namen van onbekende tegenpartijen die zeker een bedrijf zijn (pin, iDEAL, incasso), opgeschoond,
 * om door de AI te laten indelen. Overboekingen gaan nooit mee: dat kunnen personen zijn.
 */
export function onbekendeBedrijfsnamen(o: Overzicht, max = 150): { groep: string; naam: string; gemiddeldCent: number }[] {
  const perGroep = new Map<string, { naam: string; totaal: number; aantal: number; bedrijf: boolean }>();
  o.posten.forEach((p) => {
    if (p.soort === "intern" || p.soort === "inkomen" || p.soort === "ontvangst" || p.soort === "aflossing" || p.bron !== "onbekend") return;
    const g = perGroep.get(p.groep) || { naam: p.t.tegenpartij, totaal: 0, aantal: 0, bedrijf: true };
    g.totaal += -p.t.bedragCent;
    g.aantal++;
    if (!BEDRIJF_CODES.has((p.t.code || "").toLowerCase())) g.bedrijf = false;
    perGroep.set(p.groep, g);
  });
  const uit: { groep: string; naam: string; gemiddeldCent: number }[] = [];
  Array.from(perGroep.entries())
    .filter(([, g]) => g.bedrijf)
    .sort((a, b) => b[1].totaal - a[1].totaal)
    .forEach(([groep, g]) => {
      const naam = schoonBedrijfsnaam(g.naam);
      if (naam && uit.length < max) uit.push({ groep: groep, naam: naam, gemiddeldCent: Math.round(g.totaal / g.aantal) });
    });
  return uit;
}

export type Tegenpartij = { groep: string; label: string; categorie: CategorieId; bron: Bron; aantal: number; totaalCent: number };

/** Alle tegenpartijen van uitgaven met hun categorie, voor het optionele scherm "alles nalopen". Lokaal. */
export function alleTegenpartijen(o: Overzicht): Tegenpartij[] {
  const perGroep = new Map<string, Tegenpartij>();
  o.posten.forEach((p) => {
    if (!p.categorie || p.soort === "intern" || p.soort === "inkomen" || p.soort === "ontvangst") return;
    const g = perGroep.get(p.groep) || { groep: p.groep, label: p.merk || p.t.tegenpartij || "Onbekend", categorie: p.categorie, bron: p.bron, aantal: 0, totaalCent: 0 };
    g.aantal++;
    g.totaalCent += -p.t.bedragCent;
    perGroep.set(p.groep, g);
  });
  return Array.from(perGroep.values()).sort((a, b) => b.totaalCent - a.totaalCent);
}

