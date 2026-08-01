// Gedeelde render-helpers voor outreach-teksten: eenvoudige, expres beperkte
// markdown-achtige opmaak die zowel de html-mail als de admin-preview
// gebruiken (lib/outreach/mails.ts op de server, MailsjablonenTabblad.tsx op
// de client), zodat de preview nooit afwijkt van de echte mail.
//
// Ondersteund:
//   [linktekst](https://...)   -> klikbare link (html) / "linktekst (url)" (tekst)
//   **vet**                    -> <strong>vet</strong> (html) / "vet" (tekst)
//   *cursief* of _cursief_     -> <em>cursief</em> (html) / "cursief" (tekst)
//
// Toegevoegd 1-aug-2026 op verzoek van Jarno: eerst een klikbare link
// (kon niet met platte alinea-tekst), daarna vet/cursief.

// Alleen http(s)-links, geen javascript:/data:-achtige schema's.
export const LINK_REGEX = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
// Vet eerst herkennen (dubbele asterisk), anders leest \*tekst\* na een
// **vet**-blok als twee losse cursief-markers.
const BOLD_REGEX = /\*\*([^\n*]+)\*\*/g;
const ITALIC_REGEX = /\*([^\n*]+)\*|_([^\n_]+)_/g;

export function escapeHtml(tekst: string): string {
  return tekst.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Escaped tekst + vet/cursief naar html, voor een tekstsegment zonder link erin. */
function opmaakNaarHtml(tekst: string): string {
  const escaped = escapeHtml(tekst);
  const metVet = escaped.replace(BOLD_REGEX, (_m, inner: string) => `<strong>${inner}</strong>`);
  return metVet.replace(ITALIC_REGEX, (_m, a: string | undefined, b: string | undefined) => `<em>${a ?? b}</em>`);
}

/** Vet/cursief-markers eraf, voor een tekstsegment zonder link erin. */
function opmaakNaarText(tekst: string): string {
  const zonderVet = tekst.replace(BOLD_REGEX, "$1");
  return zonderVet.replace(ITALIC_REGEX, (_m, a: string | undefined, b: string | undefined) => a ?? b ?? "");
}

/**
 * Eén alinea (of de handtekening) naar html: escaped tekst met vet/cursief,
 * [tekst](url) wordt een <a>, \n wordt <br>. Opmaak binnen de linktekst zelf
 * wordt bewust niet ondersteund (houdt de link simpel en voorspelbaar).
 */
export function alineaNaarHtml(alinea: string): string {
  const delen = alinea.split(LINK_REGEX);
  let html = "";
  for (let i = 0; i < delen.length; i += 3) {
    html += opmaakNaarHtml(delen[i] ?? "").replace(/\n/g, "<br>");
    if (i + 1 < delen.length) {
      const linkTekst = escapeHtml(delen[i + 1] ?? "");
      const url = escapeHtml(delen[i + 2] ?? "");
      html += `<a href="${url}" style="color:#16211F;text-decoration:underline;">${linkTekst}</a>`;
    }
  }
  return html;
}

/**
 * Eén alinea (of de handtekening) naar platte tekst: [tekst](url) wordt
 * "tekst (url)" zodat de link ook zonder html-weergave leesbaar/kopieerbaar
 * is; vet/cursief-markers verdwijnen (platte tekst kent geen opmaak).
 */
export function alineaNaarText(alinea: string): string {
  const metLinkAlsTekst = alinea.replace(LINK_REGEX, (_match, tekst: string, url: string) => `${tekst} (${url})`);
  return opmaakNaarText(metLinkAlsTekst);
}
