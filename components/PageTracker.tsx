"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

function getSessieId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem("wb_sessie");
  if (!id) {
    id = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("wb_sessie", id);
  }
  return id;
}

function getApparaat(): string {
  if (typeof window === "undefined") return "onbekend";
  return window.innerWidth < 768 ? "mobiel" : "desktop";
}

function isEigenaar(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("wb_eigenaar=true");
}

async function getLocatie(): Promise<{
  stad: string | null;
  regio: string | null;
  land: string;
}> {
  try {
    const res = await fetch("https://freeipapi.com/api/json", {
      cache: "no-store",
      signal: AbortSignal.timeout(2000),
    });
    if (!res.ok) return { stad: null, regio: null, land: "NL" };
    const data = await res.json();
    return {
      stad: data.cityName || null,
      regio: data.regionName || null,
      land: data.countryCode || "NL",
    };
  } catch {
    return { stad: null, regio: null, land: "NL" };
  }
}

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Sla admin bezoeken niet op
    if (pathname.startsWith("/admin")) return;
    // Sla eigen bezoeken niet op als cookie gezet is
    if (isEigenaar()) return;

    // Sla resultaat-pagina's op zonder het echte token
    const pagina = pathname.startsWith("/resultaat/")
      ? "/resultaat/[token]"
      : pathname;

    async function trackBezoek() {
      try {
        const locatie = await getLocatie();
        const supabase = createClient();
        await supabase.from("paginabezoeken").insert({
          pagina,
          apparaat: getApparaat(),
          referrer: document.referrer || null,
          sessie_id: getSessieId(),
          stad: locatie.stad,
          regio: locatie.regio,
          land: locatie.land,
        });
      } catch {
        // Stil falen — tracking mag nooit de site breken
      }
    }

    trackBezoek();
  }, [pathname]);

  return null;
}
