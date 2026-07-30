# Plan van aanpak: vijf echte geldscans inzetten als bewijs (30-jul-2026)

Vijf ingevulde geldscans met advies en evaluatie. Dit is het materiaal waarop het hele vertrouwensverhaal kan draaien, want het is het eerste op de site dat geen belofte is maar geleverd werk. Onder aan dit document staat de fasering. Eerst één ding dat vooraf moet.

## 0. De poort: wat is de status van deze vijf?

Ik moet dit weten voordat er één regel copy op de site komt, en het is niet terug te draaien als het fout gaat.

De vijf profielen (gezin met oudere kinderen, alleenstaand, alleenstaande ouder, stel zonder kinderen, zzp met wisselend inkomen) zijn precies de vijf situaties die ik je in `docs/aanleverformat-voorbeeldrapporten-30-jul-2026.md` heb aangeraden. Dat kan betekenen dat je gericht die vijf hebt opgehaald. Het kan ook betekenen dat ze naar die specificatie zijn opgebouwd. Ik kan dat aan de bestanden niet zien, en het verschil bepaalt alles.

**Zijn het echte klanten**, dan is dit je sterkste bewijs en geldt: schriftelijke toestemming per persoon, apart voor het rapport en voor de nameting, en pas publiceren nadat die persoon de te publiceren versie heeft gelezen. Bedragen blijven exact zoals ze zijn, namen en herkenbare details veranderen. Zie sectie 5 en 6 van het aanleverformat.

**Zijn ze samengesteld**, dan mogen ze als uitgewerkt voorbeeld op de site, maar dan geldt: geen woord "klant", geen "wat het hem opleverde", en de evaluatieblokken kunnen niet als uitkomst worden gepresenteerd. Een nameting die niet gemeten is, is geen nameting. Ze zijn dan nog steeds beter dan wat er nu staat (vijf situaties in plaats van twee, met plan en evaluatie), maar ze zijn geen bewijs en de pagina mag niet suggereren dat ze dat zijn.

**Is het een mix**, dan splitsen en per rapport labelen. Eén verkeerd gelabeld geval besmet de andere vier, en dat is het enige risico in dit hele plan dat je merk kan slopen. Werkregel 4 bestaat hiervoor.

De rest van dit plan is verder identiek voor beide routes, behalve de woorden "klant" en "resultaat".

## 1. Wat er in het materiaal zit

| Situatie | Netto per maand | Eigen vermoeden vooraf | Wat eruit kwam | Nameting | Vervolggesprek |
|---|---|---|---|---|---|
| Zzp plus partner in loondienst, koop, geen kinderen | 4.600 privé plus 3.150, HRA 245 | "We geven privé te veel uit", mist 700 | Geen privélek. Een grillig inkomen werd behandeld als vast salaris | Na 4 maanden zakelijke buffer en privéreserveringen hoger | Ja |
| Stel eind 30, geen kinderen, koopappartement | 3.750 plus 3.050, HRA 190 | "We geven te makkelijk uit", mist 700 tot 900 | Geen lek. De levensstijl botst met het spaardoel: 40.000 in 36 maanden vraagt 1.110 per maand | 1.100 per maand automatisch apart, één trip geschrapt | Nee |
| Alleenstaande ouder, kinderen 7 en 11, 80 procent bij haar, koop | 4.850 plus 195 kinderbijslag plus 420 alimentatie, HRA 235 | "Mijn vaste basis is duur voor één inkomen", mist 400 tot 500 | Krapte deels logisch. Structuur nooit aangepast na de scheiding | Na 3 maanden buffer groeit met 500 per maand en blijft staan, geen bezuinigingen | Ja |
| Alleenstaand begin 30, huur | 3.650 | "Bestellen, uitgaan, online", 300 tot 400 | Vaste basis zwaar voor één persoon. Het verschil zat tussen wat ze dacht en wat werkelijk wegging | Na 3 maanden 250 per maand hoger dan gedacht, buffer plus 1.200 | Ja |
| Tweeverdieners, drie kinderen 9, 12 en 14, koop, twee auto's | 4.050 plus 3.250 plus 310 kinderbijslag, HRA 270 | Hij boodschappen en kinderen, zij de losse uitgaven. Mist 500 tot 750 | Geen enkele buitensporige vaste last. Jaaruitgaven werden niet gereserveerd | Na 3 maanden bleef circa 850 per maand echt staan. De partner had gelijk | Nee |

