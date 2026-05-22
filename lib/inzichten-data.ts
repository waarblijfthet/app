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
    slug: "wat-is-normaal-bedrag-boodschappen-per-maand",
    titel:
      "Wat zijn normale boodschappenkosten per maand? Nibud vs. werkelijkheid",
    metaTitel:
      "Wat zijn normale boodschappenkosten per maand? Nibud vs. werkelijkheid",
    metaDescription:
      "Nibud zegt €553 voor een gezin van 4. Maar in de praktijk geeft datzelfde gezin €700-900 uit. Wat verklaart dat verschil — en wat betekent het voor jou?",
    datum: "2026-05-21",
    datumFormatted: "21 mei 2026",
    leestijd: "7",
    categorie: "Besparen",
    excerpt:
      "Het Nibud zegt €553 voor een gezin van vier. Maar in de praktijk geeft datzelfde gezin €700-900 uit — en bij pubers loopt het op naar €1.000 of meer. De kloof is groter dan je denkt, en er zijn drie oorzaken die vrijwel niemand benoemt.",
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
    slug: "vergelijken-boodschappen-nederland-duitsland",
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
