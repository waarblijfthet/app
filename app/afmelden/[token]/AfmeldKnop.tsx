"use client";

import { useState } from "react";

// De knop die het afmelden daadwerkelijk doet. Bewust een POST vanuit een
// klik, en geen afmelding bij het openen van de pagina: link-scanners van
// Outlook en virusscanners openen alle links in een mail automatisch (met
// GET) en zouden mensen anders ongewild afmelden. Zie lib/outreach/afmelden.ts.

export default function AfmeldKnop({ token, email }: { token: string; email: string }) {
  const [status, setStatus] = useState<"start" | "bezig" | "klaar" | "fout">("start");

  async function afmelden() {
    setStatus("bezig");
    try {
      const res = await fetch(`/api/afmelden/${encodeURIComponent(token)}`, { method: "POST" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("klaar");
    } catch {
      setStatus("fout");
    }
  }

  if (status === "klaar") {
    return (
      <div>
        <p className="font-body font-light text-text-soft text-base leading-relaxed">
          Gelukt. <strong className="font-normal">{email}</strong> is afgemeld. Je krijgt geen mail meer van
          mij, ook geen herinnering. Je hoeft verder niets te doen.
        </p>
        <p className="font-body font-light text-text-soft text-sm leading-relaxed mt-4">
          Was dit per ongeluk? Stuur dan een mailtje naar{" "}
          <a href="mailto:hallo@waarblijfthet.nl" className="underline">
            hallo@waarblijfthet.nl
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => void afmelden()}
        disabled={status === "bezig"}
        className="font-body text-base px-6 py-3 rounded-lg bg-[#16211F] text-white disabled:opacity-50"
      >
        {status === "bezig" ? "Bezig…" : "Ja, meld me af"}
      </button>
      {status === "fout" && (
        <p className="font-body font-light text-base leading-relaxed mt-4" style={{ color: "#B3261E" }}>
          Er ging iets mis. Probeer het zo nog eens, of mail{" "}
          <a href="mailto:hallo@waarblijfthet.nl" className="underline">
            hallo@waarblijfthet.nl
          </a>
          , dan haal ik je er handmatig uit.
        </p>
      )}
    </div>
  );
}
