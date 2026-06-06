import { QuizData, parseEur, KinderenAantal } from "./quiz-types";

// ─── Benchmark lookup tables ─────────────────────────────────────────────────

const BOODSCHAPPEN_BENCH: Record<KinderenAantal, number> = {
  0: 485,
  1: 620,
  2: 755,
  3: 890,
};

const VRIJ_PCT: Array<{ min: number; pct: number }> = [
  { min: 7000, pct: 0.18 },
  { min: 5000, pct: 0.15 },
  { min: 3500, pct: 0.12 },
  { min: 0, pct: 0.08 },
];

const KIND_PCT: Record<KinderenAantal, number> = {
  0: 0,
  1: 0.15,
  2: 0.25,
  3: 0.29,
};

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
}): Benchmarks {
  const { woonsituatie, inkomen, auto, aantalVolwassenen } = profiel;
  const kinderen: KinderenAantal = profiel.kinderen ?? 0;

  const wonenPct = woonsituatie === "koop" ? 0.28 : 0.3;
  const wonen = Math.round(inkomen * wonenPct);

  const vervoerBench: Record<string, number> = {
    geen: 80,
    eigen: 350,
    "lease_privé": 450,
    zakelijk: 0,
  };
  const vervoer = auto ? vervoerBench[auto] ?? 0 : 0;

  const vrijPctEntry = VRIJ_PCT.find((e) => inkomen >= e.min)!;
  const vrij_besteedbaar = Math.round(inkomen * vrijPctEntry.pct);

  return {
    wonen,
    energie: 216,
    internet: 55,
    vervoer,
    verzekeringen: 148 * aantalVolwassenen + 120,
    boodschappen: BOODSCHAPPEN_BENCH[kinderen],
    abonnementen: 180,
    kinderen: Math.round(inkomen * KIND_PCT[kinderen]),
    vrijetijd: Math.round(inkomen * 0.05),
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
  const volwassenen = parseEur(data.salaris2) > 0 ? 2 : 1;
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
