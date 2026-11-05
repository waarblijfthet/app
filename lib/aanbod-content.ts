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
    naam: "Geldrapport",
    prijs: "€49",
    // 5-nov-2026: twee manieren van aanleveren en de maandstructuur als vast
    // onderdeel. Zie docs/plan-positionering-aanbod-05-nov-2026.md.
    hoeHetWerkt: [
      "Je meldt je aan met je voornaam en e-mailadres",
      "Je krijgt per e-mail een betaalverzoek van 49 euro (Tikkie of overboeking), in je bevestigingsmail of uiterlijk binnen 1 werkdag",
      "Na betaling stuur je op wat je hebt: je eigen overzicht (Excel, Google Sheet, je bankapp of budgetapp) of een korte vragenlijst",
      "Bankafschriften mogen, maar hoeven niet",
      "Binnen 2 werkdagen daarna heb je je rapport. Wat je stuurde verwijder ik daarna",
    ],
    watJeKrijgt: [
      "Een rapport dat ik zelf schrijf, geen sjabloon en geen algoritme",
      "Nagekeken: de drie dingen die het meest opvallen, en wat er ontbreekt",
      "Je potjes uitgerekend: per potje het bedrag dat er elke maand in moet",
      "Waar je afwijkt van vergelijkbare huishoudens, en waar niet",
      "Als er niets te repareren valt, staat dat er ook",
      "In gewone taal, te delen met je partner. Daarna doe je het zelf",
    ],
  },
  gesprek: {
    naam: "Adviesgesprek",
    prijs: "€125",
    hoeHetWerkt: [
      "Je meldt je aan, ik neem binnen 1 werkdag contact op",
      "Je doet vooraf de analyse, dat is je vertrekpunt",
      "Het gesprek zelf: 45 minuten via video",
      "Daarna verwijder ik alles wat je hebt aangeleverd",
    ],
    watJeKrijgt: [
      "Een blik op je cijfers en op de grootste afwijkingen",
      "2 tot 3 concrete doelen waar je meteen mee verder kunt",
      "Een schriftelijke samenvatting, ook om met je partner te lezen",
      "Geen verplicht vervolg: zelf verder, of alsnog een traject",
    ],
  },
  intensief: {
    naam: "Persoonlijk traject",
    prijs: "€497",
    hoeHetWerkt: [
      "Intakegesprek van 45 minuten via video, je situatie volledig in kaart",
      "Ik stel je plan op",
      "Drie maanden meekijken en bijsturen, met een tussenevaluatie na 6 weken",
      "Na drie maanden een eindrapport met aanbevelingen",
    ],
    watJeKrijgt: [
      "Een plan dat bij jouw situatie past, geen standaardindeling",
      "Drie maandelijkse videocalls om bij te sturen",
      "Bereikbaar via WhatsApp voor tussentijdse vragen",
      "Een eindrapport waarmee je zelf verder kunt",
    ],
  },
};
