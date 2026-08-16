// Afmeldlink onder elke outreach-mail (16-aug-2026).
//
// Waarom: de mails eindigden met "PS: liever niet? Eén woordje is genoeg, dan
// mail ik je niet meer." Dat werkt alleen als iemand daadwerkelijk terugmailt
// én als Jarno dat handmatig verwerkt: contact stopzetten, adres op de
// blocklist. Nu staat er onder elke mail een echte afmeldlink die dat zelf
// doet, zonder tussenkomst.
//
// Hoe het samenhangt:
//   - Elk contact heeft een eigen, niet te raden afmeld_token (uuid) in
//     outreach_contacts, zie supabase/outreach_afmeldlink.sql.
//   - De zichtbare link in de mail wijst naar /afmelden/<token>: een pagina
//     met één bevestigknop. Bewust géén afmelden-op-GET, want link-scanners
//     van Outlook en virusscanners openen alle links in een mail automatisch
//     en zouden mensen dan ongewild afmelden.
//   - De knop op die pagina POST naar /api/afmelden/<token>. Diezelfde
//     POST-route staat ook in de List-Unsubscribe-headers (RFC 8058), zodat
//     de ingebouwde "Uitschrijven"-knop van Gmail/Outlook werkt. Scanners
//     doen GET, geen POST, dus die route is daar niet gevoelig voor.
//
// Dit bestand bevat bewust geen database- of server-imports: de admin-editor
// (app/admin/components/MailsjablonenTabblad.tsx) is een client-component en
// gebruikt dezelfde constanten en dezelfde splitsing voor het voorbeeld, zodat
// de preview nooit afwijkt van de echte mail (zelfde afspraak als
// lib/outreach/render.ts).

export const SITE_URL = "https://www.waarblijfthet.nl";

/** Token dat in de handtekening (of in een alinea) door de echte link vervangen wordt. */
export const AFMELD_TOKEN = "{{AFMELDLINK}}";

/**
 * Regel die automatisch onder de mail komt als de handtekening zelf geen
 * {{AFMELDLINK}} bevat. Zo staat er hoe dan ook een afmeldmogelijkheid onder
 * elke mail, ook als de handtekening in de admin ooit leeggehaald wordt.
 */
export const DEFAULT_AFMELDREGEL = `Geen mail meer van mij? [Meld je hier af](${AFMELD_TOKEN}), dan hoor je niets meer.`;

/** Token dat de admin-preview gebruikt; deze pagina bestaat en legt netjes uit dat de link een voorbeeld is. */
export const VOORBEELD_TOKEN = "voorbeeld";

/**
 * De pagina met de bevestigknop, dit is de link die in de mailtekst staat.
 * Zonder token (zou niet moeten kunnen na de migratie) wijst de link naar
 * /afmelden/onbekend, dat een nette uitleg met mailadres toont in plaats van
 * een kapotte link of een 404.
 */
export function afmeldPaginaUrl(token?: string | null): string {
  const schoon = (token ?? "").trim();
  return `${SITE_URL}/afmelden/${schoon || "onbekend"}`;
}

/** De POST-route, voor de List-Unsubscribe-headers (RFC 8058). */
export function afmeldApiUrl(token?: string | null): string {
  const schoon = (token ?? "").trim();
  return `${SITE_URL}/api/afmelden/${schoon || "onbekend"}`;
}

/** Vervangt elk {{AFMELDLINK}} door de echte url. Split/join i.p.v. regex vanwege de accolades. */
export function vulAfmeldUrl(tekst: string, url: string): string {
  return tekst.split(AFMELD_TOKEN).join(url);
}

/**
 * Splitst de handtekening in het deel dat ongewijzigd blijft en de losse
 * afmeldregel eronder.
 *
 * Bevat de handtekening zelf een {{AFMELDLINK}}, dan bepaalt Jarno de
 * bewoording en de plek, en komt er niets extra's bij (afmeldregel = null).
 * Staat het token er niet in, dan wordt DEFAULT_AFMELDREGEL als aparte,
 * kleinere regel onder de handtekening gezet.
 */
export function splitsAfmeldregel(
  handtekening: string,
  url: string
): { handtekening: string; afmeldregel: string | null } {
  if (handtekening.includes(AFMELD_TOKEN)) {
    return { handtekening: vulAfmeldUrl(handtekening, url), afmeldregel: null };
  }
  return { handtekening, afmeldregel: vulAfmeldUrl(DEFAULT_AFMELDREGEL, url) };
}
