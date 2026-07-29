# Uitvoeringsprompt voor Sonnet (28 juli 2026)

Kopieer alles onder de streep in een nieuwe sessie in dezelfde projectmap.

---

Je voert een tekst- en copywijziging uit in het project "Waar blijft het". Het denkwerk is al gedaan. Jouw taak is uitvoering: neem de aangeleverde copy letterlijk over in de code. Verzin niets, herformuleer niets, en neem geen strategische beslissingen.

## Lees eerst, in deze volgorde

1. `CLAUDE.md` in de projectroot. Let vooral op de harde werkregels 1 tot 9.
2. `docs/introductiegesprek-voorbeeldrapporten-aanbodcopy-28-jul-2026.md`. **Dit is de bron van alle teksten in deze opdracht.** Elke sectieverwijzing hieronder (§1.5, §2.1, §3.4 enzovoort) verwijst naar dit bestand.

## Harde regels waar je niet van afwijkt

1. **Schrijf en wijzig bestanden altijd via python3 in bash** (heredoc, of read plus replace). De Edit- en Write-tools trunceren bestanden stilzwijgend op dit NTFS-mount, ook bij kleine wijzigingen. Noteer voor en na elke wijziging het regelaantal met `wc -l` en controleer dat het klopt.
2. Na elke codewijziging moet `npx tsc --noEmit --incremental false` schoon zijn. Controleer ook op null bytes.
3. Geen em dashes en geen koppeltekens als scheidingsteken in copy. Getalbereiken schrijf je als "2 tot 3".
4. Het woord "eerlijk" komt nergens in nieuwe of gewijzigde copy voor.
5. Ik-vorm, nooit wij, we of ons in Jarno's stem.
6. Prijzen zonder btw-vermelding. Noem nergens zijn werkgever of functie daar.
7. Geen garantie, geen geld-terug-belofte, geen resultaatbelofte.
8. Verzin geen klantcases, resultaten, bronnen of marktclaims. Als een tekst in de bron een cijfer bevat, neem je dat cijfer letterlijk over en verander je er niets aan.

## Wat je doet, per bestand

### 1. Nieuw: `app/voorbeeldrapport/page.tsx`

De enige nieuwe pagina in deze opdracht.

- Statische server component, gebruik `Header` en `Footer` net als `app/geldscan/page.tsx`.
- Metadata: title "Voorbeeldrapport: zo ziet een geldrapport eruit", description mag je uit de eerste alinea van §2.3 halen, canonical `https://www.waarblijfthet.nl/voorbeeldrapport`, robots index en follow.
- Inhoud, in deze volgorde: de pagina-inleiding uit **§2.3**, dan voorbeeldrapport 1 uit **§2.1**, dan voorbeeldrapport 2 uit **§2.2**. Neem alle tekst en alle bedragen letterlijk over.
- **De disclaimer moet drie keer per rapport zichtbaar zijn:** het woord "(fictief)" in de H2-kop van het rapport, het disclaimerblok bovenaan het rapport, en hetzelfde blok onderaan. Geef die blokken een eigen visuele stijl (kader of gekleurde achtergrond), zodat ze niet als lopende tekst wegvallen.
- Volg qua opbouw het patroon van `verschil-budgetcoach-financieel-coach`, dat volgens `docs/contentaudit-top10-jul-2026.md` het best gebouwde artikel is: geen ScanBox, geen "Herken je dit"-doos, meteen inhoud. In de eerste 700 pixels op 390px breed moet de bezoeker de H1 en het fictielabel zien.
- De maandtabellen: op mobiel geen brede tabel met vier kolommen. Gebruik per post een regel met de omschrijving en het bedrag onder elkaar, of een tabel van twee kolommen. Controleer dat er geen horizontale scroll ontstaat op 390px.
- Geen Article-schema en geen FAQPage-schema op deze pagina, want het is geen artikel en het zijn geen veelgestelde vragen. Een `WebPage`-schema mag, meer niet.
- Zet de pagina **niet** in `lib/inzichten-data.ts`. Dit is geen artikel.

### 2. `scripts/generate-sitemap.mjs`

