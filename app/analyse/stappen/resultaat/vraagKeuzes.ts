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

/**
 * meer, passend en minder zijn de oude uitkomsten (vergelijking met een
 * vergelijkbaar huishouden). Sinds 30-okt-2026 volgt de vraagstap dezelfde
 * uitkomst als stap 1 (gat, tekort, klopt, ruimer); de oude blijven alleen
 * voor sessies zonder de vraag "wat blijft er echt over". Reden: iemand met
 * een gat las op stap 1 dat hij geld niet kon aanwijzen en op stap 3 dat er
 * "genoeg over" bleef.
 */
export type Uitkomst = "meer" | "passend" | "minder" | "gat" | "tekort" | "klopt" | "ruimer";

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
  if (r.soortUitkomst !== "oud") return nieuweVraagstapTekst(r);
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

/** De vraagstap op dezelfde uitkomst als stap 1 (30-okt-2026). */
function nieuweVraagstapTekst(r: ResultaatBerekening): VraagstapTekst {
  const wij = r.meerdere ? "jullie" : "jou";
  const onsMij = r.meerdere ? "ons" : "mij";
  const Wij = r.meerdere ? "Jullie" : "Jouw";
  const uitleg = "Stel me je vraag. Ik lees je uitkomst erbij en antwoord je binnen 2 werkdagen persoonlijk.";
  const eersteBekijken: VraagKeuze = { sleutel: "eerste", tekst: "Wat zou jij als eerste bekijken?" };
  const geldscanVraag: VraagKeuze = {
    sleutel: "geldscan",
    tekst: "Wat kan een Geldscan zien dat deze vergelijking niet ziet?",
  };
  const hoger = r.gesorteerd.find((a) => a.diff > 0);
  const post = hoger ?? r.gesorteerd[0];
  const postEerst: VraagKeuze = post
    ? { sleutel: "post-eerst", tekst: `Waar zou jij bij ${post.label.toLowerCase()} als eerste naar kijken?` }
    : eersteBekijken;
  const postVraag: VraagKeuze | null = r.gesorteerd[0]
    ? {
        sleutel: "post",
        tekst: `Is ${fmtEur(r.gesorteerd[0].jij)} aan ${r.gesorteerd[0].label.toLowerCase()} veel voor ${onsMij}?`,
      }
    : null;

  if (r.soortUitkomst === "gat" && r.gat !== null) {
    return {
      uitkomst: "gat",
      kop: `Bij ${wij} is ongeveer ${fmtEur(r.gat)} per maand niet aan te wijzen.`,
      inleiding: `Wil je weten waar ik als eerste zou zoeken? ${uitleg}`,
      keuzes: [
        { sleutel: "gat-waar", tekst: "Waar zit zo'n bedrag meestal?" },
        postEerst,
        geldscanVraag,
      ],
    };
  }
  if (r.soortUitkomst === "tekort") {
    return {
      uitkomst: "tekort",
      kop: `Bij ${wij} gaat er op papier meer uit dan er binnenkomt.`,
      inleiding: `Wil je weten waar ik als eerste zou kijken? ${uitleg}`,
      keuzes: [
        postEerst,
        { sleutel: "tekort-waarom", tekst: `Hoe kan het dat het bij ${onsMij} niet rondkomt?` },
        geldscanVraag,
      ],
    };
  }
  if (r.soortUitkomst === "klopt") {
    return {
      uitkomst: "klopt",
      kop: `${Wij} schatting klopt met wat er overblijft.`,
      inleiding: `Voelt het toch krap, of wil je iets weten over een post? ${uitleg}`,
      keuzes: [
        { sleutel: "voelt-krap", tekst: "Het klopt, maar het voelt toch krap. Hoe kan dat?" },
        postVraag ?? geldscanVraag,
        eersteBekijken,
      ],
    };
  }
  return {
    uitkomst: "ruimer",
    kop: `Volgens ${r.meerdere ? "jullie" : "je"} eigen cijfers blijft er bij ${wij} genoeg over.`,
    inleiding: `Klopt dat niet met hoe het voelt? ${uitleg}`,
    keuzes: [
      { sleutel: "voelt-krap", tekst: "Het voelt krapper dan dit. Hoe kan dat?" },
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
  "gat-waar": "Waar zit zo'n bedrag?",
  "tekort-waarom": "Waarom komt het niet rond?",
  eigen: "Eigen vraag",
};
