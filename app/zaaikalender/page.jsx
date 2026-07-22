import ZaaikalenderContent from './ZaaikalenderContent'

export const metadata = {
  title: 'Zaaikalender: wat zaai je wanneer?',
  description: 'De complete zaaikalender voor de Nederlandse moestuin: wat zaai, plant en oogst je per maand? 36 gewassen op één overzichtelijke pagina.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/zaaikalender' },
  openGraph: {
    type: 'website',
    url: 'https://www.moestuin.nl/zaaikalender',
    title: 'Zaaikalender 2026: wat zaai je wanneer? · Moestuin.nl',
    description: '36 groenten, kruiden en vruchten: voor elke maand een blik op wat er gezaaid, geplant of geoogst moet worden.',
    locale: 'nl_NL',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Zaaikalender Nederland 2026',
  description: 'Complete zaaikalender voor de Nederlandse moestuin: 36 gewassen met zaai-, plant- en oogsttijden per maand.',
  url: 'https://www.moestuin.nl/zaaikalender',
  keywords: ['zaaikalender', 'moestuin', 'zaaien', 'groenten', 'wanneer zaaien', 'zaaitijden'],
  inLanguage: 'nl-NL',
  publisher: { '@type': 'Organization', name: 'Moestuin.nl', url: 'https://www.moestuin.nl' },
  dateModified: '2026-05-01',
}

export default function ZaaikalenderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ZaaikalenderContent />
    </>
  )
}
