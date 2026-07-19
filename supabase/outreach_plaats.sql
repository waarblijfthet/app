-- Plaats/regio voor outreach-contacten en prospects
-- Draai dit eenmalig in de Supabase SQL-editor

alter table outreach_contacts add column if not exists plaats text;
alter table prospects add column if not exists plaats text;
