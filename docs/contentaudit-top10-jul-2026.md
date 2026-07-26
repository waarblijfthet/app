# Contentaudit top 10 en conversiediagnose, 25 juli 2026

## Samenvatting

1. **Het verkeer is niet het probleem, de eerste 700 pixels zijn dat wel.** Op 390px zie je bij 8 van de 10 artikelen in het eerste scherm geen antwoord, alleen breadcrumb, een kop van 3 tot 6 regels, de auteursbalk en een groene doos die belooft wat je straks gaat weten. Bij is-4000 staat er in de eerste 700px letterlijk nul inhoud.
2. **De conversieroute is op vijf van de tien pagina's kapot, niet zwak.** Vijf artikelen tonen twee groene CTA-blokken direct achter elkaar (bij geld-indelen en klarna met exact dezelfde knoptekst), doordat het artikel zelf een CTA rendert en `page.tsx` er daarna nog een bovenop zet. Op de boodschappenpagina staat de CTA op 8.624px, oftewel tien mobiele schermen scrollen.
3. **Op het warmste punt van de funnel wordt het goedkoopste product niet aangeboden.** In `Stap6Resultaat.tsx` komt het woord geldscan nul keer voor. Alle acht mensen die een resultaat zagen, kregen als enige betaalde vervolgstap het adviesgesprek van 125 euro te zien. Het unieke instapproduct van 49 euro ontbreekt precies daar.

Vijf ingrepen deze week, op volgorde van verwachte opbrengst:

1. Haal de dubbele CTA weg (5 artikelen, ongeveer 1 uur) en zet de geldscan op de resultaatstap van de analyse (1 uur). Nul risico, direct effect.
2. Zet het antwoord boven de vouw op boodschappen, is-4000 en netto-loonsverhoging: eerst het getal, dan de kop, ScanBox eruit of naar beneden.
3. Herschrijf drie metaTitels met het antwoord erin. is-4000 haalt 2,2 procent CTR op positie 6,4 en netto-loonsverhoging 1,2 procent op 7,4, allebei ver onder wat die posities normaal opleveren. Dit is de enige ingreep die vandaag meer klikken oplevert zonder nieuwe content.
4. Repareer BenchmarkMail voordat je hem mount: hij slaat het adres nu niet op, hij mailt het alleen naar hallo@. Mounten zonder die fix levert nul lijstgroei op.
5. Verwijder de vier em dashes uit H1 en metaDescription van is-4000, nibud, sparen en potjesmethode. Die staan letterlijk in je Google-snippet en in je eigen huisstijlregels staat dat ze er niet horen.

## Methode en beperkingen

Ik heb van alle tien de artikelen de content-component gelezen, de entry in `lib/inzichten-data.ts`, en de wrapper `app/inzichten/[slug]/page.tsx`. De live pagina's heb ik bekeken op www.waarblijfthet.nl, gerenderd in een viewport van exact 390px, en per pagina de y-positie van elk element opgemeten in plaats van geschat. Alle pixelwaarden in dit document zijn gemeten, niet ingeschat. Screenshots staan in `docs/screenshots/`.

Ik heb geen zoekvolumetool en geen CTR-tool. Waar ik met CTR-vuistregels reken, staat dat er expliciet bij.

Screenshots (390px, tenzij anders vermeld):

- `docs/screenshots/mobiel-390px-boodschappen-bovenkant.png`
- `docs/screenshots/mobiel-390px-is-4000-netto-bovenkant.png`
- `docs/screenshots/mobiel-390px-netto-loonsverhoging-bovenkant.png`
- `docs/screenshots/mobiel-390px-netto-loonsverhoging-dubbele-cta.png`
- `docs/screenshots/desktop-boodschappen-bovenkant.png`

## Wat de wrapper met elk artikel doet

`page.tsx` zet na de body van elk artikel altijd een groen CTA-blok neer. Heeft het artikel een `cta`-veld in `inzichten-data.ts`, dan komt die tekst erin. Heeft het dat niet, dan komt er een generieke tekst: "Benieuwd waar het bij jou weglekt? Bij de geldscan kijk ik persoonlijk naar jouw cijfers" met de knop "Laat mij je cijfers nakijken (€49)".

Dat blok is niet uitzetbaar. Artikelen die zelf ook al een CTA-blok in de component hebben staan, krijgen er dus onvermijdelijk twee. Dat is het geval bij netto-loonsverhoging, nibud, alleenstaande, geld-indelen en klarna.

Daarnaast kiest "Lees ook" onderaan de eerste drie artikelen uit dezelfde categorie in arrayvolgorde. Er is geen curatie. Op boodschappen (categorie Besparen) leidt dat de lezer per definitie zijwaarts naar nog een besparingsartikel, niet dieper het probleem in.

## 1. wat-is-normaal-bedrag-boodschappen-per-maand

**Cijfers.** 177 bezoeken (54 mobiel, 123 desktop). GSC: 44 klikken, 2.866 vertoningen, CTR 1,5 procent, positie 15,2. Verreweg je grootste pagina, goed voor 35 procent van al je verkeer en 39 procent van je klikken.

**Publiek.** Petra, en niets anders. De zoekwoorden zijn "boodschappen per maand", "boodschappen kosten per maand 1 persoon", "wat geeft een gemiddeld gezin uit aan boodschappen per maand", plus een reeks Belgische varianten. Dat is de validatie-zoeker in zuivere vorm. De ICP-notitie in `docs/icp-personas.md` zegt het zelf al: "Expliciet niet onze doelgroep: schuldhulp, minima, en de hardcore besparer (dat laatste is precies wie het boodschappen-artikel nu binnenhaalt)."

Dat ene bezoek vanaf een lokaal opgeslagen HTML-bestand in een map "PRIVE maandelijkse KOSTEN" is het meest interessante datapunt in je hele set, en het bevestigt precies dat. Iemand heeft dit artikel niet gelezen, maar gearchiveerd als referentietabel naast zijn eigen kostenoverzicht. Dat is naslagwerkgedrag, geen hulpvraaggedrag. Het is een compliment voor de tabel en een diagnose voor de funnel: de pagina wordt gebruikt zoals je een Nibud-pagina gebruikt, en van het Nibud koopt ook niemand coaching. Het verklaart ook de desktopscheefheid (123 desktop tegen 54 mobiel): dit is werk aan de keukentafel met een spreadsheet erbij, niet iets wat je tussendoor op je telefoon opzoekt.

**Diagnose inhoud.** Dit is inhoudelijk je beste artikel. Het antwoord staat in een Kort-antwoord-doos boven het eerste tekstblok, met vier huishoudtypes en bedragen, en meteen de geruststelling erbij: "Boven de norm zitten is dus normaal, geen teken dat je iets fout doet." De bronnoot onder de tabel is de enige echt nette bronvermelding van de tien: "Norm: Nibud-minimumbegroting voor voeding, juli 2025. Realistisch: een breder mandje inclusief drogist, bakker en tussendoor, gebaseerd op transactiedata van ABN AMRO en op wat ik in de praktijk zie. Indicatief."

Twee inhoudelijke problemen.

Ten eerste de drie huishoudens. "Daarom drie huishoudens die ik ken, met hun echte bedrag, waar het misgaat en wat de eerste concrete stap zou zijn", gevolgd door "Mats en Elsa, tweeverdieners, bijna €1.000 per maand" en "Jurgen en Rachel, drie kinderen van 12 en ouder, €1.300 en willen naar €1.000". Dat leest als drie klantcases met namen en bedragen. Werkregel 4 in CLAUDE.md zegt: nooit klantcases verzinnen, en voorbeelden expliciet als illustratie labelen. Hier gebeurt geen van beide. Als het echte mensen zijn, moet dat er staan zoals bij Sanne en Joris ("met toestemming"). Als het samengestelde voorbeelden zijn, moet dat er ook staan. Zo is het een claim die je niet kunt waarmaken en die je in een PR-gesprek of bij een kritische verwijzer opbreekt.

Ten tweede de getalconsistentie. De tabel zegt €634 voor "Gezin, twee jonge kinderen", de FAQ van ditzelfde artikel zegt "De Nibud-minimumnorm ligt rond €634 per maand", en het preview-blok in `inzichten-data.ts` zegt "Nibud minimum 627". Het nibud-artikel gebruikt overal €627. Twee pagina's die naar elkaar linken hanteren twee verschillende Nibud-getallen voor bijna hetzelfde huishouden.

**Diagnose opmaak.** Gemeten op 390px:

| element | y-positie | wat dat betekent |
|---|---|---|
| H1 | 220px, 225px hoog | 5 regels kop |
| Kort-antwoord-doos | 639px | de eerste vier bedragen vallen deels buiten het eerste scherm |
| hoofdtabel | 1622px | 2 schermen scrollen |
| CTA-blok | 8.624px | 10 schermen scrollen |
| totale pagina | 11.936px | ongeveer 14 mobiele schermen |

De doos begint op 639px en is 305px hoog, dus in de eerste 700px zie je de kopregel en hooguit de eerste bedragregel. Petra beslist volgens haar eigen profiel binnen enkele seconden. Ze krijgt nu een halve seconde antwoord na een scroll.

