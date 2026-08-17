# Bouwprompts content, augustus 2026

Werkdocument. Elk blok hieronder is een kant-en-klare prompt voor een eigen sessie met Sonnet. Onderbouwing van de keuzes: `docs/serp-inkomensbedragen-17-aug-2026.md` (zeventien SERP's, geverifieerd met Chrome op google.nl op 17 aug 2026). Werkregels: `CLAUDE.md`.

Opgesteld 17 aug 2026, na het bouwen van kans 3 (de bedragensectie op het 4.000-artikel, commit `a1b285a`). Dat is het referentiewerk: alles hieronder volgt dezelfde werkwijze.

---

## 0. Hoe je dit gebruikt

- **Eén klus per sessie.** Niet twee blokken in dezelfde sessie, want de toetsronde werkt alleen met verse ogen.
- **Plan-modus aan** bij elke klus met het label `nieuw artikel`. Bij `bestaand aanpassen` niet nodig.
- Kopieer het hele promptblok inclusief de kopregel. De vaste context in sectie 1 hoeft er niet bij: die staat in `CLAUDE.md` en die leest de sessie zelf.
- Escaleer naar Opus als een van deze dingen gebeurt: de SERP blijkt anders dan hier beschreven, de toetsronde vindt meer dan drie feitelijke fouten, of er moet een bestaande pagina met verkeer herschreven worden in plaats van uitgebreid.
- Na elke klus: dit document bijwerken met wat er gebouwd is en wat de toets vond.

---

## 1. Vaste werkwijze, geldt voor elke klus

Zes stappen. Sla er geen over, en zeker stap 4 niet.

**Stap 1, SERP verifiëren.** Open de zoekterm met Chrome op google.nl (`https://www.google.nl/search?q=...&gl=nl&hl=nl`). Nooit de WebSearch-tool: die staat niet op Nederland en gaf bij dit onderzoek een ander beeld dan de echte SERP. Leg vast wie er staat, welke PAA-vragen er zijn en wat er onder "Mensen zoeken ook naar" staat. Wijkt het af van wat in dit document staat, stop dan en meld het aan Jarno voordat je schrijft.

**Stap 2, bronnen ophalen vóór je schrijft.** Elk getal over een echte klant komt uit `lib/rapporten-data.ts` via `rapportVoorSlug()` en de constanten `RAPPORTEN.length`, `AANTAL_ZONDER_LEK` en `AANTAL_ZONDER_VERVOLG`. Elk berekend bedrag komt uit `lib/salaris-vuistregel.ts` via `berekenVuistregel()`. Nooit een bedrag met de hand in de tekst typen, ook niet in een tussenzin, ook niet als Jarno het getal aanlevert. Tel nooit met grep: `grep -c "slug:"` telt de interface mee en gaf op 17 aug 7 in plaats van 5.

**Stap 3, bouwen.** Nieuw artikel betekent: entry vooraan in `lib/inzichten-data.ts` (met `cta`-veld), content-component in `app/inzichten/[slug]/content/`, import en map in `ArticleBody.tsx`. Verplicht per artikel: antwoord binnen het eerste scherm, een interactief of berekend element, vijf FAQ's met schema, drie bronnen met ophaaldatum, minstens twee interne links, en één CTA met situatieparameter. Zet de CTA na het eigen getal van de lezer, nooit boven het antwoord.

**Stap 4, toetsronde met drie verse subagents, parallel.** Dit is geen controle achteraf, dit is onderdeel van het schrijven. Bij kans 3 had ik zelf drie rekenfouten geschreven en er geen enkele zelf gevonden.

1. *SEO-toets.* Geef de agent de zoekterm, de echte SERP uit stap 1, de metaTitel, de H1 en de volledige tekst. Vraag om: zoekintentie-match, kannibalisatierisico met bestaande pagina's, snippet- en AI Overview-geschiktheid, koppenstructuur, schema, en wat er ontbreekt. Maximaal 500 woorden.
2. *ICP-toets.* Geef de agent `docs/icp-personas.md` en de tekst. Laat twee profielen spelen die bij deze zoekterm horen. Vraag per persona: eerste gedachte, kun je jezelf terugvinden en klopt het getal met jouw werkelijkheid, waar stop je met lezen, klik je op de CTA (ja of nee, "misschien" telt als nee), en één ding dat irriteert of wantrouwen wekt.
3. *Bezwaartoets.* Geef de agent de rekenregel en de tekst, en de opdracht om de tekst onderuit te halen. Vraag om: elk getal dat niet klopt, elke mening die als feit klinkt, het zwakste punt in de logica, waar de kleine n wringt, en elke verkapte belofte over resultaat.

**Stap 5, correcties en verificatie.** Verwerk de bevindingen. Draai daarna een vierde, aparte verificatie-agent die alleen controleert: reken elk getal in de proza na tegen de formule, en meld afwijkingen. Daarna `npx tsc --noEmit --incremental false`, moet schoon zijn, plus een check op null bytes.

**Stap 6, opleveren.** Commit met een boodschap die vermeldt wat de toetsronde vond. Pushen doet Jarno. Blijft de commit hangen op `HEAD.lock` of `index.lock`, dan haalt Jarno die weg en draai je `git commit` direct als eerstvolgende commando, zonder `ls` of `git status` ertussen. Meld aan Jarno dat de nieuwe URL handmatig in GSC ingediend moet worden.

**Wat je nooit doet.** Een klantcase, review of resultaat verzinnen. Een percentiel, marktaandeel of bruto-equivalent opschrijven zonder gecontroleerde bron met datum. Een garantie of beloofd bedrag. Een frequentieclaim ("meestal", "vaak", "in de meeste gevallen") op basis van vijf huishoudens. Em dashes of een koppelteken als scheidingsteken. Wij, we of ons buiten letterlijke klantcitaten. Het woord "eerlijk" in outreach.

---

## 2. Volgorde

| Batch | Klussen | Waarom deze volgorde |
|---|---|---|
| A, eerst | 1, 2, 3 | Bestaande pagina's, geen nieuw onderzoek, en klus 1 opent een hele SERP-familie waar we nu nul aanwezigheid hebben |
| B, daarna | 4, 5, 6 | Nieuwe artikelen met een eigen hoek en echt bewijs eronder |
| C, later | 7, 8, 9 | Zwakkere koopintentie of afhankelijk van meting |
| Doorlopend | 10 | Tien artikelen per sessie, naast het andere werk |

Klus 11 staat er als expliciet niet doen, zodat niemand hem alsnog oppakt.

---

## 3. De klussen

### Klus 1. Rapportpagina's omzetten naar het gezinsbudget-format
`bestaand aanpassen` · hoogste opbrengst gedeeld door kosten

> **Prompt voor Sonnet**
>
> Lees eerst `CLAUDE.md` en `docs/serp-inkomensbedragen-17-aug-2026.md` sectie 1 en 4.
>
> Opdracht: herschrijf de metadata en de omlijstende copy van `/rapporten` (`app/rapporten/page.tsx`) en de vijf detailpagina's (`app/rapporten/[slug]/page.tsx`, data in `lib/rapporten-data.ts`), zodat ze meedoen in de SERP die nu volledig bezet is door huishoudboekje-artikelen.
>
> Waarom: op elke zoekterm rond rondkomen en gezinsbudget ranken Kids en Kurken, J/M Ouders, Flair, Mamaplaats en Telegraaf Kasboek met budgetdagboeken zonder analyse. Waar blijft het staat op geen enkele, terwijl deze vijf rapporten precies dat format zijn plus een oordeel en een nameting. Geverifieerde zoektermen waar we afwezig zijn: "gezinsbudget 6000 euro netto per maand", "huishoudboekje voorbeeld gezin netto inkomen", "rondkomen van 4000 euro per maand".
>
> Wat je verandert:
> - De `metaTitel` per rapport. Nu begint elk met "Echt geldrapport:", en daar zoekt niemand op. Nieuw patroon: het format plus het bedrag plus de spanning, bijvoorbeeld "Gezinsbudget: samen €7.880 netto en toch niets over". Haal het bedrag uit `kenmerken`, niet uit je geheugen.
> - De `metaDescription` per rapport: begin met de huishoudsamenstelling en het netto bedrag, want dat is waar de zoeker op scant.
> - De titel en description van de index: nu "Vijf echte geldrapporten, van begin tot eind". Zet het format erin en gebruik `RAPPORTEN.length` in plaats van het woord "vijf" in de code.
> - Voeg op de index één alinea toe die expliciet benoemt wat het verschil is met een huishoudboekje-rubriek: hier staat niet alleen wat er binnenkwam en wegging, maar ook wat ik erover schreef en wat er drie tot vier maanden later veranderde.
>
> Wat je NIET verandert: de `verhaalTitel`, want die is door vijf echte ICP's goedgekeurd en die blijft de H1. Geen enkel bedrag in `lib/rapporten-data.ts`, want een rapport is een optelsom. De structuur van de detailpagina.
>
> Let op: op de index staat nu "Vier van de vijf hadden het bij zichzelf mis". Dat aantal is niet uit de data af te leiden en valt daarmee onder werkregel 4b. Haal het weg of vervang het door iets dat wel uit `RAPPORTEN` volgt.
>
> Daarna de toetsronde uit sectie 1 stap 4, met als ICP-profielen Sandra en de alleenstaande ouder.

---

### Klus 2. Consolideren van het goed-salaris-cluster
`bestaand aanpassen` · opruimwerk met direct effect

> **Prompt voor Sonnet**
>
> Lees eerst `CLAUDE.md`.
>
> Probleem: op de geverifieerde zoekterm "goed salaris maar toch niet rondkomen" staat Waar blijft het nergens, terwijl de site drie artikelen heeft die alle drie dat onderwerp claimen: `goed-salaris-toch-krap`, `goed-salaris-toch-geldstress` en `waarom-hou-ik-nooit-geld-over`. De SERP wordt bezet door Intermediair (twee keer, waarvan één column van Carolien Vos, een directe concurrent), Nibud, Erica Verdegaal en Budgetcoach.nl. Dit is de zoekterm die het dichtst bij de positionering van de site ligt.
>
> Opdracht:
> 1. Vergelijk de drie artikelen in `lib/inzichten-data.ts` en hun content-componenten. Bepaal welke van de drie het meest verkeer en de sterkste hoek heeft, en onderbouw die keuze met wat je in GSC-data of in de tekst zelf ziet, niet met een gevoel.
> 2. Maak die ene de winnaar: werk hem uit tot het volledige antwoord op de zoekvraag, met een echte case uit `lib/rapporten-data.ts` erin.
> 3. De andere twee versmallen tot hun eigen deelvraag, en beide vanaf de eerste alinea naar de winnaar laten linken. Niet verwijderen en niet redirecten zonder het aan Jarno te vragen.
> 4. Controleer of de drie metaTitels elkaar nog overlappen. Zo ja, maak ze uit elkaar.
>
> Verifieer de SERP eerst zelf met Chrome, want deze staat op 17 aug gemeten en kan bewogen zijn.
>
> Daarna de toetsronde uit sectie 1 stap 4.

---

### Klus 3. Antwoord op de bestaande PAA-vragen bij het 4.000-artikel
`bestaand aanpassen` · klein, een halve sessie

> **Prompt voor Sonnet**
>
> Het artikel `is-4000-euro-netto-goed-salaris-nederland` staat organisch op plek 1. Het PAA-blok bij die zoekterm bevat twee vragen die de pagina niet beantwoordt: "Wie verdient 4000 euro netto per maand?" en "Welke beroepen verdienen 4000 netto?".
>
> Opdracht: beantwoord die twee als FAQ-vragen in de bestaande `faq`-array van dat artikel in `lib/inzichten-data.ts`. Voeg ze toe aan de bestaande FAQPage-node, maak geen tweede.
>
> Belangrijke beperking: dit is loopbaanintentie en geen koopintentie. Houd de antwoorden kort en feitelijk, maak er geen sectie in het artikel van, en stuur niet door naar de Geldscan. Doel is alleen de PAA-positie pakken.
>
> Tweede beperking, en die is hard: er is geen gecontroleerde bron voor welk beroep welk netto salaris betaalt. Schrijf niets op wat je niet kunt onderbouwen met een bron met datum. Kun je geen bron vinden, meld dat en bouw alleen de vraag die je wel kunt beantwoorden.
>
> Bij deze klus mag de toetsronde beperkt blijven tot de bezwaartoets.

---

### Klus 4. Nieuw artikel, niet rondkomen met €4.000 netto
`nieuw artikel` · grootste geverifieerde gat

> **Prompt voor Sonnet**
>
> Lees eerst `CLAUDE.md` en `docs/serp-inkomensbedragen-17-aug-2026.md`.
>
> Zoektermen: "niet rondkomen met 4000 netto", "rondkomen van 4000 euro per maand". Geverifieerd op 17 aug: geen enkele pagina in de top tien beantwoordt de vraag. Er staan een forumdraad uit 2023, een column uit 2022, twee huishoudboekje-blogs, een Nibud-pagina die het bedrag niet noemt, en een Belgisch geluksonderzoek. Waar blijft het is afwezig.
>
> De eigen hoek: iedereen die hierop zoekt weet al dat €4.000 een goed salaris is, want dat is hem verteld. Zijn vraag is niet of het genoeg is, maar waarom het bij hem niet genoeg is. Het antwoord van deze site: bij een gezin met twee kinderen komt de vuistregel op dit bedrag ongeveer op nul uit, en het omslagpunt ligt rond €4.080. Dat is geen karakterfout maar rekenwerk.
>
> Bouwen:
> - Gebruik `SalarisRekenaar` bovenaan met `startInkomen={4000}` en een eigen `kop` en `intro` die op deze zoekvraag openen, niet op de vraag of het een goed salaris is.
> - Bouw voort op `lib/salaris-vuistregel.ts` voor alle bedragen. Kijk naar `components/artikel/SalarisBedragenTabel.tsx` als voorbeeld van hoe je berekende bedragen in lopende tekst zet.
> - Verwerk minstens twee echte rapporten via `rapportVoorSlug()`, waaronder het gezin met drie kinderen dat dacht dat het aan de boodschappen lag.
> - Link vanuit het 4.000-artikel naar dit nieuwe artikel, en terug. Zonder inkomende link van de plek-1-pagina staat een nieuw artikel alleen in de sitemap.
> - CTA met situatieparameter, na het eigen getal van de lezer.
>
> Waak hiervoor: dit artikel mag niet hetzelfde zeggen als `is-4000-euro-netto-goed-salaris-nederland`, anders kannibaliseer je de plek-1-pagina. Het verschil moet zijn: dat artikel beantwoordt "is het goed", dit artikel beantwoordt "waarom kom ik er niet mee uit". Laat de SEO-toets hier expliciet op controleren.
>
> Daarna de volledige toetsronde uit sectie 1 stap 4, met Sandra en de alleenstaande ouder als ICP's.

---

### Klus 5. Nieuw artikel, wat houd je over na je vaste lasten
`nieuw artikel`

> **Prompt voor Sonnet**
>
> Zoektermen: "hoeveel moet je overhouden na vaste lasten", "wat houden jullie over na je vaste lasten". Geverifieerd op 17 aug: de hele top tien is de 50/30/20-regel van banken (Nationale-Nederlanden, ABN Amro, Raisin), plus Knab, Nibud en een Reddit-draad waarvan het bestbeoordeelde antwoord "ik hou vooral stress over" is.
>
> De eigen hoek, en die is scherp: 50/30/20 is een vuistregel uit een Amerikaans boek en zegt niets over een Nederlands huishouden met een bovenmodaal inkomen. Deze site heeft iets wat geen van die banken heeft: een maatstaf die is afgeleid uit echte doorgerekende huishoudens, met de herkomst per getal erbij en de n erbij. Zet die twee naast elkaar en laat zien waar ze uit elkaar lopen.
>
> Bouwen:
> - Een berekend element dat per huishouden laat zien wat 50/30/20 voorspelt en wat de vuistregel van deze site voorspelt. Gebruik `berekenVuistregel()` uit `lib/salaris-vuistregel.ts`.
> - Wees expliciet over de grens van de eigen methode: n is klein, sommige posten leunen op één of twee huishoudens, woonlast en vrije tijd zijn aannames. Dat is precies de eerlijkheid die de banken niet leveren, dus verstop het niet in kleine letters.
> - Verwijs naar `/rapporten` voor wie wil narekenen.
> - Interne links vanuit `hoeveel-geld-overhouden-einde-maand`, `vaste-lasten-overzicht-maken` en `50-30-20-regel-hoger-inkomen`. Let op: dat laatste artikel bestaat al, dus controleer eerst of dit nieuwe artikel het niet kannibaliseert. Kan het ook een uitbreiding van dat bestaande artikel zijn? Beantwoord die vraag voordat je begint en meld je conclusie.
>
> Daarna de volledige toetsronde.

---

### Klus 6. Nieuw artikel, €4.000 netto met twee kinderen
`nieuw artikel`

> **Prompt voor Sonnet**
>
> Zoekterm: "4000 euro netto gezin twee kinderen rondkomen". Geverifieerd op 17 aug: Waar blijft het staat hier op plek 5 met het 4.000-artikel, met Google's melding "Bevat niet: rondkomen". De rest is Kids en Kurken, een Reddit-draad, J/M Ouders en een forumpost uit 2018.
>
> De eigen hoek: het huishouden is de drempel en niet het bedrag, en dit is het meest gezochte huishouden binnen die vraag. Bij €4.000 met twee kinderen komt de vuistregel ongeveer op nul uit en het omslagpunt ligt rond €4.080. Vertel wat dat betekent voor de posten die je niet ziet: sparen, buffer, kleding, vakantie, onderhoud, eigen risico.
>
> Let op de overlap met klus 4. Als klus 4 al gebouwd is, beoordeel dan eerst of dit een eigen artikel moet worden of een sectie binnen klus 4. Twee artikelen die allebei over €4.000 en rondkomen gaan is één artikel te veel. Meld je conclusie voordat je bouwt.
>
> Gebruik `SalarisRekenaar` met `startKinderen={2}` en het gezin met drie kinderen uit `lib/rapporten-data.ts` als bewijs. Daarna de volledige toetsronde.

---

### Klus 7. Kasboek van een alleenstaande met een goed salaris
`nieuw artikel` · batch C

> **Prompt voor Sonnet**
>
> Zoektermen rond de alleenstaande met een goed salaris die toch niets overhoudt. Op "alleenstaand 4000 netto waar blijft mijn geld" staat Waar blijft het al op plek 1, dus de vraag is of hier een eigen pagina bij hoort of dat het bestaande artikel `alleen-wonen-goed-salaris-toch-krap` versterkt moet worden. Beantwoord die vraag eerst, met een echte SERP-check.
>
> Het gat dat wel vaststaat: het gezinsbudget-format bestaat voor de alleenstaande vrijwel niet, alleen Telegraaf Kasboek doet het. Er is één echt rapport van een alleenstaande met €3.650 netto in `lib/rapporten-data.ts`, waarbij het vermoeden juist was maar het bedrag €250 groter.
>
> Bouw niets voordat klus 1 gedaan is, want dan is het rapport zelf al als kasboek gepositioneerd en kan dit artikel ernaar verwijzen in plaats van het over te doen.

---

### Klus 8. Is €6.000 netto een goed salaris
`nieuw artikel` · batch C

> **Prompt voor Sonnet**
>
> Zoekterm: "is 6000 netto een goed salaris". Geverifieerd op 17 aug: Waar blijft het is afwezig, de SERP is Reddit, NationaleBeroepengids, een AD-interview uit 2021 en Tempo Team.
>
> Waarschuwing die je serieus moet nemen: bij dit bedrag kantelt de zoekintentie naar bruto. Alle gerelateerde zoekopdrachten waren "Is 6000 bruto", "Is 6500 bruto", "Is 7500 bruto". Boven €6.000 wordt het loonhandel en zit de koper er niet meer tussen.
>
> Doe daarom eerst een verse SERP-check en beoordeel of de netto-intentie er nog is. Is die er niet, meld dat en bouw niets. Dat is een geldig resultaat van deze klus.
>
> Bestaat het artikel `samen-6000-euro-netto-toch-niets-over` al: controleer of dat de zoekterm niet al deels pakt.

---

### Klus 9. Huishoudboekje maken, de methodevraag
`nieuw artikel` · batch C, zwakste koopintentie

> **Prompt voor Sonnet**
>
> Zoektermen: "huishoudboekje voorbeeld", "huishoudboekje maken". Grote SERP, bezet door Rabobank en Nibud met sjablonen, plus Wijzer in geldzaken met een overzicht van dertig huishoudboekjes.
>
> De eigen hoek: het sjabloon is het probleem niet. Iedereen die een huishoudboekje bijhoudt weet na twee maanden precies wat er wegging en nog steeds niet of dat veel is. De vergelijking erna is wat ontbreekt, en dat is precies wat deze site doet.
>
> Beperking: dit is een instapartikel met zwakke koopintentie. Bouw het pas als batch A en B staan, en houd het kort. Er bestaat al `moet-je-een-huishoudboekje-bijhouden`; controleer eerst of dit daar een uitbreiding van moet zijn.

---

### Klus 10. Situatieparameters in de bestaande artikelen
`doorlopend` · tien artikelen per sessie

> **Prompt voor Sonnet**
>
> De Geldscan-pagina ondersteunt sinds 15 aug de parameters `?situatie=&inkomen=&boodschappen=`, waarmee de bezoeker zijn situatie niet opnieuw hoeft in te vullen. De situatiesleutels staan in `app/geldscan/page.tsx` als `SituatieSleutel` en de helper staat in `lib/salaris-vuistregel.ts` als `geldscanSituatie()`.
>
> Op dit moment gebruikt vrijwel geen enkel artikel die parameters in zijn CTA. Dat is de goedkoopste openstaande conversiewinst die er ligt.
>
> Opdracht per sessie: neem tien artikelen uit `lib/inzichten-data.ts`, begin bij de artikelen met het meeste verkeer, en zet de `cta.primairHref` om naar `/geldscan?situatie=X` met de situatie die bij het onderwerp van dat artikel hoort. Een artikel over alleenstaanden krijgt `alleenstaand`, een gezinsartikel `gezin`, enzovoort. Weet je het niet zeker, laat de parameter dan weg in plaats van te gokken.
>
> Houd bij welke tien je gedaan hebt, onderaan dit document.

---

### Klus 11. Wat je expliciet NIET bouwt

- **Losse pagina's per salarisbedrag** (is-4100, is-4200, is-4300, is-4500, is-4600). Het 4.000-artikel rankt daar al op plek 1 tot 3 en de bedragensectie van 17 aug dekt ze nu binnen die pagina. Aparte pagina's kannibaliseren de plek-1-positie en vallen onder wat Google scaled content abuse noemt.
- **Is €3.500 netto een goed salaris als eigen artikel.** Stond als kans 6 in het SERP-document, maar is achterhaald: de bedragensectie van 17 aug geeft €3.500 en €3.750 een eigen H3 binnen de plek-1-pagina. Meet eerst in GSC of die pagina de zoekterm oppakt. Doet hij dat na acht weken niet, dan pas heroverwegen.
- **Bedragen boven €6.000.** Bij €7.000 en €8.000 kantelt de intentie volledig naar bruto en beroepenlijsten.
- **Rondkomen met één inkomen.** Kwam vier keer terug in gerelateerde zoekopdrachten, maar er is geen rapport van een eenverdiener. Bouwen zonder eigen bewijs is precies wat de rest van deze SERP doet. Wachten tot die klant er is.
- **Percentielen of bruto-equivalenten per salarisbedrag**, zolang er geen CBS-bron met datum bij zit. De SEO-toets vroeg hier bij kans 3 om en het is afgewezen op werkregel 3. Ligt als keuze bij Jarno.

---

## 4. Afvinklijst per klus

Een klus is pas af als alle acht waar zijn.

1. SERP zelf geverifieerd met Chrome op google.nl, uitkomst vastgelegd.
2. Elk bedrag over een echte klant komt uit `lib/rapporten-data.ts`, elk berekend bedrag uit `lib/salaris-vuistregel.ts`. Nul handgetypte bedragen.
3. Geen marktclaim, percentiel of uniciteitsclaim zonder bron met datum.
4. Drie toetsagents gedraaid, bevindingen verwerkt, en opgeschreven wat ze vonden.
5. Vierde verificatie-agent heeft de getallen in de proza nagerekend tegen de formule.
6. `npx tsc --noEmit --incremental false` schoon, geen null bytes.
7. Minstens twee inkomende interne links vanaf bestaande pagina's, waarvan één vanaf een pagina met verkeer.
8. Gecommit, en aan Jarno gemeld dat de URL in GSC ingediend moet worden.

---

## 5. Logboek

Vul hier per sessie één regel in, zodat de volgende sessie weet waar hij staat.

| Datum | Klus | Wat er gebouwd is | Wat de toets vond |
|---|---|---|---|
| 17 aug 2026 | Kans 3, bedragensectie 4.000-artikel | `lib/salaris-vuistregel.ts`, `components/artikel/SalarisBedragenTabel.tsx`, 3 FAQ's, rapportenblok data-gedreven. Commit `a1b285a` | Drie beweringen die de tabel tegenspraken, vijftien handgetypte bedragen die te laag afgerond waren, Sandra wist niet welk inkomen ze moest pakken, Niels zag niet wat eraf ging |
| 17 aug 2026 | Klus 1, rapportpagina's naar gezinsbudget-format | `lib/rapporten-data.ts` (5x metaTitel/metaDescription), `app/rapporten/page.tsx` (index-metadata via `RAPPORTEN.length`, nieuwe alinea over verschil met huishoudboekje-rubriek). Commit `b105eba` | Toetsronde was zelfreview (geen losse subagents beschikbaar in die uitvoering): 2 te lange metaTitels + te lange index-description ingekort; bestaande databug gevonden (metaDescription noemde €6.800 i.p.v. €6.990 uit `kenmerken`); te sterke claim over "nooit sparen" afgezwakt naar wat de data dekt; huishoudboekje-alinea was te uitleggerig, herschreven. Geen nieuwe URL's, geen GSC nodig. |
| 17 aug 2026 | Klus 2, consolideren goed-salaris-cluster | `goed-salaris-toch-krap` (content-component + data) uitgewerkt tot pillar met echte case (`tweeverdieners-drie-kinderen`) en 5e FAQ; `goed-salaris-toch-geldstress` en `waarom-hou-ik-nooit-geld-over` versmald naar hun deelvraag, linken nu naar de winnaar; metaTitels ontdubbeld. Commit `4fca99f`. Terzijde meegecommit: `90aa3f7`, een al aanwezige ongecommitte productiebuild-fix in `SalarisBedragenTabel.tsx` (minifier brak verkorte objectnotatie), niet door deze klus veroorzaakt maar wel door de klus-agent beoordeeld en weggewerkt. | Zelfreview (geen losse subagents beschikbaar): duplicate "Herken je dit"-box tegen nooit-geld-over herschreven; impliciete patroonclaim op kleine n ("zie ik vaker") verwijderd; case sloot niet aan bij Niels/DINK, brug + link naar /rapporten toegevoegd. Niet zelf opgelost, gemeld als bestaande schuld: het ongesourcete "€200 per maand abonnementen"-getal staat sitebreed in meerdere artikelen. Jarno: overweeg de 3 gewijzigde URL's handmatig te laten hercrawlen in Search Console (geen nieuwe/verwijderde URL's). |
| 17 aug 2026 | Klus 3, PAA-vragen bij 4.000-artikel | Eén nieuwe FAQ ("Wie verdient €4.000 netto per maand?") toegevoegd aan bestaande `faq`-array van `is-4000-euro-netto-goed-salaris-nederland`, gesourced met CBS "Materiële welvaart in Nederland 2024". Commit `959af7c`. | Bewust NIET gebouwd: "welke beroepen verdienen €4.000 netto" — geen betrouwbare aggregaatbron gevonden die beroep aan netto salaris koppelt (alleen vacaturesites/SEO-blogs/anekdotes), dus half werk opgeleverd zoals bedoeld. Bezwaartoets (zelfreview) haalde een ongesourcete slotzin over "wie dit vaker heeft" eruit. Geen nieuwe URL, geen GSC nodig. |
| 17 aug 2026 | Klus 4, nieuw artikel "niet-rondkomen-met-4000-euro-netto" | SERP zelf geverifieerd op google.nl (geen wijziging t.o.v. 17-aug-document): forum 2023, column 2022, twee huishoudboekje-blogs, Nibud zonder het bedrag, Belgisch geluksonderzoek, plus twee nieuwe niet-concurrerende resultaten (Intermediair-interview mei 2026, NOS-artikel juni 2026). Waar blijft het afwezig, geen escalatie nodig. Omslagpunt zelf herbevestigd via JS-uitvoering van de vuistregel: €4.080 (bij €4.000 netto komt een gezin met 2 kinderen €53 tekort). Gebruikte rapporten: tweeverdieners-drie-kinderen (verplicht) en alleenstaande-ouder-twee-kinderen. `omslagpunt()` verplaatst van SalarisBedragenTabel.tsx naar lib/salaris-vuistregel.ts (één berekening voor beide artikelen). Wederzijdse link met is-4000-euro-netto-goed-salaris-nederland. Commit volgt. | Zelfreview (geen losse subagents beschikbaar): FAQ "hoeveel moet je verdienen" toegevoegd na SEO-zelftoets (miste een echte PAA-vraag uit de SERP); CBS-percentage-naar-euro-conversie (25% x €4.000) verwijderd na bezwaar-zelftoets, want besteedbaar inkomen ≠ netto salaris in de vuistregel; "een paar tientjes" vervangen door het berekende verschil (€80); "ruim boven" afgezwakt naar "boven" voor de €5.700-case; bridging-alinea toegevoegd na ICP-zelftoets (Thomas/alleenstaande ouder voelde zich als bijzaak bij een gezin-only opening); drie hardgetypte "vijf huishoudens"-vermeldingen vervangen door `RAPPORTEN.length`. |
| 17 aug 2026 | Klus 5, "wat houd je over na je vaste lasten" | SERP zelf geverifieerd op google.nl: beide zoektermen ("hoeveel moet je overhouden na vaste lasten", "wat houden jullie over na je vaste lasten") matchen het document exact, Reddit r/geldzaken bovenaan ("Ik hou vooral stress over"), daaronder NN, ABN Amro, Knab, Vastelastenbond, Raisin, Nibud, Rabobank. Overlap-conclusie voor het bouwen: GEEN nieuw artikel. Beide zoektermen liggen inhoudelijk op drie bestaande paginas tegelijk (`50-30-20-regel-hoger-inkomen`, `hoeveel-geld-overhouden-einde-maand`, `vrij-besteedbaar-inkomen-berekenen`), en alle drie de in de opdracht genoemde bronpaginas linken al naar `50-30-20-regel-hoger-inkomen`, dus de bestaande linkstructuur wijst al naar de juiste plek. Dat artikel was bovendien alleen betoog zonder enige berekening, dus de uitbreiding versterkt het in plaats van het te dupliceren. Gebouwd: nieuw component `components/artikel/VijftigDertigTwintigVergelijker.tsx` (50/30/20 naast `berekenVuistregel()`, per huishouden instelbaar), 2 nieuwe FAQs, Raisin als bron voor de herkomst van de regel (Elizabeth Warren, "All Your Worth", boek uit 2005, niet op NL-huishoudens gebaseerd), `cta`-veld met situatieparameters (ontbrak volledig), sectie "de grens van deze vuistregel" met de n per post uit `lib/benchmarks.ts`. `datum` bijgewerkt naar 17-aug-2026. Commit `f298633`. | Zelfreview (geen losse subagents beschikbaar): het eerste doorgerekende voorbeeld (gezin, 2 kinderen, 5500 euro) bleek op 64% vaste lasten uit te komen, BOVEN de 50%-norm, niet eronder: dat sprak de bestaande stelling van het artikel ("bij een hoger inkomen klopt 50% niet meer") direct tegen zodra een lezer de rekenaar zelf zou gebruiken. Gecorrigeerd door een tweede voorbeeld toe te voegen (stel zonder kinderen, 9000 euro, 45%) en de kernstelling te herschrijven naar "een vast percentage voor elk huishouden klopt niet" in plaats van "50/30/20 is te hoog bij een hoger inkomen". Los daarvan gevonden: de 50/30/20-regel telt boodschappen als vaste last, maar `vaste-lasten-overzicht-maken` telt boodschappen expliciet niet mee, dus een expliciete disclaimer toegevoegd zodat de twee artikelen elkaar niet lijken tegen te spreken. Alle VDT/VDT2-bedragen geverifieerd met een losse node-berekening op dezelfde constanten als `lib/salaris-vuistregel.ts`. Geen nieuwe URL (bestaande pagina uitgebreid), Jarno kan wel handmatig herindexering aanvragen in Search Console voor `50-30-20-regel-hoger-inkomen` omdat titel, metaTitel en meta-description zijn gewijzigd. |
| 17 aug 2026 | Klus 6, €4.000 netto met twee kinderen | SERP zelf geverifieerd op google.nl voor "4000 euro netto gezin twee kinderen rondkomen": Waar blijft het staat op plek 5 met `is-4000-euro-netto-goed-salaris-nederland`, Google toont "Bevat niet: rondkomen" (klopt nog, ongewijzigd t.o.v. 17-aug-document). `niet-rondkomen-met-4000-euro-netto` (klus 4, zelfde dag gebouwd) staat nog nergens in de resultaten, te nieuw om te ranken, zoals verwacht. Rest van de SERP: Kids en Kurken, Reddit r/geldzaken, J/M Ouders, Babybytes-forumpost 2018, plus drie nieuwe niet-concurrerende resultaten (Leukegeit, Viva Forum, De Balie). Conclusie: GEEN nieuw artikel. De zoekintentie van "4000 euro netto gezin twee kinderen rondkomen" is vrijwel identiek aan wat `niet-rondkomen-met-4000-euro-netto` al beantwoordt: dat artikel opent al met een gezin-met-twee-kinderen als standaardcase in de rekenaar, heeft al een FAQ die bijna letterlijk deze zoekvraag stelt ("Waarom kom ik met €4.000 netto en twee kinderen net niet rond?") en gebruikt al hetzelfde omslagpunt en dezelfde rapporten die deze klus als bewijs had moeten inzetten. Een tweede artikel zou de eigen plek-5-positie kannibaliseren, precies wat werkregel en klus 6 zelf waarschuwen. Kleine aanscherping in plaats van een nieuwe pagina: `titel` (H1) en `metaTitel` van `niet-rondkomen-met-4000-euro-netto` in `lib/inzichten-data.ts` bevatten letterlijk "twee kinderen" nu, was voorheen alleen "per maand" resp. geen huishoudensvermelding. metaDescription en de eerste FAQ noemden "twee kinderen" al, dus geen wijziging nodig. Geen nieuwe rekenlogica, geen nieuwe FAQ's, geen nieuw component. Commit `<vul in>`. | Zelfreview (geen losse subagents nodig, want geen nieuwe claims of bedragen toegevoegd): alleen twee tekststrings gewijzigd, geen enkel getal aangeraakt, dus geen rekencontrole nodig. Gecontroleerd dat de oude titel/metaTitel-strings nergens anders in de code hardgetypt voorkwamen (`grep` op app/lib/docs, 1 treffer, de gewijzigde plek zelf). `npx tsc --noEmit --incremental false` schoon, geen null bytes. Geen nieuwe URL, dus geen GSC-indiening nodig; bestaande URL `niet-rondkomen-met-4000-euro-netto` was sowieso al dezelfde dag ingediend bij klus 4. |
| 17 aug 2026 | Klus 7, kasboek alleenstaande met goed salaris | SERP zelf geverifieerd op google.nl. Voor "alleenstaand 4000 netto waar blijft mijn geld" staat Waar blijft het bevestigd op plek 1, maar via `is-4000-euro-netto-goed-salaris-nederland` ("alleen ruim €600" in het snippet), niet via `alleen-wonen-goed-salaris-toch-krap`. Voor het eigen primaire zoekwoord van dat laatste artikel, "alleen wonen goed salaris toch krap", staat Waar blijft het op plek 2 (`alleen-wonen-goed-salaris-toch-krap`) EN plek 3 (`kosten-levensonderhoud-alleenstaande-2026`), direct onder een Reddit-draad, verder Telegraaf, ManMag, Facebook/De Correspondent, Knab Bieb en Dyme. Voor "huishoudboekje alleenstaande voorbeeld" bevestigd: geen concurrent doet het kasboek-format specifiek voor een alleenstaande met een goed salaris zonder kinderen, alleen sjablonen (Rabobank, Nibud, Wijzer in geldzaken) en kasboek-rubrieken over alleenstaande moeders (Porterenee, Lekker Leven Met Minder). Conclusie: GEEN nieuw artikel. Het bestaande artikel rankt al goed op zijn eigen zoekwoord en staat niet op de plek waar het geverifieerde "alleenstaand 4000 netto"-gat zit (dat is de 4.000-pagina, niet dit artikel), dus een nieuwe pagina zou de eigen plek-2-positie kannibaliseren zonder een nieuw zoekwoord te pakken. Gebouwd: `alleen-wonen-goed-salaris-toch-krap` (`lib/inzichten-data.ts` + content-component) uitgebreid met een link naar het echte geldrapport van de alleenstaande met €3.650 netto (`rapportVoorSlug("alleenstaand-huurwoning")`), zodat het kasboek-format zelf niet overgedaan wordt maar verwezen wordt naar waar het al staat (klus 1, `/rapporten`). Toegevoegd: `cta`-veld met `situatie=alleenstaand` (ontbrak volledig, viel terug op de generieke CTA), 5e FAQ die naar het echte rapport verwijst. Losstaand meegenomen als openstaande waarheidsschuld (sectie 11): het woord "structuurprobleem" verwijderd op de twee plekken in dit artikel (FAQ + lopende tekst), en de ongesourcete marktclaim "een gemiddeld huishouden geeft ruim 200 euro per maand aan abonnementen uit" (klopte niet met `VUISTREGEL.abonnementen` van 150 uit `lib/salaris-vuistregel.ts`, en had geen bron) vervangen door de echte cijfers uit het rapport. Commit volgt. | Zelfreview (geen Task/Agent-tool beschikbaar in deze uitvoering, expliciet als zodanig gemeld): SEO-toets vond geen kannibalisatierisico (andere metaTitel/H1 dan de 4.000-pagina, ongewijzigd; 5e FAQ is geen PAA-zoekwoord maar een vertrouwens-FAQ, consistent met bestaande FAQ 4 in hetzelfde artikel). ICP-toets (Niels, alleenstaand-zonder-kinderen-ICP, en Petra, de scannende SEO-bezoeker): geen bezwaren, het rapport-kaartje bouwt vertrouwen op ('een mens die ernaar keek', geen tool) en de CTA staat na de inhoud, niet erboven. Bezwaartoets vond en corrigeerde twee dingen vóór oplevering: (1) de nieuwe FAQ en het kaartje typten '250 euro' en '300 tot 400 euro' met de hand over, in plaats van die uit `rapportVoorSlug()` te lezen; vervangen door directe interpolatie van `.uitkomstKop` en `.vermoedenBedrag`; (2) het kaartje noemde 'abonnementen' als iets waarin de klant zich vergiste, maar haar eigen `vermoeden`- en `evaluatie`-velden noemen alleen bestellen, uitgaan en online aankopen, niet abonnementen: gecorrigeerd naar wat de data werkelijk zegt. Vierde verificatie: alle geciteerde velden (`kenmerken[0]`, `kenmerken[2]`, `kenmerken[4]`, `vermoeden`, `vermoedenBedrag`, `uitkomstKop`) teruggelezen tegen `lib/rapporten-data.ts`, kloppen. `npx tsc --noEmit --incremental false` schoon, geen null bytes. Geen nieuwe URL (bestaande pagina uitgebreid), dus geen GSC-indiening nodig; Jarno kan wel handmatig herindexering aanvragen omdat de FAQPage-schema-inhoud is gewijzigd. |
| 17 aug 2026 | Klus 8, is 6000 netto een goed salaris (geen bouw) | Niets gebouwd. Verse SERP check op google.nl voor de exacte zoekterm bevestigt de waarschuwing uit dit document: de intentie is boven de 6.000 euro gekanteld naar bruto en beroep, niet naar huishoudbudget. Top tien op 17 aug: NationaleBeroepengids ("Salaris van 6000 tot 7000, dit zijn de beroepen in 2026"), een AD interview uit 2021 met een bruto naar netto voorbeeld, Intro Personeel en Tempo Team met salarisindicaties per beroep, Search X Recruitment en Finom met bruto en netto omrekeningen, FNV met het gemiddeld bruto CBS salaris, plus een Reddit draad "wat verdien je netto en ben je gelukkig". Geen enkel resultaat gaat over huishoudbudget, rondkomen of gezinsuitgaven. Mensen zoeken ook naar bevestigt de kanteling nog sterker dan voorzien: alle acht suggesties zijn bruto (is 6500, 6000, 8000, 10000, 7500, 7000 bruto een goed salaris) of algemeen loonhandel (wat is een hoog salaris per maand, wat is een hoog salaris in Nederland). Nul huishoud of budgetgerelateerde suggesties. Tweede check: het bestaande artikel samen 6000 euro netto toch niets over (lib/inzichten-data.ts, slug samen-6000-euro-netto-toch-niets-over) dekt een andere vraag dan deze zoekterm, twee inkomens samen tegenover een single inkomen, dus ook los van de intentiekanteling zou een nieuw artikel hier de verkeerde koper aantrekken. Conclusie: geen artikel bouwen. Dat is hier het bedoelde resultaat van de klus, geen onvoltooid werk. | Geen toetsronde van toepassing, er is geen tekst geschreven om te toetsen. Zelfcontrole op de beslisregel: de conclusie steunt op de verse SERP en op het bestaande artikel, niet op een aanname, en er is geen bedrag, claim of bestand aangeraakt buiten dit logboek. |
| 17 aug 2026 | Klus 9, huishoudboekje voorbeeld | SERP zelf geverifieerd op google.nl voor beide zoektermen ("huishoudboekje voorbeeld", "huishoudboekje maken"): geen wijziging t.o.v. dit document, top tien op beide volledig sjabloon- en toolaanbieders (Rabobank, Nibud, Peaks, Wijzer in geldzaken, SeniorWeb, Budgetcoach.nl, MijnGeldzaken, Dyme, Pinterest, Mama's Meisje), Waar blijft het afwezig. PAA ("Meer om te vragen") bij "huishoudboekje maken": "Hoe maak je een huishoudboekje?", "Wat is het beste huishoudboekje?", "Is er een gratis huishoudboekje-app?", "Waar kan ik gratis een huishoudboekje downloaden?", allemaal uitvoeringsvragen, geen evaluatievraag. Overlap-conclusie vóóraf, beargumenteerd: NIEUW, kort artikel, GEEN uitbreiding van `moet-je-een-huishoudboekje-bijhouden`. Reden: verschillende zoekintentie. Dat bestaande artikel beantwoordt een ja/nee-vraag met "nee, gebruik structuur in plaats van registratie"; "huishoudboekje voorbeeld"/"maken" komt van iemand die al besloten heeft (of gaat) bijhouden en een sjabloon zoekt, precies wat de hele SERP ook aanbiedt. Een sjabloon toevoegen aan het bestaande artikel zou de "doe het niet"-boodschap van dat artikel tegenspreken. Vandaar een eigen pagina die het sjabloon niet ter discussie stelt en zelf naar het bestaande artikel doorverwijst voor wie zich afvraagt of blijvend bijhouden de moeite waard is. Gebouwd: nieuw artikel `huishoudboekje-voorbeeld` (`lib/inzichten-data.ts` vooraan toegevoegd, content-component `app/inzichten/[slug]/content/huishoudboekje-voorbeeld.tsx`, geregistreerd in `ArticleBody.tsx`). Kort (leestijd 4), zwakke CTA-druk: `cta`-veld zet de gratis analyse primair en de Geldscan secundair, omgekeerd van de meeste andere artikelen, bewust omdat de opdracht vroeg om geen zware CTA-druk bij dit instapartikel. Interactief element: `SalarisRekenaar` hergebruikt met eigen `kop`/`intro` (geen nieuw component, zoals de werkregel voorschrijft), waarvan het bestaande "wat blijft er bij jou werkelijk over?"-veld al precies de vergelijking is die een huishoudboekje niet geeft. FAQ 3 citeert `rapportVoorSlug("stel-zonder-kinderen")` (nieuwe constante `HB_STEL`) via `vermoedenBedrag`/`uitkomstKop`, als bewijs dat een eigen schatting zonder vergelijking misleidt. Drie externe bronnen (Rabobank, Nibud-stappenplan, Wijzer in geldzaken), alle drie zelf bezocht en op 17 aug bevestigd bereikbaar. Twee inkomende links toegevoegd in dezelfde deploy: vanuit `moet-je-een-huishoudboekje-bijhouden.tsx` en `budget-maken-dat-je-volhoudt.tsx`. | Zelfreview (geen Task/Agent-tool beschikbaar in deze uitvoering, expliciet als zodanig gemeld). SEO-toets: zoekintentie-match goed (antwoord binnen eerste scherm, sjabloonlinks meteen zichtbaar), geen kannibalisatierisico met `moet-je-een-huishoudboekje-bijhouden` (andere intentie, andere metaTitel/H1, wederzijdse link i.p.v. overlappende claim), FAQPage-schema aanwezig. Enige gemiste kans: de PAA-variant "kasboek maken op papier voorbeeld" niet apart beantwoord, bewust laten liggen voor een kort instapartikel. ICP-toets (Niels, wantrouwt generieke tools/apps die hij al geprobeerd heeft, en Petra, de scannende zoeker): Petra krijgt haar antwoord (sjabloon) direct in het eerste scherm, geen bezwaar. Bij Niels een reëel spanningspunt gevonden: de interactieve rekenaar kan in eerste oogopslag aanvoelen als "weer een tool", precies wat hij al wantrouwt; verzacht door de intro van de rekenaar expliciet te laten zeggen dat een huishoudboekje wel vertelt wát wegging maar niet of dat normaal is, en door de rapportcitaten en `/rapporten`-link (een mens die het doorrekende) er meteen op te laten volgen. Bewust niet aangepast: de primaire CTA blijft de gratis analyse, ook al zou Niels liever direct naar de Geldscan gaan, omdat de opdracht expliciet vroeg om de Geldscan hier als vervolgstap en niet als hoofddoel te positioneren. Bezwaartoets vond en corrigeerde twee dingen vóór oplevering: (1) een illustratief "€380 aan boodschappen"-voorbeeld stond met de hand getypt in de tekst, puur als hypothetisch getal maar in strijd met werkregel 2 (nooit een bedrag met de hand typen, ook niet als tussenzin); verwijderd. (2) de meegenomen claim uit dit document zelf, "Wijzer in geldzaken met een overzicht van dertig huishoudboekjes", bleek bij eigen verificatie op de live pagina niet te kloppen: de pagina meldt zelf "Er zijn 38 huishoudboekjes beschikbaar" (17 aug 2026), dus "dertig" vervangen door het zelf geverifieerde "38", met datum in de bronvermelding. Vierde verificatie: alle genoemde velden (`RAPPORTEN.length`, `AANTAL_ZONDER_LEK`, `HB_STEL.vermoedenBedrag`, `HB_STEL.uitkomstKop`) teruggelezen tegen `lib/rapporten-data.ts`, kloppen; geen enkel ander getal in de nieuwe content staat los van een import of een live geverifieerde bron. `npx tsc --noEmit --incremental false` schoon (twee keer gedraaid, ook na de laatste correcties), geen null bytes in de vijf gewijzigde/nieuwe bestanden. Nieuwe URL `huishoudboekje-voorbeeld`, Jarno moet die handmatig indienen in Search Console. |
