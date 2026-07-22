import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Tien tomatenrassen die altijd lukken',
  description: "Van Gardeners' Delight tot Brandywine: tien betrouwbare tomatenrassen getest op smaak, opbrengst en robuustheid.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/artikel/tomatenrassen' },
  openGraph: {
    type: 'article',
    url: 'https://www.moestuin.nl/artikel/tomatenrassen',
    title: "Tien tomatenrassen die altijd lukken, Moestuin.nl",
    description: "Van cherry tot vlees: tien rassen die consistent leveren.",
    locale: 'nl_NL',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Tien tomatenrassen die altijd lukken',
  description: "Van Gardeners' Delight tot Brandywine: tien betrouwbare tomatenrassen getest op smaak, opbrengst en robuustheid.",
  author: { '@type': 'Person', name: 'Joris van der Wal' },
  publisher: { '@type': 'Organization', name: 'Moestuin.nl', url: 'https://www.moestuin.nl' },
  datePublished: '2026-04-20',
  dateModified: '2026-04-20',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.moestuin.nl/' },
    { '@type': 'ListItem', position: 2, name: 'Tuintips', item: 'https://www.moestuin.nl/artikel' },
    { '@type': 'ListItem', position: 3, name: 'Tien tomatenrassen die altijd lukken' },
  ],
}

const RASSEN = [
  {
    num: '01',
    naam: "Gardeners' Delight",
    type: 'Cherry',
    oogst: 'Juli tot oktober',
    moeilijkheid: '★☆☆☆☆',
    smaak: 'Zoet, sappig, uitgesproken',
    body: "Het meest betrouwbare cherryras voor de Nederlandse tuin. Kleine trosjes met tientallen vruchten per plant, van juli tot de eerste vorst. Resistent tegen de meeste schimmels en vergevingsgezind bij onregelmatig water geven. Voor beginners: begin hier.",
  },
  {
    num: '02',
    naam: 'Sungold',
    type: 'Cherry (oranje)',
    oogst: 'Juli tot september',
    moeilijkheid: '★★☆☆☆',
    smaak: 'Tropisch zoet, weinig zuur',
    body: 'Oranje cherrytomaat met een smaak die mensen omschrijven als tropisch fruit. Hoge suikerwaarden, nauwelijks zuur. Splijt iets sneller bij veel regen. Houd de watergift regelmatig. Eén plant geeft gemiddeld 400 tot 600 vruchten per seizoen.',
  },
  {
    num: '03',
    naam: 'Moneymaker',
    type: 'Ronde tomaat',
    oogst: 'Augustus tot september',
    moeilijkheid: '★☆☆☆☆',
    smaak: 'Mild, klassiek, betrouwbaar',
    body: 'De meest klassieke Nederlandse tuintomaat. Ronde, middelgrote vruchten in mooie trossen. Geen bijzondere smaak maar ook nooit teleurstellend, consistent en betrouwbaar. Goed bestand tegen kouder weer. Ideaal als je niet wilt experimenteren.',
  },
  {
    num: '04',
    naam: 'Brandywine',
    type: 'Vlees­tomaat (erfstuk)',
    oogst: 'Augustus tot september',
    moeilijkheid: '★★★☆☆',
    smaak: 'Rijke, complexe smaak, weinig water',
    body: 'Het meest smaakvolle ras op deze lijst. Grote, roze-rode vruchten met een vlezige binnenkant en nauwelijks zaadkamers. Vraagt geduld: de eerste vruchten komen laat. Vatbaarder voor ziekte dan moderne hybrides, maar de smaak wint elk jaar opnieuw. Voor de serieuze tuinier.',
  },
  {
    num: '05',
    naam: 'Black Cherry',
    type: 'Cherry (donker)',
    oogst: 'Juli tot oktober',
    moeilijkheid: '★★☆☆☆',
    smaak: 'Zoet-zuur, complex, donker',
    body: 'Donkerrode tot bijna zwarte kleine vruchten met een rijke smaak die afwijkt van gewone cherrytomaten. Compact van groei, geschikt voor pot of balkontuin. Combineert visueel prachtig met andere kleuren op een bord.',
  },
  {
    num: '06',
    naam: 'San Marzano',
    type: 'Pruim­tomaat',
    oogst: 'Augustus tot september',
    moeilijkheid: '★★☆☆☆',
    smaak: 'Weinig water, zoet, dik vlees',
    body: 'Het Italiaanse ras voor sauzen en conserven. Langwerpige vruchten met weinig vocht en veel vlees, ideaal om in te koken. Niet het lekkerste om rauw te eten, maar onverslaanbaar voor tomatensaus. Heeft warme zomers nodig voor het beste resultaat.',
  },
  {
    num: '07',
    naam: 'Green Zebra',
    type: 'Ronde tomaat (groen)',
    oogst: 'Augustus tot september',
    moeilijkheid: '★★☆☆☆',
    smaak: 'Fris-zuur, kruiding, uniek',
    body: 'Groen gestreepte tomaat die rijp wordt maar groen blijft, verwarrend en geweldig tegelijk. Frisser en zuurder dan rode rassen, met een kruidig aroma. Rijpheid herken je aan een lichte gele tint in de strepen en een zachte druk. Gasten vragen er altijd naar.',
  },
  {
    num: '08',
    naam: 'Roma',
    type: 'Pruim­tomaat',
    oogst: 'Augustus tot september',
    moeilijkheid: '★☆☆☆☆',
    smaak: 'Neutraal, vast vlees, weinig pit',
    body: 'De standaard pruimtomaat: betrouwbaar, compact, goed bestand tegen ziektes. Minder spectaculair van smaak dan San Marzano maar makkelijker te kweken. Goed voor saus, invriezen en drogen. Compact struiktype dat nauwelijks dieven aanmaakt.',
  },
  {
    num: '09',
    naam: 'Marmande',
    type: 'Vlees­tomaat',
    oogst: 'Augustus tot september',
    moeilijkheid: '★★☆☆☆',
    smaak: 'Vol, vleezig, klassiek Frans',
    body: 'De traditionele Franse marktplaats-tomaat. Grote, onregelmatige vruchten met een volle smaak. Minder risicovol dan Brandywine maar met een vergelijkbare rijkheid. Goed voor koelere regio\'s: rijpt iets vroeger dan andere vlezige rassen.',
  },
  {
    num: '10',
    naam: 'Sweet Million',
    type: 'Cherry',
    oogst: 'Juli tot november',
    moeilijkheid: '★☆☆☆☆',
    smaak: 'Licht zoet, consistent, productief',
    body: 'De meest productieve cherrysoort op de lijst. Honderden kleine vruchten per plant, trossen van soms twintig stuks. Weinig ziektegevoelig, lang seizoen. Als je gewoon veel tomaten wilt met minimale moeite: dit is het ras.',
  },
]

