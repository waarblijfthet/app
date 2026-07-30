# Admin-redesign: plan van aanpak (30-jul-2026)

Ontwerp, geen bouwopdracht. Basis: volledige inventaris van de huidige admin (3.788 regels UI, 12 API-routes, 14 SQL-bestanden) op 30-jul-2026. Drie keuzes zijn vooraf door Jarno vastgelegd:

1. Eén contactentabel voor alles (verwijzers, klanten, leads), outreach blijft de mailmachine.
2. De Funnel-tab wordt een dashboard dat toont wat er vandaag te doen is, in plaats van een trechter.
3. Mobiel is lezen plus snelle acties, niet volledig gelijk aan desktop.

## 0. Eerst het ongemakkelijke deel

Deze verbouwing levert geen enkele klant op. Een compleet redesign kost naar schatting vier tot vijf dagen aan gereedschap, terwijl de dingen die wel bewijs opleveren (conversiefixes, scans leveren, verhalen oogsten) blijven liggen. Dat is een reele prijs en die moet je expliciet willen betalen.

Tegenargument dat wel standhoudt: bij elke reply moet je binnen een dag kunnen zien wat je eerder stuurde en wat je hebt afgesproken. Dat kan nu niet. Er is geen notitieveld, geen historie per mail en geen plek voor iemand die positief reageerde. Zodra er een paar gesprekken tegelijk lopen naast werk in levering, is de huidige admin het knelpunt.

De uitweg staat in sectie 8: een minimale variant van ongeveer een dag die de scherpe pijn wegneemt, en de rest later. Lees die sectie voordat je aan fase 1 begint.

Wat dit document bewust niet doet, is doelen of streefcijfers vastleggen. De basis verschuift nog terwijl er geleerd wordt, dus het dashboard toont werkvoorraad en wat er feitelijk gebeurd is. Zodra er wel harde doelen zijn, is een tellerblok bovenaan Vandaag een halve dag werk.

## 1. Diagnose: waarom het nu een rommeltje is

Vier oorzaken, en ze zijn allemaal structureel, niet cosmetisch.

**De shell is geen shell.** `AdminClient.tsx` is een hardcoded array van tien tabs met `useState`. Geen URL-state, dus geen deeplink, geen terugknop, en na elke refresh sta je weer op Funnel. Elke tab is een eiland dat zijn eigen tabel, badge, filterknop en foutmelding opnieuw uitvindt. Er is geen enkel gedeeld UI-component. Badge-varianten zijn vier keer los gedefinieerd.

**Alles staat naast elkaar in plaats van in lagen.** Tien tabs op één niveau, waarvan er in de praktijk drie dagelijks gebruikt worden en zeven zelden. De informatiehiërarchie is plat: SEO-monitoring staat even prominent als de outreach-werkvoorraad, terwijl het één iets is dat je per kwartaal bekijkt en het ander iets dat je elke dag doet.

**De outreach-tabel probeert lijst en formulier tegelijk te zijn.** Elf kolommen in `min-w-[1250px]`, met bewerkbare tekstvelden in de cellen (`min-w-[150px]` tot `min-w-[220px]`). Daarom zijn de velden te klein: ze concurreren met tien andere kolommen om dezelfde breedte. En daarom is het mobiel onbruikbaar. Dit is niet met kolombreedtes op te lossen, de vorm is verkeerd.

**Drie functies zijn stuk of half aanwezig.** Bevindingen uit de inventaris, geen vermoedens:

- *Uitzetten werkt niet echt.* Het veld `gestopt` bestaat en de cron respecteert het (`app/api/cron/outreach-followups/route.ts` r.52), maar `app/api/admin/outreach/send/route.ts` r.40-42 en `preview/route.ts` r.30-32 filteren alleen op `status`. Verstuur je handmatig of in bulk, dan krijgt een stopgezet contact alsnog mail. Dat is de reden dat het onbetrouwbaar voelt: het werkt in het ene pad en niet in het andere.
- *Inline bewerken kan stil uit de pas lopen.* In `werkBij()` r.270-274 wordt bij een fout wel opnieuw geladen, maar `naamEdits`, `emailEdits`, `plaatsEdits` en `psEdits` worden nooit geleegd, terwijl het veld `naamEdits[c.id] ?? c.naam` toont. Een geweigerde waarde blijft dus in beeld staan terwijl de database de oude waarde heeft. Je denkt dat je iets hebt opgeslagen en dat is niet zo.
- *Verwijderen werkt technisch, maar voelt kapot.* De DELETE-route doet zijn werk via de service client. Wat ontbreekt: optimistische verwijdering (de rij blijft staan tot de herlaadronde klaar is), bulk-verwijderen (er is wel een selectiemechanisme, dat wordt alleen voor versturen gebruikt), en een harde blokkade zodat de prospect-zoeker iemand niet opnieuw aandraagt. Verwijderen zonder blocklist betekent dat je dezelfde persoon over twee maanden nog een keer koud benadert. Volgens de outreach-strategie is dat precies wat niet mag.

