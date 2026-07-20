import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Over Moestuin.nl — de moestuin en kas van Hoeve 1700',
  description:
    'Moestuin.nl komt van Hoeve 1700, een oude hoeve waar we een verwaarloosde moestuin en kas weer tot leven brengen. Lees het verhaal, en hoe deze site gemaakt wordt.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/over' },
}

const mono = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
}

function Figure({ src, alt, ratio, caption }) {
  return (
    <figure style={{ margin: '0 0 12px' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: ratio,
          borderRadius: 4,
          overflow: 'hidden',
          background: 'var(--paper-2)',
        }}
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 800px) 100vw, 752px" style={{ objectFit: 'cover' }} />
      </div>
      {caption && (
        <figcaption style={{ ...mono, fontSize: 10, color: 'var(--muted)', marginTop: 8, textTransform: 'none', letterSpacing: '0.04em' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default function OverPage() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 100px' }}>

      <div style={{ ...mono, color: 'var(--terracotta)', marginBottom: 16 }}>Over ons</div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 6vw, 56px)', lineHeight: 1.02, letterSpacing: '-0.01em', marginBottom: 20 }}>
        Moestuin<span style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>.</span>nl komt van{' '}
        <span style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>Hoeve 1700.</span>
      </h1>

      <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '58ch', marginBottom: 40 }}>
        Achter deze site zit geen redactieburo, maar een echte plek: een oude hoeve in glooiend heuvelland,
        met een moestuin en een kas die we stap voor stap weer tot leven brengen. Alles wat je hier leest,
        komt voort uit wat er op dat stukje grond gebeurt.
      </p>

      <Figure
        src="/hoeve/hoeve1700.jpg"
        alt="Hoeve 1700 vanuit de lucht, met moestuin en boomgaard in glooiend heuvelland"
        ratio="3 / 2"
        caption="Hoeve 1700 — de thuisbasis van Moestuin.nl."
      />

      <section style={{ margin: '48px 0', borderTop: '1px solid var(--line)', paddingTop: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Een verwaarloosde tuin, terug tot leven</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Toen we op Hoeve 1700 begonnen, waren de moestuin en de kas jarenlang aan hun lot overgelaten:
          overwoekerde bedden, een kas vol wildgroei. Precies dat maakt het mooi. Een moestuin opnieuw opbouwen
          is geen klus die je even afvinkt — het is een langzaam ritme van zaaien, wachten, bijsturen en oogsten.
          Je handen in de grond, je hoofd even leeg.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Dat onthaasten is voor ons de kern. Niet de perfecte oogst, maar het rustige werk eromheen. En alles
          wat we onderweg leren — wat wél werkt, wat onzin blijkt — schrijven we op. Dat is Moestuin.nl.
        </p>
      </section>

      <Figure
        src="/hoeve/kas1.jpg"
        alt="De glazen kas op Hoeve 1700 bij zonsopkomst, met ochtendnevel en een oude eik"
        ratio="4 / 5"
        caption="De kas bij zonsopkomst. Zwart gecoate profielen, hergebruikt glas."
      />

      <section style={{ margin: '48px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>De kas</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Het hart van de tuin is de kas: een glazen serre met zwart gecoate profielen, opgebouwd met hergebruikt
          materiaal. Onder glas verschuift het seizoen — eerder zaaien in het voorjaar, langer doorgaan in het najaar,
          en een plek om te schuilen als het buiten giet.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Over die kas, en hoe je er zelf een bouwt of laat bouwen, valt veel te vertellen. Daar komen we later
          uitgebreid op terug.
        </p>
      </section>

      <section style={{ margin: '48px 0', borderTop: '1px solid var(--line)', paddingTop: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>De zaaikalender</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Het praktische hart van de site is de <strong>zaaikalender</strong>: 36 groenten, kruiden en vruchten op
          één overzichtelijke pagina. Per maand zie je in één oogopslag wat je zaait, plant en oogst, binnen én buiten.
          Afgestemd op het klimaat in Nederland en Vlaanderen.
        </p>
        <Link href="/zaaikalender" style={{ ...mono, display: 'inline-block', marginTop: 8, fontSize: 12, letterSpacing: '0.1em', color: 'var(--terracotta)', textDecoration: 'none', borderBottom: '1px solid var(--terracotta)', paddingBottom: 2 }}>
          Bekijk de zaaikalender →
        </Link>
      </section>

      <section style={{ margin: '48px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Tuintips &amp; gidsen</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Elke week verschijnt er een nieuwe gids over wat er op dat moment speelt in de moestuin — beginnersgidsen,
          stappenplannen, plaagbestrijding en seizoensoverzichten. Steeds vanuit het perspectief van de tuinier:
          wat werkt echt, wat is onzin, en wat heb je minimaal nodig.
        </p>
        <Link href="/artikel" style={{ ...mono, display: 'inline-block', marginTop: 8, fontSize: 12, letterSpacing: '0.1em', color: 'var(--terracotta)', textDecoration: 'none', borderBottom: '1px solid var(--terracotta)', paddingBottom: 2 }}>
          Bekijk alle tuintips →
        </Link>
      </section>

      {/* Transparantie — E-E-A-T: eerlijk over hoe de content ontstaat. */}
      <section style={{ margin: '48px 0', background: 'var(--paper-2)', border: '1px solid var(--line)', borderRadius: 4, padding: '28px 30px' }}>
        <div style={{ ...mono, color: 'var(--muted)', marginBottom: 12 }}>Hoe deze site gemaakt wordt</div>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', marginBottom: 12 }}>
          Moestuin.nl combineert twee dingen: de praktijk op Hoeve 1700 en de snelheid van moderne tools. De
          wekelijkse gidsen stellen we met behulp van AI samen, en lezen we vervolgens na en sturen we bij vanuit
          wat hier op de hoeve echt werkt. Zo houden we het tempo hoog zonder de praktijk uit het oog te verliezen.
        </p>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)', margin: 0 }}>
          We vinden dat je dat mag weten. Kom je iets tegen dat niet klopt? <Link href="/contact" style={{ color: 'var(--terracotta)', fontWeight: 600 }}>Laat het weten</Link> — we corrigeren graag.
        </p>
      </section>

      <section style={{ margin: '48px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 20 }}>Feiten</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 1, background: 'var(--line)', border: '1px solid var(--line)' }}>
          {[
            ['Thuisbasis', 'Hoeve 1700'],
            ['Zaaikalender', '36 gewassen, gratis'],
            ['Taal', 'Nederlands (NL + BE)'],
            ['Elke week', 'Nieuwe gids'],
            ['Account nodig', 'Nee'],
            ['Kosten', 'Gratis voor tuiniers'],
          ].map(([label, value]) => (
            <div key={label} style={{ background: 'var(--paper)', padding: '18px 20px' }}>
              <div style={{ ...mono, fontSize: 10, color: 'var(--muted)', marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, marginBottom: 16 }}>Contact</h2>
        <p style={{ lineHeight: 1.7, color: 'var(--ink-2)' }}>
          Vragen, feedback of een fout gevonden? Stuur een mail naar{' '}
          <a href="mailto:info@moestuin.nl" style={{ color: 'var(--terracotta)', fontWeight: 600 }}>info@moestuin.nl</a>.
          We lezen alles en reageren zo snel mogelijk.
        </p>
      </section>

      <div style={{ background: 'var(--forest)', color: 'var(--paper)', padding: '32px 36px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ ...mono, fontSize: 10, letterSpacing: '0.14em', color: 'rgba(244,239,228,.6)' }}>Aan de slag</div>
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
