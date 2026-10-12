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
      // 12-okt-2026: ICP-cluster (docs/plan-icp-vinden-12-okt-2026.md). Deze
      // ging eerst naar waarom-hou-ik-nooit-geld-over, die nu zelf doorverwijst;
      // direct naar het eindpunt, zodat er geen keten van twee 301's ontstaat.
      { source: "/inzichten/waar-blijft-mijn-geld-einde-maand", destination: "/inzichten/waar-blijft-mijn-geld", permanent: true },
      // Probleemtaal zonder zoekvolume, samengevoegd in waar-blijft-mijn-geld
      // (CLAUDE.md 8.H.28). Vier van deze vijf stonden niet in de index van Google.
      { source: "/inzichten/waarom-hou-ik-nooit-geld-over", destination: "/inzichten/waar-blijft-mijn-geld", permanent: true },
      { source: "/inzichten/goed-salaris-toch-krap", destination: "/inzichten/waar-blijft-mijn-geld", permanent: true },
      { source: "/inzichten/goed-salaris-toch-geldstress", destination: "/inzichten/waar-blijft-mijn-geld", permanent: true },
      { source: "/inzichten/alleen-wonen-goed-salaris-toch-krap", destination: "/inzichten/waar-blijft-mijn-geld", permanent: true },
      // Huishoudboekje: drie pagina's op dezelfde SERP, nu één met een download.
      { source: "/inzichten/moet-je-een-huishoudboekje-bijhouden", destination: "/inzichten/huishoudboekje-voorbeeld", permanent: true },
      { source: "/inzichten/budget-maken-dat-je-volhoudt", destination: "/inzichten/huishoudboekje-voorbeeld", permanent: true },
      // Jaaruitgaven: kerstpot en seizoenskalender opgenomen in de nieuwe pagina.
      { source: "/inzichten/kerstpot-en-verjaardagspot-zo-bouwden-we-die", destination: "/inzichten/jaarlijkse-kosten-reserveren", permanent: true },
      { source: "/inzichten/seizoens-kostenkalender-per-maand", destination: "/inzichten/jaarlijkse-kosten-reserveren", permanent: true },
    ];
  },
};

export default nextConfig;