**Bijkomend gegevensverlies.** `app/api/admin/prospects/review/route.ts` r.41-47 kopieert bij goedkeuren alleen naam, e-mail, doelgroep en plaats. De velden `praktijk`, `website`, `bron_url`, `context` en `doelgroep_score` zijn dan al gevonden en worden weggegooid. Juist `context` en `website` zijn het materiaal waaruit je de ps-zin schrijft, en de ps-zin is volgens de strategie verplicht en inhoudelijk. Nu moet je die site opnieuw opzoeken.

## 2. Uitgangspunten voor het ontwerp

1. **Eén werkvoorraad, geen tien dashboards.** Als je inlogt wil je weten wat je vandaag moet doen, niet welke cijfers er zijn.
2. **Lijst en detail scheiden.** De tabel is om te scannen en te selecteren. Bewerken gebeurt in een detailpaneel met een expliciete opslaan- en annuleerknop. Dit lost de te kleine velden, de stille desync en het mobiele probleem in één keer op.
3. **Elk getal is een link naar de bijbehorende actie.** Een cijfer waar je niet op door kunt klikken hoort er niet.
4. **Één keer bouwen, tien keer gebruiken.** Vijf gedeelde primitives (tabel, badge, paneel, werkbalk, leeg-staat) in plaats van tien eigen implementaties.
5. **Mobiel is een aparte weergave, geen ingekrompen tabel.** Kaarten in plaats van kolommen, en alleen de acties die je onderweg doet.
6. **Onomkeerbare dingen zijn moeilijker dan omkeerbare.** Verwijderen en versturen krijgen wrijving. Alle andere acties zijn één klik.

## 3. Navigatie en shell

### Routing

Weg met de tab-state. Route-segmenten onder `app/admin/`, met een echte `layout.tsx` die de shell bevat. Elke sectie wordt deeplinkbaar en de terugknop gaat werken. Filters komen in de querystring (`?doelgroep=budgetcoaches&status=nieuw`), zodat het Vandaag-dashboard rechtstreeks naar een voorgefilterde lijst kan wijzen.

### Zijmenu (desktop, vanaf 1024px)

Breedte 240px, inklapbaar naar 64px met alleen iconen, keuze in `localStorage`. Drie groepen met een klein grijs kopje, want de groepering is de helft van de winst.

```
  Waar blijft het / Beheer

  WERK
   Vandaag                    3      (openstaande acties, oranje bolletje)
   Outreach                   7      (te versturen plus rijpe follow-ups)
   Contacten
   Prospects                 12      (te reviewen)

  LEVEREN
   Aanvragen                  2      (rood bij status nieuw)
   Analyses
   Leads

  SITE
   Bezoekers
   Zoekwoorden
   Indexering
   Cijfers

  ---
   jkoopman@...   Uitloggen
```

Tien items blijven, maar nu in drie lagen van gebruiksfrequentie in plaats van één rij. De vier oude tabs Funnel, Overzicht, Analyse resultaten en Quiz resultaten gaan op in Vandaag, Cijfers en Analyses (zie sectie 6).

Badges alleen op wat actie vraagt. Een badge die altijd een getal toont is decoratie, een badge die alleen bij werk verschijnt is een signaal. Regel: getal is werkvoorraad, nooit totaal.

### Mobiel (tot 1024px)

Twee elementen, geen zijmenu dat over het scherm klapt.

**Bovenbalk**, 56px, sticky: sectietitel links, contextactie rechts (bijvoorbeeld zoeken of toevoegen).

**Onderbalk**, 5 items, thumb-bereik, sticky met `env(safe-area-inset-bottom)`:

```
   Vandaag    Outreach    Contacten    Aanvragen    Meer
```

Meer opent een bladzijde met de rest (Prospects, Analyses, Leads, Bezoekers, Zoekwoorden, Indexering, Cijfers). Rechtvaardiging voor precies deze vier: dat zijn de secties met een werkvoorraad. De overige zeven zijn naslag.

Op mobiel wordt elke tabel een kaartlijst. Kaartanatomie voor outreach:

```
  Marjolein de Vries                        [M1 M2 ·]
  marjolein@praktijkdevries.nl
  Relatietherapeut · Zwolle
  Mail 2 verstuurd, 4 dagen geleden, geopend
  [ Reactie ]  [ Stop ]  [ ··· ]
```

Snelle acties die mobiel wel mogen: reactie classificeren, stop mails, notitie toevoegen, doorzetten naar contacten, follow-up versturen voor één contact. Wat alleen op desktop kan: bulk versturen, ps-zin schrijven, contact toevoegen met alle velden, tabel-export. Dat is een bewuste beperking, geen tekortkoming: een ps-zin met inhoudelijk detail schrijf je niet op een telefoon.

### Gedeelde primitives

