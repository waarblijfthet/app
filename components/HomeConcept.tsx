"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";

/* ─────────────────────────────────────────────────────────────────────────
   Kleuren en typografie, exact volgens het herontwerp. Eén vaste sans-serif
   voor de hele homepage (Plus Jakarta Sans, al aanwezig als --font-plus-jakarta
   in app/layout.tsx). Headings krijgen die font-family expliciet inline mee,
   want globals.css zet h1-h6 standaard op Fraunces voor de rest van de site.
   ────────────────────────────────────────────────────────────────────────── */

const C = {
  wine: "#7B2D3E",
  gold: "#C9952A",
  offwhite: "#F8F6F2",
  white: "#FFFFFF",
  dark: "#202020",
  muted: "#666666",
};

const FONT = "var(--font-plus-jakarta), system-ui, sans-serif";
const heading: React.CSSProperties = { fontFamily: FONT, fontWeight: 700, margin: 0 };

/* ─── Motion helpers (alleen voor de subtiele CountUp in de hero) ───────── */

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

function CountUp({ to, prefix = "", suffix = "", duration = 1000 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const seen = useInView(ref);
  const reduce = useReducedMotion();
  // Staat het getal al in beeld bij het laden, toon dan meteen de eindwaarde.
  // Alleen animeren wat bij het laden buiten beeld stond (zie eerdere sessie:
  // anders las de bezoeker "€ 0" in de hero).
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
}: {
  id?: string;
  bg: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={"py-16 md:py-24 " + className} style={{ backgroundColor: bg }}>
      {children}
    </section>
  );
}

function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"max-w-[1200px] mx-auto px-5 md:px-10 " + className}>{children}</div>;
}

function Eyebrow({ children, color = C.muted }: { children: React.ReactNode; color?: string }) {
  return (
    <p
      className="text-[13px] mb-4 md:mb-5"
      style={{ fontFamily: FONT, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color }}
    >
      {children}
    </p>
  );
}

function H1({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h1
      className="text-[40px] leading-[1.08] md:text-[64px] md:leading-[1.05] max-w-[780px]"
      style={{ ...heading, color }}
    >
      {children}
    </h1>
  );
}

function H2({ children, color = C.dark, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <h2
      className={"text-[32px] leading-[1.1] md:text-[42px] md:leading-[1.1] max-w-[700px] " + className}
      style={{ ...heading, color }}
    >
      {children}
    </h2>
  );
}

function H3({ children, color = C.dark, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <h3 className={"text-[22px] leading-[1.2] md:text-[24px] md:leading-[1.2] " + className} style={{ ...heading, color }}>
      {children}
    </h3>
  );
}

function Body({ children, color = C.muted, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <p
      className={"text-[17px] leading-[1.5] md:text-[18px] md:leading-[1.55] max-w-[680px] " + className}
      style={{ fontFamily: FONT, fontWeight: 400, color }}
    >
      {children}
    </p>
  );
}

function Small({ children, color = C.muted, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <p className={"text-[15px] leading-[1.45] " + className} style={{ fontFamily: FONT, fontWeight: 500, color }}>
      {children}
    </p>
  );
}

function BigNumber({ children, color = C.dark }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="text-[36px] md:text-[48px] block" style={{ ...heading, color, lineHeight: 1 }}>
      {children}
    </span>
  );
}

function CTAButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto transition-transform duration-150 hover:scale-[1.02]"
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
    </Link>
  );
}

/* De ene toegestane secundaire CTA op de hele pagina. */
function SecondaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 hover:underline"
      style={{ fontFamily: FONT, fontWeight: 600, fontSize: "15px", color: "inherit" }}
    >
      {children}
      <span aria-hidden="true">&rarr;</span>
    </a>
  );
}

/* ─── Databronnen: echte rapporten en testimonials, ongewijzigd overgenomen ─
   uit de bestaande homepage-copy en lib/rapporten-data.ts. Geen nieuwe
   klantcases, geen aangepaste bedragen. ────────────────────────────────── */

