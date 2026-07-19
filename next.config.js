/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
    ],
  },
  async redirects() {
    // 301's voor URL's die zijn verwijderd bij het opschonen van de
    // onafgemaakte affiliate-opzet en de live AI-coach. Voorkomt kale 404's
    // op pagina's die Google mogelijk al heeft geindexeerd.
    return [
      // Affiliate: productaanbevelingen -> homepage
      { source: '/producten', destination: '/', permanent: true },
      // Beheerdersdashboard van de coach (was al noindex) -> homepage
      { source: '/inzichten', destination: '/', permanent: true },
    ]
  },
}

module.exports = nextConfig
