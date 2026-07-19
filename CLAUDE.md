# Waar blijft het, projectcontext (lees dit eerst)

Compacte overdracht zodat een nieuwe sessie meteen op de hoogte is. Volledig opgeschoond op 19-jul-2026; de oude, uitgebreide sessielogboeken staan in `docs/archief-claude-md-tm-19-jul-2026.md`.

## Wat het is
Nederlandse personal-finance site voor mensen die **goed verdienen maar toch krap zitten**. Geen schuldhulp, geen beleggingsadvies; eerlijk inzicht + lichte coaching.
- Stack: Next.js 14 (App Router), Supabase, Resend, recharts, Tailwind. Repo: github.com/waarblijfthet/app. Live: https://www.waarblijfthet.nl
- Toon: nuchter, eerlijk, geen jargon. Fonts: Fraunces (kop) + Plus Jakarta Sans (body). Kleuren: #1C3A2A (groen), #C4603A (terracotta), #F5F0E8/#FDFAF4 (creme).
- **Jarno is de enige persoon achter het project.** Altijd ik/mij/mijn in copy, nooit wij/we/ons (uitzondering: zijn eigen gezinsverhalen en letterlijke testimonial-quotes).

## Harde werkregels (altijd toepassen)
1. Bestanden schrijven/wijzigen ALTIJD via python3 in bash (heredoc of read+replace). De Edit/Write-tools trunceren bestanden stilzwijgend op dit NTFS-mount, ook bij kleine wijzigingen.
2. Na elke codewijziging: `npx tsc --noEmit --incremental false` moet schoon zijn. Check ook op null bytes.
3. Geen em dashes en geen koppeltekens als scheidingsteken in copy (vervang door komma, punt of nieuwe zin). Geldt voor alles, ook hints/labels/mails.
4. NOOIT klantcases, reviews, resultaten of referenties verzinnen. Testimonials zijn echte (geanonimiseerde) klanten; voorbeelden expliciet als illustratie labelen.
5. NOOIT beloftes zoals geld-terug of garanties, nergens. Kopen = kopen.
6. Prijzen zonder btw-vermelding (KOR). CTO nooit noemen in copy. Bio-zin: "Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte."
7. In outreach-copy nooit het woord "eerlijk" (eerlijkheid toon je), nooit hun vak of klant claimen, en nooit verifieerbaarheid verzinnen. Zie sectie Outreach.
8. Nieuw artikel = entry vooraan in `lib/inzichten-data.ts` (optioneel `cta`-veld) + content-component in `app/inzichten/[slug]/content/` + import/map in `ArticleBody.tsx`. Sitemap/llms.txt regenereert bij build. Na deploy handmatig indienen in GSC.
9. Git: aan het eind van elke sessie met wijzigingen committen. Pushen kan alleen Jarno (sandbox heeft geen credentials). Als commit klaagt over `HEAD.lock`: dat bestand handmatig verwijderen.

## Huidige status (19-jul-2026)

**Focuskanaal nr. 1 is outreach naar verwijzers.** SEO is het vangnet/geloofwaardigheidskanaal, geen groeikanaal (onderbouwing: `docs/kritische-analyse-en-plan-18-jul-2026.md`). SE Ranking is definitief van tafel (Jarno betaalt er niet voor); volumes blijven kwalitatief, nooit meer adviseren die connector te autoriseren.

Wat er staat en werkt:
- Site met ~79 artikelen, GSC groeit (400-750 impressies/dag), verkeer komt vooral binnen op boodschappen/salaris-artikelen (informationeel, converteert niet direct).
- Mailketen (Resend, SPF/DKIM) is end-to-end getest en werkt.
- Outreach mini-CRM + prospect-zoeker in /admin, beide live getest en werkend.
- Persona-getoetste outreach-mailsequences v5 in `lib/outreach/mails.ts` (zie Outreach).
- Automatische follow-up-cron gebouwd (nog niet gedeployed op moment van schrijven).
- A4-meegeefmateriaal in `outreach-materiaal/` (4 pdf-varianten).

