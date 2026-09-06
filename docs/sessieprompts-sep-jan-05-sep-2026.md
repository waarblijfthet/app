# Sessieprompts september 2026 tot januari 2027

Eén sessie is één nieuwe taak in de Claude-app met de map gekoppeld en Chrome aan. Kies het model vóór het eerste bericht. Plak het prompt letterlijk. Na elke sessie: `git push`. Wijk je af van de volgorde, schrijf dat in `docs/bouwvolgorde.md`.

Sessie 1 is de enige sessie waarin je het volledige uitvoeringsprompt plakt. Daarna leest elke sessie CLAUDE.md, het plan en het bouwvolgorde-document zelf.

---

## Week 1 (8 tot 14 sep). Doel: nulmeting, funnel meetbaar, Z2 live vóór Prinsjesdag

**Sessie 1, Opus.** Plak eerst de volledige inhoud van `docs/uitvoeringsprompt-opus-seo-100-geldscans-05-sep-2026.md` onder de streep, en daaronder:

> Fase 0, sessie 1. Deliverable: `docs/gsc-nulmeting-<datum>.md`. Haal via Chrome uit Google Search Console de laatste 90 dagen per URL (klikken, vertoningen, CTR, positie). Maak drie lijsten: URL's met meer dan 100 vertoningen en minder dan 2 procent CTR; URL's met 2026 in de metaTitel; per primaire zoekterm uit plan sectie 4 welke eigen URL er al op vertoont. Kun je niet bij GSC, zeg dat meteen en ik zet een CSV-export in `data/`. Geen bouwwerk.

**Sessie 2, Opus.**

> Lees CLAUDE.md, het plan en de nulmeting. Fase 0, sessie 2. Deliverable: `docs/serp-cluster-z-<datum>.md` plus `docs/serp-hubs-<datum>.md`. Verifieer met Chrome op google.nl (hl=nl, gl=nl) de primaire zoektermen van cluster Z en van H1 en H2 uit plan sectie 4: wie bezet de SERP, is er een AI-overzicht, wat staat in "Meer om te vragen" en "Mensen zoeken ook naar", staat er een eigen URL. Scoor op de 35-puntsschaal uit `docs/serp-brainstorm-18-aug-2026.md`. Controleer ook de vier casestudy-pagina's met bedachte namen op illustratielabel en SERP-overlap met de echte rapporten; geef één alinea advies, geen actie.

**Sessie 3, Opus.**

> Lees CLAUDE.md, het plan, de nulmeting en de twee SERP-documenten. Fase 1, deliverable: analyse-funnel meetbaar. Bouw per analysestap een event (gestart, stap 1 tot 6, afgerond, e-mail ingevuld, Geldscan geklikt) volgens het PageTracker-patroon met client-side UUID en server-route, RLS via createServiceClient. Toon de trechter per stap in het bestaande Vandaag-dashboard. Migratie in dezelfde deploy, tsc schoon, publieke flow zelf doorlopen. Geen ander werk.

**Sessie 4, Opus.**

> Lees CLAUDE.md, het plan en `docs/serp-cluster-z-<datum>.md`. Fase 3, deliverable: artikel Z2 "Wat verandert er in 2027 aan wat je overhoudt", live vóór 15 september. Bron: CPB-raming van 16 augustus per huishoudtype, met ophaaldatum, gelabeld als raming. Volledig paginapakket uit CLAUDE.md sectie 8C, CTA "reken uit wat dit voor jouw huishouden doet" met situatieparameters, twee inkomende links (is-4000 en goed-salaris-toch-krap), GSC-indiening. Zet in het bouwvolgorde-document een taak: herzien op 16 september met de Prinsjesdag-cijfers.

## Week 2 (15 tot 21 sep). Doel: Z2 herzien, bouwvolgorde definitief, eerste lek dichten

**Sessie 5, Opus (16 sep).**

> Lees CLAUDE.md en het bouwvolgorde-document. Deliverable: Z2 herzien met de definitieve Prinsjesdag-cijfers (Rijksoverheid, Miljoenennota, CPB-doorrekening van 16 september). Vervang elke raming door het definitieve cijfer met bron en datum, update dateModified en de zichtbare bewerkdatum, dien opnieuw in bij GSC.

