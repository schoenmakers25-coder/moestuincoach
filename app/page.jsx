import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, formatDateShort, SITE_URL } from '@/lib/articles'

export const revalidate = 3600

export const metadata = {
  title: 'Moestuin.nl — zaaikalender, tuintips en moestuingidsen',
  description:
    'Praktische hulp voor je moestuin: de complete Nederlandse zaaikalender met 36 gewassen, plus gidsen over zaaien, uitplanten, plagen en oogsten. Gratis, geen account.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    title: 'Moestuin.nl — zaaikalender en tuintips voor de Nederlandse moestuin',
    description: 'De complete zaaikalender en praktische moestuingidsen. Gratis, geen account nodig.',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary',
    title: 'Moestuin.nl — zaaikalender en tuintips',
    description: 'De complete zaaikalender en praktische moestuingidsen voor Nederlandse tuiniers.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'Moestuin.nl',
      url: SITE_URL,
      description: 'Zaaikalender, tuintips en moestuingidsen voor Nederlandse moestuiniers',
      inLanguage: 'nl-NL',
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Moestuin.nl',
      url: SITE_URL,
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Wanneer kan ik tomaten uitplanten?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tomaten planten na 10 mei als de nachttemperatuur boven 10°C blijft en de bodem minstens 12°C warm is.',
          },
        },
        {
          '@type': 'Question',
          name: 'Wat zaai je in mei?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In mei kun je buiten zaaien: courgette, sperziebonen, stambonen, biet, mais. Binnen kun je nog basilicum voorzaaien.',
          },
        },
        {
          '@type': 'Question',
          name: 'Hoe bestrijd ik slakken in de moestuin?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Gebruik slakkenkragen, aaltjes (Phasmarhabditis), koffiepads rond de planten of strooi ijzerfosfaatkorrels.',
          },
        },
      ],
    },
  ],
}

