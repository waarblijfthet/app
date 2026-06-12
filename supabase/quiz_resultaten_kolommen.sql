-- Vult quiz_resultaten aan met alle kolommen die /api/quiz-lead opslaat.
-- Idempotent: bestaande kolommen worden overgeslagen. Eenmalig draaien
-- in de Supabase SQL-editor. Vervangt quiz_resultaten_volwassenen.sql.

-- Basiskolommen (de productietabel bleek ook token te missen)
create table if not exists quiz_resultaten (id uuid primary key default gen_random_uuid());
alter table quiz_resultaten add column if not exists lead_id uuid references leads(id);
alter table quiz_resultaten add column if not exists token text;
alter table quiz_resultaten add column if not exists email text;
alter table quiz_resultaten add column if not exists created_at timestamptz default now();

-- Profiel
alter table quiz_resultaten add column if not exists woonsituatie text;
alter table quiz_resultaten add column if not exists aantal_volwassenen int;
alter table quiz_resultaten add column if not exists aantal_kinderen int;
alter table quiz_resultaten add column if not exists auto_situatie text;

-- Ingevulde bedragen
alter table quiz_resultaten add column if not exists salaris_1 int;
alter table quiz_resultaten add column if not exists salaris_2 int;
alter table quiz_resultaten add column if not exists wonen_huur_hypotheek int;
alter table quiz_resultaten add column if not exists wonen_energie int;
alter table quiz_resultaten add column if not exists wonen_internet_tv int;
alter table quiz_resultaten add column if not exists boodschappen int;
alter table quiz_resultaten add column if not exists verzekering_zorg_per_persoon int;
alter table quiz_resultaten add column if not exists verzekering_overig int;

-- Berekende totalen
alter table quiz_resultaten add column if not exists wonen_totaal int;
alter table quiz_resultaten add column if not exists vervoer_totaal int;
alter table quiz_resultaten add column if not exists verzekering_totaal int;
alter table quiz_resultaten add column if not exists abonnementen_totaal int;
alter table quiz_resultaten add column if not exists kinderen_totaal int;
alter table quiz_resultaten add column if not exists totaal_inkomen_berekend int;
alter table quiz_resultaten add column if not exists totaal_uitgaven_berekend int;
alter table quiz_resultaten add column if not exists maandelijks_over_berekend int;
alter table quiz_resultaten add column if not exists benchmark_over_verwacht int;
alter table quiz_resultaten add column if not exists verschil_met_benchmark int;
alter table quiz_resultaten add column if not exists grootste_afwijking text;
alter table quiz_resultaten add column if not exists verdict text;

create unique index if not exists quiz_resultaten_token_idx on quiz_resultaten (token);
