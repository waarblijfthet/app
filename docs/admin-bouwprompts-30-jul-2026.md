# Bouwprompts voor de admin-redesign (30-jul-2026)

Bedoeld om aan Sonnet te geven, één prompt per sessie. Ontwerp staat in `docs/admin-redesign-30-jul-2026.md`; dat document is de specificatie en deze prompts verwijzen ernaar in plaats van het te herhalen.

## Kan Sonnet dit bouwen?

Ja, op één voorwaarde: niet in één sessie. Het werk zelf is niet moeilijk. Het is React, Tailwind, Supabase-queries en route-handlers, allemaal patronen die al tien keer in deze repo staan. Wat het risicovol maakt is de omvang: ongeveer vijf werkdagen, tien bestaande tabs die verhuizen, vier nieuwe tabellen. In één sessie loopt het context-venster vol precies op het moment dat het model de eerdere afspraken moet onthouden, en dan gaat het gokken.

Waar het bij dit specifieke project fout gaat als je niets afdwingt, en dat staat allemaal al in `CLAUDE.md`:

- Bestanden schrijven met de Edit- of Write-tool. Die trunceren stil op dit NTFS-mount. Moet python3 zijn.
- Schrijven naar Supabase via de SSR-cookie-client in plaats van `createServiceClient()`. Levert een RLS-fout op die eruitziet als een permissieprobleem.
- Vergeten `isAdminRequest()` in een nieuwe route.
- Em dashes en koppeltekens als scheidingsteken in de UI-teksten.

Alle vier zijn te ondervangen door in de prompt te eisen dat het model `CLAUDE.md` eerst leest en de werkregels letterlijk terugkoppelt voordat het begint. Doe dat, dan is Sonnet hiervoor ruim voldoende.

Escaleren naar Opus als: een fase twee keer achter elkaar niet door `npx tsc --noEmit --incremental false` komt, of als het model in fase 2 voorstelt om de bestaande outreach-route te herschrijven in plaats van uit te breiden. Dat zijn de twee signalen dat het overzicht kwijt is.

## Instellingen

| Instelling | Advies | Waarom |
|---|---|---|
| Model | Sonnet 5 | Ruim voldoende voor dit werk, en sneller waardoor je meer iteraties per fase haalt |
| Denkniveau | Uitgebreid denken aan bij fase 1, 2 en 5 | Dat zijn de fasen met echte ontwerpkeuzes. Fase 0, 3 en 6 zijn mechanisch, daar is standaard genoeg |
| Plan-modus | Aan, per fase, plan eerst laten zien | Je ziet de bestandslijst voordat er iets verandert. Bij een verkeerde bestandslijst stop je in tien seconden in plaats van na een uur |
| Wijzigingen automatisch accepteren | Uit bij fase 1 en 2, aan bij de rest | De eerste twee fasen bepalen de structuur van al het volgende |
| Sessie per fase | Nieuwe sessie per fase | Voorkomt dat het contextvenster vol loopt. Elke prompt hieronder is los te gebruiken |
| Werkmap | De projectmap zelf | `CLAUDE.md` wordt dan automatisch meegelezen |
| Git | Committen aan het eind van elke fase | Eén commit per fase betekent dat je één fase kunt terugdraaien zonder de rest te verliezen |

Doe fase 0 eerst en alleen. Dat is een uur, het repareert de dingen die nu daadwerkelijk stuk zijn, en het is los te deployen. Beslis daarna pas of je aan de rest begint.

## Prompt voor fase 0: serverfixes

