/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/voorbeeldrapport", destination: "/rapporten", permanent: true },
      { source: "/blog", destination: "/inzichten", permanent: true },
      { source: "/blog/:slug", destination: "/inzichten/:slug", permanent: true },
      { source: "/inzichten/boodschappen-duitsland-voordeel", destination: "/inzichten/vergelijken-boodschappen-nederland-duitsland", permanent: true },
      // 6-sep-2026: modaal-inkomen-2026 had nul vertoningen in 90 dagen terwijl
      // is-4000 en is-5000 de modaaltermen op positie 2,2 bezetten. Zie
      // docs/gsc-nulmeting-05-sep-2026.md bevinding 1.
      { source: "/inzichten/modaal-inkomen-2026", destination: "/inzichten/is-4000-euro-netto-goed-salaris-nederland", permanent: true },
      // 6-sep-2026: cluster P geconsolideerd. Deze had 15 vertoningen op positie
      // 57,5. Doel is waarom-hou-ik-nooit-geld-over, dat op dezelfde vraag staat
      // en wel rankt (188 vertoningen). Zie docs/bouwvolgorde-06-sep-2026.md.
      { source: "/inzichten/waar-blijft-mijn-geld-einde-maand", destination: "/inzichten/waarom-hou-ik-nooit-geld-over", permanent: true },
    ];
  },
};

export default nextConfig;
