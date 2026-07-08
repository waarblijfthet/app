// Eén bron voor de proces- en uitkomst-teksten per pakket, gebruikt door
// zowel /aanbod (detail-secties) als /aanbod/intake (aanmeldformulier),
// zodat ze nooit uit elkaar kunnen lopen.
//
// Twee vaste categorieën, nooit gemengd:
// - hoeHetWerkt: de volgorde der dingen (wat gebeurt wanneer)
// - watJeKrijgt: de inhoud van het pakket (wat je uiteindelijk in handen hebt)

export type Pakket = "geldscan" | "gesprek" | "intensief";

export interface PakketInfo {
  naam: string;
  prijs: string;
  hoeHetWerkt: string[];
  watJeKrijgt: string[];
}

export const PAKKET_INFO: Record<Pakket, PakketInfo> = {
  geldscan: {
    naam: "Geldscan",
    prijs: "€49",
    hoeHetWerkt: [
      "Je meldt je aan met je naam en e-mailadres",
      "Betaalverzoek binnen 1 werkdag (€49)",
      "Na betaling vul je de gratis analyse in (2 minuten)",
      "Optioneel: stuur ook een paar bankafschriften mee",
      "Binnen 2 werkdagen daarna ontvang je je geldrapport, waarna ik alle aangeleverde gegevens verwijder",
    ],
    watJeKrijgt: [
      "Een geldrapport dat ik zelf schrijf, geen sjabloon of algoritme",
      "Je drie grootste lekken, en per lek wat ik zou doen",
      "Gebaseerd op jouw eigen cijfers, in gewone taal",
      "Herleesbaar en deelbaar met je partner",
      "Geld terug als ik geen 3 serieuze verbeterpunten vind",
    ],
  },
  gesprek: {
    naam: "Adviesgesprek",
    prijs: "€125",
    hoeHetWerkt: [
      "Je meldt je aan, ik neem binnen 1 werkdag contact op",
      "Doe vooraf de gratis analyse (5 minuten), je vertrekpunt",
      "Het gesprek zelf: 45 minuten, via video",
      "Daarna verwijder ik alle aangeleverde gegevens",
    ],
    watJeKrijgt: [
      "Een heldere blik op je cijfers en de grootste afwijkingen",
      "2 à 3 concrete doelen waar je meteen mee verder kunt",
      "Een schriftelijke samenvatting, ook te delen met je partner",
      "Geen verplicht vervolg: zelf verder, of alsnog een traject",
    ],
  },
  intensief: {
    naam: "Persoonlijk traject",
    prijs: "€497",
    hoeHetWerkt: [
      "Intakegesprek (45 minuten, video), je situatie volledig in kaart",
      "Ik stel je financiële plan op",
      "3 maanden lang blijf ik meekijken en bijsturen, met een tussenevaluatie na 6 weken",
      "Na 3 maanden ontvang je een eindrapport met aanbevelingen",
    ],
    watJeKrijgt: [
      "Een volledig financieel plan op maat",
      "3 maandelijkse videocalls om bij te sturen",
      "WhatsApp bereikbaar voor vragen, de hele 3 maanden",
      "Eindrapport met concrete aanbevelingen om zelf mee verder te gaan",
    ],
  },
};
