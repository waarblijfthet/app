"use client";

import { useState } from "react";
import { QuizData, parseEur } from "@/lib/quiz-types";
import {
  Pill,
  PillGrid,
  VraagKop,
  Insight,
  ZelfInvullen,
} from "./primitieven";
import type { BedragKeuze } from "./bedragen";

export interface SchermCtx {
  data: QuizData;
  patch: (p: Partial<QuizData>) => void;
  kiesEnGa: (p: Partial<QuizData>, ms?: number) => void;
  ga: () => void;
}

export type Scherm = React.FC<SchermCtx>;

const KORT = 450;
const MET_INSIGHT = 950;

// ─── Enkele keuze, altijd automatisch door ────────────────────────────────────

interface KeuzeOptie {
  value: string;
  label: string;
  patch: Partial<QuizData>;
}

export function maakKeuzeScherm(cfg: {
  vraag: (d: QuizData) => string;
  subtekst?: (d: QuizData) => string | undefined;
  opties: (d: QuizData) => KeuzeOptie[];
  huidige: (d: QuizData) => string | null;
  vertragingMs?: number;
}): Scherm {
  return function KeuzeSchermInstance({ data, kiesEnGa }) {
    const [gekozen, setGekozen] = useState<string | null>(cfg.huidige(data));
    const [overgang, setOvergang] = useState(false);
    const opties = cfg.opties(data);

    function kies(opt: KeuzeOptie) {
      setGekozen(opt.value);
      setOvergang(true);
      kiesEnGa(opt.patch, cfg.vertragingMs ?? KORT);
    }

    return (
      <div>
        <VraagKop vraag={cfg.vraag(data)} subtekst={cfg.subtekst?.(data)} />
        <PillGrid>
          {opties.map((opt) => (
            <Pill
              key={opt.value}
              selected={gekozen === opt.value}
              disabled={overgang}
              onClick={() => kies(opt)}
            >
              {opt.label}
            </Pill>
          ))}
        </PillGrid>
      </div>
    );
  };
}

// ─── Bedrag met snelkeuzes, altijd gevraagd (geen ja/nee-poort) ──────────────

export function maakBedragScherm(cfg: {
  vraag: (d: QuizData) => string;
  subtekst?: (d: QuizData) => string | undefined;
  veld: keyof QuizData;
  opties: (d: QuizData) => BedragKeuze[];
  benchmark?: (d: QuizData) => number | undefined;
  zachterBijHoger?: string;
  insightExtra?: (d: QuizData, ingevuld: number) => string | null;
  plausibelTot?: number;
  customLabel?: string;
}): Scherm {
  return function BedragSchermInstance({ data, patch, kiesEnGa, ga }) {
    const huidige = parseEur(data[cfg.veld] as string);
    const [gekozen, setGekozen] = useState<number | null>(
      huidige > 0 ? huidige : null
    );
    // Los van `gekozen`, dat ook de historische waarde draagt bij een bezoek
    // via "Vorige". Alleen een verse klik in DEZE weergave mag de andere pillen
    // even blokkeren, niet een antwoord van eerder (28-aug-2026, pass 5, bugfix:
    // anders is een al beantwoord bedragscherm na teruggaan niet meer te
    // wijzigen, want een disabled-knop vuurt geen click-event af).
    const [overgang, setOvergang] = useState(false);
    const [zelfInvullen, setZelfInvullen] = useState(false);
    const [customWaarde, setCustomWaarde] = useState(
      huidige > 0 ? String(huidige) : ""
    );
    const opties = cfg.opties(data);
    const benchmark = cfg.benchmark?.(data);

    function schrijfEnPlanVervolg(waarde: number, directGa: boolean) {
      const heeftInsight = !!benchmark || !!cfg.insightExtra?.(data, waarde);
      const ms = heeftInsight ? MET_INSIGHT : KORT;
      if (directGa) {
        patch({ [cfg.veld]: String(waarde) } as Partial<QuizData>);
        setTimeout(ga, ms);
      } else {
        kiesEnGa({ [cfg.veld]: String(waarde) } as Partial<QuizData>, ms);
      }
    }

    function kies(opt: BedragKeuze) {
      setGekozen(opt.value);
      setOvergang(true);
      schrijfEnPlanVervolg(opt.value, false);
    }

    function bevestigCustom() {
      const n = parseEur(customWaarde);
      if (n <= 0) return;
      setGekozen(n);
      setOvergang(true);
      schrijfEnPlanVervolg(n, true);
    }

    const insightWaarde = gekozen ?? 0;
    const zachtereZin =
      cfg.zachterBijHoger && benchmark && insightWaarde - benchmark > 100
        ? cfg.zachterBijHoger
        : null;
    // De nieuwe waarde staat nog niet in `data` (dat gebeurt async via patch),
    // dus insightExtra krijgt een kopie waarin het veld al is bijgewerkt. Zonder
    // dit zou bijvoorbeeld het inkomenpercentiel nog op het oude bedrag rekenen.
    const dataMetGekozen = { ...data, [cfg.veld]: String(insightWaarde) } as QuizData;
    const extraZin = cfg.insightExtra?.(dataMetGekozen, insightWaarde) ?? null;

    return (
      <div>
        <VraagKop vraag={cfg.vraag(data)} subtekst={cfg.subtekst?.(data)} />
        <PillGrid>
          {opties.map((opt) => (
            <Pill
              key={opt.value}
              selected={gekozen === opt.value && !zelfInvullen}
              disabled={overgang || zelfInvullen}
              onClick={() => kies(opt)}
            >
              {opt.label}
            </Pill>
          ))}
        </PillGrid>
        <div className="mt-3">
          <Pill
            selected={zelfInvullen}
            disabled={overgang}
            onClick={() => setZelfInvullen(true)}
            volledigeBreedte
          >
            {cfg.customLabel ?? "Ander bedrag invullen"}
          </Pill>
          {zelfInvullen && (
            <ZelfInvullen
              waarde={customWaarde}
              onChange={setCustomWaarde}
              onBevestig={bevestigCustom}
              plausibelTot={cfg.plausibelTot}
            />
          )}
        </div>
        {gekozen !== null && !zelfInvullen && (
          <Insight
            jij={gekozen}
            benchmark={benchmark}
            extraZin={zachtereZin ?? extraZin}
          />
        )}
      </div>
    );
  };
}

