-- contact_notities: tijdlijn van notities per contact (systeem + handmatig).
-- Zie docs/admin-redesign-30-jul-2026.md sectie 4.
-- Draai dit eenmalig in de Supabase SQL-editor, na outreach_mails.sql.
--
-- In het uiteindelijke ontwerp verwijst contact_id naar de nog te bouwen
-- tabel contacten(id) (fase 3). Die tabel bestaat nu nog niet, dus de
-- foreign key wordt hier bewust nog niet aangemaakt: contact_id is een losse
-- kolom zonder constraint, zodat fase 3 alleen de constraint hoeft toe te
-- voegen zonder deze tabel opnieuw te hoeven maken.
--
-- Voor outreach (deze fase, 2a) gebruiken we in plaats daarvan
-- outreach_contact_id, met een echte foreign key naar outreach_contacts.
-- Precies een van de twee id-kolommen hoort gevuld te zijn per rij.

create table if not exists contact_notities (
  id                  uuid        default gen_random_uuid() primary key,
  contact_id          uuid,       -- toekomstige koppeling naar contacten(id), fase 3
  outreach_contact_id uuid        references outreach_contacts(id) on delete cascade,
  tekst               text        not null,
  soort               text        not null default 'notitie'
    check (soort in ('notitie', 'gesprek', 'mail', 'systeem')),
  created_at          timestamptz not null default now(),
  check (contact_id is not null or outreach_contact_id is not null)
);

create index if not exists contact_notities_contact_id_idx on contact_notities (contact_id, created_at desc);
create index if not exists contact_notities_outreach_contact_id_idx on contact_notities (outreach_contact_id, created_at desc);

alter table contact_notities enable row level security;

create policy "Authenticated admin access"
  on contact_notities for all
  to authenticated
  using (true)
  with check (true);