```
Lees eerst CLAUDE.md en daarna docs/admin-redesign-30-jul-2026.md sectie 5d.
Som voordat je begint de vier harde werkregels op die op deze taak van
toepassing zijn, zodat ik kan controleren of je ze hebt gezien.

Voer daarna alleen sectie 5d uit, vijf serverfixes, geen UI-wijzigingen:

1. In app/api/admin/outreach/send/route.ts en
   app/api/admin/outreach/preview/route.ts: filter contacten ook op
   gestopt = false en archived_at is null, niet alleen op status. Dit geldt
   voor zowel het losse als het bulk-pad. Nu kan een stopgezet contact
   alsnog mail krijgen; dat is de bug.
2. Nieuwe tabel email_blocklist volgens het SQL-blok in sectie 4 van het
   ontwerpdocument. Schrijf het bestand naar supabase/email_blocklist.sql.
   Draai het niet zelf; ik draai SQL handmatig in Supabase.
   Controleer de blocklist in drie routes: outreach/send (POST),
   outreach (POST, contact toevoegen) en prospects/review (POST, goedkeuren).
   Een geblokkeerd adres wordt overgeslagen met een leesbare reden in de
   respons, niet met een harde fout.
3. Voeg archived_at en gestopt_reden toe aan outreach_contacts. Ook als
   los SQL-bestand, niet zelf draaien.
4. Breid app/api/admin/prospects/review/route.ts uit zodat bij goedkeuren
   ook praktijk, website, bron_url, context en doelgroep_score meegaan naar
   outreach_contacts. Voeg de ontbrekende kolommen toe aan hetzelfde
   SQL-bestand.
5. Geef GET /api/admin/outreach ondersteuning voor queryparameters
   zoekterm, doelgroep, status, plaats, limiet en offset, met een standaard
   van 50 rijen. Laat het bestaande gedrag zonder parameters intact, want
   de huidige UI leunt erop.

Randvoorwaarden:
- Alle bestandswijzigingen via python3 in bash, nooit de Edit- of
  Write-tool. Dit mount trunceert stil.
- Na elke gewijzigde route: npx tsc --noEmit --incremental false moet
  schoon zijn. Controleer ook op null bytes.
- Raak lib/outreach/mails.ts niet aan. De mailteksten zijn persona-getoetst
  en vallen buiten deze opdracht.
- Verzin geen kolommen die niet in het ontwerpdocument staan.
- Maak geen UI-wijzigingen. Als een fix een UI-aanpassing lijkt te
  vereisen, meld dat en laat het liggen.

Lever aan het eind:
- een lijst van gewijzigde bestanden met regelaantallen
- de SQL die ik moet draaien, in de volgorde waarin ik dat moet doen
- per fix één regel hoe ik hem handmatig kan controleren
- een git commit met een Nederlandse commitboodschap, niet pushen
```

## Prompt voor fase 1: shell, navigatie en primitives

