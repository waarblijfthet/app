"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QuizData } from "@/lib/quiz-types";

interface Props {
  data: QuizData;
  onChange: (u: Partial<QuizData>) => void;
  resultaat: Record<string, unknown>;
}

/**
 * De gratis uitkomst bewaren, secundair aan de Geldscan-CTA (spec sectie 7).
 * Standaard alleen een rustige tekstlink; het formulier verschijnt pas na een
 * bewuste klik, zodat het nooit met de primaire actie op stap 4 concurreert.
 */
export default function BewaarUitkomst({ data, onChange, resultaat }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.email || !data.toestemmingOpslaan) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam: data.naam || null,
          email: data.email,
          toestemmingMarketing: data.toestemmingMarketing,
          resultaat,
        }),
      });

      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.token) {
        throw new Error(
          json?.detail || json?.error || `Opslaan mislukt (status ${res.status})`
        );
      }
      const savedToken: string = json.token;

      fetch("/api/send-resultaat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          token: savedToken,
          verdict: resultaat.verdict,
          maandelijksOver: resultaat.maandelijks_over_berekend,
          benchmarkOver: resultaat.benchmark_over_verwacht,
        }),
      }).catch(console.error);

      router.push(`/resultaat/${savedToken}`);
    } catch (err) {
      console.error(err);
      const detail = err instanceof Error ? err.message : "";
      setError(
        `Er ging iets mis bij het opslaan${
          detail ? ` (${detail})` : ""
        }. Probeer het opnieuw of mail naar hallo@waarblijfthet.nl.`
      );
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="card-base border border-[#A6D8CD] bg-green-light text-center mt-6">
        <p className="font-display font-light text-primary text-2xl mb-2">Gelukt</p>
        <p className="text-text-soft font-body text-sm">
          Je vergelijking is onderweg naar <strong>{data.email}</strong>. Check
          ook je spamfolder.
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="text-center mt-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-[44px] px-3 inline-flex items-center font-body text-sm text-text-muted hover:text-primary underline underline-offset-2 transition-colors"
        >
          Ik wil mijn gratis uitkomst alleen bewaren
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#E6E9E7] p-6 mt-6">
      <p className="font-body font-medium text-primary text-base mb-1">
        Wil je deze uitkomst later terugzien?
      </p>
      <p className="text-text-muted font-body font-light text-sm mb-5">
        Vul je e-mailadres in, dan stuur ik je deze uitkomst toe.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="jouw@email.nl"
          required
          className="input-base min-h-[52px]"
          aria-label="E-mailadres"
        />
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={data.toestemmingOpslaan}
            onChange={(e) => onChange({ toestemmingOpslaan: e.target.checked })}
            required
            className="mt-0.5 w-4 h-4 accent-[#0B7A6E] flex-shrink-0"
          />
          <span className="font-body text-sm text-text-soft">
            Bewaar mijn antwoorden, zodat ik deze uitkomst kan mailen en je hem
            later kunt terugzien.
          </span>
        </label>
        {error && <p className="text-[#C4603A] font-body text-sm">{error}</p>}
        <button
          type="submit"
          disabled={sending || !data.email || !data.toestemmingOpslaan}
          className="btn-outline w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Even geduld" : "Stuur mijn vergelijking →"}
        </button>
        <div className="pt-3 mt-1 border-t border-[#E6E9E7]">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.toestemmingMarketing}
              onChange={(e) => onChange({ toestemmingMarketing: e.target.checked })}
              className="mt-0.5 w-4 h-4 accent-[#0B7A6E] flex-shrink-0"
            />
            <span className="font-body text-xs text-text-muted">
              Los hiervan: stuur me af en toe iets nuttigs van Waar blijft het.
              Je vergelijking krijg je ook zonder dit vinkje.
            </span>
          </label>
        </div>
        <p className="font-body text-xs text-text-muted">
          Je antwoorden zijn anoniem zolang je geen e-mailadres invult.{" "}
          <Link href="/privacy" style={{ color: "#0B7A6E", textDecoration: "none" }}>
            Privacy →
          </Link>
        </p>
      </form>
    </div>
  );
}
