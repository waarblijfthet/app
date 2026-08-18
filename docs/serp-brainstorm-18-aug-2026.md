# SERP-brainstorm en validatie, 18 aug 2026

Twee dingen in dit document. Eerst de controle op wat er 17 aug is gebouwd,
daarna een brede brainstorm met 107 zoekzinnen, gevalideerd en gescoord, en
een top 10.

Alle validatie is zelf gedaan: Search Console via /admin/zoekwoorden (28 dagen,
18 jul tot 15 aug 2026) en echte SERP's op google.nl. Per regel staat welk
bewijs eronder zit, zodat je een rij kunt wegstrepen als je het bewijs te dun
vindt.

---

## Deel 1. Controle op het werk van 17 augustus

### Wat klopt

De bouw zelf is er en is consistent. `niet-rondkomen-met-4000-euro-netto` en
`huishoudboekje-voorbeeld` bestaan, staan in `lib/inzichten-data.ts` en zijn
geregistreerd in `ArticleBody.tsx`. `npx tsc --noEmit --incremental false`
draait schoon, exit 0. De 83 artikelen in de data hebben allemaal een
bijbehorend content-component, dus geen wezen.

Het omslagpunt is narekenbaar. Met `VUISTREGEL` uit `lib/salaris-vuistregel.ts`
komt een gezin met twee kinderen en een eigen auto op €4.000 netto uit op
€53 tekort. Dat is exact wat het logboek claimt. De keuze om `omslagpunt()`
naar de lib te verplaatsen is de juiste.

De beslissing bij klus 8, geen artikel over "is 6.000 netto een goed salaris",
wordt door de Search Console-data harder bevestigd dan Sonnet zelf kon zien.
Zie deel 2, sectie A.

### Zes dingen die niet kloppen

**1. De "38 huishoudboekjes" is een verslechtering, geen correctie.**
Het logboek van klus 9 meldt met zoveel woorden dat de bezwaartoets "dertig"
verving door het "zelf geverifieerde 38" omdat de pagina van Wijzer in
geldzaken dat zou melden. Die pagina zegt letterlijk dat zij de 30 meest
gebruikte huishoudboekjes hebben meegenomen die niet meer dan 50 euro per jaar
kosten. Het getal 38 staat er nergens. Het oorspronkelijke getal was dus goed
en is met een verificatieclaim erbij fout gemaakt. Staat nu op twee plekken in
`huishoudboekje-voorbeeld.tsx`, regel 44 en 79.

**2. De €200 aan abonnementen staat nog op de pillar.**
Klus 7 haalde deze ongesourcete claim weg uit `alleen-wonen-goed-salaris-toch-krap`
en meldde hem als sitebreede schuld. Hij staat nog steeds in
`goed-salaris-toch-krap.tsx` regel 69, precies de pagina die klus 2 tot pillar
promoveerde: "Een gemiddeld huishouden betaalt inmiddels meer dan €200 per
maand aan abonnementen, terwijl de meesten het op de helft schatten." Geen
bron, en `VUISTREGEL.abonnementen` staat op 150. De belangrijkste pagina van
het cluster spreekt de eigen rekenaar tegen.

**3. €65.000 bruto voor €4.000 netto is te laag, op vijf plekken.**
Met de tarieven 2026 hoort daar ongeveer €67.900 bij als de €4.000 inclusief
vakantiegeld is, en ongeveer €75.600 als het exclusief vakantiegeld is. Staat
in `is-5000-euro-netto-goed-salaris.tsx` (2x) en in `lib/inzichten-data.ts`
regels 3000, 3180 en 3185. Het argument eromheen blijft overeind, maar het
bedrag moet omhoog en er moet bij staan of vakantiegeld meetelt.

**4. Een FinBuddy-onderzoek dat niet bestaat.**
`lib/inzichten-data.ts` regel 3236: "Meer dan een kwart van de Nederlandse
huishoudens spaart structureel niets, blijkt uit CBS-data en onderzoek van
FinBuddy." FinBuddy heeft geen eigen onderzoek hierover, CBS publiceert dit
cijfer niet. Het "ruim een kwart" komt uit het pensioenonderzoek van Brand New
Day, augustus 2025. Deze zin moet weg of herbronnen.

