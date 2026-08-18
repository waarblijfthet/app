# Bouwprompts batch 1, 18 aug 2026

Vier artikelen die alle vier rekenen met code die er al staat. Nul nieuwe
externe bronnen, dus nul bronrisico. Dit is tegelijk de pilot voor de nieuwe
werkwijze na de zes feitfouten van 17 augustus.

Elke klus is één losse sessie. Geef die sessie dit hele document plus de
klussectie, niet meer.

---

## 0. Waarom het proces verandert

Op 17 augustus zijn tien klussen uitgevoerd. In alle acht klussen waar een
toetsronde beschreven staat, staat er "zelfreview", meestal met de toevoeging
dat er geen losse subagents beschikbaar waren. Nul klussen zijn getoetst door
iets dat de redenering van de schrijver niet kon zien. Punt 4 van de oude
afvinklijst eiste drie onafhankelijke toetsagents en is tien keer overgeslagen.

Dat is niet een detail. De "38 huishoudboekjes" in `huishoudboekje-voorbeeld.tsx`
is er precies zo gekomen: dezelfde partij bedacht de claim, bedacht de
verificatie, en schreef op dat de verificatie geslaagd was. De echte pagina bij
Wijzer in geldzaken zegt 30. Vijf van de zes fouten waren bovendien van één
soort: een getal dat in proza stond in plaats van in code.

Vandaar twee harde regels, en een derde die het afdwingt.

---

## 1. De drie harde regels

**Regel 1. Een schrijvende sessie produceert geen enkel getal.**

Elk bedrag, percentage, aantal en jaartal in de proza komt uit een import.
Geen uitzondering voor illustratieve getallen, geen uitzondering voor
tussenzinnen, geen uitzondering voor "ongeveer". Toegestane bronnen:

- `lib/salaris-vuistregel.ts`: `VUISTREGEL`, `VERVOER`, `AUTO_LABELS`,
  `berekenVuistregel()`, `omslagpunt()`, `euro()`, `euroSigned()`,
  `geldscanSituatie()`
- `lib/rapporten-data.ts`: `RAPPORTEN`, `rapportVoorSlug()`,
  `AANTAL_ZONDER_LEK`, `AANTAL_ZONDER_VERVOLG`
- `lib/benchmarks.ts` voor de n per post

Wil je een getal noemen dat daar niet uit komt, dan bouw je het niet. Je meldt
het als openstaand punt in het logboek en gaat verder. Dat is geen falen, dat is
de bedoeling.

**Regel 2. De toets draait in een losse sessie die de schrijver niet kan zien.**

Niet als subagent in dezelfde uitvoering, want dat is tien keer niet beschikbaar
gebleken en tien keer stil vervangen door zelfreview. Jarno start een nieuwe
sessie en plakt de toetsprompt uit sectie 2 erin, met alleen de diff en de
bronnen. De schrijvende sessie levert dus op met de status "klaar voor toets",
niet met de status "af".

**Regel 3. De kernbelofte-toets staat vóór het schrijven, niet erna.**

Elk artikel moet kunnen eindigen in dezelfde beweging als de rest van de site:
hier is het doorgerekende bedrag voor jouw huishouden, hier is het gat, en een
mens leest je echte cijfers na. Kan een artikel dat niet, dan is het een
uitlegartikel en hoort het hier niet. Schrijf die ene slotbeweging als eerste
op, in één zin, en bouw het artikel daar naartoe.

### Wat de vorige ronde er nog bij oplegt

Deze vier dingen zijn op 17 augustus fout gegaan en gelden nu als verbod.

- Nooit een aantal noemen dat je zelf hebt geteld door te lezen. Klus 10 meldde
  "alle 72 artikelen" waar het er 83 zijn. Tel met `grep -c` of met
  `RAPPORTEN.length`, nooit met je ogen.
- Nooit twee claims onder één bronlabel. De €21.500 en €54.700 zijn echte
  CBS-cijfers, de "een op de vijf onder €1.000" in dezelfde zin is dat niet.
