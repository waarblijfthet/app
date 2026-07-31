-- top_paginas: meest bezochte pagina's over een periode, met views en het
-- aantal unieke sessies erbij.
--
-- Reden (30-jul-2026, verzoek van Jarno): op /admin/vandaag bovenaan de
-- bezoekcijfers per dag, week en maand, met daaronder de best bezochte
-- artikelen. Als Postgres-functie en niet in JavaScript, om dezelfde reden als
-- bezoekers_periode: paginabezoeken groeit door en een limit() in de client
-- kapt een telling stil af (zie docs/admin-redesign-30-jul-2026.md sectie 6).
--
-- views = aantal paginaloads, dus een refresh telt mee.
-- sessies = unieke sessie_id's, dus dichter bij "aantal mensen".
--
-- Draai dit eenmalig in de Supabase SQL-editor.

create or replace function top_paginas(sinds timestamptz, aantal int default 12)
returns table (pagina text, views bigint, sessies bigint)
language sql
stable
as $$
  select
    pb.pagina::text as pagina,
    count(*) as views,
    count(distinct pb.sessie_id) as sessies
  from paginabezoeken pb
  where pb.created_at >= sinds
  group by pb.pagina
  order by count(*) desc
  limit aantal;
$$;

-- views_periode: aantal paginaloads over een periode. Kan ook met een
-- count-query vanuit de app, maar zo staan views en sessies naast elkaar in
-- dezelfde bron en kunnen ze niet uit elkaar lopen.
create or replace function views_periode(sinds timestamptz)
returns bigint
language sql
stable
as $$
  select count(*)
  from paginabezoeken
  where created_at >= sinds;
$$;
