-- Follow-ups, gereageerd-status en persoonlijke zin voor de outreach mini-CRM
-- Draai dit eenmalig in de Supabase SQL-editor (na outreach_contacts.sql)

alter table outreach_contacts add column if not exists followups int not null default 0;
alter table outreach_contacts add column if not exists laatste_followup_at timestamptz;
alter table outreach_contacts add column if not exists gereageerd_at timestamptz;
alter table outreach_contacts add column if not exists ps_zin text;

-- Status 'gereageerd' toestaan (reply handmatig markeren in de admin)
alter table outreach_contacts drop constraint if exists outreach_contacts_status_check;
alter table outreach_contacts add constraint outreach_contacts_status_check
  check (status in ('nieuw','verstuurd','geopend','geklikt','bounced','gereageerd'));
