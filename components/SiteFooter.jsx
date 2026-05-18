import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="grid">
          <div>
            <div className="big-mark">moestuin<span className="dot"></span></div>
            <div style={{ maxWidth: '34ch', color: 'rgba(244,239,228,.65)', fontSize: 14, lineHeight: 1.5 }}>
              De Nederlandse AI moestuincoach — geen account nodig. Gemaakt voor wie z&apos;n handen vies wil maken.
            </div>
          </div>
          <div>
            <h4>Stel je vraag</h4>
            <ul>
              <li><Link href="/">Moestuincoach</Link></li>
              <li><Link href="/zaaikalender">Zaaikalender</Link></li>
              <li><Link href="/artikel">Tuintips</Link></li>
            </ul>
          </div>
          <div>
            <h4>Over</h4>
            <ul>
              <li><a href="#">Hoe werkt &apos;t?</a></li>
              <li><a href="#">Affiliate-beleid</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Beheer</h4>
            <ul>
              <li><a href="/inzichten">Inzichten</a></li>
            </ul>
          </div>
        </div>
        <div className="colophon">
          <span>© {new Date().getFullYear()} Moestuin.nl · Coach in beta</span>
          <span>Gezet uit Instrument Serif &amp; Newsreader</span>
        </div>
      </div>
    </footer>
  )
}
