-- Koppelt een intake-aanvraag (geldscan/gesprek/traject) aan de gratis
-- analyse van dezelfde bezoeker, zodat een geldscan-rapport op echte cijfers
-- gebaseerd kan worden i.p.v. alleen de korte aanmeldvragen.
-- Idempotent. Eenmalig draaien in de Supabase SQL-editor.

alter table intake_aanvragen add column if not exists analyse_token text;

-- Snelle lookup vanuit de admin (koppeling naar /resultaat/[token]).
create index if not exists intake_aanvragen_analyse_token_idx
  on intake_aanvragen (analyse_token)
  where analyse_token is not null;
