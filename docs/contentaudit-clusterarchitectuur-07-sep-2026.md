# Contentaudit en clusterarchitectuur, 7 september 2026

Audit op verzoek van Jarno, buiten de bouwvolgorde om. **Er is in deze sessie geen letter content geschreven of herschreven.** Dit document beoordeelt uitsluitend wat er staat.

## Methode en grenzen

Wat eronder ligt:

- **De pagina's zelf**: alle 94 artikelen uit `lib/inzichten-data.ts` en de 14 publieke niet-artikelpagina's, uitgelezen per artikelblok (niet met grep, want dat mist de acht velden die op de regel onder hun sleutel staan en de artikelen waarvan het object met `},  {` opent).
- **De cijfers**: `docs/gsc-nulmeting-05-sep-2026.md`, dus GSC over ongeveer 4 juni tot 3 september 2026. Elke vertoning, klik, CTR en positie in dit document komt daaruit. Ik heb niets geschat.
- **De interne linkstructuur**: alle `href`-waarden in de 94 contentcomponenten, geteld per richting.
- **Steekproef live**: drie URL's opgevraagd op www.waarblijfthet.nl om te controleren of de deploy van 6 september staat en of de 301's werken.

Wat er niet onder ligt, en wat je dus niet uit dit document mag lezen:

1. **Geen zoekvolumes.** Er is geen keywordtool en die komt er niet (werkregel 8.3). "Vermoedelijk primair keyword" is mijn gevolgtrekking uit slug, titel, metaTitel en de FAQ's, en waar GSC de term bevestigt staat dat erbij. Waar GSC zwijgt, is het een hypothese.
2. **Geen SERP-verificatie.** Werkregel 8.1 verbiedt de WebSearch-tool voor dit werk en schrijft Chrome op google.nl voor. Dat is in deze sessie niet gedaan. Uitspraken over concurrentie komen uit de bestaande SERP-documenten, niet uit nieuw onderzoek.
3. **De zoektermenlijst dekt een vijfde van het verkeer.** Een cluster met een laag getal kan groter zijn dan het lijkt. Niet gevonden is niet hetzelfde als niet aanwezig.
4. **Kannibalisatie is hier deels een vermoeden.** Waar de nulmeting het per zoekterm heeft gefilterd (modaal, boodschappen, vaste lasten, 3500) staat het gemeten. Elders leid ik het af uit overlappende intentie, en dat vraagt een GSC-filter voordat je een 301 zet.

## Zeven conclusies

**1. De tien clusters bevatten de verkeersmotor van de site niet.** is-4000 en het boodschappenartikel zijn samen 58 procent van alle artikelvertoningen en 65 procent van de klikken. is-4000 valt in geen van de tien clusters; het boodschappenartikel alleen als je hem als vergelijkingspagina leest, wat hij nu maar half is. Tegelijk staan de tien clusters vol pagina's met nul vertoningen. Als je de architectuur strikt op deze tien clusters bouwt, zet je de twee pagina's die het verkeer binnenhalen buiten je eigen structuur. Dat is te repareren zonder een letter te schrijven, en het staat daarom op prioriteit 1.

**2. Vier van de tien clusters zijn dezelfde zoekintentie.** C1 (waar blijft mijn geld), C8 (goed inkomen weinig overhouden), C3 (financieel inzicht) en C4 (financiele ruimte) beschrijven vier woorden voor een en dezelfde vraag: waar gaat het heen en wat houd ik over. De site heeft daar nu elf pagina's op staan die samen 475 vertoningen en 23 klikken doen, met 43 inkomende links. Tien clusters is voor deze hoeveelheid content te veel; het is een uitnodiging tot precies de kannibalisatie die de site al heeft.

**3. De duurste kannibalisatie zit op de kernvraag, niet op de bedragen.** Drie pagina's beantwoorden "wat houd ik over": `vrij-besteedbaar-inkomen-berekenen`, `hoeveel-financiele-ruimte-heb-ik` en `hoeveel-geld-overhouden-einde-maand`. Samen 161 vertoningen, 2 klikken en 23 inkomende links. Een van de drie staat op positie 8,45; de andere twee op 12 en op niets.

**4. De linkwaarde van de site loopt dood op een onzichtbare pagina.** `goed-salaris-toch-krap` heeft 14 inkomende links, meer dan is-4000 zelf, en nul vertoningen in 90 dagen. Daarnaast: `geld-indelen-salaris-potjes-systeem` (15 links, 3 klikken), `vrij-besteedbaar-inkomen-berekenen` (13 links, 1 klik), `wat-zijn-normale-vaste-lasten-gezin` (7 links, 0 vertoningen). De interne links wijzen naar methodepagina's, niet naar pijlers.

**5. C2 is de enige primaire conversie-ingang en heeft geen zoeksurface.** `/analyse` komt in de hele GSC-export niet voor: nul vertoningen. Alles op de site verwijst ernaartoe (76 interne links, de meest gelinkte bestemming die er is), maar niemand vindt hem via Google. Dit is het grootste commerciele gat in de architectuur.

**6. Twee groepen van samen negen pagina's werken tegen de positionering.** De vijf pagina's over achteraf betalen en Klarna doen 2.839 vertoningen en 30 klikken, alle vijf zonder bron, en trekken schuldentaal naar een site die uitdrukkelijk geen schuldhulp is. De vier pagina's over de financieel coach en adviseur doen 1.806 vertoningen en 7 klikken op posities 26 tot 56, en de nulmeting stelde al vast dat dat cluster grotendeels schuldenpubliek is. Samen is dat de helft van al het verkeer buiten de top twee, op publiek dat niet koopt.

**7. Het paginapakket is de uitzondering, niet de regel.** Van de 94 artikelen halen 22 de norm van minstens 5 FAQ's en 3 bronnen uit CLAUDE.md sectie 8. Achttien artikelen hebben nul bronnen, en dertien daarvan hebben vertoningen: `netto-loonsverhoging-berekenen` (2.844), `klarna-niet-kunnen-betalen` (2.616) en `vrij-besteedbaar-inkomen-berekenen` (128) zijn de scherpste. Dat is niet alleen een SEO-punt; waarheidsregel 3 zegt dat een cijferclaim zonder bron niet live hoort te staan.

## Statusverdeling

| Status | Betekenis | Artikelen | Vertoningen | Klikken |
|---|---|---:|---:|---:|
| **A** | behouden zoals het is, alleen kleine optimalisaties | 8 | 13.910 | 323 |
| **B** | behouden maar inhoudelijk of SEO-technisch verbeteren | 19 | 20.164 | 301 |
| **C** | positionering sterk aanpassen | 5 | 1.545 | 4 |
| **D** | samenvoegen met een andere pagina | 16 | 429 | 6 |
| **E** | verwijderen of noindex overwegen | 11 | 155 | 0 |
| **F** | behouden als ondersteunende long-tail content | 35 | 3.273 | 49 |
| | **Totaal** | **94** | **39.476** | **683** |

De verdeling zegt iets dat de losse regels niet zeggen: bijna al het verkeer zit in status A en B, en bijna alle pagina's in status F. Er staan 94 artikelen waarvan 39 nul vertoningen hebben. Het probleem van deze site is niet te weinig content.

---

# Deel 1. Inventarisatie per pagina

Per cluster twee tabellen. Tabel 1 is wat de pagina wil zijn, tabel 2 is wat hij doet en wat ermee moet. Vertoningen, klikken, CTR en positie zijn 90 dagen, uit de GSC-nulmeting van 5 september. Een leeg positieveld betekent nul vertoningen.

De kolom **autoriteit** antwoordt op de vraag uit de opdracht: helpt deze pagina de site autoriteit op te bouwen rond financiele hulp en financieel inzicht voor mensen zonder schulden?


## 1. C1. Waar blijft mijn geld?

*10 pagina's, 204 vertoningen, 4 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/waarom-hou-ik-nooit-geld-over` | Waarom hou ik nooit geld over, terwijl ik goed verdien? | Problem, oorzaakvraag | waarom hou ik nooit geld over | geld verdwijnt, einde maand niets over | problem | Waarom blijft er nooit iets over? |
| `/inzichten/schamen-niet-rondkomen-goed-inkomen` | Schamen dat je niet rondkomt met een goed inkomen | Emotie, herkenning | schamen niet rondkomen | geldschaamte, niet durven vertellen | awareness | Waarom schaam ik me terwijl ik goed verdien? |
| `/inzichten/waarom-lijkt-iedereen-rijker` | Waarom lijkt iedereen rijker dan jij? Over geld vergelijken | Sociale vergelijking | waarom lijkt iedereen rijker | iedereen heeft meer geld, sociale media geld | awareness | Waarom lijkt iedereen rijker dan ik? |
| `/inzichten/goed-salaris-toch-krap` | Goed salaris, maar toch niet rondkomen? Dit is waarom | Problem, herkenning | goed salaris toch krap | waar blijft mijn geld, goed verdienen weinig over | problem | Waarom voelt een goed salaris toch krap? |
| `/inzichten/piekeren-over-geld` | Piekeren over geld terwijl het eigenlijk goed gaat | Emotie | piekeren over geld | geldstress, slecht slapen geld | awareness | Wat doe ik tegen piekeren over geld? |
| `/inzichten/money-dysmorphia-uitleg` | Money dysmorphia: waarom genoeg nooit genoeg voelt | Definitie | money dysmorphia | geldbeeld vertekend, rijker lijken | awareness | Wat is money dysmorphia? |
| `/inzichten/waar-blijft-het-bij-mark-en-lisa` | Waar blijft het bij Mark & Lisa: €4.000 netto en toch krap | Casestudy | waar blijft het bij een gezin | voorbeeld gezinsbudget | problem | Waar blijft het geld bij dit gezin? |
| `/inzichten/waar-blijft-het-bij-fatima` | Waar blijft het bij Fatima: €2.900 netto, één inkomen voor drie | Casestudy | waar blijft het bij een alleenstaande | alleenstaand budget voorbeeld | problem | Waar blijft het geld bij dit huishouden? |
| `/inzichten/waar-blijft-het-bij-david-en-tom` | Waar blijft het bij David & Tom: €5.500, geen kinderen, toch krap | Casestudy | waar blijft het bij een stel | stel zonder kinderen budget | problem | Waar blijft het geld bij dit stel? |
| `/inzichten/waar-blijft-het-bij-sanne-en-joost` | Waar blijft het bij Sanne & Joost: €6.200 netto en toch krap | Casestudy | waar blijft het bij tweeverdieners | tweeverdieners voorbeeld | problem | Waar blijft het geld bij deze tweeverdieners? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `waarom-hou-ik-nooit-geld-over` | 188 | 4 | 2,13% | 22,3 | 9 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C4-pijler (vrij besteedbaar) en /analyse | Met goed-salaris-toch-krap en hoeveel-geld-overhouden-einde-maand | Ja, met de C1-groep | Midden (3 FAQ, 2 bronnen) | Midden (188 vert., pos 22) | Midden | Ja | **B** |
| `schamen-niet-rondkomen-goed-inkomen` | 14 | 0 | 0,00% | 70,3 | 3 | Eigen slotblok: “Wil je weten hoe jouw situatie ervoor staat?” | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C1-pijler | Met piekeren-over-geld en goed-salaris-toch-geldstress | Beperkt, alle drie nauwelijks zichtbaar | Laag (0 bronnen) | Laag (14 vert., pos 70) | Laag | Nee | **F** |
| `waarom-lijkt-iedereen-rijker` | 2 | 0 | 0,00% | 6,0 | 2 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C9-vergelijking | Met money-dysmorphia-uitleg | Ja, twee pagina's op hetzelfde begrip | Laag (4 FAQ, 1 bron) | Laag (2 vert.) | Midden (brug naar vergelijken) | Deels | **D** |
| `goed-salaris-toch-krap` | 0 | 0 | - | - | 14 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /analyse en de C8-pijler | Zwaar met waarom-hou-ik-nooit-geld-over, goed-salaris-toch-geldstress, tweeverdieners-toch-krap, alleen-wonen-goed-salaris-toch-krap | Ja, het ernstigste geval op de site: 5 pagina's op dezelfde vraag | Midden (5 FAQ, 3 bronnen) | Laag als losse pagina, hoog als linkknooppunt | Hoog (kernpositionering) | Deels | **C** |
| `piekeren-over-geld` | 0 | 0 | - | - | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C1-pijler | Met schamen- en geldstress-pagina | Beperkt | Laag (4 FAQ, 1 bron) | Laag (0 vert.) | Laag | Nee | **F** |
| `money-dysmorphia-uitleg` | 0 | 0 | - | - | 5 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C9-vergelijking | Met waarom-lijkt-iedereen-rijker | Ja | Laag (3 FAQ, 0 bronnen) | Laag (0 vert.) | Midden | Deels | **D** |
| `waar-blijft-het-bij-mark-en-lisa` | 0 | 0 | - | - | 0 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /rapporten | Met de drie andere casestudy's en met de 5 echte rapporten | Beperkt (alle vier 0 vert.) | Laag (2 FAQ, 1 bron, bedachte namen) | Laag | Laag | Nee | **E** |
| `waar-blijft-het-bij-fatima` | 0 | 0 | - | - | 2 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /rapporten/alleenstaand-huurwoning | Idem | Beperkt | Laag (2 FAQ, 0 uitgaande links) | Laag | Laag | Nee | **E** |
| `waar-blijft-het-bij-david-en-tom` | 0 | 0 | - | - | 0 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /rapporten/stel-zonder-kinderen | Idem | Beperkt | Laag (2 FAQ, 1 bron) | Laag | Laag | Nee | **E** |
| `waar-blijft-het-bij-sanne-en-joost` | 0 | 0 | - | - | 0 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /rapporten/tweeverdieners-drie-kinderen | Idem | Beperkt | Laag (3 FAQ, 1 bron) | Laag | Laag | Nee | **E** |

**Toelichting per status**

- **waarom-hou-ik-nooit-geld-over**, status B. Doelpagina van de 301 van 6 sep. Pakket incompleet: 3 FAQ en 2 bronnen tegen de norm van 5 en 3. Meet op 4 okt of de 15 vertoningen overkomen.
- **schamen-niet-rondkomen-goed-inkomen**, status F. Emotionele instap zonder cijfer. Houd hem als long-tail, maar 0 bronnen is in strijd met waarheidsregel 3 zodra je hem aanraakt.
- **waarom-lijkt-iedereen-rijker**, status D. Samenvoegen met money-dysmorphia-uitleg: zelfde vraag, ander woord. Eén pagina met beide termen.
- **goed-salaris-toch-krap**, status C. 14 inkomende links, 0 vertoningen in 90 dagen. De linkwaarde van de site loopt hier dood. Ofwel echte C1-pijler maken en de zoekterm claimen, ofwel 301 naar de C8-pijler en de 14 links omleggen.
- **piekeren-over-geld**, status F. Ondersteunend. Raakt aan welzijn, niet aan de dienst. Niet in investeren.
- **money-dysmorphia-uitleg**, status D. Doelpagina van de samenvoeging hierboven, of zelf de 301. Kies de term die in GSC vertoningen heeft; nu geen van beide.
- **waar-blijft-het-bij-mark-en-lisa**, status E. Bedachte namen naast 5 echte rapporten. Bezet de merkzin 'waar blijft het bij' die de echte rapporten zouden moeten claimen. Beslissing Jarno: labelen of 301 naar /rapporten.
- **waar-blijft-het-bij-fatima**, status E. Idem. Bovendien nul uitgaande interne links, dus geen enkele functie in de architectuur.
- **waar-blijft-het-bij-david-en-tom**, status E. Idem. 0 inkomende links.
- **waar-blijft-het-bij-sanne-en-joost**, status E. Idem. 0 inkomende links.

