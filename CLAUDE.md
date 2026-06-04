# Waar blijft het — projectcontext (lees dit eerst)

Compacte overdracht zodat een nieuwe sessie (ook met een goedkoper model) meteen op de hoogte is. Lees dit bestand aan het begin van elke sessie.

## Wat het is
Nederlandse personal-finance site voor gezinnen/stellen die **goed verdienen maar tóch krap zitten**. Géén schuldhulp, géén beleggingsadvies — eerlijk inzicht + lichte coaching.
- Stack: Next.js 14 (App Router), Supabase, Resend, recharts, Tailwind. Repo: github.com/waarblijfthet/app. Live: https://www.waarblijfthet.nl
- Toon: nuchter, eerlijk, geen jargon. Fonts: Fraunces (kop) + Plus Jakarta Sans (body). Kleuren: #1C3A2A (groen), #C4603A (terracotta), #F5F0E8/#FDFAF4 (creme).

## Aanbod / funnel
Gratis analyse (lead-instap, primaire CTA) → **Eenmalig adviesgesprek €125** (uitlegpagina: /adviesgesprek) → Traject €497. Betaling via Tikkie vooraf.
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
- [ ] Laatste wijzigingen committen + pushen (Vercel deployt automatisch).
- [ ] KvK inschrijven + KOR aanmelden bij Belastingdienst.
- [ ] `supabase/quiz_voortgang.sql` draaien in Supabase.
- [ ] SE Ranking-review (geplande taak ~20 juni 2026): export vergelijken met nulmeting 30 mei.
- [ ] Optioneel: beeld/reels in artikelen; Meta Pixel als er ooit ads komen.

## Werkwijze-notitie
- Werkdocumenten (verbeterplan, plan van aanpak, partner-playbook, sjablonen, PDF's) zijn losse outputs — niet in de repo. In de repo horen alleen code + `supabase/*.sql` + `scripts/`.
- Verifieer codewijzigingen met `npx tsc --noEmit` (negeer fouten in `.next/` — dat is build-cache).
