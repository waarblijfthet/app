# SERP en bronnen geldmomenten, 25 september 2026

Fase 0 van `docs/uitvoeringsprompt-geldmomenten-25-sep-2026.md`. Chrome, google.nl met hl=nl en gl=nl. Geen WebSearch-tool gebruikt. Zoekvolumes heb ik niet en zijn niet verzonnen.

## 1. GSC, laatste drie maanden (23 juni tot 22 september 2026)

Gefilterd op "zoekopdracht bevat" in de Search Console-UI, property sc-domain:waarblijfthet.nl.

| Term (bevat) | Bestaande URL met vertoningen | Vertoningen | Positie | Klikken |
|---|---|---|---|---|
| minder werken | geen | 0 | | 0 |
| dagen (4 dagen werken) | geen relevante; alleen losse salarisvragen op is-4000 | 0 relevant | | 0 |
| stop (partner stopt met werken) | 1 vertoning "hoeveel geld heb je nodig om te stoppen met werken" | 1 | 3,0 | 0 |
| groter (groter huis) | geen | 0 | | 0 |
| betalen (huis betalen) | alleen Klarna-vragen | 0 relevant | | 0 |
| hypotheek | alleen salaris hypotheekadviseur | 0 relevant | | 0 |
| scheid | `scheiden-goed-inkomen-toch-niks-over` | 16 ("scheiden zonder inkomen") | 62,4 | 0 |
| rondkomen | geen scheidingsvraag; alleen bedragvragen | 0 relevant | | 0 |
| kind per maand / kost een kind | geen | 0 | | 0 |
| tweede kind | `kinderopvangtoeslag-2027-tweeverdieners` ("kinderopvangtoeslag 2027 tweede kind") | 16 | 3,8 | 2 |
| 18 / kind wordt 18 | geen | 0 | | 0 |
| studer | 3 losse vragen over studeren, niet over ouders | 3 | | 0 |
| kostgeld | "nibud kostgeld 22 jaar" | 1 | 4,0 | 0 |

Paginafilter, zelfde periode:

- `wat-kost-een-kind-per-maand`: 0 vertoningen.
- `hogere-hypotheek-wat-kost-het-per-maand`: 0 vertoningen.
- `scheiden-goed-inkomen-toch-niks-over`: 20 vertoningen, positie 51,6, 0 klikken.

**Conclusie.** Geen bestaande URL bedient een van de hoofdtermen. Dat bevestigt het plan: twee nieuwe slugs (minder werken, kind wordt 18) en drie upgrades op URL's die nu niets vertonen, dus zonder rankingrisico. De enige overlap is "kinderopvangtoeslag 2027 tweede kind" op het 2027-artikel. De kind-pagina gaat daarom niet op de toeslag zelf, maar op wat een tweede kind met de maand doet, en linkt voor de percentages naar dat artikel.

## 2. SERP per hoofdterm

### Minder werken: "wat kost een dag minder werken"

- **Top 9:** nn.nl (wat kost één dag minder werken), Nibud WerkUrenBerekenaar (twee keer), berekenhet.nl (netto bij meer of minder uren), pensioen.nl (pensioen 1 dag minder), semmiewealth.nl, prikkl.nl, raisin.com, peaks.com.
- **AI-overzicht:** ja. Bruto ongeveer 20 procent minder salaris, netto kleiner verlies, met een tabel netto verlies per bruto salaris (bron pensioen.nl), plus vakantiegeld en pensioen.
- **Meer om te vragen:** Is het goedkoper om een dag minder te werken? Wat doet 1 dag minder werken met je pensioen? Is minder werken gunstig voor mijn belasting? Is het voordeliger om 4 dagen te werken?
- **Mensen zoeken ook naar:** 1 dag minder werken belastingvoordeel, 60 jaar 1 dag minder werken, 1 dag minder werken berekenen, minder werken berekenen netto, 24 of 28 uur werken belasting, wat kost een dag minder werken netto.
- **Wat Google beloont:** een netto-bedrag per bruto salaris. Iedereen rekent het inkomensverlies uit, niemand wat het met de hele maand van het huishouden doet. Ik ga die berekening niet overdoen (geen bruto-netto-rekenaar, CLAUDE.md sectie 8); de pagina verwijst voor het netto naar de WerkUrenBerekenaar en begint waar die ophoudt.

