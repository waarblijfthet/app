# Prompt: contentaudit top 10 artikelen + conversiediagnose (25 jul 2026)

Kopieer alles onder de streep in een nieuwe sessie.

---

Je bent mijn content- en conversiestrateeg voor waarblijfhet.nl. Lees eerst `CLAUDE.md`, `docs/icp-personas.md` en `docs/kritische-analyse-en-plan-18-jul-2026.md`. Houd je aan alle harde werkregels in CLAUDE.md (python3 voor bestandsbewerkingen, tsc schoon, geen em dashes, geen verzonnen cases, ik/mij-vorm).

## Situatie

Het verkeer groeit maar verbreedt zich, en de conversie is nul. Ik heb op 25 juli 2026 zelf de admin-cijfers opgehaald. Dit zijn ze. Ga ze niet opnieuw ophalen, ga hierop af.

### Eigen meting, laatste 30 dagen
500 paginabezoeken, 360 unieke sessies, 47 procent mobiel.

| Pagina | Bezoeken | Mobiel | Desktop |
|---|---|---|---|
| /inzichten/wat-is-normaal-bedrag-boodschappen-per-maand | 177 | 54 | 123 |
| Homepage | 61 | 18 | 43 |
| /inzichten/is-4000-euro-netto-goed-salaris-nederland | 45 | 34 | 11 |
| /inzichten/kosten-levensonderhoud-alleenstaande-2026 | 28 | 14 | 14 |
| /inzichten/netto-loonsverhoging-berekenen | 26 | 21 | 5 |
| /inzichten/nibud-boodschappen-versus-werkelijkheid | 18 | 6 | 12 |
| /over | 15 | 8 | 7 |
| /inzichten/hoeveel-sparen-per-maand-normaal-nederland | 11 | 9 | 2 |
| Analyse | 11 | 6 | 5 |
| /inzichten/potjesmethode-gezin-hoe-werkt-het | 11 | 10 | 1 |
| /inzichten/geld-indelen-salaris-potjes-systeem | 10 | 8 | 2 |
| /inzichten/klarna-niet-kunnen-betalen | 9 | 7 | 2 |

Verderop in de staart: /budget-maken-dat-je-volhoudt 6, /financieel-coach 6, /samenwerken 6, /wat-kost-een-financieel-coach 6, Aanbod 4, /geldscan 2.

Opvallend: een bezoek kwam binnen vanaf een lokaal opgeslagen HTML-bestand van het boodschappenartikel in een prive-mappenstructuur ("PRIVE maandelijkse KOSTEN"). Iemand heeft dat artikel bewaard en gebruikt als naslag. Neem dat mee in je analyse van wat dat artikel doet met mensen.

### Funnel, laatste 30 dagen
428 bezoekers, 14 analyses gestart (3 procent), 8 voltooid (57 procent), 2 e-mailadressen (25 procent), 0 betaalde aanvragen.
Drop-off in de analyse per stap: profiel 23, inkomsten 11 (min 12), wonen 8 (min 3), vervoer 8, dagelijks 8, resultaat 8.
Van de 500 paginabezoeken kwamen er 4 op /aanbod en 2 op /geldscan.

### Google Search Console, 24 jun tot 22 jul
112 klikken, 9.685 vertoningen, CTR 1,2 procent, gemiddelde positie 22,3.

| Pagina | Klikken | Vertoningen | CTR | Positie |
|---|---|---|---|---|
| wat-is-normaal-bedrag-boodschappen-per-maand | 44 | 2.866 | 1,5% | 15,2 |
| is-4000-euro-netto-goed-salaris-nederland | 22 | 1.006 | 2,2% | 6,4 |
| netto-loonsverhoging-berekenen | 17 | 1.391 | 1,2% | 7,4 |
| kosten-levensonderhoud-alleenstaande-2026 | 7 | 595 | 1,2% | 9,7 |
| klarna-niet-kunnen-betalen | 5 | 448 | 1,1% | 14,5 |
| potjesmethode-gezin-hoe-werkt-het | 4 | 73 | 5,5% | 36,9 |
| nibud-boodschappen-versus-werkelijkheid | 3 | 538 | 0,6% | 6,9 |
| hoeveel-sparen-per-maand-normaal-nederland | 2 | 94 | 2,1% | 10,9 |
| verschil-budgetcoach-financieel-coach | 2 | 1.021 | 0,2% | 58,3 |
| vaste-lasten-overzicht-maken | 1 | 145 | 0,7% | 49,2 |

