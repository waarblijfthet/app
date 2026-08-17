# Waar blijft het, projectinstructies

Opgeschoond op 17-aug-2026. Alles wat hier niet meer staat is bewust weg. De volledige oude versie met sessielogboeken staat in `docs/archief-claude-md-17-aug-2026.md`.

## 1. Het enige doel

**Tien betaalde geldscans uit een herhaalbaar kanaal, vóór 30 nov 2026.** Al het andere is uitstel.

Gratis werk mag alleen nog in ruil voor bewijs of een verwijzing, nooit als groeiplan. Standaard is 49 euro.

Begin elke sessie met deze vraag: brengt dit deze week een betalende klant dichterbij? Is het antwoord nee, doe dan verkoopwerk. Mails eruit, follow-ups na, bewijs oogsten. Maximaal een vijfde van de sessietijd naar bouwen of schrijven, en meld aan het eind wat het werd.

Bouw niets nieuws (feature, pagina, adminscherm, automatisering) tenzij een mens er de laatste veertien dagen om vroeg, of het aantoonbaar een verkoopstap blokkeert. Admin, meting en het mailsysteem zijn af.

## 2. Wat er staat (peildatum 17-aug-2026)

- Nederlandse personal-finance site voor mensen die goed verdienen maar toch krap zitten. Geen schuldhulp, geen beleggingsadvies.
- Live: https://www.waarblijfthet.nl. Repo: github.com/waarblijfthet/app.
- 83 artikelen, 7 echte geanonimiseerde klantrapporten op /rapporten, 6 verwijzerspagina's onder /samenwerken (relatietherapeuten, budgetcoaches, financieel-planners, burnout-coaches, boekhouders, accountants-ondernemers).
- Werkend en af: mailketen via Resend, outreach-CRM, prospect-zoeker, automatische follow-ups, afmeldlink, admin met Vandaag-dashboard en bezoekmeting.
- Nul betalende klanten uit koud siteverkeer. De enige klanten kwamen via mensen.
- Jarno is de enige persoon achter het project en heeft een baan ernaast.

## 3. Harde waarheidsregels (nooit van afwijken)

1. **Nooit een klantcase, review, resultaat of referentie verzinnen.** Een illustratie label je meer dan eens als illustratie.
2. **Elk getal over een echte klant komt uit `lib/rapporten-data.ts`**, via `rapportVoorSlug()` en de constanten `AANTAL_ZONDER_LEK` en `AANTAL_ZONDER_VERVOLG`. Nooit uit je geheugen typen, ook niet als Jarno het getal aanlevert. Nooit middelen over huishoudens.
3. **Nooit een markt-, uniciteits- of patroonclaim zonder gecontroleerde bron met datum**, in dezelfde commit. De onjuiste claim "49 euro, uniek in NL" stond negen dagen live. Niet gevonden is niet hetzelfde als niet aanwezig. Geldt ook voor impliciete patroonclaims over een kleine n.
4. **Nooit garanties, beloofde bedragen of geld terug.** Beschrijf wat je doet, niet wat het oplevert.
5. **Bij twijfel: claim weglaten.** De zeven echte rapporten zijn sterker dan elke zin die je erbij verzint.

## 4. Positionering

- Eén persoon, Jarno, leest jouw cijfers en schrijft met de hand een geldrapport. Geen app, geen cursus, geen abonnement, geen AI-rapport.
- Voor de goedverdiener in loondienst die maandelijks krap zit. Dragend: Sandra (tweeverdienergezin) en Niels (alleenstaand of DINK). Zzp alleen via analyse en rapport, niet via coaching. Volledige set: `docs/icp-personas.md`.
- Waarom hier en niet bij een concurrent: het werk ligt vooraf op tafel. Zeven complete klantrapporten openbaar, tarieven erbij.
- Het bewijs dat die claim draagt: bij twee van de zeven was er geen lek, en dat staat er gewoon. Dat is niet na te maken zonder het te leveren.
- Segment, prijs en toon zijn bezet (Budgetbuddy, Goede Geldgewoonten, diverse budgetcoaches met scans van 40 tot 97 euro). Claim daar nooit onderscheid op.
- Positioneer op geleverd werk, nooit op karakter. Eerlijk, transparant en persoonlijk zijn claims. Laat ze weg.
- Wat het NIET is: geen schuldhulp, geen boekhouder, geen beleggings- of hypotheekadvies, geen vergunningplichtig advies, geen bespaartips, geen traject als instap.
- Verwijzers hebben geen categorie voor dit werk. Zet de afbakening dus expliciet in verwijzerscopy.

