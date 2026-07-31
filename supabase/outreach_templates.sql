-- outreach_templates: bewerkbare mailteksten per doelgroep en mailtype,
-- zodat de outreach-sjablonen in de admin aangepast kunnen worden zonder
-- code te wijzigen. Draai dit eenmalig in de Supabase SQL-editor.
--
-- Ontwerp: lib/outreach/mails.ts blijft de bron van de waarheid als er geen
-- rij bestaat (DEFAULT_TEMPLATES, dezelfde tekst als hieronder geseed). Een
-- ontbrekende of kapotte rij laat het versturen dus nooit vastlopen, zelfde
-- patroon als de schema-drift fallback in app/api/intake/route.ts.
--
-- Dynamische stukken (groet, ps-zin, regio-zin) blijven runtime-logica en
-- staan als token in alineas: {{GROET}}, {{PS}}, {{REGIO}}. regio_zin is
-- een apart veld met een {{plaats}}-token, alleen relevant bij type='eerste'.
-- subject/subject_naamloos gebruiken {{voornaam}}, alleen relevant bij
-- type='eerste' (follow-ups hergebruiken altijd "Re: " + de eerste subject).

create table if not exists outreach_templates (
  id                uuid        default gen_random_uuid() primary key,
  doelgroep         text        not null
    check (doelgroep in ('relatietherapeuten', 'budgetcoaches', 'financieel-planners', 'burnout-coaches', 'boekhouders')),
  type              text        not null check (type in ('eerste', 'fu1', 'fu2')),
  subject           text,
  subject_naamloos  text,
  regio_zin         text,
  alineas           jsonb       not null,
  updated_at        timestamptz not null default now(),
  unique (doelgroep, type)
);

alter table outreach_templates enable row level security;

create policy "Authenticated admin access"
  on outreach_templates for all
  to authenticated
  using (true)
  with check (true);

-- Seed met de huidige teksten (18/19-jul v5-copy + 30-jul boekhoudersmail),
-- zodat de admin-editor meteen de actieve teksten toont. Zie
-- lib/outreach/mails.ts DEFAULT_TEMPLATES voor dezelfde inhoud in code.

insert into outreach_templates (doelgroep, type, subject, subject_naamloos, regio_zin, alineas) values
('relatietherapeuten', 'eerste',
  '{{voornaam}}, mag ik stellen naar jouw praktijk verwijzen?',
  'Mag ik stellen naar jouw praktijk verwijzen?',
  'Ik zoek bewust iemand in de regio {{plaats}}: een stel stuur ik liever naar iemand in de buurt dan naar een landelijke lijst.',
  '["{{GROET}}", "Soms zit er een stel tegenover me waar het gesprek na een half uur niet meer over cijfers gaat, maar over wie bepaalt, wie zwijgt, wat geld vroeger thuis betekende. Dat is jouw vak, niet het mijne, en ik ga niet doen alsof.", "{{PS}}", "Wie ik ben: financieel coach, begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Jij zou een van de eerste relatietherapeuten zijn met wie ik zoiets afspreek; het gaat om enkele stellen per jaar, geen stroom.", "{{REGIO}}", "Ik verwijs niet blind, dus ik wil weten naar wie. Stel me daarom gerust per mail de vragen die je zou stellen aan iedereen die naar je verwijst; jij bepaalt het tempo.", "PS: liever niet? Eén woordje is genoeg, dan mail ik je niet meer."]'::jsonb
),
('relatietherapeuten', 'fu1', null, null, null,
  '["{{GROET}}", "Ik hoorde nog niet van je; dit is geen herinnering, eerder iets wat je misschien kunt gebruiken in een sessie. De drie patronen die ik het vaakst zie bij stellen die goed verdienen en toch elke maand spanning over geld hebben:", "1. Niemand heeft het overzicht. Allebei denken ze stiekem dat de ander te veel uitgeeft, en allebei kunnen ze het niet hardmaken.\n2. De vaste lasten zijn stilletjes meegegroeid met het inkomen. \"We verdienen toch goed\" klopt gevoelsmatig, maar feitelijk al jaren niet meer.\n3. Er is geen afgesproken vrij bedrag per persoon. Daardoor is elke losse uitgave een potentieel verwijt.", "Loop jij in een casus ooit vast op het feitelijke geldoverzicht, leg hem me dan gerust per mail voor. Kosteloos, en er staat niets tegenover.", "Wat doe jij eigenlijk nu als een stel op het geld blijft vastlopen?"]'::jsonb
),
('relatietherapeuten', 'fu2', null, null, null,
  '["{{GROET}}", "Laatste mail van mijn kant, daarna laat ik je met rust.", "Van de drie patronen uit mijn vorige mail heb ik een A4 gemaakt dat je aan een stel kunt meegeven, desgewenst zonder mijn naam erop. Wil je het hebben? Eén woordje is genoeg, dan stuur ik het je.", "En mijn vraag blijft staan: mag ik jouw praktijk noemen als er bij mij een stel zit waar geld eigenlijk relatiepijn is? Vragen stellen per mail mag altijd eerst.", "Dank voor je tijd, en veel succes met je praktijk."]'::jsonb
),