## 2. C2. Financiele check / financiele analyse

*1 pagina's, 0 vertoningen, 0 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/kan-iemand-naar-mijn-financien-kijken` | Kan iemand naar mijn financiën kijken zonder dat ik schulden heb? | Hulpvraag, dienstintentie | kan iemand naar mijn financien kijken | iemand die naar mijn geld kijkt, financien laten doorlichten | solution | Kan iemand met mij naar mijn cijfers kijken? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `kan-iemand-naar-mijn-financien-kijken` | 0 | 0 | - | - | 2 | Eigen slotblok: “Begin bij de vergelijking, die is gratis” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /analyse en /geldscan | Met /financieel-coach en verschil-budgetcoach-financieel-coach | Risico met /financieel-coach: zelfde dienstintentie | Hoog (5 FAQ, 4 bronnen, eigen CTA) | Onbekend (6 sep live) | Hoog | Ja | **A** |

**Toelichting per status**

- **kan-iemand-naar-mijn-financien-kijken**, status A. Nieuw en volgens het pakket gebouwd. Sterkste kandidaat voor de C7-pijler. Indienen in GSC en meten op 5 dec.

## 3. C3. Financieel inzicht

*10 pagina's, 1.324 vertoningen, 27 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/vaste-lasten-overzicht-maken` | Een overzicht van je vaste lasten maken: het complete stappenplan | Oplossing, stappenplan | vaste lasten overzicht maken | vaste lasten checklist, lijst vaste lasten | solution | Hoe maak ik een overzicht van mijn vaste lasten? |
| `/inzichten/grip-op-je-geld-krijgen` | Geen grip op je geld, terwijl je goed verdient? Zo kreeg ik er controle over | Oplossing, stappenplan | grip op je geld krijgen | overzicht krijgen geld, geld op orde | solution | Hoe krijg ik grip op mijn geld? |
| `/inzichten/huishoudboekje-voorbeeld` | Huishoudboekje voorbeeld: waarom bijhouden je nog niet zegt of het veel is | Informational, voorbeeld | huishoudboekje voorbeeld | huishoudboekje maken, voorbeeld excel | solution | Hoe ziet een huishoudboekje eruit? |
| `/inzichten/potjesmethode-gezin-hoe-werkt-het` | De potjesmethode voor gezinnen: hoe werkt het, en waarom werkt het eigenlijk? | Methode | potjesmethode gezin | potjes systeem geld gezin | solution | Hoe werkt de potjesmethode voor een gezin? |
| `/inzichten/geld-indelen-salaris-potjes-systeem` | Je salaris slim indelen: het rekeningen- en potjessysteem | Methode | geld indelen salaris potjes | salaris verdelen over potjes | solution | Hoe verdeel ik mijn salaris over potjes? |
| `/inzichten/budget-maken-dat-je-volhoudt` | Waarom je budget altijd mislukt, en hoe je er een maakt die je wel volhoudt | Oplossing | budget maken dat je volhoudt | budgetteren volhouden | solution | Hoe maak ik een budget dat ik volhoud? |
| `/inzichten/moet-je-een-huishoudboekje-bijhouden` | Moet je een huishoudboekje bijhouden? Waarom structuur beter werkt | Twijfelvraag | moet je een huishoudboekje bijhouden | huishoudboekje nut | problem | Heeft een huishoudboekje zin? |
| `/inzichten/53-weken-spaaruitdaging-schema-2026` | De 53-weken spaaruitdaging 2026: het complete schema | Tool, schema | 53 weken spaaruitdaging schema | spaaruitdaging 2026 | awareness | Hoe werkt de 53-weken-spaaruitdaging? |
| `/inzichten/cash-stuffing-beginnen` | Cash stuffing: zo begin je, met een gratis startschema | Methode, trend | cash stuffing beginnen | enveloppen systeem contant | awareness | Hoe begin ik met cash stuffing? |
| `/inzichten/geldmythes-die-je-arm-houden` | 5 hardnekkige geldmythes die je arm houden | Awareness, opinie | geldmythes | mythes over geld | awareness | Welke geldmythes kloppen niet? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `vaste-lasten-overzicht-maken` | 615 | 3 | 0,49% | 43,8 | 7 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C10 (wat is normaal) en /analyse | Met wat-zijn-normale-vaste-lasten-gezin en grip-op-je-geld-krijgen | Ja, met wat-zijn-normale-vaste-lasten-gezin (0 vert., 7 inkomende links) | Midden (3 FAQ, 2 bronnen) | Hoog (615 vert., 7 inkomende links) | Midden | Ja | **B** |
| `grip-op-je-geld-krijgen` | 216 | 0 | 0,00% | 81,8 | 2 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C3-pijler en /analyse | Met budget-maken-dat-je-volhoudt en vaste-lasten-overzicht-maken | Ja, drie pagina's op 'overzicht en grip' | Midden (3 FAQ, 2 bronnen) | Laag op korte termijn (pos 82) | Midden | Deels | **C** |
| `huishoudboekje-voorbeeld` | 187 | 5 | 2,67% | 18,9 | 2 | Eigen slotblok: “Wil je de vergelijking op je hele maand, niet op één schatting?” | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /analyse | Met moet-je-een-huishoudboekje-bijhouden | Ja, twee pagina's op hetzelfde begrip | Hoog (5 FAQ, 3 bronnen) | Midden (187 vert., 2,67% CTR) | Midden | Deels | **B** |
| `potjesmethode-gezin-hoe-werkt-het` | 179 | 14 | 7,82% | 19,2 | 13 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub | Met geld-indelen-salaris-potjes-systeem | Ja | Hoog (5 FAQ, 3 bronnen) | Hoog (7,82% CTR op pos 19) | Midden | Deels | **B** |
| `geld-indelen-salaris-potjes-systeem` | 86 | 3 | 3,49% | 17,1 | 15 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | potjesmethode-gezin-hoe-werkt-het | Met potjesmethode-gezin en 50-30-20-regel | Ja, drie methodepagina's | Midden (3 FAQ, 2 bronnen) | Midden (86 vert., 15 inkomende links) | Laag | Nee | **F** |
| `budget-maken-dat-je-volhoudt` | 28 | 1 | 3,57% | 10,5 | 4 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C3-pijler | Met grip-op-je-geld-krijgen en de potjes-pagina's | Ja, met de C3-groep | Midden (3 FAQ, 2 bronnen) | Laag (28 vert.) | Laag | Nee | **F** |
| `moet-je-een-huishoudboekje-bijhouden` | 9 | 1 | 11,11% | 17,9 | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | huishoudboekje-voorbeeld | Met huishoudboekje-voorbeeld | Ja | Laag (4 FAQ, 1 bron) | Laag (9 vert.) | Laag | Nee | **D** |
| `53-weken-spaaruitdaging-schema-2026` | 4 | 0 | 0,00% | 4,5 | 2 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | spaardoelen-maandelijkse-inleg | Met spaardoelen-maandelijkse-inleg | Beperkt | Laag (3 FAQ, 0 bronnen) | Laag (4 vert.) | Laag | Nee | **E** |
| `cash-stuffing-beginnen` | 0 | 0 | - | - | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | potjesmethode-gezin | Met de twee potjes-pagina's | Beperkt | Laag (3 FAQ, 0 bronnen) | Laag (0 vert.) | Laag | Nee | **E** |
| `geldmythes-die-je-arm-houden` | 0 | 0 | - | - | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C3-pijler | Beperkt | Nee | Laag (2 FAQ, 1 bron) | Laag (0 vert.) | Laag | Nee | **E** |

**Toelichting per status**

- **vaste-lasten-overzicht-maken**, status B. Nulmeting wijst deze aan als de duidelijkste kandidaat van cluster B2: 489 van de 543 'vaste lasten'-vertoningen, positie 53,6. Herschrijven naar het volledige pakket, niet alleen een nieuwe titel.
- **grip-op-je-geld-krijgen**, status C. 216 vertoningen op positie 82: geen titelprobleem maar een positieprobleem. Als je C3 wilt bezetten is dit de term; dan is het een herschrijving naar het volledige pakket, geen optimalisatie.
- **huishoudboekje-voorbeeld**, status B. Beste CTR van de C3-groep. Doelpagina voor de samenvoeging met moet-je-een-huishoudboekje-bijhouden.
- **potjesmethode-gezin-hoe-werkt-het**, status B. Hoogste CTR van alle artikelen met volume. Positiewerk hier levert meer op dan een nieuwe pagina elders.
- **geld-indelen-salaris-potjes-systeem**, status F. Meest gelinkte pagina van de site (15 inkomende links) met 3 klikken. De linkwaarde staat op een methodepagina in plaats van op een pijler. Laat de pagina staan, maar verplaats inkomende links naar C4 of C9 waar je ze nodig hebt.
- **budget-maken-dat-je-volhoudt**, status F. Ondersteunend. Niet zelf uitbouwen.
- **moet-je-een-huishoudboekje-bijhouden**, status D. Samenvoegen met huishoudboekje-voorbeeld als FAQ. 9 vertoningen rechtvaardigt geen eigen URL.
- **53-weken-spaaruitdaging-schema-2026**, status E. Buiten de ICP en met een jaartal in de slug dat in december vervalt. Kandidaat voor de contentkill van 5 dec.
- **cash-stuffing-beginnen**, status E. Trendmethode voor contant huishouden, buiten de ICP (goedverdiener in loondienst). 0 bronnen, 0 vertoningen, 1 inkomende link.
- **geldmythes-die-je-arm-houden**, status E. Halve pagina zonder eigen cijfer. 0 vertoningen, 1 inkomende link. Samenvoegen of noindex.

## 4. C4. Financiele ruimte

*4 pagina's, 245 vertoningen, 3 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/vrij-besteedbaar-inkomen-berekenen` | Wat blijft er over na je vaste lasten? Reken je vrij besteedbaar inkomen uit | Rekenintentie | vrij besteedbaar inkomen berekenen | hoeveel houd ik over na vaste lasten, besteedbaar inkomen | solution | Wat houd ik over na alle vaste lasten? |
| `/inzichten/50-30-20-regel-hoger-inkomen` | Hoeveel houd je over na je vaste lasten? De 50/30/20-regel getoetst bij een hoger inkomen | Methode | 50 30 20 regel hoger inkomen | budgetregel hoog inkomen | solution | Werkt de 50/30/20-regel bij een hoger inkomen? |
| `/inzichten/hoeveel-financiele-ruimte-heb-ik` | Hoeveel financiële ruimte heb ik eigenlijk? | Zelftoets | hoeveel financiele ruimte heb ik | financiele ruimte berekenen | problem | Hoeveel financiele ruimte heb ik? |
| `/inzichten/hoeveel-geld-overhouden-einde-maand` | Hoeveel hoor je aan het einde van de maand over te houden in 2026? | Benchmark | hoeveel geld overhouden per maand | wat is normaal overhouden | problem | Hoeveel hoor ik over te houden? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `vrij-besteedbaar-inkomen-berekenen` | 128 | 1 | 0,78% | 8,4 | 13 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C9-vergelijking en /analyse | Zwaar met hoeveel-financiele-ruimte-heb-ik en hoeveel-geld-overhouden-einde-maand | Ja, drie pagina's op dezelfde vraag | Midden (3 FAQ, 0 bronnen) | Hoog (pos 8,45, 13 inkomende links) | Hoog | Ja | **B** |
| `50-30-20-regel-hoger-inkomen` | 84 | 1 | 1,19% | 68,9 | 9 | Eigen slotblok: “Klopt de 50/30/20-regel bij jouw huishouden, of niet?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C4-pijler | Met de potjes-pagina's | Beperkt | Hoog (5 FAQ, 2 bronnen) | Laag (pos 68,9) | Midden | Deels | **F** |
| `hoeveel-financiele-ruimte-heb-ik` | 33 | 1 | 3,03% | 12,3 | 5 | Eigen slotblok: “Wil je weten hoe jouw financiële ruimte ervoor staat?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C4-pijler | Zwaar met vrij-besteedbaar-inkomen-berekenen | Ja | Hoog (6 FAQ, 3 bronnen, 8 uitgaande links) | Laag (33 vert., pos 12) | Hoog (kernterm van de strategie) | Deels | **D** |
| `hoeveel-geld-overhouden-einde-maand` | 0 | 0 | - | - | 5 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C4-pijler en C9 | Met de twee hierboven en met hoeveel-sparen-per-maand | Ja, vierdubbel | Midden (3 FAQ, 3 bronnen) | Laag (0 vert.) | Midden | Deels | **D** |

**Toelichting per status**

- **vrij-besteedbaar-inkomen-berekenen**, status B. Sterkste kandidaat voor de C4-pijler: enige van de drie met vertoningen op pagina 1 en met 13 inkomende links. 0 bronnen moet weg voordat je hem als pijler neerzet.
- **50-30-20-regel-hoger-inkomen**, status F. Nulmeting zegt expliciet: zwakker dan vaste-lasten-overzicht-maken, niet de B2-kandidaat. Houd hem als ondersteunende long-tail met 9 inkomende links.
- **hoeveel-financiele-ruimte-heb-ik**, status D. Inhoudelijk de beste van het trio, meetbaar de zwakste. Samenvoegen met vrij-besteedbaar-inkomen-berekenen en die term als H2 daarin opnemen; de 8 uitgaande links in dezelfde deploy omleggen.
- **hoeveel-geld-overhouden-einde-maand**, status D. Derde pagina op dezelfde vraag, 0 vertoningen, 5 inkomende links. Samenvoegen in de C4-pijler.

## 5. C5. Financiele gezondheid

*2 pagina's, 85 vertoningen, 1 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/hoe-weet-ik-of-ik-financieel-gezond-ben` | Hoe weet ik of ik financieel gezond ben? | Zelftoets | financieel gezond zijn | financiele gezondheid checken, financiele APK | problem | Ben ik financieel gezond? |
| `/inzichten/goed-inkomen-weinig-vermogen` | Waarom groeit mijn vermogen niet terwijl ik goed verdien? | Problem | goed inkomen weinig vermogen | veel verdienen geen vermogen | problem | Waarom heb ik weinig vermogen bij een goed inkomen? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `hoe-weet-ik-of-ik-financieel-gezond-ben` | 59 | 0 | 0,00% | 38,8 | 3 | Eigen slotblok: “Wil je weten hoe jouw financiële situatie ervoor staat?” | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /analyse | Met goed-inkomen-weinig-vermogen en hoeveel-financiele-ruimte-heb-ik | Beperkt | Hoog (6 FAQ, 3 bronnen, 7 uitgaande links) | Midden (59 vert., pos 39) | Hoog | Ja | **B** |
| `goed-inkomen-weinig-vermogen` | 26 | 1 | 3,85% | 13,2 | 3 | Eigen slotblok: “Wil je weten hoe jouw situatie ervoor staat?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C5-pijler en C8-pijler | Met de C8-groep | Beperkt | Hoog (6 FAQ, 3 bronnen) | Midden (26 vert., pos 13) | Midden | Ja | **B** |

**Toelichting per status**

- **hoe-weet-ik-of-ik-financieel-gezond-ben**, status B. De enige echte C5-pagina en meteen de pijler. Positie 39 met een compleet pakket: dit is inkomende links en interne prominentie nodig, geen herschrijving.
- **goed-inkomen-weinig-vermogen**, status B. Compleet pakket, kleine vindbaarheid. Duidelijkste spaak onder de C5-pijler.

## 6. C6. Financieel coach

