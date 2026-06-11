-- Prospect-zoeker: automatisch namen en e-mailadressen verzamelen voor outreach
-- Draai dit eenmalig in de Supabase SQL-editor

create table if not exists prospect_jobs (
  id           uuid        default gen_random_uuid() primary key,
  type         text        not null check (type in ('url','zoekwoorden')),
  invoer       text        not null,
  doelgroep    text        not null default 'auto',
  status       text        not null default 'wachtrij'
    check (status in ('wachtrij','bezig','klaar','fout','gestopt')),
  wachtrij     jsonb       not null default '[]',
  totaal       int         not null default 0,
  verwerkt     int         not null default 0,
  gevonden     int         not null default 0,
  foutmelding  text,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

create table if not exists prospects (
  id              uuid        default gen_random_uuid() primary key,
  job_id          uuid        references prospect_jobs (id) on delete cascade,
  naam            text        not null,
  praktijk        text,
  email           text        not null unique,
  website         text,
  bron_url        text,
  doelgroep       text        not null default 'relatietherapeuten',
  doelgroep_score int         not null default 0,
  context         text,
  status          text        not null default 'gevonden'
    check (status in ('gevonden','goedgekeurd','afgewezen')),
  created_at      timestamptz default now()
);

create index if not exists prospects_job_id_idx on prospects (job_id);
create index if not exists prospects_status_idx on prospects (status);

-- RLS: alleen ingelogde admins (authenticated) en de service role.
-- De anon key is publiek (zit in de browserbundel), dus die mag GEEN toegang
-- krijgen. De API-routes gebruiken de auth-cookie van de ingelogde admin
-- (rol 'authenticated'); de service role bypasst RLS sowieso.
alter table prospect_jobs enable row level security;
alter table prospects enable row level security;

create policy "Authenticated admin access"
  on prospect_jobs for all
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admin access"
  on prospects for all
  to authenticated
  using (true)
  with check (true);
