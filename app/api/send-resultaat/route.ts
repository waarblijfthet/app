import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY ?? "placeholder");
  const { email, token, verdict, maandelijksOver, benchmarkOver } =
    await request.json();

  if (!email || !token) {
    return NextResponse.json(
      { error: "Email en token zijn verplicht" },
      { status: 400 }
    );
  }

  const resultaatUrl = `https://waarblijfthet.nl/resultaat/${token}`;
  const verschil = maandelijksOver - benchmarkOver;
  const verschilTekst =
    verschil >= 0
      ? `€${Math.round(verschil)} meer dan vergelijkbare gezinnen`
      : `€${Math.round(Math.abs(verschil))} minder dan vergelijkbare gezinnen`;

  const verdictKleur =
    verdict === "goed" ? "#E8F2EC" : verdict === "matig" ? "#FDF3E3" : "#FDECEA";
  const verdictTekstKleur =
    verdict === "goed" ? "#2D6A4F" : verdict === "matig" ? "#92600A" : "#B03A2E";
  const verdictTitel =
    verdict === "goed"
      ? "Jullie doen het goed"
      : verdict === "matig"
      ? "Er is ruimte voor verbetering"
      : "Dit patroon kennen we";
  const verdictTekst =
    verdict === "goed"
      ? "Er is ruimte — de vraag is of dat geld doelbewust wordt ingezet."
      : verdict === "matig"
      ? "Jullie zitten dicht bij het gemiddelde maar de buffer is klein."
      : "Jullie houden structureel minder over dan vergelijkbare gezinnen. Dit is precies waar wij bij helpen.";

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: email,
      subject: "Jouw financiële analyse — Waar blijft het",
      html: `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Jouw financiële analyse</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F0E8;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#1C3A2A;border-radius:50%;width:36px;height:36px;text-align:center;vertical-align:middle;">
                    <span style="color:#F5F0E8;font-size:14px;font-weight:500;">wb</span>
                  </td>
                  <td style="padding-left:10px;font-size:18px;font-weight:500;color:#1C3A2A;">Waar blijft het</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hoofdkaart -->
          <tr>
            <td style="background-color:#FDFAF4;border-radius:16px;padding:32px;">
              <p style="margin:0 0 8px;font-size:13px;color:#8A9E8E;text-transform:uppercase;letter-spacing:0.1em;">Jouw analyse</p>
              <h1 style="margin:0 0 8px;font-size:36px;color:#1C3A2A;font-weight:300;">
                Jullie houden €${Math.round(maandelijksOver)} over
              </h1>
              <p style="margin:0 0 24px;font-size:15px;color:#4A5E4E;">${verschilTekst}</p>

              <table cellpadding="0" cellspacing="0" style="background-color:${verdictKleur};border-radius:12px;padding:16px;width:100%;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:15px;font-weight:500;color:${verdictTekstKleur};">${verdictTitel}</p>
                    <p style="margin:0;font-size:13px;color:#4A5E4E;">${verdictTekst}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr><td style="height:16px;"></td></tr>

          <!-- CTA -->
          <tr>
            <td style="background-color:#1C3A2A;border-radius:16px;padding:32px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:rgba(245,240,232,0.6);">Bekijk je volledige analyse</p>
              <h2 style="margin:0 0 24px;font-size:22px;color:#F5F0E8;font-weight:400;">Alle details staan voor je klaar</h2>
              <a href="${resultaatUrl}"
                 style="display:inline-block;background-color:#C4603A;color:#FDFAF4;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:16px;font-weight:500;">
                Bekijk mijn analyse →
              </a>
              <p style="margin:16px 0 0;font-size:12px;color:rgba(245,240,232,0.4);">
                Of kopieer: ${resultaatUrl}
              </p>
            </td>
          </tr>

          <tr><td style="height:16px;"></td></tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 0;text-align:center;">
              <p style="margin:0;font-size:12px;color:#8A9E8E;">
                Waar blijft het · waarblijfthet.nl · hallo@waarblijfthet.nl
              </p>
              <p style="margin:4px 0 0;font-size:11px;color:#8A9E8E;">
                Je ontvangt deze email omdat je de gratis analyse hebt ingevuld.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Onbekende fout";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
