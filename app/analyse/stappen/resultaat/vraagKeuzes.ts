import { fmtEur } from "@/lib/quiz-types";
import type { ResultaatBerekening } from "./berekenResultaat";

/**
 * Kop, inleiding en de drie voorgekozen vragen van de vraagstap
 * (23-sep-2026, docs/vraagstap-ontwerp-23-sep-2026.md). Afhankelijk van de
 * uitkomst, met dezelfde drempel van €100 als de conclusiekop op stap 1.
 *
 * Elke vraag heeft een vaste sleutel, zodat de admin per soort vraag kan tellen
 * terwijl de tekst per bezoeker verschilt (bedrag, post, jij of jullie).
 * Copyregels: ik-vorm, geen bespaartips, geen diagnose vooraf.
 */

export type Uitkomst = "meer" | "passend" | "minder";

export type VraagKeuze = { sleutel: string; tekst: string };

export type VraagstapTekst = {
  uitkomst: Uitkomst;
  kop: string;
  inleiding: string;
  keuzes: VraagKeuze[];
};

export function bepaalUitkomst(overDiff: number): Uitkomst {
  return overDiff > 100 ? "meer" : overDiff < -100 ? "minder" : "passend";
}

export function vraagstapTekst(r: ResultaatBerekening): VraagstapTekst {
  const uitkomst = bepaalUitkomst(r.overDiff);
  const wij = r.meerdere ? "jullie" : "jou";
  const onsMij = r.meerdere ? "ons" : "mij";
  const Wij = r.meerdere ? "Jullie" : "Jouw";

  // De grootste post in euro's uit de vergelijking; bij "minder over" liefst
  // een post die hoger ligt dan verwacht.
  const hoger = r.gesorteerd.find((a) => a.diff > 0);
  const post = uitkomst === "minder" ? hoger ?? r.gesorteerd[0] : r.gesorteerd[0];
  const postVraag: VraagKeuze | null = post
    ? {
        sleutel: "post",
        tekst: `Is ${fmtEur(post.jij)} aan ${post.label.toLowerCase()} veel voor ${onsMij}?`,
      }
    : null;
  const eersteBekijken: VraagKeuze = { sleutel: "eerste", tekst: "Wat zou jij als eerste bekijken?" };
  const geldscanVraag: VraagKeuze = {
    sleutel: "geldscan",
    tekst: "Wat kan een Geldscan zien dat deze vergelijking niet ziet?",
  };

  const uitleg = "Stel me je vraag. Ik lees je uitkomst erbij en antwoord je binnen 2 werkdagen persoonlijk.";

  if (uitkomst === "meer") {
    return {
      uitkomst: uitkomst,
      kop: `Volgens de cijfers blijft er bij ${wij} genoeg over.`,
      inleiding: `Klopt dat niet met hoe het voelt? ${uitleg}`,
      keuzes: [
        { sleutel: "voelt-krap", tekst: "Het voelt krapper dan dit. Hoe kan dat?" },
        postVraag ?? geldscanVraag,
        eersteBekijken,
      ],
    };
  }
  if (uitkomst === "minder") {
    return {
      uitkomst: uitkomst,
      kop: `Bij ${wij} blijft minder over dan logisch is.`,
      inleiding: `Wil je weten waar ik als eerste zou kijken? ${uitleg}`,
      keuzes: [
        post
          ? { sleutel: "post-eerst", tekst: `Waar zou jij bij ${post.label.toLowerCase()} als eerste naar kijken?` }
          : eersteBekijken,
        {
          sleutel: "waarom-minder",
          tekst: `Waarom blijft er bij ${onsMij} minder over dan bij vergelijkbare huishoudens?`,
        },
        geldscanVraag,
      ],
    };
  }
  return {
    uitkomst: uitkomst,
    kop: `${Wij} ruimte past bij ${r.meerdere ? "jullie" : "jouw"} huishouden.`,
    inleiding: `Voelt het toch krap, of wil je iets weten over een post? ${uitleg}`,
    keuzes: [
      { sleutel: "voelt-krap", tekst: "Waarom voelt het dan toch krap?" },
      postVraag ?? geldscanVraag,
      eersteBekijken,
    ],
  };
}

/** Leesbare naam per sleutel, voor de admin. */
export const VRAAG_SLEUTEL_LABEL: Record<string, string> = {
  "voelt-krap": "Het voelt krapper",
  post: "Is [post] veel?",
  "post-eerst": "Waar kijk je bij [post] eerst?",
  "waarom-minder": "Waarom minder over?",
  eerste: "Wat zou jij eerst bekijken?",
  geldscan: "Wat ziet een Geldscan meer?",
  eigen: "Eigen vraag",
};
