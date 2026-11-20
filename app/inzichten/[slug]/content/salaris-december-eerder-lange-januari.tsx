import Link from "next/link";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import DecembersalarisKiezer from "@/components/artikel/DecembersalarisKiezer";
import { RAPPORTEN } from "@/lib/rapporten-data";
import { euro } from "@/lib/salaris-vuistregel";
import {
  BRON_DATUM_DECEMBERSALARIS,
  DECEMBERSALARIS_BRONNEN,
  DECEMBER_JAAR,
  JANUARI_JAAR,
  GEWONE_DECEMBERMAAND_DAGEN,
  RIJK_DECEMBER,
  RIJK_JANUARI_AFGELEID,
  RIJK_DAGEN,
  RIJK_VASTE_DAG,
  VOORBEELD_JANUARI,
  datumTekst,
  voorbeeldRijen,
  wekenTekst,
  dagenTekst,
  decemberPerRapport,
  bereikFeestdagen,
} from "@/lib/decembersalaris";

/**
 * Nieuw artikel, 20-nov-2026: "salaris december eerder" en de lange januari.
 *
 * SERP google.nl 20-nov (docs/serp-jaarwisseling-20-nov-2026.md): Reddit,
 * dedatumvandaag, P-Direkt, Telegraaf, Libelle, Indeed, FOK, EenVandaag, NU.
 * Iedereen beantwoordt "wanneer"; niemand rekent uit hoe lang het
 * decembersalaris mee moet. GSC 16 maanden: geen eigen URL vertoont op
 * december- of januaritermen, dus geen kannibalisatie.
 *
 * Alle data en dagen komen uit lib/decembersalaris.ts, eigen bedragen uit
 * lib/rapporten-data.ts via decemberPerRapport().
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

function Bron({ sleutel, tekst }: { sleutel: keyof typeof DECEMBERSALARIS_BRONNEN; tekst: string }) {
  return (
    <a href={DECEMBERSALARIS_BRONNEN[sleutel].url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
      {tekst}
    </a>
  );
}

export default function SalarisDecemberEerderLangeJanuari() {
  const rijen = voorbeeldRijen();
  const vroegst = rijen[0];
  const rapporten = decemberPerRapport();
  const feest = bereikFeestdagen();
  const gezin = rapporten.find((r) => r.slug === "tweeverdieners-drie-kinderen");

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM_DECEMBERSALARIS}.
      </p>

      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Je werkgever mag je decembersalaris eerder betalen, maar hoeft het niet: de wet zegt dat maandloon na afloop van de
        maand komt. Het Rijk betaalt zijn ambtenaren op {datumTekst(RIJK_DECEMBER)} {DECEMBER_JAAR}. Krijg je het op{" "}
        {datumTekst(vroegst.december)} en je januarisalaris op {datumTekst(vroegst.januari)}, dan doe je {vroegst.dagen}{" "}
        dagen met één salaris, {dagenTekst(vroegst.extra)} langer dan normaal.
      </p>

      <h2 className="font-display" style={h2}>Komt het salaris in december eerder?</h2>
      <p className="font-body text-text-soft" style={p}>
        Dat verschilt per werkgever. Wettelijk moet je werkgever je maandloon betalen na afloop van de maand waarover het
        loon gaat (
        <Bron sleutel="bw7623" tekst={`artikel 7:623 Burgerlijk Wetboek, geopend ${BRON_DATUM_DECEMBERSALARIS}`} />
        ). De Rijksoverheid legt het zo uit: maandloon na een maand, weekloon na een week (
        <Bron sleutel="rijksoverheidLoon" tekst={`Rijksoverheid, geopend ${BRON_DATUM_DECEMBERSALARIS}`} />
        ). Eerder betalen mag dus, later dan de afgesproken periode niet. Een recht op een vroeg decembersalaris bestaat
        niet; of het eerder komt, staat in je cao, je contract of de betaalkalender van je salarisadministratie.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een voorbeeld dat wel vaststaat: het Rijk betaalt zijn ambtenaren normaal op de {RIJK_VASTE_DAG}e, en in december{" "}
        {DECEMBER_JAAR} op {datumTekst(RIJK_DECEMBER)} (
        <Bron sleutel="pdirektBetaaldata" tekst={`P-Direkt, betaaldata ${DECEMBER_JAAR}, geopend ${BRON_DATUM_DECEMBERSALARIS}`} />
        ). De lijst voor {JANUARI_JAAR} stond er op {BRON_DATUM_DECEMBERSALARIS} nog niet. Volgens hun eigen regel, eerder
        als de {RIJK_VASTE_DAG}e in het weekend valt, wordt dat {datumTekst(RIJK_JANUARI_AFGELEID)}: {RIJK_DAGEN} dagen na
        het decembersalaris. Bij het Rijk is januari dus niet langer dan een gewone maand. Het salaris komt alleen vóór de
        feestdagen binnen, en daar zit het risico.
      </p>

      <h2 className="font-display" style={h2}>Hoe lang moet je met je decembersalaris doen?</h2>
      <p className="font-body text-text-soft" style={p}>
        Tel de dagen van je decembersalaris tot je januarisalaris. Van de zoveelste december tot dezelfde dag in januari is
        altijd {GEWONE_DECEMBERMAAND_DAGEN} dagen. Alles daarboven moet je extra overbruggen. Voor iemand die normaal op de
        25e betaald krijgt en in januari op {datumTekst(VOORBEELD_JANUARI)}:
      </p>
      <EenvoudigeTabel
        koppen={["Decembersalaris op", "Dagen tot januarisalaris", "Weken", "Langer dan normaal"]}
        rijen={rijen.map((r) => [
          datumTekst(r.december),
          `${r.dagen} dagen`,
          wekenTekst(r.dagen),
          r.extra > 0 ? dagenTekst(r.extra) : "niet langer",
        ])}
        bijschrift={`Januarisalaris op ${datumTekst(VOORBEELD_JANUARI)} ${JANUARI_JAAR}. Uitgerekend op de kalender van ${DECEMBER_JAAR} en ${JANUARI_JAAR}.`}
      />
      <DecembersalarisKiezer />

      <h2 className="font-display" style={h2}>Waarom voelt januari zo lang, ook als het aantal dagen meevalt?</h2>
      <p className="font-body text-text-soft" style={p}>
        Omdat het decembersalaris twee dingen tegelijk moet betalen: de feestdagen en de weken tot het volgende salaris.
        Bij de {RAPPORTEN.length} huishoudens van wie ik een geldrapport schreef, kostten de feestdagen{" "}
        {euro(feest.laagste)} tot {euro(feest.hoogste)} per jaar. Dat bedrag valt grotendeels in één maand.
        {gezin ? (
          <>
            {" "}
            Het{" "}
            <Link href={`/rapporten/${gezin.slug}`} style={link} className="hover:underline">
              tweeverdienersgezin met drie kinderen
            </Link>{" "}
            ({gezin.netto}) had {euro(gezin.feestdagenPerJaar)} aan feestdagen en {euro(gezin.boodschappenPerMaand)} aan
            boodschappen per maand.
          </>
        ) : null}
      </p>
      <EenvoudigeTabel
        koppen={["Huishouden", "Feestdagen per jaar", "Boodschappen per maand"]}
        rijen={rapporten.map((r) => [
          <Link key={r.slug} href={`/rapporten/${r.slug}`} style={link} className="hover:underline">
            {r.naam}, {r.netto}
          </Link>,
          r.metVerjaardagen ? `${euro(r.feestdagenPerJaar)} (met verjaardagen)` : euro(r.feestdagenPerJaar),
          euro(r.boodschappenPerMaand),
        ])}
        bijschrift={`Mijn eigen rapporten, n = ${RAPPORTEN.length}, bedragen zoals de huishoudens ze aanleverden. Geen steekproef van Nederland.`}
      />
      <p className="font-body text-text-soft" style={p}>
        Staat er geen geld apart voor december, dan betaal je de feestdagen van het salaris dat ook januari moet dragen. Dan
        is het niet het aantal dagen dat januari lang maakt, maar wat er op dag één al van af is. Wat december een gezin
        kost, staat in{" "}
        <Link href="/inzichten/wat-kost-december-feestdagen-gezin" style={link} className="hover:underline">
          wat kost december
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>Hoe kom je de lange januari door?</h2>
      <ol className="font-body text-text-soft" style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
        <li style={{ marginBottom: "0.6rem" }}>
          Zet op de dag dat je decembersalaris binnenkomt je vaste lasten van januari en je dagelijkse uitgaven tot het
          januarisalaris apart, op een aparte rekening. Hoeveel dat per week is, lees je in{" "}
          <Link href="/inzichten/leefgeld-per-week" style={link} className="hover:underline">
            leefgeld per week
          </Link>
          .
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          Betaal december van wat er daarna over is, of van een potje dat je er het jaar door voor gevuld hebt.
        </li>
        <li style={{ marginBottom: "0.6rem" }}>
          Krijg je in december een eindejaarsuitkering of dertiende maand, laat die dan eerst het gat tot januari dekken
          voordat je hem uitgeeft. Wat er netto van over is, staat in{" "}
          <Link href="/inzichten/bonus-13e-maand-netto-berekenen" style={link} className="hover:underline">
            bonus en 13e maand netto
          </Link>
          .
        </li>
        <li>
          Kijk in je afschrift van vorig jaar wat er in januari van je rekening ging. Dat is je beste voorspelling voor deze
          januari, beter dan een schatting.
        </li>
      </ol>

      <h2 className="font-display" style={h2}>Waarom raakt dit ook als je goed verdient?</h2>
      <p className="font-body text-text-soft" style={p}>
        Een hoger salaris dat vóór de kerst binnenkomt, voelt als ruimte. Maar je vaste lasten en je boodschappen zijn
        meegegroeid met je inkomen, dus {wekenTekst(vroegst.dagen)} weken overbruggen kost jou in euro&apos;s ook meer.
        Komt december daar nog bovenop, dan merk je dat eind januari, hoe goed je ook verdient. Waar het geld in zo&apos;n huishouden naartoe gaat, beschrijf ik in{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld" style={link} className="hover:underline">
          waar blijft mijn geld
        </Link>{" "}
        en{" "}
        <Link href="/inzichten/lifestyle-inflatie-meer-verdienen-meer-uitgeven" style={link} className="hover:underline">
          lifestyle inflatie
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        Volgend jaar voorkom je het door december elke maand een beetje apart te zetten. Hoe je dat uitrekent, staat in{" "}
        <Link href="/inzichten/jaarlijkse-kosten-reserveren" style={link} className="hover:underline">
          jaarlijkse kosten reserveren
        </Link>
        . Wat een gezin per post uitgeeft, staat in{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={link} className="hover:underline">
          wat geeft een gezin uit per maand
        </Link>
        .
      </p>
    </>
  );
}
