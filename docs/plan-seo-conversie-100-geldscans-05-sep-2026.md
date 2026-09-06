# Plan van aanpak: 100 Geldscan-klanten uit zoekverkeer, peildatum 31 januari 2027

Opgesteld 5 september 2026. Vervangt het doel uit CLAUDE.md sectie 1 en de kanaalvolgorde uit sectie 7. LinkedIn, ads, media en werkgevers blijven dicht. Het enige kanaal is mensen die zelf zoeken (Google, Bing, AI-zoekmachines) en op de site landen. Verwijzers lopen door op de automatische pilot van 25 mails per dag, maar krijgen geen bouw- of denktijd meer.

Bronnen: eigen GSC- en adminmetingen (18 en 28 aug), `lib/inzichten-data.ts` (90 artikelen op 5 sep), `docs/serp-inkomensbedragen-17-aug-2026.md`, `docs/serp-brainstorm-18-aug-2026.md`, `docs/artikelkansen-serp-30-jul-2026.md`, `marketing/longtail-kansen-onderzoek.md`, plus live onderzoek 5 sep (CPB-raming 16 aug via Welingelichtekringen, Zorgwijzer, Rijksoverheid kinderopvang, Heibrink GEO-tips). Alle SERP-uitspraken hieronder die niet uit een eerder google.nl-Chrome-onderzoek komen, zijn hypotheses en moeten door Opus op google.nl geverifieerd worden voordat er gebouwd wordt.

## 1. De rekensom, zodat het doel eerlijk is

Wat er nu staat (28 aug): ongeveer 500 sessies per maand, met een knik naar 1.500 tot 2.000 op jaarbasis na 21 aug. Analyse gestart 14 per week, afgerond 0. Geldscans uit zoekverkeer: 0.

Wat 100 betaalde Geldscans in vijf maanden vraagt, met aannames die je per week moet toetsen:

| Stap | Aanname | Waar het cijfer vandaan komt |
|---|---|---|
| sessie naar afgeronde analyse | 3 procent | nu 0 procent, de flow lekt; 3 procent is de ondergrens van tool-conversies in de eigen groeibeslissing |
| afgeronde analyse naar betaalde Geldscan | 8 procent | geen benchmark, aanname; het resultaatscherm is de enige plek waar de Geldscan primair is |
| sessies nodig per Geldscan | 1 op 417 | 1 / (0,03 x 0,08) |
| Geldscans per maand bij 4.000 sessies | ongeveer 10 | |
| Geldscans per maand bij 8.000 sessies | ongeveer 19 | |

Conclusie: 100 vóór 31 januari haal je alleen als beide hefbomen tegelijk werken: verkeer naar 6.000 tot 8.000 sessies per maand in november tot januari, én een analyse die afgemaakt wordt. Het basisscenario met alleen verkeer is 40 tot 60. Zet dus 100 als doel, 50 als ondergrens waarbij het plan werkt, en 20 als killgrens (zie sectie 9).

De bottleneck van vandaag is niet content. Het is dat 0 van 14 gestarte analyses wordt afgemaakt. Elke bezoeker die je met SEO extra binnenhaalt, loopt nu tegen diezelfde muur. Daarom staat de funnel in week 1, vóór het eerste nieuwe artikel.

## 2. Wat er nu misgaat aan de SEO-kant