Nieuw mapje `app/admin/ui/`. Vijf componenten, plus consequent de tokens uit `tailwind.config.ts` in plaats van de tien hardgecodeerde hexwaarden die er nu door de admin heen staan.

| Component | Doet |
|---|---|
| `DataTabel` | Sticky kop, sticky eerste kolom, selectie, sortering, lege staat, laadskelet, mobiele kaart-fallback via render-prop |
| `Badge` | Varianten neutraal, actie, goed, waarschuwing, fout. Vervangt vier losse implementaties |
| `Zijpaneel` | Detail- en bewerkpaneel rechts (desktop) of bladzijde van onder (mobiel), met opslaan en annuleren |
| `SelectieBalk` | Verschijnt bij selectie, toont aantal plus bulkacties, blijft onderaan hangen |
| `LegeStaat` | Titel, uitleg, één actie. Nu ontbreekt dit overal, waardoor een leeg scherm op een fout lijkt |

## 4. Datamodel

Vier nieuwe tabellen en drie kolomtoevoegingen. Bestaande tabellen worden niet verbouwd, want `leads`, `intake_aanvragen` en `paginabezoeken` hebben geen create-script in de repo en zijn direct in Supabase gemaakt. Die laten we staan en we lezen ze uit.

### `contacten` (de CRM, klein gehouden)

Eén rij per persoon, ongeacht of het een verwijzer, klant of lead is. E-mail is de sleutel, want dat is het enige veld dat over alle bronnen heen bestaat.

```sql
create table contacten (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  email text not null unique,
  telefoon text,
  praktijk text,
  website text,
  plaats text,

  soort text not null default 'lead',
    -- verwijzer, klant, lead, overig
  fase text not null default 'nieuw',
    -- betekenis hangt af van soort, zie hieronder
  bron text,
    -- outreach, analyse, intake, netwerk, handmatig
  doelgroep text,
    -- alleen bij soort = verwijzer, zelfde waardenlijst als outreach_contacts

  outreach_contact_id uuid references outreach_contacts(id) on delete set null,
  lead_id uuid,
  analyse_token text,
  intake_id uuid,

  laatste_contact_at timestamptz,
  volgende_actie text,
  volgende_actie_op date,


  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on contacten (soort, fase);
create index on contacten (volgende_actie_op) where archived_at is null;
alter table contacten enable row level security;
```

Twee velden verdienen uitleg.

`volgende_actie` plus `volgende_actie_op` zijn het hart van de CRM. Niet een statusveld, maar een afspraak met jezelf: "bellen over verwijsafspraak, 12 augustus". Alles wat vandaag of eerder rijp is, verschijnt op het Vandaag-dashboard. Dit is de enige reden dat een CRM voor één persoon zin heeft: je hoeft niet te onthouden wie er nog op je wacht.

Wat er expres niet in staat: statusvelden voor dingen die nog kunnen veranderen. Alles wat je nu nog niet zeker weet, hoort in een notitie of in `volgende_actie`, niet in een kolom met een vaste waardenlijst. Een kolom toevoegen is later een regel SQL. Een kolom die verkeerd blijkt, sleep je jaren mee.

**Fasen per soort**, in code vastgelegd, niet in een database-check, omdat ze per soort verschillen:

| soort | fasen |
|---|---|
| verwijzer | gereageerd, gesprek gepland, gesprek gehad, verwijst actief, stil, afgehaakt |
| klant | aangemeld, betaald, gegevens binnen, rapport verstuurd, geleverd, vervolg |
| lead | nieuw, analyse gedaan, warm, koud |

### `contact_notities`

```sql
create table contact_notities (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references contacten(id) on delete cascade,
  tekst text not null,
  soort text not null default 'notitie',
    -- notitie, gesprek, mail, systeem
  created_at timestamptz not null default now()
);
create index on contact_notities (contact_id, created_at desc);
```

Systeemnotities worden automatisch geschreven bij mail verstuurd, reactie geclassificeerd en doorgezet vanuit outreach. Zo is de tijdlijn in het detailpaneel compleet zonder dat je iets bijhoudt.

### `outreach_mails` (per mail, vervangt het enkele veld)

Nu is er één `laatste_followup_at` voor twee follow-ups. Daardoor mist mail 2 zijn datum en kun je geen open- of klikhistorie per mail tonen, terwijl `geklikt_at` en `bounced_at` wel bestaan en nergens in de UI staan.

```sql
create table outreach_mails (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references outreach_contacts(id) on delete cascade,
  nummer int not null,          -- 1, 2, 3
  verstuurd_at timestamptz not null default now(),
  resend_id text,
  geopend_at timestamptz,
  geklikt_at timestamptz,
  bounced_at timestamptz,
  unique (contact_id, nummer)
);
create index on outreach_mails (resend_id);
```

De bestaande velden op `outreach_contacts` blijven staan als samenvatting, zodat lijstweergaven niet hoeven te joinen. De Resend-webhook gaat naar `outreach_mails` schrijven via `resend_id` en werkt daarna de samenvatting bij.

### `email_blocklist`

