import Link from "next/link";
import TweeHuishoudensVergelijker from "@/components/artikel/TweeHuishoudensVergelijker";
import EenvoudigeTabel from "@/components/artikel/EenvoudigeTabel";
import { rapportVoorSlug, RAPPORTEN } from "@/lib/rapporten-data";
import { berekenVuistregel, euro } from "@/lib/salaris-vuistregel";
import { BRONNEN, BRON_DATUM } from "@/lib/geldmomenten-bronnen";

/**
 * Content voor "scheiden-goed-inkomen-toch-niks-over".
 *
 * Eerste versie: klus A, 18-aug-2026. Upgrade geldmoment 3 op 25-sep-2026: zelfde
 * URL, nieuwe titel "Kan ik rondkomen na een scheiding?". Oude titel en
 * metaTitel: "Scheiden met een goed inkomen en toch niks over". GSC 23 juni tot
 * 22 september 2026: 20 vertoningen, positie 51,6, 0 klikken, vrijwel alles op
 * "scheiden zonder inkomen".
 *
 * De rekenaar blijft TweeHuishoudensVergelijker (besluit Jarno: geen nieuwe
 * scheidingscalculator), nu met een optioneel veld voor alimentatie die al is
 * afgesproken. Ik bereken geen alimentatie en geef geen juridische uitleg.
 *
 * Alle bedragen komen uit berekenVuistregel() en rapportVoorSlug(). Geen getal
 * is met de hand getypt.
 */

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;
const linkStyle = { color: "#0B7A6E", textDecoration: "none" } as const;

const RAPPORT = rapportVoorSlug("alleenstaande-ouder-twee-kinderen");

const TABEL_INKOMENS = [5000, 6000, 7000, 8000];

interface Splitsing {
  inkomen: number;
  verdwijnt: number;
  vasteLasten: number;
  vervoer: number;
}

/**
 * Wat er verdwijnt als één huishouden met twee kinderen twee wordt, bij een
 * verdeling van vijftig-vijftig. De verdeling maakt voor het totaal niet uit
 * (zie TweeHuishoudensVergelijker). Velden voluit, zie de minifierregel.
 */
function splits(inkomen: number): Splitsing {
  const voor = berekenVuistregel({ inkomen: inkomen, volwassenen: 2, kinderen: 2, auto: "eigen" });
  const met = berekenVuistregel({ inkomen: inkomen / 2, volwassenen: 1, kinderen: 2, auto: "eigen" });
  const zonder = berekenVuistregel({ inkomen: inkomen / 2, volwassenen: 1, kinderen: 0, auto: "eigen" });
  return {
    inkomen: inkomen,
    verdwijnt: voor.verwachtOver - (met.verwachtOver + zonder.verwachtOver),
    vasteLasten: met.wonen + zonder.wonen - voor.wonen + (met.verzekeringen + zonder.verzekeringen - voor.verzekeringen),
    vervoer: met.vervoer + zonder.vervoer - voor.vervoer,
  };
}

