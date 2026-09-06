# Bouwvolgorde, waar blijft het

Levend document, bijgewerkt na elke sessie. Basis: `docs/plan-seo-conversie-100-geldscans-05-sep-2026.md` en `docs/gsc-nulmeting-05-sep-2026.md`.

## BEGIN HIER

Laatst bijgewerkt: 6 september 2026. Alles hieronder is gecommit en gepusht tot en met `4141175`.

**Stand van zaken.** Fase 0 is af (nulmeting, SERP-verificatie cluster Z, bouwvolgorde). Fase 1 punt 1 en 3 staan live, dus contentbouw mag lopen. Fase 2 CTR-ronde 1 is uitgevoerd. Uit cluster Z staat Z4 gepubliceerd. De pijler van cluster P is verlegd en herschreven.

**De eerstvolgende actie is: H1 bouwen, de hub voor tweeverdieners met kinderen.**

Dat gaat in deze volgorde:

1. SERP-verificatie in Chrome op google.nl (`hl=nl`, `gl=nl`) voor de H-termen uit plan sectie 4, want die staan in geen enkel SERP-document. Minimaal: "wat geeft een gezin uit per maand", "gezinsbudget 6000 netto", "uitgaven gezin 2 kinderen per maand". Vastleggen in `docs/serp-hubs-<datum>.md` en scoren op de 35-puntsschaal uit `docs/serp-brainstorm-18-aug-2026.md`.
2. H1 bouwen met het volledige pakket uit CLAUDE.md sectie 8 punt 8 tot 16. Hergebruik `components/artikel/GezinsbudgetTabel.tsx`, dat de twee echte huishoudens al post voor post naast elkaar zet uit `rapportVoorSlug()`.
3. Inkomende links in dezelfde deploy vanuit is-4000, het boodschappenartikel en `samen-6000-euro-netto-toch-niets-over`. Die laatste is de pijler van cluster P en wacht op een link naar H1.
4. Daarna pas beslissen wat er met `goed-salaris-toch-krap` gebeurt (nul vertoningen, staat nog).

**Wat er buiten die actie op een datum wacht:**

| Wanneer | Wat |
|---|---|
| 13 september | Schermlijst lezen in het funneltabblad, één wijziging op het scherm bovenaan. Zeven dagen na de migratie. |
| 16 september | De vier geraamde constanten in `lib/kindgebonden-budget.ts` vervangen door de definitieve Prinsjesdagcijfers. Alleen dat bestand, tabel en rekenaar volgen vanzelf. |
| 19 september | Killgrens: is de analyse-afronding nog nul procent, dan stopt alle contentbouw tot het lek gevonden is. |
| 4 oktober | CTR-ronde 1 meten, de vijf URL's uit sectie 1 van dit document. |
| 12 november | Z1 zorgpremie 2027 bouwen, als de premies bekend zijn. |
| 8 december | 2027-sweep over 25 metaTitels. |

**Openstaand aan Jarno's kant:** Bing Webmaster Tools aanzetten en de sitemap indienen, en de URL van Z4 handmatig indienen in GSC.

**Bekende schuld:** de anon-rol mag `quiz_voortgang` nog lezen omdat het funneltabblad met de browserclient leest. Eerst die lezing naar een server-route, dan pas select intrekken. Staat als waarschuwing in `supabase/quiz_voortgang_v3.sql`.

**Alles daaronder is het logboek, oudste sectie eerst. Lees dat alleen als je wilt weten waarom iets zo besloten is.**

**Werkwijze voor dit bestand:** het houdt zijn naam, `docs/bouwvolgorde.md`. Werk na elke sessie het blok BEGIN HIER bij (stand, eerstvolgende actie, datumtabel) en zet je logboeksectie eronder aan het eind met de datum in de kop. Maak geen nieuw bestand met een datum in de naam: dan weet een volgende sessie niet meer welk bestand geldt.

---

## 1. CTR-ronde 1, uitgevoerd 6 september 2026