```
Lees eerst CLAUDE.md en daarna docs/admin-redesign-30-jul-2026.md,
in het bijzonder sectie 3. Som de harde werkregels op die hier gelden
voordat je begint.

Fase 0 (de vijf serverfixes uit sectie 5d) is al gebouwd en de bijbehorende
SQL is gedraaid. Bouw daarop voort en wijzig geen enkele API-route in deze
fase.

Bouw de nieuwe admin-shell. Dit is een verbouwing van de omhulling, niet
van de inhoud van de tabs: elke bestaande tab-component blijft
functioneel werken en verhuist alleen.

1. app/admin/layout.tsx met de shell. Zijmenu vanaf 1024px, 240px breed,
   inklapbaar naar 64px met de keuze in localStorage. Drie groepen met
   grijze kopjes volgens sectie 3. Mobiel: bovenbalk van 56px plus een
   onderbalk met vijf items (Vandaag, Outreach, Contacten, Aanvragen,
   Meer), sticky met env(safe-area-inset-bottom).
2. Route-segmenten in plaats van de useState-tabs in AdminClient.tsx.
   Mapping: /admin/vandaag, /admin/outreach, /admin/contacten,
   /admin/prospects, /admin/aanvragen, /admin/analyses, /admin/leads,
   /admin/bezoekers, /admin/zoekwoorden, /admin/indexering, /admin/cijfers.
   /admin redirect naar /admin/vandaag. Filters horen in de querystring.
   In deze fase mogen /admin/vandaag en /admin/contacten lege paginas met
   alleen een kop zijn; die worden in fase 4 en 5 gevuld.
   /admin/cijfers verwijst in deze fase naar het bestaande OverzichtTabblad.
   Let op dat de badge-tellingen die nu in AdminClient.tsx staan (leads,
   quiz, aanvragen) blijven werken in het zijmenu.
3. Belangrijk over app/admin/page.tsx: die verwijder je niet en die sloop
   je niet leeg. Daarin staan de gedeelde interfaces Lead, QuizResultaat en
   IntakeAanvraag die alle tabbladen importeren met "from ../page", en
   daarin staat het ophalen van leads, quiz_resultaten en intake_aanvragen
   via de service client. Verplaats die interfaces naar een eigen bestand
   (bijvoorbeeld app/admin/types.ts) en pas alle imports aan, of laat
   page.tsx staan en maak er een redirect van die de interfaces blijft
   exporteren. Kies wat het minst breekt en zeg in je plan welke van de
   twee je doet en waarom. Het ophalen van die drie datasets moet ergens
   blijven bestaan, want de tabbladen krijgen ze nu als props.
4. Vijf primitives in app/admin/ui/: DataTabel, Badge, Zijpaneel,
   SelectieBalk, LegeStaat. Precies zoals beschreven in sectie 3 onder
   Gedeelde primitives. Gebruik uitsluitend de semantische kleuren uit
   tailwind.config.ts; introduceer geen nieuwe hexwaarden.
5. Zet in deze fase alleen LeadsTabblad en AanvragenTabblad om naar
   DataTabel, als bewijs dat de primitive werkt. LeadsTabblad heeft nu geen
   overflow-x-auto en breekt op smalle schermen; dat moet met de mobiele
   fallback van DataTabel opgelost zijn. De overige tabs verhuizen alleen
   van plek en blijven verder ongewijzigd; die worden in fase 6 omgezet.
6. Twee beveiligingspunten uit sectie 10: voeg aan lib/admin-auth.ts een
   e-mail-allowlist toe via een env-variabele ADMIN_EMAILS
   (kommagescheiden), en gebruik in app/admin overal getUser() in plaats
   van getSession(). Breid de middleware-matcher uit met /api/admin/:path*.
   Als ADMIN_EMAILS leeg is, val terug op het huidige gedrag, zodat de
   admin niet onbruikbaar wordt zolang de variabele nog niet in Vercel staat.

Randvoorwaarden:
- Bestandswijzigingen via python3 in bash, nooit Edit of Write.
- npx tsc --noEmit --incremental false schoon na elke stap, plus controle
  op null bytes.
- Geen em dashes en geen koppeltekens als scheidingsteken in zichtbare
  teksten, labels of menu-items.
- Geen enkele bestaande API-route wijzigen in deze fase.
- Geen nieuwe npm-pakketten. Als je denkt er een nodig te hebben, stop en
  vraag het.
- Laat OutreachTabblad, ProspectsTabblad, FunnelTabblad, BezoekersTabblad,
  IndexingTabblad, ZoekwoordenTabblad, OverzichtTabblad en
  QuizResultatenTabblad inhoudelijk ongemoeid.
- Verwijder geen enkele bestaande functie of tabblad. Als iets in de weg
  lijkt te zitten, meld het en laat het staan.
- Er staat een niet-gecommitte wijziging in app/aanbod/page.tsx die niet
  bij deze opdracht hoort. Laat die staan en neem hem niet mee in je commit.

Laat me eerst je plan zien met de volledige lijst bestanden die je gaat
aanmaken of wijzigen, voordat je iets verandert.

Lever aan het eind:
- lijst gewijzigde en nieuwe bestanden met regelaantallen
- een testlijst: welke elf routes ik moet openen en wat ik moet zien
- expliciet benoemd wat er nu tijdelijk minder mooi is dan voorheen
- git commit, niet pushen
```

## Fase 2 is opgesplitst in 2a en 2b

Drie dagdelen in een sessie is te veel; het contextvenster loopt vol precies wanneer het model de afspraken uit het begin moet onthouden. Daarom twee sessies.

De knip is zo gelegd dat de admin na 2a gewoon werkt. In 2a komen de nieuwe tabel, het detailpaneel en de onderliggende tabellen; de bestaande verzendknoppen en de preview-modal blijven tijdelijk in een werkbalk boven de tabel staan. In 2b worden die vervangen door de werklijst en de selectiebalk. Deploy 2a gerust voordat je aan 2b begint.

## Prompt voor fase 2a: tabel, detailpaneel en mailhistorie

