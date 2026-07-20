import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact',
  description: 'Neem contact op met Moestuin.nl. Stel een vraag, meld een fout of deel een suggestie.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/contact' },
}

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 100px' }}>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 16 }}>
        Contact
      </div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.02, letterSpacing: '-0.01em', marginBottom: 20 }}>
        Stuur ons <span style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>een bericht.</span>
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '52ch', marginBottom: 56, borderBottom: '1px solid var(--line)', paddingBottom: 40 }}>
        Vraag, foutmelding of suggestie? We lezen alles en reageren doorgaans binnen drie werkdagen.
      </p>

      <div className="contact-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '0 64px', alignItems: 'start' }}>
        <ContactForm />

        <aside style={{ paddingTop: 4 }}>
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 24, marginTop: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>
              Reactietijd
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>
              Binnen drie werkdagen. Voor urgente technische problemen proberen we dezelfde dag te reageren.
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 24, marginTop: 24 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 12 }}>
              Liever zelf zoeken?
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)', margin: 0 }}>
              Veel antwoorden staan al in de <a href="/artikel" style={{ color: 'var(--terracotta)', textDecoration: 'none', borderBottom: '1px solid var(--terracotta)' }}>tuintips</a> en de <a href="/zaaikalender" style={{ color: 'var(--terracotta)', textDecoration: 'none', borderBottom: '1px solid var(--terracotta)' }}>zaaikalender</a>.
            </p>
          </div>
        </aside>
      </div>

    </main>
  )
}
