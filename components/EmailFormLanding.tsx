"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

interface Props {
  variant: "hero" | "cta";
}

export default function EmailFormLanding({ variant }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "duplicate" | "error"
  >("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase
      .from("leads")
      .insert({ email, bron: "landing", toestemming_marketing: false });

    if (!error) {
      setStatus("success");
      setEmail("");
    } else if (error.code === "23505") {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  }

  if (variant === "hero") {
    return (
      <div>
        {/* Primaire CTA — quiz */}
        <Link
          href="/analyse"
          className="inline-block font-body text-white mb-6 transition-opacity hover:opacity-90"
          style={{
            background: "#0B7A6E",
            padding: "1rem 2rem",
            fontSize: "1rem",
            fontWeight: 500,
            borderRadius: "12px",
            textDecoration: "none",
          }}
        >
          Start de analyse →
        </Link>

        {/* Secundaire e-mailaanmelding */}
        <p className="text-text-muted font-body text-sm mb-3">
          Of meld je aan voor updates:
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 max-w-md"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jouw@email.nl"
            required
            className="input-base flex-1 text-sm py-2"
            aria-label="E-mailadres voor updates"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-outline text-sm py-2 px-4 whitespace-nowrap disabled:opacity-50"
          >
            Aanmelden
          </button>
        </form>

        {status === "success" && (
          <p className="text-[#0B7A6E] font-body text-sm mt-2">
            Je staat op de lijst! We sturen je een berichtje als we live gaan.
          </p>
        )}
        {status === "duplicate" && (
          <p className="text-[#92600A] font-body text-sm mt-2">
            Dit emailadres staat al op de lijst.
          </p>
        )}
        {status === "error" && (
          <p className="text-[#B03A2E] font-body text-sm mt-2">
            Er ging iets mis. Probeer het opnieuw.
          </p>
        )}
      </div>
    );
  }

  // CTA variant — donkere achtergrond
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jouw@email.nl"
          required
          className="input-base flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/60"
          aria-label="E-mailadres"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary whitespace-nowrap disabled:opacity-50"
        >
          Aanmelden
        </button>
      </form>

      {status === "success" && (
        <p className="text-green-300 font-body text-sm mt-3 text-center">
          Je staat op de lijst! We sturen je een berichtje als we live gaan.
        </p>
      )}
      {status === "duplicate" && (
        <p className="text-yellow-300 font-body text-sm mt-3 text-center">
          Dit emailadres staat al op de lijst.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-300 font-body text-sm mt-3 text-center">
          Er ging iets mis. Probeer het opnieuw.
        </p>
      )}
    </div>
  );
}
