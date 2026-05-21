/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/blog", destination: "/inzichten", permanent: true },
      { source: "/blog/:slug", destination: "/inzichten/:slug", permanent: true },
      { source: "/inzichten/boodschappen-duitsland-voordeel", destination: "/inzichten/vergelijken-boodschappen-nederland-duitsland", permanent: true },
    ];
  },
};

export default nextConfig;
