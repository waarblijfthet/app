-- ============================================================
-- quiz_voortgang v3 (6-sep-2026)
--
-- Drie dingen:
--   1. Per scherm meten in plaats van per categorie. De flow heeft 29
--      schermen verdeeld over 5 categorieen, dus max_stap = 4 betekende
--      "ergens in de negen schermen van vervoer en vaste lasten". Welke van
--      die negen iemand liet afhaken was niet te zien.
--   2. Toestemming voor de data-asset (plan sectie 6 punt 3, CLAUDE.md 8.25).
--   3. Schrijven gaat vanaf nu via de server-route /api/analyse-voortgang met
--      de service key. De anon-rol hoeft dus niet meer te mogen inserten of
--      updaten.
--
-- Draai dit in de Supabase SQL-editor in dezelfde deploy als de code.
-- ============================================================

alter table public.quiz_voortgang
  add column if not exists huidig_scherm text;

alter table public.quiz_voortgang
  add column if not exists max_scherm_index int not null default 0;

alter table public.quiz_voortgang
  add column if not exists toestemming_data_asset boolean not null default false;

comment on column public.quiz_voortgang.huidig_scherm is
  'Scherm-id uit app/analyse/schermen/index.tsx, of resultaat.';
comment on column public.quiz_voortgang.max_scherm_index is
  'Hoogste bereikte positie in de actieve schermenlijst van deze bezoeker, 0-based.';

-- Schrijfrechten intrekken: de server-route schrijft met de service key en
-- omzeilt RLS. Laat een client niet langer rechtstreeks in deze tabel schrijven.
drop policy if exists "anon insert quiz_voortgang" on public.quiz_voortgang;
drop policy if exists "anon update quiz_voortgang" on public.quiz_voortgang;

-- LET OP, bewust nog niet ingetrokken: "anon select quiz_voortgang".
-- Het funneltabblad in de admin leest deze tabel met de browserclient, dus
-- select dichtzetten breekt het dashboard. Volgende stap is die lezing naar
-- een server-route te verplaatsen, net als app/api/admin/vandaag, en daarna
-- ook select in te trekken. Zolang dat niet gebeurd is, is de tabel leesbaar
-- met de anon-sleutel uit de browserbundle. Er staat geen naam of e-mailadres
-- in, wel huishoudbedragen.
