'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function getWeekNumber(d) {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
  const week1 = new Date(date.getFullYear(), 0, 4)
  return 1 + Math.round(((date - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}

const NL_DAYS   = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag']
const NL_MONTHS = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december']

export default function SiteHeader() {
  const pathname = usePathname()
  const [info, setInfo] = useState({ wk: '--', day: '---', date: '' })
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const now = new Date()
    setInfo({
      wk:   getWeekNumber(now),
      day:  NL_DAYS[now.getDay()],
      date: `${now.getDate()} ${NL_MONTHS[now.getMonth()]} ${now.getFullYear()}`,
    })
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const NAV_LINKS = [
    { href: '/',              label: 'Coach' },
    { href: '/zaaikalender', label: 'Zaaikalender' },
    { href: '/artikel',      label: 'Tuintips' },
    { href: '/privacy',      label: 'Privacy' },
    { href: '/contact',      label: 'Contact' },
  ]

  return (
    <>
      <header className="site-header">
        <div className="wrap">
          <div className="bar">
            <Link href="/" className="brand">
              <span>moestuin</span><span className="dot"></span><span className="tld">.nl</span>
            </Link>
            <nav className="site-nav">
              <Link href="/"              className={pathname === '/'             ? 'active' : ''}>Coach</Link>
              <Link href="/zaaikalender" className={pathname === '/zaaikalender' ? 'active' : ''}>Zaaikalender</Link>
              <Link href="/artikel"      className={pathname === '/artikel'      ? 'active' : ''}>Tuintips</Link>
            </nav>
            <div className="header-right">
              <div className="header-meta">
                <div><b>Wk {info.wk}</b> · {info.day}</div>
                <div>{info.date}</div>
              </div>
              <button
                className="hamburger"
                aria-label={menuOpen ? 'Menu sluiten' : 'Menu openen'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(o => !o)}
              >
                {menuOpen
                  ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <line x1="4" y1="4" x2="18" y2="18" />
                      <line x1="18" y1="4" x2="4" y2="18" />
                    </svg>
                  : <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <line x1="3" y1="6"  x2="19" y2="6"  />
                      <line x1="3" y1="11" x2="19" y2="11" />
                      <line x1="3" y1="16" x2="19" y2="16" />
                    </svg>
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobiel menu">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </>
  )
}
