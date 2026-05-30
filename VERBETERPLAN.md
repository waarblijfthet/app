# Verbeterplan waarblijfthet.nl

_Opgesteld 30 mei 2026. Gebaseerd op drie onderzoeken (SEO/keywords, content-audit, funnel/analyse-tool) plus een analyse van de codebase (Next.js 14 App Router, Supabase, Resend, recharts)._

---

## Samenvatting

De site staat er sterk op: scherpe niche-positionering ("goed salaris, toch krap — geen schuldhulp, geen beleggen"), een eerlijke tone of voice, 14 inhoudelijke artikelen, een werkende 6-staps analyse-tool, nette privacy-opzet en grotendeels verifieerbare bronnen (Deloitte, Nibud, Kassa kloppen). De codebase is volwassener dan de live-analyse deed vermoeden: Article- en FAQ-schema zijn al aanwezig, canonicals staan per pagina, en een aantal eerder gesignaleerde bugs (`/blog`-duplicaat, dubbel Duitsland-artikel) is al via 301-redirects opgelost.

De grootste kansen zitten in: (1) een paar technische SEO-bugs, (2) cijfer-consistentie en E-E-A-T in de content, (3) het conversie-scharnier tussen de gratis analyse en de betaalde pakketten, en (4) een paar vertrouwens-/juridische risico's (testimonials).

---

## Wat al gefixt is (codebase)

- 301-redirect `/blog` → `/inzichten` en `/blog/:slug` → `/inzichten/:slug`.
- 301-redirect `/inzichten/boodschappen-duitsland-voordeel` → `/inzichten/vergelijken-boodschappen-nederland-duitsland`.
- Article-schema + FAQ-schema + auteur (Jarno Koopman) op artikelpagina's.
- Per-pagina canonicals; noindex op /admin, /privacy, /aanbod/intake, /resultaat.

## Wat in deze sessie al doorgevoerd is (Fase 1, veilig)

- **Dubbele titel-suffix gefixt**: `/aanbod`, `/inzichten` en `/privacy` toonden "… | Waar blijft het | Waar blijft het". Titels teruggebracht zodat de template de suffix éénmaal toevoegt. Idem voor de metaTitel van "goed-salaris-toch-krap" en het Duitsland-voordeel-artikel.
- **Dode `/blog`-link** in het resultaatscherm vervangen door `/inzichten`.
- **Sitemap opgeschoond**: noindex- en redirect-pagina's (`/admin`, `/aanbod/intake`, `/resultaat`, `/privacy`, `/blog`) uitgesloten in `next-sitemap.config.js` + robots-disallow toegevoegd. _(De sitemap regenereert bij de volgende build/deploy — postbuild draait `next-sitemap`.)_
- _Open: de map `app/blog` kon niet automatisch verwijderd worden (bestandsrechten). Mag handmatig weg; redirects vangen het al af._

---

## Beslissingen die ik van je nodig heb

Deze raken positionering, prijs of juridisch risico — daar wil ik jouw keuze op voordat ik uitvoer:

1. **Primair domein: `waarblijfthet.nl` (apex) of `www.waarblijfthet.nl`?** De canonicals zijn nu inconsistent (homepage/analyse → apex; aanbod/inzichten → www). Ik trek ze gelijk naar jouw keuze, en dan moet de andere variant in Vercel 301-redirecten naar de primaire. _Aanbeveling: apex (`waarblijfthet.nl`), want metadataBase + og-tags gebruiken die al._
2. **Testimonials.** Drie testimonials zijn "gefictionaliseerd" maar tonen concrete euro-resultaten (+€280/mnd etc.). Dat is een vertrouwens- én ACM-risico (oneerlijke handelspraktijk). Opties: (a) echte, geanonimiseerde cases met toestemming, (b) euro-claims weghalen en expliciet "illustratief voorbeeld" labelen, (c) testimonials voorlopig verwijderen. _Aanbeveling: (b) nu, (a) zodra je echte cases hebt._
3. **Analyse-eindstaat.** Toont de tool het rapport nu direct op het scherm, of pas per e-mail? De belofte is "direct inzicht in 5 min". _Aanbeveling: rapport altijd direct on-screen, e-mail optioneel ("stuur me een kopie")._
4. **Waarde-ladder.** Wil je een laagdrempelig tussenproduct tussen gratis en €97 (bijv. uitgebreid PDF-actieplan voor €19–29)? En een tevredenheidsgarantie op €97/€497?

