# Bouwvolgorde, waar blijft het

Levend document, bijgewerkt na elke sessie. Basis: `docs/plan-seo-conversie-100-geldscans-05-sep-2026.md` en `docs/gsc-nulmeting-05-sep-2026.md`.

## BEGIN HIER

Laatst bijgewerkt: 24 september 2026 (H2, de inkomenspijler, de antwoordronde en de herbouw van de vaste-lastenpagina, sectie 29). Daarvoor 23 september 2026 (meting van de analyse en de admin, sectie 24 en 25; vraagstap gebouwd, sectie 26; privacy en over herschreven, sectie 27; gemiste zoekonderwerpen, sectie 28). Daarvoor: 6 september 2026, na zes sessies op die dag. De zesde herstelde de AI-overzicht-citatie van is-4000, zie sectie 15. Er staan lokale commits klaar die Jarno nog moet pushen. Begin met `git log --oneline -8` om te zien of dat nog klopt. **Zolang die push niet is gedaan zijn nieuwe of gewijzigde pagina's niet live** (gecontroleerd op 6 september: `/inzichten/rentevaste-periode-loopt-af-wat-nu` gaf een 404), en dus is de GSC-indiening ook niet gedaan. Zie "Openstaand aan Jarno's kant".

**Update 24 september, op verzoek van Jarno: stap 1, 2 en 3 uit sectie 28 in één keer uitgevoerd, zie sectie 29.** Twee nieuwe pagina's (H2 `gemiddelde-uitgaven-per-maand-2-personen` en de pijler `top-10-procent-inkomen-nederland`), één herbouwde pagina op dezelfde URL (`wat-zijn-normale-vaste-lasten-gezin`) en een antwoordronde op vier bestaande pagina's. **Dat breekt de tempo-regel** (twee per week): het was een expliciete opdracht van Jarno ("voer 1, 2 en 3 nu uit"). De volgende nieuwe pagina dus niet vóór 5 oktober. Geen productiebuild gedraaid; tsc is schoon. **Na de push: zeven URL's indienen in GSC**, lijst in sectie 29.

