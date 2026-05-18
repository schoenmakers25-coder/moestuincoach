export const metadata = {
  title: 'Contact · Moestuin.nl',
  description: 'Neem contact op met Moestuin.nl.',
}

export default function ContactPage() {
  return (
    <main style={{ maxWidth: 560, margin: '0 auto', padding: '60px 24px 100px' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 5vw, 42px)', marginBottom: 8 }}>
        Contact
      </h1>
      <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 40 }}>
        Moestuin.nl
      </p>

      <p style={{ lineHeight: 1.7, fontSize: 16, marginBottom: 24 }}>
        Heb je een vraag, foutmelding of suggestie? Stuur een e-mail naar:
      </p>

      <a
        href="mailto:info@moestuin.nl"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--terra)',
          letterSpacing: '0.05em',
          textDecoration: 'none',
          borderBottom: '2px solid var(--terra)',
          paddingBottom: 2,
        }}
      >
        info@moestuin.nl
      </a>

      <p style={{ lineHeight: 1.7, fontSize: 15, color: 'var(--muted)', marginTop: 40 }}>
        Wij proberen binnen drie werkdagen te reageren.
      </p>
    </main>
  )
}
