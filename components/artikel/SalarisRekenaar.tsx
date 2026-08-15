"use client";

import { useState } from "react";
import Link from "next/link";
import { rapportVoorSlug, AANTAL_ZONDER_LEK, RAPPORTEN } from "@/lib/rapporten-data";

/**
 * Rekenaar boven de vouw op het salarisartikel.
 *
 * Reden (30-jul-2026): vijf echte ICP-reacties en vier persona-toetsen wezen
 * allemaal op dezelfde as. Niet het bedrag is de drempel maar het huishouden.
 * Twee persona's zeiden expliciet dat ze een verschil van 9 tot 15 procent in
 * het inkomen zonder nadenken omrekenen; alle vier vielen op de samenstelling.
 * Vandaar: geen artikel per salarisbedrag, maar één rekenaar die elk bedrag en
 * elk huishouden aankan, in het eerste scherm, met de zoekvraag als startstand.
 *
 * De vier velden zijn precies de variabelen waarmee lib/benchmarks.ts rekent
 * sinds de herijking van 30-jul: inkomen, aantal volwassenen, aantal kinderen
 * en autosituatie. Huur of koop is er bewust NIET bij: dat bepaalde de
 * woonlast vroeger, maar sinds de herijking is huishoudgrootte de variabele en
 * huur of koop niet meer. Een veld dat de uitkomst niet verandert vragen we
 * niet. Zie docs/persona-toets-salarisartikel-en-varianten-30-jul-2026.md.
 */

const BASIS_TWEE = 700;
const BASIS_EEN = 475;
const PER_KIND_BOOD = 150;
const PER_KIND_KOSTEN = 190;
const ENERGIE = 200;
const INTERNET = 62;
const LOKALE_LASTEN = 95;
const ABONNEMENTEN = 150;
const VERVOER: Record<string, number> = { geen: 80, eigen: 350, twee: 650, zakelijk: 0 };

const euro = (n: number) => "€" + Math.round(n).toLocaleString("nl-NL");

const VRIJETIJD_PCT = 0.1;

const AUTO_LABELS: Record<string, string> = {
  geen: "Geen auto",
  eigen: "Eén auto",
  twee: "Twee auto's",
  zakelijk: "Auto van de zaak",
};

const euroSigned = (n: number) => (n < 0 ? "-" + euro(Math.abs(n)) : euro(n));

/**
 * Lezersfeedback (15-aug-2026) op het salarisartikel: na de rekenaar weet je wat
 * normaal is, maar niet waarom jij daarvan afwijkt. Dit gezin is het bewijs dat
 * de rekenaar zelf noemt: zij dachten vooraf aan boodschappen en de kinderen, en
 * dat bleek niet de oorzaak. Bron: lib/rapporten-data.ts, werkregel 4 — nooit een
 * cijfer of citaat over een echte klant uit het geheugen typen.
 */
const CASE_BOODSCHAPPEN_NIET_HET_PROBLEEM = rapportVoorSlug("tweeverdieners-drie-kinderen");

interface Props {
  /** Startbedrag van de schuif. Elk artikel opent op zijn eigen zoekvraag. */
  startInkomen?: number;
  startVolwassenen?: 1 | 2;
  startKinderen?: number;
  startAuto?: string;
  /** Eerste regel boven de rekenaar, per artikel anders. */
  kop?: string;
  intro?: string;
}

