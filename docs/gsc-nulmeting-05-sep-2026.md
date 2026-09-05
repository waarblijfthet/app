# GSC-nulmeting, 5 september 2026

Fase 0 stap 1 uit `docs/plan-seo-conversie-100-geldscans-05-sep-2026.md`. Dit is het startcijfer waartegen ik alles tot 31 januari 2027 afmeet.

Bron: de GSC-export in `data/waarblijfthet.nl-Performance-on-Search-2026-09-05/`, opgehaald op 5 september 2026. Zoektype web, periode de laatste drie maanden, dus ongeveer 4 juni tot en met 3 september 2026. Alle cijfers hieronder komen uit `Pages.csv`, `Queries.csv`, `Devices.csv` en `Chart.csv` in die map, of uit `lib/inzichten-data.ts` in dezelfde commit. Ik heb niets afgerond, aangevuld of geschat.

## 0. Wat deze export wel en niet dekt

Voordat je de tabellen leest, drie grenzen die de rest van dit document kleuren.

**De zoektermenlijst dekt een vijfde van het verkeer.** De 1.000 zoektermen in `Queries.csv` zijn samen goed voor 142 klikken en 9.123 vertoningen. De hele site had in dezelfde periode 705 klikken en 39.653 vertoningen. Google verbergt de rest omdat het te weinig gezochte termen zijn. Een zoekterm die hier op nul staat, kan dus toch vertoningen hebben gehad. Niet gevonden is niet hetzelfde als niet aanwezig.

**Zoekterm en URL zijn in deze export niet aan elkaar gekoppeld.** `Pages.csv` en `Queries.csv` zijn twee losse lijsten. Ik kan zien dat de site op "modaal inkomen 2026" op positie 2,4 stond, maar niet met welke URL. Waar dat verschil uitmaakt, staat het er expliciet bij als open vraag voor GSC zelf. Voor de vier of vijf termen waar het echt om draait, is dat een filter van een minuut in de GSC-interface.

**Het is een momentopname over een periode waarin het verkeer groeide.** `Chart.csv` laat de eerste dagen van juni op nul klikken staan en de eerste dagen van september op 7 tot 13 per dag. Een gemiddelde positie over 90 dagen middelt dus ook de periode mee waarin een pagina nog niet bestond of nog niet geïndexeerd was.

## 1. De site in 90 dagen

| Maat | Waarde |
|---|---|
| Klikken | 705 |
| Vertoningen | 39.653 |
| CTR | 1,78 procent |
| URL's met minstens één vertoning | 66 |
| URL's met minstens één klik | 34 |
| Artikelen in `lib/inzichten-data.ts` | 90 |
| Artikelen zonder één vertoning in 90 dagen | 34 |

Per apparaat, uit `Devices.csv`:

| Apparaat | Klikken | Vertoningen | CTR | Positie |
|---|---:|---:|---:|---:|
| Mobiel | 501 | 24.180 | 2,07% | 6,88 |
| Desktop | 184 | 14.160 | 1,3% | 20,33 |
| Tablet | 18 | 611 | 2,95% | 5,65 |

Mobiel is 62 procent van de vertoningen en 71 procent van de klikken, en staat op een veel betere positie dan desktop. De regel "mobiel eerst" uit CLAUDE.md 8.16 is dus geen aanname meer.

Twee URL's dragen de site: is-4000 en het boodschappenartikel zijn samen 22.736 van de 39.653 vertoningen (57 procent) en 445 van de 705 klikken (63 procent). De derde URL, is-5000, zit op 2.106 vertoningen. Daaronder valt het snel weg.

## 2. Alle 66 URL's met vertoningen

