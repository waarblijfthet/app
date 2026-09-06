# Bouwvolgorde, waar blijft het

Levend document, bijgewerkt na elke sessie. Basis: `docs/plan-seo-conversie-100-geldscans-05-sep-2026.md` en `docs/gsc-nulmeting-05-sep-2026.md`.

## BEGIN HIER

Laatst bijgewerkt: 6 september 2026, na drie sessies op die dag. **Alles is gecommit en gepusht tot en met `671e652`.** Werk op de mount is dus schoon; begin met `git log --oneline -3` om te zien of dat nog klopt.

**Stand van zaken.** Fase 0 af. Fase 1 punt 1 en 3 staan live, dus contentbouw mag lopen. Fase 2 CTR-ronde 1 uitgevoerd. Z4 gepubliceerd. De pijler van cluster P verlegd en herschreven. H1 staat er, de eerste van de vijf hubs, met vier inkomende links. De IndexNow-indiening werkt weer na bijna drie maanden stilstand.

### Eerst dit, elke sessie, kost vijf minuten

1. **Draaide de IndexNow-cron?** Open het indexeringstabblad. Bovenaan hoort een verse regel te staan bij "Laatste indiening bij IndexNow". Staat daar iets van gisteren of eergisteren, dan is het goed. Staat er niets nieuws, dan pakt Vercel de cron van 06:30 niet op en moet Jarno in het Vercel-dashboard kijken of het plan meer dan drie cronjobs toestaat. Zie sectie 11 voor de achtergrond.
2. **Wat zegt de vrijdagmeting?** Eén regel, tien minuten, handmatig, zoals CLAUDE.md sectie 9 hem beschrijft. Zonder dat cijfer weet je niet of de sessie ergens over gaat.

### Wat de eerstvolgende actie is, hangt af van de datum

**Tot en met 12 september: geen nieuwe pagina bouwen.** Op 6 september zijn er drie pagina's nieuw of herschreven (Z4, de pijler, H1). De tempo-regel uit CLAUDE.md sectie 1 is twee per week, nooit meer, en dat is geen richtlijn maar de regel die voorkomt dat er halve pagina's live gaan. Deze week is dus vol. Doe in die periode onderhoud, dat valt er expliciet buiten:

- **De CTR-titels tegen hun antwoordblok** (halve sessie, hoogste prioriteit van de drie). Bij de vijf URL's uit sectie 1 hieronder moet de eerste alinea hetzelfde getal noemen als de nieuwe metaTitel. Dat is bij geen van de vijf gecontroleerd. Doe je het niet, dan meet je op 4 oktober een titel die iets belooft wat de pagina niet meteen waarmaakt, en weet je niet wat je gemeten hebt. Zet bij elke pagina die je aanraakt `gewijzigd: "<vandaag>"`, zie sectie 11.
- **De modaal-FAQ in is-4000.** Het cijfer waar sectie 2 op wachtte is er nu: CPB cMEV 2027 geeft bruto modaal €48.000 voor 2026 en €50.000 voor 2027, geverifieerd op https://www.cpb.nl/raming/concept-macro-economische-verkenning-cmev-2027 op 6 september 2026. Neem in dezelfde deploy de ontbrekende FAQ's voor €4.100 en €4.600 mee (sectie 6). Een FAQ toevoegen is onderhoud, geen herschrijving.
- **Em dashes en "structuurprobleem"** opruimen op elke pagina die je toch aanraakt, zoals CLAUDE.md sectie 11 voorschrijft.

**Vanaf 13 september: eerst het lek, dan pas de tweede hub.**

- **13 september, en dit gaat vóór alles: de schermlijst lezen** in het funneltabblad, blok "Waar de analyse afhaakt, per scherm". Zeven dagen na de migratie van 6 september. Kies het scherm bovenaan, doe daar één wijziging, meet een week. Niet twee wijzigingen tegelijk, want dan weet je niet welke het deed. Hier hangt de killgrens van 19 september aan: is de afronding dan nog nul procent, dan stopt alle contentbouw.
- **Daarna H2**, de hub voor het stel zonder kinderen. Zelfde volgorde als bij H1: eerst SERP-verificatie in Chrome op google.nl voor de H2-termen uit plan sectie 4, uitkomsten als extra sectie in `docs/serp-hubs-06-sep-2026.md` (niet in een nieuw bestand), dan bouwen met het volledige pakket uit CLAUDE.md sectie 8, dan de inkomende links in dezelfde deploy. Het rapport voor H2 is `stel-zonder-kinderen`, het huishouden waar geen lek was, en dat is meteen de sterkste hoek die die hub heeft.
- **Lees vóór H2 sectie 10 hieronder.** Daar staat waarom H1 niet op de sterkste zoekterm is gebouwd. Diezelfde toets hoort bij elke hub: welke bestaande pagina bezet deze intentie al, en kan de hub de scheiding uitleggen in één zin? Kan dat niet, dan is het geen aparte pagina.

### Wat er op een datum wacht

| Wanneer | Wat |
|---|---|
| 13 september | Schermlijst lezen in het funneltabblad, één wijziging op het scherm bovenaan. |
| 16 september | De vier geraamde constanten in `lib/kindgebonden-budget.ts` vervangen door de definitieve Prinsjesdagcijfers. Alleen dat bestand; tabel en rekenaar volgen vanzelf. Zet `gewijzigd` op die dag. |
| 19 september | Killgrens: is de analyse-afronding nog nul procent, dan stopt alle contentbouw tot het lek gevonden is. |
| 4 oktober | CTR-ronde 1 meten, de vijf URL's uit sectie 1. Meteen ook: houdt is-4000 de modaalvertoningen vast, pakt `waarom-hou-ik-nooit-geld-over` de 15 vertoningen van de 301 op, en wat doet H1 na vier weken. Plus de beslissing over `wat-zijn-normale-vaste-lasten-gezin`, zie hieronder. |
| 1 november | Killgrens uit plan sectie 9: onder 3.000 sessies per maand of onder 5 betaalde Geldscans gaan clusters L en B in de wacht. |
| 12 november | Z1 zorgpremie 2027 bouwen, als de premies bekend zijn. |
| 8 december | 2027-sweep over 25 metaTitels. Zet bij elke pagina `gewijzigd`, anders merkt de sitemap er niets van. |

