# Analyse van de gebruikersfeedback op de site (30-jul-2026)

Kritische beoordeling van de gebundelde testfeedback. Per punt: klopt het, weegt het zo zwaar als de tester zegt, wat is de conclusie, en welke wijziging volgt eruit. Alle uitspraken over de huidige site zijn geverifieerd in de code op 30-jul-2026, met bestand en regelnummer.

## 0. Eerst iets over de feedback zelf

Twee kanttekeningen die je nodig hebt voordat je iets met de inhoud doet.

**Het is een gebundelde tekst in een enkele stem, niet een set losse observaties.** De hele tekst staat in de ik-vorm met een doorlopende gedachtegang ("mijn eerste reactie", "waar je me kwijtraakt"). Daarmee is het niet meer na te gaan wat meerdere mensen onafhankelijk van elkaar opmerkten en wat de mening van een enkele lezer is. Bij gebruikersonderzoek is precies dat het waardevolste signaal: drie mensen die op dezelfde plek afhaken weegt zwaarder dan een uitgebreid betoog van een. Als je de losse reacties nog hebt, is het de moeite waard om per punt te tellen hoeveel mensen het noemden. Zo niet, behandel dit dan als een sterke expertreview van een persoon, niet als testresultaat van een groep.

**De schrijver is geen Sandra of Niels.** Hij gebruikt waardepropositie, steekproef, n=, conversie en bewijsbasis. Dat is iemand met marketing- of onderzoeksogen die ook nog eens in de doelgroep valt. Zijn oordeel over positionering en bewijsvoering is daardoor bruikbaarder dan gemiddeld. Zijn voorspelling van wat een gewone bezoeker in dertig seconden denkt, is dat niet: dat blijft een aanname, net als de mijne. Er is geen gedragsdata in deze feedback.

Wat er wel aan gedragsdata is: 292 bezoekers in 30 dagen, 15 gestarte analyses, 8 voltooid, 2 leads, 0 betaald. Plus de wetenschap dat /geldscan en /adviesgesprek tussen 8-jul en 30-jul een 500 gaven bij verzenden. Als de tester in die periode had willen aanmelden, was hij vastgelopen. Hij noemt het niet, dus hij heeft het niet geprobeerd, wat op zichzelf een signaal is: hij heeft de site beoordeeld, niet gekocht.

## 1. Waar de tester gelijk heeft, in volgorde van gewicht

### 1.1 "Ik laat zien waar het naartoe gaat" is te zwak. Dit is het scherpste punt in de hele feedback.

Klopt, en het is de belangrijkste zin op de site. Huidige tekst, `components/HomeConcept.tsx:204-208`:

> Je betaalt alles op tijd. Je doet niks geks. Maar aan het einde van elke maand is het gewoon weg. Je weet niet precies waarheen. Dat ligt niet aan jou, het is een structuurprobleem. Ik laat zien waar het naartoe gaat, zodat je het kunt bijsturen.

Zijn tegenwerping "dat kan mijn bankapp ook" is niet af te doen als luiheid van de lezer. Hij heeft feitelijk gelijk: ING, Rabobank en ABN categoriseren uitgaven, tonen maandvergelijkingen en pushen meldingen. Zichtbaarheid is een gratis commodity. Wat een bankapp niet doet is jouw bedragen naast vergelijkbare huishoudens leggen en er een oordeel bij schrijven. Dat is precies wat jij doet, en het staat nergens in de belofte boven de vouw.

Let op dat je dit elders wel goed opschrijft. `app/aanbod/page.tsx:177` zegt "de drie plekken waar het weglekt en per plek wat ik zou doen". Dat is de sterke formulering. De homepage is achtergebleven bij /aanbod van 28-jul.

**Conclusie:** de belofte moet van zichtbaarheid naar vergelijking plus oordeel. Niet omdat de tester het mooier vindt, maar omdat de huidige belofte aantoonbaar door een gratis app wordt geleverd.

### 1.2 "Dat ligt niet aan jou, het is een structuurprobleem" is een claim die je niet kunt maken

