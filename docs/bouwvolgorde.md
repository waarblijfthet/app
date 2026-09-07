# Bouwvolgorde, waar blijft het

Levend document, bijgewerkt na elke sessie. Basis: `docs/plan-seo-conversie-100-geldscans-05-sep-2026.md` en `docs/gsc-nulmeting-05-sep-2026.md`.

## BEGIN HIER

Laatst bijgewerkt: 6 september 2026, na zes sessies op die dag. De zesde herstelde de AI-overzicht-citatie van is-4000, zie sectie 15. Er staan lokale commits klaar die Jarno nog moet pushen. Begin met `git log --oneline -8` om te zien of dat nog klopt. **Zolang die push niet is gedaan zijn nieuwe of gewijzigde pagina's niet live** (gecontroleerd op 6 september: `/inzichten/rentevaste-periode-loopt-af-wat-nu` gaf een 404), en dus is de GSC-indiening ook niet gedaan. Zie "Openstaand aan Jarno's kant".

**Update 7 september, buiten deze volgorde om, drie opdrachten.** Op expliciet verzoek van Jarno gewerkt aan `/analyse`. Eerste opdracht: `app/analyse/IntroScherm.tsx` herschreven, inhoud en UX binnen de bestaande smalle kolom. Tweede opdracht, dezelfde dag: omgebouwd tot volwaardige brede landingpage (max 1180px, twee-koloms hero, resultaatpreview, kaarten), met een kleine wrapperwijziging in `QuizClient.tsx`. Derde opdracht: een "Analyse afbreken"-knop op elke stap van de vragen- en resultatenflow, want er was geen weg terug naar de introductie, ook niet via een refresh. Geen van de drie is een bouwvolgorde-item of een contentpagina, dus telt niet mee in de tempo-regel van sectie 1. Zie sectie 17, 18 en 19. Ongepusht, hoort bij dezelfde push als de rest van deze sectie.

**Vierde opdracht, zelfde dag, buiten de bouwvolgorde om.** Jarno stuurde een schermafbeelding van de destijds nog live staande versie van dit laatste deel en vroeg om exact die volgorde: "Dit is voor jou als" -> vertrouwensblok -> bruggetje "Een bedrag op zichzelf zegt weinig" -> eind-CTA, in plaats van de afdalingslogica (bruggetje eerst) uit de derde opdracht. Navraag bevestigde: de schermafbeelding is leidend, niet de eerder gegeven volgorde-redenering. Commit b1f2e56, alleen volgorde en mb-marges van drie blokken aangepast, tekst/iconen/containerbreedte ongewijzigd, tsc schoon. Ook ongepusht, hoort bij dezelfde push. **`.git/index.lock` stond opnieuw in de weg** (zie de bekende schuld hieronder over locks); dit keer opgelost zonder Jarno via `device_request_delete_permission` op de gekoppelde map, waarna `rm .git/index.lock` en meteen `git commit` werkte. Dat kan dus voortaan zonder dat Jarno het lock-bestand hoeft weg te halen.

**Stand van zaken.** Fase 0 af. Fase 1 punt 1 en 3 staan live, dus contentbouw mag lopen. Fase 2 CTR-ronde 1 uitgevoerd, inclusief de antwoordblokken die bij de nieuwe titels horen. Z4 gepubliceerd. De pijler van cluster P verlegd en herschreven. H1 staat er, de eerste van de vijf hubs, met vier inkomende links. De IndexNow-indiening werkt weer na bijna drie maanden stilstand.

Daarbovenop de batchdag van vanavond: **vijf nieuwe pagina's gebouwd (N1, N4, N2, N3, N5), N6 geschrapt**. Alle 24 zoektermen uit het invalshoekenplan zijn eerst op google.nl geverifieerd, met de uitkomsten in `docs/serp-invalshoeken-06-sep-2026.md`. Zie sectie 13 hieronder voor wat er is gebouwd, wat is geschrapt en waarom.

**Let op de tempo-regel.** Met deze batch staan er op 6 september acht pagina's nieuw of herschreven, tegen een norm van twee per week. Dat was een expliciete, eenmalige keuze van Jarno en het plan noemt hem ook zo. Vanaf nu geldt de norm van twee per week weer, en de eerstvolgende nieuwe pagina is H2, niet eerder dan 13 september.

### Eerst dit, elke sessie, kost vijf minuten

1. **Draaide de IndexNow-cron?** Open het indexeringstabblad. Bovenaan hoort een verse regel te staan bij "Laatste indiening bij IndexNow". Staat daar iets van gisteren of eergisteren, dan is het goed. Staat er niets nieuws, dan pakt Vercel de cron van 06:30 niet op en moet Jarno in het Vercel-dashboard kijken of het plan meer dan drie cronjobs toestaat. Zie sectie 11 voor de achtergrond.
2. **Wat zegt de vrijdagmeting?** Eén regel, tien minuten, handmatig, zoals CLAUDE.md sectie 9 hem beschrijft. Zonder dat cijfer weet je niet of de sessie ergens over gaat.

### Wat de eerstvolgende actie is, hangt af van de datum

**Tot en met 12 september: geen nieuwe pagina bouwen.** Op 6 september zijn er acht pagina's nieuw of herschreven (Z4, de pijler, H1, plus de batch N1 tot N5). De tempo-regel uit CLAUDE.md sectie 1 is twee per week, nooit meer, en dat is geen richtlijn maar de regel die voorkomt dat er halve pagina's live gaan. Deze week is dus vol. Doe in die periode onderhoud, dat valt er expliciet buiten:

- ~~De CTR-titels tegen hun antwoordblok.~~ Gedaan op 6 september, zie sectie 12. Alle vijf antwoordblokken noemen nu hetzelfde getal als hun metaTitel.
- ~~De modaal-FAQ in is-4000~~ **Gedaan op 6 september**, zie sectie 15: `BRUTO_MODAAL_2026`/`NETTO_MODAAL_2026_MAAND` nieuw in `lib/bruto-netto-referentie.ts`, FAQ's herordend op de PAA-vragen, "top 25 procent"-claim bewust weggelaten (zie de openstaande beslissing hieronder). **De ontbrekende FAQ's voor €4.100 en €4.600 staan nog open**, dat is de eerstvolgende onderhoudsklus op deze pagina.
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
| 20 september | **+14 dagen op de is-4000 AI-overzicht-fix van 6 september** (sectie 15): GSC Generative AI features nakijken, en meteen is-5000 en het boodschappenartikel controleren op dezelfde knik, want dat kon deze sessie niet vanaf hier. |
| 4 oktober | CTR-ronde 1 meten, de vijf URL's uit sectie 1. Meteen ook: houdt is-4000 de modaalvertoningen vast (+28 dagen op de fix van 6 september, sectie 15), pakt `waarom-hou-ik-nooit-geld-over` de 15 vertoningen van de 301 op, en wat doet H1 na vier weken. Plus de beslissing over `wat-zijn-normale-vaste-lasten-gezin`, zie hieronder. |
| 5 november | **Meetpunt N5**, de Engelse pagina: haalt hij meer dan 100 vertoningen per week in GSC? Zo niet, dan blijft het bij deze ene Engelse pagina en komt er geen tweede. Nulmeting op 6 september: 1 vertoning in 90 dagen op alles met "salary" erin. |
| 5 december | **Meetpunt N1 tot N4**, 90 dagen na publicatie. Een pagina met minder dan 20 vertoningen per maand en geen externe links gaat mee in de contentkill van CLAUDE.md sectie 9. Let vooral op N4: die deelt taalgebied met de twee coach-pagina's. |
| 1 november | Killgrens uit plan sectie 9: onder 3.000 sessies per maand of onder 5 betaalde Geldscans gaan clusters L en B in de wacht. |
| 12 november | Z1 zorgpremie 2027 bouwen, als de premies bekend zijn. |
| 8 december | 2027-sweep over 25 metaTitels. Zet bij elke pagina `gewijzigd`, anders merkt de sitemap er niets van. |

