-- Prospect-zoeker: onbekende doelgroep toestaan (geen gok meer, zie
-- lib/prospects/classify.ts). Draai dit eenmalig in de Supabase SQL-editor,
-- na prospect_zoeker.sql en outreach_plaats.sql.

alter table prospects alter column doelgroep drop not null;
alter table prospects alter column doelgroep drop default;
