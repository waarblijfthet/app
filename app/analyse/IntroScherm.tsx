"use client";

import type { MaandGevoel } from "@/lib/quiz-types";

/**
 * Het scherm vóór de eerste vraag van de analyse.
 *
 * Herzien op 30-okt-2026 (docs/introscherm-analyse-30-okt-2026.md, besluit van
 * Jarno). Wat er veranderde en waarom:
 * - Bijna iedereen komt hier uit een artikel en heeft daar al op "Bekijk mijn
 *   financiële situatie" getikt. Daarom staat de eerste vraag ("Hoe is het
 *   meestal aan het eind van de maand?") nu zelf op het scherm, als drie
 *   knoppen. Eén tik is meteen de start en het eerste antwoord; het scherm
 *   maand-gevoel wordt dan overgeslagen (QuizClient, startMetGevoel).
 * - "± 2 minuten" werd "± 3 minuten": wie afrondt doet er mediaan 3,4 minuten
 *   over (sinds 7-sep-2026). En "een schatting is genoeg" staat nu direct onder
 *   de knoppen, want 8 van de 17 afhakers stopten in het inkomensblok.
 * - Mobiel was 5.614 pixels lang met twee keer hetzelfde voorbeeld. Nu één
 *   voorbeeld, en de uitlegblokken alleen op desktop.
 * - Het voorbeeld toont de uitkomst zoals die sinds 12-okt-2026 echt is: op
 *   papier over, echt over, en wat niet aan te wijzen is. Geen post die als te
 *   duur wordt aangewezen. De bedragen zijn verzonnen en overal als voorbeeld
 *   gelabeld (harde waarheidsregel 1).
 *
 * De labels van de drie knoppen zijn dezelfde als op het scherm maand-gevoel
 * in schermen/index.tsx (dat bestand heeft CRLF en is hier bewust niet
 * aangeraakt). Verander je ze, verander ze dan op beide plekken.
 */

const MAX_BREEDTE = "max-w-[1180px]";

/* ── Iconen ────────────────────────────────────────────────────────────
   Eén lokale set lijniconen, dezelfde stijl als op /geldscan en /aanbod. */

type IcoonNaam =
  | "klok"
  | "tag"
  | "schild"
  | "kaartUit"
  | "euro"
  | "duo"
  | "persoon"
  | "loep"
  | "wagentje"
  | "huis"
  | "auto"
  | "document";

const ICOON_PADEN: Record<IcoonNaam, React.ReactNode> = {
  klok: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  tag: (
    <>
      <path d="M12.5 3.5H20v7.5l-9 9L3.5 12.5z" />
      <circle cx="16.2" cy="7.5" r="1.3" />
    </>
  ),
  schild: <path d="M12 3.5l7 2.6v5.4c0 4.4-2.9 7.6-7 8.8-4.1-1.2-7-4.4-7-8.8V6.1z" />,
  kaartUit: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M3.5 10.5h17" />
      <path d="M5 20l14-16" />
    </>
  ),
  euro: (
    <>
      <path d="M15.5 7a5.7 5.7 0 1 0 0 10" />
      <path d="M5.5 10.5h7.5" />
      <path d="M5.5 13.5h6.5" />
    </>
  ),
  duo: (
    <>
      <circle cx="8.5" cy="8.2" r="2.6" />
      <path d="M4 19c0-2.8 2-4.6 4.5-4.6S13 16.2 13 19" />
      <circle cx="16.7" cy="9.2" r="2.1" />
      <path d="M13.6 19c.3-2.3 1.9-3.7 4.1-3.7s3.6 1.4 4.3 3.7" />
    </>
  ),
  persoon: (
    <>
      <circle cx="12" cy="8.3" r="3.3" />
      <path d="M5.5 20c0-3.3 2.9-5.4 6.5-5.4s6.5 2.1 6.5 5.4" />
    </>
  ),
  loep: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M19.5 19.5l-3.6-3.6" />
    </>
  ),
  wagentje: (
    <>
      <path d="M3.5 4.5h2l2.3 11.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.6l1.3-6.7H7" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </>
  ),
  huis: (
    <>
      <path d="M4.5 11.5L12 4l7.5 7.5" />
      <path d="M6.5 9.8V19.5h11V9.8" />
      <path d="M10 19.5v-5.3h4v5.3" />
    </>
  ),
  auto: (
    <>
      <path d="M4 16V12l2-4.5h12L20 12v4" />
      <path d="M4 16h16" />
      <circle cx="7.5" cy="17.3" r="1.4" />
      <circle cx="16.5" cy="17.3" r="1.4" />
    </>
  ),
  document: (
    <>
      <path d="M6 3.5h7.5L18 8v12.5H6z" />
      <path d="M13.5 3.5V8H18" />
      <path d="M9 12.5h6" />
      <path d="M9 16h4" />
    </>
  ),
};

