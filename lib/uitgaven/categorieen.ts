/**
 * Categorieën en de merkenlijst waarmee boekingen worden ingedeeld.
 *
 * De merknamen hieronder zijn ook de ENIGE namen die in de samenvatting naar de server mogen
 * (zie samenvatting.ts en valideer.ts). Een tegenpartij die hier niet in staat, gaat alleen als
 * categorielabel mee. Zo kan er geen naam van een persoon of een rekeningnummer mee.
 */

export type Bak = "vast" | "nietMaandelijks" | "dagelijks";

export const CATEGORIEEN = {
  wonen: { label: "Wonen (hypotheek of huur)", bak: "vast" },
  energie: { label: "Energie en water", bak: "vast" },
  zorgverzekering: { label: "Zorgverzekering", bak: "vast" },
  verzekeringen: { label: "Overige verzekeringen", bak: "vast" },
  telecom: { label: "Internet en telefoon", bak: "vast" },
  abonnementen: { label: "Abonnementen en streaming", bak: "vast" },
  kinderen: { label: "Kinderopvang en school", bak: "vast" },
  autovast: { label: "Auto, lease en wegenbelasting", bak: "vast" },
  leningen: { label: "Leningen en aflossingen", bak: "vast" },
  sport: { label: "Sport en contributies", bak: "vast" },
  bankkosten: { label: "Bankkosten", bak: "vast" },
  belastingen: { label: "Belastingen en gemeente", bak: "nietMaandelijks" },
  vakantie: { label: "Vakantie en uitjes", bak: "nietMaandelijks" },
  boodschappen: { label: "Boodschappen", bak: "dagelijks" },
  drogist: { label: "Drogist en apotheek", bak: "dagelijks" },
  horeca: { label: "Eten buiten de deur en bezorging", bak: "dagelijks" },
  vervoer: { label: "Tanken, ov en parkeren", bak: "dagelijks" },
  kleding: { label: "Kleding", bak: "dagelijks" },
  huis: { label: "Huis, tuin en inrichting", bak: "dagelijks" },
  webwinkels: { label: "Webwinkels", bak: "dagelijks" },
  zorg: { label: "Zorgkosten", bak: "dagelijks" },
  contant: { label: "Contant opgenomen", bak: "dagelijks" },
  goededoelen: { label: "Goede doelen", bak: "dagelijks" },
  overboeking: { label: "Overige overboekingen", bak: "dagelijks" },
  overig: { label: "Overig", bak: "dagelijks" },
} as const satisfies Record<string, { label: string; bak: Bak }>;

export type CategorieId = keyof typeof CATEGORIEEN;

type Merk = { merk: string; categorie: CategorieId; termen: string[] };

