# Waar blijft het — projectcontext (lees dit eerst)

Compacte overdracht zodat een nieuwe sessie (ook met een goedkoper model) meteen op de hoogte is. Lees dit bestand aan het begin van elke sessie.

## Wat het is
Nederlandse personal-finance site voor gezinnen/stellen die **goed verdienen maar tóch krap zitten**. Géén schuldhulp, géén beleggingsadvies, eerlijk inzicht + lichte coaching.
- Stack: Next.js 14 (App Router), Supabase, Resend, recharts, Tailwind. Repo: github.com/waarblijfthet/app. Live: https://www.waarblijfthet.nl
- Toon: nuchter, eerlijk, geen jargon. Fonts: Fraunces (kop) + Plus Jakarta Sans (body). Kleuren: #1C3A2A (groen), #C4603A (terracotta), #F5F0E8/#FDFAF4 (creme).
- **Jarno is de enige persoon achter het project.** Altijd "ik/mij/mijn" in copy, nooit "wij/we/ons". Uitzondering: als hij over zijn gezin spreekt ("wij thuis") is dat logisch.
- **Geen em dashes (,) en geen koppeltekens als scheidingsteken ( - ) in copy.** Altijd vervangen door komma, punt of nieuwe zin. Dit geldt voor alle bestanden, inclusief hints, labels en meta-teksten.

## Aanbod / funnel
Gratis analyse (lead-instap, primaire CTA) → **Eenmalig adviesgesprek €125** (uitlegpagina: /adviesgesprek) → Traject €497.
- **Btw: KOR (kleineondernemersregeling) → géén btw. Prijzen €125 / €497 ZONDER btw vermelden.** (Nog: KvK + KOR aanmelden.)

## Belangrijke beslissingen
- Testimonials = **echte** (geanonimiseerde) gezinnen: Daan & Roos (potjes), Bram & Eva (boodschappen), Karim & Noor (BSO). Namen aangepast.
- Primaire CTA overal = gratis analyse (warmmaker); gesprek is de vervolgstap (op analyse-resultaat + /adviesgesprek).
- Geen losse "6-weken WhatsApp" meer (vervangen door adviesgesprek).

## SEO / AI-vindbaarheid
- **sitemap.xml, sitemap-0.xml, robots.txt én llms.txt worden gegenereerd door `scripts/generate-sitemap.mjs`** — draait in `next build` (zie package.json + vercel.json buildCommand). Leest artikel-slugs/titels uit `lib/inzichten-data.ts`. Bij nieuw artikel: niets handmatig, build regenereert alles.
- Canonicals/og/host = **www**. ~36 artikelen.
- Schema: Article + FAQPage + Person (sameAs LinkedIn/Instagram van Jarno) + Organization + AboutPage + DefinedTermSet. Auteur-bio onderaan elk artikel.
- Content-strategie (Google mei-2026 core update): **first-hand, non-commodity, voor/na-cases met echte bedragen, zichtbare auteur.** Geen llms.txt-illusies (Google gebruikt het niet), geen dunne variant-artikelen (scaled content abuse).

## Meting
- **quiz_voortgang** (PII-vrije tabel) meet drop-off per stap + ingevulde antwoorden, los van e-mail. SQL staat in `supabase/quiz_voortgang.sql` — **MOET nog eenmalig in Supabase SQL-editor gedraaid worden.**
- Admin → tab **📊 Funnel**: trechter + drop-off + "welke pagina's leiden naar de analyse".