**Sessie 6, Opus.**

> Lees CLAUDE.md, het plan, de nulmeting en alle SERP-documenten. Fase 0 afronden. Deliverable: `docs/bouwvolgorde.md`, de definitieve lijst van maximaal 30 pagina's tot 31 januari: per pagina geverifieerde zoekterm, bestaande URL of nieuwe slug, hub, rekenaar, rapport, bronnen, publicatieweek, model (Opus of Sonnet). Twee per week. Neem de vrijdagmeting-regel en de sectie "geparkeerd" op. Verifieer met Chrome alsnog de clusters L, B, S en D die nog niet in een SERP-document staan.

**Sessie 7, Opus.**

> Lees CLAUDE.md en het bouwvolgorde-document. Fase 1, deliverable: het grootste lek in de analyse dichten. Lees eerst zeven dagen stapdata uit het Vandaag-dashboard. Kies de stap met het grootste verlies, formuleer één hypothese (inkomensvraag zonder uitleg, e-mail vóór resultaat, te veel velden op mobiel) en voer één wijziging door. Noteer hypothese, wijziging en meetdatum plus 7 dagen in het bouwvolgorde-document.

**Sessie 8, Opus.**

> Lees CLAUDE.md en het bouwvolgorde-document. Fase 1, deliverable: resultaatscherm. Herbouw `Stap6Resultaat.tsx` volgens CLAUDE.md sectie 5: vergelijking eerst, één primaire knop naar geldscanHref({ token }) met prijs, bewijsregel uit lib/rapporten-data.ts, daaronder de toestemmingsvraag voor de data-asset als één opt-in-zin, opgeslagen via server-route. Migratie in dezelfde deploy.

Killpunt 19 sep: is de analyse-afronding nog 0 procent, dan gaan sessie 9 tot 12 alleen naar het lek, geen content.

## Week 3 en 4 (22 sep tot 5 okt). Doel: cluster Z aanvullen, probleemtaal consolideren, CTR-ronde 1

**Sessie 9, Opus.**

> Lees CLAUDE.md en het bouwvolgorde-document. Fase 3, deliverable: Z1 "Zorgpremie 2027: wat betaalt jouw huishouden meer". Bronnen met datum: Zorginstituut of VWS-raming, Zorgwijzer alleen als secundaire bron. Per huishoudtype doorgerekend, gelabeld als raming tot de premies half november definitief zijn; herzieningstaak in het bouwvolgorde-document. Volledig paginapakket.

**Sessie 10, Opus.**

> Lees CLAUDE.md en het bouwvolgorde-document. Fase 3, deliverable: Z3 "Kinderopvangtoeslag 2027: wat betaal je zelf". Bron: internetconsultatie Besluit kinderopvangtoeslag 2027 en Rijksoverheid, met datum. Rekenvoorbeeld twee kinderen bij 6.000 en 8.000 netto, geen uurtarief-rekenaar, wel de situatiekiezer. Link vanuit tweede-inkomen-loont-niet-tweeverdieners en bso-kosten-artikel.

**Sessie 11, Opus.**

> Lees CLAUDE.md, het bouwvolgorde-document en de nulmeting. Fase 2, deliverable: cluster P consolideren. Bepaal met GSC-data welke van de zes probleemtaal-URL's klikken hebben. Herschrijf goed-salaris-toch-krap tot pijler met het volledige paginapakket en links naar alle hubs (die er straks komen: gebruik de slugs uit het bouwvolgorde-document). Geef de andere vijf een eigen zoekterm of een 301 in next.config.mjs; oude URL's uit de sitemap, interne links omgezet in dezelfde commit. Leg per URL de keuze vast.

**Sessie 12, Sonnet.**

> Lees CLAUDE.md, het bouwvolgorde-document en de nulmeting. Fase 2, deliverable: CTR-ronde 1. Voor elke URL met meer dan 100 vertoningen en minder dan 2 procent CTR: nieuwe metaTitel (getal of jaartal vooraan, vraagvorm, geen em dash, maximaal 60 tekens) en nieuw antwoordblok van 40 tot 60 woorden. Oude en nieuwe titel plus meetdatum plus 28 dagen in het bouwvolgorde-document. Ruim em dashes op in elke pagina die je aanraakt.

