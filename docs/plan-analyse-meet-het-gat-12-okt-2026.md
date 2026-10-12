# Plan: de analyse meet het gat, niet de ruimte (12 oktober 2026)

**Volgorde gewijzigd later op 12 oktober (besluit Jarno): dit is fase 2, vanaf 9 november. Eerst de ICP vinden, zie `docs/plan-icp-vinden-12-okt-2026.md`. De meetvraag uit dat plan (stap 0) is de eerste helft van stap 1 hieronder. Stap 4 hieronder is vervangen door het beslismoment van 30 november.**

Aanleiding: een maand zonder nieuwe content, wel analyses, maar vrijwel geen e-mailadressen en nul Geldscans. Vraag van Jarno: kloppen de uitkomsten, vinden we de verkeerde mensen, en wat gaan we doen.

## 1. Wat de data zegt (12 september tot 12 oktober)

Bron: `/api/admin/analyse-verloop?periode=maand` en `/api/admin/bezoekers?periode=maand`, uitgelezen op 12 oktober, plus GSC 11 september tot 9 oktober (28 dagen) via `/api/admin/search-analytics`. Jarno's eigen testrondes zitten er mogelijk tussen; die zijn niet te scheiden.

- /analyse 230 keer bekeken, 69 keer gestart, **54 keer afgerond**. In de hele periode 1 e-mailadres achtergelaten (`quiz_resultaten`), mogelijk een test. 7 kozen een vraag in de vraagstap, 0 verstuurd. 0 Geldscan-aanvragen.
- **De rekensom klopt.** Alle 54 nagerekend met dezelfde formules als `lib/benchmarks.ts`. De fout zit niet in het optellen maar in wat er wordt opgeteld.
- **41 van de 54 kregen de kop "Bij jou blijft waarschijnlijk meer over dan je zelf zou verwachten."** Mediaan geschatte ruimte: 1.610 euro per maand, 29 procent van het inkomen. 39 van de 54 kregen meer dan 1.000 euro ruimte te zien.
- **Het zijn niet alleen de verkeerde mensen.** 36 van de 54 vallen qua inkomen in de band van Sandra (samen 5.000 tot 8.000) of Niels (alleen 3.500 tot 6.000). 31 van die 36 kregen dezelfde kop: er is ruimte genoeg.
- **Het lek staat in de antwoorden, en de analyse noemt het een meevaller.** 21 mensen vulden in wat ze sparen. Mediaan berekende ruimte 1.790 euro, mediaan sparen 500 euro: ongeveer 944 euro per maand die in de berekening nergens heen gaat. Bij 16 van de 21 is dat meer dan 500 euro. Het resultaatscherm zegt dan: "Dat past binnen deze ruimte, er blijft dan nog ... over." Kanttekening: de vraag luidt "wat je gemiddeld spaart", de code noemt het `spaardoel`; niet zeker is dat iedereen het werkelijke bedrag invulde.

### Waarom de uitkomst te rooskleurig is

De analyse telt schattingen op en behandelt die als werkelijkheid. Volgens de eigen rapporten zijn juist die schattingen het probleem: bij `alleenstaand-huurwoning` zat het grootste verschil tussen wat zij dacht uit te geven en wat werkelijk naar variabele en jaaruitgaven ging; bij `tweeverdieners-drie-kinderen` bleken de schattingen voor boodschappen, vrije tijd en losse aankopen te onzeker. Wat er in de antwoorden te zien is:

- Abonnementen: 24 van de 54 kwamen uit op 40 euro of minder, bijna allemaal via "Nauwelijks, onder 50 euro". Bij alle vijf rapporten lag dat tussen 119 en 175 euro (n=5, `lib/benchmarks.ts`).
- Jaarlijkse kosten: mediaan 83 euro per maand, 21 keer nul.
- Niet gevraagd: aflossingen (studieschuld, autolening, Klarna), kleding los van uitgaan, cadeaus en feestdagen, huisdieren, verzorging.
- Bug: vakantiegeld telt `salaris * 0,08 / 12` per maand op, een factor 12 te laag. Repareren verhoogt het inkomen, dus de uitkomst wordt nog rooskleuriger. Alleen meenemen samen met stap 1.

Gevolg: wie krap zit, hoort dat er 1.600 euro over is. Dat is of ongeloofwaardig of geruststellend, en in beide gevallen is er geen reden om een e-mailadres achter te laten of 49 euro te betalen.

## 2. Wat het verkeer zegt

