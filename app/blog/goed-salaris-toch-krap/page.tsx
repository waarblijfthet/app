import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Goed salaris, toch krap aan het einde van de maand — hoe kan dat?",
  description:
    "Goed verdienen maar toch weinig over? Je bent niet de enige. Ontdek waarom het geld verdwijnt en wat je er zonder grote offers aan kunt doen.",
  alternates: {
    canonical: "https://waarblijfthet.nl/blog/goed-salaris-toch-krap",
  },
  openGraph: {
    title: "Goed salaris, toch krap aan het einde van de maand — hoe kan dat? | Waar blijft het",
    description:
      "Goed verdienen maar toch weinig over? Je bent niet de enige. Ontdek waarom het geld verdwijnt en wat je er zonder grote offers aan kunt doen.",
    url: "https://waarblijfthet.nl/blog/goed-salaris-toch-krap",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Goed salaris, toch krap aan het einde van de maand — hoe kan dat?",
  description:
    "Goed verdienen maar toch weinig over? Je bent niet de enige. Ontdek waarom het geld verdwijnt en wat je er zonder grote offers aan kunt doen.",
  datePublished: "2026-05-19",
  dateModified: "2026-05-19",
  author: {
    "@type": "Organization",
    name: "Waar blijft het",
    url: "https://waarblijfthet.nl",
  },
  publisher: {
    "@type": "Organization",
    name: "Waar blijft het",
    url: "https://waarblijfthet.nl",
  },
  url: "https://waarblijfthet.nl/blog/goed-salaris-toch-krap",
  inLanguage: "nl",
};

export default function ArticlePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />

      <main className="pt-16">
        <article>
          {/* Article header */}
          <header className="bg-background pt-16 pb-12">
            <div className="max-w-2xl mx-auto px-6">
              <nav className="mb-8" aria-label="Broodkruimel">
                <ol className="flex items-center gap-2 text-text-muted font-body text-xs">
                  <li>
                    <Link href="/" className="hover:text-primary transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/blog" className="hover:text-primary transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-text-soft truncate max-w-xs">
                    Goed salaris, toch krap
                  </li>
                </ol>
              </nav>

              <div className="flex items-center gap-3 mb-6">
                <time
                  dateTime="2026-05-19"
                  className="text-text-muted font-body text-sm"
                >
                  19 mei 2026
                </time>
                <span className="text-text-muted font-body text-sm">·</span>
                <span className="text-text-muted font-body text-sm">5 min leestijd</span>
              </div>

              <h1 className="font-display font-light text-primary text-4xl sm:text-5xl leading-tight mb-6">
                Goed salaris, toch krap aan het einde van de maand — hoe kan dat?
              </h1>

              <p className="text-text-soft font-body font-light text-lg leading-relaxed">
                Je verdient genoeg. Niet extreem, maar genoeg. En toch staat er
                aan het einde van de maand bijna niks meer op de rekening.
              </p>
            </div>
          </header>

          {/* Article body */}
          <div className="bg-background py-12 pb-24">
            <div className="max-w-2xl mx-auto px-6 prose-article">
              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-6">
                Je verdient genoeg. Niet extreem, maar genoeg. Twee inkomens
                misschien, of één solide. Geen grote schulden, geen gekke
                aankopen. En toch staat er aan het einde van de maand bijna
                niks meer op de rekening.
              </p>

              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-10">
                Het is een van de meest gehoorde — maar zelden uitgesproken —
                frustraties van Nederlandse gezinnen. Want hoe leg je dit uit
                aan een ander? Je kunt moeilijk klagen als je goed verdient.
                Dus zwijg je. En vraag je je &lsquo;s avonds op de bank af waar het
                toch naartoe gaat.
              </p>

              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-10">
                Het antwoord is bijna nooit één grote oorzaak. Het is een
                combinatie van kleine dingen die samen een groot gat slaan.
              </p>

              <h2 className="font-display font-light text-primary text-3xl mb-4 mt-12">
                Vaste lasten die stiller groeien dan je doorhebt
              </h2>
              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-6">
                De meeste mensen kennen hun grote vaste lasten: huur of
                hypotheek, verzekeringen, energie. Maar de categorie daaronder
                is verraderlijk. Streamingdiensten, sportabonnementen, apps,
                telefoonabonnementen — die stapelen zich op zonder dat je het
                bewust doorhebt.
              </p>
              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-10">
                Een gemiddeld Nederlands gezin betaalt inmiddels meer dan €200
                per maand aan abonnementen. Tien jaar geleden was dat een
                fractie daarvan. De meesten schatten het op de helft.
              </p>

              <h2 className="font-display font-light text-primary text-3xl mb-4 mt-12">
                Boodschappen — de categorie die niemand echt bijhoudt
              </h2>
              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-6">
                Vraag iemand wat hij maandelijks uitgeeft aan boodschappen. Het
                antwoord is bijna altijd te laag. Niet omdat mensen liegen,
                maar omdat ze het gewoon niet precies weten.
              </p>
              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-10">
                Voor een gezin met twee kinderen is €700 tot €900 per maand
                geen uitzondering. Wie dat aan zichzelf vraagt, noemt vaak €500.
              </p>

              <h2 className="font-display font-light text-primary text-3xl mb-4 mt-12">
                De buffer die er nooit is
              </h2>
              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-10">
                Als er geen structurele buffer is, betaal je alles uit je
                maandelijkse inkomen. Ook de onverwachte dingen: een kapotte
                wasmachine, een hoge energierekening, schoolspullen. Die dingen
                zijn niet onverwacht — ze komen elke keer. Maar ze worden niet
                meegenomen in het maandbudget.
              </p>

              <h2 className="font-display font-light text-primary text-3xl mb-4 mt-12">
                Het ontbreekt niet aan geld, maar aan structuur
              </h2>
              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-6">
                Dit is het inzicht dat voor veel gezinnen het meeste oplevert:
                het probleem is zelden het inkomen. Het is de afwezigheid van
                een systeem.
              </p>
              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-10">
                Gezinnen die hetzelfde verdienen maar structureel meer
                overhouden, doen één ding anders: ze verdelen hun inkomen
                direct. Vaste lasten van een aparte rekening, spaardoelen in
                aparte potjes, een vast bedrag voor dagelijkse uitgaven.
              </p>

              <h2 className="font-display font-light text-primary text-3xl mb-4 mt-12">
                De eerste stap is inzicht, niet bezuinigen
              </h2>
              <p className="text-text-soft font-body font-light text-base leading-relaxed mb-6">
                Kijk eerst wat er werkelijk gebeurt. Pak de afschriften van de
                afgelopen twee maanden en tel drie dingen op: vaste lasten,
                boodschappen, en alles wat overblijft.
              </p>

              {/* Internal CTA */}
              <div className="bg-green-light rounded-xl p-6 mt-10">
                <p className="font-display font-light text-primary text-xl mb-3">
                  Benieuwd hoe jullie het doen?
                </p>
                <p className="text-text-soft font-body font-light text-sm mb-5">
                  Doe de gratis analyse en zie direct waar jouw situatie
                  afwijkt van vergelijkbare gezinnen.
                </p>
                <Link href="/analyse" className="btn-primary">
                  Start gratis analyse
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
