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
    hoeHetWerkt: [
      "Je meldt je aan met je naam en e-mailadres",
      "Ik stuur je binnen 1 werkdag een betaalverzoek van 49 euro, altijd vanaf hallo@waarblijfthet.nl",
      "Na betaling vul je de analyse in, dat kost 2 minuten",
      "Optioneel stuur je een paar recente bankafschriften mee, dan kijk ik naar wat er echt gebeurde in plaats van naar schattingen",
      "Binnen 2 werkdagen daarna heb je je rapport, en direct daarna verwijder ik alles wat je hebt aangeleverd",
    ],
    watJeKrijgt: [
      "Een rapport dat ik zelf schrijf, geen sjabloon en geen algoritme",
      "De drie plekken waar het weglekt, met per plek wat het je per jaar kost",
      "Per plek wat ik zou doen, en wat het niet oplost",
      "De posten die ik géén lek vind, want die zijn er ook",
      "In gewone taal, herleesbaar en te delen met je partner",
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
