# Kritische analyse en plan van aanpak, 18 juli 2026

Aanleiding: GSC laat na 3 maanden een stijgende lijn zien (impressies richting 400 tot 750 per dag, clicks 4 tot 11 per dag), maar al het verkeer komt binnen op boodschappen- en salaris-artikelen en niemand klikt door naar het aanbod. Jarno's vraag: ben ik te ongeduldig, of missen we de doelgroep? Wees kritisch, ook op aanbod en messaging.

Onderbouwing: twee onderzoeksrondes op 18 juli (zoekintentie-onderzoek via Google NL autocomplete, SERP-checks en forums; concurrentie-onderzoek over 10+ NL aanbieders), de GSC-cijfers, en een code-check van wat er van de eerdere plannen daadwerkelijk gebouwd is. SE Ranking connector was ook deze sessie niet geautoriseerd, dus volumes blijven kwalitatief. Autoriseer die connector, dan kan de volgende ronde met echte cijfers.

## 1. Het eerlijke antwoord: het is allebei, maar niet fifty-fifty

**Je bent deels te ongeduldig.** De rekensom: de top 5 pagina's deden samen ~76 clicks in 3 maanden. De branchevuistregel (staat al in het growth plan van 8 juli) is dat informatieverkeer 0,1 tot 0,5 procent direct converteert naar iets betaalds. Bij ~100 bezoekers is de verwachte opbrengst dus nul komma nul gesprekken. Dat er niets converteert is geen bewijs dat er iets kapot is; de steekproef is gewoon te klein. De impressies verdubbelen bovendien ruwweg per maand en het domein is jong. Een eerlijk oordeel over SEO kan pas rond oktober.

**Maar er zit ook een structureel probleem onder, en dat is groter dan geduld.** Drie lagen:

1. **Dit verkeer gaat nooit converteren, hoeveel het ook wordt.** De bezoeker op "wat is een normaal bedrag boodschappen" is Petra (de zoeker): ze wil een getal, valideert zichzelf, en is weg. Dat is per definitie zo bij benchmark-keywords. Meer van dit verkeer = meer Petra, niet meer Sandra of Niels. Het verkeer is niet waardeloos, maar het converteert alleen via een tussenstap (e-mail), en die tussenstap ontbreekt in de praktijk (zie punt 3).
2. **De doelgroep googlet zijn probleem nauwelijks.** Dit is de hardste bevinding van het onderzoek. De letterlijke frase "ik verdien goed maar hou niets over" heeft nul autocomplete-suggesties: dat is spreektaal, geen zoektaal. Wat wel bestaat als echte zoekopdracht: "waarom kan ik niet sparen", "help ik kan niet sparen", "ik hou geen geld over", "waar blijft mijn geld", "rondkomen van 4000 euro per maand". Reëel, maar klein: tientallen tot lage honderden bezoekers per maand als je alles wint. De sterkste vindplaats van de doelgroep is niet Google maar fora: een thread van 23 pagina's op ouders.nl heet letterlijk "Modaal gezin; waar blijft mijn geld". De doelgroep bestaat dus aantoonbaar, praat er ook over, maar zoekt lotgenoten en herkenning, geen dienstverlener. Activatie gebeurt via een emotioneel moment (ruzie over geld, onverwachte rekening, artikel in de media), en dan via mond-tot-mond, verwijzers of een bekend gezicht.
3. **De uitvoering loopt achter op de plannen.** Er liggen inmiddels drie goede plannen in docs/ die grotendeels dezelfde diagnose stellen (intent-mismatch, ontbrekende tussenstap). Maar bij de code-check van vandaag blijkt: het BenchmarkMail-blok (gebouwd 8 juli, exact de bedoelde tussenstap) is **nooit in een artikel geplaatst**, het component wordt nergens geïmporteerd. De e-mailflow na de analyse (dag 0/2/5) is niet gebouwd. Cluster C (spaargeld, vaste lasten benchmark) en D (rondkomen-serie) uit het SEO-plan: niet gebouwd. De download/het budgetsjabloon (E2): niet gebouwd. Diverse SQL-scripts en de Resend SPF/DKIM-check staan mogelijk nog open. Het probleem is dus minder "verkeerde strategie" en meer "de conversielaag van de strategie is blijven liggen terwijl de contentlaag doorgroeide".

Kort gezegd: het verkeer groeit zoals gepland, de vangnetten eronder hangen er niet. Elke week wachten met de vangnetten is verkeer weggooien; elke week twijfelen aan de contentstrategie is te vroeg.

## 2. Wat het onderzoek zegt over de kanalenmix (kritisch)

Hoe komen vergelijkbare NL aanbieders echt aan klanten:

