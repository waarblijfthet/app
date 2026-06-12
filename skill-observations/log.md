# Skill Observation Log

Observations captured during task-oriented work. Each entry identifies a potential skill improvement or new skill opportunity.

**Status key:** OPEN = not yet actioned | ACTIONED = skill updated/created | DECLINED = user decided not to pursue

---

## 2026-06-11

### Observation 1: RLS-policies `for all using(true)` zonder `to authenticated` lekken via publieke anon key
**Status:** OPEN
**Session context:** Bouw van de prospect-zoeker feature in de waarblijfthet Next.js/Supabase repo. Code-review-subagent vond dat zowel de nieuwe tabellen als de bestaande `outreach_contacts` een RLS-policy `for all using (true)` zonder rol-clausule hadden.
**Skill:** New skill candidate: supabase-rls-review (of internal project-skill voor deze repo)
**Type:** open-source
**Phase/Area:** Supabase schema / security

**Issue:** De policy `create policy ... for all using (true)` geldt ook voor de rol `anon`. De anon key zit publiek in de browserbundel (`NEXT_PUBLIC_SUPABASE_ANON_KEY`), dus iedereen kon via de REST API alle rijen lezen/muteren, volledig buiten de `isAdminRequest()`-guard om. Opgelost door `to authenticated ... with check (true)`.

**Suggested improvement:** Een checklist/skill die bij elke Supabase-tabel met gevoelige data verifieert: (1) RLS aan, (2) policy heeft expliciete `to`-rol, nooit kale `using(true)` voor anon, (3) serverside auth-guard is geen vervanging voor RLS.

**Principle:** Een serverside auth-check (cookie/route guard) en database-RLS zijn aparte verdedigingslagen. Een open RLS-policy maakt de route-guard waardeloos zodra de publieke anon key bestaat. Controleer altijd de rol-scope van RLS-policies, niet alleen de `using`-expressie.

### Observation 2: Long-running werk op Vercel: job + client-driven step-lus i.p.v. één lange request
**Status:** OPEN
**Session context:** De prospect-zoeker moet tientallen websites crawlen, wat de Vercel-functietimeout overschrijdt. Gekozen voor een job-tabel met wachtrij + een `/step`-endpoint dat de client in een lus aanroept (max N sites per call, tijdsbudget per call, optimistic lock op `updated_at` tegen overlappende calls).
**Skill:** New skill candidate: vercel-longrunning-jobs
**Type:** open-source
**Phase/Area:** Architectuur / serverless-limieten

**Issue:** Zonder externe queue (geen budget/infra) moest werk dat langer duurt dan de functietimeout toch betrouwbaar draaien, hervatbaar zijn na sluiten van de browser, en veilig zijn bij dubbele/parallelle aanroepen.

**Suggested improvement:** Een herbruikbaar patroon documenteren: persistente job-state (status, wachtrij-jsonb, verwerkt/gevonden tellers), een idempotent step-endpoint met tijdsbudget en `maxDuration`, optimistic locking via een versiekolom/`updated_at`, en een client-lus die stopt zodra `klaar` of `overgeslagen` terugkomt.

**Principle:** Bij serverless zonder queue-infra is een client-gedreven step-lus over persistente job-state een robuust alternatief, mits elke step idempotent is en concurrency wordt afgevangen met een optimistic lock.

### Observation 3: Server-side fetch van door-gebruiker-aangeleverde URL's vereist standaard een SSRF-guard
**Status:** OPEN
**Session context:** De crawler haalt willekeurige, door de admin geplakte of via links ontdekte URL's op. De review-subagent merkte op dat interne adressen (localhost, 169.254.169.254 metadata, RFC1918) niet werden afgevangen, ook niet na redirects.
**Skill:** New skill candidate: ssrf-safe-fetch (of toevoegen aan een web-scraping/crawler skill)
**Type:** open-source
**Phase/Area:** Crawler / security

