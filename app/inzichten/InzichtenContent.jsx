'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { seedIfEmpty, loadQuestions, CATEGORIES } from '@/lib/coach-data'

function timeAgo(ts) {
  const d = (Date.now() - ts) / 1000
  if (d < 60)    return 'nu net'
  if (d < 3600)  return Math.floor(d / 60)  + ' min'
  if (d < 86400) return Math.floor(d / 3600) + ' uur'
  return Math.floor(d / 86400) + ' d'
}

export default function InzichtenContent() {
  const [data, setData] = useState(null)

  useEffect(() => {
    seedIfEmpty()
    const all = loadQuestions()
    const now = Date.now()
    const WEEK = 7 * 24 * 3600 * 1000
    const DAY  = 24 * 3600 * 1000

    const last7   = all.filter(q => now - q.ts < WEEK)
    const today   = all.filter(q => now - q.ts < DAY)
    const answered = all.filter(q => q.answered).length

    // Category bar chart
    const catCounts = {}
    for (const q of last7) catCounts[q.category] = (catCounts[q.category] || 0) + 1
    const catList = Object.entries(catCounts)
      .map(([key, n]) => {
        const cat = CATEGORIES.find(c => c.key === key)
        return { key, n, label: cat?.label || 'Overig', color: cat?.color || '#6b6358' }
      })
      .sort((a, b) => b.n - a.n)
    const catMax = Math.max(1, ...catList.map(c => c.n))

    // Top plants
    const plantCounts = {}
    for (const q of all) { if (q.plant) plantCounts[q.plant] = (plantCounts[q.plant] || 0) + 1 }
    const plantList = Object.entries(plantCounts)
      .map(([name, n]) => ({ name, n }))
      .sort((a, b) => b.n - a.n)
      .slice(0, 10)

    // Content gaps
    const gapGroups = {}
    for (const q of all) {
      if (!q.plant) continue
      const key = q.plant + '|' + q.category
      gapGroups[key] = gapGroups[key] || { plant: q.plant, cat: q.category, n: 0 }
      gapGroups[key].n++
    }
    const gaps = Object.values(gapGroups).sort((a, b) => b.n - a.n).slice(0, 8)

    setData({ all, last7, today, answered, catList, catMax, plantList, gaps })
  }, [])

  function clearData() {
    if (confirm('Alle gelogde vragen wissen?')) {
      localStorage.removeItem('moestuin.questions.v1')
      window.location.reload()
    }
  }

  if (!data) return null

  const { all, last7, today, answered, catList, catMax, plantList, gaps } = data

  return (
    <>
      <section className="dash-hero">
        <div className="wrap">
          <nav className="breadcrumb" style={{ marginBottom: 24 }} aria-label="Broodkruimelpad">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <b>Inzichten</b>
            <span style={{ marginLeft: 16, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', background: 'var(--ink)', color: 'var(--paper)', padding: '3px 7px' }}>BEHEERDER</span>
          </nav>
          <h1>Wat <span className="it">vragen ze.</span></h1>
          <p className="lead">
            Iedere coach-vraag wordt anoniem gelogd. Hier zie je de patronen — welke categorieën leven,
            welke gewassen trekken, en — belangrijker — welke onderwerpen je nog niet hebt geschreven.
            Dit zijn je content-prioriteiten voor de komende weken.
          </p>
        </div>
      </section>

      <section className="dash-numbers" aria-labelledby="kpi-heading">
        <div className="wrap">
          <h2 id="kpi-heading" className="sr-only">Statistieken</h2>
          <div className="grid" aria-live="polite">
            <div className="kpi">
              <div className="lbl">Vragen totaal</div>
              <div className="val">{all.length}<span className="it">.</span></div>
              <div className="delta">↗ +{last7.length} deze week</div>
            </div>
            <div className="kpi">
              <div className="lbl">Vandaag</div>
              <div className="val"><span className="it">{today.length}</span></div>
              <div className="delta">{today.length > 8 ? '↗ boven gemiddeld' : '→ rustig'}</div>
            </div>
            <div className="kpi">
              <div className="lbl">Unieke gewassen</div>
              <div className="val">{new Set(all.map(q => q.plant).filter(Boolean)).size}</div>
              <div className="delta">↗ kleine kanon</div>
            </div>
            <div className="kpi">
              <div className="lbl">% beantwoord</div>
              <div className="val">{Math.round(answered / all.length * 100)}<span className="it" style={{ fontSize: 36 }}>%</span></div>
              <div className="delta">{answered}/{all.length} succesvol</div>
            </div>
          </div>
        </div>
      </section>

      <section className="dash-split" aria-label="Categorieën en gewassen">
        <div className="wrap" style={{ display: 'contents' }}>
          <div className="dash-card">
            <div className="head">
              <h2>Vraag-<span className="it">categorieën</span></h2>
              <span className="meta">Laatste 7 dagen</span>
            </div>
            <div className="body">
              <div className="bars" aria-live="polite">
                {catList.map(c => (
                  <div className="row" key={c.key}>
                    <div className="name">{c.label}</div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${(c.n / catMax) * 100}%`, background: c.color }}></div>
                    </div>
                    <div className="n">{c.n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="dash-card">
            <div className="head">
              <h2>Top <span className="it">gewassen</span></h2>
              <span className="meta">Genoemd in vragen</span>
            </div>
            <div className="body">
              <div className="plants-list" aria-live="polite">
                {plantList.map((p, i) => (
                  <div className="row" key={p.name}>
                    <span className="ord">№ {String(i + 1).padStart(2, '0')}</span>
                    <span className="name">{p.name}</span>
                    <span className="count">{p.n} vragen</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dash-gaps" aria-labelledby="gaps-heading">
        <div className="wrap">
          <div className="section-head" style={{ borderBottomColor: 'var(--ink)', marginBottom: 32 }}>
            <h2 id="gaps-heading">Content-<span className="it">kansen</span></h2>
            <p className="intro">Onderwerpen waarover veel gevraagd wordt, maar waar je nog niet over hebt geschreven. Schrijf van boven naar beneden.</p>
            <span className="meta">Top 8 deze week</span>
          </div>
          <div className="gap-list" aria-live="polite">
            <div className="gap-row">
              <span>Vragen</span>
              <span>Onderwerp</span>
              <span>Categorie</span>
              <span></span>
            </div>
            {gaps.map((g, i) => {
              const cat = CATEGORIES.find(c => c.key === g.cat)
              const catLabel = cat?.label || 'Overig'
              return (
                <div className="gap-row" key={i}>
                  <span className="vol">{g.n}×</span>
                  <span className="topic">{g.plant[0].toUpperCase() + g.plant.slice(1)} <span className="it">— {catLabel.toLowerCase()}</span></span>
                  <span className="cat-pill" style={{ color: cat?.color || 'var(--ink)' }}>{catLabel}</span>
                  <button className="cta">Schrijf artikel →</button>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="dash-stream" aria-labelledby="stream-heading">
        <div className="wrap">
          <div className="section-head" style={{ borderBottomColor: 'var(--ink)', marginBottom: 32 }}>
            <h2 id="stream-heading">Recente <span className="it">vragen</span></h2>
            <p className="intro">Anonieme livestream van wat bezoekers vragen.</p>
            <button
              onClick={clearData}
              style={{ background: 'transparent', border: '1px solid var(--line-strong)', padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', color: 'var(--muted)' }}
            >
              Demo-data wissen
            </button>
          </div>
          <div className="stream-list" aria-live="polite">
            <div className="stream-row">
              <span>Tijd</span>
              <span>Categorie</span>
              <span>Vraag</span>
              <span>Plant</span>
            </div>
            {all.slice(0, 20).map(q => {
              const cat = CATEGORIES.find(c => c.key === q.category)
              return (
                <div className="stream-row" key={q.id}>
                  <span className="when">{timeAgo(q.ts)}</span>
                  <span className="cat-pill" style={{ color: cat?.color || 'var(--ink)' }}>{cat?.label || 'Overig'}</span>
                  <span className="qt">{q.text}</span>
                  <span className="plant-tag">{q.plant ? '↳ ' + q.plant : '—'}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <style>{`.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }`}</style>
    </>
  )
}
