# Het woordveld rond "financieel coach": waar de juiste zoeker nu landt, 25 september 2026

Onderzoek op verzoek van Jarno, prompt in `docs/prompt-onderzoek-coach-woordveld-24-sep-2026.md`. Er is niets gebouwd: geen pagina, geen FAQ, geen metaTitel. Alles hieronder is een observatie van 25 september 2026 of een voorstel. Jarno beslist.

## De vondst in vier zinnen

1. **Google en Bing zien de site in dit taalgebied totaal verschillend.** Op Google haalt het hele coach-cluster sinds 23 juli nog 0 tot 4 vertoningen per dag op positie 73 tot 99, `/financieel-coach` kreeg in 90 dagen 1 vertoning op "financieel coach" en N4 kreeg er nul. Op Bing staat N4 op 1 voor "Wat kost het om iemand naar je financiën te laten kijken?", en van de twaalf AI-vragen die ik daar heb nagelopen staat er bij zes een eigen pagina in de top 7, bij vier op plek 1.
2. **De 921 vertoningen uit de nulmeting van 5 september waren geen stabiele basis.** Ze vielen vrijwel allemaal in drie weken na publicatie van de twee coach-artikelen (4 tot 22 juli, ongeveer 55 per dag op positie 50 tot 60). Daarna liet Google ze vallen. N4 (live sinds 6 september) heeft daar in Google niets aan veranderd.
3. **Van de 36 AI-antwoorden (12 vragen in Perplexity, ChatGPT en Google AI-modus) noemden er 2 de Geldscan als aanbieder**, allebei op dezelfde vraag: iemand die eenmalig kijkt zonder traject. In 4 andere antwoorden was een eigen pagina de bron, terwijl de lezer werd doorgestuurd naar een budgetcoach of planner. In 9 antwoorden werd deze doelgroep naar schuldhulp, de gemeente, Geldfit of maatschappelijk werk gestuurd.
4. **Er is geen rolnaam die de juiste zoeker bij de juiste hulp laat landen.** De AI noemt wat deze mensen nodig hebben zelf "budgetcoach", maar de Google-resultaten voor budgetcoach zijn gemeente en schuldhulp. De enige formulering die twee keer bij het eigen aanbod uitkwam, is geen rolnaam maar een handeling: eenmalig laten kijken, zonder traject.

## Werkwijze en bronnen

Alles op 25 september 2026, tussen ongeveer 07:00 en 08:00 (Amsterdam).

| Bron | Hoe | Ingelogd | Beperking |
|---|---|---|---|
| Google-autocomplete | Chrome, `google.nl/complete/search` met `hl=nl&gl=nl`, dezelfde suggestiebron als het zoekvak, ongeveer 150 startzinnen | Chrome ingelogd op Jarno's Google-account | Suggesties met "tilburg" komen door de locatie van de browser |
| Google-zoekresultaten | Chrome, google.nl, `hl=nl&gl=nl`, 15 termen, één sessie | ingelogd (zelfde Chrome) | Locatie Tilburg; advertenties gezocht op het label "Gesponsord", kan er een missen |
| Search Console | Chrome, domeinproperty `sc-domain:waarblijfthet.nl`, regex-filter, 28 dagen en 3 maanden. Data loopt tot 22 september | Jarno's account | GSC laat zeldzame zoekopdrachten weg ("anoniem") |
| Perplexity | Chrome, `perplexity.ai/search?q=` | **uitgelogd** (inlogscherm zichtbaar) | Het uitgelogde scherm toont het antwoord niet altijd tot het eind; ik noteer wat zichtbaar was |
| ChatGPT | De ingebouwde browser van de Claude-app, `chatgpt.com/?q=` | **uitgelogd**, geen account, cookies geweigerd | In Chrome was Jarno ingelogd. De tijdelijke chat daar zegt letterlijk dat hij "geheugen, plug-ins en aangepaste instructies" kan gebruiken, dus die is niet gebruikt |
| Google AI-modus | Ingebouwde browser, `google.nl/search?...&udm=50&hl=nl&gl=nl` | **uitgelogd**, cookies geweigerd | Locatie via IP: Tilburg |
| Copilot | `copilot.microsoft.com` | niet gelukt | Vraagt om aanmelden. **Vervangen door Bing organisch**, top 7 per vraag, `setlang=nl&cc=NL`, uitgelogd |
| Google Trends | Chrome, NL, 12 maanden, vijf termen | ingelogd | De grafiek laadde niet (lege kaders na 16 seconden). Gestopt, zoals de prompt voorschrijft. Volumes dus zonder Trends-index |
| Eigen bezoekmeting | `/admin/analyse-verloop` en `/admin/bezoekers`, alleen gelezen | admin | Bezoekers toont alleen de laatste 50 en groepeert bronnen als Google, Direct of Overig |

**Over volumes.** Er is geen keywordtool en Trends leverde vandaag niets. De klassen zijn die van 23 september (klein onder ongeveer 300 per maand, middel 300 tot 1.500, groot erboven), maar zonder Trends kan ik bijna geen term in een klasse zetten. Waar een basis is, staat die erbij. Waar die er niet is, staat "niet vast te stellen". Vertoningen op positie 50 of dieper zeggen weinig over het volume, want op die plek ziet maar een klein deel van de zoekers de site.

## Uitsluitlijst: al getoetst, hier niet opnieuw

