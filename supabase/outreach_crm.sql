-- CRM-uitbreiding outreach_contacts: reactie-classificatie en handmatige stop
-- Draai dit eenmalig in de Supabase SQL-editor (na outreach_followup.sql en outreach_plaats.sql)

-- Reactie-classificatie: los van 'status', want 'gereageerd' zegt niets over de inhoud.
alter table outreach_contacts add column if not exists reactie text
  check (reactie in ('positief', 'neutraal', 'negatief'));

-- Handmatige stop: onafhankelijk van 'gereageerd', voor als Jarno om welke reden
-- dan ook de automatische follow-ups voor iemand wil pauzeren.
alter table outreach_contacts add column if not exists gestopt boolean not null default false;
alter table outreach_contacts add column if not exists gestopt_at timestamptz;
