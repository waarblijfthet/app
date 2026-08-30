"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { logGebeurtenis } from "@/lib/track";

/**
 * De aanvraagpagina voor het adviesgesprek (/aanbod/intake?pakket=gesprek).
 *
 * Dit is een korte aanvraag, geen intake. De bezoeker laat naam en e-mailadres
 * achter, geeft aan of hij al een Geldscan heeft en mag optioneel in 300 tekens
 * kwijt waar het gesprek over moet gaan. Daarna neem ik met de hand contact op
 * om het gesprek in te plannen en stuur ik het betaalverzoek.
 *
 * Vraag hier dus nooit inkomen, woonlasten, uitgaven of een gewenste startdatum
 * uit. Dat waren de vragen van het oude IntakeForm en die zijn er bewust uit:
 * financiele details horen in het gesprek zelf, niet in een formulier voor iets
 * wat nog niet gekocht is.
 *
 * De Geldscan-vraag is informatief en nooit blokkerend. Wie "Nee, nog niet"
 * kiest gaat gewoon verder, zonder waarschuwing en zonder omleiding.
 *
 * Feiten komen uit lib/aanbod-content.ts (PAKKET_INFO.gesprek) en staan gelijk
 * aan /adviesgesprek: 125 euro, 45 minuten, online via Google Meet.
 *
 * Het traject loopt nog via IntakeForm.tsx, dat formulier is hier niet mee
 * veranderd. De Geldscan heeft zijn eigen aanvraag in GeldscanAanvraag.tsx.
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

const PRIJS = "\u20AC125";
const DUUR = "45 minuten";
const KANAAL = "Online via Google Meet";

const WAARDEN = [
  {
    icoon: "persoon" as const,
    titel: "Persoonlijk",
    regel: "Advies afgestemd op jouw situatie.",
  },
  {
    icoon: "vinkje" as const,
    titel: "Praktisch",
    regel: "Concrete keuzes en vervolgstappen.",
  },
  {
    icoon: "schild" as const,
    titel: "Onafhankelijk",
    regel: "Geen producten of provisies.",
  },
];

/* Stap 1 is op deze pagina net gebeurd, daarom staan de stappen hier anders
   dan op /adviesgesprek. Daar begint de reeks bij aanmelden, hier bij de
   aanvraag die de bezoeker zojuist verstuurt. */
const STAPPEN = [
  {
    icoon: "verstuur" as const,
    titel: "Aanvraag verstuurd",
    regel: "Je vult het formulier in en stuurt je aanvraag.",
  },
  {
    icoon: "mail" as const,
    titel: "Ik neem contact op",
    regel: "Ik stem samen met jou een moment af dat jou uitkomt.",
  },
  {
    icoon: "gesprek" as const,
    titel: "Het gesprek",
    regel: "45 minuten via Google Meet. Ik loop je cijfers en je vragen met je door.",
  },
  {
    icoon: "doel" as const,
    titel: "Richting bepalen",
    regel: "Je krijgt concrete aandachtspunten en vervolgstappen.",
  },
  {
    icoon: "document" as const,
    titel: "Daarna beslis jij",
    regel: "Je bepaalt zelf wat je met het advies doet.",
  },
];

const OPBRENGST = [
  {
    icoon: "vergrootglas" as const,
    titel: "Inzicht",
    regel: "Je begrijpt beter waar je financi\u00eble ruimte zit.",
  },
  {
    icoon: "sorteren" as const,
    titel: "Prioriteiten",
    regel: "Je weet welke zaken het meeste aandacht verdienen.",
  },
  {
    icoon: "kompas" as const,
    titel: "Richting",
    regel: "Je hebt een concreet beeld van je volgende stap.",
  },
  {
    icoon: "rust" as const,
    titel: "Rust",
    regel: "Je hoeft het niet meer alleen uit te zoeken.",
  },
];

/* Zelfde antwoorden als op /adviesgesprek, want een bezoeker die daar iets
   heeft gelezen mag hier geen ander verhaal krijgen. */
