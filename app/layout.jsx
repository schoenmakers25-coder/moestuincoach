import './globals.css'
import '../assets/tokens.css'
import '../assets/pages.css'
import '../assets/coach.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const metadata = {
  title: {
    template: '%s · Moestuin.nl',
    default: 'Moestuin.nl — Gratis AI moestuincoach, geen account nodig',
  },
  description: 'Stel je moestuinvraag aan Moos — de gratis Nederlandse AI moestuincoach. Diagnose, zaai-advies en plantgidsen. Geen account nodig.',
  metadataBase: new URL('https://www.moestuin.nl'),
}

export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
