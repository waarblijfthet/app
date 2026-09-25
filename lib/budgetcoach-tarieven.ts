/**
 * Gepubliceerde tarieven van budgetcoaches, opgehaald op 25 september 2026.
 *
 * Elke regel is door mij op de eigen site van de aanbieder in Chrome geopend,
 * op de URL die erbij staat. Alleen aanbieders die budgetcoaching doen en hun
 * prijs voor particulieren publiceren. Weggelaten: bewindvoerders en
 * budgetbeheerders zonder coachingtarief (onder meer Pien's Budgethulp, Zaya,
 * Bonum Ducis, BBiB, Schikt-bewind, Mijn Geldkompas, KZHR, Financieel
 * beSchermer, Mijn Geldcoach), aanbieders zonder gepubliceerde prijs
 * (Budgetcoach Me, koMPas Budgetcoach) en werkgeverstarieven.
 *
 * Onderzoek: docs/plan-coach-termen-ranken-25-sep-2026.md.
 *
 * Bij een nieuwe ophaalronde: TARIEVEN_OPGEHAALD bijwerken, elke URL opnieuw
 * openen, en `gewijzigd` zetten op elk artikel dat deze module gebruikt.
 */

export const TARIEVEN_OPGEHAALD = "2026-09-25";
export const TARIEVEN_OPGEHAALD_TEKST = "25 september 2026";

export type Btw = "incl" | "excl" | "geen" | "niet vermeld";
export type TariefSoort = "eenmalig" | "traject" | "uur";

export interface Tarief {
  aanbieder: string;
  url: string;
  product: string;
  soort: TariefSoort;
  /** Het bedrag zoals het op de site staat. */
  prijs: number;
  btw: Btw;
  omschrijving: string;
}

export const TARIEVEN: Tarief[] = [
  { aanbieder: "FH Budgetcoach", url: "https://fhbudgetcoach.nl/tarieven/", product: "Starterspakket", soort: "eenmalig", prijs: 59, btw: "incl", omschrijving: "budgetplan en één online gesprek van maximaal een uur" },
  { aanbieder: "FH Budgetcoach", url: "https://fhbudgetcoach.nl/tarieven/", product: "Basispakket", soort: "traject", prijs: 159, btw: "incl", omschrijving: "budgetplan en drie online coachgesprekken" },
  { aanbieder: "FH Budgetcoach", url: "https://fhbudgetcoach.nl/tarieven/", product: "Toppakket", soort: "traject", prijs: 299, btw: "incl", omschrijving: "intensievere begeleiding" },
  { aanbieder: "Budgetbuddy", url: "https://budgetbuddy.nl/money-kickstart-sessie/", product: "Money Kickstart-sessie", soort: "eenmalig", prijs: 147, btw: "incl", omschrijving: "één sessie van een uur" },
  { aanbieder: "Visueel Bewindvoering", url: "https://visueelbewind.nl/tarieven/tarieven-budgetcoaching", product: "Vaste lasten scan", soort: "eenmalig", prijs: 150, btw: "niet vermeld", omschrijving: "kijken naar de vaste maandelijkse uitgaven" },
  { aanbieder: "Visueel Bewindvoering", url: "https://visueelbewind.nl/tarieven/tarieven-budgetcoaching", product: "Advies bij wijzigingen in je financiële situatie", soort: "traject", prijs: 215, btw: "niet vermeld", omschrijving: "gesprekken rond een verandering, met nazorg" },
  { aanbieder: "Visueel Bewindvoering", url: "https://visueelbewind.nl/tarieven/tarieven-budgetcoaching", product: "Budgetcoaching Standaard", soort: "traject", prijs: 420, btw: "niet vermeld", omschrijving: "overzicht en orde, met nazorggesprekken" },
  { aanbieder: "Visueel Bewindvoering", url: "https://visueelbewind.nl/tarieven/tarieven-budgetcoaching", product: "Budgetcoaching Extra", soort: "traject", prijs: 595, btw: "niet vermeld", omschrijving: "complete begeleiding, met zeven nazorggesprekken" },
  { aanbieder: "Simpel Budgetcoaching", url: "https://www.simpelbudgetcoaching.nl/tarieven/budgetcoaching/", product: "Financiële Quick scan", soort: "eenmalig", prijs: 175, btw: "incl", omschrijving: "eenmalige doorlichting" },
  { aanbieder: "Simpel Budgetcoaching", url: "https://www.simpelbudgetcoaching.nl/tarieven/budgetcoaching/", product: "Budgetcoach Simpel", soort: "traject", prijs: 375, btw: "incl", omschrijving: "kort traject" },
  { aanbieder: "Simpel Budgetcoaching", url: "https://www.simpelbudgetcoaching.nl/tarieven/budgetcoaching/", product: "Budgetcoach Uitgebreid", soort: "traject", prijs: 675, btw: "incl", omschrijving: "uitgebreid traject" },
  { aanbieder: "Mevrouw Budget", url: "https://www.mevrouwbudget.nl/tarieven/", product: "Financiële Check", soort: "eenmalig", prijs: 225, btw: "incl", omschrijving: "drie uur, met een maandbudget en een jaarplan" },
  { aanbieder: "Mevrouw Budget", url: "https://www.mevrouwbudget.nl/tarieven/", product: "Standaard uurtarief", soort: "uur", prijs: 75, btw: "incl", omschrijving: "per uur" },
  { aanbieder: "Personal Budgetcoach", url: "https://www.personalbudgetcoach.org/diensten", product: "Quick scan", soort: "eenmalig", prijs: 250, btw: "incl", omschrijving: "intake, inzicht in inkomsten en uitgaven, kort adviesgesprek" },
  { aanbieder: "Personal Budgetcoach", url: "https://www.personalbudgetcoach.org/diensten", product: "Grip", soort: "traject", prijs: 450, btw: "incl", omschrijving: "twee maanden, twee coachgesprekken" },
  { aanbieder: "Personal Budgetcoach", url: "https://www.personalbudgetcoach.org/diensten", product: "Verandering", soort: "traject", prijs: 650, btw: "incl", omschrijving: "vier maanden, vier coachgesprekken, een maand nazorg" },
  { aanbieder: "Schikt", url: "https://schikt.nl/tarieven/", product: "Intakegesprek, budgetplan en bespreking", soort: "eenmalig", prijs: 250, btw: "niet vermeld", omschrijving: "intake met een budgetplan" },
  { aanbieder: "Schikt", url: "https://schikt.nl/tarieven/", product: "Vervolgafspraak", soort: "uur", prijs: 60.5, btw: "niet vermeld", omschrijving: "per uur, als je dat wilt" },
  { aanbieder: "Budgetcoach voor iedereen", url: "https://www.budgetcoachvooriedereen.nl/tarieven/", product: "Eén sessie", soort: "eenmalig", prijs: 295, btw: "excl", omschrijving: "één gesprek" },
  { aanbieder: "Budgetcoach voor iedereen", url: "https://www.budgetcoachvooriedereen.nl/tarieven/", product: "Kort traject", soort: "traject", prijs: 585, btw: "excl", omschrijving: "één tot drie maanden" },
  { aanbieder: "Budgetcoach voor iedereen", url: "https://www.budgetcoachvooriedereen.nl/tarieven/", product: "Middellang traject", soort: "traject", prijs: 985, btw: "excl", omschrijving: "drie tot vier maanden" },
  { aanbieder: "Budgetcoach voor iedereen", url: "https://www.budgetcoachvooriedereen.nl/tarieven/", product: "Lang traject", soort: "traject", prijs: 1195, btw: "excl", omschrijving: "vier tot zes maanden" },
  { aanbieder: "Hermans budget coaching", url: "https://www.hermansbudgetcoaching.nl/kosten/", product: "Uurtarief", soort: "uur", prijs: 55, btw: "geen", omschrijving: "per uur, zonder btw vanwege de kleineondernemersregeling" },
  { aanbieder: "Budget Coach Annet Bakker", url: "https://budgetcoachannetbakker.nl/diensten-en-tarieven/", product: "Traject", soort: "traject", prijs: 729, btw: "geen", omschrijving: "in drie termijnen; €699 bij betaling ineens; vrijgesteld van btw" },
];

