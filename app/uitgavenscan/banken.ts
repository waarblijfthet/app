/**
 * Banken in de uitgavenscan. Wat we kunnen lezen staat in lib/bankbestand: Rabobank als CSV en pdf,
 * ING als CSV, elke bank als CAMT.053 (XML), en elke andere CSV als de bezoeker de kolommen aanwijst.
 * Daarom raad ik per bank het formaat aan dat het minste gedoe geeft: de eigen CSV bij Rabobank en ING,
 * CAMT.053 waar de bank dat aanbiedt (dan hoeft niemand kolommen aan te wijzen), anders CSV.
 *
 * Stappen nagelopen op 9 nov 2026, in eigen woorden (geen tekst overgenomen). Bronnen:
 * - Rabobank: rabobank.nl/particulieren/service/financiele-overzichten/overzicht-betaalrekening-ontvangen
 *   (computer: 'Maak een transactieoverzicht op maat'; app staat er alleen in het Engels:
 *   Settings > Payment accounts > Download transactions. Nederlandse namen volgens Summas.)
 * - ING: ing.nl/particulier/digitaal-bankieren/afschriften-downloaden (computer en app, bevestigd).
 *   Of de app ook CSV aanbiedt, zegt ING niet; daarom de terugvaloptie in de app-stappen.
 * - ABN AMRO: abnamro.nl/nl/prive/betalen/bij-en-afschrijvingen/downloaden.html (computer en app, bevestigd).
 * - ASN Bank (ook SNS sinds 1 juli 2025): asnbank.nl 'waar kan ik wat regelen' (downloaden alleen online,
 *   niet in de app) en de ASN-pdf over formaten (pdf, CAMT.053, CSV).
 * - RegioBank: gaat in 2026 over naar ASN Bank. Menu volgens de handleiding van gemeente Stadskanaal.
 * - bunq: help.bunq.com 'What types of bank statements can I export' (alleen in de app; pdf, CSV, MT940).
 * - Triodos: triodos.nl veelgestelde vraag 'Hoe importeer ik zelf een overzicht ...' (computer, bevestigd).
 * - Knab: NIET door de bank bevestigd (community en MuntLab). Daarom algemener geformuleerd.
 * Geen logo's: initialen, zie de notitie op het canvas.
 */
import type { BANKEN } from "@/lib/uitgavenscan/meting";

export type BankSleutel = (typeof BANKEN)[number];
export type Plek = "computer" | "app";

/** "ja": de app kan het in een formaat dat ik lees. "nee": alleen online. "alleen_app": alleen in de app. */
type AppKan = "ja" | "nee" | "misschien" | "alleen_app";

type Bank = {
  sleutel: BankSleutel;
  naam: string;
  initialen: string;
  pdf: boolean;
  csvBekend: boolean;
  /** Het formaat dat ik aanraad, zoals het in het menu van de bank heet. */
  formaat: string;
  app: AppKan;
  /** Korte opmerking onder de stappen, of null. */
  noot: string | null;
};

export const BANK_LIJST: Bank[] = [
  { sleutel: "rabobank", naam: "Rabobank", initialen: "RB", pdf: true, csvBekend: true, formaat: "CSV", app: "ja", noot: null },
  {
    sleutel: "ing",
    naam: "ING",
    initialen: "ING",
    pdf: false,
    csvBekend: true,
    formaat: "CSV",
    app: "misschien",
    noot: "ING bewaart af- en bijschrijvingen tot 10 jaar terug, dus een langere periode kiezen mag.",
  },
  {
    sleutel: "abn_amro",
    naam: "ABN AMRO",
    initialen: "ABN",
    pdf: false,
    csvBekend: false,
    formaat: "CAMT.053",
    app: "ja",
    noot: "Kies als einddatum een werkdag: eindigt de periode in een weekend, dan kunnen de laatste boekingen ontbreken. Krijg je een zip-bestand, open dat eerst, dan zie je het xml-bestand.",
  },
  {
    sleutel: "sns",
    naam: "SNS",
    initialen: "SNS",
    pdf: false,
    csvBekend: false,
    formaat: "CAMT.053",
    app: "nee",
    noot: "SNS heet sinds juli 2025 ASN Bank. Zie je nog het oude SNS-scherm, dan heten de menu's bijna hetzelfde.",
  },
  {
    sleutel: "asn",
    naam: "ASN Bank",
    initialen: "ASN",
    pdf: false,
    csvBekend: false,
    formaat: "CAMT.053",
    app: "nee",
    noot: null,
  },
  {
    sleutel: "regiobank",
    naam: "RegioBank",
    initialen: "RG",
    pdf: false,
    csvBekend: false,
    formaat: "CAMT.053",
    app: "nee",
    noot: "RegioBank gaat over naar ASN Bank. Bankier je al via ASN Bank, kies dan hierboven ASN Bank.",
  },
  {
    sleutel: "bunq",
    naam: "bunq",
    initialen: "bq",
    pdf: false,
    csvBekend: false,
    formaat: "CSV",
    app: "alleen_app",
    noot: "Na het kiezen van het bestand vraag ik je welke kolom de datum, het bedrag en de omschrijving is.",
  },
  {
    sleutel: "triodos",
    naam: "Triodos",
    initialen: "TR",
    pdf: false,
    csvBekend: false,
    formaat: "CAMT.053",
    app: "nee",
    noot: "Triodos maakt het bestand niet meteen: het staat na het aanvragen klaar in de lijst met aangevraagde downloads, die twee weken bewaard blijft.",
  },
  {
    sleutel: "knab",
    naam: "Knab",
    initialen: "KN",
    pdf: false,
    csvBekend: false,
    formaat: "CSV",
    app: "nee",
    noot: "Na het kiezen van het bestand vraag ik je welke kolom de datum, het bedrag en de omschrijving is.",
  },
  { sleutel: "anders", naam: "Andere bank", initialen: "?", pdf: false, csvBekend: false, formaat: "CAMT.053 of CSV", app: "misschien", noot: null },
];

