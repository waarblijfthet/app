import Link from "next/link";
import { rapportVoorSlug, AANTAL_ZONDER_LEK, RAPPORTEN } from "@/lib/rapporten-data";

/**
 * Content voor "schamen-niet-rondkomen-goed-inkomen" (klus D, 18-aug-2026,
 * docs/artikel-bouwprompts-batch1-18-aug-2026.md). Zwak volumesignaal,
 * gebouwd op maximale ICP-fit en een leeg veld voor de schaamtevariant. Geen
 * rekenlaag: het enige getal hier is AANTAL_ZONDER_LEK tegen RAPPORTEN.length,
 * beide een import, nooit met de hand getypt. Gratis analyse staat hier
 * primair en de Geldscan secundair, net als bij huishoudboekje-voorbeeld.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const linkStyle = { color: "#0B7A6E", textDecoration: "none" } as const;

const RAPPORT = rapportVoorSlug("stel-zonder-kinderen");

export default function SchamenNietRondkomenGoedInkomen() {
  return (
    <>
      <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>Herken je dit?</p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Je verdient goed. Je collega&apos;s zouden raar opkijken als ze wisten hoe krap het soms voelt.
          En dus zeg je er niets over, want hoe leg je uit dat je met dit salaris toch het gevoel hebt dat
          je iets fout doet?
        </p>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: het gevoel dat je iets fout doet, is niet hetzelfde als iets fout doen.{" "}
        {RAPPORT && (
          <>Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} huishoudens die ik doorrekende bleek er
          helemaal geen lek te zijn.</>
        )}{" "}
        Laat een mens je cijfers naleren voordat je jezelf nog een maand de schuld geeft.
      </p>

      <h2 className="font-display" style={h2}>Waarom een goed salaris de schaamte groter maakt</h2>
      <p className="font-body text-text-soft" style={p}>
        Bij een laag inkomen is niet rondkomen een erkend probleem, met hulp, regelingen en begrip. Bij een
        goed inkomen is er niets van dat alles. Je verwacht van jezelf dat het klopt, en als het niet klopt,
        is de eerste conclusie meestal dat jij iets verkeerd doet. Niet de vaste lasten, niet de opbouw van
        je uitgaven, maar jij. Dat maakt het extra lastig om er hardop over te beginnen, ook tegen een
        partner of vriend.
      </p>

      <h2 className="font-display" style={h2}>Wat ik in de praktijk zie</h2>
      <p className="font-body text-text-soft" style={p}>
        Van de vijf huishoudens die ik zelf heb doorgerekend, met een goed inkomen en toch krap, bleek bij{" "}
        {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} dat er niets te repareren viel. Geen enkele
        buitensporige vaste last, geen post die eruit sprong.{" "}
        {RAPPORT && (
          <>Bij een stel zonder kinderen was de conclusie letterlijk: &ldquo;{RAPPORT.uitkomstKop}.&rdquo;
          Hun uitgaven pasten simpelweg niet bij het spaardoel dat ze zichzelf hadden gesteld.{" "}
          <Link href={`/rapporten/${RAPPORT.slug}`} style={linkStyle} className="hover:underline">
            Lees hun rapport
          </Link>
          .</>
        )}
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is een kleine steekproef, vijf huishoudens, geen landelijk cijfer. Maar het laat wel zien dat
        &ldquo;geen lek vinden&rdquo; een net zo reëel uitkomst is als &ldquo;wel een lek vinden&rdquo;. Het
        gevoel van krapte zegt dus niet vooraf welke van de twee het bij jou wordt.
      </p>

      <h2 className="font-display" style={h2}>Wat dit artikel niet doet</h2>
      <p className="font-body text-text-soft" style={p}>
        Geen affirmaties, geen &ldquo;je bent niet de enige&rdquo; zonder cijfer erachter, en geen uitspraak
        over hoe vaak dit in Nederland voorkomt: de {AANTAL_ZONDER_LEK} op {RAPPORTEN.length} hierboven gaat
        over de huishoudens die ik zelf doorrekende, niet over het land. Wil je weten wat een goed inkomen
        met het gevoel van geldstress doet, dat lees je in{" "}
        <Link href="/inzichten/goed-salaris-toch-geldstress" style={linkStyle} className="hover:underline">
          goed salaris, toch geldstress
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Wat wél helpt</h2>
      <p className="font-body text-text-soft" style={p}>
        Het gevoel van krapte laat zich niet wegredeneren, maar wel narekenen. Zolang je het zelf bijhoudt
        blijf je vergelijken met een vaag beeld van &ldquo;normaal&rdquo; in plaats van met je eigen
        situatie, zie ook{" "}
        <Link href="/inzichten/piekeren-over-geld" style={linkStyle} className="hover:underline">
          piekeren over geld
        </Link>{" "}
        en{" "}
        <Link href="/inzichten/waarom-lijkt-iedereen-rijker" style={linkStyle} className="hover:underline">
          waarom iedereen rijker lijkt
        </Link>
        . De gratis analyse zet je eigen uitgaven naast vergelijkbare huishoudens, zonder dat er meteen een
        oordeel bij hoort.
      </p>

      <div style={{ backgroundColor: "#E7F1EE", borderRadius: "16px", padding: "1.5rem", marginTop: "2rem", marginBottom: "2.5rem" }}>
        <p className="font-body font-light text-text-soft" style={{ marginBottom: "1rem" }}>
          Wil je weten of er bij jou wél iets te repareren valt, of dat het net als bij {AANTAL_ZONDER_LEK}{" "}
          van de {RAPPORTEN.length} huishoudens die ik doorrekende meevalt? Begin met de gratis analyse.
          Wil je dat ik er zelf naar kijk en opschrijf wat opvalt, dat kan bij de Geldscan.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/analyse" className="btn-primary">Doe de gratis analyse &rarr;</Link>
          <Link href="/geldscan" style={{ ...linkStyle, border: "1.5px solid #16211F", color: "#16211F", borderRadius: "4px", padding: "0.75rem 1.25rem" }} className="inline-flex items-center justify-center font-body text-sm font-medium">
            Liever dat ik meekijk? Geldscan, €49
          </Link>
        </div>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Vergelijkingsbedragen op basis van de vijf huishoudens die ik zelf heb doorgerekend, zie{" "}
        <Link href="/rapporten" style={linkStyle} className="hover:underline">Rapporten</Link>.
      </p>
    </>
  );
}