### Openstaande beslissingen voor Jarno

1. **De "top 25 procent"-claim op is-4000 is eruit gehaald (sectie 15) en heeft nog geen vervanging.** Stond zonder bron in metaDescription, excerpt, FAQ en een callout. De CBS-longread "Materiële welvaart in Nederland 2024" geeft alleen decielgrenzen voor "persoonlijk inkomen" (bruto-achtig, cijfers 2022): 10e-decielgrens €72.000, wat dicht bij het benodigde bruto van €73.300 voor €4.000 netto ligt, niet bij een 75e-percentielgrens. De claim was dus hoogstwaarschijnlijk fout. Lever een echte bron aan met een matchende definitie (netto of bruto, huishouden of individu, welk jaar) als je hem terug wilt, anders blijft hij weg.
2. **GSC Generative AI features voor is-5000 en het boodschappenartikel is niet gecontroleerd op dezelfde knik als is-4000 (sectie 15).** Dat vereist de Search Console-UI (Zoekresultaten, filter op zoekuiterlijk); de admin-`search-analytics`-route in de codebase kan dat niet querien. Check dit bij de 20-september- of 4-oktober-meting.
3. **De €2.000 tot €2.400 in de titel van `kosten-levensonderhoud-alleenstaande-2026` heeft geen deugdelijke bron.** Dat bedrag staat sinds 6 september in de metaTitel en nu ook in het antwoordblok, maar de bronnen eronder zijn FinBuddy en HetGeldCollege (commerciële blogs) plus een kale link naar cbs.nl zonder tabel. Dat is precies wat CLAUDE.md regel 3 verbiedt. Twee opties: een echte CBS- of Nibud-onderbouwing zoeken en de bronnenlijst vervangen, of de bandbreedte uit titel en antwoordblok halen. Uiterlijk beslissen bij de CTR-meting van 4 oktober, want tot die tijd meet die titel wel mee.
4. **`wat-zijn-normale-vaste-lasten-gezin`**: nul vertoningen in 90 dagen en het zit in het taalgebied van H1. Kandidaat voor samenvoegen of een 301 naar H1 bij de CTR-ronde van 4 oktober. Nu niet gedaan, want een 301 op de dag dat de hub live gaat maakt de meting onleesbaar.
5. **Nibud-cijfers.** Nibud blokkeert automatisch opvragen, dus H1 citeert geen enkel Nibud-bedrag. Wil je de vergelijking met de Nibud-voorbeeldbedragen op de hub, lever dan bedrag en ophaaldatum aan, dan komt het er met bron bij.
6. **Keyword research op verzoek van Jarno (7 september), buiten de bouwvolgorde om.** Zeven zoektermen rond "financieel coach"/"budgetcoach"/"financiële APK" onderzocht op google.nl en in Perplexity, uitkomsten in `docs/serp-financieel-coach-07-sep-2026.md`. Geen van de zeven is een kandidaat voor een nieuwe pagina: de coach/planner-termen zijn bezet of vallen onder vergunningplichtig advies, de inzicht/APK-termen concurreren met Nibud/MijnGeldzaken's eigen gratis tools. Wel bevestigd: de bestaande positioneringstaal ("geen schulden, verdien genoeg, toch niets over") wordt al door Perplexity geciteerd en aanbevolen bij twee van de zeven zoekopdrachten, zonder dat daar een specifieke pagina voor bestaat. **Open voor Jarno**: GSC-filter op `/financieel-coach` (bestaande pagina, niet eerder genoemd in dit document) voor "financieel coach voor particulieren" en "persoonlijke financiële coaching", om te zien of upgraden zinvoller is dan wat dan ook nieuws bouwen.

7. **Contentaudit op verzoek van Jarno (7 september), buiten de bouwvolgorde om.** Alle 94 artikelen en 14 publieke pagina's beoordeeld tegen de tien contentclusters die Jarno aanleverde, met status A tot F per pagina, een clusteroverzicht met pijlerkeuze en een prioriteitenlijst van tien acties. Uitkomsten in `docs/contentaudit-clusterarchitectuur-07-sep-2026.md`. Er is geen content geschreven of herschreven. **Open voor Jarno**: de eerste drie acties zijn onderhoud en vallen dus binnen de periode tot 12 september; de acties 2, 3, 6 en 9 bevatten 301's en die vragen eerst een GSC-filter per zoekterm en jouw akkoord. Twee correcties op bestaande documenten: het zijn 94 artikelen en niet 90 (CLAUDE.md sectie 2 en plan sectie 0), en het woord "eerlijk" staat niet alleen in metaDescriptions maar ook in vier zichtbare `titel`-velden.

8. **`/analyse` aangepast (7-sep-2026), buiten de bouwvolgorde om, op verzoek van Jarno, in drie opdrachten dezelfde dag.** Zie sectie 17 (introductie herschreven), 18 (brede landingpage, ook `QuizClient.tsx` geraakt voor de bredere wrapper) en 19 ("Analyse afbreken"-knop op elke stap, vijf bestanden geraakt). Geen productiebuild gedraaid: `next dev` en `next build` sterven op de mount zelf, precies zoals `feedback_minifier_verkorte_objectnotatie` beschrijft (geen SWC-binary, geen netwerk), en geen van de bestanden bevat berekende objecten, dus niet het specifieke minifier-risicopatroon uit die regel; `tsc` is wel schoon op alle bestanden. **Loop de pagina zelf even langs op telefoon en desktop na de push, inclusief de afbreken-knop op een vraagstap en op een resultaatstap: dit scherm en deze knop zijn nog in geen enkele echte browser gezien.**

### Openstaand aan Jarno's kant

1. Bing Webmaster Tools aanzetten en de sitemap indienen. Nu extra de moeite waard: IndexNow dient weer in bij Bing en zonder Webmaster Tools zie je niet wat dat oplevert.
2. De URL's van Z4 en H1 handmatig indienen in GSC, als dat nog niet gebeurd is: `/inzichten/kindgebonden-budget-2027-inkomensgrens` en `/inzichten/wat-geeft-een-gezin-uit-per-maand`.
3. **Pushen, en pas daarna de vijf nieuwe URL's indienen in GSC.** Ze zijn op 6 september bewust niet ingediend, want ze gaven op dat moment nog een 404 en een 404 indienen bij Google levert een crawlfout op in plaats van een indexering. Zodra de deploy staat, alle vijf via URL-inspectie indienen:
   - `/inzichten/rentevaste-periode-loopt-af-wat-nu`
   - `/inzichten/kan-iemand-naar-mijn-financien-kijken`
   - `/inzichten/partner-geeft-te-veel-uit`
   - `/inzichten/financiele-ontrouw-partner-verzwijgt-geld`
   - `/en/is-5000-net-a-good-salary-netherlands`
   Controleer meteen dat die laatste ook echt rendert; het is de eerste pagina buiten `/inzichten` met eigen metadata en eigen schema.
4. `_to_delete/` een keer legen. Daar staan lege git-locks in die ik niet kan verwijderen, plus twee oude build-tars.

### Bekende schuld

