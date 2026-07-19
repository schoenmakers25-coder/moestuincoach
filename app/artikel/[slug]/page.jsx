import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  SITE_URL,
  getArticleBySlug,
  getMarkdownArticles,
  getAllArticles,
  renderMarkdown,
  formatDateLong,
} from '@/lib/articles'

// Nieuwe artikelen komen via een commit binnen (nieuwe build), maar ISR vangt
// een handmatige contentwijziging binnen het uur op.
export const revalidate = 3600
export const dynamicParams = true

export function generateStaticParams() {
  return getMarkdownArticles().map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article || article.status === 'draft') {
    return { title: 'Artikel niet gevonden', robots: { index: false, follow: false } }
  }

  const url = `${SITE_URL}/artikel/${article.slug}`
  const image = article.image?.url ? [{ url: article.image.url, alt: article.image.alt }] : undefined

  return {
    title: article.title,
    description: article.description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${article.title} | Moestuin.nl`,
      description: article.description,
      locale: 'nl_NL',
      publishedTime: article.date,
      images: image,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: article.title,
      description: article.description,
      images: image?.map(i => i.url),
    },
  }
}

export default function ArtikelPage({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article || article.status === 'draft') notFound()

  const url = `${SITE_URL}/artikel/${article.slug}`
  const html = renderMarkdown(article.body)
  const related = getAllArticles().filter(a => a.slug !== article.slug).slice(0, 3)

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image?.url ? [article.image.url] : undefined,
    datePublished: article.date,
    dateModified: article.dateModified || article.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: article.author || 'Moestuin.nl', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'Moestuin.nl', url: SITE_URL },
    inLanguage: 'nl-NL',
    keywords: (article.tags || []).join(', '),
  }

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Tuintips', item: `${SITE_URL}/artikel` },
      { '@type': 'ListItem', position: 3, name: article.title },
    ],
  }

  const faq = Array.isArray(article.faq) ? article.faq : []
  const jsonLdFaq = faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      {jsonLdFaq && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      )}

      <section className="article-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Broodkruimelpad">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/artikel">Tuintips</Link>
            <span className="sep">/</span>
            <b>{article.title}</b>
          </nav>
          <div className="kicker-row">
            <span className="kicker">{(article.tags && article.tags[0]) || 'Gids'}</span>
            <span className="meta">
              {formatDateLong(article.date)} · {article.readingMinutes || 8} min lezen
            </span>
          </div>
          <h1>{article.title}</h1>
          {article.excerpt && <p className="dek">{article.excerpt}</p>}
        </div>
      </section>

      {article.image?.url && (
        <section style={{ borderBottom: '1px solid var(--line)' }}>
          <div className="wrap" style={{ padding: '32px 0' }}>
            <figure style={{ margin: 0 }}>
              <Image
                src={article.image.url}
                alt={article.image.alt || article.title}
                width={article.image.width || 1600}
                height={article.image.height || 1067}
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
              />
              {article.image.credit && (
                <figcaption
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: 'var(--muted)',
                    marginTop: 8,
                    letterSpacing: '0.04em',
                  }}
                >
                  {article.image.creditUrl ? (
                    <a href={article.image.creditUrl} rel="nofollow noopener" target="_blank" style={{ color: 'inherit' }}>
                      {article.image.credit}
                    </a>
                  ) : (
                    article.image.credit
                  )}
                </figcaption>
              )}
            </figure>
          </div>
        </section>
      )}

      <section className="article-body">
        <div className="wrap">
          <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />

          {faq.length > 0 && (
            <div style={{ maxWidth: 680, marginTop: 56, borderTop: '2px solid var(--ink)', paddingTop: 32 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, margin: '0 0 24px' }}>
                Veelgestelde vragen
              </h2>
              {faq.map(item => (
                <div key={item.question} style={{ borderBottom: '1px solid var(--line)', padding: '18px 0' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, margin: '0 0 8px' }}>{item.question}</h3>
                  <p style={{ margin: 0, lineHeight: 1.7, color: 'var(--ink-2)' }}>{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ padding: '56px 0', background: 'var(--paper-2)', borderTop: '1px solid var(--line)' }}>
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, margin: 0 }}>
              Verder <span className="it">lezen.</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {related.map(item => (
              <Link
                key={item.slug}
                href={`/artikel/${item.slug}`}
                style={{ textDecoration: 'none', color: 'var(--ink)', borderTop: '1px solid var(--ink)', paddingTop: 12 }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--terracotta)',
                    marginBottom: 6,
                  }}
                >
                  {item.tag}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.15 }}>{item.title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)', margin: '8px 0 0' }}>{item.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
