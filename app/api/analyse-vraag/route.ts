import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createServiceClient } from "@/lib/supabase-service";
import { slaAnalyseOp } from "@/lib/analyse-opslaan";
import {
  ANTWOORD_WERKDAGEN,
  VRAAG_ACTIE,
  VRAAG_PREFIX,
  escapeHtml,
  formatDagNl,
  vraagstapStatus,
  werkdagenVerder,
} from "@/lib/vraagstap";

/**
 * POST /api/analyse-vraag: de bezoeker stelt na zijn resultaat één vraag
 * (23-sep-2026, docs/vraagstap-ontwerp-23-sep-2026.md).
 *
 * Wat er gebeurt, in deze volgorde:
 * 1. Controle: honeypot, e-mailadres, lengte, en of de stap aan staat
 *    (VRAAGSTAP_UIT of 15 vragen in 7 dagen).
 * 2. Opslaan als lead plus quiz_resultaten met token (lib/analyse-opslaan.ts),
 *    zodat /resultaat/[token] de uitkomst toont.
 * 3. Contact aanmaken of bijwerken met volgende actie "Vraag beantwoorden" over
 *    2 werkdagen, en de vraag als notitie. Dan staat hij op Vandaag.
 * 4. Mail naar Jarno met antwoord-aan de bezoeker, en een bevestiging naar de
 *    bezoeker met de link naar zijn uitkomst.
 * 5. Meetgebeurtenis analyse_vraag_verstuurd op de sessie-id.
 *
 * Mislukt de mail aan Jarno, dan staat de vraag nog steeds als contact met
 * actie op Vandaag. Dat is de vangrail; de fout wordt gelogd en als notitie bij
 * het contact gezet, zodat hij niet stil verdwijnt.
 */

type Verschil = { label: string; jij: number; bench: number };

const UITKOMST_LABEL: Record<string, string> = {
  meer: "meer over dan verwacht",
  passend: "past bij het huishouden",
  minder: "minder over dan verwacht",
};

const AUTO_LABEL: Record<string, string> = {
  geen: "geen auto",
  eigen: "eigen auto",
  "lease_privé": "private lease",
  zakelijk: "zakelijke auto",
};

function eur(n: unknown): string {
  const getal = Number(n);
  if (!Number.isFinite(getal)) return "onbekend";
  return `€${Math.round(getal).toLocaleString("nl-NL")}`;
}

