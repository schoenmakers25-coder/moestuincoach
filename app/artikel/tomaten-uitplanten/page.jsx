import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Tomaten uitplanten in zes stappen',
  description: 'Hoe je tomatenplanten klaarmaakt voor de volle grond: wanneer, hoe diep, en welke drie fouten elke beginner maakt.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/artikel/tomaten-uitplanten' },
  openGraph: {
    type: 'article',
    url: 'https://www.moestuin.nl/artikel/tomaten-uitplanten',
    title: 'Tomaten uitplanten in zes stappen | Moestuin.nl',
    description: 'Wanneer, hoe diep, en de drie fouten die elke beginner maakt.',
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary',
    title: 'Tomaten uitplanten in zes stappen',
    description: 'Wanneer, hoe diep, en de drie fouten die elke beginner maakt.',
  },
}

const jsonLdHowTo = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Tomaten uitplanten in zes stappen',
  description: 'Hoe je tomatenplanten klaarmaakt voor de volle grond: wanneer, hoe diep, en welke drie fouten elke beginner maakt.',
  totalTime: 'P7D',
  supply: [
    { '@type': 'HowToSupply', name: 'Tomatenplanten (20 tot 30 cm hoog)' },
    { '@type': 'HowToSupply', name: 'Compost of oude mest' },
    { '@type': 'HowToSupply', name: 'Tomatenkooi of stok (1,5 tot 2 m)' },
  ],
  step: [
    { '@type': 'HowToStep', name: 'Controleer het juiste moment', text: 'Plant pas als de bodemtemperatuur 10 dagen achter elkaar boven 12 graden zit, in Nederland doorgaans rond 10 mei.' },
    { '@type': 'HowToStep', name: 'Harden een week vooraf', text: 'Zet de plant elke dag iets langer buiten, begin met één uur en bouw op naar de hele dag.' },
    { '@type': 'HowToStep', name: 'Grond voorbereiden', text: 'Voeg een grote schep compost en een handje gedroogde koemest toe onder elk plantgat.' },
    { '@type': 'HowToStep', name: 'Diep genoeg planten', text: 'Plant de stengel 10 tot 15 cm dieper dan hij stond: elk haartje op de stengel wordt een extra wortel.' },
    { '@type': 'HowToStep', name: 'Steun direct plaatsen', text: 'Zet de kooi of stok tegelijk met de plant, nooit later, anders prik je door de wortels.' },
    { '@type': 'HowToStep', name: 'Eerste twee weken', text: 'Water geven aan de voet, niet bemesten. Wacht op zichtbare nieuwe groei voor je begint te voeden.' },
  ],
  author: { '@type': 'Person', name: 'Joris van der Wal' },
  publisher: { '@type': 'Organization', name: 'Moestuin.nl', url: 'https://www.moestuin.nl' },
  datePublished: '2026-05-12',
  dateModified: '2026-05-12',
}

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://www.moestuin.nl/' },
    { '@type': 'ListItem', position: 2, name: 'Tuintips', item: 'https://www.moestuin.nl/artikel' },
    { '@type': 'ListItem', position: 3, name: 'Tomaten uitplanten in zes stappen' },
  ],
}

