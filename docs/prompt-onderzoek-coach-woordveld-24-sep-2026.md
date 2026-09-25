# Prompt: onderzoek naar het woordveld rond "financieel coach", 24 september 2026

Gebruik: plak alles onder de streep in een nieuwe sessie met de map "Waar blijft het" gekoppeld en Chrome beschikbaar. Reken op één volle sessie. Er wordt in die sessie niets gebouwd; de uitkomst is een onderzoeksdocument plus een voorstel.

---

## Opdracht

Je doet onderzoek voor waarblijfthet.nl. Lees eerst `CLAUDE.md` en in `docs/bouwvolgorde.md` het blok BEGIN HIER. Alle regels daaruit gelden, in het bijzonder sectie 3 (waarheidsregels), 4 (positionering) en 8.A (verificatie).

**De vraag.** Mijn aanbod is: één persoon leest met de hand de cijfers van een huishouden dat goed verdient, geen schulden heeft en toch elke maand krap zit, en schrijft op waar het geld blijft. Gratis analyse als instap, Geldscan van 49 euro als betaalde stap. Mensen die precies dit zoeken, gebruiken waarschijnlijk andere woorden dan "financieel coach", of ze stellen een vraag aan een AI die nu uitkomt bij de verkeerde hulp. Zoek uit welke termen en vragen dat zijn, en waar ze nu landen.

"Verkeerd landen" betekent hier een van vier dingen:

1. **Verkeerde aanbieder.** De zoeker hoort bij mijn aanbod, maar Google of de AI stuurt hem naar schuldhulp, gemeente, bewindvoering, een Wft-planner van 2.000 euro of meer, een bank, of een budget-app.
2. **Verkeerde eigen pagina.** De site wordt vertoond of geciteerd, maar met een pagina die niet bij de vraag past (bijvoorbeeld een informatief artikel waar de zoeker een dienst zoekt, of andersom).
3. **Twee eigen pagina's op één vraag.** Kannibalisatie, de duurste fout op deze site (CLAUDE.md 8.A.2).
4. **Nergens.** De vraag bestaat, past bij het aanbod, en de site komt niet voor.

**De strategische deelvraag.** Onder welke naam voor de dienst en voor de persoon landt de zoeker het best: financieel coach, geldcoach, budgetcoach, iets met "meekijken", "scan" of "second opinion", of iets anders? Beantwoord dat alleen met wat je vindt, niet met een mening. Kan het niet worden vastgesteld, schrijf dat op.

## Niet opnieuw doen

Lees deze vier bestanden vóór je begint en maak er een uitsluitlijst van. Wat daar al getoetst is, toets je niet opnieuw; je verwijst ernaar.

- `docs/serp-financieel-coach-07-sep-2026.md`: zeven termen (financieel coach voor particulieren, persoonlijke financiële coaching, financieel planner particulier, persoonlijk financieel inzicht, budgetcoach voor mensen zonder schulden, financiële APK/check, waar gaat mijn geld naartoe hulp).
- `docs/serp-brainstorm-18-aug-2026.md`: 107 zoekzinnen met score.
- `docs/serp-gemiste-onderwerpen-23-sep-2026.md`: de top 10 en de werkwijze voor volumeklassen.
- `docs/serp-invalshoeken-06-sep-2026.md`, in elk geval het deel over N4.

Bestaande eigen pagina's in dit taalgebied, die je bij elke kandidaat meeweegt:

| URL | Wat hij beantwoordt |
|---|---|
| `/financieel-coach` | dienstpagina, "Financieel coach nodig? Online, vanaf gratis, geen traject verplicht" |
| `/geldscan` | dienstpagina Geldscan, 49 euro |
| `/inzichten/wat-kost-een-financieel-coach` | wat het kost |
| `/inzichten/verschil-budgetcoach-financieel-coach` | wie wat doet |
| `/inzichten/kan-iemand-naar-mijn-financien-kijken` (N4) | of het iets voor jou is zonder schulden |
| `/samenwerken/budgetcoaches` | verwijzerspagina, niet voor zoekers |

Nulmeting 5 september: het coach- en budgetcoach-cluster had 921 vertoningen en nul klikken, posities 20 tot 80.

## Vijf sporen, in deze volgorde

### Spoor 1. Het woordveld verzamelen (autocomplete en "Meer om te vragen")

Chrome, google.nl, hl=nl, gl=nl. De WebSearch-tool is voor dit werk verboden.

Begin met onderstaande startzinnen. Ze zijn een startpunt, geen bevinding: een term telt pas als hij in de autocomplete, in "Meer om te vragen", in "Mensen zoeken ook naar" of in GSC opduikt.