## 2. Waarom dit materiaal sterk is, en waar de kracht precies zit

Niet in de bedragen. In vier dingen die geen concurrent op zijn site heeft staan.

**Twee van de vijf keer is de uitkomst dat er niets misgaat.** Dat is exact het signaal dat vijf van de vijf testers als sterkste onderdeel van de site noemden. Het bewijst dat het product geen bezuinigingsmachine is. Dit is het meest waardevolle dat in deze vijf documenten zit en het moet op de index prominent zichtbaar zijn, niet weggestopt in een detailpagina.

**Vier van de vijf hadden het bij zichzelf mis.** Dat is de hele verkoopreden van het product, en het staat nu in hun eigen woorden. De alleenstaande dacht bestellen en uitgaan, en dat bleek te kloppen maar 250 euro groter dan gedacht. Het gezin dacht boodschappen, en de partner die dacht "alle kleine uitgaven" had gelijk. De zzp'er dacht te veel uitgeven en het was cashflow.

**Het bewijst dat route 2 werkt.** In deze vijf staan de dingen die de vergelijking niet weet en die je gisteren bent gaan uitvragen: leeftijden 7, 11, 9, 12, 14, verblijfsverdeling 80 procent, alimentatie 420 euro, belastingreservering 35 procent, een auto van de zaak. Zonder die vragen was geen van de vijf adviezen mogelijk geweest. Dat is niet iets wat je beweert, dat is nu leesbaar.

**Twee van de vijf hadden geen vervolg nodig.** "Vervolggesprek: nee" publiceren is een sterker vertrouwenssignaal dan welke testimonial ook, want het is het tegenovergestelde van verkopen. Drie van de vijf wilden wel een gesprek, en dat is bovendien het eerste echte bewijs dat er onder het adviesgesprek van 125 euro vraag zit.

## 3. Menu en structuur

Nieuwe route, in de nav op desktop en mobiel. Het huidige `/voorbeeldrapport` blijft bestaan als redirect, zodat bestaande links, de sitemap en llms.txt niet breken.

- `/rapporten` als index met de vijf situaties
- `/rapporten/[slug]` per situatie, vijf pagina's
- Menulabel: **Rapporten**. Dat werkt op beide routes uit sectie 0 en het is het woord dat de bezoeker zoekt. Bij echte klanten kan het later "Klantrapporten" worden.

Positie in de nav: direct na Home, vóór Inzichten. Dit is nu je beste pagina, en de testers vonden het voorbeeldrapport pas nadat ik er een link naartoe had gezet.

De twee fictieve rapporten (Sandra en Tom, Niels) gaan eraf zodra deze vijf staan. Twee verzonnen huishoudens naast vijf echte maken het geheel zwakker, niet completer, en de testers waren daar eenduidig over: fictie is een demo, geen bewijs.

## 4. Visualisatie

**Bovenaan de index: kies je situatie.** Vijf chips, horizontaal scrollend op mobiel: alleenstaand, alleenstaande ouder, stel zonder kinderen, gezin met kinderen, zzp of wisselend inkomen. Eén klik naar je eigen geval. Dit lost het bezwaar op waar twee testers hun enige verandering van maakten: ze moesten zichzelf zoeken tussen gezinnen.

**Per kaart het contrast als hoofdelement, niet het bedrag.** Twee kolommen naast elkaar:

```
Wat ze zelf dachten            Wat eruit kwam
"We geven te makkelijk         Geen lek. Jullie
geld uit."                     levensstijl botst met
Mist 700 tot 900 per maand     jullie spaardoel.
```

Op mobiel wordt dat gestapeld met een streep ertussen. Dit is het object dat verkoopt, want de lezer denkt onmiddellijk: en wat zou dat bij mij zijn.

**Eén overzichtstabel onder de vijf kaarten**, met per situatie het vermoeden, de uitkomst, wat er veranderde en of er een vervolggesprek nodig was. Vijf keer dezelfde methode met vijf verschillende antwoorden is het bewijs dat er geen sjabloon onder zit. Precies die tabel is wat een journalist of verwijzer overneemt.

