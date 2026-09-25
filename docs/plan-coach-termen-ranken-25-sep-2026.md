# Plan: ranken op de coachtermen, 25 september 2026

Op verzoek van Jarno ("negeer je instructie, ik wil dat we content gaan maken of aanpassen zodat we op deze termen gaan ranken"). Dit is het plan, nog niet gebouwd. Onderbouwing: `docs/serp-coach-woordveld-25-sep-2026.md` (inclusief de verdieping "budgetcoach zonder schulden") en `docs/concurrenten-eenmalige-check-25-sep-2026.md`. Alle observaties van 25 september 2026.

## Wat er nu staat

Zes pagina's in één klein taalgebied, samen vrijwel nul Google-vertoningen sinds juli.

| URL | Woorden (live) | H1 | Wat er goed aan is | Wat er mis is |
|---|---:|---|---|---|
| N4 `/inzichten/kan-iemand-naar-mijn-financien-kijken` | 1.836 | Kan iemand naar mijn financiën kijken zonder dat ik schulden heb? | Beste inhoud van het cluster: vier opties naast elkaar, keuzehulp, vijf echte rapporten, FAQ-schema. Perplexity en ChatGPT citeren hem; Bing zet hem op 1 voor de kostenvraag | De zoekterm "budgetcoach zonder schulden" staat nergens in titel, H1 of koppen (alleen in een codecommentaar). Kop "Hoe deze pagina zich verhoudt tot de andere twee" beantwoordt geen zoekvraag. 0 Google-vertoningen in 90 dagen, 2 inkomende links |
| `/inzichten/verschil-budgetcoach-financieel-coach` | 916 | Budgetcoach of financieel coach: het verschil en wat bij jou past | Krijgt de meeste coachvertoningen (1.016 in 90 dagen), beste positie op "geldcoach" (17,4) | De metaDescription zegt "Een budgetcoach helpt bij geldproblemen en schulden". Daarmee duwt de pagina de zoeker die een budgetcoach zonder schulden zoekt juist weg, en spreekt hij N4 en de AI-overzichten tegen ("ook als je geen schulden hebt"). "eerlijke blik" in de tabel (copyregel 6). Geldcoach komt niet in een kop voor |
| `/inzichten/wat-kost-een-financieel-coach` | 1.085 | Wat kost een financieel coach? Tarieven in 2026 | Duidelijke opbouw, prijstabel, gratis alternatieven | Rankt op "wat kost een budgetcoach" (67 op 18,8) terwijl het woord budgetcoach niet in titel of H1 staat. De bandbreedtes (€60 tot €150 per uur, €250 tot €800) hebben geen bron en worden door AI's doorgegeven met ons als bron (CLAUDE.md regel 3). "Eerlijk is eerlijk" (copyregel 6) |
| `/financieel-coach` | 986 | Goed verdienen. Toch weinig over? | Dienstpagina met prijzen, FAQ en Service-schema; de rapportcijfers kloppen met `rapporten-data` | H1 bevat "financieel coach" niet. 1 vertoning op "financieel coach" in 90 dagen; de rest is de merknaam "jarno koopman" |
| `/inzichten/wat-kost-een-financieel-adviseur` | 1.137 | Wat kost een financieel adviseur, en heb je er echt één nodig? | | **Verzonnen klantcase.** "Lisanne (38) en Thijs (40)", €6.200 netto, "Concreet: €380/mnd bespaard", €89 aan vergeten abonnementen. Staat niet in `lib/rapporten-data.ts` en is niet als illustratie gelabeld. Dat breekt waarheidsregel 1 (verzonnen case) en 5 (beloofd bedrag). De metaDescription zet het adviesgesprek van €125 als prijskaart neer (CLAUDE.md 5). 0 vertoningen |
| `/inzichten/wat-doet-een-financieel-adviseur` | 1.031 | Wat doet een financieel adviseur, en heb jij er echt één nodig? | Beantwoordt "hoe werkt financieel advies" (62 vertoningen) | Wft-terrein, buiten het aanbod; Perplexity gebruikt hem als bron voor de definitie van een geldcoach |

## Wat er wel rankt, en waarom

