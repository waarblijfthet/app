import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BedanktPage() {
  return (
    <>
      <Header />
      <main className="pt-16" style={{ backgroundColor: "#F5F0E8", minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "540px",
            margin: "0 auto",
            padding: "6rem 1.5rem",
            textAlign: "center",
          }}
        >
          {/* Checkmark */}
          <div style={{ marginBottom: "1.5rem" }}>
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2D6A4F"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ margin: "0 auto" }}
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>

          <h1
            className="font-display font-light text-[#1C3A2A]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "1.25rem" }}
          >
            Aanmelding ontvangen
          </h1>

          <p
            className="font-body"
            style={{
              color: "#4A5E4E",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}
          >
            We hebben je aanmelding goed ontvangen en nemen binnen één werkdag
            persoonlijk contact op. Je ontvangt ook een bevestiging per email.
            <br />
            <br />
            We kijken ernaar uit kennis te maken.
          </p>

          <hr style={{ borderColor: "#E8E0D4", marginBottom: "2.5rem" }} />

          <p
            className="font-body font-medium text-[#1C3A2A]"
            style={{ fontSize: "0.9rem", marginBottom: "1.25rem" }}
          >
            Terwijl je wacht
          </p>

          <div className="flex flex-col gap-3">
            {[
              { label: "Doe de gratis analyse", href: "/analyse" },
              {
                label: "Lees over de potjesmethode",
                href: "/inzichten/potjesmethode-gezin-hoe-werkt-het",
              },
              { label: "Bekijk alle inzichten", href: "/inzichten" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-medium transition-opacity hover:opacity-75"
                style={{
                  color: "#C4603A",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                → {link.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