const bewijsRapporten = [
  {
    label: "Hier dachten ze dat boodschappen het probleem waren.",
    r: RAPPORTEN.find((r) => r.slug === "tweeverdieners-drie-kinderen")!,
  },
  {
    label: "Hier bleek de financiële ruimte kleiner dan verwacht.",
    r: RAPPORTEN.find((r) => r.slug === "alleenstaand-huurwoning")!,
  },
  {
    label: "Hier was er eigenlijk niets mis.",
    r: RAPPORTEN.find((r) => r.slug === "stel-zonder-kinderen")!,
  },
];

const testimonials = [
  {
    quote:
      "Elk jaar werden we overvallen door verjaardagen, de vakantie en december. We hebben die kosten uitgerekend en opgesplitst in kleine potjes per maand. Nu staat de kerstpot er gewoon.",
    naam: "Daan & Roos",
    detail: "Twee kinderen, koopwoning",
  },
  {
    quote:
      "Onze boodschappen waren een zwart gat: impulsaankopen, nooit een plan. Samen een weekbudget gezet en na elke boodschappenronde een korte check-in. Dat hield ons scherp.",
    naam: "Bram & Eva",
    detail: "Gezin van vier, twee inkomens",
  },
  {
    quote:
      "De BSO-kosten liepen de pan uit. In plaats van alleen bezuinigen dachten we samen na over flexibeler werken. Twee dagen minder opvang scheelt fors, en het is rustiger thuis.",
    naam: "Karim & Noor",
    detail: "Twee jonge kinderen",
  },
];

const watDoeIk = [
  {
    nr: "01",
    titel: "Waar wijk je af?",
    tekst:
      "Je vult je woonsituatie, inkomen, woonlasten, vervoer en dagelijkse uitgaven in. Ik leg die posten naast huishoudens met een vergelijkbaar inkomen en dezelfde gezinsgrootte.",
  },
  {
    nr: "02",
    titel: "Wat is eigenlijk normaal?",
    tekst:
      "Je ziet niet alleen je eigen cijfers, maar ook wat gebruikelijk is bij een vergelijkbare situatie. Zo weet je of 820 euro boodschappen veel is, of gewoon normaal.",
  },
  {
    nr: "03",
    titel: "Wat betekent dat voor jou?",
    tekst:
      "Het resultaat staat direct op je scherm: hoeveel ruimte er in jouw situatie te verwachten is, hoeveel er werkelijk overblijft, en welke twee of drie posten eruit springen.",
  },
];

const doelgroepen = [
  { label: "Goed inkomen, weinig over", href: "/analyse" },
  { label: "Gezin met kinderen", href: "/rapporten/tweeverdieners-drie-kinderen" },
  { label: "Samen goed verdienen", href: "/rapporten/stel-zonder-kinderen" },
  { label: "ZZP / wisselend inkomen", href: "/rapporten/zzp-wisselend-inkomen" },
];

