# Waar blijft het — projectcontext (lees dit eerst)

Compacte overdracht zodat een nieuwe sessie meteen op de hoogte is. Lees dit aan het begin van elke sessie.

## Wat het is
Nederlandse personal-finance site voor mensen die **goed verdienen maar tóch krap zitten**. Géén schuldhulp, géén beleggingsadvies, eerlijk inzicht + lichte coaching.
- Stack: Next.js 14 (App Router), Supabase, Resend, recharts, Tailwind. Repo: github.com/waarblijfthet/app. Live: https://www.waarblijfthet.nl
- Toon: nuchter, eerlijk, geen jargon. Fonts: Fraunces (kop) + Plus Jakarta Sans (body). Kleuren: #1C3A2A (groen), #C4603A (terracotta), #F5F0E8/#FDFAF4 (creme).
- **Jarno is de enige persoon achter het project.** Altijd "ik/mij/mijn" in copy, nooit "wij/we/ons". Uitzondering: als hij over zijn gezin spreekt ("wij thuis") is dat logisch.
- **Geen em dashes en geen koppeltekens als scheidingsteken in copy.** Altijd vervangen door komma, punt of nieuwe zin. Dit geldt voor alle bestanden, inclusief hints, labels en meta-teksten.
- **CTO nooit noemen** in copy (te elitair, mensen herkennen het niet). Artikel-bio en FAQ gebruiken: "Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte."

## START HIER (voor een nieuwe sessie, bijgewerkt 8-jul-2026)

Harde werkregels, altijd toepassen:
1. Bestanden schrijven/wijzigen ALTIJD via python3 in bash (heredoc of read+replace). De Edit/Write-tools trunceren bestanden op dit NTFS-mount.
2. Na elke codewijziging: `npx tsc --noEmit --incremental false` moet schoon zijn.
3. Geen em dashes in copy, ik-vorm (nooit wij), prijzen zonder btw-vermelding (KOR), CTO nooit noemen.
4. NOOIT klantcases, reviews of resultaten verzinnen. Testimonials zijn echte (geanonimiseerde) klanten; voorbeelden altijd expliciet als illustratie labelen. Dit is een vaste afspraak met Jarno.
5. Nieuw artikel = entry in `lib/inzichten-data.ts` (vooraan array, optioneel `cta`-veld voor contextuele CTA) + content-component in `app/inzichten/[slug]/content/` + import/map in `ArticleBody.tsx`. Sitemap/llms.txt regenereert bij build. Na deploy handmatig indienen in GSC.

Openstaande prioriteiten (in volgorde):
1. **Rapport-template voor het geldrapport maken** (bestaat nog niet; nodig zodra de eerste geldscan binnenkomt: vaste secties in huisstijl, alleen analyse-deel persoonlijk invullen).
2. **E-mailflow na de analyse** (dag 0 resultaat / dag 2 grootste afwijking / dag 5 uitnodiging geldscan+gesprek), zie docs/growth-plan-conversie-juli-2026.md.
3. **SEO cluster B** uit docs/groeiplan-seo-juli-2026.md: merkterm-artikel "waar blijft mijn geld" versterken/uitbouwen; daarna cluster C (hoeveel spaargeld is normaal, gemiddelde vaste lasten) en D (rondkomen van X euro-serie).
4. **Outreach draaien**: 10-20 mails per dag, follow-ups via de knoppen, replies zijn de metric. Check of `supabase/outreach_followup.sql` al gedraaid is en of de Resend-webhook + RESEND_WEBHOOK_SECRET staan.
5. Alleenstaande-testimonial (wacht op echte klant, niet verzinnen).

Meetpunten: geboekte gesprekken en geldscan-aanvragen (echte KPI), benchmark-mailaanvragen (notificaties op hallo@), GSC-posities cluster A (/financieel-coach e.o.), funnel-tab in /admin.

