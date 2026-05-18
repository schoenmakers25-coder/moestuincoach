import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Wat is er mis met je tomaten? Zes diagnoses',
  description: 'Gele bladeren, splijtende vruchten, bruine vlekken — zes veelvoorkomende tomatenproblemen uitgelegd en opgelost.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/artikel/tomatenproblemen' },
  openGraph: {
    type: 'article',
    url: 'https://www.moestuin.nl/artikel/tomatenproblemen',
    title: 'Wat is er mis met je tomaten? Zes diagnoses — Moestuin.nl',
    description: 'Gele bladeren, splijtende vruchten, bruine vlekken — uitgelegd en opgelost.',
    locale: 'nl_NL',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Wat is er mis met je tomaten? Zes diagnoses',
  description: 'Gele bladeren, splijtende vruchten, bruine vlekken — zes veelvoorkomende tomatenproblemen uitgelegd en opgelost.',
  author: { '@type': 'Person', name: 'Joris van der Wal' },
  publisher: { '@type': 'Organization', name: 'Moestuin.nl', url: 'https://www.moestuin.nl' },
  datePublished: '2026-05-10',
  dateModified: '2026-05-10',
}

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.moestuin.nl/' },
    { '@type': 'ListItem', position: 2, name: 'Tuintips', item: 'https://www.moestuin.nl/artikel' },
    { '@type': 'ListItem', position: 3, name: 'Tomatenproblemen: zes diagnoses' },
  ],
}