| URL | Klikken | Vertoningen | CTR | Positie |
|---|---:|---:|---:|---:|
| `/inzichten/is-4000-euro-netto-goed-salaris-nederland` | 271 | 11804 | 2.3% | 3.63 |
| `/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand` | 174 | 10932 | 1.59% | 11.58 |
| `/inzichten/netto-loonsverhoging-berekenen` | 25 | 2844 | 0.88% | 8.96 |
| `/inzichten/klarna-niet-kunnen-betalen` | 26 | 2616 | 0.99% | 11.77 |
| `/inzichten/kosten-levensonderhoud-alleenstaande-2026` | 45 | 2445 | 1.84% | 9.74 |
| `/inzichten/is-5000-euro-netto-goed-salaris` | 52 | 2106 | 2.47% | 5.56 |
| `/inzichten/nibud-boodschappen-versus-werkelijkheid` | 11 | 1388 | 0.79% | 8.51 |
| `/inzichten/verschil-budgetcoach-financieel-coach` | 4 | 1119 | 0.36% | 56.23 |
| `/inzichten/vaste-lasten-overzicht-maken` | 3 | 615 | 0.49% | 43.84 |
| `/inzichten/wat-kost-een-financieel-coach` | 3 | 536 | 0.56% | 26.53 |
| `/inzichten/hoeveel-sparen-per-maand-normaal-nederland` | 4 | 258 | 1.55% | 11.51 |
| `/inzichten/grip-op-je-geld-krijgen` | 0 | 216 | 0.0% | 81.75 |
| `/inzichten/bruto-naar-netto-loonstrook-uitleg` | 0 | 210 | 0.0% | 66.43 |
| `/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026` | 3 | 192 | 1.56% | 23.79 |
| `/inzichten/wat-kost-achteraf-betalen` | 3 | 191 | 1.57% | 11.51 |
| `/inzichten/waarom-hou-ik-nooit-geld-over` | 4 | 188 | 2.13% | 22.31 |
| `/inzichten/huishoudboekje-voorbeeld` | 5 | 187 | 2.67% | 18.95 |
| `/inzichten/potjesmethode-gezin-hoe-werkt-het` | 14 | 179 | 7.82% | 19.24 |
| `/inzichten/vakantiegeld-netto-hoeveel-hou-je-over-2026` | 0 | 162 | 0.0% | 86.29 |
| `/inzichten/wat-doet-een-financieel-adviseur` | 0 | 151 | 0.0% | 39.8 |
| `/inzichten/vrij-besteedbaar-inkomen-berekenen` | 1 | 128 | 0.78% | 8.45 |
| `/inzichten/samen-6000-euro-netto-toch-niets-over` | 8 | 109 | 7.34% | 4.43 |
| `/inzichten/kosten-verdelen-samenwonen-ongelijk-inkomen` | 1 | 90 | 1.11% | 11.58 |
| `/inzichten/geld-indelen-salaris-potjes-systeem` | 3 | 86 | 3.49% | 17.08 |
| `/inzichten/50-30-20-regel-hoger-inkomen` | 1 | 84 | 1.19% | 68.87 |
| `/` | 4 | 59 | 6.78% | 12.75 |
| `/inzichten/hoe-weet-ik-of-ik-financieel-gezond-ben` | 0 | 59 | 0.0% | 38.78 |
| `/financieel-coach` | 17 | 58 | 29.31% | 6.19 |
| `/inzichten/tweeverdieners-toch-krap` | 2 | 58 | 3.45% | 14.07 |
| `/inzichten/niet-rondkomen-met-4000-euro-netto` | 6 | 57 | 10.53% | 5.95 |
| `/inzichten/goed-salaris-toch-geldstress` | 3 | 49 | 6.12% | 15.69 |
| `/inzichten/twee-autos-wat-kost-de-tweede-echt` | 0 | 38 | 0.0% | 4.79 |
| `/inzichten/financieel-onafhankelijk-worden-realistisch` | 0 | 38 | 0.0% | 52.76 |
| `/inzichten/hoeveel-financiele-ruimte-heb-ik` | 1 | 33 | 3.03% | 12.27 |
| `/inzichten/is-3000-netto-genoeg-gezin` | 3 | 32 | 9.38% | 5.28 |
| `/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven` | 0 | 32 | 0.0% | 16.22 |
| `/inzichten/budget-maken-dat-je-volhoudt` | 1 | 28 | 3.57% | 10.46 |
| `/inzichten/goed-inkomen-weinig-vermogen` | 1 | 26 | 3.85% | 13.15 |
| `/inzichten/hoe-bespaar-je-op-boodschappen` | 3 | 24 | 12.5% | 6.62 |
| `/geldscan` | 1 | 19 | 5.26% | 7.37 |
| `/inzichten/overzicht-achteraf-betalen` | 1 | 19 | 5.26% | 7.37 |
| `/inzichten/kerstpot-en-verjaardagspot-zo-bouwden-we-die` | 0 | 18 | 0.0% | 48.56 |
| `/inzichten/waar-blijft-mijn-geld-einde-maand` | 0 | 15 | 0.0% | 57.47 |
| `/inzichten/schamen-niet-rondkomen-goed-inkomen` | 0 | 14 | 0.0% | 70.29 |
| `/inzichten/stoppen-met-achteraf-betalen` | 0 | 13 | 0.0% | 9.54 |
| `/inzichten/wat-kost-december-feestdagen-gezin` | 0 | 13 | 0.0% | 17.31 |
| `/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden` | 0 | 12 | 0.0% | 33.08 |
| `/inzichten/geld-stress-relatie-nederland` | 0 | 11 | 0.0% | 15.18 |
| `/inzichten/scheiden-goed-inkomen-toch-niks-over` | 0 | 11 | 0.0% | 53.64 |
| `/inzichten/moet-je-een-huishoudboekje-bijhouden` | 1 | 9 | 11.11% | 17.89 |
| `/inzichten/auto-kopen-of-leasen-kosten-per-maand` | 0 | 9 | 0.0% | 9.67 |
| `/inzichten/tweede-inkomen-loont-niet-tweeverdieners` | 0 | 8 | 0.0% | 6.88 |
| `/rapporten/stel-zonder-kinderen` | 0 | 7 | 0.0% | 7.71 |
| `/inzichten/samengesteld-gezin-twee-huishoudens-een-budget` | 0 | 7 | 0.0% | 10.57 |
| `/inzichten/bso-kosten-tweede-inkomen-zo-draaiden-we-het-om` | 0 | 6 | 0.0% | 8.67 |
| `/rapporten` | 0 | 5 | 0.0% | 3.4 |
| `/rapporten/zzp-wisselend-inkomen` | 0 | 5 | 0.0% | 7.6 |
| `/inzichten/vergeten-aftrekposten-belastingaangifte` | 0 | 5 | 0.0% | 10.0 |
| `/inzichten/53-weken-spaaruitdaging-schema-2026` | 0 | 4 | 0.0% | 4.5 |
| `/rapporten/alleenstaande-ouder-twee-kinderen` | 0 | 4 | 0.0% | 9.75 |
| `/inzichten/kosten-levensonderhoud-zzp-alleenstaande-2026` | 0 | 3 | 0.0% | 8.67 |
| `/inzichten/praten-over-geld-met-je-partner` | 0 | 2 | 0.0% | 6.0 |
| `/inzichten/waarom-lijkt-iedereen-rijker` | 0 | 2 | 0.0% | 6.0 |
| `/rapporten/tweeverdieners-drie-kinderen` | 0 | 2 | 0.0% | 8.5 |
| `/samenwerken/budgetcoaches` | 0 | 2 | 0.0% | 39.5 |
| `/rapporten/alleenstaand-huurwoning` | 0 | 1 | 0.0% | 5.0 |