```
Lees eerst CLAUDE.md en daarna docs/admin-redesign-30-jul-2026.md sectie 5
volledig, ook al bouw je nu maar een deel. Fase 0 en fase 1 zijn al gebouwd
en de bijbehorende SQL is gedraaid. Bouw daarop voort, herschrijf niets van
fase 1, en gebruik de primitives uit app/admin/ui/ in plaats van eigen
tabellen, badges of panelen.

Dit is fase 2a van twee. In deze sessie bouw je de tabel, het detailpaneel
en de mailhistorie. De werklijst, de ps-zin-modus en de bulkacties komen in
fase 2b; die bouw je nu niet.

Stap 0, doe dit voordat je een plan maakt: OutreachTabblad.tsx is 829 regels.
Loop het bestand door en maak een lijst van alles wat het nu kan. Deze
functies mogen aan het eind van fase 2a nog steeds werken: contact
toevoegen, naam, e-mail, plaats en ps-zin bewerken, doelgroep wijzigen, per
rij versturen, bulk versturen, per rij follow-up, bulk follow-up, reactie
markeren als positief, neutraal of negatief, stop mails en hervat mails,
verwijderen, filteren op doelgroep, plaats en reactie, sorteren op
nieuwste, plaats en status, en de preview-modal die voor elke verzending
laat zien wie welke mail krijgt met de volledige tekst en een waarschuwing
bij een ontbrekende ps-zin. Meld in je plan of je nog iets anders bent
tegengekomen dat behouden moet blijven.

Bouw daarna:

1. Twee nieuwe tabellen volgens sectie 4, als losse SQL-bestanden in
   supabase/. Draai ze niet zelf; ik draai SQL handmatig.
   - outreach_mails: een rij per verstuurde mail, met nummer, verstuurd_at,
     resend_id, geopend_at, geklikt_at en bounced_at.
   - contact_notities: verwijst in sectie 4 naar contacten(id), maar die
     tabel bestaat pas in fase 3. Maak de foreign key nu nog niet aan; zet
     een losse contact_id-kolom neer en noteer in het SQL-bestand dat de
     constraint in fase 3 volgt. Voor outreach gebruik je in deze fase
     outreach_contact_id.
2. Schrijf bij elke verzending een rij in outreach_mails en een
   systeemnotitie in contact_notities. De bestaande samenvattingsvelden op
   outreach_contacts blijven bestaan en worden gewoon bijgewerkt, zodat de
   cron en de bestaande weergaven blijven werken. Vul outreach_mails
   eenmalig met wat er al bekend is uit de bestaande velden, in hetzelfde
   SQL-bestand, zodat de historie van eerdere verzendingen niet leeg is.
3. De tabel met zeven kolommen uit 5b, op DataTabel uit fase 1. Geen
   bewerkbare invoervelden meer in de cellen. De voortgangskolom toont drie
   bolletjes M1 M2 M3, gevuld is verstuurd, ring is geopend, met een
   tooltip met de datums uit outreach_mails. Zoekveld, doelgroep-chips,
   status- en plaatsfilter, sortering en 50 rijen per pagina, alles via de
   queryparameters die in fase 0 aan GET /api/admin/outreach zijn
   toegevoegd.
4. Detailpaneel volgens 5c, op Zijpaneel uit fase 1. Vier blokken:
   gegevens met een expliciete opslaan- en annuleerknop, mails, reactie,
   notities met een nieuw notitieveld. Bij een mislukte opslag springt het
   veld terug naar de opgeslagen waarde. Dat is nu een bug (de edit-state
   wordt bij een fout niet geleegd, zie sectie 1 van het ontwerpdocument)
   en die mag in deze vorm niet terugkomen.
5. Laat de Resend-webhook openen en klikken ook naar outreach_mails
   schrijven, gematcht op resend_id, en daarna de samenvattingsvelden
   bijwerken.
6. Tijdelijke werkbalk boven de tabel met de bestaande verzendacties uit
   OutreachTabblad: versturen, bulk versturen, follow-ups, en de
   preview-modal ongewijzigd. Deze werkbalk verdwijnt in fase 2b en wordt
   vervangen door de werklijst en de selectiebalk. Zet er een korte
   toelichting bij dat dit tijdelijk is, zodat ik het zelf ook zie.

Randvoorwaarden:
- Bestandswijzigingen via python3, npx tsc --noEmit --incremental false
  schoon, controle op null bytes.
- lib/outreach/mails.ts blijft ongewijzigd. De mailteksten zijn in vier
  persona-rondes getoetst en vallen buiten deze opdracht.
- app/api/admin/outreach/send/route.ts uitbreiden, niet herschrijven. Als
  je denkt dat herschrijven nodig is, stop en leg eerst uit waarom.
- app/api/cron/outreach-followups/route.ts mag je alleen aanpassen om in
  outreach_mails te schrijven. Verander de wachttijdlogica niet, niet de
  volgorde, en niet de kill switch OUTREACH_AUTO_FOLLOWUP.
- Alle nieuwe routes beginnen met isAdminRequest() en schrijven via
  createServiceClient().
- Bouw geen werklijst, geen ps-zin-modus en geen nieuwe bulkacties. Dat is
  fase 2b.
- Geen mailintegratie. Sectie 9 is een latere stap.
- Geen nieuwe npm-pakketten zonder te vragen.
- Geen em dashes, geen koppeltekens als scheidingsteken in zichtbare tekst.
- Er staat een niet-gecommitte wijziging in app/aanbod/page.tsx die niet
  bij deze opdracht hoort. Laat die staan en neem hem niet mee in je commit.

Laat me eerst je plan zien met de bestandslijst en de lijst van bestaande
functies die je in stap 0 hebt teruggevonden.

Lever aan het eind:
- lijst gewijzigde en nieuwe bestanden met regelaantallen
- de SQL in draaivolgorde
- een testlijst met in ieder geval: contact stopzetten en daarna langs alle
  drie de verzendpaden proberen te mailen, bewerken met een dubbel
  e-mailadres, en per behouden functie uit je eigen lijst een regel hoe ik
  hem controleer
- git commit, niet pushen
```

