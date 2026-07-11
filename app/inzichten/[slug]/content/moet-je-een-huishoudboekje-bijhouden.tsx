import Link from "next/link";

const h2 = { fontSize: "1.6rem", color: "#16211F", marginTop: "2.5rem", marginBottom: "1rem", fontWeight: 300 } as const;
const p = { marginBottom: "1.25rem", fontWeight: 300 } as const;

export default function MoetJeEenHuishoudboekjeBijhouden() {
  return (
    <>
      <div className="rounded-xl p-5 mb-8" style={{ backgroundColor: "#E7F1EE", border: "1.5px solid #9CCFC4" }}>
        <p className="font-body font-semibold text-sm mb-3" style={{ color: "#16211F" }}>Na dit artikel weet je:</p>
        <ul className="space-y-1.5">
          {[
            "Waarom een huishoudboekje bij de meeste mensen niet beklijft",
            "Wat het wel en niet voor je oplost",
            "Welk alternatief beter werkt als je goed verdient",
          ].map((item, i) => (
            <li key={i} className="flex gap-2 font-body text-sm" style={{ color: "#16211F" }}>
              <span className="mt-0.5 shrink-0" style={{ color: "#0B7A6E" }}>✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="font-body text-text-soft" style={p}>
        Overal krijg je hetzelfde advies: houd een huishoudboekje bij. Misschien
        heb je het geprobeerd, twee weken volgehouden, en toen liep het dood. Dat
        ligt niet aan jou.
      </p>
      <p className="font-body" style={{ ...p, fontWeight: 400, color: "#16211F" }}>
        Kort gezegd: nee, je hoeft geen huishoudboekje bij te houden om grip te
        krijgen. Elke uitgave registreren vecht tegen je eigen gedrag en vraagt
        elke dag opnieuw wilskracht. Wat wel werkt, is je geld vooraf verdelen in
        een simpel systeem, zodat je niets meer hoeft bij te houden.
      </p>

      <h2 className="font-display" style={h2}>
        Waarom een huishoudboekje vaak niet blijft plakken
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Een huishoudboekje leunt volledig op discipline: je moet elke dag elke
        uitgave noteren, ook als je moe bent of geen zin hebt. Zodra je een paar
        dagen mist, klopt het overzicht niet meer en haak je af. Het is dus geen
        gebrek aan doorzettingsvermogen dat het misgaat, het is een methode die
        tegen normaal menselijk gedrag in werkt. Precies daarom houden zo weinig
        mensen het langer dan een paar weken vol.
      </p>

      <h2 className="font-display" style={h2}>
        Wat een huishoudboekje wel en niet oplost
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Eenmalig je uitgaven op een rij zetten is waardevol, want dan zie je waar
        je geld werkelijk heen gaat. Dat inzicht is nuttig. Maar het blijvend
        bijhouden verandert je gedrag niet vanzelf: je weet dan wel dat je te veel
        uitgeeft, maar je hebt geen systeem dat het tegenhoudt. Inzicht zonder
        structuur is als een weegschaal zonder plan. Je meet het probleem, maar je
        lost het niet op.
      </p>

      <h2 className="font-display" style={h2}>
        Het alternatief: structuur in plaats van registratie
      </h2>
      <p className="font-body text-text-soft" style={p}>
        In plaats van achteraf alles noteren, verdeel je je inkomen vooraf. Zodra
        je salaris binnenkomt, gaat een vast deel naar je vaste lasten, een deel
        naar sparen en een deel naar dagelijkse uitgaven, elk op een eigen plek.
        Wat op je uitgavenrekening staat, mag op. Zo hoef je niets bij te houden,
        want de verdeling doet het werk. Hoe je dat opzet, staat in{" "}
        <Link href="/inzichten/geld-indelen-salaris-potjes-systeem" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">je salaris slim indelen met potjes</Link>{" "}en{" "}
        <Link href="/inzichten/50-30-20-regel-hoger-inkomen" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">werkt de 50/30/20-regel bij een hoger inkomen</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Voor wie een huishoudboekje wel zinvol is
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Tijdelijk bijhouden is wel nuttig, namelijk als je een paar weken lang
        wilt ontdekken waar je geld precies blijft. Zie het als een momentopname,
        niet als een gewoonte voor de rest van je leven. Na die momentopname zet
        je de structuur op, en kun je het boekje weer loslaten. Meer over een{" "}
        <Link href="/inzichten/budget-maken-dat-je-volhoudt" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">budget dat je wel volhoudt</Link>.
      </p>

      <h2 className="font-display" style={h2}>
        Begin met eenmalig inzicht, bouw daarna structuur
      </h2>
      <p className="font-body text-text-soft" style={p}>
        Wil je dat inzicht zonder wekenlang bijhouden? Doe de{" "}
        <Link href="/analyse" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">gratis analyse</Link>. Je vergelijkt in een paar minuten je uitgaven met vergelijkbare huishoudens, en ziet meteen waar de ruimte zit, zonder een boekje bij te houden.
      </p>
      <p className="font-body text-text-soft" style={p}>
        Lees ook{" "}
        <Link href="/inzichten/waar-blijft-mijn-geld-einde-maand" style={{ color: "#0B7A6E", textDecoration: "none" }} className="hover:underline">waar je geld aan het einde van de maand blijft</Link>.
      </p>
    </>
  );
}
