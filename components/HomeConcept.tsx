"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import { RAPPORTEN, AANTAL_ZONDER_LEK, rapportVoorSlug } from "@/lib/rapporten-data";

/* ─────────────────────────────────────────────────────────────────────────
   Homepage-herontwerp, vijf hoofdstukken volgens de nieuwe informatiearchitectuur:
   1. Hero, 2. Wat komt er echt uit, 3. Wat krijg jij + hoe werkt het,
   4. Waarom vertrouwen, 5. Slot-CTA. Eén primaire route overal: /analyse.

   Kleuren en typografie ongewijzigd: het wijnrood/goud-palet is bewust en
   geldt alleen voor deze pagina (CLAUDE.md 6.8). Eén vaste sans-serif voor
   de hele pagina (Plus Jakarta Sans), geen Fraunces hier.
   ────────────────────────────────────────────────────────────────────────── */

const C = {
  wine: "#7B2D3E",
  gold: "#C9952A",
  offwhite: "#F8F6F2",
  white: "#FFFFFF",
  dark: "#202020",
  muted: "#666666",
  line: "#E7E2D8",
};

const FONT = "var(--font-plus-jakarta), system-ui, sans-serif";
const heading: React.CSSProperties = { fontFamily: FONT, fontWeight: 700, margin: 0 };

/* ─── Motion helpers (subtiele CountUp in de hero-preview) ──────────────── */

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const fn = () => setReduce(m.matches);
    m.addEventListener("change", fn);
    return () => m.removeEventListener("change", fn);
  }, []);
  return reduce;
}

function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

function CountUp({ to, prefix = "", suffix = "", duration = 900 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const seen = useInView(ref);
  const reduce = useReducedMotion();
  const [val, setVal] = useState(to);
  const [animeer, setAnimeer] = useState<boolean | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const zichtbaarBijLaden = r.top < window.innerHeight && r.bottom > 0;
    setAnimeer(!zichtbaarBijLaden);
    setVal(zichtbaarBijLaden ? to : 0);
  }, [to]);
  useEffect(() => {
    if (animeer !== true || !seen) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const ease = (p: number) => 1 - Math.pow(1 - p, 3);
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(ease(p) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animeer, seen, reduce, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("nl-NL")}
      {suffix}
    </span>
  );
}

/* ─── Layout- en typografiehelpers ──────────────────────────────────────── */

function Section({
  id,
  bg,
  children,
  className = "",
  padding = "standaard",
}: {
  id?: string;
  bg: string;
  children: React.ReactNode;
  className?: string;
  padding?: "standaard" | "hero" | "ruim" | "krap";
}) {
  const paddingClass =
    padding === "hero"
      ? "pt-[48px] pb-[64px] md:pt-[96px] md:pb-[96px]"
      : padding === "ruim"
      ? "pt-[72px] pb-[72px] md:pt-[128px] md:pb-[128px]"
      : padding === "krap"
      ? "pt-[48px] pb-[48px] md:pt-[72px] md:pb-[72px]"
      : "pt-[56px] pb-[56px] md:pt-[96px] md:pb-[96px]";
  return (
    <section id={id} className={paddingClass + " " + className} style={{ backgroundColor: bg }}>
      {children}
    </section>
  );
}

function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"max-w-[1200px] mx-auto px-5 md:px-10 " + className}>{children}</div>;
}

function Eyebrow({ children, color = C.muted, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <p
      className={"text-[13px] md:text-[14px] mb-3 md:mb-4 " + className}
      style={{ fontFamily: FONT, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color }}
    >
      {children}
    </p>
  );
}

function H1({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h1
      className="text-[36px] leading-[1.1] md:text-[60px] md:leading-[1.06] max-w-[760px]"
      style={{ ...heading, color }}
    >
      {children}
    </h1>
  );
}

function H2({ children, color = C.dark, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <h2
      className={"text-[30px] leading-[1.12] md:text-[40px] md:leading-[1.1] max-w-[700px] " + className}
      style={{ ...heading, color }}
    >
      {children}
    </h2>
  );
}

