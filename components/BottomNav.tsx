"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const InzichtenIcon = ({ active }: { active: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? 2.2 : 1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const AanbodIcon = ({ active }: { active: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? 2.2 : 1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const AnalyseIcon = ({ active }: { active: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? 2.2 : 1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const isInzichten = pathname.startsWith("/inzichten");
  const isAanbod = pathname.startsWith("/aanbod");
  const isAnalyse =
    pathname.startsWith("/analyse") || pathname.startsWith("/resultaat");

  return (
    <>
      {/* Spacer zodat content niet achter de bottom nav verdwijnt */}
      <div className="h-20 md:hidden" aria-hidden="true" />

      <nav
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        aria-label="Mobiele navigatie"
      >
        {/* Achtergrond */}
        <div className="absolute inset-0 bg-[#F5F0E8]/95 backdrop-blur-lg border-t border-[#E8E0D4]" />

        <div className="relative flex items-stretch pb-2">
          {/* Inzichten */}
          <Link
            href="/inzichten"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors"
            style={{ color: isInzichten ? "#1C3A2A" : "#8A9E8E" }}
            aria-current={isInzichten ? "page" : undefined}
          >
            <InzichtenIcon active={isInzichten} />
            <span className="text-[10px] font-medium">Inzichten</span>
          </Link>

          {/* Aanbod */}
          <Link
            href="/aanbod"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors"
            style={{ color: isAanbod ? "#1C3A2A" : "#8A9E8E" }}
            aria-current={isAanbod ? "page" : undefined}
          >
            <AanbodIcon active={isAanbod} />
            <span className="text-[10px] font-medium">Aanbod</span>
          </Link>

          {/* Analyse — altijd prominent, accent kleur als niet actief */}
          <Link
            href="/analyse"
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 transition-colors"
            style={{ color: isAnalyse ? "#1C3A2A" : "#C4603A" }}
            aria-current={isAnalyse ? "page" : undefined}
          >
            {!isAnalyse ? (
              <div
                className="w-10 h-10 rounded-full bg-[#C4603A] flex items-center justify-center -mt-5 shadow-md"
                style={{ color: "white" }}
              >
                <AnalyseIcon active={false} />
              </div>
            ) : (
              <AnalyseIcon active={true} />
            )}
            <span
              className="text-[10px] font-medium"
              style={{
                color: isAnalyse ? "#1C3A2A" : "#C4603A",
                marginTop: !isAnalyse ? "-2px" : "0",
              }}
            >
              Analyse
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
