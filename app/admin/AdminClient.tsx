"use client";

import { useState } from "react";
import { Lead, QuizResultaat, IntakeAanvraag } from "./page";
import LeadsTabblad from "./components/LeadsTabblad";
import QuizResultatenTabblad from "./components/QuizResultatenTabblad";
import OverzichtTabblad from "./components/OverzichtTabblad";
import AanvragenTabblad from "./components/AanvragenTabblad";
import { BezoekersTabblad } from "./components/BezoekersTabblad";
import FunnelTabblad from "./components/FunnelTabblad";
import IndexingTabblad from "./components/IndexingTabblad";

interface Props {
  leads: Lead[];
  quizResultaten: QuizResultaat[];
  aanvragen: IntakeAanvraag[];
}

const TABS = [
  { id: "funnel", label: "📊 Funnel" },
  { id: "bezoekers", label: "👁 Bezoekers" },
  { id: "leads", label: "Leads" },
  { id: "quiz", label: "Analyse resultaten" },
  { id: "overzicht", label: "Overzicht" },
  { id: "aanvragen", label: "Aanvragen" },
  { id: "indexering", label: "🔍 Indexering" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminClient({ leads, quizResultaten, aanvragen }: Props) {
  const [actief, setActief] = useState<TabId>("funnel");

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
            {tab.id === "aanvragen" && (
              <span
                className="ml-2 text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor:
                    aanvragen.filter((a) => a.status === "nieuw").length > 0
                      ? "#FEE2E2"
                      : "#E8E0D0",
                  color:
                    aanvragen.filter((a) => a.status === "nieuw").length > 0
                      ? "#991B1B"
                      : "#6B7280",
                }}
              >
                {aanvragen.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {actief === "funnel" && (
        <FunnelTabblad
          leads={leads}
          aanvragen={aanvragen}
        />
      )}
      {actief === "bezoekers" && <BezoekersTabblad />}
      {actief === "leads" && <LeadsTabblad leads={leads} />}
      {actief === "quiz" && <QuizResultatenTabblad resultaten={quizResultaten} />}
      {actief === "overzicht" && (
        <OverzichtTabblad leads={leads} resultaten={quizResultaten} />
      )}
      {actief === "aanvragen" && <AanvragenTabblad aanvragen={aanvragen} />}
      {actief === "indexering" && <IndexingTabblad />}
    </div>
  );
}