*4 pagina's, 1.806 vertoningen, 7 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/verschil-budgetcoach-financieel-coach` | Budgetcoach of financieel coach: het verschil en wat bij jou past | Vergelijking, dienst | verschil budgetcoach financieel coach | budgetcoach of financieel coach | commercial | Wat is het verschil tussen een budgetcoach en een financieel coach? |
| `/inzichten/wat-kost-een-financieel-coach` | Wat kost een financieel coach? Tarieven in 2026 | Prijsvraag, dienst | wat kost een financieel coach | tarieven financieel coach | commercial | Wat kost een financieel coach? |
| `/inzichten/wat-doet-een-financieel-adviseur` | Wat doet een financieel adviseur, en heb jij er echt één nodig? | Definitie, dienst | wat doet een financieel adviseur | financieel adviseur uitleg | awareness | Wat doet een financieel adviseur? |
| `/inzichten/wat-kost-een-financieel-adviseur` | Wat kost een financieel adviseur, en heb je er echt één nodig? | Prijsvraag, dienst | wat kost een financieel adviseur | kosten financieel adviseur | commercial | Wat kost een financieel adviseur? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `verschil-budgetcoach-financieel-coach` | 1119 | 4 | 0,36% | 56,2 | 2 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /financieel-coach | Met /financieel-coach, wat-kost-een-financieel-coach, wat-doet-een-financieel-adviseur | Ja, vier pagina's plus een landingspagina op dienstintentie | Hoog (5 FAQ, 2 bronnen) | Laag (1.119 vert. op pos 56) | Midden | Deels | **C** |
| `wat-kost-een-financieel-coach` | 536 | 3 | 0,56% | 26,5 | 3 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /financieel-coach en /aanbod | Met /aanbod en wat-kost-een-financieel-adviseur | Ja | Hoog (5 FAQ, 2 bronnen) | Laag (536 vert. op pos 26,5) | Hoog (prijsintentie) | Deels | **B** |
| `wat-doet-een-financieel-adviseur` | 151 | 0 | 0,00% | 39,8 | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | wat-kost-een-financieel-coach | Met de coach-groep | Ja | Laag (4 FAQ, 1 bron, 0 uitgaande links) | Laag (151 vert. op pos 40) | Laag | Nee | **E** |
| `wat-kost-een-financieel-adviseur` | 0 | 0 | - | - | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | wat-kost-een-financieel-coach | Met wat-kost-een-financieel-coach | Ja | Midden (4 FAQ, 2 bronnen) | Laag (0 vert., 1 inkomende link) | Laag | Nee | **D** |

**Toelichting per status**

- **verschil-budgetcoach-financieel-coach**, status C. Nulmeting is hier expliciet: 921 vertoningen op dit cluster, nul klikken, posities 26 tot 80, en het is grotendeels schuldenpubliek. Herpositioneer richting 'geen schulden, wel geen overzicht' of laat hem staan en meet hem niet mee in de CTR-ronde.
- **wat-kost-een-financieel-coach**, status B. Prijsintentie is de dichtste bij een verkoop van het hele cluster. Als je één van de vier coach-artikelen upgradet, is het deze, en dan met de link naar /financieel-coach en het tarief van 49 euro erin.
- **wat-doet-een-financieel-adviseur**, status E. Trekt vraag naar een dienst die je niet levert en niet mag leveren. 0 uitgaande links, dus ook geen architectuurfunctie. Noindex of 301.
- **wat-kost-een-financieel-adviseur**, status D. Adviseur is vergunningplichtig terrein dat de site expliciet niet is. Samenvoegen met de coach-prijspagina of noindex.

## 7. C7. Financiele hulp zonder schulden

*0 artikelen.*

Dit cluster heeft geen enkel artikel. De dichtstbijzijnde pagina, `kan-iemand-naar-mijn-financien-kijken` (6 september), staat hierboven onder C2 omdat hij de vraag "kan iemand naar mijn cijfers kijken" beantwoordt en niet "waar kan ik terecht zonder schulden". Alles wat dit cluster nu heeft, staat in deel 1c: `/geldscan`, `/aanbod` en `/financieel-coach`.

Dat is opmerkelijk, want dit cluster is de positionering. "Geen schuldhulp, geen beleggingsadvies, wel iemand die naar je cijfers kijkt" staat in CLAUDE.md sectie 4 als het onderscheid van de hele dienst, en er is geen enkele artikelpagina die die vraag als zoekvraag beantwoordt. Ondertussen staan er vijf pagina's over Klarna en achteraf betalen, dus over precies het publiek dat dit cluster uitsluit. Zie deel 2 voor de pijlerkeuze.

## 8. C8. Goed inkomen, maar weinig overhouden

*8 pagina's, 313 vertoningen, 19 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/samen-6000-euro-netto-toch-niets-over` | Wij verdienen samen €6.000 netto en houden niets over. Bij twee huishoudens zocht ik uit waarom | Problem, bedrag plus huishouden | samen 6000 netto toch niets over | tweeverdieners 6000 netto, samen goed verdienen weinig over | problem | Waarom houden wij met 6.000 netto niets over? |
| `/inzichten/tweeverdieners-toch-krap` | Tweeverdieners en toch krap: hoe kan dat? | Problem | tweeverdieners toch krap | twee inkomens toch weinig over | problem | Waarom zijn wij met twee inkomens toch krap? |
| `/inzichten/niet-rondkomen-met-4000-euro-netto` | Niet rondkomen met €4.000 netto en twee kinderen? Dit is het rekenwerk erachter | Problem, bedrag | niet rondkomen met 4000 netto | 4000 netto niet genoeg | problem | Waarom kom ik met 4.000 netto niet rond? |
| `/inzichten/goed-salaris-toch-geldstress` | Goed salaris, toch geldstress: zo kwam er bij ons thuis weer rust | Problem, emotie | goed salaris toch geldstress | geldstress ondanks goed inkomen | problem | Waarom heb ik geldstress bij een goed salaris? |
| `/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven` | Lifestyle-inflatie: waarom meer verdienen niet meer overhouden betekent | Verklaring | lifestyle inflatie | meer verdienen meer uitgeven | problem | Waarom stijgen mijn uitgaven mee met mijn inkomen? |
| `/inzichten/tweede-inkomen-loont-niet-tweeverdieners` | Tweede inkomen loont niet: hoe kan dat? | Rekenvraag | tweede inkomen loont niet | werkt het tweede inkomen wel | problem | Loont het tweede inkomen eigenlijk? |
| `/inzichten/alleen-wonen-goed-salaris-toch-krap` | Alleen wonen met een goed salaris en toch elke maand krap | Problem, alleenstaand | alleen wonen goed salaris toch krap | alleenstaand goed inkomen weinig over | problem | Waarom kom ik alleen met een goed salaris niet uit? |
| `/inzichten/salarisverhoging-boven-76000-weinig-netto` | Waarom levert een salarisverhoging boven de €76.000 zo weinig netto op? | Rekenvraag | salarisverhoging boven 76000 | loonsverhoging weinig netto hoog inkomen | problem | Waarom houd ik van mijn opslag zo weinig over? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `samen-6000-euro-netto-toch-niets-over` | 109 | 8 | 7,34% | 4,4 | 4 | Eigen slotblok: “Twee inkomens, geen lek, en toch blijft er niets over?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub en /analyse | Met tweeverdieners-toch-krap en goed-salaris-toch-krap | Ja, binnen de C1/C8-groep | Hoog (5 FAQ, 3 bronnen) | Hoog (7,34% CTR op pos 4,43) | Hoog | Ja | **B** |
| `tweeverdieners-toch-krap` | 58 | 2 | 3,45% | 14,1 | 5 | Eigen slotblok: “Twee inkomens en toch elke maand krap?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C8-pijler en H1-hub | Met de C8-pijler | Ja | Midden (3 FAQ, 2 bronnen) | Midden (58 vert., 3,45% CTR) | Midden | Deels | **F** |
| `niet-rondkomen-met-4000-euro-netto` | 57 | 6 | 10,53% | 6,0 | 1 | Eigen slotblok: “Klopt dit ongeveer met jouw huishouden, of zit je er ver naast?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | is-4000 en C8-pijler | Met is-4000-euro-netto-goed-salaris-nederland | Risico: is-4000 pakt de bedragtermen al op pos 3,6 | Hoog (5 FAQ, 3 bronnen) | Midden (10,53% CTR op pos 6) | Hoog | Ja | **F** |
| `goed-salaris-toch-geldstress` | 49 | 3 | 6,12% | 15,7 | 6 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C8-pijler | Met goed-salaris-toch-krap en schamen-pagina | Ja | Midden (3 FAQ, 2 bronnen) | Midden (6,12% CTR op pos 15,7) | Midden | Deels | **F** |
| `lifestyle-inflatie-meer-verdienen-meer-uitgeven` | 32 | 0 | 0,00% | 16,2 | 13 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C8-pijler | Beperkt | Nee | Midden (3 FAQ, 2 bronnen) | Midden (13 inkomende links, pos 16) | Midden | Ja | **B** |
| `tweede-inkomen-loont-niet-tweeverdieners` | 8 | 0 | 0,00% | 6,9 | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub en kindgebonden-budget-2027 | Met bso-kosten en samen-te-veel-verdiend | Ja, drie pagina's op de tweede-inkomen-vraag | Midden (4 FAQ, 2 bronnen) | Midden (pos 6,88) | Hoog | Ja | **B** |
| `alleen-wonen-goed-salaris-toch-krap` | 0 | 0 | - | - | 1 | Eigen slotblok: “Klopt jouw vermoeden, of zit je ernaast zoals zij?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H3 (kosten-levensonderhoud-alleenstaande) | Met de C8-groep en met H3 | Ja | Midden (5 FAQ, 1 bron) | Laag (0 vert.) | Midden | Deels | **F** |
| `salarisverhoging-boven-76000-weinig-netto` | 0 | 0 | - | - | 7 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | netto-loonsverhoging-berekenen | Met netto-loonsverhoging-berekenen | Ja | Hoog (5 FAQ, 2 bronnen) | Laag (0 vert., 7 inkomende links) | Midden | Deels | **F** |

**Toelichting per status**

- **samen-6000-euro-netto-toch-niets-over**, status B. Per 6 sep de pijler van cluster P, en op de cijfers de juiste keuze. Volgende stap is de brug naar H1 en de inkomende links van goed-salaris-toch-krap.
- **tweeverdieners-toch-krap**, status F. Ondersteunend onder de pijler. Geen eigen investering; link hem naar H1.
- **niet-rondkomen-met-4000-euro-netto**, status F. Beste CTR van de site na de potjes-pagina. Laat hem staan als de huishoudkant van is-4000 en link ze wederkerig.
- **goed-salaris-toch-geldstress**, status F. Nulmeting waarschuwt expliciet: niet 301'en, dit is de op een na beste CTR van de zes. Laat staan als spaak.
- **lifestyle-inflatie-meer-verdienen-meer-uitgeven**, status B. Het mechanisme achter de hele positionering, en met 13 inkomende links al een knooppunt. Pakket compleet maken en onder de C8-pijler hangen.
- **tweede-inkomen-loont-niet-tweeverdieners**, status B. Positie 6,88 met 8 vertoningen: de vraag is klein in GSC maar exact de ICP. Kandidaat om het cluster rond het tweede inkomen op te hangen.
- **alleen-wonen-goed-salaris-toch-krap**, status F. Ondersteunend onder H3. 1 bron is te weinig zodra je hem aanraakt.
- **salarisverhoging-boven-76000-weinig-netto**, status F. Sterke ICP-hoek zonder vindbaarheid. Hang hem onder netto-loonsverhoging-berekenen, dat 2.844 vertoningen heeft.

## 9. C9. Vergelijking met vergelijkbare huishoudens

*8 pagina's, 13.862 vertoningen, 229 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand` | Boodschappen per maand: wat is normaal in 2026? Per persoon, stel en gezin | Benchmark | normaal bedrag boodschappen per maand | boodschappen gezin per maand, hoeveel boodschappen 2 personen | problem | Is mijn boodschappenbedrag normaal? |
| `/inzichten/kosten-levensonderhoud-alleenstaande-2026` | Kosten levensonderhoud alleenstaande in 2026: wat je werkelijk nodig hebt om rond te komen | Benchmark | kosten levensonderhoud alleenstaande | alleenstaand kosten per maand | problem | Wat kost het leven als alleenstaande per maand? |
| `/inzichten/hoeveel-sparen-per-maand-normaal-nederland` | Hoeveel sparen per maand is normaal? Het eerlijke antwoord, inclusief de mensen die helemaal niks sparen | Benchmark | hoeveel sparen per maand normaal | gemiddeld spaargeld nederland | problem | Hoeveel sparen vergelijkbare huishoudens? |
| `/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026` | Kosten levensonderhoud alleenstaande ouder in 2026: wat je werkelijk nodig hebt | Benchmark | kosten levensonderhoud alleenstaande ouder | alleenstaande ouder kosten per maand | problem | Wat kost het leven als alleenstaande ouder? |
| `/inzichten/is-3000-netto-genoeg-gezin` | Is €3.000 netto genoeg om rond te komen met een gezin? | Bedragcheck | is 3000 netto genoeg voor een gezin | 3000 netto gezin rondkomen | problem | Is 3.000 netto genoeg voor een gezin? |
| `/inzichten/kosten-levensonderhoud-zzp-alleenstaande-2026` | Kosten levensonderhoud als ZZP-alleenstaande in 2026: waarom je buffer nooit genoeg voelt | Benchmark | kosten levensonderhoud zzp | zzp kosten per maand | problem | Wat kost het leven als zzp'er alleen? |
| `/inzichten/wat-geeft-een-gezin-uit-per-maand` | Wat geeft een gezin uit per maand? De begroting per post | Benchmark, hub | wat geeft een gezin uit per maand | uitgaven gezin 2 kinderen, gezinsbudget 6000 netto | problem | Wat geeft een vergelijkbaar gezin per maand uit? |
| `/inzichten/kosten-levensonderhoud-alleenstaande-50-plus-2026` | Kosten levensonderhoud als alleenstaande 50-plusser in 2026: het pensioenplaatje dat je moet kennen | Benchmark | kosten levensonderhoud 50 plus | alleenstaand 50 plus kosten | problem | Wat kost het leven als alleenstaande 50-plusser? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `wat-is-normaal-bedrag-boodschappen-per-maand` | 10932 | 174 | 1,59% | 11,6 | 5 | Eigen slotblok: “Als je boodschappen normaal zijn, waar blijft het dan?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub, C4-pijler en /analyse | Met nibud-boodschappen-versus-werkelijkheid (gecontroleerd: geen kannibalisatie, 98/2) | Nee, in de meting weerlegd | Hoog (5 FAQ, 3 bronnen) | Zeer hoog (10.932 vert.) | Hoog | Ja | **B** |
| `kosten-levensonderhoud-alleenstaande-2026` | 2445 | 45 | 1,84% | 9,7 | 4 | Eigen slotblok: “Wat is voor jou als alleenstaande normaal?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H3-hub en /rapporten/alleenstaand-huurwoning | Met alleen-wonen-goed-salaris-toch-krap en 50-plus-variant | Beperkt | Hoog (5 FAQ, 4 bronnen) | Hoog (2.445 vert. op pos 9,74) | Hoog | Ja | **B** |
| `hoeveel-sparen-per-maand-normaal-nederland` | 258 | 4 | 1,55% | 11,5 | 10 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C9-pijler en /analyse | Met spaardoelen-maandelijkse-inleg | Beperkt | Hoog (5 FAQ, 3 bronnen) | Hoog (258 vert., 10 inkomende links) | Hoog | Ja | **B** |
| `kosten-levensonderhoud-alleenstaande-ouder-2026` | 192 | 3 | 1,56% | 23,8 | 3 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H4-hub en het bijbehorende rapport | Beperkt | Nee | Midden (4 FAQ, 2 bronnen) | Midden (192 vert. op pos 23,8) | Midden | Ja | **B** |
| `is-3000-netto-genoeg-gezin` | 32 | 3 | 9,38% | 5,3 | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub | Met is-4000 en de bedragenreeks | Risico met is-4000 | Midden (3 FAQ, 0 bronnen) | Midden (9,38% CTR op pos 5,3) | Midden | Deels | **F** |
| `kosten-levensonderhoud-zzp-alleenstaande-2026` | 3 | 0 | 0,00% | 8,7 | 3 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H5-hub en /rapporten/zzp-wisselend-inkomen | Beperkt | Nee | Midden (4 FAQ, 2 bronnen) | Laag (3 vert.) | Laag (zzp is randsegment) | Deels | **F** |
| `wat-geeft-een-gezin-uit-per-maand` | 0 | 0 | - | - | 4 | Eigen slotblok: “Leg jullie eigen maand ernaast” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /analyse en /rapporten/tweeverdieners-drie-kinderen | Met wat-zijn-normale-vaste-lasten-gezin en het boodschappenartikel | Ja, met wat-zijn-normale-vaste-lasten-gezin | Hoog (5 FAQ, 4 bronnen, compleet pakket) | Onbekend (6 sep live) | Hoog | Ja | **A** |
| `kosten-levensonderhoud-alleenstaande-50-plus-2026` | 0 | 0 | - | - | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H3-hub | Met de alleenstaande-hoofdpagina | Ja, variantpagina op dezelfde intentie | Midden (4 FAQ, 3 bronnen) | Laag (0 vert., 1 inkomende link) | Laag | Nee | **D** |

