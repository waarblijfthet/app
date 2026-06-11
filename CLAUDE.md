# Waar blijft het — projectcontext (lees dit eerst)

Compacte overdracht zodat een nieuwe sessie meteen op de hoogte is. Lees dit aan het begin van elke sessie.

## Wat het is
Nederlandse personal-finance site voor mensen die **goed verdienen maar tóch krap zitten**. Géén schuldhulp, géén beleggingsadvies, eerlijk inzicht + lichte coaching.
- Stack: Next.js 14 (App Router), Supabase, Resend, recharts, Tailwind. Repo: github.com/waarblijfthet/app. Live: https://www.waarblijfthet.nl
- Toon: nuchter, eerlijk, geen jargon. Fonts: Fraunces (kop) + Plus Jakarta Sans (body). Kleuren: #1C3A2A (groen), #C4603A (terracotta), #F5F0E8/#FDFAF4 (creme).
- **Jarno is de enige persoon achter het project.** Altijd "ik/mij/mijn" in copy, nooit "wij/we/ons". Uitzondering: als hij over zijn gezin spreekt ("wij thuis") is dat logisch.
- **Geen em dashes en geen koppeltekens als scheidingsteken in copy.** Altijd vervangen door komma, punt of nieuwe zin. Dit geldt voor alle bestanden, inclusief hints, labels en meta-teksten.
- **CTO nooit noemen** in copy (te elitair, mensen herkennen het niet). Artikel-bio en FAQ gebruiken: "Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte."

## Aanbod / funnel
Gratis analyse (lead-instap, primaire CTA) → **Eenmalig adviesgesprek €125** (uitlegpagina: /adviesgesprek) → Traject €497.
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
- Relevante bestanden: `app/api/admin/outreach/send/route.ts` (templates), `app/admin/components/OutreachTabblad.tsx` (UI).
- Resend-webhook voor open/klik tracking: `app/api/webhooks/resend/route.ts`. Vereist `RESEND_WEBHOOK_SECRET` in Vercel env (nog in te stellen).
- **`supabase/outreach_contacts.sql` MOET nog eenmalig gedraaid worden** in Supabase SQL-editor voor de tabel bestaat. (RLS-policy aangescherpt naar `to authenticated` op 11-jun, draai opnieuw als de oude policy al bestond.)

