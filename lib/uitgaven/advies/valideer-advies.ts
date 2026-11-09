/**
 * Controle van het antwoord van de AI voordat het getoond wordt (beveiligingseis 13).
 * Geen cijfers buiten verwijzingen, alleen bestaande verwijzingen, vaste vorm, vaste lengtes,
 * en een paar woorden die volgens de copyregels nooit mogen.
 */
import type { Getallen } from "./getallen";

export type VoorlopigAdvies = {
  /** Eén zin, hooguit één getal: de kop van het scherm. */
  kern: string;
  /** `bij` vult de code in na controle ("per maand", "in 4 maanden"), zodat elk getal een eenheid heeft. */
  opvallend: { titel: string; getal: string; uitleg: string; bij?: string }[];
  watGoedGaat: string;
  eersteStap: string;
  /** Drie dingen die het betaalde plan voor dit huishouden regelt: de teaser. */
  inHetPlan: string[];
};

const VERWIJZING = /\{([a-z0-9_]+)\}/g;
const VERBODEN = [/—/, /–/, / - /, /eerlijk/i, /\bik\b/i, /\bmijn\b/i, /\bwij\b/i, /\bwe\b/i, /beleg/i, /oversluit/i, /overstap/i, /pensioen/i, /garantie/i, /gegarandeerd/i, /crypto/i];

/**
 * Het voorlopig advies is een teaser: één scherm dat in tien seconden te lezen is (Jarno, 9 nov 2026:
 * "te druk, ik weet niet waar ik naar kijk"). Daarom korte velden en weinig getallen per veld.
 * Lengtes gelden voor de tekst met verwijzingen; de prompt vraagt iets minder, zodat herkansingen zeldzaam zijn.
 */
const MAX: Record<string, number> = { kern: 135, titel: 40, uitleg: 160, watGoedGaat: 160, eersteStap: 160, inHetPlan: 120 };
/** Hoeveel verwijzingen een veld mag hebben: [minimaal, maximaal]. */
const AANTAL: Record<string, [number, number]> = { kern: [0, 1], uitleg: [0, 1], watGoedGaat: [1, 1], eersteStap: [0, 0], inHetPlan: [0, 0], titel: [0, 0] };

