import {
  getBenchmarks,
  berekenTotaalInkomen,
  berekenOver,
  berekenWonen,
  berekenVervoer,
  berekenVerzekeringen,
  berekenAbonnementen,
  berekenKinderen,
  vindGrootsteAfwijking,
  bepaalVerdict,
  aantalVolwassenenVan,
} from "@/lib/benchmarks";
import { QuizData, parseEur, fmtEur } from "@/lib/quiz-types";
import { bepaalRichting } from "../../components/vergelijking-labels";
import type { AfwijkingEntry } from "./types";

/**
 * De rekenlaag van het resultaatscherm, letterlijk verhuisd uit
 * Stap6Resultaat.tsx (23-sep-2026) zodat de admin (/admin/analyse-verloop)
 * een ingevulde analyse precies zo kan tonen als de bezoeker hem zag. Er is
 * niets aan de berekening of de teksten veranderd; Stap6Resultaat roept deze
 * functie nu aan in plaats van dezelfde regels zelf uit te voeren.
 */
export function berekenResultaat(data: QuizData) {
  const inkomen = berekenTotaalInkomen(data);
  const aantalVolwassenen = aantalVolwassenenVan(data);
  const meerdere = aantalVolwassenen === 2;
  const onderw = meerdere ? "jullie" : "jou";
  const situatiePos = meerdere ? "jullie" : "jouw";
  const situatiePosHoofdletter =
    situatiePos.charAt(0).toUpperCase() + situatiePos.slice(1);

  const benches = getBenchmarks({
    woonsituatie: data.woonsituatie,
    kinderen: data.kinderen,
    inkomen: inkomen,
    auto: data.auto,
    tweedeAuto: data.tweedeAuto,
    aantalVolwassenen: aantalVolwassenen,
  });

  const over = berekenOver(data);
  const overDiff = over - benches.vrij_besteedbaar;
  const verdict = bepaalVerdict(data, benches);
  const grootsteAfwijking = vindGrootsteAfwijking(data, benches);

  const wonenTotaal = berekenWonen(data);
  const vervoerTotaal = berekenVervoer(data);
  const verzekeringTotaal = berekenVerzekeringen(data);
  const abonnementenTotaalWaarde = berekenAbonnementen(data);
  const kinderenTotaal = berekenKinderen(data);
  const spaardoelWaarde = parseEur(data.spaardoel);

  const conclusieKop =
    overDiff > 100
      ? `Bij ${onderw} blijft waarschijnlijk meer over dan je zelf zou verwachten.`
      : overDiff < -100
      ? `Bij ${onderw} blijft waarschijnlijk minder over dan logisch is voor ${situatiePos} situatie.`
      : `${situatiePosHoofdletter} financiële ruimte lijkt vooralsnog goed te passen bij ${situatiePos} huishouden.`;

  // De context onder het hoofdbedrag, zodat "financiële ruimte" niet als
  // oordeel wordt gelezen: het verschil met de vergelijking is geen conclusie
  // op zich, alleen een constatering.
  const contextZin =
    Math.abs(overDiff) < 100
      ? `${situatiePosHoofdletter} ruimte ligt dicht bij wat we bij dit huishouden verwachten.`
      : `Dat betekent niet automatisch dat er ${fmtEur(
          Math.abs(overDiff)
        )} misgaat. Het laat alleen zien dat ${situatiePos} financiële situatie anders uitpakt dan we bij een vergelijkbaar huishouden zouden verwachten.`;

  // Alleen posten met een echte benchmark: bij een zakelijke auto is de
  // vervoerbenchmark 0 (geen vergelijkingsdata voor eigen bijdrage), en €0 als
  // "vergelijkbaar huishouden" tonen zou ongeloofwaardig zijn. Zo'n post hoort
  // niet thuis in de vergelijking, niet als "geen verschil".
  const gesorteerd: AfwijkingEntry[] = [
    {
      label: "Boodschappen",
      jij: parseEur(data.boodschappen),
      bench: benches.boodschappen,
      diff: parseEur(data.boodschappen) - benches.boodschappen,
    },
    {
      label: "Abonnementen",
      jij: abonnementenTotaalWaarde,
      bench: benches.abonnementen,
      diff: abonnementenTotaalWaarde - benches.abonnementen,
    },
    {
      label: "Wonen",
      jij: wonenTotaal,
      bench: benches.wonen,
      diff: wonenTotaal - benches.wonen,
    },
    {
      label: "Verzekeringen",
      jij: verzekeringTotaal,
      bench: benches.verzekeringen,
      diff: verzekeringTotaal - benches.verzekeringen,
    },
    {
      label: "Vervoer",
      jij: vervoerTotaal,
      bench: benches.vervoer,
      diff: vervoerTotaal - benches.vervoer,
    },
  ]
    .filter((a) => a.jij > 0 && a.bench > 0)
    .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));

  const opvallend = gesorteerd
    .slice(0, 3)
    .filter((a, i) => i < 2 || Math.abs(a.diff) >= 50);

  const resultaat: Record<string, unknown> = {
    woonsituatie: data.woonsituatie,
    aantal_volwassenen: aantalVolwassenen,
    aantal_kinderen: data.kinderen,
    auto_situatie: data.auto,
    salaris_1: parseEur(data.salaris1),
    salaris_2: parseEur(data.salaris2),
    wonen_huur_hypotheek: parseEur(data.huurHypotheek),
    wonen_energie: parseEur(data.energie),
    wonen_internet_tv: parseEur(data.internet),
    boodschappen: parseEur(data.boodschappen),
    verzekering_zorg_per_persoon: parseEur(data.zorgPerPersoon),
    verzekering_overig: parseEur(data.verzekeringOverig),
    wonen_totaal: wonenTotaal,
    vervoer_totaal: vervoerTotaal,
    verzekering_totaal: verzekeringTotaal,
    abonnementen_totaal: abonnementenTotaalWaarde,
    kinderen_totaal: kinderenTotaal,
    totaal_inkomen_berekend: inkomen,
    totaal_uitgaven_berekend: inkomen - over,
    maandelijks_over_berekend: over,
    benchmark_over_verwacht: benches.vrij_besteedbaar,
    verschil_met_benchmark: overDiff,
    grootste_afwijking: grootsteAfwijking,
    verdict: verdict,
  };

  return {
    inkomen: inkomen,
    aantalVolwassenen: aantalVolwassenen,
    meerdere: meerdere,
    benches: benches,
    over: over,
    overDiff: overDiff,
    verdict: verdict,
    grootsteAfwijking: grootsteAfwijking,
    wonenTotaal: wonenTotaal,
    vervoerTotaal: vervoerTotaal,
    verzekeringTotaal: verzekeringTotaal,
    abonnementenTotaalWaarde: abonnementenTotaalWaarde,
    kinderenTotaal: kinderenTotaal,
    spaardoelWaarde: spaardoelWaarde,
    conclusieKop: conclusieKop,
    contextZin: contextZin,
    gesorteerd: gesorteerd,
    opvallend: opvallend,
    resultaat: resultaat,
  };
}

export type ResultaatBerekening = ReturnType<typeof berekenResultaat>;

export function zinVoorAfwijking(a: AfwijkingEntry, i: number): string {
  const richting = bepaalRichting(a.jij, a.bench);
  const post = a.label.toLowerCase();
  if (richting === "hoger") {
    return i === 0
      ? "Dit is jullie grootste verschil. Dat kan een bewuste keuze zijn, maar de afwijking is groot genoeg om verder te onderzoeken."
      : "Ook hier geven jullie meer uit dan vergelijkbare huishoudens. Op basis van deze vergelijking is nog niet te zeggen of dat logisch, bewust of onnodig is.";
  }
  if (richting === "lager") {
    return i === 0
      ? "Dit is jullie grootste verschil. Jullie geven hier minder uit dan vergelijkbare huishoudens."
      : `Bij ${post} geven jullie minder uit dan vergelijkbare huishoudens.`;
  }
  return `Bij ${post} zit je dicht bij vergelijkbare huishoudens.`;
}
