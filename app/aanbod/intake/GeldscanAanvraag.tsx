"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logGebeurtenis } from "@/lib/track";

/**
 * De aanvraagpagina voor de Geldscan (/aanbod/intake?pakket=geldscan).
 *
 * Dit is bewust geen intake en geen checkout, maar een korte aanvraag. De
 * betaling gaat met de hand: de bezoeker laat naam en e-mailadres achter, ik
 * neem contact op, stuur een betaalverzoek van 49 euro, en pas na betaling
 * vraag ik de gegevens op die ik nodig heb om het rapport te maken.
 *
 * Vraag hier dus nooit inkomen, woonlasten, uitgaven, gezinssamenstelling of
 * bankafschriften uit. Alles wat voor de betaling gevraagd wordt, is een
 * drempel voor iets wat de bezoeker nog niet gekocht heeft.
 *
 * Het adviesgesprek en het traject lopen nog via IntakeForm.tsx, dat formulier
 * is hier bewust niet mee veranderd.
 */

interface Props {
  /** Token van de gratis analyse, als de bezoeker daarvandaan komt. */
  token?: string;
}

const PROCES = [
  "Aanvraag verstuurd",
  "Ik neem contact op",
  "Betaalverzoek €49",
  "Meer informatie na betaling",
  "Jouw Geldscan",
];

const TRUST = [
  { titel: "Persoonlijk", regel: "Ik maak je Geldscan zelf." },
  { titel: "Vertrouwelijk", regel: "Ik ga zorgvuldig met je informatie om." },
  { titel: "Binnen 2 werkdagen", regel: "Na ontvangst van de complete informatie." },
];

const FAQ = [
  {
    vraag: "Wanneer betaal ik?",
    antwoord:
      "Na je aanvraag neem ik contact met je op en stuur ik een betaalverzoek van €49.",
  },
  {
    vraag: "Moet ik nu al bankafschriften aanleveren?",
    antwoord:
      "Nee. Dat is nu niet nodig. Na betaling vraag ik je om de informatie die voor jouw Geldscan nodig is. Bankafschriften kun je eventueel toevoegen voor extra detail.",
  },
  {
    vraag: "Wat moet ik nu invullen?",
    antwoord:
      "Alleen je naam, e-mailadres en eventueel waar je vooral duidelijkheid over wilt.",
  },
];

const VELD_STIJL: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  borderRadius: "10px",
  border: "1px solid #E6E9E7",
  backgroundColor: "white",
  fontSize: "0.95rem",
  color: "#16211F",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
  minHeight: "52px",
};

function LabelTekst({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-body"
      style={{
        display: "block",
        fontSize: "0.85rem",
        color: "#4A5A56",
        marginBottom: "0.4rem",
        fontWeight: 500,
      }}
    >
      {children}
    </label>
  );
}

/* Het pijltje van een open vraag. De rotatie zit op de omhullende span,
   zodat de svg zelf alleen vorm is en geen transform draagt. Zelfde vorm als
   op /geldscan, zodat de FAQ daar en hier hetzelfde aanvoelt. */
function Chevron() {
  return (
    <span
      aria-hidden="true"
      className="flex flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#8B958F"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9.5l6 6 6-6" />
      </svg>
    </span>
  );
}

