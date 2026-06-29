-- ============================================================
-- quiz_voortgang v2 — voegt apparaat + eerste_interactie toe.
-- Hiermee kunnen we onderscheiden:
--   * pagina geladen (rij bestaat, mount logt stap 1)
--   * begon daadwerkelijk in te vullen (eerste_interactie = true)
--   * op welk apparaat (mobiel/desktop)
-- Draai dit eenmalig in de Supabase SQL-editor (na quiz_voortgang.sql).
-- ============================================================

alter table public.quiz_voortgang
  add column if not exists apparaat text;

alter table public.quiz_voortgang
  add column if not exists eerste_interactie boolean not null default false;