1. **Verkeerde intentie op de toppagina's.** is-4000 (plek 1, 3.199 vertoningen per week) trekt loopbaanvragen: "welke baan levert 4.000 netto op". Het PAA-blok onder je eigen resultaat is vier keer salaris en nul keer huishouden. Het boodschappenartikel trekt besparers. Beide pagina's geven verkeer, geen klanten. Ze zijn wel de sterkste interne linkbron die je hebt.
2. **CTR van 1,9 procent op gemiddelde positie 7,4.** Bij 8.217 vertoningen per week is elke procent CTR 80 klikken per week. Titelwerk is goedkoper dan nieuw volume.
3. **Kannibalisatie op de kernvraag.** Zes artikelen concurreren om "goed salaris toch niet rondkomen / niks over": goed-salaris-toch-krap, goed-salaris-toch-geldstress, waarom-hou-ik-nooit-geld-over, waar-blijft-mijn-geld-einde-maand, tweeverdieners-toch-krap, samen-6000-euro-netto-toch-niets-over. Geen van zes rankt. De SERP is leeg volgens het onderzoek van 17 aug (Intermediair, Nibud, Budgetcoach.nl). Dit is het grootste gat en het kost geen nieuwe pagina.
4. **Freshness-klif op 1 januari.** Zeventien metaTitels bevatten "2026", plus honderden vermeldingen in tekst en FAQ's. Vanaf december zoekt iedereen op 2027 en dalen die pagina's. Dit is ook de grootste kans: Prinsjesdag is 15 september en de 2027-cijfers (zorgpremie, koopkracht, kinderopvang, toeslaggrenzen, loonstrook) zijn precies de vragen waarop je ICP wél koopintentie heeft, want hij voelt ze in januari op zijn rekening.
5. **Geen huishoud-hubs.** CLAUDE.md sectie 8 schrijft clusters op huishouden voor, maar alleen de vier "kosten-levensonderhoud"-pagina's bestaan. Tweeverdieners met kinderen, het kernsegment, heeft geen hubpagina. De vijf rapporten linken nergens als hub.
6. **Geen eigen data-asset.** Alles wat je zegt over "normaal" komt van Nibud en CBS, die iedereen citeert. AI-zoekmachines en journalisten citeren wie eigen cijfers publiceert met een n erbij. Je hebt de analyseflow die die cijfers verzamelt, maar je publiceert er niets van.
7. **Casestudy-pagina's met bedachte namen** (waar-blijft-het-bij-mark-en-lisa, fatima, david-en-tom, sanne-en-joost) staan naast vijf echte rapporten. Opus moet controleren of ze als illustratie gelabeld zijn en of ze de echte rapporten in de SERP verdringen.

## 3. Waar de ICP zoekt: vijf zoekmomenten

Sandra (tweeverdiener met kinderen, koopwoning, 5.000 tot 8.000 netto samen) en Niels (alleenstaand of DINK, 3.500 tot 6.000 netto) zoeken niet naar "financieel coach". Ze zoeken op vijf momenten, en per moment is de zoektaal anders:

1. **Bedragcheck**: "is 4.500 netto een goed salaris", "samen 6.000 netto veel". Loopbaanintentie gemengd met huishoudintentie. Al gedekt; alleen versterken en doorsturen naar het huishoudmoment.
2. **Benchmark**: "wat geeft een gezin uit per maand", "normaal bedrag boodschappen", "hoeveel spaargeld is normaal op je 40e", "hoeveel houd je over na vaste lasten". Dit is de kern van de dienst: vergelijken. Half gedekt.
3. **Levensgebeurtenis met geldschok**: baby, kinderopvang, groter huis, tweede auto, één dag minder werken, scheiding, kind 18. Hier ontstaat het gevoel "we verdienen goed en toch". Grotendeels ongedekt.
4. **Regelverandering 2027**: zorgpremie, koopkracht, kinderopvangtoeslag, toeslaggrenzen, loonstrook januari. Tijdgebonden, hoog volume, en het raakt exact de goedverdiener die niet gecompenseerd wordt (CPB 16 aug: stellen met kinderen min 14 euro per maand, stellen zonder kinderen min 28, hoogste inkomensquintiel min 27). Ongedekt.
5. **Probleemtaal**: "waar blijft mijn geld", "goed salaris toch niks over", "tweeverdieners toch krap". Zes artikelen, nul rankings. Consolideren.

AI-zoekmachines (ChatGPT, Perplexity, Google AI Overviews) beantwoorden vooral moment 2 en 4: definitie- en cijfervragen. Ze citeren pagina's met een direct antwoord in de eerste alinea, een tabel, een bron met datum en eigen data met n. Dat is dezelfde vorm die in je eigen SERP-onderzoek wint ("de doorgerekende tabel is de winnende vorm, niet het betoog").

