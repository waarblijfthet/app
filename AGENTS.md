# Waar blijft het, projectinstructies

Herschreven op 5-sep-2026 rond één kanaal: zoekverkeer (Google, Bing, AI-zoekmachines). De versie van 17-aug met het verwijzersdoel staat in `docs/archief-claude-md-05-sep-2026.md`. Alles wat hier niet meer staat is bewust weg. `AGENTS.md` is een kopie van dit bestand; wijzig ze altijd samen.

## 1. Het enige doel

**100 betaalde Geldscans uit zoekverkeer vóór 31 januari 2027.** Ondergrens waarbij het plan werkt: 50. Onder 20 is het aanbod of de prijs fout, niet het kanaal.

**Begin elke sessie in `docs/bouwvolgorde.md`, sectie BEGIN HIER.** Daar staat de stand van zaken, de eerstvolgende actie en wat er op een datum wacht. Dat bestand houdt zijn naam en wordt na elke sessie bijgewerkt; de datum staat erin, niet in de bestandsnaam. Daaronder staat het logboek met de motivatie per besluit.

Achtergrond, alleen lezen als de bouwvolgorde ernaar verwijst: het plan in `docs/plan-seo-conversie-100-geldscans-05-sep-2026.md`, de werkinstructie per fase in `docs/uitvoeringsprompt-opus-seo-100-geldscans-05-sep-2026.md`, de nulmeting in `docs/gsc-nulmeting-05-sep-2026.md`.

Begin elke sessie met drie vragen: welke fase, welke ene pagina of fix, welk cijfer uit de vrijdagmeting (sectie 9) moet ervan bewegen. Eén deliverable per sessie. Bouwen en schrijven mogen de volle sessietijd innemen, mits het in de bouwvolgorde staat. Staat het er niet in, dan bouw je het niet, ook niet als het een goed idee is: schrijf het idee in het bouwvolgorde-document onder "geparkeerd" en ga door.

Tempo: twee nieuwe of herschreven pagina's per week, nooit meer. Elke pagina heeft het volledige pakket (sectie 8) of gaat niet live. Dertig complete pagina's verslaan zestig halve.

## 2. Wat er staat (peildatum 5-sep-2026)

- Nederlandse personal-finance site voor mensen die goed verdienen maar toch krap zitten. Geen schuldhulp, geen beleggingsadvies.
- Live: https://www.waarblijfthet.nl. Repo: github.com/waarblijfthet/app. Next.js 14 App Router, Supabase, Resend, Vercel.
- 90 artikelen in `lib/inzichten-data.ts`, 5 echte geanonimiseerde klantrapporten op /rapporten, 6 verwijzerspagina's onder /samenwerken, 4 casestudy-pagina's met bedachte namen (mark-en-lisa, fatima, david-en-tom, sanne-en-joost) die als illustratie gelabeld moeten zijn.
- Verkeer: ongeveer 1.500 tot 2.000 sessies per maand na de knik van 21-aug, 68 procent mobiel. GSC week 18 tot 25 aug: 8.217 vertoningen, 154 klikken, CTR 1,9 procent, positie 7,4. is-4000 staat organisch op plek 1 en is de sterkste interne linkbron.
- Conversie: analyse 14 gestart, 0 afgerond in de week van 28-aug. Nul betaalde Geldscans uit zoekverkeer, ooit. De enige klant kwam via een mens.
- Werkend en af: mailketen via Resend, outreach-CRM met automatische follow-ups en afmeldlink, admin met Vandaag-dashboard en bezoekmeting, sitemap, robots en llms.txt via `scripts/generate-sitemap.mjs`.
- Jarno is de enige persoon achter het project en heeft een baan ernaast. Hij schrijft elke Geldscan zelf, dus boven ongeveer 25 per maand komt de levertijd van 2 werkdagen in gevaar; dan gaat de prijs omhoog, niet het kanaal dicht.

## 3. Harde waarheidsregels (nooit van afwijken)

