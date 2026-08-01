// Outreach-mailteksten, gedeeld door de admin send-route en de follow-up-cron.
// Strategie 18-jul-2026 v5 (docs/outreach-strategie-jul-2026.md), persona-
// getoetst in 4 rondes. Principes: geven voor vragen; micro-vraag; geen
// doorverwijsvraag om HUN klanten; wederkerigheid in mail 1; nooit het woord
// "eerlijk" (eerlijkheid toon je). De plaats (indien bekend) voegt een
// regio-zin toe die verklaart waarom juist deze persoon gemaild wordt;
// onbekend = zin valt weg, nooit gokken. Eerste contact loopt altijd per
// mail (beschikbaarheid Jarno): geen bel-uitnodigingen in de copy en geen
// telefoonnummer in de handtekening (prive; komt evt. terug met een apart nummer).
// LET OP: de A4 met de drie patronen (FU2 relatietherapeuten/burnout) moet
// bestaan voordat die follow-up verstuurd wordt.
//
// Naamgebruik (30-jul-2026, "prospect-zoeker verbeterronde" deel 6): de
// prospect-zoeker levert soms geen betrouwbare naam op ("Info", "Welkom").
// naamIsBetrouwbaar() hergebruikt de bestaande naam-validatie uit de
// prospect-zoeker (lijktPersoonsnaam + de naam-blacklist) zodat er niet twee
// losse implementaties van "is dit een naam" ontstaan. Is de naam niet
// betrouwbaar, dan gebruiken eersteMail en followupMail een naamloze
// aanhef en, voor mail 1, een naamloze onderwerpregel; de inhoud van de
// mails zelf verandert niet.
//
// Bewerkbaar in de admin (31-jul-2026, zie docs/admin-redesign-30-jul-2026.md
// vervolg): de teksten hieronder in DEFAULT_TEMPLATES zijn de terugval-
// waarden. De echte, actief gebruikte tekst staat in de tabel
// outreach_templates (supabase/outreach_templates.sql) en is bewerkbaar via
// /admin/mailsjablonen. Ontbreekt die rij (migratie nog niet gedraaid, of
// een rij verwijderd), dan valt eersteMail/followupMail terug op de
// hardcoded tekst hier, zelfde patroon als de schema-drift fallback in
// app/api/intake/route.ts. Dynamische stukken (groet, ps-zin, regio-zin)
// blijven runtime-logica en staan als token in de alineas: {{GROET}},
// {{PS}}, {{REGIO}}. Subject-tokens: {{voornaam}}. eersteMail en
// followupMail zijn hierdoor async geworden (ze lezen de database).
//
// Handtekening en links (1-aug-2026): de handtekening onderaan elke mail
// stond hardcoded (HANDTEKENING) en was nergens te zien of te wijzigen in de
// preview. Nu bewerkbaar via /admin/mailsjablonen (nieuwe tabel
// outreach_instellingen, sleutel "handtekening"), met dezelfde
// terugval-aanpak als de mailsjablonen zelf: haalHandtekening() valt terug
// op DEFAULT_HANDTEKENING als de rij ontbreekt. Zowel de alineas als de
// handtekening ondersteunen nu "[tekst](url)" voor een klikbare link; de
// omzetting naar html (<a>) of platte tekst ("tekst (url)") zit in
// lib/outreach/render.ts, gedeeld met de admin-preview zodat die nooit
// afwijkt van de echte verstuurde mail. naarHtml/naarText nemen de
// handtekening nu als parameter (call sites halen hem één keer per request
// op, niet per mail in een bulkverzending).

import { createServiceClient } from "@/lib/supabase-service";
import { isGeblokkeerdeNaam, lijktPersoonsnaam } from "@/lib/prospects/extract";
import { alineaNaarHtml, alineaNaarText } from "@/lib/outreach/render";

export type Doelgroep =
  | "relatietherapeuten"
  | "budgetcoaches"
  | "financieel-planners"
  | "burnout-coaches"
  | "boekhouders";

export type MailType = "eerste" | "fu1" | "fu2";

export interface Mail {
  subject: string;
  alineas: string[];
}

export const FOLLOWUP_WACHTDAGEN = 3;
export const MAX_FOLLOWUPS = 2;