- Nooit een bestaand getal vervangen zonder de letterlijke bronzin in het
  logboek te plakken. Dat is de "38"-fout.
- Een geconstateerde schuld die je niet oplost, blokkeert de volgende klus. Klus
  7 meldde de €200 aan abonnementen als sitebreede schuld en die staat er nog,
  op de pillar.

---

## 2. De vaste toetsprompt

Jarno start hiermee een nieuwe sessie. Alleen deze prompt, de diff en de
genoemde bestanden erbij. Geen logboek van de schrijver.

> Je toetst een artikel voor waarblijfthet.nl dat je zelf niet hebt geschreven.
> Ga uit van fout tot je het tegendeel hebt vastgesteld. Je krijgt de diff en de
> betrokken bestanden.
>
> 1. **Getallentoets.** Zoek elk getal, percentage en aantal in de nieuwe proza.
>    Wijs per stuk de import aan waar het uit komt. Kun je die niet aanwijzen,
>    dan is het een fout, ook als het getal plausibel is. Reken minstens twee
>    doorgerekende bedragen zelf na met een losse node-berekening op de
>    constanten uit `lib/salaris-vuistregel.ts`.
> 2. **Tegenspraaktoets.** Zoek in `app/inzichten/[slug]/content/` en
>    `lib/inzichten-data.ts` naar elk ander artikel dat over hetzelfde
>    huishouden of dezelfde post iets zegt. Noemt het daar een ander bedrag?
>    Bekende bestaande gevallen: de pillar zegt "€700 tot €900" boodschappen voor
>    een gezin met twee kinderen terwijl `berekenVuistregel()` daar €1.000 geeft,
>    en de pillar zegt ">€200 abonnementen" terwijl `VUISTREGEL.abonnementen`
>    150 is.
> 3. **Broncitaattoets.** Voor elke externe bron: staat het geciteerde getal
>    letterlijk op de pagina? Plak de zin. Geen zin, geen bron.
> 4. **ICP-toets.** Lees het als iemand met een goed inkomen die te weinig
>    overhoudt. Voelt dit als iets voor jou, of als algemene uitleg? Als het als
>    uitleg voelt, zeg dat, en zeg waar het kantelt.
> 5. **Kannibalisatietoets.** Welke bestaande pagina van de 83 pakt deze
>    zoekvraag al? Zou dit artikel die pagina van zijn positie duwen?
> 6. **Slotbewegingtoets.** Eindigt het artikel in "dit is jouw bedrag, dit is
>    het gat, een mens leest je cijfers na"? Of eindigt het in een tip?
>
> Lever een lijst bevindingen, ernstigste eerst, met bestand en regelnummer.
> Vind je niets, zeg dat expliciet en zeg wat je hebt gecontroleerd. Los niets
> op, je bent de toets, niet de schrijver.

---

## 3. Vaste bouwfeiten

Zodat geen sessie dit hoeft te raden.

**Artikel toevoegen** gaat in drie plekken: een object in `lib/inzichten-data.ts`
(interface `Artikel`, verplicht: `slug`, `titel`, `korteTitel`, `metaTitel`,
`metaDescription`, `datum`, `datumFormatted`, `leestijd`, `categorie`,
`excerpt`, `faq`, `preview`; optioneel `cta` en `externLinks`), een
content-component in `app/inzichten/[slug]/content/<slug>.tsx`, en een regel in
de map in `app/inzichten/[slug]/ArticleBody.tsx`.

**De vijf echte rapporten** in `lib/rapporten-data.ts`, aan te roepen met
`rapportVoorSlug()`: `tweeverdieners-drie-kinderen`,
`alleenstaande-ouder-twee-kinderen`, `alleenstaand-huurwoning`,
`stel-zonder-kinderen`, `zzp-wisselend-inkomen`.

