-- situatie_details en inkomen_wisselt op intake_aanvragen.
--
-- Reden (30-jul-2026, route 2 uit de feedbackronde): de vergelijking in
-- lib/benchmarks.ts kijkt naar vijf dingen (inkomen, huur of koop, aantal
-- volwassenen, aantal kinderen, autosituatie) en weet niets over de leeftijd
-- van de kinderen, alimentatie, co-ouderschap, regio of belastingreservering.
-- Vijf testers noemden dat als het laatste bezwaar voor 49 euro. In plaats van
-- de benchmark fijnmaziger te maken met cijfers die er niet zijn, vraagt de
-- intake er nu naar en gebruikt het rapport die tekst. Zonder deze kolommen
-- gaat de aanmelding niet stuk (de route heeft een schema-drift fallback,
-- zie technische les 6), maar dan komt de tekst niet in de database.
--
-- Draai dit eenmalig in de Supabase SQL-editor.

alter table intake_aanvragen add column if not exists situatie_details text;
alter table intake_aanvragen add column if not exists inkomen_wisselt boolean;
