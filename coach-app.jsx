// Moestuin.nl — AI Coach homepage

const { useState, useEffect, useRef } = React;

const COACH_SYSTEM_PROMPT = `Je bent Moos — de AI moestuincoach van moestuin.nl. Je bent een ervaren Nederlandse moestuinier en plantenkenner, met een vriendelijke en directe toon.

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
- Format: gebruik **vet** voor belangrijke termen, opsommingen met "-".`;

const STARTERS = [
  { cat: "Probleem", q: "Waarom worden de blaadjes van mijn tomaten geel?" },
  { cat: "Seizoen",  q: "Wat kan ik in mei nog zaaien?" },
  { cat: "Balkon",   q: "Welke groente lukt in een pot op het balkon?" },
  { cat: "Plagen",   q: "Hoe houd ik slakken uit mijn moestuin?" },
  { cat: "Beginner", q: "Ik begin net — wat zijn drie makkelijke groenten?" },
  { cat: "Zaaien",   q: "Hoe diep plant ik tomaten in de volle grond?" },
  { cat: "Bodem",    q: "Hoe maak ik mijn zware kleigrond beter?" },
  { cat: "Oogst",    q: "Wanneer is mijn knoflook klaar om te rooien?" },
];

// ---- Mascot SVG component — "Moos"
function CoachMascot({ thinking = false, size = 120 }) {
  return (
    <svg
      className={`mascot${thinking ? " mascot--thinking" : ""}`}
      viewBox="0 0 100 118"
      width={size}
      height={Math.round(size * 1.18)}
      aria-label="Moos, de AI moestuincoach"
      role="img"
    >
      {/* Sprout on top — sways with CSS */}
      <g className="mascot-sprout">
        <line x1="50" y1="20" x2="50" y2="4" stroke="#3d5a3a" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="40" cy="10" rx="11" ry="5.5" fill="#3d5a3a" transform="rotate(-32 40 10)"/>
        <ellipse cx="61" cy="6"  rx="9"  ry="4.5" fill="#6f8a5a" transform="rotate(28 61 6)"/>
      </g>

      {/* Head */}
      <circle cx="50" cy="65" r="42" fill="#f4efe4" stroke="#1a1a1a" strokeWidth="2.2"/>

      {/* Subtle circuit traces — AI hint */}
      <g stroke="#d0c5ae" strokeWidth="0.9" fill="none">
        <path d="M14 60 h8 v-6 h5"/>
        <circle cx="14" cy="60" r="2" fill="#d0c5ae"/>
        <path d="M86 60 h-8 v-6 h-5"/>
        <circle cx="86" cy="60" r="2" fill="#d0c5ae"/>
        <path d="M18 78 h5 v5 h3"/>
        <path d="M82 78 h-5 v5 h-3"/>
      </g>

      {/* Cheeks */}
      <ellipse cx="26" cy="72" rx="10" ry="6" fill="#c4632e" opacity="0.22"/>
      <ellipse cx="74" cy="72" rx="10" ry="6" fill="#c4632e" opacity="0.22"/>

      {/* Left eye — blinks via CSS */}
      <g className="mascot-eye mascot-eye--left">
        <ellipse cx="37" cy="59" rx="5.5" ry="7" fill="#1a1a1a"/>
        <ellipse cx="38.5" cy="56" rx="2.2" ry="2.8" fill="white" opacity="0.65"/>
      </g>

      {/* Right eye */}
      <g className="mascot-eye mascot-eye--right">
        <ellipse cx="63" cy="59" rx="5.5" ry="7" fill="#1a1a1a"/>
        <ellipse cx="64.5" cy="56" rx="2.2" ry="2.8" fill="white" opacity="0.65"/>
      </g>

      {/* Normal smile */}
      <path className="mascot-smile" d="M 38 77 Q 50 90 62 77" stroke="#1a1a1a" strokeWidth="2.6" fill="none" strokeLinecap="round"/>

      {/* Thinking mouth — smaller, neutral */}
      <path className="mascot-think-mouth" d="M 41 79 Q 50 84 59 79" stroke="#1a1a1a" strokeWidth="2.6" fill="none" strokeLinecap="round"/>

      {/* Thinking dots — pop in when busy */}
      <g className="mascot-think-dots">
        <circle cx="70" cy="46" r="3.8" fill="#c4632e"/>
        <circle cx="80" cy="37" r="3"   fill="#c4632e"/>
        <circle cx="88" cy="29" r="2.2" fill="#c4632e"/>
      </g>
    </svg>
  );
}