### Huis: "kunnen we dit huis betalen"

- **Top 9:** hypotheker.nl, berekenhet.nl, independer.nl, financielemeesters.nl, tulphypotheken.nl, ing.nl, nn.nl (maximale hypotheek), ikbenfrits.nl, rabobank.nl. Negen van negen zijn hypotheekverkopers of rekentools voor de maximale lening.
- **AI-overzicht:** ja. Vraagt om koopprijs, bruto inkomen, eigen geld en schulden, en geeft de vuistregel 4,5 tot 5 keer het bruto jaarinkomen.
- **Meer om te vragen:** Hoeveel kan ik per maand verdienen om een hypotheek van €150.000 te krijgen? Hoeveel moet ik verdienen om een huis van 350.000 euro te kopen? Is 30000 euro overbieden veel?
- **Mensen zoeken ook naar:** kan ik een huis kopen met mijn salaris, kan ik dit huis kopen Rabobank/ING, voor hoeveel kan ik een huis kopen, hoeveel kan ik lenen.
- **Wat Google beloont:** de maximale lening. De vraag "past de nieuwe woonlast in onze eigen maand" wordt door niemand beantwoord. Het Nibud zegt het zelf (bron hieronder): de leennormen gaan uit van gemiddelde budgetten, dus de maandlast kan toch niet in jouw budget passen.

### Scheiding: "kan ik rondkomen na scheiding"

- **Top 9:** uitelkaar.nl, Nibud (geldzaken bij een scheiding), verder-online.nl, Juridisch Loket, inwonersondersteuningroosendaal.nl (ervaringsverhaal), genoeg.nl, mediator-zoeken.nl (scheiden zonder inkomen), excellentfinance.nl, dit.eo.nl.
- **AI-overzicht:** ja. "Ja, je kunt rondkomen, maar je situatie verandert flink": dubbele kosten, alimentatie, toeslagen, fiscaal partnerschap vervalt.
- **Meer om te vragen:** Ik ben gescheiden en heb geen inkomen, wat kan ik doen? Wat moet je niet doen bij een scheiding? Welke financiële hulp kan ik krijgen na een scheiding?
- **Mensen zoeken ook naar:** inkomen vrouwen na scheiding, bijstandsuitkering na scheiding, scheiden financieel niet mogelijk, herinrichtingskosten bij scheiding.
- **Wat Google beloont:** checklists en regelingen, veel voor lage inkomens. Het rekenvoorbeeld van twee huishoudens uit één inkomen staat er niet.

### Kind: "wat kost een tweede kind" en "wat kost een kind per maand"

- **Top 9 (tweede kind):** asnbank.nl, nu.nl, zwangerschapspagina.nl (forum), oudersvannu.nl, een pdf-tabel kinderopvangtoeslag, Nibud, reddit, rijksoverheid.nl (kinderopvangtoeslag 2025), 24baby.nl.
- **Top 8 (kind per maand):** reddit r/nederlands, raisin.com, Nibud, kekmama.nl, welcometomankind.nl, abnamro.nl, knab.nl, 24baby.nl.
- **AI-overzicht:** ja, bij beide. Percentages van het besteedbaar inkomen (15, 25, 29 procent), bij "kind per maand" met de zin "€887 tot €1.000 per maand bij modale inkomens", toegeschreven aan Nibud. **Dat bedrag staat niet op de Nibud-pagina** (zie bronnen). Het stond ook op onze eigen pagina en is daar weggehaald.
- **Meer om te vragen:** Is kinderopvang goedkoper als ik een tweede kind heb? Hoeveel kosten 2 kinderen per maand? Hoeveel kindgebonden budget krijg je voor 2 kinderen? Welke leeftijd kind het duurst?
- **Mensen zoeken ook naar:** kinderopvangtoeslag tweede kind (vijf varianten), kosten kind per maand Nibud, wat kost een baby per jaar.
- **Wat Google beloont:** een percentage van het inkomen. Niemand laat zien wat er gebeurt als opvang, kinderbijslag en minder werken tegelijk veranderen.

