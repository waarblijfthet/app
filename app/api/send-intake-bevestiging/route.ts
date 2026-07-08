import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { naam, email, pakket } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Ongeldig emailadres" },
        { status: 400 }
      );
    }

    const isGeldscan = pakket === "geldscan";
    const pakketLabel =
      isGeldscan
        ? "Geldscan met persoonlijk geldrapport (€49)"
        : pakket === "intensief"
        ? "Persoonlijke begeleiding op maat (€497)"
        : "Eenmalig adviesgesprek (€125)";

    const isGesprek = pakket !== "intensief" && !isGeldscan;
    const intro = isGesprek
      ? "Ik neem binnen één werkdag persoonlijk contact op om je adviesgesprek (45 min, video) in te plannen. Je krijgt dan ook het betaalverzoek (€125)."
      : isGeldscan
      ? "Na je aanvraag stuur ik je een betaalverzoek. Zodra dat betaald is, vraag ik je de gratis analyse in te vullen, en binnen twee werkdagen daarna ontvang je jouw persoonlijke geldrapport als PDF per e-mail."
      : "Ik neem binnen één werkdag persoonlijk contact op. Geen standaardmail, maar een bericht dat aansluit op wat je hebt ingevuld.";
    const stappenTitel = isGesprek ? "Zo bereid je je voor" : "Wat er nu gebeurt";
    const stappenHtml = isGesprek
      ? "1. Ik plan je videogesprek van 45 minuten in en je krijgt het betaalverzoek (€125)<br>2. Doe vooraf de gratis analyse, dat is je vertrekpunt (bankafschriften mogen, optioneel)<br>3. In het gesprek kijk ik eerlijk naar je cijfers en bepaal je samen met mij 2 à 3 concrete doelen<br>4. Achteraf krijg je een schriftelijke samenvatting, en direct daarna verwijder ik alles wat je hebt aangeleverd"
      : isGeldscan
      ? "1. Na je aanvraag stuur ik je een betaalverzoek (€49)<br>2. Zodra dat betaald is, vraag ik je de gratis analyse in te vullen (2 minuten), dat geeft me de cijfers voor je rapport<br>3. Optioneel: stuur ook een paar recente bankafschriften mee als bijlage, dan kan ik preciezer zijn<br>4. Binnen twee werkdagen daarna ontvang je jouw persoonlijke geldrapport als PDF, en direct na het versturen verwijder ik je afschriften en gegevens. Vind ik geen drie serieuze verbeterpunten, dan krijg je je geld terug"
      : "1. Ik lees je aanmelding door<br>2. Je krijgt binnen één werkdag een persoonlijk bericht<br>3. Ik plan het intakegesprek (45 min, video) met je in<br>4. Daarna stel ik samen met jou je plan op maat op";

    // Bevestiging naar aanvrager
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: email,
      subject: "Aanmelding ontvangen | Waar blijft het",
      html: `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#F5F0E8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="padding-bottom:24px;">
          <span style="font-size:18px;font-weight:500;color:#1C3A2A;">Waar blijft het</span>
        </td></tr>

        <tr><td style="background-color:#FDFAF4;border-radius:16px;padding:32px;">
          <p style="margin:0 0 6px;font-size:12px;color:#8A9E8E;text-transform:uppercase;letter-spacing:0.1em;">Aanmelding ontvangen</p>
          <h1 style="margin:0 0 16px;font-size:26px;color:#1C3A2A;font-weight:500;">Hoi ${naam || "daar"},</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#4A5E4E;line-height:1.7;">
            Je aanmelding voor <strong>${pakketLabel}</strong> is goed ontvangen.
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:#4A5E4E;line-height:1.7;">
            ${intro}
          </p>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="background-color:#E8F2EC;border-radius:12px;padding:16px;">
              <p style="margin:0 0 4px;font-size:14px;font-weight:500;color:#1C3A2A;">${stappenTitel}</p>
              <p style="margin:0;font-size:13px;color:#4A5E4E;line-height:1.7;">
                ${stappenHtml}
              </p>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="height:16px;"></td></tr>

        <tr><td style="background-color:#1C3A2A;border-radius:16px;padding:24px;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;color:rgba(245,240,232,0.6);">Terwijl je wacht</p>
          <a href="https://www.waarblijfthet.nl/analyse"
             style="display:inline-block;background-color:#C4603A;color:#FDFAF4;text-decoration:none;padding:12px 24px;border-radius:10px;font-size:14px;font-weight:500;">
            Doe de gratis analyse →
          </a>
        </td></tr>

        <tr><td style="padding:16px 0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#8A9E8E;">Waar blijft het · waarblijfthet.nl</p>
          <p style="margin:4px 0 0;font-size:11px;color:#8A9E8E;">Vragen? Mail naar hallo@waarblijfthet.nl</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    });

    // Notificatie naar Jarno
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: "jarnomilankoopman@gmail.com",
      subject: `Nieuwe intake aanvraag: ${pakketLabel}`,
      html: `<p>Nieuwe aanmelding ontvangen voor <strong>${pakketLabel}</strong> van <strong>${naam}</strong> (${email}).</p><p>Bekijk de details in het <a href="https://www.waarblijfthet.nl/admin">admin panel</a>.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Er ging iets mis" },
      { status: 500 }
    );
  }
}