## 4. Clusterarchitectuur en onderwerpen

Vijf hubs, zes clusters. Per onderwerp: primaire zoekterm (hypothese, verifiëren), eigen hoek, interactief element, gekoppeld rapport, prioriteit (A eerst). Elke pagina krijgt de verplichte elementen uit CLAUDE.md sectie 8 punt 9.

### Hubs (H): vijf huishoudpagina's, de ruggengraat

| # | Pagina | Primaire zoekterm | Hoek | Rapport | Prio |
|---|---|---|---|---|---|
| H1 | Tweeverdieners met kinderen: wat geeft een gezin uit per maand | gezinsbudget 6000 netto, wat geeft een gezin met twee inkomens uit, uitgaven gezin 2 kinderen per maand | volledige begroting per post naast de eigen huishoudens, met n; geen Nibud-kopie | tweeverdieners-drie-kinderen | A |
| H2 | Stel zonder kinderen: uitgaven per maand bij 5.000 tot 7.000 netto | uitgaven stel zonder kinderen, samen 5000 netto zonder kinderen | het "we hebben geen kinderen en toch" patroon | stel-zonder-kinderen | A |
| H3 | Alleenstaand met goed inkomen (upgrade kosten-levensonderhoud-alleenstaande-2026) | kosten alleenstaande per maand 2027, alleen wonen 4000 netto | bestaande pagina ombouwen tot hub, 2027 in titel | alleenstaand-huurwoning | B |
| H4 | Alleenstaande ouder (upgrade bestaande) | kosten alleenstaande ouder 2027 | idem | alleenstaande-ouder-twee-kinderen | B |
| H5 | Zzp met wisselend inkomen (upgrade bestaande) | uitgaven zzp'er per maand, wisselend inkomen budget | idem, alleen analyse en rapport, geen coaching | zzp-wisselend-inkomen | C |

Elke hub bevat: begrotingstabel per post, de analyse-CTA met situatieparameters na de tabel, links naar alle artikelen van dat huishoudtype, en het echte rapport. is-4000 en het boodschappenartikel linken naar alle vijf.

### Cluster Z: regelverandering 2027 (publiceren 8 sep tot 15 dec, herzien na Prinsjesdag 15 sep)

| # | Onderwerp | Primaire zoekterm | Hoek | Prio |
|---|---|---|---|---|
| Z1 | Zorgpremie 2027: wat betaalt jouw huishouden meer | zorgpremie 2027, zorgverzekering 2027 duurder, eigen risico 165 | per huishoudtype doorgerekend; gezond stel zonder zorgtoeslag betaalt naar verwachting 800 tot 900 euro per jaar meer (Zorgwijzer, verifiëren op definitieve premies in november) | A |
| Z2 | Wat verandert er in 2027 aan wat je overhoudt | koopkracht 2027, wat houd ik over in 2027, prinsjesdag 2027 gezin | CPB-cijfers per huishoudtype, daarna de loonstrook van januari; publiceren 8 sep, herschrijven 16 sep | A |
| Z3 | Kinderopvangtoeslag 2027: wat betaal je zelf | kinderopvangtoeslag 2027, kinderopvang 2027 96 procent, uurtarief kinderopvang 2027 | rekenvoorbeeld voor twee kinderen bij 6.000 en 8.000 netto, geen uurtarief-rekenaar, wel de vraag of het tweede inkomen nu wel loont | A |
| Z4 | Toeslaggrenzen 2027 voor tweeverdieners | kindgebonden budget 2027 inkomensgrens, net boven de grens toeslag | de klif bij het samen net te veel verdienen | A |
| Z5 | Je loonstrook van januari 2027 | loonstrook januari 2027 netto lager, schijven 2027, heffingskortingen 2027 | publiceren 15 dec, de vraag die iedereen eind januari googelt | A |
| Z6 | Energierekening gezin 2027 | gemiddelde energierekening gezin 2027, energiekosten stijgen 2027 | netbeheerkosten en belasting per huishoudtype; risico dat het besparers trekt, dus CTA op de vergelijking | B |
| Z7 | Gemeentelijke lasten 2027 koopwoning | ozb 2027 stijging, gemeentelijke belastingen 2027 | kleine maar zeer specifieke koopwoningvraag | C |
| Z8 | Vakantiegeld 2027 en bonus 2027 (refresh bestaande twee) | vakantiegeld 2027 netto, bijzonder tarief 2027 | alleen cijfers vervangen, in januari | B |
| Z9 | Hypotheekrenteaftrek en eigenwoningforfait 2027 | hypotheekrenteaftrek 2027 | alleen als er iets verandert, verifiëren na Prinsjesdag | C |