const BTW_FACTOR = 1.21;

/** Het bedrag inclusief btw. Bij "excl" komt er 21 procent bij; anders het bedrag zoals gepubliceerd. */
export function prijsInclBtw(t: Tarief): number {
  return t.btw === "excl" ? Math.round(t.prijs * BTW_FACTOR * 100) / 100 : t.prijs;
}

export interface Bandbreedte {
  min: number;
  max: number;
  aantalAanbieders: number;
}

export function bandbreedte(soort: TariefSoort): Bandbreedte {
  const regels = TARIEVEN.filter((t) => t.soort === soort);
  const bedragen = regels.map((t) => prijsInclBtw(t));
  return {
    min: Math.min(...bedragen),
    max: Math.max(...bedragen),
    aantalAanbieders: new Set(regels.map((t) => t.aanbieder)).size,
  };
}

export const AANTAL_AANBIEDERS = new Set(TARIEVEN.map((t) => t.aanbieder)).size;
export const BAND_EENMALIG = bandbreedte("eenmalig");
export const BAND_TRAJECT = bandbreedte("traject");
export const BAND_UUR = bandbreedte("uur");

/** €59, €1.446, €60,50. Hele euro's zonder decimalen, anders twee decimalen. */
export function euroTarief(bedrag: number): string {
  const heel = Math.abs(bedrag - Math.round(bedrag)) < 0.005;
  return (
    "€" +
    bedrag.toLocaleString("nl-NL", {
      minimumFractionDigits: heel ? 0 : 2,
      maximumFractionDigits: heel ? 0 : 2,
    })
  );
}

/** Afgerond op tientallen, voor lopende tekst en titels ("ongeveer €360"). */
export function euroOngeveer(bedrag: number): string {
  return euroTarief(Math.round(bedrag / 10) * 10);
}

export const BTW_LABEL: Record<Btw, string> = {
  incl: "incl. btw",
  excl: "excl. btw",
  geen: "geen btw",
  "niet vermeld": "btw niet vermeld",
};

/** Externe bronnen voor gratis of vergoede budgetcoaching, ook in Chrome geopend op 25 september 2026. */
export const BRON_GEMEENTE_OSS = "https://www.oss.nl/geldzaken/Budgetcoaching.htm";
export const BRON_REGELHULP = "https://www.regelhulp.nl/onderwerpen/inkomen/hulp-bij-geldzaken";
export const BRON_VERGOEDINGEN_PERSONAL = "https://www.personalbudgetcoach.org/vergoedingen";
export const BRON_WIE_BETAALT_HERMANS = "https://www.hermansbudgetcoaching.nl/wie-betaald-de-budgetcoach/";
