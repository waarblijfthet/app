import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { analyseHref } from "@/lib/cta";
import {
  TARIEVEN,
  TARIEVEN_OPGEHAALD_TEKST,
  AANTAL_AANBIEDERS,
  BAND_EENMALIG,
  BAND_TRAJECT,
  BAND_UUR,
  BTW_LABEL,
  euroTarief,
  euroOngeveer,
  prijsInclBtw,
  BRON_GEMEENTE_OSS,
  BRON_REGELHULP,
  BRON_VERGOEDINGEN_PERSONAL,
  BRON_WIE_BETAALT_HERMANS,
} from "@/lib/budgetcoach-tarieven";

/**
 * Wat kost een budgetcoach? Herschreven op 25-sep-2026 (plan:
 * docs/plan-coach-termen-ranken-25-sep-2026.md, item 2).
 *
 * Doeltermen: wat kost een budgetcoach, budgetcoach kosten, wie betaalt een
 * budgetcoach, is een budgetcoach gratis, wat kost een financieel coach.
 * Intentiescheiding: deze pagina gaat over de prijs. Wat een budgetcoach doet
 * staat op verschil-budgetcoach-financieel-coach, of het iets is zonder
 * schulden op kan-iemand-naar-mijn-financien-kijken.
 *
 * Elk bedrag komt uit lib/budgetcoach-tarieven.ts, opgehaald op de sites van
 * de aanbieders zelf. De vroegere bandbreedtes (€60 tot €150 per uur, €250 tot
 * €800) hadden geen bron en zijn weg.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;
const th = { padding: "0.6rem 0.75rem 0.6rem 0", color: "#16211F", fontWeight: 500 } as const;
const td = { padding: "0.6rem 0.75rem 0.6rem 0", verticalAlign: "top" } as const;

function TarievenTabel({ soort }: { soort: "eenmalig" | "traject" | "uur" }) {
  const regels = TARIEVEN.filter((t) => t.soort === soort).sort((a, b) => prijsInclBtw(a) - prijsInclBtw(b));
  return (
    <div style={{ overflowX: "auto", marginBottom: "1.5rem" }}>
      <table className="font-body" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.92rem" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #E6E9E7", textAlign: "left" }}>
            <th style={th}>Aanbieder</th>
            <th style={th}>Wat je krijgt</th>
            <th style={{ ...th, whiteSpace: "nowrap" }}>Prijs</th>
          </tr>
        </thead>
        <tbody>
          {regels.map((t) => (
            <tr key={t.aanbieder + t.product} style={{ borderBottom: "1px solid #E6E9E7" }}>
              <td style={{ ...td, fontWeight: 400 }}>
                <a href={t.url} target="_blank" rel="noopener noreferrer" style={link} className="hover:underline">
                  {t.aanbieder}
                </a>
              </td>
              <td style={{ ...td, color: "#4A5A56" }}>
                {t.product}: {t.omschrijving}
              </td>
              <td style={{ ...td, whiteSpace: "nowrap" }}>
                {euroTarief(t.prijs)}
                <br />
                <span style={{ fontSize: "0.8rem", color: "#8B958F" }}>{BTW_LABEL[t.btw]}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function WatKostEenFinancieelCoach() {
  return (
    <>
      <p style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Een budgetcoach kost bij de {AANTAL_AANBIEDERS} aanbieders die hun prijs publiceren en die ik heb
        bekeken {euroTarief(BAND_EENMALIG.min)} tot ongeveer {euroOngeveer(BAND_EENMALIG.max)} voor een
        eenmalige check, {euroTarief(BAND_TRAJECT.min)} tot ongeveer {euroOngeveer(BAND_TRAJECT.max)} voor een
        traject van een paar maanden, en {euroTarief(BAND_UUR.min)} tot {euroTarief(BAND_UUR.max)} per uur. Bij
        een deel van hen is de kennismaking gratis. Sommige gemeenten bieden budgetcoaching gratis aan, ook als
        je geen schulden hebt.
      </p>
      <p style={{ ...p, fontSize: "0.9rem", color: "#4A5A56" }}>
        Cijfers bijgewerkt op {TARIEVEN_OPGEHAALD_TEKST}. Alle prijzen komen van de eigen sites van de
        aanbieders, op die dag door mij geopend. Het is een steekproef van {AANTAL_AANBIEDERS} aanbieders, geen
        landelijk gemiddelde. Waar een prijs exclusief btw staat, reken ik voor de bandbreedte 21 procent
        erbij.
      </p>

      <h2 style={h2}>Wat kost een eenmalige check bij een budgetcoach?</h2>
      <p style={p}>
        {BAND_EENMALIG.aantalAanbieders} van de {AANTAL_AANBIEDERS} aanbieders hebben een losse check of een
        enkel gesprek, onder namen als quick scan, financiële check of kickstartsessie. De prijs loopt van{" "}
        {euroTarief(BAND_EENMALIG.min)} voor een online gesprek van een uur tot ongeveer{" "}
        {euroOngeveer(BAND_EENMALIG.max)} inclusief btw voor één sessie aan huis. Wat erin zit verschilt: soms
        alleen een gesprek, soms een budgetplan of een jaarplan erbij.
      </p>
      <TarievenTabel soort="eenmalig" />

      <h2 style={h2}>Wat kost een budgetcoachtraject?</h2>
      <p style={p}>
        Een traject betekent meerdere gesprekken over een paar maanden, met een plan en vaak nazorg. Bij de{" "}
        {BAND_TRAJECT.aantalAanbieders} aanbieders met een trajectprijs kost dat van{" "}
        {euroTarief(BAND_TRAJECT.min)} voor drie online gesprekken tot ongeveer{" "}
        {euroOngeveer(BAND_TRAJECT.max)} inclusief btw voor een lang traject van vier tot zes maanden.
      </p>
      <TarievenTabel soort="traject" />

      <h2 style={h2}>Wat kost een budgetcoach per uur?</h2>
      <p style={p}>
        Drie aanbieders noemen een los uurtarief: van {euroTarief(BAND_UUR.min)} tot{" "}
        {euroTarief(BAND_UUR.max)}. De meeste werken liever met een pakket, omdat vooraf niet duidelijk is
        hoeveel uur je nodig hebt.
      </p>
      <TarievenTabel soort="uur" />

      <h2 style={h2}>Is een budgetcoach gratis?</h2>
      <p style={p}>
        Soms wel. Bij sommige gemeenten is budgetcoaching gratis, en niet altijd alleen voor wie schulden
        heeft. De gemeente Oss schrijft bijvoorbeeld dat budgetcoaching &quot;altijd gratis&quot; is
        en dat het niet uitmaakt of je weinig of veel verdient (
        <a href={BRON_GEMEENTE_OSS} target="_blank" rel="noopener noreferrer" style={link} className="hover:underline">
          gemeente Oss
        </a>
        , geraadpleegd {TARIEVEN_OPGEHAALD_TEKST}). Dat verschilt per gemeente, dus vraag het bij die van jou.
        Het ministerie van VWS noemt de budgetcoach als een van de vormen van hulp bij geldzaken (
        <a href={BRON_REGELHULP} target="_blank" rel="noopener noreferrer" style={link} className="hover:underline">
          Regelhulp
        </a>
        ).
      </p>
      <p style={p}>
        Daarnaast is een kennismakingsgesprek bij een deel van de aanbieders in de tabellen gratis,
        bijvoorbeeld bij Personal Budgetcoach, Mevrouw Budget en FH Budgetcoach. Kijk bij de aanbieder zelf
        wat er wel en niet onder valt.
      </p>

      <h2 style={h2}>Wie betaalt een budgetcoach?</h2>
      <p style={p}>
        Meestal betaal je zelf. De aanbieders noemen daarnaast deze routes, die per situatie verschillen:
      </p>
      <ul className="space-y-2 mb-5" style={{ paddingLeft: "1.25rem" }}>
        <li className="font-body" style={{ listStyleType: "disc", fontWeight: 300 }}>
          <strong>De werkgever</strong>, bijvoorbeeld via de werkkostenregeling of een opleidingsbudget (
          <a href={BRON_VERGOEDINGEN_PERSONAL} target="_blank" rel="noopener noreferrer" style={link} className="hover:underline">
            Personal Budgetcoach
          </a>
          ,{" "}
          <a href={BRON_WIE_BETAALT_HERMANS} target="_blank" rel="noopener noreferrer" style={link} className="hover:underline">
            Hermans budget coaching
          </a>
          ).
        </li>
        <li className="font-body" style={{ listStyleType: "disc", fontWeight: 300 }}>
          <strong>De gemeente</strong>, met een eigen budgetcoach of via de Wmo of bijzondere bijstand.
        </li>
        <li className="font-body" style={{ listStyleType: "disc", fontWeight: 300 }}>
          <strong>Een persoonsgebonden budget</strong>, als budgetcoaching in het zorgplan past.
        </li>
      </ul>
      <p style={p}>
        Of een van die routes voor jou openstaat, hangt af van je werkgever, je gemeente en je situatie. Vraag
        het na voordat je zelf betaalt.
      </p>

      <h2 style={h2}>Wat kost een financieel coach?</h2>
      <p style={p}>
        Budgetcoach, financieel coach en geldcoach zijn geen beschermde titels. Wie zich financieel coach
        noemt, richt zich soms meer op gedrag en doelen dan op het maandbudget, maar dat verschilt per
        persoon. Het verschil leg ik uit in{" "}
        <Link href="/inzichten/verschil-budgetcoach-financieel-coach" style={link} className="hover:underline">
          budgetcoach, geldcoach of financieel coach
        </Link>
        . Gaat het om een hypotheek, beleggen of pensioen, dan heb je een financieel adviseur nodig; wat die
        kost staat in{" "}
        <Link href="/inzichten/wat-kost-een-financieel-adviseur" style={link} className="hover:underline">
          wat kost een financieel adviseur
        </Link>
        .
      </p>

      <h2 style={h2}>Waar zit het verschil in prijs?</h2>
      <p style={p}>
        Vier dingen verklaren de spreiding in de tabellen. Online of aan huis: wie aan huis komt, rekent vaak
        reiskosten boven 10 tot 15 kilometer, bij de aanbieders hier meestal €0,23 per kilometer. De duur: een uur of drie uur. Wat je
        meekrijgt: alleen een gesprek, of ook een schriftelijk budgetplan. En de btw: een deel van de
        aanbieders rekent geen btw, een ander deel noemt prijzen exclusief btw.
      </p>
      <p style={p}>
        Wil je eerst weten of je uitgaven ergens afwijken voordat je iemand betaalt? De{" "}
        <CtaLink doel="analyse" href={analyseHref()} locatie="midden" style={link} className="hover:underline">
          gratis analyse
        </CtaLink>{" "}
        zet je uitgaven naast die van vergelijkbare huishoudens. En of een budgetcoach iets voor je is als je
        geen schulden hebt, lees je in{" "}
        <Link href="/inzichten/kan-iemand-naar-mijn-financien-kijken" style={link} className="hover:underline">
          budgetcoach zonder schulden
        </Link>
        .
      </p>
    </>
  );
}
