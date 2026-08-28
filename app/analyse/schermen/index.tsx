"use client";

import { useState } from "react";
import { QuizData, KinderenAantal, parseEur, fmtEur } from "@/lib/quiz-types";
import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenWonen,
  berekenVervoer,
  berekenVerzekeringen,
  aantalVolwassenenVan,
  getPercentiel,
  ENERGIE_BENCH,
  INTERNET_BENCH,
  LOKALE_LASTEN_BENCH,
  ZORG_PER_VOLWASSENE_BENCH,
  VERZEKERING_OVERIG_BENCH,
} from "@/lib/benchmarks";
import { bepaalRichting } from "../components/vergelijking-labels";
import {
  maakKeuzeScherm,
  maakBedragScherm,
  maakJaNeeBedragScherm,
  maakBucketScherm,
  type Scherm,
  type SchermCtx,
} from "./fabrieken";
import { Pill, PillGrid, VraagKop, Verder, TekstKnop } from "./primitieven";
import EuroInput from "../components/EuroInput";
import { keuzesRond } from "./bedragen";

/**
 * De volledige vraag-voor-vraag flow (28-aug-2026, pass 5). Eén scherm is één
 * atomaire beslissing. De volgorde hieronder is de enige plek waar die
 * volgorde vastligt, en condition bepaalt of een scherm er tussenuit valt voor
 * deze specifieke bezoeker.
 *
 * Belangrijk voor terugnavigatie: een condition mag nooit afhangen van het
 * veld dat het scherm zelf beschrijft (dan verdwijnt het scherm zodra het is
 * beantwoord). Wel afhankelijk van een veld dat een ANDER, eerder scherm zet.
 */
export interface SchermDef {
  id: string;
  categorie: 1 | 2 | 3 | 4 | 5;
  condition?: (data: QuizData) => boolean;
  Component: Scherm;
}

export const CATEGORIE_LABEL: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "Jouw huishouden",
  2: "Wat komt er binnen?",
  3: "Wat kost wonen?",
  4: "Vervoer en vaste lasten",
  5: "Wat geef je daarnaast uit?",
};

function benchesVoor(data: QuizData) {
  return getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen: berekenTotaalInkomen(data),
    auto: data.auto,
    tweedeAuto: data.tweedeAuto,
    aantalVolwassenen: aantalVolwassenenVan(data),
  });
}

type Samenstelling = "alleen" | "stel" | "partner_kids" | "alleen_kids";

function samenstellingVan(data: QuizData): Samenstelling | null {
  if (data.volwassenen === null) return null;
  const heeftKinderen = data.kinderen === null || (data.kinderen ?? 0) > 0;
  if (data.volwassenen === 1) return heeftKinderen ? "alleen_kids" : "alleen";
  return heeftKinderen ? "partner_kids" : "stel";
}

// ─── Categorie 1: Jouw huishouden ─────────────────────────────────────────────

const HuishoudenScherm = maakKeuzeScherm({
  vraag: () => "Met wie woon je?",
  subtekst: () =>
    "We vergelijken je met huishoudens die zoveel mogelijk op het jouwe lijken.",
  huidige: (d) => samenstellingVan(d),
  opties: () => [
    {
      value: "alleen",
      label: "Alleen",
      patch: {
        volwassenen: 1,
        kinderen: 0,
        salaris2: "",
        salaris2InclVakantiegeld: false,
        salaris2InclDertiende: false,
      },
    },
    {
      value: "stel",
      label: "Met partner",
      patch: { volwassenen: 2, kinderen: 0 },
    },
    {
      value: "partner_kids",
      label: "Met partner en kind(eren)",
      patch: { volwassenen: 2, kinderen: null },
    },
    {
      value: "alleen_kids",
      label: "Alleen met kind(eren)",
      patch: {
        volwassenen: 1,
        kinderen: null,
        salaris2: "",
        salaris2InclVakantiegeld: false,
        salaris2InclDertiende: false,
      },
    },
  ],
});

const KinderenAantalScherm = maakKeuzeScherm({
  vraag: () => "Hoeveel kinderen wonen thuis?",
  huidige: (d) =>
    d.kinderen !== null && d.kinderen !== 0 ? String(d.kinderen) : null,
  opties: () =>
    (
      [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3 of meer", value: 3 },
      ] as { label: string; value: KinderenAantal }[]
    ).map((o) => ({
      value: String(o.value),
      label: o.label,
      patch: { kinderen: o.value },
    })),
});

