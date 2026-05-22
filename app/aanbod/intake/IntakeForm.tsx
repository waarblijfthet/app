"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

interface Props {
  pakket: "intensief" | "6weken";
}

const GEZINSSITUATIE_OPTIES = [
  "Stel zonder kinderen",
  "Gezin met jonge kinderen (0–8)",
  "Gezin met oudere kinderen (8+)",
  "Eénoudergezin",
];

const INKOMEN_OPTIES = [
  "Minder dan €3.000",
  "€3.000 – €4.500",
  "€4.500 – €6.000",
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
          ? "bg-[#E8F2EC] border-[#1C3A2A] border-2"
          : "bg-white border-[#E8E0D4] hover:border-[#1C3A2A]"
      }`}
      onClick={onSelect}
    >
      <input type="radio" className="sr-only" readOnly checked={selected} />
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          selected ? "border-[#1C3A2A] bg-[#1C3A2A]" : "border-[#E8E0D4]"
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <span className="text-sm text-[#1C3A2A]">{optie}</span>
    </label>
  );
}

export function IntakeForm({ pakket }: Props) {
  const router = useRouter();
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);

  const [gezinssituatie, setGezinssituatie] = useState("");
  const [inkomen, setInkomen] = useState("");
  const [knelpunt, setKnelpunt] = useState("");
  const [analyse, setAnalyse] = useState("");
  const [startVoorkeur, setStartVoorkeur] = useState("");
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");

  const pakketLabel =
    pakket === "intensief"
      ? "Persoonlijke begeleiding op maat — €497"
      : "Zes weken een spiegel voorgehouden — €97";

  const isValid =
    gezinssituatie &&
    inkomen &&
    knelpunt.trim().length > 0 &&
    analyse &&
    startVoorkeur &&
    naam.trim().length > 0 &&
    email.includes("@");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || bezig) return;
    setBezig(true);
    setFout(null);

    try {
      const supabase = createClient();

      const { error: dbError } = await supabase
        .from("intake_aanvragen")
        .insert({
          pakket,
          gezinssituatie,
          inkomen_bracket: inkomen,
          grootste_knelpunt: knelpunt.trim(),
          analyse_gedaan: analyse.startsWith("Ja"),
          start_voorkeur: startVoorkeur,
          naam: naam.trim(),
          email: email.trim().toLowerCase(),
          status: "nieuw",
        });

      if (dbError) throw dbError;

      const res = await fetch("/api/send-intake-bevestiging", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naam: naam.trim(), email: email.trim().toLowerCase(), pakket }),
      });

      if (!res.ok) {
        // Email failure is non-fatal — still redirect
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
    <div style={{ backgroundColor: "#F5F0E8", minHeight: "100vh" }}>
      {/* Minimal header */}
      <header
        style={{
          backgroundColor: "#F5F0E8",
          borderBottom: "1px solid #E8E0D4",
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
          style={{ color: "#4A5E4E", fontSize: "0.85rem", textDecoration: "none" }}
        >
          ← Terug naar het aanbod
        </Link>
        <span className="font-display font-light" style={{ color: "#1C3A2A", fontSize: "1rem" }}>
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
              backgroundColor: "#E8F2EC",
              color: "#1C3A2A",
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
          className="font-display font-light text-[#1C3A2A]"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
            marginBottom: "0.75rem",
            textAlign: "center",
            lineHeight: 1.25,
          }}
        >
          Vertel ons iets over jullie situatie
        </h1>
        <p
          className="font-body"
          style={{
            color: "#4A5E4E",
            fontSize: "0.95rem",
            lineHeight: 1.7,
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          Vijf korte vragen. We nemen binnen één werkdag persoonlijk contact op.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Vraag 1 */}
          <fieldset style={{ border: "none", padding: 0, marginBottom: "2rem" }}>
            <legend
              className="font-body"
              style={{
                fontWeight: 600,
                color: "#1C3A2A",
                fontSize: "0.95rem",
                marginBottom: "0.75rem",
                display: "block",
              }}
            >
              1. Wat is jullie gezinssituatie?
            </legend>
            <div className="flex flex-col gap-2">
              {GEZINSSITUATIE_OPTIES.map((o) => (
                <RadioKaart
                  key={o}
                  optie={o}
                  selected={gezinssituatie === o}
                  onSelect={() => setGezinssituatie(o)}
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
                color: "#1C3A2A",
                fontSize: "0.95rem",
                marginBottom: "0.75rem",
                display: "block",
              }}
            >
              2. Wat is het netto gezinsinkomen per maand?
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
                color: "#1C3A2A",
                fontSize: "0.95rem",
                display: "block",
                marginBottom: "0.75rem",
              }}
            >
              3. Wat is jullie grootste knelpunt?
            </label>
            <div style={{ position: "relative" }}>
              <textarea
                id="knelpunt"
                value={knelpunt}
                onChange={(e) => setKnelpunt(e.target.value.slice(0, 200))}
                placeholder="Bijv. we verdienen goed maar aan het einde van de maand is het op…"
                rows={4}
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "1px solid #E8E0D4",
                  backgroundColor: "white",
                  fontSize: "0.9rem",
                  color: "#1C3A2A",
                  lineHeight: 1.6,
                  resize: "vertical",
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1C3A2A")}
                onBlur={(e) => (e.target.style.borderColor = "#E8E0D4")}
              />
              <span
                className="font-body"
                style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  right: "1rem",
                  fontSize: "0.75rem",
                  color: knelpunt.length >= 180 ? "#C4603A" : "#8A9E8E",
                }}
              >
                {knelpunt.length}/200
              </span>
            </div>
          </div>

          {/* Vraag 4 */}
          <fieldset style={{ border: "none", padding: 0, marginBottom: "2rem" }}>
            <legend
              className="font-body"
              style={{
                fontWeight: 600,
                color: "#1C3A2A",
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
                color: "#1C3A2A",
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

          {/* Contactgegevens */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "16px",
              padding: "1.5rem",
              marginBottom: "2rem",
              border: "1px solid #E8E0D4",
            }}
          >
            <p
              className="font-body"
              style={{
                fontWeight: 600,
                color: "#1C3A2A",
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
                    color: "#4A5E4E",
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
                    border: "1px solid #E8E0D4",
                    fontSize: "0.9rem",
                    color: "#1C3A2A",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#1C3A2A")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8E0D4")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-body"
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    color: "#4A5E4E",
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
                    border: "1px solid #E8E0D4",
                    fontSize: "0.9rem",
                    color: "#1C3A2A",
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#1C3A2A")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8E0D4")}
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
              backgroundColor: isValid && !bezig ? "#C4603A" : "#E8E0D4",
              color: isValid && !bezig ? "white" : "#8A9E8E",
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
              color: "#8A9E8E",
              marginTop: "1rem",
              lineHeight: 1.6,
            }}
          >
            Je gegevens worden alleen gebruikt om contact op te nemen. Geen spam, nooit gedeeld.
          </p>
        </form>
      </main>
    </div>
  );
}
