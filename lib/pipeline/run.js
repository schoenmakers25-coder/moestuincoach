import { getPublishedTopics, getAllArticles } from '@/lib/articles'
import { ARTICLE_MODE } from './config.js'
import { getSeasonContext, isoYearWeek } from './season.js'
import { researchTopic } from './research.js'
import { writeArticle } from './write.js'
import { selectImages } from './images.js'
import { publishArticle, publishedSince } from './publish.js'
import { notifyPublished, notifyError } from './notify.js'

// Orkestreert de volledige wekelijkse pipeline met nette foutafhandeling per
// fase. Publiceert niet als het onderzoek faalt, het artikel te kort is, of het
// JSON niet parse-baar is (die guards zitten in de losse modules). Elke run
// wordt gelogd; bij een live publicatie gaat er een mail uit, bij een fout ook.

function startOfIsoWeek(now = new Date()) {
  const d = new Date(now)
  const day = (d.getUTCDay() + 6) % 7 // maandag = 0
  d.setUTCDate(d.getUTCDate() - day)
  d.setUTCHours(0, 0, 0, 0)
  return d
}

/**
 * @param {object} opts
 * @param {boolean} [opts.force]  Sla de idempotentie-check over (voor testen).
 * @param {Date}    [opts.now]
 */
export async function runWeeklyArticle({ force = false, now = new Date() } = {}) {
  const log = []
  const record = (msg) => {
    const line = `[weekly-article] ${msg}`
    console.log(line)
    log.push(msg)
  }

  const week = isoYearWeek(now)
  record(`Start run voor ${week} (modus: ${ARTICLE_MODE}).`)

  let topic = null
  let stage = 'init'

  try {
    // Idempotentie: is er deze week al een artikel gepubliceerd?
    if (!force) {
      stage = 'idempotentie'
      const since = startOfIsoWeek(now).toISOString()
      const already = await publishedSince(since)
      if (already) {
        record('Deze week is er al een artikel gepubliceerd — overslaan.')
        return { status: 'skipped', reason: 'already-published-this-week', week, log }
      }
    }

    // Fase 3 — Trendonderzoek.
    stage = 'trendonderzoek'
    const existingTopics = getPublishedTopics()
    const research = await researchTopic({ existingTopics, now })
    topic = research.topic
    const season = research.season
    record(`Onderwerp gekozen: "${topic.onderwerp}" (keyword: ${topic.primairKeyword}).`)

    // Fase 4 — Artikel schrijven.
    stage = 'schrijven'
    const existingArticles = getAllArticles()
    const { article, wordCount } = await writeArticle({ topic, season, existingArticles })
    record(`Artikel geschreven: "${article.title}" (${wordCount} woorden, slug: ${article.slug}).`)

    // Fase 4b — Foto's.
    stage = 'fotos'
    const { featured, usedFallback } = await selectImages({
      article,
      apiKey: process.env.PEXELS_API_KEY,
    })
    record(`Featured image gekozen${usedFallback ? ' (fallback-afbeelding)' : ''}: ${featured.url}`)

    // Fase 5 — Publiceren (commit naar GitHub).
    stage = 'publiceren'
    const dateIso = now.toISOString().slice(0, 10)
    const result = await publishArticle({ article, image: featured, dateIso })

    if (result.alreadyExisted) {
      record(`Bestand bestond al (${result.path}) — niets gepubliceerd.`)
      return { status: 'skipped', reason: 'slug-exists', slug: article.slug, week, log }
    }
    record(`Gecommit naar GitHub: ${result.path}`)

    // Fase 7 — Melding (alleen bij live publicatie, niet bij draft).
    if (ARTICLE_MODE === 'draft') {
      record('Draft-modus: opgeslagen als concept, geen mail verstuurd.')
      return { status: 'draft', slug: article.slug, title: article.title, week, log }
    }

    stage = 'melding'
    const mail = await notifyPublished({ article, image: featured, topic })
    record(mail.sent ? 'Meldingsmail verstuurd naar info@moestuin.nl.' : 'Meldingsmail niet verstuurd.')

    return {
      status: 'published',
      slug: article.slug,
      title: article.title,
      keyword: topic.primairKeyword,
      image: featured.url,
      week,
      log,
    }
  } catch (err) {
    const message = err?.message || String(err)
    record(`FOUT in fase "${stage}": ${message}`)
    // Foutmelding is best-effort; mag de response niet laten falen.
    try {
      await notifyError({ stage, message, topic })
    } catch (mailErr) {
      record(`Kon foutmelding niet versturen: ${mailErr?.message || mailErr}`)
    }
    return { status: 'error', stage, message, week, log }
  }
}
