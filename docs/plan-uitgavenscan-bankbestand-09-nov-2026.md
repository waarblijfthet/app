# Plan uitgavenscan op het eigen bankbestand, 9 november 2026

Besluit van Jarno op 9 november 2026, in een gesprek waarin hij de grenzen van CLAUDE.md bewust losliet ("stel, je mag alle ideeën en grenzen loslaten", daarna "ja, laten we eens zien of dit lukt"). Dit wijkt af van CLAUDE.md sectie 4 ("geen app") en van de lijst "wat niet gebouwd wordt". Het is een experiment naast de Geldscan, geen vervanging, tot de meting hieronder iets zegt.

## 1. Waarom

Uit zoekverkeer is nog nooit een Geldscan betaald. Wie zoekt, wil het zelf doen en wil vandaag antwoord; een anonieme persoon die over twee werkdagen een rapport stuurt past daar slecht bij. De gratis analyse vraagt mensen te schatten wat ze juist niet weten (81 procent kreeg de uitkomst "gat", zie sectie 44 van de bouwvolgorde). Een tool die het eigen bankbestand leest, geeft het antwoord meteen en zonder schatten.

Vertrouwen komt dan niet van een persoon maar van de techniek: alles draait in de browser, er wordt niets geüpload, geen account.

## 2. Drie vragen, één trechter

| Vraag van de bezoeker | Scherm | Gratis of betaald |
|---|---|---|
| Ik wil inzicht: hoe geef ik echt mijn geld uit? | Inzicht: per categorie per maand, grootste tegenpartijen, terugkerende kosten, één getal dat schuurt | Gratis, de ingang |
| Ik heb al een plan: klopt het met de werkelijkheid? | Plan tegenover werkelijkheid: budget plakken uit Excel (post, bedrag) of intikken, per post gepland, werkelijk, verschil | Vergelijking gratis, de drie grootste afwijkingen |
| Help me verbeteren | Potjesplan: welke rekeningen, welke vaste overboekingen op welke dag, reserve voor jaarlijkse kosten, ingevuld huishoudboekje in Excel, herinnering na 6 weken | Betaald, €19 tot €29 eenmalig via iDEAL, zonder account |

Regel: het probleem laat je gratis zien, het plan om het op te lossen kost geld. Op het conversiemoment staat het eerste potje volledig met het eigen bedrag, de rest zichtbaar maar vergrendeld. De Geldscan blijft de bovenste trede ("laat iemand het nakijken").

Let op de concurrentie van de bankapps zelf. Rabobank en ING hebben in de app al Inzicht met categorieën en budgetten (bronnen in `lib/bankapp-bronnen.ts`). Vraag 1 en 2 zijn daar dus deels al beantwoord. Het onderscheid moet zitten in: meerdere rekeningen en banken samen, beide partners samen, de jaarlijkse kosten, en het potjesplan met concrete overboekingen. Niet in een taartgrafiek.

## 3. Rekenen met regels, AI hooguit voor uitleg

Het potjesplan is rekenkunde: terugkerende posten herkennen, jaarlijkse kosten delen door twaalf, een buffer. Regels geven elke keer hetzelfde, controleerbare antwoord en alles blijft in de browser. Zodra transacties naar een AI-server gaan, vervalt de belofte dat er niets het apparaat verlaat. AI alleen later en optioneel: onduidelijke omschrijvingen indelen (alleen de omschrijvingstekst, met toestemming) of de uitleg in gewone taal schrijven op basis van uitkomsten die de regels al berekenden.

## 4. Bankbestanden

Gecontroleerd op 9 november 2026:

| Bank | Wat particulieren kunnen downloaden | Bron |
|---|---|---|
| ABN AMRO | pdf, txt, mt940, xls, camt.053, tot 18 maanden terug, ook in de app | abnamro.nl/en/personal/payments/credit-and-debit-transactions/download.html |
| SNS (de Volksbank) | pdf, CAMT.053, CSV; alle veldnamen gepubliceerd | snsbank.nl, uitleg van je transactieoverzicht in Mijn SNS |
| ING | MT940, CAMT.053, CSV (kommagescheiden), tot 18 maanden; bron gaat over zakelijke rekeningen | support.yuki.nl artikel 80000787467 |
| Rabobank | MT940, CAMT.053, CSV, maximaal 3 maanden per download; MT940 stopt 15 nov 2026; bron gaat over zakelijke rekeningen. Particuliere CSV bevestigd op 9 nov met Jarno's eigen export: één download van 1 jul t/m 8 nov, twee rekeningen in één bestand, Windows-1252 | support.yuki.nl artikel 80000787699; eigen export |

Bevestigd op 9 nov: de kopregel van de particuliere Rabobank-CSV (alle 1.303 regels gelezen, saldo klopt per rekening op de cent). Volgens Jarno biedt Rabo Online Bankieren particulieren alleen pdf en CSV (geen CAMT.053), en de Rabo App alleen pdf. **Pdf lezen is dus nodig voor mobiel.** De Rabobank-pdf wordt gelezen (`lib/bankbestand/pdf-rabobank.ts`), getest tegen de CSV van dezelfde periode: 1.303 van 1.303 boekingen gelijk op datum, bedrag en rekening, code en tegen-IBAN 100 procent, naam 97 procent (de rest is een naam over twee regels of een kasboeking). Nog niet bevestigd: wat ING aan particulieren geeft, en hoe hun pdf eruitziet.

Wat de echte export leert voor stap 2: 83 van de 1.303 boekingen gaan tussen de twee eigen rekeningen in het bestand, en code tb (overboeking) komt 542 keer voor. Overboekingen naar rekeningen die niet in het bestand staan (partner, spaarrekening elders) zijn dus het grootste risico op dubbel tellen; de tool moet vragen "is dit jullie eigen rekening?". 53 boekingen zijn identiek aan een andere op dezelfde dag en blijven terecht apart. 45 boekingen hebben geen omschrijving, wel een tegenpartij.

Aanpak:
1. CAMT.053 (ISO 20022, XML) als gemeenschappelijke basis. Eén parser voor elke bank die het aanbiedt.
2. Per bank een CSV-profiel op de kopregel. Rabobank en ING staan erin; Rabobank uit het geheugen, te bevestigen.
3. Vangnet: een onbekend bestand, ook zonder kopregel, laat de bezoeker zelf datum, bedrag en omschrijving aanwijzen.
4. Later: een knop "stuur alleen de kopregel", zodat nieuwe formaten binnenkomen zonder transacties.
5. MT940 niet: Rabobank stopt ermee en ABN en ING bieden CAMT.053 of CSV.

Bekende valkuilen: ABN TXT heeft geen kopregel; ABN CAMT kapt de naam af op 24 tekens (volledige naam in AddtlNtryInf achter /NAME/); ING zet af of bij in een aparte kolom; oudere exports zijn Windows-1252; Rabobank geeft 3 maanden per download, dus voor jaarlijkse kosten moet de tool meerdere bestanden samenvoegen zonder dubbele regels.

## 5. Mobiel

68 procent van het verkeer is mobiel. Een bankbestand downloaden en uploaden op de telefoon kan technisch (de bestandskiezer van iOS en Android leest Downloads en Bestanden). In de ABN AMRO-app kan het in vijf formaten, in de Rabo App alleen als pdf (Jarno, 9 nov). Voor ING is het niet bevestigd. Omdat de app vaak alleen een pdf geeft, leest de tool pdf's: per bank een eigen lezer op de kolomopmaak, eerst Rabobank. pdf.js wordt zelf geserveerd uit `public/pdfjs/` (legacy-build, voor oudere Safari) en laadt pas als iemand een pdf kiest. Het blijft omslachtig: app openen, downloaden, opslaan, terug naar de browser, kiezen.