**Sessie 13, Opus.**

> Lees CLAUDE.md en het bouwvolgorde-document. Fase 3, deliverable: Z4 "Toeslaggrenzen 2027 voor tweeverdieners" (kindgebonden budget, zorgtoeslag, de klif bij net te veel verdienen). Bron Belastingdienst of Rijksoverheid met datum. Volledig paginapakket.

**Sessie 14, Sonnet.**

> Lees CLAUDE.md en het bouwvolgorde-document. Deliverable: S2, bedragensectie in is-4000 uitbreiden met de ontbrekende varianten (4.100, 4.200, 4.300, 4.600) als FAQ's uit berekenVuistregel() en omslagpunt(), nooit hardgetypt. Fix meteen de open feitfouten uit CLAUDE.md sectie 11 die op deze pagina staan.

## Week 5 tot 8 (6 okt tot 2 nov). Doel: hubs en de eerste spaken

**Sessie 15, Opus.**

> Lees CLAUDE.md en het bouwvolgorde-document. Fase 4, deliverable: H1 "Tweeverdieners met kinderen: wat geeft een gezin uit per maand". Begrotingstabel per post naast het rapport tweeverdieners-drie-kinderen (nooit gemiddeld), analyse-CTA met situatieparameters na de tabel, links naar alle spaken van dit huishoudtype, inkomende links vanuit is-4000, het boodschappenartikel en de pijler.

**Sessie 16, Opus.**

> Idem voor H2 "Stel zonder kinderen: uitgaven per maand bij 5.000 tot 7.000 netto", rapport stel-zonder-kinderen.

**Sessie 17, Sonnet.**

> Lees CLAUDE.md en het bouwvolgorde-document. Fase 4, deliverable: H3 en H4, upgrade van kosten-levensonderhoud-alleenstaande-2026 en kosten-levensonderhoud-alleenstaande-ouder-2026 tot hubs. Zelfde URL, 2027 in de titel pas vanaf 1 december (zet de taak in de sweep), hubstructuur en links nu.

**Sessie 18, Opus.**

> Lees CLAUDE.md en het bouwvolgorde-document. Fase 5, deliverable: L1 "Leven op je maximale hypotheek: 2.000 of 2.500 per maand, wat blijft er over". Woonlasten totaal, niet alleen de hypotheek. Hub H1 en H2, rapport tweeverdieners-drie-kinderen.

**Sessie 19, Sonnet.**

> Lees CLAUDE.md en het bouwvolgorde-document. Fase 5, deliverable: B1 "Hoeveel spaargeld is normaal op je 30e, 40e, 50e, en hoeveel buffer heeft een gezin nodig". Bron CBS tabel 83834NED (mediaan en gemiddelde) met datum, Nibud-buffer alleen als Jarno het cijfer aanlevert. Volledig paginapakket.

**Sessie 20, Sonnet.**

> Fase 5, deliverable: B2, upgrade van 50-30-20-regel-hoger-inkomen tot "Hoeveel houd je over na je vaste lasten" met de eigen huishoudens als maatstaf tegenover de 50/30/20-SERP van banken.

**Sessie 21, Opus.**

> Fase 5, deliverable: L2 "Eén dag minder werken: wat scheelt het echt bij twee inkomens". Concurrenten rekenen alleen loonbelasting; jij rekent opvang en toeslag mee. Bron Belastingdienst tarieven 2026 met datum. Geen bruto-netto-rekenaar, wel situatiekiezer.

**Sessie 22, Sonnet.**

> Fase 5, deliverable: L3 "Baby op komst: wat verandert er per maand aan je budget". Nibud-kosten alleen via Jarno; Rijksoverheid voor verlofregelingen. Koppelen aan Z3 en L10.

Peiling 1 nov: minder dan 3.000 sessies per maand of minder dan 5 betaalde Geldscans, dan vervallen sessie 23 tot 30 (L en B) en herhaal je het patroon van sessie 9 tot 13 op de resterende Z-onderwerpen en een CTR-ronde.

