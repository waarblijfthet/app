# Persona-toets: hoort de geldscan-CTA hoger in de artikelen? (30-jul-2026)

Vraag van Jarno: de CTA staat nu helemaal onderaan het artikel en niemand ziet hem. Werkt het om hem hoger te zetten, en zou dat de ICP eerder laten klikken?

Methode zoals technische les 7: vier verse persona-agents, elk met alleen hun eigen profiel en de gemeten paginastructuur, geen inzage in dit document of in mijn analyse. Hardheidseis: "zou kunnen" telt als nee, en de reactie moet letterlijk uitgeschreven worden.

## De vier varianten

- **A. Vóór het antwoord.** Het groene blok met de knop van 49 euro direct onder het doosje "Na dit artikel weet je".
- **B. Direct ná het antwoord.** Datzelfde blok onder de tabel met de bedragen.
- **C. Lichte stap ná het antwoord.** Geen knop van 49 euro, maar je eigen bedrag vergelijken of de gratis analyse. Het aanbod van 49 euro blijft onderaan.
- **D. Niets veranderen.**

## Uitslag

| Persona | A | B | C | D | Winnaar |
|---|---|---|---|---|---|
| Petra, artikel-ICP, zoekt een bedrag | weg | doorscrollen | klikken | weg | C |
| Sandra, tweeverdiener, drie kinderen | weg | doorscrollen | klikken | weg | C |
| Niels, alleenstaand, 3.650 netto | weg | doorscrollen | klikken | doorscrollen | C |
| Thomas, alleenstaande ouder | doorscrollen | klikken | klikken | weg | B |

**Niemand kiest A, en drie van de vier verlaten de pagina.** Dat is het antwoord op de vraag zoals hij gesteld was.

## De vijf bevindingen die eruit komen

### 1. A kost je de bezoeker, niet de klik

Petra: "Ah, dus dit is zo'n site. Ik heb nog geen enkel getal gezien en er wordt me al iets verkocht van 49 euro." Ze gaat terug naar Google, en ze voegt toe dat als ze wél had doorgescrold, ze de rest van het artikel had gelezen als reclame in plaats van als informatie, waardoor ook de tabel minder waard wordt.

Niels zegt hetzelfde in andere woorden: "Dus dit is geen artikel, dit is een advertentie met een tabel erin."

Sandra noemt de kosten die je niet ziet: "Ik heb dus al één keer nee gezegd. Als datzelfde blok onderaan nog eens komt, is het de tweede keer nee, en de tweede nee is makkelijker dan de eerste."

### 2. D is geen nee, het is niets, en dat is erger

Alle vier zeggen dat het blok op 8.624 pixels voor hen niet bestaat. Sandra: "Ik heb het letterlijk nooit gezien en ik zou ook niet weten dat je iets verkoopt." Jouw instinct dat er iets moet veranderen is dus juist. Alleen niet in de richting van A.

### 3. B werkt op het verkeerde gevoel, behalve bij één profiel

Bij drie van de vier komt het blok van 49 euro precies op het moment dat hun ongerustheid weg is. Sandra: "Dat blok komt precies op het moment dat mijn ongerustheid weg is. Ik kwam met een klein schuldgevoel binnen, de tabel haalt dat weg, en dan is er niets meer om voor te betalen."

Bij Thomas is het omgekeerd, en zijn reden is de belangrijkste vondst van deze toets. Voor hem is de tabel juist het moment waarop hij ziet dat de site hem niet kent: "B wint omdat het me pakt op de exacte seconde dat ik zie dat de tabel niet over mij gaat." Hij waarschuwt expliciet tegen C in zijn geval: "Als ik mijn 1.100 euro invul en er komt weer een vergelijking met een huishouden dat niet het mijne is, dan heb ik mijn teleurstelling al gehad. Daarna is dat blok van 49 euro onderaan kansloos. De lichte stap voelt makkelijk maar hij verbrandt de enige kaart die werkt."

**Conclusie: C is niet gratis. C werkt alleen als de vergelijking het huishouden van de lezer werkelijk aankan.** Voor een alleenstaande ouder met een verblijfsverdeling van 80 procent doet hij dat niet, en dan is C schadelijker dan B.