### Openstaande beslissingen voor Jarno

1. **`wat-zijn-normale-vaste-lasten-gezin`**: nul vertoningen in 90 dagen en het zit in het taalgebied van H1. Kandidaat voor samenvoegen of een 301 naar H1 bij de CTR-ronde van 4 oktober. Nu niet gedaan, want een 301 op de dag dat de hub live gaat maakt de meting onleesbaar.
2. **Nibud-cijfers.** Nibud blokkeert automatisch opvragen, dus H1 citeert geen enkel Nibud-bedrag. Wil je de vergelijking met de Nibud-voorbeeldbedragen op de hub, lever dan bedrag en ophaaldatum aan, dan komt het er met bron bij.

### Openstaand aan Jarno's kant

1. Bing Webmaster Tools aanzetten en de sitemap indienen. Nu extra de moeite waard: IndexNow dient weer in bij Bing en zonder Webmaster Tools zie je niet wat dat oplevert.
2. De URL's van Z4 en H1 handmatig indienen in GSC, als dat nog niet gebeurd is: `/inzichten/kindgebonden-budget-2027-inkomensgrens` en `/inzichten/wat-geeft-een-gezin-uit-per-maand`.
3. `_to_delete/` een keer legen. Daar staan lege git-locks in die ik niet kan verwijderen, plus twee oude build-tars.

### Bekende schuld

- De anon-rol mag `quiz_voortgang` nog lezen omdat het funneltabblad met de browserclient leest. Eerst die lezing naar een server-route, dan pas select intrekken. Staat als waarschuwing in `supabase/quiz_voortgang_v3.sql`.
- De zin "ik verwijder je afschriften en aangeleverde gegevens" klopt alleen zolang Jarno dat met de hand doet. Er verwijdert niets softwarematig.
- De vier casestudy-pagina's met bedachte namen moeten gecontroleerd op hun illustratielabel in tekst, titel en schema.

### Werkregels die deze week zijn bijgekomen

- **Zet `gewijzigd: "<vandaag>"` op elk artikel dat je inhoudelijk aanraakt**, ook als het alleen de metaTitel is. `datum` blijft de publicatiedatum. Zonder dat veld merken de sitemap, `dateModified` en de herindiening bij IndexNow niets van je wijziging. Zie sectie 11.
- **Open elke bronlink zelf in Chrome voordat je hem commit.** Op 6 september bleek een dezelfde dag gepubliceerde CPB-bron een 404 te geven. Een URL die plausibel lijkt is geen gecontroleerde bron.
- **Draai een echte productiebuild voordat Jarno pusht**, niet alleen `tsc`. Dat kan niet op de mount; de route staat in de projectmemory onder `feedback_minifier_verkorte_objectnotatie`. Die build ving deze week twee fouten die `tsc` niet zag.

**Alles daaronder is het logboek, oudste sectie eerst. Lees dat alleen als je wilt weten waarom iets zo besloten is.**

**Werkwijze voor dit bestand:** het houdt zijn naam, `docs/bouwvolgorde.md`. Werk na elke sessie het blok BEGIN HIER bij (stand, eerstvolgende actie, datumtabel) en zet je logboeksectie eronder aan het eind met de datum in de kop. Maak geen nieuw bestand met een datum in de naam: dan weet een volgende sessie niet meer welk bestand geldt.

---

## 1. CTR-ronde 1, uitgevoerd 6 september 2026

Fase 2 punt 2. Alleen de vijf URL's met meer dan 100 vertoningen, minder dan 2 procent CTR en gemiddelde positie 10 of beter, plus het boodschappenartikel op 11,58 vanwege zijn omvang. De elf URL's uit lijst A2 en A3 van de nulmeting krijgen geen nieuwe titel: op positie 24 tot 86 ziet niemand hem staan.

**Meetdatum: 4 oktober 2026.** Dan opnieuw dezelfde vijf URL's in GSC, laatste 28 dagen, en de nieuwe CTR naast de oude in de tabel hieronder zetten.

| URL | Vertoningen | CTR 5 sep | Positie | Oude metaTitel | Nieuwe metaTitel | CTR 4 okt |
|---|---:|---:|---:|---|---|---|
| `wat-is-normaal-bedrag-boodschappen-per-maand` | 10932 | 1,59% | 11,58 | Normale boodschappenkosten per maand 2026 (per huishouden) | €300 tot €1.400 boodschappen per maand: normaal in 2026? | |
| `netto-loonsverhoging-berekenen` | 2844 | 0,88% | 8,96 | Netto overhouden van loonsverhoging berekenen (2026) | 3% loonsverhoging: hoeveel houd je er netto van over? (2026) | |
| `kosten-levensonderhoud-alleenstaande-2026` | 2445 | 1,84% | 9,74 | Kosten levensonderhoud alleenstaande 2026: overzicht | €2.000 tot €2.400: kosten levensonderhoud alleenstaande 2026 | |
| `nibud-boodschappen-versus-werkelijkheid` | 1388 | 0,79% | 8,51 | Nibud boodschappenbudget 2026: norm versus werkelijkheid | €627 Nibud boodschappengeld gezin: haalbaar in 2026? | |
| `vrij-besteedbaar-inkomen-berekenen` | 128 | 0,78% | 8,45 | Vrij besteedbaar inkomen berekenen (rekenhulp 2026) | Vrij besteedbaar inkomen berekenen: wat blijft er over? 2026 | |

Waarom deze vorm. Vier van de vijf beginnen nu met een bedrag dat al op de pagina zelf staat en daar een bron heeft, want de zoeker wil het getal en niet het onderwerp. Alle vijf blijven onder de 60 tekens, geen em dash, jaartal erin. De vijfde, vrij besteedbaar inkomen, heeft geen enkel getal dat voor elk huishouden klopt, dus daar is het een vraag geworden zonder bedrag.

Herkomst van de bedragen, alle vier al gepubliceerd en met bron op de pagina zelf:

- €300 tot €1.400: de bandbreedte in de tabel van het boodschappenartikel, van alleenstaand tot een gezin met oudere kinderen.
- 3 procent: de zoekterm "hoeveel is 3 procent loonsverhoging netto" in GSC, en het percentage dat het artikel als voorbeeld doorrekent.
- €2.000 tot €2.400: de vaste lasten voor een alleenstaande in 2026 uit de eerste alinea van dat artikel.
- €627: het Nibud-minimum voor een gezin van vier, zoals het artikel het al citeert.

