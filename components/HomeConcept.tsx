"use client";

import Image from "next/image";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { analyseHref, PRIMAIRE_CTA_LABEL } from "@/lib/cta";
import { rapportVoorSlug } from "@/lib/rapporten-data";

/* -----------------------------------------------------------------------
   Homepage, volledig opnieuw gecomponeerd als zes visueel verschillende
   scenes in plaats van herhaalde "eyebrow / heading / tekst / card"-
   blokken. Elke scene heeft zijn eigen achtergrond, schaal en compositie
   (product + statement, editorial, productstory, case, mens, slot-CTA).
   Geen van de oude sectiecomponenten of cardpatronen is hergebruikt.

   Kleuren en typografie komen uitsluitend uit bestaande tokens
   (tailwind.config.ts) en de bestaande wijnrood/goud-tekens uit
   components/Header.tsx. Geen nieuwe kleur toegevoegd.

   Illustratieve productcijfers (hero, productstory) zijn nooit een echte
   klant en staan daarom steeds bij een "Voorbeeld"-label. De case in
   scene 4 gebruikt uitsluitend echte velden uit lib/rapporten-data.ts.
   ----------------------------------------------------------------------- */

const CASE_SLUG = "tweeverdieners-drie-kinderen";

/* === Scene 1: hero, product + statement ================================ */

function HeroPreview() {
  return (
    <div className="relative">
      <div className="animate-hero-3 bg-card rounded-xl shadow-card-hover px-7 py-8 md:px-9 md:py-10 md:w-[112%] lg:w-[128%] md:-mr-[12%] lg:-mr-[24%] md:rotate-[-1.5deg]">
        <div className="flex items-center justify-between mb-6">
          <span className="section-eyebrow">Geschatte financiële ruimte</span>
          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-body font-bold uppercase tracking-wider text-accent bg-accent-bg">
            Voorbeeld
          </span>
        </div>

        <div className="flex items-end justify-between gap-6 mb-6 flex-wrap">
          <div>
            <p className="font-body text-xs text-text-muted mb-1">Netto inkomen</p>
            <p className="font-display font-light text-primary text-2xl md:text-3xl">€ 5.400</p>
          </div>
          <div className="text-right">
            <p className="font-body text-xs text-text-muted mb-1">Geschatte ruimte</p>
            <p className="font-display font-light text-primary text-4xl md:text-5xl leading-none">€ 2.163</p>
          </div>
        </div>

        <div className="border-t border-[#E6E9E7] pt-5">
          <p className="section-eyebrow mb-3">Waar valt het op?</p>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm font-medium text-primary">Boodschappen</span>
            <span className="font-body text-sm font-semibold text-[#A15A32]">+€ 1.000</span>
          </div>
        </div>
      </div>
      <p className="mt-5 md:mt-6 md:pr-[24%] text-center md:text-left text-[13px] font-body italic text-white/55">
        Voorbeelduitkomst van de analyse. Geen echte klant.
      </p>
    </div>
  );
}

