# Wat de analyse-funnel vandaag al meet, en wat fase 1 nog moet bouwen

5 september 2026. Bijlage bij `docs/gsc-nulmeting-05-sep-2026.md`, en antwoord op fase 0 stap 4 uit `docs/plan-seo-conversie-100-geldscans-05-sep-2026.md`.

**Korte versie: er wordt al gemeten, grover dan het plan aanneemt, maar fijn genoeg om vandaag te weten waar 14 van de 14 afhaken. Fase 1 punt 1 is daarmee geen bouwklus van een week maar van een halve dag, en de eerste bruikbare uitkomst kost jou één query.**

## 1. Wat er al staat

**Tabel `quiz_voortgang`** (`supabase/quiz_voortgang.sql` plus `quiz_voortgang_v2.sql`), één rij per sessie, geüpsert op `sessie_id`:

| Kolom | Wat het betekent |
|---|---|
| `sessie_id` | client-side gegenereerd, uniek per sessie |
| `huidige_stap` | categorie 1 tot 5, of 6 voor het resultaatscherm |
| `max_stap` | hoogste categorie die deze sessie bereikte |
| `voltooid` | resultaatscherm gehaald |
| `eerste_interactie` | heeft daadwerkelijk een veld ingevuld, niet alleen de pagina geopend |
| `apparaat` | mobiel of desktop |
| `antwoorden` | jsonb met alle antwoorden plus een `_events`-array |
| `totaal_inkomen`, `maandelijks_over`, `verdict`, `grootste_afwijking` | alleen gevuld bij voltooid |

**Schrijfmoment**: `logVoortgang()` in `app/analyse/QuizClient.tsx` regel 180, aangeroepen vanuit de effect op regel 324, en alleen wanneer de *categorie* wisselt. Per sessie dus maximaal zes schrijfacties.

**De `_events`-array** kent op dit moment drie markers: `analysis_landing_view`, `analysis_started`, `analysis_result_viewed`.

**Weergave**: `app/admin/components/FunnelTabblad.tsx` leest `max_stap`, `voltooid`, `eerste_interactie` en `apparaat` al uit, naast `paginabezoeken` en `paginagebeurtenissen`. Er is dus ook geen nieuw scherm nodig, precies zoals CLAUDE.md voorschrijft.

## 2. Wat er niet staat, en waarom dat uitmaakt

**De 29 schermen vallen samen in 5 categorieën.** De flow in `app/analyse/schermen/index.tsx` heeft 29 schermen, waarvan 10 met een `condition` en dus niet voor iedereen zichtbaar. Ze zijn verdeeld als 3, 6, 5, 9 en 6. Omdat er alleen bij categoriewissel geschreven wordt, betekent `max_stap = 4` letterlijk: ergens in de negen schermen van "Vervoer en vaste lasten". Welke van die negen de bezoeker liet afhaken, is uit de huidige data niet te halen.

**Er is geen event voor de twee stappen ná het resultaat.** `analysis_result_viewed` bestaat, maar er is geen marker voor het invullen van het e-mailadres en geen marker voor de klik naar de Geldscan. Plan sectie 6 punt 1 vraagt die allebei, en zonder die twee is de conversie van afgeronde analyse naar Geldscan straks niet te meten.

**De schrijfactie gaat via de anon-client, niet via een server-route.** `QuizClient.tsx` schrijft rechtstreeks met `createClient()` uit `lib/supabase-browser`. De RLS-policies in `supabase/quiz_voortgang.sql` staan `anon` toe om te inserten, te updaten én te selecteren, alle drie met `using (true)`. Er staat geen naam en geen e-mailadres in de tabel, dus dit is bewust zo gebouwd, maar het betekent wel dat iedereen met de anon-sleutel uit de browserbundle de volledige tabel met huishoudinkomens kan uitlezen. Dat botst met de werkregel dat publieke formulieren via server-routes lopen en schrijfacties via `createServiceClient()`. Voor de data-asset uit punt G, waar ook nog een toestemmingsvlag bij komt, moet dit hoe dan ook een server-route worden. Ik zou dat in dezelfde deploy meenemen als de rest, niet als apart project.