export function bankInfo(s: BankSleutel | null): Bank {
  return BANK_LIJST.find((b) => b.sleutel === s) ?? BANK_LIJST[BANK_LIJST.length - 1];
}

const MAANDEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

/** De laatste drie volledige maanden, bijvoorbeeld "1 augustus tot en met 31 oktober". */
export function periodeVoorbeeld(nu: Date = new Date()): string {
  const van = new Date(nu.getFullYear(), nu.getMonth() - 3, 1);
  const tot = new Date(nu.getFullYear(), nu.getMonth(), 0);
  return "1 " + MAANDEN[van.getMonth()] + " tot en met " + tot.getDate() + " " + MAANDEN[tot.getMonth()];
}

function periode(): string {
  return "Neem de laatste drie volledige maanden (" + periodeVoorbeeld() + "). Langer mag ook, dan wordt het beeld preciezer.";
}

/** De twee regels onder de knoppen op het scherm 'Waar download je je afschrift?'. */
export function plekUitleg(bank: BankSleutel | null): Record<Plek, string> {
  const b = bankInfo(bank);
  const computer = b.app === "alleen_app" ? "Bij bunq gaat dit via de app" : "Via internetbankieren, als " + b.formaat;
  let app: string;
  if (b.app === "ja") app = b.pdf ? "In de app, als " + b.formaat + " of pdf" : "In de app, als " + b.formaat;
  else if (b.app === "alleen_app") app = "In de bunq-app, als " + b.formaat;
  else if (b.app === "nee") app = "Bij " + b.naam + " gaat dit via internetbankieren, niet in de app";
  else if (b.sleutel === "ing") app = "In de app, als die CSV aanbiedt";
  else app = "Lukt soms, vaak alleen als pdf";
  return { computer: computer, app: app };
}

