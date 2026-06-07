# Opdracht: Google Indexing API — admin tab + automatisering

## Context

Dit is een Next.js 14 (App Router) site met Supabase als database. Er is al een admin panel op `/app/admin/`. Het admin panel heeft meerdere tabbladen (zie `app/admin/AdminClient.tsx`). Supabase is al geconfigureerd via `@supabase/supabase-js` met de service role key in omgevingsvariabelen.

De site heeft ~40 pagina's/artikelen die geïndexeerd moeten worden via de Google Search Console / Indexing API, in plaats van te wachten tot Google ze vanzelf vindt.

## Wat er gebouwd moet worden

### 1. Supabase tabel: `google_indexing`

Maak een SQL-migratie (sla op als `supabase/google_indexing.sql`) met deze tabel:

```sql
create table if not exists public.google_indexing (
  id uuid primary key default gen_random_uuid(),
  url text unique not null,
  status text not null default 'pending',
  -- pending | submitted | indexed | not_indexed | error
  verdict text,
  -- PASS | NEUTRAL | FAIL (van URL Inspection API)
  coverage_state text,
  -- "Submitted and indexed", "Crawled - currently not indexed", etc.
  last_submitted_at timestamptz,
  last_inspected_at timestamptz,
  last_crawled_at timestamptz,
  submit_count int not null default 0,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: alleen server-side met service role key
alter table public.google_indexing enable row level security;
```

### 2. Google Cloud Service Account — authenticatie

Maak `lib/google-auth.ts`:
- Gebruik `google-auth-library` (npm install google-auth-library)
- Lees service account JSON uit omgevingsvariabele `GOOGLE_SERVICE_ACCOUNT_JSON`
- Maak een functie `getGoogleAuthToken()` die een Bearer token teruggeeft voor de juiste scopes:
  - `https://www.googleapis.com/auth/indexing`
  - `https://www.googleapis.com/auth/webmasters.readonly`

### 3. Sitemap sync — alle URLs inladen

Maak `lib/sitemap-urls.ts`:
- Lees alle artikel-slugs uit `lib/inzichten-data.ts` (de `artikelen` array, veld `slug`)
- Genereer de volledige URL-lijst voor waarblijfthet.nl:
  - `https://www.waarblijfthet.nl/` (homepage)
  - `https://www.waarblijfthet.nl/analyse`
  - `https://www.waarblijfthet.nl/adviesgesprek`
  - `https://www.waarblijfthet.nl/aanbod`
  - `https://www.waarblijfthet.nl/inzichten`
  - `https://www.waarblijfthet.nl/inzichten/[slug]` voor elk artikel
  - `https://www.waarblijfthet.nl/samenwerken` + de 4 partner subpagina's
- Exporteer `getAllUrls(): string[]`

### 4. API routes

#### `app/api/admin/indexing/sync/route.ts` — POST
- Haalt alle URLs op via `getAllUrls()`
- Insert elke URL in `google_indexing` als die nog niet bestaat (`on conflict do nothing`)
- Geeft terug: `{ added: number, total: number }`

#### `app/api/admin/indexing/submit/route.ts` — POST
Body: `{ urls?: string[] }` (optioneel; als leeg: pak de eerste 200 met status `pending`)
- Haalt Google auth token op
- Stuurt voor elke URL een POST naar:
  `https://indexing.googleapis.com/v3/urlNotifications:publish`
  met body: `{ "url": "...", "type": "URL_UPDATED" }`
- Update `google_indexing`: status → `submitted`, `last_submitted_at`, `submit_count + 1`
- Respecteer dagelijks limiet van 200 per dag (tel hoeveel er vandaag al zijn ingediend)
- Geeft terug: `{ submitted: number, skipped: number, errors: string[] }`

#### `app/api/admin/indexing/inspect/route.ts` — POST
Body: `{ urls?: string[] }` (optioneel; als leeg: pak de eerste 50 submitted/not_indexed URLs)
- Haalt Google auth token op
- Stuurt voor elke URL een POST naar:
  `https://searchconsole.googleapis.com/v1/urlInspectionResult:inspect`
  met body:
  ```json
  {
    "inspectionUrl": "...",
    "siteUrl": "https://www.waarblijfthet.nl/"
  }
  ```
- Verwerkt response: lees `inspectionResult.indexStatusResult`:
  - `verdict` → PASS / NEUTRAL / FAIL
  - `coverageState` → "Submitted and indexed", etc.
  - `lastCrawlTime` → `last_crawled_at`
- Update `google_indexing`:
  - Als verdict = PASS: status → `indexed`
  - Als verdict = FAIL: status → `not_indexed`
  - Anders: status → `submitted` (nog wachten)
  - Vul `verdict`, `coverage_state`, `last_inspected_at`, `last_crawled_at` in
