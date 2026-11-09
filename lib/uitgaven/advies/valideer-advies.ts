/**
 * Controle van het antwoord van de AI voordat het getoond wordt (beveiligingseis 13).
 * Geen cijfers buiten verwijzingen, alleen bestaande verwijzingen, vaste vorm, vaste lengtes,
 * en een paar woorden die volgens de copyregels nooit mogen.
 */
import type { Getallen } from "./getallen";

export type VoorlopigAdvies = {
  kern: string;
  toelichting: string;
  opvallend: { titel: string; getal: string; uitleg: string }[];
  watGoedGaat: string;
  eersteStap: string;
  /** Drie dingen die het betaalde plan voor dit huishouden regelt: de teaser. */
  inHetPlan: string[];
};

const VERWIJZING = /\{([a-z0-9_]+)\}/g;
const VERBODEN = [/—/, /–/, / - /, /eerlijk/i, /\bik\b/i, /\bmijn\b/i, /\bwij\b/i, /\bwe\b/i, /beleg/i, /oversluit/i, /overstap/i, /pensioen/i, /garantie/i, /gegarandeerd/i, /crypto/i];

const MAX: Record<string, number> = { kern: 350, toelichting: 800, titel: 60, uitleg: 350, watGoedGaat: 400, eersteStap: 400, inHetPlan: 220 };

export function valideerAdvies(invoer: unknown, getallen: Getallen): { ok: true; advies: VoorlopigAdvies } | { ok: false; fouten: string[] } {
  const fouten: string[] = [];
  const tekst = (x: unknown, veld: string, max: number) => {
    if (typeof x !== "string" || !x.trim()) return fouten.push(veld + ": leeg of geen tekst");
    if (x.length > max) fouten.push(veld + ": te lang (" + x.length + ")");
    const zonder = x.replace(VERWIJZING, "");
    if (/\d/.test(zonder)) fouten.push(veld + ": bevat een cijfer buiten een verwijzing");
    if (/[<>]/.test(x)) fouten.push(veld + ": bevat < of >");
    for (const m of Array.from(x.matchAll(VERWIJZING))) if (!(m[1] in getallen)) fouten.push(veld + ": onbekende verwijzing {" + m[1] + "}");
    for (const v of VERBODEN) if (v.test(x)) fouten.push(veld + ": verboden woord of teken " + v.source);
    return 0;
  };
  if (typeof invoer !== "object" || invoer === null || Array.isArray(invoer)) return { ok: false, fouten: ["geen object"] };
  const a = invoer as Record<string, unknown>;
  const sleutels = ["kern", "toelichting", "opvallend", "watGoedGaat", "eersteStap", "inHetPlan"];
  Object.keys(a).forEach((k) => {
    if (!sleutels.includes(k)) fouten.push("onbekend veld " + k.slice(0, 30));
  });
  tekst(a.kern, "kern", MAX.kern);
  tekst(a.toelichting, "toelichting", MAX.toelichting);
  tekst(a.watGoedGaat, "watGoedGaat", MAX.watGoedGaat);
  tekst(a.eersteStap, "eersteStap", MAX.eersteStap);
  if (!Array.isArray(a.inHetPlan) || a.inHetPlan.length !== 3) fouten.push("inHetPlan: niet precies drie");
  else a.inHetPlan.forEach((x, i) => tekst(x, "inHetPlan[" + i + "]", MAX.inHetPlan));
  if (!Array.isArray(a.opvallend) || a.opvallend.length !== 3) fouten.push("opvallend: niet precies drie");
  else
    a.opvallend.forEach((o, i) => {
      if (typeof o !== "object" || o === null) return fouten.push("opvallend[" + i + "]: geen object");
      const r = o as Record<string, unknown>;
      tekst(r.titel, "opvallend[" + i + "].titel", MAX.titel);
      tekst(r.uitleg, "opvallend[" + i + "].uitleg", MAX.uitleg);
      if (typeof r.getal !== "string" || !/^\{[a-z0-9_]+\}$/.test(r.getal) || !(r.getal.slice(1, -1) in getallen)) fouten.push("opvallend[" + i + "].getal: geen bestaande verwijzing");
      else if (/^\{categorie_overig/.test(r.getal) || (typeof r.titel === "string" && /overig/i.test(r.titel))) fouten.push("opvallend[" + i + "]: Overig mag geen opvallend punt zijn");
      return 0;
    });
  return fouten.length ? { ok: false, fouten: fouten.slice(0, 20) } : { ok: true, advies: a as unknown as VoorlopigAdvies };
}

/** Vervangt elke {naam} door het getal. Alleen aanroepen op een gevalideerd advies. */
export function vulIn(advies: VoorlopigAdvies, getallen: Getallen): VoorlopigAdvies {
  const v = (s: string) => s.replace(VERWIJZING, (_, k: string) => getallen[k]);
  return {
    kern: v(advies.kern),
    toelichting: v(advies.toelichting),
    opvallend: advies.opvallend.map((o) => ({ titel: v(o.titel), getal: v(o.getal), uitleg: v(o.uitleg) })),
    watGoedGaat: v(advies.watGoedGaat),
    eersteStap: v(advies.eersteStap),
    inHetPlan: advies.inHetPlan.map(v),
  };
}
