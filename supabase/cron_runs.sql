-- Cron run logs tabel
-- Run eenmalig in Supabase SQL Editor

create table if not exists public.cron_runs (
  id uuid primary key default gen_random_uuid(),
  job text not null,
  -- bijv. 'indexing-inspect'
  ran_at timestamptz not null default now(),
  duration_ms int,
  status text not null default 'ok',
  -- ok | error
  result jsonb
  -- bijv. { "inspected": 36, "indexed": 30, "not_indexed": 4, "errors": 2 }
);

alter table public.cron_runs enable row level security;

-- Oude runs automatisch opschonen (bewaar laatste 90 dagen)
create or replace function public.cleanup_cron_runs()
returns void language plpgsql as $$
begin
  delete from public.cron_runs
  where ran_at < now() - interval '90 days';
end;
$$;
