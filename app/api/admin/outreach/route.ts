import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";

const STATUSWEERGAVEN = [
  "nieuw", "verstuurd", "gereageerd_positief", "gereageerd_negatief",
  "gereageerd_neutraal", "gestopt", "bounced",
] as const;
type Statusweergave = (typeof STATUSWEERGAVEN)[number];

// GET /api/admin/outreach, contacten ophalen
// Zonder queryparameters: ongewijzigd gedrag, alle rijen, plat array (bestaande UI leunt hierop).
// Met queryparameters: per-kolom filters (naam, email, plaats, psZin, doelgroep,
// reactie, statusweergave), limiet, offset (standaard 50 rijen). Retourneert dan
// { data, mails, total } i.p.v. een plat array: mails is de outreach_mails-
// geschiedenis per contact (voor de voortgangskolom M1/M2/M3 in de tabel,
// zie docs/admin-redesign-30-jul-2026.md sectie 5b).
export async function GET(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const sp = req.nextUrl.searchParams;
  const zoekterm = sp.get("zoekterm");
  const naam = sp.get("naam");
  const email = sp.get("email");
  const doelgroep = sp.get("doelgroep");
  const status = sp.get("status");
  const plaats = sp.get("plaats");
  const psZin = sp.get("psZin");
  const reactie = sp.get("reactie"); // 'positief' | 'neutraal' | 'negatief' | 'geen'
  const statusweergaveParam = sp.get("statusweergave");
  const statusweergave: Statusweergave | null =
    statusweergaveParam && (STATUSWEERGAVEN as readonly string[]).includes(statusweergaveParam)
      ? (statusweergaveParam as Statusweergave)
      : null;
  const limietParam = sp.get("limiet");
  const offsetParam = sp.get("offset");

  const heeftParams = Boolean(
    zoekterm || naam || email || doelgroep || status || plaats || psZin ||
    reactie || statusweergave || limietParam || offsetParam
  );

  let query = supabase
    .from("outreach_contacts")
    .select("*", heeftParams ? { count: "exact" } : undefined)
    .order("created_at", { ascending: false });

  if (heeftParams) {
    if (doelgroep) query = query.eq("doelgroep", doelgroep);
    if (status) query = query.eq("status", status);
    if (plaats) query = query.ilike("plaats", `%${plaats}%`);
    if (naam) query = query.ilike("naam", `%${naam}%`);
    if (email) query = query.ilike("email", `%${email}%`);
    if (psZin) query = query.ilike("ps_zin", `%${psZin}%`);
    if (zoekterm) query = query.or(`naam.ilike.%${zoekterm}%,email.ilike.%${zoekterm}%`);
    if (reactie === "geen") query = query.is("reactie", null);
    else if (reactie && ["positief", "neutraal", "negatief"].includes(reactie)) {
      query = query.eq("reactie", reactie);
    }

    if (statusweergave) {
      switch (statusweergave) {
        case "nieuw":
          query = query.eq("status", "nieuw");
          break;
        case "verstuurd":
          query = query.in("status", ["verstuurd", "geopend", "geklikt"]).eq("gestopt", false);
          break;
        case "gestopt":
          query = query.eq("gestopt", true);
          break;
        case "bounced":
          query = query.eq("status", "bounced");
          break;
        case "gereageerd_positief":
          query = query.eq("status", "gereageerd").eq("reactie", "positief");
          break;
        case "gereageerd_negatief":
          query = query.eq("status", "gereageerd").eq("reactie", "negatief");
          break;
        case "gereageerd_neutraal":
          query = query.eq("status", "gereageerd").or("reactie.eq.neutraal,reactie.is.null");
          break;
      }
    }

    const limiet = limietParam ? Number(limietParam) : 50;
    const offset = offsetParam ? Number(offsetParam) : 0;
    query = query.range(offset, offset + (Number.isFinite(limiet) ? limiet : 50) - 1);
  }

  const { data, error, count } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!heeftParams) return NextResponse.json(data);

  const ids = (data ?? []).map((c) => c.id as string);
  let mailsPerContact: Record<string, unknown[]> = {};
  if (ids.length > 0) {
    const { data: mails } = await supabase
      .from("outreach_mails")
      .select("*")
      .in("contact_id", ids)
      .order("nummer", { ascending: true });
    mailsPerContact = (mails ?? []).reduce((acc: Record<string, unknown[]>, m) => {
      const key = m.contact_id as string;
      (acc[key] ??= []).push(m);
      return acc;
    }, {});
  }

  return NextResponse.json({ data, mails: mailsPerContact, total: count ?? data?.length ?? 0 });
}