De tabel op 390px is niet stuk. Ik heb hem opgemeten: 327px breed, past binnen de wrapper, geen horizontale scroll. Wel wrapt elke cel, waardoor de koprij 77px hoog wordt en elke datarij 57px. Leesbaar, krap, niet kapot. **De desktopscheefheid komt dus niet door een gebroken mobiele weergave.** Dat is een aanname die je kunt schrappen.

De alinea's zijn kort (4 tot 7 regels) en er zit visueel materiaal tussen (BoodschappenKloof, BoodschappenSlider, drie casekaarten). Scanbaarheid is prima. Het probleem is niet de muur, het is de lengte: 11.936px voor een vraag die met één tabel beantwoord is.

**Conversieroute.** Er staat één zachte link vlak onder het antwoord (regel 50 tot 54: "Doe de gratis analyse ... geldscan (€49)"), in kleine grijze tekst, direct nadat de lezer haar antwoord heeft gekregen en dus op het moment dat ze weggaat. Daarna niets tot 8.624px. Dat is de hele route. Het is niet vreemd dat 177 bezoeken 2 geldscanbezoeken opleveren.

**Verdict.** Inhoudelijk je sterkste artikel, publiek dat nooit direct koopt, en een conversieroute die pas begint als 90 procent van de lezers weg is.

**Acties, op impact.**
1. Zet BenchmarkMail hier, maar pas na de opslagfix (zie sectie 4). Plaats hem direct onder de hoofdtabel op ongeveer 2.000px, niet onderaan. Daar is de lezer maximaal tevreden en nog aanwezig.
2. Kort de H1 in tot 3 regels op mobiel, zodat de Kort-antwoord-doos onder 500px begint.
3. Label de drie huishoudens: echte klanten met toestemming, of expliciet "voorbeeld ter illustratie".
4. Maak van €627 en €634 één getal en gebruik dat overal, ook in het preview-blok en in het nibud-artikel.
5. Voeg twee H2 toe: "Boodschappen voor 1 persoon per maand" en "En in België?". Zie sectie 3 voor de rekensom.

## 2. is-4000-euro-netto-goed-salaris-nederland

**Cijfers.** 45 bezoeken (34 mobiel, 11 desktop, het enige uitgesproken mobiele artikel). GSC: 22 klikken, 1.006 vertoningen, CTR 2,2 procent, positie 6,4. Het enige zoekwoord dat echt klikt: "is 4000 netto een goed salaris", CTR 5,3 procent op positie 3,3.

**Publiek.** Dit is je beste ICP-match van de tien. Wie "is 4000 netto een goed salaris" typt, verdient dat waarschijnlijk zelf of krijgt dat aangeboden, en zoekt bevestiging plus context. Dat is Sandra of Niels op het moment dat ze zich afvragen of het aan hen ligt. Mobiel aandeel van 76 procent past bij een impulsvraag. Van alle tien is dit de pagina waar de doelgroep en de zoekintentie het dichtst bij elkaar liggen.

**Diagnose inhoud.** De inhoud is goed en de "kort gezegd"-alinea op regel 51 is precies de brug die je wilt: "Dat ligt niet aan je inkomen, maar aan de vaste lasten die zijn meegegroeid."

Maar er staat rommel in die niet in je beste ICP-artikel hoort.

- "Economisten noemen het een welbekend fenomeen, maar het gebeurt bijna iedereen." (regel 107) Spelfout (economen), vage attributie zonder bron, en de zin loopt niet ("het gebeurt bijna iedereen").
- "Het CBS mediaan inkomen voor werkende Nederlanders ligt op €38.000-40.000 bruto per jaar" (regel 64). Koppelteken als scheidingsteken, tegen werkregel 3. De bijbehorende externLink is "CBS inkomensverdeling 2024" met als url `https://www.cbs.nl`, dus de kale homepage. Dat is geen bron.
- Ook "CPB modaal inkomen 2026" wijst naar `https://www.cpb.nl`. Twee van je drie bronnen op dit artikel zijn naakte homepages. De derde is KekMama.
- "Een gezin dat ik hielp met €4.000 netto dacht oprecht dat ze 'gewoon slecht met geld omgingen'." (regel 172) Weer een klantcase zonder label, en met rechte apostrofs in plaats van typografische aanhalingstekens die je elders in het bestand wel gebruikt.
- Het rekenvoorbeeld (€1.550 wonen, €875 boodschappen, €580 auto, €280 kinderen, €210 abonnementen, totaal €3.495) heeft geen enkele bronvermelding, terwijl de €505 die eruit komt de kern van het artikel is en ook in de metaDescription staat.

**Diagnose opmaak.** Dit is het slechtste eerste scherm van de tien. Gemeten op 390px is alles wat in de eerste 700px zichtbaar is:

```
Home / Inzichten / Is €4.000 netto per maand een goed salar…
Is €4.000 netto per maand een goed salaris? Ja — maar dit is wat er werkelijk van overblijft
Jarno Koopman
Oprichter Waar blijft het · 21 mei 2026
```

Dat is het. Nul inhoud. De H1 is 270px hoog (6 regels), de ScanBox begint pas op 684px en die geeft geen antwoord maar een belofte: "Na dit artikel weet je:". Het echte antwoord ("Je zit in de top 25 procent" en "€505") staat rond 950px en 1.900px.

De H1 bevat bovendien een em dash: "Ja — maar dit is wat er werkelijk van overblijft". Die staat in je H1, in je excerpt en in een FAQ-antwoord, en dus in je Google-snippet. Werkregel 3 zegt: geen em dashes.

De CTA staat op 6.006px, de knop op 6.308px, bij een paginahoogte van 9.277px.

**Conversieroute.** Er staat één inline analyse-link op regel 156 tot 165, en daarna het CTA-blok op 6.006px. De CTA-tekst is goed gekozen ("Belangrijker dan of €4.000 goed is: wat hou jij ervan over?") maar hij staat op 65 procent van de paginahoogte.

Belangrijker: CTR van 2,2 procent op positie 6,4 is laag. Als vuistregel levert positie 6 in de regel 3 tot 5 procent op. Je verliest hier klikken vóór iemand de pagina überhaupt ziet, en dat kost je meer dan alles wat er ná de klik misgaat.

**Verdict.** Je beste ICP-verkeer, op de pagina met het slechtste eerste scherm en een titel die het antwoord voor zich houdt.

**Acties, op impact.**
1. Nieuwe metaTitel met het antwoord erin, bijvoorbeeld "Is €4.000 netto een goed salaris? Ja, top 25 procent (en dit blijft er over)". Zie de rekensom in sectie 3.
2. Zet het antwoord boven de vouw: vervang de ScanBox door een Kort-antwoord-doos in de stijl van het boodschappenartikel (top 25 procent, €3.100 modaal, €505 over) en kort de H1 in.
3. Haal de em dash uit H1, excerpt en FAQ.
4. Repareer regel 107, of schrap de zin. Vervang de twee naakte homepage-bronnen door echte deeplinks of haal ze weg.
5. Label of schrap de klantcase op regel 172.

## 3. kosten-levensonderhoud-alleenstaande-2026

**Cijfers.** 28 bezoeken (14 mobiel, 14 desktop). GSC: 7 klikken, 595 vertoningen, CTR 1,2 procent, positie 9,7.

**Publiek.** Gemengd, en dat is het probleem. De titel belooft "wat je werkelijk nodig hebt om rond te komen", wat een minima-vraag is, terwijl de derde ScanBox-belofte gaat over "waarom je als alleenstaande met een goed salaris toch krap kunt zitten", wat Niels is. Eén pagina bedient hier twee publieken met tegengestelde verwachtingen. Het Niels-deel staat helemaal onderaan, vanaf 6.771px.

**Diagnose inhoud.** De laatste H2 ("Waarom voelt een goed salaris als alleenstaande alsnog krap?") is het beste stuk tekst van alle tien artikelen en het dichtst bij je merkbelofte: "Krap zitten als goed verdienende alleenstaande is geen gedragsprobleem. Het is rekenwerk." Dat staat op 80 procent van de pagina, achter een muur van gemiddelden.

Wat er misgaat:

- "Het eerlijke antwoord is: meer dan de meeste modellen suggereren" (regel 147). Het woord eerlijk, en het is een claim in plaats van iets wat je toont.
- "berekende HetGeldCollege op basis van Nibud-data" (regel 178), waarbij de link niet naar HetGeldCollege gaat maar naar je eigen nibud-artikel. Je schrijft een bronvermelding en linkt naar jezelf.
- "Economen noemen dit de "single premium": alleenstaanden betalen per hoofd gemiddeld 30-50% meer dan samenwonenden" (regel 270). Vage attributie, hard percentage, geen bron.
- "Volgens het CBS betaalt een alleenstaande huurder in 2026 gemiddeld €1.050 per maand kale huur" (regel 169). De bijbehorende externLink "CBS huurprijsontwikkeling 2026" wijst naar `https://www.cbs.nl`. Weer een kale homepage voor een hard getal over een jaar dat nog loopt.
- "Uit de praktijk: Sophie, 32, IT-consultant, Amsterdam" (regel 292) met huur €1.350, parkeervergunning €60, zorgverzekering €155, energie €190. Dit is de meest expliciete niet-gelabelde klantcase van de tien: naam, leeftijd, beroep, stad en vier exacte bedragen.
- Koppeltekens als scheidingsteken staan overal: €1.200-€1.400, €300-400, €2.400-€2.600, 20-30%, 30-50%, €30-60, €400-500.

