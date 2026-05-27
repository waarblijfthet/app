import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { PageTracker } from "@/components/PageTracker";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://waarblijfthet.nl"),
  title: {
    default: "Waar blijft het — Goed salaris, toch altijd krap?",
    template: "%s | Waar blijft het",
  },
  description:
    "Je verdient goed maar houdt weinig over. Wij laten zien waar het naartoe gaat — vergeleken met gezinnen zoals jullie. Gratis analyse, geen bankadvies.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://waarblijfthet.nl",
    siteName: "Waar blijft het",
    title: "Waar blijft het — Goed salaris, toch altijd krap?",
    description:
      "Je verdient goed maar houdt weinig over. Wij laten zien waar het naartoe gaat — vergeleken met gezinnen zoals jullie. Gratis analyse, geen bankadvies.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Waar blijft het",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Waar blijft het — Goed salaris, toch altijd krap?",
    description:
      "Je verdient goed maar houdt weinig over. Wij laten zien waar het naartoe gaat.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://waarblijfthet.nl",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-body antialiased">
        {children}
        <BottomNav />
        <PageTracker />
      </body>
    </html>
  );
}
