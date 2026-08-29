"use client";

import Image from "next/image";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { HOMEPAGE_CTA_LABEL, analyseHref } from "@/lib/cta";
import { rapportVoorSlug } from "@/lib/rapporten-data";
import Resultaat1Uitkomst from "@/app/analyse/stappen/resultaat/Resultaat1Uitkomst";
import Resultaat2Verschil from "@/app/analyse/stappen/resultaat/Resultaat2Verschil";
import type { AfwijkingEntry } from "@/app/analyse/stappen/resultaat/types";

const CASE_SLUG = "tweeverdieners-drie-kinderen";

const previewAfwijkingen: AfwijkingEntry[] = [
  { label: "Boodschappen", jij: 1200, bench: 680, diff: 520 },
  { label: "Wonen", jij: 1860, bench: 1350, diff: 510 },
];

function AnalyseCta({ locatie }: { locatie: string }) {
  return (
    <CtaLink doel="analyse" href={analyseHref()} locatie={locatie} className="btn-primary">
      {HOMEPAGE_CTA_LABEL} <span aria-hidden="true">→</span>
    </CtaLink>
  );
}

/** Een echte resultaatcomponent uit de analyse, met een duidelijk voorbeeldlabel. */
function RuimtePreview({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`pointer-events-none ${compact ? "[&_button]:hidden [&_.card-base]:p-4 [&_.card-base]:rounded-lg [&_h2]:text-xl [&_.card-base_p:last-child]:hidden" : ""}`}>
      <Resultaat1Uitkomst
        conclusieKop="Hier blijft waarschijnlijk minder over dan je zelf zou verwachten."
        over={2163}
        benchmarkOver={3726}
        contextZin="Je financiële ruimte ligt lager dan wat ik bij dit huishouden verwacht."
        inkomenWisselend={false}
        spaardoelWaarde={0}
        onVerder={() => undefined}
      />
    </div>
  );
}

/** Ook dit is de bestaande resultaten-UI, niet een losse marketingmock-up. */
function VerschilPreview() {
  return (
    <div className="pointer-events-none [&_button]:hidden [&_h2]:text-2xl [&_.card-base]:rounded-lg [&_.card-base]:p-5 md:[&_h2]:text-3xl">
      <Resultaat2Verschil
        opvallend={previewAfwijkingen}
        zinVoor={(afwijking) =>
          afwijking.label === "Boodschappen"
            ? "Dit is een voorbeeld van een verschil dat de analyse zichtbaar maakt."
            : "De vergelijking is een signaal om verder te kijken, geen oordeel."
        }
        onVerder={() => undefined}
      />
    </div>
  );
}

function HeroScene() {
  return (
    <section className="overflow-hidden bg-[#7B2D3E] pt-12 pb-16 sm:pt-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 sm:px-8 md:px-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(620px,1.22fr)] lg:gap-10">
        <div className="animate-hero-1 lg:pb-8">
          <h1 className="max-w-[570px] font-display text-[38px] font-light leading-[1.08] text-white sm:text-5xl md:text-[60px] lg:text-[64px]">
            Je verdient goed. Toch houd je minder over dan je verwacht.
          </h1>
          <p className="mt-7 max-w-[460px] font-body text-base font-light leading-relaxed text-white/85 sm:text-lg md:text-xl">
            Ontdek gratis hoeveel financiële ruimte er in jouw situatie zit en waar jouw geld anders heen gaat dan je denkt.
          </p>
          <div className="mt-8"><AnalyseCta locatie="hero" /></div>
        </div>

        <div className="animate-hero-3 mx-auto w-full max-w-[720px] lg:translate-x-5">
          <div className="overflow-hidden rounded-xl bg-card shadow-card-hover sm:rounded-2xl">
            <div className="hidden min-h-[470px] w-[162px] shrink-0 border-r border-[#E6E9E7] px-5 py-7 md:float-left md:block">
              <p className="font-display text-lg font-semibold leading-none text-primary">waar<br />blijft het?</p>
              <p className="mt-12 rounded-lg bg-green-light px-3 py-2 font-body text-xs font-semibold text-primary">Uitkomst</p>
              <p className="mt-4 px-3 font-body text-xs text-text-muted">Inkomen</p>
              <p className="mt-4 px-3 font-body text-xs text-text-muted">Uitgaven</p>
              <p className="mt-4 px-3 font-body text-xs text-text-muted">Vergelijking</p>
            </div>
            <div className="p-5 sm:p-7 md:ml-[162px] md:p-8">
              <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#E6E9E7] pb-4">
                <div>
                  <p className="section-eyebrow">Jouw uitkomst</p>
                  <p className="mt-1 font-body text-xs text-text-muted">2 volwassenen, 2 kinderen, koopwoning</p>
                </div>
                <span className="shrink-0 rounded-full bg-accent-bg px-2.5 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-accent">Voorbeeld</span>
              </div>
              <RuimtePreview compact />
            </div>
          </div>
          <p className="mt-4 text-center font-body text-xs italic text-white/55 lg:text-left">Voorbeelduitkomst van de analyse, geen echte klant.</p>
        </div>
      </div>
    </section>
  );
}