// Terugval als outreach_instellingen geen rij "handtekening" heeft.
export const DEFAULT_HANDTEKENING =
  "Jarno Koopman\nFinancieel coach, Waar blijft het\n[waarblijfthet.nl](https://www.waarblijfthet.nl)";

/**
 * Haalt de bewerkbare handtekening op (1x per request aanroepen, niet per
 * mail: de tekst is niet contact-afhankelijk). Zelfde vangnet-patroon als
 * haalTemplate hieronder: ontbrekende migratie of lege rij mag het
 * versturen nooit blokkeren.
 */
export async function haalHandtekening(): Promise<string> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("outreach_instellingen")
      .select("waarde")
      .eq("sleutel", "handtekening")
      .maybeSingle();
    if (error || !data) return DEFAULT_HANDTEKENING;
    const tekst = (data.waarde as { tekst?: string } | null)?.tekst;
    return typeof tekst === "string" && tekst.trim() ? tekst : DEFAULT_HANDTEKENING;
  } catch {
    return DEFAULT_HANDTEKENING;
  }
}

export function naarHtml(alineas: string[], handtekening: string): string {
  const blokken = alineas.map((a) => `<p style="margin:0 0 18px 0;">${alineaNaarHtml(a)}</p>`).join("\n");
  const sig = `<p style="margin:24px 0 0 0;">${alineaNaarHtml(handtekening)}</p>`;
  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#16211F;max-width:560px;">' +
    blokken +
    sig +
    "</div>"
  );
}

export function naarText(alineas: string[], handtekening: string): string {
  return alineas.map(alineaNaarText).join("\n\n") + "\n\n" + alineaNaarText(handtekening);
}

/** Eerste woord van de naam; aanhef en onderwerp gebruiken de voornaam. */
export function voornaamVan(naam: string): string {
  return naam.trim().split(/\s+/)[0] || naam.trim();
}

/**
 * Is deze naam betrouwbaar genoeg om in een aanhef of onderwerp te
 * gebruiken? Hergebruikt de validatie uit de prospect-zoeker in plaats van
 * een tweede implementatie te bouwen: niet leeg, geen navigatiewoord uit de
 * naam-blacklist (info, contact, welkom, ...), en ziet er verder uit als
 * een naam.
 */
export function naamIsBetrouwbaar(naam: string | null | undefined): boolean {
  const schoon = (naam ?? "").trim();
  if (!schoon) return false;
  if (isGeblokkeerdeNaam(schoon)) return false;
  return lijktPersoonsnaam(schoon);
}

export interface TemplateInhoud {
  subject?: string;
  subjectNaamloos?: string;
  regioZin?: string;
  alineas: string[];
}

const AFSLUITER = "PS: liever niet? Eén woordje is genoeg, dan mail ik je niet meer.";

