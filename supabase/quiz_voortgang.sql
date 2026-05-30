-- ============================================================
-- quiz_voortgang — meet voortgang/afhaken + ingevulde antwoorden
-- van de analyse-tool, ONAFHANKELIJK van e-mail (PII-vrij).
-- Draai dit eenmalig in de Supabase SQL-editor.
-- ============================================================

create table if not exists public.quiz_voortgang (
  id uuid primary key default gen_random_uuid(),
  sessie_id text unique not null,
  huidige_stap int not null default 1,
  max_stap int not null default 1,
  voltooid boolean not null default false,
  woonsituatie text,
  aantal_kinderen int,
  auto_situatie text,
  totaal_inkomen int,
  totaal_uitgaven int,
  maandelijks_over int,
  verdict text,
  grootste_afwijking text,
  antwoorden jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: zelfde patroon als paginabezoeken (anon insert/update/select).
-- Bevat géén e-mail/naam, dus anon-leesbaar is acceptabel.
alter table public.quiz_voortgang enable row level security;

drop policy if exists "anon insert quiz_voortgang" on public.quiz_voortgang;
create policy "anon insert quiz_voortgang"
  on public.quiz_voortgang for insert to anon, authenticated with check (true);

drop policy if exists "anon update quiz_voortgang" on public.quiz_voortgang;
create policy "anon update quiz_voortgang"
  on public.quiz_voortgang for update to anon, authenticated using (true) with check (true);

drop policy if exists "anon select quiz_voortgang" on public.quiz_voortgang;
create policy "anon select quiz_voortgang"
  on public.quiz_voortgang for select to anon, authenticated using (true);
