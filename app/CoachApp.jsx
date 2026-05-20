'use client'
import { useState, useEffect, useRef } from 'react'
import { seedIfEmpty, logQuestion, loadQuestions, markAnswered, CATEGORIES } from '@/lib/coach-data'

const COACH_SYSTEM_PROMPT = `Je bent Moos, de AI moestuincoach van moestuin.nl. Je bent een ervaren Nederlandse moestuinier en plantenkenner, met een vriendelijke en directe toon.

REGELS:
- Antwoord in het Nederlands, met "je"/"jij".
- Wees concreet. Geen lange inleidingen, geen disclaimers vooraf.
- Begin met een directe diagnose of antwoord in 1-2 zinnen.
- Daarna een korte lijst (max 5 punten) of paragraaf met praktische stappen.
- Gebruik Nederlandse namen voor planten en problemen.
- Houd het kort: max ~180 woorden, tenzij echt nodig.
- Als je iets niet zeker weet, zeg dat eerlijk en vraag een toelichting.
- Refereer waar relevant naar het seizoen (huidige maand: mei).
- Gebruik geen emoji.
- Format: gebruik **vet** voor belangrijke termen, opsommingen met "-".`

function compressImage(file) {
  return new Promise(resolve => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const MAX = 1024
      let w = img.width, h = img.height
      if (w > MAX || h > MAX) {
        if (w > h) { h = Math.round(h * MAX / w); w = MAX }
        else { w = Math.round(w * MAX / h); h = MAX }
      }
      const canvas = document.createElement('canvas')
      canvas.width = w; canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      URL.revokeObjectURL(url)
      resolve({
        data: canvas.toDataURL('image/jpeg', 0.82).split(',')[1],
        previewUrl: canvas.toDataURL('image/jpeg', 0.6),
        mimeType: 'image/jpeg',
      })
    }
    img.src = url
  })
}

const STARTERS = [
  { cat: 'Probleem', q: 'Waarom worden de blaadjes van mijn tomaten geel?' },
  { cat: 'Seizoen',  q: 'Wat kan ik in mei nog zaaien?' },
  { cat: 'Balkon',   q: 'Welke groente lukt in een pot op het balkon?' },
  { cat: 'Plagen',   q: 'Hoe houd ik slakken uit mijn moestuin?' },
  { cat: 'Beginner', q: 'Ik begin net, wat zijn drie makkelijke groenten?' },
  { cat: 'Zaaien',   q: 'Hoe diep plant ik tomaten in de volle grond?' },
  { cat: 'Bodem',    q: 'Hoe maak ik mijn zware kleigrond beter?' },
  { cat: 'Oogst',    q: 'Wanneer is mijn knoflook klaar om te rooien?' },
]

function CoachMascot({ thinking = false, size = 120 }) {
  return (
    <svg
      className={`mascot${thinking ? ' mascot--thinking' : ''}`}
      viewBox="0 0 100 118"
      width={size}
      height={Math.round(size * 1.18)}
      aria-label="Moos, de AI moestuincoach"
      role="img"
    >
      <g className="mascot-sprout">
        <line x1="50" y1="20" x2="50" y2="4" stroke="#3d5a3a" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="40" cy="10" rx="11" ry="5.5" fill="#3d5a3a" transform="rotate(-32 40 10)"/>
        <ellipse cx="61" cy="6"  rx="9"  ry="4.5" fill="#6f8a5a" transform="rotate(28 61 6)"/>
      </g>
      <circle cx="50" cy="65" r="42" fill="#f4efe4" stroke="#1a1a1a" strokeWidth="2.2"/>
      <g stroke="#d0c5ae" strokeWidth="0.9" fill="none">
        <path d="M14 60 h8 v-6 h5"/>
        <circle cx="14" cy="60" r="2" fill="#d0c5ae"/>
        <path d="M86 60 h-8 v-6 h-5"/>
        <circle cx="86" cy="60" r="2" fill="#d0c5ae"/>
        <path d="M18 78 h5 v5 h3"/>
        <path d="M82 78 h-5 v5 h-3"/>
      </g>
      <ellipse cx="26" cy="72" rx="10" ry="6" fill="#c4632e" opacity="0.22"/>
      <ellipse cx="74" cy="72" rx="10" ry="6" fill="#c4632e" opacity="0.22"/>
      <g className="mascot-eye mascot-eye--left">
        <ellipse cx="37" cy="59" rx="5.5" ry="7" fill="#1a1a1a"/>
        <ellipse cx="38.5" cy="56" rx="2.2" ry="2.8" fill="white" opacity="0.65"/>
      </g>
      <g className="mascot-eye mascot-eye--right">
        <ellipse cx="63" cy="59" rx="5.5" ry="7" fill="#1a1a1a"/>
        <ellipse cx="64.5" cy="56" rx="2.2" ry="2.8" fill="white" opacity="0.65"/>
      </g>
      <path className="mascot-smile" d="M 38 77 Q 50 90 62 77" stroke="#1a1a1a" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      <path className="mascot-think-mouth" d="M 41 79 Q 50 84 59 79" stroke="#1a1a1a" strokeWidth="2.6" fill="none" strokeLinecap="round"/>
      <g className="mascot-think-dots">
        <circle cx="70" cy="46" r="3.8" fill="#c4632e"/>
        <circle cx="80" cy="37" r="3"   fill="#c4632e"/>
        <circle cx="88" cy="29" r="2.2" fill="#c4632e"/>
      </g>
    </svg>
  )
}