**Toelichting per status**

- **wat-is-normaal-bedrag-boodschappen-per-maand**, status B. Op 'boodschappen'-termen staat hij op pos 31,8 terwijl zijn gemiddelde 11,58 is: hij wint een paar Nibud-termen en verliest de staart. Rankingopgave. Tweede grootste pagina van de site en de logische ingang naar de hubs.
- **kosten-levensonderhoud-alleenstaande-2026**, status B. H3-kandidaat. Let op de openstaande beslissing uit de bouwvolgorde: de bandbreedte van 2.000 tot 2.400 euro in de titel heeft geen deugdelijke bron, en die staat sinds 6 sep ook in het antwoordblok.
- **hoeveel-sparen-per-maand-normaal-nederland**, status B. Zuivere benchmarkvraag, precies de dienst. Sterke tweede spaak onder C9 naast het boodschappenartikel.
- **kosten-levensonderhoud-alleenstaande-ouder-2026**, status B. H4-kandidaat. Positieprobleem, dus herschrijven naar het pakket in plaats van een nieuwe titel.
- **is-3000-netto-genoeg-gezin**, status F. Onder de ondergrens van 3.500 uit werkregel 8.7, maar hij presteert. Laat staan, niet uitbouwen, en de 0 bronnen repareren.
- **kosten-levensonderhoud-zzp-alleenstaande-2026**, status F. H5 staat op prio C in het plan. Laat hem daar staan.
- **wat-geeft-een-gezin-uit-per-maand**, status A. H1, de eerste van vijf hubs, volgens het pakket gebouwd met vier inkomende links. Enige gebrek: nul uitgaande interne links naar zijn eigen spaken.
- **kosten-levensonderhoud-alleenstaande-50-plus-2026**, status D. Variant zonder eigen vraag. Volgens werkregel 8.7 hoort een variant een FAQ te zijn binnen de hoofdpagina, geen eigen URL.

## 10. C10. Uitgaven die opvallend hoog of laag zijn

*12 pagina's, 1.484 vertoningen, 11 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/nibud-boodschappen-versus-werkelijkheid` | Het Nibud-boodschappenbudget 2026, wat de norm zegt en wat gezinnen werkelijk uitgeven | Benchmark, norm versus echt | nibud boodschappenbudget | nibud norm haalbaar | problem | Is de Nibud-norm haalbaar? |
| `/inzichten/twee-autos-wat-kost-de-tweede-echt` | Twee auto's, wat kost de tweede echt | Benchmark | wat kost een tweede auto | tweede auto kosten per maand | problem | Wat kost een tweede auto echt? |
| `/inzichten/kerstpot-en-verjaardagspot-zo-bouwden-we-die` | December overviel ons elk jaar, zo bouwden we een kerst- en verjaardagspot | Persoonlijk verhaal | kerstpot sparen | potje voor feestdagen | solution | Hoe bouw ik een pot voor december? |
| `/inzichten/wat-kost-december-feestdagen-gezin` | Wat kost december? Sinterklaas en kerst voor een gezin | Seizoen | wat kost december | kosten feestdagen gezin | problem | Wat kost december voor een gezin? |
| `/inzichten/ons-boodschappenbudget-mislukte-tot-we-dit-deden` | Ons boodschappenbudget mislukte elke keer, tot we dit deden | Persoonlijk verhaal | boodschappenbudget mislukt | boodschappenbudget volhouden | solution | Hoe houd ik een boodschappenbudget vol? |
| `/inzichten/auto-kopen-of-leasen-kosten-per-maand` | Auto kopen of leasen, en wat kost een auto echt per maand? | Vergelijking | auto kopen of leasen | private lease of kopen kosten | solution | Kopen of leasen, wat kost minder per maand? |
| `/inzichten/bso-kosten-tweede-inkomen-zo-draaiden-we-het-om` | De BSO slokte ons tweede inkomen op, zo draaiden we het om | Persoonlijk verhaal | bso kosten tweede inkomen | buitenschoolse opvang kosten | problem | Wat kost de BSO en loont het tweede inkomen dan nog? |
| `/inzichten/wat-zijn-normale-vaste-lasten-gezin` | Wat zijn normale vaste lasten voor een gezin? Het eerlijke overzicht voor 2026 | Benchmark | normale vaste lasten gezin | gemiddelde vaste lasten gezin per maand | problem | Wat zijn normale vaste lasten voor een gezin? |
| `/inzichten/seizoens-kostenkalender-per-maand` | De seizoens-kostenkalender: welke kosten komen er per maand aan? | Planning | seizoenskosten per maand | kostenkalender jaar | solution | Welke kosten komen in welke maand? |
| `/inzichten/wat-kost-een-kind-per-maand` | Wat kost een kind per maand? | Benchmark | wat kost een kind per maand | kosten kind per maand nederland | problem | Wat kost een kind per maand? |
| `/inzichten/schoolkosten-per-jaar-gezin` | Schoolkosten per jaar: wat kost de middelbare school echt? | Benchmark | schoolkosten per jaar | schoolkosten gezin | problem | Wat kosten school en schoolspullen per jaar? |
| `/inzichten/wat-kost-een-zomervakantie-gezin` | Wat kost een zomervakantie voor een gezin? | Seizoen | wat kost een zomervakantie | vakantiebudget gezin | problem | Wat kost een zomervakantie voor een gezin? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `nibud-boodschappen-versus-werkelijkheid` | 1388 | 11 | 0,79% | 8,5 | 1 | Eigen slotblok: “Boven de Nibud-norm? Bijna iedereen.” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | boodschappenpagina en C9-pijler | Met het boodschappenartikel | Nee (gemeten) | Hoog (5 FAQ, 4 bronnen) | Hoog (1.388 vert. op pos 8,51) | Hoog | Ja | **B** |
| `twee-autos-wat-kost-de-tweede-echt` | 38 | 0 | 0,00% | 4,8 | 2 | Eigen slotblok: “Wil je niet alleen de auto, maar je hele budget naast andere huishoudens leggen?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub en C10-pijler | Met auto-kopen-of-leasen | Beperkt | Midden (5 FAQ, 0 bronnen) | Midden (pos 4,79) | Midden | Deels | **B** |
| `kerstpot-en-verjaardagspot-zo-bouwden-we-die` | 18 | 0 | 0,00% | 48,6 | 6 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | potjesmethode-gezin | Met de potjes- en seizoensgroep | Ja | Laag (2 FAQ, 1 bron) | Laag (pos 48,6) | Laag | Nee | **F** |
| `wat-kost-december-feestdagen-gezin` | 13 | 0 | 0,00% | 17,3 | 0 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | seizoens-kostenkalender | Met de seizoensgroep | Ja | Midden (3 FAQ, 2 bronnen) | Laag (13 vert.) | Laag | Nee | **F** |
| `ons-boodschappenbudget-mislukte-tot-we-dit-deden` | 12 | 0 | 0,00% | 33,1 | 6 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | boodschappenpagina | Met de boodschappengroep | Beperkt (gemeten: 4 vert. op boodschappentermen) | Laag (3 FAQ, 1 bron) | Laag (12 vert.) | Laag | Nee | **F** |
| `auto-kopen-of-leasen-kosten-per-maand` | 9 | 0 | 0,00% | 9,7 | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | twee-autos-wat-kost-de-tweede-echt | Met twee-autos | Beperkt | Midden (3 FAQ, 2 bronnen) | Laag (9 vert.) | Laag | Nee | **F** |
| `bso-kosten-tweede-inkomen-zo-draaiden-we-het-om` | 6 | 0 | 0,00% | 8,7 | 5 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | tweede-inkomen-loont-niet-tweeverdieners | Met tweede-inkomen-loont-niet | Ja | Laag (2 FAQ, 2 bronnen) | Laag (6 vert. op pos 8,67) | Midden | Deels | **F** |
| `wat-zijn-normale-vaste-lasten-gezin` | 0 | 0 | - | - | 7 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub wat-geeft-een-gezin-uit-per-maand | Met vaste-lasten-overzicht-maken en met de H1-hub | Ja, drievoudig | Hoog (5 FAQ, 3 bronnen) | Laag (0 vert.) | Midden | Deels | **D** |
| `seizoens-kostenkalender-per-maand` | 0 | 0 | - | - | 5 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C10-pijler | Met wat-kost-december en zomervakantie | Ja, drie seizoenspagina's | Laag (2 FAQ, 1 bron) | Laag (0 vert.) | Midden (nuttig als overzicht) | Deels | **F** |
| `wat-kost-een-kind-per-maand` | 0 | 0 | - | - | 2 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub | Met schoolkosten en bso-kosten | Ja, met de kindkosten-groep | Laag (2 FAQ, 1 bron) | Laag (0 vert.) | Hoog (kernvraag ICP) | Deels | **B** |
| `schoolkosten-per-jaar-gezin` | 0 | 0 | - | - | 0 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | wat-kost-een-kind-per-maand | Met wat-kost-een-kind-per-maand | Ja | Laag (2 FAQ, 2 bronnen) | Laag (0 vert., 0 inkomende links) | Laag | Nee | **D** |
| `wat-kost-een-zomervakantie-gezin` | 0 | 0 | - | - | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | seizoens-kostenkalender | Idem | Ja | Laag (3 FAQ, 1 bron) | Laag (0 vert.) | Laag | Nee | **F** |

**Toelichting per status**

- **nibud-boodschappen-versus-werkelijkheid**, status B. Sterkste C10-hoek die er is: norm naast werkelijkheid. Titelwerk loont hier (pos 8,5) en dat is per 6 sep gedaan; meten op 4 okt.
- **twee-autos-wat-kost-de-tweede-echt**, status B. Positie 4,79 en nul bronnen op een pagina die uitsluitend uit bedragen bestaat. Repareren voordat iemand hem citeert.
- **kerstpot-en-verjaardagspot-zo-bouwden-we-die**, status F. 6 inkomende links, 18 vertoningen. Intern nuttig, extern niet.
- **wat-kost-december-feestdagen-gezin**, status F. Seizoenspiek in november/december. Laat staan.
- **ons-boodschappenbudget-mislukte-tot-we-dit-deden**, status F. Verhaal naast een benchmarkpagina die 1.693 vertoningen pakt. Laat staan als menselijke laag.
- **auto-kopen-of-leasen-kosten-per-maand**, status F. Ondersteunend.
- **bso-kosten-tweede-inkomen-zo-draaiden-we-het-om**, status F. Verhaalvorm, geen benchmarkvorm. Laat staan, link hem naar de tweede-inkomen-pagina.
- **wat-zijn-normale-vaste-lasten-gezin**, status D. Al gemarkeerd in de bouwvolgorde: 0 vertoningen, zit in het taalgebied van H1. Samenvoegen met de hub bij de CTR-ronde van 4 okt, en de 7 inkomende links meeverhuizen.
- **seizoens-kostenkalender-per-maand**, status F. 5 inkomende links maar 0 vertoningen. Houd hem als intern overzicht, niet als SEO-doel.
- **wat-kost-een-kind-per-maand**, status B. Hoge intentiewaarde, halve pagina. Eerste kandidaat voor upgrade binnen de kindkosten-groep, met de andere twee als FAQ erin.
- **schoolkosten-per-jaar-gezin**, status D. Samenvoegen in wat-kost-een-kind-per-maand.
- **wat-kost-een-zomervakantie-gezin**, status F. Idem.

---

# Deel 1b. Pagina's buiten de tien clusters

Dit is 46 procent van de artikelen en 74 procent van het verkeer. Dat is het feit waar de strategie op moet reageren.


## 11. Bedragcheck salaris (de verkeersmotor)

*2 pagina's, 13.910 vertoningen, 323 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/is-4000-euro-netto-goed-salaris-nederland` | Is €4.000 netto per maand een goed salaris? Ja, maar dit is wat er werkelijk van overblijft | Bedragcheck, gemengd loopbaan en huishouden | is 4000 euro netto een goed salaris | modaal inkomen 2026, 4000 netto bruto, is 3500/4100/4600 netto goed | awareness | Is 4.000 euro netto een goed salaris? |
| `/inzichten/is-5000-euro-netto-goed-salaris` | Is €5.000 netto een goed salaris? Ja, en dit is wat je er bruto voor moet verdienen | Bedragcheck | is 5000 euro netto een goed salaris | 5000 netto veel, samen 5000 netto | awareness | Is 5.000 euro netto een goed salaris? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `is-4000-euro-netto-goed-salaris-nederland` | 11804 | 271 | 2,30% | 3,6 | 6 | Eigen slotblok: “Belangrijker dan of €4.000 goed is: wat hou jij ervan over?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C4-pijler, H1-hub en /analyse | Met is-5000, is-3000 en niet-rondkomen-met-4000 | Bewust geconcentreerd: is-4000 pakt de bedrag- en modaaltermen, de varianten zijn FAQ's | Hoog (11 FAQ, 2 bronnen) | Zeer hoog (11.804 vert., pos 3,63) | Midden (loopbaanintentie) | Deels | **A** |
| `is-5000-euro-netto-goed-salaris` | 2106 | 52 | 2,47% | 5,6 | 2 | Eigen slotblok: “Je verdient objectief veel. Hoe staat jouw situatie er dan voor?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C4-pijler en H2-hub | Met is-4000 | Bewust geconcentreerd | Hoog (5 FAQ, 3 bronnen) | Hoog (2.106 vert., 2,47% CTR) | Midden | Deels | **A** |

**Toelichting per status**

- **is-4000-euro-netto-goed-salaris-nederland**, status A. Grootste pagina van de site en de sterkste interne linkbron. Twee gebreken: 2 bronnen bij 11 FAQ's, en de FAQ's voor 4.100 en 4.600 staan nog open. Hier hoort de brug naar de clusterarchitectuur te beginnen.
- **is-5000-euro-netto-goed-salaris**, status A. Derde pagina van de site. Controleer de AI-overzicht-knik zoals de bouwvolgorde bij 20 sep vraagt.

