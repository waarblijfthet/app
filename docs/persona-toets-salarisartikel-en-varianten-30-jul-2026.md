# Het salarisartikel: persona-toets en de vraag of varianten werken (30-jul-2026)

Twee vragen. Wat doet `/inzichten/is-4000-euro-netto-goed-salaris-nederland` met de ICP's, en heeft het zin om varianten te maken voor 3.000 tot 10.000 euro netto. Vier verse persona-agents kregen de echte tekst met gemeten pixelposities. Voor de tweede vraag: live SERP-verkenning, geen keywordtool.

## Deel 1: wat de vier ICP's doen op deze pagina

| | Antwoord gevonden | Stopt bij | Bereikt de CTA op 6.006px |
|---|---|---|---|
| Petra, samen 4.200, twee kinderen | ja, na 20 seconden | 1.800px | nee |
| Niels, alleen, 3.650 | nee | 2.500px | nee |
| Sandra, samen 7.300, drie kinderen | nee | 4.500px | nee |
| Thomas, alleenstaande ouder, 4.850 | nee | leest tot het eind, vegend | ja, vegend |

### De hoofdvondst: het bedrag is de drempel niet, het huishouden is dat

Dit is het belangrijkste resultaat en het gaat rechtstreeks in tegen het idee van varianten per salarisbedrag.

Petra verdient 4.200 en rondt af zonder erover na te denken: "4.200 is 4.000. Twee kinderen heb ik ook. Klaar." Zij is de enige voor wie het bedrag past en precies daarom vertrekt ze: "De pagina werkt en verliest me door te werken."

Niels verdient 3.650 en noemt het verschil verwaarloosbaar: "350 euro minder, dat is 9 procent, dat reken ik zonder nadenken om. Dat is geen enkel bezwaar." Wat hem wel wegjaagt: "Ik ben één mens, het artikel rekent met vier. Dat verschil is veel groter dan die 350 euro en het artikel behandelt het als een detail."

Thomas kan zich niet eens plaatsen, omdat de pagina niet zegt wat er in het getal zit: "Ik heb 4.850 salaris, plus kinderbijslag, plus 420 alimentatie. Is dat 4.850, of ongeveer 5.500? Ik kan het niet gokken, want die twee antwoorden liggen 650 euro uit elkaar en dat is bij mij meer dan wat er in een maand overblijft."

Alle vier vallen dus op de huishoudsamenstelling, niemand op het bedrag. Een variant voor 3.500 of 4.500 lost het probleem op dat niemand heeft.

### De ernstigste bijwerking: de pagina diskwalificeert de beste ICP

Sandra verdient 7.300 en leest dat 4.000 met twee kinderen "soms nauwelijks voldoende" is in de Randstad. Haar conclusie: "Ik kwam op deze pagina met schaamte over dat ik het niet snap, en ik ga weg met de gedachte dat ik geen recht heb op mijn eigen vraag. Dat is niet wat er staat, maar dat is wat ik meeneem."

Ze haakt ook niet af, en dat noemt ze zelf het slechtste van de drie mogelijkheden: "Ik blijf zitten en er gebeurt niets."

### Het eerste scherm is dood gewicht

De contentaudit noemde dit al het slechtste eerste scherm van de tien. De persona's bevestigen wat dat kost. Petra: "Het eerste scherm is bij mij dood gewicht. Kop, gezicht, beloftelijstje. Wat dat met me doet: het maakt van mij een scroller in plaats van een lezer. En als ik scrol, stop ik alleen bij vetgedrukte tekst, kaders en cijfers. Dus alles wat je in gewone alinea's zet, ook als het goed is, is bij mij weg."

Niels: "Mijn scherm is ongeveer 700 pixels hoog, dus het eerste scherm is bij mij het hele scherm en daar staat een vraag, een gezicht en een lijstje beloftes. Nul informatie."

Thomas rekent het in tijd: "Van mijn tien minuten gaan er anderhalve op aan een kop van zes regels, een foto en een lijst met leerdoelen. Ik geef een pagina ongeveer twee keer scrollen om te bewijzen dat hij mijn situatie kent."

En het kader werkt tegen zichzelf. Niels: "Het vertelt me dat het antwoord verderop staat. Dan hoef ik dit stuk niet te lezen." Thomas: "Een pagina die uitlegt in plaats van rekent, staat aan de verkeerde kant van mijn vraag."

