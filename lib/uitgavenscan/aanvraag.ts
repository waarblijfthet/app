/**
 * De aanvraag van de Geldscan vanuit de uitgavenscan (9-nov-2026): de vier vragen uit het ontwerp
 * (scherm "Geldscan aanvragen") en de strikte controle op de server. Eén bron voor formulier en route.
 */
import { valideerSamenvatting, type Samenvatting } from "@/lib/uitgaven";

export const DOELEN = [
  { sleutel: "rustiger", label: "Rustiger de maand door" },
  { sleutel: "buffer", label: "Een buffer opbouwen" },
  { sleutel: "sparen_groot", label: "Sparen voor iets groots" },
  { sleutel: "aflossen", label: "Extra aflossen" },
  { sleutel: "minder_werken", label: "Minder gaan werken" },
  { sleutel: "anders", label: "Iets anders" },
] as const;

export const WIE_REGELT = [
  { sleutel: "ik", label: "Ik" },
  { sleutel: "partner", label: "Mijn partner" },
  { sleutel: "samen", label: "Samen" },
  { sleutel: "niemand", label: "Niemand echt" },
] as const;

/** Kosten die eens per jaar komen en die je in een paar maanden afschrift vaak niet ziet. */
export const JAARKOSTEN = [
  { sleutel: "gemeente", label: "Gemeentelijke belastingen", maand: "maart" },
  { sleutel: "autoverzekering", label: "Autoverzekering, jaarpremie", maand: "maart" },
  { sleutel: "waterschap", label: "Waterschapsbelasting", maand: "april" },
  { sleutel: "sinterklaas_kerst", label: "Sinterklaas en kerst", maand: "december" },
  { sleutel: "vakantie", label: "Aanbetaling zomervakantie", maand: "het voorjaar" },
] as const;

export type Jaarkost = { sleutel: string; label: string; bedrag: number | null };

export type Aanvraag = {
  naam: string;
  email: string;
  doelen: string[];
  wieRegelt: string | null;
  krapst: string;
  jaarkosten: Jaarkost[];
  samenvatting: Samenvatting;
};

function schoon(x: unknown, max: number): string {
  return typeof x === "string" ? x.replace(/[\u0000-\u001F\u007F<>]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";
}

export function valideerAanvraag(invoer: unknown): { ok: true; aanvraag: Aanvraag } | { ok: false; fout: string } {
  if (typeof invoer !== "object" || invoer === null || Array.isArray(invoer)) return { ok: false, fout: "Ongeldige aanvraag." };
  const o = invoer as Record<string, unknown>;
  const naam = schoon(o.naam, 60);
  const email = schoon(o.email, 200).toLowerCase();
  if (!naam) return { ok: false, fout: "Vul je voornaam in." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false, fout: "Vul een geldig e-mailadres in." };
  const doelSleutels: readonly string[] = DOELEN.map((d) => d.sleutel);
  const doelen = Array.isArray(o.doelen) ? o.doelen.filter((d): d is string => typeof d === "string" && doelSleutels.includes(d)).slice(0, 6) : [];
  const wieSleutels: readonly string[] = WIE_REGELT.map((w) => w.sleutel);
  const wieRegelt = typeof o.wieRegelt === "string" && wieSleutels.includes(o.wieRegelt) ? o.wieRegelt : null;
  const krapst = schoon(o.krapst, 600);
  const jaarkosten: Jaarkost[] = [];
  if (Array.isArray(o.jaarkosten)) {
    for (const j of o.jaarkosten.slice(0, 12)) {
      if (typeof j !== "object" || j === null) continue;
      const r = j as Record<string, unknown>;
      const vast = JAARKOSTEN.find((k) => k.sleutel === r.sleutel);
      const label = vast ? vast.label : schoon(r.label, 60);
      if (!label) continue;
      const bedrag = typeof r.bedrag === "number" && Number.isInteger(r.bedrag) && r.bedrag > 0 && r.bedrag <= 100000 ? r.bedrag : null;
      jaarkosten.push({ sleutel: vast ? vast.sleutel : "anders", label: label, bedrag: bedrag });
    }
  }
  const s = valideerSamenvatting(o.samenvatting);
  if (!s.ok) return { ok: false, fout: "Je samenvatting klopt niet. Doe de scan opnieuw." };
  return { ok: true, aanvraag: { naam: naam, email: email, doelen: doelen, wieRegelt: wieRegelt, krapst: krapst, jaarkosten: jaarkosten, samenvatting: s.samenvatting } };
}

export const SPOOR_UITGAVENSCAN = "[Spoor: uitgavenscan]";

/** Eén leesbare regel per antwoord, voor grootste_knelpunt en de mail aan Jarno. */
export function antwoordenAlsTekst(a: Aanvraag): string {
  const doelen = a.doelen.map((d) => DOELEN.find((x) => x.sleutel === d)?.label ?? d).join(", ") || "niet ingevuld";
  const wie = WIE_REGELT.find((w) => w.sleutel === a.wieRegelt)?.label ?? "niet ingevuld";
  const jaar = a.jaarkosten.map((j) => j.label + (j.bedrag ? " € " + j.bedrag.toLocaleString("nl-NL") : " (bedrag onbekend)")).join("; ") || "geen opgegeven";
  return SPOOR_UITGAVENSCAN + " Doel: " + doelen + ". Wie regelt het: " + wie + ". Krapst: " + (a.krapst || "niet ingevuld") + ". Jaarkosten: " + jaar + ".";
}