function Icoon({
  naam,
  maat = 18,
  kleur = "#0B7A6E",
}: {
  naam: IcoonNaam;
  maat?: number;
  kleur?: string;
}) {
  return (
    <svg
      width={maat}
      height={maat}
      viewBox="0 0 24 24"
      fill="none"
      stroke={kleur}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICOON_PADEN[naam]}
    </svg>
  );
}

/* ── Kleine stukjes ─────────────────────────────────────────────────── */

const GEVOEL_OPTIES: { value: MaandGevoel; label: string }[] = [
  { value: "ruim", label: "Er blijft ruim wat over" },
  { value: "net", label: "Het is net genoeg" },
  { value: "tekort", label: "Te weinig, ik vul aan uit spaargeld of sta rood" },
];

function VoorbeeldPil() {
  return (
    <span
      className="font-body rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em]"
      style={{ backgroundColor: "#F0F3F1", color: "#8B958F" }}
    >
      Voorbeeld
    </span>
  );
}

function MicroItem({ icoon, tekst }: { icoon: IcoonNaam; tekst: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-body text-xs text-text-muted">
      <Icoon naam={icoon} maat={14} kleur="#8B958F" />
      {tekst}
    </span>
  );
}

/**
 * De eerste vraag als drie knoppen. Groot genoeg voor een duim (minimaal 52
 * pixels hoog, volle breedte op mobiel).
 */
function EersteVraag({
  onKies,
  plek,
}: {
  onKies: (g: MaandGevoel, plek: "boven" | "onder") => void;
  plek: "boven" | "onder";
}) {
  return (
    <div>
      <p className="font-body text-base font-medium text-primary mb-1">
        Begin met één vraag: hoe is het meestal aan het eind van de maand?
      </p>
      <p className="font-body text-sm text-text-muted mb-3">Je eerste indruk is genoeg.</p>
      <div className="space-y-2.5 max-w-[480px]">
        {GEVOEL_OPTIES.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onKies(o.value, plek)}
            className="w-full min-h-[52px] text-left rounded-xl border-[1.5px] border-[#D9DEDC] bg-white px-4 py-3 font-body text-[15px] text-primary transition-colors hover:border-accent active:border-accent active:bg-green-light flex items-center justify-between gap-3"
          >
            <span>{o.label}</span>
            <span className="text-accent shrink-0" aria-hidden="true">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MicroRegel() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      <MicroItem icoon="klok" tekst="± 3 minuten" />
      <MicroItem icoon="document" tekst="een schatting is genoeg, je hoeft niets op te zoeken" />
      <MicroItem icoon="schild" tekst="anoniem" />
      <MicroItem icoon="kaartUit" tekst="geen bankgegevens" />
    </div>
  );
}

