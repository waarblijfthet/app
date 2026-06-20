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
    slug: "goed-salaris-toch-geldstress",
    korteTitel: "Goed salaris, toch geldstress",
    titel: "Goed salaris, toch geldstress: zo kwam er bij ons thuis weer rust",
    metaTitel: "Goed salaris en toch geldstress? Zo krijg je er weer rust in",
    metaDescription:
      "Geldstress ondanks een goed inkomen? Een kwart van de hoge inkomens komt moeilijk rond. Zo kreeg ik er bij ons thuis weer rust in, in vier stappen.",
    datum: "2026-06-19",
    datumFormatted: "19 juni 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt:
      "Je verdient goed en hebt toch een knoop in je maag van geld. Je bent niet de enige: zelfs een kwart van de hoge inkomens komt moeilijk rond. Waarom het een structuurprobleem is, en de vier stappen waarmee er bij ons thuis weer rust kwam.",
    preview: {
      type: "statistiek",
      label: "Hoog inkomen en toch moeite met rondkomen",
      segmenten: [
        { label: "Moeite met rondkomen", pct: 24, kleur: "#FAF0EB", tekstKleur: "#92600A" },
        { label: "Komt rond", pct: 76, kleur: "#E8F2EC", tekstKleur: "#2D6A4F" },
      ],
    },
    faq: [
      {
        vraag: "Kun je geldstress hebben met een goed inkomen?",
        antwoord:
          "Ja. Uit onderzoek van Deloitte en het Nibud (2025) blijkt dat zelfs een kwart van de mensen met een hoog inkomen moeite heeft om rond te komen. Geldstress hangt niet alleen samen met de hoogte van je inkomen, maar vooral met of je geld een duidelijke bestemming heeft.",
      },
      {
        vraag: "Hoe kom ik van geldstress af?",
        antwoord:
          "Begin met inzicht: zet je inkomen, vaste lasten en dagelijkse uitgaven naast elkaar. Verdeel daarna je inkomen meteen na binnenkomst over aparte rekeningen, bouw een kleine buffer op voor tegenvallers, en praat erover met je partner. De vaagheid die de stress voedt verdwijnt zodra je het zwart op wit ziet.",
      },
      {
        vraag: "Ligt geldstress aan mezelf?",
        antwoord:
          "Meestal niet. Geldstress met een goed inkomen is bijna altijd een structuurprobleem en geen karakterfout. Je geld verdwijnt omdat het geen richting heeft, niet omdat je iets verkeerd doet. Met een paar vaste afspraken buig je het om, zonder dat je meer hoeft te verdienen.",
      },
    ],
    externLinks: [
      {
        label: "Deloitte: 47% van Nederland is financieel kwetsbaar",
        url: "https://www.deloitte.com/nl/nl/about/press-room/47-percent-van-nederland-is-financieel-kwetsbaar.html",
      },
      {
        label: "Nibud: Geldzaken in de praktijk 2024",
        url: "https://www.nibud.nl/onderzoeksrapporten/rapport-geldzaken-in-de-praktijk-2024/",
      },
    ],
  },
  {
    slug: "grip-op-je-geld-krijgen",
    korteTitel: "Grip op je geld krijgen",
    titel: "Geen grip op je geld, terwijl je goed verdient? Zo kreeg ik er controle over",
    metaTitel: "Grip op je geld krijgen: het stappenplan in 5 stappen (2026)",
    metaDescription:
      "Geen overzicht over je geld terwijl je goed verdient? In vijf stappen krijg je grip, ook zonder bankkoppeling of huishoudboekje. Zo pak je het aan.",
    datum: "2026-06-19",
    datumFormatted: "19 juni 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt:
      "Geen schuldenprobleem, maar een overzichtsprobleem: je verdient goed en weet toch niet waar het heen gaat. In vijf stappen krijg je grip, zonder bankkoppeling en zonder huishoudboekje dat je toch laat vallen.",
    preview: {
      type: "pijn",
      label: "Signalen dat je geen grip hebt",
      items: [
        "Je weet niet wat er per maand binnenkomt en uitgaat",
        "Je schrikt soms van je saldo zonder te weten waarom",
        "Je houdt geen overzicht bij, of laat het steeds vallen",
        "Je stuurt nergens op, het gebeurt je gewoon",
      ],
    },
    faq: [
      {
        vraag: "Hoe krijg ik grip op mijn geld?",
        antwoord:
          "In vijf stappen: breng je inkomsten in beeld, zet al je vaste lasten op een rij, meet je dagelijkse uitgaven, verdeel je inkomen meteen na binnenkomst over aparte rekeningen, en doe één keer per maand een korte check. Zo stuur je op de grote lijn zonder alles te registreren.",
      },
      {
        vraag: "Kan dat zonder bankkoppeling of app?",
        antwoord:
          "Ja. Je hebt geen app of bankkoppeling nodig, alleen een eerlijk beginbeeld van wat er binnenkomt en uitgaat. Een app registreert wat er gebeurd is, maar sturen doe je met een paar duidelijke afspraken die je volhoudt.",
      },
      {
        vraag: "Hoe lang duurt het voordat je grip hebt?",
        antwoord:
          "Het overzicht maken kost een paar uur als je je afschriften erbij pakt, of een paar minuten met de gratis analyse. Daarna is grip houden een kwestie van vijf minuten per maand om te checken of het nog klopt.",
      },
    ],
    externLinks: [
      {
        label: "Nibud: uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
      {
        label: "Wijzer in geldzaken: Nationale Monitor Geldzorgen",
        url: "https://www.wijzeringeldzaken.nl/Nationale-Monitor-Geldzorgen/",
      },
    ],
  },
  {
    slug: "waarom-lukt-sparen-niet",
    korteTitel: "Waarom sparen niet lukt",
    titel: "Sparen lukt nooit, zelfs met een goed salaris? Zo doorbrak ik dat patroon",
    metaTitel: "Waarom lukt sparen niet, en hoe je het doorbreekt",
    metaDescription:
      "Elke maand niks over, ook met een goed inkomen? Sparen mislukt zelden door discipline. Zo draai je de volgorde om en lukt het wel.",
    datum: "2026-06-19",
    datumFormatted: "19 juni 2026",
    leestijd: "6",
    categorie: "Sparen",
    excerpt:
      "Je neemt je voor te sparen en elke maand is het geld op voordat je eraan toekomt. Het ligt zelden aan je discipline. Zo doorbreek je het patroon door de volgorde om te draaien en de onregelmatige kosten af te vangen.",
    preview: {
      type: "statistiek",
      label: "Hoeveel Nederlanders sparen",
      segmenten: [
        { label: "Spaart minder dan 10%", pct: 41, kleur: "#FAF0EB", tekstKleur: "#92600A" },
        { label: "Spaart 10% of meer", pct: 59, kleur: "#E8F2EC", tekstKleur: "#2D6A4F" },
      ],
    },
    faq: [
      {
        vraag: "Waarom lukt sparen niet ondanks een goed inkomen?",
        antwoord:
          "Meestal omdat je sparen als restpost behandelt: je spaart wat aan het einde van de maand overblijft, en dat is bijna niks. Daarnaast trekken vaste lasten en onregelmatige kosten zoals premies en reparaties je spaarplan stilletjes leeg. Het ligt zelden aan luxe of discipline.",
      },
      {
        vraag: "Hoe begin ik met sparen als er nooit iets overblijft?",
        antwoord:
          "Draai de volgorde om: zet op de dag dat je salaris binnenkomt automatisch een vast bedrag op een aparte spaarrekening, en verdeel daarna pas de rest. Begin desnoods klein en laat het bedrag oplopen. Zet er een apart potje naast voor onregelmatige uitgaven, zodat die je spaargeld niet leegtrekken.",
      },
      {
        vraag: "Hoeveel zou ik per maand moeten sparen?",
        antwoord:
          "Het Nibud adviseert om waar mogelijk ongeveer 10% van je netto-inkomen te sparen. Ongeveer 41% van de Nederlanders haalt dat niet (Nibud, 2024). Lukt 10% nog niet, begin dan lager en bouw het op.",
      },
    ],
    externLinks: [
      {
        label: "CBS: vermogen van huishoudens 2024",
        url: "https://longreads.cbs.nl/materiele-welvaart-in-nederland-2024/vermogen-van-huishoudens/",
      },
      {
        label: "Nibud: sparen",
        url: "https://www.nibud.nl/onderwerpen/sparen/",
      },
    ],
  },
  {
    slug: "budget-maken-dat-je-volhoudt",
    korteTitel: "Een budget dat je volhoudt",
    titel: "Waarom je budget altijd mislukt, en hoe je er een maakt die je wel volhoudt",
    metaTitel: "Budget maken dat je volhoudt: zo lukt het wel",
    metaDescription:
      "Je budget houdt nooit lang stand? Dat ligt niet aan je discipline. De drie redenen waarom budgetten mislukken en hoe je er een maakt zonder dagelijks bijhouden.",
    datum: "2026-06-19",
    datumFormatted: "19 juni 2026",
    leestijd: "6",
    categorie: "Besparen",
    excerpt:
      "De eerste week lukt het, daarna zakt het weg. De meeste budgetten mislukken niet door gebrek aan discipline, maar omdat ze dagelijks bijhouden vereisen en te strak zijn. Zo maak je er een die je wel volhoudt.",
    preview: {
      type: "pijn",
      label: "Waarom budgetten sneuvelen",
      items: [
        "Het vereist elke uitgave bijhouden, dat houd je niet vol",
        "Het is te strak, geen ruimte voor iets leuks of een tegenvaller",
        "Het klopt niet met de werkelijkheid, jaarposten zijn vergeten",
      ],
    },
    faq: [
      {
        vraag: "Waarom mislukt mijn budget steeds?",
        antwoord:
          "Door drie dingen: het vereist dagelijks bijhouden, het is te strak zonder ruimte voor leuke dingen of tegenvallers, en het klopt niet met je werkelijke uitgaven omdat jaarposten zoals verzekeringen en de gemeentelijke aanslag ontbreken. Geen van die drie heeft met discipline te maken.",
      },
      {
        vraag: "Hoe houd ik een budget vol zonder alles bij te houden?",
        antwoord:
          "Doe het werk vooraf in plaats van elke dag. Verdeel je inkomen op de dag dat het binnenkomt over aparte rekeningen voor vaste lasten, dagelijks geld, sparen en onregelmatige uitgaven. Het bedrag op je dagelijkse rekening is dan je budget, zonder dat je iets hoeft te turven.",
      },
      {
        vraag: "Werkt de 50/30/20-regel?",
        antwoord:
          "Als startverhouding wel: ongeveer 50% naar vaste lasten, 30% vrij besteedbaar en 20% sparen. Maar klopt die verhouding niet met jouw vaste lasten, pas hem dan aan. Een budget moet bij jouw situatie passen, niet andersom.",
      },
    ],
    externLinks: [
      {
        label: "Nibud: huishoudelijke uitgaven",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/huishoudelijke-uitgaven/",
      },
      {
        label: "Nibud: een financiele buffer opbouwen",
        url: "https://www.nibud.nl/onderwerpen/sparen/een-financiele-buffer-opbouwen/",
      },
    ],
  },
  {
    slug: "hoeveel-geld-overhouden-einde-maand",
    korteTitel: "Hoeveel hoor je over te houden?",
    titel: "Hoeveel hoor je aan het einde van de maand over te houden in 2026?",
    metaTitel: "Hoeveel geld overhouden per maand? Richtlijnen 2026",
    metaDescription:
      "Hoeveel hoor je eind van de maand over te houden? De richtlijnen voor 2026, waarom dat getal weinig over jou zegt, en wat je doet als er niks overblijft.",
    datum: "2026-06-19",
    datumFormatted: "19 juni 2026",
    leestijd: "5",
    categorie: "Inkomen",
    excerpt:
      "Blijft er bijna niks over en vraag je je af of dat normaal is? De richtlijnen zeggen zeker 10% sparen, maar je vaste lasten bepalen alles. Wat normaal is in 2026, en wat je doet als het niet lukt.",
    preview: {
      type: "verdeling",
      label: "Wat hoort er over te blijven?",
      posten: [
        { naam: "Vaste lasten", pct: 50, kleur: "#1C3A2A" },
        { naam: "Vrij besteedbaar", pct: 30, kleur: "#C4603A" },
        { naam: "Sparen", pct: 20, kleur: "#2D6A4F" },
      ],
      uitkomst: "Richtlijn: zeker 10% sparen (Nibud-norm)",
    },
    faq: [
      {
        vraag: "Hoeveel hoor je over te houden aan het einde van de maand?",
        antwoord:
          "Als richtlijn zou je zeker 10% van je netto-inkomen moeten kunnen sparen (Nibud). Veel mensen gebruiken de 50/30/20 verdeling: ongeveer de helft naar vaste lasten, 30% vrij besteedbaar en 20% sparen. Dat laatste deel is wat er idealiter overblijft.",
      },
      {
        vraag: "Is het normaal dat ik niks overhoud?",
        antwoord:
          "Het komt vaak voor, en het zegt zelden dat je slordig bent. Een gemiddeld huishouden is ruim 55% van het inkomen kwijt aan vaste lasten, en bij een hoge huur of hypotheek blijft er voor de rest simpelweg minder over. Het wijst meestal op een hoge vaste basis, niet op verkeerd gedrag.",
      },
      {
        vraag: "Hoeveel spaargeld heeft de gemiddelde Nederlander?",
        antwoord:
          "De doorsnee Nederlander heeft ongeveer €21.500 op de spaarrekening (CBS, 2024). Het gemiddelde ligt rond €54.700, maar dat is vertekend door een kleine groep met veel spaargeld. Tegelijk heeft ongeveer een op de vijf huishoudens minder dan €1.000 achter de hand.",
      },
    ],
    externLinks: [
      {
        label: "CBS: vermogen van huishoudens 2024",
        url: "https://longreads.cbs.nl/materiele-welvaart-in-nederland-2024/vermogen-van-huishoudens/",
      },
      {
        label: "Nibud: stappenplan maandelijks sparen",
        url: "https://www.nibud.nl/tools/stappenplan-maandelijks-sparen/",
      },
    ],
  },
  {
    slug: "waarom-hou-ik-nooit-geld-over",
    korteTitel: "Nooit geld over ondanks goed inkomen",
    titel: "Waarom hou ik nooit geld over, terwijl ik goed verdien?",
    metaTitel: "Waarom hou ik nooit geld over ondanks een goed inkomen?",
    metaDescription:
      "Goed verdienen en toch niks overhouden? Dit zijn de vier manieren waarop je geld onzichtbaar verdwijnt, en waarom meer verdienen het zelden oplost.",
    datum: "2026-06-18",
    datumFormatted: "18 juni 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt:
      "Je verdient prima en houdt toch niks over. Het ligt zelden aan je inkomen, en bijna altijd aan vier onzichtbare lekken. Waarom een hoger salaris het niet oplost, en wat wel werkt.",
    preview: {
      type: "pijn",
      label: "Waar het onzichtbaar weglekt",
      items: [
        "Vaste lasten en abonnementen die stilletjes groeien",
        "Uitgaven die je niet bijhoudt: pinnen voelt niet als geld",
        "Geen buffer, dus elke tegenvaller uit je maandbudget",
        "Levensstijlinflatie: meer verdienen, meer uitgeven",
      ],
    },
    faq: [
      {
        vraag: "Waarom hou ik nooit geld over terwijl ik genoeg verdien?",
        antwoord:
          "Meestal niet door je inkomen, maar door de structuur eromheen. Je geld verdwijnt onzichtbaar via sluipende vaste lasten, uitgaven die je niet bijhoudt, het ontbreken van een buffer en levensstijlinflatie. Samen slaan die een groot gat zonder dat er een grote uitgave aan te wijzen is.",
      },
      {
        vraag: "Lost meer verdienen het probleem op?",
        antwoord:
          "Zelden. Door de belastingschijven en de afbouw van heffingskortingen levert een bruto stijging vaak verrassend weinig netto op. En zolang het lek in je structuur zit, loopt een hoger inkomen er gewoon doorheen. Een vast verdeelsysteem helpt meer dan een hoger salaris.",
      },
      {
        vraag: "Wat is de eerste stap om grip te krijgen?",
        antwoord:
          "Inzicht, niet bezuinigen. Pak de afschriften van de afgelopen twee maanden en tel je vaste lasten, je dagelijkse uitgaven en wat er echt overblijft op. De verrassing zit bijna altijd in de dagelijkse uitgaven die niemand bijhoudt.",
      },
    ],
    externLinks: [
      {
        label: "Nibud: uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
      {
        label: "CBS: besparingen huishoudens",
        url: "https://www.cbs.nl/nl-nl/nieuws/2025/22/besparingen-huishoudens-namen-sterk-toe-in-2024",
      },
    ],
  },
  {
    slug: "bruto-naar-netto-loonstrook-uitleg",
    korteTitel: "Van bruto naar netto: je loonstrook uitgelegd",
    titel: "Van bruto naar netto: waar gaat je salaris naartoe op je loonstrook?",
    metaTitel: "Van bruto naar netto 2026: je loonstrook uitgelegd",
    metaDescription:
      "Waar gaat je brutoloon naartoe? Begrippen op je loonstrook, de belastingschijven van 2026 en wat je netto overhoudt bij €3.500 en €5.000 bruto.",
    datum: "2026-06-18",
    datumFormatted: "18 juni 2026",
    leestijd: "6",
    categorie: "Inkomen",
    excerpt:
      "Een mooi brutoloon en een tegenvallend bedrag op je rekening. Ik loop je loonstrook door met de cijfers van 2026: schijven, heffingskortingen en wat je echt netto overhoudt.",
    preview: {
      type: "verdeling",
      label: "Van €5.000 bruto per maand",
      posten: [
        { naam: "Belasting en premies", pct: 26, kleur: "#B03A2E" },
        { naam: "Netto op je rekening", pct: 74, kleur: "#2D6A4F" },
      ],
      uitkomst: "Netto ca. €3.700 (indicatie 2026)",
    },
    faq: [
      {
        vraag: "Wat zijn de belastingschijven in 2026?",
        antwoord:
          "Voor wie de AOW-leeftijd nog niet heeft, gelden in 2026 drie schijven in box 1: 35,75% over inkomen tot €38.883, 37,56% over het deel tot €78.426 en 49,50% over alles daarboven. In de eerste schijf zitten de premies volksverzekeringen verwerkt.",
      },
      {
        vraag: "Wat is loonheffing op mijn loonstrook?",
        antwoord:
          "Loonheffing is loonbelasting en premies volksverzekeringen samen. Je werkgever houdt dit in op je brutoloon en draagt het namens jou af aan de Belastingdienst. Het verschil tussen je bruto- en nettoloon bestaat grotendeels uit deze loonheffing.",
      },
      {
        vraag: "Hoeveel hou ik netto over van €5.000 bruto?",
        antwoord:
          "Als indicatie voor 2026 houd je van €5.000 bruto per maand netto ongeveer €3.550 tot €3.700 over, bij een voltijdbaan met loonheffingskorting. De exacte uitkomst hangt af van je pensioenpremie. Vul je eigen cijfers in bij een nettoloon-calculator voor een precies bedrag.",
      },
    ],
    externLinks: [
      {
        label: "Belastingdienst: tarieven en heffingskortingen",
        url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/voorlopige-aanslag/content/voorlopige-aanslag-tarieven-en-heffingskortingen",
      },
      {
        label: "Nibud: uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },
  {
    slug: "vaste-lasten-overzicht-maken",
    korteTitel: "Een overzicht van je vaste lasten maken",
    titel: "Een overzicht van je vaste lasten maken: het complete stappenplan",
    metaTitel: "Vaste lasten overzicht maken: stappenplan en checklist 2026",
    metaDescription:
      "Maak in vier stappen een compleet overzicht van je vaste lasten. Inclusief de posten die bijna iedereen vergeet en wanneer je te veel vastligt.",
    datum: "2026-06-18",
    datumFormatted: "18 juni 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt:
      "Je kunt pas sturen op je geld als je weet wat er al vastligt. In vier stappen zet je al je vaste lasten op een rij, inclusief de jaarposten die bijna iedereen vergeet.",
    preview: {
      type: "statistiek",
      label: "Aandeel vaste lasten van het inkomen",
      segmenten: [
        { label: "Vaste lasten", pct: 55, kleur: "#FAF0EB", tekstKleur: "#92600A" },
        { label: "De rest", pct: 45, kleur: "#E8F2EC", tekstKleur: "#2D6A4F" },
      ],
    },
    faq: [
      {
        vraag: "Wat valt er allemaal onder vaste lasten?",
        antwoord:
          "Volgens het Nibud horen daarbij: woonlasten (huur of hypotheek), energie en water, gemeentelijke belastingen en waterschap, verzekeringen, telefoon, internet en televisie, vervoer, en kosten voor onderwijs of kinderopvang. Ook abonnementen en jaarlijkse premies tellen mee.",
      },
      {
        vraag: "Welke vaste lasten vergeten mensen vaak?",
        antwoord:
          "Vooral de posten die niet maandelijks afschrijven: jaarpremies, de wegenbelasting per kwartaal, de gemeentelijke aanslag, onderhoudscontracten, contributies en cadeaus voor verjaardagen en feestdagen. Reken alles om naar een bedrag per maand zodat het vergelijkbaar wordt.",
      },
      {
        vraag: "Hoeveel procent van mijn inkomen mag naar vaste lasten?",
        antwoord:
          "Als vuistregel is rond de 50% van je netto-inkomen aan vaste lasten gezond. In de praktijk zit een gemiddeld huishouden eerder rond de 55% of hoger. Zit je daar ruim boven, dan knelt je vaste basis en niet je dagelijkse uitgaven.",
      },
    ],
    externLinks: [
      {
        label: "Nibud: huishoudelijke uitgaven",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/huishoudelijke-uitgaven/",
      },
      {
        label: "Zorgwijzer: premies zorgverzekering 2026",
        url: "https://www.zorgwijzer.nl/zorgverzekering-2026/zorgverzekering-2026-alle-premies-bekend-overzicht",
      },
    ],
  },
  {
    slug: "geld-indelen-salaris-potjes-systeem",
    korteTitel: "Je salaris slim indelen met potjes",
    titel: "Je salaris slim indelen: het rekeningen- en potjessysteem",
    metaTitel: "Geld indelen na je salaris: het potjessysteem uitgelegd",
    metaDescription:
      "Verdeel je salaris voordat je het uitgeeft. Hoeveel rekeningen je nodig hebt, hoe je sparen automatiseert en waarom jezelf eerst betalen werkt.",
    datum: "2026-06-18",
    datumFormatted: "18 juni 2026",
    leestijd: "6",
    categorie: "Sparen",
    excerpt:
      "Als alles op een rekening staat, voelt elke euro beschikbaar. Een potjessysteem draait dat om: je verdeelt je geld op de dag van je salaris, voordat je het uitgeeft.",
    preview: {
      type: "verdeling",
      label: "Je salaris meteen verdelen",
      posten: [
        { naam: "Vaste lasten", pct: 50, kleur: "#1C3A2A" },
        { naam: "Dagelijks en vrij", pct: 30, kleur: "#C4603A" },
        { naam: "Sparen en doelen", pct: 20, kleur: "#2D6A4F" },
      ],
      uitkomst: "Wat overblijft is van jou, zonder schuldgevoel",
    },
    faq: [
      {
        vraag: "Hoeveel bankrekeningen heb ik nodig?",
        antwoord:
          "Voor de meeste huishoudens werkt een opzet met drie of vier rekeningen het beste: een vaste-lastenrekening, een rekening voor dagelijkse uitgaven, een spaarrekening voor buffer en doelen, en eventueel een potje voor jaarlijkse en onregelmatige uitgaven. Losse potjes binnen een rekening werken net zo goed.",
      },
      {
        vraag: "Wat betekent jezelf eerst betalen?",
        antwoord:
          "Niet sparen wat aan het einde van de maand overblijft, maar aan het begin een vast bedrag wegzetten en de rest verdelen. Zo wordt sparen geen restpost meer maar de eerste betaling die je doet. Het Nibud adviseert ongeveer 10% van je netto-inkomen te sparen.",
      },
      {
        vraag: "Hoeveel buffer moet ik aanhouden?",
        antwoord:
          "Het Nibud houdt drie tot zes maanden vaste lasten aan als gezonde reserve. Bouw die buffer eerst op voordat je voor leuke doelen gaat sparen, zodat een tegenvaller je maandbudget niet meer omgooit.",
      },
    ],
    externLinks: [
      {
        label: "Nibud: een financiele buffer opbouwen",
        url: "https://www.nibud.nl/onderwerpen/sparen/een-financiele-buffer-opbouwen/",
      },
      {
        label: "Nibud: sparen",
        url: "https://www.nibud.nl/onderwerpen/sparen/",
      },
    ],
  },
  {
    slug: "kosten-verdelen-samenwonen-ongelijk-inkomen",
    korteTitel: "Kosten verdelen bij ongelijk inkomen",
    titel: "Kosten eerlijk verdelen als je samenwoont met een ongelijk inkomen",
    metaTitel: "Kosten verdelen bij samenwonen met ongelijk inkomen",
    metaDescription:
      "50/50 of naar rato? De drie manieren om samen de kosten te verdelen, met een rekenvoorbeeld voor een eerlijke verdeling bij verschillende inkomens.",
    datum: "2026-06-18",
    datumFormatted: "18 juni 2026",
    leestijd: "5",
    categorie: "Samenwonen",
    excerpt:
      "Zodra de inkomens uit elkaar lopen, gaat alles half om half betalen wringen. De drie manieren om de kosten te verdelen, en hoe je met de verhouding van jullie inkomens een eerlijke bijdrage uitrekent.",
    preview: {
      type: "vergelijking",
      label: "Naar rato verdelen",
      items: [
        { naam: "Jij (57%)", bedrag: 686, kleur: "#1C3A2A" },
        { naam: "Partner (43%)", bedrag: 514, kleur: "#C4603A" },
      ],
      noot: "Bij €2.000 en €1.500 netto, €1.200 gezamenlijke kosten",
    },
    faq: [
      {
        vraag: "Hoe verdeel je kosten eerlijk als je partner minder verdient?",
        antwoord:
          "Met de naar-rato-methode. Ieder betaalt een deel van de gezamenlijke kosten dat past bij zijn aandeel in het gezamenlijke inkomen. De formule: je eigen netto-inkomen gedeeld door het gezamenlijke netto-inkomen, maal de totale gezamenlijke kosten. Zo houdt iedereen verhoudingsgewijs evenveel over.",
      },
      {
        vraag: "Is 50/50 verdelen eerlijk bij samenwonen?",
        antwoord:
          "Alleen als jullie ongeveer evenveel verdienen. Lopen de inkomens uiteen, dan legt de minstverdienende partner verhoudingsgewijs een veel groter deel van zijn inkomen in. Dan voelt gelijk niet meer als eerlijk en kun je beter naar rato verdelen of alles samen voeren met eigen zakgeld.",
      },
      {
        vraag: "Wat is kosten naar rato verdelen?",
        antwoord:
          "Naar rato betekent verdelen in verhouding tot je inkomen. Verdien jij €2.000 en je partner €1.500, dan betaal jij afgerond 57% van de gezamenlijke kosten en je partner 43%. Bij €1.200 aan kosten is dat €686 om €514.",
      },
    ],
    externLinks: [
      {
        label: "Rabobank: kosten verdelen bij samenwonen",
        url: "https://www.rabobank.nl/particulieren/samenwonen/samenbetalen/kosten-verdelen",
      },
      {
        label: "Nibud: geldzaken samen",
        url: "https://www.nibud.nl/onderwerpen/rondkomen/geldzaken-samen/",
      },
    ],
  },
  {
    slug: "vakantiegeld-netto-hoeveel-hou-je-over-2026",
    korteTitel: "Vakantiegeld netto: hoeveel hou je over?",
    titel: "Vakantiegeld 2026: hoeveel hou je er netto van over?",
    metaTitel: "Vakantiegeld 2026 netto: hoeveel hou je over?",
    metaDescription:
      "Waarom valt je vakantiegeld netto tegen? Uitleg over het bijzonder tarief, netto-bedragen voor 2026 en hoe je voorkomt dat het ongemerkt verdwijnt.",
    datum: "2026-06-18",
    datumFormatted: "18 juni 2026",
    leestijd: "5",
    categorie: "Inkomen",
    excerpt:
      "Vakantiegeld voelt als een meevaller, maar het netto-bedrag valt bijna altijd tegen. Hoe het bijzonder tarief werkt, wat je overhoudt in 2026, en waar het daarna blijft.",
    preview: {
      type: "vergelijking",
      label: "Vakantiegeld bij €5.000 bruto per maand",
      items: [
        { naam: "Bruto", bedrag: 4800, kleur: "#8A9E8E" },
        { naam: "Netto", bedrag: 2450, kleur: "#2D6A4F" },
      ],
      noot: "8% van €60.000, bijzonder tarief ca. 50%",
    },
    faq: [
      {
        vraag: "Hoeveel vakantiegeld krijg ik netto in 2026?",
        antwoord:
          "Dat hangt af van je inkomen. Bij €2.000 bruto per maand houd je van zo'n €1.920 bruto netto ongeveer €1.250 over. Bij €5.000 bruto per maand is het bruto vakantiegeld ongeveer €4.800 en blijft er netto ruwweg €2.400 tot €2.500 over, omdat het bijzonder tarief dan rond de 50% ligt.",
      },
      {
        vraag: "Waarom betaal ik zo veel belasting over mijn vakantiegeld?",
        antwoord:
          "Vakantiegeld komt bovenop je gewone loon en wordt belast tegen het bijzonder tarief. De heffingskortingen die je belasting op je maandloon drukken, zijn daar al verrekend en komen niet nog een keer over je vakantiegeld. Bovendien valt dat extra inkomen vaak in een hogere tariefzone.",
      },
      {
        vraag: "Wat is het bijzonder tarief in 2026?",
        antwoord:
          "Het bijzonder tarief is een apart percentage voor eenmalige beloningen zoals vakantiegeld, een bonus of een dertiende maand. Het hangt af van je jaarinkomen: rond €38.000 ligt het op ongeveer 40%, rond €46.000 loopt het op tot ruim 50%.",
      },
    ],
    externLinks: [
      {
        label: "Belastingdienst: tarieven en heffingskortingen",
        url: "https://www.belastingdienst.nl/wps/wcm/connect/nl/voorlopige-aanslag/content/voorlopige-aanslag-tarieven-en-heffingskortingen",
      },
      {
        label: "Nibud: uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },
  {
    slug: "ons-boodschappenbudget-mislukte-tot-we-dit-deden",
    korteTitel: "Boodschappenbudget: een echte case",
    titel: "Ons boodschappenbudget mislukte elke keer — tot we dit deden",
    metaTitel: "Ons boodschappenbudget mislukte elke keer — tot we dit deden",
    metaDescription: "Een gezin ging van €950 naar €720 aan boodschappen per maand — zonder honger of soberheid. De vier dingen die we veranderden, en het voor/na-resultaat.",
    datum: "2026-05-31",
    datumFormatted: "31 mei 2026",
    leestijd: "6",
    categorie: "Besparen",
    excerpt: "Bram en Eva gaven ruim €950 per maand uit aan boodschappen zonder te weten waar het heen ging. Drie maanden later: €720, zonder in te leveren. Een echte case met de exacte aanpak en bedragen.",
    preview: {
      type: "vergelijking",
      label: "Boodschappen per maand — echte case",
      items: [
        { naam: "Voor", bedrag: 950, kleur: "#B03A2E" },
        { naam: "Na", bedrag: 720, kleur: "#2D6A4F" },
      ],
      noot: "€230/mnd minder, zonder soberheid",
    },
    faq: [
      {
        vraag: "Hoe stel je een boodschappenbudget in dat je wél volhoudt?",
        antwoord: "Werk met één weekbudget op een aparte rekening (op is op tot maandag), maak vooraf een weekmenu zodat je één keer grote boodschappen doet, en doe na elke keer een korte check-in. Stuur op je eigen pijnmomenten, bijvoorbeeld nooit hongerig winkelen.",
      },
      {
        vraag: "Hoeveel kun je besparen op boodschappen?",
        antwoord: "In deze case zo'n €230 per maand (bijna €2.760 per jaar), van €950 naar €720 — zonder minder of slechter te eten. Het verschil zat in een plan en een zichtbare grens, niet in zuiniger zijn.",
      },
      {
        vraag: "Moet je dan alles merkloos kopen?",
        antwoord: "Nee. In deze case geen merkloos-alles en geen maaltijden overslaan. Eén weekbudget, een weekmenu en een appje na de boodschappen waren genoeg.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },  {
    slug: "kerstpot-en-verjaardagspot-zo-bouwden-we-die",
    korteTitel: "Kerst- en verjaardagspot: een echte case",
    titel: "December overviel ons elk jaar — zo bouwden we een kerst- en verjaardagspot",
    metaTitel: "Kerst- en verjaardagspot opbouwen: zo werkt het",
    metaDescription: "Een december-klap van €500+, elk jaar. Door pieken te vertalen naar €150 per maand in drie potjes staat de kerstpot nu altijd klaar. De aanpak.",
    datum: "2026-05-31",
    datumFormatted: "31 mei 2026",
    leestijd: "5",
    categorie: "Sparen",
    excerpt: "Daan en Roos werden elk jaar overvallen door december. Door hun jaarlijkse pieken (±€1.800) om te rekenen naar €150 per maand in drie potjes, voelt geen enkele piekmaand nog als een klap. Een echte case.",
    preview: {
      type: "pijn",
      label: "De rekensom",
      items: ["€1.800/jaar aan pieken", "÷ 12 = €150/maand", "Geen december-klap meer"],
    },
    faq: [
      {
        vraag: "Hoe spaar je voor de feestdagen zonder in december klem te zitten?",
        antwoord: "Tel je voorspelbare jaarlijkse pieken op (Sinterklaas + kerst ±€500, verjaardagen, vakantie), deel door twaalf en zet dat maandbedrag automatisch in aparte potjes op je salarisdag. Dan staat de kerstpot er gewoon.",
      },
      {
        vraag: "Hoeveel kosten de feestmaanden gemiddeld?",
        antwoord: "December kost een huishouden al gauw €500 extra aan cadeaus, duurdere boodschappen en uitjes. Tel je verjaardagen en vakantie erbij, dan kom je in deze case op zo'n €1.800 aan voorspelbare pieken per jaar.",
      },
    ],
    externLinks: [
      {
        label: "Vastelastenbond — wat geven we uit aan Sinterklaas",
        url: "https://www.vastelastenbond.nl/blog/wat-geven-we-uit-aan-sinterklaas/",
      },
    ],
  },  {
    slug: "bso-kosten-tweede-inkomen-zo-draaiden-we-het-om",
    korteTitel: "BSO & tweede inkomen: een echte case",
    titel: "De BSO slokte ons tweede inkomen op — zo draaiden we het om",
    metaTitel: "De BSO slokte ons tweede inkomen op — zo draaiden we het om",
    metaDescription: "Van het tweede inkomen bleef netto weinig over door de BSO. Na het eerlijk doorrekenen: van 3 naar 1 dag opvang en ~€345 minder per maand.",
    datum: "2026-05-31",
    datumFormatted: "31 mei 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt: "Karim en Noor hielden netto bijna niets over van het tweede inkomen — de BSO slokte het op. Door uit te rekenen wat de extra werkdag écht opleverde, gingen ze van 3 naar 1 dag opvang: ~€345 per maand minder, én meer rust.",
    preview: {
      type: "vergelijking",
      label: "Eigen bijdrage opvang — echte case",
      items: [
        { naam: "3 dagen BSO", bedrag: 520, kleur: "#B03A2E" },
        { naam: "1 dag BSO", bedrag: 175, kleur: "#2D6A4F" },
      ],
      noot: "Verschilt per inkomen — reken na op toeslagen.nl",
    },
    faq: [
      {
        vraag: "Loont het tweede inkomen nog als de opvang zoveel kost?",
        antwoord: "Reken het door: wat blijft er ná opvang, reiskosten en een hogere belastingschijf netto over van die extra werkdag? In deze case bleek dat bijna niets. Toen ze van 3 naar 1 dag BSO gingen, was de besparing groter dan het weggevallen netto-inkomen.",
      },
      {
        vraag: "Wat is de maximale vergoede opvanguurprijs in 2026?",
        antwoord: "Voor de kinderopvangtoeslag is het maximale vergoede uurtarief voor BSO in 2026 €9,98 per uur. Hoeveel je zelf betaalt hangt sterk af van je inkomen — bovenmodale gezinnen krijgen minder toeslag.",
      },
    ],
    externLinks: [
      {
        label: "Belastingdienst — maximaal uurtarief kinderopvangtoeslag",
        url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/toeslagen/kinderopvangtoeslag/hoeveel-kinderopvangtoeslag-kan-ik-krijgen/maximaal-uurtarief-voor-de-kinderopvang",
      },
      {
        label: "Nationale Onderwijsgids — wat kost de BSO in 2026",
        url: "https://www.nationaleonderwijsgids.nl/kinderopvang/wat-kost-de-buitenschoolse-opvang-in-2026/",
      },
    ],
  },
  {
    slug: "modaal-inkomen-2026",
    korteTitel: "Modaal inkomen 2026",
    titel: "Modaal inkomen 2026: wat is het en wat houd je netto over?",
    metaTitel: "Modaal inkomen 2026: wat is het en wat houd je netto over?",
    metaDescription: "Het modaal inkomen is in 2026 circa €48.000 bruto — netto zo'n €2.700 tot €3.100 per maand. Wat modaal betekent en waarom het toch krap kan voelen.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inkomen",
    excerpt: "Modaal is geen gemiddelde en geen minimum, maar het meest voorkomende inkomen. In 2026 is dat ongeveer €48.000 bruto per jaar — netto €2.700 tot €3.100 per maand. En toch voelt het vaak krap.",
    preview: {
      type: "vergelijking",
      label: "Modaal inkomen 2026",
      items: [
        { naam: "Bruto per maand", bedrag: 3700, kleur: "#2D6A4F" },
        { naam: "Netto (indicatie)", bedrag: 2900, kleur: "#C4603A" },
      ],
      noot: "€48.000 bruto/jaar incl. vakantiegeld (CPB)",
    },
    faq: [
      {
        vraag: "Wat is het modaal inkomen in 2026?",
        antwoord: "Het modaal inkomen is in 2026 vastgesteld op ongeveer €48.000 bruto per jaar inclusief vakantiegeld, oftewel zo'n €3.700 bruto per maand. Het is het meest voorkomende inkomen in Nederland, niet het gemiddelde.",
      },
      {
        vraag: "Wat houd je netto over van een modaal inkomen?",
        antwoord: "Dat hangt af van je situatie (heffingskortingen, pensioen, toeslagen), maar netto komt een modaal inkomen ongeveer neer op €2.700 tot €3.100 per maand.",
      },
      {
        vraag: "Is modaal hetzelfde als het gemiddelde inkomen?",
        antwoord: "Nee. Modaal is het meest voorkomende inkomen; het gemiddelde ligt hoger omdat een kleine groep hoge inkomens het gemiddelde omhoog trekt.",
      },
    ],
    externLinks: [
      {
        label: "Modaal inkomen 2026 (CPB-kerncijfers)",
        url: "https://www.raisin.com/nl-nl/economie/modaal-inkomen/",
      },
    ],
  },
  {
    slug: "wat-kost-een-kind-per-maand",
    korteTitel: "Wat kost een kind per maand?",
    titel: "Wat kost een kind per maand?",
    metaTitel: "Wat kost een kind per maand?",
    metaDescription: "Het Nibud rekent dat één kind gemiddeld 15% van het besteedbaar inkomen kost — voor een modaal gezin €887 tot €1.000 per maand. Waar het geld heen gaat.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt: "Een kind krijgen verandert je financiën meer dan je vooraf inschat. Niet de luiers, maar wat er daarna elke maand bijkomt. Het Nibud rekent 15% van je inkomen voor één kind — voor een modaal gezin €887 tot €1.000 per maand.",
    preview: {
      type: "pijn",
      label: "Aandeel van je inkomen (Nibud)",
      items: ["1 kind ≈ 15%", "2 kinderen ≈ 25%", "3 kinderen ≈ 29%"],
    },
    faq: [
      {
        vraag: "Wat kost een kind gemiddeld per maand?",
        antwoord: "Het Nibud rekent dat één kind gemiddeld 15% van het besteedbaar inkomen kost, twee kinderen 25% en drie kinderen 29%. Voor een gezin met twee modale inkomens komt één kind neer op €887 tot €1.000 per maand.",
      },
      {
        vraag: "Kost een kind voor een alleenstaande ouder meer?",
        antwoord: "Relatief wel. Het Nibud rekent voor een alleenstaande ouder ongeveer 23% van het besteedbaar inkomen voor één kind en 37% voor twee, omdat één inkomen alle kosten draagt.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — wat kost een kind",
        url: "https://www.nibud.nl/onderwerpen/kinderen-en-jongeren/wat-kost-een-kind/",
      },
    ],
  },  {
    slug: "schoolkosten-per-jaar-gezin",
    korteTitel: "Wat kosten schoolgaande kinderen?",
    titel: "Schoolkosten per jaar: wat kost de middelbare school echt?",
    metaTitel: "Schoolkosten per jaar: wat kost de middelbare school echt?",
    metaDescription: "Onderwijs is gratis, maar schoolkosten lopen op tot €400–600 per kind. Wat je betaalt, wat vrijwillig is en hoe je de augustuspiek opvangt.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt: "Onderwijs is gratis, hoor je vaak — maar augustus is een van de duurste maanden. De vrijwillige ouderbijdrage is gemiddeld €188-200, maar met schoolspullen en een fiets lopen de werkelijke kosten op tot €400-600 per kind per jaar.",
    preview: {
      type: "vergelijking",
      label: "Middelbare school, per jaar",
      items: [
        { naam: "Vrijwillige bijdrage", bedrag: 200, kleur: "#8A9E8E" },
        { naam: "Totaal per kind", bedrag: 550, kleur: "#C4603A" },
      ],
      noot: "Inclusief schoolspullen en benodigdheden",
    },
    faq: [
      {
        vraag: "Wat kost de middelbare school per jaar voor ouders?",
        antwoord: "Lesgeld is er niet, maar de vrijwillige ouderbijdrage is gemiddeld €188 tot €200 per jaar. Met schoolspullen (gemiddeld €349), sportkleding en een fiets lopen de werkelijke kosten op tot €400 à €600 per kind per jaar.",
      },
      {
        vraag: "Is de ouderbijdrage verplicht?",
        antwoord: "Nee, de ouderbijdrage is wettelijk vrijwillig. Je kind mag nergens van worden uitgesloten als je niet of slechts deels betaalt, en scholen moeten dat ook zo communiceren.",
      },
    ],
    externLinks: [
      {
        label: "Rijksoverheid — kosten voor kind in voortgezet onderwijs",
        url: "https://www.rijksoverheid.nl/onderwerpen/voortgezet-onderwijs/vraag-en-antwoord/kosten-voor-kind-in-voortgezet-onderwijs",
      },
      {
        label: "Ouders & Onderwijs — vrijwillige ouderbijdrage",
        url: "https://oudersenonderwijs.nl/speerpunten/ouderbijdrage/",
      },
    ],
  },  {
    slug: "hogere-hypotheek-wat-kost-het-per-maand",
    korteTitel: "Wat kost een hogere hypotheek?",
    titel: "Wat kost een hogere hypotheek echt per maand?",
    metaTitel: "Wat kost een hogere hypotheek echt per maand?",
    metaDescription: "Elke €100.000 extra hypotheek kost bij ~4% rente grofweg €475 per maand, 30 jaar lang. Waarom 'het kan net' gevaarlijk is. Rekenvoorbeeld, geen advies.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt: "Een groter huis of overbieden: de hypotheek net wat hoger lijkt op papier klein verschil. Maandelijks voelt het anders — elke €100.000 extra is grofweg €475 per maand, 30 jaar lang. Een rekenvoorbeeld (geen advies).",
    preview: {
      type: "pijn",
      label: "Per €100.000 extra",
      items: ["≈ €475 per maand", "Rente ~4%, 30 jaar", "Een vaste last die blijft"],
    },
    faq: [
      {
        vraag: "Wat kost €100.000 extra hypotheek per maand?",
        antwoord: "Bij een rente van rond de 4% kost elke €100.000 extra hypotheek grofweg €475 per maand aan rente en aflossing (annuïteit, 30 jaar). Dit is een rekenvoorbeeld; je werkelijke last hangt af van rente, looptijd en aftrek.",
      },
      {
        vraag: "Hoeveel van mijn inkomen mag naar woonlasten?",
        antwoord: "Het Nibud hanteert als vuistregel dat je woonlasten bij voorkeur niet boven ongeveer een derde van je netto-inkomen uitkomen. Zit je daar ruim boven, dan wordt elke tegenvaller meteen voelbaar.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — uitgaven en woonlasten",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },  {
    slug: "verbouwen-financiele-valkuilen",
    korteTitel: "Verbouwen: de financiële valkuilen",
    titel: "Verbouwen: de drie financiële valkuilen",
    metaTitel: "Verbouwen: de drie financiële valkuilen",
    metaDescription: "Een verbouwing valt bijna altijd duurder uit dan begroot. De drie valkuilen: budgetuitloop, meefinancieren in de hypotheek, en de lifestyle-sprong erna.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt: "Een verbouwing is zelden alleen een verbouwing — het valt bijna altijd duurder uit dan begroot en trekt daarna je maandlasten op. De drie valkuilen die vrijwel iedereen overkomen, en hoe je ze voor bent.",
    preview: {
      type: "pijn",
      label: "De drie valkuilen",
      items: ["Budget loopt uit", "Meefinancieren", "Lifestyle-sprong"],
    },
    faq: [
      {
        vraag: "Waarom valt een verbouwing altijd duurder uit?",
        antwoord: "Door meerwerk, tegenvallers achter de muur en 'nu we toch bezig zijn'-keuzes eindigt een verbouwing zelden op het beginbedrag. Een marge van 10 tot 20% bovenop de offerte is geen luxe maar noodzaak.",
      },
      {
        vraag: "Is een verbouwing meefinancieren in de hypotheek slim?",
        antwoord: "Het maakt het maandelijks behapbaar, maar het is geen gratis geld: het verhoogt je woonlast voor jaren. Elke €100.000 extra is grofweg €475 per maand.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },
  {
    slug: "waar-blijft-het-bij-mark-en-lisa",
    korteTitel: "Casestudy: Mark & Lisa (€4.000)",
    titel: "Waar blijft het bij Mark & Lisa: €4.000 netto en toch krap",
    metaTitel: "Waar blijft het bij Mark & Lisa: €4.000 netto en toch krap",
    metaDescription: "Een fictief gezin met €4.000 netto en twee jonge kinderen. Top 25% van Nederland, en toch elke maand passen en meten. Waar blijft het?",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt: "Mark en Lisa verdienen samen €4.000 netto en zitten in de bovenste 25% van Nederland. En toch is het elke maand passen en meten. Een fictieve casestudy die laat zien waar het geld heen gaat.",
    preview: {
      type: "pijn",
      label: "Het profiel",
      items: ["€4.000 netto", "Top 25% van NL", "Toch krap"],
    },
    faq: [
      {
        vraag: "Hoe kan een gezin met €4.000 netto toch krap zitten?",
        antwoord: "Op papier houdt zo'n gezin zo'n €505 over, maar dat klopt alleen als alle posten binnen de norm blijven. Boodschappen die oplopen tot €875 (norm €627) en een abonnementenstapel richting €210 eten dat bedrag op.",
      },
      {
        vraag: "Is dit een echt gezin?",
        antwoord: "Nee, Mark en Lisa zijn een fictief gezin, samengesteld uit openbare gemiddelden van Nibud, CBS en de Belastingdienst. Bedoeld ter herkenning.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },  {
    slug: "waar-blijft-het-bij-fatima",
    korteTitel: "Casestudy: Fatima (alleenstaand)",
    titel: "Waar blijft het bij Fatima: €2.900 netto, één inkomen voor drie",
    metaTitel: "Casestudy Fatima: €2.900 netto, één inkomen voor drie",
    metaDescription: "Een fictieve alleenstaande ouder met €2.900 netto en twee kinderen. Hier ligt het niet aan de uitgaven — het is een lasten-probleem. Een eerlijk verhaal.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt: "Fatima is alleenstaande ouder met twee kinderen en €2.900 netto. Eén inkomen draagt alles. Een fictieve casestudy waarin het eerlijke antwoord anders is: hier ligt het niet aan de uitgaven.",
    preview: {
      type: "pijn",
      label: "Het profiel",
      items: ["€2.900 netto", "Eén inkomen draagt alles", "Lasten-probleem"],
    },
    faq: [
      {
        vraag: "Waarom houdt een alleenstaande ouder met €2.900 netto niets over?",
        antwoord: "Omdat één inkomen alle vaste lasten draagt — vooral een vrije sector-huur die ruim 40% opslokt. Er is geen luxe of verspilling; het is een lasten-probleem, geen gedragsprobleem.",
      },
      {
        vraag: "Wat helpt bij dit profiel?",
        antwoord: "Niet 'slimmer budgetteren', maar de grote posten aanpakken: controleren of alle toeslagen binnenkomen, de huur en gemeentelijke regelingen tegen het licht houden. Bij schulden is een budgetcoach of Geldfit de juiste plek.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — rondkomen",
        url: "https://www.nibud.nl/onderwerpen/rondkomen/",
      },
      {
        label: "Geldfit",
        url: "https://geldfit.nl/",
      },
    ],
  },  {
    slug: "waar-blijft-het-bij-david-en-tom",
    korteTitel: "Casestudy: David & Tom (DINK)",
    titel: "Waar blijft het bij David & Tom: €5.500, geen kinderen, toch krap",
    metaTitel: "Casestudy: €5.500 netto, geen kinderen, toch krap",
    metaDescription: "Een fictief stel met €5.500 netto, geen kinderen en geen auto. En toch verdwijnt het geld. Hoe lifestyle-inflatie ook zonder grote lasten toeslaat.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt: "David en Tom verdienen €5.500 netto, hebben geen kinderen en geen auto. En toch vragen ze zich af waar het geld blijft. Een fictieve casestudy over lifestyle-inflatie.",
    preview: {
      type: "pijn",
      label: "Het profiel",
      items: ["€5.500 netto", "Geen kinderen, geen auto", "Toch krap"],
    },
    faq: [
      {
        vraag: "Hoe kan een stel zonder kinderen of auto toch krap zitten?",
        antwoord: "Juist omdat de vaste lasten laag zijn, voelt alles 'kan wel': vaak uit eten en bezorgen (€600+), veertien abonnementen, stedentrips. De levensstijl groeit tot de beschikbare ruimte — lifestyle-inflatie.",
      },
      {
        vraag: "Wat zouden ze anders kunnen doen?",
        antwoord: "Geld eerst een bestemming geven en dan pas uitgeven. Met een spaardoel dat vooraf wordt afgeroomd en een begrensd 'uit eten'-budget is €800–1.000 per maand sparen haalbaar, zonder soberder te leven.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },  {
    slug: "seizoens-kostenkalender-per-maand",
    korteTitel: "Seizoens-kostenkalender",
    titel: "De seizoens-kostenkalender: welke kosten komen er per maand aan?",
    metaTitel: "Seizoenskosten per maand: wat komt er wanneer aan?",
    metaDescription: "Het jaar zit vol verborgen kostenpieken — van de zomervakantie tot december. Bekijk per maand wat eraan komt en hoe je het uitsmeert met een potje.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt: "De 'gemiddelde maand' bestaat niet. Elk seizoen heeft zijn eigen kostenpiek. Bekijk met onze interactieve kalender wat er per maand aankomt — en hoe je die pieken uitsmeert over het jaar.",
    preview: {
      type: "pijn",
      label: "De pieken",
      items: ["Zomer", "Schoolstart", "December"],
    },
    faq: [
      {
        vraag: "Wat zijn de grootste kostenpieken in het jaar?",
        antwoord: "De zomervakantie (al gauw €2.000+ voor een gezin), de schoolstart in augustus (schoolspullen, contributies, kleding) en december (Sinterklaas en kerst, samen zo'n €500).",
      },
      {
        vraag: "Hoe voorkom ik dat seizoenspieken mijn budget slopen?",
        antwoord: "Smeer ze uit over het jaar. Een piek van €1.200 in één maand is een probleem; verdeeld over twaalf maanden is dat €100 per maand. Zet het opzij in een apart potje waar je niet aankomt.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },  {
    slug: "wat-kost-een-zomervakantie-gezin",
    korteTitel: "Wat kost een zomervakantie?",
    titel: "Wat kost een zomervakantie voor een gezin?",
    metaTitel: "Wat kost een zomervakantie voor een gezin?",
    metaDescription: "Gemiddeld €600–700 per persoon — voor een gezin van vier al snel €2.400. Waar de vakantiekosten zitten en hoe je de naschok voorkomt.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt: "De zomervakantie is het hoogtepunt van het jaar en meteen de grootste losse uitgave. Gemiddeld €600-700 per persoon, voor een gezin van vier al snel €2.400. Waar het geld heen gaat en hoe je het uitsmeert.",
    preview: {
      type: "vergelijking",
      label: "Zomervakantie 2024 (CBS)",
      items: [
        { naam: "Per persoon", bedrag: 650, kleur: "#2D6A4F" },
        { naam: "Gezin van 4", bedrag: 2400, kleur: "#C4603A" },
      ],
      noot: "Gemiddelde uitgaven zomervakantie",
    },
    faq: [
      {
        vraag: "Wat kost een zomervakantie gemiddeld voor een gezin?",
        antwoord: "Nederlanders gaven in 2024 gemiddeld €600 tot €700 per persoon uit aan de zomervakantie. Voor een gezin van vier kom je al snel op €2.400 of meer, inclusief reis, eten en uitjes.",
      },
      {
        vraag: "Hoe voorkom ik een financiële kater na de vakantie?",
        antwoord: "Bepaal vooraf een totaalbudget voor de hele reis en zet dat het hele jaar maandelijks opzij. €200 per maand is €2.400 in de zomer — dan betaal je met geld dat er al is.",
      },
      {
        vraag: "Is vakantiegeld een bonus?",
        antwoord: "Nee, het is uitgesteld loon. Wie het volledig in de zomer uitgeeft, slaat vaak een gat in het najaar.",
      },
    ],
    externLinks: [
      {
        label: "CBS — vakanties van Nederlanders, kerncijfers",
        url: "https://www.cbs.nl/nl-nl/cijfers/detail/85302NED",
      },
    ],
  },  {
    slug: "zonnepanelen-terugverdientijd",
    korteTitel: "Zonnepanelen: terugverdientijd",
    titel: "Zonnepanelen: wat kosten ze en wat is de terugverdientijd?",
    metaTitel: "Zonnepanelen: wat kosten ze en wat is de terugverdientijd?",
    metaDescription: "8 zonnepanelen kosten gemiddeld €3.200 en verdienen zich in 6-8 jaar terug. Wat het einde van salderen betekent voor de terugverdientijd.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt: "Zonnepanelen verlagen je vaste lasten, maar met het einde van de salderingsregeling verandert de rekensom. 8 panelen kosten zo'n €3.200 en verdienen zich in 6-8 jaar terug. De eerlijke afweging.",
    preview: {
      type: "vergelijking",
      label: "Zonnepanelen (Milieu Centraal, 2025)",
      items: [
        { naam: "Kosten 8 panelen", bedrag: 3200, kleur: "#C4603A" },
        { naam: "Besparing/jaar", bedrag: 550, kleur: "#2D6A4F" },
      ],
      noot: "Terugverdientijd nu 6-8 jaar",
    },
    faq: [
      {
        vraag: "Wat kosten zonnepanelen en wat is de terugverdientijd?",
        antwoord: "Een set van 8 zonnepanelen kost volgens Milieu Centraal gemiddeld zo'n €3.200 inclusief installatie. De terugverdientijd ligt nu rond de 6 tot 8 jaar, en de panelen gaan ongeveer 25 jaar mee.",
      },
      {
        vraag: "Wat verandert er door het einde van de salderingsregeling?",
        antwoord: "Salderen kan nog tot eind 2026 en stopt daarna in één keer. De besparing daalt dan van zo'n €550 naar ongeveer €170 per jaar. Vanaf dan loont het vooral om je opgewekte stroom zo veel mogelijk zelf direct te gebruiken.",
      },
    ],
    externLinks: [
      {
        label: "Milieu Centraal — kosten en opbrengst zonnepanelen",
        url: "https://www.milieucentraal.nl/energie-besparen/zonnepanelen/kosten-en-opbrengst-zonnepanelen/",
      },
    ],
  },  {
    slug: "geldmythes-die-je-arm-houden",
    korteTitel: "5 geldmythes die je arm houden",
    titel: "5 hardnekkige geldmythes die je arm houden",
    metaTitel: "5 hardnekkige geldmythes die je arm houden",
    metaDescription: "Vijf aannames over geld die logisch klinken maar je krap houden — van 'sparen lukt vanzelf bij meer inkomen' tot 'wie krap zit gaat slecht met geld om'.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt: "Rond geld leven hardnekkige aannames die logisch klinken, maar je juist krap houden. Vijf van de meest voorkomende mythes ontkracht — en wat er werkelijk klopt.",
    preview: {
      type: "pijn",
      label: "Ontkracht",
      items: ["5 mythes", "Klinken logisch", "Houden je krap"],
    },
    faq: [
      {
        vraag: "Lukt sparen vanzelf als je meer verdient?",
        antwoord: "Nee, meestal niet. Naarmate je meer verdient groeien je uitgaven mee (lifestyle-inflatie), waardoor mensen met een hoog inkomen even krap kunnen zitten als met een laag inkomen.",
      },
      {
        vraag: "Betekent krap zitten dat je slecht met geld omgaat?",
        antwoord: "Nee. Bijna de helft van de Nederlandse huishoudens is financieel kwetsbaar, ook met een goed inkomen. Het zegt veel vaker iets over hoge vaste lasten en gebrek aan structuur dan over discipline.",
      },
    ],
    externLinks: [
      {
        label: "Deloitte — 47% van Nederland is financieel kwetsbaar",
        url: "https://www.deloitte.com/nl/nl/about/press-room/47-percent-van-nederland-is-financieel-kwetsbaar.html",
      },
    ],
  },
  {
    slug: "vergeten-abonnementen-opzeggen",
    korteTitel: "Vergeten abonnementen opsporen",
    titel: "Vergeten abonnementen opsporen: gemiddeld €200+ per maand",
    metaTitel: "Vergeten abonnementen opsporen: gemiddeld €200+ per maand",
    metaDescription:
      "Abonnementen zijn het sluipende lek bij uitstek. Tel met onze gratis tool je maand- en jaarbedrag op — en lees hoe je in 20 minuten opschoont.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Besparen",
    excerpt:
      "Klein per stuk, automatisch afgeschreven, en juist daarom onzichtbaar. Een gemiddeld gezin betaalt €200+ per maand aan abonnementen — en schat dat op de helft. Reken met onze tool je eigen totaal uit.",
    preview: {
      type: "pijn",
      label: "Het sluipende lek",
      items: ["Klein per stuk", "Loopt automatisch door", "€200+ per maand"],
    },
    faq: [
      {
        vraag: "Hoeveel geeft een gemiddeld gezin uit aan abonnementen?",
        antwoord:
          "Al gauw meer dan €200 per maand aan streaming, muziek, sport, telefoon, internet en allerlei kleinere diensten samen. De meeste mensen schatten hun eigen abonnementskosten op ongeveer de helft van wat ze werkelijk betalen.",
      },
      {
        vraag: "Hoe spoor ik vergeten abonnementen op?",
        antwoord:
          "Pak één bankafschrift en zet alle terugkerende afschrijvingen op een rij. Vraag je per abonnement af of je het de afgelopen maand echt hebt gebruikt. Alles waar je over twijfelt zeg je op — terugkomen kan altijd. Breng dubbele diensten terug naar één.",
      },
      {
        vraag: "Hoeveel kun je besparen door abonnementen op te schonen?",
        antwoord:
          "Wie eerlijk opschoont vindt vaak €30 tot €80 per maand aan abonnementen die niets meer toevoegen — €360 tot bijna €1.000 per jaar, zonder iets in te leveren wat je echt mist.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },
  {
    slug: "wat-kost-december-feestdagen-gezin",
    korteTitel: "Wat kost december?",
    titel: "Wat kost december? Sinterklaas en kerst voor een gezin",
    metaTitel: "Wat kost december? Sinterklaas en kerst voor een gezin",
    metaDescription:
      "Een gemiddeld huishouden geeft in december zo'n €500 extra uit. Waar het naartoe gaat — en hoe je de decemberklap voorkomt met een feestpotje.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt:
      "Sinterklaas, kerst, oud en nieuw — allemaal in vier weken. Een gemiddeld huishouden geeft in december zo'n €500 extra uit. Waar dat heen gaat, en hoe je het uitsmeert over het jaar.",
    preview: {
      type: "pijn",
      label: "December opgeteld",
      items: ["Sinterklaas", "Kerst", "~€500 in één maand"],
    },
    faq: [
      {
        vraag: "Hoeveel geeft een gemiddeld huishouden uit in december?",
        antwoord:
          "Aan de feestdagen samen zo'n €500 extra: Sinterklaas, kerstcadeaus, duurdere boodschappen rond kerst, versiering en uitjes. Niet door één grote aankoop, maar door tientallen kleine die allemaal in dezelfde maand vallen.",
      },
      {
        vraag: "Wat geven Nederlanders gemiddeld uit aan Sinterklaas?",
        antwoord:
          "Gemiddeld rond de €113 per persoon aan cadeaus, al geeft ongeveer de helft minder dan €50 per cadeau. Het venijn zit in het aantal cadeaus, niet in de prijs per stuk.",
      },
      {
        vraag: "Hoe voorkom ik de financiële decemberklap?",
        antwoord:
          "Smeer de feestdagen uit over het hele jaar. Zet maandelijks een vast bedrag opzij in een apart potje — €40 per maand is bijna €500 in december. Dan betaal je de feestdagen niet uit één maandinkomen.",
      },
    ],
    externLinks: [
      {
        label: "Vastelastenbond — wat geven we uit aan Sinterklaas",
        url: "https://www.vastelastenbond.nl/blog/wat-geven-we-uit-aan-sinterklaas/",
      },
      {
        label: "Vastelastenbond — kerst, wat kost dat?",
        url: "https://www.vastelastenbond.nl/blog/kerst-wat-kost-dat-wat-geven-we-uit-met-kerst/",
      },
    ],
  },
  {
    slug: "auto-kopen-of-leasen-kosten-per-maand",
    korteTitel: "Auto kopen of leasen?",
    titel: "Auto kopen of leasen — en wat kost een auto echt per maand?",
    metaTitel: "Auto kopen of leasen — en wat kost een auto echt per maand?",
    metaDescription:
      "Volgens de ANWB kost een eigen auto €413–€647 per maand all-in. Private lease of kopen — de eerlijke vergelijking inclusief de verborgen afschrijving.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt:
      "De auto is vaak de tweede vaste last na het huis — en de slechtst ingeschatte. Wat kost een auto echt per maand, en is kopen of private leasen voordeliger? Een eerlijke vergelijking.",
    preview: {
      type: "vergelijking",
      label: "Autokosten per maand (ANWB, all-in)",
      items: [
        { naam: "Compacte auto", bedrag: 413, kleur: "#2D6A4F" },
        { naam: "Middensegment", bedrag: 647, kleur: "#C4603A" },
      ],
      noot: "Inclusief afschrijving, verzekering, belasting, brandstof",
    },
    faq: [
      {
        vraag: "Wat kost een auto gemiddeld per maand in Nederland?",
        antwoord:
          "Volgens de ANWB rekent een compacte auto op zo'n €413 per maand, een kleine middenklasser rond €550 en het middensegment zo'n €647 — all-in, inclusief de afschrijving die je niet als rekening ziet. De afschrijving is meestal de grootste én meest onderschatte post.",
      },
      {
        vraag: "Private lease of kopen: wat is goedkoper?",
        antwoord:
          "Het hangt af van je situatie. Private lease geeft voorspelbaarheid (één vast bedrag, geen onverwachte reparaties) maar je zit vast aan een contract en bouwt geen eigen vermogen op. Zelf kopen is vaak goedkoper over de hele rit, zeker bij een betrouwbare occasion die je lang rijdt — maar dan draag je zelf het risico.",
      },
      {
        vraag: "Heb ik als gezin echt twee auto's nodig?",
        antwoord:
          "Vaak is dat de belangrijkste vraag. Een tweede auto verdubbelt bijna de autolast — al snel €1.000+ per maand samen. Het is een post die meegroeit met het inkomen zonder dat iemand hem tegenhoudt.",
      },
    ],
    externLinks: [
      {
        label: "ANWB — wat kost een auto per maand",
        url: "https://www.anwb.nl/auto/autokosten/autokosten-per-maand",
      },
      {
        label: "Nibud — autokosten per maand",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/autokosten/",
      },
    ],
  },
  {
    slug: "waar-blijft-het-bij-sanne-en-joost",
    korteTitel: "Waar blijft het bij Sanne & Joost",
    titel: "Waar blijft het bij Sanne & Joost: €6.200 netto en toch krap",
    metaTitel: "Waar blijft het bij Sanne & Joost: €6.200 netto en toch krap",
    metaDescription:
      "Een fictief gezin met €6.200 netto en toch bijna niks over. Waar blijft het? Een casestudy die laat zien dat meer verdienen het probleem zelden oplost.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt:
      "Sanne en Joost verdienen samen €6.200 netto en houden toch bijna niks over. Een fictieve casestudy, samengesteld uit openbare gemiddelden, die laat zien waar het geld heen gaat — en wat een vergelijkbaar gezin wél overhoudt.",
    preview: {
      type: "vergelijking",
      label: "Zelfde inkomen, andere uitkomst",
      items: [
        { naam: "Sanne & Joost houden over", bedrag: 150, kleur: "#C4603A" },
        { naam: "Kan ook", bedrag: 650, kleur: "#2D6A4F" },
      ],
      noot: "Per maand, bij hetzelfde netto-inkomen",
    },
    faq: [
      {
        vraag: "Hoe kan een gezin met €6.200 netto toch krap zitten?",
        antwoord:
          "Door posten die meegroeiden met het inkomen: een hoge hypotheek, twee auto's (waaronder private lease), boodschappen die met pubers oplopen tot ruim €1.100 per maand, opvang, sport en een abonnementenstapel richting €250. Samen blijft er amper €150 per maand over om te sparen.",
      },
      {
        vraag: "Wat zijn de grootste afwijkingen in dit voorbeeld?",
        antwoord:
          "Twee springen eruit: boodschappen die €400–500 boven verwachting liggen (deels pubers, deels los winkelen zonder weekmenu), en een tweede auto via private lease die er ooit bij kwam en nooit meer ter discussie stond.",
      },
      {
        vraag: "Is dit een echt gezin?",
        antwoord:
          "Nee. Sanne en Joost zijn een fictief gezin, samengesteld uit openbare gemiddelden van Nibud, CBS en de Belastingdienst plus praktijkindicaties. Het voorbeeld is bedoeld ter herkenning, niet als weergave van een echte klant.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },
  {
    slug: "50-30-20-regel-hoger-inkomen",
    korteTitel: "Werkt 50/30/20 bij een hoger inkomen?",
    titel:
      "Werkt de 50/30/20-regel nog bij een hoger inkomen?",
    metaTitel:
      "Werkt de 50/30/20-regel nog bij een hoger inkomen?",
    metaDescription:
      "De 50/30/20-regel is een prima startpunt, maar bij een hoger inkomen klopt de verdeling niet meer. Waarom — en welke verdeling dan wel werkt.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "6",
    categorie: "Sparen",
    excerpt:
      "50% vaste lasten, 30% vrij, 20% sparen — het bekendste budgetadvies dat er is. Maar wie goed verdient en de regel letterlijk volgt, legitimeert vooral zijn eigen lifestyle-inflatie. Zo pak je het slimmer aan.",
    preview: {
      type: "verdeling",
      label: "De klassieke 50/30/20-regel",
      posten: [
        { naam: "Vaste lasten", pct: 50, kleur: "#1C3A2A" },
        { naam: "Vrij besteedbaar", pct: 30, kleur: "#C4603A" },
        { naam: "Sparen", pct: 20, kleur: "#2D6A4F" },
      ],
      uitkomst: "Bij een hoger inkomen is 20% sparen een ondergrens",
    },
    faq: [
      {
        vraag: "Wat houdt de 50/30/20-regel precies in?",
        antwoord:
          "Je verdeelt je netto-inkomen in drie delen: 50% naar behoeften (huur of hypotheek, energie, verzekeringen, boodschappen, vervoer), 30% naar wensen (uit eten, hobby's, vakanties, abonnementen) en 20% naar sparen en aflossen. De kracht zit in de eenvoud.",
      },
      {
        vraag: "Werkt de 50/30/20-regel ook bij een hoog inkomen?",
        antwoord:
          "Als startpunt wel, maar de verdeling klopt dan niet meer. Je behoeften groeien niet automatisch mee tot de helft van je inkomen, en 20% sparen is bij een hoger inkomen eerder een ondergrens dan een doel. Wie de regel letterlijk volgt, legitimeert vooral zijn eigen lifestyle-inflatie.",
      },
      {
        vraag: "Welke verdeling is beter als je goed verdient?",
        antwoord:
          "Draai de logica om: bepaal eerst hoeveel je opzij wilt zetten en leef van de rest. Houd je vaste lasten bewust onder de 50% en laat het verschil naar sparen vloeien — denk eerder aan 50/20/30 met sparen richting 30%, of meer naarmate je inkomen stijgt.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — uitgaven en de 50%-norm voor vaste lasten",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
    ],
  },
  {
    slug: "tweeverdieners-toch-krap",
    korteTitel: "Tweeverdieners en toch krap",
    titel:
      "Tweeverdieners en toch krap: hoe kan dat?",
    metaTitel:
      "Tweeverdieners en toch krap: hoe kan dat?",
    metaDescription:
      "Twee inkomens en toch elke maand krap? Je bent niet de enige. Waarom twee salarissen vaak dubbele vaste lasten betekenen — en wat eraan helpt.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "5",
    categorie: "Inzicht",
    excerpt:
      "Twee salarissen die binnenkomen, en toch net zo krap als bij één inkomen. Hoe kan dat? Het tweede inkomen wordt zelden gespaard — het wordt meebesteed. Wat er speelt en wat helpt.",
    preview: {
      type: "pijn",
      label: "Herken jij dit?",
      items: ["Twee inkomens", "Dubbele vaste lasten", "Toch krap"],
    },
    faq: [
      {
        vraag: "Waarom komen tweeverdieners toch niet rond?",
        antwoord:
          "Omdat twee inkomens meestal ook dubbele kosten betekenen: een tweede auto, kinderopvang, een groter huis en vaker eten bestellen door tijdgebrek. Het tweede inkomen wordt zelden gespaard maar meebesteed, waardoor rondkomen met twee salarissen niet automatisch ruimer voelt.",
      },
      {
        vraag: "Houden we netto wel iets over van de tweede baan?",
        antwoord:
          "Voor gezinnen met jonge kinderen valt dat vaak tegen. Een groot deel van het tweede inkomen kan opgaan aan kinderopvang, ook na toeslag. De drukte en de kosten zijn er volop, terwijl er netto verrassend weinig overblijft.",
      },
      {
        vraag: "Wat helpt als je met twee inkomens toch krap zit?",
        antwoord:
          "Overzicht, geen hoger inkomen. Behandel het tweede inkomen niet als vrije ruimte die vanzelf opgaat, maar geef het een bestemming voordat het binnenkomt. Een vaste verdeling, zoals de potjesmethode, maakt dat concreet.",
      },
    ],
    externLinks: [
      {
        label: "Modaal inkomen 2026 (CPB-kerncijfers)",
        url: "https://www.raisin.com/nl-nl/economie/modaal-inkomen/",
      },
      {
        label: "CBS — inkomen van tweeverdieners",
        url: "https://www.cbs.nl/nl-nl/longread/statistische-trends/2023/inkomen-van-tweeverdieners-hoeveel-beide-partners-willen-bijdragen",
      },
    ],
  },
  {
    slug: "lifestyle-inflatie-meer-verdienen-meer-uitgeven",
    korteTitel: "Lifestyle-inflatie: meer verdienen, niks over",
    titel:
      "Lifestyle-inflatie: waarom meer verdienen niet meer overhouden betekent",
    metaTitel:
      "Lifestyle-inflatie — meer verdienen en toch krap",
    metaDescription:
      "Je verdient meer dan vroeger, maar houdt niks extra over? Dat heet lifestyle-inflatie. Zo groeien je uitgaven ongemerkt mee — en zo houd je het tegen.",
    datum: "2026-05-30",
    datumFormatted: "30 mei 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt:
      "Je kreeg er salaris bij, en toch voelt het elke maand even krap. Dat is lifestyle-inflatie: je uitgaven groeien ongemerkt mee met je inkomen. Wat het is, waarom het iedereen overkomt, en hoe je het tegenhoudt.",
    preview: {
      type: "pijn",
      label: "Het patroon",
      items: ["Meer verdienen", "Meer uitgeven", "Niks extra over"],
    },
    faq: [
      {
        vraag: "Wat is lifestyle-inflatie?",
        antwoord:
          "Lifestyle-inflatie is het verschijnsel dat je uitgaven meegroeien met je inkomen. Als je meer gaat verdienen, ga je bijna ongemerkt duurder leven — een duurdere auto, vaker uit eten, een groter huis. Het gevolg is dat een hoger inkomen niet leidt tot meer overhouden.",
      },
      {
        vraag: "Waarom houd ik niks over terwijl ik meer ben gaan verdienen?",
        antwoord:
          "Twee dingen tegelijk: een deel van je loonsverhoging is alleen inflatiecorrectie (in 2026 was de cao-stijging 4,5% nominaal, maar reëel zo'n 2%), en de rest lekt weg doordat je uitgaven meegroeien. Bij hogere inkomens verdwijnt bovendien meer aan belasting en afbouw van heffingskortingen.",
      },
      {
        vraag: "Hoe houd ik lifestyle-inflatie tegen?",
        antwoord:
          "Laat je uitgaven niet automatisch meestijgen met je inkomen. De simpelste methode: zet bij elke loonsverhoging meteen een vast deel apart, vóórdat het normaal gaat voelen op je rekening. Een vaste verdeling, zoals de potjesmethode, maakt dat concreet.",
      },
    ],
    externLinks: [
      {
        label: "CBS — cao-lonen eerste kwartaal 2026 (+4,5%)",
        url: "https://www.cbs.nl/nl-nl/nieuws/2026/14/cao-lonen-in-eerste-kwartaal-4-5-procent-hoger",
      },
      {
        label: "Modaal inkomen 2026 (CPB-kerncijfers)",
        url: "https://www.raisin.com/nl-nl/economie/modaal-inkomen/",
      },
    ],
  },
  {
    slug: "wat-is-normaal-bedrag-boodschappen-per-maand",
    korteTitel: "Boodschappen: norm vs. werkelijkheid",
    titel:
      "Wat zijn normale boodschappenkosten per maand? Nibud vs. werkelijkheid",
    metaTitel:
      "Normale boodschappenkosten: Nibud-norm vs. werkelijkheid",
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
        { naam: "Nibud minimum", bedrag: 627, kleur: "#2D6A4F" },
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
      "Is €4.000 netto een goed salaris in Nederland?",
    metaDescription:
      "€4.000 netto is top 25% in Nederland. Maar een gezin met koopwoning en 2 kinderen houdt er vaak minder dan €500 van over. Hoe dat kan.",
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
      "Hoeveel sparen per maand is normaal in Nederland?",
    metaDescription:
      "Nibud adviseert 10%, maar de gemiddelde Nederlander spaart 6,5% — en een kwart spaart niks. Wat is realistisch als je nu niks overhoudt?",
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
        url: "https://www.nibud.nl/onderwerpen/sparen/",
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
    leestijd: "7",
    categorie: "Inzicht",
    excerpt:
      "Je verdient genoeg. Niet extreem, maar genoeg. En toch staat er aan het einde van de maand bijna niks meer op de rekening. Hoe kan dat?",
    preview: {
      type: "pijn",
      label: "Herken jij dit?",
      items: ["Goed verdienen", "Toch krap", "Geen idee waarom"],
    },
    faq: [
      {
        vraag: "Waarom houd ik weinig over terwijl ik goed verdien?",
        antwoord:
          "Meestal niet door je inkomen, maar door drie dingen die ongemerkt optellen: sluipende vaste lasten en abonnementen (gemiddeld al meer dan €200 per maand), onderschatte boodschappen, en het ontbreken van een buffer voor terugkerende 'onverwachte' uitgaven. Samen slaan die een groot gat.",
      },
      {
        vraag: "Ligt het aan mijn inkomen of aan iets anders?",
        antwoord:
          "Bijna altijd aan structuur, niet aan inkomen. Gezinnen die hetzelfde verdienen maar meer overhouden, verdelen hun geld direct: vaste lasten van een aparte rekening, sparen in aparte potjes en een vast bedrag voor dagelijkse uitgaven. Meer verdienen zonder systeem lost het zelden op.",
      },
      {
        vraag: "Hoeveel geeft een gemiddeld gezin uit aan abonnementen?",
        antwoord:
          "Inmiddels meer dan €200 per maand aan streaming, sport, apps en telefoon samen. Tien jaar geleden was dat een fractie. De meeste mensen schatten hun eigen abonnementskosten op ongeveer de helft van wat ze werkelijk betalen.",
      },
      {
        vraag: "Wat is de eerste stap om meer over te houden?",
        antwoord:
          "Inzicht, niet bezuinigen. Pak de afschriften van de afgelopen twee maanden en tel drie dingen op: vaste lasten, boodschappen en wat er overblijft. Pas als je ziet waar het heen gaat, kun je gericht bijsturen.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — uitgaven van huishoudens",
        url: "https://www.nibud.nl/onderwerpen/uitgaven/",
      },
      {
        label: "CBS — cao-lonen eerste kwartaal 2026 (+4,5%)",
        url: "https://www.cbs.nl/nl-nl/nieuws/2026/14/cao-lonen-in-eerste-kwartaal-4-5-procent-hoger",
      },
      {
        label: "Deloitte — 47% van Nederland is financieel kwetsbaar (2024)",
        url: "https://www.deloitte.com/nl/nl/about/press-room/47-percent-van-nederland-is-financieel-kwetsbaar.html",
      },
    ],
  },
  {
    slug: "vergelijken-boodschappen-nederland-duitsland",
    korteTitel: "Boodschappen: Nederland vs. Duitsland",
    titel:
      "Boodschappen vergelijken Nederland vs Duitsland — wat koop je waar?",
    metaTitel:
      "Boodschappen Nederland vs Duitsland: wat is goedkoper?",
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
        url: "https://www.nibud.nl/onderwerpen/sparen/",
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
      "Salarisverhoging boven €76.000: zo weinig netto",
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
        url: "https://www.nibud.nl/tools/persoonlijk-budgetadvies/",
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
      "De helft van de Nederlandse stellen heeft ooit ruzie gemaakt over geld. Maar de meeste praten er nauwelijks over. Waarom — en wat je eraan kunt doen.",
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
      "Niet met bezuinigingstips, maar door te begrijpen waarom je meer uitgeeft dan je denkt. De vijf plekken waar het geld weglekt — en wat je eraan doet.",
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
      "Kosten levensonderhoud alleenstaande in 2026: wat je werkelijk nodig hebt om rond te komen",
    metaTitel:
      "Kosten levensonderhoud alleenstaande 2026: overzicht",
    metaDescription:
      "Wat kost het leven als alleenstaande in 2026? Van huur tot boodschappen tot verzekeringen: alle gemiddelden op een rij, plus waar de meeste ruimte zit.",
    datum: "2026-05-28",
    datumFormatted: "28 mei 2026",
    leestijd: "7",
    categorie: "Inzicht",
    excerpt:
      "De vaste lasten voor een alleenstaande liggen in 2026 gemiddeld tussen €2.000 en €2.400 per maand. In de Randstad structureel €300-400 hoger. Dit is het volledige overzicht, per kostenpost en per regio.",
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
  {
    slug: "kosten-levensonderhoud-alleenstaande-ouder-2026",
    korteTitel: "Kosten levensonderhoud alleenstaande ouder 2026",
    titel:
      "Kosten levensonderhoud alleenstaande ouder in 2026: wat je werkelijk nodig hebt",
    metaTitel:
      "Kosten levensonderhoud alleenstaande ouder 2026: overzicht",
    metaDescription:
      "Wat kost het als alleenstaande ouder in 2026? Van kinderopvang tot ALO-kop: alle kosten en regelingen op een rij, plus hoeveel inkomen je echt nodig hebt.",
    datum: "2026-06-10",
    datumFormatted: "10 juni 2026",
    leestijd: "7",
    categorie: "Inzicht",
    excerpt:
      "Als alleenstaande ouder draag je de kosten van kinderen op één inkomen. De regelingen helpen, maar de marge is structureel klein. Dit is het complete overzicht.",
    preview: {
      type: "vergelijking",
      label: "Kosten alleenstaande ouder 2026",
      items: [
        { naam: "Basis (geen kinderen)", bedrag: 2200, kleur: "#8AB89A" },
        { naam: "Met 1 kind", bedrag: 2850, kleur: "#1C3A2A" },
      ],
      noot: "Middelgrote stad, na toeslagen",
    },
    faq: [
      {
        vraag: "Hoeveel geld heb je nodig als alleenstaande ouder?",
        antwoord:
          "Een alleenstaande ouder heeft in een middelgrote stad minimaal €2.600-€3.000 netto per maand nodig voor één kind, inclusief een kleine spaarbuffer. Na toeslagen als de ALO-kop en het kindgebonden budget is het netto benodigde bedrag lager, maar de bruto behoefte blijft hoog.",
      },
      {
        vraag: "Hoeveel is de ALO-kop in 2026?",
        antwoord:
          "De alleenstaande ouderkop (ALO-kop) is in 2026 €3.407 per jaar, ofwel ca. €284 per maand. Dit is een extra bedrag bovenop het kindgebonden budget voor alleenstaande ouders die alle zorg en kosten zelf dragen.",
      },
      {
        vraag: "Hoeveel kindgebonden budget krijg je als alleenstaande ouder?",
        antwoord:
          "Bij een inkomen tot €29.736 ontvang je als alleenstaande ouder maximaal €5.996 per jaar voor één kind, inclusief de ALO-kop. Boven die inkomensgrens bouwt het bedrag af, maar bij een modaal inkomen ontvang je vaak nog steeds een substantieel bedrag.",
      },
      {
        vraag: "Zijn kinderkosten hoger voor een alleenstaande ouder?",
        antwoord:
          "Ja. Je betaalt dezelfde kosten als twee-oudergezinnen, maar draagt ze alleen. Kinderopvang, kleding, sport, schoolkosten en extra boodschappen tellen op tot €500-700 extra per maand voor één kind. De toeslagen compenseren een deel, maar de financiële druk blijft groter dan in een tweeoudergezin.",
      },
    ],
    externLinks: [
      {
        label: "Belastingdienst: ALO-kop en kindgebonden budget",
        url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/toeslagen/kindgebonden_budget/",
      },
      {
        label: "Nibud: financieel overzicht alleenstaande ouders",
        url: "https://www.nibud.nl/onderwerpen/gezin/alleenstaande-ouders/",
      },
    ],
  },
  {
    slug: "kosten-levensonderhoud-zzp-alleenstaande-2026",
    korteTitel: "Kosten levensonderhoud ZZP-alleenstaande 2026",
    titel:
      "Kosten levensonderhoud als ZZP-alleenstaande in 2026: waarom je buffer nooit genoeg voelt",
    metaTitel:
      "Kosten levensonderhoud ZZP-alleenstaande 2026: overzicht",
    metaDescription:
      "Als ZZP-alleenstaande combineer je variabel inkomen met alle vaste lasten op één naam. Wat je nodig hebt, wat je moet reserveren en hoe groot je buffer moet zijn.",
    datum: "2026-06-10",
    datumFormatted: "10 juni 2026",
    leestijd: "6",
    categorie: "Inzicht",
    excerpt:
      "Een ZZP-alleenstaande heeft structureel meer bruto omzet nodig dan een werknemer in dezelfde situatie. AOV, pensioen, belasting: alles reserveer je zelf. Dit is het overzicht.",
    preview: {
      type: "vergelijking",
      label: "Wat moet een ZZP-alleenstaande reserveren?",
      items: [
        { naam: "Vaste lasten", bedrag: 2200, kleur: "#8AB89A" },
        { naam: "Te reserveren", bedrag: 1600, kleur: "#1C3A2A" },
      ],
      noot: "Bij omzet €4.000/mnd, middelgrote stad",
    },
    faq: [
      {
        vraag: "Hoeveel moet een ZZP-alleenstaande bufferen?",
        antwoord:
          "Minimaal zes maanden aan vaste lasten inclusief reserveringen. Bij vaste lasten van €2.200 en reserveringen (belasting, AOV, pensioen) van €1.600 per maand is dat een buffer van minimaal €23.000. Zonder partner die bijspringt is deze buffer de enige veiligheid bij ziekte of een rustige periode.",
      },
      {
        vraag: "Heb ik als ZZP-alleenstaande recht op zorgtoeslag?",
        antwoord:
          "Dat hangt af van je inkomen. Bij een jaarinkomen boven ca. €38.000 (2026) vervalt het recht op zorgtoeslag. Bij een wisselend inkomen kun je soms zorgtoeslag ontvangen en later terugbetalen bij een aanslag. Begroten op zorgtoeslag is daarom risicovol.",
      },
      {
        vraag: "Hoeveel pensioen moet ik zelf opbouwen als ZZP-alleenstaande?",
        antwoord:
          "Nibud adviseert minimaal 17% van de jaarwinst opzij te zetten voor pensioen. Bij een omzet van €4.000 per maand is dat ca. €500-€680 per maand. Als alleenstaande is er geen partnerpensioen als vangnet, dus eigen opbouw is de enige buffer voor later.",
      },
      {
        vraag: "Hoeveel bruto omzet heb ik nodig als ZZP-alleenstaande?",
        antwoord:
          "In een middelgrote stad met vaste lasten van €2.200 per maand heb je als ZZP-alleenstaande een structurele maandomzet van minimaal €4.500-€5.000 nodig om comfortabel rond te komen en buffer op te bouwen. In de Randstad is dat €5.000-€6.000.",
      },
    ],
    externLinks: [
      {
        label: "Nibud: financieel advies voor ZZP-ers",
        url: "https://www.nibud.nl/onderwerpen/inkomen/zelfstandigen/",
      },
      {
        label: "Rijksoverheid: zelfstandigenaftrek en MKB-winstvrijstelling",
        url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/winst/",
      },
    ],
  },
  {
    slug: "kosten-levensonderhoud-alleenstaande-50-plus-2026",
    korteTitel: "Kosten levensonderhoud alleenstaande 50-plus 2026",
    titel:
      "Kosten levensonderhoud als alleenstaande 50-plusser in 2026: het pensioenplaatje dat je moet kennen",
    metaTitel:
      "Kosten levensonderhoud alleenstaande 50-plus 2026: pensioen en kosten",
    metaDescription:
      "Als alleenstaande 50-plusser bouw je pensioen op op één inkomen. Hoeveel AOW krijg je, wat heb je nodig en wat kun je nu nog bijsturen? Dit is het overzicht.",
    datum: "2026-06-10",
    datumFormatted: "10 juni 2026",
    leestijd: "7",
    categorie: "Pensioen",
    excerpt:
      "Alleenstaande 50-plussers ontvangen één AOW en hebben één opgebouwd pensioen. Het verschil met samenwonenden is groot. Dit is wat je moet weten voor je met pensioen gaat.",
    preview: {
      type: "vergelijking",
      label: "Inkomen bij pensioen alleenstaande",
      items: [
        { naam: "AOW alleenstaande", bedrag: 1400, kleur: "#8AB89A" },
        { naam: "Benodigd minimum", bedrag: 1750, kleur: "#1C3A2A" },
      ],
      noot: "2026, exclusief aanvullend pensioen",
    },
    faq: [
      {
        vraag: "Hoeveel AOW krijg je als alleenstaande in 2026?",
        antwoord:
          "De AOW voor alleenstaanden bedraagt in 2026 ca. €1.400 netto per maand, gebaseerd op 70% van het minimumloon. Dit is structureel minder dan wat twee partners samen ontvangen. Bovenop de AOW is er de alleenstaandeouderenkorting van €540 per jaar.",
      },
      {
        vraag: "Hoeveel heb je nodig als alleenstaande gepensioneerde?",
        antwoord:
          "Nibud rekent dat een gepensioneerde alleenstaande minimaal €1.650-€1.900 per maand nodig heeft voor basiskosten. De AOW alleen dekt dat niet volledig. Het gat wordt gevuld door aanvullend pensioen dat je via werk hebt opgebouwd.",
      },
      {
        vraag: "Wat is de alleenstaandeouderenkorting 2026?",
        antwoord:
          "De alleenstaandeouderenkorting is €540 per jaar in 2026. Het is een heffingskorting voor AOW-gerechtigden zonder partner, geen extra uitkering. Het verlaagt de te betalen belasting, wat netto een klein voordeel oplevert.",
      },
      {
        vraag: "Wat kan ik nog doen om mijn pensioensituatie te verbeteren?",
        antwoord:
          "Bekijk eerst mijnpensioenoverzicht.nl om te zien wat je hebt opgebouwd. Extra storten in een lijfrente of bankspaarproduct is fiscaal aftrekbaar en werkt sterker naarmate je eerder begint. Controleer ook je verwachte vaste lasten bij pensioen: een afgeloste hypotheek verlaagt de benodigde maandsom aanzienlijk.",
      },
    ],
    externLinks: [
      {
        label: "Mijn Pensioenoverzicht",
        url: "https://www.mijnpensioenoverzicht.nl",
      },
      {
        label: "SVB: AOW-bedragen 2026",
        url: "https://www.svb.nl/nl/aow/hoogte-aow",
      },
      {
        label: "Nibud: pensioen voor alleenstaanden",
        url: "https://www.nibud.nl/onderwerpen/pensioen/",
      },
    ],
  },
  {
    slug: "pensioen-aanvullen-hoeveel-heb-je-nodig",
    korteTitel: "Pensioen aanvullen: hoeveel heb je nodig?",
    titel: "Pensioen aanvullen: hoeveel heb je nodig — en wanneer is het te laat?",
    metaTitel: "Pensioen aanvullen: hoeveel heb je nodig?",
    metaDescription: "Weet je hoeveel pensioen je straks hebt? Wanneer aanvullen loont, hoeveel je mist bij een jobswitch, en hoe één gezin €280 per maand bespaarde.",
    datum: "2026-06-06",
    datumFormatted: "6 juni 2026",
    leestijd: "7",
    categorie: "Pensioen",
    excerpt: "Mieke en Bas verdienen samen €6.200 netto en hadden nooit naar hun pensioen gekeken. Blijkt: een gat van €390.000. Hoe dat ontstond en hoe ze het voor €175 per maand netto aanpakten.",
    preview: {
      type: "vergelijking",
      label: "Verwacht pensioen — echte case",
      items: [
        { naam: "Voor", bedrag: 1430, kleur: "#B03A2E" },
        { naam: "Na aanvullen", bedrag: 4100, kleur: "#2D6A4F" },
      ],
      noot: "Per maand gezamenlijk incl. AOW",
    },
    faq: [
      {
        vraag: "Hoe weet ik hoeveel pensioen ik straks krijg?",
        antwoord: "Ga naar mijnpensioenoverzicht.nl en log in met DigiD. Je ziet per fonds wat je verwachte uitkering is en wat het totaal is. Dit duurt vijf minuten en is het startpunt voor alles.",
      },
      {
        vraag: "Wanneer moet ik beginnen met pensioen aanvullen?",
        antwoord: "Zo vroeg mogelijk. Begin op je 35e met €200 per maand, dan heb je bij 4% groei op je 67e circa €190.000 opgebouwd. Begin op je 45e met hetzelfde bedrag: circa €88.000. Tijd is het enige dat hier echt telt.",
      },
      {
        vraag: "Is pensioen aanvullen hetzelfde als beleggen?",
        antwoord: "Niet per se. Een lijfrentespaarrekening bij een bank is gewoon sparen — geen beleggingsrisico. Een lijfrentebeleggingsrekening wél. Je kiest zelf welke variant je wil.",
      },
      {
        vraag: "Wat is de jaarruimte voor pensioenopbouw?",
        antwoord: "De jaarruimte is het bedrag dat je jaarlijks belastingvrij in een lijfrente mag inleggen. Bij een inkomen van €60.000 bruto is dat al gauw €3.000 tot €5.000 per jaar. Je berekent het op de site van de Belastingdienst.",
      },
    ],
    externLinks: [
      {
        label: "Mijn Pensioenoverzicht — check je opbouw",
        url: "https://www.mijnpensioenoverzicht.nl",
      },
      {
        label: "Belastingdienst — jaarruimte berekenen",
        url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/vermogen_en_aanmerkelijk_belang/lijfrente/premies_voor_lijfrenten/jaarruimte/",
      },
    ],
  },
  {
    slug: "financieel-onafhankelijk-worden-realistisch",
    korteTitel: "Financieel onafhankelijk: hoe realistisch?",
    titel: "Financieel onafhankelijk worden: wat het echt betekent (en wat niet)",
    metaTitel: "Financieel onafhankelijk worden: hoe realistisch is het?",
    metaDescription: "Financieel onafhankelijk worden hoeft geen FIRE te zijn. Wat het realistisch betekent voor gezinnen met een goed inkomen — met een voor/na-verhaal.",
    datum: "2026-06-06",
    datumFormatted: "6 juni 2026",
    leestijd: "7",
    categorie: "Vermogen",
    excerpt: "Thomas en Inge (€7.500 netto) dachten over 10 jaar te kunnen stoppen. De berekening: €1.740.000 nodig. Hoe ze hun doel herdefinieerden naar niveau 3-vrijheid — en waarom dat veel haalbaarder is.",
    preview: {
      type: "pijn",
      label: "FIRE vs. niveau 3-vrijheid",
      items: ["FIRE-doel: €1.740.000", "Niveau 3-vrijheid: €500.000", "Haalbaar in 12 jaar bij €1.200/mnd"],
    },
    faq: [
      {
        vraag: "Hoeveel geld heb ik nodig om financieel onafhankelijk te zijn?",
        antwoord: "Voor volledige onafhankelijkheid (FIRE): 25 keer je jaarlijkse uitgaven. Voor niveau 3-vrijheid — meer keuze, minder stress — is een vrij vermogen van 5 tot 10 keer je jaarsalaris al een enorme stap.",
      },
      {
        vraag: "Is beleggen noodzakelijk voor financiële onafhankelijkheid?",
        antwoord: "Nee. Sparen zonder rendement verliest koopkracht door inflatie, maar een bankspaarrekening of lijfrenterekening biedt al meer rendement zonder beleggingsrisico. Wie wil beleggen kan dat doen, maar het is geen vereiste voor financiële rust.",
      },
      {
        vraag: "Hoe lang duurt het om financieel onafhankelijk te worden?",
        antwoord: "Dat hangt volledig af van je vrije cashflow en doel. Met €500 per maand vrij en een doel van €150.000 duurt het bij 3% rendement circa 19 jaar. Met €1.200 per maand: circa 10 jaar. Beginnen telt meer dan het bedrag.",
      },
      {
        vraag: "Wat als mijn partner een ander ritme heeft qua financiële planning?",
        antwoord: "Dat is heel normaal. Geld en relatiestress gaan vaak samen. Lees ons artikel over geld en relatiestress voor een eerlijk startpunt.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — hoeveel heb je nodig na pensionering",
        url: "https://www.nibud.nl/onderwerpen/later/",
      },
    ],
  },
  {
    slug: "studieschuld-aflossen-of-sparen",
    korteTitel: "Studieschuld aflossen of sparen?",
    titel: "Studieschuld aflossen of sparen: wat is slimmer in 2026?",
    metaTitel: "Studieschuld aflossen of sparen: wat is slimmer?",
    metaDescription: "Studieschuld aflossen of sparen: eerlijk antwoord met rekensom — inclusief een voor/na-case van €280 per maand teruggewonnen.",
    datum: "2026-06-06",
    datumFormatted: "6 juni 2026",
    leestijd: "6",
    categorie: "Sparen",
    excerpt: "Lotte loste elke maand €280 extra af op haar studieschuld — en had daardoor geen buffer. Na de rekensom: rente studieschuld 2,56% vs. spaarrente 2,9%. Ze stopte met overaflossen en won €280 per maand terug.",
    preview: {
      type: "pijn",
      label: "De rekensom voor Lotte & Pieter",
      items: ["Rente studieschuld 2026: 2,56%", "Spaarrente 2026: 2,90%", "€280/mnd teruggewonnen door te stoppen"],
    },
    faq: [
      {
        vraag: "Telt studieschuld mee voor hypotheek?",
        antwoord: "Ja. Globaal geldt: €10.000 studieschuld = circa €50 per maand minder hypotheekruimte, wat neerkomt op circa €25.000 à €30.000 minder maximale hypotheek. Reken dit altijd door met een hypotheekadviseur.",
      },
      {
        vraag: "Wat is de rente op mijn studieschuld in 2026?",
        antwoord: "In 2026 is de rente voor alle studieleningen van DUO vastgesteld op 2,56%. Dit wordt jaarlijks herzien op basis van het gemiddelde van staatsleningen over de afgelopen vijf jaar.",
      },
      {
        vraag: "Verdwijnt mijn studieschuld na een bepaalde tijd vanzelf?",
        antwoord: "Ja. Bij het oude stelsel na 15 jaar, bij het sociaal leenstelsel na 35 jaar. De restschuld wordt dan kwijtgescholden, ook als er nog een saldo openstaat.",
      },
      {
        vraag: "Wanneer is extra aflossen op studieschuld wél slim?",
        antwoord: "Als je op korte termijn een huis wil kopen en de schuld je hypotheekruimte in de weg staat, als aflossing de schuld definitief nul maakt en je de ruimte daarna direct naar sparen omzet, of als de studielening-rente stijgt boven je spaarrente.",
      },
    ],
    externLinks: [
      {
        label: "DUO — terugbetalen studieschuld",
        url: "https://duo.nl/particulier/terugbetalen/",
      },
      {
        label: "Belastingdienst — rekenhulp jaarruimte",
        url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/vermogen_en_aanmerkelijk_belang/lijfrente/premies_voor_lijfrenten/jaarruimte/",
      },
    ],
  },
  {
    slug: "gezamenlijke-rekening-voor-en-nadelen",
    korteTitel: "Gezamenlijke rekening: voor- en nadelen",
    titel: "Gezamenlijke rekening: voor- en nadelen voor stellen in 2026",
    metaTitel: "Gezamenlijke rekening: voor- en nadelen voor stellen",
    metaDescription: "Gezamenlijke rekening als stel: voor- en nadelen uitgelegd. Hoe één stel van wekelijkse geldruzie naar rust ging met een hybride systeem.",
    datum: "2026-06-06",
    datumFormatted: "6 juni 2026",
    leestijd: "6",
    categorie: "Samenwonen",
    excerpt: "Nadia (€2.400) en Joris (€3.100) hadden wekelijks ruzie over wie wat betaalde. Na overstap naar een hybride rekening-systeem naar inkomen: discussies vrijwel nul, en voor het eerst spaardoelen samen.",
    preview: {
      type: "pijn",
      label: "Nadia & Joris — hybride systeem",
      items: ["Joris draagt 56% bij (€1.176/mnd)", "Nadia draagt 44% bij (€924/mnd)", "Gezamenlijke pot: €2.100/mnd vaste lasten"],
    },
    faq: [
      {
        vraag: "Is een gezamenlijke rekening verplicht als je trouwt of samenwoont?",
        antwoord: "Nee. Er is geen wettelijke verplichting. Getrouwde stellen hebben standaard gemeenschap van goederen tenzij ze huwelijkse voorwaarden opstelden — maar dat zegt niets over hoe ze hun bankrekeningen inrichten.",
      },
      {
        vraag: "Wat is het beste systeem als we ongelijk verdienen?",
        antwoord: "Bijdragen naar inkomen is voor veel stellen het eerlijkst: elk draagt een percentage bij dat overeenkomt met zijn of haar aandeel in het gezamenlijke inkomen. Zo betaalt de hoogste verdiener meer, maar houden beiden procentueel evenveel over.",
      },
      {
        vraag: "Hoe regel je een gezamenlijke rekening als je schulden hebt?",
        antwoord: "Persoonlijke schulden zoals een studieschuld houd je het beste gescheiden van de gezamenlijke rekening. Op een gezamenlijke rekening zijn schulden in principe van jullie allebei.",
      },
      {
        vraag: "Hoe vaak moet je het geldsysteem als stel evalueren?",
        antwoord: "Elk kwartaal is een goed ritme. Inkomens en vaste lasten veranderen — een systeem dat een jaar geleden werkte, kan nu niet meer kloppen. Een korte check van 15 minuten voorkomt frustratie.",
      },
    ],
    externLinks: [
      {
        label: "Nibud — financiën regelen als stel",
        url: "https://www.nibud.nl/onderwerpen/inkomen/samenwonen/",
      },
    ],
  },
  {
    slug: "wat-kost-een-financieel-adviseur",
    korteTitel: "Wat kost een financieel adviseur?",
    titel: "Wat kost een financieel adviseur — en heb je er echt één nodig?",
    metaTitel: "Wat kost een financieel adviseur? Tarieven en alternatieven",
    metaDescription: "Een financieel adviseur kost €150–€300/uur. Voor gezinnen die krap zitten is een eenmalig gesprek van €125 vaak voldoende. Wanneer je wat nodig hebt.",
    datum: "2026-06-07",
    datumFormatted: "7 juni 2026",
    leestijd: "6",
    categorie: "Financieel advies",
    excerpt: "Lisanne zocht op 'financieel adviseur' en sloot het tabblad zodra ze het tarief zag: €220/uur. Ze had geen hypotheek nodig — ze wilde weten waarom er nooit geld over was. Dat kost €125, niet €660.",
    preview: {
      type: "vergelijking",
      label: "Kosten financieel advies vergelijken",
      items: [
        { naam: "Traditionele adviseur (3u)", bedrag: 660, kleur: "#B03A2E" },
        { naam: "Eenmalig gesprek", bedrag: 125, kleur: "#2D6A4F" },
      ],
      noot: "Bij €220/uur × 3u vs. €125 eenmalig",
    },
    faq: [
      {
        vraag: "Wat kost een financieel adviseur gemiddeld?",
        antwoord: "De meeste onafhankelijke financieel adviseurs rekenen een uurtarief tussen €150 en €300. Voor een volledig adviestraject (inventarisatie + plan + uitwerking) ben je al snel €800 tot €2.000 kwijt. Sommige adviseurs werken ook met een percentage van het beheerd vermogen, doorgaans 0,5 tot 1,5% per jaar.",
      },
      {
        vraag: "Wat kost een financieel adviseur per uur?",
        antwoord: "Een onafhankelijke financieel adviseur kost in Nederland gemiddeld €150 tot €250 per uur. Adviseurs in grote steden of met specialisatie in vermogensbeheer zitten aan de bovenkant. Bankadviseurs werken vaak niet op uurbasis maar via provisie op producten.",
      },
      {
        vraag: "Heb ik een gecertificeerde financieel adviseur nodig?",
        antwoord: "Alleen als je advies nodig hebt over hypotheek, beleggingen of pensioenverzekeringen. Voor inzicht in je maandbudget, uitgavenpatroon of spaarplan heb je geen Wft-gecertificeerde adviseur nodig. Een eenmalig financieel adviesgesprek is in dat geval voldoende.",
      },
      {
        vraag: "Bestaat gratis financieel advies?",
        antwoord: "Ja, maar het is niet echt gratis. Bankadviseurs die 'gratis' advies geven, verdienen provisie op de producten die je via hen afsluit. Hun belang en jouw belang lopen dan niet altijd parallel. Een onafhankelijke adviseur met transparant uurtarief is in de meeste gevallen eerlijker.",
      },
    ],
    externLinks: [
      {
        label: "AFM — vergelijk gecertificeerde financieel adviseurs",
        url: "https://www.afm.nl/nl-nl/consumenten/diensten-producten/financieel-advies/adviseurs-vergelijken",
      },
      {
        label: "Nibud — hoeveel geld heb je nodig voor een adviseur?",
        url: "https://www.nibud.nl/consumenten/budgetadvies/",
      },
    ],
  },
  {
    slug: "wat-doet-een-financieel-adviseur",
    korteTitel: "Wat doet een financieel adviseur?",
    titel: "Wat doet een financieel adviseur — en heb jij er echt één nodig?",
    metaTitel: "Wat doet een financieel adviseur en wanneer heb je er één?",
    metaDescription: "Een financieel adviseur adviseert over hypotheek, beleggingen en pensioen. Voor gezinnen die krap zitten is er een alternatief dat beter past.",
    datum: "2026-06-07",
    datumFormatted: "7 juni 2026",
    leestijd: "5",
    categorie: "Financieel advies",
    excerpt: "Veel mensen denken dat een financieel adviseur voor rijke mensen is. Klopt niet — maar het hangt af van wat je vraag is. Voor hypotheek: ja. Voor 'waarom is ons geld op': nee. Lees het verschil.",
    preview: {
      type: "pijn",
      label: "Wanneer heb je welk type hulp nodig?",
      items: [
        "Hypotheek of beleggingen → gecertificeerde adviseur (Wft)",
        "Maandbudget en inzicht → financieel coach of gesprek",
        "Pensioenproduct → Wft-adviseur verplicht",
        "'Waar blijft ons geld?' → geen adviseur nodig",
      ],
    },
    faq: [
      {
        vraag: "Wat doet een financieel adviseur precies?",
        antwoord: "Een financieel adviseur geeft advies over financiële producten zoals hypotheken, beleggingen en pensioenverzekeringen. In Nederland geldt voor die drie gebieden een vergunningsplicht (Wft). Buiten die producten — zoals budgetadvies of maandelijkse financiële planning — is er geen vergunning vereist.",
      },
      {
        vraag: "Wat is het verschil tussen een financieel adviseur en een financieel coach?",
        antwoord: "Een gecertificeerde financieel adviseur (Wft) mag advies geven over hypotheek, beleggingen en pensioenverzekeringen en is aansprakelijk voor dat advies. Een financieel coach of budgetadviseur heeft die vergunning niet en adviseert over maandbudgetten, uitgavenpatronen en financiële doelen. Een coach is doorgaans goedkoper en voldoende voor mensen die grip willen op hun maandelijkse financiën.",
      },
      {
        vraag: "Kan ik mijn bankadviseur gebruiken voor financieel advies?",
        antwoord: "Bankadviseurs zijn gecertificeerd maar werken voor de bank. Ze adviseren de producten van die bank en worden soms betaald op basis van wat je afsluit. Een onafhankelijk adviseur heeft geen belang bij welk product je kiest en is daardoor transparanter. Vraag altijd hoe een adviseur wordt vergoed.",
      },
      {
        vraag: "Heb ik een financieel adviseur nodig als ik gewoon meer wil overhouden?",
        antwoord: "Nee. Als je vraag is 'waarom is ons geld op?' of 'hoe houden we meer over', heb je geen Wft-gecertificeerde adviseur nodig. Een eenmalig adviesgesprek of de gratis analyse is voldoende om inzicht te krijgen in je maandbudget en concrete doelen te stellen.",
      },
    ],
    externLinks: [
      {
        label: "AFM — gecertificeerde financieel adviseurs zoeken",
        url: "https://www.afm.nl/nl-nl/consumenten/diensten-producten/financieel-advies/adviseurs-vergelijken",
      },
    ],
  },
  {
    slug: "tweede-inkomen-loont-niet-tweeverdieners",
    korteTitel: "Tweede inkomen loont niet: hoe kan dat?",
    titel: "Tweede inkomen loont niet: hoe kan dat?",
    metaTitel: "Tweede inkomen loont niet: hoe kan dat?",
    metaDescription: "Je werkt vier dagen, maar wat blijft er netto over na BSO, reiskosten en belasting? Voor veel tweeverdieners is het antwoord schokkend weinig.",
    datum: "2026-06-06",
    datumFormatted: "6 juni 2026",
    leestijd: "7",
    categorie: "Tweeverdieners",
    excerpt: "Marieke verdient €2.100 bruto (4 dagen). Na BSO, reiskosten en belasting blijft er per maand €-350 over. Terug naar 3 dagen leverde €180 per maand méér op — plus merkbaar minder stress.",
    preview: {
      type: "vergelijking",
      label: "Tweede inkomen Marieke — netto opbrengst",
      items: [
        { naam: "Bruto inkomen", bedrag: 2100, kleur: "#1C3A2A" },
        { naam: "Netto na kosten", bedrag: 0, kleur: "#B03A2E" },
      ],
      noot: "Na BSO, belasting en reiskosten: break-even of negatief",
    },
    faq: [
      {
        vraag: "Waarom loont het tweede inkomen bij tweeverdieners vaak niet?",
        antwoord: "Het tweede inkomen wordt belast in de hoogste schijf (49,5% bij hogere gezinsinkomens), terwijl de kosten van werken — BSO, reiskosten, gemaksuitgaven door tijdgebrek — direct aftrekken van het netto bedrag. De combinatie maakt dat er soms vrijwel niets overblijft.",
      },
      {
        vraag: "Hoeveel kinderopvangtoeslag krijg ik bij een gezinsinkomen van €80.000?",
        antwoord: "Bij een gezinsinkomen van €80.000 bruto is de vergoeding in 2026 circa 46% van de maximale uurprijs (€10,25 voor BSO). Dat betekent circa 54% eigen bijdrage. Op jaarbasis bij één kind en 200 uur per maand: netto kosten circa €8.100.",
      },
      {
        vraag: "Betekent dit dat ik beter kan stoppen met werken?",
        antwoord: "Niet per se. Pensioenopbouw, arbeidsmarktpositie en persoonlijke voldoening spelen ook een rol. Bovendien zijn BSO-kosten tijdelijk — als de kinderen naar groep 5 gaan, kantelt de rekensom volledig. De vraag is of je werkpatroon klopt bij je situatie.",
      },
      {
        vraag: "Helpt minder dagen werken financieel?",
        antwoord: "Soms ja. Als de BSO-kosten met één dag dalen en het inkomensverlies kleiner is dan de kostenbesparing, levert minder werken netto méér op. In de case van Marieke leverde terugschroeven van 4 naar 3 dagen €180 per maand extra op.",
      },
    ],
    externLinks: [
      {
        label: "Belastingdienst — schijventarief inkomstenbelasting 2026",
        url: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/inkomstenbelasting/heffingskortingen_boxen_tarieven/tarieven/",
      },
      {
        label: "Toeslagen.nl — kinderopvangtoeslag berekenen",
        url: "https://www.toeslagen.nl",
      },
    ],
  },
];

export function getArtikel(slug: string): Artikel | undefined {
  return artikelen.find((a) => a.slug === slug);
}
