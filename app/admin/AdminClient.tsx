"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Lead, QuizResultaat, IntakeAanvraag } from "./page";
import FunnelTabblad from "./components/FunnelTabblad";

// Alleen de standaard-tab (Funnel) wordt direct geladen. De rest wordt lui
// ingeladen zodra je de tab opent, zodat zware code (o.a. recharts in Overzicht)
// niet in het eerste admin-bundel zit. Dat scheelt fors in laadtijd.
const laden = () => <p className="text-sm text-[#4A5E4E] py-8">Laden…</p>;

const LeadsTabblad = dynamic(() => import("./components/LeadsTabblad"), { loading: laden, ssr: false });
const QuizResultatenTabblad = dynamic(() => import("./components/QuizResultatenTabblad"), { loading: laden, ssr: false });
const OverzichtTabblad = dynamic(() => import("./components/OverzichtTabblad"), { loading: laden, ssr: false });
const AanvragenTabblad = dynamic(() => import("./components/AanvragenTabblad"), { loading: laden, ssr: false });
const BezoekersTabblad = dynamic(
  () => import("./components/BezoekersTabblad").then((m) => m.BezoekersTabblad),
  { loading: laden, ssr: false }
);
const IndexingTabblad = dynamic(() => import("./components/IndexingTabblad"), { loading: laden, ssr: false });
const OutreachTabblad = dynamic(() => import("./components/OutreachTabblad"), { loading: laden, ssr: false });
const ProspectsTabblad = dynamic(() => import("./components/ProspectsTabblad"), { loading: laden, ssr: false });

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
  { id: "outreach", label: "📧 Outreach" },
  { id: "prospects", label: "🔎 Prospects" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function AdminClient({ leads, quizResultaten, aanvragen }: Props) {
  const [actief, setActief] = useState<TabId>("funnel");

  return (
    <div>
      {/* Tabbladen */}
      <div className="flex gap-6 border-b border-[#E8E0D0] mb-7 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActief(tab.id)}
            className={`pb-3 font-body font-medium text-sm transition-colors whitespace-nowrap ${
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
      {actief === "outreach" && <OutreachTabblad />}
      {actief === "prospects" && <ProspectsTabblad />}
    </div>
  );
}