Nog te doen bij deze vijf, niet in deze ronde: het antwoordblok bovenaan controleren tegen de nieuwe titel, zodat titel en eerste alinea hetzelfde getal noemen.

## 2. Cluster P en modaal, uitgevoerd 6 september 2026

Jarno akkoord op beide op 6 september. Twee 301's in `next.config.mjs`, met een toelichtende regel erboven zodat over een half jaar duidelijk is waarom ze er staan.

**Cluster P: de pijler is nu `samen-6000-euro-netto-toch-niets-over`.** Dat is de enige van de zes die presteert: 7,34 procent CTR op positie 4,43. `goed-salaris-toch-krap`, die het plan aanwees, heeft nul vertoningen in 90 dagen.

| URL | Klikken | Vertoningen | CTR | Positie | Gedaan |
|---|---:|---:|---:|---:|---|
| `samen-6000-euro-netto-toch-niets-over` | 8 | 109 | 7,34% | 4,43 | pijler; herschrijving naar het gezinsbudget-format staat nog open |
| `waarom-hou-ik-nooit-geld-over` | 4 | 188 | 2,13% | 22,31 | blijft, is nu het doel van de 301 |
| `goed-salaris-toch-geldstress` | 3 | 49 | 6,12% | 15,69 | blijft, geen 301 |
| `tweeverdieners-toch-krap` | 2 | 58 | 3,45% | 14,07 | blijft, richt op twee inkomens, linkt naar H1 |
| `waar-blijft-mijn-geld-einde-maand` | 0 | 15 | 0% | 57,47 | 301 naar `waarom-hou-ik-nooit-geld-over` |
| `goed-salaris-toch-krap` | 0 | 0 | | | blijft staan, bestemming pas beslissen bij de pijlerherschrijving |

Het doel van die 301 is niet de pijler geworden maar `waarom-hou-ik-nooit-geld-over`, en dat is bewust. De vraag "waar blijft mijn geld aan het einde van de maand" is huishoudneutraal, terwijl de pijler een gezin met 6.000 netto beschrijft. Een 301 naar de pijler zou een generieke vraag op een specifiek huishouden laten landen. `waarom-hou-ik-nooit-geld-over` staat op dezelfde vraag, heeft 188 vertoningen en is dus de juiste bestemming.

**Modaal: `modaal-inkomen-2026` is 301'd naar is-4000.** Nul vertoningen in 90 dagen terwijl is-4000 (215) en is-5000 (120) de modaaltermen op positie 2,2 bezetten.

Meegegaan in dezelfde deploy, want een interne link naar een redirect is verspilde linkwaarde:

- 4 interne links naar `waar-blijft-mijn-geld-einde-maand` wijzen nu naar `waarom-hou-ik-nooit-geld-over`: in `alleen-wonen-goed-salaris-toch-krap`, `goed-salaris-toch-krap`, `lifestyle-inflatie-meer-verdienen-meer-uitgeven` en `moet-je-een-huishoudboekje-bijhouden`.
- 2 interne links naar `modaal-inkomen-2026` wijzen nu naar is-4000: in `bruto-naar-netto-loonstrook-uitleg` en `hoeveel-geld-overhouden-einde-maand`.
- Beide artikelen zijn uit `lib/inzichten-data.ts` en uit de componentmap in `ArticleBody.tsx` gehaald, en hun contentbestanden zijn verwijderd. Van 90 naar 88 artikelen. Sitemap en llms.txt worden bij de build opnieuw gegenereerd.

**Nog niet gedaan: het modaalantwoord als FAQ in is-4000.** De oude modaalpagina noemde €48.000 bruto per jaar en €2.700 tot €3.100 netto per maand zonder één bronvermelding. Die getallen verhuizen niet ongecontroleerd naar de sterkste pagina van de site. Die FAQ komt er zodra het modaalcijfer voor 2026 met een CPB- of CBS-bron en ophaaldatum vaststaat, en dat kan meteen 2027 worden na Prinsjesdag.

**Twee dingen om over vier weken te controleren in GSC**, samen met de CTR-ronde op 4 oktober: of is-4000 de modaalvertoningen vasthoudt of dat ze wegvallen, en of `waarom-hou-ik-nooit-geld-over` iets van de 15 vertoningen overneemt.

## 3. Besluiten uit de nulmeting die de volgorde veranderen

| Onderwerp | Plan van 5 sep | Na de meting | Bespaart |
|---|---|---|---|
| S1 is-3500 | eigen pagina, prio B | vervalt, gaat met S2 in één FAQ-blok in is-4000 | 1 sessie |
| Z8 vakantiegeld | cijferrefresh in januari | vervalt, de pagina staat op positie 86 | 1 sessie |
| B2 vaste lasten | upgrade van `50-30-20-regel-hoger-inkomen` (84 vertoningen, positie 68,9) | herschrijf `vaste-lasten-overzicht-maken` (489 vertoningen op de term, positie 53,6) | betere kandidaat |
| modaal | staat niet in het plan | 301 naar is-4000, uitgevoerd 6 sep | een pagina minder |
| CTR-ronde | elke URL boven 100 vertoningen onder 2 procent | alleen die met positie 10 of beter, dat zijn er 5 van de 16 | 11 URL's minder werk per ronde |
| 2027-sweep | 17 metaTitels | 25 metaTitels | meer werk, plan erop |

## 4. Cluster Z na SERP-verificatie, 6 september 2026

Volledig in `docs/serp-cluster-z-06-sep-2026.md`. Chrome op google.nl, vijf termen geverifieerd, gescoord op de schaal uit `docs/serp-brainstorm-18-aug-2026.md`. Geen van de vijf had een AI-overzicht en op geen van de vijf staat een eigen URL.