---

## Fase 2 — Conversie & funnel (hoogste impact)

1. **CTA van analyse-resultaat naar betaald pakket.** Op het eindscherm (Stap6Resultaat) een blok dat de gevonden afwijkingen koppelt aan het €97-pakket ("Je laat €X/mnd liggen — zo stuur je bij"). Dit is het ontbrekende scharnier.
2. **Rapport direct on-screen** (zie beslissing 3), e-mail optioneel.
3. **ROI-framing op /aanbod**: €97 afzetten tegen geclaimde besparing ("binnen een maand terugverdiend"); concrete uitkomst per pakket.
4. **Social proof op /aanbod en op het resultaatscherm** (nu alleen op homepage).
5. **Tevredenheidsgarantie** op betaalde pakketten (zie beslissing 4).
6. **Consistente pakketnamen** tussen kaarten ("Zes weken een spiegel voorgehouden") en vergelijkingstabel ("6 Weken").
7. **"Over ons"-pagina** in de hoofdnav: gezicht, naam, KvK, eerlijk antwoord op "gecertificeerd?". Vertrouwensgat dichten (YMYL).

## Fase 3 — Content & E-E-A-T

1. **Cijfer-harmonisatie.** Het Nibud-boodschappenbedrag verschijnt als €553/€627/€655/€755 over artikelen heen; spaarpercentages en Duitsland-besparing wisselen van bron. Eén centrale "cijfer-bron" als single source of truth (uitbreiden op `lib/benchmarks.ts`-stramien) en alle graphics + tekst + FAQ daarop afstemmen.
2. **Bronnen verstevigen.** Forum-polls (n=51), mamablogs, bunq en Linda.nl worden als "gemiddelde"/"onderzoek" gepresenteerd. Vervang door CBS/CPB/Nibud/Belastingdienst-deeplinks of label expliciet als "indicatie uit de praktijk".
3. **`/goed-salaris-toch-krap` tot pijlerartikel** uitbouwen (nu het kortste, zonder FAQ/bronnen) en als hub naar alle clusters linken.
4. **Interne links naar `/aanbod`** toevoegen waar begeleiding logisch is (geldstress-relatie, potjesmethode, spaardoelen) — de funnel stopt nu bij de gratis stap.
5. **Kop-vs-inhoud-mismatches** fixen die snippets schaden (bv. "€76.000" in titel vs "€78.426" in tekst; optelsommen in graphics die niet kloppen met de kernclaim).
6. **Auteurspagina** voor Jarno (achtergrond, methodiek, "hoe wij aan onze cijfers komen") + byline koppelen.

## Fase 4 — SEO & nieuwe content

1. **Hub-and-spoke interne linkstructuur** rond het pijlerartikel.
2. **40–55-woorden snippet-alinea** bovenaan elk artikel (featured-snippet/PAA-kans bij lage domeinautoriteit).
3. **Nieuwe artikelen op merk-eigen, laag-concurrente clusters** (hoogste prioriteit, beste fit):
   - "Waarom houd ik niks over terwijl ik goed verdien?" (cornerstone)
   - "Tweeverdieners en toch krap: hoe kan dat?"
   - "Geldstress ondanks een goed inkomen"
   - "Lifestyle-inflatie: waarom meer verdienen niet meer overhouden betekent"
   - "Werkt de 50/30/20-regel nog bij een hoger inkomen?"
   - "Vergeten abonnementen opsporen" (sluit aan op homepage-voorbeeld)
4. **Cijferartikelen jaarlijks updaten** met "(2026)" in title/H1 en `dateModified` verversen — concurrenten winnen hier puur op recency.
5. **Google Search Console** koppelen en de nieuwe sitemap indienen.

---

## Voorgestelde volgorde

1. **Nu af te ronden (Fase 1):** domeinkeuze doorvoeren in canonicals (na beslissing 1). _Rest van Fase 1 is al gedaan._
2. **Fase 2 (conversie):** grootste omzet-impact, relatief afgebakend.
3. **Fase 3 (content/E-E-A-T):** cijfer-harmonisatie eerst (vertrouwen + SEO).
4. **Fase 4 (nieuwe content/SEO):** doorlopend.

_Disclaimer: dit raakt financiële content (YMYL). E-E-A-T-signalen en correcte, gebronde cijfers zijn hier zwaarwegend voor zowel Google als vertrouwen._