- GSC 28 dagen: 790 klikken, 38.449 vertoningen. **605 van de 790 klikken (77 procent) gaan naar vijf pagina's**: boodschappen (141), is-4000 (134), kinderopvangtoeslag 2027 (131), kindgebonden budget 2027 (129), is-5000 (70). Dat zijn mensen die een getal of een regel controleren.
- Pagina's met de taal van het probleem halen weinig: `samen-6000-euro-netto-toch-niets-over` 7 klikken, `hoeveel-geld-overhouden-einde-maand` 12.
- 2.751 sessies, 3.282 paginaweergaven: 1,2 pagina per sessie. Men leest het antwoord en gaat weg.

Antwoord op de vraag: allebei. Het verkeer bestaat vooral uit controleurs, niet uit mensen met een probleem. Maar wie wel de analyse doorloopt, zit voor twee derde in de juiste inkomensband, en die mensen stuurt de analyse weg met de boodschap dat het goed gaat.

## 3. Het plan

### Stap 1, deze week, de enige bouwklus: de analyse meet het gat

1. Eén nieuwe, verplichte vraag na de uitgaven: "Hoeveel zet je per maand echt opzij, of staat er nog op je rekening vlak voordat je salaris binnenkomt?" Snelkeuzes: bijna niets, 250, 500, 1.000+. Dit vervangt de optionele spaarvraag.
2. De kop van het resultaat wordt het verschil, niet de ruimte: "Op papier houd je 1.790 euro over. In werkelijkheid blijft er 500 euro over. Ongeveer 1.290 euro per maand kun je niet aanwijzen." Dat is de Geldscan in één zin: die zoekt uit waar het blijft.
3. Gat onder 200 euro: dat zeggen. "Je schatting klopt met wat er overblijft. Ik zie hier geen lek." Geen verkoop. Dat filtert wie geen probleem heeft en maakt de rest geloofwaardig.
4. De vergelijking met een vergelijkbaar huishouden schuift naar resultaatstap 2. Geen kop meer over wat "je zelf zou verwachten", want dat is nooit gevraagd.
5. De e-mailvraag direct onder het gat: de uitkomst plus de posten waar het bij de vijf rapporten zat, gemaild.
6. Vakantiegeldbug mee repareren.
7. Geen extra vragen voor de ontbrekende posten. Het gat vangt ze vanzelf, en elke vraag erbij kost afronding.

Meten in de vrijdagmeting, na 14 dagen (26 oktober): aandeel afgeronde analyses met een gat boven 300 euro, e-mailadressen, Geldscan-klikken vanaf het resultaat. Zit het gat bij de meesten onder de 200, dan is de conclusie dat de analyse mensen trekt zonder probleem, en dan is het een verkeersvraag, niet meer een analysevraag.

### Stap 2, onderhoud: de vijf drukste pagina's laten landen op het gat

Geen nieuwe pagina's. Op boodschappen, is-4000, is-5000 en de twee 2027-pagina's de analyse-CTA na het eigen getal herschrijven naar de gatvraag: "Je weet nu wat normaal is. Weet je ook hoeveel er bij jou elke maand verdwijnt?" Label blijft `Doe de gratis analyse`, via `analyseHref` met situatieparameters. Valt onder onderhoud, niet onder de tempo-regel.

### Stap 3, pas na de meting van 26 oktober: content alleen nog op het gat

Geen nieuwe pagina's over regelingen (kindgebonden budget, kinderopvangtoeslag). Die halen verkeer, geen kopers. Een volgende pagina alleen op een zoekvraag waarin het gat zelf zit, na SERP-check en GSC-filter volgens CLAUDE.md sectie 8.

### Stap 4, besluit voor Jarno op 1 november

Het killcriterium van 1 november gaat af: er zijn nul betaalde Geldscans uit zoekverkeer. De regel uit CLAUDE.md sectie 9 zegt dan: alle tijd naar cluster Z, hubs en CTR-rondes. Dat is een antwoord op te weinig verkeer, terwijl deze maand laat zien dat het probleem na het verkeer zit.

Rekensom: met 54 afgeronde analyses per maand en, optimistisch, 1 op 10 die daarna een Geldscan koopt, komen er ongeveer 5 per maand bij, rond de 19 tot 31 januari. 100 uit zoekverkeer is met dit verkeer niet haalbaar, ook niet als stap 1 goed werkt. Op 1 november dus kiezen, met de cijfers van stap 1 erbij:

- het doel bijstellen naar wat zoekverkeer kan leveren, of
- naast zoekverkeer één kanaal met mensen heropenen. De enige betalende klant kwam via een mens.

Dat is Jarno's besluit. Er wordt niets voor gebouwd tot het genomen is.