**Situatiesleutels** voor `/geldscan?situatie=`: `gezin`, `stel`,
`alleenstaand`, `alleenstaande-ouder`, `zzp`. Moeten matchen met
`SituatieSleutel` in `app/geldscan/page.tsx`. Gebruik
`geldscanSituatie(volwassenen, kinderen, wisselend)` als je hem afleidt.

**Bestaande componenten** staan in `components/artikel/`. Hergebruik met eigen
`kop` en `intro` in plaats van een nieuw component bouwen. `SalarisRekenaar` en
`SalarisBedragenTabel` zijn de twee die met de vuistregel rekenen.

**Elk artikel krijgt een `cta`-veld** met een situatieparameter in
`primairHref`. Van de 83 artikelen hebben er 13 een `cta` en 6 een parameter.
Nieuwe artikelen verhogen dat, niet het omgekeerde.

**Afronden:** `npx tsc --noEmit --incremental false` moet exit 0 geven, en er
mogen geen null bytes in de gewijzigde bestanden staan. Nieuwe URL betekent dat
Jarno hem met de hand in Search Console moet indienen. Zeg dat erbij.

---

## 4. Klus A. Scheiden met een goed inkomen en toch niks over

Score 31 van 35. Bouw deze als eerste, want de rekenlaag is het sterkst en de
uitkomst is het meest verrassend.

**Zoekintentie en bewijs.** SERP op google.nl voor "na scheiding financieel niet
rondkomen alleen" bestaat volledig uit juridische en scheidingsbranchepartijen:
Uitelkaar.nl, Nibud, Verder Online, Wijzer in geldzaken, Scheidingsplanner, Het
Juridisch Loket, plus één coach. Niemand rekent één huishouden om naar twee.
Gerelateerde zoekopdrachten gaan naar inboedellijsten en alimentatie, dus het
budgetgat is een leeg veld.

**Slotbeweging, schrijf deze eerst op.** Twee huishoudens kosten meer dan één,
en het verschil zit niet in de leuke dingen maar in de vaste lasten die twee
keer opnieuw beginnen. Dit is wat de vuistregel voor jouw situatie zegt, en dit
is wat er gebeurt als een mens je echte cijfers naleest.

**De rekenlaag, dit is de kern van het artikel.** Roep `berekenVuistregel()`
drie keer aan: één keer voor het huishouden vóór de scheiding
(`volwassenen: 2`), en twee keer voor de huishoudens erna (`volwassenen: 1`,
één met de kinderen en één zonder). Laat de lezer het inkomen en de
inkomensverdeling zelf instellen.

Er zitten drie dingen in het model die het verhaal maken, en alle drie komen uit
de code, niet uit een mening:

1. `woonlastPctEen` is 0,33 tegen `woonlastPctTwee` 0,25. Alleen wonen kost een
   groter deel van je inkomen, twee keer.
2. `energie`, `internet`, `lokaleLasten`, `abonnementen` en `verzekeringOverig`
   zitten per huishouden in de formule, niet per persoon. Na een scheiding staan
   ze er dus twee keer. Dat is de post die niemand noemt.
3. `boodschappenBasisEen` is 475 en `boodschappenBasisTwee` is 700, dus twee
   losse huishoudens eten duurder dan één samen.

Het opvallende resultaat dat je moet uitwerken: het bedrag dat verdwijnt is
onafhankelijk van hoe je het inkomen verdeelt, want de verdeling verandert de
vaste lasten niet. Wat de verdeling wél verandert is wie het tekort voelt. Reken
dat door voor minstens twee verdelingen en laat zien dat bij een gelijke
verdeling de ouder bij wie de kinderen wonen negatief kan uitkomen terwijl de
ander overhoudt. Typ geen van die uitkomsten met de hand, laat ze berekenen.

**Bewijs uit de praktijk.** `rapportVoorSlug("alleenstaande-ouder-twee-kinderen")`
is exact dit huishouden na een scheiding, met een goed inkomen, een koopwoning,
en `kenmerken` die vermelden dat de kinderen 80 procent van de tijd bij haar
zijn. Citeer `uitkomstKop` en `vermoedenBedrag` via interpolatie, nooit
overgetypt. Dat was de fout die klus 7 bijna maakte.

