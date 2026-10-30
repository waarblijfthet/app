# Diagnose: waarom het verkeer groeit en de Geldscan niet, 30 oktober 2026

Vraag van Jarno: organisch verkeer neemt toe, conversies blijven volledig uit. Zie ik iets over het hoofd, moet het een andere doelgroep of een ander aanbod worden, en komt iemand überhaupt op het aanbod? Plus: wie is wél succesvol, digitaal of niet.

Bronnen: de admin-API's in productie (analyse-verloop, bezoekers, vandaag, search-analytics), uitgelezen op 30 oktober 2026 rond 10:40 via de ingebouwde browser. Periode "maand" is 30 september tot 30 oktober; GSC loopt 29 september tot 27 oktober. Eigen testsessies van Jarno zijn niet uit te filteren en zitten er mogelijk in. Extern onderzoek: zie sectie 5, elke bron met URL.

## 1. Het antwoord in vijf regels

1. **Nee, bijna niemand komt op het aanbod.** In een maand kwamen 3 mensen op het aanbodscherm van de analyse (stap 4), 6 op /geldscan, 13 op /aanbod en 4 op het aanvraagformulier. Nul aanvragen bij die aantallen is wat je verwacht, ook bij een goed aanbod. **De nul zegt dus nog niets over doelgroep of prijs.**
2. **De analyse zelf zet een muur vóór het aanbod.** De Geldscan staat alleen op resultaatstap 4. Op stap 3 staat de gratis vraagstap, die een e-mailadres vraagt. 21 van de 43 gemeten sessies stoppen precies daar. Zes mensen kozen er "het voelt toch krap": dat is letterlijk de vraag die de Geldscan beantwoordt, en geen van hen heeft de Geldscan gezien.
3. **Het verkeer dat groeit is het verkeer dat niet koopt.** 69 procent van de klikken gaat naar vijf pagina's, met kindgebonden budget 2027 en kinderopvangtoeslag 2027 voorop. Wie de analyse afrondt, zegt in 14 van de 24 gevallen dat het aan het eind van de maand "ruim" is. Geen enkele afronder sinds 12 oktober kwam binnen via de zes nieuwe ICP-pagina's; die staan nog op positie 20 tot 55.
4. **Het kanaal is het grotere probleem.** Ik heb geen enkel voorbeeld gevonden van een eenmansdienst van 50 tot 150 euro voor consumenten die op SEO als hoofdkanaal draait. Wie wel betalende klanten haalt, doet dat via een mens, een publiek dat al vertrouwt (podcast, tv, boek, social) of een instelling (werkgever, bank). En mensen betalen rond een beslissing of een schok, niet voor overzicht op zich. Je enige betalende klant ooit kwam via een mens. De groeibeslissing van 26 juli zei hetzelfde.
5. **Geen andere doelgroep, geen app, geen lagere prijs.** Wel: het aanbod eerst zichtbaar maken (één sessie), en het kanaalbesluit dat op 30 november toch op tafel komt nu al voorbereiden. Drie besluiten voor Jarno in sectie 6.

## 2. De trechter van de afgelopen maand

| Stap | Aantal | Bron |
|---|---|---|
| Sessies op de site | 2.854 (3.377 paginaweergaven, 1,18 per sessie) | bezoekers, maand |
| /analyse geopend | 173 weergaven | bezoekers, maand |
| Analyse gestart | 60 | vandaag, trechter |
| Analyse afgerond | 44 | vandaag, trechter |
| Resultaatstap 1 als verste stap | 15 | analyse-verloop, `analyse_resultaat_stap` |
| Resultaatstap 2 als verste stap | 4 | idem |
| Resultaatstap 3 (vraagstap) als verste stap | 21 | idem |
| **Resultaatstap 4, het aanbod** | **3** | idem |
| E-mailadres achtergelaten | 1 | vandaag, trechter |
| Geldscan-aanvragen | 0 | vandaag, trechter |
| Betaald | 0 | vandaag, trechter |

Buiten de analyse om: /geldscan 6, /aanbod 13, /aanbod/intake 4, /rapporten plus de vijf rapportpagina's samen 98 weergaven.