// Small mascot for chat messages
function MascotAvatar() {
  return (
    <div className="avatar mascot-chat-avatar" aria-label="Moos">
      <svg viewBox="10 28 80 72" width="34" height="34" aria-hidden="true">
        {/* Sprout stub */}
        <line x1="50" y1="34" x2="50" y2="28" stroke="#6f8a5a" strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="43" cy="31" rx="7" ry="3.5" fill="#6f8a5a" transform="rotate(-30 43 31)"/>
        {/* Head */}
        <circle cx="50" cy="66" r="32" fill="#3d5a3a"/>
        {/* Eyes */}
        <ellipse cx="39" cy="61" rx="5" ry="6.5" fill="white" opacity="0.92"/>
        <ellipse cx="61" cy="61" rx="5" ry="6.5" fill="white" opacity="0.92"/>
        <ellipse cx="40" cy="59" rx="2" ry="2.5" fill="#1a1a1a"/>
        <ellipse cx="62" cy="59" rx="2" ry="2.5" fill="#1a1a1a"/>
        {/* Smile */}
        <path d="M 40 71 Q 50 78 60 71" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

// ---- Tiny markdown — bold + lists
function renderMarkdown(text) {
  if (!text) return null;
  const blocks = text.split(/\n\n+/);
  return blocks.map((block, i) => {
    const lines = block.split("\n");
    const isList = lines.every(l => /^\s*(-|\*|\d+\.)\s+/.test(l));
    if (isList) {
      const ordered = /^\s*\d+\./.test(lines[0]);
      const Tag = ordered ? "ol" : "ul";
      return (
        <Tag key={i}>
          {lines.map((l, j) =>
            <li key={j} dangerouslySetInnerHTML={{ __html: formatInline(l.replace(/^\s*(-|\*|\d+\.)\s+/, "")) }} />
          )}
        </Tag>
      );
    }
    return <p key={i} dangerouslySetInnerHTML={{ __html: formatInline(block) }} />;
  });
}
function formatInline(s) {
  return s
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

// ---- Date helpers
function getWeekNumber(d) {
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}
const NL_DAYS   = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
const NL_MONTHS = ["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"];

// ---- Shared UI

function SiteHeader({ active = "coach" }) {
  const now     = new Date();
  const wk      = getWeekNumber(now);
  const day     = NL_DAYS[now.getDay()];
  const dateStr = `${now.getDate()} ${NL_MONTHS[now.getMonth()]} ${now.getFullYear()}`;
  return (
    <header className="site-header">
      <div className="wrap">
        <div className="bar">
          <a href="index.html" className="brand">
            <span>moestuin</span><span className="dot"></span><span className="tld">.nl</span>
          </a>
          <nav className="site-nav">
            <a href="index.html"        className={active === "coach"     ? "active" : ""}>Coach</a>
            <a href="zaaikalender.html" className={active === "kalender"  ? "active" : ""}>Zaaikalender</a>
            <a href="artikel.html"      className={active === "artikel"   ? "active" : ""}>Tuintips</a>
            <a href="inzichten.html"    className={active === "inzichten" ? "active" : ""}>Inzichten</a>
          </nav>
          <div className="header-meta">
            <div><b>Wk {wk}</b> · {day}</div>
            <div>{dateStr}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="grid">
          <div>
            <div className="big-mark">moestuin<span className="dot"></span></div>
            <div style={{ maxWidth: "34ch", color: "rgba(244,239,228,.65)", fontSize: 14, lineHeight: 1.5 }}>
              De Nederlandse AI moestuincoach — geen account nodig. Gemaakt voor wie z'n handen vies wil maken.
            </div>
          </div>
          <div>
            <h4>Stel je vraag</h4>
            <ul>
              <li><a href="index.html">Moestuincoach</a></li>
              <li><a href="zaaikalender.html">Zaaikalender</a></li>
              <li><a href="artikel.html">Tuintips</a></li>
            </ul>
          </div>
          <div>
            <h4>Over</h4>
            <ul>
              <li><a href="#">Hoe werkt 't?</a></li>
              <li><a href="#">Affiliate-beleid</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Beheer</h4>
            <ul>
              <li><a href="inzichten.html">Inzichten</a></li>
            </ul>
          </div>
        </div>
        <div className="colophon">
          <span>© {new Date().getFullYear()} Moestuin.nl · Coach in beta</span>
          <span>Gezet uit Instrument Serif &amp; Newsreader</span>
        </div>
      </div>
    </footer>
  );
}

// ---- Wall (publieke vragen van anderen)

function categoryLabel(key) {
  const c = window.MoestuinCoach.CATEGORIES.find(c => c.key === key);
  return c ? c.label : "Overig";
}
function timeAgo(ts) {
  const d = (Date.now() - ts) / 1000;
  if (d < 60)    return "nu net";
  if (d < 3600)  return Math.floor(d / 60)   + " min";
  if (d < 86400) return Math.floor(d / 3600)  + " uur";
  return Math.floor(d / 86400) + " d";
}

function Wall({ onAsk }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(window.MoestuinCoach.loadQuestions().slice(0, 9));
  }, []);
  if (!items.length) return null;
  return (
    <section className="wall">
      <div className="wrap">
        <div className="section-head">
          <h2>Wat anderen <span className="it">vroegen</span></h2>
          <p className="intro">Klik een vraag aan om hetzelfde antwoord te zien — of stel je eigen variant.</p>
          <span className="meta">{window.MoestuinCoach.loadQuestions().length} vragen totaal</span>
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
  );
}

// ---- Coach hero — compact, ask box above the fold

function CoachHero({ onAsk, busy }) {
  const [text, setText] = useState("");

  function submit() {
    const t = text.trim();
    if (!t || busy) return;
    onAsk(t);
    setText("");
  }

  return (
    <section className="coach-hero">
      <div className="wrap">
        <div className="kicker-row">
          <span className="kicker">Gratis AI moestuincoach · geen account</span>
          <span className="meta">Beta · Claude AI</span>
        </div>

        {/* Mascot + intro — left/right grid */}
        <div className="coach-intro">
          <div className="coach-intro-mascot">
            <CoachMascot thinking={busy} size={110} />
          </div>
          <div className="coach-intro-text">
            <h1>Hallo, ik ben <span className="terra">Moos.</span></h1>
            <p className="sub">Jouw AI moestuincoach — stel je vraag in gewoon Nederlands en krijg meteen een eerlijk antwoord. Diagnoses, zaaiadvies, plantgidsen.</p>
          </div>
        </div>

        {/* The centerpiece input */}
        <div className="ask-box">
          <textarea
            className="input"
            placeholder="Stel je vraag, bijv: waarom krullen mijn tomatenblaadjes?"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
            rows={2}
          />
          <button className="ask" onClick={submit} disabled={busy || !text.trim()}>
            <span>Vraag</span>
            <span className="arrow">→</span>
          </button>
        </div>
        <div className="ask-meta">
          <span><span className="free">● Gratis</span> &nbsp;·&nbsp; geen registratie · onbeperkt</span>
          <span>Enter om te versturen</span>
        </div>

        <div className="starters">
          <div className="lbl">— Of probeer een van deze vragen</div>
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
  );
}

function ChatView({ messages, busy, onAsk, onReset }) {
  const endRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [messages.length, busy]);

  function submit() {
    const t = text.trim();
    if (!t || busy) return;
    onAsk(t);
    setText("");
  }

  return (
    <section className="chat-view">
      <div className="wrap">
        <div className="chat-stream">
          {messages.map((m, i) =>
            <div className={`msg ${m.role}`} key={i}>
              {m.role === "bot"
                ? <MascotAvatar />
                : <div className="avatar">?</div>
              }
              <div>
                <div className="who">{m.role === "user" ? "Jij" : "Moos · moestuincoach"}</div>
                <div className="body">
                  {m.role === "user"
                    ? m.text
                    : m.text
                      ? renderMarkdown(m.text)
                      : <div className="thinking">
                          <span>Even nadenken</span>
                          <span className="dots"><span></span><span></span><span></span></span>
                        </div>
                  }
                </div>
              </div>
            </div>
          )}
          <div ref={endRef}></div>
        </div>

        <div className="chat-actions">
          <button className="primary" onClick={onReset}>↺ Nieuwe vraag</button>
          <button onClick={() => onAsk("Geef me meer details")}>↪ Meer details</button>
          <button onClick={() => onAsk("Welk product of gereedschap heb ik hiervoor nodig?")}>↪ Wat heb ik nodig?</button>
          <button onClick={() => onAsk("Hoe voorkom ik dit volgend seizoen?")}>↪ Volgend jaar voorkomen</button>
        </div>

        <div className="ask-box compact">
          <textarea
            className="input"
            placeholder="Vraag iets vervolgs..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
            rows={1}
          />
          <button className="ask" onClick={submit} disabled={busy || !text.trim()}>
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="how">
      <div className="wrap">
        <div className="section-head" style={{ borderBottomColor: "var(--ink)", marginBottom: 40 }}>
          <h2>Hoe het <span className="it">werkt.</span></h2>
          <p className="intro">Drie dingen om te weten voor je aan de slag gaat.</p>
          <span className="meta">In beta sinds mei 2026</span>
        </div>
        <div className="grid">
          <div className="step">
            <div className="num">01</div>
            <h3>Stel een vraag, in gewoon Nederlands.</h3>
            <p>"Waarom krullen mijn tomatenblaadjes?" of "Wat zaai ik in mei?" — geen tuinjargon nodig. Hoe specifieker, hoe beter het antwoord.</p>
          </div>
          <div className="step">
            <div className="num">02</div>
            <h3>Krijg een direct antwoord — geen account.</h3>
            <p>Moos geeft een korte diagnose, drie tot vijf concrete stappen, en zegt het als-ie het niet zeker weet. Geen ruis, geen pop-ups.</p>
          </div>
          <div className="step">
            <div className="num">03</div>
            <h3>Vraag door tot je verder kan.</h3>
            <p>Bouw op het vorige antwoord door. Of klik op "wat heb ik nodig?" voor een tool- of zadenadvies — daar verdienen we wat aan, daarom is de coach zelf gratis.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- API call — via /api/chat (proxied by server.js to keep the key server-side)

async function callCoach(conversationMessages) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system: COACH_SYSTEM_PROMPT, messages: conversationMessages }),
  });
  if (!response.ok) {
    const err = await response.text().catch(() => "");
    throw new Error(`Server antwoordde ${response.status}: ${err}`);
  }
  const data = await response.json();
  return data.content[0].text;
}