## Prospect-zoeker (admin-tab "Prospects")
Verzamelt zelfstandig namen + e-mailadressen van potentiële samenwerkingspartners en zet ze na goedkeuring in de outreach mini-CRM. Toegevoegd 11-jun-2026.
- **Twee bronnen**: (1) URL van een overzichtspagina (ledenlijst/verwijsgids), of (2) zoekwoorden (doelgroep + stad, één zoekopdracht per regel, max 10). URL werkt het betrouwbaarst.
- **Zoekwoorden-modus** (`lib/prospects/search.ts`): zoekt via de **Brave Search API** als `BRAVE_SEARCH_API_KEY` in Vercel staat (betrouwbaar vanaf datacenter-IP, gratis tot ~2000/mnd), met **DuckDuckGo HTML-POST** als gratis fallback (vaak geblokkeerd vanaf Vercel-IP's, daarom alleen best-effort). Resultaten worden per domein ontdubbeld tot één homepage en daarna door dezelfde site-crawler gehaald als de URL-modus. Foutmelding legt uit of de sleutel ontbreekt.
- **Werking**: job-gebaseerd. POST `/api/admin/prospects` maakt een job + wachtrij van sites. De UI roept daarna in een lus POST `/api/admin/prospects/step` aan (max 3 sites per call, tijdsbudget 20s, `maxDuration=60`) tot de wachtrij leeg is. Zo blijven we binnen Vercel-limieten zonder externe queue.
- **Per site**: homepage + max 3 contact-achtige pagina's, respecteert robots.txt, beleefde user-agent `WaarBlijftHetBot`. Extractie van e-mail (mailto eerst, ook ontsluierd `info [at] domein [dot] nl`), naam (JSON-LD Person → `<h1>` → meta author → "ik ben ..."-patroon → titel), en doelgroep via trefwoord-classificatie (of handmatig vastgezet).
- **Overzichtspagina volgt individuele profielen (belangrijk, 11-jun v2)**: bij een ledenlijst/verwijsgids opent de zoeker élk profiel apart i.p.v. alleen de overzichtspagina. Drie sporen in `bouwWachtrijVanUrl`: (1) same-host profiel-cluster op de pagina zelf (grootste groep URL's met gelijke pad-diepte ≥2), (2) externe praktijksites, (3) **sitemap-fallback** als de lijst JavaScript-gerenderd is (zoals eft.nl): leest `sitemap.xml`/`sitemap_index.xml` en pakt het profiel-cluster daaruit. Per profiel: staat er geen e-mail op, dan volgt hij de eigen-website-link één hop (`vindEigenWebsite`). Het e-maildomein van de directory zelf (`negeerDomein`, bijv. `info@eft.nl`) wordt altijd genegeerd. `MAX_SITES=60` per batch.
- **Review-wachtrij**: gevonden adressen staan in tabel `prospects` (status `gevonden`). Admin keurt goed (→ `outreach_contacts`, status `nieuw`) of wijst af. Naam en categorie inline aanpasbaar. Ontdubbelt tegen bestaande outreach-contacten en eerdere prospects.
- **SSRF-bescherming**: crawler weigert localhost, 127/10/192.168/172.16-31/169.254-ranges; redirects worden handmatig gevolgd en per hop opnieuw gecheckt.
- **Bestanden**: `lib/prospects/` (types, extract, classify, crawler, opslag), `app/api/admin/prospects/{route,step/route,review/route}.ts`, `app/admin/components/ProspectsTabblad.tsx`, tab toegevoegd in `app/admin/AdminClient.tsx`.
- **`supabase/prospect_zoeker.sql` MOET nog eenmalig gedraaid worden** in de Supabase SQL-editor (tabellen `prospect_jobs` + `prospects`).
- Alle admin outreach-routes hebben nu een `isAdminRequest()`-guard (stond er nog niet op).

## SEO / AI-vindbaarheid
- **sitemap.xml, sitemap-0.xml, robots.txt én llms.txt** worden gegenereerd door `scripts/generate-sitemap.mjs` — draait in `next build`. Leest artikel-slugs/titels uit `lib/inzichten-data.ts`. Bij nieuw artikel: niets handmatig, build regenereert alles.
- Canonicals/og/host = **www**. ~39 artikelen (incl. 3 nieuwe alleenstaande sub-artikelen).
- Schema: Article + FAQPage + Person (sameAs LinkedIn/Instagram van Jarno) + Organization + AboutPage + DefinedTermSet. Auteur-bio onderaan elk artikel.
- Content-strategie (Google mei-2026 core update): **first-hand, non-commodity, voor/na-cases met echte bedragen, zichtbare auteur.**

## Meting
- **quiz_voortgang** (PII-vrije tabel) meet drop-off per stap + ingevulde antwoorden. SQL staat in `supabase/quiz_voortgang.sql` — **MOET nog eenmalig in Supabase SQL-editor gedraaid worden.**
- Admin → tab **Funnel**: trechter + drop-off + "welke pagina's leiden naar de analyse".
- Admin → tab **Indexing**: per-URL Google Search Console inspect + dagelijkse cron (09:00 CEST). Logt naar `cron_runs` tabel.

## Open to-dos
- [ ] **Git push** — hero-tekst, CTO-verwijdering, outreach UI/templates (10-jun sessie) nog niet gepusht. Doe: `git add -A && git commit -m "fix: hero aangescherpt, CTO weg, outreach categorieen + templates" && git push`
- [ ] **`supabase/outreach_contacts.sql` draaien** in Supabase SQL-editor (tabel voor outreach mini-CRM).
- [ ] **`supabase/cron_runs.sql` draaien** in Supabase SQL-editor (anders crasht de dagelijkse inspect-cron).
- [ ] **`supabase/quiz_voortgang.sql` draaien** in Supabase SQL-editor.
- [ ] **`supabase/prospect_zoeker.sql` draaien** in Supabase SQL-editor (tabellen `prospect_jobs` + `prospects` voor de prospect-zoeker).
- [ ] **`RESEND_WEBHOOK_SECRET`** toevoegen aan Vercel environment variables (open/klik tracking werkt pas dan).
- [ ] **`BRAVE_SEARCH_API_KEY`** toevoegen aan Vercel env (gratis sleutel via brave.com/search/api) zodat de zoekwoorden-modus van de prospect-zoeker betrouwbaar werkt. Zonder sleutel valt hij terug op DuckDuckGo, dat vanaf Vercel vaak geblokkeerd wordt.
- [ ] **Foto van Jarno** toevoegen: vervang de JK-initialen `<div>` door `<img>` in `app/over/page.tsx` en `app/inzichten/[slug]/page.tsx` (auteur-bar).
- [ ] KvK inschrijven + KOR aanmelden bij Belastingdienst.
- [ ] SE Ranking-review (~20 juni 2026): export vergelijken met nulmeting 30 mei.
- [ ] Outreach email-templates voor 3 doelgroepen inhoudelijk reviewen met Jarno (budgetcoaches, financieel-planners, burnout-coaches zijn technisch klaar maar nog niet door Jarno gelezen).
- [ ] Fase 2 conversie: CTA op analyse-resultaat naar betaald pakket (nog niet gebouwd).
- [ ] Optioneel: beeld/reels in artikelen; Meta Pixel als er ooit ads komen.

## Wat er in sessie 11-jun-2026 gedaan is
- **Prospect-zoeker gebouwd** (nieuwe admin-tab "Prospects"): zelfstandig namen + e-mailadressen verzamelen op basis van een overzichts-URL of zoekwoorden, met review-wachtrij naar de outreach mini-CRM. Zie de sectie "Prospect-zoeker" hierboven voor de volledige werking en bestanden.
- **Architectuur**: job + client-driven step-lus (max 3 sites/call, 20s budget, `maxDuration=60`) zodat alles binnen Vercel-limieten draait zonder externe queue of cron.
- **Code-review door subagent** verwerkt: RLS dichtgetrokken naar `to authenticated` (anon key is publiek), genegeerde update-error + oneindige lus opgelost, concurrency-guard (optimistic lock op `updated_at`), SSRF-bescherming tegen interne adressen, robots.txt-parser per user-agent-blok.
- **`isAdminRequest()`-guard** toegevoegd aan de bestaande outreach-routes (`route.ts` en `send/route.ts`), die hadden nog geen serverside auth-check.
- Geverifieerd met `npx tsc --noEmit` (schoon) + unit-tests van extractie, classificatie, SSRF-guard en robots-parser. Geen em dashes/koppeltekens in copy; ik-vorm aangehouden.
- **v2 (zelfde sessie, na feedback Jarno)**: overzichtspagina pakte eerst alleen de pagina zelf (bij eft.nl dus `info@eft.nl`). Crawler herbouwd zodat hij individuele profielen volgt + sitemap-fallback voor JS-lijsten + doorklikken naar eigen website (zie sectie "Prospect-zoeker"). Getest met eft.nl-fixtures (profiel mét mail → eigen adres i.p.v. directory-adres; profiel zonder mail → hop naar praktijksite; JS-lijst → sitemap-cluster).
- **Let op (tooling)**: de Edit-tool kapte tijdens deze sessie tweemaal een bestand af (route.ts en ProspectsTabblad.tsx), hersteld via Python `open(...,'w')`. tsc `--incremental` cache kan phantom-fouten geven; draai bij twijfel `npx tsc --noEmit --incremental false`.

## Wat er in sessie 10-jun-2026 gedaan is
- **Alleenstaande pillar page** omgevormd: persona-selector, "single premium" sectie (30-50% meer per hoofd), Sophie-case voor de CTA, links naar sub-artikelen. Bestand: `app/inzichten/[slug]/content/kosten-levensonderhoud-alleenstaande-2026.tsx`.
- **3 sub-artikelen** geschreven en ICP-gevalideerd: ouder (ALO-kop, regelingen), ZZP (AOV, buffer, voorlopige aanslag), 50+ (AOW, pensioengat, Ellen case gecorrigeerd). `lib/inzichten-data.ts` bijgewerkt.
- **Hero homepage aangescherpt**: "geen schulden" → "betaalt alles op tijd", "karakterfout" vervangen door "Dat ligt niet aan jou", uitkomst toegevoegd. Bestand: `app/page.tsx`.
- **CTO verwijderd** uit artikel-bio (`app/inzichten/[slug]/page.tsx`) en aanbod-FAQ (`app/aanbod/components/AanbodAccordion.tsx`). Vervangen door generieke formulering zonder jobtitel.
- **Outreach UI uitgebreid**: categoriedropdown in formulier, filterpills per doelgroep, categorie-kolom met kleurcodering. Bestand: `app/admin/components/OutreachTabblad.tsx`.
- **4 email-templates** met eigen subject per doelgroep. Bestand: `app/api/admin/outreach/send/route.ts`.

## Werkwijze-notitie
- Werkdocumenten (verbeterplan, plan van aanpak, partner-playbook, sjablonen, PDF's) zijn losse outputs, niet in de repo. In de repo horen alleen code + `supabase/*.sql` + `scripts/`.
- Verifieer codewijzigingen met `npx tsc --noEmit` (negeer fouten in `.next/`, dat is build-cache).
- Grote bestanden (>100 regels) altijd schrijven via Python `open(path, 'w')`, nooit via de Edit tool (trunceert zonder waarschuwing). Bij bash heredocs: `cat > file << 'PYEOF'` werkt ook.
- Git-lock (`index.lock`) kan voorkomen als VS Code of een terminal de repo open heeft. Verwijder het bestand handmatig en retry.
- Edit tool introduceert soms null bytes. Strip ze na elke Edit met: `python3 -c "f=open(p,'rb').read(); open(p,'wb').write(f.replace(b'\x00',b''))"`.
