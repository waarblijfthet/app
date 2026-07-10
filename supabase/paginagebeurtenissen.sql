-- ============================================================
-- paginagebeurtenissen, meet ACTIE op pagina's (kliks + formulier),
-- ONAFHANKELIJK van e-mail (PII-vrij). Bedoeld voor de aanbodpagina:
-- welke opties worden aangeklikt, wie klikt door naar het formulier,
-- en hoe ver komt iemand in het formulier.
-- Draai dit eenmalig in de Supabase SQL-editor.
-- ============================================================

create table if not exists public.paginagebeurtenissen (
  id uuid primary key default gen_random_uuid(),
  sessie_id text not null,
  gebeurtenis text not null,           -- bv. aanbod_kaart_klik, aanbod_cta_klik, intake_gestart, intake_verlaten, intake_verzonden
  pakket text,                         -- geldscan | gesprek | intensief (indien van toepassing)
  apparaat text,                       -- mobiel | desktop
  meta jsonb,                          -- vrije context, bv. { "velden": 3, "totaal": 5 }
  created_at timestamptz not null default now()
);

create index if not exists paginagebeurtenissen_created_idx
  on public.paginagebeurtenissen (created_at desc);
create index if not exists paginagebeurtenissen_gebeurtenis_idx
  on public.paginagebeurtenissen (gebeurtenis);

-- RLS: zelfde patroon als paginabezoeken/quiz_voortgang (anon insert/select).
-- Bevat géén e-mail/naam, dus anon-leesbaar is acceptabel.
alter table public.paginagebeurtenissen enable row level security;

drop policy if exists "anon insert paginagebeurtenissen" on public.paginagebeurtenissen;
create policy "anon insert paginagebeurtenissen"
  on public.paginagebeurtenissen for insert to anon, authenticated with check (true);

drop policy if exists "anon select paginagebeurtenissen" on public.paginagebeurtenissen;
create policy "anon select paginagebeurtenissen"
  on public.paginagebeurtenissen for select to anon, authenticated using (true);
