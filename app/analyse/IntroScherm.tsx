"use client";

import { RICHTING_LABEL, RICHTING_PIL, type Richting } from "./components/vergelijking-labels";

/**
 * Het scherm vóór "Start mijn analyse" (7-sep-2026, conversieherziening).
 * Alleen dit bestand: de vragenflow, berekeningen en resultaatpagina staan
 * hier los van en blijven ongewijzigd. Doel is één ding: meer bezoekers laten
 * starten. Compact blijven staat boven compleet zijn, dus elk blok
 * beantwoordt precies één bezwaar en niets wordt twee keer gezegd.
 *
 * Vorige versie zei alleen "In 2 minuten zie je hoe jouw huishouden ervoor
 * staat." Een bezoeker die vanuit Google of een AI-antwoord landt weet dan
 * nog niet wát hij terugkrijgt, voor wie dit is, of wat het kost. Dat staat
 * er nu wel, in vaste volgorde: wat je krijgt, hoe dat eruitziet, voor wie
 * het is, wat het kost aan moeite. Pas daarna de knop.
 *
 * De voorbeeldweergave hieronder verzint geen cijfers. De richtinglabels en
 * kleuren komen rechtstreeks uit vergelijking-labels.ts, dezelfde bron als de
 * echte uitkomst. De balkjes zijn decoratief, zoals ook de rapportpreview op
 * /geldscan geen bedragen toont (zie Balk aldaar): dit is een vorm, geen
 * claim, en staat daarom niet in lib/rapporten-data.ts of onder harde
 * waarheidsregel 2.
 */

function VoorbeeldRegel({ label, richting }: { label: string; richting: Richting }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-[#E6E9E7] last:border-0">
      <span className="font-body text-sm text-text-soft">{label}</span>
      <span
        className={`font-body text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${RICHTING_PIL[richting]}`}
      >
        {RICHTING_LABEL[richting]}
      </span>
    </div>
  );
}

