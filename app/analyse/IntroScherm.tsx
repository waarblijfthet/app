"use client";

/**
 * Het scherm vóór "Start mijn analyse" (7-sep-2026, tweede conversieherziening).
 * Alleen dit bestand plus de wrapper in QuizClient.tsx: de vragenflow,
 * berekeningen, vergelijkingslogica, resultaatpagina, backend, tracking en
 * analytics staan hier los van en zijn niet aangeraakt.
 *
 * Deze versie (7-sep-2026, opdracht 2) is een volwaardige, brede landingpage
 * in plaats van tekst in de smalle 600px-kolom van de vragenflow. Jarno gaf
 * daarvoor expliciet een wireframe en exacte teksten aan. QuizClient.tsx rendert
 * dit scherm daarom nu buiten de smalle wrapper (zie de wijziging daar), en dit
 * bestand bepaalt zelf zijn breedte met MAX_BREEDTE hieronder, dezelfde 1180px
 * die ook de hero van /geldscan gebruikt.
 *
 * Cijfers in de resultaatpreview (€1.650, €2.050, +€180/+€120/+€90) zijn
 * expliciet door Jarno aangeleverde fictieve voorbeeldcijfers, geen echte
 * klantdata. Overal waar ze staan, staat ook "voorbeeld" erbij (harde
 * waarheidsregel 1). De richtingkleuren (terracotta voor "hoger") komen uit
 * dezelfde palet als Resultaat2Verschil, voor visuele consistentie met het
 * echte resultaatscherm.
 *
 * Sectie 3 herzien (7-sep-2026, opdracht 3, uitsluitend sectie 3): eigen
 * ResultaatKaartGroot-component in plaats van ResultaatPreview zonder
 * compact-prop. Zelfde voorbeeldcijfers en dezelfde "voorbeeld"-labeling,
 * maar een eigen opbouw (groot hoofdcijfer plus horizontale
 * vergelijkingsbalken) zodat de sectie niet meer als een grotere kopie van
 * de hero-teaser oogt. ResultaatPreview zelf is ongewijzigd en wordt nu
 * alleen nog compact (in de hero) aangeroepen; de niet-compacte tak erin
 * is dode code, bewust laten staan om de hero-rendering niet aan te raken.
 */

const MAX_BREEDTE = "max-w-[1180px]";

/* ── Iconen ────────────────────────────────────────────────────────────
   Eén lokale set lijniconen, dezelfde stijl als op /geldscan en /aanbod:
   viewBox 24x24, stroke 1.4, geen vlakken, ronde uiteinden. Geen gedeeld
   Icoon-component bestaat in dit project (elke pagina definieert zijn eigen
   kleine set), dus deze set staat lokaal in dit bestand. */

type IcoonNaam =
  | "klok"
  | "tag"
  | "schild"
  | "kaartUit"
  | "euro"
  | "duo"
  | "persoon"
  | "loep"
  | "wagentje"
  | "huis"
  | "auto"
  | "document";

const ICOON_PADEN: Record<IcoonNaam, React.ReactNode> = {
  klok: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  tag: (
    <>
      <path d="M12.5 3.5H20v7.5l-9 9L3.5 12.5z" />
      <circle cx="16.2" cy="7.5" r="1.3" />
    </>
  ),
  schild: <path d="M12 3.5l7 2.6v5.4c0 4.4-2.9 7.6-7 8.8-4.1-1.2-7-4.4-7-8.8V6.1z" />,
  kaartUit: (
    <>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M3.5 10.5h17" />
      <path d="M5 20l14-16" />
    </>
  ),
  euro: (
    <>
      <path d="M15.5 7a5.7 5.7 0 1 0 0 10" />
      <path d="M5.5 10.5h7.5" />
      <path d="M5.5 13.5h6.5" />
    </>
  ),
  duo: (
    <>
      <circle cx="8.5" cy="8.2" r="2.6" />
      <path d="M4 19c0-2.8 2-4.6 4.5-4.6S13 16.2 13 19" />
      <circle cx="16.7" cy="9.2" r="2.1" />
      <path d="M13.6 19c.3-2.3 1.9-3.7 4.1-3.7s3.6 1.4 4.3 3.7" />
    </>
  ),
  persoon: (
    <>
      <circle cx="12" cy="8.3" r="3.3" />
      <path d="M5.5 20c0-3.3 2.9-5.4 6.5-5.4s6.5 2.1 6.5 5.4" />
    </>
  ),
  loep: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M19.5 19.5l-3.6-3.6" />
    </>
  ),
  wagentje: (
    <>
      <path d="M3.5 4.5h2l2.3 11.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.6l1.3-6.7H7" />
      <circle cx="10" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </>
  ),
  huis: (
    <>
      <path d="M4.5 11.5L12 4l7.5 7.5" />
      <path d="M6.5 9.8V19.5h11V9.8" />
      <path d="M10 19.5v-5.3h4v5.3" />
    </>
  ),
  auto: (
    <>
      <path d="M4 16V12l2-4.5h12L20 12v4" />
      <path d="M4 16h16" />
      <circle cx="7.5" cy="17.3" r="1.4" />
      <circle cx="16.5" cy="17.3" r="1.4" />
    </>
  ),
  document: (
    <>
      <path d="M6 3.5h7.5L18 8v12.5H6z" />
      <path d="M13.5 3.5V8H18" />
      <path d="M9 12.5h6" />
      <path d="M9 16h4" />
    </>
  ),
};

