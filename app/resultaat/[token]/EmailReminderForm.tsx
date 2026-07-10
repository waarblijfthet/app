"use client";

import { useState } from "react";

interface Props {
  token: string;
  verdict: string;
  maandelijksOver: number;
  benchmarkOver: number;
}

export default function EmailReminderForm({
  token,
  verdict,
  maandelijksOver,
  benchmarkOver,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) return;
    setStatus("loading");

    const res = await fetch("/api/send-resultaat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        token,
        verdict,
        maandelijksOver,
        benchmarkOver,
      }),
    });

    setStatus(res.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <p className="text-[#0B7A6E] font-body text-sm text-center bg-green-light rounded-xl py-3 px-4">
        ✓ De analyse is onderweg naar <strong>{email}</strong>. Check ook je spamfolder.
      </p>
    );
  }

  return (
    <div>
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
          aria-label="E-mailadres voor analyse"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary text-sm py-2 px-5 whitespace-nowrap disabled:opacity-50"
        >
          {status === "loading" ? "Even geduld…" : "Stuur mij de link"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-[#B03A2E] font-body text-xs mt-2">
          Er ging iets mis. Probeer het opnieuw.
        </p>
      )}
    </div>
  );
}
