"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { logGebeurtenis } from "@/lib/track";
import { SITUATIE_OPTIES } from "./opties";

/**
 * De aanvraagpagina voor de Geldscan (/aanbod/intake?pakket=geldscan).
 *
 * Dit is bewust geen intake en geen checkout, maar een korte aanvraag. De
 * betaling gaat met de hand: de bezoeker laat contactgegevens achter, ik neem
 * contact op, stuur een betaalverzoek van 49 euro, en pas na betaling vraag ik
 * de gegevens op die ik nodig heb om het rapport te maken.
 *
 * Vraag hier dus nooit inkomen, woonlasten, uitgaven, auto, hypotheek of
 * bankafschriften uit. Alleen voornaam en e-mailadres zijn verplicht; situatie
 * en het berichtveld zijn optioneel en mogen leeg blijven.
 *
 * Het adviesgesprek en het traject lopen nog via IntakeForm.tsx, dat formulier
 * is hier bewust niet mee veranderd.
 */

interface Props {
  /** Token van de gratis analyse, als de bezoeker daarvandaan komt. */
  token?: string;
}

const GROEN = "#0B7A6E";
const DONKER = "#16211F";
const ZACHT = "#4A5A56";
const GRIJS = "#8B958F";
const RAND = "#E6E9E7";
const LICHTGROEN = "#E7F1EE";

const WAARDEN = [
  {
    icoon: "persoon" as const,
    titel: "Persoonlijk geschreven",
    regel: "Geen standaardrapport.",
  },
  {
    icoon: "schild" as const,
    titel: "Je ziet het rekenwerk",
    regel: "De cijfers en de conclusie staan er allebei in.",
  },
  {
    icoon: "klok" as const,
    titel: "Binnen 2 werkdagen",
    regel: "Je ontvangt het rapport per e-mail.",
  },
];

const STAPPEN = [
  {
    icoon: "verstuur" as const,
    titel: "Aanvraag verstuurd",
    regel: "Je vult het formulier in en verstuurt je aanvraag.",
  },
  {
    icoon: "mail" as const,
    titel: "Ik neem contact op",
    regel: "Ik bekijk je aanvraag en neem contact met je op.",
  },
  {
    icoon: "euro" as const,
    titel: "Betaalverzoek",
    regel: "Je ontvangt een betaalverzoek voor de Geldscan (€49).",
  },
  {
    icoon: "document" as const,
    titel: "Meer informatie",
    regel: "Na betaling vraag ik je om meer informatie voor je scan.",
  },
  {
    icoon: "grafiek" as const,
    titel: "Jouw Geldscan",
    regel: "Ik maak het rapport en stuur het binnen 2 werkdagen naar je op.",
  },
];

const FAQ = [
  {
    vraag: "Wanneer ontvang ik een betaalverzoek?",
    antwoord:
      "Nadat ik je aanvraag heb gelezen neem ik contact met je op en stuur ik je een betaalverzoek van €49.",
  },
  {
    vraag: "Moet ik nu al bankafschriften aanleveren?",
    antwoord:
      "Nee. Dat is nu niet nodig. Na betaling vraag ik je om de informatie die voor jouw Geldscan nodig is. Bankafschriften kun je eventueel toevoegen voor extra detail.",
  },
  {
    vraag: "Hoe lang duurt het voordat ik mijn Geldscan ontvang?",
    antwoord:
      "Zodra je informatie compleet is schrijf ik je rapport en stuur ik het binnen 2 werkdagen per e-mail.",
  },
];

type IcoonNaam =
  | "persoon"
  | "schild"
  | "klok"
  | "verstuur"
  | "mail"
  | "euro"
  | "document"
  | "grafiek"
  | "slot";

/* Alle iconen in één component, zodat de paden op één plek staan en overal
   dezelfde lijndikte en afronding krijgen. */