function H3({ children, color = C.dark, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <h3 className={"text-[20px] leading-[1.25] md:text-[22px] md:leading-[1.25] " + className} style={{ ...heading, color }}>
      {children}
    </h3>
  );
}

function Body({ children, color = C.muted, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <p
      className={"text-[17px] leading-[1.5] md:text-[18px] md:leading-[1.55] max-w-[640px] " + className}
      style={{ fontFamily: FONT, fontWeight: 400, color }}
    >
      {children}
    </p>
  );
}

function Small({ children, color = C.muted, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <p className={"text-[14px] leading-[1.45] " + className} style={{ fontFamily: FONT, fontWeight: 500, color }}>
      {children}
    </p>
  );
}

/* Eén vaste tekst onder elke primaire CTA op de hele pagina. */
function FrictionText({ color = "rgba(255,255,255,0.65)" }: { color?: string }) {
  return (
    <p className="text-[14px]" style={{ fontFamily: FONT, color }}>
      Gratis &middot; Geen account &middot; Geen verkoopgesprek
    </p>
  );
}

function CTAButton({
  href,
  locatie,
  children,
  full = false,
}: {
  href: string;
  locatie: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <CtaLink
      doel="analyse"
      href={href}
      locatie={locatie}
      className={
        "inline-flex items-center justify-center gap-2 transition-transform duration-150 hover:scale-[1.02] " +
        (full ? "w-full sm:w-auto" : "")
      }
      style={{
        backgroundColor: C.gold,
        color: C.dark,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: "16px",
        minHeight: "52px",
        paddingLeft: "28px",
        paddingRight: "28px",
        borderRadius: "8px",
      }}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </CtaLink>
  );
}