// ─── Ja/nee, en pas bij "ja" een bedrag ──────────────────────────────────────

export function maakJaNeeBedragScherm(cfg: {
  vraag: (d: QuizData) => string;
  subtekst?: (d: QuizData) => string | undefined;
  neeLabel?: string;
  jaLabel?: string;
  neePatch: Partial<QuizData>;
  vervolgVraag: (d: QuizData) => string;
  veld: keyof QuizData;
  opties: (d: QuizData) => BedragKeuze[];
  benchmark?: (d: QuizData) => number | undefined;
  actiefBijStart: (d: QuizData) => boolean;
}): Scherm {
  const BedragVervolg = maakBedragScherm({
    vraag: cfg.vervolgVraag,
    veld: cfg.veld,
    opties: cfg.opties,
    benchmark: cfg.benchmark,
  });

  return function JaNeeSchermInstance(ctx) {
    const { data, kiesEnGa } = ctx;
    const [gekozen, setGekozen] = useState<"nee" | "ja" | null>(
      cfg.actiefBijStart(data) ? "ja" : null
    );

    if (gekozen === "ja") {
      return <BedragVervolg {...ctx} />;
    }

    return (
      <div>
        <VraagKop vraag={cfg.vraag(data)} subtekst={cfg.subtekst?.(data)} />
        <PillGrid kolommen={1}>
          <Pill
            selected={false}
            onClick={() => {
              setGekozen("nee");
              kiesEnGa(cfg.neePatch, KORT);
            }}
          >
            {cfg.neeLabel ?? "Nee"}
          </Pill>
          <Pill selected={false} onClick={() => setGekozen("ja")}>
            {cfg.jaLabel ?? "Ja, ongeveer"}
          </Pill>
        </PillGrid>
      </div>
    );
  };
}

// ─── Bekende buckets plus een eigen bedrag als uitzondering ──────────────────

export function maakBucketScherm(cfg: {
  vraag: (d: QuizData) => string;
  subtekst?: (d: QuizData) => string | undefined;
  veld: keyof QuizData;
  buckets: (d: QuizData) => { label: string; value: number }[];
  customLabel?: string;
  benchmark?: (d: QuizData) => number | undefined;
}): Scherm {
  return function BucketSchermInstance({ data, patch, kiesEnGa, ga }) {
    const huidige = parseEur(data[cfg.veld] as string);
    const buckets = cfg.buckets(data);
    // Een lege waarde en een bucket ter waarde van 0 ("Nee, nauwelijks") zijn
    // hetzelfde getal, dus alleen een positief bedrag geldt als "al
    // beantwoord". Anders staat er bij een verse bezoeker al een vinkje
    // voordat hij heeft geklikt (28-aug-2026, pass 5).
    const inBucket = huidige > 0 && buckets.some((b) => b.value === huidige);
    const [gekozen, setGekozen] = useState<number | null>(
      huidige > 0 ? huidige : null
    );
    // Zie de toelichting bij maakBedragScherm: alleen een verse klik mag de
    // andere pillen blokkeren, niet een antwoord van eerder.
    const [overgang, setOvergang] = useState(false);
    const [zelfInvullen, setZelfInvullen] = useState(huidige > 0 && !inBucket);
    const [customWaarde, setCustomWaarde] = useState(
      huidige > 0 && !inBucket ? String(huidige) : ""
    );
    const benchmark = cfg.benchmark?.(data);

    function kiesBucket(value: number) {
      setGekozen(value);
      setOvergang(true);
      const ms = benchmark ? MET_INSIGHT : KORT;
      kiesEnGa({ [cfg.veld]: String(value) } as Partial<QuizData>, ms);
    }

    function bevestigCustom() {
      const n = parseEur(customWaarde);
      setGekozen(n);
      setOvergang(true);
      patch({ [cfg.veld]: String(n) } as Partial<QuizData>);
      setTimeout(ga, benchmark ? MET_INSIGHT : KORT);
    }

    return (
      <div>
        <VraagKop vraag={cfg.vraag(data)} subtekst={cfg.subtekst?.(data)} />
        <PillGrid>
          {buckets.map((b) => (
            <Pill
              key={b.label}
              selected={gekozen === b.value && !zelfInvullen}
              disabled={overgang || zelfInvullen}
              onClick={() => kiesBucket(b.value)}
            >
              {b.label}
            </Pill>
          ))}
        </PillGrid>
        <div className="mt-3">
          <Pill
            selected={zelfInvullen}
            disabled={overgang}
            onClick={() => setZelfInvullen(true)}
            volledigeBreedte
          >
            {cfg.customLabel ?? "Ander bedrag invullen"}
          </Pill>
          {zelfInvullen && (
            <ZelfInvullen
              waarde={customWaarde}
              onChange={setCustomWaarde}
              onBevestig={bevestigCustom}
            />
          )}
        </div>
        {gekozen !== null && !zelfInvullen && (
          <Insight jij={gekozen} benchmark={benchmark} />
        )}
      </div>
    );
  };
}