function MascotAvatar() {
  return (
    <div className="avatar mascot-chat-avatar" aria-label="Moos">
      <svg viewBox="10 28 80 72" width="34" height="34" aria-hidden="true">
        <line x1="50" y1="34" x2="50" y2="28" stroke="#6f8a5a" strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="43" cy="31" rx="7" ry="3.5" fill="#6f8a5a" transform="rotate(-30 43 31)"/>
        <circle cx="50" cy="66" r="32" fill="#3d5a3a"/>
        <ellipse cx="39" cy="61" rx="5" ry="6.5" fill="white" opacity="0.92"/>
        <ellipse cx="61" cy="61" rx="5" ry="6.5" fill="white" opacity="0.92"/>
        <ellipse cx="40" cy="59" rx="2" ry="2.5" fill="#1a1a1a"/>
        <ellipse cx="62" cy="59" rx="2" ry="2.5" fill="#1a1a1a"/>
        <path d="M 40 71 Q 50 78 60 71" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  )
}

const THINK_MESSAGES = [
  'Even nadenken…',
  'Moos krabt op zijn hoofd…',
  'Goede vraag, één moment…',
  'Aan het graven in de kennis…',
  'De bodem wordt omgespit…',
  'Bijna, nog even geduld…',
  'Moos raadpleegt de plantengidsen…',
]

function ThinkingIndicator() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % THINK_MESSAGES.length), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="thinking-block">
      <CoachMascot thinking size={72} />
      <div className="thinking-content">
        <span className="thinking-msg" key={idx}>{THINK_MESSAGES[idx]}</span>
        <span className="thinking-dots">
          <span /><span /><span />
        </span>
      </div>
    </div>
  )
}

