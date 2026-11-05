# Positionering en aanbod: een tweede spoor voor wie al een overzicht heeft

5 november 2026. Vraag van Jarno: kijk kritisch naar wat we aanbieden (de Geldscan en de rest), en zoek uit hoe we de mensen bereiken die al een begroting of Excel hebben en die willen laten toetsen. Twee CTA's? De Geldscan laten beginnen met "vul in, of ik heb al een overzicht"? Niets gebouwd; dit is het plan met de besluiten voor Jarno. Bouwt voort op `docs/plan-moment-categorie-vertrouwen-05-nov-2026.md` (fora en Reddit, sectie 1 tot 1c). Logboek: bouwvolgorde sectie 48.

## 0. Het voorstel in zes regels

1. **Twee groepen, één product.** Wie nog geen overzicht heeft, begint met de gratis analyse. Wie al een overzicht heeft (Excel, bankapp, YNAB) en merkt dat het toch schuift, laat het nakijken. Beide komen uit bij dezelfde Geldscan van €49.
2. **De belofte wordt wat de vijf klanten kregen:** nagekeken, en de maand neergezet met hun eigen bedragen (welke rekening waarvoor, wat er per maand naar jaarkosten, buffer en sparen gaat). Niet langer "het complete inzicht" of "waarom houd jij zo weinig over".
3. **Geen twee knoppen, maar één vraag:** "Heb je al een overzicht van je uitgaven?" met "Nee, help me op weg" (analyse) en "Ja, laat het nakijken" (Geldscan). Dezelfde vorm die het introscherm deze week van 34 naar 68 procent start bracht.
4. **Wie al een overzicht heeft, stuurt dat in** in plaats van de 25 vragen opnieuw te schatten of afschriften te sturen. Twee van de vijf rapporten zijn al zo gemaakt.
5. **De drempel na de aanvraag gaat eraf:** betaallink direct in de bevestigingsmail in plaats van een dag wachten op een betaalverzoek.
6. **Dit spoor groeit niet uit Google.** Op de toetswoorden zoekt bijna niemand. Het groeit uit bestaand verkeer (rapporten, huishoudboekje, potjes en jaarkosten), via via en Reddit.

## 1. Kritische blik op wat er nu staat

### 1.1 De cijfers (30 dagen tot 5 nov, paginabezoeken zonder eigen bezoeken)

| Pagina | Bezoeken |
|---|---|
| Hele site | 3.127 sessies |
| De vijf rapporten samen, plus /rapporten | 123 |
| /financieel-coach | 39 (deels mensen die "jarno koopman" zoeken) |
| /over | 22 |
| /aanbod | 15 |
| /geldscan | 9 |
| /aanbod/intake (aanvraagformulier) | 7 |
| /adviesgesprek | 3 |

Sinds de meting op 28 september werkt: één klik op een Geldscan-knop, vanaf het slot van het zzp-rapport. Geen aanvraag. De rapporten trekken vier keer zoveel bezoek als alle aanbodpagina's samen: het bewijs is interessanter dan het aanbod.

### 1.2 Wat de Geldscan belooft, en wat de klanten kregen

De pagina's beloven: "Het complete inzicht in jouw geld", "wat opvalt, waarom en wat je ermee kunt", en in de title "waarom houd jij zo weinig over?". De vijf klanten beschrijven iets anders (`lib/rapporten-data.ts`, veld `evaluatie`):

| Rapport | Uitkomst | Wat de klant er zelf over zegt |
|---|---|---|
| Tweeverdieners, drie kinderen | Geen enkele buitensporige vaste last | "We reserveren nu automatisch voor vakantie, onderhoud en december." |
| Alleenstaande ouder | Je gevoel van krapte is deels logisch | "Huis, auto, vakantie en december hebben nu eigen reserveringen." |
| Alleenstaand, huurwoning | Het vermoeden was juist, maar €250 groter | "Ik reserveer nu €500 voor jaarlijkse kosten en €400 voor mijn buffer." |
| Stel zonder kinderen | Er is geen lek | "We zetten nu automatisch €1.100 per maand apart voor het woondoel." |
| Zzp, wisselend inkomen | Geen privélek, maar een cashflowprobleem | "Ik betaal mezelf nu iedere maand hetzelfde privébedrag." |

Alle vijf eindigen bij een structuur met bedragen: reserveringen voor jaarkosten, een buffer, een vast bedrag dat automatisch weggaat. Dat is precies wat op de fora "rust" heet. Het aanbod noemt het nergens.