Plus de **2027-sweep**: elke URL met 2026 in metaTitel krijgt in de week van 8 december een 2027-versie met bijgewerkte cijfers en zichtbare bewerkdatum. Zelfde URL, geen nieuwe slug.

### Cluster L: levensgebeurtenissen van tweeverdieners

| # | Onderwerp | Primaire zoekterm | Hoek | Prio |
|---|---|---|---|---|
| L1 | Leven op je maximale hypotheek: 2.000 of 2.500 per maand, wat blijft er over | hypotheek 2000 per maand veel, maximale hypotheek nemen verstandig, woonquote | score 32 in brainstorm 18 aug; woonlasten totaal, niet alleen de hypotheek | A |
| L2 | Eén dag minder werken: wat scheelt het echt bij twee inkomens | een dag minder werken netto, 4 dagen werken kosten | SERP heeft Raisin, NN, manly met alleen loonbelasting; jouw hoek: opvang, toeslag en het huishouden erbij | A |
| L3 | Baby op komst: wat verandert er per maand aan je budget | kosten baby per maand, budget baby eerste jaar, zwangerschap geld regelen | het moment waarop tweeverdieners voor het eerst krap voelen | A |
| L4 | Tweede kind: wat kost het er echt extra | kosten tweede kind, tweede kind betaalbaar | opvang verdubbelt, inkomen niet | B |
| L5 | Kind 18: kinderbijslag stopt, zorgverzekering erbij | kind 18 kinderbijslag stopt kosten, zorgverzekering kind 18 kosten ouders | score 28 in brainstorm | B |
| L6 | Studerend kind thuis (was geblokkeerd op Nibud-handwerk) | wat kost een studerend kind thuis | alleen als Jarno de Nibud-cijfers aanlevert | C |
| L7 | Leaseauto van de zaak of eigen auto: netto verschil per maand | bijtelling of eigen auto berekenen, leaseauto netto kosten | een salarisvraag met huishoudintentie, veel gezocht in loondienst | B |
| L8 | Elektrische auto: kosten per maand echt | elektrische auto kosten per maand, ev kosten gezin | verzekering, afschrijving, laden thuis; brug naar twee-autos-artikel | C |
| L9 | Scheiden met goed inkomen (bestaat) en samengesteld gezin (bestaat) | geen nieuw werk, alleen interne links vanuit H1 en H2 | | gedaan |
| L10 | Ouderschapsverlof 70 procent: wat doet het met je maandbudget | betaald ouderschapsverlof netto berekenen, ouderschapsverlof gevolgen inkomen | koppelen aan L3 | B |

### Cluster B: benchmark "wat is normaal" (het boodschappenmodel herhalen)