// POST /api/admin/outreach, contact toevoegen
export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const { naam, email, doelgroep, plaats } = await req.json();

  if (!naam || !email) {
    return NextResponse.json({ error: "naam en email zijn verplicht" }, { status: 400 });
  }

  const { data: geblokkeerd } = await supabase
    .from("email_blocklist")
    .select("reden")
    .eq("email", email)
    .maybeSingle();
  if (geblokkeerd) {
    return NextResponse.json(
      { error: `Dit e-mailadres staat op de blocklist (${geblokkeerd.reden})` },
      { status: 409 }
    );
  }

  const { data, error } = await supabase
    .from("outreach_contacts")
    .insert({
      naam,
      email,
      doelgroep: doelgroep ?? "relatietherapeuten",
      plaats: typeof plaats === "string" && plaats.trim() ? plaats.trim() : null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "Dit e-mailadres staat er al in" }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

// PATCH /api/admin/outreach: naam, e-mail, categorie of persoonlijke zin wijzigen,
// een reply markeren (met reactie-classificatie), automatische mails stoppen/hervatten,
// of archiveren. Werkt op een enkel contact (id) of in bulk (ids), zie sectie 5b/5d.
// Body: { id?: string, ids?: string[], naam?: string, email?: string, doelgroep?: string,
//         ps_zin?: string, plaats?: string, gereageerd?: boolean,
//         reactie?: 'positief'|'neutraal'|'negatief'|null, gestopt?: boolean,
//         archiveren?: boolean }
// naam/email worden genegeerd zodra er meer dan 1 id is (bulk mag nooit alle
// geselecteerde contacten dezelfde naam of hetzelfde e-mailadres geven).
export async function PATCH(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const body = await req.json();
  const { id, ids: idsBody, naam, email, doelgroep, ps_zin, plaats, gereageerd, reactie, gestopt, archiveren } = body;

  const ids: string[] = Array.isArray(idsBody) && idsBody.length > 0 ? idsBody : (id ? [id] : []);
  if (ids.length === 0) return NextResponse.json({ error: "id(s) ontbreken" }, { status: 400 });
  const isBulk = ids.length > 1;

  const update: {
    naam?: string; email?: string; doelgroep?: string;
    ps_zin?: string | null; plaats?: string | null; status?: string; gereageerd_at?: string;
    reactie?: string | null; gestopt?: boolean; gestopt_at?: string | null;
    archived_at?: string | null;
  } = {};
  if (!isBulk) {
    if (typeof naam === "string" && naam.trim()) update.naam = naam.trim();
    if (typeof email === "string" && email.trim()) update.email = email.trim();
  }
  if (typeof doelgroep === "string" && doelgroep.trim()) update.doelgroep = doelgroep.trim();
  if (typeof ps_zin === "string") update.ps_zin = ps_zin.trim() || null;
  if (typeof plaats === "string") update.plaats = plaats.trim() || null;
  if (gereageerd === true) {
    update.status = "gereageerd";
    update.gereageerd_at = new Date().toISOString();
  }
  if (typeof reactie === "string" && ["positief", "neutraal", "negatief"].includes(reactie)) {
    update.reactie = reactie;
  } else if (reactie === null) {
    update.reactie = null;
  }
  if (typeof gestopt === "boolean") {
    update.gestopt = gestopt;
    update.gestopt_at = gestopt ? new Date().toISOString() : null;
  }
  if (typeof archiveren === "boolean") {
    update.archived_at = archiveren ? new Date().toISOString() : null;
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "niets om bij te werken" }, { status: 400 });
  }

  if (!isBulk) {
    const { data, error } = await supabase
      .from("outreach_contacts")
      .update(update)
      .eq("id", ids[0])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "Dit e-mailadres staat er al in" }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  }

  const { data, error } = await supabase
    .from("outreach_contacts")
    .update(update)
    .in("id", ids)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, bijgewerkt: data?.length ?? ids.length });
}

// DELETE /api/admin/outreach, contact(en) verwijderen (hard delete)
// Query: ?id=xxx (enkel, bestaand gedrag) of body { ids: string[], blocklist?: boolean }.
// blocklist is standaard aan: het/de e-mailadres(sen) gaat/gaan naar email_blocklist
// voordat de rij(en) verdwijnen, zodat de prospect-zoeker dezelfde persoon niet
// later opnieuw aandraagt (zie docs/admin-redesign-30-jul-2026.md sectie 4).
export async function DELETE(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();

  let ids: string[] = [];
  let blocklist = true;
  const queryId = req.nextUrl.searchParams.get("id");
  if (queryId) {
    ids = [queryId];
  } else {
    const body = await req.json().catch(() => ({} as Record<string, unknown>));
    if (Array.isArray(body.ids)) ids = body.ids as string[];
    if (typeof body.blocklist === "boolean") blocklist = body.blocklist;
  }
  if (ids.length === 0) return NextResponse.json({ error: "id(s) ontbreken" }, { status: 400 });

  if (blocklist) {
    const { data: contacten } = await supabase
      .from("outreach_contacts")
      .select("email")
      .in("id", ids);
    const emails = (contacten ?? []).map((c) => c.email as string);
    if (emails.length > 0) {
      await supabase.from("email_blocklist").upsert(
        emails.map((email) => ({ email, reden: "handmatig", notitie: "Verwijderd uit outreach" })),
        { onConflict: "email", ignoreDuplicates: true }
      );
    }
  }

  const { error } = await supabase
    .from("outreach_contacts")
    .delete()
    .in("id", ids);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, verwijderd: ids.length });
}