**5. Een CBS-attributie die geen CBS-cijfer is.**
Regel 1676 en `hoeveel-geld-overhouden-einde-maand.tsx` regel 118: "ongeveer een
op de vijf huishoudens minder dan €1.000 achter de hand", in dezelfde zin als
twee echte CBS-cijfers. De mediaan €21.500 en het gemiddelde €54.700 kloppen
wel, CBS tabel 83834NED, 2024 voorlopig. De €1.000-grens publiceert CBS niet.

**6. Het logboek zegt 72 artikelen, het zijn er 83.**
Klus 10 meldt "alle 72 artikelen in `lib/inzichten-data.ts` doorgelopen". Er
staan er 83 in. Elf artikelen zijn dus mogelijk niet bekeken voor de
CTA-controle. Het eindresultaat, 13 met een `cta`-veld en 6 met een
situatieparameter, is wel correct.

### Twee kleinere dingen

`omslagpunt()` rondt af met `Math.round`, dus voor een gezin met twee kinderen
komt er €4.080 uit terwijl de formule op €4.080 nog €1 tekort geeft. Wie het
bedrag in de rekenaar op dezelfde pagina intypt, ziet de pagina zichzelf
tegenspreken. `Math.ceil(i / 10) * 10` lost dit op.

De pillar zegt dat boodschappen voor een gezin met twee kinderen "€700 tot
€900" is, terwijl `berekenVuistregel()` voor precies dat huishouden op €1.000
uitkomt. Twee getallen voor hetzelfde huishouden, op pagina's die naar elkaar
linken.

Niet te controleren van hieruit: de Nibud-norm voor boodschappen en de
25 procent voor twee kinderen. Nibud.nl blokkeert geautomatiseerd opvragen.
Beide moeten met de hand nagekeken worden, want de secundaire bronnen lopen
van 17 tot 33 procent en van €365 tot €700 uiteen.

---

## Deel 2. Wat de Search Console laat zien

28 dagen, 62 klikken, 925 vertoningen, CTR 6,7 procent, gemiddelde positie 7,1.
Drie dingen vallen op.

**A. De site trekt salarisverkeer, niet budgetverkeer.**
Van de vertoningen gaat het overgrote deel naar bedragvragen en naar
bruto-netto-omrekeningen. "4500 bruto naar netto" 19 vertoningen op positie
2,4 met nul klikken. "4000 netto naar bruto" 31 vertoningen op positie 1,1 met
drie klikken. Daarnaast tientallen varianten met één vertoning: 3400, 3700,
3800, 3825, 4300, 4600, 4700, 48000, 60000. Plus een lange staart die niets
met de ICP te maken heeft: accountmanager salaris, salaris vuilnisman, apotheek
Kortenaken, aandeel Bekaert, basic fit Wolvega.

Dat is precies de kanteling die klus 8 vaststelde boven de €6.000, maar hij
geldt op elk bedrag. De SERP voor "4000 netto naar bruto berekenen" bestaat
volledig uit rekentools: Randstad, BerekenHet, Independer, YoungCapital,
Loonwijzer. Waar blijft het komt daar niet in voor. Conclusie: geen
rekenmachinepagina bouwen. Dat verkeer converteert niet naar een Geldscan en
je verliest van partijen met tien keer je autoriteit.

**B. De CTR op de winnende positie is te laag.**
"is 4000 netto een goed salaris": 224 vertoningen, positie 3,1, CTR 5,4
procent. Op positie 3 hoort dat richting 10 tot 15 procent te liggen. Voor
"is 5000 netto per maand veel" is het 2,2 procent op positie 3,3, en voor "is
4000 euro netto per maand veel" 2,5 procent op positie 4,5. Er staat dus een
titel en description boven die de zoeker niet overtuigt. Dit is meer waard dan
een nieuw artikel: bij gelijke positie zou verdubbeling van de CTR op deze drie
zoekwoorden alleen al ongeveer 15 klikken per maand extra opleveren, een kwart
van het huidige totaal.

**C. Voor de eigen kernbelofte ranken jullie niet.**
Ik zocht "niet rondkomen ondanks goed inkomen" op google.nl. Waar blijft het
staat nergens in de top tien. Daar staan NU.nl, Nibud, Reddit, Intermediair,
Divosa en een bewindvoerderssite. De gerelateerde zoekopdrachten van Google
gaan bovendien naar beneden, niet naar boven: rondkomen van 1400, 2000, 2500
euro. De kop van deze markt is een laaginkomenvraag. Jullie ICP zit
uitsluitend in de varianten met een bedrag of een huishoudtype erbij, en dat
is precies waar de site nu op rankt. Goed nieuws voor de strategie, slecht
nieuws voor wie hoopt de generieke term te pakken.

