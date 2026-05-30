export interface FAQItem {
  vraag: string;
  antwoord: string;
}

export interface ExternLink {
  label: string;
  url: string;
}

// ── Preview types (discriminated union) ──────────────────────────────────────

export type PreviewVergelijking = {
  type: "vergelijking";
  label: string;
  items: { naam: string; bedrag: number; kleur: string }[];
  noot?: string;
};

export type PreviewVerdeling = {
  type: "verdeling";
  label: string;
  posten: { naam: string; pct: number; kleur: string }[];
  uitkomst: string;
};

export type PreviewStatistiek = {
  type: "statistiek";
  label: string;
  segmenten: { label: string; pct: number; kleur: string; tekstKleur: string }[];
};

export type PreviewTarief = {
  type: "tarief";
  label: string;
  netto: number;
  belasting: number;
  kortingsafbouw: number;
};

export type PreviewPijn = {
  type: "pijn";
  label: string;
  items: string[];
};

export type PreviewDoelen = {
  type: "doelen";
  label: string;
  stappen: { bedrag: number; maanden: number; kleur: string }[];
};

export type ArticlePreviewData =
  | PreviewVergelijking
  | PreviewVerdeling
  | PreviewStatistiek
  | PreviewTarief
  | PreviewPijn
  | PreviewDoelen;

// ── Artikel interface ────────────────────────────────────────────────────────

export interface Artikel {
  slug: string;
  titel: string;
  korteTitel: string;
  metaTitel: string;
  metaDescription: string;
  datum: string;
  datumFormatted: string;
  leestijd: string;
  categorie: string;
  excerpt: string;
  faq: FAQItem[];
  externLinks?: ExternLink[];
  preview: ArticlePreviewData;
}

// ── Artikeldata ──────────────────────────────────────────────────────────────