## 5. Aanbod en prijs

- Gratis analyse vergelijkt, het geldrapport van 49 euro verklaart. Bewaak dat verschil in elke tekst: de analyse vertelt dát je afwijkt, de Geldscan zoekt uit waarom.
- Ladder: gratis analyse → Geldscan 49 euro (route /geldscan, in copy Geldrapport) → adviesgesprek 125 euro → traject 497 euro. De laatste twee blijven tekst op aanvraag, nooit een prijskaart naast het rapport.
- Levering: met de hand geschreven, binnen 2 werkdagen, gegevens daarna verwijderd. De 49 euro wordt verrekend bij een vervolg.
- Prijzen openbaar, nooit btw vermelden (KOR).
- Volgorde nu: aanmelden, betaalverzoek, na betaling analyse invullen. Eerst leveren en dan factureren is een openstaande keuze van Jarno, zet dat niet zelf in copy.
- Aanmeldingen die niet betalen zijn geen prijssignaal maar een vertrouwens- of volgordeprobleem. Prijs mag alleen omhoog, en alleen als de 2 werkdagen in gevaar komen.
- Pakketwijziging mag pas als twaalf rapporten geleverd zijn en minstens vijf klanten uit zichzelf om een vervolg vragen. Dan krijgt dat vervolg een eigen pagina en prijs.
- Nooit veranderen: één ding tegelijk, geen abonnement, geen cursus, geen garantie.

## 6. Copyregels

1. Altijd ik, mij, mijn. Nooit wij, we, ons, behalve in letterlijke klantcitaten en Jarno's eigen gezinsverhalen.
2. Geen em dashes, en nooit een koppelteken als scheidingsteken. Gebruik komma, punt of een nieuwe zin. Geldt overal, ook in hints, labels en mails.
3. Belofte van het rapport: de drie dingen die het meest opvallen, plus wat juist niet uit de toon valt. Valt er niets te repareren, dan staat dat er ook. Nooit "je drie grootste lekken".
4. Noem bij elke vergelijking waarop wel en niet vergeleken wordt, en dat de maatstaf de eigen klanten zijn met een kleine n.
5. Geen diagnose vooraf ("het is een structuurprobleem"), geen jargon, geen bespaartips.
6. Het woord "eerlijk" nooit in outreach-copy. Eerlijkheid toon je.
7. PSOhub en de functie CTO nooit noemen. Bio-zin: "Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte."
8. Toon: nuchter, direct, geen verkooppraat. Fonts Fraunces (kop) en Plus Jakarta Sans (body). Kleuren #1C3A2A groen, #C4603A terracotta, #F5F0E8 en #FDFAF4 creme. De homepage draait op een eigen wijnrood/goud palet (#7B2D3E), dat is bewust en geldt alleen daar.

## 7. Groei: kanaalvolgorde

Sla nooit een hoger kanaal over.

1. **Verwijzers** (hoofdkanaal). 2. **Mensen die Jarno persoonlijk kent.** 3. **Conversie op bestaande pagina's.** 4. **SEO.**

Dicht tot na 30 nov: media, werkgevers, publiek LinkedIn, betaalde advertenties. Betaalde schaal vervuilt het signaal dat je nu juist zoekt.

**Verwijzers, concreet:**