**D. Eén pagina rankt al op plek 1 waar het echt over gaat.**
Voor "boodschappen gezin met pubers kosten per maand" staat
`wat-is-normaal-bedrag-boodschappen-per-maand` op plek 1, met de tabelregel
"Gezin met pubers, €822, €1.000 tot €1.400" in het snippet. Dat format werkt.
Het is het bewijs dat de doorgerekende tabel de winnende vorm is, niet het
betoog.

---

## Deel 3. Scoringsmodel

Vijf assen, opgeteld naar maximaal 35 punten.

| As | Weging | Wat 5 betekent |
|---|---|---|
| Vraagsignaal | x1 | Hard bewijs: GSC-vertoningen, PAA-vraag, gerelateerde zoekopdracht, groot Reddit-draad |
| Concurrentiegat | x1,5 | Niemand beantwoordt de vraag voor een huishouden, of de bronnen spreken elkaar tegen |
| ICP-fit | x2 | Zoeker heeft een goed inkomen en toch te weinig over |
| Conversiepad | x1,5 | Loopt natuurlijk uit op de gratis analyse of de Geldscan van €49 |
| Geen kannibalisatie | x1 | Geen bestaande pagina van de 83 pakt dit al |

ICP-fit weegt dubbel omdat een pagina zonder ICP-fit verkeer aantrekt dat nooit
€49 betaalt, precies het probleem dat de bruto-netto-vertoningen nu al laten
zien.

Bewijskolom: **GSC** is Search Console-data, **SERP** is een door mij bekeken
resultatenpagina, **PAA** is een "Meer om te vragen"-vraag van Google,
**REL** is een gerelateerde zoekopdracht van Google, **SCH** is mijn
inschatting zonder direct bewijs.

---

## Deel 4. De longlist, 107 zoekzinnen gescoord

V = vraagsignaal, G = concurrentiegat, I = ICP-fit, C = conversiepad,
K = geen kannibalisatie. Score = V + 1,5G + 2I + 1,5C + K, maximaal 35.

### A. Inkomensbedragen en bruto-netto

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | is 4000 netto een goed salaris | GSC 224 vert., pos 3,1, CTR 5,4% | wij op 3 | ja, pillar | 5 | 2 | 5 | 5 | 1 | 26,5 |
| 2 | is 4200 netto een goed salaris | GSC 22 vert., pos 8,0 | versnipperd | tabelregel | 3 | 3 | 5 | 4 | 3 | 26,5 |
| 3 | is 5000 netto per maand veel | GSC 45 vert., pos 3,3, CTR 2,2% | wij op 3 | ja | 4 | 2 | 5 | 5 | 1 | 25,5 |
| 4 | is 4000 euro netto per maand veel | GSC 40 vert., pos 4,5, CTR 2,5% | wij op 4 | ja | 4 | 2 | 5 | 5 | 1 | 25,5 |
| 5 | 5000 euro netto per maand | GSC 31 vert., pos 26,5 | onduidelijk | zwak | 4 | 3 | 4 | 4 | 2 | 24,5 |
| 6 | 3600 netto goed salaris | GSC pos 1,0 | leeg | tabelregel | 2 | 3 | 5 | 4 | 3 | 25,5 |
| 7 | is 3500 netto een goed salaris gezin | GSC "3500 netto per maand" pos 1,0 | leeg | tabelregel | 3 | 3 | 5 | 4 | 3 | 26,5 |
| 8 | samen 6000 netto en toch niets over | GSC-context | Reddit | ja | 2 | 4 | 5 | 5 | 2 | 27,5 |
| 9 | 2x modaal inkomen netto | GSC pos 2,0 | leeg | deels | 2 | 3 | 4 | 3 | 3 | 22 |
| 10 | mediaan inkomen nederland | GSC 5 vert., pos 1,0 | CBS | ja | 2 | 2 | 3 | 2 | 2 | 16 |
| 11 | wat is een hoog salaris in nederland | REL bij klus 8 | beroepensites | nee | 3 | 2 | 2 | 2 | 4 | 17 |
| 12 | 4000 netto naar bruto | GSC 31 vert., pos 1,1 | Randstad, BerekenHet, Independer | nee | 5 | 1 | 1 | 1 | 4 | 14 |
| 13 | 4500 bruto naar netto | GSC 19 vert., pos 2,4, 0 klikken | rekentools | nee | 5 | 1 | 1 | 1 | 4 | 14 |
| 14 | hoeveel bruto is 4000 netto | GSC 7 vert., pos 1,0 | rekentools | nee | 3 | 1 | 2 | 2 | 4 | 15,5 |

