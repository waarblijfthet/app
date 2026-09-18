"use client";

import { useState } from "react";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import { kostenVanDeMaatregel } from "@/lib/kindgebonden-budget";
import { iackVerlies, zorgPerJaar, IACK_KANTELPUNT } from "@/lib/prinsjesdag-2027";

/**
 * Wat de 2027-maatregelen dit tweeverdienershuishouden kosten.
 *
 * Twee knoppenrijen in plaats van invoervelden, om dezelfde reden als bij de
 * kindgebonden budget-rekenaar: niemand kent zijn toetsingsinkomen op de euro.
 *
 * De tweede rij is het punt van dit artikel. Twee huishoudens met hetzelfde
 * gezamenlijke inkomen kunnen een verschillend bedrag kwijtraken, want de
 * combinatiekorting hangt aan het inkomen van de minstverdienende partner.
 * Daarom staat die vraag er apart in en niet als afgeleide van de som.
 */

const SAMEN = [65000, 80000, 100000, 120000, 140000] as const;
const MINSTVERDIENENDE = [15000, 25000, 35000, 50000] as const;

function eur(n: number): string {
  return "€" + n.toLocaleString("nl-NL");
}

export default function Tweeverdieners2027Rekenaar() {
  const [samen, setSamen] = useState<number>(100000);
  const [laagste, setLaagste] = useState<number>(35000);
  const [kinderenOnder12, setKinderenOnder12] = useState(2);
  const [kinderen, setKinderen] = useState(2);

  // De minstverdienende kan niet meer dan de helft verdienen; dan is hij de
  // meestverdienende. Afkappen in plaats van de knop verbergen, zodat de
  // uitkomst nooit onzin is.
  const laagsteEffectief = Math.min(laagste, Math.round(samen / 2));

  const kgb = kostenVanDeMaatregel("paar", kinderen, samen).perJaar;
  const iack = kinderenOnder12 > 0 ? iackVerlies(laagsteEffectief) : 0;
  const zorg = zorgPerJaar(2);
  const totaalPerJaar = kgb + iack + zorg.premie + zorg.eigenRisico;
  const totaalPerMaand = Math.round(totaalPerJaar / 12);

  const knop = "px-3 py-2 rounded-lg font-body text-sm transition-colors border";
  const aan = { backgroundColor: "#0B7A6E", color: "#FFFFFF", borderColor: "#0B7A6E" };
  const uit = { backgroundColor: "#FFFFFF", color: "#16211F", borderColor: "#E6E9E7" };
  const brugH2 = {
    fontSize: "1.6rem",
    color: "#16211F",
    marginTop: "0.75rem",
    marginBottom: "1rem",
    fontWeight: 300,
  } as const;
  const brugP = { marginBottom: "1.25rem", fontWeight: 300 } as const;
  const brugPLaatst = { marginBottom: "1.5rem", fontWeight: 300 } as const;
  const regel = "flex justify-between font-body text-sm mb-1";

  return (
    <>
      <div
        className="rounded-xl p-5 my-8"
        style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #9CCFC4" }}
      >
        <p className="font-body font-semibold text-sm mb-4" style={{ color: "#16211F" }}>
          Wat kost 2027 bij jullie?
        </p>

        <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
          Jullie gezamenlijke bruto jaarinkomen, ongeveer
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {SAMEN.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSamen(i)}
              className={knop}
              style={samen === i ? aan : uit}
            >
              {eur(i)}
            </button>
          ))}
        </div>

        <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
          Waarvan de minstverdienende partner, ongeveer
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {MINSTVERDIENENDE.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setLaagste(i)}
              className={knop}
              style={laagste === i ? aan : uit}
            >
              {eur(i)}
            </button>
          ))}
        </div>

        <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
          Aantal kinderen
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {[1, 2, 3].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setKinderen(k);
                if (kinderenOnder12 > k) setKinderenOnder12(k);
              }}
              className={knop}
              style={kinderen === k ? aan : uit}
            >
              {k}
            </button>
          ))}
        </div>

        <p className="font-body text-xs mb-2" style={{ color: "#4A5A56" }}>
          Daarvan jonger dan 12
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {[0, 1, 2, 3]
            .filter((k) => k <= kinderen)
            .map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKinderenOnder12(k)}
                className={knop}
                style={kinderenOnder12 === k ? aan : uit}
              >
                {k}
              </button>
            ))}
        </div>

        <div
          className="rounded-lg p-4 mb-4"
          style={{ backgroundColor: "#E7F1EE", border: "1px solid #9CCFC4" }}
        >
          <div className={regel} style={{ color: "#4A5A56" }}>
            <span>Snellere afbouw kindgebonden budget</span>
            <span>{kgb === 0 ? "niets" : eur(kgb) + " per jaar"}</span>
          </div>
          <div className={regel} style={{ color: "#4A5A56" }}>
            <span>Eerste afbouwstap combinatiekorting</span>
            <span>{iack === 0 ? "niets" : eur(iack) + " per jaar"}</span>
          </div>
          <div className={regel} style={{ color: "#4A5A56" }}>
            <span>Hogere zorgpremie, twee volwassenen</span>
            <span>{eur(zorg.premie)} per jaar</span>
          </div>
          <div className="flex justify-between font-body text-sm mb-3" style={{ color: "#4A5A56" }}>
            <span>Hoger eigen risico, als je het opmaakt</span>
            <span>{eur(zorg.eigenRisico)} per jaar</span>
          </div>
          <div
            className="flex justify-between font-body font-semibold pt-3"
            style={{ color: "#16211F", borderTop: "1px solid #9CCFC4" }}
          >
            <span>Bij elkaar</span>
            <span>{eur(totaalPerMaand)} per maand</span>
          </div>
          <p className="font-body text-xs mt-2" style={{ color: "#4A5A56" }}>
            Dat is {eur(totaalPerJaar)} per jaar. Hier staat geen loonstijging tegenover: die komt
            er in 2027 bij, en hoeveel hangt af van je cao en je werkgever.
          </p>
        </div>

        {iack === 0 && kinderenOnder12 > 0 && (
          <p className="font-body text-xs mb-4" style={{ color: "#4A5A56" }}>
            De combinatiekorting kost jullie in 2027 nog niets. Wie minder dan ongeveer{" "}
            {eur(IACK_KANTELPUNT)} verdient, zit onder het maximum van de korting, en de eerste afbouwstap
            haalt alleen van dat maximum af. Bij een groter deeltijdpercentage verandert dat wel.
          </p>
        )}

        <p className="font-body text-xs mb-4" style={{ color: "#4A5A56" }}>
          Indicatief, geen belastingberekening. Het gezamenlijke bruto-inkomen staat hier voor het
          toetsingsinkomen; met hypotheekrenteaftrek ligt dat lager en valt het kindgebonden budget
          dus gunstiger uit. De cijfers komen uit de Prinsjesdagstukken van 15 september 2026; alleen
          de zorgpremie is een raming van VWS tot de verzekeraars hun premie bekendmaken, uiterlijk
          12 november. Zie de bronnen onder dit artikel.
        </p>
      </div>

      <section>
        <h2 className="font-display" style={brugH2}>
          Dit laat zien wat er ongeveer verandert
        </h2>
        <p className="font-body text-text-soft" style={brugP}>
          {totaalPerMaand === 0
            ? "Aan deze regelingen verandert er bij jullie niets."
            : eur(totaalPerMaand) + " per maand is concreet."}{" "}
          Het zegt alleen niets over de rest. Wonen, boodschappen, opvang, vervoer en de
          jaarlijkse kosten bepalen samen hoeveel er werkelijk overblijft, en die staan in geen
          enkel koopkrachtplaatje.
        </p>
        <p className="font-body text-text-soft" style={brugP}>
          Maar het vertelt nog niet waarom jullie iedere maand meer of minder overhouden dan
          vergelijkbare huishoudens.
        </p>
        <p className="font-body text-text-soft" style={brugPLaatst}>
          De gratis analyse legt jullie hele maand naast vergelijkbare huishoudens en laat zien
          waar jullie afwijken.
        </p>
        <CtaLink
          doel="analyse"
          href={analyseHref({ situatie: "gezin" })}
          locatie="brug"
          className="inline-block rounded-lg px-5 py-3 font-body text-sm"
          style={{ backgroundColor: "#0B7A6E", color: "#FFFFFF" }}
        >
          Vergelijk jullie huishouden &rarr;
        </CtaLink>
        <p className="font-body text-xs" style={{ color: "#4A5A56", marginTop: "0.5rem" }}>
          &plusmn; 2 minuten &middot; gratis &middot; anoniem &middot; geen bankgegevens
        </p>
      </section>
    </>
  );
}