Pagina's met vertoningen en nul klikken (kansen of dood gewicht, jij beoordeelt welke): wat-kost-een-financieel-coach 412 vertoningen op positie 32,7 | bruto-naar-netto-loonstrook-uitleg 183 op 73,9 | grip-op-je-geld-krijgen 160 op 82,2 | vakantiegeld-netto 159 op 86,9 | waarom-hou-ik-nooit-geld-over 118 op 28,2 | wat-kost-achteraf-betalen 88 op 14,9 | wat-doet-een-financieel-adviseur 61 op 41,8 | kosten-levensonderhoud-alleenstaande-ouder 55 op 24,7 | vrij-besteedbaar-inkomen-berekenen 31 op 13,2 | financieel-onafhankelijk-worden-realistisch 27 op 51,3.

### Zoekwoorden, zelfde periode
Enige zoekwoord dat echt klikt: "is 4000 netto een goed salaris", 5 klikken, 94 vertoningen, CTR 5,3 procent, positie 3,3. Daarnaast losse klikken op "nibud boodschappen 2 personen 2026" (positie 7,1), "is 4000 euro netto per maand veel" (6,1), "wat geeft een gemiddeld gezin uit aan boodschappen per maand" (10,5), "lijst vaste lasten" (22).

Grote vertoningen zonder enige klik:
- Dienstcluster: "budgetcoach" 265 vertoningen op positie 65,4 | "budget coach" 114 op 60,2 | "financieel coach" 91 op 29,7 | "budgetcoaching" 74 op 76,9 | "budgetcoach kosten" 72 op 41,3 | "budgetcoach nodig" 20 op 42,5 | "budget coaching" 18 op 74,4 | "financieel adviseur kosten" 7 op 60.
- Boodschappencluster: "boodschappen per maand" 20 op 35,4 | "boodschappen kosten per maand 1 persoon" 19 op 42 | "boodschappen budget" 17 op 73,4 | "boodschappen budget 2 personen" 15 op 59,3 | "budget boodschappen 1 persoon" 13 op 59,4 | "boodschappen 1 persoon per maand 2026" 8 op 2,9 | plus een hele reeks Belgische varianten ("boodschappenbudget voor 2 personen per maand 2026 belgie" en soortgelijk, posities 25 tot 30).
- Ruis die niets met mijn ICP te maken heeft: tientallen beroepssalaris-zoekwoorden ("accountmanager salaris", "engineer salaris", "controller salaris"), huisartsenpraktijken, "aantal inwoners argentinie", "ceo betekenis". Beoordeel of dit toevallige long tail is of een signaal dat pagina's op de verkeerde intentie ranken.

## Wat ik van je wil

### 1. Screen de top 10 artikelen regel voor regel
De tien te screenen pagina's: wat-is-normaal-bedrag-boodschappen-per-maand, is-4000-euro-netto-goed-salaris-nederland, kosten-levensonderhoud-alleenstaande-2026, netto-loonsverhoging-berekenen, nibud-boodschappen-versus-werkelijkheid, hoeveel-sparen-per-maand-normaal-nederland, potjesmethode-gezin-hoe-werkt-het, geld-indelen-salaris-potjes-systeem, klarna-niet-kunnen-betalen, verschil-budgetcoach-financieel-coach.

Lees van elk artikel de daadwerkelijke content-component in `app/inzichten/[slug]/content/`, de entry in `lib/inzichten-data.ts` en de wrapper `ArticleBody.tsx`. Bekijk de gerenderde pagina ook live via https://www.waarblijfhet.nl, zowel op desktopbreedte als op 390 pixels breed, en maak screenshots. Ik wil niet dat je alleen de broncode beoordeelt; ik wil weten hoe de pagina er voor de bezoeker uitziet.

Beoordeel per artikel expliciet en met citaten uit de eigen tekst:

**Inhoud en intentie**
1. Welke zoekintentie brengt mensen hier (zie de zoekwoorden hierboven) en geeft het artikel dat antwoord binnen de eerste twee alinea's? Zo niet, wat staat er in de weg?
2. Is de bezoeker van dit artikel mijn ICP (Sandra, Niels) of iemand anders (Petra de validatie-zoeker, een student, een Belg, iemand die alleen een getal wil)? Wees hier hard over. Als het publiek niet mijn ICP is, zeg dat en zeg wat dat betekent voor de investering in dat artikel.
3. Welke vraag heeft de lezer na het lezen? Is die vraag de brug naar mijn aanbod, of eindigt het artikel in tevredenheid ("ik weet mijn getal, klaar")?
4. Waar staat ongedekte, vage of opgeblazen tekst? Waar wordt iets beweerd zonder bron? Waar staat toch nog wij/we/ons? Waar staat het woord eerlijk?