('budgetcoaches', 'eerste',
  '{{voornaam}}, ik zoek een budgetcoach om naar door te verwijzen',
  'Ik zoek een budgetcoach om naar door te verwijzen',
  'Ik zoek bewust iemand in de regio {{plaats}}; een warme overdracht werkt het best dichtbij.',
  '["{{GROET}}", "{{PS}}", "Ik ben financieel coach voor huishoudens die goed verdienen en toch elke maand krap zitten; zij melden zich bij mij via mijn site. Zodra er achterstanden, incasso''s of regelingen spelen, houdt mijn werk op. Ik wil die mensen dan niet wegsturen met \"zoek maar een budgetcoach\", maar warm overdragen aan een naam die ik ken, met de context die ik al heb, zodat jij niet vanaf nul begint.", "Wie ik ben: dit werk begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Er zit geen vergoeding, tegenprestatie of leadconstructie aan; mijn tarieven en werkwijze staan open op mijn site.", "{{REGIO}}", "Ik heb je toestemming niet nodig om je naam te noemen, maar wel je voorkeur: zit je op zulke overdrachten te wachten? Eén woordje is genoeg. Het gaat om een paar mensen per jaar, geen stroom.", "PS: liever niet? Eén woordje is genoeg, dan mail ik je niet meer."]'::jsonb
),
('budgetcoaches', 'fu1', null, null, null,
  '["{{GROET}}", "Ik hoorde nog niet van je, geen probleem. Voor het beeld, wat \"warm overdragen\" bij mij betekent: ik mail je vooraf, je krijgt de situatie zoals ik hem ken (inkomen, wat er speelt, wat er al aan cijfers ligt) en de klant weet dat jij het overneemt en waarom. Geen doorgeefluik, geen leadformulier.", "Eén vraag: wat wil jij vooraf weten bij zo''n overdracht? Dan richt ik het meteen goed in."]'::jsonb
),
('budgetcoaches', 'fu2', null, null, null,
  '["{{GROET}}", "Laatste mail van mijn kant, daarna laat ik je met rust.", "Het aanbod blijft staan, ook zonder antwoord: zodra ik iemand tegenkom met achterstanden of schulden, noem ik liever een naam dan \"zoek maar een budgetcoach\". Wil jij die naam zijn: één woordje is genoeg.", "En de andere kant op, open kaart: op waarblijfthet.nl staat een gratis anonieme analyse. Zo kom ik aan mijn klanten, dus ja, daar heb ik wat aan als jij hem ooit noemt. Alleen als het jou een keer uitkomt; jij bepaalt wat bij je past.", "Dank voor je tijd, en veel succes met je praktijk."]'::jsonb
),