| # | Zoekterm | Score | Plan | Na SERP | Publiceren |
|---|---|---:|---|---|---|
| Z4 | kindgebonden budget 2027 inkomensgrens | 30,5 | A | A, eerst | kan nu, mits de €60.000-grens naar prijspeil 2027 vaststaat |
| Z1 | zorgpremie 2027 | 26,5 | A | A | als raming, herzien 16 sep en na 12 nov |
| Z3 | kinderopvangtoeslag 2027 | 26 | A | A | zodra de maximum uurtarieven 2027 bekend zijn |
| Z2 | koopkracht 2027 | 21 | A | B | niet als eerste, en niet op deze term |
| Z2b | wat houd ik over in 2027 | 8 | niet in plan | vervalt | nooit, de SERP is zonnepanelen |

**Z4 wordt de eerste Z-pagina.** Het kabinet verlaagt vanaf 1 januari 2027 het kindgebonden budget voor huishoudens boven €60.000 door het afbouwpercentage te verhogen (Rijksoverheid, Tweede Kamer, wetgevingskalender). Dat raakt de ICP gericht en niemand anders. De hele SERP is instituut: Rijksoverheid legt de maatregel uit, de Belastingdienst de rekenregel, het wetsvoorstel de wetstekst. Niemand rekent het voor een huishouden uit.

**Z2 zakt.** De PAA bij "koopkracht 2027" is macro-economisch (crisis, vooruitzichten) en de SERP is nieuws tot en met NOS, BNR en TikTok. Dat is een andere zoeker dan die de analyse invult. De CPB-cijfers blijven bruikbaar als alinea met bron in Z4 en Z1: koopkracht +0,6% in 2026, min 0,3% in 2027, inflatie circa 3%, cao-loongroei 4,2%.

**Twee feitelijke waarschuwingen.**

Het plan noemt bij Z1 "eigen risico 165". Dat komt in de SERP nergens voor. Menzis noemt €385 voor 2027, het wetsvoorstel spreekt van €60 verhoging, de PAA vraagt naar €520, en Welingelichte Kringen kopt dat de verhoging een jaar is uitgesteld. Dit cijfer is op 6 september niet vast te stellen en gaat niet in een publicatie tot dat wel kan. De premies zijn 12 november bekend (CZ).

Bij Z3: de afschaffing van de kinderopvangtoeslag en directe financiering aan de opvang gaat om **2029**, niet 2027. In 2027 gaat alleen het vergoedingspercentage naar 96 procent voor het eerste kind, ook voor ouders die daar nu geen recht op hebben. Wie die twee door elkaar haalt schrijft een fout artikel.

## 5. Z4 gepubliceerd, 6 september 2026

`/inzichten/kindgebonden-budget-2027-inkomensgrens`. Eerste pagina van cluster Z, negen dagen vóór Prinsjesdag.

metaTitel: "2027: vanaf welk inkomen daalt je kindgebonden budget?" (53 tekens).

**Wat de pagina zegt, doorgerekend en niet getypt.** Alle bedragen komen uit `lib/kindgebonden-budget.ts`, dat de tabel én de rekenaar voedt zodat ze niet uit elkaar kunnen lopen. Voor een stel met twee kinderen onder de 12:

| Gezamenlijk inkomen | KGB 2026 p/m | KGB 2027 p/m | Wat de maatregel kost p/m |
|---|---:|---:|---:|
| €65.000 | €266 | €277 | niets |
| €75.000 | €203 | €176 | €34 |
| €85.000 | €140 | €73 | €70 |
| €90.000 | €108 | €22 | €88 |

Het nulpunt schuift van ongeveer €106.300 naar €92.100, dus ruim €14.000 eerder.

**Wat vaststaat en wat een raming is.** Vast, uit het wetsvoorstel: het tweede afbouwpunt bij €60.000 prijspeil 2024, en het afbouwpercentage van 12,35 procent in 2027 en 12,80 procent in 2028, een verhoging van 4,30 procentpunt. Daaruit volgt het basispercentage van 8,05 procent. Geraamd: de indexatie van de grens naar circa €65.560 in 2027 en de maximumbedragen, allebei de 2026-bedragen plus 3 procent per jaar in lijn met de CPB-inflatieraming. De raming staat als één regel onder de kop en als vermelding onder de tabel, niet als disclaimer door de hele tekst.

**Verplicht pakket afgevinkt:** antwoord met bedragen in de eerste alinea, tabel per inkomen, rekenaar met huishouden, kinderen en inkomen, vijf FAQ's, vier bronnen met ophaaldatum, analyse-CTA met situatieparameter na het eigen getal, Geldscan als enkele tekstlink in het slotblok, zichtbare regel "Cijfers bijgewerkt op 6 september 2026", twee inkomende links in dezelfde deploy vanuit is-4000 en `samen-te-veel-verdiend-toeslag-kwijt`.

**Na de push, twee dingen voor jou.** URL handmatig indienen in GSC. En op 16 september, of zodra de Prinsjesdagcijfers er zijn, de vier geraamde constanten in `lib/kindgebonden-budget.ts` vervangen. Alleen dat bestand, de tabel en de rekenaar volgen vanzelf.

## 6. S1 en S2 bleken al gebouwd

Voordat ik aan het FAQ-blok begon heb ik gekeken wat er al stond. `components/artikel/SalarisBedragenTabel.tsx` heeft `BEDRAGEN = [3500, 3750, 4000, 4100, 4200, 4300, 4500, 4600]` en `VARIANTEN` met een eigen kop per bedrag, allemaal gevoed uit `berekenVuistregel()` en `omslagpunt()`. En `lib/inzichten-data.ts` heeft voor is-4000 al negen FAQ's, waaronder er een over €4.500, een over €3.500 en een die €4.000, €4.200 en €4.300 vergelijkt.

Elk bedrag met vertoningen in GSC is dus gedekt: 4.500 (80), 4.200 (50), 4.300 (36), 4.100 (11), 4.600 (3) en 3.500 (17). S1 en S2 vervallen daarmee als aparte klus. Er staat zelfs al een FAQ over Jan Modaal op is-4000, wat betekent dat de 301 van de modaalpagina landt op een pagina die de vraag al beantwoordt.

Wat resteert is klein en niet urgent: 4.100 en 4.600 hebben geen eigen FAQ, samen 14 vertoningen. Dat is te weinig om een sessie aan te geven. Meelifen op de eerstvolgende deploy die is-4000 toch aanraakt.

## 7. Fase 1 punt 1 gebouwd, 6 september 2026