**Direct openstaand (checklist voor Jarno):**
1. SQL draaien in Supabase (aangeleverd 19-jul): `outreach_plaats.sql` + de outreach_followup-kolommen.
2. `git push` (commits 477e446 e.v. staan klaar).
3. Beslissen vóór/na deploy: 25 oude contacten van 11-jun hebben status verstuurd en 0 follow-ups; de cron stuurt die anders automatisch mail 2. Opschonen of tijdelijk env `OUTREACH_AUTO_FOLLOWUP=uit`.
4. Checken of Resend-webhook + `RESEND_WEBHOOK_SECRET` in Vercel staan (open/klik-tracking) en of `supabase/intake_analyse_link.sql` ooit gedraaid is.

**Openstaande prioriteiten daarna (in volgorde):**
1. Outreach draaien: prospect-zoeker vullen (30 goedgekeurde contacten/week, start relatietherapeuten + burn-out-coaches), 10 mails/dag met verplichte ps-zin, replies bijhouden.
2. Conversielaag op bestaand verkeer: `components/artikel/BenchmarkMail.tsx` wordt nog nergens geïmporteerd; mounten in het boodschappen-artikel + varianten voor de top-3. Daarna e-mailflow na de analyse (dag 0/2/5).
3. Rapport-template voor het geldrapport (bestaat nog niet; nodig bij de volgende geldscan-klant).
4. Content: "waarom kan ik niet sparen (terwijl ik goed verdien)" versterken, cluster C (hoeveel spaargeld is normaal, uitgaven per huishoudtype) met mail-blok vanaf dag 1, rondkomen-serie starten bij 3000/4000 euro.
5. PR-haakje: Nibud-rapport 2026 over geldzorgen bij hogere inkomens (pitch geldredacties/podcasts).
6. KvK-inschrijving heeft een deadline nodig: blokkeert werkgeversspoor, KOR-aanmelding en gidsvermeldingen.
7. Alleenstaande-testimonial (wachten op echte klant, niet verzinnen).

Meetpunten: geboekte gesprekken en geldscan-aanvragen (echte KPI), outreach-replies, lijstgroei per week (zodra mail-blok live is), GSC-posities, funnel-tab in /admin.

## Aanbod / funnel
Gratis analyse (lead-instap) → **Geldscan 49 euro** (async, /geldscan: "jouw persoonlijke geldrapport", persoonlijk geschreven PDF met de 3 grootste lekken; verrekend bij vervolg) → **Eenmalig adviesgesprek 125 euro** (/adviesgesprek) → Traject 497 euro. /aanbod is situatie-gedreven, nav-label "Tarieven".
- Geldscan-volgorde: aanmelden → betaalverzoek → na betaling analyse invullen (optioneel afschriften) → rapport binnen 2 werkdagen → gegevens direct verwijderd. Betaling handmatig via betaalverzoek, geen PSP.
- Hero: dubbele CTA, primair "Ja, help mij zien wat er anders kan" (geldscan), secundair gratis analyse. Prijs in microcopy, niet in de knop.
- Btw: KOR, dus geen btw vermelden. (KvK + KOR-aanmelding staan nog open.)
- Gedeelde bron voor pakket-inhoud: `lib/aanbod-content.ts` (`hoeHetWerkt` strikt gescheiden van `watJeKrijgt`), gebruikt door /aanbod en IntakeForm.
- Analyse-token stroomt door de keten (resultaat → geldscan → intake, `analyse_token` op intake_aanvragen); admin toont "Bekijk analyse"-link.

