import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function GeldmythesDieJeArmHouden() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Vijf veelgehoorde aannames over geld die logisch klinken maar je juist krap houden",
            "Waarom meer verdienen, een budgetapp of boodschappen in Duitsland het probleem zelden oplossen",
            "Dat krap zitten bijna nooit aan karakter of discipline ligt, bijna altijd aan structuur",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Rond geld leven hardnekkige aannames die logisch klinken, maar je juist
        krap houden. Dit zijn er vijf die we het vaakst tegenkomen, en wat er
        werkelijk klopt.
      </p>

      <h2 className="font-display" style={h2}>Mythe 1: &ldquo;Sparen lukt vanzelf als ik meer verdien&rdquo;</h2>
      <p className="font-body text-text-soft" style={p}>
        Klinkt logisch, maar de praktijk laat het tegenovergestelde zien. Naarmate
        je meer verdient, groeien je uitgaven mee, een groter huis, een duurdere
        auto, vaker uit eten. Dat heet{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">lifestyle-inflatie</Link>, en het is precies waarom mensen met een hoog inkomen even krap kunnen zitten als met een laag inkomen.
      </p>

      <h2 className="font-display" style={h2}>Mythe 2: &ldquo;Wie krap zit, gaat slecht met geld om&rdquo;</h2>
      <p className="font-body text-text-soft" style={p}>
        Onzin. Bijna de helft van de Nederlandse huishoudens is financieel
        kwetsbaar, óók met een goed inkomen. Krap zitten zegt veel vaker iets over
        hoge vaste lasten en een gebrek aan structuur dan over karakter of
        discipline.
      </p>

      <h2 className="font-display" style={h2}>Mythe 3: &ldquo;Een salarisverhoging lost het op&rdquo;</h2>
      <p className="font-body text-text-soft" style={p}>
        Boven een bepaald inkomen levert een verhoging netto verrassend weinig op,
        door belasting en de afbouw van heffingskortingen. We rekenden het voor in{" "}
        <Link href="/inzichten/salarisverhoging-boven-76000-weinig-netto" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">waarom een salarisverhoging boven €76.000 weinig oplevert</Link>.
      </p>

      <h2 className="font-display" style={h2}>Mythe 4: &ldquo;Een budgetapp lost het op&rdquo;</h2>
      <p className="font-body text-text-soft" style={p}>
        Een app laat zien wat er gebeurt, maar verandert niks zolang je er niks
        mee doet. Inzicht is de eerste stap, structuur de tweede. Een vaste
        verdeling met aparte potjes werkt voor de meeste gezinnen beter dan weer
        een dashboard om te negeren.
      </p>

      <h2 className="font-display" style={h2}>Mythe 5: &ldquo;Boodschappen in Duitsland is altijd voordeliger&rdquo;</h2>
      <p className="font-body text-text-soft" style={p}>
        Soms wel, vaak niet. Of het loont hangt af van waar je woont, wat je
        koopt en de reistijd. We zochten het uit in{" "}
        <Link href="/inzichten/vergelijken-boodschappen-nederland-duitsland" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">boodschappen Nederland vs. Duitsland</Link>.
      </p>

      <p className="font-body text-text-soft" style={p}>
        De rode draad: het ligt zelden aan wat je verdient of aan je karakter, en
        bijna altijd aan structuur. Wil je weten waar het bij jullie zit?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de gratis analyse</Link>.
      </p>
    </>
  );
}
