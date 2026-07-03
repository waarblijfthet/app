import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";

// Resend stuurt POST-events naar deze route.
// Stel in het Resend-dashboard in:
//   URL: https://www.waarblijfthet.nl/api/resend-webhook?secret=JOUW_WEBHOOK_SECRET
//   Events: email.opened, email.clicked, email.bounced, email.spam_complaint
//
// Voeg toe aan .env.local:
//   RESEND_WEBHOOK_SECRET=willekeurige-lange-string

export async function POST(req: NextRequest) {
  // Eenvoudige secret-check via query param
  const secret = req.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.RESEND_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: { type: string; data: { email_id: string; created_at: string } };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige payload" }, { status: 400 });
  }

  const { type, data } = payload;
  const resendId = data?.email_id;
  if (!resendId) return NextResponse.json({ ok: true }); // niets te doen

  const supabase = createServiceClient();

  const statusMap: Record<string, { status: string; veld: string }> = {
    "email.opened":           { status: "geopend",  veld: "geopend_at" },
    "email.clicked":          { status: "geklikt",  veld: "geklikt_at" },
    "email.bounced":          { status: "bounced",  veld: "bounced_at" },
    "email.spam_complaint":   { status: "bounced",  veld: "bounced_at" },
  };

  const mapping = statusMap[type];
  if (!mapping) return NextResponse.json({ ok: true }); // event interesseert ons niet

  // Een handmatig gemarkeerde reply ('gereageerd') is het eindstation en mag
  // nooit door een open/klik-event worden overschreven. En een 'geopend'-event
  // mag 'geklikt' niet degraderen.
  const overschrijfbaar =
    type === "email.opened"
      ? ["verstuurd", "geopend"]
      : ["verstuurd", "geopend", "geklikt", "bounced"];

  await supabase
    .from("outreach_contacts")
    .update({
      status: mapping.status,
      [mapping.veld]: data.created_at ?? new Date().toISOString(),
    })
    .eq("resend_id", resendId)
    .in("status", overschrijfbaar);

  return NextResponse.json({ ok: true });
}
