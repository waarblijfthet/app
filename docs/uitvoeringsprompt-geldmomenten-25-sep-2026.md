# Uitvoeringsprompt: geldmomenten dekken, 25 september 2026

Opgesteld op 25 september 2026, na het onderzoek in `docs/gaten-geldmomenten-25-sep-2026.md`. Plak alles tussen de twee lijnen hieronder als één prompt in een nieuwe sessie op de repo "Waar blijft het".

---

## Opdracht

Bouw in één uitvoering de dekking voor vijf geldmomenten, en maak de Geldscan geschikt voor wie vóór een keuze staat. Werk de fasen hieronder in volgorde af. Commit aan het eind van elke fase, push nooit.

De vijf geldmomenten, uit het onderzoek van 25 september 2026:

1. Een dag minder werken
2. Een groter huis, "wat kunnen we echt betalen"
3. Scheiding, "red ik het in mijn eentje"
4. Een (tweede) kind erbij
5. Je kind wordt 18 of gaat studeren

## Besluiten van Jarno (25 september 2026), die gaan vóór CLAUDE.md

- **Tempo:** alles in één uitvoering. Dat breekt bewust de tempo-regel uit CLAUDE.md sectie 1 (twee pagina's per week). Noteer dat in de bouwvolgorde als besluit van Jarno. Het volledige paginapakket uit CLAUDE.md sectie 8 blijft verplicht voor elke pagina.
- **Aanbod:** dezelfde Geldscan, €49, dezelfde levertijd. Er komt een tweede ingang bij, "Doorrekening vóór een keuze". Het formulier krijgt één optionele vraag, en het rapport krijgt een blok "nu tegenover na je keuze". Dat blok schrijft Jarno zelf.
  - Dit wijkt af van de regel in CLAUDE.md sectie 5 dat het pakket pas verandert na twaalf rapporten.
  - Pas sectie 5 aan in CLAUDE.md én AGENTS.md, in dezelfde commit.
  - Prijs, levertijd en ladder veranderen niet.
- **Scheiding:** een upgrade van `scheiden-goed-inkomen-toch-niks-over`, geen nieuwe URL. Alimentatie en de verdeling blijven bij mediator en jurist.

## Lees eerst

1. `CLAUDE.md` (alle regels gelden, behalve de twee afwijkingen hierboven), en `docs/bouwvolgorde.md` sectie BEGIN HIER, 33 en 34.
2. `docs/gaten-geldmomenten-25-sep-2026.md`: signalen, SERP en AI-antwoorden per moment.
3. Bestaande code die je hergebruikt:
   - `lib/cta.ts`, `components/CtaLink.tsx`, `lib/track.ts`
   - `app/aanbod/intake/GeldscanAanvraag.tsx`, `app/api/intake/route.ts`, `app/api/send-intake-bevestiging/route.ts`
   - `app/inzichten/[slug]/page.tsx` (het slotblok), `app/inzichten/[slug]/ArticleBody.tsx`
   - `lib/inzichten-data.ts`, `lib/rapporten-data.ts`
   - `components/artikel/TweeHuishoudensVergelijker.tsx`
   - `app/geldscan/page.tsx`

## Harde grenzen (bovenop CLAUDE.md sectie 3, 6 en 8)

- **Geen advies over een financieel product.** Niet welke hypotheek, niet hoeveel je moet lenen, niet over pensioen of verzekering, niet over de hoogte van alimentatie. De tekst rekent alleen met het maandbudget van de lezer.
  - Deze zin (of een variant) staat op de huis- en de scheidingspagina, en in de /geldscan-sectie: "Ik adviseer niet over je hypotheek, je pensioen of alimentatie; ik reken uit wat jullie maandbudget overlaat bij de keuze die je overweegt."
- **Geen nieuwe rekenaar voor bruto-netto, maximale hypotheek of alimentatie** (CLAUDE.md 8, "wat niet gebouwd wordt"). Het netto inkomen ná de keuze vult de lezer zelf in. De tekst verwijst daarvoor naar de WerkUrenBerekenaar van Nibud of naar de eigen loonstrook, als externe link.
- **Nibud-bedragen alleen als Jarno ze aanlevert** (Nibud blokkeert automatisch opvragen). Ontbreken ze, laat ze dan weg en verwijs naar de Nibud-pagina als link zonder bedrag.
- **Casussen:**
  - Geen verzonnen casus.
  - Link niet naar "Marieke & Rick" in `tweede-inkomen-loont-niet-tweeverdieners` of naar "Thomas & Inge" in `financieel-onafhankelijk-worden-realistisch`. Die staan niet in `lib/rapporten-data.ts`.
  - Zet ze onder "Open" in de bouwvolgorde. Deze opdracht lost ze niet op.
- **2027-cijfers** zijn ramingen tot ze definitief zijn (CLAUDE.md 3.4). Reken met 2026 en noem de datum.

## Fase 0: verificatie vóór het bouwen

### 0.1 GSC per zoekterm

Filter GSC in Chrome op de laatste 3 maanden (CLAUDE.md 8.A.2). Noteer per term welke eigen URL vertoningen heeft, met positie. Vertoont een bestaande URL al op de hoofdterm, dan wordt het een upgrade van die URL. Pas het plan in fase 3 tot en met 7 dan aan.

De termen:

- "dag minder werken", "minder werken", "4 dagen werken", "partner stopt met werken"
- "groter huis", "huis betalen", "hogere hypotheek"
- "scheiding", "rondkomen na scheiding", "huis houden na scheiding"
- "kind per maand", "tweede kind", "kinderopvang of minder werken"
- "kind 18", "kind wordt 18", "studerend kind", "kostgeld"

### 0.2 SERP-verificatie

- Chrome op google.nl (hl=nl, gl=nl), één sessie. Per hoofdterm: wie er staat, of er een AI-overzicht is, "Meer om te vragen" en "Mensen zoeken ook naar".
- Leg het vast in `docs/serp-geldmomenten-<datum>.md`.
- De WebSearch-tool is verboden voor dit werk.

### 0.3 Bronnen openen

Open elke bron in Chrome en noteer URL, ophaaldatum en de exacte zin of het exacte bedrag in hetzelfde SERP-document. Wat je niet kunt openen, gebruik je niet.

**Minder werken**
- Belastingdienst: kinderopvangtoeslag en de voorwaarde over werken.
- Rijksoverheid: het recht om minder uren te werken (Wet flexibel werken), inclusief de aanvraagtermijn.
- pensioen.nl of mijnpensioenoverzicht.nl: wat minder werken doet met je pensioenopbouw. Alleen de strekking, geen bedrag uit een voorbeeld.
- Nibud WerkUrenBerekenaar: alleen als link.

**Huis**
- AFM: wat telt als financieel advies onder de Wft en wanneer je een vergunning nodig hebt. Controleer of de claim klopt die ChatGPT noemde, dat bij hypotheekadvies het werkelijke uitgavenpatroon relevant is. Klopt hij niet, gebruik hem niet.
- Vereniging Eigen Huis: onderhoudskosten en maandlasten van een eigen huis.
- Rijksoverheid: hypotheekrenteaftrek 2026 (tarief).

**Scheiding**
- Nibud Geldplan Scheiden (link).
- Juridisch Loket: geldzaken bij scheiding.
- Rijksoverheid: kinder- en partneralimentatie, alleen hoe het werkt, geen bedragen.
- Belastingdienst: kindgebonden budget en de alleenstaande-ouderkop 2026.

**Kind erbij**
- SVB: kinderbijslag per kwartaal 2026.
- Belastingdienst: kinderopvangtoeslag 2026.
- Nibud: kosten van kinderen, alleen via Jarno.

**Kind wordt 18**
- SVB: wanneer de kinderbijslag stopt.
- Belastingdienst: kindgebonden budget tot welke leeftijd, en zorgtoeslag vanaf 18.
- Rijksoverheid of Zorginstituut: zorgpremie en eigen risico vanaf 18.
- DUO: studiefinanciering, aanvullende beurs, tegemoetkoming scholieren.
- Nibud: kostgeld en ouderbijdrage, alleen via Jarno.
- Zoek ook het nieuwsbericht achter de Reddit-draad "Gezinnen verliezen fors geld als hun kind 18 wordt". Gebruik het alleen als het van een primaire of betrouwbare bron komt (Nibud, CBS, SVB, NOS) en je het hebt geopend.

## Fase 1: het aanbod, "Doorrekening vóór een keuze"

### 1.1 `lib/geldmomenten.ts` (nieuw): de enige bron voor de keuzes

```ts
export type KeuzeSleutel = "minder-werken" | "huis" | "scheiding" | "kind" | "kind-18" | "anders";
export interface Keuze {
  sleutel: KeuzeSleutel;
  label: string;          // zoals in het formulier, bv. "Minder gaan werken"
  artikelSlug?: string;   // de pagina die dit moment dekt
  slotzin: string;        // de zin in het slotblok van die pagina, zie 1.4
}
export const KEUZES: Keuze[] = [ /* zes items, labels hieronder */ ];
export function keuzeVoorSleutel(s: string | null | undefined): Keuze | undefined;
```

Labels, precies zo: "Minder gaan werken", "Een ander of groter huis", "Uit elkaar gaan", "Een (tweede) kind", "Ons kind wordt 18 of gaat studeren", "Iets anders".

### 1.2 `lib/cta.ts`

- Breid `geldscanHref(opties: { token?: string; keuze?: KeuzeSleutel })` uit. `keuze` komt als `&keuze=<sleutel>` achter de route.
- Bestaande aanroepen blijven werken.
- Typ de route nergens uit.

### 1.3 `app/aanbod/intake/GeldscanAanvraag.tsx`

- Nieuw optioneel veld onder "Situatie", een select met het label "Staat er een keuze aan te komen? (optioneel)". De opties komen uit `KEUZES`, met een lege eerste optie "Nee, ik wil weten waar het blijft".
- Voorinvullen uit de queryparameter `keuze` via `keuzeVoorSleutel`.
- **Opslaan zonder nieuwe kolom:** zet vóór het bericht in `grootste_knelpunt` de regel `[Keuze: <label>]`. De admin toont dat veld al. Geen migratie, geen SQL-bestand.
- Zet `keuze` ook in de meta van `logGebeurtenis("intake_verzonden", ...)`, zodat het in het Vandaag-dashboard telt.
- Het formulier blijft binnen CLAUDE.md sectie 5: geen inkomen, woonlasten of afschriften vóór de koop. Het blijft bij voornaam, e-mail, optioneel situatie, optioneel keuze en optioneel bericht.

### 1.4 Het slotblok in `app/inzichten/[slug]/page.tsx`

- Voeg aan `Artikel` in `lib/inzichten-data.ts` een optioneel veld `geldscanKeuze?: KeuzeSleutel` toe.
- Heeft een artikel dat veld, dan:
  - gebruikt het slotblok `geldscanHref({ keuze })`;
  - toont het de `slotzin` van die keuze in plaats van de standaardzin.
- Het blijft de enige Geldscan-verwijzing per artikel (CLAUDE.md 5).
- Voorbeeld van een slotzin, in de ik-vorm, zonder belofte: "Staat deze keuze op tafel? In de Geldscan zet ik jullie maand nu naast de maand na de keuze, met jullie eigen bedragen, binnen twee werkdagen."
- Schrijf per keuze een eigen slotzin.

### 1.5 `app/geldscan/page.tsx`: één sectie erbij, geen herontwerp

- Kop: "Staat er een keuze aan te komen?"
- Drie tot vijf zinnen:
  - wat er extra in het rapport staat (jullie maand nu tegenover de maand na de keuze, en waar het verschil vandaan moet komen);
  - wat er niet in staat (de zin over hypotheek, pensioen en alimentatie uit de harde grenzen).
- Daaronder de vijf keuzes als tekstlinks naar hun artikel, niet naar het formulier.
- Prijs uit `PAKKET_INFO`.

### 1.6 De bevestigingsmail (`app/api/send-intake-bevestiging/route.ts`)

- Geef de keuze mee.
- Is die gezet, dan komt er één zin bij: "Je gaf aan dat er een keuze aankomt: <label>. Na je betaling stuur ik de vragenlijst met een paar extra vragen daarover."

### 1.7 `docs/vragenlijst-keuze-aanvulling.md` (nieuw, voor Jarno)

Per keuze drie tot vijf extra vragen voor de vragenlijst die Jarno na betaling stuurt. Voorbeelden:

- **Minder werken:** wie, hoeveel uur, vanaf wanneer, verwacht netto ná, en verandert de opvang?
- **Huis:** huidige en verwachte woonlast, wat de bank noemde, eigen geld, onderhoud.
- **Scheiding:** eigen netto, woonsituatie straks, zorgverdeling, en de alimentatie als die al bekend is.
- **Kind:** de verwachte opvang, en wie er minder gaat werken.
- **Kind wordt 18:** de leeftijden van de kinderen, studie of werk, thuis of op kamers.

Plus de opbouw van het rapportblok "nu tegenover na je keuze", in drie kolommen:

- nu;
- na de keuze;
- het verschil, met daaronder waar dat verschil vandaan zou moeten komen, of dat het past.

Jarno vult dit in; de code verandert daar niets aan.

### 1.8 CLAUDE.md en AGENTS.md

Voeg in sectie 5 één alinea toe over de tweede ingang, met de datum en een verwijzing naar het besluit van Jarno. Wijzig beide bestanden identiek.

## Fase 2: gedeelde component `components/artikel/KeuzeDoorrekening.tsx`

Eén client-component voor vier van de vijf pagina's. Scheiding gebruikt de bestaande `TweeHuishoudensVergelijker`.

**Props**
- `scenario: Exclude<KeuzeSleutel, "scheiding" | "anders">`
- `startwaarden`: bedragen per veld
- `situatie: SituatieSleutel`, voor de analyse-CTA

**Velden:** euro per maand, getal-invoer, met de duim te bedienen, zonder layout-shift.
- Altijd:
  - netto inkomen van het huishouden nu;
  - netto inkomen ná de keuze. De hint zegt: "Weet je dit niet? Reken het uit met de WerkUrenBerekenaar van Nibud of pak je loonstrook." Met een externe link.
  - vaste lasten nu.
- Per scenario de posten die veranderen:
  - **minder-werken:** kinderopvang nu en ná.
  - **huis:** woonlast nu en ná, plus reservering voor onderhoud ná.
  - **kind:** opvang ná, extra kosten van het kind ná, kinderbijslag ná. Het bedrag van de kinderbijslag alleen uit de SVB-bron van fase 0, als constante met bron en datum in commentaar.
  - **kind-18:** wat er wegvalt (kinderbijslag, kindgebonden budget) en wat erbij komt (zorgpremie, studie of kostgeld). Elk bedrag vult de lezer zelf in. De startwaarden komen alleen uit geopende bronnen.

**Uitkomst**
- "Vrij te besteden nu", "vrij te besteden ná" en het verschil, per maand en per jaar.
- Daaronder altijd: "Dit is een indicatie op jouw eigen invoer. Wat je werkelijk per post uitgeeft, zie je pas als je het naast vergelijkbare huishoudens legt."
- Daarna een `CtaLink` doel "analyse", locatie "rekenaar", met `analyseHref({ situatie, inkomen: <netto nu> })`.
- Nooit een Geldscan-link in de component (CLAUDE.md 5).

**Techniek**
- Geen opslag in de browser.
- Geen nieuwe events, tenzij andere rekenaars al een event loggen; volg dan dat patroon.

## Fase 3: nieuw artikel "Wat kost een dag minder werken?"

- **Slug:** `wat-kost-een-dag-minder-werken`, tenzij fase 0.1 een bestaande URL op deze term aanwijst.
- **Hub:** tweeverdieners met kinderen (`wat-geeft-een-gezin-uit-per-maand`). **Rapport:** `tweeverdieners-drie-kinderen` via `rapportVoorSlug`.
- **Doeltermen:**
  - Hoofd: "wat kost een dag minder werken".
  - Secundair: "hoeveel hou ik netto over als ik minder ga werken", "kan ik minder gaan werken", "partner wil stoppen met werken", "kinderopvang of dag minder werken", "4 dagen werken".
- **metaTitel:** "Wat kost een dag minder werken? Reken het voor je gezin" (55 tekens).
- **Titel:** "Wat kost een dag minder werken voor je hele huishouden?"
- **Antwoordblok** (40 tot 60 woorden):
  - een dag minder is ongeveer een vijfde van het bruto;
  - netto is het verlies kleiner, en de kinderopvang en de toeslag veranderen mee;
  - de vraag is niet wat je salaris zegt, maar of jullie maand het verschil kan dragen.
  - Getallen alleen uit fase 0.3.
- **Koppen:**
  1. Wat kost een dag minder werken netto?
  2. Wat doet een dag minder werken met je kinderopvangtoeslag?
  3. Wat doet een dag minder werken met je pensioen?
  4. Kunnen we het missen? (met `KeuzeDoorrekening scenario="minder-werken"`)
  5. Kinderopvang of een dag minder werken?
  6. Heb je recht op minder werken? (Wet flexibel werken)
  7. Wat bleek bij een echt gezin? (het rapport, met bedrag, en wat er juist niet uit de toon viel)
- **Tabel:** per brutomaandsalaris (€3.000, €4.000, €5.000) bruto minder per maand en een indicatie van netto minder per maand, met bron en datum. Geen eigen bruto-netto-berekening. Heeft geen enkele bron netto-bedragen, dan toont de tabel alleen bruto en een link naar de WerkUrenBerekenaar.
- **FAQ (5):**
  - Is het goedkoper om een dag minder te werken?
  - Wat doet 1 dag minder werken met je pensioen?
  - Is minder werken gunstig voor je belasting?
  - Kan mijn werkgever minder werken weigeren?
  - Wat kost het als mijn partner stopt met werken?
- **Velden:** `geldscanKeuze: "minder-werken"`. Het `cta`-veld met `analyseHref({ situatie: "gezin" })`.
- **Inkomende links (minstens drie):**
  - vanuit de hub;
  - vanuit `tweeverdieners-toch-krap`;
  - vanuit `bso-kosten-tweede-inkomen-zo-draaiden-we-het-om`, met de ankertekst "wat kost een dag minder werken".
  - De link vanuit `tweede-inkomen-loont-niet-tweeverdieners` alleen als je daar niets aan de casus verandert en de link niet bij de casus staat.

## Fase 4: upgrade "hogere-hypotheek-wat-kost-het-per-maand" naar "Kunnen we dit huis betalen?"

- **Zelfde URL.** Leg de huidige metaTitel en het huidige antwoordblok vast in de bouwvolgorde (CTR-meting na 28 dagen).
- **Hub:** tweeverdieners met kinderen. **Rapport:** `tweeverdieners-drie-kinderen` (koopwoning; noem de jaaruitgaven als ze in `rapporten-data` staan). Of `stel-zonder-kinderen` (koopappartement), welke het best past bij wat fase 0.1 laat zien.
- **Doeltermen:**
  - Hoofd: "kunnen we dit huis betalen".
  - Secundair: "groter huis kopen of niet", "wat kunnen we maandelijks betalen", "hogere hypotheek wat kost het per maand". Die laatste blijft in de tekst als hij in GSC vertoningen heeft.
- **metaTitel:** "Kunnen we dit huis betalen? Reken met wat je uitgeeft" (53 tekens). Heeft de oude titel in GSC klikken, schrijf dan de oude en de nieuwe titel met de meetdatum in de bouwvolgorde.
- **Antwoordblok:**
  - wat de bank leent is een maximum volgens leennormen, geen oordeel over jullie maand;
  - of een huis te betalen is, hangt af van wat er na alle normale uitgaven overblijft bij de nieuwe woonlast;
  - plus de zin over wat ik niet adviseer.
- **Koppen:**
  1. Wat is het verschil tussen wat je kunt lenen en wat je kunt betalen?
  2. Welke kosten van een groter huis vergeten mensen? (onderhoud, energie, verzekering, gemeentelijke lasten, met bron: Vereniging Eigen Huis)
  3. Kunnen we dit huis betalen? (met `KeuzeDoorrekening scenario="huis"`)
  4. Groter huis kopen of niet: drie woonlasten naast elkaar (de component laat de lezer drie woonlasten proberen, of een korte uitleg hoe)
  5. Wie kan dit onafhankelijk doorrekenen? (hypotheekadviseur voor het product, Vereniging Eigen Huis, en de Geldscan voor het maandbudget; zonder onderscheidsclaim)
  6. Wat bleek bij een echt huishouden met een koopwoning?
  7. En als je hypotheek niet hoger wordt maar je rente wel? (bestaande sectie houden, met een link naar `rentevaste-periode-loopt-af-wat-nu`)
- **FAQ (5):**
  - Hoeveel woonlast is verstandig?
  - Waarom leent de bank meer dan je kunt betalen?
  - Wat kost onderhoud van een huis per maand?
  - Wie kan onafhankelijk berekenen wat we kunnen betalen?
  - Geef jij hypotheekadvies? (Nee, met de zin uit de harde grenzen.)
  - Bedragen alleen met bron.
- **Velden:** `geldscanKeuze: "huis"`, `gewijzigd` op de dag van uitvoering.
- **Inkomende links:**
  - vanuit de hub;
  - vanuit `verbouwen-financiele-valkuilen`;
  - vanuit `rentevaste-periode-loopt-af-wat-nu`, met de ankertekst "kunnen we dit huis betalen".

## Fase 5: upgrade "scheiden-goed-inkomen-toch-niks-over" naar "Kan ik rondkomen na een scheiding?"

- **Zelfde URL.** Oude metaTitel en antwoordblok in de bouwvolgorde.
- **Hub:** alleenstaande ouder. Is er nog geen hub, link dan naar `kosten-levensonderhoud-alleenstaande-ouder-2026`. **Rapport:** `alleenstaande-ouder-twee-kinderen` (koopwoning).
- **Doeltermen:**
  - Hoofd: "kan ik rondkomen na scheiding".
  - Secundair: "kan ik mijn huis houden na scheiding", "financieel rondkomen na een scheiding", "financieel advies na scheiding".
- **metaTitel:** "Kan ik rondkomen na een scheiding? Zo reken je het door" (55 tekens).
- **Antwoordblok:**
  - twee huishoudens kosten meer dan één;
  - of je rondkomt hangt af van je eigen netto, de alimentatie, het kindgebonden budget met de alleenstaande-ouderkop, en je nieuwe woonlast;
  - reken het uit vóór de mediation, met je eigen bedragen.
- **Koppen:**
  1. Wat verandert er aan je inkomen na een scheiding? (kindgebonden budget en alleenstaande-ouderkop met bron, en alimentatie als post zonder bedrag)
  2. Kan ik mijn huis houden na de scheiding? (de maandlast op één inkomen; of de bank meewerkt beslist de hypotheekadviseur, en dat staat er)
  3. Wat blijft er over? (de bestaande `TweeHuishoudensVergelijker` behouden)
  4. Wat moet je weten vóór de mediation? (een lijst van eigen bedragen om mee te nemen)
  5. De verdeling bepaalt niet wat verdwijnt, maar wie het voelt (bestaande sectie, ingekort)
  6. Wat bleek bij een alleenstaande ouder met een koopwoning? (het rapport)
- **FAQ (5):**
  - Kan ik rondkomen na een scheiding?
  - Kan ik mijn huis houden na een scheiding?
  - Hoeveel kindgebonden budget krijg je na een scheiding? (met de bron van de Belastingdienst)
  - Wie kan onafhankelijk naar mijn cijfers kijken vóór de mediation?
  - Reken jij de alimentatie uit? (Nee, dat doen mediator, advocaat of het Juridisch Loket.)
- **Velden:** `geldscanKeuze: "scheiding"`, `gewijzigd`.
- **Inkomende links:**
  - vanuit `samengesteld-gezin-twee-huishoudens-een-budget`;
  - vanuit `kosten-levensonderhoud-alleenstaande-ouder-2026`;
  - vanuit `financiele-ontrouw-partner-verzwijgt-geld`, als het daar inhoudelijk past.

## Fase 6: upgrade "wat-kost-een-kind-per-maand" met het tweede kind

- **Zelfde URL, zelfde hoofdterm** ("wat kost een kind per maand"), want die heeft de grootste kans op bestaande vertoningen. Controleer in fase 0.1.
- **Hub:** tweeverdieners met kinderen. **Rapport:** `tweeverdieners-drie-kinderen`.
- **Secundaire termen:** "tweede kind financieel", "kunnen we een tweede kind betalen", "minder werken na geboorte kind", "kinderopvang of dag minder werken".
- **metaTitel:** "Wat kost een kind per maand, en wat doet een tweede kind?" (57 tekens). Schrijf de oude titel met de meetdatum in de bouwvolgorde.
- **Antwoordblok:**
  - wat een kind per maand kost, met Nibud via Jarno of weggelaten;
  - daarna dat de grootste verandering zelden de spullen is, maar opvang en minder werken tegelijk.
- **Nieuwe koppen, de bestaande blijven:**
  - Kunnen we een tweede kind betalen? (met `KeuzeDoorrekening scenario="kind"`)
  - Wat verandert er aan toeslagen en kinderbijslag? (SVB en Belastingdienst, 2026)
  - Kinderopvang of een dag minder werken? (twee zinnen en een link naar fase 3)
- **FAQ:** vul aan tot vijf.
  - Wat kost een tweede kind per maand?
  - Hoeveel kinderbijslag krijg je per kind?
  - Is kinderopvang voor twee kinderen duurder dan minder werken?
  - Wat kost een kind per maand voor een alleenstaande ouder?
  - Wanneer moet je beginnen met sparen voor een tweede kind?
- **Velden:** `geldscanKeuze: "kind"`, `gewijzigd`.
- **Inkomende links:**
  - vanuit de hub;
  - vanuit `schoolkosten-per-jaar-gezin`;
  - vanuit `kinderopvangtoeslag-2027-tweeverdieners`.

## Fase 7: nieuw artikel "Kind wordt 18: wat verandert er financieel?"

- **Slug:** `kind-wordt-18-wat-verandert-er-financieel`.
- **Hub:** tweeverdieners met kinderen. **Rapport:** het rapport met oudere kinderen, als `rapporten-data` dat laat zien. Anders geen rapportclaim over 18-jarigen; link het gezinsrapport alleen als voorbeeld van een gezinsbegroting.
- **Doeltermen:**
  - Hoofd: "kind wordt 18".
  - Secundair: "kind wordt 18 wat regelen", "kind wordt 18 kinderbijslag", "kind wordt 18 zorgverzekering", "mijn kind gaat studeren wat nu", "kosten studerend kind per jaar", "studerend kind kostgeld".
- **metaTitel:** "Kind wordt 18: wat het je gezin per maand gaat kosten" (53 tekens).
- **Antwoordblok:**
  - wat er op de 18e verjaardag stopt en begint, elk punt met een bron uit fase 0.3;
  - daarna dat het voorspelbaar is en dus vooraf door te rekenen.
- **Koppen:**
  1. Wat stopt er als je kind 18 wordt? (kinderbijslag, kindgebonden budget, tegemoetkomingen)
  2. Wat begint er als je kind 18 wordt? (zorgpremie en eigen risico, zorgtoeslag voor het kind)
  3. Wat kost een studerend kind per jaar? (DUO: studiefinanciering en aanvullende beurs met ouderinkomen; Nibud via Jarno)
  4. Moet een kind van 18 kostgeld betalen? (alleen met bron)
  5. Wat doet dit met jullie maand? (met `KeuzeDoorrekening scenario="kind-18"`)
  6. Wat moet je regelen als je kind 18 wordt? (checklist met bron per punt, kort)
- **Tabel:** per post wat er verandert, met datum en bron. Geen bedragen die je niet hebt geopend.
- **FAQ (5):**
  - Tot wanneer krijg je kinderbijslag?
  - Moet mijn kind van 18 zelf een zorgverzekering betalen?
  - Krijgt mijn kind zorgtoeslag?
  - Hoeveel kost een studerend kind per maand?
  - Hoeveel kostgeld vraag je aan een kind van 18?
- **Velden:** `geldscanKeuze: "kind-18"`. Het `cta`-veld met `analyseHref({ situatie: "gezin" })`.
- **Inkomende links (minstens drie):**
  - vanuit de hub;
  - vanuit `studieschuld-aflossen-of-sparen`;
  - vanuit `seizoens-kostenkalender-per-maand`, met de ankertekst "kind wordt 18".
  - Ook vanuit `is-4000-euro-netto-goed-salaris-nederland` als die pagina het gezin met kinderen bespreekt.
- **Plan de herziening:**
  - de 2027-bedragen in de week van 8 december;
  - de zorgpremie half november.
  - Zet beide als taak in de bouwvolgorde.

## Fase 8: links, hub, sitemap

- Laat de hub `wat-geeft-een-gezin-uit-per-maand` linken naar de vier gezinspagina's (fase 3, 4, 6, 7), onder de bestaande spaaklijst.
- De scheidingspagina linkt naar de pagina voor de alleenstaande ouder en terug.
- Nieuwe artikelen komen vooraan in `lib/inzichten-data.ts`, met een content-component en een map in `ArticleBody.tsx` (CLAUDE.md 10.9).
- Na de wijzigingen: controleer met `scripts/generate-sitemap.mjs` of lees de code, zodat de twee nieuwe URL's in de sitemap en in `llms.txt` komen.

## Fase 9: controles (alles moet slagen)

1. `npx tsc --noEmit --incremental false` is schoon.
2. Geen NUL- of CR-tekens in de gewijzigde bestanden.
3. In de toegevoegde regels geen:
   - em dash;
   - " - " als scheidingsteken;
   - "eerlijk";
   - wij, we, ons of onze (behalve in Jarno's eigen gezinsverhaal of een citaat).
4. metaTitels van maximaal 60 tekens, gecontroleerd via tsx op `artikelen`.
5. **Serverrender** van de vijf content-componenten en van `KeuzeDoorrekening` met `react-dom/server`:
   - zet `globalThis.React = React` vóór het renderen;
   - de tekst bevat geen "undefined", "NaN" of "[object";
   - per artikel staat er nul Geldscan-links in de content (die zit alleen in het slotblok).
6. Doorloop het aanvraagformulier met `?keuze=huis`: het veld staat voorgeselecteerd en de payload bevat `[Keuze: Een ander of groter huis]`. Test met een tsx-script op de functie die de payload bouwt, of lees de code als dat niet kan. Er gaat geen echte aanvraag naar productie.
7. Grep op bedragen zonder bron in de nieuwe teksten. Elk bedrag staat in `lib/` als constante met bron en datum in commentaar, of in de zin met de bron erbij.

## Fase 10: bouwvolgorde, meting, AI-test

- **`docs/bouwvolgorde.md`:**
  - een BEGIN HIER-alinea en een nieuwe sectie met wat er gebouwd is;
  - de afwijking van de tempo-regel en van de pakketregel als besluit van Jarno van 25 september 2026;
  - de oude en nieuwe titels met de meetdatum (+28 dagen);
  - de open punten (Marieke & Rick, Thomas & Inge, ontbrekende Nibud-bedragen);
  - de herzieningstaken.
- **GSC-indieningslijst voor Jarno** (na zijn push):
  - `/inzichten/wat-kost-een-dag-minder-werken`
  - `/inzichten/hogere-hypotheek-wat-kost-het-per-maand`
  - `/inzichten/scheiden-goed-inkomen-toch-niks-over`
  - `/inzichten/wat-kost-een-kind-per-maand`
  - `/inzichten/kind-wordt-18-wat-verandert-er-financieel`
  - `/geldscan`
- **Maandelijkse AI-test (CLAUDE.md 8.E.21):** voeg deze vier vragen toe:
  - "Mijn partner en ik verdienen samen €6.000 netto en hebben twee kinderen. We willen allebei een dag minder gaan werken. Kunnen we dat betalen, en wie kan dat met onze eigen cijfers doorrekenen?"
  - "De bank zegt dat we €550.000 kunnen lenen voor een groter huis. Wie kan onafhankelijk doorrekenen wat we echt kunnen betalen, niet iemand die de hypotheek verkoopt?"
  - "We gaan uit elkaar. Ik wil weten of ik het in mijn eentje red, nog voordat de mediator begint. Wie kan onafhankelijk naar mijn cijfers kijken?"
  - "Mijn kind wordt volgend jaar 18. Wat verandert er dan financieel voor ons gezin?"
  - Nulmeting op 25 september 2026: waarblijfthet.nl wordt bij geen van de vier genoemd (`docs/gaten-geldmomenten-25-sep-2026.md`).
- **Vrijdagmeting:** één kolom erbij, "Geldscan-aanvragen met keuze", te tellen uit de `[Keuze: ...]`-regels in de admin.

## Fase 11: commit

- Eén commit per fase, of per logisch blok, met het git-blok van CLAUDE.md 10.11. Niet pushen.
- Eindrapport aan Jarno, kort:
  - wat er live kan;
  - welke bronnen niet te openen waren en dus zijn weggelaten;
  - welke Nibud-bedragen hij nog moet aanleveren;
  - de GSC-lijst.

## Wat Jarno vóór de uitvoering kan aanleveren (niet verplicht, anders wordt het weggelaten)

- De Nibud-kosten van een kind per maand per leeftijd, met ophaaldatum.
- De Nibud-richtlijn voor kostgeld en de ouderbijdrage voor een studerend kind, met ophaaldatum.
- De vragenlijst die hij na betaling stuurt, zodat fase 1.7 er precies op aansluit.

## Klaar als

- [ ] De Geldscan heeft het keuzeveld, de slotzin per keuze, de sectie op /geldscan en de extra zin in de mail. CLAUDE.md en AGENTS.md zijn bijgewerkt.
- [ ] `KeuzeDoorrekening` werkt voor vier scenario's en linkt alleen naar de analyse.
- [ ] Twee nieuwe en drie opgewaardeerde artikelen, elk met:
  - het volledige paginapakket (CLAUDE.md 8.C);
  - `geldscanKeuze`;
  - minstens twee inkomende links;
  - "Cijfers bijgewerkt op";
  - `gewijzigd`.
- [ ] Alle controles uit fase 9 slagen.
- [ ] De bouwvolgorde is bijgewerkt, de GSC-lijst staat klaar en de commits staan erop.

---
