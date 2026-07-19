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

export type Doelgroep =
  | "relatietherapeuten"
  | "budgetcoaches"
  | "financieel-planners"
  | "burnout-coaches";

export interface Mail {
  subject: string;
  alineas: string[];
}

export const FOLLOWUP_WACHTDAGEN = 3;
export const MAX_FOLLOWUPS = 2;

const HANDTEKENING = "Jarno Koopman\nFinancieel coach, Waar blijft het\nwaarblijfthet.nl";

export function naarHtml(alineas: string[]): string {
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

export function naarText(alineas: string[]): string {
  return alineas.join("\n\n") + "\n\n" + HANDTEKENING;
}

/** Regio-zin: verklaart waarom juist deze persoon. Alleen bij bekende plaats. */
function regioZin(doelgroep: Doelgroep, plaats?: string | null): string | null {
  const p = plaats?.trim();
  if (!p) return null;
  switch (doelgroep) {
    case "relatietherapeuten":
      return `Ik zoek bewust iemand in de regio ${p}: een stel stuur ik liever naar iemand in de buurt dan naar een landelijke lijst.`;
    case "budgetcoaches":
      return `Ik zoek bewust iemand in de regio ${p}; een warme overdracht werkt het best dichtbij.`;
    case "financieel-planners":
      return `Ik zoek bewust iemand in de regio ${p}; doorverwijzen werkt het best dichtbij.`;
    case "burnout-coaches":
      return `Ik zoek bewust iemand in de regio ${p}: een cliënt stuur ik liever naar iemand in de buurt dan naar een landelijke lijst.`;
  }
}

/** Eerste woord van de naam; aanhef en onderwerp gebruiken de voornaam. */
export function voornaamVan(naam: string): string {
  return naam.trim().split(/\s+/)[0] || naam.trim();
}

export function eersteMail(
  naam: string,
  doelgroep: Doelgroep,
  psZin?: string | null,
  plaats?: string | null
): Mail {
  const voornaam = voornaamVan(naam);
  const groet = `Beste ${voornaam},`;
  const ps = psZin && psZin.trim() ? [psZin.trim()] : [];
  const regio = regioZin(doelgroep, plaats);
  const regioAlinea = regio ? [regio] : [];
  const afsluiter = "PS: liever niet? Eén woordje is genoeg, dan mail ik je niet meer.";

  switch (doelgroep) {
    case "relatietherapeuten":
      return {
        subject: `${voornaam}, mag ik stellen naar jouw praktijk verwijzen?`,
        alineas: [
          groet,
          "Soms zit er een stel tegenover me waar het gesprek na een half uur niet meer over cijfers gaat, maar over wie bepaalt, wie zwijgt, wat geld vroeger thuis betekende. Dat is jouw vak, niet het mijne, en ik ga niet doen alsof.",
          ...ps,
          "Wie ik ben: financieel coach, begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Jij zou een van de eerste relatietherapeuten zijn met wie ik zoiets afspreek; het gaat om enkele stellen per jaar, geen stroom.",
          ...regioAlinea,
          "Ik verwijs niet blind, dus ik wil weten naar wie. Stel me daarom gerust per mail de vragen die je zou stellen aan iedereen die naar je verwijst; jij bepaalt het tempo.",
          afsluiter,
        ],
      };
    case "budgetcoaches":
      return {
        subject: `${voornaam}, ik zoek een budgetcoach om naar door te verwijzen`,
        alineas: [
          groet,
          ...ps,
          "Ik ben financieel coach voor huishoudens die goed verdienen en toch elke maand krap zitten; zij melden zich bij mij via mijn site. Zodra er achterstanden, incasso's of regelingen spelen, houdt mijn werk op. Ik wil die mensen dan niet wegsturen met \"zoek maar een budgetcoach\", maar warm overdragen aan een naam die ik ken, met de context die ik al heb, zodat jij niet vanaf nul begint.",
          "Wie ik ben: dit werk begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Er zit geen vergoeding, tegenprestatie of leadconstructie aan; mijn tarieven en werkwijze staan open op mijn site.",
          ...regioAlinea,
          "Ik heb je toestemming niet nodig om je naam te noemen, maar wel je voorkeur: zit je op zulke overdrachten te wachten? Eén woordje is genoeg. Het gaat om een paar mensen per jaar, geen stroom.",
          afsluiter,
        ],
      };
    case "financieel-planners":
      return {
        subject: `${voornaam}, ik zoek een financieel planner om naar door te verwijzen`,
        alineas: [
          groet,
          ...ps,
          "Ik ben financieel coach voor huishoudens die goed verdienen en toch elke maand krap zitten; zij melden zich bij mij via mijn site. Zodra iemand na het inzicht structureel ruimte overhoudt en verder wil met vermogen, pensioen of een hypotheekvraag, houdt mijn werk op: ik geef nadrukkelijk geen product- of beleggingsadvies en heb de papieren daarvoor ook niet.",
          "Ik wil die mensen dan een naam kunnen geven die ik ken, geen adres van internet. Wie ik ben: begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Er zit geen vergoeding of tegenprestatie aan; mijn tarieven en werkwijze staan open op mijn site.",
          ...regioAlinea,
          "Ik heb je toestemming niet nodig om je naam te noemen, maar wel je voorkeur: zit je op zulke doorverwijzingen te wachten? Eén woordje is genoeg. Het gaat om enkele mensen per jaar, geen stroom.",
          afsluiter,
        ],
      };
    case "burnout-coaches":
      return {
        subject: `${voornaam}, mag ik cliënten naar jouw praktijk verwijzen?`,
        alineas: [
          groet,
          "Soms zit er iemand tegenover me bij wie het geld wel op orde komt, maar de vermoeidheid dieper blijkt te zitten dan de cijfers. Dat is jouw vak, niet het mijne, en ik ga niet doen alsof.",
          ...ps,
          "Wie ik ben: financieel coach, begonnen omdat ik zelf goed verdien en jarenlang niet begreep waarom het nooit klopte. Jij zou een van de eerste burn-out-coaches zijn met wie ik zoiets afspreek; het gaat om enkele mensen per jaar, geen stroom.",
          ...regioAlinea,
          "Ik verwijs niet blind, dus ik wil weten naar wie. Stel me daarom gerust per mail de vragen die je zou stellen aan iedereen die naar je verwijst; jij bepaalt het tempo.",
          afsluiter,
        ],
      };
  }
}

// ── FU1: geven en een vakvraag. Geen link, geen verzoek om klanten. ─────────

const FU1: Record<Doelgroep, string[]> = {
  "relatietherapeuten": [
    "Ik hoorde nog niet van je; dit is geen herinnering, eerder iets wat je misschien kunt gebruiken in een sessie. De drie patronen die ik het vaakst zie bij stellen die goed verdienen en toch elke maand spanning over geld hebben:",
    "1. Niemand heeft het overzicht. Allebei denken ze stiekem dat de ander te veel uitgeeft, en allebei kunnen ze het niet hardmaken.\n2. De vaste lasten zijn stilletjes meegegroeid met het inkomen. \"We verdienen toch goed\" klopt gevoelsmatig, maar feitelijk al jaren niet meer.\n3. Er is geen afgesproken vrij bedrag per persoon. Daardoor is elke losse uitgave een potentieel verwijt.",
    "Loop jij in een casus ooit vast op het feitelijke geldoverzicht, leg hem me dan gerust per mail voor. Kosteloos, en er staat niets tegenover.",
    "Wat doe jij eigenlijk nu als een stel op het geld blijft vastlopen?",
  ],
  "budgetcoaches": [
    "Ik hoorde nog niet van je, geen probleem. Voor het beeld, wat \"warm overdragen\" bij mij betekent: ik mail je vooraf, je krijgt de situatie zoals ik hem ken (inkomen, wat er speelt, wat er al aan cijfers ligt) en de klant weet dat jij het overneemt en waarom. Geen doorgeefluik, geen leadformulier.",
    "Eén vraag: wat wil jij vooraf weten bij zo'n overdracht? Dan richt ik het meteen goed in.",
  ],
  "financieel-planners": [
    "Ik hoorde nog niet van je, geen probleem. Voor het beeld, wat \"warm overdragen\" bij mij betekent: ik meld het vooraf, je krijgt de situatie zoals ik hem ken (inkomen, vaste lasten, wat er maandelijks overblijft en waar dat inzicht op gebaseerd is) en de klant weet dat jij het overneemt en waarom. Geen doorgeefluik, geen leadformulier.",
    "Eén vraag: wat wil jij vooraf weten bij zo'n overdracht? Dan richt ik het meteen goed in.",
  ],
  "burnout-coaches": [
    "Ik hoorde nog niet van je; dit is geen herinnering, eerder iets wat je misschien kunt gebruiken in een traject. De drie patronen die ik het vaakst zie als geldstress het herstel in de weg zit:",
    "1. De buffer is tijdens de uitval stilletjes geslonken en niemand heeft durven kijken hoe erg precies. Het niet-weten stresst meer dan het getal.\n2. Bij re-integratie of minder uren verandert het inkomen, maar de uitgaven staan nog op het oude leven.\n3. De bank-app wordt vermeden. Wat je niet ziet, blijft als diffuse dreiging op de achtergrond meedraaien.",
    "Loop jij in een traject ooit vast op het feitelijke geldoverzicht, leg hem me dan gerust per mail voor. Kosteloos, en er staat niets tegenover.",
    "Wat doe jij eigenlijk nu als geldstress het herstel van een cliënt blokkeert?",
  ],
};

// ── FU2: breakup. Cadeau of open kaart, geen huiswerk. Enige link-context. ──

const FU2: Record<Doelgroep, string[]> = {
  "relatietherapeuten": [
    "Van de drie patronen uit mijn vorige mail heb ik een A4 gemaakt dat je aan een stel kunt meegeven, desgewenst zonder mijn naam erop. Wil je het hebben? Eén woordje is genoeg, dan stuur ik het je.",
    "En mijn vraag blijft staan: mag ik jouw praktijk noemen als er bij mij een stel zit waar geld eigenlijk relatiepijn is? Vragen stellen per mail mag altijd eerst.",
  ],
  "budgetcoaches": [
    "Het aanbod blijft staan, ook zonder antwoord: zodra ik iemand tegenkom met achterstanden of schulden, noem ik liever een naam dan \"zoek maar een budgetcoach\". Wil jij die naam zijn: één woordje is genoeg.",
    "En de andere kant op, open kaart: op waarblijfthet.nl staat een gratis anonieme analyse. Zo kom ik aan mijn klanten, dus ja, daar heb ik wat aan als jij hem ooit noemt. Alleen als het jou een keer uitkomt; jij bepaalt wat bij je past.",
  ],
  "financieel-planners": [
    "Het aanbod blijft staan, ook zonder antwoord: zodra iemand bij mij structureel ruimte overhoudt en verder wil met vermogen of pensioen, noem ik liever een naam dan \"zoek maar een planner\". Wil jij die naam zijn: één woordje is genoeg.",
    "En de andere kant op, open kaart: op waarblijfthet.nl staat een gratis anonieme analyse. Zo kom ik aan mijn klanten, dus ja, daar heb ik wat aan als jij hem ooit noemt bij iemand met te weinig maandruimte voor je advies. Alleen als het jou uitkomt; jij bepaalt wat bij je past.",
  ],
  "burnout-coaches": [
    "Van de drie patronen uit mijn vorige mail heb ik een A4 gemaakt dat je aan een cliënt kunt meegeven, desgewenst zonder mijn naam erop. Wil je het hebben? Eén woordje is genoeg, dan stuur ik het je.",
    "En mijn vraag blijft staan: mag ik jouw praktijk noemen als ik merk dat de vermoeidheid dieper zit dan het geld? Vragen stellen per mail mag altijd eerst.",
  ],
};

export function followupMail(
  naam: string,
  doelgroep: Doelgroep,
  nummer: number,
  eersteSubject: string
): Mail {
  const voornaam = voornaamVan(naam);
  if (nummer === 1) {
    return {
      subject: `Re: ${eersteSubject}`,
      alineas: [`Beste ${voornaam},`, ...FU1[doelgroep]],
    };
  }
  return {
    subject: `Re: ${eersteSubject}`,
    alineas: [
      `Beste ${voornaam},`,
      "Laatste mail van mijn kant, daarna laat ik je met rust.",
      ...FU2[doelgroep],
      "Dank voor je tijd, en veel succes met je praktijk.",
    ],
  };
}
