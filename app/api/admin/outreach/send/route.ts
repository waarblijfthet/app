import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@/lib/supabase-server";

const resend = new Resend(process.env.RESEND_API_KEY);

function emailHtml(naam: string): string {
  return [
    '<!DOCTYPE html>',
    '<html lang="nl">',
    '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>',
    '<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">',
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;padding:40px 24px;">',
    '<tr><td style="font-size:15px;line-height:1.7;color:#1A1A1A;">',
    `<p style="margin:0 0 18px 0;">Beste ${naam},</p>`,
    '<p style="margin:0 0 18px 0;">Je kent ze waarschijnlijk: het koppel waarbij de communicatie over geld in therapie beter wordt, maar de druk niet verdwijnt. Jij verbetert het gesprek. Maar hun financiele situatie verandert er niet door.</p>',
    '<p style="margin:0 0 18px 0;">Ik ben Jarno, financieel coach voor stellen die goed verdienen maar toch krap zitten. Hoe dat eruitziet in de praktijk, lees je <a href="https://www.waarblijfthet.nl/samenwerken/relatietherapeuten" style="color:#C4603A;text-decoration:underline;">hier</a>.</p>',
    '<p style="margin:0 0 32px 0;">Past dit als aanvulling op jouw praktijk?</p>',
    '<p style="margin:0 0 8px 0;font-size:14px;color:#444;line-height:1.6;"><strong style="color:#1A1A1A;display:block;">Jarno Koopman</strong>Financieel coach, Waar blijft het<br><a href="https://www.waarblijfthet.nl" style="color:#C4603A;text-decoration:none;">waarblijfthet.nl</a></p>',
    '<p style="margin:24px 0 0 0;font-size:12px;color:#999;font-style:italic;">Geen interesse? Laat het me weten, dan hoor je niks meer van me.</p>',
    '</td></tr></table></body></html>',
  ].join('\n');
}

// POST /api/admin/outreach/send
// Body: { id: string }  — één contact versturen
// Body: { ids: string[] } — meerdere tegelijk
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();

  const ids: string[] = body.ids ?? (body.id ? [body.id] : []);
  if (ids.length === 0) {
    return NextResponse.json({ error: "id(s) ontbreken" }, { status: 400 });
  }

  const { data: contacten, error: fetchError } = await supabase
    .from("outreach_contacts")
    .select("*")
    .in("id", ids)
    .eq("status", "nieuw");

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!contacten || contacten.length === 0) {
    return NextResponse.json({ error: "Geen nieuwe contacten gevonden" }, { status: 404 });
  }

  const resultaten: { id: string; naam: string; ok: boolean; fout?: string }[] = [];

  for (const contact of contacten) {
    try {
      const { data: mail } = await resend.emails.send({
        from: "Jarno Koopman <hallo@waarblijfthet.nl>",
        to: contact.email,
        subject: `${contact.naam}, herken je dit bij koppels?`,
        html: emailHtml(contact.naam),
      });

      await supabase
        .from("outreach_contacts")
        .update({
          status: "verstuurd",
          verstuurd_at: new Date().toISOString(),
          resend_id: mail?.id ?? null,
        })
        .eq("id", contact.id);

      resultaten.push({ id: contact.id, naam: contact.naam, ok: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Onbekende fout";
      resultaten.push({ id: contact.id, naam: contact.naam, ok: false, fout: message });
    }

    // Kleine pauze bij meerdere mails (voorkomt rate limit)
    if (contacten.indexOf(contact) < contacten.length - 1) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    }
  }

  return NextResponse.json({ resultaten });
}
