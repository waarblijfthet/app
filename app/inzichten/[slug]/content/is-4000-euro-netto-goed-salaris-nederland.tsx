import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function Is4000EuroNettoGoedSalaris() {
  return (
    <>
      <SalarisRekenaar />

      <p className="font-body text-text-soft" style={p}>
        Waarom dit de verkeerde vraag is om mee te beginnen: of 4.000 euro netto goed is, hangt niet af
        van het bedrag maar van wie het moet dragen. Voor iemand alleen is het ruim. Voor één ouder met
        twee kinderen en een koopwoning is het krap. Voor twee inkomens die samen 4.000 halen is het
        weer iets anders. Dat is de reden dat de rekenaar hierboven naar je huishouden vraagt en niet
        alleen naar je salaris.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En daarom klopt het gevoel dat veel mensen hier brengt. Je verdient objectief goed, je hoort dat
        ook van anderen, en toch staat er aan het einde van de maand minder dan je zou verwachten. Dat is
        geen klagen en het is ook geen karakterfout. Het is een rekensom die je nog nooit hebt gemaakt.
      </p>

      {/* Vijf echte huishoudens in plaats van de oude verdeling op forums en blogs.
          Vier van de vier persona's vertrouwden die bron niet, en de bedragen
          klopten sinds de herijking van lib/benchmarks.ts ook niet meer. */}
      <div className="rounded-xl border p-5 my-8" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
        <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
          Wat er bij vijf echte huishoudens overbleef
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Geen forumcijfers of gemiddelden. Vijf huishoudens leverden hun cijfers bij mij aan, ik schreef
          het rapport en drie tot vier maanden later schreven zij op wat er veranderde. Hun complete
          rapport staat op deze site, met toestemming.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            ["Alleenstaand, 3.650 netto", "/rapporten/alleenstaand-huurwoning"],
            ["Eén ouder, 5.700 netto met kinderbijslag en alimentatie", "/rapporten/alleenstaande-ouder-twee-kinderen"],
            ["Stel zonder kinderen, samen 6.990", "/rapporten/stel-zonder-kinderen"],
            ["Gezin met drie kinderen, samen 7.880", "/rapporten/tweeverdieners-drie-kinderen"],
            ["Zzp met partner, maanden tussen 2.400 en 8.100", "/rapporten/zzp-wisselend-inkomen"],
          ].map(([wie, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg px-3 py-2.5 font-body text-sm transition-colors hover:border-[#0B7A6E]"
              style={{ border: "1px solid #E6E9E7", color: "#4A5A56", textDecoration: "none" }}
            >
              {wie} &rarr;
            </Link>
          ))}
        </div>
        <p className="font-body text-xs mt-4 mb-0" style={{ color: "#8B958F" }}>
          Bij twee van deze vijf was mijn conclusie dat er niets te repareren viel. Vier van de vijf
          hadden het bij zichzelf mis.
        </p>
      </div>

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
        Waarom een bedrag niets zegt zonder het huishouden erbij
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Neem 4.000 euro netto en zet er twee huishoudens naast. Iemand die alleen woont houdt er volgens
        mijn vuistregel ongeveer 680 euro van over. Bij een gezin met twee kinderen op datzelfde bedrag komt
        de rekensom niet uit: de boodschappen zijn 525 euro hoger, er komt 380 euro aan opvang, school en
        sport bij, en dan is er niets meer over. Hetzelfde salaris, twee compleet verschillende antwoorden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is waarom de vraag &ldquo;is 4.000 netto goed&rdquo; nooit met ja of nee te beantwoorden is, en
        waarom een tabel met één voorbeeldhuishouden je weinig vertelt over jezelf. Vul je eigen situatie in
        de rekenaar hierboven in, dan zie je de posten die bij jouw huishouden horen. En let op wat er
        gebeurt als je het inkomen omhoog schuift: het tekort verdwijnt, maar de ruimte groeit langzamer dan
        je zou denken, omdat wonen en boodschappen meegroeien.
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
          style={{ color: "#0B7A6E", textDecoration: "none" }}
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
          style={{ color: "#0B7A6E", textDecoration: "none" }}
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
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          analyse
        </Link>{" "}
        en zie direct waar het verschil zit.
      </p>
      <div
        className="rounded-xl border p-4 my-6"
        style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}
      >
        <p className="font-body text-sm" style={{ color: "#16211F" }}>
          <strong>Uit de praktijk.</strong> Een gezin dat ik hielp met €4.000 netto dacht oprecht dat ze 'gewoon slecht met geld omgingen'. Dat was niet zo, het zat in twee posten die ongemerkt waren meegegroeid. Top 25% verdienen en tóch krap is geen gevoel; als je de cijfers naast elkaar legt, klopt het gewoon.
        </p>
      </div>
      <h2 className="font-display" style={h2}>
        En als je meer verdient dan €4.000 netto?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dan verandert de vraag. Bij €5.000 netto weet je zelf ook dat het een hoog salaris is; de vraag is
        dan waarom het niet voelt als een hoog inkomen, en wat je er bruto voor moet verdienen. Dat staat in{" "}
        <Link href="/inzichten/is-5000-euro-netto-goed-salaris" className="hover:underline" style={{ color: "#0B7A6E", textDecoration: "none" }}>
          is €5.000 netto een goed salaris
        </Link>
        . Komt jullie inkomen uit twee salarissen samen, dan speelt er nog iets anders: bij twee inkomens is
        er meestal geen lek en hebben beide partners een ander verhaal over waar het geld blijft. Daarover
        gaat{" "}
        <Link href="/inzichten/samen-6000-euro-netto-toch-niets-over" className="hover:underline" style={{ color: "#0B7A6E", textDecoration: "none" }}>
          samen €6.000 netto en toch niets over
        </Link>
        .
      </p>

      <p className="font-body text-text-soft" style={p}>Lees ook over <Link href="/inzichten/bruto-naar-netto-loonstrook-uitleg" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">van bruto naar netto</Link> en <Link href="/inzichten/netto-loonsverhoging-berekenen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">wat je netto overhoudt van een loonsverhoging</Link>.</p>
    </>
  );
}