Klopt, en dit is een schending van je eigen werkregel 4b in een vorm die je nog niet had opgemerkt. Je doet een diagnose voordat je iets hebt gezien. Bij een deel van de bezoekers is het geen structuurprobleem maar 1.400 euro per maand aan horeca en kleding, en dan is de zin onwaar. Erger: het is de zin die je product overbodig maakt, want als de oorzaak al bekend is, waarom zou ik dan 49 euro betalen om hem te laten uitzoeken.

Waar de tester te ver gaat: hij stelt voor de zin te vervangen door drie keer "misschien". Dat is inhoudelijk beter maar haalt ook de ontlasting weg, en die ontlasting doet werk bij een doelgroep die zich schaamt. De ICP-notities en de schaamte-softening in de analyse-flow zijn daar niet voor niets. De betere oplossing scheidt de twee dingen die nu in een zin zitten geplakt: de ontlasting mag blijven staan, de diagnose moet eruit.

Voorstel:

> Je betaalt alles op tijd. Je doet niks geks. Maar aan het einde van elke maand is het gewoon weg. Dat je zelf niet ziet waarheen, is logisch: niemand legt zijn eigen cijfers naast die van vergelijkbare huishoudens. Ik doe dat wel, en ik schrijf op wat eruit springt.

Dat repareert 1.1 en 1.2 in een keer. De ontlasting zit nu in "is logisch" in plaats van in een uitspraak over de oorzaak.

Dezelfde zin staat ook in twee artikelen (`alleen-wonen-goed-salaris-toch-krap.tsx:40`, `goed-salaris-toch-geldstress.tsx:41` en `:62`) en in vier FAQ-antwoorden in `lib/inzichten-data.ts` (129, 962, 1162, 1185). In een artikel is het een algemene bewering over de doelgroep en dus minder erg dan een belofte in een hero, maar het blijft een onbewezen generalisatie. Homepage nu, artikelen bij de volgende contentronde na 25-okt.

### 1.3 De 460 euro is je zwakste plek, en zwakker dan hij denkt

Hij vraagt om een n. Dat is de verkeerde vraag, want het antwoord maakt het erger. De 460 euro staat op vier plekken (`HomeConcept.tsx:396`, `geldscan/page.tsx:268`, `financieel-coach/page.tsx:65`, plus het artikel over wat een coach kost) en op de homepage als geanimeerde `CountUp` naast twee stats die wel een bron hebben (Deloitte 2024, Nibud 2026). Die opmaak leent geloofwaardigheid van de buren.

Er zijn drie problemen, in oplopende ernst:

1. De steekproef is klein. Volgens `docs/groeibeslissing-aug-2026.md` is Sanne en Joris je enige geldscan-klant en zijn er daarnaast enkele begeleidingsklanten. Een gemiddelde over een handvol huishoudens is ruis, en twee decimalen aan schijnprecisie erbij.
2. Er staat nergens hoe het gemeten is. Meer over ten opzichte van welke maand, over hoeveel maanden, door jou geteld of door hen gezegd? Zonder die definitie is het geen resultaat maar een indruk.
3. Een exact gemiddeld eurobedrag is precies het soort getal dat een journalist of een verwijzer navraagt. Je gaat de komende drie maanden juist die twee groepen aanspreken.

**Conclusie:** dit is geen "zet er een n bij"-fix. Haal het gemiddelde weg tot je een meting hebt die de vraag "hoe weet je dat" overleeft. Een concreet geval met toestemming is nu sterker dan een gemiddelde: een huishouden, wat je vond, wat het opleverde. De tester zegt dit zelf halverwege ("als de steekproef nog klein is, zou ik het gemiddelde zelfs minder prominent maken") en trekt die conclusie dan niet door in zijn prioriteitenlijst. Trek hem wel door.

### 1.4 De privacy-inconsistentie. Hier heeft hij gelijk, en het is veel groter dan een tekstprobleem

Hij ziet twee teksten die niet bij elkaar passen. Er is meer aan de hand: de teksten kloppen niet met wat de code doet. Vier bevindingen, allemaal geverifieerd:

- `app/privacy/page.tsx:41` zegt dat analyse-antwoorden "volledig anoniem" worden bewaard. In `app/api/quiz-lead/route.ts:76-87` gaat het e-mailadres op dezelfde rij als alle bedragen in `quiz_resultaten`. Dat is niet anoniem.
- `privacy/page.tsx:40` zegt dat antwoorden alleen worden bewaard als je toestemming geeft. `app/analyse/QuizClient.tsx:93-118` schrijft bij elke stap het volledige antwoordenobject naar `quiz_voortgang`, zonder toestemming, en de RLS-policy op die tabel staat anoniem lezen toe.
- `privacy/page.tsx:74` belooft verwijderen na maximaal 2 jaar. Er is geen cron, geen SQL-policy en geen code die dat doet. De enige geautomatiseerde opschoning in de repo gaat over `cron_runs` en de GSC-cache.
- "Er blijft niets bewaard" op /geldscan (`:56` en `:128`), /aanbod (`:65`), de accordion en de bevestigingsmail. De afschriften komen los per mail en die kun je met de hand weggooien, maar `intake_aanvragen` houdt naam, e-mail, inkomensbracket, knelpunt en de koppeling naar de analyse, en de gekoppelde `quiz_resultaten`-rij blijft ook staan. Er wordt op geen enkel moment iets verwijderd door de software.

Dat laatste is een belofte over gegevensverwerking die feitelijk onjuist is, op de pagina waar je om bankafschriften vraagt. Los van AVG-risico is het het enige punt in deze hele feedback dat je merk in een keer kan slopen, want het is controleerbaar door iedereen die het je vraagt.

Twee dingen die de tester niet zag en die er los bij horen: de privacypagina staat in de wij-vorm ("we verzamelen", "we bewaren"), wat tegen je eigen vaste regel ingaat dat je overal ik schrijft, en de pagina noemt alleen Supabase als verwerker terwijl je ook via Resend mailt en op Vercel host. Datum onderaan is mei 2026.

**Conclusie:** hoogste prioriteit van de hele lijst, hoger dan alle conversiepunten. En het is geen copyklus: eerst bepalen wat je werkelijk gaat bewaren en verwijderen, dat dan bouwen of als handmatige routine vastleggen, en pas daarna opschrijven.

### 1.5 Je legt niet uit hoe je vergelijkt. En daar zit een probleem onder

Klopt. De site zegt dat je vergelijkt met huishoudens in vergelijkbare situaties (`over/page.tsx:177`, `financieel-coach/page.tsx:226-230`) en noemt Nibud, CBS en Belastingdienst als bron, maar `over/page.tsx:206` zegt letterlijk "bij elk artikel vermeld ik waar de cijfers vandaan komen". De bronvermelding is dus toegezegd voor de artikelen, niet voor de vergelijking zelf.

De vergelijking zit in `lib/benchmarks.ts`: boodschappen 485, 620, 755 en 890 naar aantal kinderen, vrij besteedbaar 18, 15, 12 en 8 procent naar inkomensklasse, wonen 28 procent bij koop en 30 bij huur, plus een vervoerstabel. In dat bestand staat geen enkele bronvermelding, ook niet in commentaar. Dat betekent dat het kloppende antwoord op de vraag van de tester ("hoe bepaal je dat 900 euro boodschappen veel is") op dit moment niet te geven is zonder de herkomst van die getallen te reconstrueren.

**Conclusie:** dit is de meest onderschatte bevinding in de lijst. Niet omdat er een methodepagina moet komen, maar omdat je eerst zelf moet kunnen vertellen waar die vier boodschappenbedragen vandaan komen. Kun je dat, dan is een methodeblok een halve dag werk en meteen je sterkste autoriteitssignaal, want geen concurrent publiceert zijn benchmark. Kun je het niet, dan is dat een correctie die belangrijker is dan alle copy in dit document.

### 1.6 De geldscan is interessanter dan coaching