Twee feiten die het tweede spoor ondersteunen: bij twee van de vijf (stel zonder kinderen, zzp) kwamen de bedragen uit de bankapp en een eigen overzicht, zonder afschriften. En drie van de vijf wilden daarna een gesprek, steeds om de nieuwe verdeling samen neer te zetten of te toetsen.

### 1.3 Eén deur, en die past niet bij wie al een overzicht heeft

De enige weg naar de Geldscan loopt via de gratis analyse: ongeveer 25 vragen waarin je bedragen schat. Wie al een Excel bijhoudt, moet zijn eigen cijfers opnieuw schatten. Ook na betaling vraagt de bevestigingsmail "vul de analyse in (2 minuten)" (de mediaan is 3,4 minuten). Voor deze groep is dat een stap terug, niet vooruit.

### 1.4 Het proces na "aanvragen" vraagt geduld

Vijf stappen: formulier, wachten op contact, betaalverzoek binnen een werkdag, dan pas de informatie, dan twee werkdagen. Wie op een avond besluit, kan niet meteen door. Op het formulier staat geen voorbeeld van wat er terugkomt.

### 1.5 Vier treden suggereren afhankelijkheid

Gratis analyse, Geldscan €49, vervolgsessie €125, traject €497 (de title van /aanbod noemt "gesprek en traject"). Voor wie zegt "kan ik zelf" en "wat als de hulp ophoudt" leest een ladder als een traject waar je in wordt getrokken. De klanten zelf gebruikten het anders: een keer nakijken, een keer neerzetten, daarna zelf.

### 1.6 Woorden die schuren of niet kloppen

| Waar | Tekst | Waarom eruit of anders |
|---|---|---|
| /aanbod, vervolgsessie | "Eerlijk advies, zonder provisies of producten." | Copyregel 6; en "advies" schuurt met "geen vergunningplichtig advies" (CLAUDE.md 4) |
| /geldscan, /aanbod | "Persoonlijk advies, Onafhankelijk", "Persoonlijk en onafhankelijk" | "Onafhankelijk adviseur" is een beladen term met registers erachter; de feiten zijn sterker: geen producten, geen provisie |
| /aanbod | "100% vertrouwelijk" | Absolute claim; beschrijf wat er gebeurt in plaats van wat het is |
| /geldscan | "Direct na het versturen van je rapport verwijder ik wat je hebt aangeleverd." | Klopt alleen zolang Jarno het met de hand doet (CLAUDE.md 11); de privacypagina zegt het al preciezer |
| /geldscan, title | "waarom houd jij zo weinig over?" | Lek en oordeel; op de fora lokt dat verdediging uit |
| /geldscan, /aanbod | "Het complete inzicht in jouw geld" | Vaag; zegt niet wat je krijgt |
| Bevestigingsmail | "vul de analyse in (2 minuten)" | Mediaan is 3,4 minuten; en voor spoor B overbodig |

## 2. Twee groepen binnen dezelfde ICP

| | A. Nog geen overzicht | B. Overzicht, en toch schuift het |
|---|---|---|
| Wie | Voelt dat het krap is, weet niet waar het heen gaat | Houdt Excel, bankapp of YNAB bij; de spaarrekening zakt terug bij elke grote rekening |
| In hun woorden | "Waar blijven die 800 euro elke maand?" (Viva) | "We hebben al beter inzicht, maar wil graag een stap verder gaan" (r/zuinig); "Heeft iemand misschien zin om met ons mee te kijken? Kritisch zijn mag." (r/geldzaken) |
| Hoe ze zoeken | Symptomen en vergelijkingen: "is 4.000 netto goed", "boodschappen per maand" | Gereedschap: "maandbudget excel", "begroting maken huishouden", "vaste lasten rekening", "leefgeld rekening" |
| Wat ze nodig hebben | Een eerste beeld: de analyse | Nakijken wat er staat en ontbreekt, en de bedragen neerzetten |
| Ingang | Gratis analyse | De Geldscan, met hun eigen overzicht als invoer |

Groep B is de groep die de fora "kan ik zelf" noemen. Ze kunnen het ook zelf; wat ze missen is wat een draadje niet geeft: iemand die hun cijfers naast echte huishoudens legt en de bedragen per rekening uitrekent. Dat is na een keer zelf door te zetten, en dat beantwoordt het bezwaar "wat als de hulp ophoudt".

## 3. De nieuwe positionering

**Kern, voor de Geldscan:** Je hebt je geld al in beeld, en toch schuift het. Ik kijk je overzicht na en zet je maand neer: welke rekening waarvoor, wat er per maand naar je jaarkosten, je buffer en je spaardoel gaat, met jouw bedragen. Eén keer, €49. Daarna doe je het zelf.