Fase 2 punt 2. Alleen de vijf URL's met meer dan 100 vertoningen, minder dan 2 procent CTR en gemiddelde positie 10 of beter, plus het boodschappenartikel op 11,58 vanwege zijn omvang. De elf URL's uit lijst A2 en A3 van de nulmeting krijgen geen nieuwe titel: op positie 24 tot 86 ziet niemand hem staan.

**Meetdatum: 4 oktober 2026.** Dan opnieuw dezelfde vijf URL's in GSC, laatste 28 dagen, en de nieuwe CTR naast de oude in de tabel hieronder zetten.

| URL | Vertoningen | CTR 5 sep | Positie | Oude metaTitel | Nieuwe metaTitel | CTR 4 okt |
|---|---:|---:|---:|---|---|---|
| `wat-is-normaal-bedrag-boodschappen-per-maand` | 10932 | 1,59% | 11,58 | Normale boodschappenkosten per maand 2026 (per huishouden) | €300 tot €1.400 boodschappen per maand: normaal in 2026? | |
| `netto-loonsverhoging-berekenen` | 2844 | 0,88% | 8,96 | Netto overhouden van loonsverhoging berekenen (2026) | 3% loonsverhoging: hoeveel houd je er netto van over? (2026) | |
| `kosten-levensonderhoud-alleenstaande-2026` | 2445 | 1,84% | 9,74 | Kosten levensonderhoud alleenstaande 2026: overzicht | €2.000 tot €2.400: kosten levensonderhoud alleenstaande 2026 | |
| `nibud-boodschappen-versus-werkelijkheid` | 1388 | 0,79% | 8,51 | Nibud boodschappenbudget 2026: norm versus werkelijkheid | €627 Nibud boodschappengeld gezin: haalbaar in 2026? | |
| `vrij-besteedbaar-inkomen-berekenen` | 128 | 0,78% | 8,45 | Vrij besteedbaar inkomen berekenen (rekenhulp 2026) | Vrij besteedbaar inkomen berekenen: wat blijft er over? 2026 | |

Waarom deze vorm. Vier van de vijf beginnen nu met een bedrag dat al op de pagina zelf staat en daar een bron heeft, want de zoeker wil het getal en niet het onderwerp. Alle vijf blijven onder de 60 tekens, geen em dash, jaartal erin. De vijfde, vrij besteedbaar inkomen, heeft geen enkel getal dat voor elk huishouden klopt, dus daar is het een vraag geworden zonder bedrag.

Herkomst van de bedragen, alle vier al gepubliceerd en met bron op de pagina zelf:

- €300 tot €1.400: de bandbreedte in de tabel van het boodschappenartikel, van alleenstaand tot een gezin met oudere kinderen.
- 3 procent: de zoekterm "hoeveel is 3 procent loonsverhoging netto" in GSC, en het percentage dat het artikel als voorbeeld doorrekent.
- €2.000 tot €2.400: de vaste lasten voor een alleenstaande in 2026 uit de eerste alinea van dat artikel.
- €627: het Nibud-minimum voor een gezin van vier, zoals het artikel het al citeert.

Nog te doen bij deze vijf, niet in deze ronde: het antwoordblok bovenaan controleren tegen de nieuwe titel, zodat titel en eerste alinea hetzelfde getal noemen.

## 2. Cluster P en modaal, uitgevoerd 6 september 2026

Jarno akkoord op beide op 6 september. Twee 301's in `next.config.mjs`, met een toelichtende regel erboven zodat over een half jaar duidelijk is waarom ze er staan.

**Cluster P: de pijler is nu `samen-6000-euro-netto-toch-niets-over`.** Dat is de enige van de zes die presteert: 7,34 procent CTR op positie 4,43. `goed-salaris-toch-krap`, die het plan aanwees, heeft nul vertoningen in 90 dagen.

