# Hoe zoekt de ICP? Autocomplete, SERP's en indexering, 12 oktober 2026

Vraag van Jarno: missen we keywords, SERP's of clusters die anderen wel hebben, of zoekt de doelgroep simpelweg niet?

## Werkwijze

- Chrome was niet bereikbaar. Alles op google.nl met `hl=nl&gl=nl` in de ingebouwde browser van de Claude-app, op Jarno's computer in Nederland. Niet met de WebSearch-tool.
- Autocomplete via `google.nl/complete/search?client=chrome&hl=nl&gl=nl`. Geen autocomplete betekent: te weinig zoekers om te tonen. Het is geen volume, wel een harde ondergrens.
- Per zoekterm de eerste 8 tot 9 organische resultaten, AI-overzicht ja of nee, "Meer om te vragen", Reddit ja of nee.
- GSC 90 dagen (11 juli tot 9 oktober) per pagina via `/api/admin/search-analytics`, indexering via `/api/admin/indexing/status` (inspecties van 7 tot 12 oktober).
- Uitsluitlijst: bedragen, boodschappen, coachtermen, partner en geld, geldmomenten en bankapp-termen zijn eerder getoetst (zie de serp-documenten van juli tot september) en hier niet opnieuw gedaan.

## 1. Probleemtaal: er zoekt bijna niemand

Geen enkele autocomplete op: "ik verdien goed maar", "goed inkomen toch", "geld zorgen goed inkomen", "waar blijft al mijn geld", "spaargeld opgemaakt". "Goed salaris maar" vult alleen aan naar salarisbedragen.

Waar dat wel een SERP oplevert, staan we er al: "goed salaris toch geen geld" heeft waarblijfthet.nl op plek 5, tussen Intermediair, AD, MijnVermogen en budgetcoach.nl. Maar die pagina's krijgen bijna niets: `waarom-hou-ik-nooit-geld-over` 82 vertoningen in 90 dagen, `goed-salaris-toch-geldstress` 11. Google indexeert de kern er zelfs niet van: `goed-salaris-toch-krap` is "URL is unknown to Google", `alleen-wonen-goed-salaris-toch-krap` "Discovered, currently not indexed".

## 2. Actietaal: daar zoekt de ICP wel, en daar staan we niet

Autocomplete bestaat, met varianten:

| Zoekterm | Aanvullingen (selectie) |
|---|---|
| meer geld overhouden | tips, 2026, hoe meer geld overhouden |
| hoe hou ik geld over | hoe houd ik meer geld over, hoe houd je meer geld over |
| ik kan niet sparen | forum, help ik kan niet sparen, waarom kan ik niet sparen, ik kan niks sparen |
| waarom geef ik zoveel | waarom geef ik zoveel geld uit |
| waar gaat mijn geld | waar gaat mijn geld naartoe, waar gaat mijn geld heen |
| waar blijft mijn geld | ing, rabobank, marktplaats |
| uitgaven bijhouden | app, excel, excel template, app gratis, spreadsheet |
| huishoudboekje | excel, app, rabobank, gratis, nibud, maken |
| financieel overzicht | maken, excel, voor thuis, maken voorbeeld |
| budget maken | excel, huishouden, voor jezelf, voorbeeld |
| budget app | gratis, nederland, ing, abn amro |
| hoeveel moet je overhouden | na vaste lasten, per maand, maandelijks |
| lifestyle inflatie | wat is lifestyle inflatie, levensstijl inflatie |
| altijd geld tekort | altijd te weinig geld, altijd zorgen om geld |
| elke maand rood | elke maand rood staan |
| 50 30 20 | regel, nibud, berekenen, excel, sparen |

Wie er staat (eerste 8, google.nl, 12 oktober):

