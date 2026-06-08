-- Outreach mini-CRM
-- Draai dit eenmalig in de Supabase SQL-editor

create table if not exists outreach_contacts (
  id            uuid        default gen_random_uuid() primary key,
  naam          text        not null,
  email         text        not null unique,
  doelgroep     text        not null default 'relatietherapeuten',
  created_at    timestamptz default now(),
  verstuurd_at  timestamptz,
  resend_id     text,
  geopend_at    timestamptz,
  geklikt_at    timestamptz,
  bounced_at    timestamptz,
  status        text        not null default 'nieuw'
    check (status in ('nieuw','verstuurd','geopend','geklikt','bounced'))
);

-- Index voor webhook lookup op resend_id
create index if not exists outreach_contacts_resend_id_idx
  on outreach_contacts (resend_id);

-- RLS: alleen service role (API routes) heeft toegang
alter table outreach_contacts enable row level security;

create policy "Service role full access"
  on outreach_contacts for all
  using (true);