## 3. Wat je vandaag al kunt weten, zonder één regel code

Draai dit in de Supabase SQL-editor. Het antwoordt op de vraag uit plan sectie 6 punt 1, namelijk op welke stap iedereen afhaakt, over de periode waarin de huidige flow live staat.

```sql
select
  max_stap,
  case max_stap
    when 1 then '1 Jouw huishouden (3 schermen)'
    when 2 then '2 Wat komt er binnen? (6 schermen)'
    when 3 then '3 Wat kost wonen? (5 schermen)'
    when 4 then '4 Vervoer en vaste lasten (9 schermen)'
    when 5 then '5 Wat geef je daarnaast uit? (6 schermen)'
    when 6 then '6 Resultaat'
  end as stap,
  count(*) as sessies,
  count(*) filter (where eerste_interactie) as begonnen_met_invullen,
  count(*) filter (where voltooid) as voltooid,
  count(*) filter (where apparaat = 'mobiel') as mobiel
from quiz_voortgang
where created_at >= '2026-08-28'
group by max_stap
order by max_stap;
```

De datumgrens staat op 28 augustus 2026, de dag van de laatste herbouw van de analyseflow (commit `6b3f3b5`). Alles daarvoor is een andere flow en vertroebelt het beeld. Wil je de hele zomer zien, zet de grens dan op `'2026-06-01'` en vergelijk de twee.

En deze, voor de drie bestaande markers:

```sql
select
  ev as gebeurtenis,
  count(*) as sessies
from quiz_voortgang, lateral jsonb_array_elements_text(antwoorden -> '_events') as ev
where created_at >= '2026-08-28'
group by ev
order by count(*) desc;
```

Plak de uitkomst van beide in dit document onder deze regel, of stuur ze door, dan kies ik in de volgende sessie de eerste wijziging op basis van de echte verliesstap in plaats van op de hypothesevolgorde uit het plan.

## 4. Wat fase 1 punt 1 daarna nog echt moet bouwen

Dit is minder dan het plan aanneemt. Drie dingen, samen een halve dag:

1. **Scherm-id meeschrijven.** `logVoortgang()` krijgt het huidige scherm-id mee en schrijft dat in een nieuwe kolom `huidig_scherm` plus een `max_scherm_index`. Het schrijfmoment verschuift van "bij categoriewissel" naar "bij schermwissel", wat per sessie op maximaal 29 upserts uitkomt in plaats van 6. Dat is voor dit volume verwaarloosbaar. Migratie in dezelfde deploy als de code.
2. **Twee markers erbij**: `analysis_email_submitted` en `analysis_geldscan_clicked`, allebei op `Stap6Resultaat.tsx`. Die zijn nodig voor de laatste twee stappen van de trechter en voor de aanname van 8 procent uit plan sectie 1.
3. **De schrijfactie naar een server-route**, samen met de toestemmingsvlag voor de data-asset uit plan sectie 6 punt 3. Eén route, `POST /api/analyse-voortgang`, met `createServiceClient()`, en de anon-policies op `quiz_voortgang` daarna terug naar select-only voor de admin.

De weergave in `FunnelTabblad.tsx` hoeft daarna alleen de nieuwe kolom als extra rij te tonen. Geen nieuw scherm.

## 5. Wat dit betekent voor de volgorde

Het plan zet "funnel instrumenteren" in week 1 en "eerste bruikbare data" na zeven dagen. Omdat de meting op categorieniveau al draait sinds de herbouw van 28 augustus, kan de eerste beslissing over het lek vooruit: zodra jij de twee queries hebt gedraaid, weten we in welke van de vijf categorieën het verlies zit, en kan de eerste wijziging in dezelfde week als de instrumentatie.

De killgrens uit plan sectie 9 blijft staan: is de afronding op 19 september nog nul procent, dan stopt alle contentbouw tot het lek gevonden is.