1. **Nooit een klantcase, review, resultaat of referentie verzinnen.** Een illustratie label je meer dan eens als illustratie, ook in de metaTitel en in het schema.
2. **Elk getal over een echte klant komt uit `lib/rapporten-data.ts`**, via `rapportVoorSlug()` en de constanten `RAPPORTEN.length`, `AANTAL_ZONDER_LEK` en `AANTAL_ZONDER_VERVOLG`. Tel nooit met grep (`grep -c "slug:"` telt de interface en de functieparameter mee). Nooit uit het hoofd typen, ook niet als Jarno het getal aanlevert. Nooit middelen over huishoudens zolang de data-asset (sectie 8, punt G) er niet is; daarna alleen medianen met n per cel, nooit onder n van 10.
3. **Nooit een markt-, uniciteits-, patroon- of cijferclaim zonder gecontroleerde bron met ophaaldatum**, in dezelfde commit. De onjuiste claim "49 euro, uniek in NL" stond negen dagen live. Niet gevonden is niet hetzelfde als niet aanwezig. Geldt ook voor impliciete patroonclaims over een kleine n.
4. **2027-cijfers zijn ramingen tot ze in het Staatsblad of op de site van de uitvoerder staan.** Zet "raming" en de bron met datum in de tekst, en plan de herziening als taak in het bouwvolgorde-document. Prinsjesdag is 15-sep-2026; definitieve zorgpremies komen half november.
5. **Nooit garanties, beloofde bedragen of geld terug.** Beschrijf wat je doet, niet wat het oplevert.
6. **Bij twijfel: claim weglaten.** De echte rapporten zijn sterker dan elke zin die je erbij verzint.

## 4. Positionering

- Eén persoon, Jarno, leest jouw cijfers en schrijft met de hand een geldrapport. Geen app, geen cursus, geen abonnement, geen AI-rapport.
- Voor de goedverdiener in loondienst die maandelijks krap zit. Dragend: Sandra (tweeverdienergezin, koopwoning, 5.000 tot 8.000 netto samen) en Niels (alleenstaand of DINK, 3.500 tot 6.000 netto). Zzp alleen via analyse en rapport. Overige profielen in `docs/icp-personas.md` zijn geparkeerd; geen persona-toetsrondes meer, echte metingen wegen zwaarder.
- Waarom hier en niet bij een concurrent: het werk ligt vooraf op tafel. Alle geleverde klantrapporten openbaar, tarieven erbij. Bij twee van de vijf was er geen lek, en dat staat er gewoon.
- Segment, prijs en toon zijn bezet (Budgetbuddy, Goede Geldgewoonten, budgetcoaches met scans van 40 tot 97 euro). Claim daar nooit onderscheid op. Positioneer op geleverd werk en op eigen cijfers, nooit op karakter. Eerlijk, transparant en persoonlijk zijn claims. Laat ze weg.
- Wat het NIET is: geen schuldhulp, geen boekhouder, geen beleggings- of hypotheekadvies, geen vergunningplichtig advies, geen bespaartips, geen traject als instap.

## 5. Aanbod, prijs en CTA-structuur