**Drie onderdelen van wat je krijgt** (moet in elk rapport zitten, de vijf deden het al):

1. **Nagekeken:** wat klopt, wat er ontbreekt (jaarkosten die er niet in staan, regelingen die je niet gebruikt) en wat juist niet uit de toon valt.
2. **Neergezet:** je maandstructuur met bedragen: vaste lasten inclusief jaarkosten per maand, leefgeld, buffer, wat er op de dag van het salaris automatisch weggaat.
3. **Vergeleken:** waar je afwijkt van vergelijkbare huishoudens, met de n erbij.

**Feiten die we noemen, geen karaktereigenschappen:** één persoon die het zelf schrijft; vaste prijs; geen producten, geen provisie, geen abonnement, geen traject dat vanzelf doorloopt; vijf rapporten openbaar, bij twee viel niets te repareren.

**Wat we niet meer zeggen:** een lek beloven; "advies", "onafhankelijk", "eerlijk"; "het complete inzicht"; "waarom houd jij zo weinig over".

**Voor spoor A blijft het zoals het is,** met één aanpassing: de analyse eindigt bij dezelfde belofte (nakijken en neerzetten), niet bij "ik zoek uit waar het blijft".

## 4. De deur: twee CTA's, een vraag, of de Geldscan die begint met een keuze?

| Optie | Wat | Voor | Tegen |
|---|---|---|---|
| 1. Zoals nu | Overal één knop "Doe de gratis analyse", Geldscan als tekstlink | Rustig, één doel | Nul aanvragen; spoor B heeft geen deur |
| 2. Twee knoppen | "Doe de gratis analyse" en "Vraag de Geldscan aan" naast elkaar | Eenvoudig | Keuzestress; een koude betaalknop voor wie nog niets weet; strijdig met CLAUDE.md 5 |
| 3. Eén vraag die splitst | "Heb je al een overzicht van je uitgaven?" Nee, help me op weg / Ja, laat het nakijken | Iedereen kiest zichzelf in; past bij wat het intro deze week liet zien (een vraag als start verdubbelde de starts); meetbaar per plek | Eén klik extra voor groep A |
| 4. De Geldscan begint met een keuze | Op het aanvraagformulier: "Hoe lever je aan? Mijn eigen overzicht / Ik vul de vragenlijst in" | Haalt de werkangst weg | Helpt alleen wie al op het formulier staat (7 per maand) |

**Advies: optie 3 als deur, optie 4 binnen de Geldscan.** De vraag vervangt de analyseknop op de plekken met verkeer; de keuze hoe je aanlevert staat op het formulier. Er blijft per plek één primaire handeling (de vraag), dus de geest van CLAUDE.md 5 blijft overeind, maar de letter ("primaire CTA is overal exact Doe de gratis analyse") verandert. Besluit Jarno.

**Waar de vraag komt:**

1. Het slotblok van elk artikel (`app/inzichten/[slug]/page.tsx`), in plaats van de huidige analyseknop. Eén component, overal tegelijk.
2. Het slot van elk rapport, de enige plek die ooit een klik opleverde.
3. Bovenaan /geldscan.
4. Na de download op `huishoudboekje-voorbeeld`: "Ingevuld? Laat het nakijken."
5. Niet op het introscherm van de analyse: dat begint al met een vraag en werkt. Daar alleen een tekstregel onder de kaart: "Heb je al een overzicht? Laat het nakijken."

## 5. Hoe spoor B werkt, stap voor stap