**Verboden.** Geen woord over alimentatie, verdeling van bezittingen, pensioen
of juridische stappen. Dat is het terrein waar de hele SERP al staat en waar
Jarno niet bevoegd is. Geen enkele uitspraak over de scheiding zelf, alleen over
het budget erna. Geen fictief gezin, gebruik het echte rapport.

**Links.** Inkomend vanuit `geld-stress-relatie-nederland` en
`kosten-verdelen-samenwonen-ongelijk-inkomen`, dat zijn de twee met de
dichtstbijzijnde intentie. Uitgaand naar
`kosten-levensonderhoud-alleenstaande-ouder-2026` en naar `/rapporten`.

**CTA.** `primairHref: "/geldscan?situatie=alleenstaande-ouder"`.

**Openstaand punt om te melden, niet op te lossen.** De vuistregel kent geen
alimentatie en geen kinderopvangtoeslag. Zeg dat in het artikel expliciet, zodat
de lezer weet wat de berekening niet meeneemt.

---

## 5. Klus B. Twee auto's, wat kost de tweede echt

Score 29 van 35. Kleinste klus van de vier, doe deze als tweede om het proces
te testen op iets simpels.

**Zoekintentie en bewijs.** Geen directe SERP-verificatie gedaan, dit is een
inschatting op basis van het gat: er staat niets over. Meld dat als zodanig en
verifieer de SERP zelf voordat je bouwt. Blijkt de SERP vol te staan met
autobladen en leasemaatschappijen, dan bouw je niet en meld je dat.

**Slotbeweging.** De tweede auto is geen post van een paar tientjes maar een
vaste last in de orde van een flink deel van wat je dacht over te houden. Dit is
wat het bij jouw huishouden doet, en dit is wat er gebeurt als iemand je echte
cijfers naleest.

**De rekenlaag.** `VERVOER` heeft de vier stappen al: `geen`, `eigen`, `twee`,
`zakelijk`, met `AUTO_LABELS` erbij. Laat de lezer schuiven tussen die vier bij
zijn eigen inkomen en huishouden, en laat `verwachtOver` uit
`berekenVuistregel()` meelopen. Het verschil tussen `twee` en `eigen` en tussen
`eigen` en `geen` haal je uit `VERVOER`, je typt het niet.

**Bewijs uit de praktijk.** `rapportVoorSlug("tweeverdieners-drie-kinderen")`
heeft "2 auto's" in `kenmerken` en `uitkomstKop` "Geen enkele buitensporige
vaste last". Dat is de eerlijke nuance die dit artikel geloofwaardig maakt: twee
auto's zijn niet buitensporig, ze zijn wel groot. Gebruik dat, en gebruik
`stel-zonder-kinderen` dat "geen auto" in `kenmerken` heeft als tegenvoorbeeld.

**Verboden.** Geen advies om de auto weg te doen. Geen vergelijking van merken,
leasevormen of verzekeraars. Geen bijtellingspercentages, want die staan niet in
`lib/` en mogen dus niet in de proza. Wil je over de auto van de zaak schrijven,
dan is dat een volgende klus met een eigen databestand.

**Links.** Inkomend vanuit `auto-kopen-of-leasen-kosten-per-maand` en
`tweeverdieners-toch-krap`. Uitgaand naar `vaste-lasten-overzicht-maken`.

**CTA.** `primairHref: "/geldscan?situatie=gezin"`, want twee auto's is in de
praktijk een gezinssituatie.

---

## 6. Klus C. Samengesteld gezin, twee huishoudens in één budget

Score 28,5 van 35. Grootste concurrentiegat van de hele lijst van 107, en het
volume is onbewezen. Bouw hem kort en meet hem.

**Zoekintentie en bewijs.** Geen SERP-verificatie gedaan, ingeschat op basis van
een leeg veld. Verifieer zelf voor je bouwt en meld de uitkomst. Vind je een
partij die dit al goed doet, dan bouw je niet.

