-- contacten: de CRM, een rij per persoon (verwijzer, klant of lead).
-- Zie docs/admin-redesign-30-jul-2026.md sectie 4 en 7 (fase 3).
-- Draai dit eenmalig in de Supabase SQL-editor, na contact_notities.sql.
--
-- Fasen per soort staan in code (lib/contacten/labels.ts), niet als
-- database-check: die lijsten kunnen nog schuiven.

create table contacten (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  email text not null unique,
  telefoon text,
  praktijk text,
  website text,
  plaats text,

  soort text not null default 'lead',
    -- verwijzer, klant, lead, overig
  fase text not null default 'nieuw',
    -- betekenis hangt af van soort, zie hieronder
  bron text,
    -- outreach, analyse, intake, netwerk, handmatig
  doelgroep text,
    -- alleen bij soort = verwijzer, zelfde waardenlijst als outreach_contacts

  outreach_contact_id uuid references outreach_contacts(id) on delete set null,
  lead_id uuid,
  analyse_token text,
  intake_id uuid,

  laatste_contact_at timestamptz,
  volgende_actie text,
  volgende_actie_op date,

  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on contacten (soort, fase);
create index on contacten (volgende_actie_op) where archived_at is null;
alter table contacten enable row level security;

create policy "Authenticated admin access"
  on contacten for all
  to authenticated
  using (true)
  with check (true);

-- contact_notities.contact_id verwees tot nu toe naar niets (fase 2a, zie
-- de toelichting in contact_notities.sql). Die koppeling maken we nu af.
alter table contact_notities
  add constraint contact_notities_contact_id_fkey
  foreign key (contact_id) references contacten(id) on delete cascade;
