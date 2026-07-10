'use client';

import { useState } from "react";

const OPTIES: { value: string; label: string }[] = [
  { value: "alleen", label: "Alleenstaand" },
  { value: "twee", label: "Met z'n tweeën" },
  { value: "gezin-jong", label: "Gezin, jonge kinderen" },
  { value: "gezin-pubers", label: "Gezin met pubers" },
  { value: "groot", label: "Groot gezin" },
];

export default function BenchmarkMail() {
  const [huishouden, setHuishouden] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [bezig, setBezig] = useState(false);
  const [klaar, setKlaar] = useState(false);
  const [fout, setFout] = useState<string | null>(null);

  async function verstuur(e: React.FormEvent) {
    e.preventDefault();
    if (!huishouden) { setFout("Kies eerst je situatie."); return; }
    setBezig(true);
    setFout(null);
    try {
      const res = await fetch("/api/boodschappen-benchmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), huishouden }),
      });
      const data = await res.json();
      if (!res.ok) { setFout(data.error ?? "Er ging iets mis."); return; }
      setKlaar(true);
    } catch {
      setFout("Er ging iets mis. Probeer het later opnieuw.");
    } finally {
      setBezig(false);
    }
  }

  return (
    <div className="rounded-xl border my-8" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "#E6E9E7" }}>
        <p className="font-body font-semibold text-sm" style={{ color: "#16211F" }}>
          De drie grootste hefbomen voor jouw situatie, in je mail
        </p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#8B958F" }}>
          Eén mail met de cijfers voor jouw situatie. Geen nieuwsbrief, geen vervolgmails.
        </p>
      </div>
      <div className="p-5">
        {klaar ? (
          <p className="font-body text-sm" style={{ color: "#16211F" }}>
            Verstuurd! Check je inbox (en eventueel je spamfolder). Benieuwd
            naar je volledige plaatje? De analyse vergelijkt al je
            posten in 5 minuten.
          </p>
        ) : (
          <form onSubmit={verstuur}>
            <div className="flex flex-wrap gap-2 mb-4">
              {OPTIES.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setHuishouden(o.value)}
                  className="font-body text-xs rounded-full px-3 py-1.5 transition-all"
                  style={{
                    border: `1.5px solid ${huishouden === o.value ? "#16211F" : "#D9DEDC"}`,
                    backgroundColor: huishouden === o.value ? "#E7F1EE" : "white",
                    color: "#16211F",
                    fontWeight: huishouden === o.value ? 600 : 400,
                    cursor: "pointer",
                  }}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                className="flex-1 font-body text-sm border rounded-xl px-4 py-2.5 focus:outline-none"
                style={{ borderColor: "#D9DEDC", backgroundColor: "white" }}
              />
              <button
                type="submit"
                disabled={bezig}
                className="font-body text-sm font-semibold rounded-xl px-5 py-2.5 disabled:opacity-50"
                style={{ backgroundColor: "#16211F", color: "#FFFFFF", cursor: "pointer" }}
              >
                {bezig ? "Versturen..." : "Mail mijn benchmark"}
              </button>
            </div>
            {fout && (
              <p className="font-body text-xs mt-2" style={{ color: "#B03A2E" }}>{fout}</p>
            )}
            <p className="font-body text-xs mt-3" style={{ color: "#8B958F" }}>
              Je adres wordt nergens opgeslagen en nooit gedeeld: er gaat één
              mail uit en dat is het.{" "}
              <a href="/privacy" style={{ color: "#0B7A6E" }}>Privacy</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