```sql
create table email_blocklist (
  email text primary key,
  reden text not null,   -- afgemeld, bounced, verzoek, handmatig
  toegevoegd_at timestamptz not null default now(),
  notitie text
);
```

Verplichte controle op drie plekken: bij goedkeuren in `prospects/review`, bij handmatig contact toevoegen, en bij versturen. Verwijderen uit outreach zet het adres hier standaard bij, met een vinkje om dat niet te doen. Dit is de echte oplossing voor "je kan iemand niet uitzetten": stoppen met mailen betekent nu ook dat de prospect-zoeker die persoon over twee maanden niet opnieuw aandraagt.

### Kolomtoevoegingen

```sql
alter table outreach_contacts add column if not exists archived_at timestamptz;
alter table outreach_contacts add column if not exists gestopt_reden text;
alter table outreach_contacts add column if not exists contact_id uuid references contacten(id) on delete set null;
```

`archived_at` maakt zacht verwijderen mogelijk. Hard verwijderen blijft bestaan voor foute rijen, maar de standaardknop archiveert, want een verwijderde rij die terugkomt via prospects is erger dan een rij te veel.

### Wat we niet doen

Geen sessie-koppeling van `leads` en `intake_aanvragen`, dus de funneltrechter blijft indicatief. Bij 2 leads per maand is een correcte trechter statistisch alsnog stil, en de wijziging zit in de publieke site in plaats van in de admin. Bewust uitgesteld.

Geen migratie van bestaande data naar `contacten` in bulk. Eén knop "zet door naar contacten" per rij, en een eenmalige knop die alle `intake_aanvragen` met status betaald of gestart aanmaakt als soort klant. Dat zijn een handvol rijen.

## 5. Outreach: de werkplek

Dit is de sectie waar je dagelijks in zit, dus die krijgt twee weergaven achter één menu-item, met een schakelaar bovenin.

### 5a. Werklijst (standaardweergave)

Geen tabel maar vier stapels, in de volgorde waarin je ze afhandelt. Elke stapel is inklapbaar en toont een aantal.

```
  Outreach            [ Werklijst ]  Alle contacten        Deze week: 6 van 10 verstuurd

  ┌ Gereageerd, nog niet afgehandeld                                    2 ┐
  │  Marjolein de Vries   Relatietherapeut, Zwolle   mail 2, 3 dagen     │
  │      [ Positief ] [ Neutraal ] [ Negatief ]   [ Openen ]             │
  └──────────────────────────────────────────────────────────────────────┘

  ┌ Follow-up rijp                                                      4 ┐
  │  4 contacten wachten op mail 2, 1 op mail 3                          │
  │      [ Bekijken en versturen ]                                       │
  └──────────────────────────────────────────────────────────────────────┘

  ┌ Klaar om te versturen, nog 4 deze week                              9 ┐
  │  9 nieuwe contacten, waarvan 3 zonder ps-zin                         │
  │      [ Ps-zinnen schrijven ]   [ Selecteren en versturen ]           │
  └──────────────────────────────────────────────────────────────────────┘

  ┌ Wachten                                                            18 ┐
  │  18 contacten, follow-up nog niet rijp. Vroegste over 2 dagen.        │
  └──────────────────────────────────────────────────────────────────────┘
```

Drie ontwerpbeslissingen hierin.

**Het weekbudget staat bovenaan en is bindend in de UI.** Volume is besloten op 10 per week tot er een referentie in mail 1 staat. Als je 6 hebt verstuurd, staat er "nog 4 deze week" en waarschuwt de preview-modal zodra je selectie het budget overschrijdt. Blokkeren doet het niet, want jij mag altijd overrulen, maar het is zichtbaar.

**Ps-zinnen schrijven is een eigen modus.** Nu schrijf je die in een klein veldje in een brede tabel. In de nieuwe vorm is het een aparte weergave: per contact de gevonden `context` en `website` uit prospects naast een ruim tekstveld, en een pijl naar het volgende contact. Dat is vier keer sneller en het is de reden dat de prospect-velden niet meer weggegooid mogen worden.

**Wachten is expliciet en ingeklapt.** Nu staan die 18 contacten tussen de rest en lijkt de lijst een chaos. Ingeklapt weet je: hier hoef je niets te doen.

### 5b. Alle contacten (tabel)

Zeven kolommen in plaats van elf, geen bewerkbare velden in de cellen.

| Kolom | Inhoud |
|---|---|
| selectie | Checkbox |
| Contact | Naam vet, e-mail eronder klein. Klik opent het paneel |
| Doelgroep | Badge |
| Plaats | Tekst |
| Voortgang | Drie bolletjes M1 M2 M3, gevuld is verstuurd, ring is geopend. Tooltip met datums uit `outreach_mails` |
| Status | Eén badge: Nieuw, Verstuurd, Gereageerd positief, Gereageerd negatief, Gestopt, Bounced. Daaronder relatieve tijd |
| acties | Kebab: Versturen, Follow-up, Stop mails, Doorzetten naar contacten, Archiveren, Verwijderen |

