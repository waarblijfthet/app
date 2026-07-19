# Outreach-strategie, 18 juli 2026

Vervangt de aanpak uit de sessie van 2 juli. Aanleiding: er is nog niets met de outreach gedaan, en Jarno's eigen observatie klopt met alles wat over verwijsrelaties bekend is: direct om een doorverwijzing vragen werkt niet, dat doen professionals nooit bij een vreemde.

## 1. Waarom de oude templates niet gingen werken

De oude mail 1 was qua vorm al goed (herkenning eerst, kaal, kort), maar het doel stond verkeerd. Bij budgetcoaches stond letterlijk "Zou je daar ooit voor willen doorverwijzen?" in het eerste contact, en ook de zachtere varianten ("Ken je stellen bij wie dit speelt?") vragen in feite meteen om klanten. Dat miskent hoe verwijzen werkt voor deze beroepsgroepen:

1. **Verwijzen is reputatierisico.** Een therapeut die een cliënt naar een onbekende stuurt, zet haar eigen vertrouwensband op het spel. Dat doet ze pas als ze de persoon kent of het gevoel heeft dat hij haar vak snapt.
2. **Verwijzen is moeite.** Ze moet onthouden dat je bestaat, uitleggen wat je doet, en het juiste moment herkennen. Elke stap die jij niet voorkookt, gebeurt niet.
3. **Eenrichtingsverkeer voelt als acquisitie.** Een vraag zonder iets ertegenover is gewoon een verkoopmail, hoe goed geschreven ook.

## 2. Het nieuwe principe: gesprek eerst, verwijzing later

Precies wat Jarno voorstelde, uitgewerkt in drie stappen die op de bestaande CRM-infrastructuur passen (mail 1 + 2 follow-ups):

- **Mail 1 (dag 0): alleen herkenning.** Pakkende, vakinhoudelijke titel, een scène uit hún praktijk, en één pure vraag: herken je dit? Geen aanbod, geen link, geen doorverwijsvraag. Doel is een antwoord, meer niet.
- **Mail 2 (dag 3 à 4): alleen geven.** Iets delen dat ze morgen in een sessie kunnen gebruiken: de drie patronen die ik bij deze klanten zie. Expliciet "geen reactie nodig". Geen link. Dit is het moment waarop je van acquisiteur verandert in vakgenoot.
- **Mail 3 (dag 8 à 10): verwijzen moeiteloos maken, plus wederkerigheid.** De breakup-mail. Twee dingen: (1) een doorstuurblokje van drie zinnen dat ze letterlijk aan een cliënt kunnen geven (de enige link in de hele reeks), en (2) de omkering: ik verwijs zelf ook door en zoek daar nog vaste adressen voor. Dat laatste maakt reageren voor hén interessant.

De echte conversie gebeurt daarna in de replies (zie het playbook in sectie 5). Verwijzingen komen uit relaties, de mails zijn alleen de opening.

## 3. Templates (v5, definitief na 4 persona-rondes)