const FAQ = [
  {
    vraag: "Wat kost het adviesgesprek?",
    antwoord:
      "\u20AC125 eenmalig voor 45 minuten. Na je aanvraag neem ik contact op en stuur ik je een betaalverzoek. Geen abonnement, geen traject.",
  },
  {
    vraag: "Wat moet ik voorbereiden?",
    antwoord:
      "Leg je cijfers klaar en bedenk in \u00e9\u00e9n zin wat je grootste vraag is. Een paar recente bankafschriften mogen, dat hoeft niet. Ik laat vooraf weten wat voor jouw situatie handig is.",
  },
  {
    vraag: "Kan ik mijn Geldscan meenemen in het gesprek?",
    antwoord:
      "Ja. Heb je al een Geldscan, dan is dat rapport het vertrekpunt en hoef je niets opnieuw aan te leveren. De \u20AC49 verreken ik met de prijs van het gesprek.",
  },
  {
    vraag: "Is het gesprek een verplicht onderdeel van een traject?",
    antwoord:
      "Nee. Het gesprek is eenmalig en op zichzelf compleet. Je gaat weg met concrete aandachtspunten waar je zelf mee verder kunt.",
  },
  {
    vraag: "Hoe vindt het gesprek plaats?",
    antwoord:
      "Online via Google Meet. Achteraf krijg je een korte schriftelijke samenvatting, en daarna verwijder ik alles wat je hebt aangeleverd.",
  },
];

/* De enige inhoudelijke vraag van dit formulier. Beide antwoorden leiden naar
   dezelfde volgende stap, het antwoord bepaalt alleen waarmee ik het gesprek
   begin. */
const GELDSCAN_KEUZES = [
  {
    waarde: "ja" as const,
    titel: "Ja, ik heb mijn Geldscan gedaan",
    regel: "Ik wil mijn uitkomst bespreken.",
  },
  {
    waarde: "nee" as const,
    titel: "Nee, nog niet",
    regel: "Geen probleem, ik begin dan bij jouw situatie.",
  },
];

type IcoonNaam =
  | "persoon"
  | "vinkje"
  | "schild"
  | "verstuur"
  | "mail"
  | "gesprek"
  | "doel"
  | "document"
  | "vergrootglas"
  | "sorteren"
  | "kompas"
  | "rust"
  | "slot";

/* Een set lijniconen, dezelfde vorm en lijndikte als op /adviesgesprek,
   /geldscan en de Geldscan-aanvraag. */
