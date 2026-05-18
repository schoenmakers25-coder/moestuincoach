'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Verified photo URLs per crop (Unsplash free CDN + Pexels where needed)
const CROP_PHOTOS = {
  'Tomaat':       'https://images.unsplash.com/photo-1592841200221-a6898f307baa',
  'Aardappel':    'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2',
  'Courgette':    'https://images.unsplash.com/photo-1691480291894-75229c2bfd44',
  'Komkommer':    'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6',
  'Paprika':      'https://images.unsplash.com/photo-1560781290-7dc94c0f8f4f',
  'Aubergine':    'https://images.unsplash.com/photo-1659260180173-8d58b38648f8',
  'Wortel':       'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
  'Sla':          'https://images.unsplash.com/photo-1723110569402-6eec857daa4d',
  'Kropsla':      'https://images.unsplash.com/photo-1723110569402-6eec857daa4d',
  'Andijvie':     'https://images.unsplash.com/photo-1778868001861-bfa063aa0784',
  'Spinazie':     'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
  'Biet':         'https://images.pexels.com/photos/244394/pexels-photo-244394.jpeg',
  'Ui':           'https://images.unsplash.com/photo-1508747703725-719777637510',
  'Knoflook':     'https://images.unsplash.com/photo-1501646344842-51f0e1e3aaeb',
  'Prei':         'https://images.unsplash.com/photo-1615485499978-1279c3d6302f',
  'Bloemkool':    'https://images.unsplash.com/photo-1566842600175-97dca489844f',
  'Broccoli':     'https://images.unsplash.com/photo-1685504445355-0e7bdf90d415',
  'Boerenkool':   'https://images.unsplash.com/photo-1708093195058-07144ccd40ac',
  'Pompoen':      'https://images.unsplash.com/photo-1570586437263-ab629fccc818',
  'Mais':         'https://images.unsplash.com/photo-1649251037566-6881b4956615',
  'Erwt':         'https://images.unsplash.com/photo-1592394533824-9440e5d68530',
  'Basilicum':    'https://images.unsplash.com/photo-1629157247277-48f870757026',
  'Peterselie':   'https://images.unsplash.com/photo-1524593985013-50293eff52f8',
  'Dille':        'https://images.pexels.com/photos/14646104/pexels-photo-14646104.jpeg',
  'Bieslook':     'https://images.pexels.com/photos/533297/pexels-photo-533297.jpeg',
  'Tijm':         'https://images.unsplash.com/photo-1597345637402-fe72daf6be20',
  'Koriander':    'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e',
  'Radijs':       'https://images.unsplash.com/photo-1504945005722-33670dcaf685',
  'Sperziebonen': 'https://images.unsplash.com/photo-1574963835594-61eede2070dc',
  'Stamboon':     'https://images.unsplash.com/photo-1574963835594-61eede2070dc',
  'Tuinboon':     'https://images.unsplash.com/photo-1563746924237-b97dab9e8dc9',
}

function cropPhotoUrl(name) {
  const url = CROP_PHOTOS[name]
  if (!url) return `https://picsum.photos/seed/${encodeURIComponent(name)}/400/250`
  if (url.includes('pexels.com')) return `${url}?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop`
  return `${url}?w=400&h=250&fit=crop&auto=format&q=75`
}

const PHASES = {
  i: 'zaai-in',
  o: 'zaai-out',
  p: 'planten',
  h: 'oogst',
}

const MONTH_NAMES = ['jan','feb','mrt','apr','mei','jun','jul','aug','sep','okt','nov','dec']
const MONTH_NAMES_FULL = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december']