Erboven: zoekveld (naam, e-mail, plaats, ps-zin), doelgroep-chips, statusfilter, plaatsfilter, sortering. Server-side filteren en 50 rijen per pagina in plaats van `select("*")` zonder limiet.

Selecteer je rijen, dan komt de `SelectieBalk` op: mail 1 versturen, follow-up versturen, doelgroep wijzigen, plaats wijzigen, stop mails, archiveren, verwijderen. Bij meer dan drie verwijderingen moet je het aantal typen ter bevestiging.

### 5c. Detailpaneel

Klik op een rij en er schuift rechts een paneel open van 480px (mobiel: bladzijde van onder). Vier blokken.

```
  Marjolein de Vries                                          [ x ]
  marjolein@praktijkdevries.nl

  [ Gegevens ]
    Naam, e-mail, praktijk, website, plaats, doelgroep
    Ps-zin (ruim tekstveld, 3 regels)
    Gevonden context uit prospects (alleen lezen, inklapbaar)
                                        [ Annuleren ] [ Opslaan ]

  [ Mails ]
    Mail 1   18 jul   geopend 18 jul, 2x
    Mail 2   22 jul   geopend 22 jul, geklikt
    Mail 3   nog niet verstuurd, rijp op 31 jul
                                        [ Follow-up versturen ]

  [ Reactie ]
    Positief / Neutraal / Negatief    Mails gestopt: ja/nee, reden
                                        [ Doorzetten naar contacten ]

  [ Notities ]
    Tijdlijn van notities en systeemregels, nieuw notitieveld onderaan
```

Dit paneel repareert vier dingen tegelijk: velden hebben ruimte, opslaan is expliciet dus geen stille desync meer, de mailhistorie is volledig zichtbaar, en er is eindelijk een plek voor notities.

### 5d. Serverfixes, los van de UI

Deze horen bij het redesign maar zijn onafhankelijk uit te voeren en kosten samen ongeveer een uur.

1. `.eq("gestopt", false)` plus `.is("archived_at", null)` in `outreach/send/route.ts` en `outreach/preview/route.ts`. Dit is de kern van "iemand uitzetten werkt niet".
2. Blocklist-controle in `send`, in `outreach` POST en in `prospects/review` POST.
3. `prospects/review` r.41-47 uitbreiden met `praktijk`, `website`, `bron_url`, `context`, `doelgroep_score`.
4. `outreach` GET: paginatie, filters en zoekterm als queryparameters, niet meer alles ophalen.
5. Resend-webhook naar `outreach_mails` laten schrijven op `resend_id`.

## 6. Vandaag: wat er in de plaats van Funnel komt

De huidige Funnel-tab is 589 regels client-side aggregatie over drie tabellen, met een disclaimer in de UI dat de percentages indicatief zijn. Bij 292 bezoekers per 30 dagen, 8 voltooide analyses en 0 betalingen zegt een trechter niets dat je niet in één regel kunt lezen. Wat je wel elke dag wil weten: wat moet ik nu doen, en is er iets binnengekomen.

### Opbouw

**Blok 1. Te doen.** Zes regels, elk een link naar een voorgefilterde weergave. Regels zonder werk verdwijnen in plaats van dat ze nul tonen. Dit blok is de reden dat je inlogt.

```
  2 contacten gemarkeerd als gereageerd, nog niet afgehandeld  → Outreach
  4 follow-ups rijp                                            → Outreach
  4 mails te versturen binnen het weekbudget                    → Outreach
  1 aanvraag zonder rapport, 3 dagen oud                        → Aanvragen
  12 prospects te reviewen                                      → Prospects
  1 afspraak rijp: Marjolein bellen                             → Contacten
```

Let op de eerste regel: **gemarkeerd** als gereageerd. Er is geen mailintegratie, dus de admin weet niet dat er een reply in je postbus ligt. Jij ziet die mail in je mailclient en zet hier een vlaggetje. Dat is de huidige situatie en het document doet niet alsof dat anders is. Sectie 9 beschrijft wat er nodig is om dit wel automatisch te laten werken.

**Blok 2. Het weekbudget.** Eén regel: verstuurd deze week tegenover het afgesproken maximum, en hoeveel er nog kan. Dit staat apart omdat het de enige regel is die je van versturen kan weerhouden.

**Blok 3. Deze week tegenover vorige week.** Zes getallen, geen grafiek. Puur om te zien of de beweging de goede kant op gaat.

| | Deze week | Vorige week |
|---|---|---|
| Mails verstuurd | 6 | 10 |
| Geopend | 4 | 6 |
| Replies | 1 | 0 |
| Analyses voltooid | 3 | 5 |
| Scan-aanmeldingen | 1 | 0 |
| Scans geleverd | 0 | 1 |

