import { QuizData, parseEur, KinderenAantal } from "./quiz-types";

export function aantalVolwassenenVan(data: QuizData): number {
  return data.volwassenen ?? (parseEur(data.salaris2) > 0 ? 2 : 1);
}

// ─── Benchmark lookup tables ─────────────────────────────────────────────────
//
// HERKOMST (30-jul-2026). Alle getallen hieronder komen uit de vijf huishoudens
// die ik zelf heb doorgerekend in juni en juli 2026, niet uit openbare
// gemiddelden. Die vijf staan compleet op /rapporten, dus wie wil kan narekenen
// waar deze cijfers vandaan komen. Bewuste keuze: Nibud-referentiebudgetten zijn
// grotendeels minimumbudgetten en meten dus iets anders dan wat een huishouden
// met een bovenmodaal inkomen werkelijk uitgeeft.
//
// Bij elk getal staat n. Bij n = 1 of 2 is het een richting, geen norm. Regel:
// een getal alleen bijstellen als de vijf allemaal dezelfde kant op wijzen, en
// bij elke nieuwe geleverde scan opnieuw toetsen.
//
// Wat deze herijking repareerde, en dat was meer dan een kalibratie:
//   1. Boodschappen stond 175 tot 260 euro te laag bij alle vijf.
//   2. Kinderkosten vergeleek appels met peren. De oude tabel nam 15 tot 29
//      procent van het inkomen, de Nibud-achtige totale kosten van een kind
//      inclusief eten en woonruimte, terwijl berekenKinderen alleen opvang,
//      school en sport optelt. Daardoor kreeg elke ouder te horen dat zijn
//      kinderen een fractie van het gemiddelde kostten. Nu een bedrag per kind
//      over dezelfde smalle definitie.
//   3. Wonen vergeleek een totaal inclusief energie, internet en lokale lasten
//      met een percentage van het inkomen. Dat liep bij de alleenstaande 532
//      euro uit de bocht, want een huur van 1.285 op 3.650 netto is 35 procent
//      en niet 30. Nu een woonlast naar huishoudgrootte plus de losse posten.
//   4. Vervoer kende geen tweede auto, waardoor het gezin met twee auto's 345
//      euro boven zijn eigen benchmark leek te zitten.

/** Boodschappen: basisbedrag per huishouden, plus een bedrag per kind. */
const BOODSCHAPPEN_BASIS_TWEE_VOLW = 700; // n=2 (690 en 720)
const BOODSCHAPPEN_BASIS_EEN_VOLW = 475; // n=1 (475)
const BOODSCHAPPEN_PER_KIND = 150; // n=2, afgeleid uit 1.150 bij drie kinderen en 790 bij twee

/** Abonnementen: streaming, mobiel en de rest samen. */
const ABONNEMENTEN = 150; // n=5 (119, 132, 155, 165, 175)

/** Vrije tijd als aandeel van het inkomen. Minst betrouwbare post. */
const VRIJETIJD_PCT = 0.1; // n=5, maar de spreiding was 7,5 tot 15 procent

/**
 * Kinderkosten per kind, over dezelfde smalle definitie als berekenKinderen:
 * eigen bijdrage opvang, school en activiteiten, sport en hobby. Dus zonder
 * eten, kleding en woonruimte.
 */
const KINDEREN_PER_KIND = 190; // n=2 (540 bij drie kinderen, 410 bij twee)

/**
 * Woonlast, dus alleen huur of hypotheek, als aandeel van het netto inkomen.
 * Eén volwassene betaalt structureel een groter deel: dezelfde woning wordt niet
 * de helft goedkoper omdat je alleen woont.
 */
const WOONLAST_PCT_EEN_VOLW = 0.33; // n=2 (29,6 en 35,2 procent)
const WOONLAST_PCT_TWEE_VOLW = 0.25; // n=3 (23,6, 24,4 en 24,6 procent)

/** Losse woonposten, opgeteld bij de woonlast omdat de gebruiker die ook optelt. */
const ENERGIE = 200; // n=5 (145, 165, 220, 230, 245)
const INTERNET = 62; // n=5 (52, 58, 64, 65, 72)
const LOKALE_LASTEN = 95; // n=5, gemeentelijke lasten en waterschap per maand

/** Vervoer per autosituatie. Kloppend bij vier van de vijf, ongewijzigd gelaten. */
const VERVOER_BENCH: Record<string, number> = {
  geen: 80,
  eigen: 350,
  "lease_privé": 450,
  zakelijk: 0,
};
const TWEEDE_AUTO = 300; // n=1, conservatief onder de 345 die ik in dat gezin zag

/** Verzekeringen. Klopte al: van min 4 tot plus 28 over vijf huishoudens. */
const ZORG_PER_VOLWASSENE = 148; // n=5
const VERZEKERING_OVERIG = 120; // n=5

