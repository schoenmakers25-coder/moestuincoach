import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, formatDateShort, SITE_URL } from '@/lib/articles'

export const revalidate = 3600

export const metadata = {
  title: 'Tuintips & gidsen',
  description:
    'Praktische tuiniersgidsen van Moestuin.nl: moestuin beginnen, tomaten uitplanten, plagen bestrijden en seizoensplanning. Voor beginners en gevorderden.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE_URL}/artikel` },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/artikel`,
    title: 'Tuintips & gidsen | Moestuin.nl',
    description: 'Praktische tuiniersgidsen voor moestuiniers in Nederland.',
    locale: 'nl_NL',
  },
}

export default function ArtikelOverzichtPage() {
  const articles = getAllArticles()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tuintips & gidsen',
    url: `${SITE_URL}/artikel`,
    inLanguage: 'nl-NL',
    hasPart: articles.map(a => ({
      '@type': 'BlogPosting',
      headline: a.title,
      url: `${SITE_URL}/artikel/${a.slug}`,
      datePublished: a.date,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section style={{ padding: '48px 0 0', borderBottom: '1px solid var(--line)' }}>
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Broodkruimelpad" style={{ marginBottom: 24 }}>
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <b>Tuintips</b>
          </nav>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 14 }}>
            Gidsen &amp; artikelen
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.02, letterSpacing: '-0.01em', marginBottom: 20 }}>
            Tuintips voor <span style={{ fontStyle: 'italic' }}>de moestuinier.</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '60ch', marginBottom: 40 }}>
            Praktische gidsen over zaaien, uitplanten, plagen en seizoensplanning. Elke week komt er een nieuw artikel
            bij over wat er op dat moment in de Nederlandse moestuin speelt.
          </p>
        </div>
      </section>

      <section style={{ padding: '56px 0 88px' }}>
        <div className="wrap">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 40, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.0, margin: 0 }}>
              Alle artikelen
            </h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {articles.length} {articles.length === 1 ? 'artikel' : 'artikelen'}
            </span>
          </div>

          <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 32 }}>
            {articles.map(a => (
              <article key={a.slug} className="article-card">
                {a.image?.url && (
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <Image
                      src={a.image.url}
                      alt={a.image.alt || a.title}
                      fill
                      sizes="(max-width: 700px) 100vw, 320px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div className="meta-row">
                  <span className="tag">{a.tag}</span>
                  <span className="meta">
                    {a.readingMinutes} min · {formatDateShort(a.date)}
                  </span>
                </div>
                <h3>
                  {a.title} {a.titleIt && <span className="it">{a.titleIt}</span>}
                </h3>
                <p className="excerpt">{a.excerpt}</p>
                <Link href={`/artikel/${a.slug}`} className="read">
                  Lees verder →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '72px 0', background: 'var(--forest)', color: 'var(--paper)' }}>
        <div className="wrap page-cta-grid">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(244,239,228,.55)', marginBottom: 12 }}>
              Ook handig
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.1, margin: '0 0 12px' }}>
              Wat kun je <em>deze maand zaaien?</em>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,239,228,.75)', margin: 0, maxWidth: '52ch', lineHeight: 1.6 }}>
              De zaaikalender laat voor 36 gewassen zien wanneer je zaait, plant en oogst — binnen en buiten, per maand.
            </p>
          </div>
          <Link
            href="/zaaikalender"
            style={{
              display: 'inline-block',
              background: 'var(--terracotta)',
              color: 'var(--paper)',
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              padding: '14px 24px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Naar de zaaikalender →
          </Link>
        </div>
      </section>
    </>
  )
}