const WoonsituatieScherm = maakKeuzeScherm({
  vraag: () => "Woon je in een koop- of huurwoning?",
  huidige: (d) => d.woonsituatie,
  opties: () => [
    { value: "koop", label: "Koopwoning", patch: { woonsituatie: "koop" } },
    { value: "huur", label: "Huurwoning", patch: { woonsituatie: "huur" } },
  ],
});

// ─── Categorie 2: Wat komt er binnen? ─────────────────────────────────────────

function percentielZin(data: QuizData): string {
  const inkomen = berekenTotaalInkomen(data);
  const percentiel = getPercentiel(inkomen, data.kinderen ?? 0);
  const hoog = percentiel.startsWith("top");
  const midden = percentiel === "middengroep";
  const richtingZin = hoog
    ? "Dat ligt hoger dan bij veel vergelijkbare huishoudens."
    : midden
    ? "Dat zit rond het midden van vergelijkbare huishoudens."
    : "Dat ligt wat lager dan bij veel vergelijkbare huishoudens.";
  return `Geschat huishoudinkomen ${fmtEur(inkomen)} per maand. ${richtingZin} Je zit in de ${percentiel} van Nederlandse huishoudens.`;
}

const InkomenIkScherm = maakBedragScherm({
  vraag: (d) =>
    aantalVolwassenenVan(d) === 1
      ? "Wat komt er gemiddeld netto binnen?"
      : "Wat komt er bij jou netto binnen?",
  subtekst: () => "Een goede schatting is genoeg.",
  veld: "salaris1",
  opties: () => [
    { value: 2500, label: "€2.500" },
    { value: 3500, label: "€3.500" },
    { value: 4500, label: "€4.500" },
    { value: 6000, label: "€6.000+" },
  ],
  plausibelTot: 25000,
  // Bij een partner tellen we liever het huishoudinkomen, dus dan komt de
  // percentielzin pas na de volgende vraag.
  insightExtra: (d) => (aantalVolwassenenVan(d) === 1 ? percentielZin(d) : null),
});

const InkomenPartnerScherm = maakBedragScherm({
  vraag: () => "En bij je partner?",
  subtekst: () => "Het gemiddelde netto bedrag per maand.",
  veld: "salaris2",
  opties: () => [
    { value: 2000, label: "€2.000" },
    { value: 3000, label: "€3.000" },
    { value: 4000, label: "€4.000" },
    { value: 5500, label: "€5.500+" },
  ],
  plausibelTot: 25000,
  insightExtra: (d) => percentielZin(d),
});

/**
 * Vakantiegeld en 13e maand veranderen alleen wat er al is ingevuld, dus geen
 * apart "extra inkomen" meer. Standaard "Nee": de meerderheid tikt één keer en
 * gaat door, en alleen wie "Ja" kiest ziet de losse vinkjes (28-aug-2026, pass 5).
 */
const VakantiegeldScherm: Scherm = function VakantiegeldSchermInstance({
  data,
  kiesEnGa,
  ga,
}) {
  const heeftPartner = aantalVolwassenenVan(data) === 2;
  const alAangevinkt =
    data.salaris1InclVakantiegeld ||
    data.salaris1InclDertiende ||
    data.salaris2InclVakantiegeld ||
    data.salaris2InclDertiende;
  const [open, setOpen] = useState(alAangevinkt);
  const [vak1, setVak1] = useState(data.salaris1InclVakantiegeld);
  const [dert1, setDert1] = useState(data.salaris1InclDertiende);
  const [vak2, setVak2] = useState(data.salaris2InclVakantiegeld);
  const [dert2, setDert2] = useState(data.salaris2InclDertiende);

  if (!open) {
    return (
      <div>
        <VraagKop vraag="Krijg je vakantiegeld of een 13e maand, boven wat je net invulde?" />
        <PillGrid kolommen={1}>
          <Pill
            selected={false}
            onClick={() =>
              kiesEnGa(
                {
                  salaris1InclVakantiegeld: false,
                  salaris1InclDertiende: false,
                  salaris2InclVakantiegeld: false,
                  salaris2InclDertiende: false,
                },
                350
              )
            }
          >
            Nee
          </Pill>
          <Pill selected={false} onClick={() => setOpen(true)}>
            Ja, welke?
          </Pill>
        </PillGrid>
      </div>
    );
  }

  return (
    <div>
      <VraagKop vraag="Welke van deze krijg je?" subtekst="Meerdere mag." />
      <PillGrid>
        <Pill selected={vak1} onClick={() => setVak1((v) => !v)}>
          Vakantiegeld
        </Pill>
        <Pill selected={dert1} onClick={() => setDert1((v) => !v)}>
          13e maand
        </Pill>
        {heeftPartner && (
          <>
            <Pill selected={vak2} onClick={() => setVak2((v) => !v)}>
              Partner: vakantiegeld
            </Pill>
            <Pill selected={dert2} onClick={() => setDert2((v) => !v)}>
              Partner: 13e maand
            </Pill>
          </>
        )}
      </PillGrid>
      <Verder
        onClick={() => {
          kiesEnGa(
            {
              salaris1InclVakantiegeld: vak1,
              salaris1InclDertiende: dert1,
              salaris2InclVakantiegeld: heeftPartner ? vak2 : false,
              salaris2InclDertiende: heeftPartner ? dert2 : false,
            },
            0
          );
        }}
      >
        Verder →
      </Verder>
    </div>
  );
};