/* De secundaire linkstijl, altijd zichtbaar minder dominant dan CTAButton. */
function SecondaryLink({ href, children, color = C.wine }: { href: string; children: React.ReactNode; color?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 hover:underline"
      style={{ fontFamily: FONT, fontWeight: 600, fontSize: "15px", color }}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

/* Badge die een illustratie meer dan eens markeert als illustratie, nooit
   als echte klant. Verplicht op elke UI-preview op deze pagina. */
function VoorbeeldBadge() {
  return (
    <span
      className="inline-block px-2.5 py-1 rounded-full text-[11px]"
      style={{
        fontFamily: FONT,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: C.wine,
        backgroundColor: "rgba(123,45,62,0.08)",
      }}
    >
      Voorbeeld
    </span>
  );
}

/* ─── Databronnen: drie echte rapporten uit lib/rapporten-data.ts ───────────
   Werkregel 2 (CLAUDE.md): elk getal en citaat komt uit rapportVoorSlug(),
   nooit met de hand overgetypt. Gekozen situaties per opdracht: gezin met
   kinderen, stel met goed inkomen, zzp met wisselend inkomen. ────────────── */

const CASE_SLUGS = ["tweeverdieners-drie-kinderen", "stel-zonder-kinderen", "zzp-wisselend-inkomen"] as const;

const casesVoorHomepage = CASE_SLUGS.map((slug) => rapportVoorSlug(slug)).filter(
  (r): r is NonNullable<typeof r> => Boolean(r)
);

const ditZieJe = [
  {
    nr: "01",
    titel: "Hoeveel ruimte je waarschijnlijk hebt",
    tekst:
      "Niet alleen wat er binnenkomt, maar hoeveel er onderaan de streep realistisch beschikbaar kan zijn.",
  },
  {
    nr: "02",
    titel: "Waar jouw situatie opvalt",
    tekst:
      "Zie welke onderdelen hoger, lager of anders zijn dan bij vergelijkbare huishoudens.",
  },
  {
    nr: "03",
    titel: "Wat dat betekent",
    tekst:
      "Soms is er iets om te veranderen. Soms blijkt dat er financieel weinig geks aan de hand is.",
  },
];

const zoWerktHet = [
  {
    nr: "01",
    titel: "Vul je situatie in",
    tekst: "Inkomen, huishouden en belangrijkste uitgaven.",
  },
  {
    nr: "02",
    titel: "Bekijk je vergelijking",
    tekst: "Je ziet direct waar jouw situatie opvalt.",
  },
  {
    nr: "03",
    titel: "Kies zelf wat je ermee doet",
    tekst: "Wil je alleen inzicht, of wil je daarna verder kijken?",
  },
];

const vertrouwenStatements = [
  "Ik verkoop geen hypotheek, belegging of verzekering.",
  "Ik ontvang geen commissie als jij iets afsluit.",
  "Als er niets geks uitkomt, dan zeg ik dat ook.",
];

/* ─── Hoofdstuk-onderdelen ───────────────────────────────────────────────── */

function CaseCard({ nr, rapport }: { nr: string; rapport: NonNullable<ReturnType<typeof rapportVoorSlug>> }) {
  return (
    <div>
      <span
        className="block text-[28px] md:text-[32px] mb-4"
        style={{ ...heading, color: C.gold, lineHeight: 1 }}
      >
        {nr}
      </span>
      <Small color={C.wine} className="uppercase tracking-[0.1em] mb-4">
        {rapport.chip}
      </Small>
      <Small color={C.muted} className="uppercase tracking-[0.1em] mb-2">
        Ze dachten
      </Small>
      <p className="text-[17px] leading-[1.5] mb-5" style={{ fontFamily: FONT, fontWeight: 500, color: C.dark, fontStyle: "italic" }}>
        &ldquo;{rapport.vermoeden}&rdquo;
      </p>
      <div className="flex items-center gap-2 mb-5" style={{ color: C.gold }} aria-hidden="true">
        <span style={{ height: "1px", width: "24px", backgroundColor: C.line, display: "inline-block" }} />
        <span className="text-[13px]" style={{ fontFamily: FONT, fontWeight: 700 }}>
          &darr;
        </span>
      </div>
      <Small color={C.muted} className="uppercase tracking-[0.1em] mb-2">
        Wat eruit kwam
      </Small>
      <p className="text-[22px] md:text-[24px] leading-[1.25] mb-3" style={{ ...heading, color: C.wine }}>
        {rapport.uitkomstKop}
      </p>
      <Body className="mb-0">{rapport.uitkomst}</Body>
    </div>
  );
}

function TimelineGroep({
  label,
  items,
}: {
  label: string;
  items: { nr: string; titel: string; tekst: string; extra?: React.ReactNode }[];
}) {
  return (
    <div>
      <Small color={C.wine} className="uppercase tracking-[0.14em] mb-5">
        {label}
      </Small>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.nr} className="flex gap-4 items-start">
            <div
              className="shrink-0 flex items-center justify-center rounded-full"
              style={{ width: "36px", height: "36px", backgroundColor: C.gold }}
            >
              <span style={{ ...heading, fontSize: "14px", color: C.dark }}>{item.nr}</span>
            </div>
            <div className="pt-1">
              <H3 className="mb-1.5">{item.titel}</H3>
              <Body className="mb-0">{item.tekst}</Body>
              {item.extra}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomeConcept() {
  return (
    <div style={{ fontFamily: FONT }} className="overflow-x-hidden">
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <Section bg={C.wine} padding="hero">
        <Wrap>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <Eyebrow color="rgba(255,255,255,0.75)">Persoonlijke geldanalyse</Eyebrow>
              <H1 color={C.white}>Je verdient goed. Toch houd je minder over dan je verwacht.</H1>
              <p
                className="mt-6 mb-8 text-[17px] leading-[1.5] md:text-[18px] md:leading-[1.55] max-w-[520px]"
                style={{ fontFamily: FONT, fontWeight: 400, color: "rgba(255,255,255,0.88)" }}
              >
                Ontdek gratis hoeveel financiële ruimte er in jouw situatie zit en waar jouw geld anders heen gaat
                dan je denkt.
              </p>
              <div className="mb-4">
                <CTAButton href={analyseHref()} locatie="hero" full>
                  Start de gratis analyse
                </CTAButton>
              </div>
              <FrictionText />
            </div>

            <div>
              <div
                style={{
                  backgroundColor: C.white,
                  borderRadius: "8px",
                  padding: "1.75rem",
                  boxShadow: "0 24px 60px -24px rgba(0,0,0,0.45)",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: "15px", color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Geschatte financiële ruimte
                  </span>
                  <VoorbeeldBadge />
                </div>
                <span
                  className="block text-[44px] md:text-[52px] mb-2"
                  style={{ ...heading, color: C.dark, lineHeight: 1 }}
                >
                  <CountUp to={1950} prefix="&euro; " />
                </span>
                <Small color={C.muted} className="mb-5">per maand</Small>
                <div style={{ height: "1px", backgroundColor: C.line, margin: "0 0 1.1rem" }} />
                <p className="text-[15px] leading-[1.5]" style={{ fontFamily: FONT, color: C.muted }}>
                  Voor een vergelijkbaar huishouden verwachten we ongeveer{" "}
                  <strong style={{ color: C.dark, fontWeight: 700 }}>&euro; 1.640</strong> per maand.
                </p>
              </div>
              <p className="text-center mt-4 text-[14px]" style={{ fontFamily: FONT, color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
                Voorbeelduitkomst van de analyse. Geen echte klant.
              </p>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── 2. WAT KOMT ER ECHT UIT? ─────────────────────────────────────── */}
      <Section bg={C.white}>
        <Wrap>
          <Eyebrow>Dit kwam er bij anderen uit</Eyebrow>
          <H2 className="mb-4 md:mb-5">Misschien zit het probleem ergens anders dan je denkt.</H2>
          <Body className="mb-12 md:mb-16">
            Vijf huishoudens dachten vooraf te weten waar het probleem zat. De uitkomst was niet altijd wat ze
            verwachtten.
          </Body>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {casesVoorHomepage.map((rapport, i) => (
              <CaseCard key={rapport.slug} nr={String(i + 1).padStart(2, "0")} rapport={rapport} />
            ))}
          </div>

          <div className="mt-12 md:mt-16 pt-8 md:pt-10" style={{ borderTop: "1px solid " + C.line }}>
            <Small color={C.dark} className="mb-6 md:mb-0">
              Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} rapporten hierboven was de conclusie: er viel niets
              te repareren.
            </Small>
            <div className="mt-6">
              <SecondaryLink href="/rapporten">Bekijk alle echte rapporten</SecondaryLink>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── 3. WAT KRIJG JIJ + HOE WERKT HET ─────────────────────────────── */}
      <Section bg={C.offwhite}>
        <Wrap>
          <Eyebrow>Wat je krijgt</Eyebrow>
          <H2 className="mb-4 md:mb-5">Zie wat er bij jou opvalt.</H2>
          <Body className="mb-10 md:mb-14">
            Vul je situatie in en vergelijk jouw huishouden met vergelijkbare situaties.
          </Body>

          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
            {/* Echte UI-preview, illustratief, tweemaal gelabeld als voorbeeld */}
            <div className="lg:sticky lg:top-24">
              <div
                style={{
                  backgroundColor: C.white,
                  borderRadius: "8px",
                  padding: "1.75rem",
                  boxShadow: "0 16px 40px -20px rgba(32,32,32,0.18)",
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <H3 className="mb-0">Waar jij opvalt</H3>
                  <VoorbeeldBadge />
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Boodschappen", bedrag: "€ 820", tag: "Hoger", kleur: C.wine, achtergrond: "rgba(123,45,62,0.08)" },
                    { label: "Wonen", bedrag: "€ 1.740", tag: "Vergelijkbaar", kleur: C.dark, achtergrond: "rgba(32,32,32,0.06)" },
                    { label: "Vervoer", bedrag: "€ 465", tag: "Lager", kleur: C.muted, achtergrond: "rgba(102,102,102,0.08)" },
                  ].map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-3 pb-4" style={{ borderBottom: "1px solid " + C.line }}>
                      <div>
                        <p className="text-[15px] mb-1" style={{ fontFamily: FONT, fontWeight: 600, color: C.dark }}>
                          {r.label}
                        </p>
                        <p className="tabular-nums text-[15px]" style={{ fontFamily: FONT, color: C.muted }}>
                          {r.bedrag}
                        </p>
                      </div>
                      <span
                        className="px-2.5 py-1 rounded-full text-[12px] shrink-0"
                        style={{ fontFamily: FONT, fontWeight: 700, color: r.kleur, backgroundColor: r.achtergrond }}
                      >
                        {r.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-[14px]" style={{ fontFamily: FONT, color: C.muted, fontStyle: "italic" }}>
                Voorbeeld van hoe de vergelijking eruitziet. Geen echte klant.
              </p>
            </div>

            {/* Eén doorlopende tijdlijn: wat je ziet, daarna hoe het werkt */}
            <div className="space-y-10">
              <TimelineGroep label="Dit zie je" items={ditZieJe} />
              <div style={{ height: "1px", backgroundColor: C.line }} />
              <TimelineGroep
                label="Zo werkt het"
                items={zoWerktHet.map((item, i) =>
                  i === zoWerktHet.length - 1
                    ? {
                        ...item,
                        extra: (
                          <p className="mt-2">
                            <CtaLink
                              doel="geldscan"
                              href="/geldscan"
                              locatie="wat-krijg-jij-stap-3"
                              className="underline text-[15px]"
                              style={{ fontFamily: FONT, fontWeight: 600, color: C.wine }}
                            >
                              Bekijk de Geldscan
                            </CtaLink>
                          </p>
                        ),
                      }
                    : item
                )}
              />
            </div>
          </div>

          <div className="mt-14 md:mt-16 text-center">
            <div className="mb-4 inline-block">
              <CTAButton href={analyseHref()} locatie="wat-je-krijgt">
                Start de gratis analyse
              </CTAButton>
            </div>
            <div>
              <FrictionText color={C.muted} />
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── 4. WAAROM VERTROUWEN ─────────────────────────────────────────── */}
      <Section bg={C.white} padding="ruim">
        <Wrap>
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-center">
            <div className="relative overflow-hidden mx-auto lg:mx-0 w-[160px] h-[160px] lg:w-full lg:h-auto" style={{ borderRadius: "8px", aspectRatio: "4 / 5" }}>
              <Image src="/jarno.jpg" alt="Jarno Koopman" fill sizes="(max-width: 1024px) 160px, 32vw" style={{ objectFit: "cover" }} />
            </div>
            <div>
              <H2 className="mb-6 md:mb-8">Geen financieel product. Geen verborgen belang.</H2>
              <div className="mb-8 md:mb-10 space-y-4">
                {vertrouwenStatements.map((s) => (
                  <p
                    key={s}
                    className="text-[17px] md:text-[18px] leading-[1.5] pl-5"
                    style={{ fontFamily: FONT, fontWeight: 600, color: C.dark, borderLeft: "3px solid " + C.gold }}
                  >
                    {s}
                  </p>
                ))}
              </div>
              <Body className="mb-4">
                Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte.
              </Body>
              <SecondaryLink href="/over">Lees waarom ik dit doe</SecondaryLink>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── 5. SLOTCTA ───────────────────────────────────────────────────── */}
      <Section bg={C.wine}>
        <Wrap>
          <div className="text-center max-w-[680px] mx-auto">
            <Eyebrow color="rgba(255,255,255,0.75)" className="text-center">
              Jouw situatie
            </Eyebrow>
            <h2
              className="text-[30px] leading-[1.15] md:text-[42px] md:leading-[1.15] mx-auto mb-6"
              style={{ ...heading, color: C.white }}
            >
              Benieuwd wat er bij jou opvalt?
            </h2>
            <p
              className="text-[17px] leading-[1.5] md:text-[18px] md:leading-[1.55] mx-auto mb-8 md:mb-10"
              style={{ fontFamily: FONT, fontWeight: 400, color: "rgba(255,255,255,0.85)", maxWidth: "480px" }}
            >
              Vergelijk jouw eigen situatie gratis en ontdek hoeveel financiële ruimte er in jouw huishouden zit.
            </p>
            <div className="mb-4 inline-block">
              <CTAButton href={analyseHref()} locatie="slot">
                Start de gratis analyse
              </CTAButton>
            </div>
            <div>
              <FrictionText />
            </div>
          </div>
        </Wrap>
      </Section>
    </div>
  );
}
