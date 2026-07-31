import Link from "next/link";
import SalarisRekenaar from "@/components/artikel/SalarisRekenaar";

const h2 = {
  fontSize: "1.6rem",
  color: "#16211F",
  marginTop: "2.5rem",
  marginBottom: "1rem",
  fontWeight: 300,
} as const;

const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function Is5000EuroNettoGoedSalaris() {
  return (
    <>
      <SalarisRekenaar
        startInkomen={5000}
        startVolwassenen={2}
        startKinderen={2}
        kop="Kort antwoord: ja, €5.000 netto is een hoog salaris. Modaal is ongeveer €3.100 netto."
        intro="Alleen is dat niet de vraag die je eigenlijk hebt. Bij dit bedrag weet je zelf ook dat het goed is. De vraag is waarom het niet voelt als een hoog inkomen. Zet je eigen bedrag en huishouden hieronder."
      />

      <p className="font-body text-text-soft" style={p}>
        Bij €4.000 netto is de vraag nog of het genoeg is. Bij €5.000 netto niet meer: dat is objectief
        hoog, ruim boven modaal, en je hoort het ook van anderen. Toch is dit precies het inkomensniveau
        waarop mensen mij mailen met de vraag waarom er niets overblijft. Dat is geen tegenstrijdigheid.
        Er zijn drie dingen die op dit niveau anders werken dan een stap lager, en geen ervan gaat over
        onzuinig leven.
      </p>

      <h2 className="font-display" style={h2}>
        Hoeveel bruto moet je verdienen voor €5.000 netto?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dat hangt er sterk van af of het uit één inkomen komt of uit twee, en dat verschil is groter dan
        bijna iedereen denkt. Reken mee.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Voor €4.000 netto per maand heb je als alleenverdiener ongeveer €65.000 bruto per jaar nodig. Wil
        je van daar naar €5.000 netto, dan moet er €12.000 netto per jaar bij. Maar boven de tweede
        schijfgrens van €78.426 betaal je 49,50 procent belasting over elke extra euro. Van elke bruto euro
        houd je daar dus ongeveer vijftig cent over. Om €12.000 netto extra te krijgen moet er dan bijna
        €24.000 bruto bij, en kom je uit rond de €90.000 bruto per jaar.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Twee mensen die samen €5.000 netto verdienen, dus ieder €2.500, komen daar met ongeveer €78.000
        bruto samen. Dat is grofweg €10.000 bruto per jaar minder voor exact hetzelfde bedrag op de
        rekening, omdat ieder van hen zijn eigen heffingskortingen en zijn eigen lagere schijven gebruikt.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Dezelfde €5.000 netto kost als eenverdiener dus ongeveer €10.000 bruto per jaar meer dan als
        tweeverdieners. Dat is geen fout in je situatie, dat is hoe het stelsel werkt. Wel verklaart het
        waarom een eenverdiener met €5.000 netto vaak het gevoel heeft harder te werken voor minder
        resultaat: dat gevoel is juist.
      </p>
      <p className="font-body text-sm" style={{ ...p, color: "#8B958F" }}>
        Gerekend met de tweede schijf van 49,50 procent boven €78.426 (2026) en met de vuistregel dat
        €4.000 netto ongeveer €65.000 bruto vraagt. Dit is een berekening, geen tabel van de
        Belastingdienst: heffingskortingen, pensioenpremie en arbeidsvoorwaarden schuiven het per persoon.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom de stap van €4.000 naar €5.000 minder oplevert dan je verwacht
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Er komt €1.000 netto per maand bij, en toch verandert de financiële ruimte veel minder dan dat
        bedrag suggereert. Drie redenen, en ze werken tegelijk.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ color: "#16211F", fontWeight: 500 }}>Er is niets meer aan toeslagen te verliezen,
        want die zijn al weg.</strong> Rond €4.000 netto met kinderen kan er nog kindgebonden budget
        binnenkomen. Bij €5.000 netto is elke toeslag verdwenen. Wie de stap zet, verliest dus soms nog een
        stukje inkomen dat niet op de loonstrook stond. Meer daarover in{" "}
        <Link href="/inzichten/samen-te-veel-verdiend-toeslag-kwijt" className="hover:underline" style={{ color: "#0B7A6E" }}>
          samen net te veel verdiend
        </Link>
        .
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ color: "#16211F", fontWeight: 500 }}>De woonlast is meestal meegestapt.</strong>{" "}
        Vrijwel niemand gaat van €4.000 naar €5.000 netto en blijft in hetzelfde huis met dezelfde
        hypotheek. Een hoger inkomen geeft een hogere maximale hypotheek, en die ruimte wordt gebruikt. Als
        de woonlast met €400 meegroeit, is er van die €1.000 nog €600 over voordat er iets anders is
        gebeurd.
      </p>
      <p className="font-body text-text-soft" style={p}>
        <strong style={{ color: "#16211F", fontWeight: 500 }}>Boven de tweede schijf levert werken minder
        op.</strong> Wie op dit niveau meer gaat verdienen om het gat te dichten, merkt dat de helft
        wegvalt. Dat is de reden dat harder werken hier zelden de oplossing is. Uitgebreider in{" "}
        <Link href="/inzichten/salarisverhoging-boven-76000-weinig-netto" className="hover:underline" style={{ color: "#0B7A6E" }}>
          waarom een salarisverhoging boven €76.000 zo weinig netto oplevert
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Op dit niveau is de vraag niet of je rondkomt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Dat is het wezenlijke verschil met een inkomen rond modaal. Met €5.000 netto betaal je je
        rekeningen, ga je op vakantie en kun je een tegenvaller opvangen. De vraag die mensen op dit niveau
        stellen is een andere: waarom groeit mijn vermogen niet, terwijl ik objectief veel verdien.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Dat is een aangenamer probleem en tegelijk een lastiger probleem, want er is geen alarmbel. Niemand
        komt in de problemen. De spaarrekening staat er, hij groeit alleen niet, en elk jaar denk je dat het
        volgend jaar beter wordt. Wie op dit niveau nooit heeft uitgerekend hoeveel er redelijkerwijs zou
        moeten overblijven, heeft ook geen enkele reden om te denken dat er iets mis is.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Vandaar de rekenaar bovenaan. Niet om te zeggen dat je te veel uitgeeft, maar om één getal naast
        het andere te zetten: wat er bij een huishouden als het jouwe te verwachten is, en wat er
        werkelijk overblijft. Pas als die twee ver uit elkaar liggen is er iets uit te zoeken.
      </p>

      {/* Echte huishoudens op dit niveau */}
      <div className="rounded-xl border p-5 my-8" style={{ backgroundColor: "#FFFFFF", borderColor: "#E6E9E7" }}>
        <p className="font-body font-medium text-sm mb-1" style={{ color: "#16211F" }}>
          Wat er bij twee huishoudens op dit niveau werkelijk uitkwam
        </p>
        <p className="font-body text-sm mb-4" style={{ color: "#4A5A56", fontWeight: 300 }}>
          Geen voorbeeldgezin, maar twee huishoudens die hun cijfers bij mij aanleverden. Beide zitten
          boven de €5.000 netto en bij beide was mijn conclusie dat er niets te repareren viel.
        </p>
        <div className="space-y-3">
          <Link
            href="/rapporten/stel-zonder-kinderen"
            className="block rounded-lg px-4 py-3 transition-colors hover:border-[#0B7A6E]"
            style={{ border: "1px solid #E6E9E7", textDecoration: "none" }}
          >
            <p className="font-body font-medium text-sm" style={{ color: "#16211F" }}>
              Stel eind 30, geen kinderen, samen €6.990 netto
            </p>
            <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
              Zij dachten dat ze te makkelijk geld uitgaven en misten 700 tot 900 euro per maand. Er was
              geen lek: hun spaardoel van 40.000 euro in drie jaar vraagt 1.110 euro per maand en dat past
              niet naast de reizen die ze niet wilden schrappen. &rarr;
            </p>
          </Link>
          <Link
            href="/rapporten/zzp-wisselend-inkomen"
            className="block rounded-lg px-4 py-3 transition-colors hover:border-[#0B7A6E]"
            style={{ border: "1px solid #E6E9E7", textDecoration: "none" }}
          >
            <p className="font-body font-medium text-sm" style={{ color: "#16211F" }}>
              Zzp met partner in loondienst, maanden tussen €2.400 en €8.100
            </p>
            <p className="font-body text-sm" style={{ color: "#4A5A56", fontWeight: 300 }}>
              Op gemiddelde basis ruim genoeg. Het probleem was dat een grillig inkomen werd behandeld als
              een vast salaris. &rarr;
            </p>
          </Link>
        </div>
        <p className="font-body text-xs mt-4 mb-0" style={{ color: "#8B958F" }}>
          Vijf complete rapporten staan op deze site, met toestemming en met de evaluatie van de klant na
          drie tot vier maanden.{" "}
          <Link href="/rapporten" className="hover:underline" style={{ color: "#0B7A6E" }}>
            Bekijk ze alle vijf
          </Link>
          .
        </p>
      </div>

      <h2 className="font-display" style={h2}>
        Is €6.000 netto per maand veel?
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Ja, en bovendien geldt bij €6.000 alles wat hierboven staat nog wat sterker. Boven de €5.000 netto
        verschuift het patroon dat ik zie: de vaste lasten zijn dan bijna nooit het probleem, en de vraag
        gaat vrijwel altijd over de verhouding tussen levensstijl en doelen. Bij twee inkomens komt daar
        nog iets bij dat een enkel salaris niet heeft, namelijk dat je met twee mensen twee verschillende
        verhalen hebt over waar het geld blijft. Daarover gaat{" "}
        <Link href="/inzichten/samen-6000-euro-netto-toch-niets-over" className="hover:underline" style={{ color: "#0B7A6E" }}>
          samen €6.000 netto en toch niets over
        </Link>
        .
      </p>

      <h2 className="font-display" style={h2}>
        Wat je hier concreet mee kunt
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Drie stappen, in deze volgorde, en de eerste kost vijf minuten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Zet in de rekenaar hierboven je eigen bedrag en huishouden, en vul in wat er werkelijk overblijft.
        Ligt dat binnen een paar honderd euro van de verwachting, dan is er geen probleem en is de vraag
        wat je met die ruimte doet. Ligt het er honderden euro&apos;s onder, dan zit er iets waar je nog
        niet naar hebt gekeken.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Reken vervolgens je jaaruitgaven om naar een maandbedrag. Vakantie, onderhoud, december,
        verjaardagen, de auto die op moet. Bij elk huishouden dat ik doorrekende was dit de post die het
        gat verklaarde, en hij staat in geen enkele maandbegroting. Wie €7.000 per jaar aan die dingen
        uitgeeft, moet daar bijna €600 per maand voor wegzetten.
      </p>
      <p className="font-body text-text-soft" style={p}>
        En bepaal daarna wat je wilt dat er overblijft, en waarom. Zonder dat antwoord is €500 over per
        maand zowel prima als veel te weinig. Meer daarover in{" "}
        <Link href="/inzichten/spaardoelen-maandelijkse-inleg" className="hover:underline" style={{ color: "#0B7A6E" }}>
          werken met spaardoelen
        </Link>
        .
      </p>
    </>
  );
}