function HeroScene() {
  return (
    <section className="bg-[#7B2D3E] pt-16 pb-20 md:pt-24 md:pb-32 lg:pb-40">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-10 items-center">
          <div className="animate-hero-1">
            <h1 className="font-display font-light text-white text-[34px] leading-[1.14] sm:text-5xl md:text-[52px] md:leading-[1.1] mb-6 max-w-[520px]">
              Je verdient goed.
              <br />
              Toch houd je minder over dan je verwacht.
            </h1>
            <p className="font-body font-light text-white/85 text-lg md:text-xl leading-relaxed max-w-[440px] mb-9">
              Ontdek gratis hoeveel financiële ruimte er in jouw situatie zit en waar jouw geld
              anders heen gaat dan je denkt.
            </p>
            <div className="mb-4">
              <CtaLink doel="analyse" href={analyseHref()} locatie="hero" className="btn-primary">
                {PRIMAIRE_CTA_LABEL}
              </CtaLink>
            </div>
            <p className="font-body text-white/55 text-sm">
              Een snelle vergelijking van jouw financiële situatie.
            </p>
          </div>

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

/* === Scene 2: editorial statement ======================================== */

function EditorialScene() {
  return (
    <section className="bg-card py-24 md:py-36 lg:py-44">
      <div className="max-w-[720px] mx-auto px-6 md:px-10">
        <p className="font-body font-semibold text-text-muted text-[11px] md:text-xs uppercase tracking-[0.2em] mb-8 md:mb-10">
          Wat je bankapp niet vertelt
        </p>
        <p className="font-display font-light text-primary text-[30px] leading-[1.28] sm:text-[38px] sm:leading-[1.25] md:text-[46px] md:leading-[1.2] mb-8 md:mb-10">
          Je bankapp weet waar je geld naartoe gaat.
          <br />
          <span className="text-text-soft">Maar niet of dat veel is voor een huishouden zoals het jouwe.</span>
        </p>
        <p className="font-body font-medium text-primary text-base md:text-lg mb-2">€ 1.200 boodschappen</p>
        <p className="font-display font-light italic text-text-soft text-xl md:text-2xl leading-snug">
          Veel? Weinig?
          <br />
          Dat hangt ervan af.
        </p>
      </div>
    </section>
  );
}

/* === Scene 3: product experience ========================================= */

function ArrowDivider() {
  return (
    <div className="flex justify-center border-t border-[#E6E9E7] py-2">
      <span aria-hidden="true" className="text-text-muted text-sm">↓</span>
    </div>
  );
}

function BarRow({ label, verschil, pct }: { label: string; verschil: string; pct: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-body text-sm text-primary">{label}</span>
        <span className="font-body text-sm font-semibold text-[#A15A32]">{verschil}</span>
      </div>
      <div className="h-2 bg-[#F0F3F1] rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-[#C4603A]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ProductStory() {
  return (
    <div className="bg-card rounded-xl shadow-card max-w-[520px] mx-auto lg:mx-0 overflow-hidden">
      <div className="px-7 py-6 md:px-9 md:py-7">
        <p className="section-eyebrow mb-2">Stap 1 · Jouw huishouden</p>
        <p className="font-body text-[15px] text-primary">
          2 volwassenen <span className="text-text-muted">·</span> 2 kinderen{" "}
          <span className="text-text-muted">·</span> koopwoning
        </p>
      </div>

      <ArrowDivider />

      <div className="px-7 py-6 md:px-9 md:py-7">
        <p className="section-eyebrow mb-2">Stap 2 · Netto inkomen</p>
        <p className="font-display font-light text-primary text-3xl md:text-4xl">€ 7.880</p>
      </div>

      <ArrowDivider />

      <div className="px-7 py-7 md:px-9 md:py-8 bg-green-light">
        <p className="section-eyebrow mb-2">Stap 3 · Geschatte financiële ruimte</p>
        <p className="font-display font-light text-primary text-5xl md:text-6xl leading-none">€ 1.863</p>
      </div>

      <ArrowDivider />

      <div className="px-7 py-6 md:px-9 md:py-7">
        <p className="section-eyebrow mb-4">Stap 4 · Waar valt het op?</p>
        <div className="space-y-4">
          <BarRow label="Boodschappen" verschil="+€ 1.000" pct={92} />
          <BarRow label="Wonen" verschil="+€ 510" pct={58} />
        </div>
      </div>
    </div>
  );
}

function ProductScene() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <div className="max-w-[640px] mb-12 md:mb-14">
          <p className="section-eyebrow mb-4">Zo ziet het eruit</p>
          <h2 className="font-display font-light text-primary text-[28px] leading-tight sm:text-4xl md:text-[42px]">
            Van je inkomen naar je financiële ruimte.
          </h2>
        </div>

        <ProductStory />

        <div className="max-w-[520px] mx-auto lg:mx-0 mt-10 md:mt-12">
          <p className="font-body italic text-text-muted text-sm mb-6">
            Voorbeeld van hoe de uitkomst eruitziet. Geen echte klant.
          </p>
          <p className="font-body font-light text-text-soft text-lg leading-relaxed mb-8">
            Je ziet niet alleen wat je uitgeeft, maar hoe jouw situatie zich verhoudt tot
            vergelijkbare huishoudens.
          </p>
          <CtaLink doel="analyse" href={analyseHref()} locatie="product-experience" className="btn-primary">
            {PRIMAIRE_CTA_LABEL}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

/* === Scene 4: case spotlight. Uitsluitend echte velden uit
   lib/rapporten-data.ts, geen verzonnen kop of citaat. ==================== */

function CaseScene() {
  const rapport = rapportVoorSlug(CASE_SLUG);
  if (!rapport) return null;

  return (
    <section className="relative bg-green-light py-20 md:py-28 overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-16 -left-4 md:left-4 font-display text-[240px] md:text-[360px] leading-none text-primary/5"
      >
        &ldquo;
      </span>
      <div className="relative max-w-[820px] mx-auto px-5 md:px-10">
        <p className="section-eyebrow mb-6">Een echt rapport</p>

        <p className="font-body text-xs uppercase tracking-widest text-text-muted mb-3">Ze dachten</p>
        <p className="font-display font-light italic text-text-soft text-xl md:text-2xl leading-snug mb-8 md:mb-10">
          &ldquo;{rapport.vermoeden}&rdquo;
        </p>

        <h2 className="font-display font-light text-primary text-[34px] leading-[1.12] sm:text-5xl md:text-[64px] md:leading-[1.05] mb-10 md:mb-12">
          {rapport.uitkomstKop}.
        </h2>

        <ul className="flex flex-wrap gap-x-2 gap-y-1 font-body text-sm text-primary mb-8 pb-8 border-b border-[#C7DAD4]">
          {rapport.kenmerken.map((k, i) => (
            <li key={k} className="font-medium">
              {k}
              {i < rapport.kenmerken.length - 1 && (
                <span className="text-text-muted font-normal"> · </span>
              )}
            </li>
          ))}
        </ul>

        <p className="font-body font-light text-text-soft text-base md:text-lg leading-relaxed mb-8 max-w-[640px]">
          {rapport.adviesInleiding}
        </p>

        <div className="mb-3">
          <Link
            href={`/rapporten/${rapport.slug}`}
            className="inline-flex items-center gap-1.5 font-body font-semibold text-accent hover:underline text-[15px]"
          >
            Lees het volledige rapport <span aria-hidden="true">→</span>
          </Link>
        </div>
        <Link
          href="/rapporten"
          className="inline-flex items-center gap-1.5 font-body text-text-muted hover:text-primary hover:underline text-sm"
        >
          Bekijk de andere echte rapporten <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

/* === Scene 5: human trust ================================================= */

function TrustScene() {
  return (
    <section className="bg-card py-20 md:py-28">
      <div className="max-w-[980px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.3fr] gap-10 md:gap-16 items-center">
          <div className="relative w-full max-w-[340px] mx-auto md:mx-0 md:max-w-none aspect-[4/5] rounded-xl overflow-hidden shadow-card">
            <Image
              src="/jarno.jpg"
              alt="Jarno Koopman"
              fill
              sizes="(max-width: 768px) 340px, 40vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="section-eyebrow mb-4">Waarom ik dit doe</p>
            <h2 className="font-display font-light text-primary text-[28px] leading-snug sm:text-4xl md:text-[42px] mb-6 max-w-[520px]">
              Als er niets mis is, zeg ik dat ook.
            </h2>
            <div className="space-y-4 font-body font-light text-text-soft text-base md:text-lg leading-relaxed max-w-[540px] mb-6">
              <p>
                Ik ben Waar blijft het? begonnen omdat ik zelf goed verdiende en jarenlang niet
                begreep waarom er toch minder overbleef dan ik verwachtte.
              </p>
              <p>
                Voor mijn werk werk ik dagelijks met financiële cijfers en software. Maar ik
                ontdekte dat cijfers alleen niet genoeg zijn. Je moet ze in de context van een
                huishouden kunnen plaatsen.
              </p>
            </div>

            <p className="mb-6">
              <Link
                href="/over"
                className="inline-flex items-center gap-1.5 font-body font-semibold text-accent hover:underline text-[15px]"
              >
                Lees mijn verhaal <span aria-hidden="true">→</span>
              </Link>
            </p>

            <p className="font-body text-sm text-text-soft leading-loose">
              Geen financiële producten.
              <br />
              Geen provisie.
              <br />
              Geen belang bij de uitkomst.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* === Scene 6: slot-CTA ==================================================== */

function FinalCtaScene() {
  return (
    <section className="bg-dark-block py-20 md:py-28">
      <div className="max-w-[560px] mx-auto px-5 md:px-10 text-center">
        <p className="font-body font-semibold text-white/60 text-xs uppercase tracking-[0.16em] mb-5">
          Jouw situatie
        </p>
        <h2 className="font-display font-light text-white text-[28px] leading-tight sm:text-4xl md:text-[42px] mb-5">
          Benieuwd wat er bij jou opvalt?
        </h2>
        <p className="font-body font-light text-white/80 text-lg leading-relaxed mb-9 max-w-[440px] mx-auto">
          Vergelijk jouw financiële situatie met vergelijkbare huishoudens en ontdek waar het
          verschil zit.
        </p>
        <CtaLink doel="analyse" href={analyseHref()} locatie="slot" className="btn-primary">
          {PRIMAIRE_CTA_LABEL}
        </CtaLink>
      </div>
    </section>
  );
}

/* === Samenstelling ======================================================== */

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
