"use client";

/**
 * Bouwstenen voor de schermen van de uitgavenscan (9-nov-2026), naar het ontwerp op het canvas
 * "Uitgavenscan schermen": één vraag per scherm, smalle kolom, grote knoppen, rustige kleuren.
 */
import type { ReactNode } from "react";

export function euro(cent: number): string {
  const e = Math.round(cent / 100);
  return (e < 0 ? "min € " : "€ ") + Math.abs(e).toLocaleString("nl-NL");
}

export function euroHeel(euros: number): string {
  return (euros < 0 ? "min € " : "€ ") + Math.abs(Math.round(euros)).toLocaleString("nl-NL");
}

const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
export function maandNaam(maand: string): string {
  const m = Number(maand.slice(5, 7));
  return MAANDEN[m - 1] ?? maand;
}

export function Kop({ stap, titel, voortgang, onVorige, onStoppen }: { stap: number; titel: string; voortgang: number; onVorige?: () => void; onStoppen?: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <p className="m-0 text-[13px] md:text-sm font-semibold text-accent">
          Stap {stap} van 5 <span className="font-normal text-text-soft">· {titel}</span>
        </p>
        <div className="flex items-center gap-4">
          {onStoppen && (
            <button type="button" onClick={onStoppen} className="hidden md:inline text-sm text-text-soft underline-offset-2 hover:underline">
              Stoppen
            </button>
          )}
          {onVorige && (
            <button type="button" onClick={onVorige} className="inline-flex items-center min-h-[40px] px-4 rounded-full border border-[#C7CFCB] bg-white text-sm font-medium text-primary">
              ← Vorige
            </button>
          )}
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-[#E6E9E7]" aria-hidden="true">
        <div className="h-1.5 rounded-full bg-accent transition-all" style={{ width: Math.max(4, Math.min(100, voortgang)) + "%" }} />
      </div>
    </div>
  );
}

export function Titel({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div>
      <h2 className="font-display font-light text-[28px] md:text-[34px] leading-tight text-primary m-0">{children}</h2>
      {sub && <p className="mt-2.5 mb-0 text-base md:text-[17px] leading-relaxed text-text-soft">{sub}</p>}
    </div>
  );
}

export function Knop({ children, onClick, uit, breed, type }: { children: ReactNode; onClick?: () => void; uit?: boolean; breed?: boolean; type?: "button" | "submit" }) {
  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      disabled={uit}
      className={`inline-flex items-center justify-center gap-2 min-h-[54px] px-7 rounded-full bg-accent text-white font-semibold text-base transition-opacity disabled:opacity-40 ${breed ? "w-full" : ""}`}
    >
      {children}
    </button>
  );
}

export function TekstKnop({ children, onClick, zacht }: { children: ReactNode; onClick: () => void; zacht?: boolean }) {
  return (
    <button type="button" onClick={onClick} className={`text-[15px] font-medium underline-offset-2 hover:underline ${zacht ? "text-text-soft" : "text-accent"}`}>
      {children}
    </button>
  );
}

export function Kaart({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white rounded-[20px] shadow-card ${className ?? ""}`}>{children}</div>;
}

export function Keuze({ children, onClick, aan }: { children: ReactNode; onClick: () => void; aan?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center w-full text-left min-h-[54px] px-4 rounded-[14px] border-[1.5px] bg-white text-primary text-[15px] font-semibold transition-colors hover:border-accent ${aan ? "border-accent bg-[#E4F1EE]" : "border-[#C7CFCB]"}`}
    >
      {children}
    </button>
  );
}

export function Melding({ children, soort }: { children: ReactNode; soort?: "fout" | "info" }) {
  return (
    <div className={`rounded-[14px] px-4 py-3 text-[15px] leading-relaxed ${soort === "fout" ? "bg-[#FBEFE9] text-[#7A3418]" : "bg-[#E4F1EE] text-[#0B5F56]"}`}>{children}</div>
  );
}

export function Teller({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center min-h-[26px] px-2.5 rounded-full bg-[#EEF1EF] text-text-soft text-[13px] font-semibold">{children}</span>;
}

export function Slot() {
  return (
    <p className="m-0 flex items-center gap-2 text-sm text-text-soft">
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B7A6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
      <span>Je afschrift blijft op je apparaat. Ik zie het niet en het wordt nergens opgeslagen.</span>
    </p>
  );
}
