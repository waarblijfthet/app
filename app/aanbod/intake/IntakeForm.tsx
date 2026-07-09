"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PAKKET_INFO } from "@/lib/aanbod-content";

interface Props {
  pakket: "intensief" | "gesprek" | "geldscan";
  token?: string;
}

const SITUATIE_OPTIES = [
  "Alleenstaand, geen kinderen",
  "Alleenstaande ouder",
  "Stel zonder kinderen",
  "Gezin met jonge kinderen (0 tot 8)",
  "Gezin met oudere kinderen (8+)",
];

const INKOMEN_OPTIES = [
  "Minder dan €3.000",
  "€3.000 tot €4.500",
  "€4.500 tot €6.000",
  "Meer dan €6.000",
];

const ANALYSE_OPTIES = [
  "Ja, en ik wil nu verder",
  "Nee, nog niet",
  "Ja, maar ik wil meer persoonlijke begeleiding",
];

const START_OPTIES = [
  "Zo snel mogelijk",
  "Binnen een maand",
  "Ik oriënteer me nog",
];

function RadioKaart({
  optie,
  selected,
  onSelect,
}: {
  optie: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
        selected
          ? "bg-[#E7F1EE] border-[#16211F] border-2"
          : "bg-white border-[#E6E9E7] hover:border-[#16211F]"
      }`}
      onClick={onSelect}
    >
      <input type="radio" className="sr-only" readOnly checked={selected} />
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          selected ? "border-[#16211F] bg-[#16211F]" : "border-[#E6E9E7]"
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <span className="text-sm text-[#16211F]">{optie}</span>
    </label>
  );
}

export function IntakeForm({ pakket, token }: Props) {
  const router = useRouter();
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);

  const [situatie, setSituatie] = useState("");
  const [inkomen, setInkomen] = useState("");
  const [knelpunt, setKnelpunt] = useState("");
  const [analyse, setAnalyse] = useState("");
  const [startVoorkeur, setStartVoorkeur] = useState("");
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");

  const isGeldscan = pakket === "geldscan";

  const pakketLabel =
    pakket === "intensief"
      ? "Persoonlijke begeleiding op maat (€497)"
      : isGeldscan
      ? "Geldscan met persoonlijk geldrapport (€49)"
      : "Eenmalig adviesgesprek (€125)";
  const info = PAKKET_INFO[pakket];

  const subtitel = isGeldscan
    ? "Drie korte vragen. Ik gebruik ze om je geldrapport direct persoonlijk te maken."
    : "Vijf korte vragen. Ik neem binnen één werkdag persoonlijk contact op.";

  const knelpuntLabelNr = isGeldscan ? "3" : "3";
  const knelpuntLabel = isGeldscan
    ? "Wat wil je dat ik in je geldrapport uitzoek?"
    : "Wat is je grootste knelpunt?";
  const knelpuntPlaceholder = isGeldscan
    ? "Bijv. ik weet niet waar mijn geld naartoe gaat, of: ik wil weten of ik te veel uitgeef aan vaste lasten…"
    : "Bijv. ik verdien goed maar aan het einde van de maand is het op…";

  const footerTekst = isGeldscan
    ? "Na betaling vraag ik je de gratis analyse in te vullen, dat maakt je rapport preciezer. Je gegevens gebruik ik alleen daarvoor en voor het betaalverzoek. Geen spam, nooit gedeeld."
    : "Je gegevens gebruik ik alleen om contact met je op te nemen. Geen spam, nooit gedeeld.";

  const isValid = isGeldscan
    ? Boolean(
        situatie &&
          inkomen &&
          knelpunt.trim().length > 0 &&
          naam.trim().length > 0 &&
          email.includes("@")
      )
    : Boolean(
        situatie &&
          inkomen &&
          knelpunt.trim().length > 0 &&
          analyse &&
          startVoorkeur &&
          naam.trim().length > 0 &&
          email.includes("@")
      );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || bezig) return;
    setBezig(true);
    setFout(null);

    try {
      const dbRes = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pakket,
          gezinssituatie: situatie,
          inkomen_bracket: inkomen,
          grootste_knelpunt: knelpunt.trim(),
          ...(isGeldscan
            ? { analyse_token: token ?? null }
            : {
                analyse_gedaan: analyse.startsWith("Ja"),
                start_voorkeur: startVoorkeur,
              }),
          naam: naam.trim(),
          email: email.trim().toLowerCase(),
        }),
      });

      if (!dbRes.ok) {
        const json = await dbRes.json().catch(() => null);
        throw new Error(json?.error || "Opslaan mislukt");
      }

      const res = await fetch("/api/send-intake-bevestiging", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naam: naam.trim(), email: email.trim().toLowerCase(), pakket }),
      });

      if (!res.ok) {
        // Email failure is non-fatal, still redirect
        console.error("Email kon niet worden verstuurd");
      }

      router.push("/aanbod/intake/bedankt");
    } catch (err) {
      console.error(err);
      setFout("Er ging iets mis. Probeer het nog eens of mail naar hallo@waarblijfthet.nl.");
      setBezig(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#F7F8F7", minHeight: "100vh" }}>
      {/* Minimal header */}
      <header
        style={{
          backgroundColor: "#F7F8F7",
          borderBottom: "1px solid #E6E9E7",
          padding: "0 1.5rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/aanbod"
          className="font-body"
          style={{ color: "#4A5A56", fontSize: "0.85rem", textDecoration: "none" }}
        >
          ← Terug naar het aanbod
        </Link>
        <span className="font-display font-light" style={{ color: "#16211F", fontSize: "1rem" }}>
          Waar blijft het
        </span>
      </header>

      <main style={{ maxWidth: "640px", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
        {/* Pakket pill */}
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
          <span
            className="font-body"
            style={{
              display: "inline-block",
              backgroundColor: "#E7F1EE",
              color: "#16211F",
              fontSize: "0.8rem",
              fontWeight: 500,
              padding: "0.4rem 1rem",
              borderRadius: "999px",
              border: "1px solid #C8DDD0",
            }}
          >
            {pakketLabel}
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display font-light text-[#16211F]"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            marginBottom: "0.75rem",
            textAlign: "center",
            lineHeight: 1.25,
          }}
        >
          Vertel me iets over je situatie
        </h1>
        <p
          className="font-body"
          style={{
            color: "#4A5A56",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          {subtitel}
        </p>

        <div
          className="font-body"
          style={{
            backgroundColor: "white",
            border: "1px solid #E6E9E7",
            borderRadius: "16px",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8B958F",
              marginBottom: "1rem",
            }}
          >
            Je vraagt dit aan: wat je krijgt
          </p>
          <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {info.watJeKrijgt.map((t) => (
              <li key={t} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <span aria-hidden="true" style={{ color: "#2D6A4F", fontWeight: 600 }}>
                  ✓
                </span>
                <span style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "#4A5A56" }}>
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {isGeldscan && token && (
          <div
            className="font-body"
            style={{
              backgroundColor: "#E7F1EE",
              border: "1px solid #C8DDD0",
              borderRadius: "12px",
              padding: "0.875rem 1rem",
              fontSize: "0.85rem",
              color: "#16211F",
              marginBottom: "2rem",
            }}
          >
            Je analyse is gekoppeld. Ik gebruik die cijfers als basis voor je geldrapport, je hoeft ze hieronder niet te herhalen.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Vraag 1 */}
          <fieldset style={{ border: "none", padding: 0, marginBottom: "2rem" }}>
            <legend
              className="font-body"
              style={{
                fontWeight: 600,
                color: "#16211F",
                fontSize: "0.95rem",
                marginBottom: "0.75rem",
                display: "block",
              }}
            >
              1. Wat is je situatie?
            </legend>
            <div className="flex flex-col gap-2">
              {SITUATIE_OPTIES.map((o) => (
                <RadioKaart
                  key={o}
                  optie={o}
                  selected={situatie === o}
                  onSelect={() => setSituatie(o)}
                />
              ))}
            </div>
          </fieldset>

          {/* Vraag 2 */}
          <fieldset style={{ border: "none", padding: 0, marginBottom: "2rem" }}>
            <legend
              className="font-body"
              style={{
                fontWeight: 600,
                color: "#16211F",
                fontSize: "0.95rem",
                marginBottom: "0.75rem",
                display: "block",
              }}
            >
              2. Wat is je netto inkomen per maand?
            </legend>
            <div className="flex flex-col gap-2">
              {INKOMEN_OPTIES.map((o) => (
                <RadioKaart
                  key={o}
                  optie={o}
                  selected={inkomen === o}
                  onSelect={() => setInkomen(o)}
                />
              ))}
            </div>
          </fieldset>

          {/* Vraag 3 */}
          <div style={{ marginBottom: "2rem" }}>
            <label
              htmlFor="knelpunt"
              className="font-body"
              style={{
                fontWeight: 600,
                color: "#16211F",
                fontSize: "0.95rem",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              {knelpuntLabelNr}. {knelpuntLabel}
            </label>
            <div style={{ position: "relative" }}>
              <textarea
                id="knelpunt"
                value={knelpunt}
                onChange={(e) => setKnelpunt(e.target.value.slice(0, 200))}
                placeholder={knelpuntPlaceholder}
                rows={4}
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "1px solid #E6E9E7",
                  backgroundColor: "white",
                  fontSize: "0.9rem",
                  color: "#16211F",
                  lineHeight: 1.6,
                  resize: "vertical",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#16211F")}
                onBlur={(e) => (e.target.style.borderColor = "#E6E9E7")}
              />
              <span
                className="font-body"
                style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  right: "1rem",
                  fontSize: "0.75rem",
                  color: knelpunt.length >= 180 ? "#0B7A6E" : "#8B958F",
                }}
              >
                {knelpunt.length}/200
              </span>
            </div>
          </div>

          {!isGeldscan && (
            <>
              {/* Vraag 4 */}
              <fieldset style={{ border: "none", padding: 0, marginBottom: "2rem" }}>
                <legend
                  className="font-body"
                  style={{
                    fontWeight: 600,
                    color: "#16211F",
                    fontSize: "0.95rem",
                    marginBottom: "0.75rem",
                    display: "block",
                  }}
                >
                  4. Heb je de gratis analyse al gedaan?
                </legend>
                <div className="flex flex-col gap-2">
                  {ANALYSE_OPTIES.map((o) => (
                    <RadioKaart
                      key={o}
                      optie={o}
                      selected={analyse === o}
                      onSelect={() => setAnalyse(o)}
                    />
                  ))}
                </div>
              </fieldset>

              {/* Vraag 5 */}
              <fieldset style={{ border: "none", padding: 0, marginBottom: "2rem" }}>
                <legend
                  className="font-body"
                  style={{
                    fontWeight: 600,
                    color: "#16211F",
                    fontSize: "0.95rem",
                    marginBottom: "0.75rem",
                    display: "block",
                  }}
                >
                  5. Wanneer wil je starten?
                </legend>
                <div className="flex flex-col gap-2">
                  {START_OPTIES.map((o) => (
                    <RadioKaart
                      key={o}
                      optie={o}
                      selected={startVoorkeur === o}
                      onSelect={() => setStartVoorkeur(o)}
                    />
                  ))}
                </div>
              </fieldset>
            </>
          )}

          {/* Contactgegevens */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "1.5rem",
              marginBottom: "2rem",
              border: "1px solid #E6E9E7",
            }}
          >
            <p
              className="font-body"
              style={{
                fontWeight: 600,
                color: "#16211F",
                fontSize: "0.95rem",
                marginBottom: "1.25rem",
              }}
            >
              Je contactgegevens
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="naam"
                  className="font-body"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "#4A5A56",
                    marginBottom: "0.4rem",
                    fontWeight: 500,
                  }}
                >
                  Naam
                </label>
                <input
                  id="naam"
                  type="text"
                  value={naam}
                  onChange={(e) => setNaam(e.target.value)}
                  placeholder="Jouw naam"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid #E6E9E7",
                    fontSize: "0.9rem",
                    color: "#16211F",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#16211F")}
                  onBlur={(e) => (e.target.style.borderColor = "#E6E9E7")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-body"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "#4A5A56",
                    marginBottom: "0.4rem",
                    fontWeight: 500,
                  }}
                >
                  E-mailadres
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouw@email.nl"
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    border: "1px solid #E6E9E7",
                    fontSize: "0.9rem",
                    color: "#16211F",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#16211F")}
                  onBlur={(e) => (e.target.style.borderColor = "#E6E9E7")}
                />
              </div>
            </div>
          </div>

          {/* Foutmelding */}
          {fout && (
            <div
              className="font-body"
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "10px",
                padding: "0.875rem 1rem",
                fontSize: "0.875rem",
                color: "#991B1B",
                marginBottom: "1.5rem",
              }}
            >
              {fout}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || bezig}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: "12px",
              backgroundColor: isValid && !bezig ? "#0B7A6E" : "#E6E9E7",
              color: isValid && !bezig ? "white" : "#8B958F",
              border: "none",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: isValid && !bezig ? "pointer" : "not-allowed",
              fontFamily: "inherit",
              transition: "background-color 0.2s, opacity 0.2s",
            }}
          >
            {bezig ? "Bezig…" : "Stuur mijn aanmelding →"}
          </button>

          <p
            className="font-body"
            style={{
              textAlign: "center",
              fontSize: "0.78rem",
              color: "#8B958F",
              marginTop: "1rem",
              lineHeight: 1.6,
            }}
          >
            {footerTekst}
          </p>
        </form>
      </main>
    </div>
  );
}