**Per rapportpagina elf blokken**: de negen uit het bestaande format, plus vooraan wat ze zelf dachten en achteraan de nameting met de doorlooptijd erbij. Hergebruik `Maandoverzicht` uit `/voorbeeldrapport`, dat component staat er al.

**Geen gemiddelden.** Bij vijf huishoudens publiceer je geen gemiddelde, om precies de reden dat de 460 euro eraf moest. Publiceer de verdeling: bij twee van de vijf was de conclusie dat er niets misging. Dat is een feit met een noemer erbij en het is sterker dan een euro-bedrag.

**Homepage**: het losse fragment van Sandra en Tom vervangen door de situatiekiezer met vijf ingangen plus één fragment. Dan ziet iedere bezoeker binnen tien seconden zijn eigen situatie staan.

## 5. Wat de betrouwbaarheid verder verhoogt

Op volgorde van effect per uur werk.

1. **Publiceer de input naast de output.** De ingevulde vragenlijst is de helft van het bewijs: die laat zien dat je werkelijk naar leeftijden, verblijfsverdeling en belastingreservering hebt gevraagd. Bijna niemand publiceert zijn eigen input, en het is precies wat een sceptische lezer wil controleren.
2. **Laat het blok "wat ik niet weet en waar ik naast kan zitten" per rapport staan.** In de fictieve rapporten staat dat al en het werkt. Bij een echt rapport werkt het sterker.
3. **Zet bij elke nameting de doorlooptijd en de datum.** "Na drie maanden bleef circa 850 euro staan" is een meting. "Gemiddeld 460 euro meer over" was dat niet. Dat verschil is het hele punt.
4. **Vermeld per rapport dat het met toestemming is gepubliceerd**, en bij de eerste twaalf dat de scan gratis was. Beide zijn al afgesproken.
5. **Publiceer de twee gevallen zonder vervolggesprek met die uitkomst erbij.** Weersta de neiging om onder elk rapport een knop naar het adviesgesprek te zetten. Eén CTA onderaan de index is genoeg. Een bewijs-pagina die verkoopt, verliest zijn functie als bewijs.
6. **De openstaande blokkade blijft `lib/benchmarks.ts`.** Er zit nog steeds geen bron onder de boodschappenbedragen en de vrij-besteedbaar-percentages. Met vijf echte huishoudens kun je in de rapporten leunen op de gevallen in plaats van op de vuistregel, maar het methodeblok dat de testers vroegen kan nog steeds niet, want dan moet je opschrijven waar die getallen vandaan komen. Dat is de laatste echte claim op de site die niet onderbouwd is.
7. **De 460 euro staat nog op twee plekken**: `app/financieel-coach/page.tsx:65` en het artikel over wat een coach kost. Nu je echte nametingen hebt, is er geen reden meer om een cijfer te laten staan dat je niet kunt verantwoorden.

## 6. Fasering

| Fase | Wat | Werk |
|---|---|---|
| 0 | Status van de vijf vaststellen, en bij echte klanten toestemming ophalen | jij, een dag doorlooptijd |
| 1 | `/rapporten` index met vijf kaarten, situatiekiezer en overzichtstabel. Nav-item desktop en mobiel. Redirect van `/voorbeeldrapport` | een halve dag |
| 2 | Vijf detailpagina's met elf blokken, inclusief de ingevulde vragenlijst | een dag |
| 3 | Homepage: situatiekiezer in plaats van het losse fragment. Fictieve rapporten eraf | twee uur |
| 4 | 460 euro van de laatste twee plekken, en sitemap, robots en llms.txt opnieuw genereren plus indienen in GSC | een uur |

Fase 1 tot en met 4 passen in twee dagen. Fase 0 is de enige die niet kan wachten en die ik niet voor je kan doen.

## 7. Het risico dat je moet afdekken

Er is precies één manier waarop dit plan misgaat, en dat is als er straks één rapport op de site staat dat als klantresultaat wordt gepresenteerd terwijl het dat niet is. Dan verliest niet dat ene rapport zijn waarde, maar ook de vier andere, en de testimonials, en de nametingen. Dit project heeft twee keer eerder een claim moeten terugdraaien (de 272 euro en de Nibud-uitsplitsing) en dat kostte alleen een correctie in een document. Dit zou zichtbaar zijn voor de mensen die je nu juist wilt overtuigen.

Dat is de reden dat sectie 0 bovenaan staat en niet onderaan.
