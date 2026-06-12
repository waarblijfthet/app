-- Voegt aantal volwassenen toe aan quiz_resultaten zodat de gedeelde
-- resultaatpagina dezelfde benchmark gebruikt als de analyse zelf.
-- Eenmalig draaien in de Supabase SQL-editor.
alter table quiz_resultaten add column if not exists aantal_volwassenen int;
