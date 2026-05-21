export interface FAQItem {
  vraag: string;
  antwoord: string;
}

export interface ExternLink {
  label: string;
  url: string;
}

export interface Artikel {
  slug: string;
  titel: string;
  metaTitel: string;
  metaDescription: string;
  datum: string;
  datumFormatted: string;
  leestijd: string;
  categorie: string;
  excerpt: string;
  faq: FAQItem[];
  externLinks?: ExternLink[];
}

export const artikelen: Artikel[] = [
  {
    slug: "goed-salaris-toch-krap",
    titel:
      "Goed salaris, toch krap aan het einde van de maand — hoe kan dat?",
    metaTitel:
      "Goed salaris, toch krap — hoe kan dat? | Waar blijft het",
    metaDescription:
      "Goed verdienen maar toch weinig over? Je bent niet de enige. Ontdek waarom het geld verdwijnt en wat je er zonder grote offers aan kunt doen.",
    datum: "2026-05-19",
    datumFormatted: "19 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt:
      "Je verdient genoeg. Niet extreem, maar genoeg. En toch staat er aan het einde van de maand bijna niks meer op de rekening. Hoe kan dat?",
    faq: [],
    externLinks: [],
  },
  {
    slug: "boodschappen-duitsland-voordeel",
    titel: "Boodschappen doen in Duitsland — levert het echt wat op?",
    metaTitel:
      "Boodschappen in Duitsland: echt voordeel of niet? | Waar blijft het",
    metaDescription:
      "Een volle kar in Duitsland is gemiddeld 15% goedkoper. Maar reken je de reistijd en benzine mee? Wij doen de eerlijke berekening voor jou.",
    datum: "2026-05-21",
    datumFormatted: "21 mei 2026",
    leestijd: "6",
    categorie: "Besparen",
    excerpt:
      "Bijna iedereen kent iemand die er prat op gaat: grote boodschappen haalt hij in Duitsland. Maar of je er echt op vooruitgaat, hangt af van waar je woont en hoe je winkelt.",
    faq: [
      {
        vraag: "Is boodschappen doen in Duitsland echt goedkoper?",
        antwoord:
          "Ja, gemiddeld 15% goedkoper volgens onderzoek van de Consumentenbond uit 2025. Bij A-merken en drogisterijproducten kan het verschil oplopen tot 25 tot 50 procent. Verse producten en huismerkproducten zijn echter vaak vergelijkbaar van prijs.",
      },
      {
        vraag: "Welke supermarkten zijn het goedkoopst in Duitsland?",
        antwoord:
          "Volgens de Consumentenbond zijn GLOBUS, Kaufland, Netto en Penny de goedkoopste opties in Duitsland. Voor drogisterijproducten zijn DM en Rossmann de beste keuze.",
      },
      {
        vraag: "Loont een rit naar Duitsland als je verder weg woont?",
        antwoord:
          "Dat hangt af van je reisafstand en wat je koopt. Reken je reistijd mee — gemiddeld is dat circa tien euro per uur — dan is het voordeel bij een lange rit beperkt. Het loont het meeste voor wie in de grensregio woont of een grote bulk-inkoop doet van drogisterijproducten en A-merken.",
      },
      {
        vraag: "Wat zijn de beste producten om in Duitsland te kopen?",
        antwoord:
          "Drogisterijproducten (shampoo, tandpasta, wasmiddel, deodorant), frisdrank, koffie en A-merk levensmiddelen. Groente, fruit en huismerkproducten zijn minder interessant omdat het prijsverschil daar klein of omgekeerd is.",
      },
      {
        vraag: "Waar moet ik op letten bij boodschappen doen in Duitsland?",
        antwoord:
          "Let op het statiegeldsysteem — op veel flessen en kratten betaal je een hoger statiegeld dat je alleen terugkrijgt met het juiste bonnetje. Ook zijn supermarkten in Duitsland gesloten op zondag. Plan je rit op een doordeweekse dag of zaterdag.",
      },
    ],
    externLinks: [
      {
        label: "Consumentenbond, boodschappen over de grens",
        url: "https://www.consumentenbond.nl/nieuws/2025/boodschappen-over-de-grens-12-20-goedkoper",
      },
      {
        label: "Geldzaken.nl over prijsverschillen Duitsland",
        url: "https://geldzaken.nl/boodschappen-duitsland-waarom-goedkoper",
      },
    ],
  },
  {
    slug: "spaardoelen-maandelijkse-inleg",
    titel:
      "Werken met spaardoelen en maandelijkse inleg — hoe werkt het en wat heb je eraan?",
    metaTitel:
      "Spaardoelen en maandelijkse inleg: hoe pak je dat aan?",
    metaDescription:
      "Sparen lukt pas als je weet waarvoor je spaart. Hoe stel je spaardoelen in die werken, en wat is een realistisch maandbedrag? Een praktische uitleg.",
    datum: "2026-05-21",
    datumFormatted: "21 mei 2026",
    leestijd: "7",
    categorie: "Sparen",
    excerpt:
      "Sparen zonder doel is een beetje zoals afvallen zonder te weten hoeveel je wilt afvallen. Een spaardoel geeft het concreet. Je weet wat je wil, wanneer je het nodig hebt, en wat je maandelijks opzij moet zetten.",
    faq: [
      {
        vraag: "Hoeveel moet je maandelijks sparen?",
        antwoord:
          "Er is geen universeel antwoord, maar financieel adviseurs adviseren minimaal 10 tot 20 procent van je netto inkomen te sparen. Begin met wat haalbaar is — ook 50 euro per maand is een begin. Automatiseer de inleg zodat je er niet over hoeft na te denken.",
      },
      {
        vraag: "Wat is een goede noodbuffer?",
        antwoord:
          "Drie tot zes maanden netto gezinsinkomen is de standaard aanbeveling. Bij een gezinsinkomen van 4.500 euro netto betekent dat 13.500 tot 27.000 euro. Begin met een minimale buffer van 2.000 euro — dat dekt de meeste onverwachte kosten al op.",
      },
      {
        vraag: "Hoe stel ik spaardoelen in?",
        antwoord:
          "Bepaal wat je wil sparen, wanneer je het nodig hebt, en deel het doelbedrag door het aantal maanden. Open per spaardoel een aparte rekening of subrekening. Automatiseer de maandelijkse inleg op de dag dat je salaris binnenkomt.",
      },
      {
        vraag: "Wat als ik te weinig geld overhoud om te sparen?",
        antwoord:
          "Begin met een analyse van je vaste lasten. Bijna altijd zitten er uitgaven in die je niet meer bewust hebt goedgekeurd — abonnementen, verzekeringen, telefoonkosten. Zelfs 50 euro per maand vrijmaken is een begin. Het patroon opbouwen is belangrijker dan het bedrag.",
      },
      {
        vraag: "Werkt sparen per spaardoel beter dan alles op één rekening?",
        antwoord:
          "Ja. Aparte rekeningen of subrekeningen per doel maken het sparen concreter en motiverender. Je ziet het vakantiegeld groeien in plaats van dat alles op één hoop staat. Veel banken bieden gratis subrekeningen aan.",
      },
    ],
    externLinks: [
      {
        label: "Nibud over sparen en buffers",
        url: "https://www.nibud.nl/consumenten/sparen/",
      },
      {
        label: "Deloitte onderzoek financiële kwetsbaarheid Nederland 2024",
        url: "https://www2.deloitte.com/nl/nl/pages/financial-services/articles/financiele-kwetsbaarheid-nederland.html",
      },
    ],
  },
  {
    slug: "salarisverhoging-boven-76000-weinig-netto",
    titel:
      "Waarom levert een salarisverhoging boven de €76.000 zo weinig netto op?",
    metaTitel:
      "Salarisverhoging boven €76.000: waarom levert het zo weinig op?",
    metaDescription:
      "Boven €76.000 gaat 49,5% van elke extra euro naar de belasting. Maar het echte verhaal is nóg ongunstiger. Wij leggen uit wat er werkelijk gebeurt.",
    datum: "2026-05-21",
    datumFormatted: "21 mei 2026",
    leestijd: "6",
    categorie: "Inkomen",
    excerpt:
      "Je hebt hard gewerkt, een mooie salarisverhoging gekregen, en dan valt je nettoloon amper op. Wat is er aan de hand? Het antwoord zit in de manier waarop het Nederlandse belastingstelsel werkt.",
    faq: [
      {
        vraag: "Hoeveel belasting betaal je boven €76.000 in Nederland?",
        antwoord:
          "Boven de tweede schijfgrens van €78.426 (2026) betaal je 49,50% belasting over elke extra euro. Maar al in het traject daarvoor, vanaf circa €43.000, bouwt de arbeidskorting af — waardoor het effectieve marginale tarief al oploopt tot 55 tot 60 procent.",
      },
      {
        vraag: "Waarom voelt een salarisverhoging boven €70.000 zo weinig?",
        antwoord:
          "Omdat je in het traject van de heffingskortingsafbouw zit. Naast de belasting verlies je ook arbeidskorting en algemene heffingskorting over elke extra euro. Het gecombineerde effect is dat je netto minder overhoudt dan je bruto-netto rekenmachine suggereert.",
      },
      {
        vraag: "Wat zijn de belastingschijven in 2026?",
        antwoord:
          "In 2026 zijn er twee schijven in box 1. Schijf 1 loopt tot €38.441 met een tarief van 35,82%. Alles daarboven valt in schijf 2 met een tarief van 49,50%. Heffingskortingen verlagen de werkelijke belastingdruk, maar bouwen af bij hogere inkomens.",
      },
      {
        vraag: "Loont het om pensioen of lijfrente in te leggen bij een hoog inkomen?",
        antwoord:
          "Ja, pensioenopbouw en lijfrentepremies zijn aftrekbaar van je belastbaar inkomen in box 1. Bij een toptarief van 49,50% levert elke euro die je inlegt direct 49,50 cent belastingvoordeel op. Dit maakt extra pensioenopbouw fiscaal aantrekkelijk bij hoge inkomens.",
      },
      {
        vraag: "Is het verstandig een salarisverhoging te vragen als ik al boven €76.000 verdien?",
        antwoord:
          "Absoluut. Meer bruto is altijd meer netto, hoe klein het verschil ook is. Maar stel je verwachtingen bij: een verhoging van €10.000 bruto levert je netto pakweg €333 tot €375 per maand op na belasting en kortingsafbouw.",
      },
    ],
    externLinks: [
      {
        label: "Belastingdienst tarieven 2026",
        url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/",
      },
      {
        label: "Belastingschijven 2026 uitleg",
        url: "https://www.nettoloonberekenen.nl/belastingschijven-2026/",
      },
    ],
  },
];

export function getArtikel(slug: string): Artikel | undefined {
  return artikelen.find((a) => a.slug === slug);
}
