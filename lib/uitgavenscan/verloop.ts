/**
 * Rekent de rijen uit uitgavenscan_voortgang om naar de trechter voor /admin/uitgavenscan-verloop.
 * Puur en zonder Supabase, zodat het te testen is (scripts/meting-test.cjs).
 */
import { SCHERMEN, GESTART_VANAF, schermIndex, type Kenmerken, type SchermId } from "./meting";

export type VoortgangRij = {
  sessie_id: string;
  created_at: string;
  updated_at: string;
  huidig_scherm: string | null;
  max_scherm_index: number | null;
  apparaat: string | null;
  eigenaar: boolean | null;
  kenmerken: Kenmerken | null;
  /** Scherm-id naar het moment dat het voor het eerst in beeld kwam. */
  tijden: Record<string, string> | null;
};

export type SchermRegel = { id: SchermId; label: string; fase: string; soms: boolean; gezien: number; afgehaakt: number; deelVanGestart: number };
export type Groep = { sleutel: string; geopend: number; gestart: number; gelezen: number; advies: number; aanvraag: number };

export type Verloop = {
  aantalEigen: number;
  nogBezig: number;
  trechter: { stap: string; aantal: number }[];
  schermen: SchermRegel[];
  perBank: Groep[];
  perApparaat: Groep[];
  perDownloadPlek: Groep[];
  leesfouten: { fout: string; aantal: number }[];
  adviesStatus: { status: string; aantal: number }[];
  mediaanMinutenTotAdvies: number | null;
};

/** Wie korter dan dit geleden nog iets deed, telt niet als afgehaakt maar als nog bezig. */
export const NOG_BEZIG_MS = 30 * 60 * 1000;

function gezien(r: VoortgangRij, id: SchermId): boolean {
  if (r.tijden && r.tijden[id]) return true;
  // Vangnet voor rijen zonder tijden: verplichte schermen tot het verste scherm tellen als gezien.
  const s = SCHERMEN[schermIndex(id)];
  return !s.soms && (r.max_scherm_index ?? -1) >= schermIndex(id);
}

function mediaan(x: number[]): number | null {
  if (x.length === 0) return null;
  const s = x.slice().sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
}

export function berekenVerloop(alle: VoortgangRij[], opties: { eigenTonen?: boolean; nu?: number } = {}): Verloop {
  const nu = opties.nu ?? Date.now();
  const aantalEigen = alle.filter((r) => r.eigenaar === true).length;
  const rijen = opties.eigenTonen ? alle : alle.filter((r) => r.eigenaar !== true);
  const gestartIdx = schermIndex(GESTART_VANAF);
  const isGestart = (r: VoortgangRij) => (r.max_scherm_index ?? -1) >= gestartIdx;
  const isGelezen = (r: VoortgangRij) => gezien(r, "gelezen");
  const heeftAdvies = (r: VoortgangRij) => gezien(r, "voorlopig_advies");
  const heeftAanvraag = (r: VoortgangRij) => gezien(r, "aanvraag_verzonden");
  const bezig = (r: VoortgangRij) => nu - new Date(r.updated_at).getTime() < NOG_BEZIG_MS;
  const gestart = rijen.filter(isGestart);
  const laatsteIdx = schermIndex("aanvraag_verzonden");

  const schermen: SchermRegel[] = SCHERMEN.map((s) => {
    const idx = schermIndex(s.id);
    const zag = rijen.filter((r) => gezien(r, s.id)).length;
    const afgehaakt = rijen.filter((r) => (r.max_scherm_index ?? -1) === idx && idx !== laatsteIdx && !bezig(r)).length;
    return {
      id: s.id,
      label: s.label,
      fase: s.fase,
      soms: s.soms,
      gezien: zag,
      afgehaakt: afgehaakt,
      deelVanGestart: gestart.length && idx >= gestartIdx ? Math.round((100 * zag) / gestart.length) : 0,
    };
  });

  const groepeer = (sleutel: (r: VoortgangRij) => string | undefined | null): Groep[] => {
    const m = new Map<string, Groep>();
    rijen.forEach((r) => {
      const k = sleutel(r) || "onbekend";
      const g = m.get(k) || { sleutel: k, geopend: 0, gestart: 0, gelezen: 0, advies: 0, aanvraag: 0 };
      g.geopend++;
      if (isGestart(r)) g.gestart++;
      if (isGelezen(r)) g.gelezen++;
      if (heeftAdvies(r)) g.advies++;
      if (heeftAanvraag(r)) g.aanvraag++;
      m.set(k, g);
    });
    return Array.from(m.values()).sort((a, b) => b.gestart - a.gestart || b.geopend - a.geopend);
  };

  const tel = (waarden: (string | undefined)[]) => {
    const m = new Map<string, number>();
    waarden.forEach((w) => {
      if (w) m.set(w, (m.get(w) || 0) + 1);
    });
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  };

  const duur: number[] = [];
  rijen.forEach((r) => {
    const van = r.tijden?.bank;
    const tot = r.tijden?.voorlopig_advies;
    if (van && tot) duur.push(Math.max(0, Math.round((new Date(tot).getTime() - new Date(van).getTime()) / 60000)));
  });

  return {
    aantalEigen: aantalEigen,
    nogBezig: rijen.filter((r) => bezig(r) && (r.max_scherm_index ?? -1) < laatsteIdx).length,
    trechter: [
      { stap: "Geopend", aantal: rijen.length },
      { stap: "Gestart (bank gekozen)", aantal: gestart.length },
      { stap: "Bestand gelezen", aantal: rijen.filter(isGelezen).length },
      { stap: "Overzicht gezien", aantal: rijen.filter((r) => gezien(r, "overzicht")).length },
      { stap: "Voorlopig advies gezien", aantal: rijen.filter(heeftAdvies).length },
      { stap: "Geldscan-aanvraag geopend", aantal: rijen.filter((r) => gezien(r, "geldscan_aanvragen")).length },
      { stap: "Aanvraag verzonden", aantal: rijen.filter(heeftAanvraag).length },
    ],
    schermen: schermen,
    perBank: groepeer((r) => r.kenmerken?.bank),
    perApparaat: groepeer((r) => r.apparaat),
    perDownloadPlek: groepeer((r) => r.kenmerken?.downloadPlek),
    leesfouten: tel(rijen.map((r) => r.kenmerken?.leesfout)).map(([fout, aantal]) => ({ fout: fout, aantal: aantal })),
    adviesStatus: tel(rijen.map((r) => r.kenmerken?.adviesStatus)).map(([status, aantal]) => ({ status: status, aantal: aantal })),
    mediaanMinutenTotAdvies: mediaan(duur),
  };
}