- **Budgetbuddy (Carolien Vos)**, de directste concurrent, draait op personal brand en media: AD-column, eigen podcast, NRC/FD-logo's, webinar-funnel naar een traject van 1.997 euro. Haar Instagram is klein (~1.500 volgers); het is de pers en de podcast, niet social.
- **Budgetcoach.nl** (marktleider op de dienst-keywords) draait op werkgevers: 300+ organisaties, verzuim-argument. **Prikkl** idem, via werkgevers en pensioenfondsen. Het grootste volume in deze branche loopt via betalende derden, niet via de consument die zelf pint.
- **Hanneke van Onna en PorteRenee**: media, boeken, PR. De site is overal de fuik, niet de vijver.
- De dienst-keywords zelf ("financieel coach", "budgetcoach", "geldcoach") blijken bij autocomplete-analyse vervuild: het volume bestaat grotendeels uit vacaturezoekers (ING heeft "financieel coach" als functietitel), mensen die coach willen worden, en het gemeentelijke schuldhulp-circuit. Cluster A was de juiste zet, maar méér bouwen in dat cluster heeft afnemend rendement.

Positief, en niet zelffelicitatie maar bevestigd door de teardowns: de positionering zelf is goed. De loondienst-goedverdiener (Sandra/Niels) is vrijwel onbediend (Carolien praat tegen ondernemers, budgetcoaches tegen probleemgevallen, Elfin tegen vrouwen). En **niemand in de markt heeft een betaald instapproduct onder de 272 euro**; de geldscan van 49 euro is letterlijk uniek. Het aanbod hoeft dus niet om; de weg ernaartoe wel.

Conclusie kanalenmix: SEO is voor deze site het geloofwaardigheids- en vangnetkanaal, niet het groeikanaal. De groeikanalen die passen bij hoe deze markt werkt: (1) verwijzers (de outreach-machine die er al staat), (2) PR/media (er ligt nu een actueel haakje: het Nibud-rapport 2026 over geldzorgen bij hogere inkomens en huizenbezitters haalde De Telegraaf), (3) later werkgevers (geblokkeerd tot de KvK-inschrijving er is).

## 3. Plan van aanpak

### Fase 0, deze week: dicht de lekken op het verkeer dat er al is

Volgorde van meest naar minst renderend per uur werk:

1. **BenchmarkMail plaatsen.** Het blok bestaat, het werkt, het staat nergens. Mount het in het boodschappen-artikel (36 clicks, 3.015 impressies) en maak varianten voor de nummers 2 en 3 (is-4000-netto en netto-loonsverhoging: een bruto-netto-overzichtskaart per mail, zelfde patroon). Dit is de enige manier om Petra-verkeer iets waard te maken: het antwoord geven, en dan één lichte vervolgstap per e-mail.
2. **Verifieer de mailketen end-to-end.** Doe een echte testanalyse met een extern adres en controleer of de resultaatmail aankomt (SPF/DKIM-status Resend). Zolang dit niet zeker werkt, lekt elke lead weg. Check ook of de open SQL-scripts (outreach_followup, prospect_zoeker, quiz_voortgang_v2, intake_analyse_link) gedraaid zijn.
3. **E-mailflow na de analyse bouwen** (dag 0 resultaat, dag 2 grootste afwijking, dag 5 geldscan/gesprek-uitnodiging). Stond al op prioriteit 2, wordt nu de motor achter punt 1: elke benchmark-mail en elk analyse-resultaat voedt dezelfde flow.
4. **GSC-check op cluster A.** /financieel-coach en de twee kosten-artikelen staan niet in de top-pagina's. Controleer indexering, dien opnieuw in, en check de posities. Dit zijn de enige pagina's die direct gesprekken kunnen opleveren.

### Fase 1, week 2 tot 4: bouw de brug tussen "getal zoeken" en "hulp willen"