**Opmaak, indeling en leesbaarheid**
5. Kopstructuur: is elke H2 zelfstandig te begrijpen, staat de beste H2 bovenaan, en klopt de volgorde met de vraag van de lezer?
6. Scanbaarheid: hoe lang zijn de alineas, hoeveel achtereenvolgende regels tekst zonder onderbreking, en waar wordt het een muur? Geef regelnummers of citaten.
7. Tabellen en getallen: staan de benchmarkgetallen waar mensen ze zoeken, en zijn ze leesbaar op 390 pixels? Het boodschappenartikel is met 123 desktopbezoeken tegen 54 mobiele bezoeken opvallend desktop-zwaar; check of de mobiele weergave stuk of onaantrekkelijk is.
8. Boven de vouw op mobiel: wat zie je precies in de eerste 700 pixels? Staat daar een antwoord, of een intro en een ScanBox die niemand wil?
9. De ScanBox, de CTA-blokken en de auteur-bio: waar staan ze, hoe vaak, en zijn ze op de juiste plek in het leesritme? Beoordeel of de CTA qua funneltemperatuur past bij een lezer die net binnenkwam op een getalvraag.
10. Interne links: waar gaan ze naartoe, en leiden ze de lezer dieper in het probleem of alleen zijwaarts naar een ander benchmarkartikel?

### 2. Verklaar waarom er nul mensen converteren
Onderbouw met de cijfers en met wat je in de artikelen leest, niet met algemeenheden. Werk minstens deze verklaringen uit en zeg per stuk hoe waarschijnlijk je hem vindt en waarop je dat baseert:
- 500 paginabezoeken leverden 4 bezoeken aan /aanbod en 2 aan /geldscan op. Waar sterft die route precies, per artikel?
- 23 mensen openden de analyse, 12 vielen af op de stap inkomsten. Wat staat er op die stap dat mensen wegjaagt? Bekijk de stap zelf.
- 8 mensen kregen een resultaat, 2 gaven een adres, 0 kochten. Wat gebeurt er op de resultaatpagina na de uitslag? Is dat een einde of een begin?
- Is het publiek gewoon verkeerd (getalzoekers in plaats van vastzitters), en zo ja, welke van de tien artikelen kan wel ICP-verkeer trekken en welke nooit?
- `components/artikel/BenchmarkMail.tsx` staat nog nergens gemount. Wat kost mij dat, uitgedrukt in de bezoekcijfers hierboven?

### 3. Zoom in op de winnaars
Voor de drie artikelen die het meeste verkeer trekken (boodschappen, 4000 netto, netto-loonsverhoging): geef een concreet herschrijf- en uitbreidingsplan. Welke zoekwoorden uit de lijst hierboven kan ik met welke aanpassing binnenhalen, welke sub-H2's of varianten ontbreken (denk aan de Belgische en 1-persoons-varianten in de zoekwoordenlijst), en welke conversiebrug hoort er bij dit specifieke publiek. Wees expliciet over positie 15,2 op het boodschappenartikel bij 2.866 vertoningen: wat is de snelste weg naar de top 5 en wat levert dat rekenkundig op?

### 4. Beslis over het dienstcluster
"budgetcoach" en varianten geven mij duizenden vertoningen op posities 60 tot 77 en nul klikken. In CLAUDE.md staat dat cluster A vervuild is en niet verder investeren. Toets die conclusie tegen deze nieuwe cijfers en zeg of ik pagina's moet verbeteren, samenvoegen, deindexeren of laten liggen. Noem pagina's bij naam.

### 5. Lever op
- `docs/contentaudit-top10-jul-2026.md`: per artikel een vaste blokstructuur (bezoek- en GSC-cijfers, publiek, diagnose inhoud, diagnose opmaak met citaten, conversieroute, verdict in een regel, concrete acties genummerd op impact).
- Bovenaan datzelfde document een samenvatting van maximaal 20 regels met de drie belangrijkste conclusies en de vijf ingrepen die ik deze week moet doen, in volgorde van verwachte opbrengst.
- Een aparte sectie "wat ik niet ga doen en waarom", zodat ik niet aan alles tegelijk begin.
- Screenshots van de mobiele weergave van de drie grootste artikelen in `docs/screenshots/`.
- Voer de ingrepen nog niet uit. Eerst het document, dan wacht je op mijn go.

## Hoe ik het wil hebben
Nuchter, hard waar het hard moet, geen complimenten over mijn eigen werk. Als een artikel niet goed is, schrijf dan waarom en citeer de regel. Als een idee van mij niet werkt, zeg dat. Verzin geen cijfers, geen klantcases, geen bronnen. Als je iets niet uit de data kunt opmaken, schrijf dan dat je het niet weet en wat ik zou moeten meten om het te weten.

Sluit af met een korte lijst van de aannames die je hebt gemaakt en die ik moet controleren.