## 12. Loonstrook, opslag en bijzonder tarief

*4 pagina's, 3.216 vertoningen, 25 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/netto-loonsverhoging-berekenen` | Wat houd je netto over van je loonsverhoging in 2026? | Rekenintentie | netto loonsverhoging berekenen | hoeveel is 3 procent loonsverhoging netto | solution | Hoeveel houd ik netto over van mijn loonsverhoging? |
| `/inzichten/bruto-naar-netto-loonstrook-uitleg` | Van bruto naar netto: waar gaat je salaris naartoe op je loonstrook? | Uitleg | van bruto naar netto | loonstrook uitgelegd | awareness | Hoe kom ik van bruto naar netto? |
| `/inzichten/vakantiegeld-netto-hoeveel-hou-je-over-2026` | Vakantiegeld 2026: hoeveel hou je er netto van over? | Seizoen, rekenvraag | vakantiegeld netto | hoeveel vakantiegeld hou ik over | solution | Hoeveel houd ik netto over van mijn vakantiegeld? |
| `/inzichten/bonus-13e-maand-netto-berekenen` | Hoeveel houd je netto over van je bonus of dertiende maand? | Rekenvraag | bonus netto berekenen | bijzonder tarief 13e maand | solution | Hoeveel houd ik netto over van mijn bonus? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `netto-loonsverhoging-berekenen` | 2844 | 25 | 0,88% | 9,0 | 2 | Eigen slotblok: “Loonsverhoging gehad en toch niets extra over?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | salarisverhoging-boven-76000 en C4-pijler | Met salarisverhoging-boven-76000-weinig-netto | Ja, licht | Laag (3 FAQ, 0 bronnen) | Hoog (2.844 vert. op pos 8,96) | Midden | Deels | **B** |
| `bruto-naar-netto-loonstrook-uitleg` | 210 | 0 | 0,00% | 66,4 | 2 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | netto-loonsverhoging-berekenen | Met netto-loonsverhoging-berekenen | Ja | Midden (3 FAQ, 2 bronnen) | Laag (210 vert. op pos 66) | Laag | Nee | **C** |
| `vakantiegeld-netto-hoeveel-hou-je-over-2026` | 162 | 0 | 0,00% | 86,3 | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | bonus-13e-maand-netto-berekenen | Met bonus-13e-maand (zelfde bijzonder tarief) | Ja | Midden (3 FAQ, 2 bronnen) | Laag (162 vert. op pos 86,3) | Laag | Nee | **D** |
| `bonus-13e-maand-netto-berekenen` | 0 | 0 | - | - | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | vakantiegeld-pagina | Met de vakantiegeldpagina | Ja | Laag (3 FAQ, 0 bronnen) | Laag (0 vert.) | Laag | Nee | **D** |

**Toelichting per status**

- **netto-loonsverhoging-berekenen**, status B. Vierde pagina van de site en nul bronnen: het grootste bronnenrisico dat er staat. Nieuwe titel is per 6 sep live, meten op 4 okt.
- **bruto-naar-netto-loonstrook-uitleg**, status C. Het plan wil Z5 (loonstrook januari 2027) als nieuwe pagina en zegt dat deze niet meetelt. Herpositioneer deze URL tot Z5 in plaats van een zesde loonstrookpagina te bouwen.
- **vakantiegeld-netto-hoeveel-hou-je-over-2026**, status D. Nulmeting adviseert Z8 uit de planning te halen: op pos 86 doet 2027 in de titel niets. Samenvoegen met bonus-13e-maand tot één pagina over het bijzonder tarief is goedkoper dan twee halve pagina's onderhouden.
- **bonus-13e-maand-netto-berekenen**, status D. Idem: samenvoegen tot één bijzonder-tarief-pagina.

## 13. Achteraf betalen en Klarna

*5 pagina's, 2.839 vertoningen, 30 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/klarna-niet-kunnen-betalen` | Klarna niet kunnen betalen: wat gebeurt er nu? | Probleem, betaalachterstand | klarna niet kunnen betalen | achteraf betalen niet betalen, klarna aanmaning | problem | Wat als ik Klarna niet kan betalen? |
| `/inzichten/wat-kost-achteraf-betalen` | Wat kost achteraf betalen echt? Waarom gratis niet het hele verhaal is | Kostenvraag | wat kost achteraf betalen | klarna kosten, riverty kosten | problem | Wat kost achteraf betalen? |
| `/inzichten/overzicht-achteraf-betalen` | Hoe je je openstaande Klarna's en achteraf-betalingen op een rij krijgt | Overzichtvraag | overzicht achteraf betalen | alle achteraf betalen aanbieders | problem | Welke aanbieders van achteraf betalen zijn er? |
| `/inzichten/stoppen-met-achteraf-betalen` | Stoppen met achteraf betalen: zo kom je uit de uitstel-spiraal | Gedrag | stoppen met achteraf betalen | afkicken achteraf betalen | solution | Hoe stop ik met achteraf betalen? |
| `/inzichten/achteraf-betalen-bkr-registratie` | Komt achteraf betalen op je BKR? Het eerlijke antwoord | Feitvraag | achteraf betalen bkr | klarna bkr registratie | problem | Komt achteraf betalen op mijn BKR? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `klarna-niet-kunnen-betalen` | 2616 | 26 | 0,99% | 11,8 | 1 | Eigen slotblok: “Los dit niet alleen op voor deze maand” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C7-pijler | Met de vier andere achteraf-betalen-pagina's | Ja, vijf pagina's op BNPL | Midden (4 FAQ, 0 bronnen) | Midden (2.616 vert. op pos 11,8) | Laag | Nee | **F** |
| `wat-kost-achteraf-betalen` | 191 | 3 | 1,57% | 11,5 | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | klarna-niet-kunnen-betalen | Met de BNPL-groep | Ja | Laag (3 FAQ, 0 bronnen) | Laag (191 vert.) | Laag | Nee | **D** |
| `overzicht-achteraf-betalen` | 19 | 1 | 5,26% | 7,4 | 4 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | klarna-niet-kunnen-betalen | Idem | Ja | Laag (3 FAQ, 0 bronnen) | Laag (19 vert.) | Laag | Nee | **D** |
| `stoppen-met-achteraf-betalen` | 13 | 0 | 0,00% | 9,5 | 3 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | klarna-niet-kunnen-betalen | Idem | Ja | Laag (3 FAQ, 0 bronnen) | Laag (13 vert.) | Laag | Nee | **D** |
| `achteraf-betalen-bkr-registratie` | 0 | 0 | - | - | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | klarna-niet-kunnen-betalen | Idem | Ja | Laag (3 FAQ, 0 bronnen) | Laag (0 vert.) | Laag | Nee | **D** |

**Toelichting per status**

- **klarna-niet-kunnen-betalen**, status F. Grootste pagina buiten de ICP. Nulmeting: meenemen in de CTR-ronde omdat het goedkoop is, geen inhoudelijk werk. Let op het positioneringsrisico: dit is schuldentaal en de site is geen schuldhulp.
- **wat-kost-achteraf-betalen**, status D. Samenvoegen: vijf BNPL-pagina's met samen 2.839 vertoningen, 30 klikken en nul bronnen horen één pagina te zijn.
- **overzicht-achteraf-betalen**, status D. Idem.
- **stoppen-met-achteraf-betalen**, status D. Idem.
- **achteraf-betalen-bkr-registratie**, status D. Idem. Deze vier samen zijn één sessie werk en halen vier dunne URL's uit de index.

## 14. Bespaartips en boodschappen goedkoper

