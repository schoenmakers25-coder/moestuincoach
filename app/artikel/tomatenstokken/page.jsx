import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Tomatenstokken zetten in vier stappen',
  description: 'Wanneer je de stok plaatst, hoe diep hij de grond in moet, en de veelgemaakte fout die later altijd mis gaat.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/artikel/tomatenstokken' },
  openGraph: {
    type: 'article',
    url: 'https://www.moestuin.nl/artikel/tomatenstokken',
    title: 'Tomatenstokken zetten in vier stappen — Moestuin.nl',
    description: 'Wanneer, hoe diep, en de fout die de meeste tuiniers pas weken later ontdekken.',
    locale: 'nl_NL',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Tomatenstokken zetten in vier stappen',
  description: 'Wanneer je de stok plaatst, hoe diep hij de grond in moet, en de veelgemaakte fout die later altijd mis gaat.',
  totalTime: 'PT30M',
  step: [
    { '@type': 'HowToStep', name: 'Kies het juiste moment', text: 'Zet de stok tegelijk met het planten — nooit later. Op het moment dat je de plant in de grond zet, heb je nog vrij zicht op de wortelbal.' },
    { '@type': 'HowToStep', name: 'Kies het juiste materiaal', text: 'Bamboe (1,8–2 m) voor enkelvoudige planten, stalen kooi voor struikvormige rassen. Vermijd dunne bamboestokkjes — ze breken halverwege het seizoen.' },
    { '@type': 'HowToStep', name: 'Zet de stok op de juiste plek', text: 'Minimaal 5 cm van de stengel. Duw de stok schuin weg van de plant de grond in en corrigeer daarna naar verticaal. Zo prik je niet door de wortelbal.' },
    { '@type': 'HowToStep', name: 'Bind correct aan', text: 'Gebruik een zachte bindmethode: touw in een acht-figuur (stengel en stok krijgen elk hun eigen lus), niet strak. Laat groeimarge — de stengel wordt dikker.' },
  ],
  author: { '@type': 'Person', name: 'Joris van der Wal' },
  publisher: { '@type': 'Organization', name: 'Moestuin.nl', url: 'https://www.moestuin.nl' },
  datePublished: '2026-04-28',
  dateModified: '2026-04-28',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.moestuin.nl/' },
    { '@type': 'ListItem', position: 2, name: 'Tuintips', item: 'https://www.moestuin.nl/artikel' },
    { '@type': 'ListItem', position: 3, name: 'Tomatenstokken zetten' },
  ],
}

