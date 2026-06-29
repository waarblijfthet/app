# Analyse: korte vs lange variant, en hoe we meer (voltooide) analyses krijgen

Advies en plan, 29 juni 2026. Geschreven na onderzoek in de eigen code (quiz-flow + meting) en externe bronnen over formulier- en quizconversie.

## Korte versie

Je instinct ("het zijn een hoop vragen, mensen haken af") klopt deels, maar niet op de plek waar jij hem zoekt. **Het lek zit niet binnen de analyse, het zit aan de voorkant.** Wie eenmaal stap 2 binnen is, maakt het bijna altijd af. Van de 28 die de analyse openden, gingen er maar 9 door naar stap 2. Daarna: 9 → 8 → 7 → 6 → 6. Dat is een prima doorloop (≈67% afronding zodra iemand begint), en een matige start (32% begint pas echt).

Dus: een aparte "lange" analyse bijbouwen lost het zichtbare probleem niet op. We moeten (1) de drempel om te starten verlagen en sneller laten zien wat je eraan hebt, en (2) de gevoelsmatige lengte verkleinen, niet de analyse zelf in tweeën knippen. Mijn advies is daarom **niet** een harde keuze "kort of lang", maar **één flow die standaard kort is, met optionele verdieping**.

Belangrijke kanttekening vooraf: **n = 28 is te klein om hard op te sturen.** Alles hieronder is richtinggevend. Het doel van het plan is net zo goed om straks wél te kunnen meten als om nu te verbeteren.

## Wat de data echt zegt

De meting (`quiz_voortgang`) logt stap 1 al bij het laden van de pagina (de useEffect draait bij mount). Dat betekent:

- **28 = mensen die de analyse-pagina laadden.**
- **9 = mensen die stap 1 invulden en doorklikten naar stap 2** (waar je je netto inkomen moet typen).
- 8, 7, 6, 6 = stap 3, 4, 5 en het resultaatscherm.

Het echte verhaal in deze cijfers:

| Overgang | Aantal | Wat er gebeurt |
|---|---|---|
| Laden → stap 2 | 28 → 9 (−68%) | **Hier zit het hele lek.** Mensen committen niet voorbij het introscherm + de eerste echte invoer (inkomen typen). |
| Stap 2 → resultaat | 9 → 6 (−33%) | Normale, gezonde doorloop. Geen teken van "te lang". |
| Resultaat → e-mail | 6 → 3 | Van wie het resultaat ziet, laat de helft een mailadres achter (dit is je echte leadconversie: 3 op 28). |

Twee dingen vallen op:

1. **De minimale route is nu al kort.** Om een resultaat te krijgen hoef je verplicht maar 4 tikvragen + 4 bedragen in te vullen (inkomen, woonlasten, zorgpremie, boodschappen). De rest van elk scherm is optioneel. Maar dat ziet de bezoeker niet: elk scherm *oogt* vol. De lengte is dus vooral een *perceptieprobleem*, en die perceptie ontstaat precies op het moment dat jij hem ook voelde: bij het eerste volle scherm.
2. **Op mobiel is de beloning zwak.** Het live vergelijkingspaneel (rechts) staat alleen op desktop. Mobiel krijgt alleen een dun In/Uit/Over-balkje. Als je verkeer vooral mobiel is, zien de meeste mensen dus nauwelijks "wat het oplevert" terwijl ze invullen. Dat verklaart mede de zwakke start.

## Wat het onderzoek zegt

