import Link from 'next/link'

export const metadata = {
  title: 'Over Moestuin.nl — De Nederlandse AI moestuincoach',
  description: 'Moestuin.nl combineert een gratis AI moestuincoach met praktische tuinierstips en productaanbevelingen. Leer wie wij zijn en wat je op deze site vindt.',
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
        Moestuin.nl helpt Nederlandse tuiniers — van complete beginner tot doorgewinterde moestuinier — met eerlijk en praktisch advies. Geen account, geen gedoe.
      </p>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>De AI coach: Moos</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Het hart van de site is <strong>Moos</strong> — een gratis AI moestuincoach die je direct en persoonlijk advies geeft. Stel een vraag in gewoon Nederlands en je krijgt meteen een concreet antwoord: diagnoses, zaaiadvies, informatie over plagen, bodem, seizoensplanning.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Moos is gebouwd op geavanceerde AI-technologie en getraind op een brede kennisbasis over moestuinieren. Je kunt ook foto&apos;s sturen — handig als je een ziekte of plaag niet herkent.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)' }}>
          De coach is gratis en blijft gratis. Geen account, geen registratie, geen limiet op het aantal vragen.
        </p>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Tuintips &amp; gidsen</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Naast de coach biedt Moestuin.nl redactionele artikelen en gidsen — praktische informatie die we regelmatig aanvullen. Denk aan beginnersgidsen, zaaiplanners, en seizoensoverzichten.
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
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Productaanbevelingen</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Op de productenpagina vind je een eerlijke selectie van zaden, gereedschap, potgrond en kweekmateriaal dat wij zelf de moeite waard vinden. Geen willekeurige webshop-listings, maar gerichte aanbevelingen met uitleg waarom iets goed is voor beginners of gevorderden.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Dit is ook hoe we de site bekostigen: als je via onze aanbevelingen iets koopt, ontvangen we soms een kleine commissie — zonder dat je daar iets extra voor betaalt. Zo blijft de coach gratis.
        </p>
        <div style={{ marginTop: 20 }}>
          <Link href="/producten" style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--terracotta)', textDecoration: 'none', borderBottom: '1px solid var(--terracotta)', paddingBottom: 2 }}>
            Bekijk productaanbevelingen →
          </Link>
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 20 }}>Feiten</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
          {[
            ['Gelanceerd', 'Mei 2026'],
            ['Coach', 'Moos — AI-powered, gratis'],
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
          Klaar om Moos een vraag te stellen?
        </p>
        <p style={{ fontSize: 14, color: 'rgba(244,239,228,.7)', margin: 0, lineHeight: 1.5 }}>
          <Link href="/" style={{ color: '#e8c896', textDecoration: 'none', borderBottom: '1px solid #e8c896' }}>Open de coach</Link>
          {' '}— gratis, geen account, meteen aan de slag.
        </p>
      </div>

    </main>
  )
}
