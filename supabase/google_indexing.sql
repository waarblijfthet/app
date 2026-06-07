-- Google Indexing API tracking tabel
-- Run eenmalig in Supabase SQL Editor

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

-- updated_at automatisch bijwerken
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists google_indexing_updated_at on public.google_indexing;
create trigger google_indexing_updated_at
  before update on public.google_indexing
  for each row execute function public.set_updated_at();