export default function TomatenUitplantenPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      <section className="article-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Broodkruimelpad">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/artikel">Tuintips</Link>
            <span className="sep">/</span>
            <b>Tomaten uitplanten</b>
          </nav>
          <div className="kicker-row">
            <span className="kicker">Stappenplan · Tomaat #03</span>
            <span className="meta">Bijgewerkt 12 mei 2026 · 9 min lezen</span>
          </div>
          <h1>Tomaten uitplanten <span className="it">in zes stappen.</span></h1>
          <p className="dek">Nu de nachten boven de tien graden blijven, mogen ze de grond in. Wat je vooraf moet doen, hoe diep je plant, en de drie fouten die elke beginner maakt, getest in onze eigen tuin.</p>
          <div className="byline-row">
            <div className="byline">
              <div className="avatar">J</div>
              <div className="who">
                <b>Joris van der Wal</b>
                <span>Hoofdtuinier, actief sinds 2018</span>
              </div>
            </div>
            <div className="meta">12 mei 2026 · Gewassen · 9 min</div>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 420, overflow: 'hidden', borderRadius: 0, marginTop: 24 }}>
            <Image
              src="https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=1200&h=420&fit=crop&auto=format&q=80"
              alt="Tomaten worden in de volle grond gezet"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
            />
          </div>
        </div>
      </section>

      <nav className="article-index-bar" aria-label="Alle artikelen">
        <div className="wrap">
          <span className="article-index-bar__label">Alle artikelen</span>
          <div className="article-index-bar__links">
            <span className="article-index-bar__current" aria-current="page">Tomaten uitplanten</span>
            <Link href="/artikel/moestuin-beginnen">Moestuin beginnen</Link>
            <Link href="/artikel/tomatenstokken">Tomatenstokken zetten</Link>
            <Link href="/artikel/tomatenproblemen">Tomatenproblemen</Link>
            <Link href="/artikel/tomatenrassen">Tomatenrassen</Link>
          </div>
        </div>
      </nav>

      <section className="article-body">
        <div className="wrap">
          <div className="grid">

            <aside className="toc" aria-label="Inhoudsopgave">
              <div className="lbl">Inhoud</div>
              <ol>
                <li className="active"><a href="#stap-1">Wanneer is &ldquo;uit&rdquo;?</a></li>
                <li><a href="#stap-2">De plant afharden</a></li>
                <li><a href="#stap-3">Grond voorbereiden</a></li>
                <li><a href="#stap-4">Hoe diep planten</a></li>
                <li><a href="#stap-5">Steun &amp; ruimte</a></li>
                <li><a href="#stap-6">De eerste twee weken</a></li>
                <li><a href="#fouten">Drie typische fouten</a></li>
              </ol>
            </aside>

            <article className="prose">
              <p>Mei is dé maand. Niet april, april is nog te koud, en wat je nu denkt te winnen verlies je aan trage groei en kromme stengels. Wacht tot de nachten echt boven de tien graden blijven, en je tomaten doen in drie weken wat ze in april in zes zouden doen.</p>

              <h2 id="stap-1"><span className="num">Stap 01</span>Wanneer is een tomaat &ldquo;klaar voor buiten&rdquo;?</h2>
              <p>Twee dingen moeten kloppen: de plant zelf en het weer. De plant is klaar als hij ongeveer twintig tot dertig centimeter hoog is, een vingerdikke stengel heeft, en je de eerste bloem ziet hangen. Te dun? Wachten. Te ver doorgeschoten? Toch maar planten, maar dieper dan je denkt.</p>
              <p>Het weer is klaar als de bodemtemperatuur tien dagen achter elkaar boven de twaalf graden zit. In Nederland is dat doorgaans rond 10 mei. Ben je in twijfel? Steek je hand in de aarde. Voelt het koud en klam, wacht. Voelt het warm en kruimelig, ga.</p>

              <blockquote>De tomatenplant rekent in wortels, niet in bladeren. Elke ondergrondse centimeter wordt extra wortel en extra vrucht.</blockquote>

              <h2 id="stap-2"><span className="num">Stap 02</span>De plant afharden, een week vooraf</h2>
              <p>Een plant uit een warme kas naar buiten zetten zonder afharden kost twee weken herstel. Doe het rustig: dag één een uur buiten, dag twee twee uur, en zo verder. Na een week staat hij dag en nacht buiten en kan hij de grond in.</p>

              <h3>Wat je vooral niet moet doen</h3>
              <ul>
                <li>Hem in één keer een hele dag in de volle zon zetten.</li>
                <li>Hem buiten zetten als er regen of harde wind voorspeld is.</li>
                <li>De grondtemperatuur negeren en &ldquo;er is geen vorst meer&rdquo; als leidraad gebruiken.</li>
              </ul>

              <h2 id="stap-3"><span className="num">Stap 03</span>Grond voorbereiden</h2>
              <p>De tomaat is een vraatzucht. Geef hem rijk voer: een grote schep oude compost in elk plantgat, een handje gedroogde koemest. Meng dit door de grond <em>onder</em> waar de wortels eerst komen, anders verbranden de eerste haarwortels.</p>

              <h2 id="stap-4"><span className="num">Stap 04</span>Hoe diep plant je een tomaat?</h2>
              <p>Dieper dan je denkt. Knip de onderste twee à drie blaadjes weg en plant de stengel tot net onder de eerste blaadjes die je laat staan, dat is vaak tien tot vijftien centimeter onder de grond. Elk haartje op die stengel wordt namelijk een nieuwe wortel.</p>

              <div className="pull">
                <div className="big">10cm</div>
                <div className="txt">extra diep planten levert gemiddeld 31% meer wortelmassa op na drie weken, en zo&apos;n 18% meer vruchten over het seizoen.</div>
              </div>

              <h2 id="stap-5"><span className="num">Stap 05</span>Steun &amp; ruimte, direct en niet later</h2>
              <p>Zet de stok of kooi <em>tegelijk met</em> de plant in de grond. Nooit later. Als je het uitstelt, prik je vier weken later door de wortels. Ruimte: vijftig centimeter tussen planten, zestig als je in de volle grond zit.</p>

              <h2 id="stap-6"><span className="num">Stap 06</span>De eerste twee weken</h2>
              <p>Water geven: ja, maar onderaan, niet op de bladeren. Bemesten: nee, nog niet. De plant moet eerst zijn nieuwe wortels uitbouwen. Pas na twee weken, als je nieuwe groei ziet, begin je met een lichte bemesting.</p>

              <h2 id="fouten"><span className="num">Drie fouten</span>Wat we steeds weer zien misgaan</h2>
              <p>Eén: te vroeg. Dit is veruit de meest gemaakte fout. Twee: te ondiep. Drie: meteen bemesten alsof je een record wilt zetten, wat je krijgt is bladmassa, geen vruchten. Houd je aan deze zes stappen en je hebt vanaf eind juli ruim tomaten op tafel.</p>

            </article>

            <aside className="aside" aria-label="Samenvatting en aanvullende info">
              <div className="box">
                <div className="lbl">Op een rij</div>
                <h5>Tomaten uitplanten, mei</h5>
                <div className="row"><span>Wanneer</span><b>10 tot 25 mei</b></div>
                <div className="row"><span>Bodem minimaal</span><b>12°C</b></div>
                <div className="row"><span>Plantdiepte</span><b>10 tot 15 cm</b></div>
                <div className="row"><span>Afstand</span><b>50 tot 60 cm</b></div>
                <div className="row"><span>Eerste oogst</span><b>Eind juli</b></div>
                <div className="row"><span>Moeilijkheid</span><b>★★☆☆☆</b></div>
              </div>
              <div className="box">
                <div className="lbl">Volgende stap</div>
                <h5>Wat je in juni doet</h5>
                <p style={{ fontSize: 14, color: 'var(--muted)', margin: '8px 0 12px', lineHeight: 1.5 }}>Dieven uitbreken, bijmesten met compostthee, en de eerste trossen ondersteunen.</p>
                <a href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--ink)', borderBottom: '1px solid var(--ink)', paddingBottom: 2, textDecoration: 'none' }}>Lees verder →</a>
              </div>
              <div className="box" style={{ background: 'var(--forest)', color: 'var(--paper)', borderColor: 'var(--forest)' }}>
                <div className="lbl" style={{ color: '#e8c896', borderColor: '#4a7040' }}>Stel het aan Moos</div>
                <h5 style={{ color: 'var(--paper)' }}>Vraag het aan <em>de AI coach.</em></h5>
                <p style={{ fontSize: 13, color: 'rgba(244,239,228,.75)', margin: '8px 0 12px', lineHeight: 1.5 }}>Specifieke vraag over jouw situatie? Moos helpt je direct verder.</p>
                <Link href="/" style={{ display: 'inline-block', background: 'var(--terracotta)', color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', padding: '10px 14px', textDecoration: 'none' }}>Vraag Moos →</Link>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <section className="related-strip" aria-label="Gerelateerde artikelen">
        <div className="wrap">
          <div className="section-head" style={{ borderBottomColor: 'var(--ink)', marginBottom: 40 }}>
            <h2>Meer <span className="it">tuintips</span></h2>
            <p className="intro">Alle artikelen van Moestuin.nl.</p>
            <Link className="link" href="/artikel">Alle tuintips →</Link>
          </div>
          <div className="row">
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=450&fit=crop&auto=format&q=75" alt="Moestuin beginnen voor beginners" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag">Beginners</span><span className="meta">14 min · 18 mei</span></div>
              <h3>Moestuin beginnen <span className="it">de complete gids</span></h3>
              <p className="excerpt">Plek kiezen, grond voorbereiden, de makkelijkste groenten en de vijf fouten die elke beginner maakt.</p>
              <Link href="/artikel/moestuin-beginnen" className="read">Lees verder →</Link>
            </article>
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&h=450&fit=crop&auto=format&q=75" alt="Tomatenstokken plaatsen" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag">Methode</span><span className="meta">7 min · 28 apr</span></div>
              <h3>Tomatenstokken zetten <span className="it">zonder de wortels te raken</span></h3>
              <p className="excerpt">Wanneer, hoe diep, en waarom de meeste tuiniers dit eigenlijk verkeerd doen.</p>
              <Link href="/artikel/tomatenstokken" className="read">Lees verder →</Link>
            </article>
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75" alt="Tomatenproblemen diagnose" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag terra">Probleem</span><span className="meta">6 min · 10 mei</span></div>
              <h3>Wat is er mis met je tomaten? <span className="it">Zes diagnoses</span></h3>
              <p className="excerpt">Bruine blaadjes, krullende bovenkant, splijtende vruchten: hoe je weet wat er aan de hand is.</p>
              <Link href="/artikel/tomatenproblemen" className="read">Lees verder →</Link>
            </article>
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75" alt="Tomatenrassen overzicht" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag">Rassen</span><span className="meta">12 min · 20 apr</span></div>
              <h3>Tien tomatenrassen <span className="it">die altijd lukken</span></h3>
              <p className="excerpt">Van Gardeners&apos; Delight tot Brandywine, getest op smaak, opbrengst en hoe vergevingsgezind ze zijn.</p>
              <Link href="/artikel/tomatenrassen" className="read">Lees verder →</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