1. **De vraag** (zie 4). "Ja, laat het nakijken" gaat naar een sectie op /geldscan (`/geldscan#nakijken`), geen nieuwe URL en dus geen kannibalisatie.
2. **De sectie op /geldscan:** kop, de drie onderdelen, één voorbeeld uit een echt rapport (de maandstructuur van het alleenstaande huurrapport: €500 jaarkosten, €400 buffer, met link), wat je instuurt, €49, en de regel "Je hoeft niets te laten zien voordat je besluit."
3. **Wat je kunt insturen** (na betaling): je Excel of Google Sheet, een schermafbeelding van het uitgavenoverzicht in je bankapp, een export uit je budgetapp, of een lijst in een mail. Afschriften mogen, hoeven niet. Dekt de vragen uit deel A van `docs/vragenlijst-geldrapport-30-jul-2026.md`; wat ontbreekt vraag ik na. Deel B (wat de cijfers niet weten) blijft altijd.
4. **Het formulier** (`app/aanbod/intake/GeldscanAanvraag.tsx`): blijft voornaam, e-mail, optionele situatie, keuze en bericht (CLAUDE.md 5: niets financieels vóór de koop). Nieuw: één optionele vraag "Hoe wil je aanleveren?" met "Mijn eigen overzicht" en "De vragenlijst", vooraf ingevuld met `?spoor=overzicht`. Opslag zoals de keuze: `[Spoor: eigen overzicht]` vóór `grootste_knelpunt`, geen nieuwe kolom, geen migratie (CLAUDE.md 10.3).
5. **De bevestigingsmail:** per spoor een eigen stappenlijst. Spoor B: "Betaal hier (€49), stuur daarna je overzicht als antwoord op deze mail." Geen "vul de analyse in".
6. **Betalen zonder wachten:** de betaallink direct in de bevestigingsmail. CLAUDE.md 5 zei al dat dit moet zodra twee aanvragen niet betalen; met nul aanvragen is de reden nu de drempel zelf. **Vraag aan Jarno:** waarmee stuur je nu het betaalverzoek? Een vaste betaallink van €49 per mail is genoeg; een betaalprovider inbouwen niet nodig.

## 6. Het aanbod zelf: wat verandert en wat niet

- **De Geldscan blijft €49, twee werkdagen, dezelfde naam** (CLAUDE.md 5: pakketwijziging pas na twaalf rapporten). Wat verandert is de belofte en dat de maandstructuur een vast onderdeel van elk rapport is.
- **De vervolgsessie blijft €125,** maar heet in de tekst wat de klanten ermee deden: "Samen je nieuwe verdeling neerzetten of toetsen, 45 minuten." Drie van de vijf kozen hem. Combineren met de Geldscan in één pakket is een pakketwijziging; noteren voor het moment dat er twaalf rapporten zijn.
- **Het traject van €497 verdwijnt uit de title en de koppen van /aanbod.** Het blijft op aanvraag. Het staat haaks op "daarna doe je het zelf".
- **/aanbod wordt niet herontworpen** (CLAUDE.md 8, wat niet gebouwd wordt). Alleen tekst: de belofte, de schurende woorden uit 1.6, en de title.

## 7. Waar groep B vandaan komt

**Niet uit Google op toetswoorden.** Google-autocomplete (hl=nl, gl=nl, opgehaald 5 nov 2026): "begroting check", "huishoudboekje laten" en "iemand laten meekijken" geven niets; "begroting laten" alleen "begroting laten maken"; "financiën laten" alleen "financien laten beheren" (bewind). "Financiële check" bestaat, maar gaat over nieuwbouw en de gratis check van ING, Rabobank en ABN AMRO (de banken bieden dat zelf aan). Volgens CLAUDE.md 8.28 krijgt taal zonder autocomplete geen eigen pagina, dus geen "laat je begroting checken"-pagina.

**Wel uit verkeer dat er al is:**

- De rapporten: 123 bezoeken per maand, meer dan alle aanbodpagina's samen. De vraag uit 4 in het slot van elk rapport.
- `huishoudboekje-voorbeeld` (de Excel-download, 29 bezoeken per maand, nog niet in Google): wie downloadt, gaat een overzicht maken. Na het invullen is "laat het nakijken" de logische stap.
- `jaarlijkse-kosten-reserveren`, `potjesmethode-gezin-hoe-werkt-het`, `geld-indelen-salaris-potjes-systeem`: mensen die al met structuur bezig zijn.

**Later, na het beslismoment van 30 november, op gereedschapstermen die wel bestaan:** "maandbudget excel" en "maandbudget gezin", "begroting maken huishouden", "vaste lasten rekening", "leefgeld rekening", "hoeveel leefgeld per maand". Dat zijn de termen van groep B, en ze passen precies bij de maandstructuur. Eerst een GSC-filter per term en upgraden voor bouwen (CLAUDE.md 8.2), en de tempo-regel.

**Buiten de site:** via via (de vijf klanten, één naam) en meekijken op r/geldzaken onder eigen naam (plan moment, categorie en vertrouwen, besluit 4 en 5). Daar staat letterlijk de vraag van groep B.

## 8. Concrete teksten (voorstel, ik-vorm, geen em dashes)

**De vraag (slotblok artikel en rapport):**

> **Wil je dat iemand meekijkt?**
> Heb je al een overzicht van je uitgaven?
> [Nee, help me op weg] Gratis analyse, ongeveer 3 minuten.
> [Ja, laat het nakijken] Ik kijk je overzicht na en zet je maand neer. €49, eenmalig.

