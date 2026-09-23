# Conversie na het resultaat: hoe het nu gaat, hoe het anders kan en waarom

23 september 2026. Aanleiding: ongeveer 80 procent van wie de analyse start ziet het resultaat, maar vrijwel niemand laat een e-mailadres achter en niemand koopt de Geldscan. Vraag van Jarno: welke technieken kunnen dat veranderen, binnen de regels van CLAUDE.md (geen verzonnen urgentie, geen garanties, geen bespaartips, geen verzonnen bewijs).

**Het belangrijkste voorbehoud vooraf.** Er zien ongeveer 40 mensen per maand het resultaat. Dat is te weinig om iets statistisch te testen. Elke wijziging hieronder is dus een voor-en-na-proef van 3 tot 6 weken, één wijziging tegelijk (CLAUDE.md sectie 5), geteld in absolute aantallen per stap op `/admin/analyse-verloop`.

## 1. Hoe het nu gaat

Het resultaat bestaat uit vier stappen (`app/analyse/stappen/Stap6Resultaat.tsx`):

| Stap | Wat de bezoeker ziet | Actie |
|---|---|---|
| 1 | Conclusiekop plus de geschatte financiële ruimte naast de verwachting voor een vergelijkbaar huishouden | knop naar stap 2 |
| 2 | De twee of drie posten die het meest afwijken, met balken | knop naar stap 3 |
| 3 | Alleen tekst: "cijfers vertellen nog niet of dit een probleem is", met de uitleg over hoge uitgaven | knop naar stap 4 |
| 4 | Het aanbod: Geldscan €49 als grote knop, de bewijsregel uit `lib/rapporten-data.ts`, daaronder een kleine grijze link "Ik wil mijn gratis uitkomst alleen bewaren" | Geldscan of e-mail |

Vijf dingen daaraan verklaren de nul waarschijnlijk:

1. **Het gratis resultaat beantwoordt de vraag al.** Wie op "wat geeft een gezin uit" zoekt en het resultaat ziet, weet genoeg. Dat is geen fout, maar het betekent dat de Geldscan iets anders moet beloven dan "meer van hetzelfde".
2. **De pitch past vaak niet bij de uitkomst.** Stap 3 gaat over hoge uitgaven ("Hoge uitgaven kunnen prima passen..."). De analyse van 23 september 08:24 die Jarno bekeek kreeg "meer over dan verwacht" (€1.403 tegen een verwachting van €583), en alle drie de afwijkingen waren lager of gelijk. Voor die bezoeker gaat stap 3 over iemand anders. Hoeveel afronders zo'n uitkomst krijgen, laat het nieuwe blok "Welke uitkomst de afronders kregen" op `/admin/analyse-verloop` vanaf nu zien.
3. **E-mail heeft geen reden.** Het enige aanbod is "alleen bewaren" wat je net hebt gezien, verstopt in een kleine grijze link op stap 4, met daarachter een verplicht vinkje. Er valt niets te winnen.
4. **De sprong van gratis naar €49 is groot, zonder tussenstap.** Er is geen gratis middenstap en geen opvolging: de drie opvolgmails uit CLAUDE.md sectie 5 (dag 0, 3 en 8) zijn nooit gebouwd. Alleen de resultaatmail bestaat (`/api/send-resultaat`).
5. **We wisten niet eens of mensen stap 4 bereiken.** Tot vandaag werd alleen "resultaat gezien" gemeten. Sinds 23 september staat per bezoeker welke resultaatstap in beeld kwam, of het bewaarformulier werd geopend, of er een e-mailadres werd achtergelaten en of er op de Geldscan werd geklikt.

## 2. Wat het onderzoek zegt

Bronnen opgehaald op 23 september 2026. Leveranciersstatistieken zijn als zodanig gemarkeerd; die zijn marketing, geen onderzoek.

