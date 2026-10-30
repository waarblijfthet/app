# Introscherm van de analyse: wat er staat, wat de ICP ziet, wat er te winnen is, 30 oktober 2026

Vraag van Jarno: onderzoek het introscherm van /analyse, vooral op mobiel. Cijfers uit de admin-API's in productie (30 okt, periode maand, eigen tests eruit). Het scherm zelf bekeken in de ingebouwde browser op 375 bij 812 pixels. Niets gebouwd.

## 1. De cijfers

| Laatste 30 dagen | Mobiel | Desktop |
|---|---|---|
| Weergaven van /analyse | 108 | 67 |
| Gestart (eerste vraag in beeld) | 32 | 29 |
| Resultaat gezien | 21 | 23 |
| Start per weergave, ongeveer | 30 procent | 43 procent |
| Resultaat per weergave, ongeveer | 19 procent | 34 procent |

Samen 149 unieke sessies op /analyse en 61 starts: ongeveer 4 op 10. Weergaven per apparaat zijn geen unieke sessies, dus de percentages per apparaat zijn een benadering. Het verlies op mobiel zit op beide stappen, maar het grootst vóór de start.

**Wie op het introscherm komt, heeft al geklikt.** Van de starters sinds 12 oktober landden er 4 op /analyse zelf en 3 op de homepage; de rest kwam uit een artikel. Op het artikel over kindgebonden budget staat de knop "Bekijk mijn financiële situatie →" (op ongeveer 5.600 pixels). Wie daarop tikt, krijgt een pagina met bovenaan... dezelfde knop met dezelfde tekst.

## 2. Wat er staat, op mobiel

- 5.614 pixels hoog, ongeveer zeven schermen, 346 woorden, twee knoppen (op 436 en 4.400 pixels).
- Scherm 1: eyebrow, kop "Hoe staat jouw huishouden er financieel voor?", subregel "Ontdek hoeveel geld er per maand verdwijnt zonder dat je weet waarheen...", knop, en "± 2 minuten · gratis · anoniem · geen bankgegevens". De knop staat boven de vouw.
- Daarna: een voorbeeldresultaat, drie kaarten "Wat krijg je te zien?", hetzelfde voorbeeldresultaat nog eens groot, "Dit is voor jou als...", "Je hoeft niets voor te bereiden" (met "Een schatting is genoeg", op ongeveer 3.250 pixels), "Een bedrag op zichzelf zegt weinig", en de tweede knop.

**Drie dingen kloppen niet met wat er daarna gebeurt.**
1. **"± 2 minuten".** Wie afrondt doet er mediaan 3,4 minuten over (sinds 7 sep), over ongeveer 25 tot 30 schermen.
2. **Het voorbeeld toont de oude uitkomst.** "€1.650 tegenover €2.050 bij vergelijkbare huishoudens, €400 minder, boodschappen + €180". Sinds 12 oktober opent het resultaat met papier tegenover echt en het gat. De bezoeker krijgt iets anders dan hem getoond is.
3. **"Een schatting is genoeg" staat diep weg.** Juist het inkomensblok is waar 8 van de 17 afhakers stoppen (bouwvolgorde sectie 42). Op desktop valt 57 procent van de kijktijd boven de vouw en 74 procent in de eerste twee schermen (NN/g, 2018, 120 deelnemers, desktop: https://www.nngroup.com/articles/scrolling-and-attention/, opgehaald 30 okt). Op mobiel is dat niet gemeten, maar waarschijnlijk niet gunstiger.

## 3. Wat de ICP denkt, met de telefoon in de hand

Sandra komt van het artikel over kindgebonden budget, net gelezen dat het ongeveer €29 per maand minder wordt, en tikt op "Bekijk mijn financiële situatie".

- "Ik had toch al op bekijken gedrukt?" Ze krijgt een verkooppagina voor iets waar ze net ja op zei.
- De subregel raakt: "geld verdwijnt zonder dat je weet waarheen" is precies haar gevoel.
- "Twee minuten, gratis, anoniem" stelt gerust. Wat ze niet weet: moet ze haar loonstrook erbij pakken? Het antwoord staat vijf schermen lager.
- Het voorbeeld zegt "€400 minder dan vergelijkbare huishoudens, boodschappen + €180". Voor iemand die krap zit leest dat als een oordeel vooraf ("je doet boodschappen te duur"), en het is niet wat ze straks krijgt.
- Scrolt ze door, dan ziet ze hetzelfde voorbeeld nog een keer en vier blokken die zeggen wat ze al gelezen heeft.

Dit is een inschatting, geen meting. Persona-toetsen zijn geparkeerd (CLAUDE.md sectie 4); de meting na een wijziging beslist.

## 4. Wat er te winnen is, in volgorde

1. **De eerste vraag in plaats van de knop.** Op scherm 1 staat direct "Hoe is het meestal aan het eind van de maand?" met drie knoppen (ruim, net genoeg, te weinig). Een tik is meteen start en eerste antwoord. Weg is de dubbele klik, en de eerste stap is de kleinst denkbare (foot-in-the-door; ook het advies van quizbouwers om met de makkelijkste, concrete vraag te beginnen: https://www.convertflow.com/blog/how-to-fix-ecommerce-quiz-funnel-drop-off-in-2026, leverancier). Rekensom, als aanname: van 4 naar 6 op 10 sessies die starten is ongeveer 30 starts per maand extra, waarvan op de huidige verhouding de helft krap.
2. **De microregel eerlijk en nuttig.** "± 3 minuten · een schatting is genoeg, je hoeft niets op te zoeken · anoniem, geen bankgegevens". Dat raakt het inkomensblok, waar de afhakers zitten, en zegt de waarheid over de duur.
3. **Mobiel inkorten tot ongeveer twee schermen.** Het tweede voorbeeld, "Een bedrag op zichzelf zegt weinig" en de herhalingen eruit; "Dit is voor jou als" kort houden. Desktop mag de brede versie houden.
4. **Het voorbeeld laat het echte resultaat zien:** op papier over, echt over, en het bedrag dat niet aan te wijzen is, met het label "voorbeeld". Geen post die als te duur wordt aangewezen.

**Meten:** start per sessie op /analyse, per apparaat. Dat staat nu niet in de admin (de bezoeken aan /analyse hebben geen apparaat in de API); toevoegen hoort bij de bouw. Vergelijken over vier weken voor en na.

**Let op twee regels.** CLAUDE.md "Wat niet gebouwd wordt" noemt een herontwerp van de "hero"; dat gaat over de sitebrede hero en de homepage, maar Jarno beslist of dit introscherm eronder valt. En de lezing van 15 december (resultaatscherm) wordt iets minder zuiver als er tegelijk meer en andere starters binnenkomen; per groep tellen houdt dat beheersbaar.
