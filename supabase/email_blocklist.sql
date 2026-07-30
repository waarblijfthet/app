-- E-mail-blocklist: adressen die nooit meer benaderd mogen worden
-- Draai dit eenmalig in de Supabase SQL-editor
-- Hoort bij docs/admin-redesign-30-jul-2026.md sectie 4 en 5d

create table if not exists email_blocklist (
  email text primary key,
  reden text not null,   -- afgemeld, bounced, verzoek, handmatig
  toegevoegd_at timestamptz not null default now(),
  notitie text
);

alter table email_blocklist enable row level security;

create policy "Authenticated admin access"
  on email_blocklist for all
  to authenticated
  using (true)
  with check (true);
