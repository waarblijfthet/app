-- bezoekers_periode: distinct-sessie-telling over een periode, als
-- Postgres-functie in plaats van rijen naar de server halen om ze in
-- JavaScript te dedupliceren. Nodig voor blok 5 (mini-trechter) van
-- /admin/vandaag, zie docs/admin-redesign-30-jul-2026.md sectie 6: "geen
-- limit() die stil kan afkappen, gebruik count-queries of aggregatie".
-- Draai dit eenmalig in de Supabase SQL-editor.

create or replace function bezoekers_periode(sinds timestamptz)
returns bigint
language sql
stable
as $$
  select count(distinct sessie_id)
  from paginabezoeken
  where created_at >= sinds;
$$;
