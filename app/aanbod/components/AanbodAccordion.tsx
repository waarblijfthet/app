"use client";

import { useState } from "react";

const vragen = [
  {
    vraag: "Is dit hetzelfde als een budgetcoach of schuldhulp?",
    antwoord:
      "Nee. Schuldhulp en de meeste budgetcoaches werken met mensen die betalingsproblemen of schulden hebben. Ik werk met huishoudens die alles op tijd betalen, niets geks doen en toch structureel niets overhouden. Betaal je alles netjes op tijd maar snap je niet waarom er niets overblijft, dan zit je in de groep waarvoor ik werk.",
  },
  {
    vraag: "Ik heb geen schulden maar ook geen spaargeld. Is dit dan iets voor mij?",
    antwoord:
      "Ja, dat is de situatie waar ik voor ben. Geen crisis en ook geen rust. Wat ik doe is uitzoeken waar het naartoe gaat en dat opschrijven met de reden erbij. Of het daarna verandert, hangt af van wat je met dat rapport doet, en dat kan ik niet voor je beloven.",
  },
  {
    vraag: "Wat kost het, en waarom kost een kwartier bellen dan niets?",
    antwoord:
      "Het geldrapport kost 49 euro, eenmalig. Een kwartier kennismaken kost niets. Dat verschil zit niet in mijn goedheid maar in wat er gebeurt: in dat kwartier leg ik uit hoe ik werk en kijk ik niet naar jouw cijfers. Zodra het over jouw eigen bedragen gaat, is het werk, en werk breng ik in rekening. Dat is ook precies de grens die de wet trekt.",
  },
  {
    vraag: "Mag ik zien wat ik koop voordat ik betaal?",
    antwoord:
      "Ja, en dat vind ik ook niet meer dan normaal. Op de pagina Rapporten staan vijf complete rapporten van echte klanten, gepubliceerd met hun toestemming. Je leest hun cijfers, wat ze vooraf zelf dachten, wat ik erop schreef en wat er drie tot vier maanden later was veranderd. Namen zijn weggelaten, de bedragen zijn onveranderd.",
  },
  {
    vraag: "Geef je advies over beleggen, hypotheken of pensioen?",
    antwoord:
      "Nee. Ik kijk naar wat er maandelijks binnenkomt en waar het heen gaat. Over financiële producten geef ik geen advies en ik noem ook geen aanbieders. Wil je dat wel, dan heb je iemand met een vergunning nodig.",
  },
  {
    vraag: "Ben je gecertificeerd financieel adviseur?",
    antwoord:
      "Nee. Ik ben geen gecertificeerd financieel adviseur en ik val niet onder de AFM-vergunningplicht, omdat ik niet over financiële producten adviseer. Wat ik doe is rekenen en opschrijven: waar gaat het heen, waar lekt het weg en wat zou ik eraan doen. Ik verdien zelf goed en heb jarenlang niet begrepen waarom het nooit klopte. Dat is de reden dat ik dit doe.",
  },
  {
    vraag: "Wat gebeurt er met mijn gegevens?",
    antwoord:
      "Je vult de analyse in en stuurt optioneel een paar recente bankafschriften mee. Daarin mag je alles wegstrepen wat er voor mij niet toe doet: rekeningnummers, namen van andere mensen en betalingen die over iemand anders gaan. Ik heb de bedragen en de soort uitgave nodig, niet bij wie je hebt gepind. Ik ben de enige die ze inziet. Het rapport komt als PDF per e-mail, alleen naar jou. Direct na het versturen verwijder ik je afschriften en je analysegegevens. Je hoeft daar niet om te vragen en er blijft niets bewaard.",
  },
  {
    vraag: "Wat als er bij mij niets uit komt?",
    antwoord:
      "Dat kan gebeuren en dan zeg ik dat. Ik beloof niet dat er geld te vinden is. Vaker is de uitkomst dat je zwart op wit ziet dat het klopt, of dat het bedrag dat ontbreekt veel kleiner is dan het voelde. Bij twee van de vijf echte rapporten op deze site was de conclusie dat er niets te repareren viel, en bij de andere drie was het ontbrekende bedrag kleiner dan de klant vooraf dacht.",
  },
];

export function AanbodAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {vragen.map((v, i) => (
        <div
          key={i}
          style={{ borderBottom: "1px solid #E6E9E7" }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left py-5 gap-4"
            style={{ cursor: "pointer" }}
          >
            <span
              className="font-body"
              style={{ fontWeight: 500, color: "#16211F", fontSize: "1rem" }}
            >
              {v.vraag}
            </span>
            <span
              className="flex-shrink-0 transition-transform duration-200"
              style={{
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                color: "#8B958F",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </button>

          {open === i && (
            <p
              className="font-body pb-5"
              style={{
                color: "#4A5A56",
                fontSize: "0.9rem",
                lineHeight: 1.8,
              }}
            >
              {v.antwoord}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
