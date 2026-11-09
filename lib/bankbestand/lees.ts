/**
 * Ingang: één bankbestand inlezen, of meerdere samenvoegen zonder dubbele regels.
 * Ondersteund: CAMT.053 (alle banken), CSV van Rabobank en ING, en elke andere CSV via kolomkeuze.
 * MT940 nog niet: Rabobank stopt er volgens Yuki op 15 nov 2026 mee (zakelijk).
 * Pdf: alleen Rabobank, via leesBankbestandAsync (pdf.js laadt pas als er een pdf gekozen is).
 */
import type { BankId, Formaat, KolomKeuze, LeesResultaat, Transactie } from "./types";
import { leesCsv, raadScheidingsteken } from "./csv";
import { PROFIELEN, leesMetKeuze, normaliseerKop, stelKolommenVoor, type RuweTransactie } from "./profielen";
import { leesCamt053, type XmlParser } from "./camt053";
import { naarCenten, naarIsoDatum } from "./waarden";
import { isRabobankPdf, leesRabobankPdf, type PdfPagina } from "./pdf-rabobank";
import { isPdf, pdfNaarPaginas } from "./pdf";

/** UTF-8 als dat kan, anders Windows-1252 (oudere exports met é en ë). */
export function decodeer(bytes: Uint8Array): string {
  let t: string;
  try {
    t = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    t = new TextDecoder("windows-1252").decode(bytes);
  }
  return t.replace(/^﻿/, "");
}

function metSleutels(
  ruw: RuweTransactie[],
  bank: BankId,
  formaat: Formaat,
  bestand: string,
  rijen: number[],
): Transactie[] {
  // Sleutel zonder omschrijving, zodat dezelfde boeking uit CSV en CAMT.053 als dubbel herkend wordt.
  // Het volgnummer telt identieke boekingen binnen één bestand (twee keer €3,50 bij dezelfde bakker).
  const teller = new Map<string, number>();
  return ruw.map((t, i) => {
    const basis = [t.eigenIban || "?", t.datum, t.bedragCent, t.tegenIban || t.tegenpartij.toLowerCase()].join("|");
    const n = (teller.get(basis) || 0) + 1;
    teller.set(basis, n);
    return {
      sleutel: basis + "#" + n,
      datum: t.datum,
      bedragCent: t.bedragCent,
      eigenIban: t.eigenIban,
      tegenIban: t.tegenIban,
      tegenpartij: t.tegenpartij,
      omschrijving: t.omschrijving,
      code: t.code,
      bron: { bank: bank, formaat: formaat, bestand: bestand, rij: rijen[i] },
    };
  });
}

function bankUitIban(iban: string | null): BankId {
  const code = (iban || "").slice(4, 8);
  if (code === "RABO") return "rabobank";
  if (code === "INGB") return "ing";
  if (code === "ABNA") return "abnamro";
  if (code === "SNSB" || code === "ASNB" || code === "RBRB") return "sns";
  return "onbekend";
}

function lijktOpWaarde(cel: string): boolean {
  return naarIsoDatum(cel) !== null || naarCenten(cel) !== null;
}

export function leesBankbestand(
  bestand: string,
  inhoud: Uint8Array | string,
  opties: { xmlParser?: XmlParser } = {},
): LeesResultaat {
  const tekst = typeof inhoud === "string" ? inhoud.replace(/^﻿/, "") : decodeer(inhoud);
  const begin = tekst.trimStart().slice(0, 400);

  if (/^:20:/m.test(tekst) && /^:61:/m.test(tekst)) {
    return {
      status: "niet-ondersteund",
      formaat: "mt940",
      reden: "MT940 lees ik nog niet. Download hetzelfde overzicht als CSV of CAMT.053.",
    };
  }

  if (begin.startsWith("<")) {
    if (!/BkToCstmrStmt|camt\.053/.test(tekst)) {
      return { status: "niet-ondersteund", formaat: "onbekend", reden: "Dit XML-bestand is geen CAMT.053-afschrift." };
    }
    const parser = opties.xmlParser || (typeof DOMParser !== "undefined" ? new DOMParser() : null);
    if (!parser) return { status: "niet-ondersteund", formaat: "camt053", reden: "Geen XML-lezer beschikbaar." };
    let afschriften;
    try {
      afschriften = leesCamt053(tekst, parser);
    } catch (e) {
      return { status: "niet-ondersteund", formaat: "camt053", reden: (e as Error).message };
    }
    const ruw = afschriften.flatMap((a) => a.transacties);
    const bank = bankUitIban(afschriften[0] ? afschriften[0].iban : null);
    return {
      status: "gelezen",
      bank: bank,
      formaat: "camt053",
      transacties: metSleutels(ruw, bank, "camt053", bestand, ruw.map((_, i) => i + 1)),
      waarschuwingen: [],
    };
  }

  const rijen = leesCsv(tekst, raadScheidingsteken(tekst));
  if (rijen.length === 0) {
    return { status: "niet-ondersteund", formaat: "onbekend", reden: "Het bestand is leeg." };
  }
  const koppen = rijen[0].map(normaliseerKop);
  const profiel = PROFIELEN.find((p) => p.herken(koppen));
  if (profiel) {
    const ruw: RuweTransactie[] = [];
    const nummers: number[] = [];
    let overgeslagen = 0;
    rijen.slice(1).forEach((rij, i) => {
      const v = (kop: string) => {
        const index = koppen.indexOf(kop);
        return index === -1 ? "" : rij[index] || "";
      };
      const t = profiel.lees(v);
      if (t) {
        ruw.push(t);
        nummers.push(i + 2);
      } else {
        overgeslagen++;
      }
    });
    const waarschuwingen = overgeslagen > 0 ? [overgeslagen + " regel(s) zonder leesbare datum of bedrag overgeslagen."] : [];
    return {
      status: "gelezen",
      bank: profiel.bank,
      formaat: "csv",
      transacties: metSleutels(ruw, profiel.bank, "csv", bestand, nummers),
      waarschuwingen: waarschuwingen,
    };
  }

  // Onbekende CSV: de bezoeker wijst zelf de kolommen aan.
  const heeftKopregel = !rijen[0].some(lijktOpWaarde);
  const breedte = Math.max(...rijen.slice(0, 6).map((r) => r.length));
  const namen = heeftKopregel
    ? rijen[0].map((k) => k.trim())
    : Array.from({ length: breedte }, (_, i) => "Kolom " + (i + 1));
  return {
    status: "kolommen-kiezen",
    formaat: "csv",
    heeftKopregel: heeftKopregel,
    koppen: namen,
    voorbeeld: rijen.slice(heeftKopregel ? 1 : 0, (heeftKopregel ? 1 : 0) + 5),
    voorstel: heeftKopregel ? stelKolommenVoor(koppen) : {},
  };
}