- Uitlegbaarheidstoets: geen verwijzersmail of /samenwerken-pagina live voordat één echte verwijzer de dienst in eigen woorden in één zin kan navertellen, zonder de woorden boekhouder, adviseur of coach. Ruim de helft van de verwijzingen sneuvelt precies daar (Hinge Research Institute, `docs/onderzoek-leadgen-model-14-aug-2026.md`).
- Vraag altijd expliciet. Elke mail, pagina en gesprek eindigt met één concrete micro-vraag ("mag ik mensen naar je doorverwijzen", "heb je nu iemand in gedachten"). Zonder vraag geen verwijzing.
- Vraagritueel: elke verwijzer die ooit positief of neutraal reageerde krijgt elke 6 weken één kort bericht met één concreet ding (een nieuw rapport, een uitkomst) plus dezelfde vraag. Als terugkerende taak in de CRM.
- Volume: 25 mail-1's per dag, `OUTREACH_DAGBUDGET` in de env. De rem van 10 per week uit juli is vervallen, die was gebaseerd op nul verstuurde v5-mails. Kanaalkill: 30 mails in een beroepsgroep met minder dan 10 procent antwoord, dan die groep sluiten na hoogstens één herschrijfronde.
- Verkoop met wat er staat. Noem /rapporten en de twee scans zonder lek in elke mail en elk gesprek. Geen nieuwe bewijsvorm bedenken zolang die zeven niet overal genoemd worden.

**Outreach-copyregels (getoetst, niet opnieuw uitvinden):**

- Mail 1 is zelf de doorverwijzing, micro-vraag, geen link. Mail 2 (dag 3 tot 4): geven plus vakvraag, hier valt het antwoord. Mail 3 (dag 8 tot 9): breakup, cadeau of open kaart over het eigen belang.
- Nooit hun vak of hun klant claimen. Nooit verifieerbaarheid verzinnen. Klein maken is geloofwaardig.
- Eerste contact altijd per mail, geen bel-uitnodigingen, geen telefoonnummer in de handtekening.
- Voornaam in de onderwerpregel alleen als `naamIsBetrouwbaar` waar is, anders de naamloze variant met "Goedendag,".
- Teksten staan in `lib/outreach/mails.ts` en zijn bewerkbaar op /admin/mailsjablonen. Elke verzending gaat eerst door de preview-modal.
- Onder elke mail staat een afmeldlink op `outreach_contacts.id`, met bevestigknop (POST, nooit GET, want link-scanners) plus List-Unsubscribe. Samenhang in `lib/outreach/afmelden.ts`.

**Bewijs oogsten (dit is groeiwerk, geen administratie):**

Een geleverde scan is pas af bij drie dingen: schriftelijke toestemming, één citaat in de eigen woorden van de klant, en een nameting over 6 weken. Vraag vóór levering wat de klant zelf denkt dat eruit komt, want dat is achteraf niet te reconstrueren. Format: `docs/aanleverformat-voorbeeldrapporten-30-jul-2026.md`.

## 8. SEO en content opschalen

SEO is geen vangnet meer. Het is de enige asset die groeit zonder Jarno's tijd, en hij mag opgeschaald worden. Wel als kanaal 4, dus nooit ten koste van verkoopwerk.