Klopt als richting, maar hij trapt een deur open die op 28-jul al is opengezet. /aanbod is volledig herbouwd rond het geldrapport: er is nog een productkaart met een knop, het adviesgesprek van 125 en het traject van 497 staan alleen als tekstblok met een mailto, en `page.tsx:306` zegt uitdrukkelijk dat je die twee niet als knop neerzet omdat je ze bijna nooit als eerste stap zou aanraden.

Wat er nog niet klopt zit op de homepage:

- Eyebrow boven de hero (`HomeConcept.tsx:196`): "Financiële coaching · Nederland". Dat is het woord waarvan de tester zegt dat het hem afstoot, en het is het eerste dat er staat.
- Stap 3 in "Hoe het werkt" (`:176`) zet de geldscan en het adviesgesprek van 125 euro naast elkaar als gelijkwaardige keuze.
- De knop in dat blok (`:377`) is de gratis analyse, niet het rapport.

Dat /financieel-coach coaching-taal gebruikt is bewust: dat is de SEO-pagina voor die zoekterm. Niet aankomen.

**Conclusie:** klein en concreet. Geen herpositionering, drie plekken op de homepage.

### 1.7 "Laat direct een echte output zien"

Half klopt het, en de diagnose is fout op een manier die de oplossing verandert. `/voorbeeldrapport` bestaat sinds 28-jul en bevat twee volledige rapporten van negen blokken, met maandoverzicht, drie lekken met "wat ik zie", "wat ik zou doen" en "wat dit niet oplost", plus een blok over wat je niet weet. Dat is precies wat hij vraagt, inclusief de uitkomst dat het gat 64 respectievelijk 118 euro is, wat kleiner is dan het gevoel.

Het probleem is dat hij het niet gevonden heeft. De homepage linkt nergens naar /voorbeeldrapport. Nul keer in `HomeConcept.tsx`. Op /geldscan staat de link als platte tekstlink onder de knoppen (`:179-185`). Op /aanbod staat hij wel prominent.

Dus: de content is er, de route ernaartoe niet. Dat is een uur werk, geen schrijfklus.

Een tweede punt dat hij niet kon zien omdat hij de pagina niet bereikte: het fictie-label staat er per rapport vier keer, met een gele disclaimer zowel voor als na elk rapport (`voorbeeldrapport/page.tsx:211-222`, `437-444`, `451-462`, `679-686`), plus in de titel en in de intro. De keuze om het te labelen is juist en volgt uit werkregel 4. Vier keer per rapport werkt tegen je: de lezer moet na het lezen van een overtuigend rapport nogmaals horen dat het niet echt is, precies op het moment dat hij dacht "misschien ziet hij dat bij ons ook". Eenmaal duidelijk vooraf en in de titel is genoeg. De disclaimer erna kan weg.

### 1.8 "Verkoop antwoord, geen bezuiniging"

Klopt, en dit doe je al grotendeels goed. `geldscan/page.tsx:265` noemt "aanknopingspunten" en de voorbeeldrapporten eindigen op inzicht, niet op een besparingstotaal. Restpunt: het illustratieblok op /geldscan (`:244-272`) telt op naar "ruim 260 euro per maand" en de drie bullets zijn dubbele verzekering, boodschappen en vergeten abonnementen. Dat is de bezuinigingslijst waar hij niet op zit te wachten, en het staat op je verkooppagina. De twee fictieve rapporten op /voorbeeldrapport zijn hier veel beter in: die benoemen dat de vaste lasten niet het probleem zijn. Vervang dat blok door een fragment uit het rapport.

## 2. Waar hij te zwaar aanslaat of ernaast zit

**"Waarom kan Jarno iets ontdekken wat wij zelf niet zien" is geen copyprobleem.** Hij vraagt uiteindelijk: heb je dit vaak genoeg gedaan om patronen te zien? Het antwoord is nu nee, en geen enkele formulering verandert dat. Dit is exact de bindende beperking die in `docs/groeibeslissing-aug-2026.md` staat en waarvoor de inzet van twaalf scans en vijf klantverhalen is bedacht. Zijn feedback bevestigt dat plan, hij levert er geen alternatief voor. De verleiding om dit met tekst te repareren moet je weerstaan, want alles wat je hier opschrijft zonder onderliggend werk is een claim uit de categorie die je al twee keer terug hebt moeten draaien.

