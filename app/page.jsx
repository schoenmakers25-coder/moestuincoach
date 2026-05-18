import CoachApp from './CoachApp'

export const metadata = {
  title: 'Moestuin.nl — Gratis AI moestuincoach, geen account nodig',
  description: 'Stel je moestuinvraag aan Moos — de gratis Nederlandse AI moestuincoach. Diagnose, zaai-advies en plantgidsen. Geen account nodig.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/' },
  openGraph: {
    type: 'website',
    url: 'https://www.moestuin.nl/',
    title: 'Moestuin.nl — Gratis AI moestuincoach',
    description: 'Stel je moestuinvraag aan Moos — de gratis Nederlandse AI moestuincoach.',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary',
    title: 'Moestuin.nl — Gratis AI moestuincoach',
    description: 'Stel je moestuinvraag aan Moos — de gratis Nederlandse AI moestuincoach.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.moestuin.nl/#website',
      name: 'Moestuin.nl',
      url: 'https://www.moestuin.nl',
      description: 'De gratis Nederlandse AI moestuincoach',
      inLanguage: 'nl-NL',
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.moestuin.nl/#organization',
      name: 'Moestuin.nl',
      url: 'https://www.moestuin.nl',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Wanneer kan ik tomaten uitplanten?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tomaten planten na 10 mei als de nachttemperatuur boven 10°C blijft en de bodem minstens 12°C warm is.' } },
        { '@type': 'Question', name: 'Wat zaai je in mei?',
          acceptedAnswer: { '@type': 'Answer', text: 'In mei kun je buiten zaaien: courgette, sperziebonen, stambonen, biet, mais. Binnen kun je nog basilicum voorzaaien.' } },
        { '@type': 'Question', name: 'Hoe bestrijd ik slakken in de moestuin?',
          acceptedAnswer: { '@type': 'Answer', text: 'Gebruik slakkenkragen, aaltjes (Phasmarhabditis), koffiepads rond de planten of strooi ijzerfosfaatkorrels.' } },
      ],
    },
  ],
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CoachApp />
    </>
  )
}