function Icoon({
  naam,
  maat = 18,
  kleur = "#0B7A6E",
}: {
  naam: IcoonNaam;
  maat?: number;
  kleur?: string;
}) {
  return (
    <svg
      width={maat}
      height={maat}
      viewBox="0 0 24 24"
      fill="none"
      stroke={kleur}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICOON_PADEN[naam]}
    </svg>
  );
}

/* ── Kleine herbruikbare stukjes ────────────────────────────────────── */

/** Klein pill-label, exact dezelfde stijl als "Voorbeeldweergave" op /geldscan. */
function VoorbeeldPil() {
  return (
    <span
      className="font-body rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em]"
      style={{ backgroundColor: "#F0F3F1", color: "#8B958F" }}
    >
      Voorbeeld
    </span>
  );
}

function MicroItem({ icoon, tekst }: { icoon: IcoonNaam; tekst: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-body text-xs text-text-muted">
      <Icoon naam={icoon} maat={14} kleur="#8B958F" />
      {tekst}
    </span>
  );
}

function MicroRegel() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
      <MicroItem icoon="klok" tekst="± 2 minuten" />
      <MicroItem icoon="tag" tekst="gratis" />
      <MicroItem icoon="schild" tekst="anoniem" />
      <MicroItem icoon="kaartUit" tekst="geen bankgegevens" />
    </div>
  );
}