Wat wel kan zonder klanten: uitleggen wat je met de cijfers doet (1.5). Dat is methode, niet ervaring, en het is verifieerbaar.

**"Second opinion op onze financiën" is een aantrekkelijke maar riskante term.** Hij komt zelfstandig op dezelfde framing uit als je eigen onderzoek van 27-jul, wat de framing sterker maakt. Maar in dat onderzoek is de betaalde second opinion afgevallen omdat een oordeel over het advies van een ander zelf vergunningplichtig advies is. Die redenering is gebouwd op een geverifieerde AFM-regel maar niet juridisch getoetst. Een second opinion op je eigen cijfers is iets anders dan een second opinion op andermans advies, dus de term is niet per se verboden. Maar hem tot kernpositionering maken zonder die grens uit te zoeken zou onverstandig zijn. Gebruik voorlopig "een blik van buiten op jullie eigen cijfers".

**Zijn 90-secondenmodel is een frame, geen bewijs.** Het is een prettige manier om de pagina te lopen en de vijf stappen zijn nuttig als checklist. Maar "stap 3 en 4 zijn waar je conversie wordt gewonnen of verloren" is een aanname. Je hebt 8 voltooide analyses in 30 dagen. Bij die volumes is elke uitspraak over waar conversie kantelt statistisch leeg. Gebruik zijn lijst als prioritering van wat logisch ontbreekt, niet als conversievoorspelling.

**"Maak de propositie nog veel harder rond de scan" en zijn voorgestelde kernzin.** De zin die hij voorstelt ("Geef mij jullie cijfers. Ik zoek het uit.") is goed en past bij 1.1. Maar hij stelt hem voor als vervanging van de hele positionering, inclusief het weghalen van coaching. Dat is meer dan nodig. Het adviesgesprek en het traject zijn je enige routes naar een omzet die niet uit rapporten van 49 euro bestaat, en ze staan al op de juiste plek in de hiërarchie. Wat moet veranderen is de opening van de homepage, niet het aanbod.

**Wat hij niet noemt en wat mogelijk meer heeft gekost dan alles hierboven:** het aanmeldformulier gaf drie weken lang een 500. Als je de conversie van deze site beoordeelt op de cijfers van juli, beoordeel je een kapotte trechter. Dat relativeert niet zijn feedback, maar wel de urgentie waarmee je aan positionering moet gaan sleutelen voordat je weet wat de werkende versie doet.

## 3. Conclusies

1. Twee van zijn zes prioriteiten (geldscan primair, voorbeeldrapport) zijn sinds 28-jul grotendeels gebouwd. Zijn feedback beschrijft een site die de bezoeker niet vindt, niet een site die het niet heeft. Het werk zit in doorverwijzen en in de homepage, niet in nieuwe content. Dat komt overeen met zijn eigen slotconclusie: de verhouding uitleg naar bewijs moet veranderen, er hoeft niets bij.
2. De echte urgentie ligt niet bij conversie maar bij twee dingen die feitelijk niet kloppen: de privacybeloften tegenover wat de code doet, en de benchmark zonder herkomst. Beide zijn precies het type fout dat je in dit project al twee keer hebt gemaakt (de 272-euro-claim, de Nibud-uitsplitsing) en beide worden zichtbaar op het moment dat er journalisten en verwijzers gaan meelezen, wat de komende drie maanden het plan is.
3. Het autoriteitsgat is echt en niet met tekst te dichten. Dat is een bevestiging van de lopende inzet, geen aanleiding om die te herzien.
4. Dit is geen aanleiding voor een redesign of een nieuwe positioneringsronde. Het is een lijst van veertien afgebakende ingrepen, waarvan het grootste deel in een dag past.

## 4. Wat ik zou doorvoeren, in deze volgorde

**Blok A, waarheid herstellen. Eerst, en niet doorschuiven.**

