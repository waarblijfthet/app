/**
 * Strikte controle van een samenvatting. Draait in de browser vóór het versturen EN op de server
 * bij binnenkomst (beveiligingseis 12). Elke tekst moet uit TOEGESTANE_NAMEN komen, elk getal
 * binnen een bandbreedte, en onbekende velden worden geweigerd.
 */
import { TOEGESTANE_NAMEN, CATEGORIEEN } from "./categorieen";
import type { Samenvatting } from "./samenvatting";

const MAX_BEDRAG = 1000000;
const MAAND = /^20\d{2}-(0[1-9]|1[0-2])$/;
const BAKKEN = new Set(["vast", "nietMaandelijks", "dagelijks"]);
const CATEGORIE_LABELS = new Set<string>(Object.values(CATEGORIEEN).map((c) => c.label));

type Resultaat = { ok: true; samenvatting: Samenvatting } | { ok: false; fouten: string[] };

function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function valideerSamenvatting(invoer: unknown): Resultaat {
  const fouten: string[] = [];
  const f = (m: string) => {
    if (fouten.length < 20) fouten.push(m);
  };
  const getal = (x: unknown, pad: string, min = -MAX_BEDRAG, max = MAX_BEDRAG) => {
    if (typeof x !== "number" || !Number.isFinite(x) || x < min || x > max) f(pad + ": geen geldig getal");
  };
  const alleenSleutels = (o: Record<string, unknown>, sleutels: string[], pad: string) => {
    Object.keys(o).forEach((k) => {
      if (!sleutels.includes(k)) f(pad + ": onbekend veld " + k.slice(0, 30));
    });
    sleutels.forEach((k) => {
      if (!(k in o)) f(pad + ": veld ontbreekt " + k);
    });
  };
  const lijst = (x: unknown, pad: string, max: number): unknown[] => {
    if (!Array.isArray(x)) {
      f(pad + ": geen lijst");
      return [];
    }
    if (x.length > max) f(pad + ": te lang");
    return x.slice(0, max);
  };
  const maand = (x: unknown, pad: string) => {
    if (typeof x !== "string" || !MAAND.test(x)) f(pad + ": geen geldige maand");
  };
  const naam = (x: unknown, pad: string) => {
    if (typeof x !== "string" || !TOEGESTANE_NAMEN.has(x)) f(pad + ": naam niet toegestaan");
  };
  const categorie = (x: unknown, pad: string) => {
    if (typeof x !== "string" || !CATEGORIE_LABELS.has(x)) f(pad + ": categorie niet toegestaan");
  };

  if (!isObject(invoer)) return { ok: false, fouten: ["geen object"] };
  const s = invoer;
  alleenSleutels(s, ["versie", "bron", "maanden", "perMaand", "gemiddeldPerMaand", "categorieen", "vasteLasten", "nietMaandelijks", "sparen", "kwaliteit", "kenmerken"], "samenvatting");
  if (s.versie !== 2) f("versie: onbekend");
  if (s.bron !== "afschrift" && s.bron !== "schatting") f("bron: onbekend");
  lijst(s.maanden, "maanden", 24).forEach((m, i) => maand(m, "maanden[" + i + "]"));

  const bedragVelden = ["inkomen", "overigeOntvangsten", "vast", "nietMaandelijks", "dagelijks", "extraAflossing", "over"];
  lijst(s.perMaand, "perMaand", 24).forEach((m, i) => {
    const pad = "perMaand[" + i + "]";
    if (!isObject(m)) return f(pad + ": geen object");
    alleenSleutels(m, ["maand"].concat(bedragVelden), pad);
    maand(m.maand, pad + ".maand");
    bedragVelden.forEach((k) => getal(m[k], pad + "." + k));
  });
  if (!isObject(s.gemiddeldPerMaand)) f("gemiddeldPerMaand: geen object");
  else {
    const gemVelden = bedragVelden.concat(["overGewoneMaand"]);
    alleenSleutels(s.gemiddeldPerMaand, gemVelden, "gemiddeldPerMaand");
    gemVelden.forEach((k) => getal((s.gemiddeldPerMaand as Record<string, unknown>)[k], "gemiddeldPerMaand." + k));
  }
  lijst(s.categorieen, "categorieen", 40).forEach((c, i) => {
    const pad = "categorieen[" + i + "]";
    if (!isObject(c)) return f(pad + ": geen object");
    alleenSleutels(c, ["naam", "bak", "perMaand", "aantalPerMaand"], pad);
    categorie(c.naam, pad + ".naam");
    if (typeof c.bak !== "string" || !BAKKEN.has(c.bak)) f(pad + ".bak: onbekend");
    getal(c.perMaand, pad + ".perMaand", 0);
    getal(c.aantalPerMaand, pad + ".aantalPerMaand", 0, 1000);
  });
  lijst(s.vasteLasten, "vasteLasten", 25).forEach((v, i) => {
    const pad = "vasteLasten[" + i + "]";
    if (!isObject(v)) return f(pad + ": geen object");
    alleenSleutels(v, ["naam", "categorie", "perMaand"], pad);
    naam(v.naam, pad + ".naam");
    categorie(v.categorie, pad + ".categorie");
    getal(v.perMaand, pad + ".perMaand", 0);
  });
  lijst(s.nietMaandelijks, "nietMaandelijks", 25).forEach((v, i) => {
    const pad = "nietMaandelijks[" + i + "]";
    if (!isObject(v)) return f(pad + ": geen object");
    alleenSleutels(v, ["naam", "categorie", "maand", "bedrag", "aard"], pad);
    naam(v.naam, pad + ".naam");
    categorie(v.categorie, pad + ".categorie");
    maand(v.maand, pad + ".maand");
    getal(v.bedrag, pad + ".bedrag", 0);
    if (v.aard !== "eenmalig" && v.aard !== "jaarlijks" && v.aard !== "onbekend") f(pad + ".aard: onbekend");
  });
  if (!isObject(s.sparen)) f("sparen: geen object");
  else {
    const sp = s.sparen;
    alleenSleutels(sp, ["naarPotjesPerMaand", "terugUitPotjesPerMaand", "nettoPerMaand"], "sparen");
    getal(sp.naarPotjesPerMaand, "sparen.naarPotjesPerMaand", 0);
    getal(sp.terugUitPotjesPerMaand, "sparen.terugUitPotjesPerMaand", 0);
    getal(sp.nettoPerMaand, "sparen.nettoPerMaand");
  }
  if (!isObject(s.kwaliteit)) f("kwaliteit: geen object");
  else {
    const q = s.kwaliteit;
    alleenSleutels(q, ["aandeelOnbekend", "aandeelOverboekingen"], "kwaliteit");
    getal(q.aandeelOnbekend, "kwaliteit.aandeelOnbekend", 0, 100);
    getal(q.aandeelOverboekingen, "kwaliteit.aandeelOverboekingen", 0, 100);
  }
  if (!isObject(s.kenmerken)) f("kenmerken: geen object");
  else {
    const k = s.kenmerken;
    const velden = ["aantalRekeningen", "boodschappenKeerPerMaand", "boodschappenGemiddeldBedrag", "abonnementenAantal", "abonnementenPerMaand"];
    alleenSleutels(k, velden, "kenmerken");
    velden.forEach((v) => getal(k[v], "kenmerken." + v, 0, 100000));
  }

  return fouten.length ? { ok: false, fouten: fouten } : { ok: true, samenvatting: s as unknown as Samenvatting };
}