## Aanbod / funnel
Gratis analyse (lead-instap, primaire CTA) → **Geldscan €49** (async, /geldscan: klant krijgt "jouw persoonlijke geldrapport", persoonlijk geschreven PDF van 2 à 3 pagina's met de 3 grootste lekken; geld-terug-garantie; €49 wordt verrekend bij vervolg) → **Eenmalig adviesgesprek €125** (/adviesgesprek) → Traject €497. /aanbod is situatie-gedreven (3 scenario-kaarten met anchors, geen SaaS-grid), nav-label heet "Tarieven".
- **Btw: KOR (kleineondernemersregeling) → géén btw. Prijzen €125 / €497 ZONDER btw vermelden.** (Nog: KvK + KOR aanmelden.)

## Belangrijke beslissingen
- Testimonials = **echte** (geanonimiseerde) gezinnen: Daan & Roos (potjes), Bram & Eva (boodschappen), Karim & Noor (BSO). Namen aangepast.
- Primaire CTA overal = gratis analyse (warmmaker); gesprek is de vervolgstap (op analyse-resultaat + /adviesgesprek).
- Hero-paragraph (homepage): "Je betaalt alles op tijd. Je doet niks geks. Maar aan het einde van elke maand is het gewoon weg. Je weet niet precies waarheen. Dat ligt niet aan jou, het is een structuurprobleem. Ik laat zien waar het naartoe gaat, zodat je het kunt bijsturen."

## Content-architectuur: alleenstaanden (pillar + sub-artikelen)
Hub-and-spoke structuur rond het alleenstaande-segment:
- **Pillar page**: `kosten-levensonderhoud-alleenstaande-2026` — persona-selector bovenaan, single premium uitleg, links naar sub-artikelen onderaan.
- **Sub-artikel 1**: `kosten-levensonderhoud-alleenstaande-ouder-2026` — ALO-kop, kindgebonden budget, inkomendrempel boven €29.736 verduidelijkt.
- **Sub-artikel 2**: `kosten-levensonderhoud-zzp-alleenstaande-2026` — AOV, pensioenreservering, voorlopige aanslag, buffer €23.000.
- **Sub-artikel 3**: `kosten-levensonderhoud-alleenstaande-50-plus-2026` — AOW €1.400, Nibud minimum, pensioengat, lijfrente.
- Alle vier ICP-gevalideerd (10-jun-2026). Content-bestanden in `app/inzichten/[slug]/content/`.

## Outreach mini-CRM
Beheer via admin-tab "Outreach". Systeem: Supabase-tabel `outreach_contacts` + Resend voor verzending.
- **4 doelgroepen** met eigen email-template en subject:
  - `relatietherapeuten`: "wat als geld de belangrijkste oorzaak blijkt?"
  - `budgetcoaches`: "als iemand goed verdient maar jouw aanpak niet past"
  - `financieel-planners`: "als er te weinig overblijft om jouw advies uit te voeren"
  - `burnout-coaches`: "wat als geld het herstel in de weg zit?"
- UI: categoriedropdown bij toevoegen, filterpills per doelgroep, categorie-kolom in tabel.
- **Inline bewerken + multiselect (11-jun v3)**: naam en e-mail zijn inline-invoervelden (opslaan bij blur), categorie is een inline dropdown, alle drie via `PATCH /api/admin/outreach`. Checkbox per rij + "selecteer alles" en een knop "Verstuur geselecteerde (n)"; zonder selectie blijft "Verstuur nieuwe" zichtbaar. Versturen raakt alleen status `nieuw`.
- Relevante bestanden: `app/api/admin/outreach/send/route.ts` (templates), `app/api/admin/outreach/route.ts` (GET/POST/PATCH/DELETE), `app/admin/components/OutreachTabblad.tsx` (UI).
- Resend-webhook voor open/klik tracking: `app/api/webhooks/resend/route.ts`. Vereist `RESEND_WEBHOOK_SECRET` in Vercel env (nog in te stellen).
- **`supabase/outreach_contacts.sql` MOET nog eenmalig gedraaid worden** in Supabase SQL-editor voor de tabel bestaat. (RLS-policy aangescherpt naar `to authenticated` op 11-jun, draai opnieuw als de oude policy al bestond.)

## Prospect-zoeker (admin-tab "Prospects")
Verzamelt zelfstandig namen + e-mailadressen van potentiële samenwerkingspartners en zet ze na goedkeuring in de outreach mini-CRM. Toegevoegd 11-jun-2026.
- **Twee bronnen**: (1) URL van een overzichtspagina (ledenlijst/verwijsgids), of (2) zoekwoorden (doelgroep + stad, één zoekopdracht per regel, max 10). URL werkt het betrouwbaarst.
- **Zoekwoorden-modus** (`lib/prospects/search.ts`): zoekt via de **Brave Search API** als `BRAVE_SEARCH_API_KEY` in Vercel staat (betrouwbaar vanaf datacenter-IP, gratis tot ~2000/mnd), met **DuckDuckGo HTML-POST** als gratis fallback (vaak geblokkeerd vanaf Vercel-IP's, daarom alleen best-effort). Resultaten worden per domein ontdubbeld tot één homepage en daarna door dezelfde site-crawler gehaald als de URL-modus. Foutmelding legt uit of de sleutel ontbreekt.
- **Werking**: job-gebaseerd. POST `/api/admin/prospects` maakt een job + wachtrij van sites. De UI roept daarna in een lus POST `/api/admin/prospects/step` aan (max 3 sites per call, tijdsbudget 20s, `maxDuration=60`) tot de wachtrij leeg is. Zo blijven we binnen Vercel-limieten zonder externe queue.
- **Per site**: homepage + max 3 contact-achtige pagina's, respecteert robots.txt, beleefde user-agent `WaarBlijftHetBot`. Extractie van e-mail (mailto eerst, ook ontsluierd `info [at] domein [dot] nl`), naam (JSON-LD Person → `<h1>` → meta author → "ik ben ..."-patroon → titel), en doelgroep via trefwoord-classificatie (of handmatig vastgezet).
- **Overzichtspagina volgt individuele profielen (belangrijk, 11-jun v2)**: bij een ledenlijst/verwijsgids opent de zoeker élk profiel apart i.p.v. alleen de overzichtspagina. Drie sporen in `bouwWachtrijVanUrl`: (1) same-host profiel-cluster op de pagina zelf (grootste groep URL's met gelijke pad-diepte ≥2), (2) externe praktijksites, (3) **sitemap-fallback** als de lijst JavaScript-gerenderd is (zoals eft.nl): leest `sitemap.xml`/`sitemap_index.xml` en pakt het profiel-cluster daaruit. Per profiel: staat er geen e-mail op, dan volgt hij de eigen-website-link één hop (`vindEigenWebsite`). Het e-maildomein van de directory zelf (`negeerDomein`, bijv. `info@eft.nl`) wordt altijd genegeerd. `MAX_SITES=60` per batch.
- **Review-wachtrij**: gevonden adressen staan in tabel `prospects` (status `gevonden`). Admin keurt goed (→ `outreach_contacts`, status `nieuw`) of wijst af. Ontdubbelt tegen bestaande outreach-contacten en eerdere prospects.
- **Review-tabel UX (11-jun v3)**: actie-knoppen (Goedkeuren/Afwijzen) staan vóóraan, `table-fixed` zodat horizontaal scrollen weg is (context-kolom truncate op 2 regels). Naam is een controlled inline-invoerveld; per-rij Goedkeuren slaat een gecorrigeerde naam eerst op (`keurRijGoed`) zodat de correctie niet verloren gaat. Categorie inline dropdown. Multiselect + bulk-goedkeuren/afwijzen via `POST /api/admin/prospects/review`.
- **SSRF-bescherming**: crawler weigert localhost, 127/10/192.168/172.16-31/169.254-ranges; redirects worden handmatig gevolgd en per hop opnieuw gecheckt.
- **Bestanden**: `lib/prospects/` (types, extract, classify, crawler, opslag), `app/api/admin/prospects/{route,step/route,review/route}.ts`, `app/admin/components/ProspectsTabblad.tsx`, tab toegevoegd in `app/admin/AdminClient.tsx`.
- **`supabase/prospect_zoeker.sql` MOET nog eenmalig gedraaid worden** in de Supabase SQL-editor (tabellen `prospect_jobs` + `prospects`).
- Alle admin outreach-routes hebben nu een `isAdminRequest()`-guard (stond er nog niet op).
- **DB-toegang via `createServiceClient()` (service-role), niet de anon-cookie-client.** De RLS-policies staan op `to authenticated`, maar de SSR-cookie-client wordt door Supabase als `anon` gezien bij schrijven, dus die liep tegen "new row violates row-level security policy" aan. Oplossing: alle admin prospect- én outreach-routes gebruiken nu `createServiceClient()` (bypasst RLS), met `isAdminRequest()` als poortwachter. Vereist `SUPABASE_SERVICE_ROLE_KEY` in Vercel (stond er al voor de indexing-routes).

## SEO / AI-vindbaarheid
- **sitemap.xml, sitemap-0.xml, robots.txt én llms.txt** worden gegenereerd door `scripts/generate-sitemap.mjs` — draait in `next build`. Leest artikel-slugs/titels uit `lib/inzichten-data.ts`. Bij nieuw artikel: niets handmatig, build regenereert alles.
- Canonicals/og/host = **www**. ~72 artikelen (sitemap ~79 URL's). Veel nieuwe artikelen toegevoegd in juni-2026 sessies: bruto/netto-uitleg, vaste-lasten, potjes-systeem, vakantiegeld, pakkende "goed-salaris-toch-geldstress"-reeks, longtail-batch (incl. interactieve calculator `vrij-besteedbaar-inkomen-berekenen`), en een Klarna/achteraf-betalen-reeks (5 artikelen, niet-veroordelend, met Geldfit-verwijzing).
- **Interne linking gemaximaliseerd**: category-aware "Lees ook"-blok (3 cards, eerst zelfde categorie) in `app/inzichten/[slug]/page.tsx`, plus contextuele in-body links zodat geen enkele nieuwe hub 0 inbound links heeft.
- **Indexering**: Google heeft geen snelle push voor artikelen (Indexing API alleen JobPosting/BroadcastEvent). De eigen "submit"-tool gebruikt **IndexNow** = alleen Bing/Yandex, NIET Google. GSC URL Inspection geeft alleen status. Handmatig in GSC indienen blijft de snelste route voor Google.
- Schema: Article + FAQPage + Person (sameAs LinkedIn/Instagram van Jarno) + Organization + AboutPage + DefinedTermSet. Auteur-bio onderaan elk artikel.
- Content-strategie (Google mei-2026 core update): **first-hand, non-commodity, voor/na-cases met echte bedragen, zichtbare auteur.**

## Mail / DNS (waarblijfthet.nl)
- **Website draait op Vercel, mail op een aparte host.** Apex `@ A` = `216.198.79.1` (Vercel), `www` CNAME → `*.vercel-dns-017.com`. De mailserver is `45.82.188.190` (daar wijzen `webmail`, de wildcard `*` en de SPF naartoe). Postbus: hallo@waarblijfthet.nl.
- **Mail-ontvangst gerepareerd (24-jun-2026).** Probleem: MX stond op `10 waarblijfthet.nl`, en die naam resolvet via de apex naar de Vercel-IP (geen mailserver), dus inkomende mail verdween. Fix: `mail` A-record → `45.82.188.190` aangemaakt, oude `mail` CNAME verwijderd, MX gewijzigd naar `10 mail.waarblijfthet.nl`. Werkt nu, mail komt binnen. **Les: een MX mag nooit naar de Vercel-apex of naar een CNAME wijzen.**
- **Resend is alleen voor versturen, niet ontvangen.** Resend host geen postbussen.
- **Resend SPF + DKIM nog in te stellen (29-jun-2026):** Eerste echte analyse is gedaan maar de Resend-mail is niet aangekomen. Fix: (1) SPF updaten naar `v=spf1 +a +mx +ip4:45.82.188.190 include:_spf.resend.com -all`. (2) In Resend dashboard → Domains → `waarblijfthet.nl` toevoegen → CNAME-records voor DKIM kopiëren naar DNS. Na verificatie in Resend werkt verzenden. Ontvangst via `mail.waarblijfthet.nl` staat los hiervan en blijft werken.

## Meting
- **quiz_voortgang** (PII-vrije tabel) meet drop-off per stap + ingevulde antwoorden. SQL staat in `supabase/quiz_voortgang.sql` — **MOET nog eenmalig in Supabase SQL-editor gedraaid worden.**
- Admin → tab **Funnel**: trechter + drop-off + "welke pagina's leiden naar de analyse".
- Admin → tab **Indexing**: per-URL Google Search Console inspect + dagelijkse cron (09:00 CEST). Logt naar `cron_runs` tabel.

## Wat er in sessie 2-jul-2026 gedaan is (cluster A: financieel coach)
- **Groeiplan** in `docs/groeiplan-seo-juli-2026.md`: 27 keywords in 6 clusters, live SERP-gecheckt via Chrome (geen SE Ranking, connector niet geautoriseerd; volumes indicatief).
- **Cluster A gebouwd (dienst-keywords, koopintentie)**:
  - Nieuwe dienstpagina `app/financieel-coach/page.tsx`: target "financieel coach" + geldcoach/online/kosten. FAQPage- + Service- + BreadcrumbList-schema, tarieventabel (0/125/497), voor wie wel/niet, 8 FAQ's.
  - Artikel `wat-kost-een-financieel-coach` (categorie Financieel advies): tarieventabel markt, terugverdienlogica, gratis alternatieven.
  - Artikel `verschil-budgetcoach-financieel-coach`: verschiltabel, situatietabel, eerlijke doorverwijzing schuldhulp.
  - Beide in `lib/inzichten-data.ts` (vooraan array) + `ArticleBody.tsx`.
- **Interlinking**: auteur-bio onder elk artikel linkt nu "financieel coach" naar de dienstpagina (sitewide); Footer-link "Financieel coach"; links vanuit beide adviseur-artikelen; dienstpagina linkt naar beide nieuwe artikelen + analyse + adviesgesprek. Person-schema jobTitle nu "Financieel coach en oprichter", knowsAbout + "Financiële coaching".
- **Title-fixes**: dubbele suffix "| Waar blijft het | Waar blijft het" opgelost op /aanbod en /inzichten (layout heeft al een template). /aanbod-title nu "Financiële coaching en adviesgesprek, tarieven" (weg van "voor gezinnen").
- **Sitemap**: `/financieel-coach` (priority 0.9) in `generate-sitemap.mjs` + llms.txt-regel. Script gedraaid: 87 URL's, 74 artikelen.
- Geverifieerd: tsc schoon, geen null bytes, geen em dashes in nieuwe copy. Via python3 geschreven (NTFS-truncatie Edit-tool).
- **Na deploy: beide artikelen + /financieel-coach handmatig indienen in GSC.** Volgende stap uit het plan: cluster B ("waar blijft mijn geld") en Resend SPF/DKIM.

## Wat er in sessie 8-jul-2026 gedaan is (conversie: geldscan + benchmark-mail)
- **UPDATE 8-jul (v2): deliverable heet nu "geldrapport"** ("jouw persoonlijke geldrapport", ICP-panel unaniem, verving "lekkenrapport") en de betaalcopy is overal versimpeld naar "Na je aanvraag stuur ik je een betaalverzoek. Zodra dat betaald is, ontvang je binnen twee werkdagen je geldrapport." (iDEAL/tenaamstelling/inlogcodes/bon/IBAN-details weg; alleen in de geldscan-FAQ blijft de zin dat het betaalverzoek altijd van hallo@waarblijfthet.nl komt).
- **UPDATE 8-jul (later die dag): geldscan omgezet van video naar rapport-format.** Deliverable is nu "jouw persoonlijke lekkenrapport": persoonlijk geschreven PDF van 2 à 3 pagina's met de drie grootste lekken, eigen cijfers en per lek wat ik zou doen. Geen video/privelink meer; rapport komt als PDF-bijlage per mail. Privacy aangescherpt: afschriften en analyse-gegevens worden direct na het versturen van het rapport verwijderd (was: standaard 30 dagen). Superhelder 4-stappenproces op /geldscan (analyse + aanmelden, betaalverzoek binnen 1 werkdag, rapport binnen 2 werkdagen na betaling, direct verwijderen; garantie blijft) en adviesgesprek-stappen aangescherpt (betaalverzoek-uitleg + direct verwijderen na de samenvatting). Gewijzigd: geldscan/aanbod/adviesgesprek/resultaat-pagina's, send-intake-bevestiging, IntakeForm, inzichten-data cta's, homepage, generate-sitemap.mjs/llms.txt.
- **Growth plan** in `docs/growth-plan-conversie-juli-2026.md`. Kernkeuzes van Jarno: geen gratis 15-min gesprekken (tijd), geen ads, geen werkgeversspoor (nog geen KvK), wel anoniem-advies-producten.
- **Geldscan gebouwd (€49, async)**: `app/geldscan/page.tsx` (FAQPage+Service schema). Klant doet analyse, Jarno stuurt binnen 2 werkdagen persoonlijke video (10 min) met 3 grootste lekken. €49 wordt verrekend bij gesprek/traject. Intake-flow uitgebreid met `pakket=geldscan` (page, IntakeForm, api/intake, bevestigingsmail met betaalverzoek-uitleg). Betaling handmatig via betaalverzoek, geen PSP.
- **Benchmark-per-mail** op het boodschappen-artikel (grootste verkeersbron): `components/artikel/BenchmarkMail.tsx` + `app/api/boodschappen-benchmark/route.ts`. Bezoeker kiest huishoudtype + e-mail → krijgt direct één persoonlijke benchmark-mail met 3 hefbomen per situatie (Resend). Adres wordt niet in DB opgeslagen; er gaat een notificatiemail naar hallo@ (bewuste v1-keuze, geen migratie nodig). Expliciete belofte: geen nieuwsbrief.
- **Geldscan-positionering**: kaartje op analyse-resultaatpagina (verving blog-kaartje), banner op /aanbod onder de prijskaarten, link onderaan /adviesgesprek, sitemap (88 URL's) + llms.txt.
- Geverifieerd: tsc schoon, geen em dashes/null bytes. **Let op: RESEND_API_KEY vereist voor benchmark-mail (staat al in Vercel als SPF/DKIM-fix is afgerond).**
- **ICP-loop op geldscan/mailblok (2 rondes, 5 persona,s)**: alle scores naar 7-9. Fixes: iDEAL-betaalvertrouwen (afzender/tenaamstelling/nooit-inlogcodes/bon/factuur-IBAN-optie), geld-terug-garantie, privacy omgedraaid (privelink, standaard verwijderen 30 dagen, aanleveren = reply op bevestigingsmail), illustratief voorbeeldblok (eerlijk gelabeld, GEEN verzonnen klantcase) + echte 460-referentie, foto+naam-blok, zzp-zin, mailblok-kop naar hefbomen + adres-wordt-niet-opgeslagen.

## Wat er in sessie 2-jul-2026 gedaan is (deel 2: outreach aangescherpt)
- **Onderzoek**: cold-email benchmarks 2026 (gem. reply 3,4%, follow-ups = 42% van alle replies, opens onbetrouwbaar door Apple Mail ~49%). Conclusie: probleem was geen messaging of volume maar ontbrekende follow-ups en meting.
- **Follow-up systeem gebouwd**:
  - `supabase/outreach_followup.sql` **MOET nog eenmalig gedraaid worden**: kolommen `followups`, `laatste_followup_at`, `gereageerd_at`, `ps_zin` + status 'gereageerd' in constraint.
  - `send/route.ts` herschreven: templates zijn nu kaal (geen tabel/kleuren, oogt persoonlijk), <80 woorden, mail 1 zonder links (alleen handtekening), plain-text-part meegestuurd. FU1 (na 3+ dagen, bevat de enige link naar /samenwerken/[doelgroep]), FU2 = breakup. `type: "followup"` in POST-body, max 2, server checkt wachttijd.
  - Persoonlijke zin per contact (`ps_zin`): inline veld in admin (alleen bij status nieuw), wordt als eerste alinea na de aanhef ingevoegd.
  - Webhook (`app/api/resend-webhook/route.ts`): status 'gereageerd' wordt nooit overschreven, 'geopend' degradeert 'geklikt' niet meer.
  - PATCH outreach-route: `ps_zin` en `gereageerd: true` (zet status + gereageerd_at).
  - UI (`OutreachTabblad.tsx`): bulk- en per-rij follow-up-knoppen, "Gereageerd"-markeerknop (stopt follow-ups), follow-up-kolom (n/2 + datum), Geklikt-kolom vervangen door Persoonlijke zin (klik zit al in status).
- **Nog handmatig te doen door Jarno**: (1) SQL draaien, (2) in Resend-dashboard open+click tracking aanzetten op het domein, (3) webhook toevoegen `https://www.waarblijfthet.nl/api/resend-webhook?secret=...` met events opened/clicked/bounced/spam_complaint, (4) `RESEND_WEBHOOK_SECRET` in Vercel.
- **Werkafspraak volume**: 10-20 outreach-mails per dag opbouwen, niet meer (jong domein, zelfde domein als leadmails). Replies zijn de metric, opens indicatief. LinkedIn bewust niet ingezet (PSOhub-scheiding). Cal.com uitgesteld (n=1 lead).
- Geverifieerd: tsc schoon, geen em dashes.

## Wat er in sessie 12-jun-2026 gedaan is (deel 3: formulieren-fix)
- **Leadformulier quiz gaf "Er ging iets mis"**: oorzaak is de bekende RLS-klasse-fout. Stap6 schreef met de **browser-anon-client** rechtstreeks naar `leads` (upsert + select) en `quiz_resultaten`; zodra een e-mailadres al bestond werd de upsert een UPDATE en blokkeerde RLS. Zelfde patroon als eerder bij outreach/prospects.
- **Oplossing: alle publieke schrijfacties naar server-routes met `createServiceClient()`**:
  - Nieuw `POST /api/quiz-lead` (whitelist van kolommen, e-mailvalidatie, fallback als kolom `aantal_volwassenen` nog ontbreekt) → `Stap6Resultaat.tsx` gebruikt nu fetch i.p.v. browser-Supabase.
  - Nieuw `POST /api/intake` → `app/aanbod/intake/IntakeForm.tsx` (adviesgesprek/traject-aanvraag) gebruikt nu fetch.
  - Nieuw `PATCH /api/admin/aanvragen` (isAdminRequest-guard) → admin-statusupdate van intake-aanvragen, met zichtbare foutmelding i.p.v. stil falen.
  - `app/resultaat/[token]/page.tsx` leest nu via de service client (token = toegangscontrole), zodat de gedeelde link nooit op RLS stukloopt.
- **E-mail robuuster**: `send-resultaat` faalt niet meer stil met een "placeholder"-API-key maar geeft een duidelijke 500 als `RESEND_API_KEY` ontbreekt, en koppelt het e-mailadres aan `quiz_resultaten` (voor het bewaar-formulier op de resultaatpagina). Check of **`RESEND_API_KEY` en `RESEND_FROM`** in Vercel staan; zonder die env-vars komt er geen mail aan.
- **Huisstijl-sweep mails/intake**: wij-vorm en em dashes uit `send-intake-bevestiging` (klantmail), en-dash-bereiken in intake-opties vervangen door "tot".
- Browser-Supabase wordt nu alleen nog gebruikt voor: anonieme `quiz_voortgang`-meting (bewust, PII-vrij) en admin-login. Admin-reads zijn in sessie 29-jun alsnog ook naar `createServiceClient()` verplaatst. Geen anon-writes meer naar tabellen met RLS-onzekerheid.
- Geverifieerd: tsc schoon, geen null bytes, geen nieuwe em dashes. **Nog niet gecommit/gepusht.**

## Wat er in sessie 12-jun-2026 gedaan is (deel 2: analyse-flow)
- **ICP-loop op de hele analyse-flow** (5 persona's, mobiel + desktop, + aparte UX-expert-review; 3 rondes). Eindscores: Sandra 4→8, Thomas 5,5→8, Ellen 4,5→8, Mark 7→8, Lisa 5,5→9.
- **Nieuwe vraag in stap 1: "Hoe woon je?" (alleen / samen met partner)**, veld `volwassenen: 1|2|null` in `lib/quiz-types.ts`. Stuurt: boodschappen-benchmark (alleenstaand = tabel minus €185, `lib/benchmarks.ts`), verzekering-benchmark, labels in stap 2 ("Jouw netto inkomen" i.p.v. "Salaris persoon 1"; partner-veld verdwijnt bij alleen en wordt gewist), zorgtoggle (verborgen bij alleen) en alle bevestigingsteksten ("huishouden van één volwassene met 2 kinderen"). Helper `aantalVolwassenenVan(data)` vervangt overal de oude afleiding uit salaris2.
- **Mobiele vaste live-balk** (In / Uit / Over) onderaan tijdens stap 2-5 in `QuizClient.tsx`, zodat realtime vergelijken ook op mobiel voelbaar is.
- **Dode bijtelling-toggle in stap 2 verwijderd** (deed niets) → eerlijke waarschuwingstekst bij zakelijk + bijtelling-niet-verrekend.
- **Copy-fixes**: alle jullie/wij/gezinnen-resten weg in analyse-flow, resultaatpagina (`app/resultaat/[token]/page.tsx`) én e-mail (`app/api/send-resultaat/route.ts`, ook em dash eruit). Zorgverzekering-hint zonder "bruto"-verwarring; hypotheekrenteaftrek-hint herschreven; zzp-hint bij inkomen (gemiddelde 6-12 mnd, na belastingreservering); AOV expliciet bij overige verzekeringen; boodschappen-hint dynamisch uit benchmark; meerdere-auto's-hint in stap 1; partner-doet-niet-mee-hint bij salaris 2; spaardoel-hint noemt pensioen (50-plus/zzp).
- **Schaamte-softening (Lisa)**: mobiel "Grootste afwijking"-blok nu oranje, "Hier valt het meeste op", alleen bij >€50 afwijking, met "Geen oordeel, wel een aanknopingspunt"; verdict zorgelijk: "Het ligt niet aan jou, en het is om te buigen"; vrije-bestedingen-tip niet meer verwijtend.
- **Privacy op het invulmoment (Ellen)**: intro zegt "Je antwoorden blijven anoniem. Pas als je aan het eind zelf je e-mail invult, worden ze aan jou gekoppeld" + privacylink; leadform zegt dat het resultaat ook zonder e-mail zichtbaar blijft en dat er geen mails volgen zonder vinkje.
- **Bekende beperking**: `quiz_resultaten` slaat `volwassenen` nog niet op; de gedeelde resultaatpagina leidt het af uit salaris_2 (eenverdiener-stel krijgt daar de alleenstaande-benchmark). Zie to-do.
- Geverifieerd: tsc schoon, geen null bytes, geen em dashes in copy. **Nog niet gecommit/gepusht.**

## Wat er in sessie 12-jun-2026 gedaan is
- **ICP-persona-loop op de homepage** (5 persona's: tweeverdiener, alleenstaande ouder, zzp'er, alleenstaande 50+, burn-out-herstel; 3 rondes met scores). Convergente klachten verwerkt in `app/page.tsx`, `components/HeroCards.tsx`, `components/Header.tsx`:
  - **Jullie/gezinnen-taal vervangen** door je/huishoudens op homepage én in de hele analyse-flow (`app/analyse/*`), incl. metadata en schema. Alleenstaanden voelden zich buitengesloten terwijl dat juist een contentsegment is.
  - **Nieuwe sectie "Voor wie is dit?"** met chips naar de 4 alleenstaande-artikelen (interne links, SEO).
  - **CTA-twijfels weggenomen**: stap 1 noemt nu de vijf invulstappen + "schattingen zijn goed genoeg, geen bankkoppeling"; stap 2 zegt "resultaat direct op je scherm, e-mail niet verplicht, niemand belt je na"; hero-subline "Geen account of bankkoppeling · Resultaat direct op je scherm". Header-CTA "Start analyse" → "Gratis analyse". Verdict ICP's over de knop: analyse als primaire CTA is goed, mits inhoud/privacy/prijs vooraf duidelijk zijn; niemand wilde primair direct naar het aanbod.
  - **Prijs eerder zichtbaar**: hero noemt nu de enige vervolgstap (€125 eenmalig) + link naar aanbod.
  - **€460-claim eerlijk geherformuleerd** ("bij de huishoudens die ik tot nu toe begeleid heb. Geen belofte..."), bron "Intern gemiddelde" → "Eigen klantresultaten". HeroCards: "Na onze aanpak" → "Na het bijsturen", "per maand meer in dit voorbeeld", em dash uit disclaimer.
  - **Privacy op het beslismoment**: link naar /privacy bij de stappen-CTA, "nooit gedeeld of verkocht" in finale CTA.
  - **Jarno-blok**: wij-vorm eruit, gevalideerde bio-zin erin, "geen producten, geen provisie", LinkedIn-link toegevoegd.
  - **Wat maakt dit anders**: 5e item "Ook met wisselend inkomen" (zzp).
- Eindscores klikbereidheid: Sandra 2→8, Thomas 3→8, Ellen 3→8, Lisa 3→7, Mark 6→7,5. Resterende blokkades vereisen echte data van Jarno (zie nieuwe to-dos: alleenstaande-testimonial, track record).
- Geverifieerd: `npx tsc --noEmit --incremental false` schoon, geen null bytes, geen em dashes in copy. Wijzigingen via Python-replace (niet de Edit-tool), conform werkwijze-notitie. **Nog niet gecommit/gepusht.**

## Wat er in sessie 11-jun-2026 gedaan is
- **Prospect-zoeker gebouwd** (nieuwe admin-tab "Prospects"): zelfstandig namen + e-mailadressen verzamelen op basis van een overzichts-URL of zoekwoorden, met review-wachtrij naar de outreach mini-CRM. Zie de sectie "Prospect-zoeker" hierboven voor de volledige werking en bestanden.
- **Architectuur**: job + client-driven step-lus (max 3 sites/call, 20s budget, `maxDuration=60`) zodat alles binnen Vercel-limieten draait zonder externe queue of cron.
- **Code-review door subagent** verwerkt: RLS dichtgetrokken naar `to authenticated` (anon key is publiek), genegeerde update-error + oneindige lus opgelost, concurrency-guard (optimistic lock op `updated_at`), SSRF-bescherming tegen interne adressen, robots.txt-parser per user-agent-blok.
- **`isAdminRequest()`-guard** toegevoegd aan de bestaande outreach-routes (`route.ts` en `send/route.ts`), die hadden nog geen serverside auth-check.
- Geverifieerd met `npx tsc --noEmit` (schoon) + unit-tests van extractie, classificatie, SSRF-guard en robots-parser. Geen em dashes/koppeltekens in copy; ik-vorm aangehouden.
- **v2 (zelfde sessie, na feedback Jarno)**: overzichtspagina pakte eerst alleen de pagina zelf (bij eft.nl dus `info@eft.nl`). Crawler herbouwd zodat hij individuele profielen volgt + sitemap-fallback voor JS-lijsten + doorklikken naar eigen website (zie sectie "Prospect-zoeker"). Getest met eft.nl-fixtures (profiel mét mail → eigen adres i.p.v. directory-adres; profiel zonder mail → hop naar praktijksite; JS-lijst → sitemap-cluster).
- **v2b zoekwoorden**: zoekwoorden-modus liep op DuckDuckGo-GET-scraping (faalt vanaf Vercel-IP). Vervangen door `lib/prospects/search.ts`: Brave Search API (env `BRAVE_SEARCH_API_KEY`) met DuckDuckGo-POST als fallback; meerdere zoekregels (doelgroep + stad) per keer. Brave-sleutel staat inmiddels in Vercel.
- **RLS-writeblokkade opgelost**: admin prospect- én outreach-routes liepen op de anon-cookie-client (door Supabase als `anon` gezien → "new row violates row-level security policy"). Alle routes nu op `createServiceClient()` met `isAdminRequest()` als gate.
- **v3 UX**: review-tabel (Prospects) acti

## Wat er in sessie 29-jun-2026 gedaan is
- **Eerste echte ingevulde analyse ontvangen.** Mail via Resend kwam niet aan (SPF/DKIM nog niet ingesteld, zie Mail/DNS-sectie).
- **Admin-reads blokkeerden door RLS**: `admin/page.tsx` gebruikte `createClient()` (cookie-based) voor `leads`, `quiz_resultaten` en `intake_aanvragen`. Supabase zag dit bij reads als `anon`-context → lege arrays. Opgelost door `createServiceClient()` te gebruiken voor de drie data-queries (auth-check blijft op `createClient()`). Zelfde patroon als eerder bij outreach/prospects maar dan voor reads. Bestanden: `app/admin/page.tsx`.
- **"Leads = 0" was hierdoor verklaard** — data stond gewoon in de database.
- **6 vs 3 discrepantie is geen bug**: funnel telt `quiz_voortgang.voltooid=true` (anoniem, geen email vereist); "Analyse resultaten"-tab telt `quiz_resultaten` (alleen aangemaakt bij email-submit). Verschil = mensen die analyse voltooiden maar geen email achterliet. Label in funnel verduidelijkt met subtekst.
- **Datum-kolom + "Bekijk →" doorklik** toegevoegd:
  - `FunnelTabblad.tsx`: "Laatste voltooide analyses" heeft nu een datumkolom + subtekst die uitlegt dat dit anonieme afronding is.
  - `QuizResultatenTabblad.tsx`: email-kolom toegevoegd, "Bekijk →"-link naar `/resultaat/[token]` (opent in nieuw tabblad). `token` en `email` toegevoegd aan `QuizResultaat` interface en `QUIZ_KOLOMMEN` string.
- **Technische noot (belangrijk)**: de Edit/Write tools trunceren bestanden op het Windows NTFS-mount. Gebruik voor grote bestandswijzigingen altijd `python3` via bash om te schrijven. tsc schoon na Python-write.
- Geverifieerd: tsc schoon. **Nog niet gecommit/gepusht.**

## Wat er in sessie 29-jun-2026 gedaan is (deel 2: analyse-conversie)
- **Diagnose funnel**: het lek zit niet binnen de analyse maar aan de voorkant. `quiz_voortgang` logt stap 1 al bij mount, dus "28" = pagina geladen, "9" = doorgeklikt naar stap 2. Wie eenmaal begint maakt het bijna altijd af (9→8→7→6→6). Advies + plan staat in `docs/analyse-conversie-advies.md`. n is klein, dus richtinggevend.
- **P1 meting uitgebreid**: `quiz_voortgang` heeft nu `apparaat` (mobiel/desktop) en `eerste_interactie` (begon daadwerkelijk in te vullen). `QuizClient.tsx` herschreven: `logVoortgang()` losgetrokken, mount logt geladen, eerste `onChange` logt `eerste_interactie=true`. Funnel-tab (`FunnelTabblad.tsx`) toont nu "geladen vs begon in te vullen" + een apparaat-tabel per fase.
- **P2 startdrempel verlaagd**: intro herschreven naar "2 minuten" + mini-voorbeeld van het resultaat; live vergelijking nu ook op mobiel via ingesloten `VergelijkingsPaneel` (nieuwe `embedded`-prop, geen sticky/scroll); dubbele mobiele blokken uit Stap1/Stap2 verwijderd; inkomensscherm rustiger (vakantiegeld/13e achter "Verfijn", geruststelling "een ronde schatting is prima").
- **`supabase/quiz_voortgang_v2.sql` MOET nog eenmalig gedraaid worden** in de Supabase SQL-editor (voegt `apparaat` + `eerste_interactie` toe). Zonder die kolommen falen de upserts met die velden.
- Variant B (expliciete keuze "snelle check" vs "volledige analyse") bewust nog NIET gebouwd; staat in het advies als losse A/B-test ná P2.
- Geverifieerd: tsc schoon, geen null bytes, geen em dashes in copy. Grote bestanden via python3 geschreven (Edit-tool trunceerde op NTFS, zoals bekend). **Nog niet gecommit/gepusht.**