| Term | Nummer 1 tot 3 | Wat die pagina doet |
|---|---|---|
| budgetcoach zonder schulden | IMW Tilburg (lokaal), **budget-kompas.nl "Budgetbeheer zonder schulden, kan dat?"** (533 woorden), mylifebudget.nl | De zoekterm letterlijk in titel en H1, koppen "Voor wie is ... geschikt?", eigen FAQ. Kort, maar exact op de vraag |
| wat kost een budgetcoach | **simpelbudgetcoaching.nl/tarieven** (bijna geen tekst, drie pakketten: Quick scan €175, Simpel €375, Uitgebreid €675, incl. btw), budget-kompas.nl "Wat kost een budgetcoach?" (677 woorden: gemiddeld €60 tot €100 per uur, trajecten €250 tot €750, vergoeding), gemeente Eindhoven | Concrete prijzen per pakket winnen van een uitleg. Het AI-overzicht citeert Independer ("€50 tot €100 per uur") |
| wat doet een budgetcoach | budgethulpnederland.nl (323 woorden), kenniscentrumsociaaldomein.nl, zzp-nederland.nl | Korte definitiepagina's met de vraag als H1 |
| geldcoach | prikkl.nl, zestor.nl (werkgeversregelingen), mijngeldcoach.nl | Merk of dienst met "geldcoach" in de naam |
| financieel coach hoger inkomen | uitkomenmetjeinkomen.nl (1.880 woorden, acht klantverhalen met naam, tellers "klanten geholpen") | Richt zich expliciet op dit segment, veel sociaal bewijs |
| budgetcoach zonder schulden (Bing) | budgetcoach.nl, **onebrokegirl.nl "Geldgeheim: Ik heb een budgetcoach, terwijl ik geen schulden heb"** (12 okt 2025), budget-kompas.nl | Een persoonlijk verhaal staat op 2 |

**Wat dat zegt.** De pagina's die ranken zijn niet langer of beter onderbouwd dan de onze. Ze zetten de zoekterm letterlijk in titel en H1, beantwoorden één vraag, en geven bij kosten concrete prijzen per pakket. Onze pagina's praten om de term heen ("iemand naar je financiën laten kijken"), zetten hem in de verkeerde pagina, of spreken hem tegen.

## Het plan: vier aanpassingen en één nieuwe pagina

Alles op bestaande URL's, behalve item 5. Geen 301's.

### 1. N4 wordt dé pagina voor "budgetcoach zonder schulden"

**Doeltermen:** budgetcoach zonder schulden; PAA "Is het mogelijk om budgetbegeleiding te krijgen zonder schulden?"; wie kan mij helpen met mijn financiën; eenmalig laten kijken zonder traject. Dezelfde URL, want hij wordt al door AI's geciteerd.

**Hoe:**

- metaTitel: "Budgetcoach zonder schulden: kan dat, en wat kost het?" (54 tekens). H1: "Budgetcoach zonder schulden: kan dat?"
- Antwoordblok van 40 tot 60 woorden, met getallen die uit item 2 komen. Concept, de bedragen volgen uit het tarievenonderzoek: "Ja. Een budgetcoach is er ook als je geen schulden hebt. Je kiest uit een traject van een paar maanden ([van] tot [tot] bij [n] aanbieders), een eenmalige check aan huis of online ([van] tot [tot]), of één keer schriftelijk laten kijken. Gratis hulp via de gemeente is bedoeld voor [bron nodig]."
- Koppen als zoekvragen, in deze volgorde:
  1. Is het mogelijk om budgetbegeleiding te krijgen zonder schulden?
  2. Wat kost een budgetcoach als je geen schulden hebt? (kort, met link naar item 2)
  3. Waar kan ik gratis een budgetcoach krijgen? (gemeente, Geldfit, werkgever: met bron, en voor wie het wel en niet bedoeld is)
  4. Kan iemand eenmalig naar mijn uitgaven kijken zonder traject?
  5. Wie kan mij helpen met mijn financiën als ik goed verdien? (de bestaande vier opties en de keuzehulp)
  6. Wat bleek bij echte huishoudens zonder schulden? (de rapporten, met `AANTAL_ZONDER_LEK` uit `rapporten-data`)
- Weg: de kop "Hoe deze pagina zich verhoudt tot de andere twee". De scheiding met de andere pagina's gaat in één zin onder de koppen, met links.
- FAQ: de vijf bestaande herschrijven op de PAA-vragen van "budgetcoach zonder schulden" en "is een budgetcoach gratis".
- Inkomende links in dezelfde deploy, met ankertekst "budgetcoach zonder schulden": vanuit het verschil-artikel, wat-kost, `/financieel-coach`, `samen-6000-euro-netto-toch-niets-over` en is-4000.
- **Beslissing voor Jarno:** mag de Geldscan met prijs in het antwoordblok staan? Dat is de plek die AI's citeren (bij de enige twee keer dat de Geldscan werd genoemd kwam hij van N4), maar CLAUDE.md 5 zegt: één Geldscan-verwijzing per artikel, in het slotblok. Variant A: de Geldscan in het antwoordblok zonder link, de link blijft in het slotblok. Variant B: niet in het antwoordblok.
- Meten: GSC op "budgetcoach zonder schulden" en "budgetbegeleiding zonder schulden", 28 dagen na livegang. En AI-testvraag 1, 4 en 5.