- Geeft terug: `{ inspected: number, indexed: number, not_indexed: number, errors: string[] }`

#### `app/api/admin/indexing/status/route.ts` — GET
- Haalt alle rijen op uit `google_indexing`, gesorteerd op: `not_indexed` eerst, dan `pending`, dan `submitted`, dan `indexed`
- Geeft terug: de volledige lijst + samenvatting `{ total, pending, submitted, indexed, not_indexed, error }`

### 5. Admin tab: `app/admin/components/IndexingTabblad.tsx`

Voeg een nieuw tabblad toe aan het admin panel (naast de bestaande tabs in `AdminClient.tsx`). Tab-label: `🔍 Indexering`.

De tab toont:

**Bovenaan — statusbalk (4 pills):**
`Pending: X` · `Ingediend: X` · `Geïndexeerd: X` · `Niet geïndexeerd: X`

**Drie actie-knoppen:**
1. **Sync URLs** — POST naar `/api/admin/indexing/sync` — laadt alle URL's in die nog niet in de tabel staan
2. **Indienen bij Google** (max 200/dag) — POST naar `/api/admin/indexing/submit` — verstuurt pending URLs naar Indexing API
3. **Status ophalen** — POST naar `/api/admin/indexing/inspect` — vraagt URL Inspection API voor ingediende URLs

Na elke actie: toon het resultaat als een inline melding (bijv. "47 URLs ingediend, 3 fouten").

**URL-tabel:**

| URL | Status | Verdict | Laatste crawl | Ingediend | Actie |
|-----|--------|---------|---------------|-----------|-------|
| /inzichten/wat-kost-een-... | 🟢 indexed | PASS | 5 jun 2026 | 6 jun | — |
| /inzichten/tweede-inkomen... | 🟡 submitted | — | — | 6 jun | Opnieuw indienen |
| /analyse | 🔴 not_indexed | FAIL | — | — | Indienen |

Status-badges:
- `pending` → grijs
- `submitted` → geel/amber
- `indexed` → groen
- `not_indexed` → rood
- `error` → rood met ×

Per rij: knop "Opnieuw indienen" of "Indienen" als de status niet `indexed` is. Dit triggert submit voor die specifieke URL.

Gebruik de bestaande stijlen van de admin (Tailwind, kleuren #1C3A2A / #C4603A / #F5F0E8).

### 6. Omgevingsvariabelen

De Google Cloud setup is al gedaan. Het service account `index-api@waar-blijft-het.iam.gserviceaccount.com` is al als Owner toegevoegd aan Search Console.

Voeg de volgende regel toe aan `.env.local` — de JSON als één aaneengesloten regel (geen enters in de private key, die zijn al als `\n` geëscaped):

```
GOOGLE_SERVICE_ACCOUNT_JSON=<plak hier de volledige JSON uit je Google Cloud Console — niet committen in de repo>
```

Voeg ook dezelfde waarde toe als omgevingsvariabele in het Vercel dashboard (Settings → Environment Variables → `GOOGLE_SERVICE_ACCOUNT_JSON`).

### 7. Dagelijkse automatisering (optioneel, als cron beschikbaar)

Maak `app/api/cron/indexing/route.ts`:
- Voert automatisch `sync` → `submit` → `inspect` uit
- Beveiligd met een `CRON_SECRET` header check
- Bedoeld voor Vercel Cron Jobs (zie `vercel.json`)

Voeg toe aan `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cron/indexing",
    "schedule": "0 8 * * *"
  }]
}
```

## Randvoorwaarden

- Alle API routes zijn beveiligd: check of de request van localhost komt of een `ADMIN_SECRET` header bevat (dezelfde als de bestaande admin beveiliging in het project — kijk hoe de bestaande admin routes beveiligd zijn en doe hetzelfde)
- Gebruik `fetch` in de API routes (geen zware SDK's), behalve `google-auth-library` voor authenticatie
- TypeScript strict — geen `any`
- Error handling: vang API-fouten van Google op en sla de error message op in `google_indexing.error_message`
- Rate limiting: bij het indienen, tel hoeveel URLs er vandaag al zijn ingediend (`last_submitted_at >= today`) en blokkeer als limiet bereikt is

## Wat te installeren

```bash
npm install google-auth-library
```

## Volgorde van implementatie

1. `supabase/google_indexing.sql` — run dit eerst handmatig in Supabase SQL editor
2. `lib/google-auth.ts`
3. `lib/sitemap-urls.ts`
4. De vier API routes
5. `IndexingTabblad.tsx`
6. `AdminClient.tsx` updaten met het nieuwe tabblad
7. `vercel.json` updaten met cron job