**Issue:** `fetch(url, { redirect: "follow" })` op een publieke URL kan 302'en naar een intern adres. Opgelost met een host-allowlist-check (weiger private/loopback/metadata-ranges) en handmatig redirects volgen, per hop opnieuw gecheckt.

**Suggested improvement:** Een herbruikbare `isVeiligeUrl`/`safeFetch`-helper met de standaard private-range-blokkades en `redirect: "manual"` + per-hop hercontrole, plus een test die localhost/metadata/RFC1918 weigert.

**Principle:** Elke server-side fetch van niet-vertrouwde URL's is een potentiële SSRF-vector. Valideer de host vóór de fetch én na elke redirect; vertrouw nooit op `redirect: "follow"`.

### Observation 4: ICP-persona-loop als herbruikbare website-reviewmethode

**Status:** OPEN
**Date:** 2026-06-12
**Session context:** Homepage waarblijfthet.nl iteratief verbeteren door als verschillende ICP's te kijken
**Skill:** New skill candidate: icp-persona-loop
**Type:** open-source
**Phase/Area:** Conversie-optimalisatie / copy review

**Issue:** Jarno vroeg een loop: bezoek de homepage als elke ICP, verzamel gedachten, voer verbeteringen door, herhaal tot elke ICP "dit MOET ik hebben" denkt. De methode werkte goed: 5 parallelle persona-subagents met elk een concreet profiel, expliciete opdracht om kritisch en in de eerste persoon te reageren, en per ronde een score (klikbereidheid 1-10) plus "het ENE resterende ding". Convergente feedback (jullie-vorm sloot alleenstaanden uit, onduidelijke analyse-inhoud, onbewezen cijfers) bleek betrouwbaarder dan individuele meningen. Belangrijke grens: persona's vroegen om bewijs dat niet bestaat (testimonials, klantaantallen); verzinnen mag niet, dus die punten worden actiepunten voor de eigenaar in plaats van copy-wijzigingen.

**Suggested improvement:** Skill maken met: personadefinities afleiden uit content-segmenten van de site, ronde 1 breed (5 vragen incl. CTA-verwachting), wijzigingen doorvoeren, ronde 2+ alleen op resterende blokkades met scoredelta, stopcriterium (score 8+ of blokkade vereist input van eigenaar), en een eerlijkheidsregel: nooit social proof of cijfers verzinnen om een persona tevreden te stellen.

**Principle:** Persona-gebaseerde review werkt het best als loop met scores en een expliciet "ENE resterende ding" per ronde; de grens van de loop is bereikt zodra de resterende blokkade echte data van de eigenaar vereist.

### Observation 5: Scope-audit bij taal-sweeps: fix de klasse, niet de instantie

**Status:** OPEN
**Date:** 2026-06-12
**Session context:** Analyse-flow van waarblijfthet.nl herzien; eerder die dag was een "jullie"-sweep gedaan op basis van een afgekapte grep (head -30)
**Skill:** New skill candidate: icp-persona-loop (zelfde als observatie 4)
**Type:** open-source
**Phase/Area:** Implementatiefase / verificatie

**Issue:** Bij de homepage-sessie werden jullie-vormen vervangen op basis van een grep met head-limiet. In de vervolgsessie bleken er tientallen extra instanties te bestaan in de quiz-stappen, het vergelijkingspaneel, de resultaatpagina en de e-mail-template. De ICP's vonden ze direct. Een volledige, ongelimiteerde grep over alle gerelateerde mappen (incl. e-mail-templates en secundaire pagina's in dezelfde funnel) had dit in één keer gevangen.

**Suggested improvement:** In de icp-persona-loop-skill een verplichte stap opnemen: bij elke copy-regel-fix (zoals aanspreekvorm of huisstijl) eerst de volledige scope bepalen met een ongelimiteerde zoekopdracht over de hele funnel (pagina's, componenten, e-mails, meta-teksten) en het aantal treffers loggen vóór en na.

**Principle:** Een stijl- of taalfout is vrijwel nooit een instantie maar een klasse; audit de volledige scope bij het eerste exemplaar, anders vind je de rest pas in de volgende reviewronde.
