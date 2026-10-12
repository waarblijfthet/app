import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import LoonsverhogingSpoor from "@/components/artikel/LoonsverhogingSpoor";
import { rapportVoorSlug, RAPPORTEN, AANTAL_ZONDER_LEK } from "@/lib/rapporten-data";
import {
  ICP_BRONNEN,
  BRON_DATUM,
  CBS_CAO_LONEN_Q1_2026,
  CBS_CAO_LONEN_Q1_2026_REEEL,
  NIBUD_SPAARADVIES_PCT,
} from "@/lib/icp-bronnen";

/**
 * Herschreven 12-okt-2026 op de hoofdterm "lifestyle inflatie". De oude titel
 * zat op "meer verdienen en toch krap", een variant zonder zoekvolume: 6
 * vertoningen in 90 dagen. SERP: financefreaks, indeflatie, yieldfund, Reddit
 * r/DutchFIRE, edwin.nl, Dyme, allemaal blogs zonder eigen cijfers
 * (docs/serp-icp-zoekgedrag-12-okt-2026.md). URL blijft gelijk.
 *
 * Weggehaald: de bron "Modaal inkomen 2026 (CPB-kerncijfers)" wees naar
 * raisin.com, een affiliate, niet naar het CPB (CLAUDE.md 8.12).
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function Bron({ sleutel, tekst }: { sleutel: keyof typeof ICP_BRONNEN; tekst: string }) {
  return (
    <a href={ICP_BRONNEN[sleutel].url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
      {tekst}
    </a>
  );
}

export default function LifestyleInflatie() {
  const alleen = rapportVoorSlug("alleenstaand-huurwoning")!;
  const stel = rapportVoorSlug("stel-zonder-kinderen")!;
  const alleenEval = alleen.evaluatie.split(". ")[0];
  const stelEval = stel.evaluatie.split(". ").slice(0, 2).join(". ");

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Lifestyle inflatie is dat je uitgaven meestijgen met je inkomen, zodat er na een loonsverhoging niet meer
        overblijft dan ervoor. De cao-lonen lagen in het eerste kwartaal van 2026 {CBS_CAO_LONEN_Q1_2026} procent hoger
        dan een jaar eerder. Merk je dat op je loonstrook maar niet op je spaarrekening, dan heb je er waarschijnlijk
        last van.
      </p>

      <h2 className="font-display" style={h2}>Wat is lifestyle inflatie?</h2>
      <p className="font-body text-text-soft" style={p}>
        Je gaat meer verdienen, en zonder dat je het besluit gaat je maand mee. Een iets duurdere auto, vaker bestellen,
        een abonnement erbij, een verdere vakantie. Elke stap is klein en te verantwoorden. Samen zorgen ze ervoor dat
        een hoger inkomen niet tot meer ruimte leidt. Het Engelse woord is lifestyle creep; in het Nederlands zie je ook
        levensstijlinflatie.
      </p>

      <h2 className="font-display" style={h2}>Wat is het verschil tussen lifestyle inflatie en gewone inflatie?</h2>
      <p className="font-body text-text-soft" style={p}>
        Gewone inflatie is dat dezelfde boodschappen duurder worden. Lifestyle inflatie is dat je andere, duurdere
        dingen gaat kopen. Het eerste overkomt je, het tweede kies je, al voelt het niet zo. Een deel van je
        loonsverhoging gaat op aan het eerste: gecorrigeerd voor inflatie waren de cao-lonen in het eerste kwartaal van
        2026 {CBS_CAO_LONEN_Q1_2026_REEEL} procent hoger, tegen {CBS_CAO_LONEN_Q1_2026} procent zonder die correctie (
        <Bron sleutel="cbsCaoLonen" tekst={`CBS, geopend ${BRON_DATUM}`} />
        ). Alleen dat reële deel is echte nieuwe ruimte.
      </p>
      <EenvoudigeTabel
        koppen={["", "Gewone inflatie", "Lifestyle inflatie"]}
        rijen={[
          ["Wat er gebeurt", "Hetzelfde wordt duurder", "Je koopt duurder of meer"],
          ["Wie het bepaalt", "De prijzen", "Jijzelf, vaak zonder het te merken"],
          ["Waar je het ziet", "In het inflatiecijfer van het CBS", "Op je spaarrekening, die niet groeit"],
          ["Wat helpt", "Weinig, behalve een hoger inkomen", "Een deel van elke verhoging direct opzij"],
        ]}
      />

      <h2 className="font-display" style={h2}>Hoe weet ik of ik last heb van lifestyle inflatie?</h2>
      <p className="font-body text-text-soft" style={p}>
        Leg je inkomen en je sparen van een paar jaar terug naast die van nu. Is je inkomen gestegen en je sparen niet,
        dan is het verschil in je maand opgegaan. Reken het hieronder uit.
      </p>
      <LoonsverhogingSpoor />
      <p className="font-body text-text-soft" style={p}>
        Waar het dan zit, verschilt per huishouden. De alleenstaande in een huurwoning van wie ik een rapport
        schreef, zei achteraf: &ldquo;{alleenEval}.&rdquo;{" "}
        <Link href={`/rapporten/${alleen.slug}`} style={link} className="hover:underline">
          Lees haar rapport
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Is lifestyle inflatie erg?</h2>
      <p className="font-body text-text-soft" style={p}>
        Niet als je het kiest. Bij {AANTAL_ZONDER_LEK} van de {RAPPORTEN.length} huishoudens die ik doorrekende was er
        geen lek: het geld ging naar dingen die ze belangrijk vonden. Het stel zonder kinderen schreef na afloop: &ldquo;
        {stelEval}.&rdquo; Het wordt pas een probleem als je spaardoel en je levensstijl allebei blijven staan, terwijl er
        maar voor een van de twee ruimte is.
      </p>

      <h2 className="font-display" style={h2}>Hoe voorkom je lifestyle inflatie?</h2>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Zet bij elke verhoging eerst een deel apart.</strong> Voordat het nieuwe
          bedrag normaal voelt. Het Nibud geeft dezelfde tip voor extra inkomsten zoals vakantiegeld of een dertiende
          maand: zet het apart voordat je het uitgeeft (
          <Bron sleutel="nibudSparenAanpak" tekst={`Nibud, geopend ${BRON_DATUM}`} />
          ).
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          <strong style={{ fontWeight: 500 }}>Kijk eens per jaar naar je spaarpercentage, niet naar je saldo.</strong>{" "}
          Het Nibud adviseert minimaal {NIBUD_SPAARADVIES_PCT} procent van je inkomen. Groeit je inkomen en blijft het
          percentage gelijk of zakt het, dan zie je lifestyle inflatie in één getal.
        </li>
        <li>
          <strong style={{ fontWeight: 500 }}>Kies bewust wat erbij mag.</strong> Een upgrade die je wilt, is geen
          probleem. Een upgrade die je niet merkt, wel.
        </li>
      </ol>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Waar je geld nu blijft:{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld" style={link} className="hover:underline">
          waar blijft mijn geld
        </Link>
        . Wat een loonsverhoging netto oplevert:{" "}
        <Link href="/inzichten/netto-loonsverhoging-berekenen" style={link} className="hover:underline">
          netto loonsverhoging berekenen
        </Link>
        . En waarom sparen niet lukt terwijl je goed verdient:{" "}
        <Link href="/inzichten/waarom-lukt-sparen-niet" style={link} className="hover:underline">
          waarom kan ik niet sparen
        </Link>
        .
      </p>
    </>
  );
}
