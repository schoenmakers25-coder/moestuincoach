'use client'
import { useState } from 'react'

const FIELD = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  marginBottom: 20,
}
const LABEL = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
}
const INPUT = {
  fontFamily: 'var(--font-body)',
  fontSize: 16,
  lineHeight: 1.5,
  color: 'var(--ink)',
  background: 'var(--paper)',
  border: '1px solid var(--line)',
  borderRadius: 0,
  padding: '12px 14px',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s',
}
const INPUT_FOCUS = {
  ...INPUT,
  borderColor: 'var(--forest)',
}

function Field({ label, error, children }) {
  return (
    <div style={FIELD}>
      <label style={LABEL}>{label}</label>
      {children}
      {error && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--terracotta)', letterSpacing: '0.04em' }}>
          {error}
        </span>
      )}
    </div>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({ naam: '', email: '', bericht: '', honeypot: '' })
  const [errors, setErrors] = useState({})
  const [focus, setFocus] = useState(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [serverError, setServerError] = useState('')

  function set(key) {
    return e => {
      setForm(f => ({ ...f, [key]: e.target.value }))
      if (errors[key]) setErrors(err => ({ ...err, [key]: '' }))
    }
  }

  function validate() {
    const e = {}
    if (form.naam.trim().length < 2) e.naam = 'Vul je naam in.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Vul een geldig e-mailadres in.'
    if (form.bericht.trim().length < 10) e.bericht = 'Bericht is te kort (minimaal 10 tekens).'
    if (form.bericht.trim().length > 2000) e.bericht = 'Bericht is te lang (max 2000 tekens).'
    return e
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        setServerError(data.error || 'Er ging iets mis.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setServerError('Geen verbinding. Probeer het later opnieuw.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{ borderLeft: '4px solid var(--forest)', paddingLeft: 24, paddingTop: 4 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: 1.1, marginBottom: 12 }}>
          Bericht verstuurd.
        </div>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)', margin: '0 0 24px' }}>
          Bedankt! We reageren doorgaans binnen drie werkdagen op het e-mailadres dat je hebt opgegeven.
        </p>
        <button
          onClick={() => { setForm({ naam: '', email: '', bericht: '', honeypot: '' }); setStatus('idle') }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'none', border: '1px solid var(--line)', padding: '10px 16px', cursor: 'pointer', color: 'var(--ink)' }}
        >
          Nog een bericht sturen
        </button>
      </div>
    )
  }

  const charsLeft = 2000 - form.bericht.length

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot: verborgen voor gebruikers, gevuld door bots. Nu écht
          aangesloten op de state, zodat de server ingevulde waarden ziet
          en het bericht als spam weigert. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <label>
          Vul dit veld niet in
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.honeypot}
            onChange={set('honeypot')}
          />
        </label>
      </div>

      <Field label="Naam" error={errors.naam}>
        <input
          type="text"
          value={form.naam}
          onChange={set('naam')}
          onFocus={() => setFocus('naam')}
          onBlur={() => setFocus(null)}
          placeholder="Joris van der Wal"
          autoComplete="name"
          style={focus === 'naam' ? INPUT_FOCUS : errors.naam ? { ...INPUT, borderColor: 'var(--terracotta)' } : INPUT}
          disabled={status === 'sending'}
        />
      </Field>

      <Field label="E-mailadres" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={set('email')}
          onFocus={() => setFocus('email')}
          onBlur={() => setFocus(null)}
          placeholder="naam@voorbeeld.nl"
          autoComplete="email"
          style={focus === 'email' ? INPUT_FOCUS : errors.email ? { ...INPUT, borderColor: 'var(--terracotta)' } : INPUT}
          disabled={status === 'sending'}
        />
      </Field>

      <Field label={`Bericht: ${charsLeft} tekens over`} error={errors.bericht}>
        <textarea
          value={form.bericht}
          onChange={set('bericht')}
          onFocus={() => setFocus('bericht')}
          onBlur={() => setFocus(null)}
          placeholder="Stel je vraag, meld een fout of deel een suggestie…"
          rows={6}
          style={focus === 'bericht'
            ? { ...INPUT_FOCUS, resize: 'vertical', minHeight: 120 }
            : errors.bericht
              ? { ...INPUT, borderColor: 'var(--terracotta)', resize: 'vertical', minHeight: 120 }
              : { ...INPUT, resize: 'vertical', minHeight: 120 }}
          disabled={status === 'sending'}
        />
      </Field>

      {serverError && (
        <div style={{ background: 'var(--paper-2)', borderLeft: '4px solid var(--terracotta)', padding: '12px 16px', marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em', color: 'var(--terracotta)' }}>
          {serverError}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: status === 'sending' ? 'var(--muted)' : 'var(--forest)',
            color: 'var(--paper)',
            border: 'none',
            padding: '14px 28px',
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {status === 'sending' ? 'Versturen…' : 'Verstuur bericht →'}
        </button>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Beveiligd formulier
        </span>
      </div>
    </form>
  )
}
