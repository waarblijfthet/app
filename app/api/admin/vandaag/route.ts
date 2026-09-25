import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase-service";
import { isAdminRequest } from "@/lib/admin-auth";
import { berekenWerkvoorraad } from "@/lib/outreach/werkvoorraad";
import { berekenDagbudget, maandagGrens } from "@/lib/outreach/dagbudget";
import { DOELGROEPEN, DOELGROEP_LABEL } from "@/lib/outreach/labels";
import { OutreachContact } from "@/lib/outreach/types";
import { haalAlleRijen, vandaagStartNl } from "@/lib/admin-periode";
import { BEANTWOORD_PREFIX, VRAAG_ACTIE, VRAAG_PREFIX, vraagstapStatus } from "@/lib/vraagstap";
import { KEUZE_START, meetKeuzes, type KeuzeRij } from "@/lib/keuze-meting";

/**
 * GET /api/admin/vandaag, alle zes blokken van het Vandaag-dashboard in één
 * keer, server-side geaggregeerd. Zie docs/admin-redesign-30-jul-2026.md
 * sectie 6.
 *
 * Blok 1 en 2 hergebruiken exact dezelfde bron (dezelfde outreach_contacts-
 * fetch als GET /api/admin/outreach zonder parameters) en exact dezelfde
 * functies (lib/outreach/werkvoorraad.ts, lib/outreach/dagbudget.ts) als de
 * outreach-werklijst zelf, zodat de getallen hier niet uit de pas kunnen
 * lopen met wat /admin/outreach laat zien.
 *
 * Verder alleen count-queries (head: true) of, waar dat niet kan (distinct-
 * tellingen), een kleine Postgres-functie (bezoekers_periode) of een fetch
 * die al voor een ander blok nodig was. Nergens een limit() die een telling
 * stil kan afkappen.
 *
 * Herzien op 23-sep-2026, want het dashboard laadde traag:
 * - Alle queries starten nu tegelijk. Eerst liepen er vier golven achter
 *   elkaar, elk wachtend op de vorige.
 * - outreach_mails werd in zijn geheel opgehaald om daarna in JavaScript te
 *   tellen. Nu tellen count-queries, en worden alleen de geopende mails (voor
 *   blok 4) en de laatste tien (voor blok 6) als rijen opgehaald.
 * - "Geen limiet" klopte niet: Supabase geeft per verzoek hooguit 1000 rijen.
 *   Contacten en geopende mails komen nu via haalAlleRijen, die doorbladert.
 * - Blok 6 zocht per mail de contactnaam met find() door alle contacten; dat
 *   is nu een Map.
 */