**De vraagstap.** In de maand 10 keer een vraag gekozen, waarvan 6 keer "voelt krap", 1 keer verstuurd, 2 keer overgeslagen. Wie een vraag kiest krijgt een e-mailveld; wie niet verstuurt en niet op overslaan drukt, ziet de Geldscan nooit. `Resultaat3Vraag.tsx` regel 12: "Geen vraag: door naar de Geldscan-stap." De Geldscan komt op stap 1 tot en met 3 nergens voor.

**De rekensom.** Bij 3 aanbodweergaven per maand levert zelfs 10 procent conversie 0,3 Geldscan per maand op. Voor 100 Geldscans vóór 31 januari zijn er ongeveer 33 per maand nodig; bij 5 procent conversie is dat ongeveer 660 aanbodweergaven per maand, ruim 200 keer zoveel als nu. Dat doel is via deze trechter niet haalbaar, wat er ook aan pagina's bijkomt.

## 3. Wie rondt de analyse af, sinds de meetvraag van 12 oktober

Eerste sessie met de meetvraag: 12 oktober 17:32. Daarna 36 starts, 24 afgerond.

| "Hoe is het aan het eind van de maand?" | Afronders |
|---|---|
| Ruim | 14 |
| Net genoeg | 7 |
| Te weinig | 3 |

Van de 10 die net genoeg of te weinig kiezen, zitten er 7 in de inkomensband van Sandra en Niels (stel vanaf 5.000 netto samen, alleenstaand vanaf 3.500). Van die 7 kwam er 1 op het aanbodscherm; 4 stopten op resultaatstap 1.

Landingspagina van de 24 afronders: is-4000 (5), kindgebonden budget 2027 (4), top-10-procent-inkomen (2), kosten-levensonderhoud-alleenstaande (2), boodschappen (2), en losse bedrag-, regeling- en benchmarkpagina's. Geen van de zes ICP-pagina's van 12 oktober.

**De ICP-pagina's.** Samen 85 weergaven sinds 12 oktober. In GSC (28 dagen) 0 klikken; `meer-geld-overhouden` 119 vertoningen op positie 20, `waar-blijft-mijn-geld` 48 op 55, `waarom-lukt-sparen-niet` 37 op 36, de andere drie onder de 15. Dat is na 18 dagen niet vreemd, maar het betekent dat het beslismoment van 30 november zeer waarschijnlijk uitkomt op "te weinig verkeer om het te zien" (CLAUDE.md sectie 9). Dan ligt het kanaalbesluit bij Jarno. Dat besluit komt dus hoe dan ook.

## 4. Wat het verkeer is

GSC, 29 september tot 27 oktober: 844 klikken, 42.230 vertoningen, CTR 2,0 procent, positie 9,9. Over 90 dagen 2.013 klikken.

| Pagina | Klikken | Vertoningen | Positie |
|---|---|---|---|
| kindgebonden-budget-2027-inkomensgrens | 188 | 3.773 | 5,3 |
| wat-is-normaal-bedrag-boodschappen-per-maand | 128 | 11.283 | 7,4 |
| is-4000-euro-netto-goed-salaris-nederland | 107 | 3.950 | 3,2 |
| kinderopvangtoeslag-2027-tweeverdieners | 80 | 1.862 | 5,2 |
| is-5000-euro-netto-goed-salaris | 79 | 3.540 | 3,9 |

Samen 582 van de 844 klikken. Dit zijn mensen met een feitenvraag ("hoeveel krijg ik", "is mijn salaris goed"). Die krijgen hun antwoord en gaan weg: 1,18 pagina per sessie. Dat is geen fout van die pagina's, maar het is ook geen koopverkeer. Groei van dit verkeer is geen groei van de ICP.

Eén kanttekening die er wel toe doet: de toeslagpagina's (samen ongeveer 590 weergaven per maand) trekken gezinnen met kinderen die nét merken dat er iets verandert in 2027. Dat is een beslis- of schokmoment, en dat is precies waar het externe onderzoek kopers vindt (sectie 5). Daar zit een ingang die nog niet benut is, zie besluit 3.

## 5. Wie wél betalende klanten haalt (extern onderzoek, 30 oktober)

Opgehaald op 30 oktober 2026. EC is een eigen claim van de partij, S een schatting van derden, O onafhankelijk onderzoek.

