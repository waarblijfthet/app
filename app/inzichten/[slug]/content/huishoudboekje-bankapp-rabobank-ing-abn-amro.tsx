import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import CtaLink from "@/components/CtaLink";
import { NAKIJKEN_ROUTE } from "@/lib/cta";
import { PAKKET_INFO } from "@/lib/aanbod-content";
import { RAPPORTEN } from "@/lib/rapporten-data";
import { bereikJaarkostenPerMaand } from "@/lib/icp-bronnen";
import { euro } from "@/lib/salaris-vuistregel";
import { BANKAPP_BRONNEN, BANKAPP_BRONNEN_DATUM } from "@/lib/bankapp-bronnen";

/**
 * Nieuw 6-nov-2026. Search Console (3 maanden): "huishoudboekje rabobank" en
 * "rabobank huishoudboekje" samen ruim 70 vertoningen op positie 10,
 * "rabobank spaarpotje aanmaken" 47 op positie 14, zonder eigen pagina.
 * Google-autocomplete: "potjes maken rabobank", "potjes maken abn amro",
 * "budget app ing", "geen overzicht rabobank app". Wie dit zoekt, heeft zijn
 * overzicht al in de bankapp: spoor B, laat het nakijken
 * (docs/plan-positionering-aanbod-05-nov-2026.md).
 *
 * Elk feit over een bank komt van de eigen site van die bank, geopend op
 * BANKAPP_BRONNEN_DATUM (lib/bankapp-bronnen.ts). Bankapps veranderen: bij
 * twijfel opnieuw openen en de datum bijwerken.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function Bron({ sleutel, tekst }: { sleutel: keyof typeof BANKAPP_BRONNEN; tekst: string }) {
  return (
    <a href={BANKAPP_BRONNEN[sleutel].url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
      {tekst}
    </a>
  );
}

export default function HuishoudboekjeBankapp() {
  const bereik = bereikJaarkostenPerMaand();
  return (
    <>
      <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Je bankapp zet je uitgaven al netjes in categorieën. Toch weet je aan het eind van de maand niet goed waar
          het geld gebleven is.
        </p>
      </div>

      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Waar het huishoudboekje in de app van Rabobank, ING en ABN AMRO zit",
            "Hoe je bij elke bank potjes maakt, en hoeveel",
            "Wat je bankapp niet laat zien, en hoe je dat oplost met één potje",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: de apps van Rabobank, ING en ABN AMRO zetten je uitgaven vanzelf in categorieën, laten je per
        categorie een budget instellen en hebben potjes met een doelbedrag. Wat ze niet doen, is uitrekenen hoeveel
        je elke maand opzij moet zetten voor uitgaven die één keer per jaar komen.
      </p>

      <h2 className="font-display" style={h2}>Waar zit het huishoudboekje in je bankapp?</h2>
      <p className="font-body text-text-soft" style={p}>
        Bij alle drie heet het Inzicht. Je ziet per categorie wat je uitgaf, per maand of per jaar, en je kunt per
        categorie een budget instellen.
      </p>
      <EenvoudigeTabel
        koppen={["Bank", "Waar in de app", "Wat je kunt"]}
        rijen={[
          ["Rabobank", "Inzicht, en daarin Budgets", "Budget per categorie per maand, met een melding als je eroverheen gaat. 25 maanden terugkijken."],
          ["ING", "Inzicht, eerst aanzetten", "Budget per categorie per maand. Dit jaar en de vier jaar ervoor terugkijken."],
          ["ABN AMRO", "Inzicht", "Budget met een eigen bedrag, periode en categorie. Tot 30 dagen vooruitkijken."],
        ]}
        bijschrift={`Bron: de sites van de drie banken, geopend op ${BANKAPP_BRONNEN_DATUM}.`}
      />

      <p className="font-body text-text-soft" style={p}>
        <strong style={{ fontWeight: 500, color: "#16211F" }}>Rabobank.</strong> Ga in de Rabo App naar Inzicht, dan
        Budgets en de plus. Kies een categorie en je maandbudget. Je maand hoeft niet op de 1e te beginnen: je kiest een
        dag die past bij je salaris. Staat een betaling in de verkeerde categorie, dan pas je die zelf aan. Een eigen
        categorie maken kan niet (<Bron sleutel="raboInzicht" tekst="Rabobank, veelgestelde vragen Inzicht" />). Los
        daarvan biedt de Rabobank een gratis huishoudboekje in Excel aan, dat je zelf invult (
        <Bron sleutel="raboExcel" tekst="Rabobank, huishoudboekje downloaden" />
        ).
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ fontWeight: 500, color: "#16211F" }}>ING.</strong> Inzicht staat niet vanzelf aan. In de ING
        App ga je naar Service, dan Je app-instellingen en Instellingen privacy, en daar geef je toestemming. Daarna
        zet ING je betalingen in categorieën. Een verkeerde categorie pas je aan, en je kunt zeggen dat soortgelijke
        betalingen voortaan ook daar horen. Eigen categorieën maken kan niet (
        <Bron sleutel="ingInzicht" tekst="ING, Inzicht" />
        ). Onder Inzicht stel je ook Budgetten in. Daarbij zie je wat je de afgelopen drie maanden aan die categorie
        uitgaf (<Bron sleutel="ingBudgetten" tekst="ING, Budgetten" />).
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ fontWeight: 500, color: "#16211F" }}>ABN AMRO.</strong> Inzicht zet je betalingen vanzelf in
        categorieën. Zet je er zelf een in een andere categorie, dan leert de app daarvan. Je kunt de maand laten
        beginnen op de dag dat je salaris binnenkomt, en met Voorspellingen kijk je tot 30 dagen vooruit (
        <Bron sleutel="abnInzicht" tekst="ABN AMRO, inzicht met de app" />
        ).
      </p>

      <h2 className="font-display" style={h2}>Potjes maken in je bankapp</h2>
      <p className="font-body text-text-soft" style={p}>
        Een budget in Inzicht verplaatst geen geld. Het laat alleen zien wat je uitgaf tegenover wat je wilde uitgeven.
        Een potje is anders: daar zet je echt geld in. Zo heten ze per bank:
      </p>
      <EenvoudigeTabel
        koppen={["Bank", "Naam en aantal", "Hoe het werkt"]}
        rijen={[
          ["Rabobank", "Spaarpotjes, tot 20", "Potjes binnen je Rabo SpaarRekening, elk met een doelbedrag en einddatum als je wilt. Geld zonder doel heet vrij spaargeld."],
          ["ING", "Spaardoelen, tot 10", "Op je Oranje Spaarrekening, elk met een eigen naam, doelbedrag en streefdatum."],
          ["ABN AMRO", "Spaardoelen, tot 10", "Per potje open je een Direct Sparen-rekening, zonder extra kosten, en stel je een doelbedrag in."],
        ]}
        bijschrift={`Bron: de sites van de drie banken, geopend op ${BANKAPP_BRONNEN_DATUM}.`}
      />
      <p className="font-body text-text-soft" style={p}>
        Bronnen: <Bron sleutel="raboPotjes" tekst="Rabobank, spaarpotjes" />,{" "}
        <Bron sleutel="ingSpaardoelen" tekst="ING, Spaardoelen" /> en{" "}
        <Bron sleutel="abnSpaardoelen" tekst="ABN AMRO, spaardoelen" />. Alle drie laten je ook automatisch geld
        overmaken: bij de Rabobank met een periodieke overboeking of Slimme Overboekingen, bij ING en ABN AMRO met
        Automatisch Sparen. Zet die overboeking op de dag na je salaris. Dan staat het geld in het potje voordat je het
        kunt uitgeven.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Hoeveel potjes je nodig hebt en wat erin moet, lees je in{" "}
        <Link href="/inzichten/potjesmethode-gezin-hoe-werkt-het" style={link} className="hover:underline">
          de potjesmethode voor gezinnen
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Wat je bankapp niet laat zien</h2>
      <p className="font-body text-text-soft" style={p}>
        Inzicht kijkt achteruit. Het laat zien wat er de afgelopen maanden uitging, per categorie. Uitgaven die één
        keer per jaar komen, zoals de vakantie, een verzekering die je per jaar betaalt of de verjaardagen in december,
        vallen in één maand. Die maand ziet er slecht uit, de andere maanden zien er goed uit, en je weet niet hoeveel je
        elke maand opzij had moeten zetten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is geen klein bedrag. Bij de {RAPPORTEN.length} huishoudens van wie ik een rapport schreef ging er{" "}
        {euro(bereik.laagste)} tot {euro(bereik.hoogste)} per maand naar zulke jaaruitgaven.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De oplossing is één potje: jaaruitgaven. Tel op wat je per jaar uitgeeft aan dingen die niet elke maand komen,
        deel door twaalf, en zet dat bedrag elke maand automatisch in dat potje. Hoe je dat bedrag uitrekent, staat in{" "}
        <Link href="/inzichten/jaarlijkse-kosten-reserveren" style={link} className="hover:underline">
          jaarlijkse kosten reserveren
        </Link>
        . Wil je het in een sheet bijhouden, dan heeft{" "}
        <Link href="/inzichten/huishoudboekje-voorbeeld" style={link} className="hover:underline">
          mijn gratis huishoudboekje in Excel
        </Link>{" "}
        er een apart tabblad voor.
      </p>

      <h2 className="font-display" style={h2}>Staat je overzicht al in de app?</h2>
      <p className="font-body text-text-soft" style={p}>
        Dan heb je meer dan je denkt. Inzicht downloaden kan bij de Rabobank en ING niet, maar schermafbeeldingen
        maken wel. Drie maanden per categorie is genoeg om mee te werken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je dat iemand meekijkt? Stuur die schermafbeeldingen op voor de Geldscan. Ik kijk wat klopt en wat ontbreekt,
        en reken uit hoeveel er elke maand in elk potje moet.{" "}
        <CtaLink doel="geldscan" href={NAKIJKEN_ROUTE} locatie="bankapp-artikel" style={link} className="font-medium hover:underline">
          Zo werkt het nakijken, {PAKKET_INFO.geldscan.prijs} →
        </CtaLink>
      </p>
    </>
  );
}
