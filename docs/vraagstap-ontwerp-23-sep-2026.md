# Vraagstap: "stel me je vraag" als ruil voor een e-mailadres

**Status: gebouwd op 23 september 2026, zie `docs/bouwvolgorde.md` sectie 26.** Besluiten van Jarno: antwoord binnen 2 werkdagen (ja), grens 15 vragen per 7 dagen, de Geldscan mag in elk antwoord één keer genoemd worden (ja).

23 september 2026. Uitwerking van optie 8 uit `docs/conversie-na-resultaat-23-sep-2026.md`, op verzoek van Jarno. Mockup: `docs/img/mockup-vraagstap-23-sep-2026.png`.

## Oordeel in het kort

**Doen, maar niet als tussenstap vóór het resultaat.** De vraag komt in de plaats van resultaatstap 3, het tekstscherm "cijfers vertellen nog niet of dit een probleem is". Dat is het zwakste scherm van de vier, het staat precies op het moment dat de nieuwsgierigheid het grootst is (net na de verschillen), en een vraag kun je pas stellen als je het resultaat hebt gezien.

Waarom dit sterker is dan de andere opties: het e-mailadres heeft een reden (het antwoord komt per mail), het aanbod past bij de positionering (één persoon leest je cijfers), en elke vraag is een gesprek. **De enige klant tot nu toe kwam via een mens.** Deze stap maakt van een anonieme afronder iemand met wie Jarno schrijft.

## Wat wel en niet werkt

| Optie | Oordeel | Waarom |
|---|---|---|
| Tussenstap vóór het resultaat: "reactie op je analyse, e-mail invullen of overslaan" | **Nee** | Je kunt geen vraag stellen over iets wat je nog niet zag. De overslaanknop wordt de standaardroute, en het voelt als een drempel voor iets wat gratis beloofd was. Past niet bij "het werk ligt vooraf op tafel". |
| Resultaat helemaal achter een e-mailveld | **Nee** | Meer adressen, maar volgens de leveranciers zelf 30 tot 50 procent minder afronders, en het botst met de positionering. |
| Ongevraagde persoonlijke reactie op elke analyse | **Nee** | Dat is een gratis mini-Geldscan: kost per stuk meer tijd, maakt de betaalde versie overbodig en zegt niets over wat de bezoeker wil weten. |
| Vraagveld onderaan stap 4 | **Nee** | Daar staat nu het e-mailveld, en niemand komt daar. Op mobiel is dat twee schermen scrollen onder de Geldscan-knop. |
| **Vraag als stap 3, direct na de verschillen** | **Ja** | Nieuwsgierigheid op zijn hoogst, vraag en e-mail in één handeling, de Geldscan blijft de stap erna. |

## Hoe het eruitziet

De resultatenflow wordt:

1. **Uitkomst:** de financiële ruimte (ongewijzigd).
2. **Verschillen:** de grootste afwijkingen (ongewijzigd).
3. **Jouw vraag:** nieuw, vervangt het tekstscherm.
4. **Volgende stap:** de Geldscan voor wie overslaat, een bevestiging voor wie een vraag stuurde.

Scherm 3, zie de mockup:

- **Een kop die past bij de uitkomst**, niet één tekst voor iedereen:
  - bij meer over dan verwacht: "Volgens de cijfers blijft er bij jullie genoeg over";
  - bij minder over dan verwacht: "Bij jullie blijft minder over dan logisch is";
  - bij passend: "Jullie ruimte past bij jullie huishouden".
- **Drie voorgekozen vragen plus een eigen vraag.** Een leeg tekstveld is de grootste drempel: de meeste mensen weten niet wat ze moeten vragen. De drie vragen komen uit hun eigen uitkomst:

| Uitkomst | Vraag 1 | Vraag 2 | Vraag 3 |
|---|---|---|---|
| Meer over dan verwacht | Het voelt krapper dan dit. Hoe kan dat? | Is [grootste post] van [bedrag] veel voor ons? | Wat zou jij als eerste bekijken? |
| Minder over dan verwacht | Waar zou jij bij [grootste afwijking] als eerste naar kijken? | Is [bedrag] aan [post] voor ons huishouden veel? | Wat kan een Geldscan zien dat deze vergelijking niet ziet? |
| Passend | Waarom voelt het dan toch krap? | Is [grootste post] van [bedrag] veel voor ons? | Wat zou jij als eerste bekijken? |

- **Het e-mailveld verschijnt pas na de keuze.** Eerst één tik, dan één veld. Het is een kleine eerste stap, en het scherm ziet er niet uit als een formulier.
- **Een optioneel tekstveld** "wil je er iets bij vertellen?". Dat geeft Jarno context, maar mag leeg blijven.
- **Op mobiel staat de knop vast onderaan in beeld** ("Stuur mijn vraag"), met daaronder "Geen vraag, laat de volgende stap zien". Er hoeft niets gescrold te worden, en daarmee is het scrollprobleem voor deze stap weg.
- **Tekst bij het formulier:**
  - "Ik lees je uitkomst erbij en antwoord je binnen 2 werkdagen persoonlijk."
  - "Geen nieuwsbrief, geen verkoopgesprek. Over beleggen en hypotheken geef ik geen advies."
  - Er komt geen toestemmingsvinkje. Het antwoord is iets waar de bezoeker zelf om vraagt (AVG artikel 6 lid 1 sub b, zie het conversiestuk; laat het checken).
- **Na versturen:**
  - "Je vraag is binnen. Je hoort uiterlijk [datum over 2 werkdagen] van me."
  - Daaronder, rustig: de Geldscan als tekstlink met prijs, en de bewijsregel over de vijf rapporten.
  - De bezoeker krijgt ook meteen de bestaande resultaatmail.

