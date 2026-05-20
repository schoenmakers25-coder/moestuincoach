import Link from 'next/link'

export const metadata = {
  title: 'Linkpartners — Moestuin.nl',
  description: 'Informatie voor websites die willen samenwerken met Moestuin.nl via een linkpartnerschap of redactionele samenwerking.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/linkpartners' },
}

export default function LinkpartnersPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 100px' }}>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--terracotta)', marginBottom: 16 }}>
        Samenwerking
      </div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 56px)', lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: 20 }}>
        Linkpartners<span style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>.</span>
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '58ch', marginBottom: 56, borderBottom: '1px solid var(--line)', paddingBottom: 40 }}>
        Moestuin.nl is een Nederlandse tuinier­website gericht op het helpen van mensen bij het aanleggen en onderhouden van een moestuin. We zijn op zoek naar relevante linkpartners — websites die schrijven over tuinieren, gezond eten, buiten­leven of aanverwante onderwerpen.
      </p>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Over Moestuin.nl</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Moestuin.nl combineert redactionele tuiniersgidsen met een gratis AI-tuincoach (Moos) die bezoekers direct en persoonlijk advies geeft over hun moestuin. De site richt zich op beginners en gevorderde tuiniers die praktisch advies zoeken — geen reclame, geen overbodige toeters en bellen.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)' }}>
          De site is gelanceerd in mei 2026 en groeit organisch via content en AI-gestuurde vragen. We werken aan een structurele contentbasis van wekelijks nieuwe tuiniersgidsen.
        </p>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 20 }}>Doelgroep</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
          {[
            ['Leeftijd', '28 – 55 jaar'],
            ['Interesse', 'Tuinieren, gezond eten, duurzaamheid'],
            ['Situatie', 'Tuin, balkon of volkstuin'],
            ['Niveau', 'Beginner tot gevorderd'],
            ['Taal', 'Nederlandstalig (NL + BE)'],
            ['Device', 'Overwegend mobiel'],
          ].map(([label, value]) => (
            <div key={label} style={{ background: 'var(--paper)', padding: '18px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Wat wij zoeken</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 20 }}>
          We plaatsen alleen links naar websites die relevant zijn voor onze lezers. Wij hanteren daarbij een redactioneel criterium: de link moet een echte meerwaarde hebben voor de lezer op de pagina waar hij staat.
        </p>
        <ul style={{ lineHeight: 1.9, color: 'var(--ink-2)', paddingLeft: 24 }}>
          <li>Websites over tuinieren, zaaien, planten of moestuinen</li>
          <li>Webshops voor zaad, gereedschap of tuinbenodigdheden</li>
          <li>Blogs over gezond eten, seizoensgebonden koken of duurzaamheid</li>
          <li>Platforms voor volkstuin­verhuur of stadslandbouw</li>
          <li>Educatieve sites over bodem, bodemleven of permacultuur</li>
        </ul>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Onze voorwaarden</h2>
        <div style={{ borderTop: '2px solid var(--ink)' }}>
          {[
            ['Relevantie', 'De website schrijft over een onderwerp dat aansluit bij tuinieren of gezond buiten­leven.'],
            ['Kwaliteit', 'De website heeft leesbare, originele content — geen doorgesluisde of automatisch gegenereerde teksten.'],
            ['Geen betaalde links', 'Wij kopen geen links en verkopen ze niet. Alle samenwerkingen zijn redactioneel van aard.'],
            ['Wederkerigheid', 'We staan open voor linkruil mits beide pagina\'s inhoudelijk relevant zijn voor de bezoekers.'],
            ['Ankertekst', 'We gebruiken beschrijvende ankerteksten die de bestemming accuraat omschrijven.'],
          ].map(([title, text]) => (
            <div key={title} className="linkpartners-row" style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '16px 32px', padding: '18px 0', borderBottom: '1px solid var(--line)', alignItems: 'start' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', paddingTop: 3 }}>{title}</div>
              <div style={{ lineHeight: 1.65, color: 'var(--ink-2)', fontSize: 16 }}>{text}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Hoe aanvragen</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 24 }}>
          Stuur een e-mail naar <a href="mailto:info@moestuin.nl" style={{ color: 'var(--terracotta)', fontWeight: 600 }}>info@moestuin.nl</a> met de volgende informatie:
        </p>
        <ol style={{ lineHeight: 2.0, color: 'var(--ink-2)', paddingLeft: 24 }}>
          <li>De URL van je website en een korte omschrijving</li>
          <li>De pagina('s) waar je een link van Moestuin.nl wilt ontvangen</li>
          <li>De pagina op je website waar je naar Moestuin.nl wilt linken (indien linkruil)</li>
          <li>De voorgestelde ankertekst voor beide richtingen</li>
        </ol>
        <p style={{ lineHeight: 1.7, color: 'var(--muted)', fontSize: 15, marginTop: 16 }}>
          We proberen binnen vijf werkdagen te reageren.
        </p>
      </section>

      <div style={{ background: 'var(--forest)', color: 'var(--paper)', padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(244,239,228,.6)' }}>Direct contact</div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.2, margin: 0 }}>
          Klaar om te beginnen? Stuur een mail naar{' '}
          <a href="mailto:info@moestuin.nl" style={{ color: '#e8c896', textDecoration: 'none', borderBottom: '1px solid #e8c896' }}>info@moestuin.nl</a>
        </p>
        <p style={{ fontSize: 14, color: 'rgba(244,239,228,.7)', margin: 0, lineHeight: 1.5 }}>
          Of bekijk eerst onze content op <Link href="/artikel" style={{ color: 'rgba(244,239,228,.9)', textDecoration: 'underline' }}>de tuintips­pagina</Link> om te zien of er een goede match is.
        </p>
      </div>

    </main>
  )
}