De aanleiding was een defect dat ik pas zag bij het bouwen: **de analyse gebruikte een andere sessie-id dan de rest van de site.** `PageTracker` en `lib/track.ts` lazen allebei `wb_sessie` uit sessionStorage, maar `QuizClient` maakte zijn eigen UUID. Daardoor stonden paginabezoeken, CTA-kliks en analysevoortgang in drie tabellen met twee verschillende id's, en was de trechter niet aan elkaar te rekenen. Precies de vraag uit plan sectie 6 punt 1, hoeveel van de bezoekers op /analyse ook echt begonnen, afrondden en daarna op de Geldscan klikten, was daarmee onbeantwoordbaar. Dat verklaart ook waarom het funneltabblad zelf zegt dat de stap-percentages indicatief zijn en niet sessie-gekoppeld.

Wat er nu staat:

1. **`lib/sessie.ts`** is de enige plek waar `wb_sessie`, het apparaat en de eigenaarscookie vandaan komen. `PageTracker`, `lib/track.ts` en `QuizClient` gebruiken hem alle drie. Bijeffect: de analyse classificeerde mobiel op een breedte onder 1024 en de rest op onder 768. Dat is nu overal 768, dus de apparaatcijfers van vóór en ná vandaag zijn niet één op één vergelijkbaar.
2. **Meten per scherm.** `logVoortgang()` krijgt het scherm-id en de positie mee en schrijft bij elke schermwissel in plaats van bij elke categoriewissel. Hooguit 29 upserts per sessie in plaats van 6.
3. **Server-route `POST /api/analyse-voortgang`** met `createServiceClient()` en een witte lijst met velden, aangeroepen met `keepalive` zodat een laatste schrijfactie ook vertrekt als de bezoeker meteen wegklikt. De browser schrijft niet meer rechtstreeks in `quiz_voortgang`.
4. **Migratie `supabase/quiz_voortgang_v3.sql`**: kolommen `huidig_scherm`, `max_scherm_index` en `toestemming_data_asset`, en de anon-policies voor insert en update ingetrokken.
5. **Funneltabblad** heeft een blok "Waar de analyse afhaakt, per scherm": het laatste scherm van elke niet-voltooide sessie, aflopend gesorteerd. Dat is de lijst waarop de eerste wijziging gekozen wordt.

**Nog open, bewust.** De anon-rol mag `quiz_voortgang` nog steeds lezen, want het funneltabblad leest met de browserclient. Select dichtzetten breekt het dashboard. De juiste volgorde is die lezing eerst naar een server-route verplaatsen, zoals `app/api/admin/vandaag` al doet, en daarna pas select intrekken. Tot dan is de tabel leesbaar met de anon-sleutel uit de bundle. Er staat geen naam of e-mailadres in, wel huishoudbedragen. Dat staat als waarschuwing in de migratie zelf.

**Wat jij moet doen na de push:** `supabase/quiz_voortgang_v3.sql` draaien in de Supabase SQL-editor, in dezelfde deploy als de code. Doe je dat niet, dan faalt elke schrijfactie stil op de ontbrekende kolommen en zie je vanaf dat moment geen voortgang meer.

**Wat er daarna gebeurt.** Vanaf de eerste sessie na de migratie zie je per scherm waar het ophoudt. Zeven dagen data, dan één wijziging op het scherm bovenaan, een week meten, dan het volgende. De hypothesevolgorde uit het plan (inkomensvraag zonder uitleg, e-mail vóór resultaat, te veel velden op mobiel) is vanaf dat moment niet meer nodig als gok.

## 8. Fase 1 punt 3 gebouwd, 6 september 2026

Het resultaatscherm, `app/analyse/stappen/resultaat/Resultaat4Aanbod.tsx`. Hiermee is het laatste blokkerende item vóór contentbouw uit plan sectie 6 klaar.

Drie wijzigingen:

1. **De prijs staat nu in de knop.** Hij stond als los bedrag boven de knop, dus wie alleen de knop las klikte zonder te weten wat het kost. De knop is nu "Laat mij uitzoeken wat hierachter zit, €49".
2. **De bewijsregel staat er,** met `RAPPORTEN.length` en `AANTAL_ZONDER_LEK` uit `lib/rapporten-data.ts`. Vandaag is dat vijf rapporten waarvan twee zonder lek. Nooit met de hand een aantal neerzetten: dit telt de echte rapporten en gaat vanzelf mee als er een zesde bij komt.
3. **De toestemmingsvraag voor de data-asset** staat eronder, als één opt-in-zin in een eigen component, opgeslagen via `/api/analyse-voortgang` in de kolom `toestemming_data_asset`. Lege checkbox, geen vooraf aangevinkt vakje. Daarmee is de kolom die gisteren met de migratie meekwam ook echt gevuld; die stond tot vandaag leeg.

De volgorde op het scherm is nu zoals plan sectie 6 punt 3 hem voorschrijft: eerst de vergelijking in uitkomst 1 tot 3, dan de knop met de prijs, dan de bewijsregel, dan de toestemmingsvraag, en de e-mail blijft secundair als tekstlink die pas na een bewuste klik opengaat.

**Wat dit betekent voor het plan.** Fase 1 punt 1 en punt 3 staan allebei live. De regel "contentbouw begint pas als punt 1 en 3 live staan" is daarmee vervuld, dus vanaf nu mag de bouwvolgorde weer lopen. De killgrens blijft staan: is de afronding op 19 september nog nul procent, dan stopt alles tot het lek gevonden is.

**Wat er nog niet is uit fase 1:** de opvolgmail op dag 0, 3 en 8 (punt 4) en Bing Webmaster Tools plus de schema-audit (punt 5). Punt 4 heeft pas zin als er afgeronde analyses met e-mailadres zijn, dus dat wacht op de eerste week data. Punt 5 kan los en kost een half uur, grotendeels aan jouw kant.

## 9. Pijler cluster P herschreven, 6 september 2026

`samen-6000-euro-netto-toch-niets-over` is nu de pijler van cluster P en tegelijk de brug naar de hub voor tweeverdieners.