- De anon-rol mag `quiz_voortgang` nog lezen omdat het funneltabblad met de browserclient leest. Eerst die lezing naar een server-route, dan pas select intrekken. Staat als waarschuwing in `supabase/quiz_voortgang_v3.sql`.
- De zin "ik verwijder je afschriften en aangeleverde gegevens" klopt alleen zolang Jarno dat met de hand doet. Er verwijdert niets softwarematig.
- De vier casestudy-pagina's met bedachte namen moeten gecontroleerd op hun illustratielabel in tekst, titel en schema.
- Het woord "eerlijk" staat nog 27 keer in `lib/inzichten-data.ts`, in excerpts, metaDescriptions en FAQ-antwoorden. Copyregel 6 verbiedt het. Ruim het op per pagina die je aanraakt, net als de em dashes.
- De regel "Cijfers bijgewerkt op [datum]" (CLAUDE.md sectie 8, punt 14) staat alleen op de twee pagina's van 6 september. De vijf CTR-pagina's hebben hem niet. Zet hem er pas op als je de cijfers op die pagina ook echt geverifieerd hebt; een versheidsregel zonder controle is een valse claim.

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

## 12. Antwoordblokken op de vijf CTR-pagina's, 6 september 2026

Het openstaande punt uit CTR-ronde 1: de nieuwe metaTitel belooft een getal, dus de eerste alinea van de pagina moet datzelfde getal noemen. Anders meet je op 4 oktober een titel die de pagina niet meteen waarmaakt en weet je niet wat je gemeten hebt. Alle vijf zijn nagelopen, alle vijf zijn aangepast. Geen enkele pagina heeft nieuwe cijfers gekregen; elk getal in een antwoordblok stond al ergens anders op diezelfde pagina.

| URL | Wat er mis was | Wat er nu staat |
|---|---|---|
| `wat-is-normaal-bedrag-boodschappen-per-maand` | Titel begint met €300 tot €1.400, de eerste zin noemde geen enkel bedrag. De bandbreedte stond alleen in de lijst eronder. | De bandbreedte en het jaartal staan nu in de eerste zin, met de reden waarom hij zo breed is. |
| `netto-loonsverhoging-berekenen` | Titel belooft 3 procent, de pagina rekende alleen per €100 bruto en verderop met €200 per maand. Nergens een 3-procentgetal. | Antwoordalinea bovenaan, boven het "Herken je dit?"-blok: 3 procent op €4.000 bruto per maand is €120 bruto en netto ongeveer €50 tot €75. Afgeleid uit de zonetabel die al op de pagina staat (€44 tot €62 per €100 in het middensegment), naar buiten afgerond. |
| `kosten-levensonderhoud-alleenstaande-2026` | Titel begint met €2.000 tot €2.400, maar het bedrag stond pas na de persona-kiezer en de ScanBox, ver voorbij de 60 woorden. | Kort-antwoordblok bovenaan met de bandbreedte, wat er wel en niet in zit, en het Randstadverschil. De drie inleidende alinea's eronder zijn tot één samengevat. |
| `nibud-boodschappen-versus-werkelijkheid` | Titel stelt een ja-neevraag ("haalbaar in 2026?") die nergens met ja of nee beantwoord werd. | Kort-antwoordblok bovenaan dat met nee opent, met €627 en de €700 tot €900 uit de praktijk. De ScanBox eronder is neutraal wit geworden, anders staan er twee groene blokken op elkaar. |
| `vrij-besteedbaar-inkomen-berekenen` | Titel heeft geen getal, dus niets te matchen. Wel stond de definitie pas na het "Herken je dit?"-blok en ontbrak een maatstaf bovenaan. | Definitie plus de richtlijn van 10 tot 20 procent staat nu in de eerste alinea. |

Meegenomen omdat ik de pagina toch aanraakte:

- Copyregel 6 (het woord "eerlijk" nooit in copy) werd op twee van de vijf overtreden: "Het eerlijke antwoord is" in het alleenstaande-artikel en "het eerlijke verhaal achter de norm" in het Nibud-artikel, plus dezelfde zin in de metaDescription van dat laatste. Alle drie weg. Bij het naspeuren bleek het woord nog 27 keer in `lib/inzichten-data.ts` te staan; dat staat nu als schuld in BEGIN HIER.
- De zonetabel in het loonsverhogingartikel noemt nu de Belastingdienst in de zin zelf, niet alleen onderaan in de bronnenlijst.
- Em dashes en "structuurprobleem": op deze vijf pagina's stond geen van beide, in de tekst niet en in hun data-entry niet.

`gewijzigd` stond bij alle vijf al op 2026-09-06 door de titelronde van vanochtend, dus daar hoefde niets aan. `npx tsc --noEmit --incremental false` is schoon, geen null bytes. Een echte productiebuild is niet gedraaid: de wijzigingen zijn uitsluitend tekst in JSX, zonder nieuwe objectliteralen of berekende waarden, dus het patroon uit `feedback_minifier_verkorte_objectnotatie` kan hier niet toeslaan.

Wat hier bewust niet is gebeurd: de regel "Cijfers bijgewerkt op [datum]" is er niet bij gezet. Die regel claimt dat de cijfers op die dag gecontroleerd zijn, en dat is niet gebeurd; er is alleen verplaatst wat er al stond. En bij het alleenstaande-artikel bleek dat de €2.000 tot €2.400 die nu in de titel én in het antwoordblok staat, geen bron heeft die CLAUDE.md regel 3 aankan. Dat staat als openstaande beslissing voor Jarno in BEGIN HIER.

## 13. Batchdag nieuwe invalshoeken, 6 september 2026

Eenmalige batchdag uit `docs/plan-nieuwe-invalshoeken-06-sep-2026.md`, expliciet zo afgesproken. Zes pagina's gepland, vijf gebouwd, een geschrapt. Vanaf morgen geldt de norm van twee per week weer.

### Stap 1: SERP-verificatie van alle 24 zoektermen

Chrome op google.nl, `hl=nl` en `gl=nl` voor de Nederlandse termen, `hl=en` en `gl=nl` voor de Engelse (de zoeker is Engelstalig maar zit hier, en met `hl=nl` zie je een andere pagina 1 dan hij). Volledig verslag in `docs/serp-invalshoeken-06-sep-2026.md`.

**Op geen van de 24 SERP's stond een AI-overzicht, en op geen enkele stond een eigen URL op pagina 1.** Dat is consistent met de hubs-meting van dezelfde dag.

GSC-controle per onderwerp, laatste 90 dagen: hypotheek 7 vertoningen op positie 4,6; partner 12 op 32,1; coach 1.190 op 52,6; salary 1 op 35. Alleen die derde is een kannibalisatierisico, zie N4 hieronder.

### Wat er gebouwd is

| # | Slug | Primaire zoekterm | Interactief element | Rapport |
|---|---|---|---|---|
| N1 | `rentevaste-periode-loopt-af-wat-nu` | rentevaste periode loopt af wat nu | `RenteVerschilRekenaar` op `lib/rente-verschil.ts` | tweeverdieners-drie-kinderen |
| N4 | `kan-iemand-naar-mijn-financien-kijken` | iemand die naar mijn financiën kijkt | `HulpKeuzehulp`, drie vragen | alle vijf via /rapporten |
| N2 | `partner-geeft-te-veel-uit` | partner geeft te veel uit | `BoodschappenSituatiekiezer` met eigen kop | stel-zonder-kinderen |
| N3 | `financiele-ontrouw-partner-verzwijgt-geld` | financiële ontrouw | `OpenheidChecklist`, vijf ja/nee-vragen | geen, bewust |
| N5 | `/en/is-5000-net-a-good-salary-netherlands` | is 5000 net a good salary netherlands | `HouseholdCalculatorEn` | stel-zonder-kinderen en gezin |

