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

export function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Sla admin bezoeken niet op
    if (pathname.startsWith("/admin")) return;

    // Sla resultaat-pagina's op zonder het echte token
    const pagina = pathname.startsWith("/resultaat/")
      ? "/resultaat/[token]"
      : pathname;

    const supabase = createClient();

    supabase
      .from("paginabezoeken")
      .insert({
        pagina,
        apparaat: getApparaat(),
        referrer: document.referrer || null,
        sessie_id: getSessieId(),
      })
      .then(() => {});
    // Stil falen — tracking mag nooit de site breken
  }, [pathname]);

  return null;
}