## 3. Lijst A: meer dan 100 vertoningen en minder dan 2 procent CTR

Zestien URL's voldoen aan het criterium uit CLAUDE.md 8.22. Samen 24.003 vertoningen en 302 klikken.

Ik heb ze gesplitst, want de regel uit CLAUDE.md behandelt ze als één groep en dat klopt niet met wat ik hier zie. Een nieuwe metaTitel verandert alleen iets als de zoeker je regel ook ziet staan. Op positie 44 of 86 ziet niemand je titel, hoe goed hij ook is. Die pagina's hebben een positieprobleem, geen titelprobleem, en een CTR-ronde eroverheen is verspilde tijd.

**A1. Titelwerk loont, gemiddelde positie 10 of beter. Vijf URL's, 17.737 vertoningen.**

| URL | Klikken | Vertoningen | CTR | Positie |
|---|---:|---:|---:|---:|
| `/inzichten/netto-loonsverhoging-berekenen` | 25 | 2844 | 0,88% | 8,96 |
| `/inzichten/kosten-levensonderhoud-alleenstaande-2026` | 45 | 2445 | 1,84% | 9,74 |
| `/inzichten/nibud-boodschappen-versus-werkelijkheid` | 11 | 1388 | 0,79% | 8,51 |
| `/inzichten/vrij-besteedbaar-inkomen-berekenen` | 1 | 128 | 0,78% | 8,45 |
| `/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand` | 174 | 10932 | 1,59% | 11,58 |

Het boodschappenartikel staat op 11,58 en hoort strikt genomen in de tweede groep, maar het is met 10.932 vertoningen zo groot dat elke tiende procent CTR elf klikken per 90 dagen is. Ik zet hem hier omdat titelwerk daar sowieso rendeert.

**A2. Positieprobleem, gemiddelde positie boven de 20. Acht URL's, 3.201 vertoningen, 13 klikken.**

| URL | Klikken | Vertoningen | CTR | Positie |
|---|---:|---:|---:|---:|
| `/inzichten/verschil-budgetcoach-financieel-coach` | 4 | 1119 | 0,36% | 56,23 |
| `/inzichten/vaste-lasten-overzicht-maken` | 3 | 615 | 0,49% | 43,84 |
| `/inzichten/wat-kost-een-financieel-coach` | 3 | 536 | 0,56% | 26,53 |
| `/inzichten/grip-op-je-geld-krijgen` | 0 | 216 | 0% | 81,75 |
| `/inzichten/bruto-naar-netto-loonstrook-uitleg` | 0 | 210 | 0% | 66,43 |
| `/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026` | 3 | 192 | 1,56% | 23,79 |
| `/inzichten/vakantiegeld-netto-hoeveel-hou-je-over-2026` | 0 | 162 | 0% | 86,29 |
| `/inzichten/wat-doet-een-financieel-adviseur` | 0 | 151 | 0% | 39,8 |

**A3. Tussengroep, positie 10 tot 20. Drie URL's, 3.065 vertoningen.**

| URL | Klikken | Vertoningen | CTR | Positie |
|---|---:|---:|---:|---:|
| `/inzichten/klarna-niet-kunnen-betalen` | 26 | 2616 | 0,99% | 11,77 |
| `/inzichten/hoeveel-sparen-per-maand-normaal-nederland` | 4 | 258 | 1,55% | 11,51 |
| `/inzichten/wat-kost-achteraf-betalen` | 3 | 191 | 1,57% | 11,51 |