## Open to-dos
- [ ] **Pushen naar git** — alle sessie-7-wijzigingen staan lokaal (lock-bestand blokkeerde push, was opgelost maar opnieuw vergrendeld; doe `git add -A && git commit -m "..." && git push` in terminal).
- [ ] **`supabase/cron_runs.sql` draaien** in Supabase SQL-editor (nieuwe tabel voor cron-logs, anders crasht de dagelijkse inspect-cron).
- [ ] **`supabase/quiz_voortgang.sql` draaien** in Supabase (nog steeds open uit vorige sessie).
- [ ] **Foto van Jarno** toevoegen aan `/over` pagina: vervang de JK-initialen `<div>` door een `<img>` in `app/over/page.tsx` (kaart) en `app/inzichten/[slug]/page.tsx` (auteur-bar).
- [ ] KvK inschrijven + KOR aanmelden bij Belastingdienst.
- [ ] SE Ranking-review (geplande taak ~20 juni 2026): export vergelijken met nulmeting 30 mei.
- [ ] Optioneel: beeld/reels in artikelen; Meta Pixel als er ooit ads komen.
- [ ] Open beslissingen uit VERBETERPLAN.md (Fase 2 conversie): CTA op analyse-resultaat naar betaald pakket nog niet gebouwd.

## Wat er in sessie 7-jun-2026 gedaan is (nog te pushen)
- **Google Search Console Inspect API gefixed**: endpoint was fout (`urlInspectionResult` → `urlInspection/index:inspect`), siteUrl was fout (`https://www.waarblijfthet.nl/` → `sc-domain:waarblijfthet.nl`). Werkt nu. Bestand: `app/api/admin/indexing/inspect/route.ts`.
- **Per-URL inspect-knop** toegevoegd aan admin indexing-tabel. Debug-info (tokenAccount, siteUrl) zichtbaar na inspectie. Bestand: `app/admin/components/IndexingTabblad.tsx`.
- **Dagelijkse cron** voor automatische indexstatus-check: `app/api/cron/indexing-inspect/route.ts` + cron in `vercel.json` (elke dag 09:00 CEST). Logt naar nieuwe Supabase-tabel `cron_runs`. Admin toont "Laatste automatische run" bovenaan het indexing-tabblad.
- **Mobiele UX inzichten-pagina** verbeterd: scrollbar verborgen op categoriepills, fade-gradient als scroll-hint, touch targets vergroot, artikeltellingen per filter, featured card minder hoog op mobiel. Bestanden: `app/inzichten/InzichtenGrid.tsx`, `app/globals.css`, `app/inzichten/page.tsx` (decoratieve pills verwijderd).
- **5 artikel-bestanden** hersteld na truncatie door Edit tool (schrijf grote bestanden altijd via Python `open(path, 'w')`).
- **/over pagina volledig herschreven** op basis van interview met Jarno: persoonlijk verhaal, CTO-paradox als opener, terras-vergelijking, taboe benoemd, bedrijfsmetafoor vervangen door universele taal, "wij/we" → "ik/mijn". Bestand: `app/over/page.tsx`.
- **Auteur-bio onder artikelen** scherper: van generieke beschrijving naar 4 puntige zinnen met de CTO-paradox. Link "Meer over ons" → "Meer over mij". Bestand: `app/inzichten/[slug]/page.tsx`.
- **471 em dashes verwijderd** uit alle 64 .tsx-bestanden die er nog bevatten (copy, labels, hints, meta-teksten). Vervangen door komma, punt of dubbele punt afhankelijk van context. In meta-titels: ` | ` als separator.

## Werkwijze-notitie
- Werkdocumenten (verbeterplan, plan van aanpak, partner-playbook, sjablonen, PDF's) zijn losse outputs, niet in de repo. In de repo horen alleen code + `supabase/*.sql` + `scripts/`.
- Verifieer codewijzigingen met `npx tsc --noEmit` (negeer fouten in `.next/`, dat is build-cache).
- Grote bestanden (>100 regels) altijd schrijven via Python `open(path, 'w')`, nooit via de Edit tool (trunceert zonder waarschuwing).
- Git-lock (`index.lock`) kan voorkomen als VS Code of een terminal de repo open heeft. Verwijder het bestand handmatig en retry.

## Werkwijze-notitie
- Werkdocumenten (verbeterplan, plan van aanpak, partner-playbook, sjablonen, PDF's) zijn losse outputs — niet in de repo. In de repo horen alleen code + `supabase/*.sql` + `scripts/`.
- Verifieer codewijzigingen met `npx tsc --noEmit` (negeer fouten in `.next/` — dat is build-cache).