export default function HomeConcept() {
  return (
    <div style={{ fontFamily: FONT }} className="overflow-x-hidden">
      {/* ── 1. HERO, probleem + gratis analyse ──────────────────────────── */}
      <Section bg={C.wine} className="pt-28 pb-16 md:pt-32 md:pb-20">
        <Wrap>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Eyebrow color="rgba(255,255,255,0.75)">Persoonlijke geldanalyse</Eyebrow>
              <H1 color={C.white}>Je verdient goed. Toch houd je minder over dan je verwacht.</H1>
              <p
                className="mt-6 mb-8 text-[17px] leading-[1.5] md:text-[18px] md:leading-[1.55] max-w-[520px]"
                style={{ fontFamily: FONT, fontWeight: 400, color: "rgba(255,255,255,0.88)" }}
              >
                Waar blijft het analyseert jouw volledige huishouden en laat zien waar je afwijkt, wat normaal is
                en wat er werkelijk speelt.
              </p>
              <div className="mb-3">
                <CTAButton href="/analyse">Doe de gratis analyse</CTAButton>
              </div>
              <p className="mb-7 text-[14px]" style={{ fontFamily: FONT, color: "rgba(255,255,255,0.65)" }}>
                Gratis &bull; onafhankelijk &bull; geen verplichtingen
              </p>
              <div style={{ color: "rgba(255,255,255,0.85)" }}>
                <SecondaryLink href="#hoe-het-werkt">Lees hoe het werkt</SecondaryLink>
              </div>
            </div>

            <div>
              <div
                style={{
                  backgroundColor: C.white,
                  borderRadius: "8px",
                  padding: "1.75rem 1.75rem 2rem",
                  boxShadow: "0 24px 60px -24px rgba(0,0,0,0.45)",
                }}
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: "17px", color: C.dark }}>
                    Netto inkomen
                  </span>
                  <span className="tabular-nums" style={{ fontFamily: FONT, fontWeight: 700, fontSize: "20px", color: C.dark }}>
                    &euro; 5.400
                  </span>
                </div>
                <div style={{ height: "1px", backgroundColor: "#E7E2D8", margin: "0.9rem 0 1.1rem" }} />
                <div className="space-y-3">
                  {[
                    ["Wonen", "€ 1.740"],
                    ["Boodschappen", "€ 820"],
                    ["Vervoer", "€ 465"],
                    ["Verzekeringen", "€ 390"],
                    ["Abonnementen", "€ 118"],
                  ].map(([label, amount]) => (
                    <div key={label} className="flex items-baseline gap-3">
                      <span style={{ fontFamily: FONT, fontSize: "15px", color: C.muted }}>{label}</span>
                      <span aria-hidden="true" className="flex-1" style={{ borderBottom: "1px dotted #E7E2D8", transform: "translateY(-4px)" }} />
                      <span className="tabular-nums" style={{ fontFamily: FONT, fontSize: "15px", color: C.muted }}>
                        {amount}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ height: "2px", borderTop: `1px solid ${C.dark}`, borderBottom: `1px solid ${C.dark}`, margin: "1.3rem 0 1.1rem" }} aria-hidden="true" />
                <div className="flex items-baseline justify-between">
                  <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: "17px", color: C.dark }}>Onverklaard</span>
                  <span className="tabular-nums" style={{ fontFamily: FONT, fontWeight: 700, fontSize: "26px", color: C.gold }}>
                    <CountUp to={412} prefix="€ " />
                  </span>
                </div>
              </div>
              <p className="text-center mt-4 text-[13px]" style={{ fontFamily: FONT, color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>
                Illustratie van een geldscan-uitkomst, geen echte klant.
              </p>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── 2. WAT DOE IK? ───────────────────────────────────────────────── */}
      <Section bg={C.white}>
        <Wrap>
          <Eyebrow>Wat gebeurt hier eigenlijk?</Eyebrow>
          <H2 className="mb-12 md:mb-16">Niet &ldquo;waar kan ik besparen?&rdquo;, maar wat er echt speelt.</H2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {watDoeIk.map((s) => (
              <div key={s.nr}>
                <BigNumber color={C.gold}>{s.nr}</BigNumber>
                <H3 className="mt-4 mb-3">{s.titel}</H3>
                <Body>{s.tekst}</Body>
              </div>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── 3. BANKAPP VERSUS CONTEXT ────────────────────────────────────── */}
      <Section bg={C.offwhite}>
        <Wrap>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <H2 className="mb-0">
              Je bankapp weet hoeveel je uitgeeft.
              <br />
              Maar niet of dat veel is voor jouw huishouden.
            </H2>
            <div style={{ backgroundColor: C.white, borderRadius: "8px", padding: "2.25rem" }}>
              <Small color={C.muted} className="uppercase tracking-[0.14em] mb-2">
                Voorbeeld
              </Small>
              <BigNumber color={C.dark}>&euro; 1.200 boodschappen</BigNumber>
              <p className="mt-4 text-[18px] leading-[1.5]" style={{ fontFamily: FONT, fontWeight: 600, color: C.dark }}>
                Veel?
                <br />
                Misschien.
                <br />
                Misschien ook helemaal niet.
              </p>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── 4. ECHTE RAPPORTEN, het zwaarste bewijsblok ─────────────────── */}
      <Section bg={C.white}>
        <Wrap>
          <Eyebrow>Wat je krijgt</Eyebrow>
          <H2 className="mb-4">Dit is geen standaard budgetadvies.</H2>
          <Body className="mb-12 md:mb-14">Dit is wat een echte analyse oplevert.</Body>

          <div className="flex gap-5 overflow-x-auto pb-4 -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-7 md:overflow-visible mb-14">
            {bewijsRapporten.map(({ label, r }) => (
              <Link
                key={r.slug}
                href={`/rapporten/${r.slug}`}
                className="block shrink-0 w-[82vw] sm:w-[420px] md:w-auto transition-transform duration-150 hover:-translate-y-1"
                style={{
                  backgroundColor: C.offwhite,
                  borderRadius: "8px",
                  padding: "1.75rem",
                  borderTop: `4px solid ${C.gold}`,
                }}
              >
                <Small color={C.wine} className="mb-3">
                  {label}
                </Small>
                <H3 className="mb-3">{r.verhaalTitel}</H3>
                <Small color={C.muted} className="mb-5">
                  {r.kenmerken.join(" · ")}
                </Small>
                <div style={{ height: "1px", backgroundColor: "#E7E2D8", margin: "0 0 1rem" }} />
                <p className="text-[15px] leading-[1.5] mb-2" style={{ fontFamily: FONT, fontWeight: 600, color: C.dark }}>
                  Vermoeden
                </p>
                <p className="text-[15px] leading-[1.5] mb-4" style={{ fontFamily: FONT, color: C.muted }}>
                  &ldquo;{r.vermoeden}&rdquo;
                </p>
                <p className="text-[15px] leading-[1.5] mb-2" style={{ fontFamily: FONT, fontWeight: 600, color: C.dark }}>
                  Uitkomst
                </p>
                <p className="text-[15px] leading-[1.5]" style={{ fontFamily: FONT, color: C.muted }}>
                  {r.uitkomstKop}
                </p>
              </Link>
            ))}
          </div>

          <SecondaryLink href="/rapporten">
            <span style={{ color: C.wine }}>Bekijk alle vijf de rapporten</span>
          </SecondaryLink>

          {/* Compacte testimonial-strook, bewust kleiner dan de rapportkaarten hierboven */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14 pt-14" style={{ borderTop: "1px solid #E7E2D8" }}>
            {testimonials.map((t) => (
              <div key={t.naam}>
                <p className="text-[15px] leading-[1.45] mb-3" style={{ fontFamily: FONT, color: C.muted }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-[15px]" style={{ fontFamily: FONT, fontWeight: 700, color: C.dark }}>
                  {t.naam}
                </p>
                <p className="text-[13px]" style={{ fontFamily: FONT, color: C.muted }}>
                  {t.detail}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px]" style={{ fontFamily: FONT, color: C.muted }}>
            Namen zijn aangepast voor privacy. Ervaringen van echte gezinnen.
          </p>
        </Wrap>
      </Section>

      {/* ── 5. SOMS IS ER NIETS MIS, merksectie ─────────────────────────── */}
      <Section bg={C.dark}>
        <Wrap>
          <div className="max-w-[700px]">
            <H2 color={C.white} className="mb-6">
              Soms is er niets om te repareren.
            </H2>
            <p
              className="text-[22px] md:text-[24px] leading-[1.3] mb-8"
              style={{ fontFamily: FONT, fontWeight: 700, color: "rgba(255,255,255,0.85)" }}
            >
              Dat zeggen we ook.
            </p>
            <Body color="rgba(255,255,255,0.72)" className="mb-6">
              Niet ieder huishouden dat weinig spaart heeft een financieel probleem. Soms is het inkomen, de
              gezinssituatie en het uitgavenpatroon simpelweg logisch.
            </Body>
            <Small color="rgba(255,255,255,0.5)">
              Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} rapporten hierboven was de conclusie: er valt niets
              te repareren.
            </Small>
          </div>
        </Wrap>
      </Section>

      {/* ── 6. JARNO, vertrouwen ─────────────────────────────────────────── */}
      <Section bg={C.offwhite}>
        <Wrap>
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-center">
            <div className="relative overflow-hidden" style={{ borderRadius: "8px", aspectRatio: "4 / 5" }}>
              <Image src="/jarno.jpg" alt="Jarno Koopman" fill sizes="(max-width: 1024px) 100vw, 40vw" style={{ objectFit: "cover" }} />
            </div>
            <div>
              <Eyebrow>Waarom ik dit doe</Eyebrow>
              <H2 className="mb-6">Ik bouw financiële software voor mijn werk. Toch wist ik zelf niet waar ons geld bleef.</H2>
              <Body className="mb-8">
                Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte. Inmiddels leg ik jouw
                posten naast huishoudens met een vergelijkbaar inkomen en dezelfde gezinsgrootte, en kijk waar jij
                eruit springt. Ik werk onafhankelijk, verkoop geen financiële producten en krijg geen provisie. Het
                enige dat ik lever is inzicht, geen abonnement en geen doorlopend traject.
              </Body>
              <div className="flex flex-wrap gap-x-8 gap-y-2">
                {["Geen producten", "Geen provisie", "Geen belang bij de uitkomst"].map((t) => (
                  <span key={t} className="text-[15px]" style={{ fontFamily: FONT, fontWeight: 700, color: C.wine }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── 7. HOE HET WERKT ─────────────────────────────────────────────── */}
      <Section bg={C.white} id="hoe-het-werkt">
        <Wrap>
          <Eyebrow>Hoe het werkt</Eyebrow>
          <H2 className="mb-12 md:mb-16">Drie stappen. Geen verplichtingen.</H2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            <div>
              <BigNumber color={C.gold}>1</BigNumber>
              <H3 className="mt-4 mb-3">Doe de gratis analyse</H3>
              <Body>
                Vijf korte stappen: woonsituatie, inkomen, woonlasten, vervoer en dagelijkse uitgaven. Geen account,
                geen bankkoppeling, 5 minuten.
              </Body>
            </div>
            <div>
              <BigNumber color={C.gold}>2</BigNumber>
              <H3 className="mt-4 mb-3">Zie waar je afwijkt</H3>
              <Body>
                Direct op je scherm: hoeveel ruimte er normaal gesproken is, hoeveel er werkelijk overblijft en
                welke twee of drie posten eruit springen.
              </Body>
            </div>
            <div style={{ backgroundColor: C.offwhite, borderRadius: "8px", padding: "1.75rem" }}>
              <BigNumber color={C.gold}>3</BigNumber>
              <H3 className="mt-4 mb-3">Bepaal of je verder wilt</H3>
              <Body className="mb-0">
                Wil je weten waarom je afwijkt en wat je ermee moet doen? Dan kun je de{" "}
                <Link href="/aanbod/intake?pakket=geldscan" className="underline" style={{ color: C.wine }}>
                  Geldscan bestellen
                </Link>
                , voor €49 eenmalig.
              </Body>
            </div>
          </div>
        </Wrap>
      </Section>

      {/* ── 8. DOELGROEP, drastisch beperkt ─────────────────────────────── */}
      <Section bg={C.offwhite}>
        <Wrap>
          <H2 className="mb-10 md:mb-12">Herkenbaar?</H2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {doelgroepen.map((d) => (
              <Link
                key={d.label}
                href={d.href}
                className="block transition-colors hover:border-[#7B2D3E]"
                style={{ backgroundColor: C.white, border: "1px solid #E7E2D8", borderRadius: "8px", padding: "1.5rem 1.75rem" }}
              >
                <span className="text-[22px] md:text-[24px]" style={{ ...heading, color: C.dark }}>
                  {d.label}
                </span>
              </Link>
            ))}
          </div>
        </Wrap>
      </Section>

      {/* ── 9. SLOT CTA ──────────────────────────────────────────────────── */}
      <Section bg={C.wine}>
        <Wrap>
        <div className="text-center max-w-[760px] mx-auto">
          <h2
            className="text-[32px] leading-[1.15] md:text-[42px] md:leading-[1.15] mx-auto mb-6"
            style={{ ...heading, color: C.white }}
          >
            Je hoeft niet meteen minder uit te geven.
            <br />
            Je moet eerst weten wat er gebeurt.
          </h2>
          <p
            className="text-[17px] leading-[1.5] md:text-[18px] md:leading-[1.55] mx-auto mb-9"
            style={{ fontFamily: FONT, fontWeight: 400, color: "rgba(255,255,255,0.85)", maxWidth: "540px" }}
          >
            Ik kijk persoonlijk naar jouw cijfers en schrijf op wat er opvalt, wat er niet opvalt, en wat ik zou
            doen. Als er niets misgaat, lees je dat.
          </p>
          <CTAButton href="/analyse">Doe de gratis analyse</CTAButton>
          <p className="mt-6 text-[14px]" style={{ fontFamily: FONT, color: "rgba(255,255,255,0.6)" }}>
            Geen abonnement. Geen verplicht gesprek.
          </p>
        </div>
        </Wrap>
      </Section>
    </div>
  );
}