**Wat ik bewust niet heb aangeraakt: de metaTitel.** Deze pagina doet 7,34 procent CTR op positie 4,43. De CTR-regel uit CLAUDE.md 8.22 geldt voor URL's onder 2 procent, en dit is de best presterende pagina van de zes uit cluster P. Een pagina die werkt herschrijf je niet omdat het plan het woord pijler gebruikt.

**Wat er wel bij is gekomen:**

1. **De begrotingstabel per post**, via `components/artikel/GezinsbudgetTabel.tsx`. Twee echte huishoudens naast elkaar, 19 posten verdeeld over wat er binnenkomt, de vaste lasten en het dagelijkse plus jaarlijkse. Alle bedragen komen uit `rapportVoorSlug()`, letterlijk zoals de huishoudens ze aanleverden. Dit is het gezinsbudget-format uit `docs/serp-inkomensbedragen-17-aug-2026.md` kans 7, en het is de vorm die volgens dat onderzoek in deze SERP wint.
2. **Geen derde kolom met een gemiddelde.** Dat is de waarheidsregel, en het zou hier ook onzin geven: het ene huishouden heeft drie kinderen en twee auto's, het andere geen kinderen en alleen ov. Dat verschil is juist waarvoor de lezer komt. Waar een post bij de ander niet bestaat staat "niet van toepassing".
3. **De Geldscan als tekstlink in het slotblok.** Die ontbrak volledig op deze pagina, terwijl CLAUDE.md 8.13 hem voorschrijft en dit de best converterende pagina van het cluster is.

**Wat nog open staat voor deze pijler:** de hub voor tweeverdieners met kinderen (H1) bestaat nog niet, dus de link daarheen kan pas als die hub er is. Zodra H1 er staat, linkt deze pagina erheen en H1 terug.

## 10. H1 gebouwd, 6 september 2026

`/inzichten/wat-geeft-een-gezin-uit-per-maand`. De eerste van de vijf hubs, voor tweeverdieners met kinderen. SERP-verificatie volledig in `docs/serp-hubs-06-sep-2026.md`.

**De hub gaat niet op de term die het plan aanwees, en dat is de belangrijkste beslissing van deze sessie.** Vijf termen geverifieerd in Chrome op google.nl. De hoogst scorende, "gezinsbudget 6000 netto" (29 van de 35), is precies de term van `samen-6000-euro-netto-toch-niets-over`: positie 4,43, CTR 7,34 procent, gisteren nog tot pijler gemaakt. Een hub daarop zou de best converterende pagina van de site beconcurreren. De hub gaat daarom op "wat geeft een gezin uit per maand" (22,5), de enige van de vijf waar het onderwerp de volledige begroting is en niet één post of één bedrag.

De intentiescheiding is nu: het boodschappenartikel pakt één post, de pijler pakt één bedrag met één verhaal, de hub pakt het hele huishouden per post op elk inkomen.

**Wat er op geen van de vijf SERP's stond.** Op "wat geeft een gezin uit per maand" en "uitgaven gezin 2 kinderen per maand" geven alle negen resultaten een gemiddelde of een norm, met Nibud twee keer op pagina 1. Op "gezinsbudget 6000 netto" staat geen enkele institutionele bron: daar wint het huishoudboekje van één echt gezin, Kids en Kurken bezet er vier van de negen plekken. Wat nergens staat is een begroting per post die je op je eigen inkomen kunt zetten, met per bedrag de herkomst en n erbij. Dat is de hoek geworden.

**De pagina, doorgerekend en niet getypt.** Elk bedrag komt uit `berekenVuistregel()` of uit `rapportVoorSlug()`. Voor twee volwassenen, twee kinderen en één auto:

| | €4.000 | €5.000 | €6.000 | €6.500 |
|---|---:|---:|---:|---:|
| Totaal uitgaven | €4.053 | €4.403 | €4.753 | €4.928 |
| Wat er overblijft | -€53 | €597 | €1.247 | €1.572 |

Het punt van die tabel: van de €1.050 verschil tussen €3.500 en €6.500 netto gaat €750 naar wonen en €300 naar vrije tijd. Boodschappen, verzekeringen, abonnementen, de auto en de kinderkosten zijn op €6.500 precies even hoog als op €3.500. Het omslagpunt ligt op €4.090.

**Nieuw in de rekenbron: `VUISTREGEL_HERKOMST` in `lib/salaris-vuistregel.ts`.** Twaalf regels met per post het bedrag, de n en wat de vijf huishoudens aanleverden. Die n stond alleen in commentaar boven in `lib/benchmarks.ts` en was daarmee niet renderbaar; nu staat hij naast het bedrag zelf en kan een artikel hem niet meer met de hand typen. De hub rendert die tabel voluit, inclusief de posten met n van 2 in een andere kleur. Dat is tegelijk het blok waarop een AI-zoekmachine kan citeren: eigen data, n per cel, datum erbij.

Ook nieuw: `afgerondOpHonderd()`. De metaTitel en de eerste alinea noemen allebei €3.900 tot €4.900 uit dezelfde functie, de tabel eronder toont €3.878 en €4.928. Een vuistregel op vijf huishoudens hoort geen eurobedrag in een titel te zetten, en titel en eerste alinea moeten hetzelfde getal noemen.

**Interactief element: `SalarisRekenaar` met eigen startwaarden** (€5.500, twee volwassenen, twee kinderen, één auto), zoals CLAUDE.md 8.9 toestaat. Geen nieuwe rekenaar gebouwd: die zou dezelfde vuistregel nog een keer implementeren, en de bestaande toont de posten, het echte rapport, de regel over de twee van de vijf zonder lek en de analyse-CTA al.

**Verplicht pakket afgevinkt:** antwoord met bedragen in de eerste alinea, begrotingstabel direct daarna, koppen als vragen, rekenaar met eigen startwaarden, eigen cijfer met n uit de rekenbron, het echte rapport `tweeverdieners-drie-kinderen` gelinkt met hun eigen bedragen (€7.880 netto, €1.150 boodschappen, €11.600 jaaruitgaven), vijf FAQ's, drie bronnen met ophaaldatum plus /rapporten als vierde, één analyse-CTA in de rekenaar en één in het slotblok, Geldscan als enkele tekstlink, zichtbare regel "Cijfers bijgewerkt op 6 september 2026", metaTitel van 52 tekens met het bedrag vooraan, tabellen die binnen hun container scrollen.

