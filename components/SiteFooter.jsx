import Link from 'next/link'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="grid">
          <div>
            <div className="big-mark">moestuin<span className="dot"></span></div>
            <div style={{ maxWidth: '34ch', color: 'rgba(244,239,228,.65)', fontSize: 14, lineHeight: 1.5 }}>
              De moestuingids voor Nederland en Vlaanderen, geen account nodig. Gemaakt op{' '}
              <a href="/over" style={{ color: 'rgba(244,239,228,.85)' }}>Hoeve 1700</a> — voor wie z&apos;n handen vies wil maken.
            </div>
          </div>
          <div>
            <h4>Aan de slag</h4>
            <ul>
              <li><Link href="/zaaikalender">Zaaikalender</Link></li>
              <li><Link href="/artikel">Tuintips</Link></li>
            </ul>
          </div>
          <div>
            <h4>Over</h4>
            <ul>
              <li><Link href="/over">Over Moestuin.nl</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/linkpartners">Linkpartners</Link></li>
            </ul>
          </div>
        </div>
        <div className="colophon">
          <span>© {new Date().getFullYear()} Moestuin.nl · De Nederlandse moestuingids</span>
        </div>
      </div>
    </footer>
  )
}