### B. Boodschappen

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 15 | gemiddelde kosten boodschappen 2 personen per maand | REL | Nibud, FinBuddy | tabelregel | 5 | 3 | 3 | 3 | 2 | 22 |
| 16 | gemiddelde kosten boodschappen 3 personen per maand | REL | idem | tabelregel | 4 | 3 | 3 | 3 | 2 | 21 |
| 17 | gemiddelde kosten boodschappen 4 personen per maand | REL | idem | tabelregel | 5 | 3 | 3 | 3 | 2 | 22 |
| 18 | nibud boodschappen per maand alleenstaande | REL | Nibud | tabelregel | 4 | 3 | 3 | 3 | 2 | 21 |
| 19 | boodschappen gezin met pubers per maand | SERP, wij op plek 1 | wij | ja, plek 1 | 4 | 2 | 4 | 4 | 1 | 22 |
| 20 | 100 euro per week boodschappen | GSC pos 3,0 | blogs | deels | 2 | 4 | 3 | 3 | 4 | 22,5 |
| 21 | wat geeft een gemiddeld gezin uit aan boodschappen per maand | GSC 12 vert., pos 9,3 | Nibud, Reddit | ja | 3 | 2 | 4 | 4 | 1 | 21 |
| 22 | boodschappenbudget gezin van 4 realistisch | SCH | Porterenee, Francesca Kookt | deels | 3 | 3 | 4 | 4 | 3 | 24,5 |
| 23 | waarom zijn boodschappen zo duur geworden 2026 | SCH | nieuws | nee | 4 | 2 | 3 | 2 | 4 | 20 |
| 24 | 2 pubers boodschappen kosten | GSC "2 pubers" pos 11,0 | Porterenee | deels | 2 | 4 | 4 | 4 | 3 | 25 |

### C. Kinderopvang en het tweede inkomen

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 25 | kinderopvangtoeslag 2027 berekenen | REL, geverifieerd | SRA, Moore DRV, BOinK, alleen B2B | nee | 4 | 5 | 5 | 5 | 5 | **34** |
| 26 | bedragen kinderopvangtoeslag 2027 | REL | branchesites | nee | 4 | 5 | 4 | 4 | 5 | 30,5 |
| 27 | kinderopvang 2027 kosten | REL | branchesites | nee | 4 | 5 | 4 | 4 | 5 | 30,5 |
| 28 | kinderopvang gratis 2027 | REL | branche, politiek | nee | 5 | 3 | 3 | 3 | 5 | 25 |
| 29 | uurtarief kinderopvang 2027 | REL | Performa HR | nee | 3 | 2 | 2 | 2 | 5 | 18 |
| 30 | wat scheelt 1 dag minder werken | PAA | Reddit r/DutchFIRE 170 reacties | deels | 4 | 4 | 5 | 5 | 3 | 30,5 |
| 31 | wat is voordeliger, minder werken of kinderopvang | PAA | Reddit, Intermediair | deels | 4 | 4 | 5 | 4 | 3 | 29 |
| 32 | bso kosten twee kinderen per maand | SCH | leeg | ja, artikel | 3 | 3 | 4 | 4 | 2 | 23,5 |
| 33 | gastouder of dagopvang goedkoper | SCH | branchesites | nee | 3 | 3 | 3 | 2 | 5 | 21,5 |

