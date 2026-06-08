/**
 * Cold outreach via Resend
 *
 * Gebruik:
 *   1. Vul data/outreach-relatietherapeuten.csv met naam,email
 *   2. Voer uit: npx dotenv -e .env.local -- node scripts/send-cold-outreach.mjs
 *
 * Vereisten: RESEND_API_KEY in .env.local (heb je al)
 */

import { Resend } from "resend";
import { readFileSync } from "fs";

// ─── Config ───────────────────────────────────────────────────────────────────

const CSV_BESTAND = "./data/outreach-relatietherapeuten.csv";
const VERTRAGING_MS = 3000; // 3 seconden tussen e-mails (voorkomt spam-vlaggen)
const AFZENDER = "Jarno Koopman <jarno@waarblijfthet.nl>";

// ─── CSV inladen ──────────────────────────────────────────────────────────────

function laadContacten(pad) {
  const inhoud = readFileSync(pad, "utf-8");
  const regels = inhoud.trim().split("\n");
  const headers = regels[0].split(",").map((h) => h.trim().toLowerCase());

  return regels.slice(1).map((regel) => {
    const waarden = regel.split(",").map((v) => v.trim());
    return Object.fromEntries(headers.map((h, i) => [h, waarden[i] ?? ""]));
  });
}

// ─── E-mail template ──────────────────────────────────────────────────────────

function onderwerp(naam) {
  return `${naam}, herken je dit bij koppels?`;
}

function htmlBody() {
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <tr><td style="font-size:15px;line-height:1.7;color:#1A1A1A;">

      <p style="margin:0 0 18px 0;">
        Je kent ze waarschijnlijk: het koppel waarbij de communicatie over geld
        in therapie beter wordt, maar de druk niet verdwijnt. Jij verbetert het
        gesprek. Maar hun financiele situatie verandert er niet door.
      </p>

      <p style="margin:0 0 18px 0;">
        Ik ben Jarno, financieel coach voor stellen die goed verdienen maar toch
        krap zitten. Hoe dat eruitziet in de praktijk, lees je
        <a href="https://www.waarblijfthet.nl/samenwerken/relatietherapeuten"
           style="color:#C4603A;text-decoration:underline;">hier</a>.
      </p>

      <p style="margin:0 0 32px 0;">
        Past dit als aanvulling op jouw praktijk?
      </p>

      <p style="margin:0 0 8px 0;font-size:14px;color:#444;line-height:1.6;">
        <strong style="color:#1A1A1A;display:block;">Jarno Koopman</strong>
        Financieel coach, Waar blijft het<br>
        <a href="https://www.waarblijfthet.nl"
           style="color:#C4603A;text-decoration:none;">waarblijfthet.nl</a>
      </p>

      <p style="margin:24px 0 0 0;font-size:12px;color:#999;font-style:italic;">
        Geen interesse? Laat het me weten, dan hoor je niks meer van me.
      </p>

    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Versturen ────────────────────────────────────────────────────────────────

function wacht(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verstuurAlles() {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let contacten;

  try {
    contacten = laadContacten(CSV_BESTAND);
  } catch (err) {
    console.error(`Kan CSV niet openen: ${CSV_BESTAND}`);
    console.error(err.message);
    process.exit(1);
  }

  if (contacten.length === 0) {
    console.log("Geen contacten gevonden in CSV.");
    process.exit(0);
  }

  console.log(`Verstuur naar ${contacten.length} contacten...\n`);

  let geslaagd = 0;
  let mislukt = 0;

  for (let i = 0; i < contacten.length; i++) {
    const { naam, email } = contacten[i];

    if (!naam || !email) {
      console.warn(`  Rij ${i + 2}: naam of email ontbreekt, overgeslagen.`);
      mislukt++;
      continue;
    }

    try {
      await resend.emails.send({
        from: AFZENDER,
        to: email,
        subject: onderwerp(naam),
        html: htmlBody(),
      });
      console.log(`  Verstuurd  ${naam} <${email}>`);
      geslaagd++;
    } catch (err) {
      console.error(`  Mislukt    ${naam} <${email}>: ${err.message}`);
      mislukt++;
    }

    // Wacht tussen e-mails (behalve na de laatste)
    if (i < contacten.length - 1) {
      await wacht(VERTRAGING_MS);
    }
  }

  console.log(`\nKlaar. Verstuurd: ${geslaagd}  |  Mislukt: ${mislukt}`);
}

verstuurAlles();