/** Het voorbeeldresultaat, in de opbouw van de echte uitkomst sinds 12-okt-2026. */
function ResultaatPreview() {
  return (
    <div className="card-base border border-[#E6E9E7] p-6 sm:p-7">
      <div className="flex items-center justify-between mb-4">
        <p className="section-eyebrow">Zo ziet je uitkomst eruit</p>
        <VoorbeeldPil />
      </div>
      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[#E6E9E7]">
        <div>
          <p className="font-body text-xs text-text-muted mb-1">Op papier over</p>
          <p className="font-body font-medium text-xl text-primary">&euro; 1.150</p>
          <p className="font-body text-xs text-text-muted mt-0.5">inkomen min wat je invult</p>
        </div>
        <div>
          <p className="font-body text-xs text-text-muted mb-1">Echt over</p>
          <p className="font-body font-medium text-xl text-primary">&euro; 400</p>
          <p className="font-body text-xs text-text-muted mt-0.5">wat je zelf merkt</p>
        </div>
      </div>
      <div className="pt-4 text-center">
        <p className="font-body text-xs text-text-muted mb-1">Niet aan te wijzen</p>
        <p className="font-display font-light text-[#C4603A] text-4xl leading-none mb-1">&euro; 750</p>
        <p className="font-body text-xs text-text-muted">per maand</p>
      </div>
      <p className="font-body text-sm text-text-soft mt-4 leading-relaxed">
        Daarna zie je waar je afwijkt van huishoudens die op jou lijken.
      </p>
      <p className="font-body font-light text-text-muted text-xs mt-3 leading-relaxed">
        Voorbeeldweergave van de opbouw van je uitkomst, geen echt huishouden.
      </p>
    </div>
  );
}

/* ── Sectie-inhoud ─────────────────────────────────────────────────── */

const WAT_KRIJG_JE = [
  {
    icoon: "euro" as IcoonNaam,
    titel: "Wat je niet kunt aanwijzen",
    tekst: "Wat er op papier overblijft, tegenover wat je zelf merkt.",
  },
  {
    icoon: "duo" as IcoonNaam,
    titel: "Vergelijkbare huishoudens",
    tekst: "Hoe doe je het ten opzichte van huishoudens die op jou lijken?",
  },
  {
    icoon: "loep" as IcoonNaam,
    titel: "Wat valt op?",
    tekst: "Welke onderdelen van je uitgaven wijken opvallend af?",
  },
];

const VOOR_JOU_ALS = [
  "Je verdient goed, maar houdt minder over dan je verwacht.",
  "Je denkt regelmatig: waar blijft mijn geld?",
  "Je wilt weten of je uitgaven eigenlijk normaal zijn.",
];

export default function IntroScherm({
  onStartMetGevoel,
}: {
  onStartMetGevoel: (g: MaandGevoel, plek: "boven" | "onder") => void;
}) {
  return (
    <div className={`${MAX_BREEDTE} mx-auto pt-2 md:pt-8`}>
      {/* 1. Hero met de eerste vraag. Op mobiel tekst en vraag eerst, het
          voorbeeld eronder; op desktop het voorbeeld rechts. */}
      <div className="flex flex-col gap-8 md:grid md:grid-cols-[1.15fr_1fr] md:items-start md:gap-12 mb-12 md:mb-20">
        <div>
          <p className="section-eyebrow mb-3">Gratis financiële analyse</p>
          <h1 className="font-display font-light text-primary text-[34px] sm:text-5xl md:text-[52px] leading-[1.08] mb-4">
            Hoe staat jouw huishouden er financieel voor?
          </h1>
          <p className="text-text-soft font-body font-light text-base sm:text-lg leading-relaxed mb-6 max-w-[480px]">
            Ontdek hoeveel geld er per maand verdwijnt zonder dat je weet waarheen, en waar jouw
            situatie afwijkt van vergelijkbare huishoudens.
          </p>
          <EersteVraag onKies={onStartMetGevoel} plek="boven" />
          <div className="mt-3">
            <MicroRegel />
          </div>
        </div>
        <div className="w-full md:max-w-[400px] md:ml-auto md:-mt-2">
          <ResultaatPreview />
        </div>
      </div>

      {/* 2. Wat krijg je te zien: alleen desktop. Op mobiel zegt het voorbeeld
          hierboven hetzelfde. */}
      <div className="hidden md:block mb-20">
        <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-[32px] leading-snug mb-8 text-center">
          Wat krijg je te zien?
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {WAT_KRIJG_JE.map((kaart) => (
            <div key={kaart.titel} className="card-base border border-[#E6E9E7] p-7">
              <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-accent-bg">
                <Icoon naam={kaart.icoon} maat={18} />
              </span>
              <p className="font-display font-light text-primary text-lg mb-2 leading-snug">{kaart.titel}</p>
              <p className="font-body font-light text-text-soft text-sm leading-[1.45]">{kaart.tekst}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Dit is voor jou als: kort, ook op mobiel. */}
      <div className="mb-12 md:mb-16 max-w-[720px] md:mx-auto">
        <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-snug mb-5 md:text-center">
          Dit is voor jou als...
        </h2>
        <div className="space-y-3">
          {VOOR_JOU_ALS.map((zin) => (
            <div key={zin} className="flex items-start gap-3">
              <span className="text-accent shrink-0 mt-0.5">✓</span>
              <p className="font-body text-text-soft text-base leading-relaxed">{zin}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Afsluiting: dezelfde eerste vraag, voor wie doorscrolde. */}
      <div className="rounded-2xl bg-[#F0F3F1] px-5 py-8 sm:px-10 sm:py-12">
        <div className="max-w-[480px] mx-auto">
          <EersteVraag onKies={onStartMetGevoel} plek="onder" />
          <p className="font-body text-xs text-text-muted mt-4">
            ± 3 minuten · een schatting is genoeg · gratis en anoniem · je hoeft na afloop niets te kopen
          </p>
        </div>
      </div>
    </div>
  );
}
