import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function HogereHypotheekWatKostHetPerMaand() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat elke €100.000 extra hypotheek concreet kost per maand bij een rente van 4%",
            "Waarom 'het kan net' gevaarlijk is: een bank kijkt naar het maximum, niet naar wat comfortabel is",
            "Dat woonlasten bij voorkeur niet boven een derde van je netto-inkomen uitkomen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border p-4 mb-8" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          <strong>Ter informatie, geen financieel advies.</strong> Dit artikel
          geeft een rekenvoorbeeld om kosten inzichtelijk te maken. Voor een
          hypotheek zelf raadpleeg je een erkend, AFM-geregistreerd adviseur.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Een groter huis, een verbouwing, of overbieden in een krappe markt: de
        verleiding is groot om de hypotheek wat hoger te laten uitvallen. Het
        verschil tussen &ldquo;net wel&rdquo; en &ldquo;net niet&rdquo; lijkt op
        papier klein. Maandelijks voelt het anders.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: elke €100.000 extra hypotheek kost je bij een rente van
        rond de 4% grofweg €475 per maand aan rente en aflossing (annuïteit, 30
        jaar). Dat is een vaste last die 30 jaar lang blijft, en je woonlasten
        zijn doorgaans al je grootste post.
      </p>

      <h2 className="font-display" style={h2}>Waarom &ldquo;het kan net&rdquo; gevaarlijk is</h2>
      <p className="font-body text-text-soft" style={p}>
        Een bank kijkt naar wat je maximaal kúnt lenen, niet naar wat comfortabel
        is. Wie tot het maximum gaat, zit precies op de grens, en dan is er geen
        ruimte meer voor de boodschappen die oplopen, de tweede auto of de
        seizoenspieken. Het huis &ldquo;past&rdquo;, maar het leven eromheen niet.
      </p>

      <h2 className="font-display" style={h2}>Reken met je netto, niet met het maximum</h2>
      <p className="font-body text-text-soft" style={p}>
        De vuistregel die het Nibud hanteert is dat je woonlasten bij voorkeur
        niet boven ongeveer een derde van je netto-inkomen uitkomen. Zit je daar
        ruim boven, dan wordt elke andere tegenvaller meteen voelbaar. Dat is
        precies het mechanisme achter{" "}
        <Link href="/inzichten/goed-salaris-toch-krap" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">goed salaris, toch krap</Link>: een hoge vaste last laat geen lucht over.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je zien hoeveel ruimte jullie woonlasten nu laten?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>{" "}— wonen is de eerste categorie die we vergelijken.
      </p>
    </>
  );
}