## Vaste afspraken en beslissingen
- Testimonials: echte geanonimiseerde klanten. Daan & Roos, Bram & Eva, Karim & Noor (begeleiding); Sanne & Joris (eerste geldscan-klant, 9-jul, met toestemming, staat op /geldscan en /aanbod).
- Kern-ICP (aangescherpt 11-jul na concurrentie-teardown): de goedverdiener in loondienst. Twee dragende profielen: Sandra (tweeverdiener-gezin) en Niels (alleenstaand/DINK). Ellen (zzp) alleen via analyse+geldscan bedienen (zzp-coaching is het terrein van Budgetbuddy/Carolien Vos). Petra is de artikel-ICP (validatie-zoeker). Volledige set: `docs/icp-personas.md`, bij elke ICP-toets alle profielen langslopen.
- Differentiatie: segment (loondienst), product (49-euro-instap, uniek in NL: niemand heeft een betaald instapproduct onder 272 euro), toon (nuchter, geen vermogen/mindset-taal). Niet op "rust/rich life" (bezet).
- 460-euro-claim altijd met eerlijke bron ("eigen klantresultaten, geen belofte").

## Outreach (focuskanaal)
Strategie, templates en onderbouwing: `docs/outreach-strategie-jul-2026.md`. Persona-skill voor toetsing: `docs/skill-verwijzer-personas.md` (Marjolein relatietherapeut, Richard budgetcoach; uitbreiden met planner/burn-out-profielen bij volgende toets).

Kern (v5, 4 persona-rondes, antwoordkans 5,5-7/10):
- Mail 1 is zelf de doorverwijzing ("mag ik mensen naar jou sturen?"), micro-vraag, geen link, geen vraag om hun klanten. Bij bekende plaats automatisch een regio-zin. Mail 2 (dag 3-4): geven + vakvraag; hier valt het antwoord. Mail 3 (dag 8-9): breakup, cadeau (A4) of open kaart over het eigen belang.
- Lessen: nooit hun vak/klant claimen, nooit "eerlijk" zeggen, klein maken is geloofwaardig, micro-vragen winnen, resterend plafond is verifieerbaarheid (zodra er een samenwerkende collega is: als referentie noemen).
- Vaste keuzes (19-jul): eerste contact altijd per mail, geen bel-uitnodigingen in de copy (beschikbaarheid Jarno; geen telefoonnummer in de handtekening, prive, evt. later apart zakelijk nummer). Onderwerpregel begint met de voornaam (`voornaamVan()` pakt het eerste woord van het naam-veld; let dus op bedrijfsnamen in dat veld).
- Techniek: teksten in `lib/outreach/mails.ts` (gedeeld door admin-route en cron). Verzenden via admin-tab Outreach (`app/api/admin/outreach/send/route.ts`). Automatische follow-ups: `app/api/cron/outreach-followups/route.ts`, dagelijks 07:15 UTC (vercel.json), FU1 na 3+ dagen, FU2 na 5+ dagen na FU1, max 20/run, kill switch env `OUTREACH_AUTO_FOLLOWUP=uit`, logt naar cron_runs.
- 4 doelgroepen: relatietherapeuten, budgetcoaches, financieel-planners, burnout-coaches (planners/burn-out afgeleid van de geteste structuur, nog niet zelf getoetst).
- Volume: 10-15 per dag maximaal (jong domein, zelfde domein als leadmails). Replies zijn de metric. LinkedIn bewust niet (PSOhub-scheiding).
- Meegeefmateriaal: `outreach-materiaal/drie-patronen-{stellen,herstel}-{met-naam,anoniem}.pdf` (FU2 belooft het A4).
- Admin-UX: kolommen Plaats (inline), Mails (M1/M2/M3 + geopend), Toegevoegd; filter per doelgroep en plaats; sortering nieuwste/plaats/status; ps_zin inline (verplicht gebruiken, met inhoudelijk detail, geen compliment). Elke verzending (los of bulk) opent eerst een preview-modal (route `/api/admin/outreach/preview`): wie krijgt welke mail, volledige tekst, waarschuwing bij ontbrekende ps-zin, overgeslagen contacten met reden.