### D. Hypotheek en wonen

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 34 | leven op je maximale hypotheek | SERP, Reddit-draad 49 posts | Reddit, DNB, geen huishoudverhaal | nee | 3 | 5 | 5 | 5 | 4 | **32** |
| 35 | te hoge hypotheek afgesloten wat nu | SERP | HomeFinance, Eigen Huis | nee | 3 | 3 | 4 | 4 | 5 | 26,5 |
| 36 | hypotheeklasten te hoog 2026 | SERP, NOS 21 mei 2026 | nieuws, geen doorrekening | nee | 4 | 4 | 5 | 4 | 5 | **31** |
| 37 | woonlasten percentage van inkomen normaal | SCH | Nibud | deels | 3 | 3 | 5 | 4 | 3 | 26,5 |
| 38 | overwaarde opnemen om rond te komen | SCH | banken | nee | 2 | 4 | 4 | 4 | 5 | 27 |
| 39 | hypotheek verhogen voor verbouwing maandlasten | SCH | banken | ja, verbouwartikel | 3 | 3 | 4 | 4 | 2 | 23,5 |
| 40 | vve bijdrage gestegen wat nu | SCH | leeg | nee | 2 | 4 | 3 | 3 | 5 | 23,5 |
| 41 | huur te hoog voor mijn inkomen | SCH | huurdersorganisaties | nee | 3 | 3 | 3 | 3 | 5 | 23 |
| 42 | erfpacht canon stijging maandlasten | SCH | gemeenten | nee | 2 | 4 | 3 | 2 | 5 | 22 |
| 43 | van huur naar koop maandlasten vergelijken | SCH | rekentools | nee | 3 | 2 | 3 | 3 | 5 | 21,5 |
| 44 | hoeveel moet je verdienen voor 400.000 hypotheek | PAA-variant | rekentools | nee | 4 | 1 | 2 | 1 | 5 | 16 |
| 45 | tweede huis kost meer dan het opbrengt | SCH | leeg | nee | 2 | 3 | 2 | 2 | 5 | 18,5 |

### E. Sparen en buffer

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 46 | hoe sparen als alleenstaande | REL | Porterenee, blogs | deels | 4 | 3 | 4 | 4 | 3 | 25,5 |
| 47 | waarom verdien ik veel en spaar ik niets | SERP, budgetbuddy + MijnVermogen 26 mei 2026 | concurrenten | ja | 4 | 2 | 5 | 5 | 1 | 25,5 |
| 48 | hoeveel buffer heb ik nodig als gezin | SCH | Nibud | deels | 3 | 3 | 4 | 4 | 3 | 24,5 |
| 49 | sparen voor je kind hoeveel per maand | SCH | banken | deels | 4 | 3 | 3 | 3 | 4 | 23 |
| 50 | nibud spaargeld per leeftijd | REL | Nibud, Raisin | nee | 4 | 2 | 3 | 3 | 5 | 22,5 |
| 51 | ik kan niet sparen | REL | veel | ja | 5 | 2 | 3 | 4 | 1 | 21 |
| 52 | spaargeld gemiddeld per leeftijd nederland | REL | CBS, Raisin | deels | 4 | 2 | 3 | 3 | 3 | 20,5 |
| 53 | extreem sparen | REL | blogs | nee | 3 | 2 | 2 | 2 | 5 | 18 |

### F. Pubers en studerende kinderen

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 54 | wat kost een studerend kind dat thuis woont | SERP, bronnen lopen van €109 tot €900 uiteen | volledig versnipperd | nee | 4 | 5 | 4 | 4 | 5 | **30,5** |
| 55 | wat kost een studerend kind per jaar | REL | Studiekeuzemaken, NN | nee | 4 | 4 | 4 | 4 | 5 | 29 |
| 56 | hoeveel moet ik bijdragen aan een studerend kind | PAA | Nibud, Geldloket | nee | 4 | 4 | 4 | 4 | 5 | 29 |
| 57 | wat kost een puber per maand | SERP, digimama 30 jan 2026 | één blog | deels | 4 | 4 | 4 | 4 | 4 | 28 |
| 58 | kinderbijslag stopt op 18, wat dan | SCH | leeg | nee | 3 | 4 | 4 | 4 | 5 | 28 |
| 59 | kind op kamers, wat kost dat de ouders | REL | versnipperd | nee | 3 | 4 | 4 | 4 | 5 | 28 |
| 60 | zakgeld puber hoeveel is normaal | SCH | Nibud | nee | 4 | 2 | 3 | 2 | 5 | 21 |
| 61 | nibud student bijdrage ouders | REL | Nibud zelf | nee | 4 | 1 | 3 | 2 | 5 | 19,5 |

