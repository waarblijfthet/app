import Link from "next/link";
import { WerkelijkeVerdeling } from "@/components/artikel/WerkelijkeVerdeling";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function Is4000EuroNettoGoedSalaris() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Dat €4.000 netto je in de top 25% plaatst, en waarom dat toch krap kan voelen",
            "Hoe een doorsnee gezin met dit inkomen er na alle vaste lasten werkelijk voor staat",
            "Drie mechanismen die samen verklaren waarom een goed salaris toch krap aanvoelt",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Stel: je verdient €4.000 netto per maand. Je hebt een koopwoning, twee
        kinderen en een auto. Op papier is dat een goed inkomen, en dat is het
        ook. Je zit in de top 25 procent van Nederland.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En toch. Aan het einde van de maand staat er €505 op je rekening. Netto.
        Na alle vaste lasten, boodschappen, kinderkosten en abonnementen.
        Vijfhonderd euro voor het onverwachte, voor een keer uit eten, voor een
        beetje buffer.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat voelt niet als top 25 procent. Dat voelt als krap.
      </p>

      <WerkelijkeVerdeling />

      <h2 className="font-display" style={h2}>
        Wat is €4.000 netto waard in 2026?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Jan Modaal verdient in 2026 netto ongeveer €3.100 per maand. Wie €4.000
        netto heeft, zit significant boven het meest voorkomende inkomen in
        Nederland. Dat is objectief gezien goed.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar &ldquo;goed&rdquo; is relatief. Het CBS mediaan inkomen voor werkende
        Nederlanders ligt op €38.000-40.000 bruto per jaar, netto iets boven
        €2.600. Op dat niveau is €4.000 netto luxe. Op het niveau van twee
        kinderen, een koopwoning en een auto in de Randstad is het soms nauwelijks
        voldoende.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is geen klagen. Dat is gewoon rekenen.
      </p>

      <h2 className="font-display" style={h2}>
        De echte verdeling van €4.000 netto bij een gezin met twee kinderen
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een doorsnee gezin met twee kinderen, een
        koopwoning net buiten de Randstad en één auto.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Hypotheek plus energie plus internet: €1.550. Boodschappen voor vier
        personen (inclusief drogisterij en bakker): €875. Auto inclusief
        verzekering en wegenbelasting: €580. Kinderkosten (sport,
        schoolmaterialen): €280. Abonnementen (telefoon, streaming, gym): €210.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Totaal: €3.495. Overblijvend: €505.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is de realiteit voor veel gezinnen. En die €505 verdwijnt in de loop
        van de maand in verjaardagscadeautjes, een avondje uit, een onverwachte
        rekening, iets voor de kinderen. Aan het einde van de maand is er
        structureel te weinig om serieus te sparen.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom voelt goed verdienen toch krap?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Er zijn drie mechanismen die dit verklaren en die weinig mensen benoemen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het eerste is lifestyle inflation. Naarmate het inkomen stijgt, stijgen de
        vaste lasten mee. Een grotere woning, een nieuwere auto, een extra
        abonnement hier en daar. Dit gaat automatisch en onbewust. Economisten
        noemen het een welbekend fenomeen, maar het gebeurt bijna iedereen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het tweede is de{" "}
        <Link
          href="/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand"
          className="hover:underline"
          style={{ color: "#C4603A", textDecoration: "none" }}
        >
          boodschappenkloof
        </Link>
        . Wat gezinnen werkelijk uitgeven aan boodschappen ligt structureel
        €200-400 boven de Nibud-norm. Voor een gezin met oudere kinderen kan dat
        oplopen tot €600 of meer verschil.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het derde is de afwezigheid van een systeem. Wie geen potjessysteem
        gebruikt en geen spaardoel heeft, geeft gewoon uit wat er op de rekening
        staat. En dat zijn altijd de volle €4.000, omdat geld op één rekening
        zichzelf uitgeeft als er geen bestemming voor is.
      </p>

      <h2 className="font-display" style={h2}>
        Wat maakt het verschil tussen gezinnen die het wél voelen en gezinnen die
        het niet voelen?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De gezinnen die met hetzelfde inkomen wél financiële rust ervaren, doen
        structureel één ding anders: ze verdelen het geld direct bij binnenkomst.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Vaste lasten van een aparte rekening. Boodschappen van een tweede
        rekening. Sparen direct op de eerste dag van de maand, voordat er iets
        anders betaald wordt. Wat er dan overblijft op de betaalrekening is het
        &ldquo;vrije&rdquo; geld voor de maand.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat vraagt geen hoger inkomen. Het vraagt een systeem dat voorkomt dat
        geld verdwijnt zonder bestemming. Meer over{" "}
        <Link
          href="/inzichten/spaardoelen-maandelijkse-inleg"
          className="hover:underline"
          style={{ color: "#C4603A", textDecoration: "none" }}
        >
          spaardoelen en maandelijkse inleg
        </Link>{" "}
        lees je in dat artikel.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Benieuwd hoe jullie verdeling eruitziet ten opzichte van een vergelijkbaar
        gezin met hetzelfde inkomen? Doe de{" "}
        <Link
          href="/analyse"
          className="hover:underline"
          style={{ color: "#C4603A", textDecoration: "none" }}
        >
          gratis analyse
        </Link>{" "}
        en zie direct waar het verschil zit.
      </p>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F5F0E8", borderColor: "#E8E0D4" }}
      >
        <p className="font-body text-sm" style={{ color: "#1C3A2A" }}>
          <strong>Uit de praktijk.</strong> Een gezin dat ik hielp met €4.000 netto dacht oprecht dat ze 'gewoon slecht met geld omgingen'. Dat was niet zo, het zat in twee posten die ongemerkt waren meegegroeid. Top 25% verdienen en tóch krap is geen gevoel; als je de cijfers naast elkaar legt, klopt het gewoon.
        </p>
      </div>
      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/bruto-naar-netto-loonstrook-uitleg" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">van bruto naar netto</Link> en <Link href="/inzichten/netto-loonsverhoging-berekenen" style={{ color: "#C4603A", textDecoration: "none" }} className="hover:underline">wat je netto overhoudt van een loonsverhoging</Link>.</p>
    </>
  );
}