Klarna is 2.616 vertoningen op positie 11,8 met bijna geen klikken. Het is ook de enige grote pagina die niet over de ICP gaat. Ik zou hem in de CTR-ronde meenemen omdat het goedkoop is, maar er geen inhoudelijk werk in steken.

## 4. Lijst B: de 25 metaTitels met 2026 erin

CLAUDE.md 8.23 zegt 17. Het zijn er 25. Het verschil zit erin dat acht metaTitels in `lib/inzichten-data.ts` op de regel onder `metaTitel:` staan, waardoor een regelgebaseerde grep ze mist. Ik heb per artikelblok gezocht in plaats van per regel. De sweep in de week van 8 december moet dus 25 titels aan, niet 17.

| Vertoningen | Klikken | Positie | Slug | metaTitel |
|---:|---:|---:|---|---|
| 10932 | 174 | 11,58 | `wat-is-normaal-bedrag-boodschappen-per-maand` | Normale boodschappenkosten per maand 2026 (per huishouden) |
| 2844 | 25 | 8,96 | `netto-loonsverhoging-berekenen` | Netto overhouden van loonsverhoging berekenen (2026) |
| 2445 | 45 | 9,74 | `kosten-levensonderhoud-alleenstaande-2026` | Kosten levensonderhoud alleenstaande 2026: overzicht |
| 2106 | 52 | 5,56 | `is-5000-euro-netto-goed-salaris` | Is €5.000 netto een goed salaris? (2026) |
| 1388 | 11 | 8,51 | `nibud-boodschappen-versus-werkelijkheid` | Nibud boodschappenbudget 2026: norm versus werkelijkheid |
| 615 | 3 | 43,84 | `vaste-lasten-overzicht-maken` | Vaste lasten overzicht maken: stappenplan en checklist 2026 |
| 536 | 3 | 26,53 | `wat-kost-een-financieel-coach` | Wat kost een financieel coach? Tarieven 2026 |
| 216 | 0 | 81,75 | `grip-op-je-geld-krijgen` | Grip op je geld krijgen: het stappenplan in 5 stappen (2026) |
| 210 | 0 | 66,43 | `bruto-naar-netto-loonstrook-uitleg` | Van bruto naar netto 2026: je loonstrook uitgelegd |
| 192 | 3 | 23,79 | `kosten-levensonderhoud-alleenstaande-ouder-2026` | Kosten levensonderhoud alleenstaande ouder 2026: overzicht |
| 162 | 0 | 86,29 | `vakantiegeld-netto-hoeveel-hou-je-over-2026` | Vakantiegeld 2026 netto: hoeveel hou je over? |
| 128 | 1 | 8,45 | `vrij-besteedbaar-inkomen-berekenen` | Vrij besteedbaar inkomen berekenen (rekenhulp 2026) |
| 32 | 3 | 5,28 | `is-3000-netto-genoeg-gezin` | Is 3000 euro netto genoeg voor een gezin? (2026) |
| 24 | 3 | 6,62 | `hoe-bespaar-je-op-boodschappen` | Hoe bespaar je op boodschappen in 2026? Eerlijk antwoord |
| 5 | 0 | 10,0 | `vergeten-aftrekposten-belastingaangifte` | Vergeten aftrekposten belastingaangifte: checklist 2026 |
| 4 | 0 | 4,5 | `53-weken-spaaruitdaging-schema-2026` | 53 weken spaaruitdaging schema 2026 (gratis overzicht) |
| 3 | 0 | 8,67 | `kosten-levensonderhoud-zzp-alleenstaande-2026` | Kosten levensonderhoud ZZP-alleenstaande 2026: overzicht |
| 0 | 0 | | `wat-zijn-normale-vaste-lasten-gezin` | Wat zijn normale vaste lasten voor een gezin in 2026? |
| 0 | 0 | | `samen-te-veel-verdiend-toeslag-kwijt` | Samenwonen en toeslag kwijt: de inkomensgrenzen 2026 |
| 0 | 0 | | `modaal-inkomen-2026` | Modaal inkomen 2026: wat is het en wat houd je netto over? |
| 0 | 0 | | `kosten-levensonderhoud-alleenstaande-50-plus-2026` | Kosten levensonderhoud alleenstaande 50-plus 2026: pensioen en kosten |
| 0 | 0 | | `hoeveel-geld-overhouden-einde-maand` | Hoeveel geld overhouden per maand? Richtlijnen 2026 |
| 0 | 0 | | `cash-stuffing-beginnen` | Cash stuffing beginnen: startschema en uitleg (2026) |
| 0 | 0 | | `bonus-13e-maand-netto-berekenen` | Bonus en 13e maand netto: het bijzonder tarief 2026 |
| 0 | 0 | | `achteraf-betalen-bkr-registratie` | Komt achteraf betalen op je BKR? (en wat verandert in 2026) |