- **Rolnamen:** geldcoach, money coach, financial coach, financieel begeleider, geldtherapeut, financiële therapie, onafhankelijk financieel advies zonder product, financieel adviseur zonder hypotheek, thuisadministratie hulp.
- **Handeling:** iemand die meekijkt naar mijn financiën, uitgaven laten analyseren, bankafschriften laten bekijken, huishoudboekje laten nakijken, second opinion financiën, financiën laten doorlichten.
- **Product:** geldscan, budgetscan, uitgavenscan, huishoudscan, financiële scan, geldcheck, financieel rapport laten maken.
- **Probleem naar hulp:** geen schulden wel geldstress, goed inkomen toch krap hulp, elke maand tekort terwijl ik goed verdien, wie kan mij helpen met mijn uitgaven, hulp bij budgetteren zonder schulden.
- **Twijfel en vergelijken:** budgetcoach of financieel planner, budgetcoach of app, Nibud of budgetcoach, is een budgetcoach iets voor mij, budgetcoach ervaringen, budgetcoach eenmalig, budgetcoach online, schamen budgetcoach.
- **Wie betaalt:** budgetcoach via werkgever, budgetcoach vergoed, budgetcoach gemeente zonder schulden.
- **Samen:** samen naar een budgetcoach, geldcoach voor stellen. Let op overlap met `praten-over-geld-met-je-partner` en `financiele-ontrouw-partner-verzwijgt-geld`.

Noteer per startzin wat de autocomplete letterlijk aanvult. Schrap alles wat op de uitsluitlijst staat of onder "Wat niet gebouwd wordt" in CLAUDE.md valt (schuldhulp, beleggen, hypotheek, bespaartips, plaatsnamen).

### Spoor 2. Search Console: welke eigen URL krijgt welke vraag

Chrome, Search Console, property waarblijfthet.nl. Twee periodes: laatste 28 dagen en laatste 3 maanden.