// Terugval-teksten, exact gelijk aan de seed in supabase/outreach_templates.sql.
// Wijzig teksten via de admin (/admin/mailsjablonen), niet hier; dit bestand
// is alleen nog het vangnet als de database geen rij heeft.
export const DEFAULT_TEMPLATES: Record<Doelgroep, Record<MailType, TemplateInhoud>> = {
  "relatietherapeuten": {
    eerste: {
      subject: "{{voornaam}}, mag ik stellen naar jouw praktijk verwijzen?",
      subjectNaamloos: "Mag ik stellen naar jouw praktijk verwijzen?",
      regioZin: "Ik zoek bewust iemand in de regio {{plaats}}: een stel stuur ik liever naar iemand in de buurt dan naar een landelijke lijst.",
      alineas: [
        "{{GROET}}",
        "Soms zit er een stel tegenover me waar het gesprek na een half uur niet meer over cijfers gaat, maar over wie bepaalt, wie zwijgt, wat geld vroeger thuis betekende. Dat is jouw vak, niet het mijne, en ik ga niet doen alsof.",
        "{{PS}}",
        "Wie ik ben: financieel coach, begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Jij zou een van de eerste relatietherapeuten zijn met wie ik zoiets afspreek; het gaat om enkele stellen per jaar, geen stroom.",
        "{{REGIO}}",
        "Ik verwijs niet blind, dus ik wil weten naar wie. Stel me daarom gerust per mail de vragen die je zou stellen aan iedereen die naar je verwijst; jij bepaalt het tempo.",
        AFSLUITER,
      ],
    },
    fu1: {
      alineas: [
        "{{GROET}}",
        "Ik hoorde nog niet van je; dit is geen herinnering, eerder iets wat je misschien kunt gebruiken in een sessie. De drie patronen die ik het vaakst zie bij stellen die goed verdienen en toch elke maand spanning over geld hebben:",
        "1. Niemand heeft het overzicht. Allebei denken ze stiekem dat de ander te veel uitgeeft, en allebei kunnen ze het niet hardmaken.\n2. De vaste lasten zijn stilletjes meegegroeid met het inkomen. \"We verdienen toch goed\" klopt gevoelsmatig, maar feitelijk al jaren niet meer.\n3. Er is geen afgesproken vrij bedrag per persoon. Daardoor is elke losse uitgave een potentieel verwijt.",
        "Loop jij in een casus ooit vast op het feitelijke geldoverzicht, leg hem me dan gerust per mail voor. Kosteloos, en er staat niets tegenover.",
        "Wat doe jij eigenlijk nu als een stel op het geld blijft vastlopen?",
      ],
    },
    fu2: {
      alineas: [
        "{{GROET}}",
        "Laatste mail van mijn kant, daarna laat ik je met rust.",
        "Van de drie patronen uit mijn vorige mail heb ik een A4 gemaakt dat je aan een stel kunt meegeven, desgewenst zonder mijn naam erop. Wil je het hebben? Eén woordje is genoeg, dan stuur ik het je.",
        "En mijn vraag blijft staan: mag ik jouw praktijk noemen als er bij mij een stel zit waar geld eigenlijk relatiepijn is? Vragen stellen per mail mag altijd eerst.",
        "Dank voor je tijd, en veel succes met je praktijk.",
      ],
    },
  },
  "budgetcoaches": {
    eerste: {
      subject: "{{voornaam}}, ik zoek een budgetcoach om naar door te verwijzen",
      subjectNaamloos: "Ik zoek een budgetcoach om naar door te verwijzen",
      regioZin: "Ik zoek bewust iemand in de regio {{plaats}}; een warme overdracht werkt het best dichtbij.",
      alineas: [
        "{{GROET}}",
        "{{PS}}",
        "Ik ben financieel coach voor huishoudens die goed verdienen en toch elke maand krap zitten; zij melden zich bij mij via mijn site. Zodra er achterstanden, incasso's of regelingen spelen, houdt mijn werk op. Ik wil die mensen dan niet wegsturen met \"zoek maar een budgetcoach\", maar warm overdragen aan een naam die ik ken, met de context die ik al heb, zodat jij niet vanaf nul begint.",
        "Wie ik ben: dit werk begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Er zit geen vergoeding, tegenprestatie of leadconstructie aan; mijn tarieven en werkwijze staan open op mijn site.",
        "{{REGIO}}",
        "Ik heb je toestemming niet nodig om je naam te noemen, maar wel je voorkeur: zit je op zulke overdrachten te wachten? Eén woordje is genoeg. Het gaat om een paar mensen per jaar, geen stroom.",
        AFSLUITER,
      ],
    },
    fu1: {
      alineas: [
        "{{GROET}}",
        "Ik hoorde nog niet van je, geen probleem. Voor het beeld, wat \"warm overdragen\" bij mij betekent: ik mail je vooraf, je krijgt de situatie zoals ik hem ken (inkomen, wat er speelt, wat er al aan cijfers ligt) en de klant weet dat jij het overneemt en waarom. Geen doorgeefluik, geen leadformulier.",
        "Eén vraag: wat wil jij vooraf weten bij zo'n overdracht? Dan richt ik het meteen goed in.",
      ],
    },
    fu2: {
      alineas: [
        "{{GROET}}",
        "Laatste mail van mijn kant, daarna laat ik je met rust.",
        "Het aanbod blijft staan, ook zonder antwoord: zodra ik iemand tegenkom met achterstanden of schulden, noem ik liever een naam dan \"zoek maar een budgetcoach\". Wil jij die naam zijn: één woordje is genoeg.",
        "En de andere kant op, open kaart: op waarblijfthet.nl staat een gratis anonieme analyse. Zo kom ik aan mijn klanten, dus ja, daar heb ik wat aan als jij hem ooit noemt. Alleen als het jou een keer uitkomt; jij bepaalt wat bij je past.",
        "Dank voor je tijd, en veel succes met je praktijk.",
      ],
    },
  },
  "financieel-planners": {
    eerste: {
      subject: "{{voornaam}}, ik zoek een financieel planner om naar door te verwijzen",
      subjectNaamloos: "Ik zoek een financieel planner om naar door te verwijzen",
      regioZin: "Ik zoek bewust iemand in de regio {{plaats}}; doorverwijzen werkt het best dichtbij.",
      alineas: [
        "{{GROET}}",
        "{{PS}}",
        "Ik ben financieel coach voor huishoudens die goed verdienen en toch elke maand krap zitten; zij melden zich bij mij via mijn site. Zodra iemand na het inzicht structureel ruimte overhoudt en verder wil met vermogen, pensioen of een hypotheekvraag, houdt mijn werk op: ik geef nadrukkelijk geen product- of beleggingsadvies en heb de papieren daarvoor ook niet.",
        "Ik wil die mensen dan een naam kunnen geven die ik ken, geen adres van internet. Wie ik ben: begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Er zit geen vergoeding of tegenprestatie aan; mijn tarieven en werkwijze staan open op mijn site.",
        "{{REGIO}}",
        "Ik heb je toestemming niet nodig om je naam te noemen, maar wel je voorkeur: zit je op zulke doorverwijzingen te wachten? Eén woordje is genoeg. Het gaat om enkele mensen per jaar, geen stroom.",
        AFSLUITER,
      ],
    },
    fu1: {
      alineas: [
        "{{GROET}}",
        "Ik hoorde nog niet van je, geen probleem. Voor het beeld, wat \"warm overdragen\" bij mij betekent: ik meld het vooraf, je krijgt de situatie zoals ik hem ken (inkomen, vaste lasten, wat er maandelijks overblijft en waar dat inzicht op gebaseerd is) en de klant weet dat jij het overneemt en waarom. Geen doorgeefluik, geen leadformulier.",
        "Eén vraag: wat wil jij vooraf weten bij zo'n overdracht? Dan richt ik het meteen goed in.",
      ],
    },
    fu2: {
      alineas: [
        "{{GROET}}",
        "Laatste mail van mijn kant, daarna laat ik je met rust.",
        "Het aanbod blijft staan, ook zonder antwoord: zodra iemand bij mij structureel ruimte overhoudt en verder wil met vermogen of pensioen, noem ik liever een naam dan \"zoek maar een planner\". Wil jij die naam zijn: één woordje is genoeg.",
        "En de andere kant op, open kaart: op waarblijfthet.nl staat een gratis anonieme analyse. Zo kom ik aan mijn klanten, dus ja, daar heb ik wat aan als jij hem ooit noemt bij iemand met te weinig maandruimte voor je advies. Alleen als het jou uitkomt; jij bepaalt wat bij je past.",
        "Dank voor je tijd, en veel succes met je praktijk.",
      ],
    },
  },
  "burnout-coaches": {
    eerste: {
      subject: "{{voornaam}}, mag ik cliënten naar jouw praktijk verwijzen?",
      subjectNaamloos: "Mag ik cliënten naar jouw praktijk verwijzen?",
      regioZin: "Ik zoek bewust iemand in de regio {{plaats}}: een cliënt stuur ik liever naar iemand in de buurt dan naar een landelijke lijst.",
      alineas: [
        "{{GROET}}",
        "Soms zit er iemand tegenover me bij wie het geld wel op orde komt, maar de vermoeidheid dieper blijkt te zitten dan de cijfers. Dat is jouw vak, niet het mijne, en ik ga niet doen alsof.",
        "{{PS}}",
        "Wie ik ben: financieel coach, begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Jij zou een van de eerste burn-out-coaches zijn met wie ik zoiets afspreek; het gaat om enkele mensen per jaar, geen stroom.",
        "{{REGIO}}",
        "Ik verwijs niet blind, dus ik wil weten naar wie. Stel me daarom gerust per mail de vragen die je zou stellen aan iedereen die naar je verwijst; jij bepaalt het tempo.",
        AFSLUITER,
      ],
    },
    fu1: {
      alineas: [
        "{{GROET}}",
        "Ik hoorde nog niet van je; dit is geen herinnering, eerder iets wat je misschien kunt gebruiken in een traject. De drie patronen die ik het vaakst zie als geldstress het herstel in de weg zit:",
        "1. De buffer is tijdens de uitval stilletjes geslonken en niemand heeft durven kijken hoe erg precies. Het niet-weten stresst meer dan het getal.\n2. Bij re-integratie of minder uren verandert het inkomen, maar de uitgaven staan nog op het oude leven.\n3. De bank-app wordt vermeden. Wat je niet ziet, blijft als diffuse dreiging op de achtergrond meedraaien.",
        "Loop jij in een traject ooit vast op het feitelijke geldoverzicht, leg hem me dan gerust per mail voor. Kosteloos, en er staat niets tegenover.",
        "Wat doe jij eigenlijk nu als geldstress het herstel van een cliënt blokkeert?",
      ],
    },
    fu2: {
      alineas: [
        "{{GROET}}",
        "Laatste mail van mijn kant, daarna laat ik je met rust.",
        "Van de drie patronen uit mijn vorige mail heb ik een A4 gemaakt dat je aan een cliënt kunt meegeven, desgewenst zonder mijn naam erop. Wil je het hebben? Eén woordje is genoeg, dan stuur ik het je.",
        "En mijn vraag blijft staan: mag ik jouw praktijk noemen als ik merk dat de vermoeidheid dieper zit dan het geld? Vragen stellen per mail mag altijd eerst.",
        "Dank voor je tijd, en veel succes met je praktijk.",
      ],
    },
  },
  "boekhouders": {
    eerste: {
      subject: "{{voornaam}}, mag ik mensen naar je doorverwijzen?",
      subjectNaamloos: "Mag ik mensen naar je doorverwijzen?",
      regioZin: "Ik zoek bewust iemand in de regio {{plaats}}: iemand doorsturen werkt het best als het dichtbij is.",
      alineas: [
        "{{GROET}}",
        "Een klant komt voor zijn aangifte of jaarrekening en vraagt tussendoor: we verdienen eigenlijk goed, waarom houden we dan elke maand zo weinig over? Dat is geen fiscale vraag en geen boekhoudvraag, en midden in zo'n gesprek is er ook geen goed moment om er iets mee te doen.",
        "{{PS}}",
        "Dat stuk is precies mijn werk. Ik help mensen die genoeg verdienen maar geen beeld hebben van waar hun geld blijft en hoeveel ruimte er werkelijk is. Geen administratie, geen belastingadvies, geen beleggingen, geen hypotheken. Ik kijk naar het huishouden als geheel en zet op papier waar het geld naartoe gaat en wat er anders kan. We zitten elkaar dus niet in de weg.",
        "{{REGIO}}",
        "Wat ik zoek is een boekhouder naar wie ik iemand kan doorsturen als zijn vraag toch fiscaal of administratief blijkt. Ik stuur niemand naar iemand die ik niet ken, dus ik zou eerst willen weten hoe je werkt. Andersom hoeft voorlopig niets.",
        "Krijg je die vraag weleens langs?",
        AFSLUITER,
      ],
    },
    fu1: {
      alineas: [
        "{{GROET}}",
        "Ik hoorde nog niet van je; dit is geen herinnering, eerder iets wat je misschien herkent. De vraag die het vaakst achter \"kunnen we dit betalen\" schuilgaat bij goedverdieners: er is geen overzicht, de vaste lasten zijn stilletjes meegegroeid met het inkomen, en niemand heeft dat ooit hardgemaakt met cijfers.",
        "Krijg jij dat weleens: een klant die eigenlijk een geldgesprek wil in plaats van een aangifte?",
      ],
    },
    fu2: {
      alineas: [
        "{{GROET}}",
        "Laatste mail van mijn kant, daarna laat ik je met rust.",
        "Laatste keer dat ik het aanbod noem: als een klant bij jou met zo'n bredere geldvraag komt, mag je gerust mijn naam noemen, of me mailen en ik neem het over. Geen tegenprestatie, geen leadconstructie.",
        "En open kaart over mijn eigen belang: ik zoek zelf ook iemand naar wie ik kan doorsturen als een vraag toch over de aangifte of de administratie gaat. Dat hoeft nu niet, en als het nooit iets wordt is dat ook goed.",
        "Dank voor je tijd, en veel succes met je praktijk.",
      ],
    },
  },
};