function Icoon({ naam, grootte = 20 }: { naam: IcoonNaam; grootte?: number }) {
  const paden: Record<IcoonNaam, React.ReactNode> = {
    persoon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    schild: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 11 11 13 15 9" />
      </>
    ),
    klok: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 14" />
      </>
    ),
    verstuur: (
      <>
        <path d="M21 3L10.5 13.5" />
        <path d="M21 3l-6.5 18-4-8-8-4L21 3z" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <polyline points="3.5 6.5 12 13 20.5 6.5" />
      </>
    ),
    euro: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15.5 8.5a4 4 0 0 0-6.6 1.6" />
        <path d="M15.5 15.5a4 4 0 0 1-6.6-1.6" />
        <path d="M7.5 11h6" />
        <path d="M7.5 13.5h6" />
      </>
    ),
    document: (
      <>
        <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
        <polyline points="14 3 14 8 19 8" />
        <path d="M8.5 13h7" />
        <path d="M8.5 16.5h4.5" />
      </>
    ),
    grafiek: (
      <>
        <path d="M6 20v-6" />
        <path d="M12 20V8" />
        <path d="M18 20v-9" />
      </>
    ),
    slot: (
      <>
        <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
      </>
    ),
  };

  return (
    <svg
      width={grootte}
      height={grootte}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paden[naam]}
    </svg>
  );
}

/* Rond vlak met een icoon erin, zoals in de hero en de processtappen. */
function IcoonBol({ naam, grootte = 44 }: { naam: IcoonNaam; grootte?: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-full shrink-0"
      style={{
        width: grootte,
        height: grootte,
        backgroundColor: LICHTGROEN,
        color: GROEN,
      }}
    >
      <Icoon naam={naam} grootte={Math.round(grootte * 0.45)} />
    </span>
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
      style={{ color: GRIJS }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9.5l6 6 6-6" />
      </svg>
    </span>
  );
}

const VELD_STIJL: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  borderRadius: "10px",
  border: `1px solid ${RAND}`,
  backgroundColor: "white",
  fontSize: "0.95rem",
  color: DONKER,
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
  minHeight: "52px",
};

function LabelTekst({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-body"
      style={{
        display: "block",
        fontSize: "0.85rem",
        color: ZACHT,
        marginBottom: "0.4rem",
        fontWeight: 500,
      }}
    >
      {children}
    </label>
  );
}

/* De vijf stappen. Op desktop naast elkaar met een lijn ertussen, op mobiel
   onder elkaar. De iconen staan in beide varianten voor de tekst, zodat de
   stap herkenbaar blijft zonder de regel te lezen. */