**Blok 4. Replies per doelgroep.** Bij een klein volume is dit de enige leercurve die je hebt. Vijf regels met verstuurd, geopend, gereageerd, en het percentage pas vanaf tien verstuurde mails per doelgroep. Onder tien staat er "te weinig data" in plaats van een misleidend percentage. Dat is dezelfde discipline als in het beslisdocument: niet gevonden is niet hetzelfde als niet aanwezig, en één op vier is geen 25 procent.

**Blok 5. Trechter, klein.** Eén regel, 30 dagen, met het woord indicatief erbij.

```
  292 bezoekers  →  15 gestart  →  8 voltooid  →  2 leads  →  0 aanmeldingen  →  0 betaald
```

**Blok 6. Laatste activiteit.** Tien regels uit de gecombineerde tijdlijn: mail verstuurd, mail geopend, reply binnen, lead aangemeld, analyse voltooid, aanvraag binnen. Puur om te zien of het systeem leeft.

### Waar de oude tabs blijven

| Nu | Straks |
|---|---|
| Funnel | Opgeheven. Blok 5 op Vandaag plus de drop-off-analyse onder Cijfers |
| Overzicht | Onder Cijfers, met de recharts-grafieken die er al zijn |
| Analyse resultaten | Eigen sectie Analyses, ongewijzigd behalve de nieuwe tabel-primitive |
| Leads | Eigen sectie, ongewijzigd, plus een knop doorzetten naar contacten |
| Aanvragen | Eigen sectie, plus een knop doorzetten naar contacten als klant |
| Bezoekers, Zoekwoorden, Indexering | Ongewijzigd, onder Site |

Cijfers wordt dus de vergaarbak voor wat je per maand of kwartaal bekijkt: overzichtsgrafieken, drop-off per analyse-stap, apparaatverdeling, pagina's naar analyse. Dat mag rustig een lange pagina zijn, want je scrollt er zelden.

## 7. Contacten: de CRM

Klein houden. Eén lijst, drie filters, één detailpaneel. Geen deals, geen pipeline-borden, geen taken-module.

### Lijst

Filterchips bovenin: Alles, Verwijzers, Klanten, Leads, plus een aparte chip Actie nodig (alles waar `volgende_actie_op` vandaag of eerder is).

| Kolom | Inhoud |
|---|---|
| Contact | Naam vet, praktijk of e-mail eronder |
| Soort | Badge verwijzer, klant of lead |
| Fase | Badge, waardenlijst per soort |
| Plaats | Tekst |
| Volgende actie | Tekst plus datum, rood als verlopen |
| Laatste contact | Relatieve tijd |

### Detailpaneel

Zelfde `Zijpaneel`-component als bij outreach. Blokken: gegevens, herkomst (links naar de outreach-rij, de analyse via `analyse_token`, de intake-aanvraag), volgende actie, notitietijdlijn.

### Doorzetten, in één klik

Dit is de functie die je vroeg. Drie ingangen, allemaal dezelfde serverroute `POST /api/admin/contacten/doorzetten`:

1. Vanuit outreach, na een positieve reactie: maakt een contact met soort verwijzer, fase gereageerd, bron outreach, kopieert naam, e-mail, praktijk, website, plaats en doelgroep, zet `outreach_contact_id` en `contact_id` wederzijds, schrijft een systeemnotitie met de mailhistorie, en zet standaard een volgende actie op vier werkdagen.
2. Vanuit Aanvragen: soort klant, fase op basis van de aanvraagstatus, `intake_id` en `analyse_token` mee.
3. Vanuit Leads: soort lead, `lead_id` mee.

Bestaat het e-mailadres al in `contacten`, dan wordt de bestaande rij verrijkt in plaats van gedupliceerd, en krijg je een melding welke rij is bijgewerkt. Dat is de hele reden voor één tabel: iemand die eerst lead was, dan verwijzer werd en later klant, blijft één persoon met één tijdlijn.

## 8. Fasering

Schattingen in dagdelen van vier uur, inclusief typecheck en handmatig testen. Ze gaan uit van bouwen met dezelfde werkwijze als nu: python3 voor bestandswijzigingen, `npx tsc --noEmit --incremental false` schoon na elke stap.

| Fase | Wat | Dagdelen |
|---|---|---|
| 0 | Serverfixes uit 5d, los te deployen, geen UI-wijziging | 0,5 |
| 1 | `layout.tsx` met zijmenu, route-segmenten, mobiele onderbalk, vijf primitives in `app/admin/ui/` | 2 |
| 2a | Outreach: tabel met zeven kolommen, detailpaneel, outreach_mails en contact_notities, webhook | 1,5 |
| 2b | Outreach: werklijst, weekbudget, ps-zin-modus, bulkacties | 1,5 |
| 3 | SQL voor `contacten`, `contact_notities`, `outreach_mails`, `email_blocklist`, plus de doorzet-route | 1 |
| 4 | Contacten-sectie: lijst, paneel, notities | 2 |
| 5 | Vandaag-dashboard, alle zes blokken, met één API-route die alles in één keer ophaalt | 1,5 |
| 6 | Bestaande tabs omzetten naar de nieuwe primitives, Cijfers samenstellen, oude Funnel opheffen | 1,5 |
| 7 | Mobiel nalopen op 390px, kaartweergaven, veiligheidscontrole en opruimen | 1 |
| | **Totaal** | **12,5 dagdelen, ongeveer 5 werkdagen** |