**Update 23 september, op verzoek van Jarno: de meting van de analyse gerepareerd, zie sectie 24.** Jarno zag de analyse wel geopend maar "zelden afgerond" en had geen zicht op wat er werd ingevuld. Uitgelezen in productie: **van de 43 sessies die sinds 7 september op start klikten, zagen er 34 het resultaat** (inclusief Jarno's eigen testrondes, die tot vandaag niet te onderscheiden waren). De analyse werd dus wel afgerond; de admin liet het niet zien. Drie oorzaken: "Analyses voltooid" telde alleen wie een e-mailadres achterliet, de afhaaklijst per scherm van 6 september zat in een component dat geen enkele route meer laadde, en het introscherm wordt niet gelogd. Nieuw: `/admin/analyse-verloop` (trechter van openen tot Geldscan, afhaken per scherm, herkomst, en per sessie welke schermen en antwoorden er staan). Daarnaast: het Bezoekers-tabblad bleef voor week, maand en alles op 500 hangen (een `.limit(500)` in de browser), en het Vandaag-dashboard laadde traag (vier golven queries achter elkaar, volledige tabellen opgehaald). Beide opgelost. **Jarno moet `supabase/admin_statistiek.sql` nog draaien**; de code werkt ook zonder, maar dan staat er een gele melding op Bezoekers en is quiz_voortgang nog leesbaar met de anon-sleutel. **Geen productiebuild gedraaid**, zie sectie 24.

**Tweede sessie 23 september, sectie 25:** menu heet nu "Ingevulde analyses" (standaard alles, met telling per status), een klik opent de analyse zoals de bezoeker hem zag, en er wordt nu gemeten wat er na het resultaat gebeurt (resultaatstap, bewaarformulier, e-mail, Geldscan-klik). Plus een onderzoek naar de conversie na het resultaat: `docs/conversie-na-resultaat-23-sep-2026.md`. `supabase/admin_statistiek.sql` is gedraaid (vastgesteld: quiz_voortgang is niet meer leesbaar met de anon-sleutel).

**Gevolg voor de killgrens van 19 september:** die ging uit van "analyse-afronding nul procent". Dat was een meetfout, niet de werkelijkheid. Het lek zit waarschijnlijk vóór de start (openen maar niet op start klikken) en ná het resultaat (resultaat zien maar geen e-mail en geen Geldscan). Welke van de twee groter is, laat `/admin/analyse-verloop` na de deploy zien. Kies daarna één wijziging op die plek, zoals de oorspronkelijke 13-september-actie voorschreef.

**Update 7 september, buiten deze volgorde om, drie opdrachten.** Op expliciet verzoek van Jarno gewerkt aan `/analyse`. Eerste opdracht: `app/analyse/IntroScherm.tsx` herschreven, inhoud en UX binnen de bestaande smalle kolom. Tweede opdracht, dezelfde dag: omgebouwd tot volwaardige brede landingpage (max 1180px, twee-koloms hero, resultaatpreview, kaarten), met een kleine wrapperwijziging in `QuizClient.tsx`. Derde opdracht: een "Analyse afbreken"-knop op elke stap van de vragen- en resultatenflow, want er was geen weg terug naar de introductie, ook niet via een refresh. Geen van de drie is een bouwvolgorde-item of een contentpagina, dus telt niet mee in de tempo-regel van sectie 1. Zie sectie 17, 18 en 19. Ongepusht, hoort bij dezelfde push als de rest van deze sectie.

**Vierde opdracht, zelfde dag, buiten de bouwvolgorde om.** Jarno stuurde een schermafbeelding van de destijds nog live staande versie van dit laatste deel en vroeg om exact die volgorde: "Dit is voor jou als" -> vertrouwensblok -> bruggetje "Een bedrag op zichzelf zegt weinig" -> eind-CTA, in plaats van de afdalingslogica (bruggetje eerst) uit de derde opdracht. Navraag bevestigde: de schermafbeelding is leidend, niet de eerder gegeven volgorde-redenering. Commit b1f2e56, alleen volgorde en mb-marges van drie blokken aangepast, tekst/iconen/containerbreedte ongewijzigd, tsc schoon. Ook ongepusht, hoort bij dezelfde push. **`.git/index.lock` stond opnieuw in de weg** (zie de bekende schuld hieronder over locks); dit keer opgelost zonder Jarno via `device_request_delete_permission` op de gekoppelde map, waarna `rm .git/index.lock` en meteen `git commit` werkte. Dat kan dus voortaan zonder dat Jarno het lock-bestand hoeft weg te halen.

**Update 13 september, op verzoek van Jarno, buiten de volgorde om.** Jarno leverde een SEO-contentbriefing aan voor drie Prinsjesdag-artikelen en koos expliciet voor alle drie nu, boven de schermlijst en boven H2. Artikel 1 is gebouwd en staat in sectie 20. Artikel 2 en 3 zijn voorgesteld, niet gebouwd: die wachten op Prinsjesdag en op een GSC-check. **De schermlijst-actie van 13 september uit de tabel hieronder is dus niet gedaan en schuift op**, terwijl de killgrens van 19 september wel blijft staan. Dat is een bewuste keuze van Jarno geweest, geen omissie, maar het maakt 19 september wel krap: er is dan vijf dagen minder meettijd.

**Let ook op de tempo-regel.** Met artikel 1 staat er deze week één nieuwe pagina. Komen artikel 2 en 3 er allebei bij, dan zijn het er drie in een week tegen een norm van twee. Bouw er hooguit één van de twee vóór 20 september.

**Update 13 september, tweede sessie, buiten de volgorde om, met een cannibalisatie-ontdekking.** Onafhankelijk van bovenstaande sessie kreeg deze sessie van Jarno een eigen, zeer gedetailleerde briefing: een artikel voor tweeverdienersgezinnen met een **goed inkomen** (€70.000 tot €150.000+ samen), gericht op de volledige 2027-stapeling (belasting, kindgebonden budget, kinderopvangtoeslag, zorg) in plaats van op de precieze optelsom van drie regelingen. Gebouwd en gepubliceerd: `/inzichten/wat-verandert-er-2027-gezinnen-goed-inkomen`. Bij het wegschrijven bleek dit **dezelfde dag als artikel 1 hierboven** te zijn gebouwd, met forse overlap (dezelfde drie voorbeeldinkomens, een vergelijkbare koopkracht-uitleg). `device_commit_files` weigerde terecht te overschrijven. Aan Jarno voorgelegd; **beslissing: beide artikelen blijven live, gedifferentieerd.** Mijn artikel is ingekort waar het artikel 1 dupliceerde en linkt er nu twee keer naartoe voor de precieze bedragen; artikel 1 linkt terug bij de kinderopvangtoeslag-bullet. Volledig verslag, inclusief bronnen en de FAQ-herschrijving, in sectie 21. **Dit is dus een vierde Prinsjesdag-artikel naast de drie uit de briefing hierboven, niet artikel 2 of 3** — geen inhoudelijke overlap met het voorgestelde artikel 2 (kinderopvangtoeslag 2027, sectie 20), want mijn kinderopvangtoeslag-sectie geeft bewust geen bedrag en verwijst zelf al vooruit naar zo'n apart artikel zodra de uurtarieven er zijn.

**Ook hier: geen `device_bash` deze sessie, dus geen productiebuild en geen `git add`/`commit`/`push`.** Zie sectie 21 en "Openstaand aan Jarno's kant".

**Update 13 september, derde sessie, op verzoek van Jarno: artikel 2 alsnog gebouwd, vóór Prinsjesdag.** Eerder in dit document (zie "Openstaande beslissingen voor Jarno" punt 9 en sectie 20) stond dat artikel 2, kinderopvangtoeslag 2027, niet vóór 15 september kon omdat de maximum uurtarieven er nog niet zijn. Jarno leverde een eigen, zeer gedetailleerde SEO-briefing aan en gaf expliciet opdracht om nu te schrijven en te publiceren. Gebouwd: `/inzichten/kinderopvangtoeslag-2027-tweeverdieners`. Vol verslag, bronnen en de precieze getallen in sectie 22.

De maximum uurtarieven 2027 staan inderdaad nog niet vast (bevestigd op de Belastingdienst-pagina zelf), maar de **percentages** uit het ontwerpbesluit staan wel al vast: die zijn niet ontdekt via de briefing maar via eigen onderzoek in de browser, rechtstreeks bij de bron (internetconsultatie.nl, de gesloten consultatie "Wijziging Besluit kinderopvangtoeslag", met de concept Nota van Toelichting). Twee getallen uit de aangeleverde briefing zijn daardoor **niet** gebruikt omdat ze niet te verifiëren waren: de inkomensgrens €187.802 en het indicatieve ingroeipadbedrag €83.800. In plaats daarvan staan in het artikel de wel geverifieerde omslagpunten €56.412 (nu) en €87.767 (ontwerp 2027), en de vaste voet 36,5 naar 42,9 procent. Zie sectie 22 voor de volledige onderbouwing.

**Tempo-regel:** dit is de derde of vierde nieuwe pagina deze week (zie ook de aantekeningen bij de twee eerdere Prinsjesdag-artikelen hierboven), tegen een norm van twee. Ook dit was een expliciete, herhaalde keuze van Jarno op dezelfde dag, niet een omissie.

**Zelfde beperking als de twee sessies hierboven: geen `device_bash`, dus geen productiebuild en geen `git add`/`commit`/`push`.** Zie "Openstaand aan Jarno's kant" en sectie 22.

**Update 13 september, vierde sessie, op verzoek van Jarno: gerichte CRO/UX-pas op de twee bestaande artikelen `wat-verandert-er-2027-gezinnen-goed-inkomen` en `tweeverdieners-2027-erop-achteruit`.** Geen herschrijving: bestaande cijfers, bronnen, SEO-targeting, URL's en interne links ongewijzigd. Wijzigingen, alleen gericht op scanbaarheid, conversie naar de gratis analyse en mobiele UX:

- Artikel 1: de drie voorbeeldhuishoudens (€70k/€100k/€140k) omgezet van lopende tekst naar kaarten (profiel, inkomen, effecten, "wat dit vooral laat zien"), direct daarna één nieuwe CTA-kaart ("En hoe zit dat bij jullie?" → `/analyse`). De samenvattingstabel bovenaan krijgt op mobiel dezelfde rijen als stapelbare kaarten in plaats van een samengeperste tabel (desktop houdt de tabel).
- Artikel 2: `Tweeverdieners2027Rekenaar` (met een korte inleidende zin) naar vroeg in het artikel verplaatst, direct na de uitleg van de hoofdconclusie en vóór de diepgaande CBS/regelingen-secties. De rekenaar had al een ingebouwde CTA-brug erna; die copy is aangepast naar "Dit laat zien wat er ongeveer verandert" / "Maar het vertelt nog niet waarom..." / knoptekst "Vergelijk jullie huishouden" (zelfde `/analyse`-link, zelfde component, dus geldt voor elke pagina die dit component ooit hergebruikt). De profielenvergelijkingstabel krijgt dezelfde desktop-tabel/mobiel-kaarten behandeling als artikel 1.
- Beide artikelen: eind-slotblok kreeg een analyse-CTA-kaart ("Wil je weten wat dit bij jullie thuis betekent?" → "Vergelijk jullie huishouden" → `/analyse`) vóór de bestaande Geldscan-tekstlink, die ongewijzigd blijft staan. Daarmee blijven beide artikelen op precies twee prominente analyse-CTA's (CLAUDE.md sectie 5 punt 3): de nieuwe kaart halverwege/na de rekenaar, en de nieuwe kaart in het slotblok. De generieke "vroege CTA-kaart" uit de briefing is bewust **niet** als derde, apart element toegevoegd, om die 2-CTA-grens niet te doorbreken; de kaart-na-voorbeelden (artikel 1) en de vervroegde rekenaar (artikel 2) vervullen die rol al.
- Tijdens het wegschrijven bleek dat beide bestanden sinds het begin van de sessie waren gewijzigd (een nieuwe link naar het inmiddels gebouwde `kinderopvangtoeslag-2027-tweeverdieners`, zie de sessie hierboven). Beide nieuwe versies zijn opnieuw opgebouwd bovenop die actuele inhoud; niets van die eerdere sessie is overschreven.
- Alle drie bestanden zijn met esbuild (JSX/TSX-parse) gecontroleerd, geen `tsc` beschikbaar in deze sessie.

**Ook hier: geen `device_bash` deze sessie (de map-mount is stuk sinds 8 september, zie de openstaande schuld hieronder), dus gewerkt via stage/commit en geen productiebuild en geen `git add`/`commit`/`push`.** Draai bij de eerstvolgende sessie met `device_bash` in elk geval `npx tsc --noEmit --incremental false` op deze drie bestanden en commit/push de wijziging.

**Update 18 september, op verzoek van Jarno: de Prinsjesdagherziening is gedaan.** Alle vier de
2027-artikelen staan nu op de definitieve cijfers uit de Miljoenennota, de SZW-begroting 2027, de
Fiscale sleuteltabel 2027 en de Macro Economische Verkenning. Er staat geen uitgelekt en geen
geraamd cijfer meer in, behalve de zorgpremie, en die is als raming gelabeld tot uiterlijk
12 november. Zes dingen bleken anders dan we op 13 september hadden geraamd, waarvan er drie de
bedragen fors verlagen; het volledige verslag met bron en paginanummer staat in sectie 23. De
kernvondst van artikel 1 blijft overeind: het huishouden in het midden raakt het meeste kwijt. De
bedragen gaan van €38/€94/€51 naar €40/€84/€40 per maand. **Er is geen productiebuild gedraaid**:
`tsc` is schoon op de hele repo, maar `next build` past niet in de tijdslimiet van de shell op dit
apparaat. Draai hem lokaal vóór de push, en dien daarna de vijf gewijzigde URL's opnieuw in bij GSC.

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
| ~~13 september~~ | ~~Schermlijst lezen in het funneltabblad.~~ **Kon niet: dat tabblad werd door geen route geladen. Vervangen door `/admin/analyse-verloop` op 23 september, zie sectie 24.** |
| 30 september | Eerste week van de **vraagstap** (gebouwd 23 september, sectie 26). Op Ingevulde analyses: van wie resultaatstap 3 zag, hoeveel kozen een vraag, hoeveel verstuurden er een, hoeveel sloegen over? Op Vandaag: is elke vraag binnen 2 werkdagen beantwoord? |
| 14 oktober | Drie weken vraagstap. Meer dan 1 op 10 die stap 3 zag verstuurt een vraag? Zo niet: kop of voorgekozen vragen aanpassen, niet het idee. |
| Na 20 beantwoorde vragen | Stopcriterium: minder dan 2 Geldscans binnen 30 dagen na een antwoord, dan kijken of de antwoorden te volledig zijn of de stap de verkeerde mensen trekt. |
| 15 september | Prinsjesdag. De maximum uurtarieven kinderopvang 2027 en het definitieve eigen risico komen die dag naar buiten. Dat zijn de twee cijfers waar artikel 2 op wacht, zie sectie 20. |
| ~~16 september~~ | ~~De vier geraamde constanten in `lib/kindgebonden-budget.ts` vervangen.~~ **Gedaan op 18 september, zie sectie 23.** Het werden er zeven, want ook de afbouwpunten en het knikpunt klopten niet. |
| ~~16 september~~ | ~~`lib/prinsjesdag-2027.ts` bijwerken.~~ **Gedaan op 18 september, zie sectie 23.** €38, €94 en €51 klopten inderdaad niet meer en staan nu op €40, €84 en €40, in de metaTitel, het excerpt en de preview. |
| ~~19 september~~ | ~~Killgrens: is de analyse-afronding nog nul procent, dan stopt alle contentbouw.~~ **Op 23 september bleek de nul een meetfout: 34 van de 43 starters zagen het resultaat. Zie de update bovenaan en sectie 24.** |
| 20 september | **+14 dagen op de is-4000 AI-overzicht-fix van 6 september** (sectie 15): GSC Generative AI features nakijken, en meteen is-5000 en het boodschappenartikel controleren op dezelfde knik, want dat kon deze sessie niet vanaf hier. |
| 11 oktober | Meetpunt `tweeverdieners-2027-erop-achteruit`, 28 dagen na publicatie. Vertoningen en positie op "tweeverdieners 2027" en "wat verandert er voor tweeverdieners 2027". Kijk meteen of Z4 op die tweede term zijn plek houdt of dat de twee elkaar in de weg zitten; dat is het kannibalisatierisico uit sectie 20. |
| 4 oktober | CTR-ronde 1 meten, de vijf URL's uit sectie 1. Meteen ook: houdt is-4000 de modaalvertoningen vast (+28 dagen op de fix van 6 september, sectie 15), pakt `waarom-hou-ik-nooit-geld-over` de 15 vertoningen van de 301 op, en wat doet H1 na vier weken. Plus de beslissing over `wat-zijn-normale-vaste-lasten-gezin`, zie hieronder. |
| 5 november | **Meetpunt N5**, de Engelse pagina: haalt hij meer dan 100 vertoningen per week in GSC? Zo niet, dan blijft het bij deze ene Engelse pagina en komt er geen tweede. Nulmeting op 6 september: 1 vertoning in 90 dagen op alles met "salary" erin. |
| 5 december | **Meetpunt N1 tot N4**, 90 dagen na publicatie. Een pagina met minder dan 20 vertoningen per maand en geen externe links gaat mee in de contentkill van CLAUDE.md sectie 9. Let vooral op N4: die deelt taalgebied met de twee coach-pagina's. |
| 1 november | Killgrens uit plan sectie 9: onder 3.000 sessies per maand of onder 5 betaalde Geldscans gaan clusters L en B in de wacht. |
| 12 november | Z1 zorgpremie 2027 bouwen, als de premies bekend zijn. |
| 12 november | **En in dezelfde beurt: de zorgpremie in `lib/prinsjesdag-2027.ts`.** `ZORG_2027.nominalePremiePerJaar2027` (€2.029) en `premiePerMaand2027` (€169) zijn de raming van VWS. Vervang ze door de werkelijke gemiddelde premie en haal de raming-zin uit de vier 2027-artikelen. |
| 12 december | **Meetpunt vierde artikel** (`wat-verandert-er-2027-gezinnen-goed-inkomen`), 90 dagen na publicatie, zie sectie 21. Los van het 11-oktobermeetpunt van artikel 1 hierboven: controleer hier of het vierde artikel en artikel 1 op verschillende zoektermen scoren (de differentiatie werkte) of elkaar toch in de weg zitten (dan alsnog samenvoegen). |
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

9. **Artikel 2 is inmiddels gebouwd (derde sessie, 13 september), artikel 3 nog niet.** Artikel 2 (kinderopvangtoeslag 2027) stond hier als "kan niet vóór 15 september", maar is op jouw expliciete verzoek toch gebouwd op basis van het ontwerpbesluit, zie de update bovenaan en sectie 22. Artikel 3 (inkomensafhankelijke combinatiekorting 2027) vraagt nog steeds eerst een GSC-filter, want het overlapt met artikel 1 (`tweeverdieners-2027-erop-achteruit`, die de IACK al behandelt). Wacht op jouw akkoord.

10. ~~**De metaTitel van het nieuwe artikel bevat bedragen die niet meelopen met de rekenlaag.**~~ **Afgehandeld op 18 september.** De titel staat nu op "Tweeverdieners 2027: €40 tot €84 per maand minder". Het risico blijft bestaan: elke keer dat de rekenlaag verandert, moeten metaTitel, excerpt en preview met de hand mee. Dat geldt ook voor het kindgebonden budget-artikel en het kinderopvangtoeslag-artikel.

11. **Er is deze sessie geen productiebuild gedraaid, en dat kon ook niet.** De mount naar de projectmap werkt sinds een Windows-update van 8 september niet meer vanuit `device_bash`: "no Plan9 drive shares mounted". Daardoor is de tar-route uit `feedback_minifier_verkorte_objectnotatie` onbruikbaar, want stap 1 daarvan draait op het device. Wat wel is gedaan: `tsc --strict` schoon op de drie nieuwe bestanden, de rekenlaag daadwerkelijk uitgevoerd zodat de bedragen uit de echte functies komen en niet uit een handmatige narekening, en alle objectvelden expliciet uitgeschreven zodat het minifier-patroon er niet in zit. **Draai de build alsnog vóór de push.**
12. **Vierde Prinsjesdag-artikel, uit een tweede, gelijktijdige sessie, zie sectie 21.** `/inzichten/wat-verandert-er-2027-gezinnen-goed-inkomen`, over de volledige 2027-stapeling voor gezinnen met een goed inkomen. Overlapte bij het schrijven met artikel 1 hierboven; opgelost door beide te differentiëren (Jarno's beslissing, sectie 21). Zelfde beperking als bij artikel 1: geen `device_bash`, dus geen productiebuild en geen commit/push gedaan. **Wanneer artikel 2 (kinderopvangtoeslag 2027) later wordt gebouwd: dit vierde artikel heeft al een kinderopvangtoeslag-sectie die bewust ondiep blijft (geen bedrag, expliciete verwijzing naar "een apart artikel zodra de tarieven bekend zijn") — artikel 2 kan er gewoon overheen gebouwd worden, met een link terug vanuit dit vierde artikel.**

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
5. **`git add`/`commit`/`push` voor het vierde artikel (13 september, sectie 21), los van de commit voor artikel 1 hierboven.** Kon niet vanuit deze sessie, `device_bash` is stuk. Bestanden: `lib/inzichten-data.ts` (bevat inmiddels beide nieuwe entries), `app/inzichten/[slug]/ArticleBody.tsx` (bevat beide nieuwe koppelingen), `app/inzichten/[slug]/content/wat-verandert-er-2027-gezinnen-goed-inkomen.tsx` (nieuw), `app/inzichten/[slug]/content/tweeverdieners-2027-erop-achteruit.tsx` (alleen de kruislink toegevoegd, verder ongewijzigd t.o.v. sectie 20), `app/inzichten/[slug]/content/wat-geeft-een-gezin-uit-per-maand.tsx` en `is-4000-euro-netto-goed-salaris-nederland.tsx` (inkomende links). Draai eerst een echte `npx tsc --noEmit --incremental false` en productiebuild.
6. Na de deploy: `/inzichten/wat-verandert-er-2027-gezinnen-goed-inkomen` indienen in GSC en de kruislink met artikel 1 in beide richtingen controleren.
7. **`git add`/`commit`/`push` voor artikel 2 (derde sessie, 13 september, sectie 22), los van de twee commits hierboven.** Kon niet vanuit deze sessie, `device_bash` is nog steeds stuk. Bestanden: `lib/inzichten-data.ts` (nieuwe entry vooraan), `lib/kinderopvangtoeslag-2027.ts` (nieuw), `components/artikel/KinderopvangtoeslagRekenaar.tsx` (nieuw), `app/inzichten/[slug]/ArticleBody.tsx` (nieuwe koppeling), `app/inzichten/[slug]/content/kinderopvangtoeslag-2027-tweeverdieners.tsx` (nieuw), `app/inzichten/[slug]/content/wat-verandert-er-2027-gezinnen-goed-inkomen.tsx` en `tweeverdieners-2027-erop-achteruit.tsx` (kruislink toegevoegd, verder ongewijzigd). Draai eerst een echte productiebuild, niet alleen `tsc`; de rekenlaag in `lib/kinderopvangtoeslag-2027.ts` is deze sessie wel echt gecompileerd en met Node uitgevoerd (zie sectie 22), maar dat verving geen productiebuild.
8. Na de deploy: `/inzichten/kinderopvangtoeslag-2027-tweeverdieners` indienen in GSC, en de kruislinks met `wat-verandert-er-2027-gezinnen-goed-inkomen` en `tweeverdieners-2027-erop-achteruit` in beide richtingen controleren.
9. **Geen inkomende link vanuit de hub** (`wat-geeft-een-gezin-uit-per-maand`, CLAUDE.md werkregel 5) toegevoegd deze sessie, uit tijdsoverweging. De twee kruislinks met de andere 2027-artikelen zijn er wel. Overweeg een link vanuit de hub bij de eerstvolgende keer dat die pagina wordt aangeraakt.
10. **Zodra de maximum uurprijzen 2027 bekend zijn (na Prinsjesdag of bij het definitieve Besluit kinderopvangtoeslag 2027):** `MAX_UURPRIJS_2027_GERAAMD` in `lib/kinderopvangtoeslag-2027.ts` vervangen door de echte, vastgestelde bedragen, het raming-label in het artikel en de rekenaar aanpassen, en `gewijzigd` op die dag zetten.

### Bekende schuld

- ~~De anon-rol mag `quiz_voortgang` nog lezen.~~ Opgelost op 23 september: `supabase/admin_statistiek.sql` is gedraaid, een anonieme lezing geeft nu nul rijen.
- De drie opvolgmails na de analyse (CLAUDE.md sectie 5, dag 0, 3 en 8) zijn nooit gebouwd; alleen de resultaatmail bestaat. Staat als wijziging 4 in `docs/conversie-na-resultaat-23-sep-2026.md`.
- **De resultaatmail (`/api/send-resultaat`) breekt copyregels**: "Dit patroon is om te buigen", "structureel minder", "het ligt niet aan jou", en een verdict ("Je doet het goed") dat niet meer overeenkomt met de conclusies op het resultaatscherm. Die mail gaat ook naar iedereen die het bewaarformulier gebruikt. Herschrijven bij de eerstvolgende sessie aan de mails.
- ~~De privacypagina~~ Herschreven op 23 september, zie sectie 27.
- **Twee privacyzinnen elders kloppen niet met wat de code doet.**
  - `app/aanbod/components/AanbodAccordion.tsx` zegt "er blijft niets bewaard".
  - De bevestigingsmail in `app/api/send-intake-bevestiging/route.ts` zegt "direct na het versturen verwijder ik je afschriften en gegevens".

  In werkelijkheid blijven de aanvraag, de anonieme analyse-antwoorden en een eventuele uitkomst met e-mailadres bewaard; alleen de afschriften verwijdert Jarno met de hand. Gelijktrekken met de privacypagina bij de eerstvolgende keer dat die bestanden worden aangeraakt.
- `app/admin/AdminClient.tsx`, `app/admin/components/FunnelTabblad.tsx` en `OverzichtTabblad` via AdminClient zijn dode code sinds de zijmenu-shell van 30 juli. Verwijderen kan pas als Jarno de verwijderpermissie geeft; tot die tijd niet meer aan bouwen.
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

## 20. Prinsjesdag-artikel 1: tweeverdieners in 2027, 13 september 2026

Op verzoek van Jarno, met een aangeleverde contentbriefing voor drie artikelen.
Buiten de bouwvolgorde om; de vier keuzes vooraf staan in de kop van BEGIN HIER.

**Gepubliceerd: `/inzichten/tweeverdieners-2027-erop-achteruit`.**
metaTitel: "Tweeverdieners 2027: €38 tot €94 per maand minder" (48 tekens).

### Waarom een nieuwe pagina en geen upgrade

`tweeverdieners-toch-krap` bestaat al (58 vertoningen, positie 14,07) en Z4 stond
op 13 september al op de eerste pagina van "wat verandert er voor tweeverdieners
2027". Dat is precies de situatie waarin werkregel 8.A.2 zegt: upgraden, niet
bouwen. Toch is het een nieuwe pagina geworden, om twee redenen:

- `tweeverdieners-toch-krap` staat op een klacht ("waarom voelt het krap"), niet
  op een regelverandering. Die twee zoekmomenten door elkaar halen kost de
  bestaande pagina zijn intentie.
- Z4 gaat over één regeling, de nieuwe pagina telt er drie bij elkaar op. De
  scheiding in één zin staat in `docs/serp-prinsjesdag-13-sep-2026.md`.

De twee pagina's linken naar elkaar, en dat zijn meteen de twee verplichte
inkomende links uit werkregel 8.B.5, in dezelfde deploy.

**Dit blijft het grootste risico van deze sessie.** Als de vertoningen op "wat
verandert er voor tweeverdieners 2027" na vier weken van Z4 naar de nieuwe pagina
schuiven zonder dat het totaal stijgt, dan is dit kannibalisatie geweest en had
Z4 uitgebreid moeten worden. Meetpunt staat op 11 oktober in de datumtabel.

### Wat er is gebouwd

- `lib/prinsjesdag-2027.ts` (nieuw). Eén bron voor de IACK, de zorgcijfers, de
  CPB- en CBS-cijfers en de drie voorbeeldhuishoudens. Het kindgebonden budget
  zit er bewust niet in: dat komt via een import uit `lib/kindgebonden-budget.ts`,
  zodat er geen tweede waarheid over dezelfde regeling ontstaat.
- `components/artikel/Tweeverdieners2027Rekenaar.tsx` (nieuw). Het verplichte
  interactieve element (8.C.9). Geen bruto-netto-rekenaar, die staan op de
  niet-bouwen-lijst.
- `app/inzichten/[slug]/content/tweeverdieners-2027-erop-achteruit.tsx` (nieuw).
- `lib/inzichten-data.ts`: entry vooraan, met `cta`, vijf FAQ's op geoogste
  PAA-vragen en vijf bronnen met ophaaldatum.
- `app/inzichten/[slug]/ArticleBody.tsx`: import en map.
- `tweeverdieners-toch-krap` en `kindgebonden-budget-2027-inkomensgrens`: elk een
  link naar de nieuwe pagina, allebei met `gewijzigd: "2026-09-13"`.
- `docs/serp-prinsjesdag-13-sep-2026.md` (nieuw): de SERP-verificatie.

### De uitkomst die het artikel draagt

Doorgerekend voor drie gezinnen met twee kinderen, alle bedragen uit de echte
functies en niet met de hand nagerekend:

| Huishouden | Kindgebonden budget | Combinatiekorting | Zorg | Samen per maand |
|---|---:|---:|---:|---:|
| Samen €70.000 (€45.000 + €25.000) | €191 | niets | €270 | **€38** |
| Samen €100.000 (twee keer modaal) | €510 | €346 | €270 | **€94** |
| Samen €140.000 (€85.000 + €55.000) | niets | €346 | €270 | **€51** |

**Het huishouden in het midden raakt het meeste kwijt, niet het hoogste.** Stel C
is het kindgebonden budget al kwijt en kan het niet nog een keer verliezen. Dat
is de kop van het artikel geworden, en het is precies wat de briefing vroeg: niet
schrijven dat iedereen er honderden euro's op achteruitgaat.

**De tweede vondst is de combinatiekorting.** Die hangt aan het arbeidsinkomen van
de minstverdienende partner, en de afbouw haalt van het *maximum* af. Verdient
die partner minder dan €30.400, dan zit hij onder dat maximum en kost de eerste
stap niets. Twee gezinnen met hetzelfde gezamenlijke inkomen raken dus een
verschillend bedrag kwijt, afhankelijk van de verdeling. Dat staat op geen van de
concurrerende pagina's van deze week en is de reden dat de rekenaar twee
inkomensvragen stelt in plaats van één.

Let op het verschil tussen twee IACK-getallen die allebei kloppen: **€346** is wat
de maatregel kost (2027 mét naast 2027 zónder, dezelfde methode als bij het
kindgebonden budget) en **€261** is wat je op je aanslag ziet, want de indexatie
geeft een deel terug. Het artikel noemt ze allebei en legt het verschil uit. Haal
ze niet door elkaar bij de herziening op 16 september.

### Wat er is gecorrigeerd

1. **De briefing zei 87,5 procent tweeverdieners in de hoogste 20 procent van de
   inkomens. Dat is 87 procent.** 87,5 is het tiende deciel alleen; het CBS
   schrijft over de hoogste twintig procent zelf "87 procent". De pagina gebruikt
   87 en noemt de grens erbij (€126.700).
2. **De briefing vroeg om "twee inkomens rond modaal" als Stel A en €100.000 als
   Stel B. Dat is in 2027 hetzelfde huishouden**, want het CPB zet bruto modaal
   2027 op €50.000. Stel A is daarom een anderhalfverdiener geworden (€70.000) en
   Stel B is twee keer modaal. Zo dekken de drie profielen een echt bereik.
3. **De briefing noemde CPB min 0,3 procent en "ongeveer min 0,1 procent na de
   recente koopkrachtmaatregelen" naast elkaar.** Dat zijn twee ramingen van
   verschillende datum en verschillende status. Het artikel zet ze los van elkaar
   en zegt erbij dat de tweede uit stukken komt die de NOS heeft ingezien.
4. **De cao-loongroei van 4,2 procent uit sectie 4 is 2026, niet 2027.** Voor 2027
   raamt het CPB 3,8 procent. Het artikel gebruikt 3,8.

### Openstaande schuld van deze pagina

- Geen productiebuild gedraaid, zie punt 11 bij de openstaande beslissingen.
- De pagina is in geen enkele browser gezien, ook niet op mobiel. De tabel heeft
  vijf kolommen en zit in een `overflow-x-auto`, maar dat is niet getest.
- De regel "Cijfers bijgewerkt op 13 september 2026" staat er wel, en dat mag:
  alle vijf bronnen zijn deze sessie zelf geopend.

### Wat artikel 2 en 3 zouden moeten zijn

Jarno vroeg om een voorstel; de briefing beschreef alleen artikel 1. Beide zijn
geverifieerd op google.nl, uitkomsten in `docs/serp-prinsjesdag-13-sep-2026.md`.

**Artikel 2: kinderopvangtoeslag 2027.** Dit is Z3 uit het plan, score 26, en het
is de derde grote regeling voor precies deze doelgroep. De SERP is Rijksoverheid
plus commerciële blogs (Kek Mama, Kinderopvang-Wijzer, DebiCare), geen
AI-overzicht, geen eigen URL, en "Mensen zoeken ook naar" staat vol rekenintentie:
tabel, berekenen, uurtarief, tweede kind. Niemand rekent het per huishouden uit.

*Kan niet vóór 15 september.* De maximum uurtarieven voor 2027 waren op 31
augustus nog niet bekend en komen op Prinsjesdag. Zonder die drie bedragen
(dagopvang, bso, gastouder) is er niets te rekenen. En houd de waarschuwing uit
sectie 4 vast: **de afschaffing van de toeslag is 2029, niet 2027.** In 2027 gaat
alleen het vergoedingspercentage omhoog. Wie die twee door elkaar haalt schrijft
een fout artikel.

**Artikel 3: inkomensafhankelijke combinatiekorting 2027.** Niet in het plan, maar
de SERP van deze sessie vraagt erom. Op "inkomensafhankelijke combinatiekorting
2027 afgebouwd" staan alleen adviseurs en de Belastingdienst, met de regel maar
zonder de gevolgen, en de PAA vraagt letterlijk "Wordt de IACK vanaf 2027
afgebouwd?", "Tot wanneer heb ik recht op de IACK?" en "Wanneer stopt de IACK?".
De rekenlaag ligt er al: `berekenIack` en `iackVerlies` in
`lib/prinsjesdag-2027.ts` kunnen de hele afbouwreeks tot en met 2035 tekenen, en
dat is precies de vraag die niemand beantwoordt.

*Doe eerst de GSC-check.* Deze pagina overlapt met artikel 1, dat de IACK ook
uitlegt. De scheiding zou moeten zijn: artikel 1 telt drie regelingen op voor een
huishouden, artikel 3 beantwoordt één vraag over één regeling over negen jaar.
Dat is dezelfde scheiding als tussen artikel 1 en Z4, dus hij is houdbaar, maar
filter GSC eerst op "inkomensafhankelijke combinatiekorting" en "combinatiekorting
2027" en kijk of artikel 1 daar zelf al op vertoont. Vertoont het, dan upgraden.

**Niet doen: een eigen pagina op "koopkracht 2027" of "koopkracht tweeverdieners
2027".** Dat blijft de conclusie van 6 september, en de SERP van vandaag bevestigt
hem: RTL, NOS, Hart van Nederland, Metro en PowNed, allemaal nieuws van twee dagen
oud. Dat is een ander zoekmoment dan iemand die de analyse invult. Z1 zorgpremie
staat al op 12 november in de datumtabel en hoort daar te blijven, want de
premies zijn eerder niet bekend.

## 21. Vierde Prinsjesdag-artikel: gezinnen met een goed inkomen, plus differentiatie van artikel 1, 13 september 2026

Op expliciet en zeer gedetailleerd verzoek van Jarno, buiten de bouwvolgorde om (die zelf voor 13 september "eerst het lek, dan pas de tweede hub" voorschreef; expliciet verzoek gaat voor). Deze sessie kreeg, onafhankelijk van de sessie in sectie 20, een eigen briefing voor een artikel over de financiële gevolgen van Prinsjesdag 2026 voor tweeverdienersgezinnen met een gezamenlijk inkomen van ongeveer €70.000 tot €150.000+. Centrale lezersvraag: "we verdienen samen goed, wat verandert er voor ons in 2027 en merken we dat echt".

**Gepubliceerd: `/inzichten/wat-verandert-er-2027-gezinnen-goed-inkomen`.** metaTitel: "2027: wat verandert er voor gezinnen met een goed inkomen?" (58 tekens).

### Cijfers en bronnen

Alles met ophaaldatum 13 september 2026, dus vóór Prinsjesdag (15 september) en overal expliciet als raming of gelekt gelabeld:

- Kindgebonden budget: de nieuwe tweede afbouwschijf, via `lib/kindgebonden-budget.ts` (bestond al, van Z4/sectie 15). Hergebruikt, geen tweede waarheid over dezelfde regeling gemaakt.
- Kinderopvangtoeslag: vergoeding eerste kind naar 96 procent (Blue Accountants), nog geen wetsvoorstel. De enige overwegend positieve verandering in het pakket, en daarom een eigen sectie. **Bewust geen bedrag per maand genoemd**, want de maximumuurtarieven voor 2027 stonden nog niet vast — de pagina verwijst zelf naar een toekomstig apart artikel zodra dat wel zo is (zie de aantekening bij artikel 2 in sectie 20 en bij "Openstaande beslissingen voor Jarno" punt 12).
- Inkomstenbelasting: tabelcorrectiefactor 2027-2028 beperkt toegepast (Salaris Vanmorgen 12-sep, Grant Thornton), "vrijheidsbijdrage" geschrapt ten gunste van een hogere arbeidskorting.
- Koopkracht: dezelfde gelekte Prinsjesdagcijfers als artikel 1 (Salaris Vanmorgen 12-sep, onafhankelijk nogmaals bevestigd bij NOS 11-sep): gemiddeld min 0,1 procent, min 0,2 procent hogere inkomens en werkenden, plus 0,2 procent minima, plus 0,3 procent gepensioneerden.
- Zorgpremie en eigen risico: bewust **niet** op één cijfer gezet, want de bronnen spreken elkaar tegen (zorgpremie circa €170 tot €200 per maand, eigen risico €385 of €400). Dat verschil staat met zoveel woorden op de pagina.

### Wat er is gebouwd

- Nieuwe `Artikel`-entry in `lib/inzichten-data.ts`: titel, korteTitel, metaTitel, metaDescription (151 tekens), 5 FAQ's, 6 externe bronnen met ophaaldatum, preview type "pijn". Categorie "Toeslagen" (bewust een andere categorie dan artikel 1's "Tweeverdieners").
- Nieuwe contentcomponent `app/inzichten/[slug]/content/wat-verandert-er-2027-gezinnen-goed-inkomen.tsx`.
- `app/inzichten/[slug]/ArticleBody.tsx`: import en contentMap-regel.
- Inkomende links: vanaf de H1-hub `wat-geeft-een-gezin-uit-per-maand.tsx` (eerste item in `spaken`) en vanaf `is-4000-euro-netto-goed-salaris-nederland.tsx` (nieuwe alinea na de bestaande KGB-link).

### De cannibalisatie-ontdekking en de oplossing

Bij het wegschrijven weigerde `device_commit_files` twee bestanden (`lib/inzichten-data.ts`, `ArticleBody.tsx`): dezelfde dag was, in de sessie van sectie 20, al `tweeverdieners-2027-erop-achteruit` toegevoegd. Overlap was fors: zelfde drie voorbeeldinkomens (€70.000/€100.000/€140.000), een vergelijkbare "waarom zegt koopkracht weinig"-uitleg, beide met kans om op dezelfde zoekintentie te ranken. Niet blind overschreven; voorgelegd aan Jarno.

**Beslissing van Jarno: beide artikelen blijven live, gedifferentieerd.** Uitgevoerd:

1. Mijn artikel ingekort waar het artikel 1 dupliceerde: de bulletlijst met drie exacte belastingvoorbeelden geschrapt (één korte alinea over de richting in de plaats), de "drie voorbeelden"-sectie fors ingekort met een link naar artikel 1 voor het exacte bedrag per maand, en de "waarom zegt koopkracht weinig"-sectie verkort met dezelfde verwijzing.
2. Mijn artikel gepositioneerd als de brede oriëntatiepagina: het enige van de twee dat ook kinderopvangtoeslag (positief), inkomstenbelasting/indexatie en "wat kun je nu al doen" behandelt. Artikel 1 blijft de precieze rekenpagina met de IACK-nuance (verdeling van het inkomen over de partners, niet de som) en de eigen rekenaar.
3. Twee FAQ's herschreven zodat ze niet meer op dezelfde formulering als artikel 1 concurreren: "Gaan gezinnen met een goed inkomen er in 2027 op achteruit?" werd "Wat betekent Prinsjesdag 2026 voor gezinnen met een goed inkomen?", en "Wat verandert er in 2027 voor tweeverdieners?" werd "Welke onderdelen van het pakket raken een gezin met een goed inkomen het meest?".
4. Wederzijdse interne links: mijn artikel linkt twee keer naar artikel 1 (bij koopkracht en bij de drie voorbeelden); artikel 1 linkt terug bij de kinderopvangtoeslag-bullet in "wat kun je zelf doen", met een korte toelichting dat dat percentage juist omhoog gaat.

**Verband met het voorgestelde artikel 2 (kinderopvangtoeslag 2027, sectie 20).** Geen conflict: mijn kinderopvangtoeslag-sectie geeft bewust geen bedrag en verwijst zelf al vooruit naar een toekomstig apart artikel. Wie artikel 2 bouwt, kan er gewoon overheen bouwen en er een link vanuit dit artikel naartoe zetten.

### Controle

Geen werkende `device_bash` deze sessie (net als bij artikel 1), dus geen `tsc`/productiebuild op het project zelf. In plaats daarvan een geïsoleerde `npx tsc --noEmit` tegen een kopie van het project met de echte, ongewijzigde versies van alle werkelijk geïmporteerde bestanden (`lib/kindgebonden-budget.ts`, `lib/cta.ts`, `lib/prinsjesdag-2027.ts`, `lib/rapporten-data.ts`, `components/CtaLink.tsx`, `components/artikel/Tweeverdieners2027Rekenaar.tsx`) plus de volledige, gewijzigde `lib/inzichten-data.ts` en beide contentcomponenten: schoon, geen fouten. Haakjes/accolade-balans en null-byte-check op alle gecommitte bestanden: in orde. Alle bestanden geschreven met een `expectedMtimeMs`-guard op de laatst bekende device-mtime; `device_commit_files` accepteerde ze zonder afwijzing.

**Nog open, zie ook "Openstaand aan Jarno's kant" punt 5 en 6, en de datumtabel op 12 december.** Geen `git add`/`commit`/`push` deze sessie: `device_bash` gaf "no Plan9 drive shares mounted" (zelfde Windows-update-probleem als bij artikel 1). Jarno moet zelf committen en pushen, en vóór de deploy alsnog een echte `npx tsc --noEmit --incremental false` en productiebuild draaien.


## 22. Kinderopvangtoeslag 2027 voor tweeverdieners, derde sessie 13 september 2026

Op expliciet verzoek van Jarno, met een eigen, zeer gedetailleerde SEO-briefing, los van en na de sessies in sectie 20 en 21 van dezelfde dag. De briefing droeg zelf op om nu te schrijven en te publiceren, ook al stond in "Openstaande beslissingen voor Jarno" punt 9 en in sectie 20 dat dit artikel eigenlijk moest wachten tot de maximum uurtarieven 2027 bekend zijn. Expliciet verzoek gaat voor die eerdere aanname.

**Gepubliceerd: `/inzichten/kinderopvangtoeslag-2027-tweeverdieners`.** H1 "Kinderopvangtoeslag 2027: hoeveel krijg je als tweeverdieners?", metaTitel "Kinderopvangtoeslag 2027: wat verandert voor tweeverdieners?" (57 tekens), categorie "Toeslagen", datum 13-09-2026.

### Onderzoek en bronnen, alles opgehaald 13 september 2026

Vier bronnen, elk met ophaaldatum in het artikel zelf:

- Overheid.nl, internetconsultatie "Wijziging Besluit kinderopvangtoeslag 2027" (`internetconsultatie.nl/besluitkinderopvangtoeslag_2027/b1`). WebFetch kreeg hier `ROBOTS_DISALLOWED`; de pagina is daarom met de `Claude_Browser`-tools zelf bezocht en gelezen, inclusief het accordion met de toelichting per artikelonderdeel, opengeklikt via `javascript_tool` (`document.querySelectorAll('button.accordion__item__header-trigger')` plus `.click()`), omdat coördinaat- en ref-gebaseerd klikken op deze pagina niet werkte. De consultatie is gesloten sinds 27 februari 2026, het besluit valt bij de voorjaarsbesluitvorming 2026, en de definitieve indexatie van bedragen en inkomensgrenzen komt pas na het Centraal Economisch Plan (CEP) van het CPB.
- Kinderopvang-Wijzer, die de concept Nota van Toelichting bij dit besluit woordelijk overneemt. Gebruikt omdat de directe documentpagina's op internetconsultatie.nl (`/document/1523x`) bij directe navigatie steeds terugverwezen naar de basispagina in plaats van de tekst te tonen; deze secundaire bron reproduceert dezelfde officiële tekst en is gebruikt als leesbare aanvulling op de eerste bron, niet als vervanging ervan.
- Rijksoverheid, "Bedragen kinderopvangtoeslag 2026" en de Belastingdienst-pagina "Maximaal uurtarief voor de kinderopvang": de volledige, vastgestelde tabel en de 2026-uurtarieven (dagopvang €11,23, bso €9,98, gastouder €8,49). Die Belastingdienst-pagina bevestigt zelf dat er nog geen 2027-bedragen gepubliceerd zijn.
- Rijksoverheid, nieuwsbericht 25 april 2025 "kabinet zet nieuwe stap naar bijna gratis kinderopvang voor werkende ouders", als bredere context bij het ingroeipad.

Alle vier staan met exacte URL en ophaaldatum in `externLinks` van de artikel-entry.

### Geverifieerde cijfers, en de twee cijfers uit de briefing die zijn afgewezen

Drie regels staan al vast in het ontwerpbesluit, ook al zijn de exacte geïndexeerde 2027-inkomensgrenzen er nog niet:

1. De vaste voet (het percentage waar iedereen minimaal recht op heeft) gaat van 36,5 naar 42,9 procent, plus 6,4 procentpunt.
2. Toetsingsinkomens tussen ongeveer €56.000 en €172.000 krijgen 12,5 procentpunt meer dan in 2026.
3. Iedereen tot en met €87.767 (nu €56.412) krijgt het maximale percentage van 96 voor het eerste kind. Voor het tweede kind gaat het percentage overal waar het nog niet op 96 zit met 3,6 procentpunt omhoog.

De briefing zelf noemde twee andere getallen: een inkomensgrens van €187.802 en een indicatief ingroeipadbedrag van €83.800 voor de 96 procent-grens. Beide zijn niet teruggevonden in de internetconsultatie, de Nota van Toelichting of enige andere gecontroleerde bron. Conform CLAUDE.md sectie 3 punt 3 ("nooit een cijfer zonder gecontroleerde bron") zijn ze **niet gebruikt**. In plaats daarvan staan in het artikel de wel geverifieerde €56.412 en €87.767. Dit is de belangrijkste inhoudelijke afwijking van de letterlijke briefing, en is aan Jarno gemeld in "Openstaand aan Jarno's kant" en bij de sessie-aantekening zelf, niet stilzwijgend gecorrigeerd.

De maximum uurprijzen 2027 staan nergens vast. `MAX_UURPRIJS_2027_GERAAMD` in de nieuwe rekenlaag is daarom een eigen raming (2026-bedrag keer 1,05, in lijn met de eerste CPB-geraamde loon- en prijsontwikkeling), overal zichtbaar gelabeld als raming en niet als vastgesteld bedrag. Zodra het definitieve Besluit er is, moet die constante vervangen worden (zie "Openstaand aan Jarno's kant" punt 10).

### De rekenlaag, met Node uitgevoerd

Nieuw: `lib/kinderopvangtoeslag-2027.ts`, met de volledige 2026-tabel (alle schijven eerste en tweede kind), de vier vaste 2027-ontwerpconstanten hierboven, en `toeslag2026()`/`toeslag2027Geraamd()` als enige plek waar percentage en eigen bijdrage worden uitgerekend. Dezelfde functies voeden de tabel in de contentcomponent, de rekenaar en de FAQ-antwoorden, zodat ze na een latere wijziging niet uit elkaar kunnen lopen. Om de uitkomsten te controleren zonder een werkende productieomgeving is het bestand gecompileerd met `tsc` (los, buiten het project, met de eerder opgezette isolatie in `/tmp/rjsxcheck`) en met Node echt uitgevoerd, met 150 uur dagopvang per maand tegen €10 per uur, kindnummer 1:

| Inkomen | Percentage 2026 | Percentage 2027 (raming) | Eigen bijdrage 2026 | Eigen bijdrage 2027 (raming) |
|---|---|---|---|---|
| €60.000 | 93,9% | 96,0% | €92 | €60 |
| €80.000 | 85,9% | 96,0% | €211 | €60 |
| €100.000 | 72,1% | 84,6% | €418 | €231 |
| €120.000 | 60,6% | 73,1% | €591 | €403 |
| €150.000 | 46,5% | 59,0% | €802 | €615 |

En voor de drie voorbeeldgezinnen in de non-lineariteitssectie (€70.000, €100.000, €140.000): €142 naar €60, €418 naar €231, €744 naar €556 eigen bijdrage per maand. Deze twee reeksen staan letterlijk zo in de hoofdtabel, de drie-gezinnensectie en de `preview`-items van de artikel-entry; er is dus geen los, met de hand overgetypt getal in de pagina dat van de rekenlaag zou kunnen afwijken.

### Situatiekiezer, geen uurtarief-rekenaar

CLAUDE.md verbiedt met zoveel woorden een uurtarief-rekenaar voor kinderopvang (sectie 8 punt 9 en de lijst "wat niet gebouwd wordt"). De nieuwe `components/artikel/KinderopvangtoeslagRekenaar.tsx` is daarom, net als de bestaande `Tweeverdieners2027Rekenaar` en `BoodschappenSituatiekiezer`, opgebouwd rond knoppen: een preset voor inkomen, opvangtype en aantal kinderen, geen enkel vrij in te vullen bedrag. Uren per maand (150) en uurtarief (€10) liggen vast in de code en zijn zichtbaar benoemd als rekenvoorbeeld, niet als invoerveld. De rekenaar toont 2026 tegen 2027 (raming) en sluit af met de `CtaLink` naar de gratis analyse.

### Interne links

Twee kruislinks toegevoegd, geen nieuwe pagina's aangeraakt buiten deze twee:

- In `wat-verandert-er-2027-gezinnen-goed-inkomen.tsx`: de slotzin van de kinderopvangtoeslag-alinea verwijst nu naar dit nieuwe artikel in plaats van naar een vage belofte van "een toekomstig artikel".
- In `tweeverdieners-2027-erop-achteruit.tsx`: een link naar dit artikel toegevoegd in de bestaande bullet "Reken de kinderopvang apart door", vóór de al bestaande link naar `wat-verandert-er-2027-gezinnen-goed-inkomen`.

**Bewust niet gedaan: de inkomende link vanuit de H1-hub `wat-geeft-een-gezin-uit-per-maand.tsx`.** Die pagina is wel gelezen en bevat geen kinderopvangvermelding om aan te haken, en een nette toevoeging zou meer tijd kosten dan er deze sessie was. Dit artikel heeft dus wel twee kruislinks maar nog geen hub-link, wat strikt genomen afwijkt van werkregel 5 ("elke nieuwe pagina krijgt in dezelfde deploy minstens twee inkomende links, waaronder zijn hub"). Zie "Openstaand aan Jarno's kant" punt 9.

### Wat er is gebouwd, samengevat

- `lib/kinderopvangtoeslag-2027.ts` (nieuw): de rekenlaag hierboven.
- `components/artikel/KinderopvangtoeslagRekenaar.tsx` (nieuw): de situatiekiezer.
- `app/inzichten/[slug]/content/kinderopvangtoeslag-2027-tweeverdieners.tsx` (nieuw): de volledige contentcomponent, met 40 tot 60 woorden antwoord met getal vooraan, tabel, de "krijgt iedereen 96 procent"-nuancesectie, toetsingsinkomen versus bruto salaris, de hoofdtabel met de rekenaar erin, de non-lineariteitssectie met drie gezinnen, de maximum-uurprijssectie met een rekenvoorbeeld boven de cap, een uitgewerkt voorbeeld bij €100.000, de link naar het kindgebonden-budget-artikel, "wanneer wordt het echt goedkoper", de totale-huishoudbudgetsectie, en het vaste slotblok met de Geldscan-tekstlink.
- `lib/inzichten-data.ts`: nieuwe `Artikel`-entry vooraan, met 5 FAQ's met schema, 4 bronnen met ophaaldatum, `preview` type "vergelijking" met de €70.000/€140.000-cijfers hierboven.
- `app/inzichten/[slug]/ArticleBody.tsx`: import en contentMap-regel.
- De twee kruislinks hierboven.

### Controle

Geen werkende `device_bash` deze sessie (zelfde Windows-update-probleem als bij sectie 20 en 21), dus geen `tsc` en geen productiebuild op het project zelf. In plaats daarvan, net als bij artikel 1: een geïsoleerde omgeving in `/tmp/rjsxcheck`, met `react@18`, `react-dom@18`, `@types/react@18` en de werkelijk geïmporteerde projectbestanden (`lib/cta.ts`, `components/CtaLink.tsx`, de bestaande rekenaar-componenten) naast de nieuwe en gewijzigde bestanden. `npx tsc --noEmit --strict` daarop: schoon, op de al bekende, niet-gerelateerde ontbrekende modules (`quiz-types`, `rapporten-data`, `rente-verschil`, niet meegekopieerd) na. `lib/kinderopvangtoeslag-2027.ts` is bovendien apart gecompileerd en met Node echt uitgevoerd, zie de tabel hierboven: dat is meer dan een type-check, want het bevestigt dat de uitkomsten kloppen, niet alleen dat de types kloppen. Haakjes/accolade-balans, LF-only regeleinden en null-byte-check op alle zeven geschreven of gewijzigde bestanden: in orde. Alle gewijzigde (niet nieuwe) bestanden weggeschreven met een `expectedMtimeMs`-guard op de laatst bekende device-mtime; `device_commit_files` accepteerde alle zeven bestanden zonder afwijzing (`{"rejected":[]}`).

**Nog open, zie "Openstaand aan Jarno's kant" punt 7 tot en met 10.** Geen `git add`/`commit`/`push` deze sessie, om dezelfde reden als de twee sessies hierboven. Jarno moet zelf committen en pushen, en vóór de deploy een echte `npx tsc --noEmit --incremental false` en productiebuild draaien. Verder open: de ontbrekende hub-inkomende-link, en de vervanging van `MAX_UURPRIJS_2027_GERAAMD` door vastgestelde bedragen zodra die er zijn.

## 23. Prinsjesdagherziening: alle vier de 2027-artikelen op de definitieve cijfers, 18 september 2026

Opdracht van Jarno: nagaan of de echte bedragen nu bekend zijn en de artikelen bijwerken met de
bevestigde cijfers. Dit is de herziening die in de datumtabel op 16 september stond; hij is twee
dagen later gedaan.

### Waar de cijfers vandaan komen

Alle bronnen zijn in de browser op google.nl-vrije, officiële URL's geopend en gelezen, conform de
regel dat je geen externLink commit die je niet zelf hebt geopend. De vier dragende documenten:

- CPB, Macro Economische Verkenning 2027, raming 15 september 2026. De kerngegevenstabel is uit de
  PDF gelezen, niet uit een nieuwsbericht.
- SZW-begroting 2027, Tweede Kamer 2026/2027, 37 020 XV, nr. 2. Dit document draagt het meeste:
  p. 116 (kinderopvangtoeslag), p. 143 (kindgebonden budget), p. 175 (IACK, zorg), p. 177
  (koopkracht per groep), tabel 81 (uurprijzen), tabel 107 (WKB-bedragen), tabel 134
  (voorbeeldhuishoudens).
- Ministerie van Financiën, Fiscale sleuteltabel 2027, bijlage bij het pakket Belastingplan 2027.
- Wetsvoorstel Belastingplan 2027, artikel LI, en het VWS-nieuwsbericht van 15 september.

### Zes dingen die anders bleken dan de raming van 13 september

1. **Het tweede knikpunt in het kindgebonden budget is €61.917, niet €65.560.** De grens stond op
   €60.000 prijspeil 2024 en is bij nota van wijziging van 20 mei 2026 verlaagd naar €57.950. Meer
   huishoudens komen er dus boven, niet minder.
2. **Het afbouwpercentage boven dat knikpunt is voor 2027 9,95 procent en niet 12,35.** Het kabinet
   voert de stap in twee delen in; pas per 2028 wordt het 12,8 procent. De rekening van 2027 is
   daarmee ongeveer gehalveerd ten opzichte van wat we hadden gemodelleerd, en die van 2028 hoger.
3. **De IACK voor 2027 is €2.918** (Fiscale sleuteltabel). De maatregel kost €153 per jaar volgens
   de SZW-begroting, niet de €346 die we hadden berekend, en op de aanslag zie je €114 in plaats
   van €261. Onze fout zat in de indexatie: we rekenden met de cpi-raming van 2,8 procent, terwijl
   het Belastingplan voor 2027 een beperkte inflatiecorrectie van 1,01248 voorschrijft.
4. **De kinderopvangtoeslagstap is kleiner dan het ontwerpbesluit.** Er ging €350 miljoen af van de
   €715 miljoen. 96 procent geldt tot €71.903 en niet tot €87.767, de middenband krijgt 5,1 in
   plaats van 12,5 procentpunt, en de vaste voet gaat naar 39,1 en niet naar 42,9 procent. Het hele
   ontwerpbesluit uit de internetconsultatie is dus achterhaald; het staat nog in de rekenlaag,
   maar alleen zodat het artikel het verschil kan benoemen.
5. **De maximum uurprijzen 2027 zijn wél bekend**: €11,60 dagopvang, €10,31 bso, €8,77 gastouder.
   Dat was het cijfer waarop artikel 2 zou wachten.
6. **Het uitgelekte zorgcijfer klopte half.** Eigen risico €385 naar €400: bevestigd. Zorgpremie
   niet: VWS raamt €12,50 per maand erbij, naar gemiddeld €169 per maand (€1.879 naar €2.029 per
   jaar), niet de €10 naar €197 die de NOS meldde.

### Wat dat met de bedragen deed

De drie voorbeeldhuishoudens in `tweeverdieners-2027-erop-achteruit` gaan van €38/€94/€51 naar
€40/€84/€40 per maand. **De kernvondst van het artikel blijft overeind**: het huishouden in het
midden raakt het meeste kwijt, want het hoogste inkomen is het kindgebonden budget al kwijt en kan
het niet nog een keer verliezen. Het IACK-kantelpunt verschuift van €30.400 naar €31.800.

Bij het kindgebonden budget kwam er een nuance bij die er eerst niet was: **onder het tweede
knikpunt gaat het budget er in 2027 juist iets op vooruit**, omdat het afbouwpunt en de kindbedragen
mee omhoog zijn gegaan. Bij €60.000 is het €312 per maand in 2027 tegen €298 in 2026. Dat staat nu
onder de tabel.

### Wat er is gewijzigd

Drie rekenlagen: `lib/prinsjesdag-2027.ts` (het blok `UITGELEKT` vervangen door `ZORG_2027`,
`KOOPKRACHT_2027`, `KOOPKRACHT_TWEEVERDIENERS_2027` en `KOOPKRACHTPAKKET_2027`; `IACK_2027` met het
gepubliceerde maximum; `INFLATIECORRECTIE_2027`), `lib/kindgebonden-budget.ts` (alle zeven
2027-constanten, plus de vermogensgrenzen en de leeftijdsbedragen) en
`lib/kinderopvangtoeslag-2027.ts` (`toeslag2027Geraamd` heet nu `toeslag2027`,
`MAX_UURPRIJS_2027_GERAAMD` heet `MAX_UURPRIJS_2027`).

Vier artikelen: `tweeverdieners-2027-erop-achteruit`, `wat-verandert-er-2027-gezinnen-goed-inkomen`,
`kinderopvangtoeslag-2027-tweeverdieners` en `kindgebonden-budget-2027-inkomensgrens`. Plus
`samen-te-veel-verdiend-toeslag-kwijt`, dat de oude grens van €65.000 noemde. Alle vijf hebben
`gewijzigd: "2026-09-18"`. Twee rekenaars zijn meegegaan.

In alle vijf zijn de bronnenlijsten vervangen: de NOS-bron, Salaris Vanmorgen, Grant Thornton, Blue
Accountants en Eemskrant zijn eruit, de vier primaire Prinsjesdagdocumenten zijn erin.

### Eén claim die bewust is weggelaten

De SZW-begroting noemt de koopkracht van de laagste inkomensgroep, de hoogste twee inkomensgroepen
en gepensioneerden. Het uitgelekte cijfer "min 0,2 procent voor werkenden" staat nergens in de
definitieve stukken en is daarom nergens overgenomen.

### Wat nog open staat

- **De zorgpremie blijft een raming tot uiterlijk 12 november.** Dat staat in alle vier de
  artikelen met zoveel woorden. Zet 12 november in de datumtabel.
- **Er is geen productiebuild gedraaid.** `npx tsc --noEmit --incremental false` is schoon op de
  hele repo, er staan geen null bytes in de gewijzigde bestanden, alle objectvelden zijn expliciet
  uitgeschreven en de rekenlaag is met Node uitgevoerd zodat elk bedrag hierboven uit de echte
  functies komt. Maar `npx next build` past niet in de tijdslimiet van de shell op dit apparaat
  (120 seconden per aanroep, de build duurt langer). Draai hem lokaal vóór de push.
- **De verzachting naar 9,95 procent gaat via een nota van wijziging** die nog door beide Kamers
  moet. Dat staat in de FAQ van het kindgebonden budget-artikel.
- **Voor het tweede kind in de kinderopvangtoeslag noemt de begroting geen percentage voor 2027.**
  De rekenaar houdt daar het percentage van 2026 aan en zegt dat er ook bij. Werk dit bij zodra het
  Besluit kinderopvangtoeslag 2027 in het Staatsblad staat.
- **GSC-indiening**: alle vijf de URL's opnieuw indienen na de push, want `gewijzigd` staat op
  18 september en de sitemap-lastmod verandert mee.

---

## 24. Meting van de analyse, bezoekcijfers en laadtijd van de admin, 23 september 2026

Op verzoek van Jarno, buiten de bouwvolgorde om. Geen contentpagina, telt niet mee in de tempo-regel. Wel een nieuw adminscherm, terwijl CLAUDE.md "geen nieuwe adminschermen" zegt: Jarno vroeg er expliciet om, en het vervangt een scherm (het afhaakblok uit `FunnelTabblad.tsx`) dat er op papier al was maar nooit te zien was.

### Wat er in productie stond

Uitgelezen op 23 september via de publieke API, want `quiz_voortgang` was nog leesbaar met de anon-sleutel.

| Week vanaf | Start geklikt | Eerste antwoord | Resultaat gezien |
|---|---|---|---|
| 31 aug | 10 | 8 | 8 |
| 7 sep | 18 | 16 | 14 |
| 14 sep | 21 | 18 | 17 |
| 21 sep (t/m 23 sep) | 4 | 4 | 3 |

Sinds de meting per scherm (6 september) stopten er tien zonder resultaat: vier klikten op start en beantwoordden de eerste vraag niet, de andere zes stopten elk op een ander scherm (extra inkomen, hypotheekaftrek, tussenstand inkomen, woonlasten, zorgverzekering, overige verzekeringen). Er is geen scherm waar mensen massaal afhaken. Nul keer toestemming voor de data-asset. **Jarno's eigen testrondes zitten hierin**; vanaf nu worden ze gemarkeerd.

### De drie oorzaken

1. **"Analyses voltooid" telde `quiz_resultaten`.** Daar komt pas een rij in als iemand op het resultaatscherm een e-mailadres achterlaat (`/api/quiz-lead`). Op Vandaag heet die rij nu "Resultaat gemaild (e-mail achtergelaten)", met erboven een nieuwe rij "Analyses afgerond (resultaat gezien)" uit `quiz_voortgang`. De pagina Analyses heet in het menu nu "Analyses met e-mail". De vrijdagmeting (CLAUDE.md sectie 9) moet "analyses afgerond" voortaan uit de nieuwe rij halen.
2. **De afhaaklijst per scherm was onzichtbaar.** Gebouwd op 6 september in `FunnelTabblad.tsx`, maar dat component wordt alleen geladen door `AdminClient.tsx`, de oude admin met tabbladen, en die draait sinds de zijmenu-shell van 30 juli nergens meer. De opdracht "lees de schermlijst in het funneltabblad" kon dus niet worden uitgevoerd.
3. **Het introscherm van /analyse wordt niet gelogd.** Een rij in `quiz_voortgang` ontstaat pas bij de eerste vraag. Wie de landingpagina opent en niet op start klikt, zie je alleen in de paginabezoeken. `/admin/analyse-verloop` legt die twee nu naast elkaar op sessie-id.

### Wat er gebouwd is

- **`/admin/analyse-verloop`** (menu Leveren). Trechter: geopend, start geklikt, eerste antwoord, resultaat, e-mail, Geldscan-aanvraag. Tabel per scherm in de volgorde van de analyse: hoeveel sessies het zagen en hoeveel daar stopten. Herkomst per pagina of site vóór /analyse. Lijst van alle gestarte analyses met status, voortgang, verste scherm, duur en herkomst; klik voor de schermen en de ingevulde antwoorden. Route `app/api/admin/analyse-verloop/route.ts`, rekenlaag `app/admin/components/analyse-verloop-berekening.ts`, weergave `AnalyseVerloopTabblad.tsx`.
- **In de analyse zelf** (`QuizClient.tsx`), drie extra velden in de antwoorden-JSON, dus zonder migratie: `_eigenaar` (eigenaarscookie gezet, standaard weggelaten op de nieuwe pagina), `_verstScherm` (id van het verste scherm) en het event `analysis_afgebroken` bij de afbreekknop, niet op het resultaatscherm.
- **Bezoekers-tabblad**: telt nu op de server via `/api/admin/bezoekers`, met de Postgres-functie `bezoekers_statistiek` of, zolang die er niet is, door alle rijen in blokken van 1000 op te halen. In dat laatste geval staat er een gele melding. Vandaag rekent nu vanaf middernacht Nederlandse tijd in plaats van de tijdzone van de browser.
- **Laadtijd**: de middleware draait niet meer op `/api/admin/*` (elke route controleert zelf), de adminlayout doet de inlogcheck en de badgetellingen tegelijk, en `/api/admin/vandaag` start alle queries in één keer in plaats van in vier golven. De volledige `outreach_mails`-tabel wordt niet meer opgehaald; count-queries tellen, en alleen de geopende mails en de laatste tien komen als rijen mee. Inloggen gaat direct naar `/admin/vandaag` in plaats van via een extra redirect.
- **Stille afkapping gevonden en gedicht**: Supabase geeft per verzoek hooguit 1000 rijen, ook zonder `limit()`. De Vandaag-route haalde contacten en mails op met de aanname "geen limiet". Nieuw hulpje `haalAlleRijen` in `lib/admin-periode.ts` bladert door. Regel: tellen met count-queries of een Postgres-functie, nooit rijen ophalen om te tellen.
- **`supabase/admin_statistiek.sql`**: indexen op `paginabezoeken` en `quiz_voortgang`, de functie `bezoekers_statistiek`, en het intrekken van de anon-select op `quiz_voortgang`. Idempotent, met controlequery's onderaan.

### Controle

- `npx tsc --noEmit --incremental false` schoon op de hele repo, geen null bytes en geen CR in de gewijzigde bestanden, objectvelden expliciet uitgeschreven (ook in de bestaande return van de Vandaag-route).
- De rekenlaag van de nieuwe pagina is gecompileerd en met Node uitgevoerd op echte rijen uit productie. Dat ving een fout: `max_scherm_index` wees in de opnieuw berekende schermenlijst één scherm te ver, omdat die positie is berekend op de lijst van dát moment, en die verschuift als latere antwoorden schermen toevoegen of weghalen. Vandaar het nieuwe veld `_verstScherm`; voor oude rijen geldt `huidig_scherm`. Daarna kwam de afhaaklijst exact overeen met een losse telling in de browser.
- `haalAlleRijen` getest met een nepclient van 2.345 rijen: drie blokken, geen dubbele of ontbrekende rijen.
- **Geen productiebuild gedraaid**: `next build` past niet in de 120 seconden van de shell. De pagina is ook niet in een browser gezien, want de admin vraagt een login. Draai de build lokaal, push, en loop dan `/admin/analyse-verloop`, `/admin/bezoekers` (alle vier de periodes) en `/admin/vandaag` langs.

### Wat Jarno moet doen

1. Build lokaal, pushen.
2. `supabase/admin_statistiek.sql` draaien in de Supabase SQL-editor, daarna de drie controlequery's onderaan het bestand.
3. Op het apparaat waarmee je test het eigenaarsfilter aanzetten (Bezoekers, "Dit ben ik"), zodat je testrondes voortaan gemarkeerd worden.
4. Na een week: zie de datumtabel, 30 september.

---

## 25. Ingevulde analyses als resultaatweergave, meting na het resultaat en conversieonderzoek, 23 september 2026

Tweede sessie van de dag, op verzoek van Jarno.

### Wat er gebouwd is

- **Menu "Ingevulde analyses"** (was "Analyse-verloop", route ongewijzigd `/admin/analyse-verloop`). Standaard periode "alles", met boven de lijst een telling per status (resultaat, afgehaakt, afgebroken, niets ingevuld, oude meting).
- **Popup per analyse** (`app/admin/components/AnalyseResultaatPopup.tsx`): verloop in stappen, bij afronders het resultaat zoals de bezoeker het zag (zelfde conclusiekop, bedrag, verwachting en dezelfde balken), en per onderdeel wat er is ingevuld met Nederlandse labels, totalen en de verwachting ernaast. Bij afhakers bewust geen berekende uitkomst: lege bedragen zouden als nul tellen en een uitkomst tonen die de bezoeker nooit zag.
- **Rekenlaag van het resultaatscherm verhuisd** naar `app/analyse/stappen/resultaat/berekenResultaat.ts`, zodat de admin exact dezelfde uitkomst toont. Letterlijk verplaatst; een regel-voor-regelvergelijking met het origineel vond alleen de hernoemde functie `zinVoor` naar `zinVoorAfwijking`. `CategorieVergelijking` is geëxporteerd.
- **Meting na het resultaat**, via `paginagebeurtenissen` op dezelfde sessie-id, zonder migratie: `analyse_resultaat_stap` (met stap 1 t/m 4), `analyse_bewaren_geopend`, `analyse_bewaren_verstuurd`. Samen met het bestaande `cta_geldscan` en `intake_*` staat per bezoeker wat hij na het resultaat deed. In de trechter twee nieuwe stappen: aanbodscherm bereikt en op Geldscan geklikt.
- **Blok "Welke uitkomst de afronders kregen"**: meer over dan verwacht, passend, minder over dan verwacht (drempel €100, zelfde als de conclusiekop), met per groep aanbod gezien, Geldscan-klik en e-mail. De analyse die Jarno bekeek (23 sep 08:24) kreeg "meer over dan verwacht", €1.403 tegen €583, terwijl stap 3 over hoge uitgaven gaat. Hoe vaak dat voorkomt, laat dit blok zien.

### Onderzoek

`docs/conversie-na-resultaat-23-sep-2026.md`: hoe het nu gaat, wat het onderzoek zegt (leverancierscijfers gemarkeerd), acht wijzigingen in volgorde met meetpunt, wat bewust niet, en een voorgestelde volgorde. Kern: het gratis resultaat beantwoordt de vraag al, de pitch past vaak niet bij de uitkomst, e-mail heeft geen reden (alleen "bewaren", verstopt, verplicht vinkje), en er is geen opvolging.

### Controle

- `tsc` schoon op de hele repo, geen null bytes of CR, objectvelden expliciet uitgeschreven.
- De popup is met React server-side gerenderd met de antwoorden uit Jarno's schermafbeelding, met de echte Tailwind-config gestyled en in Chromium gefotografeerd op 1280 en 390 pixels breed. Daarbij gevonden en opgelost: een berekende uitkomst bij afhakers (misleidend) en de standaardwaarde "totaalbedrag" bij zorg die als antwoord werd getoond.
- De rekenlaag van de lijst (status, uitkomstgroep, trechter met de nieuwe stappen) is met Node uitgevoerd op testrijen.
- **Geen productiebuild gedraaid** (shell-limiet). Build lokaal vóór de push.

**Aanvulling 23 september, derde sessie:** de "stel één vraag"-optie uitgewerkt in `docs/vraagstap-ontwerp-23-sep-2026.md`, met mockup `docs/img/mockup-vraagstap-23-sep-2026.png`. Kern: niet als tussenstap vóór het resultaat (dan kun je nog niets vragen en wordt overslaan de standaard), maar in plaats van resultaatstap 3, met drie voorgekozen vragen per uitkomst, e-mail pas na de keuze, een knop die op mobiel vast in beeld staat, en afhandeling via de bestaande contacten en Jarno's eigen mailbox. Niet gebouwd; wacht op drie beslissingen van Jarno.

---

## 26. Vraagstap gebouwd, 23 september 2026

Op verzoek van Jarno, naar het ontwerp en de mockup van dezelfde dag (`docs/vraagstap-ontwerp-23-sep-2026.md`, `docs/img/mockup-vraagstap-23-sep-2026.png`). Besluiten: antwoord binnen 2 werkdagen, grens 15 vragen per 7 dagen, Geldscan één keer in elk antwoord.

### Wat de bezoeker ziet

- **Resultaatstap 3 is nu "Jouw vraag"** (`app/analyse/stappen/resultaat/Resultaat3Vraag.tsx`):
  - een kop per uitkomst;
  - drie voorgekozen vragen uit de eigen cijfers (`vraagKeuzes.ts`), plus een eigen vraag;
  - na de keuze een optionele toelichting en het e-mailveld;
  - geen vinkje, wel een honeypotveld tegen bots;
  - op mobiel staat de knop vast onderaan het scherm, met daaronder "Geen vraag, laat de volgende stap zien".
- **Na versturen is stap 4 een bevestiging** (`Resultaat4VraagVerstuurd.tsx`): "uiterlijk [dag]", de Geldscan als tekstlink met prijs, en de bewijsregel. Wie overslaat, krijgt het oude aanbodscherm.
- **Staat de stap uit**, dan ziet de bezoeker weer het oude tekstscherm. Uit gaat hij met `VRAAGSTAP_UIT=1` in Vercel, of vanzelf bij 15 vragen in 7 dagen. De status komt uit `/api/analyse-vraag/status`.
- **Privacypagina**: een alinea over wat er bij een vraag bewaard wordt.

### Wat er achter gebeurt (`/api/analyse-vraag`, geen migratie)

1. Er wordt een lead aangemaakt, plus een rij in `quiz_resultaten` met token. Die opslag is verhuisd naar `lib/analyse-opslaan.ts`, zodat `/api/quiz-lead` hem gebruikt zonder dat zijn gedrag verandert. Een bestaande marketingtoestemming blijft staan.
2. Er wordt een contact aangemaakt of bijgewerkt, met volgende actie "Vraag beantwoorden" over 2 werkdagen (Nederlandse tijd, weekenden overgeslagen). De vraag komt erbij als notitie met de prefix "Vraag via analyse:".
3. Er gaan twee mails uit via Resend:
   - naar `hallo@waarblijfthet.nl` (aan te passen met `VRAAG_NOTIFICATIE_AAN`), met de bezoeker als antwoordadres, en met het huishouden, het inkomen, de ruimte, de grootste verschillen en links naar de analyse en het contact;
   - een bevestiging naar de bezoeker, met de link naar zijn uitkomst.

   Mislukt een mail, dan komt er een systeemnotitie bij het contact.
4. Meetgebeurtenissen:
   - `analyse_vraag_verstuurd`, weggeschreven door de server op de sessie-id;
   - `analyse_vraag_gekozen` en `analyse_vraag_overgeslagen`, weggeschreven door de browser.

   Eigen testrondes tellen niet mee in de meting, maar krijgen wel een contact en mails, zodat Jarno de hele route kan proberen.

### Inzicht in de admin

- **Vandaag, bovenaan: blok "Vragen via de analyse".**
  - Per open vraag: de vraag, het e-mailadres, hoe lang geleden, en uiterlijk wanneer, rood als het te laat is.
  - Links naar de analyse en het contact, en een knop "Beantwoord ✓". Die knop wist de volgende actie, zet fase warm en schrijft de notitie "Vraag beantwoord" (`/api/admin/vragen/beantwoord`).
  - Een statusregel: aan of uit, en hoeveel van de 15 er deze week binnen zijn.
  - Ook in de rij "Te doen".
- **Ingevulde analyses:**
  - in de trechter "Vraagstap gezien", "Vraag gesteld" en "Stap 4 bereikt";
  - een blok "Vraagstap" met gezien, gekozen, verstuurd en overgeslagen, en per soort vraag hoe vaak gekozen en verstuurd;
  - in de popup en de lijst per bezoeker "Vraag gesteld" of "Vraag overgeslagen".

### Controle

- `tsc` schoon, geen null bytes of CR, objectvelden expliciet uitgeschreven.
- De vraagkeuzes zijn met Node uitgevoerd voor meer over, minder over en passend. De deadline is getest op woensdag (vrijdag), vrijdag (dinsdag) en zondagnacht (woensdag).
- De route is met een nep-database en nep-Resend doorlopen:
  - honeypot, fout e-mailadres, geslaagde vraag (lead, uitkomst zonder onbekende velden, contact, notitie, twee mails met het juiste antwoordadres, HTML ge-escaped, meetgebeurtenis);
  - een tweede vraag van hetzelfde adres (één contact, twee notities);
  - de grens van 15, en handmatig uit.
- De schermen zijn server-side gerenderd met de echte Tailwind-config en in Chromium gefotografeerd. **Daarbij gevonden:** de vaste knopbalk stond op mobiel onder de inhoud in plaats van onderaan het scherm. De transform-animatie van de resultatenflow maakt het omliggende blok tot referentiekader voor `position: fixed`. Opgelost met een portal naar `<body>` en opnieuw gecontroleerd.
- **Niet gedaan:**
  - een productiebuild (shell-limiet);
  - een echte verzending tegen Supabase en Resend.

  Na de deploy één eigen testvraag sturen: komt de mail binnen op hallo@, en staat hij op Vandaag? Klik daarna op Beantwoord.

---

## 27. Privacy- en over-pagina herschreven, 23 september 2026

Op verzoek van Jarno: alles wat oud of onjuist was vervangen, en de tekst beknopt en duidelijk gemaakt.

### Privacy (`app/privacy/page.tsx`, volledig herschreven)

Wat er niet klopte:

- de pagina stond in de wij-vorm en noemde een wachtlijst die niet meer bestaat;
- er stond dat analyse-antwoorden alleen met toestemming bewaard worden, terwijl ze altijd anoniem per scherm worden opgeslagen;
- er stond dat gegevens na 2 jaar worden verwijderd, terwijl er niets automatisch verwijdert;
- "Europese servers" bij Supabase is niet na te gaan;
- Vercel Analytics, freeipapi.com (het IP-adres voor stad of regio), Resend, de vraagstap, de Geldscan-afschriften en de zakelijke outreach ontbraken;
- het woord "eerlijk" stond erin.

De nieuwe pagina, in de ik-vorm:

- vijf situaties met per situatie wat ik verzamel;
- waarom dat mag;
- hoe lang ik het bewaar (eerlijk "zonder vaste termijn" voor de anonieme data, facturen 7 jaar);
- wie gegevens voor mij verwerkt;
- cookies (geen voor statistiek of advertenties);
- rechten en de Autoriteit Persoonsgegevens.

De links naar geldfit.nl en autoriteitpersoonsgegevens.nl zijn in de browser geopend en werken.

### Over (`app/over/page.tsx`)

- **Afbakening.** Er stond dat de vergelijking op Nibud-, CBS- en Belastingdienstcijfers berust. Dat is onjuist: `lib/benchmarks.ts` rekent met de zelf doorgerekende huishoudens en sluit Nibud bewust uit. Nu staat er dat het mijn eigen vuistregel is, met een link naar de rapporten.
- **De drie waarden "Persoonlijk, Onafhankelijk, Praktisch"** zijn vervangen door drie feiten: ik schrijf het zelf, niets te verkopen, alle rapporten openbaar (via `RAPPORTEN.length`). Dat volgt CLAUDE.md sectie 4: positioneren op geleverd werk, niet op karakter.
- **"Mijn manier van kijken"** (drie algemene beloftes) is vervangen door "Hoe het werkt": gratis analyse, Geldscan €49, en daarna (afschriften met de hand verwijderd, €49 verrekend bij een vervolg).
- **Kleinere correcties:**
  - de bio-zin uit CLAUDE.md staat in de hero en de metadata;
  - "Waar blijft het?" is "Waar blijft het" geworden;
  - "mijn advies" is "wat ik schreef" geworden;
  - "vertrouwelijk" is "zonder e-mailadres" geworden;
  - "Besparen" en "Sparen" zijn uit het schema gehaald;
  - "Voor wie" is ingekort van vier naar drie punten.

### Controle

- `tsc` schoon.
- Beide pagina's zijn server-side gerenderd met de echte Tailwind-config en op 390 pixels breed gefotografeerd.
- Geen em dashes, geen "eerlijk" en geen PSOhub of CTO in de nieuwe tekst.
- **Geen productiebuild gedraaid.**

---

## 28. Gemiste zoekonderwerpen, 23 september 2026

Onderzoek op verzoek van Jarno, volledig in `docs/serp-gemiste-onderwerpen-23-sep-2026.md`. Er is niets gebouwd. De top 10 staat daar; dit zijn de gevolgen voor de volgorde.

- **H2 krijgt een geverifieerde hoofdterm:** "gemiddelde uitgaven per maand 2 personen". Die staat hoog in de autocomplete, heeft een AI-overzicht, en er staat geen eigen cijfer in de top 7.
- **Nieuw kandidaat-pijler, geparkeerd tot na H2:** "waar sta ik met mijn inkomen", op basis van het gestandaardiseerd inkomen van het CBS per huishouden, in netto per maand. We hebben daar nul vertoningen op. Perplexity citeert voor die vraag nu webwoordenboek, met een bedrag dat geen rekening houdt met de grootte van het huishouden. Deze pagina herstelt ook de top-25-procentclaim.
- **Voor de beslissing van 4 oktober over `wat-zijn-normale-vaste-lasten-gezin`:** niet weggooien, maar herbouwen op "gemiddelde vaste lasten gezin 4 personen", 2 personen en 1 persoon (vier varianten in de autocomplete).
- **Voor de 2027-sweep in december:**
  - een januari-2027-sectie op `netto-loonsverhoging-berekenen`;
  - "wat wordt duurder in 2027" als sectie in `wat-verandert-er-2027-gezinnen-goed-inkomen`.
- **Goedkoopste winst:** "Kun je rondkomen van 3000 euro per maand?" staat in "Meer om te vragen" op 5 van de 15 onderzochte zoekresultaten. Een letterlijk antwoordblok op `is-3000-netto-genoeg-gezin` maakt ons in veel zoekresultaten tegelijk zichtbaar.
- **Volumes zijn klassen, geen getallen**, want er is geen keywordtool. Het anker is is-4000, met ongeveer 3.900 vertoningen per maand. Google Trends gaf één vergelijking en blokkeerde daarna. Keyword Planner was alleen bereikbaar via Google Ads-accounts van andere bedrijven en is niet gebruikt.

## 29. H2, inkomenspijler, antwoordronde en vaste lasten, 24 september 2026

Opdracht van Jarno: "voer 1, 2 en 3 nu uit", de volgorde uit sectie 28 en `docs/serp-gemiste-onderwerpen-23-sep-2026.md`. Buiten de tempo-regel om, zie BEGIN HIER.

### Bronnen, allemaal in Chrome geopend op 24 september 2026

- CBS, visualisatie "Verdeling gestandaardiseerd inkomen" (3-6-2026), tabel 2024, kolom alle huishoudens, via "Grafiekdata in tabelvorm".
- CBS, visualisatie "Verdeling besteedbaar inkomen" (3-6-2026), tabel 2024 per huishoudtype.
- CBS, "Materiële welvaart in Nederland 2024", bijlage A: equivalentiefactoren vanaf verslagjaar 2018 (stel 1,40; stel met twee kinderen 1,91). Let op: sites als nettokompas rekenen nog met de oude 1,37.
- CBS, begrip "besteedbaar inkomen": bruto min overdrachten, premies (ook zorg) en belastingen.
- CBS, "Inflatie stijgt naar 3,3 procent in augustus" (8-9-2026, definitief, gelijk aan de snelle raming): wonen, water en energie grootste bijdrage (0,99 procentpunt), consumptie in het buitenland +7,4 procent, voeding -0,5 procent (HICP).
- Rijksoverheid, VWS-nieuws 15-9-2026: zorgpremie +€12,50 naar €169 per maand, eigen risico €400. Raming tot 12 november.

### Wat er gebouwd is

1. **`lib/inkomensverdeling-cbs.ts`** (nieuw). De CBS-klassen als data, lineaire interpolatie binnen klassen van €2.000, grenzen per huishouden via de equivalentiefactor, afronding op honderden. Geen indexatie naar 2026 (bestaat geen officiële reeks); elke pagina zegt dat de grenzen van 2024 zijn. Kerncijfers: top 10 procent vanaf €5.200 (alleen), €7.200 (stel), €9.800 (stel met twee kinderen); top 25 procent alleen €4.000.
2. **Pijler `top-10-procent-inkomen-nederland`** (nieuw): tabel per samenstelling, `InkomenspositieKiezer` (nieuwe situatiekiezer, geen bruto-netto-rekenaar), uitleg besteedbaar vs netto, middenklasse (geen officiële grens, dat staat er), stellen-tabel (#2 gezamenlijk inkomen), 100.000 bruto via twee nieuwe constanten in `lib/bruto-netto-referentie.ts` (script bijgewerkt), rapport `stel-zonder-kinderen`.
3. **H2 `gemiddelde-uitgaven-per-maand-2-personen`** (nieuw): hub stel zonder kinderen op het H1-patroon. Tabel €3.500 tot €6.500, `SalarisRekenaar` 2/0/eigen, samenwonen tegen alleen (factor 1,40), herkomst per post zonder kindposten, rapport `stel-zonder-kinderen` met evaluatiecitaat, inflatie augustus, spakenlijst (14). Intentiescheiding in het commentaar bovenaan.
4. **Antwoordronde:**
   - `hoeveel-geld-overhouden-einde-maand`: metaTitel "€400 tot €1.300: hoeveel geld moet je overhouden per maand?" (was "Hoeveel geld overhouden per maand? Richtlijnen 2026"), antwoordblok, tabel per huishouden, twee FAQ's op de zoekvraag, "eerlijker" weg.
   - `is-3000-netto-genoeg-gezin`: letterlijk antwoord op "Kun je rondkomen van 3000 euro per maand?", tabel per huishouden, CBS-positie, twee FAQ's, "Het eerlijke antwoord" weg (tekst, metaDescription, excerpt). metaTitel ongewijzigd (positie 5,3).
   - `is-5000-euro-netto-goed-salaris`: metaTitel "Is €5.000 netto een goed salaris? Alleen top 11% van NL" (was "... (2026)"), antwoordblok met posities, FAQ op de letterlijke PAA-vraag, verouderde "€3.100 modaal" vervangen door `NETTO_MODAAL_2026_MAAND`, preview met verkeerde bruto-bedragen (90.000/78.000) nu uit de constanten, kale cpb.nl-bron vervangen.
   - `samen-6000-euro-netto-toch-niets-over`: antwoordblok in AI-vraagvorm, FAQ "Is 7000 netto gezinsinkomen veel?" (vervangt de overhouden-FAQ, die staat nu op de overhoudenpagina), "€3.100 modaal" vervangen. metaTitel ongewijzigd (CTR 7,34 procent).
   - `is-4000`: de top-25-procentclaim terug, nu met bron: als alleenstaande met €4.000 te besteden heeft 26 procent meer. Plus links naar pijler en H2.
5. **Herbouw `wat-zijn-normale-vaste-lasten-gezin`** (zelfde URL): gemiddelde vaste lasten voor gezin van 4, 2 personen en 1 persoon uit de vuistregel, percentage van het inkomen, de vaste lasten van twee echte huishoudens uit `rapporten-data`, herkomst, 2027 als raming. FinBuddy, Vaste Lasten Bond en ConsumentWijzer als bron weg, bespaartips weg, `VasteLastenRadar` niet meer gebruikt (bestand staat er nog).
6. **H1**: had twee Geldscan-verwijzingen (eigen slotalinea plus het slotblok van page.tsx). De eigen link is weg. Spaken naar H2 en de pijler erbij. N2 (`partner-geeft-te-veel-uit`) linkt nu naar H2.

### Controle

- `tsc --noEmit --incremental false` schoon op de hele repo. Geen NUL, geen CR, geen em dashes in de gewijzigde bestanden.
- Rekenlaag via de harness: grenzen, posities en alle metaTitels (maximaal 59 tekens) nagelopen, geen `undefined`, `NaN` of `null` in de entries.
- SSR-render van negen pagina's op 390px met Playwright: geen horizontale paginascroll. De tabel op de pijler had op 390px de kolom "hoogste 10 procent" buiten beeld; teruggebracht naar drie kolommen. Op de vaste-lastenpagina staat het gezin nu als eerste kolom en is de procenttabel gekanteld.
- Sitemap: beide nieuwe slugs worden door `scripts/generate-sitemap.mjs` opgepikt (regex op `slug:`).
- **Geen productiebuild** (past niet in de shelltijd). Draai `npm run build` lokaal vóór de push.

### Wat Jarno moet doen

1. Lokaal `npm run build`, dan pushen.
2. In GSC indienen: `/inzichten/top-10-procent-inkomen-nederland`, `/inzichten/gemiddelde-uitgaven-per-maand-2-personen`, `/inzichten/wat-zijn-normale-vaste-lasten-gezin`, `/inzichten/hoeveel-geld-overhouden-einde-maand`, `/inzichten/is-3000-netto-genoeg-gezin`, `/inzichten/is-5000-euro-netto-goed-salaris`, `/inzichten/samen-6000-euro-netto-toch-niets-over`. is-4000 en H1 zijn licht gewijzigd; opnieuw indienen mag.
3. Meten op 22 oktober (28 dagen): vertoningen op de nieuwe hoofdtermen, CTR van de twee nieuwe metaTitels (overhouden, is-5000). Oude titels staan hierboven.

### Gepland

- 12 november: zorgpremie 2027 definitief. Naast de vier 2027-artikelen nu ook de laatste FAQ en sectie van `wat-zijn-normale-vaste-lasten-gezin` bijwerken (`ZORG_2027`).
- Zodra het CBS de verdeling over 2025 publiceert (verwacht rond juni 2027): de tabellen in `lib/inkomensverdeling-cbs.ts` vervangen en `INKOMEN_PEILJAAR` ophogen. De pagina's volgen vanzelf.
- De twee AI-testvragen uit sectie 28 #9 toevoegen aan de maandelijkse AI-test.

