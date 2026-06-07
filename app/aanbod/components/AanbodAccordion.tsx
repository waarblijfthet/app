"use client";

import { useState } from "react";

const vragen = [
  {
    vraag: "Is dit hetzelfde als een budgetcoach of schuldhulp?",
    antwoord:
      "Nee. Budgetcoaches en schuldhulp zijn er voor mensen met betalingsproblemen of schulden. Wij richten ons op gezinnen die goed verdienen maar te weinig overhouden. Die willen begrijpen waarom, en hoe dat anders kan.",
  },
  {
    vraag: "Ik heb geen schulden maar ook geen spaargeld. Is dit dan iets voor mij?",
    antwoord:
      "Ja, dat is precies de situatie waar wij voor zijn. Geen crisis, maar ook geen rust. Dat is het meest voorkomende financiële patroon bij gezinnen met een goed inkomen, en het is volledig op te lossen met de juiste structuur.",
  },
  {
    vraag: "Geven jullie advies over beleggen, hypotheken of pensioen?",
    antwoord:
      "Nee. We begeleiden je bij het dagelijks beheer van je inkomen: waar het naartoe gaat, hoe je structuur aanbrengt en hoe je structureel meer overhoudt. Voor specifieke financiële producten verwijs je door naar een gecertificeerd adviseur.",
  },
  {
    vraag: "Wat als ik begin met de gratis analyse maar meer wil?",
    antwoord:
      "Dan neem je gewoon contact op via hallo@waarblijfthet.nl. We kijken samen wat het beste bij jouw situatie past.",
  },
  {
    vraag: "Zijn jullie gecertificeerde financieel adviseurs?",
    antwoord:
      "Nee. We zijn geen gecertificeerde financieel adviseurs en vallen niet onder de AFM-vergunningplicht. We adviseren niet over financiële producten. Wat we doen is gedragscoaching en structuurbegeleiding rondom dagelijks geldbeheer.",
  },
];

export function AanbodAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {vragen.map((v, i) => (
        <div
          key={i}
          style={{ borderBottom: "1px solid #E8E0D4" }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left py-5 gap-4"
            style={{ cursor: "pointer" }}
          >
            <span
              className="font-body"
              style={{ fontWeight: 500, color: "#1C3A2A", fontSize: "1rem" }}
            >
              {v.vraag}
            </span>
            <span
              className="flex-shrink-0 transition-transform duration-200"
              style={{
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                color: "#8A9E8E",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>

          {open === i && (
            <p
              className="font-body pb-5"
              style={{
                color: "#4A5E4E",
                fontSize: "0.9rem",
                lineHeight: 1.8,
              }}
            >
              {v.antwoord}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