const CROPS = [
  { name: 'Aardappel',    lat: 'Solanum tuberosum',       cat: 'groente', months: { 3:'p', 4:'p', 7:'h', 8:'h', 9:'h', 10:'h' } },
  { name: 'Andijvie',     lat: 'Cichorium endivia',       cat: 'groente', months: { 4:'i', 5:'ip', 6:'op', 7:'oph', 8:'oh', 9:'h', 10:'h' } },
  { name: 'Aubergine',    lat: 'Solanum melongena',       cat: 'vrucht',  months: { 2:'i', 3:'i', 4:'i', 5:'p', 6:'p', 7:'h', 8:'h', 9:'h' } },
  { name: 'Basilicum',    lat: 'Ocimum basilicum',        cat: 'kruid',   months: { 3:'i', 4:'i', 5:'ip', 6:'oph', 7:'oh', 8:'oh', 9:'oh', 10:'h' } },
  { name: 'Biet',         lat: 'Beta vulgaris',           cat: 'groente', months: { 4:'o', 5:'o', 6:'o', 7:'oh', 8:'h', 9:'h', 10:'h' } },
  { name: 'Bieslook',     lat: 'Allium schoenoprasum',    cat: 'kruid',   months: { 3:'op', 4:'oph', 5:'oh', 6:'h', 7:'h', 8:'h', 9:'h', 10:'h' } },
  { name: 'Bloemkool',    lat: 'Brassica oleracea',       cat: 'groente', months: { 3:'i', 4:'ip', 5:'p', 6:'p', 7:'h', 8:'h', 9:'h', 10:'h' } },
  { name: 'Boerenkool',   lat: 'Brassica oleracea',       cat: 'groente', months: { 4:'i', 5:'i', 6:'p', 7:'p', 11:'h', 12:'h', 1:'h', 2:'h' } },
  { name: 'Broccoli',     lat: 'Brassica oleracea',       cat: 'groente', months: { 3:'i', 4:'i', 5:'p', 6:'p', 7:'h', 8:'h', 9:'h', 10:'h' } },
  { name: 'Courgette',    lat: 'Cucurbita pepo',          cat: 'vrucht',  months: { 4:'i', 5:'op', 6:'op', 7:'h', 8:'h', 9:'h', 10:'h' } },
  { name: 'Dille',        lat: 'Anethum graveolens',      cat: 'kruid',   months: { 4:'o', 5:'oh', 6:'oh', 7:'oh', 8:'oh', 9:'h' } },
  { name: 'Erwt',         lat: 'Pisum sativum',           cat: 'groente', months: { 3:'o', 4:'o', 5:'o', 6:'oh', 7:'h', 8:'h' } },
  { name: 'Knoflook',     lat: 'Allium sativum',          cat: 'groente', months: { 10:'p', 11:'p', 6:'h', 7:'h', 8:'h' } },
  { name: 'Komkommer',    lat: 'Cucumis sativus',         cat: 'vrucht',  months: { 4:'i', 5:'ip', 6:'p', 7:'h', 8:'h', 9:'h', 10:'h' } },
  { name: 'Koriander',    lat: 'Coriandrum sativum',      cat: 'kruid',   months: { 3:'o', 4:'oh', 5:'oh', 6:'oh', 7:'oh', 8:'oh', 9:'h' } },
  { name: 'Kropsla',      lat: 'Lactuca sativa',          cat: 'groente', months: { 2:'i', 3:'io', 4:'iop', 5:'opH', 6:'oph', 7:'oph', 8:'oph', 9:'oph', 10:'h' } },
  { name: 'Mais',         lat: 'Zea mays',                cat: 'vrucht',  months: { 4:'i', 5:'op', 6:'op', 8:'h', 9:'h', 10:'h' } },
  { name: 'Paprika',      lat: 'Capsicum annuum',         cat: 'vrucht',  months: { 2:'i', 3:'i', 4:'i', 5:'p', 6:'p', 7:'h', 8:'h', 9:'h', 10:'h' } },
  { name: 'Peterselie',   lat: 'Petroselinum crispum',    cat: 'kruid',   months: { 3:'o', 4:'o', 5:'oh', 6:'oh', 7:'oh', 8:'oh', 9:'oh', 10:'h' } },
  { name: 'Pompoen',      lat: 'Cucurbita maxima',        cat: 'vrucht',  months: { 4:'i', 5:'op', 6:'p', 9:'h', 10:'h', 11:'h' } },
  { name: 'Prei',         lat: 'Allium porrum',           cat: 'groente', months: { 3:'i', 4:'i', 5:'i', 6:'p', 7:'p', 9:'h', 10:'h', 11:'h', 12:'h', 1:'h', 2:'h' } },
  { name: 'Rabarber',     lat: 'Rheum rhabarbarum',       cat: 'groente', months: { 3:'p', 4:'h', 5:'h', 6:'h', 7:'h' } },
  { name: 'Radijs',       lat: 'Raphanus sativus',        cat: 'groente', months: { 3:'o', 4:'oh', 5:'oh', 6:'oh', 7:'oh', 8:'oh', 9:'oh', 10:'h' } },
  { name: 'Rode kool',    lat: 'Brassica oleracea',       cat: 'groente', months: { 3:'i', 4:'i', 5:'p', 6:'p', 9:'h', 10:'h', 11:'h' } },
  { name: 'Snijbiet',     lat: 'Beta vulgaris cicla',     cat: 'groente', months: { 3:'o', 4:'o', 5:'o', 6:'oh', 7:'oh', 8:'oh', 9:'oh', 10:'h' } },
  { name: 'Sperziebonen', lat: 'Phaseolus vulgaris',      cat: 'groente', months: { 5:'o', 6:'o', 7:'oh', 8:'oh', 9:'h', 10:'h' } },
  { name: 'Spinazie',     lat: 'Spinacia oleracea',       cat: 'groente', months: { 3:'o', 4:'oh', 5:'oh', 6:'h', 8:'o', 9:'oh', 10:'h' } },
  { name: 'Spruitjes',    lat: 'Brassica oleracea',       cat: 'groente', months: { 3:'i', 4:'ip', 5:'p', 6:'p', 10:'h', 11:'h', 12:'h', 1:'h' } },
  { name: 'Stamboon',     lat: 'Phaseolus vulgaris',      cat: 'groente', months: { 5:'o', 6:'o', 7:'h', 8:'h', 9:'h' } },
  { name: 'Tijm',         lat: 'Thymus vulgaris',         cat: 'kruid',   months: { 4:'ip', 5:'ph', 6:'h', 7:'h', 8:'h', 9:'h', 10:'h' } },
  { name: 'Tomaat',       lat: 'Solanum lycopersicum',    cat: 'vrucht',  months: { 2:'i', 3:'i', 4:'i', 5:'p', 6:'p', 7:'h', 8:'h', 9:'h', 10:'h' } },
  { name: 'Tuinboon',     lat: 'Vicia faba',              cat: 'groente', months: { 2:'o', 3:'o', 4:'o', 6:'h', 7:'h', 8:'h' } },
  { name: 'Ui',           lat: 'Allium cepa',             cat: 'groente', months: { 3:'op', 4:'op', 7:'h', 8:'h', 9:'h' } },
  { name: 'Veldsla',      lat: 'Valerianella locusta',    cat: 'groente', months: { 3:'oh', 4:'oh', 5:'h', 8:'o', 9:'oh', 10:'oh', 11:'h', 12:'h', 1:'h', 2:'h' } },
  { name: 'Witlof',       lat: 'Cichorium intybus',       cat: 'groente', months: { 5:'o', 6:'o', 11:'ph', 12:'ph', 1:'ph', 2:'ph' } },
  { name: 'Wortel',       lat: 'Daucus carota',           cat: 'groente', months: { 3:'o', 4:'o', 5:'o', 6:'o', 7:'oh', 8:'oh', 9:'oh', 10:'h', 11:'h' } },
]

