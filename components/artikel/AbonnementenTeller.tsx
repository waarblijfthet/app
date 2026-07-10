"use client";

import { useState } from "react";

type Abo = { naam: string; bedrag: number };

const STANDAARD: Abo[] = [
  { naam: "Streaming video (Netflix, Disney+, Videoland…)", bedrag: 25 },
  { naam: "Muziek (Spotify, Apple Music)", bedrag: 11 },
  { naam: "Sportschool / sportclub", bedrag: 35 },
  { naam: "Telefoonabonnement(en)", bedrag: 40 },
  { naam: "Internet & tv", bedrag: 55 },
  { naam: "Krant / tijdschriften / nieuws", bedrag: 15 },
  { naam: "Cloud / software / apps", bedrag: 12 },
  { naam: "Goede doelen", bedrag: 15 },
  { naam: "Verzekerings-extra's (uitvaart, rechtsbijstand…)", bedrag: 20 },
  { naam: "Maaltijd- / boodschappenbox", bedrag: 45 },
];

const euro = (n: number) =>
  "€" + n.toLocaleString("nl-NL", { maximumFractionDigits: 0 });

export default function AbonnementenTeller() {
  const [actief, setActief] = useState<boolean[]>(STANDAARD.map(() => false));

  const toggle = (i: number) =>
    setActief((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const maand = STANDAARD.reduce(
    (som, a, i) => som + (actief[i] ? a.bedrag : 0),
    0
  );
  const jaar = maand * 12;
  const aantal = actief.filter(Boolean).length;

  return (
    <div
      className="rounded-2xl border border-[#E6E9E7] p-6 my-8"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <p
        className="font-body font-medium uppercase tracking-widest text-xs mb-2"
        style={{ color: "#0B7A6E" }}
      >
        Reken even mee
      </p>
      <p className="font-display font-light text-[#16211F] text-xl mb-1">
        Wat kosten jouw abonnementen samen?
      </p>
      <p className="font-body text-sm mb-5" style={{ color: "#4A5A56" }}>
        Vink aan wat je hebt. De bedragen zijn gemiddelden — pas ze in gedachten
        aan jouw situatie aan.
      </p>

      <div className="space-y-1.5">
        {STANDAARD.map((a, i) => (
          <button
            key={a.naam}
            type="button"
            onClick={() => toggle(i)}
            aria-pressed={actief[i]}
            className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
            style={{
              backgroundColor: actief[i] ? "#E7F1EE" : "white",
              border: `1px solid ${actief[i] ? "#A6D8CD" : "#E6E9E7"}`,
            }}
          >
            <span className="flex items-center gap-2.5">
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold shrink-0"
                style={{
                  backgroundColor: actief[i] ? "#0B7A6E" : "#F0F3F1",
                  color: actief[i] ? "white" : "#8B958F",
                }}
                aria-hidden="true"
              >
                {actief[i] ? "✓" : ""}
              </span>
              <span
                className="font-body text-sm"
                style={{ color: "#16211F" }}
              >
                {a.naam}
              </span>
            </span>
            <span
              className="font-body text-sm tabular-nums shrink-0"
              style={{ color: "#8B958F" }}
            >
              {euro(a.bedrag)}/mnd
            </span>
          </button>
        ))}
      </div>

      <div
        className="mt-6 rounded-xl p-5 text-center"
        style={{ backgroundColor: "#16211F" }}
      >
        <p
          className="font-body text-xs uppercase tracking-widest mb-2"
          style={{ color: "rgba(245,240,232,0.6)" }}
        >
          {aantal} abonnement{aantal === 1 ? "" : "en"} aangevinkt
        </p>
        <p className="font-display font-light text-white text-4xl leading-none">
          {euro(maand)}
          <span className="text-lg" style={{ color: "rgba(245,240,232,0.6)" }}>
            {" "}
            / maand
          </span>
        </p>
        <p
          className="font-body text-sm mt-2"
          style={{ color: "rgba(245,240,232,0.85)" }}
        >
          Dat is <strong>{euro(jaar)}</strong> per jaar.
        </p>
      </div>

      <p className="font-body text-xs mt-3" style={{ color: "#8B958F" }}>
        En dit is alleen wat je je nu herinnert. De{" "}
        <a
          href="/analyse"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
          className="hover:underline"
        >
          analyse
        </a>{" "}
        vindt vaak nog meer.
      </p>
    </div>
  );
}