/** Bekende bedrijven. `termen` worden gezocht als los woord in de genormaliseerde naam van de tegenpartij. */
export const MERKEN: Merk[] = [
  // Boodschappen
  { merk: "Albert Heijn", categorie: "boodschappen", termen: ["albert heijn", "ah to go"] },
  { merk: "Jumbo", categorie: "boodschappen", termen: ["jumbo"] },
  { merk: "Lidl", categorie: "boodschappen", termen: ["lidl"] },
  { merk: "Aldi", categorie: "boodschappen", termen: ["aldi"] },
  { merk: "Plus", categorie: "boodschappen", termen: ["plus"] },
  { merk: "Dirk", categorie: "boodschappen", termen: ["dirk van den broek", "dirk"] },
  { merk: "DekaMarkt", categorie: "boodschappen", termen: ["dekamarkt"] },
  { merk: "Coop", categorie: "boodschappen", termen: ["coop"] },
  { merk: "Spar", categorie: "boodschappen", termen: ["spar"] },
  { merk: "Vomar", categorie: "boodschappen", termen: ["vomar"] },
  { merk: "Hoogvliet", categorie: "boodschappen", termen: ["hoogvliet"] },
  { merk: "Picnic", categorie: "boodschappen", termen: ["picnic"] },
  { merk: "Crisp", categorie: "boodschappen", termen: ["crisp"] },
  { merk: "Ekoplaza", categorie: "boodschappen", termen: ["ekoplaza"] },
  // Drogist
  { merk: "Kruidvat", categorie: "drogist", termen: ["kruidvat"] },
  { merk: "Etos", categorie: "drogist", termen: ["etos"] },
  { merk: "DA", categorie: "drogist", termen: ["da drogist"] },
  { merk: "Trekpleister", categorie: "drogist", termen: ["trekpleister"] },
  // Horeca en bezorging
  { merk: "Thuisbezorgd", categorie: "horeca", termen: ["thuisbezorgd", "takeaway.com"] },
  { merk: "Uber Eats", categorie: "horeca", termen: ["uber eats"] },
  { merk: "McDonald's", categorie: "horeca", termen: ["mcdonalds", "mcdonald s", "mc donalds"] },
  { merk: "Burger King", categorie: "horeca", termen: ["burger king"] },
  { merk: "KFC", categorie: "horeca", termen: ["kfc"] },
  { merk: "Domino's", categorie: "horeca", termen: ["dominos", "domino s"] },
  { merk: "New York Pizza", categorie: "horeca", termen: ["new york pizza"] },
  { merk: "Starbucks", categorie: "horeca", termen: ["starbucks"] },
  // Vervoer
  { merk: "Shell", categorie: "vervoer", termen: ["shell"] },
  { merk: "BP", categorie: "vervoer", termen: ["bp"] },
  { merk: "Esso", categorie: "vervoer", termen: ["esso"] },
  { merk: "TotalEnergies", categorie: "vervoer", termen: ["totalenergies", "total"] },
  { merk: "Tango", categorie: "vervoer", termen: ["tango"] },
  { merk: "Tinq", categorie: "vervoer", termen: ["tinq"] },
  { merk: "Texaco", categorie: "vervoer", termen: ["texaco"] },
  { merk: "Argos", categorie: "vervoer", termen: ["argos"] },
  { merk: "NS", categorie: "vervoer", termen: ["ns groep", "ns reizigers", "nederlandse spoorwegen"] },
  { merk: "Arriva", categorie: "vervoer", termen: ["arriva"] },
  { merk: "OV-chipkaart", categorie: "vervoer", termen: ["ov chipkaart", "ov-chipkaart", "translink"] },
  { merk: "Q-Park", categorie: "vervoer", termen: ["q park", "q-park"] },
  { merk: "Yellowbrick", categorie: "vervoer", termen: ["yellowbrick"] },
  { merk: "EasyPark", categorie: "vervoer", termen: ["easypark"] },
  { merk: "Parkmobile", categorie: "vervoer", termen: ["parkmobile"] },
  // Energie en water
  { merk: "Vattenfall", categorie: "energie", termen: ["vattenfall"] },
  { merk: "Eneco", categorie: "energie", termen: ["eneco"] },
  { merk: "Essent", categorie: "energie", termen: ["essent"] },
  { merk: "Budget Energie", categorie: "energie", termen: ["budget energie"] },
  { merk: "Greenchoice", categorie: "energie", termen: ["greenchoice"] },
  { merk: "Vandebron", categorie: "energie", termen: ["vandebron"] },
  { merk: "Energiedirect", categorie: "energie", termen: ["energiedirect"] },
  { merk: "Engie", categorie: "energie", termen: ["engie"] },
  { merk: "Frank Energie", categorie: "energie", termen: ["frank energie"] },
  { merk: "Zonneplan", categorie: "energie", termen: ["zonneplan"] },
  { merk: "Brabant Water", categorie: "energie", termen: ["brabant water"] },
  { merk: "Vitens", categorie: "energie", termen: ["vitens"] },
  { merk: "Evides", categorie: "energie", termen: ["evides"] },
  { merk: "Dunea", categorie: "energie", termen: ["dunea"] },
  { merk: "PWN", categorie: "energie", termen: ["pwn"] },
  { merk: "Waternet", categorie: "energie", termen: ["waternet"] },
  { merk: "WML", categorie: "energie", termen: ["wml"] },
  { merk: "Oasen", categorie: "energie", termen: ["oasen"] },
  // Telecom
  { merk: "KPN", categorie: "telecom", termen: ["kpn"] },
  { merk: "Ziggo", categorie: "telecom", termen: ["ziggo"] },
  { merk: "Odido", categorie: "telecom", termen: ["odido", "t mobile", "t-mobile", "tele2"] },
  { merk: "Vodafone", categorie: "telecom", termen: ["vodafone"] },
  { merk: "Simyo", categorie: "telecom", termen: ["simyo"] },
  { merk: "Youfone", categorie: "telecom", termen: ["youfone"] },
  { merk: "Lebara", categorie: "telecom", termen: ["lebara"] },
  { merk: "Ben", categorie: "telecom", termen: ["ben nl"] },
  { merk: "Delta Fiber", categorie: "telecom", termen: ["delta fiber", "deltafiber"] },
  { merk: "Caiway", categorie: "telecom", termen: ["caiway"] },
  // Zorgverzekering
  { merk: "Zilveren Kruis", categorie: "zorgverzekering", termen: ["zilveren kruis"] },
  { merk: "CZ", categorie: "zorgverzekering", termen: ["cz groep", "cz zorgverzekering", "ohra zorg"] },
  { merk: "VGZ", categorie: "zorgverzekering", termen: ["vgz", "iza", "univé zorg", "unive zorg"] },
  { merk: "Menzis", categorie: "zorgverzekering", termen: ["menzis", "anderzorg"] },
  { merk: "DSW", categorie: "zorgverzekering", termen: ["dsw"] },
  { merk: "ONVZ", categorie: "zorgverzekering", termen: ["onvz"] },
  { merk: "Zorg en Zekerheid", categorie: "zorgverzekering", termen: ["zorg en zekerheid"] },
  { merk: "a.s.r. ziektekosten", categorie: "zorgverzekering", termen: ["asr ziektekosten", "a.s.r. ziektekosten", "ditzo"] },
  // Overige verzekeringen
  { merk: "Centraal Beheer", categorie: "verzekeringen", termen: ["centraal beheer"] },
  { merk: "Interpolis", categorie: "verzekeringen", termen: ["interpolis"] },
  { merk: "FBTO", categorie: "verzekeringen", termen: ["fbto"] },
  { merk: "Ohra", categorie: "verzekeringen", termen: ["ohra"] },
  { merk: "a.s.r.", categorie: "verzekeringen", termen: ["asr", "a.s.r."] },
  { merk: "Nationale-Nederlanden", categorie: "verzekeringen", termen: ["nationale nederlanden", "nationale-nederlanden"] },
  { merk: "Univé", categorie: "verzekeringen", termen: ["unive", "univé"] },
  { merk: "Allianz", categorie: "verzekeringen", termen: ["allianz"] },
  { merk: "Aegon", categorie: "verzekeringen", termen: ["aegon"] },
  { merk: "ANWB", categorie: "verzekeringen", termen: ["anwb"] },
  { merk: "InShared", categorie: "verzekeringen", termen: ["inshared"] },
  { merk: "Reaal", categorie: "verzekeringen", termen: ["reaal"] },
  // Abonnementen en streaming
  { merk: "Netflix", categorie: "abonnementen", termen: ["netflix"] },
  { merk: "Spotify", categorie: "abonnementen", termen: ["spotify"] },
  { merk: "Disney+", categorie: "abonnementen", termen: ["disney plus", "disneyplus", "disney"] },
  { merk: "Videoland", categorie: "abonnementen", termen: ["videoland"] },
  { merk: "HBO Max", categorie: "abonnementen", termen: ["hbo max", "max.com"] },
  { merk: "Amazon Prime", categorie: "abonnementen", termen: ["amazon prime", "prime video"] },
  { merk: "Apple", categorie: "abonnementen", termen: ["apple.com", "apple com bill", "itunes"] },
  { merk: "Google", categorie: "abonnementen", termen: ["google"] },
  { merk: "YouTube", categorie: "abonnementen", termen: ["youtube"] },
  { merk: "NPO Plus", categorie: "abonnementen", termen: ["npo plus"] },
  // Sport
  { merk: "Basic-Fit", categorie: "sport", termen: ["basic fit", "basic-fit"] },
  { merk: "SportCity", categorie: "sport", termen: ["sportcity"] },
  // Webwinkels en winkels
  { merk: "bol", categorie: "webwinkels", termen: ["bol.com", "bol com"] },
  { merk: "Coolblue", categorie: "webwinkels", termen: ["coolblue"] },
  { merk: "Amazon", categorie: "webwinkels", termen: ["amazon"] },
  { merk: "Zalando", categorie: "kleding", termen: ["zalando"] },
  { merk: "Wehkamp", categorie: "webwinkels", termen: ["wehkamp"] },
  { merk: "MediaMarkt", categorie: "webwinkels", termen: ["mediamarkt", "media markt"] },
  { merk: "Action", categorie: "huis", termen: ["action"] },
  { merk: "HEMA", categorie: "huis", termen: ["hema"] },
  { merk: "IKEA", categorie: "huis", termen: ["ikea"] },
  { merk: "Blokker", categorie: "huis", termen: ["blokker"] },
  { merk: "Praxis", categorie: "huis", termen: ["praxis"] },
  { merk: "Gamma", categorie: "huis", termen: ["gamma"] },
  { merk: "Karwei", categorie: "huis", termen: ["karwei"] },
  { merk: "Hornbach", categorie: "huis", termen: ["hornbach"] },
  { merk: "Intratuin", categorie: "huis", termen: ["intratuin"] },
  { merk: "H&M", categorie: "kleding", termen: ["h&m", "h m hennes", "hennes"] },
  { merk: "Zara", categorie: "kleding", termen: ["zara"] },
  { merk: "C&A", categorie: "kleding", termen: ["c&a", "c en a"] },
  { merk: "Primark", categorie: "kleding", termen: ["primark"] },
  { merk: "Decathlon", categorie: "kleding", termen: ["decathlon"] },
  // Overheid
  { merk: "Belastingdienst", categorie: "belastingen", termen: ["belastingdienst"] },
  { merk: "Gemeente", categorie: "belastingen", termen: ["gemeente", "bsgw", "belastingsamenwerking", "waterschap", "gemeentebelastingen"] },
  { merk: "CJIB", categorie: "belastingen", termen: ["cjib"] },
  { merk: "RDW", categorie: "autovast", termen: ["rdw"] },
  { merk: "DUO", categorie: "leningen", termen: ["duo", "dienst uitvoering onderwijs"] },
];

