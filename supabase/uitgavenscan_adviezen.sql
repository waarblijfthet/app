-- ============================================================
-- uitgavenscan_adviezen (12-nov-2026)
--
-- Op verzoek van Jarno: elk voorlopig advies uit de uitgavenscan bewaren, met de samenvatting
-- waarop het gebaseerd is, zodat hij de kwaliteit kan nakijken en ziet wat iemand te zien kreeg,
-- ook als die persoon daarna geen Geldscan aanvraagt.
--
-- Wat erin staat: de samenvatting die de browser al naar de server stuurt (lib/uitgaven/samenvatting.ts:
-- maandtotalen op tientjes, categorieen, merknamen, geen IBANs, geen omschrijvingen, geen namen van
-- personen), het advies zoals de bezoeker het zag, en technische gegevens (status, pogingen, tokens,
-- duur, fouten). GEEN e-mailadres, naam of IP-adres. Koppeling met uitgavenscan_voortgang via sessie_id.
--
-- Schrijven: alleen /api/uitgavenscan/advies, lezen: alleen /api/admin/uitgavenscan-verloop,
-- allebei met de service key. Daarom RLS aan en GEEN policies voor anon of authenticated.
--
-- Draai dit in de Supabase SQL-editor in dezelfde deploy als de code. Ontbreekt de tabel, dan
-- werkt het advies gewoon, logt de route een fout en toont de admin een gele melding.
-- ============================================================

create table if not exists public.uitgavenscan_adviezen (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  sessie_id text,
  eigenaar boolean not null default false,
  status text not null,
  samenvatting jsonb not null,
  advies jsonb,
  fouten jsonb,
  pogingen int,
  tokens jsonb,
  duur_ms int,
  model text
);

create index if not exists uitgavenscan_adviezen_created_idx
  on public.uitgavenscan_adviezen (created_at desc);
create index if not exists uitgavenscan_adviezen_sessie_idx
  on public.uitgavenscan_adviezen (sessie_id);

comment on table public.uitgavenscan_adviezen is
  'Elk voorlopig advies uit de uitgavenscan met zijn samenvatting. Geen naam, e-mail of IP. Alleen service key.';
comment on column public.uitgavenscan_adviezen.status is
  'gemaakt, te_onvolledig of mislukt (zelfde waarden als kenmerken.adviesStatus in uitgavenscan_voortgang).';
comment on column public.uitgavenscan_adviezen.advies is
  'Het advies met ingevulde getallen, precies zoals de bezoeker het zag. Leeg als het niet lukte.';

alter table public.uitgavenscan_adviezen enable row level security;
-- Bewust geen policies: alleen de service key (die RLS omzeilt) mag erbij.
