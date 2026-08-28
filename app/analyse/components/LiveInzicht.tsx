import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenWonen,
  berekenVervoer,
  berekenVerzekeringen,
  berekenAbonnementen,
  berekenKinderen,
  berekenJaarlijks,
  getPercentiel,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import {
  bepaalRichting,
  RICHTING_LABEL,
  RICHTING_PIL,
} from "./vergelijking-labels";

interface Props {
  data: QuizData;
  currentStep: number;
}

/**
 * De compacte beloning per stap (28-aug-2026, pass 4).
 *
 * Hiervoor stond op elke stap dezelfde volledige vergelijkingskaart met alle
 * categorieen eronder. Dat werkte op desktop, maar op mobiel duwde die kaart de
 * knop ver naar beneden en herhaalde hij bij elke stap wat de bezoeker al had
 * gezien. Dit blok laat alleen zien wat er in deze stap bij kwam, met maximaal
 * twee regels en een zin. Het volledige beeld blijft op te vragen: op desktop
 * staat het paneel ernaast, op mobiel achter de balk onderin.
 */

function Rij({
  label,
  jij,
  benchmark,
}: {
  label: string;
  jij: number;
  benchmark: number;
}) {
  if (!jij || !benchmark) return null;
  const richting = bepaalRichting(jij, benchmark);
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-[#E6E9E7] last:border-0">
      <div className="min-w-0">
        <p className="font-body font-medium text-sm text-primary truncate">
          {label}
        </p>
        <p className="font-body text-xs text-text-muted">
          Jij {fmtEur(jij)} &middot; vergelijkbaar {fmtEur(benchmark)}
        </p>
      </div>
      <span
        className={`shrink-0 text-xs font-body font-medium px-2.5 py-1 rounded-full ${RICHTING_PIL[richting]}`}
      >
        {RICHTING_LABEL[richting]}
      </span>
    </div>
  );
}

function Kaart({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#E6E9E7] bg-card p-4 sm:p-5">
      <p className="section-eyebrow mb-3">{eyebrow}</p>
      {children}
    </div>
  );
}