### G. Verzekeringen en zorg

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 62 | eigen risico 2027, wat betekent dat voor mijn maandlasten | SCH | vergelijkers | nee | 4 | 4 | 3 | 3 | 5 | 25,5 |
| 63 | dubbel verzekerd zonder het te weten | SCH | leeg | nee | 2 | 4 | 3 | 4 | 5 | 25 |
| 64 | zorgverzekering 2027 hoeveel duurder voor een gezin | SCH | vergelijkers | nee | 4 | 2 | 3 | 3 | 5 | 22,5 |
| 65 | overlijdensrisico en ao verzekering te duur | SCH | verzekeraars | nee | 2 | 3 | 3 | 3 | 5 | 22 |
| 66 | besparen op verzekeringen als gezin | SERP, volledig commercieel | Independer, Pricewise, Zorgwijzer, J/M | nee | 4 | 1 | 2 | 2 | 5 | 17,5 |
| 67 | tandartsverzekering wel of niet | SCH | vergelijkers | nee | 3 | 1 | 2 | 2 | 5 | 16,5 |

### H. Vaste lasten, energie en overzicht

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 68 | hoeveel zijn mijn vaste lasten gestegen in 2026 | SCH | leeg | nee | 3 | 4 | 4 | 4 | 4 | 27 |
| 69 | financieel overzicht maken voorbeeld | REL | ING, Nibud, Rabobank, alleen tools | deels | 5 | 3 | 3 | 4 | 3 | 24,5 |
| 70 | inkomsten en uitgaven overzicht excel | REL | tools en sjablonen | deels | 5 | 3 | 3 | 4 | 3 | 24,5 |
| 71 | wat zijn normale vaste lasten voor 2 personen | SCH | leeg | gezinsvariant | 4 | 3 | 4 | 4 | 2 | 24,5 |
| 72 | vaste lasten overzicht excel | REL | Rabobank, blogs | ja, artikel | 5 | 3 | 3 | 4 | 2 | 23,5 |
| 73 | energierekening te hoog gezin 2026 | SCH | vergelijkers | nee | 4 | 2 | 3 | 3 | 5 | 22,5 |
| 74 | gemeentelijke lasten gestegen wat kan ik doen | SCH | gemeenten | nee | 2 | 3 | 2 | 2 | 5 | 18,5 |

### I. Vervoer

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 75 | twee auto's te duur per maand | SCH | leeg | nee | 3 | 4 | 5 | 4 | 4 | **29** |
| 76 | auto van de zaak of eigen auto, wat houd je over | SCH | fiscalisten | deels | 3 | 4 | 4 | 4 | 3 | 26 |
| 77 | tweede auto wegdoen, hoeveel bespaar je | SCH | leeg | nee | 2 | 4 | 4 | 4 | 4 | 26 |
| 78 | wat kost een auto echt per maand | SCH | ANWB, blogs | ja, artikel | 4 | 2 | 4 | 4 | 1 | 22 |
| 79 | woon werk kilometers, wat kost het netto | SCH | leeg | nee | 2 | 3 | 3 | 3 | 5 | 22 |
| 80 | leaseauto bijtelling netto effect op mijn loon | SCH | rekentools | nee | 4 | 2 | 3 | 2 | 5 | 21 |

### J. Werk en uren

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 81 | meer uren werken, loont dat wel | PAA-context | Intermediair zegt van wel | deels | 3 | 4 | 5 | 4 | 3 | 28 |
| 82 | 32 uur werken in plaats van 40, netto effect | GSC pos 3,0 | rekentools | nee | 3 | 4 | 4 | 4 | 4 | 27 |
| 83 | loonsverhoging maar netto weinig over | GSC-context | leeg | ja, 2 artikelen | 4 | 3 | 5 | 5 | 1 | 27 |
| 84 | 4 dagen werken, netto verschil | SCH | rekentools | nee | 3 | 3 | 4 | 4 | 4 | 25,5 |
| 85 | van vast naar zzp, wat verandert er netto | SCH | boekhoudsites | nee | 3 | 3 | 3 | 3 | 5 | 23 |
| 86 | 24 uur werken salaris | GSC pos 2,0 | leeg | nee | 2 | 3 | 3 | 3 | 5 | 22 |

### K. Toeslagen en belasting

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 87 | net boven de inkomensgrens voor toeslagen | SCH | leeg | nee | 2 | 4 | 5 | 4 | 4 | **28** |
| 88 | kindgebonden budget 2027 wat verandert er | SCH | branchesites | nee | 3 | 4 | 4 | 4 | 5 | 28 |
| 89 | toeslagen kwijt door gaan samenwonen | SCH | Belastingdienst | variant aanwezig | 3 | 4 | 4 | 4 | 3 | 26 |
| 90 | alleenstaande ouderkop 2026 | GSC 2 vert., pos 10,5 | Belastingdienst | nee | 2 | 4 | 3 | 3 | 5 | 23,5 |
| 91 | te veel toeslag ontvangen, terugbetalen naast mijn vaste lasten | SCH | Belastingdienst | nee | 3 | 3 | 3 | 3 | 5 | 23 |
| 92 | vergeten aftrekposten belastingaangifte | SCH | veel | ja, artikel | 4 | 2 | 3 | 3 | 1 | 18,5 |