1. Filter zoekopdrachten met een reguliere expressie, bijvoorbeeld `coach|budget|meekijk|adviseur|scan|check|begeleid|therap|hulp bij|inzicht`. Pas hem aan op wat spoor 1 opleverde.
2. Zet per zoekopdracht de URL erbij (tabblad Pagina's met de zoekopdracht als filter, of andersom).
3. Markeer:
   - zoekopdrachten waar een informatieve pagina staat terwijl de zoeker een dienst zoekt, of andersom (type 2);
   - zoekopdrachten waarop twee of meer eigen URL's vertonen (type 3);
   - zoekopdrachten met meer dan 50 vertoningen op positie 11 tot 30 (goedkoopste upgradekandidaten).
4. Vergelijk met de nulmeting van 5 september: is het coach-cluster verschoven sinds N4 live staat?

Kan Search Console niet geopend worden, vraag Jarno om een export van die zoekopdrachten en ga door met spoor 3.

### Spoor 3. Google-zoekresultaten voor de nieuwe kandidaten

Maximaal 15 termen, alleen termen uit spoor 1 en 2 die door het filter kwamen. Eén sessie. Leg per term vast, zoals CLAUDE.md 8.A.1 voorschrijft: wie staat er in de top 7, is er een AI-overzicht en wie citeert het, wat staat er in "Meer om te vragen" en "Mensen zoeken ook naar", staat er een eigen URL.

Voeg één kolom toe: **welk type aanbieder wint** (schuldhulp of gemeente, Wft-planner, bank, app, budgetcoach, forum, eigen site). Dat is het label voor "verkeerd landen".

### Spoor 4. AI-zoekmachines: waar sturen ze deze mensen heen

Stel 12 tot 15 vragen in de vorm waarin mensen ze aan een AI stellen. Gebruik de twee actieve profielen (Sandra: tweeverdienergezin, koopwoning, 5.000 tot 8.000 netto samen; Niels: alleenstaand of DINK, 3.500 tot 6.000 netto). Voorbeelden om van uit te gaan, pas ze aan op wat spoor 1 laat zien:

- "Wij verdienen samen 6.500 netto, hebben twee kinderen en een koophuis, en houden elke maand niks over. Wie kan daar naar kijken?"
- "Ik heb geen schulden maar wel geldstress. Waar kan ik terecht?"
- "Ik verdien 4.500 netto en snap niet waar mijn geld blijft. Heb ik een budgetcoach nodig of een financieel adviseur?"
- "Is er iemand die eenmalig naar mijn uitgaven kan kijken zonder dat het een traject wordt?"
- "Wat kost het om iemand naar je financiën te laten kijken?"
- "Is een budgetcoach alleen voor mensen met schulden?"
- "Hoe weet ik of mijn uitgaven normaal zijn voor ons gezin?"

Waar en hoe:

- **Perplexity, uitgelogd.**
- **ChatGPT, uitgelogd of in een tijdelijke chat.** Nooit via Jarno's eigen account: op 7 september gaf het geheugen daar ongevraagd advies over Waar blijft het in plaats van een neutraal antwoord.
- **Google AI-modus of AI-overzicht**, op google.nl.
- **Copilot of Bing**, als dat lukt, omdat ChatGPT-zoeken op Bing leunt.

Noteer per vraag en per machine: datum, ingelogd of niet, welke aanbieders genoemd worden, welk type hulp wordt aangeraden, of waarblijfthet.nl genoemd of gelinkt wordt en met welke URL, en of de beschrijving klopt (prijs, wat het wel en niet is). Citeer de kern van het antwoord letterlijk en kort. Een fout advies aan deze doelgroep, zoals gemeentelijke schuldhulp of een planner van 2.500 euro voor iemand die alleen wil weten waar het geld blijft, is precies de bevinding die ik zoek.

### Spoor 5. Eigen bezoekmeting: waar landen AI-bezoekers

Alleen lezen, geen nieuw scherm. Kijk in het Bezoekers-tabblad en in `/admin/analyse-verloop` (herkomst) naar bezoeken met een verwijzer als chatgpt.com, perplexity.ai, copilot, gemini of bing. Op welke pagina's landen ze, en starten ze de analyse? Is de n te klein om iets te zeggen, schrijf dat op en trek geen conclusie.

## Per kandidaat beoordelen

Elke term of vraag die overblijft krijgt één regel:

| Kolom | Inhoud |
|---|---|
| Term of vraag | letterlijk zoals gevonden |
| Gevonden via | autocomplete, PAA, GSC, AI |
| Past bij het aanbod | ja, deels of nee, met de reden (schulden, Wft, beleggen, lokaal, bespaartips = nee) |
| Waar landt hij nu | type 1 tot 4 hierboven, met de winnende aanbieder of de eigen URL |
| Eigen URL al vertoond | ja met URL, positie en vertoningen, of nee |
| Volume | klasse klein, middel of groot met de basis erbij, volgens de werkwijze van 23 september; nooit een verzonnen getal |
| Voorstel | a. niets; b. FAQ, antwoordblok of metaTitel op een bestaande URL (noem de URL); c. samenvoegen of 301; d. nieuwe pagina, alleen als de scheiding met de bestaande pagina's in één zin uit te leggen is; e. toevoegen aan de maandelijkse AI-test |

Voorkeur bij twijfel: b boven d. Er staan al vijf pagina's in dit taalgebied met samen bijna nul klikken; het probleem is waarschijnlijk niet een ontbrekende pagina.

## Waarheidsregels voor dit onderzoek

- Elke observatie met datum en bron. Een AI-antwoord is een observatie van dat moment, geen feit over de markt.
- Geen zoekvolumes verzinnen. Geen marktclaim of uniciteitsclaim ("niemand in Nederland doet dit"). Niet gevonden is niet hetzelfde als niet aanwezig.
- Nibud.nl blokkeert automatisch opvragen; vraag Jarno om wat je daarvan nodig hebt.
- Blokkeert Google Trends, stop daar en gebruik de klassen zonder Trends-index, met die beperking erbij.

## Wat je oplevert

1. **`docs/serp-coach-woordveld-<datum>.md`**, met:
   - werkwijze en bronnen, met datum en ingelogde staat per machine;
   - de uitsluitlijst en waar elk item al staat;
   - de tabel met alle kandidaten;
   - de AI-tabel per vraag en per machine;
   - een top 10, gesorteerd op fit met het aanbod en goedkoopste actie;
   - het antwoord op de strategische deelvraag (welke naam landt het best), met het bewijs ervoor, of de vaststelling dat het niet te zeggen is;
   - "bewust niet", met reden;
   - een voorgestelde volgorde die binnen de tempo-regel past (twee pagina's per week, de eerstvolgende nieuwe pagina niet vóór 5 oktober).
2. **Een update van `docs/bouwvolgorde.md`**: één alinea in BEGIN HIER en een sectie in het logboek. Wat voorgesteld is, staat onder "geparkeerd" of als voorstel, niet als besluit. Jarno beslist.
3. **Nieuwe AI-testvragen** die de moeite waard zijn, als voorstel voor de maandelijkse test (CLAUDE.md 8.E.21).
4. Commit aan het eind (CLAUDE.md 10.11), alleen de docs. Niet pushen.

Bouw in deze sessie niets: geen pagina, geen FAQ, geen metaTitel. Ook als een wijziging klein en voor de hand liggend lijkt, gaat hij in het voorstel.
