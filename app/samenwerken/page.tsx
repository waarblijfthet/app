import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Samenwerken met Waar blijft het — voor professionals",
  description:
    "Werkt u met gezinnen of stellen die financieel krap zitten ondanks een goed inkomen? Waar blijft het pakt het gelddeel aan — als aanvulling op uw praktijk.",
  alternates: { canonical: "https://www.waarblijfthet.nl/samenwerken" },
  openGraph: {
    title: "Samenwerken met Waar blijft het — voor professionals",
    description:
      "Voor relatiestherapeuten, budgetcoaches, financieel planners en burnout coaches. Wij pakken het gelddeel aan.",
    url: "https://www.waarblijfthet.nl/samenwerken",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const partners = [
  {
    href: "/samenwerken/relatiestherapeuten",
    label: "Relatiestherapeuten & koppelcoaches",
    beschrijving:
      "Koppels die bij jou komen over communicatie of verwijdering — terwijl het eigenlijke probleem een onopgelost maandbudget is.",
    eyebrow: "Geld als relatiestressor",
  },
  {
    href: "/samenwerken/budgetcoaches",
    label: "Budgetcoaches & schuldhulpverleners",
    beschrijving:
      "Cliënten die te veel verdienen voor schuldhulp, maar wel grip nodig hebben. Het middensegment dat overal buiten valt.",
    eyebrow: "Het middensegment",
  },
  {
    href: "/samenwerken/financieel-planners",
    label: "Financieel planners & vermogensadviseurs",
    beschrijving:
      "Cliënten die willen beleggen of vermogen opbouwen, maar geen helder beeld hebben van hun maandelijkse vrije ruimte.",
    eyebrow: "Cashflow als fundament",
  },
  {
    href: "/samenwerken/burnout-coaches",
    label: "Burnout coaches & psychologen",
    beschrijving:
      "Financiële onduidelijkheid is een chronische stressor. Wij nemen het gelddeel over — zodat jij kunt werken aan herstel.",
    eyebrow: "Geldstress wegnemen",
  },
];

export default function SamenwerkenPage() {
  return (
    <>
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-background pt-16 pb-10">
          <div className="max-w-3xl mx-auto px-6">
            <p className="section-eyebrow mb-4">Voor professionals</p>
            <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-6 max-w-2xl leading-tight">
              Uw cliënten zitten krap.<br />
              Wij weten waarom.
            </h1>
            <p className="text-text-soft font-body font-light text-lg leading-relaxed max-w-2xl">
              Waar blijft het helpt gezinnen en stellen die goed verdienen maar structureel
              krap zitten. Als therapeut, coach of adviseur bent u misschien de eerste die
              dit signaleert — maar niet degene die het oplost. Wij zijn de schakel die
              ontbreekt.
            </p>
          </div>
        </section>

        {/* Partner cards */}
        <section className="bg-background pb-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-6">
              Voor welke professionals is dit relevant?
            </h2>
            <div className="space-y-4">
              {partners.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="block card-base border border-[#E8E0D0] hover:border-[#C4603A] transition-colors group"
                  style={{ textDecoration: "none" }}
                >
                  <p className="font-body text-xs font-medium mb-1" style={{ color: "#C4603A" }}>
                    {p.eyebrow}
                  </p>
                  <p className="font-body font-medium text-primary text-base mb-1 group-hover:underline">
                    {p.label} →
                  </p>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                    {p.beschrijving}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Over Jarno */}
        <section className="bg-card py-14">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Wie is Jarno?
            </h2>
            <p className="text-text-soft font-body font-light text-base leading-relaxed mb-4">
              Ik ben Jarno Koopman, oprichter van Waar blijft het. Ik help gezinnen en stellen
              met een modaal tot bovenmodaal inkomen die structureel krap zitten zonder dat ze
              begrijpen waarom. Geen schuldhulp, geen beleggingsadvies — gewoon eerlijk inzicht
              in het maandbudget en concrete stappen.
            </p>
            <p className="text-text-soft font-body font-light text-base leading-relaxed">
              Ik werk onafhankelijk en geloof in duidelijke schakels. Als ik de financiën doe
              en jij doet wat jij goed kunt, werkt dat beter voor de mensen die wij allebei
              willen helpen.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark-block py-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-white text-3xl sm:text-4xl mb-5">
              Wil je kennismaken?
            </h2>
            <p className="text-white/70 font-body font-light text-base mb-8 max-w-md mx-auto">
              Stuur een korte mail — dan plannen we een gesprek van 20 minuten om te kijken
              of we passen.
            </p>
            <a
              href="mailto:hallo@waarblijfthet.nl?subject=Samenwerking"
              className="btn-primary"
              style={{ backgroundColor: "#C4603A", borderColor: "#C4603A" }}
            >
              Mail Jarno →
            </a>
            <p className="mt-6">
              <Link
                href="/analyse"
                className="font-body text-sm"
                style={{ color: "rgba(245,240,232,0.7)", textDecoration: "none" }}
              >
                Of bekijk eerst de gratis analyse voor cliënten →
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
