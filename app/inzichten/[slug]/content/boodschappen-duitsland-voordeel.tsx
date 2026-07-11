import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function BoodschappenDuitslandVoordeel() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Boodschappen in Duitsland zijn gemiddeld 15% goedkoper, maar het netto voordeel hangt af van je reisafstand",
            "De grootste winst zit bij A-merken en drogisterijproducten, niet bij vers of huismerken",
            "Wie dicht bij de grens woont en slim combineert, bespaart structureel; wie ver weg woont, nauwelijks",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Bijna iedereen kent iemand die er prat op gaat: grote boodschappen haalt
        hij in Duitsland. Wasmiddel, frisdrank, shampoo, flink goedkoper dan
        hier. En dat klopt ook, voor een deel. Maar of je er echt op vooruitgaat,
        hangt af van waar je woont en hoe je winkelt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Uit onderzoek van de Consumentenbond uit 2025 blijkt dat een volle
        boodschappenkar in Duitsland gemiddeld 15 procent goedkoper is dan in
        Nederland. Bij A-merken loopt dat verschil op tot 25 procent.
        Drogisterijproducten bij DM of Rossmann kunnen zelfs tot 50 procent
        goedkoper zijn dan bij Kruidvat.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar die percentages meten alleen de kassabon. Ze rekenen niet mee wat
        het je kost om bij die kassa te komen.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: boodschappen in Duitsland zijn gemiddeld zo’n 15 procent goedkoper, en bij A-merken en drogisterij loopt dat op tot 25 tot 50 procent. Of het echt loont hangt af van je reistijd en benzine, dus die reken ik hieronder eerlijk mee.
      </p>

      <h2 className="font-display" style={h2}>
        Waar zit het prijsverschil precies?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Niet alles is goedkoper in Duitsland. Verse producten zoals groente en
        fruit zijn er soms duurder. Bij huismerkproducten is het verschil kleiner
        dan je denkt, soms slechts een paar procent.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De grootste winst zit bij A-merken en drogisterijproducten. Koffie,
        frisdrank, wasmiddel, tandpasta, deodorant, dat soort spullen. Wie
        vooral die categorie haalt, merkt het meeste verschil.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een andere factor: Nederlandse supermarkten zijn kampioen
        kortingsacties. Die "2 halen 1 betalen" en "1+1 gratis" aanbiedingen
        bestaan in Duitsland nauwelijks. Duitsland hanteert stabiel lage
        basisprijzen, Nederland trekt mensen met tijdelijke kortingen. Als je
        goed gebruik maakt van Nederlandse aanbiedingen, is het verschil met
        Duitsland een stuk kleiner dan de kale prijs doet vermoeden.
      </p>

      <h2 className="font-display" style={h2}>
        De eerlijke berekening voor jou
      </h2>
      <p className="font-body text-text-soft" style={p}>
        De hamvraag is niet wat er op de kassabon staat, maar wat een rit naar
        Duitsland je netto oplevert.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Verkeersonderzoeker Erik Verhoef van de VU Amsterdam heeft berekend dat
        de gemiddelde reistijdwaardering in Nederland rond de tien euro per uur
        ligt. Tel daarbij de brandstofkosten op, al scheelt het wel dat
        brandstof in Duitsland zelf ook goedkoper is.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een rekenvoorbeeld: je rijdt 30 minuten naar een Kaufland, doet
        boodschappen voor 150 euro, en rijdt weer terug. Reistijd: een uur.
        Brandstof: stel vier euro. Tijdkosten: tien euro. Totale kosten van de
        rit: veertien euro. Je bespaart 15 procent op 150 euro, dat is 22,50
        euro. Netto voordeel: ongeveer acht euro.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Woon je op vijf minuten van de grens? Dan ziet het er heel anders uit.
      </p>

      <h2 className="font-display" style={h2}>
        Voor wie loont het echt?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Voor mensen die dicht bij de grens wonen, Limburg, Gelderland,
        Overijssel, Groningen, Drenthe, is een ritje naar een Duitse
        supermarkt gewoon logisch. Zeker als je het combineert met andere
        dingen die je toch al die kant op moet.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voor mensen die verder weg wonen, is het eerlijkere verhaal dit: het
        loont als je een grote voorraad haalt van de juiste producten. Niet voor
        even wat vers fruit tussendoor.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Praktische tip: maak een lijst van producten die je structureel veel
        gebruikt, wasmiddel, tandpasta, koffie, shampoo, frisdrank, en sla
        die in bulk in. Dat is waar het echte voordeel zit. Niet in de
        dagelijkse boodschappen.
      </p>

      <h2 className="font-display" style={h2}>
        Wat dit zegt over je boodschappengedrag
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het interessante aan dit hele onderwerp is niet of Duitsland goedkoper
        is. Het interessante is dat mensen er überhaupt over nadenken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat je actief zoekt naar manieren om op boodschappen te besparen, is
        een signaal. Niet van armoede, maar van bewustzijn. Je weet dat er elke
        maand te veel verdwijnt in de supermarkt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Gemiddeld geeft een Nederlands gezin met twee kinderen zo&apos;n 755 euro per
        maand uit aan boodschappen. Weet jij{" "}
        <Link
          href="/analyse"
          className="hover:underline"
          style={{ color: "#0B7A6E", textDecoration: "none" }}
        >
          wat jullie uitgeven aan boodschappen
        </Link>
        ? En hoe dat verhoudt zich tot vergelijkbare gezinnen?
      </p>
    </>
  );
}
