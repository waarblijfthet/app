// Vijf echte, ingevulde geldscans met advies en evaluatie.
//
// Bron: de vragenlijsten die vijf klanten in juni en juli 2026 hebben ingevuld,
// het advies dat ik erop heb geschreven en hun evaluatie na drie tot vier
// maanden. Zie docs/plan-vijf-geldscans-als-bewijs-30-jul-2026.md.
//
// WERKREGEL 4: dit zijn echte klanten. Namen staan er niet in en alle bedragen
// zijn onveranderd overgenomen. Nooit een bedrag aanpassen, want een geldrapport
// is een optelsom: verander je er één, dan klopt het stuk niet meer en ziet een
// oplettende lezer dat. Nooit een geval toevoegen dat niet echt is.

export interface Post {
  label: string;
  waarde: string;
}

export interface Rapport {
  slug: string;
  chip: string;
  situatie: string;
  profiel: string;
  metaTitel: string;
  metaDescription: string;
  /** Wat ze vooraf zelf dachten, uit hun eigen vragenlijst. */
  vermoeden: string;
  vermoedenBedrag: string;
  /** De uitkomst, in één regel voor de kaart. */
  uitkomstKop: string;
  uitkomst: string;
  /** Deel A van de vragenlijst, de bedragen zoals zij ze aanleverden. */
  inkomsten: Post[];
  lasten: Post[];
  dagelijks: Post[];
  /** Deel B, wat de vergelijking niet weet. */
  context: Post[];
  afschriften: string;
  /** Mijn advies en het plan. */
  adviesInleiding: string;
  plan: string[];
  /** De evaluatie, in hun woorden. */
  doorlooptijd: string;
  evaluatie: string;
  vervolggesprek: boolean;
  vervolggesprekReden: string;
}

