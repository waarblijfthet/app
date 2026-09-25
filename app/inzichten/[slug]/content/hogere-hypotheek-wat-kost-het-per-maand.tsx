import Link from "next/link";
import KeuzeDoorrekening from "@/components/artikel/KeuzeDoorrekening";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import { RAPPORTEN, rapportVoorSlug, type Rapport } from "@/lib/rapporten-data";
import { BRONNEN, BRON_DATUM } from "@/lib/geldmomenten-bronnen";
import { annuiteit, RENTE_2026, LOOPTIJD_JAREN } from "@/lib/rente-verschil";
import { euro } from "@/lib/salaris-vuistregel";

/**
 * Upgrade geldmoment 2, groter huis (25-sep-2026). Zelfde URL, nieuwe
 * invalshoek: "kunnen we dit huis betalen". Oude titel en metaTitel: "Wat kost
 * een hogere hypotheek echt per maand?". GSC 23 juni tot 22 september 2026:
 * 0 vertoningen op deze URL, dus geen rankingrisico.
 *
 * Het onderscheid dat de hele pagina draagt: de bank of adviseur zegt wat je
 * kunt lenen, deze pagina alleen wat de nieuwe woonlast met de eigen maand doet.
 * Geen maximale hypotheek, geen advies over welke hypotheek (CLAUDE.md sectie 8
 * en het besluit van 25-sep-2026).
 *
 * Weggehaald: "het Nibud hanteert dat woonlasten niet boven een derde van je
 * netto-inkomen uitkomen". Die vuistregel stond niet op de twee Nibud-pagina's
 * over wonen die ik op 25-sep-2026 opende.
 *
 * Bedragen: de maandlast per €100.000 uit annuiteit() in lib/rente-verschil.ts
 * met RENTE_2026 (Van Bruggen, geverifieerd 6-sep-2026); de woonposten per
 * huishouden uit lib/rapporten-data.ts.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const link = { color: "#0B7A6E", textDecoration: "none" } as const;

const EXTRA_BEDRAGEN = [50000, 100000, 150000, 200000];

/** Maandlast bij RENTE_2026 over LOOPTIJD_JAREN, hele euro's. */
function maandlast(hoofdsom: number): number {
  return Math.round(annuiteit(hoofdsom, RENTE_2026, LOOPTIJD_JAREN));
}

function post(r: Rapport, label: string): string {
  return r.lasten.find((x) => x.label === label)?.waarde ?? "niet genoemd";
}

/** "€1.440 per jaar, circa €120 per maand" wordt "€120 per maand". */
function perMaand(waarde: string): string {
  const m = waarde.match(/circa (€[\d.]+ per maand)/);
  return m ? m[1] : waarde;
}

/** Het woningdeel uit de jaarkosten, zoals de klant het opgaf. */
function woningPerJaar(r: Rapport): string {
  const jaar = r.dagelijks.find((x) => x.label === "Jaarlijkse kosten")?.waarde ?? "";
  const m = jaar.match(/(huis en tuin|woningonderhoud|woning en overig|woning) (€[\d.]+)/);
  return m ? `${m[2]} (${m[1]})` : "niet apart genoemd";
}