### 4. Het koopmoment is niet na het antwoord, maar na hun eigen getal

Dit zeggen alle vier onafhankelijk, en het is de kern van het hele onderzoek. Ze worden niet bereikbaar door het algemene antwoord, maar door hun eigen bedrag dat niet opgaat.

Sandra: "Ik betaal op het moment dat de rekening niet meer opgaat. Zolang ik het verschil zelf kan wegredeneren, betaal ik niets."

Niels: "Als blijkt dat ik 130 euro boven normaal zit op boodschappen, dan denk ik: dat is het dus niet, want 130 euro is niet waarom ik niks spaar. Dat gat, dat ik zelf zie en niet kan uitleggen, is het moment."

De volgorde is dus: antwoord, dan hun eigen getal, dan het onverklaarde verschil, en dán 49 euro. Niet: antwoord, dan 49 euro.

### 5. De knoptekst is een probleem, en dat had niemand gevraagd

Twee van de vier vallen ongevraagd over dezelfde zin, met hetzelfde beeld.

Sandra: "De knop mag niet 'Laat mij je cijfers nakijken' heten. Nakijken is wat de meester met mijn huiswerk deed. Ik word nagekeken en er komt een cijfer."

Thomas: "Klinkt als een leraar die mijn huiswerk naloopt en er iets fout in gaat vinden. Ik heb drie jaar alles alleen recht gehouden. Ik hoef niet nagekeken te worden."

## Wat dit betekent voor de bouw

1. **Variant A niet doen.** Nul van de vier, en drie verlaten de pagina.
2. **De CTA gaat wel omhoog, maar drie stappen later dan voorgesteld:** direct onder de uitkomst van een inline vergelijking, niet onder het algemene antwoord. In het boodschappenartikel is dat ongeveer 2.500 pixels in plaats van 8.624.
3. **De lichte stap moet huishoudbewust zijn.** Kan de vergelijking het huishouden van de lezer niet aan, dan moet hij dat zeggen in plaats van een getal geven. Voor Thomas is precies die zin het koopargument: "Ik ken geen tabel die daarop past, dus ik reken met jouw verblijfsverdeling."
4. **Nooit een e-mailmuur op die plek.** Petra: de tabel achter een e-mailveld betekent weg en nooit terug. Sandra: "Vraag je eerst mijn e-mail, dan ben ik weg en dan ben ik boos ook." Gevolg voor de bouw: `BenchmarkMail` vraagt een e-mailadres en is dus niet het juiste component voor deze plek, ondanks dat de contentaudit hem daar voorstelde. `BoodschappenSlider` en `NibudVergelijker` vragen niets en bestaan al.
5. **Knoptekst vervangen.** Zeg wat de lezer krijgt, niet wat jij doet.
6. **Let op de dubbele CTA.** Vijf artikelen renderen al twee CTA-blokken achter elkaar (openstaand punt uit `docs/contentaudit-top10-jul-2026.md`). Een CTA halverwege toevoegen maakt daar drie van.

## Wat de toets bevestigde van de wijzigingen van vandaag

Drie van de vier vragen ongevraagd om precies de twee dingen die vandaag in de copy zijn gezet: dat er geen gesprek nodig is, en dat er staat wanneer er niets te repareren valt. Thomas: "Misschien is de uitkomst dat er bij jou gewoon weinig ruimte is en dat dat klopt. Dan staat dat er ook. Want daar gaat het bij mij om." Sandra zegt dat ze eerder 49 euro betaalt dan nul euro voor een kennismakingsgesprek, omdat ze in een gesprek moet uitleggen dat ze het niet snappen terwijl ze samen 7.300 netto verdienen.

## Kanttekening bij deze toets

Vier gesimuleerde profielen zijn geen vier bezoekers. Wat deze toets wel kan: aanwijzen waar een voorstel bij een profiel structureel botst, en dat deed hij eenduidig bij A. Wat hij niet kan: voorspellen hoeveel mensen klikken. Dat weet je pas als de wijziging live staat, en met 292 bezoekers in 30 dagen duurt het maanden voor je dat statistisch kunt zien.
