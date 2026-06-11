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