const ExtraInkomenScherm = maakJaNeeBedragScherm({
  vraag: () => "Heb je nog ander vast inkomen?",
  subtekst: () => "Toeslagen, alimentatie, een uitkering of verhuur.",
  neeLabel: "Nee, sla over",
  jaLabel: "Ja, ongeveer",
  neePatch: { toeslagOverig: "" },
  vervolgVraag: () => "Hoeveel is dat ongeveer per maand?",
  veld: "toeslagOverig",
  opties: () => [
    { value: 100, label: "€100" },
    { value: 250, label: "€250" },
    { value: 500, label: "€500" },
    { value: 900, label: "€900+" },
  ],
  actiefBijStart: (d) => parseEur(d.toeslagOverig) > 0,
});

const HypotheekaftrekScherm = maakJaNeeBedragScherm({
  vraag: () => "Krijg je hypotheekrente terug van de Belastingdienst?",
  neeLabel: "Nee",
  jaLabel: "Ja, ongeveer",
  neePatch: { hypotheekRenteAftrek: "" },
  vervolgVraag: () => "Wat krijg je ongeveer per jaar terug?",
  veld: "hypotheekRenteAftrek",
  opties: () => [
    { value: 1000, label: "€1.000" },
    { value: 2000, label: "€2.000" },
    { value: 4000, label: "€4.000" },
    { value: 6000, label: "€6.000+" },
  ],
  actiefBijStart: (d) => parseEur(d.hypotheekRenteAftrek) > 0,
});

const RecapInkomenScherm: Scherm = function RecapInkomenSchermInstance({
  data,
  ga,
}) {
  const inkomen = berekenTotaalInkomen(data);
  const percentiel = getPercentiel(inkomen, data.kinderen ?? 0);
  const samen = aantalVolwassenenVan(data) === 2;
  return (
    <div>
      <p className="section-eyebrow mb-2">Dit zien we al</p>
      <p className="font-display font-light text-primary text-3xl sm:text-4xl mb-3">
        {fmtEur(inkomen)}
        <span className="text-base text-text-muted font-body"> per maand</span>
      </p>
      <p className="font-body text-text-soft text-sm leading-relaxed mb-6">
        Dat is {samen ? "jullie" : "je"} geschatte netto huishoudinkomen, in de{" "}
        <strong className="text-primary font-medium">{percentiel}</strong> van
        Nederlandse huishoudens.
      </p>
      <Verder onClick={ga}>Verder, naar mijn woonkosten →</Verder>
    </div>
  );
};

// ─── Categorie 3: Wat kost wonen? ─────────────────────────────────────────────

const WonenBedragScherm = maakBedragScherm({
  vraag: (d) =>
    d.woonsituatie === "koop"
      ? "Wat maak je maandelijks over voor je hypotheek?"
      : "Wat betaal je aan huur per maand?",
  veld: "huurHypotheek",
  opties: (d) => {
    const benches = benchesVoor(d);
    const puurWonen = Math.max(
      benches.wonen - ENERGIE_BENCH - INTERNET_BENCH - LOKALE_LASTEN_BENCH,
      300
    );
    return keuzesRond(puurWonen);
  },
  benchmark: (d) => {
    const benches = benchesVoor(d);
    return Math.max(
      benches.wonen - ENERGIE_BENCH - INTERNET_BENCH - LOKALE_LASTEN_BENCH,
      0
    );
  },
  plausibelTot: 8000,
});

