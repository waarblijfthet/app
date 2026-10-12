"use client";

/**
 * Gedeelde invoervelden voor de kleine rekenaars van de ICP-cluster
 * (12-okt-2026): JaarkostenTeller, GatSnelcheck en LoonsverhogingSpoor.
 * Zelfde maat en kleur als KeuzeDoorrekening, duimbaar op mobiel (48px hoog),
 * en niets wordt opgeslagen.
 */

export const GROEN = "#0B7A6E";
export const DONKER = "#16211F";
export const ZACHT = "#4A5A56";
export const GRIJS = "#8B958F";
export const ROOD = "#B03A2E";

const VELD: React.CSSProperties = {
  width: "100%",
  minHeight: "48px",
  padding: "0.6rem 0.75rem 0.6rem 1.6rem",
  borderRadius: "10px",
  border: "1px solid #D6E5E0",
  backgroundColor: "#FFFFFF",
  fontSize: "1rem",
  color: DONKER,
  fontFamily: "inherit",
  boxSizing: "border-box",
};

export type Bedrag = number | null;

/** Alleen cijfers; leeg blijft leeg. */
export function leesBedrag(tekst: string): Bedrag {
  const schoon = tekst.replace(/[^0-9]/g, "").slice(0, 6);
  return schoon === "" ? null : Number(schoon);
}

export function euroKort(n: number): string {
  const teken = n < 0 ? "-" : "";
  return `${teken}€${Math.abs(Math.round(n)).toLocaleString("nl-NL")}`;
}

export function Bedragveld({
  id,
  label,
  waarde,
  placeholder,
  onChange,
}: {
  id: string;
  label: string;
  waarde: Bedrag;
  placeholder?: string;
  onChange: (w: Bedrag) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-body text-xs mb-1" style={{ color: GRIJS }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <span
          aria-hidden="true"
          className="font-body"
          style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)", color: GRIJS }}
        >
          €
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={waarde === null ? "" : String(waarde)}
          placeholder={placeholder}
          onChange={(e) => onChange(leesBedrag(e.target.value))}
          className="font-body tabular-nums"
          style={VELD}
        />
      </div>
    </div>
  );
}

export function Tegel({ label, bedrag, nadruk }: { label: string; bedrag: number | null; nadruk?: boolean }) {
  return (
    <div className="rounded-lg p-3" style={{ backgroundColor: nadruk ? "#FDF1EC" : "#F2F7F5" }}>
      <p className="font-body text-xs mb-1" style={{ color: GRIJS }}>
        {label}
      </p>
      <p
        className="font-body tabular-nums"
        style={{ color: nadruk ? "#C4603A" : DONKER, fontWeight: 500, fontSize: "1.15rem", margin: 0 }}
      >
        {bedrag === null ? "nog niet" : euroKort(bedrag)}
      </p>
    </div>
  );
}

export function RekenKader({ titel, uitleg, children }: { titel: string; uitleg: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 my-8" style={{ backgroundColor: "#F7FAF9", border: "1px solid #D6E5E0" }}>
      <p className="font-body font-medium uppercase tracking-widest text-xs mb-2" style={{ color: GROEN }}>
        Reken mee
      </p>
      <p className="font-display font-light text-xl mb-1" style={{ color: DONKER }}>
        {titel}
      </p>
      <p className="font-body text-sm mb-5" style={{ color: ZACHT, lineHeight: 1.6 }}>
        {uitleg}
      </p>
      {children}
    </div>
  );
}
