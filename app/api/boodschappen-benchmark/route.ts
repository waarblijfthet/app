import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Huishouden = "alleen" | "twee" | "gezin-jong" | "gezin-pubers" | "groot";

const BENCHMARKS: Record<Huishouden, {
  label: string; norm: string; realistisch: string; hefbomen: string[];
}> = {
  "alleen": {
    label: "alleenstaande",
    norm: "€272",
    realistisch: "€300 tot €400",
    hefbomen: [
      "Kook voor twee dagen tegelijk: verpakkingen zijn op meerpersoonshuishoudens gemaakt, dus voor één koken is relatief duur. Twee porties koken en één invriezen scheelt al snel €40 tot €60 per maand.",
      "Beperk losse winkelritjes tot maximaal twee per week. Elke extra rit kost gemiddeld €10 tot €20 aan dingen die niet op je lijstje stonden.",
      "Check je vaste tussendoor-momenten (broodje buiten de deur, koffie onderweg). Die vallen buiten je boodschappenbedrag maar horen er eerlijk gezien bij.",
    ],
  },
  "twee": {
    label: "huishouden van twee",
    norm: "€495",
    realistisch: "€550 tot €700",
    hefbomen: [
      "Gemaksmaaltijden zijn bij stellen de grootste sluippost: een kant-en-klare maaltijd kost €7 tot €8, zelf maken €3 tot €4. Drie keer per week schelen is zo €90 per maand.",
      "Maak een weekmenu van vier vaste gerechten en varieer alleen de groente. Minder beslissen is minder impulsaankopen.",
      "Doe boodschappen één keer per week op een vast moment, met lijstje. De tweede en derde rit van de week zijn bijna altijd de duurste.",
    ],
  },
  "gezin-jong": {
    label: "gezin met jonge kinderen",
    norm: "€634",
    realistisch: "€700 tot €900",
    hefbomen: [
      "Laat jonge kinderen een mini-versie van hetzelfde eten meekrijgen, nooit apart koken. Apart koken kost dubbel in tijd én geld.",
      "Draai de volgorde om: eerst het weekmenu, dán de aanbiedingen die erin passen. Een aanbieding buiten je menu is geen besparing maar een extra uitgave.",
      "Plan één vaste restjesdag per week. Bij gezinnen verdwijnt al snel €50 tot €100 per maand in de prullenbak.",
    ],
  },
  "gezin-pubers": {
    label: "gezin met pubers",
    norm: "€822",
    realistisch: "€1.000 tot €1.400",
    hefbomen: [
      "Reken een puber als een volwassene bij het afmeten van porties, maar meet wel af: 100 tot 125 gram vlees per persoon en aanvullen met groente of peulvruchten is goedkoper en gezonder.",
      "Twee vleesloze dagen per week met bonen, linzen of ei scheelt bij een gezin met pubers direct tientallen euro's per maand.",
      "Snijd de losse tussenritjes weg: één hoofdmoment per week, hooguit één korte verse aanvulling. Met etende pubers zijn de tussenritjes de grootste lek.",
    ],
  },
  "groot": {
    label: "groot of samengesteld gezin",
    norm: "boven €900",
    realistisch: "€1.500 tot €2.000",
    hefbomen: [
      "Bouw het weekmenu rond vier hoofdgerechten die iederéén eet en varieer alleen groente of saus. Dubbel koken omdat niet iedereen alles lust is de grootste kostenpost.",
      "Kook op afgemeten porties en plan één vaste restjesdag. Bij grote gezinnen gaat er zomaar €100+ per maand de prullenbak in.",
      "Koop groot in bij de basis (rijst, pasta, houdbaar) maar nooit bij vers zonder plan: grootverpakkingen vers die je weggooit zijn duurder dan kleinverpakkingen die op gaan.",
    ],
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const huishouden = body?.huishouden as Huishouden;

    if (!email || !email.includes("@") || !email.includes(".") || email.length > 200) {
      return NextResponse.json({ error: "Vul een geldig e-mailadres in." }, { status: 400 });
    }
    if (!BENCHMARKS[huishouden]) {
      return NextResponse.json({ error: "Kies je huishoudsituatie." }, { status: 400 });
    }
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Mailen is tijdelijk niet mogelijk." }, { status: 500 });
    }

    const b = BENCHMARKS[huishouden];
    const hefbomenHtml = b.hefbomen
      .map((h, i) => `<p style="margin:0 0 14px 0;"><strong>${i + 1}.</strong> ${h}</p>`)
      .join("");

    const html =
      '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#16211F;max-width:560px;">' +
      `<p style="margin:0 0 18px 0;">Hoi,</p>` +
      `<p style="margin:0 0 18px 0;">Hier is je boodschappen-benchmark voor een ${b.label}:</p>` +
      `<p style="margin:0 0 18px 0;">Nibud-minimum: <strong>${b.norm}</strong> per maand.<br>` +
      `Wat vergelijkbare huishoudens echt uitgeven: <strong>${b.realistisch}</strong> per maand (inclusief drogist, bakker en tussendoor).</p>` +
      `<p style="margin:0 0 18px 0;">Zit je daarboven? Dan ben je geen uitzondering, en het betekent niet dat je iets fout doet. De drie hefbomen die in jouw situatie het meeste opleveren:</p>` +
      hefbomenHtml +
      `<p style="margin:18px 0 18px 0;">Wil je weten hoe je op álle posten vergelijkt met huishoudens zoals dat van jou? Doe de gratis analyse (5 minuten, anoniem, resultaat direct op je scherm): <a href="https://www.waarblijfthet.nl/analyse" style="color:#0B7A6E;">waarblijfthet.nl/analyse</a></p>` +
      `<p style="margin:24px 0 0 0;">Jarno Koopman<br>Financieel coach, Waar blijft het<br><a href="https://www.waarblijfthet.nl" style="color:#16211F;">waarblijfthet.nl</a></p>` +
      `<p style="margin:24px 0 0 0;font-size:12px;color:#999;">Je krijgt deze ene mail omdat je hem zelf aanvroeg. Er volgt geen nieuwsbrief.</p>` +
      "</div>";

    await resend.emails.send({
      from: "Jarno Koopman <hallo@waarblijfthet.nl>",
      to: email,
      subject: "Jouw boodschappen-benchmark en drie hefbomen",
      html,
    });

    // Notificatie zodat het adres bewaard blijft (geen aparte tabel nodig)
    await resend.emails.send({
      from: "Waar blijft het <hallo@waarblijfthet.nl>",
      to: "hallo@waarblijfthet.nl",
      subject: `Benchmark-mail aangevraagd: ${email}`,
      html: `<p>${email} vroeg de boodschappen-benchmark aan (${b.label}).</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Er ging iets mis. Probeer het later opnieuw." }, { status: 500 });
  }
}