function Balk({ breedte, sterk = false }: { breedte: string; sterk?: boolean }) {
  return (
    <div className="h-2.5 bg-[#EEF1EF] rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full ${sterk ? "bg-primary" : "bg-[#B2CCC6]"}`}
        style={{ width: breedte }}
      />
    </div>
  );
}

function OpvallendRegel({
  icoon,
  label,
  verschil,
}: {
  icoon: IcoonNaam;
  label: string;
  verschil: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5 border-b border-[#E6E9E7] last:border-0">
      <span className="flex items-center gap-2.5 font-body text-sm text-text-soft">
        <Icoon naam={icoon} maat={16} />
        {label}
      </span>
      <span className="font-body text-sm font-medium" style={{ color: "#A15A32" }}>
        {verschil}
      </span>
    </div>
  );
}

/**
 * De resultaatpreview: de kleinere, ingehouden versie in de hero (compact,
 * geen eyebrow, kleinere cijfers, geen "groot dashboard"). Sectie 3 gebruikt
 * sinds 7-sep-2026 (opdracht 3) niet meer dit component maar het eigen
 * ResultaatKaartGroot hieronder; de niet-compacte tak hier blijft ongebruikt
 * staan zodat deze compacte hero-rendering met zekerheid ongewijzigd blijft.
 * Beide tonen dezelfde voorbeeldcijfers, dat is bewust: de hero belooft
 * alvast wat sectie 3 uitgebreider laat zien.
 */
function ResultaatPreview({ compact = false }: { compact?: boolean }) {
  // 7-sep-2026, hero-herziening opdracht 4: de kaart in de hero moet duidelijk
  // groter ogen dan de rest van de pagina, dus geen apart kleiner lettertype
  // meer voor de compacte variant. Alleen padding en de "Wat valt op"-layout
  // (grid vs. gestapeld met rand) blijven het verschil tussen hero en sectie 3.
  const ruimteMaat = "text-3xl sm:text-4xl";
  const vergelijkMaat = "text-2xl sm:text-3xl";

  return (
    <div className={`card-base border border-[#E6E9E7] ${compact ? "p-6 sm:p-7" : "p-6 sm:p-8"}`}>
      <div className="flex items-center justify-end mb-4">
        <VoorbeeldPil />
      </div>

      <div className={compact ? "" : "grid gap-8 md:grid-cols-2 md:gap-10"}>
        <div>
          <p className="font-body text-xs text-text-muted mb-1">Jouw financiële ruimte</p>
          <p className={`font-display font-light text-primary ${ruimteMaat} leading-none mb-1`}>
            &euro; 1.650
          </p>
          <p className="font-body text-xs text-text-muted mb-2">per maand</p>
          <Balk breedte="78%" sterk />

          <p className="font-body text-xs text-text-muted mt-4 mb-1">Vergelijkbare huishoudens</p>
          <p className={`font-display font-light text-text-soft ${vergelijkMaat} leading-none mb-1`}>
            &euro; 2.050
          </p>
          <p className="font-body text-xs text-text-muted mb-2">per maand</p>
          <Balk breedte="97%" />

          <div className="mt-5 rounded-lg bg-[#F7F8F7] p-3.5">
            <p className="font-body text-xs text-text-soft leading-relaxed">
              Je houdt in dit voorbeeld ongeveer &euro;400 minder over dan vergelijkbare
              huishoudens.
            </p>
          </div>
        </div>

        <div className={compact ? "mt-5 pt-4 border-t border-[#E6E9E7]" : ""}>
          <p className="section-eyebrow mb-2">Wat valt op?</p>
          <OpvallendRegel icoon="wagentje" label="Boodschappen" verschil="+ €180" />
          <OpvallendRegel icoon="huis" label="Wonen" verschil="+ €120" />
          <OpvallendRegel icoon="auto" label="Vervoer" verschil="+ €90" />
        </div>
      </div>

      <p className="font-body font-light text-text-muted text-xs mt-5 leading-relaxed">
        Voorbeeldweergave van de opbouw van je resultaat, geen echt huishouden.
      </p>
    </div>
  );
}

/**
 * Sectie 3 ("Zo ziet je resultaat eruit"): de grote, op zichzelf staande
 * uitwerking van hetzelfde voorbeeldresultaat als de hero-preview hierboven.
 * Bewust een los component in plaats van een variant van ResultaatPreview
 * (7-sep-2026, opdracht 3, uitsluitend sectie 3): de hero blijft een
 * compacte belofte, dit is het belangrijkste bewijsstuk van de pagina, met
 * een eigen opbouw. Structuur: links het hoofdcijfer (Jouw financiële
 * ruimte) met een horizontale vergelijking tegenover vergelijkbare
 * huishoudens en de verschilboodschap, rechts "Wat valt op?". Op mobiel
 * stapelt dat in exact die volgorde, want de verschilboodschap zit in de
 * linkerkolom en komt zo vóór "Wat valt op?" te staan. Zelfde
 * voorbeeldcijfers en dezelfde "voorbeeld"-labeling als ResultaatPreview
 * (harde waarheidsregel 1), dezelfde visuele taal (kleuren, radius, borders,
 * typografie) als de rest van de pagina, alleen groter en rijker uitgevoerd.
 */
function ResultaatKaartGroot() {
  return (
    <div className="card-base border border-[#E6E9E7] p-7 sm:p-9 lg:p-11">
      <div className="flex items-center justify-end mb-6">
        <VoorbeeldPil />
      </div>

      <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-14">
        {/* Links: hoofdcijfer, horizontale vergelijking en de verschilboodschap. */}
        <div>
          <p className="section-eyebrow mb-2">Jouw financiële ruimte</p>
          <p className="font-display font-light text-primary text-5xl sm:text-6xl leading-none mb-1.5">
            &euro; 1.650
          </p>
          <p className="font-body text-sm text-text-muted mb-7">per maand</p>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-body text-sm text-text-soft">Jouw situatie</span>
              </div>
              <Balk breedte="78%" sterk />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-body text-sm text-text-soft">Vergelijkbare huishoudens</span>
                <span className="font-display font-light text-text-soft text-xl sm:text-2xl leading-none">
                  &euro; 2.050
                </span>
              </div>
              <Balk breedte="97%" />
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-[#F7F8F7] p-4">
            <p className="font-body text-sm text-text-soft leading-relaxed">
              Je houdt in dit voorbeeld ongeveer &euro;400 minder over dan vergelijkbare
              huishoudens.
            </p>
          </div>
        </div>

        {/* Rechts: wat valt op, zelfde subcomponent als de hero-preview. */}
        <div>
          <p className="section-eyebrow mb-3">Wat valt op?</p>
          <OpvallendRegel icoon="wagentje" label="Boodschappen" verschil="+ €180" />
          <OpvallendRegel icoon="huis" label="Wonen" verschil="+ €120" />
          <OpvallendRegel icoon="auto" label="Vervoer" verschil="+ €90" />
        </div>
      </div>

      <p className="font-body font-light text-text-muted text-xs mt-7 leading-relaxed">
        Voorbeeldweergave van de opbouw van je resultaat, geen echt huishouden.
      </p>
    </div>
  );
}

const PRIMAIRE_CTA_TEKST = "Bekijk mijn financiële situatie →";

function PrimaireKnop({ onStart, groot = false }: { onStart: () => void; groot?: boolean }) {
  return (
    <button
      type="button"
      onClick={onStart}
      className={`btn-primary ${groot ? "text-base px-8 py-4" : ""}`}
    >
      {PRIMAIRE_CTA_TEKST}
    </button>
  );
}

/* ── Sectie-inhoud ─────────────────────────────────────────────────── */

const WAT_KRIJG_JE = [
  {
    icoon: "euro" as IcoonNaam,
    titel: "Jouw financiële ruimte",
    tekst: "Wat zou je ongeveer moeten overhouden?",
  },
  {
    icoon: "duo" as IcoonNaam,
    titel: "Vergelijkbare huishoudens",
    tekst: "Hoe doe je het ten opzichte van huishoudens die op jou lijken?",
  },
  {
    icoon: "loep" as IcoonNaam,
    titel: "Wat valt op?",
    tekst: "Welke onderdelen van je uitgaven wijken opvallend af?",
  },
];

const VOOR_JOU_ALS = [
  "Je verdient goed, maar houdt minder over dan je verwacht.",
  "Je denkt regelmatig: waar blijft mijn geld?",
  "Je wilt weten of je uitgaven eigenlijk normaal zijn.",
  "Je wilt jezelf vergelijken met een huishouden dat op jou lijkt.",
];

const NIET_VOORBEREIDEN = [
  { icoon: "kaartUit" as IcoonNaam, label: "Geen bankgegevens" },
  { icoon: "persoon" as IcoonNaam, label: "Geen account" },
  { icoon: "document" as IcoonNaam, label: "Een schatting is genoeg" },
  { icoon: "klok" as IcoonNaam, label: "± 2 minuten" },
];

export default function IntroScherm({ onStart }: { onStart: () => void }) {
  return (
    <div className={`${MAX_BREEDTE} mx-auto pt-2 md:pt-8`}>
      {/* 1. Hero: twee kolommen op desktop, tekst eerst op mobiel. De DOM-
          volgorde (tekst dan preview) klopt voor beide: flex-col stapelt op
          mobiel in die volgorde. Op desktop een 1.15fr/1fr-grid in plaats van
          twee gelijke flex-1 kolommen (7-sep-2026, hero-herziening opdracht 4):
          de linkerkolom iets breder voor de grotere H1, de rechterkaart met
          een eigen max-breedte zodat hij niet over de volle kolom uitrekt en
          met een lichte negatieve marge zodat hij iets hoger begint dan de H1. */}
      <div className="flex flex-col gap-10 md:grid md:grid-cols-[1.15fr_1fr] md:items-start md:gap-12 mb-16 md:mb-20">
        <div>
          <p className="section-eyebrow mb-4">Gratis financiële analyse</p>
          <h1 className="font-display font-light text-primary text-[40px] sm:text-5xl md:text-[52px] leading-[1.05] mb-5">
            Hoe staat jouw huishouden er financieel voor?
          </h1>
          <p className="text-text-soft font-body font-light text-lg leading-relaxed mb-7 max-w-[480px]">
            Ontdek hoeveel financiële ruimte bij jouw situatie past en waar jouw situatie
            afwijkt van vergelijkbare huishoudens.
          </p>
          <button type="button" onClick={onStart} className="btn-primary text-base px-7 py-3.5">
            {PRIMAIRE_CTA_TEKST}
          </button>
          <div className="mt-2.5">
            <MicroRegel />
          </div>
        </div>

        <div className="w-full md:max-w-[400px] md:ml-auto md:-mt-2">
          <ResultaatPreview compact />
        </div>
      </div>

      {/* 2. Wat krijg je te zien: drie kaarten. Herzien 7-sep-2026 (opdracht
          "sectie 2 herontwerp"): alleen visuele hiërarchie, kaartbreedte en
          verticale ritme aangepast. Tekst, kaarten, iconen en volgorde
          ongewijzigd. Container blijft dezelfde MAX_BREEDTE als de hero, dus
          de kaarten gebruiken al de volle paginabreedte; drie kolommen pas
          vanaf lg (1024px) zodat de tekst op tablet-breedtes niet te veel
          regels breekt. */}
      <div className="mb-16 md:mb-20">
        <h2 className="font-display font-light text-primary text-2xl sm:text-3xl md:text-[32px] leading-snug mb-3 text-center">
          Wat krijg je te zien?
        </h2>
        <p className="text-text-soft font-body font-light text-base leading-relaxed mb-8 text-center">
          Na een paar korte vragen krijg je direct inzicht in:
        </p>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {WAT_KRIJG_JE.map((kaart) => (
            <div
              key={kaart.titel}
              className="flex flex-col rounded-xl border border-[#E6E9E7] bg-card shadow-card px-6 py-6 sm:px-7 sm:py-7 min-h-[135px] md:min-h-[155px]"
            >
              <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-accent-bg">
                <Icoon naam={kaart.icoon} maat={18} />
              </span>
              <p className="font-display font-light text-primary text-lg mb-2 leading-snug">
                {kaart.titel}
              </p>
              <p className="font-body font-light text-text-soft text-sm leading-[1.45]">
                {kaart.tekst}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Zo ziet je resultaat eruit: eigen ResultaatKaartGroot-component
          (7-sep-2026, opdracht 3, uitsluitend sectie 3 herzien), niet meer
          ResultaatPreview zonder compact-prop. Zie de doc-comments bij beide
          componenten hierboven voor de reden. */}
      <div className="mb-16 md:mb-20">
        <p className="section-eyebrow mb-6 text-center">Zo ziet je resultaat eruit</p>
        <ResultaatKaartGroot />
      </div>

      {/* 4. Brug: een bedrag op zichzelf zegt weinig. Direct na de preview,
          niet pas onderaan, want dit is het argument dat de preview verklaart. */}
      <div className="mb-20 md:mb-28 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-10">
        <span
          aria-hidden="true"
          className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-accent-bg sm:h-24 sm:w-24"
        >
          <Icoon naam="euro" maat={34} />
        </span>
        <div>
          <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-snug mb-2 text-center sm:text-left">
            Een bedrag op zichzelf zegt weinig.
          </h2>
          <p className="text-text-soft font-body font-light text-base leading-relaxed text-center sm:text-left">
            &euro;1.000 aan boodschappen kan voor het ene huishouden normaal zijn en voor het
            andere opvallend hoog. Daarom vergelijk ik jouw situatie met huishoudens die op jou
            lijken.
          </p>
        </div>
      </div>

      {/* 5. Dit is voor jou als: 2x2 op desktop. */}
      <div className="mb-20 md:mb-28">
        <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-snug mb-8 text-center">
          Dit is voor jou als...
        </h2>
        <div className="grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2 max-w-[820px] mx-auto">
          {VOOR_JOU_ALS.map((zin) => (
            <div key={zin} className="flex items-start gap-3">
              <span className="text-accent shrink-0 mt-0.5">✓</span>
              <p className="font-body text-text-soft text-base leading-relaxed">{zin}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Je hoeft niets voor te bereiden: zacht groen contrastblok. */}
      <div className="mb-20 md:mb-28 rounded-2xl bg-green-light p-8 sm:p-10 md:p-12">
        <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-snug mb-2 text-center">
          Je hoeft niets voor te bereiden
        </h2>
        <p className="text-text-soft font-body font-light text-base leading-relaxed mb-8 text-center max-w-[560px] mx-auto">
          Je hoeft niet eerst je administratie of bankapp erbij te pakken. Een schatting is
          genoeg.
        </p>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 max-w-[760px] mx-auto">
          {NIET_VOORBEREIDEN.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2.5 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white">
                <Icoon naam={item.icoon} maat={19} />
              </span>
              <p className="font-body text-text-soft text-sm leading-snug">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="font-body font-light text-text-soft text-sm leading-relaxed mt-8 pt-6 border-t border-white/60 text-center">
          Een paar korte vragen. Gratis, anoniem en zonder bankkoppeling. Je hoeft na afloop
          niets te kopen.
        </p>
      </div>

      {/* 7. Eind-CTA: rustige, zachte afsluiting. Zelfde primaire knop, geen
          tweede actie en geen verwijzing naar de Geldscan (die is nu niet aan
          de orde). */}
      <div className="rounded-2xl bg-[#F0F3F1] px-6 py-12 sm:px-10 sm:py-16 text-center">
        <h2 className="font-display font-light text-primary text-2xl sm:text-3xl leading-snug mb-6">
          Benieuwd hoe jouw huishouden ervoor staat?
        </h2>
        <PrimaireKnop onStart={onStart} groot />
        <div className="mt-4 flex justify-center">
          <MicroRegel />
        </div>
      </div>
    </div>
  );
}