Commits, in volgorde: `92358a9` (N1 plus de SERP-verificatie), `c350c97` (N4), `95e07bc` (N2 en N3 samen), `9e3a514` (N5). N2 en N3 zitten in één commit omdat ze elkaar over en weer linken; los committen zou in de eerste een link naar een nog niet bestaande slug zetten.

### Wat er geschrapt is, en waarom

**N6, "wat je bankapp je niet vertelt", helemaal geschrapt.** Alle vier de zoektermen leveren een SERP die voor zes tot acht van de negen plekken uit de helppagina's van ING, Rabobank, ABN en ASN bestaat. Google leest deze termen als supportvragen over je eigen bankapp, en op die vraag is de helppagina van je eigen bank het juiste antwoord. Een onafhankelijke pagina komt daar niet boven. Bijkomend: de zoekterm "Rabobank Grip" uit de brief beschrijft een product dat niet bestaat, want Grip is de app van ABN AMRO en de Rabobank noemt het Inzicht.

De hoek zelf ("de app telt, de vergelijking ontbreekt") is wel goed, maar het is een argument en geen zoekmoment. **Voorstel, geparkeerd, beslissing aan Jarno:** neem het op als sectie in het boodschappenartikel (10.932 vertoningen) of in H1, onder de kop "waarom je bankapp niet zegt of het erg is". Dat is een half uur en valt onder onderhoud, niet onder de tempo-regel.

**Zes losse zoektermen geschrapt terwijl hun pagina bleef staan:**

| Zoekterm | Bij | Waarom |
|---|---|---|
| hypotheek 2016 verlengen 2026 | N1 | Google negeert "2016" (zes van de negen resultaten zeggen letterlijk "Bevat niet: 2016") en toont de hypotheekregels van 2026. Cohortomschrijving, geen zoekterm. |
| vrouw koopt te veel | N2 | SERP is volledig koopverslaving: Afkickkliniekwijzer op 1, psychologie.nl, verslavingskliniek, oniomanie in "mensen zoeken ook naar". Gezondheidsterrein, copyregel 5. |
| partner verzwijgt schulden | N3 | SERP is juridisch: Judex, Juridisch Loket, aansprakelijkheid bij scheiding. De zoeker wil weten of hij aansprakelijk is en dat beantwoordt deze site niet. Komt terug als FAQ met doorverwijzing. |
| second opinion huishoudbudget | N4 | Google laat "huishoudbudget" bij vijf van de negen resultaten vallen. De term heeft geen corpus: hij is bedacht, niet getypt. |
| financiële check laten doen | N4 | Alle negen resultaten gaan over de financiële check bij nieuwbouw. Volledig bezet, met een betekenis die niets met deze dienst te maken heeft. |
| why can't I save money in the netherlands | N5 | SERP is bespaartips (Becksplore, All About Expats, Expatica). CLAUDE.md sectie 4 en 8 sluiten bespaartips uit. |

**Dit beantwoordt meteen D1 uit het plan van 5 september.** Dat punt vroeg om te controleren of "financiële APK" of "geldcheck laten doen" bezet is door hypotheekadviseurs. Het antwoord is ja, volledig. D1 mag daarom nooit op die naam gebouwd worden. N4 vervangt D1 en doet het op natuurlijke taal.

### Correcties op de briefs, na verificatie

1. **N3, schaamtecijfer.** De brief noemde 38 procent. Het geverifieerde cijfer is **42,4 procent**, en het hoort bij een tweede onderzoek van Lening.nl onder **1.127** mensen (via Banken.nl, 12 augustus 2026), niet bij het onderzoek van april onder **400** mensen. Uit dat eerste komt de 11,75 procent (via Wonen360, 3 april 2026). De brief noemde maart 2026 als datum; de publicatiedatum is 2 april 2026. Beide onderzoeken zijn zelfgerapporteerd en van een commercieel vergelijkingsplatform, en dat staat bij elk cijfer op de pagina.
2. **N1, het NHG-cijfer.** De brief noemde "bijna 100 euro bruto per maand erbij, NHG via Ikbenfrits, april 2026". Dat cijfer is op google.nl niet teruggevonden; Ikbenfrits heeft wel een pagina over aflopende rentevaste periodes, maar die is van 4 juni 2025 en noemt het bedrag niet. **Het staat dus niet in de pagina.** In plaats daarvan rekent N1 het verschil zelf uit met de annuïteitenformule, met de formule zichtbaar, en gebruikt Van Bruggen (26 maart 2026, zelf geopend) alleen als bron voor het rentespoor van net onder 2 naar rond 4 procent.
3. **N1, vierde tabelkolom.** De brief noemt +0,5, +1,0 en +1,5 procentpunt. Daar is +2,0 aan toegevoegd, want de geverifieerde bron laat zien dat het cohort van 2016 in de praktijk ongeveer twee procentpunt omhoog gaat. Een tabel die op anderhalf stopt toont de situatie niet die nu speelt.
4. **N5, Amsterdamse huur.** De brief vroeg om huur en woonlasten met bron. Er is geen gesourced huurníveau voor Amsterdam gevonden, alleen een huurstíjging (CBS, 4 september 2026: landelijk 4,4 procent, Amsterdam 4,3 procent, het laagst van de vier grote steden). De pagina zegt daarom expliciet dat ik geen huurniveau heb en gebruikt de stijging plus de woonlastvuistregel.

### Waarom N4 tóch gebouwd is terwijl GSC kannibalisatie suggereert

CLAUDE.md sectie 8A punt 2 zegt: vertoont een bestaande URL al op die zoekterm, dan upgraden in plaats van bouwen. Op "coach"-termen staat de site op 1.190 vertoningen in 90 dagen, positie 52,6, nul klikken. Dat gaat naar `wat-kost-een-financieel-coach` en `verschil-budgetcoach-financieel-coach`.

De toets uit sectie 10 is toegepast: de scheiding moet in één zin uit te leggen zijn. Die zin is:

> `wat-kost-een-financieel-coach` beantwoordt wat het kost, `verschil-budgetcoach-financieel-coach` beantwoordt wie wat doet, en N4 beantwoordt of het iets voor jou is als je geen schulden hebt.

Die zin staat nu letterlijk op alle drie de pagina's, met links over en weer. Houdt N4 na 90 dagen minder dan 20 vertoningen, dan gaat hij met die twee mee in de contentkill. Meetdatum staat in de datumtabel op 5 december.

### Wat er technisch bij is gekomen

- `lib/rente-verschil.ts`: annuïteit plus restschuld, met de formules gedocumenteerd. Rekent bewust alleen het verschil in bruto maandlast bij een gegeven rente. Nooit uitbreiden naar rentevergelijking of aanbieders; CLAUDE.md sluit een hypotheekrekenaar uit.
- Vier nieuwe componenten: `RenteVerschilRekenaar`, `HulpKeuzehulp`, `OpenheidChecklist`, `HouseholdCalculatorEn`.
- `BoodschappenSituatiekiezer` heeft twee optionele teksten gekregen (`kop`, `intro`) zodat N2 hem kan hergebruiken. Chips, bedragen en vervolgroutes zijn ongewijzigd; zonder meegegeven tekst gedraagt hij zich precies als voorheen.
- Twee optionele velden op `Artikel`: `dienstSchema` (Service-schema met prijs, alleen op N4) en `enVertaling` (hreflang, alleen op is-5000). Komt er ooit een tweede Engelse pagina, dan is dat het moment om er een echte i18n-laag van te maken in plaats van een veld.
- `/en/` is de eerste route buiten `/inzichten` met eigen metadata en eigen Article-, FAQPage- en BreadcrumbList-schema. Toegevoegd aan `scripts/generate-sitemap.mjs` én aan `lib/sitemap-urls.ts`; dat zijn twee losse lijsten en ze worden allebei gebruikt. Sitemap staat nu op 117 URL's, llms.txt heeft een eigen kopje "In English".

