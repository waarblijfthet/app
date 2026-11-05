import { DEFAULT_QUIZ_DATA, type QuizData } from "@/lib/quiz-types";
import { ALLE_SCHERMEN, actieveSchermen } from "@/app/analyse/schermen";
import { berekenResultaat } from "@/app/analyse/stappen/resultaat/berekenResultaat";

/**
 * Rekenlaag van /admin/analyse-verloop (23-sep-2026), los van de weergave
 * zodat hij met echte rijen te testen is.
 *
 * Hoe "gezien" werkt: de analyse schrijft een regel weg zodra een scherm in
 * beeld komt (app/analyse/QuizClient.tsx), met de hoogste positie in de
 * schermenlijst van die bezoeker. Welke schermen die bezoeker kreeg, hangt af
 * van zijn antwoorden (geen partner, geen auto, enzovoort). Die lijst wordt
 * hier opnieuw uitgerekend met actieveSchermen(), dezelfde functie als de
 * analyse zelf. Afgehaakt op scherm X betekent: X was het verste scherm dat
 * in beeld kwam, en het is niet beantwoord.
 */

export type Periode = "vandaag" | "week" | "maand" | "alles";

export type Sessie = {
  id: string;
  sessie_id: string;
  created_at: string;
  updated_at: string;
  huidig_scherm: string | null;
  max_scherm_index: number;
  voltooid: boolean;
  eerste_interactie: boolean;
  apparaat: string | null;
  toestemming_data_asset: boolean;
  antwoorden: Record<string, unknown>;
};

type AnalyseBezoek = { sessie_id: string; referrer: string | null; created_at: string; apparaat?: string | null };

export type Gebeurtenis = {
  sessie_id: string;
  gebeurtenis: string;
  pakket: string | null;
  meta: Record<string, unknown> | null;
  created_at: string;
};

export type ApiData = {
  sinds?: string;
  sessies: Sessie[];
  analyseBezoeken: AnalyseBezoek[];
  gebeurtenissen?: Gebeurtenis[];
  emailAchtergelaten: number;
  geldscanAanvragen: number;
  /** 5-nov-2026: tijdstippen, zodat per week te tellen is. */
  emailMomenten?: string[];
  aanvraagMomenten?: string[];
  /** 5-nov-2026: per Geldscan-aanvraag het spoor (eigen overzicht, vragenlijst, onbekend). */
  aanvraagSporen?: { created_at: string; spoor: string }[];
  /** Eerste pagina per sessie (12-okt-2026). */
  landingPerSessie?: Record<string, string>;
};

export type Status = "resultaat" | "afgehaakt" | "afgebroken" | "niet-begonnen" | "oude-meting";

export type Verrijkt = Sessie & {
  status: Status;
  schermen: { id: string; categorie: number; gezien: boolean }[];
  verstIndex: number;
  verstId: string | null;
  totaal: number;
  eigenTest: boolean;
  herkomst: string;
  nazorg: Nazorg;
};

/**
 * Wat er na het resultaat gebeurde. Gemeten vanaf 23-sep-2026; voor oudere
 * analyses is `gemeten` false en zijn alle velden onbekend, niet nee.
 */
export type Nazorg = {
  gemeten: boolean;
  resultaatStap: number;
  geldscanKlik: boolean;
  bewarenGeopend: boolean;
  emailAchtergelaten: boolean;
  aanvraagGestart: boolean;
  aanvraagVerstuurd: boolean;
  /** Vraagstap (23-sep-2026): laatst gekozen vraag (sleutel), en wat ermee gebeurde. */
  vraagGekozen: string | null;
  vraagVerstuurd: boolean;
  vraagOvergeslagen: boolean;
  /** 30-okt-2026: plekken waar de Geldscan in beeld kwam (stap1, vraagstap, stap4). */
  aanbodGezien: string[];
  /** Antwoord op "Wat zou je nu het meest helpen?" (sleutel). */
  behoefte: string | null;
  /** Antwoord op "Wat houdt je tegen?" (sleutel). */
  bezwaar: string | null;
};

const LEGE_NAZORG: Nazorg = {
  gemeten: false,
  resultaatStap: 0,
  geldscanKlik: false,
  bewarenGeopend: false,
  emailAchtergelaten: false,
  aanvraagGestart: false,
  aanvraagVerstuurd: false,
  vraagGekozen: null,
  vraagVerstuurd: false,
  vraagOvergeslagen: false,
  aanbodGezien: [],
  behoefte: null,
  bezwaar: null,
};

