import './globals.css'
import '../assets/tokens.css'
import '../assets/pages.css'
import '../assets/home.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  title: {
    template: '%s · Moestuin.nl',
    default: 'Moestuin.nl — zaaikalender, tuintips en moestuingidsen',
  },
  description: 'De complete Nederlandse zaaikalender met 36 gewassen, plus praktische gidsen over zaaien, uitplanten, plagen en oogsten. Gratis, geen account nodig.',
  metadataBase: new URL('https://www.moestuin.nl'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        <div id="page-clip">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