### De minimale variant als je nu geen vijf dagen hebt

Dit is het advies. Fase 0 plus een uitgeklede fase 2, samen twee dagdelen, ongeveer één werkdag. Daarmee is de outreach werkbaar voor de komende paar honderd mails en wacht de rest.

1. De vijf serverfixes uit 5d. Stopzetten gaat werken, blocklist voorkomt dubbele benadering, prospect-velden blijven behouden. Ongeveer een uur.
2. Het detailpaneel in de bestaande outreach-tab, met notitieveld en ruime velden. De inline-inputs uit de tabel halen. Dat lost de te kleine velden, de stille desync en de ontbrekende notities op zonder dat er ook maar één route hoeft te verhuizen. Ongeveer drie uur.
3. `contact_notities` mag in deze variant een `notities text`-kolom op `outreach_contacts` zijn. Onvolledig, wel genoeg om een paar maanden mee te werken.
4. Bulk-archiveren en bulk-verwijderen aan de bestaande selectiebalk. Ongeveer een uur.

Wat je dan bewust niet doet: zijmenu, mobiele navigatie, Vandaag-dashboard, contacten-tabel. Prijs daarvan: je blijft op mobiel horizontaal scrollen en je moet zelf onthouden wat er vandaag te doen is. Bij 10 mails per week is dat vol te houden.

Als je toch de volle verbouwing wil, doe dan fase 1, 2 en 5 eerst (6,5 dagdelen). Dat is de helft van het werk en negentig procent van het dagelijkse gemak. Fase 4 en 6 kunnen los later.

## 9. Volgende stap: replies automatisch binnenhalen

Nu niet bouwen, wel nu ontwerpen, want het bepaalt of het datamodel klaar is om het later op te vangen. Het antwoord is ja: `outreach_mails` plus `contact_notities` zijn precies de tabellen die een inbox-koppeling nodig heeft.

**Wat er nu is.** Resend verstuurt alleen. Openen en klikken komen via de webhook terug, replies niet. De postbus hallo@waarblijfthet.nl staat op een aparte mailhost (45.82.188.190) met MX `10 mail.waarblijfthet.nl`. Een reply belandt daar en de admin weet er niets van.

**Waarom Resend inbound geen optie is.** Inbound mail bij Resend vereist dat de MX naar Resend wijst. Dat betekent je postbus opgeven. Dat is uitgesloten, en de MX van dit domein is al eens verkeerd gezet met mailverlies tot gevolg (zie technische les 3 in CLAUDE.md). Niet aan de MX komen.

**De route die wel werkt: IMAP lezen.** De mailhost ondersteunt IMAP. Een cron leest de postbus, koppelt afzenders aan contacten en markeert de rest als gelezen zonder iets te doen.

```
  cron, elke 15 minuten
    → IMAP verbinden, alleen ongelezen berichten in INBOX
    → per bericht: afzenderadres normaliseren
    → afzender in outreach_contacts?
         ja  → status naar gereageerd, gereageerd_at zetten,
                gestopt op true (automatische follow-ups stoppen),
                systeemnotitie met onderwerp en eerste 500 tekens,
                bericht op de admin-werklijst zetten
         nee → overslaan, niets doen, bericht ongelezen laten
    → bounce- en autoreply-detectie apart:
         Auto-Submitted header, X-Autoreply, mailer-daemon,
         onderwerp met "automatisch antwoord" of "out of office"
         → geen reply, wel notitie, status ongewijzigd
```

**Vier ontwerpkeuzes die vooraf vastliggen.**

1. **Alleen lezen, nooit verwijderen of verplaatsen.** De cron gebruikt een aparte IMAP-vlag of een eigen map met gelezen berichten, zodat jouw mailclient onaangetast blijft. Een cron die mail wegwerkt is niet te vertrouwen.
2. **Berichttekst wordt niet in de database opgeslagen, alleen een fragment.** Onderwerp plus de eerste 500 tekens in een systeemnotitie, verwijzing naar `message_id`. De volledige mail blijft in de postbus. Reden: dit zijn persoonsgegevens van derden en de rest van het project verwijdert klantgegevens na levering.
3. **Automatisch stopzetten bij een reply.** Zodra iemand antwoordt gaan de automatische follow-ups uit. Nu doet de cron dat op basis van een handmatig gezette status. Met inbox-koppeling is de kans op een follow-up naar iemand die al geantwoord heeft nul, en dat is de meest schadelijke fout die het systeem kan maken.
4. **Classificeren blijft handwerk.** Positief, neutraal of negatief bepaal jij bij het lezen. Het is verleidelijk om dat te laten inschatten, maar bij een paar replies per week is de winst nul en het risico dat je een positieve reactie mist niet.