function nazorgPerSessie(gebeurtenissen: Gebeurtenis[]): Map<string, Nazorg> {
  const map = new Map<string, Nazorg>();
  for (const g of gebeurtenissen) {
    if (!g.sessie_id) continue;
    const n = map.get(g.sessie_id) ?? { ...LEGE_NAZORG, aanbodGezien: [] };
    n.gemeten = true;
    if (g.gebeurtenis === "analyse_resultaat_stap") {
      const stap = Number(g.meta?.stap);
      if (Number.isFinite(stap)) n.resultaatStap = Math.max(n.resultaatStap, stap);
    }
    if (g.gebeurtenis === "cta_geldscan") n.geldscanKlik = true;
    if (g.gebeurtenis === "analyse_bewaren_geopend") n.bewarenGeopend = true;
    if (g.gebeurtenis === "analyse_bewaren_verstuurd") n.emailAchtergelaten = true;
    if (g.gebeurtenis === "intake_gestart") n.aanvraagGestart = true;
    if (g.gebeurtenis === "intake_verzonden") n.aanvraagVerstuurd = true;
    if (g.gebeurtenis === "analyse_vraag_gekozen" && typeof g.meta?.keuze === "string") {
      n.vraagGekozen = g.meta.keuze as string;
    }
    if (g.gebeurtenis === "analyse_vraag_verstuurd") {
      n.vraagVerstuurd = true;
      if (typeof g.meta?.keuze === "string") n.vraagGekozen = g.meta.keuze as string;
    }
    if (g.gebeurtenis === "analyse_vraag_overgeslagen") n.vraagOvergeslagen = true;
    if (g.gebeurtenis === "analyse_aanbod_gezien" && typeof g.meta?.plek === "string") {
      const plek = g.meta.plek as string;
      if (!n.aanbodGezien.includes(plek)) n.aanbodGezien = [...n.aanbodGezien, plek];
    }
    if (g.gebeurtenis === "analyse_behoefte" && typeof g.meta?.keuze === "string") n.behoefte = g.meta.keuze as string;
    if (g.gebeurtenis === "analyse_aanbod_bezwaar" && typeof g.meta?.keuze === "string") n.bezwaar = g.meta.keuze as string;
    map.set(g.sessie_id, n);
  }
  return map;
}

export const SCHERM_LABEL: Record<string, string> = {
  huishouden: "Huishouden",
  "kinderen-aantal": "Aantal kinderen",
  woonsituatie: "Huur of koop",
  "inkomen-ik": "Eigen netto inkomen",
  "inkomen-partner": "Inkomen partner",
  vakantiegeld: "Vakantiegeld",
  "extra-inkomen": "Extra inkomen en toeslagen",
  hypotheekaftrek: "Hypotheekrenteaftrek",
  "recap-inkomen": "Tussenstand inkomen",
  "wonen-bedrag": "Huur of hypotheek",
  energie: "Energie",
  internet: "Internet en tv",
  "extra-woonkosten": "Overige woonkosten",
  "recap-wonen": "Tussenstand wonen",
  "vervoer-type": "Soort vervoer",
  "tweede-auto": "Tweede auto",
  "auto-bedrag": "Autokosten",
  ov: "OV-abonnement",
  lease: "Leasebedrag",
  "zakelijk-privé": "Eigen bijdrage zakelijke auto",
  zorgverzekering: "Zorgverzekering",
  "overige-verzekeringen": "Overige verzekeringen",
  "recap-vervoer": "Tussenstand vervoer en vaste lasten",
  boodschappen: "Boodschappen",
  abonnementen: "Abonnementen",
  kinderkosten: "Kinderkosten",
  "vrije-uitgaven": "Vrije uitgaven",
  "jaarlijkse-kosten": "Jaarlijkse kosten",
  sparen: "Sparen (tot 12 okt)",
  "maand-gevoel": "Hoe voelt het eind van de maand",
  "werkelijk-over": "Echt over per maand",
  resultaat: "Resultaat",
};

export function schermLabel(id: string | null): string {
  if (!id) return "onbekend";
  if (SCHERM_LABEL[id]) return SCHERM_LABEL[id];
  const schoon = id.replace(/-/g, " ");
  return schoon.charAt(0).toUpperCase() + schoon.slice(1);
}

export const STATUS_LABEL: Record<Status, string> = {
  resultaat: "Resultaat gezien",
  afgehaakt: "Afgehaakt",
  afgebroken: "Afgebroken met knop",
  "niet-begonnen": "Start geklikt, niets ingevuld",
  "oude-meting": "Vóór 6 sep, niet per scherm",
};