## Prompt voor fase 2b: werklijst, ps-zin-modus en bulkacties

```
Lees eerst CLAUDE.md en daarna docs/admin-redesign-30-jul-2026.md sectie 5,
in het bijzonder 5a. Fase 0, 1 en 2a zijn gebouwd en de SQL is gedraaid.
De tabel, het detailpaneel en de tabellen outreach_mails en
contact_notities bestaan al; die herschrijf je niet.

Dit is fase 2b, het tweede en laatste deel van de outreach-werkplek.

1. Werklijst als standaardweergave van /admin/outreach, met een schakelaar
   naar de bestaande tabelweergave. Vier stapels uit sectie 5a, in die
   volgorde, inklapbaar, met aantallen:
   - Gemarkeerd als gereageerd, nog niet afgehandeld
   - Follow-up rijp
   - Klaar om te versturen
   - Wachten (standaard ingeklapt)
   Belangrijk: de eerste stapel werkt op de handmatig gezette status. Er is
   geen mailintegratie, dus doe niet alsof de admin replies kan zien. De
   naam van de stapel is letterlijk "Gemarkeerd als gereageerd".
2. Weekbudget bovenin de werklijst: verstuurd deze week tegenover het
   maximum, en hoeveel er nog kan. Het maximum komt uit een env-variabele
   OUTREACH_WEEKBUDGET met 10 als standaard. Waarschuw in de preview-modal
   als de selectie het budget overschrijdt, maar blokkeer niet. Ik moet
   altijd kunnen overrulen.
3. Ps-zin-modus als aparte weergave: per contact de opgeslagen context en
   website naast een ruim tekstveld, met een knop naar het volgende contact
   zonder ps-zin. Bedoeld om er tien achter elkaar te doen zonder terug te
   hoeven naar de lijst.
4. Bulkacties op SelectieBalk uit fase 1: mail 1 versturen, follow-up
   versturen, doelgroep wijzigen, plaats wijzigen, stop mails, archiveren,
   verwijderen. Archiveren is de standaardknop, verwijderen zit een niveau
   dieper. Bij meer dan drie verwijderingen moet ik het aantal typen ter
   bevestiging. Verwijderen zet het adres standaard op de email_blocklist
   uit fase 0, met een vinkje om dat niet te doen.
5. Verwijder de tijdelijke werkbalk uit fase 2a. Controleer daarbij expliciet
   dat elke functie die daarin zat nu ergens anders terecht is gekomen, en
   som in je oplevering per functie op waar hij nu zit. Er mag niets
   sneuvelen bij deze opruiming.

Randvoorwaarden:
- Bestandswijzigingen via python3, npx tsc --noEmit --incremental false
  schoon, controle op null bytes.
- lib/outreach/mails.ts blijft ongewijzigd.
- De preview-modal blijft bestaan en blijft verplicht voor elke verzending,
  los of in bulk.
- Raak de cron en de kill switch OUTREACH_AUTO_FOLLOWUP niet aan.
- Alle nieuwe routes beginnen met isAdminRequest() en schrijven via
  createServiceClient().
- Geen mailintegratie. Sectie 9 is een latere stap.
- Geen nieuwe npm-pakketten zonder te vragen.
- Geen em dashes, geen koppeltekens als scheidingsteken in zichtbare tekst.
- Er staat een niet-gecommitte wijziging in app/aanbod/page.tsx die niet
  bij deze opdracht hoort. Laat die staan en neem hem niet mee in je commit.

Laat me eerst je plan zien met de bestandslijst.

Lever aan het eind:
- lijst gewijzigde en nieuwe bestanden met regelaantallen
- per functie uit de tijdelijke werkbalk waar hij nu zit
- een testlijst, met in ieder geval het weekbudget dat waarschuwt maar niet
  blokkeert, en verwijderen dat het adres op de blocklist zet
- git commit, niet pushen
```

