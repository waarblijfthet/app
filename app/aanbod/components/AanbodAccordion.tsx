"use client";

import { useState } from "react";

const vragen = [
  {
    vraag: "Is dit hetzelfde als een budgetcoach of schuldhulp?",
    antwoord:
      "Nee. Budgetcoaches en schuldhulp zijn er voor mensen met betalingsproblemen of schulden. Ik richt me op gezinnen en individuen die goed verdienen maar te weinig overhouden. Die willen begrijpen waarom, en hoe dat anders kan.",
  },
  {
    vraag: "Ik heb geen schulden maar ook geen spaargeld. Is dit dan iets voor mij?",
    antwoord:
      "Ja, dat is precies de situatie waar ik voor ben. Geen crisis, maar ook geen rust. Dat is het meest voorkomende financiële patroon bij mensen met een goed inkomen, en het is volledig op te lossen met de juiste structuur.",
  },
  {
    vraag: "Geef je advies over beleggen, hypotheken of pensioen?",
    antwoord:
      "Nee. Ik begeleid je bij het dagelijks beheer van je inkomen: waar het naartoe gaat, hoe je structuur aanbrengt en hoe je structureel meer overhoudt. Voor specifieke financiële producten verwijs ik je door naar een gecertificeerd adviseur.",
  },
  {
    vraag: "Moet ik mijn bankafschriften opsturen?",
    antwoord:
      "Nee, dat hoeft niet. Voor het analyse-rapport heb ik helemaal geen documenten nodig. Bij het adviesgesprek kun je optioneel een paar recente afschriften meenemen zodat het gesprek concreter wordt. Je deelt alleen wat je zelf wilt delen, en ik gebruik het uitsluitend voor het gesprek.",
  },
  {
    vraag: "Wat als ik begin met de analyse maar meer wil?",
    antwoord:
      "Dan neem je gewoon contact op via hallo@waarblijfthet.nl. Ik kijk samen met je wat het beste bij jouw situatie past.",
  },
  {
    vraag: "Ben je gecertificeerd financieel adviseur?",
    antwoord:
      "Nee. Ik ben geen gecertificeerd financieel adviseur en val niet onder de AFM-vergunningplicht. Ik adviseer niet over financiële producten. Wat ik doe is gedragscoaching en structuurbegeleiding rondom dagelijks geldbeheer. Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte. Dat inzicht is de basis van hoe ik met je meedenk.",
  },
];

export function AanbodAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {vragen.map((v, i) => (
        <div
          key={i}
          style={{ borderBottom: "1px solid #E6E9E7" }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left py-5 gap-4"
            style={{ cursor: "pointer" }}
          >
            <span
              className="font-body"
              style={{ fontWeight: 500, color: "#16211F", fontSize: "1rem" }}
            >
              {v.vraag}
            </span>
            <span
              className="flex-shrink-0 transition-transform duration-200"
              style={{
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                color: "#8B958F",
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
                color: "#4A5A56",
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