export const STATUS_VARIANT: Record<Status, "goed" | "waarschuwing" | "fout" | "neutraal"> = {
  resultaat: "goed",
  afgehaakt: "waarschuwing",
  afgebroken: "fout",
  "niet-begonnen": "neutraal",
  "oude-meting": "neutraal",
};

export function herkomstLabel(referrer: string | null): string {
  if (!referrer) return "Direct of onbekend";
  try {
    const url = new URL(referrer);
    if (url.hostname.includes("waarblijfthet.nl")) return url.pathname || "/";
    return url.hostname.replace(/^www\./, "");
  } catch {
    return "Overig";
  }
}

export function formatMoment(iso: string): string {
  return new Date(iso).toLocaleString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDuur(start: string, eind: string): string {
  const s = Math.max(0, Math.round((new Date(eind).getTime() - new Date(start).getTime()) / 1000));
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ${s % 60} s`;
  return `${Math.floor(m / 60)} u ${m % 60} min`;
}

export function pct(deel: number, geheel: number): string {
  if (geheel <= 0) return "";
  return `${Math.round((deel / geheel) * 100)}%`;
}

/** Antwoorden die afwijken van de beginwaarde, in leesbare vorm. */
export function ingevuldeAntwoorden(antwoorden: Record<string, unknown>): [string, string][] {
  const standaard = DEFAULT_QUIZ_DATA as unknown as Record<string, unknown>;
  const uit: [string, string][] = [];
  for (const [sleutel, waarde] of Object.entries(antwoorden)) {
    if (sleutel.startsWith("_")) continue;
    if (waarde === null || waarde === undefined || waarde === "") continue;
    if (standaard[sleutel] === waarde) continue;
    let tekst: string;
    if (typeof waarde === "boolean") tekst = waarde ? "ja" : "nee";
    else if (typeof waarde === "string" && /^\d+([.,]\d+)?$/.test(waarde)) tekst = `€ ${waarde}`;
    else tekst = String(waarde);
    uit.push([sleutel, tekst]);
  }
  return uit;
}

export function verrijk(
  s: Sessie,
  herkomstPerSessie: Map<string, string>,
  nazorgMap: Map<string, Nazorg> = new Map()
): Verrijkt {
  const data = { ...DEFAULT_QUIZ_DATA, ...(s.antwoorden as Partial<QuizData>) } as QuizData;
  let actief: { id: string; categorie: number }[] = [];
  try {
    actief = actieveSchermen(data);
  } catch {
    actief = ALLE_SCHERMEN;
  }
  const totaal = actief.length;
  // Het verste scherm staat sinds 23-sep-2026 als id in de antwoorden
  // (_verstScherm). Voor oudere rijen is huidig_scherm het beste wat er is: het
  // scherm dat in beeld stond toen de laatste regel werd weggeschreven.
  // max_scherm_index is hier bewust niet leidend: die positie is berekend op
  // de schermenlijst van dát moment, en die verschuift zodra latere antwoorden
  // schermen toevoegen of weghalen (een test met echte rijen gaf er een scherm
  // naast). Alleen als het id niet in de lijst staat, valt hij terug op die
  // positie.
  const verstScherm =
    typeof s.antwoorden._verstScherm === "string" ? (s.antwoorden._verstScherm as string) : s.huidig_scherm;
  const positie = verstScherm ? actief.findIndex((sch) => sch.id === verstScherm) : -1;
  const verstIndex = s.voltooid
    ? totaal - 1
    : positie >= 0
      ? positie
      : Math.min(Math.max(s.max_scherm_index, 0), totaal - 1);
  const events = Array.isArray(s.antwoorden._events) ? (s.antwoorden._events as string[]) : [];

  let status: Status;
  if (s.voltooid) status = "resultaat";
  else if (!s.huidig_scherm) status = "oude-meting";
  else if (events.includes("analysis_afgebroken")) status = "afgebroken";
  else if (!s.eerste_interactie) status = "niet-begonnen";
  else status = "afgehaakt";

  return {
    ...s,
    status: status,
    schermen: actief.map((sch, i) => ({ id: sch.id, categorie: sch.categorie, gezien: i <= verstIndex })),
    verstIndex: verstIndex,
    verstId: s.voltooid ? "resultaat" : actief[verstIndex]?.id ?? verstScherm,
    totaal: totaal,
    eigenTest: s.antwoorden._eigenaar === true,
    herkomst: herkomstPerSessie.get(s.sessie_id) ?? "Geen paginabezoek gevonden",
    nazorg: nazorgMap.get(s.sessie_id) ?? LEGE_NAZORG,
  };
}

/**
 * Vanaf wanneer het nieuwe introscherm live staat (30-okt-2026: de eerste
 * vraag als drie knoppen op het intro). Vastgesteld op 5 nov uit de _events
 * in productie: live tussen 12:53 en 15:45 NL op 30 okt.
 */
export const INTRO_NIEUW_SINDS = "2026-10-30T14:00:00Z"; // eerste sessie met de vraag op het intro: 30 okt 15:45 NL, laatste met het oude intro 12:53 NL

/** Eerste sessie met de vraag "Hoe is het meestal aan het eind van de maand?" (12-okt-2026, 17:32 UTC). */
export const MEETVRAAG_SINDS = "2026-10-12T17:30:00Z";

/** Vanaf wanneer de Geldscan ook op stap 1 en de vraagstap staat, plus de behoeftevraag (zelfde deploy als het intro). */
export const AANBOD_SINDS = INTRO_NIEUW_SINDS;

/**
 * De uitkomst die de bezoeker op resultaatstap 1 zag (sinds 12-okt-2026):
 * gat, tekort, klopt of meer; "oud" voor analyses zonder de vraag wat er echt
 * overblijft. Zelfde functie als het resultaatscherm, dus geen eigen drempels.
 */
export type Uitkomst = "gat" | "tekort" | "klopt" | "meer" | "oud";

export function uitkomstVan(s: Sessie): Uitkomst {
  try {
    const data = { ...DEFAULT_QUIZ_DATA, ...(s.antwoorden as Partial<QuizData>) } as QuizData;
    return berekenResultaat(data).soortUitkomst;
  } catch {
    return "oud";
  }
}

export const UITKOMST_LABEL: Record<Uitkomst, string> = {
  gat: "Gat: meer op papier dan echt",
  tekort: "Tekort op papier",
  klopt: "Klopt",
  meer: "Echt meer dan op papier",
  oud: "Zonder de vraag wat er echt overblijft",
};

export const GEVOEL_LABEL: Record<string, string> = {
  ruim: "Ruim",
  net: "Net genoeg",
  tekort: "Te weinig",
  leeg: "Niet beantwoord",
};

/** Afronders per antwoord op de eerste vraag en per uitkomst. */
export function uitkomstPerGevoel(sessies: Sessie[]) {
  const gevoelens = ["ruim", "net", "tekort", "leeg"];
  const uitkomsten: Uitkomst[] = ["gat", "tekort", "klopt", "meer", "oud"];
  const tabel: Record<string, Record<Uitkomst, number>> = {};
  for (const g of gevoelens) tabel[g] = { gat: 0, tekort: 0, klopt: 0, meer: 0, oud: 0 };
  for (const s of sessies) {
    if (!s.voltooid) continue;
    const g = typeof s.antwoorden.maandGevoel === "string" && tabel[s.antwoorden.maandGevoel as string]
      ? (s.antwoorden.maandGevoel as string)
      : "leeg";
    tabel[g][uitkomstVan(s)]++;
  }
  return gevoelens
    .map((g) => ({
      gevoel: g,
      perUitkomst: tabel[g],
      totaal: uitkomsten.reduce((som, u) => som + tabel[g][u], 0),
    }))
    .filter((r) => r.totaal > 0);
}

/**
 * Kerncijfers (5-nov-2026): acht getallen, elk een deel van het vorige, over
 * één venster [van, tot). Gebruikt voor "deze week tegenover vorige week" en
 * voor de gekozen periode, zodat elk getal op de pagina dezelfde definitie
 * heeft. Alles telt unieke sessies; een sessie hoort bij het venster waarin
 * ze begon (eerste bezoek aan /analyse, of de start van de analyse).
 */
export type Kerncijfers = {
  opAnalyse: number;
  gestart: number;
  afgerond: number;
  krap: number;
  gat: number;
  aanbodGezien: number;
  geklikt: number;
  aangevraagd: number;
  emailAchtergelaten: number;
  geklikSite: number;
  behoefte: Record<string, number>;
  bezwaar: Record<string, number>;
  /** De splitsvraag: unieke sessies die hem zagen, en wie nee of ja koos. */
  splitsingGezien: number;
  splitsingNee: number;
  splitsingJa: number;
  /** Ja per plek, bijvoorbeeld artikel-slot of rapport-slot. */
  splitsingJaPerPlek: Record<string, number>;
  aangevraagdOverzicht: number;
};

export const KERNCIJFER_UITLEG: { sleutel: keyof Kerncijfers; label: string; uitleg: string; noemer?: keyof Kerncijfers }[] = [
  { sleutel: "opAnalyse", label: "Op de analyse", uitleg: "unieke bezoekers van /analyse, zonder jouw eigen bezoeken" },
  { sleutel: "gestart", label: "Gestart", uitleg: "minstens één vraag beantwoord (ook de tik op het intro)", noemer: "opAnalyse" },
  { sleutel: "afgerond", label: "Afgerond", uitleg: "alle vragen door, resultaat gezien", noemer: "gestart" },
  { sleutel: "krap", label: "Zitten krap", uitleg: "van de afronders: net genoeg of te weinig op de eerste vraag", noemer: "afgerond" },
  { sleutel: "gat", label: "Uitkomst gat", uitleg: "van de afronders: op papier minstens €200 meer over dan echt", noemer: "afgerond" },
  { sleutel: "aanbodGezien", label: "Geldscan in beeld", uitleg: "van de afronders: de Geldscan kwam op stap 1, de vraagstap of stap 4 in beeld", noemer: "afgerond" },
  { sleutel: "geklikt", label: "Op Geldscan geklikt", uitleg: "van de afronders: klik naar het aanvraagformulier", noemer: "aanbodGezien" },
  { sleutel: "aangevraagd", label: "Aangevraagd", uitleg: "aanvraagformulier Geldscan verstuurd, van waar ook op de site" },
];

export function berekenKerncijfers(data: ApiData, eigenTonen: boolean, van: string, tot: string): Kerncijfers {
  const binnen = (t: string) => t >= van && t < tot;
  const sessies = data.sessies.filter(
    (s) => binnen(s.created_at) && (eigenTonen || s.antwoorden._eigenaar !== true)
  );
  const nazorg = nazorgPerSessie(data.gebeurtenissen ?? []);

  const eersteBezoek = new Map<string, string>();
  for (const b of data.analyseBezoeken) {
    if (!b.sessie_id) continue;
    const eerder = eersteBezoek.get(b.sessie_id);
    if (!eerder || b.created_at < eerder) eersteBezoek.set(b.sessie_id, b.created_at);
  }
  let opAnalyse = 0;
  eersteBezoek.forEach((t) => {
    if (binnen(t)) opAnalyse++;
  });

  const gestart = sessies.filter((s) => s.eerste_interactie || s.voltooid);
  const afgerond = sessies.filter((s) => s.voltooid);
  const krap = afgerond.filter((s) => s.antwoorden.maandGevoel === "net" || s.antwoorden.maandGevoel === "tekort");
  const gat = afgerond.filter((s) => uitkomstVan(s) === "gat");
  const nz = (s: Sessie) => nazorg.get(s.sessie_id) ?? LEGE_NAZORG;
  const aanbod = afgerond.filter(
    (s) => nz(s).aanbodGezien.length > 0 || (nz(s).resultaatStap >= 4 && !nz(s).vraagVerstuurd)
  );
  const geklikt = afgerond.filter((s) => nz(s).geldscanKlik);

  const klikSite = new Set(
    (data.gebeurtenissen ?? [])
      .filter((g) => g.gebeurtenis === "cta_geldscan" && binnen(g.created_at))
      .map((g) => g.sessie_id)
  );

  // De splitsvraag telt los van de analysesessies: hij staat vooral onder
  // artikelen en rapporten, dus ook bij bezoekers die nooit aan de analyse begonnen.
  const gebInVenster = (data.gebeurtenissen ?? []).filter((g) => binnen(g.created_at));
  const uniek = (lijst: Gebeurtenis[]) => new Set(lijst.map((g) => g.sessie_id)).size;
  const splitsKeuzes = gebInVenster.filter((g) => g.gebeurtenis === "cta_splitsing");
  const splitsingJaPerPlek: Record<string, number> = {};
  for (const g of splitsKeuzes) {
    if (g.meta?.keuze !== "ja") continue;
    const plek = typeof g.meta?.plek === "string" ? (g.meta.plek as string) : "onbekend";
    splitsingJaPerPlek[plek] = (splitsingJaPerPlek[plek] ?? 0) + 1;
  }

  const behoefte: Record<string, number> = {};
  const bezwaar: Record<string, number> = {};
  for (const s of afgerond) {
    const n = nz(s);
    if (n.behoefte) behoefte[n.behoefte] = (behoefte[n.behoefte] ?? 0) + 1;
    if (n.bezwaar) bezwaar[n.bezwaar] = (bezwaar[n.bezwaar] ?? 0) + 1;
  }

  return {
    opAnalyse: opAnalyse,
    gestart: gestart.length,
    afgerond: afgerond.length,
    krap: krap.length,
    gat: gat.length,
    aanbodGezien: aanbod.length,
    geklikt: geklikt.length,
    aangevraagd: (data.aanvraagMomenten ?? []).filter(binnen).length,
    emailAchtergelaten: (data.emailMomenten ?? []).filter(binnen).length,
    geklikSite: klikSite.size,
    behoefte: behoefte,
    bezwaar: bezwaar,
    splitsingGezien: uniek(gebInVenster.filter((g) => g.gebeurtenis === "splitsing_gezien")),
    splitsingNee: uniek(splitsKeuzes.filter((g) => g.meta?.keuze === "nee")),
    splitsingJa: uniek(splitsKeuzes.filter((g) => g.meta?.keuze === "ja")),
    splitsingJaPerPlek: splitsingJaPerPlek,
    aangevraagdOverzicht: (data.aanvraagSporen ?? []).filter((a) => binnen(a.created_at) && a.spoor === "overzicht")
      .length,
  };
}

export function berekenVerloop(data: ApiData, eigenTonen: boolean) {

  // Herkomst: de verwijzer van het eerste /analyse-bezoek in die sessie.
  const herkomstPerSessie = new Map<string, string>();
  const oplopend = [...data.analyseBezoeken].sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
  for (const b of oplopend) {
    if (!b.sessie_id || herkomstPerSessie.has(b.sessie_id)) continue;
    herkomstPerSessie.set(b.sessie_id, herkomstLabel(b.referrer));
  }

  const nazorgMap = nazorgPerSessie(data.gebeurtenissen ?? []);
  const alle = data.sessies.map((s) => verrijk(s, herkomstPerSessie, nazorgMap));
  const aantalEigen = alle.filter((s) => s.eigenTest).length;
  const sessies = eigenTonen ? alle : alle.filter((s) => !s.eigenTest);
  const perScherm = sessies.filter((s) => s.status !== "oude-meting");

  // De trechter staat sinds 5-nov-2026 in berekenKerncijfers.
  const vraagstapGezien = sessies.filter((s) => s.nazorg.resultaatStap >= 3).length;
  const vraagGesteld = sessies.filter((s) => s.nazorg.vraagVerstuurd).length;

  // Vraagstap per soort vraag: hoe vaak gekozen en hoe vaak daarna verstuurd.
  const perVraag = new Map<string, { gekozen: number; verstuurd: number }>();
  for (const s of sessies) {
    const k = s.nazorg.vraagGekozen;
    if (!k) continue;
    const rij = perVraag.get(k) ?? { gekozen: 0, verstuurd: 0 };
    rij.gekozen++;
    if (s.nazorg.vraagVerstuurd) rij.verstuurd++;
    perVraag.set(k, rij);
  }
  const vraagstap = {
    gezien: vraagstapGezien,
    gekozen: sessies.filter((s) => s.nazorg.vraagGekozen !== null).length,
    verstuurd: vraagGesteld,
    overgeslagen: sessies.filter((s) => s.nazorg.vraagOvergeslagen && !s.nazorg.vraagVerstuurd).length,
    perVraag: Array.from(perVraag.entries())
      .map(([sleutel, r]) => ({ sleutel: sleutel, ...r }))
      .sort((a, b) => b.gekozen - a.gekozen),
  };
  const nazorgGemeten = sessies.some((s) => s.nazorg.gemeten);

  const statusTelling: Record<Status, number> = {
    resultaat: 0,
    afgehaakt: 0,
    afgebroken: 0,
    "niet-begonnen": 0,
    "oude-meting": 0,
  };
  for (const s of sessies) statusTelling[s.status]++;

  // Afhaken per scherm, in de vaste volgorde van de analyse.
  const tabel = ALLE_SCHERMEN.map((sch) => {
    let gezien = 0;
    let afgehaakt = 0;
    for (const s of perScherm) {
      if (s.schermen.some((x) => x.id === sch.id && x.gezien)) gezien++;
      if (!s.voltooid && s.verstId === sch.id) afgehaakt++;
    }
    return { id: sch.id, categorie: sch.categorie, gezien: gezien, afgehaakt: afgehaakt };
  });
  const maxAfhaak = Math.max(0, ...tabel.map((r) => r.afgehaakt));

  // Herkomst: geopend, gestart en resultaat per bron.
  const perSessie = new Map(sessies.map((s) => [s.sessie_id, s]));
  const herkomstMap = new Map<string, { geopend: number; gestart: number; resultaat: number }>();
  herkomstPerSessie.forEach((bron, sessieId) => {
    const rij = herkomstMap.get(bron) ?? { geopend: 0, gestart: 0, resultaat: 0 };
    rij.geopend++;
    const s = perSessie.get(sessieId);
    if (s) {
      rij.gestart++;
      if (s.voltooid) rij.resultaat++;
    }
    herkomstMap.set(bron, rij);
  });
  // ICP-meting per landingspagina (12-okt-2026): hoeveel starters zeggen dat
  // het aan het eind van de maand net genoeg of te weinig is. Alleen sessies
  // die de vraag beantwoordden tellen in het aandeel.
  const landing = data.landingPerSessie ?? {};
  // Sinds 30-okt-2026 alleen sessies vanaf de invoering van de meetvraag
  // (MEETVRAAG_SINDS), anders telt "Gestart" over een langere periode dan de
  // antwoorden ernaast. Plus afgerond, totaal en voor wie krap zit.
  const icpMap = new Map<
    string,
    { gestart: number; ruim: number; net: number; tekort: number; afgerond: number; krapAfgerond: number }
  >();
  for (const s of sessies) {
    if (s.created_at < MEETVRAAG_SINDS) continue;
    const pagina = landing[s.sessie_id] ?? "onbekend";
    const rij = icpMap.get(pagina) ?? { gestart: 0, ruim: 0, net: 0, tekort: 0, afgerond: 0, krapAfgerond: 0 };
    rij.gestart++;
    const gevoel = s.antwoorden.maandGevoel;
    if (gevoel === "ruim") rij.ruim++;
    else if (gevoel === "net") rij.net++;
    else if (gevoel === "tekort") rij.tekort++;
    if (s.voltooid) {
      rij.afgerond++;
      if (gevoel === "net" || gevoel === "tekort") rij.krapAfgerond++;
    }
    icpMap.set(pagina, rij);
  }
  const icpPerLanding = Array.from(icpMap.entries())
    .map(([pagina, r]) => ({
      pagina: pagina,
      gestart: r.gestart,
      ruim: r.ruim,
      net: r.net,
      tekort: r.tekort,
      beantwoord: r.ruim + r.net + r.tekort,
      krap: r.net + r.tekort,
      afgerond: r.afgerond,
      krapAfgerond: r.krapAfgerond,
    }))
    .sort((a, b) => b.gestart - a.gestart)
    .slice(0, 20);

  // Wat willen ze, en zien ze het aanbod (30-okt-2026)? Per groep op de eerste
  // vraag, met "krap in de band" apart: stel vanaf 5.000 netto samen,
  // alleenstaand vanaf 3.500 (de band van Sandra en Niels, CLAUDE.md sectie 4).
  // Inkomen is salaris 1 plus salaris 2 zoals ingevuld, zonder toeslagen.
  // Alleen afgeronde analyses.
  const inzichtGroepen = ["ruim", "krap", "krap-band", "onbekend"] as const;
  type InzichtGroep = (typeof inzichtGroepen)[number];
  const leegInzicht = () => ({
    afgerond: 0,
    aanbodGezien: 0,
    geldscanKlik: 0,
    behoefteBeantwoord: 0,
    behoefte: {} as Record<string, number>,
    bezwaarBeantwoord: 0,
    bezwaar: {} as Record<string, number>,
  });
  const inzicht: Record<InzichtGroep, ReturnType<typeof leegInzicht>> = {
    ruim: leegInzicht(),
    krap: leegInzicht(),
    "krap-band": leegInzicht(),
    onbekend: leegInzicht(),
  };
  const inzichtPlekken: Record<string, { gezien: number }> = {};
  for (const s of sessies) {
    // Alleen vanaf 30 okt (AANBOD_SINDS): daarvoor bestonden aanbod op stap 1
    // en de behoeftevraag niet, en telde "Afgerond" over een andere periode
    // dan de kolommen ernaast.
    if (!s.voltooid || s.created_at < AANBOD_SINDS) continue;
    const gevoel = s.antwoorden.maandGevoel;
    const groepen: InzichtGroep[] = [];
    if (gevoel === "ruim") groepen.push("ruim");
    else if (gevoel === "net" || gevoel === "tekort") {
      groepen.push("krap");
      const inkomen = Number(s.antwoorden.salaris1 || 0) + Number(s.antwoorden.salaris2 || 0);
      const twee = Number(s.antwoorden.volwassenen) === 2;
      if ((twee && inkomen >= 5000) || (!twee && inkomen >= 3500)) groepen.push("krap-band");
    } else groepen.push("onbekend");
    for (const gr of groepen) {
      const rij = inzicht[gr];
      rij.afgerond++;
      if (s.nazorg.aanbodGezien.length > 0) rij.aanbodGezien++;
      if (s.nazorg.geldscanKlik) rij.geldscanKlik++;
      if (s.nazorg.behoefte) {
        rij.behoefteBeantwoord++;
        rij.behoefte[s.nazorg.behoefte] = (rij.behoefte[s.nazorg.behoefte] ?? 0) + 1;
      }
      if (s.nazorg.bezwaar) {
        rij.bezwaarBeantwoord++;
        rij.bezwaar[s.nazorg.bezwaar] = (rij.bezwaar[s.nazorg.bezwaar] ?? 0) + 1;
      }
    }
    for (const plek of s.nazorg.aanbodGezien) {
      inzichtPlekken[plek] = { gezien: (inzichtPlekken[plek]?.gezien ?? 0) + 1 };
    }
  }
  const inzichtGemeten = sessies.some(
    (s) => s.nazorg.aanbodGezien.length > 0 || s.nazorg.behoefte !== null || s.nazorg.bezwaar !== null
  );

  // Start op het introscherm per apparaat, vóór en na het nieuwe intro
  // (30-okt-2026). Noemer: unieke sessies met een bezoek aan /analyse, met het
  // apparaat van het eerste bezoek. Eigen tests tellen niet mee in de starts
  // (die vallen al weg in `sessies`); in de bezoeken zitten ze ook niet, want
  // de paginateller slaat de eigenaarscookie over.
  const eersteBezoek = new Map<string, AnalyseBezoek>();
  for (const b of oplopend) {
    if (b.sessie_id && !eersteBezoek.has(b.sessie_id)) eersteBezoek.set(b.sessie_id, b);
  }
  const introRijen = new Map<string, { sessies: number; gestart: number; viaIntro: number; afgerond: number }>();
  eersteBezoek.forEach((b, sessieId) => {
    const apparaat = b.apparaat === "mobiel" ? "Mobiel" : b.apparaat === "desktop" ? "Desktop" : "Onbekend";
    const periodeLabel = b.created_at >= INTRO_NIEUW_SINDS ? "nieuw intro" : "oud intro";
    const sleutel = `${apparaat}, ${periodeLabel}`;
    const rij = introRijen.get(sleutel) ?? { sessies: 0, gestart: 0, viaIntro: 0, afgerond: 0 };
    rij.sessies++;
    const s = perSessie.get(sessieId);
    if (s && !s.eigenTest) {
      rij.gestart++;
      const events = Array.isArray(s.antwoorden._events) ? (s.antwoorden._events as string[]) : [];
      if (events.some((e) => e.startsWith("analysis_intro_vraag"))) rij.viaIntro++;
      if (s.voltooid) rij.afgerond++;
    }
    introRijen.set(sleutel, rij);
  });
  const introPerApparaat = Array.from(introRijen.entries())
    .map(([groep, r]) => ({ groep: groep, ...r }))
    .sort((a, b) => (a.groep < b.groep ? -1 : 1));

  const herkomst = Array.from(herkomstMap.entries())
    .map(([bron, r]) => ({ bron: bron, ...r }))
    .sort((a, b) => b.geopend - a.geopend)
    .slice(0, 12);

  return {
    sessies: sessies,
    aantalEigen: aantalEigen,
    oudeMeting: sessies.length - perScherm.length,
    statusTelling: statusTelling,
    uitkomstPerGevoel: uitkomstPerGevoel(sessies),
    vraagstap: vraagstap,
    nazorgGemeten: nazorgGemeten,
    tabel: tabel,
    maxAfhaak: maxAfhaak,
    herkomst: herkomst,
    icpPerLanding: icpPerLanding,
    introPerApparaat: introPerApparaat,
    inzicht: inzichtGroepen.map((g) => ({ groep: g, ...inzicht[g] })),
    inzichtPlekken: inzichtPlekken,
    inzichtGemeten: inzichtGemeten,
    toestemming: sessies.filter((s) => s.toestemming_data_asset).length,
  };
}

export type Verloop = ReturnType<typeof berekenVerloop>;
