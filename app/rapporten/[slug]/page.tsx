import type { Metadata } from "next";
import Link from "next/link";
import CtaLink from "@/components/CtaLink";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { RAPPORTEN, rapportVoorSlug, type Post } from "@/lib/rapporten-data";

export function generateStaticParams() {
  return RAPPORTEN.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const r = rapportVoorSlug(params.slug);
  if (!r) return {};
  return {
    title: r.metaTitel,
    description: r.metaDescription,
    alternates: { canonical: `https://www.waarblijfthet.nl/rapporten/${r.slug}` },
    openGraph: {
      // Bij delen werkt de verhalende kop beter dan de zoekwoordvariant. De
      // title-tag blijft wel op zoekwoorden staan, want die moet vindbaar zijn.
      title: r.verhaalTitel,
      description: r.metaDescription,
      url: `https://www.waarblijfthet.nl/rapporten/${r.slug}`,
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

const h3 = {
  fontSize: "1.25rem",
  color: "#16211F",
  marginTop: "2.25rem",
  marginBottom: "0.9rem",
  fontWeight: 400,
} as const;

const p = { fontSize: "0.98rem", lineHeight: 1.75, marginBottom: "1rem" } as const;

function PostLijst({ posten }: { posten: Post[] }) {
  return (
    <div className="mb-4">
      {posten.map((post) => (
        <div key={post.label} className="py-3" style={{ borderBottom: "1px solid #E6E9E7" }}>
          <p className="font-body font-medium text-primary text-sm mb-0.5">{post.label}</p>
          <p className="font-body font-light text-text-soft text-sm leading-relaxed">{post.waarde}</p>
        </div>
      ))}
    </div>
  );
}

export default function RapportPagina({ params }: { params: { slug: string } }) {
  const r = rapportVoorSlug(params.slug);
  if (!r) notFound();

  const anderen = RAPPORTEN.filter((a) => a.slug !== r.slug);

  return (
    <>
      <Header />
      <main>
        <article className="bg-background pt-10 pb-14">
          <div className="max-w-3xl mx-auto px-6">
            <p className="font-body text-sm mb-6">
              <Link href="/rapporten" className="hover:underline" style={{ color: "#0B7A6E" }}>
                &larr; Alle vijf rapporten
              </Link>
            </p>

            <p className="section-eyebrow mb-3">{r.chip} · echt rapport</p>
            <h1 className="font-display font-light text-primary text-3xl sm:text-4xl mb-3 leading-tight">
              {r.verhaalTitel}
            </h1>
            <p className="font-body font-medium text-primary text-sm mb-2">{r.kenmerken.join(" · ")}</p>
            <p className="font-body font-light text-text-soft leading-relaxed mb-2">{r.profiel}</p>
            <p className="font-body font-light text-text-muted text-sm leading-relaxed">
              Gepubliceerd met toestemming. Namen zijn weggelaten en herkenbare details zijn aangepast, alle
              bedragen staan er onveranderd.
            </p>

            {/* Vermoeden versus uitkomst */}
            <div
              className="card-base border border-[#E6E9E7] mt-8"
              style={{ borderLeft: "3px solid #0B7A6E" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <p className="section-eyebrow mb-2">Wat ze vooraf zelf dachten</p>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed mb-2">
                    &ldquo;{r.vermoeden}&rdquo;
                  </p>
                  <p className="font-body font-light text-text-muted text-xs leading-relaxed">
                    {r.vermoedenBedrag}
                  </p>
                </div>
                <div className="sm:pl-6" style={{ borderTop: "1px solid #E6E9E7", paddingTop: "1.25rem" }}>
                  <p className="section-eyebrow mb-2">Wat eruit kwam</p>
                  <p className="font-body font-medium text-primary text-sm mb-2 leading-snug">{r.uitkomstKop}</p>
                  <p className="font-body font-light text-text-soft text-sm leading-relaxed">{r.uitkomst}</p>
                </div>
              </div>
            </div>

            <h2 style={h3}>Wat er binnenkomt</h2>
            <PostLijst posten={r.inkomsten} />

            <h2 style={h3}>Vaste lasten, vervoer en verzekeringen</h2>
            <PostLijst posten={r.lasten} />

            <h2 style={h3}>Dagelijks leven en jaaruitgaven</h2>
            <PostLijst posten={r.dagelijks} />

            <h2 style={h3}>Wat de vergelijking niet weet</h2>
            <p style={p} className="text-text-soft font-body font-light">
              Dit is het deel dat ik uit cijfers niet kan halen en waar ik dus naar vraag. Zonder deze antwoorden
              had ik hierboven een standaardhuishouden beschreven in plaats van dit huishouden.
            </p>
            <PostLijst posten={r.context} />

            <h2 style={h3}>Bankafschriften meegestuurd?</h2>
            <p style={p} className="text-text-soft font-body font-light">
              {r.afschriften}
            </p>

            <h2 style={h3}>Wat ik zie</h2>
            <p style={p} className="text-text-soft font-body font-light">
              {r.adviesInleiding}
            </p>

            <h2 style={h3}>Het plan</h2>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              {r.plan.map((stap) => (
                <li key={stap} style={p} className="text-text-soft font-body font-light">
                  {stap}
                </li>
              ))}
            </ol>

            {/* Evaluatie */}
            <div
              className="card-base border border-[#E6E9E7] mt-8"
              style={{ backgroundColor: "#E7F1EE", borderColor: "#A6D8CD" }}
            >
              <p className="section-eyebrow mb-3">Hun evaluatie, {r.doorlooptijd}</p>
              <p className="font-body font-light text-primary text-base leading-relaxed mb-4">
                &ldquo;{r.evaluatie}&rdquo;
              </p>
              <p className="font-body font-medium text-primary text-sm mb-1">
                Vervolggesprek: {r.vervolggesprek ? "ja" : "nee"}
              </p>
              <p className="font-body font-light text-text-soft text-sm leading-relaxed">
                {r.vervolggesprekReden}
              </p>
            </div>

            <p className="font-body font-light text-text-muted text-sm leading-relaxed mt-6">
              Dit is één huishouden en geen belofte over jouw uitkomst. Wat hier veranderde is opgeschreven door
              de klant zelf, {r.doorlooptijd}, en niet door mij gemeten.
            </p>

            {/* Andere situaties */}
            <div className="mt-10 pt-8" style={{ borderTop: "1px solid #E6E9E7" }}>
              <p className="font-body font-medium text-primary text-sm mb-3">Een andere situatie bekijken</p>
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
                {anderen.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/rapporten/${a.slug}`}
                    className="font-body text-sm font-medium whitespace-nowrap transition-colors hover:border-[#0B7A6E] shrink-0"
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "999px",
                      border: "1px solid #E6E9E7",
                      color: "#16211F",
                      textDecoration: "none",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    {a.chip} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </article>

        <section className="bg-card py-14">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="font-display font-light text-primary text-2xl sm:text-3xl mb-4">
              Hoe staat jouw situatie ervoor?
            </h2>
            <p className="font-body font-light text-text-soft leading-relaxed mb-7">
              Begin met de gratis analyse. In een paar minuten zie je waar jouw huishouden afwijkt van
              vergelijkbare huishoudens. Daarna bepaal je zelf of je verder wilt.
            </p>
            <CtaLink doel="analyse" href="/analyse" locatie="rapport-slot" className="btn-primary">
              Doe de gratis analyse &rarr;
            </CtaLink>
            <p className="font-body font-light text-text-muted text-sm mt-5">
              <CtaLink doel="geldscan" href="/geldscan" locatie="rapport-slot" className="hover:underline">
                Na de analyse kun je altijd nog kiezen voor de Geldscan &rarr;
              </CtaLink>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