### De bronvermelding kost weer het vertrouwen in alle getallen

Vier van de vier vallen over "forums, blogs, CBS 2024" plus de zin "Geen fictieve getallen, dit is wat vergelijkbare gezinnen rapporteren". Precies hetzelfde patroon als bij het boodschappenartikel.

Sandra: "Iemand die dat opschrijft, verdedigt zich tegen een verwijt dat ik nog niet had gemaakt. Nu maak ik het wel."

Petra: "Ik ga weg met een antwoord waar ik iets minder op vertrouw dan een minuut eerder."

Thomas ziet het gevaar scherper: "Die 280 euro kinderkosten kan iemand op een forum hebben opgeschreven, en dan is het niet een norm maar een anekdote die eruitziet als een norm. Dat is nu juist het gevaarlijke soort getal, want iemand gaat mij daarmee vergelijken."

Zijn punt is bovendien feitelijk juist: kinderkosten staan op 280 euro, 7 procent, en dat is de smalle definitie waar opvang, school en sport in moeten. Hij betaalt daar alleen al meer dan het dubbele van.

### De visual heeft drie tabbladen en alle drie hebben twee volwassenen

Stel zonder kinderen, gezin met twee kinderen, gezin met drie pubers. Geen alleenstaande, geen alleenstaande ouder. Niels: "Het meest nabije is stel zonder kinderen, en een stel is twee inkomens en twee mensen die eten. Dat is niet een halve versie van mij." Thomas leest de drie tabbladen twee keer omdat hij niet gelooft dat hij er niet bij staat.

Bij Sandra doet de visual het omgekeerde van wat hij moet doen: het tabblad "drie pubers" is haar gezinssamenstelling maar met bedragen van 4.000 inkomen. "Dat is bijna erger dan als het er niet had gestaan, want ik heb even gedacht dat ik gevonden was."

### En de bedragen kloppen niet meer met je eigen benchmark

Boodschappen staan in dit artikel op 875 euro voor een gezin van vier. De herijkte `lib/benchmarks.ts` van vandaag zegt 700 basis plus 150 per kind, dus 1.000. Kinderkosten staan op 280 tegen 190 per kind in de benchmark, dus 380. Dit artikel spreekt sinds vandaag je eigen rekenmodel tegen.

## Deel 2: hebben varianten per salarisbedrag zin?

### Wat er in de SERP staat

Verkenning op 30-jul-2026 (live zoekresultaten, geen keywordtool, dus dit is een beeld van het aanbod en niet van het volume).

