"use client";

import Image from "next/image";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import { RAPPORTEN, rapportVoorSlug } from "@/lib/rapporten-data";

/* ─────────────────────────────────────────────────────────────────────────
   Homepage, volledig vanaf nul opgebouwd langs zes hoofdstukken met elk een
   andere visuele functie (hero, editorial statement, productdemo, case
   spotlight, mens en vertrouwen, slot-CTA). Geen herhaling van "grote
   heading plus kleine tekst plus card". Eén primaire route overal:
   /analyse, exact gelabeld "Start de gratis analyse".

   Kleuren en typografie: bestaande huisstijl-tokens uit tailwind.config.ts
   (primary, accent, background, card, text-soft, text-muted, dark-block,
   green-light), dezelfde die /over, /rapporten en /analyse al gebruiken.
   Geen nieuw palet.

   Illustratieve productcijfers in de hero en de productdemo zijn
   voorbeelden, nooit een echte klant, en dat staat er ook steeds bij. De
   bedragen zijn bewust anders dan die van de echte rapporten in
   lib/rapporten-data.ts. De case spotlight in hoofdstuk 4 gebruikt
   uitsluitend echte velden uit rapportVoorSlug().
   ────────────────────────────────────────────────────────────────────────── */

function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"max-w-[1200px] mx-auto px-5 md:px-10 " + className}>{children}</div>;
}

function Eyebrow({
  children,
  dark = false,
  center = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <p
      className={
        "font-body font-semibold text-xs md:text-[13px] uppercase tracking-[0.14em] mb-3 md:mb-4 " +
        (dark ? "text-white/70" : "text-text-muted") +
        (center ? " text-center" : "") +
        " " +
        className
      }
    >
      {children}
    </p>
  );
}

function VoorbeeldBadge() {
  return (
    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-body font-bold uppercase tracking-wider text-accent bg-accent-bg">
      Voorbeeld
    </span>
  );
}

/* ─── Hoofdstuk 1: Hero ──────────────────────────────────────────────────── */

function HeroPreview() {
  return (
    <div>
      <div className="card-base border border-[#E6E9E7] shadow-card-hover">
        <div className="flex items-center justify-between mb-5">
          <span className="section-eyebrow">Geschatte financiële ruimte</span>
          <VoorbeeldBadge />
        </div>
        <p className="font-display font-light text-primary text-5xl md:text-6xl leading-none mb-1">
          &euro; 2.163
        </p>
        <p className="font-body text-text-muted text-sm mb-5">per maand</p>
        <div className="border-t border-[#E6E9E7] pt-4 mb-4">
          <p className="font-body font-light text-sm text-text-soft leading-relaxed">
            Vergelijkbaar huishouden{" "}
            <strong className="text-primary font-medium">&euro; 1.540</strong> per maand.
          </p>
        </div>
        <div className="hidden sm:block border-t border-[#E6E9E7] pt-4">
          <p className="section-eyebrow mb-3">Waar valt het op?</p>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm font-medium text-primary">Boodschappen</span>
            <span className="font-body text-sm font-semibold text-[#A15A32]">+&euro; 1.000</span>
          </div>
        </div>
      </div>
      <p className="text-center mt-4 text-[13px] font-body italic text-text-muted">
        Voorbeelduitkomst van de analyse. Geen echte klant.
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-dark-block pt-14 pb-16 md:pt-20 md:pb-24">
      <Wrap>
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <Eyebrow dark>Persoonlijke geldanalyse</Eyebrow>
            <h1 className="font-display font-light text-white text-[34px] leading-[1.12] sm:text-5xl md:text-[56px] md:leading-[1.08] mb-6">
              Je verdient goed.
              <br />
              Toch houd je minder over dan je verwacht.
            </h1>
            <p className="font-body font-light text-white/85 text-lg md:text-xl leading-relaxed max-w-[480px] mb-8">
              Ontdek gratis hoeveel financiële ruimte er in jouw situatie zit en waar jouw geld
              anders heen gaat dan je denkt.
            </p>
            <div className="mb-4">
              <CtaLink doel="analyse" href={analyseHref()} locatie="hero" className="btn-primary">
                Start de gratis analyse
              </CtaLink>
            </div>
            <p className="font-body text-white/60 text-sm">
              Een korte, persoonlijke vergelijking van jouw financiële situatie.
            </p>
          </div>

          <HeroPreview />
        </div>
      </Wrap>
    </section>
  );
}

