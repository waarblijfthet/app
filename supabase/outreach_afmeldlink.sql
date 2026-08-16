-- Afmeldlink onder elke outreach-mail (16-aug-2026)
-- Draai dit eenmalig in de Supabase SQL-editor, na outreach_crm.sql,
-- outreach_contacts_uitbreiding.sql en outreach_instellingen.sql.
--
-- Achtergrond: de mails eindigden met "PS: liever niet? Eén woordje is
-- genoeg" en dat vroeg om handwerk (terugmailen, contact stopzetten, adres op
-- de blocklist). Elk contact krijgt nu een eigen afmeld_token; de link
-- /afmelden/<token> in de mail regelt het stopzetten en blokkeren zelf.
-- Zie lib/outreach/afmelden.ts voor de samenhang.

-- ── 1. Token per contact ─────────────────────────────────────────────────────
-- gen_random_uuid() is volatile, dus bestaande rijen krijgen elk een eigen
-- waarde (geen gedeelde default). Niet te raden, en per contact intrekbaar
-- door het token te vervangen:
--   update outreach_contacts set afmeld_token = gen_random_uuid() where id = '...';
alter table outreach_contacts
  add column if not exists afmeld_token uuid not null default gen_random_uuid();

create unique index if not exists outreach_contacts_afmeld_token_idx
  on outreach_contacts (afmeld_token);

-- Moment van afmelden, los van gestopt_at (dat ook door handmatig stopzetten
-- gezet wordt) zodat "heeft zichzelf afgemeld" apart telbaar blijft.
alter table outreach_contacts
  add column if not exists afgemeld_at timestamptz;

-- ── 2. Afmeldregel in de opgeslagen handtekening ─────────────────────────────
-- De code zet automatisch een afmeldregel onder elke mail als de handtekening
-- geen {{AFMELDLINK}} bevat (zie splitsAfmeldregel in lib/outreach/afmelden.ts),
-- dus dit is geen voorwaarde om te werken. Het maakt de regel wel meteen
-- zichtbaar en bewerkbaar in /admin/mailsjablonen.
update outreach_instellingen
set waarde = jsonb_set(
      waarde,
      '{tekst}',
      to_jsonb((waarde ->> 'tekst') || E'\n\nGeen mail meer van mij? [Meld je hier af]({{AFMELDLINK}}), dan hoor je niets meer.')
    ),
    updated_at = now()
where sleutel = 'handtekening'
  and coalesce(waarde ->> 'tekst', '') <> ''
  and position('{{AFMELDLINK}}' in coalesce(waarde ->> 'tekst', '')) = 0;

-- ── 3. Controle ──────────────────────────────────────────────────────────────
-- select count(*) filter (where afmeld_token is not null) as met_token,
--        count(*) filter (where afgemeld_at is not null)  as afgemeld
-- from outreach_contacts;