- **Meerstaps verslaat één lang formulier** voor iets complex als dit; opknippen verhoogt afronding (HubSpot ~86% hoger, mobiel tot ~63%). Je meerstapsopzet is dus goed, niet het probleem. ([Zuko](https://www.zuko.io/blog/single-page-or-multi-step-form), [ivyforms](https://ivyforms.com/blog/multi-step-forms-single-step-forms/))
- **Minder velden = hogere afronding**, maar als de waarde duidelijk is, verdragen mensen meer velden. Veldtype telt: losse bedrag-/tekstvelden kosten weinig, dropdowns en grote blokken kosten veel. ([Venture Harbour](https://ventureharbour.com/how-form-impacts-conversion-rates/), [CXL](https://cxl.com/blog/reduce-form-fields/))
- **Progressive disclosure** (velden pas tonen als ze nodig zijn) verlaagt de *gevoelde* drempel met ~34% bij formulieren met 6+ velden. Dit is precies onze hefboom. ([reform.app](https://www.reform.app/blog/research-how-layout-affects-form-completion-rates))
- **Quizfunnel-sweet spot: 5 tot 8 vragen.** Daarboven daalt de afronding sneller dan de winst aan inzicht. Resultaat plagen vóór de e-mailvraag, e-mail pas vragen ná investering. ([GrowthLens](https://www.growthlens.io/blog/quiz-funnel-completion-rate-optimization), [Outgrow](https://outgrow.co/blog/quiz-engagement-benchmarks-completion-rates)) Dit doe je al goed: het resultaat is zichtbaar zonder e-mail.
- **Een expliciete keuze "kort of lang" aanbieden** helpt soms (keuze van modus verhoogt soms respons), maar net zo vaak niet, en het voegt een beslismoment en onderhoud toe. De doorslag geeft simpelweg of de ervaring zelf simpel voelt. ([PMC, choice of mode](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4392857/)) Conclusie: een harde tweedeling is niet de veiligste eerste zet.

## Advies: één flow, standaard kort, optioneel diep

In plaats van twee aparte analyses (dubbel onderhoud, extra beslismoment, en het lost het startlek niet op) maken we de **bestaande** analyse standaard kort, met verdieping als opt-in.

**De korte route (standaard voor iedereen):**

- Profiel (4 tikvragen, blijft).
- Per volgend scherm alleen het verplichte bedrag tonen, de optionele velden inklappen achter "Wil je het preciezer? Verfijn ▾" (zoals nu al bij toeslagen).
- Belofte vooraf herijken: niet "5 minuten", maar **"2 minuten, een handvol vragen, resultaat meteen op je scherm"**.
- Resultaat na de minimale invoer. Daarna: "Wil je een scherper beeld? Vul aan." → wie wil, klapt de extra velden open en verfijnt.

Zo krijgt iederéén een korte ervaring (helpt de start), terwijl de gemotiveerde, serieuze bezoeker (jouw eigenlijke lead) alsnog de diepte in kan, zonder dat jij twee funnels onderhoudt.

**Waarom dit boven een expliciete "kort/lang"-keuze:**

- Het lost het echte lek op (start), niet alleen de in-form lengte.
- Geen extra beslismoment op het introscherm.
- Eén codepad, één meting.
- Je kunt het stap voor stap A/B-testen.

Als je tóch de expliciete keuze wilt testen (jouw oorspronkelijke idee), dan is dat variant B hieronder, prima als A/B-test, maar ik zou A eerst doen.

## Plan, geprioriteerd

### P1 — Eerst meten waaróm ze aan de voorkant weglopen (1 dag)
We sturen nu op 28 sessies zonder te weten of dat echte bezoekers zijn.

- Splits de "28" uit: filter je eigen testsessies eruit en kijk naar mobiel vs desktop (zit al in `quiz_voortgang`/PageTracker?). Als 's leeuwendeel mobiel is, is de zwakke beloning op mobiel waarschijnlijk de hoofdoorzaak.
- Voeg een lichte "intro gezien maar niet gestart"-meting toe (nu is mount = stap 1, dus we kunnen "geladen maar geen enkele tik gedaan" niet onderscheiden van "stap 1 deels ingevuld"). Log een aparte gebeurtenis bij de eerste interactie (eerste tik in stap 1). Dan zie je of mensen op het intro afhaken of pas bij het inkomensscherm.

### P2 — Startdrempel verlagen + beloning naar voren (grootste verwachte winst)
- **Live vergelijking ook op mobiel.** Het dunne In/Uit/Over-balkje vervangen/uitbreiden door een compacte "jij vs gemiddeld"-weergave, zodat mobiel net als desktop ziet wat het oplevert tijdens het invullen.
- **Introscherm herschrijven** rond de korte belofte ("2 minuten") en een mini-voorbeeld van het resultaat (laat zien wat ze krijgen vóór ze investeren).
- **Inkomensscherm ontspannen:** alleen het ene salarisveld tonen, toggles (vakantiegeld/13e) en toeslagen standaard ingeklapt. Korte geruststelling bij het bedrag-veld ("een schatting is goed genoeg").

### P3 — Gevoelsmatige lengte verkleinen in stap 3, 4, 5
- Pas dezelfde inklap-aanpak toe op Wonen, Vervoer en Dagelijks: standaard alleen het verplichte bedrag, rest achter "Verfijn ▾".
- Toon na de minimale invoer al een (voorlopig) resultaat met de mogelijkheid te verfijnen, in plaats van pas op scherm 6.

### Variant B (optioneel, als losse A/B-test ná P2)
- Introscherm met twee kaarten: **"Snelle check, 2 min"** (alleen de ~5 verplichte bedragen → resultaat) en **"Volledige analyse, 5–8 min"** (huidige diepte).
- Doel snelle check: zoveel mogelijk mensen een eerste eerlijk inzicht + de eerste vergelijking laten zien (top-of-funnel, warmmaker).
- Doel volledige analyse: de scherpe, persoonlijke uitkomst die de echte lead oplevert.
- Meet of de keuze de start daadwerkelijk verhoogt, of alleen een extra klik toevoegt.

## Wat nemen we op in de korte variant, en waarom

Houd de korte route bij wat nodig is voor een geloofwaardig "waar blijft het"-antwoord, en laat de rest schatten via je benchmarks:

- **Profiel** (alleen/samen, koop/huur, kinderen, auto): bepaalt met welk huishouden je vergeleken wordt. Onmisbaar, en het kost niets (tikken).
- **Netto inkomen**: het anker van het hele verhaal.
- **Woonlasten**: veruit de grootste post, niet te schatten.
- **Zorgpremie** en **boodschappen**: de twee posten die het sterkst variëren en waar mensen zich het meest in herkennen.

De rest (energie, internet, vervoer, abonnementen, verzekeringen, jaarlijkse kosten, spaardoel) is verdieping: nuttig voor de serieuze lead, maar niet nodig om iemand een eerste, herkenbaar inzicht te geven. Doel van de korte variant is dus niet "compleet", maar **"snel een eerlijk eerste inzicht + de eerste vergelijking", zodat mensen geprikkeld worden om door te gaan of contact te zoeken.**

## Wat ik je afraad
- Een tweede, los onderhouden "lange" analyse bouwen. Dubbel werk, en het raakt het startlek niet.
- Hard sturen op deze 28 sessies. Eerst de meting aanscherpen (P1), dan pas grote conclusies.
- De analyse inhoudelijk uitkleden. De diepte is je onderscheidend vermogen voor de betalende klant; we verbergen hem alleen tot iemand erom vraagt.