Aanpak:
- Op mobiel drie wegen: (a) "heb je het bestand al, kies het hier", (b) "stuur me de link voor op mijn laptop" (vraagt een e-mailadres, en dat is meteen de natuurlijke vastlegging die nu ontbreekt), (c) de bestaande analyse met schattingen als lichte versie.
- Per bank een korte uitleg "zo download je het op je telefoon", pas zodra die stappen gecontroleerd zijn.
- PSD2 (de bank direct koppelen) is de echte mobiele oplossing, maar nu niet: het breekt de belofte dat niets het apparaat verlaat, kost geld per gekoppelde rekening, en de gratis route is dicht (GoCardless Bank Account Data, voorheen Nordigen, neemt geen nieuwe klanten aan; Enable Banking is gratis alleen voor eigen rekeningen, productie vraagt een contract). Bronnen: openbankingtracker.com/guides/free-open-banking-apis (8 jun 2026) en dev.to/johnfrandsen, gocardless-bank-account-data-alternatives (7 nov 2026, auteur bouwt zelf een aanbieder). Pas heroverwegen als uploads op desktop bewijzen dat er vraag is.

## 6. Bouwvolgorde

| Stap | Wat | Status |
|---|---|---|
| 1 | Inleeslaag: CAMT.053, Rabobank- en ING-CSV, Rabobank-pdf, vangnet met kolomkeuze, ontdubbelen over bestanden (`lib/bankbestand/`) | Gebouwd 9 nov, 12 tests groen, Rabobank-csv en -pdf getest op echte exports, nog geen pagina |
| 2 | Eigen overboekingen herkennen (spaarrekening, partner), categorieën in lagen (naam, IBAN van de incassant, transactiecode, zelf indelen), terugkerende posten; scherm Inzicht; testen op Jarno's eigen Rabobank-data | Volgende |
| 3 | Plan tegenover werkelijkheid | |
| 4 | Potjesplan, vergrendeling, iDEAL via Mollie, Excel-export | |
| 5 | Meer banken via kopregels van testers en het vangnet; pdf-lezers voor ING en ABN AMRO zodra er een voorbeeld is; mobiele uitleg per bank | |

Na stap 2 kan het live voor Rabobank-klanten, en via het vangnet voor iedereen.

De vergrendeling in stap 4 is in de browser te omzeilen met ontwikkelaarstools. Bij €19 accepteren we dat; het alternatief (totalen naar een server voor een pdf) breekt de belofte half.

## 7. Wat we meten

Uploads, hoeveel bezoekers het vergrendelde plan zien, hoeveel daarvan betalen. Schuurt het getal uit het inzichtscherm niet hard genoeg, dan pas je dat getal aan, niet de prijs. Meten via het bestaande `PageTracker`-patroon, alleen gebeurtenissen en nooit bedragen of omschrijvingen.

Verwachting om eerlijk naast te leggen: bij duizend uploads per maand en 3 procent die €29 betaalt is dat ongeveer €900 per maand. De 100 Geldscans vóór 31 januari 2027 haal je hier niet mee; dit is een plan voor 2027.

## 8. Besluiten van Jarno later op 9 november

