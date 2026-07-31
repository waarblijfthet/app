"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import Badge from "./ui/Badge";

interface Tellingen {
  leads: number;
  quiz: number;
  aanvragenNieuw: number;
}

interface NavItem {
  href: string;
  label: string;
  badge?: number;
  badgeVariant?: "neutraal" | "waarschuwing";
}

interface NavGroep {
  titel: string;
  items: NavItem[];
}

function navGroepen(t: Tellingen): NavGroep[] {
  return [
    {
      titel: "Werk",
      items: [
        { href: "/admin/vandaag", label: "Vandaag" },
        { href: "/admin/outreach", label: "Outreach" },
        { href: "/admin/mailsjablonen", label: "Mailsjablonen" },
        { href: "/admin/contacten", label: "Contacten" },
        { href: "/admin/prospects", label: "Prospects" },
      ],
    },
    {
      titel: "Leveren",
      items: [
        {
          href: "/admin/aanvragen",
          label: "Aanvragen",
          badge: t.aanvragenNieuw > 0 ? t.aanvragenNieuw : undefined,
          badgeVariant: "waarschuwing",
        },
        { href: "/admin/analyses", label: "Analyses", badge: t.quiz, badgeVariant: "neutraal" },
        { href: "/admin/leads", label: "Leads", badge: t.leads, badgeVariant: "neutraal" },
      ],
    },
    {
      titel: "Site",
      items: [
        { href: "/admin/bezoekers", label: "Bezoekers" },
        { href: "/admin/zoekwoorden", label: "Zoekwoorden" },
        { href: "/admin/indexering", label: "Indexering" },
        { href: "/admin/cijfers", label: "Cijfers" },
      ],
    },
  ];
}

// De vier secties met een dagelijkse werkvoorraad staan op de mobiele
// onderbalk. De rest zit achter "Meer" (zie sectie 3).
const MOBIEL_ONDERBALK = [
  { href: "/admin/vandaag", label: "Vandaag" },
  { href: "/admin/outreach", label: "Outreach" },
  { href: "/admin/contacten", label: "Contacten" },
  { href: "/admin/aanvragen", label: "Aanvragen" },
];

const MOBIEL_MEER = [
  { href: "/admin/mailsjablonen", label: "Mailsjablonen" },
  { href: "/admin/prospects", label: "Prospects" },
  { href: "/admin/analyses", label: "Analyses" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/bezoekers", label: "Bezoekers" },
  { href: "/admin/zoekwoorden", label: "Zoekwoorden" },
  { href: "/admin/indexering", label: "Indexering" },
  { href: "/admin/cijfers", label: "Cijfers" },
];

function paginaTitel(pathname: string): string {
  const alleItems = [...MOBIEL_ONDERBALK, ...MOBIEL_MEER];
  const item = alleItems.find((i) => pathname.startsWith(i.href));
  return item?.label ?? "Beheer";
}

interface Props {
  email: string;
  tellingen: Tellingen;
  children: React.ReactNode;
}

export default function AdminShell({ email, tellingen, children }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [ingeklapt, setIngeklapt] = useState(false);
  const [meerOpen, setMeerOpen] = useState(false);

  useEffect(() => {
    const opgeslagen = window.localStorage.getItem("admin-zijmenu-ingeklapt");
    if (opgeslagen === "1") setIngeklapt(true);
  }, []);

  function toggleIngeklapt() {
    setIngeklapt((prev) => {
      const nieuw = !prev;
      window.localStorage.setItem("admin-zijmenu-ingeklapt", nieuw ? "1" : "0");
      return nieuw;
    });
  }

  async function uitloggen() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const groepen = navGroepen(tellingen);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop zijmenu */}
      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 bg-primary text-white transition-all ${
          ingeklapt ? "w-16" : "w-60"
        }`}
      >
        <div className="h-14 flex items-center px-4 gap-2.5 border-b border-white/10 shrink-0">
          <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center font-display font-medium text-xs shrink-0">
            wb
          </span>
          {!ingeklapt && (
            <span className="font-display font-light text-white/90 text-base tracking-tight truncate">
              Waar blijft het / Beheer
            </span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {groepen.map((groep) => (
            <div key={groep.titel} className="mb-5">
              {!ingeklapt && (
                <p className="px-3 mb-1.5 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
                  {groep.titel}
                </p>
              )}
              <ul className="flex flex-col gap-0.5">
                {groep.items.map((item) => {
                  const actief = pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        title={ingeklapt ? item.label : undefined}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-body transition-colors ${
                          actief
                            ? "bg-white/15 text-white font-medium"
                            : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="truncate">{ingeklapt ? item.label.slice(0, 1) : item.label}</span>
                        {!ingeklapt && item.badge ? (
                          <span
                            className={`text-[11px] font-medium px-1.5 py-0.5 rounded-full ${
                              item.badgeVariant === "waarschuwing"
                                ? "bg-danger-bg text-danger"
                                : "bg-white/15 text-white"
                            }`}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3 shrink-0">
          {!ingeklapt && (
            <p className="text-white/50 font-body text-xs truncate mb-2">{email}</p>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={uitloggen}
              className="flex-1 text-xs font-body font-medium px-3 py-1.5 rounded-lg bg-accent text-white hover:bg-[#0A6A5F] transition-colors"
            >
              {ingeklapt ? "↩" : "Uitloggen"}
            </button>
            <button
              onClick={toggleIngeklapt}
              aria-label={ingeklapt ? "Zijmenu uitklappen" : "Zijmenu inklappen"}
              className="text-xs px-2 py-1.5 rounded-lg text-white/60 hover:bg-white/10 hover:text-white"
            >
              {ingeklapt ? "»" : "«"}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobiele topbar */}
      <header className="lg:hidden h-14 flex items-center justify-between px-4 bg-primary text-white sticky top-0 z-40">
        <span className="font-body font-medium text-sm">{paginaTitel(pathname)}</span>
        <button
          onClick={uitloggen}
          className="text-xs font-body font-medium px-3 py-1.5 rounded-lg bg-accent text-white"
        >
          Uitloggen
        </button>
      </header>

      {/* Inhoud */}
      <main className={`lg:pl-60 ${ingeklapt ? "lg:pl-16" : ""} pb-20 lg:pb-0 transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</div>
      </main>

      {/* Mobiele onderbalk */}
      <nav
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#E6E9E7] flex"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {MOBIEL_ONDERBALK.map((item) => {
          const actief = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-2 text-[11px] font-body ${
                actief ? "text-accent font-medium" : "text-text-muted"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        <button
          onClick={() => setMeerOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-2 text-[11px] font-body text-text-muted"
        >
          Meer
        </button>
      </nav>

      {/* Mobiele "Meer"-bladzijde */}
      {meerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-card flex flex-col">
          <div className="h-14 flex items-center justify-between px-4 border-b border-[#E6E9E7]">
            <span className="font-body font-medium text-primary text-sm">Meer</span>
            <button
              onClick={() => setMeerOpen(false)}
              aria-label="Sluiten"
              className="text-text-muted text-lg px-1"
            >
              ×
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto p-3">
            {MOBIEL_MEER.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMeerOpen(false)}
                  className="block px-3 py-3 rounded-lg font-body text-sm text-primary hover:bg-background"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
