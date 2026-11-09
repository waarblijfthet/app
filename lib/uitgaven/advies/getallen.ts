/**
 * Getallen met een naam, gemaakt uit de samenvatting. De AI schrijft nooit zelf een getal:
 * ze verwijst naar {naam} en de code vult het bedrag in (beveiligingseis 13).
 */
import type { Samenvatting } from "../samenvatting";

export type Getallen = Record<string, string>;

const MAANDNAMEN = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];

export function euroTekst(n: number): string {
  const neg = n < 0;
  const s = Math.round(Math.abs(n)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (neg ? "min € " : "€ ") + s;
}

function maandnaam(m: string): string {
  return MAANDNAMEN[Number(m.slice(5, 7)) - 1] || m;
}

function sleutel(tekst: string): string {
  return tekst
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40);
}

export function maakGetallen(s: Samenvatting): Getallen {
  const g: Getallen = {};
  const gem = s.gemiddeldPerMaand;
  g.inkomen_per_maand = euroTekst(gem.inkomen);
  g.overige_ontvangsten_per_maand = euroTekst(gem.overigeOntvangsten);
  g.vast_per_maand = euroTekst(gem.vast);
  g.niet_maandelijks_per_maand = euroTekst(gem.nietMaandelijks);
  // Bewust geen bedrag per jaar: een paar maanden met één grote uitgave zeggen niets over een heel jaar.
  g.niet_maandelijks_totaal = euroTekst(s.perMaand.reduce((a, m) => a + m.nietMaandelijks, 0));
  g.dagelijks_per_maand = euroTekst(gem.dagelijks);
  const aflossing = s.perMaand.reduce((a, m) => a + m.extraAflossing, 0);
  if (aflossing > 0) g.extra_aflossing_totaal = euroTekst(aflossing);
  const perAard = (aard: string) => s.nietMaandelijks.filter((x) => x.aard === aard).reduce((a, x) => a + x.bedrag, 0);
  if (perAard("eenmalig") > 0) g.eenmalig_totaal = euroTekst(perAard("eenmalig"));
  if (perAard("jaarlijks") > 0) g.jaarlijks_totaal = euroTekst(perAard("jaarlijks"));
  g.over_per_maand = euroTekst(gem.over);
  g.over_gewone_maand = euroTekst(gem.overGewoneMaand);
  if (gem.inkomen > 0) g.vaste_lasten_procent_van_inkomen = Math.round((100 * gem.vast) / gem.inkomen) + " procent";
  g.aantal_maanden = String(s.maanden.length);
  if (s.perMaand.length) {
    const laag = s.perMaand.reduce((a, b) => (b.over < a.over ? b : a));
    const hoog = s.perMaand.reduce((a, b) => (b.over > a.over ? b : a));
    g.laagste_over = euroTekst(laag.over);
    g.laagste_over_maand = maandnaam(laag.maand);
    g.hoogste_over = euroTekst(hoog.over);
    g.hoogste_over_maand = maandnaam(hoog.maand);
  }
  s.perMaand.forEach((m) => {
    g["over_" + maandnaam(m.maand)] = euroTekst(m.over);
    g["niet_maandelijks_" + maandnaam(m.maand)] = euroTekst(m.nietMaandelijks);
    if (m.extraAflossing > 0) g["extra_aflossing_" + maandnaam(m.maand)] = euroTekst(m.extraAflossing);
  });
  s.categorieen.forEach((c) => {
    g["categorie_" + sleutel(c.naam)] = euroTekst(c.perMaand);
  });
  const k = s.kenmerken;
  g.boodschappen_keer_per_maand = String(k.boodschappenKeerPerMaand);
  g.boodschappen_gemiddeld_bedrag = euroTekst(k.boodschappenGemiddeldBedrag);
  g.abonnementen_aantal = String(k.abonnementenAantal);
  g.abonnementen_per_maand = euroTekst(k.abonnementenPerMaand);
  g.vaste_lasten_aantal = String(s.vasteLasten.length);
  g.naar_potjes_per_maand = euroTekst(s.sparen.naarPotjesPerMaand);
  g.terug_uit_potjes_per_maand = euroTekst(s.sparen.terugUitPotjesPerMaand);
  g.netto_gespaard_per_maand = euroTekst(s.sparen.nettoPerMaand);
  g.aandeel_onbekend = s.kwaliteit.aandeelOnbekend + " procent";
  return g;
}