1. Bepalen wat er werkelijk bewaard blijft en wat verdwijnt, per flow (analyse, intake, afschriften, paginagebeurtenissen). Dan de verwijdering bouwen of als vaste handmatige stap in je eigen proces vastleggen. Pas daarna de teksten.
2. Privacypagina herschrijven: ik-vorm, alle verwerkers (Supabase, Resend, Vercel), het onderscheid tussen de gratis analyse en het betaalde rapport apart benoemen, "volledig anoniem" schrappen of waar maken, en de 2-jaarstermijn alleen laten staan als hij ook wordt uitgevoerd. Datum bijwerken.
3. Toestemming in de analyse-flow gelijktrekken met de werkelijkheid: `quiz_voortgang` slaat nu alles op voor iemand op een vinkje klikt. Of dat stopzetten tot na toestemming, of het in de tekst benoemen. Ook een link naar /privacy in de flow en in het intakeformulier, die er nu niet is.
4. De 460 euro van alle vier de plekken weghalen. Vervangen door een concreet geval met toestemming, of door niets. Vanaf de eerstvolgende geleverde scan een vaste voor- en nameting bijhouden, met een gedefinieerde methode, zodat je later wel een getal kunt publiceren.
5. Herkomst van `lib/benchmarks.ts` reconstrueren en als commentaar met bron en datum in het bestand zetten. Als een getal niet te herleiden is, dat getal corrigeren of de bijbehorende bewering op de site afzwakken.

**Blok B, de homepage. Een halve dag.**

6. Hero-subheadline vervangen: diagnose eruit, vergelijking plus oordeel erin, ontlasting behouden (voorstel in 1.2).
7. Eyebrow "Financiële coaching · Nederland" vervangen door iets dat het product beschrijft in plaats van de categorie waar de doelgroep zich niet in herkent.
8. Link naar /voorbeeldrapport op de homepage, zichtbaar boven of direct onder de vouw, met een fragment in beeld in plaats van alleen een tekstlink. Dit is het enige punt waarvan ik verwacht dat het los meetbaar effect heeft.
9. Stap 3 in "Hoe het werkt": het adviesgesprek van 125 euro eruit als gelijkwaardige optie, en de knop in dat blok naar het rapport in plaats van naar de gratis analyse.
10. Het 460-blok in de statsrij (punt 4) vervangen. De twee stats ernaast met bron kunnen blijven.

**Blok C, bewijs beter laten landen. Een halve dag.**

11. Het illustratieblok op /geldscan (`:244-272`) vervangen door een echt fragment uit een voorbeeldrapport, inclusief de constatering dat de vaste lasten niet het probleem zijn. Weg met de optelsom naar 260 euro.
12. Fictie-labels op /voorbeeldrapport terugbrengen van vier naar twee per rapport: intro en titel houden, de disclaimer na het rapport weg.
13. Een methodeblok, kort, op /voorbeeldrapport of /over: welke variabelen je gebruikt, waarmee je vergelijkt, waar die vergelijkingscijfers vandaan komen, en wat je niet weet. Alleen doen als punt 5 is afgerond.

**Blok D, later.**

14. "Structuurprobleem" uit de twee artikelen en de vier FAQ-antwoorden in `lib/inzichten-data.ts`. Bij de volgende contentronde, na 25-okt.

Blok A en B lopen samen met de conversiefixes uit `docs/contentaudit-top10-jul-2026.md` die al op de lijst stonden. Blok C raakt aan prioriteit 3 uit CLAUDE.md (voorbeeldrapport publiceren). Niets in deze lijst vraagt om nieuwe artikelen of nieuwe pagina's, dus het botst niet met de afspraak van nul nieuwe content tot 25-okt.

## 5. Wat er niet verandert

De inzet blijft twaalf geleverde geldscans en vijf klantverhalen voor 25-okt. Deze feedback verschuift die inzet niet, hij onderbouwt hem: het enige punt waar de tester echt vastloopt is dat hij niet kan zien dat je dit vaker hebt gedaan. Dat lossen klanten op, niet zinnen.
