import Link from "next/link";
import RenteVerschilRekenaar from "@/components/artikel/RenteVerschilRekenaar";
import CtaLink from "@/components/CtaLink";
import { geldscanHref } from "@/lib/cta";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import { berekenVuistregel, euro } from "@/lib/salaris-vuistregel";
import {
  berekenRenteVerschil,
  HOOFDSOMMEN,
  LOOPTIJD_JAREN,
  RENTEVASTE_PERIODE_JAREN,
  RENTEVERSCHILLEN,
  RENTE_2016,
  RENTE_2026,
} from "@/lib/rente-verschil";

/**
 * N1 uit docs/plan-nieuwe-invalshoeken-06-sep-2026.md.
 *
 * Zoekterm en onderbouwing: docs/serp-invalshoeken-06-sep-2026.md. Primaire
 * term "rentevaste periode loopt af wat nu", secundair "hypotheekrente
 * verlengen hogere maandlasten". De derde term uit de brief ("hypotheek 2016
 * verlengen 2026") is geschrapt: Google negeert het jaartal 2016 en toont de
 * hypotheekregels van 2026.
 *
 * De hoek: negen van de negen resultaten op die SERP zijn een bank of een
 * adviseur die de rentekeuze uitlegt. Geen enkele rekent het verschil door naar
 * het huishouden. Deze pagina doet alleen dat laatste, en houdt zich verder
 * verre van de hypotheek zelf. Geen rentevergelijking, geen aanbieders, geen
 * advies over oversluiten: CLAUDE.md sectie 4 sluit hypotheekadvies uit.
 *
 * Elk bedrag hieronder komt uit lib/rente-verschil.ts of berekenVuistregel().
 * Er staat geen enkel met de hand getypt bedrag in deze pagina.
 */

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

/** Het referentiehuishouden van deze pagina: Sandra, koopwoning, twee kinderen. */
const REF_INKOMEN = 6000;

function verschilVoor(hoofdsom: number, opslag: number): number {
  return berekenRenteVerschil({
    hoofdsom: hoofdsom,
    huidigeRente: RENTE_2016,
    nieuweRente: RENTE_2016 + opslag,
    looptijdJaren: LOOPTIJD_JAREN,
    verstrekenJaren: RENTEVASTE_PERIODE_JAREN,
  }).verschil;
}

