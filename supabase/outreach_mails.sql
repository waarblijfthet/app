-- outreach_mails: een rij per verstuurde mail (mail 1, 2 of 3), i.p.v. het
-- ene resend_id-veld op outreach_contacts dat bij elke verzending wordt
-- overschreven. Zie docs/admin-redesign-30-jul-2026.md sectie 4.
-- Draai dit eenmalig in de Supabase SQL-editor, voor contact_notities.sql.

create table if not exists outreach_mails (
  id            uuid        default gen_random_uuid() primary key,
  contact_id    uuid        not null references outreach_contacts(id) on delete cascade,
  nummer        int         not null,          -- 1, 2 of 3
  verstuurd_at  timestamptz not null default now(),
  resend_id     text,
  geopend_at    timestamptz,
  geklikt_at    timestamptz,
  bounced_at    timestamptz,
  unique (contact_id, nummer)
);

create index if not exists outreach_mails_resend_id_idx on outreach_mails (resend_id);
create index if not exists outreach_mails_contact_id_idx on outreach_mails (contact_id);

alter table outreach_mails enable row level security;

create policy "Authenticated admin access"
  on outreach_mails for all
  to authenticated
  using (true)
  with check (true);

-- ── Eenmalige backfill vanuit de bestaande velden op outreach_contacts ──────
--
-- Belangrijke beperking, niet te repareren met deze backfill: resend_id (en
-- dus geopend_at/geklikt_at/bounced_at) op outreach_contacts wordt bij elke
-- verzending overschreven met de nieuwste mail. Voor een contact dat al een
-- follow-up heeft gehad, is het open/klik-moment van de eerdere mail dus al
-- kwijt voordat deze backfill draait. Deze backfill zet daarom het
-- open/klik/bounce-moment alleen op de rij van de MEEST RECENT verstuurde
-- mail (die het huidige resend_id nog draagt), en laat dat bij oudere mails
-- van hetzelfde contact leeg. Voor mail 2 van een contact met followups = 2
-- is bovendien de exacte verstuurdatum niet meer te achterhalen (alleen de
-- datum van de laatste follow-up is bewaard); die rij krijgt daarom een
-- afgeleide datum (verstuurd_at + 3 dagen, de vaste wachttijd uit
-- lib/outreach/mails.ts) in plaats van een verzonnen exacte datum.

-- Mail 1: altijd een rij als er ooit verstuurd is.
insert into outreach_mails (contact_id, nummer, verstuurd_at, resend_id, geopend_at, geklikt_at, bounced_at)
select
  id,
  1,
  verstuurd_at,
  case when followups = 0 then resend_id else null end,
  case when followups = 0 then geopend_at else null end,
  case when followups = 0 then geklikt_at else null end,
  case when followups = 0 then bounced_at else null end
from outreach_contacts
where verstuurd_at is not null
on conflict (contact_id, nummer) do nothing;

-- Mail 2: alleen als er minstens 1 follow-up is geweest.
insert into outreach_mails (contact_id, nummer, verstuurd_at, resend_id, geopend_at, geklikt_at, bounced_at)
select
  id,
  2,
  case when followups = 1 then laatste_followup_at else verstuurd_at + interval '3 days' end,
  case when followups = 1 then resend_id else null end,
  case when followups = 1 then geopend_at else null end,
  case when followups = 1 then geklikt_at else null end,
  case when followups = 1 then bounced_at else null end
from outreach_contacts
where followups >= 1 and verstuurd_at is not null
on conflict (contact_id, nummer) do nothing;

-- Mail 3: alleen als beide follow-ups al verstuurd zijn. laatste_followup_at
-- hoort dan bij mail 3, dus die datum is wel accuraat.
insert into outreach_mails (contact_id, nummer, verstuurd_at, resend_id, geopend_at, geklikt_at, bounced_at)
select
  id,
  3,
  laatste_followup_at,
  resend_id,
  geopend_at,
  geklikt_at,
  bounced_at
from outreach_contacts
where followups >= 2 and laatste_followup_at is not null
on conflict (contact_id, nummer) do nothing;