/** Tweede ronde voor een onbekende CSV, nadat de bezoeker de kolommen heeft aangewezen. */
export function leesCsvMetKeuze(
  bestand: string,
  inhoud: Uint8Array | string,
  keuze: KolomKeuze,
  heeftKopregel: boolean,
): LeesResultaat {
  const tekst = typeof inhoud === "string" ? inhoud.replace(/^﻿/, "") : decodeer(inhoud);
  const rijen = leesCsv(tekst, raadScheidingsteken(tekst));
  const data = heeftKopregel ? rijen.slice(1) : rijen;
  const ruw: RuweTransactie[] = [];
  const nummers: number[] = [];
  data.forEach((rij, i) => {
    const t = leesMetKeuze(rij, keuze);
    if (t) {
      ruw.push(t);
      nummers.push(i + (heeftKopregel ? 2 : 1));
    }
  });
  const overgeslagen = data.length - ruw.length;
  return {
    status: "gelezen",
    bank: "onbekend",
    formaat: "csv",
    transacties: metSleutels(ruw, "onbekend", "csv", bestand, nummers),
    waarschuwingen: overgeslagen > 0 ? [overgeslagen + " regel(s) zonder leesbare datum of bedrag overgeslagen."] : [],
  };
}

/** Voegt transacties uit meerdere bestanden samen en haalt dubbele boekingen eruit. Gesorteerd op datum. */
export function voegSamen(lijsten: Transactie[][]): Transactie[] {
  const gezien = new Map<string, Transactie>();
  lijsten.forEach((lijst) =>
    lijst.forEach((t) => {
      if (!gezien.has(t.sleutel)) gezien.set(t.sleutel, t);
    }),
  );
  return Array.from(gezien.values()).sort((a, b) => (a.datum < b.datum ? -1 : a.datum > b.datum ? 1 : 0));
}

/** Leest de tekst van een pdf die al als pagina's met posities is uitgepakt. */
export function leesPdfPaginas(bestand: string, paginas: PdfPagina[]): LeesResultaat {
  if (!isRabobankPdf(paginas)) {
    return {
      status: "niet-ondersteund",
      formaat: "pdf",
      reden: "Van deze bank lees ik de pdf nog niet. Download hetzelfde overzicht als CSV.",
    };
  }
  const ruw = leesRabobankPdf(paginas);
  if (ruw.length === 0) {
    return { status: "niet-ondersteund", formaat: "pdf", reden: "In deze pdf vond ik geen boekingen." };
  }
  return {
    status: "gelezen",
    bank: "rabobank",
    formaat: "pdf",
    transacties: metSleutels(ruw, "rabobank", "pdf", bestand, ruw.map((_, i) => i + 1)),
    waarschuwingen: [],
  };
}

/** Zoals leesBankbestand, maar kan ook een pdf lezen. Gebruik deze in de browser. */
export async function leesBankbestandAsync(
  bestand: string,
  inhoud: Uint8Array,
  opties: { xmlParser?: XmlParser } = {},
): Promise<LeesResultaat> {
  if (isPdf(inhoud)) {
    try {
      return leesPdfPaginas(bestand, await pdfNaarPaginas(inhoud));
    } catch {
      return { status: "niet-ondersteund", formaat: "pdf", reden: "Deze pdf kan ik niet openen." };
    }
  }
  return leesBankbestand(bestand, inhoud, opties);
}
