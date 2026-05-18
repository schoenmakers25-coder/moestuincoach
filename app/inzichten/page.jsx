import InzichtenContent from './InzichtenContent'

export const metadata = {
  title: 'Inzichten — Moestuin.nl beheerder',
  description: 'Inzichten in wat bezoekers de moestuincoach vragen — categorieën, top-gewassen en content-kansen.',
  robots: { index: false, follow: false },
}

export default function InzichtenPage() {
  return <InzichtenContent />
}