Zes slugs bevatten zelf 2026: `kosten-levensonderhoud-alleenstaande-2026`, `kosten-levensonderhoud-alleenstaande-ouder-2026`, `kosten-levensonderhoud-zzp-alleenstaande-2026`, `kosten-levensonderhoud-alleenstaande-50-plus-2026`, `vakantiegeld-netto-hoeveel-hou-je-over-2026` en `53-weken-spaaruitdaging-schema-2026`. CLAUDE.md 8.23 zegt: zelfde URL, geen nieuwe slug. Die zes houden hun slug en krijgen alleen 2027 in de titel en in de tekst. Dat is een kleine mismatch tussen URL en titel die ik accepteer, want een nieuwe slug kost de opgebouwde positie.

## 5. Lijst C: bouwen of upgraden, per cluster uit plan sectie 4

Per cluster: wat de zoektermenlijst laat zien, en wat dat betekent. Vertoningen zijn de som over alle termen in `Queries.csv` die het cluster raken, over 90 dagen. Nogmaals: die lijst dekt maar een vijfde van het verkeer, dus een laag getal is zwak bewijs en een hoog getal sterk bewijs.

| Cluster | Vertoningen in de lijst | Klikken | Wat het betekent |
|---|---:|---:|---|
| D, dienstvragen (budgetcoach, financieel coach) | 921 | 0 | Op één na het grootste cluster in de lijst, en nul klikken. Posities 20 tot 80. Zie bevinding 3. |
| B2, vaste lasten en overhouden | 597 | 1 | Vraag bestaat, pagina's bestaan, posities 36 tot 84. Upgraden, niet bouwen. |
| H1, gezin en tweeverdieners | 333 | 1 | Bijna alles is boodschappen-taal ("hoeveel geeft een gezin van 3 uit aan boodschappen"). De hub moet vanaf het boodschappenartikel gevoed worden. |
| S2, bedragvarianten 4.100 tot 4.600 | 247 | 7 | Posities 4 tot 7, dus is-4000 pakt ze al. Puur FAQ-werk, geen nieuwe pagina. |
| H3, alleenstaand | 169 | 1 | Ook hier is boodschappen de ingang. Pagina bestaat, positie 9,74. Upgraden. |
| Z8, vakantiegeld en bonus | 133 | 0 | 133 vertoningen op posities 75 tot 96. Een cijferrefresh doet hier niets. Zie bevinding 4. |
| Z5, loonstrook | 37 | 0 | Posities 90 tot 94. Nieuwe pagina, de bestaande telt niet mee. |
| P, probleemtaal | 24 | 0 | Zes artikelen, 24 vertoningen samen. Zie bevinding 2. |
| H4, alleenstaande ouder | 23 | 0 | Kleine vraag, veelal "alleenstaande ouderkop". Upgrade blijft prio B. |
| S1, is-3500 | 22 | 0 | "is 3500 netto een goed salaris" staat al op positie 5,71 zonder eigen pagina. Zie bevinding 5. |
| Z4, toeslagen | 19 | 0 | Alleen "eenoudertoeslag". De tweeverdienersgrens komt niet voor. Bouwen. |
| Z2, koopkracht en Prinsjesdag | 11 | 0 | Vrijwel niets, en wat er is gaat over 2026. Bouwen, zoals gepland. |
| B1, spaargeld | 9 | 0 | Bestaande pagina staat op 11,5 met 258 vertoningen. Upgraden of uitbreiden. |
| B7, besteedbaar inkomen | 6 | 0 | Bouwen. |
| L1, hypotheek en woonlasten | 5 | 0 | Bouwen. |
| Z1 zorgpremie, Z3 kinderopvang, Z6 energie, Z7 gemeentelijke lasten, Z9 hypotheekrenteaftrek | 0 | 0 | Nul vertoningen. Bouwen, precies zoals het plan zegt. |
| L2 minder werken, L3 baby, L4 tweede kind, L5 kind 18, L7 lease, L8 elektrische auto, L10 ouderschapsverlof | 0 | 0 | Nul vertoningen. Bouwen. |
| B4 kleding, B5 sport, B8 zakgeld, S3 is-6000, H5 zzp | 0 | 0 | Nul vertoningen. Bouwen, en alle vijf staan al op prio C. |

Buiten het plan om, en groot genoeg om apart te noemen:

| Cluster | Vertoningen | Klikken | Positie |
|---|---:|---:|---|
| Boodschappen (bestaand, 125 termen) | 1.674 | 6 | 20 tot 50 op de meeste termen |
| Modaal inkomen (38 termen) | 295 | 3 | 1 tot 3 |

## 6. Vijf bevindingen die het plan raken

### 1. Twee salarispagina's pakken de modaalterm, de eigen modaalpagina krijgt niets

Op 5 september gecontroleerd met het GSC-filter op zoekopdracht "modaal", tabblad Pagina's, laatste drie maanden. Het cluster is 329 vertoningen, 3 klikken, CTR 0,9 procent, gemiddelde positie 2,2. De verdeling over URL's:

