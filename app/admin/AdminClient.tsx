"use client";

import { useState } from "react";
import { Lead, QuizResultaat } from "./page";
import LeadsTabblad from "./components/LeadsTabblad";
import QuizResultatenTabblad from "./components/QuizResultatenTabblad";
import OverzichtTabblad from "./components/OverzichtTabblad";

interface Props {
  leads: Lead[];
  quizResultaten: QuizResultaat[];
}

const TABS = [
  { id: "leads", label: "Leads" },
  { id: "quiz", label: "Quiz resultaten" },
  { id: "overzicht", label: "Overzicht" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminClient({ leads, quizResultaten }: Props) {
  const [actief, setActief] = useState<TabId>("leads");

  return (
    <div>
      {/* Tabbladen */}
      <div className="flex gap-6 border-b border-[#E8E0D0] mb-7">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActief(tab.id)}
            className={`pb-3 font-body font-medium text-sm transition-colors ${
              actief === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-text-muted hover:text-text-soft"
            }`}
          >
            {tab.label}
            {tab.id === "leads" && (
              <span className="ml-2 bg-[#E8E0D0] text-text-soft text-xs px-1.5 py-0.5 rounded-full">
                {leads.length}
              </span>
            )}
            {tab.id === "quiz" && (
              <span className="ml-2 bg-[#E8E0D0] text-text-soft text-xs px-1.5 py-0.5 rounded-full">
                {quizResultaten.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {actief === "leads" && <LeadsTabblad leads={leads} />}
      {actief === "quiz" && <QuizResultatenTabblad resultaten={quizResultaten} />}
      {actief === "overzicht" && (
        <OverzichtTabblad leads={leads} resultaten={quizResultaten} />
      )}
    </div>
  );
}