export default function TomatenproblemenPage() {
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
            <b>Tomatenproblemen</b>
          </nav>
          <div className="kicker-row">
            <span className="kicker">Diagnose · Tomaat #05</span>
            <span className="meta">Bijgewerkt 10 mei 2026 · 6 min lezen</span>
          </div>
          <h1>Wat is er mis met je tomaten? <span className="it">Zes diagnoses.</span></h1>
          <p className="dek">Bruine vlekken, gele blaadjes, vruchten die splijten halverwege de zomer — elke klacht heeft een oorzaak, en elke oorzaak heeft een oplossing. Hier zijn de zes meest voorkomende, met wat je er aan doet.</p>
          <div className="byline-row">
            <div className="byline">
              <div className="avatar">J</div>
              <div className="who">
                <b>Joris van der Wal</b>
                <span>Hoofdtuinier — sinds 2018</span>
              </div>
            </div>
            <div className="meta">10 mei 2026 · Diagnose · 6 min</div>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 420, overflow: 'hidden', borderRadius: 0, marginTop: 24 }}>
            <Image
              src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=1200&h=420&fit=crop&auto=format&q=80"
              alt="Close-up van tomatenplant"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
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
                <li className="active"><a href="#geel">Gele bladeren</a></li>
                <li><a href="#ber">Zwarte bodem vrucht</a></li>
                <li><a href="#splijt">Splijtende vruchten</a></li>
                <li><a href="#bruin">Bruine vlekken</a></li>
                <li><a href="#krul">Krullende bladeren</a></li>
                <li><a href="#bloem">Bloemknopval</a></li>
              </ol>
            </aside>

            <article className="prose">
              <p>Tomaten zijn eerlijk. Ze laten precies zien wat er mis is — als je weet waar je op moet letten. Het probleem is dat veel klachten er hetzelfde uitzien maar een andere oorzaak hebben. Gele bladeren kunnen vijf dingen betekenen. Hier is een praktische diagnosegids, van meest naar minst voorkomend.</p>

              <h2 id="geel"><span className="num">Diagnose 01</span>Gele bladeren — maar welke en waar?</h2>
              <p>Geel is geen diagnose — het is een symptoom. De plek op de plant bepaalt de oorzaak:</p>
              <ul>
                <li><b>Onderste blaadjes worden geel</b> → normaal. De plant gooit oude bladeren overboord als hij groeit. Geen actie nodig, tenzij het snel omhoog trekt.</li>
                <li><b>Geel met groene nerven, middelste bladeren</b> → magnesiumtekort. Geef een handje bitterzout (magnesiumsulfaat) opgelost in water, direct aan de grond.</li>
                <li><b>Geheel geel, bovenkant van de plant</b> → stikstoftekort. Bemest met een snelwerkende vloeibare meststof. Check ook of de grond niet te nat is — uitgespoelde stikstof in te natte grond is een veelgemaakte oorzaak.</li>
                <li><b>Geel met bruine randjes</b> → kaliumtekort. Tomaten zijn verslaafd aan kalium. Geef tomatenmest met een hoog K-gehalte.</li>
              </ul>

              <blockquote>Bij twijfel: controleer altijd eerst de watergift. Zowel te droog als te nat leidt tot vergelijkbare geelverkleuring.</blockquote>

              <h2 id="ber"><span className="num">Diagnose 02</span>Zwarte, ingezonken bodem aan de vrucht</h2>
              <p>Dit heet bloemkelknecrose (BER — Blossom End Rot). Het ziet eruit als een bruine, leerachtige vlek aan de onderkant van de vrucht. Het is geen schimmel en geen ziekte — het is een calciumprobleem.</p>
              <p>De meeste tuiniergronden hebben genoeg calcium. Het échte probleem is dat de plant het calcium niet kan opnemen: te droge grond, te onregelmatige watertoevoer, of een te hoge EC-waarde door te veel bemesting. Oplossing: regelmatiger water geven (liever een dag op dag af dan eens per week veel), en stop even met bemesten. Je kunt ook calciumnectar spuiten op de vruchten als noodmaatregel.</p>

              <div className="pull">
                <div className="big">BER</div>
                <div className="txt">treft tot 30% van de vruchten als de watertoevoer onregelmatig is — zelfs bij grond met ruim voldoende calcium.</div>
              </div>

              <h2 id="splijt"><span className="num">Diagnose 03</span>Splijtende vruchten</h2>
              <p>Bijna rijpe tomaten die plotseling opensplijten — dit is het meest frustrerende tomatenprobleem. De oorzaak: na een droge periode plotseling veel water geven. De vrucht groeit in een paar dagen snel op van binnenuit terwijl de schil dat tempo niet bij kan houden. Dan scheurt de schil.</p>
              <p>Preventie is simpel maar vraagt discipline: regelmatig water geven, ook als het bewolkt is. Mulch op de grond helpt de vochtspanning stabiel te houden. Als het al te laat is en de vruchten splijten, oogst dan snel — ze kunnen nog rijpen op het aanrecht.</p>

              <h2 id="bruin"><span className="num">Diagnose 04</span>Bruine vlekken op bladeren</h2>
              <p>Twee schuldigen, beide gevaarlijk:</p>
              <ul>
                <li><b>Phytophthora infestans (aardappelplaag)</b> — donkerbruine, natte vlekken op bladeren en stengels, die snel groter worden. In natte zomers kan dit een hele plant in een week vernietigen. Verwijder aangetaste bladeren direct en verbrand ze (nooit composteren). Behandel preventief met kopermiddelen als het nat weer voorspeld is.</li>
                <li><b>Alternaria (vroegvlekkenziekte)</b> — kleine bruine vlekken met gele rand, beginnen onderaan. Minder agressief. Verwijder aangetaste bladeren, zorg voor betere luchtcirculatie door overmatig blad weg te knippen.</li>
              </ul>
              <p>Vuistregel: vochtige, koele zomers → Phytophthora-risico hoog. Hete, droge periodes afgewisseld met buien → Alternaria. In beide gevallen: nooit water geven op de bladeren.</p>

              <h2 id="krul"><span className="num">Diagnose 05</span>Krullende bladeren</h2>
              <p>Als de bovenste blaadjes naar binnen krullen: dit is vaak gewoon hittestress. De plant beschermt zijn bladeren tegen verdamping. Bij temperaturen boven 30°C is dit normaal en tijdelijk. Geef water aan de voet en wacht tot het koeler wordt.</p>
              <p>Als de blaadjes ook verkleuren of ingedroogd aanvoelen: kijk naar virussen (mozaïekvirus, bladrolziekte). Virussen worden overgedragen door bladluizen. Bestrijden: bladluizen aanpakken met insectenzeep, aangetaste planten verwijderen als het ernstig is.</p>

              <h2 id="bloem"><span className="num">Diagnose 06</span>Bloemknopval — bloemen die afvallen voor de vrucht</h2>
              <p>De plant maakt bloemen aan maar ze vallen af voordat er vruchten vormen. Oorzaken:</p>
              <ul>
                <li>Nachttemperatuur onder 10°C of boven 32°C — buiten de grens voor bestuiving</li>
                <li>Te lage luchtvochtigheid — stuifmeel plakt dan vast aan de meeldraden</li>
                <li>Te weinig licht — de plant gooit bloemen overboord als energiebesparing</li>
                <li>Overmatige stikstofbemesting — de plant maakt dan blad in plaats van vrucht</li>
              </ul>
              <p>In de meeste gevallen lost het zichzelf op als het weer stabiel wordt. Zet de planten op een plek met meer zon, stop tijdelijk met stikstofmest, en wacht.</p>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                Diagnoses gebaseerd op praktijkervaring en WUR-richtlijnen voor tomatenteelt. Heb je twijfel? Stuur een foto naar Moos — de AI coach helpt je snel verder.
              </p>
            </article>

            <aside className="aside" aria-label="Samenvatting">
              <div className="box">
                <div className="lbl">Snelle diagnose</div>
                <h5>Tomatenproblemen</h5>
                <div className="row"><span>Gele bladeren</span><b>Voedingstekort</b></div>
                <div className="row"><span>Zwarte bodem</span><b>Calcium/water</b></div>
                <div className="row"><span>Splijten</span><b>Onregelm. water</b></div>
                <div className="row"><span>Bruine vlekken</span><b>Phytophthora</b></div>
                <div className="row"><span>Krullende top</span><b>Hitte/virus</b></div>
                <div className="row"><span>Bloemval</span><b>Temperatuur/N</b></div>
              </div>
              <div className="box" style={{ background: 'var(--forest)', color: 'var(--paper)', borderColor: 'var(--forest)' }}>
                <div className="lbl" style={{ color: '#e8c896', borderColor: '#4a7040' }}>Stel het aan Moos</div>
                <h5 style={{ color: 'var(--paper)' }}>Foto kunnen sturen? <em>Beschrijf het aan Moos.</em></h5>
                <p style={{ fontSize: 13, color: 'rgba(244,239,228,.75)', margin: '8px 0 12px', lineHeight: 1.5 }}>Beschrijf wat je ziet en Moos stelt de juiste vragen om de oorzaak te achterhalen.</p>
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
