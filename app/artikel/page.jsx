import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Tuintips & gidsen',
  description: 'Praktische tuiniersgidsen van Moestuin.nl: moestuin beginnen, tomaten uitplanten, plagen bestrijden en seizoensplanning. Voor beginners en gevorderden.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/artikel' },
  openGraph: {
    type: 'website',
    url: 'https://www.moestuin.nl/artikel',
    title: 'Tuintips & gidsen | Moestuin.nl',
    description: 'Praktische tuiniersgidsen voor moestuiniers in Nederland.',
    locale: 'nl_NL',
  },
}

const ARTIKELEN = [
  {
    id: 'beginners',
    label: 'Beginners',
    articles: [
      {
        href: '/artikel/moestuin-beginnen',
        img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=450&fit=crop&auto=format&q=75',
        imgAlt: 'Moestuin beginnen voor beginners',
        tag: 'Beginners',
        tagClass: '',
        readTime: '14 min · 18 mei',
        title: 'Moestuin beginnen',
        titleIt: 'de complete gids',
        excerpt: 'Plek kiezen, grond voorbereiden, de makkelijkste groenten en de vijf fouten die elke beginner maakt.',
      },
    ],
  },
  {
    id: 'tomaten',
    label: 'Tomaten',
    articles: [
      {
        href: '/artikel/tomaten-uitplanten',
        img: 'https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75',
        imgAlt: 'Tomatenplanten in de volle grond',
        tag: 'Stappenplan',
        tagClass: '',
        readTime: '9 min · 12 mei',
        title: 'Tomaten uitplanten',
        titleIt: 'in zes stappen',
        excerpt: 'Wanneer, hoe diep en welke drie fouten elke beginner maakt bij het uitplanten van tomaten.',
      },
      {
        href: '/artikel/tomatenstokken',
        img: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&h=450&fit=crop&auto=format&q=75',
        imgAlt: 'Tomatenstokken plaatsen',
        tag: 'Methode',
        tagClass: '',
        readTime: '7 min · 28 apr',
        title: 'Tomatenstokken zetten',
        titleIt: 'zonder de wortels te raken',
        excerpt: 'Wanneer, hoe diep, en waarom de meeste tuiniers dit eigenlijk verkeerd doen.',
      },
      {
        href: '/artikel/tomatenproblemen',
        img: 'https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75',
        imgAlt: 'Tomatenproblemen herkennen',
        tag: 'Probleem',
        tagClass: 'terra',
        readTime: '6 min · 10 mei',
        title: 'Wat is er mis met je tomaten?',
        titleIt: 'Zes diagnoses',
        excerpt: 'Bruine blaadjes, krullende bovenkant, splijtende vruchten: hoe je weet wat er aan de hand is.',
      },
      {
        href: '/artikel/tomatenrassen',
        img: 'https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75',
        imgAlt: 'Diverse tomatenrassen',
        tag: 'Rassen',
        tagClass: '',
        readTime: '12 min · 20 apr',
        title: 'Tien tomatenrassen',
        titleIt: 'die altijd lukken',
        excerpt: 'Van Gardeners\' Delight tot Brandywine, getest op smaak, opbrengst en hoe vergevingsgezind ze zijn.',
      },
    ],
  },
]

export default function ArtikelOverzichtPage() {
  return (
    <>
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
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 20 }}>
            Tuintips voor <span style={{ fontStyle: 'italic' }}>de moestuinier.</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '60ch', marginBottom: 40 }}>
            Praktische gidsen over zaaien, uitplanten, plagen en seizoensplanning. Geschreven vanuit eigen ervaring, voor beginners en gevorderden.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', paddingBottom: 32 }}>
            {ARTIKELEN.map(cat => (
              <a key={cat.id} href={`#${cat.id}`} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink)', border: '1px solid var(--ink)', padding: '7px 14px', textDecoration: 'none' }}>
                {cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {ARTIKELEN.map((cat, ci) => (
        <section key={cat.id} id={cat.id} style={{ padding: '72px 0', borderBottom: '1px solid var(--line)', background: ci % 2 === 1 ? 'var(--paper-2)' : 'var(--paper)' }}>
          <div className="wrap">
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, marginBottom: 40, paddingBottom: 20, borderBottom: '1px solid var(--line)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.0, margin: 0 }}>{cat.label}</h2>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>{cat.articles.length} {cat.articles.length === 1 ? 'artikel' : 'artikelen'}</span>
            </div>
            <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 32 }}>
              {cat.articles.map(a => (
                <article key={a.href} className="article-card">
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                    <Image src={a.img} alt={a.imgAlt} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="meta-row">
                    <span className={`tag${a.tagClass ? ' ' + a.tagClass : ''}`}>{a.tag}</span>
                    <span className="meta">{a.readTime}</span>
                  </div>
                  <h3>{a.title} <span className="it">{a.titleIt}</span></h3>
                  <p className="excerpt">{a.excerpt}</p>
                  <Link href={a.href} className="read">Lees verder →</Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section style={{ padding: '72px 0', background: 'var(--forest)', color: 'var(--paper)' }}>
        <div className="wrap page-cta-grid">
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(244,239,228,.55)', marginBottom: 12 }}>Gratis hulp</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.1, margin: '0 0 12px' }}>
              Vraag het aan <em>Moos.</em>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(244,239,228,.75)', margin: 0, maxWidth: '52ch', lineHeight: 1.6 }}>
              Staat je vraag er niet bij? Moos, de gratis AI moestuincoach, helpt je direct verder op basis van jouw tuin, grond en ervaring.
            </p>
          </div>
          <Link href="/" style={{ display: 'inline-block', background: 'var(--terracotta)', color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', padding: '14px 24px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Vraag Moos →
          </Link>
        </div>
      </section>
    </>
  )
}