**Diagnose opmaak.** Dit is het ergste geval van "de bezoeker moet eerst door jouw menu". Gemeten op 390px:

| element | y-positie |
|---|---|
| H1 | 220px (270px hoog) |
| persona-selector met 4 kaarten | 590px tot 1.428px |
| ScanBox | 1.428px |
| eerste antwoord (€2.000 tot €2.400) | ongeveer 1.750px |
| CTA-blok 1 (in de component) | 8.351px |
| CTA-blok 2 (uit de wrapper) | 9.507px |
| paginahoogte | 13.057px |

Op mobiel stapelen die vier persona-kaarten verticaal. De bezoeker die zoekt op "kosten levensonderhoud alleenstaande" moet dus eerst 838px aan keuzemenu doorscrollen, terwijl kaart 1 alleen maar zegt "Je bent hier op de juiste plek. Lees verder." Dat is een deur die je opent om te zeggen dat de deur klopt. Op desktop staat het in een 2x2-grid en is het verdedigbaar; op mobiel is het een barrière.

Twee CTA-blokken, 1.156px uit elkaar, met twee verschillende knoppen ("Doe de gratis analyse" en "Laat mij je cijfers nakijken (€49)").

**Conversieroute.** Dood tot 8.351px, en dan meteen dubbel.

**Verdict.** Twee artikelen in één, met de beste alinea van de site begraven op 80 procent en een persona-menu dat op mobiel het antwoord 1.000px naar beneden duwt.

**Acties, op impact.**
1. Klap de persona-selector op mobiel in tot één regel tekst met drie links, of verplaats hem naar onder de eerste tabel. De vier kaarten mogen op desktop blijven staan.
2. Verwijder het CTA-blok uit de component; de wrapper levert er al een.
3. Trek "Waarom voelt een goed salaris als alleenstaande alsnog krap?" naar boven, direct na de kostentabel. Dat is het stuk waarvoor Niels blijft.
4. Label of schrap Sophie. Vervang de HetGeldCollege-zin en de kale CBS-link.
5. Vervang de koppeltekens door "tot".

## 4. netto-loonsverhoging-berekenen

**Cijfers.** 26 bezoeken (21 mobiel, 5 desktop). GSC: 17 klikken, 1.391 vertoningen, CTR 1,2 procent, positie 7,4. Op vertoningen na boodschappen je nummer 2, op CTR je grootste verlies.

**Publiek.** Redelijke ICP-match. Wie zijn loonsverhoging natelt en teleurgesteld is, zit precies in het "meer verdienen lost het niet op"-verhaal. Het is alleen een momentopname: de vraag is beantwoord met één getal en dan is de aanleiding weg.

**Diagnose inhoud.** Het antwoord staat er goed en direct: "Van elke €100 bruto loonsverhoging houd je netto meestal tussen de €50 en €64 over" met daarachter de zin die je merk maakt: "Dat je weinig voelt van een opslag is dus geen gevoel, het klopt." De tabel met drie inkomenszones is concreet en bronvermelding naar de Belastingdienst is de enige echte deeplink-bron van de hele set.

Eén structureel probleem: **de metaTitel belooft iets wat de pagina niet heeft.** "Netto overhouden van loonsverhoging berekenen (2026)" belooft een rekentool. De pagina heeft een tabel met drie regels. Dat is een van de betere verklaringen voor 1,2 procent CTR bij positie 7,4: mensen die "berekenen" zoeken, klikken op het resultaat dat er als een calculator uitziet, en dat is jouw pagina niet.

**Diagnose opmaak.** In de eerste 700px op 390px zie je: breadcrumb, H1 (180px), auteursbalk, en de "Herken je dit?"-doos. Geen antwoord. Het antwoord staat rond 1.000px, na de ScanBox op 736px.

Twee stapelblokken bovenaan is er één te veel: eerst "Herken je dit?" (herkenning), dan "Na dit artikel weet je:" (belofte), en pas dan het antwoord. Dat zijn twee dozen die allebei uitstellen.

En dan het ergste: **twee groene CTA-blokken pal achter elkaar.** Gemeten: blok 1 op 2.973px met de knop "Doe de gratis analyse" op 3.265px, blok 2 op 3.440px met de knop "Bekijk de geldscan (€49)" op 3.742px. Zie `docs/screenshots/mobiel-390px-netto-loonsverhoging-dubbele-cta.png`. De lezer krijgt binnen 800px twee groene dozen die allebei hetzelfde vragen, met twee verschillende primaire acties. Dat is geen keuze aanbieden, dat is besluiteloosheid tonen.

**Conversieroute.** Op zich niet slecht geplaatst (2.973px van 6.080px is halverwege), maar door de verdubbeling wordt de aandacht gesplitst tussen analyse en geldscan op precies het moment dat je er één had moeten kiezen.

**Verdict.** Sterke inhoud, verkeerde belofte in de titel, en het duidelijkste voorbeeld van de dubbele-CTA-bug.

**Acties, op impact.**
1. Haal het CTA-blok uit de component (regels 156 tot 175). De wrapper-CTA blijft over, en die is voor dit artikel goed geschreven.
2. Bouw de calculator die je titel belooft. Je hebt het patroon al (PotjesCalculator, BoodschappenSlider): bruto bedrag invullen, netto eruit. Dit is de pagina waar interactie het meeste rendement heeft, want de zoekintentie is letterlijk "berekenen".
3. Nieuwe metaTitel met het getal: "Loonsverhoging: van €100 bruto hou je €50 tot €64 netto over (2026)".
4. Verwijder de ScanBox of voeg hem samen met "Herken je dit?", en zet het antwoord op de plek die vrijkomt.

## 5. nibud-boodschappen-versus-werkelijkheid

**Cijfers.** 18 bezoeken. GSC: 3 klikken, 538 vertoningen, CTR 0,6 procent, positie 6,9. Dat is de slechtste CTR van je hele top 10, op de op twee na beste positie.

**Publiek.** Petra, en precies hetzelfde publiek als artikel 1.

**Diagnose inhoud.** Hier zit je grootste onbenoemde probleem: **dit artikel en het boodschappenartikel concurreren met elkaar.** Ze gebruiken dezelfde getallen, hetzelfde preview-blok (beide "Nibud norm 627 / Werkelijk gemiddeld 875"), dezelfde conclusie (de norm is een minimum, boven de norm zitten is normaal) en dezelfde CTA-logica. Google moet kiezen welke van de twee hij toont voor "nibud boodschappen"-achtige queries, en jij verdeelt je autoriteit over twee pagina's. 538 vertoningen op positie 6,9 met 0,6 procent CTR wijst op precies dat patroon: je verschijnt wel, maar de snippet die getoond wordt overtuigt niet, mogelijk omdat de andere pagina de sterkere is.

Verder:

- "Hieronder het eerlijke verhaal achter de norm." (regel 49) en in de metaDescription "Het eerlijke verhaal achter de normen — en waarom ze bijna niemand halen." Het woord eerlijk plus een em dash, in de tekst die in Google staat.
- "De data is consistent, en schrikbarend consistent in één richting." (regel 77) Opgeblazen, en het woord schrikbarend past niet bij je nuchtere toon. Bovendien wordt die claim van consistentie onderbouwd met drie bronnen van heel ongelijke kwaliteit: één mamablogger, één forumpoll van 51 respondenten en één Nibud-gids.
- "Een mamablogger met een gezin van vier schreef in december 2024 dat ze dat jaar €8.830 bij Albert Heijn alleen al had uitgegeven" (regel 80) en "Op het forum Zeg maar Yes kozen van 51 respondenten slechts zeven voor een bedrag onder de €500 per maand" (regel 87). Dit zijn eerlijk gelabelde bronnen, dat is goed, maar het zijn geen bronnen waarop je een artikel bouwt dat het Nibud tegenspreekt. Een verwijzer die dit leest, ziet een forumpoll als bewijsvoering.
- "Nibud's eigen Prijzengids" (regel 92). Engelse genitief in Nederlandse tekst.
- De externLink "Nibud Prijzengids 2025/2026" wijst naar `https://www.nibud.nl`, de homepage.

**Diagnose opmaak.** ScanBox op 639px, dus in de eerste 700px zie je alleen de kop, de auteursbalk en de eerste regel van de belofte-doos. Twee CTA-blokken: 5.535px en 6.303px, met knoppen op 5.827px en 6.636px. Paginahoogte 9.812px.

Er is nog een rare volgorde: het CTA-blok uit de component staat op 5.535px, dan komt een "Uit de praktijk"-doos, dan een leesverwijzing, en dan pas het CTA-blok van de wrapper. De lezer krijgt dus CTA, inhoud, CTA.

**Conversieroute.** Dubbel en verward, en het maakt weinig uit want er komen 18 mensen per maand.

**Verdict.** Een tweede boodschappenartikel dat het eerste in de weg zit, met de zwakste bronnen van de set.

