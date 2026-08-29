"use client";

import Image from "next/image";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { HOMEPAGE_CTA_LABEL, analyseHref } from "@/lib/cta";
import { rapportVoorSlug } from "@/lib/rapporten-data";

const CASE_SLUG = "tweeverdieners-drie-kinderen";

type IcoonNaam = "huis" | "portemonnee" | "cirkel" | "zoek" | "kar" | "lamp";

const STAPPEN: { nummer: string; icoon: IcoonNaam; titel: string; tekst: string }[] = [
  { nummer: "1", icoon: "huis", titel: "Jouw huishouden", tekst: "Wie woont er mee, en hoe woon je?" },
  { nummer: "2", icoon: "portemonnee", titel: "Netto inkomen", tekst: "Wat komt er iedere maand binnen?" },
  { nummer: "3", icoon: "cirkel", titel: "Financiële ruimte", tekst: "Wat blijft er over na je vaste lasten en uitgaven?" },
  { nummer: "4", icoon: "zoek", titel: "Waar valt het op?", tekst: "Je ziet welke uitgaven het meest afwijken van vergelijkbare huishoudens." },
];

/** Voorbeeldbedragen die de analyse kan opleveren, geen cijfers van een echte klant. */
const VOORBEELD_AFWIJKINGEN: { label: string; icoon: IcoonNaam; jij: number; bench: number; diff: number }[] = [
  { label: "Boodschappen", icoon: "kar", jij: 1200, bench: 680, diff: 520 },
  { label: "Wonen", icoon: "huis", jij: 1860, bench: 1350, diff: 510 },
];