| # | Onderwerp | Primaire zoekterm | Hoek | Prio |
|---|---|---|---|---|
| B1 | Hoeveel spaargeld is normaal op je 30e, 40e, 50e (en hoeveel buffer heeft een gezin nodig) | hoeveel spaargeld normaal 40 jaar, hoeveel spaargeld gemiddeld nederland, buffer gezin | CBS mediaan 21.500 en gemiddelde 54.700 (tabel 83834NED), Nibud-buffer; het "iedereen lijkt rijker"-gevoel | A |
| B2 | Hoeveel houd je over na je vaste lasten (upgrade 50-30-20-regel-hoger-inkomen) | hoeveel moet je overhouden na vaste lasten, wat houden jullie over | de hele SERP is 50/30/20 van banken; jij hebt de eigen huishoudens | A |
| B3 | Uit eten en bezorgen: wat geeft een gezin eraan uit | kosten uit eten per maand gezin, bezorgmaaltijden kosten per maand | het onzichtbare lek nummer één in de rapporten (alleen zeggen als `lib/rapporten-data.ts` het draagt) | B |
| B4 | Kledingbudget gezin per maand | kleding kosten per maand gezin, kledingbudget kind | Nibud-referentie plus eigen n | C |
| B5 | Sport en hobby's van kinderen: wat kost het per maand | kosten sport kind per maand, hobby kosten kinderen | | C |
| B6 | Verzekeringen per maand: wat betaalt een huishouden gemiddeld | gemiddelde verzekeringskosten per maand gezin | | C |
| B7 | Netto besteedbaar inkomen gezin met twee kinderen | besteedbaar inkomen gezin 2 kinderen, gemiddeld besteedbaar inkomen nederland | CBS, brug van bedragcheck naar huishoudmoment | B |
| B8 | Zakgeld en kleedgeld per leeftijd | zakgeld per leeftijd 2027, kleedgeld hoeveel | klein, wel ICP, wel AI-citabel | C |

### Cluster P: probleemtaal consolideren (geen nieuwe pagina, wel de grootste winst)

Eén pijler wint: `goed-salaris-toch-krap` wordt de hoofdpagina voor "goed salaris toch niet rondkomen" en "waar blijft mijn geld". De andere vijf krijgen een eigen, niet-overlappende zoekterm of een 301:

- `waarom-hou-ik-nooit-geld-over`: staat al op pagina 1 voor "we verdienen goed maar houden niks over"; houden, richten op die exacte zin.
- `tweeverdieners-toch-krap`: richten op "tweeverdieners toch krap / twee inkomens toch niks over", linkt naar H1.
- `samen-6000-euro-netto-toch-niets-over`: ombouwen naar het gezinsbudget-format "samen 6.000 netto: het gezinsbudget" (kans 7, 17 aug).
- `goed-salaris-toch-geldstress` en `waar-blijft-mijn-geld-einde-maand`: 301 naar de pijler, tenzij GSC de laatste 90 dagen klikken laat zien; dan een eigen hoek.

### Cluster S: bedragen (klein houden)

- S1 `is-3500-netto-goed-salaris`: het enige grote gat onder de bestaande reeks (17 aug, SERP leeg, Intermediair zegt zelf dat 3.500 voor een alleenstaande niet genoeg is). Brug naar H3. Prio B.
- S2 Bedragensectie in is-4000 uitbreiden met 4.100, 4.200, 4.300, 4.600 als FAQ's (bestaat deels). Prio A, kost een uur.
- S3 is-6000: pas als S1 en H1 staan. Prio C.
- Nooit: bedragen onder 3.500, boven 6.500, bruto-netto-tools.

### Cluster D: dienstvragen (alleen de onbezette)

- D1 "Financiële APK" of "geldcheck laten doen": laten controleren of de SERP bezet is door hypotheekadviseurs. Als niet: /geldscan herschrijven op die term. Prio B.
- D2 "Budgetcoach zonder schulden / voor hoger inkomen": SERP is schuldhulp; alleen als FAQ op /geldscan. Prio C.
- `wat-kost-een-financieel-coach` en `verschil-budgetcoach-financieel-coach` bestaan en zijn de landingsplek voor de rest.

### Data-asset (G): het enige echte GEO-werk