1. Verifieer per cluster, niet per artikel. Eén Chrome-sessie op google.nl per cluster, uitkomsten vastleggen in `docs/serp-<cluster>-<datum>.md`. Gebruik de WebSearch-tool hier niet, die staat niet op Nederland en geeft een ander beeld dan de echte SERP.
2. Bouw clusters op **huishouden**, nooit op salarisbedrag. Vijf ingangen: tweeverdieners met kinderen, alleenstaand, alleenstaande ouder, stel zonder kinderen, zzp.
3. Elke nieuwe pagina krijgt een interactief element. Hergebruik `SalarisRekenaar` of `BoodschappenSituatiekiezer` met eigen startwaarden. Geen rekenaar betekent niet publiceren.
4. Zet de CTA na het eigen getal van de lezer, nooit boven het antwoord. Nul van vier persona's kiest de CTA vóór het antwoord en drie vertrekken dan.
5. Geef elke CTA de situatieparameters `/geldscan?situatie=&inkomen=&boodschappen=`. De 83 bestaande artikelen omzetten in blokken van tien per sessie tot alles om is. Dit is de goedkoopste openstaande conversiewinst die er ligt.
6. Link elk nieuw artikel in dezelfde deploy vanaf minstens twee bestaande pagina's, waaronder is-4000 (staat organisch op plek 1) bij alles over inkomen. Zonder inkomende link geldt het als niet gepubliceerd.
7. Koppel elk artikel aan minstens één echt rapport, met bedrag en link.
8. Ververs voor je uitbreidt. Haal maandelijks elke URL uit GSC met meer dan 100 impressies en minder dan 2 procent CTR, en herschrijf metaTitel en het antwoordblok.
9. Verplicht per artikel: antwoord binnen het eerste scherm, interactief element, vijf FAQ's met schema, drie bronnen met ophaaldatum, twee interne links, één CTA met situatieparameter.
10. Dien elke nieuwe URL dezelfde dag handmatig in GSC in. De eigen submit-tool is IndexNow en bereikt alleen Bing en Yandex.
11. Meet op klikken en instap, niet op impressies. SEO werkt als het aantal URL's met minstens één klik per week stijgt, en er maandelijks drie of meer geldscan-aanvragen uit organisch verkeer komen.

**Kanaalrealisme.** Dienst-keywords zoals "financieel coach" zijn bezet door vacatures, opleidingen en het gemeentecircuit, niet in investeren. Salarisbedragen onder 4.000 euro trekken loonvragers, geen kopers. AI-verwijzingen zijn 0,1 tot 0,5 procent van alle sitebezoeken, dus llms.txt is bijvangst en geen kanaal. Geen betaalde SEO-tools, SE Ranking is definitief van tafel.

## 9. Meetpunten en kill criteria

- Elke vrijdag, tien minuten met de hand: verstuurde mails, antwoorden, verwijsgesprekken, aanmeldingen, betaalde scans. Geen nieuw dashboard bouwen.
- Test wekelijks één ding dat geld raakt (betaalmoment, prijs, doorlooptijd, aantal aanmeldstappen). Eén tegelijk, uitkomst in één regel. Zet het betaalverzoek om naar een betaallink zodra twee aanmeldingen niet betalen.
- **Peiling 28 sep 2026:** minder dan 3 betaalde scans uit verwijzers, dan is dat niet langer het hoofdkanaal en schuif je door naar kanaal 2 en 3.
- **Peiling 30 nov 2026:** minder dan 10 betaalde scans totaal, dan verander je het aanbod of de prijs, niet het kanaal.
- **Bouwkill:** twee sessies achtereen zonder verstuurde mail of geleverd rapport, dan alleen verkoopwerk in de volgende sessie.
- Nul betalende klanten uit koud siteverkeer is nog steeds geen signaal. De site krijgt pas een oordeel boven 1.500 sessies per maand.

## 10. Technische werkregels