function computerStappen(b: Bank): string[] {
  const p = periode();
  switch (b.sleutel) {
    case "rabobank":
      return [
        "Ga op rabobank.nl naar de pagina ‘Overzicht betaalrekening ontvangen’ en klik op ‘Maak een transactieoverzicht op maat’. Je logt dan in op Rabo Online Bankieren.",
        "Kies je rekening en als downloadformaat CSV.",
        "Vul bij ‘Specifieke datumreeks’ de periode in. " + p,
        "Klik op ‘Downloaden’. Het bestand staat daarna meestal in je map Downloads.",
      ];
    case "ing":
      return [
        "Log in op Mijn ING en klik op ‘Service’.",
        "Kies ‘Overzichten en downloads’ (soms heet dit ‘Je downloads & overzichten’) en dan ‘Af- en bijschrijvingen downloaden’.",
        "Kies je betaalrekening. " + p,
        "Kies als bestandsformaat ‘Kommagescheiden CSV’, niet pdf.",
        "Klik op ‘Downloaden’. Het bestand staat daarna meestal in je map Downloads.",
      ];
    case "abn_amro":
      return [
        "Log in op Internet Bankieren van ABN AMRO.",
        "Ga naar ‘Zelf regelen’ en kies ‘Bij- en afschrijvingen downloaden’.",
        "Kies je betaalrekening en als formaat CAMT.053. Staat dat er niet, kies dan TXT.",
        p,
        "Klik op het downloadicoon. Het bestand staat daarna meestal in je map Downloads.",
      ];
    case "sns":
    case "asn":
      return [
        "Log in op ASN Online Bankieren" + (b.sleutel === "sns" ? " (voorheen Mijn SNS)." : "."),
        "Ga naar ‘Zelf regelen’, dan ‘Rekeningen’ en kies ‘Bij- en afschrijvingen downloaden’.",
        "Kies je betaalrekening en als formaat CAMT.053 (xml). CSV kan ook.",
        p,
        "Klik op downloaden. Het bestand staat daarna meestal in je map Downloads.",
      ];
    case "regiobank":
      return [
        "Log in op internetbankieren van RegioBank.",
        "Ga naar ‘Zelf regelen’, dan ‘Rekeningen’ en kies het downloaden van je transacties.",
        "Kies je betaalrekening en als formaat CAMT.053 (xml). CSV kan ook.",
        p,
        "Klik op downloaden. Het bestand staat daarna meestal in je map Downloads.",
      ];
    case "bunq":
      return appStappen(b);
    case "triodos":
      return [
        "Log in op Internet Bankieren van Triodos.",
        "Kies links ‘Zelf regelen’, dan rechts ‘Downloads’ en ‘Transacties exporteren’.",
        "Kies je betaalrekening. " + p,
        "Kies bij ‘Export formaat’ CAMT.053, of CSV als je die liever hebt, en klik op ‘Export aanvragen’.",
        "Het bestand verschijnt onder ‘Overzicht van aangevraagde downloads’. Klik daar op ‘Download’.",
      ];
    case "knab":
      return [
        "Log in op internetbankieren van Knab en open je betaalrekening.",
        "Zoek je transacties op over de periode die je wilt. " + p,
        "Kies voor downloaden of exporteren van de selectie, als CSV.",
        "Het bestand staat daarna meestal in je map Downloads.",
      ];
    default:
      return [
        "Log in op internetbankieren en open je betaalrekening.",
        "Zoek naar ‘downloaden’, ‘exporteren’ of ‘bij- en afschrijvingen downloaden’.",
        "Kies CAMT.053 als dat er staat (soms ‘XML’), anders CSV. Een pdf lees ik van de meeste banken nog niet.",
        p,
        "Download het. Het bestand staat daarna meestal in je map Downloads.",
      ];
  }
}

function appStappen(b: Bank): string[] {
  const p = periode();
  switch (b.sleutel) {
    case "rabobank":
      return [
        "Open de Rabo App en log in.",
        "Ga naar ‘Instellingen’, dan ‘Betaalrekeningen’ en kies ‘Transacties downloaden’.",
        "Kies je rekening en CSV als dat kan, anders pdf. " + p,
        "Bewaar het bestand op je telefoon (bij iPhone: ‘Bewaar in Bestanden’) en kies het hieronder.",
      ];
    case "ing":
      return [
        "Open de ING app en tik op je betaalrekening.",
        "Tik op het tandwieltje (‘Instellingen’) en kies ‘Afschriften downloaden’.",
        "Vul de start- en einddatum in. " + p,
        "Kies een CSV-formaat als dat in de lijst staat. Staat er alleen pdf, doe het dan op een computer: een pdf van ING lees ik nog niet.",
        "Tik op ‘Download’, bewaar het bestand op je telefoon en kies het hieronder.",
      ];
    case "abn_amro":
      return [
        "Open de ABN AMRO app en tik op ‘Profiel’.",
        "Kies ‘Rekeningen en betalen’ en dan ‘Afschriften en jaaroverzicht’.",
        "Kies bij ‘Soort overzicht’ voor ‘Bij- en afschrijvingen’ en kies je rekening.",
        "Kies CAMT.053 als formaat. " + p,
        "Download het, bewaar het op je telefoon en kies het hieronder.",
      ];
    case "bunq":
      return [
        "Open de bunq-app en ga naar je profiel.",
        "Kies ‘Accounting’ (in het Nederlands soms ‘Boekhouding’) en dan ‘Export Bank Statement’.",
        "Kies je rekening en CSV als formaat. " + p,
        "Tik op ‘Export Statement’, bewaar het bestand en kies het hieronder.",
      ];
    case "sns":
    case "asn":
    case "regiobank":
    case "triodos":
    case "knab":
      return [
        "Bij " + b.naam + " kun je je transacties " + (b.sleutel === "knab" ? "voor zover ik weet " : "") + "niet als bestand downloaden in de app. Pak daarom een computer of laptop en log daar in.",
        ...computerStappen(b).slice(1),
      ];
    default:
      return [
        "Open de app van je bank en ga naar je betaalrekening.",
        "Zoek naar afschriften, downloaden of exporteren.",
        "Kies CAMT.053 of CSV als dat kan. " + p,
        "Bewaar het bestand op je telefoon en kies het hieronder. Lukt het alleen als pdf, doe het dan op een computer.",
      ];
  }
}

/** De stappen voor deze bank op deze plek. */
export function stappen(bank: BankSleutel | null, plek: Plek): string[] {
  const b = bankInfo(bank);
  return plek === "app" ? appStappen(b) : computerStappen(b);
}

export function bankNoot(bank: BankSleutel | null): string | null {
  return bankInfo(bank).noot;
}