export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();

  try {
    const nu = new Date();

    // Begin van vandaag in Nederlandse tijd. De server draait op UTC, dus zonder
    // dit staat "vandaag" 's ochtends vroeg en 's avonds laat op de verkeerde dag.
    const vandaagStart = vandaagStartNl(nu);

    // Bewust rollend en niet per kalenderweek of kalendermaand: anders ziet
    // maandagochtend er altijd slecht uit en de eerste van de maand ook, en dan
    // meet je de kalender in plaats van je verkeer.
    const zevenDagen = new Date(nu.getTime() - 7 * 86400000).toISOString();

    const dezeWeekStart = maandagGrens(nu);
    const vorigeWeekStart = new Date(dezeWeekStart.getTime() - 7 * 86400000);
    const dertigDagenGeleden = new Date(nu.getTime() - 30 * 86400000).toISOString();

    // ── Alle queries tegelijk ─────────────────────────────────────────────
    type MailRij = {
      contact_id: string;
      nummer: number;
      verstuurd_at: string;
      geopend_at: string | null;
    };
    const tel = (q: PromiseLike<{ count: number | null; error: unknown }>) =>
      Promise.resolve(q).then((r) => {
        if (r.error) throw r.error;
        return r.count ?? 0;
      });
    const telMails = (kolom: "verstuurd_at" | "geopend_at", start: Date, eind: Date) =>
      tel(
        supabase
          .from("outreach_mails")
          .select("id", { count: "exact", head: true })
          .gte(kolom, start.toISOString())
          .lt(kolom, eind.toISOString())
      );
    const telTabel = (
      tabel: string,
      datumKolom: string,
      start: string,
      eind: string | null,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      extra?: (q: any) => any
    ) => {
      let q = supabase
        .from(tabel)
        .select("id", { count: "exact", head: true })
        .gte(datumKolom, start);
      if (eind) q = q.lt(datumKolom, eind);
      if (extra) q = extra(q);
      return tel(q);
    };
    const nuIso = nu.toISOString();

    const [
      contacten,
      geopendeMails,
      laatsteVerstuurdRes,
      laatsteGeopendRes,
      dagbudget,
      aanvragenZonderRapportRes,
      prospectsTeReviewen,
      contactenActieRijp,
      weekCijfers,
      trechterCijfers,
      bezoekCijfers,
      activiteitBronnen,
      openVragenRes,
      vraagStatus,
      beantwoord7dRes,
    ] = await Promise.all([
      haalAlleRijen<OutreachContact>(supabase, "outreach_contacts", "*", (q) => q),
      haalAlleRijen<{ contact_id: string }>(
        supabase,
        "outreach_mails",
        "contact_id",
        (q) => q.not("geopend_at", "is", null),
        "verstuurd_at"
      ),
      supabase
        .from("outreach_mails")
        .select("contact_id,nummer,verstuurd_at,geopend_at")
        .not("verstuurd_at", "is", null)
        .order("verstuurd_at", { ascending: false })
        .limit(10),
      supabase
        .from("outreach_mails")
        .select("contact_id,nummer,verstuurd_at,geopend_at")
        .not("geopend_at", "is", null)
        .order("geopend_at", { ascending: false })
        .limit(10),
      berekenDagbudget(supabase, nu),
      supabase
        .from("intake_aanvragen")
        .select("created_at", { count: "exact" })
        .eq("pakket", "geldscan")
        .neq("status", "gestart")
        .order("created_at", { ascending: true })
        .limit(1),
      tel(supabase.from("prospects").select("id", { count: "exact", head: true }).eq("status", "gevonden")),
      tel(
        supabase
          .from("contacten")
          .select("id", { count: "exact", head: true })
          .is("archived_at", null)
          .lte("volgende_actie_op", nuIso.slice(0, 10))
      ),
      // Blok 3, per week: [mails verstuurd, geopend, afgerond, gemaild, aanmeldingen, geleverd]
      Promise.all(
        [
          [dezeWeekStart, nu],
          [vorigeWeekStart, dezeWeekStart],
        ].map(([start, eind]) =>
          Promise.all([
            telMails("verstuurd_at", start, eind),
            telMails("geopend_at", start, eind),
            telTabel("quiz_voortgang", "created_at", start.toISOString(), eind.toISOString(), (q) =>
              q.eq("voltooid", true)
            ),
            telTabel("quiz_resultaten", "created_at", start.toISOString(), eind.toISOString()),
            telTabel("intake_aanvragen", "created_at", start.toISOString(), eind.toISOString(), (q) =>
              q.eq("pakket", "geldscan")
            ),
            telTabel("intake_aanvragen", "rapport_verzonden_at", start.toISOString(), eind.toISOString(), (q) =>
              q.eq("pakket", "geldscan")
            ),
          ])
        )
      ),
      // Blok 5: trechter 30 dagen
      Promise.all([
        supabase.rpc("bezoekers_periode", { sinds: dertigDagenGeleden }),
        telTabel("quiz_voortgang", "created_at", dertigDagenGeleden, null),
        telTabel("quiz_voortgang", "created_at", dertigDagenGeleden, null, (q) => q.eq("voltooid", true)),
        telTabel("leads", "created_at", dertigDagenGeleden, null),
        telTabel("intake_aanvragen", "created_at", dertigDagenGeleden, null),
        telTabel("intake_aanvragen", "created_at", dertigDagenGeleden, null, (q) =>
          q.in("status", ["betaald", "gestart"])
        ),
      ]),
      // Blok 0: bezoekcijfers
      Promise.all([
        supabase.rpc("views_periode", { sinds: vandaagStart }),
        supabase.rpc("views_periode", { sinds: zevenDagen }),
        supabase.rpc("views_periode", { sinds: dertigDagenGeleden }),
        supabase.rpc("bezoekers_periode", { sinds: vandaagStart }),
        supabase.rpc("bezoekers_periode", { sinds: zevenDagen }),
        supabase.rpc("bezoekers_periode", { sinds: dertigDagenGeleden }),
        supabase.rpc("top_paginas", { sinds: dertigDagenGeleden, aantal: 12 }),
      ]),
      // Blok 6: laatste activiteit
      Promise.all([
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
      ]),
      // Vraagstap (23-sep-2026): open vragen, stand van de week, beantwoord.
      supabase
        .from("contacten")
        .select("id,email,analyse_token,volgende_actie_op,updated_at")
        .eq("volgende_actie", VRAAG_ACTIE)
        .is("archived_at", null)
        .order("volgende_actie_op", { ascending: true })
        .limit(50),
      vraagstapStatus(supabase),
      supabase
        .from("contact_notities")
        .select("id", { count: "exact", head: true })
        .like("tekst", `${BEANTWOORD_PREFIX}%`)
        .gte("created_at", zevenDagen),
    ]);
    if (laatsteVerstuurdRes.error) throw laatsteVerstuurdRes.error;
    if (openVragenRes.error) throw openVragenRes.error;
    if (beantwoord7dRes.error) throw beantwoord7dRes.error;

    // ── Vraagstap: de vraagtekst hoort bij het contact als notitie ──────────
    const openContacten = (openVragenRes.data ?? []) as {
      id: string;
      email: string;
      analyse_token: string | null;
      volgende_actie_op: string | null;
      updated_at: string;
    }[];
    let vraagPerContact = new Map<string, { tekst: string; tijd: string }>();
    if (openContacten.length) {
      const { data: vraagNotities, error: vnErr } = await supabase
        .from("contact_notities")
        .select("contact_id,tekst,created_at")
        .in(
          "contact_id",
          openContacten.map((c) => c.id)
        )
        .like("tekst", `${VRAAG_PREFIX}%`)
        .order("created_at", { ascending: false });
      if (vnErr) throw vnErr;
      vraagPerContact = new Map();
      for (const n of (vraagNotities ?? []) as { contact_id: string; tekst: string; created_at: string }[]) {
        if (vraagPerContact.has(n.contact_id)) continue;
        const [eerste, ...rest] = n.tekst.slice(VRAAG_PREFIX.length).trim().split("\n\nToelichting: ");
        const toelichting = rest.join(" ").split("\n\nUitkomst:")[0];
        vraagPerContact.set(n.contact_id, {
          tekst: eerste.split("\n\n")[0] + (toelichting ? ` (toelichting: ${toelichting.trim()})` : ""),
          tijd: n.created_at,
        });
      }
    }
    const vandaagDatum = vandaagStart.slice(0, 10);
    const vragen = {
      status: vraagStatus,
      beantwoordAfgelopenWeek: beantwoord7dRes.count ?? 0,
      open: openContacten.map((c) => ({
        contactId: c.id,
        email: c.email,
        token: c.analyse_token,
        uiterlijk: c.volgende_actie_op,
        vraag: vraagPerContact.get(c.id)?.tekst ?? "(vraag niet gevonden)",
        gesteld: vraagPerContact.get(c.id)?.tijd ?? c.updated_at,
        telaat: Boolean(c.volgende_actie_op && c.volgende_actie_op < vandaagDatum),
      })),
    };
    if (laatsteGeopendRes.error) throw laatsteGeopendRes.error;
    if (aanvragenZonderRapportRes.error) throw aanvragenZonderRapportRes.error;

    const doelgroepPerContact = new Map(contacten.map((c) => [c.id, c.doelgroep]));
    const naamPerContact = new Map(contacten.map((c) => [c.id, c.naam]));

    // ── Blok 1: Te doen ──────────────────────────────────────────────────
    const werkvoorraad = berekenWerkvoorraad(contacten);

    const oudsteAanvraag = aanvragenZonderRapportRes.data?.[0]?.created_at as string | undefined;
    const oudsteDagen = oudsteAanvraag
      ? Math.floor((nu.getTime() - new Date(oudsteAanvraag).getTime()) / 86400000)
      : null;

    const teDoen = {
      gereageerd: werkvoorraad.stapels.gereageerd.length,
      followupRijp: werkvoorraad.stapels.followupRijp.length,
      mailsTeVersturen: Math.min(werkvoorraad.stapels.klaarOmTeVersturen.length, dagbudget.resterend),
      aanvragenZonderRapport: {
        aantal: aanvragenZonderRapportRes.count ?? 0,
        oudsteDagen: oudsteDagen,
      },
      prospectsTeReviewen: prospectsTeReviewen,
      contactenActieRijp: contactenActieRijp,
      vragenOpen: openContacten.length,
    };

    // ── Blok 3: deze week vs vorige week ─────────────────────────────────
    // "Analyses afgerond" is sinds 23-sep-2026 wie het resultaatscherm zag
    // (quiz_voortgang). Hiervoor stond hier "Analyses voltooid" met de telling
    // van quiz_resultaten, en daar komt alleen een rij in als iemand een
    // e-mailadres achterlaat. Afronden zonder e-mail was zo onzichtbaar.
    const weekTelling = (index: number, start: Date, eind: Date) => {
      const [mailsVerstuurd, geopend, analysesAfgerond, resultaatGemaild, scanAanmeldingen, scansGeleverd] =
        weekCijfers[index];
      const startIso = start.toISOString();
      const eindIso = eind.toISOString();
      const replies = contacten.filter(
        (c) => c.gereageerd_at && c.gereageerd_at >= startIso && c.gereageerd_at < eindIso
      ).length;
      return {
        mailsVerstuurd: mailsVerstuurd,
        geopend: geopend,
        replies: replies,
        analysesAfgerond: analysesAfgerond,
        resultaatGemaild: resultaatGemaild,
        scanAanmeldingen: scanAanmeldingen,
        scansGeleverd: scansGeleverd,
      };
    };
    const dezeWeek = weekTelling(0, dezeWeekStart, nu);
    const vorigeWeek = weekTelling(1, vorigeWeekStart, dezeWeekStart);

    // ── Blok 4: replies per doelgroep ────────────────────────────────────
    const repliesPerDoelgroep = DOELGROEPEN.map(({ value }) => {
      const vanDoelgroep = contacten.filter((c) => c.doelgroep === value);
      const verstuurd = vanDoelgroep.filter((c) => c.verstuurd_at).length;
      const gereageerd = vanDoelgroep.filter((c) => c.status === "gereageerd").length;
      const geopendContactIds = new Set(
        geopendeMails
          .filter((m) => doelgroepPerContact.get(m.contact_id) === value)
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
    const [bezoekersRpc, gestart30, voltooid30, leads30, aanmeldingen30, betaald30] = trechterCijfers;
    if (bezoekersRpc.error) throw bezoekersRpc.error;
    const trechter = {
      bezoekers: (bezoekersRpc.data as number | null) ?? 0,
      gestart: gestart30,
      voltooid: voltooid30,
      leads: leads30,
      aanmeldingen: aanmeldingen30,
      betaald: betaald30,
    };

    // ── Blok 0: bezoekcijfers en best bezochte pagina's ──────────────────
    // Bovenaan het dashboard, want dit is het cijfer dat Jarno dagelijks wil
    // zien. views = paginaloads, sessies = unieke sessie_id's.
    const [
      viewsVandaagRes,
      viewsWeekRes,
      viewsMaandRes,
      sessiesVandaagRes,
      sessiesWeekRes,
      sessiesMaandRes,
      topPaginasRes,
    ] = bezoekCijfers;

    // Ontbreekt een van deze functies in de database, dan mag het dashboard niet
    // omvallen: dan staat er nul en een melding, precies zoals bij een
    // niet-gedraaide migratie hoort (technische les 6).
    const bezoek = {
      migratieOntbreekt: Boolean(viewsVandaagRes.error || topPaginasRes.error),
      vandaag: {
        views: (viewsVandaagRes.data as number | null) ?? 0,
        sessies: (sessiesVandaagRes.data as number | null) ?? 0,
      },
      week: {
        views: (viewsWeekRes.data as number | null) ?? 0,
        sessies: (sessiesWeekRes.data as number | null) ?? 0,
      },
      maand: {
        views: (viewsMaandRes.data as number | null) ?? 0,
        sessies: (sessiesMaandRes.data as number | null) ?? 0,
      },
      topPaginas: ((topPaginasRes.data as { pagina: string; views: number; sessies: number }[] | null) ?? []).map(
        (r) => ({ pagina: r.pagina, views: Number(r.views), sessies: Number(r.sessies) })
      ),
    };

    // ── Geldscan-aanvragen met keuze (25-sep-2026, lib/keuze-meting.ts) ──
    // Los van de grote Promise.all hierboven, zodat een fout hier alleen dit
    // blok kost en niet het hele dashboard.
    let keuzes: ReturnType<typeof meetKeuzes> | null = null;
    try {
      const keuzeRijen = await haalAlleRijen<KeuzeRij>(
        supabase,
        "intake_aanvragen",
        "created_at,status,grootste_knelpunt",
        (q) => q.eq("pakket", "geldscan").gte("created_at", KEUZE_START)
      );
      keuzes = meetKeuzes(keuzeRijen, nu);
    } catch (fout) {
      console.error("admin/vandaag: keuzemeting mislukt", fout);
    }

    // ── Blok 6: laatste activiteit ───────────────────────────────────────
    const [leadsActiviteitRes, analysesActiviteitRes, aanvragenActiviteitRes, notitiesActiviteitRes] =
      activiteitBronnen;
    if (leadsActiviteitRes.error) throw leadsActiviteitRes.error;
    if (analysesActiviteitRes.error) throw analysesActiviteitRes.error;
    if (aanvragenActiviteitRes.error) throw aanvragenActiviteitRes.error;
    if (notitiesActiviteitRes.error) throw notitiesActiviteitRes.error;

    type ActiviteitItem = { type: string; tekst: string; tijd: string };
    const activiteit: ActiviteitItem[] = [];

    for (const m of (laatsteVerstuurdRes.data ?? []) as MailRij[]) {
      const naam = naamPerContact.get(m.contact_id) ?? "onbekend";
      activiteit.push({ type: "mail_verstuurd", tekst: `Mail ${m.nummer} verstuurd naar ${naam}`, tijd: m.verstuurd_at });
    }
    for (const m of (laatsteGeopendRes.data ?? []) as MailRij[]) {
      if (!m.geopend_at) continue;
      const naam = naamPerContact.get(m.contact_id) ?? "onbekend";
      activiteit.push({ type: "mail_geopend", tekst: `Mail geopend door ${naam}`, tijd: m.geopend_at });
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
      activiteit.push({ type: "analyse", tekst: `Resultaat gemaild naar ${a.email}`, tijd: a.created_at });
    }
    for (const a of (aanvragenActiviteitRes.data ?? []) as { naam: string | null; pakket: string; created_at: string }[]) {
      activiteit.push({ type: "aanvraag", tekst: `Aanvraag binnen: ${a.naam ?? "onbekend"} (${a.pakket})`, tijd: a.created_at });
    }
    for (const n of (notitiesActiviteitRes.data ?? []) as { tekst: string; soort: string; created_at: string }[]) {
      activiteit.push({ type: "notitie", tekst: `Notitie toegevoegd (${n.soort})`, tijd: n.created_at });
    }

    activiteit.sort((a, b) => (a.tijd < b.tijd ? 1 : -1));

    return NextResponse.json({
      bezoek: bezoek,
      teDoen: teDoen,
      dagbudget: dagbudget,
      week: { dezeWeek: dezeWeek, vorigeWeek: vorigeWeek },
      repliesPerDoelgroep: repliesPerDoelgroep,
      trechter: trechter,
      vragen: vragen,
      keuzes: keuzes,
      activiteit: activiteit.slice(0, 10),
    });
  } catch (e) {
    console.error("admin/vandaag: aggregatie mislukt", e);
    const message = e instanceof Error ? e.message : "Kon het dashboard niet laden.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
