import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Moestuin beginnen: complete gids voor beginners',
  description: 'Zo begin je een moestuin als beginner: de juiste plek, de beste groenten voor starters, grond voorbereiden en de vijf meest gemaakte fouten.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.moestuin.nl/artikel/moestuin-beginnen' },
  openGraph: {
    type: 'article',
    url: 'https://www.moestuin.nl/artikel/moestuin-beginnen',
    title: 'Moestuin beginnen: complete gids voor beginners | Moestuin.nl',
    description: 'De juiste plek, de beste groenten voor starters, grond voorbereiden en de vijf fouten die elke beginner maakt.',
    locale: 'nl_NL',
  },
}

const jsonLdArticle = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Moestuin beginnen: complete gids voor beginners',
  description: 'Zo begin je een moestuin als beginner: de juiste plek, de beste groenten voor starters, grond voorbereiden en de vijf meest gemaakte fouten.',
  author: { '@type': 'Person', name: 'Joris van der Wal' },
  publisher: { '@type': 'Organization', name: 'Moestuin.nl', url: 'https://www.moestuin.nl' },
  datePublished: '2026-05-18',
  dateModified: '2026-05-18',
  mainEntityOfPage: 'https://www.moestuin.nl/artikel/moestuin-beginnen',
}

const jsonLdFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Wanneer kan ik beginnen met een moestuin?',
      acceptedAnswer: { '@type': 'Answer', text: 'Je kunt het hele jaar beginnen met plannen en de grond voorbereiden. Zaaien en planten hangt af van het gewas: spinazie en radijs kunnen al in maart, tomaten en courgette pas na 10 mei als de nachtvorst voorbij is.' },
    },
    {
      '@type': 'Question',
      name: 'Welke groenten zijn het makkelijkst voor beginners?',
      acceptedAnswer: { '@type': 'Answer', text: 'Radijs, sla, spinazie, courgette en stambonen zijn de beste keuzes voor beginners. Ze groeien snel, vragen weinig aandacht en geven snel resultaat, wat motiveert om door te gaan.' },
    },
    {
      '@type': 'Question',
      name: 'Hoe groot moet een moestuin zijn voor beginners?',
      acceptedAnswer: { '@type': 'Answer', text: 'Begin klein: 4 tot 6 m² is genoeg voor een eerste seizoen. Dat is klein genoeg om bij te houden zonder overweldigd te raken, en groot genoeg om iets te oogsten. Je kunt altijd uitbreiden als je meer ervaring hebt.' },
    },
    {
      '@type': 'Question',
      name: 'Hoeveel zon heeft een moestuin nodig?',
      acceptedAnswer: { '@type': 'Answer', text: 'De meeste groenten hebben minimaal 6 uur directe zon per dag nodig. Tomaten, paprika en courgette willen het liefst 8 uur of meer. Bladgroenten zoals sla en spinazie redden het met 4 uur en groeien zelfs beter als ze middagschaduw hebben in de zomer.' },
    },
    {
      '@type': 'Question',
      name: 'Moet ik de grond omspaten voor een moestuin?',
      acceptedAnswer: { '@type': 'Answer', text: 'Eenmalig omspaten bij het aanleggen is nuttig om stenen en wortels te verwijderen en compost in te werken. Daarna is het beter om de grond zo min mogelijk te verstoren: de bodemstructuur en bodemleven worden daar beter van.' },
    },
  ],
}

const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.moestuin.nl/' },
    { '@type': 'ListItem', position: 2, name: 'Tuintips', item: 'https://www.moestuin.nl/artikel' },
    { '@type': 'ListItem', position: 3, name: 'Moestuin beginnen' },
  ],
}