*4 pagina's, 24 vertoningen, 3 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/hoe-bespaar-je-op-boodschappen` | Hoe bespaar je op boodschappen in 2026? Niet met bezuinigingstips, maar door te begrijpen waar het weglekt | Bespaarintentie | hoe bespaar je op boodschappen | besparen boodschappen tips | solution | Hoe bespaar ik op boodschappen? |
| `/inzichten/vergeten-abonnementen-opzeggen` | Vergeten abonnementen opsporen: gemiddeld €200+ per maand | Bespaartip | vergeten abonnementen opzeggen | abonnementen check | solution | Welke abonnementen vergeet ik? |
| `/inzichten/vergelijken-boodschappen-nederland-duitsland` | Boodschappen vergelijken Nederland vs Duitsland, wat koop je waar? | Grensvergelijking | boodschappen nederland duitsland | goedkoper in duitsland | solution | Is boodschappen doen in Duitsland goedkoper? |
| `/inzichten/boodschappen-duitsland-voordeel` | Boodschappen doen in Duitsland, levert het echt wat op? | Grensvergelijking | boodschappen duitsland voordeel | duitsland goedkoper boodschappen | solution | Wat is het voordeel van Duitse boodschappen? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `hoe-bespaar-je-op-boodschappen` | 24 | 3 | 12,50% | 6,6 | 2 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | boodschappenpagina | Met de boodschappengroep | Beperkt | Hoog (5 FAQ, 4 bronnen) | Midden (12,5% CTR op pos 6,6) | Laag | Nee | **F** |
| `vergeten-abonnementen-opzeggen` | 0 | 0 | - | - | 4 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C10-pijler | Met de besparen-groep | Nee | Laag (3 FAQ, 1 bron) | Laag (0 vert.) | Laag | Nee | **F** |
| `vergelijken-boodschappen-nederland-duitsland` | 0 | 0 | - | - | 3 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | boodschappenpagina | Met boodschappen-duitsland-voordeel (301'd) | Nee | Hoog (5 FAQ, 2 bronnen) | Laag (0 vert., 0 uitgaande links) | Laag | Nee | **F** |
| `boodschappen-duitsland-voordeel` | 0 | 0 | - | - | 0 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | 301 staat al naar de pagina hierboven | Volledig, is al 301'd | Nee | n.v.t. | n.v.t. | n.v.t. | Nee | **E** |

**Toelichting per status**

- **hoe-bespaar-je-op-boodschappen**, status F. Bespaartips zijn uitgesloten in de positionering, maar de CTR is de hoogste van de site. Laat staan, verwijs door naar de vergelijking.
- **vergeten-abonnementen-opzeggen**, status F. Bespaartip, en die zijn in de positionering uitgesloten. Laat staan, niet uitbouwen.
- **vergelijken-boodschappen-nederland-duitsland**, status F. Buiten de ICP (grensstreek). Nul uitgaande interne links: staat volledig los van de architectuur.
- **boodschappen-duitsland-voordeel**, status E. Al 301'd in next.config.mjs, maar het artikel staat nog in lib/inzichten-data.ts en de URL staat nog in de live sitemap. Werkregel 8.10 zegt: oude URL uit de sitemap. Opruimen.

## 15. Wonen, hypotheek en verbouwen

*4 pagina's, 0 vertoningen, 0 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/zonnepanelen-terugverdientijd` | Zonnepanelen: wat kosten ze en wat is de terugverdientijd? | Investeringsvraag | zonnepanelen terugverdientijd | salderen afgeschaft terugverdienen | solution | Wanneer verdien ik zonnepanelen terug? |
| `/inzichten/verbouwen-financiele-valkuilen` | Verbouwen: de drie financiële valkuilen | Levensgebeurtenis | verbouwen financiele valkuilen | verbouwing budget overschrijding | problem | Welke geldvalkuilen zitten er in een verbouwing? |
| `/inzichten/hogere-hypotheek-wat-kost-het-per-maand` | Wat kost een hogere hypotheek echt per maand? | Rekenvraag, wonen | hogere hypotheek per maand | maximale hypotheek wat blijft over | problem | Wat kost een hogere hypotheek per maand? |
| `/inzichten/rentevaste-periode-loopt-af-wat-nu` | Je rentevaste periode loopt af: wat het per maand met je huishouden doet | Levensgebeurtenis, wonen | rentevaste periode loopt af | hypotheekrente stijgt wat kost het | problem | Wat doet het aflopen van mijn rentevaste periode per maand? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `zonnepanelen-terugverdientijd` | 0 | 0 | - | - | 0 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C10-pijler | Nee | Nee | Laag (2 FAQ, 1 bron) | Laag (0 vert., 0 links in en uit) | Laag | Nee | **E** |
| `verbouwen-financiele-valkuilen` | 0 | 0 | - | - | 0 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | hogere-hypotheek en C10 | Beperkt | Nee | Laag (2 FAQ, 1 bron) | Laag (0 vert., 0 inkomende links) | Laag | Nee | **E** |
| `hogere-hypotheek-wat-kost-het-per-maand` | 0 | 0 | - | - | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub en rentevaste-periode | Met rentevaste-periode-loopt-af-wat-nu | Ja | Laag (2 FAQ, 1 bron) | Laag (0 vert.) | Hoog (L1 in het plan) | Deels | **C** |
| `rentevaste-periode-loopt-af-wat-nu` | 0 | 0 | - | - | 2 | Eigen slotblok: “Reken uit wat dit voor jullie huishouden doet” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub en hogere-hypotheek | Met hogere-hypotheek-wat-kost-het-per-maand | Ja, licht | Hoog (5 FAQ, 4 bronnen) | Onbekend (6 sep live) | Hoog | Ja | **A** |

**Toelichting per status**

- **zonnepanelen-terugverdientijd**, status E. Volledig losstaand: 0 inkomende links, 0 uitgaande links, 0 vertoningen, 2 FAQ. Duidelijkste noindex-kandidaat van de lijst.
- **verbouwen-financiele-valkuilen**, status E. Halve pagina, geen inkomende links, geen vertoningen.
- **hogere-hypotheek-wat-kost-het-per-maand**, status C. Het plan zet L1 (woonlasten bij maximale hypotheek) op prio A. Deze URL bestaat al met de juiste intentie en een half pakket. Herpositioneren is goedkoper dan L1 nieuw bouwen.
- **rentevaste-periode-loopt-af-wat-nu**, status A. Nieuw en compleet. Enige gebrek: nul uitgaande interne links, dus hij geeft niets terug aan de architectuur.

## 16. Toeslagen en 2027-regels

*2 pagina's, 0 vertoningen, 0 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/samen-te-veel-verdiend-toeslag-kwijt` | Samen net te veel verdiend: zo raak je je toeslag kwijt | Regelvraag | samenwonen toeslag kwijt | te veel verdiend toeslag kwijt | problem | Waarom zijn wij onze toeslag kwijt? |
| `/inzichten/kindgebonden-budget-2027-inkomensgrens` | Kindgebonden budget 2027: vanaf welk inkomen verlies je het sneller? | Regelvraag 2027 | kindgebonden budget 2027 inkomensgrens | net boven de toeslaggrens | problem | Waar ligt de inkomensgrens en wat als ik er net boven zit? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `samen-te-veel-verdiend-toeslag-kwijt` | 0 | 0 | - | - | 4 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | kindgebonden-budget-2027-inkomensgrens | Met kindgebonden-budget-2027-inkomensgrens | Ja, direct | Laag (3 FAQ, 0 bronnen) | Laag (0 vert.) | Midden | Deels | **D** |
| `kindgebonden-budget-2027-inkomensgrens` | 0 | 0 | - | - | 2 | Eigen slotblok: “Reken uit wat dit voor jouw huishouden doet” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub en /analyse | Met samen-te-veel-verdiend-toeslag-kwijt | Ja, met de pagina hierboven | Hoog (5 FAQ, 4 bronnen) | Onbekend (6 sep live) | Hoog | Ja | **A** |

**Toelichting per status**

- **samen-te-veel-verdiend-toeslag-kwijt**, status D. Z4 is op 6 sep gepubliceerd op exact deze intentie, met 5 FAQ en 4 bronnen. Deze oudere pagina met 0 bronnen hoort daarin op te gaan.
- **kindgebonden-budget-2027-inkomensgrens**, status A. Z4, volgens het pakket. Op 16 sep de vier geraamde constanten vervangen door de Prinsjesdagcijfers.

## 17. Sparen en aflossen

*3 pagina's, 0 vertoningen, 0 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/spaardoelen-maandelijkse-inleg` | Werken met spaardoelen en maandelijkse inleg, hoe werkt het en wat heb je eraan? | Rekenintentie | spaardoel maandelijkse inleg | hoeveel per maand sparen voor doel | solution | Hoeveel moet ik per maand inleggen voor mijn doel? |
| `/inzichten/waarom-lukt-sparen-niet` | Sparen lukt nooit, zelfs met een goed salaris? Zo doorbrak ik dat patroon | Problem | waarom lukt sparen niet | sparen mislukt elke maand | problem | Waarom lukt sparen mij niet? |
| `/inzichten/studieschuld-aflossen-of-sparen` | Studieschuld aflossen of sparen: wat is slimmer in 2026? | Afweging | studieschuld aflossen of sparen | dubbele studieschuld aflossen | solution | Los ik mijn studieschuld af of ga ik sparen? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `spaardoelen-maandelijkse-inleg` | 0 | 0 | - | - | 8 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | hoeveel-sparen-per-maand-normaal-nederland | Met hoeveel-sparen-per-maand | Ja, licht | Hoog (5 FAQ, 2 bronnen) | Laag (0 vert., 8 inkomende links) | Laag | Nee | **F** |
| `waarom-lukt-sparen-niet` | 0 | 0 | - | - | 2 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C1-pijler en spaarbenchmark | Met de C1-groep | Beperkt | Midden (3 FAQ, 2 bronnen) | Laag (0 vert.) | Laag | Nee | **F** |
| `studieschuld-aflossen-of-sparen` | 0 | 0 | - | - | 0 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C5-pijler | Nee | Nee | Midden (4 FAQ, 2 bronnen) | Laag (0 vert., 0 inkomende links) | Laag | Nee | **F** |

**Toelichting per status**

- **spaardoelen-maandelijkse-inleg**, status F. 8 inkomende links, 0 vertoningen. Ondersteunend onder de spaarbenchmark.
- **waarom-lukt-sparen-niet**, status F. Ondersteunend.
- **studieschuld-aflossen-of-sparen**, status F. Geen inkomende links, geen vertoningen. Randonderwerp.

## 18. Geld en relatie

*4 pagina's, 13 vertoningen, 0 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/geld-stress-relatie-nederland` | Wat geldstress doet met je relatie, en hoe je eindelijk het gesprek aangaat | Onderzoek | geldstress relatie | ruzie over geld cijfers | awareness | Hoeveel relaties lopen vast op geld? |
| `/inzichten/praten-over-geld-met-je-partner` | Praten over geld met je partner zonder ruzie | Gedrag | praten over geld met je partner | geldgesprek partner | solution | Hoe begin ik het geldgesprek? |
| `/inzichten/financiele-ontrouw-partner-verzwijgt-geld` | Financiële ontrouw: als je partner uitgaven of een lening verzwijgt | Relatieprobleem | financiele ontrouw | partner verzwijgt lening | problem | Wat is financiele ontrouw en wat doe ik eraan? |
| `/inzichten/partner-geeft-te-veel-uit` | Mijn partner geeft te veel uit: wat je kunt doen zonder ruzie | Relatieprobleem | partner geeft te veel uit | ruzie over geld partner | problem | Wat doe ik als mijn partner te veel uitgeeft? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `geld-stress-relatie-nederland` | 11 | 0 | 0,00% | 15,2 | 4 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | financiele-ontrouw | Met de relatiegroep | Ja, licht | Hoog (5 FAQ, 3 bronnen) | Laag (11 vert.) | Laag | Nee | **F** |
| `praten-over-geld-met-je-partner` | 2 | 0 | 0,00% | 6,0 | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | partner-geeft-te-veel-uit | Met de twee nieuwe relatiepagina's | Ja, licht | Laag (4 FAQ, 1 bron) | Laag (2 vert.) | Laag | Nee | **F** |
| `financiele-ontrouw-partner-verzwijgt-geld` | 0 | 0 | - | - | 3 | Eigen slotblok: “Zet eerst de maand op een rij, samen” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /analyse en de relatietherapeuten-pagina | Met partner-geeft-te-veel-uit | Beperkt | Hoog (5 FAQ, 4 bronnen) | Onbekend (6 sep live) | Midden | Deels | **A** |
| `partner-geeft-te-veel-uit` | 0 | 0 | - | - | 3 | Eigen slotblok: “Doe de analyse samen, dan praat je over hetzelfde getal” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | /analyse (situatie stel) | Met financiele-ontrouw en praten-over-geld | Beperkt | Hoog (5 FAQ, 3 bronnen) | Onbekend (6 sep live) | Midden | Deels | **A** |

**Toelichting per status**

- **geld-stress-relatie-nederland**, status F. Ondersteunend, met 7 uitgaande links een nuttig knooppunt.
- **praten-over-geld-met-je-partner**, status F. Ondersteunend onder de twee nieuwe pagina's.
- **financiele-ontrouw-partner-verzwijgt-geld**, status A. Nieuw en compleet, met eigen cijfers en bron plus datum. Slechts 1 uitgaande interne link.
- **partner-geeft-te-veel-uit**, status A. Idem. 1 uitgaande interne link.

## 19. Samenwonen en kosten verdelen

*2 pagina's, 90 vertoningen, 1 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/kosten-verdelen-samenwonen-ongelijk-inkomen` | Kosten eerlijk verdelen als je samenwoont met een ongelijk inkomen | Rekenvraag | kosten verdelen samenwonen ongelijk inkomen | kosten verdelen naar inkomen | solution | Hoe verdelen we de kosten bij ongelijke inkomens? |
| `/inzichten/gezamenlijke-rekening-voor-en-nadelen` | Gezamenlijke rekening: voor- en nadelen voor stellen in 2026 | Afweging | gezamenlijke rekening voor en nadelen | samen een rekening of apart | solution | Nemen we een gezamenlijke rekening? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `kosten-verdelen-samenwonen-ongelijk-inkomen` | 90 | 1 | 1,11% | 11,6 | 5 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H2-hub | Met gezamenlijke-rekening | Ja, licht | Midden (3 FAQ, 2 bronnen) | Midden (90 vert. op pos 11,6) | Midden | Deels | **F** |
| `gezamenlijke-rekening-voor-en-nadelen` | 0 | 0 | - | - | 2 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | kosten-verdelen-samenwonen | Met kosten-verdelen-samenwonen | Ja, licht | Midden (4 FAQ, 1 bron) | Laag (0 vert.) | Laag | Nee | **F** |

**Toelichting per status**

- **kosten-verdelen-samenwonen-ongelijk-inkomen**, status F. Beste presteerder van de samenwonen-groep. Hang hem onder H2 als die er is.
- **gezamenlijke-rekening-voor-en-nadelen**, status F. Ondersteunend.

## 20. Scheiden en samengesteld gezin

*2 pagina's, 18 vertoningen, 0 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/scheiden-goed-inkomen-toch-niks-over` | Scheiden met een goed inkomen en toch niks over | Levensgebeurtenis | scheiden goed inkomen niks over | na scheiding weinig geld | problem | Waarom houd ik na de scheiding niets over? |
| `/inzichten/samengesteld-gezin-twee-huishoudens-een-budget` | Samengesteld gezin: twee huishoudens in één budget | Levensgebeurtenis | samengesteld gezin budget | twee huishoudens een budget | problem | Hoe verdeel je een budget over twee huishoudens? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `scheiden-goed-inkomen-toch-niks-over` | 11 | 0 | 0,00% | 53,6 | 3 | Eigen slotblok: “Wil je weten hoe het bij jouw twee huishoudens precies zit?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C8-pijler | Met samengesteld-gezin | Beperkt | Laag (5 FAQ, 0 bronnen) | Laag (pos 53,6) | Midden | Nee | **F** |
| `samengesteld-gezin-twee-huishoudens-een-budget` | 7 | 0 | 0,00% | 10,6 | 2 | Eigen slotblok: “Wil je weten hoe jullie eigen samengestelde gezin ervoor staat?” | /analyse + situatieparameters, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | H1-hub | Met scheiden-pagina | Beperkt | Midden (5 FAQ, 0 bronnen) | Laag (7 vert.) | Midden | Nee | **F** |

**Toelichting per status**

- **scheiden-goed-inkomen-toch-niks-over**, status F. Goede ICP-hoek, nul onderbouwing. 0 bronnen op een pagina die over bedragen gaat is de scherpste schending van waarheidsregel 3 in de hele lijst.
- **samengesteld-gezin-twee-huishoudens-een-budget**, status F. Idem: 0 bronnen.

## 21. Pensioen

*1 pagina's, 0 vertoningen, 0 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/pensioen-aanvullen-hoeveel-heb-je-nodig` | Pensioen aanvullen: hoeveel heb je nodig, en wanneer is het te laat? | Doelvraag | pensioen aanvullen hoeveel nodig | zelf pensioen aanvullen | solution | Hoeveel pensioen heb ik nodig? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `pensioen-aanvullen-hoeveel-heb-je-nodig` | 0 | 0 | - | - | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C5-pijler | Met de 50-plus-pagina | Beperkt | Midden (4 FAQ, 2 bronnen) | Laag (0 vert.) | Laag | Nee | **F** |

**Toelichting per status**

- **pensioen-aanvullen-hoeveel-heb-je-nodig**, status F. Buiten de ICP-leeftijd en dicht bij vergunningplichtig advies. Niet in investeren.

## 22. Financiele onafhankelijkheid

*1 pagina's, 38 vertoningen, 0 klikken in 90 dagen.*

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Secundaire keywords | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/inzichten/financieel-onafhankelijk-worden-realistisch` | Financieel onafhankelijk worden: wat het echt betekent (en wat niet) | Doelintentie | financieel onafhankelijk worden | FIRE nederland realistisch | awareness | Is financieel onafhankelijk worden realistisch? |

| URL | Vert. | Klik | CTR | Pos | In-links | Huidige CTA | CTA-bestemming | Doorverwijzen naar | Overlap | Kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|---|---|---|---|
| `financieel-onafhankelijk-worden-realistisch` | 38 | 0 | 0,00% | 52,8 | 1 | Standaard slotblok: Doe de gratis analyse | /analyse, plus Geldscan als tekstlink naar /aanbod/intake?pakket=geldscan | C5-pijler | Nee | Nee | Midden (4 FAQ, 1 bron) | Laag (pos 52,8) | Laag | Nee | **F** |

**Toelichting per status**

- **financieel-onafhankelijk-worden-realistisch**, status F. FIRE-publiek is niet de ICP (die zit krap, niet in opbouw). Laat staan als long-tail.

---

# Deel 1c. Niet-artikelpagina's

Veertien publieke pagina's buiten `/inzichten`. Deze dragen de conversie en het bewijs, en ze staan in de audit omdat de commerciele landingspagina's per cluster hier zitten of hier zouden moeten zitten.

| URL | Huidige titel | Zoekintentie | Vermoedelijk primair keyword | Cluster | Funnel | Belangrijkste vraag |
|---|---|---|---|---|---|---|
| `/` | Waar blijft het, Goed salaris, toch altijd krap? | Merk plus probleem | waar blijft het | C1 | problem | Waar gaat mijn geld heen en wat kan ik daaraan doen? |
| `/analyse` | Financiele analyse: hoe doe jij het ten opzichte van vergelijkbare huishoudens? | Tool, zelftoets | gratis financiele analyse (onbezet) | C2 | conversion | Hoe doe ik het ten opzichte van vergelijkbare huishoudens? |
| `/financieel-coach` | Financieel coach nodig? Online, vanaf gratis, geen traject verplicht | Dienstintentie | financieel coach | C6 | commercial | Wie helpt mij als ik goed verdien en toch weinig overhoud? |
| `/geldscan` | Geldscan: waarom houd jij zo weinig over? €49 | Product | geldscan, financieel rapport laten maken | C7 | commercial | Wat krijg ik voor 49 euro? |
| `/aanbod` | Tarieven: geldrapport, gesprek en traject | Prijs | tarieven geldrapport | C7 | commercial | Wat kost het en wat kies ik? |
| `/adviesgesprek` | Financieel adviesgesprek, eenmalig €125, 45 minuten | Dienstintentie | financieel adviesgesprek eenmalig | C6 | commercial | Kan ik eenmalig met iemand praten? |
| `/rapporten` | 5 echte gezinsbudgetten: cijfers, oordeel en nameting | Bewijs, voorbeeld | voorbeeld geldrapport, echte gezinsbudgetten | C9 | solution | Wat levert het op bij mensen zoals ik? |
| `/rapporten/[5 rapporten]` | Per huishoudtype | Bewijs per huishouden | budget tweeverdieners/alleenstaand/zzp voorbeeld | C9 | solution | Wat kwam er bij dit huishouden uit? |
| `/over` | Over Jarno Koopman \| Waar blijft het | Vertrouwen | jarno koopman waar blijft het | - | commercial | Wie schrijft dit en waarom? |
| `/inzichten` | Inzichten over grip op je geld | Overzicht | - | C3 | awareness | Welke artikelen zijn er? |
| `/woordenlijst` | Woordenlijst: geldbegrippen in gewone taal | Definities | geldbegrippen uitleg | C3 | awareness | Wat betekent dit woord? |
| `/samenwerken (+6)` | Samenwerken met Waar blijft het | Partnerintentie | doorverwijzen client geld | - | commercial | Kan ik mijn client doorverwijzen? |
| `/en/is-5000-net-a-good-salary-netherlands` | Is €5,000 net a good salary in the Netherlands? (2026) | Bedragcheck, expat | is 5000 net a good salary netherlands | X | awareness | Is 5.000 netto veel in Nederland? |
| `/privacy` | Privacy | Juridisch | - | - | - | Wat doe je met mijn gegevens? |

| URL | Vert. | Klik | CTR | Pos | In-links | Overlap en kannibalisatie | Kwaliteit | SEO-potentieel | Commercieel | Autoriteit | Status |
|---|---:|---:|---:|---:|---:|---|---|---|---|---|---|
| `/` | 59 | 4 | 6,78% | 12,8 | n.v.t. | Met de C1-groep op de merkzin | Hoog | Laag (merkverkeer) | Hoog | Ja | **B** |
| `/analyse` | 0 | 0 | - | - | 76 | Geen; niemand bezet deze intentie, ook de site zelf niet | Hoog als tool | Onbenut, nul vertoningen | Zeer hoog | Ja | **C** |
| `/financieel-coach` | 58 | 17 | **29,31%** | 6,2 | 3 | Met de vier coach-artikelen, die op pos 26 tot 56 staan | Hoog | Hoog (pos 6 en de beste CTR van de site) | Zeer hoog | Ja | **B** |
| `/geldscan` | 19 | 1 | 5,26% | 7,4 | 0 | Met `/aanbod`; sinds 30 aug staat hij bewust buiten de aanvraagroute | Hoog | Midden | Hoog | Ja | **B** |
| `/aanbod` | 0 | 0 | - | - | 3 | Met `/geldscan` en `/adviesgesprek` | Hoog | Laag (prijsintentie op merk) | Hoog | Ja | **A** |
| `/adviesgesprek` | 0 | 0 | - | - | 10 | Met `/aanbod` | Hoog | Laag | Midden | Deels | **F** |
| `/rapporten` | 5 | 0 | - | 3,4 | 10 | Met de vier verzonnen casestudy's | Hoog, het sterkste bezit dat er is | Midden | Zeer hoog | Ja | **B** |
| `/rapporten/[5]` | 19 samen | 0 | - | 5,0 tot 9,8 | 4 samen | Met de casestudy's | Hoog | Midden | Zeer hoog | Ja | **B** |
| `/over` | 0 | 0 | - | - | 1 | Nee | Hoog | Laag | Midden | Ja | **A** |
| `/inzichten` | 0 | 0 | - | - | n.v.t. | Nee | Midden | Laag | Laag | Deels | **F** |
| `/woordenlijst` | 0 | 0 | - | - | 0 | Nee; verwijst wel naar 9 artikelen, waaronder twee E-kandidaten | Midden | Laag | Laag | Deels | **F** |
| `/samenwerken (+6)` | 2 | 0 | - | 39,5 | 2 | Nee | Hoog | Laag | Laag zolang het verwijzerskanaal dicht staat | Nee | **F** |
| `/en/is-5000...` | 0 | 0 | - | - | 2 | Met is-5000 via hreflang, bewust | Hoog | Onbekend, meetpunt 5 nov | Laag | Nee | **F** |
| `/privacy` | 0 | 0 | - | - | n.v.t. | Nee | n.v.t. | n.v.t. | n.v.t. | n.v.t. | **A** |

**Toelichting**

- **`/analyse`, status C.** Dit is de belangrijkste regel in de hele audit. De pagina is de enige primaire conversie-ingang van de site (CLAUDE.md 5), krijgt 76 interne links, en heeft nul organische vertoningen. Hij is gebouwd als tool en niet als pagina: geen antwoordblok, geen tabel, geen FAQ met schema, geen bron. Cluster C2 uit de strategie ("financiele check, financiele analyse") heeft daarmee geen enkele rankende pagina, terwijl het de intentie is die het dichtst bij de dienst zit.
- **`/financieel-coach`, status B.** 29,31 procent CTR op positie 6,2. Dat is vijftien keer de sitegemiddelde CTR. Zeventien van de klikken op deze URL tegen zeven op de vier coach-artikelen samen, die 31 keer zoveel vertoningen hebben. De bouwvolgorde heeft hier al een open vraag voor Jarno staan: filter GSC op deze URL voordat je iets nieuws bouwt in C6.
- **`/rapporten`, status B.** Vijf echte rapporten met toestemming en nameting zijn het enige bezit dat geen concurrent kan kopieren, en er lopen tien interne links naartoe. Op de 94 artikelen is dat te weinig; werkregel 8.10 vraagt per pagina een gelinkt rapport met bedrag.
- **`/geldscan`, status B.** Nul inkomende links uit artikelbodies, omdat elke Geldscan-link sinds 30 augustus rechtstreeks naar het aanvraagformulier gaat. Dat is bewust, maar het betekent dat de pagina die voor zoekverkeer bestaat intern geen enkele steun krijgt.

---

# Deel 2. Clusteroverzicht

Per cluster: wie de pijler moet zijn, wat eronder hangt, wat overlapt, welke interne links ontbreken, welke commerciele landingspagina ontbreekt en welke zoekintentie nog niet is afgedekt.

De pijlerkeuze volgt twee regels die de site al heeft opgeschreven en die in september beide zijn bevestigd. Werkregel 8.2: vertoont een bestaande URL al op de term, dan upgraden en niet bouwen. En de les van cluster P uit de nulmeting: de pijler is de pagina die presteert, niet de pagina met de mooiste zoekterm. `goed-salaris-toch-krap` was op papier de pijler en had nul vertoningen.


## C1. Waar blijft mijn geld?

**Pijler: `samen-6000-euro-netto-toch-niets-over`** (7,34 procent CTR op positie 4,43), zoals op 6 september al besloten voor cluster P. Alternatief op zoekterm is `goed-salaris-toch-krap`, en dat is precies de fout die de nulmeting heeft weerlegd: die pagina heeft nul vertoningen.

**Ondersteunend:** `waarom-hou-ik-nooit-geld-over` (doel van de 301, 188 vertoningen), `goed-salaris-toch-geldstress`, `tweeverdieners-toch-krap`, `lifestyle-inflatie-meer-verdienen-meer-uitgeven` als het mechanisme, `schamen-niet-rondkomen-goed-inkomen` en `piekeren-over-geld` als emotionele instap.

**Overlap:** vijf pagina's op "goed salaris toch krap": `goed-salaris-toch-krap`, `goed-salaris-toch-geldstress`, `tweeverdieners-toch-krap`, `alleen-wonen-goed-salaris-toch-krap` en de pijler zelf. Plus twee pagina's op hetzelfde begrip: `waarom-lijkt-iedereen-rijker` en `money-dysmorphia-uitleg`.

**Ontbrekende interne links:** de 14 links naar `goed-salaris-toch-krap` wijzen naar een pagina zonder vertoningen. Die horen naar de pijler. Verder linkt geen enkele C1-pagina naar `/rapporten`, terwijl "waar blijft het bij dit huishouden" precies is wat die rapporten laten zien.

**Ontbrekende commerciele landingspagina:** geen. De homepage bezet deze intentie op het merk en `/analyse` is het aanbod. Er is hier geen nieuwe pagina nodig, alleen een pijler die wel gevonden wordt.

**Onvoldoende afgedekte zoekintentie:** de letterlijke vraag "waar blijft mijn geld" heeft sinds de 301 van 6 september geen eigen pagina meer, alleen een doelpagina met een andere kop. Dat is een keuze om bewust te maken: de site heet ernaar.


## C2. Financiele check / financiele analyse

**Pijler: er is er geen.** `/analyse` is de enige pagina met deze intentie en heeft nul vertoningen in 90 dagen. `kan-iemand-naar-mijn-financien-kijken` (6 sep) is de dichtstbijzijnde en zit inhoudelijk in C7.

**Ondersteunend:** niets. Dit is het leegste cluster van de tien en tegelijk het cluster dat het dichtst bij de verkoop staat.

**Overlap:** geen, en dat is het probleem, niet de oplossing.

**Ontbrekende interne links:** de 76 links naar `/analyse` zijn CTA's, geen contextlinks in lopende tekst. Een CTA-knop doet voor de vindbaarheid van de bestemming veel minder dan een link in een alinea.

**Ontbrekende commerciele landingspagina: dit is het grootste gat in de architectuur.** Er is geen pagina die op zoektermen als "gratis financiele analyse", "financiele check" of "financiele APK" een antwoord met een getal, een tabel en een FAQ geeft en dan naar de tool leidt. De bouwvolgorde meldt bij punt 6 wel dat de onderzochte APK- en inzichttermen concurreren met de gratis tools van Nibud en MijnGeldzaken, dus dit is geen vrij veld. Maar de eigen tool bestaat al en is af; er hoort een pagina om.

**Onvoldoende afgedekte zoekintentie:** alles in dit cluster. En let op de vondst uit `docs/serp-financieel-coach-07-sep-2026.md`: Perplexity citeert de positioneringstaal van de site nu al bij twee van zeven zoekopdrachten, zonder dat er een pagina voor bestaat.


## C3. Financieel inzicht

**Pijler: `vaste-lasten-overzicht-maken`** na herschrijving, niet `grip-op-je-geld-krijgen`. De nulmeting wijst hem aan met 489 van de 543 "vaste lasten"-vertoningen; `grip-op-je-geld-krijgen` heeft 216 vertoningen op positie 82 en is inhoudelijk een generieke stappenplanpagina.

**Ondersteunend:** `huishoudboekje-voorbeeld` (2,67 procent CTR), `potjesmethode-gezin-hoe-werkt-het` (7,82 procent CTR, 13 inkomende links), `geld-indelen-salaris-potjes-systeem` (15 inkomende links), `budget-maken-dat-je-volhoudt`, `/woordenlijst`.

**Overlap:** drie pagina's op "overzicht en grip" (`grip-op-je-geld-krijgen`, `vaste-lasten-overzicht-maken`, `budget-maken-dat-je-volhoudt`), twee op het huishoudboekje, twee op de potjesmethode, en `wat-zijn-normale-vaste-lasten-gezin` bovenop de pijler.

**Ontbrekende interne links:** de 22 inkomende links op de twee potjespagina's staan op methode, niet op inzicht. Van de pijler loopt geen link naar `/rapporten`.

**Ontbrekende commerciele landingspagina:** dezelfde als bij C2. Inzicht is wat de dienst verkoopt; er is geen pagina die inzicht als aanbod presenteert behalve `/geldscan`, die op product zit.

**Onvoldoende afgedekte zoekintentie:** "wat moet ik met mijn overzicht nu ik het heb", de brug van inzicht naar interpretatie, wat precies de Geldscan is.


## C4. Financiele ruimte

**Pijler: `vrij-besteedbaar-inkomen-berekenen`.** Positie 8,45 met 128 vertoningen en 13 inkomende links; de enige van de drie die op pagina 1 staat. Inhoudelijk is `hoeveel-financiele-ruimte-heb-ik` beter (6 FAQ, 3 bronnen, 8 uitgaande links) en die term is ook de strategietaal, maar met 33 vertoningen op positie 12 verliest hij op de cijfers. Neem de zwakkere URL niet als pijler omdat het woord beter klinkt; neem zijn inhoud en zijn term mee in de sterkere URL.

**Ondersteunend:** `50-30-20-regel-hoger-inkomen`, `goed-inkomen-weinig-vermogen`, `hoeveel-sparen-per-maand-normaal-nederland` als de spaarkant.

**Overlap:** het drietal `vrij-besteedbaar-inkomen-berekenen`, `hoeveel-financiele-ruimte-heb-ik` en `hoeveel-geld-overhouden-einde-maand`. Dit is de duurste overlap op de site, want het is de kernvraag van de dienst.

**Ontbrekende interne links:** is-4000 en het boodschappenartikel, samen 22.736 vertoningen, linken niet naar deze pijler. Dat is de goedkoopste beschikbare ingreep op de hele site.

**Ontbrekende commerciele landingspagina:** geen aparte nodig; `/analyse` is de landing en de pijler moet de brug zijn.

**Onvoldoende afgedekte zoekintentie:** "hoeveel houd ik over na vaste lasten" als benchmarkvraag met bedragen per huishoudtype. Nu is het een rekenpagina zonder vergelijking, en de vergelijking is de dienst.


## C5. Financiele gezondheid

**Pijler: `hoe-weet-ik-of-ik-financieel-gezond-ben`.** Compleet pakket (6 FAQ, 3 bronnen, 7 uitgaande links), 59 vertoningen, positie 38,8. De enige echte kandidaat.

**Ondersteunend:** `goed-inkomen-weinig-vermogen`, `hoeveel-sparen-per-maand-normaal-nederland`, `financieel-onafhankelijk-worden-realistisch` als randgeval.

**Overlap:** licht met C4. "Ben ik financieel gezond" en "hoeveel ruimte heb ik" zijn te scheiden zolang C5 over buffer, verhouding en houdbaarheid gaat en C4 over het bedrag per maand. Zet die scheiding in een zin op beide pagina's, zoals bij H1 is gedaan.

**Ontbrekende interne links:** 3 inkomende links op de pijler. Dat is te weinig voor een pijler; werkregel 8.5 vraagt er minstens twee bij publicatie en een pijler hoort er veel meer te hebben.

**Ontbrekende commerciele landingspagina:** een pagina die "financiele gezondheidscheck" als aanbod neerzet. Overweeg die niet apart te bouwen maar met C2 samen te nemen, want het is dezelfde koopvraag in andere woorden.

**Onvoldoende afgedekte zoekintentie:** normen en drempels ("hoeveel buffer is genoeg", "welk deel van je inkomen aan wonen"). Die getallen bestaan al in `lib/benchmarks.ts` maar hebben geen pagina.


## C6. Financieel coach

**Pijler: `/financieel-coach`, geen artikel.** 29,31 procent CTR op positie 6,2 en 17 klikken, tegen 7 klikken op de vier coach-artikelen met 1.806 vertoningen samen. Die artikelen staan op positie 26 tot 56 en de nulmeting adviseert ze niet mee te nemen in de CTR-ronde, omdat een nieuwe titel op positie 56 niemand bereikt.

**Ondersteunend:** `wat-kost-een-financieel-coach` (prijsintentie is het dichtst bij de verkoop), `verschil-budgetcoach-financieel-coach`, `/adviesgesprek`.

**Overlap:** vier artikelen plus een landingspagina op dienstintentie, waarvan twee over de adviseur gaan, een beroep dat de site expliciet niet uitoefent en waarvoor een vergunning nodig is.

**Ontbrekende interne links:** 3 inkomende links op de best converterende pagina van de site. De vier coach-artikelen horen alle vier prominent naar `/financieel-coach` te linken.

**Ontbrekende commerciele landingspagina:** die is er. Dit is het enige cluster waar de landingspagina bestaat, presteert, en het meeste rendement per uur zou geven.

**Onvoldoende afgedekte zoekintentie:** de coach-termen zelf zijn volgens `docs/serp-financieel-coach-07-sep-2026.md` bezet of vergunningplichtig. Bouw hier dus niets nieuws; concentreer op de pagina die al werkt.


## C7. Financiele hulp zonder schulden

**Pijler: `kan-iemand-naar-mijn-financien-kijken`** (6 sep, compleet pakket, 5 FAQ, 4 bronnen). Dit is de scherpste formulering van de positionering die er staat: hulp vragen zonder schulden te hebben.

**Ondersteunend:** `/geldscan`, `/aanbod`, `hoe-weet-ik-of-ik-financieel-gezond-ben`, en de vijf echte rapporten als bewijs.

**Overlap:** met C6, en dat is scherper dan het lijkt. De vijf BNPL-pagina's zitten inhoudelijk in de buurt van dit cluster maar aan de verkeerde kant van de grens: dat is betaalachterstand, dus schulden, en de site is geen schuldhulp.

**Ontbrekende interne links:** de pijler heeft 2 inkomende links en die is een dag oud. `/geldscan` heeft er nul uit artikelbodies.

**Ontbrekende commerciele landingspagina:** `/geldscan` bestaat maar staat sinds 30 augustus bewust buiten de aanvraagroute en krijgt geen interne steun. Als dit cluster de pijler van de positionering is, hoort daar een pagina bij die de vraag "ik heb geen schulden, waar kan ik dan heen" letterlijk beantwoordt en dan het aanbod noemt. Overweeg dat op de bestaande URL te doen in plaats van een nieuwe.

**Onvoldoende afgedekte zoekintentie:** "hulp met geld zonder schulden", "financieel advies zonder schuldhulp", "waar kan ik terecht als ik gewoon geen overzicht heb". Geen enkele pagina beantwoordt die vraag met een bron en een tabel.


## C8. Goed inkomen, maar weinig overhouden

**Pijler: `samen-6000-euro-netto-toch-niets-over`**, dezelfde als C1. Dat is geen fout in de analyse maar het bewijs dat C1 en C8 een cluster zijn: het is een vraag in twee formuleringen. Voer ze samen als een cluster met een pijler en twee zoektermenfamilies.

**Ondersteunend:** `niet-rondkomen-met-4000-euro-netto` (10,53 procent CTR), `tweeverdieners-toch-krap`, `goed-inkomen-weinig-vermogen`, `lifestyle-inflatie-meer-verdienen-meer-uitgeven`, `salarisverhoging-boven-76000-weinig-netto`, `tweede-inkomen-loont-niet-tweeverdieners`, `alleen-wonen-goed-salaris-toch-krap`.

**Overlap:** met C1 volledig, met de bedragcheck-pagina's op de bedragtermen (maar daar heeft de nulmeting bewust voor concentratie op is-4000 gekozen).

**Ontbrekende interne links:** is-4000 en is-5000 trekken samen 13.910 vertoningen op loopbaanintentie en linken niet naar deze pijler. Dat is de vertaling van salarisvraag naar huishoudvraag, en die brug bestaat nu niet.

**Ontbrekende commerciele landingspagina:** geen; `/analyse` en `/geldscan` dekken het. De pijler moet de doorstroom doen.

**Onvoldoende afgedekte zoekintentie:** de bedragvarianten boven 6.000 samen (H2-gebied) en de vraag "wij verdienen samen X en houden niets over" per bedrag. Werkregel 8.7 laat die alleen als FAQ of variant binnen een bestaande pagina toe, dus dat is FAQ-werk.


## C9. Vergelijking met vergelijkbare huishoudens

**Pijler: de data-asset uit CLAUDE.md sectie 8 punt G, en die bestaat niet.** Van de bestaande pagina's is `wat-is-normaal-bedrag-boodschappen-per-maand` (10.932 vertoningen) de sterkste, en `wat-geeft-een-gezin-uit-per-maand` (H1, 6 sep) de best gebouwde. Kies daartussen op wat de hub moet doen: het boodschappenartikel heeft het volume, de hub heeft de architectuur.

**Ondersteunend:** de vijf hubs (H1 staat, H2 tot H5 nog niet of als upgrade), `kosten-levensonderhoud-alleenstaande-2026` (2.445 vertoningen), `nibud-boodschappen-versus-werkelijkheid` (1.388), `hoeveel-sparen-per-maand-normaal-nederland`, `wat-zijn-normale-vaste-lasten-gezin`, en de vijf echte rapporten als bewijslaag.

**Overlap:** `wat-zijn-normale-vaste-lasten-gezin` bovenop H1, `kosten-levensonderhoud-alleenstaande-50-plus-2026` bovenop de alleenstaande-hoofdpagina, en de vier verzonnen casestudy's bovenop `/rapporten`. Tussen het boodschappenartikel en de Nibud-pagina is de kannibalisatie gemeten en weerlegd: 98 tegen 2 procent.

**Ontbrekende interne links:** dit is het cluster met het grootste linkgat. Tien interne links naar `/rapporten` op 94 artikelen, en werkregel 8.10 vraagt per pagina een gelinkt rapport met bedrag. H1 heeft nul uitgaande interne links naar zijn eigen spaken, wat een hub per definitie niet mag hebben.

**Ontbrekende commerciele landingspagina: de data-asset.** "Waar blijft het bij [n] huishoudens", met medianen per post per huishoudtype, n per cel, Dataset-schema en zichtbare datum. Dat is tegelijk de commerciele landingspagina van dit cluster, het enige onkopieerbare bezit, en het antwoord op waarom een AI-zoekmachine deze site zou citeren in plaats van Nibud. De analyseflow verzamelt de cijfers al. Het is het duurste punt op deze lijst en het enige dat het verschil met de concurrentie structureel maakt.

**Onvoldoende afgedekte zoekintentie:** vergelijking per huishoudtype voor stel zonder kinderen (H2) en per post buiten boodschappen. Alles wat de site over "normaal" zegt komt nu van Nibud en CBS, precies zoals de concurrentie.


## C10. Uitgaven die opvallend hoog of laag zijn

**Pijler: `nibud-boodschappen-versus-werkelijkheid`** (1.388 vertoningen, positie 8,51). De vorm "norm naast werkelijkheid" is exact wat dit cluster is, en het is de enige pagina die die vorm al heeft.

**Ondersteunend:** `vaste-lasten-overzicht-maken`, `wat-kost-een-kind-per-maand`, `twee-autos-wat-kost-de-tweede-echt` (positie 4,79), `wat-zijn-normale-vaste-lasten-gezin`, de seizoenspagina's, `auto-kopen-of-leasen-kosten-per-maand`.

**Overlap:** drie pagina's op kindkosten (`wat-kost-een-kind-per-maand`, `schoolkosten-per-jaar-gezin`, `bso-kosten-tweede-inkomen`), drie op seizoenskosten (`seizoens-kostenkalender-per-maand`, `wat-kost-december-feestdagen-gezin`, `wat-kost-een-zomervakantie-gezin`), twee op auto.

**Ontbrekende interne links:** de pijler heeft 1 inkomende link. `wat-kost-een-kind-per-maand` heeft 2, `schoolkosten-per-jaar-gezin` nul.

**Ontbrekende commerciele landingspagina:** dit cluster is letterlijk wat de Geldscan doet ("de drie dingen die het meest opvallen, plus wat juist niet uit de toon valt"), en er is geen publieke pagina die dat als aanbod neerzet met een voorbeeld erbij. `/geldscan` beschrijft het product, niet de vraag.

**Onvoldoende afgedekte zoekintentie:** "is mijn [post] te hoog" per post buiten boodschappen: energie, zorg, verzekeringen, auto, uitgaan. Dat is de vorm die werkt en hij bestaat maar voor een post.


## Wat de tien clusters samen niet dekken

Vier groepen, samen 46 procent van de artikelen en 74 procent van het verkeer:

| Groep | Pagina's | Vertoningen | Klikken | Wat ermee moet |
|---|---:|---:|---:|---|
| Bedragcheck salaris (is-4000, is-5000, is-3000, de Engelse variant) | 4 | 13.942 | 326 | Niet in een cluster duwen. Behouden als bovenkant van de trechter en er twee bruggen uit laten lopen: naar de C4-pijler en naar de hub van het huishoudtype. |
| Loonstrook, opslag, bijzonder tarief | 5 | 3.216 | 25 | Tweede verkeersbron van de site en volledig zonder bronnen. Consolideren tot loonstrook plus bijzonder tarief, en de opslagvraag als C8-spaak. |
| Achteraf betalen en Klarna | 5 | 2.839 | 30 | Terugbrengen tot een pagina. Het publiek is niet de ICP en het taalgebied werkt tegen de positionering. |
| Bespaartips, wonen, sparen, relatie, samenwonen, pensioen | 24 | 2.100 | 26 | Grotendeels status F. Twee E-kandidaten (`zonnepanelen-terugverdientijd`, `verbouwen-financiele-valkuilen`) en een C-kandidaat (`hogere-hypotheek-wat-kost-het-per-maand` als L1). |

---

# Deel 3. Prioriteiten, tien acties

Gesorteerd op strategische winst gedeeld door hoeveelheid nieuw werk. Prioriteit 1 tot 3 vragen geen enkele nieuwe pagina en geen nieuw onderzoek.

**Voorbehoud:** dit is een audit, geen bouwvolgorde. De bouwvolgorde staat tot 12 september op onderhoud en heeft op 13 september de schermlijst en op 19 september de killgrens staan. De acties 1 tot 3 hieronder zijn onderhoud en vallen dus binnen die periode; 4 en hoger zijn nieuw werk en horen na 19 september ingepast, na de funnelbeslissing.

| # | Actie | Wat het oplevert | Werk | Raakt |
|---|---|---|---|---|
| **1** | **Twee bruggen leggen vanuit is-4000 en het boodschappenartikel** naar de C4-pijler en naar de hub van het huishoudtype, in lopende tekst en niet als knop. | 22.736 vertoningen en 445 klikken komen voor het eerst in de clusterarchitectuur terecht. Nu eindigt dat verkeer op een salarisvraag of een boodschappenvraag en gaat het weg. | Twee alinea's in twee bestaande componenten. Geen onderzoek, geen nieuwe pagina. | `is-4000...`, `wat-is-normaal-bedrag-boodschappen-per-maand` |
| **2** | **Het C4-drietal consolideren.** `hoeveel-financiele-ruimte-heb-ik` en `hoeveel-geld-overhouden-einde-maand` opgaan in `vrij-besteedbaar-inkomen-berekenen`, met hun inhoud en hun termen, 301's in `next.config.mjs`, en de 23 inkomende links in dezelfde deploy omleggen. | De kernvraag van de dienst krijgt een pagina in plaats van drie halve. 23 inkomende links komen samen op positie 8,45 in plaats van verspreid over 8,45, 12,3 en niets. | Een sessie. Vraagt eerst het GSC-filter op "besteedbaar" en "overhouden" om te bevestigen dat de drie op dezelfde termen vertonen. | drie URL's, 301's, 23 links |
| **3** | **De 14 inkomende links van `goed-salaris-toch-krap` omleggen** naar de C1/C8-pijler, en daarna beslissen wat die pagina wordt: echte pijler met eigen zoekterm, of 301. | De grootste interne linkstroom van de site wijst nu naar nul vertoningen. Dit is de op een na goedkoopste ingreep die er is. | Een halve sessie voor de links. De beslissing over de pagina zelf is voor Jarno, want een 301 is niet gratis terug te draaien. | 14 componenten |
| **4** | **`/analyse` een zoeksurface geven** volgens het volledige pakket: antwoordblok met getal, tabel per huishoudtype, vijf FAQ's met schema, drie bronnen, zichtbare bijwerkdatum. Zelfde URL. | Cluster C2 krijgt zijn eerste rankende pagina, en dat is de enige primaire conversie-ingang van de site. Nul vertoningen op de pagina waar alles naartoe wijst is het grootste commerciele gat. | Een a twee sessies, en eerst SERP-verificatie in Chrome, want de bouwvolgorde meldt dat Nibud en MijnGeldzaken met eigen gratis tools op dit terrein staan. | `/analyse` |
| **5** | **`/financieel-coach` upgraden in plaats van iets nieuws bouwen in C6**, en de vier coach-artikelen er prominent naartoe laten linken. | 29,31 procent CTR op positie 6,2 met 3 inkomende links. Elke positie winst hier is meer waard dan een nieuwe pagina in een cluster waar de artikelen op positie 26 tot 56 staan. | Een sessie, en de GSC-filter die al als open punt in de bouwvolgorde staat. | `/financieel-coach` plus 4 artikelen |
| **6** | **De vijf BNPL-pagina's terugbrengen tot een**, met de vier dunne pagina's als 301 naar `klarna-niet-kunnen-betalen`, en de bronnen erbij. | Vier URL's zonder bron uit de index, en het schuldentaalgebied krimpt tot een pagina. Dat beschermt de positionering "geen schuldhulp" die de hele dienst draagt. | Een sessie. 2.839 vertoningen staan op het spel, dus eerst het GSC-filter op "klarna" en "achteraf betalen". | 5 URL's |
| **7** | **De bronnenschuld op de vier grootste pagina's zonder bron.** `netto-loonsverhoging-berekenen` (2.844 vertoningen, 0 bronnen), `klarna-niet-kunnen-betalen` (2.616, 0), `vrij-besteedbaar-inkomen-berekenen` (128, 0) en `twee-autos-wat-kost-de-tweede-echt` (0 bronnen op een pagina die alleen uit bedragen bestaat). | Waarheidsregel 3 wordt nageleefd op de pagina's waar het meeste publiek komt, en punt 12 en 14 van de werkregels zijn precies wat AI-zoekmachines laat citeren. | Een sessie, plus elke bronlink zelf openen in Chrome zoals de werkregel van 6 september vraagt. | 4 URL's |
| **8** | **De C9-linklaag aanleggen.** Elke hub en elke benchmarkpagina linkt naar zijn eigen echte rapport met bedrag, en H1 krijgt uitgaande links naar zijn spaken. | Werkregel 8.10 wordt nageleefd, `/rapporten` gaat van 10 naar tientallen inkomende links, en het enige onkopieerbare bezit van de site wordt vindbaar. Nu heeft H1 nul uitgaande interne links, wat een hub niet kan zijn. | Een sessie over bestaande componenten. | H1, 4 benchmarkpagina's, `/rapporten` |
| **9** | **De opruimronde: negen E-kandidaten en zes D-paren.** `boodschappen-duitsland-voordeel` uit `lib/inzichten-data.ts` en uit de sitemap (hij is 301'd en staat nog live in de sitemap, tegen werkregel 8.10), `zonnepanelen-terugverdientijd`, `verbouwen-financiele-valkuilen`, `geldmythes-die-je-arm-houden`, `cash-stuffing-beginnen`, `53-weken-spaaruitdaging-schema-2026`, `wat-doet-een-financieel-adviseur`, plus de kindkosten-, seizoens-, huishoudboekje- en bijzonder-tarief-paren. | 94 artikelen waarvan 39 zonder vertoningen wordt een set waarin elke URL een reden heeft. Dat verlaagt ook het onderhoud van de 2027-sweep in december. | Twee sessies, in stukken. Doe het bij voorkeur bij de CTR-ronde van 4 oktober, wanneer je toch meet. | ongeveer 15 URL's |
| **10** | **De data-asset bouwen** ("Waar blijft het bij [n] huishoudens"), met medianen per post per huishoudtype, n per cel, geen cel onder n van 10, Dataset-schema en maandelijkse herberekening. | Dit is de pijler van C9, de commerciele landingspagina die overal ontbreekt, en het enige antwoord op de vraag waarom een AI-zoekmachine deze site zou citeren in plaats van Nibud. Het staat op 10 omdat het het meeste werk is, niet omdat het het minst belangrijk is. | Meerdere sessies, en het hangt aan de opt-in op het resultaatscherm die er nog niet is. Strikt gezien pas zinvol nadat de analyse wordt afgemaakt. | nieuwe pagina plus serverroute |

## Wat ik niet heb kunnen beoordelen

1. **De SERP.** Geen enkele uitspraak hierboven over concurrentie of over de vraag of een intentie vrij is, komt uit nieuw google.nl-onderzoek. Werkregel 8.1 vraagt Chrome, en dat is niet gedaan. Voor de acties 4, 6 en 10 is dat een voorwaarde.
2. **Zoekterm naar URL voor de vermoedelijke kannibalisatie.** De vier gemeten filters staan in de nulmeting. De vermoedens in dit document over het C4-drietal, de kindkosten-groep, de BNPL-groep en de coach-groep zijn niet per zoekterm gefilterd. Voor elke 301 in actie 2, 6 en 9 hoort dat filter eerst gedraaid.
3. **Bing en de AI-zoekmachines.** Bing Webmaster Tools staat nog niet aan, dus over ChatGPT-zoeken is hier niets te zeggen. De vijf maandelijkse AI-testvragen uit werkregel 8.21 zijn geen onderdeel van deze audit.
4. **Of de nieuwe pagina's van 6 september werken.** N1 tot N5, Z4 en H1 zijn een dag oud. Ik heb geverifieerd dat ze live staan, niet hoe ze presteren. De meetpunten staan op 5 november en 5 december in de bouwvolgorde.
5. **Het woord "eerlijk" staat in vier zichtbare titels**, niet alleen in metaDescriptions en FAQ's: `hoeveel-sparen-per-maand-normaal-nederland`, `wat-zijn-normale-vaste-lasten-gezin`, `achteraf-betalen-bkr-registratie` en `kosten-verdelen-samenwonen-ongelijk-inkomen`. Copyregel 6 verbiedt het woord. CLAUDE.md sectie 11 noemt 27 vermeldingen in `lib/inzichten-data.ts`; dat het er vier in een `titel` zijn, staat er niet bij. Ruim ze op zodra je die pagina's aanraakt, twee ervan staan al op de lijst van deel 3.

6. **Het aantal artikelen.** CLAUDE.md sectie 2 en het plan van 5 september noemen 90 artikelen. Het zijn er 94, geteld per artikelblok en bevestigd door 94 contentcomponenten in `app/inzichten/[slug]/content/`. Werk dat cijfer bij als je CLAUDE.md aanraakt.