export default function SalarisRekenaar({
  startInkomen = 4000,
  startVolwassenen = 2,
  startKinderen = 2,
  startAuto = "eigen",
  kop = "Kort antwoord: ja, €4.000 netto is een goed salaris. Modaal is ongeveer €3.100.",
  intro = "Maar \u201cgoed\u201d zegt niets over wat er bij jou overblijft, en daar kwam je waarschijnlijk voor. Zet je eigen bedrag en huishouden hieronder, dan zie je wat ik bij een huishouden als het jouwe zou verwachten.",
}: Props) {
  const [inkomen, setInkomen] = useState(startInkomen);
  const [volwassenen, setVolwassenen] = useState<1 | 2>(startVolwassenen);
  const [kinderen, setKinderen] = useState(startKinderen);
  const [auto, setAuto] = useState(startAuto);
  const [wisselend, setWisselend] = useState(false);
  const [werkelijkOver, setWerkelijkOver] = useState("");

  const alleen = volwassenen === 1;
  const woonlast = Math.round(inkomen * (alleen ? 0.33 : 0.25));
  const wonen = woonlast + ENERGIE + INTERNET + LOKALE_LASTEN;
  const boodschappen = (alleen ? BASIS_EEN : BASIS_TWEE) + kinderen * PER_KIND_BOOD;
  const verzekeringen = 148 * volwassenen + 120;
  const vervoer = VERVOER[auto];
  const kinderkosten = kinderen * PER_KIND_KOSTEN;
  const vrijetijd = Math.round(inkomen * VRIJETIJD_PCT);

  // Het verwachte bedrag is het inkomen min de posten die bij dit huishouden
  // horen, niet een percentage van het inkomen. Anders verandert het hoofdgetal
  // niet als je van "alleen" naar "gezin met drie kinderen" schakelt, en dat is
  // precies de as waar het bij deze bezoekers om gaat.
  const somPosten =
    wonen + boodschappen + vervoer + verzekeringen + ABONNEMENTEN + kinderkosten + vrijetijd;
  const verwachtVrij = inkomen - somPosten;

  const werkelijk = werkelijkOver.replace(/[^0-9]/g, "");
  const heeftWerkelijk = werkelijk.length > 0;
  const gat = heeftWerkelijk ? verwachtVrij - Number(werkelijk) : 0;

  const analyseHref =
    `/analyse?inkomen=${inkomen}&volwassenen=${volwassenen}` +
    `&kinderen=${kinderen}&auto=${auto === "twee" ? "eigen" : auto}` +
    (auto === "twee" ? "&tweedeauto=1" : "");

  return (
    <div
      className="rounded-2xl p-5 sm:p-6 mb-8"
      style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}
    >
      <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>
        {kop}
      </p>
      <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
        {intro}
      </p>

      <div className="rounded-xl p-4 mb-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <label className="block font-body text-sm mb-1" style={{ color: "#16211F", fontWeight: 500 }}>
          Netto per maand dat binnenkomt, samen
        </label>
        <p className="font-body text-xs mb-2" style={{ color: "#8B958F" }}>
          Alle inkomens bij elkaar, plus toeslagen en eventuele teruggave hypotheekrente.
        </p>
        <div className="flex items-center gap-3 mb-3">
          <span className="font-display" style={{ fontSize: "1.9rem", fontWeight: 300, color: "#16211F" }}>
            {euro(inkomen)}
          </span>
        </div>
        <input
          type="range"
          min={2000}
          max={10000}
          step={50}
          value={inkomen}
          onChange={(e) => setInkomen(Number(e.target.value))}
          className="w-full accent-[#0B7A6E]"
          aria-label="Netto huishoudinkomen per maand"
        />

        <div className="mt-4 space-y-3">
          <Rij label="Volwassenen">
            {([1, 2] as const).map((v) => (
              <Chip key={v} actief={volwassenen === v} onClick={() => setVolwassenen(v)}>
                {v === 1 ? "Alleen" : "Samen"}
              </Chip>
            ))}
          </Rij>
          <Rij label="Kinderen thuis">
            {[0, 1, 2, 3].map((k) => (
              <Chip key={k} actief={kinderen === k} onClick={() => setKinderen(k)}>
                {k === 3 ? "3 of meer" : k}
              </Chip>
            ))}
          </Rij>
          <Rij label="Vervoer">
            {Object.keys(VERVOER).map((a) => (
              <Chip key={a} actief={auto === a} onClick={() => setAuto(a)}>
                {AUTO_LABELS[a]}
              </Chip>
            ))}
          </Rij>
        </div>
      </div>

      {/* Uitkomst */}
      <div className="rounded-xl p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid #D6E5E0" }}>
        <p className="font-body text-xs uppercase tracking-widest mb-1" style={{ color: "#0B7A6E" }}>
          Bij een huishouden als het jouwe verwacht ik
        </p>
        <p
          className="font-display mb-1"
          style={{ fontSize: "2.2rem", fontWeight: 300, color: verwachtVrij < 0 ? "#B03A2E" : "#16211F", lineHeight: 1.1 }}
        >
          {verwachtVrij < 0 ? "-" + euro(Math.abs(verwachtVrij)) : euro(verwachtVrij)}
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56" }}>
          {verwachtVrij < 0
            ? "per maand tekort. Bij dit inkomen en dit huishouden komt de rekensom niet uit, en dat is precies waarom dit artikel bestaat: het bedrag is goed, de opdracht is te groot."
            : "per maand over, na alle vaste lasten en dagelijkse uitgaven."}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-4">
          {[
            ["Wonen, energie en lasten", wonen],
            ["Boodschappen", boodschappen],
            ["Vervoer", vervoer],
            ["Verzekeringen", verzekeringen],
            ["Abonnementen", ABONNEMENTEN],
            ["Vrije tijd", vrijetijd],
            ...(kinderen > 0 ? [["Opvang, school en sport", kinderkosten] as [string, number]] : []),
          ].map(([label, bedrag]) => (
            <div key={label as string} className="flex justify-between gap-2 py-1" style={{ borderBottom: "1px solid #F0F3F1" }}>
              <span className="font-body text-xs" style={{ color: "#8B958F" }}>{label}</span>
              <span className="font-body text-xs tabular-nums" style={{ color: "#4A5A56" }}>{euro(bedrag as number)}</span>
            </div>
          ))}
        </div>

        <label className="block font-body text-sm mb-1" style={{ color: "#16211F", fontWeight: 500 }}>
          En wat blijft er bij jou werkelijk over? (optioneel)
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={werkelijkOver}
          onChange={(e) => setWerkelijkOver(e.target.value)}
          placeholder="bijv. 150"
          className="w-full rounded-lg px-3 py-2 font-body text-sm"
          style={{ border: "1px solid #E6E9E7", color: "#16211F", outline: "none" }}
        />

        {heeftWerkelijk && (
          // Reader-feedback 15-aug-2026: eerst het verschil expliciet maken (Verwacht/
          // Bij jou/Verschil), dan pas de vraag "waarom" en de Geldscan-CTA. Zie ook
          // docs/persona-toets-cta-positie-artikelen-30-jul-2026.md: het koopmoment ligt
          // ná het eigen getal van de lezer, niet na het algemene antwoord.
          <div className="mt-3 rounded-lg p-3" style={{ backgroundColor: gat > 50 ? "#FDF3E3" : "#E7F1EE" }}>
            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div>
                <p className="font-body text-[10px] uppercase tracking-wide" style={{ color: "#8B958F" }}>
                  Verwacht
                </p>
                <p className="font-display tabular-nums" style={{ fontSize: "1.05rem", color: "#16211F" }}>
                  {euroSigned(verwachtVrij)}
                </p>
              </div>
              <div>
                <p className="font-body text-[10px] uppercase tracking-wide" style={{ color: "#8B958F" }}>
                  Bij jou
                </p>
                <p className="font-display tabular-nums" style={{ fontSize: "1.05rem", color: "#16211F" }}>
                  {euroSigned(Number(werkelijk))}
                </p>
              </div>
              <div>
                <p className="font-body text-[10px] uppercase tracking-wide" style={{ color: "#8B958F" }}>
                  Verschil
                </p>
                <p
                  className="font-display tabular-nums"
                  style={{ fontSize: "1.05rem", color: gat > 50 ? "#B03A2E" : "#0B7A6E" }}
                >
                  {euro(Math.abs(gat))}
                </p>
                <p className="font-body text-[10px]" style={{ color: "#8B958F" }}>
                  {gat > 50 ? "per maand te weinig" : gat < -50 ? "meer dan verwacht" : "komt overeen"}
                </p>
              </div>
            </div>

            {gat > 50 ? (
              <p className="font-body font-medium text-sm mb-1" style={{ color: "#92600A" }}>
                Er ontbreekt ongeveer {euro(gat)} per maand, {euro(gat * 12)} per jaar.
              </p>
            ) : gat < -50 ? (
              <p className="font-body font-medium text-sm mb-1" style={{ color: "#0B7A6E" }}>
                Je houdt ongeveer {euro(Math.abs(gat))} per maand meer over dan ik bij dit huishouden zou verwachten.
              </p>
            ) : (
              <p className="font-body font-medium text-sm mb-1" style={{ color: "#0B7A6E" }}>
                Dat is ongeveer wat ik bij jouw situatie zou verwachten.
              </p>
            )}
            <p className="font-body text-sm mb-3" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
              {gat > 50
                ? "Dat verschil verklaart de rekenaar niet. Daarvoor moet je naar je hele financiële situatie kijken."
                : gat < -50
                ? "Ook dat verklaart de rekenaar niet: of dat komt doordat je al een systeem hebt, of doordat er ergens ruimte is die je nog niet gebruikt, weet je pas als je verder kijkt dan dit huishouden-gemiddelde."
                : "Voelt het toch krap, dan gaat het waarschijnlijk niet over je uitgaven maar over wat je tegelijk wilt: sparen, een buffer opbouwen en je leven blijven leiden zoals nu. Ook dat verklaart de rekenaar hierboven niet."}
            </p>

            {CASE_BOODSCHAPPEN_NIET_HET_PROBLEEM && (
              <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E6E9E7" }}>
                <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.6 }}>
                  &ldquo;{CASE_BOODSCHAPPEN_NIET_HET_PROBLEEM.vermoeden}&rdquo; dacht een gezin met drie kinderen dat ik
                  doorrekende, vooraf ook. Mijn conclusie: &ldquo;{CASE_BOODSCHAPPEN_NIET_HET_PROBLEEM.uitkomstKop}.&rdquo;{" "}
                  <Link
                    href={`/rapporten/${CASE_BOODSCHAPPEN_NIET_HET_PROBLEEM.slug}`}
                    className="hover:underline"
                    style={{ color: "#0B7A6E" }}
                  >
                    Lees hun rapport
                  </Link>
                  .
                </p>
              </div>
            )}

            <p className="font-body text-xs mb-4" style={{ color: "#5A6B66" }}>
              Niet elke Geldscan vindt een lek. Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} gezinnen die ik
              doorrekende was de conclusie dat er niets te repareren viel &mdash; dan hoor je dat ook gewoon terug.
            </p>

            <p className="font-body font-medium text-sm mb-3" style={{ color: "#16211F" }}>
              De rekenaar hierboven vertelt je dát je afwijkt. De Geldscan zoekt uit waarom.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/geldscan" className="btn-primary text-center">
                Laat mij uitzoeken waar het verschil zit{" "}&rarr;{" "}€49
              </Link>
              <Link
                href={analyseHref}
                className="inline-flex items-center justify-center font-body text-sm font-medium"
                style={{ color: "#16211F", border: "1.5px solid #16211F", borderRadius: "4px", padding: "0.75rem 1.25rem", textDecoration: "none" }}
              >
                Eerst gratis zelf kijken &rarr;
              </Link>
            </div>
          </div>
        )}

        {!heeftWerkelijk && (
          <p className="font-body text-sm mt-3 text-center" style={{ color: "#5A6B66" }}>
            Vul hierboven in wat je zelf overhoudt, dan zie je meteen of &mdash; en waarom &mdash; je afwijkt.{" "}
            <Link href={analyseHref} className="hover:underline" style={{ color: "#0B7A6E" }}>
              Nog niet zover? Eerst gratis zelf kijken &rarr;
            </Link>
          </p>
        )}

        <label
          className="font-body flex items-start gap-2 mt-4"
          style={{ fontSize: "0.85rem", color: "#4A5A56", cursor: "pointer", lineHeight: 1.5 }}
        >
          <input
            type="checkbox"
            checked={wisselend}
            onChange={(e) => setWisselend(e.target.checked)}
            style={{ marginTop: "0.2rem", accentColor: "#0B7A6E", width: "1rem", height: "1rem", flexShrink: 0 }}
          />
          <span>Mijn inkomen wisselt sterk per maand</span>
        </label>

        {wisselend && (
          <p className="font-body text-sm mt-2" style={{ color: "#4A5A56", fontWeight: 300, lineHeight: 1.7 }}>
            Dan is deze rekensom bij jou een gemiddelde en niet je werkelijkheid. Een maand van 8.000 en een
            maand van 2.400 middelen elkaar op papier uit, maar niet in je gedrag, en een belastingpot hoort
            hier helemaal niet in. Dit is precies wat ik hier niet kan uitrekenen en in een rapport wel, omdat
            je daar je laagste en hoogste maand opschrijft.{" "}
            <Link href="/rapporten/zzp-wisselend-inkomen" className="hover:underline" style={{ color: "#0B7A6E" }}>
              Zie wat er bij een zzp&apos;er uitkwam
            </Link>
            .
          </p>
        )}
      </div>

      <p className="font-body text-xs mt-3 mb-0" style={{ color: "#5A6B66" }}>
        Vergelijkingsbedragen op basis van de vijf huishoudens die ik zelf heb doorgerekend, zie{" "}
        <Link href="/rapporten" className="hover:underline" style={{ color: "#0B7A6E" }}>
          Rapporten
        </Link>
        . Dit is een vuistregel, geen norm: hij weet niets van de leeftijd van je kinderen, je regio,
        alimentatie of hoeveel je op je huis hebt afgelost.
      </p>
    </div>
  );
}

function Rij({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-body text-xs mb-1.5" style={{ color: "#8B958F" }}>{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ actief, onClick, children }: { actief: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actief}
      className="rounded-full font-body text-sm transition-colors"
      style={{
        padding: "0.4rem 0.85rem",
        backgroundColor: actief ? "#16211F" : "#FFFFFF",
        color: actief ? "#FFFFFF" : "#4A5A56",
        border: `1px solid ${actief ? "#16211F" : "#E6E9E7"}`,
      }}
    >
      {children}
    </button>
  );
}
