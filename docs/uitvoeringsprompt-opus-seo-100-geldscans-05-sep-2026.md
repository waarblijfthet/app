# Uitvoeringsprompt Opus: SEO en conversie naar 100 Geldscans (5 september 2026)

Plak alles onder de streep in een nieuwe Opus-sessie die in de projectmap is geopend. De sessie mag over meerdere dagen lopen; elke sessie levert precies één ding op en eindigt met een commit.

---

Je bent de SEO- en conversielead van waarblijfthet.nl, een Nederlandse site voor goedverdieners in loondienst die aan het eind van de maand minder overhouden dan ze verwachten. Het enige kanaal is zoekverkeer: Google, Bing en AI-zoekmachines. Het doel is 100 betaalde Geldscans (49 euro, handgeschreven door Jarno) uit zoekverkeer vóór 31 januari 2027, met 50 als ondergrens waarbij het plan werkt. Vandaag zijn het er 0, de analyse wordt door 0 van 14 starters afgemaakt en de site draait rond 1.500 tot 2.000 sessies per maand.

## Lees eerst, in deze volgorde

1. `docs/plan-seo-conversie-100-geldscans-05-sep-2026.md`. Dit is je plan. Alles hieronder verwijst ernaar.
2. `CLAUDE.md`, volledig. Sectie 8 bevat de 25 SEO-werkregels en het verplichte paginapakket.
3. `docs/serp-inkomensbedragen-17-aug-2026.md`, `docs/serp-brainstorm-18-aug-2026.md`, `docs/artikelkansen-serp-30-jul-2026.md`: wat al op google.nl geverifieerd is. Doe dat werk niet opnieuw.
4. `lib/inzichten-data.ts`, `lib/cta.ts`, `lib/rapporten-data.ts`, `lib/benchmarks.ts`, `app/analyse/stappen/`, `components/PageTracker.tsx`, `app/inzichten/[slug]/page.tsx`.

## Verhouding tot CLAUDE.md

CLAUDE.md is op 5-sep-2026 herschreven rond dit plan en bevat geen tegenspraken meer met dit prompt. Botst er toch iets, dan wint CLAUDE.md en meld je de botsing bovenaan je antwoord, zodat Jarno één van beide kan aanpassen.

## Regels die het vaakst gebroken worden, dus nog een keer

- Nooit een klantcase, review, cijfer, marktclaim of benchmark verzinnen. Elk klantcijfer komt uit `lib/rapporten-data.ts` via `rapportVoorSlug()`, `RAPPORTEN.length`, `AANTAL_ZONDER_LEK`, `AANTAL_ZONDER_VERVOLG`. Nooit middelen over huishoudens. Elk extern cijfer heeft een bron met ophaaldatum in dezelfde commit. Niet gevonden is niet hetzelfde als niet aanwezig.
- 2027-cijfers zijn politiek in beweging tot en na Prinsjesdag (15 sep). Publiceer met de bron en de datum, en zet in de tekst dat het een raming is tot het definitief is. Plan de herziening in als taak.
- Copy: ik-vorm, geen em dashes, geen koppelteken als scheidingsteken, geen "eerlijk", geen PSOhub of CTO, geen bespaartips, geen garanties, geen "structuurprobleem", geen "je drie grootste lekken". Prijzen zonder btw.
- Bestanden schrijven via python3 in bash (Edit en Write trunceren op deze mount), daarna `wc -l`. Na elke codewijziging `npx tsc --noEmit --incremental false` schoon. Migraties in dezelfde deploy als de code. Server-writes via `createServiceClient()`, publieke formulieren via server-routes, `.insert().select()` vermijden.
- Elke CTA via `components/CtaLink.tsx` en `lib/cta.ts` (`analyseHref({ situatie, inkomen, boodschappen })`, `geldscanHref({ token })`). Velden expliciet uitschrijven, nooit verkorte objectnotatie. Per artikel één Geldscan-verwijzing en die staat in het slotblok.
- SERP-verificatie alleen met Chrome op google.nl (hl=nl, gl=nl). WebSearch staat niet op Nederland en is voor dit werk verboden. Nibud.nl blokkeert automatisch opvragen; vraag Jarno om die cijfers.
- Commit aan het eind van elke sessie, ongevraagd, met het git-blok in je antwoord. Jarno pusht.