## Prospect-zoeker (admin-tab Prospects)
Verzamelt namen + e-mailadressen van potentiele verwijzers en zet ze na review in de CRM. Live getest 19-jul (zoekwoorden "relatietherapeut zwolle"): werkt, 9+ adressen.
- Twee bronnen: overzichtspagina-URL (ledenlijst/verwijsgids; volgt individuele profielen, sitemap-fallback voor JS-lijsten, eigen-website-hop) of zoekwoorden (Brave Search API, `BRAVE_SEARCH_API_KEY` staat in Vercel; DuckDuckGo-fallback).
- Job-gebaseerd: POST `/api/admin/prospects` maakt job + wachtrij; UI draait step-lus (max 3 sites/call, 20s budget). Respecteert robots.txt, SSRF-bescherming, beleefde user-agent WaarBlijftHetBot.
- Extractie: e-mail (mailto eerst, ontsluierd, %20-prefix gestript), naam (JSON-LD Person → h1 → meta author → "ik ben"-patroon → titel; bedrijfsnaam belandt soms in naam-veld, inline corrigeren), plaats (`extractPlaats`: JSON-LD addressLocality → postcode+plaats → "gevestigd in"; alleen bij zekerheid), doelgroep-classificatie.
- Review-wachtrij: goedkeuren → outreach_contacts (met plaats), afwijzen. Ontdubbelt tegen bestaande contacten.
- Bestanden: `lib/prospects/`, `app/api/admin/prospects/{route,step,review}`, `app/admin/components/ProspectsTabblad.tsx`.
- Alle admin-routes: `isAdminRequest()`-guard + `createServiceClient()` (zie Technische lessen).

## SEO / AI-vindbaarheid
- sitemap.xml, robots.txt en llms.txt worden gegenereerd door `scripts/generate-sitemap.mjs` (draait in `next build`), leest slugs uit `lib/inzichten-data.ts`. Canonicals/og/host = www.
- Indexering: handmatig indienen in GSC blijft de snelste route voor Google (eigen submit-tool is IndexNow = alleen Bing/Yandex). Admin-tab Indexing: per-URL GSC-inspect + dagelijkse cron 07:00 UTC.
- Schema: Article + FAQPage + Person + Organization + AboutPage. Auteur-bio onder elk artikel linkt naar /financieel-coach.
- Contentstandaard per artikel: ScanBox, antwoord-eerst-blok, zelfstandige H2-blokken, FAQ met schema, interne links, CTA met juiste funnel-temperatuur. Audit van bestaande artikelen: `docs/artikel-audit-juli-2026.md`.
- Kanaal-realisme: dienst-keywords ("financieel coach") zijn vervuild met vacatures/opleidingen/gemeente-circuit; niet verder investeren in cluster A. Beste kansen: merkterm-cluster ("waar blijft mijn geld"), "waarom kan ik niet sparen", benchmark-model (boodschappen-artikel kopieren), rondkomen vanaf 3000/4000. De doelgroep zoekt vooral herkenning op fora (ouders.nl-thread "Modaal gezin; waar blijft mijn geld").

## Mail / DNS (waarblijfthet.nl)
- Website op Vercel, mail op aparte host (45.82.188.190). MX = `10 mail.waarblijfthet.nl` (nooit naar de Vercel-apex of een CNAME wijzen). Postbus: hallo@waarblijfthet.nl.
- Resend = alleen versturen. SPF + DKIM zijn ingesteld en de keten is getest: werkt (bevestigd 18-jul).
- Outreach-afzender: "Jarno Koopman <hallo@waarblijfthet.nl>", kale persoonlijke mails, plain-text-part mee, mail 1 en 2 zonder links.

