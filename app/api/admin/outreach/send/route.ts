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

// ── Opbouw: alinea's als platte tekst, daaruit html + text genereren ─────────
// Bewust kaal: geen tabellen, kleuren of knoppen. Een mail die eruitziet als
// een persoonlijk bericht converteert beter bij dit publiek en scoort beter
// bij spamfilters. Mail 1 bevat geen enkele link behalve de handtekening.

interface Mail {
  subject: string;
  alineas: string[];
}

const HANDTEKENING = "Jarno Koopman\nFinancieel coach, Waar blijft het\nwaarblijfthet.nl";

function naarHtml(alineas: string[]): string {
  const blokken = alineas
    .map((a) => `<p style="margin:0 0 18px 0;">${a.replace(/\n/g, "<br>")}</p>`)
    .join("\n");
  const sig =
    '<p style="margin:24px 0 0 0;">Jarno Koopman<br>Financieel coach, Waar blijft het<br>' +
    '<a href="https://www.waarblijfthet.nl" style="color:#16211F;">waarblijfthet.nl</a></p>';
  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#16211F;max-width:560px;">' +
    blokken +
    sig +
    "</div>"
  );
}

function naarText(alineas: string[]): string {
  return alineas.join("\n\n") + "\n\n" + HANDTEKENING;
}

// ── Mail 1 per doelgroep: herkenning eerst, dan wie ik ben, dan zachte vraag ─

function eersteMail(naam: string, doelgroep: Doelgroep, psZin?: string | null): Mail {
  const groet = `Beste ${naam},`;
  const ps = psZin && psZin.trim() ? [psZin.trim()] : [];
  const wieBenIk =
    "Ik ben Jarno, financieel coach voor mensen die goed verdienen en toch krap zitten. Geen schuldhulp, geen producten, geen provisie.";
  const afsluiter =
    "PS: geen interesse? Zeg het gerust, dan mail ik je niet meer.";

  switch (doelgroep) {
    case "relatietherapeuten":
      return {
        subject: `${naam}, herken je dit bij stellen?`,
        alineas: [
          groet,
          ...ps,
          "Je kent ze wel: het stel waarbij de communicatie in de sessies echt beter wordt, maar de spanning over geld elke maand terugkomt. Zelfde thema, zelfde gesprek.",
          "Dat geldgedoe is zelden een relatieprobleem. Bijna altijd ontbreekt simpelweg het zicht op waar hun geld blijft.",
          wieBenIk,
          "Ken je stellen bij wie dit speelt?",
          afsluiter,
        ],
      };
    case "budgetcoaches":
      return {
        subject: `${naam}, het type klant dat net niet past`,
        alineas: [
          groet,
          ...ps,
          "Je kent ze vast: iemand met een prima inkomen die aanklopt omdat het geld elke maand op is. Geen schulden, geen achterstanden. Jouw aanpak is er niet voor gebouwd, en dat weet je zelf ook.",
          wieBenIk + " Precies de groep die bij jou buiten de boot valt.",
          "Zou je daar ooit voor willen doorverwijzen?",
          afsluiter,
        ],
      };
    case "financieel-planners":
      return {
        subject: `${naam}, als het maandbudget je plan tegenwerkt`,
        alineas: [
          groet,
          ...ps,
          "Herken je dit: het plan staat, de doelen zijn helder, maar maand na maand blijft er te weinig over om de inleg waar te maken. Niet omdat de strategie niet klopt, maar omdat het huishoudboekje lekt.",
          "Dat stuk valt buiten jouw opdracht, en toch bepaalt het of je advies slaagt.",
          "Ik ben Jarno, financieel coach. Ik maak zichtbaar waar de maandruimte weglekt, zodat jouw plan uitvoerbaar wordt.",
          "Past dit als aanvulling op jouw praktijk?",
          afsluiter,
        ],
      };
    case "burnout-coaches":
      return {
        subject: `${naam}, herken je dit bij cliënten?`,
        alineas: [
          groet,
          ...ps,
          "Je ziet het vast vaker: iemand herstelt goed, de werkdruk zakt, maar thuis blijft elke maand hetzelfde geknepen gevoel over geld. Die onderstroom houdt spanning in het lijf, hoe goed de begeleiding ook loopt.",
          "Geldstress is bij deze groep zelden een inkomensprobleem. Meestal ontbreekt alleen het zicht op waar het blijft.",
          wieBenIk,
          "Ken je cliënten bij wie dit speelt?",
          afsluiter,
        ],
      };
  }
}

// ── Follow-ups: kort, luchtig, geen schuldgevoel. FU1 bevat de enige link. ───