### L. Levensfases en gebeurtenissen

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 93 | scheiden met een goed inkomen en toch niks over | SERP, alles juridisch of scheidingsbranche | niemand doet het budget | nee | 3 | 5 | 4 | 5 | 5 | **31** |
| 94 | samengesteld gezin financieel rondkomen | SCH | leeg | nee | 2 | 5 | 4 | 4 | 5 | 28,5 |
| 95 | eerste kind, wat verandert er financieel | SCH | babysites | deels | 4 | 3 | 4 | 4 | 4 | 26,5 |
| 96 | tweede kind erbij, hoeveel duurder | SCH | Nibud | deels | 3 | 3 | 4 | 4 | 3 | 24,5 |
| 97 | met pensioen en toch krap | SCH | pensioenpartijen | pensioenartikel | 3 | 4 | 3 | 3 | 4 | 23,5 |
| 98 | arbeidsongeschikt, inkomen daalt, wat nu | SCH | verzekeraars | nee | 3 | 3 | 3 | 3 | 5 | 23 |
| 99 | mantelzorg kost mij geld | SCH | leeg | nee | 2 | 4 | 2 | 2 | 5 | 20 |

### M. Zzp en wisselend inkomen

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 100 | zzp met wisselend inkomen, hoe budgetteer je | SCH | boekhoudsites | deels | 3 | 4 | 4 | 4 | 3 | 26 |
| 101 | zzp met gezin, wat moet mijn uurtarief zijn om rond te komen | SCH | leeg | nee | 2 | 4 | 4 | 4 | 4 | 26 |
| 102 | zzp hoeveel per maand reserveren | SCH | boekhoudsites | deels | 4 | 3 | 4 | 4 | 3 | 25,5 |

### N. Gevoel, schaamte en nieuws

| # | Zoekzin | Bewijs | Wat er nu staat | Hebben wij | V | G | I | C | K | Score |
|---|---|---|---|---|---|---|---|---|---|---|
| 103 | schamen dat je niet rondkomt met een goed inkomen | SCH | niemand | deels | 2 | 5 | 5 | 5 | 3 | **30** |
| 104 | rondkomen met 1 loon | REL | blogs | nee | 4 | 3 | 4 | 4 | 5 | 27,5 |
| 105 | geldstress ondanks een goed inkomen | SERP, Intermediair 2023 | Intermediair, Tweakers | ja | 4 | 3 | 5 | 5 | 1 | 27 |
| 106 | financieel vastzitten door fouten uit het verleden | SERP, Reddit 23 jun 2026 | Reddit | nee | 3 | 4 | 4 | 4 | 4 | 27 |
| 107 | 40 procent van de huishoudens komt moeilijk rond | SERP, NU en NOS 23 jun 2026 | nieuwsmedia | nee | 4 | 3 | 4 | 4 | 4 | 26,5 |

---

## Deel 5. De top 10

Geclusterd naar pagina, want zoekzin 25, 26 en 27 zijn samen één artikel.