### Kind 18: "kind wordt 18 wat verandert er financieel"

- **Top 9:** Nibud (je kind wordt 18), Rijksoverheid (overzicht 18 jaar), budgetcoach.nl, geldfit.nl, Belastingdienst (toeslagen jongeren), geldwijzer.eemsdelta.nl, welzijncapelle.nl, loes.nl, nn.nl.
- **AI-overzicht:** ja. Kinderbijslag en kindgebonden budget stoppen, alleenstaande-ouderkop vervalt, huurtoeslag, eigen zorgverzekering en zorgtoeslag.
- **Meer om te vragen:** Wat gebeurt er met spaargeld als mijn kind 18 wordt? Wat zijn de financiële gevolgen voor mijn inwonende kind boven de 18 jaar? Wat moet je financieel regelen als je 18 wordt?
- **Mensen zoeken ook naar:** kosten levensonderhoud kind 18 jaar, mijn kind wordt 18 kindgebonden budget, checklist 18 jaar, zorgverzekering 18 jaar, mijn kind wordt 18 wat moet ik regelen.
- **Wat Google beloont:** de regellijst. Het gezinsbudget ervoor en erna staat nergens, en de ouder met een goed inkomen (waar het kindgebonden budget al laag of nul is) komt niet voor.

## 3. Primaire bronnen, geopend op 25 september 2026