function renderMarkdown(text) {
  if (!text) return null
  const blocks = text.split(/\n\n+/)
  return blocks.map((block, i) => {
    const lines = block.split('\n')
    const isList = lines.every(l => /^\s*(-|\*|\d+\.)\s+/.test(l))
    if (isList) {
      const ordered = /^\s*\d+\./.test(lines[0])
      const Tag = ordered ? 'ol' : 'ul'
      return (
        <Tag key={i}>
          {lines.map((l, j) =>
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(l.replace(/^\s*(-|\*|\d+\.)\s+/, '')) }} />
          )}
        </Tag>
      )
    }
    return <p key={i} dangerouslySetInnerHTML={{ __html: formatInline(block) }} />
  })
}
function formatInline(s) {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

function timeAgo(ts) {
  const d = (Date.now() - ts) / 1000
  if (d < 60)    return 'nu net'
  if (d < 3600)  return Math.floor(d / 60)  + ' min'
  if (d < 86400) return Math.floor(d / 3600) + ' uur'
  return Math.floor(d / 86400) + ' d'
}

function categoryLabel(key) {
  const c = CATEGORIES.find(c => c.key === key)
  return c ? c.label : 'Overig'
}

function Wall({ onAsk }) {
  const [items, setItems] = useState([])
  useEffect(() => {
    setItems(loadQuestions().slice(0, 9))
  }, [])
  if (!items.length) return null
  return (
    <section className="wall">
      <div className="wrap">
        <div className="section-head">
          <h2>Wat anderen <span className="it">vroegen</span></h2>
          <p className="intro">Klik een vraag aan om hetzelfde antwoord te zien, of stel je eigen variant.</p>
          <span className="meta">{loadQuestions().length} vragen totaal</span>
        </div>
        <div className="grid">
          {items.map(q =>
            <div className="q" key={q.id} onClick={() => onAsk(q.text)}>
              <div className="head">
                <span className="cat">{categoryLabel(q.category)}</span>
                <span className="age">{timeAgo(q.ts)}</span>
              </div>
              <p>{q.text}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function CoachHero({ onAsk, busy }) {
  const [text, setText] = useState('')
  const [pendingImage, setPendingImage] = useState(null)
  const fileRef = useRef(null)

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setPendingImage(await compressImage(file))
    e.target.value = ''
  }

  function submit() {
    const t = text.trim()
    if (!t || busy) return
    onAsk(t, pendingImage)
    setText('')
    setPendingImage(null)
  }

  return (
    <section className="coach-hero">
      <div className="wrap">
        <div className="kicker-row">
          <span className="kicker">Gratis AI moestuincoach · geen account</span>
          <span className="meta">Beta</span>
        </div>
        <div className="coach-intro">
          <div className="coach-intro-mascot">
            <CoachMascot thinking={busy} size={110} />
          </div>
          <div className="coach-intro-text">
            <h1>Hallo, ik ben <span className="terra">Moos.</span></h1>
            <p className="sub">Jouw AI moestuincoach. Stel je vraag en krijg meteen een eerlijk antwoord. Diagnoses, zaaiadvies, plantgidsen.</p>
          </div>
        </div>
        <div className="ask-box">
          <textarea
            className="input"
            placeholder="Stel je vraag"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
            rows={2}
          />
          <div className="ask-actions">
            <label className="cam-btn" title="Foto toevoegen">
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </label>
            <button className="ask" onClick={submit} disabled={busy || !text.trim()}>
              <span>Vraag</span>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
        {pendingImage && (
          <div className="img-preview-strip">
            <img src={pendingImage.previewUrl} alt="Geselecteerde foto" />
            <div className="img-preview-info">
              <span>Foto toegevoegd</span>
              <button onClick={() => setPendingImage(null)}>✕ Verwijder</button>
            </div>
          </div>
        )}
        <div className="ask-meta">
          <span><span className="free">● Gratis</span> &nbsp;·&nbsp; geen registratie · onbeperkt</span>
          <span>Enter om te versturen</span>
        </div>
        <div className="starters">
          <div className="lbl">Of probeer een van deze vragen</div>
          <div className="chips">
            {STARTERS.map(s =>
              <button className="chip" key={s.q} onClick={() => onAsk(s.q)}>
                <span className="cat">{s.cat}</span>
                {s.q}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChatView({ messages, busy, onAsk, onReset }) {
  const endRef = useRef(null)
  const [text, setText] = useState('')
  const [pendingImage, setPendingImage] = useState(null)
  const fileRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, busy])

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setPendingImage(await compressImage(file))
    e.target.value = ''
  }

  function submit() {
    const t = text.trim()
    if (!t || busy) return
    onAsk(t, pendingImage)
    setText('')
    setPendingImage(null)
  }

  return (
    <section className="chat-view">
      <div className="wrap">
        <div className="chat-stream">
          {messages.map((m, i) =>
            <div className={`msg ${m.role}`} key={i}>
              {m.role === 'bot'
                ? <MascotAvatar />
                : <div className="avatar">?</div>
              }
              <div>
                <div className="who">{m.role === 'user' ? 'Jij' : 'Moos · moestuincoach'}</div>
                <div className="body">
                  {m.role === 'user'
                    ? <>{m.image && <img src={m.image.previewUrl} alt="" className="msg-img" />}{m.text}</>
                    : m.text
                      ? renderMarkdown(m.text)
                      : <ThinkingIndicator />
                  }
                </div>
              </div>
            </div>
          )}
          <div ref={endRef}></div>
        </div>
        <div className="chat-actions">
          <button className="primary" onClick={onReset}>↺ Nieuwe vraag</button>
          <button onClick={() => onAsk('Geef me meer details')}>↪ Meer details</button>
          <button onClick={() => onAsk('Welk product of gereedschap heb ik hiervoor nodig?')}>↪ Wat heb ik nodig?</button>
          <button onClick={() => onAsk('Hoe voorkom ik dit volgend seizoen?')}>↪ Volgend jaar voorkomen</button>
        </div>
        {pendingImage && (
          <div className="img-preview-strip compact">
            <img src={pendingImage.previewUrl} alt="" />
            <div className="img-preview-info">
              <span>Foto toegevoegd</span>
              <button onClick={() => setPendingImage(null)}>✕</button>
            </div>
          </div>
        )}
        <div className="ask-box compact">
          <textarea
            className="input"
            placeholder="Vraag iets vervolgs..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
            rows={1}
          />
          <div className="ask-actions">
            <label className="cam-btn" title="Foto toevoegen">
              <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </label>
            <button className="ask" onClick={submit} disabled={busy || !text.trim()}>
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function SiteIntro() {
  return (
    <section className="site-intro">
      <div className="wrap">
        <div className="site-intro-grid">
          <a href="/artikel" className="site-intro-card">
            <div className="site-intro-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <div className="site-intro-label">Tuintips &amp; gidsen</div>
            <div className="site-intro-desc">Praktische artikelen over zaaien, verzorgen en oogsten, voor elk niveau.</div>
          </a>
          <a href="/" className="site-intro-card site-intro-card--active">
            <div className="site-intro-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="site-intro-label">AI coach Moos</div>
            <div className="site-intro-desc">Stel elke vraag over je moestuin, gratis, geen account, meteen antwoord.</div>
          </a>
          <a href="/producten" className="site-intro-card">
            <div className="site-intro-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <div className="site-intro-label">Productaanbevelingen</div>
            <div className="site-intro-desc">Zaden, gereedschap en kweekmateriaal — eerlijke keuzes voor jouw moestuin.</div>
          </a>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="how">
      <div className="wrap">
        <div className="section-head" style={{ borderBottomColor: 'var(--ink)', marginBottom: 40 }}>
          <h2>Hoe het <span className="it">werkt.</span></h2>
          <p className="intro">Drie dingen om te weten voor je aan de slag gaat.</p>
          <span className="meta">In beta sinds mei 2026</span>
        </div>
        <div className="grid">
          <div className="step">
            <div className="num">01</div>
            <h3>Stel een vraag, in gewoon Nederlands.</h3>
            <p>&ldquo;Waarom krullen mijn tomatenblaadjes?&rdquo; of &ldquo;Wat zaai ik in mei?&rdquo; — geen tuinjargon nodig. Hoe specifieker, hoe beter het antwoord.</p>
          </div>
          <div className="step">
            <div className="num">02</div>
            <h3>Krijg een direct antwoord — geen account.</h3>
            <p>Moos geeft een korte diagnose, drie tot vijf concrete stappen, en zegt het als-ie het niet zeker weet. Geen ruis, geen pop-ups.</p>
          </div>
          <div className="step">
            <div className="num">03</div>
            <h3>Vraag door tot je verder kan.</h3>
            <p>Bouw op het vorige antwoord door. Of klik op &ldquo;wat heb ik nodig?&rdquo; voor een tool- of zadenadvies — daar verdienen we wat aan, daarom is de coach zelf gratis.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

async function callCoach(conversationMessages) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system: COACH_SYSTEM_PROMPT, messages: conversationMessages }),
  })
  if (!response.ok) {
    const err = await response.text().catch(() => '')
    throw new Error(`Server antwoordde ${response.status}: ${err}`)
  }
  const data = await response.json()
  return data.content[0].text
}

export default function CoachApp() {
  const [messages, setMessages] = useState([])
  const [busy, setBusy]         = useState(false)

  useEffect(() => { seedIfEmpty() }, [])

  async function askCoach(question, image = null) {
    setBusy(true)
    setMessages(prev => [...prev, { role: 'user', text: question, image }, { role: 'bot', text: '' }])
    logQuestion(question)

    try {
      const history = [...messages, { role: 'user', text: question, image }]
        .filter(m => m.text)
        .map(m => {
          const role = m.role === 'bot' ? 'assistant' : 'user'
          if (m.image) {
            return { role, content: [
              { type: 'image', source: { type: 'base64', media_type: m.image.mimeType, data: m.image.data } },
              { type: 'text', text: m.text },
            ]}
          }
          return { role, content: m.text }
        })

      const reply = await callCoach(history)

      setMessages(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = { role: 'bot', text: reply }
        return copy
      })

      const qs = loadQuestions()
      if (qs[0]) markAnswered(qs[0].id)
    } catch (e) {
      setMessages(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = {
          role: 'bot',
          text: 'Sorry — er ging iets mis. Probeer het opnieuw.\n\nFout: ' + e.message,
        }
        return copy
      })
    } finally {
      setBusy(false)
    }
  }

  function reset() {
    setMessages([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const inChat = messages.length > 0

  return (
    <>
      {inChat
        ? <ChatView messages={messages} busy={busy} onAsk={askCoach} onReset={reset} />
        : <CoachHero onAsk={askCoach} busy={busy} />
      }
      {!inChat && <SiteIntro />}
      {!inChat && <Wall onAsk={askCoach} />}
      {!inChat && <HowItWorks />}
    </>
  )
}
