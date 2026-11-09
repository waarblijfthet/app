/**
 * Meting van de uitgavenscan (9-nov-2026). Zelfde opzet als de analyse (quiz_voortgang): één rij per
 * sessie in uitgavenscan_voortgang, met het verste scherm, wanneer elk scherm voor het eerst in beeld
 * kwam, en een paar kenmerken. Doel: per stap zien of mensen starten en waar ze afhaken, en per bank
 * of het bestand gelezen kon worden.
 *
 * Wat er NIET in staat, nooit: bedragen, namen, rekeningnummers, bestandsnamen, omschrijvingen of
 * adviesteksten. Alleen keuzes uit vaste lijsten en kleine tellingen. De server-route weigert alles
 * wat niet in deze lijsten past (beveiligingseis 12: valideer alles wat binnenkomt).
 *
 * Deze lijst is de enige bron: de wizard meet met deze id's en de admin rekent met dezelfde volgorde.
 */

export const SCHERMEN = [
  { id: "start", label: "Start", fase: "Afschrift", soms: false },
  { id: "bank", label: "Kies je bank", fase: "Afschrift", soms: false },
  { id: "apparaat", label: "Waar download je het", fase: "Afschrift", soms: false },
  { id: "downloaden", label: "Uitleg en bestand kiezen", fase: "Afschrift", soms: false },
  { id: "gelezen", label: "Bestand gelezen", fase: "Afschrift", soms: false },
  { id: "eigen_rekeningen", label: "Eigen rekeningen", fase: "Vragen", soms: false },
  { id: "inkomen", label: "Inkomen", fase: "Vragen", soms: false },
  { id: "wat_is_dit", label: "Wat is dit? (onbekende posten)", fase: "Vragen", soms: true },
  { id: "alles_nalopen", label: "Alles nalopen (optioneel)", fase: "Vragen", soms: true },
  { id: "grote_bedragen", label: "Grote bedragen", fase: "Vragen", soms: true },
  { id: "overzicht", label: "Waar het heen gaat", fase: "Uitkomst", soms: false },
  { id: "voorlopig_advies", label: "Voorlopig advies", fase: "Uitkomst", soms: false },
  { id: "geldscan_aanvragen", label: "Geldscan aanvragen", fase: "Geldscan", soms: false },
  { id: "aanvraag_verzonden", label: "Aanvraag verzonden", fase: "Geldscan", soms: false },
] as const;

export type SchermId = (typeof SCHERMEN)[number]["id"];

const SCHERM_IDS: readonly string[] = SCHERMEN.map((s) => s.id);

export function schermIndex(id: string): number {
  return SCHERM_IDS.indexOf(id);
}

export function isSchermId(x: unknown): x is SchermId {
  return typeof x === "string" && SCHERM_IDS.includes(x);
}

/** Wie een bank kiest, is gestart. Wie alleen de startpagina zag, heeft hem geopend. */
export const GESTART_VANAF: SchermId = "apparaat";

export const BANKEN = ["rabobank", "ing", "abn_amro", "sns", "asn", "regiobank", "triodos", "bunq", "knab", "anders"] as const;
export const DOWNLOAD_PLEKKEN = ["app", "computer", "weet_niet"] as const;
export const FORMATEN = ["csv", "pdf", "camt053", "anders"] as const;
/** Waarom een bestand niet gelezen kon worden. "te_kort": minder dan één volledige maand. */
export const LEESFOUTEN = ["onbekend_formaat", "geen_transacties", "te_kort", "te_groot", "wachtwoord", "kapot", "anders"] as const;
/** gemaakt; te_onvolledig: te veel onbekend, de wizard vroeg om meer; mislukt: AI of controle faalde; te_druk: limiet. */
export const ADVIES_STATUSSEN = ["gemaakt", "te_onvolledig", "mislukt", "te_druk"] as const;
export const APPARATEN = ["mobiel", "desktop", "onbekend"] as const;

export type Kenmerken = {
  bank?: (typeof BANKEN)[number];
  downloadPlek?: (typeof DOWNLOAD_PLEKKEN)[number];
  formaat?: (typeof FORMATEN)[number];
  leesfout?: (typeof LEESFOUTEN)[number];
  aantalBestanden?: number;
  aantalMaanden?: number;
  onbekendProcent?: number;
  aantalVragen?: number;
  groteBedragen?: number;
  aiIndeling?: boolean;
  adviesStatus?: (typeof ADVIES_STATUSSEN)[number];
};

const KEUZE_VELDEN: Record<string, readonly string[]> = {
  bank: BANKEN,
  downloadPlek: DOWNLOAD_PLEKKEN,
  formaat: FORMATEN,
  leesfout: LEESFOUTEN,
  adviesStatus: ADVIES_STATUSSEN,
};
const TEL_VELDEN: Record<string, number> = {
  aantalBestanden: 20,
  aantalMaanden: 36,
  onbekendProcent: 100,
  aantalVragen: 500,
  groteBedragen: 50,
};
const JA_NEE_VELDEN = ["aiIndeling"];

export type Meting = { sessieId: string; scherm: SchermId; apparaat: (typeof APPARATEN)[number]; kenmerken: Kenmerken };

const SESSIE = /^[A-Za-z0-9-]{8,64}$/;

/** Strikte controle van wat de browser stuurt. Eén onbekend veld of waarde en de hele meting gaat niet door. */
export function valideerMeting(invoer: unknown): { ok: true; meting: Meting } | { ok: false; reden: string } {
  if (typeof invoer !== "object" || invoer === null || Array.isArray(invoer)) return { ok: false, reden: "geen object" };
  const o = invoer as Record<string, unknown>;
  for (const k of Object.keys(o)) if (!["sessie_id", "scherm", "apparaat", "kenmerken"].includes(k)) return { ok: false, reden: "onbekend veld" };
  if (typeof o.sessie_id !== "string" || !SESSIE.test(o.sessie_id)) return { ok: false, reden: "sessie" };
  if (!isSchermId(o.scherm)) return { ok: false, reden: "scherm" };
  const apparaat = (APPARATEN as readonly string[]).includes(o.apparaat as string) ? (o.apparaat as Meting["apparaat"]) : "onbekend";
  const kenmerken: Record<string, unknown> = {};
  if (o.kenmerken !== undefined && o.kenmerken !== null) {
    if (typeof o.kenmerken !== "object" || Array.isArray(o.kenmerken)) return { ok: false, reden: "kenmerken" };
    for (const [k, v] of Object.entries(o.kenmerken as Record<string, unknown>)) {
      if (k in KEUZE_VELDEN) {
        if (typeof v !== "string" || !KEUZE_VELDEN[k].includes(v)) return { ok: false, reden: "waarde " + k };
      } else if (k in TEL_VELDEN) {
        if (typeof v !== "number" || !Number.isInteger(v) || v < 0 || v > TEL_VELDEN[k]) return { ok: false, reden: "waarde " + k };
      } else if (JA_NEE_VELDEN.includes(k)) {
        if (typeof v !== "boolean") return { ok: false, reden: "waarde " + k };
      } else return { ok: false, reden: "onbekend kenmerk" };
      kenmerken[k] = v;
    }
  }
  return { ok: true, meting: { sessieId: o.sessie_id, scherm: o.scherm, apparaat: apparaat, kenmerken: kenmerken as Kenmerken } };
}
