"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [wachtwoord, setWachtwoord] = useState("");
  const [toonWachtwoord, setToonWachtwoord] = useState(false);
  const [fout, setFout] = useState("");
  const [laden, setLaden] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFout("");
    setLaden(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password: wachtwoord });

    if (error) {
      setFout("Emailadres of wachtwoord klopt niet");
      setLaden(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 justify-center mb-8">
        <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-display font-medium text-sm">
          wb
        </span>
        <span className="font-display font-light text-primary text-xl tracking-tight">
          Waar blijft het
        </span>
      </div>

      {/* Kaart */}
      <div className="bg-card rounded-xl shadow-card border border-[#E6E9E7] p-8">
        <h1 className="font-display font-light text-primary text-2xl mb-1">
          Beheerders login
        </h1>
        <p className="text-text-muted font-body text-sm mb-6">
          Alleen voor intern gebruik
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-body font-medium text-text-soft text-sm mb-1.5">
              Emailadres
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="input-base text-base"
              placeholder="admin@waarblijfthet.nl"
            />
          </div>

          <div>
            <label className="block font-body font-medium text-text-soft text-sm mb-1.5">
              Wachtwoord
            </label>
            <div className="relative">
              <input
                type={toonWachtwoord ? "text" : "password"}
                value={wachtwoord}
                onChange={(e) => setWachtwoord(e.target.value)}
                required
                autoComplete="current-password"
                className="input-base text-base pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setToonWachtwoord((t) => !t)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors text-xs font-body"
                aria-label={toonWachtwoord ? "Verberg wachtwoord" : "Toon wachtwoord"}
              >
                {toonWachtwoord ? "Verberg" : "Toon"}
              </button>
            </div>
          </div>

          {fout && (
            <p className="text-[#B03A2E] font-body text-sm bg-[#FDECEA] px-3 py-2 rounded-lg">
              {fout}
            </p>
          )}

          <button
            type="submit"
            disabled={laden}
            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {laden ? "Even geduld…" : "Inloggen"}
          </button>
        </form>
      </div>
    </div>
  );
}