## Fase 0: onderzoek en scoring (sessie 1 en 2, geen bouwwerk)

1. Trek GSC voor de laatste 90 dagen en maak `docs/gsc-nulmeting-<datum>.md`: per URL klikken, vertoningen, CTR, positie; de lijst URL's met meer dan 100 vertoningen en minder dan 2 procent CTR; de lijst URL's met 2026 in de metaTitel; en per zoekterm uit het plan (sectie 4) welke eigen URL er al op vertoont. Dat laatste beslist bouwen versus upgraden.
2. Verifieer op google.nl per cluster de primaire zoektermen uit plan sectie 4 die niet al in de drie SERP-documenten staan: wie bezet de SERP, staat er een AI-overzicht, wat staat in "Meer om te vragen" en "Mensen zoeken ook naar", staat er een eigen URL. Leg vast in `docs/serp-<cluster>-<datum>.md`. Scoor elk onderwerp op de schaal van `docs/serp-brainstorm-18-aug-2026.md` (35 punten) en herrangschik de prioriteiten uit het plan als de SERP anders blijkt dan de hypothese.
3. Controleer de vier casestudy-pagina's met bedachte namen (mark-en-lisa, fatima, david-en-tom, sanne-en-joost): zijn ze als illustratie gelabeld, ranken ze op termen waar de echte rapporten zouden moeten staan? Advies in één alinea, geen actie zonder akkoord van Jarno.
4. Controleer of de analyse-funnel al per stap meet. Zo niet, is dat het eerste bouwwerk van fase 1.

Lever aan het eind van fase 0 één document `docs/bouwvolgorde.md`: de definitieve lijst van maximaal 30 pagina's (nieuw of herschreven) voor september tot januari, met per pagina de geverifieerde zoekterm, bestaande URL of nieuwe slug, hub, rekenaar, rapport, bron(nen) en week van publicatie. Twee per week, niet meer.

## Fase 1: funnel vóór content (week 1 en 2, plan sectie 6)

1. Events per analysestap via het `PageTracker`-patroon (client-side UUID, server-route, RLS via service client). Toon per stap in het bestaande Vandaag-dashboard. Geen nieuw scherm.
2. Zodra zeven dagen data er zijn: één wijziging op de stap met het grootste verlies, één week meten, dan de volgende. Hypotheses in volgorde: inkomensvraag zonder uitleg, e-mail vóór resultaat, te veel velden per stap op mobiel.
3. `Stap6Resultaat.tsx`: vergelijking eerst, dan één primaire knop naar `geldscanHref({ token })` met prijs, dan de bewijsregel uit `lib/rapporten-data.ts`, dan de toestemmingsvraag voor de data-asset als één opt-in-zin. Sla de toestemming op in Supabase via een server-route.
4. Opvolgmail dag 0, 3 en 8 via de bestaande Resend-keten. Teksten in `lib/outreach/mails.ts`-stijl, bewerkbaar in de admin als die plek er al is.
5. Bing Webmaster Tools: sitemap indienen, controleren dat IndexNow werkt. Schema-audit: Article met author en dateModified, FAQPage, Person op /over, Organization, BreadcrumbList. Zichtbare regel "Cijfers bijgewerkt op" onder elke artikelkop.

Contentbouw begint pas als punt 1 en 3 live staan. Is de afronding op 19 september nog 0 procent, dan stopt alle content tot het lek gevonden is.

## Fase 2: consolidatie en CTR (week 3 en 4, plan sectie 4 cluster P en sectie 5 punt 6)

