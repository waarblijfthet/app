import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AanbodAccordion } from "./components/AanbodAccordion";

export const metadata: Metadata = {
  title: "Aanbod | Waar blijft het",
  description:
    "Drie manieren om grip te krijgen op je geld — van gratis inzicht tot persoonlijke begeleiding. Kies wat bij jouw situatie past.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://www.waarblijfthet.nl/aanbod" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Financiële begeleiding voor gezinnen",
  provider: {
    "@type": "Person",
    name: "Jarno Koopman",
    url: "https://waarblijfthet.nl",
  },
  serviceType: "Financiële coaching",
  areaServed: "NL",
};

export default function AanbodPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />

      <main className="pt-16">
        {/* ── Hero ── */}
        <section style={{ backgroundColor: "#F5F0E8", padding: "5rem 1.5rem 4rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <p
              className="font-body font-medium uppercase tracking-widest text-xs mb-4"
              style={{ color: "#C4603A" }}
            >
              Aanbod
            </p>
            <h1
              className="font-display font-light text-[#1C3A2A]"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)", lineHeight: 1.2, marginBottom: "1.25rem" }}
            >
              Kies wat bij jouw situatie past
            </h1>
            <p
              className="font-body"
              style={{
                fontSize: "1.05rem",
                color: "#4A5E4E",
                maxWidth: "580px",
                lineHeight: 1.7,
              }}
            >
              Geen abonnementen, geen verrassingen. Je betaalt voor wat je nodig
              hebt — niks meer.
            </p>
          </div>
        </section>

        {/* ── Drie niveaus ── */}
        <section style={{ backgroundColor: "#FDFAF4", padding: "3rem 1.5rem" }}>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            style={{ maxWidth: "1100px", margin: "0 auto" }}
          >
            {/* NIVEAU 1 — Gratis */}
            <div
              style={{
                backgroundColor: "#FDFAF4",
                border: "1px solid #E8E0D4",
                borderRadius: "20px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div>
                <span
                  className="font-body text-xs font-medium px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#E8F2EC", color: "#2D6A4F" }}
                >
                  Gratis
                </span>
              </div>

              <h2
                className="font-display font-light text-[#1C3A2A]"
                style={{ fontSize: "1.5rem", lineHeight: 1.25 }}
              >
                Weten waar het naartoe gaat
              </h2>

              <div>
                <p
                  className="font-display font-light text-[#1C3A2A]"
                  style={{ fontSize: "2.5rem", lineHeight: 1 }}
                >
                  €0
                </p>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: "#8A9E8E" }}
                >
                  Geen creditcard. Geen verplichtingen.
                </p>
              </div>

              <p
                className="font-body"
                style={{ fontWeight: 500, color: "#1C3A2A", fontSize: "1rem", lineHeight: 1.6 }}
              >
                Na 5 minuten weet je waar jullie geld naartoe gaat — en hoe dat
                verhoudt tot vergelijkbare gezinnen.
              </p>

              <hr style={{ borderColor: "#E8E0D4", margin: "0.25rem 0" }} />

              <ul className="space-y-2">
                {[
                  "Interactieve analyse in 6 stappen",
                  "Persoonlijk vergelijkingsrapport",
                  "De twee grootste afwijkingen in jouw situatie",
                  "Rapport per email",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span style={{ color: "#2D6A4F", fontWeight: 600, flexShrink: 0 }}>✓</span>
                    <span className="font-body text-sm" style={{ color: "#4A5E4E" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link
                  href="/analyse"
                  className="block text-center font-body font-medium text-sm py-3 px-6 transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: "#C4603A",
                    color: "#FDFAF4",
                    borderRadius: "12px",
                    textDecoration: "none",
                  }}
                >
                  Start de gratis analyse →
                </Link>
              </div>
            </div>

            {/* NIVEAU 2 — Aanbevolen (donkergroen) */}
            <div
              style={{
                backgroundColor: "#1C3A2A",
                border: "2px solid #2D6A4F",
                borderRadius: "20px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div>
                <span
                  className="font-body text-xs font-medium px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.15)",
                    color: "#F5F0E8",
                  }}
                >
                  Meest gekozen
                </span>
              </div>

              <h2
                className="font-display font-light"
                style={{ fontSize: "1.5rem", lineHeight: 1.25, color: "white" }}
              >
                Zes weken een spiegel voorgehouden
              </h2>

              <div>
                <p
                  className="font-display font-light"
                  style={{ fontSize: "2.5rem", lineHeight: 1, color: "white" }}
                >
                  €97
                </p>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: "rgba(245,240,232,0.6)" }}
                >
                  Eenmalig · Geen abonnement
                </p>
              </div>

              <p
                className="font-body"
                style={{ fontWeight: 500, color: "white", fontSize: "1rem", lineHeight: 1.6 }}
              >
                Na zes weken weet je precies waar het schort — en heb je iemand
                naast je gehad die je scherp hield. Niet met een cursus, maar
                met een eerlijke blik van buitenaf.
              </p>

              <hr style={{ borderColor: "rgba(255,255,255,0.15)", margin: "0.25rem 0" }} />

              <ul className="space-y-2">
                {[
                  "Persoonlijk gesprek om te begrijpen waar jullie staan",
                  "Wekelijkse check-in via WhatsApp (6 weken)",
                  "Eerlijke feedback op wat jullie doen — wat werkt en wat niet",
                  "Geen standaardadvies, geen spreadsheets",
                  "Iemand die vraagt hoe het écht gaat",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span style={{ color: "#8AB89A", fontWeight: 600, flexShrink: 0 }}>✓</span>
                    <span className="font-body text-sm" style={{ color: "rgba(245,240,232,0.85)" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link
                  href="/aanbod/intake?pakket=6weken"
                  className="block text-center font-body font-medium text-sm py-3 px-6 transition-opacity hover:opacity-90"
                  style={{
                    backgroundColor: "white",
                    color: "#1C3A2A",
                    borderRadius: "12px",
                    textDecoration: "none",
                  }}
                >
                  Ja, dit wil ik →
                </Link>
              </div>
            </div>

            {/* NIVEAU 3 — Intensief */}
            <div
              style={{
                backgroundColor: "#FDFAF4",
                border: "1px solid #E8E0D4",
                borderRadius: "20px",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div>
                <span
                  className="font-body text-xs font-medium px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#FAF0EB", color: "#92600A" }}
                >
                  Beperkte beschikbaarheid
                </span>
              </div>

              <h2
                className="font-display font-light text-[#1C3A2A]"
                style={{ fontSize: "1.5rem", lineHeight: 1.25 }}
              >
                Persoonlijke begeleiding op maat
              </h2>

              <div>
                <p
                  className="font-display font-light text-[#1C3A2A]"
                  style={{ fontSize: "2.5rem", lineHeight: 1 }}
                >
                  €497
                </p>
                <p
                  className="font-body text-xs mt-1"
                  style={{ color: "#8A9E8E" }}
                >
                  Eenmalig · 3 maanden intensief
                </p>
              </div>

              <p
                className="font-body"
                style={{ fontWeight: 500, color: "#1C3A2A", fontSize: "1rem", lineHeight: 1.6 }}
              >
                Jouw financiële situatie van A tot Z doorgelicht. Een plan op
                maat. En iemand naast je die je scherp houdt totdat het systeem
                staat.
              </p>

              <hr style={{ borderColor: "#E8E0D4", margin: "0.25rem 0" }} />

              <ul className="space-y-2">
                {[
                  "Intake gesprek (45 min, video)",
                  "Volledig financieel plan op basis van jouw situatie",
                  "Maandelijkse videocall (3x)",
                  "WhatsApp bereikbaar voor vragen (3 maanden)",
                  "Tussenevaluatie na 6 weken",
                  "Eindrapport met concrete aanbevelingen",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span style={{ color: "#2D6A4F", fontWeight: 600, flexShrink: 0 }}>✓</span>
                    <span className="font-body text-sm" style={{ color: "#4A5E4E" }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <p
                className="font-body"
                style={{ fontSize: "0.8rem", color: "#8A9E8E" }}
              >
                Maximaal 3 trajecten tegelijk. Neem contact op voor
                beschikbaarheid.
              </p>

              <div className="mt-auto">
                <Link
                  href="/aanbod/intake?pakket=intensief"
                  className="block text-center font-body font-medium text-sm py-3 px-6 transition-all hover:bg-[#1C3A2A] hover:text-white"
                  style={{
                    border: "1.5px solid #1C3A2A",
                    backgroundColor: "transparent",
                    color: "#1C3A2A",
                    borderRadius: "12px",
                    textDecoration: "none",
                  }}
                >
                  Ja, dit wil ik →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ Accordion ── */}
        <section style={{ backgroundColor: "white", padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <h2
              className="font-display font-light text-[#1C3A2A]"
              style={{ fontSize: "2rem", marginBottom: "2rem" }}
            >
              Veelgestelde vragen
            </h2>
            <AanbodAccordion />
          </div>
        </section>

        {/* ── Vergelijkingstabel ── */}
        <section style={{ backgroundColor: "#F5F0E8", padding: "3rem 1.5rem" }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>
            <h2
              className="font-display font-light text-[#1C3A2A]"
              style={{ fontSize: "2rem", marginBottom: "1.75rem" }}
            >
              Wat past bij jou?
            </h2>

            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  borderRadius: "16px",
                  overflow: "hidden",
                  minWidth: "540px",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#1C3A2A" }}>
                    {["Kenmerk", "Gratis", "6 Weken", "Intensief"].map(
                      (h, i) => (
                        <th
                          key={h}
                          className="font-body font-medium text-sm text-left"
                          style={{
                            padding: "0.875rem 1rem",
                            color: "white",
                            backgroundColor:
                              i === 2 ? "#2D6A4F" : "#1C3A2A",
                          }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Prijs", "€0", "€97", "€497"],
                    ["Tijdsduur", "5 minuten", "6 weken", "3 maanden"],
                    ["Persoonlijk contact", "✗", "WhatsApp", "Video + WhatsApp"],
                    ["Opdrachten per week", "✗", "✓", "✓"],
                    ["Financieel plan op maat", "✗", "✗", "✓"],
                    ["Videocall", "✗", "✗", "3x"],
                    [
                      "Geschikt voor",
                      "Eerste inzicht",
                      "Structuur aanbrengen",
                      "Volledig omgooien",
                    ],
                  ].map((row, ri) => (
                    <tr
                      key={ri}
                      style={{
                        backgroundColor: ri % 2 === 0 ? "#FDFAF4" : "white",
                      }}
                    >
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className="font-body text-sm"
                          style={{
                            padding: "0.875rem 1rem",
                            backgroundColor:
                              ci === 2
                                ? ri % 2 === 0
                                  ? "#EEF6F1"
                                  : "#E8F2EC"
                                : undefined,
                            color:
                              cell === "✓"
                                ? "#2D6A4F"
                                : cell === "✗"
                                ? "#8A9E8E"
                                : ci === 0
                                ? "#1C3A2A"
                                : "#4A5E4E",
                            fontWeight: cell === "✓" || cell === "✗" ? 600 : ci === 0 ? 500 : 400,
                            borderBottom: "1px solid #E8E0D4",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Finale CTA ── */}
        <section
          style={{
            backgroundColor: "#1C3A2A",
            padding: "4rem 1.5rem",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2
              className="font-display font-light"
              style={{ fontSize: "2rem", color: "white", marginBottom: "1rem" }}
            >
              Niet zeker welke past bij jou?
            </h2>
            <p
              className="font-body"
              style={{
                color: "rgba(245,240,232,0.65)",
                fontSize: "1rem",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              Begin gewoon met de gratis analyse. Die duurt vijf minuten en geeft
              je al een eerlijk beeld van jullie situatie. Daarna zie je vanzelf
              of je meer wil.
            </p>
            <Link
              href="/analyse"
              className="inline-block font-body font-medium text-sm py-3 px-8 transition-opacity hover:opacity-90"
              style={{
                backgroundColor: "#C4603A",
                color: "#FDFAF4",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              Start de gratis analyse →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