function euro(bedrag: number) {
  return "€ " + String(bedrag).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function Icoon({ naam, className = "h-6 w-6" }: { naam: IcoonNaam; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {naam === "huis" && (
        <>
          <path d="m3 9.5 9-7 9 7V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M9.5 22v-8h5v8" />
        </>
      )}
      {naam === "portemonnee" && (
        <>
          <path d="M19 7.5V5.5A1.5 1.5 0 0 0 17.5 4H5.5A2.5 2.5 0 0 0 3 6.5v11A2.5 2.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 18.5 8H5.5" />
          <path d="M16.5 14h.01" />
        </>
      )}
      {naam === "cirkel" && (
        <>
          <path d="M21.2 15.9A10 10 0 1 1 8 2.8" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </>
      )}
      {naam === "zoek" && (
        <>
          <circle cx="11" cy="11" r="7.5" />
          <path d="m21 21-4.3-4.3" />
        </>
      )}
      {naam === "kar" && (
        <>
          <circle cx="9" cy="20" r="1.3" />
          <circle cx="18" cy="20" r="1.3" />
          <path d="M2.5 3h2.3l2.5 11.2a1.7 1.7 0 0 0 1.7 1.3h9a1.7 1.7 0 0 0 1.7-1.3L21.5 7H5.6" />
        </>
      )}
      {naam === "lamp" && (
        <>
          <path d="M9.2 14.5c-.2-1-.8-1.8-1.5-2.5A5.5 5.5 0 1 1 17.5 8c0 1.4-.6 2.7-1.7 3.6-.7.7-1.2 1.5-1.4 2.4" />
          <path d="M9.5 18h5" />
          <path d="M10.5 21.5h3" />
        </>
      )}
    </svg>
  );
}

function AnalyseCta({ locatie, className = "" }: { locatie: string; className?: string }) {
  return (
    <CtaLink doel="analyse" href={analyseHref()} locatie={locatie} className={`btn-primary ${className}`.trim()}>
      {HOMEPAGE_CTA_LABEL} <span aria-hidden="true">→</span>
    </CtaLink>
  );
}

function HeroScene() {
  return (
    <section className="overflow-hidden bg-background py-12 sm:py-16 md:py-20 xl:py-16">
      <div className="mx-auto grid max-w-[1220px] items-center gap-10 px-5 sm:px-8 md:px-10 xl:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] xl:gap-10">
        <div className="animate-hero-1">
          <p className="section-eyebrow mb-5 text-primary">Persoonlijke geldanalyse</p>
          <h1 className="max-w-[540px] font-display text-[38px] font-light leading-[0.98] text-primary sm:text-[56px] xl:text-[56px]">
            <span className="block whitespace-nowrap">Je verdient goed.</span>
            <span className="block whitespace-nowrap">Toch houd je</span>
            <span className="block whitespace-nowrap text-text-soft">minder over</span>
            <span className="block whitespace-nowrap">dan je verwacht.</span>
          </h1>
          <p className="mt-7 max-w-[440px] font-body text-base font-light leading-relaxed text-text-soft sm:text-lg">
            Ontdek gratis hoeveel financiële ruimte er in jouw situatie zit en waar jouw geld anders heen gaat dan je denkt.
          </p>
          <div className="mt-8"><AnalyseCta locatie="hero" className="sm:min-w-[272px]" /></div>
          <p className="mt-4 font-body text-sm text-text-soft">Een snelle vergelijking van jouw financiële situatie.</p>
        </div>

        <div className="animate-hero-3 mx-auto w-full max-w-[680px] xl:translate-x-2">
          <div className="rounded-xl border border-[#E6E9E7] bg-card px-5 py-6 shadow-card sm:px-7 sm:py-8 md:rounded-2xl md:px-9 md:py-9">
            <div className="flex flex-col gap-1 border-b border-[#E6E9E7] pb-5 md:flex-row md:items-end md:justify-between">
              <p className="font-body text-lg font-semibold text-primary">Jouw overzicht</p>
              <div className="font-body text-xs text-text-muted md:text-right">
                <p>Gezinssituatie</p>
                <p className="mt-0.5 font-medium text-primary">2 volwassenen · 2 kinderen · koopwoning</p>
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-[#E6E9E7]">
              <div className="border-r border-[#E6E9E7] py-6 pr-4 sm:py-7 sm:pr-6">
                <p className="section-eyebrow text-[9px]">Netto inkomen</p>
                <p className="mt-3 whitespace-nowrap font-display text-[33px] font-light leading-none text-primary sm:text-[40px] md:text-[44px]">€5.400</p>
                <p className="mt-2 font-body text-xs text-text-muted">per maand</p>
              </div>
              <div className="py-6 pl-4 sm:py-7 sm:pl-6">
                <p className="section-eyebrow text-[9px] leading-tight">Geschatte ruimte</p>
                <p className="mt-3 whitespace-nowrap font-display text-[33px] font-light leading-none text-primary sm:text-[40px] md:text-[44px]">€2.163</p>
                <p className="mt-2 font-body text-xs text-text-muted">per maand</p>
              </div>
            </div>

            <div className="py-6 sm:py-7">
              <p className="section-eyebrow text-[9px]">Waar valt het op?</p>
              <div className="mt-4 flex items-center justify-between gap-4 border-b border-[#E6E9E7] pb-3 font-body text-sm text-primary"><span>Boodschappen</span><strong className="whitespace-nowrap">+€1.000</strong></div>
              <div className="flex items-center justify-between gap-4 pt-3 font-body text-sm text-primary"><span>Wonen</span><strong className="whitespace-nowrap">+€510</strong></div>
            </div>

            <div className="hidden border-t border-[#E6E9E7] pt-6 md:block">
              <p className="font-body text-sm font-semibold text-primary">Jouw financiële ruimte vergeleken</p>
              <div className="mt-4 flex justify-between font-body text-[10px] text-text-muted"><span>Minder ruimte</span><span>Meer ruimte</span></div>
              <div className="relative mt-2 h-1.5 bg-[#E6E9E7]">
                <div className="absolute left-[12%] top-0 h-1.5 w-[35%] bg-[#668278]" />
                <span className="absolute left-[49%] top-[-5px] h-3 w-3 rounded-full border-2 border-card bg-accent" aria-label="Jouw positie" />
              </div>
              <p className="mt-3 text-center font-body text-xs font-semibold text-primary">Jij</p>
            </div>
          </div>
          <p className="mt-3 text-center font-body text-xs italic text-text-muted xl:text-left">Voorbeelduitkomst van de analyse, geen echte klant.</p>
        </div>
      </div>
    </section>
  );
}

function EditorialScene() {
  return (
    <section className="bg-green-light py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 md:px-10">
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(220px,0.4fr)] md:items-start md:gap-14 lg:gap-20">
          <div>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.08em] text-text-muted">
              Wat je bankapp niet vertelt
            </p>
            <h2 className="mt-8 font-display text-[40px] font-light leading-[1.05] text-primary sm:text-[52px] md:text-[58px] lg:text-[64px] xl:text-[72px]">
              Je bankapp weet waar je geld naartoe gaat.
              <span className="block text-text-soft">
                Maar niet of dat veel is voor een huishouden zoals het jouwe.
              </span>
            </h2>
          </div>
          <aside className="mt-10 border-t border-primary/15 pt-8 font-body text-[16px] leading-[1.6] text-text-soft md:mt-12 md:border-l md:border-t-0 md:pl-10 md:pt-0 lg:text-[18px]">
            <p className="whitespace-nowrap text-primary">&euro; 1.200 boodschappen</p>
            <p className="mt-6">
              Veel?
              <br />
              Weinig?
            </p>
            <p className="mt-6">Dat hangt ervan af.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function JourneyStapTekst({ titel, tekst, className = "" }: { titel: string; tekst: string; className?: string }) {
  return (
    <div className={className}>
      <p className="font-body text-base font-semibold leading-snug text-primary">{titel}</p>
      <p className="mt-2 font-body text-[15px] leading-relaxed text-text-soft">{tekst}</p>
    </div>
  );
}

function Pijl() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
      <path d="M5 12h13" />
      <path d="m13 6.5 5.5 5.5L13 17.5" />
    </svg>
  );
}