const EnergieScherm = maakBedragScherm({
  vraag: () => "Wat betaal je ongeveer aan gas, stroom en water samen?",
  veld: "energie",
  opties: () => keuzesRond(ENERGIE_BENCH),
  benchmark: () => ENERGIE_BENCH,
  plausibelTot: 1500,
});

const InternetScherm = maakBedragScherm({
  vraag: () => "En internet, tv en vaste telefonie?",
  veld: "internet",
  opties: () => keuzesRond(INTERNET_BENCH),
  benchmark: () => INTERNET_BENCH,
  plausibelTot: 500,
});

/**
 * Servicekosten en gemeentelijke belastingen zijn de uitzondering: klein,
 * onregelmatig en zonder scherpe benchmark. Daarom hier wel direct een bedrag
 * intypen in plaats van snelkeuzes, maar dan pas na een bewuste "Ja".
 */
const ExtraWoonkostenScherm: Scherm = function ExtraWoonkostenSchermInstance({
  data,
  patch,
  kiesEnGa,
  ga,
}) {
  const heeftIets =
    parseEur(data.servicekosten) > 0 || parseEur(data.gemeenteBelastingen) > 0;
  const [open, setOpen] = useState(heeftIets);

  if (!open) {
    return (
      <div>
        <VraagKop
          vraag="Zijn er nog andere woonkosten?"
          subtekst="Servicekosten, VvE of gemeentelijke belastingen."
        />
        <PillGrid kolommen={1}>
          <Pill
            selected={false}
            onClick={() =>
              kiesEnGa(
                { servicekosten: "", gemeenteBelastingen: "" },
                350
              )
            }
          >
            Nee, dat is alles
          </Pill>
          <Pill selected={false} onClick={() => setOpen(true)}>
            Ja
          </Pill>
        </PillGrid>
      </div>
    );
  }

  return (
    <div>
      <VraagKop vraag="Zijn er nog andere woonkosten?" />
      <div className="space-y-5">
        <EuroInput
          label="Servicekosten of VvE per maand"
          value={data.servicekosten}
          onChange={(v) => patch({ servicekosten: v })}
        />
        <EuroInput
          label="Gemeentelijke belastingen"
          value={data.gemeenteBelastingen}
          onChange={(v) => patch({ gemeenteBelastingen: v })}
          periode={{
            waarde: data.gemeenteBelastingenPer,
            onChange: (v) => patch({ gemeenteBelastingenPer: v }),
          }}
          hint="Vaak een jaaraanslag, dus staat 'per jaar' voorgeselecteerd."
        />
      </div>
      <Verder onClick={ga}>Verder →</Verder>
    </div>
  );
};

const RecapWonenScherm: Scherm = function RecapWonenSchermInstance({
  data,
  ga,
}) {
  const wonenTotaal = berekenWonen(data);
  const benches = benchesVoor(data);
  const richting = bepaalRichting(wonenTotaal, benches.wonen);
  const zin =
    richting === "hoger"
      ? `Je woonlasten liggen ongeveer ${fmtEur(
          wonenTotaal - benches.wonen
        )} hoger dan bij vergelijkbare huishoudens.`
      : richting === "lager"
      ? `Je woonlasten liggen ongeveer ${fmtEur(
          benches.wonen - wonenTotaal
        )} lager dan bij vergelijkbare huishoudens.`
      : "Je woonlasten liggen dicht bij wat vergelijkbare huishoudens betalen.";
  return (
    <div>
      <p className="section-eyebrow mb-2">Wonen afgerond</p>
      <p className="font-body text-text-soft text-base leading-relaxed mb-6">
        {zin}
      </p>
      <Verder onClick={ga}>Verder, naar vervoer →</Verder>
    </div>
  );
};

// ─── Categorie 4: Vervoer en vaste lasten ─────────────────────────────────────

const VervoerTypeScherm = maakKeuzeScherm({
  vraag: () => "Hoe regelen jullie meestal vervoer?",
  huidige: (d) => d.auto,
  opties: () => [
    {
      value: "geen",
      label: "Geen auto",
      patch: { auto: "geen", tweedeAuto: false },
    },
    { value: "eigen", label: "Eigen auto", patch: { auto: "eigen" } },
    {
      value: "lease_privé",
      label: "Private lease",
      patch: { auto: "lease_privé", tweedeAuto: false },
    },
    {
      value: "zakelijk",
      label: "Zakelijke auto",
      patch: { auto: "zakelijk", tweedeAuto: false },
    },
  ],
});