**Vier inkomende links in dezelfde deploy**, één meer dan de twee die CLAUDE.md 8.5 eist: vanuit is-4000 (de sterkste pagina), het boodschappenartikel (de grootste vertoningenbron, en volgens de nulmeting de plek waar het gezinsverkeer binnenkomt), de pijler `samen-6000-euro-netto-toch-niets-over` (die daar sinds gisteren op wachtte) en `tweeverdieners-toch-krap`. De hub linkt terug naar zestien spaken en naar het rapport.

**Geen jaartal in de metaTitel, bewust.** CLAUDE.md 8.15 zegt "waar de zoeker het typt". Op geen van de vijf geverifieerde SERP's kwam een jaartal voor in de PAA of in de gerelateerde zoekopdrachten. Bij de 2027-sweep van 8 december opnieuw bekijken: staat de pagina dan in de buurt van de top 10, dan is een jaartal alsnog het proberen waard.

**Twee fouten van gisteren gerepareerd.** De CPB-bronlink onder Z4 gaf een 404: `cpb.nl/raming-concept-...` moet `cpb.nl/raming/concept-...` zijn. En de Rijksoverheid-bron wees naar de nieuwsindex in plaats van naar de maatregel; die staat nu op de themapagina kindgebonden budget, waar het internetconsultatie-item ook echt op staat. Allebei geverifieerd in Chrome. Les voor elke volgende sessie: een bron-URL die je niet zelf hebt geopend is geen bron.

**Wat de CPB-pagina ook opleverde en wat nog openstaat.** De kerngegevenstabel van de cMEV 2027 geeft bruto modaal op €48.000 voor 2026 en €50.000 voor 2027, met ophaaldatum. Dat is precies het cijfer waar sectie 2 van dit document op wachtte voor de modaal-FAQ in is-4000. Die FAQ is nog niet gebouwd: meelifen op de eerstvolgende deploy die is-4000 toch aanraakt, samen met de ontbrekende FAQ's voor €4.100 en €4.600.

**Wat de sessie verder opleverde aan feiten.** CBS, snelle raming 1 september 2026: voedingsmiddelen, dranken en tabak waren in augustus 0,5 procent goedkoper dan een jaar eerder, terwijl energie inclusief motorbrandstoffen 11,7 procent duurder was. Dat is een bruikbaar cijfer voor de hele boodschappenkant van de site: de post waar iedereen als eerste naar wijst staat stil, de post waar niemand iets aan kan doen loopt hard op.

**Verificatie.** `npx tsc --noEmit --incremental false` schoon, geen null bytes, geen em dashes. En een echte productiebuild in de cloud-container volgens de vaste route, want `next build` kan niet op de mount: 158 pagina's, `wat-geeft-een-gezin-uit-per-maand` geprerenderd, alle bedragen in de gegenereerde HTML gecontroleerd. Dat was hier geen formaliteit: de eerste versie had `KOLOMMEN.map((inkomen) => ({ inkomen, ... }))`, precies het patroon dat de minifier van Next 14.2 op 17 augustus brak. Vervangen door een losse functie `kolomVoor()` op moduleniveau met `inkomen: inkomen` voluit.

**Opgeruimd:** twaalf bestanden in `_to_delete/` stonden nog in git terwijl de map gitignored is, waaronder een build-tar. Uit de index gehaald met `git rm --cached`, de bestanden zelf staan er nog.

**Beslissing die openstaat voor Jarno.** `wat-zijn-normale-vaste-lasten-gezin` heeft nul vertoningen in 90 dagen en zit in het taalgebied van de hub. Volgens de contentkill komt die bij de CTR-ronde van 4 oktober in aanmerking om samengevoegd of ge-301'd te worden naar H1. Nu niet gedaan, want een 301 op de dag dat de hub live gaat maakt de meting onleesbaar. Hij staat wel als spaak gelinkt.

## 11. IndexNow gerepareerd, 6 september 2026

Jarno zag in het indexeringstabblad dat er sinds 17 juni niets meer was ingediend. Klopt, en de oorzaak was eenvoudig en pijnlijk.

**Oorzaak.** In commit `6f56f9d` van 7 juni 2026 is in `vercel.json` het pad `/api/cron/indexing` **vervangen** door `/api/cron/indexing-inspect`, in plaats van dat er een tweede regel bij kwam. De inspectiejob controleert alleen of Google een URL kent; hij dient niets in. Sinds die dag heeft de indieningsjob dus geen enkele keer gedraaid.

Het gevolg was groter dan alleen niet indienen. Diezelfde job doet ook de sync die nieuwe URL's in de tabel `google_indexing` zet. Elke pagina die na 17 juni is gepubliceerd stond daardoor niet eens in de wachtrij, en is nooit bij Bing of Yandex aangeboden. ChatGPT-zoeken leunt op Bing, dus dat is precies het kanaal waar het plan op mikt.

**Waarom niemand het zag.** De job schreef geen regel in `cron_runs`, dus het tabblad kon niet laten zien dat hij stilstond. Een job die verdwijnt uit `vercel.json` verdwijnt volledig geruisloos.

**Vier dingen gerepareerd.**

1. `/api/cron/indexing` staat weer in `vercel.json`, om 06:30, náást de inspectiejob van 07:00.
2. De job schrijft nu zijn uitkomst in `cron_runs` onder `indexing-submit`, en het indexeringstabblad toont bovenaan een tweede regel: "Laatste indiening bij IndexNow". Heeft hij nog nooit gedraaid, dan staat daar een oranje waarschuwing in plaats van niets.
3. De sleutel, de host, het dagbudget en de hele selectie- en bijwerklogica staan nu in `lib/indexnow.ts`, gedeeld door de cron en de knop in de admin. Ze stonden twee keer in de codebase, met twee kopieën van hetzelfde cijfer.
4. Het bijwerken deed twee query's per URL, dus 400 heen-en-weertjes bij een volle batch van 200. Dat is nu één select en één upsert. En de route had geen `maxDuration`, dus hij liep op de standaardlimiet.