**Acties, op impact.**
1. Kies. Of dit artikel wordt de smalle uitlegpagina ("wat meet de Nibud-norm precies") die naar het boodschappenartikel linkt als hoofdstuk, of je voegt hem samen met boodschappen en zet een 301 op deze slug. Controleer eerst in GSC of beide pagina's op dezelfde queries verschijnen; als dat zo is, is samenvoegen de betere zet.
2. Als hij blijft: haal de em dash en het woord eerlijk uit de titel en metaDescription, herschrijf regel 77 en degradeer de mamablogger en de forumpoll tot illustratie in plaats van bewijs.
3. Verwijder het CTA-blok uit de component.

## 6. hoeveel-sparen-per-maand-normaal-nederland

**Cijfers.** 11 bezoeken. GSC: 2 klikken, 94 vertoningen, CTR 2,1 procent, positie 10,9. Klein.

**Publiek.** Petra opnieuw, maar dichter bij het probleem: wie zoekt hoeveel sparen normaal is, twijfelt aan zichzelf. Dat is een halve stap richting Sandra en Niels.

**Diagnose inhoud.** Er zitten drie dingen fout die je op een pagina met 11 bezoeken kunt laten liggen, behalve deze:

- **Grammaticafout in een H2 op de live site:** "Waarom haalt de meeste mensen die 10 procent niet?" (regel 78). Moet zijn "halen". Een fout in een kop is zichtbaarder dan tien fouten in de lopende tekst.
- **De body spreekt de FAQ tegen.** Body regel 66: "Het mediane spaarsaldo van een Nederlands huishouden is €23.000." FAQ: "Het CBS-mediaan: dertigers hebben gemiddeld €23.000 spaargeld, veertigers €34.000. (...) De helft van de dertigers heeft minder dan €10.000." Hetzelfde getal wordt eerst aan alle huishoudens toegeschreven en dan aan dertigers, en in dezelfde FAQ staat mediaan en gemiddeld door elkaar en een derde getal (€10.000) dat de eerste twee tegenspreekt. Dit is het soort ding waar iemand die je serieus overweegt op afhaakt.
- **Tegenspraak met geld-indelen.** Dit artikel: "Nibud adviseert drie tot zes maanden netto inkomen als buffer. Bij een modaal inkomen van €3.100 is dat €9.300 tot €18.600." Het artikel geld-indelen: "Het Nibud houdt drie tot zes maanden vaste lasten aan als gezonde reserve." Netto inkomen en vaste lasten zijn niet hetzelfde en het verschil is duizenden euro's. Eén van de twee klopt niet.
- H1 en excerpt bevatten em dashes (7 stuks in dit blok, het hoogste van de tien) en het woord "eerlijke antwoord". Body regel 46: "Dit artikel legt eerlijk uit wat normaal is."

**Diagnose opmaak.** H1 is 315px hoog, de langste van de tien. ScanBox op 729px. Eén CTA op 6.369px van 9.654px. Geen dubbele CTA hier, want dit artikel heeft geen `cta`-veld en dus alleen het generieke wrapper-blok.

**Conversieroute.** Het generieke wrapper-blok vraagt meteen om 49 euro. Voor iemand die net las dat een kwart van Nederland niks spaart en dat €50 per maand een goed begin is, is een aanbod van 49 euro precies één maandinleg. Dat is een ongelukkige samenloop.

**Verdict.** Klein bereik, maar met interne tegenspraken en een fout in een H2 die je geloofwaardigheid schaden op elke pagina waar iemand doorklikt.

**Acties, op impact.**
1. Repareer de H2-grammaticafout.
2. Los de tegenspraak op tussen body en FAQ over €23.000, en tussen dit artikel en geld-indelen over de buffer.
3. Haal de em dashes en het woord eerlijk uit H1, metaDescription en excerpt.
4. Geef dit artikel een eigen `cta` die past bij de temperatuur, bijvoorbeeld naar de gratis analyse in plaats van naar 49 euro.

## 7. potjesmethode-gezin-hoe-werkt-het

**Cijfers.** 11 bezoeken (10 mobiel). GSC: 4 klikken, 73 vertoningen, CTR 5,5 procent, positie 36,9. **De hoogste CTR van je hele set.** Op positie 37, wat betekent dat de mensen die dit vinden er heel gericht naar zoeken.

**Publiek.** Iemand die al besloten heeft iets te doen en een methode zoekt. Dat is verder in de beslisboom dan Petra, maar het is ook een doe-het-zelver: hij zoekt een systeem, geen coach.

**Diagnose inhoud.** Praktisch en goed geschreven. Twee harde fouten:

- **Rekenfout.** "een werkbaar startpunt voor een gezin is: 65 procent vaste lasten, 20 procent dagelijks leven, 10 procent sparen, 5 procent vrij" en dan "Bij een netto inkomen van €4.000 is dat: €2.600 vaste lasten, €800 dagelijks leven, €400 sparen, €200 vrij per persoon." 5 procent van €4.000 is €200 in totaal, niet per persoon. Bij een gezin met twee volwassenen komt de verdeling met "per persoon" uit op €4.200, dus 105 procent. En het interactieve blok eronder zegt letterlijk "✓ Je verdeling telt op tot 100%."
- **Tegenspraak body versus FAQ.** Body: Bunq "laat je onbeperkt gratis rekeningen aanmaken". FAQ: "Bunq is specifiek gebouwd voor het werken met meerdere rekeningen en is gratis voor maximaal drie rekeningen." Op dezelfde pagina.
- "Dat is ook wat onderzoek bevestigt. Mensen die fysiek of digitaal geld scheiden per doel, geven structureel minder uit" (regel 69). Onderzoek zonder bron. De externLinks zijn Raisin (een spaarvergelijker), een mamablogger en een Nibud-tool. Geen daarvan onderbouwt die claim.
- 5 em dashes in het datablok, waarvan één in de H1 en één in de metaDescription.

**Diagnose opmaak.** ScanBox op 639px, dus geen antwoord in het eerste scherm. Eén CTA op 6.814px van 9.943px. De "kort gezegd"-alinea staat op de goede plek, na de visualisatie.

**Conversieroute.** Zwak, en dat is hier verdedigbaar: dit publiek wil zelf doen. De inline zin op regel 161 ("Lukt het niet om het vol te houden? Dan helpt het als ik meekijk") is de juiste haak, want die spreekt de doe-het-zelver aan op het moment dat zijn methode faalt. Die zin verdient een prominentere plek dan een lopende alinea.

**Verdict.** Kleinste bereik, beste CTR, en twee inhoudelijke fouten die iemand met een rekenmachine binnen een minuut vindt.

**Acties, op impact.**
1. Repareer de 105-procent-rekenfout. Dit is de enige fout in de tien artikelen die een lezer direct als fout herkent.
2. Los de Bunq-tegenspraak op.
3. Schrap "Dat is ook wat onderzoek bevestigt" of zet er een bron bij.
4. Maak van "Lukt het niet om het vol te houden?" een apart blok in plaats van een zin.
5. Haal de em dashes uit H1 en metaDescription.

## 8. geld-indelen-salaris-potjes-systeem

**Cijfers.** 10 bezoeken (8 mobiel). Geen GSC-vermelding in de aangeleverde top 10, dus onder de 1 klik.

**Publiek.** Zelfde als potjesmethode: de doe-het-zelver. En dit artikel overlapt met potjesmethode zoals nibud met boodschappen overlapt, alleen erger: beide gaan over het verdelen van je salaris in potjes, beide leggen "jezelf eerst betalen" uit, beide noemen dezelfde Nibud-percentages, en ze linken naar elkaar als aparte onderwerpen terwijl ze dat niet zijn.

**Diagnose inhoud.** Netjes geschreven, geen bronnen die schuren, één fout: de buffer wordt hier uitgedrukt in vaste lasten en in artikel 6 in netto inkomen (zie hierboven).

**Diagnose opmaak.** Hier staat het meest gênante geval van de dubbele CTA. Gemeten op 390px:

- 4.667px: groen blok, tekst "Wil je weten waar het bij jou weglekt? Bij de geldscan kijk ik persoonlijk naar jouw cijfers en schrijf ik je een rapport met je drie grootste lekken. In gewone taal, geen gesprek nodig." Knop: "Laat mij je cijfers nakijken (€49)".
- 5.051px: groen blok, tekst "Benieuwd waar het bij jou weglekt? Bij de geldscan kijk ik persoonlijk naar jouw cijfers en schrijf ik je een rapport met je drie grootste lekken." Knop: "Laat mij je cijfers nakijken (€49)".

Twee dozen, dezelfde kleur, bijna dezelfde tekst, **exact dezelfde knoptekst**, 384px uit elkaar. Dat oogt als een bug, en dat is het ook.

**Conversieroute.** Zie boven.

**Verdict.** Overbodig naast potjesmethode, en de duidelijkste zichtbare bug op de site.

**Acties, op impact.**
1. Verwijder het CTA-blok uit de component (regels 162 tot 178).
2. Beslis of dit artikel en potjesmethode samengaan. Mijn voorkeur: samenvoegen tot één potjes-artikel en deze slug 301-en, want twee dunne pagina's over hetzelfde onderwerp helpen je positie op geen van beide.

