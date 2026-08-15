"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-caveat",
  display: "swap",
});

const C = {
  canvas: "#F7F8F7",
  tint: "#F0F3F1",
  card: "#FFFFFF",
  ink: "#16211F",
  inkSoft: "#4A5A56",
  pencil: "#8B958F",
  teal: "#0B7A6E",
  tealLight: "#5CC9B4",
  red: "#B03A2E",
  line: "#E6E9E7",
};

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

function InkUnderline({
  color = C.teal,
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
    <svg ref={ref} className={className} viewBox="0 0 300 14" fill="none" preserveAspectRatio="none" aria-hidden="true">
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

function CountUp({ to, prefix = "", suffix = "", duration = 1100 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const seen = useInView(ref);
  const reduce = useReducedMotion();
  // Staat het getal bij het laden al in beeld, dan meteen de eindwaarde tonen.
  // Anders las de bezoeker "€ 0" in de hero, precies het tegenovergestelde van
  // de boodschap. Alleen animeren wat bij het laden buiten beeld stond.
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

function LedgerRow({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span style={{ color: C.inkSoft, fontSize: "0.95rem" }}>{label}</span>
      <span aria-hidden="true" className="flex-1" style={{ borderBottom: `1px dotted ${C.line}`, transform: "translateY(-4px)" }} />
      <span className="tabular-nums" style={{ color: C.inkSoft, fontSize: "0.95rem", letterSpacing: "0.01em" }}>{amount}</span>
    </div>
  );
}

function BtnPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-95 w-full sm:w-auto"
      style={{ backgroundColor: C.teal, color: "#FFFFFF", fontWeight: 500, fontSize: "0.95rem", padding: "0.85rem 1.4rem", borderRadius: "4px", boxShadow: "0 2px 0 rgba(9,58,52,0.45), 0 10px 22px -12px rgba(22,33,31,0.5)" }}
    >
      {children}
    </Link>
  );
}

function BtnOutline({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-[#16211F] hover:text-white w-full sm:w-auto"
      style={{ color: C.ink, border: `1.5px solid ${C.ink}`, fontWeight: 500, fontSize: "0.95rem", padding: "0.8rem 1.35rem", borderRadius: "4px", backgroundColor: "transparent" }}
    >
      {children}
    </Link>
  );
}

const eyebrow = { fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase" as const, color: C.pencil, fontWeight: 500 };
const h2Style = { fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.08, color: C.ink, fontSize: "clamp(2rem, 5vw, 3.4rem)" };

const testimonials = [
  { quote: "Elk jaar werden we overvallen door verjaardagen, de vakantie en december. We hebben die kosten uitgerekend en opgesplitst in kleine potjes per maand. Nu staat de kerstpot er gewoon. Geen stress meer in de dure maanden.", naam: "Daan & Roos", detail: "Twee kinderen, koopwoning", resultaat: "Geen verrassingen in de piekmaanden", tilt: "-1.4deg" },
  { quote: "Onze boodschappen waren een zwart gat: impulsaankopen, nooit een plan. Samen een weekbudget gezet en na elke boodschappenronde een korte check-in. Dat hield ons scherp, juist op de momenten dat het misging.", naam: "Bram & Eva", detail: "Gezin van vier, twee inkomens", resultaat: "Boodschappen eindelijk onder controle", tilt: "0.9deg" },
  { quote: "De BSO-kosten liepen de pan uit. In plaats van alleen bezuinigen dachten we samen na over flexibeler werken. Twee dagen minder opvang scheelt fors, en het is rustiger thuis.", naam: "Karim & Noor", detail: "Twee jonge kinderen", resultaat: "Twee dagen minder BSO, rust en geld over", tilt: "-0.7deg" },
];

const pijn = [
  { nr: "01", titel: "Je praat er niet over, want je verdient toch genoeg?", tekst: "Schuldhulp is voor anderen. Beleggingsadvies is voor later. Maar structureel krap terwijl je goed verdient: daar is eigenlijk geen plek voor. Zeg je het toch, dan is de eerste vraag waar je het dan aan uitgeeft. Dus houd je het bij jezelf, terwijl het elke maand knaagt.", note: "hier zit de knoop" },
  { nr: "02", titel: "Er blijft nooit iets over, en je kunt niet zeggen waarom", tekst: "Je hebt een goed inkomen en je betaalt alles op tijd. Of je makkelijk geld uitgeeft weet je zelf niet precies, want los voelt niets buitensporig. Wat je wel weet: elke maand is het weg voordat je hebt gezien waaraan.", note: null },
  { nr: "03", titel: "En je weet niet of jouw bedragen normaal zijn", tekst: "Misschien heb je apps en spreadsheets geprobeerd, misschien ben je er nooit echt aan begonnen. In beide gevallen loop je tegen hetzelfde aan: je bankapp vertelt dat je 820 euro aan boodschappen uitgaf, maar niet of dat veel is voor een huishouden als het jouwe. Niemand om je heen noemt zijn bedragen.", note: null },
];

const stappen = [
  { nr: "1", titel: "De analyse, 5 minuten", tekst: "Vijf korte stappen: woonsituatie, inkomen, woonlasten, vervoer en dagelijkse uitgaven. Schattingen zijn goed genoeg, je hoeft niets op te zoeken en geen bank te koppelen. Geen account, geen creditcard." },
  { nr: "2", titel: "Direct inzicht, concreet en eerlijk", tekst: "Het resultaat staat direct op je scherm: hoeveel ruimte er bij jouw situatie te verwachten is, hoeveel er werkelijk overblijft en welke twee of drie posten eruit springen. Uitgelegd in gewone taal. Een e-mailadres is niet verplicht en niemand belt of mailt je na, tenzij je daar zelf om vraagt." },
  { nr: "3", titel: "Jij kiest het vervolg, of niet", tekst: "Zelf verder met je resultaat kan prima. Wil je weten wat ik zie? Kies het geldrapport (€49): ik kijk persoonlijk naar jouw cijfers en schrijf je de drie dingen die het meest opvallen, met per stuk wat ik zou doen. Valt er niets te repareren, dan staat dat er ook. Geen gesprek nodig." },
];

const anders: [string, string][] = [
  ["Geen schuldhulp", "Dit is voor mensen die genoeg verdienen maar grip missen, niet voor mensen in financiële nood."],
  ["Geen abonnement", "Geldscan voor €49 of een gesprek voor €125, allebei eenmalig. Klaar. Geen maandelijkse kosten."],
  ["Geen oordeel", "Ik kijk naar wat de cijfers zeggen, niet naar wat jij fout zou doen. Blijkt er niets mis te zijn, dan schrijf ik dat op."],
  ["Concrete uitkomst", "Na de analyse weet je direct in welke categorie je valt en wat de grootste afwijking is."],
  ["Ook met wisselend inkomen", "Zzp'er of wisselende maanden? Vul je gemiddelde maandinkomen in voor de gratis analyse. Die rekent met dat gemiddelde en weet niets van je belastingpot of je magere maanden, dus zeg dat erbij als je een rapport aanvraagt."],
];

const grain = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function HomeConcept() {
  return (
    <div className={caveat.variable + " overflow-x-hidden"} style={{ backgroundColor: C.canvas, color: C.ink, fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="pt-20 pb-14 md:pt-16 md:pb-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <div>
            <p className="mb-4 md:mb-5" style={eyebrow}>Persoonlijke geldanalyse</p>
            <h1 className="font-display" style={{ fontWeight: 300, lineHeight: 1.02, letterSpacing: "-0.02em", color: C.ink }}>
              <span className="block" style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)" }}>Goed salaris.</span>
              <span className="block italic relative" style={{ fontSize: "clamp(2.6rem, 6.5vw, 5rem)", color: C.teal, width: "fit-content" }}>
                Toch altijd krap?
                <InkUnderline color={C.teal} delay={0.5} className="absolute -bottom-2 left-0" />
              </span>
            </h1>
            <div className="mt-6 mb-6 max-w-md space-y-2">
              <p style={{ fontSize: "1.08rem", lineHeight: 1.6, color: C.inkSoft, fontWeight: 300 }}>
                Je betaalt alles op tijd. Je doet niks geks. Maar aan het einde van de maand is je geld gewoon weg.
              </p>
              <p style={{ fontSize: "1.08rem", lineHeight: 1.6, color: C.inkSoft, fontWeight: 300 }}>
                Ik laat je eerst zien hoeveel er in jouw situatie normaal gesproken over zou moeten blijven.
                Daarna kun je zelf bepalen of je wilt weten waar het verschil zit.
              </p>
            </div>

            <div className="mb-2">
              <BtnPrimary href="/analyse">Bekijk mijn situatie, gratis &rarr;</BtnPrimary>
            </div>
            <p className="mb-6" style={{ fontSize: "0.82rem", color: C.pencil, lineHeight: 1.5 }}>
              5 minuten · geen account · geen bankkoppeling · direct resultaat
            </p>

            <p className="mb-2" style={{ fontSize: "0.88rem", color: C.inkSoft, fontWeight: 300 }}>
              Liever dat ik zelf naar je cijfers kijk?
            </p>
            <div className="mb-6">
              <BtnOutline href="/aanbod/intake?pakket=geldscan">Geldscan €49 &rarr;</BtnOutline>
            </div>

            <div className="flex gap-8" style={{ borderTop: `1px solid ${C.line}`, paddingTop: "0.9rem" }}>
              <div>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.teal, fontWeight: 600, marginBottom: "0.3rem" }}>
                  Gratis analyse
                </p>
                <p style={{ fontSize: "0.88rem", color: C.inkSoft, fontWeight: 300 }}>Zie waar je afwijkt</p>
              </div>
              <div>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase" as const, color: C.ink, fontWeight: 600, marginBottom: "0.3rem" }}>
                  Geldscan €49
                </p>
                <p style={{ fontSize: "0.88rem", color: C.inkSoft, fontWeight: 300 }}>Ontdek waarom</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute z-20 hidden sm:block" style={{ right: "-6px", top: "58%", fontFamily: "var(--font-caveat), cursive", fontSize: "1.5rem", color: C.red, transform: "rotate(-6deg)", lineHeight: 1 }} aria-hidden="true">
              hier lekt het
              <span style={{ display: "block", fontSize: "1.1rem", marginTop: "2px" }}>&darr;</span>
            </div>
            <div style={{ backgroundColor: C.card, border: `1px solid ${C.line}`, borderRadius: "6px", padding: "1.75rem 1.75rem 2rem", boxShadow: "0 22px 48px -30px rgba(22,33,31,0.4)", position: "relative", overflow: "hidden" }}>
              <div aria-hidden="true" style={{ position: "absolute", left: "1rem", top: 0, bottom: 0, width: "1px", backgroundColor: "rgba(176,58,46,0.3)" }} />
              <div style={{ paddingLeft: "0.75rem" }}>
                <div className="flex items-baseline justify-between mb-1">
                  <span style={{ fontWeight: 500, fontSize: "1.05rem", color: C.ink }}>Netto inkomen</span>
                  <span className="tabular-nums font-display" style={{ fontSize: "1.35rem", fontWeight: 300, color: C.ink }}>€ 5.400</span>
                </div>
                <div style={{ height: "1px", backgroundColor: C.line, margin: "0.85rem 0 1.1rem" }} />
                <div className="space-y-4">
                  <LedgerRow label="Wonen" amount="€ 1.740" />
                  <LedgerRow label="Boodschappen" amount="€ 820" />
                  <LedgerRow label="Vervoer" amount="€ 465" />
                  <LedgerRow label="Verzekeringen" amount="€ 390" />
                  <LedgerRow label="Abonnementen" amount="€ 118" />
                </div>
                <div style={{ height: "3px", borderTop: `1px solid ${C.ink}`, borderBottom: `1px solid ${C.ink}`, margin: "1.4rem 0 1.2rem" }} aria-hidden="true" />
                <div className="flex items-baseline justify-between relative">
                  <span style={{ fontWeight: 500, fontSize: "1.1rem", color: C.red }}>Onverklaard</span>
                  <span className="tabular-nums font-display" style={{ fontSize: "1.7rem", fontWeight: 300, color: C.red }}>
                    <CountUp to={412} prefix="€ " />
                  </span>
                  <InkUnderline color={C.red} width={2.5} delay={1.1} className="absolute -bottom-3 right-0" />
                </div>
                <svg width="16" height="26" viewBox="0 0 16 26" className="mt-5 ml-auto block" aria-hidden="true">
                  <line x1="8" y1="0" x2="8" y2="15" stroke="rgba(176,58,46,0.45)" strokeWidth="1.5" strokeDasharray="2 3" />
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

      {/* ── PIJN ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ borderTop: `1px solid ${C.line}`, backgroundColor: C.tint }}>
        <div className="max-w-5xl mx-auto px-6">
          <p className="mb-4" style={eyebrow}>Dit klinkt waarschijnlijk bekend</p>
          <h2 className="font-display mb-12 md:mb-16" style={h2Style}>Je doet het goed, en toch klopt het niet.</h2>
          <div>
            {pijn.map((p, i) => (
              <div key={p.nr} className="grid grid-cols-[3rem_1fr] md:grid-cols-[7rem_1fr] gap-5 md:gap-12 items-start py-8" style={{ borderTop: i === 0 ? "none" : `1px solid ${C.line}` }}>
                <span className="font-display" style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, color: C.teal, lineHeight: 0.9 }} aria-hidden="true">{p.nr}</span>
                <div className="relative">
                  <h3 style={{ fontWeight: 500, fontSize: "1.15rem", color: C.ink, marginBottom: "0.6rem", lineHeight: 1.3 }}>{p.titel}</h3>
                  <p style={{ fontWeight: 300, fontSize: "1rem", color: C.inkSoft, lineHeight: 1.65, maxWidth: "44rem" }}>{p.tekst}</p>
                  {p.note && (
                    <span className="hidden lg:block absolute" style={{ right: "-2.5rem", top: "-1.6rem", fontFamily: "var(--font-caveat), cursive", fontSize: "1.35rem", color: C.red, transform: "rotate(-7deg)" }} aria-hidden="true">{p.note}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RAPPORTFRAGMENT ──────────────────── */}
      <section className="py-16 md:py-24" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="max-w-4xl mx-auto px-6">
          <p className="mb-4" style={eyebrow}>Wat je krijgt</p>
          <h2 className="font-display mb-6" style={h2Style}>Vijf echte rapporten, van begin tot eind.</h2>
          <p className="mb-8" style={{ fontWeight: 300, fontSize: "1rem", color: C.inkSoft, lineHeight: 1.65, maxWidth: "42rem" }}>
            Vijf huishoudens leverden hun cijfers aan, ik schreef het rapport en drie tot vier maanden later
            schreven zij op wat er veranderde. Vier van de vijf hadden het bij zichzelf mis. Bij twee van de
            vijf was mijn conclusie dat er niets te repareren viel. Hieronder een stuk uit het rapport van een
            stel zonder kinderen, dat dacht dat ze te makkelijk geld uitgaven.
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-9 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
            {[
              { chip: "Alleenstaand", slug: "alleenstaand-huurwoning" },
              { chip: "Alleenstaande ouder", slug: "alleenstaande-ouder-twee-kinderen" },
              { chip: "Stel zonder kinderen", slug: "stel-zonder-kinderen" },
              { chip: "Gezin met kinderen", slug: "tweeverdieners-drie-kinderen" },
              { chip: "Zzp of wisselend inkomen", slug: "zzp-wisselend-inkomen" },
            ].map((d) => (
              <Link
                key={d.slug}
                href={`/rapporten/${d.slug}`}
                className="transition-colors hover:border-[#0B7A6E] shrink-0 whitespace-nowrap"
                style={{ fontWeight: 500, fontSize: "0.9rem", padding: "0.5rem 1rem", borderRadius: "999px", border: `1px solid ${C.line}`, color: C.ink, textDecoration: "none", backgroundColor: C.card }}
              >
                {d.chip} &rarr;
              </Link>
            ))}
          </div>
          <div style={{ backgroundColor: C.card, border: `1px solid ${C.line}`, borderLeft: `3px solid ${C.teal}`, borderRadius: "4px", padding: "1.75rem" }}>
            <p style={{ fontWeight: 500, fontSize: "0.95rem", color: C.ink, marginBottom: "0.6rem" }}>Wat zij zelf dachten</p>
            <p style={{ fontWeight: 300, fontSize: "0.98rem", color: C.inkSoft, lineHeight: 1.7, marginBottom: "1.5rem" }}>
              &ldquo;We denken dat we te makkelijk geld uitgeven, maar niet dat één categorie extreem is.&rdquo;
              Zij misten naar eigen schatting 700 tot 900 euro per maand.
            </p>
            <p style={{ fontWeight: 500, fontSize: "0.95rem", color: C.ink, marginBottom: "0.6rem" }}>Wat eruit kwam</p>
            <p style={{ fontWeight: 300, fontSize: "0.98rem", color: C.inkSoft, lineHeight: 1.7, marginBottom: "1.5rem" }}>
              Er is geen lek. Hun uitgaven passen niet bij het spaardoel dat ze tegelijkertijd nastreefden.
              Reizen, horeca en vrije tijd zijn bewuste keuzes die mogen blijven, maar die concurreren met
              40.000 euro eigen geld binnen drie jaar. Dat vraagt 1.110 euro per maand.
            </p>
            <p style={{ fontWeight: 500, fontSize: "0.95rem", color: C.ink, marginBottom: "0.6rem" }}>Hun evaluatie, na drie maanden</p>
            <p style={{ fontWeight: 300, fontSize: "0.98rem", color: C.inkSoft, lineHeight: 1.7 }}>
              &ldquo;De belangrijkste verandering was dat we zijn gestopt met zoeken naar iets dat financieel mis
              zou zijn. We zetten nu automatisch 1.100 euro per maand apart voor het woondoel.&rdquo; Een
              vervolggesprek was niet nodig.
            </p>
          </div>
          <div className="mt-7">
            <BtnOutline href="/rapporten">Bekijk alle vijf de rapporten &rarr;</BtnOutline>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-4" style={eyebrow}>Echte verhalen</p>
          <h2 className="font-display mb-12" style={h2Style}>Wat het anderen opleverde</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {testimonials.map((t) => (
              <div key={t.naam} className="flex flex-col" style={{ backgroundColor: C.card, border: `1px solid ${C.line}`, borderRadius: "4px", padding: "1.6rem 1.5rem", transform: `rotate(${t.tilt})`, boxShadow: "0 14px 30px -22px rgba(22,33,31,0.4)", position: "relative" }}>
                <span aria-hidden="true" style={{ position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%) rotate(-2deg)", width: "68px", height: "22px", backgroundColor: "rgba(11,122,110,0.14)", border: "1px solid rgba(11,122,110,0.25)" }} />
                <p style={{ fontWeight: 300, fontSize: "0.95rem", color: C.ink, lineHeight: 1.6, flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ borderTop: `1px solid ${C.line}`, marginTop: "1.1rem", paddingTop: "1rem" }}>
                  <p style={{ fontWeight: 500, fontSize: "0.9rem", color: C.ink }}>{t.naam}</p>
                  <p style={{ fontSize: "0.78rem", color: C.pencil, marginBottom: "0.7rem" }}>{t.detail}</p>
                  <span style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.2rem", color: C.teal }}>{t.resultaat}</span>
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

      {/* ── JARNO ─────────────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ borderTop: `1px solid ${C.line}`, backgroundColor: C.tint }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="mb-6" style={eyebrow}>Wie staat hier achter?</p>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center justify-center shrink-0 font-display" style={{ width: "60px", height: "60px", borderRadius: "50%", backgroundColor: C.ink, color: "#fff", fontSize: "1.5rem", fontWeight: 300 }} aria-hidden="true">J</div>
              <div>
                <p style={{ fontWeight: 500, fontSize: "1rem", color: C.ink }}>Jarno Koopman</p>
                <p style={{ fontSize: "0.85rem", color: C.pencil }}>Oprichter, Waar blijft het</p>
              </div>
            </div>
            <blockquote className="font-display italic mb-7" style={{ fontWeight: 300, fontSize: "clamp(1.3rem, 3vw, 1.7rem)", lineHeight: 1.35, color: C.ink }}>
              &ldquo;We verdienden samen goed, maar elke maand hetzelfde gevoel. Totdat we begrepen waar het
              naartoe ging. Dat veranderde alles.&rdquo;
            </blockquote>
            <p style={{ fontWeight: 300, fontSize: "1rem", color: C.inkSoft, lineHeight: 1.65, marginBottom: "1rem" }}>
              Ik help mensen die goed verdienen maar structureel krap zitten. Gezinnen, stellen en
              alleenstaanden. Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte,
              dus ik weet hoe dat voelt. Waar ik naar kijk komt niet uit dat gevoel: ik leg jouw posten naast
              die van de huishoudens die ik zelf heb doorgerekend, met een vergelijkbaar inkomen en dezelfde
              gezinsgrootte, en kijk waar jij eruit springt. Geen
              schuldhulpverlening, geen beleggingsadvies.
            </p>
            <p style={{ fontWeight: 300, fontSize: "1rem", color: C.inkSoft, lineHeight: 1.65 }}>
              Ik werk onafhankelijk. Ik verkoop geen financiële producten en krijg geen provisie, dus het
              enige dat ik lever is inzicht. Geen abonnementen, geen doorlopende trajecten. Je betaalt alleen
              voor wat je nodig hebt.
            </p>
            <div className="mt-7 flex flex-wrap gap-6">
              <Link href="/over" style={{ color: C.teal, fontWeight: 500, fontSize: "0.9rem", textDecoration: "none" }}>Meer over Jarno &rarr;</Link>
              <a href="https://www.linkedin.com/in/jarnokoopman/" target="_blank" rel="noopener noreferrer" style={{ color: C.teal, fontWeight: 500, fontSize: "0.9rem", textDecoration: "none" }}>LinkedIn &rarr;</a>
            </div>
          </div>
          <div>
            <h3 className="font-display mb-6" style={{ fontWeight: 300, fontSize: "1.7rem", color: C.ink, letterSpacing: "-0.01em" }}>Wat maakt dit anders?</h3>
            <div>
              {anders.map(([t, d], i) => (
                <div key={t} className="flex gap-4 py-4" style={{ borderTop: i === 0 ? "none" : `1px solid ${C.line}` }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" className="shrink-0 mt-0.5" aria-hidden="true">
                    <path d="M4 12 L9 17 L18 5" stroke={C.teal} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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

      {/* ── HOE HET WERKT ─────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-4" style={eyebrow}>Hoe het werkt</p>
          <h2 className="font-display mb-12" style={h2Style}>Drie stappen. Geen verplichtingen.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {stappen.map((s) => (
              <div key={s.nr}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display flex items-center justify-center" style={{ width: "44px", height: "44px", borderRadius: "50%", border: `1.5px solid ${C.teal}`, color: C.teal, fontSize: "1.3rem", fontWeight: 300 }}>{s.nr}</span>
                  <span style={{ flex: 1, height: "1px", backgroundColor: C.line }} aria-hidden="true" />
                </div>
                <h3 style={{ fontWeight: 500, fontSize: "1.05rem", color: C.ink, marginBottom: "0.5rem" }}>{s.titel}</h3>
                <p style={{ fontWeight: 300, fontSize: "0.95rem", color: C.inkSoft, lineHeight: 1.65 }}>{s.tekst}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <BtnPrimary href="/aanbod/intake?pakket=geldscan">Vraag het geldrapport aan &rarr;</BtnPrimary>
              <BtnOutline href="/analyse">Start eerst de gratis analyse &rarr;</BtnOutline>
            </div>
            <p className="mt-4" style={{ fontSize: "0.82rem", color: C.pencil, lineHeight: 1.6, maxWidth: "42rem" }}>
              Stap 1 kost je niets. Geen verplichting tot stap 2 of 3. Je gegevens worden alleen bewaard als
              je daar zelf toestemming voor geeft en worden nooit gedeeld of verkocht.{" "}
              <Link href="/privacy" style={{ color: C.teal, textDecoration: "none" }}>Lees hoe ik met je gegevens omga &rarr;</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── STATISTIEKEN ──────────────────────────────────────── */}
      <section className="py-16 md:py-24" style={{ borderTop: `1px solid ${C.line}`, backgroundColor: C.tint }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-4" style={eyebrow}>Het probleem is groter dan je denkt</p>
          <h2 className="font-display mb-12" style={h2Style}>Jij bent niet de enige</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E6E9E7]">
            {[
              { node: <CountUp to={47} suffix="%" />, tekst: "van Nederlandse huishoudens is financieel kwetsbaar, ook met een goed inkomen", bron: "Deloitte, 2024", href: "https://www.deloitte.com/nl/nl/about/press-room/47-percent-van-nederland-is-financieel-kwetsbaar.html" },
              { node: <span>1 op 3</span>, tekst: "huishoudens heeft moeite rond te komen, ongeacht het inkomensniveau", bron: "Nibud, 2026", href: "https://www.nibud.nl/onderwerpen/rondkomen/moeite-met-rondkomen/" },
              { node: <CountUp to={11} suffix="%" />, tekst: "van de huishoudens met een hoog inkomen maakt zich zorgen over de dagelijkse uitgaven. Het gaat dus ook over mensen die genoeg verdienen", bron: "Nationale Monitor Geldzorgen, Universiteit Leiden, meting maart 2025", href: "https://www.kcpeg.nl/wat-wij-doen/nationale-monitor-geldzorgen-" as string | null },
            ].map((s, i) => (
              <div key={i} className="py-6 md:py-2 md:px-9 first:md:pl-0 last:md:pr-0">
                <p className="font-display tabular-nums" style={{ fontSize: "clamp(2.6rem, 8vw, 3.6rem)", fontWeight: 300, color: C.ink, lineHeight: 1, marginBottom: "0.75rem" }}>{s.node}</p>
                <p style={{ fontWeight: 300, fontSize: "0.95rem", color: C.inkSoft, lineHeight: 1.6, marginBottom: "0.5rem" }}>{s.tekst}</p>
                <p style={{ fontSize: "0.72rem", color: C.pencil, fontStyle: "italic" }}>
                  {s.href ? (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: C.pencil }}>Bron: {s.bron}</a>
                  ) : (
                    <span>Bron: {s.bron}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VOOR WIE ──────────────────────────────────────────── */}
      <section className="py-16 md:py-20" style={{ borderTop: `1px solid ${C.line}` }}>
        <div className="max-w-6xl mx-auto px-6">
          <p className="mb-4" style={eyebrow}>Voor wie is dit?</p>
          <h2 className="font-display mb-5" style={{ fontWeight: 300, letterSpacing: "-0.02em", lineHeight: 1.1, color: C.ink, fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}>
            Gezinnen, alleenstaanden, alleenstaande ouders, zzp&apos;ers en 50-plussers
          </h2>
          <p style={{ fontWeight: 300, fontSize: "0.98rem", color: C.inkSoft, lineHeight: 1.65, maxWidth: "40rem", marginBottom: "1.75rem" }}>
            Het patroon is overal hetzelfde: goed inkomen, toch krap. De cijfers verschillen sterk per
            situatie. Woon je alleen, dan is er niemand die zegt dat het een dure maand was, en weet je
            dus ook niet of 400 euro boodschappen veel is. Draag je het alleen met kinderen, dan heb je
            een gezinsleven op één inkomen en geen tweede volwassene om een kapotte cv-ketel mee op te
            vangen. Daarom kijkt de analyse naar jouw woonsituatie, kinderen en inkomen, niet naar een
            standaardgezin. Lees wat het leven kost in jouw situatie:
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { titel: "Alleenstaand", href: "/inzichten/kosten-levensonderhoud-alleenstaande-2026" },
              { titel: "Alleenstaande ouder", href: "/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026" },
              { titel: "Zzp'er", href: "/inzichten/kosten-levensonderhoud-zzp-alleenstaande-2026" },
              { titel: "50-plus", href: "/inzichten/kosten-levensonderhoud-alleenstaande-50-plus-2026" },
            ].map((d) => (
              <Link key={d.href} href={d.href} className="transition-colors hover:border-[#0B7A6E]" style={{ fontWeight: 500, fontSize: "0.9rem", padding: "0.5rem 1rem", borderRadius: "999px", border: `1px solid ${C.line}`, color: C.ink, textDecoration: "none" }}>{d.titel} &rarr;</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINALE CTA ────────────────────────────────────────── */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: C.ink }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, backgroundImage: grain, opacity: 0.06, mixBlendMode: "overlay" }} />
        <div aria-hidden="true" className="absolute inset-6 md:inset-10" style={{ border: "1px solid rgba(255,255,255,0.14)" }} />
        <div className="max-w-2xl mx-auto px-8 text-center relative z-10">
          <p className="mb-6" style={{ ...eyebrow, color: "rgba(255,255,255,0.55)" }}>Klaar voor antwoord?</p>
          <h2 className="font-display mb-6" style={{ fontWeight: 300, lineHeight: 1.08, color: "#FFFFFF", fontSize: "clamp(2rem, 6vw, 3.6rem)" }}>
            Weten of het
            <br />
            <span className="italic" style={{ color: C.tealLight }}>bij jou klopt?</span>
          </h2>
          <p className="mb-9 mx-auto" style={{ fontWeight: 300, fontSize: "1.05rem", color: "rgba(255,255,255,0.72)", lineHeight: 1.6, maxWidth: "26rem" }}>
            Ik kijk persoonlijk naar jouw cijfers en schrijf op wat er opvalt, wat er niet opvalt, en wat ik zou doen. Als er niets misgaat, lees je dat. In gewone taal, geen gesprek nodig.
          </p>
          <BtnPrimary href="/aanbod/intake?pakket=geldscan">Ja, help mij zien wat er anders kan &rarr;</BtnPrimary>
          <p className="mt-5">
            <Link href="/analyse" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.9rem" }}>Liever eerst zelf kijken? &rarr;</Link>
          </p>
          <p className="mt-5" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
            €49, eenmalig · Voor huishoudens in heel Nederland · Je gegevens worden nooit gedeeld of verkocht
          </p>
        </div>
      </section>
    </div>
  );
}
