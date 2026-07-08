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
    <div className="rounded-xl border my-8" style={{ backgroundColor: "#FDFAF4", borderColor: "#E8E0D4" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "#E8E0D4" }}>
        <p className="font-body font-semibold text-sm" style={{ color: "#1C3A2A" }}>
          De drie grootste hefbomen voor jouw situatie, in je mail
        </p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#8A9E8E" }}>
          Eén mail met de cijfers voor jouw situatie. Geen nieuwsbrief, geen vervolgmails.
        </p>
      </div>
      <div className="p-5">
        {klaar ? (
          <p className="font-body text-sm" style={{ color: "#1C3A2A" }}>
            Verstuurd! Check je inbox (en eventueel je spamfolder). Benieuwd
            naar je volledige plaatje? De gratis analyse vergelijkt al je
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
                    border: `1.5px solid ${huishouden === o.value ? "#1C3A2A" : "#D6CEBC"}`,
                    backgroundColor: huishouden === o.value ? "#E8F2EC" : "white",
                    color: "#1C3A2A",
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
                style={{ borderColor: "#D6CEBC", backgroundColor: "white" }}
              />
              <button
                type="submit"
                disabled={bezig}
                className="font-body text-sm font-semibold rounded-xl px-5 py-2.5 disabled:opacity-50"
                style={{ backgroundColor: "#1C3A2A", color: "#FDFAF4", cursor: "pointer" }}
              >
                {bezig ? "Versturen..." : "Mail mijn benchmark"}
              </button>
            </div>
            {fout && (
              <p className="font-body text-xs mt-2" style={{ color: "#B03A2E" }}>{fout}</p>
            )}
            <p className="font-body text-xs mt-3" style={{ color: "#8A9E8E" }}>
              Je adres wordt nergens opgeslagen en nooit gedeeld: er gaat één
              mail uit en dat is het.{" "}
              <a href="/privacy" style={{ color: "#C4603A" }}>Privacy</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