function Proceslijn() {
  return (
    <div className="font-body">
      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#8B958F",
          marginBottom: "1.25rem",
        }}
      >
        Zo verloopt het
      </p>

      {/* Desktop: horizontaal */}
      <ol
        className="hidden sm:flex items-center"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        {PROCES.map((label, i) => {
          const isLaatste = i === PROCES.length - 1;
          return (
            <li
              key={label}
              className="flex items-center"
              style={{ flex: isLaatste ? "0 0 auto" : "1 1 auto" }}
            >
              <span
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: "1.75rem",
                  height: "1.75rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  backgroundColor: i === 0 ? "#0B7A6E" : "#E7F1EE",
                  color: i === 0 ? "white" : "#0B7A6E",
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  marginLeft: "0.5rem",
                  marginRight: isLaatste ? 0 : "0.75rem",
                  fontSize: "0.82rem",
                  color: "#16211F",
                }}
              >
                {label}
              </span>
              {!isLaatste && (
                <span style={{ flex: 1, height: "1px", backgroundColor: "#E6E9E7" }} />
              )}
            </li>
          );
        })}
      </ol>

      {/* Mobiel: verticaal */}
      <ol
        className="flex sm:hidden flex-col gap-3"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        {PROCES.map((label, i) => (
          <li key={label} className="flex items-center gap-3">
            <span
              className="flex items-center justify-center rounded-full shrink-0"
              style={{
                width: "1.6rem",
                height: "1.6rem",
                fontSize: "0.78rem",
                fontWeight: 600,
                backgroundColor: i === 0 ? "#0B7A6E" : "#E7F1EE",
                color: i === 0 ? "white" : "#0B7A6E",
              }}
            >
              {i + 1}
            </span>
            <span style={{ fontSize: "0.9rem", color: "#16211F" }}>{label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function GeldscanAanvraag({ token }: Props) {
  const router = useRouter();
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [vraag, setVraag] = useState("");
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);

  const isValid = naam.trim().length > 0 && email.includes("@") && email.includes(".");

  // --- Actie-meting (PII-vrij): gestart, hoe ver, verzonden ---
  const gestartRef = useRef(false);
  const verzondenRef = useRef(false);
  const veldenTotaal = 2;

  function ingevuldeVelden(): number {
    let n = 0;
    if (naam.trim()) n++;
    if (email.includes("@")) n++;
    return n;
  }

  useEffect(() => {
    if (!gestartRef.current && (ingevuldeVelden() > 0 || vraag.trim())) {
      gestartRef.current = true;
      logGebeurtenis("intake_gestart", { pakket: "geldscan" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naam, email, vraag]);

  useEffect(() => {
    function verlaten() {
      if (!gestartRef.current || verzondenRef.current) return;
      logGebeurtenis("intake_verlaten", {
        pakket: "geldscan",
        meta: { velden: ingevuldeVelden(), totaal: veldenTotaal },
      });
    }
    window.addEventListener("pagehide", verlaten);
    return () => window.removeEventListener("pagehide", verlaten);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naam, email]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || bezig) return;
    setBezig(true);
    setFout(null);

    const schoonNaam = naam.trim();
    const schoonEmail = email.trim().toLowerCase();
    const schoneVraag = vraag.trim() || null;

    try {
      const dbRes = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pakket: "geldscan",
          naam: schoonNaam,
          email: schoonEmail,
          grootste_knelpunt: schoneVraag,
          analyse_token: token ?? null,
        }),
      });

      if (!dbRes.ok) {
        const json = await dbRes.json().catch(() => null);
        throw new Error(json?.error || "Opslaan mislukt");
      }

      // De bevestigingsmail mag de aanvraag niet blokkeren: die staat op dit
      // punt al opgeslagen.
      const mailRes = await fetch("/api/send-intake-bevestiging", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          naam: schoonNaam,
          email: schoonEmail,
          pakket: "geldscan",
          situatie_details: schoneVraag,
        }),
      });
      if (!mailRes.ok) {
        console.error("Bevestigingsmail kon niet worden verstuurd");
      }

      verzondenRef.current = true;
      logGebeurtenis("intake_verzonden", {
        pakket: "geldscan",
        meta: { velden: veldenTotaal, totaal: veldenTotaal },
      });
      router.push("/aanbod/intake/bedankt?pakket=geldscan");
    } catch (err) {
      console.error(err);
      setFout("Er ging iets mis. Probeer het nog eens of mail naar hallo@waarblijfthet.nl.");
      setBezig(false);
    }
  }

  return (
    <div style={{ backgroundColor: "#F7F8F7", minHeight: "100vh" }}>
      <header
        style={{
          backgroundColor: "#F7F8F7",
          borderBottom: "1px solid #E6E9E7",
          padding: "0 1.25rem",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/geldscan"
          className="font-body"
          style={{ color: "#4A5A56", fontSize: "0.85rem", textDecoration: "none" }}
        >
          &larr; Terug naar de Geldscan
        </Link>
        <span className="font-display font-light" style={{ color: "#16211F", fontSize: "1rem" }}>
          Waar blijft het
        </span>
      </header>

      <main style={{ padding: "2.5rem 1.25rem 5rem" }}>
        <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-2 lg:grid-rows-[auto_1fr_auto] lg:items-start">
          {/* Intro: links op desktop, bovenaan op mobiel */}
          <div className="order-1 lg:col-start-1 lg:row-start-1">
            <p
              className="font-body"
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#0B7A6E",
                marginBottom: "1rem",
              }}
            >
              Geldscan aanvragen
            </p>
            <h1
              className="font-display font-light text-[#16211F]"
              style={{
                fontSize: "clamp(1.9rem, 5vw, 2.75rem)",
                lineHeight: 1.15,
                marginBottom: "1.25rem",
              }}
            >
              Vraag je Geldscan aan.
            </h1>
            <p
              className="font-body"
              style={{ color: "#4A5A56", fontSize: "1rem", lineHeight: 1.75, maxWidth: "34rem" }}
            >
              Ik neem contact met je op en stuur je een betaalverzoek van &euro;49. Na betaling
              vraag ik je om de informatie die ik nodig heb om jouw Geldscan te maken.
            </p>
          </div>

          {/* Formulier: rechts op desktop, direct onder de intro op mobiel */}
          <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid #E6E9E7",
                borderRadius: "16px",
                padding: "1.75rem 1.5rem",
              }}
            >
              <h2
                className="font-body"
                style={{
                  fontWeight: 600,
                  color: "#16211F",
                  fontSize: "1.05rem",
                  marginBottom: "0.4rem",
                }}
              >
                Jouw gegevens
              </h2>
              <p
                className="font-body"
                style={{
                  color: "#4A5A56",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  marginBottom: "1.5rem",
                }}
              >
                Laat je gegevens achter. Meer hoef je nu nog niet in te vullen.
              </p>

              {token && (
                <p
                  className="font-body"
                  style={{
                    backgroundColor: "#E7F1EE",
                    border: "1px solid #CFE6E0",
                    borderRadius: "10px",
                    padding: "0.7rem 0.9rem",
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                    color: "#16211F",
                    marginBottom: "1.25rem",
                  }}
                >
                  Je analyse is aan deze aanvraag gekoppeld.
                </p>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "1.1rem" }}>
                  <LabelTekst htmlFor="voornaam">Voornaam</LabelTekst>
                  <input
                    id="voornaam"
                    name="voornaam"
                    type="text"
                    autoComplete="given-name"
                    value={naam}
                    onChange={(e) => setNaam(e.target.value.slice(0, 80))}
                    placeholder="Bijv. Jan"
                    required
                    style={VELD_STIJL}
                    onFocus={(e) => (e.target.style.borderColor = "#16211F")}
                    onBlur={(e) => (e.target.style.borderColor = "#E6E9E7")}
                  />
                </div>

                <div style={{ marginBottom: "1.1rem" }}>
                  <LabelTekst htmlFor="email">E-mailadres</LabelTekst>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Bijv. jan@mail.nl"
                    required
                    style={VELD_STIJL}
                    onFocus={(e) => (e.target.style.borderColor = "#16211F")}
                    onBlur={(e) => (e.target.style.borderColor = "#E6E9E7")}
                  />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <LabelTekst htmlFor="vraag">
                    Waar wil je dat ik vooral naar kijk? (optioneel)
                  </LabelTekst>
                  <div style={{ position: "relative" }}>
                    <textarea
                      id="vraag"
                      name="vraag"
                      value={vraag}
                      onChange={(e) => setVraag(e.target.value.slice(0, 300))}
                      placeholder="Bijvoorbeeld: ik begrijp niet waarom we ondanks ons inkomen zo weinig overhouden."
                      rows={4}
                      style={{
                        ...VELD_STIJL,
                        minHeight: "120px",
                        lineHeight: 1.6,
                        resize: "vertical",
                        paddingBottom: "1.9rem",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#16211F")}
                      onBlur={(e) => (e.target.style.borderColor = "#E6E9E7")}
                    />
                    <span
                      className="font-body"
                      style={{
                        position: "absolute",
                        bottom: "0.7rem",
                        right: "0.9rem",
                        fontSize: "0.75rem",
                        color: vraag.length >= 270 ? "#0B7A6E" : "#8B958F",
                      }}
                    >
                      {vraag.length}/300
                    </span>
                  </div>
                </div>

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
                      marginBottom: "1.25rem",
                    }}
                  >
                    {fout}
                  </div>
                )}

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
                    minHeight: "56px",
                    cursor: isValid && !bezig ? "pointer" : "not-allowed",
                    fontFamily: "inherit",
                    transition: "background-color 0.2s",
                  }}
                >
                  {bezig ? "Bezig\u2026" : "Aanvraag versturen \u2192"}
                </button>

                <p
                  className="font-body"
                  style={{
                    textAlign: "center",
                    fontSize: "0.85rem",
                    color: "#4A5A56",
                    lineHeight: 1.6,
                    marginTop: "0.9rem",
                  }}
                >
                  Ik neem daarna persoonlijk contact met je op.
                </p>
                <p
                  className="font-body"
                  style={{
                    textAlign: "center",
                    fontSize: "0.78rem",
                    color: "#8B958F",
                    lineHeight: 1.6,
                    marginTop: "0.5rem",
                  }}
                >
                  <Link href="/privacy" style={{ color: "#8B958F" }}>
                    Privacyverklaring
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Proces: onder beide kolommen op desktop, boven de trustpunten op mobiel */}
          <div className="order-3 lg:col-start-1 lg:col-span-2 lg:row-start-3">
            <div style={{ borderTop: "1px solid #E6E9E7", paddingTop: "2rem" }}>
              <Proceslijn />
            </div>
          </div>

          {/* Trustpunten: linkerkolom onder de intro op desktop, onderaan op mobiel */}
          <div className="order-4 lg:col-start-1 lg:row-start-2">
            <ul
              className="font-body flex flex-col gap-5"
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {TRUST.map((p) => (
                <li key={p.titel}>
                  <p
                    style={{
                      fontWeight: 600,
                      color: "#16211F",
                      fontSize: "0.95rem",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {p.titel}
                  </p>
                  <p style={{ color: "#4A5A56", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    {p.regel}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Veelgestelde vragen */}
        <div
          className="mx-auto max-w-[1080px]"
          style={{ marginTop: "3.5rem", borderTop: "1px solid #E6E9E7", paddingTop: "2.5rem" }}
        >
          <p
            className="font-body"
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#8B958F",
              marginBottom: "1.25rem",
            }}
          >
            Veelgestelde vragen
          </p>
          <div className="flex flex-col gap-3" style={{ maxWidth: "44rem" }}>
            {FAQ.map((f) => (
              <details
                key={f.vraag}
                className="font-body group"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #E6E9E7",
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                }}
              >
                <summary
                  className="flex cursor-pointer select-none items-center justify-between gap-4"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#16211F",
                  }}
                >
                  <span>{f.vraag}</span>
                  <Chevron />
                </summary>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#4A5A56",
                    lineHeight: 1.7,
                    marginTop: "0.75rem",
                  }}
                >
                  {f.antwoord}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