function phaseLabel(code) {
  return { i: 'Binnen voorzaaien', o: 'Buiten zaaien', p: 'Uitplanten', h: 'Oogsten' }[code] || ''
}

function primaryAction(codes, month) {
  const c = codes.toLowerCase()
  if (c.includes('o')) return 'Direct buiten zaaien'
  if (c.includes('i')) return 'Binnen voorzaaien'
  if (c.includes('p')) return 'Uitplanten'
  return 'Oogsten'
}

export default function ZaaikalenderContent() {
  const nowMonth = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState(nowMonth)
  const [filter, setFilter] = useState('all')

  const filtered = CROPS.filter(c => filter === 'all' || c.cat === filter)
  const nowCrops = filtered.filter(c => c.months[selectedMonth])

  return (
    <>
      <section className="cal-hero">
        <div className="wrap">
          <nav className="breadcrumb" style={{ marginBottom: 32 }} aria-label="Broodkruimelpad">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <b>Zaaikalender</b>
          </nav>
          <h1>De <span className="it">zaai-</span><br />kalender, <span className="it">2026.</span></h1>
          <div className="row">
            <p className="lead">
              Zesendertig groenten, kruiden en vruchten — voor elke maand een blik op
              wat er onder de grond, in de bak of in de pot moet.
              Selecteer een maand om alleen het seizoenswerk te zien, of filter op categorie.
            </p>
            <div className="legend" aria-label="Legenda">
              <div><span className="sw sw-zaai-in" aria-hidden="true"></span>Binnen voorzaaien</div>
              <div><span className="sw sw-zaai-out" aria-hidden="true"></span>Buiten zaaien</div>
              <div><span className="sw sw-planten" aria-hidden="true"></span>Uitplanten</div>
              <div><span className="sw sw-oogst" aria-hidden="true"></span>Oogsten</div>
            </div>
          </div>
        </div>
      </section>

      <nav className="month-nav" aria-label="Maandfilter">
        <div className="wrap">
          <div className="row">
            <div className="months" role="group" aria-label="Selecteer maand">
              {MONTH_NAMES.map((name, i) => {
                const m = i + 1
                return (
                  <button
                    key={m}
                    data-m={m}
                    aria-pressed={selectedMonth === m}
                    className={selectedMonth === m ? 'active' : ''}
                    onClick={() => setSelectedMonth(m)}
                  >
                    {name[0].toUpperCase() + name.slice(1, 3)}
                  </button>
                )
              })}
            </div>
            <div className="filter" role="group" aria-label="Categorie filter">
              {[
                { key: 'all',     label: 'Alles' },
                { key: 'groente', label: 'Groente' },
                { key: 'kruid',   label: 'Kruiden' },
                { key: 'vrucht',  label: 'Vruchten' },
              ].map(f => (
                <button
                  key={f.key}
                  data-c={f.key}
                  aria-pressed={filter === f.key}
                  className={filter === f.key ? 'active' : ''}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section className="now-section" aria-labelledby="now-heading">
        <div className="wrap">
          <div className="section-head" style={{ borderBottomColor: 'var(--ink)', marginBottom: 32 }}>
            <h2 id="now-heading">
              Nu in <span className="it">{MONTH_NAMES_FULL[selectedMonth - 1]}</span> · {nowCrops.length} gewassen
            </h2>
            <p className="intro">Wat je deze maand kunt zaaien, uitplanten of oogsten.</p>
            <a className="link" href="#" onClick={e => { e.preventDefault(); window.print() }}>Print deze maand →</a>
          </div>
          <div className="crop-grid" aria-live="polite">
            {nowCrops.slice(0, 12).map((c, i) => {
              const codes = c.months[selectedMonth] || ''
              const action = primaryAction(codes, selectedMonth)
              const variant = i % 3 === 1 ? 'terra' : ''
              return (
                <a className="crop-card" href="#" key={c.name}>
                  <div className="top">
                    <span className="ord">№ {String(i + 1).padStart(2, '0')}</span>
                    <span className="lat">{c.lat}</span>
                  </div>
                  <div style={{ position: 'relative', width: '100%', height: 180, overflow: 'hidden' }}>
                    <Image
                      src={cropPhotoUrl(c.name)}
                      alt={c.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 600px) 100vw, 280px"
                    />
                  </div>
                  <h3>{c.name}</h3>
                  <div className="what">
                    <span>Actie</span><b>{action}</b>
                    <span>Categorie</span><b>{c.cat[0].toUpperCase() + c.cat.slice(1)}</b>
                    <span className="green">Maand</span><b>{MONTH_NAMES_FULL[selectedMonth - 1][0].toUpperCase() + MONTH_NAMES_FULL[selectedMonth - 1].slice(1)}</b>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      <section className="cal-grid" aria-labelledby="cal-heading">
        <div className="wrap">
          <div className="section-head" style={{ borderBottomColor: 'var(--ink)', marginBottom: 32 }}>
            <h2 id="cal-heading">De hele <span className="it">kalender</span></h2>
            <p className="intro">Alle gewassen, alle maanden — één overzicht.</p>
            <span className="meta">36 gewassen · bijgewerkt mei 2026</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="cal-table" aria-label="Zaaikalender overzicht">
              <thead>
                <tr>
                  <th>Gewas</th>
                  {MONTH_NAMES.map((name, i) => (
                    <th key={i} className={i + 1 === selectedMonth ? 'now' : ''}>
                      {name[0].toUpperCase() + name.slice(1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.sort((a, b) => a.name.localeCompare(b.name, 'nl')).map(c => (
                  <tr key={c.name}>
                    <td className="crop-name">
                      <span className="cat">{c.cat}</span><br />
                      {c.name}
                      <span className="lat"> {c.lat}</span>
                    </td>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(m => {
                      const codes = (c.months[m] || '').toLowerCase()
                      const isNow = m === selectedMonth
                      const has = codes.length > 0
                      return (
                        <td key={m} className={`cell ${isNow ? 'now-col' : ''} ${has && isNow ? 'has' : ''}`}>
                          {has && (
                            <div className="marks">
                              {[...codes].filter(ch => PHASES[ch]).map((ch, j) => (
                                <div key={j} className={`mark ${PHASES[ch]}`} title={phaseLabel(ch)}></div>
                              ))}
                            </div>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', background: 'var(--forest)', color: 'var(--paper)', borderTop: '1px solid var(--ink)' }}>
        <div className="wrap" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 56px)', lineHeight: 1, marginBottom: 12 }}>
              Vraag het aan <em>Moos.</em>
            </div>
            <p style={{ fontSize: 17, color: 'rgba(244,239,228,.8)', margin: 0, maxWidth: '48ch' }}>
              Specifieke vraag over een gewas of situatie? De AI coach geeft je direct een eerlijk antwoord — geen account nodig.
            </p>
          </div>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--terracotta)', color: 'var(--paper)', fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', padding: '16px 24px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Open coach →
          </Link>
        </div>
      </section>
    </>
  )
}