const FU1_FRASE: Record<Doelgroep, string> = {
  "relatietherapeuten": "stellen waarbij de geldspanning steeds terugkomt",
  "budgetcoaches": "klanten die goed verdienen maar buiten je doelgroep vallen",
  "financieel-planners": "klanten met te weinig maandruimte om je advies uit te voeren",
  "burnout-coaches": "geldstress als onderstroom bij herstel",
};

function followupMail(naam: string, doelgroep: Doelgroep, nummer: number, eersteSubject: string): Mail {
  if (nummer === 1) {
    return {
      subject: `Re: ${eersteSubject}`,
      alineas: [
        `Beste ${naam},`,
        `Vorige week stuurde ik je een mail over ${FU1_FRASE[doelgroep]}. Ik weet hoe vol een praktijk zit, dus geen zorgen als die erbij ingeschoten is.`,
        `Hoe ik met doorverwijzingen omga staat hier kort uitgelegd: https://www.waarblijfthet.nl/samenwerken/${doelgroep}`,
        "Eén vraag maar: zie jij dit type klant weleens voorbijkomen?",
      ],
    };
  }
  return {
    subject: `Re: ${eersteSubject}`,
    alineas: [
      `Beste ${naam},`,
      "Laatste mail van mijn kant, daarna laat ik je met rust.",
      "Mocht je ooit iemand tegenkomen die goed verdient maar elke maand vastloopt op geld: via waarblijfthet.nl kunnen ze gratis en anoniem een korte analyse doen. Doorsturen is genoeg, er zit geen verplichting aan.",
      "Dank voor je tijd, en veel succes met je praktijk.",
    ],
  };
}

// ── Versturen ────────────────────────────────────────────────────────────────
// POST /api/admin/outreach/send
// Body: { id: string } of { ids: string[] }       , eerste mail (status 'nieuw')
// Body: { ids: string[], type: "followup" }       , follow-up (max 2, na 3+ dagen)

const FOLLOWUP_WACHTDAGEN = 3;
const MAX_FOLLOWUPS = 2;

export async function POST(req: NextRequest) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }
  const supabase = createServiceClient();
  const body = await req.json();

  const ids: string[] = body.ids ?? (body.id ? [body.id] : []);
  const isFollowup = body.type === "followup";
  if (ids.length === 0) {
    return NextResponse.json({ error: "id(s) ontbreken" }, { status: 400 });
  }

  const query = supabase.from("outreach_contacts").select("*").in("id", ids);
  const { data: contacten, error: fetchError } = isFollowup
    ? await query.in("status", ["verstuurd", "geopend", "geklikt"])
    : await query.eq("status", "nieuw");

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!contacten || contacten.length === 0) {
    return NextResponse.json(
      { error: isFollowup ? "Geen contacten die een follow-up kunnen krijgen" : "Geen nieuwe contacten gevonden" },
      { status: 404 }
    );
  }

  const resultaten: { id: string; naam: string; ok: boolean; fout?: string }[] = [];

  for (const contact of contacten) {
    try {
      const doelgroep = (contact.doelgroep ?? "relatietherapeuten") as Doelgroep;

      let mail: Mail;
      if (isFollowup) {
        const alGedaan: number = contact.followups ?? 0;
        if (alGedaan >= MAX_FOLLOWUPS) {
          resultaten.push({ id: contact.id, naam: contact.naam, ok: false, fout: "Max follow-ups bereikt" });
          continue;
        }
        const laatsteContact = new Date(contact.laatste_followup_at ?? contact.verstuurd_at ?? 0);
        const dagenGeleden = (Date.now() - laatsteContact.getTime()) / 86400000;
        if (dagenGeleden < FOLLOWUP_WACHTDAGEN) {
          resultaten.push({
            id: contact.id, naam: contact.naam, ok: false,
            fout: `Laatste mail is ${Math.floor(dagenGeleden)} dag(en) oud, wacht minimaal ${FOLLOWUP_WACHTDAGEN}`,
          });
          continue;
        }
        const eersteSubject = eersteMail(contact.naam, doelgroep).subject;
        mail = followupMail(contact.naam, doelgroep, alGedaan + 1, eersteSubject);
      } else {
        mail = eersteMail(contact.naam, doelgroep, contact.ps_zin);
      }

      const { data: verzonden } = await resend.emails.send({
        from: "Jarno Koopman <hallo@waarblijfthet.nl>",
        to: contact.email,
        subject: mail.subject,
        html: naarHtml(mail.alineas),
        text: naarText(mail.alineas),
      });

      const update = isFollowup
        ? {
            followups: (contact.followups ?? 0) + 1,
            laatste_followup_at: new Date().toISOString(),
            resend_id: verzonden?.id ?? null,
          }
        : {
            status: "verstuurd",
            verstuurd_at: new Date().toISOString(),
            resend_id: verzonden?.id ?? null,
          };

      await supabase.from("outreach_contacts").update(update).eq("id", contact.id);

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