function VoorbeeldBalk({ label, breedte, sterk = false }: { label: string; breedte: string; sterk?: boolean }) {
  return (
    <div>
      <p className="font-body text-[11px] text-text-muted mb-1">{label}</p>
      <div className="h-2.5 bg-[#F0F3F1] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${sterk ? "bg-primary" : "bg-[#B2CCC6]"}`}
          style={{ width: breedte }}
        />
      </div>
    </div>
  );
}

/** Zes losse "waarom niet nu" bezwaren teruggebracht tot vier compacte blokken. */
export default function IntroScherm({ onStart }: { onStart: () => void }) {
  return (
    <div>
      {/* 1. Hero: concrete belofte, geen abstracte vraag. "Hoe doe jij het
          financieel?" liet te veel open, dus die zin staat hier niet meer. */}
      <h1 className="font-display font-light text-primary text-3xl sm:text-4xl leading-snug mb-3">
        Hoe staat jouw huishouden er financieel voor?
      </h1>
      <p className="text-text-soft font-body font-light text-base leading-relaxed mb-6">
        Vergelijk je financiële situatie met vergelijkbare huishoudens. Je ziet hoeveel
        financiële ruimte daar ongeveer bij past, en waar jouw situatie daarvan afwijkt.
      </p>

      <button type="button" onClick={onStart} className="btn-primary">
        Start mijn gratis analyse →
      </button>
      <p className="font-body text-text-muted text-xs mt-3 mb-10">
        ± 2 minuten &middot; anoniem &middot; geen bankgegevens
      </p>

      {/* 2. Wat krijg je, inclusief het antwoord op "waarom niet gewoon mijn
          bankapp": één vergelijking, geen twee aparte kopjes daarvoor. */}
      <div className="mb-10">
        <h2 className="font-display font-light text-primary text-xl sm:text-2xl leading-snug mb-3">
          Wat zie je na de analyse?
        </h2>
        <p className="text-text-soft font-body font-light text-sm leading-relaxed mb-4">
          Zie het als een gratis financiële check: geen algemeen advies, maar jouw situatie
          naast vergelijkbare huishoudens. Je ziet:
        </p>
        <ul className="space-y-2.5 mb-5">
          {[
            "Hoeveel financiële ruimte past bij een huishouden zoals dat van jou",
            "Wat je daarbinnen ongeveer zou moeten overhouden per maand",
            "Of, en waar, jouw situatie daarvan afwijkt",
            "Welke uitgaven opvallen, bijvoorbeeld boodschappen, wonen of vervoer",
          ].map((zin) => (
            <li
              key={zin}
              className="flex items-start gap-2.5 font-body text-sm text-text-soft leading-relaxed"
            >
              <span className="text-accent shrink-0 mt-0.5">✓</span>
              {zin}
            </li>
          ))}
        </ul>
        <p className="text-text-soft font-body font-light text-sm leading-relaxed">
          Een bedrag op zichzelf zegt weinig: 1.000 euro boodschappen kan voor het ene
          huishouden veel zijn en voor het andere niet. Daarom kijk ik niet alleen naar wat
          je uitgeeft, maar naar wat past bij een huishouden zoals dat van jou. Dat zie je
          niet door zelf in je bankapp te kijken.
        </p>
      </div>

      {/* 3. Tastbaar maken: geen interactieve demo, alleen een voorbeeldweergave
          op basis van de bestaande resultaatlogica. Geen cijfer hierin is echt. */}
      <div className="mb-10">
        <h2 className="font-display font-light text-primary text-xl sm:text-2xl leading-snug mb-3">
          Zo ziet je resultaat eruit
        </h2>
        <div className="card-base border border-[#E6E9E7]">
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="section-eyebrow">Voorbeeldweergave</span>
          </div>

          <p className="section-eyebrow mb-3">Geschatte financiële ruimte</p>
          <div className="space-y-3 mb-5">
            <VoorbeeldBalk label="Vergelijkbare huishoudens" breedte="64%" />
            <VoorbeeldBalk label="Jouw situatie" breedte="78%" sterk />
          </div>

          <div className="border-t border-[#E6E9E7] pt-4">
            <p className="section-eyebrow mb-1">Wat valt op</p>
            <VoorbeeldRegel label="Boodschappen" richting="hoger" />
            <VoorbeeldRegel label="Wonen" richting="rond" />
            <VoorbeeldRegel label="Vervoer" richting="lager" />
          </div>
        </div>
        <p className="font-body font-light text-text-muted text-xs mt-3 leading-relaxed">
          Voorbeeldweergave van de opbouw van je resultaat, geen echt huishouden.
        </p>
      </div>

      {/* 4. Herkenning: de vraag wordt beschreven, geen persona-label erop
          geplakt. */}
      <div className="mb-10">
        <h2 className="font-display font-light text-primary text-xl sm:text-2xl leading-snug mb-3">
          Voor wie is dit interessant?
        </h2>
        <p className="text-text-soft font-body font-light text-sm leading-relaxed mb-3">
          Deze analyse is vooral interessant als je:
        </p>
        <ul className="space-y-2">
          {[
            "een goed inkomen hebt, maar toch minder overhoudt dan je zou verwachten",
            "je weleens afvraagt waar je geld precies blijft",
            "wilt weten of je uitgaven eigenlijk hoog zijn",
            "wilt weten of je financieel ruim of krap zit",
            "jezelf wilt vergelijken met huishoudens die qua situatie op jou lijken",
          ].map((zin) => (
            <li
              key={zin}
              className="flex items-start gap-2.5 font-body text-sm text-text-soft leading-relaxed"
            >
              <span className="text-text-muted shrink-0 mt-1.5 block w-1 h-1 rounded-full bg-text-muted" />
              {zin}
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Lage inspanning en vertrouwen samen: allebei nemen ze weerstand
          weg vóór de knop, dus één blok in plaats van drie losse kopjes. */}
      <div className="mb-10 rounded-xl border border-[#E6E9E7] bg-[#F7F8F7] p-5 sm:p-6">
        <p className="text-text-soft font-body font-light text-sm leading-relaxed mb-3">
          Je hoeft hiervoor niet:
        </p>
        <ul className="space-y-2 mb-4">
          {[
            "je bank te koppelen",
            "exacte bedragen op te zoeken, een schatting is genoeg",
            "een account aan te maken",
            "iets te kopen of een gesprek te boeken",
          ].map((zin) => (
            <li
              key={zin}
              className="flex items-start gap-2.5 font-body text-sm text-text-soft leading-relaxed"
            >
              <span className="text-accent shrink-0 mt-0.5">✓</span>
              {zin}
            </li>
          ))}
        </ul>
        <p className="font-body font-light text-text-muted text-xs leading-relaxed pt-3 border-t border-[#E6E9E7]">
          Een paar korte vragen, ongeveer 2 minuten. Gratis, anoniem, geen bankkoppeling. Je
          hoeft na afloop niets te kopen.
        </p>
      </div>

      {/* 6. Herhaal-CTA: geen scroll terug nodig. */}
      <button type="button" onClick={onStart} className="btn-primary">
        Start mijn gratis analyse →
      </button>
      <p className="font-body text-text-muted text-xs mt-3">
        ± 2 minuten &middot; gratis &middot; anoniem
      </p>
    </div>
  );
}