export function valideerAdvies(invoer: unknown, getallen: Getallen): { ok: true; advies: VoorlopigAdvies } | { ok: false; fouten: string[] } {
  const fouten: string[] = [];
  const tekst = (x: unknown, veld: string, max: number, soort: string = veld) => {
    if (typeof x !== "string" || !x.trim()) return fouten.push(veld + ": leeg of geen tekst");
    if (x.length > max) fouten.push(veld + ": te lang (" + x.length + " tekens, hooguit " + max + ")");
    const n = Array.from(x.matchAll(VERWIJZING)).length;
    const grens = AANTAL[soort];
    if (grens && (n < grens[0] || n > grens[1]))
      fouten.push(veld + ": " + n + " verwijzingen, " + (grens[0] === grens[1] ? "precies " + grens[0] : "hooguit " + grens[1]) + " toegestaan");
    const zonder = x.replace(VERWIJZING, "");
    if (/\d/.test(zonder)) fouten.push(veld + ": bevat een cijfer buiten een verwijzing");
    if (/[<>]/.test(x)) fouten.push(veld + ": bevat < of >");
    for (const m of Array.from(x.matchAll(VERWIJZING))) if (!(m[1] in getallen)) fouten.push(veld + ": onbekende verwijzing {" + m[1] + "}");
    for (const v of VERBODEN) if (v.test(x)) fouten.push(veld + ": verboden woord of teken " + v.source);
    return 0;
  };
  if (typeof invoer !== "object" || invoer === null || Array.isArray(invoer)) return { ok: false, fouten: ["geen object"] };
  const a = invoer as Record<string, unknown>;
  const sleutels = ["kern", "opvallend", "watGoedGaat", "eersteStap", "inHetPlan"];
  Object.keys(a).forEach((k) => {
    if (!sleutels.includes(k)) fouten.push("onbekend veld " + k.slice(0, 30));
  });
  tekst(a.kern, "kern", MAX.kern);
  tekst(a.watGoedGaat, "watGoedGaat", MAX.watGoedGaat);
  tekst(a.eersteStap, "eersteStap", MAX.eersteStap);
  if (!Array.isArray(a.inHetPlan) || a.inHetPlan.length !== 3) fouten.push("inHetPlan: niet precies drie");
  else a.inHetPlan.forEach((x, i) => tekst(x, "inHetPlan[" + i + "]", MAX.inHetPlan, "inHetPlan"));
  if (!Array.isArray(a.opvallend) || a.opvallend.length !== 3) fouten.push("opvallend: niet precies drie");
  else
    a.opvallend.forEach((o, i) => {
      if (typeof o !== "object" || o === null) return fouten.push("opvallend[" + i + "]: geen object");
      const r = o as Record<string, unknown>;
      tekst(r.titel, "opvallend[" + i + "].titel", MAX.titel, "titel");
      tekst(r.uitleg, "opvallend[" + i + "].uitleg", MAX.uitleg, "uitleg");
      if (typeof r.getal !== "string" || !/^\{[a-z0-9_]+\}$/.test(r.getal) || !(r.getal.slice(1, -1) in getallen)) fouten.push("opvallend[" + i + "].getal: geen bestaande verwijzing");
      else if (/^\{categorie_overig/.test(r.getal) || (typeof r.titel === "string" && /overig/i.test(r.titel))) fouten.push("opvallend[" + i + "]: Overig mag geen opvallend punt zijn");
      return 0;
    });
  if (Array.isArray(a.opvallend) && a.opvallend.length === 3) {
    // Elk getal één keer op het scherm: drie verschillende, en niet het getal uit de kop.
    const getallenOpvallend = a.opvallend.map((o) => (o && typeof o === "object" ? String((o as Record<string, unknown>).getal) : ""));
    if (new Set(getallenOpvallend).size !== 3) fouten.push("opvallend: drie keer een ander getal gebruiken");
    const inKern = typeof a.kern === "string" ? Array.from(a.kern.matchAll(VERWIJZING)).map((m) => m[0]) : [];
    if (getallenOpvallend.some((g) => inKern.includes(g))) fouten.push("opvallend: niet hetzelfde getal als in de kern");
  }
  return fouten.length ? { ok: false, fouten: fouten.slice(0, 20) } : { ok: true, advies: a as unknown as VoorlopigAdvies };
}

const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

/** De eenheid bij een getal, uit de naam: zo staat er nooit een kaal bedrag zonder periode. */
export function eenheidBij(naam: string, getallen: Getallen): string {
  const maanden = "in deze " + (getallen.aantal_maanden || "") + " maanden";
  if (naam === "boodschappen_keer_per_maand") return "keer boodschappen per maand";
  if (naam === "boodschappen_gemiddeld_bedrag") return "per keer boodschappen";
  if (naam === "abonnementen_aantal") return "abonnementen";
  if (naam === "vaste_lasten_aantal") return "vaste lasten";
  if (naam === "vaste_lasten_procent_van_inkomen") return "van het inkomen gaat naar vaste lasten";
  if (naam === "aandeel_onbekend") return "van de uitgaven nog niet ingedeeld";
  if (naam === "over_gewone_maand") return "over in een gewone maand";
  if (naam === "laagste_over") return "over in " + (getallen.laagste_over_maand || "de krapste maand");
  if (naam === "hoogste_over") return "over in " + (getallen.hoogste_over_maand || "de ruimste maand");
  if (naam.endsWith("_totaal")) return maanden;
  if (naam.endsWith("_per_maand") || naam.startsWith("categorie_")) return "per maand";
  const maand = MAANDEN.find((m) => naam.endsWith("_" + m));
  if (maand) return "in " + maand;
  return "";
}

/** Vervangt elke {naam} door het getal. Alleen aanroepen op een gevalideerd advies. */
export function vulIn(advies: VoorlopigAdvies, getallen: Getallen): VoorlopigAdvies {
  // Harde spatie in het ingevulde getal, zodat "€" en "1.310" nooit over twee regels breken.
  const v = (s: string) => s.replace(VERWIJZING, (_, k: string) => getallen[k].replace(/ /g, "\u00A0"));
  return {
    kern: v(advies.kern),
    opvallend: advies.opvallend.map((o) => ({ titel: v(o.titel), getal: v(o.getal), uitleg: v(o.uitleg), bij: eenheidBij(o.getal.slice(1, -1), getallen) })),
    watGoedGaat: v(advies.watGoedGaat),
    eersteStap: v(advies.eersteStap),
    inHetPlan: advies.inHetPlan.map(v),
  };
}