| URL | Klikken | Vertoningen |
|---|---:|---:|
| `/inzichten/is-4000-euro-netto-goed-salaris-nederland` | 2 | 215 |
| `/inzichten/is-5000-euro-netto-goed-salaris` | 1 | 120 |

`modaal-inkomen-2026` komt in die lijst niet voor. De pagina bestaat, staat in `public/sitemap-0.xml` met lastmod 30 mei 2026 en in `public/llms.txt`, en krijgt nul vertoningen terwijl twee andere eigen pagina's de term op positie 2,2 bezetten. Dat is kannibalisatie in de meest letterlijke vorm: de pagina die voor de vraag gebouwd is, verliest van twee pagina's die de vraag alleen aanstippen.

**Ik stel mijn eigen inschatting hier naar beneden bij.** In de eerste versie van dit document noemde ik dit de goedkoopste winst in het hele document. Dat was te groot gebracht. 329 vertoningen in 90 dagen is ongeveer 110 per maand, en 0,9 procent CTR op positie 2,2 is het patroon van een vraag die Google zelf beantwoordt in het resultaat of in het AI-overzicht. Zelfs met een perfecte titel praat je over vijf tot tien klikken per maand. Het is een opruimklus, geen groeikans.

Wat er wel moet gebeuren, in oplopende zwaarte:

1. URL-inspectie op `modaal-inkomen-2026` in GSC, om te weten of hij überhaupt geïndexeerd is. Dat kost een minuut en bepaalt of dit een indexeringsprobleem is of puur een rankingprobleem.
2. Is hij geïndexeerd en verliest hij gewoon: 301 naar `is-4000` in `next.config.mjs`, met het modaalantwoord als FAQ in is-4000, waar de term toch al op positie 2 staat. Dat volgt CLAUDE.md 8.6 en het scheelt een pagina die niets doet.
3. Twee interne links wijzen nu naar de modaalpagina, in `bruto-naar-netto-loonstrook-uitleg` en `hoeveel-geld-overhouden-einde-maand`. Die moeten in dezelfde deploy mee.

Ik doe hier niets aan zonder jouw akkoord, want een 301 op een bestaande URL is niet terug te draaien zonder kosten.

### 2. De pijler van cluster P heeft nul vertoningen

Het plan wijst `goed-salaris-toch-krap` aan als hoofdpagina voor "goed salaris toch niet rondkomen" en "waar blijft mijn geld", en wil er twee pagina's naartoe redirecten. Die pagina staat niet in `Pages.csv`. Nul vertoningen in 90 dagen.

Wat de zes probleemtaal-pagina's wél doen:

| URL | Klikken | Vertoningen | CTR | Positie |
|---|---:|---:|---:|---:|
| `samen-6000-euro-netto-toch-niets-over` | 8 | 109 | 7,34% | 4,43 |
| `waarom-hou-ik-nooit-geld-over` | 4 | 188 | 2,13% | 22,31 |
| `goed-salaris-toch-geldstress` | 3 | 49 | 6,12% | 15,69 |
| `tweeverdieners-toch-krap` | 2 | 58 | 3,45% | 14,07 |
| `waar-blijft-mijn-geld-einde-maand` | 0 | 15 | 0% | 57,47 |
| `goed-salaris-toch-krap` | 0 | 0 | | |

Samen 17 klikken en 419 vertoningen in 90 dagen. Het cluster is klein, en de aangewezen pijler is de zwakste van de zes.

Ik zou de pijler daarom verleggen naar `samen-6000-euro-netto-toch-niets-over`: 7,34 procent CTR op positie 4,43 is met afstand het beste signaal in de groep, en het plan wil die pagina toch al ombouwen naar het gezinsbudget-format. Dan wordt de pijler tegelijk de brug naar hub H1, wat de architectuur eenvoudiger maakt in plaats van ingewikkelder.

Het alternatief is `goed-salaris-toch-krap` alsnog als pijler nemen omdat de zoekterm er beter bij past, en accepteren dat je bij nul begint. Dat is te verdedigen, maar dan is het een nieuwe pagina met een oude slug en geen consolidatie. Dit is een keuze die ik niet alleen wil maken. Zonder jouw akkoord verandert er niets aan cluster P.

Wat er in beide gevallen niet moet gebeuren: `waar-blijft-mijn-geld-einde-maand` en `goed-salaris-toch-geldstress` per direct 301'en. De eerste heeft 15 vertoningen en kan weg, de tweede heeft 6,12 procent CTR op positie 15,7 en is de op één na beste van de zes. Die redirect kost meer dan hij oplevert.

### 3. Het budgetcoach-cluster is 921 vertoningen en nul klikken

"budgetcoach" alleen al is 289 vertoningen op positie 60. Daarnaast "wat doet een budgetcoach" (90), "budgetcoaching" (74), "budgetcoach kosten" (73), "wat kost een budgetcoach" (70), "wie betaalt een budgetcoach" (67). De bijbehorende eigen pagina's staan op positie 26 tot 56 en leveren 7 klikken op 1.655 vertoningen.

