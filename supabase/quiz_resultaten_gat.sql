-- 12-okt-2026: het gat tussen wat er op papier en wat er echt overblijft.
-- Idempotent. Eenmalig draaien in de Supabase SQL-editor. Zonder deze kolommen
-- werkt het opslaan nog steeds (de terugval in lib/analyse-opslaan.ts laat ze
-- weg en logt een waarschuwing), maar toont /resultaat/[token] dan de oude
-- uitkomst zonder gat.
alter table quiz_resultaten add column if not exists werkelijk_over int;
alter table quiz_resultaten add column if not exists niet_aanwijsbaar int;