export default function ScheidenGoedInkomenTochNiksOver() {
  const rijen = TABEL_INKOMENS.map(splits);
  const bij6000 = splits(6000);
  const alimentatie = RAPPORT?.inkomsten.find((post) => post.label === "Kinderalimentatie");
  const salaris = RAPPORT?.inkomsten.find((post) => post.label === "Nettosalaris");

  return (
    <>
      <p className="font-body text-sm" style={{ ...p, color: "#4A5A56" }}>
        Cijfers bijgewerkt op {BRON_DATUM}.
      </p>

      {/* Antwoord bovenaan, CLAUDE.md 8.8 */}
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Na een scheiding kost hetzelfde leven meer, omdat twee huishoudens elk hun eigen vaste lasten dragen. Bij{" "}
        {euro(6000)} netto samen en twee kinderen verdwijnt er in mijn vuistregel ongeveer {euro(bij6000.verdwijnt)} per
        maand, hoe jullie het inkomen ook verdelen. Of jij het redt, hangt af van je eigen netto, je nieuwe woonlast en
        je toeslagen.
      </p>

      <div className="rounded-xl border p-4 mb-6" style={{ backgroundColor: "#FDF3E3", borderColor: "#F0D07A" }}>
        <p className="font-body text-sm" style={{ color: "#92600A" }}>
          Ik adviseer niet over je hypotheek, je pensioen of alimentatie. Ik reken uit wat jouw maandbudget overlaat bij
          de keuze die je overweegt. De verdeling en de alimentatie horen bij je mediator, advocaat of het Juridisch
          Loket.
        </p>
      </div>

      <h2 className="font-display" style={h2}>Hoeveel verdwijnt er als één huishouden twee wordt?</h2>
      <EenvoudigeTabel
        koppen={["Netto samen, vóór", "Verdwijnt per maand", "Waarvan vaste lasten", "Waarvan vervoer"]}
        rijen={rijen.map((r) => [euro(r.inkomen), euro(r.verdwijnt), euro(r.vasteLasten), euro(r.vervoer)])}
        bijschrift={`Twee kinderen, beide ouders met een eigen auto. Vuistregel uit de ${RAPPORTEN.length} huishoudens die ik zelf doorrekende, geen alimentatie en geen toeslagen.`}
      />

      <h2 className="font-display" style={h2}>Kan ik rondkomen na een scheiding?</h2>
      <p className="font-body text-text-soft" style={p}>
        Dat hangt aan drie bedragen die je vaak al kent voordat de mediation begint: je eigen netto inkomen, de woonlast
        van de plek waar je gaat wonen, en wat er aan toeslagen verandert. Alimentatie is de vierde, maar die weet je pas
        als er een afspraak ligt. Reken daarom eerst zonder, en daarna met het bedrag dat op tafel komt.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat je vooral niet moet doen: je nieuwe maand afleiden van de oude. Het gezamenlijke budget had één huis, één
        internet en één set verzekeringen. Straks heb jij die allemaal zelf, en je ex ook.
      </p>

      <h2 className="font-display" style={h2}>Wat verandert er aan mijn inkomen na een scheiding?</h2>
      <p className="font-body text-text-soft" style={p}>
        Je rekent alleen nog met je eigen netto. Voor de toeslagen moet je eerst regelen dat je ex niet meer meetelt,
        &ldquo;want pas daarna kunt u voor uzelf toeslag krijgen&rdquo;, en verandert je inkomen doordat je meer of minder
        gaat werken of partneralimentatie krijgt of betaalt, dan geef je dat snel door (
        <a href={BRONNEN.toeslagenScheiden.url} style={linkStyle} className="hover:underline" target="_blank" rel="noopener noreferrer">
          Dienst Toeslagen, geopend {BRON_DATUM}
        </a>
        ). Ben je alleenstaande ouder zonder toeslagpartner, dan krijg je meer kindgebonden budget dan een gezin met twee
        ouders (
        <a href={BRONNEN.kgbHoeveel.url} style={linkStyle} className="hover:underline" target="_blank" rel="noopener noreferrer">
          Dienst Toeslagen
        </a>
        ). Hoeveel precies hangt af van je inkomen; de proefberekening van Dienst Toeslagen geeft je bedrag.
      </p>

      <h2 className="font-display" style={h2}>Kan ik mijn huis houden na een scheiding?</h2>
      <p className="font-body text-text-soft" style={p}>
        Of de bank de hypotheek op jouw naam alleen zet, beslist de bank, en daar adviseer ik niet over. Wat ik wel kan
        uitrekenen: wat er van je maand overblijft als jij de woonlast alleen draagt. Dat is vaak de belangrijkere vraag
        dan of het mag. Een huis dat de bank je gunt maar dat je elke maand naar nul drukt, is een keuze met een
        prijs.
      </p>

      <h2 className="font-display" style={h2}>Reken het uit voor jouw twee huishoudens</h2>
      <p className="font-body text-text-soft" style={p}>
        Zet hieronder het inkomen van vóór de scheiding en het aantal kinderen. Schuif de verdeling, en vul alimentatie
        alleen in als er al een bedrag is afgesproken.
      </p>

      <TweeHuishoudensVergelijker metAlimentatie />

      <h2 className="font-display" style={h2}>Waarom verandert het totaal niet als je de verdeling verschuift?</h2>
      <p className="font-body text-text-soft" style={p}>
        Schuif in de rekenaar de verdeling van het inkomen, en let op het bedrag dat verdwijnt. Dat blijft gelijk. De
        posten die na een scheiding twee keer gaan staan, energie, internet, gemeentelijke lasten, abonnementen en de
        overige verzekeringen, gelden per huishouden en niet per hoofd. Ook boodschappen worden duurder in de optelsom:
        twee huishoudens eten allebei vanaf een eigen basisbedrag. En wie allebei blijven rijden, betalen de vervoerspost
        twee keer.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Wat de verdeling wel verandert, is wie het tekort voelt. Schuif de verdeling naar de ouder zonder kinderen, en
        het huishouden met de kinderen kan negatief uitkomen terwijl de ander overhoudt. Een afgesproken alimentatie
        verschuift dat weer terug. Het totaal blijft wat het is.
      </p>

      {RAPPORT && (
        <div className="rounded-xl border p-4 my-6" style={{ backgroundColor: "#F7F8F7", borderColor: "#E6E9E7" }}>
          <p className="font-body text-sm" style={{ color: "#16211F" }}>
            <strong>Uit de praktijk.</strong> Een alleenstaande ouder met twee kinderen die ik doorrekende, de kinderen
            wonen {RAPPORT.kenmerken.find((k) => k.includes("procent"))}, verdiende {salaris?.waarde.split(",")[0]} en
            ontving {alimentatie?.waarde.replace(" ontvangen", "")} kinderalimentatie. Haar eigen inschatting vooraf: &ldquo;{RAPPORT.vermoedenBedrag}&rdquo; Mijn conclusie:
            &ldquo;{RAPPORT.uitkomstKop}.&rdquo; {RAPPORT.verhaalTitel}{" "}
            <Link href={`/rapporten/${RAPPORT.slug}`} style={linkStyle} className="hover:underline">
              Lees haar rapport
            </Link>
            .
          </p>
        </div>
      )}

      <h2 className="font-display" style={h2}>Wat reken ik niet uit?</h2>
      <p className="font-body text-text-soft" style={p}>
        De hoogte van de alimentatie, de verdeling van het huis, het pensioen en de spullen. Dat is het werk van je
        mediator, advocaat of het Juridisch Loket. Het Nibud heeft het{" "}
        <a href={BRONNEN.geldplanScheiden.url} style={linkStyle} className="hover:underline" target="_blank" rel="noopener noreferrer">
          Geldplan Scheiden
        </a>{" "}
        voor wie overweegt uit elkaar te gaan, om inkomsten en uitgaven in de nieuwe situatie op een rij te zetten. Ik
        reken met de uitkomst van die afspraken, of met een bandbreedte zolang ze er nog niet zijn.
      </p>

      <h2 className="font-display" style={h2}>Verder lezen</h2>
      <p className="font-body text-text-soft" style={p}>
        Ga je er alleen voor staan met de kinderen, dan geeft{" "}
        <Link href="/inzichten/kosten-levensonderhoud-alleenstaande-ouder-2026" style={linkStyle} className="hover:underline">
          kosten levensonderhoud als alleenstaande ouder
        </Link>{" "}
        de posten waar je met één inkomen mee te maken krijgt. Komt er later een nieuwe partner met kinderen bij, lees dan{" "}
        <Link href="/inzichten/samengesteld-gezin-twee-huishoudens-een-budget" style={linkStyle} className="hover:underline">
          samengesteld gezin: twee huishoudens in één budget
        </Link>
        . En wat een gezin met twee inkomens per post uitgeeft, als vergelijking met hoe het was:{" "}
        <Link href="/inzichten/wat-geeft-een-gezin-uit-per-maand" style={linkStyle} className="hover:underline">
          wat geeft een gezin uit per maand
        </Link>
        .
      </p>
    </>
  );
}