- **Gated of niet.** Quizplatforms melden 33 tot 40 procent e-mail per start, maar vrijwel al die quizzen zetten het resultaat achter het e-mailveld (leverancier: Interact, "Quiz conversion rate report", bijgewerkt 8 sep 2026, tryinteract.com/blog/quiz-conversion-rate-report; LeadQuizzes, apr 2026). ConvertFlow (leverancier, jul 2026) ziet dat een gate vóór het resultaat 30 tot 50 procent van de afronders kost, en dat een gate erna minder e-mails maar meer aankopen geeft. Er is geen onafhankelijk onderzoek dat gated, ongated en half-gated resultaten vergelijkt. Het resultaat helemaal achter een e-mailveld zetten past niet bij "het werk ligt vooraf op tafel"; een eerlijke tussenvorm wel: kop en grootste afwijkingen gratis, iets wat echt extra is per mail.
- **Kleine eerste stap.** Foot-in-the-door werkt, maar bescheiden en alleen als de eerste stap iets zegt over wie je bent (Burger 1999, review, pubmed.ncbi.nlm.nih.gov/15661679). Een vraag met één tik, zoals "klopt dit met hoe het voelt?", is zo'n stap.
- **Voortgang die al gemaakt is.** In een veldexperiment maakte 34 procent een spaarkaart af die met 2 van de 10 stempels begon, tegen 19 procent bij een lege kaart van 8 (Nunes en Drèze, Journal of Consumer Research 2006, papers.ssrn.com/sol3/papers.cfm?abstract_id=991962). Wie 25 schermen heeft ingevuld, heeft veel geïnvesteerd; het e-mailveld kan als de laatste stap van dat werk voelen.
- **Het Zeigarnik-effect (onafgemaakte taken beter onthouden) houdt geen stand** in een meta-analyse uit 2025 (nature.com/articles/s41599-025-05000-w). Nieuwsgierigheid naar het "waarom" is een eerlijker haak: die vraag is echt open, er wordt niets achtergehouden.
- **Van gratis naar betaald valt meer weg dan je zou denken** (zero-price effect, Shampanier, Mazar en Ariely, Marketing Science 2007). Een gratis tussenstap werkt beter dan een goedkoop lokproduct van een paar euro, en past beter bij het merk.
- **Achteraf betalen verlaagt het risico zonder garantie.** Mensen betalen meer als ze beslissen na ontvangst, als ze de waarde hoog vinden (KC, Mak en Ofek, Journal of Marketing 2023).
- **Een paar echte, specifieke voorbeelden wegen zwaar.** Bij producten maakten de eerste vijf reviews de kans op aankoop veel groter, en sterker bij duurdere producten (Spiegel Research Center, Northwestern). Dat gaat over reviews, niet over rapporten, dus alleen als richting: één echt fragment dat past bij het huishouden van de bezoeker zegt meer dan een algemene regel.
- **Opvolgmails.** Welkomstreeksen leveren per mail veel meer op dan losse nieuwsbrieven (leverancier, Stripo benchmark mei 2026, vooral e-commerce). Voor quizzen is geen onafhankelijk cijfer gevonden. Bij deze funnel is het aannemelijk dat de meeste kopers via de opvolging komen, omdat het resultaatscherm zelf nul oplevert.
- **Het verplichte vinkje is waarschijnlijk niet nodig.** Het resultaat mailen op verzoek van de bezoeker valt onder "uitvoering van een verzoek" (AVG artikel 6 lid 1 sub b). De EDPB noemt toestemming daarvoor niet de juiste grondslag en noemt het koppelen van een dienst aan onnodige toestemming onwenselijk (Richtlijnen 05/2020, punt 26 tot 31, edpb.europa.eu). Opvolgmails met het aanbod zijn wel direct marketing (Telecommunicatiewet 11.7): daarvoor een los, niet-aangevinkt vinkje. Dit is geen juridisch advies; laat het checken.
- **Mobiel formulier** (68 procent van het verkeer): label boven het veld, `type="email"` en `autocomplete="email"`, geen autocorrectie, knop in beeld boven het toetsenbord (NN/g mobile input checklist; Baymard over verplichte en optionele velden).

## 3. Hoe het anders kan, in volgorde