/**
 * Vrij besteedbaar: wat ik bij een huishouden zou verwachten dat er overblijft.
 * DIT IS HET ENIGE NORMATIEVE GETAL en het is niet uit de vijf af te leiden, want
 * zij leverden wat er werkelijk overbleef, niet wat er zou moeten overblijven.
 * Het is mijn eigen vuistregel en zo staat het ook op de site.
 * Wel gecontroleerd: bij alle vijf wees het gat dezelfde kant op als mijn eigen
 * geschreven conclusie, en bij drie van de vijf lag de omvang binnen wat de klant
 * zelf vooraf schatte. Kanttekening: als ik bij het schrijven van die rapporten
 * naar de analyse heb gekeken, is die overeenkomst niet onafhankelijk.
 */
const VRIJ_PCT: Array<{ min: number; pct: number }> = [
  { min: 7000, pct: 0.18 },
  { min: 5000, pct: 0.15 },
  { min: 3500, pct: 0.12 },
  { min: 0, pct: 0.08 },
];

// ─── Main benchmark function ──────────────────────────────────────────────────

export interface Benchmarks {
  wonen: number;
  energie: number;
  internet: number;
  vervoer: number;
  verzekeringen: number;
  boodschappen: number;
  abonnementen: number;
  kinderen: number;
  vrijetijd: number;
  vrij_besteedbaar: number;
}

export function getBenchmarks(profiel: {
  woonsituatie: "huur" | "koop" | null;
  kinderen: KinderenAantal | null;
  inkomen: number;
  auto: QuizData["auto"];
  aantalVolwassenen: number;
  /** Optioneel: een tweede privéauto naast de gekozen autosituatie. */
  tweedeAuto?: boolean;
}): Benchmarks {
  const { inkomen, auto, aantalVolwassenen, tweedeAuto } = profiel;
  const kinderen: KinderenAantal = profiel.kinderen ?? 0;
  const alleen = aantalVolwassenen === 1;

  // Wonen: woonlast naar huishoudgrootte, plus de losse posten die de gebruiker
  // in stap 3 ook invult. Niet naar huur of koop, want dat verschil zat niet in
  // de vijf; de huishoudgrootte wel.
  const woonlast = Math.round(
    inkomen * (alleen ? WOONLAST_PCT_EEN_VOLW : WOONLAST_PCT_TWEE_VOLW)
  );
  const wonen = woonlast + ENERGIE + INTERNET + LOKALE_LASTEN;

  const vervoerBasis = auto ? VERVOER_BENCH[auto] ?? 0 : 0;
  const vervoer = vervoerBasis + (tweedeAuto ? TWEEDE_AUTO : 0);

  const vrijPctEntry = VRIJ_PCT.find((e) => inkomen >= e.min)!;
  const vrij_besteedbaar = Math.round(inkomen * vrijPctEntry.pct);

  return {
    wonen,
    energie: ENERGIE,
    internet: INTERNET,
    vervoer,
    verzekeringen: ZORG_PER_VOLWASSENE * aantalVolwassenen + VERZEKERING_OVERIG,
    boodschappen:
      (alleen ? BOODSCHAPPEN_BASIS_EEN_VOLW : BOODSCHAPPEN_BASIS_TWEE_VOLW) +
      kinderen * BOODSCHAPPEN_PER_KIND,
    abonnementen: ABONNEMENTEN,
    kinderen: kinderen * KINDEREN_PER_KIND,
    vrijetijd: Math.round(inkomen * VRIJETIJD_PCT),
    vrij_besteedbaar,
  };
}

// ─── Income calculation ───────────────────────────────────────────────────────

export function berekenTotaalInkomen(data: QuizData): number {
  const s1 = parseEur(data.salaris1);
  let e1 = s1;
  if (data.salaris1InclVakantiegeld) e1 += Math.round(s1 * 0.08 / 12);
  if (data.salaris1InclDertiende) e1 += Math.round(s1 / 12);

  const s2 = parseEur(data.salaris2);
  let e2 = s2;
  if (s2 > 0) {
    if (data.salaris2InclVakantiegeld) e2 += Math.round(s2 * 0.08 / 12);
    if (data.salaris2InclDertiende) e2 += Math.round(s2 / 12);
  }

  const aftrekRaw = parseEur(data.hypotheekRenteAftrek);
  const aftrekMaand =
    data.hypotheekRenteAftrekPer === "jaar" ? Math.round(aftrekRaw / 12) : aftrekRaw;

  return (
    e1 +
    e2 +
    parseEur(data.toeslagZorg) +
    parseEur(data.toeslagKindgebonden) +
    parseEur(data.toeslagKinderopvang) +
    parseEur(data.toeslagKinderbijslag) +
    parseEur(data.toeslagHuur) +
    parseEur(data.toeslagOverig) +
    aftrekMaand
  );
}

// ─── Expense sub-totals ───────────────────────────────────────────────────────