- Voeg `{ loc: "/voorbeeldrapport", priority: "0.9" }` toe aan de `statisch`-array.
- Voeg in de `llms`-string een regel toe bij de belangrijkste pagina's: `- [Voorbeeldrapport](${HOST}/voorbeeldrapport): twee complete voorbeelden van een geldrapport, fictieve huishoudens`.
- Drie bestaande fouten in diezelfde `llms`-string repareren, want ze staan in strijd met de werkregels: het woord "eerlijk" komt er twee keer in voor (schrappen of herformuleren), er staat een koppelteken als scheidingsteken in "beleggingsadvies - alleen grip op het maandbudget" (vervang door een punt of komma), en er staat "Over ons" terwijl het "Over mij" moet zijn. Ook "vergelijken ze hun uitgaven" mag blijven, dat is de derde persoon over bezoekers en geen wij-vorm.
- Draai daarna `node scripts/generate-sitemap.mjs` en controleer dat `public/sitemap-0.xml`, `public/robots.txt` en `public/llms.txt` bijgewerkt zijn.

### 3. `lib/aanbod-content.ts`

- Vervang de teksten van alle drie de pakketten door de inhoud uit **§3.11**.
- **Behoud de sleutels** `geldscan`, `gesprek` en `intensief` en het type `Pakket`, want `app/aanbod/intake` gebruikt ze.
- Zet bij `geldscan` de naam op "Geldrapport". De slug `/geldscan` blijft ongewijzigd. Doe **geen** sitewide zoek-en-vervang van geldscan naar geldrapport; alleen in de bestanden die in deze opdracht staan.
- Houd de scheiding tussen `hoeHetWerkt` en `watJeKrijgt` strikt zoals de commentaarregels bovenaan het bestand voorschrijven.

### 4. `app/aanbod/page.tsx`

Volledige copyherziening volgens **§3.1 tot en met §3.10**. Concreet:

- Metadata vervangen door §3.1.
- Hero: kop, body en het Jarno-kaartje vervangen door §3.2. **Verwijder de regel "Al meer dan 50 gezinnen en individuen deden de analyse."** en zet daar de link naar `/voorbeeldrapport` uit §3.2.
- Nieuw blok direct onder de hero: §3.3.
- **Vervang de `routes`-array met drie prijskaarten** door de twee blokken uit §3.4. De badge "Meest gevraagd" verdwijnt volledig, ook uit de code.
- Nieuw blok: het gratis kwartier uit **§1.5**. Secundaire knopstijl, geen groene doos, geen tweede primaire knop. Knop is een mailto: `mailto:hallo@waarblijfthet.nl?subject=Kennismaken%20(15%20minuten)`.
- Nieuw blok: de twaalf gratis plekken uit **§3.6**. Bescheiden opmaak, geen groene doos. De knop wordt ook een mailto: `mailto:hallo@waarblijfthet.nl?subject=Gratis%20plek%20geldrapport`. **Laat de regel "Er zijn nog {aantal} plekken." helemaal weg**, want er is geen betrouwbare teller. Het woord "twaalf" in de kop blijft.
- De `details`-array krimpt tot alleen `geldscan`. Die sectie houdt de bestaande tweekolomsopmaak met "Hoe het werkt" en "Wat je krijgt", want die werkt. De secties voor adviesgesprek en traject verdwijnen als kaart en worden het ene tekstblok uit **§3.7**, met de prijzen 125 en 497 zichtbaar in lopende tekst.
- Nieuw blok: §3.8, wanneer je hier niets aan hebt.
- `faqSchema` vervangen door de acht vragen uit **§3.9**, woordelijk.
- **De testimonialsectie blijft exact zoals hij is.** Sanne en Joris, Daan en Roos, Bram en Eva, Karim en Noor en de regel over aangepaste namen: niet aanraken.
- Finale CTA vervangen door §3.10.
- Behoud alle bestaande `TrackClick`-componenten en hun `gebeurtenis`-namen. Waar een kaart verdwijnt, verdwijnt de bijbehorende TrackClick mee; verzin geen nieuwe gebeurtenisnamen.

### 5. `app/aanbod/components/AanbodAccordion.tsx`

- Vervang de `vragen`-array door dezelfde acht vragen en antwoorden uit **§3.9**, woordelijk identiek aan wat je in `faqSchema` hebt gezet. Deze twee moeten letterlijk hetzelfde zijn.

### 6. `app/geldscan/page.tsx`

- Voeg direct onder de primaire CTA de regel uit **§1.7** toe, in kleine grijze tekst, met de mailto-link voor het kwartier.
- Voeg naast die CTA ook een link naar `/voorbeeldrapport` toe met de tekst "Zie eerst een compleet voorbeeld".
- Voeg in de `faq`-array een nieuwe vraag toe, direct na "Wat is de geldscan precies?": de vraag "Kan ik je eerst spreken?" met het antwoord uit **§1.7**. Het `faqSchema` wordt uit die array gegenereerd, dus één wijziging is genoeg.

### 7. `app/analyse/stappen/Stap6Resultaat.tsx`