/* ─── Hoofdstuk 2: Editorial insight ─────────────────────────────────────── */

function EditorialInsight() {
  return (
    <section className="bg-card py-20 md:py-32">
      <Wrap>
        <div className="max-w-[640px]">
          <Eyebrow>Een andere vraag</Eyebrow>
          <p className="font-display font-light text-primary text-[28px] leading-[1.3] sm:text-4xl sm:leading-[1.25] md:text-[44px] md:leading-[1.2] mb-10 md:mb-12">
            Je bankapp weet waar je geld naartoe gaat.
            <br />
            <span className="text-text-soft">
              Maar niet of dat veel is voor een huishouden zoals het jouwe.
            </span>
          </p>

          <div className="border-l-2 border-[#E6E9E7] pl-6 mb-10 md:mb-12">
            <p className="font-body font-medium text-primary text-lg mb-2">
              &euro; 1.200 aan boodschappen
            </p>
            <p className="font-display font-light text-text-soft text-2xl md:text-3xl leading-snug">
              Veel? Weinig?
              <br />
              Dat hangt ervan af.
            </p>
          </div>

          <p className="font-body font-light text-text-soft text-lg md:text-xl leading-relaxed">
            Een bedrag krijgt pas betekenis als je weet met welk huishouden je het vergelijkt.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

/* ─── Hoofdstuk 3: Product experience ────────────────────────────────────── */

const ditZieJe = [
  {
    nr: "01",
    titel: "Hoeveel ruimte je waarschijnlijk hebt",
    tekst: "Niet alleen wat er binnenkomt, maar hoeveel er onderaan de streep realistisch overblijft.",
  },
  {
    nr: "02",
    titel: "Waar jouw situatie afwijkt",
    tekst: "Je ziet welke onderdelen hoger, lager of anders zijn dan bij vergelijkbare huishoudens.",
  },
  {
    nr: "03",
    titel: "Wat je daarna zelf kunt onderzoeken",
    tekst: "Soms is er iets om te veranderen. Soms blijkt er financieel weinig geks aan de hand.",
  },
];

function SituatieKaart() {
  return (
    <div className="card-base border border-[#E6E9E7]">
      <p className="section-eyebrow mb-4">Jouw situatie</p>
      <ul className="space-y-2.5 font-body text-[15px] text-primary">
        <li>2 volwassenen</li>
        <li>2 kinderen</li>
        <li>Koopwoning</li>
      </ul>
      <div className="border-t border-[#E6E9E7] mt-4 pt-4">
        <p className="font-body text-xs text-text-muted mb-1">Netto inkomen</p>
        <p className="font-display font-light text-primary text-2xl">&euro; 6.450</p>
      </div>
    </div>
  );
}

function UitkomstKaart() {
  return (
    <div className="card-base border border-[#E6E9E7]">
      <p className="section-eyebrow mb-4">Jouw uitkomst</p>
      <p className="font-body text-xs text-text-muted mb-1">Financiële ruimte</p>
      <p className="font-display font-light text-primary text-3xl mb-4">
        &euro; 1.480 <span className="text-base font-body font-light text-text-muted">/ maand</span>
      </p>
      <div className="border-t border-[#E6E9E7] pt-3 mb-4">
        <p className="font-body text-sm text-text-soft">
          Vergelijkbaar huishouden <strong className="text-primary font-medium">&euro; 1.210</strong>
        </p>
      </div>
      <div className="border-t border-[#E6E9E7] pt-4">
        <p className="section-eyebrow mb-3">Waar valt het op?</p>
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-primary">Boodschappen</span>
            <span className="font-body text-sm font-semibold text-[#A15A32]">+&euro; 380</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-body text-sm text-primary">Wonen</span>
            <span className="font-body text-sm font-semibold text-[#A15A32]">+&euro; 210</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductExperience() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Wrap>
        <Eyebrow>Zo ziet het eruit</Eyebrow>
        <h2 className="font-display font-light text-primary text-[28px] leading-tight sm:text-4xl md:text-[42px] mb-4 max-w-[700px]">
          Van cijfers naar een persoonlijk beeld.
        </h2>
        <p className="font-body font-light text-text-soft text-lg leading-relaxed max-w-[620px] mb-12 md:mb-16">
          Je vult je huishouden en een paar belangrijke bedragen in. Daarna zie je waar jouw
          situatie afwijkt van vergelijkbare huishoudens.
        </p>

        <div className="hidden lg:grid grid-cols-[1fr_auto_1.3fr] gap-8 items-center mb-4">
          <SituatieKaart />
          <span className="font-display font-light text-text-muted text-4xl" aria-hidden="true">
            &rarr;
          </span>
          <UitkomstKaart />
        </div>
        <p className="hidden lg:block text-[13px] font-body italic text-text-muted mb-16">
          Voorbeeld van hoe de uitkomst eruitziet. Geen echte klant.
        </p>

        <div className="lg:hidden space-y-5 mb-12">
          <SituatieKaart />
          <div className="text-center font-display font-light text-text-muted text-2xl" aria-hidden="true">
            &darr;
          </div>
          <UitkomstKaart />
          <p className="text-[13px] font-body italic text-text-muted">
            Voorbeeld van hoe de uitkomst eruitziet. Geen echte klant.
          </p>
        </div>

        <div className="max-w-[620px] space-y-8 md:space-y-10 mb-12 md:mb-14">
          {ditZieJe.map((item) => (
            <div key={item.nr} className="flex gap-5 items-start">
              <span className="font-display font-light text-text-muted text-2xl leading-none pt-0.5 shrink-0">
                {item.nr}
              </span>
              <div>
                <p className="font-body font-semibold text-primary text-base mb-1">{item.titel}</p>
                <p className="font-body font-light text-text-soft text-[15px] leading-relaxed">
                  {item.tekst}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="mb-3">
            <CtaLink doel="analyse" href={analyseHref()} locatie="product-experience" className="btn-primary">
              Start de gratis analyse
            </CtaLink>
          </div>
          <p className="font-body text-text-muted text-sm">
            Je begint met je eigen situatie, niet met een standaard budget.
          </p>
        </div>
      </Wrap>
    </section>
  );
}

/* ─── Hoofdstuk 4: Case spotlight ─────────────────────────────────────────
   Uitsluitend echte velden uit lib/rapporten-data.ts. Geen verzonnen kop,
   geen verzonnen citaat. ──────────────────────────────────────────────── */

const CASE_SLUG = "tweeverdieners-drie-kinderen";

function CaseSpotlight() {
  const rapport = rapportVoorSlug(CASE_SLUG);
  if (!rapport) return null;
  const aantalAndere = RAPPORTEN.length - 1;

  return (
    <section className="bg-green-light py-16 md:py-24">
      <Wrap>
        <span className="block font-display font-light text-text-muted text-2xl mb-4" aria-hidden="true">
          01
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <Eyebrow>Een echt rapport</Eyebrow>
            <p className="section-eyebrow mb-2">Ze dachten</p>
            <p className="font-display font-light italic text-primary text-xl md:text-2xl leading-snug mb-8">
              &ldquo;{rapport.vermoeden}&rdquo;
            </p>
            <p className="section-eyebrow mb-2">Wat eruit kwam</p>
            <h2 className="font-display font-light text-primary text-[28px] leading-tight sm:text-4xl md:text-[42px]">
              {rapport.uitkomstKop}.
            </h2>
          </div>

          <div>
            <p className="section-eyebrow mb-3">Huishoudgegevens</p>
            <ul className="flex flex-wrap gap-x-2 gap-y-1 font-body text-sm text-primary mb-8 pb-8 border-b border-[#C7DAD4]">
              {rapport.kenmerken.map((k, i) => (
                <li key={k} className="font-medium">
                  {k}
                  {i < rapport.kenmerken.length - 1 && (
                    <span className="text-text-muted font-normal"> &middot; </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="font-body font-light text-text-soft text-base md:text-lg leading-relaxed mb-8">
              {rapport.uitkomst}
            </p>
            <div className="mb-4">
              <Link
                href={`/rapporten/${rapport.slug}`}
                className="inline-flex items-center gap-1.5 font-body font-semibold text-accent hover:underline text-[15px]"
              >
                Lees het volledige rapport <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <Link
              href="/rapporten"
              className="inline-flex items-center gap-1.5 font-body text-text-muted hover:text-primary hover:underline text-sm"
            >
              {aantalAndere} andere huishoudens bekeken <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ─── Hoofdstuk 5: Trust / human ──────────────────────────────────────────── */

const vertrouwenStatements = ["Geen financiële producten", "Geen provisie", "Persoonlijke analyse"];

function Trust() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Wrap>
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-16 items-center">
          <div
            className="relative overflow-hidden mx-auto lg:mx-0 w-[180px] h-[180px] lg:w-full rounded-xl"
            style={{ aspectRatio: "4 / 5" }}
          >
            <Image
              src="/jarno.jpg"
              alt="Jarno Koopman"
              fill
              sizes="(max-width: 1024px) 180px, 30vw"
              className="object-cover"
            />
          </div>

          <div>
            <Eyebrow>Waarom ik dit doe</Eyebrow>
            <h2 className="font-display font-light text-primary text-[26px] leading-snug sm:text-3xl md:text-4xl mb-6 max-w-[520px]">
              Als er niets mis is, zeg ik dat ook.
            </h2>
            <div className="space-y-4 font-body font-light text-text-soft text-base md:text-lg leading-relaxed max-w-[560px] mb-8">
              <p>
                Ik ben Waar blijft het? begonnen omdat ik zelf goed verdiende en jarenlang niet
                begreep waarom er toch minder overbleef dan ik verwachtte.
              </p>
              <p>
                Voor mijn werk houd ik me dagelijks bezig met financiële cijfers en software. Maar
                ik ontdekte dat cijfers alleen niet genoeg zijn. Je moet ze in de context van een
                huishouden kunnen plaatsen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-8">
              {vertrouwenStatements.map((s) => (
                <p key={s} className="font-body font-semibold text-primary text-sm pl-4 border-l-2 border-accent">
                  {s}
                </p>
              ))}
            </div>

            <Link
              href="/over"
              className="inline-flex items-center gap-1.5 font-body font-semibold text-accent hover:underline text-[15px]"
            >
              Lees mijn verhaal <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ─── Hoofdstuk 6: Slot-CTA ───────────────────────────────────────────────── */

function SlotCta() {
  return (
    <section className="bg-dark-block py-16 md:py-24">
      <Wrap>
        <div className="text-center max-w-[600px] mx-auto">
          <Eyebrow dark center>
            Jouw situatie
          </Eyebrow>
          <h2 className="font-display font-light text-white text-[28px] leading-tight sm:text-4xl md:text-[42px] mb-5">
            Benieuwd wat er bij jou opvalt?
          </h2>
          <p className="font-body font-light text-white/80 text-lg leading-relaxed mb-8 max-w-[440px] mx-auto">
            Vergelijk jouw eigen financiële situatie met vergelijkbare huishoudens en ontdek waar
            het verschil zit.
          </p>
          <div className="mb-4">
            <CtaLink doel="analyse" href={analyseHref()} locatie="slot" className="btn-primary">
              Start de gratis analyse
            </CtaLink>
          </div>
          <p className="font-body text-white/60 text-sm">Gratis om te starten.</p>
        </div>
      </Wrap>
    </section>
  );
}

export default function HomeConcept() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <EditorialInsight />
      <ProductExperience />
      <CaseSpotlight />
      <Trust />
      <SlotCta />
    </div>
  );
}