## Fase 3 en 4 zijn herverdeeld

Oorspronkelijk was fase 3 het datamodel plus de doorzet-route en fase 4 de UI. Dat is een slechte knip: je kunt een doorzet-route niet controleren zonder een plek waar het contact zichtbaar wordt. Nieuwe verdeling: fase 3 is het datamodel plus de werkende contactenlijst, fase 4 is het doorzetten vanuit de drie bestaande lijsten.

## Prompt voor fase 3: contacten-CRM

```
Lees eerst CLAUDE.md en daarna docs/admin-redesign-30-jul-2026.md sectie 4
en 7. Fase 0, 1, 2a en 2b zijn gebouwd en de bijbehorende SQL is gedraaid.
Gebruik de primitives uit app/admin/ui/ en herschrijf niets van de vorige
fasen.

Dit is fase 3 van twee delen. In deze sessie bouw je het datamodel en een
werkende contactenlijst die ik met de hand kan vullen. Het automatisch
doorzetten vanuit outreach, aanvragen en leads is fase 4; dat bouw je nu
niet.

1. SQL voor de tabel contacten volgens sectie 4, letterlijk die kolommen,
   niets extra. Los bestand in supabase/, niet zelf draaien. De fasen per
   soort (verwijzer, klant, lead) staan in code, niet als database-check,
   want die lijsten gaan nog schuiven.
   Zet in hetzelfde bestand de foreign key van contact_notities.contact_id
   naar contacten(id), die in fase 2a bewust nog niet is aangemaakt.
2. /admin/contacten: lijst op DataTabel, met filterchips Alles,
   Verwijzers, Klanten, Leads en Actie nodig. Die laatste chip toont alles
   waar volgende_actie_op vandaag of eerder is. Kolommen volgens sectie 7.
   Een verlopen volgende actie is rood.
3. Detailpaneel op Zijpaneel: gegevens met expliciete opslaan- en
   annuleerknop, herkomst, volgende actie, notitietijdlijn met een nieuw
   notitieveld. Notities lopen via contact_notities uit fase 2a, nu op
   contact_id in plaats van outreach_contact_id.
   Het blok herkomst toont links naar de gekoppelde outreach-rij, de
   analyse via analyse_token en de intake-aanvraag, voor zover die velden
   gevuld zijn. In deze fase vul ik die zelf; in fase 4 gaat dat
   automatisch.
4. Contact met de hand toevoegen, met alle velden uit de tabel. Dubbel
   e-mailadres geeft een leesbare melding met een link naar de bestaande
   rij, geen databasefout.
5. Eenmalige migratieknop die alle intake_aanvragen met status betaald of
   gestart aanmaakt als contact met soort klant, met intake_id en
   analyse_token mee. Idempotent: twee keer klikken mag geen dubbele rijen
   geven. Zet erbij hoeveel rijen er zijn aangemaakt en hoeveel er
   overgeslagen zijn omdat ze al bestonden.

Randvoorwaarden:
- Bestandswijzigingen via python3, npx tsc --noEmit --incremental false
  schoon, controle op null bytes.
- Alle nieuwe routes beginnen met isAdminRequest() en schrijven via
  createServiceClient().
- Verzin geen extra kolommen. Geen deals, geen taken-module, geen
  pipeline-bord, geen statusvelden die niet in sectie 4 staan. Dit moet
  klein blijven; een kolom die verkeerd blijkt sleep ik jaren mee.
- Wijzig niets in outreach, aanvragen of leads. Dat is fase 4.
- Geen nieuwe npm-pakketten zonder te vragen.
- Geen em dashes, geen koppeltekens als scheidingsteken in zichtbare tekst.
- Er staat een niet-gecommitte wijziging in app/aanbod/page.tsx die niet
  bij deze opdracht hoort. Laat die staan en neem hem niet mee in je commit.

Laat me eerst je plan zien met de bestandslijst.

Lever aan het eind:
- lijst gewijzigde en nieuwe bestanden met regelaantallen
- de SQL in draaivolgorde
- een testlijst met in ieder geval: contact toevoegen met een bestaand
  e-mailadres, de migratieknop twee keer indrukken, en een verlopen
  volgende actie die onder Actie nodig verschijnt
- git commit, niet pushen
```