5. **Eén artikel dat de zoektaal van het probleem pakt: "Waarom kan ik niet sparen (terwijl ik goed verdien)?"** Dit is de best gevalideerde probleem-query uit het onderzoek ("waarom kan ik niet sparen", "help ik kan niet sparen", "sparen lukt niet"). Er bestaat al "waarom-lukt-sparen-niet"; versterk of herbouw dat op deze exacte intentie en maak het het meest persoonlijke stuk van de site (echte cijfers, Jarno's eigen verhaal, geldscan-CTA). Belangrijk: budgetbuddy en hannekevanonna publiceerden recent op precies deze vraag; zij geloven dus ook dat dit dé vindbare formulering is.
6. **Benchmark-cluster afmaken (cluster C), want dit model werkt aantoonbaar**: "hoeveel spaargeld is normaal" (per leeftijd), "gemiddelde uitgaven per maand per huishoudtype", upgrade van het vaste-lasten-artikel. Elk volgens het boodschappen-model, elk mét het mail-blok vanaf dag één. Doel is niet conversie op de pagina, maar lijstgroei.
7. **Rondkomen-serie, maar begin bovenaan: 3000 en 4000 euro.** Autocomplete bevestigt dat "rondkomen van 4000 euro per maand" bestaat. De hogere bedragen zijn de ICP-filter; 1800/2000 trekt het verkeerde publiek.
8. **Herkenning-sectie in de top-artikelen.** De doelgroep zoekt lotgenoten (vandaar "ik kan niet sparen forum"). Geef ze dat: een blok in de stijl van de ouders.nl-thread ("Iedereen die ik ken vindt van zichzelf dat hij geen gekke dingen doet en toch te weinig overhoudt") met de boodschap: je bent normaal, en toch klopt er iets niet, en dat is te vinden. Dat is de emotionele brug van validatie naar actie, en het is precies de merkbelofte.

### Fase 2, doorlopend: de kanalen waar deze markt echt op draait

9. **Outreach op volume houden**: 10 tot 20 mails per dag, follow-ups via de knoppen, replies als metric. Dit spiegelt exact hoe budgetcoach.nl groot werd (verwijzers). De relatietherapeuten en burn-out-coaches zitten letterlijk naast het activatiemoment van de doelgroep.
10. **PR-experiment op het Nibud-momentum.** Het Nibud-rapport 2026 (geldzorgen bij hogere inkomens en huizenbezitters) is landelijk nieuws geweest en is exact de doelgroep. Pitch als reactie-expert bij AD/Telegraaf-geldredacties en 2 à 3 NL geldpodcasts: "de goedverdiener die niets overhoudt is geen budgetprobleem maar een structuurprobleem, ik zie het dagelijks". Eén plaatsing doet meer dan tien artikelen en bouwt de merkzoekvraag die de site daarna vangt. Kosten: alleen tijd.
11. **Beslispunt voor Jarno (bewust geen advies, wel het eerlijke beeld): de gratis kennismaking van 15 minuten.** E1 uit het growth plan, nooit uitgevoerd. De hele markt heeft het gratis eerste gesprek als norm gezet; de geldscan van 49 euro vervult die rol deels asynchroon. Optie: de kennismaking alleen aanbieden op de resultaatpagina van de analyse (de warmste plek), zodat de tijdsinvestering beperkt blijft tot de meest kansrijke leads. Als de geldscan-aanvragen de komende 6 weken op gang komen, is dit niet nodig; zo niet, dan is dit de eerstvolgende knop om aan te draaien.
12. **Werkgeversspoor: geparkeerd tot de KvK-inschrijving er is**, maar de KvK zelf blokkeert inmiddels drie dingen (werkgevers, KOR-aanmelding, vermelding op gidsen als financieelfittewerknemers.nl). Dat maakt de KvK-inschrijving zelf een actiepunt met deadline, geen achtergrondtaak.

### Bewust niet doen

- Geen garanties of geld-terug-constructies, ook al adviseerde het oude groeiplan dat en doet de concurrentie het wel. Vaste afspraak (9 juli): kopen is kopen. Het onderscheid is nuchterheid, geen verkooptrucs.
- Niet meer investeren in dienst-keywords (cluster A) na de GSC-check; de vijver is kleiner dan hij oogt.
- Geen socialmediakanaal starten en geen cursus bouwen; beide vragen een machine die er nog niet is en de e-maillijst gaat voor.
- De contentstrategie niet omgooien. De artikelen doen wat ze moeten doen (verkeer), het probleem zat in wat er daarna met dat verkeer gebeurt.

## 4. Verwachtingen en meting

Realistisch beeld bij doorgroeiend verkeer plus de fixes uit fase 0/1:

- **Over 30 dagen**: 150 tot 300 clicks per maand, 15 tot 30 e-mailinschrijvingen (benchmark-mails plus analyse-mails), 2 tot 5 geldscan-aanvragen of kennismakingen. Nul of één betaald gesprek is dan nog steeds normaal.
- **Over 90 dagen (evaluatiemoment: half oktober)**: pas dan is een eerlijk oordeel over het SEO-kanaal mogelijk. Criteria: groeit de lijst met 30+ per maand, komen er wekelijks geldscan-aanvragen binnen, en levert outreach replies op. Zo niet, dan verschuift het zwaartepunt verder naar verwijzers en PR, niet naar meer content.
- **Noordster blijft**: geldscan-aanvragen en geboekte gesprekken. Nieuw ondersteunend meetpunt: lijstgroei per week (bestond nog niet als KPI, wordt nu de belangrijkste voorspeller).

De kern in één zin: het verkeer bewijst dat de contentmachine werkt, het onderzoek bewijst dat de doelgroep bestaat maar nauwelijks googlet naar hulp, dus de winst zit niet in méér of ander verkeer maar in het eindelijk aansluiten van de conversielaag (mail-blok, e-mailflow, herkenning) op het verkeer dat er al is, plus de kanalen waar het activatiemoment echt plaatsvindt: verwijzers en media.