| # | Wijziging | Waarom | Meten op |
|---|---|---|---|
| 0 | **Eerst een week meten** (gebouwd op 23 sep). | Zonder te weten of mensen stap 4 halen, is elke wijziging gokken. | Aanbodscherm bereikt, bewaarformulier geopend, per uitkomstgroep. |
| 1 | **E-mail met een echte ruil, zichtbaar direct na stap 2.** In plaats van "alleen bewaren": "Stuur me de vergelijking van alle posten, en over drie maanden een herinnering om hem opnieuw te doen." Het scherm laat er nu hooguit drie zien; de volledige lijst per post met de verwachting ernaast is echt extra, en verzonnen is er niets aan. Het vinkje wordt optioneel. | Een ruil in plaats van niets, op het moment dat de nieuwsgierigheid het grootst is (net na de afwijkingen), en minder frictie. | Formulier geopend en verstuurd per bezoeker die stap 2 zag. |
| 2 | **Stap 3 per uitkomst.** Bij "meer over dan verwacht": zeggen dat het klopt, en de vraag stellen die overblijft ("en toch voelt het krap?"). Het echte bewijs past hier precies: bij twee van de vijf rapporten zat er geen lek, en dat staat erin. Bij "minder over dan verwacht": de huidige tekst over hoge uitgaven blijft. | De pitch moet gaan over de bezoeker die hem leest. "Goed verdienen en toch krap" is precies het profiel (Sandra en Niels), en de Geldscan verklaart juist het verschil tussen de cijfers en het gevoel. | Aanbod gezien en Geldscan-klik per uitkomstgroep. |
| 3 | **Eén tik: "Klopt dit met hoe het voelt?"** Ja, klopt / Nee, het voelt krapper / Weet ik niet. Bij "nee" gaat stap 4 over dat verschil. | Kleine eerste stap, en meteen een eerlijk signaal wie de Geldscan zou willen. Het kost niets en meet ook nog. | Verdeling van de antwoorden; Geldscan-klik bij "nee". |
| 4 | **De drie opvolgmails bouwen** (dag 0 resultaat plus alle posten, dag 3 het echte rapport dat het meest lijkt, dag 8 de Geldscan met prijs en de twee zonder lek). Staat al in CLAUDE.md sectie 5, alleen voor wie het optionele vinkje aanzet. | Het resultaatscherm verkoopt nu niets; een rustige opvolging die de bezoeker zelf vroeg is de meest waarschijnlijke weg naar een eerste aankoop. | Opens, kliks en aanvragen per mail. |
| 5 | **Op stap 4 één echt rapportfragment dat past bij het huishouden** (via `rapportVoorSlug`, met bedrag en link), plus een voorbeeldpagina van hoe een Geldscan eruitziet. | "Weet niet wat ik krijg" is bij €49 voor iets onzichtbaars de grootste drempel. | Geldscan-klik per bezoeker op stap 4. |
| 6 | **Eén tik op stap 4: "Wat houdt je tegen?"** Te duur / weet niet wat ik krijg / had genoeg aan de uitkomst / nu geen tijd. | Bij 40 per maand kun je beter vragen dan blind testen. Het antwoord zegt welke van de wijzigingen hierna de moeite waard is. | Verdeling van de antwoorden. |
| 7 | **Beslissing voor Jarno: betalen na ontvangst.** "Je betaalt pas als je het rapport hebt." | Lager risico zonder garantie te beloven. Wijkt af van de huidige volgorde (eerst betalen, dan gegevens aanleveren, CLAUDE.md sectie 5), dus niet zonder besluit. Risico: wat niet-betalers. | Aanvragen en het aandeel betaald binnen 14 dagen. |
| 8 | **Beslissing voor Jarno: gratis één vraag stellen over je uitkomst**, persoonlijk beantwoord. | Overbrugt de sprong van gratis naar €49 en bouwt wederkerigheid. Kost Jarno's tijd, dus alleen als de capaciteit er is. | Vragen per maand en aankopen binnen 30 dagen daarna. |

## 4. Wat bewust niet

- Het resultaat helemaal achter een e-mailveld zetten. Dat levert meer adressen op, maar botst met de positionering en kost volgens leveranciers zelf 30 tot 50 procent van de afronders.
- Aftellers, "nog 3 plekken" of andere verzonnen schaarste. De capaciteitsgrens is echt (ongeveer 25 per maand), maar wordt pas genoemd als hij in zicht komt.
- Een geld-terug-garantie (CLAUDE.md sectie 3 punt 5).
- Een lokproduct van een paar euro. Het zero-price effect pleit eerder voor een gratis tussenstap dan voor een kleine prijs.
- Meer dan één wijziging tegelijk.

## 5. Voorgestelde volgorde

1. **23 tot 30 september:** meten. Bekijk op `/admin/analyse-verloop` hoeveel mensen het aanbodscherm halen en welke uitkomst ze kregen.
2. **Vanaf 30 september:** wijziging 1 (e-mailruil na stap 2, vinkje optioneel). Drie weken meten.
3. Daarna wijziging 2 en 3 samen, omdat 3 het meetinstrument van 2 is.
4. Wijziging 4 (opvolgmails) zodra er e-mailadressen binnenkomen; daarvoor heeft hij geen publiek.
5. Wijziging 5 en 6 daarna. 7 en 8 alleen na een besluit van Jarno.