## 9. klarna-niet-kunnen-betalen

**Cijfers.** 9 bezoeken (7 mobiel). GSC: 5 klikken, 448 vertoningen, CTR 1,1 procent, positie 14,5. Daarnaast ranken twee zusterartikelen mee ("wat kost achteraf betalen": 88 vertoningen op 14,9).

**Publiek.** **Niet je ICP, en niet een beetje ook.** Wie zoekt "klarna niet kunnen betalen" heeft op dit moment geen geld. Dat is precies de groep die je eigen artikel verschil-budgetcoach naar de gemeente stuurt: "heb je betalingsachterstanden, dan hoor je bij de kosteloze hulp van je gemeente, punt."

**Diagnose inhoud.** Dit is inhoudelijk het meest zorgvuldige artikel van de tien. Bedragen zijn expliciet indicatief gemaakt ("Dit zijn indicatieve bedragen, Klarna kan de tarieven aanpassen, dus check je eigen Klarna-overzicht"), de bronnen zijn echt (AFM-rapport als pdf-deeplink, NOS-artikel), en de doorverwijzing naar Geldfit staat er waar hij hoort. Toon is precies goed: "Paniek is niet nodig, maar wegkijken maakt het wel duurder."

**Diagnose opmaak.** Twee blokken bovenaan (Herken je dit? op ongeveer 500px, ScanBox op 711px) voordat het antwoord komt. En dan opnieuw de dubbele CTA: 3.630px en 4.013px, knoppen op 3.858px en 4.211px, allebei "Laat mij je cijfers nakijken (€49)".

**Conversieroute.** Hier is de dubbele CTA niet alleen lelijk maar inhoudelijk verkeerd. Je vraagt twee keer 49 euro aan iemand die net heeft gelezen dat hij zijn Klarna-termijn niet rond krijgt. Dat is in strijd met wat je zelf op een andere pagina adviseert, en het is het soort ding waar een verwijzer of een journalist je op aanspreekt.

**Verdict.** Goed geschreven, verkeerd publiek, en een CTA die je eigen ethiek tegenspreekt.

**Acties, op impact.**
1. Verwijder het CTA-blok uit de component en geef dit artikel een eigen `cta` die niet om geld vraagt: verwijs naar Geldfit en naar de gratis analyse. Dit kost je niets en het is het juiste.
2. Verder niet in investeren. Het cluster achteraf betalen (klarna, overzicht, stoppen, bkr, wat-kost) is vier tot vijf pagina's voor een publiek dat je expliciet niet bedient.

## 10. verschil-budgetcoach-financieel-coach

**Cijfers.** Niet in de bezoekerslijst, dus onder de 9 bezoeken. GSC: 2 klikken, 1.021 vertoningen, CTR 0,2 procent, positie 58,3. Op vertoningen is dit je nummer 4, op positie je slechtste.

**Publiek.** Het dienstcluster. Zie sectie 5.

**Diagnose inhoud.** Ironisch genoeg heeft dit artikel de beste openingsalinea van de tien, en het is het enige artikel waar het antwoord in de eerste 700px op mobiel staat: "Het korte antwoord: een budgetcoach helpt mensen met geldproblemen, een financieel coach helpt mensen die genoeg verdienen maar toch weinig overhouden." Geen ScanBox, geen Herken-je-dit-doos, meteen antwoord. Dit is het model dat de andere negen zouden moeten volgen.

De positioneringszin is ook de scherpste van de site: "Betaal je alles netjes op tijd maar snap je niet waarom er niets overblijft, dan zit je in de groep waarvoor ik werk."

Kleine dingen: "Toon | ... | Klankbord en eerlijke blik van buitenaf" in de tabel (het woord eerlijk), en rechte aanhalingstekens bij `"waar blijft ons geld"` en `zo'n`.

**Diagnose opmaak.** Geen ScanBox, één CTA op 4.620px van 7.920px. Twee tabellen, allebei leesbaar op mobiel. Structureel het schoonste artikel van de tien.

**Conversieroute.** Eén CTA, maar het is de generieke geldscan-CTA omdat het artikel geen `cta`-veld heeft. Dat is niet erg, maar het is een gemiste kans: dit artikel eindigt al met een verwijzing naar `/financieel-coach` en `/adviesgesprek`, en dat is een betere route voor dit publiek dan het generieke blok.

**Verdict.** Het best gebouwde artikel van de tien, op de slechtste positie, voor het publiek waar je het minst van moet hebben.

**Acties, op impact.**
1. Gebruik de opening van dit artikel als sjabloon voor de andere negen.
2. Geef het een eigen `cta` naar `/financieel-coach`.
3. Verder niet in investeren, zie sectie 5.

## Sectie 2. Waarom converteert er niemand

Vooraf één ding dat waar blijft en dat ik niet ga wegpoetsen: **bij 500 paginabezoeken is nul betaalde aanvragen statistisch normaal.** De analyse van 18 juli rekende het al voor: informatieverkeer converteert 0,1 tot 0,5 procent naar iets betaalds. Op 500 bezoeken is de verwachting 0,5 tot 2,5 conversies, en die verwachting bestaat uit hele mensen, dus nul is een volstrekt gewone uitkomst. Alles hieronder gaat over waarom je ook bij 5.000 bezoeken nog op nul zou staan.

### 2a. Waar sterft de route van 500 bezoeken naar 4 keer /aanbod en 2 keer /geldscan?

**Waarschijnlijkheid dat dit een echte oorzaak is: hoog.** Onderbouwing per artikel:

| artikel | bezoeken | CTA-positie op 390px | paginahoogte | dubbele CTA |
|---|---|---|---|---|
| boodschappen | 177 | 8.624px | 11.936px | nee |
| is-4000 | 45 | 6.006px | 9.277px | nee |
| alleenstaande | 28 | 8.351px en 9.507px | 13.057px | ja |
| netto-loonsverhoging | 26 | 2.973px en 3.440px | 6.080px | ja |
| nibud | 18 | 5.535px en 6.303px | 9.812px | ja |
| sparen | 11 | 6.369px | 9.654px | nee |
| potjesmethode | 11 | 6.814px | 9.943px | nee |
| geld-indelen | 10 | 4.667px en 5.051px | 7.612px | ja |
| klarna | 9 | 3.630px en 4.013px | 6.709px | ja |
| verschil-budgetcoach | <9 | 4.620px | 7.920px | nee |

Op je grootste pagina staat de enige echte CTA op 72 procent van de paginahoogte, tien mobiele schermen diep. De enige eerdere haak is een grijze regel van 12px direct onder het antwoord, precies op het moment dat Petra haar getal heeft en wegklikt. Dat verklaart 177 bezoeken tegen 2 geldscanbezoeken.

De vijf dubbele CTA's zijn een tweede, zelfstandige oorzaak. Twee identieke groene dozen achter elkaar lezen als een fout, en een fout kost vertrouwen precies op het punt waar je erom vraagt.

Derde punt: **funneltemperatuur.** Vijf van de tien artikelen hebben geen `cta`-veld en krijgen dus het generieke blok dat direct 49 euro vraagt. Voor iemand die kwam voor "hoeveel sparen is normaal" of "klarna niet kunnen betalen" is dat de verkeerde vraag op het verkeerde moment. Er is nergens een tussenstap tussen "gratis artikel" en "49 euro".

### 2b. De 23 die de analyse openden en de 12 die afvielen

**Waarschijnlijkheid dat de inkomstenstap de oorzaak is: laag. Je premisse klopt niet.**

Ik heb de instrumentatie nagekeken. In `QuizClient.tsx` staat bij de logging: "Log bij elke stapwissel (en bij mount: pagina geladen = stap 1)". `profiel: 23` is dus het aantal keren dat `/analyse` geladen is, en `inkomsten: 11` is het aantal mensen dat op "Volgende: Inkomen" heeft geklikt. Die 12 mensen hebben de inkomstenstap nooit gezien. Ze zijn afgehaakt op de profielstap of meteen bij binnenkomst.

Dat maakt de vraag een andere. Ik heb de profielstap opgemeten op 390px:

| element | y-positie |
|---|---|
| kop "Eerst even kennismaken" | 132px |
| vraag 1 "Hoe woon je?" | **949px** |
| vraag 2 "Woonsituatie" | 1.128px |
| vraag 3 "Kinderen thuis" | 1.247px |
| vraag 4 "Auto-situatie" | 1.433px |
| knop "Volgende: Inkomen" | 1.691px |

**Op een mobiel scherm van 844px ziet de bezoeker geen enkele vraag zonder te scrollen.** Boven de eerste vraag staan: het badge "2 minuten · Anoniem · Geen producten", een introparagraaf, een voorbeeldkaart van het resultaat, een privacyzin met link, en een regel met jouw foto en naam. Dat is allemaal goed bedoeld en het is precies wat de persona's in eerdere rondes vroegen, maar het is samen ruim één scherm uitstel voor een flow die belooft 2 minuten te duren.

De stap zelf is verder goed: vier tikvragen, geen typen, geen gevoelige informatie. Ik denk dus dat het niet aan de vragen ligt maar aan twee andere dingen:

1. **Intentie.** Van de 428 bezoekers openden er 23 de analyse (5,4 procent). Wie vanaf het boodschappenartikel doorklikt, wil zijn getal checken en komt in een zesstapsformulier. Dat is een andere transactie dan hij verwachtte.
2. **Geen zichtbare eerste vraag.** Wie twijfelt en niets ziet om op te tikken, gaat weg.

Wat je zou moeten meten om dit zeker te weten: log een apart event op de eerste interactie binnen stap 1 (de eerste tik op een optieknop). Dan zie je het verschil tussen "keek en ging weg" en "begon en stopte". Dat veld bestaat al (`eerste_interactie`), maar in de cijfers die je hebt aangeleverd staat het niet uitgesplitst per stap. **Ik kan met de huidige data niet vaststellen of de 12 zijn afgehaakt vóór of tijdens de profielstap.**

### 2c. Wat er gebeurt na de uitslag

**Waarschijnlijkheid dat dit een echte oorzaak is: hoog als ontwerpfout, maar met n=8 verklaart het statistisch niets.**

Ik heb `Stap6Resultaat.tsx` regel voor regel gelezen. De volgorde op het resultaatscherm is:

1. Het grote getal, met vergelijking en afwijking.
2. Spaardoel versus werkelijkheid.
3. Top 2 afwijkingen.
4. Verdict-blok.
5. **CTA "En nu?" naar `/adviesgesprek`, met de tekst "Eenmalig adviesgesprek van 45 minuten, €125. Geen traject."**
6. Pas daarna het e-mailformulier.
7. Een link naar een artikel.

Twee harde bevindingen.

**Het woord geldscan komt nul keer voor in `Stap6Resultaat.tsx`.** Alle acht CTA-varianten in de code eindigen op een gespreksbelofte: "In een gesprek zoeken we uit waar dat zit", "In een gesprek lopen we ze samen door", "In een gesprek kijken we samen naar je cijfers". Op het warmste punt van je hele funnel, bij iemand die net zijn eigen cijfers heeft ingevuld en zijn afwijking heeft gezien, bied je uitsluitend het duurste product met de hoogste drempel aan. Het product dat volgens je eigen concurrentieanalyse uniek is in Nederland (49 euro, asynchroon, geen gesprek nodig) staat er niet. Op de gedeelde pagina `/resultaat/[token]` staat de geldscan wel, maar als secundaire optie onder "Bekijk het adviesgesprek". Dus zelfs daar is de volgorde omgedraaid ten opzichte van de funnel in CLAUDE.md.

**De betaalde vraag staat vóór de gratis vraag.** De bezoeker moet eerst een aanbod van 125 euro afslaan en daarna alsnog zijn e-mailadres geven. Dat is de verkeerde volgorde: je vraagt het grootste eerst.

Daar komt bij dat het e-mailblok zijn eigen reden om te bestaan ondermijnt: "Je resultaat hierboven blijft ook zonder e-mail gewoon zichtbaar." Dat is eerlijk gezegd de juiste keuze qua integriteit, maar het is ook exact de zin die verklaart waarom 6 van de 8 hun adres niet gaven. Als je die zin wil houden (en dat begrijp ik), moet de mail iets bieden dat het scherm niet biedt. Nu belooft hij "een gedetailleerde breakdown", terwijl de breakdown er al staat.

**Is het een einde of een begin?** Een einde. Er is geen e-mailflow na de analyse: in `app/api/cron/` staan alleen `indexing`, `indexing-inspect` en `outreach-followups`. De dag 0/2/5-flow uit het plan van 18 juli is niet gebouwd. Wie zijn adres geeft, krijgt één mail en daarna niets. Van de 2 adressen deze maand is er dus geen enkele opvolging geweest.

### 2d. Is het publiek gewoon verkeerd?

**Waarschijnlijkheid: hoog, en dit is de belangrijkste van de vijf.**

De zoekwoordenlijst is ondubbelzinnig. Het enige zoekwoord dat echt klikt is "is 4000 netto een goed salaris". Alles daaromheen is benchmark- en getalzoekwerk: boodschappen per maand, boodschappen 1 persoon, lijst vaste lasten, nibud boodschappen 2 personen. Geen enkel zoekwoord in je lijst bevat een hulpvraag. Dat is exact wat de analyse van 18 juli voorspelde en het is nu bevestigd met echte klikdata in plaats van autocomplete.

De beroepssalaris-ruis ("accountmanager salaris", "engineer salaris", "controller salaris") is naar mijn inschatting geen toevallige long tail maar een signaal. Je hebt een cluster inkomenspagina's (is-4000, is-3000, modaal-inkomen-2026, bruto-naar-netto, vakantiegeld, bonus-13e-maand, salarisverhoging-boven-76000) waarvan Google denkt dat het een salarisinformatiesite is. Vertoningen op "aantal inwoners argentinie" en "ceo betekenis" zijn wél toeval, dat is normale ruis bij een jong domein op lange staarten. De salariszoekwoorden zijn dat niet: er zijn er tientallen en ze zijn thematisch consistent.

Verdeling van de tien naar ICP-potentieel:

**Kan echt ICP-verkeer trekken (Sandra of Niels):**
- is-4000: ja, sterkst van allemaal. Zelfde persoon, zelfde moment.
- kosten-levensonderhoud-alleenstaande: ja, maar alleen het onderste deel. Dat is letterlijk Niels.
- netto-loonsverhoging: half. De vraag is transactioneel, maar de teleurstelling erachter is ICP.

**Trekt nooit ICP-verkeer, hoe goed je het ook maakt:**
- boodschappen en nibud: benchmarkzoekers, per definitie. Waarde alleen via e-mail.
- sparen: benchmarkzoeker met een twijfel. Grensgeval, klein.
- potjesmethode en geld-indelen: doe-het-zelvers die geen coach willen.
- klarna: tegenovergestelde van je ICP.
- verschil-budgetcoach: dienstzoeker, maar op positie 58 irrelevant.

Kort: **twee tot drie van je tien grootste pagina's kunnen ICP-verkeer opleveren.** De rest is bereik en geloofwaardigheid, en die kun je alleen te gelde maken via een e-mailadres.

### 2e. Wat kost het dat BenchmarkMail nergens gemount staat?

**Rekenkundig, met een vuistregel die ik niet kan onderbouwen met eigen data:** een relevant, situatiespecifiek mailblok midden in een artikel haalt doorgaans 3 tot 8 procent van de lezers. Toegepast op de vier benchmarkartikelen waar hij past (boodschappen 177, alleenstaande 28, nibud 18, sparen 11, samen 234 bezoeken per 30 dagen) levert dat **7 tot 19 adressen per maand** op. Je hebt er nu 2 in 30 dagen, uit de hele site.

Maar er is een grotere bevinding, en die is belangrijker dan het gemis:

**Het component is niet alleen ongemount, het is onaf.** Ik heb `app/api/boodschappen-benchmark/route.ts` nagekeken. Die doet twee dingen: hij mailt de benchmark naar de bezoeker en hij stuurt een notificatie naar hallo@waarblijfthet.nl. Er is **geen enkele Supabase-insert**. Het adres wordt nergens opgeslagen. Als je dit blok morgen mount, groeit je lijst met nul, want je hebt geen lijst; je hebt een inbox met losse notificatiemails.

Dat verandert de prioriteit. In het plan van 18 juli stond "BenchmarkMail plaatsen" als actie 1 met de motivering dat het blok bestaat en werkt. Het werkt half. De volgorde moet zijn: opslaan repareren, dan mounten, dan pas de e-mailflow eroverheen.

## Sectie 3. De drie winnaars

Vooraf de rekenbasis. Ik heb geen CTR-tool en geen zoekvolumedata. De CTR-vuistregels hieronder zijn de gangbare branchecijfers voor Google-posities en niets meer dan dat: positie 1 rond 25 tot 30 procent, positie 3 rond 8 tot 11 procent, positie 5 rond 4 tot 6 procent, positie 10 rond 2 procent, positie 15 rond 1 tot 1,5 procent. Behandel de uitkomsten als orde van grootte, niet als voorspelling.

### 3a. Boodschappen: van positie 15,2 naar de top 5

Je huidige CTR van 1,5 procent op positie 15,2 klopt precies met de vuistregel. Dat betekent iets belangrijks: **je titel en snippet doen het hier prima. Het probleem is puur de positie.**

De rekensom bij gelijkblijvende vertoningen (2.866 per maand):

| positie | CTR-vuistregel | klikken per maand | verschil met nu |
|---|---|---|---|
| 15,2 (nu) | 1,5% | 44 | |
| 8 | 3% | 86 | +42 |
| 5 | 5% | 143 | +99 |
| 3 | 9% | 258 | +214 |

In de praktijk stijgen de vertoningen mee als je stijgt, dus dit is een ondergrens. De top 5 verdrievoudigt je grootste pagina ruwweg.

**Wat is de snelste weg daarheen?** Drie dingen, in deze volgorde:

1. **Interne links.** Ik heb ze geteld in `app/inzichten/[slug]/content/`:

| pagina | bezoeken | vertoningen | interne links naar deze pagina |
|---|---|---|---|
| geld-indelen-salaris-potjes-systeem | 10 | onbekend | **15** |
| potjesmethode-gezin-hoe-werkt-het | 11 | 73 | **12** |
| wat-is-normaal-bedrag-boodschappen | 177 | 2.866 | **5** |
| is-4000-euro-netto | 45 | 1.006 | 3 |
| netto-loonsverhoging-berekenen | 26 | 1.391 | **2** |

Je interne linkstructuur staat op zijn kop. Je twee kleinste artikelen krijgen samen 27 links, je drie grootste samen 10. Dit is de goedkoopste positieingreep die er bestaat en hij kost je een uur.

2. **Ruim de kannibalisatie op met nibud.** Twee pagina's met dezelfde getallen, hetzelfde preview-blok en dezelfde conclusie verdelen je relevantie. Kies er één als hoofdpagina.

3. **Actualiseer.** De bronnoot zegt "Nibud-minimumbegroting voor voeding, juli 2025" op een pagina met 2026 in de titel. Werk de cijfers bij naar het prijspeil van 2026 en pas de `datum` aan. Versheid telt zwaar op benchmarkqueries die het jaartal bevatten.

**Welke zoekwoorden je met welke aanpassing binnenhaalt:**

| ontbrekende sub-H2 | zoekwoorden uit je lijst | vertoningen nu | positie nu |
|---|---|---|---|
| "Boodschappen voor 1 persoon per maand" | boodschappen kosten per maand 1 persoon; budget boodschappen 1 persoon; boodschappen 1 persoon per maand 2026 | 19 + 13 + 8 | 42 / 59 / **2,9** |
| "Boodschappenbudget voor 2 personen" | boodschappen budget 2 personen; nibud boodschappen 2 personen 2026 | 15 + onbekend | 59,3 / 7,1 |
| "En in België?" | reeks Belgische varianten | onbekend, meerdere | 25 tot 30 |
| "Wat is een normaal boodschappenbudget per week?" | boodschappen budget | 17 | 73,4 |

Let op die "boodschappen 1 persoon per maand 2026" op positie 2,9 met 8 vertoningen: daar sta je al bovenaan zonder er iets voor gedaan te hebben. Eén H2 met een weekbedrag en een maandbedrag voor één persoon pakt die hele groep op.

De Belgische varianten zou ik wél bedienen met één korte H2 (het kost een kwartier en het pakt vertoningen op posities 25 tot 30 op), maar geen aparte pagina bouwen. Het zijn geen kopers.

**De conversiebrug voor dit publiek.** Niet de geldscan. Dit is Petra: ze wil geen coaching. De brug is BenchmarkMail met haar huishoudtype, direct onder de hoofdtabel op ongeveer 2.000px, met een concrete belofte ("de drie grootste hefbomen voor jouw situatie") en de expliciete geruststelling die er al in staat: "Geen nieuwsbrief, geen vervolgmails." Eerst de opslagfix, anders vang je niets.

### 3b. is-4000: het CTR-gat dichten

Dit is een ander probleem dan boodschappen. Positie 6,4 hoort 3 tot 5 procent CTR op te leveren, je haalt 2,2 procent. Op 1.006 vertoningen kost dat je ongeveer 10 tot 28 klikken per maand die je zonder één woord nieuwe content kunt pakken.

De oorzaak is te zien in de data: op het exacte zoekwoord "is 4000 netto een goed salaris" (positie 3,3) haal je 5,3 procent, wat normaal is. Op de bredere set haal je 2,2 procent. Je titel dekt de smalle vraag goed en de brede vraag niet.

Huidige metaTitel: "Is €4.000 netto een goed salaris in Nederland?" Die stelt de vraag terug in plaats van hem te beantwoorden. Voorstel: **"Is €4.000 netto een goed salaris? Ja, top 25 procent (en dit hou je over)"**. Het getal in de titel is wat de zoeker zoekt, en de tweede helft creëert de spanning die de klik oplevert.

Bijbehorende metaDescription zonder em dash, met de €505 erin.

Ontbrekende sub-H2's, gezien de zoekwoorden:
- "Is 4000 euro netto per maand veel?" (staat als apart zoekwoord op positie 6,1 in je lijst). Dat is een andere formulering van dezelfde vraag en verdient een eigen kop.
- "Hoeveel bruto is €4.000 netto?" De FAQ heeft het antwoord (€65.000 of meer) maar er is geen H2 voor, terwijl dit de meest logische vervolgvraag is.
- "Is €4.000 netto genoeg voor een gezin?" en "voor een alleenstaande?" Twee huishoudtypes, want nu rekent het artikel alleen het gezinsscenario en dat sluit Niels uit terwijl hij co-primaire ICP is.

**De conversiebrug voor dit publiek.** Hier hoort de geldscan wel, want dit is Sandra of Niels. Maar niet als eerste stap na een artikel dat ze net vonden. De brug is de gratis analyse met de belofte die het artikel al maakt: "Benieuwd hoe jullie verdeling eruitziet ten opzichte van een vergelijkbaar gezin met hetzelfde inkomen?" Die zin staat er al, op regel 156, maar op 5.000px diep en in lopende tekst. Zet hem in een blok direct na het €505-rekenvoorbeeld, dus rond 3.500px, waar de lezer net heeft gezien dat het klopt.

### 3c. netto-loonsverhoging: los de belofte in de titel in

Positie 7,4, CTR 1,2 procent, 1.391 vertoningen, 17 klikken. Ook hier hoort 3 tot 4 procent, dus je laat ongeveer 25 tot 40 klikken per maand liggen.

De oorzaak is naar mijn inschatting anders dan bij is-4000: **je titel belooft een rekentool en je levert een tabel met drie regels.** "Netto overhouden van loonsverhoging berekenen (2026)". Wie "berekenen" zoekt, kiest in de resultatenlijst de pagina die eruitziet als een calculator. Bij een gedeelde SERP met echte bruto-nettocalculators (Belastingdienst, salarischeck-tools) verlies je die keuze bijna altijd.

Twee routes, en ik zou ze allebei doen:

1. **Bouw de calculator.** Je hebt het patroon al staan: `PotjesCalculator` en `BoodschappenSlider` zijn allebei client-componenten met invoer en directe uitkomst. Eén invoerveld (bruto bedrag per maand of per jaar), één uitkomst (netto erbij), plus de zone waarin de gebruiker valt. Van alle content-investeringen op deze lijst is dit degene met de duidelijkste intentiematch.
2. **Nieuwe metaTitel met het getal:** "Loonsverhoging: van €100 bruto hou je €50 tot €64 netto over (2026)". Als je de calculator bouwt, kun je "berekenen" laten staan; zo niet, haal het woord dan weg, want dan doe je een belofte die je niet nakomt.

Ontbrekende sub-H2's:
- "Hoeveel netto is 200 euro bruto erbij?" en "500 euro bruto erbij?" Concrete bedragen zijn hoe mensen dit zoeken. Nu staat er één voorbeeld met €200 in lopende tekst.
- "Waarom levert opslag boven 38.000 euro zo weinig op?" Dat verwijst nu door naar een ander artikel; een eigen H2 met een kort antwoord houdt de lezer hier en pakt de heffingskortingsvraag.

**De conversiebrug voor dit publiek.** De teleurstelling is de brug, en het artikel formuleert hem al goed: "zolang het lek in je structuur zit, loopt een hoger inkomen er gewoon doorheen". Zet direct daarna één blok, niet twee, en kies de analyse (gratis, past bij het moment) met de geldscan als kleine tekstlink eronder. Precies zoals het `cta`-veld het nu al doet. Het enige wat weg moet is de dubbeling.

## Sectie 4. Het dienstcluster

**De conclusie uit CLAUDE.md houdt stand, en de nieuwe cijfers maken hem harder in plaats van zachter.**

De cijfers:

| zoekwoord | vertoningen | positie | klikken |
|---|---|---|---|
| budgetcoach | 265 | 65,4 | 0 |
| budget coach | 114 | 60,2 | 0 |
| financieel coach | 91 | 29,7 | 0 |
| budgetcoaching | 74 | 76,9 | 0 |
| budgetcoach kosten | 72 | 41,3 | 0 |
| budgetcoach nodig | 20 | 42,5 | 0 |
| budget coaching | 18 | 74,4 | 0 |
| financieel adviseur kosten | 7 | 60 | 0 |
| **totaal** | **661** | gemiddeld ver in de 50 | **0** |

Twee dingen die je uit deze tabel moet lezen.

Ten eerste: **posities 60 tot 77 zijn pagina 6 tot 8.** Daar is nul klikken geen teken dat de pagina slecht is, het is rekenkunde. Je kunt uit deze cijfers dus niets afleiden over de kwaliteit van je pagina's; je kunt er alleen uit afleiden hoe ver je van de eerste pagina af staat.

Ten tweede, en dat is de beslissende: **stel dat het lukt.** Om op "budgetcoach" van positie 65 naar de top 5 te komen moet je Budgetcoach.nl, het gemeentelijke schuldhulpcircuit en de opleidingsaanbieders voorbij, met een domein van vier maanden oud en zonder linkbuilding. Dat is een project van maanden. En de opbrengst zou zijn: 265 vertoningen per maand maal 5 procent is 13 klikken, van mensen die "budgetcoach" zoeken. Dat is per definitie het schuldhulppubliek dat je eigen artikel naar de gemeente doorstuurt. **Je zou maanden werk investeren om dertien keer per maand de verkeerde persoon binnen te halen.**

