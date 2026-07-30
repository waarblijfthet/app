import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { SOORT_PRIORITEIT, volgendeWerkdag } from "@/lib/contacten/labels";

type Bron = "outreach" | "aanvraag" | "lead";

interface Body {
  bron: Bron;
  outreach_contact_id?: string;
  intake_id?: string;
  lead_id?: string;
}

function datumKort(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function leesTekst(waarde: unknown): string | null {
  if (typeof waarde !== "string") return null;
  const getrimd = waarde.trim();
  return getrimd ? getrimd : null;
}

/**
 * Bouwt de mailhistorie als leesbare regels, voor de systeemnotitie bij het
 * doorzetten vanuit outreach (opdracht 1, "zodat ik in het contact kan zien
 * wat er eerder is verstuurd en geopend").
 */
function mailhistorieTekst(mails: { nummer: number; verstuurd_at: string; geopend_at: string | null; geklikt_at: string | null; bounced_at: string | null }[]): string {
  if (mails.length === 0) return "Nog geen mails verstuurd.";
  return mails
    .sort((a, b) => a.nummer - b.nummer)
    .map((m) => {
      let regel = `Mail ${m.nummer} verstuurd ${datumKort(m.verstuurd_at)}`;
      if (m.geklikt_at) regel += `, geklikt ${datumKort(m.geklikt_at)}`;
      else if (m.geopend_at) regel += `, geopend ${datumKort(m.geopend_at)}`;
      if (m.bounced_at) regel += ", bounced";
      return regel;
    })
    .join(". ") + ".";
}

function faseUitAanvraagstatus(status: string): string {
  if (status === "betaald") return "betaald";
  if (status === "gestart") return "gegevens binnen";
  return "aangemeld";
}

const PAKKET_LABEL: Record<string, string> = {
  intensief: "Intensief",
  geldscan: "Geldscan",
};

/**
 * POST /api/admin/contacten/doorzetten, één route, drie ingangen.
 * Body: { bron: "outreach", outreach_contact_id } | { bron: "aanvraag", intake_id }
 *     | { bron: "lead", lead_id }
 *
 * Idempotent: bestaat er al een contacten-rij met deze bron-id (gekoppeld via
 * outreach_contact_id / intake_id / lead_id), dan gebeurt er niets nieuws en
 * komt die rij terug met alGekoppeld: true. Bestaat het e-mailadres al onder
 * een andere bron, dan wordt die rij verrijkt (lege velden gevuld, gevulde
 * velden ongemoeid) in plaats van een tweede rij aan te maken. soort/fase
 * schuiven daarbij alleen omhoog (lead -> verwijzer -> klant), zie
 * SOORT_PRIORITEIT in lib/contacten/labels.ts.
 */
export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const body = (await req.json()) as Body;
  const bron = body.bron;

  if (!["outreach", "aanvraag", "lead"].includes(bron)) {
    return NextResponse.json({ error: "Onbekende bron" }, { status: 400 });
  }

  // ── Stap 1: brondata ophalen en de doelvelden bepalen ──────────────────
  let email = "";
  let naam = "";
  let doelSoort = "lead";
  let doelFase = "nieuw";
  let doelBron = "handmatig";
  let koppelKolom: "outreach_contact_id" | "intake_id" | "lead_id" = "lead_id";
  let koppelWaarde = "";
  let extraVelden: Record<string, unknown> = {};
  let notitieTekst = "";
  let volgendeActie: string | null = null;
  let volgendeActieOp: string | null = null;

  if (bron === "outreach") {
    const outreachId = leesTekst(body.outreach_contact_id);
    if (!outreachId) {
      return NextResponse.json({ error: "outreach_contact_id ontbreekt" }, { status: 400 });
    }
    const [{ data: contact, error: contactError }, { data: mails }] = await Promise.all([
      supabase.from("outreach_contacts").select("*").eq("id", outreachId).single(),
      supabase
        .from("outreach_mails")
        .select("nummer, verstuurd_at, geopend_at, geklikt_at, bounced_at")
        .eq("contact_id", outreachId),
    ]);
    if (contactError || !contact) {
      return NextResponse.json({ error: "Outreach-contact niet gevonden" }, { status: 404 });
    }
    email = String(contact.email).trim().toLowerCase();
    naam = contact.naam;
    doelSoort = "verwijzer";
    doelFase = "gereageerd";
    doelBron = "outreach";
    koppelKolom = "outreach_contact_id";
    koppelWaarde = outreachId;
    extraVelden = {
      praktijk: leesTekst(contact.praktijk),
      website: leesTekst(contact.website),
      plaats: leesTekst(contact.plaats),
      doelgroep: leesTekst(contact.doelgroep),
    };
    const rijp = volgendeWerkdag(4);
    volgendeActie = "Vervolgcontact na reactie op outreach";
    volgendeActieOp = rijp.toISOString().slice(0, 10);
    notitieTekst = `Doorgezet vanuit outreach. Mailhistorie: ${mailhistorieTekst(mails ?? [])}`;
  }

  if (bron === "aanvraag") {
    const intakeId = leesTekst(body.intake_id);
    if (!intakeId) {
      return NextResponse.json({ error: "intake_id ontbreekt" }, { status: 400 });
    }
    const { data: aanvraag, error: aanvraagError } = await supabase
      .from("intake_aanvragen")
      .select("id, naam, email, status, pakket, analyse_token, created_at")
      .eq("id", intakeId)
      .single();
    if (aanvraagError || !aanvraag) {
      return NextResponse.json({ error: "Aanvraag niet gevonden" }, { status: 404 });
    }
    if (!aanvraag.email) {
      return NextResponse.json({ error: "Deze aanvraag heeft geen e-mailadres, kan niet doorgezet worden." }, { status: 400 });
    }
    email = String(aanvraag.email).trim().toLowerCase();
    naam = aanvraag.naam ?? email;
    doelSoort = "klant";
    doelFase = faseUitAanvraagstatus(aanvraag.status);
    doelBron = "intake";
    koppelKolom = "intake_id";
    koppelWaarde = intakeId;
    extraVelden = {
      analyse_token: leesTekst(aanvraag.analyse_token),
    };
    volgendeActie = null;
    volgendeActieOp = null;
    notitieTekst = `Doorgezet vanuit aanvragen. Pakket ${PAKKET_LABEL[aanvraag.pakket] ?? aanvraag.pakket}, status ${aanvraag.status}, aangevraagd op ${datumKort(aanvraag.created_at)}.`;
  }

  if (bron === "lead") {
    const leadId = leesTekst(body.lead_id);
    if (!leadId) {
      return NextResponse.json({ error: "lead_id ontbreekt" }, { status: 400 });
    }
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("id, email, naam, bron, created_at, quiz_voltooid")
      .eq("id", leadId)
      .single();
    if (leadError || !lead) {
      return NextResponse.json({ error: "Lead niet gevonden" }, { status: 404 });
    }
    email = String(lead.email).trim().toLowerCase();
    naam = lead.naam ?? email;
    doelSoort = "lead";
    doelFase = lead.quiz_voltooid ? "analyse gedaan" : "nieuw";
    doelBron = leesTekst(lead.bron) ?? "analyse";
    koppelKolom = "lead_id";
    koppelWaarde = leadId;
    extraVelden = {};
    volgendeActie = null;
    volgendeActieOp = null;
    notitieTekst = `Doorgezet vanuit leads. Bron ${lead.bron ?? "onbekend"}, aangemeld op ${datumKort(lead.created_at)}, quiz voltooid: ${lead.quiz_voltooid ? "ja" : "nee"}.`;
  }

  if (!email) {
    return NextResponse.json({ error: "Geen e-mailadres gevonden" }, { status: 400 });
  }

  // ── Stap 2: al doorgezet vanuit precies deze bron? Dan niets nieuws. ───
  const { data: algekoppeld } = await supabase
    .from("contacten")
    .select("*")
    .eq(koppelKolom, koppelWaarde)
    .maybeSingle();

  if (algekoppeld) {
    return NextResponse.json({ contact: algekoppeld, created: false, bijgewerkt: false, bijgewerkteVelden: [], alGekoppeld: true });
  }

  // ── Stap 3: bestaat het e-mailadres al onder een andere bron? Verrijken. ─
  const { data: bestaand } = await supabase
    .from("contacten")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (bestaand) {
    const update: Record<string, unknown> = { updated_at: new Date().toISOString(), laatste_contact_at: new Date().toISOString() };
    const bijgewerkteVelden: string[] = [];

    // Lege velden vullen, gevulde velden niet overschrijven.
    for (const [veld, waarde] of Object.entries({ ...extraVelden, [koppelKolom]: koppelWaarde })) {
      if (waarde === null || waarde === undefined) continue;
      const huidig = (bestaand as Record<string, unknown>)[veld];
      if (huidig === null || huidig === undefined || huidig === "") {
        update[veld] = waarde;
        bijgewerkteVelden.push(veld);
      }
    }
    if (!bestaand.bron) {
      update.bron = doelBron;
      bijgewerkteVelden.push("bron");
    }
    if (!bestaand.volgende_actie_op && volgendeActieOp) {
      update.volgende_actie = volgendeActie;
      update.volgende_actie_op = volgendeActieOp;
      bijgewerkteVelden.push("volgende_actie_op");
    }
    // soort/fase mogen alleen omhoog schuiven, nooit terug (zie
    // SOORT_PRIORITEIT), zodat iemand die eerst lead was en nu doorzet als
    // klant niet terugvalt naar lead bij een latere outreach-koppeling.
    const huidigePrioriteit = SOORT_PRIORITEIT[bestaand.soort] ?? 0;
    const nieuwePrioriteit = SOORT_PRIORITEIT[doelSoort] ?? 0;
    if (nieuwePrioriteit > huidigePrioriteit) {
      update.soort = doelSoort;
      update.fase = doelFase;
      bijgewerkteVelden.push("soort", "fase");
    }

    const { data: bijgewerkt, error: updateError } = await supabase
      .from("contacten")
      .update(update)
      .eq("id", bestaand.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    await supabase.from("contact_notities").insert({
      contact_id: bestaand.id,
      tekst: notitieTekst,
      soort: "systeem",
    });

    return NextResponse.json({
      contact: bijgewerkt,
      created: false,
      bijgewerkt: true,
      bijgewerkteVelden,
      alGekoppeld: false,
    });
  }

  // ── Stap 4: nieuw contact aanmaken ──────────────────────────────────────
  const insert: Record<string, unknown> = {
    naam,
    email,
    soort: doelSoort,
    fase: doelFase,
    bron: doelBron,
    [koppelKolom]: koppelWaarde,
    laatste_contact_at: new Date().toISOString(),
    volgende_actie: volgendeActie,
    volgende_actie_op: volgendeActieOp,
    ...extraVelden,
  };

  const { data: nieuw, error: insertError } = await supabase
    .from("contacten")
    .insert(insert)
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  await supabase.from("contact_notities").insert({
    contact_id: nieuw.id,
    tekst: notitieTekst,
    soort: "systeem",
  });

  return NextResponse.json({ contact: nieuw, created: true, bijgewerkt: false, bijgewerkteVelden: [], alGekoppeld: false }, { status: 201 });
}