| Rang | Pagina | Score | Dekt | Waarom nu |
|---|---|---|---|---|
| 1 | Kinderopvangtoeslag 2027, wat dit met je maandbudget doet | 34 | 25, 26, 27, 28, 29 | De vergoeding gaat in 2027 naar 96 procent voor de eerste stap, en de hele SERP bestaat uit accountants- en branchesites die voor werkgevers schrijven. Niemand vertelt twee ouders met een goed inkomen wat er per maand verandert. Google levert zelf al "kinderopvangtoeslag 2027 berekenen" en "bedragen kinderopvangtoeslag 2027" als gerelateerde zoekopdracht, dus de vraag is er nu en groeit tot januari. |
| 2 | Leven op je maximale hypotheek | 32 | 34, 35, 36, 37 | Reddit-draad met 49 posts, NOS-artikel van 21 mei 2026 over verslechterende huiseigenaren, en aan de andere kant alleen DNB-beleidstaal en HomeFinance. Perfecte ICP: goed inkomen, maximale lasten, niets over. De vuistregel kan dit letterlijk doorrekenen met `woonlastPctTwee`. |
| 3 | Scheiden met een goed inkomen en toch niks over | 31 | 93 | De hele SERP is juridisch of scheidingsbranche, plus één coach. Niemand rekent één huishouden om naar twee. Dit is bovendien precies de brug naar de relatietherapeutenpagina die er al staat, dus het conversiepad is al gebouwd. |
| 4 | Wat kost een studerend kind dat thuis woont | 30,5 | 54, 55, 56, 61 | De bronnen spreken elkaar hard tegen: Nibud €137, Geldloket €109, Studiekeuze LAB €605, Studiekeuzemaken €800 tot €900. Zo'n tegenspraak is de beste kans die er is, want één doorgerekend huishouden maakt er meteen een einde aan. Sluit aan op de bestaande schoolkosten- en kindkosten-artikelen. |
| 5 | Wat scheelt één dag minder werken echt | 30,5 | 30, 31, 81 | Twee PAA-vragen van Google, een Reddit-draad met 170 reacties, en Intermediair dat het tegendeel beweert. Een doorrekening met kinderopvangtoeslag, kindgebonden budget en schijven erin is precies wat er ontbreekt, en het is de vraag die de tweede-inkomen-artikelen nu maar half raken. |
| 6 | Schamen dat je niet rondkomt met een goed inkomen | 30 | 103 | Volumesignaal is zwak, dus dit is de gok van de tien. Maar niemand bezet het, de ICP-fit is maximaal, en het is de emotie die de gratis analyse verkoopt. Bouw dit kort en link het vanuit de pillar. |
| 7 | Twee auto's, wat kost de tweede echt | 29 | 75, 76, 77 | `VERVOER` heeft al de sprong van €350 naar €650 in de code staan, dus de doorrekening kost bijna niets. Leeg veld, hoge ICP-fit bij tweeverdieners buiten de stad. |
| 8 | Samengesteld gezin, twee huishoudens in één budget | 28,5 | 94 | Grootste gat van de hele lijst, en niemand schrijft erover. Volume is onbewezen, dus zet dit na nummer 7 en meet het. |
| 9 | Wat kost een puber per maand, en wat er gebeurt als de kinderbijslag stopt | 28 | 57, 58, 59, 60 | Eén blog (digimama, 30 jan 2026) bezet dit nu. De boodschappenpagina rankt al op plek 1 voor "gezin met pubers", dus er is bewezen autoriteit op dit huishoudtype om vanaf te linken. |
| 10 | Net boven de inkomensgrens voor toeslagen | 28 | 87, 88 | De klassieke "ik verdien meer en houd minder over"-val. Sluit aan op het bestaande toeslag-kwijt-artikel maar vanuit de grens in plaats van de loonsverhoging. |

### Wat je expliciet niet moet bouwen

| Zoekzin | Score | Reden |
|---|---|---|
| 4000 netto naar bruto, 4500 bruto naar netto en de tientallen varianten | 14 | Rekentool-intentie. De SERP is Randstad, BerekenHet, Independer, YoungCapital en Loonwijzer. Deze vertoningen zijn nu al de grootste post in Search Console en leveren nul klikken en nul Geldscans. |
| hoeveel moet je verdienen voor 400.000 hypotheek | 16 | Zelfde probleem, hypotheekadviseurs en rekentools. |
| besparen op verzekeringen als gezin | 17,5 | Affiliate-terrein. Independer, Pricewise en Zorgwijzer verdienen aan de klik, jullie niet. |
| uurtarief kinderopvang 2027 | 18 | Branchevraag, geen ouderbudgetvraag. Pak wel nummer 1 uit de top 10, niet dit. |

### Belangrijker dan artikel nummer 11

De CTR op de drie best rankende zoekwoorden is 5,4, 2,5 en 2,2 procent op
posities 3,1, 4,5 en 3,3. Dat is drie tot vijf keer onder wat die posities
horen op te leveren. Samen zijn dat 309 vertoningen per 28 dagen. Naar een
normale CTR van 10 procent gaat dat van 14 naar ongeveer 30 klikken, en dat is
zonder één woord nieuwe content. Test eerst titel en meta-description van
`is-4000-euro-netto-goed-salaris-nederland`, `is-5000-euro-netto-goed-salaris`
en `niet-rondkomen-met-4000-euro-netto`, en meet vier weken.
