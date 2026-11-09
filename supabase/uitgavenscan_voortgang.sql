-- ============================================================
-- uitgavenscan_voortgang (9-nov-2026)
--
-- Per sessie hoe ver iemand in de uitgavenscan kwam, zoals quiz_voortgang voor de analyse.
-- Geen bedragen, geen namen, geen rekeningnummers: alleen het verste scherm, wanneer elk scherm
-- voor het eerst in beeld kwam, en kenmerken uit vaste lijsten (lib/uitgavenscan/meting.ts).
--
-- Schrijven en lezen alleen via server-routes met de service key:
--   /api/uitgavenscan-voortgang (wizard) en /api/admin/uitgavenscan-verloop (admin).
-- Daarom RLS aan en GEEN policies voor anon of authenticated.
--
-- Draai dit in de Supabase SQL-editor in dezelfde deploy als de code.
-- ============================================================

create table if not exists public.uitgavenscan_voortgang (
  id uuid primary key default gen_random_uuid(),
  sessie_id text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  huidig_scherm text,
  max_scherm_index int not null default 0,
  apparaat text,
  eigenaar boolean not null default false,
  kenmerken jsonb not null default '{}'::jsonb,
  tijden jsonb not null default '{}'::jsonb
);

create index if not exists uitgavenscan_voortgang_created_idx
  on public.uitgavenscan_voortgang (created_at desc);

comment on table public.uitgavenscan_voortgang is
  'Voortgang per sessie in de uitgavenscan. Geen bedragen of persoonsgegevens. Alleen service key.';
comment on column public.uitgavenscan_voortgang.max_scherm_index is
  'Hoogste positie in SCHERMEN (lib/uitgavenscan/meting.ts), 0-based.';
comment on column public.uitgavenscan_voortgang.tijden is
  'Scherm-id naar het moment dat het voor het eerst in beeld kwam.';
comment on column public.uitgavenscan_voortgang.kenmerken is
  'Bank, downloadplek, formaat, leesfout, aantal maanden, onbekend-procent, adviesstatus. Zie meting.ts.';

alter table public.uitgavenscan_voortgang enable row level security;
-- Bewust geen policies: alleen de service key (die RLS omzeilt) mag erbij.
