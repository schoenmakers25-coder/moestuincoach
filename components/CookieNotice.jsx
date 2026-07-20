'use client'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'moestuin-cookie-ack'

/**
 * Eerlijke, lichte cookie-/privacymelding.
 *
 * Moestuin.nl plaatst geen tracking- of advertentiecookies. De enige statistiek
 * is Vercel Web Analytics, dat cookieloos werkt. Er is dus geen consent-gate
 * nodig die trackers blokkeert (die zijn er niet) — wel een korte, transparante
 * melding met een verwijzing naar de privacyverklaring. De keuze wordt lokaal
 * onthouden in localStorage, zodat de balk daarna wegblijft.
 */
export default function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // localStorage kan geblokkeerd zijn (privacymodus) — dan tonen we niets.
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    } catch {
      /* negeren */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookiemelding"
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 60,
        maxWidth: 720,
        margin: '0 auto',
        background: 'var(--paper)',
        border: '1px solid var(--ink)',
        boxShadow: 'var(--shadow-paper)',
        padding: '18px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <p
        style={{
          flex: '1 1 340px',
          margin: 0,
          fontSize: 14,
          lineHeight: 1.55,
          color: 'var(--ink-2)',
        }}
      >
        We gebruiken alleen functionele gegevens en privacyvriendelijke, <strong>cookieloze</strong> statistieken.
        Geen tracking- of advertentiecookies. Meer weten? Lees de{' '}
        <a
          href="/privacy"
          style={{ color: 'var(--terracotta)', textDecoration: 'none', borderBottom: '1px solid var(--terracotta)' }}
        >
          privacyverklaring
        </a>
        .
      </p>
      <button
        onClick={accept}
        style={{
          flex: '0 0 auto',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          background: 'var(--forest)',
          color: 'var(--paper)',
          border: '1px solid var(--forest)',
          padding: '11px 22px',
          cursor: 'pointer',
        }}
      >
        Akkoord
      </button>
    </div>
  )
}