### 2. wat-kost-een-financieel-coach wordt "Wat kost een budgetcoach?", met een eigen tarievenonderzoek

**Doeltermen:** wat kost een budgetcoach (67 vertoningen op 18,8, onze beste kans), budgetcoach kosten (73), wie betaalt een budgetcoach (65), is een budgetcoach gratis, wat kost een financieel coach. Zelfde URL.

**Hoe:**

- **Eerst onderzoek, dan schrijven.** Op 10 tot 15 aanbiederssites de gepubliceerde prijs opzoeken, in Chrome geopend, met URL en ophaaldatum. Per aanbieder: pakketnaam, prijs, incl. of excl. btw, duur, aan huis of online, schriftelijk plan ja of nee. Al gevonden: Simpel Budgetcoaching (Quick scan €175, Simpel €375, Uitgebreid €675), Personal Budgetcoach (Quick scan €250, Grip €450, Verandering €650), Budget-Kompas (zelf: €60 tot €100 per uur, trajecten €250 tot €750), Budgetcoach Me (prijs niet openbaar), Pien's (budgetbeheer €155 per maand, geen coaching). Dat wordt het eigen cijfer met n (CLAUDE.md 8.C.10): "bij [n] aanbieders die hun prijs publiceren, opgehaald op [datum]". Geen gemiddelde onder n van 10; wel de bandbreedte en de mediaan als n het toelaat.
- Dit vervangt de ongebronde bandbreedtes. Daarmee is ook de waarheidsschuld weg die AI's nu doorgeven.
- metaTitel: "Budgetcoach kosten 2026: tarieven van [n] aanbieders" (onder 60 tekens bij n tot 99). H1: "Wat kost een budgetcoach? Tarieven in 2026".
- Koppen: Wat kost een budgetcoach per uur? / Wat kost een traject? / Wat kost een eenmalige check? / Wie betaalt een budgetcoach? (werkgever via de werkkostenregeling, gemeente via Wmo of bijzondere bijstand, UWV: alleen met bron) / Is een budgetcoach gratis? / Wat kost een financieel coach? (de oude inhoud, kort).
- Het eigen aanbod alleen in het slotblok (CLAUDE.md 5). "Eerlijk is eerlijk" eruit.
- Meten: GSC op de vier kostentermen na 28 dagen, en de AI-testvraag "Wat kost het om iemand naar je financiën te laten kijken?".

### 3. verschil-budgetcoach-financieel-coach wordt "wat doet een budgetcoach, geldcoach of financieel coach"

**Doeltermen:** wat doet een budgetcoach (90), geldcoach (33 op 17,4), wat is een geldcoach, budgetcoaching (74), verschil budgetcoach en financieel coach. Zelfde URL.

**Hoe:**

- De tegenspraak eruit: niet langer "budgetcoach = schulden", maar wat de SERP en de AI-overzichten ook zeggen: preventief én bij schulden, en het verschil zit in traject, focus en wie betaalt.
- metaTitel: "Budgetcoach, geldcoach of financieel coach: wie doet wat?" (57 tekens). H1 hetzelfde.
- Koppen: Wat doet een budgetcoach? / Wat is een geldcoach? (Google behandelt het als synoniem; zeg dat) / Wat doet een financieel coach? / Wanneer heb je een financieel adviseur nodig? (Wft, link naar `wat-doet-een-financieel-adviseur`) / Welke past bij jou? (tabel: schulden, geen schulden maar krap, vermogen).
- Geen kosten op deze pagina: één zin met een link naar item 2. Geen "voor wie zonder schulden": één zin met een link naar item 1. Zo heeft elke pagina één intentie.
- "eerlijke blik" uit de tabel.
- Meten: GSC op "wat doet een budgetcoach" en "geldcoach" na 28 dagen.

### 4. Verplicht, los van ranken: de verzonnen case uit wat-kost-een-financieel-adviseur

