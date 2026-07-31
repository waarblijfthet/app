import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { DEFAULT_TEMPLATES, Doelgroep, MailType } from "@/lib/outreach/mails";

// De doelgroepen en mailtypen die de admin-editor toont, in vaste volgorde.
// Zelfde bron als lib/outreach/labels.ts idealiter, maar dat bestand kent
// alleen doelgroepen; het mailtype-onderscheid (eerste/fu1/fu2) hoort bij
// dit sjabloon-systeem.
const DOELGROEPEN: Doelgroep[] = [
  "relatietherapeuten",
  "budgetcoaches",
  "financieel-planners",
  "burnout-coaches",
  "boekhouders",
];
const TYPES: MailType[] = ["eerste", "fu1", "fu2"];

// GET /api/admin/outreach/templates
// Geeft alle 15 combinaties terug (5 doelgroepen x 3 mailtypen), met de
// database-rij indien aanwezig; anders komt de rij niet mee en toont de
// editor "nog niet aangepast, terugval-tekst uit de code" (client-side,
// want de terugvalteksten zelf staan in lib/outreach/mails.ts en worden
// bewust niet hier gedupliceerd om nooit uit de pas te lopen).
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("outreach_templates")
    .select("doelgroep, type, subject, subject_naamloos, regio_zin, alineas, updated_at");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const bestaand = new Map((data ?? []).map((r) => [`${r.doelgroep}:${r.type}`, r]));
  const items = DOELGROEPEN.flatMap((doelgroep) =>
    TYPES.map((type) => {
      const rij = bestaand.get(`${doelgroep}:${type}`);
      const standaard = DEFAULT_TEMPLATES[doelgroep][type];
      return {
        doelgroep,
        type,
        // Actief gebruikte tekst: de databaserij indien aanwezig, anders de
        // terugvaltekst uit de code (lib/outreach/mails.ts). Zo toont de
        // editor altijd wat er echt verstuurd wordt, ook als er nog nooit
        // iets aangepast is.
        subject: rij?.subject ?? standaard.subject ?? null,
        subjectNaamloos: rij?.subject_naamloos ?? standaard.subjectNaamloos ?? null,
        regioZin: rij?.regio_zin ?? standaard.regioZin ?? null,
        alineas: (rij?.alineas as string[] | undefined) ?? standaard.alineas,
        aangepast: Boolean(rij),
        updatedAt: rij?.updated_at ?? null,
      };
    })
  );

  return NextResponse.json({ items });
}

// PATCH /api/admin/outreach/templates
// Body: { doelgroep, type, subject?, subjectNaamloos?, regioZin?, alineas }
// Upsert op (doelgroep, type). alineas is verplicht en moet een array van
// strings zijn; subject/subjectNaamloos/regioZin zijn alleen relevant bij
// type "eerste" maar worden niet geweigerd bij fu1/fu2 (blijven dan ongebruikt).
export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const body = await req.json();
  const { doelgroep, type, subject, subjectNaamloos, regioZin, alineas } = body ?? {};

  if (!DOELGROEPEN.includes(doelgroep)) {
    return NextResponse.json({ error: "Onbekende doelgroep" }, { status: 400 });
  }
  if (!TYPES.includes(type)) {
    return NextResponse.json({ error: "Onbekend mailtype" }, { status: 400 });
  }
  if (!Array.isArray(alineas) || alineas.some((a) => typeof a !== "string")) {
    return NextResponse.json({ error: "alineas moet een array van tekst zijn" }, { status: 400 });
  }
  if (alineas.filter((a: string) => a.trim().length > 0).length === 0) {
    return NextResponse.json({ error: "Er moet minstens één alinea met tekst zijn" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase.from("outreach_templates").upsert(
    {
      doelgroep,
      type,
      subject: subject || null,
      subject_naamloos: subjectNaamloos || null,
      regio_zin: regioZin || null,
      alineas,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "doelgroep,type" }
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

// DELETE /api/admin/outreach/templates?doelgroep=...&type=...
// Verwijdert de aanpassing en laat het sjabloon terugvallen op de
// standaardtekst uit lib/outreach/mails.ts (DEFAULT_TEMPLATES).
export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const doelgroep = searchParams.get("doelgroep");
  const type = searchParams.get("type");
  if (!DOELGROEPEN.includes(doelgroep as Doelgroep)) {
    return NextResponse.json({ error: "Onbekende doelgroep" }, { status: 400 });
  }
  if (!TYPES.includes(type as MailType)) {
    return NextResponse.json({ error: "Onbekend mailtype" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("outreach_templates")
    .delete()
    .eq("doelgroep", doelgroep)
    .eq("type", type);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
