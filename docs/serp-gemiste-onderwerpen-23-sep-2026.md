# Gemiste zoekonderwerpen, 23 september 2026

Op verzoek van Jarno: welke zoekwoorden, vragen en AI-zoekopdrachten bestaan wel, maar hebben we de afgelopen maanden gemist? Niet opnieuw gedaan wat al in `serp-brainstorm-18-aug-2026.md` (107 zoekzinnen), `serp-invalshoeken-06-sep-2026.md`, `serp-cluster-z-06-sep-2026.md` en `serp-hubs-06-sep-2026.md` staat. Getoetst tegen de 97 artikelen in `lib/inzichten-data.ts` en de "niet bouwen"-lijst in CLAUDE.md.

## Werkwijze en bronnen

Alles opgehaald op 23 september 2026, in Chrome op google.nl (hl=nl, gl=nl), zoals CLAUDE.md 8.A.1 voorschrijft. Niet met de WebSearch-tool.

1. **Google-autocomplete.** Ongeveer 80 startzinnen, vergeleken met de onderwerpen die we al hebben.
2. **Google-zoekresultaten.** 15 zoektermen, per term:
   - of er een AI-overzicht staat;
   - wat er in "Meer om te vragen" staat;
   - wat er in "Mensen zoeken ook naar" staat;
   - welke sites de top 7 bezetten.
3. **Search Console, de laatste 28 dagen.** De 1.000 zoekopdrachten waarop de site vertoond wordt (602 klikken, 25.100 vertoningen). Daarmee getoetst of we ergens al voor vertoond worden.
4. **Google Trends, Nederland, 12 maanden.** Eén vergelijking gelukt. Daarna blokkeerde Trends verdere verzoeken.
5. **Perplexity.** Twee vragen in de vorm waarin mensen ze aan een AI stellen.
6. **Eigen kennis** van de vragen die mensen over geld aan een AI stellen, alleen als startpunt voor de toetsing hierboven.

**Over volumes.** Er is geen keywordtool (CLAUDE.md 8.A.3). Keyword Planner was alleen bereikbaar via Google Ads-accounts van andere bedrijven, en die heb ik niet gebruikt. Daarom staan volumes hier als **klasse, met de basis erbij**, niet als verzonnen getal.

- **Anker.** De pagina is-4000 krijgt op gemiddelde positie 3,6 ongeveer 3.900 vertoningen per maand (`gsc-nulmeting-05-sep-2026.md`: 11.804 in 90 dagen). "4000 netto" is dus ruwweg een cluster van 3.000 tot 5.000 zoekopdrachten per maand.
- **Trends ten opzichte van dat anker:**

| Zoekterm | Gemiddelde Trends-index |
|---|---:|
| 4000 netto | 21 |
| middenklasse | 49 |
| gezamenlijk inkomen | 3 |
| top 10 procent inkomen | 0 |
| vaste lasten gezin | 0 |

  0 betekent: te weinig zoekvolume voor Trends, niet: nul.
- **Klassen:**

| Klasse | Zoekopdrachten per maand |
|---|---|
| klein | minder dan ongeveer 300 |
| middel | ongeveer 300 tot 1.500 |
| groot | meer dan ongeveer 1.500 |

## Top 10