1. **Bestanden schrijven of wijzigen altijd via python3 in bash** (heredoc of read plus replace). De Edit- en Write-tools trunceren bestanden stilzwijgend op dit NTFS-mount, ook bij kleine wijzigingen. Controleer met `wc -l`.
2. Na elke codewijziging moet `npx tsc --noEmit --incremental false` schoon zijn. Check ook op null bytes.
3. **Een migratie die de code nodig heeft, hoort in dezelfde deploy als die code.** Laat nooit een verzendende of opslaande functie afhangen van een SQL-bestand dat iemand met de hand moet draaien. Kan dat niet, bouw dan een fallback die niet stil is. Zo lag /geldscan drie weken stil.
4. Draai bij elke sessie waarin een SQL-bestand is toegevoegd de diagnosequery die per bestand in `supabase/` teruggeeft of het is toegepast, en loop daarna zelf het publieke formulier door.
5. **Supabase RLS:** alle server-writes en admin-reads via `createServiceClient()` met `isAdminRequest()` als poortwachter. Publieke formulieren altijd via server-routes, nooit via de browser-anon-client.
6. **`.insert(...).select()` vraagt stilzwijgend om een SELECT-policy.** Zonder die policy faalt de hele insert (42501) en wordt niets weggeschreven. Genereer het id client-side met `crypto.randomUUID()` in plaats van RLS te verruimen. Zie `components/PageTracker.tsx`.
7. **MX mag nooit naar de Vercel-apex of een CNAME wijzen.** MX is `10 mail.waarblijfthet.nl`, mail draait op 45.82.188.190, Resend verstuurt alleen. Postbus hallo@waarblijfthet.nl.
8. Vercel: lange klussen als job plus step-lus (ongeveer 20s per call, `maxDuration=60`), geen externe queue nodig.
9. **De header is `sticky`, niet `fixed`,** en neemt dus zelf ruimte in. Pagina's hebben geen compensatie-padding meer. Voer je ooit weer een overlay-header in, dan moet die padding terug op alle 22 pagina's.
10. **Nieuw artikel:** entry vooraan in `lib/inzichten-data.ts` (optioneel `cta`-veld), content-component in `app/inzichten/[slug]/content/`, import en map in `ArticleBody.tsx`. Sitemap, robots en llms.txt regenereren bij build.
11. **Git:** committen aan het eind van elke sessie met wijzigingen, ongevraagd, en het git-blok in de reactie zetten. Pushen doet alleen Jarno. Blijft de commit hangen op `HEAD.lock` of `index.lock`, dan haalt Jarno die weg en draai je `git commit` direct als eerstvolgende commando, zonder `ls` of `git status` ertussen.

## 11. Openstaande waarheidsschuld (opruimen zodra je in de buurt komt)

- De zin "ik verwijder je afschriften en aangeleverde gegevens" klopt alleen zolang Jarno dat met de hand doet. Er verwijdert niets softwarematig. Dit is de zin die het merk in één keer kan beschadigen.
- `lib/benchmarks.ts` is op 30-jul herijkt op de eigen vijf huishoudens en heeft per getal een herkomst met n. `VRIJ_PCT` is het enige normatieve getal dat daar niet uit af te leiden is.
- `lib/inzichten-data.ts` en de artikelbestanden bevatten nog honderden em dashes in metaTitel, metaDescription en bronlabels, in strijd met copyregel 2. Ruim ze op per artikel dat je toch aanraakt.
- Het woord "structuurprobleem" staat nog in twee artikelen en vier FAQ-antwoorden.

## 12. Waar de onderbouwing staat

Raadpleeg deze alleen als je de reden achter een besluit nodig hebt. Ze zijn geen werkvoorraad.

- `docs/groeibeslissing-aug-2026.md` (26-jul): de rekensommen in hele klanten, waarom vertrouwen de bindende beperking is, en in sectie 8a elf aangeleverde onderzoekscijfers die niet klopten. Raadplegen vóór elke groei- of kanaaldiscussie.
- `docs/onderzoek-leadgen-model-14-aug-2026.md` (14-aug): extern onderzoek dat het verwijsmodel bevestigt, met de uitlegbaarheidscijfers.
- `docs/icp-personas.md`: de zeven ICP-profielen. Bij elke ICP-toets alle profielen langslopen.
- `docs/outreach-strategie-jul-2026.md` en `docs/skill-verwijzer-personas.md`: outreach-onderbouwing en de toetsingspersona's.
- `docs/aanleverformat-voorbeeldrapporten-30-jul-2026.md` en `docs/vragenlijst-geldrapport-30-jul-2026.md`: wat je per klant ophaalt.
- `docs/archief-claude-md-17-aug-2026.md` en `docs/archief-claude-md-tm-19-jul-2026.md`: alle sessielogboeken, voor als je wilt weten waarom iets ooit zo is besloten.