const TweedeAutoScherm = maakKeuzeScherm({
  vraag: () => "Staat er een tweede auto op de oprit?",
  huidige: (d) => (d.tweedeAuto ? "ja" : null),
  opties: () => [
    { value: "nee", label: "Nee, één auto", patch: { tweedeAuto: false } },
    { value: "ja", label: "Ja, twee auto's", patch: { tweedeAuto: true } },
  ],
});

const AutoBedragScherm = maakBedragScherm({
  vraag: () => "Wat betaal je ongeveer zelf per maand aan je auto?",
  subtekst: (d) =>
    d.tweedeAuto
      ? "Brandstof, verzekering, onderhoud en belasting van beide auto's samen."
      : "Brandstof, verzekering, onderhoud en belasting samen.",
  veld: "brandstof",
  opties: (d) => keuzesRond(d.tweedeAuto ? 550 : 350),
  benchmark: (d) => benchesVoor(d).vervoer,
  plausibelTot: 3000,
});

const OvScherm = maakBedragScherm({
  vraag: () => "Wat geef je ongeveer uit aan ov, fiets of deelvervoer?",
  veld: "ovAbonnement",
  opties: (d) => keuzesRond(benchesVoor(d).vervoer),
  benchmark: (d) => benchesVoor(d).vervoer,
  plausibelTot: 1500,
});

const LeaseScherm = maakBedragScherm({
  vraag: () => "Wat is jullie leasebedrag per maand, all in?",
  veld: "leaseBedrag",
  opties: (d) => keuzesRond(benchesVoor(d).vervoer),
  benchmark: (d) => benchesVoor(d).vervoer,
  plausibelTot: 3000,
});

const ZakelijkPriveScherm = maakJaNeeBedragScherm({
  vraag: () => "Betaal je zelf iets voor privégebruik van de zakelijke auto?",
  neePatch: { zakelijkEigenBijdrage: "" },
  vervolgVraag: () => "Wat betaal je daar ongeveer zelf aan?",
  veld: "zakelijkEigenBijdrage",
  opties: () => keuzesRond(150),
  actiefBijStart: (d) => parseEur(d.zakelijkEigenBijdrage) > 0,
});

const ZorgverzekeringScherm = maakBedragScherm({
  vraag: () => "Wat betalen jullie samen ongeveer aan zorgverzekering?",
  veld: "zorgPerPersoon",
  opties: (d) => keuzesRond(ZORG_PER_VOLWASSENE_BENCH * aantalVolwassenenVan(d)),
  benchmark: (d) => ZORG_PER_VOLWASSENE_BENCH * aantalVolwassenenVan(d),
  plausibelTot: 1200,
});

const OverigeVerzekeringenScherm = maakBucketScherm({
  vraag: () => "Hebben jullie daarnaast andere verzekeringen?",
  subtekst: () => "Aansprakelijkheid, inboedel, auto of rechtsbijstand.",
  veld: "verzekeringOverig",
  customLabel: "Ik weet het bedrag",
  benchmark: () => VERZEKERING_OVERIG_BENCH,
  buckets: () => [
    { label: "Nee, nauwelijks", value: 0 },
    { label: "Ja, gemiddeld", value: VERZEKERING_OVERIG_BENCH },
    {
      label: "Ja, relatief veel",
      value: Math.round(VERZEKERING_OVERIG_BENCH * 1.5),
    },
  ],
});

const RecapVervoerScherm: Scherm = function RecapVervoerSchermInstance({
  data,
  ga,
}) {
  const vervoerTotaal = berekenVervoer(data);
  const verzekeringTotaal = berekenVerzekeringen(data);
  const benches = benchesVoor(data);
  const jij = vervoerTotaal + verzekeringTotaal;
  const bench = benches.vervoer + benches.verzekeringen;
  const richting = bepaalRichting(jij, bench);
  const zin =
    richting === "hoger"
      ? `Vervoer en verzekeringen liggen samen ongeveer ${fmtEur(
          jij - bench
        )} hoger dan bij vergelijkbare huishoudens.`
      : richting === "lager"
      ? `Vervoer en verzekeringen liggen samen ongeveer ${fmtEur(
          bench - jij
        )} lager dan bij vergelijkbare huishoudens.`
      : "Vervoer en verzekeringen liggen dicht bij wat vergelijkbare huishoudens betalen.";
  return (
    <div>
      <p className="section-eyebrow mb-2">Vervoer en verzekeringen afgerond</p>
      <p className="font-body text-text-soft text-base leading-relaxed mb-6">
        {zin}
      </p>
      <Verder onClick={ga}>Verder, naar dagelijkse uitgaven →</Verder>
    </div>
  );
};