## Week 9 tot 13 (3 nov tot 7 dec). Doel: tweede batch spaken, CTR-ronde 2, data-asset

**Sessie 23, Sonnet.** CTR-ronde 2, zelfde prompt als sessie 12, plus meting van ronde 1 na 28 dagen.

**Sessie 24, Opus.** Z1 herzien met definitieve zorgpremies (half november), zelfde vorm als sessie 5.

**Sessie 25, Sonnet.** B7 "Netto besteedbaar inkomen gezin met twee kinderen" (CBS).

**Sessie 26, Sonnet.** L7 "Leaseauto van de zaak of eigen auto: netto verschil per maand".

**Sessie 27, Sonnet.** S1 "Is 3.500 netto een goed salaris", brug naar H3.

**Sessie 28, Opus.**

> Lees CLAUDE.md en het bouwvolgorde-document. Fase 6, deliverable: data-asset "Waar blijft het bij [n] huishoudens", alleen als minstens één cel n van 10 haalt (controleer eerst in Supabase). Medianen per uitgavenpost per huishoudtype uit toestemming-gegeven analyses plus rapporten, n per cel, geen cel onder 10, maandelijkse herberekening als job plus step-lus, zichtbare datum, Dataset-schema. Haalt geen cel n van 10, stop dan en rapporteer de stand per cel.

**Sessie 29, Sonnet.** Z6 "Energierekening gezin 2027" (netbeheer en belasting per huishoudtype, CTA op de vergelijking, niet op besparen).

**Sessie 30, Sonnet.** L4 "Tweede kind: wat kost het er echt extra" of L5 "Kind 18", op basis van de SERP-score.

## Week 14 en 15 (8 tot 21 dec). Doel: 2027-sweep en de loonstrookpagina

**Sessie 31, Sonnet (8 dec).**

> Lees CLAUDE.md en het bouwvolgorde-document. Deliverable: 2027-sweep deel 1. Neem de lijst URL's met 2026 in metaTitel uit de nulmeting, werk per URL de cijfers bij met bron en datum, zet 2027 in de titel waar de zoeker dat typt, nieuwe dateModified en zichtbare bewerkdatum, zelfde URL. Doe de eerste helft van de lijst, noteer welke.

**Sessie 32, Sonnet.** 2027-sweep deel 2, inclusief Z8 (vakantiegeld en bijzonder tarief 2027).

**Sessie 33, Opus (15 dec).**

> Deliverable: Z5 "Je loonstrook van januari 2027: waarom je netto anders is". Schijven, heffingskortingen en premies 2027 van de Belastingdienst met datum. Volledig paginapakket, GSC dezelfde dag. Dit is de pagina die eind januari het meest gezocht wordt.

## Week 16 tot 21 (22 dec tot 31 jan). Doel: CTR-ronde 3, restant, peiling

**Sessie 34, Sonnet.** CTR-ronde 3, plus contentkill: pagina's met minder dan 20 vertoningen per maand na 90 dagen samenvoegen of 301'en.

**Sessie 35 tot 38, Sonnet.** Resterende B- en C-onderwerpen uit het bouwvolgorde-document, op volgorde van GSC-vertoningen op verwante termen.

**Sessie 39, Opus (31 jan).**

> Lees CLAUDE.md, het plan en alle vrijdagmetingen in het bouwvolgorde-document. Deliverable: `docs/peiling-31-jan-2027.md`. Aantal betaalde Geldscans uit zoekverkeer sinds 8 sep, sessies per maand, analyse-afronding, Geldscan-conversie, URL's met klikken, AI-citaties. Toets tegen 100, 50 en 20 uit CLAUDE.md sectie 9 en schrijf het advies voor februari in één pagina. Geen bouwwerk.

---

Vaste regels bij elk prompt: het model leest CLAUDE.md automatisch; jij pusht na elke sessie; elke vrijdag zet je zelf de meetregel in het bouwvolgorde-document (of laat je dat door de sessie van die dag doen met de toevoeging "sluit af met de vrijdagmeting").