## Prompt voor fase 4: doorzetten in een klik

```
Lees eerst CLAUDE.md en daarna docs/admin-redesign-30-jul-2026.md sectie 7,
onderdeel "Doorzetten, in een klik". Fase 0 tot en met 3 zijn gebouwd en de
SQL is gedraaid. De tabel contacten en /admin/contacten bestaan al.

Bouw het doorzetten vanuit de drie bestaande lijsten naar contacten.

1. Een serverroute POST /api/admin/contacten/doorzetten met drie ingangen:
   - vanuit outreach: soort verwijzer, fase gereageerd, bron outreach,
     kopieert naam, e-mail, praktijk, website, plaats en doelgroep, zet
     outreach_contact_id en contact_id wederzijds, en zet standaard een
     volgende actie op vier werkdagen vooruit
   - vanuit aanvragen: soort klant, fase afgeleid van de aanvraagstatus,
     intake_id en analyse_token mee
   - vanuit leads: soort lead, lead_id mee
   Alle drie schrijven een systeemnotitie in contact_notities. Bij een
   verwijzer bevat die notitie de mailhistorie uit outreach_mails, zodat ik
   in het contact kan zien wat er eerder is verstuurd en geopend.
2. Bestaat het e-mailadres al in contacten, dan verrijk je de bestaande rij
   in plaats van een nieuwe aan te maken. Lege velden vullen, gevulde velden
   niet overschrijven. De respons vertelt welke rij is bijgewerkt en met
   welke velden, en de UI toont dat met een link naar die rij.
3. Knop "doorzetten naar contacten" op drie plekken: het
   outreach-detailpaneel uit fase 2a, de aanvragenlijst en de leadslijst.
   Staat er al een contact aan gekoppeld, dan verandert de knop in een link
   naar dat contact. Geen tweede keer doorzetten.

Randvoorwaarden:
- Bestandswijzigingen via python3, npx tsc --noEmit --incremental false
  schoon, controle op null bytes.
- Een route, drie ingangen. Bouw geen drie losse routes.
- De route is idempotent: twee keer doorzetten van dezelfde bron levert een
  bijgewerkte rij op, nooit een duplicaat.
- isAdminRequest() en createServiceClient() in alle nieuwe code.
- Wijzig het datamodel niet. Als je een kolom mist, stop en zeg welke en
  waarom.
- Geen nieuwe npm-pakketten zonder te vragen.
- Geen em dashes, geen koppeltekens als scheidingsteken in zichtbare tekst.
- Er staat een niet-gecommitte wijziging in app/aanbod/page.tsx die niet
  bij deze opdracht hoort. Laat die staan en neem hem niet mee in je commit.

Laat me eerst je plan zien met de bestandslijst.

Lever aan het eind:
- lijst gewijzigde en nieuwe bestanden met regelaantallen
- een testlijst met in ieder geval: hetzelfde e-mailadres doorzetten vanuit
  outreach en daarna vanuit leads (moet een rij verrijken, geen tweede rij
  maken), en een contact dat al gekoppeld is (knop moet een link zijn)
- git commit, niet pushen
```

## Prompt voor fase 5: Vandaag-dashboard