| URL | Klikken | Vertoningen | CTR | Positie | Gedaan |
|---|---:|---:|---:|---:|---|
| `samen-6000-euro-netto-toch-niets-over` | 8 | 109 | 7,34% | 4,43 | pijler; herschrijving naar het gezinsbudget-format staat nog open |
| `waarom-hou-ik-nooit-geld-over` | 4 | 188 | 2,13% | 22,31 | blijft, is nu het doel van de 301 |
| `goed-salaris-toch-geldstress` | 3 | 49 | 6,12% | 15,69 | blijft, geen 301 |
| `tweeverdieners-toch-krap` | 2 | 58 | 3,45% | 14,07 | blijft, richt op twee inkomens, linkt naar H1 |
| `waar-blijft-mijn-geld-einde-maand` | 0 | 15 | 0% | 57,47 | 301 naar `waarom-hou-ik-nooit-geld-over` |
| `goed-salaris-toch-krap` | 0 | 0 | | | blijft staan, bestemming pas beslissen bij de pijlerherschrijving |

Het doel van die 301 is niet de pijler geworden maar `waarom-hou-ik-nooit-geld-over`, en dat is bewust. De vraag "waar blijft mijn geld aan het einde van de maand" is huishoudneutraal, terwijl de pijler een gezin met 6.000 netto beschrijft. Een 301 naar de pijler zou een generieke vraag op een specifiek huishouden laten landen. `waarom-hou-ik-nooit-geld-over` staat op dezelfde vraag, heeft 188 vertoningen en is dus de juiste bestemming.

**Modaal: `modaal-inkomen-2026` is 301'd naar is-4000.** Nul vertoningen in 90 dagen terwijl is-4000 (215) en is-5000 (120) de modaaltermen op positie 2,2 bezetten.

Meegegaan in dezelfde deploy, want een interne link naar een redirect is verspilde linkwaarde:

- 4 interne links naar `waar-blijft-mijn-geld-einde-maand` wijzen nu naar `waarom-hou-ik-nooit-geld-over`: in `alleen-wonen-goed-salaris-toch-krap`, `goed-salaris-toch-krap`, `lifestyle-inflatie-meer-verdienen-meer-uitgeven` en `moet-je-een-huishoudboekje-bijhouden`.
- 2 interne links naar `modaal-inkomen-2026` wijzen nu naar is-4000: in `bruto-naar-netto-loonstrook-uitleg` en `hoeveel-geld-overhouden-einde-maand`.
- Beide artikelen zijn uit `lib/inzichten-data.ts` en uit de componentmap in `ArticleBody.tsx` gehaald, en hun contentbestanden zijn verwijderd. Van 90 naar 88 artikelen. Sitemap en llms.txt worden bij de build opnieuw gegenereerd.

**Nog niet gedaan: het modaalantwoord als FAQ in is-4000.** De oude modaalpagina noemde €48.000 bruto per jaar en €2.700 tot €3.100 netto per maand zonder één bronvermelding. Die getallen verhuizen niet ongecontroleerd naar de sterkste pagina van de site. Die FAQ komt er zodra het modaalcijfer voor 2026 met een CPB- of CBS-bron en ophaaldatum vaststaat, en dat kan meteen 2027 worden na Prinsjesdag.

**Twee dingen om over vier weken te controleren in GSC**, samen met de CTR-ronde op 4 oktober: of is-4000 de modaalvertoningen vasthoudt of dat ze wegvallen, en of `waarom-hou-ik-nooit-geld-over` iets van de 15 vertoningen overneemt.

## 3. Besluiten uit de nulmeting die de volgorde veranderen

| Onderwerp | Plan van 5 sep | Na de meting | Bespaart |
|---|---|---|---|
| S1 is-3500 | eigen pagina, prio B | vervalt, gaat met S2 in één FAQ-blok in is-4000 | 1 sessie |
| Z8 vakantiegeld | cijferrefresh in januari | vervalt, de pagina staat op positie 86 | 1 sessie |
| B2 vaste lasten | upgrade van `50-30-20-regel-hoger-inkomen` (84 vertoningen, positie 68,9) | herschrijf `vaste-lasten-overzicht-maken` (489 vertoningen op de term, positie 53,6) | betere kandidaat |
| modaal | staat niet in het plan | 301 naar is-4000, uitgevoerd 6 sep | een pagina minder |
| CTR-ronde | elke URL boven 100 vertoningen onder 2 procent | alleen die met positie 10 of beter, dat zijn er 5 van de 16 | 11 URL's minder werk per ronde |
| 2027-sweep | 17 metaTitels | 25 metaTitels | meer werk, plan erop |

