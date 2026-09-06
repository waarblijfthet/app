# SERP-verificatie nieuwe invalshoeken, 6 september 2026

Chrome op google.nl, `hl=nl` en `gl=nl` voor de Nederlandse termen. Voor N5
is `hl=en` en `gl=nl` gebruikt: de zoeker is Engelstalig maar zit in
Nederland, en met `hl=nl` krijg je een andere pagina 1 dan hij ziet. Dat is
een bewuste afwijking van de regel in CLAUDE.md sectie 8A punt 1 en staat
hier zodat een volgende sessie hem kan herhalen.

Alle 24 zoektermen uit de tabel in
`docs/plan-nieuwe-invalshoeken-06-sep-2026.md` zijn nagelopen, plus de
GSC-controle per onderwerp (laatste 90 dagen, filter "zoekopdracht bevat").

**Op geen van de 24 SERP's stond een AI-overzicht.** Google toont voor deze
termen alleen "Meer om te vragen" en "Mensen zoeken ook naar". Op geen enkele
SERP staat een eigen URL op pagina 1.

**Uitkomst in het kort: vijf pagina's blijven staan (N1, N2, N3, N4, N5),
N6 is geschrapt. Zes losse zoektermen zijn geschrapt terwijl hun pagina
blijft.**

## GSC-nulmeting per onderwerp, 5 juni tot 5 september 2026

Domeinproperty `sc-domain:waarblijfthet.nl`, laatste 90 dagen: 718 klikken,
39,4K vertoningen, CTR 1,8 procent, gemiddelde positie 11,7.

| Filter (bevat) | Vertoningen | Klikken | Positie | Wat het betekent |
|---|---:|---:|---:|---|
| hypotheek | 7 | 0 | 4,6 | Geen eigen URL op de rentevaste-intentie. N1 is nieuw terrein, geen kannibalisatie. |
| partner | 12 | 0 | 32,1 | Eén zoekterm, "inkomen verdelen tussen partner". N2 en N3 kannibaliseren niets. |
| coach | 1.190 | 0 | 52,6 | budgetcoach 289, budget coach 127, financieel coach 93, wat doet een budgetcoach 90, budgetcoaching 74, budgetcoach kosten 73. Zie de waarschuwing bij N4. |
| salary | 1 | 0 | 35,0 | Eén vertoning, "is 4000 euro a good salary in netherlands". De Engelse vraag bestaat, de site vangt hem niet. |

De filter "app" is onbruikbaar op deze site: hij matcht op boodschAPPen en
levert 1,77K vertoningen die niets met bankapps te maken hebben.

## N1. Rentevaste periode loopt af

### "rentevaste periode loopt af wat nu"

Organiek, in volgorde: Vereniging Eigen Huis, Van Bruggen, ING, De
Hypotheekshop, Nationale-Nederlanden, Independer (2023), ABN AMRO, Obvion,
Rabobank. Eén gesponsord resultaat (hypotheek-rentetarieven.nl). Plus een
productcarrousel "Vind gerelateerde producten en services" met zes
adviesdiensten, wat betekent dat Google deze term als commercieel leest.

Meer om te vragen: wat gebeurt er als mijn hypotheekrentevaste periode is
afgelopen, kun je een aflossingsvrije hypotheek levenslang behouden, wat gaan
de hypotheekrentes doen in 2027, wat gebeurt er als de rentevaste periode van
mijn aflossingsvrije hypotheek afloopt.

Mensen zoeken ook naar: acht varianten, zeven met een merknaam of met
"aflossingsvrij" erin.

Wat opvalt: negen resultaten die alle negen over de rentekeuze gaan. Geen
enkel resultaat rekent uit wat het verschil met het huishouden doet. De
hypothese uit het plan klopt precies.

### "hypotheekrente verlengen hogere maandlasten"

