import Link from 'next/link'

export const metadata = {
  title: 'Over Moestuin.nl, de Nederlandse moestuingids',
  description:
    'Moestuin.nl biedt een gratis zaaikalender en praktische tuiniersgidsen voor Nederlandse moestuiniers. Lees wie wij zijn en wat je op deze site vindt.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/over' },
}

export default function OverPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 100px' }}>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 16 }}>
        Over ons
      </div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 56px)', lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 20 }}>
        Wat is Moestuin<span style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>.</span>nl<span style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>?</span>
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '58ch', marginBottom: 56, borderBottom: '1px solid var(--line)', paddingBottom: 40 }}>
        Moestuin.nl helpt Nederlandse tuiniers, van complete beginner tot doorgewinterde moestuinier, met eerlijk en praktisch advies. Geen account, geen gedoe.
      </p>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>De zaaikalender</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Het hart van de site is de <strong>zaaikalender</strong>: 36 groenten, kruiden en vruchten op één overzichtelijke pagina. Per maand zie je in één oogopslag wat je zaait, plant en oogst, binnen én buiten. Precies afgestemd op het Nederlandse klimaat.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Geen account, geen registratie, geen limiet. Gewoon opzoeken wat er deze week kan.
        </p>
        <div style={{ marginTop: 20 }}>
          <Link href="/zaaikalender" style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terracotta)', textDecoration: 'none', borderBottom: '1px solid var(--terracotta)', paddingBottom: 2 }}>
            Bekijk de zaaikalender →
          </Link>
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Tuintips &amp; gidsen</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Naast de kalender biedt Moestuin.nl redactionele artikelen en gidsen die we elke week aanvullen. Denk aan beginnersgidsen, stappenplannen voor uitplanten, plaagbestrijding en seizoensoverzichten.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Alle content is geschreven vanuit het perspectief van de tuinier: wat werkt echt, wat is onzin, en wat heb je minimaal nodig om te beginnen.
        </p>
        <div style={{ marginTop: 20 }}>
          <Link href="/artikel" style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terracotta)', textDecoration: 'none', borderBottom: '1px solid var(--terracotta)', paddingBottom: 2 }}>
            Bekijk alle tuintips →
          </Link>
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 20 }}>Feiten</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
          {[
            ['Gelanceerd', 'Mei 2026'],
            ['Zaaikalender', '36 gewassen, gratis'],
            ['Taal', 'Nederlands (NL + BE)'],
            ['Account nodig', 'Nee'],
            ['Kosten', 'Gratis voor tuiniers'],
            ['Gebaseerd in', 'Nederland'],
          ].map(([label, value]) => (
            <div key={label} style={{ background: 'var(--paper)', padding: '18px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Contact</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Vragen, feedback of een fout gevonden? Stuur een mail naar{' '}
          <a href="mailto:info@moestuin.nl" style={{ color: 'var(--terracotta)', fontWeight: 600 }}>info@moestuin.nl</a>.
          We lezen alles en reageren zo snel mogelijk.
        </p>
      </section>

      <div style={{ background: 'var(--forest)', color: 'var(--paper)', padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(244,239,228,.6)' }}>Aan de slag</div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.2, margin: 0 }}>
          Klaar om te beginnen in je moestuin?
        </p>
        <p style={{ fontSize: 14, color: 'rgba(244,239,228,.7)', margin: 0, lineHeight: 1.5 }}>
          <Link href="/zaaikalender" style={{ color: '#e8c896', textDecoration: 'none', borderBottom: '1px solid #e8c896' }}>Open de zaaikalender</Link>
          {' '}en kijk wat je deze maand kunt zaaien.
        </p>
      </div>

    </main>
  )
}