## Hoe het werkt achter de schermen

Er is geen migratie en geen nieuw adminscherm nodig; alles past in bestaande tabellen en schermen.

1. **Nieuwe server-route `/api/analyse-vraag`.** Die doet wat `/api/quiz-lead` al doet (lead met bron `analyse-vraag`, rij in `quiz_resultaten` met token), en daarnaast:
   - maakt een rij in `contacten` aan (soort `lead`, bron `analyse`, gekoppeld via `analyse_token` en `lead_id`, met volgende actie "Vraag beantwoorden" op over 2 werkdagen);
   - zet de vraag in `contact_notities`.

   Een verborgen honeypotveld en een limiet per e-mailadres per dag houden spam tegen.
2. **Mail naar hallo@waarblijfthet.nl** via Resend, met "antwoord aan" ingesteld op de bezoeker. Jarno drukt in zijn eigen mailbox op beantwoorden. In de mail staan de vraag, het huishouden, het inkomen, de ruimte tegenover de verwachting, de grootste verschillen en een link naar de volledige analyse (`/resultaat/[token]`, bestaat al).
3. **Vandaag-dashboard:** het contact verschijnt vanzelf onder "contacten met actie rijp" op de dag dat het antwoord moet. Dat blok bestaat al.
4. **Ingevulde analyses:** de popup en de trechter krijgen de stap "Vraag gesteld".
5. **Meting** in `paginagebeurtenissen`:
   - `analyse_vraag_gekozen` (met welke vraag);
   - `analyse_vraag_verstuurd`;
   - `analyse_vraag_overgeslagen`.

## Hoe Jarno antwoordt

Richtlijn: 5 tot 10 minuten per vraag, altijd in drie delen.

1. **Wat de analyse wel laat zien**, direct op de vraag. Met hun eigen bedragen.
2. **Wat de analyse niet kan zien.** Bijvoorbeeld: hij rekent met de maandbedragen die je invulde, dus wat daarbuiten om gaat, zie ik niet. Beschrijven, niet raden.
3. **Eén keer, zonder aandringen, de Geldscan**, met prijs: dat is waar ik met je afschriften erbij kijk.

Grenzen:

- geen bespaartips;
- geen oordeel vooraf ("structuurprobleem");
- geen advies over hypotheek of beleggen;
- geen garanties.

Past de vraag niet, dan zegt het antwoord dat ook.

## Kritische punten en wat ertegen helpt

| Risico | Wat ertegen helpt |
|---|---|
| **Tijd.** Stel dat 1 op 4 van de ongeveer 40 afronders per maand een vraag stuurt: 10 vragen, ruim een uur per maand. | Loopt het boven de 10 per week, dan gaat de stap tijdelijk uit met een schakelaar (een omgevingsvariabele). Alleen afronders zien hem, want je vraagt over je uitkomst. |
| **Het antwoord maakt de Geldscan overbodig.** | Deel 2 van het antwoord bestaat juist omdat het waar is: de analyse ziet geen afschriften. Het antwoord gaat alleen over wat de analyse zegt. |
| **Vage vragen** ("hoe bespaar ik?") | De voorgekozen vragen sturen. Op een vage vraag antwoordt Jarno met deel 1 en 2. |
| **Verwachting "binnen 2 werkdagen"** | Die belofte moet altijd gehaald worden, ook bij vakantie. Dan zet de schakelaar de stap uit of verandert de tekst. |
| **Privacy** | De vraag en het e-mailadres staan in de database zolang het contact bestaat. De privacytekst moet dat zeggen. Beloof geen automatische verwijdering, want die bestaat niet (CLAUDE.md sectie 11). |
| **Te veel tegelijk veranderen** | Dit is één proef ("de vraagstap"). Ze vervangt wijziging 1 tot en met 3 uit het conversiestuk. De bewaarlink op stap 4 blijft staan. |

## Wat het moet opleveren, en wanneer het niet werkt

**Meten, per week, op Ingevulde analyses:**

- van wie stap 3 zag: hoeveel kozen een vraag, en hoeveel verstuurden er een;
- hoeveel sloegen over;
- tijd tot antwoord;
- Geldscan-aanvragen binnen 30 dagen na een antwoord.

**Hypotheses, geen voorspellingen:**

- 1 op 5 die stap 3 ziet, stuurt een vraag;
- 1 op 4 die een antwoord kreeg, koopt binnen 30 dagen.

**Stoppen of bijsturen:**

- Na 20 beantwoorde vragen minder dan 2 Geldscans: dan zijn de antwoorden te volledig of trekt de stap de verkeerde mensen. Bekijk welke van de twee het is voordat je hem uitzet.
- Minder dan 1 op 10 stuurt een vraag: dan ligt het aan de voorgekozen vragen of aan de kop, niet aan het idee. Pas één van de twee aan.

**Wat het sowieso oplevert:** een lijst met echte vragen van de doelgroep, in hun eigen woorden. Dat is materiaal voor FAQ's en artikelen, en het zegt meer over waarom mensen niet kopen dan welke meting ook.

## Bouwomvang en wat Jarno moet beslissen

**Bouw:** één sessie. Nieuw vraagscherm, route `/api/analyse-vraag`, twee mailsjablonen, drie meetgebeurtenissen, en de stap "Vraag gesteld" in de admin.

**Jarno beslist vooraf:**

1. Durf je "binnen 2 werkdagen" te beloven?
2. Waar ligt de grens waarboven de stap tijdelijk uitgaat? Voorstel: 10 per week.
3. Mag de Geldscan in het antwoord één keer genoemd worden? Voorstel: ja, altijd in deel 3.