Organiek: Fortus, De Hypotheekshop, Rabobank, Van Bruggen, BerekenHet,
Consumentenbond (12 mrt 2026), ASN Bank, HomeFinance, Independer. Weer alleen
geldverstrekkers, adviseurs en rekentools. BerekenHet is de enige die rekent,
en die rekent alleen de maandlast, niet het huishouden.

Meer om te vragen: hoe ver van te voren hypotheek verlengen, wat is
voordeliger lagere maandlasten of kortere looptijd, kan ik mijn hypotheekrente
verlengen, wat zijn de strengere hypotheekregels in 2026.

### "hypotheek 2016 verlengen 2026", GESCHRAPT als zoekterm

Google negeert "2016": bij zes van de negen resultaten staat letterlijk
"Bevat niet: 2016". De hele pagina 1 gaat over de hypotheekregels van 2026
(NHG-grens 470.000, leennormen, overdrachtsbelasting). Dit is geen zoekterm
maar een cohortomschrijving, en die typt niemand in. De pagina blijft, de term
gaat eruit.

**Oordeel: N1 bouwen.** Primaire term "rentevaste periode loopt af wat nu",
secundair "hypotheekrente verlengen hogere maandlasten".

### Bronnen die ik voor N1 zelf in Chrome heb geopend

- Van Bruggen, "Nieuwe rente? Vaak bijna dubbel zo hoog", 26 maart 2026,
  https://www.vanbruggen.nl/actueel/nieuws/2026/nieuwe-rente-vaak-bijna-dubbel-zo-hoog
  (opgehaald 6 sep 2026). Letterlijk op de pagina: wie in 2016 tien jaar
  rentevast met NHG koos betaalt waarschijnlijk net onder de twee procent, en
  krijgt bij afloop in 2026 een voorstel van rond de vier procent.
- Van Bruggen, 30 juli 2026: de gemiddelde 10 jaar vaste hypotheekrente steeg
  die week naar 4,09 procent, het hoogste niveau van 2026.
- De Nederlandsche Bank, dashboard Woninghypotheken,
  https://www.dnb.nl/statistieken/dashboards/woninghypotheken/ (opgehaald
  6 sep 2026): ongeveer de helft van de Nederlandse huishoudens heeft een
  woninghypotheek, samen ruim 800 miljard euro, bijna 77 procent van het bbp.