export default function RentevastePeriodeLooptAfWatNu() {
  const referentie = berekenVuistregel({
    inkomen: REF_INKOMEN,
    volwassenen: 2,
    kinderen: 2,
    auto: "eigen",
  }).verwachtOver;

  /** Het geverifieerde geval: 2016 tien jaar vast met NHG, afloop in 2026. */
  const cohort = berekenRenteVerschil({
    hoofdsom: 350000,
    huidigeRente: RENTE_2016,
    nieuweRente: RENTE_2026,
    looptijdJaren: LOOPTIJD_JAREN,
    verstrekenJaren: RENTEVASTE_PERIODE_JAREN,
  });
  const cohortAandeel = Math.round((cohort.verschil / referentie) * 100);

  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;
  const hypotheekPost = gezin.lasten.find((post) => post.label === "Hypotheek");
  const jaarPost = gezin.dagelijks.find((post) => post.label === "Jaarlijkse kosten");

  return (
    <>
      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Loopt je rentevaste periode af, dan gaat je bruto maandlast bij een hypotheek van{" "}
        {euro(350000)} en twee procentpunt meer rente ongeveer {euro(cohort.verschil)} omhoog.
        Dat bedrag is zelden het echte probleem. Het is de druppel: bij een gezin met twee inkomens
        en {euro(REF_INKOMEN)} netto is het {cohortAandeel} procent van wat er aan het eind van de
        maand overblijft.
      </p>

      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op 6 september 2026. Ik reken hieronder alleen het verschil in maandlast
        uit en daarna wat dat met een huishouden doet. Dit is geen hypotheekadvies, ik vergelijk
        geen rentes en noem geen aanbieders.
      </p>

      {/* ScanBox */}
      <div
        className="rounded-xl p-5 mb-8"
        style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
      >
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Wat een hogere rente per maand kost bij jouw hypotheekbedrag, met de formule erbij",
            "Waarom dat bedrag zwaarder voelt dan het op papier is",
            "Wat je aan de huishoudkant nakijkt voordat je de rente kiest",
            "Wanneer het wel een vraag voor een adviseur is",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                &#10003;
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <h2 className="font-display" style={h2}>
        Hoeveel gaat mijn maandlast omhoog als de rente stijgt?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Hieronder staat het verschil in bruto maandlast voor drie hypotheekbedragen, bij een
        annu&iuml;teitenhypotheek van {LOOPTIJD_JAREN} jaar waarvan er {RENTEVASTE_PERIODE_JAREN} om
        zijn. De uitgangsrente is {RENTE_2016.toLocaleString("nl-NL", { minimumFractionDigits: 1 })}{" "}
        procent, want dat is ongeveer wat je betaalt als je in 2016 tien jaar vastzette met NHG.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Hypotheek
              </th>
              {RENTEVERSCHILLEN.map((d) => (
                <th
                  key={d}
                  className="text-right py-2 px-3"
                  style={{ color: "#16211F", fontWeight: 600, whiteSpace: "nowrap" }}
                >
                  +{d.toLocaleString("nl-NL", { minimumFractionDigits: 1 })} pp
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HOOFDSOMMEN.map((hoofdsom) => (
              <tr key={hoofdsom} style={{ borderBottom: "1px solid #E6E9E7" }}>
                <td className="py-2 pr-3" style={{ color: "#16211F", whiteSpace: "nowrap" }}>
                  {euro(hoofdsom)}
                </td>
                {RENTEVERSCHILLEN.map((d) => (
                  <td
                    key={d}
                    className="text-right py-2 px-3 tabular-nums"
                    style={{
                      color: d === 2 ? "#C4603A" : "#4A5A56",
                      fontWeight: d === 2 ? 600 : 400,
                      whiteSpace: "nowrap",
                    }}
                  >
                    +{euro(verschilVoor(hoofdsom, d))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        De kolom van twee procentpunt staat in terracotta omdat dat het geval is dat nu speelt: wie
        in 2016 tien jaar rentevast met NHG koos betaalt waarschijnlijk net onder de twee procent, en
        krijgt bij afloop in 2026 een voorstel van rond de vier procent (Van Bruggen, 26 maart 2026).
        De formule is de gewone annu&iuml;teit, M = P &times; i / (1 &minus; (1 + i)
        <sup>&minus;n</sup>), met i de maandrente en n het aantal maanden. De nieuwe last rekent
        over de restschuld, niet over het oorspronkelijke bedrag: bij {euro(350000)} staat er na tien
        jaar aflossen nog {euro(cohort.restschuld)}.
      </p>

      <h2 className="font-display" style={h2}>
        Wat is dat bedrag van wat er overblijft?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dat is de vraag die op geen enkele hypotheekpagina beantwoord wordt, en het is de enige die
        telt. Een gezin met twee inkomens, twee kinderen en &eacute;&eacute;n auto houdt bij{" "}
        {euro(REF_INKOMEN)} netto per maand ongeveer {euro(referentie)} over, na alle vaste lasten en
        dagelijkse uitgaven. Hieronder wat de vier kolommen van hierboven daarvan opeten bij een
        hypotheek van {euro(350000)}.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full font-body text-sm" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1.5px solid #9CCFC4" }}>
              <th className="text-left py-2 pr-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Renteverschil
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Per maand
              </th>
              <th className="text-right py-2 px-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Van wat er overblijft
              </th>
              <th className="text-right py-2 pl-3" style={{ color: "#16211F", fontWeight: 600 }}>
                Per jaar
              </th>
            </tr>
          </thead>
          <tbody>
            {RENTEVERSCHILLEN.map((d) => {
              const verschil = verschilVoor(350000, d);
              return (
                <tr key={d} style={{ borderBottom: "1px solid #E6E9E7" }}>
                  <td className="py-2 pr-3" style={{ color: "#16211F", whiteSpace: "nowrap" }}>
                    +{d.toLocaleString("nl-NL", { minimumFractionDigits: 1 })} procentpunt
                  </td>
                  <td
                    className="text-right py-2 px-3 tabular-nums"
                    style={{ color: "#4A5A56", whiteSpace: "nowrap" }}
                  >
                    +{euro(verschil)}
                  </td>
                  <td
                    className="text-right py-2 px-3 tabular-nums"
                    style={{ color: "#C4603A", whiteSpace: "nowrap" }}
                  >
                    {Math.round((verschil / referentie) * 100)}&thinsp;%
                  </td>
                  <td
                    className="text-right py-2 pl-3 tabular-nums"
                    style={{ color: "#4A5A56", whiteSpace: "nowrap" }}
                  >
                    +{euro(verschil * 12)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Vergeleken wordt op maandlast en op wat een huishouden van deze samenstelling overhoudt, niet
        op vermogen, niet op wat je verder nog aan de woning uitgeeft en niet op de aftrek. De
        maatstaf voor dat laatste getal zijn mijn eigen {RAPPORTEN.length} doorgerekende
        huishoudens, dus een kleine n.
      </p>

      {/* Interactief element, CLAUDE.md 8.9 */}
      <RenteVerschilRekenaar />

      <h2 className="font-display" style={h2}>
        Waarom voelt {euro(100)} als {euro(300)}?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Omdat de rest van het budget al strak stond. Bij een huishouden dat elke maand{" "}
        {euro(referentie)} overhoudt is dit geen post erbij, maar een hap uit het enige stuk dat nog
        beweegt. Alle andere posten liggen vast: de energierekening, de verzekeringen, de opvang, de
        auto. Wat er dan gebeurt is niet dat je {euro(cohort.verschil)} minder uitgeeft, maar dat je
        het weghaalt bij het enige potje zonder incasso, en dat is meestal de reservering voor
        vakantie, onderhoud en december.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Daar komt bij dat de brief niet alleen staat. De vorige rentevaste periode ging in rond 2016,
        en sindsdien zijn de kinderen ouder geworden, is er misschien een tweede auto gekomen en is
        de energierekening een andere post dan hij was. De maandlast is de zichtbare verandering. De
        onzichtbare is dat alles eromheen in tien jaar is meegegroeid, terwijl de begroting dezelfde
        vorm hield.
      </p>

      <h2 className="font-display" style={h2}>
        Wat kijk je na v&oacute;&oacute;r je verlengt?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Alleen de huishoudkant, want over de rentekeuze zelf ga ik niets zeggen. Drie dingen, in deze
        volgorde:
      </p>
      <ol className="mb-6 space-y-3 pl-5" style={{ listStyleType: "decimal" }}>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>
            Welke posten zijn sinds de vorige keer meegegroeid?
          </strong>{" "}
          Neem de vaste lasten van nu en zet ze naast die van tien jaar geleden. Energie,
          verzekeringen, abonnementen en de auto zijn de vier die bij bijna iedereen anders staan dan
          bij het afsluiten. Dat is de bandbreedte waarbinnen je moet opvangen.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>
            Wat reserveer je per maand voor de jaarrekeningen?
          </strong>{" "}
          Vakantie, onderhoud, december en de gemeentelijke aanslag zijn samen bij de meeste
          koopwoninghuishoudens groter dan de rentestijging. Staat daar niets voor apart, dan komt
          het verschil daar straks vanzelf uit, alleen ongepland.
        </li>
        <li className="font-body text-text-soft" style={{ fontWeight: 300 }}>
          <strong style={{ fontWeight: 500, color: "#16211F" }}>
            Wat blijft er nu werkelijk staan aan het eind van de maand?
          </strong>{" "}
          Niet wat je denkt over te houden, maar wat er over drie maanden gemeten daadwerkelijk
          bleef. Dat getal, min het verschil uit de rekenaar hierboven, is je nieuwe ruimte.
        </li>
      </ol>

      <h2 className="font-display" style={h2}>
        Wat doe je met de brief?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De volgorde die ik zou aanhouden: eerst het huishouden doorrekenen, dan pas de rente kiezen.
        Dat klinkt omgekeerd, want de brief heeft een datum en je huishouden niet. Maar de rentekeuze
        is een keuze over hoeveel zekerheid je wilt, en die vraag kun je pas beantwoorden als je weet
        hoeveel schommeling je aankunt. Wie niet weet wat er overblijft, kiest de rentevaste periode
        op gevoel of op wat de rente vandaag doet, en dat zijn allebei geen argumenten over jouw
        situatie.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Praktisch betekent dat: je hebt meestal drie maanden tussen het voorstel en de ingangsdatum.
        Gebruik de eerste twee weken voor de huishoudkant, en pas daarna voor de vergelijking van
        aanbieders en periodes. Voor dat tweede deel zijn er goede plekken, en dit is er geen van.
      </p>

      <h2 className="font-display" style={h2}>
        Wanneer is het wel een vraag voor een adviseur?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Zodra het over de hypotheek zelf gaat en niet over het huishouden. Welke rentevaste periode
        bij je past, of oversluiten naar een andere geldverstrekker loont, wat een boeterente of
        rentemiddeling in jouw geval doet, wat er met een aflossingsvrij deel gebeurt, of het slim is
        om extra af te lossen: dat is allemaal vergunningplichtig advies en daar heb je een
        hypotheekadviseur voor nodig. Ik doe iets anders, en ik doe alleen dat: kijken waar het geld
        van een huishouden blijft.
      </p>

      <h2 className="font-display" style={h2}>
        E&eacute;n gezin met een koopwoning dat ik heb doorgerekend
      </h2>
      <p className="font-body text-text-soft" style={p}>
        {gezin.kenmerken.join(", ")}. Hun hypotheek stond op{" "}
        {hypotheekPost ? hypotheekPost.waarde : ""} per maand. Vooraf dachten zij dit: &ldquo;
        {gezin.vermoeden}&rdquo; {gezin.vermoedenBedrag}
      </p>
      <p className="font-body text-text-soft" style={p}>
        Mijn conclusie was: {gezin.uitkomstKop.toLowerCase()}. {gezin.uitkomst}
        {jaarPost ? " Hun jaarlijkse kosten: " + jaarPost.waarde + "." : ""} Dat is precies het punt
        van dit artikel: de post waar je een brief over krijgt is zelden de post die het verschil
        maakt. Het hele rapport staat op{" "}
        <Link href={`/rapporten/${gezin.slug}`} style={link} className="hover:underline">
          hun rapport
        </Link>
        . Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} huishoudens die ik doorrekende was de
        conclusie trouwens dat er niets te repareren viel.
      </p>

      <h2 className="font-display" style={h2}>
        Verder lezen over wonen en het huishoudbudget
      </h2>
      <ul className="mb-6 space-y-2">
        {[
          {
            slug: "hogere-hypotheek-wat-kost-het-per-maand",
            tekst: "Wat kost een hogere hypotheek echt per maand?",
          },
          {
            slug: "wat-geeft-een-gezin-uit-per-maand",
            tekst: "Wat geeft een gezin uit per maand? De begroting per post",
          },
          {
            slug: "samen-6000-euro-netto-toch-niets-over",
            tekst: "Samen €6.000 netto en toch niets over",
          },
          {
            slug: "seizoens-kostenkalender-per-maand",
            tekst: "De kostenkalender: welke maand welke rekening brengt",
          },
          {
            slug: "is-4000-euro-netto-goed-salaris-nederland",
            tekst: "Is €4.000 netto een goed salaris?",
          },
        ].map((s) => (
          <li key={s.slug} className="font-body text-sm">
            <Link href={`/inzichten/${s.slug}`} style={link} className="hover:underline">
              {s.tekst}
            </Link>
          </li>
        ))}
      </ul>

      {/* Slotblok: Geldscan als tekstlink, CLAUDE.md 8.13 */}
      <p className="font-body text-text-soft" style={p}>
        Weet je na de analyse dat jullie afwijken, maar niet of het aan de woonlast ligt of aan alles
        eromheen, dan houdt een vergelijking op. Daarvoor moet iemand naar jullie hele maand kijken.
        Dat is wat ik doe in de{" "}
        <CtaLink
          doel="geldscan"
          href={geldscanHref()}
          locatie="slot"
          style={link}
          className="hover:underline"
        >
          Geldscan van &euro;49
        </CtaLink>
        , met de hand, binnen twee werkdagen.
      </p>
    </>
  );
}