/** Woorden in de omschrijving die een categorie aangeven, als er geen merk is gevonden. */
export const TREFWOORDEN: { categorie: CategorieId; termen: string[] }[] = [
  { categorie: "wonen", termen: ["hypotheek", "huur", "vve", "servicekosten"] },
  { categorie: "kinderen", termen: ["kinderopvang", "bso", "ouderbijdrage", "gastouder", "schoolreis"] },
  { categorie: "autovast", termen: ["lease", "wegenbelasting", "motorrijtuigenbelasting"] },
  { categorie: "leningen", termen: ["lening", "krediet", "aflossing"] },
  { categorie: "verzekeringen", termen: ["verzekering", "polis"] },
  { categorie: "zorgverzekering", termen: ["zorgverzekering", "ziektekosten"] },
  { categorie: "belastingen", termen: ["aanslag", "gemeentelijke belasting", "rioolheffing", "afvalstoffenheffing"] },
  { categorie: "vakantie", termen: ["booking.com", "airbnb", "transavia", "klm", "tui", "corendon", "camping", "vakantie", "efteling"] },
  { categorie: "zorg", termen: ["apotheek", "tandarts", "fysiotherapie", "huisarts", "opticien"] },
  { categorie: "goededoelen", termen: ["kwf", "unicef", "rode kruis", "artsen zonder grenzen", "greenpeace", "wnf", "hartstichting"] },
  { categorie: "sport", termen: ["contributie", "sportvereniging", "zwemles", "voetbal"] },
  { categorie: "bankkosten", termen: ["kosten betaalpakket", "kosten basispakket", "rente roodstand"] },
];