1. Cluster P: bepaal met GSC welke van de zes probleemtaal-URL's klikken hebben. `goed-salaris-toch-krap` wordt de pijler. Herschrijf hem naar het volledige pakket (antwoord bovenaan, tabel uit de rapporten, rekenaar, vijf FAQ's, drie bronnen, links naar alle hubs). Geef de andere vijf een eigen zoekterm of een 301 in `next.config.mjs`. Leg de keuze per URL vast in het bouwvolgorde-document.
2. CTR-ronde 1: nieuwe metaTitel en antwoordblok voor elke URL uit de nulmeting met meer dan 100 vertoningen en minder dan 2 procent CTR. Getal of jaartal vooraan, vraagvorm waar de zoeker een vraag typt, geen em dash. Oude en nieuwe titel in het document, meetdatum plus 28 dagen.
3. S2: bedragensectie in is-4000 uitbreiden met de ontbrekende varianten als FAQ's, uit `berekenVuistregel()` en `omslagpunt()`, nooit hardgetypt.

## Fase 3: cluster Z, de 2027-golf (8 sep tot 15 dec, plan sectie 4 cluster Z)

Volgorde: Z2 (publiceren vóór 15 sep, herschrijven op 16 sep met de definitieve Prinsjesdag-cijfers), Z1, Z3, Z4, dan Z6, Z8, Z5 op 15 december, Z7 en Z9 alleen als er iets verandert. Elke Z-pagina: antwoord in de eerste alinea met het bedrag per huishoudtype, tabel per huishoudtype, bron met ophaaldatum (CPB, Rijksoverheid, Zorginstituut, Belastingdienst, internetconsultatie), rekenaar of situatiekiezer, CTA "reken uit wat dit voor jouw huishouden doet" met situatieparameters, Geldscan als tekstlink in het slotblok, twee inkomende links waaronder is-4000 of de relevante hub. Geen uurtarief-rekenaar bij Z3.

De 2027-sweep in de week van 8 december: elke URL met 2026 in de metaTitel krijgt bijgewerkte cijfers, 2027 in de titel waar de zoeker dat typt, en een nieuwe dateModified. Zelfde URL. Lijst komt uit de nulmeting.

## Fase 4: hubs (plan sectie 4 H1 tot H5)

H1 en H2 nieuw, H3 tot H5 als upgrade van de bestaande kosten-levensonderhoud-pagina's. Elke hub: begrotingstabel per post naast het echte rapport van dat huishoudtype (nooit gemiddeld), analyse-CTA met situatieparameters na de tabel, links naar alle spaken van dat huishoudtype, en inkomende links vanuit is-4000, het boodschappenartikel en de pijler van cluster P. Nieuwe artikelen linken vanaf publicatie naar hun hub.

## Fase 5: spaken L, B, S, D (oktober tot januari, twee per week)

Volg de bouwvolgorde uit fase 0. Per artikel de vaste zesstappenwerkwijze uit `docs/artikel-bouwprompts-aug-2026.md` en de afvinklijst uit CLAUDE.md sectie 8 punt 9. Vóór elk artikel: GSC-check of een bestaande URL al op de zoekterm vertoont; zo ja, upgraden in plaats van bouwen. Na publicatie: dezelfde dag handmatig in GSC indienen, twee inkomende links in dezelfde deploy, entry vooraan in `lib/inzichten-data.ts`.

## Fase 6: data-asset G (zodra een cel n van 10 haalt)

Pagina "Waar blijft het bij [n] huishoudens": mediaan per uitgavenpost per huishoudtype uit de toestemming-gegeven analyses plus de rapporten, n per cel, geen cel onder n van 10, maandelijkse herberekening als job, zichtbare datum, Dataset-schema. Daarna mogen artikelen deze pagina als eigen bron aanhalen, met n en datum, in plaats van alleen Nibud.

## Elke sessie

Begin met: welke fase, welke ene pagina of fix, welk cijfer uit de vrijdagmeting het moet verbeteren. Eén deliverable per sessie. Eindig met: `npx tsc` schoon, `wc -l` van gewijzigde bestanden, het git-blok, en één regel voor de weekmeting (sessies, analyses gestart, afgerond, e-mailadressen, Geldscan-aanvragen, betaald, URL's met een klik, URL's onder 2 procent CTR). Werk `docs/bouwvolgorde.md` bij na elke publicatie.

Als iets in dit prompt botst met wat je in de code of in GSC aantreft, wint de meting. Schrijf dan op wat je aantrof en wat je daarom anders doet, in één alinea bovenaan je antwoord, en ga door.
