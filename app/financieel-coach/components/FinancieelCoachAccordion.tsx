"use client";

import { useState } from "react";

export interface AccordionVraag {
  vraag: string;
  antwoord: string;
}

export function FinancieelCoachAccordion({
  vragen,
  defaultOpenIndex = 0,
}: {
  vragen: AccordionVraag[];
  defaultOpenIndex?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpenIndex);

  return (
    <div>
      {vragen.map((v, i) => (
        <div key={v.vraag} style={{ borderBottom: "1px solid #E6E9E7" }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left py-5 gap-4"
            style={{ cursor: "pointer" }}
          >
            <span className="font-body" style={{ fontWeight: 500, color: "#16211F", fontSize: "1rem" }}>
              {v.vraag}
            </span>
            <span
              className="flex-shrink-0 transition-transform duration-200"
              style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)", color: "#8B958F" }}
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
            <p className="font-body pb-5" style={{ color: "#4A5A56", fontSize: "0.9rem", lineHeight: 1.8 }}>
              {v.antwoord}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