export const artikelen: Artikel[] = [
  {
    slug: "wat-is-normaal-bedrag-boodschappen-per-maand",
    korteTitel: "Boodschappen: norm vs. werkelijkheid",
    titel:
      "Wat zijn normale boodschappenkosten per maand? Nibud vs. werkelijkheid",
    metaTitel:
      "Wat zijn normale boodschappenkosten per maand? Nibud vs. werkelijkheid",
    metaDescription:
      "Nibud zegt €627 voor een gezin van 4. Maar in de praktijk geeft datzelfde gezin €700-900 uit. Wat verklaart dat verschil — en wat betekent het voor jou?",
    datum: "2026-05-21",
    datumFormatted: "21 mei 2026",
    leestijd: "7",
    categorie: "Besparen",
    excerpt:
      "Het Nibud zegt €627 voor een gezin van vier. Maar in de praktijk geeft datzelfde gezin €700-900 uit — en bij pubers loopt het op naar €1.000 of meer. De kloof is groter dan je denkt, en er zijn drie oorzaken die vrijwel niemand benoemt.",
    preview: {
      type: "vergelijking",
      label: "Nibud norm vs. werkelijkheid",
      items: [
        { naam: "Nibud minimum", bedrag: 655, kleur: "#2D6A4F" },
        { naam: "Werkelijk gemiddeld", bedrag: 875, kleur: "#C4603A" },
      ],
      noot: "Gezin + 2 kinderen /mnd",
    },
    faq: [
      {
        vraag: "Wat zijn normale boodschappenkosten voor een gezin van 4 in 2026?",
        antwoord:
          "Nibud hanteert een minimum van €553-674 per maand voor voeding. Maar uit forum-polls en blogs blijkt dat de meeste gezinnen van vier €700-875 per maand uitgeven als je ook drogisterij, bakker en tussendoor meeneemt. Met pubers loopt dit snel op naar €900-1.100.",
      },
      {
        vraag: "Waarom geef ik zoveel meer uit aan boodschappen dan het Nibud-advies?",
        antwoord:
          "Omdat het Nibud-bedrag een minimum is voor voeding — geen drogisterij, geen bakker, geen schoollunches. Bovendien onderschat Nibud hoeveel kinderen boven de 10 jaar eten. In de praktijk geeft bijna elk gezin met oudere kinderen structureel meer uit dan de norm.",
      },
      {
        vraag: "Hoeveel geven gezinnen met drie kinderen werkelijk uit aan boodschappen?",
        antwoord:
          "Uit ervaringen van bloggers en forums: gezinnen van vijf met kinderen van 8-14 jaar geven gemiddeld €900-1.400 per maand uit. Dat hangt sterk af van de winkelkeuze, of je actief plant en of je drogisterijproducten meetelt.",
      },
      {
        vraag: "Hoe bespaar ik op boodschappen zonder in te leveren op kwaliteit?",
        antwoord:
          "Begin met weekmenu's maken — dat vermindert verspilling en impulsaankopen. Kies bewust je winkel per categorie: drogisterij goedkoper bij Aldi of over de grens bij DM. Stel een wekelijks budget in dat zichtbaar is. Een realistisch doel is 10-15% besparen op je huidige bedrag.",
      },
      {
        vraag: "Telt de bakker en slager mee in het Nibud-bedrag voor boodschappen?",
        antwoord:
          "Nee. Het Nibud-bedrag betreft alleen voeding bereid thuis, gebaseerd op supermarktprijzen. Brood van de bakker, vlees van de slager en alle drogisterijproducten komen er bovenop. Voor een gemiddeld gezin is dat al snel €150-250 extra per maand.",
      },
    ],
    externLinks: [
      {
        label: "Nibud huishoudelijke uitgaven 2026",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/huishoudelijke-uitgaven/",
      },
      {
        label: "Forum poll boodschappen per maand (Zeg maar Yes)",
        url: "https://www.zegmaaryes.nl/boodschappen-per-maand-gezin-t38420.html",
      },
      {
        label: "Mamablogger boodschappenbudget 2025",
        url: "https://mamablogger.nl/boodschappenbudget-en-weekbudget-voor-2025/",
      },
    ],
  },
  {
    slug: "is-4000-euro-netto-goed-salaris-nederland",
    korteTitel: "Is €4.000 netto een goed salaris?",
    titel:
      "Is €4.000 netto per maand een goed salaris? Ja — maar dit is wat er werkelijk van overblijft",
    metaTitel:
      "Is €4.000 netto een goed salaris? Ja — maar dit is wat er echt van overblijft",
    metaDescription:
      "€4.000 netto is top 25% in Nederland. Maar een gezin met koopwoning en 2 kinderen houdt er vaak minder dan €500 van over. Hoe dat kan, leggen we eerlijk uit.",
    datum: "2026-05-21",
    datumFormatted: "21 mei 2026",
    leestijd: "6",
    categorie: "Inkomen",
    excerpt:
      "€4.000 netto is top 25% van Nederland. En toch houdt een gezin met koopwoning en twee kinderen er gemiddeld €505 van over. Dat voelt niet als top 25 procent. Hoe dat kan — en wat je eraan doet.",
    preview: {
      type: "verdeling",
      label: "Van €4.000 netto blijft over",
      posten: [
        { naam: "Wonen", pct: 39, kleur: "#1C3A2A" },
        { naam: "Boodschappen", pct: 22, kleur: "#2D6A4F" },
        { naam: "Vervoer", pct: 15, kleur: "#8AB89A" },
        { naam: "Rest", pct: 24, kleur: "#EDE6D8" },
      ],
      uitkomst: "€505 over",
    },
    faq: [
      {
        vraag: "Is €4.000 netto per maand een goed salaris in Nederland?",
        antwoord:
          "Ja. Het meest voorkomende netto inkomen in Nederland is €3.100 (modaal 2026). Wie €4.000 netto verdient, zit in de top 25 procent. Maar of het 'genoeg' voelt, hangt volledig af van gezinssamenstelling en vaste lasten.",
      },
      {
        vraag: "Hoeveel houdt een gezin met twee kinderen over van €4.000 netto?",
        antwoord:
          "Op basis van werkelijke gemiddelden: na hypotheek/huur, boodschappen, auto, kinderkosten en abonnementen blijft er €400-600 over per maand. Met oudere kinderen of hogere woonlasten kan dit dalen naar €100-300.",
      },
      {
        vraag: "Waarom voelt €4.000 netto toch krap aan?",
        antwoord:
          "Door de combinatie van hoge vaste lasten, boodschappenkosten die structureel boven de Nibud-norm liggen, en het ontbreken van een systeem voor geldbeheer. Geld op één rekening zonder bestemming verdwijnt altijd sneller dan je denkt.",
      },
      {
        vraag: "Hoeveel moet je overhouden van €4.000 netto?",
        antwoord:
          "Het Nibud adviseert minimaal 10% te sparen — dus €400 per maand. Dat is voor een gezin met kinderen en een koopwoning al uitdagend. Een realistischer doel voor veel gezinnen is beginnen met €150-200 per maand automatisch apart zetten.",
      },
      {
        vraag: "Verdient Jan Modaal €4.000 netto in 2026?",
        antwoord:
          "Nee. Jan Modaal verdient in 2026 bruto €48.000 per jaar, ofwel €4.000 bruto per maand. Netto houdt hij daar €3.100 van over. Wie €4.000 netto verdient, heeft een bruto salaris van €65.000 of meer.",
      },
    ],
    externLinks: [
      {
        label: "CPB modaal inkomen 2026",
        url: "https://www.cpb.nl",
      },
      {
        label: "CBS inkomensverdeling 2024",
        url: "https://www.cbs.nl",
      },
      {
        label: "KekMama gemiddelde kosten van een gezin",
        url: "https://www.kekmama.nl/artikel/financien-en-verzekering/gemiddelde-kosten-van-een-gezin",
      },
    ],
  },
  {
    slug: "hoeveel-sparen-per-maand-normaal-nederland",
    korteTitel: "Hoeveel sparen is normaal?",
    titel:
      "Hoeveel sparen per maand is normaal? Het eerlijke antwoord — inclusief de mensen die helemaal niks sparen",
    metaTitel:
      "Hoeveel sparen per maand is normaal? Nibud zegt 10% — de werkelijkheid is anders",
    metaDescription:
      "Nibud adviseert 10%. Maar de gemiddelde Nederlander spaart 6,5% — en een kwart spaart helemaal niets. Wat is realistisch, en waar begin je als je nu niks overhoudt?",
    datum: "2026-05-21",
    datumFormatted: "21 mei 2026",
    leestijd: "6",
    categorie: "Sparen",
    excerpt:
      "Nibud adviseert 10%. Maar meer dan een kwart van de Nederlandse huishoudens spaart helemaal niets — en van de rest haalt de meerderheid die 10% niet. Dit is wat normaal is, en wat een realistisch beginpunt is als je nu niks overhoudt.",
    preview: {
      type: "statistiek",
      label: "Nederlanders die sparen",
      segmenten: [
        { label: "Spaart niets", pct: 27, kleur: "#FDECEA", tekstKleur: "#B03A2E" },
        { label: "< 5%", pct: 31, kleur: "#FAF0EB", tekstKleur: "#92600A" },
        { label: "5-10%", pct: 24, kleur: "#EDE6D8", tekstKleur: "#4A5E4E" },
        { label: "10%+", pct: 18, kleur: "#E8F2EC", tekstKleur: "#2D6A4F" },
      ],
    },
    faq: [
      {
        vraag: "Hoeveel procent van de Nederlanders spaart helemaal niets?",
        antwoord:
          "Meer dan een kwart van de Nederlandse huishoudens spaart structureel niets, blijkt uit CBS-data en onderzoek van FinBuddy. Dat is niet uitzonderlijk — het is de werkelijkheid voor veel gezinnen met hoge vaste lasten en weinig overschot.",
      },
      {
        vraag: "Hoeveel sparen Nederlanders gemiddeld per maand?",
        antwoord:
          "Structurele spaarders sparen gemiddeld €240 per maand. De Nibud-norm van 10% zou voor een modaal netto inkomen van €3.100 neerkomen op €310. De meeste mensen halen die norm niet — het werkelijke gemiddelde ligt op 6,5% van het netto inkomen.",
      },
      {
        vraag: "Hoe begin ik met sparen als ik nu niets overhou?",
        antwoord:
          "Stel een automatische overschrijving in op de dag dat je salaris binnenkomt — ook al is het maar €50. Spaar eerst, geef daarna uit. Dat ene principe maakt meer verschil dan elk ander financieel advies. Verhoog het bedrag elke drie maanden met €25.",
      },
      {
        vraag: "Hoeveel spaargeld is normaal voor mijn leeftijd?",
        antwoord:
          "Het CBS-mediaan: dertigers hebben gemiddeld €23.000 spaargeld, veertigers €34.000. Maar het gemiddelde wordt sterk omhoog getrokken door een kleine groep. De helft van de dertigers heeft minder dan €10.000. Vergelijk jezelf niet met gemiddelden — vergelijk jezelf met wie je gisteren was.",
      },
      {
        vraag: "Is het Nibud-advies van 10% realistisch voor een gezin met kinderen?",
        antwoord:
          "Voor veel gezinnen met hoge vaste lasten en kinderen is 10% lastig haalbaar. Maar begin is wat telt. Zelfs €50 per maand automatisch apart zetten is beter dan niets, en bouwt het patroon op dat later makkelijker op te schalen is.",
      },
    ],
    externLinks: [
      {
        label: "Nibud spaarnorm en bufferbedragen",
        url: "https://www.nibud.nl/consumenten/sparen/",
      },
      {
        label: "FinBuddy gemiddeld spaarbedrag Nederlanders 2026",
        url: "https://www.finbuddy.nl/blogs/sparen/wat-sparen-nederlanders-gemiddeld-per-maand/",
      },
      {
        label: "CBS vermogensstatistieken 2024",
        url: "https://www.cbs.nl/nl-nl/cijfers/detail/83834NED",
      },
    ],
  },
  {
    slug: "goed-salaris-toch-krap",
    korteTitel: "Goed salaris, toch krap — waarom?",
    titel:
      "Goed salaris, toch krap aan het einde van de maand — hoe kan dat?",
    metaTitel: "Goed salaris, toch krap — hoe kan dat?",
    metaDescription:
      "Goed verdienen maar toch weinig over? Je bent niet de enige. Ontdek waarom het geld verdwijnt en wat je er zonder grote offers aan kunt doen.",
    datum: "2026-05-19",
    datumFormatted: "19 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt:
      "Je verdient genoeg. Niet extreem, maar genoeg. En toch staat er aan het einde van de maand bijna niks meer op de rekening. Hoe kan dat?",
    preview: {
      type: "pijn",
      label: "Herken jij dit?",
      items: ["Goed verdienen", "Toch krap", "Geen idee waarom"],
    },
    faq: [],
    externLinks: [],
  },
  {
    slug: "vergelijken-boodschappen-nederland-duitsland",
    korteTitel: "Boodschappen: Nederland vs. Duitsland",
    titel:
      "Boodschappen vergelijken Nederland vs Duitsland — wat koop je waar?",
    metaTitel:
      "Boodschappen Nederland vs Duitsland: wat is goedkoper in 2026?",
    metaDescription:
      "Exacte prijsvergelijking van 10 producten, per winkel uitgelegd. Zo bespaar je tot 54% op drogisterij en A-merken zonder te gokken.",
    datum: "2026-05-21",
    datumFormatted: "21 mei 2026",
    leestijd: "7",
    categorie: "Besparen",
    excerpt:
      "Bijna de helft goedkoper. Dat is wat Kassa ontdekte bij een vergelijking van 13 drogisterijproducten. €161,69 in Nederland, €73,75 in Duitsland. Voor exact dezelfde producten.",
    preview: {
      type: "vergelijking",
      label: "Nederland vs. Duitsland",
      items: [
        { naam: "Nederland", bedrag: 161.69, kleur: "#C4603A" },
        { naam: "Duitsland", bedrag: 73.75, kleur: "#2D6A4F" },
      ],
      noot: "Zelfde 13 producten (Kassa 2025)",
    },
    faq: [
      {
        vraag: "Hoeveel goedkoper zijn boodschappen in Duitsland dan in Nederland?",
        antwoord:
          "Gemiddeld 15% goedkoper voor een volledig boodschappenmandje, blijkt uit Consumentenbond-onderzoek uit 2025. Voor drogisterijproducten loopt het verschil op tot 45 tot 55 procent. Bij A-merken als Oral-B, Dove en Ariel is het verschil het grootst.",
      },
      {
        vraag: "Welke producten zijn het goedkoopst in Duitsland?",
        antwoord:
          "Drogisterijproducten (tandpasta, shampoo, wasmiddel, babyspullen), frisdrank, koffie en A-merk levensmiddelen. Verse producten zoals groente en fruit zijn niet altijd goedkoper. Typisch Nederlandse producten als stroopwafels zijn in Nederland zelf vaak goedkoper.",
      },
      {
        vraag: "Welke supermarkt is het beste in Duitsland?",
        antwoord:
          "Voor drogisterij: DM of Rossmann. Voor levensmiddelen en A-merken: Kaufland of Lidl. De slimste aanpak is een combinatie: DM voor verzorgingsproducten, daarna Kaufland of Lidl voor de rest.",
      },
      {
        vraag: "Loont boodschappen doen in Duitsland als ik ver weg woon?",
        antwoord:
          "Reken met tien euro per uur reistijd. Een rit van 30 minuten heen en terug kost je effectief tien tot vijftien euro. Op een boodschappenmandje van €100 met 45% drogisterijbesparing hou je dan nog €10 tot €15 netto over. Verder weg dan een uur rijden? Combineer het met een uitstapje.",
      },
      {
        vraag: "Waar moet ik op letten bij boodschappen in Duitsland?",
        antwoord:
          "Let op statiegeld — lever in bij Kaufland want hun automaten accepteren alles. Neem contant geld mee als backup. Supermarkten zijn gesloten op zondag. Download de DM-app en Rossmann-app voor actuele coupons. Tank bij terugkomst in Duitsland als de prijs lager is.",
      },
    ],
    externLinks: [
      {
        label: "Consumentenbond boodschappen over de grens 2025",
        url: "https://www.consumentenbond.nl/nieuws/2025/boodschappen-over-de-grens-12-20-goedkoper",
      },
      {
        label: "Kassa prijsvergelijking DM vs Kruidvat",
        url: "https://www.bnnvara.nl/kassa/artikelen/prijsvergelijking-kassa-shoppen-in-duitsland-nog-veel-goedkoper-dan-verwacht",
      },
    ],
  },
  {
    slug: "boodschappen-duitsland-voordeel",
    korteTitel: "Boodschappen in Duitsland: het voordeel",
    titel: "Boodschappen doen in Duitsland — levert het echt wat op?",
    metaTitel:
      "Boodschappen in Duitsland: echt voordeel of niet?",
    metaDescription:
      "Een volle kar in Duitsland is gemiddeld 15% goedkoper. Maar reken je de reistijd en benzine mee? Wij doen de eerlijke berekening voor jou.",
    datum: "2026-05-21",
    datumFormatted: "21 mei 2026",
    leestijd: "6",
    categorie: "Besparen",
    excerpt:
      "Bijna iedereen kent iemand die er prat op gaat: grote boodschappen haalt hij in Duitsland. Maar of je er echt op vooruitgaat, hangt af van waar je woont en hoe je winkelt.",
    preview: {
      type: "vergelijking",
      label: "Volle kar: NL vs. DE",
      items: [
        { naam: "Nederland", bedrag: 100, kleur: "#C4603A" },
        { naam: "Duitsland", bedrag: 85, kleur: "#2D6A4F" },
      ],
      noot: "Gemiddeld 15% goedkoper (Consumentenbond 2025)",
    },
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
    korteTitel: "Spaardoelen: zo werkt het",
    titel:
      "Werken met spaardoelen en maandelijkse inleg — hoe werkt het en wat heb je eraan?",
    metaTitel: "Spaardoelen en maandelijkse inleg: hoe pak je dat aan?",
    metaDescription:
      "Sparen lukt pas als je weet waarvoor je spaart. Hoe stel je spaardoelen in die werken, en wat is een realistisch maandbedrag? Een praktische uitleg.",
    datum: "2026-05-21",
    datumFormatted: "21 mei 2026",
    leestijd: "7",
    categorie: "Sparen",
    excerpt:
      "Sparen zonder doel is een beetje zoals afvallen zonder te weten hoeveel je wilt afvallen. Een spaardoel geeft het concreet. Je weet wat je wil, wanneer je het nodig hebt, en wat je maandelijks opzij moet zetten.",
    preview: {
      type: "doelen",
      label: "Hoe lang tot €5.000?",
      stappen: [
        { bedrag: 50, maanden: 100, kleur: "#FDECEA" },
        { bedrag: 100, maanden: 50, kleur: "#FAF0EB" },
        { bedrag: 200, maanden: 25, kleur: "#E8F2EC" },
      ],
    },
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
    korteTitel: "Waarom salarisverhoging boven €76k weinig oplevert",
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
    preview: {
      type: "tarief",
      label: "Van €10.000 bruto meer houd je over",
      netto: 375,
      belasting: 4950,
      kortingsafbouw: 675,
    },
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
  {
    slug: "wat-zijn-normale-vaste-lasten-gezin",
    korteTitel: "Vaste lasten: wat is normaal?",
    titel:
      "Wat zijn normale vaste lasten voor een gezin? Het eerlijke overzicht voor 2026",
    metaTitel:
      "Wat zijn normale vaste lasten voor een gezin in 2026?",
    metaDescription:
      "Voor een gezin liggen de vaste lasten tussen €2.600 en €3.200 per maand. Maar wat is normaal voor jouw situatie? En waar zit de meeste bespaarruimte?",
    datum: "2026-05-23",
    datumFormatted: "23 mei 2026",
    leestijd: "7",
    categorie: "Inzicht",
    excerpt:
      "De vaste lasten voor een gezin in 2026 liggen gemiddeld tussen €2.600 en €3.200 per maand — exclusief boodschappen. Voor veel gezinnen is dat al meer dan twee derde van het netto inkomen. Wat is normaal, en waar zit de bespaarruimte?",
    preview: {
      type: "vergelijking",
      label: "Vaste lasten 2026",
      items: [
        { naam: "Minimum", bedrag: 2000, kleur: "#2D6A4F" },
        { naam: "Gemiddeld", bedrag: 2850, kleur: "#C4603A" },
      ],
      noot: "Per maand voor een gezin",
    },
    faq: [
      {
        vraag: "Wat zijn normale vaste lasten voor een gezin van 4 in 2026?",
        antwoord:
          "Gemiddeld liggen de vaste lasten voor een gezin met twee kinderen tussen de €2.600 en €3.200 per maand, exclusief boodschappen. Dit hangt sterk af van de woonsituatie (huur of koop) en de regio. In de Randstad liggen de woonkosten structureel hoger.",
      },
      {
        vraag: "Hoeveel procent van je inkomen mag naar vaste lasten?",
        antwoord:
          "De vuistregel is maximaal 50 procent van het netto inkomen. Bij €4.000 netto is dat €2.000. In de praktijk zit een groot deel van de gezinnen in Nederland boven die grens — niet door verkeerde keuzes, maar door geleidelijk oplopende kosten.",
      },
      {
        vraag: "Wat zijn de grootste vaste lasten voor een gezin?",
        antwoord:
          "Woonkosten (huur of hypotheek, energie, water) vormen verreweg de grootste post — gemiddeld €1.200 tot €1.800 per maand. Daarna volgen zorgverzekeringen (€316 voor twee volwassenen), vervoer (€280-€480) en abonnementen (€150-€200).",
      },
      {
        vraag: "Waar zit de meeste bespaarruimte in vaste lasten?",
        antwoord:
          "Abonnementen, zorgverzekering en vervoer zijn de drie categorieën met de meeste flexibiliteit. Eén keer kritisch doorlopen van alle abonnementen levert gemiddeld €50 tot €100 per maand op. Zorgverzekering optimaliseren scheelt €200 tot €500 per jaar.",
      },
      {
        vraag: "Zijn vaste lasten in 2026 gestegen?",
        antwoord:
          "Ja. Uit onderzoek blijkt dat de vaste lasten voor een gemiddeld gezin in 2026 met €474 zijn gestegen ten opzichte van 2025, vooral door hogere verzekeringspremies, energiebelasting en gemeentelijke heffingen.",
      },
    ],
    externLinks: [
      {
        label: "FinBuddy vaste lasten overzicht 2026",
        url: "https://www.finbuddy.nl/blogs/wat-zijn-de-gemiddelde-vaste-lasten-bekijk-ze-nu-in-een-overzicht/",
      },
      {
        label: "Vaste Lasten Bond percentage inkomen",
        url: "https://www.vastelastenbond.nl/blog/55-procent-van-inkomen-naar-vaste-lasten/",
      },
      {
        label: "ConsumentWijzer kosten gezin 2026",
        url: "https://consumentwijzer.nl/kosten-gezin-per-maand/",
      },
    ],
  },
  {
    slug: "potjesmethode-gezin-hoe-werkt-het",
    korteTitel: "De potjesmethode: zo werkt het",
    titel:
      "De potjesmethode voor gezinnen — hoe werkt het, en waarom werkt het eigenlijk?",
    metaTitel:
      "De potjesmethode voor gezinnen: zo werkt het echt",
    metaDescription:
      "De potjesmethode werkt — maar niet zo zoals de meeste uitleggen. Hoe je het praktisch inricht voor een gezin, zonder gedoe en zonder spreadsheets.",
    datum: "2026-05-23",
    datumFormatted: "23 mei 2026",
    leestijd: "8",
    categorie: "Sparen",
    excerpt:
      "De potjesmethode werkt — maar de meeste uitleggen zijn te ingewikkeld voor een normaal gezin. Vier potjes, één salarisdag, geen spreadsheet. Zo richt je het praktisch in.",
    preview: {
      type: "verdeling",
      label: "Inkomensverdeling potjes",
      posten: [
        { naam: "Vaste lasten", pct: 65, kleur: "#1C3A2A" },
        { naam: "Dagelijks", pct: 20, kleur: "#C4603A" },
        { naam: "Sparen", pct: 10, kleur: "#2D6A4F" },
        { naam: "Vrij", pct: 5, kleur: "#EDE6D8" },
      ],
      uitkomst: "4 potjes",
    },
    faq: [
      {
        vraag: "Wat is de potjesmethode precies?",
        antwoord:
          "De potjesmethode houdt in dat je je inkomen direct bij binnenkomst verdeelt over aparte rekeningen of doelen — vaste lasten, dagelijks leven, sparen, vrij besteedbaar. Doordat geld fysiek gescheiden is, hoef je niet bij te houden wat je uitgeeft: de grens is zichtbaar.",
      },
      {
        vraag: "Hoeveel potjes heb je nodig?",
        antwoord:
          "Voor de meeste gezinnen zijn drie of vier potjes genoeg: vaste lasten, dagelijks leven, sparen, en optioneel een persoonlijk potje per persoon. Meer potjes maken het systeem complexer zonder dat het beter werkt.",
      },
      {
        vraag: "Welke bank is het beste voor de potjesmethode?",
        antwoord:
          "Bunq is specifiek gebouwd voor het werken met meerdere rekeningen en is gratis voor maximaal drie rekeningen. Rabobank (Doelsparen), ING (Spaarpotjes) en ABN AMRO (Doelbedragen) bieden gratis subrekeningen aan. Je hoeft niet van bank te wisselen.",
      },
      {
        vraag: "Hoeveel procent gaat naar elk potje?",
        antwoord:
          "Een werkbaar startpunt: 65% vaste lasten, 20% dagelijks leven, 10% sparen, 5% vrij. Pas dit aan op jouw situatie. Als vaste lasten meer dan 70% van je inkomen zijn, is dat een signaal dat de lasten te hoog zijn — niet dat het systeem niet werkt.",
      },
      {
        vraag: "Wat doe je als er geen geld overblijft voor sparen?",
        antwoord:
          "Begin met €50. Dat is beter dan niets. De gewoonte van automatisch sparen opbouwen is waardevoller dan het bedrag. Verhoog elke drie maanden met €25 als je ruimte ziet.",
      },
    ],
    externLinks: [
      {
        label: "Raisin over spaarpotjes maken",
        url: "https://www.raisin.com/nl-nl/sparen/spaarpotjes-maken/",
      },
      {
        label: "Mamablogger spaarpotjes 2025",
        url: "https://mamablogger.nl/geld-budget-onze-digitale-spaarpotjes-voor-2025/",
      },
      {
        label: "Nibud budgetadvies",
        url: "https://www.nibud.nl/consumenten/budgetadvies/",
      },
    ],
  },
  {
    slug: "geld-stress-relatie-nederland",
    korteTitel: "Geld en relatiestress",
    titel:
      "Wat geldstress doet met je relatie — en hoe je eindelijk het gesprek aangaat",
    metaTitel:
      "Geld en relatiestress: wat het doet en hoe je erover praat",
    metaDescription:
      "De helft van de Nederlandse stellen heeft ooit ruzie gemaakt over geld. Maar de meeste praten er nauwelijks over. Waarom dat zo is — en wat je er aan kunt doen.",
    datum: "2026-05-23",
    datumFormatted: "23 mei 2026",
    leestijd: "7",
    categorie: "Inzicht",
    excerpt:
      "De helft van de Nederlandse stellen heeft er ooit ruzie over gemaakt. Maar slechts drie procent praat er openlijk over. Waarom geld zo moeilijk bespreekbaar is — en hoe je het gesprek wél aangaat.",
    preview: {
      type: "statistiek",
      label: "Geld & relaties NL",
      segmenten: [
        {
          label: "50% had ruzie over geld",
          pct: 50,
          kleur: "#FDECEA",
          tekstKleur: "#B03A2E",
        },
        {
          label: "23% wil vaker praten",
          pct: 23,
          kleur: "#FAF0EB",
          tekstKleur: "#92600A",
        },
        {
          label: "3% praat er openlijk over",
          pct: 3,
          kleur: "#E8F2EC",
          tekstKleur: "#2D6A4F",
        },
      ],
    },
    faq: [
      {
        vraag: "Is ruzie over geld normaal in een relatie?",
        antwoord:
          "Ja. Uit onderzoek van bunq onder meer dan 4.000 Europeanen blijkt dat de helft van de Nederlandse stellen ooit ruzie heeft gemaakt over geld. Het is het meest voorkomende conflictonderwerp in relaties. Normaal — maar niet onvermijdelijk.",
      },
      {
        vraag: "Hoe praat je over geld met je partner zonder ruzie?",
        antwoord:
          "Begin met feiten, niet met oordelen. Kijk samen naar bankafschriften als neutrale basis. Bespreek eerst doelen — wat willen jullie samen bereiken? — voordat je het hebt over uitgaven. Geef ieder een persoonlijk budget om de irritatie over individuele aankopen te verminderen.",
      },
      {
        vraag: "Wat zijn tekenen dat geldstress jullie relatie beïnvloedt?",
        antwoord:
          "Wanneer irritatie over geld zich verplaatst naar andere ruzies. Wanneer je financiële beslissingen vermijdt of uitstelt. Wanneer er een gevoel van oneerlijkheid is over wie wat bijdraagt. Wanneer het gesprek over geld altijd gespannen is of vermeden wordt.",
      },
      {
        vraag: "Is het normaal om financiële geheimen te hebben voor je partner?",
        antwoord:
          "Uit onderzoek blijkt dat 23 procent van de Nederlanders weleens schulden, uitgaven of inkomsten heeft achtergehouden voor de partner. Het is veel voorkomend — maar het ondermijnt vertrouwen en maakt financiële samenwerking moeilijker.",
      },
      {
        vraag: "Wanneer is professionele hulp zinvol bij geldstress in een relatie?",
        antwoord:
          "Als geld een structureel conflictthema is, als gesprekken steeds escaleren of als er sprake is van financiële geheimhouding. Een financieel coach of relatietherapeut kan helpen om het gesprek te structureren en objectief inzicht te geven in de situatie.",
      },
    ],
    externLinks: [
      {
        label: "Linda.nl over geld en relaties",
        url: "https://www.linda.nl/lifestyle/geld/geld-gescheiden-houden-relatie-onderzoek/",
      },
      {
        label: "Nibud stellen en geldzaken",
        url: "https://www.kennisbundel.nl/kennisbank/artikel/geld-relatie/",
      },
      {
        label: "LISS panel geldstress en mentale gezondheid",
        url: "https://fondsslachtofferhulp.nl/nieuws/financiele-problemen-geldzorgen-stress/",
      },
    ],
  },
  {
    slug: "hoe-bespaar-je-op-boodschappen",
    korteTitel: "Besparen op boodschappen: zo werkt het",
    titel:
      "Hoe bespaar je op boodschappen in 2026? Niet met bezuinigingstips, maar door te begrijpen waar het weglekt",
    metaTitel:
      "Hoe bespaar je op boodschappen in 2026? Eerlijk antwoord",
    metaDescription:
      "Niet met bezuinigingstips, maar door te begrijpen waarom je meer uitgeeft dan je denkt. De vijf plekken waar het meeste geld weglekt — en wat je eraan doet.",
    datum: "2026-05-28",
    datumFormatted: "28 mei 2026",
    leestijd: "8",
    categorie: "Besparen",
    excerpt:
      "Een gemiddeld gezin van vier geeft structureel €200-400 meer uit aan boodschappen dan ze zelf denken. Niet door luxe — maar door vijf gedragspatronen die onzichtbaar optellen. Dit zijn de lekken, en zo dicht je ze.",
    preview: {
      type: "statistiek",
      label: "Waar lekt het geld?",
      segmenten: [
        { label: "Dagelijks winkelen +€180", pct: 33, kleur: "#FAF0EB", tekstKleur: "#C4603A" },
        { label: "Verspilling +€65", pct: 24, kleur: "#FDF3E3", tekstKleur: "#92600A" },
        { label: "A-merken +€90", pct: 33, kleur: "#E8F2EC", tekstKleur: "#2D6A4F" },
      ],
    },
    faq: [
      {
        vraag: "Hoeveel kun je besparen op boodschappen per maand?",
        antwoord:
          "Dat hangt af van je huidige gedrag. Gezinnen die overstappen op één vaste boodschappendag en weekmenu's gaan maken, besparen gemiddeld €100-200 per maand. Wie daarnaast drogisterijproducten apart inkoopt, kan oplopen tot €300 per maand besparing — zonder kwaliteit in te leveren.",
      },
      {
        vraag: "Wat is de goedkoopste supermarkt in Nederland in 2026?",
        antwoord:
          "Volgens dagelijkse metingen van Voordly en onderzoek van de Consumentenbond zijn Aldi en Dirk structureel het goedkoopst voor basisproducten. Voor A-merken loont het om aanbiedingen te vergelijken. Maar de winkelkeuze heeft minder impact dan je boodschappengedrag — hoe je winkelt telt meer dan waar.",
      },
      {
        vraag: "Hoe maak ik een boodschappenbudget voor een gezin?",
        antwoord:
          "Begin met het werkelijke getal: kijk in je bankapp wat je de afgelopen twee maanden hebt uitgegeven inclusief alle kleine aankopen. Vergelijk dat met het Nibud-minimum voor jouw gezin. Het verschil is je bespaardoelstelling. Stel daarna een wekelijks budget in en houd het bij via een rekening die je specifiek voor boodschappen gebruikt.",
      },
      {
        vraag: "Helpt een boodschappenlijst echt?",
        antwoord:
          "Ja, aantoonbaar. Onderzoek van het Nibud laat zien dat gezinnen met een vaste boodschappendag en lijst gemiddeld 20% minder uitgeven dan gezinnen die dagelijks winkelen. Het effect zit niet alleen in minder impulsen, maar ook in minder verspilling omdat je precies koopt wat je nodig hebt.",
      },
      {
        vraag: "Is huismerk altijd goedkoper en even goed?",
        antwoord:
          "Niet altijd even goed, maar bijna altijd goedkoper. Voor basiscategorieën als pasta, rijst, melk, bloem, eieren en schoonmaakproducten is het verschil in kwaliteit minimaal. Voor vlees, kaas en zuivel varieert het per persoon. De Consumentenbond raadt aan om per categorie te testen in plaats van alles tegelijk over te schakelen.",
      },
    ],
    externLinks: [
      {
        label: "Consumentenbond A-merk vs. huismerk onderzoek",
        url: "https://www.consumentenbond.nl",
      },
      {
        label: "Wageningen University voedselverspilling monitor",
        url: "https://www.wur.nl/nl/onderzoek-resultaten/onderzoeksprojecten/monitor-voedselverspilling.htm",
      },
      {
        label: "Voordly dagelijkse prijsvergelijking",
        url: "https://voordly.com/goedkoopste-supermarkt",
      },
      {
        label: "Kassa prijsvergelijking DM vs. Kruidvat 2025",
        url: "https://www.bnnvara.nl/kassa",
      },
    ],
  },
  {
    slug: "nibud-boodschappen-versus-werkelijkheid",
    korteTitel: "Nibud norm vs. wat gezinnen écht uitgeven",
    titel:
      "Het Nibud-boodschappenbudget 2026 — wat de norm zegt en wat gezinnen werkelijk uitgeven",
    metaTitel:
      "Nibud boodschappenbudget 2026: norm versus werkelijkheid",
    metaDescription:
      "Nibud zegt €627 voor een gezin van vier. Maar wat geven gezinnen werkelijk uit? Het eerlijke verhaal achter de normen — en waarom ze bijna niemand halen.",
    datum: "2026-05-28",
    datumFormatted: "28 mei 2026",
    leestijd: "7",
    categorie: "Inzicht",
    excerpt:
      "Het Nibud-minimum voor een gezin van vier is €627 per maand. De werkelijkheid is €875 — en bij pubers loopt het op naar €1.200. Wat meet de Nibud-norm eigenlijk, en waarom halen bijna geen gezinnen hem?",
    preview: {
      type: "vergelijking",
      label: "Nibud vs. werkelijkheid (gezin 2 kinderen)",
      items: [
        { naam: "Nibud norm", bedrag: 627, kleur: "#2D6A4F" },
        { naam: "Werkelijk gemiddeld", bedrag: 875, kleur: "#C4603A" },
      ],
      noot: "Per maand, excl. drogisterij",
    },
    faq: [
      {
        vraag: "Wat is het Nibud-boodschappenbudget in 2026?",
        antwoord:
          "Voor een gezin van twee volwassenen met twee kinderen (8 en 13 jaar) hanteert het Nibud een minimum van €627 per maand voor voeding. Dit is exclusief drogisterijproducten, schoonmaakmiddelen en alles buiten de supermarkt. Het bedrag is bijgewerkt in de Nibud Prijzengids 2025/2026.",
      },
      {
        vraag: "Hoeveel geeft een gemiddeld gezin werkelijk uit aan boodschappen?",
        antwoord:
          "Aanzienlijk meer dan de Nibud-norm. Uit forum-onderzoek en blogdata blijkt dat gezinnen van vier structureel €700-900 per maand uitgeven inclusief drogisterij. Met pubers of grote kinderen loopt dit op naar €1.000-1.400 per maand.",
      },
      {
        vraag: "Waarom is de Nibud-norm zo laag?",
        antwoord:
          "De Nibud-norm is een minimum voor gezonde voeding, berekend op basis van calorische en voedingskundige normen. Het is geen beschrijving van hoe een gemiddeld Nederlands gezin boodschappen doet. Bakker, slager, drogisterij, koffie en tussendoor-aankopen zitten er niet in.",
      },
      {
        vraag: "Klopt het Nibud-budget voor alleenstaanden?",
        antwoord:
          "Het Nibud-minimum voor een alleenstaande is circa €200 per maand voor voeding. In de praktijk geven alleenstaanden gemiddeld €300-400 uit inclusief drogisterij en kleine aankopen. De kloof is procentueel vergelijkbaar met die voor gezinnen.",
      },
      {
        vraag: "Hoe gebruik ik het Nibud-budget als referentie?",
        antwoord:
          "Gebruik het als minimumgrens, niet als doel. Als je er ruim boven zit, is dat niet per definitie slecht — het hangt af van de samenstelling van je huishouden en wat je meeneemt in de berekening. Vergelijk jezelf bij voorkeur met vergelijkbare huishoudens in vergelijkbare omstandigheden.",
      },
    ],
    externLinks: [
      {
        label: "Nibud huishoudelijke uitgaven 2026",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/huishoudelijke-uitgaven/",
      },
      {
        label: "Nibud Prijzengids 2025/2026",
        url: "https://www.nibud.nl",
      },
      {
        label: "Mamablogger boodschappenbudget 2024",
        url: "https://mamablogger.nl/boodschappenbudget-en-weekbudget-voor-2025/",
      },
      {
        label: "Forum Zeg maar Yes boodschappen poll",
        url: "https://www.zegmaaryes.nl/boodschappen-per-maand-gezin-t38420.html",
      },
    ],
  },
  {
    slug: "kosten-levensonderhoud-alleenstaande-2026",
    korteTitel: "Kosten levensonderhoud alleenstaande 2026",
    titel:
      "Kosten levensonderhoud alleenstaande in 2026 — wat je werkelijk nodig hebt om rond te komen",
    metaTitel:
      "Kosten levensonderhoud alleenstaande 2026: volledig overzicht",
    metaDescription:
      "Wat kost het leven als alleenstaande in 2026? Van huur tot boodschappen tot verzekeringen — alle gemiddelden op een rij, plus waar de meeste ruimte zit.",
    datum: "2026-05-28",
    datumFormatted: "28 mei 2026",
    leestijd: "7",
    categorie: "Inzicht",
    excerpt:
      "De vaste lasten voor een alleenstaande liggen in 2026 gemiddeld tussen €2.000 en €2.400 per maand — en in de Randstad structureel €300-400 hoger. Dit is het volledige overzicht, per kostenpost en per regio.",
    preview: {
      type: "vergelijking",
      label: "Kosten levensonderhoud 2026",
      items: [
        { naam: "Minimum", bedrag: 1530, kleur: "#8AB89A" },
        { naam: "Gemiddeld", bedrag: 2205, kleur: "#1C3A2A" },
      ],
      noot: "Middelgrote stad, excl. vrije tijd",
    },
    faq: [
      {
        vraag: "Wat zijn de gemiddelde kosten van levensonderhoud voor een alleenstaande in 2026?",
        antwoord:
          "Gemiddeld liggen de vaste lasten voor een alleenstaande tussen de €2.000 en €2.400 per maand, afhankelijk van woonsituatie en regio. Dit is exclusief vrije tijd, kleding en vakantie. In de Randstad liggen de kosten structureel €300-400 hoger door hogere huurprijzen.",
      },
      {
        vraag: "Hoeveel netto inkomen heb je nodig als alleenstaande om rond te komen?",
        antwoord:
          "Minimaal €2.400-€2.600 netto per maand om alle kosten te dekken en 10% te sparen, zoals Nibud adviseert. In de Randstad is dat €2.800-€3.000. Het CBS-mediaan inkomen voor alleenstaanden lag in 2024 rond de €2.200 — veel alleenstaanden zitten dus structureel dicht bij hun grens.",
      },
      {
        vraag: "Wat zijn de grootste kosten voor een alleenstaande?",
        antwoord:
          "Huur of hypotheek (gemiddeld €1.050/mnd), energie (€180/mnd), boodschappen inclusief drogisterij (€340/mnd), zorgverzekering na zorgtoeslag (€130/mnd) en vervoer (€220/mnd). Samen goed voor ruim €1.900 per maand aan vaste posten.",
      },
      {
        vraag: "Hoeveel geeft een alleenstaande uit aan boodschappen per maand?",
        antwoord:
          "Het Nibud-minimum voor voeding is circa €200 per maand. In de praktijk geven alleenstaanden gemiddeld €300-400 uit inclusief drogisterijproducten en kleine aankopen. Wie dagelijks boodschappen doet in plaats van één keer per week, zit eerder aan de hoge kant.",
      },
      {
        vraag: "Wat is het verschil in kosten tussen de Randstad en de rest van Nederland?",
        antwoord:
          "Voor een alleenstaande is het verschil gemiddeld €300-400 per maand, voornamelijk door hogere huurprijzen. CBS-data laat zien dat huurprijzen in de Randstad 20-30% hoger liggen dan het landelijk gemiddelde. Energiekosten en boodschappen verschillen nauwelijks per regio.",
      },
    ],
    externLinks: [
      {
        label: "FinBuddy gemiddelde vaste lasten 2026",
        url: "https://www.finbuddy.nl/blogs/wat-zijn-de-gemiddelde-vaste-lasten-bekijk-ze-nu-in-een-overzicht/",
      },
      {
        label: "CBS huurprijsontwikkeling 2026",
        url: "https://www.cbs.nl",
      },
      {
        label: "Nibud leefgeld alleenstaande januari 2026",
        url: "https://www.nibud.nl/onderwerpen/geldproblemen/leefgeld-in-de-schuldhulpverlening/",
      },
      {
        label: "HetGeldCollege uitgaven alleenstaande",
        url: "https://hetgeldcollege.nl/uitgaven-per-maand-1-persoon/",
      },
    ],
  },
];

export function getArtikel(slug: string): Artikel | undefined {
  return artikelen.find((a) => a.slug === slug);
}
