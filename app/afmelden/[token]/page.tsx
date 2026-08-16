import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createServiceClient } from "@/lib/supabase-service";
import { VOORBEELD_TOKEN } from "@/lib/outreach/afmelden";
import AfmeldKnop from "./AfmeldKnop";

// Publieke afmeldpagina, de zichtbare link onderaan elke outreach-mail.
// Deze pagina meldt bewust nog niemand af: dat doet pas de knop (POST naar
// /api/afmelden/<token>). Link-scanners van Outlook en virusscanners openen
// alle links in een mail automatisch met GET; zou deze pagina zelf afmelden,
// dan meldden die scanners mensen ongewild af. Zie lib/outreach/afmelden.ts.

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Afmelden",
  description: "Afmelden voor mail van Waar blijft het.",
  robots: { index: false, follow: false },
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function Kader({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: "#F7F8F7" }}>
        <div style={{ maxWidth: "620px", margin: "0 auto", padding: "6rem 2rem" }}>{children}</div>
      </main>
      <Footer />
    </>
  );
}

export default async function AfmeldPagina({ params }: { params: { token: string } }) {
  const token = (params.token ?? "").trim();

  // Voorbeeldlink uit de admin-preview (/admin/mailsjablonen): nooit iemand
  // afmelden, wel laten zien wat de ontvanger te zien krijgt.
  if (token === VOORBEELD_TOKEN) {
    return (
      <Kader>
        <h1 className="font-display font-light text-primary text-4xl mb-6">Afmelden</h1>
        <p className="font-body font-light text-text-soft text-base leading-relaxed">
          Dit is de voorbeeldversie van deze pagina, zoals hij vanuit het mailsjabloon-voorbeeld geopend
          wordt. In een echte mail staat hier het e-mailadres van de ontvanger, met een knop eronder.
        </p>
      </Kader>
    );
  }

  let contact: { naam: string | null; email: string; afgemeld_at: string | null } | null = null;
  if (UUID.test(token)) {
    const supabase = createServiceClient();
    const { data } = await supabase
      .from("outreach_contacts")
      .select("naam, email, afgemeld_at")
      .eq("afmeld_token", token)
      .maybeSingle();
    contact = data ?? null;
  }

  if (!contact) {
    return (
      <Kader>
        <h1 className="font-display font-light text-primary text-4xl mb-6">Deze link werkt niet meer</h1>
        <p className="font-body font-light text-text-soft text-base leading-relaxed">
          Waarschijnlijk is de link onderweg afgekapt door je mailprogramma. Stuur in dat geval een mailtje
          naar{" "}
          <a href="mailto:hallo@waarblijfthet.nl?subject=Afmelden" className="underline">
            hallo@waarblijfthet.nl
          </a>{" "}
          met &quot;afmelden&quot; erin, dan haal ik je er handmatig uit.
        </p>
      </Kader>
    );
  }

  if (contact.afgemeld_at) {
    return (
      <Kader>
        <h1 className="font-display font-light text-primary text-4xl mb-6">Je bent al afgemeld</h1>
        <p className="font-body font-light text-text-soft text-base leading-relaxed">
          <strong className="font-normal">{contact.email}</strong> staat al op de lijst van adressen die ik
          niet meer mail. Je hoeft verder niets te doen.
        </p>
      </Kader>
    );
  }

  return (
    <Kader>
      <h1 className="font-display font-light text-primary text-4xl mb-6">Afmelden</h1>
      <p className="font-body font-light text-text-soft text-base leading-relaxed mb-4">
        Je staat op het punt <strong className="font-normal">{contact.email}</strong> af te melden. Daarna
        krijg je geen mail meer van mij, ook geen herinnering, en verdwijnt je adres uit mijn lijst.
      </p>
      <p className="font-body font-light text-text-soft text-base leading-relaxed mb-8">
        Eén klik en het is geregeld, je hoeft niets terug te mailen.
      </p>
      <AfmeldKnop token={token} email={contact.email} />
    </Kader>
  );
}
