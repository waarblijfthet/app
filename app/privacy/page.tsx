import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Hoe Waar blijft het omgaat met jouw gegevens.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen" style={{ background: "#F7F8F7" }}>
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "6rem 2rem",
          }}
        >
          <h1 className="font-display font-light text-primary text-4xl sm:text-5xl mb-8">
            Privacybeleid
          </h1>

          <p className="font-body font-light text-text-soft text-base leading-relaxed mb-12">
            Waar blijft het respecteert jouw privacy. Op deze pagina leggen we
            uit welke gegevens we verzamelen, waarom, en hoe we ermee omgaan.
            We zijn er eerlijk over: we vragen zo min mogelijk en bewaren niks
            langer dan nodig.
          </p>

          <section className="mb-10">
            <h2 className="font-display font-light text-primary text-2xl mb-4">
              Welke gegevens verzamelen we?
            </h2>
            <p className="font-body font-light text-text-soft text-base leading-relaxed">
              We verzamelen je emailadres als je je aanmeldt voor de wachtlijst
              of de gratis analyse invult. Als je toestemming geeft, bewaren we
              ook de antwoorden die je invult in de analyse, volledig anoniem
              en alleen gebruikt om onze benchmarks te verbeteren. We slaan geen
              wachtwoorden, betaalgegevens of persoonsgegevens anders dan je
              emailadres op.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display font-light text-primary text-2xl mb-4">
              Waarom verzamelen we dit?
            </h2>
            <p className="font-body font-light text-text-soft text-base leading-relaxed">
              Je emailadres gebruiken we om je te informeren als we live gaan of
              nieuwe inzichten delen, alleen als je daar expliciet toestemming
              voor hebt gegeven. De quiz-antwoorden (als je toestemming geeft)
              gebruiken we om te begrijpen hoe Nederlandse gezinnen hun geld
              besteden, zodat onze vergelijkingen steeds beter worden.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display font-light text-primary text-2xl mb-4">
              Hoe lang bewaren we je gegevens?
            </h2>
            <p className="font-body font-light text-text-soft text-base leading-relaxed">
              Je emailadres bewaren we totdat je je afmeldt. Dat kan altijd via
              een simpele mail naar{" "}
              <a
                href="mailto:hallo@waarblijfthet.nl"
                className="text-primary hover:underline"
              >
                hallo@waarblijfthet.nl
              </a>
              . Quiz-antwoorden bewaren we maximaal 2 jaar, waarna ze worden
              verwijderd.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display font-light text-primary text-2xl mb-4">
              Delen we je gegevens?
            </h2>
            <p className="font-body font-light text-text-soft text-base leading-relaxed">
              Nee. We verkopen of delen je gegevens niet met derden. We
              gebruiken Supabase als database, een Amerikaanse dienst met
              Europese servers en een geldig Data Processing Agreement.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display font-light text-primary text-2xl mb-4">
              Jouw rechten
            </h2>
            <p className="font-body font-light text-text-soft text-base leading-relaxed">
              Je hebt het recht om je gegevens in te zien, te laten corrigeren
              of te laten verwijderen. Stuur daarvoor een mail naar{" "}
              <a
                href="mailto:hallo@waarblijfthet.nl"
                className="text-primary hover:underline"
              >
                hallo@waarblijfthet.nl
              </a>
              . We reageren binnen 5 werkdagen.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display font-light text-primary text-2xl mb-4">
              Contact
            </h2>
            <p className="font-body font-light text-text-soft text-base leading-relaxed">
              Vragen over dit privacybeleid? Mail naar{" "}
              <a
                href="mailto:hallo@waarblijfthet.nl"
                className="text-primary hover:underline"
              >
                hallo@waarblijfthet.nl
              </a>
              . Waar blijft het is gevestigd in Tilburg, Nederland.
            </p>
          </section>

          <p
            className="font-body text-text-muted border-t border-[#E6E9E7] pt-8"
            style={{ fontSize: "0.8rem" }}
          >
            Laatst bijgewerkt: mei 2026
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