**Wat het kost en waar het in gaat zitten.**

| Onderdeel | Schatting |
|---|---|
| IMAP-cron met bounce- en autoreply-detectie, koppeling op afzender | 1 dagdeel |
| Werklijst-stapel met het fragment erin, plus afhandelknoppen | 0,5 dagdeel |
| Testen met echte replies vanaf drie verschillende mailproviders | 0,5 dagdeel |
| | **2 dagdelen** |

Techniek: `imapflow` of `node-imap` in een route onder `app/api/cron/`, met de IMAP-gegevens als env-variabelen in Vercel. Let op de Vercel-limiet van ongeveer 20 seconden per aanroep, dus een maximum van bijvoorbeeld 25 berichten per run en de rest de volgende ronde. Logt naar `cron_runs`, net als de bestaande crons.

Twee dingen om te controleren voordat je hieraan begint: ondersteunt de mailhost IMAP over TLS op 993 met een gewoon wachtwoord, en staat er een limiet op het aantal gelijktijdige IMAP-verbindingen. Dat bepaalt of dit een dagdeel is of een dag.

## 10. Open punten en risico's

**Auth is zwakker dan de naam suggereert.** `isAdminRequest()` in `lib/admin-auth.ts` controleert alleen of iemand ingelogd is, niet of het een admin is. Elke Supabase-user in het project is dus admin. Ook gebruikt `app/admin/page.tsx` `getSession()` terwijl de rest `getUser()` gebruikt; dat eerste leest alleen de cookie en is de zwakkere controle. Voeg in fase 1 een e-mail-allowlist of een `app_metadata.role`-controle toe en trek `getUser()` overal door. Dit hoort bij het redesign omdat de shell toch verbouwd wordt, en het kost tien minuten.

**De middleware-matcher dekt `/api/admin/*` niet.** De routes beschermen zichzelf, dus het is nu geen gat, maar één vergeten guard in een nieuwe route is er wel een. Matcher uitbreiden.

**Funnel leest via de anon-key.** Dat werkt alleen omdat `paginabezoeken`, `quiz_voortgang` en `paginagebeurtenissen` een anon select-policy hebben, en dus publiek leesbaar zijn. Ze zijn PII-vrij en dat was een bewuste keuze, maar bij het verhuizen naar Cijfers is dit het moment om die aggregatie naar een serverroute te tillen. Dan kun je de policies later dichtzetten.

**`limit(8000)` en `limit(1000)` kappen stil af.** In de nieuwe API-routes met echte aggregatie verdwijnt dat probleem. Tot die tijd staat het er.

**Wat nog beslist moet worden:**

1. Verhuizen we `outreach_contacts` op termijn helemaal naar `contacten`, of blijft het permanent gescheiden? Voorstel: gescheiden houden. Outreach is een mailmachine met een eigen levenscyclus, contacten is een relatieadministratie. De koppeling via twee id-velden is voldoende.
2. Willen we een echte afmeldlink in de outreach-mails? Voor koude B2B-mail naar zakelijke adressen is dat juridisch niet verplicht in Nederland, maar mail 1 en 2 zijn nu bewust linkloos en dat is een positioneringskeuze. Alternatief dat de linkloosheid intact laat: één regel onderaan, "een enkel woord terug en ik stuur niets meer", en die reactie handmatig naar de blocklist. Geen bouwstap, wel een copywijziging in `lib/outreach/mails.ts` en dus een aparte beslissing.
3. Blijft `gestopt` bestaan naast `archived_at` en de blocklist? Ja: gestopt is tijdelijk pauzeren, gearchiveerd is uit de werklijst, blocklist is nooit meer mailen. Drie verschillende dingen, alle drie nodig.

## 11. Verificatie na de bouw

1. `npx tsc --noEmit --incremental false` schoon, en controle op null bytes in alle gewijzigde bestanden.
2. Handmatig: contact stopzetten, dan handmatig versturen, dan bulk versturen, en in alle drie de paden controleren dat er geen mail uitgaat. Dit is de fix die het meest telt.
3. Contact verwijderen, daarna dezelfde persoon via de prospect-zoeker vinden en goedkeuren. Moet geweigerd worden met de blocklist als reden.
4. Inline bewerken met een dubbel e-mailadres. Het veld moet terugspringen naar de opgeslagen waarde, niet blijven staan.
5. Elk dashboardgetal handmatig natellen tegen een SQL-query in Supabase. Een dashboard dat verkeerd telt is erger dan geen dashboard, en dit project heeft al eens elf van vijftien cijfers verkeerd opgeschreven gehad.
6. Op 390px breed elke sectie doorlopen en controleren dat er nergens horizontaal gescrold hoeft te worden.
7. Uitloggen en elke `/api/admin/*` route rechtstreeks aanroepen. Alles moet 401 geven.