De uitzondering is "financieel coach" op positie 29,7. Dat is de enige dienstterm die dicht genoeg bij de eerste pagina staat om binnen bereik te zijn, en het is ook de term die het dichtst bij jouw dienst ligt. 91 vertoningen is klein, maar dit is de enige die ik zou aanraken.

**Per pagina:**

| pagina | vertoningen | positie | advies |
|---|---|---|---|
| verschil-budgetcoach-financieel-coach | 1.021 | 58,3 | **Laten liggen.** Het is je best gebouwde artikel en er is niets aan te repareren. Alleen: geef het een eigen `cta` naar `/financieel-coach` in plaats van het generieke geldscan-blok, en gebruik zijn opening als sjabloon voor de andere negen. Verder geen minuut in investeren. |
| wat-kost-een-financieel-coach | 412 | 32,7 | **Verbeteren, als enige van het cluster.** Dit is de op één na dichtstbijzijnde positie en het is een prijsvraag, wat betekent dat de zoeker al aan het vergelijken is. Zet je eigen tarieven er hard in (49 / 125 / 497) met de vergelijking tegenover het marktgemiddelde. Dat is een pagina die je zonder nieuwe autoriteit naar de top 20 kunt duwen omdat je iets hebt wat concurrenten niet publiceren: echte prijzen. |
| /financieel-coach (dienstpagina) | 6 bezoeken | staat niet in GSC-top | **Laten staan, niet uitbreiden.** Dit is je conversiepagina, geen SEO-pagina. Zorg dat de artikelen ernaartoe linken (nu doen ze dat via de auteursbio) en meet of dat verkeer converteert. |
| wat-doet-een-financieel-adviseur | 61 | 41,8 | **Laten liggen.** Verkeerde intentie (Wft-advies), lage volumes. |
| wat-kost-een-financieel-adviseur | niet in lijst | onbekend | **Overwegen samen te voegen** met wat-kost-een-financieel-coach. Twee prijspagina's over aangrenzende diensten verdelen je relevantie, net als bij nibud en boodschappen. |

**Deindexeren: nee.** Er is geen reden voor. Deze pagina's schaden je niet, ze doen alleen weinig. Ze kosten geen crawlbudget van betekenis op een site van 79 artikelen en ze zijn inhoudelijk correct. Deindexeren is een oplossing voor dunne of duplicate content, en dat zijn deze niet.

**Samenvoegen: alleen de twee kostenpagina's, en alleen als GSC laat zien dat ze op dezelfde queries verschijnen.**

## Sectie 5. Wat ik niet ga doen, en waarom

Zodat je niet aan alles tegelijk begint.

1. **Geen nieuwe artikelen deze week.** Je hebt 79 artikelen en een conversielaag die niet aangesloten is. Elk nieuw artikel vergroot het probleem. De rondkomen-serie, cluster C en het "waarom kan ik niet sparen"-artikel uit het plan van 18 juli blijven staan, maar pas nadat het mailblok werkt en de dubbele CTA's weg zijn.
2. **Ik ga het klarna-cluster niet verbeteren.** Vijf pagina's (klarna, overzicht, stoppen, bkr, wat-kost) voor een publiek dat je expliciet niet bedient. Ik haal alleen de geldscan-CTA eruit, want die is inhoudelijk verkeerd, en verder blijft het staan als het is.
3. **Ik ga niet vechten om "budgetcoach".** Zie sectie 4. De rekensom loopt niet, ook niet als het lukt.
4. **Ik ga geen aparte Belgiëpagina bouwen.** Eén H2 in het boodschappenartikel, meer niet. Belgische bezoekers zijn geen kopers en een aparte pagina is onderhoud voor niets.
5. **Ik ga de contentstrategie niet omgooien.** De diagnose van 18 juli klopt en wordt door deze cijfers bevestigd, niet weersproken. Het verkeer doet wat het moet doen. Het probleem zit in de 700 pixels bovenaan en in de conversielaag eronder.
6. **Ik ga de "Je resultaat blijft ook zonder e-mail zichtbaar"-zin niet schrappen.** Die kost je adressen, maar hij is waar en hij past bij waarom mensen jou zouden vertrouwen boven een gladde app. Het antwoord is niet de zin weghalen maar de mail iets laten bieden wat het scherm niet biedt.
7. **Ik ga geen A/B-tests opzetten.** Bij 500 bezoeken per maand duurt elke test langer dan een jaar voordat hij iets zegt. Beslis op redenering, meet op richting.

## Sectie 6. Wat ik niet weet, en wat je zou moeten meten

1. **Waar je verkeer vandaan komt.** Je eigen meting zegt 500 paginabezoeken en 360 unieke sessies; GSC zegt 112 klikken. Dat is een factor 3 tot 4,5 verschil. Dat kan bots zijn, intern klikken, direct verkeer, jouw eigen bezoeken, of gewoon dat pageviews en klikken niet vergelijkbaar zijn. Zonder een uitsplitsing naar bron weet ik niet of je 112 of 360 echte bezoekers hebt, en dat verandert elke conversieberekening in dit document. **Meet: referrerverdeling in de Bezoekers-tab, en sluit je eigen IP uit.**
2. **Of het boodschappenartikel op mobiel slechter rankt dan op desktop.** 123 desktop tegen 54 mobiel is opvallend, maar ik kan niet zien of dat komt door de zoekintentie (aan de keukentafel met een spreadsheet) of doordat je mobiele positie lager ligt. De mobiele weergave is niet stuk, dat heb ik uitgesloten. **Meet: GSC, filter op apparaat, vergelijk positie mobiel versus desktop op deze pagina.**
3. **Of nibud en boodschappen elkaar echt kannibaliseren.** Ik zie identieke getallen, identieke previews en dezelfde conclusie, maar ik kan niet zien of Google ze op dezelfde queries afwisselt. **Meet: GSC prestaties, filter per pagina, vergelijk de queries van beide pagina's.**
4. **Of de 12 afhakers de profielstap zagen of alleen de pagina laadden.** Zie 2b. **Meet: log `eerste_interactie` per stap, niet alleen bij mount.**
5. **Waarom de CTR op nibud 0,6 procent is bij positie 6,9.** Dat is zo laag dat er iets structureels aan de hand is: mogelijk word je getoond op queries waar je titel niet bij past, of je snippet wordt door Google herschreven. **Meet: GSC, deze pagina, kijk welke queries de vertoningen leveren.**
6. **Of de geldscan van 49 euro op het resultaatscherm zou converteren.** Ik weet zeker dat hij er niet staat. Ik weet niet of hij zou werken. Met 8 resultaten per maand kun je dat ook niet meten. Zet hem erin omdat het logisch is, niet omdat je het binnen een maand kunt bewijzen.

## Sectie 7. Aannames die je moet controleren

1. **Ik ga ervan uit dat de vier persona-kaarten en de drie huishoudens in het boodschappenartikel geen echte, met toestemming gebruikte klanten zijn.** Als Mats en Elsa, Jurgen en Rachel en Sophie wél echte klanten zijn, is mijn kritiek op die punten onterecht en hoef je alleen het label toe te voegen.
2. **Ik ga ervan uit dat je bezoekcijfers pageviews zijn en de GSC-cijfers klikken**, en dat die twee dus niet één op één vergelijkbaar zijn. Als je Bezoekers-tab iets anders telt, kloppen mijn ratio's niet.
3. **De CTR-percentages die ik gebruik zijn branchevuistregels, geen meting.** Ik heb geen tool en ik heb ze niet opgezocht. Behandel de klikprognoses in sectie 3 als orde van grootte.
4. **De 3 tot 8 procent inschrijfratio voor een inline mailblok is een vuistregel**, geen cijfer uit jouw data of uit een bron. Jouw eigen ratio kan de helft of het dubbele zijn.
5. **Ik ga ervan uit dat de GSC-periode (24 juni tot 22 juli) en je eigen 30 dagen ongeveer dezelfde periode dekken.** Ze lopen niet gelijk, dus vergelijkingen tussen beide tabellen hebben een marge van een paar dagen.
6. **Ik ga ervan uit dat er sinds 19 juli niets aan de artikelen is gewijzigd.** Ik heb de code van vandaag gelezen en die vergeleken met de live site; die kwamen overeen, maar ik heb geen git-log doorgenomen.
7. **Ik ga ervan uit dat de nummering in `quiz_voortgang` overeenkomt met de stappen zoals ik ze in `QuizClient.tsx` lees**, dus stap 1 = profiel, stap 2 = inkomsten. Klopt die mapping niet, dan valt mijn conclusie in 2b weg.

---

*Opgesteld 25 juli 2026. Bevindingen zijn gebaseerd op de code in deze repo, de live site op www.waarblijfthet.nl en de door Jarno aangeleverde cijfers van 25 juli 2026. Er zijn geen cijfers, bronnen of klantvoorbeelden aan toegevoegd.*
