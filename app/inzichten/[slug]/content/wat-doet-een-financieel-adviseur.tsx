'use client';
import { useState } from "react";
import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

type Vraag = { tekst: string; opties: [string, string]; scores: [number, number] };

const vragen: Vraag[] = [
  {
    tekst: "Heb je een hypotheek nodig of wil je beleggen?",
    opties: ["Ja, dat is mijn vraag", "Nee, mijn geld is gewoon op"],
    scores: [2, 0],
  },
  {
    tekst: "Weet je waar je geld naartoe gaat?",
    opties: ["Nee, dat is precies het probleem", "Ja, maar ik wil het anders indelen"],
    scores: [0, 0],
  },
  {
    tekst: "Wat is je grootste zorg?",
    opties: ["Vermogen, pensioen of erfenis", "Ik wil gewoon meer overhouden elke maand"],
    scores: [2, 0],
  },
];

function AdviseurCheck() {
  const [antwoorden, setAntwoorden] = useState<number[]>([]);
  const [score, setScore] = useState<number | null>(null);

  function kiesOptie(vraagIndex: number, optieIndex: number) {
    const nieuw = [...antwoorden];
    nieuw[vraagIndex] = vragen[vraagIndex].scores[optieIndex];
    setAntwoorden(nieuw);
    if (nieuw.filter(v => v !== undefined).length === vragen.length) {
      setScore(nieuw.reduce((a, b) => a + b, 0));
    }
  }

  const klaar = antwoorden.filter(v => v !== undefined).length === vragen.length;

  return (
    <div className="rounded-xl border my-8" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "#E6E9E7" }}>
        <p className="font-body font-semibold text-sm" style={{ color: "#16211F" }}>Heb jij een financieel adviseur nodig?</p>
        <p className="font-body text-xs mt-0.5" style={{ color: "#8B958F" }}>Drie vragen, direct antwoord</p>
      </div>
      <div className="p-5 space-y-5">
        {vragen.map((v, qi) => (
          <div key={qi}>
            <p className="font-body text-sm font-medium mb-2.5" style={{ color: "#16211F" }}>{v.tekst}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {v.opties.map((opt, oi) => {
                const geselecteerd = antwoorden[qi] === v.scores[oi];
                return (
                  <button
                    key={oi}
                    onClick={() => kiesOptie(qi, oi)}
                    className="font-body text-sm text-left rounded-xl px-4 py-3 transition-all"
                    style={{
                      border: `1.5px solid ${geselecteerd ? "#16211F" : "#D9DEDC"}`,
                      backgroundColor: geselecteerd ? "#E7F1EE" : "white",
                      color: geselecteerd ? "#16211F" : "#4A5A56",
                      fontWeight: geselecteerd ? 600 : 400,
                      cursor: "pointer",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {klaar && score !== null && (
          <div className="rounded-xl p-4 mt-2" style={{
            backgroundColor: score >= 3 ? "#E7F1EE" : "#E7F1EE",
            border: `1.5px solid ${score >= 3 ? "#9CCFC4" : "#9CCFC4"}`,
          }}>
            {score >= 3 ? (
              <>
                <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>Je hebt waarschijnlijk een gecertificeerde adviseur nodig.</p>
                <p className="font-body text-sm" style={{ color: "#16211F" }}>
                  Voor hypotheek, beleggingen of pensioenadvies heb je een Wft-gecertificeerde adviseur nodig. Zoek op AFM-register of vergelijk via{" "}
                  <a href="https://www.independer.nl" target="_blank" rel="noopener noreferrer" style={{ color: "#0B7A6E" }}>Independer</a>.
                </p>
              </>
            ) : (
              <>
                <p className="font-body font-semibold text-sm mb-1" style={{ color: "#16211F" }}>Een eenmalig gesprek is voor jou waarschijnlijk genoeg.</p>
                <p className="font-body text-sm" style={{ color: "#16211F" }}>
                  Geen hypotheek of beleggingen, je wilt gewoon weten waar het geld blijft. Een{" "}
                  <Link href="/adviesgesprek" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">eenmalig financieel adviesgesprek van €125</Link>{" "}
                  geeft je dat inzicht zonder doorlopende kosten.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function WatDoetEenFinancieelAdviseur() {
  return (
    <div className="font-body text-text-soft" style={{ lineHeight: 1.75 }}>

      {/* ScanBox */}
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Wat een financieel adviseur echt doet, en waarvoor je er officieel één nodig hebt",
            "Wanneer je géén gecertificeerde adviseur nodig hebt (voor de meeste gezinnen geldt dit)",
            "Wat het verschil is tussen gereguleerd advies en onafhankelijke financiële coaching",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Hook */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F", fontSize: "1.05rem" }}>
        De meeste mensen denken dat een financieel adviseur voor hen is als ze een hypotheek nodig hebben of geld te beleggen hebben. Dat klopt, maar die twee groepen samen zijn lang niet iedereen. Er zijn veel meer mensen die hulp nodig hebben bij hun financiën en er nooit aan denken om een "financieel adviseur" te zoeken, omdat ze denken dat dat voor rijke mensen is.
      </p>
      <p style={p}>
        Dat misverstand kost mensen maandelijks geld. Want wie niet weet wat een financieel adviseur doet, en voor wie dat is, zoekt ook niet op het goede type hulp.
      </p>

      <h2 className="font-display" style={h2}>Wat een financieel adviseur officieel doet</h2>
      <p style={p}>
        In Nederland is "financieel adviseur" een breed begrip. De Wet financieel toezicht (Wft) regelt wie bepaalde adviezen mag geven. Voor drie specifieke gebieden is een Wft-vergunning verplicht:
      </p>
      <p style={p}>
        <strong>Hypotheek.</strong> Wil je een huis kopen of je hypotheek oversluiten? Dan moet de adviseur gecertificeerd zijn. Hij kijkt naar je inkomen, schulden, looptijd en risico, en adviseert welk product past bij jouw situatie.
      </p>
      <p style={p}>
        <strong>Beleggen en vermogensbeheer.</strong> Advies over aandelen, fondsen of vermogensbeheer valt onder een ander Wft-domein. Denk aan banken, vermogensbeheerders of zelfstandige adviseurs met de juiste vergunning.
      </p>
      <p style={p}>
        <strong>Pensioenverzekering en lijfrente.</strong> Wil je een pensioenproduct afsluiten of een bestaand product overdragen? Dan heb je ook een gecertificeerde adviseur nodig.
      </p>
      <p style={p}>
        Buiten deze drie gebieden is er geen vergunningsplicht. En dat is precies waar de verwarring zit.
      </p>

      <div className="rounded-xl p-5 my-6" style={{ backgroundColor: "#FEF9EC", border: "1.5px solid #E8C870" }}>
        <p className="font-body font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: "#92600A" }}>Wft vs. coaching</p>
        <p className="font-body text-sm" style={{ color: "#0A6A5F" }}>
          Een Wft-gecertificeerde adviseur is wettelijk aansprakelijk voor zijn advies en is geregistreerd bij de AFM. Een <Link href="/financieel-coach" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">financieel coach</Link> of budgetadviseur heeft die vergunning niet, en hoeft die ook niet te hebben, zolang hij geen producten adviseert. Dat maakt coaching goedkoper, maar ook minder geschikt voor complexe productbeslissingen.
        </p>
      </div>

      <h2 className="font-display" style={h2}>Voor wie is een financieel adviseur dan?</h2>
      <p style={p}>
        Kort gezegd: voor mensen met een specifieke productvraag. Hypotheek, beleggingsplan, pensioensplitsing bij scheiding, overlijdensrisicoverzekering. Als je weet dat je zo'n product nodig hebt, zoek dan een gecertificeerde adviseur via het{" "}
        <a href="https://www.afm.nl/nl-nl/consumenten/diensten-producten/financieel-advies/adviseurs-vergelijken" target="_blank" rel="noopener noreferrer" style={{ color: "#0B7A6E" }} className="hover:underline">AFM-register</a>.
      </p>
      <p style={p}>
        Maar voor de vraag "waarom blijft er nooit geld over?" of "hoe verdelen we onze inkomens eerlijk?" heb je dat niet nodig. Die vraag is geen productvraag, het is een structuurvraag. En die los je op met inzicht, niet met een verzekering.
      </p>

      <h2 className="font-display" style={h2}>Wat je wél nodig hebt als het geld "gewoon op is"</h2>
      <p style={p}>
        Iemand die goed verdient maar maandelijks toch krap zit, heeft geen hypotheekadviseur nodig. Die heeft iemand nodig die eerlijk naar het budget kijkt: wat komt er binnen, wat gaat er uit, waar zitten de afwijkingen, en wat zijn de drie meest concrete stappen?
      </p>
      <p style={p}>
        Dat is iets anders dan een financieel plan met pensioenprognoses en beleggingsrendementen. Het is concreet, praktisch, en levert direct resultaat op, niet over tien jaar, maar volgende maand.
      </p>

      <AdviseurCheck />

      <div className="rounded-xl p-5 my-6" style={{ backgroundColor: "#FEF9EC", border: "1.5px solid #E8C870" }}>
        <p className="font-body font-semibold text-xs uppercase tracking-wide mb-2" style={{ color: "#92600A" }}>De adviseur van je bank, let op dit verschil</p>
        <p className="font-body text-sm" style={{ color: "#0A6A5F" }}>
          Bankadviseurs zijn gecertificeerd, maar ze werken voor de bank. Ze adviseren producten van die bank, spaarrekeningen, verzekeringen, hypotheken, en verdienen soms provisie op wat je afsluit. Een onafhankelijke adviseur werkt niet voor een bank en wordt niet betaald op basis van wat je koopt. Vraag altijd hoe iemand wordt vergoed.
        </p>
      </div>

      <h2 className="font-display" style={h2}>Welke vragen kun je een financieel adviseur stellen?</h2>
      <p style={p}>
        Bij een gecertificeerde adviseur: alles rondom hypotheek, beleggingen, pensioenplanning, overlijdensrisico, of vermogensoverdracht.
      </p>
      <p style={p}>
        Bij een financieel coach of budgetadviseur: hoe je budget eruitziet, waarom je nooit iets overhoudt, hoe je een potjessysteem opzet, wat normaal is voor jouw inkomensgroep, en hoe je concrete doelen stelt voor sparen of schulden aflossen.
      </p>
      <p style={p}>
        Je kunt ook beide combineren: eerst grip op het maandbudget via een{" "}
        <Link href="/adviesgesprek" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">eenmalig adviesgesprek</Link>, daarna, als dat nodig blijkt, een gecertificeerde adviseur voor een specifiek product.
      </p>
      <p style={p}>
        Niet zeker wat jij nodig hebt?{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">Doe de analyse</Link>{" "}
       , die geeft in 5 minuten inzicht in je situatie en laat zien waar de grootste afwijking zit. Of bespreek het direct in een{" "}
        <Link href="/adviesgesprek" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">eenmalig financieel adviesgesprek van €125</Link>.
      </p>
    </div>
  );
}
