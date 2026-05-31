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

    const pakketLabel =
      pakket === "intensief"
        ? "Persoonlijke begeleiding op maat (€497)"
        : "Eenmalig adviesgesprek (€125)";

    // Bevestiging naar aanvrager
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: email,
      subject: "Aanmelding ontvangen — Waar blijft het",
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
            We hebben je aanmelding voor <strong>${pakketLabel}</strong> goed ontvangen.
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:#4A5E4E;line-height:1.7;">
            We nemen binnen één werkdag persoonlijk contact op — niet met een standaard mail, maar met een bericht dat aansluit op wat je hebt ingevuld.
          </p>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr><td style="background-color:#E8F2EC;border-radius:12px;padding:16px;">
              <p style="margin:0 0 4px;font-size:14px;font-weight:500;color:#1C3A2A;">Wat er nu gebeurt</p>
              <p style="margin:0;font-size:13px;color:#4A5E4E;line-height:1.7;">
                1. We lezen je aanmelding door<br>
                2. We sturen je binnen één werkdag een persoonlijk bericht<br>
                3. We maken een afspraak voor een kort kennismakingsgesprek<br>
                4. Daarna beslissen jullie of je wil starten
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