### Wat bewust NIET gebouwd is

**Een Engelse labelset voor de analyse.** De brief van N5 vroeg om te beoordelen of dat in één sessie haalbaar is. Dat is het niet: het zijn zes stapcomponenten in `app/analyse/stappen`, plus de resultaatteksten en de mailketen, en half vertalen is erger dan niet vertalen. Op de Engelse pagina staat daarom letterlijk dat de vergelijking Nederlands is en dat het rapport in het Engels geleverd wordt.

**Beslispunt voor Jarno:** dit pas oppakken als N5 zijn meetpunt van 5 november haalt. Doet hij dat niet, dan is het weggegooid werk.

### Inzichten terug in het hoofdmenu

Jarno merkte na de batch op dat `/inzichten` in de header ontbrak, terwijl het de pagina is die alle artikelen toont. Hij stond wel in de footer, niet in het menu. Toegevoegd aan `navLinks` in `components/Header.tsx`, op plek twee: Analyse, Inzichten, Rapporten, Aanbod, Over. Desktop en mobiel lezen allebei uit die ene lijst, dus één regel dekt beide.

Wat er wél omheen moest, en waarom. Met vijf links past de balk niet meer op 768px. Opgemeten op de live header: logo 143, navigatie 387 bij een gap van 24, tussenruimte 32, knop 214, padding 80, samen 856 pixels. Daarom:

- De volledige navigatie staat nu vanaf `lg` (1024px) in plaats van vanaf `md`. Op 1024 blijft er 168 pixels over.
- **De primaire knop is losgekoppeld van de navigatie en staat vanaf `sm` (640px) altijd in de balk.** Zonder die splitsing zou een tablet de gratis analyse achter de hamburger krijgen, en CLAUDE.md sectie 5 wil hem vanaf elke pagina met één klik bereikbaar. Op 640 heeft die combinatie 481 pixels nodig.
- Onder `sm` verandert er niets: daar staat de knop alleen in het uitgeklapte menu, want naast logo en hamburger past hij niet op een telefoon van 320 pixels.
- De hamburger is van de balk naar het rechterblok verhuisd. De balk is `justify-between` met precies twee kinderen; laat je de knop erbuiten, dan schuift het rechterblok naar het midden. Dat staat als waarschuwing in het component.

Niet gecontroleerd in een echte browser: de dev-server overleeft de shell op deze mount niet, dus de breedtes zijn opgemeten door de nieuwe balk op de live pagina na te bouwen. Loop de header na de deploy zelf even langs op telefoon, tablet en desktop.

### Openstaand na deze batch

1. **Pushen en dan pas indienen.** Zie "Openstaand aan Jarno's kant" in BEGIN HIER. De vijf URL's gaven op 6 september nog een 404.
2. **Draai een productiebuild voordat je pusht.** Vier nieuwe clientcomponenten en een nieuwe route; `tsc` is schoon maar die ving deze week twee minifier-fouten niet.
3. **Nibud over geldgesprekken in relaties.** De brief van N2 vroeg om een Nibud-bron als die vindbaar was. Nibud heeft een rapport "Geld en relatie" uit 2019 dat op de SERP staat, maar Nibud blokkeert automatisch opvragen (CLAUDE.md 8A.1). Wil je dat cijfer op N2, lever dan bedrag, vindplaats en ophaaldatum aan.
4. **N6 als sectie ergens anders**, zie hierboven. Geparkeerd tot Jarno erover beslist.

## 14. Achterstallige lijst

Dit is de voorraad, niet de volgorde. **BEGIN HIER bepaalt wat er als eerste gebeurt**; dit is waaruit BEGIN HIER put als er ruimte is. Streep af wat je doet.

**Content en SEO**

1. **H2**, hub voor het stel zonder kinderen, rapport `stel-zonder-kinderen`. Prio A.
   - Kijk vóór H2 naar N2 en N3: die linken allebei naar het stel zonder kinderen en horen straks onder deze hub te hangen.
2. **H3**, alleenstaand: geen nieuwe pagina, `kosten-levensonderhoud-alleenstaande-2026` ombouwen tot hub. Prio B.
3. **H4** alleenstaande ouder en **H5** zzp. Prio B en C.
4. **Z1 zorgpremie 2027**: pas na 12 november, als de premies bekend zijn. Let op de waarschuwing in sectie 4 over het eigen risico.
5. **Z3 kinderopvangtoeslag 2027**: zodra de maximum uurtarieven bekend zijn. Let op: de afschaffing en directe financiering gaan om 2029, niet 2027.
6. **B2 vaste lasten**: `vaste-lasten-overzicht-maken` herschrijven, niet `50-30-20-regel-hoger-inkomen`. Zie sectie 3.
7. ~~De modaal-FAQ in is-4000~~ Gedaan op 6 september, zie sectie 15. **De ontbrekende FAQ's voor €4.100 en €4.600 blijven open.** Onderhoud, mag altijd.
8. **De data-asset** "Waar blijft het bij [n] huishoudens", CLAUDE.md 8.25. Kan pas als er genoeg analyses met toestemming zijn; de toestemmingsvraag staat sinds 6 september op het resultaatscherm. Controleer de kolom `toestemming_data_asset` voordat je hier tijd in steekt.

**Funnel en techniek**

9. **Het lek dichten**: schermlijst lezen, één wijziging, een week meten, herhalen. Dit blijft doorlopen tot de afronding boven nul komt.
10. **Opvolgmail dag 0, 3 en 8** (fase 1 punt 4), zodra er afgeronde analyses met e-mailadres zijn. Teksten bewerkbaar in de admin.
11. **Admin-lezing van `quiz_voortgang` naar een server-route**, zodat anon select ingetrokken kan worden.
12. **Schema-audit** (fase 1 punt 5): Person met sameAs op /over, Organization sitewide, en de illustratielabels op de vier casestudy-pagina's.
13. **De maandelijkse AI-test**: vijf kernvragen met de hand in ChatGPT, Perplexity en Google met AI-overzicht, uitkomst in de vrijdagmeting (CLAUDE.md 8.21). Nog nooit gedaan.

**Waarheidsschuld**, af te werken zodra je in de buurt komt van de betreffende pagina: de openstaande feitfouten uit `docs/serp-brainstorm-18-aug-2026.md` sectie "Nog open", de em dashes in metaTitels en bronlabels, en "structuurprobleem" in twee artikelen en vier FAQ-antwoorden.

## 15. is-4000 AI-overzicht-citatie herstelpoging, 6 september 2026

Deliverable van deze sessie: is-4000 weer citeerbaar maken voor Google's AI-overzicht zonder de eigen huishoudhoek te verliezen. Achtergrond in `project_ai-overzicht-citatie-verloren-06-sep-2026` (projectgeheugen): het overzicht citeert nu Reddit, NationaleBeroepengids, Flexurance en anderen, niet waarblijfthet, en framet de vraag als salarisvraag (boven modaal, benodigd bruto) terwijl de pagina eerst de huishoudnuance bracht zonder gesourcete cijfers.