**Slotbeweging.** Kinderen die de helft van de tijd bij je zijn kosten geen
halve kinderen. Dit is wat dat met jouw budget doet.

**De rekenlaag.** Hier zit de inhoudelijke pointe, en je moet hem eerlijk
neerzetten: `berekenVuistregel()` kent geen deeltijdkinderen, alleen
`kinderen: number`. Precies daarom is dit een artikel. Zet naast elkaar wat de
formule zegt bij het aantal kinderen dat je hebt en bij het aantal dat er
gemiddeld is, en leg uit welke posten niet meebewegen met de kalender:
`kinderenPerKind` en `boodschappenPerKind` bewegen wel mee, maar de kamer, de
sportclub en de kleding zitten in posten die per huishouden gelden. Zeg expliciet
dat de vuistregel dit onderschat, want dat is waar en het is precies het punt.

**Bewijs uit de praktijk.** `rapportVoorSlug("alleenstaande-ouder-twee-kinderen")`
vermeldt in `kenmerken` "80 procent van de tijd bij haar". Dat is het enige echte
co-ouderschapsgegeven dat er is. Gebruik het en overdrijf het niet.

**Verboden.** Geen uitspraken over omgangsregelingen, kinderalimentatie of wie
wat hoort te betalen. Geen tweede fictief huishouden erbij verzinnen. Geen
aanname over de verdeling, laat de lezer die instellen.

**Links.** Inkomend vanuit `wat-kost-een-kind-per-maand` en
`potjesmethode-gezin-hoe-werkt-het`. Uitgaand naar klus A zodra die live staat,
en naar `/rapporten`.

**CTA.** `primairHref: "/geldscan?situatie=gezin"`.

---

## 7. Klus D. Schamen dat je niet rondkomt met een goed inkomen

Score 30 van 35. Het enige artikel van de vier zonder rekenlaag, dus het enige
waar de proza alles is. Doe deze als laatste, dan kun je naar de drie andere
linken.

**Zoekintentie en bewijs.** Volumesignaal is zwak en dat is bekend. De grond om
het te bouwen is dat niemand het bezet en dat de ICP-fit maximaal is. Voor "niet
rondkomen ondanks goed inkomen" rankt de site nu niet, en de kop van die markt
is een laaginkomenvraag. Dit artikel pakt de variant met de schaamte erin, wat
wél de eigen doelgroep is.

**Slotbeweging.** Het gevoel dat je iets fout doet is niet hetzelfde als iets
fout doen. Bij twee van de vijf huishoudens die ik heb doorgerekend bleek er
helemaal geen lek te zijn. Laat een mens je cijfers naleren voordat je jezelf
nog een maand de schuld geeft.

**De rekenlaag, wat er wél is.** Precies één ding, en het is het beste bewijs
dat de site heeft: `AANTAL_ZONDER_LEK` staat op 2 en
`rapportVoorSlug("stel-zonder-kinderen").uitkomstKop` is "Er is geen lek". Bouw
het artikel om dat gegeven heen. Gebruik `RAPPORTEN.length` voor het totaal, nooit
het cijfer vijf uitgeschreven. Dat is de fout die klus 4 op drie plekken maakte.

**Verboden.** Geen zelfhulptaal, geen affirmaties, geen "je bent niet alleen"
zonder cijfer erachter. Geen enkele uitspraak over hoe vaak dit voorkomt, want
`AANTAL_ZONDER_LEK` gaat over vijf huishoudens en niet over Nederland. Geen
psychologische claim zonder bron, en er is hier geen bron, dus geen
psychologische claim. Geen diagnose-achtige termen. Geen zware CTA-druk, dit is
het artikel waar de gratis analyse primair staat en de Geldscan secundair, net
zoals bij `huishoudboekje-voorbeeld`.