Het plan zet cluster D op prio B en C, en dat blijft wat mij betreft kloppen: dit is dienstintentie, vaak van mensen met schulden, en dat is niet de ICP. Ik noem het hier alleen zodat de CTR-ronde er niet in trapt. Drie van de acht URL's in lijst A2 zijn dienstpagina's, samen 1.806 vertoningen. Een nieuwe titel op positie 56 verandert daar niets aan. Laat ze staan, meet ze niet mee in de CTR-ronde, en steek er geen sessie in.

### 4. De vakantiegeldpagina staat op positie 86, dus Z8 is geen refresh

Het plan noemt Z8 "alleen cijfers vervangen, in januari". `vakantiegeld-netto-hoeveel-hou-je-over-2026` heeft 162 vertoningen, nul klikken, gemiddelde positie 86,29. De zoektermen eromheen ("hoeveel vakantiegeld krijg ik", 32 vertoningen, positie 94) bevestigen dat beeld: 133 vertoningen over 20 termen, allemaal op positie 75 tot 96.

Op positie 86 is 2027 in de titel zetten geen werk dat iets oplevert. Als je hier iets wilt, is het een herschrijving naar het volledige paginapakket, en dat is een halve week. Mijn advies is dat niet te doen voor mei 2027 en Z8 uit de planning van december te halen. Dat scheelt een sessie die naar cluster Z kan.

### 5. is-3500 wordt een FAQ in is-4000, geen eigen pagina

Op 5 september gecontroleerd met het GSC-filter op "3500", tabblad Pagina's: 26 vertoningen, nul klikken, gemiddelde positie 6,8, verdeeld over `is-4000` en `is-5000`. In `Queries.csv` is "is 3500 netto een goed salaris" 17 vertoningen op positie 5,71.

CLAUDE.md 8.2 laat hier geen ruimte: vertoont een bestaande URL al op die term, dan upgraden in plaats van bouwen. En de salarisreeks staat niet ergens op pagina 3, maar op positie 6,8, dus is-4000 wordt al als het antwoord op deze vraag gezien.

Besluit voor de bouwvolgorde: **S1 vervalt als eigen pagina en gaat samen met S2 in één FAQ-blok in is-4000**, met de bedragen 3.500, 4.100, 4.200, 4.300, 4.500 en 4.600, gevoed uit `berekenVuistregel()` en `omslagpunt()` en nooit hardgetypt. Dat is één sessie in plaats van twee, en het houdt de brug naar hub H3 in de pijler die er toch al staat.

Wat je daarna in GSC kunt zien: of "is 3500" na die FAQ losloopt van "is 4000" in vertoningen. Loopt het los en groeit het door, dan is een eigen pagina alsnog te verdedigen. Nu niet.

## 6b. URL-attributie per zoekterm, gecontroleerd op 5 september

Drie van de vier openstaande filters uit sectie 8 zijn gedraaid, met het GSC-filter op zoekopdracht en het tabblad Pagina's, periode laatste drie maanden. De totalen wijken licht af van de sommen die ik uit `Queries.csv` maakte, omdat GSC in het gefilterde totaal ook de zoektermen meetelt die te weinig gezocht zijn om apart te tonen. De GSC-cijfers hieronder zijn dus completer dan die in sectie 5.

**Filter "modaal": 3 klikken, 329 vertoningen, CTR 0,9 procent, positie 2,2.** Zie bevinding 1. Kannibalisatie, kleine prijs.

**Filter "boodschappen": 6 klikken, 1.720 vertoningen, CTR 0,3 procent, positie 31,8.**

| URL | Klikken | Vertoningen |
|---|---:|---:|
| `/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand` | 6 | 1693 |
| `/inzichten/nibud-boodschappen-versus-werkelijkheid` | 0 | 27 |
| `/inzichten/kosten-levensonderhoud-alleenstaande-2026` | 0 | 6 |
| `/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden` | 0 | 4 |
| `/inzichten/is-4000-euro-netto-goed-salaris-nederland` | 0 | 1 |
| `/inzichten/vaste-lasten-overzicht-maken` | 0 | 1 |

Geen kannibalisatie. Eén pagina pakt 98 procent van de vertoningen. De vrees die ik in sectie 8 opschreef, dat twee boodschappenpagina's om dezelfde termen zouden vechten, klopt niet.

Wat er wel uit blijkt: op de boodschappen-termen staat die pagina op gemiddelde positie 31,8, terwijl haar gemiddelde over alle termen samen 11,58 is. De pagina rankt dus goed op een paar Nibud-achtige termen (bijvoorbeeld "nibud boodschappen 2 personen 2026" op positie 6,55) en diep op de rest van de boodschappen-staart. Dat is een rankingopgave, niet iets wat een nieuwe titel oplost.

**Filter "vaste lasten": 1 klik, 543 vertoningen, CTR 0,2 procent, positie 53,6.**

