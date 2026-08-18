import Link from "next/link";
import TweeHuishoudensVergelijker from "@/components/artikel/TweeHuishoudensVergelijker";
import { rapportVoorSlug } from "@/lib/rapporten-data";

/**
 * Content voor "scheiden-goed-inkomen-toch-niks-over" (klus A, 18-aug-2026,
 * docs/artikel-bouwprompts-batch1-18-aug-2026.md). Alle bedragen komen uit
 * TweeHuishoudensVergelijker en dus uit lib/salaris-vuistregel.ts, geen enkel
 * getal hieronder is met de hand getypt.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const linkStyle = { color: "#0B7A6E", textDecoration: "none" } as const;

const RAPPORT = rapportVoorSlug("alleenstaande-ouder-twee-kinderen");

export default function ScheidenGoedInkomenTochNiksOver() {
  return (
    <>
      <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>Herken je dit?</p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Vóór de scheiding hield je samen iets over. Erna verdiende je ongeveer hetzelfde deel van het
          gezamenlijke inkomen, en toch schiet er elke maand minder over dan de rekensom zou moeten geven.
        </p>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: twee huishoudens kosten meer dan één, en dat komt niet door de leuke dingen. Het komt
        door de vaste lasten die na de scheiding gewoon twee keer opnieuw beginnen. Zet hieronder je eigen
        inkomen en aantal kinderen, en zie wat er bij een huishouden als het jouwe verandert.
      </p>

      <TweeHuishoudensVergelijker />

      <h2 className="font-display" style={h2}>Wat er niet verandert, ongeacht hoe je het inkomen verdeelt</h2>
      <p className="font-body text-text-soft" style={p}>
        Schuif in de rekenaar hierboven de verdeling van het inkomen tussen de twee huishoudens, en let op
        het bedrag dat verdwijnt. Dat bedrag blijft gelijk. Dat is geen toeval: de posten die na een
        scheiding twee keer gaan staan, energie, internet, gemeentelijke lasten, abonnementen en de
        overige verzekeringen, gelden per huishouden en niet per hoofd. Ze staan er straks voor beide
        huishoudens even hard, onafhankelijk van wie welk deel van het inkomen krijgt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Ook boodschappen worden duurder in de optelsom: twee losse huishoudens eten allebei vanaf een eigen
        basisbedrag, ook als je de kinderen er niet dubbel bij rekent. En wie na de scheiding zelf moet
        blijven rijden, betaalt de vervoerspost voor het eerst twee keer in plaats van één keer voor het
        hele gezin.
      </p>

      <h2 className="font-display" style={h2}>De verdeling bepaalt niet wat verdwijnt, maar wie het voelt</h2>
      <p className="font-body text-text-soft" style={p}>
        Wat de verdeling van het inkomen wél verandert, is niet het totale gat maar wie erin valt. Schuif
        de verdeling in de rekenaar naar een groter aandeel voor de ouder zonder kinderen, en het huishouden
        met de kinderen kan negatief uitkomen terwijl de ander overhoudt. Dat is geen rekenfout, dat is
        precies waarom een verdeling die op papier logisch leek, in de praktijk voor de ene ouder toch
        krap kan zijn en voor de andere niet.
      </p>

      {RAPPORT && (
        <div className="rounded-xl border p-4 my-6" style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}>
          <p className="font-body text-sm" style={{ color: "#16211F" }}>
            <strong>Uit de praktijk.</strong> Bij een alleenstaande ouder met twee kinderen die ik doorrekende,
            de kinderen wonen 80 procent van de tijd bij haar, was de eigen inschatting vooraf: &ldquo;
            {RAPPORT.vermoedenBedrag}&rdquo; Mijn conclusie na haar rapport: &ldquo;{RAPPORT.uitkomstKop}.&rdquo;{" "}
            <Link href={`/rapporten/${RAPPORT.slug}`} style={linkStyle} className="hover:underline">Lees haar rapport</Link>.
          </p>
        </div>
      )}

      <h2 className="font-display" style={h2}>Wat deze rekensom niet meeneemt</h2>
      <p className="font-body text-text-soft" style={p}>
        De vuistregel hierboven kent geen kinderalimentatie en geen kinderopvangtoeslag. Beide kunnen het
        beeld voor jouw situatie flink veranderen, en beide zijn precies het soort maatwerk waar een
        vuistregel niet aan kan en een rapport wel naar kijkt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat er in dit artikel ook niet staat: hoe je de bezittingen of het pensioen verdeelt, en of je een
        advocaat of mediator nodig hebt. Dat is het terrein van{" "}
        <Link href="/inzichten/kosten-verdelen-samenwonen-ongelijk-inkomen" style={linkStyle} className="hover:underline">
          Uitelkaar.nl, Nibud en een scheidingsplanner
        </Link>
        , niet van deze site. Hier gaat het alleen over het budget dat overblijft nadat de verdeling al is
        afgesproken.
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Woon je (nog) samen en verdeel je de kosten ongelijk naar inkomen, lees dan eerst{" "}
        <Link href="/inzichten/kosten-verdelen-samenwonen-ongelijk-inkomen" style={linkStyle} className="hover:underline">
          kosten verdelen bij een ongelijk inkomen
        </Link>
        . Ga je er alleen voor staan, dan geeft{" "}
        <Link href="/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026" style={linkStyle} className="hover:underline">
          kosten levensonderhoud als alleenstaande ouder
        </Link>{" "}
        de posten waar je als één inkomen mee te maken krijgt.
      </p>

      <div style={{ backgroundColor: "#E7F1EE", borderRadius: "16px", padding: "1.5rem", marginTop: "2rem", marginBottom: "2.5rem" }}>
        <p className="font-body font-light text-text-soft" style={{ marginBottom: "1rem" }}>
          Wil je weten hoe het bij jouw twee huishoudens precies zit? Bij de geldscan kijk ik persoonlijk naar
          je cijfers en schrijf ik je een rapport met de drie dingen die het meest opvallen, en met wat er
          juist niet uit de toon valt.
        </p>
        <Link href="/geldscan?situatie=alleenstaande-ouder" className="btn-primary">Zie wat je krijgt voor €49 &rarr;</Link>
      </div>
    </>
  );
}