export function berekenWonen(data: QuizData): number {
  const gemRaw = parseEur(data.gemeenteBelastingen);
  const gemMaand =
    data.gemeenteBelastingenPer === "jaar" ? Math.round(gemRaw / 12) : gemRaw;
  return (
    parseEur(data.huurHypotheek) +
    parseEur(data.energie) +
    parseEur(data.internet) +
    parseEur(data.servicekosten) +
    gemMaand
  );
}

export function berekenVervoer(data: QuizData): number {
  switch (data.auto) {
    case "geen":
      return parseEur(data.ovAbonnement);
    case "eigen":
      return parseEur(data.brandstof) + parseEur(data.autoVerzWB);
    case "lease_privé":
      return parseEur(data.leaseBedrag);
    case "zakelijk":
      return parseEur(data.zakelijkEigenBijdrage);
    default:
      return 0;
  }
}

export function berekenVerzekeringen(data: QuizData): number {
  const zorgRaw = parseEur(data.zorgPerPersoon);
  const volwassenen = aantalVolwassenenVan(data);
  const zorgTotaal =
    data.zorgToggle === "per_persoon" ? zorgRaw * volwassenen : zorgRaw;
  return zorgTotaal + parseEur(data.verzekeringOverig);
}

export function berekenAbonnementen(data: QuizData): number {
  if (data.abonnementenExpanded) {
    return (
      parseEur(data.streamingBedrag) +
      parseEur(data.telefoonBedrag) +
      parseEur(data.abonnementenOverigBedrag)
    );
  }
  return parseEur(data.abonnementenTotaal);
}

export function berekenKinderen(data: QuizData): number {
  if (data.kinderen === 0) return 0;
  return (
    parseEur(data.kinderopvangEigenBijdrage) +
    parseEur(data.schoolActiviteiten) +
    parseEur(data.sportHobbyKinderen)
  );
}

export function berekenJaarlijks(data: QuizData): number {
  const raw = parseEur(data.jaarlijkseKosten);
  if (!raw) return 0;
  return data.jaarlijkseKostenPer === "jaar" ? Math.round(raw / 12) : raw;
}

export function berekenTotaalUitgaven(data: QuizData): number {
  return (
    berekenWonen(data) +
    berekenVervoer(data) +
    berekenVerzekeringen(data) +
    parseEur(data.boodschappen) +
    berekenAbonnementen(data) +
    berekenKinderen(data) +
    parseEur(data.vrijetijd) +
    berekenJaarlijks(data)
  );
}

export function berekenOver(data: QuizData): number {
  return berekenTotaalInkomen(data) - berekenTotaalUitgaven(data);
}

// ─── Status helpers ───────────────────────────────────────────────────────────

export type VergelijkingStatus = "goed" | "matig" | "zorgelijk";

export function getVergelijkingStatus(
  jij: number,
  benchmark: number,
  tolerance = 0.1
): VergelijkingStatus {
  if (benchmark === 0) return "goed";
  const pct = (jij - benchmark) / benchmark;
  if (pct <= tolerance) return "goed";
  if (pct <= 0.25) return "matig";
  return "zorgelijk";
}

export function getPercentiel(inkomen: number, kinderen: number | null): string {
  if ((kinderen ?? 0) === 0) {
    if (inkomen < 2500) return "onderste 25%";
    if (inkomen < 3500) return "middengroep";
    if (inkomen < 5000) return "top 35%";
    return "top 15%";
  }
  if (inkomen < 3000) return "onderste 30%";
  if (inkomen < 4500) return "middengroep";
  if (inkomen < 6500) return "top 35%";
  return "top 15%";
}

export function vindGrootsteAfwijking(
  data: QuizData,
  benches: Benchmarks
): string {
  const diffs: Array<{ naam: string; verschil: number }> = [
    {
      naam: "Boodschappen",
      verschil: parseEur(data.boodschappen) - benches.boodschappen,
    },
    {
      naam: "Abonnementen",
      verschil: berekenAbonnementen(data) - benches.abonnementen,
    },
    { naam: "Wonen", verschil: berekenWonen(data) - benches.wonen },
    {
      naam: "Verzekeringen",
      verschil: berekenVerzekeringen(data) - benches.verzekeringen,
    },
    { naam: "Vervoer", verschil: berekenVervoer(data) - benches.vervoer },
  ].filter((d) => d.verschil > 0);

  if (diffs.length === 0) return "geen";
  return diffs.sort((a, b) => b.verschil - a.verschil)[0].naam;
}

export function bepaalVerdict(
  data: QuizData,
  benches: Benchmarks
): "goed" | "matig" | "zorgelijk" {
  const diff = berekenOver(data) - benches.vrij_besteedbaar;
  if (diff > 200) return "goed";
  if (diff >= -200) return "matig";
  return "zorgelijk";
}