function Icoon({ naam, grootte = 20 }: { naam: IcoonNaam; grootte?: number }) {
  const paden: Record<IcoonNaam, React.ReactNode> = {
    persoon: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    vinkje: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polyline points="8.5 12 11 14.5 15.5 9.5" />
      </>
    ),
    schild: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 11 11 13 15 9" />
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
    gesprek: (
      <>
        <path d="M20 14a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
        <path d="M8.5 10h7" />
        <path d="M8.5 13h4" />
      </>
    ),
    doel: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1" />
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
    vergrootglas: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="M16 16l4.5 4.5" />
      </>
    ),
    sorteren: (
      <>
        <path d="M4 7h13" />
        <path d="M4 12h9" />
        <path d="M4 17h5" />
        <polyline points="17 14 20 17 17 20" />
      </>
    ),
    kompas: (
      <>
        <circle cx="12" cy="12" r="9" />
        <polygon points="15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5" />
      </>
    ),
    rust: (
      <>
        <path d="M12 21s-7-4.5-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 3.5c0 5-7 9.5-7 9.5z" />
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

function IcoonBol({ naam, grootte = 44 }: { naam: IcoonNaam; grootte?: number }) {
  return (
    <span
      className="flex items-center justify-center rounded-full shrink-0"
      style={{ width: grootte, height: grootte, backgroundColor: LICHTGROEN, color: GROEN }}
    >
      <Icoon naam={naam} grootte={Math.round(grootte * 0.45)} />
    </span>
  );
}

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
   onder elkaar. Zelfde opbouw als op de Geldscan-aanvraag, zodat de twee
   aanvraagpagina's hetzelfde aanvoelen. */
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
        Zo verloopt het adviesgesprek
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
        {STAPPEN.map((s, i) => (
          <li key={s.titel} className="flex items-start gap-3">
            <IcoonBol naam={s.icoon} grootte={38} />
            <div style={{ paddingTop: "0.15rem" }}>
              <p style={{ fontSize: "0.9rem", fontWeight: 600, color: DONKER, marginBottom: "0.2rem" }}>
                {i + 1}. {s.titel}
              </p>
              <p style={{ fontSize: "0.85rem", color: ZACHT, lineHeight: 1.6 }}>{s.regel}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function GesprekAanvraag({ token }: Props) {
  const router = useRouter();
  const [geldscanGedaan, setGeldscanGedaan] = useState<"" | "ja" | "nee">("");
  const [naam, setNaam] = useState("");
  const [email, setEmail] = useState("");
  const [onderwerp, setOnderwerp] = useState("");
  const [bezig, setBezig] = useState(false);
  const [fout, setFout] = useState<string | null>(null);

  const isValid =
    geldscanGedaan !== "" &&
    naam.trim().length > 0 &&
    email.includes("@") &&
    email.includes(".");

  // --- Actie-meting (PII-vrij): gestart, hoe ver, verzonden ---
  const gestartRef = useRef(false);
  const verzondenRef = useRef(false);
  const veldenTotaal = 3;

  function ingevuldeVelden(): number {
    let n = 0;
    if (geldscanGedaan) n++;
    if (naam.trim()) n++;
    if (email.includes("@")) n++;
    return n;
  }

  useEffect(() => {
    if (!gestartRef.current && (ingevuldeVelden() > 0 || onderwerp.trim())) {
      gestartRef.current = true;
      logGebeurtenis("intake_gestart", { pakket: "gesprek" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geldscanGedaan, naam, email, onderwerp]);

  useEffect(() => {
    function verlaten() {
      if (!gestartRef.current || verzondenRef.current) return;
      logGebeurtenis("intake_verlaten", {
        pakket: "gesprek",
        meta: { velden: ingevuldeVelden(), totaal: veldenTotaal },
      });
    }
    window.addEventListener("pagehide", verlaten);
    return () => window.removeEventListener("pagehide", verlaten);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geldscanGedaan, naam, email]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid || bezig) return;
    setBezig(true);
    setFout(null);

    const schoonNaam = naam.trim();
    const schoonEmail = email.trim().toLowerCase();
    const schoonOnderwerp = onderwerp.trim();

    /* Het antwoord op de Geldscan-vraag krijgt geen eigen kolom: dat zou een
       migratie vragen die met de hand gedraaid moet worden, en dan zou het
       antwoord stil verdwijnen zolang die niet gedraaid is. Het reist daarom
       mee in situatie_details, het veld dat in mijn notificatiemail staat. */
    const geldscanRegel =
      geldscanGedaan === "ja" ? "Geldscan gedaan: ja" : "Geldscan gedaan: nee";
    const details = schoonOnderwerp
      ? `${geldscanRegel}. Wil het vooral hebben over: ${schoonOnderwerp}`
      : geldscanRegel;

    try {
      const dbRes = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pakket: "gesprek",
          naam: schoonNaam,
          email: schoonEmail,
          grootste_knelpunt: schoonOnderwerp || null,
          situatie_details: details,
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
          pakket: "gesprek",
          situatie_details: details,
        }),
      });
      if (!mailRes.ok) {
        console.error("Bevestigingsmail kon niet worden verstuurd");
      }

      verzondenRef.current = true;
      logGebeurtenis("intake_verzonden", {
        pakket: "gesprek",
        meta: { velden: veldenTotaal, totaal: veldenTotaal },
      });
      router.push("/aanbod/intake/bedankt");
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
          href="/"
          className="font-display font-light"
          style={{ color: DONKER, fontSize: "1.15rem", textDecoration: "none" }}
        >
          Waar blijft het
        </Link>
        <span className="font-body hidden sm:block" style={{ color: GRIJS, fontSize: "0.8rem" }}>
          {PRIJS} &middot; {DUUR} &middot; {KANAAL}
        </span>
      </header>

      <main className="px-5 pb-20 sm:px-8">
        {/* ── Hero: links de belofte, rechts het formulier ───────────────── */}
        <section
          className="mx-auto grid max-w-[1080px] grid-cols-1 items-start gap-x-14 gap-y-10 lg:grid-cols-[0.95fr_1.05fr] lg:grid-rows-[auto_1fr]"
          style={{ paddingTop: "3rem" }}
        >
          {/* Belofte, prijs en duur. Op mobiel staat dit blok boven het
              formulier, de drie eigenschappen komen er dan onder. */}
          <div className="order-1 lg:col-start-1 lg:row-start-1">
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
              Adviesgesprek aanvragen
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
              Vraag een adviesgesprek aan.
            </h1>
            <p
              className="font-body"
              style={{ color: ZACHT, fontSize: "1rem", lineHeight: 1.75, maxWidth: "32rem" }}
            >
              In {DUUR} kijk ik samen met jou naar je financi&euml;le situatie en bepaal je samen
              met mij wat voor jou de beste volgende stap is.
            </p>

            {/* Prijs, duur en kanaal meteen in beeld, ook op mobiel. */}
            <div
              className="font-body flex flex-wrap items-baseline gap-x-2 gap-y-1"
              style={{
                marginTop: "1.5rem",
                backgroundColor: "white",
                border: `1px solid ${RAND}`,
                borderRadius: "12px",
                padding: "0.85rem 1.1rem",
              }}
            >
              <span style={{ color: DONKER, fontSize: "1.15rem", fontWeight: 600 }}>{PRIJS}</span>
              <span style={{ color: GRIJS, fontSize: "0.9rem" }}>&middot;</span>
              <span style={{ color: ZACHT, fontSize: "0.9rem" }}>{DUUR}</span>
              <span style={{ color: GRIJS, fontSize: "0.9rem" }}>&middot;</span>
              <span style={{ color: ZACHT, fontSize: "0.9rem" }}>{KANAAL}</span>
            </div>
          </div>

          {/* Formulier */}
          <div
            id="aanvraag"
            className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2"
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
              Jouw aanvraag
            </h2>
            <p
              className="font-body"
              style={{ color: ZACHT, fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}
            >
              Laat je gegevens achter. Daarna neem ik persoonlijk contact met je op.
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
              {/* De enige inhoudelijke vraag, en daarom de eerste. Het antwoord
                  stuurt niemand weg: beide keuzes gaan gewoon verder. */}
              <fieldset style={{ border: "none", padding: 0, margin: "0 0 1.25rem" }}>
                <legend
                  className="font-body"
                  style={{
                    fontSize: "0.85rem",
                    color: ZACHT,
                    marginBottom: "0.55rem",
                    fontWeight: 500,
                    padding: 0,
                  }}
                >
                  Heb je al een Geldscan gedaan?
                </legend>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {GELDSCAN_KEUZES.map((k) => {
                    const gekozen = geldscanGedaan === k.waarde;
                    return (
                      <label
                        key={k.waarde}
                        className="font-body flex cursor-pointer items-start gap-3"
                        style={{
                          padding: "0.9rem 1rem",
                          borderRadius: "12px",
                          border: gekozen ? `2px solid ${GROEN}` : `1px solid ${RAND}`,
                          backgroundColor: gekozen ? LICHTGROEN : "white",
                          transition: "background-color 0.15s, border-color 0.15s",
                        }}
                      >
                        <input
                          type="radio"
                          name="geldscan"
                          value={k.waarde}
                          className="sr-only"
                          checked={gekozen}
                          onChange={() => setGeldscanGedaan(k.waarde)}
                          required
                        />
                        <span
                          className="flex items-center justify-center rounded-full shrink-0"
                          style={{
                            width: "1.15rem",
                            height: "1.15rem",
                            marginTop: "0.15rem",
                            border: gekozen ? `2px solid ${GROEN}` : `2px solid ${RAND}`,
                            backgroundColor: "white",
                          }}
                        >
                          {gekozen && (
                            <span
                              className="rounded-full"
                              style={{ width: "0.5rem", height: "0.5rem", backgroundColor: GROEN }}
                            />
                          )}
                        </span>
                        <span>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.9rem",
                              fontWeight: 600,
                              color: DONKER,
                              lineHeight: 1.35,
                              marginBottom: "0.15rem",
                            }}
                          >
                            {k.titel}
                          </span>
                          <span
                            style={{
                              display: "block",
                              fontSize: "0.82rem",
                              color: ZACHT,
                              lineHeight: 1.5,
                            }}
                          >
                            {k.regel}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

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

              <div style={{ marginBottom: "1.25rem" }}>
                <LabelTekst htmlFor="onderwerp">
                  Waar wil je het vooral over hebben? (optioneel)
                </LabelTekst>
                <div style={{ position: "relative" }}>
                  <textarea
                    id="onderwerp"
                    name="onderwerp"
                    value={onderwerp}
                    onChange={(e) => setOnderwerp(e.target.value.slice(0, 300))}
                    placeholder="Bijvoorbeeld: ik wil weten welke keuzes voor ons het meeste verschil maken."
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
                      color: onderwerp.length >= 270 ? GROEN : GRIJS,
                    }}
                  >
                    {onderwerp.length} / 300
                  </span>
                </div>
              </div>

              {/* Wat er na het versturen gebeurt, vlak boven de knop, want daar
                  wordt de beslissing genomen. */}
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
                  <p
                    style={{
                      fontWeight: 600,
                      color: DONKER,
                      fontSize: "0.88rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Wat gebeurt er daarna?
                  </p>
                  <p style={{ color: ZACHT, fontSize: "0.85rem", lineHeight: 1.6 }}>
                    Ik bekijk je aanvraag, neem persoonlijk contact met je op en plan samen met jou
                    een geschikt moment.
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
                style={{
                  fontSize: "0.8rem",
                  color: GRIJS,
                  marginTop: "0.9rem",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: GRIJS, flexShrink: 0 }}>
                  <Icoon naam="slot" grootte={14} />
                </span>
                Je gegevens worden alleen gebruikt om contact met je op te nemen.
              </p>
            </form>
          </div>

          {/* Drie eigenschappen. Op desktop onder de belofte, op mobiel onder
              het formulier, zodat de aanvraag daar als eerste in beeld komt. */}
          <ul
            className="font-body order-3 flex flex-col lg:col-start-1 lg:row-start-2"
            style={{ listStyle: "none", padding: 0, margin: 0, gap: "1.5rem" }}
          >
            {WAARDEN.map((w) => (
              <li key={w.titel} className="flex items-start gap-4">
                <IcoonBol naam={w.icoon} />
                <div style={{ paddingTop: "0.25rem" }}>
                  <p
                    style={{
                      fontWeight: 600,
                      color: DONKER,
                      fontSize: "0.95rem",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {w.titel}
                  </p>
                  <p style={{ color: ZACHT, fontSize: "0.88rem", lineHeight: 1.6 }}>{w.regel}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Zo verloopt het adviesgesprek ────────────────────────────── */}
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

          {/* Vertrouwen: wat er met je gegevens gebeurt, en wie het gesprek voert. */}
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
                <p
                  style={{
                    fontWeight: 600,
                    color: DONKER,
                    fontSize: "0.9rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Je gegevens zijn veilig
                </p>
                <p style={{ color: ZACHT, fontSize: "0.85rem", lineHeight: 1.6 }}>
                  Ik gebruik je gegevens alleen om contact met je op te nemen. Geen spam, nooit
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
                <p
                  style={{
                    fontWeight: 600,
                    color: DONKER,
                    fontSize: "0.9rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  Je spreekt mij, Jarno
                </p>
                <p style={{ color: ZACHT, fontSize: "0.85rem", lineHeight: 1.6 }}>
                  Geen intaker, geen team achter een formulier.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Wat het gesprek oplevert ─────────────────────────────────── */}
        <section className="mx-auto max-w-[1080px]" style={{ marginTop: "3rem" }}>
          <h2
            className="font-display font-light"
            style={{
              color: DONKER,
              fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Wat levert het gesprek je op?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {OPBRENGST.map((o) => (
              <div key={o.titel} className="font-body flex items-start gap-4 lg:block">
                <span className="flex shrink-0 lg:mb-4 lg:block" style={{ color: GROEN }}>
                  <Icoon naam={o.icoon} grootte={26} />
                </span>
                <div>
                  <p
                    style={{
                      fontWeight: 600,
                      color: DONKER,
                      fontSize: "0.95rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {o.titel}
                  </p>
                  <p style={{ color: ZACHT, fontSize: "0.88rem", lineHeight: 1.6 }}>{o.regel}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Veelgestelde vragen ──────────────────────────────────────── */}
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

        {/* ── Slot: terug naar hetzelfde formulier, geen nieuwe route ───── */}
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
            <IcoonBol naam="gesprek" grootte={48} />
            <div>
              <h2
                className="font-display font-light"
                style={{ color: DONKER, fontSize: "1.4rem", marginBottom: "0.35rem" }}
              >
                Klaar voor persoonlijk advies?
              </h2>
              <p className="font-body" style={{ color: ZACHT, fontSize: "0.92rem", lineHeight: 1.6 }}>
                Laat je gegevens achter, dan neem ik contact met je op om je adviesgesprek in te
                plannen.
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
              {PRIJS} &middot; {DUUR} &middot; {KANAAL}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