export default function LiveInzicht({ data, currentStep }: Props) {
  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = aantalVolwassenenVan(data);
  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen: inkomen,
    auto: data.auto,
    tweedeAuto: data.tweedeAuto,
    aantalVolwassenen: aantalVolwassenen,
  });

  // Stap 1: alleen bevestigen met wie wordt vergeleken. Nog geen cijfers.
  if (currentStep === 1) {
    if (
      data.volwassenen === null ||
      !data.woonsituatie ||
      data.kinderen === null
    )
      return null;
    const k = data.kinderen ?? 0;
    const kindTekst =
      k === 0
        ? "zonder kinderen"
        : `met ${k === 3 ? "3 of meer" : k} ${k === 1 ? "kind" : "kinderen"}`;
    const volwTekst =
      data.volwassenen === 1 ? "een volwassene" : "twee volwassenen";
    return (
      <Kaart eyebrow="Jouw vergelijking">
        <div className="bg-green-light rounded-lg px-4 py-3">
          <p className="font-body text-sm text-primary font-medium leading-relaxed">
            Een huishouden van {volwTekst} {kindTekst} in een{" "}
            {data.woonsituatie === "koop" ? "koopwoning" : "huurwoning"}.
          </p>
        </div>
        <p className="font-body text-xs text-text-muted mt-3">
          Vanaf nu bouwen we jouw persoonlijke vergelijking op.
        </p>
      </Kaart>
    );
  }

  // Stap 2: het inkomen, met een vooruitblik naar wonen.
  if (currentStep === 2) {
    if (inkomen === 0) return null;
    const percentiel = getPercentiel(inkomen, data.kinderen ?? 0);
    const hoog = percentiel.startsWith("top");
    const midden = percentiel === "middengroep";
    const inkomenZin = hoog
      ? "Je inkomen ligt hoger dan bij veel vergelijkbare huishoudens."
      : midden
      ? "Je inkomen zit rond het midden van vergelijkbare huishoudens."
      : "Je inkomen ligt wat lager dan bij veel vergelijkbare huishoudens.";
    return (
      <Kaart eyebrow="Dit zien we nu al">
        <p className="text-text-muted font-body text-xs mb-0.5">
          Geschat netto huishoudinkomen
        </p>
        <p className="font-display font-light text-primary text-3xl sm:text-4xl mb-3">
          {fmtEur(inkomen)}
          <span className="text-base text-text-muted font-body"> p/m</span>
        </p>
        <p className="font-body text-xs text-text-soft leading-relaxed">
          {inkomenZin} Je zit in de{" "}
          <strong className="text-primary font-medium">{percentiel}</strong> van
          Nederlandse huishoudens.
        </p>
        {data.inkomenWisselend && (
          <p className="font-body text-xs text-text-muted mt-2 leading-relaxed">
            Je gaf aan dat je inkomen wisselt. Ik reken met het gemiddelde dat je
            invulde en zet dat straks ook bij je uitkomst.
          </p>
        )}
        <p className="font-body text-xs text-text-muted mt-3 pt-3 border-t border-[#E6E9E7]">
          Nu kijken we hoeveel daarvan al opgaat aan wonen.
        </p>
      </Kaart>
    );
  }

  // Stap 3 tot 5: wat er in deze stap bij kwam.
  type Post = { label: string; jij: number; bench: number };

  const postenPerStap: Record<number, Post[]> = {
    3: [{ label: "Wonen", jij: berekenWonen(data), bench: benches.wonen }],
    4: [
      { label: "Vervoer", jij: berekenVervoer(data), bench: benches.vervoer },
      {
        label: "Verzekeringen",
        jij: berekenVerzekeringen(data),
        bench: benches.verzekeringen,
      },
    ],
    5: [
      {
        label: "Boodschappen",
        jij: parseEur(data.boodschappen),
        bench: benches.boodschappen,
      },
      {
        label: "Abonnementen",
        jij: berekenAbonnementen(data),
        bench: benches.abonnementen,
      },
      {
        label: "Kinderkosten",
        jij: berekenKinderen(data),
        bench: benches.kinderen,
      },
      {
        label: "Vrije uitgaven",
        jij: parseEur(data.vrijetijd),
        bench: benches.vrijetijd,
      },
    ],
  };

  const gevuld = (postenPerStap[currentStep] ?? []).filter(
    (p) => p.jij > 0 && p.bench > 0
  );
  if (gevuld.length === 0) return null;

  // Maximaal twee regels, en dan die met het grootste verschil. Een lijst van
  // zes categorieen leest niemand tijdens het invullen.
  const zichtbaar = [...gevuld]
    .sort((a, b) => Math.abs(b.jij - b.bench) - Math.abs(a.jij - a.bench))
    .slice(0, 2);

  // Eén drempel voor de pil, de kop en de zin (28-aug-2026, pass 4). Eerder had
  // elk van de drie zijn eigen grens, waardoor er "ongeveer gemiddeld" op de pil
  // kon staan terwijl de zin eronder sprak van hogere kosten.
  const boven = gevuld
    .filter((p) => bepaalRichting(p.jij, p.bench) === "hoger")
    .sort((a, b) => b.jij - b.bench - (a.jij - a.bench));

  const staartZin =
    " Of dat een probleem is, kunnen we pas zeggen als we naar het geheel kijken.";

  let zin: string;
  if (currentStep === 3) {
    const wonenRichting = bepaalRichting(berekenWonen(data), benches.wonen);
    zin =
      wonenRichting === "hoger"
        ? "Hogere woonkosten verklaren nu al een deel van het verschil met vergelijkbare huishoudens."
        : wonenRichting === "lager"
        ? "Je woonkosten liggen lager dan bij vergelijkbare huishoudens."
        : "Je woonkosten lijken vooralsnog goed te passen bij vergelijkbare huishoudens.";
  } else if (boven.length === 0) {
    zin =
      currentStep === 4
        ? "Deze posten passen bij vergelijkbare huishoudens. Je vergelijking wordt hiermee nauwkeuriger."
        : "Ook deze uitgaven passen bij vergelijkbare huishoudens.";
  } else if (boven.length === 1) {
    zin = `Ik zie hier vooral verschil bij ${boven[0].label.toLowerCase()}.` + staartZin;
  } else {
    zin =
      `Ik zie hier vooral verschil bij ${boven[0].label.toLowerCase()} en ${boven[1].label.toLowerCase()}.` +
      staartZin;
  }

  const jaarlijks = berekenJaarlijks(data);

  return (
    <Kaart eyebrow={boven.length > 0 ? "Dit valt nu op" : "Dit zien we nu al"}>
      {currentStep !== 5 && (
        <div>
          {zichtbaar.map((p) => (
            <Rij key={p.label} label={p.label} jij={p.jij} benchmark={p.bench} />
          ))}
        </div>
      )}
      <p
        className={`font-body text-xs text-text-soft leading-relaxed ${
          currentStep === 5 ? "" : "mt-3"
        }`}
      >
        {zin}
        {currentStep === 5 && jaarlijks > 0
          ? ` De grote kosten die niet elke maand terugkomen reken ik mee als ${fmtEur(
              jaarlijks
            )} per maand.`
          : ""}
      </p>
      {currentStep < 5 && (
        <p className="font-body text-xs text-text-muted mt-3 pt-3 border-t border-[#E6E9E7]">
          {currentStep === 3
            ? "Hierna kijken we naar vervoer en je vaste verzekeringen."
            : "Nog een stap, daarna kunnen we je volledige vergelijking laten zien."}
        </p>
      )}
    </Kaart>
  );
}