/** Horizontale journey vanaf lg: vier markers op een doorlopende lijn. */
function JourneyBreed() {
  return (
    <div className="hidden xl:block" aria-hidden="true">
      <div className="grid grid-cols-4">
        {STAPPEN.map((stap) => (
          <div key={stap.nummer} className="flex justify-center">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-body text-xs font-semibold text-white">
              {stap.nummer}
            </span>
          </div>
        ))}
      </div>

      <div className="relative mt-7">
        <div className="absolute left-[12.5%] right-[12.5%] top-1/2 h-px -translate-y-1/2 bg-[#D9DEDC]" />
        {[25, 50, 75].map((positie) => (
          <span
            key={positie}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-1.5 text-text-muted"
            style={{ left: positie + "%" }}
          >
            <Pijl />
          </span>
        ))}
        <div className="relative grid grid-cols-4">
          {STAPPEN.map((stap) => (
            <div key={stap.nummer} className="flex justify-center">
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green-light text-primary ring-[7px] ring-background">
                <Icoon naam={stap.icoon} className="h-7 w-7" />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 grid grid-cols-4 gap-3">
        {STAPPEN.map((stap) => (
          <JourneyStapTekst key={stap.nummer} titel={stap.titel} tekst={stap.tekst} className="text-center" />
        ))}
      </div>
    </div>
  );
}

/** Verticale journey op mobiel en tablet, met een doorlopende lijn tussen de markers. */
function JourneySmal() {
  return (
    <ol className="xl:hidden">
      {STAPPEN.map((stap, index) => (
        <li key={stap.nummer} className="relative flex gap-5 pb-8 last:pb-0">
          {index < STAPPEN.length - 1 && (
            <span className="absolute bottom-0 left-[27px] top-[58px] w-px bg-[#D9DEDC]" aria-hidden="true" />
          )}
          <div className="relative shrink-0">
            <span className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-green-light text-primary">
              <Icoon naam={stap.icoon} className="h-6 w-6" />
            </span>
            <span className="absolute -left-1.5 -top-1.5 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-primary font-body text-[11px] font-semibold text-white ring-[3px] ring-background">
              {stap.nummer}
            </span>
          </div>
          <JourneyStapTekst titel={stap.titel} tekst={stap.tekst} className="pt-1.5" />
        </li>
      ))}
    </ol>
  );
}

/** Beide regels op dezelfde schaal, met het bedrag altijd als tekst ernaast. */
function AfwijkingRegel({ label, bedrag, breedte, accent }: { label: string; bedrag: number; breedte: number; accent: boolean }) {
  return (
    <div>
      <p className="font-body text-xs text-text-muted">{label}</p>
      <div className="mt-1.5 flex items-center gap-4">
        <div className="h-1.5 flex-1 rounded-full bg-[#E6E9E7]">
          <div
            className={accent ? "h-1.5 rounded-full bg-[#C4603A]" : "h-1.5 rounded-full bg-text-muted"}
            style={{ width: breedte + "%" }}
          />
        </div>
        <p className="w-[72px] shrink-0 text-right font-body text-sm font-medium text-primary">{euro(bedrag)}</p>
      </div>
    </div>
  );
}

function AfwijkingKaart({ item }: { item: (typeof VOORBEELD_AFWIJKINGEN)[number] }) {
  const hoogste = Math.max(item.jij, item.bench);
  return (
    <div className="rounded-xl border border-[#E2E6E4] bg-card p-5 sm:p-6">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C4603A]/10 sm:h-11 sm:w-11 text-[#C4603A]">
            <Icoon naam={item.icoon} className="h-5 w-5" />
          </span>
          <p className="font-body text-base font-semibold text-primary sm:text-[17px]">{item.label}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="whitespace-nowrap font-body text-[22px] font-semibold leading-none text-[#C4603A] sm:text-[25px]">+ {euro(item.diff)}</p>
          <p className="mt-2 font-body text-[11px] text-text-muted sm:text-xs">hoger per maand</p>
        </div>
      </div>

      <div className="mt-5 space-y-3.5">
        <AfwijkingRegel label="Jullie" bedrag={item.jij} breedte={(item.jij / hoogste) * 100} accent />
        <AfwijkingRegel label="Vergelijkbare huishoudens" bedrag={item.bench} breedte={(item.bench / hoogste) * 100} accent={false} />
      </div>
    </div>
  );
}

function ProductScene() {
  return (
    <section className="bg-background py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] lg:gap-0">
          <div className="lg:pr-10 xl:pr-14">
            <h2 className="max-w-[600px] font-display text-[36px] font-light leading-[1.04] text-primary sm:text-[44px] lg:text-[50px] xl:text-[54px]">
              Van je inkomen naar je <span className="text-text-soft">financiële ruimte.</span>
            </h2>

            <p className="section-eyebrow mt-9 lg:mt-12">Zo ziet het eruit</p>

            <div className="mt-7 lg:mt-9">
              <JourneySmal />
              <JourneyBreed />
            </div>

            <p className="mx-auto mt-10 max-w-[460px] text-center font-display text-[19px] font-light leading-[1.5] text-text-soft lg:mt-14 lg:text-[21px]">
              Je ziet niet alleen wat je uitgeeft, maar hoe jouw situatie zich verhoudt tot vergelijkbare huishoudens.
            </p>
          </div>

          <div className="border-t border-[#D9DEDC] pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0 xl:pl-16">
            <p className="section-eyebrow">Hier zit het grootste verschil.</p>
            <h3 className="mt-4 font-display text-[26px] font-light leading-[1.12] text-primary sm:text-[30px] lg:text-[28px] xl:text-[31px]">
              Dit zijn de uitgaven die het meest afwijken van vergelijkbare huishoudens.
            </h3>
            <p className="mt-3 font-body text-xs italic text-text-muted">Voorbeeld van de vergelijking, geen echte klant.</p>

            <div className="mt-7 space-y-4">
              {VOORBEELD_AFWIJKINGEN.map((item) => (
                <AfwijkingKaart key={item.label} item={item} />
              ))}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-[#C4603A]/[0.07] px-4 py-3.5">
              <span className="mt-px shrink-0 text-[#C4603A]">
                <Icoon naam="lamp" className="h-[18px] w-[18px]" />
              </span>
              <p className="font-body text-sm leading-relaxed text-text-soft">
                De vergelijking is een signaal om verder te kijken, geen oordeel.
              </p>
            </div>

            <p className="mt-8 text-center font-body text-[15px] leading-relaxed text-text-soft">
              Je ziet nu waar jullie het meest afwijken.
              <span className="block">Maar deze cijfers vertellen nog niet waarom.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseScene() {
  const rapport = rapportVoorSlug(CASE_SLUG);
  if (!rapport) return null;

  return (
    <section className="overflow-hidden bg-card">
      <div className="mx-auto grid max-w-[1280px] md:grid-cols-2">
        <div className="flex min-h-[360px] flex-col justify-between bg-[#1C3A2A] px-6 py-10 text-white sm:px-10 sm:py-14 md:min-h-[560px] md:px-14 md:py-16">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Een echt rapport</p>
          <div className="py-10 md:py-14">
            <p className="font-display text-[38px] font-light leading-[1.08] sm:text-5xl md:text-[60px]">Ze dachten dat boodschappen het probleem waren.</p>
            <p className="mt-3 font-display text-[38px] font-light leading-[1.08] text-[#B2CCC6] sm:text-5xl md:text-[60px]">Dat waren ze niet.</p>
          </div>
          <p className="max-w-[430px] font-body text-sm leading-relaxed text-white/75">{rapport.kenmerken.join(" · ")}</p>
        </div>
        <div className="flex flex-col justify-center px-6 py-12 sm:px-10 md:px-14 md:py-16">
          <p className="section-eyebrow">Wat zij vooraf dachten</p>
          <blockquote className="mt-4 max-w-[480px] font-display text-2xl font-light leading-snug text-text-soft sm:text-3xl">&ldquo;{rapport.vermoeden}&rdquo;</blockquote>
          <div className="my-8 h-px w-full max-w-[460px] bg-[#E6E9E7]" />
          <p className="max-w-[510px] font-body text-base font-light leading-relaxed text-text-soft">{rapport.adviesInleiding}</p>
          <div className="mt-8 flex flex-col items-start gap-3">
            <Link href={`/rapporten/${rapport.slug}`} className="font-body text-[15px] font-semibold text-accent hover:underline">Lees het volledige rapport <span aria-hidden="true">→</span></Link>
            <Link href="/rapporten" className="font-body text-sm text-text-muted hover:text-primary hover:underline">Bekijk de andere echte rapporten <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustScene() {
  return (
    <section className="bg-background py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-[1080px] items-end gap-10 px-5 sm:px-8 md:grid-cols-[0.75fr_1fr] md:gap-16 md:px-10">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[390px] overflow-hidden rounded-xl shadow-card md:mx-0">
          <Image src="/jarno.jpg" alt="Jarno Koopman" fill sizes="(max-width: 768px) 390px, 38vw" className="object-cover" />
        </div>
        <div className="pb-1">
          <p className="section-eyebrow">Waarom ik dit doe</p>
          <h2 className="mt-4 max-w-[550px] font-display text-[34px] font-light leading-[1.14] text-primary sm:text-5xl">Als er niets mis is, zeg ik dat ook.</h2>
          <div className="mt-7 max-w-[540px] space-y-4 font-body text-base font-light leading-relaxed text-text-soft sm:text-lg">
            <p>Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte.</p>
            <p>Daarom kijk ik niet alleen naar wat je uitgeeft, maar naar wat een bedrag betekent in de context van jouw huishouden.</p>
          </div>
          <Link href="/over" className="mt-7 inline-flex font-body text-[15px] font-semibold text-accent hover:underline">Lees mijn verhaal <span className="ml-1.5" aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}

function FinalCtaScene() {
  return (
    <section className="bg-dark-block py-20 sm:py-24 md:py-28">
      <div className="mx-auto max-w-[660px] px-5 text-center sm:px-8">
        <h2 className="font-display text-[34px] font-light leading-tight text-white sm:text-5xl">Benieuwd wat er bij jou opvalt?</h2>
        <p className="mx-auto mt-5 max-w-[540px] font-body text-base font-light leading-relaxed text-white/80 sm:text-lg">Vergelijk jouw financiële situatie met vergelijkbare huishoudens en ontdek waar het verschil zit.</p>
        <div className="mt-8"><AnalyseCta locatie="slot" /></div>
      </div>
    </section>
  );
}

export default function HomeConcept() {
  return (
    <div className="overflow-x-hidden">
      <HeroScene />
      <EditorialScene />
      <ProductScene />
      <CaseScene />
      <TrustScene />
      <FinalCtaScene />
    </div>
  );
}
