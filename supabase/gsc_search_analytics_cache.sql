-- Cache voor Google Search Console Search Analytics
-- Run eenmalig in de Supabase SQL Editor.
-- De route schrijft/leest met de service-role key (bypasst RLS), conform de
-- rest van het project. RLS staat aan zodat de anon-client er niet bij kan.

create table if not exists public.gsc_search_analytics_cache (
  id uuid primary key default gen_random_uuid(),
  cache_key text unique not null,
  -- bijv. "site-queries::28:final" of "page-queries:<url>:28:final"
  mode text not null,
  -- site-queries | site-pages | page-queries
  page text,
  days int not null,
  data_state text not null default 'final',
  rows jsonb not null,
  totals jsonb,
  range jsonb,
  fetched_at timestamptz not null default now()
);

alter table public.gsc_search_analytics_cache enable row level security;

-- Oude cache automatisch opschonen (ouder dan 30 dagen)
create or replace function public.cleanup_gsc_cache()
returns void language plpgsql as $$
begin
  delete from public.gsc_search_analytics_cache
  where fetched_at < now() - interval '30 days';
end;
$$;
