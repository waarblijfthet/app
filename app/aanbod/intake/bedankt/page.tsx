import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function CheckIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0B7A6E"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ margin: "0 auto" }}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

const WACHT_LINKS = [
  { label: "Doe de analyse", href: "/analyse" },
  {
    label: "Lees over de potjesmethode",
    href: "/inzichten/potjesmethode-gezin-hoe-werkt-het",
  },
  { label: "Bekijk alle inzichten", href: "/inzichten" },
];

function TerwijlJeWacht() {
  return (
    <>
      <hr style={{ borderColor: "#E6E9E7", marginBottom: "2.5rem" }} />
      <p
        className="font-body font-medium text-[#16211F]"
        style={{ fontSize: "0.9rem", marginBottom: "1.25rem" }}
      >
        Terwijl je wacht
      </p>
      <div className="flex flex-col gap-3">
        {WACHT_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-body font-medium transition-opacity hover:opacity-75"
            style={{ color: "#0B7A6E", textDecoration: "none", fontSize: "0.95rem" }}
          >
            &rarr; {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────
   Voor de geldscan mag deze pagina niet aanvoelen als een generieke
   bedankpagina: de aanvraag is pas de eerste van vier stappen, en de
   bezoeker moet in één oogopslag zien wat er nu volgt (betaalverzoek
   €49) en wanneer hij zijn financiële gegevens aanlevert (pas daarna).
   ──────────────────────────────────────────────────────────────── */
function GeldscanBedankt() {
  const stappen = [
    { label: "Aanvraag ontvangen", status: "klaar" as const },
    { label: "Betaalverzoek €49", status: "nu" as const },
    { label: "Financiële gegevens aanleveren", status: "na betaling" as const },
  ];

  return (
    <>
      <div style={{ marginBottom: "1.5rem" }}>
        <CheckIcon />
      </div>

      <h1
        className="font-display font-light text-[#16211F]"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "1rem" }}
      >
        Je aanvraag is binnen
      </h1>

      <p
        className="font-body"
        style={{ color: "#4A5A56", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2.5rem" }}
      >
        De volgende stap is betaling van €49.
      </p>

      <div
        className="font-body"
        style={{
          backgroundColor: "white",
          border: "1px solid #E6E9E7",
          borderRadius: "16px",
          padding: "1.5rem",
          marginBottom: "2rem",
          textAlign: "left",
        }}
      >
        <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {stappen.map((s, i) => (
            <li
              key={s.label}
              className="flex items-baseline gap-3"
              style={i < stappen.length - 1 ? { marginBottom: "0.9rem" } : undefined}
            >
              <span
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  backgroundColor: s.status === "klaar" ? "#0B7A6E" : "#E6E9E7",
                  color: s.status === "klaar" ? "white" : "#8B958F",
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: "0.92rem", color: "#16211F" }}>
                {s.label}{" "}
                <span
                  style={{
                    color: s.status === "klaar" ? "#0B7A6E" : "#8B958F",
                    fontWeight: 600,
                  }}
                >
                  {s.status === "klaar" ? "✓" : `→ ${s.status}`}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <p
        className="font-body"
        style={{ color: "#4A5A56", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2.5rem" }}
      >
        Na betaling ontvang je de link om je financiële gegevens aan te leveren. Daarna ga ik
        persoonlijk met je situatie aan de slag.
      </p>

      <TerwijlJeWacht />
    </>
  );
}

function StandaardBedankt() {
  return (
    <>
      <div style={{ marginBottom: "1.5rem" }}>
        <CheckIcon />
      </div>

      <h1
        className="font-display font-light text-[#16211F]"
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "1.25rem" }}
      >
        Aanmelding ontvangen
      </h1>

      <p
        className="font-body"
        style={{ color: "#4A5A56", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2.5rem" }}
      >
        Ik heb je aanmelding goed ontvangen en neem binnen één werkdag
        persoonlijk contact op. Je ontvangt ook een bevestiging per email.
        <br />
        <br />
        Ik kijk ernaar uit kennis te maken.
      </p>

      <TerwijlJeWacht />
    </>
  );
}

export default function BedanktPage({
  searchParams,
}: {
  searchParams?: { pakket?: string };
}) {
  const isGeldscan = searchParams?.pakket === "geldscan";

  return (
    <>
      <Header />
      <main style={{ backgroundColor: "#F7F8F7", minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "540px",
            margin: "0 auto",
            padding: "6rem 1.5rem",
            textAlign: "center",
          }}
        >
          {isGeldscan ? <GeldscanBedankt /> : <StandaardBedankt />}
        </div>
      </main>
      <Footer />
    </>
  );
}
