import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function WaarBlijftHetBijFatima() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom één inkomen met twee kinderen en vrije sector huur bijna wiskundig krap is",
            "Dat bij dit profiel het probleem niet de uitgaven zijn maar de lasten, en wat dat betekent voor aanpak",
            "Welke stappen werkelijk helpen als het een lastenprobleem is, geen gedragsprobleem",
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
          <strong>Fictief profiel.</strong> De cijfers zijn samengesteld uit
          openbare gemiddelden (Nibud, CBS) en praktijkindicaties, geen echte
          klant. Bedoeld ter herkenning.
        </p>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Fatima is alleenstaande ouder met twee kinderen en verdient €2.900 netto
        per maand, een prima salaris voor één persoon. Maar één inkomen draagt
        hier álles: de huur, de boodschappen, de kinderen, de auto naar het werk.
        En dan blijkt &ldquo;een goed salaris&rdquo; ineens iets heel anders te
        betekenen.
      </p>

      <h2 className="font-display" style={h2}>Het profiel</h2>
      <p className="font-body text-text-soft" style={p}>
        Netto inkomen: €2.900 per maand plus toeslagen. Gezin: één volwassene,
        twee kinderen (6 en 9 jaar). Wonen: vrije sector huur €1.250 (voor
        sociale huur net te veel verdienend). Vervoer: één oudere auto voor
        woon-werk.
      </p>

      <h2 className="font-display" style={h2}>Waar het geld heen gaat</h2>
      <p className="font-body text-text-soft" style={p}>
        De huur alleen al slokt ruim 40% van het inkomen op. Daarna komen
        energie, de zorgverzekering, boodschappen voor drie en de auto. Wat
        overblijft voor sparen is bij een goede maand een tientje, bij een
        tegenvaller niets.
      </p>

      <h2 className="font-display" style={h2}>Waar blijft het?</h2>
      <p className="font-body text-text-soft" style={p}>
        Hier is het eerlijke antwoord anders dan bij de meeste verhalen op deze
        site: bij Fatima ligt het níet aan de uitgaven. Er is geen luxe, geen
        verspilling, geen abonnementenstapel. Het is een lasten-probleem, de
        vaste kosten zijn simpelweg hoog ten opzichte van één inkomen, vooral
        door de vrije sector-huur.
      </p>

      <h2 className="font-display" style={h2}>Wat in dit geval helpt</h2>
      <p className="font-body text-text-soft" style={p}>
        Bij dit profiel zit de winst niet in &ldquo;slimmer budgetteren&rdquo;,
        maar in het echt aanpakken van de grote posten: controleren of álle
        toeslagen binnenkomen, de huur tegen het licht houden, en kijken of er
        gemeentelijke regelingen zijn. Zit je écht klem of dreigen er schulden,
        dan ben je bij een gecertificeerde budgetcoach of bij{" "}
        <a href="https://geldfit.nl" target="_blank" rel="noopener noreferrer" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Geldfit</a>{" "}
        beter op je plek, en dat zeg ik dan ook gewoon. Meer daarover op mijn{" "}
        <Link href="/over" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">over-pagina</Link>.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je eerst zien waar jouw geld naartoe gaat?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de analyse</Link>.
      </p>
    </>
  );
}