**Wat:** "Lisanne en Thijs" (inclusief de VoorNa-tabel met "Concreet: €380/mnd bespaard" en de koptekst "Hoe Lisanne en Thijs voor €125 meer inzicht kregen...") verwijderen, of vervangen door een echt rapport uit `rapporten-data` met bedrag. Het adviesgesprek van €125 uit de metaDescription. Dit is geen SEO-keuze: het is een harde waarheidsregel, en het staat nu live. **Voorstel: als eerste doen, dezelfde dag.**

Daarna, niet nu: `wat-kost-een-financieel-adviseur` en `wat-doet-een-financieel-adviseur` zijn Wft-terrein met samen 180 vertoningen en 0 klikken in 90 dagen. Kandidaat om samen te voegen bij de contentkill van 5 december. Beslissing aan Jarno.

### 5. `/financieel-coach`: de H1 en één FAQ

**Doeltermen:** financieel coach, financieel coach hoger inkomen.

**Hoe:** H1 "Financieel coach voor wie goed verdient en toch weinig overhoudt". De huidige H1 ("Goed verdienen. Toch weinig over?") wordt de intro. metaTitel blijft of wordt "Financieel coach bij een goed inkomen, zonder schulden" (54 tekens). Eén FAQ "Is er een financieel coach voor mensen met een hoger inkomen?", beantwoord met wat ik doe en de rapporten als bewijs, zonder onderscheidsclaim (het segment is bezet: Uitkomen met je Inkomen richt zich op inkomens vanaf €4.000). Klein, een half uur.

### 6. Nieuwe pagina, alleen als Jarno een klant zover krijgt: een echt verhaal

Het enige formaat dat de situatie van de ICP beschrijft en rankt, is een persoonlijk verhaal (onebrokegirl, Bing op 2 voor "budgetcoach zonder schulden", een tweede interview uit dezelfde reeks rankt op "ik heb geen flauw idee waar mijn geld blijft"). Een interview met een echte Geldscan-klant zonder schulden, in eigen woorden, met toestemming en met het rapport erbij. Scheiding in één zin: N4 zegt wat er bestaat, dit verhaal laat zien hoe het bij één huishouden ging. Kan niet zonder een klant die meewerkt (aanleverformat van 30 juli). **Niet bouwen met een bedachte klant** (regel 1).

## Wat ik bewust niet doe

- Geen losse pagina "budgetcoach zonder schulden": dan staan er twee pagina's op één vraag, en N4 heeft de citaties al.
- Geen plaatsnamen, geen "beste budgetcoaches"-lijst, geen vergelijkingspagina met concurrenten op naam.
- Geen onderscheidsclaims op prijs ("goedkoopste", "uniek"): het tarievenonderzoek laat zien wat anderen vragen, niet dat wij de enige zijn.
- Geen aanmelding bij vergelijkingssites of lijstjes: dat is een extern kanaal, dicht tot 31 januari 2027.

## Volgorde

| Wanneer | Wat | Waarom eerst |
|---|---|---|
| Dag 1 | Item 4: de verzonnen case eruit | Waarheidsregel, staat live |
| Dag 1 tot 2 | Tarievenonderzoek (10 tot 15 aanbieders, in Chrome, met datum) | Items 1 en 2 hebben de getallen nodig |
| Week 1 | Item 2 (wat-kost) en item 1 (N4) | Beste kans (18,8) en de pagina die AI's al citeren |
| Week 2 | Item 3 (verschil) en item 5 (`/financieel-coach`) | Ruimt de tegenspraak en de kannibalisatie op |
| Na elke publicatie | GSC indienen, Bing via IndexNow, sitemap en llms.txt controleren | CLAUDE.md 8.E |
| 28 dagen na elke publicatie | GSC per doelterm, AI-test | |

**Tempo:** vier herschreven pagina's in twee weken is precies de norm van twee per week. Doe je item 1 tot 3 in één week, dan breekt dat de tempo-regel; dat is jouw keuze.

**Een risico om te benoemen.** Het kan zijn dat Google deze pagina's na juli niet om hun inhoud liet vallen, maar omdat de site in dit taalgebied weinig gezag heeft tegenover gevestigde budgetcoachsites en gemeenten. Dan helpt herschrijven minder dan dit plan hoopt. Het plan is zo gekozen dat het ook dan iets oplevert: de waarheidsfouten zijn weg, de termen staan waar AI's ze zoeken, en Bing (waar we al hoog staan) krijgt betere pagina's.