## 4. Cluster Z na SERP-verificatie, 6 september 2026

Volledig in `docs/serp-cluster-z-06-sep-2026.md`. Chrome op google.nl, vijf termen geverifieerd, gescoord op de schaal uit `docs/serp-brainstorm-18-aug-2026.md`. Geen van de vijf had een AI-overzicht en op geen van de vijf staat een eigen URL.

| # | Zoekterm | Score | Plan | Na SERP | Publiceren |
|---|---|---:|---|---|---|
| Z4 | kindgebonden budget 2027 inkomensgrens | 30,5 | A | A, eerst | kan nu, mits de €60.000-grens naar prijspeil 2027 vaststaat |
| Z1 | zorgpremie 2027 | 26,5 | A | A | als raming, herzien 16 sep en na 12 nov |
| Z3 | kinderopvangtoeslag 2027 | 26 | A | A | zodra de maximum uurtarieven 2027 bekend zijn |
| Z2 | koopkracht 2027 | 21 | A | B | niet als eerste, en niet op deze term |
| Z2b | wat houd ik over in 2027 | 8 | niet in plan | vervalt | nooit, de SERP is zonnepanelen |

**Z4 wordt de eerste Z-pagina.** Het kabinet verlaagt vanaf 1 januari 2027 het kindgebonden budget voor huishoudens boven €60.000 door het afbouwpercentage te verhogen (Rijksoverheid, Tweede Kamer, wetgevingskalender). Dat raakt de ICP gericht en niemand anders. De hele SERP is instituut: Rijksoverheid legt de maatregel uit, de Belastingdienst de rekenregel, het wetsvoorstel de wetstekst. Niemand rekent het voor een huishouden uit.

**Z2 zakt.** De PAA bij "koopkracht 2027" is macro-economisch (crisis, vooruitzichten) en de SERP is nieuws tot en met NOS, BNR en TikTok. Dat is een andere zoeker dan die de analyse invult. De CPB-cijfers blijven bruikbaar als alinea met bron in Z4 en Z1: koopkracht +0,6% in 2026, min 0,3% in 2027, inflatie circa 3%, cao-loongroei 4,2%.

**Twee feitelijke waarschuwingen.**

Het plan noemt bij Z1 "eigen risico 165". Dat komt in de SERP nergens voor. Menzis noemt €385 voor 2027, het wetsvoorstel spreekt van €60 verhoging, de PAA vraagt naar €520, en Welingelichte Kringen kopt dat de verhoging een jaar is uitgesteld. Dit cijfer is op 6 september niet vast te stellen en gaat niet in een publicatie tot dat wel kan. De premies zijn 12 november bekend (CZ).

Bij Z3: de afschaffing van de kinderopvangtoeslag en directe financiering aan de opvang gaat om **2029**, niet 2027. In 2027 gaat alleen het vergoedingspercentage naar 96 procent voor het eerste kind, ook voor ouders die daar nu geen recht op hebben. Wie die twee door elkaar haalt schrijft een fout artikel.

## 5. Z4 gepubliceerd, 6 september 2026

`/inzichten/kindgebonden-budget-2027-inkomensgrens`. Eerste pagina van cluster Z, negen dagen vóór Prinsjesdag.

metaTitel: "2027: vanaf welk inkomen daalt je kindgebonden budget?" (53 tekens).

**Wat de pagina zegt, doorgerekend en niet getypt.** Alle bedragen komen uit `lib/kindgebonden-budget.ts`, dat de tabel én de rekenaar voedt zodat ze niet uit elkaar kunnen lopen. Voor een stel met twee kinderen onder de 12:

| Gezamenlijk inkomen | KGB 2026 p/m | KGB 2027 p/m | Wat de maatregel kost p/m |
|---|---:|---:|---:|
| €65.000 | €266 | €277 | niets |
| €75.000 | €203 | €176 | €34 |
| €85.000 | €140 | €73 | €70 |
| €90.000 | €108 | €22 | €88 |