Dit is het warmste punt van de funnel en volgens `docs/contentaudit-top10-jul-2026.md` komt het woord geldscan er nu nul keer voor. Repareren:

- Het hoofdaanbod op de resultaatstap wordt **het geldrapport van 49 euro**, met de tekst uit **§1.6**. Dat vervangt het huidige blok dat als enige betaalde vervolgstap het adviesgesprek van 125 euro aanbiedt.
- Onder dat blok komt de regel over het kwartier uit §1.6, klein en grijs.
- Het adviesgesprek mag blijven bestaan als zachte tekstlink, maar niet meer als eerste of enige aanbod.
- Zet het e-mailformulier **na** het aanbod zoals nu, maar controleer dat er niet twee groene blokken achter elkaar staan. Één aanbodblok, verder niets.
- Bouw **geen** aparte route of formulier voor een gratis plek. Als je daar iets wil aanbieden, gebruik dezelfde mailto als op /aanbod.

### 8. `app/resultaat/[token]/page.tsx`

- De volgorde staat hier omgedraaid ten opzichte van de funnel: het adviesgesprek staat boven en de geldscan eronder als secundaire optie. Draai dat om, het geldrapport eerst.
- Verwijder het woord "eerlijk" uit de kop "Een eerlijk adviesgesprek" en herformuleer die kop nuchter.

## Wat je expliciet niet doet

1. Geen nieuwe artikelen, en `lib/inzichten-data.ts` blijft ongemoeid. Er gaan tot 25 oktober nul artikelen bij.
2. Niets aan de 79 bestaande artikelcomponenten. De dubbele CTA's, de rekenfout in potjesmethode en de niet-gelabelde klantvoorbeelden zijn echte problemen, maar ze horen bij een aparte opdracht en niet bij deze.
3. De vier echte testimonials niet herschrijven, niet verplaatsen en niet aanvullen.
4. De betaalvolgorde niet wijzigen. §3.14 beschrijft een variant waarbij je eerst levert en daarna factureert. Dat is een beslissing voor Jarno en die is nog niet genomen. Houd de bestaande volgorde: aanmelden, betaalverzoek, dan de analyse invullen.
5. Geen boekingstool, geen agendakoppeling, geen nieuwe dependency. Het kwartier is een mailto-link en niets meer.
6. Geen `git push`. Alleen Jarno kan pushen.
7. Geen nieuwe pagina's behalve `/voorbeeldrapport`.

## Verificatie voordat je klaar bent

Draai dit en los alles op wat eruit komt:

1. `npx tsc --noEmit --incremental false` moet schoon zijn.
2. Zoek in alle gewijzigde en nieuwe bestanden naar em dashes en en dashes, naar " - " als scheidingsteken, en naar het patroon cijfer-koppelteken-cijfer. Nul treffers in copy.
3. Zoek in alle gewijzigde en nieuwe bestanden naar "eerlijk". Nul treffers.
4. Zoek naar de wij-vorm in Jarno's stem: " wij ", " we ", " ons ", " onze ". Alleen toegestaan in de bestaande testimonialquotes.
5. Controleer op null bytes in elk aangeraakt bestand.
6. Vergelijk de regelaantallen van voor en na per bestand en bevestig dat er niets is afgekapt.
7. Tel na of de acht FAQ-teksten in `page.tsx` en in `AanbodAccordion.tsx` woordelijk gelijk zijn.
8. Reken de bedragen in `/voorbeeldrapport` één keer na tegen §2.1 en §2.2, met een klein python-scriptje. In rapport 1 moet gelden: maandlasten 5.706, vrij 394, jaarposten 5.500, gat 64. In rapport 2: maandlasten 3.436, vrij 414, jaarposten 6.385, gat 118. En de percentagekolommen moeten in beide rapporten precies optellen tot 100,0. Klopt het niet, dan heb je een getal verkeerd overgenomen; pas het niet aan maar zet het terug zoals het in de bron staat.
9. Draai `node scripts/generate-sitemap.mjs` en controleer dat `/voorbeeldrapport` in `public/sitemap-0.xml` en `public/llms.txt` staat.

## Afsluiten

Werk `CLAUDE.md` bij met een korte sessienotitie: welke pagina's zijn herschreven, dat `/voorbeeldrapport` bestaat met twee fictieve voorbeelden, dat het gratis kwartier op vier plekken staat, en dat de betaalvolgorde bewust ongewijzigd is gelaten. Voeg de openstaande beslissing uit §3.14 toe aan de checklist voor Jarno.

Maak daarna één commit met een beschrijvende boodschap. Pushen doet Jarno zelf. Klaagt de commit over `HEAD.lock`, verwijder dat bestand met de hand.