// ─── Categorie 5: Wat geef je daarnaast uit? ──────────────────────────────────

const BoodschappenScherm = maakBedragScherm({
  vraag: () => "Wat geven jullie ongeveer uit aan boodschappen?",
  subtekst: () => "Supermarkt en dagelijkse boodschappen samen.",
  veld: "boodschappen",
  opties: (d) => keuzesRond(benchesVoor(d).boodschappen),
  benchmark: (d) => benchesVoor(d).boodschappen,
  zachterBijHoger:
    "Dat zegt nog niet dat dit een probleem is. We kijken eerst naar het totaal.",
  plausibelTot: 4000,
});

const AbonnementenScherm = maakBucketScherm({
  vraag: () => "Hoe zit het met abonnementen?",
  subtekst: () => "Streaming, telefoon, sport, apps en zo.",
  veld: "abonnementenTotaal",
  benchmark: (d) => benchesVoor(d).abonnementen,
  buckets: () => [
    { label: "Nauwelijks, onder €50", value: 40 },
    { label: "Ongeveer €100", value: 100 },
    { label: "Ongeveer €200", value: 200 },
    { label: "Meer dan €300", value: 350 },
  ],
});

const KinderkostenScherm = maakBucketScherm({
  vraag: () => "Geven jullie zelf structureel geld uit aan de kinderen?",
  subtekst: () => "Opvang na de toeslag, school, sport en zo samen.",
  veld: "kinderenTotaal",
  benchmark: (d) => benchesVoor(d).kinderen,
  buckets: () => [
    { label: "Nauwelijks", value: 0 },
    { label: "Ongeveer €100 per maand", value: 100 },
    { label: "Ongeveer €300 per maand", value: 300 },
    { label: "€500+ per maand", value: 500 },
  ],
});

const VrijeUitgavenScherm = maakBedragScherm({
  vraag: () => "Uitgaan, kleding en andere vrije uitgaven?",
  subtekst: () => "Wat niet iedere maand gelijk is.",
  veld: "vrijetijd",
  opties: (d) => keuzesRond(benchesVoor(d).vrijetijd),
  benchmark: (d) => benchesVoor(d).vrijetijd,
  plausibelTot: 6000,
});

const JaarlijkseKostenScherm = maakBucketScherm({
  vraag: () => "Zijn er grote kosten die je niet elke maand hebt?",
  subtekst: () => "Vakantie, onderhoud, reparaties, tandarts of gemeentelijke belastingen.",
  veld: "jaarlijkseKosten",
  customLabel: "Ik schat het zelf",
  buckets: () => [
    { label: "Nee, valt mee", value: 0 },
    { label: "Ongeveer €1.000 per jaar", value: 1000 },
    { label: "Ongeveer €3.000 per jaar", value: 3000 },
    { label: "€5.000+ per jaar", value: 5000 },
  ],
});

const SparenScherm = maakJaNeeBedragScherm({
  vraag: () => "Wil je ook meenemen wat je gemiddeld spaart?",
  subtekst: () => "Volledig optioneel.",
  neeLabel: "Nee, sla over",
  jaLabel: "Ja",
  neePatch: { spaardoel: "" },
  vervolgVraag: () => "Wat zetten jullie gemiddeld opzij?",
  veld: "spaardoel",
  opties: () => [
    { value: 200, label: "€200" },
    { value: 500, label: "€500" },
    { value: 800, label: "€800" },
    { value: 1200, label: "€1.200+" },
  ],
  actiefBijStart: (d) => parseEur(d.spaardoel) > 0,
});

// ─── De volgorde ───────────────────────────────────────────────────────────────