// ---- Main app

function CoachApp() {
  const [messages, setMessages] = useState([]);
  const [busy, setBusy]         = useState(false);

  useEffect(() => { window.MoestuinCoach.seedIfEmpty(); }, []);

  async function askCoach(question) {
    setBusy(true);
    setMessages(prev => [...prev, { role: "user", text: question }, { role: "bot", text: "" }]);
    window.MoestuinCoach.logQuestion(question);

    try {
      const history = [...messages, { role: "user", text: question }]
        .filter(m => m.text)
        .map(m => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text }));

      const reply = await callCoach(history);

      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "bot", text: reply };
        return copy;
      });

      const qs = window.MoestuinCoach.loadQuestions();
      if (qs[0]) window.MoestuinCoach.markAnswered(qs[0].id);
    } catch (e) {
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          role: "bot",
          text: "Sorry — er ging iets mis. Controleer of de server draait (`node server.js`) en probeer het opnieuw.\n\nFout: " + e.message,
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setMessages([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const inChat = messages.length > 0;

  return (
    <>
      <SiteHeader active="coach" />
      {inChat
        ? <ChatView messages={messages} busy={busy} onAsk={askCoach} onReset={reset} />
        : <CoachHero onAsk={askCoach} busy={busy} />
      }
      {!inChat && <Wall onAsk={askCoach} />}
      {!inChat && <HowItWorks />}
      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CoachApp />);