function EditorialScene() {
  return (
    <section className="bg-green-light py-20 sm:py-24 md:py-32 lg:py-36">
      <div className="mx-auto grid max-w-[1120px] items-end gap-12 px-5 sm:px-8 md:grid-cols-[minmax(0,1.35fr)_minmax(220px,0.45fr)] md:px-10">
        <div>
          <p className="section-eyebrow mb-7">Wat je bankapp niet vertelt</p>
          <h2 className="max-w-[790px] font-display text-[36px] font-light leading-[1.13] text-primary sm:text-5xl md:text-[58px] lg:text-[66px]">
            Je bankapp weet waar je geld naartoe gaat.<br />
            <span className="text-text-soft">Maar niet of dat veel is voor een huishouden zoals het jouwe.</span>
          </h2>
        </div>
        <aside className="border-l border-primary/20 pl-6 font-body text-sm leading-relaxed text-primary sm:text-base md:mb-2">
          <p className="font-semibold">€ 1.200 boodschappen</p>
          <p className="mt-5">Veel?<br />Weinig?</p>
          <p className="mt-5 font-medium">Dat hangt ervan af.</p>
        </aside>
      </div>
    </section>
  );
}

function ProductScene() {
  return (
    <section className="bg-background py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 md:px-10">
        <div className="text-center">
          <p className="section-eyebrow">Zo ziet het eruit</p>
          <h2 className="mt-3 font-display text-[32px] font-light leading-tight text-primary sm:text-4xl md:text-5xl">Van je inkomen naar je financiële ruimte.</h2>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.86fr)] lg:items-center lg:gap-16">
          <ol className="grid border-y border-[#D9DEDC] sm:grid-cols-2 lg:grid-cols-4 lg:border-y-0" aria-label="Stappen in de analyse">
            <li className="border-b border-[#D9DEDC] px-1 py-6 sm:border-r sm:pr-7 lg:border-b-0 lg:px-6 lg:first:pl-0">
              <span className="font-display text-3xl text-text-muted">01</span>
              <p className="mt-8 font-body text-sm font-semibold text-primary">Jouw huishouden</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-soft">Wie woont er mee, en hoe woon je?</p>
            </li>
            <li className="border-b border-[#D9DEDC] px-1 py-6 sm:border-b sm:pl-7 lg:border-b-0 lg:border-r lg:px-6">
              <span className="font-display text-3xl text-text-muted">02</span>
              <p className="mt-8 font-body text-sm font-semibold text-primary">Netto inkomen</p>
              <p className="mt-2 font-display text-2xl font-light text-primary">€ 7.880 <span className="font-body text-xs text-text-muted">p/m</span></p>
            </li>
            <li className="border-b border-[#D9DEDC] px-1 py-6 sm:border-b-0 sm:border-r sm:pr-7 lg:px-6">
              <span className="font-display text-3xl text-text-muted">03</span>
              <p className="mt-8 font-body text-sm font-semibold text-primary">Financiële ruimte</p>
              <p className="mt-2 font-display text-2xl font-light text-primary">€ 1.863 <span className="font-body text-xs text-text-muted">p/m</span></p>
            </li>
            <li className="px-1 py-6 sm:pl-7 lg:pl-6 lg:pr-0">
              <span className="font-display text-3xl text-text-muted">04</span>
              <p className="mt-8 font-body text-sm font-semibold text-primary">Waar valt het op?</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-soft">Je ziet welke posten het meest afwijken.</p>
            </li>
          </ol>

          <div className="border-t border-[#D9DEDC] pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p className="mb-5 font-body text-xs italic text-text-muted">Voorbeeld van de vergelijking, geen echte klant.</p>
            <VerschilPreview />
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[530px] text-center md:mt-14">
          <p className="font-body text-base font-light leading-relaxed text-text-soft sm:text-lg">Je ziet niet alleen wat je uitgeeft, maar hoe jouw situatie zich verhoudt tot vergelijkbare huishoudens.</p>
          <div className="mt-7"><AnalyseCta locatie="product-experience" /></div>
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
