import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

const resend = new Resend(process.env.RESEND_API_KEY);

type Doelgroep =
  | "relatietherapeuten"
  | "budgetcoaches"
  | "financieel-planners"
  | "burnout-coaches";

interface EmailContent {
  subject: string;
  html: string;
}

function wrap(body: string): string {
  return [
    '<!DOCTYPE html>',
    '<html lang="nl">',
    '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>',
    '<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">',
    '<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;padding:40px 24px;">',
    '<tr><td style="font-size:15px;line-height:1.7;color:#1A1A1A;">',
    body,
    '<p style="margin:24px 0 0 0;font-size:12px;color:#999;font-style:italic;">Geen interesse? Laat het me weten, dan hoor je niks meer van me.</p>',
    '</td></tr></table></body></html>',
  ].join('\n');
}

function signature(): string {
  return '<p style="margin:0 0 8px 0;font-size:14px;color:#444;line-height:1.6;"><strong style="color:#1A1A1A;display:block;">Jarno Koopman</strong>Financieel coach, Waar blijft het<br><a href="https://www.waarblijfthet.nl" style="color:#C4603A;text-decoration:none;">waarblijfthet.nl</a></p>';
}

function getEmailContent(naam: string, doelgroep: Doelgroep): EmailContent {
  switch (doelgroep) {

    case "relatietherapeuten":
      return {
        subject: `${naam}, wat als geld de belangrijkste oorzaak blijkt?`,
        html: wrap([
          `<p style="margin:0 0 18px 0;">Beste ${naam},</p>`,
          '<p style="margin:0 0 18px 0;">Je kent het waarschijnlijk: het stel waarbij de communicatie in therapie beter wordt, maar de druk niet verdwijnt. Jij verbetert het gesprek. Maar hun financiele situatie verandert er niet door.</p>',
          '<p style="margin:0 0 18px 0;">Ik ben Jarno, financieel coach voor mensen die goed verdienen maar toch krap zitten. Hoe dat eruitziet in de praktijk, lees je <a href="https://www.waarblijfthet.nl/samenwerken/relatietherapeuten" style="color:#C4603A;text-decoration:underline;">hier</a>.</p>',
          '<p style="margin:0 0 32px 0;">Past dit als aanvulling op jouw praktijk?</p>',
          signature(),
        ].join('\n')),
      };

    case "budgetcoaches":
      return {
        subject: `${naam}, als iemand goed verdient maar jouw aanpak niet past`,
        html: wrap([
          `<p style="margin:0 0 18px 0;">Beste ${naam},</p>`,
          '<p style="margin:0 0 18px 0;">Je kent ze waarschijnlijk: mensen met een goed inkomen die bij je aankloppen omdat ze niet weten waar het naartoe gaat. Geen schulden, geen achterstanden. Jouw aanpak is niet echt voor hen bedoeld, en dat weet je zelf ook.</p>',
          '<p style="margin:0 0 18px 0;">Ik ben Jarno, financieel coach voor precies die groep. Hoe dat eruitziet in de praktijk, lees je <a href="https://www.waarblijfthet.nl/samenwerken/budgetcoaches" style="color:#C4603A;text-decoration:underline;">hier</a>.</p>',
          '<p style="margin:0 0 32px 0;">Past dit als doorverwijzing naast jouw werk?</p>',
          signature(),
        ].join('\n')),
      };

    case "financieel-planners":
      return {
        subject: `${naam}, als er te weinig overblijft om jouw advies uit te voeren`,
        html: wrap([
          `<p style="margin:0 0 18px 0;">Beste ${naam},</p>`,
          '<p style="margin:0 0 18px 0;">Soms komen mensen bij je met een inkomen dat genoeg zou moeten zijn, maar blijft er maand na maand te weinig over om jouw advies daadwerkelijk uit te voeren. Niet omdat de strategie niet klopt. Omdat het huishouden lekt.</p>',
          '<p style="margin:0 0 18px 0;">Ik ben Jarno, en ik los dat lek op. Hoe dat eruitziet in de praktijk, lees je <a href="https://www.waarblijfthet.nl/samenwerken/financieel-planners" style="color:#C4603A;text-decoration:underline;">hier</a>.</p>',
          '<p style="margin:0 0 32px 0;">Past dit als aanvulling op jouw adviespraktijk?</p>',
          signature(),
        ].join('\n')),
      };

    case "burnout-coaches":
      return {
        subject: `${naam}, wat als geld het herstel in de weg zit?`,
        html: wrap([
          `<p style="margin:0 0 18px 0;">Beste ${naam},</p>`,
          '<p style="margin:0 0 18px 0;">Bij mensen die herstellen van een burnout zit financiele druk er vaak als onderstroom onder. De werkdruk verdwijnt, maar thuis klopt het niet. Elke maand hetzelfde geknepen gevoel. Dat maakt herstel zwaarder dan het hoeft te zijn.</p>',
          '<p style="margin:0 0 18px 0;">Ik ben Jarno, financieel coach die die onderstroom aanpakt. Hoe dat eruitziet in de praktijk, lees je <a href="https://www.waarblijfthet.nl/samenwerken/burnout-coaches" style="color:#C4603A;text-decoration:underline;">hier</a>.</p>',
          '<p style="margin:0 0 32px 0;">Past dit als aanvulling naast jouw begeleiding?</p>',
          signature(),
        ].join('\n')),
      };
  }
}

// POST /api/admin/outreach/send
// Body: { id: string }  — één contact versturen
// Body: { ids: string[] } — meerdere tegelijk
export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
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
      const doelgroep = (contact.doelgroep ?? "relatietherapeuten") as Doelgroep;
      const { subject, html } = getEmailContent(contact.naam, doelgroep);

      const { data: mail } = await resend.emails.send({
        from: "Jarno Koopman <hallo@waarblijfthet.nl>",
        to: contact.email,
        subject,
        html,
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

    if (contacten.indexOf(contact) < contacten.length - 1) {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
    }
  }

  return NextResponse.json({ resultaten });
}