**Nieuw: opnieuw indienen als de inhoud verandert.** De oude regel was: alles met status `pending`, `not_indexed` of `error`. Een URL die eenmaal `submitted` was kwam nooit meer aan de beurt, ook niet na een volledige herschrijving. Voor een site die elke maand een CTR-ronde doet en in december 25 metaTitels omzet is dat de verkeerde regel. De nieuwe selectie zit in `kiesTeIndienen()`:

| Reden | Wanneer |
|---|---|
| nieuw | nooit eerder ingediend, gaat altijd voor |
| gewijzigd | de wijzigdatum van het artikel ligt na de laatste indiening |
| fout | vorige indiening mislukte |
| herkansing | status `not_indexed` en langer dan 14 dagen geleden ingediend |

Plus een cooldown van 20 uur, zodat één URL nooit twee keer op een dag wordt aangeboden. De herkansingsgrens van 14 dagen is er omdat de oude volgorde (`created_at` oplopend) betekende dat oude niet-geïndexeerde URL's het dagbudget opaten voordat een nieuw artikel aan de beurt kwam.

**Wat daarvoor eerst gerepareerd moest worden: er was geen wijzigdatum.** `datum` deed vier dingen tegelijk: publicatiedatum, `dateModified` in het Article-schema, `lastmod` in de sitemap en de zichtbare datum onder de kop. Daardoor kon een herschrijving niet worden vastgelegd zonder de pagina te laten lijken alsof hij vandaag verschenen was. De CTR-ronde van vanochtend liet dat meteen zien: vijf pagina's kregen een nieuwe metaTitel en hun `lastmod` bleef op mei en juni staan.

Er is nu een optioneel veld `gewijzigd` in `Artikel`. `datum` blijft de publicatiedatum en de zichtbare datum; `gewijzigd` voedt `dateModified`, de sitemap-lastmod en de herindiening bij IndexNow. **Werkregel voor elke volgende sessie: raak je een artikel inhoudelijk aan, ook als het alleen de metaTitel is, zet dan `gewijzigd` op vandaag.** De acht artikelen die vandaag zijn veranderd hebben hem gekregen, de vijf uit de CTR-ronde en de drie die een link naar de hub kregen.

Onderweg zat er nog een fout in `scripts/generate-sitemap.mjs`: die las de datums met één regex over het hele bestand, met een lazy `[\s\S]*?` tussen `slug:` en het datumveld. Zodra een artikel het veld niet heeft loopt zo'n match het volgende artikel in en krijgt het verkeerde artikel de verkeerde datum. Nu blok voor blok.

**Verificatie.** `kiesTeIndienen()` is een pure functie en is getest met acht rijen die alle takken raken: nieuw, gewijzigd, fout, herkansing, te vers voor een herkansing, vandaag al ingediend, ongewijzigd en statisch. Uitkomst en volgorde klopten. Verder tsc schoon en een productiebuild in de cloud-container groen. Die build ving ook een echte fout: `export const JOB` in een route-bestand breekt Next.js met "does not match the required types of a Next.js Route", en tsc zag dat niet.

De gegenereerde HTML gecontroleerd: het boodschappenartikel heeft nu `datePublished` 26 juni en `dateModified` 6 september, de hub twee keer 6 september, en een ongewijzigd artikel houdt zijn eigen datum twee keer.

**Wat je hierna verwacht.** Na de push draait de job morgenochtend om 06:30 en dient hij alles in wat sinds 17 juni is bijgekomen, in één call en ruim binnen het dagbudget van 200. Klik je vandaag zelf op indienen in het tabblad, dan gebeurt het meteen. Vervolgens toont het tabblad bij elke run wat er is ingediend en waarom.

## 12. Achterstallige lijst

Dit is de voorraad, niet de volgorde. **BEGIN HIER bepaalt wat er als eerste gebeurt**; dit is waaruit BEGIN HIER put als er ruimte is. Streep af wat je doet.

**Content en SEO**

1. **H2**, hub voor het stel zonder kinderen, rapport `stel-zonder-kinderen`. Prio A.
2. **H3**, alleenstaand: geen nieuwe pagina, `kosten-levensonderhoud-alleenstaande-2026` ombouwen tot hub. Prio B.
3. **H4** alleenstaande ouder en **H5** zzp. Prio B en C.
4. **Z1 zorgpremie 2027**: pas na 12 november, als de premies bekend zijn. Let op de waarschuwing in sectie 4 over het eigen risico.
5. **Z3 kinderopvangtoeslag 2027**: zodra de maximum uurtarieven bekend zijn. Let op: de afschaffing en directe financiering gaan om 2029, niet 2027.
6. **B2 vaste lasten**: `vaste-lasten-overzicht-maken` herschrijven, niet `50-30-20-regel-hoger-inkomen`. Zie sectie 3.
7. **De modaal-FAQ in is-4000**, plus de ontbrekende FAQ's voor €4.100 en €4.600. Onderhoud, mag altijd.
8. **De data-asset** "Waar blijft het bij [n] huishoudens", CLAUDE.md 8.25. Kan pas als er genoeg analyses met toestemming zijn; de toestemmingsvraag staat sinds 6 september op het resultaatscherm. Controleer de kolom `toestemming_data_asset` voordat je hier tijd in steekt.

**Funnel en techniek**

9. **Het lek dichten**: schermlijst lezen, één wijziging, een week meten, herhalen. Dit blijft doorlopen tot de afronding boven nul komt.
10. **Opvolgmail dag 0, 3 en 8** (fase 1 punt 4), zodra er afgeronde analyses met e-mailadres zijn. Teksten bewerkbaar in de admin.
11. **Admin-lezing van `quiz_voortgang` naar een server-route**, zodat anon select ingetrokken kan worden.
12. **Schema-audit** (fase 1 punt 5): Person met sameAs op /over, Organization sitewide, en de illustratielabels op de vier casestudy-pagina's.
13. **De maandelijkse AI-test**: vijf kernvragen met de hand in ChatGPT, Perplexity en Google met AI-overzicht, uitkomst in de vrijdagmeting (CLAUDE.md 8.21). Nog nooit gedaan.

**Waarheidsschuld**, af te werken zodra je in de buurt komt van de betreffende pagina: de openstaande feitfouten uit `docs/serp-brainstorm-18-aug-2026.md` sectie "Nog open", de em dashes in metaTitels en bronlabels, en "structuurprobleem" in twee artikelen en vier FAQ-antwoorden.
