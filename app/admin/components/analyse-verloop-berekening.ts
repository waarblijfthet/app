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
  sessies: Sessie[];
  analyseBezoeken: AnalyseBezoek[];
  gebeurtenissen?: Gebeurtenis[];
  emailAchtergelaten: number;
  geldscanAanvragen: number;
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
 * vraag als drie knoppen op het intro). Aangenomen op 31 okt; zet dit op de
 * echte deploydatum als die anders is.
 */
export const INTRO_NIEUW_SINDS = "2026-10-31T00:00:00Z";

/** Eerste sessie met de vraag "Hoe is het meestal aan het eind van de maand?" (12-okt-2026, 17:32 UTC). */
export const MEETVRAAG_SINDS = "2026-10-12T17:30:00Z";

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

  const geopend = herkomstPerSessie.size;
  const gestart = sessies.length;
  const begonnen = sessies.filter((s) => s.eerste_interactie || s.voltooid).length;
  const resultaat = sessies.filter((s) => s.voltooid).length;
  const aanbodBereikt = sessies.filter((s) => s.nazorg.resultaatStap >= 4).length;
  const vraagstapGezien = sessies.filter((s) => s.nazorg.resultaatStap >= 3).length;
  const vraagGesteld = sessies.filter((s) => s.nazorg.vraagVerstuurd).length;
  // Geldscan in beeld (30-okt-2026): op stap 1, de vraagstap of stap 4. Vóór
  // 30 okt bestond alleen stap 4; die telt mee als resultaatstap 4 zonder
  // verstuurde vraag (na een vraag toont stap 4 de bevestiging, niet het aanbod).
  const aanbodInBeeld = sessies.filter(
    (s) => s.nazorg.aanbodGezien.length > 0 || (s.nazorg.resultaatStap >= 4 && !s.nazorg.vraagVerstuurd)
  ).length;

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
  const geldscanKlik = sessies.filter((s) => s.nazorg.geldscanKlik).length;
  const nazorgGemeten = sessies.some((s) => s.nazorg.gemeten);

  // Welke uitkomst de afronders kregen (23-sep-2026). Zelfde drempel van €100
  // als de conclusiekop op het resultaatscherm. Belangrijk voor de
  // conversievraag: wie leest dat er meer overblijft dan verwacht, heeft weinig
  // reden om voor een verklaring te betalen.
  const uitkomsten = {
    meer: { aantal: 0, aanbod: 0, geldscan: 0, email: 0 },
    passend: { aantal: 0, aanbod: 0, geldscan: 0, email: 0 },
    minder: { aantal: 0, aanbod: 0, geldscan: 0, email: 0 },
  };
  for (const s of sessies) {
    if (!s.voltooid) continue;
    let overDiff: number;
    try {
      const data = { ...DEFAULT_QUIZ_DATA, ...(s.antwoorden as Partial<QuizData>) } as QuizData;
      overDiff = berekenResultaat(data).overDiff;
    } catch {
      continue;
    }
    const sleutel = overDiff > 100 ? "meer" : overDiff < -100 ? "minder" : "passend";
    const rij = uitkomsten[sleutel];
    rij.aantal++;
    if (s.nazorg.resultaatStap >= 4) rij.aanbod++;
    if (s.nazorg.geldscanKlik) rij.geldscan++;
    if (s.nazorg.emailAchtergelaten) rij.email++;
  }

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
    if (!s.voltooid) continue;
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
    uitkomsten: uitkomsten,
    vraagstap: vraagstap,
    nazorgGemeten: nazorgGemeten,
    trechter: [
      { label: "Analyse geopend", uitleg: "sessies met een bezoek aan /analyse", aantal: geopend },
      { label: "Op start geklikt", uitleg: "eerste vraag kwam in beeld", aantal: gestart },
      { label: "Eerste vraag beantwoord", uitleg: "minstens één antwoord gegeven", aantal: begonnen },
      { label: "Resultaat gezien", uitleg: "alle vragen doorlopen", aantal: resultaat },
      {
        label: "Vraagstap gezien",
        uitleg: nazorgGemeten ? "resultaatstap 3 van 4" : "gemeten vanaf 28 sep",
        aantal: vraagstapGezien,
      },
      {
        label: "Vraag gesteld",
        uitleg: nazorgGemeten ? "met e-mailadres, antwoord binnen 2 werkdagen" : "gemeten vanaf 28 sep",
        aantal: vraagGesteld,
      },
      {
        label: "Stap 4 bereikt",
        uitleg: nazorgGemeten ? "aanbod, of bevestiging na een vraag" : "gemeten vanaf 28 sep",
        aantal: aanbodBereikt,
      },
      {
        label: "Geldscan in beeld",
        uitleg: nazorgGemeten ? "stap 1, vraagstap of stap 4 (stap 1 en vraagstap vanaf 30 okt)" : "gemeten vanaf 28 sep",
        aantal: aanbodInBeeld,
      },
      {
        label: "Op Geldscan geklikt",
        uitleg: nazorgGemeten ? "Geldscan-knop, waar ook op de site" : "gemeten vanaf 28 sep",
        aantal: geldscanKlik,
      },
      { label: "E-mailadres achtergelaten", uitleg: "resultaat laten mailen", aantal: data.emailAchtergelaten },
      { label: "Geldscan aangevraagd", uitleg: "aanvraagformulier verstuurd", aantal: data.geldscanAanvragen },
    ],
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