1. **Geen KvK, geen Mollie, tot er tractie is.** Dus nog geen echte betaling in het scherm.
2. **Betaaltest met een knop die nog niet afrekent.** Na het probleemscherm staat het plan half open (eerste potje met bedrag, de rest vergrendeld) met de knop "Bekijk je volledige plan · € 5". Wie klikt, krijgt meteen te horen dat betalen nog niet kan en krijgt het plan gratis. Meten: hoeveel van wie het slot ziet, klikt, en hoeveel afhaakt zonder klik. Voorgestelde grens voor echte betaling (KvK en Mollie): minstens 1 op 10 klikt, bij minstens 30 mensen die het slot zagen. Geen handmatige ontgrendelcode: het plan wordt in de browser berekend, wie moet wachten haakt af.
3. **Rekenen met regels, schrijven met AI (Claude API).** De browser maakt een samenvatting zonder IBANs, omschrijvingen, datums (alleen maanden) en zonder namen van personen; bedragen afgerond per categorie per maand. Een serverroute stuurt die naar Claude en slaat niets op. Het antwoord heeft een vaste vorm (kern, drie dingen die opvallen, plan per potje, eerste stap, wat goed gaat); bedragen verwijzen naar berekende getallen en worden door de code ingevuld, de AI verzint geen getallen. De AI-aanroep gebeurt pas na de klik op € 5. De bezoeker kan zien wat er verstuurd wordt.
4. **Naam: "Voorlopig advies", met de regel "Automatisch opgesteld uit je eigen cijfers".** Niet hard "AI" in beeld. Het advies spreekt nooit in de ik-vorm en draagt geen naam of foto van Jarno; de ik-vorm staat alleen bij de Geldscan ("Wil je dat ik het nakijk?"). Het uitklapblok bij de betaalknop en de privacypagina noemen wel dat een AI-dienst (Anthropic) de samenvatting verwerkt. Dit wijkt bewust af van CLAUDE.md ("geen AI-rapport"). Nog na te gaan vóór livegang: wat Anthropic met API-gegevens doet, en of de AI-verordening hier een expliciete vermelding eist.
5. **De gratis analyse blijft**, als route zonder bestand (mobiel, of wie geen bankgegevens wil gebruiken), met op de uitkomst een verwijzing naar de uitgavenscan.
6. **Concurrent: Summas (summas.nl, bèta, eenmanszaak).** Leest dezelfde bankexports (geen pdf), slaat data op in de cloud, abonnement van ongeveer € 3 tot € 8 per maand. Jarno: "te massaal, te veel abonnementsvormen". Ons verschil: geen app, geen abonnement, één plan dat je zelf in je bankapp zet, pdf uit de Rabo App, afschrift blijft op het apparaat. Inzicht dus klein houden, geen dashboard of budgettracker bouwen.
7. **Eerst ontwerpen, dan bouwen.** Acht schermen, desktop en mobiel naast elkaar, in een Claude Design-canvas "Uitgavenscan schermen" (claude.ai, privé artifact van Jarno): start, stap 1 tot 5 (afschrift, eigen rekeningen, inkomen, waar het heen gaat, plan vergrendeld), na de klik, voorlopig advies. Alle bedragen in het ontwerp zijn voorbeelden.
8. **Vervangt punt 2 en 3 deels: de uitgavenscan wordt de nieuwe Geldscan.** Gratis en direct: inzicht plus een kort voorlopig advies (kern, drie dingen die opvallen, wat goed gaat), dynamisch geschreven door Claude op de samenvatting, na een melding vóór het versturen. Betaald: de Geldscan, € 49, een plan op maat dat de AI opstelt uit de cijfers en drie extra vragen (doel, wie regelt het geld, wat voelt krap), door Jarno nagekeken, binnen 24 uur na betaling. Betalen via het bestaande betaalverzoek (Tikkie of overboeking), dus geen Mollie nodig. De samenvatting (zonder namen en rekeningnummers) wordt met toestemming bewaard tot levering en daarna door code verwijderd. AI stelt potjes en verdeling voor, code controleert dat alles optelt en herleidbaar is. Twee routes naar dezelfde Geldscan: het afschrift (voorkeur) of de gratis analyse met schattingen. De betaaltest van € 5 vervalt.
9. **Stap 1 is een wizard, één keuze per scherm, zoals de analyse** (Jarno): 1a bank kiezen (lijst met logo, een tik gaat door), 1b waar download je het (computer of telefoon, het huidige apparaat gemarkeerd; op mobiel kan "op mijn computer" de link mailen), 1c de stappen voor die bank op dat apparaat plus één knop "Kies het bestand", 1d gelezen (rekeningen gevonden, nog een rekening toevoegen, verder). Echte banklogo's alleen uit de perskit van de bank of met toestemming. De stappen per bank moeten nog met de hand gecontroleerd worden, met schermafbeeldingen.