## Meting / admin
- /admin tabs: Funnel (trechter + drop-off + apparaat), Bezoekers, Leads, Analyse resultaten, Overzicht, Aanvragen, Indexering, Zoekwoorden, Outreach, Prospects.
- quiz_voortgang meet drop-off per stap (PII-vrij) incl. apparaat en eerste_interactie; funnel-cijfers 19-jul: 292 bezoekers/30d, 15 gestart, 8 voltooid, 2 leads, 0 betaald.
- Analyse-flow: "Hoe woon je"-vraag stuurt benchmarks; mobiele live-balk; schaamte-softening. Bekende beperking: gedeelde resultaatpagina leidt volwassenen af uit salaris_2.
- Benchmark-per-mail component bestaat (`components/artikel/BenchmarkMail.tsx` + api) maar is NOG NERGENS GEMOUNT; notificatie gaat naar hallo@, adres wordt niet opgeslagen.

## Technische lessen (niet opnieuw leren)
1. **NTFS-mount trunceert bij Edit/Write-tools.** Altijd python3, ook voor kleine wijzigingen. Controleer met wc -l + tsc.
2. **Supabase RLS: alle server-writes en admin-reads via `createServiceClient()`** (service role, bypasst RLS) met `isAdminRequest()` als poortwachter. De SSR-cookie-client wordt bij schrijven als anon gezien ("new row violates row-level security policy"). Publieke formulieren altijd via server-routes, nooit browser-anon-client.
3. **MX mag nooit naar de Vercel-apex wijzen** (mail verdween daardoor tot 24-jun).
4. **Git op dit mount**: tmp-objects kunnen niet altijd verwijderd worden (warnings zijn onschuldig); een achtergebleven `HEAD.lock` blokkeert commits en moet handmatig weg. Push alleen door Jarno.
5. **Vercel-limieten**: lange klussen als job + step-lus (max ~20s per call, `maxDuration=60`), geen externe queue nodig.
6. **Persona-toetsing werkt**: elke ronde verse agents (anders keuren ze hun eigen advies goed), hardheidseis "zou kunnen telt als nee", en de replytekst uitschrijven als bewijs.

## Documentindex (docs/)
- `kritische-analyse-en-plan-18-jul-2026.md`: actuele kanalenanalyse + plan (conversie, content, PR, verwachtingen).
- `outreach-strategie-jul-2026.md`: outreach-strategie, v5-templates, persona-testverslag, actiepunten.
- `skill-verwijzer-personas.md`: inleef-skill Marjolein/Richard voor outreach-toetsing.
- `icp-personas.md`: de 7 ICP-profielen + competitieve aanscherping.
- `groeiplan-seo-juli-2026.md` en `growth-plan-conversie-juli-2026.md`: eerdere plannen (deels uitgevoerd; kanaal-conclusies achterhaald door 18-jul-analyse, conversie-ideeen zoals budgetsjabloon/e-mailcursus nog bruikbaar).
- `artikel-audit-juli-2026.md`: kwaliteitsaudit van alle artikelen.
- `analyse-conversie-advies.md`, `concurrentie-en-content-onderzoek-juli-2026.md`, `cluster1-geldpsychologie-concepten-juli-2026.md`: onderzoek/achtergrond.
- `archief-claude-md-tm-19-jul-2026.md`: de volledige oude sessielogboeken (raadplegen bij "waarom is dit ooit zo besloten").

## Beknopte historie
- Jun 2026: site + analyse-flow + admin gebouwd; ICP-rondes op homepage en analyse-flow; outreach-CRM + prospect-zoeker; RLS- en formulier-fixes; alleenstaanden-contentpillar.
- Begin jul 2026: cluster A (/financieel-coach + kosten-artikelen); geldscan (49 euro) gebouwd en omgebouwd naar rapport-format met aanmelden-eerst-volgorde; ICP-set vastgelegd; /aanbod herbouwd; follow-up-systeem.
- 18-19 jul 2026: kritische kanalenanalyse (SEO = vangnet, outreach = focus); outreach-strategie herschreven en in 4 persona-rondes getoetst (v5); plaats-veld + regio-zin; auto-follow-up-cron; admin-UX; A4-materiaal; prospect-zoeker livetest + bugfixes.
