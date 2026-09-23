"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { logGebeurtenis } from "@/lib/track";
import { getApparaat, getSessieId, isEigenaar } from "@/lib/sessie";
import type { ResultaatBerekening } from "./berekenResultaat";
import { vraagstapTekst } from "./vraagKeuzes";

interface Props {
  r: ResultaatBerekening;
  /** Geen vraag: door naar de Geldscan-stap. */
  onOverslaan: () => void;
  /** Vraag verstuurd: door naar de bevestiging, met de beloofde datum. */
  onVerstuurd: (info: { email: string; vraag: string; uiterlijk: string }) => void;
}

/**
 * Resultaatstap 3: stel me je vraag (23-sep-2026). Vervangt het tekstscherm
 * "cijfers vertellen nog niet of dit een probleem is", zie
 * docs/vraagstap-ontwerp-23-sep-2026.md en de mockup in docs/img.
 *
 * Eerst een vraag kiezen (één tik), pas daarna verschijnt het e-mailveld. Op
 * mobiel staat de knop vast onderaan in beeld, zodat niemand hoeft te scrollen
 * om hem te vinden. Geen toestemmingsvinkje: het antwoord is waar de bezoeker
 * zelf om vraagt.
 */
export default function Resultaat3Vraag({ r, onOverslaan, onVerstuurd }: Props) {
  const t = vraagstapTekst(r);
  const [gekozen, setGekozen] = useState<string | null>(null);
  const [eigenVraag, setEigenVraag] = useState("");
  const [toelichting, setToelichting] = useState("");
  const [email, setEmail] = useState("");
  const [honing, setHoning] = useState("");
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState("");
  const [vol, setVol] = useState(false);
  const [gemount, setGemount] = useState(false);

  // De vaste knopbalk op mobiel gaat via een portal naar <body>. Binnen de
  // resultatenflow staat alles in een blok met een transform-animatie
  // (animate-resultaat-in), en zo'n blok wordt het referentiekader voor
  // position: fixed. Dan staat de balk onder de inhoud in plaats van onderaan
  // het scherm; vastgesteld met een render op 390 pixels breed (23-sep-2026).
  useEffect(() => {
    setGemount(true);
  }, []);

  const keuze = t.keuzes.find((k) => k.sleutel === gekozen);
  const vraag = gekozen === "eigen" ? eigenVraag.trim() : keuze?.tekst ?? "";
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const klaar = vraag.length >= 5 && emailOk;

  function kies(sleutel: string) {
    setGekozen(sleutel);
    setFout("");
    logGebeurtenis("analyse_vraag_gekozen", { meta: { keuze: sleutel, uitkomst: t.uitkomst } });
  }

  function overslaan() {
    logGebeurtenis("analyse_vraag_overgeslagen", { meta: { uitkomst: t.uitkomst, gekozen: gekozen } });
    onOverslaan();
  }

  async function verstuur() {
    if (!klaar || bezig) return;
    setBezig(true);
    setFout("");
    try {
      const res = await fetch("/api/analyse-vraag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          vraag: vraag,
          toelichting: gekozen === "eigen" ? "" : toelichting.trim(),
          keuze: gekozen,
          uitkomst: t.uitkomst,
          resultaat: r.resultaat,
          verschillen: r.opvallend.map((a) => ({ label: a.label, jij: a.jij, bench: a.bench })),
          sessie_id: getSessieId(),
          apparaat: getApparaat(),
          eigenaar: isEigenaar(),
          website: honing,
        }),
      });
      const json = await res.json().catch(() => null);
      if (json?.vol) {
        setVol(true);
        setBezig(false);
        return;
      }
      if (!res.ok || !json?.ok) {
        throw new Error(json?.fout || "Er ging iets mis bij het versturen.");
      }
      onVerstuurd({ email: email.trim(), vraag: vraag, uiterlijk: json.uiterlijk as string });
    } catch (e) {
      setFout(e instanceof Error ? e.message : "Er ging iets mis bij het versturen.");
      setBezig(false);
    }
  }

  if (vol) {
    return (
      <div className="max-w-xl">
        <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-3 leading-snug">
          Deze week kan ik geen nieuwe vragen meer aan.
        </h2>
        <p className="font-body font-light text-text-soft text-base leading-relaxed mb-6">
          Er kwamen er zoveel binnen dat ik ze niet binnen 2 werkdagen kan beantwoorden, en dat is wat ik beloof.
          Probeer het volgende week nog eens, of bekijk hieronder de volgende stap.
        </p>
        <button type="button" onClick={onOverslaan} className="btn-primary">
          Laat de volgende stap zien →
        </button>
      </div>
    );
  }

  const knoppen = (
    <div className="max-w-xl mx-auto sm:mx-0">
      <button
        type="button"
        onClick={verstuur}
        disabled={!klaar || bezig}
        className="btn-primary w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {bezig
          ? "Even geduld…"
          : !gekozen
          ? "Kies eerst een vraag"
          : !emailOk
          ? "Vul je e-mailadres in"
          : "Stuur mijn vraag →"}
      </button>
      <div className="text-center sm:text-left">
        <button
          type="button"
          onClick={overslaan}
          className="mt-2 min-h-[40px] font-body text-sm text-text-muted underline underline-offset-2 hover:text-primary"
        >
          Geen vraag, laat de volgende stap zien
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl">
      <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-2 leading-snug">{t.kop}</h2>

      {!gekozen && (
        <>
          <p className="font-body font-light text-text-soft text-base mb-6 leading-relaxed">{t.inleiding}</p>
          <p className="section-eyebrow mb-2">Kies een vraag of schrijf je eigen</p>
          <div className="space-y-2 mb-4">
            {t.keuzes.map((k) => (
              <button
                key={k.sleutel}
                type="button"
                onClick={() => kies(k.sleutel)}
                className="w-full min-h-[48px] text-left rounded-xl border border-[#D9DEDC] bg-white px-4 py-3 font-body text-sm text-primary transition-colors hover:border-accent"
              >
                {k.tekst}
              </button>
            ))}
            <button
              type="button"
              onClick={() => kies("eigen")}
              className="w-full min-h-[48px] text-left rounded-xl border border-dashed border-[#C7CFCB] bg-white px-4 py-3 font-body text-sm text-text-muted transition-colors hover:border-accent hover:text-primary"
            >
              Eigen vraag schrijven…
            </button>
          </div>
          <p className="font-body text-xs text-text-muted leading-relaxed">
            Geen nieuwsbrief, geen verkoopgesprek. Over beleggen en hypotheken geef ik geen advies.
          </p>
        </>
      )}

      {gekozen && (
        <div className="mt-5">
          {gekozen === "eigen" ? (
            <>
              <label htmlFor="eigen-vraag" className="block font-body text-sm font-medium text-primary mb-1.5">
                Jouw vraag
              </label>
              <textarea
                id="eigen-vraag"
                value={eigenVraag}
                onChange={(e) => setEigenVraag(e.target.value)}
                maxLength={300}
                rows={3}
                autoFocus
                placeholder="Wat wil je weten over je uitkomst?"
                className="input-base min-h-[88px] mb-1"
              />
            </>
          ) : (
            <>
              <div className="rounded-xl border-[1.5px] border-accent bg-green-light px-4 py-3 font-body text-sm text-primary mb-2">
                ✓ {keuze?.tekst}
              </div>
              <textarea
                value={toelichting}
                onChange={(e) => setToelichting(e.target.value)}
                maxLength={1000}
                rows={2}
                aria-label="Toelichting"
                placeholder="Wil je er iets bij vertellen? Mag ook leeg."
                className="input-base min-h-[72px] mb-1"
              />
            </>
          )}
          <button
            type="button"
            onClick={() => setGekozen(null)}
            className="font-body text-xs text-text-muted underline underline-offset-2 mb-5 min-h-[32px]"
          >
            Andere vraag kiezen
          </button>

          <label htmlFor="vraag-email" className="block font-body text-sm font-medium text-primary mb-1.5">
            Waar mag ik je antwoord naartoe sturen?
          </label>
          <input
            id="vraag-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") verstuur();
            }}
            placeholder="jouw@email.nl"
            className="input-base min-h-[52px] mb-2"
          />
          {/* Honeypot: onzichtbaar voor mensen, bots vullen hem in. */}
          <input
            type="text"
            name="website"
            value={honing}
            onChange={(e) => setHoning(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] w-px h-px opacity-0"
          />
          <p className="font-body text-xs text-text-muted leading-relaxed">
            Ik gebruik je adres alleen voor dit antwoord en je uitkomst.{" "}
            <a href="/privacy" className="text-accent">
              Privacy →
            </a>
          </p>
          {fout && <p className="font-body text-sm text-[#C4603A] mt-3">{fout}</p>}
        </div>
      )}

      {/* Ruimte zodat de vaste balk op mobiel niets afdekt. */}
      <div className="h-36 sm:hidden" aria-hidden="true" />

      {/* Desktop: gewoon onder het formulier. */}
      <div className="hidden sm:block sm:mt-8">{knoppen}</div>

      {/* Mobiel: vast onderaan het scherm, via een portal (zie hierboven). */}
      {gemount &&
        createPortal(
          <div className="sm:hidden fixed inset-x-0 bottom-0 z-30 border-t border-[#E6E9E7] bg-white px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {knoppen}
          </div>,
          document.body
        )}
    </div>
  );
}
