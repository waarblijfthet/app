import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Gedeelde periode- en ophaalhulpjes voor de admin-routes (23-sep-2026).
 *
 * Aanleiding: het Bezoekers-tabblad bleef op 500 hangen voor week, maand en
 * alles, omdat het in de browser `.limit(500)` rijen ophaalde en die zelf
 * optelde. Hetzelfde patroon zat verstopt in de Vandaag-route: daar stond
 * "geen limiet", maar Supabase (PostgREST) geeft per verzoek hooguit 1000
 * rijen terug, ook zonder limit(). Een telling die rijen ophaalt, kapt dus
 * altijd stil af zodra de tabel groter wordt dan dat plafond.
 *
 * Regel vanaf nu: tellen doe je met count-queries of een Postgres-functie.
 * Moet je echt rijen hebben, gebruik dan haalAlleRijen, die per blok van
 * 1000 doorbladert tot alles binnen is.
 */

export type Periode = "vandaag" | "week" | "maand" | "alles";

export const PERIODES: Periode[] = ["vandaag", "week", "maand", "alles"];

export function leesPeriode(waarde: string | null): Periode {
  return PERIODES.includes(waarde as Periode) ? (waarde as Periode) : "week";
}

/** Middernacht van vandaag in Nederlandse tijd, als ISO-string in UTC. */
export function vandaagStartNl(nu: Date = new Date()): string {
  const nlDatum = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Amsterdam",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(nu);
  const offsetNaam = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Amsterdam",
    timeZoneName: "longOffset",
  })
    .formatToParts(nu)
    .find((deel) => deel.type === "timeZoneName")?.value;
  const offset = offsetNaam?.replace("GMT", "") || "+01:00";
  return new Date(`${nlDatum}T00:00:00${offset}`).toISOString();
}

/**
 * Begin van de periode. Week en maand zijn rollend (7 en 30 dagen), net als op
 * het Vandaag-dashboard, zodat de getallen op beide plekken hetzelfde zijn.
 */
export function periodeStart(periode: Periode, nu: Date = new Date()): string {
  if (periode === "vandaag") return vandaagStartNl(nu);
  if (periode === "week") return new Date(nu.getTime() - 7 * 86400000).toISOString();
  if (periode === "maand") return new Date(nu.getTime() - 30 * 86400000).toISOString();
  return new Date(0).toISOString();
}

const BLOK = 1000;

/**
 * Haalt alle rijen op door per blok van 1000 door te bladeren. Eerst een
 * count-query, daarna de blokken parallel in groepjes van vijf, zodat ook
 * "alles" niet twintig verzoeken achter elkaar hoeft te wachten.
 *
 * `bouw` krijgt een verse query-builder en moet select, filters en order
 * toevoegen. Zorg voor een stabiele order (bijvoorbeeld created_at plus id),
 * anders kunnen rijen tussen twee blokken verschuiven.
 */
export async function haalAlleRijen<T>(
  supabase: SupabaseClient,
  tabel: string,
  kolommen: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: (q: any) => any,
  orderKolom = "created_at",
  maxRijen = 100000
): Promise<T[]> {
  const telling = await filter(
    supabase.from(tabel).select("id", { count: "exact", head: true })
  );
  if (telling.error) throw telling.error;
  const totaal = Math.min(telling.count ?? 0, maxRijen);
  if (totaal === 0) return [];

  const starts: number[] = [];
  for (let start = 0; start < totaal; start += BLOK) starts.push(start);

  const rijen: T[] = [];
  for (let i = 0; i < starts.length; i += 5) {
    const groep = starts.slice(i, i + 5);
    const resultaten = await Promise.all(
      groep.map((start) =>
        filter(supabase.from(tabel).select(kolommen))
          .order(orderKolom, { ascending: false })
          .order("id", { ascending: true })
          .range(start, start + BLOK - 1)
      )
    );
    for (const res of resultaten as { data: T[] | null; error: unknown }[]) {
      if (res.error) throw res.error;
      rijen.push(...(res.data ?? []));
    }
  }
  return rijen;
}
