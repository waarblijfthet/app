import Link from "next/link";
import { PrijsvergelijkingTabel } from "@/components/artikel/PrijsvergelijkingTabel";
import { WinkelGids } from "@/components/artikel/WinkelGids";

const h2 = {
  fontSize: "1.6rem",
  color: "#1C3A2A",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function VergelijkenBoodschappenNederlandDuitsland() {
  return (
    <>
      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E8F2EC", border: "1.5px solid #A8C5B4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#1C3A2A" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Drogisterijproducten zijn in Duitsland gemiddeld 50% goedkoper, wie €60/mnd uitgeeft bespaart €360 per jaar",
            "Vers en huismerken zijn níet altijd goedkoper; de winst zit specifiek bij A-merken en drogisterij",
            "Per winkel: DM/Rossmann voor drogisterij, Aldi voor dagelijkse boodschappen, Kaufland voor grotere inkopen",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#2D4A35" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#C4603A" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Bijna de helft goedkoper. Dat is wat het programma Kassa ontdekte toen
        ze exact dezelfde 13 drogisterijproducten vergeleek bij Kruidvat en bij
        DM in Duitsland. €161,69 in Nederland, €73,75 aan de andere kant van de
        grens. Voor precies dezelfde producten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat zijn geen uitzonderingen of cherry-picked deals. Het zijn gewone
        kassabonnen. En het verklaart waarom 65 procent van de Nederlanders die
        bij de grens woont regelmatig de grens oversteekt voor boodschappen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Maar wat koop je precies waar? En wat heeft geen zin? Hier is het
        concrete antwoord, gebaseerd op actuele prijsvergelijkingen, niet op
        aannames.
      </p>

      <PrijsvergelijkingTabel />

      <h2 className="font-display" style={h2}>
        Niet alles is goedkoper, dit moet je weten
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Het bovenstaande mandje laat een gemiddelde besparing zien van ruim 45
        procent. Maar dat getal geldt niet voor alles.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Verse producten zoals groente en fruit zijn in Duitsland niet altijd
        goedkoper. Soms zelfs duurder. Ook typisch Nederlandse producten —
        stroopwafels, hagelslag, pindakaas huismerk, zijn in Nederland vaak
        goedkoper omdat Nederlandse fabrikanten juist voor die producten scherp
        zitten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        De categorie waar Duitsland echt wint is drogisterij en bekende
        A-merken. En dat is ook precies de categorie die in een gemiddeld gezin
        honderden euro&apos;s per jaar kost.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een gezin dat maandelijks €60 uitgeeft aan drogisterijproducten —
        wasmiddel, tandpasta, shampoo, babyspullen, schoonmaakmiddelen, betaalt
        op jaarbasis €720. Koop je die producten consequent in Duitsland, dan
        betaal je volgens de Consumentenbond gemiddeld de helft. Dat is €360
        besparing per jaar op alleen die categorie.
      </p>

      <h2 className="font-display" style={h2}>
        Per winkel, waar ga je voor wat?
      </h2>

      <WinkelGids />

      <h2 className="font-display" style={h2}>
        De slimme trip, hoe combineer je het?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Één winkel is zelden genoeg voor de beste deals. De slimste
        grensshoppers combineren altijd een discounter met een drogisterij.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Stap 1: open de DM-app en de Rossmann-app voor je gaat. Beide apps
        tonen actuele coupons die je direct kunt activeren. Zo weet je van
        tevoren welke producten extra goedkoop zijn die week.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Stap 2: begin bij DM of Rossmann voor je verzorgingsproducten. Vergelijk
        de twee apps voor de laagste prijs, ze zitten vaak vlak bij elkaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Stap 3: ga daarna naar Kaufland of Lidl voor levensmiddelen, vlees en
        bulkproducten. Check de Duitse folder (kaufland.de of lidl.de) vooraf
        voor weekaanbiedingen.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Stap 4: tank bij terugkomst in Duitsland als de prijs lager is dan bij
        jou in de buurt. Brandstof is in Duitsland structureel goedkoper.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Nog een praktisch punt: neem contant geld mee. Niet alle kleine winkels
        accepteren Nederlandse betaalpassen. En vergeet het statiegeld niet —
        lever het in bij Kaufland, want hun automaten accepteren alle soorten
        verpakkingen.
      </p>

      <h2 className="font-display" style={h2}>
        Voor wie loont de rit niet?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Eerlijk is eerlijk: als je meer dan een uur rijdt voor je boodschappen,
        wordt het rekensom anders.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een vuistregel: de reistijd kost je gemiddeld tien euro per uur. Tel
        daar de brandstof bij op en vergelijk dat met wat je spaart. Bij een
        rit van een uur heen en terug betaal je al snel twintig euro aan tijd
        en brandstof. Dan moet je mandje groot genoeg zijn om dat goed te maken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Rij je dertig minuten? Dan heb je bij een boodschappenmandje van honderd
        euro al snel acht tot tien euro netto voordeel. Dat loont.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Woon je verder dan een uur van de grens? Overweeg dan om de rit te
        combineren met iets anders, een dagje weg, familie bezoeken, of een
        uitstapje met de kinderen. Dan zijn de reiskosten toch al gemaakt.
      </p>

      <h2 className="font-display" style={h2}>
        Wat dit zegt over je maandbudget
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dit artikel gaat over boodschappen, maar de werkelijke vraag is een
        andere:{" "}
        <Link
          href="/analyse"
          className="hover:underline"
          style={{ color: "#C4603A", textDecoration: "none" }}
        >
          hoeveel geef jij maandelijks uit
        </Link>{" "}
        aan de supermarkt en de drogist, en hoe verhoudt dat zich tot
        vergelijkbare gezinnen?
      </p>
      <p className="font-body text-text-soft" style={p}>
        Gemiddeld geeft een Nederlands gezin met twee kinderen €755 per maand
        uit aan boodschappen. Dat is het Nibud-gemiddelde voor 2026. Weet jij
        wat jullie uitgeven? En waar zit jullie afwijking ten opzichte van dat
        gemiddelde?
      </p>
      <p className="font-body text-text-soft" style={p}>
        Doe de{" "}
        <Link
          href="/analyse"
          className="hover:underline"
          style={{ color: "#C4603A", textDecoration: "none" }}
        >
          gratis analyse
        </Link>{" "}
        en zie in vijf minuten hoe jullie boodschappenuitgaven zich verhouden
        tot vergelijkbare gezinnen, en waar jullie de meeste ruimte hebben.
      </p>
    </>
  );
}