| URL | Klikken | Vertoningen |
|---|---:|---:|
| `/inzichten/vaste-lasten-overzicht-maken` | 1 | 489 |
| `/inzichten/grip-op-je-geld-krijgen` | 0 | 28 |
| `/inzichten/kosten-levensonderhoud-alleenstaande-2026` | 0 | 18 |
| `/inzichten/hoeveel-financiele-ruimte-heb-ik` | 0 | 5 |
| `/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand` | 0 | 3 |

Ook hier geen kannibalisatie: één pagina pakt 90 procent. `wat-zijn-normale-vaste-lasten-gezin` en `hoeveel-geld-overhouden-einde-maand` komen niet voor, want die hebben nul vertoningen in de hele periode.

Positie 53,6 is pagina 5 of 6 van Google. "vaste lasten overzicht" alleen al is 158 vertoningen. Dit is de duidelijkste kandidaat voor cluster B2, maar dan als herschrijving van `vaste-lasten-overzicht-maken` naar het volledige paginapakket, en niet als upgrade van `50-30-20-regel-hoger-inkomen` zoals het plan voorstelt. Die laatste heeft 84 vertoningen op positie 68,87 en is de zwakkere van de twee.

**Filter "3500": 0 klikken, 26 vertoningen, CTR 0 procent, positie 6,8.** De vertoningen gaan naar `is-4000-euro-netto-goed-salaris-nederland` en `is-5000-euro-netto-goed-salaris`. Er is geen eigen 3500-pagina en die is er ook niet nodig: de salarisreeks staat al op pagina 1 voor het bedrag. Zie bevinding 5, die hiermee beslist is.

**Wat dit samen betekent voor de bouwvolgorde.** Twee van de drie gecontroleerde clusters lopen niet vast op overlappende pagina's maar op hun positie. Consolideren helpt daar niet; het volledige paginapakket uit CLAUDE.md sectie 8 punt 8 tot 16 wel. Dat verschuift werk van "301's en titels" naar "herschrijven", wat duurder is per pagina en dus scherper kiezen betekent.

## 7. Fase 0 stap 3: de vier casestudy-pagina's

`waar-blijft-het-bij-mark-en-lisa`, `waar-blijft-het-bij-fatima`, `waar-blijft-het-bij-david-en-tom` en `waar-blijft-het-bij-sanne-en-joost` hebben alle vier nul vertoningen in 90 dagen. Ze verdringen dus niets. De vijf echte rapporten trouwens ook niet: `/rapporten/stel-zonder-kinderen` 7 vertoningen, `/rapporten/zzp-wisselend-inkomen` 5, `/rapporten/alleenstaande-ouder-twee-kinderen` 4, `/rapporten/tweeverdieners-drie-kinderen` 2, `/rapporten/alleenstaand-huurwoning` 1, `/rapporten` zelf 5.

Advies in één alinea, zoals gevraagd: de casestudy's zijn geen SEO-probleem en verdienen geen eigen sessie. Het enige dat er moet gebeuren is wat CLAUDE.md 8.18 al voorschrijft, namelijk ze in tekst en titel als illustratie labelen en geen Article-schema met auteur als feit voeren, en dat kan meeliften op de eerstvolgende deploy die toch aan `lib/inzichten-data.ts` komt. Verwijderen of redirecten zou ik niet doen: ze kosten niets en ze zijn intern linkmateriaal voor de hubs. Ik doe hier niets aan zonder jouw akkoord.

## 8. Wat ik niet kon meten en wat jij daarvoor moet doen

1. **Zoekterm naar URL.** Alle vier de filters zijn op 5 september gedraaid en staan in sectie 6b: "modaal", "boodschappen", "vaste lasten" en "3500". Wat hier nog open staat is de URL-inspectie op `modaal-inkomen-2026` (bevinding 1), die bepaalt of dat een indexeringsprobleem is of een rankingprobleem.
2. **Bing.** Deze export is Google. Bing Webmaster Tools staat volgens plan sectie 6 punt 5 nog niet aan, dus over ChatGPT-zoeken weet ik vandaag niets.
3. **Nibud-cijfers.** `nibud.nl` blokkeert automatisch opvragen. Waar het plan Nibud-normen nodig heeft (L6, B4), wacht dat op jou.
4. **De SERP zelf.** Fase 0 stap 2 is nog niet gedaan: dit document is GSC, geen google.nl. De SERP-verificatie per cluster in Chrome is de volgende sessie.

## 9. Wat deze meting vastlegt als startpunt

Het cijfer waartegen ik 31 januari afmeet:

| Maat | 5 september 2026 |
|---|---|
| Klikken per 90 dagen | 705 |
| Vertoningen per 90 dagen | 39.653 |
| CTR | 1,78% |
| URL's met minstens één klik | 34 van 90 artikelen |
| URL's boven 100 vertoningen onder 2 procent CTR | 16 |
| Waarvan met positie 10 of beter, dus echt titelwerk | 5 |
| metaTitels met 2026 | 25 |
| Afgeronde analyses | 0 |
| Betaalde Geldscans uit zoekverkeer | 0 |