('financieel-planners', 'eerste',
  '{{voornaam}}, ik zoek een financieel planner om naar door te verwijzen',
  'Ik zoek een financieel planner om naar door te verwijzen',
  'Ik zoek bewust iemand in de regio {{plaats}}; doorverwijzen werkt het best dichtbij.',
  '["{{GROET}}", "{{PS}}", "Ik ben financieel coach voor huishoudens die goed verdienen en toch elke maand krap zitten; zij melden zich bij mij via mijn site. Zodra iemand na het inzicht structureel ruimte overhoudt en verder wil met vermogen, pensioen of een hypotheekvraag, houdt mijn werk op: ik geef nadrukkelijk geen product- of beleggingsadvies en heb de papieren daarvoor ook niet.", "Ik wil die mensen dan een naam kunnen geven die ik ken, geen adres van internet. Wie ik ben: begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Er zit geen vergoeding of tegenprestatie aan; mijn tarieven en werkwijze staan open op mijn site.", "{{REGIO}}", "Ik heb je toestemming niet nodig om je naam te noemen, maar wel je voorkeur: zit je op zulke doorverwijzingen te wachten? Eén woordje is genoeg. Het gaat om enkele mensen per jaar, geen stroom.", "PS: liever niet? Eén woordje is genoeg, dan mail ik je niet meer."]'::jsonb
),
('financieel-planners', 'fu1', null, null, null,
  '["{{GROET}}", "Ik hoorde nog niet van je, geen probleem. Voor het beeld, wat \"warm overdragen\" bij mij betekent: ik meld het vooraf, je krijgt de situatie zoals ik hem ken (inkomen, vaste lasten, wat er maandelijks overblijft en waar dat inzicht op gebaseerd is) en de klant weet dat jij het overneemt en waarom. Geen doorgeefluik, geen leadformulier.", "Eén vraag: wat wil jij vooraf weten bij zo''n overdracht? Dan richt ik het meteen goed in."]'::jsonb
),
('financieel-planners', 'fu2', null, null, null,
  '["{{GROET}}", "Laatste mail van mijn kant, daarna laat ik je met rust.", "Het aanbod blijft staan, ook zonder antwoord: zodra iemand bij mij structureel ruimte overhoudt en verder wil met vermogen of pensioen, noem ik liever een naam dan \"zoek maar een planner\". Wil jij die naam zijn: één woordje is genoeg.", "En de andere kant op, open kaart: op waarblijfthet.nl staat een gratis anonieme analyse. Zo kom ik aan mijn klanten, dus ja, daar heb ik wat aan als jij hem ooit noemt bij iemand met te weinig maandruimte voor je advies. Alleen als het jou uitkomt; jij bepaalt wat bij je past.", "Dank voor je tijd, en veel succes met je praktijk."]'::jsonb
),

('burnout-coaches', 'eerste',
  '{{voornaam}}, mag ik cliënten naar jouw praktijk verwijzen?',
  'Mag ik cliënten naar jouw praktijk verwijzen?',
  'Ik zoek bewust iemand in de regio {{plaats}}: een cliënt stuur ik liever naar iemand in de buurt dan naar een landelijke lijst.',
  '["{{GROET}}", "Soms zit er iemand tegenover me bij wie het geld wel op orde komt, maar de vermoeidheid dieper blijkt te zitten dan de cijfers. Dat is jouw vak, niet het mijne, en ik ga niet doen alsof.", "{{PS}}", "Wie ik ben: financieel coach, begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Jij zou een van de eerste burn-out-coaches zijn met wie ik zoiets afspreek; het gaat om enkele mensen per jaar, geen stroom.", "{{REGIO}}", "Ik verwijs niet blind, dus ik wil weten naar wie. Stel me daarom gerust per mail de vragen die je zou stellen aan iedereen die naar je verwijst; jij bepaalt het tempo.", "PS: liever niet? Eén woordje is genoeg, dan mail ik je niet meer."]'::jsonb
),
('burnout-coaches', 'fu1', null, null, null,
  '["{{GROET}}", "Ik hoorde nog niet van je; dit is geen herinnering, eerder iets wat je misschien kunt gebruiken in een traject. De drie patronen die ik het vaakst zie als geldstress het herstel in de weg zit:", "1. De buffer is tijdens de uitval stilletjes geslonken en niemand heeft durven kijken hoe erg precies. Het niet-weten stresst meer dan het getal.\n2. Bij re-integratie of minder uren verandert het inkomen, maar de uitgaven staan nog op het oude leven.\n3. De bank-app wordt vermeden. Wat je niet ziet, blijft als diffuse dreiging op de achtergrond meedraaien.", "Loop jij in een traject ooit vast op het feitelijke geldoverzicht, leg hem me dan gerust per mail voor. Kosteloos, en er staat niets tegenover.", "Wat doe jij eigenlijk nu als geldstress het herstel van een cliënt blokkeert?"]'::jsonb
),
('burnout-coaches', 'fu2', null, null, null,
  '["{{GROET}}", "Laatste mail van mijn kant, daarna laat ik je met rust.", "Van de drie patronen uit mijn vorige mail heb ik een A4 gemaakt dat je aan een cliënt kunt meegeven, desgewenst zonder mijn naam erop. Wil je het hebben? Eén woordje is genoeg, dan stuur ik het je.", "En mijn vraag blijft staan: mag ik jouw praktijk noemen als ik merk dat de vermoeidheid dieper zit dan het geld? Vragen stellen per mail mag altijd eerst.", "Dank voor je tijd, en veel succes met je praktijk."]'::jsonb
),