Rond 3.000 euro netto is het druk, en de spelers zijn allemaal van hetzelfde type: SearchX Recruitment ("Is 3000 euro netto per maand voldoende"), uitzendbureau Prestatie (twee aparte pagina's, "Is een salaris van 3000 euro netto veel" en "Is 3000 euro netto veel"), Fortus, MKB Servicedesk, Finom, Carrieretijd, ESVE Groep, plus de bruto-netto-rekenmachines van bruto-netto.nl en talent.com.

Wat die allemaal doen: het bedrag afzetten tegen het gemiddelde en concluderen dat het goed is. Het antwoord is een salarisoordeel, bedoeld voor iemand die een baan overweegt of over loon onderhandelt.

Wat geen van hen doet: uitleggen waarom het daarna toch krap voelt. Dat is de enige hoek die van jou is, en dat is precies wat het 4.000-artikel doet.

### De inkomensladder, met ICP-fit erbij

Modaal netto is in 2026 ongeveer 3.100 euro, het mediaan van werkenden ligt lager. Dat bepaalt de vorm van de vraag.

| Niveau | Wie zoekt dit | Concurrentie | ICP-fit |
|---|---|---|---|
| 2.500 tot 3.500 | sollicitanten en onderhandelaars, "verdien ik genoeg" | druk, recruitment- en salarissites | zwak, dit is onder je doelgroep |
| 4.000 | kantelpunt: van salarisoordeel naar "is dit genoeg voor mijn leven" | jij staat er, inclusief een FAQ-positie | goed |
| 4.500 tot 6.000 | huishoudens die de vraag over hun leven stellen, niet over hun loonstrook | dun, de recruitmentsites stoppen hier | best |
| 7.000 en hoger | wordt "wij verdienen samen X", niet meer "is X een goed salaris" | vrijwel leeg | goed, maar weinig vraag |

De conclusie die hieruit volgt is onaangenaam en belangrijk: **de bedragen met het meeste zoekvolume horen bij mensen die je product niet kopen, en de bedragen die bij je ICP horen hebben weinig zoekvolume.** Het 4.000-artikel zit op het kantelpunt en dat is waarschijnlijk waarom juist dat artikel werkt.

### Waarom acht varianten een slecht idee zijn

1. **Het lost de verkeerde as op.** Alle vier de persona's vielen op het huishouden, niet op het bedrag. Twee zeiden expliciet dat ze een verschil van 9 tot 15 procent zonder nadenken omrekenen.
2. **Je kopieert een kapot eerste scherm acht keer.** Dit is volgens je eigen contentaudit de slechtste bovenkant van de tien.
3. **Het botst met de afspraak van nul nieuwe artikelen tot 25-okt** uit `docs/groeibeslissing-aug-2026.md`.
4. **Onderling kannibalisme.** Acht bijna identieke pagina's over hetzelfde onderwerp met een ander getal is precies het patroon waar Google dunne content in ziet. Je hebt er nu één met een FAQ-positie; die positie is meer waard dan zeven nieuwe pagina's die om dezelfde intentie vechten.

### Wat wel kan, in volgorde

**Eerst: repareer de 4.000-pagina.** Je hebt er een FAQ-positie op, dus dit is de pagina met de hoogste hefboom die je bezit. Antwoord boven de vouw in plaats van het beloftekader, situatiekiezer met huishoudens in plaats van bedragen, de vijf echte rapporten in plaats van forumcijfers, en tabbladen voor alleenstaand en alleenstaande ouder erbij. Zelfde behandeling als het boodschappenartikel.

**Daarna: één rekenpagina in plaats van acht artikelen.** Eén pagina waar de bezoeker zijn eigen bedrag en huishouden invult en ziet wat er zou moeten overblijven. Die dekt 3.000 tot 10.000 zonder acht dunne pagina's, en hij lost het probleem op dat alle vier de persona's noemden: ze willen hun eigen situatie zien, niet een naburig voorbeeld. De rekenkern bestaat al in `lib/benchmarks.ts`.

**Alleen als je toch losse pagina's wil: kies op huishouden, niet op bedrag.** Twee kandidaten met de beste verhouding tussen vraag en ICP-fit: "wij verdienen samen 6.000 netto en houden niets over" en "alleen wonen met 3.500 tot 4.000 netto". Beide sluiten aan op een echt rapport dat je nu hebt en op een lege hoek in de SERP.

**Niet doen: 3.000 en 3.500.** Daar is het druk, de intentie is een salarisvraag en niet een huishoudvraag, en de bezoeker zit onder je doelgroep. Je hebt al `is-3000-netto-genoeg-gezin`, dat is genoeg dekking aan de onderkant.

## Wat de persona's zelf op de pagina wilden zien

Sandra, direct onder de kop en dus boven het fotootje: "Dit patroon stopt niet bij 4.000. Bij 7.000 netto met drie kinderen blijft er net zo vaak niets over, alleen om andere redenen, en die staan hieronder."

Niels, in het eerste scherm: "Woon je alleen met 3.500 tot 4.000 netto? Dan hoort er volgens deze verdeling ongeveer 900 euro over te blijven. Blijft er bij jou honderd over, dan zit het niet in je huur."

Thomas, als vierde tabblad plus in het eerste scherm: "Doe je het alleen? Dan klopt de vuistregel dat wonen 39 procent mag zijn niet, want die is gemaakt voor twee inkomens. Dat betekent niet dat je te duur woont, en ik zeg dat ook niet."

Petra, op de plek van het beloftekader: "Twee kinderen, samen ongeveer 4.200 netto: dan blijft er bij een doorsnee huishouden 505 euro over. In die 875 aan boodschappen zit ook de bezorgmaaltijd. Blijft er bij jullie niets over, dan zit het verschil bijna altijd in twee posten."

Vier verschillende zinnen, één patroon: geef mij mijn eigen situatie in het eerste scherm, en open daarna een vraag die over mij gaat.

## Kanttekening

Vier gesimuleerde lezers zijn geen vier bezoekers. En de SERP-verkenning is gedaan met een zoekmachine die niet op Nederland is ingesteld, dus het aanbod dat ik zie is indicatief en de volumes ken ik niet. Wat wel hard is: welke soort partijen deze vragen beantwoorden, en dat geen van hen jouw hoek pakt.
