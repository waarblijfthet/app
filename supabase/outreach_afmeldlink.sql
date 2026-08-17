-- Afmeldlink onder elke outreach-mail (16-aug-2026), optionele migratie
--
-- LET OP: dit bestand is NIET nodig om de afmeldlink te laten werken. De link
-- gebruikt outreach_contacts.id, een kolom die altijd bestaat, juist om te
-- voorkomen dat een niet-gedraaide migratie de link stilletjes laat terugvallen
-- op /afmelden/onbekend. Zie lib/outreach/afmelden.ts.
--
-- Wat het wel doet: de afmeldregel in de opgeslagen handtekening zetten, zodat
-- de regel zichtbaar en bewerkbaar wordt in /admin/mailsjablonen. Zonder deze
-- update zet de code de regel automatisch onder elke mail (splitsAfmeldregel),
-- alleen staat hij dan niet in het handtekeningveld en kun je de bewoording
-- niet aanpassen. Datzelfde kun je ook doen zonder SQL: klik op
-- /admin/mailsjablonen op "Zelf formuleren: zet de regel in de handtekening"
-- en sla op.
--
-- Een eerdere versie van dit bestand voegde een kolom afmeld_token en
-- afgemeld_at toe. Die zijn vervallen. Staan ze al in de database omdat je die
-- versie hebt gedraaid, dan is dat verder onschuldig; opruimen mag met:
--   alter table outreach_contacts drop column if exists afmeld_token;
--   alter table outreach_contacts drop column if exists afgemeld_at;

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