**"Waar blijft het bij [n] huishoudens"**: een pagina met per huishoudtype de mediaan per uitgavenpost uit de afgeronde analyses plus de rapporten, met n per cel, maandelijks bijgewerkt, zichtbare datum, Dataset-schema. Publiceren zodra een cel n van 10 haalt, geen cel onder n van 10 tonen. Dit is wat AI-zoekmachines en de huishoudboekje-rubrieken citeren, en wat elk artikel als eigen bron kan aanhalen in plaats van Nibud. Vereist de toestemmingsvraag aan het eind van de analyse (sectie 6).

## 5. De SEO-opzet die het moet dragen

1. **Hub en spaak.** Elke nieuwe pagina linkt naar zijn hub en naar minstens één zusterartikel; elke hub linkt naar al zijn spaken. is-4000 en het boodschappenartikel linken naar alle hubs in het slotblok. Zonder twee inkomende links is een pagina niet gepubliceerd (CLAUDE.md 8.6).
2. **Antwoord bovenaan.** Eerste alinea van 40 tot 60 woorden geeft het getal of het antwoord, daarna de tabel, daarna pas de nuance. Koppen als vragen. Dit is tegelijk de featured-snippet-vorm en de AI-citatievorm.
3. **Eigen cijfer met n op elke pagina.** Uit `lib/rapporten-data.ts` of, later, uit de data-asset. Nooit uit het hoofd, nooit gemiddeld over huishoudens (waarheidsregel 2).
4. **Freshness zichtbaar.** `dateModified` in het Article-schema en een zichtbare regel "Cijfers bijgewerkt op [datum]" onder de kop. Jaartal in de titel waar de zoeker het typt (2027), en de 2027-sweep in december.
5. **Schema compleet.** Article met author en dateModified, FAQPage (bestaat), Person voor Jarno op /over met sameAs, Organization, BreadcrumbList, Dataset op de data-pagina. Eén consistente entiteit: naam, site, auteur.
6. **CTR-programma, maandelijks, vóór nieuw werk.** Elke URL met meer dan 100 vertoningen en minder dan 2 procent CTR krijgt een nieuwe metaTitel (getal vooraan, jaartal, geen em dash) en een nieuw antwoordblok. Meet na 28 dagen.
7. **Indexering.** Elke nieuwe of herschreven URL dezelfde dag handmatig in GSC. Bing Webmaster Tools aanzetten en de sitemap indienen: ChatGPT-zoeken leunt op Bing, en de eigen IndexNow-tool bereikt Bing al. Verifiëren dat llms.txt actueel meebouwt.
8. **Cannibalisatie bewaken.** Vóór elke nieuwe pagina: welke bestaande URL rankt al op die zoekterm (GSC-filter)? Bestaat die, dan upgraden in plaats van bouwen.
9. **Verificatie op google.nl, niet met WebSearch.** Eén Chrome-sessie per cluster, hl=nl gl=nl, PAA en "mensen zoeken ook naar" noteren in `docs/serp-<cluster>-<datum>.md`. Bouwen mag pas na die verificatie.
10. **Snelheid en mobiel.** 68 procent van het verkeer is mobiel. Tabellen scrollen binnen hun container, rekenaars werken met duim, geen layout-shift door de sticky header.

## 6. Conversie: wat SEO-verkeer pas geld maakt

Volgorde is dwingend. Punt 1 en 2 vóór het eerste nieuwe artikel.

