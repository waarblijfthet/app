import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { berekenWerkvoorraad } from "@/lib/outreach/werkvoorraad";
import { berekenWeekbudget, maandagGrens } from "@/lib/outreach/weekbudget";
import { DOELGROEPEN, DOELGROEP_LABEL } from "@/lib/outreach/labels";
import { OutreachContact } from "@/lib/outreach/types";

/**
 * GET /api/admin/vandaag — alle zes blokken van het Vandaag-dashboard in één
 * keer, server-side geaggregeerd. Zie docs/admin-redesign-30-jul-2026.md
 * sectie 6.
 *
 * Blok 1 en 2 hergebruiken exact dezelfde bron (dezelfde outreach_contacts-
 * fetch als GET /api/admin/outreach zonder parameters) en exact dezelfde
 * functies (lib/outreach/werkvoorraad.ts, lib/outreach/weekbudget.ts) als de
 * outreach-werklijst zelf, zodat de getallen hier niet uit de pas kunnen
 * lopen met wat /admin/outreach laat zien.
 *
 * Verder alleen count-queries (head: true) of, waar dat niet kan (distinct-
 * tellingen), een kleine Postgres-functie (bezoekers_periode) of een fetch
 * die al voor een ander blok nodig was. Nergens een limit() die een telling
 * stil kan afkappen.
 */
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();

  try {
    const nu = new Date();
    const dezeWeekStart = maandagGrens(nu);
    const vorigeWeekStart = new Date(dezeWeekStart.getTime() - 7 * 86400000);
    const dertigDagenGeleden = new Date(nu.getTime() - 30 * 86400000).toISOString();

    // ── Bronnen die voor meerdere blokken worden hergebruikt ────────────────
    // Zelfde query als GET /api/admin/outreach zonder parameters: alle rijen,
    // geen limiet. Voedt blok 1 (werkvoorraad), blok 2 (weekbudget, eigen
    // count-query), blok 3 (replies), blok 4 (verstuurd/gereageerd per
    // doelgroep) en blok 6 (gereageerd-activiteit).
    const [contactenRes, mailsRes, weekbudget] = await Promise.all([
      supabase.from("outreach_contacts").select("*").order("created_at", { ascending: false }),
      supabase
        .from("outreach_mails")
        .select("id,contact_id,nummer,verstuurd_at,geopend_at")
        .order("verstuurd_at", { ascending: false }),
      berekenWeekbudget(supabase, nu),
    ]);
    if (contactenRes.error) throw contactenRes.error;
    if (mailsRes.error) throw mailsRes.error;

    const contacten = (contactenRes.data ?? []) as unknown as OutreachContact[];
    const mails = (mailsRes.data ?? []) as {
      id: string;
      contact_id: string;
      nummer: number;
      verstuurd_at: string;
      geopend_at: string | null;
    }[];

    const doelgroepPerContact = new Map(contacten.map((c) => [c.id, c.doelgroep]));

    // ── Blok 1: Te doen ──────────────────────────────────────────────────
    const werkvoorraad = berekenWerkvoorraad(contacten);

    const [
      aanvragenZonderRapportRes,
      prospectsReviewRes,
      contactenActieRes,
    ] = await Promise.all([
      supabase
        .from("intake_aanvragen")
        .select("created_at", { count: "exact" })
        .eq("pakket", "geldscan")
        .neq("status", "gestart")
        .order("created_at", { ascending: true })
        .limit(1),
      supabase.from("prospects").select("id", { count: "exact", head: true }).eq("status", "gevonden"),
      supabase
        .from("contacten")
        .select("id", { count: "exact", head: true })
        .is("archived_at", null)
        .lte("volgende_actie_op", nu.toISOString().slice(0, 10)),
    ]);
    if (aanvragenZonderRapportRes.error) throw aanvragenZonderRapportRes.error;
    if (prospectsReviewRes.error) throw prospectsReviewRes.error;
    if (contactenActieRes.error) throw contactenActieRes.error;

    const oudsteAanvraag = aanvragenZonderRapportRes.data?.[0]?.created_at as string | undefined;
    const oudsteDagen = oudsteAanvraag
      ? Math.floor((nu.getTime() - new Date(oudsteAanvraag).getTime()) / 86400000)
      : null;

    const teDoen = {
      gereageerd: werkvoorraad.stapels.gereageerd.length,
      followupRijp: werkvoorraad.stapels.followupRijp.length,
      mailsTeVersturen: Math.min(werkvoorraad.stapels.klaarOmTeVersturen.length, weekbudget.resterend),
      aanvragenZonderRapport: {
        aantal: aanvragenZonderRapportRes.count ?? 0,
        oudsteDagen,
      },
      prospectsTeReviewen: prospectsReviewRes.count ?? 0,
      contactenActieRijp: contactenActieRes.count ?? 0,
    };

    // ── Blok 3: deze week vs vorige week ─────────────────────────────────
    const weekTelling = async (start: Date, eind: Date) => {
      const startIso = start.toISOString();
      const eindIso = eind.toISOString();
      const mailsVerstuurd = mails.filter((m) => m.verstuurd_at >= startIso && m.verstuurd_at < eindIso).length;
      const geopend = mails.filter((m) => m.geopend_at && m.geopend_at >= startIso && m.geopend_at < eindIso).length;
      const replies = contacten.filter(
        (c) => c.gereageerd_at && c.gereageerd_at >= startIso && c.gereageerd_at < eindIso
      ).length;

      const [analysesRes, aanmeldingenRes, geleverdRes] = await Promise.all([
        supabase
          .from("quiz_resultaten")
          .select("id", { count: "exact", head: true })
          .gte("created_at", startIso)
          .lt("created_at", eindIso),
        supabase
          .from("intake_aanvragen")
          .select("id", { count: "exact", head: true })
          .eq("pakket", "geldscan")
          .gte("created_at", startIso)
          .lt("created_at", eindIso),
        supabase
          .from("intake_aanvragen")
          .select("id", { count: "exact", head: true })
          .eq("pakket", "geldscan")
          .not("rapport_verzonden_at", "is", null)
          .gte("rapport_verzonden_at", startIso)
          .lt("rapport_verzonden_at", eindIso),
      ]);
      if (analysesRes.error) throw analysesRes.error;
      if (aanmeldingenRes.error) throw aanmeldingenRes.error;
      if (geleverdRes.error) throw geleverdRes.error;

      return {
        mailsVerstuurd,
        geopend,
        replies,
        analysesVoltooid: analysesRes.count ?? 0,
        scanAanmeldingen: aanmeldingenRes.count ?? 0,
        scansGeleverd: geleverdRes.count ?? 0,
      };
    };

    const [dezeWeek, vorigeWeek] = await Promise.all([
      weekTelling(dezeWeekStart, nu),
      weekTelling(vorigeWeekStart, dezeWeekStart),
    ]);

    // ── Blok 4: replies per doelgroep ────────────────────────────────────
    const repliesPerDoelgroep = DOELGROEPEN.map(({ value }) => {
      const vanDoelgroep = contacten.filter((c) => c.doelgroep === value);
      const verstuurd = vanDoelgroep.filter((c) => c.verstuurd_at).length;
      const gereageerd = vanDoelgroep.filter((c) => c.status === "gereageerd").length;
      const geopendContactIds = new Set(
        mails
          .filter((m) => m.geopend_at && doelgroepPerContact.get(m.contact_id) === value)
          .map((m) => m.contact_id)
      );
      return {
        doelgroep: value,
        label: DOELGROEP_LABEL[value] ?? value,
        verstuurd,
        geopend: geopendContactIds.size,
        gereageerd,
        percentage: verstuurd >= 10 ? Math.round((gereageerd / verstuurd) * 100) : null,
      };
    });

    // ── Blok 5: trechter, klein, 30 dagen ────────────────────────────────
    const [
      bezoekersRpc,
      gestartRes,
      voltooidRes,
      leadsRes,
      aanmeldingen30Res,
      betaald30Res,
    ] = await Promise.all([
      supabase.rpc("bezoekers_periode", { sinds: dertigDagenGeleden }),
      supabase
        .from("quiz_voortgang")
        .select("id", { count: "exact", head: true })
        .gte("created_at", dertigDagenGeleden),
      supabase
        .from("quiz_voortgang")
        .select("id", { count: "exact", head: true })
        .eq("voltooid", true)
        .gte("created_at", dertigDagenGeleden),
      supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", dertigDagenGeleden),
      supabase
        .from("intake_aanvragen")
        .select("id", { count: "exact", head: true })
        .gte("created_at", dertigDagenGeleden),
      supabase
        .from("intake_aanvragen")
        .select("id", { count: "exact", head: true })
        .in("status", ["betaald", "gestart"])
        .gte("created_at", dertigDagenGeleden),
    ]);
    if (bezoekersRpc.error) throw bezoekersRpc.error;
    if (gestartRes.error) throw gestartRes.error;
    if (voltooidRes.error) throw voltooidRes.error;
    if (leadsRes.error) throw leadsRes.error;
    if (aanmeldingen30Res.error) throw aanmeldingen30Res.error;
    if (betaald30Res.error) throw betaald30Res.error;

    const trechter = {
      bezoekers: (bezoekersRpc.data as number | null) ?? 0,
      gestart: gestartRes.count ?? 0,
      voltooid: voltooidRes.count ?? 0,
      leads: leadsRes.count ?? 0,
      aanmeldingen: aanmeldingen30Res.count ?? 0,
      betaald: betaald30Res.count ?? 0,
    };

    // ── Blok 6: laatste activiteit ───────────────────────────────────────
    const [leadsActiviteitRes, analysesActiviteitRes, aanvragenActiviteitRes, notitiesActiviteitRes] =
      await Promise.all([
        supabase.from("leads").select("id,naam,email,created_at").order("created_at", { ascending: false }).limit(15),
        supabase.from("quiz_resultaten").select("id,email,created_at").order("created_at", { ascending: false }).limit(15),
        supabase
          .from("intake_aanvragen")
          .select("id,naam,pakket,created_at")
          .order("created_at", { ascending: false })
          .limit(15),
        supabase
          .from("contact_notities")
          .select("id,tekst,soort,created_at")
          .order("created_at", { ascending: false })
          .limit(15),
      ]);
    if (leadsActiviteitRes.error) throw leadsActiviteitRes.error;
    if (analysesActiviteitRes.error) throw analysesActiviteitRes.error;
    if (aanvragenActiviteitRes.error) throw aanvragenActiviteitRes.error;
    if (notitiesActiviteitRes.error) throw notitiesActiviteitRes.error;

    type ActiviteitItem = { type: string; tekst: string; tijd: string };
    const activiteit: ActiviteitItem[] = [];

    for (const m of mails) {
      if (m.verstuurd_at) {
        const naam = contacten.find((c) => c.id === m.contact_id)?.naam ?? "onbekend";
        activiteit.push({ type: "mail_verstuurd", tekst: `Mail ${m.nummer} verstuurd naar ${naam}`, tijd: m.verstuurd_at });
      }
      if (m.geopend_at) {
        const naam = contacten.find((c) => c.id === m.contact_id)?.naam ?? "onbekend";
        activiteit.push({ type: "mail_geopend", tekst: `Mail geopend door ${naam}`, tijd: m.geopend_at });
      }
    }
    for (const c of contacten) {
      if (c.gereageerd_at) {
        activiteit.push({ type: "gereageerd", tekst: `${c.naam} gemarkeerd als gereageerd`, tijd: c.gereageerd_at });
      }
    }
    for (const l of (leadsActiviteitRes.data ?? []) as { naam: string | null; email: string; created_at: string }[]) {
      activiteit.push({ type: "lead", tekst: `Lead aangemeld: ${l.naam ?? l.email}`, tijd: l.created_at });
    }
    for (const a of (analysesActiviteitRes.data ?? []) as { email: string; created_at: string }[]) {
      activiteit.push({ type: "analyse", tekst: `Analyse voltooid: ${a.email}`, tijd: a.created_at });
    }
    for (const a of (aanvragenActiviteitRes.data ?? []) as { naam: string | null; pakket: string; created_at: string }[]) {
      activiteit.push({ type: "aanvraag", tekst: `Aanvraag binnen: ${a.naam ?? "onbekend"} (${a.pakket})`, tijd: a.created_at });
    }
    for (const n of (notitiesActiviteitRes.data ?? []) as { tekst: string; soort: string; created_at: string }[]) {
      activiteit.push({ type: "notitie", tekst: `Notitie toegevoegd (${n.soort})`, tijd: n.created_at });
    }

    activiteit.sort((a, b) => (a.tijd < b.tijd ? 1 : -1));

    return NextResponse.json({
      teDoen,
      weekbudget,
      week: { dezeWeek, vorigeWeek },
      repliesPerDoelgroep,
      trechter,
      activiteit: activiteit.slice(0, 10),
    });
  } catch (e) {
    console.error("admin/vandaag: aggregatie mislukt", e);
    const message = e instanceof Error ? e.message : "Kon het dashboard niet laden.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