- Gratis analyse vergelijkt, de Geldscan van 49 euro verklaart. Bewaak dat verschil in elke tekst: de analyse vertelt dát je afwijkt, de Geldscan zoekt uit waarom.
- Ladder: gratis analyse → Geldscan 49 euro → adviesgesprek 125 euro → traject 497 euro. De laatste twee blijven tekst op aanvraag, nooit een prijskaart naast het rapport. Prijzen openbaar, nooit btw vermelden (KOR). De 49 euro wordt verrekend bij een vervolg. Levering met de hand binnen 2 werkdagen, gegevens daarna verwijderd.
- **De gratis analyse is de enige primaire conversie-ingang.** Primaire CTA is overal exact `Doe de gratis analyse` naar `/analyse` met situatieparameters. De Geldscan staat er als tekstlink met prijs bij, nooit als tweede grote knop op hetzelfde scherm. De enige plek waar de Geldscan de primaire actie is, is het resultaatscherm na de analyse (`app/analyse/stappen/Stap6Resultaat.tsx`).
- Route, label en parameters komen uit `lib/cta.ts`: `analyseHref({ situatie, inkomen, boodschappen })`, `GELDSCAN_ROUTE`, `GELDSCAN_CTA_LABEL`, `geldscanHref({ token })`. Typ `/aanbod/intake?pakket=geldscan` nergens uit. Elke Geldscan-link gaat rechtstreeks naar het aanvraagformulier, niet naar /geldscan; /geldscan blijft bestaan voor zoekverkeer.
- Elke CTA loopt via `components/CtaLink.tsx`, zodat `cta_analysis` en `cta_geldscan` apart geteld worden met pagina, locatie en vervolgpagina.
- **Per artikel precies één Geldscan-verwijzing, in het slotblok van `app/inzichten/[slug]/page.tsx`.** Maximaal twee prominente analyse-CTA's per artikel, het slotblok is er altijd één van. Zet de CTA na het eigen getal van de lezer, nooit boven het antwoord. Rekenaars zijn een opstap: onder elke uitkomst staat dat het een indicatie is, daarna de analyse-CTA, nooit een Geldscan-link.
- CTA per zoekmoment: op bedrag- en benchmarkpagina's de analyse na het eigen getal; op 2027-pagina's "reken uit wat dit voor jouw huishouden doet"; op levensgebeurtenispagina's de analyse als voor en na.
- Het aanvraagformulier (`app/aanbod/intake/GeldscanAanvraag.tsx`) vraagt vóór betaling alleen voornaam, e-mail, optionele situatie en optioneel bericht. Nooit inkomen, woonlasten of afschriften vóór de koop. Volgorde: aanmelden, betaalverzoek, na betaling gegevens aanleveren. Zodra twee aanvragen niet betalen: betaallink direct in de bevestigingsmail.
- Wie de analyse afrondt en een e-mailadres achterlaat krijgt drie opvolgmails via Resend: dag 0 het resultaat, dag 3 het rapport dat het meest lijkt, dag 8 de Geldscan met prijs en de twee zonder lek. Bouwen in fase 1, teksten bewerkbaar in de admin.
- Pakketwijziging pas als twaalf rapporten geleverd zijn en minstens vijf klanten uit zichzelf om een vervolg vragen. Nooit veranderen: één ding tegelijk, geen abonnement, geen cursus, geen garantie. Prijs mag alleen omhoog, en alleen als de 2 werkdagen in gevaar komen.

## 6. Copyregels

1. Altijd ik, mij, mijn. Nooit wij, we, ons, behalve in letterlijke klantcitaten en Jarno's eigen gezinsverhalen.
2. Geen em dashes, en nooit een koppelteken als scheidingsteken. Komma, punt of nieuwe zin. Geldt ook voor metaTitel, metaDescription, bronlabels, hints en mails.
3. Belofte van het rapport: de drie dingen die het meest opvallen, plus wat juist niet uit de toon valt. Valt er niets te repareren, dan staat dat er ook. Nooit "je drie grootste lekken".
4. Noem bij elke vergelijking waarop wel en niet vergeleken wordt, en dat de maatstaf de eigen huishoudens zijn met een kleine n.
5. Geen diagnose vooraf ("structuurprobleem"), geen jargon, geen bespaartips.
6. Het woord "eerlijk" nooit in copy. Eerlijkheid toon je.
7. PSOhub en de functie CTO nooit noemen. Bio-zin: "Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte."
8. Toon: nuchter, direct, geen verkooppraat. Fonts Fraunces (kop) en Plus Jakarta Sans (body). Kleuren #1C3A2A groen, #C4603A terracotta, #F5F0E8 en #FDFAF4 creme. De homepage draait op een eigen wijnrood/goud palet (#7B2D3E), bewust en alleen daar.
9. Schrijf voor de zoeker én de AI-zoekmachine tegelijk: het antwoord staat in de eerste alinea (40 tot 60 woorden, met het getal), koppen zijn de vraag die de zoeker typt, elke sectie beantwoordt één vraag volledig, elk cijfer heeft een bron met datum in de zin of direct erna.