| Term of vraag | Waar het staat |
|---|---|
| financieel coach voor particulieren, persoonlijke financiële coaching, financieel planner particulier, persoonlijk financieel inzicht, budgetcoach voor mensen zonder schulden, financiële APK en financiële check, waar gaat mijn geld naartoe hulp | `docs/serp-financieel-coach-07-sep-2026.md` |
| iemand die naar mijn financiën kijkt, financieel overzicht laten maken, budgetcoach zonder schulden (hoofdtermen van N4); second opinion huishoudbudget en financiële check laten doen (geschrapt, geen corpus of nieuwbouwhypotheek) | `docs/serp-invalshoeken-06-sep-2026.md`, sectie N4 |
| samen 6000 netto en toch niets over (#8), waarom verdien ik veel en spaar ik niets (#47), financieel overzicht maken voorbeeld (#69), schamen dat je niet rondkomt met een goed inkomen (#103), geldstress ondanks een goed inkomen (#105), en de overige 102 | `docs/serp-brainstorm-18-aug-2026.md` |
| AI-vraag "wij verdienen samen X netto met kinderen en houden niets over, is dat normaal?" (#9), de volumeklassen | `docs/serp-gemiste-onderwerpen-23-sep-2026.md` |

Mijn AI-vraag 1 lijkt op #9 van 23 september, maar vraagt iets anders: niet "is dat normaal" (een vergelijking) maar "wie kan daar naar kijken" (een dienst). Daarom staat hij er wel in.

**Eigen pagina's in dit taalgebied.** De prompt noemt er zes. Er zijn er meer, en drie daarvan krijgen coach- of adviesvertoningen:

| URL | Vertoningen op het regex-filter, 90 dagen | Opmerking |
|---|---:|---|
| `/inzichten/verschil-budgetcoach-financieel-coach` | 1.016 | de grootste, gemiddelde positie 61,6 |
| `/inzichten/wat-kost-een-financieel-coach` | 352 | positie 31,0 |
| `/inzichten/wat-doet-een-financieel-adviseur` | 96 | **niet in de lijst van de prompt**; krijgt "hoe werkt financieel advies" (62) |
| `/inzichten/is-4000-euro-netto-goed-salaris-nederland` | 79 | alleen op salarisvragen ("hypotheekadviseur salaris"), geen dienstintentie |
| `/inzichten/hoe-weet-ik-of-ik-financieel-gezond-ben` | 5 | niet in de lijst van de prompt |
| `/financieel-coach` | 1 | op "financieel coach", positie 57. De pagina zelf had 74 vertoningen, waarvan 31 op "jarno koopman" |
| `/inzichten/kan-iemand-naar-mijn-financien-kijken` (N4) | 0 | wel geïndexeerd (gecontroleerd met `site:`), nul vertoningen in 90 dagen |
| `/inzichten/wat-kost-een-financieel-adviseur` | 0 | niet in de lijst van de prompt; Bing zet hem op 2 voor de kostenvraag |
| `/geldscan` | 0 op het filter | 20 vertoningen in totaal |

## Spoor 1. Wat de autocomplete letterlijk aanvult

Alleen de bruikbare regels. Suggesties met een plaatsnaam, vacature, opleiding of salaris weggelaten.

| Startzin | Wat Google aanvult | Wat het betekent |
|---|---|---|
| geldcoach | **budgetcoach**, budgetcoach gemeente, budgetcoaching, en plaatsnamen | Google herschrijft geldcoach naar budgetcoach. Het zijn voor Google synoniemen |
| financieel coach | **financieel coach hoger inkomen** (eerste aanvulling), financieel coach ing, rabobank, gemeente | De enige rolnaam met een segment eraan. Banken bieden het ook aan |
| financiële coach | financiële coaching, financiële coach particulier, financiele coach abn amro, ing financial coach | Particulier staat al op de uitsluitlijst |
| money coach, financial coach | Engelstalige en buitenlandse aanbieders | Geen Nederlands corpus |
| financieel begeleider | vacature, financiële begeleiding | Zorg en werk, niet deze dienst |
| geldtherapeut | jeugdtherapeut | Geen corpus |
| financiële therapie, financieel therapeut | financieel therapeut, financial therapy, financieel psycholoog | Bestaat, als therapie |
| onafhankelijk financieel advies | particulieren, fnv, pensioen | Wft-terrein |
| financieel adviseur | **financieel adviseur gezin** (eerste aanvulling) | Bestaat, maar de SERP is Wft (spoor 3) |
| iemand die meekijkt | iemand die meedenkt, meeleeft, met je meegaat | Geen geldbetekenis |
| iemand die naar mijn financiën | iemand die mijn financien regelt | Regelen, niet kijken: bewindvoering |
| uitgaven laten analyseren | excel, voorbeeld, app | Doe-het-zelf |
| bankafschriften laten | bankafschriften laten zien bij hypotheek | Hypotheek |
| huishoudboekje laten | maken, drukken | Doe-het-zelf |
| second opinion financiën, financiën laten doorlichten, sparren over geld, financieel rapport laten maken | alleen "tilburg" | Geen landelijk corpus, alleen locatie |
| geldscan | **geldscanner**, geldscanner app, safescan geldscanner | Het woord betekent voor Google een apparaat dat valse biljetten herkent |
| budgetscan | budget scanner, budgetscenario | Geen corpus |
| uitgavenscan, huishoudscan | uitgaven schema, huishoud schoonmaakschema | Geen corpus |
| financiële scan | financiele scan nieuwbouw, hypotheek, rabobank, ing, whoon | Nieuwbouwhypotheek, zoals "financiële check" op 6 september |
| geldcheck | geldcheck stift, machine, automaat | Apparaat |
| geen schulden wel geldstress | "geldstresser", "geldstressen", "gevolgen", "de baas" | Kunstmatige aanvullingen: de zin wordt zo niet getypt |
| goed inkomen toch krap | "krappa olie", "krap budget" | Kunstmatig: geen corpus |
| goed salaris toch | **goed salaris toch geldstress** (eerste aanvulling) | Bestaat |
| elke maand tekort | elke maand geld tekort, elke maand te weinig geld | Bestaat, zonder inkomen |
| ik kom elke maand | **ik kom elke maand geld tekort** | Bestaat |
| elke maand tekort terwijl | elke maand tekort terwijl je werkt | Werkende armoede, niet de ICP |
| wie kan mij helpen met mijn | pensioen, telefoon, belastingaangifte, administratie, **financien**, schulden | Bestaat |
| wie kan mij helpen met mijn financiën | wie kan mij helpen met geldzaken, met geld, met mijn administratie | Bestaat |
| hulp bij budgetteren zonder schulden | belastingdienst, in nederland | Zwak |
| hulp bij financiën, hulp bij geldzaken | gemeente, ouderen, jongeren, plaatsnamen, abn amro, rabobank | Gemeente en bank |
| budgetcoach of | bewindvoerder, budgetbeheer, schuldhulpverlener | De vergelijking die mensen maken is met schuldhulp, niet met een planner of app |
| budgetcoach of financieel planner, budgetcoach of app, nibud of budgetcoach | geen echte aanvulling | Geen corpus |
| is een budgetcoach | gratis, is budgetcoach een vrij beroep, hoe duur is een budgetcoach, wordt een budgetcoach vergoed | Bestaat, vooral prijs en vergoeding |
| wat doet een budgetcoach, wat kost een budgetcoach | per maand, per uur | Bestaat |
| budgetcoach eenmalig | eenmalige uitkering, eenmalige schenking | Kunstmatig: "eenmalig" wordt niet bij budgetcoach getypt |
| budgetcoach online | budgetcoach online, De Online Budgetcoach (Sprundel), opleiding online | Bestaat |
| budgetcoach via werkgever | budgetcoach voor werknemers, voor medewerkers | Bestaat; werkgevers zijn een gesloten kanaal |
| budgetcoach vergoed | budgetcoaching, wordt een budgetcoach vergoed, budgetcoach tarieven | Bestaat |
| samen naar een budgetcoach, geldcoach voor stellen | budgetcoaching, gemeente, "geldcoach voor stellendam" | Geen corpus voor stellen |
| budgetcoach hoger inkomen, budgetcoach goed inkomen | alleen "tilburg" of "inkomensgrens" | Geen corpus |
| waar kan ik terecht met geldzorgen | alleen plaatsnamen | Lokaal |
| waar blijft mijn geld | ing, marktplaats, rabobank, belastinggeld | Bank en merkvragen |
| uitgavenpatroon | **uitgavenpatroon gemiddelde nederlander**, per leeftijd | Bestaat |
| uitgaven vergelijken | **nibud uitgaven vergelijken**, uitgaven vergelijken met anderen in nederland | Bestaat |
| grip op mijn financien | **hoe krijg ik grip op mijn financien**, grip op mijn geld | Bestaat |
| financiën op orde | krijgen, brengen, maken | Bestaat, doe-het-zelf |
| financieel inzicht | krijgen, abn amro, **gesprek ing** | Banken bieden een "inzichtgesprek" |

**Patroon.** Elke startzin die een product of een handeling beschrijft zoals ik het zou noemen (scan, check, second opinion, laten doorlichten, laten analyseren, meekijken) heeft geen corpus of een andere betekenis. De zinnen die wel bestaan beschrijven het probleem ("ik kom elke maand geld tekort", "goed salaris toch geldstress"), stellen een vraag ("wie kan mij helpen met mijn financiën", "is een budgetcoach gratis") of noemen de rol met een segment ("financieel coach hoger inkomen"). Dat bevestigt wat 6 september over N4 vond.

## Spoor 2. Search Console

Regex: `coach|budgetbeheer|budgetbegeleid|budgetadvies|meekijk|adviseur|advies|scan|check|begeleid|therap|hulp|inzicht|planner|geldzorg|geldstress|financien|financiën|apk|waar blijft|waar gaat|laten kijken|naar mijn`. Eerst stond er `budget` in, maar dat matcht kindgebonden budget en boodschappenbudget en is eruit gehaald. Een tweede regex op probleemtaal (`krap|tekort|geldstress|niks over|niets over|nooit geld|waar blijft|mijn geld|geldzorg|uitgavenpatroon|uitgaven vergelijk|grip op|op orde|hoe noem je`) gaf 190 vertoningen, allemaal op "grip op ..." op positie 81 tot 94.

### Totalen

| Periode | Klikken | Vertoningen | Gemiddelde positie | Zoekopdrachten |
|---|---:|---:|---:|---:|
| 3 maanden (23 jun tot 22 sep) | 0 | 1.460 | 49,9 | 133 |
| 28 dagen (26 aug tot 22 sep) | 0 | 105 | 50,6 | 34 |

Alleen `coach` in de regex, per dag: 0 tot 3 juli, **48 tot 82 per dag van 4 tot 22 juli** op positie 45 tot 61, daarna 0 tot 4 per dag. Uitschieters: 23 tot 26 augustus (8 tot 17 per dag, positie 7 tot 29). Sinds 27 augustus nooit meer dan 4 per dag, op positie 73 tot 99.

**Vergelijking met de nulmeting van 5 september.** Die telde 921 vertoningen in het coach- en budgetcoachcluster. Daarvan viel het leeuwendeel in de drie weken na 2 juli, de publicatiedatum van de twee coach-artikelen. Het cluster is sinds N4 live staat niet verschoven: in de 28 dagen tot 22 september staat van alle coachtermen alleen "budgetcoach" er nog in, met 4 vertoningen. N4 zelf heeft in Google nul vertoningen.

### De coachzoekopdrachten met meer dan 50 vertoningen, en welke URL ze kreeg (3 maanden)

| Zoekopdracht | Totaal | verschil-budgetcoach-financieel-coach | wat-kost-een-financieel-coach | /financieel-coach | Type |
|---|---:|---|---|---|---|
| budgetcoach | 289 op 60,1 | 265 op 65,4 | 24 op 2,4 | geen | **3** en **2** |
| budget coach | 127 op 54,3 | 114 op 60,2 | 13 op 2,1 | geen | **3** en **2** |
| financieel coach | 93 op 29,6 | 83 op 37,4 | 27 op 23,7 | 1 op 57 | **3** (drie URL's) en **2** |
| wat doet een budgetcoach | 90 op 41,7 | 90 op 41,7 | geen | geen | past (informatief) |
| budgetcoaching | 74 op 76,9 | 74 | geen | geen | 2 |
| budgetcoach kosten | 73 op 41,2 | 2 op 66,5 | 73 op 41,2 | geen | 3 |
| wat kost een budgetcoach | 70 op 20,9 | 55 op 65,8 | 67 op 18,8 | geen | **3**; goedkoopste upgradekandidaat |
| wie betaalt een budgetcoach | 67 op 53,8 | 65 op 55,5 | 5 op 41,8 | geen | 3 |
| financiele coach | 63 op 60,5 | 57 op 76,4 | 24 op 43,0 | geen | 3 en 2 |
| hoe werkt financieel advies | 62 op 52,2 | naar `wat-doet-een-financieel-adviseur` | | | past (informatief), buiten het aanbod |
| budgetbeheer of budgetcoach | 54 op 83,8 | 54 | | | budgetbeheer is schuldterrein |

Onder de 50: "geldcoach" 33 vertoningen op **17,8** (verschil 31 op 17,4, wat-kost 8 op 28,4), de beste positie van alle rolnamen. "budgetcoach nodig" 20 op 42,4 en "ik zoek een budgetcoach" 6 op 92,5, allebei naar het verschil-artikel.

**Wat dit laat zien.**

- **Type 2, verkeerde eigen pagina.** Dienstvragen ("budgetcoach", "financieel coach", "geldcoach", "budgetcoach nodig", "ik zoek een budgetcoach") gaan naar twee informatieve artikelen. De dienstpagina `/financieel-coach` krijgt in 90 dagen 1 vertoning op zijn eigen term.
- **Type 3, kannibalisatie.** Acht coachzoekopdrachten vertonen op twee eigen URL's tegelijk, "financieel coach" zelfs op drie.
- **Goedkoopste upgrade met meer dan 50 vertoningen op positie 11 tot 30:** alleen "wat kost een budgetcoach" op `wat-kost-een-financieel-coach` (67 op 18,8). Kanttekening: vrijwel al die vertoningen vielen in juli.
- De posities 2,1 en 2,4 voor "budget coach" en "budgetcoach" op `wat-kost-een-financieel-coach` kan ik niet verklaren (13 en 24 vertoningen). Ik trek er geen conclusie uit.

## Spoor 3. De Google-zoekresultaten van de 15 kandidaten

Chrome, google.nl, `hl=nl&gl=nl`, ingelogd, locatie Tilburg. Geen eigen URL op pagina 1 bij alle vijftien.

| # | Term | AI-overzicht | Top 7 | Meer om te vragen | Mensen zoeken ook naar | Wie wint |
|---|---|---|---|---|---|---|
| 1 | financieel coach hoger inkomen | **Ja**, citeert Uitkomen met je Inkomen ("financieel fit gesprek ... vanaf €4.000 per maand") en Budgetcoach.nl | uitkomenmetjeinkomen.nl, budgetcoach.nl, fnv.nl, budgetcoachgroep.nl, opella.nl, nibud.nl (Nibud-coach voor werknemers), yet.nl | Hoe kan ik 1000 euro per maand extra verdienen?, Kan je leven van 3000 euro per maand?, Is een budgetcoach nuttig voor zzp-ers? | geen | **Budgetcoach, gericht op dit segment**: Uitkomen met je Inkomen staat op 1 en 9 en zegt letterlijk "mensen met een hoog inkomen vanaf + € 4.000" |
| 2 | geldcoach | Ja, citeert Prikkl | prikkl.nl, zestor.nl, mijngeldcoach.nl, schuldhulpmaatje.nl, melinaonfire.nl, coachcircle.nl, budgetcoach.nl, plus hogeschoolrotterdam.nl en abnamro.nl | Wat zijn de kosten van een budgetcoach?, Is een budgetcoach gratis?, Hoe kom ik aan een budgetcoach?, Waar kan ik hulp krijgen bij het omgaan met geld? | Mijn Geldcoach, en zeven keer "hulp bij schulden" (gemeente, Belastingdienst, particulier, Rotterdam, gratis, SchuldHulpMaatje) | Werkgeversregeling (Prikkl, Zestor) en schuldhulp. Local pack aanwezig |
| 3 | financieel adviseur gezin | nee | geldengezinaltena.nl, jagerfinancieeladvies.nl, nibud.nl, vanderaa-adviseurs.nl, altijdvoorelkaar.nl, semmiewealth.nl, yousure.nl | Wat kost gemiddeld een financieel adviseur?, Wanneer heb ik een financieel adviseur nodig?, Welke financiële advies kan ik krijgen bij samenwonen? | particulieren, vermogen, onafhankelijk, kosten, gratis, pensioen | **Wft-planner** |
| 4 | wie kan mij helpen met mijn financiën | nee | schuldhulpmaatje.nl, geldfit.nl, rijksoverheid.nl, belastingdienst.nl, wijzeringeldzaken.nl, nibud.nl, humanitas.nl | Waar kan je terecht als je financiële problemen hebt?, Wat kan ik doen als ik het financieel niet meer red?, Hoeveel kost een gesprek met een financieel adviseur? | Financiële hulp gemeente, Hulp bij schulden (4x), Ik heb geen geld meer wat nu | **Schuldhulp en overheid** |
| 5 | is een budgetcoach gratis | nee | imwbreda.nl, schuldhulpmaatje.nl, ras.nl, regelhulp.nl, utrecht.nl, oss.nl, doorzaam.nl | Waar kan ik gratis een budgetcoach krijgen?, verschil budgetcoach en budgetbeheer | Gratis hulp bij schulden, Budgetcoach gemeente, plaatsnamen | **Gemeente** (vier van de zeven) |
| 6 | wat kost een budgetcoach | Ja: "gemiddeld tussen de €50 en €100 per uur", citeert Independer | simpelbudgetcoaching.nl, budget-kompas.nl, eindhoven.nl, independer.nl, huishoudenoporde.nl, mentaalinzicht.nl, mijngeldcoach.nl | Wat zijn de taken van een budgetcoach?, Is een budgetcoach gratis?, tarieven budgetbeheer | Budgetcoach gemeente, Wat kost een budgetbeheerder, Schuldhulpverlening Eindhoven | Budgetcoaches, plus gemeente |
| 7 | wat doet een budgetcoach | Ja, citeert Budgetcoach.nl | budgethulpnederland.nl, kenniscentrumsociaaldomein.nl, zzp-nederland.nl, budgetcoach.nl, hilversum.nl, openup.com, kompaswerkt.nl | Wat kost een budgetcoach per uur?, verschil bewindvoerder en budgetcoach, Is een budgetcoach gratis? | Budgetcoach gemeente, Budgetcoach particulier, plaatsnamen | Budgetcoach en gemeente |
| 8 | budgetcoach online | nee | deonlinebudgetcoach.nl, budgetcoachonline.nl, budgetcoachme.nl, budgetcoach.nl, pggmenco.nl, budget-kompas.nl, loi.nl | geen | Budgetcoach gemeente, Budgetcoach particulier, cursus | **Budgetcoach** (online-aanbieders) |
| 9 | budgetcoach voor werknemers | Ja, "helpt medewerkers met geldzorgen of schulden", citeert Budgetcoach.nl | budgetcoach.nl, nibud.nl, defittemedewerker.nl, mastersnetwerk.nl, pggmenco.nl, mijnsofie.nl, mercescustodio.nl | Waar kan ik gratis een budgetcoach krijgen? | Budgetcoach gemeente, Budget coach gratis | Werkgeversregeling |
| 10 | financieel therapeut | Ja, citeert Financial Psychology Institute Europe | financieeltherapeut.nl, abnamro.nl, prikkl.nl, fnv.nl, budgetcoach.nl, openup.com, opella.nl | Welke begeleiding kan ik krijgen bij financiële problemen?, Is een budgetcoach gratis? | Financieel Coach ING, Financieel Gezond Coach ABN AMRO, Budgetcoach gemeente | Therapie en coaches, twee banken |
| 11 | ik kom elke maand geld tekort | Ja: "gratis hulp en advies via de Geldfit website of het Nibud" | nibud.nl (2x), geldfit.nl, rijksoverheid.nl, destapnaargezonder.nl, startpuntgeldzaken.nl, rabobank.nl | **Wat is normaal om per maand uit te geven?**, Kun je rondkomen van 3000 euro per maand? | Ik heb geen geld meer wat nu, Rondkomen van 1400/2000/2500 euro, Financiële hulp gemeente | **Schuldhulp en Nibud** |
| 12 | goed salaris toch geldstress | nee | intermediair.nl, ad.nl, samenfitter.nu, ericaverdegaal.nl, linda.nl, sante.nl, budgetcoach.nl (uitkomenmetjeinkomen.nl op 9) | Is €3000 netto een goed salaris?, **Is €4000 netto een goed salaris?** | Rondkomen van 4000 euro per maand, 2x modaal | Media en coaches. is-4000 beantwoordt een PAA-vraag hier, maar staat zelf niet op de pagina: **type 4** |
| 13 | nibud uitgaven vergelijken | nee | negen keer nibud.nl | Wat zijn normale uitgaven per maand?, 50-30-20-regel | Nibud normbedragen, Nibud kosten levensonderhoud, Nibud boodschappen | Nibud, volledig |
| 14 | hoe krijg ik grip op mijn financiën | nee | nibud.nl, nn.nl, geldfit.nl, gripopjemoney.nl, rechtwijzer.nl, wijzeringeldzaken.nl, abnamro.nl | Waar kan ik gratis een budgetcoach krijgen? | Leren omgaan met geld, Ik kan niet met geld omgaan, Financiële hulp gemeente | Nibud, bank, schuldhulp |
| 15 | uitgaven vergelijken met anderen | nee | nibud.nl (3x), wijzeringeldzaken.nl, flowyour.money, pggmenco.nl, ad.nl | Wat is een normaal boodschappenbudget voor 1 persoon?, Kun je rondkomen van 3000 euro per maand? | Nibud uitgaven overzicht, Nibud normbedragen | Nibud |

**Advertenties:** op geen van de vijftien gevonden (label "Gesponsord"). Op 7 september stonden er drie tot vier bij "financieel coach voor particulieren". Dat kan aan mijn detectie liggen; ik trek er geen conclusie uit.

**Het label "verkeerd landen" per type aanbieder:** gemeente of schuldhulp wint 5 van de 15 (2, 4, 5, 11, 14), Nibud 2 (13, 15), Wft-planner 1 (3), werkgeversregeling 2 (2, 9), budgetcoach 4 (1, 6, 7, 8), media of therapie 2 (10, 12).

## Spoor 4. AI-zoekmachines

Twaalf vragen, gebouwd op spoor 1 en de twee profielen. Sandra: vraag 1 en 10. Niels: vraag 3 en 12. De rest zonder profiel. Letterlijke citaten kort; de kern per antwoord.

**P** = Perplexity, uitgelogd, Chrome. **C** = ChatGPT, uitgelogd, ingebouwde browser. **G** = Google AI-modus, uitgelogd, ingebouwde browser. **B** = Bing organisch top 7, uitgelogd (Copilot vroeg om aanmelden). Alle op 25 september 2026.

| # | Vraag | P | C | G | B |
|---|---|---|---|---|---|
| 1 | Wij verdienen samen 6.500 netto, hebben twee kinderen en een koophuis, en houden elke maand niks over. Wie kan daar naar kijken? | Nibud, **"Gemeentelijk Schuldhulpverlening / Budgetcoaching"**, onafhankelijk adviseur, hypotheekadviseur, Belastingdienst (toeslagen checken). `samen-6000-euro-netto-toch-niets-over` is de bron voor de oorzaken (jaaruitgaven, twee percepties), niet als aanbieder. **Type 1 en 2** | "onafhankelijk financieel planner/adviseur of een budgetcoach"; geen bronnen; niet genoemd. **Type 4** | Nibud, Geldfit, IMW regio Tilburg of een budgetcoach, hypotheekadviseur of FFP-planner. Niet genoemd. **Type 1** | **1. `samen-6000-euro-netto-toch-niets-over`** |
| 2 | Ik heb geen schulden maar wel geldstress. Waar kan ik terecht? | Geldfit, je gemeente, Wijzer in geldzaken, Informatiepunt Digitale Overheid. **Type 1** | IMW regio Tilburg, gemeente Tilburg, Humanitas. **Type 1** | Geldfit, Nibud, Mentaal Vitaal. **Type 1** | nibud, evie, welingelichtekringen, nji. Type 4 |
| 3 | Ik verdien 4.500 netto en snap niet waar mijn geld blijft. Heb ik een budgetcoach nodig of een financieel adviseur? | "meer baat bij een budgetcoach (of geldcoach)". N4 is zeven keer de bron, ook voor "€60 en €150 per uur, soms pakketten vanaf circa €250". Advies: "zoek dan een budgetcoach voor een intakegesprek". Geldscan niet genoemd. **Type 2** | budgetcoach; biedt aan het zelf uit te rekenen. Type 4 | "je hebt een budgetcoach (of financieel coach) nodig"; Careyn, Nibud. Type 4 | **1. `hoeveel-financiele-ruimte-heb-ik`, 2. nog een eigen /inzichten-URL** |
| 4 | Is er iemand die eenmalig naar mijn uitgaven kan kijken zonder dat het een traject wordt? | **"1. Geldscan (€49)"**, bron N4; daarna Budgetbuddy "Money Kickstart sessie (€147)" en een losse sessie bij een budgetcoach. **Genoemd** | **"Eenmalige geldscan: Waar blijft het ... voor €49"**, en het adviesgesprek van €125; daarna Budgetcoach Me, regelhulp, twee lokale adviseurs. **Genoemd** | Tilburg Helpt / Schuldhulpverlening, Geldfit, en "zet het hier in de chat". **Type 1** | stimulansz, rechtwijzer, leningaanbieder, rabobank. Type 4 |
| 5 | Wat kost het om iemand naar je financiën te laten kijken? | bandbreedtes, AFM; "€250 tot €600 voor een eenvoudige inventarisatie". Niet genoemd. **Type 4** | "Financieel coach/budgetcoach: ongeveer €60 tot €150 per uur. Een compleet traject kost vaak €250 tot €800", **met Waar blijft het als bron**. De €49 wordt niet genoemd. **Type 2** | Niki de Wolff, uurtarieven, pakketten. Type 4 | **1. N4, 2. `wat-kost-een-financieel-adviseur`** |
| 6 | Is een budgetcoach alleen voor mensen met schulden? | Nee, preventief; bron nibc. Type 4 | Nee; overheid. Type 4 | Nee. Type 4 | openup, fidende, dik, melinaonfire. Type 4 |
| 7 | Hoe weet ik of mijn uitgaven normaal zijn voor ons gezin? | Nibud, NN, 50/30/20 als startpunt. Type 4 | **Biedt zelf aan het uit te rekenen** ("stuur bijvoorbeeld ..."). Type 4 | Nibud-adviesnormen. Type 4 | nibud (2x), budgetteer, rekenmachinepro, financelle, finbuddy, **7. `wat-is-normaal-bedrag-boodschappen-per-maand`** (type 2) |
| 8 | Ik zoek een financieel coach voor mensen met een hoger inkomen. Wie raad je aan in Nederland? | "eerder een onafhankelijk financieel planner dan een algemene budgetcoach"; CFP via FFP, Buro Philip van den Hurk, Praat over Geld. **Type 1 (Wft)** | Boutique Vermogen Planners, Altijd Voor Elkaar, RFPA, VOFP. **Type 1 (Wft)** | **Uitkomen met je Inkomen** ("specifiek op professionals ... met een hoog inkomen"), plus FFP. Bezet segment en type 1 | budgetcoach.nl, budgethulpnederland, coaching.nl, financielecoachingnederland, **5. `/financieel-coach`** |
| 9 | Wat is een geldcoach en heb ik er een nodig als ik goed verdien? | Bron voor de definitie is **`wat-doet-een-financieel-adviseur`**; genoemde coaches: Eigenwaarde Geldcoaching, Melina on Fire, OpenUp. **Type 2** | generiek, geen bronnen. Type 4 | Budgetcoach.nl. Type 4 | **1. `verschil-budgetcoach-financieel-coach`** |
| 10 | Wie kan mij helpen met mijn financiën? Ik heb geen schulden, maar we komen elke maand net rond met 7.000 netto samen. | Geldfit, Nibud, gemeente, BerekenJeRecht (toeslagen). **Type 1** | Nibud, planner, budgetcoach, je bank, gemeente. **Type 1** | onafhankelijke budgetcoach, FFP-planner, zelf aan de slag. Type 4 | wijzeringeldzaken (2x), geldhulp, rabobank, nibud. Type 1 |
| 11 | Ik verdien goed maar heb altijd stress over geld. Heb ik een financieel therapeut nodig? | "kan zeker zinvol zijn"; bron moneycontrol (Indiaas); huisarts. Deels | "Niet per se"; psycholoog of therapeut als het emotioneel is. Deels | therapeut of psycholoog. Deels | openup, stresstrainer, pitggz, goedegeldgewoonten |
| 12 | Ik kom elke maand geld tekort terwijl ik 5.000 netto verdien. Wat moet ik doen? | stappenplan, Geldfit en BerekenJeRecht. Type 1 | stappenplan; **doet het zelf** ("dan kan ik je maandbudget doorlichten"). Type 4 | stappenplan (afschriften, omgekeerd sparen, vaste lasten). Type 4 | saldomio, geldgenius, destapnaargezonder |

### Wat de AI-tabel laat zien

- **Genoemd als aanbieder: 2 van de 36** (P4 en C4). Beide keren alleen bij de vraag naar eenmalig kijken zonder traject.
- **Eigen pagina als bron, aanbod niet genoemd: 4 van de 36** (P1, P3, P9, C5). Onze tekst voedt het advies "zoek een budgetcoach". Dat is type 2 in AI-vorm.
- **Naar schuldhulp, gemeente, Geldfit of maatschappelijk werk gestuurd: 9 van de 36** (P1, P2, P10, P12, C2, C10, G1, G2, G4). Ook bij huishoudens met 6.500 en 7.000 netto. Bij P1 en P10 staat het advies om toeslagen te checken; of dat bij dit inkomen iets oplevert heb ik niet getoetst.
- **Naar een Wft-planner: alle drie bij vraag 8**, en als bijoptie bij P1, C1, G1, C10 en G10.
- **De AI biedt zelf de analyse aan** bij C3, C7, C10, C12 en G4. Voor "ik wil weten of mijn uitgaven normaal zijn" is de AI zelf de gratis concurrent van de gratis analyse.
- **Bing zet bij 6 van de 12 vragen een eigen pagina in de top 7** (1, 3, 5, 7, 8, 9), bij vier daarvan op plek 1 (1, 3, 5, 9). Google zet op geen van de vijftien termen uit spoor 3 een eigen URL op pagina 1.

### Klopt de beschrijving?

- **P4 en C4, prijs en vorm:** €49, eenmalig, met de hand, rapport, gratis analyse eerst, geen traject. Klopt met de site. C4 noemt ook het adviesgesprek van €125, "45 minuten". Volgens CLAUDE.md sectie 5 blijft dat tekst op aanvraag; de AI heeft de prijs dus ergens op de site gevonden.
- **P4: "je gegevens worden na levering verwijderd" en "anonimiteit".** Het eerste staat op N4 (regel 264 en 341: "daarna verwijder ik je gegevens"). Dat klopt alleen zolang Jarno het met de hand doet (open waarheidsschuld, CLAUDE.md sectie 11). "Anonimiteit" heb ik op N4 niet teruggevonden; dat is een samenvatting van de AI.
- **P3 en C5, de prijzen van anderen:** "€60 tot €150 per uur" en "€250 tot €800" komen uit de prijstabel van `wat-kost-een-financieel-coach`. Die pagina heeft als externe bronnen alleen Nibud (algemene pagina) en Geldfit. **De bandbreedtes zelf hebben geen bron met ophaaldatum**, en ze worden nu door twee AI's doorgegeven met Waar blijft het als bron. Dat valt onder CLAUDE.md regel 3.

## Spoor 5. Eigen bezoekmeting

`/admin/analyse-verloop`, periode "alles", herkomst vóór het eerste bezoek aan /analyse:

| Herkomst | Geopend | Gestart | Resultaat |
|---|---:|---:|---:|
| google.com | 86 | 31 | 23 |
| bing.com | 6 | 3 | 3 |
| chatgpt.com | 3 | 2 | 1 |
| gemini.google.com | niet in de samenvatting; 1 sessie in de lijst (20 sep) | 1 | 1 |
| perplexity, copilot | 0 | 0 | 0 |

De twee chatgpt.com-sessies in de lijst zijn van 7 september (afgehaakt op het huurscherm) en 11 september (resultaat gezien). Op 7 september heeft een eerdere sessie ChatGPT getest via Jarno's account; of die eerste sessie een test was, kan ik niet zien.

Het Bezoekers-tabblad toont alleen de laatste 50 bezoeken en groepeert bronnen als Google, Direct of Overig, dus op welke pagina AI-bezoekers landen is daar niet af te lezen.

**Conclusie: n is te klein.** Drie bezoeken via ChatGPT en één via Gemini in ongeveer drie weken meting. Ik trek er geen conclusie uit, behalve dat Bing (6) meer analyses aanlevert dan alle AI's samen.

## Alle kandidaten

| Term of vraag | Gevonden via | Past bij het aanbod | Waar landt hij nu | Eigen URL vertoond | Volume | Voorstel |
|---|---|---|---|---|---|---|
| financieel coach hoger inkomen | autocomplete (eerste aanvulling) | **ja**, maar het segment is bezet | type 1: budgetcoach voor dit segment (Uitkomen met je Inkomen, ook in het AI-overzicht) | nee | niet vast te stellen; eerste aanvulling na "financieel coach", met AI-overzicht | b: FAQ op `/financieel-coach`; e |
| geldcoach | autocomplete, GSC | ja | type 2 en 3 (verschil 31 op 17,4, wat-kost 8 op 28,4); SERP werkgever en schuldhulp | ja, zie links | klein tot middel; Google leest het als budgetcoach | b: geldcoach in antwoordblok of FAQ van `verschil-budgetcoach-financieel-coach` |
| budgetcoach, budget coach, budgetcoaching | GSC | deels: de term trekt vooral schuldvragen | type 2 en 3 | ja: verschil 265 op 65,4 en wat-kost 24 op 2,4 | middel of groter; basis: 289 vertoningen in 90 dagen op positie 60 en tientallen plaatsnaamvarianten | c-light: één URL per intentie aanwijzen, zie top 10 #2 |
| financieel coach | GSC | ja | type 3 (drie eigen URL's) en type 2 | ja: 83 op 37,4, 27 op 23,7, 1 op 57 | niet vast te stellen | zie top 10 #2 |
| wat kost een budgetcoach, budgetcoach kosten | GSC, autocomplete | ja | type 3; AI-overzicht citeert Independer | ja: wat-kost 67 op 18,8 en 73 op 41,2 | klein tot middel | b: metaTitel en antwoordblok `wat-kost-een-financieel-coach` op budgetcoach |
| wat doet een budgetcoach | GSC, autocomplete | deels | informatief, verschil-artikel is de juiste soort pagina; SERP gemeente | ja: 90 op 41,7 | klein tot middel | a |
| wie betaalt een budgetcoach, is een budgetcoach gratis, wordt een budgetcoach vergoed | GSC, autocomplete, PAA | deels: het antwoord is "gratis via de gemeente, bij schulden" | type 1: gemeenten (4 van de 7) | ja: verschil 65 op 55,5 | klein | b: één FAQ op het verschil-artikel, met wie wel en wie niet in aanmerking komt |
| wie kan mij helpen met mijn financiën (+ AI-variant 7.000 netto) | autocomplete, AI | **ja** | type 1: schuldhulp en overheid in SERP, P, C en B | nee | niet vast te stellen | b: FAQ in deze letterlijke vorm op N4; e |
| Is er iemand die eenmalig naar mijn uitgaven kan kijken zonder traject? | AI | **ja** | P en C: Geldscan genoemd; G: schuldhulp Tilburg; B: type 4 | Bing nee | niet te meten | e; b: de zin letterlijk als kop of FAQ op N4 zodat ook Google hem vindt |
| Wat kost het om iemand naar je financiën te laten kijken? | AI | ja | P, G: type 4; C: type 2 (bron voor andermans prijzen); B: N4 op 1 | Bing ja | niet te meten | b: bron voor de prijstabel op wat-kost (waarheidsschuld) |
| Ik verdien 4.500 netto ... budgetcoach of financieel adviseur? | AI | **ja** | type 2 bij P (N4 als bron, advies budgetcoach) | Bing ja (`hoeveel-financiele-ruimte-heb-ik`) | niet te meten | b: in het antwoordblok van N4 zeggen waar de Geldscan staat ten opzichte van budgetcoach en adviseur; e |
| Ik heb geen schulden maar wel geldstress | AI (autocomplete: geen corpus) | **ja** | type 1 bij alle drie de AI's | nee | als zoekzin klein of nul | e |
| goed salaris toch geldstress | autocomplete | **ja** | type 4: media (Intermediair, AD, Linda), coaches | nee | klein | b: een PAA-vraag hier is "Is €4000 netto een goed salaris?"; geen actie op is-4000 nodig, wel als AI-testvraag (e) |
| ik kom elke maand geld tekort (terwijl ik 5.000 netto verdien) | autocomplete, AI | deels: zonder bedrag is het vooral de lagere inkomensgroep | type 1: Nibud, Geldfit, schuldhulp | nee | niet vast te stellen | a voor Google; e voor de AI-variant met bedrag |
| Wat is normaal om per maand uit te geven? (PAA) / Hoe weet ik of mijn uitgaven normaal zijn voor ons gezin? | PAA, AI | **ja**: dit is letterlijk wat de gratis analyse doet | type 4; Bing type 2 (boodschappenartikel) | nee | niet vast te stellen | b: letterlijk antwoordblok of FAQ op H1 (`wat-geeft-een-gezin-uit-per-maand`); e |
| nibud uitgaven vergelijken, uitgaven vergelijken met anderen | autocomplete | ja | Nibud, volledig | nee | niet vast te stellen | a: merkterm Nibud, niet te winnen |
| uitgavenpatroon gemiddelde nederlander | autocomplete | ja | niet onderzocht (15 termen op) | niet onderzocht | niet vast te stellen | geparkeerd voor een volgende SERP-sessie, H1 of H2 |
| hoe krijg ik grip op mijn financiën | autocomplete, GSC | deels | Nibud, bank, schuldhulp | GSC-cluster "grip op ..." 190 op positie 81 tot 94 | niet vast te stellen | a |
| Wat is een geldcoach en heb ik er een nodig als ik goed verdien? | AI | ja | P: type 2 (`wat-doet-een-financieel-adviseur` als bron); B: verschil op 1 | Bing ja | niet te meten | b, samen met "geldcoach" hierboven |
| Ik zoek een financieel coach voor mensen met een hoger inkomen | AI | ja | type 1 (Wft) bij alle drie | Bing ja (`/financieel-coach` op 5) | niet te meten | e |
| budgetcoach online | autocomplete | deels | online budgetcoaches | nee | niet vast te stellen | a: dienstkeyword, segment bezet |
| financieel therapeut | autocomplete | deels: therapie is het niet | therapie en coaches | nee | klein | a |
| Heb ik een financieel therapeut nodig? | AI | deels | therapie of huisarts | nee | niet te meten | a |
| financieel adviseur gezin | autocomplete | **nee** (Wft) | Wft-planners | nee | niet vast te stellen | a |
| budgetcoach voor werknemers, via werkgever | autocomplete | nee: werkgevers zijn een gesloten kanaal (CLAUDE.md 7) | werkgeversregeling | nee | niet vast te stellen | a |

## Top 10, op fit en goedkoopste actie

| # | Wat | Waarom | Actie (voorstel) | Pagina |
|---|---|---|---|---|
| 1 | **"eenmalig laten kijken, zonder traject"** | De enige vraag waarop twee AI's de Geldscan noemen, met de juiste prijs. Google AI-modus stuurt dezelfde vraag naar schuldhulp in Tilburg | e: in de maandelijkse AI-test. b: de vraag letterlijk als kop of FAQ op N4 | N4 |
| 2 | **Kannibalisatie coachtermen** | Acht zoekopdrachten op twee eigen URL's, "financieel coach" op drie. Geen van de drie wint | b: één intentie per URL. verschil-artikel = "wat doet / verschil", wat-kost = "wat kost een budgetcoach of financieel coach", `/financieel-coach` = de dienst. Titels en antwoordblokken daarop, onderlinge links op de juiste ankertekst. Geen 301: de drie beantwoorden verschillende vragen | verschil, wat-kost, `/financieel-coach` |
| 3 | **Bron voor de prijstabel op wat-kost** | Twee AI's geven "€60 tot €150 per uur" en "€250 tot €800" door met Waar blijft het als bron, en die bandbreedtes hebben geen bron | b: bronnen met ophaaldatum zoeken of de bandbreedtes weghalen (CLAUDE.md regel 3). Jarno beslist | wat-kost-een-financieel-coach |
| 4 | **wat kost een budgetcoach** | Enige coachterm met meer dan 50 vertoningen op positie 11 tot 30 (67 op 18,8) | b: "budgetcoach" in de metaTitel van wat-kost, met het jaartal vooraan (CLAUDE.md 8.C.15), bijvoorbeeld "2026: wat kost een budgetcoach of financieel coach?". Meten in de CTR-ronde | wat-kost-een-financieel-coach |
| 5 | **wie kan mij helpen met mijn financiën** | Bestaat in de autocomplete, past precies, landt bij schuldhulp in de SERP en bij twee AI's | b: FAQ in die letterlijke vorm, met "zonder schulden" en een inkomen in het antwoord | N4 |
| 6 | **budgetcoach of financieel adviseur (Niels)** | Alle drie de AI's zeggen budgetcoach. Perplexity gebruikt N4 zeven keer als bron en stuurt dan naar een intake bij een budgetcoach | b: in het antwoordblok van N4 zeggen dat een budgetcoach een traject is en de Geldscan één keer kijkt, met de prijs | N4 |
| 7 | **Wat is normaal om per maand uit te geven?** | PAA bij "ik kom elke maand geld tekort", en de vraag die de gratis analyse beantwoordt. Nergens een eigen URL, de AI biedt zichzelf aan | b: letterlijk antwoordblok of FAQ op H1 | `wat-geeft-een-gezin-uit-per-maand` |
| 8 | **geldcoach** | Beste positie van alle rolnamen (17,4 op het verschil-artikel); Perplexity citeert voor "wat is een geldcoach" een artikel over financieel adviseurs | b: geldcoach in een kop of FAQ van het verschil-artikel. `/financieel-coach` heeft al een geldcoach-FAQ | verschil-budgetcoach-financieel-coach |
| 9 | **financieel coach hoger inkomen** | Eerste autocomplete-aanvulling, en de enige rolnaam met segment. Bezet door een coach die zich op precies dit segment richt, en de AI's sturen naar Wft-planners | b: FAQ op `/financieel-coach`, zonder onderscheidsclaim, met de rapporten als bewijs (CLAUDE.md 4). e | `/financieel-coach` |
| 10 | **wie betaalt een budgetcoach / is een budgetcoach gratis** | 65 vertoningen op het verschil-artikel; de SERP is gemeente | b: één FAQ die zegt voor wie het gratis is en voor wie niet | verschil-budgetcoach-financieel-coach |

Er staat geen nieuwe pagina in de top 10. Geen enkele kandidaat is in één zin te scheiden van N4, `/financieel-coach` of de twee coach-artikelen.

## De strategische deelvraag: onder welke naam landt de zoeker het best?

**Niet vast te stellen als rolnaam.** Wat ik wel kan zeggen, per naam:

| Naam | Wat ik vond | Landt de juiste zoeker bij de juiste hulp? |
|---|---|---|
| budgetcoach | Het meeste corpus (GSC, autocomplete, plaatsnamen) en het woord dat alle drie de AI's zelf gebruiken voor "ik verdien goed en snap niet waar het blijft". Maar de SERP is gemeente en schuldhulp, en "budgetcoach of" wordt aangevuld met bewindvoerder, budgetbeheer en schuldhulpverlener | Nee: de zoeker komt bij schuldhulp |
| financieel coach | Bestaat, met banken (ING, Rabobank) en "hoger inkomen" in de autocomplete. Op Google zijn onze pagina's hier weggezakt | Deels; bij "hoger inkomen" is het segment bezet |
| geldcoach | Google herschrijft het naar budgetcoach. SERP: werkgeversregeling en schuldhulp. Wel onze beste positie (17,4) | Nee, volgt budgetcoach |
| iets met meekijken | Geen corpus in de autocomplete ("iemand die meekijkt" gaat over meedenken en meeleven) | Niet te zeggen: niemand typt het |
| scan (geldscan, budgetscan, financiële scan) | Geldscanner, budget scanner, nieuwbouwhypotheek | Nee: het woord betekent iets anders |
| second opinion | Alleen met "tilburg" (locatie), op 6 september al geen corpus voor huishoudbudget | Niet te zeggen |
| therapeut, therapie | Bestaat, als therapie | Nee, ander aanbod |
| **eenmalig laten kijken, zonder traject** (een handeling, geen naam) | De enige formulering die twee keer bij de Geldscan uitkwam (P4, C4), met de juiste prijs | Ja, in 2 van de 3 AI's. Google AI-modus: nee |

Het bewijs wijst erop dat de naam voor de persoon er minder toe doet dan de beschrijving van wat er gebeurt: één keer, met de hand, geen traject, geen schulden nodig. De AI's koppelen de rol "budgetcoach" aan dit probleem, dus die rol kan een vergelijkingswoord zijn ("een budgetcoach is een traject; dit is één keer kijken"), zoals N4 en `/financieel-coach` al doen. Dat is een voorlopige lezing van één meting per vraag per machine, geen vaststelling. Na twee maandelijkse AI-tests met dezelfde vragen is er meer te zeggen.

## Bewust niet

- **Productnamen met "scan" of "check" als zoekterm.** Geldscan en budgetscan hebben geen corpus of betekenen een apparaat; financiële scan en financiële check zijn de nieuwbouwhypotheek. De merknaam Geldscan blijft, maar er komt geen pagina op het woord.
- **second opinion financiën, financiën laten doorlichten, sparren over geld, financieel rapport laten maken.** Alleen lokale aanvullingen (Tilburg); landelijk geen corpus.
- **financieel adviseur gezin, onafhankelijk financieel advies (zonder product), financieel planner.** Wft-terrein, CLAUDE.md sectie 4.
- **budgetcoach voor werknemers, via werkgever, budgetcoach vergoed via werkgever.** Werkgevers zijn tot 31 januari 2027 een gesloten kanaal.
- **financieel therapeut, financiële therapie, geldtherapeut.** Ander aanbod; geldtherapeut heeft geen corpus.
- **money coach, financial coach.** Engelstalig en internationaal. N5 is de enige Engelse pagina en heeft zijn eigen meetpunt.
- **budgetcoach en hulp bij geldzaken met een plaatsnaam, geldzorgen, financiële hulp gemeente.** Plaatsnamen staan op de niet-bouwenlijst; geldzorgen is schuldhulpterrein.
- **financiën laten beheren, iemand die mijn financiën regelt.** Bewindvoering.
- **goed inkomen toch krap, geen schulden wel geldstress, budgetcoach eenmalig, budgetcoach goed of hoger inkomen, geldcoach voor stellen, samen naar een budgetcoach.** De autocomplete vult ze kunstmatig aan of alleen met een plaatsnaam: ze worden zo niet getypt. De vraagvorm van "geen schulden wel geldstress" gaat wel mee in de AI-test.
- **nibud uitgaven vergelijken.** Merkterm, negen keer nibud.nl.
- **Een nieuwe pagina "financieel coach voor hoger inkomen".** De scheiding met `/financieel-coach` is niet in één zin uit te leggen, en onderscheid claimen op dit segment mag niet (CLAUDE.md 4).

## Voorgestelde volgorde (binnen de tempo-regel)

Alles hieronder is onderhoud of een herschrijving van een bestaande pagina. Er is geen nieuwe pagina bij, dus de datum van 5 oktober voor de eerstvolgende nieuwe pagina blijft staan en schuift niet door dit voorstel. Wel telt elke herschreven pagina mee in de twee per week.

1. **4 oktober, bij CTR-ronde 1:** de kannibalisatie (top 10 #2) als besluit voorleggen: welke URL krijgt welke intentie. Nog niets wijzigen.
2. **Week van 5 oktober, twee pagina's:** `wat-kost-een-financieel-coach` (top 10 #3 en #4: bron voor de prijstabel of weghalen, metaTitel op budgetcoach) en `verschil-budgetcoach-financieel-coach` (#8 geldcoach, #10 wie betaalt).
3. **Week van 12 oktober, twee pagina's:** N4 (#1, #5, #6: de drie letterlijke vragen als kop of FAQ, en de Geldscan naast de budgetcoach in het antwoordblok) en `/financieel-coach` (#9, en de toegewezen dienstintentie uit stap 1).
4. **Week van 19 oktober:** H1, het letterlijke antwoord op "Wat is normaal om per maand uit te geven?" (#7).
5. **1 november (killgrensmeting):** het coach-cluster in GSC opnieuw meten met dezelfde regex, 28 dagen. Verwachting mag niet hoog zijn: de oorzaak kan ook zijn dat Google deze pagina's na juli heeft teruggezet, en dat los je niet op met een titel.
6. **5 december, meetpunt N4 (90 dagen):** N4 heeft in Google nul vertoningen, maar staat in Bing op 1 en wordt door twee AI's als bron gebruikt. De contentkill van CLAUDE.md sectie 9 rekent alleen met Google-vertoningen. Voorstel: Bing en de AI-test meewegen voordat N4 wordt samengevoegd. Beslissing aan Jarno.

## Voorstel voor de maandelijkse AI-test (CLAUDE.md 8.E.21)

Uitgelogd, in Perplexity, ChatGPT (ingebouwde browser of een privévenster, nooit Jarno's account, ook geen tijdelijke chat daar) en Google AI-modus. Noteer per vraag: genoemd als aanbieder, alleen als bron, of niet.

1. Is er iemand die eenmalig naar mijn uitgaven kan kijken zonder dat het een traject wordt? (nu: P en C noemen de Geldscan, G niet)
2. Wij verdienen samen 6.500 netto, hebben twee kinderen en een koophuis, en houden elke maand niks over. Wie kan daar naar kijken? (nu: P gebruikt ons als bron, niemand noemt ons)
3. Ik verdien 4.500 netto en snap niet waar mijn geld blijft. Heb ik een budgetcoach nodig of een financieel adviseur? (nu: P gebruikt N4 als bron en stuurt naar een budgetcoach)
4. Ik heb geen schulden maar wel geldstress. Waar kan ik terecht? (nu: drie keer schuldhulp of Geldfit)
5. Wie kan mij helpen met mijn financiën? Ik heb geen schulden, maar we komen elke maand net rond met 7.000 netto samen. (nu: schuldhulp en gemeente)

Plus, na een eerste herhaling, eventueel "Wat kost het om iemand naar je financiën te laten kijken?" (om te zien of de €49 naast de prijzen van anderen komt te staan).

## Open voor Jarno

1. Welke URL krijgt welke coachintentie (top 10 #2)?
2. De bandbreedtes op `wat-kost-een-financieel-coach`: bron zoeken of weghalen (#3)?
3. Het N4-meetpunt van 5 december: alleen Google, of Bing en de AI-test meewegen?
4. De zin "daarna verwijder ik je gegevens" op N4 wordt nu door Perplexity doorgegeven. Hij klopt alleen zolang je het met de hand doet (bestaande waarheidsschuld).
5. Nibud: niet opgevraagd, niet nodig voor dit onderzoek.

## Aanvulling: ChatGPT ingelogd op Jarno's account, 25 september 2026

Op verzoek van Jarno dezelfde twaalf vragen gesteld in zijn eigen ChatGPT-account, in Chrome, in een tijdelijke chat (zodat ze niet in zijn geschiedenis komen). Die tijdelijke chat zegt zelf dat hij geheugen en aangepaste instructies kan gebruiken. **Deze uitkomsten zijn dus niet vergelijkbaar met de uitgelogde test** en tellen niet mee in de cijfers hierboven.

| # | Wat ChatGPT ingelogd antwoordde | Waar blijft het genoemd? | Geheugen zichtbaar? |
|---|---|---|---|
| 1 | "financieel planner" of "financieel coach voor huishoudens zonder schulden"; spreekt van "geldlekken"; biedt aan in Tilburg te zoeken. Zonder bronnen | nee | ja: de woordkeuze lijkt op onze positionering |
| 2 | Goossens Financiële dienstverlening (lokaal, kaart), Geldfit, CAK, Rijksoverheid | nee | nee |
| 3 | budgetcoach, met een tabel budgetcoach tegen adviseur; Nibud; biedt aan het zelf uit te rekenen | nee | nee |
| 4 | Budgetcoach Me "Financiële Check" van 2,5 uur, Pien's Budgethulp (eenmalig gesprek, €153,67), Personal Budgetcoach "Quick scan" €250, en als vierde: "Waar blijft het biedt een eenmalig Geldrapport voor €49", gelinkt naar `/financieel-coach` | **ja**, als vierde optie | nee |
| 5 | prijstabel (kort gesprek €60 tot €150, eenmalige check €125 tot €225, analyse met plan €250 tot €500); N4 als "interessant aanbod"; daarna letterlijk "Als je dit vraagt omdat je nadenkt over wat zoiets voor Waar blijft het? zou moeten kosten" | ja | **ja, expliciet**: spreekt Jarno aan als eigenaar |
| 6 | nee, niet alleen voor schulden; Budgetcoach.nl; daarna "een interessante nuance voor Waar blijft het?" | ja | **ja, expliciet** |
| 7 | biedt aan zelf te benchmarken, en noemt daarbij de gezinsgrootte uit het geheugen | nee | **ja**: persoonlijke gegevens |
| 8 | Uitkomen met je Inkomen, Hilde Radt (financieel business coach), FFP, VOFP | nee | nee |
| 9 | uitleg geldcoach tegen adviseur, geen bronnen | nee | nee |
| 10 | "financieel coach voor huishoudens zonder schulden of een onafhankelijk financieel planner"; biedt aan in Tilburg te zoeken | nee | ja: dezelfde woordkeuze als vraag 1 |
| 11 | "waarschijnlijk niet in de eerste plaats een financieel therapeut", eerst cashflow | nee | nee |
| 12 | stappenplan; biedt aan het budget zelf door te lichten | nee | nee |

**Wat dit toevoegt.**

- Het geheugen maakt de test onbruikbaar als meting: bij drie van de twaalf antwoorden (5, 6, 7) spreekt ChatGPT Jarno aan als eigenaar van Waar blijft het of gebruikt hij gegevens over zijn gezin. Dat bevestigt de waarschuwing van 7 september en de keuze om de AI-test uitgelogd te doen.
- Ook met dat geheugen noemt ChatGPT de Geldscan als aanbieder alleen bij vraag 4, net als uitgelogd. Bij vraag 5 en 6 komt Waar blijft het ter sprake omdat ChatGPT weet dat Jarno de eigenaar is, niet als aanbeveling aan een zoeker.
- **Nieuw bij vraag 4: drie aanbieders van een eenmalige check** die in de uitgelogde test niet voorkwamen: Budgetcoach Me (Financiële Check, 2,5 uur), Pien's Budgethulp (€153,67) en Personal Budgetcoach (Quick scan, €250). Dezelfde dag op de sites gecontroleerd, zie `docs/concurrenten-eenmalige-check-25-sep-2026.md`: Budgetcoach Me en Personal Budgetcoach (€250) kloppen; **Pien's Budgethulp biedt geen eenmalig gesprek aan** (alleen bewind en budgetbeheer), daar zat ChatGPT fout. Het segment "eenmalig kijken" is dus niet leeg; dat past bij CLAUDE.md sectie 4 (segment bezet, geen onderscheid claimen op prijs of vorm).