function tekst(waarde: unknown, max: number): string {
  return typeof waarde === "string" ? waarde.trim().slice(0, max) : "";
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, fout: "Ongeldig verzoek" }, { status: 400 });
  }

  // Honeypot: een verborgen veld dat een mens nooit invult. Doe alsof het lukte.
  if (tekst(body.website, 200)) {
    return NextResponse.json({ ok: true, uiterlijk: formatDagNl(werkdagenVerder(ANTWOORD_WERKDAGEN)) });
  }

  const email = tekst(body.email, 200).toLowerCase();
  const vraag = tekst(body.vraag, 300);
  const toelichting = tekst(body.toelichting, 1000);
  const keuze = tekst(body.keuze, 40) || "onbekend";
  const uitkomst = tekst(body.uitkomst, 20);
  const sessieId = tekst(body.sessie_id, 64);
  const apparaat = tekst(body.apparaat, 20) || null;
  const eigenaar = body.eigenaar === true;
  const resultaat =
    body.resultaat && typeof body.resultaat === "object" ? (body.resultaat as Record<string, unknown>) : null;
  const verschillen: Verschil[] = Array.isArray(body.verschillen)
    ? (body.verschillen as unknown[]).slice(0, 5).flatMap((v) => {
        const r = v as Record<string, unknown>;
        return typeof r?.label === "string"
          ? [{ label: r.label.slice(0, 40), jij: Number(r.jij) || 0, bench: Number(r.bench) || 0 }]
          : [];
      })
    : [];

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, fout: "Vul een geldig e-mailadres in." }, { status: 400 });
  }
  if (vraag.length < 5) {
    return NextResponse.json({ ok: false, fout: "Je vraag is nog leeg." }, { status: 400 });
  }
  if (!resultaat) {
    return NextResponse.json({ ok: false, fout: "Uitkomst ontbreekt." }, { status: 400 });
  }

  const supabase = createServiceClient();

  try {
    const status = await vraagstapStatus(supabase);
    if (!status.aan) {
      return NextResponse.json({ ok: false, vol: true });
    }

    // 2. Lead en uitkomst
    const opgeslagen = await slaAnalyseOp(supabase, {
      email: email,
      naam: null,
      resultaat: resultaat,
      bron: "analyse-vraag",
    });
    if (!opgeslagen.ok) {
      return NextResponse.json({ ok: false, fout: "Opslaan mislukt. Probeer het opnieuw." }, { status: 500 });
    }

    // 3. Contact met volgende actie
    const deadline = werkdagenVerder(ANTWOORD_WERKDAGEN);
    const deadlineDatum = deadline.toISOString().slice(0, 10);
    const uiterlijk = formatDagNl(deadline);

    const { data: bestaand, error: zoekErr } = await supabase
      .from("contacten")
      .select("id, soort, lead_id")
      .eq("email", email)
      .maybeSingle();
    if (zoekErr) throw zoekErr;

    let contactId: string;
    if (bestaand) {
      const { error } = await supabase
        .from("contacten")
        .update({
          volgende_actie: VRAAG_ACTIE,
          volgende_actie_op: deadlineDatum,
          analyse_token: opgeslagen.token,
          lead_id: bestaand.lead_id ?? opgeslagen.leadId,
          archived_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", bestaand.id);
      if (error) throw error;
      contactId = bestaand.id as string;
    } else {
      const { data: nieuw, error } = await supabase
        .from("contacten")
        .insert({
          naam: email.split("@")[0],
          email: email,
          soort: "lead",
          fase: "analyse gedaan",
          bron: "analyse",
          lead_id: opgeslagen.leadId,
          analyse_token: opgeslagen.token,
          volgende_actie: VRAAG_ACTIE,
          volgende_actie_op: deadlineDatum,
        })
        .select("id")
        .single();
      if (error || !nieuw) throw error ?? new Error("contact niet aangemaakt");
      contactId = nieuw.id as string;
    }

    const notitie =
      `${VRAAG_PREFIX} ${vraag}` +
      (toelichting ? `\n\nToelichting: ${toelichting}` : "") +
      `\n\nUitkomst: ${UITKOMST_LABEL[uitkomst] ?? "onbekend"}. Antwoord uiterlijk ${uiterlijk}.` +
      (eigenaar ? "\n\n(Eigen test: eigenaarscookie stond aan.)" : "");
    const { error: notitieErr } = await supabase
      .from("contact_notities")
      .insert({ contact_id: contactId, tekst: notitie, soort: "notitie" });
    if (notitieErr) throw notitieErr;

    // 4. Mails
    const resultaatUrl = `https://www.waarblijfthet.nl/resultaat/${opgeslagen.token}`;
    const contactUrl = `https://www.waarblijfthet.nl/admin/contacten?open=${contactId}`;
    const huishouden = [
      Number(resultaat.aantal_volwassenen) === 2 ? "2 volwassenen" : "1 volwassene",
      Number(resultaat.aantal_kinderen) > 0
        ? `${resultaat.aantal_kinderen}${Number(resultaat.aantal_kinderen) === 3 ? " of meer" : ""} kind(eren)`
        : "geen kinderen",
      resultaat.woonsituatie === "koop" ? "koop" : resultaat.woonsituatie === "huur" ? "huur" : "woonsituatie onbekend",
      AUTO_LABEL[String(resultaat.auto_situatie)] ?? "vervoer onbekend",
    ].join(", ");
    const verschilRegels = verschillen.length
      ? verschillen
          .map((v) => {
            const d = v.jij - v.bench;
            const richting = Math.abs(d) < 25 ? "ongeveer gelijk" : d > 0 ? `${eur(d)} hoger` : `${eur(-d)} lager`;
            return `${escapeHtml(v.label.toLowerCase())} ${eur(v.jij)} (verwacht ${eur(v.bench)}, ${richting})`;
          })
          .join("<br>")
      : "geen";

    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
    const van = process.env.RESEND_FROM ?? "onboarding@resend.dev";
    const aanJarno = process.env.VRAAG_NOTIFICATIE_AAN ?? "hallo@waarblijfthet.nl";
    const mailFouten: string[] = [];

    if (!resend) {
      mailFouten.push("RESEND_API_KEY ontbreekt");
    } else {
      const { error: fout1 } = await resend.emails.send({
        from: van,
        to: aanJarno,
        replyTo: email,
        subject: `Vraag over analyse: "${vraag.slice(0, 70)}"`,
        html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#16211F;line-height:1.5;max-width:600px">
<p style="color:#8B958F;font-size:13px;margin:0 0 12px">Beantwoorden gaat direct naar ${escapeHtml(email)}. Uiterlijk <strong>${escapeHtml(uiterlijk)}</strong>.${eigenaar ? " <strong>Eigen test.</strong>" : ""}</p>
<p style="margin:0 0 4px"><strong>Vraag:</strong> ${escapeHtml(vraag)}</p>
${toelichting ? `<p style="margin:0 0 16px;color:#4A5A56">"${escapeHtml(toelichting)}"</p>` : `<p style="margin:0 0 16px"></p>`}
<div style="background:#F0F3F1;border-radius:12px;padding:16px;margin:0 0 16px">
<p style="margin:0 0 4px"><strong>Huishouden:</strong> ${escapeHtml(huishouden)}</p>
<p style="margin:0 0 4px"><strong>Netto inkomen:</strong> ${eur(resultaat.totaal_inkomen_berekend)} per maand</p>
<p style="margin:0 0 4px"><strong>Ruimte volgens analyse:</strong> ${eur(resultaat.maandelijks_over_berekend)} (verwacht ${eur(resultaat.benchmark_over_verwacht)})</p>
<p style="margin:0 0 4px"><strong>Grootste verschillen:</strong><br>${verschilRegels}</p>
<p style="margin:0"><strong>Uitkomst gezien:</strong> ${escapeHtml(UITKOMST_LABEL[uitkomst] ?? "onbekend")}</p>
</div>
<p style="margin:0 0 4px"><a href="${resultaatUrl}" style="color:#0B7A6E">Hele analyse bekijken</a></p>
<p style="margin:0 0 16px"><a href="${contactUrl}" style="color:#0B7A6E">Contact openen</a>, of vink hem af op Vandaag zodra je hebt geantwoord.</p>
<p style="color:#8B958F;font-size:12px;border-top:1px solid #E6E9E7;padding-top:12px">Opbouw: wat de analyse laat zien, wat hij niet kan zien, en dan één keer de Geldscan met prijs. Geen bespaartips, geen advies over hypotheek of beleggen.</p>
</div>`,
      });
      if (fout1) mailFouten.push(`mail aan Jarno: ${fout1.message}`);

      const { error: fout2 } = await resend.emails.send({
        from: van,
        to: email,
        replyTo: aanJarno,
        subject: "Je vraag is binnen | Waar blijft het",
        html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#16211F;line-height:1.6;max-width:560px">
<p>Hoi,</p>
<p>Ik heb je vraag ontvangen:</p>
<p style="background:#F0F3F1;border-radius:12px;padding:14px 16px">${escapeHtml(vraag)}</p>
<p>Ik lees hem met je uitkomst erbij en je hoort uiterlijk <strong>${escapeHtml(uiterlijk)}</strong> van me, op dit adres.</p>
<p>Je uitkomst kun je hier terugzien: <a href="${resultaatUrl}" style="color:#0B7A6E">bekijk je uitkomst</a>.</p>
<p>Jarno<br><span style="color:#8B958F">Waar blijft het</span></p>
<p style="color:#8B958F;font-size:12px;border-top:1px solid #E6E9E7;padding-top:12px">Je krijgt deze mail omdat je op waarblijfthet.nl een vraag stelde over je analyse. Geen nieuwsbrief.</p>
</div>`,
      });
      if (fout2) mailFouten.push(`bevestiging aan bezoeker: ${fout2.message}`);
    }

    if (mailFouten.length) {
      console.error("analyse-vraag: mail mislukt", mailFouten);
      await supabase.from("contact_notities").insert({
        contact_id: contactId,
        tekst: `Let op: mail bij deze vraag mislukt (${mailFouten.join("; ")}). Antwoord handmatig aan ${email}.`,
        soort: "systeem",
      });
    }

    // 5. Meting, niet voor eigen testrondes
    if (sessieId && !eigenaar) {
      await supabase.from("paginagebeurtenissen").insert({
        sessie_id: sessieId,
        gebeurtenis: "analyse_vraag_verstuurd",
        apparaat: apparaat,
        meta: { keuze: keuze, uitkomst: uitkomst },
      });
    }

    return NextResponse.json({ ok: true, uiterlijk: uiterlijk });
  } catch (e) {
    console.error("analyse-vraag: mislukt", e);
    return NextResponse.json(
      { ok: false, fout: "Er ging iets mis bij het versturen. Probeer het opnieuw of mail naar hallo@waarblijfthet.nl." },
      { status: 500 }
    );
  }
}