/**
 * Haalt de actieve template op uit outreach_templates, met terugval op
 * DEFAULT_TEMPLATES als de rij ontbreekt, leeg is, of de query faalt (geen
 * migratie gedraaid, tijdelijke storing). Versturen mag hier nooit op
 * vastlopen.
 */
async function haalTemplate(doelgroep: Doelgroep, type: MailType): Promise<TemplateInhoud> {
  const fallback = DEFAULT_TEMPLATES[doelgroep][type];
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("outreach_templates")
      .select("subject, subject_naamloos, regio_zin, alineas")
      .eq("doelgroep", doelgroep)
      .eq("type", type)
      .maybeSingle();
    if (error || !data) return fallback;
    const alineas = Array.isArray(data.alineas) && data.alineas.length > 0 ? (data.alineas as string[]) : fallback.alineas;
    return {
      subject: data.subject ?? fallback.subject,
      subjectNaamloos: data.subject_naamloos ?? fallback.subjectNaamloos,
      regioZin: data.regio_zin ?? fallback.regioZin,
      alineas,
    };
  } catch {
    return fallback;
  }
}

interface RenderContext {
  groet: string;
  ps: string | null;
  regio: string | null;
}

/**
 * Vervangt de dynamische tokens in een template. {{PS}} en {{REGIO}} vallen
 * weg als er geen inhoud voor is (net als de oude ...ps / ...regioAlinea
 * spreads); {{GROET}} is er altijd.
 */