| Bron | URL | Wat er staat |
|---|---|---|
| SVB, bedragen kinderbijslag | https://www.svb.nl/nl/kinderbijslag/bedragen-betaaldagen/bedragen-kinderbijslag | Per kind per kwartaal, 3e kwartaal 2026: 0 t/m 5 jaar €298,40, 6 t/m 11 jaar €362,35, 12 t/m 17 jaar €426,29. Eerste helft 2026: €295,07, €358,30, €421,53. |
| SVB, uw kind wordt 18 | https://www.svb.nl/nl/kinderbijslag/uw-kind-is-16-of-ouder/uw-kind-wordt-18-jaar | "Is uw kind op de eerste dag van een kwartaal 18 jaar? Dan krijgt u dat kwartaal geen kinderbijslag meer." Vanaf 18 misschien studiefinanciering, tegemoetkoming scholieren of zorgtoeslag. |
| Belastingdienst, voorwaarden kindgebonden budget | https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/toeslagen/kindgebonden-budget/voorwaarden/voorwaarden-kindgebonden-budget | "U hebt 1 of meer kinderen die jonger zijn dan 18 jaar." |
| Belastingdienst, hoeveel kindgebonden budget | https://www.belastingdienst.nl/wps/wcm/connect/nl/kindgebonden-budget/content/hoeveel-kindgebonden-budget | Meer voor alleenstaande ouders zonder toeslagpartner; meer vanaf 12 en 16 jaar. |
| Belastingdienst, ik ben 18 geworden | https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen-jongeren/content/ik-ben-18-geworden-heb-ik-recht-op-toeslagen | Zorgtoeslag ook als ouders de premie betalen of het kind op hun polis blijft. |
| Belastingdienst, wij gaan uit elkaar | https://www.belastingdienst.nl/wps/wcm/connect/nl/toeslagen/content/wij-gaan-uit-elkaar | Eerst regelen dat de ex niet meer meetelt; nieuw inkomen doorgeven, ook bij partneralimentatie. |
| Belastingdienst, opvanguren | https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/prive/toeslagen/kinderopvangtoeslag/hoeveel-kinderopvangtoeslag-kan-ik-krijgen/voor-hoeveel-uur-kinderopvangtoeslag | "Maximaal 230 opvanguren per maand en per kind ... Het maakt niet uit hoeveel uur u per maand werkt." |
| Rijksoverheid, zorgverzekering verplicht | https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/ben-ik-verplicht-een-zorgverzekering-af-te-sluiten | "U betaalt premie vanaf de 1e maand nadat uw kind 18 jaar is geworden. Ook geldt vanaf dat moment het eigen risico en kan uw kind zorgtoeslag aanvragen." |
| Rijksoverheid, eigen risico | https://www.rijksoverheid.nl/vraag-en-antwoord/zorgverzekering/eigen-risico-zorgverzekering | "Het verplichte eigen risico voor 2026 is € 385." |
| DUO, bedragen studiefinanciering | https://www.duo.nl/particulier/studiefinanciering/bedragen.jsp | Hbo en universiteit, september t/m december 2026: basisbeurs thuiswonend €130,21, uitwonend €324,52; aanvullende beurs maximaal €491,08. Mbo augustus t/m december 2026: basisbeurs €107,26 thuis, €350,03 uit. |
| DUO, inkomen ouders | https://duo.nl/particulier/aanvullende-beurs-studiefinanciering/inkomen-ouders.jsp | "De hoogte van de aanvullende beurs is afhankelijk van het inkomen van uw ouders." |
| Nibud, wat kost een kind | https://www.nibud.nl/onderwerpen/kinderen-en-jongeren/wat-kost-een-kind/ | Tweeoudergezin: 1 kind 15, 2 kinderen 25, 3 kinderen 29, 4 kinderen 35 procent van het besteedbaar inkomen (CBS). Eenoudergezin: 23, 31, 37, 42 procent. **Geen bedrag in euro's.** |
| Nibud, je kind wordt 18 | https://www.nibud.nl/onderwerpen/kinderen-en-jongeren/je-kind-wordt-18-jaar/ | "Als ouder blijf je wel onderhoudsplichtig totdat je kind 21 jaar is." |
| Nibud, nieuws 15 januari 2026 | https://www.nibud.nl/nieuws/huishoudens-verliezen-fors-inkomsten-als-kind-18-wordt/ | Rapport "De financiële knip op 18 jaar": kinderbijslag en kindgebonden budget vallen weg, kosten voor zorgverzekering, eigen risico en onderwijs komen erbij. Bedragen gelden voor lage inkomens en bijstand, niet overgenomen. |
| Nibud, kostgeld | https://www.nibud.nl/onderwerpen/kinderen-en-jongeren/kostgeld/ | "Er is geen standaard kostgeldbedrag." 40 procent van de thuiswonende 18- t/m 30-jarigen betaalt kostgeld. Het richtbedrag staat in een pdf die ik niet heb geopend. |
| Nibud, studeren | https://www.nibud.nl/onderwerpen/kinderen-en-jongeren/studeren/ | 58 procent van de ouders draagt bij aan hbo/wo. Uitwonend gemiddeld €317, thuiswonend €137 per maand van ouders; bol-studenten €233 uitwonend, €69 thuiswonend. "Een richtbedrag voor de kosten van studeren is ongeveer 1000 euro per maand." |
| Nibud, WerkUrenBerekenaar | https://www.nibud.nl/tools/werkurenberekenaar/ | "In ongeveer 15 minuten zie je precies wat meer of minder uren werken betekent voor het netto-inkomen." |
| Nibud, Geldplan Scheiden | https://www.nibud.nl/tools/geldplan-scheiden/ | Voor wie overweegt uit elkaar te gaan; niet geschikt voor samengestelde gezinnen. |
| Nibud, hypotheek afsluiten | https://www.nibud.nl/onderwerpen/wonen/hypotheek-afsluiten/ | "Omdat deze normen zijn gebaseerd op gemiddelde budgetten, kan het zijn dat de maandlasten toch niet goed passen in jouw budget." |
| Nibud, woonlasten en woonverzekeringen | https://www.nibud.nl/onderwerpen/wonen/woonlasten-woonverzekeringen/ | Naast huur of hypotheek: onroerendezaakbelasting, afvalstoffen- en rioolheffing, waterschap, inboedel- en opstalverzekering. |
| Mijnpensioenoverzicht | https://www.mijnpensioenoverzicht.nl/ | Verwachte pensioen inclusief AOW, inloggen met DigiD. |

