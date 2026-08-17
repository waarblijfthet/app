// Afmeldlink onder elke outreach-mail (16-aug-2026).
//
// Waarom: de mails eindigden met "PS: liever niet? Eén woordje is genoeg, dan
// mail ik je niet meer." Dat werkt alleen als iemand daadwerkelijk terugmailt
// én als Jarno dat handmatig verwerkt: contact stopzetten, adres op de
// blocklist. Nu staat er onder elke mail een echte afmeldlink die dat zelf
// doet, zonder tussenkomst.
//
// Sleutel in de link is het id van het contact (kolom `id` op
// outreach_contacts, een uuid). Bewust niet het e-mailadres: een adres in de
// url is te raden, waarmee iedereen willekeurige mensen zou kunnen afmelden,
// en het lekt bovendien in serverlogs en referrers. Een uuid is niet te raden
// en hoort maar bij één contact.
//
// Bewust ook geen apart afmeld_token-kolom meer (eerste versie van 16-aug had
// die wel): dat maakte de link afhankelijk van een migratie, en zolang die
// niet gedraaid was viel elke mail stil terug op /afmelden/onbekend, precies
// de fout die Jarno in de eerste verzendronde zag. `id` bestaat altijd, dus
// deze link kan niet meer half werken. Wil je één specifieke link ooit
// ongeldig maken, dan is dat contact verwijderen of archiveren de weg.
//
// Hoe het samenhangt:
//   - De zichtbare link in de mail wijst naar /afmelden/<id>: een pagina met
//     één bevestigknop. Bewust géén afmelden-op-GET, want link-scanners van
//     Outlook en virusscanners openen alle links in een mail automatisch en
//     zouden mensen dan ongewild afmelden.
//   - De knop op die pagina POST naar /api/afmelden/<id>. Diezelfde POST-route
//     staat ook in de List-Unsubscribe-headers (RFC 8058), zodat de ingebouwde
//     "Uitschrijven"-knop van Gmail/Outlook werkt. Scanners doen GET, geen
//     POST, dus die route is daar niet gevoelig voor.
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

/** Token dat de admin-preview gebruikt; die pagina legt uit dat de link een voorbeeld is. */
export const VOORBEELD_TOKEN = "voorbeeld";

/**
 * Waarde die in gestopt_reden komt bij afmelden via de link. Ook de
 * herkenning van "al afgemeld" hangt hieraan, dus route en pagina gebruiken
 * allebei deze constante en geen losse letterlijke tekst.
 */
export const AFMELD_REDEN = "Afgemeld via de link in de mail";

/**
 * De pagina met de bevestigknop, dit is de link die in de mailtekst staat.
 * contactId is outreach_contacts.id. De /onbekend-variant is alleen een
 * vangnet voor een aanroep zonder id; die pagina legt uit hoe je je alsnog
 * kunt afmelden in plaats van een 404 te tonen.
 */
export function afmeldPaginaUrl(contactId?: string | null): string {
  const schoon = (contactId ?? "").trim();
  return `${SITE_URL}/afmelden/${schoon || "onbekend"}`;
}

/** De POST-route, voor de List-Unsubscribe-headers (RFC 8058). */
export function afmeldApiUrl(contactId?: string | null): string {
  const schoon = (contactId ?? "").trim();
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