**Links.** Inkomend vanuit `goed-salaris-toch-geldstress`, `piekeren-over-geld`
en `waarom-lijkt-iedereen-rijker`. Uitgaand naar `money-dysmorphia-uitleg`,
`goed-salaris-toch-krap` als pillar, en naar `/rapporten`.

**CTA.** `primairHref: "/analyse"` met de Geldscan als secundair. Situatie laat
je hier leeg, want dit artikel bedient alle huishoudtypen gelijkwaardig, en dat
is precies de reden die klus 10 gebruikte om zes artikelen ongewijzigd te laten.

---

## 8. Volgorde en oplevering

1. Klus A, scheiden. Sterkste rekenlaag, bouw hem eerst zodat het proces zich
   bewijst op een artikel dat het waard is.
2. Klus B, twee auto's. Klein, test of de nieuwe regels ook op een simpele klus
   werken.
3. Klus C, samengesteld gezin. Kort houden.
4. Klus D, schaamte. Laatste, zodat hij naar A en C kan linken.

Elke klus levert op met status "klaar voor toets" en een logboekregel. Jarno
draait daarna de toetsprompt uit sectie 2 in een losse sessie. Pas als die niets
meer vindt, gaat de klus naar "af" en wordt de URL in Search Console ingediend.

---

## 9. Logboek

| Datum | Klus | Gebouwd | Toets in losse sessie | Status |
|---|---|---|---|---|
| 18-aug-2026 | A, scheiden | `scheiden-goed-inkomen-toch-niks-over`, component `TweeHuishoudensVergelijker.tsx`. Verdwenen bedrag met node handmatig nagerekend: bij €6.000 en 2 kinderen blijft het €1.707 bij verdeling 30/50/70, alleen wie negatief uitkomt verandert. | nog niet gedaan | klaar voor toets |
| 18-aug-2026 | B, twee auto's | `twee-autos-wat-kost-de-tweede-echt`, component `TweedeAutoRekenaar.tsx`. SERP op google.nl gecontroleerd: ANWB, Nibud, autobladen, leasesites, Reddit, niemand legt het naast het huishoudbudget. Gat bevestigd, gebouwd. | nog niet gedaan | klaar voor toets |
| 18-aug-2026 | C, samengesteld gezin | `samengesteld-gezin-twee-huishoudens-een-budget`, component `SamengesteldGezinRekenaar.tsx`. SERP op google.nl gecontroleerd: NN, Belastingdienst, Stiefgoed, relatiecoaches, allemaal over verdelen en regelen, niemand rekent deeltijdkinderen door. Gat bevestigd, gebouwd. | nog niet gedaan | klaar voor toets |
| 18-aug-2026 | D, schaamte | `schamen-niet-rondkomen-goed-inkomen`, geen rekenlaag, alleen `AANTAL_ZONDER_LEK` tegen `RAPPORTEN.length`. Gratis analyse primair, Geldscan secundair. | nog niet gedaan | klaar voor toets |


## 10. Opmerking bij oplevering 18-aug-2026

`npx tsc --noEmit --incremental false` gaf exit 0, geen null bytes in de gewijzigde bestanden,
`node scripts/generate-sitemap.mjs` is gedraaid (87 artikelen, sitemap en llms.txt bijgewerkt). Een
volledige `next build` kon in deze sessie niet binnen de tool-timeout van 45 seconden per commando
worden afgerond, dus de vier nieuwe pagina's zijn nog niet met een echte productiebuild
gerenderd. Draai die zelf lokaal (`npm run build`) vóór de toets of de deploy, zodat een
renderfout in een van de vier nieuwe content-componenten er niet doorheen glipt. De vier nieuwe
URL's moeten na een succesvolle build met de hand in Search Console worden ingediend:
`/inzichten/scheiden-goed-inkomen-toch-niks-over`, `/inzichten/twee-autos-wat-kost-de-tweede-echt`,
`/inzichten/samengesteld-gezin-twee-huishoudens-een-budget`,
`/inzichten/schamen-niet-rondkomen-goed-inkomen`.