Eerder geverifieerd en hergebruikt uit de repo (niet opnieuw geopend): de kinderopvangtoeslagtabel en maximum uurprijzen 2026 (`lib/kinderopvangtoeslag-2027.ts`, Belastingdienst, 13 september 2026) en de hypotheekrente van rond de vier procent (`lib/rente-verschil.ts`, Van Bruggen, 26 maart 2026, geverifieerd 6 september 2026).

### Niet gevonden of niet te openen

- Het bedrag "€887 tot €1.000 per maand" voor één kind: staat niet op de Nibud-pagina. Weggehaald.
- "Woonlasten bij voorkeur niet boven een derde van je netto-inkomen" als Nibud-vuistregel: niet gevonden op de twee Nibud-woonpagina's. Weggehaald uit de huispagina.
- "Alleenstaande ouder, twee kinderen 37 procent" op de kindpagina was fout: het Nibud zegt 31 procent voor twee, 37 voor drie. Gecorrigeerd.
- Nibud-kosten per kind per leeftijd in euro's, het kostgeld-richtbedrag (pdf) en een Nibud-richtlijn voor de ouderbijdrage buiten de gemiddelden hierboven: niet beschikbaar. Weggelaten.

## 4. Zesde categorie: inkomensdaling, baanverlies, arbeidsongeschiktheid

Onderzocht, niet gebouwd.

- **GSC, drie maanden:** 0 vertoningen op "werkloos", "ontslag", "arbeidsongeschikt", "inkomen daalt". Eén vertoning op "uitkering".
- **SERP "inkomen gaat omlaag wat nu":** Belastingdienst (twee keer), Rijksoverheid (ondersteuning bij laag inkomen), Juridisch Loket, Huurcommissie, overtoeslagen.nl, Nibud (toeslagen), NOS. AI-overzicht: toeslagen en voorlopige aanslag aanpassen. Vragen: waar heb je recht op bij een laag inkomen, wat wordt gezien als een laag inkomen.
- **SERP "baan kwijt financieel wat nu":** FNV, Geld voor Later, Juridisch Loket, CNV, Geldfit, werk.nl (Geldplan werkloosheid), Rijksoverheid, NHG, budgetcoach.nl. AI-overzicht: WW aanvragen bij UWV, vaste lasten in kaart.
- **SERP "arbeidsongeschikt inkomen wat houd ik over":** Nibud, FNV, UWV (IVA), Rijksoverheid (WIA), Van Bruggen, Wijzer in geldzaken, P-Direkt, verzuimregisseur, UWV.
- **Commerciële intentie:** laag voor een betaalde scan. Het is een acuut moment met gratis overheids- en vakbondshulp, en de vragen gaan over rechten en uitkeringen. Arbeidsongeschiktheid schuift snel naar verzekeringen (AOV), dus Wft-terrein.
- **Aansluiting:** matig. De SERP trekt naar lage inkomens en schuldhulp, precies wat Waar blijft het niet is (CLAUDE.md sectie 4).
- **Overlap:** de variant die wel past, een lager inkomen door eigen keuze (nieuwe baan met minder salaris, sabbatical), valt onder dezelfde doorrekening als minder werken.
- **Conclusie:** geen aanleiding om dit als zesde geldmoment uit te bouwen. Wel meten: kiest iemand in het keuzeveld "Iets anders" en beschrijft een inkomensdaling, dan telt dat mee. Opnieuw bekijken bij 5 of meer zulke aanvragen.