**/geldscan, bovenaan:**

> **De Geldscan, €49**
> Ik kijk je cijfers na en zet je maand neer.
> Welke rekening waarvoor, wat er per maand naar je jaarkosten, je buffer en je spaardoel gaat, met jouw bedragen. Eén keer. Daarna doe je het zelf.
> Heb je al een overzicht? Stuur dat in. Nog niet? Begin met de gratis analyse.

**/geldscan, sectie "nakijken":**

> **Heb je al een overzicht?**
> Een Excel, je bankapp of een budgetapp: stuur in wat je hebt. Ik kijk wat klopt, wat ontbreekt en wat juist niet uit de toon valt, en ik reken uit hoeveel er waarheen moet.
> Zo zag dat er bij een van mijn klanten uit: €500 per maand voor jaarlijkse kosten, €400 voor de buffer. [Lees dat rapport]
> Je hoeft niets te laten zien voordat je besluit.

**Tekstlink op resultaatstap 1** (vervangt de test uit het vorige plan, 2b):

> Laat mij het nakijken en je maand neerzetten, €49 →

**Formulier, nieuwe vraag:** "Hoe wil je aanleveren? Mijn eigen overzicht (Excel, bankapp, budgetapp) / De vragenlijst"

Elke zin hierboven moet bij het bouwen nog langs CLAUDE.md 6 en de regels voor copy (geen claim zonder bron, geen "eerlijk", "advies" of "onafhankelijk"). De bedragen uit het huurrapport (€500 en €400) komen bij het bouwen uit `rapportVoorSlug("alleenstaand-huurwoning")`, nooit uitgetypt (CLAUDE.md 3.2).

## 9. Wat dit verandert aan CLAUDE.md (besluiten Jarno)

1. **Sectie 5, CTA-structuur:** de primaire handeling wordt de splitsvraag in plaats van overal exact "Doe de gratis analyse". De Geldscan mag dan via "Ja, laat het nakijken" ook buiten het resultaatscherm de tweede keuze in dezelfde vraag zijn.
2. **Sectie 4, positionering:** naast "laten zien waar het geld bij echte huishoudens heen ging" komt "nakijken en neerzetten, daarna doe je het zelf". Groep B erbij als tweede ingang naar dezelfde Geldscan, zoals de geldmomenten op 25 september.
3. **Sectie 5, aanvraag:** betaallink direct in de bevestigingsmail, nu al.
4. **Sectie 5, aanleveren:** eigen overzicht als volwaardige vorm van aanleveren, naast vragenlijst en afschriften.

Zonder besluit, want het is waarheidsschuld of copyregel: de schurende woorden uit 1.6 weghalen.

## 10. Meten en wanneer we stoppen

- **Nieuwe gebeurtenis** `cta_splitsing` met `meta.plek` en `meta.keuze` (nee of ja), via het `PageTracker`-patroon en `/api/gebeurtenis`. Zichtbaar in het weekblok op Ingevulde analyses als extra regel, geen nieuw scherm.
- **Aanvragen per spoor** via `[Spoor: ...]`, op Vandaag naast de keuzes.
- **Lezing op 15 december** (samen met sectie 42): per plek hoe vaak de vraag gezien en beantwoord is, de verhouding nee en ja, aanvragen per spoor, betaald per spoor.
- **Stopcriterium voor spoor B:** kiest na zes weken minder dan 1 op de 10 die de vraag beantwoordt "ja", of komt er via "ja" geen enkele aanvraag, dan vindt groep B ons via de site niet en ligt het zwaartepunt bij via via en Reddit. De belofte (nakijken en neerzetten) blijft dan staan voor beide groepen.

## 11. Volgorde

| Week | Wat | Soort |
|---|---|---|
| 1 (na akkoord) | Schurende woorden eruit (1.6); nieuwe belofte op /geldscan en /aanbod; title /aanbod zonder traject; sectie "nakijken" op /geldscan; spoorvraag op het formulier; bevestigingsmail per spoor met betaallink | Tekst en formulier |
| 2 | Splitsvraag als component in het slotblok van artikelen en rapporten; tekstregel onder het intro; brug na de huishoudboekje-download; meting `cta_splitsing` | Bouw, klein |
| 3 en 4 | Vragenlijst voor spoor B (wat ik uit een eigen overzicht nog nodig heb); vaste sectie "Je maandstructuur" in het rapportformat | Werkwijze Jarno |
| Na 30 november | GSC-filter en upgrades op de gereedschapstermen (7) | Content, tempo-regel |
| 15 december | Lezing en besluit | Meten |