export default function HogereHypotheekWatKostHetPerMaand() {
  const per100k = maandlast(100000);
  const kopers = RAPPORTEN.filter((r) => /koop/.test(r.situatie));
  const gezin = rapportVoorSlug("tweeverdieners-drie-kinderen")!;

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}.
      </p>

      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Wat jullie maximaal kunnen lenen, zegt de bank. Of het huis past, zie je aan de maand: bij {RENTE_2026} procent
        rente kost elke {euro(100000)} extra hypotheek ongeveer {euro(per100k)} per maand aan rente en aflossing, over{" "}
        {LOOPTIJD_JAREN} jaar, vóór renteaftrek. Daar komen energie, lokale lasten en onderhoud bij, en die groeien mee
        met het huis.
      </p>

      <div className="rounded-xl border p-4 mb-6" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          Ik adviseer niet over je hypotheek, je pensioen of alimentatie. Ik reken uit wat jullie maandbudget overlaat
          bij de keuze die je overweegt. Voor de hypotheek zelf ga je naar een erkende hypotheekadviseur.
        </p>
      </div>

      <h2 className="font-display" style={h2}>Wat kost een hogere hypotheek per maand?</h2>
      <EenvoudigeTabel
        koppen={["Extra hypotheek", `Per maand bij ${RENTE_2026}%`, "Per jaar"]}
        rijen={EXTRA_BEDRAGEN.map((b) => [euro(b), euro(maandlast(b)), euro(maandlast(b) * 12)])}
        bijschrift={`Annuïteit over ${LOOPTIJD_JAREN} jaar, bruto, vóór hypotheekrenteaftrek. Een rekenvoorbeeld, geen offerte.`}
      />
      <p className="font-body text-text-soft" style={p}>
        De rente van {RENTE_2026} procent is een rekenvoorbeeld: rond dat niveau lagen de voorstellen voor een nieuwe
        rentevaste periode in 2026, zie{" "}
        <Link href="/inzichten/rentevaste-periode-loopt-af-wat-nu" style={link} className="hover:underline">
          wat een aflopende rentevaste periode met je maand doet
        </Link>
        . Gebruik voor je eigen berekening de rente en de maandlast uit het voorstel dat je krijgt.
      </p>

      <h2 className="font-display" style={h2}>Wat is het verschil tussen wat je kunt lenen en wat je kunt betalen?</h2>
      <p className="font-body text-text-soft" style={p}>
        De bank toetst aan wettelijke leennormen. Het Nibud schrijft daarover: &ldquo;Omdat
        deze normen zijn gebaseerd op gemiddelde budgetten, kan het zijn dat de maandlasten toch niet goed passen in
        jouw budget&rdquo; (
        <a href={BRONNEN.nibudHypotheek.url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
          Nibud, geopend {BRON_DATUM}
        </a>
        ). Het maximum gaat over een gemiddeld huishouden. Jullie maand is geen gemiddelde.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Een gezin dat op het maximum koopt en veel uitgeeft aan kinderen, twee auto&apos;s of reizen, heeft minder ruimte
        dan de toets aanneemt. Een gezin dat zuinig leeft, heeft er meer. Welke van de twee jullie zijn, staat niet in
        de toets van de bank.
      </p>

      <h2 className="font-display" style={h2}>Welke woonlasten komen er naast de hypotheek bij?</h2>
      <p className="font-body text-text-soft" style={p}>
        Het Nibud noemt naast huur of hypotheek de onroerendezaakbelasting, afvalstoffen- en rioolheffing, de heffingen
        van het waterschap en de opstal- en inboedelverzekering (
        <a href={BRONNEN.nibudWoonlasten.url} style={link} className="hover:underline" target="_blank" rel="noopener noreferrer">
          Nibud
        </a>
        ). Daarbij komen energie en onderhoud. Zo zag dat eruit bij de {kopers.length} van de {RAPPORTEN.length}{" "}
        huishoudens die ik doorrekende en die een koophuis hebben, in hun eigen opgave:
      </p>
      <EenvoudigeTabel
        koppen={["Huishouden", "Hypotheek", "Energie", "Gemeente en waterschap", "Woning, per jaar"]}
        rijen={kopers.map((r) => [
          <Link key={r.slug} href={`/rapporten/${r.slug}`} style={link} className="hover:underline">
            {r.chip}
          </Link>,
          post(r, "Hypotheek"),
          post(r, "Energie"),
          perMaand(post(r, "Gemeentelijke lasten en waterschap")),
          woningPerJaar(r),
        ])}
        bijschrift="Per maand, tenzij anders vermeld. Bedragen zoals de huishoudens ze aanleverden, niet gemiddeld."
      />
      <p className="font-body text-text-soft" style={p}>
        Een groter huis tilt de meeste van die posten mee: meer vierkante meters om te verwarmen, een hogere WOZ-waarde
        voor de onroerendezaakbelasting, meer dak en kozijnen om te onderhouden. Wie alleen de hypotheek vergelijkt, mist
        dat deel.
      </p>

      <h2 className="font-display" style={h2}>Reken uit wat de nieuwe woonlast met jullie maand doet</h2>
      <p className="font-body text-text-soft" style={p}>
        Vul de woonlast nu en die uit het voorstel in, en wat jullie verwachten aan onderhoud en de andere woonposten. Je
        ziet hoeveel vrije ruimte er ongeveer overblijft. Hoeveel jullie mogen lenen, zie je hier niet: dat is de vraag
        van de bank.
      </p>

      <KeuzeDoorrekening keuze="huis" />

      <h2 className="font-display" style={h2}>Kunnen we dit huis betalen?</h2>
      <p className="font-body text-text-soft" style={p}>
        Dat hangt af van twee dingen: wat er per maand bijkomt, en waar jullie geld nu al naartoe gaat. Het eerste
        rekent de doorrekening hierboven uit. Het tweede zie je pas als je de hele maand bekijkt. Bij het gezin met drie
        kinderen dat ik doorrekende was de hypotheek {post(gezin, "Hypotheek")} per maand, en toch zat het probleem daar
        niet: &ldquo;{gezin.uitkomstKop}.&rdquo;{" "}
        <Link href={`/rapporten/${gezin.slug}`} style={link} className="hover:underline">
          Lees hun rapport
        </Link>
        . Ga je naar een groter huis terwijl er nu al elke maand geld verdwijnt zonder dat je weet waarheen, dan komt de
        hogere woonlast bovenop een gat dat er al was.
      </p>

      <h2 className="font-display" style={h2}>Wat doe ik niet?</h2>
      <p className="font-body text-text-soft" style={p}>
        Ik bereken niet hoeveel jullie kunnen lenen, ik adviseer niet over welke hypotheek, looptijd of rentevaste
        periode, en ik beoordeel geen offerte. Dat is het werk van een erkende adviseur. Ik reken met de maandlast die
        jullie is genoemd, en laat zien wat die met jullie maand doet.
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Wat een gezin per post uitgeeft, op elk inkomen:{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={link} className="hover:underline">
          wat geeft een gezin uit per maand
        </Link>
        . Waarom een hoge vaste last de rest van de maand dichtdrukt:{" "}
        <Link href="/inzichten/goed-salaris-toch-krap" style={link} className="hover:underline">
          goed salaris, toch krap
        </Link>
        . Een verbouwing in plaats van verhuizen:{" "}
        <Link href="/inzichten/verbouwen-financiele-valkuilen" style={link} className="hover:underline">
          de financiële valkuilen van verbouwen
        </Link>
        .
      </p>
    </>
  );
}