/** Betaalproviders: hun naam is niet de winkel. */
export const BETAALPROVIDERS = ["mollie", "adyen", "buckaroo", "stripe", "multisafepay", "pay.nl", "paynl", "ingenico", "worldline", "ccv", "sumup", "tikkie"];

export function normaliseer(s: string): string {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9.&+ -]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function maakRegex(term: string): RegExp {
  const veilig = normaliseer(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp("(^|[^a-z0-9])" + veilig + "($|[^a-z0-9])");
}

const MERK_REGEX = MERKEN.map((m) => ({ merk: m, regexen: m.termen.map(maakRegex) }));
const TREFWOORD_REGEX = TREFWOORDEN.map((t) => ({ categorie: t.categorie, regexen: t.termen.map(maakRegex) }));
const PROVIDER_REGEX = BETAALPROVIDERS.map(maakRegex);

export function zoekMerk(tekst: string): Merk | null {
  const n = normaliseer(tekst);
  if (!n) return null;
  for (const m of MERK_REGEX) if (m.regexen.some((r) => r.test(n))) return m.merk;
  return null;
}

export function zoekTrefwoord(tekst: string): CategorieId | null {
  const n = normaliseer(tekst);
  if (!n) return null;
  for (const t of TREFWOORD_REGEX) if (t.regexen.some((r) => r.test(n))) return t.categorie;
  return null;
}

export function isBetaalprovider(tekst: string): boolean {
  const n = normaliseer(tekst);
  return PROVIDER_REGEX.some((r) => r.test(n));
}

/** Alle teksten die in een samenvatting mogen staan: merknamen en categorielabels. */
export const TOEGESTANE_NAMEN: ReadonlySet<string> = new Set<string>([
  ...MERKEN.map((m) => m.merk),
  ...Object.values(CATEGORIEEN).map((c) => c.label),
]);