| # | Onderwerp en zoektermen | Wat we missen | Volume (schatting) | Wat we ermee doen |
|---|---|---|---|---|
| 1 | **Waar sta ik met mijn inkomen?** top 10 procent inkomen nederland, hogere middenklasse inkomen nederland, behoor ik tot de middenklasse, ben ik rijk of arm (test), hoeveel mensen verdienen meer dan 100.000 | Nul vertoningen in GSC. Er is geen pagina die per huishoudtype in netto per maand zegt waar je staat. | **Groot** als cluster. Trends: middenklasse ongeveer 2x "4000 netto", maar breed. Losse termen middel. | Nieuwe pijler met de verdeling van het gestandaardiseerd inkomen van het CBS, vertaald naar netto per maand per huishouden. Links vanuit is-4000, is-5000 en samen-6000. Herstelt ook de "top 25 procent"-claim die op 6 september uit is-4000 ging. |
| 2 | **Gezamenlijk inkomen:** wat is een goed gezamenlijk inkomen, is 7000 netto gezinsinkomen veel, gezamenlijk inkomen 100.000 bruto | Reddit r/geldzaken staat op 1. Wij staan niet in de top 7. | **Middel**. Trends: "gezamenlijk inkomen" 3 tegen 21 voor het anker, dus ongeveer 400 tot 700 per maand. | Als stellen-sectie in de pijler van #1, plus "Is 7000 netto gezinsinkomen veel?" als FAQ op samen-6000. Geen losse 7.000-pagina, want bedragen boven 6.500 bouwen we niet (CLAUDE.md 8.B.7). |
| 3 | **Gemiddelde uitgaven per maand 2 personen**, plus "hoeveel geld heb je nodig per maand voor 2 personen" | Het is precies de zoekterm van de geplande hub H2 (stel zonder kinderen), maar die heeft nog geen geverifieerde hoofdterm. De top 7 is Nibud, Reddit, FinBuddy, NN, hypotheek.nl en blogs. | **Middel tot groot**. Hoog in de autocomplete, AI-overzicht aanwezig. | De hoofdterm van H2. Met het rapport `stel-zonder-kinderen` (geen lek) als eigen bewijs. |
| 4 | **Gemiddelde vaste lasten gezin 4 personen**, 2 personen, 1 persoon | `wat-zijn-normale-vaste-lasten-gezin` heeft nul vertoningen. `vaste-lasten-overzicht-maken` staat voor "vaste lasten overzicht" op positie 43 (121 vertoningen). De top 7 is FinBuddy, Nibud, Dyme, Slimster, Kekmama en Knab: geen eigen cijfers. | **Middel tot groot**. Vier varianten in de autocomplete, AI-overzicht aanwezig. | De bestaande pagina herbouwen tot "gemiddelde vaste lasten per huishoudtype", met een tabel uit de rekenlaag en de rapporten. Of hem samenvoegen met H1, dat was toch al de vraag voor 4 oktober. Geen nieuwe URL. |
| 5 | **Nettoloon januari 2027:** netto salaris januari, heb je dit salaris dan houd je volgend jaar netto minder over (AD), arbeidskorting 2027 | Alleen nieuws en rekentools, niemand rekent het per huishouden door. Z2b ("wat houd ik over in 2027") viel op 6 september af op te weinig signaal; sinds Prinsjesdag is dat signaal er wel (AD, Salaris Vanmorgen, NU.nl). | **Groot in december en januari**, klein daarbuiten. In de autocomplete staat "netto salaris januari 2026", dus de vraag komt elk jaar terug. `netto-loonsverhoging-berekenen` had 2.844 vertoningen in 90 dagen. | Een sectie "januari 2027" op `netto-loonsverhoging-berekenen`, met definitieve cijfers en varianten van 3.500 tot 6.500 netto. Live begin december, samen met de 2027-sweep. |
| 6 | **Wat wordt duurder in 2027** | De zoekresultaten tonen belastingplan-, accijns- en autonieuws. Er is geen overzicht per huishouden. | **Groot rond de jaarwisseling** (hij staat al in de autocomplete). | Een sectie "wat wordt duurder" in `wat-verandert-er-2027-gezinnen-goed-inkomen`, geen nieuwe pagina (anders kannibalisatie). Mee in de sweep van 8 december. |
| 7 | **Hoeveel geld moet je overhouden per maand**, na vaste lasten, na huur | Reddit staat op 1. `hoeveel-geld-overhouden-einde-maand` staat niet in de top 7; op "…na vaste lasten" positie 53. | **Middel**. Drie varianten in de autocomplete. | CTR- en antwoordronde op de bestaande pagina: de metaTitel letterlijk op de vraag, een antwoord met getal per huishoudtype, en een eigen cijfer met n. |
| 8 | **Onderhoud huis per maand reserveren**, onderhoudskosten huis, geen geld voor onderhoud huis | Nul vertoningen. De top 7 is Eigen Huis, Raisin, Reddit en makelaars. Het is een klassieke verborgen jaaruitgave, en het rapport tweeverdieners-drie-kinderen laat bijna €1.000 per maand aan voorspelbare jaaruitgaven zien. | **Middel**. Vijf varianten in de autocomplete en in "Meer om te vragen". | Nieuwe spaak onder H1 (koopwoning). Het eigen rapport is het bewijs, Eigen Huis de bron. Analyse-CTA: "tel je jaarlijkse kosten mee". |
| 9 | **Vragen in AI-vorm:** "wij verdienen samen X netto met kinderen en houden niets over, is dat normaal?" | Perplexity citeert voor die vraag al alleen waarblijfthet.nl. Bij "met welk netto inkomen hoor je bij de hogere middenklasse?" citeert hij webwoordenboek, met een bedrag (€3.000 tot €4.800 voor een gezin) dat geen rekening houdt met de grootte van het huishouden. | Niet te meten. Volgens de nulmeting komt 0,1 tot 0,5 procent van het verkeer uit AI, maar dit is de vorm waarin de vraag steeds vaker gesteld wordt. | Antwoordblokken en FAQ's in de letterlijke vraagvorm op samen-6000, is-5000 en de pijler van #1. Deze twee vragen toevoegen aan de maandelijkse AI-test (CLAUDE.md 8.E.21). |
| 10 | **Wat kost een baby per maand**, het eerste kind financieel | Stond in de longlist (#95), nooit gebouwd. AI-overzicht aanwezig. De top 7 is babysites, Nibud, ASN en Raisin: allemaal kosten van het kind, niemand kijkt naar wat er met het huishoudbudget gebeurt (minder werken, opvang). | **Groot** (babyonderwerpen), maar met de laagste ICP-fit van de tien. | Alleen als spaak onder H1, vanuit het tweede inkomen en de kinderopvang (sluit aan op de bestaande 2027-artikelen), niet als babykostenlijst. Laagste prioriteit. |

## Een vraag die op bijna elke pagina terugkomt

In "Meer om te vragen" kwam **"Kun je rondkomen van 3000 euro per maand?"** terug op 5 van de 15 zoekresultaten: vaste lasten, overhouden, gezamenlijk inkomen, uitgaven voor 2 personen en geld nodig per maand. `is-3000-netto-genoeg-gezin` staat al op positie 5,3. Een antwoordblok dat letterlijk die vraag beantwoordt, is de goedkoopste manier om in veel zoekresultaten tegelijk te verschijnen. Hetzelfde geldt voor "Is €5000 netto een goed salaris?" en "Is 7000 netto gezinsinkomen veel?".

## Al eerder gevonden, nog niet gebouwd

Uit de brainstorm van 18 augustus, met hoge scores, nog open: wat kost een studerend kind dat thuis woont (#54, score 33), leven op je maximale hypotheek (#34, 32), hypotheeklasten te hoog (#36, 31), wat scheelt 1 dag minder werken (#30, 30,5), twee auto's te duur (#75, 29). Die zijn niet gemist, alleen niet uitgevoerd.

## Bewust niet in de top 10

- **Gemiddeld spaargeld per leeftijd.** Bezet door banken en fintech (Knab, Raisin, NN, De Jonge Belegger), met een AI-overzicht. Weinig ruimte, en een middelmatige ICP-fit.
- **Hoeveel geld heb je nodig per maand om van te leven.** Nibud-terrein, en het gaat om minimumbudgetten.
- **Huurverhoging, kinderbijslag, eigen risico en zorgpremie 2027.** Bestaan in de autocomplete, maar zijn nieuws- en uitvoerderterrein. De zorgpremie staat al gepland (Z1, 12 november).
- **Pensioen en het nieuwe stelsel.** De zoekvragen komen van gepensioneerden, niet van de ICP.
- **Hoeveel moet je verdienen voor een hypotheek van X.** Hypotheekrekenaar, staat op de niet-bouwen-lijst.

## Volgorde (voorstel)

1. Nu, binnen de tempo-regel:
   - H2 bouwen op "gemiddelde uitgaven per maand 2 personen" (#3);
   - de antwoordblok-ronde op bestaande pagina's (#7, en de vragen "3000", "5000" en "7000").
2. Daarna de pijler "waar sta ik met mijn inkomen" (#1, met #2 erin).
3. De herbouw van de vaste-lastenpagina (#4) bij de beslissing van 4 oktober.
4. Begin december: #5 en #6 in de 2027-sweep.
5. Later: #8 en #10 als spaken onder H1.

Elke nieuwe pagina eerst langs de GSC-filter en het volledige paginapakket (CLAUDE.md sectie 8).