function renderAlineas(template: string[], ctx: RenderContext): string[] {
  const out: string[] = [];
  for (const regelRuw of template) {
    const regel = regelRuw.trim();
    if (regel === "{{GROET}}") {
      out.push(ctx.groet);
      continue;
    }
    if (regel === "{{PS}}") {
      if (ctx.ps) out.push(ctx.ps);
      continue;
    }
    if (regel === "{{REGIO}}") {
      if (ctx.regio) out.push(ctx.regio);
      continue;
    }
    out.push(regelRuw);
  }
  return out;
}

export async function eersteMail(
  naam: string,
  doelgroep: Doelgroep,
  psZin?: string | null,
  plaats?: string | null
): Promise<Mail> {
  const template = await haalTemplate(doelgroep, "eerste");
  const betrouwbaar = naamIsBetrouwbaar(naam);
  const voornaam = voornaamVan(naam);
  const groet = betrouwbaar ? `Beste ${voornaam},` : "Goedendag,";
  const ps = psZin && psZin.trim() ? psZin.trim() : null;
  const plaatsSchoon = plaats?.trim();
  const regio = plaatsSchoon && template.regioZin
    ? template.regioZin.replace(/\{\{plaats\}\}/g, plaatsSchoon)
    : null;

  const subjectTemplate = (betrouwbaar ? template.subject : template.subjectNaamloos) ?? "";
  const subject = subjectTemplate.replace(/\{\{voornaam\}\}/g, voornaam);

  return {
    subject,
    alineas: renderAlineas(template.alineas, { groet, ps, regio }),
  };
}

export async function followupMail(
  naam: string,
  doelgroep: Doelgroep,
  nummer: number,
  eersteSubject: string
): Promise<Mail> {
  // Let op: eersteSubject komt uit de database en is voor bestaande
  // contacten (van vóór deze wijziging) al met voornaam opgeslagen; die
  // laten we ongewijzigd staan (Re: volgt automatisch mee). Alleen de
  // aanhef hier krijgt de voorwaardelijke logica.
  const type: MailType = nummer === 1 ? "fu1" : "fu2";
  const template = await haalTemplate(doelgroep, type);
  const groet = naamIsBetrouwbaar(naam) ? `Beste ${voornaamVan(naam)},` : "Goedendag,";
  return {
    subject: `Re: ${eersteSubject}`,
    alineas: renderAlineas(template.alineas, { groet, ps: null, regio: null }),
  };
}
