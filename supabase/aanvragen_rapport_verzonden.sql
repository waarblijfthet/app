-- rapport_verzonden_at: tijdstip waarop een geldscan-rapport is afgeleverd.
-- Zie docs/admin-redesign-30-jul-2026.md sectie 6 ("scans geleverd deze
-- week" in blok 3 van Vandaag was niet meetbaar zonder deze kolom).
-- Draai dit eenmalig in de Supabase SQL-editor.
--
-- Wordt gezet door app/api/admin/aanvragen/route.ts: zodra de status van een
-- aanvraag met pakket = 'geldscan' naar 'gestart' gaat (in dit project
-- betekent 'gestart' bij een geldscan "afgehandeld/rapport verstuurd", er is
-- geen apart traject om te starten). Alleen de eerste keer, niet bij een
-- eventuele latere statuswijziging terug en weer naar 'gestart'.

alter table intake_aanvragen add column if not exists rapport_verzonden_at timestamptz;