export const ALLE_SCHERMEN: SchermDef[] = [
  { id: "huishouden", categorie: 1, Component: HuishoudenScherm },
  {
    id: "kinderen-aantal",
    categorie: 1,
    condition: (d) => d.volwassenen !== null && d.kinderen !== 0,
    Component: KinderenAantalScherm,
  },
  { id: "woonsituatie", categorie: 1, Component: WoonsituatieScherm },

  { id: "inkomen-ik", categorie: 2, Component: InkomenIkScherm },
  {
    id: "inkomen-partner",
    categorie: 2,
    condition: (d) => aantalVolwassenenVan(d) === 2,
    Component: InkomenPartnerScherm,
  },
  {
    id: "vakantiegeld",
    categorie: 2,
    condition: (d) => parseEur(d.salaris1) > 0,
    Component: VakantiegeldScherm,
  },
  { id: "extra-inkomen", categorie: 2, Component: ExtraInkomenScherm },
  {
    id: "hypotheekaftrek",
    categorie: 2,
    condition: (d) => d.woonsituatie === "koop",
    Component: HypotheekaftrekScherm,
  },
  { id: "recap-inkomen", categorie: 2, Component: RecapInkomenScherm },

  { id: "wonen-bedrag", categorie: 3, Component: WonenBedragScherm },
  { id: "energie", categorie: 3, Component: EnergieScherm },
  { id: "internet", categorie: 3, Component: InternetScherm },
  { id: "extra-woonkosten", categorie: 3, Component: ExtraWoonkostenScherm },
  { id: "recap-wonen", categorie: 3, Component: RecapWonenScherm },

  { id: "vervoer-type", categorie: 4, Component: VervoerTypeScherm },
  {
    id: "tweede-auto",
    categorie: 4,
    condition: (d) => d.auto === "eigen",
    Component: TweedeAutoScherm,
  },
  {
    id: "auto-bedrag",
    categorie: 4,
    condition: (d) => d.auto === "eigen",
    Component: AutoBedragScherm,
  },
  {
    id: "ov",
    categorie: 4,
    condition: (d) => d.auto === "geen",
    Component: OvScherm,
  },
  {
    id: "lease",
    categorie: 4,
    condition: (d) => d.auto === "lease_privé",
    Component: LeaseScherm,
  },
  {
    id: "zakelijk-privé",
    categorie: 4,
    condition: (d) => d.auto === "zakelijk",
    Component: ZakelijkPriveScherm,
  },
  { id: "zorgverzekering", categorie: 4, Component: ZorgverzekeringScherm },
  {
    id: "overige-verzekeringen",
    categorie: 4,
    Component: OverigeVerzekeringenScherm,
  },
  { id: "recap-vervoer", categorie: 4, Component: RecapVervoerScherm },

  { id: "boodschappen", categorie: 5, Component: BoodschappenScherm },
  { id: "abonnementen", categorie: 5, Component: AbonnementenScherm },
  {
    id: "kinderkosten",
    categorie: 5,
    condition: (d) => (d.kinderen ?? 0) > 0,
    Component: KinderkostenScherm,
  },
  { id: "vrije-uitgaven", categorie: 5, Component: VrijeUitgavenScherm },
  { id: "jaarlijkse-kosten", categorie: 5, Component: JaarlijkseKostenScherm },
  { id: "sparen", categorie: 5, Component: SparenScherm },
];

export function actieveSchermen(data: QuizData): SchermDef[] {
  return ALLE_SCHERMEN.filter((s) => !s.condition || s.condition(data));
}

/** null betekent: er is geen volgend scherm meer, toon het resultaat. */
export function volgendeSchermId(
  vanafId: string | null,
  data: QuizData
): string | null {
  const startIdx = vanafId
    ? ALLE_SCHERMEN.findIndex((s) => s.id === vanafId)
    : -1;
  for (let i = startIdx + 1; i < ALLE_SCHERMEN.length; i++) {
    const s = ALLE_SCHERMEN[i];
    if (!s.condition || s.condition(data)) return s.id;
  }
  return null;
}

/** null betekent: er is geen vorig scherm meer, terug naar de introductie. */
export function vorigeSchermId(
  vanafId: string,
  data: QuizData
): string | null {
  const idx = ALLE_SCHERMEN.findIndex((s) => s.id === vanafId);
  for (let i = idx - 1; i >= 0; i--) {
    const s = ALLE_SCHERMEN[i];
    if (!s.condition || s.condition(data)) return s.id;
  }
  return null;
}