| Zoekterm | AI-overzicht | Wie staat er | Waar blijft het |
|---|---|---|---|
| waar blijft mijn geld | ja | Wijzer in geldzaken, Nibud Persoonlijk Budgetadvies, Goede Geldgewoonten ("Waar blijft mijn geld? De 50/30/20-regel"), ING, Rabobank, whereismymoney.nl | niet in top 9 |
| waar gaat mijn geld naartoe | ja | Wijzer in geldzaken, Nibud, ING, Goede Geldgewoonten, whereismymoney.nl, ABN AMRO | niet in top 9 |
| meer geld overhouden | ja | NN, Nibud, Geldfit, Florius, Rabobank, leukegeit.nl | niet in top 9; GSC positie 34 |
| hoe houd ik meer geld over | ja | NN, Nibud, Rabobank, Geldfit, jouwggd, sochicken, Knab | niet in top 9; GSC "hoe hou ik geld over" positie 42 |
| waarom kan ik niet sparen | ja | Nibud, **Reddit r/geldzaken**, **Budgetbuddy ("Waarom verdien ik zoveel geld, maar kan ik niet sparen?")**, Rabobank, Wijzer, porterenee | niet in top 9 |
| waarom verdien ik zoveel geld maar kan ik niet sparen | ja | Budgetbuddy op 1, melinaonfire, Nibud, porterenee, Rabobank, Reddit, Intermediair | niet in top 9 |
| waarom geef ik zoveel geld uit | ja | neledeboeck.be, getsby, Reddit, Psychologie Magazine, Intermediair, Budgetbuddy | niet in top 9 |
| uitgaven bijhouden | ja | Rabobank (gratis huishoudboekje), Wijzer, Nibud, App Store, Eigen Huis, Excel-sjabloon, ABN AMRO, NN | niet in top 9 |
| financieel overzicht maken | ja | Rabobank, Wijzer, Nibud (2x), Eigen Huis, Excel, ING, ABN AMRO | niet in top 9 |
| huishoudboekje excel | ja | Rabobank, Microsoft, SeniorWeb, Peaks, Nibud, Wijzer, huishoudboekjeinexcel.nl | GSC positie 10 tot 45 op huishoudboekje-varianten |
| budget app nederland | ja | Odido, Computable, Reddit, DeZaak, grassfeld, App Store | niet in top 9 |
| hoeveel moet je overhouden per maand | ja | Nibud (2x), NN, Reddit r/nederlands (400+ reacties), Peaks, ABN AMRO, Knab | niet in top 9 |
| lifestyle inflatie | ja | financefreaks, indeflatie, yieldfund, Reddit r/DutchFIRE, edwin.nl, Dyme | niet in top 9 |
| jaarlijkse kosten reserveren | ja | **Reddit r/geldzaken op 1**, verder VvE, zzp en boekhouding | niet in top 9 |
| altijd te weinig geld | ja | Nibud, sochicken, Rabobank (Gezond Geldgesprek), NN, Geldfit | niet in top 9 |
| 50 30 20 regel | ja | NN, ABN AMRO, Raisin, semmiewealth, Hypotheker, Brand New Day, Reddit | niet in top 9 |

"Meer om te vragen" dat telkens terugkomt: "Wat is een normaal bedrag om over te houden per maand?", "Kun je rondkomen van 3000 euro per maand?", "Waarom verdien ik zoveel geld, maar kan ik niet sparen?", "Wat is een goede app om je uitgaven bij te houden?", "Wat houdt de 50/30/20 regel in?".

## 3. Wat de concurrent anders doet

- **Budgetbuddy** hangt precies onze hoek ("veel verdienen, niet kunnen sparen") aan een zoekterm met volume ("waarom kan ik niet sparen") en staat daarmee in de top 3 en in "Meer om te vragen". Wij schreven onze hoek op zoektermen zonder volume.
- **Goede Geldgewoonten** staat op "waar blijft mijn geld" met een simpele check (50/30/20). Onze merknaam is die zoekterm, en wij staan er niet.
- **Nibud Persoonlijk Budgetadvies** staat op "waar blijft mijn geld" en "waar gaat mijn geld naartoe": een gratis invultool, dezelfde rol als onze analyse.
- **Banken en NN** bezitten de doe-het-zelfvraag met een gratis sjabloon of tool (Rabobank huishoudboekje, ING Inzicht, NN-tips).
- **Reddit** (r/geldzaken, r/nederlands, r/DutchFIRE) staat op sparen, overhouden, budget-app, lifestyle inflatie en jaarlijkse kosten. Daar praat de doelgroep in eigen woorden over eigen bedragen.

## 4. Waarom we er niet staan

- De pagina's die er al zijn, gaan tegen de zoekintentie in. `huishoudboekje-voorbeeld` heet "bijhouden is niet het probleem" en `moet-je-een-huishoudboekje-bijhouden` "Eerlijk antwoord", terwijl de zoeker een sjabloon wil. Vertoningen 90 dagen: 152 en 1. `budget-maken-dat-je-volhoudt`: 0. `waarom-lukt-sparen-niet`: 0, "Crawled, currently not indexed".
- CLAUDE.md sloot een deel uit: "geen bespaartips", positionering op "geen app", N6 (bankapp) geschrapt.
- Indexering: van de 119 gevolgde URL's staan er 42 niet in de index van Google (4 gecrawld niet geïndexeerd, 15 ontdekt niet geïndexeerd, 22 onbekend, 1 duplicaat), waaronder `/over`, `/analyse`, `/inzichten` en de probleemtaalpagina's. Technisch is er niets mis (status 200, canonical en robots goed); Google vindt ze niet de moeite waard. Dat past bij veel overlappende pagina's op zoektermen zonder volume.

## 5. Antwoord op de vraag

De doelgroep zoekt wel, maar niet als "goedverdiener met een probleem". Ze noemen hun inkomen niet en zoeken een oplossing die ze zelf kunnen doen: overzicht, sjabloon, app, methode, of een verklaring waarom sparen niet lukt. Daar staan banken, Nibud, NN, Budgetbuddy, Goede Geldgewoonten en Reddit. Wij staan op de controlevragen (bedragen, regelingen), waar mensen komen die willen weten of ze normaal zijn, en op de probleemtaal, waar bijna niemand zoekt.