export default function TomatenstokkenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="article-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Broodkruimelpad">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/artikel">Tuintips</Link>
            <span className="sep">/</span>
            <b>Tomatenstokken zetten</b>
          </nav>
          <div className="kicker-row">
            <span className="kicker">Methode · Tomaat #04</span>
            <span className="meta">Bijgewerkt 28 april 2026 · 7 min lezen</span>
          </div>
          <h1>Tomatenstokken zetten <span className="it">zonder de wortels te raken.</span></h1>
          <p className="dek">De stok plaatsen ná het uitplanten is de meest gemaakte fout. Je plukt er weken later de zure vruchten van — letterlijk. Hier is wanneer je het doet, hoe diep, en welk materiaal je nooit meer moet kopen.</p>
          <div className="byline-row">
            <div className="byline">
              <div className="avatar">J</div>
              <div className="who">
                <b>Joris van der Wal</b>
                <span>Hoofdtuinier — sinds 2018</span>
              </div>
            </div>
            <div className="meta">28 april 2026 · Methode · 7 min</div>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 420, overflow: 'hidden', borderRadius: 0, marginTop: 24 }}>
            <Image
              src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=1200&h=420&fit=crop&auto=format&q=80"
              alt="Tomatenplanten in de tuin met steun"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </div>
        </div>
      </section>

      <section className="article-body">
        <div className="wrap">
          <div className="grid">

            <aside className="toc" aria-label="Inhoudsopgave">
              <div className="lbl">Inhoud</div>
              <ol>
                <li className="active"><a href="#timing">Het juiste moment</a></li>
                <li><a href="#materiaal">Welk materiaal</a></li>
                <li><a href="#plaatsing">Hoe diep en waar</a></li>
                <li><a href="#binden">Binden zonder schade</a></li>
                <li><a href="#fouten">Vier dure fouten</a></li>
              </ol>
            </aside>

            <article className="prose">
              <p>Er zijn twee soorten tuiniers: zij die de stok tegelijk met de plant plaatsen, en zij die dat uitstellen. De eersten hebben aan het eind van het seizoen rechte, goed gedragen planten met een volle oogst. De tweeden hebben halverwege augustus een kolossale plant die zichzelf proberen te dragen met een stok die door de helft van de wortels heen gestoken werd.</p>

              <h2 id="timing"><span className="num">Stap 01</span>Het juiste moment: de dag dat je plant</h2>
              <p>Dit is de enige regel die ertoe doet: zet de stok op dezelfde dag dat je de plant in de grond zet. Op dat moment weet je precies waar de wortelbal zit — en kun je de stok ernaast plaatsen in plaats van erdoorheen. Wacht je drie weken, dan zijn de wortels inmiddels twee keer zo groot en onzichtbaar. Dan is het gissen, en gissen gaat mis.</p>

              <blockquote>Een wortelbal is geen bal. Hij groeit asymmetrisch, diagonaal, naar vocht. Wat je ziet is een fractie van wat er zit.</blockquote>

              <p>De plant heeft de eerste weken al steun nodig — zeker als er wind staat. Een plant die beweegt in de wind bouwt een minder stabiel wortelstelsel. Stok erin, direct.</p>

              <h2 id="materiaal"><span className="num">Stap 02</span>Welk materiaal — en wat je beter kunt laten staan</h2>
              <p>De meest gebruikte opties, eerlijk beoordeeld:</p>

              <ul>
                <li><b>Bamboe (1,8–2 m)</b> — de standaard. Werkt goed voor enkelvoudige stengels. Let op: dunner dan 1 cm breekt halverwege augustus als de plant zwaar begint te worden. Koop de dikke.</li>
                <li><b>Stalen kooi (spiraalvorm of rechthoekig)</b> — het beste voor struikvormige rassen als Roma en Cherry. De plant groeit erdoorheen en heeft nauwelijks bindwerk nodig.</li>
                <li><b>Houten staken (2 m)</b> — duurzaam, betrouwbaar, zwaar. Als je een vaste plek in de moestuin hebt, zijn dit een goede investering voor meerdere jaren.</li>
                <li><b>Dunne plastic spiralen</b> — goed in winkelrekken, slecht in de praktijk. Te dun, te kort, te krom. Overgeslagen.</li>
              </ul>

              <h2 id="plaatsing"><span className="num">Stap 03</span>Hoe diep en waar je de stok zet</h2>
              <p>Minimaal 20–30 cm de grond in, meer als de grond los is. De stok moet stabiel staan zonder te bewegen als je er zijdelings tegenaan duwt. Sla hem niet te snel in — als je hem een paar centimeter per keer plaatst en luistert of je iets breekt (wortels), kun je bijsturen.</p>

              <div className="pull">
                <div className="big">5 cm</div>
                <div className="txt">minimale afstand tussen stok en stengel. Dichterbij en de stok groeit op termijn samen met de stengel — of erger, hij beschadigt de bast.</div>
              </div>

              <p>Techniek voor zachte grond: duw de stok licht schuin de grond in (weg van de plant), en corrigeer pas naar verticaal als hij op diepte zit. Op die manier passeer je de wortelbal zijlangs in plaats van er recht doorheen.</p>

              <h2 id="binden"><span className="num">Stap 04</span>Binden zonder schade</h2>
              <p>Gebruik zacht bindtouw of tuintape, nooit draad of plastic strips. De techniek: bind in een achtvorm — de stengel in zijn eigen losse lus, de stok in zijn eigen losse lus. De twee lussen kruisen en houden de stengel op afstand van het hout. Strak binden is de fout; de stengel groeit dik en de knoop snijdt dan in het weefsel.</p>

              <p>Bind op meerdere punten langs de plant mee — niet alleen onderaan. Een volwassen tomatenstengel met zware trossen buigt enorm. Eén bindpunt onderaan houdt dat niet.</p>

              <h2 id="fouten"><span className="num">Vier fouten</span>Die we keer op keer zien</h2>
              <ul>
                <li><b>Te laat plaatsen</b> — de meest gemaakte. Zie boven.</li>
                <li><b>Stok te dicht bij de stengel</b> — later in het seizoen groeien ze samen. De bast beschadigt, de plant krijgt schimmel.</li>
                <li><b>Te strak binden</b> — de stengel heeft groeimarge nodig. Over twee weken is die knoop al te krap.</li>
                <li><b>Één stok voor een struikvormig ras</b> — sommige tomatenrassen groeien in meerdere stengels tegelijk. Dan helpt één stok niet; gebruik een kooi.</li>
              </ul>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                Dit artikel is onderdeel van onze tomatenserie. Alle informatie is gebaseerd op eigen ervaring over meerdere seizoenen.
              </p>
            </article>

            <aside className="aside" aria-label="Samenvatting">
              <div className="box">
                <div className="lbl">Op een rij</div>
                <h5>Tomatenstok — checklist</h5>
                <div className="row"><span>Moment</span><b>Op plantdag</b></div>
                <div className="row"><span>Diepte stok</span><b>20–30 cm</b></div>
                <div className="row"><span>Afstand stengel</span><b>≥ 5 cm</b></div>
                <div className="row"><span>Bindmateriaal</span><b>Zacht touw</b></div>
                <div className="row"><span>Bindtechniek</span><b>Acht-figuur</b></div>
                <div className="row"><span>Moeilijkheid</span><b>★☆☆☆☆</b></div>
              </div>
              <div className="box" style={{ background: 'var(--forest)', color: 'var(--paper)', borderColor: 'var(--forest)' }}>
                <div className="lbl" style={{ color: '#e8c896', borderColor: '#4a7040' }}>Stel het aan Moos</div>
                <h5 style={{ color: 'var(--paper)' }}>Specifieke vraag? <em>Moos helpt direct.</em></h5>
                <p style={{ fontSize: 13, color: 'rgba(244,239,228,.75)', margin: '8px 0 12px', lineHeight: 1.5 }}>Wat het beste ras is voor jouw situatie, of hoe je een omgevallen plant redt — de AI coach weet het.</p>
                <Link href="/" style={{ display: 'inline-block', background: 'var(--terracotta)', color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', padding: '10px 14px', textDecoration: 'none' }}>Vraag Moos →</Link>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <section className="related-strip" aria-label="Gerelateerde artikelen">
        <div className="wrap">
          <div className="section-head" style={{ borderBottomColor: 'var(--ink)', marginBottom: 40 }}>
            <h2>Lees <span className="it">verder</span></h2>
            <p className="intro">Meer over tomaten kweken.</p>
            <Link className="link" href="/artikel">Alle tuintips →</Link>
          </div>
          <div className="row">
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75" alt="Tomaten uitplanten" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag">Stappenplan</span><span className="meta">9 min · 12 mei</span></div>
              <h3>Tomaten uitplanten <span className="it">in zes stappen</span></h3>
              <p className="excerpt">Wanneer de bodemtemperatuur goed is, hoe diep je plant, en de drie fouten die elke beginner maakt.</p>
              <Link href="/artikel" className="read">Lees verder →</Link>
            </article>
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75" alt="Tomatenproblemen" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag terra">Probleem</span><span className="meta">6 min · 10 mei</span></div>
              <h3>Wat is er mis met je tomaten? <span className="it">Zes diagnoses</span></h3>
              <p className="excerpt">Bruine blaadjes, krullende toppen, splijtende vruchten — hoe je weet wat er aan de hand is.</p>
              <Link href="/artikel/tomatenproblemen" className="read">Lees verder →</Link>
            </article>
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75" alt="Tomatenrassen" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag">Rassen</span><span className="meta">12 min · 20 apr</span></div>
              <h3>Tien tomatenrassen <span className="it">die altijd lukken</span></h3>
              <p className="excerpt">Van Gardeners&apos; Delight tot Brandywine — getest op smaak, opbrengst en robuustheid.</p>
              <Link href="/artikel/tomatenrassen" className="read">Lees verder →</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
