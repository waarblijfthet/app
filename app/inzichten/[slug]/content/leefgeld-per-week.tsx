import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import { euro } from "@/lib/salaris-vuistregel";
import {
  NIBUD_LEEFGELD,
  NIBUD_LEEFGELD_URL,
  NIBUD_LEEFGELD_PEILDATUM,
  NIBUD_LEEFGELD_GEOPEND,
  leefgeldVoor,
} from "@/lib/leefgeld-nibud";

/**
 * Nieuw 6-nov-2026. Autocomplete: "leefgeld per week", "leefgeld per week 1
 * persoon", "leefgeld nibud", "leefgeldrekening". Search Console: "hoeveel
 * leefgeld per maand" op positie 66, "huishoudgeld 1 persoon" op 10, zonder
 * eigen pagina. Leefgeld is bij het Nibud een term uit de schuldhulp; wie het
 * zoekt met een gewoon inkomen wil meestal een vast weekbedrag voor de
 * dagelijkse uitgaven. Alle Nibud-bedragen uit lib/leefgeld-nibud.ts.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function NibudBron({ tekst }: { tekst: string }) {
  return (
    <a href={NIBUD_LEEFGELD_URL} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
      {tekst}
    </a>
  );
}

export default function LeefgeldPerWeek() {
  const alleen = leefgeldVoor("Alleenstaande");
  const stel = leefgeldVoor("Stel zonder kinderen");
  return (
    <>
      <div className="rounded-xl p-4 mb-6" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
        <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
          Herken je dit?
        </p>
        <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Je wilt een vast bedrag per week voor de boodschappen en de dagelijkse dingen. Maar je weet niet hoeveel normaal
          is, en elke week is het weer anders.
        </p>
      </div>

      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>
          Na dit artikel weet je:
        </p>
        <ul className="space-y-1.5">
          {[
            "Wat leefgeld is, en wat er wel en niet onder valt",
            "Hoeveel leefgeld per week het Nibud rekent, per huishouden",
            "Hoe je je eigen bedrag per week bepaalt met je bankapp",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: het Nibud rekent als minimum {euro(alleen.perWeek)} leefgeld per week voor een alleenstaande en{" "}
        {euro(stel.perWeek)} voor een stel zonder kinderen ({NIBUD_LEEFGELD_PEILDATUM}). Dat zijn bedragen voor mensen in de
        schuldhulp, die heel zuinig leven. Je eigen bedrag bepaal je met je bankapp: tel drie maanden dagelijkse uitgaven
        op en deel door 13.
      </p>

      <h2 className="font-display" style={h2}>Wat is leefgeld?</h2>
      <p className="font-body text-text-soft" style={p}>
        Leefgeld is het bedrag per week voor de losse, dagelijkse uitgaven. Het Nibud gebruikt het woord voor mensen in een
        schuldregeling: hun vaste lasten worden voor ze betaald, en van het leefgeld doen ze de rest. Veel mensen gebruiken
        het ook gewoon voor hun eigen weekbudget.
      </p>
      <EenvoudigeTabel
        koppen={["Valt onder leefgeld", "Valt er niet onder"]}
        rijen={[
          ["Eten en drinken", "Huur of hypotheek, energie, internet, verzekeringen"],
          ["Persoonlijke verzorging, zoals douchegel en de kapper", "Kleding en onderhoud, waar je voor spaart"],
          ["Was- en schoonmaakmiddelen", "Een auto"],
          ["Kleine dingen, zoals postzegels en pennen", "Vakanties en dagjes weg"],
        ]}
        bijschrift={`Indeling volgens de Nibud-richtlijn, geopend op ${NIBUD_LEEFGELD_GEOPEND}.`}
      />

      <h2 className="font-display" style={h2}>Hoeveel leefgeld per week?</h2>
      <p className="font-body text-text-soft" style={p}>
        Dit zijn de bedragen uit de Nibud-richtlijn. Het Nibud werkt ze twee keer per jaar bij, in januari en juli.
      </p>
      <EenvoudigeTabel
        koppen={["Huishouden", "Per week", "Per maand"]}
        rijen={NIBUD_LEEFGELD.map((h) => [h.huishouden, euro(h.perWeek), euro(h.perMaand)])}
        bijschrift={`Bron: Nibud, richtlijn leefgeld, ${NIBUD_LEEFGELD_PEILDATUM}. Geopend op ${NIBUD_LEEFGELD_GEOPEND}.`}
      />
      <p className="font-body text-text-soft" style={p}>
        Het grootste deel is eten en drinken: voor een alleenstaande {euro(alleen.voeding)} van de {euro(alleen.perMaand)}{" "}
        per maand. Let op: dit zijn minimumbedragen. Volgens het Nibud kun je er alleen van leven als je heel goed met geld
        omgaat, geen extra medische kosten hebt, niet rookt en geen huisdieren hebt. De bedragen van €50 en €75 per week die
        je soms nog tegenkomt, noemt het Nibud verouderd (
        <NibudBron tekst="Nibud, leefgeld in de schuldhulpverlening" />
        ).
      </p>

      <h2 className="font-display" style={h2}>Je eigen leefgeld bepalen</h2>
      <p className="font-body text-text-soft" style={p}>
        Heb je geen schulden, dan hoef je niet van het minimum te leven. Je wilt een bedrag dat past bij hoe je nu leeft, en
        dat je volhoudt. Zo vind je het:
      </p>
      <ol className="font-body" style={{ marginBottom: "1.5rem", paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.75rem", color: "#4A5A56", fontWeight: 300 }}>
          Open Inzicht in je bankapp. Hoe dat werkt bij jouw bank, staat in{" "}
          <Link href="/inzichten/huishoudboekje-bankapp-rabobank-ing-abn-amro" style={link} className="hover:underline">
            huishoudboekje en potjes in je bankapp
          </Link>
          .
        </li>
        <li style={{ marginBottom: "0.75rem", color: "#4A5A56", fontWeight: 300 }}>
          Kies de categorieën die je tot leefgeld rekent, zoals boodschappen, drogist en eten buiten de deur.
        </li>
        <li style={{ marginBottom: "0.75rem", color: "#4A5A56", fontWeight: 300 }}>
          Tel de laatste drie maanden op en deel door 13. Drie maanden zijn ongeveer 13 weken, dus dat is je bedrag per
          week.
        </li>
        <li style={{ marginBottom: "0.75rem", color: "#4A5A56", fontWeight: 300 }}>
          Leg het naast de tabel hierboven. Zit je ver boven het minimum, dan is dat niet fout. Het laat wel zien waar
          ruimte zit als je die nodig hebt.
        </li>
      </ol>
      <p className="font-body text-text-soft" style={p}>
        Wat andere huishoudens in de praktijk aan boodschappen uitgeven, staat in{" "}
        <Link href="/inzichten/wat-is-normaal-bedrag-boodschappen-per-maand" style={link} className="hover:underline">
          boodschappen per maand: wat is normaal
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Een leefgeldrekening</h2>
      <p className="font-body text-text-soft" style={p}>
        Een leefgeldrekening is een aparte rekening met een eigen pas, alleen voor je leefgeld. Elke week, of elke maand na
        je salaris, gaat er een vast bedrag naartoe. Alles wat je dagelijks uitgeeft, betaal je met die pas. Is het op, dan
        is het op. Blijft er iets over, zet het dan in een potje.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Het werkt omdat je niet meer elke dag hoeft te kiezen. Je kiest één keer, aan het begin. Hoe je de rest van je
        salaris verdeelt, lees je in{" "}
        <Link href="/inzichten/geld-indelen-salaris-potjes-systeem" style={link} className="hover:underline">
          je salaris slim indelen
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wil je weten of je dagelijkse uitgaven passen bij je inkomen? De{" "}
        <CtaLink doel="analyse" href={analyseHref()} locatie="midden" style={link} className="hover:underline">
          gratis analyse
        </CtaLink>{" "}
        legt ze naast die van huishoudens zoals het jouwe, in ongeveer 3 minuten.
      </p>
    </>
  );
}
