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

    // Sla lokaal opgeslagen kopieën van de site over. Opent iemand een
    // opgeslagen pagina lokaal, dan is pathname een bestandspad (schijfletter
    // of .html-bestand). Die horen niet in de statistieken.
    if (/\/[A-Za-z]:\//.test(pathname) || /\.html?$/i.test(pathname)) return;

    // Sla resultaat-pagina's op zonder het echte token
    const pagina = pathname.startsWith("/resultaat/")
      ? "/resultaat/[token]"
      : pathname;

    /**
     * Eerst wegschrijven, daarna pas de locatie ophalen (30-jul-2026).
     *
     * Hiervoor stond `await getLocatie()` vóór de insert. Die haalt een externe
     * dienst op met een timeout van 2 seconden, dus iedereen die de pagina
     * binnen die 2 seconden weer verliet werd nooit geteld. Dat zijn precies de
     * snelle afhakers op artikelen, en dat is de groep die we willen meten.
     * Nu telt het bezoek altijd, en de stad komt er daarna bij als die op tijd
     * beschikbaar is.
     */
    async function trackBezoek() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("paginabezoeken")
          .insert({
            pagina,
            apparaat: getApparaat(),
            referrer: document.referrer || null,
            sessie_id: getSessieId(),
          })
          .select("id")
          .single();
        if (error || !data) return;

        const locatie = await getLocatie();
        if (!locatie.stad && !locatie.regio) return;
        await supabase
          .from("paginabezoeken")
          .update({ stad: locatie.stad, regio: locatie.regio, land: locatie.land })
          .eq("id", data.id);
      } catch {
        // Stil falen, tracking mag nooit de site breken
      }
    }

    trackBezoek();
  }, [pathname]);

  return null;
}
