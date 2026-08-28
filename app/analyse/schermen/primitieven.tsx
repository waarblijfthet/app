"use client";

import { useEffect, useRef, useState } from "react";
import { fmtEur, parseEur } from "@/lib/quiz-types";
import {
  bepaalRichting,
  RICHTING_LABEL,
  RICHTING_PIL,
} from "../components/vergelijking-labels";
import EuroInput from "../components/EuroInput";

/**
 * De klikbare bouwstenen van de nieuwe analyse (28-aug-2026, pass 5). Eén
 * vraag, grote tikbare opties, tikken in plaats van typen. Dit bestand is
 * bewust dom: het toont wat het krijgt en roept callbacks aan. De timing van
 * automatisch doorgaan en het onthouden van eerdere antwoorden gebeurt in de
 * schermen zelf en in QuizClient.
 */

export function VraagKop({
  vraag,
  subtekst,
}: {
  vraag: string;
  subtekst?: string;
}) {
  return (
    <div className="mb-7">
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-snug">
        {vraag}
      </h2>
      {subtekst && (
        <p className="text-text-soft font-body font-light text-base mt-2">
          {subtekst}
        </p>
      )}
    </div>
  );
}

interface PillProps {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  volledigeBreedte?: boolean;
}

/** Grote tikbare pil. Geen kleine radiobuttons: dit moet met een duim kunnen. */
export function Pill({
  selected,
  disabled,
  onClick,
  children,
  volledigeBreedte,
}: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={`min-h-[56px] px-5 py-3.5 rounded-2xl border-[1.5px] font-body font-medium text-base text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
        volledigeBreedte ? "w-full" : ""
      } ${
        selected
          ? "bg-green-light border-accent text-primary shadow-card"
          : "bg-card border-[#D9DEDC] text-text-soft hover:border-accent/60"
      } ${disabled && !selected ? "opacity-40" : ""} disabled:cursor-default`}
    >
      <span className="flex items-center justify-between gap-3">
        {children}
        {selected && <span className="text-accent shrink-0">✓</span>}
      </span>
    </button>
  );
}

export function PillGrid({
  children,
  kolommen = 2,
}: {
  children: React.ReactNode;
  kolommen?: 1 | 2;
}) {
  return (
    <div className={`grid gap-3 ${kolommen === 2 ? "sm:grid-cols-2" : ""}`}>
      {children}
    </div>
  );
}

/** Onderscheiden van de snelkeuzes: geen actief antwoord, maar een uitzondering. */
export function TekstKnop({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-1 text-sm font-body font-medium text-accent hover:text-primary transition-colors"
    >
      {children}
    </button>
  );
}

export function Verder({
  onClick,
  disabled,
  children = "Verder →",
}: {
  onClick: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn-primary mt-4 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}

/**
 * Zelf een bedrag invullen: de uitzondering, niet de standaard (spec-eis).
 * Verschijnt pas na een bewuste klik, focust direct, en bevestigt met Enter of
 * een knop in plaats van automatisch door te gaan terwijl iemand nog typt.
 */
export function ZelfInvullen({
  waarde,
  onChange,
  onBevestig,
  plausibelTot,
}: {
  waarde: string;
  onChange: (v: string) => void;
  onBevestig: () => void;
  plausibelTot?: number;
}) {
  return (
    <div className="mt-3">
      <EuroInput
        value={waarde}
        onChange={onChange}
        plausibelTot={plausibelTot}
        autoFocus
        onEnter={onBevestig}
        className=""
      />
      <Verder onClick={onBevestig} disabled={parseEur(waarde) <= 0}>
        Verder →
      </Verder>
    </div>
  );
}

/**
 * De directe beloning na een antwoord (spec sectie 14): kort, geen oordeel,
 * geen enorme kaart. Verschijnt onder de gekozen pil en verdwijnt met het
 * scherm zelf.
 */
export function Insight({
  jij,
  benchmark,
  extraZin,
}: {
  jij: number;
  benchmark?: number;
  extraZin?: string | null;
}) {
  if (!benchmark && !extraZin) return null;
  const richting = benchmark ? bepaalRichting(jij, benchmark) : null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5">
      {richting && (
        <span
          className={`inline-flex items-center text-xs font-body font-medium px-2.5 py-1 rounded-full ${RICHTING_PIL[richting]}`}
        >
          {RICHTING_LABEL[richting]}
        </span>
      )}
      {typeof benchmark === "number" && (
        <span className="font-body text-xs text-text-muted">
          Vergelijkbare huishoudens: ongeveer {fmtEur(benchmark)}
        </span>
      )}
      {extraZin && (
        <p className="font-body text-xs text-text-soft basis-full leading-relaxed">
          {extraZin}
        </p>
      )}
    </div>
  );
}

/**
 * Timing voor automatisch doorgaan (spec sectie 21). Kort genoeg om niet
 * traag te voelen, lang genoeg om de keuze en de eventuele insight te lezen.
 * Ruimt zichzelf op bij ontkoppelen, zodat een snelle "vorige" geen doorgaan
 * in de vorige stap veroorzaakt.
 */
export function useAutoAdvance() {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  return function plan(fn: () => void, ms: number) {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(fn, ms);
  };
}
