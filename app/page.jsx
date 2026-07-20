import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, formatDateShort, SITE_URL } from '@/lib/articles'

export const revalidate = 3600

export const metadata = {
  title: 'Moestuin.nl — wekelijkse tuintips en de Nederlandse zaaikalender',
  description:
    'Elke week een nieuwe, praktische moestuingids over wat er nú in de tuin speelt — plus de complete Nederlandse zaaikalender met 36 gewassen. Gratis, geen account.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/`,
    title: 'Moestuin.nl — wekelijkse tuintips en de Nederlandse zaaikalender',
    description: 'Elke week een nieuwe moestuingids plus de complete zaaikalender. Gratis, geen account nodig.',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary',
    title: 'Moestuin.nl — wekelijkse tuintips en zaaikalender',
    description: 'Elke week een nieuwe moestuingids plus de complete Nederlandse zaaikalender.',
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
      description: 'Wekelijkse tuintips, zaaikalender en moestuingidsen voor Nederlandse moestuiniers',
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
  const stream = articles.slice(1, 7)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ribbon */}
      <div className="wrap">
        <div className="home-ribbon">
          <span><span className="accent">Elke week een nieuwe gids</span> — voor de Nederlandse moestuin</span>
          <span>Gratis · geen account</span>
        </div>
      </div>

      {/* Hero: nieuwste artikel */}
      {featured && (
        <section className="home-hero">
          <div className="wrap">
            <div className="home-hero__inner">
              <Link href={`/artikel/${featured.slug}`} className="home-hero__media" aria-label={featured.title}>
                <span className="home-hero__badge">Nieuw deze week</span>
                {featured.image?.url && (
                  <Image
                    src={featured.image.url}
                    alt={featured.image.alt || featured.title}
                    fill
                    priority
                    sizes="(max-width: 860px) 100vw, 55vw"
                  />
                )}
              </Link>
              <div className="home-hero__body">
                <div className="home-hero__meta">
                  {featured.tag} <span className="dim">· {featured.readingMinutes} min lezen · {formatDateShort(featured.date)}</span>
                </div>
                <h1 className="home-hero__title">
                  <Link href={`/artikel/${featured.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {featured.title}
                    {featured.titleIt && <span className="it"> {featured.titleIt}</span>}
                  </Link>
                </h1>
                <p className="home-hero__excerpt">{featured.excerpt}</p>
                <div className="home-cta-row">
                  <Link href={`/artikel/${featured.slug}`} className="btn">
                    Lees het artikel <span className="arrow">→</span>
                  </Link>
                  <Link href="/artikel" className="btn btn-outline">
                    Alle tuintips
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Artikelstroom */}
      {stream.length > 0 && (
        <section className="stream">
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: 8 }}>
              <span className="kicker">De tuintips</span>
              <h2>
                Vers uit de <span className="it">moestuin.</span>
              </h2>
              <Link className="link" href="/artikel">
                Alle tuintips →
              </Link>
            </div>
            <div className="stream__grid">
              {stream.map(item => (
                <Link key={item.slug} href={`/artikel/${item.slug}`} className="post">
                  <div className="post__media">
                    {item.image?.url && (
                      <Image
                        src={item.image.url}
                        alt={item.image.alt || item.title}
                        fill
                        sizes="(max-width: 860px) 100vw, (max-width: 1040px) 50vw, 33vw"
                      />
                    )}
                  </div>
                  <div className="post__meta">
                    {item.tag} <span className="dim">· {formatDateShort(item.date)}</span>
                  </div>
                  <h3 className="post__title">
                    {item.title}
                    {item.titleIt && <span style={{ fontStyle: 'italic', color: 'var(--forest)' }}> {item.titleIt}</span>}
                  </h3>
                  <p className="post__excerpt">{item.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hoeve 1700 — merkstrip */}
      <section className="wrap" style={{ padding: '8px 0 4px' }}>
        <Link
          href="/over"
          aria-label="Over Hoeve 1700, de plek achter Moestuin.nl"
          style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '16 / 7', minHeight: 220, borderRadius: 6, overflow: 'hidden', textDecoration: 'none' }}
        >
          <Image
            src="/hoeve/hoeve1700.jpg"
            alt="Hoeve 1700 vanuit de lucht, met moestuin en boomgaard in glooiend heuvelland"
            fill
            sizes="(max-width: 1040px) 100vw, 1000px"
            style={{ objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(20,28,20,.74) 0%, rgba(20,28,20,.38) 46%, rgba(20,28,20,0) 76%)' }} />
          <div style={{ position: 'absolute', left: 0, bottom: 0, padding: 'clamp(20px, 4vw, 40px)', maxWidth: 620, color: 'var(--paper)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(244,239,228,.75)', marginBottom: 10 }}>
              Van de hoeve
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 40px)', lineHeight: 1.05, marginBottom: 10 }}>
              Echte moestuin, echte kas. <span style={{ fontStyle: 'italic' }}>Hoeve 1700.</span>
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(244,239,228,.82)' }}>
              Alles op deze site komt voort uit één oude hoeve waar we de moestuin en kas weer tot leven brengen.{' '}
              <span style={{ borderBottom: '1px solid rgba(244,239,228,.5)' }}>Lees het verhaal →</span>
            </div>
          </div>
        </Link>
      </section>

      {/* Zaaikalender-band */}
      <section className="tool-band">
        <div className="wrap">
          <div className="tool-band__inner">
            <div className="tool-band__body">
              <div className="tool-band__kicker">De tool · 36 gewassen</div>
              <h2 className="tool-band__title">
                Wat zaai, plant en oogst je <span className="it">deze maand?</span>
              </h2>
              <p className="tool-band__text">
                De complete Nederlandse zaaikalender laat per maand precies zien wat er kan — binnen én buiten.
                Handig naast de wekelijkse tuintips: eerst kijken wat er nu kan, dan de gids erbij lezen.
              </p>
              <div className="home-cta-row">
                <Link href="/zaaikalender" className="btn btn-light">
                  Open de zaaikalender <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            <div className="tool-band__media">
              <Image
                src="/hoeve/bakken.jpg"
                alt="Moestuinbakken met verse, donkere aarde op Hoeve 1700"
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hoe je de site gebruikt */}
      <section className="how">
        <div className="wrap">
          <div className="section-head" style={{ borderBottomColor: 'var(--ink)', marginBottom: 40 }}>
            <span className="kicker">Zo werkt het</span>
            <h2>
              Elke week iets nieuws <span className="it">om te doen.</span>
            </h2>
          </div>
          <div className="grid">
            <div className="step">
              <div className="num">01</div>
              <h3>Elke week een verse gids.</h3>
              <p>
                We publiceren wekelijks een nieuw <Link href="/artikel">artikel</Link> over wat er op dat moment in de
                Nederlandse moestuin speelt — actueel, praktisch en getest in de praktijk.
              </p>
            </div>
            <div className="step">
              <div className="num">02</div>
              <h3>Kijk wat er deze maand kan.</h3>
              <p>
                De <Link href="/zaaikalender">zaaikalender</Link> laat per maand zien welke van de 36 gewassen je zaait,
                plant of oogst — binnen én buiten.
              </p>
            </div>
            <div className="step">
              <div className="num">03</div>
              <h3>Geen account, geen gedoe.</h3>
              <p>
                Alles op deze site is gratis en zonder inloggen te lezen. Geen nieuwsbrief nodig — kom gewoon elke week
                even langs voor de nieuwste <Link href="/artikel">tuintip</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