De volledige, actuele copy staat in `app/api/admin/outreach/send/route.ts`; dat is de bron. Hieronder de structuur en de twee volledig geteste sequences. Regels: kaal en plat, ik-vorm, geen em dashes, en **nooit het woord "eerlijk"** (eerlijkheid toon je, die claim je niet; beide persona's vielen erover). Eerste contact loopt altijd per mail, nooit een bel-uitnodiging in de copy (beschikbaarheid Jarno); geen telefoonnummer in de handtekening (prive; komt eventueel terug met een apart zakelijk nummer). Onderwerpregels beginnen met de voornaam (keuze Jarno 19-jul; kanttekening uit de persona-toets: Marjolein las een voornaam in de onderwerpregel als mailmerge-signaal, dus als de reply-rate tegenvalt is dit de eerste variabele om te A/B-testen). De ps_zin is verplicht en moet een inhoudelijk detail bevatten uit hun site of werk, geen compliment ("mooi hoe je schrijft over X" triggert het spamsjabloon-gevoel; "je punt om de beslagvrije voet-berekening klaar te hebben liggen is er zo een die mensen nooit zelf bedenken" werkt wel). Bij relatietherapeuten en burn-out-coaches staat de ps_zin ná de openingsscène, bij budgetcoaches en planners vooraan.

### Relatietherapeuten (getest, cumulatieve antwoordkans 5,5/10, plafond voor koud)

**Mail 1. Onderwerp: "[Voornaam], mag ik stellen naar jouw praktijk verwijzen?"**

> Beste [naam],
>
> Soms zit er een stel tegenover me waar het gesprek na een half uur niet meer over cijfers gaat, maar over wie bepaalt, wie zwijgt, wat geld vroeger thuis betekende. Dat is jouw vak, niet het mijne, en ik ga niet doen alsof.
>
> [ps-zin]
>
> Wie ik ben: financieel coach, begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Jij zou een van de eerste relatietherapeuten zijn met wie ik zoiets afspreek; het gaat om enkele stellen per jaar, geen stroom.
>
> Ik verwijs niet blind, dus ik wil weten naar wie. Stel me daarom gerust per mail de vragen die je zou stellen aan iedereen die naar je verwijst; jij bepaalt het tempo.
>
> PS: liever niet? Eén woordje is genoeg, dan mail ik je niet meer.

**Mail 2 (Re:).** De drie patronen (overzicht ontbreekt bij allebei; vaste lasten meegegroeid; geen vrij bedrag per persoon, dus elke uitgave een potentieel verwijt), plus het omgekeerde aanbod ("loop jij in een casus vast op het feitelijke geldoverzicht, leg hem me per mail voor") en de kale vakvraag: "Wat doe jij eigenlijk nu als een stel op het geld blijft vastlopen?" Dit is de mail waarop het antwoord komt (6/10).

**Mail 3 (Re:).** Breakup + cadeau: "Van de drie patronen heb ik een A4 gemaakt dat je aan een stel kunt meegeven, desgewenst zonder mijn naam erop. Wil je het hebben? Eén woordje is genoeg." Plus: de vraag blijft staan, vragen stellen per mail mag altijd eerst. **Voorwaarde: het A4 moet bestaan vóór de eerste FU2 verstuurd wordt.**

### Budgetcoaches (getest, cumulatieve antwoordkans 7/10, "een van de weinige koude mails die ik zou beantwoorden")

**Mail 1. Onderwerp: "[Voornaam], ik zoek een budgetcoach om naar door te verwijzen"**

> Beste [naam],
>
> [ps-zin]
>
> Ik ben financieel coach voor huishoudens die goed verdienen en toch elke maand krap zitten; zij melden zich bij mij via mijn site. Zodra er achterstanden, incasso's of regelingen spelen, houdt mijn werk op. Ik wil die mensen dan niet wegsturen met "zoek maar een budgetcoach", maar warm overdragen aan een naam die ik ken, met de context die ik al heb, zodat jij niet vanaf nul begint.
>
> Wie ik ben: dit werk begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Er zit geen vergoeding, tegenprestatie of leadconstructie aan; mijn tarieven en werkwijze staan open op mijn site.
>
> Ik heb je toestemming niet nodig om je naam te noemen, maar wel je voorkeur: zit je op zulke overdrachten te wachten? Eén woordje is genoeg. Het gaat om een paar mensen per jaar, geen stroom.
>
> PS: liever niet? Eén woordje is genoeg, dan mail ik je niet meer.

**Mail 2 (Re:).** Wat "warm overdragen" concreet betekent (vooraf bellen/mailen, situatie en cijfers meeleveren, klant weet dat en waarom) + de vakvraag: "wat wil jij vooraf weten bij zo'n overdracht?" Sterkste mail (antwoordkans 7/10).

**Mail 3 (Re:).** Breakup: aanbod blijft staan ("wil jij die naam zijn: één woordje is genoeg") + open kaart over het eigen belang: "op waarblijfthet.nl staat een gratis anonieme analyse; zo kom ik aan mijn klanten, dus ja, daar heb ik wat aan als jij hem ooit noemt. Alleen als het jou uitkomt; jij bepaalt wat bij je past." Het zelf benoemen van het eigen belang bleek de sterkste vertrouwenszet van de hele reeks.

### Financieel planners en burn-out-coaches (afgeleid, nog niet persona-getoetst)

Zelfde structuur toegepast: planners krijgen de budgetcoach-vorm (doorverwijzing van klanten die na het inzicht willen beleggen/plannen, "ik geef geen productadvies en heb de papieren niet"), burn-out-coaches de relatietherapeut-vorm (scène, "jouw vak, niet het mijne", drie geldstress-patronen, A4-cadeau). Bij een eerste testronde voor deze twee doelgroepen: zelfde persona-methode gebruiken (skill uitbreiden met deze twee profielen).

## 4. Top 5 actiepunten

1. **Templates staan in de CRM (gedaan, 18-jul; verplaatst naar `lib/outreach/mails.ts`, 19-jul).** De v5-copy is persona-getoetst in 4 rondes. De A4's bestaan inmiddels (`outreach-materiaal/`, 4 varianten: stellen/herstel, met naam/anoniem). Nog voor de eerste verzending: zodra de eerste samenwerkende collega er is, die als referentie in mail 1 noemen; dat was het belangrijkste resterende plafond-punt van beide persona's. Telefoonnummer in de handtekening is bewust weggelaten (prive nummer; komt eventueel terug zodra er een apart zakelijk nummer is, de persona's zagen een nummer wel als vertrouwenssignaal). Nieuw sinds 19-jul: bij een bekende vestigingsplaats krijgt mail 1 automatisch een regio-zin ("ik zoek bewust iemand in de regio X"); onbekende plaats = geen zin, nooit gokken. Follow-ups (mail 2 en 3) gaan automatisch via de dagelijkse cron `/api/cron/outreach-followups` (dag 3-4 en dag 8-9, max 20 per dag, uit te zetten met env `OUTREACH_AUTO_FOLLOWUP=uit`); handmatig versturen blijft werken.
2. **Lijst vullen: 30 goedgekeurde contacten per week.** Prospect-zoeker draaien per doelgroep (admin, tab Prospects), te beginnen met relatietherapeuten en burn-out-coaches: die zitten het dichtst op het emotionele moment waarop de doelgroep in beweging komt. Bronnen: ledenlijsten van beroepsverenigingen (NVRG, EFT-register, NOBCO/beroepsregisters voor coaches) als URL invoeren, en zoekwoorden per stad ("relatietherapeut Utrecht"). Eerst controleren of `supabase/prospect_zoeker.sql` en `supabase/outreach_followup.sql` gedraaid zijn.
3. **Dagelijkse cadans van 20 minuten.** 10 nieuwe mails per dag (niet meer, jong domein), plus follow-ups via de bestaande knoppen op dag 3-4 en 8-10. De ps_zin is verplicht en is het meeste werk: één oprechte zin over hún site of aanpak ("mooi hoe je op je site schrijft over X"). Zonder die zin is mail 1 een template en werkt het principe niet.
4. **Reply-playbook hanteren.** Elke reactie krijgt een vast vervolg: (a) "ja, herken ik" → bedanken, kort doorvragen op hun praktijk, en de deelmail-inhoud sturen als die nog niet verstuurd was; bij een tweede warme reply een kort kennismakingsbelletje van 15 minuten voorstellen óf de wederkerige verwijsafspraak concreet maken. (b) "wie ben jij?" → drie zinnen plus de samenwerken-pagina, dit is het enige moment voor die link. (c) "ik verwijs al naar iemand" → vragen wat diegene goed doet, en positioneren als aanvulling voor de klant zonder schulden. (d) "nee" → vriendelijk afsluiten en op Gereageerd zetten. Elke warme reply eindigt in één concrete micro-afspraak, nooit in "laten we contact houden".
5. **Meten en bijsturen per 100 verzonden eerste mails.** Replies zijn de enige metric (opens zijn onbetrouwbaar). Benchmark cold e-mail: 3 à 5 procent reply bij goede personalisatie; follow-ups leveren ruwweg 40 procent van alle replies. Per doelgroep bijhouden in de bestaande admin-tab; de doelgroep met de hoogste reply-rate krijgt daarna dubbel volume. Controleer dat de Resend-webhook en RESEND_WEBHOOK_SECRET staan zodat de statussen kloppen.

## 5. Verwachtingen

Bij 10 mails per dag, 5 dagen per week: ~200 eerste mails per maand, 6 tot 12 replies, 2 tot 4 echte gesprekken, en de eerste doorverwijzing realistisch pas na 4 tot 8 weken. Verwijsrelaties stapelen: één therapeut die twee keer per jaar verwijst is meer waard dan honderd extra clicks, en tien van zulke relaties zijn een stabiel kanaal. Dit is een lange-termijn-kanaal met korte-termijn-signalen (replies); beoordeel het op replies na de eerste 300 mails, niet op verwijzingen na twee weken.

## 6. Wat bewust niet

- Geen directe doorverwijsvraag in mail 1 of 2, nooit meer.
- Geen links in mail 1 en 2 (betere spam-score, en het houdt het een gesprek).
- Geen LinkedIn (PSOhub-scheiding), geen belrondes, geen betaalde gidsvermeldingen zolang de KvK-inschrijving er niet is.
- Geen beloftes of garanties in welke mail dan ook (vaste afspraak).
- Geen volume boven de 10 à 15 per dag; het domein verstuurt ook leadmails en die reputatie gaat voor.

## 7. Persona-toets (18-jul-2026): methode en uitkomst

De mails zijn in 4 rondes getoetst door inleef-agents op basis van `docs/skill-verwijzer-personas.md` (Marjolein, relatietherapeut, en Richard, budgetcoach: inbox-simulatie, zin-voor-zin-reactie, antwoordkans 0-10, "zou kunnen telt als nee"). Elke ronde met verse agents zodat ze niet hun eigen advies goedkeuren.

Scoreverloop (cumulatieve antwoordkans over de reeks): relatietherapeut 2 → 4 → 5 → 5,5; budgetcoach 2 → 3 → 7 → 7. Beide persona's schreven in de eindronde hun daadwerkelijke reply uit; bij beiden valt het antwoord op mail 2 (de geef-mail met vakvraag).

De vijf lessen die het verschil maakten, vasthouden bij alle toekomstige outreach:

1. **De doodzonde is hun vak of hun klant claimen.** "Jouw instrumentarium is er niet voor gebouwd" en "geldgedoe is zelden een relatieprobleem" kostten in ronde 1 vrijwel alle punten. De goedverdiener is juist de liefste klant van de budgetcoach; de gelddynamiek is juist het vak van de therapeut.
2. **Geven vóór vragen, en het verkeer de goede kant op.** De ommekeer kwam toen mail 1 zelf de doorverwijzing werd (ik stuur mensen naar jou) in plaats van een vraag om klanten of om tijd.
3. **Micro-vragen winnen.** "Eén woordje is genoeg" en een vakvraag ("wat wil jij vooraf weten bij een overdracht?") krijgen antwoord; "twintig minuten bellen om te kijken of het klikt" is de duurste vraag die je een vreemde kunt stellen.
4. **Eerlijkheid toon je, claim je niet.** "Paar mensen per jaar, geen stroom" en het open benoemen van het eigen belang (mail 3 budgetcoaches) bouwden het meeste vertrouwen; elk los woord "eerlijk" brak het af.
5. **Het resterende plafond is niet tekstueel.** Wat er nog mist is verifieerbaarheid: één collega die voor Jarno kan instaan, een ingevuld telefoonnummer, en (voor therapeuten) het A4-cadeau. Dat zijn echte-wereld-assets; verzin ze nooit in de copy.