## 7. Kanaal

Er is één kanaal: mensen die zelf zoeken en landen. Google, Bing en AI-zoekmachines (ChatGPT, Perplexity, Google AI-overzichten). Alles wat hieronder niet staat is dicht tot na 31-jan-2027: LinkedIn (Jarno's netwerk daar is buitenlands en niet-ICP), betaalde advertenties, media-pitches, werkgevers, podcasts, gastblogs, forums als promotiekanaal.

**Verwijzers** lopen door op de bestaande automaat (25 mail-1's per dag, `OUTREACH_DAGBUDGET`, teksten in `lib/outreach/mails.ts`, afmeldlink via `lib/outreach/afmelden.ts`). Er gaat geen bouw-, schrijf- of denktijd meer naartoe. Reageert een verwijzer, dan handelt Jarno dat zelf af. Onderbouwing en copyregels staan in `docs/outreach-strategie-jul-2026.md`; raadpleeg die alleen als de automaat stuk is.

**Bewijs oogsten** blijft groeiwerk: een geleverde Geldscan is pas af bij schriftelijke toestemming, één citaat in de eigen woorden van de klant, en een nameting na 6 weken. Format: `docs/aanleverformat-voorbeeldrapporten-30-jul-2026.md`. Elk nieuw rapport komt op /rapporten en wordt vanuit zijn huishoud-hub gelinkt.

## 8. SEO en AI-zoekmachines: de werkregels

**Volgorde van werk.** Funnel vóór content: zolang de analyse-afronding niet gemeten is en het grootste lek niet gedicht, gaat er geen nieuwe pagina live (plan sectie 6). Daarna per maand: eerst de CTR-ronde, dan cluster Z, dan hubs, dan spaken.

**A. Verificatie**
1. SERP-verificatie alleen met Chrome op google.nl (hl=nl, gl=nl), één sessie per cluster, uitkomsten in `docs/serp-<cluster>-<datum>.md`: wie staat er, is er een AI-overzicht, wat staat in "Meer om te vragen" en "Mensen zoeken ook naar", staat er een eigen URL. De WebSearch-tool staat niet op Nederland en is voor dit werk verboden. Nibud.nl blokkeert automatisch opvragen; vraag Jarno om die cijfers.
2. Vóór elke nieuwe pagina: GSC-filter op de zoekterm. Vertoont een bestaande URL er al op, dan upgraden in plaats van bouwen. Kannibalisatie is de duurste fout op deze site (zes probleemtaal-artikelen, nul rankings).
3. Zoekvolumes verzin je niet. Er is geen keywordtool en die komt er niet. Beslis op SERP-samenstelling, GSC-vertoningen en de score uit `docs/serp-brainstorm-18-aug-2026.md`.

**B. Architectuur**
4. Clusters op huishouden, nooit op salarisbedrag. Vijf hubs: tweeverdieners met kinderen, stel zonder kinderen, alleenstaand, alleenstaande ouder, zzp. Elke pagina hoort bij één hub en linkt ernaar; elke hub linkt naar al zijn spaken en naar het echte rapport van dat huishoudtype.
5. Elke nieuwe pagina krijgt in dezelfde deploy minstens twee inkomende links, waaronder zijn hub en, bij alles over inkomen, is-4000. Zonder inkomende links geldt hij als niet gepubliceerd.
6. Eén pagina per zoekintentie. Overlappende pagina's krijgen een eigen zoekterm of een 301 in `next.config.mjs`, nooit een noindex zonder redirect.
7. Bedragen: alleen 3.500 tot 6.500 netto, en alleen als variant of FAQ binnen een bestaande pagina, behalve is-3500 als eigen pagina. Bruto-drift boven 6.500 is loopbaanintentie, niet bouwen.

**C. Paginapakket (verplicht, anders niet live)**
8. Antwoord met getal in de eerste 40 tot 60 woorden; tabel per huishoudtype of per bedrag direct daarna; koppen als vragen.
9. Interactief element: `SalarisRekenaar` of `BoodschappenSituatiekiezer` met eigen startwaarden, of een nieuwe situatiekiezer. Geen uurtarief-rekenaar voor kinderopvang, geen bruto-netto- of hypotheekrekenaar.
10. Eigen cijfer met n uit `lib/rapporten-data.ts` of, zodra die bestaat, uit de data-asset (punt G). Minstens één echt rapport gelinkt met bedrag.
11. Vijf FAQ's met FAQPage-schema, elke FAQ een volledig antwoord van 2 tot 4 zinnen.
12. Drie bronnen met ophaaldatum (CBS, CPB, Rijksoverheid, Belastingdienst, Zorginstituut, internetconsultatie, Nibud via Jarno). Geen forums, mamablogs of affiliates als "onderzoek".
13. Eén primaire analyse-CTA na het eigen getal, met situatieparameters; Geldscan als tekstlink in het slotblok.
14. Zichtbare regel "Cijfers bijgewerkt op [datum]" onder de kop en `dateModified` in het Article-schema, bijgewerkt bij elke cijferwijziging.
15. Jaartal in metaTitel waar de zoeker het typt. Vanaf 1 december is dat 2027. Getal of jaartal vooraan in de titel, geen em dash, maximaal 60 tekens.
16. Mobiel eerst: tabellen scrollen binnen hun container, rekenaars met duim bedienbaar, geen layout-shift.

**D. Schema en entiteit**
17. Op elke artikelpagina: Article (author Jarno Koopman, datePublished, dateModified), FAQPage, BreadcrumbList. Op /over: Person met sameAs. Sitewide: Organization. Op de data-asset: Dataset. Eén consistente naam en auteur overal.
18. Illustratieve casestudy's krijgen geen Article-schema met author als feit; label ze in tekst én titel als illustratie, of zet ze om naar een echt rapport.

**E. Indexering en AI-vindbaarheid**
19. Elke nieuwe of herschreven URL dezelfde dag handmatig indienen in Google Search Console. IndexNow (eigen tool) bereikt Bing en Yandex; Bing Webmaster Tools moet aan staan met de sitemap, want ChatGPT-zoeken leunt op Bing.
20. `public/llms.txt` en de sitemap worden bij build geregenereerd door `scripts/generate-sitemap.mjs`; controleer na elke publicatie dat de nieuwe URL erin staat. AI-verwijzingen zijn nu 0,1 tot 0,5 procent van het verkeer; llms.txt is hygiëne, geen kanaal. Wat AI-zoekmachines wél laat citeren is punt 8, 10, 12 en 14: direct antwoord, eigen data met n, bron met datum, zichtbare versheid.
21. Test maandelijks vijf kernvragen met de hand in ChatGPT, Perplexity en Google met AI-overzicht, en noteer of en welke eigen URL geciteerd wordt in de vrijdagmeting.

**F. Onderhoud**
22. CTR-ronde elke maand vóór nieuw werk: elke URL met meer dan 100 vertoningen en minder dan 2 procent CTR krijgt een nieuwe metaTitel en een nieuw antwoordblok; oude en nieuwe titel plus meetdatum in het bouwvolgorde-document, meten na 28 dagen.
23. 2027-sweep in de week van 8 december: elke URL met 2026 in metaTitel of antwoordblok krijgt bijgewerkte cijfers, 2027 in de titel en een nieuwe dateModified. Zelfde URL, geen nieuwe slug. Op 5-sep zijn dat 17 metaTitels.
24. Regelveranderingen (cluster Z) publiceer je vóór het nieuwsmoment met de raming en herschrijf je binnen 48 uur na de definitieve cijfers. Z2 (koopkracht 2027) vóór 15-sep, herzien 16-sep.

**G. Data-asset**
25. "Waar blijft het bij [n] huishoudens": medianen per uitgavenpost per huishoudtype uit analyses met toestemming plus de rapporten, n per cel, geen cel onder n van 10, maandelijkse herberekening als job, zichtbare datum, Dataset-schema. Toestemming wordt als één opt-in-zin gevraagd op het resultaatscherm en opgeslagen via een server-route. Zodra de pagina bestaat, citeren artikelen die als eigen bron met n en datum.

**Wat niet gebouwd wordt:** bruto-netto-rekenaars, max-hypotheek-rekenaar, verzekeringen of spaarrentes vergelijken, beleggen of box 3 als hoofdonderwerp, bespaartips, bedragen onder 3.500 of boven 6.500, dienst-keywords met plaatsnaam, nieuwe adminschermen of dashboards, herontwerp van header, footer, hero, /aanbod of /over, nieuwe casestudy's met bedachte namen, uurtarief-rekenaar kinderopvang.

## 9. Meten en killcriteria

Elke vrijdag, tien minuten, met de hand, in één regel in `docs/bouwvolgorde.md`: sessies, analyses gestart, analyses afgerond, e-mailadressen, Geldscan-aanvragen, betaalde Geldscans, URL's met minstens één klik, URL's boven 100 vertoningen en onder 2 procent CTR, eigen URL's geciteerd in de vijf AI-testvragen. Geen nieuw dashboard.

- **19-sep-2026:** analyse-afronding nog 0 procent, dan stopt alle contentbouw tot het lek gevonden is.
- **1-nov-2026:** minder dan 3.000 sessies per maand of minder dan 5 betaalde Geldscans uit zoekverkeer, dan gaan clusters L en B in de wacht en gaat alle tijd naar cluster Z, de hubs en de CTR-rondes.
- **31-jan-2027:** 100 is het doel; 50 betekent dat het plan werkt en doorloopt; onder 20 is aanbod of prijs fout, dan eerst 29 euro testen (en pas daarna 9), geen nieuw kanaal openen.
- **Contentkill:** een pagina die na 90 dagen minder dan 20 vertoningen per maand heeft en geen inkomende links van buiten, wordt samengevoegd of ge-301'd bij de volgende CTR-ronde.
- **Capaciteitskill:** meer dan 25 Geldscan-aanvragen in een maand, dan gaat de prijs naar 69 euro en niet de levertijd omhoog.
- Een sessie zonder afgerond deliverable in de bouwvolgorde is een verloren sessie. Twee op rij, dan is de volgende sessie alleen CTR-werk op bestaande pagina's.

## 10. Technische werkregels

1. **Bestanden schrijven of wijzigen altijd via python3 in bash** (heredoc of read plus replace). De Edit- en Write-tools trunceren bestanden stilzwijgend op dit NTFS-mount. Controleer met `wc -l`.
2. Na elke codewijziging moet `npx tsc --noEmit --incremental false` schoon zijn. Check ook op null bytes. Schrijf objectvelden expliciet uit (`inkomen: inkomen`), de minifier van Next 14.2 breekt verkorte objectnotatie.
3. **Een migratie die de code nodig heeft, hoort in dezelfde deploy als die code.** Nooit een verzendende of opslaande functie laten afhangen van een SQL-bestand dat iemand met de hand moet draaien. Kan dat niet, bouw een fallback die niet stil is. Draai bij elke sessie met een nieuw SQL-bestand de diagnosequery en loop het publieke formulier zelf door.
4. **Supabase RLS:** server-writes en admin-reads via `createServiceClient()` met `isAdminRequest()`. Publieke formulieren via server-routes, nooit via de anon-client. `.insert(...).select()` vraagt stilzwijgend een SELECT-policy; genereer het id client-side met `crypto.randomUUID()` (zie `components/PageTracker.tsx`).
5. **Meting:** nieuwe events (analysestap, toestemming, CTA) volgen het `PageTracker`-patroon en verschijnen in het bestaande Vandaag-dashboard. Geen nieuw scherm.
6. **MX mag nooit naar de Vercel-apex of een CNAME wijzen.** MX is `10 mail.waarblijfthet.nl`, mail draait op 45.82.188.190, Resend verstuurt alleen. Postbus hallo@waarblijfthet.nl.
7. Vercel: lange klussen als job plus step-lus (ongeveer 20s per call, `maxDuration=60`), geen externe queue. De maandelijkse herberekening van de data-asset draait zo ook.
8. **De header is `sticky`, niet `fixed`.** Pagina's hebben geen compensatie-padding. Voer je een overlay-header in, dan moet die padding terug op alle pagina's.
9. **Nieuw artikel:** entry vooraan in `lib/inzichten-data.ts` (met `cta`-veld en `dateModified`), content-component in `app/inzichten/[slug]/content/`, import en map in `ArticleBody.tsx`, twee inkomende links in dezelfde deploy, GSC-indiening dezelfde dag. Sitemap, robots en llms.txt regenereren bij build.
10. **Redirects** in `next.config.mjs`, altijd 301, oude URL uit de sitemap, interne links omzetten in dezelfde commit.
11. **Git:** committen aan het eind van elke sessie met wijzigingen, ongevraagd, met het git-blok in de reactie. Pushen doet alleen Jarno. Blijft de commit hangen op `HEAD.lock` of `index.lock`, dan haalt Jarno die weg en draai je `git commit` direct als eerstvolgende commando. Nooit een build-tar of `.env` in de repo.

## 11. Openstaande waarheidsschuld (opruimen zodra je in de buurt komt)

- De zin "ik verwijder je afschriften en aangeleverde gegevens" klopt alleen zolang Jarno dat met de hand doet. Er verwijdert niets softwarematig.
- De vier casestudy-pagina's met bedachte namen: controleren op illustratielabel in tekst, titel en schema, en of ze de echte rapporten in de SERP verdringen (fase 0 van het uitvoeringsprompt). Beslissing door Jarno.
- `lib/benchmarks.ts` is herijkt op de vijf huishoudens met herkomst en n per getal. `VRIJ_PCT` is het enige normatieve getal dat daar niet uit af te leiden is.
- Em dashes staan nog in honderden metaTitels, metaDescriptions en bronlabels. Ruim ze op per pagina die je aanraakt, in elk geval in elke CTR-ronde.
- "Structuurprobleem" staat nog in twee artikelen en vier FAQ-antwoorden.
- Openstaande feitfouten uit `docs/serp-brainstorm-18-aug-2026.md` sectie "Nog open": boodschappenbedrag in goed-salaris-toch-krap, afbouwgrens heffingskortingen in twee artikelen, ongesourcete BSO-bedragen, ongeverifieerde spaarcijfers. Fixen bij de eerste keer dat je die pagina aanraakt.

## 12. Waar de onderbouwing staat

Raadpleeg alleen als je de reden achter een besluit nodig hebt.

- `docs/plan-seo-conversie-100-geldscans-05-sep-2026.md` en `docs/uitvoeringsprompt-opus-seo-100-geldscans-05-sep-2026.md`: het geldende plan en de fasen.
- `docs/serp-inkomensbedragen-17-aug-2026.md`, `docs/serp-brainstorm-18-aug-2026.md`, `docs/artikelkansen-serp-30-jul-2026.md`, `docs/alternatieve-kanalen-jul-2026.md`: geverifieerde SERP's en scores. Niet opnieuw doen.
- `docs/groeibeslissing-aug-2026.md`: de conversierekensom en de elf gecorrigeerde onderzoekscijfers.
- `docs/artikel-bouwprompts-aug-2026.md`: de vaste zesstappenwerkwijze en afvinklijst per artikel.
- `docs/icp-personas.md`: de profielen. Alleen Sandra en Niels zijn actief.
- `docs/aanleverformat-voorbeeldrapporten-30-jul-2026.md` en `docs/vragenlijst-geldrapport-30-jul-2026.md`: wat je per klant ophaalt.
- `docs/outreach-strategie-jul-2026.md`: de verwijzersautomaat, alleen bij storing.
- `docs/archief-claude-md-05-sep-2026.md`, `docs/archief-claude-md-17-aug-2026.md`, `docs/archief-claude-md-tm-19-jul-2026.md`: alle eerdere versies en sessielogboeken.
