-- ============================================================
-- admin_statistiek (23-sep-2026)
--
-- Drie dingen, allemaal voor snelheid en veiligheid van de admin. De code
-- werkt ook ZONDER dit bestand: dan valt /api/admin/bezoekers terug op
-- doorbladeren in blokken van 1000 rijen en staat er een gele melding op het
-- Bezoekers-tabblad. Draai het dus wanneer het uitkomt, maar draai het wel,
-- want de terugval wordt trager naarmate paginabezoeken groeit.
--
-- Draai dit in de Supabase SQL-editor. Alles is idempotent.
-- ============================================================

-- 1. Indexen op paginabezoeken. Elke telling op het Vandaag-dashboard en het
--    Bezoekers-tabblad filtert op created_at; zonder index leest Postgres de
--    hele tabel, zeven keer per dashboardlading.
create index if not exists paginabezoeken_created_idx
  on public.paginabezoeken (created_at desc);
create index if not exists paginabezoeken_pagina_created_idx
  on public.paginabezoeken (pagina, created_at desc);
create index if not exists quiz_voortgang_created_idx
  on public.quiz_voortgang (created_at desc);

-- 2. Alle cijfers voor het Bezoekers-tabblad in één aanroep. Vervangt de
--    browserquery met .limit(500), waardoor week, maand en alles op 500
--    bleven hangen.
create or replace function bezoekers_statistiek(sinds timestamptz)
returns json
language sql
stable
as $$
  with basis as (
    select pagina, apparaat, sessie_id, stad, created_at
    from paginabezoeken
    where created_at >= sinds
  )
  select json_build_object(
    'views', (select count(*) from basis),
    'sessies', (select count(distinct sessie_id) from basis),
    'mobiel', (select count(*) from basis where apparaat = 'mobiel'),
    'paginas', coalesce((
      select json_agg(p order by p.totaal desc)
      from (
        select
          pagina::text as pagina,
          count(*) as totaal,
          count(*) filter (where apparaat = 'mobiel') as mobiel,
          count(*) filter (where apparaat is distinct from 'mobiel') as desktop,
          max(created_at) as laatste_bezoek
        from basis
        group by pagina
        order by count(*) desc
        limit 200
      ) p
    ), '[]'::json),
    'steden', coalesce((
      select json_agg(s order by s.aantal desc)
      from (
        select stad, count(*) as aantal
        from basis
        where stad is not null
        group by stad
        order by count(*) desc
        limit 8
      ) s
    ), '[]'::json)
  );
$$;

revoke execute on function bezoekers_statistiek(timestamptz) from anon;

-- 3. quiz_voortgang niet langer leesbaar met de anon-sleutel.
--    Sinds 23-sep-2026 leest niets in de live code deze tabel nog met de
--    browserclient: de admin gaat via /api/admin/analyse-verloop en
--    /api/admin/vandaag met de service key. Tot nu toe kon iedereen met de
--    anon-sleutel uit de browserbundle alle huishoudbedragen uitlezen
--    (vastgesteld op 23-sep-2026). Het oude FunnelTabblad.tsx gebruikt de
--    browserclient nog, maar dat component wordt sinds 30-jul-2026 door geen
--    enkele route meer geladen.
drop policy if exists "anon select quiz_voortgang" on public.quiz_voortgang;

-- Controle na het draaien (verwacht: 3 indexen, 1 functie, geen anon-select):
-- select indexname from pg_indexes where indexname in
--   ('paginabezoeken_created_idx','paginabezoeken_pagina_created_idx','quiz_voortgang_created_idx');
-- select proname from pg_proc where proname = 'bezoekers_statistiek';
-- select policyname from pg_policies where tablename = 'quiz_voortgang';
