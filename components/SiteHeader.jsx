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

  useEffect(() => {
    const now = new Date()
    setInfo({
      wk:   getWeekNumber(now),
      day:  NL_DAYS[now.getDay()],
      date: `${now.getDate()} ${NL_MONTHS[now.getMonth()]} ${now.getFullYear()}`,
    })
  }, [])

  return (
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
          <div className="header-meta">
            <div><b>Wk {info.wk}</b> · {info.day}</div>
            <div>{info.date}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
