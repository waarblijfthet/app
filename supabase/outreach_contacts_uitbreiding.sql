-- Kolomtoevoegingen outreach_contacts: archiveren, gestopt-reden, prospect-velden
-- Draai dit eenmalig in de Supabase SQL-editor, na outreach_crm.sql
-- Hoort bij docs/admin-redesign-30-jul-2026.md sectie 4 en 5d

-- Zacht verwijderen (sectie 4, kolomtoevoegingen)
alter table outreach_contacts add column if not exists archived_at timestamptz;

-- Reden bij handmatig stopzetten, los van de reactie-classificatie
alter table outreach_contacts add column if not exists gestopt_reden text;

-- Prospect-velden die nu verloren gaan bij goedkeuren vanuit de prospect-zoeker
-- (zelfde kolommen als op prospects, zie supabase/prospect_zoeker.sql)
alter table outreach_contacts add column if not exists praktijk text;
alter table outreach_contacts add column if not exists website text;
alter table outreach_contacts add column if not exists bron_url text;
alter table outreach_contacts add column if not exists context text;
alter table outreach_contacts add column if not exists doelgroep_score int not null default 0;