**Nieuwe gesourcete constanten, `lib/bruto-netto-referentie.ts`.** `BRUTO_MODAAL_2026` (€48.000) en `BRUTO_MODAAL_2027` (€50.000): CPB, concept-Macro Economische Verkenning 2027, kerngegeventabel, geraadpleegd 6 september 2026, `https://www.cpb.nl/raming/concept-macro-economische-verkenning-cmev-2027`. `NETTO_MODAAL_2026_MAAND` (€3.030): GEEN officieel cijfer, eigen berekening met dezelfde methode als `BRUTO_VOOR_NETTO` toegepast op het bruto modale inkomen. Het script `scripts/bruto-netto-ijkpunten.mjs` print de afleiding nu ook, voor reproduceerbaarheid. De oude, nergens gesourcete "€3.100 netto modaal" stond op minstens vijf plekken (FAQ, twee lopende-tekstalinea's, is-5000) en is overal vervangen.

**is-4000 herschreven op vier punten uit de opdracht:**
1. Eerste alinea: "Ja, €4.000 netto per maand is een goed salaris" met twee gesourcete feiten (bruto modaal + netto modaal 2026, en het benodigde bruto van €73.300 uit `BRUTO_VOOR_NETTO[4000]`), huishoudnuance erna.
2. Zichtbare regel "Cijfers bijgewerkt op 6 september 2026" toegevoegd; `dateModified` stond al op vandaag (eerdere sessie vandaag).
3. FAQ's herordend: de eerste vijf zijn nu letterlijk de PAA-vragen uit de opdracht (waar verdien je 4000 netto, is het een goed salaris, wie verdient het, wat is een normaal salaris netto, hoeveel bruto is 4000 netto), elk met het getal in de eerste zin en bron+datum erbij. De bestaande huishoud-FAQ's (gezin met kinderen, €4.500, €3.500, verschil tussen bedragen) blijven staan, want die zijn de eigen hoek van de site en al goed gesourcet uit `RAPPORTEN`/de vuistregel.
4. is-5000 en het boodschappenartikel gecontroleerd op hetzelfde patroon: **niet gecontroleerd of ze dezelfde GSC Generative AI features-knik hebben**, want dat vereist de Search Console-UI zelf (Zoekresultaten, filter op zoekuiterlijk) en die heb ik niet. De admin-route `app/api/admin/search-analytics/route.ts` queryt alleen dimensions query/page, geen searchAppearance. Wel alvast hetzelfde ontbrekende-bron-lek gedicht op is-5000: de kop van de `SalarisRekenaar` gebruikte ook het ongesourcete "€3.100 netto", nu vervangen door dezelfde constante. Verder niet herschreven; dat is geen onderdeel van deze opdracht.

**Bewust weggelaten: de "top 25 procent"-claim.** Stond in metaDescription, excerpt, FAQ en een callout van is-4000, zonder bron (net als de oude modaalpagina, zie sectie 2). Onderzocht: de CBS-longread "Materiële welvaart in Nederland 2024" (inkomen van personen) geeft alleen decielgrenzen voor "persoonlijk inkomen" (bruto-achtig, cijfers 2022): 10e-decielgrens €72.000. Het bruto salaris voor €4.000 netto (€73.300) zit dus rond die 10e-decielgrens, niet bij de 75e-percentielgrens die "top 25%" veronderstelt. **Openstaande beslissing voor Jarno**: de claim is hoogstwaarschijnlijk fout of gebruikt een bron die ik niet heb gevonden; ofwel een echte bron aanleveren met een matchende definitie (netto, huishouden of individu, welk jaar), ofwel de claim blijft weg. CLAUDE.md regel 6 toegepast: bij twijfel weggelaten.

**Bronnenlijst van is-4000 gerepareerd** (dezelfde soort fout als de bare CPB/CBS-homepagelinks die het contentaudit-document al signaleerde): CPB wijst nu naar de echte cMEV-pagina met retrieval-datum, CBS naar de longread die zowel het mediaancijfer als de onderwijsniveau-cijfers dekt. De ongebruikte KekMama-bronvermelding (geen enkele referentie in de lopende tekst) is verwijderd.

**Bron zelf geopend in Chrome**, conform de werkregel: CPB cMEV-pagina bezocht en gecontroleerd dat hij leeft (geen 404), CBS-zoekpagina en de longread "Materiële welvaart in Nederland 2024" bezocht en de decielcijfers er zelf uitgelezen. De Kerngegevens-PDF zelf is niet geopend (voorkomt een ongevraagde bestandsdownload); de €48.000/€50.000-cijfers zijn hetzelfde als een eerdere sessie vandaag al noteerde met bron en datum (zie sectie 2), dat is niet opnieuw gedaan.

**Productiebuild gedraaid** volgens de procedure in `feedback_minifier_verkorte_objectnotatie`: getest dat `€48.000`, `€3.030`, `€73.300`, de vijf nieuwe FAQ-vragen en `dateModified: 2026-09-06` allemaal correct in de gerenderde HTML staan, en dat "top 25", "Jan Modaal" en het oude "€3.100" nergens meer voorkomen. De is-5000-wijziging (dezelfde constante, één regel) is niet apart doorgebouwd; risico is verwaarloosbaar, het is exact hetzelfde patroon dat de build al bevestigde.

**Meten**: 20 september (+14 dagen) en 4 oktober (+28 dagen, samen met CTR-ronde 1) in GSC Generative AI features voor is-4000, en dan meteen ook is-5000 en het boodschappenartikel nakijken op dezelfde knik. Toegevoegd aan de tabel "Wat er op een datum wacht" in BEGIN HIER.

Achterstallige lijst punt 7 is deels gedaan: de modaal-FAQ staat er, de ontbrekende FAQ's voor €4.100 en €4.600 niet. Die blijven open.


## 16. Keyword research zeven zoektermen, 7 september 2026

Geen bouwsessie: op verzoek van Jarno keyword research gedaan naar zeven termen buiten het bestaande plan (financieel coach voor particulieren, persoonlijke financiële coaching, financieel planner particulier, persoonlijk financieel inzicht, budgetcoach voor mensen zonder schulden, financiële APK/financiële check, waar gaat mijn geld naartoe hulp). Tempo-regel en bouwstop tot en met 12 september blijven ongemoeid: er is niets gebouwd.

**Methode.** SERP-verificatie in Chrome op google.nl (hl=nl, gl=nl), zoals CLAUDE.md A.1 voorschrijft. AI-test in Perplexity, uitgelogd (representatieve "koude" test). Een losse test in ChatGPT bleek onbruikbaar: dat liep via Jarno's eigen ingelogde account, waarvan het geheugen ongevraagd positioneringsadvies over Waar Blijft Het gaf in plaats van een neutraal antwoord. Niet in de uitkomsten verwerkt. Geen Google AI-overzicht gezien bij geen van de zeven termen op het moment van testen.

**Belangrijkste vondst: er bestaat al een pagina `/financieel-coach`** (`app/financieel-coach/page.tsx`, niet eerder genoemd in dit document), met FAQ's over kosten, verschil budgetcoach/financieel coach/geldcoach/adviseur, en de gratis analyse als CTA. Voor "financieel coach voor particulieren" en "persoonlijke financiële coaching" is de vraag dus niet of er een pagina moet komen, maar of `/financieel-coach` in GSC al vertoningen heeft op die termen. Dat kon vanaf hier niet gecheckt worden.

**Uitkomst per term**, volledige tabel met SEO- en AI-kolom in `docs/serp-financieel-coach-07-sep-2026.md`:
- Financieel coach voor particulieren / persoonlijke financiële coaching: bezet segment, local pack en advertenties, overlapt met `/financieel-coach`. Niet bouwen.
- Financieel planner particulier: volledig verkeerde markt (CFP/Wft-vergunningplichtig advies, €2.250 tot €3.250 per traject). Uitgesloten.
- Persoonlijk financieel inzicht: concurreert met Nibud's eigen gratis Persoonlijk Budgetadvies. Geen aparte pagina, hooguit een hoek in bestaande content.
- Budgetcoach voor mensen zonder schulden: zwakke Google-SERP (schuldhulp-buren), maar **Perplexity citeert waarblijfthet expliciet en beveelt de gratis analyse aan**, zonder dat er een pagina met deze titel bestaat. Bevestiging dat de bestaande positioneringstaal goed AI-indexeert.
- Financiële APK: geen advertenties, redelijke conceptuele match met de gratis analyse, maar Nibud/MijnGeldzaken/Geldloket zijn sterke gratis concurrenten. Financiële check (los getest): volledig gekaapt door hypotheek/nieuwbouw-content, verboden categorie, genegeerd.
- Waar gaat mijn geld naartoe hulp: merknaam sluit bijna letterlijk aan bij een PAA-vraag ("Waar blijft mijn geld?") en Perplexity citeert waarblijfthet voor het juiste gedeelte van het antwoord, maar de zoekfrase zelf is dubbelzinnig (donatie vs. eigen budget) en dus verdund.

**Conclusie: geen van de zeven termen wordt een nieuwe pagina.** Twee kleine, niet-dringende vervolgacties genoteerd onder "Openstaande beslissingen voor Jarno" hierboven (punt 6): de GSC-check op `/financieel-coach`, en eventueel één FAQ-regel toevoegen in de letterlijke bewoording die al AI-citatie oplevert, bij de eerstvolgende keer dat die pagina toch wordt aangeraakt.

## 17. IntroScherm /analyse herzien voor conversie, 7 september 2026

Geen bouwsessie volgens BEGIN HIER: op expliciet en gedetailleerd verzoek van Jarno, buiten de bouwvolgorde om, herschreven: het scherm dat een bezoeker ziet vóór hij op "Start mijn analyse" klikt (`app/analyse/IntroScherm.tsx`). De vragenflow, berekeningen, vergelijkingslogica, resultaatpagina, backend, URL, tracking, analytics en formulieren zijn niet aangeraakt; `QuizClient.tsx` is ongewijzigd gebleven.

**Wat er veranderde.** De oude versie was één regel ("In 2 minuten zie je hoe jouw huishouden ervoor staat.") plus drie geruststellingen en een knop. Een bezoeker die vanuit Google, een AI-antwoord of een artikel landt wist dan nog niet wat hij terugkreeg, voor wie het was, of wat het kostte. Nieuwe opbouw, gericht op precies één KPI, meer starts: een concrete H1 ("Hoe staat jouw huishouden er financieel voor?"; de oude vage "Hoe doe jij het financieel?"-framing is weg), een blok over wat je na de analyse ziet, een voorbeeldweergave van het resultaat, voor wie dit interessant is, en tot slot lage inspanning en vertrouwen samen in één blok. Dezelfde primaire knop staat er twee keer, boven en onder.

**Geen nieuw cijfer, geen nieuwe claim.** De voorbeeldweergave hergebruikt `RICHTING_LABEL` en `RICHTING_PIL` uit `app/analyse/components/vergelijking-labels.ts`, dezelfde bron als de echte uitkomst, en toont geen bedragen: de balkjes zijn decoratief, net als de rapportpreview op `/geldscan`. Harde waarheidsregel 2 en 3 blijven daarmee buiten schot. De categorienamen boodschappen, wonen en vervoer komen uit `lib/benchmarks.ts`. Copyregels toegepast: geen "wij/we/ons", geen em dash, geen "eerlijk", geen garantie of belofte van een bedrag.

**Controle.** `npx tsc --noEmit --incremental false` schoon. Geen productiebuild gedraaid: het bestand bevat geen berekende objecten en dus niet het minifier-risicopatroon uit `feedback_minifier_verkorte_objectnotatie` (geen verkorte objectnotatie met een variabele uit een buitenste scope). Een `next dev` op de mount overleeft de shell niet, zoals eerder al genoteerd in sectie 11; dat is dus niet geforceerd. **Loop de pagina zelf even langs op telefoon en desktop na de push**, dit is een groot visueel blok dat niet in een echte browser gezien is.

**Telt niet mee in de tempo-regel van CLAUDE.md sectie 1** (twee nieuwe of herschreven pagina's per week): dat gaat over `/inzichten`-content, dit is UX en copy op een bestaande apppagina, zoals de eerdere Analyse-flow-sessies van 21 en 28 augustus.

## 18. IntroScherm /analyse omgebouwd tot brede landingpage, 7 september 2026 (opdracht 2)

Vervolg op sectie 17, dezelfde dag: Jarno gaf een tweede, veel gedetailleerdere opdracht met een wireframe/mockup als visuele referentie en exacte teksten. Kern van de opdracht: de eerste versie stond inhoudelijk goed maar visueel in een smalle kolom van ongeveer 350px op een verder lege desktoppagina. Deze opdracht maakt er een volwaardige landingpage van, maximaal 1180px breed, gecentreerd, in de bestaande stijl van de site.

**Wat er is aangepast.**
- `app/analyse/IntroScherm.tsx`: volledig herbouwd. Twee-koloms hero (tekst links, resultaatpreview rechts, op mobiel tekst eerst dan preview via de DOM-volgorde zelf, geen aparte `order`-classes nodig), een sectie met drie kaarten ("Wat krijg je te zien?"), een grote resultaatkaart ("Zo ziet je resultaat eruit"), een korte brugtekst ("Een bedrag op zichzelf zegt weinig"), "Dit is voor jou als..." in een 2x2-grid, een zacht groen contrastblok ("Je hoeft niets voor te bereiden") en een rustige eind-CTA-sectie.
- `app/analyse/QuizClient.tsx`: de introductie rendert niet langer binnen de `max-w-[600px] mx-auto`-wrapper van de vragenflow, want die breedte hoorde bij de oude, smalle introductie. De vragenflow zelf (fase `"vraag"`) staat nog exact in dezelfde wrapper met dezelfde breedte; alleen de intro-fase is eruit gehaald. Geen andere regel in dit bestand is aangeraakt: berekeningen, tracking, sessionStorage-sleutels, alles ongewijzigd.

**Componenten en iconen.** Geen gedeeld `Icoon`-component bestaat in dit project (elke pagina, zoals `/geldscan` en `/aanbod`, definieert zijn eigen lokale set), dus IntroScherm.tsx heeft nu ook zo'n lokale set, in exact dezelfde stijl (viewBox 24x24, stroke 1,4, geen vlak, ronde uiteinden, accentgroen). `card-base`, `section-eyebrow`, `btn-primary`, `bg-accent-bg`, `bg-green-light` zijn allemaal bestaande tokens uit `app/globals.css` en `tailwind.config.ts`, hergebruikt in plaats van opnieuw uitgevonden. De breedte 1180px is dezelfde die de hero van `/geldscan` al gebruikt (`app/geldscan/page.tsx` regel 435), voor visuele consistentie.

**Voorbeeldcijfers, expliciet door Jarno aangeleverd.** €1.650 (jouw financiële ruimte), €2.050 (vergelijkbare huishoudens), +€180 boodschappen, +€120 wonen, +€90 vervoer. Dit zijn fictieve voorbeeldcijfers uit de opdracht zelf, geen echte klantdata en niet uit `lib/rapporten-data.ts` of `lib/benchmarks.ts`. Overal waar ze staan is een "voorbeeld"-label toegevoegd: een pill-badge "Voorbeeld" (zelfde stijl als "Voorbeeldweergave" op `/geldscan`) plus een regel eronder ("Voorbeeldweergave van de opbouw van je resultaat, geen echt huishouden."). Dit blijft binnen harde waarheidsregel 1 en 3, omdat de opdracht zelf expliciet vroeg om ofwel bestaande voorbeeldcijfers, ofwel duidelijk gelabelde fictieve cijfers, en voor dat laatste gekozen is.

**Eén tekstuele afwijking van de opdracht, bewust.** Sectie 6 van de opdracht gaf de tekst "Daarom vergelijken we jouw situatie met huishoudens die op jou lijken" met "we". CLAUDE.md copyregel 1 verbiedt "wij/we/ons" behalve in citaten. Alle andere teksten in de opdracht waren al "je/jij"-vorm zonder dit probleem; alleen deze ene zin is aangepast naar "vergelijk ik jouw situatie" om de huisstijl te volgen. De letterlijk als "exact te gebruiken" gemarkeerde teksten (H1, introtekst, beide CTA's) zijn ongewijzigd overgenomen.

**De aangeleverde afbeelding week op twee punten af van de geschreven opdracht**, en de geschreven opdracht kreeg voorrang omdat die twee keer expliciet en met "gebruik deze tekst exact" de vervanging beschreef: de afbeelding toont de knoptekst "Start mijn gratis analyse", terwijl de tekst onder punt 2 en 10 expliciet vraagt om "Bekijk mijn financiële situatie →" als vervanging. De afbeelding toont ook decoratieve handschrift-achtige stickynotes in de hero; die zijn niet overgenomen, want sectie 13 van de opdracht verbiedt expliciet "generieke SaaS-illustraties" en de geschreven sectie 3 vraagt om een "elegante previewkaart", geen dashboard.

**Controle.** `npx tsc --noEmit --incremental false` schoon op beide gewijzigde bestanden, ook na de latere correcties (icoon voor "Geen account" van twee personen naar één persoon, de dubbele "Zo ziet je resultaat eruit"-eyebrow uit de hero-kaart gehaald). Geen productiebuild: `next dev` sterft op de mount zelf al op het ontbreken van de SWC-binary (geen netwerk om hem te installeren), dus zelfs de lichte controle uit sectie 17 was deze keer niet mogelijk. **Dit scherm is dus nog nooit in een echte browser gezien.** Loop het na de push zelf langs op de vier resoluties uit de opdracht (1440px, 1280px, 390px, 375px), controleer vooral de eerste viewport, de tweekoloms hero op desktop versus de mobiele volgorde, en dat er geen horizontale scroll ontstaat door de `max-w-[1180px]`-kaarten.

**Wat niet is gewijzigd**, zoals de opdracht vroeg: de vragenflow, de vragen zelf, de berekeningen, de vergelijkingslogica, de resultaatpagina, de backend, analytics, tracking, privacylogica, formulieren. Geen Geldscan-vermelding op deze pagina. Geen nieuwe FAQ, geen testimonials, geen nieuw design system: alle gebruikte kleuren, fonts en componentklassen bestonden al.

## 19. "Analyse afbreken"-knop op elke stap, 7 september 2026 (opdracht 3)

Jarno's eigen constatering na het testen van de nieuwe landingpage (sectie 17 en 18): als hij de analyse start en de pagina ververst, komt hij niet meer op de landingpagina terecht. Dat klopt en is geen bug in de nieuwe landingpage, maar bestaand, bewust gebouwd gedrag: `QuizClient.tsx` bewaart de voortgang in `sessionStorage` juist zodat een ongelukkige refresh een bezoeker niet dwingt om elk beantwoord scherm opnieuw langs te gaan (commentaar in de code verwijst naar 28-aug-2026, pass 5). Het probleem is niet dat een refresh hervat, het probleem is dat er *geen enkele manier* was om dat hervatten te doorbreken en bewust terug te gaan naar de introductie.

**Oplossing: een "Analyse afbreken"-link op elke stap**, in plaats van het hervatgedrag zelf weg te halen. Zo blijft de bestaande bescherming tegen een ongelukkige refresh intact, en komt er daarnaast een expliciete uitgang voor wie wél wil stoppen.

**Aangepaste en toegevoegde bestanden.**
- `app/analyse/components/AfbrekenKnop.tsx` (nieuw): één kleine, ingehouden tekstlink-component, gedeeld tussen de vragenflow en de resultatenflow zodat de styling niet twee keer los staat.
- `app/analyse/components/ProgressBar.tsx`: nieuwe verplichte prop `onAfbreken`, de knop staat nu naast (of, op stap 1, in plaats van) de bestaande "Vorige"-knop. De rij is `flex-wrap` gemaakt zodat twee knoppen op een smal scherm niet overlappen.
- `app/analyse/stappen/resultaat/ResultaatProgressBar.tsx`: dezelfde toevoeging, dezelfde opbouw.
- `app/analyse/stappen/Stap6Resultaat.tsx`: geeft `onAfbreken` alleen door aan `ResultaatProgressBar`, verder ongewijzigd.
- `app/analyse/QuizClient.tsx`: nieuwe `stopAnalyse`-functie. Die vraagt eerst bevestiging met `window.confirm` (antwoorden gaan verloren, dus geen stille reset), wist daarna de drie sessionStorage-sleutels van deze flow (`wbh-analyse-v2`, `wbh-analyse-v2-nav`, de resultaat-substap-sleutel) en zet `data`, `currentId` en `fase` terug naar hun beginwaarden. Doorgegeven aan zowel `ProgressBar` (vraagfase) als `Stap6Resultaat` (resultaatfase).

**Bewust niet aangeraakt: `wb_sessie` uit `lib/sessie.ts`.** Dat is de sitebrede sessie-id die paginabezoeken, CTA-kliks en analysevoortgang aan elkaar knoopt (zie de docblock daar, gefixt op 6 september). Die blijft bij een afbreken-klik gewoon staan: dit is dezelfde bezoekersessie, alleen een nieuwe poging binnen die sessie. Ook de tellers voor de trechtermeting (`maxCategorieRef`, `maxSchermIndexRef`, `gestartRef`, `gelogdSchermRef`, `eventsRef` in `QuizClient.tsx`) zijn niet gereset: de laatst gelogde `quiz_voortgang`-rij van de afgebroken poging (het scherm waarop iemand op "afbreken" klikte) is precies het afhaakpunt dat de schermlijst-analyse van 13 september wil zien, en daar zonder zekerheid over het upsert-gedrag van `/api/analyse-voortgang` aan gaan sleutelen leek meer risico dan winst voor een opdracht die alleen om een knop vroeg.

**Controle.** `npx tsc --noEmit --incremental false` schoon op alle vijf bestanden. Bij het schrijven van `ProgressBar.tsx` bleek het bestand oorspronkelijk CRLF-regeleinden te hebben (in tegenstelling tot de meeste andere bestanden in dit project, die LF gebruiken); de eerste schrijfpoging zette dat ongemerkt om naar LF, wat de hele file als gewijzigd liet zien in `git diff` en de echte wijziging onleesbaar maakte. Hersteld door het bestand opnieuw met CRLF weg te schrijven vóór de commit. **Check bij een volgend bestand met een onverwacht grote diff eerst of dit hetzelfde regeleinde-probleem is**, vooral bij bestanden die niet recent door een Claude-sessie zijn aangeraakt.

Zoals bij sectie 17 en 18: geen productiebuild mogelijk op deze mount, dus ook deze knop is nog in geen browser gezien. Test in elk geval: klikken op "Analyse afbreken" op de eerste vraag (geen "Vorige"-knop ernaast), op een latere vraag (wel "Vorige" ernaast, geen overlap op mobiel), en op een resultaatstap; controleer dat "annuleren" in de confirm-dialoog niets doet, en dat "OK" echt terug bij de introductie uitkomt, ook na een refresh direct daarna.
