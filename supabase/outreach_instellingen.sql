-- outreach_instellingen: kleine sleutel/waarde-tabel voor outreach-brede
-- instellingen die niet aan een specifiek doelgroep/mailtype hangen. Nu
-- alleen de handtekening (1-aug-2026), maar generiek genoeg voor eventuele
-- volgende losse instellingen zonder opnieuw een tabel te hoeven maken.
-- Draai dit eenmalig in de Supabase SQL-editor.
--
-- waarde is jsonb zodat de handtekening als { "tekst": "..." } kan groeien
-- (bijvoorbeeld een aparte functietitel-regel) zonder kolommen toe te
-- voegen. tekst ondersteunt dezelfde [tekst](url)-linksyntax als de
-- mailsjablonen, zie lib/outreach/render.ts.

create table if not exists outreach_instellingen (
  id          uuid        default gen_random_uuid() primary key,
  sleutel     text        not null unique,
  waarde      jsonb       not null,
  updated_at  timestamptz not null default now()
);

alter table outreach_instellingen enable row level security;

create policy "Authenticated admin access"
  on outreach_instellingen for all
  to authenticated
  using (true)
  with check (true);

-- Seed met de huidige handtekening (was de hardcoded HANDTEKENING-constante
-- en de losse sig-paragraaf in lib/outreach/mails.ts). De site-link staat nu
-- als klikbare link genoteerd i.p.v. losse tekst.
insert into outreach_instellingen (sleutel, waarde) values
  ('handtekening', '{"tekst": "Jarno Koopman\nFinancieel coach, Waar blijft het\n[waarblijfthet.nl](https://www.waarblijfthet.nl)"}'::jsonb)
on conflict (sleutel) do nothing;