Het nulpunt schuift van ongeveer €106.300 naar €92.100, dus ruim €14.000 eerder.

**Wat vaststaat en wat een raming is.** Vast, uit het wetsvoorstel: het tweede afbouwpunt bij €60.000 prijspeil 2024, en het afbouwpercentage van 12,35 procent in 2027 en 12,80 procent in 2028, een verhoging van 4,30 procentpunt. Daaruit volgt het basispercentage van 8,05 procent. Geraamd: de indexatie van de grens naar circa €65.560 in 2027 en de maximumbedragen, allebei de 2026-bedragen plus 3 procent per jaar in lijn met de CPB-inflatieraming. De raming staat als één regel onder de kop en als vermelding onder de tabel, niet als disclaimer door de hele tekst.

**Verplicht pakket afgevinkt:** antwoord met bedragen in de eerste alinea, tabel per inkomen, rekenaar met huishouden, kinderen en inkomen, vijf FAQ's, vier bronnen met ophaaldatum, analyse-CTA met situatieparameter na het eigen getal, Geldscan als enkele tekstlink in het slotblok, zichtbare regel "Cijfers bijgewerkt op 6 september 2026", twee inkomende links in dezelfde deploy vanuit is-4000 en `samen-te-veel-verdiend-toeslag-kwijt`.

**Na de push, twee dingen voor jou.** URL handmatig indienen in GSC. En op 16 september, of zodra de Prinsjesdagcijfers er zijn, de vier geraamde constanten in `lib/kindgebonden-budget.ts` vervangen. Alleen dat bestand, de tabel en de rekenaar volgen vanzelf.

## 6. S1 en S2 bleken al gebouwd

Voordat ik aan het FAQ-blok begon heb ik gekeken wat er al stond. `components/artikel/SalarisBedragenTabel.tsx` heeft `BEDRAGEN = [3500, 3750, 4000, 4100, 4200, 4300, 4500, 4600]` en `VARIANTEN` met een eigen kop per bedrag, allemaal gevoed uit `berekenVuistregel()` en `omslagpunt()`. En `lib/inzichten-data.ts` heeft voor is-4000 al negen FAQ's, waaronder er een over €4.500, een over €3.500 en een die €4.000, €4.200 en €4.300 vergelijkt.

Elk bedrag met vertoningen in GSC is dus gedekt: 4.500 (80), 4.200 (50), 4.300 (36), 4.100 (11), 4.600 (3) en 3.500 (17). S1 en S2 vervallen daarmee als aparte klus. Er staat zelfs al een FAQ over Jan Modaal op is-4000, wat betekent dat de 301 van de modaalpagina landt op een pagina die de vraag al beantwoordt.

Wat resteert is klein en niet urgent: 4.100 en 4.600 hebben geen eigen FAQ, samen 14 vertoningen. Dat is te weinig om een sessie aan te geven. Meelifen op de eerstvolgende deploy die is-4000 toch aanraakt.

## 7. Fase 1 punt 1 gebouwd, 6 september 2026

De aanleiding was een defect dat ik pas zag bij het bouwen: **de analyse gebruikte een andere sessie-id dan de rest van de site.** `PageTracker` en `lib/track.ts` lazen allebei `wb_sessie` uit sessionStorage, maar `QuizClient` maakte zijn eigen UUID. Daardoor stonden paginabezoeken, CTA-kliks en analysevoortgang in drie tabellen met twee verschillende id's, en was de trechter niet aan elkaar te rekenen. Precies de vraag uit plan sectie 6 punt 1, hoeveel van de bezoekers op /analyse ook echt begonnen, afrondden en daarna op de Geldscan klikten, was daarmee onbeantwoordbaar. Dat verklaart ook waarom het funneltabblad zelf zegt dat de stap-percentages indicatief zijn en niet sessie-gekoppeld.

Wat er nu staat:

1. **`lib/sessie.ts`** is de enige plek waar `wb_sessie`, het apparaat en de eigenaarscookie vandaan komen. `PageTracker`, `lib/track.ts` en `QuizClient` gebruiken hem alle drie. Bijeffect: de analyse classificeerde mobiel op een breedte onder 1024 en de rest op onder 768. Dat is nu overal 768, dus de apparaatcijfers van vóór en ná vandaag zijn niet één op één vergelijkbaar.
2. **Meten per scherm.** `logVoortgang()` krijgt het scherm-id en de positie mee en schrijft bij elke schermwissel in plaats van bij elke categoriewissel. Hooguit 29 upserts per sessie in plaats van 6.
3. **Server-route `POST /api/analyse-voortgang`** met `createServiceClient()` en een witte lijst met velden, aangeroepen met `keepalive` zodat een laatste schrijfactie ook vertrekt als de bezoeker meteen wegklikt. De browser schrijft niet meer rechtstreeks in `quiz_voortgang`.
4. **Migratie `supabase/quiz_voortgang_v3.sql`**: kolommen `huidig_scherm`, `max_scherm_index` en `toestemming_data_asset`, en de anon-policies voor insert en update ingetrokken.
5. **Funneltabblad** heeft een blok "Waar de analyse afhaakt, per scherm": het laatste scherm van elke niet-voltooide sessie, aflopend gesorteerd. Dat is de lijst waarop de eerste wijziging gekozen wordt.

**Nog open, bewust.** De anon-rol mag `quiz_voortgang` nog steeds lezen, want het funneltabblad leest met de browserclient. Select dichtzetten breekt het dashboard. De juiste volgorde is die lezing eerst naar een server-route verplaatsen, zoals `app/api/admin/vandaag` al doet, en daarna pas select intrekken. Tot dan is de tabel leesbaar met de anon-sleutel uit de bundle. Er staat geen naam of e-mailadres in, wel huishoudbedragen. Dat staat als waarschuwing in de migratie zelf.

**Wat jij moet doen na de push:** `supabase/quiz_voortgang_v3.sql` draaien in de Supabase SQL-editor, in dezelfde deploy als de code. Doe je dat niet, dan faalt elke schrijfactie stil op de ontbrekende kolommen en zie je vanaf dat moment geen voortgang meer.

**Wat er daarna gebeurt.** Vanaf de eerste sessie na de migratie zie je per scherm waar het ophoudt. Zeven dagen data, dan één wijziging op het scherm bovenaan, een week meten, dan het volgende. De hypothesevolgorde uit het plan (inkomensvraag zonder uitleg, e-mail vóór resultaat, te veel velden op mobiel) is vanaf dat moment niet meer nodig als gok.

## 8. Fase 1 punt 3 gebouwd, 6 september 2026

Het resultaatscherm, `app/analyse/stappen/resultaat/Resultaat4Aanbod.tsx`. Hiermee is het laatste blokkerende item vóór contentbouw uit plan sectie 6 klaar.

Drie wijzigingen:

1. **De prijs staat nu in de knop.** Hij stond als los bedrag boven de knop, dus wie alleen de knop las klikte zonder te weten wat het kost. De knop is nu "Laat mij uitzoeken wat hierachter zit, €49".
2. **De bewijsregel staat er,** met `RAPPORTEN.length` en `AANTAL_ZONDER_LEK` uit `lib/rapporten-data.ts`. Vandaag is dat vijf rapporten waarvan twee zonder lek. Nooit met de hand een aantal neerzetten: dit telt de echte rapporten en gaat vanzelf mee als er een zesde bij komt.
3. **De toestemmingsvraag voor de data-asset** staat eronder, als één opt-in-zin in een eigen component, opgeslagen via `/api/analyse-voortgang` in de kolom `toestemming_data_asset`. Lege checkbox, geen vooraf aangevinkt vakje. Daarmee is de kolom die gisteren met de migratie meekwam ook echt gevuld; die stond tot vandaag leeg.

De volgorde op het scherm is nu zoals plan sectie 6 punt 3 hem voorschrijft: eerst de vergelijking in uitkomst 1 tot 3, dan de knop met de prijs, dan de bewijsregel, dan de toestemmingsvraag, en de e-mail blijft secundair als tekstlink die pas na een bewuste klik opengaat.

