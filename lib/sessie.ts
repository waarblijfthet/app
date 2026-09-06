"use client";

/**
 * Eén sessie-id voor de hele site.
 *
 * Reden (6-sep-2026): `PageTracker` en `lib/track.ts` gebruikten allebei de
 * sleutel `wb_sessie` uit sessionStorage, maar `app/analyse/QuizClient.tsx`
 * maakte zijn eigen UUID. Daardoor stonden paginabezoeken, CTA-kliks en
 * analysevoortgang in drie tabellen met twee verschillende sessie-id's, en was
 * de trechter niet aan elkaar te rekenen: je kon niet zeggen hoeveel van de
 * bezoekers die op /analyse landden ook echt begonnen, afrondden en daarna op
 * de Geldscan klikten. Dat is precies de vraag uit plan sectie 6 punt 1.
 *
 * Deze functie is vanaf nu de enige plek waar die sleutel gelezen of gezet
 * wordt. Wie een nieuwe tabel met sessie_id schrijft, gebruikt hem ook.
 */

const SLEUTEL = "wb_sessie";

export function getSessieId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = sessionStorage.getItem(SLEUTEL);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem(SLEUTEL, id);
    }
    return id;
  } catch {
    // Privacymodus of geblokkeerde opslag: liever een sessie zonder id dan
    // een pagina die stukloopt op tracking.
    return "";
  }
}

export function getApparaat(): string {
  if (typeof window === "undefined") return "onbekend";
  return window.innerWidth < 768 ? "mobiel" : "desktop";
}

export function isEigenaar(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes("wb_eigenaar=true");
}