export default function MoestuinBeginnersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

      <section className="article-hero">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Broodkruimelpad">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/artikel">Tuintips</Link>
            <span className="sep">/</span>
            <b>Moestuin beginnen</b>
          </nav>
          <div className="kicker-row">
            <span className="kicker">Gids · Beginners</span>
            <span className="meta">Bijgewerkt 18 mei 2026 · 14 min lezen</span>
          </div>
          <h1>Moestuin beginnen: <span className="it">de complete gids voor beginners.</span></h1>
          <p className="dek">Geen groene vingers nodig. Wel een goede plek, de juiste groenten en één cruciale les die de meeste beginners pas na het eerste mislukte seizoen leren. Dit is wat je moet weten voordat je een spade in de grond steekt.</p>
          <div className="byline-row">
            <div className="byline">
              <div className="avatar">J</div>
              <div className="who">
                <b>Joris van der Wal</b>
                <span>Hoofdtuinier, actief sinds 2018</span>
              </div>
            </div>
            <div className="meta">18 mei 2026 · Beginners · 14 min</div>
          </div>
          <div style={{ position: 'relative', width: '100%', height: 420, overflow: 'hidden', marginTop: 24 }}>
            <Image
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=420&fit=crop&auto=format&q=80"
              alt="Moestuin met verse groenten in moestuinbedden"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 60%' }}
              priority
            />
          </div>
        </div>
      </section>

      <nav className="article-index-bar" aria-label="Alle artikelen">
        <div className="wrap">
          <span className="article-index-bar__label">Alle artikelen</span>
          <div className="article-index-bar__links">
            <Link href="/artikel/tomaten-uitplanten">Tomaten uitplanten</Link>
            <span className="article-index-bar__current" aria-current="page">Moestuin beginnen</span>
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
                <li className="active"><a href="#plek">De juiste plek kiezen</a></li>
                <li><a href="#grootte">Hoe groot beginnen</a></li>
                <li><a href="#groenten">Beste groenten voor beginners</a></li>
                <li><a href="#grond">Grond voorbereiden</a></li>
                <li><a href="#zaaien">Zaaien of planten kopen</a></li>
                <li><a href="#planning">Planning per seizoen</a></li>
                <li><a href="#fouten">Vijf beginnerfouten</a></li>
                <li><a href="#faq">Veelgestelde vragen</a></li>
              </ol>
            </aside>

            <article className="prose">
              <p>Ieder jaar beginnen tienduizenden Nederlanders aan hun eerste moestuin. De helft geeft het op voor de zomer voorbij is. Niet omdat tuinieren moeilijk is, maar omdat ze te groot beginnen, de verkeerde plek kiezen of groenten kweken die te veel aandacht vragen. Dit gaat over hoe je het anders doet.</p>

              <h2 id="plek"><span className="num">Stap 01</span>De juiste plek kiezen: zon is alles</h2>
              <p>De locatie van je moestuin is de beslissing die alles bepaalt. Je kunt de beste zaden kopen, de rijkste grond aanleggen en zorgvuldig water geven, maar als de plek niet goed is, mislukt het toch. Het belangrijkste criterium is zon.</p>
              <p>De meeste groenten hebben minimaal <b>zes uur directe zon per dag</b> nodig. Tomaten, paprika, courgette en komkommer willen liefst acht uur of meer. Bladgroenten als sla, spinazie en kropsla redden het met vier uur, maar groeien in volle zomer juist beter met wat middag­schaduw.</p>

              <blockquote>Loop een dag langs je tuin en noteer hoe lang de zon op elke plek staat. Doe dit in mei of juni, niet in de winter, want de zonhoek is dan compleet anders.</blockquote>

              <p>Andere aandachtspunten voor de plek:</p>
              <ul>
                <li><b>Dicht bij de kraan.</b> Je gaat deze zomer meer water geven dan je denkt. Een slang van tien meter slepen elke avond is de snelste manier om je hobby te haten.</li>
                <li><b>Niet te dicht bij grote bomen.</b> Boomwortels zuigen vocht en voedingsstoffen weg, en de schaduw is meer dan je denkt.</li>
                <li><b>Beschut tegen wind.</b> Wind droogt de grond uit en beschadigt zachte stengels. Een heg of schuur aan de noordkant is een voordeel.</li>
                <li><b>Makkelijk te bereiken.</b> Als je er elke dag even langs wilt, moet het niet voelen als een expeditie.</li>
              </ul>

              <h2 id="grootte"><span className="num">Stap 02</span>Hoe groot beginnen, kleiner dan je denkt</h2>
              <p>Dit is waar de meeste beginners de mist ingaan: ze beginnen te groot. Een moestuin van twintig vierkante meter ziet er in april heerlijk overzichtelijk uit. In juli is het een onkruidjungle die elke avond twee uur werk vraagt.</p>

              <div className="pull">
                <div className="big">4 tot 6 m²</div>
                <div className="txt">is de ideale oppervlakte voor een eerste moestuin. Dat zijn twee tot drie bedden van 120 × 80 cm, genoeg om te leren, genoeg om te oogsten.</div>
              </div>

              <p>Begin met twee of drie compacte bedden. Een bed van 120 bij 80 centimeter is handig omdat je er aan alle kanten bij kunt zonder de grond in te lopen. Na één seizoen weet je hoeveel tijd en energie je er echt in wilt steken, en dan kun je altijd uitbreiden.</p>

              <h2 id="groenten"><span className="num">Stap 03</span>Welke groenten voor beginners</h2>
              <p>Niet alle groenten zijn even vergevingsgezind. Begin met gewassen die snel resultaat geven, weinig aandacht vragen en moeilijk te verpesten zijn. Dat motiveert om door te gaan.</p>

              <h3>De makkelijkste keuzes</h3>
              <ul>
                <li><b>Radijs:</b> klaar in drie tot vier weken. Perfecte eerste oogst. Zaai elke twee weken voor een doorlopende oogst.</li>
                <li><b>Sla en veldsla:</b> groeit snel, kan redelijk schaduw verdragen. Oogst blaadjes, laat de plant staan.</li>
                <li><b>Courgette:</b> één plant geeft de hele zomer meer courgettes dan je ooit op kunt. Serieus, begin met één plant.</li>
                <li><b>Stambonen:</b> zaai ze direct in de grond na 15 mei, ze groeien vanzelf. Geen stok nodig.</li>
                <li><b>Spinazie:</b> zaai vroeg (vanaf maart), oogst jong. Gaat in de zomer snel to zaad, maar zaai in september opnieuw voor een herfstoogst.</li>
                <li><b>Bieslook:</b> plant het één keer en het komt elk jaar terug. Knippen, gebruiken, groeien.</li>
              </ul>

              <h3>Eén ambitieuze groente: de tomaat</h3>
              <p>Bijna elke beginner wil tomaten. Dat begrijpen we. Tomaten zijn heerlijk en de voldoening van je eerste zelfgekweekte tomaat is ongeëvenaard. Maar ze vragen meer: afharden, dieven uitbreken, water­beheer, steun. Neem er één of twee planten bij als experiment naast je makkelijke gewassen, niet als je hoofdgewas.</p>

              <h2 id="grond"><span className="num">Stap 04</span>De grond voorbereiden</h2>
              <p>Goede grond is de basis van alles. De meeste beginners schieten hier tekort: ze graven wat om, gooien wat potgrond bovenop en hopen het beste. Dat werkt, maar niet goed.</p>

              <p>Wat werkt wél:</p>
              <ul>
                <li><b>Eenmalig diep omspaten</b> (30 tot 40 cm) bij het aanleggen. Verwijder stenen, wortels en oud gras. Daarna liever zo min mogelijk verstoren.</li>
                <li><b>Compost toevoegen</b>: een laag van vijf tot tien centimeter compost doorwerken verbetert elke grondsoort. Zandgrond houdt beter vocht vast, kleigrond wordt losser.</li>
                <li><b>Geen turf of kokosvezel</b>: ze houden vocht vast maar voegen geen voedingsstoffen toe en verslechteren de bodemstructuur op de lange termijn.</li>
                <li><b>Bodembedekking</b>: leg stro, grasmaaisel of houtsnippers tussen je planten. Dat houdt vocht vast, onderdrukt onkruid en voedt het bodemleven.</li>
              </ul>

              <blockquote>Grond verbeteren is de beste investering die je kunt doen. Niet zaden, niet tools: grond.</blockquote>

              <h2 id="zaaien"><span className="num">Stap 05</span>Zaaien of planten kopen</h2>
              <p>Voor je eerste seizoen is het antwoord simpel: <b>koop plantjes</b> voor de lastige gewassen en zaai alleen de makkelijke direct in de grond.</p>

              <p>Plantjes kopen is duurder maar vergeeft fouten. Als jij je tomatenplantje te vroeg buiten zet, gaat het maar één plant mis. Als je zelf zaait en iets fout gaat, ben je vier weken kwijt. Koop tomaten, paprika en courgette als plant. Zaai radijs, sla, spinazie en bonen direct.</p>

              <p>Zaaien vanuit huis (vooruit zaaien) heeft zin voor tomaten en paprika als je een lichte plek binnenshuis hebt: vensterbank of serre. Zaai dan in februari tot maart, zodat je in mei stevige planten hebt. Zonder lichte plek: koop plantjes.</p>

              <h2 id="planning"><span className="num">Stap 06</span>Planning per seizoen</h2>

              <h3>Voorjaar (maart tot april)</h3>
              <ul>
                <li>Grond omspaten en compost toevoegen</li>
                <li>Zaaien: spinazie, veldsla, radijs, peterselie (buiten)</li>
                <li>Binnenshuis vooruit zaaien: tomaat, paprika</li>
              </ul>

              <h3>Vroege zomer (mei)</h3>
              <ul>
                <li>Na 10 mei: tomaten en courgette uitplanten</li>
                <li>Stambonen zaaien (direct in de grond)</li>
                <li>Sla en radijs blijven zaaien, elke twee weken</li>
                <li>Beginnen met water geven en bijhouden</li>
              </ul>

              <h3>Zomer (juni tot augustus)</h3>
              <ul>
                <li>Regelmatig oogsten: hoe meer je plukt, hoe meer er groeit</li>
                <li>Tomaten dieven uitbreken en bijbemesten</li>
                <li>Courgette niet te lang laten hangen</li>
                <li>Onkruid bijhouden, bij voorkeur na regen</li>
              </ul>

              <h3>Herfst (september tot oktober)</h3>
              <ul>
                <li>Spinazie en veldsla opnieuw zaaien voor herfstoogst</li>
                <li>Bodem afdekken met compost na het ruimen van de bedden</li>
                <li>Notities maken: wat werkte, wat niet, wat je volgend jaar anders wil</li>
              </ul>

              <h2 id="fouten"><span className="num">Stap 07</span>De vijf meest gemaakte beginnerfouten</h2>

              <ul>
                <li><b>Te groot beginnen.</b> Je verliest het overzicht en de motivatie. Begin met 4 tot 6 m².</li>
                <li><b>Onvoldoende zon.</b> Vier uur zon geeft een halfslachtige oogst. Zes tot acht uur geeft een echte oogst.</li>
                <li><b>Te weinig of te veel water geven.</b> Elke dag een beetje water is slechter dan twee keer per week diep water geven. Oppervlakkig water geven kweekt oppervlakkige wortels.</li>
                <li><b>Onkruid laten staan.</b> Onkruid concurreert om vocht en voedingsstoffen. Tien minuten per week bijhouden is beter dan één uur per maand inhalen.</li>
                <li><b>Te veel tegelijk willen.</b> Tien soorten groenten in je eerste seizoen leidt tot chaos. Kies vier tot zes soorten en leer die goed kennen.</li>
              </ul>

              <h2 id="faq">Veelgestelde vragen</h2>

              <h3>Kan ik een moestuin beginnen zonder tuin?</h3>
              <p>Ja. Een balkon van twee vierkante meter is genoeg voor sla, kruiden, radijs en zelfs één tomatenpakket in een grote pot. Gebruik goede potgrond gemengd met compost, kies compacte rassen en water geef je vaker dan in de volle grond.</p>

              <h3>Hoe voorkom ik slakken?</h3>
              <p>Slakkenkragen om jonge plantjes, aaltjes (<em>Phasmarhabditis</em>) in natte perioden, koffiepads rondom de bedden. IJzerfosfaatkorrels zijn toegestaan in de biologische teelt en effectief zonder gevaar voor andere dieren.</p>

              <h3>Moet ik bemesten, en waarmee?</h3>
              <p>Ja, maar niet overdreven. Compost bij het begin van het seizoen is de basis. Tomaten en courgettes bijmesten met een vloeibare tomatenmest elke twee weken vanaf juni. Bladgroenten hebben nauwelijks extra bemesting nodig als de grond goed is.</p>

              <h3>Wat doe ik als er iets mis gaat?</h3>
              <p>Stel je vraag aan <Link href="/">Moos, de gratis AI moestuincoach</Link>. Beschrijf wat je ziet, zoals gele blaadjes, bruine vlekken of krullende bladeren, en je krijgt binnen seconden een diagnose.</p>

              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
                Dit artikel is onderdeel van de beginnersgidsen van Moestuin.nl. Alle adviezen zijn gebaseerd op eigen ervaring en getoetst aan gangbare tuiniersliteratuur.
              </p>
            </article>

            <aside className="aside" aria-label="Samenvatting">
              <div className="box">
                <div className="lbl">Snel aan de slag</div>
                <h5>Moestuin beginnen, checklist</h5>
                <div className="row"><span>Oppervlakte</span><b>4 tot 6 m²</b></div>
                <div className="row"><span>Zon minimaal</span><b>6 uur/dag</b></div>
                <div className="row"><span>Grond</span><b>+ compost</b></div>
                <div className="row"><span>Begin met</span><b>4 tot 6 soorten</b></div>
                <div className="row"><span>Eerste oogst</span><b>3 tot 4 weken</b></div>
                <div className="row"><span>Moeilijkheid</span><b>★☆☆☆☆</b></div>
              </div>
              <div className="box">
                <div className="lbl">Makkelijkste keuzes</div>
                <h5>Groenten voor beginners</h5>
                <div className="row"><span>Radijs</span><b>3 tot 4 wk</b></div>
                <div className="row"><span>Sla</span><b>5 tot 6 wk</b></div>
                <div className="row"><span>Spinazie</span><b>5 tot 8 wk</b></div>
                <div className="row"><span>Courgette</span><b>8 tot 10 wk</b></div>
                <div className="row"><span>Stamboon</span><b>8 tot 10 wk</b></div>
              </div>
              <div className="box" style={{ background: 'var(--forest)', color: 'var(--paper)', borderColor: 'var(--forest)' }}>
                <div className="lbl" style={{ color: '#e8c896', borderColor: '#4a7040' }}>Gratis hulp</div>
                <h5 style={{ color: 'var(--paper)' }}>Vraag het aan <em>Moos.</em></h5>
                <p style={{ fontSize: 13, color: 'rgba(244,239,228,.75)', margin: '8px 0 12px', lineHeight: 1.5 }}>Gaat er iets mis? Moos diagnosticeert je probleem in gewoon Nederlands, geen account nodig.</p>
                <Link href="/" style={{ display: 'inline-block', background: 'var(--terracotta)', color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', padding: '10px 14px', textDecoration: 'none' }}>Stel je vraag →</Link>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <section className="related-strip" aria-label="Gerelateerde artikelen">
        <div className="wrap">
          <div className="section-head" style={{ borderBottomColor: 'var(--ink)', marginBottom: 40 }}>
            <h2>Lees <span className="it">verder</span></h2>
            <p className="intro">Ga dieper in op specifieke gewassen.</p>
            <Link className="link" href="/artikel">Alle tuintips →</Link>
          </div>
          <div className="row">
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=600&h=450&fit=crop&auto=format&q=75" alt="Tomatenstokken" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag">Methode</span><span className="meta">7 min</span></div>
              <h3>Tomatenstokken zetten <span className="it">zonder de wortels te raken</span></h3>
              <p className="excerpt">De stok plaatsen ná het uitplanten is de meest gemaakte fout. Hier is wanneer je het doet en hoe.</p>
              <Link href="/artikel/tomatenstokken" className="read">Lees verder →</Link>
            </article>
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1686278895718-26a2331d7297?w=600&h=450&fit=crop&auto=format&q=75" alt="Tomatenproblemen" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag terra">Probleem</span><span className="meta">6 min</span></div>
              <h3>Wat is er mis met je tomaten? <span className="it">Zes diagnoses</span></h3>
              <p className="excerpt">Bruine blaadjes, krullende toppen, splijtende vruchten: hoe je weet wat er aan de hand is.</p>
              <Link href="/artikel/tomatenproblemen" className="read">Lees verder →</Link>
            </article>
            <article className="article-card">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', overflow: 'hidden' }}>
                <Image src="https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=600&h=450&fit=crop&auto=format&q=75" alt="Zaaikalender" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="meta-row"><span className="tag">Gids</span><span className="meta">Interactief</span></div>
              <h3>Zaaikalender <span className="it">per maand en gewas</span></h3>
              <p className="excerpt">Wanneer je wat kunt zaaien en planten, overzichtelijk per maand weergegeven.</p>
              <Link href="/zaaikalender" className="read">Bekijk kalender →</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