('boekhouders', 'eerste',
  '{{voornaam}}, mag ik mensen naar je doorverwijzen?',
  'Mag ik mensen naar je doorverwijzen?',
  'Ik zoek bewust iemand in de regio {{plaats}}: iemand doorsturen werkt het best als het dichtbij is.',
  '["{{GROET}}", "Een klant komt voor zijn aangifte of jaarrekening en vraagt tussendoor: we verdienen eigenlijk goed, waarom houden we dan elke maand zo weinig over? Dat is geen fiscale vraag en geen boekhoudvraag, en midden in zo''n gesprek is er ook geen goed moment om er iets mee te doen.", "{{PS}}", "Dat stuk is precies mijn werk. Ik help mensen die genoeg verdienen maar geen beeld hebben van waar hun geld blijft en hoeveel ruimte er werkelijk is. Geen administratie, geen belastingadvies, geen beleggingen, geen hypotheken. Ik kijk naar het huishouden als geheel en zet op papier waar het geld naartoe gaat en wat er anders kan. We zitten elkaar dus niet in de weg.", "{{REGIO}}", "Wat ik zoek is een boekhouder naar wie ik iemand kan doorsturen als zijn vraag toch fiscaal of administratief blijkt. Ik stuur niemand naar iemand die ik niet ken, dus ik zou eerst willen weten hoe je werkt. Andersom hoeft voorlopig niets.", "Krijg je die vraag weleens langs?", "PS: liever niet? Eén woordje is genoeg, dan mail ik je niet meer."]'::jsonb
),
('boekhouders', 'fu1', null, null, null,
  '["{{GROET}}", "Ik hoorde nog niet van je; dit is geen herinnering, eerder iets wat je misschien herkent. De vraag die het vaakst achter \"kunnen we dit betalen\" schuilgaat bij goedverdieners: er is geen overzicht, de vaste lasten zijn stilletjes meegegroeid met het inkomen, en niemand heeft dat ooit hardgemaakt met cijfers.", "Krijg jij dat weleens: een klant die eigenlijk een geldgesprek wil in plaats van een aangifte?"]'::jsonb
),
('boekhouders', 'fu2', null, null, null,
  '["{{GROET}}", "Laatste mail van mijn kant, daarna laat ik je met rust.", "Laatste keer dat ik het aanbod noem: als een klant bij jou met zo''n bredere geldvraag komt, mag je gerust mijn naam noemen, of me mailen en ik neem het over. Geen tegenprestatie, geen leadconstructie.", "En open kaart over mijn eigen belang: ik zoek zelf ook iemand naar wie ik kan doorsturen als een vraag toch over de aangifte of de administratie gaat. Dat hoeft nu niet, en als het nooit iets wordt is dat ook goed.", "Dank voor je tijd, en veel succes met je praktijk."]'::jsonb
)
on conflict (doelgroep, type) do nothing;