```
Lees eerst CLAUDE.md en daarna docs/admin-redesign-30-jul-2026.md sectie 6.
Fase 0 tot en met 4 zijn gebouwd.

Bouw /admin/vandaag met de zes blokken uit sectie 6, in die volgorde. Eén
API-route GET /api/admin/vandaag die alles in één keer ophaalt en
server-side aggregeert, dus geen client-side aggregatie zoals de oude
FunnelTabblad die deed.

Harde eisen aan de cijfers:
- Elk getal in blok 1 is een link naar een voorgefilterde weergave.
- Regels in blok 1 zonder werk worden weggelaten, niet op nul gezet.
- Blok 4 toont geen percentage onder tien verstuurde mails per doelgroep,
  daar staat "te weinig data".
- Blok 5 heeft het woord indicatief in het label. De trechter is niet
  sessie-gekoppeld en mag niet suggereren dat hij dat is.
- Geen limit() die stil afkapt. Gebruik count-queries of aggregatie, geen
  duizenden rijen ophalen om ze in JavaScript te tellen.
- Geen doelen, streefcijfers of voortgangsbalken naar een target. Die zijn
  er bewust niet.

Lever bij elk blok de SQL of Supabase-query op waarmee ik het getal
handmatig kan natellen. Dat is onderdeel van de oplevering, geen extraatje:
een dashboard dat verkeerd telt is erger dan geen dashboard.

Plan eerst. Randvoorwaarden zoals de vorige fasen. Commit aan het eind.
```

## Prompt voor fase 6 en 7: omzetten en mobiel

```
Lees eerst CLAUDE.md en daarna docs/admin-redesign-30-jul-2026.md,
sectie 6 onder "Waar de oude tabs blijven" en sectie 11.
Fase 0 tot en met 5 zijn gebouwd.

1. Zet de resterende tabs om naar de primitives uit app/admin/ui/:
   QuizResultatenTabblad, ProspectsTabblad, BezoekersTabblad,
   IndexingTabblad, ZoekwoordenTabblad. Functioneel gedrag blijft
   identiek; alleen tabel, badge, lege staat en foutmelding komen uit de
   primitives. Vervang tegelijk de hardgecodeerde hexwaarden en de inline
   style-objecten door de tokens uit tailwind.config.ts.
2. Stel /admin/cijfers samen uit OverzichtTabblad plus de bruikbare delen
   van FunnelTabblad: drop-off per analyse-stap, apparaatverdeling,
   pagina's naar analyse. Verplaats de aggregatie naar een serverroute in
   plaats van de browser-anon-client. Verwijder daarna FunnelTabblad.
3. Mobiele controle op 390px breed, elke route langs. Nergens horizontaal
   scrollen. Tabellen worden kaartlijsten via de mobiele fallback van
   DataTabel. Alleen de acties uit sectie 3 zijn mobiel beschikbaar; bulk
   versturen en ps-zinnen schrijven blijven desktop.
4. Loop de zeven verificatiepunten uit sectie 11 af en rapporteer per punt
   wat je hebt gezien. Punt 5 en 7 doe je zelf voor zover mogelijk; punt 2,
   3 en 6 lever je aan als testlijst voor mij.

Randvoorwaarden zoals de vorige fasen. Verwijder geen enkele bestaande
functie zonder het expliciet te melden.

Plan eerst. Commit aan het eind.
```

## Prompt voor de mailintegratie, later

```
Lees CLAUDE.md en daarna docs/admin-redesign-30-jul-2026.md sectie 9.

Controleer eerst twee dingen en rapporteer voordat je bouwt: ondersteunt
de mailhost IMAP over TLS op poort 993 met wachtwoordauthenticatie, en
staat er een limiet op gelijktijdige verbindingen. Als je dat niet kunt
vaststellen, zeg dat en bouw niet.

Bouw daarna wat in sectie 9 staat, met de vier ontwerpkeuzes als harde
eisen: alleen lezen en nooit mail verplaatsen of verwijderen, alleen een
fragment van maximaal 500 tekens opslaan, automatisch stopzetten van
follow-ups bij een reply, en classificeren blijft handwerk.

Kom niet aan de MX-records. Die staan op een aparte mailhost en zijn al
eens verkeerd gezet met mailverlies tot gevolg.
```

## Volgorde en beslismomenten

1. Fase 0. Daarna deployen en een week gebruiken. Als stopzetten en de blocklist doen wat ze moeten doen, is de acute pijn weg.
2. Beslis dan of je verder gaat. De minimale variant uit sectie 8 van het ontwerpdocument is een reëel eindpunt; niet elke verbouwing hoeft af.
3. Ga je door, dan fase 1, 2 en 5 in die volgorde. Dat is de helft van het werk en het grootste deel van het dagelijkse gemak.
4. Fase 3, 4, 6 en 7 kunnen daarna los, in willekeurige volgorde.
5. De mailintegratie pas als fase 2 een paar weken draait, zodat je weet hoe de werklijst in de praktijk voelt voordat je hem automatisch laat vullen.