1. **Analyse-funnel instrumenteren.** Event per stap (gestart, stap 1 tot 6, afgerond, e-mail ingevuld, Geldscan geklikt) via het `PageTracker`-patroon met client-side UUID. Weergeven in het bestaande Vandaag-dashboard, geen nieuw scherm. Doel: binnen zeven dagen weten op welke stap 14 van 14 afhaken.
2. **Het lek dichten.** Hypotheses in volgorde van waarschijnlijkheid: de inkomensvraag zonder uitleg waarom; de e-mailvraag vóór het resultaat; te veel velden op mobiel per stap. Eén wijziging per week, meten, door.
3. **Resultaatscherm** (`Stap6Resultaat.tsx`): eerst de vergelijking, dan één primaire knop naar `geldscanHref({ token })` met de prijs erin, dan de bewijsregel met `RAPPORTEN.length` en `AANTAL_ZONDER_LEK`. Daaronder de toestemmingsvraag voor de data-asset (opt-in, één zin).
4. **CTA per zoekmoment.** Op bedrag- en benchmarkpagina's: analyse-CTA na het eigen getal. Op 2027-pagina's: "reken uit wat dit voor jouw huishouden doet" met situatieparameters. Op levensgebeurtenispagina's: de analyse als "voor en na". De Geldscan blijft overal de tekstlink in het slotblok, nooit een tweede knop.
5. **Opvolgmail.** Wie de analyse afrondt en een e-mail achterlaat krijgt drie mails via Resend: dag 0 het resultaat, dag 3 het rapport dat het meest op zijn huishouden lijkt, dag 8 de Geldscan met prijs en de twee zonder lek. Bestaande mailketen hergebruiken, geen nieuw systeem.
6. **Betaalmoment.** Zodra twee aanvragen niet betalen: betaallink direct in de bevestigingsmail (CLAUDE.md sectie 9). Geen andere aanbodwijziging tot 12 rapporten geleverd zijn.

## 7. Planning september tot januari

| Periode | Bouwen | Publiceren | Meten |
|---|---|---|---|
| 8 tot 21 sep | funnel-events, lek 1 dichten, resultaatscherm, toestemmingsvraag, Bing, schema-audit | Z2 (8 sep, herzien 16 sep), Z1, Z3, S2 | eerste afgeronde analyses |
| 22 sep tot 12 okt | cluster P consolideren met 301's, CTR-ronde 1 | H1, H2, Z4, L1, B1 | CTR is-4000 en boodschappen |
| 13 okt tot 9 nov | H3 tot H5 upgraden | L2, L3, B2, B7, L7, S1 | analyse-afronding boven 2 procent? |
| 10 nov tot 7 dec | data-asset G bouwen zodra n het toelaat, CTR-ronde 2 | Z6, L4, L5, L10, B3, D1 | eerste Geldscans uit organisch |
| 8 tot 21 dec | 2027-sweep over alle 2026-titels, Z8 | Z5 (15 dec) | 2027-vertoningen in GSC |
| 22 dec tot 31 jan | CTR-ronde 3, tweede batch spaken op basis van GSC-data | resterende B en C | peiling 31 jan |

Tempo: twee nieuwe of herschreven pagina's per week, nooit meer, want elke pagina heeft het volledige pakket nodig (rekenaar, FAQ, bronnen met datum, twee inkomende links, GSC-indiening). Kwaliteit boven aantal: 30 pagina's die het pakket compleet hebben, verslaan 60 halve.

## 8. Wat we niet doen

Bruto-netto-rekenaars, max-hypotheek-rekenaar, verzekeringen vergelijken, spaarrentes, beleggen, box 3 als hoofdonderwerp, bespaartips, bedragen onder 3.500 of boven 6.500 netto, dienst-keywords ("financieel coach + stad"), nieuwe adminschermen, herontwerp van header, footer, hero of /aanbod, nieuwe casestudy's met bedachte namen, LinkedIn, ads, media-pitches, persona-toetsrondes.

## 9. Meten en killcriteria

Elke vrijdag, tien minuten: sessies, analyses gestart, analyses afgerond, e-mailadressen, Geldscan-aanvragen, betaalde Geldscans, URL's met minstens één klik, URL's onder 2 procent CTR.

- **Week 2 (19 sep):** analyse-afronding nog 0 procent, dan stopt alle contentbouw tot het lek gevonden is.
- **Peiling 1 nov:** minder dan 3.000 sessies per maand of minder dan 5 betaalde Geldscans, dan verschuift het zwaartepunt volledig naar cluster Z en de CTR-rondes, en gaan L en B in de wacht.
- **Peiling 31 jan:** 100 is het doel, 50 betekent dat het plan werkt en doorloopt, onder 20 is het aanbod of de prijs verkeerd en niet het kanaal (dan eerst 9 en 29 euro testen, geen nieuw verkeer kopen).
