import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase-service";
import { antwoordenAlsTekst, valideerAanvraag, type Aanvraag } from "@/lib/uitgavenscan/aanvraag";
import { binnenLimiet, leesJson } from "@/lib/uitgavenscan/limiet";

/**
 * POST /api/uitgavenscan/aanvraag (9-nov-2026): de Geldscan aanvragen vanuit de uitgavenscan.
 * Slaat de aanvraag op in intake_aanvragen (pakket geldscan, spoor uitgavenscan) met de samenvatting,
 * stuurt de bezoeker een bevestiging met het betaalverzoek en Jarno een melding met de samenvatting
 * als bijlage, zodat hij het plan kan maken. Volgorde blijft: aanvragen, betalen, dan het plan.
 */
export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const euro = (n: number) => (n < 0 ? "min € " : "€ ") + Math.abs(Math.round(n)).toLocaleString("nl-NL");

function betaallink(): string | null {
  const link = (process.env.GELDSCAN_BETAALLINK ?? "").trim();
  return /^https:\/\/[^\s"<>]+$/.test(link) ? link : null;
}

function mailKlant(a: Aanvraag, link: string | null): string {
  const stap1 = link
    ? "Betaal € 49 via de knop hieronder. Zet je voornaam in de omschrijving."
    : "Je krijgt binnen één werkdag een betaalverzoek van € 49 van mij (Tikkie of overboeking).";
  return `<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F7F8F7;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F7F8F7;padding:40px 20px;"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
<tr><td style="padding-bottom:24px;"><span style="font-size:18px;font-weight:500;color:#16211F;">Waar blijft het</span></td></tr>
<tr><td style="background-color:#FFFFFF;border-radius:16px;padding:32px;">
<p style="margin:0 0 6px;font-size:12px;color:#8B958F;text-transform:uppercase;letter-spacing:0.1em;">Geldscan aangevraagd</p>
<h1 style="margin:0 0 16px;font-size:26px;color:#16211F;font-weight:500;">Hoi ${esc(a.naam)},</h1>
<p style="margin:0 0 16px;font-size:15px;color:#4A5A56;line-height:1.7;">Je aanvraag voor de Geldscan is binnen. Je samenvatting uit de uitgavenscan zit erbij, dus je hoeft niets meer op te sturen.</p>
<table cellpadding="0" cellspacing="0" width="100%"><tr><td style="background-color:#E7F1EE;border-radius:12px;padding:16px;">
<p style="margin:0 0 4px;font-size:14px;font-weight:500;color:#16211F;">Wat er nu gebeurt</p>
<p style="margin:0;font-size:13px;color:#4A5A56;line-height:1.7;">1. ${stap1}<br>2. Binnen 24 uur na je betaling krijg je je plan op maat: je potjes met bedragen, welke overboeking op welke dag, en wanneer de kosten komen die niet elke maand komen. Als pdf en als Excel.<br>3. Ik kijk je plan zelf na voordat je het krijgt.<br>4. Na 6 weken krijg je een mail voor een korte check of het werkt.</p>
</td></tr></table>
<p style="margin:16px 0 0;font-size:13px;color:#8B958F;line-height:1.6;">In je samenvatting staan geen namen en geen rekeningnummers. Ik verwijder hem nadat je plan verstuurd is.</p>
</td></tr>
<tr><td style="height:16px;"></td></tr>
${
  link
    ? `<tr><td style="background-color:#16211F;border-radius:16px;padding:24px;text-align:center;">
<p style="margin:0 0 8px;font-size:13px;color:rgba(245,240,232,0.75);">De Geldscan, € 49 eenmalig</p>
<a href="${link}" style="display:inline-block;background-color:#0B7A6E;color:#FFFFFF;text-decoration:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:500;">Betaal € 49</a>
<p style="margin:12px 0 0;font-size:12px;color:rgba(245,240,232,0.6);">Zet je voornaam in de omschrijving, dan koppel ik de betaling aan je aanvraag.</p>
</td></tr>`
    : ""
}
<tr><td style="padding:16px 0;text-align:center;"><p style="margin:0;font-size:12px;color:#8B958F;">Waar blijft het · waarblijfthet.nl</p>
<p style="margin:4px 0 0;font-size:11px;color:#8B958F;">Vragen? Antwoord op deze mail of mail naar hallo@waarblijfthet.nl</p></td></tr>
</table></td></tr></table></body></html>`;
}

function mailJarno(a: Aanvraag, link: string | null, kolomOpgeslagen: boolean): string {
  const s = a.samenvatting;
  const g = s.gemiddeldPerMaand;
  const regels: [string, string][] = [
    ["Maanden", s.maanden.join(", ")],
    ["Inkomen per maand", euro(g.inkomen)],
    ["Vaste lasten", euro(g.vast)],
    ["Niet elke maand", euro(g.nietMaandelijks)],
    ["Dagelijks", euro(g.dagelijks)],
    ["Extra aflossing", euro(g.extraAflossing)],
    ["Over, gemiddeld", euro(g.over)],
    ["Over, gewone maand", euro(g.overGewoneMaand)],
    ["Netto naar potjes", euro(s.sparen.nettoPerMaand)],
    ["Nog onbekend", s.kwaliteit.aandeelOnbekend + "%"],
  ];
  return `<p>Nieuwe Geldscan-aanvraag via de <strong>uitgavenscan</strong> van <strong>${esc(a.naam)}</strong> (${esc(a.email)}).</p>
<p><strong>Antwoorden:</strong><br>${esc(antwoordenAlsTekst(a))}</p>
<table cellpadding="4" style="border-collapse:collapse;font-size:14px;">${regels.map(([k, v]) => `<tr><td style="color:#4A5A56;">${k}</td><td><strong>${esc(v)}</strong></td></tr>`).join("")}</table>
<p>De volledige samenvatting staat als bijlage bij deze mail${kolomOpgeslagen ? " en in de admin" : ""}.</p>
${kolomOpgeslagen ? "" : "<p><strong>LET OP: de kolom uitgaven_samenvatting ontbreekt nog in intake_aanvragen. Draai supabase/intake_uitgavenscan.sql. De samenvatting staat nu alleen in deze mail.</strong></p>"}
<p><strong>Betaallink in de bevestigingsmail:</strong> ${link ? "ja." : "NEE, GELDSCAN_BETAALLINK staat niet in Vercel. Stuur zelf binnen een werkdag een betaalverzoek van € 49."}</p>
<p>Plan maken: zet de samenvatting in het voorbeeldscript (docs/voorbeeld-geldscan) en kijk het na. Levering binnen 24 uur na betaling.</p>`;
}

export async function POST(request: NextRequest) {
  const body = await leesJson(request, 70000);
  const v = valideerAanvraag(body);
  if (!v.ok) return NextResponse.json({ ok: false, fout: v.fout }, { status: 400 });
  if (!(await binnenLimiet(request, "aanvraag"))) {
    return NextResponse.json({ ok: false, fout: "Er kwamen vandaag al veel aanvragen vanaf dit adres. Mail naar hallo@waarblijfthet.nl." }, { status: 429 });
  }
  const a = v.aanvraag;
  const supabase = createServiceClient();
  const rij: Record<string, unknown> = {
    pakket: "geldscan",
    naam: a.naam,
    email: a.email,
    grootste_knelpunt: antwoordenAlsTekst(a).slice(0, 2000),
    analyse_gedaan: false,
    status: "nieuw",
    uitgaven_samenvatting: a.samenvatting,
  };
  let { error } = await supabase.from("intake_aanvragen").insert(rij);
  let kolomOpgeslagen = true;
  if (error && error.code === "PGRST204" && /uitgaven_samenvatting/.test(error.message || "")) {
    console.warn("uitgavenscan aanvraag: kolom uitgaven_samenvatting ontbreekt, opgeslagen zonder. Draai supabase/intake_uitgavenscan.sql.");
    delete rij.uitgaven_samenvatting;
    kolomOpgeslagen = false;
    ({ error } = await supabase.from("intake_aanvragen").insert(rij));
  }
  if (error) {
    console.error("uitgavenscan aanvraag: opslaan mislukt", error.code, error.message);
    return NextResponse.json({ ok: false, fout: "Opslaan lukte niet. Probeer het zo nog eens, of mail naar hallo@waarblijfthet.nl." }, { status: 500 });
  }

  const link = betaallink();
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const van = process.env.RESEND_FROM ?? "onboarding@resend.dev";
    await resend.emails.send({ from: van, to: a.email, subject: "Je Geldscan-aanvraag is binnen | Waar blijft het", html: mailKlant(a, link) });
    await resend.emails.send({
      from: van,
      to: "jarnomilankoopman@gmail.com",
      subject: "Nieuwe Geldscan via de uitgavenscan: " + a.naam,
      html: mailJarno(a, link, kolomOpgeslagen),
      attachments: [{ filename: "samenvatting-" + a.naam.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".json", content: Buffer.from(JSON.stringify(a.samenvatting, null, 2)).toString("base64") }],
    });
  } catch (e) {
    // De aanvraag staat er al; een mislukte mail mag de bezoeker niet laten denken dat het niet lukte.
    console.error("uitgavenscan aanvraag: mail mislukt", e instanceof Error ? e.message : e);
  }
  return NextResponse.json({ ok: true, betaallink: link !== null });
}
