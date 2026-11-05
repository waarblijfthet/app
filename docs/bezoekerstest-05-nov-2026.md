# Bezoekerstest nieuwe opzet, 5 november 2026

Zes bedachte bezoekers lopen de opzet uit commit 7f6c2c0 door (splitsvraag, /geldscan met #nakijken, /aanbod, formulier met aanlevervraag). Twee rondes: eerst de opzet zoals hij was, dan na de aanpassingen. Gelezen op de echte schermen: server-render van de pagina's, Tailwind gecompileerd, screenshots op 390 px breed (telefoon). Dit is een denkoefening, geen gebruikersonderzoek: het vervangt geen echte bezoeker, maar haalt wel de fouten eruit die je zelf niet meer ziet.

## De zes bezoekers

| | Wie | Situatie | Komt binnen via | Heeft al een overzicht? |
|---|---|---|---|---|
| 1 | Sandra, 41 | Samen ~€7.200 netto, 3 kinderen, koophuis | Artikel kindgebonden budget 2027, telefoon, 's avonds | Half: Rabobank-app plus een losse Excel van vorig jaar |
| 2 | Niels, 34 | Samen ~€6.100, geen kinderen | Huishoudboekje-artikel, desktop | Ja, YNAB. Wantrouwig over privacy |
| 3 | Mark, 48 | Alleenstaande vader, 2 kinderen, ~€3.900, net gescheiden | Artikel alleenstaande ouder, telefoon | Nee. Schaamt zich, wil niet beoordeeld worden |
| 4 | Lisa, 29 | Net samenwonend, zij €2.600, hij €4.100 | Artikel kosten verdelen bij ongelijk inkomen | Een gedeelde notitie. Partner nog niet overtuigd |
| 5 | Peter, 56 | ~€8.000 netto, Excel-fanaat | Artikel top 10 procent inkomen, desktop | Ja, tot op de euro. Nieuwsgierig, niet krap |
| 6 | Yvonne, 37 | Zzp'er, partner in loondienst, wisselend inkomen | Waar blijft mijn geld, via een link op een forum | Bankapp, verder niets |

## Ronde 1: de opzet van commit 7f6c2c0

**Sandra.** Leest het artikel, ziet onderaan: "De gratis analyse legt jullie hele maand naast..." en direct daaronder "Heb je al een overzicht van je uitgaven?". Twijfelt: telt mijn bankapp? Klikt "Nee", want ze heeft geen echte begroting, terwijl ze precies de groep is die "Ja" had moeten kiezen. *Houdt tegen:* de vraag zonder uitleg wat telt, en een tekst erboven die alleen over de analyse gaat. "Ik zet je maand neer" onder de Ja-knop zegt haar niets.

**Niels.** Klikt "Ja", landt op #nakijken. Het echte voorbeeld (€500 jaarkosten, €400 buffer) spreekt hem aan. *Houdt tegen:* wie is "ik"? Hij ziet op /geldscan geen naam en geen gezicht, terwijl hij zijn cijfers moet opsturen. Op het formulier is de aanlevervraag afgekapt ("Mijn eigen overzicht (Excel, bank..."). Hoe betaal ik eigenlijk? "Betaallink" kan van alles zijn; hij wil geen kaartgegevens achterlaten bij een onbekende site.

**Mark.** Klikt "Nee, help me op weg": goed, want de analyse is gratis en hij hoeft niets te laten zien. *Houdt tegen:* nergens bij de knop staat dat het anoniem is; dat staat pas op het introscherm. Zou hij bij de knop al willen zien.

**Lisa.** Haar vraag is niet "heb ik een overzicht" maar "hoe verdelen we het eerlijk". Klikt "Ja" omdat ze een notitie hebben, landt op /geldscan. *Houdt tegen:* nergens staat of dit samen kan, of of de verdeling tussen partners erin zit. Ze moet haar partner overtuigen en heeft daar niets voor.

**Peter.** Op /geldscan op de telefoon: kop, tekst, twee regels en dan een grijs plaatje met lege balkjes ("Voorbeeldweergave"). Leest als een lege plek. De prijs en de knop staan anderhalf scherm lager. *Houdt tegen:* €49 voor een onbekende is óf te duur óf te goedkoop om serieus te zijn; hij wil weten wie het doet. "Je maand neerzetten" vindt hij vaag.

**Yvonne.** Zoekt of dit werkt voor wisselend inkomen. Vindt het nergens, ook niet in de FAQ. *Houdt tegen:* aanname dat het voor loondienst is gemaakt.

**Rode draad ronde 1**

1. *Taal:* "je maand neerzetten" is mijn eigen woord, niet dat van de bezoeker. Iedereen moet het vertalen. Op fora en in de rapporten heet het "potjes".
2. *Uitleg:* "Heb je al een overzicht?" zonder te zeggen dat een bankapp ook telt, stuurt groep B naar het verkeerde spoor.
3. *Tegenstrijdig:* de tekst boven de splitsvraag in elk artikel ging alleen over de gratis analyse.
4. *Vertrouwen:* /geldscan had geen naam en geen gezicht; het formulier wel, maar pas onderaan.
5. *Prijs en betalen:* niet duidelijk hoe je betaalt, en het lege voorbeeldplaatje op mobiel duwde prijs en knop uit beeld.
6. *Doelgroep:* stellen en zzp'ers vonden zichzelf niet terug.
7. *Gebruiksgemak:* afgekapte keuzelijst op het formulier.

## Wat ik heb aangepast

- **"Potjes" in plaats van "je maand neerzetten"**, overal: splitsvraag, /geldscan (title, hero, stappen, slot), /aanbod, formulier, huishoudboekje-link, rapportslot, analyse-resultaat stap 1 en 4, lib/aanbod-content.ts en de bevestigingsmail. Belofte nu: "Ik kijk je cijfers na en reken je potjes uit." De concrete uitleg ("welke rekening waarvoor, met jouw bedragen") blijft eronder.
- **Splitsvraag** (components/SplitsVraag.tsx): onder de vraag "Een Excel, het overzicht in je bankapp of een budgetapp telt ook."; Nee-knop "Gratis en anoniem, ongeveer 3 minuten"; Ja-knop "Ik kijk het na en reken je potjes uit, €49".
- **Artikelslot**: de per-artikel tekst die alleen over de analyse ging is vervangen door een neutrale regel; de per-artikel kop blijft.
- **/geldscan op mobiel**: de voorbeeldweergave valt onder 640 px weg, met in de plaats een link "Lees 5 echte rapporten, zo ziet het eruit". Prijs en knop staan daardoor in het eerste scherm.
- **/geldscan: wie kijkt er**: foto, naam en één regel uit de Over-pagina (twee inkomens, drie kinderen, jarenlang niet begrepen waarom het nooit klopte), met link naar /over. Geen nieuwe claims.
- **Betalen**: overal "betaalverzoek van €49: een Tikkie of een gewone overboeking". Op het formulier staat dat nu bovenaan bij de drie waarden ("Geen account").
- **Vier FAQ's op /geldscan**: Hoe betaal ik? / Kunnen we dit samen doen, met mijn partner? / Mijn inkomen wisselt per maand, werkt het dan ook? / Wat als ik er niets nieuws uit haal? (antwoord met de echte tellingen uit lib/rapporten-data.ts).
- **Formulier**: keuzelijst ingekort ("Mijn eigen overzicht" / "Vragenlijst of gratis analyse"), de waarden bovenaan nu: stuur in wat je hebt, betalen met een betaalverzoek, binnen 2 werkdagen.
- **/aanbod**: de drie stappen heetten "Eerst ontdekken / Daarna begrijpen / Daarna bespreken", alsof je eerst de analyse moet doen. Nu "Nog geen overzicht / Al een overzicht / Daarna, als je wil".

## Ronde 2: dezelfde bezoekers op de aangepaste opzet

**Sandra.** Ziet "Een Excel, het overzicht in je bankapp of een budgetapp telt ook" en kiest "Ja". "Ik kijk het na en reken je potjes uit" begrijpt ze meteen: potjes kent ze van haar moeder. Op #nakijken ziet ze een echt voorbeeld. *Blijft over:* na de aanvraag moet ze mogelijk een werkdag wachten op het betaalverzoek. Op dat moment is ze haar avondje-geldzaken-gevoel kwijt. Lost zich op zodra GELDSCAN_BETAALLINK in Vercel staat.

**Niels.** Ziet foto en naam onder de prijs, en "Tikkie of overboeking, geen account" op het formulier. Dat is voor hem genoeg: hij hoeft geen kaart in te voeren en weet wie zijn export leest. Keuzelijst past. *Blijft over:* hij zou graag vooraf weten of een YNAB-export werkt; "export uit je budgetapp" dekt het, maar noemt het niet.

**Mark.** "Gratis en anoniem" staat nu op de knop zelf. Klikt zonder aarzelen. *Blijft over:* na de analyse ziet hij €49 en dat is voor hem een week boodschappen. Dat is prima: de gratis analyse moet voor hem op zichzelf staan, en dat doet hij.

**Lisa.** Vindt in de FAQ "Kunnen we dit samen doen?" met het antwoord dat ook uitgerekend wordt wat ieder naar de gezamenlijke potjes overmaakt. Dat is het argument voor haar partner. *Blijft over:* het staat in de FAQ, niet in het slot van het kosten-verdelen-artikel zelf. Mogelijke vervolgstap: op die pagina de Ja-knop een eigen onderregel geven.

**Peter.** Op mobiel staan prijs, knop en de link naar 5 echte rapporten in het eerste scherm; het lege plaatje is weg. Naam en gezicht staan eronder. Hij klikt door naar een rapport om te zien of het serieus is: precies de bedoeling. *Blijft over:* de naam "Geldscan" klinkt hem nog steeds als een automatische scan. De FAQ "Is de Geldscan automatisch?" vangt het op, maar pas onderaan. Naam laat ik staan (merk, zoekverkeer); te bespreken.

**Yvonne.** Vindt "Mijn inkomen wisselt per maand" in de FAQ. *Blijft over:* in de keuzelijst "Situatie" op het formulier staat geen zzp. Klein, ze kan het in het bericht zetten.

## Wat Jarno zelf moet beslissen of controleren

1. **Twee nieuwe FAQ-antwoorden beloven werkwijze**: bij een stel reken ik ook uit wat ieder per maand naar de gezamenlijke potjes overmaakt; bij wisselend inkomen reken ik op een magere maand en gaat de rest naar de buffer. Klopt dat met hoe jij het doet? Zo niet, pas de tekst in app/geldscan/page.tsx aan.
2. **GELDSCAN_BETAALLINK in Vercel zetten.** De grootste overgebleven afhaker in ronde 2 is de wachttijd tussen aanvraag en betaalverzoek.
3. **Geld-terug-belofte?** Niet gebouwd, want dat is jouw toezegging. Het antwoord op "Wat als ik er niets nieuws uit haal?" verwijst nu naar de rapporten en naar 2 van de 5 waarin niets te repareren viel.
4. **Op de telefoon nalopen**: een artikel (slot), /geldscan (eerste scherm, foto), het formulier.