export const RAPPORTEN: Rapport[] = [
  {
    slug: "tweeverdieners-drie-kinderen",
    chip: "Gezin met kinderen",
    situatie: "Tweeverdieners, drie kinderen, koopwoning",
    profiel: "Twee inkomens, drie kinderen van 9, 12 en 14, koopwoning, twee eigen auto's.",
    metaTitel: "Echt geldrapport: tweeverdieners met drie kinderen",
    metaDescription:
      "Een echt geldrapport van een gezin met drie kinderen en twee inkomens. Zij dachten boodschappen en kinderen. Er bleek geen enkele buitensporige vaste last te zijn.",
    vermoeden:
      "Ik denk vooral boodschappen en de kinderen. Mijn partner denkt juist aan alle losse uitgaven.",
    vermoedenBedrag: "Zij misten naar eigen schatting 500 tot 750 euro per maand.",
    uitkomstKop: "Geen enkele buitensporige vaste last",
    uitkomst:
      "Het probleem zat in de combinatie van veel vrij besteedbare uitgaven, bijna 1.000 euro per maand aan voorspelbare jaaruitgaven, en sparen zonder die jaaruitgaven eerst te reserveren.",
    inkomsten: [
      { label: "Nettosalaris 1", waarde: "€4.050 per maand, vakantiegeld niet inbegrepen" },
      { label: "Nettosalaris 2", waarde: "€3.250 per maand, plus een jaarlijkse dertiende maand" },
      { label: "Kinderbijslag", waarde: "circa €310 per maand" },
      { label: "Hypotheekrenteaftrek", waarde: "€270 per maand via voorlopige teruggave" },
    ],
    lasten: [
      { label: "Hypotheek", waarde: "€1.860" },
      { label: "Energie", waarde: "€245" },
      { label: "Internet en tv", waarde: "€72" },
      { label: "Gemeentelijke lasten en waterschap", waarde: "€1.440 per jaar, circa €120 per maand" },
      { label: "Twee auto's", waarde: "brandstof €410, verzekeringen en wegenbelasting €285" },
      { label: "Zorgverzekering", waarde: "€326 totaal" },
      { label: "Overige verzekeringen", waarde: "€118" },
    ],
    dagelijks: [
      { label: "Boodschappen", waarde: "geschat €1.150, inclusief bestellen en losse supermarktbezoeken" },
      { label: "Abonnementen", waarde: "€165" },
      { label: "Kinderen", waarde: "€540 voor school, sport, hobby's en zakgeld, kleding niet volledig" },
      { label: "Vrije tijd", waarde: "geschat €720" },
      { label: "Jaarlijkse kosten", waarde: "circa €11.600 per jaar: vakantie €6.000, feestdagen €2.000, huis en tuin €2.400, overige €1.200" },
      { label: "Spaardoel", waarde: "€1.000 per maand, maar er ging regelmatig geld terug van de spaarrekening" },
    ],
    context: [
      { label: "Kinderen", waarde: "9, 12 en 14 jaar, zeven dagen per week thuis, geen alimentatie. Vooral de oudste wordt duidelijk duurder." },
      { label: "Hier moet ik van afblijven", waarde: "het huis, de sporten van de kinderen, één goede zomervakantie en de twee auto's" },
      { label: "Komt dit jaar aan", waarde: "zomervakantie €4.500, voorjaarsvakantie €1.500, fiets €900, woningonderhoud €2.000 tot €3.000, december €1.000. Hiervoor werd niet apart gereserveerd." },
      { label: "Doel", waarde: "€1.250 per maand structureel. Circa €18.000 spaargeld, eerst naar €30.000 buffer." },
      { label: "Wat er veranderde zonder dat de financiën meeveranderden", waarde: "het inkomen steeg, de kinderen werden duurder en ze gingen groter wonen. Er kwamen nooit aparte potten voor vakantie, onderhoud, kleding of feestdagen." },
    ],
    afschriften:
      "Ja, drie volledige maanden. Tijdens het invullen bleek dat de schattingen voor boodschappen, vrije tijd en losse aankopen te onzeker waren. Rekeningnummers, namen van anderen en enkele privébetalingen waren weggestreept.",
    adviesInleiding:
      "De cijfers wijzen niet op één buitensporige vaste last. De hypotheek en twee auto's zijn stevige posten, maar dat zijn bewuste keuzes. Het grootste probleem zit in de combinatie van veel vrij besteedbare uitgaven, bijna 1.000 euro per maand aan voorspelbare jaaruitgaven en sparen zonder die jaaruitgaven eerst te reserveren.",
    plan: [
      "Reserveer eerst €975 per maand voor vakantie, huis en onderhoud, feestdagen en verjaardagen en andere grotere kosten.",
      "Maak daarnaast een echte bufferpot die niet voor voorspelbare uitgaven wordt gebruikt.",
      "Zet voorlopig €750 per maand apart als echte vermogensopbouw. Verhoog pas als dat drie maanden blijft staan.",
      "Geef vrije tijd en losse gezinsuitgaven samen een maandplafond. Niet omdat één uitgave fout is, maar omdat de optelsom nu onzichtbaar blijft.",
      "Bekijk na drie maanden opnieuw de afschriften. Boodschappen en kinderen hoeven niet vooraf omlaag.",
    ],
    doorlooptijd: "na drie maanden",
    evaluatie:
      "We reserveren nu automatisch voor vakantie, onderhoud en december. De spaarrekening zakt daardoor niet meer terug zodra er een grotere rekening komt. Gemiddeld bleef ongeveer €850 per maand echt staan, naast de reserveringen voor jaaruitgaven. Vooral mijn partner bleek gelijk te hebben: er was niet één groot lek, maar veel losse bedragen.",
    vervolggesprek: false,
    vervolggesprekReden:
      "Het rapport gaf genoeg richting om eerst zelf drie tot zes maanden met de nieuwe structuur te werken.",
  },
  {
    slug: "alleenstaande-ouder-twee-kinderen",
    chip: "Alleenstaande ouder",
    situatie: "Alleenstaande ouder, twee kinderen, koopwoning",
    profiel: "Eén inkomen, kinderen van 7 en 11 die 80 procent van de tijd bij haar wonen, koopwoning, één auto.",
    metaTitel: "Echt geldrapport: alleenstaande ouder met twee kinderen",
    metaDescription:
      "Een echt geldrapport van een alleenstaande ouder met twee kinderen. Haar gevoel van krapte bleek deels logisch. De buffer groeit nu met 500 euro per maand, zonder bezuinigingen.",
    vermoeden:
      "Ik vermoed dat mijn vaste basis duur is voor één inkomen. Daarnaast geef ik mogelijk nog uit alsof er soms twee inkomens zijn.",
    vermoedenBedrag: "Zij miste naar eigen schatting 400 tot 500 euro per maand.",
    uitkomstKop: "Je gevoel van krapte is deels logisch",
    uitkomst:
      "Met één inkomen een koopwoning, auto en twee kinderen dragen is zwaar. De oplossing was niet minder uitgeven, maar de structuur eindelijk aanpassen aan het feit dat zij sinds de scheiding de enige financiële achtervang is.",
    inkomsten: [
      { label: "Nettosalaris", waarde: "€4.850 per maand, vakantiegeld niet inbegrepen" },
      { label: "Kinderbijslag", waarde: "circa €195 per maand" },
      { label: "Kinderalimentatie", waarde: "€420 per maand ontvangen" },
      { label: "Hypotheekrenteaftrek", waarde: "€235 per maand" },
    ],
    lasten: [
      { label: "Hypotheek", waarde: "€1.690" },
      { label: "Energie", waarde: "€220" },
      { label: "Internet en tv", waarde: "€64" },
      { label: "Gemeentelijke lasten en waterschap", waarde: "€1.260 per jaar, circa €105 per maand" },
      { label: "Eigen auto", waarde: "brandstof €240, verzekering en wegenbelasting €128" },
      { label: "Zorgverzekering", waarde: "€168" },
      { label: "Overige verzekeringen", waarde: "€96" },
    ],
    dagelijks: [
      { label: "Boodschappen", waarde: "€790, inclusief bestellen" },
      { label: "Abonnementen", waarde: "€132" },
      { label: "Kinderen", waarde: "€410" },
      { label: "Vrije tijd", waarde: "€430" },
      { label: "Jaarlijkse kosten", waarde: "circa €8.900 per jaar: vakantie €3.500, feestdagen €1.500, woningonderhoud €2.400, auto €900, overige €600" },
      { label: "Spaardoel", waarde: "€750 per maand, maar bij grotere kosten haalde zij daar regelmatig geld terug" },
    ],
    context: [
      { label: "Kinderen", waarde: "7 en 11 jaar, ongeveer 80 procent van de tijd bij haar. €420 kinderalimentatie. Vakanties en grotere schoolkosten worden soms apart verdeeld met haar ex." },
      { label: "Hier moet ik van afblijven", waarde: "het huis, de sporten van de kinderen en de auto" },
      { label: "Komt dit jaar aan", waarde: "zomervakantie €3.000, cv en woningonderhoud circa €2.000, mogelijk een laptop voor de oudste €700, december en verjaardagen circa €1.500" },
      { label: "Doel", waarde: "€800 per maand structureel. Buffer van circa €12.000 naar €20.000, omdat zij onverwachte kosten alleen moet kunnen opvangen." },
      { label: "Wat er veranderde zonder dat de financiën meeveranderden", waarde: "de scheiding, drie jaar eerder. Huis, kinderen en betalingen konden doorgaan, maar het financiële systeem is daarna nooit vanaf nul opnieuw opgebouwd." },
    ],
    afschriften:
      "Ja, twee recente volledige maanden. Zij wilde juist laten controleren of haar vaste basis echt het probleem was, of haar dagelijkse uitgaven meer ruimte opslokten dan zij dacht. Namen van haar ex en kinderen, rekeningnummers en betalingen die over anderen gaan waren weggestreept.",
    adviesInleiding:
      "Je gevoel van krapte is deels logisch. Je draagt met één inkomen een koopwoning, auto en twee kinderen. De oplossing is niet om je leven te behandelen alsof je te veel uitgeeft. Wel is de structuur nog onvoldoende aangepast aan het feit dat je sinds de scheiding alleen de financiële achtervang bent.",
    plan: [
      "Reserveer ongeveer €740 per maand voor woningonderhoud, auto, vakantie, verjaardagen en december.",
      "Houd daarnaast een noodbuffer die nergens anders voor wordt gebruikt. Eerste doel: €20.000.",
      "Automatiseer €500 per maand naar die buffer. Het oude spaardoel van €750 was te hoog zolang jaaruitgaven uit dezelfde pot kwamen.",
      "Laat huis, auto en de sporten van de kinderen ongemoeid.",
      "Houd drie maanden boodschappen, vrije tijd en losse kinderkosten bij om te zien of daar nog €100 tot €200 structurele ruimte zit.",
    ],
    doorlooptijd: "na drie maanden",
    evaluatie:
      "Mijn financiële situatie voelt vooral voorspelbaarder. Huis, auto, vakantie en december hebben nu eigen reserveringen. Mijn echte buffer groeit met €500 per maand. Dat is minder dan de €750 die ik vroeger probeerde te sparen, maar het geld blijft nu daadwerkelijk staan. Ik heb geen grote bezuinigingen gedaan.",
    vervolggesprek: true,
    vervolggesprekReden:
      "Zij wilde na haar scheiding toetsen of de nieuwe verdeling tussen buffer, jaarpotten en maandgeld logisch was. Dat gesprek ging over zekerheid, niet over goedkoper leven.",
  },
  {
    slug: "alleenstaand-huurwoning",
    chip: "Alleenstaand",
    situatie: "Alleenstaand, begin 30, huurwoning",
    profiel: "Eén inkomen, geen kinderen, huurappartement, één eigen auto.",
    metaTitel: "Echt geldrapport: alleenstaand met een goed salaris",
    metaDescription:
      "Een echt geldrapport van iemand die alleen woont met 3.650 euro netto. Het verschil tussen wat zij dacht uit te geven en wat er werkelijk wegging was ruim 250 euro per maand.",
    vermoeden: "Eten bestellen, uitgaan en online aankopen.",
    vermoedenBedrag: "Zij miste naar eigen schatting 300 tot 400 euro per maand.",
    uitkomstKop: "Het vermoeden was juist, maar 250 euro groter dan gedacht",
    uitkomst:
      "De vaste basis is relatief zwaar voor één persoon, vooral wonen en auto. Maar dat zijn bewuste keuzes. Het grootste verschil zat tussen wat zij dacht uit te geven en wat er werkelijk naar variabele uitgaven en jaaruitgaven ging.",
    inkomsten: [
      { label: "Nettosalaris", waarde: "€3.650 per maand, vakantiegeld niet inbegrepen, geen dertiende maand" },
      { label: "Toeslagen", waarde: "geen" },
    ],
    lasten: [
      { label: "Huur", waarde: "€1.285" },
      { label: "Energie", waarde: "€145" },
      { label: "Internet en tv", waarde: "€52" },
      { label: "Servicekosten", waarde: "€85" },
      { label: "Gemeentelijke lasten en waterschap", waarde: "€720 per jaar, circa €60 per maand" },
      { label: "Eigen auto", waarde: "brandstof €180, verzekering en wegenbelasting €112" },
      { label: "Zorgverzekering", waarde: "€162" },
      { label: "Overige verzekeringen", waarde: "€36" },
    ],
    dagelijks: [
      { label: "Boodschappen", waarde: "geschat €475, inclusief bestellen" },
      { label: "Abonnementen", waarde: "€119" },
      { label: "Vrije tijd", waarde: "geschat €525" },
      { label: "Jaarlijkse kosten", waarde: "circa €6.000 per jaar: vakanties €3.600, verjaardagen en feestdagen €900, auto en onderhoud €900, overige €600" },
      { label: "Spaardoel", waarde: "€500 per maand, maar het spaargeld groeide meestal €100 tot €250" },
    ],
    context: [
      { label: "Hier moet ik van afblijven", waarde: "het appartement, de sportschool en voorlopig ook de auto" },
      { label: "Komt dit jaar aan", waarde: "zomervakantie €2.500, citytrip €700, auto-onderhoud en banden circa €800, een bruiloft ongeveer €500" },
      { label: "Doel", waarde: "minimaal €600 per maand. Buffer van circa €8.500 naar €15.000, daarna sparen voor een koopwoning." },
      { label: "Wat er veranderde zonder dat de financiën meeveranderden", waarde: "het salaris steeg in drie jaar flink, maar de uitgaven stegen mee. Er is nooit een financieel systeem ingericht, er werd vooral naar het saldo gekeken." },
    ],
    afschriften:
      "Ja, de laatste drie maanden. Tijdens het invullen merkte zij dat ze nauwelijks wist wat ze werkelijk aan boodschappen, bestellen, uitgaan en online aankopen uitgaf. Namen, rekeningnummers en een paar persoonlijke omschrijvingen waren weggestreept.",
    adviesInleiding:
      "Je vaste basis is relatief zwaar voor één persoon, vooral wonen en auto. Omdat appartement, sport en auto bewuste keuzes zijn, sturen we daar niet direct op. Het grootste verschil zit tussen wat je denkt uit te geven en wat werkelijk naar variabele uitgaven en jaaruitgaven gaat.",
    plan: [
      "Reserveer €500 per maand voor vakantie, auto, verjaardagen en andere jaaruitgaven.",
      "Maak daarnaast direct na salaris €400 over naar een echte buffer.",
      "Gebruik één apart maandbudget voor bestellen, horeca, online aankopen en overige vrije uitgaven.",
      "Stuur niet obsessief op boodschappen. Kijk eerst naar het totaal van de vrije categorie.",
      "Zodra de buffer €15.000 bereikt, kan de €400 doorschuiven naar het koopwoningdoel.",
    ],
    doorlooptijd: "na drie maanden",
    evaluatie:
      "Het bleek dat eten bestellen, drankjes, kleding en kleine online aankopen samen ruim €250 per maand hoger lagen dan ik dacht. Ik reserveer nu €500 voor jaarlijkse kosten en €400 voor mijn buffer. Mijn buffer groeide in drie maanden met ongeveer €1.200, zonder dat een vakantie of autorekening daar weer vanaf hoefde.",
    vervolggesprek: true,
    vervolggesprekReden:
      "Omdat zij alleen woont wilde ze één keer samen een simpele structuur neerzetten en daarna zelfstandig verder.",
  },
  {
    slug: "stel-zonder-kinderen",
    chip: "Stel zonder kinderen",
    situatie: "Stel eind 30, geen kinderen, koopappartement",
    profiel: "Twee inkomens, geen kinderen, koopappartement, geen auto.",
    metaTitel: "Echt geldrapport: stel zonder kinderen, twee goede inkomens",
    metaDescription:
      "Een echt geldrapport van een stel met 6.800 euro netto en geen kinderen. De uitkomst was dat er geen lek was: hun levensstijl botste met hun spaardoel.",
    vermoeden:
      "We denken dat we te makkelijk geld uitgeven, maar niet dat één categorie extreem is.",
    vermoedenBedrag: "Zij misten naar eigen schatting 700 tot 900 euro per maand.",
    uitkomstKop: "Er is geen lek",
    uitkomst:
      "Hun uitgaven passen niet bij het spaardoel dat zij tegelijkertijd nastreefden. Reizen, horeca en vrije tijd zijn bewuste keuzes die mogen blijven, maar die rechtstreeks concurreren met 40.000 euro eigen geld binnen drie jaar.",
    inkomsten: [
      { label: "Nettosalaris 1", waarde: "€3.750 per maand, vakantiegeld niet inbegrepen" },
      { label: "Nettosalaris 2", waarde: "€3.050 per maand, vakantiegeld niet inbegrepen" },
      { label: "Hypotheekrenteaftrek", waarde: "€190 per maand" },
    ],
    lasten: [
      { label: "Hypotheek", waarde: "€1.720" },
      { label: "Energie", waarde: "€165" },
      { label: "Internet en tv", waarde: "€58" },
      { label: "VvE", waarde: "€235" },
      { label: "Gemeentelijke lasten en waterschap", waarde: "€1.080 per jaar, circa €90 per maand" },
      { label: "Ov", waarde: "samen circa €210" },
      { label: "Zorgverzekering", waarde: "€324 totaal" },
      { label: "Overige verzekeringen", waarde: "€72" },
    ],
    dagelijks: [
      { label: "Boodschappen", waarde: "€690, inclusief bezorgen en bestellen" },
      { label: "Abonnementen", waarde: "€155" },
      { label: "Vrije tijd", waarde: "circa €1.050 voor horeca, sport, hobby's, concerten en weekendjes" },
      { label: "Jaarlijkse kosten", waarde: "circa €10.200 per jaar: reizen €7.200, feestdagen €1.200, woning en overig €1.800" },
      { label: "Spaardoel", waarde: "€1.500 per maand, terwijl het spaargeld gemiddeld €600 tot €800 groeide" },
    ],
    context: [
      { label: "Hier moet ik van afblijven", waarde: "het appartement, de sporten en reizen. Minder vaak reizen is bespreekbaar, reizen zelf schrappen niet." },
      { label: "Komt dit jaar aan", waarde: "grote reis €4.500, twee korte trips samen €2.500, meubels circa €2.000, bruiloften en verjaardagen ongeveer €1.500" },
      { label: "Doel", waarde: "€1.500 per maand. Over drie jaar €40.000 extra eigen geld om eventueel groter te wonen." },
      { label: "Wat er veranderde zonder dat de financiën meeveranderden", waarde: "de inkomens stegen sterk. Er werd vaker gereisd, uit eten gegaan en spontaan iets gedaan, zonder opnieuw te bepalen hoeveel levensstijl zij eigenlijk wilden betalen." },
    ],
    afschriften:
      "Nee. De bedragen kwamen uit hun gezamenlijke rekening en bankapp en waren voldoende precies. Bij een onverklaard verschil zouden zij de afschriften alsnog sturen.",
    adviesInleiding:
      "Er is geen duidelijk financieel lek. Jullie uitgaven passen vooral niet bij het spaardoel dat jullie tegelijkertijd nastreven. Reizen, horeca en vrije tijd zijn bewuste keuzes. Die mogen blijven, maar concurreren rechtstreeks met de wens om binnen drie jaar €40.000 extra eigen geld op te bouwen.",
    plan: [
      "Kies samen wat leidend is: de huidige levensstijl of €40.000 extra eigen geld binnen drie jaar.",
      "Voor €40.000 in 36 maanden is ongeveer €1.110 per maand nodig. Automatiseer dat bedrag direct na salaris.",
      "Reserveer daarnaast ongeveer €850 per maand voor bekende jaarlijkse reizen en grotere uitgaven.",
      "Wat daarna beschikbaar blijft is het vrije maandbudget. Geen noodzaak om iedere categorie afzonderlijk te micromanagen.",
      "Bespreek ieder kwartaal of het doel nog belangrijk genoeg is voor de bijbehorende beperking in levensstijl.",
    ],
    doorlooptijd: "na drie maanden",
    evaluatie:
      "De belangrijkste verandering was dat we zijn gestopt met zoeken naar iets dat financieel mis zou zijn. We gaven ons geld grotendeels uit aan dingen die we belangrijk vinden. We zetten nu automatisch €1.100 per maand apart voor het woondoel. Reizen blijft belangrijk, maar we hebben één korte trip geschrapt en betalen reizen uit een aparte pot.",
    vervolggesprek: false,
    vervolggesprekReden: "Het rapport maakte vooral duidelijk welke keuze zij moesten maken.",
  },
  {
    slug: "zzp-wisselend-inkomen",
    chip: "Zzp of wisselend inkomen",
    situatie: "Zzp'er met partner in loondienst, wisselend inkomen, koopwoning",
    profiel: "Een zzp-inkomen dat per maand sterk verschilt, een partner in loondienst, koopwoning, geen kinderen.",
    metaTitel: "Echt geldrapport: zzp'er met een sterk wisselend inkomen",
    metaDescription:
      "Een echt geldrapport van een zzp'er met maanden tussen 2.400 en 8.100 euro. Er was geen privélek: een grillig inkomen werd behandeld als een vast salaris.",
    vermoeden:
      "Ik dacht eerst dat we privé te veel uitgeven. Ik vermoed nu dat ik goede maanden als normaal behandel.",
    vermoedenBedrag: "Hij miste naar eigen schatting 700 euro per maand.",
    uitkomstKop: "Geen privélek, maar een cashflowprobleem",
    uitkomst:
      "Op gemiddelde basis ziet het huishouden er ruim genoeg uit. Het probleem ontstond doordat een gemiddeld zzp-inkomen werd behandeld alsof het een vast salaris is. Een maand met 8.100 euro en een maand met 2.400 euro middelen elkaar op papier uit, maar niet in gedrag.",
    inkomsten: [
      { label: "Eigen inkomen", waarde: "gemiddeld €4.600 netto per maand beschikbaar voor privé over de laatste 12 maanden, na belastingreservering" },
      { label: "Nettosalaris partner", waarde: "€3.150 per maand, vakantiegeld niet inbegrepen" },
      { label: "Hypotheekrenteaftrek", waarde: "€245 per maand" },
      { label: "Spreiding", waarde: "laagste maand circa €2.400, hoogste €8.100. Standaard 35 procent gereserveerd voor belasting." },
    ],
    lasten: [
      { label: "Hypotheek", waarde: "€1.950" },
      { label: "Energie", waarde: "€230" },
      { label: "Internet en tv", waarde: "€65" },
      { label: "Gemeentelijke lasten en waterschap", waarde: "€1.380 per jaar, circa €115 per maand" },
      { label: "Zakelijke auto", waarde: "geen eigen bijdrage, bijtelling zit in het netto privébedrag" },
      { label: "Auto partner", waarde: "brandstof €150, verzekering en wegenbelasting €105" },
      { label: "Zorgverzekering", waarde: "€330 totaal" },
      { label: "Overige verzekeringen", waarde: "€105" },
    ],
    dagelijks: [
      { label: "Boodschappen", waarde: "€720, inclusief bestellen" },
      { label: "Abonnementen", waarde: "€175" },
      { label: "Vrije tijd", waarde: "€850" },
      { label: "Jaarlijkse kosten", waarde: "circa €10.400 per jaar: vakanties €6.000, feestdagen €1.200, woning €2.000, overige €1.200" },
      { label: "Spaardoel", waarde: "privé €1.250 per maand. Dat lukte in goede maanden makkelijk en in slechte maanden niet." },
    ],
    context: [
      { label: "Hier moet ik van afblijven", waarde: "het huis, de jaarlijkse grote vakantie en de zakelijke auto. Zakelijke belastingreserveringen zijn geen beschikbare buffer." },
      { label: "Komt dit jaar aan", waarde: "vakantie circa €5.000, woningonderhoud €2.500, mogelijk vervanging van de privéauto en een zakelijke opleiding van circa €3.000 uit het bedrijf" },
      { label: "Doel", waarde: "privé minimaal €1.250 per maand structureel, zakelijk zes maanden vaste bedrijfskosten als buffer, en privé binnen twee jaar circa €30.000 voor een verbouwing." },
      { label: "Wat er veranderde zonder dat de financiën meeveranderden", waarde: "het bedrijf groeide. Het inkomen werd hoger maar grilliger, en privé werd geleefd op basis van het gemiddelde, terwijl dat gemiddelde nooit iedere maand binnenkomt." },
    ],
    afschriften:
      "Nee. De privébedragen kwamen uit de gezamenlijke rekening en bankapp. Voor het eigen inkomen zijn de werkelijke netto bedragen gebruikt die de afgelopen twaalf maanden voor privé beschikbaar waren. De zakelijke rekening is niet meegestuurd.",
    adviesInleiding:
      "Op gemiddelde basis ziet jullie huishouden er ruim genoeg uit. Het probleem ontstaat doordat een gemiddeld zzp-inkomen wordt behandeld alsof het een vast salaris is. Een maand met €8.100 en een maand met €2.400 middelen elkaar op papier uit, maar niet in jullie gedrag. De kern is cashflow, niet primair privébezuiniging.",
    plan: [
      "Bepaal een vast privébedrag vanuit de onderneming op basis van een conservatieve ondergrens, bijvoorbeeld €3.500 netto per maand.",
      "Laat sterke zakelijke maanden eerst de zakelijke buffer aanvullen. Alleen geld boven die grens kan naar extra privédoelen.",
      "Houd belastingreservering volledig buiten privébudget en zakelijke noodbuffer.",
      "Reserveer privé circa €870 per maand voor vakantie, woning en andere jaaruitgaven.",
      "Stort extra geld uit sterke kwartalen naar de verbouwingspot in plaats van de levensstijl tijdelijk te verhogen.",
      "Evalueer per kwartaal in plaats van per maand.",
    ],
    doorlooptijd: "na vier maanden",
    evaluatie:
      "Ik betaal mezelf nu iedere maand hetzelfde privébedrag. Goede maanden blijven eerst in de onderneming totdat de zakelijke buffer op niveau is. Privé voelt daardoor soms krapper in een goede maand, maar slechte maanden veroorzaken veel minder stress en we hoeven minder uit buffers terug te halen. Zowel de zakelijke buffer als de privé-reserveringen stonden hoger.",
    vervolggesprek: true,
    vervolggesprekReden:
      "Zij wilden de grens tussen zakelijke buffer, belastingreservering, privébuffer en verbouwingspot goed structureren. Voor fiscale keuzes blijft de accountant leidend.",
  },
];

export function rapportVoorSlug(slug: string): Rapport | undefined {
  return RAPPORTEN.find((r) => r.slug === slug);
}

/** Hoeveel van de rapporten eindigden zonder dat er iets te repareren viel. */
export const AANTAL_ZONDER_LEK = 2;
/** Hoeveel er geen vervolggesprek nodig hadden. */
export const AANTAL_ZONDER_VERVOLG = RAPPORTEN.filter((r) => !r.vervolggesprek).length;