export default function TomatenrassenPage() {
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
            <b>Tomatenrassen</b>
          </nav>
          <div className="kicker-row">
            <span className="kicker">Rassen · Tomaat #06</span>
            <span className="meta">Bijgewerkt 20 april 2026 · 12 min lezen</span>
          </div>
          <h1>Tien tomatenrassen <span className="it">die altijd lukken.</span></h1>
          <p className="dek">Van de zoetste cherry tot het meest smaakvolle erfstuk: tien rassen die wij jaar na jaar kweken, met eerlijke noten over smaak, moeite en opbrengst. Inclusief één ras dat je gewoon moet proberen ook al lijkt het risico&apos;er.</p>
          <div className="byline-row">
            <div className="byline">
              <div className="avatar">J</div>
              <div className="who">
                <b>Joris van der Wal</b>
                <span>Hoofdtuinier, sinds 2018</span>
              </div>
            </div>
            <div className="meta">20 april 2026 · Rassen · 12 min</div>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 420, overflow: 'hidden', borderRadius: 0, marginTop: 24 }}>
            <Image
              src="https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=1200&h=420&fit=crop&auto=format&q=80"
              alt="Verschillende tomaten aan de plant"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
              priority
            />
          </div>
        </div>
      </section>

      <section className="article-body">
        <div className="wrap">
          <div className="grid">

            <aside className="toc" aria-label="Inhoudsopgave">
              <div className="lbl">Rassen</div>
              <ol>
                {RASSEN.map(r => (
                  <li key={r.num}><a href={`#ras-${r.num}`}>{r.naam}</a></li>
                ))}
              </ol>
            </aside>

            <article className="prose">
              <p>De tomatenwereld is overweldigend. Duizenden rassen, tientallen typen, en elke zaaicatalogus zegt dat zijn ras het beste is. Na acht seizoenen testen, op zand, klei, in potten en in de volle grond, zijn hier de tien die we zelf jaar na jaar opnieuw zaaien.</p>
              <p>Ze zijn gesorteerd van makkelijk naar uitdagender, niet van goed naar beter. Elk ras wint op zijn eigen vlak.</p>

              {RASSEN.map(r => (
                <div key={r.num} id={`ras-${r.num}`} style={{ borderTop: '1px solid var(--line)', paddingTop: 40, marginTop: 40 }}>
                  <h2><span className="num">Ras {r.num}</span>{r.naam}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px 24px', margin: '16px 0 20px', fontSize: 13 }}>
                    <div><span style={{ color: 'var(--muted)', display: 'block', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>Type</span><b>{r.type}</b></div>
                    <div><span style={{ color: 'var(--muted)', display: 'block', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>Oogst</span><b>{r.oogst}</b></div>
                    <div><span style={{ color: 'var(--muted)', display: 'block', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 2 }}>Smaak</span><b>{r.smaak}</b></div>
                  </div>
                  <p>{r.body}</p>
                </div>
              ))}

              <div style={{ borderTop: '1px solid var(--line)', paddingTop: 40, marginTop: 40 }}>
                <h2><span className="num">Tot slot</span>Hoe kies je?</h2>
                <p>Begin met één of twee rassen, niet tien. De verleiding is groot maar de aandacht is beperkt. Kies op basis van wat je wilt eten: voor salades en snacken, kies een cherry. Voor sauzen, een pruimtomaat. Voor iets bijzonders, Brandywine of Green Zebra.</p>
                <p>Koop waar mogelijk zaden van een gespecialiseerde tomatenkweker of biologische zaadfirma. De kwaliteit van het zaad bepaalt meer dan de grond.</p>
              </div>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                Getest in eigen tuin over meerdere seizoenen. Smaakbeschrijvingen zijn subjectief. Wil je advies voor jouw specifieke situatie? Vraag Moos.
              </p>
            </article>

            <aside className="aside" aria-label="Vergelijking">
              <div className="box">
                <div className="lbl">Voor beginners</div>
                <h5>Makkelijkste drie</h5>
                <div className="row"><span>Cherry</span><b>Gardeners&apos; Delight</b></div>
                <div className="row"><span>Klassiek</span><b>Moneymaker</b></div>
                <div className="row"><span>Productief</span><b>Sweet Million</b></div>
              </div>
              <div className="box">
                <div className="lbl">Voor smaak</div>
                <h5>Beste drie op smaak</h5>
                <div className="row"><span>#1</span><b>Brandywine</b></div>
                <div className="row"><span>#2</span><b>Sungold</b></div>
                <div className="row"><span>#3</span><b>Green Zebra</b></div>
              </div>
              <div className="box" style={{ background: 'var(--forest)', color: 'var(--paper)', borderColor: 'var(--forest)' }}>
                <div className="lbl" style={{ color: '#e8c896', borderColor: '#4a7040' }}>Welk ras past bij jou?</div>
                <h5 style={{ color: 'var(--paper)' }}>Vraag het aan <em>Moos.</em></h5>
                <p style={{ fontSize: 13, color: 'rgba(244,239,228,.75)', margin: '8px 0 12px', lineHeight: 1.5 }}>Beschrijf je situatie, pot of volle grond, zon of schaduw, en Moos geeft een persoonlijk advies.</p>
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
                <Image src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&h=450&fit=crop&auto=format&q=75" alt="Tomatenstokken plaatsen" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag">Methode</span><span className="meta">7 min · 28 apr</span></div>
              <h3>Tomatenstokken zetten <span className="it">zonder de wortels te raken</span></h3>
              <p className="excerpt">Wanneer, hoe diep, en de fout die de meeste tuiniers pas weken later ontdekken.</p>
              <Link href="/artikel/tomatenstokken" className="read">Lees verder →</Link>
            </article>
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&h=450&fit=crop&auto=format&q=75" alt="Tomatenproblemen diagnose" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag terra">Probleem</span><span className="meta">6 min · 10 mei</span></div>
              <h3>Wat is er mis met je tomaten? <span className="it">Zes diagnoses</span></h3>
              <p className="excerpt">Bruine blaadjes, krullende toppen, splijtende vruchten: hoe je weet wat er aan de hand is.</p>
              <Link href="/artikel/tomatenproblemen" className="read">Lees verder →</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