**Wat dit betekent voor het plan.** Fase 1 punt 1 en punt 3 staan allebei live. De regel "contentbouw begint pas als punt 1 en 3 live staan" is daarmee vervuld, dus vanaf nu mag de bouwvolgorde weer lopen. De killgrens blijft staan: is de afronding op 19 september nog nul procent, dan stopt alles tot het lek gevonden is.

**Wat er nog niet is uit fase 1:** de opvolgmail op dag 0, 3 en 8 (punt 4) en Bing Webmaster Tools plus de schema-audit (punt 5). Punt 4 heeft pas zin als er afgeronde analyses met e-mailadres zijn, dus dat wacht op de eerste week data. Punt 5 kan los en kost een half uur, grotendeels aan jouw kant.

## 9. Pijler cluster P herschreven, 6 september 2026

`samen-6000-euro-netto-toch-niets-over` is nu de pijler van cluster P en tegelijk de brug naar de hub voor tweeverdieners.

**Wat ik bewust niet heb aangeraakt: de metaTitel.** Deze pagina doet 7,34 procent CTR op positie 4,43. De CTR-regel uit CLAUDE.md 8.22 geldt voor URL's onder 2 procent, en dit is de best presterende pagina van de zes uit cluster P. Een pagina die werkt herschrijf je niet omdat het plan het woord pijler gebruikt.

**Wat er wel bij is gekomen:**

1. **De begrotingstabel per post**, via `components/artikel/GezinsbudgetTabel.tsx`. Twee echte huishoudens naast elkaar, 19 posten verdeeld over wat er binnenkomt, de vaste lasten en het dagelijkse plus jaarlijkse. Alle bedragen komen uit `rapportVoorSlug()`, letterlijk zoals de huishoudens ze aanleverden. Dit is het gezinsbudget-format uit `docs/serp-inkomensbedragen-17-aug-2026.md` kans 7, en het is de vorm die volgens dat onderzoek in deze SERP wint.
2. **Geen derde kolom met een gemiddelde.** Dat is de waarheidsregel, en het zou hier ook onzin geven: het ene huishouden heeft drie kinderen en twee auto's, het andere geen kinderen en alleen ov. Dat verschil is juist waarvoor de lezer komt. Waar een post bij de ander niet bestaat staat "niet van toepassing".
3. **De Geldscan als tekstlink in het slotblok.** Die ontbrak volledig op deze pagina, terwijl CLAUDE.md 8.13 hem voorschrijft en dit de best converterende pagina van het cluster is.

**Wat nog open staat voor deze pijler:** de hub voor tweeverdieners met kinderen (H1) bestaat nog niet, dus de link daarheen kan pas als die hub er is. Zodra H1 er staat, linkt deze pagina erheen en H1 terug.

## 10. Volgende sessies

1. **Bing Webmaster Tools aanzetten en de sitemap indienen** (fase 1 punt 5, jouw kant). ChatGPT-zoeken leunt op Bing en daar meten we vandaag niets.
2. **H1 bouwen**: de hub voor tweeverdieners met kinderen. Daarna beslissen wat er met `goed-salaris-toch-krap` gebeurt.
3. **Z1 zorgpremie 2027**: pas na 12 november, als de premies bekend zijn.
4. **Z3 kinderopvangtoeslag 2027**: zodra de maximum uurtarieven 2027 bekend zijn.
5. **Het lek dichten**: rond 13 september de schermlijst lezen en één wijziging doen op het scherm bovenaan.
6. **Admin-lezing van `quiz_voortgang` naar een server-route**, zodat anon select ingetrokken kan worden.
7. **Opvolgmail dag 0, 3 en 8** zodra er afgeronde analyses met e-mailadres zijn.

De killgrens uit plan sectie 9 blijft staan: is de analyse-afronding op 19 september nog nul procent, dan stopt alle contentbouw tot het lek gevonden is. Titelwerk en 301's vallen daar niet onder, die zijn onderhoud.
