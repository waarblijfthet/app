"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Caveat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
  display: "swap",
});

/* ── Kleuren: warm papier + inkt ─────────────────────────── */
const C = {
  paper: "#EDE3CF",
  paper2: "#F7F0E0",
  card: "#FBF6EA",
  ink: "#2B2620",
  inkSoft: "#5A5045",
  pencil: "#93897A",
  green: "#1C3A2A",
  terra: "#C4603A",
  red: "#B0402A",
  rule: "rgba(43,38,32,0.13)",
  ruleSoft: "rgba(43,38,32,0.07)",
};

/* ── Hooks ───────────────────────────────────────────────── */
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

/* ── Handgetekende inkt-onderstreping ────────────────────── */
function InkUnderline({
  color = C.terra,
  width = 3,
  delay = 0,
  className = "",
}: {
  color?: string;
  width?: number;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement | null>(null);
  const seen = useInView(ref);
  const reduce = useReducedMotion();
  const len = 320;
  return (
    <svg
      ref={ref}
      className={className}
      viewBox="0 0 300 14"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M3 8 C 55 3, 110 12, 165 6 C 210 1, 255 11, 297 6"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        style={{
          strokeDasharray: len,
          strokeDashoffset: reduce ? 0 : seen ? 0 : len,
          transition: `stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        }}
      />
    </svg>
  );
}

/* ── Optellende teller (als een rekenmachine) ────────────── */
function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1100,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const seen = useInView(ref);
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!seen) return;
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
  }, [seen, reduce, to, duration]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("nl-NL")}
      {suffix}
    </span>
  );
}

/* ── Grootboek-regel met stippellijn ─────────────────────── */
function LedgerRow({
  label,
  amount,
  strong = false,
}: {
  label: string;
  amount: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span
        style={{
          color: strong ? C.ink : C.inkSoft,
          fontWeight: strong ? 500 : 400,
          fontSize: strong ? "1rem" : "0.95rem",
        }}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className="flex-1"
        style={{
          borderBottom: `1px dotted ${C.rule}`,
          transform: "translateY(-4px)",
        }}
      />
      <span
        className="tabular-nums"
        style={{
          color: strong ? C.ink : C.inkSoft,
          fontWeight: strong ? 500 : 400,
          fontSize: strong ? "1rem" : "0.95rem",
          letterSpacing: "0.01em",
        }}
      >
        {amount}
      </span>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "Elk jaar werden we overvallen door verjaardagen, de vakantie en december. We hebben die kosten uitgerekend en opgesplitst in kleine potjes per maand. Nu staat de kerstpot er gewoon. Geen stress meer in de dure maanden.",
    naam: "Daan & Roos",
    detail: "Twee kinderen, koopwoning",
    resultaat: "Geen verrassingen in de piekmaanden",
    tilt: "-1.4deg",
  },
  {
    quote:
      "Onze boodschappen waren een zwart gat: impulsaankopen, nooit een plan. Samen een weekbudget gezet en na elke boodschappenronde een korte check-in. Dat hield ons scherp, juist op de momenten dat het misging.",
    naam: "Bram & Eva",
    detail: "Gezin van vier, twee inkomens",
    resultaat: "Boodschappen eindelijk onder controle",
    tilt: "0.9deg",
  },
  {
    quote:
      "De BSO-kosten liepen de pan uit. In plaats van alleen bezuinigen dachten we samen na over flexibeler werken. Twee dagen minder opvang scheelt fors, en het is rustiger thuis.",
    naam: "Karim & Noor",
    detail: "Twee jonge kinderen",
    resultaat: "Twee dagen minder BSO, rust en geld over",
    tilt: "-0.7deg",
  },
];

const pijn = [
  {
    nr: "01",
    titel: "Er blijft nooit iets over, terwijl je het je niet kunt verklaren",
    tekst:
      "Je hebt een goed inkomen. Geen grote schulden, geen gekke gewoontes. Maar elke maand is het weg voor je goed en wel beseft hebt wat er is uitgegeven. Je weet dat het ergens naartoe gaat, maar niet waar precies.",
    note: "hier zit de knoop",
  },
  {
    nr: "02",
    titel: "Je hebt het al geprobeerd. En het werkt gewoon niet.",
    tekst:
      "Apps geprobeerd. Spreadsheets gemaakt. Goede voornemens in januari. Het helpt een paar weken, daarna glijd je terug in hetzelfde patroon. Niet omdat je het niet wilt, maar omdat je de juiste structuur mist.",
    note: null,
  },
  {
    nr: "03",
    titel: "Je praat er niet over, want je verdient toch genoeg?",
    tekst:
      "Schuldhulp is voor anderen. Beleggingsadvies is voor later. Maar structureel krap terwijl je goed verdient: daar is eigenlijk geen plek voor. Dus houd je het bij jezelf, terwijl het elke maand knaagt.",
    note: null,
  },
];

const stappen = [
  {
    nr: "1",
    titel: "Gratis analyse, 5 minuten",
    tekst:
      "Vijf korte stappen: woonsituatie, inkomen, woonlasten, vervoer en dagelijkse uitgaven. Schattingen zijn goed genoeg, je hoeft niets op te zoeken en geen bank te koppelen. Geen account, geen creditcard.",
  },
  {
    nr: "2",
    titel: "Direct inzicht, concreet en eerlijk",
    tekst:
      "Het resultaat staat direct op je scherm: in welke categorie je valt en de twee of drie plekken waar het bij jou structureel fout gaat, uitgelegd in gewone taal. Een e-mailadres is niet verplicht en niemand belt of mailt je na, tenzij je daar zelf om vraagt.",
  },
  {
    nr: "3",
    titel: "Jij kiest het vervolg, of niet",
    tekst:
      "Zelf verder met je resultaat kan prima. Wil je meer? Kies de geldscan (€49): ik kijk persoonlijk naar je cijfers en stuur je een persoonlijk geldrapport met je drie grootste lekken, zonder gesprek. Of plan een adviesgesprek van 45 minuten (€125).",
  },
];

const anders: [string, string][] = [
  ["Geen schuldhulp", "Dit is voor mensen die genoeg verdienen maar grip missen, niet voor mensen in financiële nood."],
  ["Geen abonnement", "Geldscan voor €49 of een gesprek voor €125, allebei eenmalig. Klaar. Geen maandelijkse kosten."],
  ["Geen oordeel", "Je verdient goed. De structuur klopt gewoon niet. Ik kijk naar wat er weglekt, niet naar wat jij fout zou doen."],
  ["Concrete uitkomst", "Na de gratis analyse weet je direct in welke categorie je valt en wat de grootste afwijking is."],
  ["Ook met wisselend inkomen", "Zzp'er of wisselende maanden? Vul je gemiddelde maandinkomen in. Juist dan geeft zicht op je vaste structuur rust."],
];

/* ── Knoppen ─────────────────────────────────────────────── */
function BtnPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 transition-all duration-200"
      style={{
        backgroundColor: C.terra,
        color: C.paper2,
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
        fontWeight: 500,
        fontSize: "0.95rem",
        padding: "0.85rem 1.4rem",
        borderRadius: "3px",
        boxShadow: "0 2px 0 rgba(122,53,29,0.55), 0 10px 22px -12px rgba(43,38,32,0.6)",
      }}
    >
      {children}
    </Link>
  );
}

function BtnOutline({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-[#2B2620] hover:text-[#F7F0E0]"
      style={{
        color: C.ink,
        border: `1.5px solid ${C.ink}`,
        fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
        fontWeight: 500,
        fontSize: "0.95rem",
        padding: "0.8rem 1.35rem",
        borderRadius: "3px",
        backgroundColor: "transparent",
      }}
    >
      {children}
    </Link>
  );
}

const grain =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function ConceptPage() {
  return (
    <div className={caveat.variable} style={{ backgroundColor: C.paper, color: C.ink }}>
      {/* papierkorrel over de hele pagina */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage: grain,
          opacity: 0.05,
          mixBlendMode: "multiply",
        }}
      />

      <Header />

      <main style={{ position: "relative", zIndex: 2, fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}>
        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="pt-24 pb-16 md:pt-28 md:pb-24">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
            {/* links */}
            <div>
              <p
                className="mb-6"
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.pencil,
                  fontWeight: 500,
                }}
              >
                Financiële coaching · Nederland
              </p>

              <h1
                className="font-display"
                style={{ fontWeight: 300, lineHeight: 1.02, letterSpacing: "-0.02em", color: C.ink }}
              >
                <span className="block" style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)" }}>
                  Goed salaris.
                </span>
                <span
                  className="block italic relative"
                  style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)", color: C.terra, width: "fit-content" }}
                >
                  Toch altijd krap.
                  <InkUnderline
                    color={C.terra}
                    delay={0.5}
                    className="absolute -bottom-2 left-0"
                  />
                </span>
              </h1>

              <p
                className="mt-8 mb-9 max-w-md"
                style={{ fontSize: "1.08rem", lineHeight: 1.65, color: C.inkSoft, fontWeight: 300 }}
              >
                Je betaalt alles op tijd. Je doet niks geks. Maar aan het einde van elke
                maand is het gewoon weg. Je weet niet precies waarheen. Dat ligt niet aan
                jou, het is een structuurprobleem. Ik laat zien waar het naartoe gaat,
                zodat je het kunt bijsturen.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <BtnPrimary href="/aanbod/intake?pakket=geldscan">Vind je geldlek (€49) &rarr;</BtnPrimary>
                <BtnOutline href="/analyse">Eerst gratis zelf checken &rarr;</BtnOutline>
              </div>

              <p style={{ fontSize: "0.82rem", color: C.pencil, lineHeight: 1.6 }}>
                Geldscan: geen algoritme, ik schrijf zelf je rapport · Analyse: gratis, 5
                minuten, geen account of bankkoppeling
              </p>
            </div>

            {/* rechts: het kasboek */}
            <div className="relative">
              {/* handgeschreven notitie in de kantlijn */}
              <div
                className="absolute z-20 hidden sm:block"
                style={{
                  right: "-6px",
                  top: "58%",
                  fontFamily: "var(--font-caveat), cursive",
                  fontSize: "1.5rem",
                  color: C.red,
                  transform: "rotate(-6deg)",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                hier lekt het
                <span style={{ display: "block", fontSize: "1.1rem", marginTop: "2px" }}>&darr;</span>
              </div>

              <div
                style={{
                  backgroundColor: C.card,
                  border: `1px solid ${C.rule}`,
                  borderRadius: "4px",
                  padding: "1.75rem 1.75rem 2rem",
                  transform: "rotate(-0.5deg)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.7), 0 22px 48px -26px rgba(43,38,32,0.55)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* rode kantlijn zoals in een grootboek */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: 0,
                    bottom: 0,
                    width: "1px",
                    backgroundColor: "rgba(176,64,42,0.35)",
                  }}
                />
                {/* koffiekring voor tactiel gevoel */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: "-28px",
                    top: "-28px",
                    width: "92px",
                    height: "92px",
                    borderRadius: "50%",
                    border: "6px solid rgba(122,53,29,0.06)",
                  }}
                />

                <div style={{ paddingLeft: "0.75rem" }}>
                  <div className="flex items-baseline justify-between mb-1">
                    <span style={{ fontWeight: 500, fontSize: "1.05rem", color: C.ink }}>Netto inkomen</span>
                    <span className="tabular-nums font-display" style={{ fontSize: "1.35rem", fontWeight: 300, color: C.green }}>
                      € 5.400
                    </span>
                  </div>
                  <div style={{ height: "1px", backgroundColor: C.rule, margin: "0.85rem 0 1.1rem" }} />

                  <div className="space-y-4">
                    <LedgerRow label="Wonen" amount="€ 1.740" />
                    <LedgerRow label="Boodschappen" amount="€ 820" />
                    <LedgerRow label="Vervoer" amount="€ 465" />
                    <LedgerRow label="Verzekeringen" amount="€ 390" />
                    <LedgerRow label="Abonnementen" amount="€ 118" />
                  </div>

                  <div
                    style={{
                      height: "3px",
                      borderTop: `1px solid ${C.ink}`,
                      borderBottom: `1px solid ${C.ink}`,
                      margin: "1.4rem 0 1.2rem",
                    }}
                    aria-hidden="true"
                  />

                  <div className="flex items-baseline justify-between relative">
                    <span style={{ fontWeight: 500, fontSize: "1.1rem", color: C.red }}>Onverklaard</span>
                    <span className="tabular-nums font-display" style={{ fontSize: "1.7rem", fontWeight: 300, color: C.red }}>
                      <CountUp to={412} prefix="€ " />
                    </span>
                    <InkUnderline
                      color={C.red}
                      width={2.5}
                      delay={1.1}
                      className="absolute -bottom-3 right-0"
                    />
                  </div>

                  {/* druppel */}
                  <svg width="16" height="26" viewBox="0 0 16 26" className="mt-5 ml-auto block" aria-hidden="true">
                    <line x1="8" y1="0" x2="8" y2="15" stroke="rgba(176,64,42,0.45)" strokeWidth="1.5" strokeDasharray="2 3" />
                    <path d="M8 15 C 4 20, 4 24, 8 24 C 12 24, 12 20, 8 15 Z" fill={C.red} />
                  </svg>
                </div>
              </div>

              <p className="text-center mt-6" style={{ fontSize: "0.75rem", color: C.pencil, fontStyle: "italic" }}>
                Illustratie van een geldscan-uitkomst, geen echte klant.
              </p>
            </div>
          </div>
        </section>

        {/* ── PIJN ───────────────────────────────────────────── */}
        <section
          className="py-16 md:py-24"
          style={{ borderTop: `1px solid ${C.rule}`, backgroundColor: C.paper2 }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <p className="mb-4" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.pencil, fontWeight: 500 }}>
              Dit klinkt waarschijnlijk bekend
            </p>
            <h2 className="font-display mb-12 md:mb-16" style={{ fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.08, color: C.ink, fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
              Je doet het goed, en toch klopt het niet.
            </h2>

            <div>
              {pijn.map((p, i) => (
                <div
                  key={p.nr}
                  className="grid grid-cols-[3rem_1fr] md:grid-cols-[7rem_1fr] gap-5 md:gap-12 items-start py-8"
                  style={{ borderTop: i === 0 ? "none" : `1px solid ${C.rule}` }}
                >
                  <span className="font-display" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, color: C.terra, lineHeight: 0.9 }} aria-hidden="true">
                    {p.nr}
                  </span>
                  <div className="relative">
                    <h3 style={{ fontWeight: 500, fontSize: "1.15rem", color: C.ink, marginBottom: "0.6rem", lineHeight: 1.3 }}>
                      {p.titel}
                    </h3>
                    <p style={{ fontWeight: 300, fontSize: "1rem", color: C.inkSoft, lineHeight: 1.65, maxWidth: "44rem" }}>
                      {p.tekst}
                    </p>
                    {p.note && (
                      <span
                        className="hidden lg:block absolute"
                        style={{
                          right: "-2.5rem",
                          top: "-1.6rem",
                          fontFamily: "var(--font-caveat), cursive",
                          fontSize: "1.35rem",
                          color: C.red,
                          transform: "rotate(-7deg)",
                        }}
                        aria-hidden="true"
                      >
                        {p.note}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ───────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ borderTop: `1px solid ${C.rule}` }}>
          <div className="max-w-6xl mx-auto px-6">
            <p className="mb-4" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.pencil, fontWeight: 500 }}>
              Echte verhalen
            </p>
            <h2 className="font-display mb-12" style={{ fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.08, color: C.ink, fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
              Wat het anderen opleverde
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
              {testimonials.map((t) => (
                <div
                  key={t.naam}
                  className="flex flex-col"
                  style={{
                    backgroundColor: C.card,
                    border: `1px solid ${C.rule}`,
                    borderRadius: "3px",
                    padding: "1.6rem 1.5rem",
                    transform: `rotate(${t.tilt})`,
                    boxShadow: "0 14px 30px -20px rgba(43,38,32,0.5)",
                    position: "relative",
                  }}
                >
                  {/* plakband bovenaan */}
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "-11px",
                      left: "50%",
                      transform: "translateX(-50%) rotate(-2deg)",
                      width: "68px",
                      height: "22px",
                      backgroundColor: "rgba(196,96,58,0.18)",
                      border: "1px solid rgba(196,96,58,0.25)",
                    }}
                  />
                  <p style={{ fontWeight: 300, fontSize: "0.95rem", color: C.ink, lineHeight: 1.6, flex: 1 }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div style={{ borderTop: `1px solid ${C.rule}`, marginTop: "1.1rem", paddingTop: "1rem" }}>
                    <p style={{ fontWeight: 500, fontSize: "0.9rem", color: C.ink }}>{t.naam}</p>
                    <p style={{ fontSize: "0.78rem", color: C.pencil, marginBottom: "0.7rem" }}>{t.detail}</p>
                    <span
                      style={{
                        fontFamily: "var(--font-caveat), cursive",
                        fontSize: "1.2rem",
                        color: C.green,
                      }}
                    >
                      {t.resultaat}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center" style={{ fontSize: "0.78rem", color: C.pencil }}>
              Namen zijn aangepast voor privacy. Ervaringen van echte gezinnen. Alleenstaand? De analyse
              vergelijkt jou met huishoudens in jouw situatie, niet met een gezin.
            </p>
          </div>
        </section>

        {/* ── JARNO ──────────────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ borderTop: `1px solid ${C.rule}`, backgroundColor: C.paper2 }}>
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="mb-6" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.pencil, fontWeight: 500 }}>
                Wie staat hier achter?
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="flex items-center justify-center shrink-0 font-display"
                  style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: C.green, color: C.paper2, fontSize: "1.5rem", fontWeight: 300 }}
                  aria-hidden="true"
                >
                  J
                </div>
                <div>
                  <p style={{ fontWeight: 500, fontSize: "1rem", color: C.ink }}>Jarno Koopman</p>
                  <p style={{ fontSize: "0.85rem", color: C.pencil }}>Oprichter, Waar blijft het</p>
                </div>
              </div>

              <blockquote className="font-display italic mb-7" style={{ fontWeight: 300, fontSize: "clamp(1.3rem, 3vw, 1.7rem)", lineHeight: 1.35, color: C.ink }}>
                &ldquo;We verdienden samen goed, maar elke maand hetzelfde gevoel. Totdat we begrepen
                waar het naartoe ging. Dat veranderde alles.&rdquo;
              </blockquote>

              <p style={{ fontWeight: 300, fontSize: "1rem", color: C.inkSoft, lineHeight: 1.65, marginBottom: "1rem" }}>
                Ik help mensen die goed verdienen maar structureel krap zitten. Gezinnen, stellen en
                alleenstaanden. Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit
                klopte. Daarom weet ik waar je moet kijken. Geen schuldhulpverlening, geen
                beleggingsadvies. Gewoon eerlijk inzicht in wat er speelt en concrete stappen die werken.
              </p>
              <p style={{ fontWeight: 300, fontSize: "1rem", color: C.inkSoft, lineHeight: 1.65 }}>
                Ik werk onafhankelijk. Ik verkoop geen financiële producten en krijg geen provisie, dus
                het enige dat ik lever is inzicht. Geen abonnementen, geen doorlopende trajecten. Je
                betaalt alleen voor wat je nodig hebt.
              </p>
              <div className="mt-7 flex flex-wrap gap-6">
                <Link href="/over" style={{ color: C.terra, fontWeight: 500, fontSize: "0.9rem", textDecoration: "none" }}>
                  Meer over Jarno &rarr;
                </Link>
                <a href="https://www.linkedin.com/in/jarnokoopman/" target="_blank" rel="noopener noreferrer" style={{ color: C.terra, fontWeight: 500, fontSize: "0.9rem", textDecoration: "none" }}>
                  LinkedIn &rarr;
                </a>
              </div>
            </div>

            {/* checklist als grootboek-regels */}
            <div>
              <h3 className="font-display mb-6" style={{ fontWeight: 300, fontSize: "1.7rem", color: C.ink, letterSpacing: "-0.01em" }}>
                Wat maakt dit anders?
              </h3>
              <div>
                {anders.map(([t, d], i) => (
                  <div
                    key={t}
                    className="flex gap-4 py-4"
                    style={{ borderTop: i === 0 ? "none" : `1px solid ${C.rule}` }}
                  >
                    <svg width="22" height="22" viewBox="0 0 22 22" className="shrink-0 mt-0.5" aria-hidden="true">
                      <path d="M4 12 L9 17 L18 5" stroke={C.terra} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: "0.95rem", color: C.ink, marginBottom: "0.2rem" }}>{t}</p>
                      <p style={{ fontWeight: 300, fontSize: "0.92rem", color: C.inkSoft, lineHeight: 1.6 }}>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HOE HET WERKT ──────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ borderTop: `1px solid ${C.rule}` }}>
          <div className="max-w-6xl mx-auto px-6">
            <p className="mb-4" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.pencil, fontWeight: 500 }}>
              Hoe het werkt
            </p>
            <h2 className="font-display mb-12" style={{ fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.08, color: C.ink, fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
              Drie stappen. Geen verplichtingen.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {stappen.map((s) => (
                <div key={s.nr}>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="font-display flex items-center justify-center"
                      style={{ width: "44px", height: "44px", borderRadius: "50%", border: `1.5px solid ${C.terra}`, color: C.terra, fontSize: "1.3rem", fontWeight: 300 }}
                    >
                      {s.nr}
                    </span>
                    <span style={{ flex: 1, height: "1px", backgroundColor: C.rule }} aria-hidden="true" />
                  </div>
                  <h3 style={{ fontWeight: 500, fontSize: "1.05rem", color: C.ink, marginBottom: "0.5rem" }}>{s.titel}</h3>
                  <p style={{ fontWeight: 300, fontSize: "0.95rem", color: C.inkSoft, lineHeight: 1.65 }}>{s.tekst}</p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <BtnPrimary href="/analyse">Start de gratis analyse &rarr;</BtnPrimary>
              <p className="mt-4" style={{ fontSize: "0.82rem", color: C.pencil, lineHeight: 1.6, maxWidth: "42rem" }}>
                Stap 1 is altijd gratis. Geen verplichting tot stap 2 of 3. Je gegevens worden alleen
                bewaard als je daar zelf toestemming voor geeft en worden nooit gedeeld of verkocht.{" "}
                <Link href="/privacy" style={{ color: C.terra, textDecoration: "none" }}>
                  Lees hoe ik met je gegevens omga &rarr;
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── STATISTIEKEN ───────────────────────────────────── */}
        <section className="py-16 md:py-24" style={{ borderTop: `1px solid ${C.rule}`, backgroundColor: C.paper2 }}>
          <div className="max-w-6xl mx-auto px-6">
            <p className="mb-4" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.pencil, fontWeight: 500 }}>
              Het probleem is groter dan je denkt
            </p>
            <h2 className="font-display mb-12" style={{ fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.08, color: C.ink, fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
              Jij bent niet de enige
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3">
              {[
                {
                  node: <CountUp to={47} suffix="%" />,
                  tekst: "van Nederlandse huishoudens is financieel kwetsbaar, ook met een goed inkomen",
                  bron: "Deloitte, 2024",
                  href: "https://www.deloitte.com/nl/nl/about/press-room/47-percent-van-nederland-is-financieel-kwetsbaar.html",
                },
                {
                  node: <span>1 op 3</span>,
                  tekst: "huishoudens heeft moeite rond te komen, ongeacht het inkomensniveau",
                  bron: "Nibud, 2026",
                  href: "https://www.nibud.nl/onderwerpen/rondkomen/moeite-met-rondkomen/",
                },
                {
                  node: <CountUp to={460} prefix="€ " />,
                  tekst: "gemiddeld meer per maand bij de huishoudens die ik tot nu toe begeleid heb. Geen belofte, jouw uitkomst hangt af van je situatie",
                  bron: "Eigen klantresultaten",
                  href: null as string | null,
                },
              ].map((s, i) => (
                <div
                  key={i}
                  className="py-6 md:py-2 md:px-9"
                  style={{
                    borderTop: i === 0 ? "none" : `1px solid ${C.rule}`,
                    borderLeft: i > 0 ? `1px solid ${C.rule}` : "none",
                  }}
                >
                  <p className="font-display tabular-nums" style={{ fontSize: "clamp(2.6rem, 8vw, 3.6rem)", fontWeight: 300, color: C.green, lineHeight: 1, marginBottom: "0.75rem" }}>
                    {s.node}
                  </p>
                  <p style={{ fontWeight: 300, fontSize: "0.95rem", color: C.inkSoft, lineHeight: 1.6, marginBottom: "0.5rem" }}>{s.tekst}</p>
                  <p style={{ fontSize: "0.72rem", color: C.pencil, fontStyle: "italic" }}>
                    {s.href ? (
                      <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: C.pencil }}>
                        Bron: {s.bron}
                      </a>
                    ) : (
                      <span>Bron: {s.bron}</span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VOOR WIE ────────────────────────────────────────── */}
        <section className="py-16 md:py-20" style={{ borderTop: `1px solid ${C.rule}` }}>
          <div className="max-w-6xl mx-auto px-6">
            <p className="mb-4" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: C.pencil, fontWeight: 500 }}>
              Voor wie is dit?
            </p>
            <h2 className="font-display mb-5" style={{ fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1, color: C.ink, fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}>
              Gezinnen, alleenstaanden, zzp&apos;ers en 50-plussers
            </h2>
            <p style={{ fontWeight: 300, fontSize: "0.98rem", color: C.inkSoft, lineHeight: 1.65, maxWidth: "40rem", marginBottom: "1.75rem" }}>
              Het patroon is overal hetzelfde: goed inkomen, toch krap. De cijfers verschillen per
              situatie. Daarom kijkt de analyse naar jouw woonsituatie, kinderen en inkomen, niet naar
              een standaardgezin. Lees wat het leven kost in jouw situatie:
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { titel: "Alleenstaand", href: "/inzichten/kosten-levensonderhoud-alleenstaande-2026" },
                { titel: "Alleenstaande ouder", href: "/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026" },
                { titel: "Zzp'er", href: "/inzichten/kosten-levensonderhoud-zzp-alleenstaande-2026" },
                { titel: "50-plus", href: "/inzichten/kosten-levensonderhoud-alleenstaande-50-plus-2026" },
              ].map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="transition-colors"
                  style={{ fontWeight: 500, fontSize: "0.9rem", padding: "0.5rem 1rem", borderRadius: "999px", border: `1px solid ${C.rule}`, color: C.ink, textDecoration: "none" }}
                >
                  {d.titel} &rarr;
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINALE CTA: kasboek-kaft ───────────────────────── */}
        <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: C.green }}>
          <div
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, backgroundImage: grain, opacity: 0.08, mixBlendMode: "overlay" }}
          />
          {/* dubbele lijn-omkadering als een boekkaft */}
          <div
            aria-hidden="true"
            className="absolute inset-6 md:inset-10"
            style={{ border: "1px solid rgba(247,240,224,0.18)" }}
          />
          <div className="max-w-2xl mx-auto px-8 text-center relative z-10">
            <p className="mb-6" style={{ fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(247,240,224,0.55)", fontWeight: 500 }}>
              Klaar voor antwoord?
            </p>
            <h2 className="font-display mb-6" style={{ fontWeight: 300, lineHeight: 1.08, color: C.paper2, fontSize: "clamp(2rem, 6vw, 3.6rem)" }}>
              Vijf minuten.
              <br />
              <span className="italic" style={{ color: C.terra }}>Gewoon antwoord.</span>
            </h2>
            <p className="mb-9 mx-auto" style={{ fontWeight: 300, fontSize: "1.05rem", color: "rgba(247,240,224,0.7)", lineHeight: 1.6, maxWidth: "24rem" }}>
              Start de gratis analyse en zie direct hoe je het doet, en wat er anders kan.
            </p>
            <BtnPrimary href="/analyse">Start de gratis analyse &rarr;</BtnPrimary>
            <p className="mt-6" style={{ fontSize: "0.75rem", color: "rgba(247,240,224,0.4)" }}>
              Voor huishoudens in heel Nederland · Geen account of bankkoppeling · Je gegevens worden nooit gedeeld of verkocht
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
