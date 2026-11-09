/**
 * Banken in de uitgavenscan (9-nov-2026). Wat we kunnen lezen staat in lib/bankbestand: Rabobank als
 * CSV en pdf, ING als CSV, elke bank als CAMT.053 (XML), en elke andere CSV als de bezoeker de kolommen
 * aanwijst. De uitleg is bewust algemeen: de precieze menunamen per bank zijn nog niet nagelopen
 * (canvas: "Stappen nog te controleren"). Geen logo's: initialen, zie de notitie op het canvas.
 */
import type { BANKEN } from "@/lib/uitgavenscan/meting";

export type BankSleutel = (typeof BANKEN)[number];

export const BANK_LIJST: { sleutel: BankSleutel; naam: string; initialen: string; pdf: boolean; csvBekend: boolean }[] = [
  { sleutel: "rabobank", naam: "Rabobank", initialen: "RB", pdf: true, csvBekend: true },
  { sleutel: "ing", naam: "ING", initialen: "ING", pdf: false, csvBekend: true },
  { sleutel: "abn_amro", naam: "ABN AMRO", initialen: "ABN", pdf: false, csvBekend: false },
  { sleutel: "sns", naam: "SNS", initialen: "SNS", pdf: false, csvBekend: false },
  { sleutel: "asn", naam: "ASN Bank", initialen: "ASN", pdf: false, csvBekend: false },
  { sleutel: "regiobank", naam: "RegioBank", initialen: "RG", pdf: false, csvBekend: false },
  { sleutel: "bunq", naam: "bunq", initialen: "bq", pdf: false, csvBekend: false },
  { sleutel: "triodos", naam: "Triodos", initialen: "TR", pdf: false, csvBekend: false },
  { sleutel: "knab", naam: "Knab", initialen: "KN", pdf: false, csvBekend: false },
  { sleutel: "anders", naam: "Andere bank", initialen: "?", pdf: false, csvBekend: false },
];

export function bankInfo(s: BankSleutel | null) {
  return BANK_LIJST.find((b) => b.sleutel === s) ?? BANK_LIJST[BANK_LIJST.length - 1];
}

export type Plek = "computer" | "app";

/** Stappen per plek. Eerlijk over wat de app kan: een pdf lees ik alleen van de Rabobank. */
export function stappen(bank: BankSleutel | null, plek: Plek): string[] {
  const b = bankInfo(bank);
  if (plek === "app") {
    if (b.pdf) {
      return [
        "Open de app van " + b.naam + " en ga naar je betaalrekening.",
        "Zoek naar afschriften of een overzicht van je transacties en kies downloaden of delen.",
        "Kies de laatste drie volledige maanden of meer, als pdf.",
        "Bewaar het bestand op je telefoon en kies het hieronder.",
      ];
    }
    return [
      "In de app van " + b.naam + " kun je meestal alleen een pdf maken, en die lees ik van deze bank nog niet.",
      "Download het overzicht daarom op een computer, via internetbankieren, als CSV.",
      "Kies daar de laatste drie volledige maanden of meer.",
      "Lukt het toch met een CSV op je telefoon, kies het bestand dan hieronder.",
    ];
  }
  return [
    "Log in op internetbankieren van " + b.naam + " en open je betaalrekening.",
    "Zoek naar downloaden of exporteren van transacties.",
    "Kies " + (b.pdf ? "CSV (of pdf)" : "CSV, of CAMT.053 als dat er staat") + " en de laatste drie volledige maanden of meer.",
    "Download het. Het bestand staat dan meestal in je map Downloads.",
  ];
}
