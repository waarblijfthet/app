-- ============================================================
-- intake_aanvragen: samenvatting uit de uitgavenscan (9-nov-2026)
--
-- Een Geldscan-aanvraag vanuit de uitgavenscan bewaart de samenvatting die de bezoeker in de
-- browser liet maken (geen namen, geen rekeningnummers, maandtotalen op tientjes). Jarno maakt
-- daarmee het plan op maat. Verwijderen na levering doet Jarno zelf (zie CLAUDE.md sectie 11).
--
-- Ontbreekt de kolom, dan slaat /api/uitgavenscan/aanvraag de aanvraag op zonder samenvatting en
-- staat die in de mail aan Jarno (als bijlage), met een waarschuwing. Niet stil.
-- ============================================================

alter table public.intake_aanvragen
  add column if not exists uitgaven_samenvatting jsonb;

comment on column public.intake_aanvragen.uitgaven_samenvatting is
  'Samenvatting uit de uitgavenscan (lib/uitgaven/samenvatting.ts). Geen persoonsgegevens. Verwijderen na levering.';
