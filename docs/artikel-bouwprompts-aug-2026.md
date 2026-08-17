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