Het cijfer uit het plan ("bijna 100 euro bruto per maand erbij, NHG via
Ikbenfrits, april 2026") heb ik niet teruggevonden op google.nl. Ikbenfrits
heeft wel een pagina over aflopende rentevaste periodes, maar die is van
4 juni 2025 en noemt dat bedrag niet. **Dat cijfer gaat dus niet in de
pagina.** In plaats daarvan rekent N1 het verschil zelf uit met de
annuiteitenformule in `lib/rente-verschil.ts`, met de formule zichtbaar, en
gebruikt het van Bruggen-cijfer alleen als bron voor het rentespoor van twee
naar vier procent.

## N2. Mijn partner geeft te veel uit

### "partner geeft te veel uit"

Organiek: Intermediair (14 jan 2020), Reddit r/geldzaken (148 antwoorden),
Zwangerschapspagina, Doortjes blog, J/M Ouders (29 sep 2025), Viva Forum,
Reddit r/Marriage, Nationale-Nederlanden, Porterenee (3 okt 2025).

Meer om te vragen: wat zijn de tekenen dat je te veel geeft in een relatie,
wat zijn de oorzaken van overmatig geld uitgeven, wat zijn signalen dat het
niet goed gaat in je relatie, wat zijn no go's in een relatie.

Mensen zoeken ook naar: man wil geld niet delen, financiële ongelijkheid
relatie.

Wat opvalt: zeven van de negen zijn forum, blog of persoonlijk verhaal. De
enige twee met redactie erachter zijn Intermediair (zes jaar oud) en NN. Geen
enkel resultaat zet er een bedrag naast. Precies het gat dat het plan
beschrijft.

### "mijn man geeft al ons geld uit"

Bijna dezelfde negen bronnen plus MannenBrein en Facebook. Zelfde beeld.
Opvallend is dat "Meer om te vragen" hier begint met "hoe hebben narcisten een
relatie met geld", wat laat zien dat Google deze term richting relatie- en
psychologiecontent duwt, niet richting geldcontent. Dat is de reden dat de
CTA op deze pagina de analyse is en niet de Geldscan.

### "ruzie over uitgaven partner"

Organiek: Nationale-Nederlanden, Doortjes blog, Guidato, Reddit r/Marriage,
Quest (13 aug 2026), 365 Dagen Succesvol, Nibud rapport Geld en relatie
(2019), time2organize, NU.nl (2019). Iets serieuzer dan de vorige twee, met
Nibud en NU erbij, maar nog steeds nul bedragen.

Mensen zoeken ook naar: onder andere "vaste lasten delen met partner",
"samenwonen kosten verdelen eigen huis" en "kosten verdelen berekenen". Dat
zijn drie interne linkkansen naar het bestaande kosten-verdelen-artikel.

### "vrouw koopt te veel", GESCHRAPT als zoekterm

De hele SERP is koopverslaving: Afkickkliniekwijzer op één, daarna MAX
Meldpunt, EOS Wetenschap, psychologie.nl (dwangmatig winkelen), Trubendorffer
(verslavingskliniek). "Mensen zoeken ook naar" is symptomen koopverslaving,
psycholoog koopverslaving, oniomanie, oniomanie test.

Dit is gezondheidsterrein. CLAUDE.md copyregel 5 verbiedt een diagnose vooraf
en dit is een site over huishoudbudgetten, geen verslavingszorg. Op deze term
richten zou betekenen dat je zoekers binnenhaalt met een vraag die je niet
mag en niet kunt beantwoorden. Term eruit, pagina blijft.

**Oordeel: N2 bouwen.** Primaire term "partner geeft te veel uit",
secundair "mijn man geeft al ons geld uit" en "ruzie over uitgaven partner".

## N3. Financiële ontrouw

### "financiële ontrouw"

Organiek: Reddit r/AskWomenOver30 (114 antwoorden), Marie Claire (10 dec
2022), psychologie.nl (12 mrt 2020), AD (16 mrt 2021), dutchmoneywhisperer
(29 jan 2023), YouTube Money Mind Academy, ANP Persportaal (2 apr 2026),
sahabatjiwa.com, Reddit r/Divorce.

Meer om te vragen: hoe hebben narcisten een relatie met geld, wat zijn 8
signalen van vreemdgaan, hoe kom je uit financiële problemen, wat zijn de
fasen na vreemdgaan.

Wat opvalt: de term bestaat en heeft een pagina 1, maar acht van de negen
resultaten geven een definitie of een verhaal en geen cijfer. Het enige
resultaat met een cijfer is het ANP-persbericht, en dat is een persbericht,
geen pagina die de vraag beantwoordt. De hypothese klopt.

### "geheime lening partner"

Organiek: ANP Persportaal op plek 1 (2 apr 2026), Reddit r/marriageadvice,
Porterenee (1 jan 2026), Wonen360 (3 apr 2026), Notariskantoor Mirjam Bos,
Becam Financieringen, Belastingdienst (over lenen van de eigen bv, niet
relevant), Schakenraad Advocaten, ABN AMRO.

Dat het ANP-persbericht op plek 1 staat is het sterkste signaal van alle 24
SERP's: Google heeft niets beters om te tonen dan het persbericht zelf. Een
pagina die hetzelfde cijfer neemt en er een antwoord omheen bouwt, met bron,
n en datum, heeft hier ruimte.

### "partner liegt over geld"

Organiek: Dokter.nl (2017), 24baby Forum, MannenBrein, Reddit
r/relationship_advice, NN, Slim Beleggen (18 nov 2016), Marie Claire,
psychologie.nl, VICE (25 apr 2022). Forum en media, geen cijfers behalve een
losse claim bij Slim Beleggen uit 2016 zonder bron.

### "partner verzwijgt schulden", GESCHRAPT als zoekterm

De SERP is juridisch: Judex op één (gevolgen bij scheiding), Het Juridisch
Loket (aansprakelijkheid schulden bij samenwonen), Reddit, ANP, Dokter.nl,
MannenBrein, ScheidingsWijze, Metronieuws, lenen.blog. "Mensen zoeken ook
naar" is gemeenschap van goederen schulden, voorhuwelijkse schulden,
studieschuld partner.

De zoeker die dit typt wil weten of hij aansprakelijk is. Dat is een
juridische vraag en die beantwoordt deze site niet, dus op deze term richten
zou een belofte zijn die de pagina niet waarmaakt. De vraag komt wel terug als
FAQ op N3 ("wat als de schuld op mijn naam staat"), met een doorverwijzing
naar het Juridisch Loket en, bij problematische schulden, naar schuldhulp.
Term eruit, pagina blijft.

**Oordeel: N3 bouwen.** Primaire term "financiële ontrouw", secundair
"geheime lening partner" en "partner liegt over geld".

### Bronnen die ik voor N3 zelf in Chrome heb geopend, met correcties op het plan

Het ANP-persportaal is niet te openen in deze browser. De twee publicaties die
hetzelfde onderzoek woordelijk citeren zijn dat wel, en die heb ik gelezen.

- Wonen360, "Verborgen leningen zetten relaties onder druk", 3 april 2026,
  https://www.wonen360.nl/article/9826206/verborgen-leningen-zetten-relaties-onder-druk/
  (opgehaald 6 sep 2026). Op de pagina: onderzoek van Lening.nl onder
  **400 Nederlandse volwassenen**; 11,75 procent van de respondenten met een
  partner geeft toe ooit een lening te hebben verzwegen; de publicatie zegt er
  zelf bij dat het werkelijke aandeel vermoedelijk hoger ligt omdat het
  zelfgerapporteerde gegevens zijn.
- Banken.nl, "Schaamte houdt Nederlanders weg van hulp bij schulden",
  12 augustus 2026,
  https://www.banken.nl/nieuws/27303/schaamte-houdt-nederlanders-weg-van-hulp-bij-schulden
  (opgehaald 6 sep 2026). Een **tweede, groter onderzoek van Lening.nl onder
  1.127 Nederlanders**: 42,4 procent van wie ooit een lening verborgen hield
  noemt schaamte als belangrijkste reden; 21 procent sloot ooit een nieuwe
  lening af om een bestaande schuld voor partner of familie verborgen te
  houden; bijna 12 procent maakte een ernstig relatieconflict mee door een
  verzwegen schuld en ruim 9 procent een relatiebreuk; 45,3 procent schaamt
  zich voor eigen schulden terwijl 53,2 procent vindt dat schulden onder
  omstandigheden normaal zijn.

Twee correcties op `docs/plan-nieuwe-invalshoeken-06-sep-2026.md`, die in de
pagina zelf goed moeten staan:

1. Het plan schrijft "38 procent uit schaamte". Het geverifieerde cijfer is
   **42,4 procent**, en het hoort bij het onderzoek van augustus met n=1.127,
   niet bij dat van april met n=400.
2. Het plan noemt maart 2026 als datum. De publicatiedatum is **2 april 2026**
   (ANP), overgenomen op 3 april 2026 (Wonen360).

Lening.nl is een commercieel vergelijkingsplatform, geen instituut. Beide
cijfers gaan alleen de pagina in met de opdrachtgever, de n, de datum en de
zin dat het zelfgerapporteerd is erbij. Dat is precies wat waarheidsregel 3
vraagt.

## N4. Kan iemand naar mijn financiën kijken zonder dat ik schulden heb

### "iemand die naar mijn financiën kijkt"

Organiek: Nibud (financieel adviseur), Van Bruggen, Wijzer in geldzaken,
Geldfit, SchuldHulpMaatje, Trustoo, Altijd Voor Elkaar, Ernst-Jan Pfauth,
Financieel-Gezond.

Meer om te vragen: hoe noem je iemand die helpt met schulden, wat is
financiële stress, hoe noem je iemand die je geldzaken regelt, is een
budgetcoach gratis.

Wat opvalt: dit is de hypothese van het plan, letterlijk zichtbaar op één
pagina. Vijf van de negen resultaten gaan over schulden of hulp bij
geldzorgen, drie over hypotheek- en vermogensadvies. Er staat niets tussen.
"Hoe noem je iemand die je geldzaken regelt" staat in het PAA-blok, wat
betekent dat Google zelf ziet dat mensen geen woord voor deze dienst hebben.

### "financieel overzicht laten maken"

Organiek: Geldfit (5 apps), Van Bruggen, Nibud (maandbegroting in Excel),
Duisenburgh, Vereniging Onafhankelijk Financieel Planners, MijnGeldzaken,
Dijksterhuis Accountants, aaff, finner.nl.

Twee kampen: doe het zelf met een app of een Excel, of huur een financieel
planner of accountant in. De middenweg, iemand die er één keer naar kijkt voor
een vast klein bedrag, staat er niet.

### "budgetcoach zonder schulden"

Organiek: IMW regio Tilburg, Budget-Kompas, My Life Budget, Budgetcoach Me,
FNV, Verder Groep, SchuldHulpMaatje, Budget Hulp Nederland, Careyn. Alles
gemeente, welzijnswerk of budgetbeheer. "Mensen zoeken ook naar" is bijna
volledig plaatsnamen.

Let op: de SERP is gepersonaliseerd op locatie, IMW regio Tilburg staat op
plek 1 omdat de browser in Tilburg staat. Dat maakt de conclusie niet anders,
maar een volgende meting kan er anders uitzien.

### "second opinion huishoudbudget", GESCHRAPT als zoekterm

Google laat "huishoudbudget" bij vijf van de negen resultaten vallen ("Bevat
niet: huishoudbudget") en vult de pagina met financiële second opinions over
hypotheken, scheidingen en meerjarenbegrotingen, plus Menzis over een
medische second opinion. De term heeft geen corpus. Hij is bedacht, niet
getypt.

### "financiële check laten doen", GESCHRAPT als zoekterm

Alle negen resultaten gaan over de financiële check bij nieuwbouw: ABN AMRO,
Hypotheek Visie, De Caai, Rabobank, De Hypotheekshop, Domicilie, Zeezijde,
Whoon, Gouwhaven. "Financiële check" is in Nederland een vaste term voor het
document van een hypotheekverstrekker dat je bij inschrijving op een
nieuwbouwwoning aanlevert. Volledig bezet, en met een betekenis die niets met
deze dienst te maken heeft.

**Dit beantwoordt meteen D1 uit het plan van 5 september** ("Financiële APK of
geldcheck laten doen: laten controleren of de SERP bezet is door
hypotheekadviseurs"). Het antwoord is ja, volledig bezet. D1 mag daarom nooit
op deze naam gebouwd worden. Dat hoort in het bouwvolgorde-document.

**Oordeel: N4 bouwen, met één waarschuwing.** Primaire term "iemand die naar
mijn financiën kijkt", secundair "financieel overzicht laten maken" en
"budgetcoach zonder schulden".

De waarschuwing is de GSC-regel hierboven: op "coach"-termen heeft de site al
1.190 vertoningen in 90 dagen, op positie 52,6 en met nul klikken. Die
vertoningen gaan naar `wat-kost-een-financieel-coach` en
`verschil-budgetcoach-financieel-coach`. Volgens CLAUDE.md sectie 8A punt 2
moet je dan upgraden in plaats van bouwen. Ik bouw hier tóch, en dat kan
alleen als de scheiding in één zin uit te leggen is, de toets uit
`docs/bouwvolgorde.md` sectie 10:

> wat-kost-een-financieel-coach beantwoordt wat het kost, N4 beantwoordt of
> het iets voor jou is als je geen schulden hebt.

Die zin komt letterlijk op beide pagina's te staan, met een link over en
weer. Houdt N4 na 90 dagen minder dan 20 vertoningen, dan gaat hij samen met
die twee pagina's mee in de contentkill van CLAUDE.md sectie 9.

## N5. Is 5.000 net a good salary in the Netherlands

### "is 5000 net a good salary netherlands"

Organiek: Reddit r/Netherlands, een blok "Discussions and forums" met vier
Reddit- en Quora-draden, Dutch on Track (7 jul 2026), Htel Serviced
Apartments, Mobiletator, Relocate.me, jobinthenetherlands, Quora,
HousingAnywhere (7 apr 2026).

People also ask: what is a good net salary in the Netherlands, is 3000 a good
net salary, what is upper class income, what is the top 5 percent income.

Wat opvalt: vijf van de negen zijn forum of Q en A. De vier redactionele
resultaten geven allemaal een bruto-nettovertaling en stoppen daar. Geen
enkele geeft een huishoudtabel, en drie van de vier verwarren bruto en netto
in hun eigen antwoord ("a good salary starts from 60.000, this is 5.000 per
month"). De hypothese klopt.

### "4000 net salary amsterdam enough"

Organiek: Reddit r/Netherlands, met op plek 1 een draad van drie maanden oud
met de titel "I make 4k net a month in Amsterdam, but I still feel...". Daarna
Quora, Facebook, salarycompare.nl, Relocate.me, Numbeo, salarycompare
nogmaals, Instagram, YouTube.

Die eerste Reddit-titel is woordelijk de these van de pijler van deze site,
in het Engels, en hij staat op plek 1 omdat er geen pagina is die hem
beantwoordt.

### "cost of living couple netherlands 2026"

Organiek: expatinholland, Expatica, Inburgering.org (30 jul 2026), Numbeo,
Robin.jobs, NLCompass (25 aug 2026), dutchtaxguide (26 jun 2026),
hellohousing, expatnetherlandshub.

Dit is de drukste van de drie: negen expatsites die allemaal een bandbreedte
geven. Geen van negen laat zien waar het geld heen gaat per post per
huishoudtype, en de bedragen spreken elkaar tegen (couple 2.300 tot 3.100 bij
Robin.jobs, 3.000 tot 4.000 bij expatinholland). Ruimte is er, maar deze term
is de zwakste van de drie en niet de primaire.

### "why can't I save money in the netherlands", GESCHRAPT als zoekterm

De SERP is bespaartips: Becksplore ("19 Budget Tips to Save Money"), All About
Expats ("8 ways to save money"), Expatica, Leiden International Centre ("9
Tips for Saving"), plus Reddit-draden over zuinig leven. CLAUDE.md sectie 4
sluit bespaartips expliciet uit en sectie 8 zet ze bij "wat niet gebouwd
wordt". Op deze term richten betekent dat je verkeer trekt met een belofte die
je niet doet. Term eruit, pagina blijft.

**Oordeel: N5 bouwen, als laatste en als test.** Primaire term "is 5000 net a
good salary netherlands", secundair "4000 net salary amsterdam enough".

De GSC-regel hierboven is de nuchtere kant: één vertoning in 90 dagen op
"salary". De Engelse vraag bestaat aantoonbaar op de SERP, maar deze site
vangt er vandaag niets van. Het meetpunt uit het plan blijft staan: meer dan
100 vertoningen per week binnen 60 dagen, dus vóór 5 november 2026, anders
blijft het bij deze ene Engelse pagina.

## N6. Wat je bankapp je niet vertelt, GESCHRAPT

Alle vier de zoektermen zijn nagelopen. Alle vier weerleggen de hypothese op
dezelfde manier.

### "uitgaven inzicht ING app"

Acht van de negen organieke resultaten zijn ing.nl: Inzicht, budget instellen,
Inzicht zakelijk, Grip op je geld, Terugkerende Uitgaven, ING Newsroom
(27 aug 2026, Totaalsaldo), Maandelijks Budget, Hoe werkt budgetteren. Het
negende is Reddit r/DutchFIRE. "Mensen zoeken ook naar" is acht keer een
ING-navigatie (Inzicht ING App aanzetten, Mijn ING inloggen, ING Inzicht
categorieën).

### "bankapp uitgaven overzicht klopt niet"

Rabobank, ABN AMRO, ING, ASN, Rabobank nogmaals, plus Reddit, SeniorWeb
(21 jul 2026), Nibud en MAX Meldpunt (3 aug 2024). "Mensen zoeken ook naar" is
volledig navigatie: transactie verbergen Rabobank app, ABN AMRO inzicht
uitzetten, inzicht rabobank werkt niet.

### "Rabobank Grip uitgaven categorieën"

Zes van de negen resultaten zijn rabobank.nl. Bij het achtste staat "Bevat
niet: Grip".

Belangrijker: **Grip bestaat niet bij de Rabobank.** Grip is de app van ABN
AMRO. De Rabobank noemt het Inzicht en Rabo Budgets. Deze zoekterm uit het
plan combineert twee banken en beschrijft dus een product dat er niet is.

### "uitgaven per categorie bank"

Rabobank, ING, ABN AMRO, ASN, SNS, Nibud, Nationale-Nederlanden, Knab,
MijnGeldzaken. Acht van de negen zijn een bank of een instituut.

### Waarom dit een schrapping is en geen tegenvaller

De vier SERP's laten hetzelfde zien: Google leest deze termen als
navigatie- en supportvragen. De zoeker wil weten hoe hij iets in zijn eigen
bankapp aanzet, en het enige juiste antwoord daarop is de helppagina van zijn
eigen bank. Een onafhankelijke pagina kan dat antwoord niet beter geven en
gaat daar niet boven staan.

De hoek uit het plan ("de app telt, de vergelijking ontbreekt") is wel goed,
maar het is een argument en geen zoekmoment. Het hoort daarom thuis als sectie
in een pagina die al op een echte vraag rankt, niet als eigen URL. Concreet:
als sectie "waarom je bankapp niet zegt of het erg is" in het
boodschappenartikel (10.932 vertoningen) of in H1. Dat kost een half uur in
plaats van een bouwdag, en het valt onder onderhoud, niet onder de
tempo-regel.

Dat zet ik als voorstel in `docs/bouwvolgorde.md` onder geparkeerd. De
beslissing is aan Jarno.

## Wat dit betekent voor de rest van het plan

1. **D1 uit het plan van 5 september is dood op zijn naam.** "Financiële
   check" is bezet door de nieuwbouwhypotheek. N4 vervangt D1 en doet het op
   natuurlijke taal in plaats van op een verzonnen dienstterm.
2. **Zes zoektermen zijn geschrapt zonder dat hun pagina sneuvelt.** Dat is
   het patroon van deze verificatieronde: de invalshoeken kloppen, de bedachte
   zoektermen kloppen half. Elke term die in het plan met een dienstnaam of
   een cohortnaam is opgeschreven ("financiële check", "second opinion
   huishoudbudget", "hypotheek 2016 verlengen 2026") bleek niet te bestaan.
   Elke term die is opgeschreven zoals iemand hem in wanhoop typt ("mijn man
   geeft al ons geld uit", "iemand die naar mijn financiën kijkt") bleek open
   te liggen.
3. **Nul AI-overzichten op 24 SERP's.** Dat is consistent met de hubs-meting
   van dezelfde dag. Google zet op deze onderwerpen nog geen AI-overzicht in,
   dus punt 21 uit CLAUDE.md sectie 8E blijft handwerk in ChatGPT en
   Perplexity.