function Proceslijn() {
  return (
    <div className="font-body">
      <h2
        className="font-display font-light"
        style={{
          color: DONKER,
          fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)",
          textAlign: "center",
          marginBottom: "2.25rem",
        }}
      >
        Zo verloopt het
      </h2>

      {/* Desktop */}
      <ol
        className="hidden sm:grid"
        style={{
          gridTemplateColumns: `repeat(${STAPPEN.length}, minmax(0, 1fr))`,
          listStyle: "none",
          padding: 0,
          margin: 0,
          gap: "0.5rem",
        }}
      >
        {STAPPEN.map((s, i) => (
          <li key={s.titel}>
            <div className="flex items-center" style={{ marginBottom: "1rem" }}>
              <IcoonBol naam={s.icoon} />
              {i < STAPPEN.length - 1 && (
                <span style={{ flex: 1, height: "1px", backgroundColor: RAND }} />
              )}
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: DONKER,
                marginBottom: "0.35rem",
                paddingRight: "0.75rem",
              }}
            >
              {i + 1}. {s.titel}
            </p>
            <p
              style={{
                fontSize: "0.8rem",
                color: ZACHT,
                lineHeight: 1.6,
                paddingRight: "0.75rem",
              }}
            >
              {s.regel}
            </p>
          </li>
        ))}
      </ol>

      {/* Mobiel */}
      <ol
        className="flex sm:hidden flex-col"
        style={{ listStyle: "none", padding: 0, margin: 0, gap: "1.25rem" }}
      >
        {STAPPEN.map((s) => (
          <li key={s.titel} className="flex items-start gap-3">
            <IcoonBol naam={s.icoon} grootte={38} />
            <div style={{ paddingTop: "0.15rem" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: DONKER, marginBottom: "0.2rem" }}>
                {s.titel}
              </p>
              <p style={{ fontSize: "0.85rem", color: ZACHT, lineHeight: 1.6 }}>{s.regel}</p>
            </div>
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
  const [situatie, setSituatie] = useState("");
  const [bericht, setBericht] = useState("");
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
    if (!gestartRef.current && (ingevuldeVelden() > 0 || situatie || bericht.trim())) {
      gestartRef.current = true;
      logGebeurtenis("intake_gestart", { pakket: "geldscan" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [naam, email, situatie, bericht]);

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
    const schoonBericht = bericht.trim() || null;

    try {
      const dbRes = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pakket: "geldscan",
          naam: schoonNaam,
          email: schoonEmail,
          gezinssituatie: situatie || null,
          grootste_knelpunt: schoonBericht,
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
          situatie_details: schoonBericht,
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
        className="px-5 sm:px-8"
        style={{
          backgroundColor: "white",
          borderBottom: `1px solid ${RAND}`,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/geldscan"
          className="font-display font-light"
          style={{ color: DONKER, fontSize: "1.15rem", textDecoration: "none" }}
        >
          Waar blijft het
        </Link>
        <span
          className="font-body hidden sm:block"
          style={{ color: GRIJS, fontSize: "0.8rem" }}
        >
          Persoonlijk geschreven. Binnen 2 werkdagen.
        </span>
      </header>

      <main className="px-5 pb-20 sm:px-8">
        {/* ── Hero: links de belofte, rechts het formulier ───────────────── */}
        <section
          className="mx-auto grid max-w-[1080px] grid-cols-1 items-start gap-x-14 gap-y-10 lg:grid-cols-[0.95fr_1.05fr]"
          style={{ paddingTop: "3rem" }}
        >
          <div>
            <p
              className="font-body"
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: GROEN,
                marginBottom: "1rem",
              }}
            >
              Geldscan aanmelden
            </p>
            <h1
              className="font-display font-light"
              style={{
                color: DONKER,
                fontSize: "clamp(1.9rem, 5vw, 3rem)",
                lineHeight: 1.12,
                marginBottom: "1.25rem",
              }}
            >
              Vraag je Geldscan aan.
            </h1>
            <p
              className="font-body"
              style={{ color: ZACHT, fontSize: "1rem", lineHeight: 1.75, maxWidth: "32rem" }}
            >
              Ik neem contact met je op, stuur je een betaalverzoek van €49 en vraag na betaling
              om meer informatie. Daarna maak ik jouw persoonlijke Geldscan.
            </p>

            <ul
              className="font-body flex flex-col"
              style={{ listStyle: "none", padding: 0, margin: "2.25rem 0 0", gap: "1.5rem" }}
            >
              {WAARDEN.map((w) => (
                <li key={w.titel} className="flex items-start gap-4">
                  <IcoonBol naam={w.icoon} />
                  <div style={{ paddingTop: "0.25rem" }}>
                    <p style={{ fontWeight: 600, color: DONKER, fontSize: "0.95rem", marginBottom: "0.15rem" }}>
                      {w.titel}
                    </p>
                    <p style={{ color: ZACHT, fontSize: "0.88rem", lineHeight: 1.6 }}>{w.regel}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulier */}
          <div
            id="aanvraag"
            style={{
              backgroundColor: "white",
              border: `1px solid ${RAND}`,
              borderRadius: "16px",
              padding: "1.75rem 1.5rem",
              boxShadow: "0 1px 2px rgba(22, 33, 31, 0.04)",
            }}
          >
            <h2
              className="font-body"
              style={{ fontWeight: 600, color: DONKER, fontSize: "1.1rem", marginBottom: "0.35rem" }}
            >
              Jouw gegevens
            </h2>
            <p
              className="font-body"
              style={{ color: ZACHT, fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}
            >
              Vul je gegevens in, dan neem ik contact met je op.
            </p>

            {token && (
              <p
                className="font-body"
                style={{
                  backgroundColor: LICHTGROEN,
                  border: "1px solid #CFE6E0",
                  borderRadius: "10px",
                  padding: "0.7rem 0.9rem",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: DONKER,
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
                  onFocus={(e) => (e.target.style.borderColor = DONKER)}
                  onBlur={(e) => (e.target.style.borderColor = RAND)}
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
                  onFocus={(e) => (e.target.style.borderColor = DONKER)}
                  onBlur={(e) => (e.target.style.borderColor = RAND)}
                />
              </div>

              <div style={{ marginBottom: "1.1rem" }}>
                <LabelTekst htmlFor="situatie">Situatie (optioneel)</LabelTekst>
                <select
                  id="situatie"
                  name="situatie"
                  value={situatie}
                  onChange={(e) => setSituatie(e.target.value)}
                  style={{
                    ...VELD_STIJL,
                    color: situatie ? DONKER : GRIJS,
                    appearance: "none",
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238B958F' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9.5l6 6 6-6'/></svg>\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    paddingRight: "2.75rem",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = DONKER)}
                  onBlur={(e) => (e.target.style.borderColor = RAND)}
                >
                  <option value="">Kies je situatie</option>
                  {SITUATIE_OPTIES.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: "1.25rem" }}>
                <LabelTekst htmlFor="bericht">Bericht (optioneel)</LabelTekst>
                <div style={{ position: "relative" }}>
                  <textarea
                    id="bericht"
                    name="bericht"
                    value={bericht}
                    onChange={(e) => setBericht(e.target.value.slice(0, 300))}
                    placeholder="Waar wil je dat ik vooral naar kijk?"
                    rows={4}
                    style={{
                      ...VELD_STIJL,
                      minHeight: "116px",
                      lineHeight: 1.6,
                      resize: "vertical",
                      paddingBottom: "1.9rem",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = DONKER)}
                    onBlur={(e) => (e.target.style.borderColor = RAND)}
                  />
                  <span
                    className="font-body"
                    style={{
                      position: "absolute",
                      bottom: "0.7rem",
                      right: "0.9rem",
                      fontSize: "0.75rem",
                      color: bericht.length >= 270 ? GROEN : GRIJS,
                    }}
                  >
                    {bericht.length} / 300
                  </span>
                </div>
              </div>

              {/* Wat er na het versturen gebeurt, vlak boven de knop, want
                  daar wordt de beslissing genomen. */}
              <div
                className="font-body flex items-start gap-3"
                style={{
                  backgroundColor: "#F5F3EE",
                  border: "1px solid #E8E3D8",
                  borderRadius: "12px",
                  padding: "0.9rem 1rem",
                  marginBottom: "1.25rem",
                }}
              >
                <span style={{ color: GRIJS, paddingTop: "0.1rem" }}>
                  <Icoon naam="mail" />
                </span>
                <div>
                  <p style={{ fontWeight: 600, color: DONKER, fontSize: "0.88rem", marginBottom: "0.25rem" }}>
                    Wat gebeurt er daarna?
                  </p>
                  <p style={{ color: ZACHT, fontSize: "0.85rem", lineHeight: 1.6 }}>
                    Ik neem contact met je op en stuur je een betaalverzoek. Na betaling vraag ik je
                    om meer informatie voor je Geldscan.
                  </p>
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
                  backgroundColor: isValid && !bezig ? GROEN : RAND,
                  color: isValid && !bezig ? "white" : GRIJS,
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
                className="font-body flex items-center justify-center gap-2"
                style={{ fontSize: "0.8rem", color: GRIJS, marginTop: "0.9rem" }}
              >
                <span style={{ color: GRIJS }}>
                  <Icoon naam="slot" grootte={14} />
                </span>
                Je gegevens zijn veilig en vertrouwelijk.
              </p>
            </form>
          </div>
        </section>

        {/* ── Zo verloopt het ─────────────────────────────────────────── */}
        <section
          className="mx-auto max-w-[1080px]"
          style={{
            backgroundColor: "white",
            border: `1px solid ${RAND}`,
            borderRadius: "16px",
            padding: "2.25rem 1.5rem",
            marginTop: "3rem",
          }}
        >
          <Proceslijn />

          {/* ── Vertrouwen: wat er met je gegevens gebeurt, en wie het maakt */}
          <div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            style={{
              backgroundColor: "#F7F8F7",
              borderRadius: "12px",
              padding: "1.5rem",
              marginTop: "2.5rem",
            }}
          >
            <div className="font-body flex items-start gap-3">
              <IcoonBol naam="schild" grootte={40} />
              <div style={{ paddingTop: "0.15rem" }}>
                <p style={{ fontWeight: 600, color: DONKER, fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                  Je gegevens zijn veilig
                </p>
                <p style={{ color: ZACHT, fontSize: "0.85rem", lineHeight: 1.6 }}>
                  Ik ga zorgvuldig en vertrouwelijk om met je informatie. Geen spam, nooit
                  doorverkocht.{" "}
                  <Link href="/privacy" style={{ color: GROEN }}>
                    Privacyverklaring
                  </Link>
                </p>
              </div>
            </div>

            <div className="font-body flex items-start gap-3">
              <span
                className="rounded-full overflow-hidden shrink-0"
                style={{ width: 40, height: 40, backgroundColor: DONKER }}
              >
                <Image
                  src="/jarno.jpg"
                  alt="Jarno Koopman"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </span>
              <div style={{ paddingTop: "0.15rem" }}>
                <p style={{ fontWeight: 600, color: DONKER, fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                  Persoonlijk door Jarno
                </p>
                <p style={{ color: ZACHT, fontSize: "0.85rem", lineHeight: 1.6 }}>
                  Ik schrijf elke Geldscan zelf. Je hebt direct contact met mij.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Veelgestelde vragen ─────────────────────────────────────── */}
        <section className="mx-auto max-w-[720px]" style={{ marginTop: "3rem" }}>
          <h2
            className="font-display font-light"
            style={{
              color: DONKER,
              fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)",
              textAlign: "center",
              marginBottom: "1.5rem",
            }}
          >
            Veelgestelde vragen
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ.map((f) => (
              <details
                key={f.vraag}
                className="font-body group"
                style={{
                  backgroundColor: "white",
                  border: `1px solid ${RAND}`,
                  borderRadius: "12px",
                  padding: "1rem 1.25rem",
                }}
              >
                <summary
                  className="flex cursor-pointer select-none items-center justify-between gap-4"
                  style={{ fontSize: "0.95rem", fontWeight: 600, color: DONKER }}
                >
                  <span>{f.vraag}</span>
                  <Chevron />
                </summary>
                <p style={{ fontSize: "0.9rem", color: ZACHT, lineHeight: 1.7, marginTop: "0.75rem" }}>
                  {f.antwoord}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── Slot: terug naar het formulier ──────────────────────────── */}
        <section
          className="mx-auto max-w-[1080px] flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left"
          style={{
            backgroundColor: LICHTGROEN,
            border: "1px solid #CFE6E0",
            borderRadius: "16px",
            padding: "2rem 1.75rem",
            marginTop: "3rem",
          }}
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
            <IcoonBol naam="document" grootte={48} />
            <div>
              <h2
                className="font-display font-light"
                style={{ color: DONKER, fontSize: "1.4rem", marginBottom: "0.35rem" }}
              >
                Klaar voor inzicht?
              </h2>
              <p className="font-body" style={{ color: ZACHT, fontSize: "0.92rem", lineHeight: 1.6 }}>
                Vraag je Geldscan aan en zie wat er in jouw cijfers opvalt.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 shrink-0">
            <a
              href="#aanvraag"
              className="font-body"
              style={{
                backgroundColor: GROEN,
                color: "white",
                fontSize: "0.95rem",
                fontWeight: 600,
                padding: "0.9rem 1.75rem",
                borderRadius: "12px",
                textDecoration: "none",
                display: "inline-block",
                minHeight: "52px",
                lineHeight: "1.9",
              }}
            >
              Aanvraag versturen &rarr;
            </a>
            <p className="font-body" style={{ color: GRIJS, fontSize: "0.8rem" }}>
              €49 eenmalig &middot; Binnen 2 werkdagen
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