**Menselijke geldhulp**
- **Octopus Money (VK):** grootste menselijke moneycoach in het VK, "works primarily with employers"; eerste sessie gratis als kennismaking. https://thefintechtimes.com/octopus-launches-octopus-moneycoach-to-take-financial-coaching-to-mass-market/ en https://help.octopusmoney.com/hc/en-gb/articles/15263137422237-Can-I-try-the-service-before-signing-up
- **The Financial Gym (VS):** ongeveer 3.000 klanten, abonnement vanaf $85 per maand, minimaal 3 maanden; marketing via podcasts, Instagram, Pinterest en reviewsites (EC, 2021). https://investmentnews.com/financial-gym-old-school-financial-planning-204504
- **Stash Wealth (VS, HENRY's):** instap $197, plan $797, daarna vermogensbeheer; klanten eerst uit familie en vrienden, daarna mond-tot-mondreclame en eigen "happy hours" (EC, 2016). https://www.wealthmanagement.com/ria-news/happy-hour-with-stash-wealth
- **Solo-coach Christine Teh (VS):** pakketten van $1.200 en $2.000, cursus $49; grootste bron LinkedIn, daarna Yelp; SEO noemt ze niet. https://www.kitces.com/blog/christine-teh-financial-coaching-cmc-linkedin-livestream-advisor-marketing/
- **ABN AMRO Financieel Gezond Coach (NL):** gratis gesprek voor klanten "als je meer overzicht en inzicht wilt"; de coaches zagen in 2022 "meer mensen met een baan". https://www.abnamro.nl/nl/prive/themas/hulp-bij-geldzaken/financieel-gezond-coach/index.html en https://www.abnamro.com/nl/nieuws/mensen-hadden-het-prima-op-de-rit-en-kunnen-ineens-niet-meer-rondkomen
- Nederlandse geldcoaches en geldcreators: geen klant-, cursist- of omzetcijfers gevonden; de bekendste (zoals Eef van Opdorp) lopen via tv, boek en spreken.

**Apps**
- **Grip (ABN AMRO)** stopte op 16 december 2022; **Yolt (ING)** werd afgebouwd omdat het "not feasible" bleek. https://financer.nl/persoonlijke-financien/grip-app-review/ en https://finextra.com/newsarticle/40890/ing-kills-off-yolt
- **Dyme (NL):** ruim 600.000 gebruikers bij de verkoop aan RISK (sep 2025), groei na Dragons' Den; verdient aan overstappen, niet aan inzicht. https://peak.capital/?p=5214
- **Monarch en Copilot (VS):** groeiden vooral toen Mint stopte (nov 2023); zij vingen mensen op die al budgetteerden. https://sacra.com/c/monarch-money/ en https://techcrunch.com/?p=2681495
- **YNAB:** "We teach them for free ... then the software is kind of a natural sale" (Jesse Mecham). https://podcast.farnoosh.tv/wp-content/uploads/2025/02/Jesse-Mecham-Transcript-FINAL.pdf

**Wanneer mensen betalen (O)**
- Nibud 2017 (n=1.512): advies wordt vooral gezocht bij complexe beslissingen (hypotheek 52 procent, pensioen 20 procent); 34 procent zoekt de informatie liever zelf op internet. https://www.wijzeringeldzaken.nl/platform-wijzeringeldzaken/publicaties/Nibud_rapport_keuzeproces_bij_financieel_advies2017.pdf
- Money Advice Service VK 2017 (n=3.545): bij geldbeheer zoeken minder mensen hulp dan bij complexe gebeurtenissen; hoofdreden om geen hulp te zoeken is "kan het zelf" (37 procent). https://evidence-hub.maps.org.uk/en/research-library/insight/right-place-right-time
- FSCP/YouGov VK aug 2025: na een grote levensgebeurtenis zoekt 56 procent advies of informatie, het meest bij hypotheek, bedrijf starten en huis kopen. https://www.fca.org.uk/panels/consumer-panel/publication/whenlifehappens-understandingfinancialadviceneedsthroughlifetriggers.pdf

**SEO voor vertrouwensdiensten**
- Kitces 2026 (n=506 adviespraktijken): verwijzingen zijn de grootste bron van nieuwe omzet; SEO wordt door 32 procent gebruikt. https://www.financial-planning.com/news/kitces-research-pegs-the-winners-and-losers-in-marketing-roi
- Kitces: "SEO is used to drive traffic… it does not necessarily improve conversion." https://www.kitces.com/blog/outsourcing-seo-financial-advisor-google-pagerank-keyword-strategy-client-conversion/
- Een solodienst van 50 tot 150 euro voor consumenten met SEO als hoofdkanaal: **niet gevonden.**

**Patronen bij wie het wel lukt**
1. Kanaal: een mens of community, een publiek dat al vertrouwt, of een instelling die betaalt of doorverwijst.
2. Trigger: een beslissing of schok (hypotheek, huis, minder werken, scheiding, inflatie). "Overzicht willen" zonder druk leidt tot zelf doen, niet tot betalen.
3. Vorm: gratis onderwijs met een methode (YNAB), een doorlopende relatie met een mens, of een instapproduct naar iets duurders.

**Niet kunnen verifiëren:** betalende gebruikers van Dyme, cijfers van Nederlandse geldcoaches, actuele cijfers van Octopus, Financial Gym en Stash, en de conversie van een gratis analyse naar een betaalde dienst bij vergelijkbare partijen.

## 6. Wat ik zou doen, drie besluiten voor Jarno

**Besluit 1. Het aanbod in beeld brengen (binnen de regels, één sessie).** Op het resultaatscherm mag de Geldscan de primaire actie zijn (CLAUDE.md sectie 5). Twee wijzigingen, samen één meetpunt:
- Wie "net genoeg" of "te weinig" kiest, of een gat boven de drempel heeft, ziet op stap 1 onder het gat de Geldscan-link met prijs.
- Op de vraagstap staat bij de keuze "voelt krap" de Geldscan naast de gratis vraag, en de stap blokkeert niet langer het aanbod.
Meten: aanbodweergaven per week (nu ongeveer 1). Verwachting eerlijk: van 3 naar misschien 15 tot 25 weergaven per maand, en dus nog steeds hooguit één aanvraag per maand. Dit repareert de meting van het aanbod, niet het aantal klanten.

**Besluit 2. Het kanaal: tien persoonlijke vragen (wijkt af van CLAUDE.md sectie 7).** Het enige dat ooit een betalende klant opleverde, was een mens. Het plan van 26 juli (twaalf scans in eigen kring, vijf verhalen) is na vijf rapporten ingeruild voor alleen SEO. Voorstel: tien mensen die je kent en die in de doelgroep zitten persoonlijk vragen, en de vijf bestaande klanten één keer vragen of ze iemand kennen voor wie dit iets is. Kost weinig bouwtijd, levert sneller bewijs dan 30 november, en voedt ook de site (nieuwe rapporten op /rapporten). Dit is jouw besluit, want het opent een kanaal dat tot 31 januari dicht staat.

**Besluit 3. Een beslismoment-ingang op het grootste verkeer (binnen de bestaande Geldscan).** De toeslagpagina's 2027 zijn de grootste verkeersbron en bereiken gezinnen op een veranderingsmoment. Een zesde keuze in `lib/geldmomenten.ts`, iets als "In 2027 verandert er iets voor ons", met de bestaande doorrekening en dezelfde Geldscan van 49 euro. Geen nieuw product, wel een nieuwe keuze, dus jouw besluit (CLAUDE.md sectie 5, tweede ingang).

**Niet doen, en waarom**
- **Andere doelgroep.** Er is geen bewijs dat deze doelgroep niet koopt, want hij heeft het aanbod niet gezien. Wisselen nu meet niets.
- **Prijs omlaag (29 of 9 euro).** Zelfde reden. Het killcriterium "onder 20 is aanbod of prijs fout, niet het kanaal" (CLAUDE.md sectie 9) gaat uit van een aanbod dat wordt gezien. Voorstel: de noemer wordt "aanbod gezien". Pas na 100 aanbodweergaven zonder aanvraag is de prijs de vraag.
- **Een app.** In Nederland stopten twee grootbanken met hun inzicht-app; Dyme verdient aan overstappen; de Amerikaanse apps groeiden op een concurrent die stopte. Niet haalbaar naast een baan, en het inzicht zit al gratis in de bankapp.
- **Meer pagina's.** Meer bedrag- en regelingverkeer verandert de trechter niet.

## 7. Bijvangst

- De verwijzersmails staan bewust uit (Jarno, 30 oktober): weinig respons, geen tijd om het goed te doen. CLAUDE.md sectie 7 zegt nog dat de automaat doorloopt; die zin klopt niet meer.
- Vrijdagmeting 30 oktober staat in de bouwvolgorde, sectie 41.

## 8. Vervolgvraag van Jarno: bestaat de doelgroep, en wil hij wat ik aanbied?

**Bestaat hij? Ja.** Nibud, *Geldzaken in de praktijk 2024* (n=1.563, februari 2024, opgehaald 30 oktober 2026): bij hogere inkomens (zonder partner boven €2.625 netto, met partner boven €4.750) vindt 15 procent rondkomen moeilijk en maakt 20 procent zich regelmatig tot altijd zorgen; 38 procent van de steekproef valt in die groep. https://nibc.nl/media/tr5atdol/rapport-geldzaken-in-de-praktijk-2024-het-leven-betaalbaar.pdf. Let op: de Nibud-grens ligt lager dan de band van Sandra en Niels, dus het aandeel in die band is niet uit dit rapport af te leiden. Op de site komen ze ook: 7 afronders in 18 dagen in de inkomensband die zeggen dat het krap is.

**Wil hij wat je aanbiedt? Niet bewezen, en de signalen wijzen op: niet in deze vorm.**
1. **Niemand heeft het ooit zelf gezocht.** Vier van de vijf rapporten waren gratis scans bij mensen die gevraagd werden (plan van 26 juli), de enige betaalde kwam via een mens. Er is dus bewijs dat het werk waarde heeft, maar nul bewijs dat iemand er uit zichzelf om vraagt.
2. **De waarde zat in structuur en rust, niet in het vinden van een lek.** In alle vijf evaluaties (`lib/rapporten-data.ts`, veld `evaluatie`) is de verandering een structuur: automatisch reserveren voor jaarkosten, een vaste buffer, een vast privébedrag. Twee van de vijf hadden geen lek; het stel zonder kinderen: "gestopt met zoeken naar iets dat financieel mis zou zijn". De drie vervolggesprekken gingen over structuur en zekerheid. Het aanbod verkoopt een diagnose ("ik zoek uit waarom"); geleverd werd een systeem plus geruststelling.
3. **Ze zoeken het zelf.** De ICP-zoektaal is doe-het-zelftaal (huishoudboekje excel, jaarlijkse kosten reserveren). Extern: 34 procent haalt informatie liever zelf van internet (Nibud 2017), en "kan het zelf" is de hoofdreden om geen hulp te zoeken bij geldbeheer (37 procent, Money Advice Service 2017).
4. **Inzicht is gratis.** Bankapps en de ABN AMRO-coach bieden het zonder kosten.
Tegensignaal: zes keer "voelt krap" op de vraagstap. De nieuwsgierigheid naar het waarom bestaat.

**Werkhypothese.** De doelgroep bestaat en de pijn is echt, maar wat hij wil is rust en een structuur die werkt, het liefst zelf opgezet, misschien met iemand die één keer meekijkt. Een rapport dat uitzoekt waar het geld heen gaat, is een antwoord op een vraag die hij zichzelf niet stelt ("ik weet ongeveer wel waar het heen gaat").

**Toetsen met weinig tijd**
1. **De vijf klanten bellen of mailen, één vraag** (een uur): "Had je hier zelf naar gezocht, wat was het je waard, en wat had je het liefst gekregen: het rapport, de opzet, of het gesprek?" Dit is het sterkste bewijs dat er te krijgen is.
2. **Eén tik op het resultaat voor wie krap zit** (een kleine bouwklus, patroon van de vraagstap): "Wat zou je nu het meest helpen?" Iemand die mijn cijfers bekijkt / een opzet om jaarkosten en buffer zelf te regelen / weten of dit normaal is / een keuze laten doorrekenen / niks, ik weet genoeg. Bij ongeveer 12 per maand na zes tot acht weken rond de 25 antwoorden. Samen met besluit 1, zodat de Geldscan ook echt gezien wordt.
3. Pas daarna, als "zelf regelen" wint: het aanbod rond die structuur bouwen. Niet eerder.