export default function Page() {
  const articles = getAllArticles()
  const featured = articles[0]
  const recent = articles.slice(1, 5)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero-section">
        <div className="wrap">
          <div className="hero-editorial">
            <div className="kicker-row">
              <span className="kicker">Nederlandse moestuingids</span>
              <span className="meta">Gratis · geen account</span>
            </div>
            <h1>
              Wat zaai je <span className="it">nu?</span>
            </h1>
            <div className="lower">
              <p className="lead">
                <span className="drop">D</span>e zaaikalender voor de Nederlandse moestuin, plus praktische gidsen over
                zaaien, uitplanten, plagen en oogsten. Geschreven voor wie z&apos;n handen vies wil maken.
              </p>
              <div className="stats">
                <div className="stat">
                  <div className="num">36</div>
                  <div className="lbl">gewassen in de kalender</div>
                </div>
                <div className="stat">
                  <div className="num">{articles.length}</div>
                  <div className="lbl">gidsen en artikelen</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link
                  href="/zaaikalender"
                  style={{
                    display: 'inline-block',
                    background: 'var(--forest)',
                    color: 'var(--paper)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    padding: '14px 24px',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Naar de zaaikalender →
                </Link>
                <Link
                  href="/artikel"
                  style={{
                    display: 'inline-block',
                    border: '1px solid var(--ink)',
                    color: 'var(--ink)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    padding: '13px 24px',
                    textDecoration: 'none',
                    textAlign: 'center',
                  }}
                >
                  Alle tuintips
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-intro">
        <div className="wrap">
          <div className="site-intro-grid">
            <Link href="/zaaikalender" className="site-intro-card">
              <div className="site-intro-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="site-intro-label">Zaaikalender</div>
              <div className="site-intro-desc">
                36 groenten en kruiden — per maand zien wat je zaait, plant en oogst.
              </div>
            </Link>
            <Link href="/artikel" className="site-intro-card">
              <div className="site-intro-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div className="site-intro-label">Tuintips &amp; gidsen</div>
              <div className="site-intro-desc">
                Praktische artikelen over zaaien, verzorgen en oogsten, voor elk niveau.
              </div>
            </Link>
            <Link href="/over" className="site-intro-card">
              <div className="site-intro-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 22a10 10 0 0 0 10-10" /><line x1="12" y1="12" x2="12" y2="7" />
                </svg>
              </div>
              <div className="site-intro-label">Over Moestuin.nl</div>
              <div className="site-intro-desc">
                Wie we zijn, hoe we werken en waarom alles op deze site gratis is.
              </div>
            </Link>
          </div>
        </div>
      </section>

      {featured && (
        <section style={{ padding: '72px 0', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: 32 }}>
              <span className="kicker">Nieuwste gids</span>
              <h2>
                Deze week op <span className="it">de site.</span>
              </h2>
            </div>
            <Link
              href={`/artikel/${featured.slug}`}
              style={{ display: 'grid', gap: 24, textDecoration: 'none', color: 'var(--ink)' }}
            >
              {featured.image?.url && (
                <Image
                  src={featured.image.url}
                  alt={featured.image.alt || featured.title}
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 900px) 100vw, 1100px"
                  style={{ width: '100%', height: 'auto', maxHeight: 420, objectFit: 'cover' }}
                />
              )}
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--terracotta)',
                    marginBottom: 10,
                  }}
                >
                  {featured.tag} · {featured.readingMinutes} min · {formatDateShort(featured.date)}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px, 4vw, 44px)',
                    lineHeight: 1.05,
                    margin: '0 0 12px',
                  }}
                >
                  {featured.title}
                  {featured.titleIt && (
                    <span style={{ fontStyle: 'italic', color: 'var(--forest)' }}> {featured.titleIt}</span>
                  )}
                </h3>
                <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0, maxWidth: '62ch' }}>
                  {featured.excerpt}
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section style={{ padding: '72px 0', background: 'var(--paper-2)', borderBottom: '1px solid var(--line)' }}>
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: 32 }}>
              <h2>
                Meer <span className="it">gidsen.</span>
              </h2>
              <Link className="link" href="/artikel">
                Alles bekijken →
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 28 }}>
              {recent.map(item => (
                <Link
                  key={item.slug}
                  href={`/artikel/${item.slug}`}
                  style={{ textDecoration: 'none', color: 'var(--ink)', borderTop: '1px solid var(--ink)', paddingTop: 14 }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--terracotta)',
                      marginBottom: 8,
                    }}
                  >
                    {item.tag} · {formatDateShort(item.date)}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.12 }}>{item.title}</div>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', margin: '8px 0 0' }}>{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="how">
        <div className="wrap">
          <div className="section-head" style={{ borderBottomColor: 'var(--ink)', marginBottom: 40 }}>
            <h2>
              Hoe je deze site <span className="it">gebruikt.</span>
            </h2>
            <p className="intro">Drie dingen om te weten voor je aan de slag gaat.</p>
          </div>
          <div className="grid">
            <div className="step">
              <div className="num">01</div>
              <h3>Kijk eerst wat er deze maand kan.</h3>
              <p>
                De <Link href="/zaaikalender">zaaikalender</Link> laat per maand zien welke van de 36 gewassen je zaait,
                plant of oogst — binnen én buiten.
              </p>
            </div>
            <div className="step">
              <div className="num">02</div>
              <h3>Lees de gids bij je gewas.</h3>
              <p>
                Elke <Link href="/artikel">tuintip</Link> is een stappenplan: wanneer, hoe diep, welke fouten je moet
                vermijden. Getest in de praktijk, geen theorie.
              </p>
            </div>
            <div className="step">
              <div className="num">03</div>
              <h3>Elke week komt er een gids bij.</h3>
              <p>
                We publiceren wekelijks een nieuw artikel over wat er op dat moment in de Nederlandse moestuin speelt.
                Geen account, geen nieuwsbrief nodig.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
